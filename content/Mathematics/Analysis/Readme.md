# Analysis

Analysis studies continuous change, limits, convergence, and infinite processes. It is relevant whenever a problem involves functions, derivatives, integrals, differential equations, approximation, or the behavior of sequences and series. It underlies physics, engineering, economics, and the quantitative sciences.

## Classes

Each class is a topic page with its own categorization.

<table>
<tr><th>Page</th><th>Key question</th><th>Core objects</th></tr>
<tr><td>[Real analysis](./Real-analysis/Readme.md)</td><td>How do limits, continuity, differentiation, and integration behave on the real line?</td><td>limits, continuity, derivatives, Riemann and Lebesgue integration, sequences and series</td></tr>
<tr><td>[Functional analysis](./Functional-analysis/Readme.md)</td><td>What structure do infinite-dimensional spaces of functions and the operators on them have?</td><td>Banach and Hilbert spaces, operators, spectral theory, distributions</td></tr>
<tr><td>[Differential equations](./Differential-equations/Readme.md)</td><td>What governs change: which functions satisfy an equation relating them to their derivatives?</td><td>ODEs, PDEs, existence and uniqueness, stability, dynamical systems</td></tr>
<tr><td>[Complex analysis](./Complex-analysis/Readme.md)</td><td>What happens when differentiability is required on the complex plane?</td><td>holomorphic functions, contour integration, conformal mappings, residues, Riemann surfaces</td></tr>
<tr><td>[Numerical analysis](./Numerical-analysis/Readme.md)</td><td>How do we compute approximations to these objects, and how accurate are the results?</td><td>interpolation, quadrature, iterative methods, discretization, error and stability analysis</td></tr>
</table>

<details><summary>Details</summary>

Use the table as a map:
- For limits, continuity, derivatives, or integration on the real line, begin with Real analysis.
- For infinite-dimensional spaces, operators, or spectral methods, begin with Functional analysis.
- For equations governing change, stability, or dynamical systems, begin with Differential equations.
- For holomorphic functions, contour integrals, conformal maps, or residue calculations, begin with Complex analysis.
- For computable approximations with error bounds, begin with Numerical analysis.

**How the classes nest.** Real analysis is the foundation: it supplies the notions of limit, continuity, and integration on ℝ that every other class builds upon. Functional analysis generalizes those notions to infinite-dimensional vector spaces (Banach and Hilbert spaces), turning sequences into vectors and derivatives into operators. Differential equations apply both: real analysis gives existence and uniqueness theorems, while functional analysis provides the infinite-dimensional setting for PDEs and spectral methods. Complex analysis extends the domain from ℝ to ℂ; the resulting rigidity of holomorphic functions (determined entirely by values on any open set) yields theorems with no real analogue, and it feeds back into the other classes by supplying powerful evaluation and solution techniques.

**Cross-cutting areas.** Harmonic analysis — the decomposition of functions into frequency components via Fourier series and transforms — is not a separate class here because it draws on all four: convergence of Fourier series is real analysis, the transforms are operators on L² Hilbert spaces (functional analysis), contour integration evaluates Fourier integrals (complex analysis), and fast transforms drive numerical analysis. Measure theory, the rigorous foundation of integration, is developed under [Measure theory](../../Probability-and-statistics/Measure-theory/Readme.md) in [Probability and statistics](../../Probability-and-statistics/Readme.md); the L<sup>p</sup> spaces it produces are the central objects of functional analysis. Numerical analysis, listed as a class above, is the computational layer over all four theoretical classes.

**Related pages.** The parent class is [Mathematics](../../Readme.md); the sibling classes are [Logic and foundations](../../Logic-and-foundations/Readme.md), [Algebraic and discrete mathematics](../../Algebraic-and-discrete-mathematics/Readme.md), [Geometry and topology](../../Geometry-and-topology/Readme.md), and [Probability and statistics](../../Probability-and-statistics/Readme.md).
</details>

## An interactive look: Fourier partial sums

The simulation below shows a Fourier series — the workhorse of harmonic analysis — converging to a target function as more terms are added. Notice the Gibbs overshoot near the square wave's jumps: pointwise convergence does not prevent a persistent overshoot of about 9% of the jump.

<iframe src="./Analysis.simulation.html" title="Fourier series partial sums converging to a target function" style="width:100%;max-width:700px;height:420px;border:1px solid #ccc;border-radius:6px;"></iframe>
