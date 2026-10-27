# Stochastic processes

A stochastic process is a family of random variables $`(X_t)_{t \in T}`$ indexed by time: instead of asking "what is the probability of an outcome?", it asks "how does a random quantity evolve?". It is the natural language for queues, population dynamics, financial prices, signal noise, and physical diffusion.

## Brief history

- Bachelier (1900) and Einstein (1905) modeled Brownian motion, five years before Perrin's experiments confirmed it.
- Kolmogorov (1931) introduced Markov processes and the Chapman–Kolmogorov equations.
- Doob (1940s–1953) developed martingale theory and the optional stopping theorem.
- Itô (1944) built stochastic calculus, making differential equations with noise solvable.

## Classes

The classes below are organized along two first-principles axes: the **time index** (discrete vs continuous) and the **path behavior** (counting jumps, continuous diffusion, or both). Two **unifying families** cut across the process families: Lévy processes generalize the increment structure, and Gaussian processes characterize everything through the covariance kernel. The **martingale property** is not a family of processes but a structural property a process from any family may have: Brownian motion is a martingale, and the compensated Poisson process $`N_t - \lambda t`$ is a martingale.

<table>
<tr><th>Page</th><th>Class</th><th>Nature</th><th>What it studies</th><th>Key objects</th></tr>
<tr><td><a href='./Markov-chains.md'>Markov chains</a></td><td>Markov chains</td><td>Process family (discrete time, memoryless)</td><td>Step-by-step evolution where the future depends on the present state only</td><td>Transition matrix, stationary distribution, hitting times</td></tr>
<tr><td><a href='./Poisson-processes.md'>Poisson processes</a></td><td>Poisson processes</td><td>Process family (continuous time, counting)</td><td>Counts of events occurring independently at a constant rate</td><td>Arrival times, inter-arrivals, thinning, superposition</td></tr>
<tr><td><a href='./Brownian-motion.md'>Brownian motion</a></td><td>Brownian motion and diffusions</td><td>Process family (continuous time, continuous paths)</td><td>The scaling limit of random walks; continuous random paths</td><td>Wiener process, quadratic variation, Itô calculus, SDEs</td></tr>
<tr><td><a href='./Levy-processes.md'>Lévy processes</a></td><td>Lévy processes</td><td>Unifying family (drift + diffusion + jumps)</td><td>Processes with stationary independent increments</td><td>Lévy–Itô decomposition, Lévy–Khintchine triplet, subordinators</td></tr>
<tr><td><a href='./Martingales.md'>Martingales</a></td><td>Martingales</td><td>Structural property (cross-cutting)</td><td>Fair games: the conditional expectation of the future equals the present</td><td>Optional stopping, Doob's inequalities, convergence theorems</td></tr>
<tr><td><a href='./Gaussian-processes.md'>Gaussian processes</a></td><td>Gaussian processes</td><td>Unifying family (all finite-dimensional laws Gaussian)</td><td>Processes fully specified by a mean and a covariance kernel; includes spatial random fields</td><td>Covariance kernels, kriging, GP regression</td></tr>
</table>

<details><summary>Details</summary>

The classes answer different questions and deliberately overlap:

- **Markov chains** ask "what does the process remember?" Answer: only the present state. The Poisson process is a Markov process in continuous time (its future depends only on the current count), and Brownian motion is a Markov process with continuous paths.
- **Poisson processes** ask "how do events accumulate?" They are the pure-jump members of the Lévy family: the counting process $`N_t`$ jumps by one at each arrival, and the inter-arrival times are independent exponentials.
- **Brownian motion** asks "what do continuous random paths look like?" It is the scaling limit of random walks, has continuous but nowhere-differentiable paths, and is both a Markov process and a martingale.
- **Lévy processes** unify the above: they are exactly the processes with stationary independent increments, and every Lévy process decomposes into a drift, a Brownian part, and a jump part.
- **Martingales** are a structural property, not a competing family: a fair game has no predictable trend. Brownian motion and the compensated Poisson process $`N_t - \lambda t`$ are both martingales, which is why martingale tools apply across all the families above.
- **Gaussian processes** are characterized entirely by their mean and covariance functions; Brownian motion is the Gaussian process with covariance $`\min(s, t)`$, and the same framework covers spatial random fields indexed by location rather than time.

All of these build on [Random variables and expectation](../Random-variables-and-expectation.md), [Conditional probability](../Conditional-probability.md), and [Limit theorems](../Limit-theorems.md).

</details>

<iframe src="../Stochastic-processes.simulation.html" title="Interactive demo: random walks with sqrt(n) scaling converging to Brownian motion" style="width:100%;height:420px;border:1px solid #ccc;border-radius:4px;"></iframe>
