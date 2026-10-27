# Absolutely continuous distributions

An absolutely continuous distribution is a probability measure that has a **density** (Radon–Nikodym derivative) with respect to Lebesgue measure. It is the law of a random variable for which probabilities of intervals are computed by integrating a density function. These distributions model quantities that can take any value in an interval: measurement errors, physical quantities, financial returns, and continuous-time processes. They contrast with [atomic distributions](./Atomic-distributions.md) (point masses) and [singular and mixed distributions](./Singular-and-mixed-distributions.md).

> **Authoritative sources**
> - [C. M. Grinstead & J. L. Snell, *Introduction to Probability* (2nd ed., 1997), ch. 1–2](https://www.math.dartmouth.edu/~prob/prob/prob.pdf)
> - [A. Papoulis & S. U. Pillai, *Probability, Random Variables, and Stochastic Processes* (5th ed., 2002)](https://en.wikipedia.org/wiki/Probability,_Random_Variables,_and_Stochastic_Processes)
> - [M. Sklar, *Fonctions de répartition à n dimensions et leurs marges* (1959)](https://en.wikipedia.org/wiki/Copula_(statistics)#Sklar's_theorem)

## Density and CDF

A distribution on $`\mathbb{R}` is absolutely continuous iff there exists a measurable function $`f: \mathbb{R} \to [0, \infty)` with $`\int_{\mathbb{R}} f = 1` such that

```math
P(X \in A) = \int_A f(x)\, dx \quad \text{for all Borel } A.
```

The function $`f` is the **probability density function** (PDF). The CDF is $`F(x) = \int_{-\infty}^{x} f(t)\, dt` and satisfies $`F'(x) = f(x)` almost everywhere. Expectation is $`E[g(X)] = \int g(x) f(x)\, dx` (see [Random variables and expectation](../Random-variables-and-expectation.md)).

<details><summary>Details</summary>

**Step 1 — From mass to density.** For an [atomic distribution](./Atomic-distributions.md), probability lives on points: $`P(X = x) = p(x)`. For an absolutely continuous distribution, every single point has probability zero, and probability lives on *intervals*: it is the **area under the density curve**. The density $`f` is a "probability per unit length": $`f(x)\,\Delta x` is (approximately) the probability of falling in a small interval of width $`\Delta x` around $`x`.

<svg width="600" height="250" viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="shade1"><rect x="213" y="0" width="174" height="250"/></clipPath>
  </defs>
  <line x1="30" y1="212" x2="570" y2="212" stroke="#999" stroke-width="1"/>
  <line x1="40" y1="20" x2="40" y2="212" stroke="#999" stroke-width="1"/>
  <path d="M40,212 C90,60 150,45 213,120 C260,175 320,200 386,206 C450,211 510,212 560,212 L560,212 Z" fill="none"/>
  <path d="M40,212 C90,60 150,45 213,120 C260,175 320,200 386,206 C450,211 510,212 560,212 L560,212 L40,212 Z" fill="rgba(66,133,244,0.25)" clip-path="url(#shade1)"/>
  <path d="M40,212 C90,60 150,45 213,120 C260,175 320,200 386,206 C450,211 510,212 560,212" fill="none" stroke="#1a4d7a" stroke-width="2"/>
  <line x1="213" y1="212" x2="213" y2="118" stroke="#c0392b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="387" y1="212" x2="387" y2="205" stroke="#c0392b" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="209" y="228" font-size="13" font-style="italic" fill="#c0392b">a</text>
  <text x="383" y="228" font-size="13" font-style="italic" fill="#c0392b">b</text>
  <text x="52" y="40" font-size="13" font-style="italic" fill="#1a4d7a">f(x)</text>
  <text x="240" y="100" font-size="13" fill="#1a4d7a">shaded area = P(a &lt; X ≤ b)</text>
  <text x="540" y="228" font-size="13" font-style="italic">x</text>
</svg>

**Step 2 — The value $`f(x)` is not a probability.** Since $`P(X = x) = \int_{\{x\}} f = 0`, the density value at a point can be larger than 1 (the uniform density on $`[0, 1/2]` equals 2). What matters is the *integral*: $`P(a < X \leq b) = F(b) - F(a)`. This is why the CDF, not the density, is the universal object — see [singular and mixed distributions](./Singular-and-mixed-distributions.md) for laws that have no density at all.

**Step 3 — CDF and density are two views of the same law.** The CDF is the running integral of the density, and the density is the derivative of the CDF (wherever the derivative exists — "almost everywhere" is enough, since changing $`f` on a null set does not change any integral).

**Step 4 — Uniqueness is only almost-everywhere.** If $`f` and $`g` are both densities of the same distribution, then $`f = g` except on a set of Lebesgue measure zero. Densities are equivalence classes, not functions; any version works for computing probabilities.

*Sources:* Grinstead & Snell ch. 2; Papoulis & Pillai ch. 4.

<details><summary>Example problem</summary>

Let $`X` have the exponential density $`f(x) = \lambda e^{-\lambda x}` for $`x \geq 0`. Show that $`P(X > t) = e^{-\lambda t}` and compute $`P(X > 1/\lambda)`.

<details><summary>Solution</summary>

The survival function is the area under the density to the right of $`t`:

```math
P(X > t) = \int_t^\infty \lambda e^{-\lambda x}\, dx = \bigl[-e^{-\lambda x}\bigr]_t^\infty = e^{-\lambda t}.
```

At $`t = 1/\lambda`: $`P(X > 1/\lambda) = e^{-1} \approx 0.368`. Note that the CDF is $`F(t) = 1 - e^{-\lambda t}`, and differentiating recovers the density — the two views of Step 3.

</details>
</details>

</details>

## Transformation of variables

If $`Y = g(X)` where $`g` is a $`C^1` bijection with $`g'(x) \neq 0`, then $`Y` has density

```math
f_Y(y) = f_X\bigl(g^{-1}(y)\bigr) \;\bigl|\tfrac{d}{dy} g^{-1}(y)\bigr|.
```

For a $`C^1` map $`g: \mathbb{R}^d \to \mathbb{R}^d` with $`\det Dg(x) \neq 0`, the multivariate change-of-variables formula replaces the derivative by the absolute value of the Jacobian determinant:

```math
f_Y(y) = \sum_{x \in g^{-1}(y)} \frac{f_X(x)}{|\det Dg(x)|}.
```

<details><summary>Details</summary>

**Step 1 — Mass conservation.** A small interval $`[x, x + dx]` of probability mass $`f_X(x)\, dx` is carried by $`g` onto an interval of length $`|g'(x)|\, dx` around $`y = g(x)`. The same mass, spread over a longer interval, means a *smaller* density: $`f_Y(y) = f_X(x) / |g'(x)|`. The density is stretched wherever $`g` stretches, and compressed wherever $`g` compresses.

<svg width="600" height="260" viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
  <text x="40" y="30" font-size="14" font-weight="bold">x-space</text>
  <line x1="40" y1="60" x2="560" y2="60" stroke="#999"/>
  <rect x="200" y="40" width="30" height="40" fill="rgba(66,133,244,0.35)" stroke="#1a4d7a"/>
  <text x="192" y="100" font-size="12" font-style="italic">x</text>
  <text x="222" y="100" font-size="12" font-style="italic">x+dx</text>
  <text x="150" y="36" font-size="12" fill="#1a4d7a">mass = f_X(x) · dx</text>
  <path d="M300,120 L300,160" stroke="#555" stroke-width="1.5" marker-end="url(#arr)"/>
  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#555"/></marker></defs>
  <text x="315" y="145" font-size="13" font-style="italic">y = g(x), here g(x) = 3x</text>
  <text x="40" y="190" font-size="14" font-weight="bold">y-space</text>
  <line x1="40" y1="220" x2="560" y2="220" stroke="#999"/>
  <rect x="200" y="200" width="90" height="20" fill="rgba(66,133,244,0.35)" stroke="#1a4d7a"/>
  <text x="192" y="248" font-size="12" font-style="italic">y</text>
  <text x="278" y="248" font-size="12" font-style="italic">y+dy</text>
  <text x="310" y="214" font-size="12" fill="#1a4d7a">same mass = f_Y(y) · 3dx, so f_Y(y) = f_X(x)/3</text>
</svg>

**Step 2 — Worked example (location-scale).** Let $`X \sim \mathcal{N}(0,1)` and $`Y = 2X + 1`. Then $`g^{-1}(y) = (y-1)/2` and $`|(g^{-1})'(y)| = 1/2`, so

```math
f_Y(y) = \frac{1}{2} f_X\!\left(\frac{y-1}{2}\right) = \frac{1}{2\sqrt{2\pi}} e^{-(y-1)^2/8},
```

which is exactly $`\mathcal{N}(1, 4)`: the location-scale operation of [Distributional structure and operations](./Distributional-structure-and-operations.md) is a change of variables.

**Step 3 — Non-injective maps: sum over preimages.** If several points map to the same $`y`, each contributes its own mass. For $`Y = X^2` with $`X \sim \mathcal{N}(0,1)`, the preimages of $`y > 0` are $`\pm\sqrt{y}` and $`|d(x^2)/dx| = 2|x| = 2\sqrt{y}`, giving

```math
f_Y(y) = \frac{f_X(\sqrt{y}) + f_X(-\sqrt{y})}{2\sqrt{y}} = \frac{e^{-y/2}}{\sqrt{2\pi y}}, \quad y > 0.
```

The simulation below lets you explore both ideas interactively: the normal density with adjustable $`\mu, \sigma`, and the pushforward of a standard normal through $`Y = X^2`.

<iframe src="./Absolutely-continuous-distributions.simulation.html" title="Interactive: normal density with adjustable mu and sigma, and the change of variables Y = X squared" style="width:100%;height:640px;border:1px solid #ccc;border-radius:6px;"></iframe>

*Sources:* Papoulis & Pillai ch. 5; Grinstead & Snell ch. 2, exercise on functions of random variables.

<details><summary>Example problem</summary>

Let $`X \sim \mathrm{Unif}(0,1)` and $`Y = -\ln X`. Find the density of $`Y`.

<details><summary>Solution</summary>

Here $`g(x) = -\ln x` maps $`(0,1)` bijectively onto $`(0, \infty)`, with inverse $`g^{-1}(y) = e^{-y}` and derivative $`|(g^{-1})'(y)| = e^{-y}`. Applying the formula:

```math
f_Y(y) = f_X\bigl(g^{-1}(y)\bigr) \,\bigl|(g^{-1})'(y)\bigr| = 1 \cdot e^{-y}, \quad y > 0.
```

So $`Y \sim \mathrm{Exp}(1)`: the exponential density falls out of the uniform by a logarithmic change of variables. This is exactly how one *simulates* an exponential waiting time from a uniform random number generator.

</details>
</details>

</details>

## Multivariate densities

A joint density $`f(x_1, \ldots, x_d)` on $`\mathbb{R}^d` defines a multivariate absolutely continuous distribution: $`P(X \in A) = \int_A f(x)\, dx`. Key operations:

- **Marginal density**: integrate out the other coordinates, $`f_i(x_i) = \int_{\mathbb{R}^{d-1}} f(x)\, dx_{-i}`.
- **Independence**: $`X_1, \ldots, X_d` are independent iff $`f(x) = \prod_i f_i(x_i)` almost everywhere.
- **Conditional density**: for $`f_{-j}(x_{-j}) = \int f(x)\, dx_j > 0`,

```math
f_{X_j \mid X_{-j}}(x_j \mid x_{-j}) = \frac{f(x_1, \ldots, x_d)}{f_{-j}(x_{-j})},
```

which reduces to $`f_j(x_j)` when the coordinates are independent. This is the continuous analogue of [conditional probability](../Conditional-probability.md).

<details><summary>Details</summary>

**Step 1 — Marginals are shadows.** Integrating the joint density over all other coordinates projects the law onto one axis, exactly as a shadow projects a 3D object onto a plane. Unlike the joint, marginals do *not* determine the joint: many different dependence structures share the same marginals (this is the subject of the copula section below).

<svg width="600" height="330" viewBox="0 0 600 330" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="joint" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#eef4fb"/>
      <stop offset="100%" stop-color="#1a4d7a"/>
    </linearGradient>
  </defs>
  <rect x="60" y="20" width="240" height="240" fill="url(#joint)" stroke="#555"/>
  <text x="80" y="45" font-size="13" fill="#fff">joint density f(x, y) = x + y</text>
  <text x="300" y="290" font-size="13" font-style="italic">x</text>
  <text x="45" y="18" font-size="13" font-style="italic">y</text>
  <!-- marginal f_X below: f_X(x) = x + 1/2, scale 40px per unit, baseline y=320 -->
  <line x1="60" y1="320" x2="300" y2="320" stroke="#999"/>
  <path d="M60,300 L300,260" fill="none" stroke="#c0392b" stroke-width="2"/>
  <text x="150" y="316" font-size="12" fill="#c0392b">marginal f_X(x) = x + 1/2</text>
  <!-- marginal f_Y left: f_Y(y) = y + 1/2, baseline x=40 -->
  <line x1="40" y1="20" x2="40" y2="260" stroke="#999"/>
  <path d="M20,260 L60,20" fill="none" stroke="#2e8b57" stroke-width="2"/>
  <text x="8" y="150" font-size="12" fill="#2e8b57" transform="rotate(-90 8 150)">f_Y(y) = y + 1/2</text>
</svg>

**Step 2 — Conditional densities slice the joint.** Fix $`x_{-j}` and renormalize the slice of the joint density at that point so it integrates to 1: divide by the marginal $`f_{-j}(x_{-j})`, which is exactly the mass of the slice. Under independence every slice has the same shape $`f_j`, so conditioning changes nothing.

**Step 3 — Worked example.** Let $`f(x, y) = x + y` on the unit square $`[0,1]^2` (it integrates to 1). The marginals are $`f_X(x) = x + \tfrac{1}{2}` and $`f_Y(y) = y + \tfrac{1}{2}` — not proportional to the joint, so $`X` and $`Y` are *dependent*. The conditional density of $`Y` given $`X = x` is

```math
f_{Y \mid X}(y \mid x) = \frac{x + y}{x + 1/2}, \quad 0 < y < 1,
```

and the conditional mean is $`E[Y \mid X = x] = \frac{x/2 + 1/3}{x + 1/2}`, which increases in $`x`: larger $`X` shifts probability mass of $`Y` upward.

*Sources:* Papoulis & Pillai ch. 6; Grinstead & Snell ch. 2, joint distributions.

<details><summary>Example problem</summary>

With $`f(x,y) = x + y` on $`[0,1]^2`, compute $`P(Y > 1/2 \mid X = 1/2)`.

<details><summary>Solution</summary>

Condition on $`X = 1/2`: the conditional density is $`f_{Y \mid X}(y \mid 1/2) = \frac{1/2 + y}{1} = \frac{1}{2} + y`. Then
```math
P(Y > 1/2 \mid X = 1/2) = \int_{1/2}^1 \left(\tfrac{1}{2} + y\right) dy = \tfrac{1}{4} + \tfrac{3}{8} = \tfrac{5}{8}.
```

Conditioning on a different value changes the answer: for $`X = 1`, the conditional density is $`(1 + y)/(3/2)`, giving $`P(Y > 1/2 \mid X = 1) = \int_{1/2}^1 \frac{1+y}{3/2}\, dy = \frac{7}{9} \neq \frac{5}{8}`. The conditional density — not just one probability — is the full description of how the law of $`Y` shifts as $`X` varies.

</details>
</details>

</details>

## Copulas

A **copula** is the dependence structure of a multivariate distribution, separated from its marginals. **Sklar's theorem (1959)**: for any joint CDF $`F` with continuous marginals $`F_1, \ldots, F_d`, there is a unique copula $`C: [0,1]^d \to [0,1]` (a CDF with uniform marginals) such that

```math
F(x_1, \ldots, x_d) = C\bigl(F_1(x_1), \ldots, F_d(x_d)\bigr).
```

Conversely, *any* copula combined with *any* marginals produces a valid multivariate distribution. The density of the copula part is $`c(u) = \partial^d C / \partial u_1 \cdots \partial u_d`, and the joint density factors as $`f(x) = c(F_1(x_1), \ldots, F_d(x_d)) \prod_i f_i(x_i)`.

<details><summary>Details</summary>

**Step 1 — Why copulas exist.** Apply the probability-integral transform $`U_i = F_i(X_i)`: each $`U_i` is uniform on $`[0,1]` (see the example problem below). The joint law of $`(U_1, \ldots, U_d)` is the copula — it contains *only* the dependence, since the marginals are all uniform. Sklar's theorem says this construction is reversible.

**Step 2 — The catalog of standard copulas.**

- **Independent copula**: $`C(u_1, \ldots, u_d) = \prod_i u_i`. It is the copula of independent coordinates, whatever the marginals.
- **Gaussian copula**: $`C(u) = \Phi_d\bigl(\Phi_1^{-1}(u_1), \ldots, \Phi_1^{-1}(u_d); \Sigma\bigr)`, built from a multivariate normal with correlation matrix $`\Sigma` pushed through the univariate normal quantile function $`\Phi_1^{-1}`. It captures dependence by correlation but has *tail independence*: extreme events decouple.
- **Clayton copula** (bivariate): $`C(u, v) = (u^{-\theta} + v^{-\theta} - 1)^{-1/\theta}` for $`\theta > 0`. It has *lower tail dependence*: joint crashes are more likely than a Gaussian copula would predict — one reason copulas are used in credit-risk modeling.

**Step 3 — Worked example.** Take exponential marginals $`F_1, F_2` (rates 1 and 2) joined by the Clayton copula with $`\theta = 1`. Sklar gives the joint CDF $`F(x,y) = \bigl(F_1(x)^{-1} + F_2(y)^{-1} - 1\bigr)^{-1}`. The marginals are still exponential — the copula changed only the dependence. This modularity (marginals ⊕ copula = joint) is why copulas are the standard tool for building multivariate models with prescribed marginals.

*Sources:* Sklar (1959); R. B. Nelsen, *An Introduction to Copulas* (2006).

<details><summary>Example problem</summary>

Show that if $`F` is a continuous CDF and $`U = F(X)`, then $`U \sim \mathrm{Unif}(0,1)`.

<details><summary>Solution</summary>

For $`u \in (0,1)`, since $`F` is continuous the intermediate value theorem gives a point $`t` with $`F(t) = u` (if $`F` is flat, take the generalized inverse; the argument still holds). Then

```math
P(U \leq u) = P(F(X) \leq u) = P(X \leq t) = F(t) = u,
```

so $`U` has the uniform CDF on $`[0,1]`. This "probability-integral transform" is the bridge between any absolutely continuous law and the uniform law, and it is the mechanism behind Sklar's theorem and behind inverse-CDF sampling.

</details>
</details>

</details>
## Common univariate densities

Five families cover most applied work. Their densities, supports, and roles:

<table>
<tr><th>Distribution</th><th>Density f(x)</th><th>Support</th><th>Typical use</th></tr>
<tr><td>Uniform <i>Unif(a, b)</i></td><td>1/(b − a)</td><td>[a, b]</td><td>Complete ignorance on an interval; RNG output</td></tr>
<tr><td>Normal <i>N(μ, σ²)</i></td><td>(1/(σ√(2π))) · e<sup>−(x−μ)²/(2σ²)</sup></td><td>ℝ</td><td>Measurement error; limit of sums (CLT)</td></tr>
<tr><td>Exponential <i>Exp(λ)</i></td><td>λ e<sup>−λx</sup></td><td>[0, ∞)</td><td>Waiting times; memoryless lifetimes</td></tr>
<tr><td>Gamma <i>Gamma(α, β)</i></td><td>(β<sup>α</sup>/Γ(α)) · x<sup>α−1</sup> e<sup>−βx</sup></td><td>(0, ∞)</td><td>Sums of exponentials; waiting for the α-th event</td></tr>
<tr><td>Beta <i>Beta(α, β)</i></td><td>x<sup>α−1</sup>(1−x)<sup>β−1</sup>/B(α, β)</td><td>(0, 1)</td><td>Random proportions and probabilities; conjugate prior</td></tr>
</table>

<details><summary>Details</summary>

**Step 1 — Read the shapes.** The plot below shows the standard member of each family: normal $`\mathcal{N}(0,1)`, exponential $`\mathrm{Exp}(1)`, gamma $`\mathrm{Gamma}(2,1)`, beta $`\mathrm{Beta}(2,2)`, uniform $`\mathrm{Unif}(0,1)`. Note how the gamma with $`\alpha = 2` starts at zero (one factor of $`x`), while the exponential starts at its maximum; the beta is confined to $`(0,1)`.

<svg width="600" height="270" viewBox="0 0 600 270" xmlns="http://www.w3.org/2000/svg">
  <line x1="30" y1="230" x2="570" y2="230" stroke="#999"/>
  <line x1="40" y1="20" x2="40" y2="230" stroke="#999"/>
  <line x1="97.8" y1="230" x2="97.8" y2="225" stroke="#999"/>
  <line x1="213.3" y1="230" x2="213.3" y2="225" stroke="#999"/>
  <line x1="328.9" y1="230" x2="328.9" y2="225" stroke="#999"/>
  <line x1="444.4" y1="230" x2="444.4" y2="225" stroke="#999"/>
  <line x1="560" y1="230" x2="560" y2="225" stroke="#999"/>
  <text x="92" y="246" font-size="11">−2</text>
  <text x="209" y="246" font-size="11">0</text>
  <text x="324" y="246" font-size="11">2</text>
  <text x="440" y="246" font-size="11">4</text>
  <text x="555" y="246" font-size="11">6</text>
  <path d="M40.0,229.2 L42.5,229.1 L45.0,229.0 L47.4,228.8 L49.9,228.7 L52.4,228.5 L54.9,228.3 L57.3,228.1 L59.8,227.9 L62.3,227.6 L64.8,227.3 L67.2,227.0 L69.7,226.7 L72.2,226.3 L74.7,225.9 L77.1,225.5 L79.6,225.0 L82.1,224.5 L84.6,223.9 L87.0,223.3 L89.5,222.7 L92.0,222.0 L94.5,221.3 L97.0,220.5 L99.4,219.6 L101.9,218.7 L104.4,217.7 L106.9,216.7 L109.3,215.6 L111.8,214.5 L114.3,213.3 L116.8,212.1 L119.2,210.7 L121.7,209.4 L124.2,207.9 L126.7,206.5 L129.1,204.9 L131.6,203.3 L134.1,201.7 L136.6,200.0 L139.0,198.3 L141.5,196.5 L144.0,194.7 L146.5,192.9 L149.0,191.0 L151.4,189.1 L153.9,187.3 L156.4,185.4 L158.9,183.5 L161.3,181.6 L163.8,179.8 L166.3,177.9 L168.8,176.1 L171.2,174.4 L173.7,172.7 L176.2,171.0 L178.7,169.4 L181.1,167.9 L183.6,166.5 L186.1,165.1 L188.6,163.8 L191.0,162.7 L193.5,161.6 L196.0,160.7 L198.5,159.8 L201.0,159.1 L203.4,158.5 L205.9,158.1 L208.4,157.7 L210.9,157.5 L213.3,157.5 L215.8,157.5 L218.3,157.7 L220.8,158.1 L223.2,158.5 L225.7,159.1 L228.2,159.8 L230.7,160.7 L233.1,161.6 L235.6,162.7 L238.1,163.8 L240.6,165.1 L243.0,166.5 L245.5,167.9 L248.0,169.4 L250.5,171.0 L253.0,172.7 L255.4,174.4 L257.9,176.1 L260.4,177.9 L262.9,179.8 L265.3,181.6 L267.8,183.5 L270.3,185.4 L272.8,187.3 L275.2,189.1 L277.7,191.0 L280.2,192.9 L282.7,194.7 L285.1,196.5 L287.6,198.3 L290.1,200.0 L292.6,201.7 L295.0,203.3 L297.5,204.9 L300.0,206.5 L302.5,207.9 L305.0,209.4 L307.4,210.7 L309.9,212.1 L312.4,213.3 L314.9,214.5 L317.3,215.6 L319.8,216.7 L322.3,217.7 L324.8,218.7 L327.2,219.6 L329.7,220.5 L332.2,221.3 L334.7,222.0 L337.1,222.7 L339.6,223.3 L342.1,223.9 L344.6,224.5 L347.0,225.0 L349.5,225.5 L352.0,225.9 L354.5,226.3 L357.0,226.7 L359.4,227.0 L361.9,227.3 L364.4,227.6 L366.9,227.9 L369.3,228.1 L371.8,228.3 L374.3,228.5 L376.8,228.7 L379.2,228.8 L381.7,229.0 L384.2,229.1 L386.7,229.2" fill="none" stroke="#1a4d7a" stroke-width="2"/>
  <path d="M213.3,48.2 L215.8,55.8 L218.3,63.1 L220.8,70.1 L223.2,76.8 L225.7,83.3 L228.2,89.4 L230.7,95.3 L233.1,101.0 L235.6,106.4 L238.1,111.6 L240.6,116.5 L243.0,121.3 L245.5,125.8 L248.0,130.2 L250.5,134.4 L253.0,138.4 L255.4,142.3 L257.9,145.9 L260.4,149.5 L262.9,152.8 L265.3,156.1 L267.8,159.2 L270.3,162.2 L272.8,165.0 L275.2,167.7 L277.7,170.3 L280.2,172.8 L282.7,175.2 L285.1,177.5 L287.6,179.7 L290.1,181.8 L292.6,183.9 L295.0,185.8 L297.5,187.7 L300.0,189.4 L302.5,191.1 L305.0,192.8 L307.4,194.3 L309.9,195.8 L312.4,197.3 L314.9,198.6 L317.3,199.9 L319.8,201.2 L322.3,202.4 L324.8,203.6 L327.2,204.7 L329.7,205.7 L332.2,206.8 L334.7,207.7 L337.1,208.7 L339.6,209.6 L342.1,210.4 L344.6,211.2 L347.0,212.0 L349.5,212.8 L352.0,213.5 L354.5,214.2 L357.0,214.9 L359.4,215.5 L361.9,216.1 L364.4,216.7 L366.9,217.2 L369.3,217.8 L371.8,218.3 L374.3,218.8 L376.8,219.3 L379.2,219.7 L381.7,220.1 L384.2,220.6 L386.7,220.9 L389.1,221.3 L391.6,221.7 L394.1,222.0 L396.6,222.4 L399.0,222.7 L401.5,223.0 L404.0,223.3 L406.5,223.6 L409.0,223.8 L411.4,224.1 L413.9,224.4 L416.4,224.6 L418.9,224.8 L421.3,225.0 L423.8,225.2 L426.3,225.4 L428.8,225.6 L431.2,225.8 L433.7,226.0 L436.2,226.2 L438.7,226.3 L441.1,226.5 L443.6,226.6 L446.1,226.8 L448.6,226.9 L451.0,227.0 L453.5,227.2 L456.0,227.3 L458.5,227.4 L461.0,227.5 L463.4,227.6 L465.9,227.7 L468.4,227.8 L470.9,227.9 L473.3,228.0 L475.8,228.1 L478.3,228.1 L480.8,228.2 L483.2,228.3 L485.7,228.4 L488.2,228.4 L490.7,228.5 L493.1,228.6 L495.6,228.6 L498.1,228.7 L500.6,228.7 L503.0,228.8 L505.5,228.8 L508.0,228.9 L510.5,228.9 L513.0,229.0 L515.4,229.0 L517.9,229.1 L520.4,229.1 L522.9,229.1 L525.3,229.2 L527.8,229.2 L530.3,229.2 L532.8,229.3 L535.2,229.3 L537.7,229.3 L540.2,229.4 L542.7,229.4 L545.1,229.4 L547.6,229.4 L550.1,229.5 L552.6,229.5 L555.0,229.5 L557.5,229.5 L560.0,229.5" fill="none" stroke="#c0392b" stroke-width="2"/>
  <path d="M213.3,230.0 L215.8,222.5 L218.3,215.7 L220.8,209.4 L223.2,203.7 L225.7,198.6 L228.2,193.8 L230.7,189.6 L233.1,185.8 L235.6,182.3 L238.1,179.2 L240.6,176.5 L243.0,174.1 L245.5,172.0 L248.0,170.1 L250.5,168.5 L253.0,167.2 L255.4,166.1 L257.9,165.2 L260.4,164.4 L262.9,163.9 L265.3,163.5 L267.8,163.2 L270.3,163.1 L272.8,163.1 L275.2,163.3 L277.7,163.5 L280.2,163.9 L282.7,164.3 L285.1,164.8 L287.6,165.4 L290.1,166.0 L292.6,166.7 L295.0,167.5 L297.5,168.3 L300.0,169.1 L302.5,170.0 L305.0,171.0 L307.4,171.9 L309.9,172.9 L312.4,173.9 L314.9,174.9 L317.3,175.9 L319.8,176.9 L322.3,178.0 L324.8,179.0 L327.2,180.1 L329.7,181.1 L332.2,182.2 L334.7,183.2 L337.1,184.3 L339.6,185.3 L342.1,186.4 L344.6,187.4 L347.0,188.4 L349.5,189.4 L352.0,190.4 L354.5,191.4 L357.0,192.4 L359.4,193.3 L361.9,194.3 L364.4,195.2 L366.9,196.1 L369.3,197.0 L371.8,197.9 L374.3,198.8 L376.8,199.6 L379.2,200.4 L381.7,201.3 L384.2,202.1 L386.7,202.8 L389.1,203.6 L391.6,204.4 L394.1,205.1 L396.6,205.8 L399.0,206.5 L401.5,207.2 L404.0,207.9 L406.5,208.5 L409.0,209.2 L411.4,209.8 L413.9,210.4 L416.4,211.0 L418.9,211.6 L421.3,212.1 L423.8,212.7 L426.3,213.2 L428.8,213.7 L431.2,214.2 L433.7,214.7 L436.2,215.2 L438.7,215.6 L441.1,216.1 L443.6,216.5 L446.1,217.0 L448.6,217.4 L451.0,217.8 L453.5,218.2 L456.0,218.5 L458.5,218.9 L461.0,219.3 L463.4,219.6 L465.9,220.0 L468.4,220.3 L470.9,220.6 L473.3,220.9 L475.8,221.2 L478.3,221.5 L480.8,221.8 L483.2,222.1 L485.7,222.3 L488.2,222.6 L490.7,222.8 L493.1,223.1 L495.6,223.3 L498.1,223.5 L500.6,223.7 L503.0,223.9 L505.5,224.1 L508.0,224.3 L510.5,224.5 L513.0,224.7 L515.4,224.9 L517.9,225.1 L520.4,225.2 L522.9,225.4 L525.3,225.6 L527.8,225.7 L530.3,225.9 L532.8,226.0 L535.2,226.1 L537.7,226.3 L540.2,226.4 L542.7,226.5 L545.1,226.7 L547.6,226.8 L550.1,226.9 L552.6,227.0 L555.0,227.1 L557.5,227.2 L560.0,227.3" fill="none" stroke="#2e8b57" stroke-width="2"/>
  <path d="M213.3,230.0 L214.1,216.5 L214.8,203.4 L215.5,190.6 L216.2,178.2 L216.9,166.1 L217.7,154.3 L218.4,142.9 L219.1,131.8 L219.8,121.1 L220.6,110.7 L221.3,100.6 L222.0,90.9 L222.7,81.5 L223.4,72.5 L224.2,63.8 L224.9,55.5 L225.6,47.4 L226.3,39.8 L227.1,32.4 L227.8,30.0 L228.5,30.0 L229.2,30.0 L229.9,30.0 L230.7,30.0 L231.4,30.0 L232.1,30.0 L232.8,30.0 L233.6,30.0 L234.3,30.0 L235.0,30.0 L235.7,30.0 L236.4,30.0 L237.2,30.0 L237.9,30.0 L238.6,30.0 L239.3,30.0 L240.1,30.0 L240.8,30.0 L241.5,30.0 L242.2,30.0 L242.9,30.0 L243.7,30.0 L244.4,30.0 L245.1,30.0 L245.8,30.0 L246.6,30.0 L247.3,30.0 L248.0,30.0 L248.7,30.0 L249.4,30.0 L250.2,30.0 L250.9,30.0 L251.6,30.0 L252.3,30.0 L253.1,30.0 L253.8,30.0 L254.5,30.0 L255.2,30.0 L255.9,30.0 L256.7,30.0 L257.4,32.4 L258.1,39.8 L258.8,47.4 L259.6,55.5 L260.3,63.8 L261.0,72.5 L261.7,81.5 L262.4,90.9 L263.2,100.6 L263.9,110.7 L264.6,121.1 L265.3,131.8 L266.1,142.9 L266.8,154.3 L267.5,166.1 L268.2,178.2 L268.9,190.6 L269.7,203.4 L270.4,216.5 L271.1,230.0" fill="none" stroke="#8e44ad" stroke-width="2"/>
  <path d="M213.3,48.2 L216.2,48.2 L219.1,48.2 L222.0,48.2 L224.9,48.2 L227.8,48.2 L230.7,48.2 L233.6,48.2 L236.4,48.2 L239.3,48.2 L242.2,48.2 L245.1,48.2 L248.0,48.2 L250.9,48.2 L253.8,48.2 L256.7,48.2 L259.6,48.2 L262.4,48.2 L265.3,48.2 L268.2,48.2 L271.1,48.2" fill="none" stroke="#e67e22" stroke-width="2"/>
  <text x="395" y="150" font-size="12" fill="#1a4d7a">N(0,1)</text>
  <text x="330" y="110" font-size="12" fill="#c0392b">Exp(1)</text>
  <text x="330" y="185" font-size="12" fill="#2e8b57">Gamma(2,1)</text>
  <text x="278" y="60" font-size="12" fill="#8e44ad">Beta(2,2)</text>
  <text x="278" y="42" font-size="12" fill="#e67e22">Unif(0,1)</text>
  <text x="545" y="246" font-size="12" font-style="italic">x</text>
</svg>

**Step 2 — The families interlock.** With the rate parameterization used above (density $`\propto x^{\alpha-1} e^{-\beta x}`):

- The exponential is $`\mathrm{Gamma}(1, \lambda)`.
- The chi-squared with $`k` degrees of freedom is $`\mathrm{Gamma}(k/2,\, 1/2)` — the density $`\frac{1}{2^{k/2}\Gamma(k/2)} x^{k/2-1} e^{-x/2}` matches $`\beta = 1/2`, not $`\beta = 2`. (The *scale* is 2; the *rate* is 1/2.)
- $`\mathrm{Beta}(1,1)` is $`\mathrm{Unif}(0,1)`.
- If $`X \sim \mathrm{Gamma}(\alpha, 1)` and $`Y \sim \mathrm{Gamma}(\beta, 1)` are independent, then $`X/(X+Y) \sim \mathrm{Beta}(\alpha, \beta)`.

**Step 3 — Shared algebra.** All five belong to the exponential family, which gives them shared algebraic properties (sufficient statistics, conjugate priors). See [Distributional structure and operations](./Distributional-structure-and-operations.md) for closure properties (convolution, mixtures, order statistics) and [Statistical inference](../Statistical-inference/Readme.md) for the role of conjugacy.

*Sources:* Grinstead & Snell ch. 2, 5; [Wikipedia: List of probability distributions](https://en.wikipedia.org/wiki/List_of_probability_distributions).

<details><summary>Example problem</summary>

Verify from the table that $`\mathrm{Gamma}(1, \lambda)` is the exponential distribution and that $`\mathrm{Beta}(1, 1)` is the uniform distribution on $`[0,1]`.

<details><summary>Solution</summary>

Gamma with $`\alpha = 1`: the density is $`\frac{\lambda^1}{\Gamma(1)} x^{0} e^{-\lambda x} = \lambda e^{-\lambda x}` on $`(0,\infty)`, since $`\Gamma(1) = 1` — exactly the exponential density.

Beta with $`\alpha = \beta = 1`: the density is $`\frac{x^0 (1-x)^0}{B(1,1)} = 1` on $`(0,1)`, since $`B(1,1) = \frac{\Gamma(1)\Gamma(1)}{\Gamma(2)} = 1` — exactly the uniform density on $`[0,1]`.

Both checks illustrate the same habit: identify a density by matching it against a known parameterized family, then read off every property (mean, variance, moments) from the family instead of recomputing.

</details>
</details>

</details>

## Convergence in distribution

A sequence of distributions $`X_1, X_2, \ldots` **converges in distribution** to $`X`, written $`X_n \Rightarrow X`, iff

```math
F_n(x) \to F(x) \quad \text{at every continuity point } x \text{ of } F.
```

This is the natural mode of convergence for absolutely continuous laws, and the bridge to the [limit theorems](../Limit-theorems.md): the central limit theorem states that standardized sums converge in distribution to the normal.

<details><summary>Details</summary>

**Step 1 — Why CDFs, not densities.** Convergence of densities is too strong a requirement: an atomic distribution can be a limit of absolutely continuous ones (a narrow spike of width $`1/n` and height $`n` converges in distribution to a point mass), and densities may fail to converge even when distributions do. Convergence at continuity points of $`F` is exactly the right weakening.

**Step 2 — When densities do converge, everything follows (Scheffé's lemma).** If $`f_n \to f` almost everywhere and each $`f_n` is a density with $`\int f_n = \int f = 1`, then $`\int |f_n - f| \to 0`, and consequently $`\sup_x |F_n(x) - F(x)| \to 0`: convergence is uniform over all intervals at once. This is why pointwise density convergence is such a useful certificate.

**Step 3 — The CLT as density convergence.** If $`X_1, X_2, \ldots` are i.i.d. with mean 0 and variance 1, the density of the normalized sum $`S_n = (X_1 + \cdots + X_n)/\sqrt{n}` converges pointwise to the standard normal density $`\phi` (the local central limit theorem, under mild conditions). The picture below shows the same phenomenon in a related family: the Student-$`t` density with $`\nu` degrees of freedom converges to $`\mathcal{N}(0,1)` as $`\nu \to \infty` — heavy tails drain into the center.

<svg width="600" height="270" viewBox="0 0 600 270" xmlns="http://www.w3.org/2000/svg">
  <line x1="30" y1="230" x2="570" y2="230" stroke="#999"/>
  <line x1="40" y1="20" x2="40" y2="230" stroke="#999"/>
  <line x1="170" y1="230" x2="170" y2="225" stroke="#999"/>
  <line x1="300" y1="230" x2="300" y2="225" stroke="#999"/>
  <line x1="430" y1="230" x2="430" y2="225" stroke="#999"/>
  <line x1="560" y1="230" x2="560" y2="225" stroke="#999"/>
  <text x="36" y="246" font-size="11">−4</text>
  <text x="166" y="246" font-size="11">−2</text>
  <text x="296" y="246" font-size="11">0</text>
  <text x="426" y="246" font-size="11">2</text>
  <text x="556" y="246" font-size="11">4</text>
  <path d="M40.0,221.0 L43.2,220.7 L46.5,220.5 L49.7,220.3 L53.0,220.0 L56.3,219.8 L59.5,219.5 L62.8,219.3 L66.0,219.0 L69.3,218.7 L72.5,218.4 L75.7,218.1 L79.0,217.8 L82.3,217.4 L85.5,217.1 L88.8,216.7 L92.0,216.3 L95.3,215.9 L98.5,215.5 L101.8,215.1 L105.0,214.6 L108.2,214.2 L111.5,213.7 L114.8,213.2 L118.0,212.6 L121.3,212.1 L124.5,211.5 L127.8,210.8 L131.0,210.2 L134.3,209.5 L137.5,208.8 L140.8,208.1 L144.0,207.3 L147.3,206.4 L150.5,205.6 L153.8,204.7 L157.0,203.7 L160.3,202.7 L163.5,201.6 L166.8,200.5 L170.0,199.3 L173.3,198.0 L176.5,196.7 L179.8,195.3 L183.0,193.8 L186.3,192.2 L189.5,190.5 L192.8,188.7 L196.0,186.8 L199.3,184.8 L202.5,182.7 L205.8,180.5 L209.0,178.1 L212.3,175.6 L215.5,172.9 L218.8,170.0 L222.0,167.0 L225.3,163.8 L228.5,160.5 L231.8,156.9 L235.0,153.2 L238.3,149.2 L241.5,145.1 L244.8,140.8 L248.0,136.3 L251.3,131.7 L254.5,126.9 L257.8,122.0 L261.0,117.0 L264.3,112.0 L267.5,107.1 L270.8,102.2 L274.0,97.6 L277.3,93.1 L280.5,89.1 L283.8,85.4 L287.0,82.3 L290.3,79.7 L293.5,77.9 L296.8,76.7 L300.0,76.4 L303.3,76.7 L306.5,77.9 L309.8,79.7 L313.0,82.3 L316.3,85.4 L319.5,89.1 L322.8,93.1 L326.0,97.6 L329.3,102.2 L332.5,107.1 L335.8,112.0 L339.0,117.0 L342.3,122.0 L345.5,126.9 L348.8,131.7 L352.0,136.3 L355.3,140.8 L358.5,145.1 L361.8,149.2 L365.0,153.2 L368.3,156.9 L371.5,160.5 L374.8,163.8 L378.0,167.0 L381.3,170.0 L384.5,172.9 L387.8,175.6 L391.0,178.1 L394.3,180.5 L397.5,182.7 L400.8,184.8 L404.0,186.8 L407.3,188.7 L410.5,190.5 L413.8,192.2 L417.0,193.8 L420.3,195.3 L423.5,196.7 L426.8,198.0 L430.0,199.3 L433.3,200.5 L436.5,201.6 L439.8,202.7 L443.0,203.7 L446.3,204.7 L449.5,205.6 L452.8,206.4 L456.0,207.3 L459.3,208.1 L462.5,208.8 L465.8,209.5 L469.0,210.2 L472.3,210.8 L475.5,211.5 L478.8,212.1 L482.0,212.6 L485.3,213.2 L488.5,213.7 L491.8,214.2 L495.0,214.6 L498.3,215.1 L501.5,215.5 L504.8,215.9 L508.0,216.3 L511.3,216.7 L514.5,217.1 L517.8,217.4 L521.0,217.8 L524.3,218.1 L527.5,218.4 L530.8,218.7 L534.0,219.0 L537.3,219.3 L540.5,219.5 L543.8,219.8 L547.0,220.0 L550.3,220.3 L553.5,220.5 L556.8,220.7 L560.0,221.0" fill="none" stroke="#c0392b" stroke-width="2"/>
  <path d="M40.0,225.9 L43.2,225.7 L46.5,225.5 L49.7,225.4 L53.0,225.1 L56.3,224.9 L59.5,224.7 L62.8,224.5 L66.0,224.2 L69.3,223.9 L72.5,223.7 L75.7,223.4 L79.0,223.0 L82.3,222.7 L85.5,222.3 L88.8,222.0 L92.0,221.6 L95.3,221.2 L98.5,220.7 L101.8,220.2 L105.0,219.7 L108.2,219.2 L111.5,218.7 L114.8,218.1 L118.0,217.4 L121.3,216.8 L124.5,216.1 L127.8,215.3 L131.0,214.5 L134.3,213.7 L137.5,212.7 L140.8,211.8 L144.0,210.8 L147.3,209.7 L150.5,208.5 L153.8,207.3 L157.0,206.0 L160.3,204.6 L163.5,203.1 L166.8,201.5 L170.0,199.9 L173.3,198.1 L176.5,196.2 L179.8,194.2 L183.0,192.1 L186.3,189.8 L189.5,187.4 L192.8,184.9 L196.0,182.2 L199.3,179.4 L202.5,176.4 L205.8,173.3 L209.0,170.0 L212.3,166.5 L215.5,162.9 L218.8,159.1 L222.0,155.1 L225.3,151.0 L228.5,146.7 L231.8,142.3 L235.0,137.7 L238.3,133.1 L241.5,128.3 L244.8,123.5 L248.0,118.6 L251.3,113.7 L254.5,108.8 L257.8,104.0 L261.0,99.2 L264.3,94.6 L267.5,90.2 L270.8,86.1 L274.0,82.2 L277.3,78.6 L280.5,75.4 L283.8,72.6 L287.0,70.3 L290.3,68.4 L293.5,67.1 L296.8,66.2 L300.0,66.0 L303.3,66.2 L306.5,67.1 L309.8,68.4 L313.0,70.3 L316.3,72.6 L319.5,75.4 L322.8,78.6 L326.0,82.2 L329.3,86.1 L332.5,90.2 L335.8,94.6 L339.0,99.2 L342.3,104.0 L345.5,108.8 L348.8,113.7 L352.0,118.6 L355.3,123.5 L358.5,128.3 L361.8,133.1 L365.0,137.7 L368.3,142.3 L371.5,146.7 L374.8,151.0 L378.0,155.1 L381.3,159.1 L384.5,162.9 L387.8,166.5 L391.0,170.0 L394.3,173.3 L397.5,176.4 L400.8,179.4 L404.0,182.2 L407.3,184.9 L410.5,187.4 L413.8,189.8 L417.0,192.1 L420.3,194.2 L423.5,196.2 L426.8,198.1 L430.0,199.9 L433.3,201.5 L436.5,203.1 L439.8,204.6 L443.0,206.0 L446.3,207.3 L449.5,208.5 L452.8,209.7 L456.0,210.8 L459.3,211.8 L462.5,212.7 L465.8,213.7 L469.0,214.5 L472.3,215.3 L475.5,216.1 L478.8,216.8 L482.0,217.4 L485.3,218.1 L488.5,218.7 L491.8,219.2 L495.0,219.7 L498.3,220.2 L501.5,220.7 L504.8,221.2 L508.0,221.6 L511.3,222.0 L514.5,222.3 L517.8,222.7 L521.0,223.0 L524.3,223.4 L527.5,223.7 L530.8,223.9 L534.0,224.2 L537.3,224.5 L540.5,224.7 L543.8,224.9 L547.0,225.1 L550.3,225.4 L553.5,225.5 L556.8,225.7 L560.0,225.9" fill="none" stroke="#2e8b57" stroke-width="2"/>
  <path d="M40.0,229.9 L43.2,229.9 L46.5,229.9 L49.7,229.9 L53.0,229.9 L56.3,229.8 L59.5,229.8 L62.8,229.8 L66.0,229.7 L69.3,229.7 L72.5,229.6 L75.7,229.5 L79.0,229.4 L82.3,229.3 L85.5,229.2 L88.8,229.1 L92.0,228.9 L95.3,228.7 L98.5,228.5 L101.8,228.3 L105.0,228.0 L108.2,227.7 L111.5,227.3 L114.8,226.9 L118.0,226.4 L121.3,225.9 L124.5,225.3 L127.8,224.7 L131.0,223.9 L134.3,223.1 L137.5,222.2 L140.8,221.1 L144.0,220.0 L147.3,218.7 L150.5,217.4 L153.8,215.8 L157.0,214.2 L160.3,212.4 L163.5,210.4 L166.8,208.3 L170.0,206.0 L173.3,203.5 L176.5,200.8 L179.8,197.9 L183.0,194.9 L186.3,191.6 L189.5,188.2 L192.8,184.5 L196.0,180.7 L199.3,176.7 L202.5,172.4 L205.8,168.0 L209.0,163.5 L212.3,158.7 L215.5,153.9 L218.8,148.9 L222.0,143.7 L225.3,138.5 L228.5,133.2 L231.8,127.9 L235.0,122.5 L238.3,117.1 L241.5,111.8 L244.8,106.5 L248.0,101.3 L251.3,96.2 L254.5,91.3 L257.8,86.5 L261.0,82.0 L264.3,77.6 L267.5,73.6 L270.8,69.8 L274.0,66.4 L277.3,63.3 L280.5,60.5 L283.8,58.2 L287.0,56.3 L290.3,54.7 L293.5,53.6 L296.8,53.0 L300.0,52.7 L303.3,53.0 L306.5,53.6 L309.8,54.7 L313.0,56.3 L316.3,58.2 L319.5,60.5 L322.8,63.3 L326.0,66.4 L329.3,69.8 L332.5,73.6 L335.8,77.6 L339.0,82.0 L342.3,86.5 L345.5,91.3 L348.8,96.2 L352.0,101.3 L355.3,106.5 L358.5,111.8 L361.8,117.1 L365.0,122.5 L368.3,127.9 L371.5,133.2 L374.8,138.5 L378.0,143.7 L381.3,148.9 L384.5,153.9 L387.8,158.7 L391.0,163.5 L394.3,168.0 L397.5,172.4 L400.8,176.7 L404.0,180.7 L407.3,184.5 L410.5,188.2 L413.8,191.6 L417.0,194.9 L420.3,197.9 L423.5,200.8 L426.8,203.5 L430.0,206.0 L433.3,208.3 L436.5,210.4 L439.8,212.4 L443.0,214.2 L446.3,215.8 L449.5,217.4 L452.8,218.7 L456.0,220.0 L459.3,221.1 L462.5,222.2 L465.8,223.1 L469.0,223.9 L472.3,224.7 L475.5,225.3 L478.8,225.9 L482.0,226.4 L485.3,226.9 L488.5,227.3 L491.8,227.7 L495.0,228.0 L498.3,228.3 L501.5,228.5 L504.8,228.7 L508.0,228.9 L511.3,229.1 L514.5,229.2 L517.8,229.3 L521.0,229.4 L524.3,229.5 L527.5,229.6 L530.8,229.7 L534.0,229.7 L537.3,229.8 L540.5,229.8 L543.8,229.8 L547.0,229.9 L550.3,229.9 L553.5,229.9 L556.8,229.9 L560.0,229.9" fill="none" stroke="#1a4d7a" stroke-width="2"/>
  <text x="330" y="70" font-size="12" fill="#c0392b">t, ν = 1</text>
  <text x="330" y="120" font-size="12" fill="#2e8b57">t, ν = 3</text>
  <text x="330" y="180" font-size="12" fill="#1a4d7a">N(0,1)</text>
  <text x="545" y="246" font-size="12" font-style="italic">x</text>
</svg>

*Sources:* [Wikipedia: Convergence of random variables](https://en.wikipedia.org/wiki/Convergence_of_random_variables); [Limit theorems](../Limit-theorems.md).

<details><summary>Example problem</summary>

The Student-$`t` density with $`\nu` degrees of freedom converges pointwise to the standard normal density $`\phi` as $`\nu \to \infty`. Use Scheffé's lemma to conclude something about the CDFs.

<details><summary>Solution</summary>

Each $`t_\nu` density integrates to 1, and so does $`\phi`. Pointwise convergence plus equal total mass is exactly the hypothesis of Scheffé's lemma, so $`\int |f_\nu - \phi| \to 0` in $`L^1`. For any interval $`(a, b]`,

```math
|F_\nu(b) - F_\nu(a) - (\Phi(b) - \Phi(a))| \leq \int_a^b |f_\nu - \phi| \leq \int |f_\nu - \phi| \to 0,
```

uniformly in $`a, b`: the CDFs converge *uniformly*, $`\sup_x |F_\nu(x) - \Phi(x)| \to 0`. This is much stronger than the pointwise-at-continuity-points convergence in the definition, and it is what makes the normal approximation reliable over whole ranges at once.

</details>
</details>

</details>

## Example problem

**Problem.** Let $`X \sim \mathcal{N}(0, 1)`. Find the density of $`Y = X^2` and compute $`E[Y]`.

<details><summary>Solution</summary>

The map $`g(x) = x^2` is not injective on $`\mathbb{R}`. For $`y > 0`, the preimages are $`\pm\sqrt{y}` with $`|g'(x)| = 2|x| = 2\sqrt{y}`. Applying the transformation formula:

```math
f_Y(y) = \frac{f_X(\sqrt{y}) + f_X(-\sqrt{y})}{2\sqrt{y}} = \frac{2 \cdot \frac{1}{\sqrt{2\pi}} e^{-y/2}}{2\sqrt{y}} = \frac{1}{\sqrt{2\pi}\, y^{1/2}} e^{-y/2}, \quad y > 0.
```

This is a $`\mathrm{Gamma}(1/2,\, 1/2)` distribution — the chi-squared distribution with 1 degree of freedom (rate $`\beta = 1/2`, matching the density $`\frac{\beta^\alpha}{\Gamma(\alpha)} y^{\alpha-1} e^{-\beta y}` with $`\alpha = 1/2`).

$`E[Y] = E[X^2] = \mathrm{Var}(X) + (E[X])^2 = 1 + 0 = 1`, which agrees with the gamma mean $`\alpha/\beta = (1/2)/(1/2) = 1`.

</details>
