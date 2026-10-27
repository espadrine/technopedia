# Optimization and Differentiation

Optimization and differentiation provide the computational machinery for finding minima of functions: closed-form solvers for linear objectives, iterative refinement for fixed points, gradient-based methods for continuous differentiable landscapes, and parametric models (neural networks) that learn representations from data. They are relevant whenever a loss must be minimized, a derivative computed, or a model fitted to observations.

## Utility

- It finds the parameters of a model that best explain observed data.
- It computes exact derivatives of arbitrary compositions of elementary operations.
- It provides convergence guarantees for iterative solvers.
- It scales to millions of parameters via stochastic and parallel methods.

<details><summary>Details</summary>

Optimization sits at the boundary between mathematics and computation: the objective function defines the problem, and the algorithm defines the procedure. The four subtopics below are ordered from the simplest (a closed-form linear solve) to the most complex (a parametric model with learned representations trained by stochastic gradient descent). Each builds on the previous: regression motivates the need for iterative methods, fixed-point iteration provides the convergence framework, gradient descent is the workhorse algorithm, and neural networks are the dominant application.

</details>

## History

- 1810: Gauss and Legendre independently develop the method of least squares for regression.
- 1952: Rosenbrock introduces a non-convex test function that remains the standard benchmark for gradient-based optimizers.
- 1986: Rumelhart, Hinton, and Williams popularize backpropagation for training multilayer networks.
- 2015: Kingma and Ba introduce Adam, the adaptive optimizer that becomes the default for deep learning.

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key property</th><th>Boundary</th></tr>
<tr><td><a href="./Regression.md">Regression</a></td><td>Parametric model fitted to observed data by minimizing a loss</td><td>Closed-form solution for linear models; overfitting controlled by train/validation split</td><td>Does not specify the iterative solver when no closed form exists</td></tr>
<tr><td><a href="./Fixed-point-Iteration.md">Fixed-point iteration</a></td><td>Map <i>g</i> and its fixed point <i>x</i>* = <i>g</i>(<i>x</i>*)</td><td>Linear convergence under contraction; quadratic for Newton's method</td><td>Does not require the map to be a gradient; general framework for iterative refinement</td></tr>
<tr><td><a href="./Gradient-Descent.md">Gradient descent</a></td><td>Differentiable loss <i>f</i> and its gradient ∇<i>f</i></td><td>Convergence rate governed by smoothness <i>L</i> and strong convexity <i>μ</i>; stochastic variants scale to large data</td><td>Requires differentiability; does not handle discrete or non-smooth objectives directly</td></tr>
<tr><td><a href="../Learning-Paradigms-and-Models.md">Neural networks</a></td><td>Parametric model with learned representations, trained by gradient descent</td><td>Architecture, loss, data paradigm, and compute are orthogonal design axes</td><td>Assumes a differentiable composition of elementary operations; does not cover combinatorial search</td></tr>
</table>

> **Authoritative sources**
> - [Convex Optimization (Boyd & Vandenberghe)](https://web.stanford.edu/~boyd/cvxbook/)
> - [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
> - [Adam: A Method for Stochastic Optimization (Kingma & Ba, 2015)](https://arxiv.org/abs/1412.6980)