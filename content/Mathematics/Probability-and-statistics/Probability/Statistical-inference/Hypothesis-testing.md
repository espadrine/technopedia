# Hypothesis testing

Hypothesis testing is the task of deciding whether a parameter lies in a specified set, based on observed data. It produces a binary decision (reject or fail to reject) with controlled error rates. It is the formal framework for making go/no-go decisions in science, quality control, and clinical trials.

> **Authoritative sources**
> - [J. Neyman & E. S. Pearson, On the Problem of the Most Efficient Tests of Statistical Hypotheses (1933)](https://doi.org/10.1098/rsta.1933.0009)
> - [S. S. Wilks, The Large-Sample Distribution of the Likelihood Ratio for Tests of Hypotheses (1938)](https://doi.org/10.1214/aoms/1177732360)

## Null and alternative hypotheses

A test is defined by a partition of the parameter space:

```math
H_0: \theta \in \Theta_0 \quad \text{vs.} \quad H_1: \theta \in \Theta_1
```

A **test function** $`\varphi(x) \in [0,1]` gives the probability of rejecting $`H_0` given data $`x`.

<details><summary>Details</summary>

Every test trades off two kinds of mistakes, and the whole theory is about controlling them:

- **Type I error** (false positive): rejecting $`H_0` when it is true. Probability $`\alpha = \sup_{\theta \in \Theta_0} E_\theta[\varphi]` — the **size** of the test.
- **Type II error** (false negative): failing to reject $`H_0` when $`H_1` is true. Probability $`\beta(\theta) = E_\theta[1 - \varphi]` for $`\theta \in \Theta_1`.
- **Power**: $`1 - \beta(\theta)` — the probability of correctly rejecting $`H_0` when $`\theta \in \Theta_1`. It is a function of the true $`\theta`, not a single number.

The asymmetry is deliberate: $`H_0` is the "status quo" hypothesis, and we require strong evidence to overturn it. This mirrors a criminal trial: $`H_0` = innocence, and a conviction requires proof beyond reasonable doubt (small $`\alpha`), at the cost of letting some guilty defendants go free (large $`\beta`).

**Worked example.** A factory tests whether a machine is calibrated ($`H_0: \mu = 0` mm offset) against $`H_1: \mu \neq 0`. With $`n = 25` measurements of standard deviation $`\sigma = 0.1`, the test rejects when $`|\bar{X}| > 1.96 \times 0.1/5 = 0.0392`. Then $`\alpha = 0.05` exactly, and the power at $`\mu = 0.05` is $`1 - \beta = P(|\bar{X}| > 0.0392 \mid \mu = 0.05) \approx 0.61`.

**Example problem.** In the factory test above, what is the power at $`\mu = 0.02`?

<details><summary>Solution</summary>

Under $`\mu = 0.02`, $`\bar{X} \sim N(0.02, 0.02^2)` (variance $`\sigma^2/n = 0.01^2`... more precisely $`\sigma/\sqrt{n} = 0.02`). Then

```math
1 - \beta = P\!\left(\bar{X} > 0.0392\right) + P\!\left(\bar{X} < -0.0392\right) = \Phi\!\left(\frac{-0.0392 - 0.02}{0.02}\right) + 1 - \Phi\!\left(\frac{0.0392 - 0.02}{0.02}\right)
```

```math
= \Phi(-2.96) + 1 - \Phi(0.96) \approx 0.0015 + 0.169 \approx 0.17
```

A small true offset is hard to detect with $`n = 25`: the power is only about 17%. To raise power, increase $`n` — see the [simulation](#interactive-simulation-rejection-region-p-value-and-power) below.

</details>

</details>

## The Neyman–Pearson lemma

The lemma is the theoretical foundation of all hypothesis testing: it identifies the single best test when both hypotheses are simple.

**Lemma (Neyman–Pearson, 1933).** For testing the simple null $`H_0: \theta = \theta_0` against the simple alternative $`H_1: \theta = \theta_1`, with densities $`f_0` and $`f_1`, the test that rejects when the likelihood ratio exceeds a threshold,

```math
\varphi(x) = \begin{cases} 1 & \text{if } f_1(x) / f_0(x) > k \\ 0 & \text{if } f_1(x) / f_0(x) < k \end{cases}
```

with $`k` chosen so that $`E_{\theta_0}[\varphi] = \alpha`, is the **most powerful** test of size $`\alpha`: no other size-$`\alpha` test has higher power at $`\theta_1`.

**Proof sketch.** Let $`\varphi^*` be the likelihood-ratio test and $`\varphi` any other test of size $`\leq \alpha`. Consider the integral of $`(\varphi^* - \varphi)(f_1 - k f_0)` over the sample space. By construction $`\varphi^* = 1` exactly where $`f_1 > k f_0` and $`0` where $`f_1 < k f_0`, so the integrand is nonnegative everywhere and

```math
E_{\theta_1}[\varphi^*] - E_{\theta_1}[\varphi] \;\geq\; k\,\big(E_{\theta_0}[\varphi^*] - E_{\theta_0}[\varphi]\big) \;\geq\; 0
```

since $`E_{\theta_0}[\varphi^*] = \alpha \geq E_{\theta_0}[\varphi]`. Hence $`\varphi^*` has power at least as large. (Randomization on the boundary $`f_1 = k f_0` handles the case where no deterministic threshold achieves size exactly $`\alpha`.)

<details><summary>Details</summary>

**Worked example.** Let $`X \sim N(\theta, 1)` with $`\theta_0 = 0` and $`\theta_1 = 1`. The likelihood ratio is

```math
\frac{f_1(x)}{f_0(x)} = \exp\!\left(x - \tfrac{1}{2}\right)
```

which is increasing in $`x`. So the most powerful test rejects for large $`x`: reject when $`x > z_{1-\alpha}`. For $`\alpha = 0.05`, reject when $`x > 1.645`, and the power is $`P_{\theta=1}(X > 1.645) = 1 - \Phi(0.645) \approx 0.26`. No other size-0.05 test can do better at $`\theta = 1`.

The lemma generalizes to composite alternatives through the [likelihood ratio test](#likelihood-ratio-test) and to composite nulls by taking the supremum over $`\Theta_0`. Every classical test (z-test, t-test, chi-squared test) is either a likelihood-ratio test or an approximation to one.

**Example problem.** For $`X_1, \ldots, X_5 \sim \text{Exp}(\theta)` with $`\theta_0 = 1` and $`\theta_1 = 2`, what does the Neyman–Pearson most powerful test look like?

<details><summary>Solution</summary>

The joint density ratio is

```math
\frac{f_1(x)}{f_0(x)} = \frac{2^5 \exp\!\left(-2\textstyle\sum x_i\right)}{\exp\!\left(-\textstyle\sum x_i\right)} = 32\, e^{-\sum x_i}
```

This is decreasing in $`T = \sum x_i`, so the most powerful test rejects when $`T` is **small** (an exponential with rate 2 produces smaller sums). Choose $`c` with $`P_{\theta=1}(T < c) = \alpha`: since $`T \sim \text{Gamma}(5, 1)` under $`H_0`, $`c = 2.43` gives $`\alpha = 0.05`. The rejection region is $`\sum X_i < 2.43` — note it is not a "large statistic" test; the lemma tells you which direction to reject in.

</details>

> **Authoritative sources**
> - [J. Neyman & E. S. Pearson, On the Problem of the Most Efficient Tests of Statistical Hypotheses, Phil. Trans. R. Soc. A 231, 289–337 (1933)](https://doi.org/10.1098/rsta.1933.0009)

</details>

## p-value

The p-value is the probability, under $`H_0`, of observing a test statistic as extreme or more extreme than the one observed:

```math
```math
p = P_{H_0}(T(X) \geq T(x_{\text{obs}}))
```

<details><summary>Details</summary>

A small p-value indicates that the observed data would be unlikely if $`H_0` were true. The p-value is **not** the probability that $`H_0` is true. It is a tail probability computed under the assumption that $`H_0` holds.

Common practice: reject $`H_0` if $`p < \alpha` (typically $`\alpha = 0.05`). This is a decision rule, not a statement about the truth of $`H_0`.

The figure below shows the anatomy of a one-sided test: the null distribution of the statistic, the rejection region (red, area $`\alpha`), the critical value, the observed statistic, and the p-value (blue, the tail area beyond the observation).

<svg viewBox="0 0 400 175" width="400" height="175" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="400" height="175" fill="#fff"/>
  <path d="M 265.8,150 L 265.8,135.56 L 267.8,136.72 L 269.8,137.82 L 271.8,138.85 L 273.8,139.82 L 275.8,140.73 L 277.8,141.58 L 279.8,142.37 L 281.8,143.10 L 283.8,143.78 L 285.8,144.40 L 287.8,144.98 L 289.8,145.51 L 291.8,145.99 L 293.8,146.43 L 295.8,146.83 L 297.8,147.19 L 299.8,147.52 L 301.8,147.81 L 303.8,148.07 L 305.8,148.31 L 307.8,148.52 L 309.8,148.71 L 311.8,148.88 L 313.8,149.02 L 315.8,149.15 L 317.8,149.27 L 319.8,149.37 L 321.8,149.46 L 323.8,149.54 L 325.8,149.60 L 327.8,149.66 L 329.8,149.71 L 331.8,149.75 L 333.8,149.79 L 335.8,149.82 L 337.8,149.85 L 339.8,149.88 L 341.8,149.90 L 343.8,149.91 L 345.8,149.93 L 347.8,149.94 L 349.8,149.95 L 351.8,149.96 L 353.8,149.97 L 355.8,149.97 L 357.8,149.98 L 359.8,149.98 L 360,150 Z" fill="rgba(200,60,60,0.35)"/>
  <path d="M 320.0,150 L 320.0,149.38 L 322.0,149.47 L 324.0,149.54 L 326.0,149.61 L 328.0,149.67 L 330.0,149.72 L 332.0,149.76 L 334.0,149.80 L 336.0,149.83 L 338.0,149.85 L 340.0,149.88 L 342.0,149.90 L 344.0,149.91 L 346.0,149.93 L 348.0,149.94 L 350.0,149.95 L 352.0,149.96 L 354.0,149.97 L 356.0,149.97 L 358.0,149.98 L 360,150 Z" fill="rgba(60,90,200,0.45)"/>
  <path d="M 40.0,149.98 L 44.0,149.97 L 48.0,149.96 L 52.0,149.94 L 56.0,149.91 L 60.0,149.88 L 64.0,149.83 L 68.0,149.76 L 72.0,149.67 L 76.0,149.54 L 80.0,149.38 L 84.0,149.17 L 88.0,148.89 L 92.0,148.54 L 96.0,148.10 L 100.0,147.55 L 104.0,146.86 L 108.0,146.03 L 112.0,145.03 L 116.0,143.84 L 120.0,142.44 L 124.0,140.81 L 128.0,138.95 L 132.0,136.83 L 136.0,134.47 L 140.0,131.87 L 144.0,129.04 L 148.0,126.01 L 152.0,122.81 L 156.0,119.50 L 160.0,116.12 L 164.0,112.75 L 168.0,109.44 L 172.0,106.28 L 176.0,103.35 L 180.0,100.71 L 184.0,98.44 L 188.0,96.61 L 192.0,95.25 L 196.0,94.43 L 200.0,94.15 L 204.0,94.43 L 208.0,95.25 L 212.0,96.61 L 216.0,98.44 L 220.0,100.71 L 224.0,103.35 L 228.0,106.28 L 232.0,109.44 L 236.0,112.75 L 240.0,116.12 L 244.0,119.50 L 248.0,122.81 L 252.0,126.01 L 256.0,129.04 L 260.0,131.87 L 264.0,134.47 L 268.0,136.83 L 272.0,138.95 L 276.0,140.81 L 280.0,142.44 L 284.0,143.84 L 288.0,145.03 L 292.0,146.03 L 296.0,146.86 L 300.0,147.55 L 304.0,148.10 L 308.0,148.54 L 312.0,148.89 L 316.0,149.17 L 320.0,149.38 L 324.0,149.54 L 328.0,149.67 L 332.0,149.76 L 336.0,149.83 L 340.0,149.88 L 344.0,149.91 L 348.0,149.94 L 352.0,149.96 L 356.0,149.97 L 360.0,149.98" fill="none" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="150" x2="360" y2="150" stroke="#999" stroke-width="1"/>
  <line x1="265.8" y1="150" x2="265.8" y2="51" stroke="#b33" stroke-width="1.2"/>
  <text x="200" y="168" font-size="11" fill="#555" text-anchor="middle">z (standardized test statistic, N(0,1) under H&#8320;)</text>
  <text x="265.8" y="45" font-size="11" fill="#b33" text-anchor="middle">critical value z&#8320;.&#8320;&#8321; = 1.645</text>
  <line x1="320" y1="150" x2="320" y2="88" stroke="#34c" stroke-width="1.2"/>
  <text x="320" y="82" font-size="11" fill="#34c" text-anchor="middle">observed z = 3</text>
  <text x="345" y="120" font-size="10" fill="#b33">rejection</text>
  <text x="345" y="132" font-size="10" fill="#b33">region (α)</text>
  <text x="292" y="163" font-size="10" fill="#34c">p-value tail</text>
</svg>

**Worked example.** Testing $`H_0: \mu = 0` vs. $`H_1: \mu \neq 0` with $`\bar{X} \sim N(\mu, \sigma^2/n)`. The test statistic is $`Z = \bar{X}/(\sigma/\sqrt{n})` and the two-sided p-value is $`p = 2(1 - \Phi(|z|))`. With $`n = 50`, $`\sigma = 2`, $`\bar{x} = 0.5`: $`z = 0.5/(2/\sqrt{50}) = 1.77`, so $`p = 2(1 - \Phi(1.77)) \approx 0.077` — not significant at 5%, though a one-sided test would give $`p = 0.038` (see [One-sided vs. two-sided tests](#one-sided-vs-two-sided-tests)).

**Example problem.** A test statistic $`Z` is standard normal under $`H_0` and the observed value is $`z = 2.1`. What is the two-sided p-value, and would you reject at $`\alpha = 0.05`?

<details><summary>Solution</summary>

```math
p = 2\,(1 - \Phi(2.1)) \approx 2 \times 0.0179 = 0.0357
```

Since $`0.0357 < 0.05`, reject $`H_0` at the 5% level. Note the two-sided rule is equivalent to rejecting when $`|z| > z_{1-\alpha/2} = 1.96`; here $`2.1 > 1.96`, consistent with the p-value conclusion.

</details>

</details>

## One-sided vs. two-sided tests

Before computing a p-value you must decide which departures from $`H_0` count as evidence. This choice fixes both the rejection region and the p-value formula:

- **Two-sided** ($`H_1: \theta \neq \theta_0`): reject for extreme values in **either** direction. Rejection region $`|T| > t_{1-\alpha/2}`; p-value $`p = 2\,P_{H_0}(T \geq |T_{\text{obs}}|)` — both tails.
- **One-sided** ($`H_1: \theta > \theta_0` or $`\theta < \theta_0`): reject only in the pre-declared direction. Rejection region $`T > t_{1-\alpha}`; p-value $`p = P_{H_0}(T \geq T_{\text{obs}})` — one tail.

<details><summary>Details</summary>

**When is each appropriate?** A one-sided test is legitimate only when departures in the other direction would be practically meaningless or would lead to the same action (e.g., "is the new drug worse than placebo?" — if it is better, you would not switch). The direction must be chosen **before** seeing the data: choosing the side after observing the statistic doubles your effective Type I error rate, because a one-sided test at level $`\alpha` rejects half as often as a two-sided test at the same level.

**How the rejection region shifts.** For the same $`\alpha = 0.05` with a normal statistic:

- Two-sided: reject when $`|z| > 1.96` (two tails of 2.5% each).
- One-sided (upper): reject when $`z > 1.645` (one tail of 5%).

The one-sided critical value is smaller, so a one-sided test is **more powerful** in the declared direction — but completely blind to an effect in the opposite direction. In the worked example above, $`z = 1.77` is significant one-sided ($`p = 0.038`) but not two-sided ($`p = 0.077`).

**Worked example.** Testing whether a new bearing has *lower* friction than the old one ($`H_0: \mu = \mu_0` vs. $`H_1: \mu < \mu_0`), with $`z_{\text{obs}} = -1.8`: the one-sided (lower-tail) p-value is $`p = \Phi(-1.8) \approx 0.036`, significant at 5%. The two-sided p-value would be $`0.072`, not significant. The one-sided test is appropriate here because higher friction would simply mean "keep the old bearing" — the same action as no difference.

**Example problem.** You observe $`z = 1.5` in a test where $`H_1: \mu > 0` was pre-registered. Is the result significant at $`\alpha = 0.05`? What if $`H_1` had been two-sided?

<details><summary>Solution</summary>

One-sided: $`p = 1 - \Phi(1.5) \approx 0.067 > 0.05` — not significant. Two-sided: $`p = 2 \times 0.067 = 0.134` — even less significant. Note that a one-sided test can never be *less* significant than the two-sided test on the same data (when the observed effect points in the declared direction); the gain here is a factor of 2 in the p-value, but $`z = 1.5` is too small for either.

</details>

</details>

## Interactive simulation: rejection region, p-value, and power

The simulation below ties the concepts together for a one-sided z-test of $`H_0: \mu = 0` vs. $`H_1: \mu > 0` with observed $`\bar{x} = 0.6` and known $`\sigma = 2`. Vary the true effect $`\mu`, the sample size $`n`, and the significance level $`\alpha`, and watch the null distribution, the rejection region, the p-value tail, and the power curve respond.

<iframe src="./Hypothesis-testing.simulation.html" title="Interactive demo: rejection region, p-value, and power curve"></iframe>

## Likelihood ratio test

The likelihood ratio statistic is

```math
\Lambda = \frac{\sup_{\theta \in \Theta_0} L(\theta)}{\sup_{\theta \in \Theta} L(\theta)}
```

Under $`H_0`, $`-2 \log \Lambda \xrightarrow{d} \chi^2_k` where $`k` is the difference in dimensionality (Wilks' theorem). The limiting $`\chi^2_k` distribution is covered on the [Distributions](../Distributions/Readme.md) page, and the asymptotic argument (a Taylor expansion of the log-likelihood around the MLE, combined with the [CLT](../Limit-theorems.md)) is a direct application of [Limit theorems](../Limit-theorems.md).

<details><summary>Details</summary>

The likelihood ratio test (LRT) is a general-purpose test that works for composite hypotheses. It compares the best fit under the null to the best fit under the full model. It is the natural extension of the [Neyman–Pearson lemma](#the-neymanpearson-lemma) to composite hypotheses: when the alternative is composite, replacing $`f_1` by the supremum over $`\Theta_1` (equivalently over $`\Theta`, since $`\Lambda \leq 1`) yields a test that is asymptotically optimal.

**Worked example.** Testing $`H_0: \mu = 0` vs. $`H_1: \mu \neq 0` for $`X_i \sim N(\mu, \sigma^2)` with known $`\sigma^2`. The LRT statistic is $`-2\log\Lambda = n\bar{X}^2/\sigma^2 \sim \chi^2_1` under $`H_0`. With $`n = 50`, $`\sigma = 2`, $`\bar{x} = 0.5`: $`-2\log\Lambda = 50 \times 0.25/4 = 3.125`, compared to the $`\chi^2_1` critical value $`3.84` at $`\alpha = 0.05` — fail to reject, matching the two-sided z-test ($`z = 1.77`, $`z^2 = 3.125`).

The LRT is connected to [Estimation](./Estimation.md): the numerator and denominator are both maximized likelihoods, i.e., MLEs under restricted and unrestricted parameter spaces.

**Example problem.** For $`X_1, \ldots, X_n \sim \text{Exp}(\theta)` (mean $`1/\theta`), derive the LRT of $`H_0: \theta = \theta_0` vs. $`H_1: \theta \neq \theta_0` and give its large-sample form.

<details><summary>Solution</summary>

The unrestricted MLE is $`\hat{\theta} = 1/\bar{X}`, so

```math
-2\log\Lambda = 2n\left[\log\frac{\hat{\theta}}{\theta_0} + \frac{\theta_0}{\hat{\theta}} - 1\right] = 2n\left[\log\frac{\bar{X}}{1/\theta_0}\cdot(-1) + \ldots\right] = 2n\left[\frac{\theta_0}{\hat{\theta}} - 1 - \log\frac{\theta_0}{\hat{\theta}}\right]
```

i.e. $`-2\log\Lambda = 2n\left[\theta_0\bar{X} - 1 - \log(\theta_0 \bar{X})\right]`, which is always $`\geq 0` and equals 0 when $`\bar{X} = 1/\theta_0`. Under $`H_0` and large $`n`, this is approximately $`\chi^2_1` by Wilks' theorem, so reject when $`2n[\theta_0\bar{X} - 1 - \log(\theta_0\bar{X})] > 3.84` at $`\alpha = 0.05`.

</details>

</details>

## Duality between tests and confidence intervals

Hypothesis testing and [Estimation](./Estimation.md) are two views of the same computation:

**Duality.** A level-$`\alpha` test of $`H_0: \theta = \theta_0` rejects $`H_0` **if and only if** $`\theta_0` lies outside the $`(1-\alpha)` confidence set for $`\theta`.

**Proof sketch.** For each $`\theta_0`, let $`A(\theta_0) = \{x : \text{test of } H_0: \theta = \theta_0 \text{ accepts}\}` be the acceptance region. Invert it: define $`C(x) = \{\theta_0 : x \in A(\theta_0)\}`. Then

```math
P_\theta(\theta \in C(X)) = P_\theta(X \in A(\theta)) = 1 - \alpha
```

so $`C(X)` is a $`(1-\alpha)` confidence set, and by construction $`\theta_0 \notin C(x)` exactly when the test rejects. Conversely, any $`(1-\alpha)` confidence set inverted the same way yields a level-$`\alpha` test.

<details><summary>Details</summary>

**Worked example.** With $`\bar{x} = 0.5`, $`\sigma = 2`, $`n = 50`, the 95% confidence interval for $`\mu` is

```math
0.5 \pm 1.96 \times \frac{2}{\sqrt{50}} = 0.5 \pm 0.554 = (-0.054,\ 1.054)
```

The two-sided z-test of $`H_0: \mu = 0` does not reject ($`0 \in (-0.054, 1.054)`), consistent with the p-value $`0.077 > 0.05` computed earlier. Testing $`H_0: \mu = 1.2` would reject, since $`1.2` is outside the interval — and indeed $`z = (0.5 - 1.2)/0.283 = -2.47`, $`p = 0.013 < 0.05`.

This duality means every confidence interval is a family of tests, and every test is a family of confidence sets. It also clarifies interpretation: "the 95% CI contains 0" and "the p-value exceeds 0.05" are the same statement, not two independent pieces of evidence.

**Example problem.** A 99% confidence interval for a proportion is $`(0.31, 0.49)`. At which significance levels does the test of $`H_0: p = 0.5` reject?

<details><summary>Solution</summary>

Since $`0.5` is outside the 99% interval, the level-$`\alpha = 0.01` test rejects. The test also rejects at every $`\alpha` for which the corresponding $`(1-\alpha)` interval excludes 0.5 — i.e., for all $`\alpha \geq 0.01` up to the level where the interval first touches 0.5. The exact threshold is the p-value: $`\alpha^* = p`, so the test rejects precisely when $`\alpha > p`. The 99% interval excluding 0.5 tells us $`p < 0.01`.

</details>

</details>

## Multiple comparisons

When testing $`m` hypotheses simultaneously, the family-wise error rate (FWER) inflates. Corrections:

- **Bonferroni**: reject if $`p_i < \alpha/m`.
- **Holm–Bonferroni**: step-down procedure, uniformly more powerful than Bonferroni.
- **Benjamini–Hochberg (FDR)**: controls the expected fraction of false discoveries.

> **Authoritative sources**
> - [Y. Benjamini & Y. Hochberg, Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing, J. R. Statist. Soc. B 57(1), 289–300 (1995)](https://doi.org/10.1111/j.2517-6161.1995.tb02031.x)

<details><summary>Details</summary>

The multiple comparisons problem arises in genomics (testing millions of genes), multiple regression, and any setting with many simultaneous tests. With $`m` independent tests each at level $`\alpha`, the probability of at least one false positive is $`1 - (1-\alpha)^m`, which is $`0.40` for $`m = 10` and $`\alpha = 0.05` — the Bonferroni correction restores the family-wise rate to $`\alpha` at the price of power.

The Benjamini–Hochberg procedure: order p-values $`p_{(1)} \leq \cdots \leq p_{(m)}`, find the largest $`k` such that $`p_{(k)} \leq k\alpha/m`, and reject all $`H_{(1)}, \ldots, H_{(k)}`. It controls the **false discovery rate** $`\text{FDR} = E[V/\max(R,1)]` (false positives over rejections) rather than the probability of *any* false positive — a weaker but far more powerful guarantee, well suited to exploratory screening where some false leads are tolerable.

**Worked example.** Five p-values: 0.001, 0.008, 0.039, 0.041, 0.20, with $`\alpha = 0.05`, $`m = 5`. Compare thresholds $`k\alpha/m = 0.01, 0.02, 0.03, 0.04, 0.05`. The largest $`k` with $`p_{(k)} \leq k\alpha/m` is $`k = 2` ($`0.008 \leq 0.02`, but $`0.039 > 0.03`). BH rejects the two smallest p-values. Bonferroni would reject only one ($`0.001 < 0.01`).

**Example problem.** With $`m = 100` independent tests at $`\alpha = 0.05` and no correction, what is the probability of at least one Type I error? What does Bonferroni require?

<details><summary>Solution</summary>

```math
P(\text{at least one false positive}) = 1 - (1 - 0.05)^{100} \approx 0.994
```

Almost certain. Bonferroni requires each individual test to use $`\alpha/m = 0.0005`, restoring the family-wise rate to 0.05 but demanding far stronger evidence per test.

</details>

</details>

## Quizz

<details><summary>Quizz</summary>

**Problem.** A pharmaceutical company tests a new drug against a placebo. The response variable is $`N(\mu, 4)` (known variance). The null is $`H_0: \mu = 0` (no effect) vs. $`H_1: \mu > 0`. A sample of $`n = 100` patients gives $`\bar{x} = 0.6`. (a) Compute the z-statistic and p-value. (b) Is the result significant at $`\alpha = 0.05`? (c) What is the power at $`\mu = 1`?

<details><summary>Solution</summary>

**(a)** The test statistic is

```math
z = \frac{\bar{x} - 0}{\sigma/\sqrt{n}} = \frac{0.6}{2/10} = 3
```

The one-sided p-value is $`p = 1 - \Phi(3) \approx 0.00135`.

**(b)** Since $`p \approx 0.00135 < 0.05`, we reject $`H_0` at the 5% level. The drug shows a statistically significant positive effect.

**(c)** The power at $`\mu = 1` is

```math
P_{\mu=1}(Z > z_{0.05}) = P\!\left(\frac{\bar{X} - 0}{0.2} > 1.645 \mid \mu = 1\right) = P\!\left(\bar{X} > 0.329\right)
```

Under $`\mu = 1`, $`\bar{X} \sim N(1, 0.04)`, so

```math
\text{Power} = P\!\left(Z > \frac{0.329 - 1}{0.2}\right) = P(Z > -3.36) \approx 0.9996
```

The test has very high power to detect an effect of size 1. You can reproduce this with the [interactive simulation](#interactive-simulation-rejection-region-p-value-and-power) above by setting $`\mu = 1`, $`n = 100`, $`\alpha = 0.05`.

</details>

</details>
