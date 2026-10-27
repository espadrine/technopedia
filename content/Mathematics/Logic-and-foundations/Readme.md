# Logic and foundations

Logic and foundations studies the rules of reasoning, the axiomatic structure of mathematics, and the limits of formal systems. It is relevant whenever a problem needs rigorous proof, formal specification, decidability analysis, or a clear understanding of what can and cannot be established within a given framework. It underlies all of mathematics, computer science, and formal verification.

## Brief history

- Antiquity: Aristotle's syllogistic and Euclid's axiomatic method.
- 19th century: Boolean algebra, set theory (Cantor), and the formalization of logic (Frege, Peano).
- Early 20th century: Hilbert's program, Gödel's incompleteness theorems, and the foundations of computability (Turing, Church).
- 1930s–1960s: the Curry–Howard correspondence ("proofs are programs") links logic to computation; lambda calculus becomes the bridge between the two.
- Mid-20th century onward: model theory, proof theory, category theory, and type theory expand the landscape.

Logic and foundations is deeply intertwined with [Computer Science](../Computer-Science/Readme.md): type theory underpins programming-language semantics, and computability underpins the theory of algorithms (see [Theory of Computation](../Computer-Science/Algorithmics/Theory-of-Computation/Readme.md)).

## Classes

<table>
<tr><th>Page</th><th>Key question</th><th>Core objects</th><th>How it relates</th></tr>
<tr><td>[Mathematical logic](./Mathematical-logic.md)</td><td>What counts as a valid inference, and what can a formal system prove?</td><td>propositional and predicate logic, formal systems, model theory, proof theory, Gödel incompleteness theorems</td><td>the meta-discipline that studies formal systems themselves; its incompleteness theorems bound what any foundation (set-theoretic or type-theoretic) can prove</td></tr>
<tr><td>[Computability and decidability](./Computability-and-decidability.md)</td><td>What can be mechanically decided?</td><td>Turing machines, halting problem, arithmetical hierarchy, recursive functions</td><td>bounds what proofs and algorithms can achieve; the Computer-Science-side treatment of the same questions lives in [Theory of Computation](../Computer-Science/Algorithmics/Theory-of-Computation/Readme.md)</td></tr>
<tr><td>[Set theory](./Set-theory.md)</td><td>What is the universe of mathematical objects?</td><td>sets, cardinality, ordinals, axioms (ZFC), large cardinals</td><td>the standard foundational language for mathematics; provides the universe in which other structures live; underpins measure theory and hence [Probability and statistics](../Probability-and-statistics/Readme.md)</td></tr>
<tr><td>[Category theory](./Category-theory.md)</td><td>What is structure, and when do two structures behave the same?</td><td>categories, functors, natural transformations, limits, adjunctions</td><td>abstracts structure and morphism across all of mathematics; a rival foundation to set theory (topos theory) and the native language of modern algebra</td></tr>
<tr><td>[Type theory](./Type-theory.md)</td><td>How do propositions and programs correspond?</td><td>type systems, lambda calculus, Curry–Howard correspondence, dependent types, homotopy type theory</td><td>an alternative foundational framework at the intersection of logic and computability; underpins programming-language semantics and proof assistants (Coq, Agda, Lean)</td></tr>
</table>

<iframe src="../Logic-and-foundations.simulation.html" title="Interactive map of the five classes of logic and foundations"></iframe>

<details><summary>Details</summary>

**How to use the table as a map.** Mathematical logic and Computability and decidability are *meta*-disciplines: they study formal systems and mechanical procedures from the outside. Set theory, Category theory, and Type theory are *foundational languages*: each is a language in which mathematics itself can be written, and to a large extent they are rivals — a theorem of one can often be translated into another, but each makes different statements feel natural to express.

**Connections to the rest of Mathematics.** Set theory underpins measure theory, which in turn underpins [Probability and statistics](../Probability-and-statistics/Readme.md). Category theory supplies the language of algebraic structure used throughout [Algebraic and discrete mathematics](../Algebraic-and-discrete-mathematics/Readme.md). On the Computer Science side, type theory underpins programming-language semantics (see [Language Theory](../Computer-Science/Programming/Language-Theory.md)), and computability underpins the theory of algorithms (see [Theory of Computation](../Computer-Science/Algorithmics/Theory-of-Computation/Readme.md)).

**A note on breadth.** Mathematical logic and Computability and decidability are each broad enough to become topic pages with their own sub-categorizations; they are listed here as classes until those pages exist. Set theory, Category theory, and Type theory are likewise broad enough to be topic pages of their own.
</details>