# Lp spaces

$`L^p` spaces are the natural function spaces in which the [Lebesgue integral](./Lebesgue-integral.md) lives. They consist of equivalence classes of [measurable functions](./Measurable-functions.md) whose $`p`-th power is integrable, equipped with a norm that makes them complete (Banach spaces). They answer the question *what is the space of integrable functions like?*

Beyond pure analysis, $`L^p` spaces are where the big applications live: weak solutions of [partial differential equations](../../../Physics/Readme.md) are sought in $`L^p`-based Sobolev spaces, Fourier analysis is naturally at home in $`L^2`, and the state spaces of quantum mechanics are $`L^2` spaces.

> **Authoritative sources**
> - [Folland, Real Analysis: Techniques of Modern Analysis](https://www.ams.org/bookstore/getitem?servlet=GetItem&code=STML/34)
> - [Bogachev, Measure Theory, Vol. 1](https://link.springer.com/book/10.1007/978-3-540-34519-3)

## Definition

Let $`(X, \mathcal{F}, \mu)` be a [measure space](./Measures.md) and $`1 \leq p < \infty`. The space $`L^p(X, \mu)` is the set of equivalence classes $`[f]` of [measurable functions](./Measurable-functions.md) $`f: X \to \mathbb{C}` (or $`\mathbb{R}`) such that

```math
\|f\|_p = \left(\int_X |f|^p \, d\mu\right)^{1/p} < \infty
```

where $`f \sim g` if $`f = g` $`\mu`-almost everywhere.

For $`p = \infty`: $`\|f\|_\infty = \text{ess sup}_{x} |f(x)|` (the essential supremum).

<details><summary>Details</summary>

**Why equivalence classes?** Two functions that differ only on a set of measure zero have the same integral and the same norm. Working with equivalence classes makes the norm well-defined (a true norm, not just a seminorm).

**The norm.** For $`1 \leq p < \infty`, $`\|\cdot\|_p` satisfies:
1. $`\|f\|_p \geq 0`, with $`\|f\|_p = 0 \iff f = 0` a.e.
2. $`\|\alpha f\|_p = |\alpha| \, \|f\|_p`
3. **Minkowski inequality (triangle inequality):** $`\|f + g\|_p \leq \|f\|_p + \|g\|_p`

**Completeness.** $`L^p` is a Banach space for all $`1 \leq p \leq \infty`: every Cauchy sequence in $`\|\cdot\|_p` converges to an element of $`L^p`.

**Separability.** If $`\mu` is $`\sigma`-finite, then $`L^p` is separable for $`1 \leq p < \infty` (simple functions with rational coefficients on a countable algebra generate a dense subset). In contrast, $`L^\infty` is never separable on a non-atomic space.

**Uniform convexity.** $`L^p` is uniformly convex if and only if $`1 < p < \infty`. This geometric property underpins the norm-convergence characterization in the [Convergence](#convergence-in-lp) section and implies that $`L^p` is reflexive for $`1 < p < \infty`.

<svg viewBox="0 0 640 220" width="640" height="220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unit balls of L1, L2 and L-infinity in two dimensions">
  <rect x="0" y="0" width="640" height="220" fill="#16213e"/>
  <g transform="translate(110,110)">
    <line x1="-90" y1="0" x2="90" y2="0" stroke="#555" stroke-width="1"/>
    <line x1="0" y1="-90" x2="0" y2="90" stroke="#555" stroke-width="1"/>
    <polygon points="0,-80 80,0 0,80 -80,0" fill="rgba(126,200,227,0.25)" stroke="#7ec8e3" stroke-width="2"/>
    <text x="0" y="-98" fill="#eee" font-size="15" text-anchor="middle">p = 1</text>
    <text x="0" y="108" fill="#aaa" font-size="12" text-anchor="middle">not uniformly convex</text>
  </g>
  <g transform="translate(320,110)">
    <line x1="-90" y1="0" x2="90" y2="0" stroke="#555" stroke-width="1"/>
    <line x1="0" y1="-90" x2="0" y2="90" stroke="#555" stroke-width="1"/>
    <circle cx="0" cy="0" r="80" fill="rgba(126,200,227,0.25)" stroke="#7ec8e3" stroke-width="2"/>
    <text x="0" y="-98" fill="#eee" font-size="15" text-anchor="middle">p = 2</text>
    <text x="0" y="108" fill="#aaa" font-size="12" text-anchor="middle">uniformly convex (Hilbert space)</text>
  </g>
  <g transform="translate(530,110)">
    <line x1="-90" y1="0" x2="90" y2="0" stroke="#555" stroke-width="1"/>
    <line x1="0" y1="-90" x2="0" y2="90" stroke="#555" stroke-width="1"/>
    <rect x="-80" y="-80" width="160" height="160" fill="rgba(126,200,227,0.25)" stroke="#7ec8e3" stroke-width="2"/>
    <text x="0" y="-98" fill="#eee" font-size="15" text-anchor="middle">p = ∞</text>
    <text x="0" y="108" fill="#aaa" font-size="12" text-anchor="middle">not uniformly convex</text>
  </g>
</svg>

*Unit balls in two dimensions (the same picture governs $`L^p` on a two-atom measure space). For $`1 < p < \infty` the ball is strictly convex: no flat spots, so midpoints of distinct boundary points lie strictly inside — this is uniform convexity. At $`p = 1` and $`p = \infty` the ball has flat sides, and uniform convexity fails.*

**Special case $`p = 2`:** $`L^2` is a Hilbert space with inner product $`\langle f, g \rangle = \int f \bar{g} \, d\mu`.

</details>

## Hölder's inequality

**Theorem.** Let $`1 \leq p, q \leq \infty` with $`\frac{1}{p} + \frac{1}{q} = 1` (conjugate exponents). If $`f \in L^p` and $`g \in L^q`, then

```math
\int_X |fg| \, d\mu \leq \|f\|_p \, \|g\|_q
```

<details><summary>Details</summary>

**Proof sketch.** For $`p, q > 1`, apply Young's inequality $`ab \leq \frac{a^p}{p} + \frac{b^q}{q}` to $`a = |f|/\|f\|_p`, $`b = |g|/\|g\|_q`, then integrate.

**Consequences:**
- $`L^p \cdot L^q \subseteq L^1` (product of $`L^p` and $`L^q` functions is integrable)
- $`\|f\|_p \leq \mu(X)^{1/p - 1/q} \, \|f\|_q` for $`p < q` (on finite measure spaces, $`L^q \subseteq L^p` — see [Nesting of $`L^p` spaces](#nesting-of-lp-spaces))

**Example.** $`p = 2`, $`q = 2`: Cauchy–Schwarz inequality $`\left|\int fg \, d\mu\right| \leq \|f\|_2 \, \|g\|_2`.

</details>

## Minkowski inequality

**Theorem.** For $`1 \leq p \leq \infty` and $`f, g \in L^p`:

```math
\|f + g\|_p \leq \|f\|_p + \|g\|_p
```

<details><summary>Details</summary>

For $`p = 1`, this is the triangle inequality for integrals: $`\int |f+g| \leq \int |f| + \int |g|`.

For $`p > 1`, the proof uses Hölder's inequality. Write $`|f+g|^p = |f+g|^{p-1} \cdot |f+g|`, split into $`|f+g|^{p-1}|f|` and $`|f+g|^{p-1}|g|`, apply Hölder with exponents $`p` and $`q = p/(p-1)` to each term, and factor.

This is what makes $`\|\cdot\|_p` a true norm (rather than just a seminorm) and $`L^p` a normed vector space.

**Concrete example.** Let $`f = \mathbf{1}_{[0,1]}` and $`g = \mathbf{1}_{[1,2]}` on $`\mathbb{R}` with Lebesgue measure, and take $`p = 2`. Then:

```math
\|f\|_2 = 1, \quad \|g\|_2 = 1, \quad \|f+g\|_2 = \sqrt{2} \approx 1.414
```

So $`\|f+g\|_2 = \sqrt{2} < 2 = \|f\|_2 + \|g\|_2`. The inequality is strict because $`f` and $`g` have disjoint supports (they are "orthogonal" in the $`L^2` sense). Equality in Minkowski holds if and only if $`f` and $`g` are non-negative scalar multiples of each other a.e.

</details>

## Nesting of $`L^p` spaces

**Theorem (inclusions on a finite measure space).** If $`\mu(X) < \infty` and $`1 \leq p < q \leq \infty`, then $`L^q(X, \mu) \subseteq L^p(X, \mu)`, with the norm inequality

```math
\|f\|_p \;\leq\; \mu(X)^{1/p - 1/q} \, \|f\|_q.
```

So on a finite measure space (in particular on a probability space), the spaces shrink as $`p` grows:

<svg viewBox="0 0 640 300" width="640" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nesting of Lp spaces on a finite measure space: L-infinity inside L-q inside L-p inside L-1">
  <rect x="0" y="0" width="640" height="300" fill="#16213e"/>
  <rect x="40" y="30" width="560" height="240" rx="18" fill="rgba(126,200,227,0.10)" stroke="#7ec8e3" stroke-width="2"/>
  <text x="60" y="58" fill="#7ec8e3" font-size="17">L¹  (largest)</text>
  <rect x="100" y="75" width="440" height="180" rx="16" fill="rgba(126,200,227,0.14)" stroke="#7ec8e3" stroke-width="2"/>
  <text x="120" y="101" fill="#7ec8e3" font-size="16">Lᵖ</text>
  <rect x="170" y="118" width="310" height="120" rx="14" fill="rgba(126,200,227,0.18)" stroke="#7ec8e3" stroke-width="2"/>
  <text x="190" y="143" fill="#7ec8e3" font-size="16">L^q  (p &lt; q)</text>
  <rect x="250" y="160" width="170" height="62" rx="12" fill="rgba(243,156,18,0.25)" stroke="#f39c18" stroke-width="2"/>
  <text x="335" y="196" fill="#f39c18" font-size="16" text-anchor="middle">L∞  (smallest)</text>
  <text x="320" y="292" fill="#aaa" font-size="13" text-anchor="middle">μ(X) &lt; ∞ :  L∞ ⊆ L^q ⊆ Lᵖ ⊆ L¹ for 1 ≤ p &lt; q</text>
</svg>

**The limit $`p \to \infty`.** On a finite measure space, the family of norms converges to a single object:

```math
\lim_{p \to \infty} \|f\|_p = \|f\|_\infty.
```

This connects the whole family $`\{\|\cdot\|_p\}` to the essential supremum: as $`p` grows, only the tallest peak of the function survives.

<details><summary>Details</summary>

**Proof of the inclusion.** For $`q < \infty`, apply [Hölder's inequality](#hölders-inequality) with exponents $`r = q/p > 1` and its conjugate $`r' = q/(q-p)` to the functions $`|f|^p` and $`\mathbf{1}_X`:

```math
\int_X |f|^p \, d\mu \leq \left(\int_X |f|^{pr} d\mu\right)^{1/r} \left(\int_X \mathbf{1}_X^{r'} d\mu\right)^{1/r'} = \|f\|_q^p \, \mu(X)^{1 - p/q}.
```

Taking the $`1/p`-th root gives $`\|f\|_p \leq \mu(X)^{1/p - 1/q} \|f\|_q`. For $`q = \infty` the inequality $`\|f\|_p \leq \mu(X)^{1/p} \|f\|_\infty` is immediate from $`|f| \leq \|f\|_\infty` a.e.

**Intuition.** On a finite measure space, a spike of height $`H` on a tiny set contributes little to $`\int |f|^p` when $`p` is small, but dominates when $`p` is large. So requiring $`\int |f|^q < \infty` for a *large* $`q` is a strong condition: it forbids tall spikes. Requiring $`\int |f|^p < \infty` for a *small* $`p` is weaker. Hence $`L^q \subseteq L^p` for $`p < q`. The inclusion is strict in general: $`f(x) = x^{-1/2}` on $`(0,1)` belongs to $`L^1` (integral $`2`) but not to $`L^2` ($`\int_0^1 x^{-1} dx = \infty`).

**Example.** On $`(0,1)`, take $`f(x) = x^{-1/3}` (the function of the [Quiz](#quiz) below). Here $`f \notin L^p` for $`p \geq 3` and $`\|f\|_\infty = \infty`: the norms blow up exactly because the spike at $`0` is unbounded, consistent with the limit theorem. For a bounded illustration, let $`g = \min(x^{-1/4}, 10)` on $`(0,1)`, so $`\|g\|_\infty = 10`; then $`\|g\|_p` increases toward $`10` as $`p \to \infty`, since the values near the cap $`10` weigh ever more heavily in $`\int |g|^p`.

What survives on arbitrary measure spaces is the interpolation inequality: if $`f \in L^p \cap L^q` with $`p < r < q`, then $`f \in L^r` and $`\|f\|_r \leq \|f\|_p^{\theta} \|f\|_q^{1-\theta}` where $`\frac{1}{r} = \frac{\theta}{p} + \frac{1-\theta}{q}`.

**Proof sketch of the limit $`\|f\|_p \to \|f\|_\infty`.** Assume $`0 < \|f\|_\infty < \infty` and $`\mu(X) < \infty`. Upper bound: $`\|f\|_p \leq \mu(X)^{1/p} \|f\|_\infty \to \|f\|_\infty`. Lower bound: for every $`\varepsilon > 0` the set $`A_\varepsilon = \{|f| > \|f\|_\infty - \varepsilon\}` has positive measure, so $`\|f\|_p \geq (\|f\|_\infty - \varepsilon)\, \mu(A_\varepsilon)^{1/p}`, and letting $`p \to \infty` then $`\varepsilon \to 0` gives $`\liminf_p \|f\|_p \geq \|f\|_\infty`. (On an infinite measure space the limit can still hold, but the upper bound needs an extra argument; the statement above is the standard finite-measure form.)

**Example.** On $`(0,1)`, take $`f(x) = x^{-1/3}` (the function of the [Quiz](#quiz) below). Here $`f \notin L^p` for $`p \geq 3`, and indeed $`\|f\|_\infty = \infty`: the norm "blows up" exactly because the spike at $`0` is unbounded, consistent with the limit theorem. For a bounded example, $`f(x) = x^{-1/4}` has $`\|f\|_p = \left(\frac{4}{4-p}\right)^{1/p}` for $`p < 4`, which grows to $`\|f\|_\infty = \infty`... take instead the bounded $`f(x) = x^{-1/4}` truncated: $`g = \min(x^{-1/4}, 10)` on $`(0,1)` has $`\|g\|_\infty = 10` and $`\|g\|_p \uparrow 10` as $`p \to \infty`.

</details>

## Convergence in $`L^p`

**Theorem (biconditional for $`1 < p < \infty`).** Let $`1 < p < \infty` and $`f_n, f \in L^p`. Then $`f_n \to f` in $`L^p` (i.e., $`\|f_n - f\|_p \to 0`) if and only if:
1. $`f_n \to f` in measure, and
2. $`\|f_n\|_p \to \|f\|_p`.

This follows from the uniform convexity of $`L^p` for $`1 < p < \infty` (see the [Definition](#definition) section and its unit-ball picture).

**Theorem (general, all $`1 \leq p < \infty`).** $`f_n \to f` in $`L^p` if and only if:
1. $`f_n \to f` in measure, and
2. $`\{|f_n|^p\}` is uniformly integrable.

(These two conditions in fact force $`\|f_n\|_p^p \to \|f\|_p^p`, so no separate norm-convergence condition is needed; see the details.)

<details><summary>Details</summary>

**Why the naive "boundedness" condition fails.** The statement "$`f_n \to f` in $`L^p` iff $`f_n \to f` in measure and $`\|f_n\|_p` is bounded" is **false**. Counterexample: $`f_n = n^{1/p} \cdot \mathbf{1}_{(0,1/n)}` on $`(0,1)`. Then $`f_n \to 0` in measure (the support shrinks to a point) and $`\|f_n\|_p = 1` for all $`n` (bounded), yet $`\|f_n - 0\|_p = 1 \not\to 0`. The mass concentrates near 0 without the norm vanishing. What is needed is not mere boundedness but **uniform integrability** of $`\{|f_n|^p\}`.

**The easy direction, and what $`L^p` convergence always implies.** If $`\|f_n - f\|_p \to 0`, then by the [Minkowski inequality](#minkowski-inequality) $`|\|f_n\|_p - \|f\|_p| \leq \|f_n - f\|_p \to 0`, so the norms converge; and Chebyshev's inequality gives $`\mu\{|f_n - f| > \varepsilon\} \leq \varepsilon^{-p} \|f_n - f\|_p^p \to 0`, so $`f_n \to f` in measure (hence a subsequence converges a.e.). These one-direction facts hold for all $`1 \leq p < \infty` and are the "$`\Rightarrow`" half of both theorems above.

**Why the general theorem needs no norm condition.** In the general theorem, conditions (1) and (2) already force $`\|f_n\|_p^p \to \|f\|_p^p`: apply the Vitali convergence theorem to the functions $`|f_n|^p`, which converge in measure to $`|f|^p` and are uniformly integrable by (2). Hence $`\limsup_n \|f_n\|_p^p \leq \|f\|_p^p` (in fact equality) comes for free, and listing it as a third condition would be redundant.

**Relationships between modes of convergence (on finite measure spaces):**

```math
\|f_n - f\|_p \to 0 \;\Longrightarrow\; f_n \to f \text{ in measure} \;\Longrightarrow\; f_{n_k} \to f \text{ a.e. (subsequence)}
```

The reverse implications do not hold in general, but:
- **DCT** (see [Lebesgue integral](./Lebesgue-integral.md)) gives: a.e. convergence + domination $`\implies L^p` convergence (for $`p < \infty` on finite measure spaces)
- **Uniform integrability** + convergence in measure $`\implies L^1` convergence (Vitali convergence theorem)

**Example.** $`f_n = n \cdot \mathbf{1}_{(0, 1/n)}` on $`(0,1)`. Then $`f_n \to 0` a.e., but $`\|f_n\|_1 = 1` for all $`n`, so $`f_n \not\to 0` in $`L^1`. The mass "concentrates" near 0.

**In $`L^\infty`:** $`\|f_n - f\|_\infty \to 0` means uniform convergence a.e. (essential uniform convergence). This is strictly stronger than $`L^p` convergence for finite $`p`.

</details>

## Duality

**Theorem (Riesz representation for $`L^p`).** Let $`(X, \mathcal{F}, \mu)` be $`\sigma`-finite and $`1 \leq p < \infty`. The dual space $`(L^p)^*` is isometrically isomorphic to $`L^q` where $`\frac{1}{p} + \frac{1}{q} = 1`. Every bounded linear functional $`\varphi` on $`L^p` is of the form

```math
\varphi(f) = \int_X f \, g \, d\mu
```

for a unique $`g \in L^q`, with $`\|\varphi\| = \|g\|_q`.

**The case $`p = \infty`.** The dual $`(L^\infty)^*` is **strictly larger** than $`L^1`. By the Yosida–Hewitt theorem, $`(L^\infty)^*` is the space $`ba(X, \mathcal{F})` of bounded finitely additive measures (the *ba* space). The subspace of countably additive measures recovers $`L^1` only when $`\mu` is localizable.

**Reflexivity.** $`L^p` is reflexive if and only if $`1 < p < \infty`. The spaces $`L^1` and $`L^\infty` are not reflexive.

<details><summary>Details</summary>

**Why $`L^1` and $`L^\infty` fail reflexivity.** $`L^1` is not reflexive because its dual $`(L^1)^* = L^\infty` has a larger dual than $`L^1` itself. $`L^\infty` is not reflexive because it contains an isometric copy of $`\ell^\infty` (on a non-atomic space), which is not reflexive.

**Connection to Hölder.** The duality pairing $`\langle f, g \rangle = \int fg \, d\mu` is precisely the one bounded by Hölder's inequality. The isometric isomorphism means the operator norm of the functional equals the $`L^q` norm of the representing function.

**Practical consequence.** In optimization and PDE theory, weak convergence in $`L^p` (i.e., convergence against all test functions in $`L^q`) is the natural compactness tool: bounded sequences in $`L^p` for $`1 < p < \infty` have weakly convergent subsequences (Banach–Alaoglu + reflexivity).

</details>

## Connection to probability

On a probability space $`(\Omega, \mathcal{F}, \mathbb{P})`, a random variable $`X` belongs to $`L^p(\Omega, \mathcal{F}, \mathbb{P})` if and only if its $`p`-th absolute moment is finite:

```math
X \in L^p \iff \mathbb{E}[|X|^p] < \infty
```

The $`L^p` norm becomes the $`p`-th root of the $`p`-th moment: $`\|X\|_p = (\mathbb{E}[|X|^p])^{1/p}`. In particular, $`X \in L^2` means $`X` has finite variance, and the $`L^2` inner product $`\langle X, Y \rangle = \mathbb{E}[XY]` is the covariance structure used throughout probability and statistics. The nesting $`L^\infty \subseteq L^q \subseteq L^p` for $`p < q` (on probability spaces, which have total measure 1) means that higher moments imply lower ones.

<details><summary>Details</summary>

**Convergence of moments.** If $`X_n \to X` in $`L^p`, then $`\mathbb{E}[|X_n|^p] \to \mathbb{E}[|X|^p]` (the norm is continuous), and more generally $`\mathbb{E}[|X_n|^r] \to \mathbb{E}[|X|^r]` for every $`0 < r \leq p`. This is why $`L^p` convergence is the standard hypothesis behind "convergence of moments" results: it rules out the mass-concentrating pathologies (spikes on vanishing sets) that make a.e. convergence alone too weak.

**The $`L^2` inner product gives the covariance.** For centered random variables ($`\mathbb{E}[X] = \mathbb{E}[Y] = 0`), the $`L^2` inner product $`\langle X, Y \rangle = \mathbb{E}[XY]` is exactly the covariance $`\mathrm{Cov}(X, Y)`, and $`\|X\|_2^2 = \mathrm{Var}(X)`. The Cauchy–Schwarz inequality becomes $`|\mathrm{Cov}(X,Y)| \leq \sqrt{\mathrm{Var}(X)\,\mathrm{Var}(Y)}`, which is the source of the bound $`|\rho| \leq 1` on the correlation coefficient. Orthogonality in $`L^2` is *uncorrelatedness* — the geometric foundation of least squares, the law of total variance, and the projection arguments behind conditional expectation (see [Random variables and expectation](../Probability/Random-variables-and-expectation.md)).

**Why analysts care.** Martingale convergence, the law of large numbers in its strong form, and the basic limit theorems of statistics are all most cleanly stated as $`L^p` statements with a separate a.e.-convergence clause — the two modes of convergence are genuinely independent, and $`L^p` is the one that carries quantitative control.

</details>

## Quiz

**Problem.** Let $`f(x) = x^{-1/3}` on $`(0,1)` with Lebesgue measure. Determine for which $`p \in [1, \infty]` the function $`f` belongs to $`L^p(0,1)`.

<details><summary>Solution</summary>

**Step 1: Compute $`\|f\|_p`.**

```math
\|f\|_p^p = \int_0^1 \left|x^{-1/3}\right|^p \, dx = \int_0^1 x^{-p/3} \, dx
```

This integral converges if and only if $`-p/3 > -1`, i.e., $`p < 3`.

For $`p < 3`:

```math
\int_0^1 x^{-p/3} \, dx = \left[\frac{x^{1 - p/3}}{1 - p/3}\right]_0^1 = \frac{1}{1 - p/3} = \frac{3}{3 - p}
```

So $`\|f\|_p = \left(\frac{3}{3-p}\right)^{1/p}`.

**Step 2: Check $`p = \infty`.**

$`\|f\|_\infty = \text{ess sup}_{x \in (0,1)} x^{-1/3} = \infty` (the function is unbounded near 0).

**Conclusion.** $`f \in L^p(0,1)` if and only if $`1 \leq p < 3`. In particular, $`f \in L^1` and $`f \in L^2`, but $`f \notin L^3` and $`f \notin L^\infty`.

</details>

## Interactive exploration

The simulation below illustrates the two central phenomena of this page.

- **Left panel — the norm as a function of $`p`.** It plots $`\|f\|_p = \left(\frac{3}{3-p}\right)^{1/p}` for the function $`f(x) = x^{-1/3}` of the [Quiz](#quiz) above. Drag the slider to see the norm grow without bound as $`p \to 3^-`: the exact phenomenon that makes $`f \notin L^3`, and a concrete instance of the nesting theorem (larger $`p` is a stronger requirement).
- **Right panel — a mass-concentrating sequence.** It animates $`f_n = n \cdot \mathbf{1}_{(0,1/n)}` from the [Convergence](#convergence-in-lp) section: $`f_n \to 0` a.e. and in measure, yet $`\|f_n\|_1 = 1` for every $`n` — a.e. convergence alone never forces $`L^1` convergence without uniform integrability.

<iframe src="./Lp-spaces.simulation.html" title="L^p norm as a function of p and mass-concentrating sequence"></iframe>
