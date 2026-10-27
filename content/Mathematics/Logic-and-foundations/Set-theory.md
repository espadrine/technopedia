# Set theory

Set theory is the standard foundational language for mathematics: every mathematical object — numbers, functions, spaces, measures — can be coded as a set, and every mathematical argument can be carried out in the axiomatic system **ZFC** (Zermelo–Fraenkel set theory with the axiom of choice). It is relevant whenever you need to reason about *size* (how many elements a set has, even when infinite), about *order* (the length of a process that never terminates), or about what a theory can and cannot prove.

> **Authoritative sources**
> - [Kunen, Set Theory (College Publications)](https://www.amazon.com/dp/1848900503)
> - [Stanford Encyclopedia of Philosophy: Set Theory](https://plato.stanford.edu/entries/set-theory/)

## Brief history

- **1870s–1890s — Cantor.** Georg Cantor found that the naturals and the reals have *different* infinite sizes (the diagonal argument, 1891), and introduced the transfinite numbers (ordinals and cardinals).
- **1908 — Zermelo.** Ernst Zermelo gave the first consistent axiomatization of set theory, taming the paradoxes (Russell's paradox, 1901) that plagued the naive "any collection is a set" view.
- **1922 — Fraenkel.** Abraham Fraenkel added the axiom of replacement, completing the ZF core that is used today.
- **1940 — Gödel.** Kurt Gödel showed the continuum hypothesis is *consistent* with ZF (via the constructible universe *L*).
- **1963 — Cohen.** Paul Cohen showed the continuum hypothesis is also *independent* of ZF (via forcing), proving it can be neither proved nor refuted.

## Sets and membership

**Definition.** A **set** is a collection of objects; the only primitive relation is **membership**, written *x* ∈ *A* ("*x* is an element of *A*"). A set is determined entirely by its elements: two sets are equal exactly when they have the same members.

<details><summary>Details</summary>

The whole of mathematics is built from one idea: a thing is whatever its *members* are. There is no hidden "container" — the set {1, 2, 3} is the same object as {3, 1, 2}, and {1, 1, 2} is the same as {1, 2} (repetition and order do not matter).

**Example.** Let *A* = {1, 2, 3} and *B* = {2, 4}. Then 2 ∈ *A* and 2 ∈ *B*, but 4 ∉ *A*. The set *A* ∩ *B* = {2} collects exactly the elements shared by both.

The picture below shows membership and the basic set operations as regions of a plane.

<svg viewBox="0 0 460 260" width="460" height="260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of two sets A and B inside a universe U">
  <rect x="10" y="10" width="440" height="240" fill="#f7f9fc" stroke="#334" stroke-width="2"/>
  <text x="24" y="32" font-family="sans-serif" font-size="16" fill="#334">U (universe)</text>
  <circle cx="180" cy="140" r="95" fill="#cfe3ff" fill-opacity="0.7" stroke="#1a56db" stroke-width="2"/>
  <circle cx="280" cy="140" r="95" fill="#ffd9c2" fill-opacity="0.7" stroke="#c2410c" stroke-width="2"/>
  <text x="120" y="145" font-family="sans-serif" font-size="20" fill="#1a56db">A</text>
  <text x="330" y="145" font-family="sans-serif" font-size="20" fill="#c2410c">B</text>
  <text x="215" y="145" font-family="sans-serif" font-size="16" fill="#334">A∩B</text>
  <text x="225" y="245" font-family="sans-serif" font-size="13" fill="#555">A∪B = the shaded region; A∩B = the overlap</text>
</svg>

The **ZFC axioms** are the rules that say which sets may exist and how they are built. The ten standard axioms are:

1. **Extensionality** — a set is determined by its elements.
2. **Empty set** — there exists a set with no elements, ∅.
3. **Pairing** — for any *a*, *b* there is a set {a, b}.
4. **Union** — the union of the elements of a set of sets exists.
5. **Power set** — the set of all subsets of a set exists.
6. **Infinity** — there exists an infinite set (one containing ∅ and closed under *x* ↦ *x* ∪ {*x*}).
7. **Separation (subset)** — any definable subcollection of a set is a set.
8. **Replacement** — the image of a set under a definable function is a set.
9. **Foundation (regularity)** — every non-empty set has an element disjoint from it; no set is a member of itself, and there are no infinite descending ∈-chains.
10. **Choice** — given a family of non-empty sets, one can pick one element from each.

Axioms 1–9 form **ZF**; adding 10 gives **ZFC**. Separation is what blocks Russell's paradox: you may form {x ∈ *A* : x ∉ x} for a *given* set *A*, but you may not form "the set of all sets that are not members of themselves."

<details><summary>Example problem</summary>

Let *A* = {1, 2, 3} and *B* = {2, 3, 4}. Find *A* ∪ *B*, *A* ∩ *B*, and *A* ∖ *B*.

<details><summary>Solution</summary>

*A* ∪ *B* = {1, 2, 3, 4} (everything in either), *A* ∩ *B* = {2, 3} (in both), and *A* ∖ *B* = {1} (in *A* but not in *B*).
</details>

</details>

</details>

## Cardinality

**Definition.** Two sets are **equipotent** (have the same **cardinality**) when there is a **bijection** between them. The cardinality of a set is its "size." Cantor's diagonal argument shows |ℕ| &lt; |ℝ|: the infinite sizes are not all equal.

<details><summary>Details</summary>

For finite sets, size is just a number. For infinite sets, "how many" must be defined by *pairing off*: *A* and *B* are the same size if you can match every element of *A* to exactly one element of *B* with none left over. This is a bijection.

**Example.** The naturals and the evens have the same size: the map *n* ↦ 2*n* is a bijection ℕ → 2ℕ. So an infinite set can be the same size as one of its proper parts — the hallmark of infinity.

**Cantor's diagonal argument** proves |ℝ| &gt; |ℕ|. Suppose, for contradiction, that every real in (0, 1) could be listed as r₁, r₂, r₃, …, each written in binary. Build a new real *s* whose *n*-th digit is the *opposite* of the *n*-th digit of rₙ. Then *s* differs from r₁ in the first digit, from r₂ in the second, and so on — so *s* is on no line of the list, contradicting the assumption that the list was complete.

The animation below walks through the diagonal: the highlighted cell is the *n*-th digit of rₙ, and the struck digit is the flipped one that defines *s*.

<svg viewBox="0 0 480 300" width="480" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cantor diagonal argument table">
  <style>
    .diag { animation: blink 2.4s infinite; }
    @keyframes blink { 0%,100% { fill:#fff3bf; } 50% { fill:#ffe066; } }
  </style>
  <text x="10" y="24" font-family="sans-serif" font-size="14" fill="#334">r₁</text>
  <text x="10" y="64" font-family="sans-serif" font-size="14" fill="#334">r₂</text>
  <text x="10" y="104" font-family="sans-serif" font-size="14" fill="#334">r₃</text>
  <text x="10" y="144" font-family="sans-serif" font-size="14" fill="#334">r₄</text>
  <text x="10" y="184" font-family="sans-serif" font-size="14" fill="#334">r₅</text>
  <g font-family="monospace" font-size="16" fill="#222">
    <text x="60" y="24">0</text><text x="110" y="24">1</text><text x="160" y="24">0</text><text x="210" y="24">1</text><text x="260" y="24">0</text>
    <text x="60" y="64">1</text><text x="110" y="64">0</text><text x="160" y="64">1</text><text x="210" y="64">0</text><text x="260" y="64">1</text>
    <text x="60" y="104">0</text><text x="110" y="104">0</text><text x="160" y="104">1</text><text x="210" y="104">1</text><text x="260" y="104">0</text>
    <text x="60" y="144">1</text><text x="110" y="144">1</text><text x="160" y="144">0</text><text x="210" y="144">0</text><text x="260" y="144">1</text>
    <text x="60" y="184">0</text><text x="110" y="184">1</text><text x="160" y="184">1</text><text x="210" y="184">0</text><text x="260" y="184">0</text>
  </g>
  <rect class="diag" x="52" y="8"  width="30" height="26" fill="#fff3bf" stroke="#e8a000"/>
  <rect class="diag" x="102" y="48" width="30" height="26" fill="#fff3bf" stroke="#e8a000"/>
  <rect class="diag" x="152" y="88" width="30" height="26" fill="#fff3bf" stroke="#e8a000"/>
  <rect class="diag" x="202" y="128" width="30" height="26" fill="#fff3bf" stroke="#e8a000"/>
  <rect class="diag" x="252" y="168" width="30" height="26" fill="#fff3bf" stroke="#e8a000"/>
  <text x="10" y="234" font-family="sans-serif" font-size="14" fill="#c2410c">s</text>
  <g font-family="monospace" font-size="16" fill="#c2410c">
    <text x="60" y="234">1</text><text x="110" y="234">1</text><text x="160" y="234">0</text><text x="210" y="234">1</text><text x="260" y="234">1</text>
  </g>
  <text x="320" y="234" font-family="sans-serif" font-size="13" fill="#c2410c">= diagonal, flipped</text>
  <text x="10" y="278" font-family="sans-serif" font-size="13" fill="#555">s differs from rₙ in digit n, so s is on no line of the list.</text>
</svg>

The argument generalizes: for *any* set *A*, the power set 𝒫(*A*) (the set of all subsets of *A*) is strictly larger,

```math
|A| < |\mathcal{P}(A)|
```

Writing this as 2^κ = |𝒫(κ)| — the cardinality of the power set of a set of size κ — gives an endless ladder of ever-larger infinite sizes:

<svg viewBox="0 0 460 200" width="460" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cardinality ladder">
  <g font-family="sans-serif" font-size="18" fill="#222">
    <rect x="20"  y="140" width="120" height="40" fill="#cfe3ff" stroke="#1a56db"/>
    <text x="45"  y="166">ℵ₀</text>
    <rect x="170" y="95"  width="120" height="40" fill="#d7f5e3" stroke="#0f7a3d"/>
    <text x="180" y="121">2^ℵ₀</text>
    <rect x="320" y="50"  width="120" height="40" fill="#ffe0e0" stroke="#c0392b"/>
    <text x="330" y="76">2^(2^ℵ₀)</text>
  </g>
  <g stroke="#555" stroke-width="2" fill="none" marker-end="url(#arr)">
    <line x1="140" y1="150" x2="168" y2="120"/>
    <line x1="290" y1="105" x2="318" y2="75"/>
  </g>
  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#555"/></marker></defs>
  <text x="20" y="30" font-family="sans-serif" font-size="14" fill="#555">each arrow is a strict increase (Cantor): κ &lt; 2^κ</text>
</svg>

The smallest infinite cardinal is ℵ₀ (the size of ℕ); the size of ℝ is 2^ℵ₀, called the **continuum** and denoted 𝔠.

> **Authoritative sources**
> - [Cantor's theorem (Wikipedia)](https://en.wikipedia.org/wiki/Cantor%27s_theorem)
> - [Cantor's diagonal argument (Wikipedia)](https://en.wikipedia.org/wiki/Cantor%27s_diagonal_argument)

<details><summary>Example problem</summary>

Show that |ℕ × ℕ| = |ℕ| by exhibiting a bijection.

<details><summary>Solution</summary>

Pair (m, n) with the prime-power code 2^m · 3^n; unique factorization makes this injective, and its image is an infinite subset of ℕ, so by the same "infinite subset of ℕ has size ℵ₀" fact it is a bijection onto its image. Hence the countable product of countable sets is countable.
</details>

</details>

</details>

## Ordinals

**Definition.** An **ordinal** is a set that is well-ordered by membership and equals the set of its predecessors. Ordinals extend counting into the transfinite: 0, 1, 2, …, ω, ω+1, …, ω·2, …, ω^ω, … They measure the *length* of well-ordered processes and the strength of induction and recursion.

<details><summary>Details</summary>

A **cardinal** answers "how many"; an **ordinal** answers "in what order." Every finite ordinal is just a natural number, but ordinals keep going past all of them. The first infinite ordinal is ω, the order type of the naturals 0, 1, 2, … After exhausting one copy of ω you can start another: ω+1 is "ω then one more," and ω·2 is two copies of ω end to end.

**Example.** The order 0, 1, 2, …, ω, ω+1, ω+2, … has order type ω+1. It is *not* the same order type as ω: in ω+1 there is a last element (ω is the first "limit" point), whereas ω has no last element. Two ordinals can have the same cardinality (|ω+1| = ℵ₀) but different order — that is the whole point of distinguishing them.

The number line below lays out the first few ordinals, with the limit ordinal ω marked where the finite ones run out.

<svg viewBox="0 0 520 150" width="520" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ordinal number line">
  <line x1="20" y1="70" x2="500" y2="70" stroke="#334" stroke-width="2" marker-end="url(#oarr)"/>
  <defs><marker id="oarr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#334"/></marker></defs>
  <g font-family="sans-serif" font-size="15" fill="#222" text-anchor="middle">
    <g><line x1="40"  y1="64" x2="40"  y2="76" stroke="#334" stroke-width="2"/><text x="40"  y="100">0</text></g>
    <g><line x1="80"  y1="64" x2="80"  y2="76" stroke="#334" stroke-width="2"/><text x="80"  y="100">1</text></g>
    <g><line x1="120" y1="64" x2="120" y2="76" stroke="#334" stroke-width="2"/><text x="120" y="100">2</text></g>
    <text x="160" y="76">…</text>
    <g><line x1="220" y1="60" x2="220" y2="80" stroke="#c2410c" stroke-width="3"/><text x="220" y="104" fill="#c2410c" font-weight="bold">ω</text></g>
    <g><line x1="280" y1="64" x2="280" y2="76" stroke="#334" stroke-width="2"/><text x="280" y="100">ω+1</text></g>
    <g><line x1="350" y1="64" x2="350" y2="76" stroke="#334" stroke-width="2"/><text x="350" y="100">ω·2</text></g>
    <text x="410" y="76">…</text>
    <g><line x1="470" y1="64" x2="470" y2="76" stroke="#334" stroke-width="2"/><text x="470" y="100">ω^ω</text></g>
  </g>
  <text x="20" y="30" font-family="sans-serif" font-size="13" fill="#555">finite ordinals, then the first limit ordinal ω, then ω+1, ω·2, …, ω^ω</text>
</svg>

Ordinals support **transfinite induction** and **transfinite recursion**: to prove a property for all ordinals, prove it holds at 0, is preserved by taking a successor (α ↦ α+1), and is preserved at limit ordinals (from all smaller ordinals). This is the engine behind defining operations on all ordinals, such as ordinal addition, multiplication, and exponentiation.

> **Authoritative sources**
> - [Ordinal number (Wikipedia)](https://en.wikipedia.org/wiki/Ordinal_number)

<details><summary>Example problem</summary>

Is ω + 1 equal to 1 + ω? Justify.

<details><summary>Solution</summary>

No. ω+1 is the order type "0, 1, 2, … then one more," which has a last element. But 1+ω is "one then 0, 1, 2, …," which is order-isomorphic to ω itself (just relabel). So 1+ω = ω ≠ ω+1: ordinal addition is not commutative.
</details>

</details>

</details>

## Independence and large cardinals

**Definition.** A statement is **independent** of ZFC when it is neither provable nor refutable from the ZFC axioms. The **continuum hypothesis** (CH) — "there is no infinite cardinal strictly between ℵ₀ and 2^ℵ₀" — is the canonical example.

<details><summary>Details</summary>

Cantor asked whether 2^ℵ₀ = ℵ₁ (the next cardinal after ℵ₀). This is the **continuum hypothesis**. For decades it was thought to be decidable, until:

- **Gödel (1940)** built the **constructible universe** *L*, a model of ZFC in which CH holds. So CH is *consistent* with ZFC (if ZFC is).
- **Cohen (1963)** invented **forcing**, a technique to build a model of ZFC in which CH fails. So ¬CH is also consistent with ZFC.

Together these show CH is **independent** of ZFC: ZFC alone cannot settle it. This is a concrete instance of Gödel's incompleteness theorems (see [Mathematical logic](./Mathematical-logic.md)).

Because ZFC leaves such questions open, set theory studies **stronger axioms** — **large cardinals** (cardinals with special closure properties, e.g. inaccessible, measurable, or Woodin cardinals) — that decide more statements and organize the consistency strength of the theory. The hierarchy of large cardinals is one of the frontiers of modern set theory.

> **Authoritative sources**
> - [Continuum hypothesis (Wikipedia)](https://en.wikipedia.org/wiki/Continuum_hypothesis)
> - [Forcing (mathematics) (Wikipedia)](https://en.wikipedia.org/wiki/Forcing_(mathematics))

<details><summary>Example problem</summary>

State precisely what it means for CH to be independent of ZFC, and name the two models that establish it.

<details><summary>Solution</summary>

CH is independent of ZFC if, assuming ZFC is consistent, there exists a model of ZFC in which CH is true and another model of ZFC in which CH is false. Gödel's constructible universe *L* is a model where CH holds; Cohen's forcing extensions are models where CH fails.
</details>

</details>

</details>

## Interactive: Cantor's diagonal argument

The simulation below lets you build the diagonal real *s* yourself: flip the highlighted diagonal digits and watch the new real differ from every row of the list.

<iframe src="./Set-theory.simulation.html" title="Interactive Cantor diagonal argument"></iframe>

## How it relates to the other classes

Set theory is the default substrate: [Analysis](../../Analysis/Readme.md) builds the reals and measure theory on it, [Algebraic and discrete mathematics](../../Algebraic-and-discrete-mathematics/Readme.md) codes its structures as sets of sets, and [Probability and statistics](../../Probability-and-statistics/Readme.md) defines events as measurable sets — see [Measure theory](../../Probability-and-statistics/Measure-theory/Readme.md), which is built directly on the cardinality and set-algebra ideas above. [Category theory](../Category-theory.md) offers an alternative, structural language for the same content, and [Type theory](../Type-theory.md) a third.

## Quizz

<details><summary>Test yourself</summary>

**Problem.** A student claims: "The set of all even natural numbers is smaller than the set of all natural numbers, because it is a proper subset." Using the definition of cardinality, explain why this claim is wrong, and then state the theorem that *does* guarantee a strictly larger set than ℕ.

<details><summary>Solution</summary>

Cardinality is defined by the existence of a bijection, not by subset inclusion. The map *n* ↦ 2*n* is a bijection from ℕ onto the evens, so the two sets have the *same* cardinality ℵ₀ — a proper subset can be the same size as its superset, which is exactly what distinguishes infinite from finite sets. The theorem that guarantees a strictly larger set is **Cantor's theorem**: for any set *A*, |A| &lt; |𝒫(*A*)|; applied to *A* = ℕ it gives ℵ₀ &lt; 2^ℵ₀.
</details>

</details>
