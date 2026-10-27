# Limits and continuity

Limits and continuity provide the rigorous language for describing how functions behave near a point. They are the foundation on which differentiation and integration are built: every derivative is a limit of a difference quotient, and every integral is a limit of sums. This page covers the ε–δ definition, uniform versus pointwise convergence of function sequences, and the compactness theorems (Bolzano–Weierstrass, Heine–Borel) that turn local control into global control.

> **Authoritative sources**
> - [W. Rudin, *Principles of Mathematical Analysis*, Ch. 2–4](https://www.ams.org/bookstore/getitemspage?item=MAA-0001)
> - [M. Spivak, *Calculus*, Ch. 1–3](https://www.ams.org/bookstore/getitemspage?item=MAA-0002)

## The ε–δ definition of a limit

**Definition.** Let $`f: D \to \mathbb{R}` and $`a \in \mathbb{R}` be a limit point of $`D`. We write $`\lim_{x \to a} f(x) = L` if for every $`\varepsilon > 0` there exists $`\delta > 0` such that for all $`x \in D` with $`0 < |x - a| < \delta`, we have $`|f(x) - L| < \varepsilon`.

<details><summary>Details</summary>

### Why ε–δ?

Before the 19th century, "limit" meant an intuitive idea: $`f(x)` gets "arbitrarily close" to $`L` as $`x` gets "arbitrarily close" to $`a`. Cauchy (1821) and Weierstrass (1860s) replaced this with a quantifier-based definition that makes the notion checkable.

The logic reads: "No matter how tight a band around $`L` you demand (that is $`\varepsilon`), I can find a window around $`a` (that is $`\delta`) so that every input in that window lands in the band."

### Worked example

Prove $`\lim_{x \to 2} (3x - 1) = 5`.

**Proof.** Let $`\varepsilon > 0`. Choose $`\delta = \varepsilon / 3`. If $`0 < |x - 2| < \delta`, then

$`|f(x) - 5| = |3x - 1 - 5| = 3|x - 2| < 3\delta = \varepsilon.`

∎

### Continuity

**Definition.** $`f` is continuous at $`a` if $`\lim_{x \to a} f(x) = f(a)`. Equivalently: for every $`\varepsilon > 0` there exists $`\delta > 0` such that $`|x - a| < \delta \implies |f(x) - f(a)| < \varepsilon`.

The only difference from the limit definition is that $`x = a` is included and the target is $`f(a)` rather than an abstract $`L`.

<details><summary>Example problem</summary>

**Problem.** Prove that $`f(x) = x^2` is continuous at $`x = 3`.

<details><summary>Solution</summary>

We need $`|x^2 - 9| < \varepsilon` whenever $`|x - 3| < \delta`.

Factor: $`|x^2 - 9| = |x - 3||x + 3|`.

If $`\delta \leq 1`, then $`|x + 3| \leq |x - 3| + 6 \leq 7`.

So $`|x^2 - 9| \leq 7|x - 3|`. Choose $`\delta = \min(1, \varepsilon/7)`.

Then $`|x - 3| < \delta \implies |x^2 - 9| < 7\delta \leq \varepsilon`. ∎

</details>

</details>

</details>

## Pointwise versus uniform convergence

**Definition (pointwise).** A sequence $`f_n: X \to \mathbb{R}` converges pointwise to $`f` if for every $`x \in X` and every $`\varepsilon > 0` there exists $`N` (depending on $`x`) such that $`n \geq N \implies |f_n(x) - f(x)| < \varepsilon`.

**Definition (uniform).** $`f_n \to f` uniformly on $`X` if for every $`\varepsilon > 0` there exists $`N` (independent of $`x`) such that $`n \geq N \implies |f_n(x) - f(x)| < \varepsilon` for all $`x \in X`.

**Key theorem.** If $`f_n` are continuous on $`X` and $`f_n \to f` uniformly, then $`f` is continuous on $`X`. Pointwise convergence does not preserve continuity.

<details><summary>Details</summary>

### The distinction in one picture

The difference is where $`N` may depend on $`x`:

- Pointwise: for each fixed $`x`, the sequence $`f_n(x)` converges. The rate can vary wildly from point to point.
- Uniform: the entire graph of $`f_n` gets within $`\varepsilon` of the graph of $`f` simultaneously.

### Classic counterexample

On $`[0,1]`, let $`f_n(x) = x^n`. Then $`f_n \to f` pointwise where $`f(x) = 0` for $`x \in [0,1)` and $`f(1) = 1`. The limit is discontinuous at $`x = 1`, so the convergence is not uniform.

To see non-uniformity directly: $`\sup_{x \in [0,1]} |x^n - f(x)| = 1` for every $`n` (take $`x = 1`), so no $`N` works for $`\varepsilon = 1/2`.

### Uniform limit theorem (proof sketch)

Given $`\varepsilon > 0`, uniform convergence gives $`N` with $`|f_N(x) - f(x)| < \varepsilon/3` for all $`x`. Since $`f_N` is continuous at $`a`, there is $`\delta` with $`|x - a| < \delta \implies |f_N(x) - f_N(a)| < \varepsilon/3`. Then the triangle inequality gives $`|f(x) - f(a)| < \varepsilon`.

<details><summary>Example problem</summary>

**Problem.** Show that $`g_n(x) = \frac{x}{n}` converges uniformly to $`0` on $`[0, 1]`. Does it converge uniformly on $`\mathbb{R}`?

<details><summary>Solution</summary>

On $`[0,1]`: $`\sup_{x \in [0,1]} |x/n| = 1/n \to 0`, so convergence is uniform.

On $`\mathbb{R}`: $`\sup_{x \in \mathbb{R}} |x/n| = \infty` for every $`n`, so convergence is **not** uniform. It is pointwise (for each fixed $`x`, $`x/n \to 0`).

This illustrates why the domain matters: uniform convergence is a property of the sequence *on a set*, not just of the pointwise limit. ∎

</details>

</details>

</details>

## Compactness: Bolzano–Weierstrass and Heine–Borel

**Definition (Bolzano–Weierstrass).** Every bounded sequence in $`\mathbb{R}` has a convergent subsequence.

**Definition (Heine–Borel).** A subset $`K \subseteq \mathbb{R}` is compact if and only if it is closed and bounded.

**Theorem (continuous image of compact is compact).** If $`f: K \to \mathbb{R}` is continuous and $`K` is compact, then $`f(K)` is compact. In particular, $`f` attains its maximum and minimum on $`K`.

<details><summary>Details</summary>

### Why compactness matters

Compactness is the property that lets you pass from "every finite subcollection has a property" to "the whole collection has that property." In $`\mathbb{R}`, it is exactly closed + bounded.

**Bolzano–Weierstrass in action.** Let $`(a_n)` be bounded. The sequence has a convergent subsequence. Proof sketch: by the nested-interval (bisection) argument, there is a point $`a` such that infinitely many $`a_n` lie in every neighborhood of $`a`; pick those indices to form the subsequence.

**Heine–Borel in action.** The set $`(0, 1)` is bounded but not closed, hence not compact. Indeed, the open cover $`\{(1/n, 1) : n \geq 2\}` has no finite subcover.

**Extremum theorem.** If $`f` is continuous on $`[a, b]`, then $`f` attains a maximum and a minimum. This is the workhorse behind the intermediate value theorem's "crossing" argument and the existence of solutions in optimization.

<details><summary>Example problem</summary>

**Problem.** Use Bolzano–Weierstrass to show that every bounded sequence in $`\mathbb{R}` has a convergent subsequence. (Give the bisection argument.)

<details><summary>Solution</summary>

Let $`(a_n)` be bounded, say $`a_n \in [A, B]`.

1. Bisect $`[A, B]` into two halves. At least one half contains infinitely many $`a_n`. Call it $`I_1`.
2. Bisect $`I_1`. At least one half contains infinitely many $`a_n`. Call it $`I_2 \subseteq I_1`.
3. Continue inductively: $`I_{k+1} \subseteq I_k`, each $`I_k` contains infinitely many $`a_n`, and $`|I_k| = (B-A)/2^k \to 0`.

By the nested-interval property, $`\bigcap_k I_k = \{a\}` for some $`a`. Since each $`I_k` contains infinitely many terms, we can pick $`a_{n_k} \in I_k` with $`n_1 < n_2 < \cdots`. Then $`|a_{n_k} - a| \leq |I_k| \to 0`, so $`a_{n_k} \to a`. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** Let $`f_n: [0,1] \to \mathbb{R}` be defined by $`f_n(x) = x^n(1-x)`.

(a) Find the pointwise limit $`f(x)`.

(b) Is the convergence uniform? Justify.

(c) Is $`f` continuous?

<details><summary>Solution</summary>

**(a)** For $`x \in [0,1)`, $`x^n \to 0`, so $`f(x) = 0`. At $`x = 1`, $`f_n(1) = 0` for all $`n`, so $`f(1) = 0`. Thus $`f \equiv 0`.

**(b)** Compute $`\sup_{x \in [0,1]} x^n(1-x)`. Differentiate: $`g(x) = x^n(1-x)`, $`g'(x) = nx^{n-1}(1-x) - x^n = x^{n-1}(n - (n+1)x)`. Setting $`g' = 0`: $`x = n/(n+1)`. Then

$`g(n/(n+1)) = \left(\frac{n}{n+1}\right)^n \cdot \frac{1}{n+1} \approx \frac{1}{e(n+1)} \to 0.`

So $`\sup |f_n - f| \to 0`: the convergence **is** uniform.

**(c)** Since $`f \equiv 0`, it is continuous. (Consistent with the uniform limit theorem.) ∎

</details>

</details>
