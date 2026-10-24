// Offline self-test of the agent: starts the mock LLM server (and a mock web
// search endpoint) in-process, runs the agent against isolated content and
// notes directories, and asserts that the README's "Automatic generation"
// algorithm behaves as specified.
//
//   npm test

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { requestLog, callsLog, modelsLog, searchLog, startMockServer, flags, assistantReasoningLog, responseFormatLog } from './mock-llm.js';
import { pickModelAndBudget, LlmClient } from '../llm.js';
import { runAgent } from '../agent.js';
import { loadConfig } from '../config.js';
import { Store } from '../store.js';
import { createTools, findMathProblems } from '../tools.js';
import { makeRng } from '../util.js';
import { STYLE_GUIDE } from '../style.js';
import { createTopicPagePrompt } from '../prompts.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const TEST = path.join(os.tmpdir(), 'technopedia-agent-selftest');
const PORT = 39999;

const failures = [];
function check(name, cond, detail = '') {
  console.log(`${cond ? 'PASS' : 'FAIL'} ${name}${cond ? '' : ` -- ${detail}`}`);
  if (!cond) failures.push(name);
}

const exists = (file) => fs.existsSync(file);
// Tolerant read for assertion paths: empty string when the file is missing.
const content = (file) => (exists(file) ? fs.readFileSync(file, 'utf8') : '');
const readIndex = (notesDir) =>
  JSON.parse(content(path.join(notesDir, 'index.json')) || '{"pages":{}}');
const taskCount = (task) => requestLog.filter((t) => t === task).length;

function seed(contentDir, relPath, body) {
  const file = path.join(contentDir, relPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
}

// The mock server runs in this process, so the agent must be spawned
// asynchronously: a synchronous spawn would block the event loop and the
// mock could never answer the agent's requests.
function agent(args, { contentDir, notesDir, authorNotesDir, env = {} }) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [path.join(ROOT, 'agent/index.js'), ...args], {
      env: {
        ...process.env,
        OPENAI_HOST: `http://127.0.0.1:${PORT}`,
        TECHNOPEDIA_CONTENT_DIR: contentDir,
        TECHNOPEDIA_NOTES_DIR: notesDir,
        TECHNOPEDIA_AUTHOR_NOTES_DIR: authorNotesDir,
        TECHNOPEDIA_PAGES_DB: path.join(path.dirname(contentDir), "pages.json"),
        TECHNOPEDIA_WEB_SEARCH_URL: `http://127.0.0.1:${PORT}/search?q={q}`,
        TECHNOPEDIA_WEB_TIMEOUT_MS: '5000',
        ...env,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => (stdout += chunk));
    child.stderr.on('data', (chunk) => (stderr += chunk));
    child.on('error', reject);
    child.on('close', (code) => resolve({ stdout, stderr, status: code }));
  });
}

// CLI runs of the author-note tool, against the same isolated directories.
function authorNote(args, { contentDir, notesDir, authorNotesDir }) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [path.join(ROOT, 'agent/author-note.js'), ...args], {
      env: {
        ...process.env,
        TECHNOPEDIA_CONTENT_DIR: contentDir,
        TECHNOPEDIA_NOTES_DIR: notesDir,
        TECHNOPEDIA_AUTHOR_NOTES_DIR: authorNotesDir,
        TECHNOPEDIA_PAGES_DB: path.join(path.dirname(contentDir), "pages.json"),
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => (stdout += chunk));
    child.stderr.on('data', (chunk) => (stderr += chunk));
    child.on('error', reject);
    child.on('close', (code) => resolve({ stdout, stderr, status: code }));
  });
}

function freshDirs(tag) {
  const dir = path.join(TEST, tag);
  fs.rmSync(dir, { recursive: true, force: true });
  return {
    contentDir: path.join(dir, 'content'),
    notesDir: path.join(dir, 'notes'),
    authorNotesDir: path.join(dir, 'author-notes'),
  };
}

await startMockServer(PORT);

// -- Phase 0: model resolution (pure) ----------------------------------------
{
  const bigLoaded = pickModelAndBudget([
    { id: 'small-but-loaded', status: { value: 'loaded' }, meta: { size: 1000, n_ctx: 8192 }, context_length: 8192 },
    { id: 'big-and-loaded', status: { value: 'loaded' }, meta: { size: 9000, n_ctx: 32768 }, context_length: 131072 },
    { id: 'big-but-unloaded', status: { value: 'unloaded' }, meta: { size: 99999, n_ctx: 999999 }, context_length: 999999 },
  ]);
  check(
    'p0: among loaded models, the biggest (meta.size) wins, budget from meta.n_ctx (not context_length)',
    bigLoaded.model === 'big-and-loaded' && bigLoaded.maxTokens === 32768 && bigLoaded.ambiguous,
    JSON.stringify(bigLoaded),
  );
  const noneLoaded = pickModelAndBudget([
    { id: 'a', status: { value: 'unloaded' }, meta: { size: 1 }, context_length: 8 },
    { id: 'b', status: { value: 'unloaded' }, meta: { size: 2 }, context_length: 9 },
  ]);
  check(
    'p0: nothing loaded -> no model, with the ids listed for OPENAI_MODEL',
    noneLoaded.model === null && noneLoaded.noneLoaded.join(',') === 'a,b',
    JSON.stringify(noneLoaded),
  );
  const plain = pickModelAndBudget([{ id: 'only-model', context_length: 4096 }]);
  check(
    'p0: a single statusless entry is the loaded model',
    plain.model === 'only-model' && plain.maxTokens === 4096 && !plain.ambiguous,
    JSON.stringify(plain),
  );
  const fallback = pickModelAndBudget([
    { id: 'no-meta', status: { value: 'loaded' }, context_length: 4096 },
  ]);
  check(
    'p0: context_length is the fallback budget when meta.n_ctx is absent',
    fallback.model === 'no-meta' && fallback.maxTokens === 4096,
    JSON.stringify(fallback),
  );
}

// -- Phase 1: the loop builds the encyclopedia from an empty disk ------------
{
  requestLog.length = 0; callsLog.length = 0;
  searchLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p1');
  // Run 1: nothing on disk -> editor creates the highest-level topic page and
  // its empty subpages. Runs 2-3: the reviewer scores one page at a time,
  // the editor fills the unscored ones.
  const r = await agent(['--topic', 'Manufacturing', '--runs', '3'], { contentDir, notesDir, authorNotesDir });
  console.log(`\n--- phase 1 (creation) exit=${r.status} ---\n${r.stdout}${r.stderr}`);

  const mfg = path.join(contentDir, 'Manufacturing/Readme.md');
  const elec = path.join(contentDir, 'Manufacturing/Electronics/Readme.md');
  const bat = path.join(contentDir, 'Manufacturing/Electronics/Batteries.md');
  check('p1: Manufacturing topic page created', exists(mfg));
  check('p1: Manufacturing links to Electronics', content(mfg).includes('./Electronics/Readme.md'));
  check('p1: Electronics topic page created', exists(elec));
  check('p1: Batteries explanation page created', exists(bat));
  check(
    'p1: pages use LaTeXMarkdown syntax (backtick math, HTML tables, no pipe tables)',
    content(bat).includes('$`E = mc^2`') &&
      content(mfg).includes('<table>') &&
      !content(mfg).includes('|---|') &&
      !content(bat).includes('$E = mc^2$'),
  );
  const db = JSON.parse(content(path.join(path.dirname(contentDir), 'pages.json')));
  check(
    'p1: the page database tracks types, scores and review timestamps',
    db.pages['Manufacturing/Readme.md']?.type === 'topic' &&
      db.pages['Manufacturing/Electronics/Batteries.md']?.type === 'explanation' &&
      db.pages['Manufacturing/Readme.md']?.score === 42 &&
      db.pages['Manufacturing/Electronics/Readme.md']?.score === 42 &&
      typeof db.pages['Manufacturing/Readme.md']?.reviewedAt === 'string' &&
      db.pages['Manufacturing/Electronics/Batteries.md']?.score === null,
    JSON.stringify(db),
  );
  check(
    'p1: the task sequence matches the README algorithm',
    taskCount('create-topic-page') === 2 &&
      taskCount('create-explanation-page') === 1 &&
      taskCount('evaluate-topic-page') === 2 &&
      r.stdout.includes('no pages at all; creating the highest-level topic page') &&
      r.stdout.includes('created the empty subpage Manufacturing/Electronics/Readme.md'),
    requestLog.join(','),
  );
  check(
    'p1: /v1/models is not called when OPENAI_HOST is set',
    modelsLog.length === 0,
    `models calls: ${modelsLog.length}`,
  );
  check(
    'p1: prompts and style guide demand exactly one page per subject',
    STYLE_GUIDE.includes('Never two pages for the same subject') &&
      STYLE_GUIDE.includes('either all explanation pages, or all topic pages') &&
      createTopicPagePrompt(['Manufacturing'])[1].content.includes('never give one subject two links'),
  );
  check(
    'p1: the style guide spells out the inline math delimiters and their pitfalls',
    STYLE_GUIDE.includes('$`x \\in \\mathbb{R}`') &&
      STYLE_GUIDE.includes('The closing delimiter of inline math is a backtick, never a dollar sign') &&
      STYLE_GUIDE.includes('LaTeXMarkdown does NOT work inside raw HTML') &&
      STYLE_GUIDE.includes('Inside HTML, write mathematics as'),
    STYLE_GUIDE.split('\n').filter((l) => l.includes('math')).join(' | '),
  );
}

// -- Phase 2: one run reviews a page, then edits it (notes left and addressed)
{
  requestLog.length = 0; callsLog.length = 0;
  searchLog.length = 0;
  responseFormatLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p2');
  seed(
    contentDir,
    'Manufacturing/Electronics.md',
    `# Electronics\n\nIntro.\n\n${Array.from({ length: 5 }, (_, i) => `## Section ${i + 1}\n\nRaw.\n`).join('')}`,
  );
  const r = await agent(['--runs', '1'], { contentDir, notesDir, authorNotesDir });
  console.log(`\n--- phase 2 (review then edit) exit=${r.status} ---\n${r.stdout}${r.stderr}`);

  check(
    'p2: every task request asks for JSON output (response_format json_object)',
    responseFormatLog.length > 0 && responseFormatLog.every((type) => type === 'json_object'),
    JSON.stringify(responseFormatLog),
  );

  check(
    'p2: the only page is reviewed (1.2) and edited (2.3.3) in the same run',
    r.status === 0 &&
      taskCount('evaluate-explanation-page') === 1 &&
      taskCount('address-notes') === 1 &&
      r.stdout.includes('picked page Manufacturing/Electronics.md for review') &&
      r.stdout.includes('picked page Manufacturing/Electronics.md for editing'),
    requestLog.join(','),
  );
  const bat = path.join(contentDir, 'Manufacturing/Electronics.md');
  check('p2: addressed notes changed the page', content(bat).includes('notes-addressed'));
  check(
    'p2: all leftover notes deleted after addressing',
    r.stdout.includes('3 resolved'),
    r.stdout.slice(-200),
  );
  const index = readIndex(notesDir);
  check(
    'p2: the notes queue is empty after the visit',
    Object.keys(index.pages).length === 0,
    JSON.stringify(index),
  );
}

// -- Phase 2b: a topic page with no subtopics invents nothing ----------------
{
  requestLog.length = 0; callsLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p2b');
  seed(contentDir, 'Manufacturing/Readme.md', '# Manufacturing\n\nNo subtopics yet.\n');
  const r = await agent(['--runs', '1'], { contentDir, notesDir, authorNotesDir });
  console.log(`\n--- phase 2b (no listed subtopics) exit=${r.status} ---\n${r.stdout}${r.stderr}`);

  check(
    'p2b: the page was reviewed and edited without inventing any page',
    r.status === 0 &&
      taskCount('evaluate-topic-page') === 1 &&
      taskCount('address-notes') === 1 &&
      taskCount('create-topic-page') === 0 &&
      taskCount('create-explanation-page') === 0,
    requestLog.join(','),
  );
}

// -- Phase 2c: author notes via the CLI are addressed and deleted -----------
{
  requestLog.length = 0; callsLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p2c');
  seed(
    contentDir,
    'Manufacturing/Electronics.md',
    `# Electronics\n\nIntro.\n\n${Array.from({ length: 5 }, (_, i) => `## Section ${i + 1}\n\nRaw.\n`).join('')}`,
  );

  const help = await authorNote(['--help'], { contentDir, notesDir, authorNotesDir });
  check(
    'p2c: --help shows the usage',
    help.status === 0 && help.stdout.includes('Usage:') && help.stdout.includes('note-file'),
    help.stdout,
  );

  const noteFile = path.join(TEST, 'p2c', 'my-note.md');
  fs.writeFileSync(noteFile, 'Add a worked example to the page.\n');
  const added = await authorNote(
    ['Manufacturing/Electronics.md', noteFile, '--title', 'My author note'],
    { contentDir, notesDir, authorNotesDir },
  );
  const notesFile = path.join(authorNotesDir, 'Manufacturing__Electronics.md');
  check(
    'p2c: the note is in the author-notes folder, indexed, never in the page',
    added.status === 0 &&
      content(notesFile).includes('My author note') &&
      content(notesFile).includes('Add a worked example to the page.') &&
      readIndex(authorNotesDir).pages['Manufacturing/Electronics.md']?.count === 1 &&
      !content(path.join(contentDir, 'Manufacturing/Electronics.md')).includes('Add a worked example'),
    `${added.stdout}${added.stderr}`,
  );

  const missingPage = await authorNote(['Manufacturing/Nope.md', noteFile], {
    contentDir,
    notesDir,
    authorNotesDir,
  });
  check(
    'p2c: a warning is printed for a page that does not exist',
    missingPage.status === 0 && missingPage.stderr.includes('does not exist yet'),
    `${missingPage.stdout}${missingPage.stderr}`,
  );

  const r = await agent(['--runs', '1'], { contentDir, notesDir, authorNotesDir });
  console.log(`\n--- phase 2c (author note consumed) exit=${r.status} ---\n${r.stdout}${r.stderr}`);
  check(
    'p2c: the author note was addressed but never deleted',
    taskCount('address-notes') === 1 &&
      content(notesFile).includes('Add a worked example to the page.') &&
      readIndex(authorNotesDir).pages['Manufacturing/Electronics.md']?.count === 1,
    content(notesFile),
  );
  check(
    'p2c: the author note was in the review context and followed',
    content(path.join(contentDir, 'Manufacturing/Electronics.md')).includes('AUTHORNOTE-SEEN'),
  );
}

// -- Phase 3: explanation page with over 10 sections is split ---------------
{
  requestLog.length = 0; callsLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p3');
  seed(
    contentDir,
    'Manufacturing/Readme.md',
    '# Manufacturing\n\nSubtopics:\n\n- [Electronics](./Electronics.md)\n',
  );
  seed(
    contentDir,
    'Manufacturing/Electronics.md',
    `# Electronics\n\nIntro.\n\n${Array.from({ length: 11 }, (_, i) => `## Section ${i + 1}\n\nRaw.\n`).join('')}`,
  );
  const r = await agent(['--runs', '2'], { contentDir, notesDir, authorNotesDir });
  console.log(`\n--- phase 3 (explanation split) exit=${r.status} ---\n${r.stdout}${r.stderr}`);

  check(
    'p3: the overgrown explanation page was removed',
    !exists(path.join(contentDir, 'Manufacturing/Electronics.md')),
  );
  check(
    'p3: the two group pages were created',
    exists(path.join(contentDir, 'Manufacturing/Primary-cells.md')) &&
      exists(path.join(contentDir, 'Manufacturing/Secondary-cells.md')),
  );
  const mfg = content(path.join(contentDir, 'Manufacturing/Readme.md'));
  check(
    'p3: the parent topic page links the new pages, not the old one',
    mfg.includes('./Primary-cells.md') &&
      mfg.includes('./Secondary-cells.md') &&
      !mfg.includes('./Electronics.md'),
    mfg,
  );
  check(
    'p3: split and parent edit were performed',
    taskCount('split-explanation-page') === 1 && taskCount('edit-parent-links') === 1,
    requestLog.join(','),
  );
  const index = readIndex(notesDir);
  check(
    'p3: the notes of the removed page were transferred to the split pages',
    !index.pages['Manufacturing/Electronics.md'] &&
      index.pages['Manufacturing/Primary-cells.md']?.count === 2 &&
      index.pages['Manufacturing/Secondary-cells.md']?.count === 2,
    JSON.stringify(index),
  );
}

// -- Phase 4: topic page with over 10 subtopics is split --------------------
{
  requestLog.length = 0; callsLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p4');
  seed(
    contentDir,
    'Manufacturing/Readme.md',
    '# Manufacturing\n\nSubtopics:\n\n- [Electronics](./Electronics/Readme.md)\n',
  );
  seed(
    contentDir,
    'Manufacturing/Electronics/Readme.md',
    `# Electronics\n\nSubtopics:\n\n${Array.from({ length: 11 }, (_, i) => `- [S${i + 1}](./S${i + 1}.md)`).join('\n')}\n`,
  );
  const r = await agent(['--runs', '2'], { contentDir, notesDir, authorNotesDir });
  console.log(`\n--- phase 4 (topic split with parent) exit=${r.status} ---\n${r.stdout}${r.stderr}`);

  check(
    'p4: the old topic page was removed',
    !exists(path.join(contentDir, 'Manufacturing/Electronics/Readme.md')),
  );
  check(
    'p4: the two group topic pages were created',
    exists(path.join(contentDir, 'Manufacturing/Power/Readme.md')) &&
      exists(path.join(contentDir, 'Manufacturing/Control/Readme.md')),
  );
  const mfg = content(path.join(contentDir, 'Manufacturing/Readme.md'));
  check(
    'p4: the parent links the new topic pages, not the old one',
    mfg.includes('./Power/Readme.md') && mfg.includes('./Control/Readme.md') && !mfg.includes('Electronics'),
    mfg,
  );
  check('p4: split performed', taskCount('split-topic-page') === 1, requestLog.join(','));
  const index = readIndex(notesDir);
  check(
    'p4: the notes of the removed page were transferred to the group pages',
    !index.pages['Manufacturing/Electronics/Readme.md'] &&
      index.pages['Manufacturing/Power/Readme.md']?.count === 2 &&
      index.pages['Manufacturing/Control/Readme.md']?.count === 2,
    JSON.stringify(index),
  );
}

// -- Phase 5: high-level topic page with over 10 subtopics ------------------
{
  requestLog.length = 0; callsLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p5');
  seed(
    contentDir,
    'Manufacturing/Readme.md',
    `# Manufacturing\n\nSubtopics:\n\n${Array.from({ length: 11 }, (_, i) => `- [S${i + 1}](./S${i + 1}.md)`).join('\n')}\n`,
  );
  const r = await agent(['--topic', 'Manufacturing', '--runs', '1'], { contentDir, notesDir, authorNotesDir });
  console.log(`\n--- phase 5 (depth-1 topic split) exit=${r.status} ---\n${r.stdout}${r.stderr}`);

  const mfg = path.join(contentDir, 'Manufacturing/Readme.md');
  check('p5: the high-level page still exists (it becomes the parent)', exists(mfg));
  check(
    'p5: its subtopic links were replaced by the two group pages',
    content(mfg).includes('./Power/Readme.md') &&
      content(mfg).includes('./Control/Readme.md') &&
      !content(mfg).includes('./S1.md'),
    content(mfg),
  );
  check(
    'p5: the group topic pages were created',
    exists(path.join(contentDir, 'Manufacturing/Power/Readme.md')) &&
      exists(path.join(contentDir, 'Manufacturing/Control/Readme.md')),
  );
  check(
    'p5: the run ended with the split',
    taskCount('split-topic-page') === 1 && taskCount('create-explanation-page') === 0,
    requestLog.join(','),
  );
  const index = readIndex(notesDir);
  check(
    'p5: the new group pages carry no notes',
    !index.pages['Manufacturing/Power/Readme.md'] &&
      !index.pages['Manufacturing/Control/Readme.md'],
    JSON.stringify(index),
  );
}

// -- Phase 6: web search off evaluates without web results ------------------
{
  requestLog.length = 0; callsLog.length = 0;
  searchLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6');
  seed(
    contentDir,
    'Manufacturing/Electronics.md',
    `# Electronics\n\nIntro.\n\n${Array.from({ length: 5 }, (_, i) => `## Section ${i + 1}\n\nRaw.\n`).join('')}`,
  );
  const r = await agent(['--runs', '1'], {
    contentDir,
    notesDir,
    authorNotesDir,
    env: { TECHNOPEDIA_WEB_SEARCH_URL: 'off' },
  });
  console.log(`\n--- phase 6 (web off) exit=${r.status} ---\n${r.stdout}${r.stderr}`);

  check(
    'p6: evaluation ran without web queries',
    taskCount('evaluate-explanation-page') === 1 && searchLog.length === 0,
    requestLog.join(','),
  );
  check(
    'p6: the review notes are addressed in the same run',
    taskCount('address-notes') === 1 &&
      Object.keys(readIndex(notesDir).pages).length === 0,
    JSON.stringify(readIndex(notesDir)),
  );
}

// -- Phase 6b: simulations are built and improved through notes -------------
{
  // 6b-1: a note creates the simulation.
  {
    requestLog.length = 0; callsLog.length = 0;
    const { contentDir, notesDir, authorNotesDir } = freshDirs('p6b1');
    seed(
      contentDir,
      'Manufacturing/Electronics.md',
      `# Electronics\n\nIntro.\n\n${Array.from({ length: 5 }, (_, i) => `## Section ${i + 1}\n\nRaw.\n`).join('')}`,
    );
    const noteFile = path.join(TEST, 'p6b1', 'note.md');
    fs.mkdirSync(path.dirname(noteFile), { recursive: true });
    fs.writeFileSync(noteFile, 'Add a simulation of the discharge curve.\n');
    await authorNote(['Manufacturing/Electronics.md', noteFile], { contentDir, notesDir, authorNotesDir });
    const r = await agent(['--topic', 'Manufacturing', '--runs', '1'], {
      contentDir,
      notesDir,
      authorNotesDir,
      env: { TECHNOPEDIA_WEB_SEARCH_URL: 'off' },
    });
    console.log(`\n--- phase 6b (simulation from a note) exit=${r.status} ---\n${r.stdout}${r.stderr}`);
    const sim = path.join(contentDir, 'Manufacturing/Electronics.simulation.html');
    check(
      'p6b: addressing the note built the simulation file',
      content(sim).includes('<button>Simulate</button>'),
      content(sim),
    );
    check(
      'p6b: the page reflects the addressed note',
      content(path.join(contentDir, 'Manufacturing/Electronics.md')).includes('notes-addressed'),
    );
  }
  // 6b-2: a note improves an existing simulation.
  {
    requestLog.length = 0; callsLog.length = 0;
    const { contentDir, notesDir, authorNotesDir } = freshDirs('p6b2');
    seed(
      contentDir,
      'Manufacturing/Electronics.md',
      `# Electronics\n\nIntro.\n\n<iframe src="./Electronics.simulation.html" title="Simulation"></iframe>\n\n${Array.from({ length: 5 }, (_, i) => `## Section ${i + 1}\n\nRaw.\n`).join('')}`,
    );
    seed(
      contentDir,
      'Manufacturing/Electronics.simulation.html',
      '<!DOCTYPE html>\n<html><body>old simulation</body></html>\n',
    );
    const noteFile = path.join(TEST, 'p6b2', 'note.md');
    fs.mkdirSync(path.dirname(noteFile), { recursive: true });
    fs.writeFileSync(noteFile, 'Improve the simulation.\n');
    await authorNote(['Manufacturing/Electronics.md', noteFile], { contentDir, notesDir, authorNotesDir });
    const r = await agent(['--topic', 'Manufacturing', '--runs', '1'], {
      contentDir,
      notesDir,
      authorNotesDir,
      env: { TECHNOPEDIA_WEB_SEARCH_URL: 'off' },
    });
    console.log(`--- phase 6b2 (simulation improved) exit=${r.status} ---\n${r.stdout}${r.stderr}`);
    const sim = content(path.join(contentDir, 'Manufacturing/Electronics.simulation.html'));
    check('p6b2: the existing simulation was improved', sim.includes('simulation improved'), sim);
    check(
      'p6b2: only one iframe remains on the page',
      (content(path.join(contentDir, 'Manufacturing/Electronics.md')).match(/<iframe/g) ?? []).length === 1,
    );
  }
}

// -- Phase 6c: structural violations are flagged to the evaluation ----------
{
  requestLog.length = 0; callsLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6c');
  seed(
    contentDir,
    'Manufacturing/Readme.md',
    '# Manufacturing\n\nSubtopics:\n\n- [Electronics](./Electronics.md)\n',
  );
  seed(
    contentDir,
    'Manufacturing/Electronics/Readme.md',
    '# Electronics\n\nChild topic page, reachable but linked with the wrong form.\n',
  );
  const r = await agent(['--runs', '2'], {
    contentDir,
    notesDir,
    authorNotesDir,
    env: { TECHNOPEDIA_WEB_SEARCH_URL: 'off' },
  });
  console.log(`\n--- phase 6c (structural findings) exit=${r.status} ---\n${r.stdout}${r.stderr}`);

  check(
    'p6c: broken links and subtopics outside the table reach the evaluation',
    r.status === 0 &&
      r.stdout.includes('links to pages that do not exist: Electronics.md') &&
      r.stdout.includes('subtopics not listed in the categorization table'),
    r.stdout.slice(-300),
  );
  check(
    'p6c: a child page not referenced in its parent is flagged on its own review',
    r.stdout.includes('this topic page is not referenced in its parent topic page'),
    r.stdout.slice(-300),
  );
  check(
    'p6c: the notes of a reviewed page are addressed when the editor picks it',
    content(path.join(contentDir, 'Manufacturing/Electronics/Readme.md')).includes(
      'notes-addressed',
    ) &&
      JSON.stringify(Object.keys(readIndex(notesDir).pages)) === '["Manufacturing/Readme.md"]',
    JSON.stringify(readIndex(notesDir)),
  );
}

// -- Phase 6d: the agent uses its tools ---------------------------------------
{
  requestLog.length = 0; callsLog.length = 0; assistantReasoningLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6d');
  seed(
    contentDir,
    'Manufacturing/Electronics.md',
    '# Electronics\n\nTOOLCASE header.\n\n## Section one\n\nRaw.\n',
  );
  const noteFile = path.join(TEST, 'p6d', 'note.md');
  fs.mkdirSync(path.dirname(noteFile), { recursive: true });
  fs.writeFileSync(noteFile, 'Use tools to fix the header of this page.\n');
  await authorNote(['Manufacturing/Electronics.md', noteFile], { contentDir, notesDir, authorNotesDir });
  const r = await agent(['--runs', '1'], {
    contentDir,
    notesDir,
    authorNotesDir,
    env: { TECHNOPEDIA_WEB_SEARCH_URL: 'off' },
  });
  console.log(`\n--- phase 6d (tools) exit=${r.status} ---\n${r.stdout}${r.stderr}`);

  const elec = content(path.join(contentDir, 'Manufacturing/Electronics.md'));
  check('p6d: edit_file applied the change asked by the note', elec.includes('Fixed by edit_file.'), elec);
  check(
    'p6d: delete_file removed the junk file',
    !exists(path.join(contentDir, 'Manufacturing/Junk.md')),
  );
  const notesFile = path.join(authorNotesDir, 'Manufacturing__Electronics.md');
  check(
    'p6d: the review and the addressing each used their tools',
    taskCount('evaluate-explanation-page') === 1 &&
      taskCount('address-notes') === 1 &&
      /tool grep\(/.test(r.stdout) &&
      /tool run_js\(/.test(r.stdout) &&
      (r.stdout.match(/tool edit_file\(/g) ?? []).length === 1,
    requestLog.join(','),
  );
  check(
    'p6d: tool-round continuations carry the previous reasoning back to the model',
    assistantReasoningLog.some((turns) => turns.includes('mock reasoning')),
    JSON.stringify(assistantReasoningLog),
  );
  check(
    'p6d: the author note persists (author notes are never deleted)',
    content(notesFile).includes('Use tools to fix the header'),
  );
  check(
    'p6d: tool uses are logged with their params',
    /tool (read_file|edit_file|grep|run_js)\(/.test(r.stdout),
    r.stdout.slice(-400),
  );
  check(
    'p6d: every step of the loop is logged with its number',
    /step 1\.1\.2:/.test(r.stdout) &&
      /step 1\.2:/.test(r.stdout) &&
      /step 2\.1\.4:/.test(r.stdout) &&
      /step 2\.3\.3:/.test(r.stdout),
    r.stdout.slice(-500),
  );
}

// -- Phase 6e: hitting the tool round limit forces the answer, not a failure -
{
  requestLog.length = 0; callsLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6e');
  seed(
    contentDir,
    'Manufacturing/Electronics.md',
    `# Electronics\n\nIntro.\n\n${Array.from({ length: 5 }, (_, i) => `## Section ${i + 1}\n\nRaw.\n`).join('')}`,
  );
  const noteFile = path.join(TEST, 'p6e', 'note.md');
  fs.mkdirSync(path.dirname(noteFile), { recursive: true });
  fs.writeFileSync(noteFile, 'Loop tools here.\n');
  await authorNote(['Manufacturing/Electronics.md', noteFile], { contentDir, notesDir, authorNotesDir });
  const r = await agent(['--topic', 'Manufacturing', '--runs', '1'], {
    contentDir,
    notesDir,
    authorNotesDir,
    env: { TECHNOPEDIA_WEB_SEARCH_URL: 'off' },
  });
  console.log(`\n--- phase 6e (tool round limit) exit=${r.status} ---\n${r.stdout.slice(-600)}${r.stderr.slice(-300)}`);

  check(
    'p6e: the tool round limit forces the answer instead of failing the run',
    r.status === 0 &&
      taskCount('address-notes') === 1 &&
      (r.stdout.match(/tool grep\(/g) ?? []).length >= 24 &&
      r.stdout.includes('tool round limit') &&
      r.stdout.includes('forcing the final answer'),
    `status=${r.status}, tool rounds=${(r.stdout.match(/tool grep\(/g) ?? []).length}`,
  );
  check(
    'p6e: the wrapped-up answer still completed the work',
    r.stdout.includes('3 resolved') &&
      content(path.join(authorNotesDir, 'Manufacturing__Electronics.md')).includes('Loop tools here'),
  );
}

// -- Phase 6f: empty responses are retried, big tool results are truncated ----
{
  requestLog.length = 0; callsLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6f');
  seed(
    contentDir,
    'Manufacturing/Electronics.md',
    '# Electronics\n\nEMPTYFIRST marker.\n\n## Section one\n\nRaw.\n',
  );
  seed(contentDir, 'Manufacturing/Big.txt', `# Big\n\n${'x'.repeat(12000)}\n`);
  const r = await agent(['--topic', 'Manufacturing', '--runs', '1'], {
    contentDir,
    notesDir,
    authorNotesDir,
    env: { TECHNOPEDIA_WEB_SEARCH_URL: 'off' },
  });
  console.log(`\n--- phase 6f (empty reply + truncation) exit=${r.status} ---\n${r.stdout.slice(-500)}${r.stderr.slice(-300)}`);

  check(
    'p6f: an empty model response is retried, not fatal',
    r.status === 0 && taskCount('evaluate-explanation-page') === 2,
    `status=${r.status}, calls=${taskCount('evaluate-explanation-page')}`,
  );
  check(
    'p6f: the large tool result was truncated back into the conversation',
    r.status === 0 &&
      content(path.join(contentDir, 'Manufacturing/Electronics.md')).includes('notes-addressed'),
    r.stdout.slice(-300),
  );
  check(
    'p6f: the visit still ended with an empty notes queue',
    Object.keys(readIndex(notesDir).pages).length === 0,
    JSON.stringify(readIndex(notesDir)),
  );
}

// -- Phase 6g: the model deleting the visited page does not crash the run -----
{
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6g');
  seed(
    contentDir,
    'Manufacturing/Readme.md',
    '# Manufacturing\n\n<table>\n<tr><td>[Electronics](./Electronics/Readme.md)</td></tr>\n</table>\n',
  );
  fs.mkdirSync(notesDir, { recursive: true });
  fs.writeFileSync(
    path.join(notesDir, 'Manufacturing__Readme.md'),
    '## Delete\n\nDelete the page entirely.\n',
  );
  const r = await agent(['--topic', 'Manufacturing', '--runs', '1'], {
    contentDir,
    notesDir,
    authorNotesDir,
  });
  console.log(`\n--- phase 6g (page deleted mid-visit) exit=${r.status} ---\n${r.stdout}${r.stderr}`);
  check(
    'p6g: a page deleted mid-visit ends the run cleanly (no ENOENT)',
    r.status === 0 &&
      r.stdout.includes('was deleted during the visit') &&
      !r.stdout.includes('ENOENT') &&
      !exists(path.join(contentDir, 'Manufacturing/Readme.md')),
    r.stderr.slice(0, 300),
  );
}

// -- Phase 6h: table rule violations, and parent cleanup on page deletion ------
{
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6h');
  seed(
    contentDir,
    'Manufacturing/Readme.md',
    [
      '# Manufacturing',
      '',
      '<table>',
      '<tr><th>Class</th><th>Relation</th></tr>',
      '<tr><td>[Electronics](./Electronics/Readme.md)</td><td>builds devices</td></tr>',
      '<tr><td>[Electronics](./Electronics/Readme.md)</td><td>builds devices</td></tr>',
      '</table>',
      '',
    ].join('\n'),
  );
  seed(
    contentDir,
    'Manufacturing/Electronics/Readme.md',
    '# Electronics\n\n<table>\n<tr><th>Class</th></tr>\n</table>\n',
  );
  fs.mkdirSync(notesDir, { recursive: true });
  fs.writeFileSync(
    path.join(notesDir, 'Manufacturing__Electronics__Readme.md'),
    '## Delete\n\nDelete the page entirely.\n',
  );
  const r = await agent(['--runs', '2'], {
    contentDir,
    notesDir,
    authorNotesDir,
  });
  console.log(`\n--- phase 6h (table rule + deletion cleanup) exit=${r.status} ---\n${r.stdout}${r.stderr}`);
  check(
    'p6h: a duplicated link across rows is a structural finding',
    r.stdout.includes('categorization table rule violations') &&
      r.stdout.includes('is listed in 2 rows'),
    r.stdout.slice(0, 300),
  );
  const parent = content(path.join(contentDir, 'Manufacturing/Readme.md'));
  check(
    'p6h: deleting the subtopic strips its link from the parent',
    r.status === 0 &&
      !r.stdout.includes('ENOENT') &&
      !exists(path.join(contentDir, 'Manufacturing/Electronics/Readme.md')) &&
      !parent.includes('./Electronics/Readme.md') &&
      parent.includes('Electronics') &&
      r.stdout.includes('removed the link to the deleted page'),
    parent,
  );
}

// -- Phase 6i: grep/find_files can be scoped to a folder -----------------------
{
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6i');
  seed(contentDir, 'Manufacturing/Electronics.md', '# Electronics\n');
  seed(contentDir, 'Physics/Electromagnetism.md', '# Electromagnetism\n');
  const store = new Store({ contentDir, notesDir, authorNotesDir, logger: () => {} });
  const tools = createTools({ config: { contentDir, webSearchUrl: 'off' }, store, logger: () => {} });
  const scopedFind = await tools.exec('find_files', { pattern: 'Electro', folder: 'Manufacturing' });
  const allFind = await tools.exec('find_files', { pattern: 'Electro' });
  check(
    'p6i: find_files scoped to a folder only returns that subtree',
    JSON.stringify(scopedFind) === JSON.stringify({ files: ['Manufacturing/Electronics.md'] }) &&
      allFind.files.length === 2,
    `${JSON.stringify(scopedFind)} / ${JSON.stringify(allFind)}`,
  );
  const scopedGrep = await tools.exec('grep', { pattern: '^# ', folder: 'Physics' });
  check(
    'p6i: grep scoped to a folder only matches inside it',
    scopedGrep.matches.length === 1 && scopedGrep.matches[0].file === 'Physics/Electromagnetism.md',
    JSON.stringify(scopedGrep),
  );
  const missing = await tools.exec('grep', { pattern: 'x', folder: 'Nope' });
  check(
    'p6i: a missing folder is a tool error, not an empty result',
    typeof missing.error === 'string' && missing.error.includes('does not exist'),
    JSON.stringify(missing),
  );
}

// -- Phase 6j: a non-JSON reply is corrected inside the conversation ---------
{
  requestLog.length = 0; callsLog.length = 0;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6j');
  seed(
    contentDir,
    'Manufacturing/Electronics.md',
    '# Electronics\n\nBADJSON marker.\n\n## Section one\n\nRaw.\n',
  );
  const r = await agent(['--runs', '1'], {
    contentDir,
    notesDir,
    authorNotesDir,
    env: { TECHNOPEDIA_WEB_SEARCH_URL: 'off' },
  });
  console.log(`\n--- phase 6j (JSON correction) exit=${r.status} ---\n${r.stdout}${r.stderr}`);
  check(
    'p6j: the run recovers when the model replies with prose instead of JSON',
    r.status === 0 &&
      r.stdout.includes('asking it to correct itself') &&
      !r.stdout.includes('failed:') &&
      content(path.join(contentDir, 'Manufacturing/Electronics.md')).includes('notes-addressed'),
    r.stderr.slice(0, 300),
  );
  check(
    'p6j: the corrected review produced its notes (no duplicated evaluation)',
    (r.stdout.match(/evaluating the page/g) ?? []).length === 1 &&
      (r.stdout.match(/evaluation left 1 improvement note/g) ?? []).length === 1 &&
      taskCount('address-notes') === 1,
    r.stdout.slice(0, 400),
  );
}

// -- Phase 6k: edit_file rejects known invalid LaTeXMarkdown math ------------
{
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p6k');
  const store = new Store({ contentDir, notesDir, authorNotesDir, logger: () => {} });
  const tools = createTools({ config: { contentDir, webSearchUrl: 'off' }, store, logger: () => {} });

  // Creating a file with the broken forms applies the edit but returns an
  // error listing the offending lines.
  const bad = await tools.exec('edit_file', {
    path: 'Manufacturing/Electronics.md',
    lineno_start: 1,
    lineno_end: 1,
    new_content: [
      '# Electronics',
      '',
      'A **B-tree of order $`m$`$** is an $`m$`$-ary search tree.',
      '',
      'It costs $3.20 per unit.',
      '',
      '<table><tr><td>Order</td><td>$`m`</td></tr></table>',
      '',
      '$$E = mc^2$$',
      '',
      'It runs in $O(n)$ time.',
      '',
      'The escape $`e^{i\\pi}$` works.',
    ].join('\n'),
  });
  check(
    'p6k: an edit with invalid math returns an error naming the offending lines',
    typeof bad.error === 'string' &&
      bad.error.includes('invalid LaTeXMarkdown math') &&
      /line 3/.test(bad.error) &&
      bad.error.includes('another edit_file'),
    JSON.stringify(bad).slice(0, 400),
  );
  const written = content(path.join(contentDir, 'Manufacturing/Electronics.md'));
  check('p6k: the flagged edit was still applied to the file', written.includes('B-tree of order'), written.slice(0, 100));

  // Repairing the whole file goes through without an error.
  const good = await tools.exec('edit_file', {
    path: 'Manufacturing/Electronics.md',
    lineno_start: 1,
    lineno_end: 13,
    new_content: [
      '# Electronics',
      '',
      'A **B-tree of order $`m`** is an $`m`-ary search tree.',
      '',
      'It costs $3.20 per unit and $5 to ship.',
    ].join('\n'),
  });
  check('p6k: a repaired file passes the check (money dollars included)', good.error === undefined, JSON.stringify(good));

  // Every known form is detected; the counts: line 3 (two), 7 (HTML), 9 ($$), 11 (plain).
  const all = findMathProblems(
    [
      'ok $`m` here',
      'a $`m$`$ and $`m`$ and $`m$` mixed',
      '$$E$$',
      'plain $L^p$ spaces',
      '```math',
      '$x$',
      '```',
      '<td>$`m`</td>',
    ].join('\n'),
  );
  check(
    'p6k: every known invalid form is detected, valid math and fences are not',
    all.length === 7 &&
      all.filter((p) => p.line === 2).length === 3 &&
      all.some((p) => p.line === 3) &&
      all.some((p) => p.line === 4) &&
      all.some((p) => p.line === 6) &&
      all.some((p) => p.line === 8),
    JSON.stringify(all.map((p) => `${p.line}:${p.snippet}`)),
  );
}

// -- Phase 7: no --runs loops indefinitely ------------------------------------
{
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p7');
  const child = spawn('node', [path.join(ROOT, 'agent/index.js'), '--interval', '0'], {
    env: {
      ...process.env,
      OPENAI_HOST: `http://127.0.0.1:${PORT}`,
      TECHNOPEDIA_CONTENT_DIR: contentDir,
      TECHNOPEDIA_NOTES_DIR: notesDir,
      TECHNOPEDIA_WEB_SEARCH_URL: `http://127.0.0.1:${PORT}/search?q={q}`,
      TECHNOPEDIA_WEB_TIMEOUT_MS: '5000',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let stdout = '';
  child.stdout.on('data', (chunk) => (stdout += chunk));
  child.stderr.on('data', (chunk) => (stdout += chunk));
  // The default is to loop forever: wait for it to finish a 3rd run on its
  // own (it must not have exited), then kill it.
  const thirdRun = new Promise((resolve) => {
    const timer = setInterval(() => {
      if (/^\[run 3\] done:/m.test(stdout)) {
        clearInterval(timer);
        resolve(true);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(timer);
      resolve(false);
    }, 60000);
  });
  const sawThirdRun = await thirdRun;
  child.kill('SIGTERM');
  console.log(`\n--- phase 7 (indefinite loop) ---\n${stdout.slice(-400)}`);
  check('p7: loops indefinitely by default', sawThirdRun && child.exitCode === null);
  const finite = await agent(['--topic', 'Manufacturing', '--runs', '2', '--interval', '0'], {
    contentDir,
    notesDir,
  });
  check(
    'p7: --runs 2 still exits',
    finite.status === 0 && finite.stdout.includes('[run 2/2] done:'),
    `status=${finite.status}`,
  );
}

// -- Phase 7b: an interrupted run resumes from its checkpoint ----------------
{
  requestLog.length = 0; callsLog.length = 0;
  flags.failResumeEval = true;
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p7b');
  seed(
    contentDir,
    'Manufacturing/Electronics.md',
    `# Electronics\n\nRESUME marker.\n\n${Array.from({ length: 5 }, (_, i) => `## Section ${i + 1}\n\nRaw.\n`).join('')}`,
  );
  const pagesDb = path.join(TEST, 'p7b', 'pages.json');
  const config = loadConfig({
    openaiHost: `http://127.0.0.1:${PORT}`,
    contentDir,
    notesDir,
    authorNotesDir,
    pagesDb,
    webSearchUrl: 'off',
  });
  const store = new Store({ contentDir, notesDir, authorNotesDir, pagesDb, logger: () => {} });
  const llm = new LlmClient(config, () => {});
  const state = {};
  const lines = [];
  const log = (line) => lines.push(line);

  let threw = null;
  try {
    await runAgent({ config, store, llm, logger: log, rng: makeRng(), state });
  } catch (err) {
    threw = err;
  }
  check(
    'p7b: the interrupted run throws with a checkpoint at the interrupted review',
    threw !== null &&
      state.phase === 'review' &&
      state.page === 'Manufacturing/Electronics.md',
    JSON.stringify(state),
  );

  flags.failResumeEval = false;
  requestLog.length = 0; callsLog.length = 0;
  const summary = await runAgent({ config, store, llm, logger: log, rng: makeRng(), state });
  check(
    'p7b: the retry resumes at the checkpoint and completes the run',
    state.phase === null &&
      state.page === null &&
      summary.page?.join('/') === 'Manufacturing/Electronics' &&
      lines.some((l) => l.includes('resuming the run at step 1.2')),
    JSON.stringify(state),
  );
  check(
    'p7b: the resumed run completes the review once, then edits the page',
    taskCount('evaluate-explanation-page') === 1 &&
      taskCount('address-notes') === 1 &&
      taskCount('evaluate-topic-page') === 0 &&
      taskCount('create-topic-page') === 0 &&
      taskCount('create-explanation-page') === 0,
    requestLog.join(','),
  );
  check(
    'p7b: the resumed run consumed its notes',
    Object.keys(readIndex(notesDir).pages).length === 0 &&
      content(path.join(contentDir, 'Manufacturing/Electronics.md')).includes('notes-addressed'),
  );
  check(
    'p7b: the resumed run recorded the timestamps and reset the score (2.4)',
    (() => {
      const db = JSON.parse(content(pagesDb));
      const entry = db.pages['Manufacturing/Electronics.md'];
      return entry?.score === null &&
        typeof entry?.reviewedAt === 'string' &&
        typeof entry?.editedAt === 'string';
    })(),
    content(pagesDb),
  );
  flags.failResumeEval = false;
}

// -- Phase 8: dry run writes nothing -------------------------------------------
{
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p8');
  const r = await agent(['--topic', 'Manufacturing', '--runs', '1', '--dry-run'], {
    contentDir,
    notesDir,
  });
  console.log(`\n--- phase 8 (dry run) exit=${r.status} ---\n${r.stdout}${r.stderr}`);
  check(
    'p8: dry run writes nothing',
    !exists(contentDir) || fs.readdirSync(contentDir).length === 0,
  );
  check('p8: dry run reports would-write', r.stdout.includes('(dry run) would write'));
}

// -- Phase 9: unreachable server gives a friendly error ----------------------
{
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p9');
  const r = await agent(['--topic', 'Manufacturing', '--runs', '1'], {
    contentDir,
    notesDir,
    authorNotesDir,
    env: { OPENAI_HOST: 'http://127.0.0.1:1' },
  });
  console.log(`\n--- phase 9 (unreachable server) exit=${r.status} ---\n${r.stdout}${r.stderr}`);
  check(
    'p9: friendly error on unreachable server',
    r.status === 1 && r.stderr.includes('Is llama.cpp-server running?'),
  );
  check(
    'p9: only the empty root page is written (the content needs the LLM)',
    exists(path.join(contentDir, 'Manufacturing/Readme.md')) &&
      content(path.join(contentDir, 'Manufacturing/Readme.md')).trim() === '' &&
      !exists(notesDir),
    fs.existsSync(contentDir) ? fs.readdirSync(contentDir).join(',') : '(none)',
  );
}

// -- Phase 10: --debug records the full LLM transcript ------------------------
{
  const { contentDir, notesDir, authorNotesDir } = freshDirs('p10');
  const logPath = path.join(TEST, 'p10', 'transcript.jsonl');
  const r = await agent(['--topic', 'Manufacturing', '--runs', '1', '--debug'], {
    contentDir,
    notesDir,
    authorNotesDir,
    env: { TECHNOPEDIA_DEBUG_LOG: logPath },
  });
  console.log(`\n--- phase 10 (debug transcript) exit=${r.status} ---\n${r.stdout}${r.stderr}`);
  const lines = exists(logPath)
    ? fs
        .readFileSync(logPath, 'utf8')
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line))
    : [];
  const chats = lines.filter((e) => e.kind === 'chat');
  const labels = new Set(chats.map((e) => e.label).filter(Boolean));
  check(
    'p10: debug run succeeds and announces the transcript path',
    r.status === 0 && r.stdout.includes('LLM transcript:'),
    r.stdout.slice(0, 200),
  );
  check(
    'p10: transcript records responses and finish reasons, never prompts or history',
    chats.length > 0 &&
      chats.every(
        (e) =>
          typeof e.response === 'string' &&
          e.response.length > 0 &&
          e.finishReason === 'stop' &&
          !('messages' in e),
      ),
    `${chats.length} chat entries`,
  );
  check(
    'p10: transcript captures the model reasoning separately from the content',
    chats.every((e) => e.reasoning === 'mock reasoning'),
    'reasoning missing',
  );
  check(
    'p10: transcript entries carry the task label',
    labels.has('create-topic-page') || labels.has('determine-type'),
    [...labels].join(','),
  );
}

console.log(`\n${failures.length === 0 ? 'ALL PASS' : `FAILURES: ${failures.join(', ')}`}`);
process.exit(failures.length === 0 ? 0 : 1);
