// Persistence for the agent: Technopedia pages, and the improvement notes.
//
// Pages live in the content directory:
//   <topic>/Readme.md                     topic page (a broad category)
//   <topic>/<subtopic>.md                 explanation page (singular concept)
//   <topic>/<subtopic>/Readme.md          a subcategory that is itself a topic
// The page chain (eg. Manufacturing / Electronics / Batteries) maps onto
// that tree: every ancestor in the chain is a topic page.
//
// Improvement notes are NOT part of the pages: they live in a separate notes
// directory, never in the content (so they never appear in the static build).
// They can be left by the agent or by the author. A notes file per page, plus an
// index.json so that the notes of a specific page can be found easily.

import fs from 'node:fs/promises';
import path from 'node:path';
import { nowIso } from './util.js';

export function slug(name) {
  return (
    String(name)
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-.]/g, '')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '') || 'page'
  );
}

// The page chain of a page, from its path relative to the content folder:
// 'Manufacturing/Electronics/Readme.md' -> ['Manufacturing', 'Electronics'],
// 'Manufacturing/Batteries.md' -> ['Manufacturing', 'Batteries'].
export function segmentsOf(rel) {
  return /(^|\/)Readme\.md$/i.test(rel)
    ? rel.split('/').slice(0, -1)
    : rel.split('/').map((part) => part.replace(/\.md$/i, ''));
}

// Subtopic candidates are read from the links of a topic page. Only relative
// links following the page link conventions are considered.
export function parseSubtopicLinks(markdown) {
  const names = [];
  const seen = new Set();
  const re = /\[[^\]]*\]\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(markdown))) {
    let target = match[1].split('#')[0].trim();
    if (!target.startsWith('./')) continue;
    target = target.slice(2);
    let name;
    if (/\/Readme\.md$/i.test(target)) {
      name = target.slice(0, -'/Readme.md'.length);
    } else if (/\.md$/i.test(target)) {
      name = target.slice(0, -'.md'.length);
    } else {
      continue;
    }
    name = name.split('/').pop();
    if (!name || name === 'Readme') continue;
    const key = name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      names.push(name);
    }
  }
  return names;
}

// Sections of an explanation page: one level-2 heading per
// idea/concept/theorem/pattern (per the README style rules). Fenced code
// blocks are ignored so that `##` inside examples does not count.
export function countSections(markdown) {
  const withoutFences = String(markdown).replace(/```[\s\S]*?```/g, '');
  return (withoutFences.match(/^##\s/gm) ?? []).length;
}

// Every relative page link of a page, as [{ name, href }] (href without the
// leading "./"). Used for the structural checks of the README style rules.
export function parsePageLinks(markdown) {
  const links = [];
  const re = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(markdown))) {
    const href = match[2].split('#')[0].trim();
    if (!href.startsWith('./') || !/\.md$/i.test(href)) continue;
    links.push({ name: match[1].trim(), href: href.slice(2) });
  }
  return links;
}

// Every relative iframe link of a page, as [{ title, src }]. Iframes embed
// a self-contained simulation (<iframe src="./<Page>.simulation.html"
// title="..."></iframe>) next to the page, that must exist like a page does.
export function parseIframeLinks(markdown) {
  const links = [];
  const re = /<iframe\b[^>]*>/gi;
  let match;
  while ((match = re.exec(String(markdown)))) {
    const tag = match[0];
    const attr = (name) => {
      const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i'));
      return m ? m[1].trim() : '';
    };
    const src = attr('src');
    if (!src.startsWith('./')) continue;
    links.push({ title: attr('title'), src: src.slice(2) });
  }
  return links;
}

// Every relative image link of a page, as [{ alt, src }]. Images are inline
// media (diagrams, ...) referenced relatively like page links.
export function parseImageLinks(markdown) {
  const links = [];
  const re = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(String(markdown)))) {
    const alt = match[1].trim();
    const src = match[2].split('#')[0].trim();
    if (!src.startsWith('./')) continue;
    links.push({ alt, src: src.slice(2) });
  }
  return links;
}

// Every relative <a href> link of a page, as [{ text, href }] (href without
// the leading "./"). HTML anchors are used where markdown link syntax is
// inconvenient (inside tables, formatted text, ...).
export function parseAnchorLinks(markdown) {
  const links = [];
  const re = /<a\b[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = re.exec(String(markdown)))) {
    const tag = match[0];
    const attr = (name) => {
      const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i'));
      return m ? m[1].trim() : '';
    };
    const href = attr('href').split('#')[0];
    if (!href.startsWith('./')) continue;
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    links.push({ text, href: href.slice(2) });
  }
  return links;
}

// README: "all subtopics must be listed in a table; there must be no
// subtopic that is not part of the categorization." Returns the hrefs of
// subtopic links that live outside every categorization table.
export function findSubtopicsOutsideTable(markdown) {
  const tableText = (String(markdown).match(/<table>[\s\S]*?<\/table>/g) ?? []).join('\n');
  return parsePageLinks(markdown)
    .map((link) => link.href)
    .filter((href) => !tableText.includes(href));
}

// Page links inside a table row: markdown links and raw HTML anchors to .md
// pages (topic pages write their tables as raw HTML).
function rowPageLinks(row) {
  const links = [];
  for (const m of row.matchAll(/<a[^>]+href=['"]([^'"]+\.md)['"][^>]*>/gi)) links.push(m[1]);
  for (const m of row.matchAll(/\]\(([^)]+\.md)\)/g)) links.push(m[1]);
  return links;
}

// README: "all subtopics must be listed in a table, with one link per row,
// and each row is a distinct link corresponding to one of the categories."
// Returns the violations: rows carrying several page links, and page links
// listed in more than one row.
export function findTableRuleViolations(markdown) {
  const rows = String(markdown).match(/<tr>[\s\S]*?<\/tr>/gi) ?? [];
  const counts = new Map();
  const multi = [];
  rows.forEach((row, i) => {
    const links = rowPageLinks(row);
    if (links.length > 1) {
      multi.push(`row ${i + 1} carries ${links.length} page links (${links.join(', ')})`);
    }
    for (const href of links) counts.set(href, (counts.get(href) ?? 0) + 1);
  });
  const dupes = [...counts.entries()]
    .filter(([, n]) => n > 1)
    .map(([href, n]) => `${href} is listed in ${n} rows`);
  return [...multi, ...dupes];
}

async function readIfPresent(file) {
  try {
    return await fs.readFile(file, 'utf8');
  } catch {
    return null;
  }
}

export class Store {
  constructor({ contentDir, notesDir, authorNotesDir, pagesDb = null, dryRun = false, logger = () => {} }) {
    this.contentDir = contentDir;
    this.notesDir = notesDir;
    this.authorNotesDir = authorNotesDir;
    this.pagesDb = pagesDb;
    this.dryRun = dryRun;
    this.logger = logger;
    // Serializes the read-modify-write cycles on the shared files (the notes
    // index, the page database): reviewers and editors running in parallel
    // must not lose each other's updates.
    this.writeLock = Promise.resolve();
  }

  withWriteLock(fn) {
    const result = this.writeLock.then(fn);
    this.writeLock = result.then(
      () => {},
      () => {},
    );
    return result;
  }

  // -- Page database ---------------------------------------------------------
  //
  // README "Automatic generation": "a database of pages, with each page
  // having a type, score, a review timestamp indicating the latest time it
  // has been reviewed, and an edit timestamp indicating the latest time it
  // has been edited." Persisted as JSON at pagesDb.

  async loadPagesDb() {
    const raw = this.pagesDb ? await readIfPresent(this.pagesDb) : null;
    if (!raw) return { pages: {} };
    try {
      return { pages: JSON.parse(raw).pages ?? {} };
    } catch {
      return { pages: {} };
    }
  }

  async savePagesDb(db) {
    if (!this.pagesDb) return;
    if (this.dryRun) {
      this.logger(`(dry run) would update the page database`);
      return;
    }
    // Serialize and snapshot inside the lock: parallel workers share the db
    // object, so the last write must carry every update made before it.
    return this.withWriteLock(async () => {
      await fs.mkdir(path.dirname(this.pagesDb), { recursive: true });
      await fs.writeFile(this.pagesDb, `${JSON.stringify(db, null, 2)}\n`, 'utf8');
    });
  }

  // Type of a page from its path: <...>/Readme.md is a topic page, any other
  // .md file an explanation page.
  pageTypeOf(rel) {
    return /(^|\/)Readme\.md$/i.test(rel) ? 'topic' : 'explanation';
  }

  // Every .md page on disk, relative to the content folder.
  async listDiskPages() {
    const pages = [];
    const walk = async (dir) => {
      let entries;
      try {
        entries = await fs.readdir(dir, { withFileTypes: true });
      } catch {
        return;
      }
      for (const entry of entries) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) await walk(file);
        else if (/\.md$/i.test(entry.name)) {
          pages.push(path.relative(this.contentDir, file).split(path.sep).join('/'));
        }
      }
    };
    await walk(this.contentDir);
    return pages.sort();
  }

  // Bring the database in sync with the disk: pages that exist but have no
  // entry are added (README 1.1.2: "if a page exists on disk but not in the
  // database, pick it and add it to the database"); entries of pages that no
  // longer exist are removed (README 2.3.3 / 2.4.3: "if it deletes it, it
  // should be removed from the database").
  async reconcilePages(db) {
    const onDisk = new Set(await this.listDiskPages());
    const added = [];
    for (const rel of onDisk) {
      if (!db.pages[rel]) {
        db.pages[rel] = {
          type: this.pageTypeOf(rel),
          score: null,
          reviewedAt: null,
          addedAt: nowIso(),
        };
        added.push(rel);
      }
    }
    const removed = [];
    for (const rel of Object.keys(db.pages)) {
      if (!onDisk.has(rel)) {
        delete db.pages[rel];
        removed.push(rel);
      }
    }
    return { added, removed };
  }

  topicPagePath(segments) {
    return path.join(this.contentDir, ...segments.map(slug), 'Readme.md');
  }

  explanationPagePath(segments) {
    const dir = path.join(this.contentDir, ...segments.slice(0, -1).map(slug));
    return path.join(dir, `${slug(segments[segments.length - 1])}.md`);
  }

  // The interactive simulation of an explanation page: a self-contained
  // HTML file next to the page (see the style guide).
  simulationPath(segments) {
    const dir = path.join(this.contentDir, ...segments.slice(0, -1).map(slug));
    return path.join(dir, `${slug(segments[segments.length - 1])}.simulation.html`);
  }

  // Read a file, or null when it does not exist.
  async readOptional(file) {
    return readIfPresent(file);
  }

  // Returns { kind: 'topic'|'explanation', file, content } for the page chain,
  // or null if the page is empty (missing or blank).
  async resolve(segments) {
    for (const [kind, file] of [
      ['topic', this.topicPagePath(segments)],
      ['explanation', this.explanationPagePath(segments)],
    ]) {
      const content = await readIfPresent(file);
      if (content !== null && content.trim() !== '') {
        return { kind, file, content };
      }
    }
    return null;
  }

  rel(file) {
    return path.relative(this.contentDir, file).split(path.sep).join('/');
  }

  async readPage(file) {
    return fs.readFile(file, 'utf8');
  }

  async writePage(file, content) {
    if (this.dryRun) {
      this.logger(`(dry run) would write ${this.rel(file)}`);
      return;
    }
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, content, 'utf8');
    this.logger(`wrote ${this.rel(file)}`);
  }

  // Delete a page; removes its directory too when it becomes empty (topic
  // page directories holding only a Readme.md).
  async deletePage(file) {
    if (this.dryRun) {
      this.logger(`(dry run) would delete ${this.rel(file)}`);
      return;
    }
    await fs.rm(file, { force: true });
    const dir = path.dirname(file);
    try {
      const entries = await fs.readdir(dir);
      if (entries.length === 0) await fs.rmdir(dir);
    } catch {
      // directory already gone
    }
    this.logger(`deleted ${this.rel(file)}`);
  }

  // -- Improvement notes -----------------------------------------------------
  //
  // Two kinds, two folders: agent notes in notes/, author notes (written
  // with `npm run author-note`) in author-notes/. Both follow the same
  // per-page file + index.json structure. The agent never deletes author
  // notes.

  notesDirFor(kind = 'agent') {
    return kind === 'author' ? this.authorNotesDir : this.notesDir;
  }

  noteFilePath(pageRel, kind = 'agent') {
    const encoded = pageRel.replace(/[/\\]/g, '__');
    return path.join(this.notesDirFor(kind), encoded);
  }

  async readNotesIndex(kind = 'agent') {
    const index = await readIfPresent(path.join(this.notesDirFor(kind), 'index.json'));
    if (!index) return { pages: {} };
    try {
      return JSON.parse(index);
    } catch {
      return { pages: {} };
    }
  }

  async writeNotesIndex(index, kind = 'agent') {
    if (this.dryRun) {
      this.logger(`(dry run) would update the ${kind} notes index`);
      return;
    }
    const dir = this.notesDirFor(kind);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`, 'utf8');
  }

  // Notes of a page, as [{ index, title, body }], or [] if there are none.
  async readNotes(pageRel, kind = 'agent') {
    const file = this.noteFilePath(pageRel, kind);
    const content = await readIfPresent(file);
    if (!content) return [];
    return content
      .split(/^##\s/m)
      .slice(1)
      .map((section, i) => {
        const [title, ...rest] = section.split('\n');
        return {
          index: i + 1,
          title: title.trim(),
          body: rest.join('\n').trim(),
        };
      });
  }

  async appendNote(pageRel, title, body, kind = 'agent') {
    // The per-page file append and the index.json update are one
    // read-modify-write cycle: keep them atomic under parallel workers.
    return this.withWriteLock(async () => {
      const file = this.noteFilePath(pageRel, kind);
      const section = `## ${nowIso()} — ${title}\n\n${body.trim()}\n\n`;
      if (this.dryRun) {
        this.logger(`(dry run) would add a ${kind} note on ${pageRel}: ${title}`);
        return;
      }
      const dir = this.notesDirFor(kind);
      await fs.mkdir(dir, { recursive: true });
      await fs.appendFile(file, section, 'utf8');
      const index = await this.readNotesIndex(kind);
      const entry = index.pages[pageRel] ?? { count: 0 };
      entry.count += 1;
      entry.updated = nowIso();
      index.pages[pageRel] = entry;
      await this.writeNotesIndex(index, kind);
      this.logger(`added ${kind} note on ${pageRel}: ${title}`);
    });
  }

  // Remove the given (1-based) note indexes; drops the file and its index
  // entry when no notes remain. Only ever used on agent notes: author notes
  // are never deleted.
  async resolveNotes(pageRel, indexes) {
    // Same read-modify-write cycle as appendNote: atomic under parallel
    // workers.
    return this.withWriteLock(async () => {
      const file = this.noteFilePath(pageRel);
      const notes = await this.readNotes(pageRel);
      if (notes.length === 0) return;
      const drop = new Set(indexes);
      const kept = notes.filter((note) => !drop.has(note.index));
      if (this.dryRun) {
        this.logger(`(dry run) would resolve ${drop.size} improvement note(s) on ${pageRel}`);
        return;
      }
      if (kept.length === 0) {
        await fs.rm(file, { force: true });
        const index = await this.readNotesIndex();
        delete index.pages[pageRel];
        await this.writeNotesIndex(index);
        this.logger(`resolved all improvement notes on ${pageRel}`);
        return;
      }
      const content = kept.map((note) => `## ${note.title}\n\n${note.body}\n`).join('\n');
      await fs.writeFile(file, content, 'utf8');
      const index = await this.readNotesIndex();
      const entry = index.pages[pageRel] ?? {};
      entry.count = kept.length;
      entry.updated = nowIso();
      index.pages[pageRel] = entry;
      await this.writeNotesIndex(index);
      this.logger(`resolved ${drop.size} improvement note(s) on ${pageRel}`);
    });
  }

  // Move all notes of a deleted page to other pages (used when a page is
  // split: its notes may concern content that moved into either half).
  async transferNotes(fromRel, toRels, kind = 'agent') {
    const notes = await this.readNotes(fromRel, kind);
    if (notes.length === 0) return;
    for (const toRel of toRels) {
      for (const note of notes) {
        await this.appendNote(toRel, note.title, note.body, kind);
      }
    }
    await this.resolveNotes(fromRel, notes.map((note) => note.index));
    this.logger(`transferred ${notes.length} ${kind} note(s) from ${fromRel}`);
  }

  // -- Structural checks (README style rules) --------------------------------

  // README: "all links (to a subtopic) must correspond to a page that really
  // exists." Returns the hrefs of relative links whose target page is
  // missing.
  async findBrokenLinks(file, content) {
    const dir = path.dirname(file);
    const broken = [];
    // Combine page links, image links, iframe links, and <a href> links.
    const links = [
      ...parsePageLinks(content).map((link) => link.href),
      ...parseIframeLinks(content).map((link) => link.src),
      ...parseImageLinks(content).map((link) => link.src),
      ...parseAnchorLinks(content).map((link) => link.href),
    ];
    for (const link of links) {
      const target = path.resolve(dir, link);
      const insideContent = !path
        .relative(this.contentDir, target)
        .startsWith('..');
      if (insideContent && (await readIfPresent(target)) === null) {
        broken.push(link);
      }
    }
    return broken;
  }

  // README: "all topic pages / all explanation pages must be referenced in a
  // parent topic page." High-level topics (no parent) are the roots and are
  // exempt.
  async checkParentReference(segments, kind) {
    if (segments.length < 2) return true;
    const parentFile = this.topicPagePath(segments.slice(0, -1));
    const parentContent = await readIfPresent(parentFile);
    if (parentContent === null) return false;
    const href = `./${slug(segments[segments.length - 1])}${kind === 'topic' ? '/Readme.md' : '.md'}`;
    return parentContent.includes(href);
  }

  // README: "On disk, under content/, topic pages should contain only
  // Readme.md, and either a `.md` file for each subtopic if all subtopics are
  // explanation pages, or, if all subtopics are topic pages, subfolders for
  // each subtopic, which contain their own Readme.md, along with optional
  // simulation pages as `<Simulation-name>.simulation.html` for either the
  // topic page or the subtopic explanation pages."
  // The content root is not itself a topic page (it holds the build assets:
  // style.css, icon.svg, technopedia.svg) and is exempt.
  async checkDiskLayout() {
    const violations = [];
    const walk = async (dir) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      if (dir !== this.contentDir && !entries.some(
        (entry) => entry.isFile() && /^readme\.md$/i.test(entry.name),
      )) {
        violations.push(`${this.rel(dir)}/: subfolder without its own Readme.md`);
      }
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const file = path.join(dir, entry.name);
          if (entry.name !== slug(entry.name)) {
            violations.push(
              `${this.rel(file)}/: directory name is not its slug (${slug(entry.name)})`,
            );
          }
          await walk(file);
        } else if (dir !== this.contentDir && !/\.(md|simulation\.html)$/i.test(entry.name)) {
          violations.push(
            `${this.rel(path.join(dir, entry.name))}: neither a page, nor a simulation, nor a folder`,
          );
        }
      }
    };
    await walk(this.contentDir);
    return violations.sort();
  }
}
