// Prompt builders for every decision the agent makes. Each prompt starts with
// a TASK tag so the responses can be traced (and mocked) reliably.

import { JSON_ONLY, STYLE_GUIDE } from './style.js';
import { TOOLS_GUIDE } from './tools.js';

function sys(extra) {
  return { role: 'system', content: `${STYLE_GUIDE}\n\n${extra}\n\n${JSON_ONLY}` };
}

// System prompt for tasks that can use the agent's tools.
function sysTools(extra) {
  return { role: 'system', content: `${STYLE_GUIDE}\n\n${TOOLS_GUIDE}\n\n${extra}\n\n${JSON_ONLY}` };
}

function user(content) {
  return { role: 'user', content };
}

// The notes of a page, grouped by importance: author notes (from the
// author-notes folder) are permanent instructions from the encyclopedia's
// author and must be followed to the letter; agent notes (from the notes
// folder) are review suggestions, consumed once addressed.
function notesSection(authorNotes, agentNotes) {
  const list = (items) =>
    items.map((note) => `${note.index}. [${note.title}]\n${note.body.trim()}`).join('\n\n') ||
    '(none)';
  return `Author notes (permanent instructions from the author of the encyclopedia; follow them to the letter, they take priority over everything else, and they are never deleted):
${list(authorNotes)}

Agent notes (from previous agent reviews; each is deleted once addressed):
${list(agentNotes)}`;
}

export const PAGE_CREATION_TEMPERATURE = 0.7;
export const DECISION_TEMPERATURE = 0.2;

export function determineTypePrompt(segments) {
  const path = segments.join(' / ');
  return [
    sys('You are routing the autonomous contributor agent of Technopedia.'),
    user(
      `TASK: determine-type

The Technopedia page "${path}" is empty: it must be created.
Determine whether it should be a topic page or an explanation page:
- "topic": a broad category that classifies subtopics and links to their pages (eg. "Manufacturing", "Electronics").
- "explanation": a page explaining one singular concept (eg. "Batteries", "B-tree").

Reply: {"type": "topic" | "explanation", "reasoning": "..."}`,
    ),
  ];
}

export function createTopicPagePrompt(segments) {
  const name = segments[segments.length - 1];
  const path = segments.join(' / ');
  return [
    sys('You are the autonomous contributor agent of Technopedia, writing a new page.'),
    user(
      `TASK: create-topic-page

Create the Technopedia topic page for "${name}" (path: ${path}).
It is a topic page: follow the topic page rules from the style guide.
Start the page with a level-1 heading.
In the categorization, link to the page of each class and subtopic: the agent
picks its next page among those links. Each class/subtopic gets exactly ONE
link, and all classes of one categorization are the same kind: either all
explanation pages, [Name](./Name.md), or all topic pages,
[Name](./Name/Readme.md) (a topic page only when a subtopic is broad enough
to deserve its own categorization, eg. Manufacturing -> Electronics). Never
link both a topic page and an explanation page for the same subject, and
never give one subject two links.

Reply: {"markdown": "<the full page in Markdown>"}`,
    ),
  ];
}

export function createExplanationPagePrompt(segments) {
  const name = segments[segments.length - 1];
  const path = segments.join(' / ');
  return [
    sysTools('You are the autonomous contributor agent of Technopedia, writing a new page.'),
    user(
      `TASK: create-explanation-page

Create the Technopedia explanation page for "${name}" (path: ${path}).
It is an explanation page: follow the explanation page rules from the style
guide. Start the page with a level-1 heading. Structure the content into
sections, one per idea/concept/theorem/pattern. You may use web_search and
web_fetch to ground the content, and run_js to try out the JavaScript of the
simulation before embedding it.

Reply: {"markdown": "<the full page in Markdown>"}`,
    ),
  ];
}

export function splitTopicPagePrompt(segments, pageContent) {
  return [
    sys('You are the autonomous contributor agent of Technopedia, splitting an overgrown page.'),
    user(
      `TASK: split-topic-page

The topic page "${segments.join(' / ')}" has more than 10 subtopics and must
be split in two.

<page>
${pageContent}
</page>

Categorize its subtopics into 2 groups. Label each group. For each group,
write a full topic page (following the topic page rules from the style guide)
that contains that group's subtopics. Every subtopic must end up in exactly
one of the two groups.

Reply: {"groups": [{"label": "<group label>", "markdown": "<full topic page>"}, {"label": "<group label>", "markdown": "<full topic page>"}], "reasoning": "..."}`,
    ),
  ];
}

export function splitExplanationPagePrompt(segments, pageContent) {
  return [
    sysTools('You are the autonomous contributor agent of Technopedia, splitting an overgrown page.'),
    user(
      `TASK: split-explanation-page

The explanation page "${segments.join(' / ')}" has more than 10 sections and
must be split in two.

<page>
${pageContent}
</page>

Categorize its sections into 2 groups. Label each group. For each group,
create a full explanation page (following the explanation page rules from the
style guide) containing that group's sections, with its folded sections
intact. Every section must end up in exactly one of the two groups.

Reply: {"groups": [{"label": "<group label>", "markdown": "<full explanation page>"}, {"label": "<group label>", "markdown": "<full explanation page>"}], "reasoning": "..."}`,
    ),
  ];
}

export function editParentLinksPrompt(parentSegments, parentContent, { removeAll = false, remove = null, add = [] }) {
  const path = parentSegments.length > 0 ? parentSegments.join(' / ') : '(the page itself)';
  const removeLine = removeAll
    ? 'Remove: all subtopic links (the subtopics moved to the new group pages below).'
    : `Remove the link to: ${remove ?? 'nothing'}.`;
  const addLines = add.map((a) => `- ${a.name} (a ${a.kind} page)`).join('\n');
  return [
    sys('You are the autonomous contributor agent of Technopedia, updating a topic page.'),
    user(
      `TASK: edit-parent-links

Topic page: ${path}

<page>
${parentContent}
</page>

Update this topic page:
- ${removeLine}
- Add these links:
${addLines}
Link format: a topic page is [Name](./Name/Readme.md), an explanation page is
[Name](./Name.md). Keep the rest of the page unchanged as much as possible.

Reply: {"markdown": "<the full updated page>"}`,
    ),
  ];
}

export function factCheckQueriesPrompt(segments, pageContent) {
  return [
    sys('You are the autonomous contributor agent of Technopedia, preparing a fact-check.'),
    user(
      `TASK: fact-check-queries

Page: ${segments.join(' / ')}

<page>
${pageContent}
</page>

List up to 3 precise web search queries that would verify the most important
factual claims of this page (formulas, constants, dates, names, standards).

Reply: {"queries": ["...", "..."]}`,
    ),
  ];
}

export function addressNotesPrompt(
  segments,
  pageContent,
  authorNotes,
  agentNotes,
  existingSimulation,
  pageFile,
  simulationFile,
  parentFile,
) {
  const simulation = existingSimulation
    ? `<simulation>\n${existingSimulation}\n</simulation>`
    : 'There is no simulation on this page yet.';
  const parentLine = parentFile
    ? `Parent topic page file (edit this file with edit_file when it must be updated): ${parentFile}`
    : 'This page has no parent topic page.';
  return [
    sysTools('You are the autonomous contributor agent of Technopedia, addressing notes left by previous agents or the author.'),
    user(
      `TASK: address-notes

Page: ${segments.join(' / ')}
Page file (edit this file with edit_file): ${pageFile}
${parentLine}
Simulation file (edit this file with edit_file, create it at line 1 if it does not exist yet): ${simulationFile}

Improvement notes left over on this page:

${notesSection(authorNotes, agentNotes)}

<page>
${pageContent}
</page>

${simulation}

Read the improvement notes and address them: apply each one to the page. The
author notes are instructions from the author of the encyclopedia: follow
them to the letter, and never undo them. A page that already satisfies an
author note must stay satisfying it. All agent notes are deleted afterwards,
so make sure their intent is fully reflected in the page.

Apply every change with the edit_file tool only: edit the page file to change
the page, and the simulation file to build or improve an interactive
simulation asked for by a note (following the simulation widget from the style
guide, with the page embedding it through an iframe). edit_file creates a
file that does not exist yet: edit line 1 (lineno_start=1, lineno_end=1) and
new_content becomes the whole file. Read a file first with read_file when you
need its exact line numbers. Never output the page or the simulation in your
answer: the files on disk are the result.

If you conclude that this page should not exist, delete it with delete_file
and, before concluding the work, update the parent topic page to remove the
link to the deleted page.

Reply: {"done": true}`,
    ),
  ];
}

export function evaluateTopicPagePrompt(segments, pageContent, findings, authorNotes = [], agentNotes = []) {
  const findingsText =
    findings.length > 0
      ? `Mechanical checks found these violations of the structural rules:
${findings.map((f) => `- ${f}`).join('\n')}
The review must include notes to fix them (create the missing page, add the
subtopic to the categorization table, reference the page in its parent, ...).`
      : 'Mechanical checks found no violations of the structural rules.';
  return [
    sysTools('You are the autonomous contributor agent of Technopedia, reviewing a page.'),
    user(
      `TASK: evaluate-topic-page

Topic page: ${segments.join(' / ')}

<page>
${pageContent}
</page>

${findingsText}

Produce an evaluation of this topic page. The evaluation must check:
- adherence to the rules (from the style guide),
- whether the categorization is the optimal one,
- whether there is a missing topic.

Use find_files, grep, and read_file to inspect the rest of the encyclopedia
when checking the categorization or looking for missing or misplaced topics.

Use this review to highlight ways in which this article could be improved:
add each actionable improvement as a note for a future agent (an empty list
only if there is truly nothing to improve).

As part of this review, give the page a score from 0 to 100, which represents
how much of the page should be reworked: 0 means all of it should be rewritten
or deleted, 100 means it is perfect and needs no work.

Reply: {"notes": ["<note>", "..."], "score": <0-100>, "reasoning": "..."}`,
    ),
  ];
}

export function evaluateExplanationPagePrompt(segments, pageContent, findings, authorNotes = [], agentNotes = []) {
  const findingsText =
    findings.length > 0
      ? `Mechanical checks found these violations of the structural rules:
${findings.map((f) => `- ${f}`).join('\n')}
The review must include notes to fix them (create the missing page, reference
the page in its parent, ...).`
      : 'Mechanical checks found no violations of the structural rules.';
  const notesText =
    authorNotes.length > 0 || agentNotes.length > 0
      ? `Standing notes on this page (the author notes are permanent instructions from the author of the encyclopedia: your review must follow them to the letter):

${notesSection(authorNotes, agentNotes)}

`
      : '';
  return [
    sysTools('You are the autonomous contributor agent of Technopedia, reviewing a page.'),
    user(
      `TASK: evaluate-explanation-page

Page: ${segments.join(' / ')}

<page>
${pageContent}
</page>

${notesText}${findingsText}

Produce an evaluation of this explanation page. The evaluation must check:
- adherence to the rules (from the style guide),
- clarity of the explanation, of how one section flows to the next, of the examples, intuitiveness and interactivity of the animations,
- whether the section organization is the optimal one,
- whether there is a missing section,
- whether there is overlap with another article,
- whether the article repeats itself or can be more succinct,
- fact-check the content using the Web and add authoritative sources if needed.

Use grep and read_file to check for overlap with other articles, web_search
and web_fetch to fact-check the content, and run_js to try out JavaScript
when reviewing a simulation.

Use this review to highlight ways in which this article could be improved:
add each actionable improvement as a note for a future agent (an empty list
only if there is truly nothing to improve).

As part of this review, give the page a score from 0 to 100, which represents
how much of the page should be reworked: 0 means all of it should be rewritten
or deleted, 100 means it is perfect and needs no work.

Reply: {"notes": ["<note>", "..."], "score": <0-100>, "reasoning": "..."}`,
    ),
  ];
}
