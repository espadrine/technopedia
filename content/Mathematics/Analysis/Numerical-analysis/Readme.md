# Numerical analysis

Numerical analysis asks the computational question of analysis: when a limit, integral, derivative, or solution of an equation cannot be written in closed form, how do we compute an approximation, how fast does the algorithm converge, and how do rounding and discretization errors propagate? Its first-principles distinction from the other classes is that it studies *computable approximation with error bounds*, not just existence or structure.

## Brief history

- Antiquity–17th century: Babylonian square roots, Newton's method, and interpolation tables anticipate the field.
- 18th–19th century: Euler's method for ODEs, Gauss's quadrature and elimination, and Lagrange interpolation provide the classical algorithms.
- 20th century: von Neumann, Goldstine, Wilkinson, and others develop backward error analysis and stability theory once computers make large computations routine.
- Today: finite element and spectral methods, iterative linear solvers, and optimization algorithms underpin engineering simulation and machine learning.

## Main branches

- **Approximation and interpolation**: polynomial and spline approximation, best approximation, convergence rates (Weierstrass's theorem guarantees uniform approximability by polynomials).
- **Quadrature**: trapezoidal, Simpson, and Gaussian rules for computing integrals with guaranteed error bounds.
- **Iterative methods**: fixed-point iteration, Newton's method, and Krylov subspace solvers, with convergence and stability analysis.
- **Discretization of differential equations**: finite differences, finite elements, and spectral methods for ODEs and PDEs.

## Where to go next

- The parent class, with its sibling sub-areas, is [Analysis](../Readme.md).
- The theory it computes with comes from [Real analysis](../Readme.md) (limits, convergence), [Functional analysis](../Readme.md) (operators, spectral methods), and [Differential equations](../Readme.md) (the equations being discretized).
