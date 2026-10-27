# Conformal mapping

A conformal map is a holomorphic function with non-zero derivative, and it preserves angles between curves. This makes conformal maps the natural coordinate changes of two-dimensional physics: they carry solutions of Laplace's equation (electrostatics, fluid flow, heat conduction) from a complicated domain to a simple one where the problem is easy, and then pull the answer back. The Riemann mapping theorem guarantees that, up to a Möbius transformation, every simply connected domain looks like the unit disk.

> **Authoritative sources**
> - [L. Ahlfors, *Complex Analysis*, Ch. 4](https://www.ams.org/bookstore/getitemspage?item=GAO-10)
> - [J. B. Conway, *Functions of One Complex Variable I*, Ch. 6](https://www.ams.org/bookstore/getitemspage?item=GST-17)

## Conformal (angle-preserving) maps

**Definition.** A holomorphic function $`f` is **conformal** (or angle-preserving) at $`z_0` if $`f'(z_0) \neq 0`. At such a point, $`f` maps the tangent direction of any curve through $`z_0` to the tangent direction of its image, preserving both the magnitude and the orientation of the angle between curves.

<details><summary>Details</summary>

### Why a non-zero derivative preserves angles

Write $`f'(z_0) = re^{i\theta}`. For a curve $`\gamma` through $`z_0` with tangent direction $`\gamma'(t_0)`, the image curve $`f \circ \gamma` has tangent

$`(f \circ \gamma)'(t_0) = f'(z_0)\, \gamma'(t_0) = re^{i\theta}\, \gamma'(t_0).`

Multiplication by $`re^{i\theta}` scales every tangent vector by $`r` and rotates it by the same angle $`\theta`. Since the same scale and rotation is applied to **every** direction, the angle between any two curves is unchanged. This is exactly the content of the Cauchy–Riemann equations: the derivative is a similarity (uniform scaling plus rotation), not a general linear map.

### Why the non-zero condition is essential

If $`f'(z_0) = 0`, the first-order term vanishes and the map is governed by the first non-zero higher derivative $`f^{(k)}(z_0) (z-z_0)^k / k!`. Such a map multiplies angles at $`z_0` by the integer $`k`: for example $`f(z) = z^2` doubles angles at the origin. So $`z^2` is conformal everywhere except at $`0`.

### Worked example

The map $`f(z) = e^z = e^x e^{iy}` has $`f'(z) = e^z \neq 0` everywhere, so it is conformal on all of $`\mathbb{C}`. It sends vertical lines $`x = c` to circles $`|w| = e^c` and horizontal lines $`y = c` to rays $`\arg w = c`, so it maps the horizontal strip $`0 < y < \pi` conformally onto the upper half-plane. Grid lines that met at right angles still meet at right angles.

<svg viewBox="0 0 460 240" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="240" fill="#fafafa"/>
  <!-- two curves meeting at angle -->
  <line x1="120" y1="180" x2="230" y2="120" stroke="#1a56c4" stroke-width="2"/>
  <line x1="120" y1="180" x2="230" y2="150" stroke="#c43a1a" stroke-width="2"/>
  <path d="M 165 150 A 40 40 0 0 0 158 165" fill="none" stroke="#333" stroke-width="1.5"/>
  <text x="170" y="150" font-size="12" fill="#333">θ</text>
  <circle cx="120" cy="180" r="3" fill="#333"/>
  <text x="10" y="230" font-size="12" fill="#444">A conformal map applies the same rotation+scale to every direction, so θ is preserved.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Show that $`f(z) = z^2` is conformal at every $`z \neq 0` but not at $`z = 0`.

<details><summary>Solution</summary>

$`f'(z) = 2z`, which is non-zero for $`z \neq 0`, so $`f` is conformal there. At $`z = 0`, $`f'(0) = 0`. To see the angle behavior, a curve with tangent direction $`\phi` at $`0` is sent to direction $`2\phi` (since $`z^2` squares the argument). Two curves meeting at angle $`\theta` meet at angle $`2\theta` in the image, so angles are not preserved. ∎

</details>

</details>

</details>

## Möbius transformations

**Definition.** A Möbius (or linear fractional) transformation is a map of the form

$`f(z) = \frac{az + b}{cz + d}, \qquad ad - bc \neq 0,`

defined on the Riemann sphere $`\widehat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}`. Möbius transformations are conformal automorphisms of the Riemann sphere and map generalized circles (circles and lines) to generalized circles.

<details><summary>Details</summary>

### Why they are conformal and circle-preserving

On $`\mathbb{C}` (away from the pole $`z = -d/c`), $`f'(z) = (ad - bc)/(cz+d)^2 \neq 0`, so Möbius maps are conformal. They are built from translations, scalings, and the inversion $`z \mapsto 1/z`, each of which sends circles and lines to circles and lines; a composition does too. A line is a "circle through $`\infty`", and Möbius maps permute the points of the sphere, so they carry the family of generalized circles to itself.

### The three building blocks

- Translation $`z \mapsto z + b` and scaling $`z \mapsto a z`: obvious circle-preservers.
- Inversion $`z \mapsto 1/z`: a circle not through $`0` maps to a circle; a circle through $`0` maps to a line; a line not through $`0` maps to a circle through $`0`; a line through $`0` maps to itself.

### Worked example: mapping a half-plane to a disk

The map $`f(z) = \frac{z - i}{z + i}` sends the upper half-plane $`\operatorname{Im} z > 0` conformally onto the unit disk. Check the boundary: the real axis $`z = x` maps to $`f(x) = (x-i)/(x+i)`, whose modulus is $`|x-i|/|x+i| = 1`, so the boundary goes to $`|w| = 1`. The point $`z = i` (inside) maps to $`0` (inside). Hence the interior maps to the disk.

<svg viewBox="0 0 460 240" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="240" fill="#fafafa"/>
  <line x1="20" y1="150" x2="440" y2="150" stroke="#999"/>
  <path d="M 40 150 A 200 200 0 0 1 440 150" fill="none" stroke="#1a56c4" stroke-width="2"/>
  <circle cx="230" cy="70" r="4" fill="#c43a1a"/>
  <text x="240" y="65" font-size="12" fill="#c43a1a">i -> 0</text>
  <text x="10" y="230" font-size="12" fill="#444">(z - i)/(z + i) sends the real axis to the unit circle and the upper half-plane to the disk.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Find a Möbius transformation that maps the unit disk to the upper half-plane and sends $`z = 1` to $`\infty`.

<details><summary>Solution</summary>

We want a map sending the boundary circle $`|z| = 1` to the real axis and $`z = 1` to $`\infty` (so the pole is at $`z = 1`). Take $`f(z) = i \frac{1 + z}{1 - z}`. The pole is at $`z = 1`. For $`z` on the unit circle, $`z = e^{i\theta}`, one checks $`f(z)` is real: $`f(e^{i\theta}) = i \frac{1 + e^{i\theta}}{1 - e^{i\theta}} = i \cdot \frac{e^{i\theta/2}(e^{-i\theta/2} + e^{i\theta/2})}{e^{i\theta/2}(e^{-i\theta/2} - e^{i\theta/2})} = i \cdot \frac{2\cos(\theta/2)}{-2i \sin(\theta/2)} = -\cot(\theta/2) \in \mathbb{R}`. The point $`z = 0` (inside) maps to $`i`, which is in the upper half-plane, so the disk maps to the upper half-plane. ∎

</details>

</details>

</details>

## The Riemann mapping theorem

**Theorem (Riemann mapping).** Let $`\Omega \subsetneq \widehat{\mathbb{C}}` be a simply connected domain whose boundary contains more than one point. Then there exists a conformal map $`f: \Omega \to \mathbb{D}` (the unit disk). Moreover, $`f` is unique up to post-composition with a rotation of the disk: if $`f(0) = 0` and $`f'(0) > 0`, then $`f` is unique.

<details><summary>Details</summary>

### What the theorem says, in plain terms

Up to a conformal change of coordinates, every "nice" simply connected domain is the unit disk. The complicated geometry of the domain is entirely absorbed by the map $`f`; once you are in the disk, problems (e.g. solving Laplace's equation with given boundary data) can be attacked with the simple disk geometry and then transported back.

### Why the hypotheses are needed

- **Simply connected**: the disk is simply connected, and conformal maps preserve the fundamental group. A domain with a hole (e.g. an annulus) cannot be conformally mapped to the disk.
- **Proper subset of the sphere**: the whole sphere and the whole plane are simply connected but not conformally equivalent to the disk (Liouville's theorem: a bounded holomorphic function on $`\mathbb{C}` is constant, so no conformal map $`\mathbb{C} \to \mathbb{D}` exists).
- **Boundary with more than one point**: excludes pathological domains.

### Sketch of existence (extremal length / normal families)

One classical proof uses the family of all conformal maps from $`\Omega` into $`\mathbb{D}` and shows, via a normal-family (Montel) compactness argument, that the one maximizing $`|f'(z_0)|` exists and is onto. Uniqueness up to rotation follows from the Schwarz lemma applied to $`f_1 \circ f_2^{-1}`.

### Use in potential theory

To solve $`\Delta u = 0` in $`\Omega` with boundary data $`g`, map $`\Omega` to $`\mathbb{D}` by $`f`, solve the (easier) Dirichlet problem in the disk with data $`g \circ f^{-1}` (via the Poisson integral), and pull back: $`u = u_{\mathbb{D}} \circ f`. Because conformal maps preserve harmonicity (the real part of a holomorphic function is harmonic, and composition with a conformal map preserves the Laplacian up to a positive factor), this gives the solution in $`\Omega`.

<svg viewBox="0 0 460 240" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="240" fill="#fafafa"/>
  <path d="M 60 120 C 60 60, 150 50, 180 90 C 210 130, 150 190, 100 180 C 60 172, 55 150, 60 120 Z" fill="none" stroke="#1a56c4" stroke-width="2"/>
  <text x="90" y="125" font-size="12" fill="#1a56c4">Ω</text>
  <path d="M 250 120 L 320 120" stroke="#333" stroke-width="2"/>
  <polygon points="320,120 310,115 310,125" fill="#333"/>
  <circle cx="380" cy="120" r="45" fill="none" stroke="#c43a1a" stroke-width="2"/>
  <text x="368" y="125" font-size="12" fill="#c43a1a">D</text>
  <text x="10" y="230" font-size="12" fill="#444">The Riemann mapping theorem: any simply connected Ω (with nontrivial boundary) is conformally the disk.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Explain why there is no conformal map from the annulus $`\{z : 1 < |z| < 2\}` onto the unit disk.

<details><summary>Solution</summary>

The annulus is not simply connected: a loop around the hole $`|z| = 1` cannot be contracted to a point within the annulus, so its fundamental group is $`\mathbb{Z}`. The disk is simply connected (fundamental group trivial). Conformal maps are homeomorphisms, and homeomorphisms preserve the fundamental group. Since $`\mathbb{Z} \not\cong \{0\}`, no conformal (indeed no homeomorphic) map from the annulus onto the disk exists. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Find a conformal map from the upper half-plane $`\mathbb{H} = \{z : \operatorname{Im} z > 0\}` onto the first quadrant $`\{w : \operatorname{Re} w > 0, \operatorname{Im} w > 0\}`.

<details><summary>Solution</summary>

Compose two elementary conformal maps. First, $`z \mapsto z^2` maps the upper half-plane onto the plane slit along the positive real axis: a point $`z = re^{i\theta}` with $`0 < \theta < \pi` goes to $`r^2 e^{2i\theta}` with $`0 < 2\theta < 2\pi`, i.e. the whole plane minus the positive real axis. Then $`w \mapsto \sqrt{w}` (the branch with $`0 < \arg < \pi`) is the inverse of $`z^2` on that slit plane and maps it onto the upper half-plane — not quite the quadrant. Instead, use $`f(z) = z^{1/2}` composed differently: take $`f(z) = \sqrt{z}` with the branch giving $`0 < \arg f < \pi/2` when $`0 < \arg z < \pi`. Concretely, $`f(z) = z^{1/2}` (principal branch) sends $`z = re^{i\theta}`, $`0 < \theta < \pi`, to $`\sqrt{r}\, e^{i\theta/2}` with $`0 < \theta/2 < \pi/2`, i.e. the first quadrant. Since $`f'(z) = \frac{1}{2} z^{-1/2} \neq 0` on $`\mathbb{H}`, $`f` is conformal there. ∎

</details>

</details>
