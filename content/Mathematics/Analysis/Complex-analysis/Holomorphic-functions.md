# Holomorphic functions

A holomorphic function is one that is complex-differentiable on an open set. This single condition is extraordinarily strong: it forces the function to be infinitely differentiable, to equal its power series, and to be completely determined by its values on any small open subset. Holomorphic functions are the basic objects of [Complex analysis](./Readme.md) and the starting point for [Complex integration](./Complex-integration.md), [Conformal mapping](./Conformal-mapping.md), and [Analytic continuation and Riemann surfaces](./Analytic-continuation-and-Riemann-surfaces.md).

> **Authoritative sources**
> - [J. B. Conway, *Functions of One Complex Variable I*](https://www.ams.org/bookstore/getitemspage?item=GST-17)
> - [L. Ahlfors, *Complex Analysis*](https://www.ams.org/bookstore/getitemspage?item=GAO-10)

## Complex differentiability and the Cauchy–Riemann equations

**Definition.** A function $`f: U \to \mathbb{C}` on an open set $`U \subseteq \mathbb{C}` is **holomorphic** (or analytic) at $`z_0 \in U` if the limit

$`f'(z_0) = \lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h}`

exists, where $`h` ranges over all complex values. It is holomorphic on $`U` if it is holomorphic at every point of $`U`.

**Cauchy–Riemann equations.** If $`f = u + iv` with $`u, v: U \to \mathbb{R}` differentiable, then $`f` is holomorphic at $`z_0` only if

$`\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}`

at $`z_0`. (If the partial derivatives exist and are continuous near $`z_0`, these equations are also sufficient.)

<details><summary>Details</summary>

### Why complex differentiability is rigid

A real derivative is a limit as $`h \to 0` along the real line — one direction. A complex derivative is a limit as $`h \to 0` from **every** direction in the plane. For the limit to exist, the difference quotient must approach the same value whether $`h` approaches $`0` along the real axis or along the imaginary axis.

Write $`f = u + iv`. Along the real axis ($`h = t \in \mathbb{R}`):

$`\lim_{t \to 0} \frac{f(z_0 + t) - f(z_0)}{t} = u_x + i\, v_x.`

Along the imaginary axis ($`h = it`):

$`\lim_{t \to 0} \frac{f(z_0 + it) - f(z_0)}{it} = v_y - i\, u_y.`

Equating the two expressions (real part with real part, imaginary with imaginary) gives exactly the Cauchy–Riemann equations. So the equations are the statement that "the derivative does not depend on the direction of approach."

### Worked example

Take $`f(z) = z^2 = (x+iy)^2 = (x^2 - y^2) + i(2xy)`. Then $`u = x^2 - y^2` and $`v = 2xy`.

$`u_x = 2x, \quad v_y = 2x, \qquad u_y = -2y, \quad -v_x = -2y.`

Both Cauchy–Riemann equations hold everywhere, so $`f` is holomorphic on all of $`\mathbb{C}`. Directly, $`f'(z) = 2z`.

### A function that fails

Take $`f(z) = \bar{z} = x - iy`, so $`u = x`, $`v = -y`. Then $`u_x = 1` but $`v_y = -1`, so the first Cauchy–Riemann equation fails everywhere. Indeed $`\bar{z}` is nowhere complex-differentiable: approaching $`0` along the real axis gives quotient $`1`, along the imaginary axis gives $`-1`.

<svg viewBox="0 0 460 240" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="240" fill="#fafafa"/>
  <line x1="230" y1="10" x2="230" y2="230" stroke="#ccc"/>
  <line x1="10" y1="120" x2="450" y2="120" stroke="#ccc"/>
  <text x="440" y="115" font-size="12" fill="#666">Re</text>
  <text x="235" y="20" font-size="12" fill="#666">Im</text>
  <!-- real-axis approach -->
  <line x1="230" y1="120" x2="360" y2="120" stroke="#1a56c4" stroke-width="2"/>
  <polygon points="360,120 350,116 350,124" fill="#1a56c4"/>
  <text x="300" y="112" font-size="12" fill="#1a56c4">h real</text>
  <!-- imaginary-axis approach -->
  <line x1="230" y1="120" x2="230" y2="40" stroke="#c43a1a" stroke-width="2"/>
  <polygon points="230,40 226,50 234,50" fill="#c43a1a"/>
  <text x="240" y="70" font-size="12" fill="#c43a1a">h imaginary</text>
  <circle cx="230" cy="120" r="3" fill="#333"/>
  <text x="10" y="235" font-size="12" fill="#444">The complex derivative must be the same limit from every direction.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Show that $`f(z) = |z|^2 = x^2 + y^2` is complex-differentiable only at $`z = 0`.

<details><summary>Solution</summary>

Here $`u = x^2 + y^2`, $`v = 0`. The Cauchy–Riemann equations require $`u_x = v_y = 0` and $`u_y = -v_x = 0`, i.e. $`2x = 0` and $`2y = 0`, which holds only at $`(0,0)`. So the only candidate is $`z = 0`. Check the derivative there directly: $`\frac{|h|^2 - 0}{h} = \frac{h\bar{h}}{h} = \bar{h} \to 0` as $`h \to 0`. Hence $`f'(0) = 0`, and $`f` is differentiable only at $`0`. ∎

</details>

</details>

</details>

## Power series and analyticity

**Theorem.** If $`f` is holomorphic on an open disk $`D(z_0, r)`, then $`f` equals a convergent power series there:

$`f(z) = \sum_{n=0}^{\infty} a_n (z - z_0)^n, \qquad a_n = \frac{f^{(n)}(z_0)}{n!}.`

Conversely, every power series defines a holomorphic function inside its disk of convergence. Thus "holomorphic" and "locally given by a convergent power series" are the same thing.

<details><summary>Details</summary>

### The key fact: holomorphic implies smooth

On the real line, a function can be differentiable once and not twice (e.g. $`f(x) = x^2 \sin(1/x^2)` near $`0` with $`f(0)=0`). In the complex plane this cannot happen: a function holomorphic on an open set is automatically $`C^\infty` and even real-analytic. The reason is that the Cauchy–Riemann equations make $`u` and $`v` harmonic, and harmonic functions are smooth.

### Worked example: the exponential

The power series $`e^z = \sum_{n=0}^{\infty} z^n / n!` has infinite radius of convergence, so it defines a holomorphic function on all of $`\mathbb{C}`. Its derivative is term-by-term:

$`\frac{d}{dz} \sum_{n=0}^{\infty} \frac{z^n}{n!} = \sum_{n=1}^{\infty} \frac{z^{n-1}}{(n-1)!} = \sum_{n=0}^{\infty} \frac{z^n}{n!} = e^z.`

So $`(e^z)' = e^z`, exactly as in the real case.

### Radius of convergence

For a general power series $`\sum a_n (z-z_0)^n`, the radius of convergence is $`r = 1/\limsup |a_n|^{1/n}` (with the usual conventions $`0 \cdot \infty = 0`). Inside the disk the series converges absolutely and defines a holomorphic function; on the boundary the behavior can be anything.

<details><summary>Example problem</summary>

**Problem.** Find the radius of convergence of $`\sum_{n=0}^{\infty} \frac{z^n}{n!}` and of $`\sum_{n=0}^{\infty} n! \, z^n`.

<details><summary>Solution</summary>

For $`\sum z^n/n!`, $`|a_n|^{1/n} = (n!)^{-1/n} \to 0` (Stirling), so $`r = \infty`. For $`\sum n! z^n`, $`|a_n|^{1/n} = (n!)^{1/n} \to \infty`, so $`r = 0`: the series converges only at $`z = 0`. ∎

</details>

</details>

</details>

## The identity theorem and the maximum modulus principle

**Identity theorem.** If $`f` is holomorphic on a connected open set $`U` and $`f(z) = 0` on a set with an accumulation point in $`U`, then $`f \equiv 0` on $`U`.

**Maximum modulus principle.** If $`f` is holomorphic on a bounded domain $`U` and continuous on its closure, then $`|f|` attains its maximum on the boundary of $`U`, unless $`f` is constant. In particular, a non-constant holomorphic function has no local maximum of $`|f|` in the interior.

<details><summary>Details</summary>

### Why the identity theorem holds

Because $`f` equals a power series near any point, the zeros of $`f` are isolated unless $`f \equiv 0`: if $`f(z_0) = 0` but $`f` is not identically zero, then $`f(z) = (z - z_0)^m g(z)` with $`g(z_0) \neq 0`, so $`f` is nonzero in a punctured neighborhood of $`z_0`. A set with an accumulation point therefore forces $`f \equiv 0`. This is the "global behavior is controlled by values on any small open set" property stated in the overview.

### Why the maximum modulus principle holds

Suppose $`|f|` had a local maximum at an interior point $`z_0` with $`f(z_0) \neq 0`. Then $`g = 1/f` is holomorphic near $`z_0` and $`|g|` has a local minimum there. But a non-constant holomorphic function cannot have a local extremum of modulus: expanding $`f` in a power series about $`z_0` shows that $`|f|` strictly increases in some direction and strictly decreases in another. Hence $`f` must be constant.

### Consequence: minimum modulus and open mapping

The maximum modulus principle applied to $`1/f` gives the minimum modulus principle. Together they imply the **open mapping theorem**: a non-constant holomorphic function maps open sets to open sets. This is the geometric heart of [Conformal mapping](./Conformal-mapping.md).

<svg viewBox="0 0 460 220" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="220" fill="#fafafa"/>
  <ellipse cx="230" cy="110" rx="180" ry="80" fill="none" stroke="#1a56c4" stroke-width="2"/>
  <text x="230" y="115" font-size="13" fill="#1a56c4" text-anchor="middle">|f| on the boundary</text>
  <circle cx="230" cy="110" r="4" fill="#c43a1a"/>
  <text x="230" y="95" font-size="12" fill="#c43a1a" text-anchor="middle">no interior max</text>
  <text x="10" y="210" font-size="12" fill="#444">A non-constant holomorphic function's modulus peaks on the boundary, never inside.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Let $`f` be holomorphic on the unit disk and continuous on its closure, with $`|f(z)| \leq 1` on $`|z| = 1` and $`f(0) = 0`. Show that $`|f(z)| \leq |z|` for all $`|z| < 1`.

<details><summary>Solution</summary>

Define $`g(z) = f(z)/z` for $`z \neq 0` and $`g(0) = f'(0)`. Since $`f(0) = 0`, $`g` is holomorphic on the disk. By the maximum modulus principle, $`|g|` attains its maximum on $`|z| = 1`, where $`|g(z)| = |f(z)|/|z| \leq 1`. Hence $`|g(z)| \leq 1` everywhere, i.e. $`|f(z)| \leq |z|`. This is the first step of the Schwarz lemma. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Let $`f` be holomorphic on a connected open set $`U` and suppose $`|f|` is constant on $`U`. Show that $`f` is constant.

<details><summary>Solution</summary>

If $`f` is never zero, then $`g = 1/f` is holomorphic and $`|g| = 1/|f|` is also constant. In either case we have a holomorphic function whose modulus is constant. Write $`f = u + iv` with $`u^2 + v^2 = C`. The Cauchy–Riemann equations give $`u_x = v_y` and $`u_y = -v_x`. Differentiating $`u^2 + v^2 = C` with respect to $`x`: $`2u u_x + 2v v_x = 0`. Substituting $`v_x = -u_y`: $`u u_x - v u_y = 0`. Similarly differentiating in $`y`: $`u u_y + v v_y = 0`, i.e. $`u u_y + v u_x = 0`. The system $`\begin{pmatrix} u & -v \\ v & u \end{pmatrix} \begin{pmatrix} u_x \\ u_y \end{pmatrix} = 0` has determinant $`u^2 + v^2 = C \neq 0` (if $`C \neq 0`), so $`u_x = u_y = 0`, hence $`u` and $`v` are constant and $`f` is constant. If $`C = 0`, then $`f \equiv 0`. ∎

</details>

</details>
