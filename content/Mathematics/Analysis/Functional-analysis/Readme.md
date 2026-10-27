# Functional analysis

Functional analysis studies infinite-dimensional vector spaces (Banach and Hilbert spaces) and the operators between them. It generalizes the limits, norms, and derivatives of real analysis to spaces of functions, and it supplies the natural setting for quantum mechanics, spectral theory, and the modern theory of differential equations.

## Brief history

- Early 20th century: Hilbert, Fréchet, and Riesz study spaces of functions with a geometry (norm, inner product) modeled on Euclidean space.
- 1920s–1930s: Banach's fixed-point theorem, the Hahn–Banach theorem, the open mapping theorem, and the uniform boundedness principle consolidate the field; von Neumann develops Hilbert space theory for quantum mechanics.
- Mid-20th century: spectral theory of operators and Schwartz's distribution theory extend the scope to generalized functions.

## Main branches

Functional analysis is organized around four distinct objects of study: the **spaces** themselves, the **operators** acting on them, the **generalized functions** (distributions) that extend the notion of a function, and the **applications** that make the theory indispensable. Each branch is a separate page.

<table>
<tr><th>Page</th><th>Key question</th><th>Core objects</th></tr>
<tr><td>[Spaces](./Spaces.md)</td><td>What structure do infinite-dimensional vector spaces carry, and how do they relate to their duals?</td><td>normed, Banach, and Hilbert spaces; completeness, orthogonality, bases, duality, reflexivity</td></tr>
<tr><td>[Operators](./Operators.md)</td><td>How do linear maps between these spaces behave, and how can they be decomposed?</td><td>bounded and unbounded operators, adjoints, compact operators, the spectral theorem</td></tr>
<tr><td>[Distributions](./Distributions.md)</td><td>How can we extend functions so that differentiation always exists?</td><td>generalized functions, the Dirac delta, weak derivatives, test functions</td></tr>
<tr><td>[Applications](./Applications.md)</td><td>Where does this machinery solve real problems?</td><td>quantum mechanics (Hilbert spaces, observables), PDEs (existence via weak solutions)</td></tr>
</table>

<details><summary>Details</summary>

**How the branches nest.** [Spaces](./Spaces.md) is the foundation: everything else lives on a space. [Operators](./Operators.md) is the layer of maps between spaces — the "derivatives" and "integrals" of functional analysis — and its central result, the spectral theorem, is the infinite-dimensional analogue of diagonalizing a matrix. [Distributions](./Distributions.md) widens the class of objects a space can contain, so that differentiation becomes always defined (at the cost of giving up pointwise values). [Applications](./Applications.md) shows the payoff: the same Hilbert-space and operator language that abstracts Euclidean geometry is exactly the language of quantum mechanics, and the same weak/compact-operator ideas give existence theorems for PDEs.

**Why the split is by object, not by theme.** Reflexivity and weak topologies are properties *of spaces*, so they live in [Spaces](./Spaces.md) rather than as a separate branch; the spectral theorem is a statement *about operators*, so it lives in [Operators](./Operators.md). Keeping each page tied to one kind of object (a space, a map, a generalized function, or a use) makes the concepts easy to separate mentally and to find.
</details>

## Where to go next

- The parent class, with its sibling sub-areas, is [Analysis](../Readme.md).
- The measure-theoretic machinery behind the L<sup>p</sup> spaces of functional analysis is described under [Measure theory](../../Probability-and-statistics/Measure-theory/Readme.md).