# Probability

Probability is the mathematics of uncertainty. It assigns numbers to possible outcomes, events, and random variables so that uncertainty can be compared, combined, and optimized. It is relevant whenever outcomes are not known in advance: sampling, measurement noise, risk, queues, communication errors, biological variation, physical diffusion, and probabilistic models in machine learning.

<details><summary>Details</summary>

A useful mental model is probability as mass. A sample space is a set of possible outcomes, an event is a collection of outcomes, and a probability measure assigns mass to events. The basic axioms require nonnegative mass, total mass one, and additivity for disjoint events: $`P(\Omega)=1` and $`P(\bigcup_i A_i)=\sum_i P(A_i)` when the $`A_i` are disjoint.

The rigorous framework (sigma-algebras, measures, Lebesgue integration) is developed in the sibling topic [Measure theory](../Measure-theory/Readme.md). Probability specializes that framework by requiring total mass one: a probability measure is a measure with $`\mu(\Omega)=1`.

The classes below are ordered so that each row uses only the previous rows: conditional probability refines the measure with information, random variables are measurable functions, distributions are the pushforward measures of those functions, limit theorems study sequences, stochastic processes index families by time or space, and inference reverses the direction from data to models.

</details>

## Brief history

- Pascal and Fermat (1654) began the study of games of chance and expected value.
- Bernoulli and Bayes (18th century) connected frequency, large samples, and inverse probability.
- Gauss and Laplace (19th century) made the normal distribution central to error and least squares.
- Kolmogorov (1933) gave the modern measure-theoretic axioms.

> **Authoritative sources**
> - [A. N. Kolmogorov, Foundations of the Theory of Probability (1933)](https://en.wikipedia.org/wiki/Foundations_of_the_Theory_of_Probability)
> - [ISO 3534-1:2006, Statistics - Vocabulary and symbols - Part 1: General](https://www.iso.org/standard/37822.html)

## Classes

The usual reading order is: conditional probability refines the measure with information, random variables attach numbers to outcomes, distributions package those numbers into laws, limit theorems describe large samples, stochastic processes add time or space, and statistical inference turns observed data back into models.

<table>
<tr><th>Page</th><th>Class</th><th>What it studies</th><th>How it relates to probability</th></tr>
<tr><td><a href='./Conditional-probability.md'>Conditional probability</a></td><td>Conditional probability</td><td>Updating probabilities given information; independence structures</td><td>Derived operation: restrictions, quotients, regular conditional probabilities</td></tr>
<tr><td><a href='./Random-variables-and-expectation.md'>Random variables and expectation</a></td><td>Random variables and expectation</td><td>Numbers attached to outcomes, averages, variance, concentration</td><td>Measurable functions on the sample space; the algebra for computing quantities of interest</td></tr>
<tr><td><a href='./Distributions/Readme.md'>Distributions</a></td><td>Distributions</td><td>Probability laws of random quantities</td><td>Pushforward measures on the value space; packages a measure into a usable law</td></tr>
<tr><td><a href='./Limit-theorems.md'>Limit theorems</a></td><td>Limit theorems</td><td>Behavior of sums, averages, and large samples</td><td>Asymptotic behavior of sequences; explains stabilization and normal approximations</td></tr>
<tr><td><a href='./Stochastic-processes/Readme.md'>Stochastic processes</a></td><td>Stochastic processes</td><td>Probabilities indexed by time or space</td><td>Families of random variables indexed by time or space; extends to evolving systems</td></tr>
<tr><td><a href='./Statistical-inference/Readme.md'>Statistical inference</a></td><td>Statistical inference</td><td>Estimating parameters, testing hypotheses, updating beliefs</td><td>Reverse direction: uses random variables as data to infer models or latent states</td></tr>
</table>

<iframe src="./Probability.simulation.html" title="Interactive demo: law of large numbers and Bayes' theorem"></iframe>
