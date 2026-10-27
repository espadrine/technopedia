# Martingales

A martingale is a stochastic process whose conditional expectation of the future, given the past, equals the present value: $`\mathbb{E}[X_{t+1} \mid X_0,\dots,X_t] = X_t`. It formalizes a "fair game" with no trend.

**Key results:** optional stopping theorem, Doob's inequalities, martingale convergence theorems; the tool behind proofs of the strong law of large numbers and hitting-time estimates for Markov chains.

Builds on [Random variables and expectation](../Random-variables-and-expectation.md) and [Conditional probability](../Conditional-probability.md).

## Why it matters

A martingale is the precise mathematical statement that "no strategy can beat a fair game." Once you can recognize a quantity as a martingale, three powerful conclusions come for free:

- **No drift, so averages stabilize.** If $`X_t` is a martingale with bounded increments, then $`X_t/t \to 0` almost surely. This is the engine behind the **strong law of large numbers**: the running average $`S_n/n` of i.i.d. variables is a martingale up to a constant, and the martingale convergence machinery turns "the average stops moving" into a rigorous almost-sure limit. See [Limit theorems](../Limit-theorems.md).
- **Hitting times become computable.** For a [Markov chain](./Markov-chains.md), the time to reach a target state (a *hitting time*) is often infinite in expectation or finite but hard to bound. Martingales let you convert "when does the chain hit state $`a`?" into an equation about expectations, giving sharp bounds on hitting times and on the probability of ever reaching a state.
- **Fairness is preserved under stopping.** The optional stopping theorem says you cannot, by choosing *when* to stop, turn a fair game into a winning one — provided the stopping rule is well behaved. This is the backbone of gambler's-ruin calculations and of many results in queueing and finance.

The rest of this page builds the machinery in order: the definition and its fair-game intuition, stopping times, the inequalities and convergence theorems that make the machinery usable, and the canonical examples that show the property cuts across every family of stochastic process.

> **Authoritative sources**
> - [J. L. Doob, *Stochastic Processes* (1953)](https://en.wikipedia.org/wiki/Joseph_L._Doob)
> - [D. Williams, *Probability with Martingales* (1991)](https://en.wikipedia.org/wiki/Probability_with_Martingales)
> - [Martingale (Wikipedia)](https://en.wikipedia.org/wiki/Martingale)
> - [Optional stopping theorem (Wikipedia)](https://en.wikipedia.org/wiki/Optional_stopping_theorem)
> - [Doob's inequalities (Wikipedia)](https://en.wikipedia.org/wiki/Doob%27s_inequalities)

## Definition and the fair-game intuition

**Definition.** Let $`(X_t)_{t \ge 0}` be a stochastic process and $`\mathcal{F}_t = \sigma(X_0,\dots,X_t)` the information available up to time $`t` (the *filtration*). Then:

- $`X` is a **martingale** if $`\mathbb{E}[X_{t+1} \mid \mathcal{F}_t] = X_t` for all $`t`.
- $`X` is a **submartingale** if $`\mathbb{E}[X_{t+1} \mid \mathcal{F}_t] \ge X_t` (a game that, on average, drifts *up*).
- $`X` is a **supermartingale** if $`\mathbb{E}[X_{t+1} \mid \mathcal{F}_t] \le X_t` (a game that, on average, drifts *down*).

In each case the process must be **adapted** ($`X_t` is measurable w.r.t. $`\mathcal{F}_t` — you can observe it at time $`t`), **integrable** ($`\mathbb{E}[|X_t|] < \infty`), and the conditional expectation must exist.

<details><summary>Details</summary>

**Step 1 — Read the definition as a prediction rule.** The conditional expectation $`\mathbb{E}[X_{t+1} \mid \mathcal{F}_t]` is the best (mean-square) prediction of the next value using everything you know so far. A martingale says: *the best prediction of the future is exactly where you are now.* There is no edge to exploit, no trend to ride. A submartingale says the future is, on average, at least as large as the present (a favorable game); a supermartingale says at most as large (an unfavorable game). The martingale is the knife-edge between the two.

**Step 2 — The symmetric random walk is the prototype.** Let $`X_0 = 0` and let $`X_n = \sum_{i=1}^{n} \varepsilon_i` where the $`\varepsilon_i` are i.i.d. with $`\mathbb{P}(\varepsilon_i = +1) = \mathbb{P}(\varepsilon_i = -1) = \tfrac{1}{2}`. This is the gambler's fortune after $`n` fair coin flips. Given the whole past, the next increment $`\varepsilon_{n+1}` is still a fair coin, so

```math
\mathbb{E}[X_{n+1} \mid X_0,\dots,X_n] = \mathbb{E}[X_n + \varepsilon_{n+1} \mid X_0,\dots,X_n] = X_n + \mathbb{E}[\varepsilon_{n+1}] = X_n + 0 = X_n.
```

The walk is a martingale. Notice the *variance* grows ($`\mathrm{Var}(X_n) = n`), so the path wanders farther and farther from zero even though its *mean* stays pinned at zero: no trend, but plenty of spread.

**Step 3 — A biased walk is a submartingale.** If instead $`\mathbb{P}(\varepsilon_i = +1) = p > \tfrac{1}{2}`, then $`\mathbb{E}[\varepsilon_i] = 2p - 1 > 0` and $`\mathbb{E}[X_{n+1} \mid \mathcal{F}_n] = X_n + (2p-1) > X_n`: the walk is a submartingale with a genuine upward drift. The martingale is exactly the $`p = \tfrac{1}{2}` case.

**Example.** A gambler starts with a fortune of 100 and bets 1 unit on a fair coin each round. Their fortune $`X_n` is a martingale: after any history, the expected fortune one round later is exactly the current fortune. The *expected* fortune is always 100, no matter how long they play — yet the *probability* of eventually going broke is $`1` (a fact the convergence theorems below make precise).

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A sample path of a symmetric random walk, a martingale, wandering around zero with no drift">
  <rect x="0" y="0" width="700" height="300" fill="#fafafa"/>
  <line x1="40" y1="131.4" x2="660" y2="131.4" stroke="#c0392b" stroke-width="1.2" stroke-dasharray="5,4"/>
  <text x="660" y="126" text-anchor="end" font-family="sans-serif" font-size="11" fill="#c0392b">E[X_n] = 0 (no drift)</text>
  <line x1="40" y1="20" x2="40" y2="280" stroke="#999" stroke-width="1"/>
  <line x1="40" y1="280" x2="660" y2="280" stroke="#999" stroke-width="1"/>
  <polyline points="40.0,131.4 45.2,150.0 50.3,131.4 55.5,150.0 60.7,168.6 65.8,187.1 71.0,205.7 76.2,187.1 81.3,205.7 86.5,224.3 91.7,242.9 96.8,261.4 102.0,242.9 107.2,261.4 112.3,242.9 117.5,261.4 122.7,242.9 127.8,224.3 133.0,242.9 138.2,261.4 143.3,280.0 148.5,261.4 153.7,242.9 158.8,261.4 164.0,242.9 169.2,224.3 174.3,205.7 179.5,224.3 184.7,242.9 189.8,224.3 195.0,205.7 200.2,224.3 205.3,205.7 210.5,187.1 215.7,168.6 220.8,150.0 226.0,168.6 231.2,187.1 236.3,168.6 241.5,187.1 246.7,168.6 251.8,150.0 257.0,168.6 262.2,187.1 267.3,168.6 272.5,187.1 277.7,205.7 282.8,224.3 288.0,205.7 293.2,224.3 298.3,205.7 303.5,224.3 308.7,205.7 313.8,224.3 319.0,205.7 324.2,187.1 329.3,168.6 334.5,150.0 339.7,168.6 344.8,150.0 350.0,131.4 355.2,112.9 360.3,94.3 365.5,112.9 370.7,94.3 375.8,75.7 381.0,57.1 386.2,38.6 391.3,20.0 396.5,38.6 401.7,20.0 406.8,38.6 412.0,57.1 417.2,75.7 422.3,94.3 427.5,75.7 432.7,94.3 437.8,75.7 443.0,94.3 448.2,112.9 453.3,94.3 458.5,75.7 463.7,94.3 468.8,75.7 474.0,94.3 479.2,112.9 484.3,131.4 489.5,112.9 494.7,131.4 499.8,150.0 505.0,131.4 510.2,150.0 515.3,168.6 520.5,150.0 525.7,168.6 530.8,187.1 536.0,168.6 541.2,150.0 546.3,168.6 551.5,187.1 556.7,205.7 561.8,224.3 567.0,242.9 572.2,224.3 577.3,242.9 582.5,224.3 587.7,205.7 592.8,187.1 598.0,205.7 603.2,187.1 608.3,205.7 613.5,187.1 618.7,205.7 623.8,187.1 629.0,168.6 634.2,150.0 639.3,131.4 644.5,150.0 649.7,168.6 654.8,187.1 660.0,205.7" fill="none" stroke="#2c5f8a" stroke-width="1.6"/>
  <text x="660" y="296" text-anchor="end" font-family="sans-serif" font-size="12" fill="#666">n</text>
  <text x="46" y="30" font-family="sans-serif" font-size="12" fill="#666">X_n</text>
  <text x="350" y="296" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#666">one sample path of a symmetric random walk (a martingale)</text>
</svg>

> **Authoritative sources**
> - [Martingale (Wikipedia)](https://en.wikipedia.org/wiki/Martingale)

<details><summary>Example problem</summary>

A coin is biased with $`\mathbb{P}(\text{heads}) = 0.6`. A player gains 1 unit on heads and loses 1 unit on tails, starting at $`X_0 = 0`. Is $`(X_n)` a martingale, a submartingale, or a supermartingale? Compute $`\mathbb{E}[X_{10}]`.

<details><summary>Solution</summary>

Each increment $`\varepsilon_i` has $`\mathbb{E}[\varepsilon_i] = 1(0.6) + (-1)(0.4) = 0.2 > 0`. Hence $`\mathbb{E}[X_{n+1} \mid \mathcal{F}_n] = X_n + 0.2 > X_n`, so $`(X_n)` is a **submartingale** (a favorable game). The expected fortune after 10 rounds is $`\mathbb{E}[X_{10}] = 10 \cdot 0.2 = 2` units.

</details>
</details>

</details>

## Stopping times and the optional stopping theorem

**Stopping time.** A random time $`\tau` is a **stopping time** (with respect to $`\mathcal{F}_t`) if the event $`\{\tau \le t\}` is determined by the information up to time $`t` — i.e. $`\{\tau \le t\} \in \mathcal{F}_t` for every $`t`. You can decide to stop at $`\tau` using only what you have seen so far, never by peeking into the future.

**Optional stopping theorem (OST).** If $`(X_t)` is a martingale and $`\tau` is a stopping time satisfying suitable conditions (e.g. $`\tau` is bounded, or $`\tau < \infty` a.s. with $`X_{\tau}` integrable and the stopped process uniformly integrable), then

```math
\mathbb{E}[X_{\tau}] = \mathbb{E}[X_0].
```

The stopped process $`X_{t \wedge \tau}` (frozen at $`\tau`) is itself a martingale.

<details><summary>Details</summary>

**Step 1 — Why stopping times are the right notion of "a rule."** A strategy that says "stop when your fortune first hits 150" is a stopping time: at each moment you can check whether the target has been reached using only the past. A rule like "stop at the time of the maximum" is *not* a stopping time, because you cannot know a time is the maximum until you see the future. The OST applies only to the honest kind.

**Step 2 — The theorem in one line.** For a martingale, the expected value is constant in time: $`\mathbb{E}[X_t] = \mathbb{E}[X_0]`. If you freeze the process at a well-behaved stopping time $`\tau`, the frozen value $`X_{\tau}` still has the same expectation. Fairness is preserved by any legitimate stopping rule.

**Step 3 — The conditions are not decoration.** The classic trap is a stopping time that is almost surely finite but whose stopped value is *not* integrable, or whose tail carries enough mass to break the equality. The next example is the canonical demonstration.

**The gambler's-ruin counterexample.** A gambler plays a fair coin, gaining or losing 1 unit per round, starting at $`X_0 = 0`. They adopt the rule: *stop when the fortune first reaches $`+100` or $`-50`.* Let $`\tau` be that stopping time. The walk is a martingale and $`\tau < \infty` a.s. (a symmetric walk hits either boundary with probability $`1`), so it is tempting to conclude $`\mathbb{E}[X_{\tau}] = \mathbb{E}[X_0] = 0`.

But $`X_{\tau} \in \{+100, -50\}`, so $`\mathbb{E}[X_{\tau}] = 100\,p + (-50)(1-p)` where $`p = \mathbb{P}(X_{\tau} = +100)`. Setting this to $`0` gives $`100p = 50(1-p)`, i.e. $`p = \tfrac{1}{3}`. So the gambler reaches $`+100` with probability only $`\tfrac{1}{3}` and $`-50` with probability $`\tfrac{2}{3}`. The OST *does* hold here (the stopped value is bounded, hence integrable), and it correctly predicts the $`\tfrac{1}{3}` win probability — the "counterexample" is to the *naive* reading that "I'll stop as soon as I'm ahead, so I'm guaranteed to win." The rule does not create an edge; it only reshapes the distribution.

The genuinely dangerous version: a gambler who stops at the *first time the fortune is positive* (rule $`\tau = \inf\{n : X_n > 0\}`) has $`X_{\tau} = +1` always, so $`\mathbb{E}[X_{\tau}] = 1 \ne 0 = \mathbb{E}[X_0]`. The OST's hypotheses fail: although $`\tau < \infty` a.s., the stopped process is not uniformly integrable and $`\mathbb{E}[\tau] = \infty`. This is the "you can't beat a fair game, but you can make the *expected* stopping time infinite" paradox.

<iframe src="./Martingales.simulation.html" title="Interactive demo: a stopped random walk and the optional stopping theorem" style="width:100%;height:520px;border:1px solid #ccc;border-radius:4px;"></iframe>

> **Authoritative sources**
> - [Optional stopping theorem (Wikipedia)](https://en.wikipedia.org/wiki/Optional_stopping_theorem)
> - [Gambler's ruin (Wikipedia)](https://en.wikipedia.org/wiki/Gambler%27s_ruin)

<details><summary>Example problem</summary>

A fair random walk starts at $`X_0 = 20` and is stopped when it first hits $`0` or $`100`. What is the probability it hits $`100` before $`0`?

<details><summary>Solution</summary>

The walk is a martingale and the stopping time is bounded in the sense that the stopped value lies in $`\{0, 100\}` (integrable), so the OST applies: $`\mathbb{E}[X_{\tau}] = X_0 = 20`. Writing $`p = \mathbb{P}(X_{\tau} = 100)`, we have $`100\,p + 0\,(1-p) = 20`, hence $`p = 0.2`. The gambler wins with probability $`\tfrac{1}{5}`.

</details>
</details>

</details>

## Doob's maximal inequality

**Doob's maximal inequality.** If $`(X_t)_{t \ge 0}` is a nonnegative submartingale, then for every $`a > 0` and every horizon $`T`,

```math
\mathbb{P}\Big(\sup_{0 \le t \le T} X_t \ge a\Big) \le \frac{\mathbb{E}[X_T]}{a}.
```

For a martingale, $`\mathbb{E}[X_T] = \mathbb{E}[X_0]`, so the bound is simply $`\mathbb{P}(\sup_{0 \le t \le T} X_t \ge a) \le \mathbb{E}[X_0]/a`. The $`L^p` version (Doob's $`L^p` inequality): if $`(X_t)` is a submartingale with $`p > 1`, then

```math
\mathbb{E}\Big[\sup_{0 \le t \le T} |X_t|^p\Big] \le \Big(\frac{p}{p-1}\Big)^p \mathbb{E}[|X_T|^p].
```

<details><summary>Details</summary>

**Step 1 — What the inequality controls.** A martingale has constant mean, but its *path* can spike far above that mean before settling. Doob's inequality bounds the probability of such a spike in terms of the terminal (or initial) size: the chance the running maximum ever exceeds $`a` is at most the mean divided by $`a`. It is the maximal-function analogue of Markov's inequality.

**Step 2 — The idea of the proof (upcrossings).** The proof counts how often the path *upcrosses* a level $`[a, b]` (goes from below $`a` to above $`b`). For a submartingale, each upcrossing must be "paid for" by an increase in the process, and the total number of upcrossings is bounded by the total increase divided by the gap $`b - a`. Letting $`b \downarrow a` converts the upcrossing count into a bound on the maximum. This is the same "energy accounting" that underlies the convergence theorems.

**Step 3 — Why it is useful.** Doob's inequality is the workhorse that turns "the mean is controlled" into "the whole path is controlled with high probability." It is the key step in proving the martingale convergence theorems and in establishing almost-sure versions of limit theorems.

**Example.** Let $`X_t = S_t` be a symmetric random walk (a martingale, hence a submartingale in absolute value via $`|X_t|`). Doob's inequality says the probability the walk ever reaches $`+50` before a fixed horizon is at most $`\mathbb{E}[|X_T|]/50`, a quantity that grows only like $`\sqrt{T}/50` — so the chance of a huge spike stays small for moderate $`T`.

> **Authoritative sources**
> - [Doob's inequalities (Wikipedia)](https://en.wikipedia.org/wiki/Doob%27s_inequalities)

<details><summary>Example problem</summary>

A nonnegative submartingale $`(X_t)` satisfies $`\mathbb{E}[X_0] = 4`. Use Doob's maximal inequality to bound $`\mathbb{P}(\sup_{t \ge 0} X_t \ge 20)`.

<details><summary>Solution</summary>

By Doob's maximal inequality, $`\mathbb{P}(\sup_{t \ge 0} X_t \ge 20) \le \mathbb{E}[X_0]/20 = 4/20 = 0.2`. So the probability the process ever reaches $`20` is at most $`20\%`.

</details>
</details>

</details>

## Martingale convergence theorems

**Martingale convergence theorem.** If $`(X_t)_{t \ge 0}` is a martingale with $`\sup_t \mathbb{E}[|X_t|] < \infty` (an $`L^1`-bounded martingale), then $`X_t` converges almost surely to a finite random variable $`X_\infty` as $`t \to \infty`. If in addition the family $`\{X_t\}` is uniformly integrable, then the convergence also holds in $`L^1`, i.e. $`\mathbb{E}[|X_t - X_\infty|] \to 0`.

<details><summary>Details</summary>

**Step 1 — Bounded mean forces convergence.** An $`L^1`-bounded martingale cannot keep oscillating forever: the upcrossing argument of Doob's inequality shows the expected number of upcrossings of any level $`[a,b]` is finite, which forces the path to settle down. Hence $`X_t \to X_\infty` a.s.

**Step 2 — Uniform integrability upgrades the mode of convergence.** Almost-sure convergence alone does not guarantee that expectations converge ($`\mathbb{E}[X_t] \to \mathbb{E}[X_\infty]`). Uniform integrability rules out "mass escaping to the tail," and then $`X_t \to X_\infty` in $`L^1`, so $`\mathbb{E}[X_\infty] = \mathbb{E}[X_0]`.

**Step 3 — Connection to the strong law of large numbers.** Let $`X_1, X_2, \dots` be i.i.d. with $`\mathbb{E}[|X_1|] < \infty` and $`\mathbb{E}[X_1] = 0`, and set $`S_n = X_1 + \dots + X_n`. Then $`(S_n)` is a martingale. The strong law of large numbers, $`S_n/n \to 0` a.s., is a direct corollary of the martingale convergence theorem applied to the normalized martingale (see [Limit theorems](../Limit-theorems.md)). Martingale convergence is thus the general engine behind the almost-sure stabilization of averages.

**Example.** The gambler's fortune $`X_n` in a fair game is an $`L^1`-bounded martingale only if the fortune is bounded; an unbounded fair walk has $`\mathbb{E}[|X_n|] \to \infty`, so the theorem's hypothesis fails and the walk does *not* converge — it wanders off to $`\pm\infty` in the sense that it visits every level infinitely often.

> **Authoritative sources**
> - [Martingale convergence theorem (Wikipedia)](https://en.wikipedia.org/wiki/Martingale_convergence_theorem)

<details><summary>Example problem</summary>

Let $`(X_n)` be a martingale with $`\sup_n \mathbb{E}[|X_n|] \le 5`. Does $`X_n` converge almost surely? If the family is also uniformly integrable, what can you say about $`\mathbb{E}[X_\infty]`?

<details><summary>Solution</summary>

Yes: $`(X_n)` is $`L^1`-bounded, so by the martingale convergence theorem $`X_n \to X_\infty` a.s. for some finite $`X_\infty`. If the family is also uniformly integrable, the convergence is in $`L^1`, and therefore $`\mathbb{E}[X_\infty] = \mathbb{E}[X_0]` (the mean is preserved in the limit).

</details>
</details>

</details>

## Canonical examples

The martingale property is not a family of processes but a structural property that members of *every* family can have. The three examples below show how it cuts across the discrete-time, counting, and continuous families.

- **Brownian motion (continuous martingale).** The [Wiener process](./Brownian-motion.md) $`(W_t)` is the canonical *continuous-time* martingale: independent Gaussian increments with mean zero give $`\mathbb{E}[W_t \mid \mathcal{F}_s] = W_s` for $`t \ge s`. It is the scaling limit of the symmetric random walk, so the discrete fair game and the continuous fair game are the same object at different resolutions.
- **The compensated Poisson process (jump martingale).** The [Poisson counting process](./Poisson-processes.md) $`(N_t)` has upward drift $`\lambda t` and is a submartingale. Subtracting the drift, $`M_t = N_t - \lambda t`, removes the trend and leaves a martingale: the jumps are exactly balanced, on average, by the continuous downward drift. This is the standard way to turn a counting process into a martingale.
- **Martingale-difference sequences (discrete-time building block).** A sequence $`(X_n)` with filtration $`\mathcal{F}_n` is a **martingale-difference sequence** if $`\mathbb{E}[X_n \mid \mathcal{F}_{n-1}] = 0`. Any such sequence, accumulated as $`S_n = \sum_{i=1}^n X_i`, is a martingale. This is the discrete-time definition in its most useful form and the reason martingales appear in the analysis of [Lévy processes](./Levy-processes.md) (whose compensated jump part is a martingale) and in stochastic approximation.

<details><summary>Details</summary>

**Step 1 — One property, many families.** The martingale condition only asks that the *conditional mean of the increment* vanish. It does not care whether the increments are Gaussian (Brownian), Poisson (compensated counting), or arbitrary (martingale-difference). That is why a single set of tools — optional stopping, Doob's inequalities, convergence theorems — applies uniformly across all of [stochastic processes](./Readme.md).

**Step 2 — Compensating a drift is the general recipe.** Whenever a process has a predictable drift, subtracting the accumulated drift yields a martingale. The Poisson process $`N_t` drifts up at rate $`\lambda`; $`N_t - \lambda t` does not. A biased random walk $`X_n` drifts at $`2p-1` per step; $`X_n - n(2p-1)` is a martingale. This "compensation" is the bridge between submartingales (drifting up) and martingales (drift-free).

**Step 3 — Martingale-difference sequences are the atoms.** Every discrete-time martingale is a sum of martingale-difference terms: $`X_n - X_{n-1}` has conditional mean zero. Conversely, summing any martingale-difference sequence gives a martingale. So the discrete theory reduces to understanding zero-conditional-mean increments, which is exactly the content of the fair-game definition.

**Example.** A [Poisson process](./Poisson-processes.md) with rate $`\lambda = 2` has $`\mathbb{E}[N_t] = 2t`. The compensated process $`M_t = N_t - 2t` satisfies $`\mathbb{E}[M_t \mid \mathcal{F}_s] = \mathbb{E}[N_t] - 2t - (N_s - 2s) = (2t - 2s) - (N_s - 2s) = N_s - 2s = M_s` for $`t \ge s`: a martingale with mean zero and variance $`\mathrm{Var}(M_t) = \mathrm{Var}(N_t) = 2t`.

> **Authoritative sources**
> - [Martingale (Wikipedia)](https://en.wikipedia.org/wiki/Martingale)
> - [Compensator (Wikipedia)](https://en.wikipedia.org/wiki/Compensator_(stochastic_process))

<details><summary>Example problem</summary>

Let $`(N_t)` be a Poisson process with rate $`\lambda = 5`. Show that $`M_t = N_t - 5t` is a martingale, and compute $`\mathrm{Var}(M_3)`.

<details><summary>Solution</summary>

For $`t \ge s`, $`\mathbb{E}[N_t - N_s \mid \mathcal{F}_s] = \lambda(t-s) = 5(t-s)`, so $`\mathbb{E}[M_t \mid \mathcal{F}_s] = \mathbb{E}[N_t] - 5t - (N_s - 5s) = 5t - 5t - N_s + 5s = N_s - 5s = M_s`. Hence $`(M_t)` is a martingale. Since $`M_t = N_t - 5t` and $`5t` is deterministic, $`\mathrm{Var}(M_3) = \mathrm{Var}(N_3) = \lambda \cdot 3 = 15`.

</details>
</details>

</details>

## Related pages

- [Brownian motion](./Brownian-motion.md) — the canonical continuous-time martingale.
- [Poisson processes](./Poisson-processes.md) — the counting process whose compensated version $`N_t - \lambda t` is a martingale.
- [Lévy processes](./Levy-processes.md) — every Lévy process decomposes into a drift, a Brownian martingale part, and a compensated-jump martingale part.
- [Markov chains](./Markov-chains.md) — martingales are the tool for bounding hitting times.
- [Limit theorems](../Limit-theorems.md) — the strong law of large numbers follows from martingale convergence.
- Parent topic: [Stochastic processes](./Readme.md).

## Quizz

<details><summary>Quizz</summary>

A player starts with a fortune of 30 and plays a fair coin, winning or losing 1 unit per round. They stop as soon as their fortune reaches either 0 (broke) or 100.

(a) Identify the martingale and the stopping time, and justify that the optional stopping theorem applies.

(b) What is the probability the player reaches 100 before going broke?

<details><summary>Solution</summary>

(a) The fortune $`(X_n)` is a symmetric random walk, hence a martingale. The stopping time $`\tau = \inf\{n : X_n \in \{0, 100\}\}` is a stopping time (decidable from the past), and the stopped value $`X_{\tau} \in \{0, 100\}` is bounded, hence integrable. The OST applies.

(b) By the OST, $`\mathbb{E}[X_{\tau}] = X_0 = 30`. Writing $`p = \mathbb{P}(X_{\tau} = 100)`, we get $`100\,p + 0\,(1-p) = 30`, so $`p = 0.3`. The player reaches 100 with probability $`30\%` and goes broke with probability $`70\%` — the fair game gives no edge, only a reshaping of the outcome distribution.

</details>
</details>

