# Theory of Computation

Theory of computation asks what can be computed at all, and at what cost. It is relevant whenever a problem must be decided (does an answer exist, and can a machine find it?), bounded (how long, how much memory, how much parallelism will it take?), or classified (is it as hard as the hardest problems in its family?) before any concrete implementation is chosen.

## Utility

- It separates the decidable from the undecidable, so you know when no algorithm can exist.
- It bounds the time, space, and parallel depth of a computation in terms of input size.
- It classifies problems (P, NP, NP-complete) so you know when to settle for an approximation or a heuristic.

<details><summary>Details</summary>

The two subtopics below partition theory of computation by the *resource* being bounded. **Computability and complexity classes** asks *how much time* a computation needs and which problems are decidable at all; **space and parallel complexity** asks *how much memory* a computation needs and *how much can be parallelized*. The two are linked: a machine using little space has few configurations, so its computation can be laid out as a shallow circuit.

Theory of computation is the leftmost, most abstract layer of [Algorithmics](../Readme.md): it proves existence and cost bounds without prescribing an implementation. It rests on [Mathematics](../../../Mathematics/Readme.md), in particular on [Logic and foundations](../../../Mathematics/Logic-and-foundations/Readme.md) (formal systems, decidability) and on [Algebraic and discrete mathematics](../../../Mathematics/Algebraic-and-discrete-mathematics/Readme.md) (combinatorics, counting arguments).

</details>

## History

- 1936: Turing formalizes computation with Turing machines and shows the halting problem undecidable; Church gives the lambda calculus the same year.
- 1971: Cook and Karp establish NP-completeness and the landscape of hard combinatorial problems.
- 1982: The polynomial hierarchy is formalized, refining the P vs NP question into a ladder of classes.
- 1994: The PCP theorem shows NP-hard problems have locally checkable proofs, sharpening the limits of approximation.

## Classes

The two classes partition theory of computation by the resource under study: time and decidability on one side, memory and parallelism on the other.

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='../Computability-and-Complexity-Classes.md'>Computability and Complexity Classes</a></td><td>Turing machines, decidability, P/NP, complexity classes</td><td>Decidability, P/NP membership, asymptotic time bounds</td><td>What is computable and at what asymptotic time cost; proves existence and cost bounds without prescribing an implementation</td></tr>
<tr><td><a href='../Resource-Hierarchy-and-Parallelism.md'>Space and Parallel Complexity</a></td><td>Space complexity classes (L, NL, PSPACE, EXPSPACE), circuit complexity, NC hierarchy</td><td>Space bounds, circuit depth, parallel speedup</td><td>Theoretical limits on memory and parallelism; does not model physical hardware caches or design concrete parallel algorithms</td></tr>
</table>

> **Authoritative sources**
> - [On Computable Numbers, with an Application to the Entscheidungsproblem](https://www.turingarchive.ac.uk/radiolab/OnComputableNumbers.pdf)
> - [Computers and Intractability: A Guide to the Theory of NP-Completeness (Garey & Johnson)](https://en.wikipedia.org/wiki/Computers_and_Intractability)
