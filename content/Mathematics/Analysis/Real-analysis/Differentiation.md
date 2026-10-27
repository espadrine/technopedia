# Differentiation

Differentiation measures the instantaneous rate of change of a function and, through the mean value theorem and Taylor expansion, turns local slope information into global control and polynomial approximation. It is the engine behind optimization, sensitivity analysis, and the modeling of change in physics and engineering. This page covers the derivative, the mean value theorem, Taylor expansion, and the inverse and implicit function theorems.

> **Authoritative sources**
> - [W. Rudin, *Principles of Mathematical Analysis*, Ch. 4–5](https://www.ams.org/bookstore/getitemspage?item=MAA-0001)
> - [M. Spivak, *Calculus*, Ch. 4–5](https://www.ams.org/bookstore/getitemspage?item=MAA-0002)

## The derivative

**Definition.** If $`f` is defined on a neighborhood of $`a`, the derivative $`f'(a)` is

$`f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h},`

when the limit exists. $`f` is differentiable at $`a` if this limit exists.

<details><summary>Details</summary>

### From slope to derivative

The difference quotient $`\frac{f(a+h) - f(a)}{h}` is the slope of the secant line through $`(a, f(a))` and $`(a+h, f(a+h))`. As $`h \to 0`, the secant line rotates toward the tangent line, and its slope tends to the derivative. So the derivative is the slope of the tangent line — the instantaneous rate of change.

### Worked example

Compute $`f'(a)` for $`f(x) = x^2`.

$`\frac{f(a+h) - f(a)}{h} = \frac{(a+h)^2 - a^2}{h} = \frac{2ah + h^2}{h} = 2a + h \to 2a.`

So $`f'(a) = 2a`.

### Differentiability implies continuity

If $`f` is differentiable at $`a`, then $`f` is continuous at $`a`. Proof: $`f(a+h) - f(a) = h \cdot \frac{f(a+h)-f(a)}{h}`, and the right side tends to $`0 \cdot f'(a) = 0`. The converse fails: $`f(x) = |x|` is continuous at $`0` but not differentiable there (the left and right difference quotients tend to $`-1` and $`1`).

<details><summary>Example problem</summary>

**Problem.** Show that $`f(x) = |x|` is not differentiable at $`x = 0`.

<details><summary>Solution</summary>

The right-hand difference quotient is $`\frac{|h| - 0}{h} = 1` for $`h > 0`, and the left-hand quotient is $`\frac{|h|}{h} = -1` for $`h < 0`. The two one-sided limits differ, so the limit defining $`f'(0)` does not exist. ∎

</details>

</details>

</details>

## The mean value theorem

**Theorem (MVT).** If $`f` is continuous on $`[a, b]` and differentiable on $`(a, b)`, then there exists $`c \in (a, b)` such that

$`f'(c) = \frac{f(b) - f(a)}{b - a}.`

<details><summary>Details</summary>

### Why it matters

The MVT says that somewhere in the interval the instantaneous rate equals the average rate. It is the bridge between local (derivative) and global (values at endpoints) information.

**Consequence (monotonicity).** If $`f'(x) \geq 0` for all $`x \in (a, b)`, then $`f` is increasing on $`[a, b]`. Proof: for $`x_1 < x_2`, the MVT gives $`f(x_2) - f(x_1) = f'(c)(x_2 - x_1) \geq 0`.

**Consequence (boundedness).** If $`f'(x) = 0` everywhere on an interval, then $`f` is constant there.

### Proof sketch

Apply Rolle's theorem to $`g(x) = f(x) - \frac{f(b)-f(a)}{b-a}(x - a)`, which satisfies $`g(a) = g(b)`. Rolle's theorem (itself a consequence of the extremum theorem and Fermat's theorem) gives $`g'(c) = 0`, i.e. the MVT.

<details><summary>Example problem</summary>

**Problem.** Use the MVT to show that $`| \sin x - \sin y | \leq |x - y|` for all real $`x, y`.

<details><summary>Solution</summary>

By the MVT applied to $`\sin` on the interval between $`x` and $`y`, there is $`c` between them with $`\sin x - \sin y = \cos c \cdot (x - y)`. Since $`|\cos c| \leq 1`, the result follows. ∎

</details>

</details>

</details>

## Taylor expansion

**Theorem (Taylor's theorem).** If $`f` is $`n+1` times differentiable near $`a`, then for $`x` near $`a` there is $`\xi` between $`a` and $`x` such that

$`f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x-a)^k + \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}.`

<details><summary>Details</summary>

### The idea

Taylor's theorem approximates $`f` near $`a` by a polynomial whose coefficients are the derivatives at $`a`. The remainder term measures the error and shows the approximation improves as $`n` grows (when the derivatives stay bounded).

### Worked example: $`e^x`

For $`f(x) = e^x`, every derivative is $`e^x`, so $`f^{(k)}(0) = 1`. Taylor's theorem at $`a = 0` gives

$`e^x = \sum_{k=0}^{n} \frac{x^k}{k!} + \frac{e^{\xi}}{(n+1)!} x^{n+1},`

and since $`e^{\xi}` is bounded on bounded intervals, the series $`\sum x^k/k!` converges to $`e^x` for all $`x`.

<details><summary>Example problem</summary>

**Problem.** Find the second-order Taylor polynomial of $`f(x) = \ln(1+x)` at $`x = 0`, and bound the error for $`|x| \leq 1/2`.

<details><summary>Solution</summary>

$`f(0) = 0`, $`f'(x) = 1/(1+x)` so $`f'(0) = 1`, $`f''(x) = -1/(1+x)^2` so $`f''(0) = -1`. The polynomial is $`P_2(x) = x - x^2/2`. The remainder is $`R_2(x) = f'''(\xi) x^3 / 3!` with $`f'''(x) = 2/(1+x)^3`. For $`|x| \leq 1/2`, $`|f'''(\xi)| \leq 2/(1/2)^3 = 16`, so $`|R_2(x)| \leq 16 |x|^3 / 6 \leq 16 \cdot (1/8)/6 = 1/3`. ∎

</details>

</details>

</details>

## Inverse and implicit function theorems

**Theorem (inverse function theorem).** If $`f` is differentiable at $`a` and $`f'(a) \neq 0`, then $`f` is locally invertible near $`a`, and the inverse is differentiable with

$`(f^{-1})'(f(a)) = \frac{1}{f'(a)}.`

**Theorem (implicit function theorem).** If $`F(a, b) = 0` and $`F_y(a, b) \neq 0`, then near $`(a, b)` the equation $`F(x, y) = 0` defines $`y` as a differentiable function of $`x`, with

$`y'(x) = -\frac{F_x}{F_y}.`

<details><summary>Details</summary>

### Why the non-vanishing derivative matters

The condition $`f'(a) \neq 0` guarantees that $`f` is locally monotone (by the MVT, the derivative keeps its sign), hence one-to-one, hence invertible. The implicit function theorem is the multivariable generalization: a non-zero partial derivative lets you "solve for" one variable in terms of the others. See [Multivariable analysis](./Multivariable-analysis.md) for the full statement.

### Worked example: implicit differentiation

The unit circle $`x^2 + y^2 = 1` defines $`y = \sqrt{1 - x^2}` near $`(0, 1)`. Here $`F(x, y) = x^2 + y^2 - 1`, $`F_x = 2x`, $`F_y = 2y`. At $`(0, 1)`, $`F_y = 2 \neq 0`, so the theorem applies and $`y' = -F_x/F_y = -x/y = 0` at $`(0, 1)` — the tangent is horizontal at the top of the circle.

<details><summary>Example problem</summary>

**Problem.** The curve $`x^3 + y^3 - 3xy = 0` (the folium of Descartes) passes through $`(1, 1)`. Find the slope of the tangent there.

<details><summary>Solution</summary>

Let $`F(x, y) = x^3 + y^3 - 3xy`. Then $`F_x = 3x^2 - 3y`, $`F_y = 3y^2 - 3x`. At $`(1, 1)`, $`F_y = 3 - 3 = 0`, so the implicit function theorem does **not** apply directly (the tangent is vertical). Using $`F_x = 3 - 3 = 0` as well, both partials vanish; differentiating implicitly, $`(3x^2 - 3y) + (3y^2 - 3x) y' = 0`, at $`(1,1)` gives $`0 + 0 \cdot y' = 0`, indeterminate. A direct check of the curve near $`(1,1)` shows the tangent line is $`x + y = 2` (slope $`-1`), found by factoring the lowest-degree terms. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Let $`f` be differentiable on $`\mathbb{R}` with $`f'(x) = 2x` for all $`x` and $`f(0) = 0`.

(a) Use the MVT to show that $`f(x) = x^2` for all $`x`.

(b) Verify directly that $`f(x) = x^2` satisfies the conditions.

<details><summary>Solution</summary>

**(a)** Let $`g(x) = f(x) - x^2`. Then $`g'(x) = f'(x) - 2x = 0` for all $`x`. By the MVT, for any $`a < b`, $`g(b) - g(a) = g'(c)(b - a) = 0`, so $`g` is constant. Since $`g(0) = f(0) - 0 = 0`, the constant is $`0`, hence $`f(x) = x^2`.

**(b)** $`(x^2)' = 2x` and $`0^2 = 0`, so both conditions hold. ∎

</details>

</details>
