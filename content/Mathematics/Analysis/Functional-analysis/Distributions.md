# Distributions

Distributions (generalized functions) extend the notion of a function so that differentiation *always* exists. They let us write down objects like the Dirac delta and solve differential equations — via weak derivatives and fundamental solutions — in situations where classical derivatives do not exist. This page covers test functions, the definition of a distribution, the Dirac delta, differentiation (weak derivatives), and fundamental solutions.

> **Authoritative sources**
> - [L. Schwartz, *Théorie des distributions*](https://www.ams.org/bookstore/getitemspage?item=CBM-010)
> - [G. Polland, *Introduction to Partial Differential Equations*, Ch. 2](https://www.ams.org/bookstore/getitemspage?item=CBM-011)

## Test functions

**Definition.** A **test function** is a smooth function with compact support, i.e. an element of $`\mathcal{D}(\mathbb{R}^n) = C_c^\infty(\mathbb{R}^n)`.

<details><summary>Details</summary>

### Why smooth and compactly supported

A test function is the "probe" we use to sample a distribution. We want two things: (1) it must be differentiable to all orders, so that we can define derivatives of distributions by pushing derivatives onto the test function; and (2) it must vanish outside some bounded region, so that integrals against it are always finite and no boundary terms appear. Smooth + compact support gives exactly both.

**Example.** The function $`\varphi(x) = e^{-1/(1-x^2)}` for $`|x| < 1` and $`\varphi(x) = 0` for $`|x| \geq 1` is a standard test function on $`\mathbb{R}`: it is smooth everywhere (all derivatives vanish at $`\pm 1`) and supported in $`[-1, 1]`.

### Convergence of test functions

A sequence $`\varphi_k \to 0` in $`\mathcal{D}` if all the $`\varphi_k` are supported in one fixed compact set and every derivative $`\partial^\alpha \varphi_k \to 0` uniformly. This topology is what "continuity" of a distribution means.

<details><summary>Example problem</summary>

**Problem.** Show that the function above, $`\varphi(x) = e^{-1/(1-x^2)}` on $`(-1, 1)`, is smooth at $`x = 1`.

<details><summary>Solution</summary>

For $`x < 1`, $`\varphi` is a composition of smooth functions, hence smooth. At the boundary point $`1`, every derivative of $`e^{-1/(1-x^2)}` tends to $`0` as $`x \to 1^-` (the exponential decay beats any polynomial growth from the chain rule), matching the value $`0` on the other side. So all one-sided derivatives agree and $`\varphi` is smooth at the boundary. ∎

</details>

</details>

</details>

## Distributions as continuous functionals

**Definition.** A **distribution** on $`\mathbb{R}^n` is a continuous linear functional $`T : \mathcal{D}(\mathbb{R}^n) \to \mathbb{C}`. The space of all distributions is $`\mathcal{D}'(\mathbb{R}^n)`. Every locally integrable function $`f` defines one by $`T_f(\varphi) = \int_{\mathbb{R}^n} f(x)\,\varphi(x)\,dx`.

<details><summary>Details</summary>

### Functions are distributions

The first thing to notice is that every "ordinary" (locally integrable) function is a distribution: it acts on a test function by integration. Distributions are therefore a *generalization* of functions, not a replacement — the classical functions sit inside $`\mathcal{D}'` as a special case.

**Example.** The constant function $`f = 1` gives the distribution $`T_f(\varphi) = \int \varphi`, which just integrates the test function.

### Continuity is automatic for functions, not for all distributions

For a locally integrable $`f`, the map $`\varphi \mapsto \int f\varphi` is automatically continuous in the test-function topology. But a general distribution need not be given by any function — it can be a "more singular" object. The **order** of a distribution measures how many derivatives of $`\varphi` it depends on: a function has order $`0`, the Dirac delta has order $`0`, and $`\delta'` has order $`1`.

<details><summary>Example problem</summary>

**Problem.** Show that the locally integrable function $`f(x) = 1/|x|` on $`\mathbb{R}` defines a distribution.

<details><summary>Solution</summary>

$`f` is locally integrable because near $`0`, $`\int_{-1}^{1} |x|^{-1}\,|\varphi(x)|\,dx \leq \|\varphi\|_\infty \int_{-1}^{1} |x|^{-1}\,dx < \infty` (the integral of $`1/|x|` over a neighborhood of $`0` is finite in one dimension). Since $`\varphi` has compact support, the integral $`\int f\varphi` is finite, and the map $`\varphi \mapsto \int f\varphi` is continuous in the test-function topology. Hence $`f` defines a distribution. ∎

</details>

</details>

</details>

## The Dirac delta

**Definition.** The **Dirac delta** $`\delta` is the distribution defined by $`\delta(\varphi) = \varphi(0)` for every test function $`\varphi`.

<details><summary>Details</summary>

### A point mass, not a function

The delta is "infinite at $`0` and zero elsewhere" in the informal picture, but it is *not* a function: no function satisfies $`\int f\varphi = \varphi(0)` for all test functions $`\varphi`. It is a distribution of order $`0` that "picks out" the value of $`\varphi` at the origin. Physically it models a point charge or an instantaneous impulse.

**Properties.**
- **Translation:** $`\delta_a(\varphi) = \varphi(a)` is the delta at $`a`.
- **Scaling:** $`\delta(\lambda x) = \delta(x)/|\lambda|`.
- **It is a measure:** $`\delta` is the point mass at $`0`, so it is also a distribution coming from a (singular) measure.

<svg viewBox="0 0 440 150" width="440" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A sequence of narrow bumps approximating the Dirac delta">
  <line x1="20" y1="120" x2="420" y2="120" stroke="#888" stroke-width="1"/>
  <path d="M 200 120 Q 205 20 210 120" fill="none" stroke="#2b6cb0" stroke-width="2"/>
  <path d="M 200 120 Q 190 60 180 120" fill="none" stroke="#2f855a" stroke-width="1.5" stroke-dasharray="4 3"/>
  <path d="M 200 120 Q 220 60 240 120" fill="none" stroke="#2f855a" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="205" y="140" font-size="12" fill="#333">0</text>
  <text x="150" y="40" font-size="12" fill="#333">narrow bumps, area 1, converge to delta</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Show that no (locally integrable) function $`f` satisfies $`\int f(x)\varphi(x)\,dx = \varphi(0)` for every test function $`\varphi`.

<details><summary>Solution</summary>

Suppose such $`f` existed. Take a nonnegative test function $`\varphi \geq 0` with $`\varphi(0) = 0` (e.g. one supported away from $`0`). Then $`\int f\varphi = \varphi(0) = 0` for all such $`\varphi`. Now take $`\psi \geq 0` with $`\psi(0) > 0`. Writing $`\psi = \psi(0) \cdot 1 + (\psi - \psi(0))` and using that $`\psi - \psi(0)` vanishes at $`0`, one gets $`\int f\psi = \psi(0)`. But choosing $`\psi` with arbitrarily small support around $`0` forces $`f` to concentrate all its mass at a single point, contradicting local integrability (a locally integrable function has $`\int_{|x|<\epsilon} |f| \to 0` as $`\epsilon \to 0`, whereas the delta requires the integral to stay $`= \varphi(0) \neq 0`). Hence no such function exists. ∎

</details>

</details>

</details>

## Differentiation of distributions

**Definition.** The **derivative** of a distribution $`T` is the distribution $`T'` defined by $`T'(\varphi) = -T(\varphi')`. The **weak derivative** of a locally integrable function $`f` is a locally integrable function $`g` satisfying $`\int g\,\varphi = -\int f\,\varphi'` for all test functions $`\varphi`.

<details><summary>Details</summary>

### Where the minus sign comes from

The definition $`T'(\varphi) = -T(\varphi')` is just integration by parts in disguise. If $`T = T_f` comes from a smooth function $`f`, then

```math
T_f'(\varphi) = -\int f\,\varphi' = \int f'\,\varphi = T_{f'}(\varphi),
```

where the boundary term vanishes because $`\varphi` has compact support. So the distributional derivative of a smooth function is its ordinary derivative — the definition is engineered to agree with the classical one.

### Every distribution is infinitely differentiable

This is the payoff. Because the definition only ever differentiates the *test function* (which is smooth), it works for *any* distribution, no matter how singular. Distributions can be differentiated any number of times, and the result is again a distribution. This is impossible for ordinary functions.

### Weak derivatives catch jumps

A function with a jump has no classical derivative at the jump, but it has a weak derivative that includes a delta. The Heaviside step function $`H(x) = 1` for $`x > 0` and $`0` for $`x < 0` has weak derivative $`\delta`: indeed $`\int H\varphi' = -\varphi(0) = -\delta(\varphi)`, so $`H' = \delta`.

<svg viewBox="0 0 440 150" width="440" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Heaviside step function and its weak derivative, the Dirac delta">
  <line x1="20" y1="110" x2="420" y2="110" stroke="#888" stroke-width="1"/>
  <path d="M 20 110 L 200 110 L 200 40 L 420 40" fill="none" stroke="#2b6cb0" stroke-width="2"/>
  <text x="60" y="105" font-size="12" fill="#2b6cb0">H(x)</text>
  <line x1="200" y1="110" x2="200" y2="20" stroke="#c53030" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="205" y="25" font-size="12" fill="#c53030">jump at 0  ->  H' = delta</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Compute the distributional second derivative of the Heaviside function $`H`.

<details><summary>Solution</summary>

We have $`H' = \delta`. Differentiating again, $`H'' = \delta'`, where $`\delta'(\varphi) = -\varphi'(0)`. So the second distributional derivative of $`H` is $`\delta'`. (Classically, $`H` has no second derivative at all; distributionally it is perfectly well defined.) ∎

</details>

</details>

</details>

## Fundamental solutions

**Definition.** A **fundamental solution** of a linear differential operator $`L` is a distribution $`E` satisfying $`L E = \delta`.

<details><summary>Details</summary>

### Why fundamental solutions solve equations

If $`E` is a fundamental solution of $`L`, then for any (nice) source $`f`, the convolution $`u = E * f` solves $`L u = f`. Indeed, $`L(E * f) = (L E) * f = \delta * f = f`. So finding one fundamental solution reduces the whole class of inhomogeneous equations to a single convolution.

**Example.** For the Laplacian $`\Delta` on $`\mathbb{R}^n` ($`n \geq 3`), a fundamental solution is

```math
E(x) = \frac{1}{n(2-n)\,\omega_n}\, \frac{1}{|x|^{n-2}},
```

where $`\omega_n` is the volume of the unit ball. In two dimensions the fundamental solution is $`E(x) = \frac{1}{2\pi}\ln|x|`. These are the Green's functions behind the Newtonian potential and the solution of Poisson's equation.

### The link to the other branches

Fundamental solutions tie distributions back to [Operators](./Operators.md) and [Applications](./Applications.md): the operator $`L` is (usually) an unbounded operator on an $`L^2` space, and the existence of $`E` is what lets one prove existence of weak solutions to PDEs.

<details><summary>Example problem</summary>

**Problem.** Verify that $`E(x) = \frac{1}{2\pi}\ln|x|` on $`\mathbb{R}^2` is a fundamental solution of the Laplacian, i.e. $`\Delta E = \delta`.

<details><summary>Solution</summary>

For $`x \neq 0`, $`E` is smooth and $`\Delta \ln|x| = 0`, so $`\Delta E = 0` away from the origin. To find the contribution at $`0`, integrate $`\Delta E` against a test function $`\varphi` with $`\varphi(0) = 1` near $`0`: by Green's identity over the disk $`B_R` minus a small disk $`B_\epsilon` around $`0`,

```math
\int_{B_R \setminus B_\epsilon} \Delta E\,\varphi = \int_{\partial B_\epsilon} \frac{\partial E}{\partial n}\,dS + o(1).
```

Since $`\partial E/\partial n = \frac{1}{2\pi}\frac{1}{\epsilon}` on $`\partial B_\epsilon` and $`|\partial B_\epsilon| = 2\pi\epsilon`, the boundary integral is $`\frac{1}{2\pi}\cdot\frac{1}{\epsilon}\cdot 2\pi\epsilon = 1`. Letting $`\epsilon \to 0` gives $`\langle \Delta E, \varphi \rangle = \varphi(0) = \delta(\varphi)`. Hence $`\Delta E = \delta`. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Let $`f` be a piecewise $`C^1` function on $`\mathbb{R}` with a single jump of size $`J = f(0^+) - f(0^-)` at $`x = 0`. Show that the distributional derivative $`f'` equals the classical derivative (as a function) plus $`J\,\delta`.

<details><summary>Solution</summary>

Write $`f = f_{\text{reg}} + J\,H`, where $`f_{\text{reg}}` is $`f` with the jump removed (so $`f_{\text{reg}}` is continuous and piecewise $`C^1`) and $`H` is the Heaviside step. The distributional derivative is linear, so $`f' = f_{\text{reg}}' + J\,H'`. The function $`f_{\text{reg}}` has no jump, so its distributional derivative equals its classical (piecewise) derivative as a function. And $`H' = \delta`. Therefore $`f' = f'_{\text{classical}} + J\,\delta`. ∎

</details>

</details>