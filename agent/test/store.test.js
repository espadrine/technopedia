// Unit tests for the store's structural checks (agent/store.js):
// findBrokenLinks (every kind of relative link: page, image, iframe, <a href>) and
// checkParentReference (topic and explanation pages), plus the segmentsOf
// helper they rely on.
//
//   npm test            (runs these, then the offline agent self-test)
//   node --test agent/test/store.test.js

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { segmentsOf, Store } from '../store.js';

// A store over a temporary content folder seeded with the given files.
async function makeStore(t, files = {}) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'technopedia-store-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const contentDir = path.join(root, 'content');
  await fs.mkdir(contentDir, { recursive: true });
  for (const [rel, body] of Object.entries(files)) {
    const file = path.join(contentDir, rel);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, body, 'utf8');
  }
  const store = new Store({
    contentDir,
    notesDir: path.join(root, 'notes'),
    authorNotesDir: path.join(root, 'author-notes'),
    pagesDb: path.join(root, 'pages.json'),
  });
  return { store, contentDir };
}

const fileOf = (store, rel) => path.join(store.contentDir, rel);

async function brokenLinksOf(store, rel) {
  const file = fileOf(store, rel);
  return store.findBrokenLinks(file, await store.readPage(file));
}

// -- findBrokenLinks --------------------------------------------------------

test('findBrokenLinks: page links', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md': '# Physics\n\n- [Kinematics](./Kinematics.md)\n- [Missing](./Missing.md)\n',
    'Physics/Kinematics.md': '# Kinematics\n',
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), ['Missing.md']);
});

test('findBrokenLinks: image links', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md': '# Physics\n\n![stack](./img/stack.svg)\n\n![gone](./img/gone.png)\n',
    'Physics/img/stack.svg': '<svg></svg>\n',
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), ['img/gone.png']);
});

test('findBrokenLinks: iframe links', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md':
      '# Physics\n\n<iframe src="./Demo.simulation.html" title="Demo"></iframe>\n\n<iframe src="./Gone.simulation.html" title="Gone"></iframe>\n',
    'Physics/Demo.simulation.html': '<!DOCTYPE html>\n',
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), ['Gone.simulation.html']);
});

test('findBrokenLinks: <a href> links', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md':
      '# Physics\n\n<a href="./Kinematics.md">Kinematics</a>\n\n<a href="./Gone.md">Gone</a>\n',
    'Physics/Kinematics.md': '# Kinematics\n',
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), ['Gone.md']);
});

test('findBrokenLinks: every relative link kind is checked together', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md': [
      '# Physics',
      '',
      '- [Kinematics](./Kinematics.md)',
      '- [Missing](./Missing.md)',
      '![diagram](./img/diagram.svg)',
      '![gone](./img/gone.png)',
      '<iframe src="./Demo.simulation.html" title="Demo"></iframe>',
      '<iframe src="./Gone.simulation.html" title="Gone"></iframe>',
      '<a href="./Kinematics.md">Kinematics</a>',
      '<a href="./Gone.md">Gone</a>',
      '',
    ].join('\n'),
    'Physics/Kinematics.md': '# Kinematics\n',
    'Physics/img/diagram.svg': '<svg></svg>\n',
    'Physics/Demo.simulation.html': '<!DOCTYPE html>\n',
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), [
    'Missing.md',
    'Gone.simulation.html',
    'img/gone.png',
    'Gone.md',
  ]);
});

test('findBrokenLinks: non-relative and external targets are ignored', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md': [
      '# Physics',
      '',
      '[web](https://example.com/page.md)',
      '![web](https://example.com/pic.png)',
      '<iframe src="https://example.com/embed.html" title="Web"></iframe>',
      '<a href="https://example.com/page.md">Web</a>',
      '[anchor](#section)',
      '[mail](mailto:someone@example.com)',
      '<a href="#section">Anchor</a>',
      '[root](/Physics/Readme.md)',
      '[up](../outside.md)',
      '<a href="../outside.md">Up</a>',
      '',
    ].join('\n'),
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), []);
});

test('findBrokenLinks: anchors on relative links resolve to the target', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md':
      '# Physics\n\n[Kinematics](./Kinematics.md#position)\n[Missing](./Missing.md#part)\n',
    'Physics/Kinematics.md': '# Kinematics\n',
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), ['Missing.md']);
});

test('findBrokenLinks: anchors on relative <a href> links resolve to the target', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md':
      '# Physics\n\n<a href="./Kinematics.md#position">Kinematics</a>\n<a href="./Gone.md#part">Gone</a>\n',
    'Physics/Kinematics.md': '# Kinematics\n',
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), ['Gone.md']);
});

test('findBrokenLinks: <a> attribute forms', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md': [
      '# Physics',
      '',
      `<a class="ref" href='./Ok.md'>Ok</a>`,
      '<a href="./Spaced.md" target="_blank">Spaced</a>',
      '<a href="./Nested.md"><code>Nested</code></a>',
      '<a name="anchor">No href</a>',
      '',
    ].join('\n'),
    'Physics/Ok.md': '# Ok\n',
    'Physics/Spaced.md': '# Spaced\n',
    'Physics/Nested.md': '# Nested\n',
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), []);
});

test('findBrokenLinks: iframe attribute forms', async (t) => {
  const { store } = await makeStore(t, {
    'Physics/Readme.md': [
      '# Physics',
      '',
      `<iframe width="600" src='./Ok.simulation.html'></iframe>`,
      '<iframe src="./No-title.simulation.html"></iframe>',
      '<iframe src="./Spaced.simulation.html" title="Spaced"></iframe>',
      '',
    ].join('\n'),
    'Physics/Ok.simulation.html': '<!DOCTYPE html>\n',
    'Physics/Spaced.simulation.html': '<!DOCTYPE html>\n',
  });
  assert.deepEqual(await brokenLinksOf(store, 'Physics/Readme.md'), ['No-title.simulation.html']);
});

// -- checkParentReference ---------------------------------------------------

test('checkParentReference: root pages are exempt', async (t) => {
  const { store } = await makeStore(t);
  assert.equal(await store.checkParentReference(['Physics'], 'topic'), true);
  assert.equal(await store.checkParentReference(['Physics'], 'explanation'), true);
});

test('checkParentReference: explanation page referenced in its parent topic page', async (t) => {
  const { store } = await makeStore(t, {
    'Manufacturing/Readme.md': '# Manufacturing\n\n- [Batteries](./Batteries.md)\n',
  });
  assert.equal(await store.checkParentReference(['Manufacturing', 'Batteries'], 'explanation'), true);
});

test('checkParentReference: unreferenced explanation page', async (t) => {
  const { store } = await makeStore(t, {
    'Manufacturing/Readme.md': '# Manufacturing\n\nNothing here.\n',
  });
  assert.equal(await store.checkParentReference(['Manufacturing', 'Batteries'], 'explanation'), false);
});

test('checkParentReference: missing parent topic page', async (t) => {
  const { store } = await makeStore(t);
  assert.equal(await store.checkParentReference(['Manufacturing', 'Batteries'], 'explanation'), false);
});

test('checkParentReference: topic page referenced in its parent', async (t) => {
  const { store } = await makeStore(t, {
    'Manufacturing/Readme.md': '[Electronics](./Electronics/Readme.md)\n',
  });
  assert.equal(await store.checkParentReference(['Manufacturing', 'Electronics'], 'topic'), true);
});

test('checkParentReference: the link form must match the page kind', async (t) => {
  const { store } = await makeStore(t, {
    'Manufacturing/Readme.md': '[Electronics](./Electronics.md)\n',
  });
  assert.equal(await store.checkParentReference(['Manufacturing', 'Electronics'], 'explanation'), true);
  assert.equal(await store.checkParentReference(['Manufacturing', 'Electronics'], 'topic'), false);
});

test('checkParentReference: an anchor on the parent link still counts', async (t) => {
  const { store } = await makeStore(t, {
    'Manufacturing/Readme.md': '[Batteries](./Batteries.md#types)\n',
  });
  assert.equal(await store.checkParentReference(['Manufacturing', 'Batteries'], 'explanation'), true);
});

test('checkParentReference: page names are slugged before matching', async (t) => {
  const { store } = await makeStore(t, {
    'Manufacturing/Readme.md': '[Surface finishing](./Surface-finishing.md)\n',
  });
  assert.equal(
    await store.checkParentReference(['Manufacturing', 'Surface finishing'], 'explanation'),
    true,
  );
});

test('checkParentReference: the parent is the whole ancestor chain', async (t) => {
  const { store } = await makeStore(t, {
    'Manufacturing/Electronics/Readme.md': '[Batteries](./Batteries.md)\n',
  });
  const segments = ['Manufacturing', 'Electronics', 'Batteries'];
  assert.equal(await store.checkParentReference(segments, 'explanation'), true);
  assert.equal(await store.checkParentReference(segments, 'topic'), false);
});

// -- segmentsOf -------------------------------------------------------------

test('segmentsOf: page chains', () => {
  assert.deepEqual(segmentsOf('Physics/Readme.md'), ['Physics']);
  assert.deepEqual(segmentsOf('Physics/Mechanics/Readme.md'), ['Physics', 'Mechanics']);
  assert.deepEqual(segmentsOf('Physics/Mechanics/Kinematics.md'), [
    'Physics',
    'Mechanics',
    'Kinematics',
  ]);
  assert.deepEqual(segmentsOf('Physics/Surface finishing.md'), ['Physics', 'Surface finishing']);
});
