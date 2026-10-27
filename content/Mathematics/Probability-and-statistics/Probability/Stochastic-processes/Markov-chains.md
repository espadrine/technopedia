# Markov chains

A **Markov chain** is a stochastic process with the **Markov property**: given the present state, the future is independent of the past. It is the workhorse model for any system whose next state is a probabilistic function of the current one *only* — queues, web search ranking, genetic sequences, weather, MCMC sampling, and reinforcement learning.

**When it is relevant.** Use a Markov chain whenever you can (or want to assume) that the history of a process is summarized by its current state. If the next step depends on *how long* the system has been in its current state, a plain Markov chain is not enough and you must enlarge the state space (or use a semi-Markov / continuous-time model).

**Terminology, precisely.** "Markov chain" is usually reserved for **discrete time** $`t = 0, 1, 2, \dots` . The continuous-time version is a **continuous-time Markov chain** (see [Poisson processes](./Poisson-processes.md), whose exponential clocks drive the jumps). The *state space* $`S` may be discrete or continuous:

- **Discrete state space** — the chain is described by a **transition matrix** $`P` (this page).
- **Continuous state space** — there is no matrix; the chain is described by a **transition kernel** $`K(x, A) = \mathbb{P}(X_{t+1} \in A \mid X_t = x)` , a function of the current point $`x` and a set $`A` .

Everything below is for the discrete-time, discrete-state case, where the matrix $`P` is the central object.

Builds on [Random variables and expectation](../Random-variables-and-expectation.md) and [Conditional probability](../Conditional-probability.md); hitting-time estimates are a [martingale](./Martingales.md) application.

## Brief history

- **Markov (1906)** — *On the theory of probabilities* introduced chains and proved convergence to a stationary distribution.
- **Ehrenfest (1911)** — the urn model applied chains to gas diffusion, the first physical use.
- **Chapman & Kolmogorov (1931)** — the Chapman–Kolmogorov equations for multi-step transitions.
- **Perron–Frobenius / modern ergodic theory** — spectral tools that give existence, uniqueness, and the rate of convergence to stationarity.

## 1. The Markov property and definition

**Definition.** A stochastic process $`(X_t)_{t \ge 0}` on a state space $`S` is a **Markov chain** if, for all states $`x_0, \dots, x_{t-1}, i, j \in S` ,

```math
\mathbb{P}(X_{t+1} = j \mid X_t = i, X_{t-1} = x_{t-1}, \dots, X_0 = x_0)
= \mathbb{P}(X_{t+1} = j \mid X_t = i).
```

The whole future is pinned down by the present state $`i` . By the chain rule of [conditional probability](../Conditional-probability.md), the joint law of a whole trajectory **factorizes**:

```math
\mathbb{P}(X_0 = x_0, X_1 = x_1, \dots, X_n = x_n)
= \mathbb{P}(X_0 = x_0)\, \prod_{k=1}^{n} \mathbb{P}(X_k = x_k \mid X_{k-1} = x_{k-1}).
```

This is the single most useful identity: a long, complicated path probability collapses into one initial probability times a product of one-step probabilities.

<details><summary>Details</summary>

**Why the property is powerful.** Without the Markov property, the probability of a path of length $`n` would require conditioning on the entire history $`(x_0, \dots, x_{n-1})` — an object that grows with $`n` . The Markov property says that conditioning on the history is *redundant*: the last state $`x_{n-1}` already carries all the information the future needs. That is what makes chains computable and simulable.

**Concrete example: a weather chain.** Let $`S = \{\text{Sunny}, \text{Rainy}\}` . Suppose

- if today is Sunny, tomorrow is Sunny with probability $`0.8` and Rainy with $`0.2` ;
- if today is Rainy, tomorrow is Sunny with probability $`0.5` and Rainy with $`0.5` .

The Markov assumption is that "tomorrow's weather depends on today's weather, not on the whole week so far." The probability of the specific 3-day path Sunny → Sunny → Rainy is

```math
\mathbb{P}(\text{Sunny}) \cdot 0.8 \cdot 0.2,
```

one initial probability times two one-step factors — no need to remember the day before.

<iframe src="./Markov-chains.simulation.html" title="Random walk on a 4-state chain: step through and watch the empirical state frequencies converge to the stationary distribution"></iframe>

The simulation above runs a 4-state chain. Each **Step** applies one transition; the bar chart tracks how often each state has been visited, and you can watch those empirical frequencies settle onto the theoretical stationary distribution $`\pi` (Section 3).

**Authoritative sources.**

> **Authoritative sources**
> - [A. A. Markov, *On the theory of probabilities* (1906)](https://en.wikipedia.org/wiki/Markov_chain)
> - [J. G. Kemeny & J. L. Snell, *Finite Markov Chains* (1960)](https://en.wikipedia.org/wiki/Finite_Markov_chain)

**Example problem.**

<details><summary>Problem</summary>

A chain has states $`\{A, B\}` with $`\mathbb{P}(A \to B) = 0.3` , $`\mathbb{P}(B \to A) = 0.4` . Starting from $`A` , compute $`\mathbb{P}(X_0 = A, X_1 = B, X_2 = A)` .

<details><summary>Solution</summary>

Apply the factorization:

```math
\mathbb{P}(A) \cdot \mathbb{P}(B \mid A) \cdot \mathbb{P}(A \mid B)
= 1 \cdot 0.3 \cdot 0.4 = 0.12.
```

The initial state is fixed at $`A` (probability $`1` ), so only the two one-step factors matter.
</details>
</details>

</details>

## 2. Transition matrix and Chapman–Kolmogorov equations

**Definition.** For a discrete state space $`S = \{1, \dots, n\}` , the **transition matrix** $`P` has entries

```math
P_{ij} = \mathbb{P}(X_{t+1} = j \mid X_t = i),
```

so each row sums to $`1` ($`P` is row-stochastic). The $`n` -step transition probabilities are the matrix power $`P^{n}` :

```math
\mathbb{P}(X_{t+n} = j \mid X_t = i) = (P^{n})_{ij}.
```

The **Chapman–Kolmogorov equations** say that an $`(m+n)` -step move equals an $`m` -step move followed by an $`n` -step move, summed over the intermediate state:

```math
P^{(m+n)}_{ij} = \sum_{k \in S} P^{(m)}_{ik}\, P^{(n)}_{kj}.
```

<details><summary>Details</summary>

**Reading the matrix.** $`P_{ij}` is the probability of *leaving* $`i` and *arriving* at $`j` in one step. Because from state $`i` you must go somewhere, $`\sum_j P_{ij} = 1` . A diagonal entry $`P_{ii}` is the probability of *staying put*.

**Why $`P^n` works.** The $`(i, j)` entry of $`P^2` is $`\sum_k P_{ik} P_{kj}` : go from $`i` to some intermediate $`k` , then from $`k` to $`j` . This is exactly the Chapman–Kolmogorov equation with $`m = n = 1` , and it is just the chain rule of conditional probability plus the law of total probability. Matrix multiplication is doing the "sum over the forgotten intermediate state" for you.

**Concrete example.** Take the weather chain of Section 1, with $`S = \{\text{Sunny}, \text{Rainy}\}` and

```math
P = \begin{pmatrix} 0.8 & 0.2 \\ 0.5 & 0.5 \end{pmatrix}.
```

The probability of being Rainy two days from now, given it is Sunny today, is $`(P^2)_{12}` :

```math
(P^2)_{12} = P_{11}P_{12} + P_{12}P_{22} = 0.8 \cdot 0.2 + 0.2 \cdot 0.5 = 0.21.
```

The intermediate day is Sunny with probability $`0.8` (contributing $`0.8 \cdot 0.2` ) or Rainy with probability $`0.2` (contributing $`0.2 \cdot 0.5` ).

**Authoritative sources.**

> **Authoritative sources**
> - [Chapman–Kolmogorov equations](https://en.wikipedia.org/wiki/Chapman%E2%80%93Kolmogorov_equations)
> - [J. G. Kemeny & J. L. Snell, *Finite Markov Chains* (1960)](https://en.wikipedia.org/wiki/Finite_Markov_chain)

**Example problem.**

<details><summary>Problem</summary>

With the weather matrix above, compute the full matrix $`P^2` .

<details><summary>Solution</summary>

```math
P^2 = \begin{pmatrix} 0.8 & 0.2 \\ 0.5 & 0.5 \end{pmatrix}^2
= \begin{pmatrix} 0.8\cdot0.8 + 0.2\cdot0.5 & 0.8\cdot0.2 + 0.2\cdot0.5 \\
0.5\cdot0.8 + 0.5\cdot0.5 & 0.5\cdot0.2 + 0.5\cdot0.5 \end{pmatrix}
= \begin{pmatrix} 0.74 & 0.26 \\ 0.65 & 0.35 \end{pmatrix}.
```

Each row still sums to $`1` — $`P^2` is also a transition matrix, as it must be.
</details>
</details>

</details>

## 3. Stationary distributions and ergodicity

**Definition.** A probability vector $`\pi` (so $`\sum_i \pi_i = 1` , $`\pi_i \ge 0` ) is a **stationary distribution** if

```math
\pi P = \pi.
```

If the chain is **irreducible** and **aperiodic** (Section 4), then $`\pi` exists, is **unique**, and the chain **converges** to it from any starting state:

```math
\lim_{n \to \infty} P^{n} = \mathbf{1}\, \pi,
```

i.e. every row of $`P^n` tends to $`\pi` . This is the **ergodic theorem** for finite Markov chains.

<details><summary>Details</summary>

**What "stationary" means.** If the chain *starts* in $`\pi` — that is, $`\mathbb{P}(X_0 = i) = \pi_i` — then it stays in $`\pi` forever: $`\mathbb{P}(X_{t+1} = j) = \sum_i \pi_i P_{ij} = (\pi P)_j = \pi_j` . The distribution is a fixed point of the update rule.

**Existence and uniqueness.** For a finite chain, irreducibility (every state reachable from every other) guarantees that a stationary distribution exists and is unique. Aperiodicity (no deterministic "clock" forcing returns to a fixed rhythm) guarantees that the chain actually *converges* to it rather than oscillating. The rate of convergence is governed by the second-largest eigenvalue of $`P` in magnitude — the Perron–Frobenius theory.

**Concrete example.** For the weather chain, solve $`\pi P = \pi` with $`\pi_1 + \pi_2 = 1` :

```math
\pi_1 = 0.8\,\pi_1 + 0.5\,\pi_2, \qquad \pi_2 = 0.2\,\pi_1 + 0.5\,\pi_2.
```

From the first equation, $`0.2\,\pi_1 = 0.5\,\pi_2` , so $`\pi_1 = 2.5\,\pi_2` . With $`\pi_1 + \pi_2 = 1` this gives $`\pi_2 = 1/3.5 \approx 0.286` and $`\pi_1 \approx 0.714` . So in the long run it is Sunny about $`71\%` of the time. You can verify in the simulation that the empirical bars settle near the theoretical $`\pi` .

**Authoritative sources.**

> **Authoritative sources**
> - [Stationary distribution](https://en.wikipedia.org/wiki/Stationary_distribution)
> - [Perron–Frobenius theorem](https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem)

**Example problem.**

<details><summary>Problem</summary>

A 3-state chain has transition matrix

```math
P = \begin{pmatrix} 0.5 & 0.5 & 0 \\ 0 & 0.5 & 0.5 \\ 0.5 & 0 & 0.5 \end{pmatrix}.
```

Find the stationary distribution $`\pi` .

<details><summary>Solution</summary>

Solve $`\pi P = \pi` with $`\pi_1 + \pi_2 + \pi_3 = 1` :

- $`\pi_1 = 0.5\,\pi_1 + 0.5\,\pi_3 \Rightarrow \pi_1 = \pi_3`
- $`\pi_2 = 0.5\,\pi_1 + 0.5\,\pi_2 \Rightarrow \pi_2 = \pi_1`
- $`\pi_3 = 0.5\,\pi_2 + 0.5\,\pi_3 \Rightarrow \pi_3 = \pi_2`

All three are equal, so $`\pi_1 = \pi_2 = \pi_3 = 1/3` .
</details>
</details>

</details>

## 4. Classification of states

**Definition.** For a state $`i` , let $`f_i` be the probability that the chain, starting from $`i` , ever returns to $`i` .

- **Recurrent** if $`f_i = 1` (you come back with probability $`1` ); **transient** if $`f_i < 1` (there is a real chance you never return).
- The chain is **irreducible** if every state can be reached from every other state.
- The **period** of $`i` is $`d = \gcd\{ n \ge 1 : (P^n)_{ii} > 0 \}` ; the state is **aperiodic** if $`d = 1` .

<details><summary>Details</summary>

**Recurrent vs transient, intuitively.** A recurrent state is one you are *doomed* to revisit; a transient state is one you may visit a few times and then abandon forever. In a finite chain, irreducibility forces *every* state to be recurrent (you cannot "escape to infinity" when there are only finitely many states). Transience only appears in infinite chains, e.g. the simple random walk on $`\mathbb{Z}^3` is transient.

**The return-probability criterion.** The cleanest test is $`f_i` : compute the probability of ever returning to $`i` after leaving it. If it is $`1` , the state is recurrent; otherwise transient. Equivalently, a state is recurrent iff the expected number of visits to it (starting from itself) is infinite.

**Periodicity, intuitively.** A state with period $`d > 1` can only be revisited at times that are multiples of $`d` — the chain is trapped on a $`d` -cycle. Example: a chain that alternates deterministically between two states has period $`2` . Aperiodicity ($`d = 1` ) is what lets the chain "forget its phase" and converge to a single stationary distribution; a periodic chain instead oscillates. A single self-loop ($`P_{ii} > 0` ) is the easiest way to guarantee aperiodicity.

**Concrete example.** Consider a 3-state chain where $`1 \to 2` and $`2 \to 1` happen with probability $`1` , and state $`3` is reachable from $`1` but never returns. Then $`3` is **transient** (once you leave $`3` you never come back, and you can even fail to reach it), while $`\{1, 2\}` form a closed, period-$`2` class.

**Authoritative sources.**

> **Authoritative sources**
> - [Recurrent and transient states](https://en.wikipedia.org/wiki/Markov_chain#Classification_of_states)
> - [J. G. Kemeny & J. L. Snell, *Finite Markov Chains* (1960)](https://en.wikipedia.org/wiki/Finite_Markov_chain)

**Example problem.**

<details><summary>Problem</summary>

A chain has states $`\{1, 2, 3\}` with $`P_{12} = 1` , $`P_{21} = 1` , $`P_{31} = 0.5` , $`P_{33} = 0.5` . Classify each state and give the period of state $`1` .

<details><summary>Solution</summary>

From $`3` you can jump to $`1` (and then wander in $`\{1,2\}` ) or stay at $`3` ; but from $`\{1,2\}` you can never reach $`3` . So $`3` is **transient** (you may leave it and never return), while $`1` and $`2` are **recurrent** (closed class). State $`1` is revisited only at even times ($`1 \to 2 \to 1 \to \dots` ), so its period is $`2` .
</details>
</details>

</details>

## 5. Hitting times and expected hitting times

**Definition.** For a set of states $`A \subseteq S` , the **hitting time** is $`T_A = \inf\{ t \ge 0 : X_t \in A \}` . The **expected hitting time** from state $`i` is $`h_i = \mathbb{E}_i[T_A]` . It satisfies the linear system

```math
h_i = 0 \ (i \in A), \qquad h_i = 1 + \sum_{j \in S} P_{ij}\, h_j \ (i \notin A).
```

<details><summary>Details</summary>

**Why the linear system.** If $`i \in A` you have already arrived, so $`h_i = 0` . If $`i \notin A` , you spend one step (the leading $`1` ) and then, having moved to $`j` with probability $`P_{ij}` , still need $`h_j` more steps on average. Taking expectation over the next state gives $`h_i = 1 + \sum_j P_{ij} h_j` . This is a system of linear equations in the unknowns $`h_i` for $`i \notin A` , and it has a unique solution whenever $`A` is reachable from every state.

**Gambler's ruin — the canonical example.** A gambler with $`i` dollars bets $`1` dollar at a time, winning with probability $`p` and losing with probability $`q = 1 - p` , until reaching $`0` (broke) or $`N` (goal). The states are $`\{0, 1, \dots, N\}` with $`P_{i,i+1} = p` , $`P_{i,i-1} = q` . The expected duration $`h_i` solves $`h_i = 1 + p\,h_{i+1} + q\,h_{i-1}` with $`h_0 = h_N = 0` . For the fair game $`p = q = 1/2` the solution is the parabola $`h_i = i(N - i)` .

**Connection to martingales.** The fair gambler's fortune is a [martingale](./Martingales.md); the optional stopping theorem gives the *probability* of reaching $`N` before $`0` in one line, while the hitting-time *duration* above comes from the squared fortune, which is a submartingale.

**Authoritative sources.**

> **Authoritative sources**
> - [Gambler's ruin](https://en.wikipedia.org/wiki/Gambler%27s_ruin)
> - [J. G. Kemeny & J. L. Snell, *Finite Markov Chains* (1960)](https://en.wikipedia.org/wiki/Finite_Markov_chain)

**Example problem.**

<details><summary>Problem</summary>

A fair gambler starts with $`2` dollars and plays until reaching $`0` or $`4` . What is the expected number of bets?

<details><summary>Solution</summary>

Here $`N = 4` , $`i = 2` , and the fair-game formula gives $`h_i = i(N - i) = 2 \cdot (4 - 2) = 4` bets on average.
</details>
</details>

</details>

## 6. Applications

**Definition.** Markov chains are the engine behind a wide range of models and algorithms; the unifying idea is always "the next state is a probabilistic function of the current one."

<details><summary>Details</summary>

- **PageRank.** The web is a directed graph; a "random surfer" who follows links at random is a Markov chain on pages. PageRank is its stationary distribution $`\pi` (with a damping factor to keep the chain irreducible and aperiodic). The most important pages are the ones the surfer occupies most often in the long run.
- **MCMC (Metropolis–Hastings).** To sample from a hard-to-normalize target distribution, one *builds* a Markov chain whose stationary distribution is exactly the target, runs it, and reads off samples. Ergodicity (Section 3) guarantees the samples converge to the target.
- **Ehrenfest urn.** Two urns exchange one of $`N` particles at random each step — the 1911 model of gas diffusion. It is a birth–death chain whose stationary distribution is binomial, and it is the discrete precursor of Brownian motion.
- **Queues.** The number of customers in a queue evolves as a Markov chain (a birth–death process); its stationary distribution gives the long-run occupancy and waiting times.

**Authoritative sources.**

> **Authoritative sources**
> - [PageRank](https://en.wikipedia.org/wiki/PageRank)
> - [Markov chain Monte Carlo](https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo)
> - [Ehrenfest urn model](https://en.wikipedia.org/wiki/Ehrenfest_urn_model)

</details>

## Quizz

<details><summary>Try it yourself</summary>

A 3-state chain has transition matrix

```math
P = \begin{pmatrix} 0.5 & 0.5 & 0 \\ 0.2 & 0.4 & 0.4 \\ 0 & 0.5 & 0.5 \end{pmatrix}.
```

(a) Find the stationary distribution $`\pi` .
(b) Starting from state $`1` , find the expected hitting time of state $`3` .

<details><summary>Solution</summary>

**(a)** Solve $`\pi P = \pi` with $`\sum \pi_i = 1` :

- $`\pi_1 = 0.5\,\pi_1 + 0.2\,\pi_2 \Rightarrow 0.5\,\pi_1 = 0.2\,\pi_2 \Rightarrow \pi_2 = 2.5\,\pi_1`
- $`\pi_3 = 0.4\,\pi_2 + 0.5\,\pi_3 \Rightarrow 0.5\,\pi_3 = 0.4\,\pi_2 \Rightarrow \pi_3 = 0.8\,\pi_2 = 2\,\pi_1`

So $`\pi_1 + 2.5\,\pi_1 + 2\,\pi_1 = 1 \Rightarrow 5.5\,\pi_1 = 1 \Rightarrow \pi_1 = 2/11` , $`\pi_2 = 5/11` , $`\pi_3 = 4/11` .

**(b)** Let $`h_i = \mathbb{E}_i[T_3]` . Then $`h_3 = 0` and

```math
h_1 = 1 + 0.5\,h_1 + 0.5\,h_2, \qquad h_2 = 1 + 0.2\,h_1 + 0.4\,h_2 + 0.4\cdot 0.
```

From the first: $`0.5\,h_1 = 1 + 0.5\,h_2 \Rightarrow h_1 = 2 + h_2` . From the second: $`0.6\,h_2 = 1 + 0.2\,h_1 \Rightarrow h_2 = \tfrac{5}{3} + \tfrac{1}{3}h_1` . Substituting: $`h_1 = 2 + \tfrac{5}{3} + \tfrac{1}{3}h_1 \Rightarrow \tfrac{2}{3}h_1 = \tfrac{11}{3} \Rightarrow h_1 = 5.5` steps.
</details>

</details>

