# Poisson processes

A Poisson process is the canonical model for events that occur **continuously and independently at a constant average rate** $`\lambda`. It is a counting process $`(N_t)_{t \geq 0}` with three defining properties:

- $`N_0 = 0` (no events at the start),
- **stationary increments**: the number of events in an interval depends only on its length, not on where the interval sits,
- **independent increments**: the counts in disjoint time intervals are mutually independent.

Together these force $`N_t \sim \mathrm{Poisson}(\lambda t)` for every $`t`, and make the time between consecutive events an exponential random variable. The one-step law $`N_t \sim \mathrm{Poisson}(\lambda t)` — the Poisson distribution, its PGF, and the Poisson limit theorem — is covered in [Atomic distributions](../Distributions/Atomic-distributions.md); this page is about the **process**: how the counts accumulate over time and how new Poisson processes are built from old ones.

**Key objects:** arrival times, inter-arrival (exponential) distributions, thinning, superposition, compound Poisson processes.

Builds on [Random variables and expectation](../Random-variables-and-expectation.md) and [Conditional probability](../Conditional-probability.md). The Poisson process is the pure-jump member of the [Lévy processes](./Levy-processes.md) family, its compensated version $`N_t - \lambda t` is a [martingale](./Martingales.md), and it sits alongside [Brownian motion](./Brownian-motion.md) as one of the two canonical continuous-time processes.

> **Authoritative sources**
> - [S. Ross, Introduction to Probability Models (11th ed., 2019)](https://www.elsevier.com/books/introduction-to-probability-models/sheldon-ross/978-0-12-803167-3)
> - [R. D. Durrett, Probability: Theory and Examples (4th ed., 2019)](https://sites.math.duke.edu/~rtd/PTE/pte.html)
> - [I. Karatzas & S. Shreve, Brownian Motion and Stochastic Processes (2nd ed., 1991)](https://www.springer.com/gp/book/9780387974027)

The sections below build on each other in a fixed order: we pin down the process from its increments (**Definition**), read off the time between consecutive events (**Inter-arrival times**), then the time of the $`n`-th event (**Arrival times**), and finally the operations that build new Poisson processes from old ones (**Thinning**, **Superposition**, **Compound Poisson**).

<iframe src="./Poisson-processes.simulation.html" title="Interactive Poisson process: tune the rate and watch the arrival staircase and inter-arrival gaps" style="width:100%;height:440px;border:1px solid #ccc;border-radius:4px;"></iframe>

## Definition & characterization

A **Poisson process** with rate $`\lambda > 0` is a counting process $`(N_t)_{t \geq 0}` such that $`N_0 = 0`, the increments $`N_{t+s} - N_t` are mutually independent for disjoint intervals, and $`N_{t+s} - N_t \sim \mathrm{Poisson}(\lambda s)` for all $`t, s \geq 0`. Equivalently, $`N_t \sim \mathrm{Poisson}(\lambda t)` and the process has stationary independent increments, so it is a Lévy process.

<details><summary>Details</summary>

A **counting process** is a non-decreasing, integer-valued process that jumps by exactly $`1` at each event; $`N_t` is the number of events that have occurred by time $`t`. The two increment axioms are the heart of the definition:

1. **Stationary increments** say the law of the count in an interval depends only on its length $`s`, not on its starting point $`t`. A process with this property is "time-homogeneous": the world looks the same no matter when you start watching.
2. **Independent increments** say that what happens in one interval tells you nothing about what happens in a disjoint interval. This is the "memoryless in time" property that makes the process tractable.

The rate $`\lambda` is defined by the mean count per unit time: $`E[N_t] = \lambda t`. From the two axioms one can show that the count in any interval of length $`s` must be Poisson with mean $`\lambda s` — this is essentially the Poisson limit theorem applied to a fine partition of the interval (split it into $`n` tiny sub-intervals, each contributing a rare Bernoulli event, and let $`n \to \infty`). So the increment law is not an extra assumption; it is forced by stationarity, independence, and the mean.

**Example.** Take $`\lambda = 2` events per hour. The number of events in the first hour is $`N_1 \sim \mathrm{Poisson}(2)`, so

```math
P(N_1 = 3) = e^{-2}\,\frac{2^3}{3!} = \frac{8}{6}\,e^{-2} \approx 0.180.
```

Because of stationarity, the same number $`0.180` is the probability of exactly $`3` events in *any* one-hour window, and because of independence, the count in the first hour is independent of the count in the second.

<svg viewBox="0 0 500 260" width="100%" style="max-width:520px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Staircase of a Poisson counting process N_t">
  <line x1="40" y1="220" x2="465" y2="220" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="220" x2="40" y2="30" stroke="#333" stroke-width="1.5"/>
  <path d="M40,220 L90.4,220 L90.4,190 L157.6,190 L157.6,160 L187,160 L187,130 L254.2,130 L254.2,100 L329.8,100 L329.8,70 L392.8,70 L392.8,40 L460,40" fill="none" stroke="#1565c0" stroke-width="2.5"/>
  <circle cx="90.4" cy="190" r="3.5" fill="#d32f2f"/>
  <circle cx="157.6" cy="160" r="3.5" fill="#d32f2f"/>
  <circle cx="187" cy="130" r="3.5" fill="#d32f2f"/>
  <circle cx="254.2" cy="100" r="3.5" fill="#d32f2f"/>
  <circle cx="329.8" cy="70" r="3.5" fill="#d32f2f"/>
  <circle cx="392.8" cy="40" r="3.5" fill="#d32f2f"/>
  <text x="250" y="245" text-anchor="middle" font-size="13" fill="#333">time t</text>
  <text x="14" y="130" text-anchor="middle" font-size="13" fill="#333" transform="rotate(-90 14 130)">N_t</text>
  <text x="460" y="235" text-anchor="end" font-size="11" fill="#666">each red dot is one event; N_t jumps by 1</text>
</svg>

The staircase is the whole process: flat between events, a unit jump at each arrival. The red dots are the arrival times, which the next section quantifies.

See [S. Ross, Introduction to Probability Models, Ch. 4](https://www.elsevier.com/books/introduction-to-probability-models/sheldon-ross/978-0-12-803167-3) for the formal definition and the characterization via increments.

<details><summary>Example problem</summary>

A call center receives calls at rate $`\lambda = 3` per minute. What is the probability that at most $`10` calls arrive in a $`5`-minute interval?

<details><summary>Solution</summary>

Over a $`5`-minute interval the count is $`N_5 \sim \mathrm{Poisson}(5\lambda) = \mathrm{Poisson}(15)`. Therefore

```math
P(N_5 \leq 10) = \sum_{k=0}^{10} e^{-15}\,\frac{15^k}{k!} \approx 0.118.
```

So there is only about an $`11.8\%` chance of $`10` or fewer calls in five minutes — the expected count is $`15`, well above $`10`.

</details>
</details>

</details>

## Inter-arrival times

Let $`X_i = S_i - S_{i-1}` be the time between the $(i-1)$-th and the $i$-th event. The **inter-arrival times** $`(X_i)_{i \geq 1}` are i.i.d. exponential random variables with rate $`\lambda`: $`X_i \sim \mathrm{Exp}(\lambda)`, with density $`f(x) = \lambda e^{-\lambda x}` for $`x \geq 0`, mean $`1/\lambda`, and survival function $`P(X_i > x) = e^{-\lambda x}`.

<details><summary>Details</summary>

The inter-arrival times are where the exponential distribution enters. The key fact is the **memoryless property** of the exponential: for $`s, x \geq 0`,

```math
P(X > s + x \mid X > s) = P(X > x).
```

This is exactly what independent increments demand. Suppose you have already waited $`s` time units with no event. Independent increments say the future is independent of the past, so the *additional* waiting time must have the same distribution as a fresh wait — it cannot depend on how long you have already waited. The exponential is the **only** continuous distribution with this property, which is why the inter-arrivals are exponential and not, say, normal or gamma.

Concretely, the survival function of $`N_t` gives the inter-arrival law directly. No event in $`(0, x]` means $`N_x = 0`, so

```math
P(X_1 > x) = P(N_x = 0) = e^{-\lambda x},
```

which is precisely the survival function of $`\mathrm{Exp}(\lambda)`. Stationarity and independence then make every $`X_i` an independent copy of this.

**Example.** With $`\lambda = 2` per hour, the mean gap between events is $`1/\lambda = 0.5` hours. The probability that you wait more than $`1` hour for the next event is $`P(X_1 > 1) = e^{-2 \cdot 1} \approx 0.135`.

<svg viewBox="0 0 400 220" width="100%" style="max-width:420px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exponential density f(x) = lambda e^{-lambda x} with lambda = 1">
  <line x1="40" y1="190" x2="385" y2="190" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="190" x2="40" y2="30" stroke="#333" stroke-width="1.5"/>
  <path d="M40,40 L82.5,99 L125,134.8 L167.5,156.5 L210,169.7 L252.5,177.7 L295,182.5 L337.5,185.5 L380,187.3" fill="none" stroke="#2e7d32" stroke-width="2.5"/>
  <line x1="125" y1="190" x2="125" y2="134.8" stroke="#d32f2f" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="125" y="205" text-anchor="middle" font-size="12" fill="#d32f2f">mean = 1/λ</text>
  <text x="210" y="215" text-anchor="middle" font-size="13" fill="#333">x</text>
  <text x="14" y="110" text-anchor="middle" font-size="13" fill="#333" transform="rotate(-90 14 110)">f(x)</text>
  <text x="380" y="35" text-anchor="end" font-size="11" fill="#666">f(x) = λ e^{−λx}</text>
</svg>

The density starts at $`\lambda` and decays exponentially; the area to the right of any point is the probability of waiting longer than that point.

See [R. D. Durrett, Probability: Theory and Examples, Ch. 2](https://sites.math.duke.edu/~rtd/PTE/pte.html) for the memoryless characterization of the exponential.

<details><summary>Example problem</summary>

Events arrive at rate $`\lambda = 0.5` per day. You have already waited $`3` days with no event. What is the probability that the next event occurs within the following $`2` days?

<details><summary>Solution</summary>

By the memoryless property, the additional wait $`X` is a fresh $`\mathrm{Exp}(0.5)` regardless of the $`3` days already elapsed. We want $`P(X \leq 2) = 1 - e^{-0.5 \cdot 2} = 1 - e^{-1} \approx 0.632`.

</details>
</details>

</details>

## Arrival times

The time of the $`n`-th event is $`S_n = X_1 + \cdots + X_n`, a sum of $`n` i.i.d. exponentials. The **arrival time** $`S_n` has an **Erlang** (equivalently Gamma) distribution with shape $`n` and rate $`\lambda`: density $`f_{S_n}(t) = \lambda\, e^{-\lambda t}\, (\lambda t)^{n-1}/(n-1)!` for $`t \geq 0`, mean $`E[S_n] = n/\lambda`, variance $`\mathrm{Var}(S_n) = n/\lambda^2`.

<details><summary>Details</summary>

The arrival times are just the partial sums of the inter-arrival times. Since each $`X_i \sim \mathrm{Exp}(\lambda)` and the $`X_i` are independent, $`S_n` is a sum of $`n` i.i.d. exponentials. Such a sum is called an **Erlang** random variable (a special case of the Gamma distribution with integer shape). The convolution of $`n` identical exponential densities produces the Erlang density, which is zero until $`t = 0`, rises to a peak near $`(n-1)/\lambda`, and then decays.

The mean and variance add because the $`X_i` are independent: $`E[S_n] = n \cdot (1/\lambda) = n/\lambda` and $`\mathrm{Var}(S_n) = n \cdot (1/\lambda^2) = n/\lambda^2`. Intuitively, the $`n`-th event arrives after $`n` independent gaps of average length $`1/\lambda`, so on average it lands at $`n/\lambda`; the uncertainty grows only like $`\sqrt{n}` (the standard deviation is $`\sqrt{n}/\lambda`), so for large $`n` the arrival time is tightly concentrated around its mean.

**Example.** With $`\lambda = 2` per hour, the $`3`-rd event has $`S_3 \sim \mathrm{Erlang}(3, 2)` with mean $`3/2 = 1.5` hours and variance $`3/4 = 0.75` hours$`^2`. The density is $`f_{S_3}(t) = 2 e^{-2t}(2t)^2/2! = 4t^2 e^{-2t}`.

<svg viewBox="0 0 400 220" width="100%" style="max-width:420px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Erlang(3, 2) density of the third arrival time">
  <line x1="40" y1="190" x2="385" y2="190" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="190" x2="40" y2="30" stroke="#333" stroke-width="1.5"/>
  <path d="M40,190 L82.5,182 L125,150 L167.5,104 L210,70 L252.5,60 L295,74 L337.5,104 L380,140" fill="none" stroke="#6a1b9a" stroke-width="2.5"/>
  <line x1="167.5" y1="190" x2="167.5" y2="104" stroke="#d32f2f" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="167.5" y="205" text-anchor="middle" font-size="12" fill="#d32f2f">mean = n/λ = 1.5</text>
  <text x="210" y="215" text-anchor="middle" font-size="13" fill="#333">t</text>
  <text x="14" y="110" text-anchor="middle" font-size="13" fill="#333" transform="rotate(-90 14 110)">f(t)</text>
  <text x="380" y="35" text-anchor="end" font-size="11" fill="#666">Erlang(3, 2)</text>
</svg>

Unlike the single exponential (which peaks at $`t=0`), the Erlang density is zero at $`t=0` and peaks at a positive time: you must wait for all $`n` gaps to elapse.

See [I. Karatzas & S. Shreve, Brownian Motion and Stochastic Processes, Ch. 1](https://www.springer.com/gp/book/9780387974027) for the Gamma/Erlang family and its role as the arrival-time law.

<details><summary>Example problem</summary>

A machine produces parts at rate $`\lambda = 4` per hour. What is the expected time until the $`10`-th part is produced, and what is the standard deviation of that time?

<details><summary>Solution</summary>

The $`10`-th part arrives at $`S_{10} \sim \mathrm{Erlang}(10, 4)`. Its mean is $`E[S_{10}] = 10/4 = 2.5` hours, and its variance is $`\mathrm{Var}(S_{10}) = 10/16 = 0.625` hours$`^2`, so the standard deviation is $`\sqrt{0.625} \approx 0.79` hours.

</details>
</details>

</details>

## Thinning

Given a Poisson process $`(N_t)` with rate $`\lambda` and an independent coin of success probability $`p`, keep each event with probability $`p` and discard it with probability $`1-p`. The **thinned** (kept) process $`(N_t^+)` and the discarded process $`(N_t^-)` are independent Poisson processes with rates $`\lambda p` and $`\lambda(1-p)` respectively.

<details><summary>Details</summary>

**Thinning** (or splitting) is the operation of randomly filtering a Poisson stream. Each event is independently tagged "keep" with probability $`p` or "drop" with probability $`1-p`. The remarkable conclusion is that the two resulting streams are not merely Poisson — they are **independent** Poisson processes.

Why independence holds: the original process has independent increments, and the thinning decisions are independent of everything. In any small interval the kept and dropped counts are determined by disjoint, independent coin flips, so the two sub-processes never share randomness. Formally, the joint probability generating function of the kept and dropped counts in an interval of length $`t` factors as

```math
E\big[z^{N_t^+}\, w^{N_t^-}\big] = \exp\big(-\lambda t + \lambda t\, p\, z + \lambda t\,(1-p)\, w\big),
```

which is the product of two independent Poisson PGFs with means $`\lambda p t` and $`\lambda(1-p)t`.

**Example.** Cars pass a point at rate $`\lambda = 10` per minute, and $`30\%` are trucks. Thinning with $`p = 0.3` gives a truck process of rate $`10 \cdot 0.3 = 3` per minute and a non-truck process of rate $`10 \cdot 0.7 = 7` per minute, independent of each other.

<svg viewBox="0 0 500 130" width="100%" style="max-width:520px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Thinning: each arrival is kept (red) or dropped (gray) independently">
  <line x1="30" y1="60" x2="470" y2="60" stroke="#999" stroke-width="1.5"/>
  <circle cx="60" cy="60" r="6" fill="#d32f2f"/>
  <circle cx="110" cy="60" r="6" fill="#bbb"/>
  <circle cx="150" cy="60" r="6" fill="#bbb"/>
  <circle cx="200" cy="60" r="6" fill="#d32f2f"/>
  <circle cx="250" cy="60" r="6" fill="#d32f2f"/>
  <circle cx="300" cy="60" r="6" fill="#bbb"/>
  <circle cx="350" cy="60" r="6" fill="#d32f2f"/>
  <circle cx="400" cy="60" r="6" fill="#bbb"/>
  <circle cx="440" cy="60" r="6" fill="#d32f2f"/>
  <circle cx="40" cy="100" r="6" fill="#d32f2f"/>
  <text x="52" y="104" font-size="12" fill="#333">kept (prob p)</text>
  <circle cx="200" cy="100" r="6" fill="#bbb"/>
  <text x="212" y="104" font-size="12" fill="#333">dropped (prob 1−p)</text>
  <text x="250" y="25" text-anchor="middle" font-size="12" fill="#666">original stream, rate λ</text>
</svg>

The red sub-stream is itself a Poisson process at rate $`\lambda p`, and it is independent of the gray sub-stream.

See [S. Ross, Introduction to Probability Models, Ch. 4](https://www.elsevier.com/books/introduction-to-probability-models/sheldon-ross/978-0-12-803167-3) for the thinning (decomposition) theorem.

<details><summary>Example problem</summary>

Emails arrive at a server at rate $`\lambda = 60` per hour, and $`20\%` are spam. What is the probability that exactly $`2` spam emails arrive in a $`30`-minute window?

<details><summary>Solution</summary>

Thinning with $`p = 0.2` gives a spam process of rate $`60 \cdot 0.2 = 12` per hour, i.e. $`6` per $`30` minutes. The spam count in the window is $`\mathrm{Poisson}(6)`, so

```math
P(\text{exactly 2}) = e^{-6}\,\frac{6^2}{2!} = 18\,e^{-6} \approx 0.025.
```

</details>
</details>

</details>

## Superposition

If $`(N_t^{(1)})` and $`(N_t^{(2)})` are **independent** Poisson processes with rates $`\lambda_1` and $`\lambda_2`, then their sum $`N_t = N_t^{(1)} + N_t^{(2)}` is a Poisson process with rate $`\lambda_1 + \lambda_2`.

<details><summary>Details</summary>

**Superposition** (or aggregation) is the reverse of thinning: merge several independent Poisson streams into one. The merged count in an interval is the sum of the two independent counts in that interval, and the sum of independent Poisson variables is Poisson with the summed means. So in an interval of length $`t`, $`N_t \sim \mathrm{Poisson}(\lambda_1 t + \lambda_2 t) = \mathrm{Poisson}((\lambda_1+\lambda_2)t)`, and the independent-increments property is inherited from the two inputs.

The PGF makes the addition of rates transparent: the PGF of a sum of independent variables is the product of their PGFs, and

```math
e^{-\lambda_1 t}(1-\lambda_1 t + \lambda_1 t z)\cdot e^{-\lambda_2 t}(1-\lambda_2 t + \lambda_2 t z) = e^{-(\lambda_1+\lambda_2)t}\big(1-(\lambda_1+\lambda_2)t + (\lambda_1+\lambda_2)t z\big),
```

the PGF of $`\mathrm{Poisson}((\lambda_1+\lambda_2)t)`. The result extends to any finite number of independent Poisson processes: the merged rate is the sum of the individual rates.

**Example.** Two independent phone lines each get calls at rate $`4` per hour. The combined line sees calls at rate $`4 + 4 = 8` per hour, a Poisson process.

<svg viewBox="0 0 500 170" width="100%" style="max-width:520px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Superposition: two independent Poisson streams merge into one">
  <line x1="30" y1="40" x2="470" y2="40" stroke="#999" stroke-width="1.5"/>
  <circle cx="70" cy="40" r="5.5" fill="#1565c0"/>
  <circle cx="180" cy="40" r="5.5" fill="#1565c0"/>
  <circle cx="300" cy="40" r="5.5" fill="#1565c0"/>
  <circle cx="420" cy="40" r="5.5" fill="#1565c0"/>
  <text x="470" y="30" text-anchor="end" font-size="11" fill="#1565c0">stream 1, rate λ₁</text>
  <line x1="30" y1="85" x2="470" y2="85" stroke="#999" stroke-width="1.5"/>
  <circle cx="120" cy="85" r="5.5" fill="#ef6c00"/>
  <circle cx="240" cy="85" r="5.5" fill="#ef6c00"/>
  <circle cx="360" cy="85" r="5.5" fill="#ef6c00"/>
  <text x="470" y="75" text-anchor="end" font-size="11" fill="#ef6c00">stream 2, rate λ₂</text>
  <line x1="30" y1="135" x2="470" y2="135" stroke="#333" stroke-width="2"/>
  <circle cx="70" cy="135" r="5.5" fill="#1565c0"/>
  <circle cx="120" cy="135" r="5.5" fill="#ef6c00"/>
  <circle cx="180" cy="135" r="5.5" fill="#1565c0"/>
  <circle cx="240" cy="135" r="5.5" fill="#ef6c00"/>
  <circle cx="300" cy="135" r="5.5" fill="#1565c0"/>
  <circle cx="360" cy="135" r="5.5" fill="#ef6c00"/>
  <circle cx="420" cy="135" r="5.5" fill="#1565c0"/>
  <text x="470" y="155" text-anchor="end" font-size="11" fill="#333">merged, rate λ₁ + λ₂</text>
</svg>

The bottom row is the union of the two top rows, ordered in time; it is a single Poisson process at the summed rate.

See [R. D. Durrett, Probability: Theory and Examples, Ch. 2](https://sites.math.duke.edu/~rtd/PTE/pte.html) for the infinite divisibility of the Poisson law that underlies superposition.

<details><summary>Example problem</summary>

A website gets organic traffic at rate $`\lambda_1 = 5` requests/second and paid traffic at rate $`\lambda_2 = 3` requests/second, independently. What is the probability that exactly $`4` total requests arrive in the next $`1` second?

<details><summary>Solution</summary>

By superposition the total is a Poisson process at rate $`5 + 3 = 8` per second, so the count in one second is $`\mathrm{Poisson}(8)`:

```math
P(N_1 = 4) = e^{-8}\,\frac{8^4}{4!} = \frac{4096}{24}\,e^{-8} \approx 0.134.
```

</details>
</details>

</details>

## Compound Poisson process

Let $`(N_t)` be a Poisson process with rate $`\lambda` and let $`Y_1, Y_2, \dots` be i.i.d. random variables (the **jump sizes**), independent of $`(N_t)`. The **compound Poisson process** is $`X_t = \sum_{i=1}^{N_t} Y_i` (with $`X_0 = 0`). It has mean $`E[X_t] = \lambda t\, E[Y_1]` and variance $`\mathrm{Var}(X_t) = \lambda t\, E[Y_1^2]`.

<details><summary>Details</summary>

A plain Poisson process counts events; a **compound Poisson process** adds a random *size* to each event. At each arrival the process jumps by an amount $`Y_i` drawn from the jump-size distribution, so $`X_t` is the total accumulated by time $`t`. This is the workhorse model for aggregate losses (insurance), queue arrivals with batch sizes, and price jumps.

The moments come from conditioning on $`N_t`. Given $`N_t = n`, the sum $`\sum_{i=1}^{n} Y_i` has mean $`n\,E[Y_1]` and variance $`n\,\mathrm{Var}(Y_1)`. Taking expectations over $`N_t \sim \mathrm{Poisson}(\lambda t)` (using $`E[N_t] = \lambda t` and $`E[N_t^2] = \lambda t + (\lambda t)^2`):

```math
E[X_t] = E[Y_1]\,E[N_t] = \lambda t\, E[Y_1],
```

```math
\mathrm{Var}(X_t) = E[Y_1^2]\,E[N_t] = \lambda t\, E[Y_1^2].
```

Notice the variance uses the **second moment** $`E[Y_1^2]`, not the variance of the jump: the randomness of *how many* jumps occur adds an extra $`E[Y_1]^2` term, so $`\mathrm{Var}(X_t) = \lambda t\,\mathrm{Var}(Y_1) + (\lambda t)^2 E[Y_1]^2 = \lambda t\, E[Y_1^2]`.

**Example.** Claims arrive at rate $`\lambda = 4` per month, and each claim size $`Y` is uniformly distributed on $`\{1, 2, 3\}` (in thousands). Then $`E[Y] = 2` and $`E[Y^2] = (1 + 4 + 9)/3 = 14/3`. The monthly aggregate $`X_1` has mean $`4 \cdot 2 = 8` thousand and variance $`4 \cdot 14/3 \approx 18.67` (thousand)$`^2`.

<svg viewBox="0 0 500 240" width="100%" style="max-width:520px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Compound Poisson process: jumps of varying size at each arrival">
  <line x1="40" y1="210" x2="465" y2="210" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="210" x2="40" y2="25" stroke="#333" stroke-width="1.5"/>
  <path d="M40,210 L103,210 L103,190 L187,190 L187,150 L250,150 L250,130 L355,130 L355,70 L439,70 L439,30 L460,30" fill="none" stroke="#00838f" stroke-width="2.5"/>
  <circle cx="103" cy="190" r="3.5" fill="#d32f2f"/>
  <circle cx="187" cy="150" r="3.5" fill="#d32f2f"/>
  <circle cx="250" cy="130" r="3.5" fill="#d32f2f"/>
  <circle cx="355" cy="70" r="3.5" fill="#d32f2f"/>
  <circle cx="439" cy="30" r="3.5" fill="#d32f2f"/>
  <text x="250" y="232" text-anchor="middle" font-size="13" fill="#333">time t</text>
  <text x="14" y="120" text-anchor="middle" font-size="13" fill="#333" transform="rotate(-90 14 120)">X_t</text>
  <text x="460" y="200" text-anchor="end" font-size="11" fill="#666">each jump has a random size Y_i</text>
</svg>

Compare with the plain Poisson staircase: here the vertical jumps have different heights, one per arrival.

See [I. Karatzas & S. Shreve, Brownian Motion and Stochastic Processes, Ch. 1](https://www.springer.com/gp/book/9780387974027) for compound Poisson processes as a component of the Lévy–Itô decomposition.

<details><summary>Example problem</summary>

A bank sees large transactions at rate $`\lambda = 2` per day; each transaction amount $`Y` (in $`\$1000`) has mean $`E[Y] = 5` and second moment $`E[Y^2] = 30`. What are the mean and standard deviation of the daily total $`X_1`?

<details><summary>Solution</summary>

The daily total is a compound Poisson process at $`t = 1`:

```math
E[X_1] = \lambda\, E[Y] = 2 \cdot 5 = 10 \quad (\$1000),
```

```math
\mathrm{Var}(X_1) = \lambda\, E[Y^2] = 2 \cdot 30 = 60,
```

so the standard deviation is $`\sqrt{60} \approx 7.75` (in $`\$1000`).

</details>
</details>

</details>

## How the pieces fit

The whole theory hangs on one fact: **stationary independent increments**. From it, the count $`N_t` is Poisson (Definition), the gaps $`X_i` are exponential (Inter-arrival times), the arrival times $`S_n` are Erlang (Arrival times), and the process is closed under filtering (Thinning) and merging (Superposition). Adding a random size per event gives the Compound Poisson process. The Poisson process is the pure-jump member of the [Lévy processes](./Levy-processes.md) family, and the compensated process $`M_t = N_t - \lambda t` is a [martingale](./Martingales.md) — the continuous-time counterpart is [Brownian motion](./Brownian-motion.md), whose increments are Gaussian rather than Poisson.

## Quizz

<details><summary>Try it yourself</summary>

A hospital's emergency room receives patients from two independent sources: walk-ins at rate $`\lambda_1 = 6` per hour and ambulance arrivals at rate $`\lambda_2 = 2` per hour.

1. What is the rate of the combined arrival process, and what is the probability that exactly $`5` patients arrive in the next $`30` minutes?
2. Of the combined stream, what is the probability that a given patient is a walk-in?
3. What is the expected waiting time (in minutes) until the next patient arrives?

<details><summary>Solution</summary>

**1.** By superposition the combined process is Poisson at rate $`\lambda_1 + \lambda_2 = 8` per hour, i.e. $`4` per $`30` minutes. The count in $`30` minutes is $`\mathrm{Poisson}(4)`, so

```math
P(N = 5) = e^{-4}\,\frac{4^5}{5!} = \frac{1024}{120}\,e^{-4} \approx 0.156.
```

**2.** Thinning the combined stream with $`p = \lambda_1/(\lambda_1+\lambda_2) = 6/8 = 0.75` gives the walk-in sub-process. So a given patient is a walk-in with probability $`0.75`.

**3.** The inter-arrival time of the combined process is $`\mathrm{Exp}(8)` per hour, with mean $`1/8` hour $`= 7.5` minutes.

</details>
</details>
