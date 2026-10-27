# Limit theorems

Limit theorems describe the asymptotic behavior of sequences of random variables: sums, averages, and large samples. They explain why empirical frequencies stabilize (law of large numbers), why sums of many small effects look Gaussian (central limit theorem), and how fast convergence occurs (law of the iterated logarithm). They are the bridge between finite-sample probability and the deterministic approximations used in statistics and physics.

> **Authoritative sources**
> - [P. Billingsley, *Probability and Measure* (3rd ed., 1995), Ch. 21–23](https://en.wikipedia.org/wiki/Probability_and_Measure)
> - [R. D. Gill, *A First Course in the Theory of Large Samples* (1997)](https://en.wikipedia.org/wiki/A_First_Course_in_the_Theory_of_Large_Samples)

## Modes of convergence

Let $`X_n` and $`X` be random variables on a common probability space.

- **Almost sure convergence:** $`X_n \to X` a.s. iff $`P(\lim_{n\to\infty} X_n = X) = 1`.
- **Convergence in probability:** $`X_n \xrightarrow{P} X` iff $`\forall \varepsilon > 0: P(|X_n - X| > \varepsilon) \to 0`.
- **Convergence in distribution:** $`X_n \xrightarrow{d} X` iff $`F_{X_n}(x) \to F_X(x)` at all continuity points of $`F_X`.
- **Convergence in $`L^p`:** $`\mathbb{E}[|X_n - X|^p] \to 0`.

Hierarchy: $`L^p \Rightarrow P \Rightarrow d` and a.s. $`\Rightarrow P`. None of the reverse implications hold, and a.s. convergence and $`L^p` convergence are incomparable (neither implies the other).

<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Implication graph between the four modes of convergence of random variables">
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#333"/>
    </marker>
  </defs>
  <g font-family="sans-serif" font-size="14">
    <rect x="30" y="25" width="160" height="40" rx="6" fill="#d6e4f0" stroke="#4a6f9c"/>
    <text x="110" y="50" text-anchor="middle">a.s. convergence</text>
    <rect x="30" y="150" width="160" height="40" rx="6" fill="#d6e4f0" stroke="#4a6f9c"/>
    <text x="110" y="175" text-anchor="middle">Lᵖ convergence</text>
    <rect x="260" y="88" width="150" height="40" rx="6" fill="#d6e4f0" stroke="#4a6f9c"/>
    <text x="335" y="113" text-anchor="middle">in probability</text>
    <rect x="480" y="88" width="135" height="40" rx="6" fill="#f5e0d6" stroke="#a05a2c"/>
    <text x="547" y="113" text-anchor="middle">in distribution</text>
    <line x1="185" y1="65" x2="256" y2="98" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
    <line x1="185" y1="150" x2="256" y2="118" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
    <line x1="410" y1="108" x2="476" y2="108" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
    <text x="335" y="55" text-anchor="middle" font-size="12" fill="#666">weakest: only the CDFs converge</text>
    <text x="335" y="170" text-anchor="middle" font-size="12" fill="#666">arrows are implications, not equivalences</text>
  </g>
</svg>

<details><summary>Details</summary>

Convergence in distribution is the weakest: it only requires the CDFs to converge, not the random variables themselves. It is the natural mode for the CLT because it captures the shape of the limiting law without requiring joint construction.

A useful sufficient condition for a.s. convergence: if $`\sum_n P(|X_n - X| > \varepsilon) < \infty` for every $`\varepsilon > 0`, then $`X_n \to X` a.s. (Borel–Cantelli lemma).

Convergence in $`L^p` is the strongest: it implies convergence of moments. In particular, $`L^2` convergence means the variance of the difference goes to zero.

**Worked example (why the modes differ).** Let $`U` be uniform on $`(0,1)` and define $`X_n = n \cdot \mathbf{1}_{U \le 1/n}`. Then $`X_n \to 0` in probability and in distribution (for any $`\varepsilon > 0`, $`P(|X_n| > \varepsilon) = 1/n \to 0`), but $`X_n \not\to 0` a.s. (for every outcome $`U`, $`X_n = n` infinitely often) and not in $`L^1` (since $`\mathbb{E}[X_n] = 1` for all $`n`). This single example separates all four modes.

> **Authoritative sources**
> - [Convergence of random variables (Wikipedia)](https://en.wikipedia.org/wiki/Convergence_of_random_variables)
> - [Borel–Cantelli lemma (Wikipedia)](https://en.wikipedia.org/wiki/Borel%E2%80%93Cantelli_lemma)

<details><summary>Example sub-problem</summary>

Does $`X_n \xrightarrow{P} X` together with $`\sup_n \mathbb{E}[|X_n|^q] < \infty` for some $`q > p` imply $`X_n \to X` in $`L^p`?

<details><summary>Solution</summary>

Yes. Split $`\mathbb{E}[|X_n - X|^p]` at a level $`M`: on $`\{|X_n - X| \le M\}` use boundedness, on the complement use Hölder's inequality with the $`q`-th moment bound:

$`\mathbb{E}[|X_n - X|^p] \le M^p\, P(|X_n - X| > \varepsilon) + \mathbb{E}[|X_n - X|^p \mathbf{1}_{|X_n - X| > \varepsilon}]`,

and the second term is bounded by $`\mathbb{E}[|X_n - X|^q]^{p/q} \, P(|X_n - X| > \varepsilon)^{1 - p/q} \to 0` as $`n \to \infty` and then $`M \to \infty`. This is why uniform integrability upgrades convergence in probability to $`L^1` convergence.

</details>
</details>

</details>

## Law of large numbers

**Weak LLN.** Let $`X_1, X_2, \ldots` be i.i.d. with $`\mathbb{E}[|X_1|] < \infty` and $`\mu = \mathbb{E}[X_1]`. Then

$$`\bar{X}_n = \frac{1}{n}\sum_{i=1}^n X_i \xrightarrow{P} \mu`

**Strong LLN.** If $`\mathbb{E}[|X_1|] < \infty`, then $`\bar{X}_n \to \mu` almost surely.

<details><summary>Details</summary>

The weak LLN follows from Chebyshev's inequality when $`\operatorname{Var}(X_1) < \infty`: $`P(|\bar{X}_n - \mu| > \varepsilon) \leq \sigma^2/(n\varepsilon^2) \to 0` (see [Random variables and expectation](./Random-variables-and-expectation.md)).

The strong LLN requires deeper tools (Kolmogorov's maximal inequality or the martingale convergence theorem). It says that for almost every sample path, the empirical average converges to the mean.

The rate of convergence is governed by the tail of the distribution. For finite variance, the deviation is $`O_p(1/\sqrt{n})`; for finite $`p`-th moment ($`p > 1`), it is $`O_p(n^{-(p-1)/p})`.

**Worked example (fair die).** Roll a fair die $`n = 100` times; $`\mu = 3.5` and $`\sigma^2 = 35/12 \approx 2.917`. Chebyshev's inequality gives

$`P(|\bar{X}_{100} - 3.5| > 0.5) \leq \frac{35/12}{100 \times 0.5^2} \approx 0.117`,

so the sample average is within half a point of 3.5 with probability at least 88%, and the bound improves like $`1/n`. (The CLT gives the far sharper value $`\approx 2(1 - \Phi(2.93)) \approx 0.003`: Chebyshev is universal but loose.)

> **Authoritative sources**
> - [Law of large numbers (Wikipedia)](https://en.wikipedia.org/wiki/Law_of_large_numbers)
> - [Chebyshev's inequality (Wikipedia)](https://en.wikipedia.org/wiki/Chebyshev%27s_inequality)

</details>

## Central limit theorem

**Lindeberg–Lévy CLT.** Let $`X_1, X_2, \ldots` be i.i.d. with $`\mathbb{E}[X_1] = \mu` and $`\operatorname{Var}(X_1) = \sigma^2 < \infty`. Then

$$`\frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \xrightarrow{d} Z \sim \mathcal{N}(0,1)`

Equivalently: $`\sqrt{n}(\bar{X}_n - \mu) \xrightarrow{d} \mathcal{N}(0, \sigma^2)`.

<details><summary>Details</summary>

The CLT says that the sum of many independent, identically distributed, finite-variance random variables, properly normalized, converges in distribution to a normal. The normal is the unique stable distribution with finite variance (up to location and scale).

**Proof sketch via MGFs.** Center the variables: let $`Y_i = X_i - \mu`, so $`\mathbb{E}[Y_i] = 0` and $`\operatorname{Var}(Y_i) = \sigma^2`. The MGF of the normalized sum $`S_n/(\sigma\sqrt{n})` factors as $`M_{S_n/(\sigma\sqrt{n})}(t) = [M_{Y_1}(t/(\sigma\sqrt{n}))]^n`. Expanding the MGF of the centered variable,

$`M_{Y_1}(u) = 1 + \mathbb{E}[Y_1]\,u + \frac{\sigma^2 u^2}{2} + o(u^2) = 1 + \frac{\sigma^2 u^2}{2} + o(u^2)`,

and plugging in $`u = t/(\sigma\sqrt{n})` gives $`[M_{Y_1}(t/(\sigma\sqrt{n}))]^n \to e^{t^2/2}` as $`n \to \infty` — the MGF of $`\mathcal{N}(0,1)`. (Note: plugging in the MGF of $`X_1` itself, which contains the mean $`\mu`, would give the wrong limit $`e^{\mu t}`; it is the centered variable that must be used.) Since MGF convergence (in a neighborhood of 0) implies convergence in distribution, the normalized sum converges to $`\mathcal{N}(0,1)`.

**Lindeberg condition.** For independent (not identically distributed) $`X_i` with variances $`\sigma_i^2` and $`s_n^2 = \sum \sigma_i^2`, the CLT holds if for every $`\varepsilon > 0`:

$$`\frac{1}{s_n^2}\sum_{i=1}^n \mathbb{E}[X_i^2 \cdot \mathbf{1}_{|X_i| > \varepsilon s_n}] \to 0`

This condition says no single variable dominates the sum.

**Confidence intervals.** The CLT is the justification for the standard 95% confidence interval: since $`\sqrt{n}(\bar{X}_n - \mu)/\sigma \xrightarrow{d} \mathcal{N}(0,1)` and $`P(|Z| \le 1.96) \approx 0.95`, the interval $`\bar{X}_n \pm 1.96\,\sigma/\sqrt{n}` (or $`\bar{X}_n \pm 1.96\,s/\sqrt{n}` with the sample standard deviation $`s`, by Slutsky's theorem) covers the true $`\mu` with probability approaching 95%. This is the workhorse of [Statistical inference](./Statistical-inference/Readme.md).

**Extensions.** The theorem extends to the multivariate case (vector-valued sums converge to a multivariate normal with covariance the sum of the individual covariances) and to certain dependent sequences: for [stochastic processes](./Stochastic-processes/Readme.md) such as mixing or martingale-difference sequences, CLTs hold under suitable conditions controlling the dependence (e.g. strong mixing with summable mixing coefficients).

The CLT is the reason the normal distribution appears everywhere: measurement errors, sampling distributions, queue lengths, and diffusion limits all reduce to sums of many small independent contributions. See [Distributions](./Distributions/Readme.md) for the normal family.

<details><summary>Example sub-problem (Lindeberg condition)</summary>

Let $`X_1, X_2, \ldots` be independent with $`X_i = 0` except that $`X_i = \pm i` with probability $`1/(2i^2)` each (and $`0` otherwise), so $`\operatorname{Var}(X_i) = 1` and $`s_n^2 = n`. Does the Lindeberg condition hold, and does the CLT apply?

<details><summary>Solution</summary>

The Lindeberg sum is $`\frac{1}{n}\sum_{i=1}^n \mathbb{E}[X_i^2 \mathbf{1}_{|X_i| > \varepsilon\sqrt{n}}]`. For a given $`n`, the terms with $`i > \varepsilon\sqrt{n}` contribute $`\frac{1}{n}\sum_{i > \varepsilon\sqrt{n}}^n 1 \to 1`, not $`0`. Indeed the largest term $`X_n` has magnitude $`n`, which dwarfs $`\varepsilon\sqrt{n}`, so its full squared contribution $`n^2/n = n` does not vanish: the sum is dominated by rare huge jumps. The Lindeberg condition fails and the CLT does not apply — the normalized sum converges to a Poisson-type limit, not a normal.

</details>
</details>

</details>

<iframe src="./Limit-theorems.simulation.html" title="CLT: histogram of sample means converging to a normal curve"></iframe>

## Law of the iterated logarithm

Let $`X_1, X_2, \ldots` be i.i.d. with $`\mathbb{E}[X_1] = 0` and $`\operatorname{Var}(X_1) = \sigma^2 < \infty`. Then (Hartman–Wintner LIL)

$$`\limsup_{n \to \infty} \frac{S_n}{\sigma \sqrt{2n \log \log n}} = 1 \quad \text{a.s.}, \qquad \liminf_{n \to \infty} \frac{S_n}{\sigma \sqrt{2n \log \log n}} = -1 \quad \text{a.s.}`

Equivalently: $`\limsup_{n \to \infty} \dfrac{|S_n|}{\sigma \sqrt{2n \log \log n}} = 1` a.s.

<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sample path of a random walk S_n staying inside the LIL envelope plus or minus sqrt of 2 n log log n">
  <rect x="0" y="0" width="720" height="240" fill="#fafafa"/>
  <line x1="40" y1="120" x2="690" y2="120" stroke="#999" stroke-width="1"/>
  <polyline points="45.9,113.4 52.4,109.3 58.9,106.2 65.4,103.6 71.9,101.2 78.4,99.1 84.9,97.1 91.4,95.3 97.9,93.5 104.4,91.9 110.9,90.3 117.4,88.8 123.9,87.4 130.4,86.0 136.9,84.6 143.5,83.3 150.0,82.1 156.5,80.8 163.0,79.6 169.5,78.5 176.0,77.3 182.5,76.2 189.0,75.1 195.5,74.0 202.0,73.0 208.5,72.0 215.0,70.9 221.5,70.0 228.0,69.0 234.5,68.0 241.1,67.1 247.6,66.1 254.1,65.2 260.6,64.3 267.1,63.4 273.6,62.5 280.1,61.7 286.6,60.8 293.1,60.0 299.6,59.1 306.1,58.3 312.6,57.5 319.1,56.7 325.6,55.9 332.1,55.1 338.6,54.3 345.2,53.5 351.7,52.8 358.2,52.0 364.7,51.3 371.2,50.5 377.7,49.8 384.2,49.0 390.7,48.3 397.2,47.6 403.7,46.9 410.2,46.2 416.7,45.5 423.2,44.8 429.7,44.1 436.2,43.4 442.8,42.7 449.3,42.1 455.8,41.4 462.3,40.7 468.8,40.1 475.3,39.4 481.8,38.8 488.3,38.1 494.8,37.5 501.3,36.9 507.8,36.2 514.3,35.6 520.8,35.0 527.3,34.4 533.8,33.7 540.4,33.1 546.9,32.5 553.4,31.9 559.9,31.3 566.4,30.7 572.9,30.1 579.4,29.5 585.9,29.0 592.4,28.4 598.9,27.8 605.4,27.2 611.9,26.6 618.4,26.1 624.9,25.5 631.4,24.9 637.9,24.4 644.5,23.8 651.0,23.3 657.5,22.7 664.0,22.2 670.5,21.6 677.0,21.1 683.5,20.5 690.0,20.0" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polyline points="45.9,126.6 52.4,130.7 58.9,133.8 65.4,136.4 71.9,138.8 78.4,140.9 84.9,142.9 91.4,144.7 97.9,146.5 104.4,148.1 110.9,149.7 117.4,151.2 123.9,152.6 130.4,154.0 136.9,155.4 143.5,156.7 150.0,157.9 156.5,159.2 163.0,160.4 169.5,161.5 176.0,162.7 182.5,163.8 189.0,164.9 195.5,166.0 202.0,167.0 208.5,168.0 215.0,169.1 221.5,170.0 228.0,171.0 234.5,172.0 241.1,172.9 247.6,173.9 254.1,174.8 260.6,175.7 267.1,176.6 273.6,177.5 280.1,178.3 286.6,179.2 293.1,180.0 299.6,180.9 306.1,181.7 312.6,182.5 319.1,183.3 325.6,184.1 332.1,184.9 338.6,185.7 345.2,186.5 351.7,187.2 358.2,188.0 364.7,188.7 371.2,189.5 377.7,190.2 384.2,191.0 390.7,191.7 397.2,192.4 403.7,193.1 410.2,193.8 416.7,194.5 423.2,195.2 429.7,195.9 436.2,196.6 442.8,197.3 449.3,197.9 455.8,198.6 462.3,199.3 468.8,199.9 475.3,200.6 481.8,201.2 488.3,201.9 494.8,202.5 501.3,203.1 507.8,203.8 514.3,204.4 520.8,205.0 527.3,205.6 533.8,206.3 540.4,206.9 546.9,207.5 553.4,208.1 559.9,208.7 566.4,209.3 572.9,209.9 579.4,210.5 585.9,211.0 592.4,211.6 598.9,212.2 605.4,212.8 611.9,213.4 618.4,213.9 624.9,214.5 631.4,215.1 637.9,215.6 644.5,216.2 651.0,216.7 657.5,217.3 664.0,217.8 670.5,218.4 677.0,218.9 683.5,219.5 690.0,220.0" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polyline points="45.9,126.4 52.4,129.7 58.9,123.2 65.4,113.6 71.9,120.0 78.4,120.0 84.9,120.0 91.4,113.6 97.9,120.0 104.4,116.8 110.9,120.0 117.4,120.0 123.9,120.0 130.4,116.8 136.9,116.8 143.5,116.8 150.0,123.2 156.5,123.2 163.0,113.6 169.5,120.0 176.0,126.4 182.5,126.4 189.0,126.4 195.5,120.0 202.0,113.6 208.5,113.6 215.0,110.3 221.5,103.9 228.0,94.3 234.5,94.3 241.1,94.3 247.6,91.0 254.1,91.0 260.6,91.0 267.1,91.0 273.6,87.8 280.1,81.4 286.6,78.2 293.1,87.8 299.6,78.2 306.1,78.2 312.6,84.6 319.1,87.8 325.6,91.0 332.1,91.0 338.6,103.9 345.2,110.3 351.7,116.8 358.2,116.8 364.7,110.3 371.2,126.4 377.7,129.7 384.2,126.4 390.7,126.4 397.2,129.7 403.7,136.1 410.2,132.9 416.7,126.4 423.2,123.2 429.7,123.2 436.2,129.7 442.8,129.7 449.3,132.9 455.8,139.3 462.3,132.9 468.8,132.9 475.3,145.7 481.8,142.5 488.3,136.1 494.8,139.3 501.3,136.1 507.8,129.7 514.3,126.4 520.8,132.9 527.3,129.7 533.8,139.3 540.4,142.5 546.9,139.3 553.4,139.3 559.9,149.0 566.4,145.7 572.9,139.3 579.4,142.5 585.9,139.3 592.4,142.5 598.9,149.0 605.4,152.2 611.9,155.4 618.4,145.7 624.9,142.5 631.4,136.1 637.9,139.3 644.5,145.7 651.0,139.3 657.5,139.3 664.0,142.5 670.5,139.3 677.0,152.2 683.5,139.3 690.0,136.1" fill="none" stroke="#2c5f8a" stroke-width="1.2"/>
  <g font-family="sans-serif" font-size="12" fill="#333">
    <text x="695" y="24" text-anchor="end" fill="#c0392b">+√(2n log log n)</text>
    <text x="695" y="224" text-anchor="end" fill="#c0392b">−√(2n log log n)</text>
    <text x="695" y="132" text-anchor="end" fill="#2c5f8a">Sₙ (one sample path)</text>
    <text x="365" y="236" text-anchor="middle">n (0 to 1000)</text>
  </g>
</svg>

<details><summary>Details</summary>

The LIL refines the LLN by giving the exact rate at which the sample average approaches the mean. While the CLT says the typical deviation is $`O(1/\sqrt{n})`, the LIL says the largest deviations (over all $`n` up to $`N`) are of order $`\sqrt{2 \log \log N / N}`.

The double logarithm $`\log \log n` appears because the events $`\{S_n > c\sqrt{n \log \log n}\}` are not independent across $`n`; the Borel–Cantelli lemma applied at geometrically spaced times $`n_k = \lfloor e^{e^k}\rfloor` produces the $`\log \log` factor.

The LIL is a sharp a.s. statement: the sample path crosses the envelope $`\pm\sigma\sqrt{2n \log \log n}` infinitely often, but exceeds it only finitely often. The picture above shows one simulated sample path of a random walk with standard deviation σ = 1: its envelope of maximal excursions grows like the dashed curves — the path comes arbitrarily close to $`\pm\sqrt{2n\log\log n}` infinitely often, yet stays inside them eventually.

**Worked example (how slow the envelope grows).** For σ = 1: at $`n = 10^6` the envelope is $`\sqrt{2 \cdot 10^6 \cdot \ln \ln 10^6} \approx 2292`, while the standard deviation of $`S_n` is only $`\sqrt{n} = 1000`. At $`n = 10^{12}` the envelope is about $`3.7 \times 10^6` versus $`\sqrt{n} = 10^6`: the correction factor $`\sqrt{2\log\log n}` grows extremely slowly, which is why the LIL is invisible on moderate samples.

> **Authoritative sources**
> - [P. Hartman & A. Wintner (1941), *On the law of the iterated logarithm*](https://en.wikipedia.org/wiki/Law_of_the_iterated_logarithm)
> - [A. N. Kolmogorov (1929), *Über das Gesetz des iterierten Logarithmus*](https://en.wikipedia.org/wiki/Law_of_the_iterated_logarithm)

</details>

## Example problem

A fair coin is flipped $`n` times. Let $`\hat{p}_n` be the fraction of heads. Use the CLT to approximate $`P(|\hat{p}_n - 1/2| > 0.05)` for $`n = 10000`.

<details><summary>Solution</summary>

Each flip is $`X_i \sim \text{Bernoulli}(1/2)`, so $`\mu = 1/2`, $`\sigma^2 = 1/4`.

By the CLT: $`\sqrt{n}(\hat{p}_n - 1/2) \xrightarrow{d} \mathcal{N}(0, 1/4)`.

For $`n = 10000`: $`\sqrt{n} = 100`, so $`100(\hat{p}_n - 1/2) \approx \mathcal{N}(0, 1/4)`, i.e. $`\hat{p}_n - 1/2 \approx \mathcal{N}(0, 1/(4 \times 10000)) = \mathcal{N}(0, 2.5 \times 10^{-6})`.

Standard deviation: $`\sigma_{\hat{p}} = 1/(2 \times 100) = 0.005`.

$$`P(|\hat{p}_n - 1/2| > 0.05) \approx P(|Z| > 0.05/0.005) = P(|Z| > 10) \approx 2 \times 7.6 \times 10^{-24} \approx 0`

The probability is essentially zero: with 10 000 flips, the sample proportion is almost certainly within 5 percentage points of 1/2. The CLT quantifies this with a normal tail.

</details>