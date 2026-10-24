// Zero-dependency static file server for the built site (dist/).
// Used by docker compose (see docker-compose.yml): the container builds the
// site at startup, then serves it on PORT (default 8080).
//
// Directory requests resolve to their index.html (the build generates one
// per topic page). Unknown paths get a 404 linking back to the entry point.

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT ?? 8080);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.pdf': 'application/pdf',
};

const NOT_FOUND = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>404 - Technopedia</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/icon.svg"><link rel="stylesheet" href="/style.css">
</head>
<body><header class="masthead">
  <div class="masthead-inner">
    <a class="brand" href="/">
      <span class="brand-shapes" aria-hidden="true">
        <span class="shape shape--circle"></span>
        <span class="shape shape--square"></span>
        <span class="shape shape--triangle"></span>
      </span>
      <span class="brand-name">Technopedia</span>
    </a>
  </div>
  <div class="dither" aria-hidden="true"></div>
</header>
<main class="page">
<h1>404 — page not found</h1>
<p>This page does not exist yet; the contributor agent may still have to build it.</p>
<p><a href="/">Back to Technopedia</a></p>
</main>
</body></html>`;

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
    // Filenames may contain spaces (eg. "First Law and Internal Energy"):
    // decode them back before hitting the filesystem.
    const pathname = decodeURIComponent(url.pathname);
    let target = path.resolve(DIST, `.${pathname}`);
    // Path traversal must stay inside dist/.
    if (target !== DIST && !target.startsWith(`${DIST}${path.sep}`)) {
      res.writeHead(403).end('forbidden');
      return;
    }
    let stat = await fs.promises.stat(target).catch(() => null);
    if (stat?.isDirectory()) {
      target = path.join(target, 'index.html');
      stat = await fs.promises.stat(target).catch(() => null);
    }
    if (stat === null) {
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' }).end(NOT_FOUND);
      return;
    }
    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, {
      'content-type': MIME[ext] ?? 'application/octet-stream',
      'content-length': stat.size,
    });
    fs.createReadStream(target).pipe(res);
  } catch (err) {
    res.writeHead(500).end(String(err?.message ?? err));
  }
});

server.listen(PORT, () => {
  console.log(`serving dist/ on http://localhost:${PORT}`);
});
