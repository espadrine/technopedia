# Atomic distributions

An atomic distribution is a probability measure that is a countable sum of point masses. It is the law of a random variable taking values in a countable set. Atomic distributions are the discrete workhorses of probability: counting, occupancy, branching, and rare-event models all live here.

> **Authoritative sources**
> - [C. M. Grinstead & J. L. Snell, Introduction to Probability (2nd ed., 1997)](https://en.wikipedia.org/wiki/Introduction_to_Probability_(book))
> - [R. D. Durrett, Probability: Theory and Examples (2nd ed., 2010)](https://sites.math.duke.edu/~rtd/PTE/pte.html)

## Probability mass function

A distribution on a countable set $`S` is atomic iff there exist weights $`p_s \geq 0` with $`\sum_{s \in S} p_s = 1` such that $`P(X = s) = p_s` for all $`s \in S`. The function $`p: S \to [0,1]` is the **probability mass function** (PMF).

- CDF: $`F(x) = \sum_{s \leq x} p_s` (step function, jumps of size $`p_s` at each atom).
- Expectation: $`E[g(X)] = \sum_{s \in S} g(s)\, p_s`.
- Variance: $`\mathrm{Var}(X) = \sum_s (s - \mu)^2 p_s` where $`\mu = \sum_s s\, p_s`.

<details><summary>Details</summary>

The PMF is the density of the measure w.r.t. counting measure. The CDF is a right-continuous step function: it is constant between atoms and jumps by $`p_s` at each atom $`s`. The total jump size sums to 1.

For a multivariate atomic distribution on $`\mathbb{Z}^d`, the PMF is $`p(x_1, \ldots, x_d) = P(X_1 = x_1, \ldots, X_d = x_d)` and the joint generating function generalizes the univariate case.

</details>

## Probability generating function

For $`X` on $`\mathbb{N}_0`, the **probability generating function** (PGF) is

```math
G(z) = \sum_{k=0}^{\infty} p_k\, z^k = E[z^X], \quad |z| \leq 1.
```

- $`G(1) = 1` (normalization).
- $`G'(1) = E[X]`, $`G''(1) = E[X(X-1)]` (factorial moments).
- If $`X_1, \ldots, X_n` are i.i.d. with PGF $`G`, then $`S_n = X_1 + \cdots + X_n` has PGF $`G(z)^n`.
- $`X` has a proper distribution iff $`G(1) = 1` and $`G` is analytic on $`|z| < 1`.

<details><summary>Details</summary>

The PGF encodes the entire distribution: $`p_k = G^{(k)}(0)/k!`. It converts convolution (sum of independent variables) into multiplication, making it the natural tool for occupancy problems, branching processes, and random walks.

For a multivariate atomic distribution on $`\mathbb{N}_0^d`, the joint PGF is $`G(z_1, \ldots, z_d) = E[z_1^{X_1} \cdots z_d^{X_d}]`.

**Relationship to the MGF.** For $`\mathbb{N}_0`-valued variables, the PGF and the moment-generating function (see [Random variables and expectation](../Random-variables-and-expectation.md)) are related by $`G(z) = M(\log z)` where $`M(t) = E[e^{tX}]` is the MGF. The PGF is the natural tool when the support is a subset of $`\mathbb{N}_0`: it always converges for $`|z| \leq 1`, whereas the MGF may fail to exist (e.g. for heavy-tailed discrete distributions). Reach for the PGF for counting problems; reach for the MGF when you need exponential moments or large-deviation bounds.

The relationship to [Distributional structure and operations](./Distributional-structure-and-operations.md): the PGF is the generating function that makes convolution a product, which is the algebraic backbone of the convolution operation.

</details>

## Common atomic distributions

<table>
<tr><th>Distribution</th><th>PMF</th><th>Support</th><th>Mean</th><th>Variance</th></tr>
<tr><td>Bernoulli(<i>p</i>) (0/1)</td><td><i>p</i><sup>x</sup>(1−<i>p</i>)<sup>1−x</sup></td><td>{0, 1}</td><td><i>p</i></td><td><i>p</i>(1−<i>p</i>)</td></tr>
<tr><td>Binomial(<i>n</i>, <i>p</i>)</td><td>C(<i>n</i>,<i>k</i>) <i>p</i><sup>k</sup>(1−<i>p</i>)<sup>n−k</sup></td><td>{0, 1, …, <i>n</i>}</td><td><i>np</i></td><td><i>np</i>(1−<i>p</i>)</td></tr>
<tr><td>Geometric(<i>p</i>) (trials to first success)</td><td><i>p</i>(1−<i>p</i>)<sup>k−1</sup></td><td>{1, 2, 3, …}</td><td>1/<i>p</i></td><td>(1−<i>p</i>)/<i>p</i><sup>2</sup></td></tr>
<tr><td>Poisson(λ)</td><td>λ<sup>k</sup> e<sup>−λ</sup>/k!</td><td>{0, 1, 2, …}</td><td>λ</td><td>λ</td></tr>
<tr><td>Negative Binomial(<i>r</i>, <i>p</i>) (failures before <i>r</i>-th success)</td><td>C(<i>k</i>+<i>r</i>−1, <i>k</i>) <i>p</i><sup>r</sup>(1−<i>p</i>)<sup>k</sup></td><td>{0, 1, 2, …}</td><td><i>r</i>(1−<i>p</i>)/<i>p</i></td><td><i>r</i>(1−<i>p</i>)/<i>p</i><sup>2</sup></td></tr>
<tr><td>Categorical(<i>p</i><sub>1</sub>, …, <i>p</i><sub>m</sub>)</td><td><i>p</i><sub>i</sub> at category <i>i</i></td><td>{1, …, <i>m</i>}</td><td>Σ <i>i</i> <i>p</i><sub>i</sub></td><td>Σ (<i>i</i> − μ)² <i>p</i><sub>i</sub></td></tr>
</table>

<details><summary>Details</summary>

These six families cover the vast majority of discrete models in probability and statistics. Their relationships:

- The Bernoulli is the $`n = 1` case of the Binomial; the Binomial is a sum of i.i.d. Bernoulli variables.
- The Geometric is the waiting time between successes in a Bernoulli sequence; the Negative Binomial is the waiting time to the $`r`-th success.
- The Poisson is the limit of the Binomial as $`n \to \infty`, $`p \to 0` with $`np \to \lambda` (see the Poisson limit theorem below).
- The Categorical generalizes the Bernoulli to $`m > 2` outcomes; the multinomial is a sum of i.i.d. Categorical vectors.

The Poisson and Negative Binomial are both infinitely divisible on $`\mathbb{N}_0`, but the Poisson is the canonical increment law for counting processes with stationary independent increments on a discrete time scale. See [Stochastic processes](../Stochastic-processes/Readme.md) for the continuous-time generalization.

</details>

## Factorial moments

The **factorial moment** of order $`r` is

```math
E[X(X-1)\cdots(X-r+1)] = G^{(r)}(1).
```

- First factorial moment: $`E[X] = G'(1)`.
- Second: $`E[X(X-1)] = G''(1)`; hence $`\mathrm{Var}(X) = G''(1) + G'(1) - [G'(1)]^2`.
- For a Poisson($`\lambda`) variable, all factorial moments equal $`\lambda^r`.

<details><summary>Details</summary>

Factorial moments are the natural moments for discrete variables because they arise directly from PGF derivatives. The ordinary moment $`E[X^r]` can be recovered from factorial moments via Stirling numbers of the second kind: $`E[X^r] = \sum_{k=0}^{r} {r \brace k}\, E[X^{\underline{k}}]` where $`X^{\underline{k}} = X(X-1)\cdots(X-k+1)`.

The PGF derivative formula $`G^{(r)}(1) = E[X^{\underline{r}}]` is the discrete analogue of the MGF derivative formula $`M^{(r)}(0) = E[X^r]`. Both encode all moments in a single analytic function.

</details>

## Poisson limit theorem

**Theorem (Poisson limit).** If $`X_n \sim \mathrm{Binomial}(n, p_n)` with $`n\, p_n \to \lambda` as $`n \to \infty`, then $`X_n \xrightarrow{d} \mathrm{Poisson}(\lambda)`.

<details><summary>Details</summary>

The Poisson limit is the atomic analogue of the central limit theorem: it is the universal limit for rare events. The proof uses the PGF: the Binomial PGF is $`(1 - p_n + p_n z)^n`, and

```math
(1 - p_n + p_n z)^n = \left(1 + \frac{p_n(z-1)}{1} \right)^n \to e^{\lambda(z-1)}
```

as $`n \to \infty` with $`np_n \to \lambda`. Since the PGF determines the distribution, $`X_n \xrightarrow{d} \mathrm{Poisson}(\lambda)`.

The Poisson distribution is the canonical increment law for counting processes with stationary independent increments on a discrete time scale. See [Stochastic processes](../Stochastic-processes/Readme.md) for the continuous-time generalization (the Poisson process).

</details>

## Multivariate atomic distributions

A joint distribution on $`\mathbb{Z}^d` is atomic with PMF $`p(x_1, \ldots, x_d)`. Key objects:

- **Joint PGF**: $`G(z_1, \ldots, z_d) = E[z_1^{X_1} \cdots z_d^{X_d}]`.
- **Marginals**: $`p_i(x_i) = \sum_{x_{-i}} p(x_1, \ldots, x_d)`.
- **Independence**: $`p(x) = \prod_i p_i(x_i)` iff $`G(z) = \prod_i G_i(z_i)`.
- **Multivariate Poisson**: $`X_i = N_i + N_0` where $`N_i` are independent Poisson($`\lambda_i`); the covariance is $`\mathrm{Cov}(X_i, X_j) = \lambda_0` for $`i \neq j`.

<details><summary>Details</summary>

The multivariate Poisson is the canonical example of a multivariate atomic distribution with positive dependence. Its joint PGF is

```math
G(z_1, \ldots, z_d) = \exp\!\Bigl(\sum_{i=1}^{d} \lambda_i (z_i - 1) + \lambda_0 (z_1 z_2 \cdots z_d - 1)\Bigr).
```

The $`\lambda_0` term involves the **product** $`z_1 z_2 \cdots z_d` because $`N_0` contributes simultaneously to every $`X_i`: a single event in $`N_0` increments all coordinates at once, so its generating contribution is $`E[z_1^{N_0} \cdots z_d^{N_0}] = E[(z_1 \cdots z_d)^{N_0}] = e^{\lambda_0(z_1 \cdots z_d - 1)}`.

Multivariate atomic distributions arise in: multinomial sampling, contingency tables, branching processes in $`d` types, and lattice random walks. The relationship to [Absolutely continuous distributions](./Absolutely-continuous-distributions.md) is via the multivariate normal approximation to the multinomial (a limit theorem).

</details>

## Example problem

**Problem.** A server receives requests according to a Poisson process with rate $`\lambda = 5` per minute. What is the probability that exactly 3 requests arrive in a 2-minute interval? What is the expected number of requests in that interval?

<details><summary>Solution</summary>

Over a 2-minute interval, the count is $`X \sim \mathrm{Poisson}(2\lambda) = \mathrm{Poisson}(10)`.

```math
P(X = 3) = \frac{10^3 \, e^{-10}}{3!} = \frac{1000 \cdot e^{-10}}{6} \approx 0.00757.
```

$`E[X] = 10`.

The PGF is $`G(z) = e^{10(z-1)}`; the factorial moment $`G'''(1) = 10^3 = 1000 = E[X(X-1)(X-2)]`.

</details>

<iframe src="./Atomic-distributions.simulation.html" title="Interactive PGF explorer: PMF, CDF, and PGF for common atomic distributions"></iframe>