# Analytic continuation and Riemann surfaces

Analytic continuation extends a holomorphic function beyond the disk where its defining power series converges, and Riemann surfaces give multi-valued functions (like the complex logarithm and square root) a single-valued home by building a surface over the plane. Together they explain why a function's "true" domain is often larger — and sometimes higher-dimensional — than the region where it was first written down, and they underlie the geometry behind [Conformal mapping](./Conformal-mapping.md) and the global theorems of [Complex analysis](./Readme.md).

> **Authoritative sources**
> - [L. Ahlfors, *Complex Analysis*, Ch. 5](https://www.ams.org/bookstore/getitemspage?item=GAO-10)
> - [O. Forster, *Lectures on Riemann Surfaces*](https://www.ams.org/bookstore/getitemspage?item=GST-80)

## Analytic continuation

**Definition.** Let $`f` be holomorphic on a domain $`U`. An **analytic continuation** of $`f` to a larger domain $`V \supseteq U` is a holomorphic function $`F` on $`V` such that $`F|_U = f`.

<details><summary>Details</summary>

### Why continuation is possible at all

A power series $`\sum a_n (z-z_0)^n` converges only inside its disk of convergence, whose boundary is hit by the nearest singularity. But a holomorphic function is not "just" that one series: near any other point $`z_1` (not a singularity) it has its own convergent power series. If the two disks overlap, the identity theorem forces the two series to agree on the overlap. Chaining such overlapping disks from $`z_0` out to a distant point $`z_2` carries the function along — this is analytic continuation.

### Why the continuation is unique

Suppose $`F_1` and $`F_2` are two holomorphic functions on a connected domain $`V`, both equal to $`f` on $`U`. They agree on the open set $`U`, so by the identity theorem they agree on all of $`V`. Hence the continuation, when it exists, is unique. This is what makes "the" analytic continuation of a function well-defined.

### Worked example: continuing $`1/(1-z)`

Near $`z = 0`, $`f(z) = 1/(1-z) = \sum_{n=0}^{\infty} z^n`, with radius of convergence $`1` (the singularity at $`z = 1`). To reach a point like $`z = 2`, continue through a chain of disks. Center a new series at $`z_0 = 3/2`:

$`\frac{1}{1-z} = \frac{1}{-1/2 - (z - 3/2)} = -2 \sum_{n=0}^{\infty} \big(-2(z - 3/2)\big)^n,`

which converges for $`|z - 3/2| < 1/2`, a disk that contains $`z = 2`. Evaluating at $`z = 2` gives $`1/(1-2) = -1`, matching the original formula. The power series changed, but the function it represents is the same.

<svg viewBox="0 0 460 220" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="220" fill="#fafafa"/>
  <circle cx="110" cy="110" r="55" fill="none" stroke="#1a56c4" stroke-width="2"/>
  <circle cx="200" cy="110" r="55" fill="none" stroke="#1a56c4" stroke-width="2" stroke-dasharray="5 3"/>
  <circle cx="290" cy="110" r="55" fill="none" stroke="#1a56c4" stroke-width="2" stroke-dasharray="5 3"/>
  <circle cx="110" cy="110" r="3" fill="#333"/>
  <circle cx="340" cy="110" r="3" fill="#c43a1a"/>
  <text x="95" y="135" font-size="12" fill="#333">z0</text>
  <text x="345" y="135" font-size="12" fill="#c43a1a">z2</text>
  <text x="10" y="205" font-size="12" fill="#444">Continuation: a chain of overlapping disks carries the function from z0 to z2.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Show that the analytic continuation of $`f(z) = 1/(1-z)` (defined near $`0`) to $`\mathbb{C} \setminus \{1\}` is unique and equals $`1/(1-z)`.

<details><summary>Solution</summary>

Let $`F` be any holomorphic continuation to $`\mathbb{C} \setminus \{1\}`. On the disk $`|z| < 1`, $`F(z) = \sum z^n = 1/(1-z)`. The set $`\{z : |z| < 1\} \cap (\mathbb{C}\setminus\{1\})` is open and nonempty, and on it $`F(z) = 1/(1-z)`. Since $`\mathbb{C} \setminus \{1\}` is connected and both $`F` and $`1/(1-z)` are holomorphic there, the identity theorem gives $`F(z) = 1/(1-z)` everywhere on $`\mathbb{C} \setminus \{1\}`. ∎

</details>

</details>

</details>

## Monodromy and branch points

**Definition.** A point $`a` is a **branch point** of a (multi-valued) function if analytic continuation of a branch along a small loop encircling $`a` does not return to the original branch. The **monodromy** of the function is the rule that records which branch one lands on after continuing along a given loop.

<details><summary>Details</summary>

### The logarithm: a one-valued-looking function that is not

Write $`z = re^{i\theta}`. A value of the logarithm is $`\log z = \ln r + i\theta`. But $`\theta` is only defined up to multiples of $`2\pi`, so $`\log z` has infinitely many values $`\ln r + i(\theta + 2\pi k)`, $`k \in \mathbb{Z}`. Continuing one branch once around $`0` sends $`\theta \to \theta + 2\pi`, adding $`2\pi i`: the function does not return to its start. Thus $`0` is a branch point of $`\log z`.

### The square root: two branches, two loops

For $`z = re^{i\theta}`, a value of $`\sqrt{z}` is $`\sqrt{r}\, e^{i\theta/2}`. One loop around $`0` sends $`\theta \to \theta + 2\pi`, so $`\sqrt{z} \to \sqrt{r}\, e^{i(\theta/2 + \pi)} = -\sqrt{z}`: we land on the other branch. A second loop returns us to the start. So $`\sqrt{z}` has exactly two branches and $`0` is a branch point of order $`2`.

### The monodromy theorem

If analytic continuation of a function along **every** closed loop in a domain returns to the starting value (trivial monodromy), then the function is single-valued on that domain. Conversely, a nontrivial monodromy (as for $`\log` and $`\sqrt{}`) is precisely the obstruction to being single-valued, and it is what forces us to pass to a Riemann surface.

<svg viewBox="0 0 460 240" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="240" fill="#fafafa"/>
  <circle cx="230" cy="120" r="70" fill="none" stroke="#1a56c4" stroke-width="2"/>
  <polygon points="300,120 290,114 290,126" fill="#1a56c4"/>
  <circle cx="230" cy="120" r="4" fill="#c43a1a"/>
  <text x="240" y="115" font-size="12" fill="#c43a1a">branch point 0</text>
  <text x="150" y="60" font-size="12" fill="#1a56c4">loop once</text>
  <text x="10" y="230" font-size="12" fill="#444">For sqrt(z), one loop around 0 flips the sign; two loops return to the start.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Show that $`\sqrt{z}` has a branch point at $`z = 0` but at no other point.

<details><summary>Solution</summary>

At $`z = 0`: as shown, one loop around $`0` sends a branch to its negative, so continuation does not return to the start — $`0` is a branch point. At any $`a \neq 0`: choose a small disk around $`a` that does not contain $`0`. On this disk a single-valued holomorphic branch of $`\sqrt{z}` exists (take a continuous determination of the argument on the simply connected disk). A loop inside this disk has winding number zero about $`0`, so continuation around it returns to the starting branch. Hence no $`a \neq 0` is a branch point. ∎

</details>

</details>

</details>

## Riemann surfaces

**Definition.** A **Riemann surface** is a one-dimensional complex manifold: a space that locally looks like an open set of $`\mathbb{C}`, with holomorphic transition maps. For a multi-valued function, its Riemann surface is built by stacking copies of the plane ("sheets") and gluing them along branch cuts so that the function becomes single-valued and holomorphic on the surface.

<details><summary>Details</summary>

### Making $`\log z` single-valued: the infinite spiral

Take countably many copies of the slit plane $`\mathbb{C} \setminus (-\infty, 0]`, one for each integer $`k`, each carrying the branch $`\log_k z = \ln r + i(\theta + 2\pi k)`. Glue the upper edge of the cut on sheet $`k` to the lower edge of the cut on sheet $`k+1`. The result is an infinite spiral: walking around $`0` climbs to the next sheet, and $`\log z` is now a single-valued holomorphic function on the surface. The projection to the $`z`-plane is a covering map.

### Making $`\sqrt{z}` single-valued: two sheets

Take two copies of the slit plane and glue the upper edge of the cut on the first sheet to the lower edge on the second, and the lower edge on the first to the upper edge on the second. A path around $`0` moves from one sheet to the other; two loops return to the starting sheet. On this two-sheeted surface, $`\sqrt{z}` is single-valued and holomorphic.

### Why this is the right framework

On its Riemann surface, every "multi-valued" function is actually a perfectly ordinary single-valued holomorphic (or meromorphic) function. The surface is the function's true domain. The Riemann sphere $`\widehat{\mathbb{C}}` is the simplest compact Riemann surface, and the classification of compact Riemann surfaces by genus is a central achievement of the subject. Riemann surfaces also provide the geometric language for [Conformal mapping](./Conformal-mapping.md): a conformal map is precisely a holomorphic map between Riemann surfaces.

<svg viewBox="0 0 460 240" width="100%" style="max-width:460px" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="460" height="240" fill="#fafafa"/>
  <!-- two sheets as two ellipses offset -->
  <ellipse cx="230" cy="150" rx="150" ry="45" fill="none" stroke="#1a56c4" stroke-width="2"/>
  <ellipse cx="230" cy="90" rx="150" ry="45" fill="none" stroke="#c43a1a" stroke-width="2"/>
  <line x1="80" y1="150" x2="80" y2="90" stroke="#999" stroke-dasharray="4 3"/>
  <line x1="380" y1="150" x2="380" y2="90" stroke="#999" stroke-dasharray="4 3"/>
  <text x="200" y="165" font-size="12" fill="#1a56c4">sheet 1</text>
  <text x="200" y="85" font-size="12" fill="#c43a1a">sheet 2</text>
  <text x="10" y="230" font-size="12" fill="#444">Two sheets glued along a cut: sqrt(z) becomes single-valued on the surface.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Describe the Riemann surface of $`f(z) = \sqrt[3]{z}` and state how many sheets it has.

<details><summary>Solution</summary>

Write $`z = re^{i\theta}`; a value of $`\sqrt[3]{z}` is $`r^{1/3} e^{i\theta/3}`. One loop around $`0` sends $`\theta \to \theta + 2\pi`, multiplying the value by $`e^{2\pi i/3}`; three loops multiply by $`e^{2\pi i} = 1` and return to the start. So there are three branches, and the Riemann surface has three sheets. Take three copies of the slit plane, each carrying one branch $`r^{1/3} e^{i(\theta + 2\pi k)/3}`, $`k = 0, 1, 2`, and glue the upper edge of the cut on sheet $`k` to the lower edge on sheet $`k+1 \pmod{3}`. On this three-sheeted surface $`\sqrt[3]{z}` is single-valued and holomorphic, with $`0` a branch point of order $`3`. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Let $`f(z) = (1+z)^{1/3}` be defined near $`z = 0` by the principal branch. As $`z` travels once around the circle $`|1+z| = 1` (i.e. one full loop about $`z = -1`), how many distinct values does $`f` take, and how many full loops are needed to return to the starting value?

<details><summary>Solution</summary>

The function $`(1+z)^{1/3}` has a branch point at $`z = -1` (where $`1+z = 0`). Parametrize the loop by $`1+z = e^{it}`, $`t` from $`0` to $`2\pi`; then $`f = e^{it/3}`. After one loop, $`t = 2\pi` and $`f = e^{2\pi i/3} \neq 1`, a new value. The three values encountered over one loop are $`e^{0}, e^{2\pi i/3}, e^{4\pi i/3}` (the three cube roots of unity), so $`f` takes three distinct values. After three loops, $`t = 6\pi` and $`f = e^{6\pi i/3} = e^{2\pi i} = 1`, returning to the start. Hence three distinct values, and three loops to return. ∎

</details>

</details>
