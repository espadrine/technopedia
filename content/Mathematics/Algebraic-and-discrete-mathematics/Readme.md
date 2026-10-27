# Algebraic and discrete mathematics

Algebraic and discrete mathematics studies exact rules, symmetries, integers, and finite combinatorial structures. It is relevant whenever a problem needs equations, transformations, divisibility, counting, networks, or algorithms. It underlies computer science, cryptography, optimization, and theoretical reasoning.

## Brief history

- Antiquity: Diophantus formalizes arithmetic and Diophantine equations; al-Khwarizmi systematizes algebraic problem solving.
- 17th–18th century: Descartes and Fermat develop algebraic equations; Euler founds graph theory (Königsberg bridges) and combinatorics.
- 19th century: Gauss unifies number theory and algebra; Galois and Cayley create abstract algebra; Noether formalizes ring theory; combinatorics and finite geometry mature.
- 20th century onward: graph theory, combinatorics, and finite geometry expand the discrete-structure side of the field.

## Classes

The following sub-areas do not yet have dedicated pages in Technopedia.

<table>
<tr><th>Sub-area</th><th>Key question</th><th>Core objects</th><th>How it relates to the other classes</th><th>Start here when</th></tr>
<tr><td>Abstract algebra</td><td>What operations and invariants does this structured object admit?</td><td>groups, rings, fields, symmetries, Galois theory, ideals</td><td>supplies the structural language (groups, rings, fields) that number theory uses to study symmetries of number fields; provides the symmetry groups underlying linear algebra's spectral theory</td><td>symmetries, groups, rings, fields, Galois theory</td></tr>
<tr><td>Linear algebra</td><td>What is the structure of a space where you can add and scale?</td><td>vector spaces, matrices, eigenvalues, SVD, linear maps, inner products</td><td>generalizes the vector-space structure of abstract algebra to finite dimensions; supplies the matrix and eigenvalue tools that number theory (quadratic forms) and combinatorics (incidence matrices) exploit</td><td>vector spaces, matrices, eigenvalues, SVD, linear maps</td></tr>
<tr><td>Number theory</td><td>What arithmetic patterns exist among integers and their generalizations?</td><td>integers, primes, divisibility, congruences, number fields, Diophantine equations</td><td>applies abstract algebra (Galois groups, finite fields) to arithmetic; its congruence structure underlies combinatorial designs and graph coloring</td><td>primes, divisibility, congruences, Diophantine equations</td></tr>
<tr><td>Combinatorics</td><td>How many ways can finite objects be arranged?</td><td>counting, arrangements, designs, extremal problems, generating functions, partitions</td><td>counts the objects algebra acts on; supplies the counting invariants that graph theory uses (number of spanning trees, chromatic polynomial)</td><td>counting, arrangements, designs, extremal problems</td></tr>
<tr><td>Graph theory</td><td>How are objects connected, and what invariants govern that connectivity?</td><td>networks, connectivity, coloring, flows, matching, spanning trees, spectral graph theory</td><td>studies the connectivity structure that combinatorics counts; its spectral theory (eigenvalues of adjacency matrices) draws on linear algebra</td><td>networks, connectivity, coloring, flows, matching</td></tr>
</table>



<details><summary>Details</summary>

Use the table as a map:
- For symmetries, groups, rings, or Galois theory, begin with Abstract algebra.
- For vector spaces, matrices, eigenvalues, or SVD, begin with Linear algebra.
- For primes, divisibility, congruences, or Diophantine equations, begin with Number theory.
- For counting, arrangements, designs, or extremal problems, begin with Combinatorics.
- For networks, connectivity, coloring, flows, or matching, begin with Graph theory.

**How the classes nest and interact.** Abstract algebra is the structural foundation: it supplies the language of groups, rings, and fields that every other class uses. Linear algebra specializes the vector-space structure of abstract algebra to finite dimensions, providing the matrix and eigenvalue machinery that number theory (quadratic forms, lattices) and combinatorics (incidence matrices, adjacency matrices) exploit. Number theory applies the algebraic toolkit to the integers: Galois groups describe the symmetries of polynomial equations, and finite fields underpin both combinatorial designs and cryptographic protocols. Combinatorics and graph theory are the two faces of finite structure: combinatorics asks "how many ways can these objects be arranged?" while graph theory asks "how are they connected, and what invariants govern that connectivity?" The two are deeply intertwined—every graph is a combinatorial object, and every combinatorial design can be represented as a graph.

**Boundary with Logic and foundations.** [Logic and foundations](../Logic-and-foundations/Readme.md) handles the rules of reasoning and decidability (mathematical logic, computability, set theory). This page handles the combinatorial and algebraic structures those rules act upon. A reader asking "is this statement provable?" belongs to Logic and foundations; a reader asking "how many spanning trees does this graph have?" belongs here.

**Boundary with Computer Science.** Graph theory, combinatorics, and finite algebra are the mathematical foundations of [Computer Science](../Computer-Science/Readme.md), while their algorithmic applications live there: network routing and scheduling (graph theory), error-correcting codes and cryptography (number theory, finite fields), and machine learning (linear algebra). See [Cryptography](../Computer-Science/Information-Theory/Cryptography.md) for the number-theoretic foundations of public-key systems, [Theory of Computation](../Computer-Science/Algorithmics/Theory-of-Computation.md) for the computability boundary, and [Graphs](../Computer-Science/Algorithmics/Search-and-Data-Structures/Graphs.md) for algorithmic graph algorithms.

**Cross-references to other Mathematics classes.** [Analysis](../Analysis/Readme.md) uses vector spaces and Banach algebras (linear algebra, abstract algebra); [Probability and statistics](../Probability-and-statistics/Readme.md) uses finite fields for error-correcting codes and Markov chains (graph theory); [Geometry and topology](../Geometry-and-topology/Readme.md) contains algebraic geometry, the bridge between algebraic structure and geometric objects defined by polynomial equations.

**Application domains.** Cryptography relies on number theory (finite fields, elliptic curves) and abstract algebra (group operations). Coding theory and error correction draw on linear algebra (code spaces) and combinatorics (designs). Algorithm design and optimization use graph theory (network flows, matching) and combinatorics (scheduling, counting). Machine learning and signal processing are built on linear algebra (eigenvalues, SVD, matrix factorization).

Abstract algebra, Linear algebra, Number theory, Combinatorics, and Graph theory are each broad enough to be topic pages with their own categorizations; they are listed here as sub-areas but do not yet have their own pages.

</details>