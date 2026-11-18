# Theory of Computation

Theory of computation asks what can be computed at all, and at what cost. It is relevant whenever a problem must be decided (does an answer exist, and can a machine find it?), bounded (how long, how much memory, how much parallelism will it take?), or classified (is it as hard as the hardest problems in its family?) before any concrete implementation is chosen.

- It separates the decidable from the undecidable, so you know when no algorithm can exist.
- It bounds the time, space, and parallel depth of a computation in terms of input size.
- It classifies problems (P, NP, NP-complete) so you know when to settle for an approximation or a heuristic.

> **History**
>
> - 1936: Turing formalizes computation with Turing machines and proves the halting problem undecidable; Church gives the lambda calculus the same year.
> - 1971: Cook and Karp establish NP-completeness and the landscape of hard combinatorial problems.
> - 1982: The polynomial hierarchy is formalized, refining the P vs NP question into a ladder of classes.
> - 1994: The PCP theorem shows NP-hard problems have locally checkable proofs, sharpening the limits of approximation.

## Model of computation

A **Turing machine** is the standard precise meaning of "mechanical computation": it exists so that "computable" stops being a vague word and every claim about what algorithms can do becomes a theorem about one concrete device. It consists of an infinitely long **tape** divided into **cells**, each holding one **symbol** from a finite **tape alphabet** $`\Gamma` (which includes a special **blank symbol** $`\sqcup`); a **read/write head** sitting on one cell; and a finite set of **states** $`Q` containing a **start state** $`q_0`, an **accept state** $`q_{accept}`, and a **reject state** $`q_{reject}`. The input is a finite string $`w` over the **input alphabet** $`\Sigma \subseteq \Gamma` (so the blank $`\sqcup` is never part of the input), written on the first cells of the tape with the rest blank. At each **step** the machine reads the symbol under the head, consults its **transition function** $`\delta`, and follows the instruction it finds there: write a symbol of $`\Gamma` into the current cell, move the head one cell **left (L)** or **right (R)**, and enter a new state. Entering $`q_{accept}` or $`q_{reject}` **halts** the machine. Formally, $`M = (Q, \Sigma, \Gamma, \delta, q_0, q_{accept}, q_{reject})`. The **Church–Turing thesis** states that every function any physical computer can compute is computed by some Turing machine, which is why this one device is the universal yardstick for computability.

A Turing machine is **deterministic** when $`\delta` is a function: for each pair (state, read symbol) there is exactly one instruction. A **nondeterministic Turing machine (NTM)** lets $`\delta` return a *set* of instructions instead: the machine then follows all of them at once on separate **branches**, and **accepts** the input if at least one branch reaches $`q_{accept}`. Nondeterminism is useful because it models *guessing* a solution — each branch corresponds to one guess — and every NTM can be simulated by a deterministic machine, at the cost of exploring all branches.

A **language** is a set of strings over an alphabet, $`L \subseteq \Sigma^*` where $`\Sigma^*` is the set of all finite strings of $`\Sigma` symbols (including the empty string). An **instance** of a decision problem is one concrete input string $`x`; it is a **"yes" instance** when the correct answer is yes, that is, when $`x \in L`. A machine **decides** a language $`L` if it halts on *every* input, accepting exactly the yes-instances and rejecting the rest; $`L` is then **decidable**. Decidability is the property that matters because it is the formal version of "an algorithm exists for this problem" — and its negation is a proven impossibility, not just a missing idea.

The **halting problem** — given a machine $`M` and an input $`w`, decide whether $`M` halts on $`w` — is **undecidable** (Turing, 1936): no machine answers it correctly for all pairs $`(M, w)`. This is the canonical hard limit of computation: no program can predict whether an arbitrary program terminates, so no compiler can detect all infinite loops.

<details><summary>EXPLANATION</summary>

**Why formalize "computation" at all.** Before one can prove that something *cannot* be computed, "computable" needs a precise definition. A model of computation fixes, in mathematical terms, what counts as a mechanical procedure. The Turing machine is the standard choice because it is minimal yet universal: a finite set of states (the "program") plus an unbounded tape (the "memory") suffices to compute everything any real computer can. The objects are: the **tape** (one cell per symbol, blank $`\sqcup` beyond the input), the **head** (reads and writes one cell, moves one step L or R), the **states** $`Q` (including start, accept, reject), and the **transition function** $`\delta` (the program: for each state and read symbol, what to write, where to move, and which state to enter next).

**Walkthrough — a concrete machine.** Consider the language $`L = \{w \in \{0,1\}^* : w \text{ contains an even number of } 1\text{s}\}`. A two-state machine decides it: state $`q_{even}` means "the number of `1`s seen so far is even" (start state, also accepting), $`q_{odd}` means "odd". On reading a `1`, toggle the state; on reading a `0`, keep it; on the blank, accept from $`q_{even}` and reject from $`q_{odd}`. The full **transition function** $`\delta` — one row per (state, symbol read) pair, giving what to write, which way to move, and the next state — is:

<table>
<tr><th>State</th><th>Symbol read</th><th>Write</th><th>Move</th><th>New state</th></tr>
<tr><td><code>q_even</code> / <code>q_0</td><td><code>1</code></td><td><code>1</code></td><td>R</td><td><code>q_odd</code></td></tr>
<tr><td><code>q_even</code></td><td><code>0</code></td><td><code>0</code></td><td>R</td><td><code>q_even</code></td></tr>
<tr><td><code>q_even</code></td><td><code>⊔</code> (blank)</td><td>—</td><td>—</td><td>halt, <strong>accept</strong></td></tr>
<tr><td><code>q_odd</code></td><td><code>1</code></td><td><code>1</code></td><td>R</td><td><code>q_even</code></td></tr>
<tr><td><code>q_odd</code></td><td><code>0</code></td><td><code>0</code></td><td>R</td><td><code>q_odd</code></td></tr>
<tr><td><code>q_odd</code></td><td><code>⊔</code> (blank)</td><td>—</td><td>—</td><td>halt, <strong>reject</strong></td></tr>
</table>

Running it on the input `1010` (two `1`s → even → should accept), each step is:

<table>
<tr><th>Step</th><th>State</th><th>Symbol read</th><th>Action (write, move, new state)</th><th>Head on cell</th></tr>
<tr><td>1</td><td><code>q_even</code></td><td><code>1</code></td><td>write <code>1</code>, R, go to <code>q_odd</code></td><td>1</td></tr>
<tr><td>2</td><td><code>q_odd</code></td><td><code>0</code></td><td>write <code>0</code>, R, stay in <code>q_odd</code></td><td>2</td></tr>
<tr><td>3</td><td><code>q_odd</code></td><td><code>1</code></td><td>write <code>1</code>, R, go to <code>q_even</code></td><td>3</td></tr>
<tr><td>4</td><td><code>q_even</code></td><td><code>0</code></td><td>write <code>0</code>, R, stay in <code>q_even</code></td><td>4 (blank)</td></tr>
<tr><td>5</td><td><code>q_even</code></td><td><code>⊔</code></td><td>halt and <strong>accept</strong></td><td>—</td></tr>
</table>

The machine scans left to right exactly once: the head only moves right, and the only "memory" is the current state. Try the interactive simulator below — load an input, then step through the tape cell by cell and watch the head move and the state toggle between "even" and "odd":

<iframe src="./Computability-and-Complexity-Classes.simulation.html" title="Turing machine deciding even parity of 1s, step by step"></iframe>

> **Authoritative sources**
> - [A. Turing (1936), On Computable Numbers, with an Application to the Entscheidungsproblem](https://doi.org/10.1112/plms/s2-42.1.230)
> - [Computers and Intractability: A Guide to the Theory of NP-Completeness](https://en.wikipedia.org/wiki/Computers_and_Intractability)
> - [The Complexity of Theorem-Proving Procedures (Cook, 1971)](https://dl.acm.org/doi/10.1145/800157.805047)
> - [Reducibility Among Combinatorial Problems (Karp, 1972)](https://link.springer.com/chapter/10.1007/978-1-4684-2001-2_9)


**Deterministic vs nondeterministic.** In a **deterministic** machine, $`\delta(q, a)` is a single instruction, so every input has exactly one possible run. In a **nondeterministic** machine, $`\delta(q, a)` is a *set* of instructions: the run becomes a **tree of branches**, and the machine accepts if *any* branch accepts. *Walkthrough:* an NTM deciding "the input contains at least one `1`" needs only two rules from its start state $`q_0`: on any symbol, either (a) move right and stay in $`q_0` — the "keep scanning" guess — or (b) if the symbol is `1`, enter $`q_{accept}` — the "found it" guess. On input `010`, the branch that moves right twice and then reads `1` accepts; other branches may loop or reject, and that does not matter. Deterministic simulation of an NTM means exploring the whole branch tree, which is why nondeterminism is a convenient *modeling* tool (one line: "guess and check") even though real machines are deterministic.

**Languages, decidability, and the halting problem.** A decision problem is phrased as a **language** $`L \subseteq \Sigma^*`: each input string $`x` is an **instance**, and the answer to the problem is yes exactly when $`x \in L` (a **yes-instance**). A machine **decides** $`L` if it halts on every input and accepts exactly $`L`; then $`L` is **decidable**. The **halting problem** $`\text{HALT} = \{\langle M, w\rangle : M \text{ halts on } w\}` (where $`\langle M, w\rangle` denotes the pair written as one string) is the canonical undecidable language. *Walkthrough of the proof:* suppose a decider $`H` for HALT existed. Build a machine $`D` that, on input $`m`, runs $`H(m, m)` and does the *opposite*: loop if $`H` says "halts", halt if $`H` says "loops". Then $`D` run on its own code $`D` halts exactly when it does not — a contradiction, so $`H` cannot exist. The same self-reference powers all undecidability proofs: because a machine's description is itself a string, a machine can be given its own code as input.

Key consequences:
- No program can perfectly predict whether another program will terminate.
- No compiler can detect all infinite loops.
- There are uncountably many languages but only countably many machines, so "almost all" languages are undecidable.

For the other side of the decidability border — semi-decidable (recursively enumerable) sets and the arithmetical hierarchy ranking the undecidable — see [Computability and decidability](../../../Mathematics/Logic-and-foundations/Computability-and-decidability.md).

**Example problem.** Sketch a Turing machine that decides $`L = \{0^n 1^n : n \ge 0\}` (strings of $`n` zeros followed by $`n` ones), and argue it halts on every input.

<details><summary>Solution</summary>

Use the tape as a counter. Sweep right, and for each `0` found, mark it (say, write `X`), then sweep right past the remaining `0`s to the first `1`, mark it `Y`, and return left to the first unmarked `0`. Repeat. If, when looking for a `1` to match, we instead hit a blank, reject; if, after marking, no unmarked `0` remains, scan right and accept iff only `Y`s and then blanks remain (no unmarked `1` left over). Every sweep is finite and each pass permanently marks one `0` and one `1`, so after at most $`n` passes the machine halts — it decides $`L`. (This language is decidable but *not* regular: no finite-state machine can count the two blocks against each other, which is exactly what the reusable tape buys.)
</details>

</details>

## Computational complexity

**Big-O notation** condenses a cost function $`f(n)` (where $`n` is the input length) to its growth rate: $`f(n) = O(g(n))` means there are constants $`c > 0` and $`n_0` such that $`f(n) \le c \cdot g(n)` for all $`n \ge n_0`. It is useful because it compares algorithms independently of machine speed and programming language — only the growth with $`n` matters. "Polynomial time" means $`O(n^k)` for some constant $`k`.

**Amortized analysis** charges each operation the *average* cost over a worst-case sequence of operations, even when a single operation is expensive: appending to a vector (dynamic array) that doubles its capacity when full costs $`O(n)` on a rare step but $`O(1)` amortized, because the total work of $`n` appends is $`O(n)` (see [Lists](../Search-and-Data-Structures/Lists.md)). It is useful because the worst-case cost of one operation often misrepresents the real cost of using a data structure over time.

The **time complexity** of a machine on input $`x` is its number of steps until halting, as a function of $`n = |x|`. A **complexity class** groups languages by the resources a machine needs to decide them. A language is in **P** if some deterministic Turing machine decides it in polynomial time, $`O(n^k)`. P is the class of problems considered "efficiently solvable in practice".

A language is in **NP** if every yes-instance $`x` has a **certificate** — a string $`c` of length polynomial in $`|x|`, such as a proposed solution — that a deterministic **verifier** machine can check in polynomial time: $`x \in L` iff there exists $`c` with $`V(x, c)` accepting. Equivalently, NP is the class of languages a nondeterministic Turing machine decides in polynomial time (the certificate is exactly the guess). NP is useful because it captures "solutions are easy to *check*", which holds for a vast range of practical problems even when finding the solution seems hard.

A language $`A` **polynomial-time reduces** to $`B` (written $`A \le_p B`) if a polynomial-time computable function $`f` maps every instance with $`x \in A \iff f(x) \in B`. A language is **NP-hard** if every language in NP reduces to it; it is **NP-complete** if it is both NP-hard and in NP. NP-completeness is useful because of the Cook–Levin theorem: SAT is NP-complete, so if *any* NP-complete problem has a polynomial-time algorithm then P = NP — and conversely, if P ≠ NP, none does. In practice it tells you when to stop searching for an exact efficient algorithm and switch to heuristics or approximations.

<details><summary>EXPLANATION</summary>

**Measuring cost with big-O.** The input length $`n` is the number of symbols. Big-O keeps only the dominant term: an algorithm that inspects each of $`n` input symbols twice and then does $`n^2` comparisons is $`O(n^2)`, not $`O(2n + n^2)`. *Walkthrough:* deciding even parity of `1`s (the walkthrough of the previous section) takes exactly $`n` steps — $`O(n)`, "linear"; trying all $`2^n` subsets of a set takes $`O(2^n)`, "exponential". The practical gap: at $`n = 100`, $`n^2 = 10^4` steps are instant, while $`2^n \approx 10^{30}` steps would outlast the age of the universe.

**Amortized analysis.** A vector starts with capacity 1; each append writes one element, and when full it allocates double the capacity and copies everything. Appends number 1, 2, 3, … cost 1, 1, 2, 1, 4, 1, 1, 2, … — the expensive appends are rare and geometrically spaced, so the total cost of $`n` appends is $`1 + 2 + 4 + \cdots + 2^{\lceil \log_2 n \rceil} < 2n`, i.e. $`O(1)` amortized per append, even though one append costs $`O(n)`. The lesson: for data structures, the right question is the total cost of a *sequence* of operations, not the worst cost of a single one.

**Time complexity and P.** The time complexity of a machine on input $`x` is the number of steps until it halts, viewed as a function of $`n = |x|`. **P** collects every language decidable by a *deterministic* machine in $`O(n^k)` steps. *Walkthrough:* even parity is in P — the machine from the walkthrough of the previous section halts in exactly $`n` steps on inputs of length $`n`. Most problems you solve routinely (sorting in $`O(n \log n)`, shortest paths in $`O(n^2)` or better — see [Graphs](../Search-and-Data-Structures/Graphs.md)) are in P.

**NP: easy to check, maybe hard to find.** An **instance** is one concrete input $`x` to a decision problem. **NP** is the class of languages where every yes-instance has a short proof: a **certificate** $`c` (polynomially long in $`|x|`) and a deterministic **verifier** $`V` that, in polynomial time, checks $`c` and accepts exactly when $`c` really proves $`x \in L`. *Walkthrough — 3-SAT:* an instance is a Boolean formula in conjunctive normal form; the certificate is an assignment of the variables, and the verifier just evaluates the formula under that assignment — polynomial time. *Equivalent view:* a nondeterministic machine decides an NP language in polynomial time by *guessing* the certificate on one branch (the NTM of the previous section) and verifying it. CLIQUE (does the graph have a clique of size $`k`?) is in NP: the certificate is the $`k` vertices, and the verifier checks all $`\binom{k}{2}` pairs are edges.

**Reductions, NP-hard, NP-complete.** A **reduction** $`A \le_p B` is a polynomial-time computable map $`f` with $`x \in A \iff f(x) \in B` — it converts instances of $`A` into equivalent instances of $`B` without changing the answer. If $`A \le_p B` and $`B \in \text{P}`, then $`A \in \text{P}`; so a reduction transfers both algorithms and hardness. A language is **NP-hard** if every NP language reduces to it (it is at least as hard as everything in NP; it need not be in NP itself); **NP-complete** means NP-hard *and* in NP. The **Cook–Levin theorem** (Cook 1971, Levin 1973) proves SAT NP-complete: every NP computation can be encoded as a satisfiable formula. Karp (1972) then showed 21 everyday problems NP-complete — 3-SAT, CLIQUE, VERTEX-COVER, HAMILTONIAN CYCLE, PARTITION, …

*Worked example — 3-SAT $`\le_p` CLIQUE.* Take $`\varphi = (x_1 \lor \lnot x_2 \lor x_3) \land (\lnot x_1 \lor x_2 \lor x_3)`. Build a graph with one vertex per literal per clause, and connect two vertices iff they come from *different* clauses and are not complementary:

<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:500px; width:100%;">
  <!-- Edges (drawn first, behind vertices) -->
  <line x1="120" y1="80" x2="250" y2="220" stroke="#50a0e0" stroke-width="2"/>
  <line x1="120" y1="80" x2="380" y2="220" stroke="#50a0e0" stroke-width="2"/>
  <line x1="250" y1="80" x2="120" y2="220" stroke="#50a0e0" stroke-width="2"/>
  <line x1="250" y1="80" x2="380" y2="220" stroke="#50a0e0" stroke-width="2"/>
  <line x1="380" y1="80" x2="120" y2="220" stroke="#50a0e0" stroke-width="2"/>
  <line x1="380" y1="80" x2="250" y2="220" stroke="#50a0e0" stroke-width="2"/>
  <line x1="380" y1="80" x2="380" y2="220" stroke="#50a0e0" stroke-width="2"/>
  <!-- Vertices -->
  <circle cx="120" cy="80" r="22" fill="#1a4060" stroke="#50c080" stroke-width="2"/>
  <text x="120" y="85" text-anchor="middle" font-size="11" fill="#fff">x₁</text>
  <circle cx="250" cy="80" r="22" fill="#1a4060" stroke="#50c080" stroke-width="2"/>
  <text x="250" y="85" text-anchor="middle" font-size="11" fill="#fff">¬x₂</text>
  <circle cx="380" cy="80" r="22" fill="#1a4060" stroke="#50c080" stroke-width="2"/>
  <text x="380" y="85" text-anchor="middle" font-size="11" fill="#fff">x₃</text>
  <circle cx="120" cy="220" r="22" fill="#1a4060" stroke="#e07050" stroke-width="2"/>
  <text x="120" y="225" text-anchor="middle" font-size="11" fill="#fff">¬x₁</text>
  <circle cx="250" cy="220" r="22" fill="#1a4060" stroke="#e07050" stroke-width="2"/>
  <text x="250" y="225" text-anchor="middle" font-size="11" fill="#fff">x₂</text>
  <circle cx="380" cy="220" r="22" fill="#1a4060" stroke="#e07050" stroke-width="2"/>
  <text x="380" y="225" text-anchor="middle" font-size="11" fill="#fff">x₃</text>
  <!-- Labels -->
  <text x="250" y="30" text-anchor="middle" font-size="12" fill="#50c080" font-weight="bold">Clause 1: (x₁ ∨ ¬x₂ ∨ x₃)</text>
  <text x="250" y="270" text-anchor="middle" font-size="12" fill="#e07050" font-weight="bold">Clause 2: (¬x₁ ∨ x₂ ∨ x₃)</text>
  <text x="250" y="155" text-anchor="middle" font-size="10" fill="#888">No edges within a clause; no edge between complementary literals</text>
  <text x="50" y="155" font-size="10" fill="#e0c050">Clique {x₁, x₃}:</text>
  <text x="50" y="168" font-size="10" fill="#e0c050">x₁=T, x₃=T satisfies φ</text>
</svg>

The graph has a clique of size 2 (= number of clauses) iff $`\varphi` is satisfiable: a clique picks one true literal per clause, and the edges guarantee the picks are consistent (no variable set both ways). Here $`\{x_1, x_3\}` works, giving the assignment $`x_1 = T, x_3 = T`. The construction is polynomial-time, so 3-SAT $`\le_p` CLIQUE.

**The landscape around P and NP.** The diagram below shows the proven inclusions; dashed borders mark open questions.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="max-width:700px; width:100%;">
  <!-- PH outer box -->
  <rect x="20" y="20" width="660" height="320" rx="12" fill="none" stroke="#c0a0e0" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="40" y="48" font-size="14" fill="#c0a0e0" font-weight="bold">PH (polynomial hierarchy)</text>
  <!-- NP box -->
  <rect x="60" y="70" width="330" height="250" rx="8" fill="none" stroke="#50a0e0" stroke-width="2"/>
  <text x="80" y="95" font-size="13" fill="#50a0e0" font-weight="bold">NP</text>
  <!-- P box -->
  <rect x="100" y="110" width="180" height="180" rx="6" fill="none" stroke="#50c080" stroke-width="2"/>
  <text x="120" y="135" font-size="13" fill="#50c080" font-weight="bold">P</text>
  <!-- co-NP box overlapping NP (unknown whether equal) -->
  <rect x="230" y="150" width="140" height="120" rx="6" fill="none" stroke="#e0c050" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="245" y="175" font-size="11" fill="#e0c050">co-NP</text>
  <text x="245" y="190" font-size="9" fill="#999">(NP = co-NP? open)</text>
  <!-- BPP overlapping P (BPP ⊆ P open) -->
  <rect x="110" y="220" width="120" height="60" rx="6" fill="none" stroke="#e0a050" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="125" y="245" font-size="11" fill="#e0a050">BPP</text>
  <text x="125" y="258" font-size="9" fill="#999">(BPP ⊆ P? open)</text>
  <!-- BQP inside PH, outside NP (dashed) -->
  <rect x="440" y="110" width="200" height="130" rx="6" fill="none" stroke="#e070a0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="455" y="135" font-size="11" fill="#e070a0">BQP (quantum)</text>
  <text x="455" y="150" font-size="9" fill="#999">BPP ⊆ BQP proven;</text>
  <text x="455" y="162" font-size="9" fill="#999">BQP vs NP and BQP ⊆ P open</text>
  <!-- Inclusions -->
  <text x="410" y="300" font-size="10" fill="#888">P ⊆ NP ⊆ PH, co-NP ⊆ PH (all proven)</text>
  <text x="60" y="335" font-size="10" fill="#666">All of these classes sit inside polynomial space — see the Space complexity section below.</text>
</svg>

- **co-NP**: languages whose *no*-instances have polynomially checkable certificates — the complements of NP languages. Whether NP = co-NP is open.
- **PH (polynomial hierarchy)**: the ladder above NP built from alternating quantifiers (or oracle machines); P = NP would collapse it to P.
- **BPP**: languages decidable by a *probabilistic* machine in polynomial time with error probability < 1/3 on every input. The 1/3 is arbitrary — **amplification**: run the machine $`O(\log(1/\varepsilon))` times and take the majority vote, reducing the error to any $`\varepsilon > 0` in still-polynomial time. Whether randomness helps (BPP vs P) is open; most researchers conjecture BPP = P.
- **BQP**: the quantum analogue of BPP, decided by a quantum circuit of polynomial depth (see [Quantum Mechanics](../../../Physics/Quantum-Mechanics/Readme.md)). BPP ⊆ BQP is proven; whether BQP ⊆ P or BQP contains NP is open.
- **PCP theorem** (Arora et al., 1998): every NP language has a *probabilistically checkable proof* the verifier reads only $`O(1)` bits of, using $`O(\log n)` random bits. This is the foundation of hardness of approximation: MAX-3SAT cannot be approximated within $`7/8 + \varepsilon` unless P = NP (Håstad, 1997).

**Open problems.** P vs NP (the Clay Millennium Prize question), NP vs co-NP, BPP vs P, BQP vs NP — for each pair, one inclusion is a theorem and the reverse is open. Proving P = NP would collapse the whole hierarchy PH to P.

> **Authoritative sources**
> - [The Complexity of Theorem-Proving Procedures (Cook, 1971)](https://dl.acm.org/doi/10.1145/800157.805047)
> - [Reducibility Among Combinatorial Problems (Karp, 1972)](https://link.springer.com/chapter/10.1007/978-1-4684-2001-2_9)
> - [PCP theorem paper (Arora et al., 1998)](https://eccc.weizmann.ac.il/report/1998/008/)
> - [The hardness of approximation (Håstad, 1997)](https://dl.acm.org/doi/10.1145/258533.258536)

**Example problem.** Show that CLIQUE $`= \{\langle G, k\rangle : G \text{ has a clique of size } k\}` is in NP, by giving a certificate and a verifier.

<details><summary>Solution</summary>

The **certificate** is a set $`S` of $`k` vertices of $`G`, encoded as a string of $`k \cdot \lceil \log_2 |V| \rceil` bits — polynomial in the input size. The **verifier** checks, for every pair $`u, v \in S`, that $`\{u, v\}` is an edge of $`G` (at most $`\binom{k}{2} = O(k^2)` checks, each polynomial-time). If all checks pass, $`S` is a clique of size $`k` and the verifier accepts; and $`\langle G, k\rangle` is a yes-instance exactly when such an $`S` exists. Hence CLIQUE ∈ NP. The same guess-then-check pattern (nondeterministically pick $`k` vertices, then verify) shows the equivalence with polynomial-time NTMs.
</details>

</details>

## Space complexity

The **space complexity** of a machine on input $`x` is the number of **tape cells** it ever visits, as a function of $`n = |x|`. A language is in **SPACE($`s(n)`)** if a deterministic Turing machine decides it using at most $`s(n)` cells on inputs of length $`n` (and never more, even on rejecting runs); **NSPACE($`s(n)`)** is the nondeterministic analogue. Space is a different resource from time because it is *reusable*: a machine can overwrite the same cells again and again. The canonical classes are:

- **L**: deterministic $`O(\log n)` space — only a counter or two fits in that many bits (e.g. deciding whether a number is even).
- **NL**: nondeterministic $`O(\log n)` space. Example: **ST-CONNECTIVITY** ("is $`t` reachable from $`s` in this graph?") — a nondeterministic machine guesses the path vertex by vertex, storing one vertex index ($`O(\log n)` bits) at a time. The **Immerman–Szelepcsényi theorem** (1987) shows $`\text{NL} = \text{co}\text{-NL}`: nondeterministic log-space can also certify *un*reachability.
- **PSPACE**: deterministic polynomial space, $`\bigcup_k \text{SPACE}(n^k)`. It contains NP and PH, because a polynomial-space machine can enumerate all certificates one at a time, reusing the same tape region. Canonical complete problem: **TQBF** (truth of quantified Boolean formulas).
- **EXPSPACE**: exponential space; by the space hierarchy theorem it strictly contains PSPACE.

Space complexity is useful because it pins down the real memory cost of a problem, and because space bounds time: a machine using $`s(n)` cells has at most $`|Q| \cdot s(n) \cdot |\Gamma|^{s(n)} = 2^{O(s(n))}` distinct **configurations** (state + head position + tape contents), so a decider halts within that many steps — hence $`\text{PSPACE} \subseteq \text{EXPTIME}`, and the space hierarchy theorem gives *unconditional* separations such as $`\text{L} \subsetneq \text{PSPACE}`.

<details><summary>EXPLANATION</summary>

**Why space is a different resource than time.** Time is consumed: a step can never be reused. Space is rented: the same cell can be overwritten arbitrarily often, so a machine can do exponentially much *work* in polynomial *space*. The bridge between the two is counting: a **configuration** of a machine is the triple (current state, head position, tape contents). With $`s(n)` visited cells, a fixed alphabet $`\Gamma`, and $`|Q|` states, there are at most $`|Q| \cdot s(n) \cdot |\Gamma|^{s(n)} = 2^{O(s(n))}` configurations. A decider halts on every input, and a halting machine never repeats a configuration (otherwise it would loop forever), so it halts within $`2^{O(s(n))}` steps. *Walkthrough:* $`s(n) = n` gives at most $`2^{O(n)}` steps — so PSPACE ⊆ EXPTIME, while P (polynomial *time*) may be much smaller. This is also why the quizz-level fact "L ⊆ P" holds: $`O(\log n)` space means at most polynomially many configurations, hence polynomially many steps.

**L and NL.** **L** (log-space) captures problems needing only a few counters: each counter up to $`n` fits in $`O(\log n)` bits. **NL** adds nondeterministic guessing within the same budget. *Walkthrough — ST-CONNECTIVITY ∈ NL:* the machine stores only the current vertex $`v` (initialized to $`s`), using $`\lceil \log_2 |V| \rceil` bits. At each step it nondeterministically guesses a neighbor $`u` of $`v` (scanning the adjacency list with an $`O(\log n)`-bit counter), overwrites $`v` with $`u`, and repeats for at most $`|V|` steps (another $`O(\log n)`-bit counter). It accepts if $`v = t` ever occurs. Every accepting branch traces a genuine path from $`s` to $`t`, and if a path exists some branch guesses it — so the language is decided in $`O(\log n)` nondeterministic space. The **Immerman–Szelepcsényi theorem** shows the surprising converse direction too: NL = co-NL, so a nondeterministic log-space machine can also *certify* that $`t` is unreachable. **Savitch's theorem** further shows $`\text{NSPACE}(s) \subseteq \text{SPACE}(s^2)`, so ST-CONNECTIVITY is even in deterministic $`O(\log^2 n)` space.

**PSPACE and TQBF.** A polynomial-space machine can decide every NP language by enumerating all possible certificates one at a time on the same tape region and running the verifier on each — hence NP ⊆ PSPACE (and similarly PH ⊆ PSPACE). The canonical **PSPACE-complete** problem is **TQBF**: given a quantified Boolean formula $`\forall x_1 \exists x_2 \cdots \psi(x_1, \dots, x_n)`, decide its truth by evaluating it recursively — each quantifier level recurses on the remaining variables, and the recursion depth is $`n` with $`O(n)` bits per level, i.e. polynomial space. No polynomial-time algorithm for TQBF is known, and if one existed then P = PSPACE.

The space classes nest as follows (all inclusions proven; the strictness of L ⊊ PSPACE and PSPACE ⊊ EXPSPACE follows from the space hierarchy theorem above):

<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" style="max-width:640px; width:100%;">
  <rect x="20" y="20" width="600" height="260" rx="12" fill="none" stroke="#e070a0" stroke-width="2"/>
  <text x="40" y="48" font-size="14" fill="#e070a0" font-weight="bold">EXPSPACE (exponential space)</text>
  <rect x="60" y="70" width="520" height="190" rx="10" fill="none" stroke="#e07050" stroke-width="2"/>
  <text x="80" y="95" font-size="13" fill="#e07050" font-weight="bold">PSPACE (polynomial space) — contains NP, PH; TQBF-complete</text>
  <rect x="100" y="115" width="300" height="120" rx="8" fill="none" stroke="#50a0e0" stroke-width="2"/>
  <text x="120" y="140" font-size="13" fill="#50a0e0" font-weight="bold">NL (nondeterministic log-space)</text>
  <text x="120" y="158" font-size="10" fill="#666">ST-CONNECTIVITY complete; NL = co-NL</text>
  <rect x="130" y="170" width="150" height="50" rx="6" fill="none" stroke="#50c080" stroke-width="2"/>
  <text x="145" y="195" font-size="13" fill="#50c080" font-weight="bold">L (log-space)</text>
  <text x="420" y="200" font-size="10" fill="#888">L ⊆ NL ⊆ PSPACE ⊆ EXPSPACE (proven);</text>
  <text x="420" y="215" font-size="10" fill="#888">L ⊊ PSPACE and PSPACE ⊊ EXPSPACE (proven strict)</text>
</svg>

**The space hierarchy theorem.** For space-constructible functions with $`s_2(n) \gg s_1(n)`, $`\text{SPACE}(s_1(n)) \subsetneq \text{SPACE}(s_2(n))`. The proof is a diagonalization: enumerate all $`s_1(n)`-space machines, and on input $`x` simulate machine $`x` on input $`x` while doing the opposite — the extra space pays for the bookkeeping. Unlike the time hierarchy, this yields *unconditional* separations: L ⊊ PSPACE and PSPACE ⊊ EXPSPACE are theorems, not conditional on open conjectures.

> **Authoritative sources**
> - [Immerman (1988), Descriptive Complexity — two papers incl. NL = co-NL](https://doi.org/10.1016/0890-5401(88)90046-0)
> - [Savitch (1970), Relationships between nondeterministic and deterministic tape complexities](https://doi.org/10.1145/321376.321381)

**Example problem.** Show that ST-CONNECTIVITY is in NL.

<details><summary>Solution</summary>

As above: a nondeterministic machine stores only the current vertex $`v` (initialized to $`s`), using $`\lceil \log_2 |V| \rceil` bits. At each step it nondeterministically guesses a neighbor $`u` of $`v`, overwrites $`v` with $`u`, and repeats for at most $`|V|` steps (an $`O(\log n)`-bit counter). It accepts if $`v = t` ever occurs. Every accepting branch traces a genuine path from $`s` to $`t`, and if a path exists some branch guesses it — so the language is decided in $`O(\log n)` nondeterministic space, i.e. ST-CONNECTIVITY ∈ NL. (By Savitch's theorem it is even in DSPACE($`\log^2 n`).)
</details>

</details>

## Latency complexity

A Boolean **circuit** is a directed acyclic graph (DAG) of **gates** — AND, OR, NOT — whose leaves are the $`n` input bits; a gate's **fan-in** is its number of inputs. The circuit's **size** is its gate count and its **depth** is its longest path. Depth measures **latency**: if each gate takes one unit of time, all gates in one layer can run in parallel, so a depth-$`d` circuit finishes in $`d` parallel steps. Latency complexity is useful because it captures what *parallelism* can buy: it asks not "can this be computed?" but "how fast, with arbitrarily many processors?"

- **NC$`^k`**: languages decidable by polynomial-size, $`O(\log^k n)`-depth circuits of bounded fan-in. **NC** $`= \bigcup_k \text{NC}^k` is the class of problems with fast (polylogarithmic-depth) parallel algorithms on polynomially many processors.
- **AC$`^0`**: constant-depth circuits with *unbounded* fan-in AND/OR gates. The **parity function is not in AC$`^0`** (Furst–Saxe–Sipser 1984; Håstad 1987) — the first major unconditional lower bound.
- The known chain is $`\text{NC}^1 \subseteq \text{L} \subseteq \text{NL} \subseteq \text{NC}^2 \subseteq \text{P}`. Whether **NC = P** — whether every polynomial-time problem is efficiently parallelizable — is the parallel analogue of P vs NP.

<details><summary>EXPLANATION</summary>

**Circuits as a model of parallel hardware.** Each gate computes its function in one time unit; gates whose inputs are ready can all fire in the same step. So the *depth* of the circuit is the number of sequential rounds — the latency — while the *size* bounds the number of processors. *Walkthrough:* a chain of $`n` NOT gates has depth $`n` (fully sequential), but the AND of $`n` bits can be a balanced binary tree of AND gates — depth $`\lceil \log_2 n \rceil` — because each layer combines disjoint pairs independently.

Try the interactive explorer below: build a circuit from AND/OR/NOT gates and watch its depth and size, which class (AC⁰, NC¹, NC, P, …) it falls into, and where that class sits in the hierarchy:

<iframe src="./Resource-Hierarchy-and-Parallelism.simulation.html" title="Build Boolean circuits and classify them by depth into NC and AC0 classes"></iframe>

**NC: what polylog depth buys.** **NC$`^1`** (depth $`O(\log n)`, polynomial size) already contains addition of two $`n`-bit numbers (carry-lookahead: each output bit depends on a tree of $`O(\log n)` inputs) and Boolean formula evaluation. **NC$`^2`** (depth $`O(\log^2 n)`) contains matrix multiplication, determinant, and graph reachability. Problems believed *not* to be in NC — linear programming and circuit value evaluation — are **P-complete** under log-space reductions: if any one of them were in NC, then NC = P.

**AC$`^0` and the parity lower bound.** Allowing unbounded fan-in gates at constant depth (AC$`^0`) still cannot compute parity: the Furst–Saxe–Sipser / Håstad switching-lemma argument shows any constant-depth unbounded-fan-in circuit for parity needs exponential size. This was the first unconditional lower bound separating circuit classes, and it launched circuit complexity as a field.

**Example problem.** Show that computing the AND of $`n` input bits is in NC$`^1`.

<details><summary>Solution</summary>

Build a balanced binary tree of 2-input AND gates: $`n - 1` gates, depth $`\lceil \log_2 n \rceil`. Layer $`i` computes the AND of disjoint blocks of $`2^i` input bits; all gates in a layer are independent and evaluate in parallel. Size is $`O(n)` (polynomial) and depth is $`O(\log n)`, so the language $`\{w \in \{0,1\}^* : w = 1^n\}` is in NC$`^1`. The same tree pattern with OR gates, or with a comparator network, gives parallel OR, MAX, and sorting networks — the fundamental templates of parallel algorithms.
</details>

</details>

## Quizz

<details><summary>Quizz</summary>

**Problem.** Show that SAT $`\le_p` 3-SAT: given a CNF formula $`\varphi` whose clauses may have any length, build in polynomial time a 3-CNF formula $`\varphi'` that is satisfiable exactly when $`\varphi` is.

<details><summary>Solution</summary>

**Construction.** Process each clause $`C = (\ell_1 \lor \ell_2 \lor \cdots \lor \ell_k)` independently, using fresh variables $`z_1, \dots, z_{k-3}` that appear nowhere else:

- $`k = 1`: replace $`\ell_1` by $`(\ell_1 \lor z) \land (\ell_1 \lor \lnot z)` for a fresh $`z` — the two clauses together force $`\ell_1` to be true.
- $`k = 2`: keep $`(\ell_1 \lor \ell_2)` as is.
- $`k \ge 3`: replace $`C` by the chain
  $`(\ell_1 \lor \ell_2 \lor z_1) \land (\lnot z_1 \lor \ell_3 \lor z_2) \land \cdots \land (\lnot z_{k-3} \lor \ell_{k-1} \lor \ell_k)`.

**Correctness.** If an assignment satisfies $`C`, some $`\ell_j` is true; set the $`z_i` before $`j` to make each earlier clause true via its $`\lnot z` literal, and the clause containing $`\ell_j` is satisfied by $`\ell_j` itself. Conversely, restrict any satisfying assignment of the chain to the original variables: if all $`\ell_j` were false, the first clause forces $`z_1` true, the second forces $`z_2` true, …, and the last clause $`(\lnot z_{k-3} \lor \ell_{k-1} \lor \ell_k)` would be false — a contradiction. So $`\varphi'` is satisfiable iff $`\varphi` is.

**Polynomial time.** A clause of length $`k` becomes $`O(k)` clauses of size ≤ 3, so $`|\varphi'| = O(|\varphi|)` and the construction is linear time.

Together with the worked example in the Computational complexity section (3-SAT $`\le_p` CLIQUE), this shows SAT, 3-SAT, and CLIQUE are all NP-complete — as hard as each other.
</details>

</details>
