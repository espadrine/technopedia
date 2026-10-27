# Statistical inference

Statistical inference is the reverse direction of probability: given observed data (realizations of random variables), it infers the underlying model, parameters, or latent states. It encompasses estimation, hypothesis testing, Bayesian updating, and causal inference. It is the bridge between probability theory and data science, engineering, and the sciences.

## Brief history

- Fisher (1920s): maximum likelihood, sufficiency, and the theory of estimation.
- Neyman and Pearson (1933): hypothesis testing and the power function.
- Bayesian revival (1950s–): conjugate priors, decision theory, and computation (MCMC).
- Modern era: high-dimensional inference, nonparametric methods, and causal inference.

> **Authoritative sources**
> - [R. A. Fisher, Statistical Methods and Their Logical Bases (1922)](https://en.wikipedia.org/wiki/Statistical_Methods_and_Their_Logical_Bases)
> - [J. Neyman & E. S. Pearson, On the Problem of the Most Efficient Tests of Statistical Hypotheses (1933)](https://doi.org/10.1098/rsta.1933.0009)
> - [ISO 3534-1:2006, Statistics - Vocabulary and symbols - Part 1: General](https://www.iso.org/standard/37822.html)

## Classes

The four classes are organized by the inferential question they answer. Each targets a fundamentally different type of quantity: an associational parameter, a decision about a parameter set, a full posterior distribution, or an interventional effect.

<table>
<tr><th>Page</th><th>Class</th><th>Question it answers</th><th>Key objects</th></tr>
<tr><td><a href='./Estimation.md'>Estimation</a></td><td>Estimation</td><td>What is the parameter value?</td><td>MLE, method of moments, Cramér–Rao bound, confidence intervals</td></tr>
<tr><td><a href='./Hypothesis-testing.md'>Hypothesis testing</a></td><td>Hypothesis testing</td><td>Is the parameter in a specified set?</td><td>p-values, power, likelihood ratio tests, multiple comparisons</td></tr>
<tr><td><a href='./Bayesian-inference.md'>Bayesian inference</a></td><td>Bayesian inference</td><td>What is the full posterior distribution?</td><td>Priors, posteriors, MCMC, Bayes factors</td></tr>
<tr><td><a href='./Causal-inference.md'>Causal inference</a></td><td>Causal inference</td><td>What is the effect of an intervention?</td><td>Structural causal models, do-calculus, instrumental variables, counterfactuals</td></tr>
</table>

<details><summary>Details</summary>

The four classes are organized by the inferential task, each targeting a distinct type of quantity:

- **Estimation** asks: what is the parameter? It produces a number (point estimate) or a range (confidence interval) with known coverage.
- **Hypothesis testing** asks: is the parameter in a certain set? It produces a rejection decision with controlled error rates.
- **Bayesian inference** asks: given the data, what is the posterior distribution of the parameter? It combines a prior with a likelihood via Bayes' theorem (see [Conditional probability](../Conditional-probability.md)).
- **Causal inference** asks: what would happen under intervention? It targets interventional and counterfactual quantities that are not identifiable from associational data alone without additional assumptions.

All four build on [Random variables and expectation](../Random-variables-and-expectation.md) (the data are random variables) and [Distributions](../Distributions/Readme.md) (the sampling model). The asymptotic theory of estimators and tests relies on [Limit theorems](../Limit-theorems.md) (CLT for the sampling distribution of the MLE).

**Relationship to information theory.** Estimation and model selection admit a unifying information-theoretic lens: the Kullback–Leibler divergence measures the loss from using an approximate model, mutual information quantifies the reduction in uncertainty about a parameter given the data, and minimum description length (MDL) provides a coding-theoretic criterion for model selection that parallels Bayesian model evidence. These connections make information theory a natural companion to statistical inference.

</details>

