# Real analysis

Real analysis puts calculus on a rigorous footing on the real line: it studies limits, continuity, differentiation, and integration through the lens of inequalities and ε–δ arguments, and it extends integration to the Lebesgue theory where arbitrary infinite processes (series, pointwise limits, interchanges of limit and integral) can be controlled. It is the foundation on which every other branch of analysis — and much of physics, engineering, and probability — is built.

## Brief history

- 17th century: Newton and Leibniz develop calculus, but rely on intuitive notions of limits.
- 19th century: Cauchy and Weierstrass give exact definitions of limit, continuity, and the derivative; Riemann gives a rigorous definition of the integral.
- Late 19th–early 20th century: Cantor's set theory and Weierstrass's pathological examples (continuous nowhere-differentiable functions) force a set-theoretic foundation.
- 1902: Lebesgue's integral makes the interchange of limits and integrals systematic, enabling modern probability and PDE theory.

## Main branches

<table>
<tr><th>Page</th><th>Key question</th><th>Core objects</th></tr>
<tr><td>[Limits and continuity](./Limits-and-continuity.md)</td><td>How do functions behave near a point, and when does a sequence of functions converge "together"?</td><td>ε–δ limits, continuity, pointwise vs uniform convergence, compactness (Bolzano–Weierstrass, Heine–Borel)</td></tr>
<tr><td>[Differentiation](./Differentiation.md)</td><td>How fast does a function change, and how well can it be approximated by polynomials?</td><td>derivative, mean value theorem, Taylor expansion, inverse and implicit function theorems</td></tr>
<tr><td>[Integration](./Integration.md)</td><td>How do we measure accumulated quantity, and when may limits and integrals be interchanged?</td><td>Riemann integral, Lebesgue integral, monotone and dominated convergence</td></tr>
<tr><td>[Sequences and series](./Sequences-and-series.md)</td><td>When does an infinite sum converge, and how do we test it?</td><td>convergence tests, power series, uniform convergence of series</td></tr>
<tr><td>[Multivariable analysis](./Multivariable-analysis.md)</td><td>How do limits, derivatives, and integrals behave in ℝⁿ?</td><td>partial derivatives, Jacobian, multivariable mean value theorem, change of variables, line and surface integrals</td></tr>
</table>

<details><summary>Details</summary>

**How the branches nest.** Limits and continuity is the foundation: every derivative is a limit of a difference quotient, and every integral is a limit of sums. Differentiation and integration both build on the ε–δ language and on compactness (which guarantees extrema and existence). Sequences and series is the infinite-process layer: it asks when an infinite sum converges and how to test it.

**Where "Sequences and series" meets "Limits and continuity."** Convergence of a sequence is, at its core, a limit concept, so the two branches overlap. The split is by *object of study*: [Limits and continuity](./Limits-and-continuity.md) covers the limit of a single function, continuity, and the convergence of *sequences of functions* (pointwise vs uniform) together with the topological properties (compactness) that control them. [Sequences and series](./Sequences-and-series.md) covers the *numerical* convergence of series — the tests (ratio, root, comparison, integral) that decide whether $`\sum a_n` converges — and power series, where the limit object is a function defined by an infinite sum.

**Where multivariable analysis fits.** The first four branches live on the real line. [Multivariable analysis](./Multivariable-analysis.md) is the extension to $`\mathbb{R}^n`: the same four ideas (limits, derivatives, integrals, series) reappear with partial derivatives, the Jacobian, and multiple integrals. It is listed as a fifth branch because differentiation and integration in several variables (Jacobian, change of variables, the multivariable mean value theorem) are a major part of real analysis that the one-variable branches do not cover.

**Topological underpinnings.** The compactness theorems used throughout (Bolzano–Weierstrass, Heine–Borel) are special cases of general topological notions — open sets, compactness, connectedness — developed under [Geometry and topology](../../Geometry-and-topology/Readme.md). Real analysis uses the one-dimensional instances; the general framework lives there.
</details>

## Where to go next

- The measure-theoretic foundation of the Lebesgue integral is described under [Measure theory](../../Probability-and-statistics/Measure-theory/Readme.md).
- The topological underpinnings of compactness and connectedness (open sets, compactness, connectedness in general spaces) are developed under [Geometry and topology](../../Geometry-and-topology/Readme.md).
- The parent class, with its sibling sub-areas, is [Analysis](../Readme.md).
