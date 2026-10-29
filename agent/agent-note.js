// CLI for leaving notes on pages as the agent itself (eg. notes carried over
// from a manual session, or follow-ups the agent should pick up later).
//
//   npm run agent-note -- Physics/Electromagnetism/Readme.md ./my-note.md
//   cat my-note.md | npm run agent-note -- Physics/Readme.md -
//
// Like author notes, the note is stored in a notes folder (never in the page
// content, so it never appears in the static build), but unlike author notes
// it lands in the agent's notes folder (README 1.2.3): the AI contributor
// agent reads it, addresses it, and deletes it on its next visit to that page.

import fs from 'node:fs';
import path from 'node:path';
import { loadConfig } from './config.js';
import { Store } from './store.js';

const HELP = `Leave an agent note on a Technopedia page.

Usage:
  npm run agent-note -- <page> <note-file> [options]

The note is stored in the notes folder, not in the page, and the AI
contributor agent reads it, addresses it, and deletes it on its next
visit to the page.

Arguments:
  page        Page path, relative to the content directory
              (eg. Physics/Electromagnetism/Readme.md)
  note-file   File containing the note, or '-' to read it from stdin

Options:
  --title T   Title of the note (default: the note file's name)
  -h, --help  Show this help

Examples:
  npm run agent-note -- Physics/Electromagnetism/Readme.md ./my-note.md
  echo "Add a worked example." | npm run agent-note -- Physics/Readme.md - --title Example`;

function parseArgs(argv) {
  const args = { page: null, noteFile: null, title: null, help: false };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
      args.help = true;
    } else if (arg === '--title') {
      args.title = argv[++i];
      if (args.title === undefined) throw new Error('--title requires a value');
    } else if (arg === '--') {
      positional.push(...argv.slice(i + 1));
      break;
    } else if (arg.startsWith('-') && arg !== '-') {
      throw new Error(`unknown option: ${arg}`);
    } else {
      positional.push(arg);
    }
  }
  if (positional.length > 0) args.page = positional[0];
  if (positional.length > 1) args.noteFile = positional[1];
  if (positional.length > 2) throw new Error(`unexpected extra argument: ${positional[2]}`);
  return args;
}

export async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) {
    console.log(HELP);
    return 0;
  }
  if (!args.page || !args.noteFile) {
    console.error('Error: both a page and a note file are required.');
    console.error(HELP);
    return 1;
  }

  const config = loadConfig();
  const store = new Store({
    contentDir: config.contentDir,
    notesDir: config.notesDir,
    authorNotesDir: config.authorNotesDir,
    dryRun: false,
    logger: () => {},
  });

  // Accept the page relative to the content directory, or as a path from the
  // current directory that lives inside it (eg. content/Physics/Readme.md).
  let page = String(args.page).replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\/+/, '');
  if (!fs.existsSync(path.join(config.contentDir, page))) {
    const resolved = path.resolve(page);
    const rel = path.relative(config.contentDir, resolved);
    if (!rel.startsWith('..') && fs.existsSync(resolved)) {
      page = rel.split(path.sep).join('/');
    }
  }

  const body =
    args.noteFile === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(args.noteFile, 'utf8');
  if (body.trim() === '') {
    console.error('Error: the note is empty.');
    return 1;
  }

  const title =
    args.title ?? (args.noteFile === '-' ? 'Agent note' : path.basename(args.noteFile, path.extname(args.noteFile)));

  const pageFile = path.join(config.contentDir, page);
  if (!fs.existsSync(pageFile)) {
    console.warn(
      `Warning: "${page}" does not exist yet; the note will be addressed once the page exists and is visited.`,
    );
  }

  await store.appendNote(page, title, body, 'agent');
  console.log(
    `Agent note "${title}" left on ${page} (notes/${path.basename(store.noteFilePath(page, 'agent'))}); the agent will delete it once addressed.`,
  );
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
