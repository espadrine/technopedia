# Fixed-point Iteration

A **fixed point** of a map $`g: \mathbb{R}^d \to \mathbb{R}^d` is a point $`x^*` with $`x^* = g(x^*)`. The iteration $`x_{t+1} = g(x_t)` converges to $`x^*` if $`g` is a contraction near $`x^*`. Fixed-point iteration is the general framework underlying Newton's method, gradient descent, and many iterative solvers. It is relevant whenever a solution can be expressed as the self-consistent condition $`x = g(x)` and refined by repeated application.

> **Authoritative sources**
> - [Numerical Analysis (Burden & Faires)](https://www.elsevier.com/books/numerical-analysis/burden/978-0-12-371193-3)
> - [Convex Optimization (Boyd & Vandenberghe)](https://web.stanford.edu/~boyd/cvxbook/)

## Contraction mapping and convergence

**Definition**: if $`g` is differentiable and $`\|g'(x^*)\| \leq \rho < 1`, then for $`x_0` close enough to $`x^*`, the iteration $`x_{t+1} = g(x_t)` converges **linearly**: $`\|x_t - x^*\| \leq \rho^t \|x_0 - x^*\|`.

<details><summary>Details</summary>

**Intuition**: a contraction mapping "shrinks" distances. If $`g` brings every point closer to $`x^*` by a factor of at least $`\rho < 1`, then repeated application must converge. The rate $`\rho` determines how many iterations are needed: to reach precision $`\varepsilon`, we need $`t > \log(\varepsilon / \|x_0 - x^*\|) / \log \rho`.

**Example**: the fixed point of $`g(x) = \cos(x)` is $`x^* \approx 0.739085`. Since $`|g'(x^*)| = |\sin(x^*)| \approx 0.674 < 1`, convergence is linear with rate $`\rho \approx 0.674`. To reach $`10^{-6}` precision from $`x_0 = 1`: $`t > \log(10^{-6})/\log(0.674) \approx 37` iterations.

**When the contraction fails**: if $`\|g'(x^*)\| \geq 1`, the iteration diverges or oscillates. One can sometimes find a different map $`g_{\text{alt}}` with the same fixed point but $`\|g_{\text{alt}}'(x^*)\| < 1` (e.g., damped iteration $`g_d(x) = (1-\alpha)x + \alpha g(x)` for $`\alpha \in (0,1)`).

**Example problem**:

<details><summary>Problem</summary>

Apply fixed-point iteration $`x_{t+1} = \cos(x_t)` starting from $`x_0 = 1` to find the fixed point of $`\cos`. How many iterations to reach $`|x_t - x^*| < 10^{-6}`?

<details><summary>Solution</summary>

The fixed point is $`x^* \approx 0.739085`. Since $`|\sin(x^*)| \approx 0.674 < 1`, convergence is linear with rate $`\rho \approx 0.674`. We need $`0.674^t < 10^{-6}`, so $`t > \log(10^{-6})/\log(0.674) \approx 37` iterations.

</details>

</details>

</details>

## Newton's method

**Definition**: Newton's method finds roots of $`f(x) = 0` via the fixed-point iteration $`x_{t+1} = x_t - f(x_t)/f'(x_t)`. Near a simple root, it converges **quadratically**: $`\|x_t - x^*\| \approx C \|x_{t-1} - x^*\|^2`.

<details><summary>Details</summary>

**Why quadratic**: the fixed-point map is $`g(x) = x - f(x)/f'(x)`. At the root, $`g'(x^*) = 0` (the linear term vanishes), so the error is dominated by the quadratic term. This means the number of correct digits roughly **doubles** each step, making Newton's method extremely fast once close to the solution.

**Example**: finding $`\sqrt{2}` (i.e., the root of $`f(x) = x^2 - 2`). Starting from $`x_0 = 1`:
- $`x_1 = 1 - (1-2)/2 = 1.5`
- $`x_2 = 1.5 - (2.25-2)/3 = 1.4167`
- $`x_3 \approx 1.41421356` (8 correct digits)

Three steps to 8 digits: the hallmark of quadratic convergence.

**Connection to optimization**: minimizing $`f(\theta)` is equivalent to finding the root of $`\nabla f(\theta) = 0`. Newton's method for optimization uses the Hessian: $`\theta_{t+1} = \theta_t - [\nabla^2 f(\theta_t)]^{-1} \nabla f(\theta_t)`. The cost per step is $`O(d^3)` (Hessian inversion), making it impractical for high-dimensional problems. Gradient descent (see [Gradient Descent](./Gradient-Descent.md)) replaces the Hessian with a scalar learning rate, trading convergence speed for per-step cost.

**Example problem**:

<details><summary>Problem</summary>

Apply Newton's method to find the root of $`f(x) = x^3 - 2x - 5` starting from $`x_0 = 2`. Show the first two iterations and verify quadratic convergence.

<details><summary>Solution</summary>

$`f'(x) = 3x^2 - 2`.

- $`x_1 = 2 - (8-4-5)/(12-2) = 2 - (-1)/10 = 2.1`
- $`x_2 = 2.1 - (9.261 - 4.2 - 5)/(13.23 - 2) = 2.1 - 0.061/11.23 \approx 2.0946`

The true root is $`x^* \approx 2.09455`. After 2 steps we have 4 correct digits. The error went from $`|2 - x^*| \approx 0.095` to $`|2.1 - x^*| \approx 0.0055` to $`|2.0946 - x^*| \approx 0.00005`: the error squared each step (quadratic convergence).

</details>

</details>

</details>

## Gradient descent as a fixed-point iteration

**Definition**: gradient descent $`\theta_{t+1} = \theta_t - \eta \nabla f(\theta_t)` is the fixed-point iteration with $`g(\theta) = \theta - \eta \nabla f(\theta)`. The fixed point satisfies $`\nabla f(\theta^*) = 0` (a critical point). Convergence requires $`\eta < 2/L` where $`L` is the Lipschitz constant of $`\nabla f`.

<details><summary>Details</summary>

**The contraction condition**: the Jacobian of $`g` is $`g'(\theta) = I - \eta \nabla^2 f(\theta)`. For $`g` to be a contraction, we need $`\|I - \eta \nabla^2 f\| < 1`, which holds when $`0 < \eta < 2/L` (where $`L` is the largest eigenvalue of the Hessian, i.e., the Lipschitz constant of the gradient).

**Why the upper bound matters**: if $`\eta > 2/L`, the iteration overshoots the minimum and diverges. If $`\eta` is too small, convergence is slow (the contraction factor $`\rho \approx 1 - \eta\mu` is close to 1). The optimal choice $`\eta = 1/L` gives the fastest linear convergence for strongly convex problems.

**Connection to the contraction framework**: this is exactly the contraction mapping theorem applied to $`g(\theta) = \theta - \eta \nabla f(\theta)`. The rate $`\rho = 1 - \eta\mu` (for $`\mu`-strongly convex $`f`) determines the number of iterations to reach precision $`\varepsilon`: $`t > \log(\varepsilon) / \log(\rho)`.

See [Gradient Descent](./Gradient-Descent.md) for the full treatment of learning rates, momentum, and stochastic variants.

**Example problem**:

<details><summary>Problem</summary>

Minimize $`f(x) = 5x^2` by gradient descent from $`x_0 = 1`. Find the range of $`\eta` for which the iteration converges, and the optimal $`\eta`.

<details><summary>Solution</summary>

$`f'(x) = 10x`, so the iteration is $`x_{t+1} = x_t - 10\eta x_t = (1 - 10\eta) x_t`.

This is a fixed-point iteration with $`g(x) = (1-10\eta)x`. The fixed point is $`x^* = 0`. Convergence requires $`|1 - 10\eta| < 1`, i.e., $`0 < \eta < 0.2`.

The optimal choice is $`\eta = 1/L = 1/10 = 0.1`. With this rate, $`x_{t+1} = (1 - 10 \times 0.1)\, x_t = 0`, so the iteration converges in a single step: $`x_1 = 0 = x^*`. For any $`\eta \in (0, 0.2)` the iteration converges linearly with rate $`\rho = |1 - 10\eta|`; the smaller $`\eta` is, the closer $`\rho` is to 1 and the slower the convergence.

</details>

</details>

</details>
<iframe src="./Fixed-point-Iteration.simulation.html" title="Interactive fixed-point iteration: staircase convergence for different maps"></iframe>

## Quiz

<details><summary>Problem</summary>

Consider the iteration $`x_{t+1} = x_t - 0.1(x_t^2 - 4)` (Newton's method for $`\sqrt{4}` with a damping factor). Starting from $`x_0 = 1`, compute $`x_1` and $`x_2`, and determine whether the iteration is converging.

<details><summary>Solution</summary>

$`x_1 = 1 - 0.1(1 - 4) = 1 + 0.3 = 1.3`
$`x_2 = 1.3 - 0.1(1.69 - 4) = 1.3 + 0.231 = 1.531`

The true root is $`x^* = 2`. The errors are $`|1-2| = 1`, $`|1.3-2| = 0.7`, $`|1.531-2| = 0.469`. The error is decreasing, so the iteration is converging. However, the convergence is not quadratic (the damping factor 0.1 slows it down); it is linear with a rate that depends on the local curvature. Without damping (full Newton: $`x_{t+1} = x_t - (x_t^2-4)/(2x_t)`), convergence would be quadratic once close to the root.

</details>

</details>