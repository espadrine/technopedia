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
  The first column of the table is "Page", and contains the title of the subpage, which links to it.
- all links to a subtopic must correspond to a page that really exists.
- all topic pages must be referenced in a parent topic page.

An explanation page must have:
1. a singular topic (eg. "B-tree")
2. an overview of the utility of what is explained
3. when there is an authoritative source for it (eg. academic paper, RFC), a widget with a link to the sources
4. the content, which should be structured into sections each corresponding to an idea/a pattern/a group of concepts/theorems/etc.
   Examples: different electronics components, different physics particles, different sorting algorithms.
   Each section should have a title, a definition, a tutorial.
   1. The definition should be very terse. Like a cheatsheet. Only the raw information, theorem, formula, etc.
      The goal is for the reader to remember what it is if they already know, and if they don't, to give them a first clue.
      It can link to an explanation subpage that lists more details (for instance: the main page shows the list of types of compression algorithms,
      eg. one section for "variable-size input to fixed-sized output", with LZ77 as example,
      and we have a subpage listing LZ77, LZ78, LZW, etc.).
   2. The tutorial should be in a folded block "DETAILS".
      It explains the idea step-by-step: the goal is for the reader to understand everything, so it should flow from one explanation to the next with no sizable leap.
      Each step should have:
      1. a global explanation,
      2. then a specific example,
      3. intersperse diagrams, animations, interactive demos, iframe simulations (eg. electronics schematics, physics simulations, ...),
         in order to showcase and enhance the examples.
      4. then links to authoritative sources,
      5. then an example problem (folded), with the solution (folded deeper in the fold).
      It should also make heavy use of links to other parts of the Technopedia when another concept is related or necessary to understand first.
   There should be plenty of graphs, diagrams, interactive animations.
   Use either SVG or HTML + JS for diagrams; never ASCII art.
   Each diagram should describe a single concept: do not use tabs in diagrams to switch between concepts.
5. After the explanation, there should be a folded quizz section with an example problem, and a folded section on how to solve it, that the reader can unfold.
No dead links: All links must correspond to a page that really exists.
No unreachable pages: All explanation pages must be referenced in a parent topic page.

The system should reuse widgets and code libraries when possible.
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
It should have a database of pages, with each page having a type, score, a review timestamp indicating the latest time it has been reviewed,
and an edit timestampt indicating the latest time it has been edited.
It should, in a loop:

1. Initiate Reviewer mode.
   1. Pick a page with the following priority:
      1. if there is no page at all, move on to editor mode;
      2. if a page exists on disk but not in the database, pick it and add it to the database;
      3. if there are pages with a null score, pick the one amongst them with the oldest edit timestamp;
      4. otherwise, pick the page with the oldest review timestamp.
   2. Produce an evaluation of the page.
      If the page is a topic page, the evaluation must check:
      - adherence to the rules,
      - whether the categorization is the optimal one,
      - whether there is a missing topic
      If the page is an explanation page, the evaluation must check:
      - adherence to the rules,
      - clarity of the explanation, of how one section flows to the next, of the examples, intuitiveness and interactivity of the animations
      - whether the section organization is the optimal one,
      - whether there is a missing section
      - whether there is overlap with another article
      - whether the article repeats itself or can be more succinct
      - fact-check the content using the Web and add authoritative sources if needed.
      Use this review to highlight ways in which this article could be improved.
      As part of this review, give the page a score from 0 to 100, which represents how much of the page should be reworked:
      0 means all of it should be rewritten or deleted, 100 means it is perfect and needs no work.
      Update the page's score as an exponential average: the latest score is worth 25% of the new score, and 75% of the old score.
      (If the score is null, set it to the latest score.)
      Update the page's review timestamp to the current time.
      Add this review as one or multiple improvement notes.
2. Initiate Editor mode.
   1. Pick a page with the following priority:
      1. if there is no page at all, create the highest-level topic page;
      2. otherwise, pick the page with the lowest score.
   2. Check the breadcrumbs of the page: the list of ancestor pages.
      If there is one missing: give that information to the agent,
      and ask it to make the page reachable from the top-level page,
      by adding the right link in the right ancestor page,
      or by creating the relevant missing ancestor pages (and adding them to the database).
   3. If it is a topic page (eg. Manufacturing),
      1. If it is empty: create its content, with the links, and create the subpages corresponding to those links, leaving them empty.
         Add it, along with its subpages, to the page database.
      2. If the page has more than 10 subtopics, categorize them into 2 groups,
         label each group, create one topic page for each group, and
         add those topic pages to the parent topic page, removing the old topic page.
         Then fill in the topic page.
      3. Read the author notes on all ancestor pages, read the agent notes on the current page,
         address them, delete the agent notes.
         If it creates a page, that page should be added to the database; if it deletes it, it should be removed from the database.
         If it deletes the page wholesale, it should update the parent topic page to remove the link to the deleted page, before concluding the work.
   4. If it is an explanation page (for instance, "Batteries"),
      1. If it is empty, create its content.
      2. If it has over 10 sections, categorize them into 2 groups, label each group, create one explanation page for each group, and add those explanation pages to the original parent topic page as new categories.
      3. Read the author notes on all ancestor pages, read the agent notes on the current page,
         address them, delete the agent notes.
         If it creates a page, that page should be added to the database; if it deletes it, it should be removed from the database.
         If it deletes the page wholesale, it should update the parent topic page to remove the link to the deleted page, before concluding the work.
   5. The agent should now make sure there are no dead links nor unreachable pages, handling them as needed.
   6. Reset the page's score to null, and update the page's edit timestamp to the current time.

The agent has access to the following tools in order to perform its duties:
- `web_search(query)`: searches the Web for the query and returns a list of relevant links and snippets.
- `web_fetch(url)`: fetches the content of the given URL and returns it as text.
- `run_js(code)`: runs the given JavaScript code in `isolated-vm` and returns the result.
- `grep(pattern, file, folder)`: searches the content (or the given file, or files inside the given folder) for a given regular expression and returns the matching files and lines (with line number, 1-indexed).
- `find_files(pattern, folder)`: searches the content (or the given folder) for files whose path (including the filename or parent folder name, upto the content/ folder) matches the given pattern, a regular expression. Returns the matching files.
- `read_file(path, lineno_start, n_lines)`: reads the content of the file at the given path and returns it as text. If `lineno_start` is present, it starts reading the file from that line number (1-indexed), defaulting to line 1. If `n_lines` is present, it reads that many lines from the file, defaulting to going all the way to the end.
- `edit_file(path, lineno_start, lineno_end, new_content)`: edits the file at the given path, replacing the content from `lineno_start` to `lineno_end` (both included, 1-indexed) with `new_content`. If `lineno_start` is omitted, it defaults to 1. If `lineno_end` is omitted, it defaults to the last line of the file.
- `delete_file(path)`: deletes the file at the given path.
- `rename_file(path, new_path)`: changes the name of the file or its location in the hierarchy.

The agent should have reasoning on, and preserve reasoning and the message history between calls, for instance after using tool calls.
Reset the context to the base prompt on every loop however.

The agent should log every step of the loop that it is on, indicating the step (eg. "1.1.2.3").
When running the agent with `npm run agent -- --debug`, a more verbose log should be stored in logs/,
showcasing each agent step (reasoning, tool call request and response, and answer).

The improvement notes are not part of the page (they should not be published, nor appear in the static content!).
They are on a separate folder, indexed so that the agent finds it easily for a specific page:
under notes/ for agent notes, and under author-notes/ for author notes.

You can execute the agent using a local LLM with `npm run agent`, or with an LLM API:

    TECHNOPEDIA_API_KEY=$MISTRAL_API_KEY TECHNOPEDIA_HOST=https://api.mistral.ai TECHNOPEDIA_MODEL=mistral-large-4 TECHNOPEDIA_REASONING_EFFORT=high npm run agent -- --debug
