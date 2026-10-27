# Multivariable analysis

Multivariable analysis extends the four pillars of one-variable real analysis — limits, derivatives, integrals, and series — to functions on $`\mathbb{R}^n`. It introduces partial derivatives, the gradient, the Jacobian, the multivariable mean value theorem, and multiple integrals with change of variables. It is the language of vector calculus, the foundation of PDE theory, and the setting in which optimization, mechanics, and electromagnetism are formulated.

> **Authoritative sources**
> - [W. Rudin, *Principles of Mathematical Analysis*, Ch. 9](https://www.ams.org/bookstore/getitemspage?item=MAA-0001)
> - [M. Spivak, *Calculus on Manifolds*](https://www.ams.org/bookstore/getitemspage?item=MAA-0004)
> - [V. Guillemin & G. Pollack, *Differential Topology*](https://www.ams.org/bookstore/getitemspage?item=MAA-0005)

## Limits and continuity in $`\mathbb{R}^n`

**Definition.** Let $`f: U \to \mathbb{R}` where $`U \subseteq \mathbb{R}^n` is open. We write $`\lim_{\mathbf{x} \to \mathbf{a}} f(\mathbf{x}) = L` if for every $`\varepsilon > 0` there exists $`\delta > 0` such that $`0 < \|\mathbf{x} - \mathbf{a}\| < \delta \implies |f(\mathbf{x}) - L| < \varepsilon`.

**Definition (continuity).** $`f` is continuous at $`\mathbf{a}` if $`\lim_{\mathbf{x} \to \mathbf{a}} f(\mathbf{x}) = f(\mathbf{a})`.

<details><summary>Details</summary>

### From one dimension to many

The ε–δ definition is identical in form to the one-dimensional case (see [Limits and continuity](./Limits-and-continuity.md)); the only change is that $`|x - a|` becomes the Euclidean norm $`\|\mathbf{x} - \mathbf{a}\| = \sqrt{(x_1 - a_1)^2 + \cdots + (x_n - a_n)^2}`. The key new feature is that there are infinitely many paths to approach $`\mathbf{a}`: along axes, along lines, along curves. A limit exists only if $`f` approaches $`L` along *every* path.

### Worked example: a limit that does not exist

Consider $`f(x, y) = \frac{xy}{x^2 + y^2}` for $`(x,y) \neq (0,0)`.

- Along the $`x`-axis ($`y = 0`): $`f(x, 0) = 0 \to 0`.
- Along the line $`y = x`: $`f(x, x) = \frac{x^2}{2x^2} = \frac{1}{2} \to \frac{1}{2}`.

Since the two paths give different limits, $`\lim_{(x,y) \to (0,0)} f(x,y)` does not exist.

### Continuity of vector-valued functions

A map $`\mathbf{f}: U \subseteq \mathbb{R}^n \to \mathbb{R}^m` is continuous at $`\mathbf{a}` if and only if each component $`f_i` is continuous at $`\mathbf{a}`. This reduces the multivariable question to $`m` one-dimensional questions.

<details><summary>Example problem</summary>

**Problem.** Show that $`g(x, y) = \frac{x^2 y}{x^2 + y^2}` (with $`g(0,0) = 0`) is continuous at $`(0, 0)`.

<details><summary>Solution</summary>

We need $`|g(x,y) - 0| \to 0` as $`(x,y) \to (0,0)`. Note that

$`|g(x,y)| = \frac{x^2 |y|}{x^2 + y^2} \leq \frac{x^2 |y|}{y^2} = \frac{x^2}{|y|}`

when $`y \neq 0`, which is not helpful. Instead, use $`x^2 \leq x^2 + y^2`:

$`|g(x,y)| \leq \frac{x^2 |y|}{x^2 + y^2} \leq |y| \leq \|(x,y)\|.`

Given $`\varepsilon > 0`, choose $`\delta = \varepsilon`. If $`\|(x,y)\| < \delta`, then $`|g(x,y)| \leq \|(x,y)\| < \varepsilon`. Hence $`g \to 0 = g(0,0)`. ∎

</details>

</details>

</details>

## Partial derivatives and the gradient

**Definition (partial derivative).** If $`f: U \subseteq \mathbb{R}^n \to \mathbb{R}` is defined near $`\mathbf{a}`, the $`i`-th partial derivative is

$`\frac{\partial f}{\partial x_i}(\mathbf{a}) = \lim_{h \to 0} \frac{f(\mathbf{a} + h\,\mathbf{e}_i) - f(\mathbf{a})}{h},`

where $`\mathbf{e}_i` is the $`i`-th standard basis vector.

**Definition (gradient).** The gradient of $`f` at $`\mathbf{a}` is the vector

$`\nabla f(\mathbf{a}) = \left(\frac{\partial f}{\partial x_1}(\mathbf{a}), \ldots, \frac{\partial f}{\partial x_n}(\mathbf{a})\right).`

**Theorem (directional derivative).** If $`f` is differentiable at $`\mathbf{a}` and $`\mathbf{v}` is a unit vector, then the directional derivative in direction $`\mathbf{v}` is

$`D_{\mathbf{v}} f(\mathbf{a}) = \nabla f(\mathbf{a}) \cdot \mathbf{v}.`

<details><summary>Details</summary>

### From one derivative to many

In one variable, the derivative $`f'(a)` captures the rate of change in the only available direction. In $`\mathbb{R}^n`, there are infinitely many directions. The partial derivatives $`\partial f / \partial x_i` measure the rate of change along the coordinate axes. The gradient collects all partial derivatives into a single vector that encodes the rate of change in *every* direction via the dot product.

### Worked example

Let $`f(x, y) = x^2 y + \sin(xy)`. Then

$`\frac{\partial f}{\partial x} = 2xy + y\cos(xy), \qquad \frac{\partial f}{\partial y} = x^2 + x\cos(xy).`

At $`(1, 0)`: $`\nabla f(1, 0) = (0, 1)`. The steepest ascent direction is $`(0, 1)` (the positive $`y`-direction), and the steepest descent direction is $`(0, -1)`.

### Differentiability versus partial derivatives

Having all partial derivatives exist at a point is *not* sufficient for differentiability. The function $`f(x,y) = \frac{xy}{\sqrt{x^2+y^2}}` (with $`f(0,0)=0`) has $`\partial f/\partial x = \partial f/\partial y = 0` at $`(0,0)`, but is not differentiable there (the limit $`\frac{f(h,0) - f(0,0)}{\|(h,0)\|}` does not give a linear map). Differentiability requires that the linear approximation (given by the gradient) approximates $`f` to first order in *all* directions simultaneously.

<details><summary>Example problem</summary>

**Problem.** Let $`f(x, y) = x^3 - 3xy^2` (the real part of $`z^3`). Find $`\nabla f` and the directional derivative in the direction $`\mathbf{v} = (1, 1)/\sqrt{2}` at $`(1, 1)`.

<details><summary>Solution</summary>

$`\frac{\partial f}{\partial x} = 3x^2 - 3y^2`, $`\frac{\partial f}{\partial y} = -6xy`.

At $`(1, 1)`: $`\nabla f(1,1) = (0, -6)`.

$`D_{\mathbf{v}} f(1,1) = (0, -6) \cdot \frac{(1,1)}{\sqrt{2}} = \frac{-6}{\sqrt{2}} = -3\sqrt{2}`. ∎

</details>

</details>

</details>

## The Jacobian and the chain rule

**Definition (Jacobian).** If $`\mathbf{f}: U \subseteq \mathbb{R}^n \to \mathbb{R}^m` is differentiable at $`\mathbf{a}`, its Jacobian matrix $`D\mathbf{f}(\mathbf{a})` is the $`m \times n` matrix with entries

$`(D\mathbf{f}(\mathbf{a}))_{ij} = \frac{\partial f_i}{\partial x_j}(\mathbf{a}).`

**Theorem (multivariable chain rule).** If $`\mathbf{g}: \mathbb{R}^m \to \mathbb{R}^p` and $`\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m` are differentiable, then $`\mathbf{g} \circ \mathbf{f}` is differentiable and

$`D(\mathbf{g} \circ \mathbf{f})(\mathbf{a}) = D\mathbf{g}(\mathbf{f}(\mathbf{a})) \cdot D\mathbf{f}(\mathbf{a}).`

**Theorem (inverse function theorem, multivariable).** If $`\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^n` is $`C^1` and $`\det D\mathbf{f}(\mathbf{a}) \neq 0`, then $`\mathbf{f}` is locally invertible near $`\mathbf{a}`, and

$`D(\mathbf{f}^{-1})(\mathbf{f}(\mathbf{a})) = [D\mathbf{f}(\mathbf{a})]^{-1}.`

<details><summary>Details</summary>

### The Jacobian as a linear map

The Jacobian matrix represents the best linear approximation to $`\mathbf{f}` near $`\mathbf{a}`: $`\mathbf{f}(\mathbf{a} + \mathbf{h}) \approx \mathbf{f}(\mathbf{a}) + D\mathbf{f}(\mathbf{a})\,\mathbf{h}`. In the special case $`m = n = 1`, the Jacobian is the $`1 \times 1` matrix $`(f'(a))`, recovering the one-variable derivative.

### The chain rule in matrix form

The chain rule says that the derivative of a composition is the product of the derivatives. In one variable: $`(g \circ f)'(a) = g'(f(a)) \cdot f'(a)`. In several variables, the scalars become matrices and the product is matrix multiplication. The dimensions work out: $`D\mathbf{g}` is $`p \times m` and $`D\mathbf{f}` is $`m \times n`, so the product is $`p \times n`.

### Worked example: chain rule

Let $`f(x, y) = x^2 + y^2` and $`\mathbf{g}(t) = (\cos t, \sin t)`. Then $`(f \circ \mathbf{g})(t) = \cos^2 t + \sin^2 t = 1`.

By the chain rule: $`D(f \circ \mathbf{g})(t) = Df(\mathbf{g}(t)) \cdot D\mathbf{g}(t)`.

$`Df(x,y) = (2x, 2y)` (a $`1 \times 2` row), $`D\mathbf{g}(t) = \begin{pmatrix} -\sin t \\ \cos t \end{pmatrix}` (a $`2 \times 1` column).

$`D(f \circ \mathbf{g})(t) = (2\cos t, 2\sin t) \cdot \begin{pmatrix} -\sin t \\ \cos t \end{pmatrix} = -2\cos t \sin t + 2\sin t \cos t = 0`. ✓

### The inverse function theorem

The condition $`\det D\mathbf{f}(\mathbf{a}) \neq 0` means the linear approximation is invertible (no direction is collapsed). This is the multivariable generalization of the one-variable condition $`f'(a) \neq 0` (see [Differentiation](./Differentiation.md)). It guarantees that $`\mathbf{f}` is a local diffeomorphism: it maps small neighborhoods to small neighborhoods with a smooth inverse.

<details><summary>Example problem</summary>

**Problem.** Let $`\mathbf{f}(x, y) = (x^2 - y^2, 2xy)` (the map $`z \mapsto z^2` in complex notation). Compute $`D\mathbf{f}(1, 1)` and determine whether the inverse function theorem applies at $`(1, 1)`.

<details><summary>Solution</summary>

$`D\mathbf{f}(x,y) = \begin{pmatrix} 2x & -2y \\ 2y & 2x \end{pmatrix}`.

At $`(1, 1)`: $`D\mathbf{f}(1,1) = \begin{pmatrix} 2 & -2 \\ 2 & 2 \end{pmatrix}`.

$`\det D\mathbf{f}(1,1) = 4 + 4 = 8 \neq 0`, so the inverse function theorem applies. The local inverse has derivative

$`[D\mathbf{f}(1,1)]^{-1} = \frac{1}{8}\begin{pmatrix} 2 & 2 \\ -2 & 2 \end{pmatrix} = \begin{pmatrix} 1/4 & 1/4 \\ -1/4 & 1/4 \end{pmatrix}`.

(Indeed, the inverse of $`z^2` is $`\sqrt{z}`, and at $`z = 2i` the derivative is $`1/(2\sqrt{2i})`, which matches.) ∎

</details>

</details>

</details>

## The multivariable mean value theorem

**Theorem (MVT, multivariable).** If $`\mathbf{f}: [a, b] \to \mathbb{R}^n` is continuous on $`[a, b]` and differentiable on $`(a, b)`, then there exists $`c \in (a, b)` such that

$`\mathbf{f}(b) - \mathbf{f}(a) = D\mathbf{f}(c) \cdot (b - a).`

**Theorem (MVT, scalar-valued, multivariable).** If $`f: U \subseteq \mathbb{R}^n \to \mathbb{R}` is differentiable on the line segment from $`\mathbf{a}` to $`\mathbf{b}`, then there exists $`\mathbf{c}` on the segment such that

$`f(\mathbf{b}) - f(\mathbf{a}) = \nabla f(\mathbf{c}) \cdot (\mathbf{b} - \mathbf{a}).`

<details><summary>Details</summary>

### Why the multivariable MVT is different

In one variable, the MVT gives a *point* $`c` where the derivative equals the average slope. In several variables, the gradient at a single point generally cannot capture the total change (the gradient is a vector, and the change is a vector in a different direction). The multivariable MVT for scalar-valued functions says the change equals the gradient at some intermediate point dotted with the displacement — a single scalar equation, not a vector equation.

For vector-valued functions, the MVT takes the form $`\mathbf{f}(b) - \mathbf{f}(a) = D\mathbf{f}(c)(b-a)`, which is a vector equation: the change equals the Jacobian at some point applied to the displacement.

### Application: Lipschitz continuity

If $`\|\nabla f(\mathbf{x})\| \leq M` on a convex set $`U`, then by the MVT,

$`|f(\mathbf{b}) - f(\mathbf{a})| \leq M \|\mathbf{b} - \mathbf{a}\|.`

This is the standard proof that a function with bounded gradient is Lipschitz — the workhorse estimate in optimization and PDE theory.

<details><summary>Example problem</summary>

**Problem.** Let $`f(x, y) = e^{x+y}`. Use the multivariable MVT to bound $`|f(1, 1) - f(0, 0)|`.

<details><summary>Solution</summary>

$`\nabla f(x, y) = (e^{x+y}, e^{x+y})`, so $`\|\nabla f(x,y)\| = \sqrt{2}\, e^{x+y}`.

On the segment from $`(0,0)` to $`(1,1)`, the maximum of $`e^{x+y}` is $`e^2` (at $`(1,1)`). So $`\|\nabla f\| \leq \sqrt{2}\, e^2`.

By the MVT: $`|f(1,1) - f(0,0)| \leq \sqrt{2}\, e^2 \cdot \|(1,1)\| = \sqrt{2}\, e^2 \cdot \sqrt{2} = 2e^2`.

The actual value is $`e^2 - 1 \approx 6.39`, and the bound is $`2e^2 \approx 14.78`. The bound is valid but not tight (the MVT guarantees *some* point, not the worst case). ∎

</details>

</details>

</details>

## Multiple integrals and change of variables

**Definition (double integral).** If $`f: R \to \mathbb{R}` is bounded and Riemann integrable on a rectangle $`R = [a,b] \times [c,d]`, then

$`\iint_R f(x,y)\, dx\, dy = \int_c^d \left(\int_a^b f(x,y)\, dx\right) dy.`

(Fubini's theorem justifies the iterated form under mild conditions.)

**Theorem (change of variables).** If $`\mathbf{T}: U \subseteq \mathbb{R}^n \to \mathbb{R}^n` is a $`C^1` diffeomorphism and $`f` is integrable on $`\mathbf{T}(U)`, then

$`\int_{\mathbf{T}(U)} f(\mathbf{y})\, d\mathbf{y} = \int_U f(\mathbf{T}(\mathbf{x})) \, |\det D\mathbf{T}(\mathbf{x})|\, d\mathbf{x}.`

<details><summary>Details</summary>

### From Riemann sums in two dimensions

The double integral is defined by partitioning the rectangle into small sub-rectangles, summing $`f(x_i^*, y_j^*) \Delta x \Delta y`, and taking the limit as the mesh goes to zero. Fubini's theorem (a consequence of the Riemann/Lebesgue integration theory; see [Integration](./Integration.md)) says that for "nice" functions, the double integral equals either iterated integral.

### The change of variables formula

The Jacobian determinant $`|\det D\mathbf{T}|` measures how $`\mathbf{T}` distorts area (in 2D) or volume (in 3D). A small square of area $`\Delta A` in the $`\mathbf{x}`-plane is mapped to a parallelogram of area approximately $`|\det D\mathbf{T}| \, \Delta A` in the $`\mathbf{y}`-plane. The change of variables formula accounts for this distortion.

### Worked example: polar coordinates

The map $`\mathbf{T}(r, \theta) = (r\cos\theta, r\sin\theta)` has Jacobian

$`D\mathbf{T} = \begin{pmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta \end{pmatrix}, \qquad \det D\mathbf{T} = r.`

So $`dx\, dy = r\, dr\, d\theta`. This is why the area element in polar coordinates is $`r\, dr\, d\theta` rather than $`dr\, d\theta`.

**Example:** Compute $`\iint_{x^2+y^2 \leq 1} e^{x^2+y^2}\, dx\, dy`.

In polar coordinates: $`\int_0^{2\pi} \int_0^1 e^{r^2} \, r\, dr\, d\theta = 2\pi \cdot \left[-\frac{1}{2}e^{-r^2}\right]_0^1 = 2\pi \cdot \frac{1}{2}(1 - e^{-1}) = \pi(1 - e^{-1})`.

### Worked example: the volume of a sphere

In spherical coordinates $`(r, \theta, \phi)`, the Jacobian is $`r^2 \sin\phi`. The volume of the unit ball is

$`\int_0^{2\pi} \int_0^{\pi} \int_0^1 r^2 \sin\phi \, dr\, d\phi\, d\theta = 2\pi \cdot 2 \cdot \frac{1}{3} = \frac{4\pi}{3}.`

<details><summary>Example problem</summary>

**Problem.** Use the change of variables $`u = x + y`, $`v = x - y` to compute $`\iint_R (x+y)\, dx\, dy` where $`R` is the unit square $`[0,1] \times [0,1]`.

<details><summary>Solution</summary>

The map $`(x,y) \mapsto (u,v) = (x+y, x-y)` has Jacobian $`\det \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} = -2`, so $`dx\, dy = \frac{1}{2}\, du\, dv`.

The unit square maps to the diamond with vertices $`(0,0)`, $(1,1)$, $(2,0)$, $(1,-1)$ in the $(u,v)$-plane. The region is $`0 \leq u \leq 2`, $`|v| \leq 1 - |u - 1|`.

Since $`x + y = u`, the integral becomes

$`\iint_R (x+y)\, dx\, dy = \frac{1}{2} \iint_{\text{diamond}} u \, du\, dv.`

The diamond is symmetric about $`u = 1` and has area $`2`. By symmetry, $`\iint u \, du\, dv = 1 \cdot 2 = 2` (the centroid is at $`u = 1`). Hence the integral is $`\frac{1}{2} \cdot 2 = 1`.

Verification: $`\int_0^1 \int_0^1 (x+y)\, dy\, dx = \int_0^1 \left[x y + \frac{y^2}{2}\right]_0^1 dx = \int_0^1 \left(x + \frac{1}{2}\right) dx = \frac{1}{2} + \frac{1}{2} = 1`. ✓ ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Let $`f(x, y, z) = x^2 y + y^2 z + z^2 x`.

(a) Compute $`\nabla f(1, 1, 1)`.

(b) Find the directional derivative of $`f` at $`(1,1,1)` in the direction $`\mathbf{v} = (1, 1, 1)/\sqrt{3}`.

(c) Use the multivariable MVT to bound $`|f(2, 2, 2) - f(1, 1, 1)|`.

<details><summary>Solution</summary>

**(a)** $`\frac{\partial f}{\partial x} = 2xy + z^2`, $`\frac{\partial f}{\partial y} = x^2 + 2yz`, $`\frac{\partial f}{\partial z} = y^2 + 2zx`.

At $`(1,1,1)`: $`\nabla f = (3, 3, 3)`.

**(b)** $`D_{\mathbf{v}} f = (3, 3, 3) \cdot \frac{(1,1,1)}{\sqrt{3}} = \frac{9}{\sqrt{3}} = 3\sqrt{3}`.

**(c)** On the segment from $`(1,1,1)` to $`(2,2,2)`, write $`\mathbf{x}(t) = (1+t, 1+t, 1+t)`, $`t \in [0,1]`. Then

$`\nabla f(1+t, 1+t, 1+t) = (3(1+t)^2, 3(1+t)^2, 3(1+t)^2)`.

$`\|\nabla f\| = 3\sqrt{3}\,(1+t)^2 \leq 3\sqrt{3} \cdot 4 = 12\sqrt{3}` for $`t \in [0,1]`.

$`\|\mathbf{b} - \mathbf{a}\| = \|(1,1,1)\| = \sqrt{3}`.

By the MVT: $`|f(2,2,2) - f(1,1,1)| \leq 12\sqrt{3} \cdot \sqrt{3} = 36`.

The actual value: $`f(2,2,2) = 4\cdot 2 + 4\cdot 2 + 4\cdot 2 = 24`, $`f(1,1,1) = 3`. So $`|24 - 3| = 21 \leq 36`. ✓ ∎

</details>

</details>
