// Build the static content: render every page in content/ (written in
// LaTeXMarkdown, see the README style rules) to HTML in dist/.
//
// The improvement notes live outside content/ (notes/, author-notes/), so
// they never appear in the static content, as the README requires.
//
// Output layout:
//   content/<Topic>/Readme.md        -> dist/<Topic>/index.html
//   content/<Topic>/<Page>.md        -> dist/<Topic>/<Page>.html
//   assets (eg. *.simulation.html)   -> copied verbatim to the same place
//   dist/index.html                  -> generated entry point

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import latexmarkdown from 'latexmarkdown';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const CONTENT = path.join(ROOT, 'content');
const DIST = path.join(ROOT, 'dist');

async function walk(dir, acc = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file, acc);
    else acc.push(file);
  }
  return acc;
}

// Relative .md links point at the generated HTML: Name.md -> Name.html,
// Name/Readme.md -> Name/ (its index.html). Applies to ./ and ../ links,
// in markdown form ([text](./X.md)) and in raw HTML (<a href="./X.md"> —
// the categorization tables of topic pages are raw HTML, which the renderer
// passes through unchanged).
function hrefFor(href) {
  if (/\/readme\.md$/i.test(href)) {
    return href.slice(0, -'Readme.md'.length);
  }
  return `${href.slice(0, -'.md'.length)}.html`;
}

function rewriteLinks(markdown) {
  return markdown
    .replace(/\]\((\.{1,2}\/[^)#\s]*?\.md)\)/g, (full, href) => `](${hrefFor(href)})`)
    .replace(
      /(<a\b[^>]*?\bhref=)(['"])(\.{1,2}\/[^'"#]*?\.md)\2/gi,
      (full, prefix, quote, href) => `${prefix}${quote}${hrefFor(href)}${quote}`,
    );
}

function outputFor(rel) {
  if (/^readme\.md$/i.test(rel)) return 'index.html';
  if (/\/readme\.md$/i.test(rel)) return rel.replace(/readme\.md$/i, 'index.html');
  return rel.replace(/\.md$/i, '.html');
}

// latexmarkdown emits an empty <title> for every page: fill it in from the
// first level-1 heading of the page.
function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function withTitle(html, markdown, fallback) {
  const h1 = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const title = h1 ? escapeHtml(h1) : escapeHtml(fallback);
  return html.replace('<title></title>', `<title>${title}</title>`);
}

async function main() {
  // Start from a clean dist/: pages deleted or renamed in content/ (by the
  // agent) must not leave stale output behind. Only the contents are
  // removed, not the directory itself: dist/ may be a bind mount (docker).
  await fs.mkdir(DIST, { recursive: true });
  for (const entry of await fs.readdir(DIST)) {
    await fs.rm(path.join(DIST, entry), { recursive: true, force: true });
  }
  const files = await walk(CONTENT);
  let pages = 0;
  let assets = 0;
  for (const file of files) {
    const rel = path.relative(CONTENT, file).split(path.sep).join('/');
    const out = path.join(DIST, /\.md$/i.test(rel) ? outputFor(rel) : rel);
    await fs.mkdir(path.dirname(out), { recursive: true });
    if (/\.md$/i.test(rel)) {
      const markdown = await fs.readFile(file, 'utf8');
      const html = withTitle(latexmarkdown.renderHTMLDoc(rewriteLinks(markdown)), markdown, rel);
      await fs.writeFile(out, html, 'utf8');
      pages += 1;
    } else {
      await fs.copyFile(file, out);
      assets += 1;
    }
  }

  // Entry point: list the high-level topics.
  const topics = files
    .map((file) => path.relative(CONTENT, file).split(path.sep).join('/'))
    .filter((rel) => /^Readme\.md$/i.test(rel) || /\/Readme\.md$/i.test(rel))
    .filter((rel) => rel.split('/').length === 2)
    .map((rel) => `- [${rel.split('/')[0]}](./${rel.split('/')[0]}/)`)
    .sort();
  if (topics.length > 0) {
    const entry = `# Technopedia\n\nAn encyclopedia focused on technologies.\n\n${topics.join('\n')}\n`;
    const index = withTitle(latexmarkdown.renderHTMLDoc(entry), entry, 'Technopedia');
    await fs.writeFile(path.join(DIST, 'index.html'), index, 'utf8');
  }

  console.log(`built ${pages} page(s) and ${assets} asset(s) into dist/`);
}

main().catch((err) => {
  console.error(err.stack ?? String(err));
  process.exit(1);
});
