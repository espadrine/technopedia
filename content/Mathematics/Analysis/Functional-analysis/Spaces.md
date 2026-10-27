# Spaces

Spaces is the foundation of functional analysis: it classifies the infinite-dimensional vector spaces on which everything else lives — normed spaces, Banach spaces, and Hilbert spaces — and studies how each space relates to its dual. It is the place to look when a problem is about *where* a function lives (which space it belongs to, whether that space is "complete enough," and whether it is its own double dual). This page covers norms and completeness, Hilbert-space geometry, duality, and reflexivity.

> **Authoritative sources**
> - [J. B. Conway, *A Course in Functional Analysis*](https://www.ams.org/bookstore/getitemspage?item=CBM-008)
> - [W. Rudin, *Functional Analysis*, Ch. 1–4](https://www.ams.org/bookstore/getitemspage?item=CBM-001)

## Normed and Banach spaces

**Definition.** A **norm** on a vector space $`X` is a function $`\| \cdot \| : X \to [0, \infty)` satisfying the three axioms

```math
\|x\| = 0 \iff x = 0, \qquad \|\alpha x\| = |\alpha|\,\|x\|, \qquad \|x + y\| \leq \|x\| + \|y\|.
```

A **normed space** is a vector space with a norm; a **Banach space** is a normed space in which every Cauchy sequence converges (i.e. it is *complete*).

<details><summary>Details</summary>

### From a number to a size

In finite dimensions, a vector $`x = (x_1, \dots, x_n)` has a natural size, the Euclidean length $`\sqrt{x_1^2 + \cdots + x_n^2}`. A norm is exactly the generalization of "length" to any vector space: it assigns a non-negative size, respects scaling, and obeys the triangle inequality. The triangle inequality is what makes the norm a genuine notion of distance: $`d(x, y) = \|x - y\|` is a metric.

### Completeness is the real content

The interesting property is not the norm but **completeness**. A sequence is *Cauchy* if its terms get arbitrarily close to each other: $`\|x_n - x_m\| \to 0` as $`n, m \to \infty`. A space is complete if every such sequence actually converges to a point *inside the space*.

**Example.** The space $`c_{00}` of finitely supported sequences with the $`\ell^2` norm is *not* complete: the sequence $`x^{(n)} = (1, 1/2, \dots, 1/n, 0, 0, \dots)` is Cauchy but converges to $`(1, 1/2, 1/3, \dots)`, which has infinitely many nonzero terms and so is not in $`c_{00}`. Its completion is the Banach space $`\ell^2`.

<svg viewBox="0 0 460 150" width="460" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A Cauchy sequence converging to a limit point">
  <line x1="20" y1="110" x2="440" y2="110" stroke="#888" stroke-width="1"/>
  <circle cx="60" cy="110" r="4" fill="#2b6cb0"/>
  <circle cx="120" cy="110" r="4" fill="#2b6cb0"/>
  <circle cx="180" cy="110" r="4" fill="#2b6cb0"/>
  <circle cx="240" cy="110" r="4" fill="#2b6cb0"/>
  <circle cx="300" cy="110" r="4" fill="#2b6cb0"/>
  <circle cx="360" cy="110" r="5" fill="#c53030"/>
  <text x="352" y="95" font-size="13" fill="#c53030">limit</text>
  <text x="40" y="135" font-size="12" fill="#333">Cauchy sequence: terms cluster, and completeness says the cluster point is in the space.</text>
</svg>

### The workhorse examples

- $`C([a,b])` with the sup norm $`\|f\|_\infty` is a Banach space.
- $`L^p` for $`1 \leq p \leq \infty` (equivalence classes of functions with finite $`p`-norm) is a Banach space; its construction rests on the measure-theoretic integral, see [Measure theory](../../Probability-and-statistics/Measure-theory/Readme.md).
- $`\ell^p` (sequences with finite $`p`-norm) is a Banach space.

<details><summary>Example problem</summary>

**Problem.** Show that $`C([0,1])` with the $`L^1` norm $`\|f\|_1` is not complete.

<details><summary>Solution</summary>

Take $`f_n(x) = \min(n x, 1)`. Each $`f_n` is continuous. For $`m > n`, $`\|f_m - f_n\|_1 \leq \int_0^{1/n} 1 \, dx = 1/n \to 0`, so $`(f_n)` is Cauchy in $`L^1`. It converges in $`L^1` to the step function $`f(x) = 0` for $`x = 0` and $`f(x) = 1` for $`x > 0`, which is not continuous. Hence the limit is not in $`C([0,1])`, so the space is not complete. ∎

</details>

</details>

</details>

## Hilbert spaces

**Definition.** A **Hilbert space** is a vector space $`H` equipped with an inner product $`\langle \cdot, \cdot \rangle` such that the induced norm $`\|x\| = \sqrt{\langle x, x \rangle}` makes $`H` a Banach space. Two vectors are **orthogonal** if $`\langle x, y \rangle = 0`.

<details><summary>Details</summary>

### The inner product adds geometry

A norm gives you lengths and distances; an inner product adds *angles* and *orthogonality*. The key identity is the **parallelogram law**,

$`\|x + y\|^2 + \|x - y\|^2 = 2\|x\|^2 + 2\|y\|^2,`

which holds exactly for norms coming from an inner product. It is the reason a Hilbert space "looks like" Euclidean space: you can project, decompose into orthogonal pieces, and talk about angles.

**Example.** $`L^2([a,b])` has the inner product $`\langle f, g \rangle = \int_a^b f \overline{g}`. The space $`\ell^2` has $`\langle x, y \rangle = \sum x_n \overline{y_n}`.

### Orthogonal projection and the Pythagorean theorem

Given a closed subspace $`M \subset H`, every $`x \in H` splits uniquely as $`x = m + h` with $`m \in M` and $`h \perp M`. This is the infinite-dimensional version of dropping a perpendicular. It yields the **Pythagorean theorem** $`\|x\|^2 = \|m\|^2 + \|h\|^2`, and it is the engine behind Fourier series: the partial sums are orthogonal projections onto finite-dimensional subspaces.

<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Orthogonal projection of a vector onto a subspace">
  <line x1="30" y1="170" x2="270" y2="170" stroke="#888" stroke-width="1"/>
  <line x1="30" y1="170" x2="30" y2="20" stroke="#888" stroke-width="1"/>
  <line x1="30" y1="170" x2="200" y2="170" stroke="#2b6cb0" stroke-width="2"/>
  <line x1="200" y1="170" x2="200" y2="60" stroke="#c53030" stroke-width="2" stroke-dasharray="4 3"/>
  <line x1="30" y1="170" x2="200" y2="60" stroke="#2f855a" stroke-width="2"/>
  <path d="M 200 170 L 200 155 L 185 170 Z" fill="#2f855a"/>
  <circle cx="200" cy="60" r="4" fill="#2f855a"/>
  <text x="205" y="55" font-size="12" fill="#2f855a">x</text>
  <text x="150" y="185" font-size="12" fill="#2b6cb0">m (projection)</text>
  <text x="205" y="120" font-size="12" fill="#c53030">h (perp)</text>
</svg>

### Bases and the Riesz representation theorem

In a Hilbert space, every continuous linear functional $`\varphi` has the form $`\varphi(x) = \langle x, y \rangle` for a *unique* $`y \in H`. This is the **Riesz representation theorem**, and it is what makes Hilbert spaces self-dual: the space and its dual are canonically the same. It fails in general Banach spaces, which is the dividing line between the two settings.

<details><summary>Example problem</summary>

**Problem.** In $`\mathbb{R}^2` with the standard inner product, find the orthogonal projection of $`x = (3, 4)` onto the line $`M = \{(t, t) : t \in \mathbb{R}\}`.

<details><summary>Solution</summary>

Project onto the unit vector $`u = (1, 1)/\sqrt{2}`. The projection is $`m = \langle x, u \rangle u = \frac{3 + 4}{\sqrt{2}} \cdot \frac{(1,1)}{\sqrt{2}} = \frac{7}{2}(1, 1) = (3.5, 3.5)`. The perpendicular part is $`h = x - m = (-0.5, 0.5)`, and indeed $`h \perp M`. Check: $`\|x\|^2 = 25 = \|m\|^2 + \|h\|^2 = 24.5 + 0.5`. ∎

</details>

</details>

</details>

## Duality

**Definition.** The **dual** of a normed space $`X` is $`X^* = \{ \varphi : X \to \mathbb{F} \text{ continuous linear} \}`, with norm $`\|\varphi\| = \sup_{\|x\| \leq 1} |\varphi(x)|`. The **double dual** is $`(X^*)^*`.

<details><summary>Details</summary>

### Why look at the dual

The dual collects all the "measuring devices" on a space — every continuous way to extract a single number from a vector. Two spaces that are hard to distinguish directly often have very different duals, so the dual is a powerful invariant.

**Example.** The dual of $`\ell^1` is $`\ell^\infty`: a continuous linear functional on $`\ell^1` is given by pairing with a bounded sequence. The dual of $`L^p` for $`1 \leq p < \infty` is $`L^q` where $`1/p + 1/q = 1` (Hölder's inequality).

### Hahn–Banach: extending functionals

The **Hahn–Banach theorem** says a continuous linear functional defined on a subspace can be extended to the whole space *without increasing its norm*. Concretely, it guarantees that the dual is "large enough": for every nonzero $`x \in X` there is a functional $`\varphi` with $`\varphi(x) = \|x\|` and $`\|\varphi\| = 1`. This is the reason the dual norm recovers the original norm: $`\|x\| = \sup_{\|\varphi\| \leq 1} |\varphi(x)|`.

<details><summary>Example problem</summary>

**Problem.** Identify the dual of $`\mathbb{R}^2` with the $`\ell^\infty` norm $`\|(a,b)\|_\infty = \max(|a|, |b|)`.

<details><summary>Solution</summary>

Any continuous linear functional is $`\varphi(a, b) = \alpha a + \beta b`. Its norm is $`\|\varphi\| = \sup_{\max(|a|,|b|)\le 1} |\alpha a + \beta b| = |\alpha| + |\beta|` (attained at $`(a,b) = (\mathrm{sgn}\,\alpha, \mathrm{sgn}\,\beta)`). So $`( \mathbb{R}^2_\infty )^* \cong \mathbb{R}^2_1`: the dual of the $`\infty`-norm space is the $`1`-norm space. This is the finite-dimensional shadow of the $`\ell^1 \leftrightarrow \ell^\infty` duality. ∎

</details>

</details>

</details>

## Reflexivity

**Definition.** A Banach space $`X` is **reflexive** if the canonical map $`J : X \to X^{**}`, $`J(x)(\varphi) = \varphi(x)`, is onto. Equivalently, $`X` is (isometrically) its own double dual.

<details><summary>Details</summary>

### What reflexivity means

Every Banach space embeds into its double dual via $`J`, but $`J` need not be surjective. Reflexivity says it *is*: no "extra" functionals appear when you dualize twice. Reflexive spaces are the well-behaved ones for existence arguments — they are the setting where weak compactness (below) gives you convergent subsequences.

**Examples.** $`\ell^p` and $`L^p` for $`1 < p < \infty` are reflexive. $`\ell^1`, $`\ell^\infty`, and $`C([0,1])` are *not* reflexive. Every finite-dimensional space is reflexive.

### The weak topology and why reflexivity pays off

The **weak topology** on $`X` is the coarsest topology making every $`\varphi \in X^*` continuous; a sequence $`x_n \rightharpoonup x` (weak convergence) means $`\varphi(x_n) \to \varphi(x)` for every $`\varphi`. The key fact: in a reflexive space, every bounded sequence has a weakly convergent subsequence (the Eberlein–Šmulian / Banach–Alaoglu machinery). This is the workhorse behind existence theorems for PDEs and optimization — see [Applications](./Applications.md).

<svg viewBox="0 0 420 160" width="420" height="160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bounded sequence with a weakly convergent subsequence in a reflexive space">
  <circle cx="210" cy="80" r="60" fill="none" stroke="#2b6cb0" stroke-width="1.5"/>
  <circle cx="180" cy="60" r="4" fill="#2f855a"/>
  <circle cx="250" cy="70" r="4" fill="#2f855a"/>
  <circle cx="230" cy="110" r="4" fill="#2f855a"/>
  <circle cx="195" cy="100" r="4" fill="#2f855a"/>
  <circle cx="210" cy="80" r="5" fill="#c53030"/>
  <text x="215" y="75" font-size="12" fill="#c53030">weak limit</text>
  <text x="120" y="150" font-size="12" fill="#333">Bounded sequence in a reflexive space: a subsequence converges weakly.</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Show that $`\ell^1` is not reflexive.

<details><summary>Solution</summary>

$`( \ell^1 )^* = \ell^\infty`, so $`( \ell^1 )^{**} = ( \ell^\infty )^*`. The space $`\ell^\infty` is not separable and its dual is strictly larger than $`\ell^\infty` itself (e.g. Banach limits are functionals on $`\ell^\infty` that vanish on $`\ell^1` but are not given by an $`\ell^1` sequence). Hence the canonical map $`\ell^1 \to ( \ell^\infty )^*` is not onto, so $`\ell^1` is not reflexive. Equivalently, $`\ell^1` contains the sequence $`e_n = (0, \dots, 1, \dots)` which is bounded but has no weakly convergent subsequence. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Let $`H` be a Hilbert space and $`M \subset H` a closed subspace. Prove that $`H = M \oplus M^\perp` (direct sum), and explain why this decomposition is the reason Hilbert spaces are reflexive.

<details><summary>Solution</summary>

For any $`x \in H`, the set $`D = \{ \|x - m\| : m \in M \}` has an infimum $`\delta \geq 0`. By completeness of $`M` and the parallelogram law, there is a sequence $`m_n \in M` with $`\|x - m_n\| \to \delta`, and $`(m_n)` is Cauchy, hence converges to some $`m \in M` with $`\|x - m\| = \delta`. Let $`h = x - m`. For any $`v \in M` and any scalar $`t`, $`\|h + t v\|^2 \geq \delta^2 = \|h\|^2`, which forces $`\mathrm{Re}\,\langle h, v \rangle = 0` for all $`v`, so $`h \perp M`. Thus $`x = m + h` with $`m \in M`, $`h \in M^\perp`, and the split is unique.

Because every closed subspace admits this orthogonal projection, the Riesz representation theorem holds (every functional is $`\langle \cdot, y \rangle`), so $`H \cong H^*` canonically, and iterating gives $`H \cong H^{**}`: every Hilbert space is reflexive. ∎

</details>

</details>