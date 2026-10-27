# Bayesian inference

Bayesian inference is the task of computing the full posterior distribution of a parameter given observed data. It combines a prior distribution (encoding prior knowledge or indifference) with a likelihood (encoding the data) via Bayes' theorem. It is the natural framework for sequential updating, decision-making under uncertainty, and quantifying **epistemic uncertainty**—the uncertainty about the parameter itself, which shrinks as data accumulates, in contrast to **aleatoric uncertainty** (irreducible randomness in the data-generating process that no amount of data can eliminate).

> **Authoritative sources**
> - [T. Bayes, An Essay towards solving a Problem in the Doctrine of Chances (1763)](https://en.wikipedia.org/wiki/Bayes%27_theorem)
> - [H. T. Jeffreys, Theory of Probability (1939)](https://en.wikipedia.org/wiki/Theory_of_Probability_(book))
> - [C. M. Bishop, Pattern Recognition and Machine Learning (2006)](https://www.mitpressbooks.org/9780262013773/pattern-recognition-and-machine-learning)

## Bayes' theorem

Given a prior $`\pi(\theta)` and a likelihood $`p(x \mid \theta)`:

```math
\pi(\theta \mid x) = \frac{p(x \mid \theta)\, \pi(\theta)}{\int p(x \mid \theta')\, \pi(\theta')\, d\theta'}
```

The denominator (marginal likelihood or evidence) normalizes the posterior.

<details><summary>Details</summary>

Bayes' theorem is an application of [Conditional probability](../Conditional-probability.md) to the parameter. The key components:

- **Prior** $`\pi(\theta)`: encodes beliefs before seeing the data. Can be informative (based on previous studies) or diffuse (weakly informative, e.g., $`\pi(\theta) \propto 1` for a location parameter).
- **Likelihood** $`p(x \mid \theta)`: the sampling model, same as in [Estimation](./Estimation.md).
- **Posterior** $`\pi(\theta \mid x)`: the updated belief. All uncertainty about $`\theta` is captured by this distribution.
- **Evidence** $`p(x) = \int p(x \mid \theta)\, \pi(\theta)\, d\theta`: the marginal probability of the data. Used for model comparison (Bayes factors).

The posterior mean, median, and mode are all valid point summaries. The posterior credible interval is the Bayesian analogue of the confidence interval: a 95% credible interval contains the true parameter with probability 0.95 (under the posterior).

**Visual intuition.** The posterior is proportional to the pointwise product of the prior and the likelihood. The diagram below shows a typical case: a broad prior, a narrow likelihood centred away from the prior mean, and the resulting posterior that is pulled toward the likelihood but retains some of the prior's spread.

<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;">
  <!-- Axes -->
  <line x1="50" y1="190" x2="470" y2="190" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="190" x2="50" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="260" y="210" text-anchor="middle" font-size="12" fill="#333">θ</text>
  <!-- Prior: broad Gaussian centred at 0.3 -->
  <path d="M50,185 Q100,180 130,160 Q160,130 190,100 Q220,70 250,60 Q280,70 310,100 Q340,130 370,160 Q400,180 450,185" fill="none" stroke="#4488cc" stroke-width="2.5"/>
  <text x="130" y="55" font-size="11" fill="#4488cc">Prior π(θ)</text>
  <!-- Likelihood: narrow peak at 0.7 -->
  <path d="M280,188 Q310,185 330,170 Q350,140 360,100 Q370,50 375,30 Q380,50 390,100 Q400,140 420,170 Q440,185 460,188" fill="none" stroke="#cc4444" stroke-width="2.5"/>
  <text x="390" y="55" font-size="11" fill="#cc4444">Likelihood p(x|θ)</text>
  <!-- Posterior: narrow peak between, closer to likelihood -->
  <path d="M300,188 Q320,185 335,175 Q350,155 358,120 Q365,80 368,55 Q371,80 378,120 Q385,155 400,175 Q415,185 430,188" fill="none" stroke="#44aa44" stroke-width="2.5"/>
  <text x="340" y="100" font-size="11" fill="#44aa44">Posterior π(θ|x)</text>
  <!-- Annotation -->
  <text x="250" y="145" text-anchor="middle" font-size="10" fill="#666">posterior ∝ prior × likelihood</text>
</svg>

</details>

## Prior selection

When no strong prior knowledge exists, the choice of prior still matters. **Objective priors** are constructed from the model structure itself, aiming to encode minimal or "indifference" information.

<details><summary>Details</summary>

- **Jeffreys prior.** Derived from the Fisher information matrix $`I(\theta)`: $`\pi(\theta) \propto \sqrt{\det I(\theta)}`. It is invariant under reparameterization and is the most common "default" objective prior. For a Bernoulli model, $`I(\theta) = 1/[\theta(1-\theta)]`, giving $`\pi(\theta) \propto [\theta(1-\theta)]^{-1/2}`, i.e., $`\text{Beta}(1/2, 1/2)` (the Haldane–Jeffreys prior).

- **Reference prior.** Defined by Berger and Robert (1984) as the prior that maximizes the expected Kullback–Leibler divergence between the posterior and the prior. It is unique up to a constant and is designed so that the posterior is as "informative" as possible. For a Normal mean with known variance, the reference prior is flat: $`\pi(\mu) \propto 1`.

- **Haldane prior.** The improper prior $`\pi(\theta) \propto 1/[\theta(1-\theta)]` for a Bernoulli parameter. It encodes complete indifference (zero prior pseudo-observations) and yields a posterior $`\text{Beta}(s, n-s)` that places zero mass at the boundaries $`\theta = 0` and $`\theta = 1`.

- **Flat (uniform) prior.** $`\pi(\theta) \propto 1` on the parameter space. Simple but not invariant under reparameterization: a uniform prior on $`\theta` does not imply a uniform prior on $`\log\theta`.

The choice of prior affects the posterior, especially with small samples. With large $`n`, the likelihood dominates and the posterior becomes prior-insensitive (the **Bernstein–von Mises theorem**).

> **Authoritative sources**
> - [H. Jeffreys, Theory of Probability (1939), Ch. 4](https://en.wikipedia.org/wiki/Jeffreys%27_prior)
> - [J. O. Berger, R. E. Robert, The Open Reference Prior (1984)](https://en.wikipedia.org/wiki/Reference_prior)

</details>

## Conjugate priors

A prior $`\pi(\theta)` is **conjugate** to a likelihood $`p(x \mid \theta)` if the posterior belongs to the same parametric family as the prior.

<details><summary>Details</summary>

Conjugacy gives closed-form posteriors, enabling exact computation without MCMC. It also makes sequential updating trivial: the posterior after batch 1 becomes the prior for batch 2.

<table>
<tr><th>Likelihood</th><th>Prior</th><th>Posterior</th><th>Sufficient statistic</th></tr>
<tr><td>Bernoulli / Binomial</td><td>Beta(α, β)</td><td>Beta(α + s, β + n − s)</td><td>s (number of successes)</td></tr>
<tr><td>Normal (known σ²)</td><td>Normal(μ₀, τ₀²)</td><td>Normal(μₙ, τₙ²)</td><td>x̄ (sample mean)</td></tr>
<tr><td>Poisson</td><td>Gamma(α, β)</td><td>Gamma(α + Σxᵢ, β + n)</td><td>Σxᵢ (sum of counts)</td></tr>
<tr><td>Gamma (known rate)</td><td>Gamma(α, β)</td><td>Gamma(α + n, β + Σxᵢ)</td><td>Σxᵢ (sum of observations)</td></tr>
<tr><td>Exponential (known rate)</td><td>Gamma(α, β)</td><td>Gamma(α + n, β + Σxᵢ)</td><td>Σxᵢ</td></tr>
<tr><td>Multinomial</td><td>Dirichlet(α₁,…,αₖ)</td><td>Dirichlet(α₁+n₁,…,αₖ+nₖ)</td><td>(n₁,…,nₖ) (cell counts)</td></tr>
</table>

**Example.** Flipping a coin: prior $`\theta \sim \text{Beta}(1, 1)` (uniform). After 7 heads and 3 tails, the posterior is $`\text{Beta}(8, 4)` with mean $`8/12 = 0.667`.

</details>

## MCMC and posterior computation

When the posterior has no closed form, Markov Chain Monte Carlo (MCMC) methods approximate it by constructing a Markov chain whose stationary distribution is the target posterior.

<details><summary>Details</summary>

**Metropolis–Hastings.** At each step, given the current state $`\theta_t`, draw a proposal $`\theta^* \sim q(\cdot \mid \theta_t)` from a proposal distribution $`q` (often a symmetric random walk, e.g., $`\theta^* = \theta_t + \epsilon` with $`\epsilon \sim \mathcal{N}(0, \sigma^2)`). Accept the move with probability

```math
\alpha = \min\!\left(1,\; \frac{\pi(\theta^* \mid x)\, q(\theta_t \mid \theta^*)}{\pi(\theta_t \mid x)\, q(\theta^* \mid \theta_t)}\right)
```

For a symmetric proposal ($`q(\theta_t|\theta^*) = q(\theta^*|\theta_t)`), this reduces to the ratio of posterior densities. If rejected, the chain stays at $`\theta_t`. The tuning parameter $`\sigma` controls the acceptance rate; an optimal acceptance rate for random-walk MH in one dimension is about 0.44.

**Hamiltonian Monte Carlo (HMC) / NUTS.** Augments the parameter with a momentum variable and simulates Hamiltonian dynamics using gradients of the log-posterior. This allows large, correlated moves that explore the posterior efficiently, especially in moderate dimensions. The No-U-Turn Sampler (NUTS) adapts the trajectory length automatically.

**Variational inference.** Approximates the posterior with a simpler family (e.g., a Gaussian) by minimizing the KL divergence $`\text{KL}(q(\theta) \| \pi(\theta|x))`. Faster than MCMC but introduces approximation bias.

**Convergence diagnostics.** Because MCMC samples are autocorrelated, one must verify that the chain has reached stationarity and is mixing well:

- **Gelman–Rubin $`\hat{R}` (R-hat):** run multiple chains from different starting points; $`\hat{R} \approx 1` (typically < 1.01) indicates convergence.
- **Effective sample size (ESS):** the number of independent samples equivalent to the autocorrelated chain. A rule of thumb is ESS > 400 for reliable quantile estimates.
- **Trace plots and autocorrelation plots** provide visual confirmation.

The choice of method depends on dimensionality and smoothness:
- Low dimension, smooth: HMC/NUTS (as in Stan, PyMC).
- High dimension, sparse: coordinate-wise MCMC or variational methods.
- Very high dimension: variational inference or normalizing flows.

The posterior is a [Distribution](../Distributions/Readme.md) in its own right: it has a mean, variance, quantiles, and can be used for prediction via the posterior predictive distribution.

<iframe src="./Bayesian-inference.simulation.html" title="Interactive coin-flipping demo: prior to posterior updating"></iframe>

</details>

## Posterior predictive distribution

To predict a new observation $`x_{\text{new}}` given the data $`x`, one integrates over the posterior:

```math
p(x_{\text{new}} \mid x) = \int p(x_{\text{new}} \mid \theta)\, \pi(\theta \mid x)\, d\theta
```

<details><summary>Details</summary>

The posterior predictive distribution accounts for both the data-generating uncertainty (aleatoric) and the parameter uncertainty (epistemic). It is wider than the likelihood evaluated at the posterior mean because it averages over the spread of the posterior.

**Uses:**

- **Prediction:** sample $`\theta^{(t)} \sim \pi(\theta|x)` (e.g., from MCMC), then $`x_{\text{new}}^{(t)} \sim p(x_{\text{new}}|\theta^{(t)})`. The collection $`\{x_{\text{new}}^{(t)}\}` approximates the predictive distribution.
- **Model checking (posterior predictive checks):** generate replicated datasets $`x^{\text{rep}}` from the posterior predictive and compare summary statistics (mean, variance, extremes) to the observed data. Large discrepancies indicate model misspecification.
- **Bayesian forecasting:** in time-series models, the posterior predictive gives a full predictive distribution with credible intervals that widen further into the future as parameter uncertainty accumulates.

For a conjugate model the posterior predictive often has a closed form. For example, with a Bernoulli likelihood and Beta(α, β) prior, after observing $`s` successes in $`n` trials, the posterior predictive for the next flip is a Beta-Binomial: $`P(x_{\text{new}}=1 \mid x) = (\alpha+s)/(\alpha+\beta+n)`.

</details>

## Bayes factors and model comparison

The Bayes factor comparing models $`M_0` and $`M_1` is

```math
BF_{10} = \frac{p(x \mid M_1)}{p(x \mid M_0)} = \frac{\int p(x \mid \theta_1)\, \pi(\theta_1)\, d\theta_1}{\int p(x \mid \theta_0)\, \pi(\theta_0)\, d\theta_0}
```

<details><summary>Details</summary>

A Bayes factor $`BF_{10} > 1` favors $`M_1`; $`BF_{10} < 1` favors $`M_0`. It is the ratio of marginal likelihoods and automatically penalizes model complexity (Occam's factor): a more complex model spreads its prior over more parameter values, reducing the marginal likelihood.

A common qualitative scale (Jeffreys, 1961):

<table>
<tr><th>|log₁₀ BF|</th><th>Interpretation</th></tr>
<tr><td>0 – 0.5</td><td>Anecdotal</td></tr>
<tr><td>0.5 – 1</td><td>Substantial</td></tr>
<tr><td>1 – 1.5</td><td>Strong</td></tr>
<tr><td>1.5 – 2</td><td>Very strong</td></tr>
<tr><td>> 2</td><td>Decisive</td></tr>
</table>

This connects to [Hypothesis testing](./Hypothesis-testing.md): the Bayes factor is the Bayesian analogue of the likelihood ratio test, but it integrates over the parameter space rather than maximizing.

**Example.** Testing $`H_0: \mu = 0` vs. $`H_1: \mu \neq 0` with a Normal model. The Bayes factor depends on the prior width under $`H_1` and the sample size. For large $`n`, it approximates the BIC (Bayesian Information Criterion) comparison.

</details>

## Example problem

**Problem.** A coin is flipped $`n = 20` times, yielding $`s = 14` heads. The prior is $`\theta \sim \text{Beta}(2, 2)`. (a) Find the posterior distribution. (b) Compute the posterior mean and a 95% credible interval. (c) Compute the Bayes factor for $`H_0: \theta = 0.5` vs. $`H_1: \theta \neq 0.5` (using the Beta prior as the $`H_1` model).

<details><summary>Solution</summary>

**(a)** The posterior is $`\text{Beta}(2 + 14,\; 2 + 6) = \text{Beta}(16, 8)`.

**(b)** The posterior mean is $`16/(16+8) = 2/3 \approx 0.667`. The 95% credible interval is approximately $`[0.47,\; 0.84]` (from the Beta(16, 8) quantiles: 2.5th percentile ≈ 0.47, 97.5th percentile ≈ 0.836).

**(c)** The marginal likelihood under $`H_1` (Beta(2,2) prior) is

```math
p(x \mid H_1) = \binom{20}{14} \frac{B(16, 8)}{B(2, 2)} = \binom{20}{14} \frac{\Gamma(16)\,\Gamma(8)}{\Gamma(24)} \cdot 6 \approx 0.059
```

Under $`H_0: \theta = 0.5`: $`p(x \mid H_0) = \binom{20}{14}(0.5)^{20} \approx 0.037`.

The Bayes factor $`BF_{10} = p(x \mid H_1)/p(x \mid H_0) \approx 1.6`, providing **anecdotal evidence against** $`H_0` (Jeffreys scale: $`1 < BF < 3` corresponds to $`\log_{10} BF < 0.5`).

</details>
