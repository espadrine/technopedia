# Estimation

Estimation is the task of inferring the value of an unknown parameter from observed data. It is the most basic form of statistical inference: given a sampling model $`X_1, \ldots, X_n \sim P_\theta` and observed data $`x_1, \ldots, x_n`, produce a number (point estimate) or an interval (confidence interval) for $`\theta`.

> **Authoritative sources**
> - [R. A. Fisher, Statistical Methods and Their Logical Bases (1922)](https://en.wikipedia.org/wiki/Statistical_Methods_and_Their_Logical_Bases)
> - [C. R. Rao, Advanced Statistical Methods in Biometric Research (1973)](https://doi.org/10.1007/978-1-4612-2441-9)

## Maximum likelihood estimation

Given a likelihood $`L(\theta) = \prod_{i=1}^n f(x_i; \theta)`, the MLE is

```math
\hat{\theta}_{\text{MLE}} = \arg\max_\theta \, L(\theta) = \arg\max_\theta \, \ell(\theta)
```

where $`\ell(\theta) = \sum_i \log f(x_i; \theta)` is the log-likelihood.

<details><summary>Details</summary>

The MLE has several key properties:

- **Consistency**: $`\hat{\theta}_{\text{MLE}} \xrightarrow{P} \theta_0` as $`n \to \infty` under regularity conditions.
- **Asymptotic normality**: $`\sqrt{n}(\hat{\theta}_{\text{MLE}} - \theta_0) \xrightarrow{d} N(0, I(\theta_0)^{-1})` where $`I(\theta)` is the Fisher information. This result rests on the [Limit theorems](../Limit-theorems.md) (in particular the CLT applied to the score).
- **Efficiency**: the MLE achieves the Cramér–Rao lower bound asymptotically.
- **Invariance**: if $`\hat{\theta}` is the MLE of $`\theta`, then $`g(\hat{\theta})` is the MLE of $`g(\theta)`.

The **score function** is $`S(\theta) = \partial \ell / \partial \theta`. Under regularity conditions its expectation is zero, $`E[S(\theta)] = 0`, and its variance is the Fisher information: $`I(\theta) = \text{Var}(S(\theta)) = -E[\partial^2 \ell / \partial \theta^2]`. The MLE is the value of $`\theta` at which the score vanishes, $`S(\hat{\theta}) = 0`. The Fisher information thus measures the curvature of the log-likelihood and controls the asymptotic variance of the MLE.

**Example.** For $`X_i \sim N(\mu, \sigma^2)` with known $`\sigma^2`, the MLE is $`\hat{\mu} = \bar{X}` and $`\text{Var}(\hat{\mu}) = \sigma^2/n`.

The MLE is a special case of the more general framework of [Distributions](../Distributions/Readme.md): the likelihood is the density of the data viewed as a function of the parameter.

**Connection to Bayesian inference.** The MLE coincides with the Bayesian MAP (maximum a posteriori) estimate when the prior is flat (uniform). See [Bayesian inference](./Bayesian-inference.md) for the full posterior-based approach.

</details>

<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;">
  <rect width="500" height="200" fill="#fafafa" rx="4"/>
  <line x1="50" y1="170" x2="450" y2="170" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="170" x2="50" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="250" y="195" text-anchor="middle" font-size="12" fill="#333">θ</text>
  <text x="20" y="100" text-anchor="middle" font-size="12" fill="#333" transform="rotate(-90,20,100)">ℓ(θ)</text>
  <path d="M 60,168 Q 100,165 140,155 Q 180,135 220,100 Q 260,55 300,30 Q 340,55 380,100 Q 420,135 440,160 L 450,168" fill="none" stroke="#2563eb" stroke-width="2.5"/>
  <line x1="300" y1="30" x2="300" y2="170" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="300" cy="30" r="5" fill="#dc2626"/>
  <text x="300" y="22" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="bold">θ̂_MLE</text>
  <text x="310" y="160" font-size="10" fill="#666">S(θ̂) = 0</text>
</svg>

## Method of moments

Equate sample moments to population moments:

```math
\bar{X} = E_\theta[X], \quad \frac{1}{n}\sum_i (X_i - \bar{X})^2 = \text{Var}_\theta[X]
```

Solve for $`\theta`.

<details><summary>Details</summary>

The method of moments is simpler than MLE but generally less efficient. It works by matching the first $`k` sample moments to the first $`k` theoretical moments, where $`k` is the number of parameters.

**Example.** For $`X_i \sim \text{Gamma}(\alpha, \beta)` (shape–rate), set $`\bar{X} = \alpha/\beta` and $`s^2 = \alpha/\beta^2` to get $`\hat{\alpha} = \bar{X}^2/s^2` and $`\hat{\beta} = \bar{X}/s^2`.

</details>

## Cramér–Rao lower bound

For any unbiased estimator $`T` of $`g(\theta)`:

```math
\text{Var}(T) \geq \frac{[g'(\theta)]^2}{n \, I(\theta)}
```

<details><summary>Details</summary>

The Cramér–Rao bound gives a lower bound on the variance of any unbiased estimator. An estimator that achieves the bound is called **efficient**. The MLE is asymptotically efficient: its variance approaches the bound as $`n \to \infty`.

The bound can be violated for finite samples (e.g., the sample mean for a uniform distribution), and it does not apply to biased estimators without modification.

**Example.** For $`X_i \sim N(\mu, \sigma^2)` with known $`\sigma^2`, $`I(\mu) = 1/\sigma^2` and the bound is $`\sigma^2/n`, which is achieved by $`\bar{X}`.

</details>

<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;">
  <rect width="500" height="220" fill="#fafafa" rx="4"/>
  <line x1="50" y1="190" x2="450" y2="190" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="190" x2="50" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="250" y="215" text-anchor="middle" font-size="12" fill="#333">n (sample size)</text>
  <text x="20" y="110" text-anchor="middle" font-size="12" fill="#333" transform="rotate(-90,20,110)">Var(θ̂)</text>
  <path d="M 60,40 Q 80,60 100,80 Q 130,100 160,115 Q 200,130 250,145 Q 300,155 350,165 Q 400,172 440,178" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="380" y="175" font-size="11" fill="#dc2626">CRLB = σ²/n</text>
  <path d="M 60,30 Q 80,50 100,72 Q 130,92 160,108 Q 200,122 250,137 Q 300,148 350,158 Q 400,166 440,173" fill="none" stroke="#2563eb" stroke-width="2.5"/>
  <text x="380" y="168" font-size="11" fill="#2563eb">Var(θ̂_MLE)</text>
  <text x="150" y="50" font-size="11" fill="#666">gap → 0 as n → ∞</text>
</svg>

## Bias–variance tradeoff

The mean squared error of an estimator $`\hat{\theta}` decomposes as

```math
\text{MSE}(\hat{\theta}) = \text{Bias}(\hat{\theta})^2 + \text{Var}(\hat{\theta})
```

where $`\text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta`.

<details><summary>Details</summary>

The decomposition shows that an estimator's total error has two independent sources: systematic error (bias) and random fluctuation (variance). The Cramér–Rao bound constrains only the variance of *unbiased* estimators; a biased estimator can have lower MSE by trading some bias for reduced variance.

**Example.** For $`X_i \sim N(\mu, \sigma^2)` with known $`\sigma^2`, the sample mean $`\bar{X}` is unbiased and achieves the CRLB. The estimator $`c\,\bar{X}` with $`0 < c < 1` is biased (bias $`= (1-c)\mu`), but its MSE is $`(1-c)^2\mu^2 + c^2\sigma^2/n`, which can be smaller than $`\sigma^2/n` for large $`|\mu|/(\sigma/\sqrt{n})`.

This tradeoff is the key lens for comparing estimators beyond the Cramér–Rao bound and connects directly to the bias–variance decomposition in [Bayesian inference](./Bayesian-inference.md) (posterior mean vs. MAP).

</details>

## Sufficient statistics

A statistic $`T(X)` is **sufficient** for $`\theta` if the conditional distribution of $`X` given $`T(X)` does not depend on $`\theta`.

<details><summary>Details</summary>

**Fisher's factorization theorem.** $`T(X)` is sufficient for $`\theta` if and only if the likelihood factors as

```math
f(x; \theta) = g(T(x), \theta) \, h(x)
```

for some functions $`g` and $`h` (where $`h` does not depend on $`\theta`).

**Rao–Blackwell theorem.** If $`T` is any unbiased estimator of $`g(\theta)` and $`S` is a sufficient statistic, then $`T^* = E[T \mid S]` is also unbiased and has variance no greater than that of $`T`. Conditioning on a sufficient statistic can only reduce variance.

**Example.** For $`X_i \sim N(\mu, \sigma^2)` with both parameters unknown, $`(\bar{X}, \sum_i (X_i - \bar{X})^2)` is sufficient. For $`X_i \sim \text{Bernoulli}(p)` the sufficient statistic is $`\sum_i X_i`.

Sufficiency is the bridge between the raw data and the minimal information needed for estimation; it underlies the construction of UMVU (uniformly minimum-variance unbiased) estimators.

</details>

## Confidence intervals

A $`1-\alpha` confidence interval for $`\theta` is a random interval $`[L(X), U(X)]` such that

```math
P_\theta\bigl(\theta \in [L, U]\bigr) \geq 1 - \alpha \quad \forall\, \theta
```

<details><summary>Details</summary>

Construction methods:

- **Pivotal quantity**: find a statistic $`Q(\hat{\theta}, \theta)` whose distribution does not depend on $`\theta` (a pivot). Invert the pivot's quantiles.
- **Asymptotic (Wald)**: use $`\hat{\theta} \pm z_{\alpha/2} \cdot \text{SE}(\hat{\theta})`.
- **Likelihood ratio**: $`\{\theta : 2[\ell(\hat{\theta}) - \ell(\theta)] \leq \chi^2_{1,1-\alpha}\}`.

The coverage probability is a property of the procedure, not of the realized interval. A 95% CI means that 95% of intervals generated by repeated sampling contain the true parameter.

**Example.** For $`\bar{X} \sim N(\mu, \sigma^2/n)` with known $`\sigma`, the pivot is $`Z = (\bar{X} - \mu)/(\sigma/\sqrt{n}) \sim N(0,1)` and the 95% CI is $`\bar{X} \pm 1.96\,\sigma/\sqrt{n}`.

</details>

## Interactive simulation

<iframe src="./Estimation.simulation.html" title="MLE convergence and likelihood surface"></iframe>

## Example problem

**Problem.** A factory produces bolts whose diameters are $`N(\mu, 0.01^2)` cm. A sample of $`n = 25` bolts has mean diameter $`\bar{x} = 1.004` cm. (a) Find the MLE of $`\mu`. (b) Construct a 95% confidence interval for $`\mu`. (c) What is the Cramér–Rao lower bound on $`\text{Var}(\hat{\mu})`?

<details><summary>Solution</summary>

**(a)** The MLE is $`\hat{\mu} = \bar{x} = 1.004` cm.

**(b)** Since $`\sigma = 0.01` is known, the 95% CI is

```math
1.004 \pm 1.96 \cdot \frac{0.01}{\sqrt{25}} = 1.004 \pm 0.00392
```

so the interval is $`[1.0001, 1.0079]` cm.

**(c)** The Fisher information for one observation is $`I(\mu) = 1/\sigma^2 = 10000` and for $`n = 25` observations is $`nI = 250000`. The Cramér–Rao bound is

```math
\text{Var}(\hat{\mu}) \geq \frac{1}{nI(\mu)} = \frac{\sigma^2}{n} = \frac{0.0001}{25} = 4 \times 10^{-6}
```

The sample mean achieves this bound, confirming it is efficient.

</details>