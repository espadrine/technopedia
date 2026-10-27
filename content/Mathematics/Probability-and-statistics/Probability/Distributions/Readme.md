# Distributions

A probability distribution is the law (pushforward measure) of a random variable on its value space. The cumulative distribution function (CDF) is the universal object that characterizes any distribution—atomic, absolutely continuous, or singular—making it the common thread across all categories and the bridge to [Random variables and expectation](../Random-variables-and-expectation.md). Distributions package the full probabilistic content of a random quantity into a single object: a CDF, a density, a probability mass function, or a characteristic function. They are the vocabulary of probability: every model, simulation, and inference procedure is ultimately a statement about distributions.

## Brief history

- Bernoulli (1713): binomial distribution for repeated trials.
- Poisson (1837): limit of the binomial for rare events.
- Gauss and Laplace (early 1800s): normal distribution as the universal limit.
- Kolmogorov (1933): distributions as measures on measurable spaces.
- Sklar (1959): copula theorem decomposing any joint distribution into marginals and a dependence function.

> **Authoritative sources**
> - [A. N. Kolmogorov, Foundations of the Theory of Probability (1933)](https://en.wikipedia.org/wiki/Foundations_of_the_Theory_of_Probability)
> - [C. M. Grinstead & J. L. Snell, Introduction to Probability (2nd ed., 1997)](https://en.wikipedia.org/wiki/Introduction_to_Probability_(book))

## Classes

The four classes partition the subject along the nature of the probability measure (Lebesgue decomposition) and the algebraic structure that organizes distributions:

<table>
<tr><th>Page</th><th>Class</th><th>What it studies</th><th>Key objects</th></tr>
<tr><td><a href='./Atomic-distributions.md'>Atomic distributions</a></td><td>Atomic distributions</td><td>Measures that are sums of point masses (discrete laws, any dimension)</td><td>PMF, probability generating function, factorial moments</td></tr>
<tr><td><a href='./Absolutely-continuous-distributions.md'>Absolutely continuous distributions</a></td><td>Absolutely continuous distributions</td><td>Measures with a density w.r.t. Lebesgue measure (continuous laws, any dimension)</td><td>Density, CDF, transformation of variables, copulas</td></tr>
<tr><td><a href='./Singular-and-mixed-distributions.md'>Singular and mixed distributions</a></td><td>Singular and mixed distributions</td><td>Measures with a singular component or a mixture of atomic and continuous parts</td><td>Singular functions, Stieltjes integrals, mixed CDFs</td></tr>
<tr><td><a href='./Distributional-structure-and-operations.md'>Distributional structure and operations</a></td><td>Distributional structure and operations</td><td>Algebraic properties: families, closure, and operations on distributions</td><td>Exponential families, location-scale families, stable laws, convolutions, mixtures, order statistics</td></tr>
</table>

<details><summary>Details</summary>

The first three classes form a partition by the **Lebesgue decomposition theorem**: every finite Borel measure on $`\mathbb{R}^d` decomposes uniquely as $`\mu = \mu_{\text{at}} + \mu_{\text{ac}} + \mu_{\text{sg}}` where $`\mu_{\text{at}}` is atomic (countable sum of point masses), $`\mu_{\text{ac}}` is absolutely continuous (has a density), and $`\mu_{\text{sg}}` is singular (continuous but supported on a null set, e.g. the Cantor measure). A distribution belongs to exactly one of the first three classes, or is a mixture of two or more.

The fourth class is orthogonal to the first three: it studies the **algebraic and structural relationships** between distributions—parametric families (exponential, location-scale, stable), closure properties (convolution, mixture, transformation), and order statistics. A given distribution (e.g. the normal) is absolutely continuous (class 2) *and* belongs to the exponential family (class 4); the two classifications answer different questions.

The CDF $`F(x) = P(X \leq x)` is the universal representation: it exists for every distribution regardless of type. For atomic distributions it is a step function; for absolutely continuous distributions it is differentiable with $`F'(x) = f(x)`; for singular distributions it is continuous but flat almost everywhere (e.g. the Cantor function). This makes the CDF the natural bridge to [Random variables and expectation](../Random-variables-and-expectation.md), where moments, MGFs, and concentration inequalities are computed from the distribution.

</details>

