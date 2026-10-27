// The tools the agent has access to (README: "The agent has access to the
// following tools in order to perform its duties"). Tools run in a JSON
// round-trip with the LLM: the model replies with {"tool": ..., "args": ...},
// the agent executes the tool and sends the result back as
// {"tool_result": ...}, until the model replies with the final answer.

import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fetchWebPage, searchWeb } from './web.js';

export const TOOLS_GUIDE = `You have access to the following tools in order to perform your duties:
- web_search(query): searches the Web for the query and returns a list of relevant links and snippets.
- web_fetch(url): fetches the content of the given URL and returns it as text.
- run_js(code): runs the given JavaScript code in isolated-vm and returns the result. It only has the base JS syntax: it does not have require() etc. Use it only to do quick accurate computation, but you cannot access the file system with it. The value of the last expression is returned; "return" statements are also accepted.
- grep(pattern, folder): searches the content (or the given folder, relative to the content folder, when provided) for a given regular expression and returns the matching files and lines (with line number, 1-indexed).
- find_files(pattern, folder): searches the content (or the given folder, relative to the content folder, when provided) for files whose path (including the filename or parent folder name) matches the given pattern. Returns the matching files.
- read_file(path): reads the content of the file at the given path and returns it as text. The path is relative to the content folder.
- edit_file(path, lineno_start, lineno_end, new_content): edits the file at the given path, replacing the content from lineno_start to lineno_end (both included, 1-indexed) with new_content. A file that does not exist yet is created by an edit at line 1 (lineno_start=1, lineno_end=1): new_content becomes the whole file.
  After each edit of a .md file, the result is checked for known invalid LaTeXMarkdown math (broken $\`...\`$ forms, \$\$ display math, math inside raw HTML). If any is found, the tool returns an error listing the offending lines: fix them with another edit_file.
- delete_file(path): deletes the file at the given path.
- rename_file(path, new_path): changes the name of the file or its location in the hierarchy: moves the file or folder to new_path, creating the folders of new_path as needed. new_path must not exist yet.

To use a tool, reply with exactly {"tool": "<name>", "args": {...}} and nothing
else. The result is sent back to you as {"tool_result": ...} in the next
message. Large results are truncated to fit: narrow your next query instead
of re-reading the same large content. Use tools as many times as needed,
then reply with the final JSON answer described in the task.`;

const GREP_LIMIT = 100;
const READ_LIMIT = 50000;
const RUN_JS_TIMEOUT = 5000;
const RUN_JS_MEMORY = 64; // MB

// Known invalid LaTeXMarkdown math forms (the style guide lists the valid
// ones). edit_file checks its result against these and reports what it
// finds so the agent can fix its own edit.
const INLINE_MATH = '$`x` (a dollar sign, a backtick, the LaTeX, a closing backtick, nothing else)';

export function findMathProblems(text) {
  const problems = [];
  const lines = text.split('\n');
  let fence = null; // null | 'math' | 'other'
  lines.forEach((line, i) => {
    const lineno = i + 1;
    const trimmed = line.trim();
    if (/^`{3,}/.test(trimmed)) {
      fence = fence === null ? (/^`{3,}\s*math\b/.test(trimmed) ? 'math' : 'other') : null;
      return;
    }
    if (fence === 'other') return;
    if (fence === 'math') {
      if (/(?<!\\)\$/.test(line)) {
        problems.push({
          line: lineno,
          snippet: trimmed.slice(0, 60),
          problem: 'a $ inside a ```math block is invalid KaTeX; write the raw LaTeX without $ delimiters',
        });
      }
      return;
    }
    const isMoneyLine = /\$[0-9]+\.[0-9]{2}/.test(line);
    // Consume matches as they are found so a form is reported once, under
    // its most specific name.
    let rest = line;
    const consume = (re, problem, predicate) => {
      rest = rest.replace(re, (match, group1) => {
        if (predicate && !predicate(match, group1)) return match;
        problems.push({ line: lineno, snippet: match.slice(0, 60), problem });
        return '\u0000';
      });
    };
    consume(/\$`[^`]*``/, `a doubled closing backtick: inline math is ${INLINE_MATH}`);
    consume(/\$`[^`]*\$`\$/, `a $ slipped inside the math: inline math is ${INLINE_MATH}`);
    consume(/\$`[^`]*`\$/, `the trailing $ leaks into the page: inline math is ${INLINE_MATH}`);
    consume(/\$`(?:[^`$\\]|\\[\s\S])*\$/, `the delimiters are mixed up: inline math is ${INLINE_MATH}`);
    if (/^\s*</.test(line) && /\$`/.test(line)) {
      problems.push({
        line: lineno,
        snippet: trimmed.slice(0, 60),
        problem: 'math inside raw HTML does not render; write plain text (italic variables, Unicode symbols) or move the formula into a paragraph',
      });
    }
    if (!isMoneyLine) {
      // $x$ is only flagged when it clearly is math (LaTeX commands,
      // sub/superscripts), so money like "$5" or "$3.20" is never reported.
      consume(
        /(?<!\\)\$([^$`\n]{1,60}?)\$/,
        `$...$ without backticks is not LaTeXMarkdown inline math: use ${INLINE_MATH}`,
        (match, content) => /[\\^_{}]/.test(content),
      );
      // $$ display math, outside of valid inline math and not escaped (\$).
      const outsideMath = line.replace(/\$`[^`\n]*`/g, '\u0000');
      if (/(?<!\\)\$\$/.test(outsideMath)) {
        problems.push({
          line: lineno,
          snippet: trimmed.slice(0, 60),
          problem: '$$ is not LaTeXMarkdown display math; use a fenced code block tagged math',
        });
      }
    }
  });
  return problems;
}

// Runs after an edit_file has been written: the file keeps the edit, but a
// known-invalid math form makes the tool return an error so the agent fixes
// the file with another edit (README: the pages are LaTeXMarkdown, so broken
// math is a broken page).
function assertValidMath(rel, text) {
  if (!/\.md$/i.test(rel)) return;
  const problems = findMathProblems(text);
  if (problems.length === 0) return;
  const shown = problems
    .slice(0, 3)
    .map((p) => `line ${p.line} "${p.snippet}": ${p.problem}`);
  const more = problems.length > shown.length ? ` (and ${problems.length - shown.length} more)` : '';
  throw new Error(
    `edit_file: wrote ${rel}, but it contains ${problems.length} invalid LaTeXMarkdown math form(s)${more}: ${shown.join('; ')}. Fix ${rel} with another edit_file.`,
  );
}

async function walkFiles(dir, acc = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkFiles(file, acc);
    else if (/\.(md|html)$/i.test(entry.name)) acc.push(file);
  }
  return acc;
}

function serializeResult(result) {
  if (result === undefined) return null;
  if (result === null || typeof result !== 'object') return result;
  try {
    return JSON.parse(JSON.stringify(result));
  } catch {
    return String(result);
  }
}

// isolated-vm returns the last evaluated value; "return" at the top level is
// a syntax error, so retry wrapped in a function when the model used return.
function evaluateCode(context, code) {
  try {
    return context.evalSync(code, { timeout: RUN_JS_TIMEOUT, result: { copy: true } });
  } catch (err) {
    if (/return|Illegal return/i.test(String(err))) {
      return context.evalSync(`(() => {\n${code}\n})()`, {
        timeout: RUN_JS_TIMEOUT,
        result: { copy: true },
      });
    }
    throw err;
  }
}

async function runJs(code, logger) {
  const source = String(code ?? '');
  if (source.trim() === '') throw new Error('run_js: no code given');
  let isolate;
  try {
    const mod = await import('isolated-vm');
    const ivm = mod.default ?? mod;
    isolate = new ivm.Isolate({ memoryLimit: RUN_JS_MEMORY });
    const context = isolate.createContextSync();
    return serializeResult(evaluateCode(context, source));
  } catch (err) {
    if (String(err).includes('isolated-vm')) {
      logger('warning: isolated-vm is unavailable, falling back to node:vm (no isolation)');
      const result = await vm.runInNewContext(`(() => {\n${source}\n})()`, {}, {
        timeout: RUN_JS_TIMEOUT,
      });
      return await serializeResult(result);
    }
    throw err;
  } finally {
    isolate?.dispose();
  }
}

export function createTools({ config, store, logger = () => {} }) {
  const contentDir = config.contentDir;

  function resolveInContent(rawPath) {
    const target = path.resolve(contentDir, String(rawPath ?? ''));
    const rel = path.relative(contentDir, target);
    if (rel.startsWith('..')) throw new Error('path is outside the content folder');
    return { target, rel: rel.split(path.sep).join('/') };
  }

  // The search root of grep/find_files: the content folder by default, or
  // the given subfolder (README: grep(pattern, folder)). Returned paths stay
  // relative to the content folder so they can be fed straight to read_file.
  async function resolveSearchRoot(rawFolder) {
    if (!rawFolder || String(rawFolder).trim() === '') return contentDir;
    const { target, rel } = resolveInContent(rawFolder);
    const stat = await fs.stat(target).catch(() => null);
    if (stat === null || !stat.isDirectory()) {
      throw new Error(`the folder ${rel} does not exist`);
    }
    return target;
  }

  const tools = {
    async web_search({ query } = {}) {
      if (!String(query ?? '').trim()) throw new Error('web_search: no query given');
      if (config.webSearchUrl === 'off') return { error: 'web search is disabled' };
      const results = await searchWeb(String(query), config);
      return { results };
    },

    async web_fetch({ url } = {}) {
      if (!String(url ?? '').trim()) throw new Error('web_fetch: no url given');
      return fetchWebPage(String(url), { webTimeoutMs: config.webTimeoutMs });
    },

    async run_js({ code } = {}) {
      return { result: await runJs(code, logger) };
    },

    async grep({ pattern, folder } = {}) {
      const re = new RegExp(String(pattern ?? ''));
      const files = await walkFiles(await resolveSearchRoot(folder));
      const matches = [];
      let truncated = false;
      outer: for (const file of files) {
        const text = await fs.readFile(file, 'utf8').catch(() => null);
        if (text === null) continue;
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (re.test(lines[i])) {
            matches.push({
              file: path.relative(contentDir, file).split(path.sep).join('/'),
              line: i + 1,
              text: lines[i].slice(0, 200),
            });
            if (matches.length >= GREP_LIMIT) {
              truncated = true;
              break outer;
            }
          }
        }
      }
      return { matches, truncated };
    },

    async find_files({ pattern, folder } = {}) {
      const re = new RegExp(String(pattern ?? ''));
      const root = await resolveSearchRoot(folder);
      const files = (await walkFiles(root))
        .map((file) => path.relative(contentDir, file).split(path.sep).join('/'))
        .filter((file) => re.test(file))
        .slice(0, GREP_LIMIT);
      return { files };
    },

    async read_file({ path: rawPath } = {}) {
      const { target, rel } = resolveInContent(rawPath);
      const text = await fs.readFile(target, 'utf8');
      const truncated = text.length > READ_LIMIT;
      return {
        path: rel,
        content: truncated ? `${text.slice(0, READ_LIMIT)}\n... (truncated)` : text,
      };
    },

    async edit_file({ path: rawPath, lineno_start: start, lineno_end: end, new_content } = {}) {
      if (config.dryRun) throw new Error('edit_file: disabled in dry-run mode');
      const { target, rel } = resolveInContent(rawPath);
      const from = Number(start);
      const to = Number(end);
      if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to < from) {
        throw new Error(`edit_file: line range ${from}-${to} is invalid`);
      }
      const text = await fs.readFile(target, 'utf8').catch(() => null);
      // A file that does not exist yet is created by an edit at line 1; the
      // new content becomes the whole file (README: simulations and other
      // page assets are created this way).
      if (text === null) {
        if (from !== 1 || to !== 1) {
          throw new Error(
            `edit_file: ${rel} does not exist; create it with an edit at line 1 (lineno_start=1, lineno_end=1)`,
          );
        }
        const created = String(new_content ?? '');
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, created, 'utf8');
        assertValidMath(rel, created);
        return { file: rel, created: true, lines: created.split('\n').length };
      }
      const lines = text.split('\n');
      if (to > lines.length) {
        throw new Error(
          `edit_file: line range ${from}-${to} is invalid (the file has ${lines.length} lines)`,
        );
      }
      const replacement = String(new_content ?? '').split('\n');
      lines.splice(from - 1, to - from + 1, ...replacement);
      await fs.writeFile(target, lines.join('\n'), 'utf8');
      assertValidMath(rel, lines.join('\n'));
      return { file: rel, replaced: [from, to], with: `${replacement.length} line(s)` };
    },

    async delete_file({ path: rawPath } = {}) {
      if (config.dryRun) throw new Error('delete_file: disabled in dry-run mode');
      const { target, rel } = resolveInContent(rawPath);
      await fs.rm(target, { force: true });
      return { deleted: rel };
    },

    async rename_file({ path: rawPath, new_path: rawNewPath } = {}) {
      if (config.dryRun) throw new Error('rename_file: disabled in dry-run mode');
      if (!String(rawNewPath ?? '').trim()) throw new Error('rename_file: no new path given');
      const { target, rel } = resolveInContent(rawPath);
      const { target: newTarget, rel: newRel } = resolveInContent(rawNewPath);
      const source = await fs.stat(target).catch(() => null);
      if (source === null) throw new Error(`rename_file: ${rel} does not exist`);
      if (newTarget === target) throw new Error('rename_file: the new path is the same as the old path');
      const dest = await fs.stat(newTarget).catch(() => null);
      if (dest !== null) throw new Error(`rename_file: ${newRel} already exists`);
      await fs.mkdir(path.dirname(newTarget), { recursive: true });
      await fs.rename(target, newTarget);
      // Remove the folders the move left empty (a renamed-away Readme.md
      // leaves its topic directory behind), like deletePage does.
      const root = path.resolve(contentDir);
      let dir = path.dirname(target);
      while (dir.length > root.length) {
        const entries = await fs.readdir(dir).catch(() => null);
        if (entries === null || entries.length > 0) break;
        await fs.rmdir(dir);
        dir = path.dirname(dir);
      }
      return { renamed: rel, to: newRel };
    },
  };

  return {
    has(name) {
      return Object.hasOwn(tools, name);
    },
    async exec(name, args) {
      const started = Date.now();
      const params = JSON.stringify(args ?? {}).slice(0, 80);
      try {
        const result = await tools[name](args ?? {});
        logger(`tool ${name}(${params}) ok (${Date.now() - started}ms)`);
        return result;
      } catch (err) {
        logger(`tool ${name}(${params}) failed: ${err.message}`);
        return { error: String(err.message ?? err) };
      }
    },
  };
}
