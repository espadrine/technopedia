# Measure theory

Measure theory is the mathematical framework that generalises length, area, volume, and the notion of "size" to arbitrary collections of sets, and that rebuilds integration on that generalised notion. It is the language in which modern probability, harmonic analysis, ergodic theory, and much of functional analysis are stated. Whenever a problem involves assigning a "volume" to an irregular set, integrating a function that is not Riemann-integrable, or reasoning about random phenomena with a rigorous foundation, measure theory is the underlying machinery.

<details><summary>Details</summary>

The basic object is a measure space $`(X, \mathcal{F}, \mu)`: a set $`X`, a sigma-algebra $`\mathcal{F}` of measurable sets, and a measure $`\mu` assigning nonnegative sizes to those sets. Lebesgue integration and probability theory are built by applying this structure to different choices of $`X`, $`\mathcal{F}`, and $`\mu`.

</details>

## History

- **1899 – Lebesgue's integral.** Henri Lebesgue introduces his integral to handle functions (e.g. the Dirichlet function) that the Riemann integral cannot capture, by slicing the *range* rather than the domain.
- **1914 – Carathéodory's extension theorem.** Carathéodory shows that any outer measure satisfying countable additivity on a semiring extends uniquely to a measure on the generated sigma-algebra, giving a constructive recipe for building measures.
- **1932 – Banach's *Théorie des opérations linéaires*.** The $`L^p` spaces and the associated convergence theorems are organised into the theory of Banach and Hilbert spaces, making measure-theoretic integration a tool of functional analysis.
- **1933 – Kolmogorov's axioms.** Andrey Kolmogorov recasts probability as a measure on a sigma-algebra, unifying the discrete and continuous cases under a single set-theoretic foundation.

> **Authoritative sources**
> - [Folland, Real Analysis: Techniques of Modern Analysis](https://www.ams.org/bookstore/getitem?servlet=GetItem&code=STML/34)
> - [Bogachev, Measure Theory, Vol. 1](https://link.springer.com/book/10.1007/978-3-540-34519-3)

## Categorisation

Measure theory is built in layers: each layer is a distinct mathematical object that the next layer operates on.

<table>
<tr><th>Layer</th><th>Core object</th><th>Key property</th><th>Depends on</th><th>Typical example</th></tr>
<tr><td>Measure space</td><td>A set <i>X</i> equipped with a σ-algebra ℱ</td><td>Countable unions and complements stay in ℱ</td><td>—</td><td>ℝ with the Borel σ-algebra</td></tr>
<tr><td>Measures</td><td>A map μ: ℱ → [0,∞]</td><td>μ(∅)=0; countable additivity</td><td>Measure space</td><td>Lebesgue measure on ℝ</td></tr>
<tr><td>Measurable functions</td><td><i>f</i>: <i>X</i> → ℝ with <i>f</i><sup>−1</sup>(<i>B</i>) ∈ ℱ for all Borel <i>B</i></td><td>Preimages of Borel sets are measurable</td><td>Measure space</td><td>Indicator functions, continuous functions</td></tr>
<tr><td>Lebesgue integral</td><td>∫ <i>f</i> dμ, a linear functional on measurable functions</td><td>Monotone convergence; dominated convergence</td><td>Measures, Measurable functions</td><td>∫<sub>0</sub><sup>1</sup> <i>x</i><sup>2</sup> dx = 1/3</td></tr>
<tr><td><i>L</i><sup><i>p</i></sup> spaces</td><td>Equivalence classes [<i>f</i>] with ‖<i>f</i>‖<sub><i>p</i></sub> < ∞</td><td>Minkowski inequality; completeness for 1 ≤ <i>p</i> ≤ ∞</td><td>Lebesgue integral</td><td><i>L</i><sup>2</sup>(ℝ) with inner product</td></tr>
</table>

The five layers form a strict dependency chain: a measure cannot be defined without a sigma-algebra; a function cannot be integrated unless it is measurable; and convergence in $`L^p` cannot be discussed without the integral. Each layer answers one question: *which sets exist? how big are they? which maps respect the structure? how do we sum? what is the space of integrable functions like?*

Note that the third layer (measurable functions) is a *relationship* between two measurable structures (the sigma-algebra on the domain and the sigma-algebra on the codomain) rather than a standalone object with its own axioms. It is listed as a separate layer because it is the essential bridge that makes integration possible.

### Subtopics

- [Measure space](./Measure-space.md) — sigma-algebras, Borel sets, the Carathéodory construction.
- [Measures](./Measures.md) — countable additivity, outer measures, Radon–Nikodym theorem, product measures.
- [Measurable functions](./Measurable-functions.md) — preimage criterion, simple functions, pointwise limits.
- [Lebesgue integral](./Lebesgue-integral.md) — construction from simple functions, monotone and dominated convergence, Fubini and Tonelli.
- [Lp spaces](./Lp-spaces.md) — norms, Hölder and Minkowski inequalities, completeness, duality.

The usual path is: measure space, then measures, then measurable functions, then the Lebesgue integral, then $`L^p` spaces. Probability is the specialisation where the total measure is 1.

<iframe src="./Measure-theory.simulation.html" title="Measure-theory simulation"></iframe>