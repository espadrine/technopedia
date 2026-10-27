# Gaussian processes

A **Gaussian process** is a stochastic process $`(X_t)_{t \in T}` in which *every* finite subfamily is jointly Gaussian. It is the "Gaussian" way to put a probability distribution on an entire *function*: instead of a random variable taking values in $`\mathbb{R}`, you get a random function $`f : T \to \mathbb{R}`, and the only ingredients you must supply are a **mean function** $`m(t) = \mathbb{E}[X_t]` and a **covariance kernel** $`k(s,t) = \mathrm{Cov}(X_s, X_t)`.

Gaussian processes are relevant whenever you want a *distribution over functions* with honest uncertainty: interpolating sparse spatial measurements (geostatistics / kriging), fitting a regression model that reports a calibrated error bar at every input (machine learning), or searching for the optimum of an expensive black-box function (Bayesian optimization). They are the natural tool whenever the answer you want is a curve or a field, not a single number.

> **Authoritative sources**
> - Rasmussen & Williams, [*Gaussian Processes for Machine Learning*](http://www.gaussianprocess.org/gpml/) (MIT Press, 2006).
> - Matheron, G. (1963). "Principles of geostatistics." *Economic Geology* 58(1) — the origin of kriging, the GP-regression computation in geostatistics.

## Definition (cheatsheet)

- **Finite-dimensional property:** for any $`t_1, \dots, t_n \in T`, the vector $`(X_{t_1}, \dots, X_{t_n})` is multivariate normal with mean vector $`(m(t_i))` and covariance matrix $`(k(t_i, t_j))`.
- The kernel $`k` must be **symmetric** ($`k(s,t) = k(t,s)`) and **positive semi-definite** (PSD): $`\sum_{i,j} c_i c_j\, k(t_i, t_j) \geq 0` for all real coefficients $`c_i` and all choices of points $`t_i`.
- **Key examples:** [Brownian motion](./Brownian-motion.md) ($`k(s,t) = \min(s,t)`), the Ornstein–Uhlenbeck process ($`k(s,t) \propto e^{-|t-s|}`), and the squared-exponential kernel ($`k(s,t) = e^{-(s-t)^2/2\ell^2}`) used in machine learning.

## The covariance kernel and positive-definiteness

**Definition.** A function $`k : T \times T \to \mathbb{R}` is a **valid covariance kernel** if it is symmetric and positive semi-definite (PSD): for every $`n`, every choice of points $`t_1,\dots,t_n \in T`, and every real vector $`(c_i)`,

```math
\sum_{i=1}^{n}\sum_{j=1}^{n} c_i\, c_j\, k(t_i, t_j) \;\geq\; 0.
```

PSD is exactly the condition that makes $`(k(t_i,t_j))` a legitimate covariance matrix for every finite set of points, so that a Gaussian process with that kernel actually exists.

<details><summary>Details</summary>

**Why PSD is the right condition.** A covariance matrix $`K` of any random vector must satisfy $`\mathrm{Var}\big(\sum_i c_i X_i\big) = \sum_{i,j} c_i c_j K_{ij} \geq 0`, because a variance is never negative. So PSD is not an extra assumption — it is precisely the requirement that $`k` can be the covariance of *some* Gaussian vector at every finite set of points. Conversely, if $`k` is PSD, the Kolmogorov extension theorem guarantees a Gaussian process with that kernel.

**Worked check — a kernel that passes.** Take $`k(s,t) = \min(s,t)` on $`[0,\infty)` (the Brownian kernel). For ordered points $`0 \le t_1 < \cdots < t_n`, the matrix $`K_{ij} = \min(t_i,t_j)` is exactly the covariance matrix of the vector $`(W_{t_1},\dots,W_{t_n})` of a [Brownian motion](./Brownian-motion.md), so it is PSD by construction. Concretely, for two points $`s<t`, $`K = \begin{pmatrix} s & s \\ s & t \end{pmatrix}` has determinant $`st - s^2 = s(t-s) \geq 0` and positive trace, hence PSD.

**Worked check — a candidate that fails.** Consider the tempting candidate $`k(s,t) = s^2 + t^2`. At the two points $`s=1, t=2` it gives the matrix

```math
K = \begin{pmatrix} 1^2+1^2 & 1^2+2^2 \\ 1^2+2^2 & 2^2+2^2 \end{pmatrix} = \begin{pmatrix} 2 & 5 \\ 5 & 8 \end{pmatrix},
```

whose determinant is $`2\cdot 8 - 5^2 = 16 - 25 = -9 < 0`. A $`2\times 2` symmetric matrix with negative determinant has a negative eigenvalue, so it is **not** PSD. Indeed, with $`c = (-1.77,\, 1)` one gets $`c^{\top} K c \approx -3.4 < 0`. The candidate $`s^2+t^2` is therefore *not* a valid kernel: it cannot be the covariance of any random process. (The fix is to use a *product* $`s\,t`, which is rank-one and PSD, since $`\sum_{i,j} c_i c_j s_i t_j = \big(\sum_i c_i s_i\big)^2 \geq 0`.)

<details><summary>Example problem</summary>

Is $`k(s,t) = 1 + s t` a valid kernel on $`\mathbb{R}`?

<details><summary>Solution</summary>

Yes. Write $`k(s,t) = 1 + s t = 1\cdot 1 + s\cdot t`, a sum of two rank-one PSD kernels: the constant kernel $`1` (PSD because $`\sum_{i,j} c_i c_j = (\sum_i c_i)^2 \geq 0`) and the product kernel $`s t` (PSD as shown above). A non-negative linear combination of PSD kernels is PSD, so $`1 + st` is a valid kernel.
</details>

</details>

</details>

## Why the kernel is everything: Gaussianity collapses the specification

**Definition.** A general stochastic process is specified by *all* of its finite-dimensional distributions (infinitely many objects). A Gaussian process is specified by **only two functions** — the mean $`m` and the kernel $`k` — because a multivariate normal distribution is completely determined by its mean vector and covariance matrix.

<details><summary>Details</summary>

**The global idea.** For an arbitrary process, knowing the law of $`(X_{t_1}, X_{t_2})` tells you nothing about the law of $`(X_{t_1}, X_{t_2}, X_{t_3})`; you must specify each finite-dimensional distribution separately, and they must all be mutually consistent. For a Gaussian process this burden vanishes: the joint law of any finite subfamily is a multivariate normal, and a multivariate normal $`\mathcal{N}(\mu, \Sigma)` has *no free parameters beyond* $`\mu` and $`\Sigma`. So once you fix $`m` and $`k`, every finite-dimensional distribution is forced, and consistency is automatic.

**Concrete example.** Suppose $`T = \{1, 2, 3\}`. To fully specify a *general* process on these three points you would need: three one-dimensional laws, three two-dimensional joint laws, and one three-dimensional joint law, all consistent with each other. To specify a *Gaussian* process on the same three points you need only $`3` numbers (the means $`m(1),m(2),m(3)`) and a $`3\times 3` symmetric PSD matrix (the kernel values $`k(i,j)`). That is the entire specification.

**The payoff.** Because the whole law is pinned down by $`m` and $`k`, every question about the process — its conditional distributions, its sample-path smoothness, its predictions — reduces to manipulating the single function $`k`. The next two sections are the two most important consequences: conditioning (GP regression) and regularity.

<details><summary>Example problem</summary>

A Gaussian process on $`T=\{a,b\}` has $`m(a)=m(b)=0`, $`\mathrm{Var}(X_a)=\mathrm{Var}(X_b)=1`, and $`\mathrm{Cov}(X_a,X_b)=\rho`. What is the joint density of $`(X_a, X_b)`, and for which $`\rho` is it a valid Gaussian process?

<details><summary>Solution</summary>

The joint law is the bivariate normal $`\mathcal{N}\big(\mathbf{0}, \begin{pmatrix} 1 & \rho \\ \rho & 1 \end{pmatrix}\big)`, with density

```math
f(x,y) = \frac{1}{2\pi\sqrt{1-\rho^2}} \exp\!\left( -\frac{x^2 - 2\rho x y + y^2}{2(1-\rho^2)} \right).
```

It is a valid Gaussian process exactly when the covariance matrix is PSD, i.e. when its determinant $`1-\rho^2 \geq 0`, so $`|\rho| \leq 1`. This is the two-point shadow of the PSD condition from the previous section.
</details>

</details>

</details>

## Common kernels

**Definition.** A small family of kernels generates most applications. Each is controlled by an amplitude $`\sigma^2` and a **length-scale** $`\ell > 0` that sets the distance over which values stay correlated:

<table>
<tr><th>Kernel</th><th>Formula <i>k</i>(<i>s</i>,<i>t</i>)</th><th>Sample paths</th></tr>
<tr><td>Brownian (random walk)</td><td>σ² min(<i>s</i>,<i>t</i>)</td><td>continuous, nowhere differentiable</td></tr>
<tr><td>Ornstein–Uhlenbeck</td><td>σ² e<sup>−|<i>s</i>−<i>t</i>|/ℓ</sup></td><td>continuous, nowhere differentiable</td></tr>
<tr><td>Matérn (ν)</td><td>(σ²/Γ(ν)) · (√2·|<i>s</i>−<i>t</i>|/ℓ)<sup>ν</sup> · K<sub>ν</sub>(√2·|<i>s</i>−<i>t</i>|/ℓ)</td><td>ν−1 times differentiable</td></tr>
<tr><td>Squared-exponential (RBF)</td><td>σ² e<sup>−(<i>s</i>−<i>t</i>)²/2ℓ²</sup></td><td>infinitely differentiable</td></tr>
</table>

The length-scale $`\ell` is the single most important knob: a small $`\ell` makes the kernel decay fast, so values far apart are nearly independent and the function looks wiggly; a large $`\ell` keeps values correlated over long distances, so the function looks smooth.

<details><summary>Details</summary>

**Reading smoothness off the decay.** The figure below plots $`k(0,t)` (correlation with the origin) against distance $`t` for three kernels with the same $`\ell = 0.5`. The squared-exponential curve leaves the origin *flat* (its derivative at $`t=0` is $`0`), the Matérn curve leaves with a *corner*, and the Ornstein–Uhlenbeck curve falls off as a pure exponential. That difference in local shape is exactly what shows up in the sample paths: flat departure gives smooth paths, a corner gives continuous-but-rough paths.

<svg viewBox="0 0 600 210" width="100%" role="img" aria-label="Kernel decay curves k(0,t) for squared-exponential, Matern, and Ornstein-Uhlenbeck kernels">
  <rect x="0" y="0" width="600" height="210" fill="#ffffff"/>
  <line x1="30" y1="170" x2="570" y2="170" stroke="#c9d3dc" stroke-width="1"/>
  <line x1="30" y1="30" x2="30" y2="170" stroke="#c9d3dc" stroke-width="1"/>
  <line x1="30" y1="100" x2="570" y2="100" stroke="#eef1f4" stroke-width="1"/>
  <polyline fill="none" stroke="#2c5f8a" stroke-width="2.5" points="30.0,30.0 35.4,30.0 40.8,30.1 46.2,30.3 51.6,30.4 57.0,30.7 62.4,31.0 67.8,31.4 73.2,31.8 78.6,32.2 84.0,32.8 89.4,33.3 94.8,34.0 100.2,34.7 105.6,35.4 111.0,36.2 116.4,37.0 121.8,37.9 127.2,38.8 132.6,39.8 138.0,40.8 143.4,41.8 148.8,42.9 154.2,44.1 159.6,45.2 165.0,46.5 170.4,47.7 175.8,49.0 181.2,50.3 186.6,51.7 192.0,53.1 197.4,54.5 202.8,55.9 208.2,57.4 213.6,58.9 219.0,60.4 224.4,62.0 229.8,63.5 235.2,65.1 240.6,66.7 246.0,68.3 251.4,70.0 256.8,71.6 262.2,73.3 267.6,74.9 273.0,76.6 278.4,78.3 283.8,80.0 289.2,81.7 294.6,83.4 300.0,85.1 305.4,86.8 310.8,88.5 316.2,90.2 321.6,91.9 327.0,93.5 332.4,95.2 337.8,96.9 343.2,98.6 348.6,100.2 354.0,101.9 359.4,103.5 364.8,105.1 370.2,106.7 375.6,108.3 381.0,109.9 386.4,111.4 391.8,113.0 397.2,114.5 402.6,116.0 408.0,117.5 413.4,118.9 418.8,120.4 424.2,121.8 429.6,123.2 435.0,124.5 440.4,125.9 445.8,127.2 451.2,128.5 456.6,129.8 462.0,131.1 467.4,132.3 472.8,133.5 478.2,134.7 483.6,135.9 489.0,137.0 494.4,138.1 499.8,139.2 505.2,140.2 510.6,141.3 516.0,142.3 521.4,143.3 526.8,144.2 532.2,145.2 537.6,146.1 543.0,147.0 548.4,147.8 553.8,148.7 559.2,149.5 564.6,150.3 570.0,151.1"/>
  <polyline fill="none" stroke="#1e7d4f" stroke-width="2.5" points="30.0,30.0 35.4,30.0 40.8,30.1 46.2,30.2 51.6,30.4 57.0,30.7 62.4,30.9 67.8,31.3 73.2,31.6 78.6,32.0 84.0,32.5 89.4,32.9 94.8,33.4 100.2,34.0 105.6,34.6 111.0,35.2 116.4,35.8 121.8,36.5 127.2,37.2 132.6,37.9 138.0,38.6 143.4,39.4 148.8,40.2 154.2,41.0 159.6,41.8 165.0,42.6 170.4,43.5 175.8,44.4 181.2,45.2 186.6,46.2 192.0,47.1 197.4,48.0 202.8,48.9 208.2,49.9 213.6,50.8 219.0,51.8 224.4,52.8 229.8,53.8 235.2,54.8 240.6,55.8 246.0,56.8 251.4,57.8 256.8,58.8 262.2,59.8 267.6,60.8 273.0,61.9 278.4,62.9 283.8,63.9 289.2,64.9 294.6,66.0 300.0,67.0 305.4,68.0 310.8,69.1 316.2,70.1 321.6,71.1 327.0,72.1 332.4,73.2 337.8,74.2 343.2,75.2 348.6,76.2 354.0,77.2 359.4,78.2 364.8,79.2 370.2,80.3 375.6,81.3 381.0,82.2 386.4,83.2 391.8,84.2 397.2,85.2 402.6,86.2 408.0,87.1 413.4,88.1 418.8,89.1 424.2,90.0 429.6,91.0 435.0,91.9 440.4,92.8 445.8,93.8 451.2,94.7 456.6,95.6 462.0,96.5 467.4,97.4 472.8,98.3 478.2,99.2 483.6,100.1 489.0,100.9 494.4,101.8 499.8,102.7 505.2,103.5 510.6,104.4 516.0,105.2 521.4,106.0 526.8,106.9 532.2,107.7 537.6,108.5 543.0,109.3 548.4,110.1 553.8,110.9 559.2,111.6 564.6,112.4 570.0,113.2"/>
  <polyline fill="none" stroke="#c0392b" stroke-width="2.5" points="30.0,30.0 35.4,32.8 40.8,35.5 46.2,38.2 51.6,40.8 57.0,43.3 62.4,45.8 67.8,48.3 73.2,50.7 78.6,53.1 84.0,55.4 89.4,57.6 94.8,59.9 100.2,62.1 105.6,64.2 111.0,66.3 116.4,68.3 121.8,70.4 127.2,72.3 132.6,74.3 138.0,76.2 143.4,78.0 148.8,79.8 154.2,81.6 159.6,83.4 165.0,85.1 170.4,86.8 175.8,88.4 181.2,90.0 186.6,91.6 192.0,93.2 197.4,94.7 202.8,96.2 208.2,97.6 213.6,99.1 219.0,100.5 224.4,101.9 229.8,103.2 235.2,104.5 240.6,105.8 246.0,107.1 251.4,108.3 256.8,109.6 262.2,110.8 267.6,111.9 273.0,113.1 278.4,114.2 283.8,115.3 289.2,116.4 294.6,117.5 300.0,118.5 305.4,119.5 310.8,120.5 316.2,121.5 321.6,122.5 327.0,123.4 332.4,124.3 337.8,125.2 343.2,126.1 348.6,127.0 354.0,127.8 359.4,128.7 364.8,129.5 370.2,130.3 375.6,131.1 381.0,131.8 386.4,132.6 391.8,133.3 397.2,134.1 402.6,134.8 408.0,135.5 413.4,136.2 418.8,136.8 424.2,137.5 429.6,138.1 435.0,138.8 440.4,139.4 445.8,140.0 451.2,140.6 456.6,141.2 462.0,141.7 467.4,142.3 472.8,142.8 478.2,143.4 483.6,143.9 489.0,144.4 494.4,144.9 499.8,145.4 505.2,145.9 510.6,146.4 516.0,146.9 521.4,147.3 526.8,147.8 532.2,148.2 537.6,148.6 543.0,149.1 548.4,149.5 553.8,149.9 559.2,150.3 564.6,150.7 570.0,151.1"/>
  <text x="575" y="174" font-size="12" fill="#667" text-anchor="end">t</text>
  <text x="26" y="34" font-size="12" fill="#667" text-anchor="end">1</text>
  <text x="26" y="174" font-size="12" fill="#667" text-anchor="end">0</text>
  <text x="300" y="205" font-size="12" fill="#667" text-anchor="middle">correlation k(0,t) vs distance t,  ℓ = 0.5</text>
  <g font-size="12">
    <rect x="360" y="40" width="12" height="12" fill="#2c5f8a"/><text x="378" y="50" fill="#333">squared-exponential</text>
    <rect x="360" y="60" width="12" height="12" fill="#1e7d4f"/><text x="378" y="70" fill="#333">Matérn (ν = 3/2)</text>
    <rect x="360" y="80" width="12" height="12" fill="#c0392b"/><text x="378" y="90" fill="#333">Ornstein–Uhlenbeck</text>
  </g>
</svg>

**The Matérn family as a dial.** The Matérn kernel interpolates between the two extremes: for $`\nu = 1/2` it reduces exactly to the Ornstein–Uhlenbeck kernel $`\sigma^2 e^{-|s-t|/\ell}`, for $`\nu = 3/2` to $`\sigma^2(1 + |s-t|/\ell)\, e^{-|s-t|/\ell}`, and as $`\nu \to \infty` it approaches the squared-exponential kernel. The parameter $`\nu` controls the number of continuous derivatives of the sample paths (see the regularity section).

<details><summary>Example problem</summary>

Two models of a temperature field use the same amplitude but length-scales $`\ell = 1` km and $`\ell = 10` km (squared-exponential kernel). Which model predicts that two stations 5 km apart are more strongly correlated, and why?

<details><summary>Solution</summary>

The $`\ell = 10` km model. The squared-exponential correlation at distance $`d` is $`e^{-d^2/2\ell^2}`. At $`d = 5` km this is $`e^{-25/2}` for $`\ell = 1` (≈ $`3\times 10^{-6}`, essentially uncorrelated) but $`e^{-25/200}` for $`\ell = 10` (≈ $`0.88`, strongly correlated). A larger length-scale stretches the correlation over longer distances, so nearby stations stay correlated.
</details>

</details>

</details>

## GP regression (kriging)

**Definition.** Given a GP prior $`f \sim \mathcal{GP}(m, k)` and noiseless observations $`y_i = f(t_i)` at points $`t_1,\dots,t_n`, the posterior at a new point $`t_0` is again Gaussian. Writing $`K_{ij} = k(t_i,t_j)`, $`k_* = (k(t_0,t_1),\dots,k(t_0,t_n))^{\top}`, $`y = (y_1,\dots,y_n)^{\top}` and $`m = (m(t_1),\dots,m(t_n))^{\top}`, the **posterior mean** and **posterior variance** are

```math
m_*(t_0) \;=\; m(t_0) + k_*^{\top}\, K^{-1}\big(y - m\big),
\qquad
\sigma_*^2(t_0) \;=\; k(t_0,t_0) - k_*^{\top}\, K^{-1}\, k_* .
```

With independent observation noise of variance $`\sigma_n^2`, replace $`K` by $`K + \sigma_n^2 I` in both formulas. This is **kriging** in geostatistics and **Gaussian-process regression** in machine learning.

<details><summary>Details</summary>

**The global idea.** Conditioning a multivariate normal is pure linear algebra: the conditional distribution of one component given the others is Gaussian, with mean and covariance given by block-matrix formulas. Because a GP is just a (possibly infinite) multivariate normal, conditioning the *function* $`f` on its values at the observed points is the same computation, and the answer is again a GP — the **posterior GP** — whose mean and kernel are the two formulas above. The posterior mean is a weighted average of the observations (the weights are $`k_*^{\top}K^{-1}`), and the posterior variance is the prior variance $`k(t_0,t_0)` *minus* the information the observations carry about $`t_0`.

**Why the variance shrinks near the data.** The term $`k_*^{\top}K^{-1}k_*` measures how correlated $`t_0` is with the observed points. If $`t_0` coincides with an observed point, $`k_*` is a row of $`K` and the variance becomes exactly $`0` (noiseless case): you already know the value there. Far from the data, $`k_*` is small and the variance returns to the prior $`k(t_0,t_0)`. This "tighten around the data, relax away from it" behavior is the whole point of the method.

**Numeric example (Brownian kernel).** Let $`m \equiv 0` and $`k(s,t) = \min(s,t)`. Observe $`y_1 = 1` at $`t_1 = 1` and $`y_2 = 3` at $`t_2 = 4`, and predict at $`t_0 = 2`.

```math
K = \begin{pmatrix} 1 & 1 \\ 1 & 4 \end{pmatrix},\quad
k_* = \begin{pmatrix} 1 \\ 2 \end{pmatrix},\quad
k(t_0,t_0) = 2,\quad
K^{-1} = \tfrac{1}{3}\begin{pmatrix} 4 & -1 \\ -1 & 1 \end{pmatrix}.
```

Then $`K^{-1}y = \tfrac{1}{3}(1, 2)^{\top}`, so

```math
m_*(2) = k_*^{\top}K^{-1}y = (1,2)\cdot\tfrac{1}{3}(1,2)^{\top} = \tfrac{1}{3} + \tfrac{4}{3} = \tfrac{5}{3} \approx 1.67,
```

```math
\sigma_*^2(2) = 2 - k_*^{\top}K^{-1}k_* = 2 - (1,2)\cdot\tfrac{1}{3}(1,2)^{\top} = 2 - \tfrac{5}{3} = \tfrac{1}{3} \approx 0.33.
```

So the model predicts $`f(2) \approx 1.67` with standard deviation $`\sqrt{1/3} \approx 0.58`. As a sanity check, predicting at the observed point $`t_0 = 1` gives $`k_* = (1,1)^{\top}` and $`\sigma_*^2(1) = 1 - (1,1)\cdot\tfrac{1}{3}(3,0)^{\top} = 1 - 1 = 0`, exactly as it must.

The interactive simulation below shows this in action: a hidden smooth function is sampled from a GP, a few points are observed, and the posterior mean with its $`\pm 2\sigma_*` confidence band is drawn. Add observations to watch the band tighten around the data and relax between them.

<iframe src="./Gaussian-processes.simulation.html" title="Gaussian-process regression: posterior mean and confidence band tightening around observed points"></iframe>

<details><summary>Example problem</summary>

A noiseless GP has zero mean and kernel $`k(s,t) = \min(s,t)`. You observe $`f(1) = 2`. What is the posterior mean and variance of $`f(4)`?

<details><summary>Solution</summary>

With a single observation, $`K = [1]`, $`k_* = [\min(4,1)] = [1]`, $`k(4,4) = 4`, and $`y = [2]`. The posterior mean is $`m_*(4) = k_* K^{-1} y = 1 \cdot 1 \cdot 2 = 2`, and the posterior variance is $`\sigma_*^2(4) = 4 - k_* K^{-1} k_* = 4 - 1 = 3`. Intuitively, $`f(4) = f(1) + (f(4)-f(1))` with an independent increment of variance $`4-1 = 3`, so the prediction is the observed value plus an uncertainty of $`\sqrt{3}`.
</details>

</details>

</details>

## Sample-path regularity

**Definition.** The smoothness of a GP's sample paths is read off the kernel through the **Kolmogorov continuity criterion**: if there exist constants $`\alpha > 0`, $`\beta > 0`, $`C < \infty` such that

```math
\mathbb{E}\big[\,|X_t - X_s|^{\alpha}\big] \;\leq\; C\,|t - s|^{1+\beta}
\qquad \text{for all } s, t,
```

then the process admits a **continuous** modification. For a GP with $`\mathrm{Var}(X_t) = \sigma^2` constant, take $`\alpha = 2` and the left side is $`\mathrm{Var}(X_t - X_s) = 2\big(\sigma^2 - k(s,t)\big)`, so continuity follows from how fast $`\sigma^2 - k(s,t)` shrinks as $`s \to t`.

<details><summary>Details</summary>

**The global idea.** The criterion says: if the expected size of an increment over a small gap $`|t-s|` is *smaller* than the gap itself (raised to a power $`> 1`), the paths must be continuous. For a Gaussian process the increment $`X_t - X_s` is Gaussian, so its typical size is its standard deviation $`\sqrt{\mathrm{Var}(X_t-X_s)}`. The question "are the paths continuous?" becomes "does $`\mathrm{Var}(X_t - X_s)` go to zero faster than $`|t-s|`?"

**Concrete examples, from the kernel table.**

- **Brownian motion** ($`k(s,t)=\min(s,t)`): for $`s < t`, $`\mathrm{Var}(W_t - W_s) = t - s = |t-s|`. This is $`|t-s|^{1+0}`, right at the borderline — the criterion gives **continuity** but no differentiability. Brownian paths are continuous yet nowhere differentiable.
- **Squared-exponential** ($`k(s,t)=e^{-(s-t)^2/2\ell^2}`): near $`s=t`, $`1 - k(s,t) \approx (s-t)^2/2\ell^2`, so $`\mathrm{Var}(X_t-X_s) \approx C\,|t-s|^{2}` = $`|t-s|^{1+1}` with $`\beta = 1`. The paths are not just continuous but **infinitely differentiable**.
- **Matérn** ($`\nu`): near $`s=t`, $`1 - k(s,t) \sim C\,|t-s|^{2\nu}`. Continuity needs $`2\nu > 1` (i.e. $`\nu > 1/2`); differentiability needs $`2\nu > 2` (i.e. $`\nu > 1`). So the $`\nu = 1/2` Matérn (= Ornstein–Uhlenbeck) has continuous but nowhere-differentiable paths, while $`\nu = 3/2` has once-differentiable paths.

The figure below shows one sample path of a smooth GP (squared-exponential kernel): a single continuous, differentiable random curve.

<svg viewBox="0 0 600 210" width="100%" role="img" aria-label="A single sample path of a smooth Gaussian process">
  <rect x="0" y="0" width="600" height="210" fill="#ffffff"/>
  <line x1="20" y1="100" x2="580" y2="100" stroke="#eef1f4" stroke-width="1"/>
  <line x1="20" y1="190" x2="580" y2="190" stroke="#c9d3dc" stroke-width="1"/>
  <line x1="20" y1="10" x2="20" y2="190" stroke="#c9d3dc" stroke-width="1"/>
  <polyline fill="none" stroke="#2c5f8a" stroke-width="2.5" points="20.0,82.3 27.0,95.3 34.0,110.6 41.0,125.3 48.0,136.3 55.0,141.1 62.0,138.8 69.0,130.8 76.0,119.9 83.0,110.1 90.0,105.3 97.0,107.8 104.0,118.0 111.0,134.0 118.0,152.0 125.0,167.7 132.0,177.4 139.0,178.9 146.0,172.0 153.0,158.8 160.0,142.2 167.0,125.6 174.0,111.5 181.0,100.7 188.0,92.3 195.0,84.5 202.0,75.1 209.0,62.5 216.0,47.0 223.0,30.3 230.0,15.5 237.0,6.3 244.0,5.4 251.0,14.0 258.0,30.9 265.0,53.1 272.0,76.3 279.0,95.9 286.0,108.7 293.0,113.4 300.0,111.1 307.0,104.6 314.0,97.7 321.0,93.7 328.0,94.9 335.0,101.5 342.0,111.9 349.0,123.3 356.0,133.1 363.0,139.1 370.0,141.0 377.0,140.0 384.0,138.4 391.0,139.0 398.0,143.4 405.0,151.7 412.0,162.2 419.0,171.8 426.0,176.4 433.0,173.1 440.0,160.3 447.0,138.6 454.0,111.1 461.0,82.0 468.0,56.1 475.0,37.0 482.0,26.7 489.0,24.8 496.0,29.1 503.0,36.3 510.0,43.2 517.0,47.7 524.0,49.4 531.0,49.5 538.0,50.4 545.0,54.4 552.0,62.8 559.0,75.5 566.0,90.6 573.0,105.0 580.0,115.5"/>
  <text x="585" y="194" font-size="12" fill="#667" text-anchor="end">t</text>
  <text x="16" y="14" font-size="12" fill="#667" text-anchor="end">f(t)</text>
  <text x="300" y="205" font-size="12" fill="#667" text-anchor="middle">one sample path, squared-exponential kernel (smooth, differentiable)</text>
</svg>

<details><summary>Example problem</summary>

A GP has constant variance $`\sigma^2 = 1` and, near the diagonal, $`1 - k(s,t) \approx |t-s|^{3/2}`. Are its sample paths continuous? Differentiable?

<details><summary>Solution</summary>

The increment variance is $`\mathrm{Var}(X_t - X_s) = 2(1 - k(s,t)) \approx 2|t-s|^{3/2}`. With $`\alpha = 2` the Kolmogorov criterion needs $`\mathbb{E}|X_t-X_s|^2 \le C|t-s|^{1+\beta}`; here the exponent is $`3/2 = 1 + 1/2`, so $`\beta = 1/2 > 0` and the paths are **continuous**. For differentiability the increment would need to shrink faster than $`|t-s|` in a stronger sense (roughly $`1-k \sim |t-s|^{2+\beta}`); since $`3/2 < 2`, the paths are **not** differentiable. This is the same borderline logic as Brownian motion, which has $`1-k \sim |t-s|`.
</details>

</details>

</details>

## Applications

- **Geostatistics (kriging):** a GP prior on a spatial field (e.g. mineral concentration) turns sparse sample measurements into a full map with an uncertainty surface, via the regression formulas above.
- **Machine learning (GP regression):** the posterior gives a distribution over functions with calibrated uncertainty — a prediction *and* an honest error bar at every input, with no tuning of a loss function.
- **Bayesian optimization:** the GP posterior mean and variance drive acquisition functions (expected improvement, upper confidence bound) that decide where to evaluate an expensive black-box function next.

## Quizz

<details><summary>Example problem</summary>

A noiseless Gaussian process has zero mean and the squared-exponential kernel $`k(s,t) = e^{-(s-t)^2/2}` (so $`\ell = 1`). You observe $`f(0) = 1` and $`f(2) = 1`.

1. Write down the $`2\times 2` kernel matrix $`K` and the vector $`k_*` for predicting at $`t_0 = 1`.
2. Explain, without computing, whether the posterior variance at $`t_0 = 1` is larger or smaller than the posterior variance at $`t_0 = 10`, and why.

<details><summary>How to solve it</summary>

**Part 1.** The kernel values are $`k(0,0) = k(2,2) = e^0 = 1` and $`k(0,2) = k(2,0) = e^{-4/2} = e^{-2}`. So

```math
K = \begin{pmatrix} 1 & e^{-2} \\ e^{-2} & 1 \end{pmatrix}, \qquad
k_* = \begin{pmatrix} k(1,0) \\ k(1,2) \end{pmatrix} = \begin{pmatrix} e^{-1/2} \\ e^{-1/2} \end{pmatrix}.
```

**Part 2.** The posterior variance is $`\sigma_*^2(t_0) = k(t_0,t_0) - k_*^{\top}K^{-1}k_* = 1 - k_*^{\top}K^{-1}k_*`. The subtracted term measures how correlated $`t_0` is with the observed points. At $`t_0 = 1` the point sits exactly halfway between the two observations, so $`k_*` has large entries ($`e^{-1/2} \approx 0.61`) and the variance is *reduced* a lot. At $`t_0 = 10` the point is far from both observations, so $`k_*` has tiny entries ($`e^{-20}`) and almost nothing is subtracted — the variance is close to the prior value $`1`. Therefore the posterior variance at $`t_0 = 1` is **smaller** than at $`t_0 = 10`: the confidence band is tight where the data are and wide where they are not.
</details>

</details>

## Related pages

- [Brownian motion](./Brownian-motion.md) — the Gaussian process with covariance $`\min(s,t)`; its sample paths are continuous but nowhere differentiable.
- [Martingales](./Martingales.md) — Brownian motion is the canonical continuous martingale.
- Parent topic: [Stochastic processes](./Readme.md).

