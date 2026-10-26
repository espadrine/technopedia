// A mock of an OpenAI-compatible server (llama.cpp-server), used by the
// offline self-test of the agent (agent/test/selftest.js). It answers every
// task the agent performs with deterministic fixtures, so the full agent
// algorithm can be exercised without a real model server. It also serves a
// small /search endpoint standing in for web search.
//
// It can also be started standalone, to try the agent end-to-end offline:
//   node agent/test/mock-llm.js            # listens on http://127.0.0.1:39999
//   OPENAI_HOST=http://127.0.0.1:39999 node agent/index.js --topic Manufacturing

import http from 'node:http';

const topicPage = (name, links) =>
  `# ${name}\n\nOverview of ${name}.\n\n## History\n\n- One highlight.\n\n## Classes\n\n<table>\n<tr><th>Class</th><th>Trait</th></tr>\n<tr><td>A</td><td>1</td></tr>\n<tr><td>${links}</td><td>Subtopic</td></tr>\n</table>\n`;

const explanationPage = (name) =>
  `# ${name}\n\nUtility of ${name}.\n\nRaw formula: $\`E = mc^2\`.\n\n<details><summary>Details</summary>\n\nExplained.\n\n</details>\n\n## Example problem\n\nDo the thing.\n\n<details><summary>Solution</summary>\n\nDone.\n\n</details>\n`;

// A page with the known invalid math forms, for the creation-path lint test.
const explanationPageBadMath = (name) =>
  `# ${name}\n\nUtility of ${name}.\n\nBroken formula: $\`E = mc^2$\` and a leaky $\`x\`$.\n\n<details><summary>Details</summary>\n\nExplained.\n\n</details>\n`;

export const requestLog = []; // one entry per task instance (first call only)
export const callsLog = [];
// The first user message of every chat request (for assertions on prompts).
export const userLog = []; // every chat request, including tool-round continuations
// For each request: the reasoning_content of the assistant turns it carries
// (the client must send the model's reasoning back on tool-round continuations).
export const assistantReasoningLog = [];
// response_format.type of each chat request (json mode).
export const responseFormatLog = [];
export const searchLog = []; // every /search query it receives
export const modelsLog = []; // every /v1/models request it receives
// Test knobs: when set, the matching task fails (HTTP 500) so tests can
// exercise interrupted runs and their resumption.
export const flags = { failResumeEval: false, badMathCreation: false };

function reply(task, firstUser, messages) {
  // Interrupted-run test: every evaluation of the page carrying the RESUME
  // marker fails while the flag is set, so the client's internal retries are
  // exhausted and the error reaches the run loop (which then resumes).
  if (flags.failResumeEval && task === 'evaluate-explanation-page' && /RESUME marker\./.test(firstUser)) {
    throw new Error('simulated network failure');
  }
  const toolResults = messages
    .filter((m) => m.role === 'user' && m.content.startsWith('{"tool_result"'))
    .map((m) => JSON.parse(m.content).tool_result);
  const pageMatch = firstUser.match(/<page>\n([\s\S]*?)\n<\/page>/);
  const page = (pageMatch?.[1] ?? '').trim();
  // Only the improvement-notes section itself: the surrounding task text now
  // mentions tools and simulations, which must not trip the heuristics below.
  const notesText = (firstUser.split('Improvement notes left over on this page:')[1] ?? '')
    .split('<page>')[0]
    .trim();

  // Tool flows: exercise the agent's tool round-trip deterministically.
  // "Loop tools" keeps requesting tools until the forced wrap-up, to test
  // the tool round limit. "EMPTYFIRST" returns an empty response once (the
  // client must retry), then reads a large file whose result must be
  // truncated on its way back into the conversation.
  if (task === 'evaluate-explanation-page' && /EMPTYFIRST marker\./.test(firstUser)) {
    const ownCalls = callsLog.filter((t) => t === task).length;
    if (ownCalls === 1) return '';
    if (ownCalls === 2) return { tool: 'read_file', args: { path: 'Manufacturing/Big.txt' } };
    const lastToolResult =
      [...messages]
        .reverse()
        .find((m) => m.role === 'user' && m.content.startsWith('{"tool_result"'))?.content ?? '';
    if (lastToolResult.includes('tool result truncated')) {
      return { notes: ['Handled the truncated result.'], score: 42, reasoning: 'mock' };
    }
    return 'RAW:this is not valid json, the truncation marker is missing';
  }
  if (task === 'address-notes' && /delete the page/i.test(notesText)) {
    // Regression for the mid-visit ENOENT: the model deletes the very page
    // it is addressing notes on.
    if (toolResults.length === 0) {
      const pageFile =
        firstUser.match(/Page file \(edit this file with edit_file\): (\S+)/)?.[1] ??
        'Manufacturing/Readme.md';
      return { tool: 'delete_file', args: { path: pageFile } };
    }
    return { done: true };
  }
  if (task === 'address-notes' && /loop tools/i.test(notesText)) {
    if (messages.some((m) => m.content.includes('Tool round limit reached'))) {
      return { done: true };
    }
    return { tool: 'grep', args: { pattern: 'loop' } };
  }
  if (task === 'address-notes' && /use tools/i.test(notesText)) {
    if (toolResults.length === 0) {
      return { tool: 'read_file', args: { path: 'Manufacturing/Electronics.md' } };
    }
    if (toolResults.length === 1) {
      return {
        tool: 'edit_file',
        args: {
          path: 'Manufacturing/Electronics.md',
          lineno_start: 3,
          lineno_end: 3,
          new_content: 'Fixed by edit_file.',
        },
      };
    }
    if (toolResults.length === 2) {
      return { tool: 'delete_file', args: { path: 'Manufacturing/Junk.md' } };
    }
    return { done: true };
  }
  // Non-JSON recovery test: the first final answer is prose, the correction
  // user message must make the model reply with valid JSON.
  if (task === 'evaluate-explanation-page' && /BADJSON marker\./.test(firstUser)) {
    if (messages.some((m) => m.content.startsWith('Your reply was not valid JSON'))) {
      return { notes: ['Recovered after the JSON correction.'], score: 42, reasoning: 'mock' };
    }
    return 'RAW:Now I have a clear picture. I need to:\n\n1. Create Graphics.md\n2. Update the Readme (this is not JSON at all).';
  }
  if (task === 'evaluate-explanation-page' && /TOOLCASE header\./.test(firstUser)) {
    if (toolResults.length === 0) {
      return { tool: 'grep', args: { pattern: '^Raw\\.$' } };
    }
    if (toolResults.length === 1) {
      return { tool: 'run_js', args: { code: 'return 6*7' } };
    }
    return {
      notes: [
        `grep returned ${toolResults[0]?.matches?.length ?? '?'} matches.`,
        `run_js returned ${toolResults[1]?.result ?? '?'}.`,
      ],
      score: 42,
      reasoning: 'mock',
    };
  }

  const pathMatch =
    firstUser.match(/page "([^"]+)" is empty/) ||
    firstUser.match(/page "([^"]+)"/) ||
    firstUser.match(/for "([^"]+)"/);
  const path = pathMatch ? pathMatch[1] : '';
  const last = path.split(' / ').pop() ?? '';
  switch (task) {
    case 'create-topic-page':
      return {
        markdown:
          last === 'Manufacturing'
            ? topicPage('Manufacturing', 'Subcategory: [Electronics](./Electronics/Readme.md).')
            : topicPage('Electronics', 'Concept: [Batteries](./Batteries.md).'),
      };
    case 'create-explanation-page':
      return {
        markdown: flags.badMathCreation ? explanationPageBadMath(last) : explanationPage(last),
      };
    case 'split-topic-page':
      return {
        groups: [
          {
            label: 'Power',
            markdown: topicPage('Power', 'Subtopics: [Welding](./Welding.md).'),
          },
          {
            label: 'Control',
            markdown: topicPage('Control', 'Subtopics: [Soldering](./Soldering.md).'),
          },
        ],
        reasoning: 'mock',
      };
    case 'split-explanation-page':
      return {
        groups: [
          { label: 'Primary cells', markdown: explanationPage('Primary cells') },
          { label: 'Secondary cells', markdown: explanationPage('Secondary cells') },
        ],
        reasoning: 'mock',
      };
    case 'edit-parent-links': {
      // The mock only performs the removals; the agent itself guarantees
      // the new links are appended to the parent (ensureParentLinks).
      const removeAll = /Remove: all subtopic links/.test(firstUser);
      const removed = firstUser.match(/Remove the link to: (.+?)\.?$/m)?.[1];
      const updated = page
        .split('\n')
        .filter((line) => {
          if (removeAll) return !line.includes('](./');
          if (removed && removed !== 'nothing') return !line.includes(removed);
          return true;
        })
        .join('\n');
      return { markdown: `${updated}\n` };
    }
    case 'fact-check-queries':
      return { queries: ['specific energy of battery chemistries'] };
    case 'address-notes': {
      // Address-notes is tool-only: the mock applies its marker with an
      // edit_file round-trip, exactly as the prompt now instructs.
      const hasSimulation = /<simulation>/.test(firstUser);
      const wantsSimulation = /simulation/i.test(notesText);
      const pageFile =
        firstUser.match(/Page file \(edit this file with edit_file\): (\S+)/)?.[1] ??
        'Manufacturing/Readme.md';
      const simFile =
        firstUser.match(/Simulation file \(edit this file with edit_file[^:]*\): (\S+)/)?.[1] ??
        'Manufacturing/Readme.simulation.html';
      const simBlock = firstUser.match(/<simulation>\n([\s\S]*?)\n<\/simulation>/)?.[1] ?? '';
      const pageLines = page.split('\n');
      const lastLine = Math.max(1, pageLines.length);
      const appendMarker = (marker) => ({
        tool: 'edit_file',
        args: {
          path: pageFile,
          lineno_start: lastLine,
          lineno_end: lastLine,
          new_content: `${pageLines[lastLine - 1] ?? ''}\n${marker}`,
        },
      });
      // If the review saw the author note in its context, its marker note
      // ends up here: surface it on the page so the test can observe it.
      const marker = notesText.includes('Author note was in context')
        ? 'AUTHORNOTE-SEEN'
        : '<!-- notes-addressed -->';
      if (hasSimulation || wantsSimulation) {
        if (toolResults.length === 0) return appendMarker(marker);
        if (toolResults.length === 1) {
          return {
            tool: 'edit_file',
            args: {
              path: simFile,
              lineno_start: 1,
              lineno_end: Math.max(1, simBlock.split('\n').length),
              new_content: `<!DOCTYPE html>\n<html><body>${
                hasSimulation ? '<!-- simulation improved -->' : '<button>Simulate</button>'
              }</body></html>`,
            },
          };
        }
        return { done: true };
      }
      if (toolResults.length === 0) return appendMarker(marker);
      return { done: true };
    }
    case 'evaluate-topic-page': {
      const notes = ['Add a diagram of the class relationships.'];
      if (firstUser.includes('Mechanical checks found these violations')) {
        notes.push('Fix the structural violations.');
      }
      return { notes, score: 42, reasoning: 'mock' };
    }
    case 'evaluate-explanation-page': {
      const notes = ['Add a worked example.', 'Fix the units in the formula.'];
      // The author note must be part of the review context: when it is, the
      // review produces a marker note (see the address-notes case).
      if (firstUser.includes('Add a worked example to the page.')) {
        notes.push('Author note was in context');
      }
      if (firstUser.includes('Mechanical checks found these violations')) {
        notes.push('Fix the structural violations.');
      }
      return { notes, score: 42, reasoning: 'mock' };
    }
    default:
      return { notes: [], reasoning: `mock has no case for ${task}` };
  }
}

export function startMockServer(port = 39999) {
  const server = http.createServer((req, res) => {
    const send = (code, body) => {
      res.writeHead(code, { 'content-type': 'application/json' });
      res.end(JSON.stringify(body));
    };
    if (req.method === 'GET' && req.url === '/v1/models') {
      modelsLog.push(1);
      return send(200, { data: [{ id: 'mock-llama' }] });
    }
    if (req.method === 'GET' && req.url?.startsWith('/search')) {
      const query = decodeURIComponent(
        new URL(req.url, 'http://localhost').searchParams.get('q') ?? '',
      );
      searchLog.push(query);
      return send(200, {
        results: [
          {
            title: 'Example Source',
            url: 'https://example.com/source',
            snippet: 'Snippet confirming the claim.',
          },
        ],
      });
    }
    if (req.method === 'POST' && req.url === '/v1/chat/completions') {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        const bodyJson = JSON.parse(body);
        responseFormatLog.push(bodyJson.response_format?.type ?? null);
        const messages = bodyJson.messages;
        assistantReasoningLog.push(
          messages.filter((m) => m.role === 'assistant').map((m) => m.reasoning_content ?? null),
        );
        const users = messages.filter((m) => m.role === 'user');
        // The task lives in the first user message; the last one may be a
        // {"tool_result": ...} continuation of a tool round-trip.
        const firstUser = users[0]?.content ?? '';
        userLog.push(firstUser);
        const task = firstUser.match(/TASK: ([\w-]+)/)?.[1] ?? 'unknown';
        // Log only the first request of a task instance: tool-round
        // continuations repeat the same task and would inflate the counts.
        callsLog.push(task);
        if (!messages.some((m) => m.content.startsWith('{"tool_result"'))) {
          requestLog.push(task);
        }
        let answer;
        try {
          answer = reply(task, firstUser, messages);
        } catch (err) {
          send(500, { error: { message: String(err.message ?? err) } });
          return;
        }
        // '' is an empty completion; 'RAW:' prefixes verbatim (non-JSON) text.
        const content =
          answer === ''
            ? ''
            : typeof answer === 'string' && answer.startsWith('RAW:')
              ? answer.slice(4)
              : JSON.stringify(answer);
        send(200, {
          choices: [
            {
              message: { role: 'assistant', content, reasoning_content: 'mock reasoning' },
              finish_reason: 'stop',
            },
          ],
        });
      });
      return;
    }
    send(404, { error: { message: 'not found' } });
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

const isMain =
  process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) {
  startMockServer().then(() =>
    console.log('mock llama.cpp server listening on http://127.0.0.1:39999'),
  );
}
