# Conditional probability

Conditional probability quantifies how beliefs about events change when partial information is observed. It is the central operation in Bayesian updating, independence modeling, and the construction of conditional measures on refined information. It is relevant whenever a probability must be refined given a condition: medical diagnosis, spam filtering, reliability engineering, and probabilistic graphical models.

> **Authoritative sources**
> - [A. N. Kolmogorov, Foundations of the Theory of Probability (1933)](https://en.wikipedia.org/wiki/Foundations_of_the_Theory_of_Probability)
> - [D. Williams, Probability with Martingales (1991), Ch. 1](https://en.wikipedia.org/wiki/Probability_with_Martingales)

## Definition

For events $`A` and $`B` with $`P(B) > 0`:

```math
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
```

The intuition: restrict the sample space to the outcomes in $`B` (the condition is known to hold), then renormalize so that the total probability on $`B` is 1. The event $`A` is now measured relative to the smaller world where $`B` has occurred.

<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;">
  <rect width="400" height="260" fill="#f9f9f9" stroke="#ccc"/>
  <text x="200" y="18" text-anchor="middle" font-size="13" fill="#333">Sample space Ω</text>
  <circle cx="170" cy="140" r="90" fill="rgba(70,130,180,0.25)" stroke="#4682B4" stroke-width="2"/>
  <text x="130" y="80" font-size="14" fill="#4682B4" font-weight="bold">B</text>
  <circle cx="250" cy="140" r="90" fill="rgba(220,100,50,0.2)" stroke="#DC6434" stroke-width="2"/>
  <text x="290" y="80" font-size="14" fill="#DC6434" font-weight="bold">A</text>
  <path d="M 210 65 A 90 90 0 0 1 210 215 A 90 90 0 0 1 210 65" fill="rgba(180,50,50,0.35)" stroke="none"/>
  <text x="210" y="145" text-anchor="middle" font-size="12" fill="#8B0000" font-weight="bold">A∩B</text>
  <text x="200" y="248" text-anchor="middle" font-size="11" fill="#555">P(A|B) = P(A∩B) / P(B): the red region as a fraction of the blue region</text>
</svg>

<details><summary>Details</summary>

**Step 1: The restriction idea.**

Suppose you draw a card from a standard 52-card deck. Let $`A` = "the card is a King" and $`B` = "the card is a heart". Without any information, $`P(A) = 4/52 = 1/13`. Now you are told the card is a heart. The sample space shrinks to the 13 hearts. Among those, exactly one is a King, so $`P(A \mid B) = 1/13`.

Formally: $`P(A \cap B) = 1/52` (the King of hearts), $`P(B) = 13/52 = 1/4`, and indeed $`P(A \mid B) = (1/52)/(1/4) = 1/13`.

**Step 2: Renormalization.**

The division by $`P(B)` is a renormalization. Before conditioning, the 13 hearts carry total mass $`13/52`. After conditioning, they must carry total mass 1, so every probability inside $`B` is scaled up by $`1/P(B) = 4`.

**Step 3: When $`P(B) = 0`.**

The formula breaks down when $`P(B) = 0` (e.g. "the temperature is exactly 23.456 °C"). The remedy is the *regular conditional probability*, developed in the last section of this page. There, one replaces the quotient by a limit or by a measure-theoretic construction (Radon–Nikodým derivative).

**Example problem.**

<details><summary>Problem</summary>

A bag contains 3 red and 2 blue balls. You draw two balls without replacement. Let $`A` = "the second ball is red" and $`B` = "the first ball is red". Compute $`P(A \mid B)`.

<details><summary>Solution</summary>

After drawing a red ball first, the bag has 2 red and 2 blue. So $`P(A \mid B) = 2/4 = 1/2`.

Check with the formula: $`P(A \cap B) = (3/5)(2/4) = 3/10`, $`P(B) = 3/5`, so $`P(A \mid B) = (3/10)/(3/5) = 1/2`. ✓

</details>

</details>

</details>

## Independence

Events $`A` and $`B` are **independent** iff $`P(A \cap B) = P(A)\,P(B)`.

Random variables $`X` and $`Y` are independent iff their joint distribution factors: $`P(X \in A,\, Y \in B) = P(X \in A)\, P(Y \in B)` for all measurable sets $`A, B`.

Mutual independence of $`X_1, \ldots, X_n` requires the joint to factor for every subset: $`P(X_{i_1} \in A_1, \ldots, X_{i_k} \in A_k) = \prod_j P(X_{i_j} \in A_j)`.

<details><summary>Details</summary>

**Step 1: Independence as a structural property.**

Independence is a statement about the joint measure, not about moments. Two variables can have zero covariance yet be strongly dependent.

**Worked example.** Let $`X \sim \text{Unif}[0, 2\pi]` and $`Y = \sin(X)`. Then:

- $`\mathbb{E}[X] = \pi`, $`\mathbb{E}[Y] = 0`.
- $`\mathbb{E}[XY] = \mathbb{E}[X \sin X] = \int_0^{2\pi} x \sin x \, \frac{dx}{2\pi} = 0` (by symmetry: the integrand is odd about $`\pi`).
- So $`\operatorname{Cov}(X, Y) = 0 - \pi \cdot 0 = 0`.

Yet $`Y` is a deterministic function of $`X`, so knowing $`X` determines $`Y` exactly. The variables are maximally dependent despite zero covariance.

<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style="max-width:360px;">
  <rect width="360" height="200" fill="#fafafa" stroke="#ccc"/>
  <text x="180" y="16" text-anchor="middle" font-size="12" fill="#333">Y = sin(X) for X ∈ [0, 2π]</text>
  <line x1="40" y1="100" x2="340" y2="100" stroke="#999" stroke-width="1"/>
  <line x1="40" y1="30" x2="40" y2="170" stroke="#999" stroke-width="1"/>
  <path d="M 40 100 Q 95 30 140 100 Q 185 170 230 100 Q 275 30 320 100" fill="none" stroke="#4682B4" stroke-width="2"/>
  <text x="340" y="115" font-size="10" fill="#555">X</text>
  <text x="30" y="35" font-size="10" fill="#555">Y</text>
  <text x="180" y="192" text-anchor="middle" font-size="10" fill="#555">Cov(X, sin X) = 0, yet Y is determined by X</text>
</svg>

**Step 2: Conditional independence.**

$`X \perp\!\!\perp Y \mid Z` means $`P(X \in A, Y \in B \mid Z) = P(X \in A \mid Z)\, P(Y \in B \mid Z)` almost surely. This is the key relation in Bayesian networks and hidden Markov models (see [Stochastic processes](./Stochastic-processes/Readme.md)).

**Step 3: Mutual vs. pairwise independence.**

Pairwise independence (every pair is independent) does not imply mutual independence. Classic counterexample: let $`X_1, X_2` be independent Rademacher (±1 with equal probability) and set $`X_3 = X_1 X_2`. Then every pair is independent, but $`X_1 X_2 X_3 = 1` always, so the triple is not mutually independent.

**Example problem.**

<details><summary>Problem</summary>

Two fair coins are flipped. Let $`A` = "at least one head", $`B` = "the first coin is heads". Are $`A` and $`B` independent?

<details><summary>Solution</summary>

$`P(A) = 3/4`, $`P(B) = 1/2`, $`P(A \cap B) = P(\text{first is H}) = 1/2` (since if the first is H, A is automatically satisfied).

Check: $`P(A)\,P(B) = (3/4)(1/2) = 3/8 \neq 1/2 = P(A \cap B)`. Not independent. ✓

</details>

</details>

</details>

## Bayes' theorem

For events $`A` and $`B` with $`P(B) > 0`, the **law of total probability** states that for any partition $`\{A_i\}` of the sample space:

```math
P(B) = \sum_i P(B \mid A_i)\, P(A_i)
```

Substituting this into the definition gives **Bayes' theorem**:

```math
P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)} = \frac{P(B \mid A)\, P(A)}{\sum_i P(B \mid A_i)\, P(A_i)}
```

This is a pure algebraic identity: it inverts the direction of conditioning. In the continuous case, densities replace probabilities:

```math
f_{X \mid Y}(x \mid y) = \frac{f_{Y \mid X}(y \mid x)\, f_X(x)}{f_Y(y)}
```

The full Bayesian framework—priors, likelihoods, posteriors, conjugate families, MCMC—is developed in [Bayesian inference](./Statistical-inference/Bayesian-inference.md).

<iframe src="./Conditional-probability.simulation.html" title="Interactive Bayes' theorem: sliders for prior, sensitivity, and false-positive rate with a probability tree"></iframe>

<details><summary>Details</summary>

**Step 1: The algebraic inversion.**

Bayes' theorem converts $`P(B \mid A)` (how the data looks given a hypothesis) into $`P(A \mid B)` (how plausible the hypothesis is given the data). The numerator is the joint $`P(A \cap B) = P(B \mid A)\,P(A) = P(A \mid B)\,P(B)`, and the theorem simply solves for $`P(A \mid B)`.

**Step 2: The base-rate fallacy.**

A common error is to ignore the prior $`P(A)` and treat the likelihood $`P(B \mid A)` as the posterior. When the prior is very small, the posterior can be far smaller than the likelihood suggests. The interactive simulation above makes this tangible: set the prior to 0.001 and the sensitivity to 0.99, and watch the posterior stay near 2% even with a 99% sensitive test.

**Step 3: The law of total probability as a partition identity.**

The denominator $`P(B) = \sum_i P(B \mid A_i)\,P(A_i)` is not a separate theorem; it is the definition of $`P(B)` expanded over a partition. For a binary partition $`\{A, A^c\}`: $`P(B) = P(B \mid A)\,P(A) + P(B \mid A^c)\,P(A^c)`.

**Worked example (disease screening).**

A disease affects 1 in 10 000 people. A test has sensitivity 99% and specificity 99.5%. A patient tests positive. What is the probability the patient actually has the disease?

Let $`D` = has disease, $`T` = tests positive.

- Prior: $`P(D) = 10^{-4}`
- Sensitivity: $`P(T \mid D) = 0.99`
- False-positive rate: $`P(T \mid D^c) = 0.005`

```math
P(D \mid T) = \frac{P(T \mid D)\,P(D)}{P(T \mid D)\,P(D) + P(T \mid D^c)\,P(D^c)}
```

```math
= \frac{0.99 \times 10^{-4}}{0.99 \times 10^{-4} + 0.005 \times 0.9999} \approx \frac{9.9 \times 10^{-5}}{9.9 \times 10^{-5} + 4.9995 \times 10^{-3}} \approx 0.0194
```

Despite a positive test, the probability of disease is only about 2%. The low prior (base rate) dominates.

<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;">
  <rect width="520" height="320" fill="#fafafa" stroke="#ccc"/>
  <text x="260" y="20" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Probability tree: 10 000-person population</text>
  <circle cx="60" cy="160" r="18" fill="#4682B4"/>
  <text x="60" y="164" text-anchor="middle" font-size="10" fill="white">10 000</text>
  <line x1="78" y1="150" x2="180" y2="90" stroke="#333" stroke-width="1.5"/>
  <text x="115" y="112" font-size="10" fill="#555">P(D)=0.0001</text>
  <circle cx="195" cy="85" r="16" fill="#DC6434"/>
  <text x="195" y="89" text-anchor="middle" font-size="9" fill="white">10</text>
  <line x1="78" y1="170" x2="180" y2="230" stroke="#333" stroke-width="1.5"/>
  <text x="110" y="210" font-size="10" fill="#555">P(D^c)=0.9999</text>
  <circle cx="195" cy="235" r="16" fill="#6B8E23"/>
  <text x="195" y="239" text-anchor="middle" font-size="9" fill="white">9 990</text>
  <line x1="211" y1="78" x2="310" y2="55" stroke="#333" stroke-width="1.5"/>
  <text x="250" y="58" font-size="10" fill="#555">P(T|D)=0.99</text>
  <circle cx="325" cy="52" r="14" fill="#B22222"/>
  <text x="325" y="56" text-anchor="middle" font-size="9" fill="white">≈9.9</text>
  <line x1="211" y1="92" x2="310" y2="110" stroke="#333" stroke-width="1.5"/>
  <text x="250" y="108" font-size="10" fill="#555">P(T^c|D)=0.01</text>
  <circle cx="325" cy="113" r="14" fill="#999"/>
  <text x="325" y="117" text-anchor="middle" font-size="9" fill="white">≈0.1</text>
  <line x1="211" y1="228" x2="310" y2="195" stroke="#333" stroke-width="1.5"/>
  <text x="245" y="200" font-size="10" fill="#555">P(T|D^c)=0.005</text>
  <circle cx="325" cy="192" r="14" fill="#B22222"/>
  <text x="325" y="196" text-anchor="middle" font-size="9" fill="white">≈49.95</text>
  <line x1="211" y1="242" x2="310" y2="270" stroke="#333" stroke-width="1.5"/>
  <text x="245" y="268" font-size="10" fill="#555">P(T^c|D^c)=0.995</text>
  <circle cx="325" cy="273" r="14" fill="#999"/>
  <text x="325" y="277" text-anchor="middle" font-size="9" fill="white">≈9 940</text>
  <rect x="350" y="35" width="160" height="170" fill="rgba(178,34,34,0.08)" stroke="#B22222" stroke-width="1.5" rx="5"/>
  <text x="430" y="55" text-anchor="middle" font-size="11" font-weight="bold" fill="#B22222">Positive tests:</text>
  <text x="430" y="75" text-anchor="middle" font-size="11" fill="#333">≈ 9.9 + 49.95 ≈ 59.85</text>
  <text x="430" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#B22222">P(D|T) ≈ 9.9/59.85</text>
  <text x="430" y="120" text-anchor="middle" font-size="13" font-weight="bold" fill="#B22222">≈ 0.0194 ≈ 2%</text>
  <text x="430" y="145" text-anchor="middle" font-size="10" fill="#555">Only ~2% of positive</text>
  <text x="430" y="158" text-anchor="middle" font-size="10" fill="#555">tests are true positives</text>
</svg>

**Example problem.**

<details><summary>Problem</summary>

A factory has two machines: Machine A produces 60% of widgets and has a 2% defect rate. Machine B produces 40% of widgets and has a 5% defect rate. A widget is found to be defective. What is the probability it came from Machine A?

<details><summary>Solution</summary>

Let $`A` = from Machine A, $`D` = defective.

$`P(A) = 0.6`, $`P(D \mid A) = 0.02`, $`P(D \mid A^c) = 0.05`.

```math
P(A \mid D) = \frac{0.02 \times 0.6}{0.02 \times 0.6 + 0.05 \times 0.4} = \frac{0.012}{0.012 + 0.02} = \frac{0.012}{0.032} = 0.375
```

So there is a 37.5% chance the defective widget came from Machine A, despite Machine A producing most of the output. Machine B's higher defect rate pulls the posterior toward B.

</details>

</details>

</details>

## Chain rule

For a sequence of random variables $`X_1, \ldots, X_n`:

```math
P(X_1, \ldots, X_n) = \prod_{i=1}^{n} P(X_i \mid X_1, \ldots, X_{i-1})
```

This factorization is the basis of autoregressive models, language models, and sequential Monte Carlo (see [Stochastic processes](./Stochastic-processes/Readme.md)).

<details><summary>Details</summary>

**Step 1: Derivation from the definition.**

The chain rule follows by repeated application of $`P(A \mid B) = P(A \cap B)/P(B)`. For three variables:

```math
P(X_1, X_2, X_3) = P(X_1)\, P(X_2 \mid X_1)\, P(X_3 \mid X_1, X_2)
```

Each step peels off one variable by conditioning on all previous ones.

**Step 2: The continuous case.**

For joint densities: $`f(x_1, \ldots, x_n) = \prod_i f(x_i \mid x_1, \ldots, x_{i-1})`. This is the form used in autoregressive models and in the sequential factorization of language models.

**Step 3: Ordering matters for compactness.**

The ordering is arbitrary; different orderings give different factorizations of the same joint. Choosing an ordering that matches the causal or temporal structure of the problem yields the most compact model. For example, in a Markov chain, the temporal ordering gives $`P(x_1, \ldots, x_n) = P(x_1)\prod_i P(x_i \mid x_{i-1})`, a product of $`n` one-step transitions rather than $`n` full-history conditionals.

**Example problem.**

<details><summary>Problem</summary>

A three-letter word is generated by: first letter uniform over {A, B}, second letter is A with probability 0.8 if the first is A, else B with probability 0.7. Third letter is always the same as the second. Write the joint probability of the word "ABA" using the chain rule.

<details><summary>Solution</summary>

```math
P(A, B, A) = P(A)\, P(B \mid A)\, P(A \mid A, B)
```

- $`P(A) = 1/2`
- $`P(B \mid A) = 1 - 0.8 = 0.2`
- $`P(A \mid A, B) = 0` (third letter equals second, which is B, so it cannot be A)

So $`P(A, B, A) = 0`. The word is impossible under this model.

</details>

</details>

</details>

## Regular conditional probability

Given a sigma-algebra $`\mathcal{G} \subseteq \mathcal{F}`, the conditional probability $`P(A \mid \mathcal{G})` is the unique (a.s.) $`\mathcal{G}`-measurable random variable satisfying

```math
\int_B P(A \mid \mathcal{G})\, dP = P(A \cap B) \quad \forall B \in \mathcal{G}
```

This is the "integral version" of the elementary definition: just as $`P(A \mid B) = P(A \cap B)/P(B)` is the unique number on $`B` whose average (weighted by $`P`) reproduces $`P(A \cap B)`, the random variable $`P(A \mid \mathcal{G})` is the unique $`\mathcal{G}`-measurable function whose integral over every $`B \in \mathcal{G}` reproduces $`P(A \cap B)`. The same construction, with $`P` replaced by the integral of a random variable $`X`, gives the conditional expectation $`\mathbb{E}[X \mid \mathcal{G}]` (see [Random variables and expectation](./Random-variables-and-expectation.md)).

<details><summary>Details</summary>

**Step 1: The discrete case.**

When $`\mathcal{G}` is generated by a discrete random variable $`Y` with values $`y_1, \ldots, y_k`, the regular conditional probability reduces to the familiar formula:

```math
P(A \mid Y = y_i) = \frac{P(A \cap \{Y = y_i\})}{P(Y = y_i)}
```

The random variable $`P(A \mid \mathcal{G})` simply takes the value $`P(A \mid Y = y_i)` on the set $`\{Y = y_i\}`.

**Step 2: The continuous case.**

In the continuous case, a regular conditional probability $`P(A \mid Y = y)` exists as a probability kernel $`y \mapsto P(\cdot \mid Y = y)` under mild conditions (standard Borel spaces). This is the object that makes Bayesian updating rigorous when the observation is continuous. The construction uses the Radon–Nikodým theorem: the measure $`\mu(B) = P(A \cap B)` is absolutely continuous with respect to $`\nu(B) = P(B)` on $`\mathcal{G}`, and the RN derivative is $`P(A \mid \mathcal{G})`.

**Step 3: Connection to conditional expectation.**

The conditional expectation $`\mathbb{E}[X \mid \mathcal{G}]` is defined identically, with $`P(A \cap B)` replaced by $`\int_B X\, dP`. It is the "integral version" of conditional probability: where $`P(A \mid \mathcal{G})` answers "what is the probability of $`A` given the information in $`\mathcal{G}`?", $`\mathbb{E}[X \mid \mathcal{G}]` answers "what is the best $`\mathcal{G}`-measurable guess of $`X`?". See [Random variables and expectation](./Random-variables-and-expectation.md) for the full development.

**Example problem.**

<details><summary>Problem</summary>

Let $`X \sim \text{Unif}[0, 1]` and let $`\mathcal{G} = \sigma(\{X < 1/2\})`. Compute $`P(X > 3/4 \mid \mathcal{G})`.

<details><summary>Solution</summary>

$`\mathcal{G}` has two atoms: $`\{X < 1/2\}` and $`\{X \geq 1/2\}`.

- On $`\{X < 1/2\}`: $`P(X > 3/4 \mid X < 1/2) = 0` (impossible).
- On $`\{X \geq 1/2\}`: $`P(X > 3/4 \mid X \geq 1/2) = P(X > 3/4)/P(X \geq 1/2) = (1/4)/(1/2) = 1/2`.

So $`P(X > 3/4 \mid \mathcal{G}) = 0 \cdot \mathbf{1}_{\{X < 1/2\}} + (1/2) \cdot \mathbf{1}_{\{X \geq 1/2\}}`.

</details>

</details>

</details>

## Quizz

<details><summary>Quizz</summary>

A disease affects 1 in 10 000 people. A test has sensitivity 99% and specificity 99.5%. A patient tests positive. What is the probability the patient actually has the disease?

<details><summary>Solution</summary>

Let $`D` = has disease, $`T` = tests positive.

- Prior: $`P(D) = 10^{-4}`
- Sensitivity: $`P(T \mid D) = 0.99`
- False-positive rate: $`P(T \mid D^c) = 0.005`

By Bayes' theorem:

```math
P(D \mid T) = \frac{P(T \mid D)\,P(D)}{P(T \mid D)\,P(D) + P(T \mid D^c)\,P(D^c)}
```

```math
= \frac{0.99 \times 10^{-4}}{0.99 \times 10^{-4} + 0.005 \times 0.9999} \approx \frac{9.9 \times 10^{-5}}{9.9 \times 10^{-5} + 4.9995 \times 10^{-3}} \approx 0.0194
```

Despite a positive test, the probability of disease is only about 2%. The low prior (base rate) dominates. This is the base-rate fallacy in action.

<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;">
  <rect width="520" height="320" fill="#fafafa" stroke="#ccc"/>
  <text x="260" y="20" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Probability tree: 10 000-person population</text>
  <circle cx="60" cy="160" r="18" fill="#4682B4"/>
  <text x="60" y="164" text-anchor="middle" font-size="10" fill="white">10 000</text>
  <line x1="78" y1="150" x2="180" y2="90" stroke="#333" stroke-width="1.5"/>
  <text x="115" y="112" font-size="10" fill="#555">P(D)=0.0001</text>
  <circle cx="195" cy="85" r="16" fill="#DC6434"/>
  <text x="195" y="89" text-anchor="middle" font-size="9" fill="white">10</text>
  <line x1="78" y1="170" x2="180" y2="230" stroke="#333" stroke-width="1.5"/>
  <text x="110" y="210" font-size="10" fill="#555">P(D^c)=0.9999</text>
  <circle cx="195" cy="235" r="16" fill="#6B8E23"/>
  <text x="195" y="239" text-anchor="middle" font-size="9" fill="white">9 990</text>
  <line x1="211" y1="78" x2="310" y2="55" stroke="#333" stroke-width="1.5"/>
  <text x="250" y="58" font-size="10" fill="#555">P(T|D)=0.99</text>
  <circle cx="325" cy="52" r="14" fill="#B22222"/>
  <text x="325" y="56" text-anchor="middle" font-size="9" fill="white">≈9.9</text>
  <line x1="211" y1="92" x2="310" y2="110" stroke="#333" stroke-width="1.5"/>
  <text x="250" y="108" font-size="10" fill="#555">P(T^c|D)=0.01</text>
  <circle cx="325" cy="113" r="14" fill="#999"/>
  <text x="325" y="117" text-anchor="middle" font-size="9" fill="white">≈0.1</text>
  <line x1="211" y1="228" x2="310" y2="195" stroke="#333" stroke-width="1.5"/>
  <text x="245" y="200" font-size="10" fill="#555">P(T|D^c)=0.005</text>
  <circle cx="325" cy="192" r="14" fill="#B22222"/>
  <text x="325" y="196" text-anchor="middle" font-size="9" fill="white">≈49.95</text>
  <line x1="211" y1="242" x2="310" y2="270" stroke="#333" stroke-width="1.5"/>
  <text x="245" y="268" font-size="10" fill="#555">P(T^c|D^c)=0.995</text>
  <circle cx="325" cy="273" r="14" fill="#999"/>
  <text x="325" y="277" text-anchor="middle" font-size="9" fill="white">≈9 940</text>
  <rect x="350" y="35" width="160" height="170" fill="rgba(178,34,34,0.08)" stroke="#B22222" stroke-width="1.5" rx="5"/>
  <text x="430" y="55" text-anchor="middle" font-size="11" font-weight="bold" fill="#B22222">Positive tests:</text>
  <text x="430" y="75" text-anchor="middle" font-size="11" fill="#333">≈ 9.9 + 49.95 ≈ 59.85</text>
  <text x="430" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#B22222">P(D|T) ≈ 9.9/59.85</text>
  <text x="430" y="120" text-anchor="middle" font-size="13" font-weight="bold" fill="#B22222">≈ 0.0194 ≈ 2%</text>
  <text x="430" y="145" text-anchor="middle" font-size="10" fill="#555">Only ~2% of positive</text>
  <text x="430" y="158" text-anchor="middle" font-size="10" fill="#555">tests are true positives</text>
</svg>

</details>

</details>
