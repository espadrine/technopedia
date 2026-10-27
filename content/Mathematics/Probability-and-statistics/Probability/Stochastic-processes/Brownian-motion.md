# Brownian motion

Brownian motion (the **Wiener process**) is the canonical continuous-time, continuous-state stochastic process: a random path $`W_t` that starts at zero, moves continuously, and has independent, stationary Gaussian increments $`W_{t+s} - W_s \sim \mathcal{N}(0, s)`. It is the scaling limit of random walks (Donsker's invariance principle) and the building block of stochastic calculus (Itô integration, stochastic differential equations).

**Where it is relevant.**
- **Physical diffusion** — the random trajectory of a pollen grain in a fluid (Einstein 1905); the master equation of Brownian motion is the heat/diffusion equation.
- **Financial modeling** — geometric Brownian motion underlies the Black–Scholes model of asset prices.
- **Signal noise** — white noise is the formal time derivative of Brownian motion; it models the accumulated effect of many small independent disturbances.
- **PDE connections** — the Feynman–Kac formula links SDEs driven by Brownian motion to parabolic PDEs.

Builds on [Random variables and expectation](../Random-variables-and-expectation.md), [Conditional probability](../Conditional-probability.md), and [Limit theorems](../Limit-theorems.md).

> **Authoritative sources**
> - [Wiener process (Wikipedia)](https://en.wikipedia.org/wiki/Wiener_process)
> - [A. Einstein (1905), *Über die von der molekularkinetischen Theorie der Diffusion ...*](https://en.wikipedia.org/wiki/Brownian_motion)
> - [N. Wiener (1923), *Differential space*](https://en.wikipedia.org/wiki/Norbert_Wiener)
> - [Karatzas & Shreve, *Brownian Motion and Stochastic Calculus* (1991)](https://en.wikipedia.org/wiki/Brownian_Motion_and_Stochastic_Calculus)
> - [B. Øksendal, *Stochastic Differential Equations* (1998)](https://en.wikipedia.org/wiki/Stochastic_Differential_Equations)

<iframe src="./Brownian-motion.simulation.html" title="Interactive demo: sample Brownian paths, the random-walk scaling limit, and quadratic variation" style="width:100%;height:1180px;border:1px solid #ccc;border-radius:4px;"></iframe>

## Definition and axioms

A **standard Brownian motion** (Wiener process) $`W = (W_t)_{t \ge 0}` is a stochastic process satisfying:

1. $`W_0 = 0` almost surely.
2. **Continuous paths**: $`t \mapsto W_t` is continuous almost surely.
3. **Independent increments**: for $`0 \le t_0 < t_1 < \dots < t_n`, the increments $`W_{t_i} - W_{t_{i-1}}` are mutually independent.
4. **Stationary Gaussian increments**: $`W_t - W_s \sim \mathcal{N}(0, t-s)` for $`0 \le s < t`.

**Consequences (cheatsheet).** $`W_t \sim \mathcal{N}(0, t)`, so $`\mathbb{E}[W_t] = 0` and $`\mathrm{Var}(W_t) = t`; the covariance is $`\mathrm{Cov}(W_s, W_t) = \min(s, t)`; and $`W` is simultaneously a [martingale](./Martingales.md), a [Gaussian process](./Gaussian-processes.md) (kernel $`\min(s,t)`), and a [Markov process](./Readme.md).

<details><summary>Details</summary>

The four axioms each pin down one aspect of the process, and together they force the entire law of $`W`.

**Step 1 — Start at zero and move continuously.** Axioms 1 and 2 say the path begins at the origin and never jumps: $`t \mapsto W_t` is a continuous curve. This is what separates Brownian motion from a jump process such as the [Poisson process](./Poisson-processes.md). Continuity alone, however, does not fix the distribution — a deterministic drift $`W_t = \mu t` is also continuous.

**Step 2 — Independent, stationary increments.** Axioms 3 and 4 say the "steps" of the path are memoryless and time-homogeneous: the increment over any interval of length $`h` has the same law, $`\mathcal{N}(0, h)`, and increments over disjoint intervals are independent. This is the continuous-time analogue of the i.i.d. increments of a random walk. It makes $`W` a [Markov process](./Readme.md) (the future depends only on the present) and a [martingale](./Martingales.md) (the best prediction of $`W_t` given the past is $`W_s`).

**Step 3 — The Gaussian law is forced.** Because the increments are independent and stationary, $`W_t` is a sum of $`t` worth of independent Gaussian increments; the only law consistent with all four axioms is $`W_t \sim \mathcal{N}(0, t)`. The covariance follows by conditioning on the overlap of the two intervals:

```math
\mathrm{Cov}(W_s, W_t) = \mathrm{Cov}\big(W_s,\, W_s + (W_t - W_s)\big) = \mathrm{Var}(W_s) = s = \min(s,t), \quad s \le t.
```

**Example.** Take $`s = 2`, $`t = 5`. Then $`W_2 \sim \mathcal{N}(0,2)`, $`W_5 \sim \mathcal{N}(0,5)`, and $`\mathrm{Cov}(W_2, W_5) = 2`. The correlation is $`\mathrm{Corr}(W_2, W_5) = 2/\sqrt{2 \cdot 5} \approx 0.63`: the two values are positively correlated because the path from $`0` to $`2` is shared.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A single sample path of a standard Brownian motion over t from 0 to 10">
  <rect x="0" y="0" width="700" height="300" fill="#fafafa"/>
  <line x1="40" y1="150" x2="660" y2="150" stroke="#ddd" stroke-width="1"/>
  <line x1="40" y1="20" x2="40" y2="280" stroke="#999" stroke-width="1"/>
  <line x1="40" y1="280" x2="660" y2="280" stroke="#999" stroke-width="1"/>
  <polyline points="40.0,150.0 44.1,159.0 48.3,162.0 52.4,157.3 56.5,153.9 60.7,159.9 64.8,163.0 68.9,167.6 73.1,170.2 77.2,172.0 81.3,179.0 85.5,176.6 89.6,178.8 93.7,187.7 97.9,184.5 102.0,189.2 106.1,194.3 110.3,202.6 114.4,205.0 118.5,200.4 122.7,192.9 126.8,188.8 130.9,191.7 135.1,188.4 139.2,182.4 143.3,186.4 147.5,190.2 151.6,189.2 155.7,190.8 159.9,186.2 164.0,186.6 168.1,175.7 172.3,166.1 176.4,165.5 180.5,180.5 184.7,183.7 188.8,188.0 192.9,197.6 197.1,197.5 201.2,204.5 205.3,206.5 209.5,202.6 213.6,209.8 217.7,211.9 221.9,208.9 226.0,219.6 230.1,220.1 234.3,218.9 238.4,201.0 242.5,195.7 246.7,207.2 250.8,214.4 254.9,226.4 259.1,232.4 263.2,240.8 267.3,248.7 271.5,251.9 275.6,243.9 279.7,253.4 283.9,252.9 288.0,255.6 292.1,254.0 296.3,260.0 300.4,257.7 304.5,259.7 308.7,253.0 312.8,249.5 316.9,238.9 321.1,231.2 325.2,235.6 329.3,234.9 333.5,240.8 337.6,246.2 341.7,245.9 345.9,236.3 350.0,244.4 354.1,242.5 358.3,237.3 362.4,236.9 366.5,237.6 370.7,234.6 374.8,255.3 378.9,251.1 383.1,250.9 387.2,248.4 391.3,247.2 395.5,236.9 399.6,221.6 403.7,211.7 407.9,218.2 412.0,213.4 416.1,200.1 420.3,203.5 424.4,200.1 428.5,205.2 432.7,198.4 436.8,202.7 440.9,202.3 445.1,200.9 449.2,201.0 453.3,195.5 457.5,189.4 461.6,188.0 465.7,190.4 469.9,182.1 474.0,173.8 478.1,175.7 482.3,169.3 486.4,176.0 490.5,174.4 494.7,169.5 498.8,157.6 502.9,146.0 507.1,146.3 511.2,154.4 515.3,164.2 519.5,162.4 523.6,148.8 527.7,149.6 531.9,137.0 536.0,127.8 540.1,119.9 544.3,122.2 548.4,118.8 552.5,111.7 556.7,116.1 560.8,116.7 564.9,125.9 569.1,117.8 573.2,117.4 577.3,113.0 581.5,111.5 585.6,122.2 589.7,131.1 593.9,124.7 598.0,128.5 602.1,127.1 606.3,129.1 610.4,129.7 614.5,132.9 618.7,130.0 622.8,123.2 626.9,121.7 631.1,124.0 635.2,138.0 639.3,150.4 643.5,149.3 647.6,160.7 651.7,160.6 655.9,159.1 660.0,150.1" fill="none" stroke="#2c5f8a" stroke-width="1.6"/>
  <text x="660" y="296" text-anchor="end" font-family="sans-serif" font-size="12" fill="#666">t</text>
  <text x="46" y="30" font-family="sans-serif" font-size="12" fill="#666">W_t</text>
  <text x="350" y="296" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#666">one sample path, t ∈ [0, 10]</text>
</svg>

> **Authoritative sources**
> - [Wiener process (Wikipedia)](https://en.wikipedia.org/wiki/Wiener_process)

<details><summary>Example problem</summary>

Compute $`\mathbb{E}[W_3 W_7]` and $`\mathrm{Var}(W_7 - W_3)`.

<details><summary>Solution</summary>

$`\mathbb{E}[W_3 W_7] = \mathrm{Cov}(W_3, W_7) = \min(3,7) = 3` (both means are zero). And $`W_7 - W_3 \sim \mathcal{N}(0, 7-3) = \mathcal{N}(0,4)`, so $`\mathrm{Var}(W_7 - W_3) = 4`.

</details>
</details>

</details>

## Construction as the scaling limit of random walks

**Donsker's invariance principle (functional central limit theorem).** Let $`X_1, X_2, \dots` be i.i.d. with $`\mathbb{E}[X_1] = 0` and $`\mathrm{Var}(X_1) = \sigma^2 < \infty`, and let $`S_n = X_1 + \dots + X_n`. The rescaled random-walk process

```math
W^{(n)}(t) = \frac{S_{\lfloor n t \rfloor}}{\sigma \sqrt{n}}, \quad t \ge 0,
```

converges in distribution (in $`C[0,\infty)`) to a standard Brownian motion $`W`.

<details><summary>Details</summary>

**Step 1 — The CLT is a statement about one time.** The [central limit theorem](../Limit-theorems.md) says $`S_n/(\sigma\sqrt{n}) \xrightarrow{d} \mathcal{N}(0,1)`: at a single time $`t = 1`, the rescaled walk looks Gaussian. Donsker's theorem upgrades this to a statement about the *whole path*: the entire rescaled trajectory converges, not just its value at one point.

**Step 2 — Why the $`\sqrt{n}` scaling.** The walk $`S_n` has standard deviation $`\sigma\sqrt{n}`, so dividing by $`\sigma\sqrt{n}` keeps the vertical scale fixed. Horizontally, $`n` steps are compressed into the unit interval $`[0,1]`, so each step spans $`1/n` in time. The vertical step size is $`\sigma/\sqrt{n}` and the horizontal step size is $`1/n`; their ratio is $`\sigma/\sqrt{n} : 1/n = \sigma\sqrt{n} : 1`, which grows like $`\sqrt{n}`. This is why the limit path is continuous yet wildly rough — the steps shrink in both directions, but the vertical steps shrink more slowly.

**Step 3 — The limit inherits the axioms.** The rescaled process has (approximately) independent, stationary increments and a Gaussian marginal at each time; Donsker's theorem makes this rigorous and shows the limit is continuous, hence a Brownian motion.

**Example.** A simple symmetric random walk ($`X_i = \pm 1` with probability $`1/2`) has $`\sigma^2 = 1`. After $`n = 10^4` steps the walk is typically at height $`\pm 100`; rescaled by $`1/\sqrt{n} = 1/100` and plotted over $`[0,1]`, it looks like a Brownian path.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rescaled random walk S_i over root i, which converges to a Brownian path">
  <rect x="0" y="0" width="700" height="300" fill="#fafafa"/>
  <line x1="40" y1="150" x2="660" y2="150" stroke="#ddd" stroke-width="1"/>
  <line x1="40" y1="20" x2="40" y2="280" stroke="#999" stroke-width="1"/>
  <line x1="40" y1="280" x2="660" y2="280" stroke="#999" stroke-width="1"/>
  <polyline points="40.0,150.0 43.1,76.2 46.2,158.4 49.3,185.4 52.4,182.3 55.5,197.8 58.6,190.6 61.7,195.6 64.8,240.4 67.9,260.0 71.0,247.1 74.1,256.3 77.2,239.7 80.3,224.0 83.4,223.4 86.5,210.8 89.6,216.9 92.7,230.7 95.8,228.3 98.9,227.5 102.0,213.6 105.1,222.6 108.2,225.6 111.3,219.8 114.4,213.7 117.5,200.8 120.6,209.4 123.7,195.2 126.8,197.5 129.9,188.9 133.0,193.9 136.1,190.3 139.2,191.9 142.3,183.1 145.4,182.4 148.5,186.4 151.6,175.8 154.7,166.8 157.8,165.9 160.9,166.8 164.0,176.3 167.1,177.6 170.2,169.9 173.3,170.9 176.4,167.1 179.5,185.6 182.6,185.1 185.7,191.7 188.8,192.6 191.9,188.1 195.0,183.2 198.1,187.8 201.2,189.2 204.3,177.2 207.4,171.8 210.5,181.4 213.6,181.4 216.7,185.4 219.8,191.8 222.9,191.6 226.0,183.6 229.1,178.0 232.2,173.9 235.3,175.3 238.4,176.2 241.5,179.3 244.6,181.2 247.7,184.5 250.8,185.4 253.9,184.8 257.0,193.4 260.1,185.7 263.2,193.9 266.3,198.2 269.4,194.8 272.5,194.6 275.6,188.8 278.7,190.7 281.8,191.0 284.9,193.1 288.0,188.3 291.1,194.8 294.2,195.3 297.3,197.1 300.4,193.8 303.5,194.1 306.6,191.0 309.7,187.5 312.8,182.1 315.9,171.4 319.0,173.8 322.1,176.0 325.2,175.7 328.3,176.1 331.4,175.4 334.5,172.8 337.6,169.7 340.7,159.7 343.8,162.1 346.9,160.9 350.0,165.6 353.1,164.6 356.2,166.8 359.3,171.9 362.4,168.3 365.5,172.8 368.6,169.3 371.7,159.1 374.8,166.8 377.9,165.6 381.0,160.7 384.1,164.7 387.2,160.6 390.3,160.4 393.4,163.3 396.5,160.1 399.6,161.0 402.7,164.1 405.8,170.4 408.9,167.7 412.0,169.5 415.1,171.0 418.2,165.7 421.3,159.8 424.4,163.6 427.5,163.4 430.6,162.3 433.7,162.8 436.8,164.2 439.9,165.0 443.0,166.3 446.1,162.2 449.2,160.1 452.3,163.4 455.4,162.3 458.5,162.4 461.6,166.6 464.7,169.3 467.8,168.0 470.9,165.8 474.0,164.1 477.1,154.0 480.2,159.0 483.3,162.2 486.4,163.9 489.5,158.6 492.6,158.7 495.7,159.7 498.8,155.1 501.9,157.1 505.0,156.4 508.1,155.6 511.2,148.8 514.3,155.7 517.4,155.9 520.5,157.5 523.6,158.8 526.7,158.0 529.8,154.9 532.9,152.0 536.0,152.5 539.1,149.7 542.2,152.4 545.3,150.8 548.4,151.7 551.5,152.1 554.6,150.3 557.7,147.2 560.8,145.2 563.9,150.0 567.0,141.8 570.1,142.2 573.2,143.0 576.3,141.1 579.4,143.1 582.5,146.3 585.6,151.6 588.7,151.6 591.8,150.9 594.9,155.9 598.0,158.1 601.1,156.6 604.2,157.8 607.3,154.0 610.4,149.4 613.5,152.2 616.6,151.1 619.7,142.2 622.8,147.6 625.9,149.1 629.0,150.0 632.1,147.2 635.2,153.0 638.3,155.0 641.4,153.9 644.5,157.6 647.6,157.0 650.7,156.8 653.8,155.4 656.9,159.0 660.0,159.9" fill="none" stroke="#c0392b" stroke-width="1.4"/>
  <text x="660" y="296" text-anchor="end" font-family="sans-serif" font-size="12" fill="#666">t</text>
  <text x="46" y="30" font-family="sans-serif" font-size="12" fill="#666">S_i / √i</text>
  <text x="350" y="296" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#666">rescaled random walk → Brownian path (Donsker)</text>
</svg>

> **Authoritative sources**
> - [Invariance principle (Wikipedia)](https://en.wikipedia.org/wiki/Invariance_principle)

<details><summary>Example problem</summary>

Let $`X_i` be i.i.d. with $`\mathbb{E}[X_i] = 0` and $`\mathrm{Var}(X_i) = 4`. What is the correct rescaling of $`S_{\lfloor n t \rfloor}` so that the limit is a *standard* Brownian motion?

<details><summary>Solution</summary>

$`\sigma = \sqrt{4} = 2`, so divide by $`2\sqrt{n}`: $`W^{(n)}(t) = S_{\lfloor nt \rfloor}/(2\sqrt{n})`. Dividing only by $`\sqrt{n}` would give a Brownian motion scaled by $`2`, i.e. $`2W_t`, whose variance at time $`t` is $`4t` rather than $`t`.

</details>
</details>

</details>

## Path properties

- **Nowhere differentiable**: almost surely, $`t \mapsto W_t` is continuous but has no finite derivative at any point.
- **Quadratic variation**: $`[W]_t = \lim_{|\Pi| \to 0} \sum_{i} (W_{t_{i+1}} - W_{t_i})^2 = t` almost surely, where the limit is over partitions $`\Pi` of $`[0,t]` whose mesh goes to zero.

<details><summary>Details</summary>

**Step 1 — Continuity does not imply smoothness.** A continuous function can still be nowhere differentiable (think of the Weierstrass function). Brownian paths are even rougher: the derivative $`dW_t/dt` does not exist anywhere. Intuitively, zooming into any interval reveals the same jagged structure at every scale — the path is self-similar.

**Step 2 — Self-similarity.** For any $`c > 0`, the process $`c^{-1/2} W_{ct}` is again a standard Brownian motion. This scaling symmetry is the continuous-time echo of the $`\sqrt{n}` scaling in the random-walk limit, and it is why the roughness is the same at every magnification.

**Step 3 — Quadratic variation.** For a smooth function $`f`, the sum $`\sum (f_{t_{i+1}} - f_{t_i})^2` over a fine partition tends to $`0` (the squared increments are of order $`(\Delta t)^2`). For Brownian motion the increments are of order $`\sqrt{\Delta t}`, so the squared increments are of order $`\Delta t`, and the sum converges to the length of the interval:

```math
[W]_t = \lim_{|\Pi| \to 0} \sum_{i} (W_{t_{i+1}} - W_{t_i})^2 = t \quad \text{a.s.}
```

This is the single fact that makes Itô calculus different from ordinary calculus: the "infinitesimal" $`dW_t` satisfies $`(dW_t)^2 = dt`, not $`0`.

**Example.** Over $`[0,1]`, refine the partition from $`10` to $`1000` intervals. The sum of squared increments stays near $`1` (the value of $`t`), not near $`0` as it would for a smooth curve.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sum of squared increments of a Brownian path over [0,1] as the partition is refined, converging to 1">
  <rect x="0" y="0" width="700" height="300" fill="#fafafa"/>
  <line x1="60" y1="260" x2="660" y2="260" stroke="#999" stroke-width="1"/>
  <line x1="60" y1="30" x2="60" y2="260" stroke="#999" stroke-width="1"/>
  <line x1="60" y1="68.3" x2="660" y2="68.3" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="660" y="62" text-anchor="end" font-family="sans-serif" font-size="12" fill="#c0392b">t = 1</text>
  <rect x="80" y="108.8" width="50" height="151.2" fill="#2c5f8a"/>
  <rect x="160" y="116.1" width="50" height="143.9" fill="#2c5f8a"/>
  <rect x="240" y="126.2" width="50" height="133.8" fill="#2c5f8a"/>
  <rect x="320" y="96.3" width="50" height="163.7" fill="#2c5f8a"/>
  <rect x="400" y="88.3" width="50" height="171.7" fill="#2c5f8a"/>
  <rect x="480" y="72.6" width="50" height="187.4" fill="#2c5f8a"/>
  <rect x="560" y="59.7" width="50" height="200.3" fill="#2c5f8a"/>
  <text x="105" y="276" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#666">10</text>
  <text x="185" y="276" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#666">20</text>
  <text x="265" y="276" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#666">50</text>
  <text x="345" y="276" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#666">100</text>
  <text x="425" y="276" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#666">200</text>
  <text x="505" y="276" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#666">500</text>
  <text x="585" y="276" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#666">1000</text>
  <text x="360" y="296" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#666">number of intervals in the partition of [0,1]</text>
  <text x="30" y="145" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#666" transform="rotate(-90 30 145)">Σ (ΔW)²</text>
</svg>

> **Authoritative sources**
> - [Quadratic variation (Wikipedia)](https://en.wikipedia.org/wiki/Quadratic_variation)

<details><summary>Example problem</summary>

For the smooth function $`f(t) = t` on $`[0,1]`, what is $`\lim_{|\Pi| \to 0} \sum (f_{t_{i+1}} - f_{t_i})^2`? Contrast with $`[W]_1`.

<details><summary>Solution</summary>

For $`f(t) = t`, each increment is $`\Delta t_i` and $`\sum (\Delta t_i)^2 \le (\max \Delta t_i) \sum \Delta t_i = \max \Delta t_i \to 0`. So the quadratic variation of a smooth function is $`0`, whereas $`[W]_1 = 1`. The nonzero quadratic variation is precisely what forces the extra $`\tfrac{1}{2} f''(W_t)\,dt` term in Itô's lemma.

</details>
</details>

</details>

## Itô calculus and stochastic differential equations

- **Itô integral**: for an adapted process $`f`, $`\int_0^t f(s)\,dW_s` is defined as an $`L^2` limit of sums $`\sum f(s_i)(W_{t_{i+1}} - W_{t_i})`.
- **Itô's lemma**: for $`f \in C^2`, $`df(W_t) = f'(W_t)\,dW_t + \tfrac{1}{2} f''(W_t)\,dt`.
- **Stochastic differential equation (SDE)**: $`dX_t = \mu(X_t, t)\,dt + \sigma(X_t, t)\,dW_t`.
- **Geometric Brownian motion**: $`dS_t = \mu S_t\,dt + \sigma S_t\,dW_t`, with solution $`S_t = S_0 \exp\big((\mu - \tfrac{1}{2}\sigma^2)t + \sigma W_t\big)`.

<details><summary>Details</summary>

**Step 1 — Why the ordinary chain rule fails.** The chain rule $`df(W_t) = f'(W_t)\,dW_t` is wrong for Brownian motion because $`W` has nonzero quadratic variation. The missing term is $`\tfrac{1}{2} f''(W_t)\,dt`, which comes from the rule $`(dW_t)^2 = dt`.

**Step 2 — Itô's lemma.** For $`f \in C^2`, a Taylor expansion $`f(W_{t+\Delta t}) - f(W_t) \approx f'(W_t)\Delta W + \tfrac{1}{2} f''(W_t)(\Delta W)^2` plus the fact that $`(\Delta W)^2 \approx \Delta t` (in the quadratic-variation sense) gives

```math
df(W_t) = f'(W_t)\,dW_t + \tfrac{1}{2} f''(W_t)\,dt.
```

**Example.** Take $`f(x) = x^2`. Then $`d(W_t^2) = 2 W_t\,dW_t + dt`. Integrating: $`W_t^2 = 2\int_0^t W_s\,dW_s + t`, so $`\int_0^t W_s\,dW_s = \tfrac{1}{2}(W_t^2 - t)`. The $`-t` term is the Itô correction that has no classical analogue.

**Step 3 — SDEs and geometric Brownian motion.** An SDE $`dX_t = \mu\,dt + \sigma\,dW_t` is solved by $`X_t = X_0 + \mu t + \sigma W_t`. The *geometric* SDE $`dS_t = \mu S_t\,dt + \sigma S_t\,dW_t` keeps $`S_t > 0` (multiplicative noise) and is the Black–Scholes price model. Applying Itô's lemma to $`f(x) = \ln x` gives $`d\ln S_t = (\mu - \tfrac{1}{2}\sigma^2)\,dt + \sigma\,dW_t`, so

```math
S_t = S_0 \exp\big((\mu - \tfrac{1}{2}\sigma^2)t + \sigma W_t\big).
```

The $`-\tfrac{1}{2}\sigma^2` in the exponent is again the Itô correction: it is why the expected price $`\mathbb{E}[S_t] = S_0 e^{\mu t}` grows at rate $`\mu` even though the log-drift is $`\mu - \tfrac{1}{2}\sigma^2`.

> **Authoritative sources**
> - [Itô's lemma (Wikipedia)](https://en.wikipedia.org/wiki/It%C3%B4%27s_lemma)
> - [Geometric Brownian motion (Wikipedia)](https://en.wikipedia.org/wiki/Geometric_Brownian_motion)

<details><summary>Example problem</summary>

Apply Itô's lemma to $`f(x) = e^{x}` to find $`d(e^{W_t})`.

<details><summary>Solution</summary>

$`f'(x) = e^x`, $`f''(x) = e^x`. So $`d(e^{W_t}) = e^{W_t}\,dW_t + \tfrac{1}{2} e^{W_t}\,dt = e^{W_t}(dW_t + \tfrac{1}{2}dt)`. The $`\tfrac{1}{2}dt` term is the Itô correction; without it the exponential would not be a martingale.

</details>
</details>

</details>

## Related pages

- [Lévy processes](./Levy-processes.md) — Brownian motion is the purely diffusive, continuous Lévy process (Lévy measure $`\nu = 0`).
- [Gaussian processes](./Gaussian-processes.md) — Brownian motion is the Gaussian process with covariance kernel $`\min(s,t)`.
- [Martingales](./Martingales.md) — Brownian motion is the canonical continuous martingale.
- Parent topic: [Stochastic processes](./Readme.md).

## Quizz

<details><summary>Quizz</summary>

A stock price follows geometric Brownian motion $`dS_t = \mu S_t\,dt + \sigma S_t\,dW_t` with $`S_0 = 100`, $`\mu = 0.08`, and $`\sigma = 0.2`.

(a) Find $`\mathbb{E}[S_1]`.

(b) Find the drift of $`\ln S_t`.

<details><summary>Solution</summary>

(a) For geometric Brownian motion, $`\mathbb{E}[S_t] = S_0 e^{\mu t}`, so $`\mathbb{E}[S_1] = 100\,e^{0.08} \approx 108.33`.

(b) Applying Itô's lemma to $`f(x) = \ln x` gives $`d\ln S_t = (\mu - \tfrac{1}{2}\sigma^2)\,dt + \sigma\,dW_t = (0.08 - 0.02)\,dt + 0.2\,dW_t = 0.06\,dt + 0.2\,dW_t`. The drift of $`\ln S_t` is $`0.06` — smaller than $`\mu` by the Itô correction $`\tfrac{1}{2}\sigma^2 = 0.02`.

</details>
</details>
