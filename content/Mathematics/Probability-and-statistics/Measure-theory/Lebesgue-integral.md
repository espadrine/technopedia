# Lebesgue integral

The Lebesgue integral generalizes the Riemann integral by integrating with respect to a [measure](./Measures.md) rather than with respect to the length of subintervals. It handles a much larger class of functions and provides powerful convergence theorems. It answers the question *how do we sum (integrate) a measurable function?* The integral is the central object of [Lp spaces](./Lp-spaces.md), where the convergence theorems below are the key tools.

> **Authoritative sources**
> - [Folland, Real Analysis: Techniques of Modern Analysis](https://www.ams.org/bookstore/getitem?servlet=GetItem&code=STML/34)
> - [Bogachev, Measure Theory, Vol. 1](https://link.springer.com/book/10.1007/978-3-540-34519-3)

## Construction from simple functions

For a nonnegative measurable function $`f: X \to [0,\infty]`:
$`\int_X f \, d\mu = \sup \left\{ \int_X s \, d\mu : s \text{ simple}, \; 0 \leq s \leq f \right\}`

where the integral of a simple function is defined algebraically as $`\int_X s \, d\mu = \sum_i a_i \, \mu(A_i)` (see [Measurable functions](./Measurable-functions.md) for the definition of simple functions and this formula).

For a general measurable $`f: X \to \mathbb{R}` (with $`\int f^- \, d\mu < \infty` or $`\int f^+ \, d\mu < \infty`):
$`\int_X f \, d\mu = \int_X f^+ \, d\mu - \int_X f^- \, d\mu`

where $`f^+ = \max(f, 0)` and $`f^- = \max(-f, 0)`."

<details><summary>Details</summary>

**Why this works.** The Riemann integral slices the *domain* into subintervals and sums $`f(x_i) \Delta x_i`. The Lebesgue integral slices the *range*: it asks "what is the measure of the set where $`f` is between $`a` and $`b`?" and sums $`a \cdot \mu(\{x : a \leq f(x) < b\})`.

**Key properties:**
- **Linearity:** $`\int (af + bg) \, d\mu = a\int f \, d\mu + b\int g \, d\mu`
- **Monotonicity:** $`f \leq g \implies \int f \, d\mu \leq \int g \, d\mu`
- **Triangle inequality:** $`\left|\int f \, d\mu\right| \leq \int |f| \, d\mu`
- **Positivity:** $`f \geq 0 \implies \int f \, d\mu \geq 0`

**Comparison with Riemann.** Every Riemann-integrable function on a bounded interval is Lebesgue-integrable, and the two integrals agree. The Lebesgue integral additionally handles: functions with dense discontinuities (e.g., $`\mathbf{1}_{\mathbb{Q}}`), unbounded functions (e.g., $`1/x` on $`(0,1)`), and functions on general measure spaces.

<iframe src="./Lebesgue-integral.simulation.html" title="Range-slicing vs. domain-slicing integration"></iframe>

</details>

## Monotone convergence theorem

**Theorem (MCT).** If $`f_1 \leq f_2 \leq \cdots` are nonnegative measurable functions with $`f_n \to f` pointwise, then
$`\int f \, d\mu = \lim_{n \to \infty} \int f_n \, d\mu`

(in particular, $`\int f \, d\mu` may be infinite).

<details><summary>Details</summary>

**Intuition.** You can swap the limit and the integral when the sequence is increasing. The "mass" cannot escape to infinity because the functions are growing.

**Example.** Let $`f_n = \mathbf{1}_{[0,n]}` on $`(\mathbb{R}, \mathcal{L}, \lambda)`. Then $`f_n \uparrow \mathbf{1}_{\mathbb{R}}` and
$`\int \mathbf{1}_{\mathbb{R}} \, d\lambda = \lim_n \int \mathbf{1}_{[0,n]} \, d\lambda = \lim_n n = \infty`

**Limitation.** MCT requires monotonicity. For general sequences, one needs the dominated convergence theorem.

</details>

## Fatou's lemma

**Theorem (Fatou).** If $`f_n \geq 0` are measurable functions, then
$`\int \liminf_{n \to \infty} f_n \, d\mu \leq \liminf_{n \to \infty} \int f_n \, d\mu`

<details><summary>Details</summary>

**Intuition.** Fatou's lemma is the weakest of the three fundamental convergence theorems: it gives an inequality (≤) rather than an equality. It requires only nonnegativity, no monotonicity, and no dominating function. It is typically proved first and serves as a stepping stone to the dominated convergence theorem.

**Relation to MCT and DCT.**
- MCT: monotone sequence ⇒ equality.
- Fatou: arbitrary nonnegative sequence ⇒ inequality.
- DCT: dominated sequence ⇒ equality.

**Example.** Let $`f_n = \mathbf{1}_{\{1/n\}}` on $`(0,1)`. Then $`f_n \to 0` pointwise, so $`\int \liminf f_n \, d\lambda = 0`. But $`\int f_n \, d\lambda = 0` for every $`n` (a single point has measure zero), so $`\liminf \int f_n = 0`. The inequality is an equality here.

A sharper example: $`f_n = n \cdot \mathbf{1}_{(0, 1/n)}`. Then $`f_n \to 0` a.e., but $`\int f_n \, d\lambda = 1` for all $`n`. Fatou gives $`0 \leq 1` (trivially true), while DCT does not apply (no integrable dominator exists).

</details>

## Dominated convergence theorem

**Theorem (DCT).** If $`f_n \to f` pointwise a.e., and there exists a measurable $`g` with $`|f_n| \leq g` for all $`n` and $`\int g \, d\mu < \infty`, then
$`\int f \, d\mu = \lim_{n \to \infty} \int f_n \, d\mu`

<details><summary>Details</summary>

**Intuition.** If the sequence is "trapped" by an integrable function, you can pass the limit through the integral. The dominating function $`g` prevents mass from escaping.

**Example.** $`f_n(x) = \frac{n x}{1 + n^2 x^2}` on $`(0,1)`. Pointwise, $`f_n(x) \to 0` for each fixed $`x > 0`. But $`|f_n(x)| \leq \frac{1}{2}` by AM-GM (since $`nx \leq \frac{1}{2}(n^2x^2 + 1)`). So $`g = 1/2` dominates, and DCT applies. Explicitly, $`\int_0^1 f_n \, dx = \frac{\ln(1+n^2)}{2n} \to 0 = \int_0^1 0 \, dx`, confirming the convergence of the integrals.

**Contrast with MCT.** DCT does not require monotonicity, but requires a uniform integrable bound. MCT requires monotonicity but no bound (the integral may be infinite).

</details>

## Fubini and Tonelli theorems

**Tonelli's theorem.** If $`f \geq 0` is measurable on $`X \times Y` (with [product measure](./Measures.md) $`\mu \times \nu`), then
$`\int_{X \times Y} f \, d(\mu \times \nu) = \int_X \left(\int_Y f(x,y) \, d\nu(y)\right) d\mu(x) = \int_Y \left(\int_X f(x,y) \, d\mu(x)\right) d\nu(y)`

(All three sides are equal, possibly $`\infty`.)

**Fubini's theorem.** If $`f` is measurable on $`X \times Y` and $`\int_{X \times Y} |f| \, d(\mu \times \nu) < \infty`, then the iterated integrals exist and are equal to the double integral.

<details><summary>Details</summary>

**Key difference.** Tonelli requires only nonnegativity (no integrability needed); Fubini requires integrability of $`|f|`.

**Why it matters.** Without these theorems, iterated integrals can differ. For the integrand $`\frac{x^2 - y^2}{(x^2 + y^2)^2}` on $`(0,1)^2`:
$`\int_0^1 \left(\int_0^1 \frac{x^2 - y^2}{(x^2 + y^2)^2} \, dx\right) dy = -\frac{\pi}{4}`
$`\int_0^1 \left(\int_0^1 \frac{x^2 - y^2}{(x^2 + y^2)^2} \, dy\right) dx = \frac{\pi}{4}`

The two iterated integrals are unequal ($`-\pi/4 \neq \pi/4`), and the integrand is not absolutely integrable, so Fubini does not apply.

**Connection to probability.** In [probability](../Probability/Readme.md), $`\mathbb{E}[X] = \int X \, dP`, and Fubini/Tonelli justify exchanging expectation and summation/integration: $`\mathbb{E}[\sum X_n] = \sum \mathbb{E}[X_n]` (Tonelli for nonnegative, Fubini for integrable).

</details>

## Example problem

**Problem.** Compute $`\int_0^\infty e^{-x} \sin(x) \, dx` using the Lebesgue integral, and justify interchanging the order of integration in the representation
$`\sin(x) = x \int_0^1 \cos(tx) \, dt`

<details><summary>Solution</summary>

**Step 1: Set up the iterated integral.**

Using the identity $`\sin(x) = x \int_0^1 \cos(tx) \, dt` (obtained by integrating $`\cos(tx)` in $`t` and evaluating at the endpoints):

$`\int_0^\infty e^{-x} \sin(x) \, dx = \int_0^\infty x \, e^{-x} \left(\int_0^1 \cos(tx) \, dt\right) dx`

**Step 2: Justify Fubini.**

The integrand $`x \, e^{-x} \cos(tx)` is measurable on $`[0,\infty) \times [0,1]`. Check absolute integrability:
$`\int_0^\infty \int_0^1 |x \, e^{-x} \cos(tx)| \, dt \, dx \leq \int_0^\infty \int_0^1 x \, e^{-x} \, dt \, dx = \int_0^\infty x \, e^{-x} \, dx = 1 < \infty`

So Fubini applies.

**Step 3: Swap and compute the inner integral.**

$`\int_0^1 \left(\int_0^\infty x \, e^{-x} \cos(tx) \, dx\right) dt`

The inner integral is the real part of $`\int_0^\infty x \, e^{-(1-it)x} \, dx = \frac{1}{(1-it)^2}`:
$`\int_0^\infty x \, e^{-x} \cos(tx) \, dx = \frac{1 - t^2}{(1+t^2)^2}`

**Step 4: Evaluate the outer integral.**

$`\int_0^1 \frac{1 - t^2}{(1+t^2)^2} \, dt`

Note that $`\frac{d}{dt}\left(\frac{t}{1+t^2}\right) = \frac{1 - t^2}{(1+t^2)^2}`, so:
$`\int_0^1 \frac{1 - t^2}{(1+t^2)^2} \, dt = \left[\frac{t}{1+t^2}\right]_0^1 = \frac{1}{2} - 0 = \frac{1}{2}`

**Answer:** $`\int_0^\infty e^{-x} \sin(x) \, dx = \frac{1}{2}`.

</details>