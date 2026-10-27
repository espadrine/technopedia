# Lévy processes

A **Lévy process** is a stochastic process with stationary, independent increments starting at zero: the law of $`X_t - X_s` depends only on $`t - s`, and increments over disjoint intervals are independent. It is the canonical model for random motion that combines smooth drift, diffusion, and sudden jumps — the single framework that unifies [Brownian motion](./Brownian-motion.md), [Poisson processes](./Poisson-processes.md), and everything in between.

**When it is relevant.** Whenever a quantity accumulates by many small, independent contributions over time — a stock price with both continuous noise and discrete crashes, the total claims in an insurance portfolio, the net displacement of a particle in a turbulent medium — a Lévy process is the natural model. Its power is that *one* object, the Lévy–Khintchine triplet, encodes the entire law.

A Lévy process is a continuous-time [Markov process](./Markov-chains.md), and its compensated version is a [martingale](./Martingales.md). It builds on [Random variables and expectation](../Random-variables-and-expectation.md) and [Limit theorems](../Limit-theorems.md).

> **Authoritative sources**
> - [K. Sato, *Lévy Processes and Infinitely Divisible Distributions* (Cambridge University Press, 1999)](https://www.cambridge.org/as/universitypress/subjects/statistics-probability/probability-theory-and-stochastic-processes/levy-processes-and-infinitely-divisible-distributions)
> - [D. Applebaum, *Lévy Processes and Stochastic Calculus* (Cambridge University Press, 2009)](https://www.cambridge.org/core/books/levy-processes-and-stochastic-calculus/4AC698D37D3D8E57D099B73ADF4ACB11)
> - [Lévy process — Wikipedia](https://en.wikipedia.org/wiki/L%C3%A9vy_process)

## Definition (cheatsheet)

- $`X_0 = 0`, increments are stationary (law of $`X_t - X_s` depends only on $`t-s`) and independent over disjoint intervals, and paths are continuous in probability (stochastic continuity).
- Every Lévy process decomposes (Lévy–Itô decomposition) into **drift + Brownian part + jump part**:
  $`X_t = b\,t + \sigma W_t + J_t`, where $`J_t` is a pure-jump process built from a Poisson random measure.
- The law is fully encoded in the **characteristic exponent** (Lévy–Khintchine triplet $`(b, \sigma^2, \nu)`):
  $`\mathbb{E}[e^{i\theta X_t}] = e^{t\,\psi(\theta)}` with
  $`\psi(\theta) = i b \theta - \tfrac{1}{2}\sigma^2\theta^2 + \int_{\mathbb{R}\setminus\{0\}} (e^{i\theta x} - 1 - i\theta x\, h(x))\,\nu(dx)`,
  where $`h(x) = x\,\mathbf{1}_{|x|<1}` is a **truncation function**.
- The **Lévy measure** $`\nu` describes jump intensities: $`\nu(A)` is the expected number of jumps per unit time with sizes in $`A`.

> **A common source of confusion.** The drift parameter $`b` is *not* an absolute number: it depends on the truncation function $`h` you choose. Changing $`h` (for instance to $`h(x) = x\,\mathbf{1}_{|x|\le 1}` or $`h(x) = x/(1+x^2)`) shifts $`b` by a compensating constant so that the triplet always describes the *same* process. Only the combination of $`b` and $`\nu` is invariant, not $`b` alone.

## The Lévy–Khintchine triplet

**Definition.** A Lévy process is completely determined by its **triplet** $`(b, \sigma^2, \nu)`: a real drift $`b`, a diffusion coefficient $`\sigma^2 \ge 0`, and a Lévy measure $`\nu` (a measure on $`\mathbb{R}\setminus\{0\}` with $`\int (1 \wedge x^2)\,\nu(dx) < \infty`). The characteristic exponent is

$`\psi(\theta) = i b \theta - \tfrac{1}{2}\sigma^2\theta^2 + \int_{\mathbb{R}\setminus\{0\}} (e^{i\theta x} - 1 - i\theta x\, h(x))\,\nu(dx)`.

<details><summary>Details</summary>

The whole theory hangs on one fact: **stationary independent increments**.

1. **One increment is the whole process.** Stationary independent increments mean you only ever need to know the law of one increment, say $`X_1`; the rest follows by convolution. The characteristic function turns convolution into multiplication, so $`\mathbb{E}[e^{i\theta X_t}] = e^{t\psi(\theta)}`: the whole process is one function $`\psi`.
2. **The Lévy–Khintchine theorem** says every such $`\psi` has exactly the triplet form above: a linear drift term $`b`, a Gaussian term $`\sigma^2`, and an integral against the Lévy measure $`\nu` for jumps. Conversely, any choice of $`(b, \sigma^2, \nu)` with $`\int (1 \wedge x^2)\,\nu(dx) < \infty` produces a valid Lévy process.
3. **Finite vs infinite activity.** If $`\nu(\mathbb{R}) < \infty`, there are finitely many jumps per unit time (a compound Poisson part). If $`\nu(\mathbb{R}) = \infty` but $`\int_{|x|<1} |x|\,\nu(dx) < \infty`, jumps occur infinitely often but remain summable — the process still has finite variation. Dropping the last condition gives infinite-variation processes, where the "jumps" are so numerous and small that they blur into a continuous-looking drift.
4. **Examples.** The Poisson process has $`\nu = \delta_1` (unit jumps at rate 1); Brownian motion has $`\nu = 0`; the Cauchy process has a heavy-tailed $`\nu` with infinite activity and infinite variation.

The truncation function $`h(x) = x\,\mathbf{1}_{|x|<1}` is what makes the integral converge. For large $`x` the term $`e^{i\theta x} - 1` is harmless, but near $`x = 0` the expansion $`e^{i\theta x} - 1 \approx i\theta x` would make $`\int i\theta x\,\nu(dx)` diverge when there are infinitely many small jumps. Subtracting $`i\theta x\, h(x)` cancels that divergence, and the leftover is absorbed into the drift $`b` — which is precisely why $`b` depends on $`h`.

<details><summary>Example problem</summary>

A compound Poisson process has jump rate $`\lambda = 3` per unit time and jump sizes $`Y` uniformly distributed on $`\{1, 2\}` (so $`P(Y=1) = P(Y=2) = 1/2`). Write down its Lévy–Khintchine triplet and compute $`E[X_t]` and $`\mathrm{Var}(X_t)`.

<details><summary>Solution</summary>

The Lévy measure is $`\nu = \lambda\,(\tfrac{1}{2}\delta_1 + \tfrac{1}{2}\delta_2) = \tfrac{3}{2}\delta_1 + \tfrac{3}{2}\delta_2`, there is no diffusion ($`\sigma^2 = 0`), and with the standard truncation $`h(x) = x\,\mathbf{1}_{|x|<1}` (which vanishes on $`\{1,2\}`) the drift is $`b = 0`. So the triplet is $`(0, 0, \tfrac{3}{2}\delta_1 + \tfrac{3}{2}\delta_2)`.

For a compound Poisson process, $`E[X_t] = \lambda t\, E[Y]` and $`\mathrm{Var}(X_t) = \lambda t\, E[Y^2]`. Here $`E[Y] = \tfrac{3}{2}` and $`E[Y^2] = \tfrac{1}{2}(1) + \tfrac{1}{2}(4) = \tfrac{5}{2}`, so

```math
E[X_t] = 3t \cdot \tfrac{3}{2} = \tfrac{9}{2}\,t, \qquad
\mathrm{Var}(X_t) = 3t \cdot \tfrac{5}{2} = \tfrac{15}{2}\,t.
```

</details>
</details>

</details>

## Sample paths

**Definition.** The **Lévy–Itô decomposition** writes every Lévy process as $`X_t = b\,t + \sigma W_t + J_t`: a deterministic drift, a Brownian part $`\sigma W_t`, and a pure-jump part $`J_t` built from a Poisson random measure. The three terms are independent, and the path you see is their sum.

<details><summary>Details</summary>

Each ingredient has a very different look, and the decomposition is exactly what the four sample paths below show:

- **Drift** $`b\,t` is a straight line — no randomness at all.
- **Brownian part** $`\sigma W_t` is continuous but nowhere differentiable; it wanders with standard deviation $`\sigma\sqrt{t}`.
- **Jump part** $`J_t` is a staircase: flat between jumps, with a vertical step at each jump. If $`\nu(\mathbb{R}) < \infty` the steps are isolated (compound Poisson); if $`\nu(\mathbb{R}) = \infty` the small jumps are so dense that they merge into a continuous-looking contribution.

The four panels below are one realization of each extreme of the family: pure diffusion, a unit-jump Poisson process, a compound Poisson process with random jump sizes, and pure drift.

<svg viewBox="0 0 520 380" width="100%" style="max-width:560px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four Lévy process sample paths: Brownian motion, Poisson process, compound Poisson process, and deterministic drift">
  <text x="50" y="10" font-size="13" fill="#2c5f8a" font-weight="600">Brownian motion (σ &gt; 0, no jumps)</text>
  <line x1="50" y1="78" x2="490" y2="78" stroke="#ccc" stroke-width="1"/>
  <polyline points="50.0,20.9 53.7,16.5 57.3,21.8 61.0,25.2 64.7,27.9 68.3,30.5 72.0,36.5 75.7,32.0 79.3,34.7 83.0,33.5 86.7,32.8 90.3,29.6 94.0,27.2 97.7,28.7 101.3,30.6 105.0,36.2 108.7,34.1 112.3,29.2 116.0,32.8 119.7,37.9 123.3,33.3 127.0,32.6 130.7,29.0 134.3,29.1 138.0,31.0 141.7,31.1 145.3,31.5 149.0,29.5 152.7,27.5 156.3,31.5 160.0,37.8 163.7,34.5 167.3,36.3 171.0,34.9 174.7,32.1 178.3,34.5 182.0,33.9 185.7,36.6 189.3,39.5 193.0,33.7 196.7,31.4 200.3,35.5 204.0,34.8 207.7,35.0 211.3,29.5 215.0,28.3 218.7,17.0 222.3,22.2 226.0,18.4 229.7,16.3 233.3,14.9 237.0,14.0 240.7,15.9 244.3,21.7 248.0,21.6 251.7,16.3 255.3,23.9 259.0,28.9 262.7,29.3 266.3,30.1 270.0,31.9 273.7,38.9 277.3,38.6 281.0,36.8 284.7,27.3 288.3,23.5 292.0,18.9 295.7,21.8 299.3,21.5 303.0,23.0 306.7,18.1 310.3,20.2 314.0,19.7 317.7,20.4 321.3,23.1 325.0,31.6 328.7,26.4 332.3,24.7 336.0,31.8 339.7,33.1 343.3,36.7 347.0,36.8 350.7,35.9 354.3,37.4 358.0,33.7 361.7,31.3 365.3,33.5 369.0,36.5 372.7,37.2 376.3,39.8 380.0,38.5 383.7,38.4 387.3,36.9 391.0,34.9 394.7,31.8 398.3,38.3 402.0,38.2 405.7,35.7 409.3,41.2 413.0,43.1 416.7,48.9 420.3,52.9 424.0,50.3 427.7,52.5 431.3,54.5 435.0,54.8 438.7,55.7 442.3,57.3 446.0,63.6 449.7,68.0 453.3,72.7 457.0,76.3 460.7,77.4 464.3,76.6 468.0,77.9 471.7,75.4 475.3,77.0 479.0,76.0 482.7,78.0 486.3,72.7 490.0,69.1" fill="none" stroke="#2c5f8a" stroke-width="1.8"/>
  <text x="50" y="100" font-size="13" fill="#d32f2f" font-weight="600">Poisson process (ν = δ₁)</text>
  <line x1="50" y1="168" x2="490" y2="168" stroke="#ccc" stroke-width="1"/>
  <polyline points="50.0,168.0 109.9,168.0 109.9,161.6 261.9,161.6 261.9,155.2 267.9,155.2 267.9,148.8 269.6,148.8 269.6,142.4 291.1,142.4 291.1,136.0 300.6,136.0 300.6,129.6 319.8,129.6 319.8,123.2 325.2,123.2 325.2,116.8 413.2,116.8 413.2,110.4 432.3,110.4 432.3,104.0 490.0,104.0" fill="none" stroke="#d32f2f" stroke-width="2"/>
  <text x="50" y="190" font-size="13" fill="#00838f" font-weight="600">Compound Poisson (finite activity, random sizes)</text>
  <line x1="50" y1="258" x2="490" y2="258" stroke="#ccc" stroke-width="1"/>
  <polyline points="50.0,194.0 76.0,194.0 76.0,175.4 91.3,175.4 91.3,188.6 94.6,188.6 94.6,158.1 149.8,158.1 149.8,127.7 188.2,127.7 188.2,100.5 293.4,100.5 293.4,123.0 309.3,123.0 309.3,154.3 450.0,154.3 450.0,128.2 490.0,128.2" fill="none" stroke="#00838f" stroke-width="2"/>
  <text x="50" y="280" font-size="13" fill="#616161" font-weight="600">Deterministic drift (b t)</text>
  <line x1="50" y1="348" x2="490" y2="348" stroke="#ccc" stroke-width="1"/>
  <line x1="50" y1="348" x2="490" y2="284" stroke="#616161" stroke-width="2"/>
  <text x="270" y="372" text-anchor="middle" font-size="12" fill="#666">time t</text>
</svg>

The interactive simulation below lets you turn each ingredient on and off and watch the resulting path.
<iframe src="./Levy-processes.simulation.html" title="Interactive Lévy process: toggle drift, diffusion, and jump rate and watch the resulting path" style="width:100%;height:520px;border:1px solid #ccc;border-radius:4px;"></iframe>
<iframe src="./Levy-processes.simulation.html" title="Interactive Lévy process: toggle drift, diffusion, and jump rate and watch the resulting path" style="width:100%;height:460px;border:1px solid #ccc;border-radius:4px;"></iframe>

<details><summary>Example problem</summary>

A process has triplet $`(b, \sigma^2, \nu) = (1, 4, 2\,\delta_{0.5})`. Describe its path and compute $`E[X_t]` and $`\mathrm{Var}(X_t)`.

<details><summary>Solution</summary>

The path is a drift of slope $`1`, plus a Brownian motion with variance parameter $`\sigma^2 = 4` (so $`\sigma = 2`), plus a compound Poisson process of rate $`2` with all jumps equal to $`0.5`.

For the drift, $`E = t` and $`\mathrm{Var} = 0`. For the Brownian part, $`E = 0` and $`\mathrm{Var} = \sigma^2 t = 4t`. For the compound Poisson part with jump size $`c = 0.5` and rate $`\lambda = 2`: $`E = \lambda t\, c = 2t \cdot 0.5 = t`, and $`\mathrm{Var} = \lambda t\, c^2 = 2t \cdot 0.25 = 0.5\,t`. The three parts are independent, so expectations add and variances add:

```math
E[X_t] = t + 0 + t = 2t, \qquad \mathrm{Var}(X_t) = 0 + 4t + 0.5\,t = 4.5\,t.
```

</details>
</details>

</details>

## Members of the family

<table>
<tr><th>Page</th><th>Drift</th><th>Diffusion</th><th>Jumps</th></tr>
<tr><td>Deterministic drift</td><td>yes</td><td>no</td><td>no</td></tr>
<tr><td><a href="./Brownian-motion.md">Brownian motion</a></td><td>optional</td><td>yes</td><td>no</td></tr>
<tr><td><a href="./Poisson-processes.md">Poisson process</a></td><td>optional</td><td>no</td><td>unit jumps</td></tr>
<tr><td>Compound Poisson process</td><td>optional</td><td>no</td><td>finite activity, arbitrary sizes</td></tr>
<tr><td>Variance-gamma process</td><td>optional</td><td>optional</td><td>infinite activity</td></tr>
<tr><td>CGMY process</td><td>optional</td><td>no</td><td>infinite activity, no diffusion</td></tr>
<tr><td>Stable process</td><td>optional</td><td>optional</td><td>infinite activity, self-similar</td></tr>
</table>

The first three rows are the building blocks; the last three are infinite-activity processes whose small jumps are too numerous to count individually. The **stable processes** are the self-similar members of the family, which ties into the [Subordinators](#subordinators) section below.

## Subordinators

**Definition.** A **subordinator** is a non-decreasing Lévy process — a Lévy process with only positive jumps and no Brownian part, so its triplet is $`(b, 0, \nu)` with $`\nu` supported on $`(0, \infty)`. It is a "random clock": a non-negative process $`(T_t)` that can be used to reparameterize (subordinate) another process.

<details><summary>Details</summary>

A subordinator is what you get when you strip a Lévy process down to its jump part and forbid negative jumps. Because it only moves upward, it can be read as a *time change*: given any process $`(Y_s)`, the composition $`Y_{T_t}` is called the **subordination** of $`Y` by $`T`.

The simplest subordinator is a Poisson process (unit positive jumps). A **stable subordinator** of index $`\alpha \in (0,1)` has Lévy measure $`\nu(dx) = c\, x^{-1-\alpha}\,dx` on $`(0,\infty)` and is self-similar: $`T_{ct} \stackrel{d}{=} c^{1/\alpha} T_t`. Subordinators are the bridge between the Lévy family and the self-similarity theme: a stable process is a Lévy process that is self-similar, and a stable subordinator is the time-change that produces it.

**Example.** Let $`(N_t)` be a Poisson process of rate $`\lambda` and $`(W_s)` a standard Brownian motion, independent. The subordinated process $`W_{N_t}` is a Lévy process: it is a compound Poisson process whose jumps are the Brownian increments between successive Poisson arrivals.

<details><summary>Example problem</summary>

Is $`T_t = 2t + N_t` (where $`(N_t)` is a rate-1 Poisson process) a subordinator? If so, write its triplet.

<details><summary>Solution</summary>

Yes. It is non-decreasing (the drift $`2t` and the counting process $`N_t` both only increase), it has stationary independent increments, and it starts at $`0`. Its triplet is $`(b, \sigma^2, \nu) = (2, 0, \delta_1)`: drift $`b = 2`, no diffusion, and unit jumps at rate $`1`.

</details>
</details>

</details>

## Applications

- **Finance**: jump-diffusion models (Merton, Kou) for asset prices with crashes.
- **Queues and insurance**: compound Poisson processes model claim arrivals and aggregate claims (Cramér–Lundberg risk model).
- **Physics**: anomalous diffusion, where a heavy-tailed $`\nu` produces superdiffusion.
- **Time changes**: subordinators reparameterize other processes, linking the Lévy family to self-similar (stable) processes.

## Related pages

- [Brownian motion](./Brownian-motion.md) — the continuous, purely diffusive Lévy process.
- [Poisson processes](./Poisson-processes.md) — the pure-jump building block.
- [Martingales](./Martingales.md) — compensated Lévy processes are martingales.
- Parent topic: [Stochastic processes](./Readme.md).

## Quizz

<details><summary>Try it yourself</summary>

A Lévy process has characteristic exponent

$`\psi(\theta) = i\,\theta - \tfrac{1}{2}\,\theta^2 + \int_{\mathbb{R}\setminus\{0\}} (e^{i\theta x} - 1 - i\theta x\,\mathbf{1}_{|x|<1})\,\tfrac{1}{2}\delta_{3}(dx)`.

1. Read off the triplet $`(b, \sigma^2, \nu)`.
2. Is the jump part finite- or infinite-activity?
3. Compute $`E[X_1]` and $`\mathrm{Var}(X_1)`.

<details><summary>Solution</summary>

**1.** Comparing with $`\psi(\theta) = i b \theta - \tfrac{1}{2}\sigma^2\theta^2 + \int (e^{i\theta x} - 1 - i\theta x\, h(x))\,\nu(dx)` with $`h(x) = x\,\mathbf{1}_{|x|<1}`: the drift is $`b = 1`, the diffusion is $`\sigma^2 = 1`, and the Lévy measure is $`\nu = \tfrac{1}{2}\delta_3`.

**2.** $`\nu(\mathbb{R}) = \tfrac{1}{2} < \infty`, so the jump part is **finite-activity** (a compound Poisson process of rate $`\tfrac{1}{2}` with jumps of size $`3`).

**3.** The three parts are independent. Drift: $`E = 1` and $`\mathrm{Var} = 0`. Brownian ($`\sigma^2 = 1`): $`E = 0` and $`\mathrm{Var} = 1`. Compound Poisson (rate $`\lambda = \tfrac{1}{2}`, jump $`c = 3`): $`E = \lambda c = \tfrac{1}{2}\cdot 3 = \tfrac{3}{2}` and $`\mathrm{Var} = \lambda c^2 = \tfrac{1}{2}\cdot 9 = \tfrac{9}{2}`. Adding:

```math
E[X_1] = 1 + 0 + \tfrac{3}{2} = \tfrac{5}{2}, \qquad
\mathrm{Var}(X_1) = 0 + 1 + \tfrac{9}{2} = \tfrac{11}{2}.
```

</details>
</details>

