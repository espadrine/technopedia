# Singular and mixed distributions

A singular distribution is a probability measure that is continuous (no atoms) but not absolutely continuous: it is supported on a set of Lebesgue measure zero. A mixed distribution has both an atomic and a continuous (absolutely continuous or singular) component. These distributions complete the Lebesgue decomposition and appear in fractal geometry, censored data, and limit theorems for lattice random walks.

> **Authoritative sources**
> - [A. N. Kolmogorov, Foundations of the Theory of Probability (1933)](https://en.wikipedia.org/wiki/Foundations_of_the_Theory_of_Probability)
> - [P. Billingsley, Probability and Measure (3rd ed., 1995)](https://en.wikipedia.org/wiki/Probability_and_Measure)

## Lebesgue decomposition

Every finite Borel measure $`\mu` on $`\mathbb{R}^d` decomposes uniquely as

```math
\mu = \mu_{\text{at}} + \mu_{\text{ac}} + \mu_{\text{sg}},
```

where:
- $`\mu_{\text{at}}` is **atomic**: a countable sum $`\sum_i a_i \delta_{x_i}` with $`a_i > 0`, $`\sum_i a_i < \infty`.
- $`\mu_{\text{ac}}` is **absolutely continuous**: $`\mu_{\text{ac}}(A) = \int_A f\, dx` for some $`f \in L^1`.
- $`\mu_{\text{sg}}` is **singular**: continuous (no atoms) but $`\mu_{\text{sg}}(N) = \mu_{\text{sg}}(\mathbb{R}^d)` for some Borel set $`N` with $`\lambda(N) = 0` (Lebesgue measure zero).

A distribution is **mixed** if at least two of the three components are nonzero.

<details><summary>Details</summary>

The decomposition is unique: the atomic part is determined by the atoms, the absolutely continuous part by the density, and the singular part is the remainder. The CDF of a mixed distribution has both jumps (from the atomic part) and a continuous component (from the absolutely continuous and singular parts).

In practice, purely singular distributions (other than the Cantor measure and its variants) are rare in applications. Mixed distributions, however, are common: censored data (a point mass at the censoring threshold plus a continuous tail), distributions with a spike at zero plus a continuous density (spike-and-slab priors in Bayesian statistics), and lattice distributions convolved with a continuous noise.

</details>

## The Cantor distribution

The **Cantor distribution** is the canonical singular continuous distribution. It is the distribution of the random variable

```math
X = \sum_{k=1}^{\infty} \frac{2 B_k}{3^k},
```

where $`B_k` are i.i.d. Bernoulli(1/2) random variables. Its CDF is the **Cantor function** (or devil's staircase):

- $`F(0) = 0`, $`F(1) = 1`.
- $`F` is continuous and non-decreasing.
- $`F'(x) = 0` for almost every $`x` (the derivative vanishes a.e.).
- $`F` increases only on the Cantor set $`C`, which has Lebesgue measure zero.
- $`P(X \in C) = 1` but $`\lambda(C) = 0`.

<details><summary>Details</summary>

The Cantor set $`C` is constructed by iteratively removing the middle third of each interval. At stage $`n`, there are $`2^n` intervals of length $`3^{-n}`. The total length removed is $`\sum_{n=1}^{\infty} 2^{n-1}/3^n = 1`, so $`\lambda(C) = 0`. Yet $`C` is uncountable (cardinality $`2^{\aleph_0}`).

The Cantor function maps $`C` onto $`[0,1]` in a measure-preserving way: the pushforward of Lebesgue measure on $`[0,1]` under the binary-to-ternary map is the Cantor measure. The CDF is flat on each removed interval (contributing no probability) and increases only on $`C`.

The Cantor distribution is the unique probability measure on $`C` that is invariant under the two-branch IFS $`x \mapsto x/3` and $`x \mapsto (x+2)/3` with equal weights. It is a **self-similar measure**.

</details>

## Mixed distributions in applications

A **mixed distribution** has CDF of the form

```math
F(x) = \sum_i a_i \, \mathbf{1}_{\{x_i \leq x\}} + \int_{(-\infty, x]} f(t)\, dt + G_{\text{sg}}(x),
```

where the first term is the atomic part, the second is the absolutely continuous part, and the third is the singular part.

Common examples:

- **Censored data**: $`P(X = c) = p` (point mass at censoring point $`c`) plus $`P(X \in dx) = (1-p) f(x)\, dx` for $`x > c`.
- **Spike-and-slab**: $`P(X = 0) = \pi` plus $`P(X \in dx) = (1-\pi) f(x)\, dx` for $`x \neq 0`. Used in Bayesian variable selection.
- **Lattice + noise**: $`X = Y + Z` where $`Y` is lattice-valued and $`Z` is continuous; the result is absolutely continuous (the convolution smooths the atoms).

<details><summary>Details</summary>

The spike-and-slab prior is central in Bayesian sparse regression: each coefficient is either exactly zero (the spike) or drawn from a continuous distribution (the slab). The posterior probability of the spike gives a natural variable selection criterion.

A key fact: the convolution of an atomic measure with an absolutely continuous measure is absolutely continuous. The atoms are "washed out" by the continuous noise. This is why adding Gaussian noise to a discrete signal produces a continuous distribution.

The relationship to [Atomic distributions](./Atomic-distributions.md): the atomic component of a mixed distribution is studied using PMFs and generating functions. The relationship to [Absolutely continuous distributions](./Absolutely-continuous-distributions.md): the absolutely continuous component is studied using densities and the transformation formula.

</details>

## Stieltjes integration

For a general (possibly mixed) distribution with CDF $`F`, the expectation is computed via the **Riemann–Stieltjes integral**:

```math
E[g(X)] = \int_{\mathbb{R}} g(x)\, dF(x).
```

This unifies the three cases:
- Atomic: $`\sum_i g(x_i)\, p_i`.
- Absolutely continuous: $`\int g(x) f(x)\, dx`.
- Singular: the integral is with respect to the singular measure (no density exists).

<details><summary>Details</summary>

The Stieltjes integral is the measure-theoretic Lebesgue integral with respect to the measure induced by $`F`. It is the correct tool when the distribution has both jumps and a continuous part, or when the continuous part is singular.

In practice, for mixed distributions one often computes the expectation by splitting: $`E[g(X)] = \sum_i g(x_i) p_i + \int g(x) f(x)\, dx` (omitting the singular part if it is zero).

</details>

## Example problem

**Problem.** A sensor reports a value $`X` that is censored at 0: with probability 0.3 the sensor reads exactly 0, and with probability 0.7 it reads an $`\mathrm{Exp}(1)` value. Write the CDF of $`X` and compute $`E[X]`.

<details><summary>Solution</summary>

The CDF is mixed:

```math
F(x) = 0, \quad x < 0;
```

```math
F(0) = 0.3;
```

```math
F(x) = 0.3 + 0.7(1 - e^{-x}), \quad x > 0.
```

There is a jump of size 0.3 at $`x = 0` (the atomic part) and a continuous increase for $`x > 0` (the absolutely continuous part with density $`0.7 e^{-x}` on $`(0, \infty)`).

$`E[X] = 0 \cdot 0.3 + 0.7 \cdot E[\mathrm{Exp}(1)] = 0.7 \cdot 1 = 0.7`.

</details>