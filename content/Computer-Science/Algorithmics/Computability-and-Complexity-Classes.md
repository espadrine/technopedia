# Computability and Complexity Classes

Computability and the fundamental time-based complexity classes (P, NP, and their relatives) answer two questions: *can* a problem be solved by a mechanical procedure at all, and if so, *how fast*? This material is relevant whenever you must establish whether a problem is tractable before committing engineering effort, or when you need to prove that no polynomial-time algorithm exists for a given decision problem.

> **Authoritative sources**
> - [On Computable Numbers, with an Application to the Entscheidungsproblem](https://www.turingarchive.ac.uk/radiolab/OnComputableNumbers.pdf)
> - [Computers and Intractability: A Guide to the Theory of NP-Completeness](https://en.wikipedia.org/wiki/Computers_and_Intractability)
> - [The Complexity of Theorem-Proving Procedures (Cook, 1971)](https://dl.acm.org/doi/10.1145/800157.805047)
> - [Reducibility Among Combinatorial Problems (Karp, 1972)](https://link.springer.com/chapter/10.1007/978-1-4684-2001-2_9)

## Turing machines

A Turing machine $`M = (Q, \Sigma, \Gamma, \delta, q_0, q_{accept}, q_{reject})` is a 7-tuple where $`Q` is a finite set of states, $`\Sigma` is the input alphabet, $`\Gamma` is the tape alphabet ($`\Sigma \subseteq \Gamma`), $`\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}` is the transition function, and $`q_0, q_{accept}, q_{reject} \in Q` are special states.

A language $`L \subseteq \Sigma^*` is **decidable** (recursive) if some Turing machine halts on every input and accepts exactly the strings in $`L`.

<details><summary>Details</summary>

The Church–Turing thesis asserts that any effectively computable function can be computed by a Turing machine. This makes the Turing machine the universal model of computation: RAM machines, lambda calculus, and recursive functions all compute exactly the same class of functions.

The **halting problem** asks: given a description of a Turing machine $`M` and input $`w`, does $`M(w)` halt? Turing proved this is undecidable by diagonalization: if a decider $`H` existed, one could construct a machine $`D` that does the opposite of $`H(D, D)`, a contradiction.

Key consequences:
- No program can perfectly predict whether another program will terminate.
- No compiler can detect all infinite loops.
- The set of undecidable languages is uncountable (there are countably many machines but uncountably many languages).

Try the interactive simulator below: it runs a two-state Turing machine that decides whether the number of `1`s on the tape is even. Load it, then step through the tape cell by cell and watch the head move and the state toggle between "even" and "odd".

<iframe src="./Computability-and-Complexity-Classes.simulation.html" title="Turing machine deciding even parity of 1s, step by step" style="width:100%; height:340px; border:1px solid #ccc; border-radius:6px;"></iframe>

**Example problem**: design a Turing machine deciding $`L = \{w \in \{0,1\}^* : w \text{ contains an even number of } 1\text{s}\}`.

<details><summary>Solution</summary>

Use two states: $`q_{even}` (start state, also accepting) and $`q_{odd}`. The transition function is:
- $`\delta(q_{even}, 1) = (q_{odd}, 1, R)` and $`\delta(q_{odd}, 1) = (q_{even}, 1, R)` — each `1` toggles the parity.
- $`\delta(q_{even}, 0) = (q_{even}, 0, R)` and $`\delta(q_{odd}, 0) = (q_{odd}, 0, R)` — `0`s leave the parity unchanged.
- On the blank symbol $`\sqcup`: $`\delta(q_{even}, \sqcup) = q_{accept}` and $`\delta(q_{odd}, \sqcup) = q_{reject}`.

The machine scans left to right once, so it runs in $`O(n)` time and uses $`O(n)` tape cells: parity is a regular, linear-time-decidable property. The same "finite memory swept across the input" pattern underlies many deciders; richer languages (like balanced parentheses) need the full tape as a counter or stack instead.

</details>

</details>

Once we have a formal model of computation, the natural next question is: *how much time or space does the machine need?* This question gives rise to the complexity classes below.

## Complexity classes

A language $`L` is in **P** if a deterministic Turing machine decides it in $`O(n^k)` time for some constant $`k`. A language is in **NP** if a nondeterministic Turing machine decides it in polynomial time, equivalently if every "yes" instance has a polynomial-length certificate verifiable in polynomial time.

**BPP** (Bounded-error Probabilistic Polynomial time): a probabilistic Turing machine decides in polynomial time with error probability $`< 1/3` on every input. The constant $`1/3` is arbitrary: by running the machine $`O(\log(1/\varepsilon))` times and taking a majority vote, the error can be reduced to any desired $`\varepsilon > 0` while staying polynomial time (this is **amplification**).

**BQP** (Bounded-error Quantum Polynomial time): the quantum analogue of BPP, decided by a quantum circuit of polynomial depth. $`\text{BPP} \subseteq \text{BQP} \subseteq \text{PSPACE}` (both inclusions proven; Bernstein–Vazirani 1997 for $`\text{BQP} \subseteq \text{PSPACE}`); whether $`\text{BQP} \subseteq \text{P}` is open. See [Quantum Mechanics](../../Physics/Quantum-Mechanics/Readme.md).

**PSPACE**: languages decidable by a deterministic Turing machine using $`O(n^k)` tape space for some constant $`k`, regardless of time. Since a polynomial-space machine has only polynomially many configurations, it can be simulated in exponential time, which gives $`\text{P} \subseteq \text{NP} \subseteq \text{PH} \subseteq \text{PSPACE}`.

**co-NP**: the class of complements of NP languages — languages whose "no" instances have polynomially checkable certificates. It is unknown whether $`\text{NP} = \text{co}\text{-NP}`; if they differ, no NP-complete problem can have a short proof for its "no" instances.

**Polynomial Hierarchy (PH)**: generalizes NP and co-NP via oracle machines (or alternating TMs). $`\text{NP} \subseteq \text{PH} \subseteq \text{PSPACE}`. PH is the natural next step after P and NP and is relevant to inapproximability results.

See [Space and Parallel Complexity](./Resource-Hierarchy-and-Parallelism.md) for space complexity classes (L, NL, PSPACE, EXPSPACE), hierarchy theorems, and circuit complexity (NC, AC⁰) in detail.

<details><summary>Details</summary>

### Hierarchy of complexity classes

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" style="max-width:700px; width:100%;">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#888"/>
    </marker>
  </defs>
  <!-- PSPACE outer box -->
  <rect x="20" y="20" width="660" height="380" rx="12" fill="none" stroke="#e07050" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="40" y="48" font-size="14" fill="#e07050" font-weight="bold">PSPACE</text>
  <!-- PH box -->
  <rect x="60" y="70" width="580" height="310" rx="10" fill="none" stroke="#c0a0e0" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="80" y="95" font-size="13" fill="#c0a0e0" font-weight="bold">PH (Polynomial Hierarchy)</text>
  <!-- NP box -->
  <rect x="100" y="110" width="300" height="240" rx="8" fill="none" stroke="#50a0e0" stroke-width="2"/>
  <text x="120" y="135" font-size="13" fill="#50a0e0" font-weight="bold">NP</text>
  <!-- P box -->
  <rect x="140" y="150" width="160" height="170" rx="6" fill="none" stroke="#50c080" stroke-width="2"/>
  <text x="160" y="175" font-size="13" fill="#50c080" font-weight="bold">P</text>
  <!-- BPP inside P (dashed, overlapping) -->
  <rect x="155" y="190" width="130" height="110" rx="6" fill="none" stroke="#e0c050" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="170" y="215" font-size="11" fill="#e0c050">BPP</text>
  <text x="170" y="230" font-size="9" fill="#999">(BPP ⊆ PSPACE proven; BPP ⊆ P open)</text>
  <!-- BQP outside P but inside PSPACE -->
  <rect x="430" y="150" width="130" height="110" rx="6" fill="none" stroke="#e070a0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="450" y="175" font-size="11" fill="#e070a0">BQP</text>
  <text x="450" y="190" font-size="9" fill="#999">(open: BQP ⊆ P?)</text>
  <!-- NC inside P -->
  <rect x="170" y="250" width="100" height="55" rx="4" fill="none" stroke="#80d0d0" stroke-width="1.5"/>
  <text x="185" y="275" font-size="11" fill="#80d0d0">NC</text>
  <!-- Arrows showing inclusions -->
  <text x="320" y="200" font-size="10" fill="#888">P ⊆ NP ⊆ PH ⊆ PSPACE</text>
  <text x="430" y="280" font-size="10" fill="#888">BPP ⊆ BQP ⊆ PSPACE</text>
  <!-- Legend -->
  <text x="40" y="400" font-size="10" fill="#666">Solid = proven inclusion · Dashed = open question · Colors distinguish classes</text>
</svg>

### Cook–Levin and NP-completeness

The **Cook–Levin theorem** (Cook, 1971; Levin, 1973) establishes that SAT is NP-complete: every problem in NP polynomial-time reduces to SAT. Karp (1972) showed 21 combinatorial problems are NP-complete, including 3-SAT, CLIQUE, VERTEX-COVER, HAMILTONIAN CYCLE, and PARTITION.

**Reduction**: $`A \le_p B` means there is a polynomial-time computable function $`f` such that $`x \in A \iff f(x) \in B`. If $`A` is NP-complete and $`A \le_p B`, then $`B` is NP-hard.

#### Worked example: 3-SAT ≤ₚ CLIQUE

Take the formula $`\varphi = (x_1 \lor \lnot x_2 \lor x_3) \land (\lnot x_1 \lor x_2 \lor x_3)`.

**Step 1** — Create one vertex per literal per clause:
- Clause 1: $`v_1 = x_1`, $`v_2 = \lnot x_2`, $`v_3 = x_3`
- Clause 2: $`v_4 = \lnot x_1`, $`v_5 = x_2`, $`v_6 = x_3`

**Step 2** — Connect two vertices with an edge iff they are from *different* clauses AND are not complementary (i.e., one is not the negation of the other).

**Step 3** — The graph has a clique of size 2 (= number of clauses) iff $`\varphi` is satisfiable.

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

The clique $`\{x_1, x_3\}` (one vertex from each clause, connected by an edge) corresponds to the satisfying assignment $`x_1 = T, x_3 = T`.

### PCP theorem

The **PCP theorem** (Arora, Lund, Motwani, Sudan, Szegedy, 1998) states that $`\text{NP} = \text{PCP}(O(\log n), O(1))`: every NP language has a probabilistically checkable proof where the verifier reads only $`O(1)` bits of the proof and uses $`O(\log n)` random bits. This is the foundation of inapproximability results: for example, MAX-3SAT is not approximable within $`7/8 + \varepsilon` unless $`\text{P} = \text{NP}` (Håstad, 1997).

> **Authoritative sources**
> - [PCP theorem paper (Arora et al., 1998)](https://eccc.weizmann.ac.il/report/1998/008/)
> - [The hardness of approximation (Håstad, 1997)](https://dl.acm.org/doi/10.1145/258533.258536)

### Practical implications

- NP-complete problems have no known polynomial-time algorithm.
- Heuristics, approximation algorithms, and parameterized algorithms are the standard tools (see [Graphs](./Search-and-Data-Structures/Graphs.md) for Christofides' approximation for TSP, and [Optimization and Differentiation](./Optimization-and-Differentiation/Readme.md) for continuous optimization).
- In practice, many NP-complete instances are easy; hardness is worst-case.

**Example problem**: show that the language $`L = \{w \in \{0,1\}^* : w \text{ has an even number of } 1\text{s}\}` is in P.

<details><summary>Solution</summary>

A one-pass algorithm decides $`L` in linear time: initialize a bit $`p = 0`; scan the input left to right, and whenever the current symbol is `1`, flip $`p` ($`p \leftarrow 1 - p`); when the scan ends, accept iff $`p = 0`. Flipping a bit is exactly addition modulo 2, so $`p` tracks the parity of the number of `1`s seen so far. The scan performs $`n` symbol inspections and at most $`n` bit flips, which is $`O(n)` time and $`O(1)` extra space — polynomial, so $`L \in \text{P}`. (In fact $`L` is regular and even decidable by a two-state finite automaton, which is the machine drawn in the simulator above.)
</details>

### Open problems

Complexity theory still has famous unresolved questions — statements about whether two of these classes coincide, where decades of research have settled only one direction of the inclusion:

- **P vs NP**: can every efficiently verifiable certificate also be found efficiently? The most famous open problem in computer science, and one of the Clay Millennium Prize problems.
- **NP vs co-NP**: whether "no" instances of NP problems also have short certificates. P = NP would imply NP = co-NP, but the converse is open.
- **BPP vs P**: whether randomness adds power. BPP ⊆ PSPACE is proven, BPP ⊆ P is open, and most researchers conjecture BPP = P.
- **BQP vs NP**: whether quantum computers can efficiently solve NP-complete problems. BQP ⊆ PSPACE is proven; BQP vs NP is open.

<details><summary>Details</summary>

These questions form the lattice of inclusions drawn in the hierarchy diagram above: for each pair of classes, one inclusion is a theorem and the reverse inclusion is open. They are deeply entangled: proving P = NP would collapse the entire polynomial hierarchy PH down to P, and proving BPP = P would show that randomness never helps for decision problems. This is why unconditional results such as the PCP theorem and the inapproximability bounds above are so valuable — they hold regardless of how these open questions resolve.

</details>

</details>

## Quizz

<details><summary>Quizz</summary>

**Problem**: Show that SAT ≤ₚ 3-SAT: given a CNF formula $`\varphi` whose clauses may have any length, build in polynomial time a 3-CNF formula $`\varphi'` that is satisfiable exactly when $`\varphi` is.

<details><summary>Solution</summary>

**Construction.** Process each clause $`C = (\ell_1 \lor \ell_2 \lor \cdots \lor \ell_k)` independently, using fresh variables $`z_1, \dots, z_{k-3}` that appear nowhere else:

- $`k = 1`: replace $`\ell_1` by $`(\ell_1 \lor z) \land (\ell_1 \lor \lnot z)` for a fresh $`z` — the two clauses together force $`\ell_1` to be true.
- $`k = 2`: keep $`(\ell_1 \lor \ell_2)` as is.
- $`k \ge 3`: replace $`C` by the chain
  $`(\ell_1 \lor \ell_2 \lor z_1) \land (\lnot z_1 \lor \ell_3 \lor z_2) \land \cdots \land (\lnot z_{k-3} \lor \ell_{k-1} \lor \ell_k)`.

**Correctness.** If an assignment satisfies $`C`, some $`\ell_j` is true; set the $`z_i` before $`j` to make each earlier clause true via its $`\lnot z` literal, and the clause containing $`\ell_j` is satisfied by $`\ell_j` itself. Conversely, restrict any satisfying assignment of the chain to the original variables: if all $`\ell_j` were false, the first clause forces $`z_1` true, the second forces $`z_2` true, …, and the last clause $`(\lnot z_{k-3} \lor \ell_{k-1} \lor \ell_k)` would be false — a contradiction. So $`\varphi'` is satisfiable iff $`\varphi` is.

**Polynomial time.** A clause of length $`k` becomes $`\max(1, k-2)` clauses of size ≤ 3, so $`|\varphi'| = O(|\varphi|)` and the construction is linear time.

This is the reverse direction of the worked example above: together, SAT ≤ₚ 3-SAT and 3-SAT ≤ₚ CLIQUE show that SAT, 3-SAT, and CLIQUE are all NP-complete as hard as each other.

</details>

</details>
