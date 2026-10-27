# Operators

Operators are the maps between the spaces of the [Spaces](./Spaces.md) page — the "derivatives" and "integrals" of functional analysis. They are where the real work happens: solving equations, finding eigenvalues, and decomposing functions all reduce to understanding a linear map and its spectrum. This page covers bounded operators and the operator norm, unbounded (densely defined) operators, adjoints, compact operators, and the spectral theorem.

> **Authoritative sources**
> - [J. B. Conway, *A Course in Functional Analysis*, Ch. 4–7](https://www.ams.org/bookstore/getitemspage?item=CBM-008)
> - [M. Reed & B. Simon, *Methods of Modern Mathematical Physics, I: Functional Analysis*](https://www.ams.org/bookstore/getitemspage?item=CBM-009)

## Bounded operators and the operator norm

**Definition.** A linear map $`T : X \to Y` between normed spaces is **bounded** if some constant $`M` satisfies $`\|Tx\| \leq M\|x\|` for every $`x`; equivalently, $`T` is continuous. Its **operator norm** is $`\|T\| = \sup_{\|x\| \leq 1} \|Tx\|`.

<details><summary>Details</summary>

### Bounded is the same as continuous

For a *linear* map, the two notions coincide. If $`T` is continuous at $`0`, then $`\|Tx\| \leq M\|x\|` for small $`x`, and scaling gives it for all $`x`. Conversely, the estimate $`\|Tx - Tx_0\| = \|T(x - x_0)\| \leq M\|x - x_0\|` shows continuity everywhere. So "bounded" is just "continuous" wearing a linear hat.

**Example.** On $`\ell^2`, the diagonal map $`T(x_1, x_2, \dots) = (x_1, x_2/2, x_3/3, \dots)` has $`\|T\| = 1` (attained on the first basis vector). The shift $`S(x_1, x_2, \dots) = (0, x_1, x_2, \dots)` is an isometry, so $`\|S\| = 1`.

### The space of operators is itself a Banach space

The set $`\mathcal{B}(X, Y)` of all bounded operators $`X \to Y`, with the operator norm, is a Banach space whenever $`Y` is. This is important: it means you can take limits of operators, apply fixed-point theorems to them, and treat "operators" as first-class points of a space.

<svg viewBox="0 0 440 150" width="440" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bounded operator maps the unit ball into a bounded set">
  <circle cx="120" cy="75" r="55" fill="none" stroke="#2b6cb0" stroke-width="1.5"/>
  <text x="105" y="145" font-size="12" fill="#333">unit ball of X</text>
  <path d="M 190 75 L 250 75" stroke="#888" stroke-width="1.5" marker-end="url(#arr)"/>
  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
  <ellipse cx="340" cy="75" rx="45" ry="30" fill="none" stroke="#2f855a" stroke-width="1.5"/>
  <text x="300" y="145" font-size="12" fill="#333">T(unit ball): bounded</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Compute the operator norm of $`T : \mathbb{R}^2 \to \mathbb{R}^2`, $`T(a, b) = (a + b, a - b)`.

<details><summary>Solution</summary>

$`\|T(a,b)\|^2 = (a+b)^2 + (a-b)^2 = 2a^2 + 2b^2 = 2\|(a,b)\|^2`, so $`\|T(a,b)\| = \sqrt{2}\,\|(a,b)\|`. The norm is $`\|T\| = \sqrt{2}`, attained at any unit vector (e.g. $`(1, 0)`). ∎

</details>

</details>

</details>

## Unbounded operators

**Definition.** An **unbounded operator** $`A` on a Hilbert space $`H` is a linear map defined only on a dense subspace $`\mathcal{D}(A) \subset H` (its **domain**), not on all of $`H`.

<details><summary>Details</summary>

### Why operators must sometimes be unbounded

Many natural operations are not bounded. Differentiation is the prime example: on $`L^2([0,1])`, the map $`A f = f'` is unbounded, because a sequence of functions can have arbitrarily small $`L^2` size while their derivatives do not. Yet differentiation is central to physics and PDEs, so functional analysis needs a home for it: the densely defined, unbounded operator.

**Example.** The momentum operator in quantum mechanics is $`A = -i\hbar\, d/dx` on a suitable domain in $`L^2(\mathbb{R})`. It is unbounded but densely defined, and (on the right domain) self-adjoint — which is exactly what makes its spectrum (the possible measured momenta) real.

### The domain is part of the operator

Two operators with the same formula but different domains are *different* operators. This is why "densely defined" matters: it is the condition that lets the adjoint (below) exist.

<details><summary>Example problem</summary>

**Problem.** Show that differentiation $`A f = f'` on $`\mathcal{D}(A) = C^1([0,1]) \subset L^2([0,1])` is unbounded.

<details><summary>Solution</summary>

Take $`f_n(x) = \sin(n \pi x)`. Then $`\|f_n\|_2^2 = \int_0^1 \sin^2(n\pi x)\,dx = 1/2`, so $`\|f_n\|_2 = 1/\sqrt{2}` for all $`n`. But $`f_n'(x) = n\pi \cos(n\pi x)`, so $`\|A f_n\|_2 = n\pi/\sqrt{2} \to \infty`. No constant $`M` can bound $`\|A f_n\| \leq M\|f_n\|`, so $`A` is unbounded. ∎

</details>

</details>

</details>

## The adjoint

**Definition.** The **adjoint** $`T^*` of a bounded operator $`T : X \to Y` is the unique bounded operator $`T^* : Y^* \to X^*` with $`\langle Tx, y^* \rangle = \langle x, T^* y^* \rangle` for all $`x, y^*`. On a Hilbert space $`H`, $`T^* : H \to H` is defined by $`\langle Tx, y \rangle = \langle x, T^* y \rangle`. An operator is **self-adjoint** if $`T = T^*`.

<details><summary>Details</summary>

### The adjoint turns the inner product around

The adjoint is the operator that lets you "move $`T` across the inner product." In finite dimensions this is just the conjugate transpose of a matrix. The identity $`\langle Tx, y \rangle = \langle x, T^* y \rangle` is the whole definition; everything else follows from it.

**Example.** If $`T` is the matrix $`\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}`, then $`T^* = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}`. If $`T` is multiplication by a function $`g` on $`L^2`, then $`T^*` is multiplication by $`\overline{g}`.

### Self-adjoint means real spectrum

A self-adjoint operator has only real eigenvalues: if $`T x = \lambda x` with $`\|x\| = 1`, then $`\lambda = \langle Tx, x \rangle = \langle x, T^* x \rangle = \overline{\langle Tx, x \rangle} = \overline{\lambda}`, so $`\lambda \in \mathbb{R}`. This is why observables in quantum mechanics are modeled by self-adjoint operators — their measured values are real.

<svg viewBox="0 0 300 160" width="300" height="160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The adjoint moves the operator across the inner product">
  <rect x="20" y="20" width="260" height="120" fill="none" stroke="#ccc"/>
  <text x="40" y="60" font-size="15" fill="#2b6cb0" font-family="serif" font-style="italic">&lt;Tx, y&gt;</text>
  <text x="40" y="100" font-size="15" fill="#2f855a" font-family="serif" font-style="italic">&lt;x, T* y&gt;</text>
  <text x="150" y="80" font-size="13" fill="#888">=</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Let $`T` be a self-adjoint operator on a Hilbert space and $`x` a unit eigenvector with eigenvalue $`\lambda`. Show $`\lambda` is real.

<details><summary>Solution</summary>

$`\lambda = \lambda \langle x, x \rangle = \langle \lambda x, x \rangle = \langle Tx, x \rangle`. Since $`T = T^*`, $`\langle Tx, x \rangle = \langle x, T^* x \rangle = \langle x, Tx \rangle = \overline{\langle Tx, x \rangle} = \overline{\lambda}`. Hence $`\lambda = \overline{\lambda}`, so $`\lambda \in \mathbb{R}`. ∎

</details>

</details>

</details>

## Compact operators

**Definition.** A bounded operator $`T` on a normed space is **compact** if the image of the unit ball has compact closure; equivalently, every bounded sequence $`(x_n)` has a subsequence such that $`(T x_{n_k})` converges.

<details><summary>Details</summary>

### Compact means "almost finite rank"

In finite dimensions every operator is compact. In infinite dimensions, compact operators are the ones that behave like finite-rank operators: they squeeze an infinite-dimensional ball into something "small" (with compact closure). The key structural fact is that every compact operator on a Banach space is the norm-limit of finite-rank operators, so compact operators are the infinite-dimensional shadow of matrices.

**Examples.**
- Every finite-rank operator is compact.
- An integral operator $`(Tf)(x) = \int K(x, y) f(y)\,dy` with a square-integrable kernel $`K` (a **Hilbert–Schmidt** operator) is compact on $`L^2`.

### Why compactness matters

The spectrum of a compact operator is "discrete": except possibly for $`0`, it consists of eigenvalues of finite multiplicity that accumulate only at $`0`. This is what makes the eigenvalue expansions of Fourier theory and the spectral theorem for compact operators so clean, and it is the reason integral equations can be solved by expanding in eigenfunctions.

<svg viewBox="0 0 440 150" width="440" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A compact operator squeezes the unit ball into a set with compact closure">
  <circle cx="110" cy="75" r="55" fill="none" stroke="#2b6cb0" stroke-width="1.5"/>
  <text x="70" y="145" font-size="12" fill="#333">unit ball</text>
  <path d="M 180 75 L 240 75" stroke="#888" stroke-width="1.5" marker-end="url(#arr2)"/>
  <defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
  <ellipse cx="330" cy="75" rx="55" ry="12" fill="none" stroke="#2f855a" stroke-width="1.5"/>
  <text x="285" y="145" font-size="12" fill="#333">image: "small" (compact closure)</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Show that every finite-rank operator is compact.

<details><summary>Solution</summary>

Let $`T x = \sum_{k=1}^n \varphi_k(x)\, y_k` with $`\varphi_k \in X^*` and $`y_k \in Y`. The range of $`T` lies in the finite-dimensional span of $`y_1, \dots, y_n`. The image of the unit ball is a bounded subset of this finite-dimensional space, and in finite dimensions bounded sets have compact closure (Heine–Borel). Hence $`T` is compact. ∎

</details>

</details>

</details>

## The spectral theorem

**Definition.** The **spectral theorem** says that a normal operator $`T` on a Hilbert space (in particular a self-adjoint one) can be "diagonalized": there is a measure space and a function $`f` such that $`T` is unitarily equivalent to multiplication by $`f`, and the spectrum of $`T` is the essential range of $`f`.

<details><summary>Details</summary>

### From diagonalizing a matrix

In finite dimensions, a normal matrix is unitarily diagonalizable: $`T = U \Lambda U^*` with $`\Lambda` diagonal. The spectral theorem is the infinite-dimensional version of exactly this statement. The "diagonal entries" become a function $`f`, the "basis of eigenvectors" becomes a measure space, and "diagonalizing" becomes "multiplication by $`f`."

### The projection-valued measure

The precise form: to a self-adjoint $`T` there is a unique projection-valued measure $`E` on the Borel sets of $`\mathbb{R}` such that

```math
T = \int_{\mathbb{R}} \lambda \, dE(\lambda).
```

The spectrum of $`T` is the support of $`E`. This formula is the infinite-dimensional replacement for $`T = \sum \lambda_i P_i` (eigenvalues times projections).

### Consequences

- **Real spectrum:** a self-adjoint operator has real spectrum (the integral is over $`\mathbb{R}`).
- **Functional calculus:** for any Borel function $`g`, you can define $`g(T) = \int g(\lambda)\, dE(\lambda)`. This lets you write $`e^{i t T}` (the time-evolution operator in quantum mechanics) and $`\sqrt{T}`.
- **Eigenfunction expansions:** when the spectrum is discrete (compact case), the formula reduces to an expansion in eigenfunctions, as in Fourier series.

<svg viewBox="0 0 440 150" width="440" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spectral decomposition: an operator as a weighted sum of projections">
  <line x1="30" y1="120" x2="410" y2="120" stroke="#888" stroke-width="1"/>
  <rect x="70" y="60" width="30" height="60" fill="#2b6cb0"/>
  <rect x="180" y="40" width="30" height="80" fill="#2b6cb0"/>
  <rect x="290" y="80" width="30" height="40" fill="#2b6cb0"/>
  <text x="60" y="140" font-size="12" fill="#333">lambda_1</text>
  <text x="170" y="140" font-size="12" fill="#333">lambda_2</text>
  <text x="280" y="140" font-size="12" fill="#333">lambda_3</text>
  <text x="120" y="30" font-size="12" fill="#333">T = sum of (eigenvalue x projection)</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Let $`T` be a self-adjoint operator with $`\|T\| \leq 1`. Show that $`\langle Tx, x \rangle \in [-1, 1]` for every unit vector $`x`.

<details><summary>Solution</summary>

By the spectral theorem, $`\langle Tx, x \rangle = \int_{\mathbb{R}} \lambda \, d\mu_x(\lambda)` where $`\mu_x` is a probability measure (the spectral measure of $`x`). Since $`\|T\| \leq 1`, the spectrum lies in $`[-1, 1]`, so $`\mu_x` is supported there. An average of values in $`[-1, 1]` lies in $`[-1, 1]`, hence $`\langle Tx, x \rangle \in [-1, 1]`. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Let $`T` be a compact self-adjoint operator on a Hilbert space with $`0` not in its spectrum. Show that $`T` is invertible and that $`T^{-1}` is bounded.

<details><summary>Solution</summary>

Since $`T` is compact and self-adjoint, the spectral theorem gives $`T = \sum_n \lambda_n P_n` with real eigenvalues $`\lambda_n \to 0` and orthogonal projections $`P_n`. If $`0 \notin \sigma(T)`, then $`\inf_n |\lambda_n| = m > 0` (the eigenvalues cannot accumulate at $`0` without $`0` being in the spectrum). Define $`T^{-1} = \sum_n \lambda_n^{-1} P_n`. Then $`\|T^{-1}\| = \sup_n |\lambda_n^{-1}| = 1/m < \infty`, so $`T^{-1}` is bounded, and $`T^{-1} T = T T^{-1} = I`. ∎

</details>

</details>