# Technopedia

An encyclopedia focused on technologies.

High-level topics:
- Physics
- Mathematics
- Computer Science
- Manufacturing

## Style

Pages must be formatted in Markdown, using [latexmarkdown](https://github.com/espadrine/latexmarkdown).

Each page must be either a topic page or an explanation page.
A topic page must be very simple, giving:
- an overview of the topic's utility, when it relevant
- a brief history with max 4 highlights
- a categorization of the topic in its ~5 classes (eg. power plant -> charcoal, petroleum, wind, solar, fission, fusion), with a table/graph/... that describes how they relate (eg. specific energy of each, abundance, ...)
  The categories must relate to fundamental, distinct, non-overlapping aspects of reality tied to first principles. They must not relate to historical, opinionated, nor geographical considerations.
  The categories must make it easy to separate concepts mentally, to teach a common topic in one place, and to search for a particular science for a specific purpose.
- links to the corresponding topics which are either all explanation pages, or all topic pages.
- all subtopics must be listed in a table, with one link per row, and each row is a distinct link corresponding to one of the categories.
- all links to a subtopic must correspond to a page that really exists.
- all topic pages must be referenced in a parent topic page.

An explanation page must have:
- a singular topic (eg. "B-tree")
- an overview of the utility of what is explained
- when there is an authoritative source for it (eg. academic paper, RFC) a link to it in a dedicated widget
- The content should be very terse at first. Like a cheatsheet. Only the raw information, theorem, formula, etc.
- The content should be structured into sections corresponding to an idea/concept/theorem/pattern/etc. Examples: different electronics components, different physics particles, different sorting algorithms.
- For each idea/concept/theorem, there should be a folded section below it that explains it in more detail, with examples, diagrams, and links to authoritative sources.
  It should make heavy use of links to other parts of the Technopedia when another concept is related or necessary to understand first.
- The deep explanation should include iframe simulations (eg. electronics schematics, physics simulations, ...), in order to showcase and enhance the examples, explanations, animations of the page.
- There should be plenty of graphs, diagrams, interactive animations.
- After the explanation, there should be a short section with an example problem, and a folded section on how to solve it, that the reader can unfold.
- All links must correspond to a page that really exists.
- All explanation pages must be referenced in a parent topic page.

The system should reuse widgets and code when possible.
For instance, code for an interactive electronics schematics should be reused for all related pages.
Same for the system that links to authoritative sources, for the foldable explanation sections, ...

The content must strive to:
- be easy to follow
- build a map in the reader's mind of the very fundamentals, and show how the rest of the topic builds upon those fundamentals
- go from the high-level concepts that are close to the reader's utility, to the low-level concepts that are more precise
- sometimes, when necessary, build an approximate explanation which models the reality best, and detail later how it is not quite right and improve the model
- show how different topics relate to each other so they know how to apply their new intuition from one domain to another

## Commands

Use `make` to build the static content.

## Website

Use LatexMarkdown, and when needed, vanilla HTML, CSS and JS, optionally with
WebComponents. No framework like React nor Vue.
All CSS must be meaningful: reuse classes and never, ever use inline styles.
Use CSS variables for colors and sizes.
Use semantic HTML elements.

The page should have an artsy style, inspired by retro computer science
catalogues: serious, Bauhaus-inspired, with solid colors and geometric shapes,
sometimes dithering.

## Automatic generation

There should be an AI contributor agent.
It should, in a loop:

1. Pick a high-level topic, for instance: Manufacturing. If it is empty, determine if it is a topic page or an explanation page.
   1. If it is a topic page (which is the case for Manufacturing),
      1. If it doesn't exist: create it
      2. If the page has more than 10 subtopics, categorize them into 2 groups,
         label each group, create one topic page for each group, and
         add those topic pages to the parent topic page, removing the old topic page.
         Then fill in the topic page.
      3. Produce an evaluation of the page. The evaluation must check:
         - adherence to the rules,
         - whether the categorization is the optimal one,
         - whether there is a missing topic
         Use this review to highlight ways in which this article could be improved.
         Add this review as one or multiple improvement notes.
      4. If there is an improvement note left over on the page by previous agents or the author: Read it, address it, delete it (except don't delete it if it is an author note).
         If it deletes the page wholesale, it should update the parent topic page to remove the link to the deleted page, before concluding the work.
      5. Pick a subtopic present in the topic page (eg. "Electronics"), and if that subtopic is a topic page, go to 1., otherwise, go to 2.
   2. If it is an explanation page (for instance, "Batteries"),
      1. If it doesn't exist, create it.
      2. If it has over 10 sections, categorize them into 2 groups, label each group, create one explanation page for each group, and add those explanation pages to the original parent topic page.
      3. Produce an evaluation of the page. The evaluation must check:
         - adherence to the rules,
         - clarity of the explanation, of how one section flows to the next, of the examples, intuitiveness and interactivity of the animations
         - whether the section organization is the optimal one,
         - whether there is a missing section
         - whether there is overlap with another article
         - whether the article repeats itself or can be more succinct
         - Fact-check the content using the Web and add authoritative sources if needed.
         Use this review to highlight ways in which this article could be improved.
         Add this review as one or multiple improvement notes.
      4. If there is an improvement note left over on the page by previous agents or the author: Read it, address it, delete it (except don't delete it if it is an author note).

The agent has access to the following tools in order to perform its duties:
- `web_search(query)`: searches the Web for the query and returns a list of relevant links and snippets.
- `web_fetch(url)`: fetches the content of the given URL and returns it as text.
- `run_js(code)`: runs the given JavaScript code in `isolated-vm` and returns the result.
- `grep(pattern, folder)`: searches the content for a given regular expression and returns the matching files and lines (with line number, 1-indexed).
- `find_files(pattern, folder)`: searches the content for files whose path (including the filename or parent folder name, upto the content/ folder) matches the given pattern. Returns the matching files.
- `read_file(path)`: reads the content of the file at the given path and returns it as text.
- `edit_file(path, lineno_start, lineno_end, new_content)`: edits the file at the given path, replacing the content from `lineno_start` to `lineno_end` (both included, 1-indexed) with `new_content`.
- `delete_file(path)`: deletes the file at the given path.

The agent should have reasoning on, and preserve reasoning and the message history between calls, for instance after using tool calls.
Reset the context to the base prompt on every loop however.

The agent should log every step of the loop that it is on, indicating the step (eg. "1.1.2.3").
When running the agent with `npm run agent -- --debug`, a more verbose log should be stored in logs/,
showcasing each agent step (reasoning, tool call request and response, and answer).

The improvement notes are not part of the page (they should not be published, nor appear in the static content!).
They are on a separate folder, indexed so that the agent finds it easily for a specific page:
under notes/ for agent notes, and under author-notes/ for author notes.
