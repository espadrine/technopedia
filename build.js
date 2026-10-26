// Build the static content: render every page in content/ (written in
// LaTeXMarkdown, see the README style rules) to HTML in dist/.
//
// The improvement notes live outside content/ (notes/, author-notes/), so
// they never appear in the static content, as the README requires.
//
// Output layout:
//   content/<Topic>/Readme.md        -> dist/<Topic>/index.html
//   content/<Topic>/<Page>.md        -> dist/<Topic>/<Page>.html
//   assets (style.css, icon.svg, *.simulation.html) -> copied verbatim to
//                                       the same place; the site-wide assets
//   at the content root are shared by every page via relative links
//   dist/index.html                  -> generated home page
//
// Each page is wrapped in the site chrome described in the README (semantic
// elements, shared classes, no inline styles): a masthead with the topic
// navigation, a <main> around the page content, and a footer.

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
      /(<a\b[^>]*?\bhref=)(['"])(\.{1,2}\/[^'"]*?\.md)\2/gi,
      (full, prefix, quote, href) => `${prefix}${quote}${hrefFor(href)}${quote}`,
    );
}

// latexmarkdown passes raw HTML through verbatim, so [text](./X.md) inside
// the <td> of a categorization table would render as literal text instead
// of a link. Turn those into real anchors on table rows, before the link
// rewriting above sees them.
function anchorsInHtmlRows(markdown) {
  return markdown
    .split('\n')
    .map((line) => {
      if (!/<t[dhr]/i.test(line)) return line;
      return line.replace(
        /\[([^\]]+)\]\((\.{1,2}\/[^)\s]+)\)/g,
        (full, text, href) => `<a href="${href}">${text}</a>`,
      );
    })
    .join('\n');
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

// Site chrome (see site/style.css for the classes).
function prefixFor(outFile) {
  const depth = path.relative(DIST, outFile).split(path.sep).length - 1;
  return '../'.repeat(depth);
}

function labelFor(topic) {
  return escapeHtml(topic.replace(/-/g, ' '));
}

// The Technopedia logo: content/technopedia.svg, a "TECH" wordmark in the
// Bauhaus primaries. The asset pass copies it verbatim to the dist root, so
// pages reference it with a depth-relative path. The width/height attributes
// reserve the 4:3 box before the image loads; the CSS sets the display size.
function logoImg(src, className, alt = '') {
  return `<img class="${className}" src="${src}" alt="${alt}" width="790" height="558">`;
}

function mastheadHtml(prefix, topics, currentTopic) {
  const links = topics
    .map(
      (topic) =>
        `<li><a class="topic-link${topic === currentTopic ? ' current' : ''}" href="${prefix}${topic}/">${labelFor(topic)}</a></li>`,
    )
    .join('\n      ');
  return `<header class="masthead">
  <div class="masthead-inner">
    <a class="brand" href="${prefix || './'}">
      ${logoImg(`${prefix}icon.svg`, 'logo-plate')}
      <span class="brand-name">Technopedia</span>
    </a>
    <p class="brand-tagline">The technologist’s encyclopedia</p>
    <nav class="topic-nav" aria-label="Topics">
      <ul>
      ${links}
      </ul>
    </nav>
  </div>
  <div class="dither" aria-hidden="true"></div>
</header>`;
}

function footerHtml(prefix) {
  return `<footer class="colophon">
  <div class="dither" aria-hidden="true"></div>
  <div class="colophon-inner">
    <span>Technopedia</span>
    <a href="${prefix || './'}">Index</a>
  </div>
</footer>`;
}

// Wrap the rendered document in the chrome: html lang, viewport, stylesheet,
// masthead, <main> and footer. `kind` is 'topic', 'entry' or 'home'.
function decorate(html, { prefix, kind, topics, currentTopic, extraMain = '' }) {
  let doc = html.replace('<!doctype html>', '<!doctype html>\n<html lang="en">');
  const head = [
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="color-scheme" content="light">',
    `<link rel="icon" href="${prefix}icon.svg">`,
    `<link rel="stylesheet" href="${prefix}style.css">`,
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Squada+One&display=swap" rel="stylesheet">',
  ].join('\n  ');
  doc = doc.replace('<head>', `<head>\n  ${head}`);
  doc = doc.replace(
    '<body>',
    `<body>\n${mastheadHtml(prefix, topics, currentTopic)}\n<main class="page page--${kind}">${extraMain}`,
  );
  doc = doc.replace('</body>', `</main>\n${footerHtml(prefix)}\n</body>`);
  return `${doc}\n</html>`;
}

function homeHtml(topics) {
  // Card accent tints: a few topics have a fixed tint, the others cycle
  // through the palette so neighboring cards stay distinct.
  const fixedAccents = { Manufacturing: 'green', Physics: 'blue' };
  const cycledAccents = ['red', 'green', 'yellow', 'blue'];
  const cards = topics
    .map((topic, index) => {
      const accent = fixedAccents[topic] ?? cycledAccents[index % cycledAccents.length];
      return `      <a class="topic-card accent-${accent}" href="./${topic}/">
        <span class="topic-card-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="topic-card-name">${labelFor(topic)}</span>
        <span class="topic-card-kind">Topic page</span>
      </a>`;
    })
    .join('\n');
  const body = `<section class="hero">
  <p class="hero-kicker">Catalog of technologies</p>
  <h1 class="brand-name">
    ${logoImg('./technopedia.svg', 'hero-logo')}
    Technopedia
  </h1>
  <p class="lede">An encyclopedia focused on technologies: the fundamentals of each field, from first principles to applications.</p>
  <div class="hero-mark" aria-hidden="true">
  </div>
</section>
<nav class="topic-grid" aria-label="Topics">
${cards}
</nav>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Technopedia</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<link rel="icon" href="./icon.svg">
<link rel="stylesheet" href="./style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Squada+One&display=swap" rel="stylesheet">
</head>
<body>
${mastheadHtml('./', topics, null)}
<main class="page page--home">
${body}
</main>
${footerHtml('./')}
</body>
</html>
`;
}

// Warn about local href/src targets that resolve outside the built set
// (missing subpages, missing simulations, links escaping dist/).
function checkLocalTargets(html, outFile, outputs, warnings) {
  const targets = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((target) => !/^(https?:|mailto:|data:|#)/.test(target));
  for (const target of targets) {
    let clean = target.split('#')[0];
    try {
      clean = decodeURIComponent(clean);
    } catch {
      // Leave percent sequences as-is if they do not decode.
    }
    const resolved = path.resolve(path.dirname(outFile), clean);
    const rel = path.relative(DIST, resolved);
    if (rel.startsWith('..')) {
      warnings.push(`${path.relative(DIST, outFile)}: target escapes the site: ${target}`);
      continue;
    }
    const file = path.extname(rel) === '' ? path.join(rel, 'index.html') : rel;
    if (!outputs.has(file)) {
      warnings.push(`${path.relative(DIST, outFile)}: target does not exist: ${target}`);
    }
  }
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

  // High-level topics: the directories directly under content/ that have a
  // topic page. They feed the navigation and the home page.
  const topics = files
    .map((file) => path.relative(CONTENT, file).split(path.sep).join('/'))
    .filter((rel) => /\/Readme\.md$/i.test(rel) && rel.split('/').length === 2)
    .map((rel) => rel.split('/')[0])
    .sort();

  // Everything that will exist under dist/, for the link check below.
  const outputs = new Set();
  for (const file of files) {
    const rel = path.relative(CONTENT, file).split(path.sep).join('/');
    outputs.add(/\.md$/i.test(rel) ? outputFor(rel) : rel);
  }
  outputs.add('index.html');

  const warnings = [];
  let pages = 0;
  let copied = 0;

  for (const file of files) {
    const rel = path.relative(CONTENT, file).split(path.sep).join('/');
    const out = path.join(DIST, /\.md$/i.test(rel) ? outputFor(rel) : rel);
    await fs.mkdir(path.dirname(out), { recursive: true });
    if (!/\.md$/i.test(rel)) {
      await fs.copyFile(file, out);
      copied += 1;
      continue;
    }
    const source = await fs.readFile(file, 'utf8');
    const isTopicPage = /(^|\/)readme\.md$/i.test(rel);
    const kind = isTopicPage ? 'topic' : 'entry';
    const stubNote =
      source.replace(/^#\s+.+$/m, '').trim().length === 0
        ? '\n<p class="stub-note">This page has not been written yet.</p>\n'
        : '';
    const html = withTitle(
      latexmarkdown.renderHTMLDoc(rewriteLinks(anchorsInHtmlRows(source))),
      source,
      rel,
    );
    const doc = decorate(html, {
      prefix: prefixFor(out),
      kind,
      topics,
      currentTopic: rel.includes('/') ? rel.split('/')[0] : null,
      extraMain: stubNote,
    });
    await fs.writeFile(out, doc, 'utf8');
    checkLocalTargets(doc, out, outputs, warnings);
    pages += 1;
  }

  // Home page.
  if (topics.length > 0) {
    const out = path.join(DIST, 'index.html');
    const doc = homeHtml(topics);
    await fs.writeFile(out, doc, 'utf8');
    checkLocalTargets(doc, out, outputs, warnings);
  }

  console.log(`built ${pages} page(s) and ${copied} asset(s) into dist/`);
  for (const warning of warnings) {
    console.warn(`warning: ${warning}`);
  }
}

main().catch((err) => {
  console.error(err.stack ?? String(err));
  process.exit(1);
});
