# Measures

A measure is a function that assigns a "size" to measurable sets in a way that generalizes length, area, and volume. It answers the question *how big is this set?* Measures underpin probability (as probability measures), signal processing (via spectral measures), and information theory (via entropy of measures), making them a foundational tool well beyond pure mathematics.

> **Authoritative sources**
> - [Folland, Real Analysis: Techniques of Modern Analysis](https://www.ams.org/bookstore/getitem?servlet=GetItem&code=STML/34)
> - [Bogachev, Measure Theory, Vol. 1](https://link.springer.com/book/10.1007/978-3-540-34519-3)

## Definition

A **measure** on a sigma-algebra $`\mathcal{F}` over $`X` is a function $`\mu: \mathcal{F} \to [0, \infty]` such that:

1. $`\mu(\varnothing) = 0`
2. **Countable additivity:** if $`A_1, A_2, \ldots \in \mathcal{F}` are pairwise disjoint, then
$`\mu\!\left(\bigcup_{i=1}^{\infty} A_i\right) = \sum_{i=1}^{\infty} \mu(A_i)`

<details><summary>Details</summary>

Countable additivity implies **countable subadditivity**: for any (not necessarily disjoint) $`A_i \in \mathcal{F}`,
$`\mu\!\left(\bigcup_i A_i\right) \leq \sum_i \mu(A_i)`

It also implies **monotonicity**: if $`A \subseteq B` with $`A, B \in \mathcal{F}`, then $`\mu(A) \leq \mu(B)`.

A measure is **finite** if $`\mu(X) < \infty`, **$`\sigma`-finite** if $`X = \bigcup_n A_n` with $`\mu(A_n) < \infty`, and a **probability measure** if $`\mu(X) = 1`.

</details>

## Examples

<table>
<tr><th>Measure</th><th>Definition</th><th>σ-finite</th><th>Complete</th><th>Total mass</th></tr>
<tr><td>Lebesgue measure λ on ℝ</td><td>λ(A) = length of A (for measurable A)</td><td>Yes</td><td>Yes (Lebesgue σ-algebra)</td><td>∞</td></tr>
<tr><td>Counting measure on X</td><td>μ(A) = |A| (cardinality)</td><td>Only if X is countable</td><td>Yes</td><td>|X|</td></tr>
<tr><td>Dirac measure δₐ</td><td>δₐ(A) = 1 if a ∈ A, else 0</td><td>Yes</td><td>Yes</td><td>1</td></tr>
<tr><td>Probability measure P</td><td>P(Ω) = 1, P(A) ≥ 0</td><td>Yes</td><td>Depends on completion</td><td>1</td></tr>
<tr><td>Gaussian measure N(μ,σ²)</td><td>N(A) = ∫<sub>A</sub> (1/σ√(2π)) e<sup>−(x−μ)²/(2σ²)</sup> dx</td><td>Yes</td><td>Yes (on Lebesgue σ-algebra)</td><td>1</td></tr>
</table>

<details><summary>Details</summary>

The **Lebesgue measure** is the canonical example: it extends the intuitive notion of length to all Lebesgue-measurable subsets of $`\mathbb{R}`. It is $`\sigma`-finite because $`\mathbb{R} = \bigcup_n (-n, n)` and each interval has finite measure.

The **counting measure** assigns to each set its cardinality. It is complete (every subset of a null set is null, since the only null set is $`\varnothing`), but it is $`\sigma`-finite only on countable sets.

The **Dirac measure** $`\delta_a` concentrates all mass at a single point $`a`. It is the measure-theoretic analogue of a point mass in physics.

A **probability measure** is any measure with total mass 1. The **Gaussian (normal) measure** is a probability measure with density $`\frac{1}{\sigma\sqrt{2\pi}} e^{-(x-\mu)^2/(2\sigma^2)}` with respect to Lebesgue measure.

</details>

## Outer measure

An outer measure is a set function on $`\mathcal{P}(X)` with $`\mu^*(\varnothing) = 0`, monotonicity, and countable subadditivity (see [Measure space](./Measure-space.md) for the Carathéodory construction that turns it into a measure).

<details><summary>Details</summary>

**Lebesgue outer measure on $`\mathbb{R}`:**
$`\lambda^*(A) = \inf \left\{ \sum_{i=1}^{\infty} (b_i - a_i) : A \subseteq \bigcup_{i=1}^{\infty} (a_i, b_i) \right\}`

This is the "infimum of total lengths of countable interval covers." It is defined for every subset of $`\mathbb{R}`, but is only countably additive on the Lebesgue measurable sets. The Carathéodory construction then extracts the largest sigma-algebra (the Lebesgue σ-algebra) on which $`\lambda^*` is a genuine measure.

</details>

## Radon–Nikodym theorem

**Theorem.** Let $`(X, \mathcal{F}, \mu)` be a $`\sigma`-finite measure space. If $`\nu` is a $`\sigma`-finite measure on $`\mathcal{F}` with $`\nu \ll \mu` (i.e., $`\mu(A) = 0 \implies \nu(A) = 0`), then there exists a measurable function $`f: X \to [0,\infty]` such that
$`\nu(A) = \int_A f \, d\mu \quad \text{for all } A \in \mathcal{F}`

The function $`f` is unique $`\mu`-almost everywhere and is called the **Radon–Nikodym derivative**, written $`f = \frac{d\nu}{d\mu}`.

<details><summary>Details</summary>

**Intuition.** The Radon–Nikodym theorem says that if one measure is "absolutely continuous" with respect to another, it is obtained by weighting the base measure with a density function. In probability, if $`P` and $`Q` are two probability measures with $`Q \ll P`, then $`\frac{dQ}{dP}` is the likelihood ratio.

**Example.** On $`(\mathbb{R}, \mathcal{L}, \lambda)`, the measure $`\nu(A) = \int_A e^{-x^2} \, d\lambda` has Radon–Nikodym derivative $`\frac{d\nu}{d\lambda} = e^{-x^2}`.

**Mutual singularity and the Lebesgue decomposition.** The complementary relation to absolute continuity is **mutual singularity**: $`\nu \perp \mu` means there exists $`A \in \mathcal{F}` with $`\nu(A) = 0` and $`\mu(X \setminus A) = 0` — the two measures "live on disjoint parts" of $`X`. The **Lebesgue decomposition theorem** states that for any $`\sigma`-finite $`\nu` on a $`\sigma`-finite $`(X, \mathcal{F}, \mu)`, there is a unique decomposition
$`\nu = \nu_{\mathrm{ac}} + \nu_{\mathrm{s}}`
where $`\nu_{\mathrm{ac}} \ll \mu` (the absolutely continuous part, given by a density $`\frac{d\nu_{\mathrm{ac}}}{d\mu}`) and $`\nu_{\mathrm{s}} \perp \mu` (the singular part). In probability, this separates a distribution into its continuous (density) and discrete (point-mass) components.

The theorem fails without $`\sigma`-finiteness: the counting measure on an uncountable set is not $`\sigma`-finite, and there exist measures absolutely continuous with respect to it that have no density.

</details>

## Product measures

Given measure spaces $`(X, \mathcal{F}, \mu)` and $`(Y, \mathcal{G}, \nu)`, the **product measure** $`\mu \times \nu` on $`(X \times Y, \mathcal{F} \otimes \mathcal{G})` is the measure satisfying
$`(\mu \times \nu)(A \times B) = \mu(A) \cdot \nu(B)`

for all $`A \in \mathcal{F}`, $`B \in \mathcal{G}`, where $`\mathcal{F} \otimes \mathcal{G}` is the sigma-algebra generated by rectangles $`A \times B`. When $`\mu` and $`\nu` are $`\sigma`-finite, this measure is unique.

<details><summary>Details</summary>

**Tonelli's theorem** (see [Lebesgue integral](./Lebesgue-integral.md)) states that for nonnegative measurable $`f` on $`X \times Y`:
$`\int_{X \times Y} f \, d(\mu \times \nu) = \int_X \left(\int_Y f(x,y) \, d\nu(y)\right) d\mu(x)`

**Fubini's theorem** strengthens this: if $`f` is integrable (i.e., $`\int_{X \times Y} |f| \, d(\mu \times \nu) < \infty`), then the iterated integrals exist, are finite, and equal the double integral. Tonelli applies to all nonnegative functions (the integral may be $`\infty`); Fubini requires the integrability hypothesis.

Together they justify iterated integration and form the foundation of multivariable integration in the Lebesgue setting.

**Example.** Lebesgue measure on $`\mathbb{R}^2` is $`\lambda \times \lambda`, the product of 1-dimensional Lebesgue measure with itself. The area of a rectangle $`(a,b) \times (c,d)` is $`(b-a)(d-c)`.

</details>

## Example problem

**Problem.** Let $`(\mathbb{R}, \mathcal{L}, \lambda)` be the Lebesgue measure space. Define $`\nu(A) = \int_A (1 + x^2) \, d\lambda` for $`A \in \mathcal{L}`. Find $`\frac{d\nu}{d\lambda}` and compute $`\nu([0,1])`.

<details><summary>Solution</summary>

**Step 1: Identify the density.**

By the Radon–Nikodym theorem, since $`\nu \ll \lambda` (the integrand is nonnegative and measurable), the Radon–Nikodym derivative is the integrand itself:
$`\frac{d\nu}{d\lambda}(x) = 1 + x^2`

**Step 2: Compute $`\nu([0,1])`.**

$`\nu([0,1]) = \int_0^1 (1 + x^2) \, dx = \left[x + \frac{x^3}{3}\right]_0^1 = 1 + \frac{1}{3} = \frac{4}{3}`

</details>

<iframe src="./Measures.simulation.html" title="Interactive visualization of measure concepts"></iframe>