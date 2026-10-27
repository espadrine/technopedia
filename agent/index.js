// CLI entry point for the Technopedia AI contributor agent.
//
// Usage:
//   node agent/index.js [--runs N] [--topic "Manufacturing"] [--interval S] [--dry-run] [--quiet]
//
// By default the agent loops indefinitely: it performs one run (pick a
// topic, walk to a page, work on it), pauses --interval seconds (default 1),
// and starts over. Use --runs N to stop after N runs instead.
//
// Environment:
//   TECHNOPEDIA_HOST     LLM server, OpenAI-compatible (llama.cpp-server)
//                   default: http://localhost:9931
//                   when set (without TECHNOPEDIA_MODEL), no model field is sent
//                   and the server uses its default; when neither is set,
//                   the agent asks the server /v1/models once at startup and
//                   picks the biggest loaded model (meta.size), deriving the
//                   completion budget from its meta.n_ctx (the actual
//                   runtime context; context_length is only the fallback)
//   TECHNOPEDIA_MODEL    model name to request, used verbatim
//   TECHNOPEDIA_API_KEY  bearer token for the LLM server, sent as an
//                   Authorization header on every request (the Mistral API
//                   requires one; MISTRAL_API_KEY is honored as a fallback)
//   TECHNOPEDIA_REASONING_EFFORT  sent verbatim as reasoning_effort (Mistral:
//                   "none" skips the thinking trace, "high" includes it;
//                   mistral-large-4 reasons by default)
//   TECHNOPEDIA_DEBUG    set to 1 to log every LLM interaction (see --debug)
//   TECHNOPEDIA_PARALLELISM  reviewers and editors each work on N pages in
//                   parallel, one worker per page (default: 1)
//   TECHNOPEDIA_CONTENT_DIR  default: <repo>/content
//   TECHNOPEDIA_NOTES_DIR    default: <repo>/notes (agent notes)
//   TECHNOPEDIA_AUTHOR_NOTES_DIR default: <repo>/author-notes (author notes)
//   TECHNOPEDIA_PAGES_DB     default: <repo>/pages.json (the page database)

import { loadConfig } from './config.js';
import { LlmClient, LlmError } from './llm.js';
import { runAgent } from './agent.js';
import { Store } from './store.js';
import { makeRng, sleep } from './util.js';

function parseArgs(argv) {
  const args = { runs: null, interval: 1, topic: null, dryRun: false, quiet: false, debug: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--runs') {
      args.runs = Number(argv[++i]);
    } else if (arg === '--interval') {
      args.interval = Number(argv[++i]);
    } else if (arg === '--topic') {
      args.topic = argv[++i];
    } else if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (arg === '--quiet') {
      args.quiet = true;
    } else if (arg === '--debug') {
      args.debug = true;
    } else if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  if (args.runs !== null && (!Number.isInteger(args.runs) || args.runs < 1)) {
    throw new Error('--runs must be a positive integer');
  }
  if (!Number.isFinite(args.interval) || args.interval < 0) {
    throw new Error('--interval must be a non-negative number');
  }
  return args;
}

const HELP = `Technopedia AI contributor agent

Loops indefinitely by default; stop it with Ctrl-C.

Options:
  --runs N        Run N times and exit (default: loop indefinitely)
  --interval S    Seconds to pause between runs (default: 1)
  --topic NAME    The high-level topic page to create when none exists at all
  --dry-run       Do not write anything; print what would be written
  --quiet         Only print the per-run summary
  --debug         Log every LLM request and response to logs/llm-transcript.jsonl
  -h, --help      Show this help

Environment:
  TECHNOPEDIA_HOST     OpenAI-compatible LLM server (default: http://localhost:9931)`;

export async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) {
    console.log(HELP);
    return 0;
  }

  const config = loadConfig({ dryRun: args.dryRun, debug: args.debug });
  const verbose = (line) => {
    if (!args.quiet) console.log(line);
  };
  const store = new Store({
    contentDir: config.contentDir,
    notesDir: config.notesDir,
    authorNotesDir: config.authorNotesDir,
    pagesDb: config.pagesDb,
    dryRun: config.dryRun,
    logger: verbose,
  });
  const llm = new LlmClient(config, verbose);
  const rng = makeRng();

  // Resolve the model once, before the loop (not on every chat).
  try {
    await llm.resolveModel();
  } catch (err) {
    console.error(`Could not set up the LLM client: ${err.message}`);
    return 1;
  }
  if (llm.model) {
    verbose(
      `LLM model: ${llm.model}${llm.autoMaxTokens ? ` (max tokens: ${llm.autoMaxTokens})` : ''}`,
    );
  }
  if (config.debug) {
    verbose(`LLM transcript: ${config.debugLogPath}`);
  }

  // Each run is one iteration of the README's loop, and every LLM call
  // carries only the base prompt plus its task: the context is reset to the
  // base prompt on every loop.
  let run = 1;
  let runState = null; // checkpoint state of the run being retried
  let networkRetries = 0;
  const MAX_NETWORK_RETRIES = 3;
  const NETWORK_RETRY_DELAY = 30; // seconds
  while (args.runs === null || run <= args.runs) {
    const prefix =
      args.runs === null ? `[run ${run}] ` : args.runs > 1 ? `[run ${run}/${args.runs}] ` : '';
    // On a retry we pass the checkpoint captured by the failed attempt so the
    // walk resumes where it stopped instead of starting the run over.
    const state = runState ?? {};
    try {
      const summary = await runAgent({
        config,
        store,
        llm,
        logger: (line) => verbose(`${prefix}${line}`),
        rng,
        topic: args.topic,
        state,
      });
      networkRetries = 0;
      runState = null;
      const page = summary.pages.length > 0 ? summary.pages.join(', ') : '(none)';
      const action = summary.actions.length > 0 ? `, actions: ${summary.actions.join(', ')}` : '';
      const splits = summary.splits.length > 0 ? `, ${summary.splits.length} split(s)` : '';
      console.log(
        `${prefix}done: worked on "${page}"${action}, ` +
          `${summary.pagesWritten.length} page(s) written, ` +
          `${summary.notesAdded} note(s) added, ${summary.notesResolved} resolved${splits}`,
      );
    } catch (err) {
      const message = err instanceof LlmError ? err.message : (err.stack ?? String(err));
      console.error(`${prefix}failed: ${message}`);
      // A transient network failure (eg. the system briefly running out of
      // file descriptors, or the server restarting) retries the SAME run
      // from its checkpoint instead of starting over.
      if (err instanceof LlmError && err.kind === 'network') {
        if (networkRetries < MAX_NETWORK_RETRIES) {
          networkRetries += 1;
          runState = state;
          console.error(
            `LLM server unreachable; resuming run ${run} from its checkpoint in ${NETWORK_RETRY_DELAY}s ` +
              `(attempt ${networkRetries}/${MAX_NETWORK_RETRIES})`,
          );
          await sleep(NETWORK_RETRY_DELAY * 1000);
          continue;
        }
        console.error(
          `Could not reach the LLM server at ${config.host}. ` +
            'Is llama.cpp-server running? Set TECHNOPEDIA_HOST to override.',
        );
        return 1;
      }
      runState = null;
      if (args.runs !== null && run === args.runs) return 1;
    }
    run += 1;
    const moreRuns = args.runs === null || run <= args.runs;
    if (moreRuns && args.interval > 0) {
      await sleep(args.interval * 1000);
    }
  }
  return 0;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error(err.stack ?? String(err));
      process.exit(1);
    });
}
