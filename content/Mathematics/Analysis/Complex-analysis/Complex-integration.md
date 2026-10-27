# Complex integration

Complex integration integrates holomorphic functions along curves (contours) in the complex plane. Because holomorphic functions are rigid, contour integrals obey powerful laws: they are independent of the path, they recover the function's values and derivatives from boundary data (Cauchy's formula), and they reduce to a finite sum of local data at isolated singularities (the residue theorem). These tools evaluate otherwise intractable real integrals and underpin Laplace-transform inversion in [Differential equations](../Differential-equations/Readme.md) and spectral methods in [Functional analysis](../Functional-analysis/Readme.md).

> **Authoritative sources**
> - [J. B. Conway, *Functions of One Complex Variable I*, Ch. 4–5](https://www.ams.org/bookstore/getitemspage?item=GST-17)
> - [S. Lang, *Complex Analysis*](https://www.ams.org/bookstore/getitemspage?item=GAO-10)

## Contour integrals and Cauchy's integral theorem

**Definition.** If $`f` is continuous on a curve $`\gamma: [a,b] \to \mathbb{C}` (a piecewise $`C^1` path), its contour integral is

$`\int_\gamma f(z)\, dz = \int_a^b f(\gamma(t))\, \gamma'(t)\, dt.`

**Cauchy's integral theorem.** If $`f` is holomorphic on a simply connected open set $`U` and $`\gamma` is a closed contour in $`U`, then

$`\int_\gamma f(z)\, dz = 0.`

<details><summary>Details</summary>

### What a contour integral means

A contour integral is the real line integral of a complex-valued function. Writing $`f = u + iv` and $`z = x + iy`, we have $`dz = dx + i\, dy`, so

$`\int_\gamma f\, dz = \int_\gamma (u\, dx - v\, dy) + i \int_\gamma (v\, dx + u\, dy).`

It is a genuine complex number, not a magnitude.

### Why the integral vanishes on closed loops

The key is the Cauchy–Riemann equations. For a small rectangle, the integral of $`f\, dz` around its boundary can be written in terms of $`u_x, u_y, v_x, v_y`. The Cauchy–Riemann equations make the contributions from opposite edges cancel. Tiling a simply connected region into small rectangles, all interior edges cancel pairwise, leaving only the outer boundary — and the sum tends to zero as the mesh refines. Hence the integral over any closed contour is zero.

The **simply connected** hypothesis is essential: it rules out "holes." Around a hole the integral need not vanish (see the residue theorem below).

### Path independence

A direct consequence: in a simply connected domain, the integral of a holomorphic function depends only on the endpoints, not the path. This lets us define an antiderivative $`F(z) = \int_{z_0}^{z} f(\zeta)\, d\zeta`, which is holomorphic with $`F' = f`.

<svg viewBox="0 0 460 240" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="240" fill="#fafafa"/>
  <path d="M 120 180 C 180 60, 300 60, 360 180" fill="none" stroke="#1a56c4" stroke-width="2"/>
  <path d="M 120 180 C 200 150, 280 150, 360 180" fill="none" stroke="#c43a1a" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="120" cy="180" r="4" fill="#333"/>
  <circle cx="360" cy="180" r="4" fill="#333"/>
  <text x="100" y="200" font-size="12" fill="#333">z0</text>
  <text x="365" y="200" font-size="12" fill="#333">z1</text>
  <text x="10" y="230" font-size="12" fill="#444">In a simply connected domain, the integral of a holomorphic f is the same along any two paths.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Evaluate $`\oint_{|z|=1} \frac{1}{z^2}\, dz`.

<details><summary>Solution</summary>

The function $`1/z^2` is holomorphic on $`\mathbb{C} \setminus \{0\}` and has an antiderivative $`-1/z` on the punctured plane. Since the contour $`|z| = 1` is closed and $`-1/z` is single-valued, the integral is $`0`. (Equivalently, the residue of $`1/z^2` at $`0` is $`0`, so the residue theorem gives $`0`.) ∎

</details>

</details>

</details>

## Cauchy's integral formula

**Theorem.** If $`f` is holomorphic on a simply connected open set containing a closed disk $`\overline{D(z_0, r)}` and $`\gamma` is the positively oriented boundary of that disk, then for $`|z - z_0| < r`,

$`f(z) = \frac{1}{2\pi i} \int_\gamma \frac{f(\zeta)}{\zeta - z}\, d\zeta.`

Differentiating under the integral gives the derivatives:

$`f^{(n)}(z) = \frac{n!}{2\pi i} \int_\gamma \frac{f(\zeta)}{(\zeta - z)^{n+1}}\, d\zeta.`

<details><summary>Details</summary>

### The idea

Cauchy's formula expresses the value of $`f` at an interior point purely in terms of its values on the surrounding contour. The kernel $`1/(\zeta - z)` is holomorphic in $`\zeta` except at $`\zeta = z`, so the integral is a "local probe" of $`f` at $`z`. This is the computational engine of the subject: it turns point values into contour integrals and vice versa.

### Worked example

Take $`f(\zeta) = \zeta^2` and $`\gamma` the unit circle. Then

$`f(0) = \frac{1}{2\pi i} \oint_{|z|=1} \frac{z^2}{z - 0}\, dz = \frac{1}{2\pi i} \oint_{|z|=1} z\, dz = 0,`

consistent with $`f(0) = 0`. For a nonzero point, say $`f(1/2)`:

$`f(1/2) = \frac{1}{2\pi i} \oint_{|z|=1} \frac{z^2}{z - 1/2}\, dz.`

Since $`z^2/(z - 1/2) = z + 1/2 + \frac{1/4}{z - 1/2}`, only the last term contributes (the others have antiderivatives), giving $`f(1/2) = 1/4 = (1/2)^2`.

### Why it matters

Cauchy's formula immediately implies that holomorphic functions are $`C^\infty` and real-analytic (differentiate as many times as you like), and it yields the **Cauchy estimates** $`|f^{(n)}(z_0)| \leq n! M / r^n` (where $`M = \max_\gamma |f|`), which control the growth of the Taylor coefficients.

<details><summary>Example problem</summary>

**Problem.** Let $`f` be holomorphic on $`|z| \leq 2` with $`|f(z)| \leq 10` there. Bound $`|f''(0)|`.

<details><summary>Solution</summary>

By the Cauchy estimate with $`n = 2`, $`r = 2`, $`M = 10`: $`|f''(0)| \leq 2! \cdot 10 / 2^2 = 20/4 = 5`. ∎

</details>

</details>

</details>

## Liouville's theorem and the fundamental theorem of algebra

**Liouville's theorem.** Every bounded entire function (holomorphic on all of $`\mathbb{C}`) is constant.

**Fundamental theorem of algebra (consequence).** Every non-constant polynomial $`p(z)` of degree $`n \geq 1` has at least one complex root.

<details><summary>Details</summary>

### Proof of Liouville's theorem

Let $`f` be entire and bounded, $`|f(z)| \leq M`. Fix $`z_0` and apply Cauchy's formula for the first derivative on a disk of radius $`r`:

$`|f'(z_0)| \leq \frac{M}{r}.`

Letting $`r \to \infty` (possible because $`f` is entire) gives $`f'(z_0) = 0`. Since $`z_0` was arbitrary, $`f' \equiv 0`, so $`f` is constant.

### From Liouville to the fundamental theorem of algebra

Let $`p` be a non-constant polynomial with no root. Then $`g(z) = 1/p(z)` is entire. As $`|z| \to \infty`, $`|p(z)| \to \infty`, so $`|g(z)| \to 0`; hence $`g` is bounded. By Liouville, $`g` is constant, so $`p` is constant — a contradiction. Thus $`p` has a root.

<details><summary>Example problem</summary>

**Problem.** Show that $`f(z) = e^z` is not constant but is not bounded, and explain why this does not contradict Liouville's theorem.

<details><summary>Solution</summary>

$`e^z = e^{x+iy} = e^x e^{iy}` has modulus $`e^x`, which is unbounded as $`x \to +\infty`. Liouville's theorem requires boundedness, which $`e^z` lacks, so there is no contradiction. (Indeed $`e^z` is a non-constant entire function, exactly the kind Liouville's hypothesis excludes.) ∎

</details>

</details>

</details>

## The residue theorem

**Definition.** If $`f` is holomorphic in a punctured neighborhood of an isolated singularity $`a`, the **residue** $`\operatorname{Res}(f, a)` is the coefficient $`a_{-1}` of $`(z-a)^{-1}` in the Laurent expansion of $`f` about $`a`. For a pole of order $`m`,

$`\operatorname{Res}(f, a) = \frac{1}{(m-1)!} \lim_{z \to a} \frac{d^{m-1}}{dz^{m-1}} \big[(z-a)^m f(z)\big].`

For a simple pole ($`m = 1`), $`\operatorname{Res}(f, a) = \lim_{z \to a} (z-a) f(z)`.

**Residue theorem.** If $`f` is holomorphic inside and on a positively oriented simple closed contour $`\gamma` except for isolated singularities $`a_1, \dots, a_n` inside $`\gamma`, then

$`\oint_\gamma f(z)\, dz = 2\pi i \sum_{k=1}^{n} \operatorname{Res}(f, a_k).`

<details><summary>Details</summary>

### Why the residue is the only thing that matters

Near an isolated singularity, $`f` has a Laurent series $`\sum_{n=-\infty}^{\infty} a_n (z-a)^n`. Every term $`a_n (z-a)^n` with $`n \neq -1` has a single-valued antiderivative on the punctured disk, so its integral around a closed loop is zero. Only the $`a_{-1}/(z-a)` term integrates to $`2\pi i a_{-1}`. The residue is therefore precisely the "non-cancelling" part of the singularity.

### Worked example: a classic real integral

Evaluate $`\int_{-\infty}^{\infty} \frac{dx}{1 + x^2}`. Close the contour in the upper half-plane with a large semicircle. The integrand $`1/(1+z^2) = 1/((z-i)(z+i))` has a simple pole at $`z = i` (inside) and $`z = -i` (outside). The residue at $`i` is

$`\lim_{z \to i} (z-i) \frac{1}{(z-i)(z+i)} = \frac{1}{2i} = -\frac{i}{2}.`

The semicircle contribution vanishes as its radius $`\to \infty` (the integrand is $`O(1/R^2)` on an arc of length $`\pi R`). Hence

$`\int_{-\infty}^{\infty} \frac{dx}{1+x^2} = 2\pi i \cdot \left(-\frac{i}{2}\right) = \pi.`

### The general recipe

1. Identify the singularities of $`f` and which lie inside the chosen contour.
2. Compute each residue (simple-pole formula, or the order-$`m` formula).
3. Sum them and multiply by $`2\pi i`.
4. For real integrals, justify that the added arc contributes zero in the limit.

<svg viewBox="0 0 460 260" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="260" fill="#fafafa"/>
  <line x1="20" y1="150" x2="440" y2="150" stroke="#ccc"/>
  <path d="M 60 150 A 170 170 0 0 1 400 150" fill="none" stroke="#1a56c4" stroke-width="2"/>
  <line x1="60" y1="150" x2="400" y2="150" stroke="#1a56c4" stroke-width="2"/>
  <circle cx="230" cy="80" r="5" fill="#c43a1a"/>
  <text x="240" y="75" font-size="12" fill="#c43a1a">z = i (inside)</text>
  <circle cx="230" cy="220" r="5" fill="#999"/>
  <text x="240" y="225" font-size="12" fill="#999">z = -i (outside)</text>
  <text x="10" y="250" font-size="12" fill="#444">Closing in the upper half-plane: only the enclosed pole contributes to the integral.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Compute $`\oint_{|z|=2} \frac{z}{z^2 + 1}\, dz`.

<details><summary>Solution</summary>

The poles are at $`z = \pm i`, both inside $`|z| = 2`. Both are simple. At $`z = i`: $`\operatorname{Res} = \frac{i}{2i} = 1/2`. At $`z = -i`: $`\operatorname{Res} = \frac{-i}{-2i} = 1/2`. Sum $`= 1`. Hence the integral is $`2\pi i \cdot 1 = 2\pi i`. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Evaluate $`\int_{-\infty}^{\infty} \frac{dx}{(x^2 + 1)^2}` using the residue theorem.

<details><summary>Solution</summary>

Close in the upper half-plane. The integrand $`1/(z^2+1)^2 = 1/((z-i)^2 (z+i)^2` has a double pole at $`z = i` (inside) and $`z = -i` (outside). For the double pole at $`i`, use the order-$`m=2` formula with $`g(z) = (z-i)^2 f(z) = 1/(z+i)^2`:

$`\operatorname{Res}(f, i) = \left.\frac{d}{dz} \frac{1}{(z+i)^2}\right|_{z=i} = \left. -2 (z+i)^{-3} \right|_{z=i} = -2 (2i)^{-3} = -2 / (-8i) = \frac{1}{4i} = -\frac{i}{4}.`

The arc vanishes in the limit (integrand is $`O(1/R^4)`). Therefore

$`\int_{-\infty}^{\infty} \frac{dx}{(x^2+1)^2} = 2\pi i \cdot \left(-\frac{i}{4}\right) = \frac{\pi}{2}.`

∎

</details>

</details>
