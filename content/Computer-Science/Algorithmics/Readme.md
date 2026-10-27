# Algorithmics

Algorithmics studies what can be computed, how data is organized for efficient access, how geometric and image data becomes pixels, and how procedures transform data into results. It is relevant whenever a problem must be decided, represented, drawn, or optimized before implementation.

## Utility

- It formalizes what can be computed and what cannot, and bounds the cost of the computation.
- It chooses data representations that make operations cheap.
- It turns geometric and image data into pixels on a display.
- It optimizes continuous and discrete objectives, from a closed-form solve to a learned model.

<details><summary>Details</summary>

Algorithmics sits at the leftmost end of the computation pipeline: it takes a problem statement and produces a precise procedure with a provable cost bound. The four classes partition the field by first principles: **theory of computation** asks what is computable and at what asymptotic cost; **search and data structures** asks how to organize data for cheap access; **graphics** asks how to turn geometric and image data into pixels; **optimization** asks how to find a minimum of an objective. The classes are tightly coupled: the choice of data structure (a representation) determines which algorithms are efficient, the complexity of the algorithm determines whether the problem is tractable at scale, and optimization extends this to continuous settings where the "algorithm" is an iterative procedure whose convergence rate replaces the discrete step count.

Algorithmics rests on [Mathematics](../../Mathematics/Readme.md): formal logic and computability (see [Logic and foundations](../../Mathematics/Logic-and-foundations/Readme.md)), combinatorics and discrete structure (see [Algebraic and discrete mathematics](../../Mathematics/Algebraic-and-discrete-mathematics/Readme.md)), and probability (see [Probability](../../Mathematics/Probability-and-statistics/Probability/Readme.md)). It also draws on [Physics](../../Physics/Readme.md) for the physical limits of computation and for the optics and electromagnetism underlying rendering.

</details>

## History

- 1936: Turing formalizes computation with Turing machines.
- 1972: Karp's 21 NP-complete problems clarify the landscape of hard combinatorial problems.
- 1994: The PCP theorem shows NP-hard problems have locally checkable proofs, sharpening the limits of approximation.
- 2010s: Stochastic gradient descent scales to deep neural networks, making learned representations a central object of algorithmics.

## Classes

The four classes partition algorithmics by first principles: **theory of computation** asks what is computable and at what asymptotic cost; **search and data structures** asks how to organize data for cheap access; **graphics** asks how to turn geometric and image data into pixels; **optimization** asks how to find a minimum of an objective, from a closed-form solve to a learned model. No class subsumes another: a complexity bound is not a data structure, a data structure is not a rendered frame, and a rendered frame is not a loss minimum.

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./Theory-of-Computation/Readme.md'>Theory of computation</a></td><td>Turing machines, decidability, complexity classes, big-O bounds</td><td>Decidability, P/NP membership, asymptotic bounds</td><td>What is computable and at what asymptotic cost; proves existence and cost bounds without prescribing an implementation</td></tr>
<tr><td><a href='./Search-and-Data-Structures/Readme.md'>Search and data structures</a></td><td>Lists, key-value stores, text search, database theory, graphs</td><td>Access time, space, cache locality</td><td>How to organize data for cheap access; does not model the physical memory hierarchy</td></tr>
<tr><td><a href='./Graphics/Readme.md'>Graphics</a></td><td>Geometry, rendering, image processing</td><td>Frame rate, image quality, memory</td><td>How to turn geometric and image data into pixels; does not model the physical display or GPU</td></tr>
<tr><td><a href='./Optimization-and-Differentiation/Readme.md'>Optimization</a></td><td>Gradients, iterative solvers, convexity, neural networks</td><td>Convergence rate, loss</td><td>How to find a minimum of an objective; does not specify how to encode or transmit the solution</td></tr>
</table>

<iframe src="../Algorithmics.simulation.html" title="The four classes of algorithmics as a pipeline from problem to result"></iframe>

> **Authoritative sources**
> - [On Computable Numbers, with an Application to the Entscheidungsproblem](https://www.turingarchive.ac.uk/radiolab/OnComputableNumbers.pdf)
> - [The Art of Computer Programming, Volume 1](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)

## Explanation pages

Each class above contains explanation pages that go deeper into a single idea:

- [Computability and Complexity Classes](./Computability-and-Complexity-Classes.md) — Turing machines, decidability, and the time-based complexity classes (P, NP, BPP, BQP, PSPACE, PH).
- [Space and Parallel Complexity](./Resource-Hierarchy-and-Parallelism.md) — space complexity classes (L, NL, PSPACE, EXPSPACE) and circuit complexity (NC, AC⁰).
- [Learning Paradigms and Models](./Learning-Paradigms-and-Models.md) — neural network architecture, loss, data paradigms, training, and evaluation.

