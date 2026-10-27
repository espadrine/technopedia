# Computability and decidability

Computability and decidability is the study of what can and cannot be computed by a mechanical procedure. It answers "what can be mechanically decided?" and thereby bounds what proofs, algorithms, and machines can achieve. It is relevant whenever you must establish a *hard* limit — that no algorithm exists at all, not merely that none is known — for a decision problem.

This page takes the **decidability** angle: which problems are decidable, which are merely semi-decidable, and how the undecidable ones are ranked by the arithmetical hierarchy. The **complexity-class** angle — how *fast* a decidable problem can be solved (P, NP, and their relatives) — is treated on the Computer-Science side in [Computability and Complexity Classes](../../Computer-Science/Algorithmics/Computability-and-Complexity-Classes.md). The formal 7-tuple definition of a Turing machine and the P/NP machinery live there; this page builds on them rather than re-deriving them.

> **Authoritative sources**
> - [A. Turing (1936), On Computable Numbers, with an Application to the Entscheidungsproblem](https://doi.org/10.1112/plms/s2-42.1.230)
> - [A. Church (1936), An Unsolvable Problem of Elementary Number Theory](https://doi.org/10.2307/2371045)
> - [H. Rogers, Jr., Theory of Recursive Functions and Effective Computability (1967)](https://en.wikipedia.org/wiki/Theory_of_Recursive_Functions_and_Effective_Computability)
> - [Stanford Encyclopedia of Philosophy: Computability and Complexity](https://plato.stanford.edu/entries/computability/)

## Models of computation

A **model of computation** is a precise formal definition of "mechanical procedure." The three canonical models — Turing machines, the lambda calculus, and the general recursive functions — compute exactly the same class of functions, the **computable** (or **recursive**) functions. This robustness across independent definitions is the empirical content of the **Church–Turing thesis**: every effectively computable function is Turing-computable. The property that matters most for undecidability is **universality**: a single machine can take the description of any other machine as data and simulate it.

<details><summary>Details</summary>

**Step 1 — What a model of computation is.** A model of computation fixes, in mathematical terms, what counts as a mechanical procedure, so that "computable" stops being a vague word. A Turing machine is the standard choice: a finite control (a finite set of states) that reads and writes one cell of an unbounded tape at a time. The full 7-tuple definition, the notion of a decidable language, and the complexity classes built on top of it are developed on the Computer-Science side in [Computability and Complexity Classes](../../Computer-Science/Algorithmics/Computability-and-Complexity-Classes.md); here we only need the machine as a black box that either halts or runs forever.

**Step 2 — Universality and self-reference.** A Turing machine can be written down as a finite string of symbols, so a machine's description is itself data. A **universal machine** $`U` reads a pair $`(\langle M\rangle, w)` — the code of a machine $`M` and an input $`w` — and simulates $`M(w)` step for step. Because a machine's code is just a string, a machine can be handed *its own* code as input. This self-reference is the engine behind every undecidability proof on this page: it is what lets us build a machine $`D` that reasons about its own behavior.

The simulator below runs a concrete Turing machine that decides the language $`L = \{0^n 1^n : n \ge 0\}` — a decidable (but not regular) language. Load an input and step through to watch the machine mark off matched $`0`/`1` pairs.

<iframe src="./Computability-and-decidability.simulation.html" title="Turing machine deciding the language 0^n 1^n, step by step"></iframe>

> **Authoritative sources**
> - [A. Turing (1936), On Computable Numbers, with an Application to the Entscheidungsproblem](https://doi.org/10.1112/plms/s2-42.1.230)

**Example problem.** Why does universality matter for undecidability, and not merely for convenience?

<details><summary>Solution</summary>

Every undecidability proof on this page needs a machine to be given its *own* description as input, so that the machine's behavior can depend on a prediction about itself. Without universality there is no way to form the self-referential object (the diagonal machine $`D`), and the contradiction never arises. Universality is therefore not an engineering nicety but the logical precondition for the halting-problem argument.
</details>

</details>

## Semi-decidability and recursively enumerable sets

A set $`S \subseteq \mathbb{N}` is **semi-decidable** (or **recursively enumerable**, r.e.) if some machine halts and accepts exactly the members of $`S`, and may run forever on non-members. $`S` is **decidable** iff both $`S` and its complement $`\overline{S}` are semi-decidable. $`S` is **co-semi-decidable** when its complement is semi-decidable. The decidable sets sit exactly at the intersection of the semi-decidable and the co-semi-decidable sets.

<details><summary>Details</summary>

**Step 1 — Decidable vs. semi-decidable.** A decider must answer *both* yes and no in finite time. A semi-decider only has to answer yes in finite time; on a "no" instance it is allowed to loop forever. So every decidable set is semi-decidable, but not conversely: a semi-decider can "miss" the negative answers by never halting on them.

**Step 2 — A concrete semi-decidable set.** The **halting set** $`K = \{e : \varphi_e(e) \text{ halts}\}` (the set of machine codes that halt when run on their own code) is semi-decidable: to test whether $`e \in K`, run machine $`e` on input $`e`; if it halts, accept. If it never halts, the test runs forever — exactly the behavior a semi-decider is allowed to have. We will see in the next section that $`K` is *not* decidable, so it is a genuine example of a set that is semi-decidable but not decidable.

The three-way split is shown below: a set can be decidable (both directions answer), semi-decidable only (positives answer, negatives may loop), co-semi-decidable only (negatives answer, positives may loop), or neither.

<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" style="max-width:640px; width:100%;">
  <ellipse cx="235" cy="150" rx="185" ry="112" fill="#eaf3fb" stroke="#50a0e0" stroke-width="2"/>
  <ellipse cx="405" cy="150" rx="185" ry="112" fill="#fbf0ea" stroke="#e07050" stroke-width="2"/>
  <text x="120" y="60" font-size="14" fill="#2a6db0" font-weight="bold">semi-decidable (Σ₁)</text>
  <text x="400" y="60" font-size="14" fill="#b04a2a" font-weight="bold">co-semi-decidable (Π₁)</text>
  <text x="150" y="150" font-size="14" fill="#1a4060" font-weight="bold">K</text>
  <text x="150" y="168" font-size="10" fill="#555">(halts on own code)</text>
  <text x="470" y="150" font-size="14" fill="#1a4060" font-weight="bold">K̄</text>
  <text x="452" y="168" font-size="10" fill="#555">(loops on own code)</text>
  <text x="320" y="145" text-anchor="middle" font-size="13" fill="#2e7d32" font-weight="bold">decidable</text>
  <text x="320" y="163" text-anchor="middle" font-size="10" fill="#555">e.g. the even numbers</text>
  <text x="320" y="285" text-anchor="middle" font-size="12" fill="#888">outside both: neither semi-decidable nor co-semi-decidable</text>
</svg>

> **Authoritative sources**
> - [H. Rogers, Jr., Theory of Recursive Functions and Effective Computability (1967)](https://en.wikipedia.org/wiki/Theory_of_Recursive_Functions_and_Effective_Computability)

**Example problem.** Give a set that is co-semi-decidable but not decidable, and justify it.

<details><summary>Solution</summary>

The complement of the halting set, $`\overline{K} = \{e : \varphi_e(e) \text{ does not halt}\}`, is co-semi-decidable (its complement $`K` is semi-decidable). It is not decidable: if $`\overline{K}` were decidable then $`K` would be decidable too (just flip the answer), contradicting the halting problem. So $`\overline{K}` is co-semi-decidable but not decidable.
</details>

</details>

## Decidability and the halting problem

A decision problem is **decidable** when some algorithm answers yes or no for every input in finite time. The **halting problem** — deciding whether a given machine halts on a given input — is **undecidable** (Turing 1936; Church 1936). Undecidability is not exotic: the satisfiability of first-order logic (the Entscheidungsproblem), the word problem for groups, and many tiling problems are undecidable as well.

<details><summary>Details</summary>

**Step 1 — Diagonalization.** Suppose a decider $`H(M, w)` existed, answering "halts" or "loops" for any machine $`M` and input $`w`. Build a machine $`D` that, on input $`m`, runs $`H(m, m)` and does the *opposite*: if $`H` says "$`m` halts on $`m`," then $`D` loops; otherwise $`D` halts. Now run $`D` on its own code $`D`: $`D` halts on $`D` exactly when it does not — a contradiction. So no such $`H` exists. (The same self-referential structure appears in Cantor's proof that the reals are uncountable. Gödel's incompleteness theorems reach a similar self-reference by a *different* route — arithmetization plus the fixed-point lemma, not direct diagonalization — see [Mathematical logic](./Mathematical-logic.md).)

The diagram below lays out the diagonal: the rows are machines, the columns are inputs, and the highlighted diagonal is where each machine is run on its own code. The machine $`D` is built to disagree with the diagonal everywhere, so at the cell $`D(D)` it must both halt and loop.

<svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" style="max-width:560px; width:100%;">
  <!-- column headers -->
  <text x="148" y="52" text-anchor="middle" font-size="12" fill="#555">0</text>
  <text x="204" y="52" text-anchor="middle" font-size="12" fill="#555">1</text>
  <text x="260" y="52" text-anchor="middle" font-size="12" fill="#555">2</text>
  <text x="316" y="52" text-anchor="middle" font-size="12" fill="#555">3</text>
  <text x="372" y="52" text-anchor="middle" font-size="12" fill="#555" font-weight="bold">D</text>
  <text x="60" y="52" text-anchor="middle" font-size="11" fill="#888">machine ↓</text>
  <!-- row labels -->
  <text x="112" y="90" text-anchor="end" font-size="12" fill="#333">M₀</text>
  <text x="112" y="146" text-anchor="end" font-size="12" fill="#333">M₁</text>
  <text x="112" y="202" text-anchor="end" font-size="12" fill="#333">M₂</text>
  <text x="112" y="258" text-anchor="end" font-size="12" fill="#333">M₃</text>
  <text x="112" y="314" text-anchor="end" font-size="12" fill="#333" font-weight="bold">D</text>
  <!-- grid cells: H = halts, L = loops -->
  <!-- row M0 -->
  <rect x="120" y="70" width="56" height="56" fill="#fff3c4" stroke="#bbb"/><text x="148" y="102" text-anchor="middle" font-size="13" fill="#333">H</text>
  <rect x="176" y="70" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="204" y="102" text-anchor="middle" font-size="13" fill="#333">L</text>
  <rect x="232" y="70" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="260" y="102" text-anchor="middle" font-size="13" fill="#333">H</text>
  <rect x="288" y="70" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="316" y="102" text-anchor="middle" font-size="13" fill="#333">L</text>
  <rect x="344" y="70" width="56" height="56" fill="#f2f2f2" stroke="#bbb"/><text x="372" y="102" text-anchor="middle" font-size="13" fill="#aaa">·</text>
  <!-- row M1 -->
  <rect x="120" y="126" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="148" y="158" text-anchor="middle" font-size="13" fill="#333">L</text>
  <rect x="176" y="126" width="56" height="56" fill="#fff3c4" stroke="#bbb"/><text x="204" y="158" text-anchor="middle" font-size="13" fill="#333">H</text>
  <rect x="232" y="126" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="260" y="158" text-anchor="middle" font-size="13" fill="#333">L</text>
  <rect x="288" y="126" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="316" y="158" text-anchor="middle" font-size="13" fill="#333">H</text>
  <rect x="344" y="126" width="56" height="56" fill="#f2f2f2" stroke="#bbb"/><text x="372" y="158" text-anchor="middle" font-size="13" fill="#aaa">·</text>
  <!-- row M2 -->
  <rect x="120" y="182" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="148" y="214" text-anchor="middle" font-size="13" fill="#333">H</text>
  <rect x="176" y="182" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="204" y="214" text-anchor="middle" font-size="13" fill="#333">H</text>
  <rect x="232" y="182" width="56" height="56" fill="#fff3c4" stroke="#bbb"/><text x="260" y="214" text-anchor="middle" font-size="13" fill="#333">L</text>
  <rect x="288" y="182" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="316" y="214" text-anchor="middle" font-size="13" fill="#333">L</text>
  <rect x="344" y="182" width="56" height="56" fill="#f2f2f2" stroke="#bbb"/><text x="372" y="214" text-anchor="middle" font-size="13" fill="#aaa">·</text>
  <!-- row M3 -->
  <rect x="120" y="238" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="148" y="270" text-anchor="middle" font-size="13" fill="#333">L</text>
  <rect x="176" y="238" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="204" y="270" text-anchor="middle" font-size="13" fill="#333">L</text>
  <rect x="232" y="238" width="56" height="56" fill="#fff" stroke="#bbb"/><text x="260" y="270" text-anchor="middle" font-size="13" fill="#333">H</text>
  <rect x="288" y="238" width="56" height="56" fill="#fff3c4" stroke="#bbb"/><text x="316" y="270" text-anchor="middle" font-size="13" fill="#333">H</text>
  <rect x="344" y="238" width="56" height="56" fill="#f2f2f2" stroke="#bbb"/><text x="372" y="270" text-anchor="middle" font-size="13" fill="#aaa">·</text>
  <!-- row D = negation of the diagonal -->
  <rect x="120" y="294" width="56" height="56" fill="#eef7ee" stroke="#bbb"/><text x="148" y="326" text-anchor="middle" font-size="13" fill="#2e7d32">L</text>
  <rect x="176" y="294" width="56" height="56" fill="#eef7ee" stroke="#bbb"/><text x="204" y="326" text-anchor="middle" font-size="13" fill="#2e7d32">L</text>
  <rect x="232" y="294" width="56" height="56" fill="#eef7ee" stroke="#bbb"/><text x="260" y="326" text-anchor="middle" font-size="13" fill="#2e7d32">H</text>
  <rect x="288" y="294" width="56" height="56" fill="#eef7ee" stroke="#bbb"/><text x="316" y="326" text-anchor="middle" font-size="13" fill="#2e7d32">L</text>
  <rect x="344" y="294" width="56" height="56" fill="#fde0dc" stroke="#c62828" stroke-width="2.5"/><text x="372" y="326" text-anchor="middle" font-size="15" fill="#c62828" font-weight="bold">✗</text>
  <!-- legend -->
  <text x="120" y="378" font-size="11" fill="#555">H = halts, L = loops, · = irrelevant. Yellow = the diagonal H(Mᵢ, Mᵢ).</text>
  <text x="120" y="394" font-size="11" fill="#c62828">D is the opposite of the diagonal, so D(D) must both halt and loop — contradiction.</text>
</svg>

> **Authoritative sources**
> - [A. Turing (1936), On Computable Numbers, with an Application to the Entscheidungsproblem](https://doi.org/10.1112/plms/s2-42.1.230)
> - [A. Church (1936), An Unsolvable Problem of Elementary Number Theory](https://doi.org/10.2307/2371045)

**Step 2 — Reductions: spreading undecidability.** Once one problem is known undecidable, others follow by **reduction**. A problem $`A` **reduces to** a problem $`B` (written $`A \le_m B`) if a machine can, given any instance of $`A`, produce an instance of $`B` that is a "yes" exactly when the original was. If $`B` were decidable, then so would be $`A`; so if $`A` is undecidable and $`A \le_m B`, then $`B` is undecidable too.

*Concrete reduction.* Show that **ACCEPTS-SOMETHING** $`= \{M : M \text{ accepts at least one input}\}` is undecidable by reducing the halting problem to it. Given a halting-problem instance $(M, w)$, build a machine $`M'` that, on *any* input $`x`, first ignores $`x`, simulates $`M(w)`, and accepts if and only if $`M(w)` halts. Then $`M'` accepts some input (indeed every input) exactly when $`M(w)` halts, so $(M, w) \in \text{HALT} \iff M' \in \text{ACCEPTS-SOMETHING}$. If ACCEPTS-SOMETHING were decidable, HALT would be — contradiction.

The same reduction pattern proves the undecidability of the first-order **Entscheidungsproblem** (Church 1936), the **word problem for groups** (Novikov 1955; Adian 1958), and the **tiling problem** (Rogers 1952; Berger 1966).

> **Authoritative sources**
> - [P. S. Novikov, The unsolvability of the word problem for groups and semigroups (1955)](https://en.wikipedia.org/wiki/Word_problem)
> - [R. Berger, The undecidability of the domino problem (1966)](https://doi.org/10.1090/S0002-9939-1966-0184555-7)

**Example problem.** Reduce the halting problem to the problem **ACCEPTS-EMPTY** $`= \{M : M \text{ accepts the empty string } \varepsilon\}`.

<details><summary>Solution</summary>

Given $(M, w)$, build $`M'` that, on input $`x`, first erases $`x` (overwriting the tape with blanks and returning to the start), then simulates $`M(w)`, accepting iff $`M(w)` halts. $`M'` accepts $\varepsilon$ (and in fact every input) exactly when $`M(w)` halts, so $(M,w) \in \text{HALT} \iff M' \in \text{ACCEPTS-EMPTY}$. If ACCEPTS-EMPTY were decidable, HALT would be — contradiction.
</details>

</details>

## The arithmetical hierarchy

Undecidable problems come in degrees. The **arithmetical hierarchy** classifies sets of natural numbers by the quantifier pattern needed to define them over a decidable base:

- **Σ₁** sets have the form $`\{n : \exists x\, R(x, n)\}` with $`R` decidable — exactly the **semi-decidable** sets.
- **Π₁** sets have the form $`\{n : \forall x\, R(x, n)\}` with $`R` decidable — exactly the **co-semi-decidable** sets.
- **Σ₂** sets allow one alternation, $`\{n : \exists x\, \forall y\, R(x, y, n)\}`; **Π₂** sets are $`\{n : \forall x\, \exists y\, R(x, y, n)\}`; and so on.

The halting set $`K` is **Σ₁-complete** (it is Σ₁, and every Σ₁ set reduces to it); its complement is Π₁ and not semi-decidable.

<details><summary>Details</summary>

**Step 1 — The decidable base.** A **decidable** (Δ₀) predicate is one a machine can answer yes/no on in finite time. The hierarchy is built by stacking quantifiers over such a base. The base itself is level 0: a set defined by a decidable predicate with no quantifiers is just decidable.

**Step 2 — The Σ₁ / Π₁ base of the hierarchy.** Adding a single existential quantifier over a decidable predicate gives Σ₁: $`n \in S \iff \exists x\, R(x, n)`. To semi-decide such an $`S`, search $`x = 0, 1, 2, \dots` and accept the first $`x` with $`R(x, n)`; if none exists, the search runs forever. So **Σ₁ = semi-decidable**. Dually, a single universal quantifier gives Π₁ = co-semi-decidable. *Concrete Σ₁ example:* the halting set $`K = \{e : \exists s\, [\varphi_e(e) \text{ halts within } s \text{ steps}]\}` — the predicate "halts within $`s` steps" is decidable (simulate for $`s` steps), so $`K` is Σ₁.

**Step 3 — Higher levels.** Each further alternation raises the level. *Concrete Σ₂ example:* the set of machines that halt on **every** input, $`\text{TOT} = \{e : \forall x\, \exists s\, [\varphi_e(x) \text{ halts within } s \text{ steps}]\}`. The innermost predicate is decidable, then ∃s, then ∀x: a Σ₂ definition. TOT is not Σ₁ (it is not semi-decidable), which is why the hierarchy does not collapse at level 1.

The nested-boxes diagram below places these examples: Σ₁ (semi-decidable, containing $`K`) and Π₁ (co-semi-decidable, containing $`\overline{K}`) overlap exactly in the decidable sets, and both sit strictly inside Σ₂, which contains TOT.

<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" style="max-width:680px; width:100%;">
  <!-- outer: Sigma_2 -->
  <rect x="20" y="20" width="640" height="360" rx="12" fill="#f4f0fb" stroke="#8a63c9" stroke-width="2"/>
  <text x="40" y="48" font-size="14" fill="#6a3fb0" font-weight="bold">Σ₂  (∃x ∀y) — one alternation</text>
  <text x="340" y="70" text-anchor="middle" font-size="13" fill="#6a3fb0" font-weight="bold">TOT = { e : ∀x ∃s  φₑ(x) halts in s steps }</text>
  <!-- Sigma_1 box -->
  <rect x="60" y="95" width="300" height="260" rx="8" fill="#eaf3fb" stroke="#50a0e0" stroke-width="2"/>
  <text x="80" y="120" font-size="13" fill="#2a6db0" font-weight="bold">Σ₁  (∃x) — semi-decidable</text>
  <text x="120" y="200" font-size="14" fill="#1a4060" font-weight="bold">K</text>
  <text x="120" y="218" font-size="10" fill="#555">halts on own code</text>
  <!-- Pi_1 box -->
  <rect x="320" y="95" width="300" height="260" rx="8" fill="#fbf0ea" stroke="#e07050" stroke-width="2"/>
  <text x="560" y="120" text-anchor="end" font-size="13" fill="#b04a2a" font-weight="bold">Π₁  (∀x) — co-semi-decidable</text>
  <text x="540" y="200" font-size="14" fill="#1a4060" font-weight="bold">K̄</text>
  <text x="540" y="218" font-size="10" fill="#555">loops on own code</text>
  <!-- overlap: decidable -->
  <rect x="320" y="95" width="40" height="260" fill="#e6f4e6" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="340" y="300" text-anchor="middle" font-size="11" fill="#2e7d32" font-weight="bold" transform="rotate(-90 340 300)">decidable = Σ₁ ∩ Π₁</text>
  <text x="340" y="345" text-anchor="middle" font-size="10" fill="#2e7d32">evens</text>
  <!-- legend -->
  <text x="40" y="392" font-size="11" fill="#555">Σ₁ ⊂ Σ₂ and Π₁ ⊂ Σ₂ are strict; the overlap Σ₁ ∩ Π₁ is exactly the decidable sets.</text>
</svg>

> **Authoritative sources**
> - [H. Rogers, Jr., Theory of Recursive Functions and Effective Computability (1967)](https://en.wikipedia.org/wiki/Theory_of_Recursive_Functions_and_Effective_Computability)
> - [Stanford Encyclopedia of Philosophy: Computability and Complexity](https://plato.stanford.edu/entries/computability/)

**Example problem.** Place the set $`\text{TOT} = \{e : \varphi_e \text{ is a total function}\}` in the hierarchy, and argue that it is not Σ₁.

<details><summary>Solution</summary>

$`\text{TOT} = \{e : \forall x\, \exists s\, [\varphi_e(x) \text{ halts within } s \text{ steps}]\}` is exactly the Σ₂ set from Step 3, so it is Σ₂. It is not Σ₁: if it were semi-decidable, then its complement (machines that fail to halt on some input, a Σ₁ set) would be co-semi-decidable, and together the two would make TOT decidable — but TOT is Σ₂-complete and not decidable. So TOT is a genuine Σ₂ set, one level above the halting set.
</details>

</details>

## Quizz

<details><summary>Quizz</summary>

**Problem.** Show that the halting set $`K = \{e : \varphi_e(e) \text{ halts}\}` is **Σ₁-complete**: (i) $`K` is Σ₁, and (ii) every Σ₁ set many-one reduces to $`K`.

<details><summary>Solution</summary>

**(i) $`K` is Σ₁.** $`e \in K \iff \exists s\, [\varphi_e(e) \text{ halts within } s \text{ steps}]`, and the predicate "halts within $`s` steps" is decidable (simulate $`e` on $`e` for $`s` steps). So $`K` is Σ₁.

**(ii) Every Σ₁ set reduces to $`K`.** Let $`S = \{n : \exists x\, R(x, n)\}` be any Σ₁ set, with $`R` decidable. Build a machine $`M_n` (indexed by $`n`) that, on input $`x`, checks $`R(x, n)` and accepts if true. Then $`M_n` halts on input $`n` (i.e. $`n \in K`) exactly when there is some $`x` with $`R(x, n)`, i.e. exactly when $`n \in S`. The map $`n \mapsto \langle M_n\rangle` is computable, so $`S \le_m K`. Hence $`K` is Σ₁-complete.

**Consequence.** Because $`K` is Σ₁-complete and undecidable, no Σ₁ set can be decidable unless the hierarchy collapses — and the halting problem is the canonical representative of the first level of undecidability.
</details>

</details>

</details>
