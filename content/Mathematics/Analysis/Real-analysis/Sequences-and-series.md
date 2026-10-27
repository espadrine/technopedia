# Sequences and series

Sequences and series provide the tools for deciding when an infinite sum converges, how fast it converges, and what function it defines. They are the infinite-process layer of real analysis: power series turn local derivative data into global function representation, and uniform convergence of series guarantees that the limit function inherits the properties (continuity, differentiability, integrability) of its terms. This page covers the standard convergence tests, power series and their radius of convergence, and the Weierstrass M-test for uniform convergence of series.

> **Authoritative sources**
> - [W. Rudin, *Principles of Mathematical Analysis*, Ch. 3, 7](https://www.ams.org/bookstore/getitemspage?item=MAA-0001)
> - [M. Spivak, *Calculus*, Ch. 11–12](https://www.ams.org/bookstore/getitemspage?item=MAA-0002)

## Convergence tests

**Definition.** A series $`\sum_{n=1}^{\infty} a_n` converges if the sequence of partial sums $`s_N = \sum_{n=1}^{N} a_n` converges to a finite limit.

**Theorem (ratio test).** If $`\lim_{n \to \infty} |a_{n+1}/a_n| = L`, then the series converges absolutely if $`L < 1` and diverges if $`L > 1`.

**Theorem (root test).** If $`\lim_{n \to \infty} \sqrt[n]{|a_n|} = L`, then the series converges absolutely if $`L < 1` and diverges if $`L > 1`.

**Theorem (comparison test).** If $`0 \leq a_n \leq b_n` for all $`n` and $`\sum b_n` converges, then $`\sum a_n` converges.

**Theorem (integral test).** If $`f: [1, \infty) \to [0, \infty)` is decreasing and $`a_n = f(n)`, then $`\sum a_n` converges if and only if $`\int_1^{\infty} f(x)\, dx` converges.

<details><summary>Details</summary>

### Why tests are needed

The definition of convergence — "the partial sums approach a finite limit" — is rarely checkable directly for an infinite series. Tests give *sufficient* (or necessary-and-sufficient) conditions in terms of the growth rate of the terms, which is much easier to compute.

### The ratio test in action

Apply the ratio test to $`\sum_{n=1}^{\infty} \frac{x^n}{n!}`.

$`\left|\frac{a_{n+1}}{a_n}\right| = \frac{x^{n+1}/(n+1)!}{x^n/n!} = \frac{|x|}{n+1} \to 0 < 1.`\n\nSo the series converges absolutely for every $`x \in \mathbb{R}`. (This is the series for $`e^x`.)

### The comparison test in action

Compare $`\sum \frac{1}{n^2}` with the telescoping series. Note that for $`n \geq 2`, $`\frac{1}{n^2} < \frac{1}{n(n-1)} = \frac{1}{n-1} - \frac{1}{n}`. The right side telescopes: $`\sum_{n=2}^{N} \left(\frac{1}{n-1} - \frac{1}{n}\right) = 1 - \frac{1}{N} \to 1`. Hence $`\sum \frac{1}{n^2}` converges.

### The integral test in action

For $`\sum \frac{1}{n \ln n}` (starting at $`n = 2`): set $`f(x) = 1/(x \ln x)`. Then $`\int_2^{\infty} \frac{dx}{x \ln x} = [\ln \ln x]_2^{\infty} = \infty`, so the series diverges.

<details><summary>Example problem</summary>

**Problem.** Determine whether $`\sum_{n=1}^{\infty} \frac{n}{2^n}` converges, and if so, find its sum.

<details><summary>Solution</summary>

**Convergence.** Ratio test: $`\frac{a_{n+1}}{a_n} = \frac{n+1}{2^{n+1}} \cdot \frac{2^n}{n} = \frac{n+1}{2n} \to \frac{1}{2} < 1`. Converges.

**Sum.** Let $`S = \sum_{n=1}^{\infty} \frac{n}{2^n} = \sum_{n=1}^{\infty} n x^n` with $`x = 1/2`. We know $`\sum_{n=0}^{\infty} x^n = \frac{1}{1-x}` for $`|x| < 1`. Differentiating: $`\sum_{n=1}^{\infty} n x^{n-1} = \frac{1}{(1-x)^2}`, so $`\sum_{n=1}^{\infty} n x^n = \frac{x}{(1-x)^2} = \frac{1/2}{(1/2)^2} = 2`. ∎

</details>

</details>

</details>

## Power series

**Definition.** A power series centered at $`a` is $`\sum_{n=0}^{\infty} c_n (x - a)^n`. It has a radius of convergence $`R \in [0, \infty]` such that it converges absolutely for $`|x - a| < R` and diverges for $`|x - a| > R`.

**Theorem (radius of convergence).** If $`L = \limsup_{n \to \infty} \sqrt[n]{|c_n|}`, then $`R = 1/L` (with the conventions $`1/0 = \infty` and $`1/\infty = 0`).

**Theorem (term-by-term differentiation).** Inside its radius of convergence, a power series may be differentiated and integrated term by term, and the resulting series has the same radius of convergence.

<details><summary>Details</summary>

### Why power series matter

A power series is the most general form of a function that is "infinitely differentiable and locally determined by its derivatives at one point." The Taylor series of a function is its power series with $`c_n = f^{(n)}(a)/n!`. The deep question — when does the Taylor series actually converge to the function? — is answered by the remainder estimate in Taylor's theorem (see [Differentiation](./Differentiation.md)).

### Worked example: geometric series

$`\sum_{n=0}^{\infty} x^n = \frac{1}{1-x}` for $`|x| < 1`. Here $`c_n = 1`, so $`L = 1` and $`R = 1`. At the boundary $`x = 1` the series diverges; at $`x = -1` it oscillates.

### Worked example: $`\ln(1+x)`

For $`|x| < 1`: $`\ln(1+x) = \sum_{n=1}^{\infty} (-1)^{n+1} \frac{x^n}{n}`. This is obtained by integrating the geometric series $`\frac{1}{1+t} = \sum t^n` term by term from $`0` to $`x`. The radius is $`R = 1` (the singularity at $`x = -1`).

### Term-by-term differentiation

Since $`\frac{1}{1-x} = \sum x^n`, differentiating gives $`\frac{1}{(1-x)^2} = \sum_{n=1}^{\infty} n x^n` for $`|x| < 1`. This is the identity used in the ratio-test example above.

<details><summary>Example problem</summary>

**Problem.** Find the radius of convergence of $`\sum_{n=0}^{\infty} \frac{(x-3)^n}{n^2 + 1}`.

<details><summary>Solution</summary>

$`c_n = \frac{1}{n^2+1}`. By the root test, $`\sqrt[n]{|c_n|} = (n^2+1)^{-1/n} \to 1` (since $`n^{2/n} \to 1`). So $`L = 1` and $`R = 1`. The series converges for $`|x - 3| < 1`, i.e. $`x \in (2, 4)`. At the endpoints $`x = 2` and $`x = 4`, the series becomes $`\sum \frac{(-1)^n}{n^2+1}` and $`\sum \frac{1}{n^2+1}`, both of which converge by comparison with $`\sum 1/n^2`. So the interval of convergence is $`[2, 4]`. ∎

</details>

</details>

</details>

## Uniform convergence of series

**Definition.** A series $`\sum f_n` of functions on $`X` converges uniformly if the sequence of partial sums $`s_N = \sum_{n=1}^{N} f_n` converges uniformly on $`X`.

**Theorem (Weierstrass M-test).** If $`|f_n(x)| \leq M_n` for all $`x \in X` and $`\sum M_n` converges, then $`\sum f_n` converges uniformly (and absolutely) on $`X`.

**Theorem (uniform limit of continuous functions).** If $`f_n` are continuous on $`X` and $`\sum f_n` converges uniformly, then the sum $`f = \sum f_n` is continuous on $`X`.

**Theorem (term-by-term integration).** If $`f_n` are Riemann integrable on $`[a,b]` and $`\sum f_n` converges uniformly, then $`\int_a^b \sum f_n = \sum \int_a^b f_n`.

<details><summary>Details</summary>

### Why uniform convergence of series matters

Pointwise convergence of a series of continuous functions can produce a discontinuous limit (as with $`f_n(x) = x^n` on $`[0,1]` — see [Limits and continuity](./Limits-and-continuity.md)). Uniform convergence is the condition that prevents this: it guarantees the limit function is continuous, and it justifies interchanging the sum with integration and (under additional hypotheses) differentiation.

### The M-test in action

Show that $`\sum_{n=1}^{\infty} \frac{\sin(nx)}{n^2}` converges uniformly on $`\mathbb{R}`.

Take $`M_n = 1/n^2` since $`|\sin(nx)| \leq 1`. The series $`\sum 1/n^2` converges (p-series with $`p = 2 > 1`), so the M-test gives uniform convergence on all of $`\mathbb{R}`.

### When the M-test fails but uniform convergence holds

The series $`\sum \frac{x^n}{n^2}` on $`[0, 1]` converges uniformly (the sum is continuous on $`[0,1]` and the convergence is monotone by Dini's theorem), but the M-test with $`M_n = 1/n^2` works here too. A case where the M-test fails: $`\sum \frac{x^n}{n}` on $`[0, 1)` — the M-test would need $`M_n = 1/n` and $`\sum 1/n` diverges, yet the series converges uniformly on any $`[0, r]` with $`r < 1`.

### Term-by-term integration example

$`\int_0^1 \sum_{n=1}^{\infty} \frac{x^n}{n^2}\, dx = \sum_{n=1}^{\infty} \frac{1}{n^2} \int_0^1 x^n\, dx = \sum_{n=1}^{\infty} \frac{1}{n^2(n+1)} = \sum_{n=1}^{\infty} \left(\frac{1}{n^2} - \frac{1}{n^2(n+1)}\right)`.

The interchange is justified by uniform convergence (M-test with $`M_n = 1/n^2`).

<details><summary>Example problem</summary>

**Problem.** Show that $`\sum_{n=1}^{\infty} \frac{x^n}{n}` converges uniformly on $`[0, r]` for any $`r < 1`, but not on $`[0, 1]`.

<details><summary>Solution</summary>

**On $`[0, r]`:** $`|x^n/n| \leq r^n/n \leq r^n`. Since $`\sum r^n` converges (geometric, $`r < 1`), the M-test gives uniform convergence.

**Not on $`[0, 1]`:** The sum is $`-\ln(1-x)`, which is unbounded as $`x \to 1^-`. A uniform limit of continuous functions on $`[0,1]` must be bounded (each partial sum is bounded, and uniform convergence preserves boundedness). Since $`-\ln(1-x)` is unbounded on $`[0,1]`, the convergence cannot be uniform. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Consider the series $`\sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}`.

(a) Find its radius of convergence.

(b) Identify the function it represents for $`|x| < 1`.

(c) Show that it converges uniformly on $`[-r, r]` for any $`r < 1`.

(d) Does it converge uniformly on $`[-1, 1]`? Justify.

<details><summary>Solution</summary>

**(a)** $`c_n = (-1)^{n+1}/n`, so $`\sqrt[n]{|c_n|} = 1/\sqrt[n]{n} \to 1`. Hence $`R = 1`.

**(b)** Differentiate term by term: $`\sum_{n=1}^{\infty} (-1)^{n+1} x^{n-1} = \sum_{n=0}^{\infty} (-x)^n = \frac{1}{1+x}` for $`|x| < 1`. Integrating from $`0` to $`x`: $`\ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}`.

**(c)** On $`[-r, r]` with $`r < 1`: $`|(-1)^{n+1} x^n / n| \leq r^n / n \leq r^n`. Since $`\sum r^n` converges, the M-test gives uniform convergence.

**(d)** At $`x = 1`, the series is the alternating harmonic series $`\sum (-1)^{n+1}/n = \ln 2`. At $`x = -1`, it is $`-\sum 1/n = -\infty` (diverges). So the series does not even converge at $`x = -1`, and therefore cannot converge uniformly on $`[-1, 1]`. ∎

</details>

</details>
