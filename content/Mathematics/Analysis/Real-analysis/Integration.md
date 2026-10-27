# Integration

Integration measures accumulated quantity — area, volume, total mass, expected value — and, in its Lebesgue form, provides the rigorous setting in which limits and integrals may be interchanged. It underlies probability, physics, and the solution of differential equations. This page covers the Riemann integral and its limitations, then the Lebesgue integral and its convergence theorems (monotone and dominated convergence).

> **Authoritative sources**
> - [W. Rudin, *Principles of Mathematical Analysis*, Ch. 6–8](https://www.ams.org/bookstore/getitemspage?item=MAA-0001)
> - [H. L. Royden, *Real Analysis*, Ch. 5–6](https://www.ams.org/bookstore/getitemspage?item=MAA-0003)

## The Riemann integral

**Definition.** A bounded function $`f` on $`[a, b]` is Riemann integrable if the upper and lower sums agree in the limit: for every partition $`P` of $`[a, b]` with mesh $`\to 0`,

$`\int_a^b f(x)\, dx = \lim_{\|P\| \to 0} \sum_i f(x_i^*) \Delta x_i.`

<details><summary>Details</summary>

### The idea

Partition $`[a, b]` into small subintervals, approximate $`f` on each by a constant (its value at a sample point $`x_i^*`), and sum the areas of the resulting rectangles. As the mesh shrinks, the sum approaches the integral — the signed area under the curve.

### Worked example

Compute $`\int_0^1 x\, dx` by Riemann sums. Take the right endpoints $`x_i^* = i/n` on $`[i-1, i]/n`. Then

$`\sum_{i=1}^{n} \frac{i}{n} \cdot \frac{1}{n} = \frac{1}{n^2} \sum_{i=1}^{n} i = \frac{1}{n^2} \cdot \frac{n(n+1)}{2} \to \frac{1}{2}.`

So $`\int_0^1 x\, dx = 1/2`.

### The fundamental theorem of calculus

If $`F` is an antiderivative of $`f` (i.e. $`F' = f`), then $`\int_a^b f(x)\, dx = F(b) - F(a)`. This is the practical engine of integration: it reduces computing an area to finding an antiderivative.

<details><summary>Example problem</summary>

**Problem.** Compute $`\int_0^1 x^2\, dx` using the fundamental theorem of calculus.

<details><summary>Solution</summary>

An antiderivative of $`x^2` is $`F(x) = x^3/3`. Hence $`\int_0^1 x^2\, dx = F(1) - F(0) = 1/3 - 0 = 1/3`. ∎

</details>

</details>

</details>

## Limitations of the Riemann integral

The Riemann integral fails on some natural limits. The classic example is the sequence $`f_n(x) = \mathbf{1}_{\{x = 1/n\}}` on $`[0,1]` (a single spike of height 1 at $`x = 1/n`): each $`f_n` is Riemann integrable with integral 0, and $`f_n \to 0` pointwise, yet the Riemann framework gives no clean way to pass to the limit for more general pointwise limits. Worse, the indicator of the rationals $`\mathbf{1}_{\mathbb{Q}}` is not Riemann integrable at all (upper sum 1, lower sum 0 on every interval), even though it is a perfectly reasonable pointwise limit of integrable functions.

The Riemann integral is also awkward for functions with "too many" discontinuities and for interchanging limits and integrals. The Lebesgue integral fixes both problems.

## The Lebesgue integral

**Definition (sketch).** The Lebesgue integral integrates by slicing the *range* rather than the *domain*: it measures the set of points where $`f` takes values in a given interval, and sums $`\text{value} \times \text{measure}`. It is defined first for non-negative measurable functions as a supremum of integrals of simple functions, then extended to general measurable functions.

<details><summary>Details</summary>

### Why slice the range?

The Riemann integral slices the domain into intervals and asks "what is $`f` like here?" — which fails when $`f` oscillates wildly (as $`\mathbf{1}_{\mathbb{Q}}` does). The Lebesgue integral instead asks "on how much of the domain is $`f` near the value $`v`?" — a question that has a clean answer via measure. For $`\mathbf{1}_{\mathbb{Q}}`, the set where it equals 1 (the rationals) has measure 0, so the integral is 0.

### Measurability

The Lebesgue integral is defined for *measurable* functions, a class that includes every Riemann integrable function and is closed under pointwise limits. This closure is exactly what makes limit theorems possible. The measure-theoretic foundation (σ-algebras, measure, measurable functions) is developed under [Measure theory](../../Probability-and-statistics/Measure-theory/Readme.md).

<details><summary>Example problem</summary>

**Problem.** Compute the Lebesgue integral of $`f(x) = \mathbf{1}_{\mathbb{Q}}(x)` on $`[0, 1]`.

<details><summary>Solution</summary>

The set $`\mathbb{Q} \cap [0,1]` is countable, hence has Lebesgue measure 0. The function equals 1 on a set of measure 0 and 0 elsewhere, so $`\int_0^1 f\, dx = 1 \cdot 0 + 0 \cdot 1 = 0`. (Contrast: this function is not Riemann integrable.) ∎

</details>

</details>

</details>

## Convergence theorems

**Theorem (monotone convergence).** If $`0 \leq f_1 \leq f_2 \leq \cdots` are measurable and $`f_n \to f` pointwise, then

$`\lim_{n \to \infty} \int f_n = \int f.`

**Theorem (dominated convergence).** If $`f_n \to f` pointwise and there is an integrable $`g` with $`|f_n| \leq g` for all $`n`, then

$`\lim_{n \to \infty} \int f_n = \int f.`

<details><summary>Details</summary>

### Why these matter

These theorems justify interchanging limits and integrals — the single most common operation in analysis, probability, and PDE theory. Monotone convergence handles increasing sequences (no domination needed, but the functions must be non-negative and increasing). Dominated convergence is the workhorse: a single integrable "envelope" $`g` controls the whole sequence, allowing the limit to pass through the integral.

### Worked example: dominated convergence

Let $`f_n(x) = \frac{n x}{1 + n^2 x^2}` on $`[0, 1]`. Pointwise, $`f_n(x) \to 0` for $`x > 0` and $`f_n(0) = 0`, so $`f_n \to 0` pointwise. By AM–GM, $`1 + n^2 x^2 \geq 2 n x`, so $`f_n(x) \leq \frac{1}{2}` for all $`x` and $`n` — an integrable envelope. Hence dominated convergence applies and $`\lim_{n \to \infty} \int_0^1 f_n\, dx = \int_0^1 0\, dx = 0`. (Indeed, substituting $`u = n x` gives $`\int_0^1 f_n\, dx = \frac{1}{2n} \ln(1 + n^2) \to 0`.)

<details><summary>Example problem</summary>

**Problem.** Let $`f_n(x) = n \mathbf{1}_{(0, 1/n)}(x)` on $`[0, 1]`. Compute $`\int_0^1 f_n\, dx` and $`\lim_{n \to \infty} f_n(x)` pointwise. Explain why dominated convergence does not apply.

<details><summary>Solution</summary>

$`\int_0^1 f_n\, dx = n \cdot (1/n) = 1` for every $`n`. Pointwise, for each fixed $`x > 0`, eventually $`x > 1/n`, so $`f_n(x) = 0`; and $`f_n(0) = 0`. Thus $`f_n \to 0` pointwise, so $`\int f = 0 \neq 1 = \lim \int f_n`. Dominated convergence fails because no single integrable $`g` dominates all $`f_n`: near 0, $`f_n` has a spike of height $`n` on a set of measure $`1/n`, and any dominating $`g` would need $`g(x) \geq n` on $`(0, 1/n)` for all $`n`, forcing $`g` to be non-integrable. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Let $`f_n(x) = \frac{1}{1 + n^2 x^2}` on $`[0, 1]`.

(a) Find the pointwise limit $`f(x)`.

(b) Use dominated convergence to compute $`\lim_{n \to \infty} \int_0^1 f_n(x)\, dx`.

<details><summary>Solution</summary>

**(a)** For $`x = 0`, $`f_n(0) = 1`. For $`x > 0`, $`f_n(x) \to 0`. So $`f(x) = \mathbf{1}_{\{0\}}(x)`.

**(b)** $`|f_n(x)| \leq 1` and $`1` is integrable on $`[0, 1]`, so dominated convergence applies. Hence $`\lim \int_0^1 f_n = \int_0^1 f = \int_0^1 \mathbf{1}_{\{0\}} = 0` (the point $`0` has measure 0). ∎

</details>

</details>
