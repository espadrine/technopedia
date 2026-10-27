# Text Search

Text search finds occurrences of a pattern (or a set of patterns) in a text, or builds an index over the text so that such queries are cheap. It is the engine behind `grep`, search engines, spell-checkers, code editors, and database full-text search.

**Terse definition:** given a text $`T` of length $`n` and a pattern of length $`m`, return the positions where the pattern occurs (or answer membership/ranking queries over a corpus).

**Classes of solutions:**

- **Linear-time scanning** (Knuth–Morris–Pratt, Boyer–Moore, Rabin–Karp): $`O(n+m)` per query, no preprocessing of the text.
- **Precomputed text structures** (suffix trees, suffix arrays, inverted indexes): preprocess the text once, then answer each query in time depending on the pattern length and the number of matches.

Text search is the class of the [Search and Data Structures](./Readme.md) table concerned with pattern/substring access; it contrasts with positional (index-based) access, where the location is known and only the value must be fetched.

> **Authoritative sources**
> - [Introduction to Algorithms (CLRS), Ch. 32 (String Matching)](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/)
> - [The Art of Computer Programming, Vol. 3: Sorting and Searching](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)
> - [Robertson & Spärck Jones, "Relevance weighting of search terms" (1994)](https://dl.acm.org/doi/10.5555/106765.106783)

## Linear-time string matching

**Terse definition:** scan the text once, comparing the pattern against a sliding window, and use the pattern's internal structure (or a rolling hash) to skip positions that cannot match. All three algorithms below run in $`O(n+m)` worst/expected case with no preprocessing of the text.

- **Knuth–Morris–Pratt (KMP)**: $`O(n+m)` worst case. Precompute the pattern's *prefix function* $`\pi` and, on a mismatch, jump the pattern using $`\pi` instead of restarting.
- **Boyer–Moore**: $`O(n+m)` worst case but $`O(n/m)` on average. Compare right-to-left and use the *bad-character* and *good-suffix* heuristics to skip.
- **Rabin–Karp**: $`O(n+m)` expected. Compare a rolling hash of the window to the pattern's hash; verify on a hash collision.

<details><summary>Details</summary>

**Why the naive scan is quadratic.** The naive algorithm aligns the pattern at each of the $`n-m+1` positions and compares up to $`m` characters: $`O(nm)`. The key observation behind every linear algorithm is that a mismatch at position $`i` tells you something about the *next* alignment, so you should not re-examine characters you already know match.

**KMP — the prefix function.** The prefix function $`\pi[j]` is the length of the longest proper prefix of $`P[0..j]` that is also a suffix of it. When a mismatch happens at pattern index $`j`, KMP slides the pattern so that the already-matched prefix of length $`\pi[j-1]` lines up, and resumes comparing at index $`\pi[j-1]`. This is exactly the "jump" that avoids re-scanning.

**Worked example.** Let $`P = \texttt{ababac}` ($`m = 6`) and $`T = \texttt{ababababac}` ($`n = 10`).

Prefix function of $`P`:

<table>
<tr><th>index j</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
<tr><th>P[j]</th><td>a</td><td>b</td><td>a</td><td>b</td><td>a</td><td>c</td></tr>
<tr><th>π[j]</th><td>0</td><td>0</td><td>1</td><td>2</td><td>3</td><td>0</td></tr>
</table>

Trace ($`j` = how many pattern characters currently match):

<table>
<tr><th>i</th><th>T[i]</th><th>j before</th><th>comparison</th><th>action</th><th>j after</th></tr>
<tr><td>0</td><td>a</td><td>0</td><td>a = a</td><td>advance</td><td>1</td></tr>
<tr><td>1</td><td>b</td><td>1</td><td>b = b</td><td>advance</td><td>2</td></tr>
<tr><td>2</td><td>a</td><td>2</td><td>a = a</td><td>advance</td><td>3</td></tr>
<tr><td>3</td><td>b</td><td>3</td><td>b = b</td><td>advance</td><td>4</td></tr>
<tr><td>4</td><td>a</td><td>4</td><td>a = a</td><td>advance</td><td>5</td></tr>
<tr><td>5</td><td>b</td><td>5</td><td>b ≠ c</td><td>jump j = π[4] = 3, then b = b</td><td>4</td></tr>
<tr><td>6</td><td>a</td><td>4</td><td>a = a</td><td>advance</td><td>5</td></tr>
<tr><td>7</td><td>b</td><td>5</td><td>b ≠ c</td><td>jump j = π[4] = 3, then b = b</td><td>4</td></tr>
<tr><td>8</td><td>a</td><td>4</td><td>a = a</td><td>advance</td><td>5</td></tr>
<tr><td>9</td><td>c</td><td>5</td><td>c = c</td><td>match at position 4</td><td>π[5] = 0</td></tr>
</table>

The single match is at position 4: $`T[4..9] = \texttt{ababac}`. Notice the two mismatches at $`i = 5` and $`i = 7`: instead of restarting at $`j = 0`, KMP jumps to $`j = 3` because the prefix "aba" of the pattern is also the suffix of what matched so far.

<svg viewBox="0 0 340 190" width="100%" style="max-width:360px;display:block;margin:8px auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
  <text x="10" y="20" font-size="12" font-weight="bold" fill="#333">KMP jump: P = "ababac", π = [0,0,1,2,3,0]</text>
  <rect x="20" y="40" width="40" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
  <text x="40" y="60" text-anchor="middle" font-size="14">a</text>
  <rect x="65" y="40" width="40" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
  <text x="85" y="60" text-anchor="middle" font-size="14">b</text>
  <rect x="110" y="40" width="40" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
  <text x="130" y="60" text-anchor="middle" font-size="14">a</text>
  <rect x="155" y="40" width="40" height="30" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="175" y="60" text-anchor="middle" font-size="14">b</text>
  <rect x="200" y="40" width="40" height="30" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="220" y="60" text-anchor="middle" font-size="14">a</text>
  <rect x="245" y="40" width="40" height="30" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
  <text x="265" y="60" text-anchor="middle" font-size="14">c</text>
  <text x="40" y="90" text-anchor="middle" font-size="12" fill="#388e3c">0</text>
  <text x="85" y="90" text-anchor="middle" font-size="12" fill="#388e3c">0</text>
  <text x="130" y="90" text-anchor="middle" font-size="12" fill="#388e3c">1</text>
  <text x="175" y="90" text-anchor="middle" font-size="12" fill="#1565c0">2</text>
  <text x="220" y="90" text-anchor="middle" font-size="12" fill="#1565c0">3</text>
  <text x="265" y="90" text-anchor="middle" font-size="12" fill="#d32f2f">0</text>
  <text x="20" y="112" font-size="11" fill="#d32f2f">mismatch at j=5 (b ≠ c)</text>
  <path d="M 220 100 Q 220 130 130 130" fill="none" stroke="#e65100" stroke-width="2" marker-end="url(#kmpArrow)"/>
  <defs>
    <marker id="kmpArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#e65100"/>
    </marker>
  </defs>
  <text x="150" y="150" font-size="11" fill="#e65100">jump to j = π[4] = 3</text>
  <text x="20" y="172" font-size="11" fill="#388e3c">green = prefix "aba" kept aligned (no re-scan)</text>
</svg>

**Boyer–Moore.** Compare from the right end of the window. The *bad-character rule* shifts the pattern so that the mismatching text character aligns with its rightmost earlier occurrence in the pattern (or past the pattern if it is absent). The *good-suffix rule* shifts so that a matched suffix re-aligns with an equal prefix. Both shifts are at least 1, and on a large alphabet the average shift is large, giving $`O(n/m)` comparisons.

**Rabin–Karp.** Maintain a hash of the current window $`T[i..i+m-1]` and compare it to the hash of $`P`. When the window slides by one, update the hash in $`O(1)` (drop the leftmost character's contribution, shift, add the new rightmost character). A hash match triggers a full $`O(m)` verification, so the expected time is $`O(n+m)` but the worst case (many collisions) is $`O(nm)`.

<iframe src="./Text-Search.simulation.html" title="Step-by-step KMP string matching: prefix function and the mismatch jump"></iframe>

> **Authoritative source**: CLRS Ch. 32 (String Matching), pp. 831–866. Knuth, Morris & Pratt, "Fast pattern matching in algorithms" (1977).

<details><summary>Example problem</summary>

Compute the prefix function for $`P = \texttt{aabaaab}`.

<details><summary>Solution</summary>

<table>
<tr><th>index j</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>
<tr><th>P[j]</th><td>a</td><td>a</td><td>b</td><td>a</td><td>a</td><td>a</td><td>b</td></tr>
<tr><th>π[j]</th><td>0</td><td>1</td><td>0</td><td>1</td><td>2</td><td>2</td><td>3</td></tr>
</table>

- j=1: "aa" → longest border "a" → 1.
- j=2: "aab" → no border → 0.
- j=3: "aaba" → border "a" → 1.
- j=4: "aabaa" → border "aa" → 2.
- j=5: "aabaaa" → border "aa" (not "aab") → 2.
- j=6: "aabaaab" → border "aab" → 3.

</details>
</details>

</details>

## Tries and prefix matching

**Terse definition:** a **trie** (prefix tree) stores a set of strings so that shared prefixes are stored once; each edge is labeled by a character and each root-to-node path spells a prefix. Lookup and insertion of a string of length $`L` cost $`O(L)`, and prefix queries (all strings starting with $`p`) cost $`O(|p| + k)` for $`k` results.

- **Space**: $`O(N \cdot \sigma)` where $`N` is the total number of characters across all stored strings and $`\sigma` is the alphabet size (each of the $`N+1` nodes stores $`\sigma` child pointers).
- **Use cases**: autocomplete, spell-checking, IP routing (radix trees), and the building block of the [Bloom filter](./Lists.md) family of probabilistic structures.

<details><summary>Details</summary>

**Step 1 — The structure.** A trie is a rooted tree. The root represents the empty string. Each edge from a node is labeled by one character; the path from the root to a node spells the string stored at that node. A node is marked *terminal* when the spelled string is a complete member of the set. Because shared prefixes share nodes, the trie is compact for sets with many common prefixes.

**Step 2 — Worked example.** Insert the words **cat**, **car**, **card**, **dog**. The prefixes "ca" and "car" are shared, so they occupy a single path.

<svg viewBox="0 0 320 250" width="100%" style="max-width:340px;display:block;margin:8px auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
  <circle cx="160" cy="25" r="16" fill="#0f3460" stroke="#e94560" stroke-width="2"/>
  <text x="160" y="30" text-anchor="middle" font-size="11" fill="#fff">root</text>
  <line x1="148" y1="38" x2="95" y2="72" stroke="#333"/>
  <text x="112" y="52" font-size="12" fill="#e65100">c</text>
  <line x1="172" y1="38" x2="245" y2="72" stroke="#333"/>
  <text x="215" y="52" font-size="12" fill="#e65100">d</text>
  <circle cx="90" cy="80" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="90" y="85" text-anchor="middle" font-size="12">c</text>
  <circle cx="250" cy="80" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="250" y="85" text-anchor="middle" font-size="12">d</text>
  <line x1="90" y1="94" x2="90" y2="126" stroke="#333"/>
  <text x="98" y="114" font-size="12" fill="#e65100">a</text>
  <circle cx="90" cy="134" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="90" y="139" text-anchor="middle" font-size="12">a</text>
  <line x1="78" y1="146" x2="50" y2="176" stroke="#333"/>
  <text x="52" y="162" font-size="12" fill="#e65100">t</text>
  <line x1="102" y1="146" x2="130" y2="176" stroke="#333"/>
  <text x="120" y="162" font-size="12" fill="#e65100">r</text>
  <circle cx="45" cy="184" r="14" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
  <text x="45" y="189" text-anchor="middle" font-size="12">t</text>
  <circle cx="135" cy="184" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="135" y="189" text-anchor="middle" font-size="12">r</text>
  <line x1="135" y1="198" x2="135" y2="226" stroke="#333"/>
  <text x="143" y="216" font-size="12" fill="#e65100">d</text>
  <circle cx="135" cy="234" r="14" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
  <text x="135" y="239" text-anchor="middle" font-size="12">d</text>
  <line x1="250" y1="94" x2="250" y2="126" stroke="#333"/>
  <text x="258" y="114" font-size="12" fill="#e65100">o</text>
  <circle cx="250" cy="134" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="250" y="139" text-anchor="middle" font-size="12">o</text>
  <line x1="250" y1="148" x2="250" y2="176" stroke="#333"/>
  <text x="258" y="166" font-size="12" fill="#e65100">g</text>
  <circle cx="250" cy="184" r="14" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
  <text x="250" y="189" text-anchor="middle" font-size="12">g</text>
  <text x="10" y="248" font-size="10" fill="#388e3c">green = terminal (cat, card, dog)</text>
</svg>

**Step 3 — Operations.**
- **Insert "car"**: walk c → a → r, mark the "r" node terminal. $`O(L)`.
- **Lookup "card"**: walk c → a → r → d; the "d" node is terminal → found. $`O(L)`.
- **Prefix query "ca"**: walk to the "a" node, then DFS its subtree to collect all terminal nodes (cat, car, card). $`O(|p| + k)`.

**Step 4 — Space.** With $`N` total characters across all stored strings, the trie has at most $`N+1` nodes (one per distinct prefix, plus the root). If each node stores a full array of $`\sigma` child pointers, the space is $`O(N \cdot \sigma)`. For a large alphabet (e.g. Unicode), this is wasteful, so real implementations store a sparse map (or a sorted child list) per node, dropping the $`\sigma` factor to the actual branching.

**Step 5 — Variants.** A **radix tree** (or Patricia trie) compresses unary chains into single edges labeled by a string, shrinking the tree for sparse data; it is the standard structure for longest-prefix matching such as IP routing. A **double-array trie** maps the tree into two arrays for cache-friendly, disk-resident lookup.

> **Authoritative source**: CLRS Ch. 32.3 (Tries). Crochemore & Rytter, "Jewels of the Stringology" (2002), Ch. 2.

<details><summary>Example problem</summary>

You store the words **the**, **then**, **them**, **theme** in a trie. How many nodes (including the root) does the trie have, and how many are terminal?

<details><summary>Solution</summary>

Distinct prefixes: "" (root), t, th, the, then, them, theme. That is 7 nodes total. Terminal nodes are the, then, them, theme → 4 terminal nodes. The shared prefix "the" is stored once and reused by all four words.

</details>
</details>

</details>

## Suffix structures

**Terse definition:** a **suffix array** sorts all $`n` suffixes of $`T`; a **suffix tree** is the compact trie of those suffixes; the **FM-index** compresses the suffix array into the Burrows–Wheeler transform plus rank structures. All three support substring queries in time proportional to the pattern length and the number of matches, after $`O(n)` (array) or $`O(n \log n)` (naive array construction) preprocessing.

- **Suffix array + LCP array**: $`O(n)` space; a query is a binary search over the array, $`O(m \log n)`, then a linear scan of the LCP array to count matches.
- **Suffix tree**: $`O(n)` space, $`O(m + k)` query (walk the tree, then count leaves).
- **FM-index**: $`O(n)` space (often $`< 2` bits/char); $`O(m \log \sigma)` query via backward search.

<details><summary>Details</summary>

**Step 1 — The suffix array.** The suffix array $`SA` is a permutation of $`0..n-1` such that the suffixes $`T[SA[i]..]` are in lexicographic order. A pattern $`P` occurs in $`T` iff it is a prefix of some suffix, i.e. iff the suffixes having prefix $`P` form a contiguous interval in $`SA`. Finding that interval is a binary search: $`O(m \log n)`.

**Step 2 — Worked example.** Let $`T = \texttt{banana}` ($`n = 6`).

<table>
<tr><th>rank</th><th>suffix</th><th>original index SA[i]</th><th>LCP with previous</th></tr>
<tr><td>0</td><td>a</td><td>5</td><td>0</td></tr>
<tr><td>1</td><td>ana</td><td>3</td><td>1</td></tr>
<tr><td>2</td><td>anana</td><td>1</td><td>3</td></tr>
<tr><td>3</td><td>banana</td><td>0</td><td>0</td></tr>
<tr><td>4</td><td>na</td><td>4</td><td>0</td></tr>
<tr><td>5</td><td>nana</td><td>2</td><td>2</td></tr>
</table>

So $`SA = [5, 3, 1, 0, 4, 2]` and the **LCP array** (longest common prefix of each suffix with its predecessor) is $`LCP = [0, 1, 3, 0, 0, 2]`.

<svg viewBox="0 0 360 150" width="100%" style="max-width:380px;display:block;margin:8px auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
  <text x="10" y="18" font-size="12" font-weight="bold" fill="#333">LCP array for T = "banana": [0,1,3,0,0,2]</text>
  <line x1="30" y1="120" x2="340" y2="120" stroke="#333"/>
  <rect x="95" y="100" width="30" height="20" fill="#4ecdc4"/>
  <rect x="145" y="60" width="30" height="60" fill="#e94560"/>
  <rect x="295" y="80" width="30" height="40" fill="#4ecdc4"/>
  <text x="60" y="135" text-anchor="middle" font-size="10">0</text>
  <text x="110" y="135" text-anchor="middle" font-size="10">1</text>
  <text x="160" y="135" text-anchor="middle" font-size="10">3</text>
  <text x="210" y="135" text-anchor="middle" font-size="10">0</text>
  <text x="260" y="135" text-anchor="middle" font-size="10">0</text>
  <text x="310" y="135" text-anchor="middle" font-size="10">2</text>
  <text x="150" y="52" font-size="10" fill="#e94560">peak = "ana" (2 matches)</text>
</svg>

**Step 3 — Counting matches with LCP.** Once the binary search locates the interval of suffixes prefixed by $`P`, the number of matches is the number of entries in that interval whose LCP value is at least $`m` (the pattern length). For $`P = \texttt{ana}` ($`m = 3`), the interval is ranks 1–2 (suffixes "ana", "anana"); both have LCP ≥ 3 within the interval, so there are 2 matches, at original indices 3 and 1.

**Step 4 — The suffix tree.** The suffix tree is the compact trie of all suffixes: internal nodes have at least two children and edges are labeled by strings (unary chains are compressed). A query walks the tree following $`P` in $`O(m)`, then counts the leaves in the reached subtree in $`O(k)`. Total $`O(m + k)`. It is the most query-efficient structure but harder to build and maintain.

**Step 5 — The FM-index.** The FM-index does **not** store the suffix array explicitly. It stores:
1. The **Burrows–Wheeler transform (BWT)** of $`T` — a permutation of the characters that groups similar contexts together (highly compressible).
2. A **C-array**: for each character $`c`, the number of characters in the BWT that are lexicographically smaller than $`c`.
3. **Rank structures** (succinct bitvectors or a wavelet tree) that answer $`\text{rank}_c(i)` = the number of occurrences of $`c` in $`BWT[0..i]`.
4. A **sampled** suffix array (one entry every $`B` rows) so that match *positions* can be reported by walking back from a sample.

A query runs **backward search**: starting from the whole BWT, it repeatedly narrows the row interval $`[lo, hi)` by one character of $`P` (read right-to-left) using the C-array and rank. Each step is $`O(\log \sigma)`, so the whole query is $`O(m \log \sigma)`, in $`O(n)` space (often under 2 bits per character). This is the index behind `bwa`/`bowtie` genome aligners.

> **Authoritative sources**: CLRS Ch. 32.4 (Suffix Trees). Manber & Myers, "Suffix arrays: a new method for on-line string searches" (1993). Ferragina & Manzini, "Indexing string databases" (2000).

<details><summary>Example problem</summary>

For $`T = \texttt{banana}`, how many times does the pattern $`P = \texttt{na}` occur, and at which original indices?

<details><summary>Solution</summary>

$`P = \texttt{na}` ($`m = 2`). In the sorted suffix list, the suffixes prefixed by "na" are "na" (index 4) and "nana" (index 2) — ranks 4 and 5. Both have LCP ≥ 2 within the interval, so there are **2 matches**, at original indices **4** and **2**.

</details>
</details>

</details>

## Inverted index and information retrieval

**Terse definition:** an **inverted index** maps each term to the list of documents (and positions) containing it; a **ranking function** (TF-IDF, BM25) orders the documents that match a query by relevance. This is the core of every search engine.

- **Inverted index**: build in $`O(N)` over the corpus; a query for $`k` terms intersects $`k` posting lists.
- **TF-IDF**: score a document by how often a term appears in it (TF) weighted by how rare the term is across the corpus (IDF).
- **BM25**: a saturated, length-normalized refinement of TF-IDF; the de-facto standard ranking function.

<details><summary>Details</summary>

**Step 1 — The inverted index.** Instead of storing "document → its terms" (a forward index), the inverted index stores "term → documents containing it". Each entry (a **posting list**) is a sorted list of document IDs, optionally with term frequencies and positions.

<svg viewBox="0 0 420 200" width="100%" style="max-width:440px;display:block;margin:8px auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
  <text x="10" y="18" font-size="12" font-weight="bold" fill="#333">Inverted index (corpus: d1="the cat sat", d2="the dog sat", d3="cat dog")</text>
  <rect x="20" y="40" width="70" height="26" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
  <text x="55" y="57" text-anchor="middle" font-size="12">cat</text>
  <rect x="20" y="76" width="70" height="26" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
  <text x="55" y="93" text-anchor="middle" font-size="12">dog</text>
  <rect x="20" y="112" width="70" height="26" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
  <text x="55" y="129" text-anchor="middle" font-size="12">sat</text>
  <rect x="20" y="148" width="70" height="26" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
  <text x="55" y="165" text-anchor="middle" font-size="12">the</text>
  <rect x="200" y="40" width="180" height="26" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="4"/>
  <text x="290" y="57" text-anchor="middle" font-size="12">[d1, d3]</text>
  <rect x="200" y="76" width="180" height="26" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="4"/>
  <text x="290" y="93" text-anchor="middle" font-size="12">[d2, d3]</text>
  <rect x="200" y="112" width="180" height="26" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="4"/>
  <text x="290" y="129" text-anchor="middle" font-size="12">[d1, d2]</text>
  <rect x="200" y="148" width="180" height="26" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="4"/>
  <text x="290" y="165" text-anchor="middle" font-size="12">[d1, d2]</text>
  <line x1="90" y1="53" x2="200" y2="53" stroke="#333"/>
  <line x1="90" y1="89" x2="200" y2="89" stroke="#333"/>
  <line x1="90" y1="125" x2="200" y2="125" stroke="#333"/>
  <line x1="90" y1="161" x2="200" y2="161" stroke="#333"/>
  <text x="10" y="192" font-size="10" fill="#555">Query "cat dog": intersect [d1,d3] ∩ [d2,d3] = {d3}.</text>
</svg>

A query for multiple terms is answered by **intersecting** the posting lists (AND) or **merging** them (OR). Because the lists are sorted, an intersection is a linear merge in the total list lengths.

**Step 2 — TF-IDF.** The raw term frequency $`f(t, D)` rewards documents that mention $`t` often, but a term like "the" appears everywhere and is uninformative. TF-IDF down-weights common terms:

```math
\mathrm{tf\text{-}idf}(t, D) = f(t, D) \cdot \log\!\frac{N}{n(t)}
```

where $`N` is the number of documents and $`n(t)` is the number of documents containing $`t`. A term that appears in few documents (large $`N/n(t)`) gets a high weight.

**Step 3 — BM25.** TF-IDF has two problems: the term frequency grows without bound, and long documents are unfairly favored. **BM25** fixes both. It saturates the frequency with a parameter $`k_1` and normalizes by document length with a parameter $`b`:

```math
\mathrm{score}(D, Q) = \sum_{t \in Q} \mathrm{IDF}(t) \cdot \frac{f(t, D)\,(k_1 + 1)}{f(t, D) + k_1\left(1 - b + b\,\dfrac{|D|}{\mathrm{avgdl}}\right)}
```

```math
\mathrm{IDF}(t) = \ln\!\left(\frac{N - n(t) + 0.5}{n(t) + 0.5} + 1\right)
```

Typical values are $`k_1 \in [1.2, 2.0]` and $`b \in [0.75, 1.0]`. The fraction approaches $`k_1 + 1` as $`f(t, D) \to \infty` (saturation), and the length term penalizes documents longer than average.

> **Authoritative source**: Robertson, S. E., & Spärck Jones, K. (1994). "Relevance weighting of search terms." *Journal of the American Society for Information Science*, 45(7), 520–536. [DOI: 10.5555/106765.106783](https://dl.acm.org/doi/10.5555/106765.106783).

**Step 4 — n-grams and fuzzy matching.** To tolerate typos, index the words by their **n-grams** (substrings of length $`n`) and require a candidate to share enough n-grams with the query. The arithmetic: a word of length $`L` has $`L - 1` bigrams, and a single edit (insert, delete, or substitute) changes at most 2 bigrams. So a word within edit distance $`d` of the query shares at least $`(L - 1) - 2d` bigrams with it.

*Example*: the query **elephant** (length 8) has 7 bigrams: el, le, ep, ph, ha, an, nt. A candidate within edit distance 2 must share at least $`7 - 2\cdot 2 = 3` bigrams. The typo **elephat** (one deletion) shares el, le, ep, ph, ha = 5 bigrams ≥ 3, so it passes the filter. An unrelated word like **computer** shares 0 bigrams and is rejected before any expensive edit-distance computation. (Note: a string of length 10 has 9 bigrams, not $`\binom{10}{2}` — the latter counts 2-element subsets, not substrings.)

> **Authoritative source**: Manku, Baeza-Yates & Jain, "Efficient computation of edit distance" (2006).

<details><summary>Example problem</summary>

A corpus has $`N = 1000` documents. The term "quantum" appears in $`n(t) = 10` documents, and in a particular document $`D` it appears $`f(t, D) = 4` times. Compute the TF-IDF weight of "quantum" in $`D` (use natural log, round to 2 decimals).

<details><summary>Solution</summary>

$`\mathrm{tf\text{-}idf} = f \cdot \log(N/n(t)) = 4 \cdot \ln(1000/10) = 4 \cdot \ln(100) = 4 \cdot 4.605 = 18.42`.

</details>
</details>

</details>

## Inverted index and scalability

**Terse definition:** a production inverted index is sharded across machines, with posting lists compressed and merged in parallel; at the top of the stack, keyword retrieval is increasingly complemented by **vector (semantic) search**, which ranks by embedding similarity rather than exact term overlap.

<details><summary>Details</summary>

**Step 1 — Scaling the index.** A single machine cannot hold the inverted index of a web-scale corpus. The standard design **shards** the corpus: documents are partitioned (by document-ID hash) across nodes, and each node builds and serves the inverted index for its shard. A query is fanned out to all shards, which return their top-$`k` locally, and a coordinator **merges** the per-shard ranked lists into a global top-$`k`. Posting lists are compressed with delta encoding + variable-byte or bit-packing, and term dictionaries are stored in a [B-tree](./Key-Value-Stores.md) or a hash table for fast lookup.

**Step 2 — Keyword vs. semantic search.** Keyword retrieval (the inverted index above) matches on *exact* terms: a query for "car" will not return documents that only say "automobile". **Vector / embedding-based (semantic) search** instead maps each document and the query to a high-dimensional dense vector (an *embedding*) and ranks by a similarity measure such as cosine similarity or inner product. This captures meaning and paraphrase but cannot do exact-term or positional matching, and the nearest-neighbor search over millions of vectors requires its own index (e.g. an approximate nearest-neighbor structure). Modern engines run **hybrid** search: the inverted index for precision and the vector index for recall, then fuse the two ranked lists.

> **Authoritative source**: Zobel & Moffat, "Inverted files for text search engines" (2006).

<details><summary>Example problem</summary>

A search cluster has 8 shards. A query returns a local top-5 from each shard. How many candidate documents does the coordinator merge, and what is the asymptotic cost of the merge if each local list is already sorted by score?

<details><summary>Solution</summary>

The coordinator merges $`8 \times 5 = 40` candidates. Since each of the 8 lists is sorted, a multi-way merge (e.g. with a min-heap of size 8) costs $`O(40 \log 8)`, i.e. linear in the number of candidates times the log of the number of shards.

</details>
</details>

</details>

## Regular expression matching

**Terse definition:** a **regular expression** describes a set of strings with operators for concatenation, alternation ($`|`), and repetition ($`*`, $`+`, $`?`). Matching a regex against a text is done either by **backtracking** (try and undo) or by **automaton simulation** (build an NFA/DFA and run it), the latter guaranteeing linear time.

- **Backtracking engines** (PCRE, most language `re` modules): simple to write, support lookaheads, but can be $`O(2^n)` on adversarial input (catastrophic backtracking).
- **Automaton engines** (Thompson NFA simulation, Pike VM, DFA): $`O(n)` per input character, no worst-case blowup; the basis of `grep` and `ripgrep`.

<details><summary>Details</summary>

**Step 1 — From regex to automaton.** The theoretical foundation is that every regular expression denotes a regular language accepted by a finite automaton (see [Computability and Complexity Classes](../Computability-and-Complexity-Classes.md) for the automata and decidability background). **Thompson's construction** builds an NFA for a regex in linear time, using only $`\varepsilon`-transitions (transitions that consume no input):
- A literal $`c`: a two-state NFA with a $`c`-labeled edge.
- Concatenation $`AB`: wire the accept state of $`A` to the start of $`B` with an $`\varepsilon`-edge.
- Alternation $`A|B`: a new start $`\varepsilon`-branches to $`A` and $`B`; both accept states $`\varepsilon`-merge into a new accept.
- Repetition $`A*`: a new start $`\varepsilon`-branches into $`A` and directly to a new accept; $`A`'s accept $`\varepsilon`-loops back to its start and also $`\varepsilon`-exits.

**Step 2 — The NFA for "ab\*".** The regex $`\texttt{ab*}` (an "a" followed by zero or more "b"s) compiles to:

<svg viewBox="0 0 340 180" width="100%" style="max-width:360px;display:block;margin:8px auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
  <defs>
    <marker id="nfaArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#333"/>
    </marker>
  </defs>
  <circle cx="40" cy="70" r="16" fill="#0f3460" stroke="#e94560" stroke-width="2"/>
  <text x="40" y="75" text-anchor="middle" font-size="11" fill="#fff">0</text>
  <circle cx="120" cy="70" r="16" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="120" y="75" text-anchor="middle" font-size="11">1</text>
  <circle cx="200" cy="70" r="16" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="200" y="75" text-anchor="middle" font-size="11">2</text>
  <circle cx="200" cy="140" r="16" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="200" y="145" text-anchor="middle" font-size="11">3</text>
  <circle cx="290" cy="70" r="16" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
  <text x="290" y="75" text-anchor="middle" font-size="11">4</text>
  <line x1="56" y1="70" x2="102" y2="70" stroke="#333" marker-end="url(#nfaArrow)"/>
  <text x="79" y="62" text-anchor="middle" font-size="12" fill="#e65100">a</text>
  <line x1="136" y1="70" x2="182" y2="70" stroke="#333" marker-end="url(#nfaArrow)"/>
  <text x="159" y="62" text-anchor="middle" font-size="12">ε</text>
  <line x1="200" y1="86" x2="200" y2="122" stroke="#333" marker-end="url(#nfaArrow)"/>
  <text x="210" y="108" font-size="12" fill="#e65100">b</text>
  <path d="M 184 140 Q 150 140 150 90 Q 150 70 182 70" fill="none" stroke="#333" marker-end="url(#nfaArrow)"/>
  <text x="150" y="120" font-size="12">ε</text>
  <line x1="216" y1="140" x2="274" y2="82" stroke="#333" marker-end="url(#nfaArrow)"/>
  <text x="255" y="120" font-size="12">ε</text>
  <text x="10" y="172" font-size="10" fill="#555">NFA for "ab*": 0→1 on 'a', then loop on 'b' (2→3→2), exit to accept 4.</text>
</svg>

**Step 3 — Running the NFA: Thompson simulation.** An NFA can be in many states at once. **Thompson's algorithm** keeps the set of *active* states and, for each input character, computes the next active set by following $`\varepsilon`-closures and character edges. This is $`O(n)` in the input length (each state is processed a bounded number of times). The **Pike VM** (used in `grep`) is a compiled, instruction-based version of the same idea.

**Step 4 — Backtracking vs. automata.** A **backtracking** engine walks the regex and the text together, and on a failed branch it *undoes* the last choice and tries the next. It is easy to implement and supports powerful features (lookaheads, backreferences), but a regex like $`\texttt{(a+)+b}` against the input $`\texttt{aaaa...a}` (no "b") explores an exponential number of ways to split the "a"s — **catastrophic backtracking**. Automaton engines have no such blowup because they track a set of states, not a single path. In practice, `grep`/`ripgrep` use automata for speed and safety, while language regex libraries often use backtracking for expressiveness.

> **Authoritative sources**: Thompson, "Regular expression search algorithm" (1968). Pike, "The Pike programming language" (1988).

<details><summary>Example problem</summary>

Does the regex $`\texttt{ab*}` match the string $`\texttt{abbb}`? Trace the active states of the NFA above.

<details><summary>Solution</summary>

- Start: active = {0}.
- Read "a": 0 → 1 on "a"; ε-closure of 1 = {1, 2}. Active = {1, 2}.
- Read "b": from 2 → 3 on "b"; ε-closure of 3 = {2, 3, 4}. Active = {2, 3, 4}.
- Read "b": again → active = {2, 3, 4}.
- Read "b": again → active = {2, 3, 4}.
- End of input: the accept state 4 is active, so **yes**, $`\texttt{ab*}` matches $`\texttt{abbb}`.

</details>
</details>

</details>

## Quizz

<details><summary>Quizz</summary>

You are building a spell-checker over a dictionary of 100,000 English words and must suggest corrections for a mistyped word of length 8 within edit distance 2. You have two candidate designs:

1. For each dictionary word, compute the full edit distance to the query and keep those ≤ 2.
2. Index every dictionary word by its bigrams; for the query, keep only dictionary words that share at least 3 bigrams, then compute the full edit distance only on those survivors.

Which design is faster in practice, and why? (Hint: how many bigrams does the query have, and how many bigrams can 2 edits destroy?)

<details><summary>Solution</summary>

**Design 2 is faster.** The query word of length 8 has $`8 - 1 = 7` bigrams. Each edit changes at most 2 bigrams, so 2 edits can destroy at most 4 bigrams; therefore any word within edit distance 2 must share at least $`7 - 4 = 3` bigrams with the query. Design 2 uses the bigram index to discard the vast majority of the 100,000 words in $`O(1)`-ish set lookups (a word that shares fewer than 3 bigrams is rejected without any edit-distance work), and only runs the expensive $`O(L^2)` dynamic-programming edit distance on the small set of survivors. Design 1 runs the full edit distance on all 100,000 words, which is orders of magnitude more work. The bigram filter is a classic *filter-then-verify* pattern: a cheap necessary condition (shared bigrams) prunes candidates before the expensive exact test.

</details>
</details>

<iframe src="./Text-Search.simulation.html" title="Step-by-step KMP string matching: prefix function and the mismatch jump"></iframe>
