# Gradient Descent

Given a differentiable loss $`f: \mathbb{R}^d \to \mathbb{R}`, gradient descent iterates:

```math
\theta_{t+1} = \theta_t - \eta \nabla f(\theta_t)
```

where $`\eta > 0` is the learning rate. For $`f` $`\mu`-strongly convex and $`L`-smooth (Lipschitz gradient), $`\eta = 1/L` gives linear convergence: $`f(\theta_t) - f^* \leq (1 - \mu/L)^t (f(\theta_0) - f^*)`. Gradient descent is the workhorse algorithm for training neural networks, fitting regression models, and solving any differentiable optimization problem at scale.

> **Authoritative sources**
> - [Convex Optimization (Boyd & Vandenberghe)](https://web.stanford.edu/~boyd/cvxbook/)
> - [Adam: A Method for Stochastic Optimization (Kingma & Ba, 2015)](https://arxiv.org/abs/1412.6980)
> - [On the Convergence of Stochastic Gradient Descent with Adaptive Learning Rates (Reddi et al., 2018)](https://arxiv.org/abs/1803.06455)

## Batch gradient descent

**Definition**: batch GD uses the full dataset: $`\nabla f = \frac{1}{n}\sum_i \nabla \ell_i(\theta)`. One pass over the data is an **epoch**. Cost per step: $`O(nd)`. For $`\mu`-strongly convex, $`L`-smooth $`f`, the convergence rate is $`f(\theta_t) - f^* \leq (1 - \mu/L)^t (f(\theta_0) - f^*)`.

<details><summary>Details</summary>

**The learning rate**: the step size $`\eta` controls the tradeoff between speed and stability.
- $`\eta` too large: the iteration overshoots the minimum and diverges (violates the contraction condition $`\eta < 2/L`).
- $`\eta` too small: convergence is slow (the contraction factor $`\rho \approx 1 - \eta\mu` is close to 1).
- $`\eta = 1/L`: the optimal choice for strongly convex problems; gives the fastest linear convergence.

**The epoch**: in practice, data is processed in passes. One **epoch** is one complete pass over all $`n` training examples. The total number of gradient steps is $`\text{epochs} \times \lceil n/b \rceil` where $`b` is the batch size.

**Example**: minimizing $`f(x) = 5x^2` from $`x_0 = 1` with $`\eta = 0.1` (the optimal $`1/L` where $`L = 10`): $`x_1 = 1 - 0.1 \times 10 = 0`. Converged in one step.

**Example problem**:

<details><summary>Problem</summary>

Minimize $`f(x, y) = x^2 + 10y^2` by batch gradient descent from $`(x_0, y_0) = (1, 1)` with $`\eta = 0.1`. Compute the first two steps and identify the convergence bottleneck.

<details><summary>Solution</summary>

$`\nabla f = (2x, 20y)`.

- Step 1: $`(x_1, y_1) = (1 - 0.1 \times 2, 1 - 0.1 \times 20) = (0.8, -1)`
- Step 2: $`(x_2, y_2) = (0.8 - 0.1 \times 1.6, -1 - 0.1 \times (-20)) = (0.64, 1)`

The $`y`-coordinate oscillates (sign flips each step) because $`\eta = 0.1` is at the boundary of stability for the $`y`-direction ($`L_y = 20`, so $`\eta < 2/20 = 0.1` is required; $`\eta = 0.1` is exactly at the boundary). The $`x`-direction converges smoothly. This **ill-conditioning** (ratio $`L/\mu = 10`) is the bottleneck: the narrow valley in the $`y`-direction forces a small step, which slows progress in the $`x`-direction. Momentum (below) addresses this.

</details>

</details>

</details>

## Minibatch SGD

**Definition**: minibatch stochastic gradient descent (SGD) uses a random subset of size $`b`: $`\hat{\nabla} = \frac{1}{b}\sum_{i \in B} \nabla \ell_i(\theta)`. The gradient is unbiased but noisy; the noise acts as a regularizer and helps escape sharp minima and saddle points.

<details><summary>Details</summary>

**Why noise helps**: in high-dimensional non-convex landscapes, saddle points dominate local minima (Dauphin et al., 2014). The stochastic noise in SGD provides the perturbation needed to escape saddle points, which deterministic GD cannot do (it gets stuck at any critical point).

**Batch size tradeoff**:
- $`b = 1` (pure SGD): maximum noise, fastest per-step, but high variance in the gradient estimate.
- $`b = n` (batch GD): zero noise, slowest per-step, but a precise gradient.
- $`b \in [32, 256]` (typical): a practical compromise. The noise is small enough for stable training but large enough to provide regularization.

**Learning rate schedule**: in practice, $`\eta` is decayed over training (e.g., step decay, cosine annealing). A large initial $`\eta` explores the landscape; a small final $`\eta` fine-tunes the solution. This is analogous to simulated annealing in physics.

**Connection to [Regression](./Regression.md)**: the train/validation split and overfitting diagnostics from regression apply directly to SGD training. The stochastic noise in SGD acts as an implicit regularizer, often reducing the need for explicit weight decay.

**Example problem**:

<details><summary>Problem</summary>

You have $`n = 100{,}000` training examples with $`d = 512` features. Compare the per-epoch cost of batch GD vs. minibatch SGD with $`b = 256`.

<details><summary>Solution</summary>

- Batch GD: one gradient step per epoch, cost $`O(nd) = 100{,}000 \times 512 = 5.12 \times 10^7` FLOPs.
- Minibatch SGD: $`\lceil 100{,}000/256 \rceil = 391` steps per epoch, each costing $`O(bd) = 256 \times 512 = 1.31 \times 10^5` FLOPs. Total per epoch: $`391 \times 1.31 \times 10^5 \approx 5.12 \times 10^7` FLOPs.

The total FLOPs per epoch are the same (you still touch every example once). The difference is in the **number of parameter updates**: SGD makes 391 updates per epoch vs. 1 for batch GD. More updates means faster progress toward the minimum (each update moves the parameters), at the cost of noisier gradients.

</details>

</details>

</details>

## Momentum

**Definition**: momentum (Polyak, 1964) maintains a velocity $`v_t = \beta v_{t-1} + (1-\beta)\nabla f(\theta_t)` and updates $`\theta_{t+1} = \theta_t - \eta v_t`. It damps oscillations in narrow valleys and accelerates progress in consistent directions.

<details><summary>Details</summary>

**Intuition**: imagine a ball rolling in a landscape. Without momentum, the ball stops at every small bump. With momentum, the ball builds up speed in consistent directions and plows through small bumps. In a narrow valley (high curvature in one direction, low in another), the oscillations in the high-curvature direction cancel out (the velocity averages to zero), while the progress in the low-curvature direction accumulates.

**The effective learning rate**: with momentum, the effective step size in a consistent direction is $`\eta/(1-\beta)`. For $`\beta = 0.9`, the effective learning rate is $`10\eta`. This allows a larger nominal $`\eta` without instability, because the oscillatory components are damped.

**Nesterov momentum**: a refinement that looks ahead: $`v_t = \beta v_{t-1} + (1-\beta)\nabla f(\theta_t - \eta v_{t-1})`. The gradient is evaluated at the predicted next position, not the current one. This gives a small but consistent improvement in convergence rate.

**Example problem**:

<details><summary>Problem</summary>

Minimize $`f(x) = 5x^2` from $`x_0 = 1` with momentum $`\beta = 0.9` and $`\eta = 0.2`. Compute $`x_1` and $`x_2`.

<details><summary>Solution</summary>

$`\nabla f(x) = 10x`.

- Step 1: $`v_1 = 0.9 \times 0 + 0.1 \times 10 = 1`. $`x_1 = 1 - 0.2 \times 1 = 0.8`.
- Step 2: $`v_2 = 0.9 \times 1 + 0.1 \times 8 = 1.7`. $`x_2 = 0.8 - 0.2 \times 1.7 = 0.46`.

Without momentum ($`\beta = 0`), the same $`\eta = 0.2` would give: $`x_1 = 1 - 0.2 \times 10 = -1` (diverges! The stability condition is $`\eta < 2/L = 0.2`, and $`\eta = 0.2` is at the boundary). With momentum, the effective step is damped in the oscillatory direction, so the iteration remains stable and converges.

</details>

</details>

</details>

## Adam

**Definition**: Adam (Kingma & Ba, 2015) maintains a first moment $`m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t` and a second moment $`v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2`, then updates $`\theta_{t+1} = \theta_t - \eta \, \hat{m}_t / (\sqrt{\hat{v}_t} + \varepsilon)` where $`\hat{m}_t = m_t/(1-\beta_1^t)` and $`\hat{v}_t = v_t/(1-\beta_2^t)` are bias-corrected estimates. The per-coordinate adaptive step size makes Adam robust to sparse gradients.

<details><summary>Details</summary>

**Why adaptive step sizes help**: in neural networks, different parameters have very different gradient scales. Embedding table entries for rare tokens have sparse, large gradients; bias terms have small, dense gradients. Adam normalizes each coordinate by its historical gradient magnitude, so all parameters receive comparable step sizes.

**Typical hyperparameters**: $`\beta_1 = 0.9`, $`\beta_2 = 0.999`, $`\varepsilon = 10^{-8}`, $`\eta = 10^{-3}` to $`10^{-4}`. These defaults work well across most problems, which is why Adam became the default optimizer for deep learning.

**Convergence**: Adam does not converge for all problems (Reddi et al., 2018 showed a counterexample). In practice, it works well for non-convex deep learning objectives. For convex problems, SGD with a proper learning rate schedule is often preferable.

**Connection to [Neural Networks](../Learning-Paradigms-and-Models.md)**: Adam is the default optimizer for training neural networks. The compute section of that page covers how the gradients are computed (backpropagation) and how they are applied in parallel on GPUs.

**Example problem**:

<details><summary>Problem</summary>

For a single parameter with $`\beta_1 = 0.9`, $`\beta_2 = 0.999`, $`\varepsilon = 0`, and constant gradient $`g_t = 1` for all $`t`, compute the Adam update at $`t = 1` and $`t = 100`.

<details><summary>Solution</summary>

At $`t = 1`: $`m_1 = 0.1 \times 1 = 0.1`, $`v_1 = 0.001 \times 1 = 0.001`. Bias-corrected: $`\hat{m}_1 = 0.1/0.1 = 1`, $`\hat{v}_1 = 0.001/0.001 = 1`. Update: $`\eta \times 1/\sqrt{1} = \eta`.

At $`t = 100`: $`m_{100} \approx 1` (converged), $`v_{100} \approx 1` (converged). Bias-corrected: $`\hat{m}_{100} \approx 1`, $`\hat{v}_{100} \approx 1`. Update: $`\eta \times 1/\sqrt{1} = \eta`.

For a constant gradient, Adam reduces to plain gradient descent with step size $`\eta`. The adaptive mechanism only matters when the gradient magnitude varies across coordinates or over time.

</details>

</details>

</details>

## Loss landscape

**Definition**: for non-convex $`f`, the landscape has saddle points, local minima, and plateaus. In high dimensions, saddle points dominate local minima, so SGD's noise helps escape them. The geometry of the loss landscape determines which optimizer and learning rate schedule will work.

<details><summary>Details</summary>

**Convex vs. non-convex**: for convex $`f`, every local minimum is global, and gradient descent with $`\eta = 1/L` converges linearly. For non-convex $`f` (neural networks), the landscape is complex:
- **Saddle points**: points where the gradient is zero but the Hessian has both positive and negative eigenvalues. In high dimensions, these are far more common than local minima.
- **Plateaus**: regions where the gradient is very small but the point is not a minimum. Adam's adaptive step size helps traverse plateaus.
- **Sharp vs. flat minima**: sharp minima (high Hessian eigenvalues) generalize poorly; flat minima (low Hessian eigenvalues) generalize well. SGD's noise implicitly prefers flat minima.

**The valley structure**: in ill-conditioned problems (large $`L/\mu` ratio), the loss landscape has narrow valleys. Gradient descent oscillates across the valley while slowly descending. Momentum and adaptive methods (Adam) address this by damping the oscillatory component.

<iframe src="../Optimization-and-Differentiation.simulation.html" title="Interactive gradient descent on a 2D loss landscape with adjustable learning rate and momentum"></iframe>

**Example problem**:

<details><summary>Problem</summary>

A 1000-parameter neural network has a loss landscape with condition number $`\kappa = L/\mu = 100`. Compare the number of iterations for batch GD (optimal $`\eta`) vs. momentum GD ($`\beta = 0.9`) to reduce the loss by a factor of $`10^{-6}`.

<details><summary>Solution</summary>

- Batch GD: convergence rate $`\rho = 1 - \mu/L = 1 - 1/100 = 0.99`. Need $`0.99^t < 10^{-6}`, so $`t > \log(10^{-6})/\log(0.99) \approx 1382` iterations.
- Momentum GD: the effective condition number is reduced. With $`\beta = 0.9`, the effective rate is approximately $`\rho_{\text{eff}} \approx 1 - \sqrt{\mu/L} = 1 - 0.1 = 0.9`. Need $`0.9^t < 10^{-6}`, so $`t > \log(10^{-6})/\log(0.9) \approx 132` iterations.

Momentum reduces the iteration count by a factor of $`\sqrt{\kappa} = 10`, which is the well-known acceleration from the condition number.

</details>

</details>

</details>

## Quiz

**Problem**: You have a 2-layer MLP with 784 inputs, 128 hidden units (ReLU), and 10 outputs (softmax). Compute the number of trainable parameters and the FLOPs for one forward pass on a single example. Then estimate the FLOPs for one full training step (forward + backward).

<details><summary>Solution</summary>

**Parameters**:
- Layer 1: $`W_1 \in \mathbb{R}^{128 \times 784}` → $`128 \times 784 = 100{,}352` weights + $`128` biases = $`100{,}480`.
- Layer 2: $`W_2 \in \mathbb{R}^{10 \times 128}` → $`10 \times 128 = 1{,}280` weights + $`10` biases = $`1{,}290`.
- Total: $`101{,}770` parameters.

**FLOPs (forward)**:
- Layer 1: $`2 \times 128 \times 784 = 200{,}704` (multiply-accumulate counts as 2 FLOPs).
- Layer 2: $`2 \times 10 \times 128 = 2{,}560`.
- Total: $`\approx 203{,}264` FLOPs per example.

**Backpropagation** costs 2× the forward FLOPs: 1× forward for activation gradients (error signals) + 1× forward for weight gradients. Total training step = 3× forward ≈ $`610{,}000` FLOPs.

</details>