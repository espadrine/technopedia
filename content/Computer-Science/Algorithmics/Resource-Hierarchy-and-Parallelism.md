# Space and Parallel Complexity

Where [Computability and Complexity Classes](./Computability-and-Complexity-Classes.md) asks *how much time* a computation needs, this page asks two related questions: *how much memory* does a computation need (space complexity), and *how much can be parallelized* (circuit depth)? The two are linked: a machine using little space has few configurations, so its computation can be laid out as a shallow circuit.

> **Authoritative sources**
> - [Space-bounded computation (Sipser, Introduction to the Theory of Computation)](https://math.mit.edu/~sipser/book.html)
> - [The complexity of theorem-proving procedures (Borodin, 1972)](https://dl.acm.org/doi/10.1145/800155.805057)

## Space complexity classes

A language $`L` is in **SPACE($`s(n)`)** if a deterministic Turing machine decides it using at most $`s(n)` tape cells on inputs of length $`n`; **NSPACE($`s(n)`)** is the nondeterministic analogue. The canonical classes are:

- **L**: deterministic $`O(\log n)` space. Example: deciding whether a number is even, or comparing two positions in a list — only $`O(\log n)` bits are needed to count.
- **NL**: nondeterministic $`O(\log n)` space. Example: **ST-CONNECTIVITY** (is $`t` reachable from $`s` in a graph?) — a nondeterministic machine just guesses the path vertex by vertex, storing one vertex index ($`O(\log n)` bits) at a time. The **Immerman–Szelepcsényi theorem** (1987) shows $`\text{NL} = \text{co}\text{-NL}`: nondeterministic log-space can also certify *un*reachability.
- **PSPACE**: deterministic polynomial space. It contains NP and PH, since a polynomial-space machine can enumerate all certificates one at a time, reusing the same tape region. Canonical complete problem: **TQBF** (truth of quantified Boolean formulas).
- **EXPSPACE**: exponential space. By the space hierarchy theorem (below), it strictly contains PSPACE.

<details><summary>Details</summary>

The key counting fact: a machine with $`s(n)` tape cells over a fixed alphabet, $`|Q|` states, and one head has at most $`|Q| \cdot s(n) \cdot |\Gamma|^{s(n)}` configurations. If it never repeats a configuration it must halt within that many steps, so a decider using $`s(n)` space runs in at most $`2^{O(s(n))}` time. This is why $`\text{PSPACE} \subseteq \text{EXPTIME}` and why polynomial space is so powerful relative to polynomial time: space is reusable, time is not.

**Space hierarchy theorem**: for space-constructible $`s_2(n) \gg s_1(n)` (e.g. $`s_2(n) \ge s_1(n+1)` asymptotically), $`\text{SPACE}(s_1(n)) \subsetneq \text{SPACE}(s_2(n))`. The proof is a diagonalization: enumerate all $`s_1(n)`-space machines, and on input $`x` simulate machine $`x` on input $`x`, doing the opposite — the extra space pays for the bookkeeping. Unlike the time hierarchy, this gives unconditional separations: L ⊊ PSPACE, for instance, is proven, whereas P ⊊ EXPTIME is the best unconditional time separation.

**Example problem**: show that ST-CONNECTIVITY is in NL.

<details><summary>Solution</summary>

A nondeterministic machine stores only the current vertex $`v` (initialized to $`s`), using $`\lceil \log_2 |V| \rceil` bits. At each step it nondeterministically guesses a neighbor $`u` of $`v` (scanning the adjacency list with an $`O(\log n)`-bit counter), overwrites $`v` with $`u`, and repeats for at most $`|V|` steps (another $`O(\log n)`-bit counter). It accepts if $`v = t` ever occurs. Every accepting branch traces a genuine path from $`s` to $`t`, and if a path exists some branch guesses it — so the language is decided in $`O(\log n)` nondeterministic space, i.e. ST-CONNECTIVITY ∈ NL. (Savitch's theorem further shows $`\text{NSPACE}(s) \subseteq \text{SPACE}(s^2)`, so it is even in DSPACE($`\log^2 n`).)

</details>

</details>

## Circuit complexity and parallelism

A Boolean **circuit** is a DAG of AND, OR, and NOT gates whose inputs are the input bits; its **size** is its gate count and its **depth** is the length of its longest path. Depth measures how much the computation can be parallelized: each layer of a depth-$`d` circuit is one parallel step.

- **NC$`^k`**: languages decidable by poly-size, $`O(\log^k n)`-depth circuits. **NC** = $`\bigcup_k \text{NC}^k` is the class of problems with fast (polylogarithmic-time) parallel algorithms on polynomially many processors.
- **AC$`^0`**: constant-depth circuits with unbounded-fan-in AND/OR gates. The **parity function is not in AC$`^0`** (Furst–Saxe–Sipser; Håstad's switching lemma, 1987) — the first major unconditional lower bound.
- The **NC hierarchy**: $`\text{NC}^1 \subseteq \text{L} \subseteq \text{NL} \subseteq \text{NC}^2 \subseteq \text{P}`. Whether NC = P (the "P = NC?" question) is the parallel-computation analogue of P vs NP: it asks whether every polynomial-time problem is efficiently parallelizable.

<details><summary>Details</summary>

**Examples of NC$`^1` computations**: addition of two $`n`-bit numbers (carry-lookahead: each output bit is a function of $`O(\log n)` inputs, computable by a tree of gates of depth $`O(\log n)`), and Boolean formula evaluation. **Examples of NC$`^2`**: matrix multiplication ($`O(\log n)` depth with $`O(n^3)` processors via associative reduction), determinant, and graph reachability. Problems believed *not* to be in NC include linear programming and circuit value evaluation (they are P-complete under log-space reductions: if any P-complete problem were in NC, then NC = P).

**Example problem**: show that computing the AND of $`n` bits is in NC$`^1`.

<details><summary>Solution</summary>

Build a balanced binary tree of 2-input AND gates: $`n-1` gates, depth $`\lceil \log_2 n \rceil`. Layer $`i` computes the AND of disjoint blocks of $`2^i` input bits; all gates in a layer are independent and can be evaluated in parallel. Size is $`O(n)` (polynomial) and depth is $`O(\log n)`, so the language $`\{1^n\}` (and generally the AND of the input bits) is in NC$`^1`. The same tree pattern with OR gates, or with a comparator network, gives parallel OR, MAX, and sorting networks — the fundamental templates of parallel algorithms.

</details>

</details>

## Quizz

<details><summary>Quizz</summary>

**Problem**: Show that $`\text{L} \subseteq \text{P}`: every log-space decider runs in polynomial time.

<details><summary>Solution</summary>

A log-space machine on inputs of length $`n` has $`s(n) = c\log n` tape cells, $`|Q|` states, and one head position among $`s(n)` cells, so its number of distinct configurations is at most $`|Q| \cdot s(n) \cdot |\Gamma|^{s(n)} = |Q| \cdot c\log n \cdot n^{c\log|\Gamma|}`, which is polynomial in $`n`. A decider must halt on every input, and a machine that halts never repeats a configuration (otherwise it would loop forever); hence it halts within polynomially many steps. Since it also uses only $`O(\log n)` space — and $`O(\log n) \subseteq O(n^k)` — the same machine witnesses membership in P.

</details>

</details>
