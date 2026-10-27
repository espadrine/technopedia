// Configuration for the Technopedia AI contributor agent.
//
// The agent talks to an OpenAI-compatible server (typically llama.cpp-server)
// whose address is given by TECHNOPEDIA_HOST, defaulting to localhost on the
// llama.cpp standard port 9931.

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function normalizeHost(raw) {
  let host = (raw ?? '').trim();
  if (!host) host = 'http://localhost:9931';
  host = host.replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(host)) host = `http://${host}`;
  return host;
}

// How many pages the reviewer phase and the editor phase work on at once
// (one worker per page). Anything that is not a positive integer falls back
// to 1: a sequential run.
function parseParallelism(raw) {
  const n = Math.floor(Number(raw ?? 1));
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export function loadConfig(overrides = {}) {
  return {
    root: ROOT,
    host: normalizeHost(overrides.technopediaHost ?? process.env.TECHNOPEDIA_HOST),
    // Model served by the host; auto-detected from /v1/models when unset.
    model: overrides.model ?? process.env.TECHNOPEDIA_MODEL ?? null,
    // Ask the server which model it has loaded (and its context length):
    // only when neither TECHNOPEDIA_MODEL nor TECHNOPEDIA_HOST are set.
    autoResolveModel:
      !(overrides.model ?? process.env.TECHNOPEDIA_MODEL) &&
      !(overrides.technopediaHost ?? process.env.TECHNOPEDIA_HOST),
    temperature: Number(overrides.temperature ?? process.env.TECHNOPEDIA_TEMPERATURE ?? 0.7),
    // llama.cpp servers with reasoning models put the chain of thought in
    // message.reasoning_content; reasoning_format (eg "deepseek") requests
    // that split when set (the server's --reasoning setting also enables it).
    reasoningFormat: overrides.reasoningFormat ?? process.env.TECHNOPEDIA_REASONING_FORMAT ?? null,
    maxTokens:
      overrides.maxTokens ??
      (process.env.TECHNOPEDIA_MAX_TOKENS ? Number(process.env.TECHNOPEDIA_MAX_TOKENS) : undefined),
    timeoutMs: Number(overrides.timeoutMs ?? process.env.TECHNOPEDIA_TIMEOUT_MS ?? 300000),
    // Reviewers and editors each work on this many pages in parallel, one
    // worker per page (TECHNOPEDIA_PARALLELISM); 1 keeps each phase
    // sequential.
    parallelism: parseParallelism(overrides.parallelism ?? process.env.TECHNOPEDIA_PARALLELISM),
    // Web search for fact-checking. null: DuckDuckGo HTML; 'off': disabled;
    // otherwise a URL template with "{q}", returning JSON results.
    webSearchUrl: overrides.webSearchUrl ?? process.env.TECHNOPEDIA_WEB_SEARCH_URL ?? null,
    webTimeoutMs: Number(overrides.webTimeoutMs ?? process.env.TECHNOPEDIA_WEB_TIMEOUT_MS ?? 10000),
    // Maximum tool round-trips per LLM task before the final answer is forced.
    maxToolRounds: Number(overrides.maxToolRounds ?? process.env.AGENT_MAX_TOOL_ROUNDS ?? 100),
    contentDir:
      overrides.contentDir ?? process.env.TECHNOPEDIA_CONTENT_DIR ?? path.join(ROOT, 'content'),
    notesDir:
      overrides.notesDir ?? process.env.TECHNOPEDIA_NOTES_DIR ?? path.join(ROOT, 'notes'),
    // Author notes (written with `npm run author-note`) live in their own
    // folder, separate from the agent's notes.
    authorNotesDir:
      overrides.authorNotesDir ??
      process.env.TECHNOPEDIA_AUTHOR_NOTES_DIR ??
      path.join(ROOT, 'author-notes'),
    // The page database (README "Automatic generation"): one entry per page,
    // with its type, score and latest review timestamp.
    pagesDb:
      overrides.pagesDb ?? process.env.TECHNOPEDIA_PAGES_DB ?? path.join(ROOT, 'pages.json'),
    // High-level topics, from the Technopedia README.
    topics: ['Physics', 'Mathematics', 'Computer Science', 'Manufacturing'],
    maxDepth: Number(overrides.maxDepth ?? process.env.AGENT_MAX_DEPTH ?? 6),
    dryRun: overrides.dryRun ?? false,
    // Full-interaction transcript: every request, raw response, finish reason
    // and tool round-trip, appended as JSON lines (--debug / TECHNOPEDIA_DEBUG=1).
    debug: overrides.debug ?? process.env.TECHNOPEDIA_DEBUG === '1',
    debugLogPath:
      overrides.debugLogPath ??
      process.env.TECHNOPEDIA_DEBUG_LOG ??
      path.join(ROOT, 'logs', 'llm-transcript.jsonl'),
  };
}
