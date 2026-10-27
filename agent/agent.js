// The autonomous AI contributor agent of Technopedia.
//
// One run of the agent implements one iteration of the "Automatic generation"
// loop described in the Technopedia README: Reviewer mode, then Editor mode,
// each working from the page database (pages.json: type, score, a review
// timestamp indicating the latest time the page has been reviewed, and an
// edit timestamp indicating the latest time it has been edited). The outer
// loop (in index.js) repeats runs indefinitely and resets the context to the
// base prompt on every loop: every LLM call carries only the base system
// prompt and its task.
//
// 1. Reviewer mode.
//    1. Pick a page: none at all -> move on to editor mode; a page on disk
//       but not in the database -> add it; pages with a null score (empty
//       pages included) -> the one amongst them with the oldest edit
//       timestamp; otherwise the page with the oldest review timestamp.
//    2. Evaluate the page (adherence to the rules, and per its type the
//       categorization / clarity / overlap / fact-check checks). The review
//       leaves one or multiple improvement notes and gives the page a score
//       from 0 to 100 (how much of the page should be reworked), folded into
//       the database as an exponential average (25% latest, 75% previous),
//       and stamps the page's review timestamp.
// 2. Editor mode.
//    1. Pick a page: none at all -> create the highest-level topic page;
//       otherwise the page with the lowest score. Only reviewed pages are
//       eligible: the reviewer scores every page first (1.1.3, empty pages
//       included), and the editor picks the lowest score amongst them. Pages
//       found on disk but not in the database are folded in by the reconcile
//       at the mode boundary (README 1.1.2).
//    2. Check the breadcrumbs of the page (the list of ancestor pages): if
//       one is missing, the agent is told and asked to make the page
//       reachable from the top-level topic page, adding the right link in
//       the right ancestor page or creating the missing ancestor pages (and
//       adding them to the database).
//    3. Topic page: if it is empty, create its content with its links and
//       create the linked subpages (left empty). If it has more than 10
//       subtopics, split it into 2 group pages. Then address the notes: the
//       author notes of all ancestor pages and the agent notes on the page.
//    4. Explanation page: if it is empty, create its content. If it has over
//       10 sections, split it into 2 group pages added to the parent topic
//       page. Then address the notes.
//    5. Make sure there are no dead links nor unreachable pages in the whole
//       encyclopedia, handling them as needed: a mechanical scan finds the
//       violations, the model handles them with its tools, and whatever
//       remains is logged (the reviewer flags the same violations per page
//       on its next visit of the affected pages).
//    6. Reset the page's score to null and stamp its edit timestamp.
//
// The agent logs every step of the loop it is on (eg. "1.2", "2.3.3"),
// following the numbering of the README. Pages created or deleted through
// the tools are folded back into the database at the end of each mode.

import path from 'node:path';

import { LlmError } from './llm.js';
import { createTools, findMathProblems } from './tools.js';
import { nowIso } from './util.js';
import {
  DECISION_TEMPERATURE,
  PAGE_CREATION_TEMPERATURE,
  addressNotesPrompt,
  createExplanationPagePrompt,
  createTopicPagePrompt,
  editParentLinksPrompt,
  evaluateExplanationPagePrompt,
  evaluateTopicPagePrompt,
  fixBreadcrumbsPrompt,
  fixLinkIntegrityPrompt,
  splitExplanationPagePrompt,
  splitTopicPagePrompt,
} from './prompts.js';
import {
  countSections,
  findSubtopicsOutsideTable,
  findTableRuleViolations,
  parsePageLinks,
  parseSubtopicLinks,
  slug,
} from './store.js';

const SPLIT_SUBTOPIC_LIMIT = 10;
const SPLIT_SECTION_LIMIT = 10;

function parseGroups(answer, task) {
  const groups = (Array.isArray(answer.groups) ? answer.groups : [])
    .slice(0, 2)
    .map((group) => ({
      label: String(group?.label ?? '').trim(),
      markdown: String(group?.markdown ?? '').trim(),
    }))
    .filter((group) => group.label !== '' && group.markdown !== '');
  if (groups.length < 2) {
    throw new LlmError(`${task} returned fewer than 2 usable groups`, { kind: 'parse' });
  }
  return groups;
}

function parseNotes(answer) {
  return (Array.isArray(answer.notes) ? answer.notes : [])
    .map((note) => String(note).trim())
    .filter((note) => note !== '');
}

// The review score of a page (README 1.2: 0 to 100, how much of the page
// should be reworked), or null when the answer carries no usable score.
function parseScore(raw) {
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export async function runAgent({ config, store, llm, logger, rng, topic, state = null }) {
  const summary = {
    topic: null,
    page: null,
    pages: [],
    actions: [],
    pagesWritten: [],
    notesAdded: 0,
    notesResolved: 0,
    splits: [],
  };

  // Log with the step of the loop the agent is on (README numbering).
  const step = (id, message) => logger(`step ${id}: ${message}`);

  // The page database of this run. Reconciled with the disk at every mode
  // boundary, so pages created or deleted through the tools (and pages
  // appearing outside the agent) are always folded back in.
  const db = await store.loadPagesDb();
  const syncDb = async (stepId) => {
    const { added, removed } = await store.reconcilePages(db);
    if (added.length > 0) {
      step(stepId, `added ${added.length} page(s) found on disk to the database: ${added.join(', ')}`);
    }
    if (removed.length > 0) {
      step(stepId, `removed ${removed.length} page(s) that no longer exist from the database: ${removed.join(', ')}`);
    }
    await store.savePagesDb(db);
  };

  // 'Manufacturing/Electronics/Readme.md' -> ['Manufacturing', 'Electronics'],
  // 'Manufacturing/Batteries.md' -> ['Manufacturing', 'Batteries'].
  const segmentsOf = (rel) =>
    /(^|\/)Readme\.md$/i.test(rel)
      ? rel.split('/').slice(0, -1)
      : rel.split('/').map((part) => part.replace(/\.md$/i, ''));
  const fileOf = (rel) => path.join(config.contentDir, rel);

  const writeIfMissing = async (rel, content) => {
    if (db.pages[rel] || (await store.readPage(fileOf(rel)).catch(() => null)) !== null) return false;
    await store.writePage(fileOf(rel), content);
    db.pages[rel] = { type: store.pageTypeOf(rel), score: null, reviewedAt: null, addedAt: nowIso() };
    return true;
  };

  // Write the page if the answer contains markdown; returns the new content
  // or null when nothing should be written. `task` is the worker context
  // ({ step, tools }) of the reviewer or editor performing the write.
  const applyMarkdown = async (markdown, file, stepId, task) => {
    const trimmed = String(markdown ?? '').trim();
    if (trimmed === '') return null;
    await store.writePage(file, `${trimmed}\n`);
    await lintMarkdown(store.rel(file), trimmed, stepId, task);
    summary.pagesWritten.push(store.rel(file));
    return trimmed;
  };

  // The edit_file tool lints its own result; whole pages coming back from a
  // task answer are written straight to disk, so lint them here. A problem
  // becomes an agent note: the editor (possibly later in the same run)
  // addresses it with an edit_file, which is itself linted.
  const lintMarkdown = async (rel, markdown, stepId, task) => {
    const problems = findMathProblems(`${String(markdown ?? '').trim()}\n`);
    if (problems.length === 0) return;
    const shown = problems.slice(0, 5);
    for (const problem of shown) {
      await store.appendNote(
        rel,
        'Math',
        `Fix the invalid LaTeXMarkdown math on line ${problem.line}: "${problem.snippet}" — ${problem.problem}.`,
      );
      summary.notesAdded += 1;
    }
    task.step(stepId, `${rel} was written with ${problems.length} invalid LaTeXMarkdown math form(s); left ${shown.length} note(s)`);
  };

  const addNotes = async (file, notes, stepId, task) => {
    for (const note of notes) {
      await store.appendNote(store.rel(file), 'Evaluation', note);
      summary.notesAdded += 1;
    }
    if (notes.length > 0) {
      task.step(stepId, `evaluation left ${notes.length} improvement note(s) on ${store.rel(file)}`);
    }
  };

  // Structural violations of the README style rules, computed mechanically
  // and given to the evaluation so the review must address them.
  const topicFindings = async (segments, file, content) => {
    const findings = [];
    const broken = await store.findBrokenLinks(file, content);
    if (broken.length > 0) {
      findings.push(`links to pages that do not exist: ${broken.join(', ')}`);
    }
    const outside = findSubtopicsOutsideTable(content);
    if (outside.length > 0) {
      findings.push(`subtopics not listed in the categorization table: ${outside.join(', ')}`);
    }
    const tableViolations = findTableRuleViolations(content);
    if (tableViolations.length > 0) {
      findings.push(`categorization table rule violations: ${tableViolations.join('; ')}`);
    }
    if (!(await store.checkParentReference(segments, 'topic'))) {
      findings.push('this topic page is not referenced in its parent topic page');
    }
    return findings;
  };

  const explanationFindings = async (segments, file, content) => {
    const findings = [];
    const broken = await store.findBrokenLinks(file, content);
    if (broken.length > 0) {
      findings.push(`links to pages that do not exist: ${broken.join(', ')}`);
    }
    if (!(await store.checkParentReference(segments, 'explanation'))) {
      findings.push('this explanation page is not referenced in its parent topic page');
    }
    return findings;
  };

  // 1.2: evaluation of a page -> improvement notes + score. The page's notes
  // (in particular the author's) are part of the review context.
  const evaluateTopicPage = async (segments, file, content, task) => {
    summary.actions.push('evaluate');
    const findings = await topicFindings(segments, file, content);
    if (findings.length > 0) task.step('1.2', `structural findings: ${findings.join('; ')}`);
    task.step('1.2', `evaluating the topic page ${store.rel(file)}`);
    const authorNotes = await store.readNotes(store.rel(file), 'author');
    const agentNotes = await store.readNotes(store.rel(file));
    const answer = await llm.chatJson(
      evaluateTopicPagePrompt(segments, content, findings, authorNotes, agentNotes),
      {
        temperature: DECISION_TEMPERATURE,
        tools: task.tools,
        label: 'evaluate-topic-page',
      },
    );
    await addNotes(file, parseNotes(answer), '1.2', task);
    return parseScore(answer.score);
  };

  const evaluateExplanationPage = async (segments, file, content, task) => {
    summary.actions.push('evaluate');
    const findings = await explanationFindings(segments, file, content);
    if (findings.length > 0) task.step('1.2', `structural findings: ${findings.join('; ')}`);
    task.step('1.2', `evaluating the page ${store.rel(file)}`);
    const authorNotes = await store.readNotes(store.rel(file), 'author');
    const agentNotes = await store.readNotes(store.rel(file));
    const answer = await llm.chatJson(
      evaluateExplanationPagePrompt(segments, content, findings, authorNotes, agentNotes),
      { temperature: DECISION_TEMPERATURE, tools: task.tools, label: 'evaluate-explanation-page' },
    );
    await addNotes(file, parseNotes(answer), '1.2', task);
    return parseScore(answer.score);
  };

  // Guarantee the invariant of a split: the parent page links the new pages.
  // The LLM edits the parent, but may miss a link; the agent appends the
  // missing ones itself so no created page is ever unlisted.
  const ensureParentLinks = async (file, pageContent, links, stepId, task) => {
    let updated = pageContent;
    for (const link of links) {
      const href = `./${slug(link.name)}${link.kind === 'topic' ? '/Readme.md' : '.md'}`;
      if (!updated.includes(href)) {
        updated = `${updated}\n- [${link.name}](${href})`;
      }
    }
    if (updated !== pageContent) {
      task.step(stepId, `appended missing link(s) to ${store.rel(file)}`);
      await applyMarkdown(updated, file, stepId, task);
    }
  };

  // 2.3.2 split of an overgrown topic page. The two group pages are created
  // filled in ("Then fill in the topic page"); the old page is replaced in
  // its parent (or rewritten as the parent itself when it is a high-level
  // topic), and its notes are transferred.
  const splitTopicPage = async (segments, file, content, task) => {
    const answer = await llm.chatJson(splitTopicPagePrompt(segments, content), {
      temperature: PAGE_CREATION_TEMPERATURE,
      tools: task.tools,
      label: 'split-topic-page',
    });
    const groups = parseGroups(answer, 'split-topic-page');
    const parentSegments = segments.slice(0, -1);
    const isTopLevel = parentSegments.length === 0;
    const childSegments = (label) =>
      isTopLevel ? [...segments, label] : [...parentSegments, label];
    const newPages = groups.map((group) => ({
      ...group,
      segments: childSegments(group.label),
      file: store.topicPagePath(childSegments(group.label)),
    }));
    for (const group of newPages) {
      await store.writePage(group.file, `${group.markdown}\n`);
      await lintMarkdown(store.rel(group.file), group.markdown, '2.3.2', task);
      summary.pagesWritten.push(store.rel(group.file));
    }
    const added = newPages.map((group) => ({ name: slug(group.label), kind: 'topic' }));
    if (isTopLevel) {
      // No parent topic page: the page becomes the parent of the groups.
      const edited = await llm.chatJson(
        editParentLinksPrompt(parentSegments, content, { removeAll: true, add: added }),
        { temperature: DECISION_TEMPERATURE, label: 'edit-parent-links' },
      );
      const updated = (await applyMarkdown(edited.markdown, file, '2.3.2', task)) ?? content;
      await ensureParentLinks(file, updated, added, '2.3.2', task);
    } else {
      const parentFile = store.topicPagePath(parentSegments);
      const parentContent = await store.readPage(parentFile).catch(() => null);
      if (parentContent === null) {
        task.step('2.3.2', `warning: parent page ${store.rel(parentFile)} not found; split pages created anyway`);
      } else {
        const edited = await llm.chatJson(
          editParentLinksPrompt(parentSegments, parentContent, {
            remove: segments[segments.length - 1],
            add: added,
          }),
          { temperature: DECISION_TEMPERATURE, label: 'edit-parent-links' },
        );
        const updated = (await applyMarkdown(edited.markdown, parentFile, '2.3.2', task)) ?? parentContent;
        await ensureParentLinks(parentFile, updated, added, '2.3.2', task);
      }
      await store.transferNotes(
        store.rel(file),
        newPages.map((group) => store.rel(group.file)),
      );
      await store.deletePage(file);
    }
    summary.splits.push(store.rel(file));
    task.step('2.3.2', `split ${store.rel(file)} into: ${groups.map((g) => g.label).join(', ')}`);
  };

  // 2.4.2 split of an overgrown explanation page.
  const splitExplanationPage = async (segments, file, content, task) => {
    const answer = await llm.chatJson(splitExplanationPagePrompt(segments, content), {
      temperature: PAGE_CREATION_TEMPERATURE,
      tools: task.tools,
      label: 'split-explanation-page',
    });
    const groups = parseGroups(answer, 'split-explanation-page');
    const parentSegments = segments.slice(0, -1);
    const newPages = groups.map((group) => ({
      ...group,
      segments: [...parentSegments, group.label],
      file: store.explanationPagePath([...parentSegments, group.label]),
    }));
    for (const group of newPages) {
      await store.writePage(group.file, `${group.markdown}\n`);
      await lintMarkdown(store.rel(group.file), group.markdown, '2.4.2', task);
      summary.pagesWritten.push(store.rel(group.file));
    }
    const parentFile = store.topicPagePath(parentSegments);
    const parentContent = await store.readPage(parentFile).catch(() => null);
    if (parentContent === null) {
      task.step('2.4.2', `warning: parent topic page ${store.rel(parentFile)} not found; split pages created anyway`);
    } else {
      const added = newPages.map((group) => ({ name: slug(group.label), kind: 'explanation' }));
      const edited = await llm.chatJson(
        editParentLinksPrompt(parentSegments, parentContent, {
          remove: segments[segments.length - 1],
          add: added,
        }),
        { temperature: DECISION_TEMPERATURE, label: 'edit-parent-links' },
      );
      const updated = (await applyMarkdown(edited.markdown, parentFile, '2.4.2', task)) ?? parentContent;
      await ensureParentLinks(parentFile, updated, added, '2.4.2', task);
    }
    await store.transferNotes(store.rel(file), newPages.map((group) => store.rel(group.file)), 'agent');
    await store.transferNotes(store.rel(file), newPages.map((group) => store.rel(group.file)), 'author');
    await store.deletePage(file);
    // The simulation belonged to the removed page; the new pages build their
    // own through notes on their next visits.
    const oldSimulation = store.simulationPath(segments);
    if ((await store.readOptional(oldSimulation)) !== null) {
      await store.deletePage(oldSimulation);
    }
    summary.splits.push(store.rel(file));
    task.step('2.4.2', `split ${store.rel(file)} into: ${groups.map((g) => g.label).join(', ')}`);
  };

  // README 2.3.3 / 2.4.3: "If it deletes the page wholesale, it should update
  // the parent topic page to remove the link to the deleted page, before
  // concluding the work." The model is told to do it; this guarantees the
  // invariant: any link to the deleted page is stripped from the parent
  // (the anchor is replaced by its text, so the row survives).
  const removeDeletedPageLink = async (segments, stepId, task) => {
    if (segments.length < 2) return;
    const name = slug(segments[segments.length - 1]);
    const hrefs = [`./${name}/Readme.md`, `./${name}.md`];
    const parentFile = store.topicPagePath(segments.slice(0, -1));
    const parent = await store.readPage(parentFile).catch(() => null);
    if (parent === null) return;
    let updated = parent;
    for (const href of hrefs) {
      const esc = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      updated = updated
        .replace(new RegExp(`<a[^>]+href=['"]${esc}['"][^>]*>([^<]*)</a>`, 'gi'), '$1')
        .replace(new RegExp(`\\[([^\\]]*)\\]\\(${esc}\\)`, 'gi'), '$1');
    }
    if (updated !== parent) {
      await store.writePage(parentFile, updated);
      task.step(stepId, `removed the link to the deleted page from ${store.rel(parentFile)}`);
    }
  };

  // 2.3.3 / 2.4.3: read the author notes of all ancestor pages (the page
  // itself counts as its own ancestor) and the agent notes on the current
  // page, address them, and delete the agent notes. Author notes are never
  // deleted: they are standing instructions for every future visit.
  const addressNotes = async (segments, file, content, stepId, task) => {
    const rel = store.rel(file);
    const authorNotes = [];
    for (let i = 1; i < segments.length; i++) {
      const ancestorRel = store.rel(store.topicPagePath(segments.slice(0, i)));
      for (const note of await store.readNotes(ancestorRel, 'author')) {
        authorNotes.push({
          ...note,
          body: `${note.body}\n(from the author notes on ${ancestorRel})`,
        });
      }
    }
    authorNotes.push(...(await store.readNotes(rel, 'author')));
    const agentNotes = await store.readNotes(rel);
    if (authorNotes.length === 0 && agentNotes.length === 0) {
      return { hadNotes: false, content, deleted: false };
    }
    summary.actions.push('address-notes');
    task.step(
      stepId,
      `addressing ${authorNotes.length} author note(s) and ${agentNotes.length} agent note(s) on ${rel}`,
    );
    const existingSimulation = await store.readOptional(store.simulationPath(segments));
    await llm.chatJson(
      addressNotesPrompt(
        segments,
        content,
        authorNotes,
        agentNotes,
        existingSimulation,
        rel,
        store.rel(store.simulationPath(segments)),
        segments.length > 1 ? store.rel(store.topicPagePath(segments.slice(0, -1))) : null,
      ),
      { temperature: DECISION_TEMPERATURE, tools: task.tools, label: 'address-notes' },
    );
    // Every edit went through edit_file: the files on disk are the result.
    // The model may have deleted the page itself (delete_file) when it
    // concluded the page should not exist: detect it so the parent is
    // cleaned up and the walk does not continue on a vanished page.
    const reread = await store.readPage(file).catch(() => null);
    if (reread === null) {
      task.step(stepId, `${rel} was deleted during the visit`);
      await removeDeletedPageLink(segments, stepId, task);
    }
    const updated = reread ?? content;
    if ((await store.readOptional(store.simulationPath(segments))) !== existingSimulation) {
      task.step(stepId, `wrote simulation ${store.rel(store.simulationPath(segments))}`);
    }
    if (agentNotes.length > 0) {
      await store.resolveNotes(rel, agentNotes.map((note) => note.index));
    }
    summary.notesResolved += agentNotes.length;
    if (authorNotes.length > 0) {
      task.step(stepId, `${authorNotes.length} author note(s) kept on ${rel}`);
    }
    return { hadNotes: true, content: updated, deleted: reread === null };
  };

  // -- 1.2: review one page of the database ---------------------------------

  const reviewPage = async (rel, task) => {
    const entry = db.pages[rel];
    const content = await store.readPage(fileOf(rel)).catch(() => null);
    if (entry === undefined || content === null) {
      task.step('1.2', `${rel} no longer exists; skipping its review`);
      return;
    }
    const segments = segmentsOf(rel);
    summary.actions.push('review');
    summary.topic = segments[0];
    const score = await (entry.type === 'topic'
      ? evaluateTopicPage(segments, fileOf(rel), content, task)
      : evaluateExplanationPage(segments, fileOf(rel), content, task));
    if (score === null) {
      task.step('1.2', `no valid score returned for ${rel}; keeping its previous score`);
    } else if (entry.score === null || entry.score === undefined) {
      entry.score = score;
      task.step('1.2', `scored ${rel}: ${score}`);
    } else {
      entry.score = 0.25 * score + 0.75 * entry.score;
      task.step('1.2', `scored ${rel}: ${entry.score.toFixed(1)} (this review: ${score}, previous: ${entry.score === score ? 'n/a' : 'see database'})`);
    }
    entry.reviewedAt = nowIso();
    await store.savePagesDb(db);
  };

  // -- 2.2: check the breadcrumbs of the edited page -------------------------

  // 2.2: check the breadcrumbs of the page: the list of ancestor pages, from
  // the top-level topic page down to the parent of the page. If one is
  // missing, give that information to the agent and ask it to make the page
  // reachable from the top-level topic page: add the right link in the right
  // ancestor page, or create the missing ancestor pages (and add them to the
  // database). Returns whether the agent was asked to handle findings.
  const checkBreadcrumbs = async (rel, segments, task) => {
    if (segments.length < 2) {
      task.step('2.2', `${rel} is a top-level topic page; no breadcrumbs to check`);
      return false;
    }
    // The breadcrumbs: every ancestor page from the top-level topic page down
    // to the parent of the page, then the page itself (all the ancestors are
    // topic pages).
    const chain = [];
    for (let i = 1; i < segments.length; i++) {
      const segs = segments.slice(0, i);
      chain.push({ rel: store.rel(store.topicPagePath(segs)), file: store.topicPagePath(segs), segs, kind: 'topic' });
    }
    chain.push({ rel, file: fileOf(rel), segs: segments, kind: store.pageTypeOf(rel) });
    const find = async () => {
      const findings = [];
      for (let i = 0; i < chain.length; i++) {
        const page = chain[i];
        const parent = i === 0 ? null : chain[i - 1];
        if ((await store.readOptional(page.file)) === null) {
          findings.push({ kind: 'missing-page', rel: page.rel, parent: parent ? parent.rel : null });
          continue;
        }
        // A missing ancestor breaks the chain below it: the link to the next
        // page cannot be checked (creating the ancestor with the link is the
        // fix), so only the pages below an existing parent are link-checked.
        if (parent === null || (await store.readOptional(parent.file)) === null) continue;
        const parentContent = await store.readPage(parent.file);
        const href = `./${slug(page.segs[page.segs.length - 1])}${page.kind === 'topic' ? '/Readme.md' : '.md'}`;
        if (!parentContent.includes(href)) {
          findings.push({ kind: 'missing-link', rel: page.rel, parent: parent.rel });
        }
      }
      return findings;
    };
    const findings = await find();
    if (findings.length === 0) {
      task.step('2.2', `the breadcrumbs of ${rel} are complete (${chain.map((c) => c.rel).join(' -> ')})`);
      return false;
    }
    summary.actions.push('fix-breadcrumbs');
    for (const f of findings) {
      task.step(
        '2.2',
        f.kind === 'missing-page'
          ? `missing breadcrumb: the ancestor page ${f.rel} does not exist`
          : `missing breadcrumb: ${f.rel} is not referenced in its parent topic page ${f.parent}`,
      );
    }
    if (config.dryRun) {
      task.step('2.2', 'dry run: the missing breadcrumbs are logged, not handled');
      return false;
    }
    await llm.chatJson(fixBreadcrumbsPrompt(rel, segments, findings), {
      temperature: DECISION_TEMPERATURE,
      tools: task.tools,
      label: 'fix-breadcrumbs',
    });
    // The missing ancestor pages are added to the database once created.
    await syncDb('2.2');
    const remaining = await find();
    if (remaining.length === 0) {
      task.step('2.2', `handled: ${rel} is reachable from the top-level topic page`);
    } else {
      task.step(
        '2.2',
        `${remaining.length} missing breadcrumb(s) remain; the reviewer will flag them on the affected pages`,
      );
    }
    return true;
  };

  // -- 2.3 / 2.4: edit one page of the database ------------------------------

  const editPage = async (rel, task) => {
    const entry = db.pages[rel] ?? { type: store.pageTypeOf(rel) };
    const segments = segmentsOf(rel);
    const file = fileOf(rel);
    let content = await store.readPage(file).catch(() => null);
    if (content === null) {
      task.step('2', `${rel} no longer exists; nothing to edit`);
      return;
    }
    summary.topic = segments[0];
    summary.page = segments;

    // 2.2: check the breadcrumbs of the page before working on it.
    const breadcrumbsHandled = await checkBreadcrumbs(rel, segments, task);
    if (breadcrumbsHandled) {
      content = await store.readPage(file).catch(() => null);
      if (content === null) {
        task.step('2.2', `${rel} was deleted while its breadcrumbs were fixed; nothing more to edit`);
        return;
      }
    }

    if (entry.type === 'topic') {
      // 2.3.1: empty topic page -> create its content, with the links, and
      // create the subpages corresponding to those links, leaving them empty.
      if (content.trim() === '') {
        task.step('2.3.1', `creating the topic page ${rel}`);
        const answer = await llm.chatJson(createTopicPagePrompt(segments), {
          temperature: PAGE_CREATION_TEMPERATURE,
          tools: task.tools,
          label: 'create-topic-page',
        });
        const markdown = String(answer.markdown ?? '').trim();
        if (markdown === '') throw new LlmError('create-topic-page returned no page', { kind: 'parse' });
        await store.writePage(file, `${markdown}\n`);
        await lintMarkdown(rel, markdown, '2.3.1', task);
        summary.pagesWritten.push(rel);
        for (const link of parsePageLinks(markdown)) {
          const subRel = path.posix.normalize(path.posix.join(path.posix.dirname(rel), link.href));
          await store.writePage(fileOf(subRel), '');
          db.pages[subRel] = { type: store.pageTypeOf(subRel), score: null, reviewedAt: null, addedAt: nowIso() };
          task.step('2.3.1', `created the empty subpage ${subRel}`);
        }
        content = markdown;
      }
      // 2.3.2
      if (parseSubtopicLinks(content).length > SPLIT_SUBTOPIC_LIMIT) {
        task.step('2.3.2', `over ${SPLIT_SUBTOPIC_LIMIT} subtopics: splitting ${rel}`);
        await splitTopicPage(segments, file, content, task);
        content = await store.readPage(file).catch(() => null);
        if (content === null) {
          task.step('2.3.2', `${rel} was removed by the split`);
          return;
        }
      }
      // 2.3.3
      await addressNotes(segments, file, content, '2.3.3', task);
      return;
    }

    // 2.4.1: empty explanation page -> create its content.
    if (content.trim() === '') {
      task.step('2.4.1', `creating the explanation page ${rel}`);
      const answer = await llm.chatJson(createExplanationPagePrompt(segments), {
        temperature: PAGE_CREATION_TEMPERATURE,
        tools: task.tools,
        label: 'create-explanation-page',
      });
      const markdown = String(answer.markdown ?? '').trim();
      if (markdown === '') throw new LlmError('create-explanation-page returned no page', { kind: 'parse' });
      await store.writePage(file, `${markdown}\n`);
      await lintMarkdown(rel, markdown, '2.4.1', task);
      summary.pagesWritten.push(rel);
      content = markdown;
    }
    // 2.4.2
    if (countSections(content) > SPLIT_SECTION_LIMIT) {
      task.step('2.4.2', `over ${SPLIT_SECTION_LIMIT} sections: splitting ${rel}`);
      await splitExplanationPage(segments, file, content, task);
      content = await store.readPage(file).catch(() => null);
      if (content === null) {
        task.step('2.4.2', `${rel} was removed by the split`);
        return;
      }
    }
    // 2.4.3
    await addressNotes(segments, file, content, '2.4.3', task);
  };

  // -- Page picking (README 1.1 and 2.1) ------------------------------------

  // The up-to-`count` best pages to review, in filter order (README 1.1.3 /
  // 1.1.4): pages without a score first (never reviewed, or just edited by
  // 2.6), oldest edit first; then the pages reviewed the longest time ago.
  // Empty pages are reviewed too: the review scores them (an empty page
  // needs its whole content written, so it scores low), which is what makes
  // them eligible for the editor (2.1.2 picks only scored pages).
  const pickReviewerPages = async (count) => {
    const entries = Object.entries(db.pages).sort(([a], [b]) => (a < b ? -1 : 1));
    if (entries.length === 0) return [];
    const candidates = [];
    for (const [rel, entry] of entries) {
      // A page deleted since the last reconcile has nothing to review.
      const content = await store.readPage(fileOf(rel)).catch(() => null);
      if (content === null) continue;
      candidates.push([rel, entry]);
    }
    if (candidates.length === 0) return [];
    const editTime = (entry) => entry.editedAt ?? entry.addedAt ?? '';
    const hasScore = (entry) => entry.score !== null && entry.score !== undefined;
    // Oldest first; ties keep the alphabetical order of the entries.
    const oldestFirst = (keyFn) => (a, b) => {
      const ka = keyFn(a[1]);
      const kb = keyFn(b[1]);
      return ka < kb ? -1 : ka > kb ? 1 : a[0] < b[0] ? -1 : 1;
    };
    const unscored = candidates.filter(([, entry]) => !hasScore(entry)).sort(oldestFirst(editTime));
    const scored = candidates.filter(([, entry]) => hasScore(entry)).sort(oldestFirst((entry) => entry.reviewedAt ?? ''));
    return [...unscored, ...scored].slice(0, count).map(([rel, entry]) => ({
      rel,
      step: hasScore(entry) ? '1.1.4' : '1.1.3',
      reason: hasScore(entry)
        ? `oldest review (${entry.reviewedAt ?? 'never'})`
        : `no score yet, oldest edit (${editTime(entry)})`,
    }));
  };

  // The up-to-`count` best pages to edit (README 2.1.2: pick the page with
  // the lowest score). Only pages the reviewer has scored are eligible: a
  // page without a score has never been reviewed and is not the editor's to
  // pick — the reviewer scores it first (1.1.3, empty pages included), and
  // it is then edited. Ties are broken by the least recently edited page so
  // equally-scored pages do not starve.
  const pickEditorPages = (count) => {
    const entries = Object.entries(db.pages).sort(([a], [b]) => (a < b ? -1 : 1));
    if (entries.length === 0) return [];
    const scored = entries
      .filter(([, entry]) => entry.score !== null && entry.score !== undefined)
      .sort((a, b) => {
        if (a[1].score !== b[1].score) return a[1].score - b[1].score;
        const ea = a[1].editedAt ?? '';
        const eb = b[1].editedAt ?? '';
        if (ea !== eb) return ea < eb ? -1 : 1;
        return a[0] < b[0] ? -1 : 1;
      });
    return scored.slice(0, count).map(([rel, entry]) => ({
      rel,
      step: '2.1.2',
      reason: `lowest score (${entry.score.toFixed(1)})`,
    }));
  };

  // The link-integrity invariants of the whole encyclopedia (README: "No
  // dead links" / "No unreachable pages"), computed mechanically over every
  // page on disk: dead links (links to pages that do not exist) and
  // unreachable pages (pages no parent topic page references; the
  // high-level topic pages are the roots and are exempt).
  const scanLinkIntegrity = async () => {
    const deadLinks = [];
    const unreachable = [];
    for (const rel of await store.listDiskPages()) {
      const file = fileOf(rel);
      const content = await store.readPage(file).catch(() => null);
      if (content === null) continue;
      for (const href of await store.findBrokenLinks(file, content)) {
        deadLinks.push({ file: rel, href });
      }
      const segments = segmentsOf(rel);
      if (segments.length > 1 && !(await store.checkParentReference(segments, store.pageTypeOf(rel)))) {
        const parent = store.rel(store.topicPagePath(segments.slice(0, -1)));
        unreachable.push({
          rel,
          parent,
          parentMissing: (await store.readOptional(store.topicPagePath(segments.slice(0, -1)))) === null,
          empty: content.trim() === '',
        });
      }
    }
    return { deadLinks, unreachable };
  };

  // 2.5: after the editor's work on a page, make sure there are no dead
  // links nor unreachable pages, handling them as needed. The mechanical
  // scan covers the whole encyclopedia (the editor's own work may have
  // created or deleted pages); the model handles the findings with its
  // tools (create the missing page, fix or remove the link, reference the
  // page in its parent topic page, move it with rename_file, delete it when
  // it should not exist). Whatever the handling leaves behind is logged:
  // the reviewer flags the same violations per page on its next visit.
  const ensureLinkIntegrity = async (segments, task) => {
    const before = await scanLinkIntegrity();
    const total = (s) => s.deadLinks.length + s.unreachable.length;
    if (total(before) === 0) {
      task.step('2.5', 'no dead links nor unreachable pages');
      return;
    }
    summary.actions.push('fix-links');
    task.step('2.5', `found ${before.deadLinks.length} dead link(s) and ${before.unreachable.length} unreachable page(s); handling them`);
    for (const d of before.deadLinks) {
      task.step('2.5', `dead link: ${d.file} links to ${d.href} (the page does not exist)`);
    }
    for (const u of before.unreachable) {
      task.step(
        '2.5',
        u.parentMissing
          ? `unreachable page: ${u.rel} has no parent topic page (${u.parent} does not exist)`
          : `unreachable page: ${u.rel} is not referenced in its parent topic page ${u.parent}`,
      );
    }
    if (config.dryRun) {
      task.step('2.5', 'dry run: the violations are logged, not handled');
      return;
    }
    await llm.chatJson(fixLinkIntegrityPrompt(segments, before), {
      temperature: DECISION_TEMPERATURE,
      tools: task.tools,
      label: 'fix-link-integrity',
    });
    const after = await scanLinkIntegrity();
    if (total(after) === 0) {
      task.step('2.5', 'handled: no dead links nor unreachable pages remain');
    } else {
      task.step(
        '2.5',
        `${total(after)} violation(s) remain; the reviewer will flag them on the affected pages`,
      );
    }
  };

  // 2.6: after the editor concludes its work on a page, the page's score is
  // reset to null (so the reviewer re-evaluates the edited page from scratch,
  // 1.1.3) and its edit timestamp is updated to the current time. Skipped
  // when the editor deleted the page: it is no longer in the database.
  const editorConclude = async (rel, task) => {
    const entry = db.pages[rel];
    if (!entry) {
      task.step('2.6', `${rel} was deleted; nothing to conclude`);
      return;
    }
    entry.score = null;
    entry.editedAt = nowIso();
    await store.savePagesDb(db);
    task.step('2.6', `reset the score of ${rel} to null and stamped its edit time`);
  };

  // 2.1.1: no page at all -> create the highest-level topic page (empty: its
  // content is created by 2.3.1 in the same run).
  const createRootTopicPage = async () => {
    const existing = new Set(Object.keys(db.pages));
    const chosen =
      topic ??
      config.topics.find((t) => !existing.has(`${slug(t)}/Readme.md`)) ??
      rng.pick(config.topics);
    const rel = `${slug(chosen)}/Readme.md`;
    step('2.1.1', `no pages at all; creating the highest-level topic page ${rel}`);
    await store.writePage(fileOf(rel), '');
    summary.pagesWritten.push(rel);
    db.pages[rel] = { type: 'topic', score: null, reviewedAt: null, addedAt: nowIso() };
    await store.savePagesDb(db);
    return rel;
  };

  // -- The run: Reviewer mode, then Editor mode ------------------------------

  // The checkpoint state: an interrupted run resumes at the phase it was in
  // (see index.js: transient network failures retry the run instead of
  // restarting it from scratch). With several workers in flight the
  // checkpoint is the batch (run.pages) plus the pages that already finished
  // (run.done): a retry resumes with the pages that did not complete.
  const run = state ?? {};

  // Spawn one worker per page, all in flight at once (TECHNOPEDIA_PARALLELISM;
  // with the default of 1 each phase is sequential, as before). Each worker
  // gets its own logger and tools, tagged with the page's short name so its
  // log lines stay attributable when several workers interleave. A failed
  // batch keeps its checkpoint: the retry resumes with the pending pages.
  const spawnBatch = async (phase, rels) => {
    run.phase = phase;
    run.pages = rels;
    run.done = Array.isArray(run.done) ? run.done : [];
    const pending = rels.filter((rel) => !run.done.includes(rel));
    const errors = [];
    await Promise.all(
      pending.map((rel) => {
        const tag = config.parallelism > 1 ? `[${segmentsOf(rel).pop()}] ` : '';
        const taskLogger = (line) => logger(`${tag}${line}`);
        const task = {
          step: (id, message) => taskLogger(`step ${id}: ${message}`),
          tools: createTools({ config, store, logger: taskLogger }),
        };
        return (async () => {
          try {
            if (phase === 'review') {
              await reviewPage(rel, task);
            } else {
              await editPage(rel, task);
              // 2.5 runs even when the visit deleted the page: the deletion
              // itself may have left dead links or unreachable pages behind.
              await ensureLinkIntegrity(segmentsOf(rel), task);
              await editorConclude(rel, task);
            }
            run.done.push(rel);
            if (!summary.pages.includes(rel)) summary.pages.push(rel);
          } catch (err) {
            errors.push(err);
          }
        })();
      }),
    );
    if (errors.length > 0) throw errors[0];
    run.phase = null;
    run.pages = null;
    run.done = null;
  };

  if (run.phase === 'review' && Array.isArray(run.pages)) {
    step('1', `resuming the run at step 1.2 on: ${run.pages.join(', ')}`);
    await spawnBatch('review', run.pages);
  } else {
    await syncDb('1.1.2');
    const picks = await pickReviewerPages(config.parallelism);
    if (picks.length === 0) {
      step('1.1.1', 'no pages at all; moving on to editor mode');
    } else {
      for (const pick of picks) {
        step(pick.step, `picked page ${pick.rel} for review (${pick.reason})`);
      }
      await spawnBatch('review', picks.map((pick) => pick.rel));
    }
  }

  if (run.phase === 'edit' && Array.isArray(run.pages)) {
    step('2', `resuming the run at step 2 on: ${run.pages.join(', ')}`);
    await spawnBatch('edit', run.pages);
    await syncDb('2.1.2');
  } else {
    await syncDb('2.1.2');
    if (Object.keys(db.pages).length === 0) {
      // 2.1.1: no page at all -> create the highest-level topic page (its
      // content is created by 2.3.1 in the same run).
      const rel = await createRootTopicPage();
      await spawnBatch('edit', [rel]);
    } else {
      const picks = pickEditorPages(config.parallelism);
      if (picks.length === 0) {
        // Pages exist but none has been reviewed yet: the reviewer scores
        // them first (1.1.3), the editor picks them up once scored.
        step('2.1.2', 'no scored page to edit yet; the reviewer scores pages first');
      } else {
        for (const pick of picks) {
          step(pick.step, `picked page ${pick.rel} for editing (${pick.reason})`);
        }
        await spawnBatch('edit', picks.map((pick) => pick.rel));
      }
    }
    // Pages may have been created or deleted through the tools: fold them
    // back into the database.
    await syncDb('2.1.2');
  }

  return summary;
}
