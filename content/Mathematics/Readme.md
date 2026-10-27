# Mathematics

Mathematics studies patterns, quantity, structure, change, and space. It provides the language of proof and formal specification (logic), the structure of symmetries and exact invariants (algebra), the calculus of continuous change (analysis), the invariants of shape and space (geometry/topology), and the quantification of uncertainty (probability/statistics). Each of these maps to a distinct class below. It is relevant whenever a problem needs precise definitions, proof, calculation, modeling, optimization, or inference. Analysis and geometry underpin the modeling of continuous change in Physics; logic and algebra formalize computation in Computer Science; optimization and statistics drive engineering in Manufacturing.

## Brief history

- Antiquity: counting, arithmetic, and practical geometry in Mesopotamia, Egypt, and Greece.
- Early modern: algebraic equations and calculus become central tools.
- 19th century: rigor, set theory, logic, and non-Euclidean geometry reshape foundations.
- 20th century onward: Kolmogorov's axioms formalize probability; functional analysis (Banach, von Neumann) becomes a central discipline.

## Classes

<table>
<tr><th>Page</th><th>Key question</th><th>Core objects</th><th>How it relates</th></tr>
<tr><td>[Logic and foundations](./Logic-and-foundations/Readme.md)</td><td>What rules govern reasoning?</td><td>mathematical logic, set theory, proof theory, model theory, computability, category theory, type theory</td><td>axiomatic method and proof theory underpin all other classes; computability and decidability bound what can be computed</td></tr>
<tr><td>[Algebraic and discrete mathematics](./Algebraic-and-discrete-mathematics/Readme.md)</td><td>What operations, symmetries, or arrangements do exact objects admit?</td><td>groups, rings, vector spaces, symmetries, number theory (primes, divisibility, congruences, number fields)<br>integers, graphs, counting, combinatorial structures</td><td>algebraic structure (groups, symmetries) and discrete organization (counting, graphs); vector spaces for analysis; sigma-algebras for probability; finite fields for algorithms</td></tr>
<tr><td>[Analysis](./Analysis/Readme.md)</td><td>How does continuous change behave?</td><td>limits, functions, continuity, convergence, derivatives, integration, differential equations, functional analysis</td><td>Banach spaces, manifolds, and differential operators model continuous change; draws on vector spaces (algebra) and topological/measure structures (geometry)</td></tr>
<tr><td>[Geometry and topology](./Geometry-and-topology/Readme.md)</td><td>What shape does space have?</td><td>shapes, spaces, distances, open sets, connectedness, compactness, curvature, manifolds</td><td>manifolds, curvature, and homotopy classes supply spatial invariants to analysis (differential geometry) and algebra (representation theory on symmetric spaces)</td></tr>
<tr><td>[Probability and statistics](./Probability-and-statistics/Readme.md)</td><td>How is uncertainty quantified?</td><td>random variables, distributions, expectation, stochastic processes, measure theory, statistical inference</td><td>measure-theoretic probability and stochastic processes quantify uncertainty; draws on Lebesgue integration (analysis) and sigma-algebras (algebra)</td></tr>
</table>

<iframe src="./Mathematics.simulation.html" title="Dependency graph of the five classes of mathematics"></iframe>

<details><summary>Details</summary>

The five classes are keyed to the fundamental objects mathematics studies: the rules of reasoning (logic and foundations), algebraic structure and discrete organization (algebraic and discrete mathematics), continuous change and infinite processes (analysis), spatial structure and shape (geometry and topology), and uncertainty (probability and statistics). Each class maps to a first-principle aspect of reality, so a reader can find the right branch directly.

**Logic as foundation.** Logic and foundations is the bedrock: it supplies the language of proof, the axiomatic method, and the study of computability and decidability. Every other class rests on it, but it is distinct in that it studies the rules of reasoning themselves rather than the objects being reasoned about.

**Inter-class dependencies.** Beyond the foundational role of logic, the four remaining classes support each other: [Analysis](./Analysis/Readme.md) draws on [Algebraic and discrete mathematics](./Algebraic-and-discrete-mathematics/Readme.md) (vector spaces, Banach algebras) and [Geometry and topology](./Geometry-and-topology/Readme.md) (topology, manifolds); [Probability and statistics](./Probability-and-statistics/Readme.md) uses analysis (convergence, integration) and algebra (sigma-algebras, measurable maps); [Geometry and topology](./Geometry-and-topology/Readme.md) supplies the spaces and invariants that analysis and algebra exploit; and [Algebraic and discrete mathematics](./Algebraic-and-discrete-mathematics/Readme.md) feeds into all three (linear algebra, symmetry groups, Markov chains). The interactive graph above visualizes these dependencies.

**Two sub-concerns within algebraic and discrete mathematics.** This class bundles two distinct first-principle concerns: (a) algebraic structure and symmetry (groups, rings, vector spaces, Galois theory), where the question is "what operations and invariants does this object admit?", and (b) finite combinatorial organization (counting, graph theory, networks, design theory), where the question is "how many ways can these discrete objects be arranged or connected?". A reader asking about the Galois group of a polynomial belongs to (a); a reader asking about the chromatic number of a graph or the number of spanning trees belongs to (b). Both share the common thread of exact, finite, or algebraically structured objects, but the mental models differ.

**Applied mathematics.** Applied mathematics is a cross-cutting mode of application rather than a separate class. Optimization theory draws on [Analysis](./Analysis/Readme.md) (convexity, variational methods) and [Algebraic and discrete mathematics](./Algebraic-and-discrete-mathematics/Readme.md) (linear algebra, combinatorial optimization); numerical methods draw on [Analysis](./Analysis/Readme.md) (approximation, convergence) and [Probability and statistics](./Probability-and-statistics/Readme.md) (Monte Carlo, stochastic approximation); mathematical modeling draws on all five classes. [Information Theory](../Computer-Science/Information-Theory/Readme.md), catalogued under Computer Science in this encyclopedia, has deep roots in [Probability and statistics](./Probability-and-statistics/Readme.md) (entropy as a functional on distributions) and [Algebraic and discrete mathematics](./Algebraic-and-discrete-mathematics/Readme.md) (coding theory, finite fields). See the relevant class pages for the underlying theory.

</details>