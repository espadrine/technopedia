# Complex analysis

Complex analysis studies functions that are differentiable in the complex plane. Complex differentiability is far more rigid than real differentiability: a once-differentiable function is automatically infinitely differentiable, and its global behavior is controlled by its values on any small open set.

## Brief history

- 18th century: Euler and d'Alembert manipulate complex quantities formally; the Cauchy–Riemann equations appear.
- 19th century: Cauchy proves his integral theorem and formula; Riemann develops the geometric theory (Riemann surfaces, conformal mapping); Weierstrass builds the power-series approach.
- 20th century: the theory of Riemann surfaces and several complex variables grows out of it; residue techniques become a standard tool across mathematics and physics.

## Main branches

<table>
<tr><th>Page</th><th>Key question</th><th>Core objects</th></tr>
<tr><td>[Holomorphic functions](./Holomorphic-functions.md)</td><td>What does complex differentiability mean, and what rigidity does it force?</td><td>Cauchy–Riemann equations, power series, identity theorem, maximum modulus principle</td></tr>
<tr><td>[Complex integration](./Complex-integration.md)</td><td>How do contour integrals of holomorphic functions behave, and how do they evaluate real integrals?</td><td>Cauchy's integral theorem and formula, Liouville's theorem, residue theorem</td></tr>
<tr><td>[Conformal mapping](./Conformal-mapping.md)</td><td>Which maps preserve angles, and how do they solve two-dimensional potential problems?</td><td>angle-preserving maps, Möbius transformations, Riemann mapping theorem</td></tr>
<tr><td>[Analytic continuation and Riemann surfaces](./Analytic-continuation-and-Riemann-surfaces.md)</td><td>How do we extend functions past their domain and treat multi-valued functions geometrically?</td><td>analytic continuation, monodromy, branch points, Riemann surfaces</td></tr>
</table>

<details><summary>Details</summary>

**How the branches nest.** [Holomorphic functions](./Holomorphic-functions.md) is the foundation: it defines the object of study (a function differentiable in the complex plane) and the rigidity theorems (identity theorem, maximum modulus principle) that everything else exploits. [Complex integration](./Complex-integration.md) turns that rigidity into a computational engine: Cauchy's formula expresses a function's values and derivatives in terms of a contour integral, and the residue theorem reduces a closed contour integral to a finite sum of local data. [Conformal mapping](./Conformal-mapping.md) uses the angle-preserving property of non-constant holomorphic maps to transfer problems between domains, and [Analytic continuation and Riemann surfaces](./Analytic-continuation-and-Riemann-surfaces.md) studies what happens when a function's domain is pushed past its original boundary, including the multi-valued functions that require a geometric surface to be made single-valued.

**Out of scope: several complex variables.** The history mentions several complex variables, the theory of holomorphic functions of $`n \geq 2` complex variables. It is deliberately **not** one of the four branches above: in several variables the geometry of domains changes qualitatively (there is no Riemann mapping theorem for general domains, and the maximum modulus principle takes a different form), so it is a distinct subject. The four branches here cover the one-variable theory only.
</details>

## Where to go next

- The parent class, with its sibling sub-areas, is [Analysis](../Readme.md).
- Residue and contour techniques feed back into the other classes: they evaluate real integrals from [Real analysis](../Real-analysis/Readme.md), invert Laplace transforms in [Differential equations](../Differential-equations/Readme.md), and supply spectral tools in [Functional analysis](../Functional-analysis/Readme.md).
