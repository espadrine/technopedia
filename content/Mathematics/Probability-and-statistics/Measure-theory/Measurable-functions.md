# Measurable functions

A measurable function is a map between two [measurable spaces](./Measure-space.md) that "respects" the measurable structure: preimages of measurable sets are measurable. It is the bridge that allows integration to be defined. It answers the question *which functions can we integrate?* In probability, a random variable is precisely a measurable function from a probability space to $`\mathbb{R}`, which motivates the concept for readers coming from that direction.

> **Authoritative sources**
> - [Folland, Real Analysis: Techniques of Modern Analysis](https://www.ams.org/bookstore/getitem?servlet=GetItem&code=STML/34)
> - [Bogachev, Measure Theory, Vol. 1](https://link.springer.com/book/10.1007/978-3-540-34519-3)

## Definition

Let $`(X, \mathcal{F})` and $`(Y, \mathcal{G})` be [measurable spaces](./Measure-space.md). A function $`f: X \to Y` is **measurable** if
$`f^{-1}(B) \in \mathcal{F} \quad \text{for all } B \in \mathcal{G}`

In the most common case, $`Y = \mathbb{R}` with its Borel sigma-algebra $`\mathcal{B}(\mathbb{R})`.

<details><summary>Details</summary>

**Equivalent characterizations for $`f: X \to \mathbb{R}`:**

$`f` is measurable if and only if any (hence all) of the following hold:
1. $`\{x : f(x) > a\} \in \mathcal{F}` for all $`a \in \mathbb{R}`
2. $`\{x : f(x) \geq a\} \in \mathcal{F}` for all $`a \in \mathbb{R}`
3. $`\{x : a \leq f(x) < b\} \in \mathcal{F}` for all $`a, b \in \mathbb{R}`

**Key facts:**
- If $`f` and $`g` are measurable, then $`f + g`, $`fg`, $`|f|`, $`f^+ = \max(f,0)`, $`f^- = \max(-f,0)` are all measurable.
- See [Pointwise limits](#pointwise-limits-and-measurability) for closure under limits, and [Simple functions](#simple-functions) for the approximation theorem.

**Note on the nature of measurability.** Measurability is a *relationship* between two measurable structures (the sigma-algebra on the domain and the sigma-algebra on the codomain), not a property of the function in isolation. The same function $`f: X \to \mathbb{R}` may be measurable with respect to one sigma-algebra on $`X` and not another.

**Non-measurable functions.** If $`\mathcal{F} = \{\varnothing, X\}` (the trivial sigma-algebra), then the only measurable functions $`f: X \to \mathbb{R}` are the constant functions: for any non-constant $`f`, there exists a Borel set $`B` such that $`f^{-1}(B)` is a proper non-empty subset of $`X`, which is not in $`\mathcal{F}`. More dramatically, on $`(\mathbb{R}, \mathcal{L})` (Lebesgue-measurable sets), the indicator of a Vitali set $`V` is not measurable because $`V \notin \mathcal{L}`.

</details>

## Simple functions

A **simple function** is a measurable function taking only finitely many values:
$`f = \sum_{i=1}^{n} a_i \, \mathbf{1}_{A_i}`

where $`a_i \in \mathbb{R}` are distinct and $`A_i \in \mathcal{F}` are pairwise disjoint.

<details><summary>Details</summary>

Simple functions are the building blocks of the [Lebesgue integral](./Lebesgue-integral.md). Every nonnegative measurable function $`f` is the pointwise limit of an increasing sequence of simple functions $`f_n \uparrow f`.

**Example.** On $`\mathbb{R}`, the floor function $`f(x) = \lfloor x \rfloor` is *not* simple (it takes infinitely many values). However, restricted to $`[0, 3)` it *is* simple:
$`f = 0 \cdot \mathbf{1}_{[0,1)} + 1 \cdot \mathbf{1}_{[1,2)} + 2 \cdot \mathbf{1}_{[2,3)}`

The integral of a simple function is defined algebraically (see [Lebesgue integral](./Lebesgue-integral.md) for the full construction):
$`\int f \, d\mu = \sum_{i=1}^{n} a_i \, \mu(A_i)`

This is independent of the particular representation of $`f` as a sum of indicator functions.

</details>

## Composition of measurable functions

**Theorem.** If $`f: X \to Y` is measurable and $`g: Y \to Z` is measurable, then $`g \circ f: X \to Z` is measurable.

**Corollary.** If $`f: X \to \mathbb{R}` is measurable and $`g: \mathbb{R} \to \mathbb{R}` is Borel-measurable (in particular, if $`g` is continuous), then $`g \circ f` is measurable.

<details><summary>Details</summary>

**Proof.** For any $`C \in \mathcal{H}` (the sigma-algebra on $`Z`):
$`(g \circ f)^{-1}(C) = f^{-1}(g^{-1}(C))`
Since $`g` is measurable, $`g^{-1}(C) \in \mathcal{G}`. Since $`f` is measurable, $`f^{-1}(g^{-1}(C)) \in \mathcal{F}`.

**Why the corollary matters.** Every continuous function $`g: \mathbb{R} \to \mathbb{R}` is Borel-measurable (preimages of open sets are open, hence Borel). So if $`f` is measurable, then $`\sin(f)`, $`e^f`, $`|f|`, $`f^2`, etc. are all measurable. This is the practical workhorse: you rarely need to check measurability from scratch; you compose known measurable functions.

</details>

## Pointwise limits and measurability

**Theorem.** If $`f_1, f_2, \ldots` are measurable functions $`X \to \mathbb{R}`, then:
- $`\sup_n f_n`, $`\inf_n f_n`, $`\limsup_n f_n`, $`\liminf_n f_n` are all measurable.
- If $`f_n \to f` pointwise, then $`f` is measurable.

<details><summary>Details</summary>

**Proof sketch.** For $`\sup_n f_n`: $`\{x : \sup_n f_n(x) > a\} = \bigcup_n \{x : f_n(x) > a\}`, which is a countable union of measurable sets.

This theorem is crucial because it means the class of measurable functions is "closed under the operations we actually use": taking limits, composing, adding, multiplying.

**Connection to the Riemann integral.** Every Riemann-integrable function is Lebesgue-measurable (it is the a.e. limit of step functions, which are simple functions). The converse is false: the Dirichlet function $`\mathbf{1}_{\mathbb{Q}}` is measurable (hence Lebesgue-integrable, with integral 0) but not Riemann-integrable.

</details>

## Interactive exploration

<iframe src="./Measurable-functions.simulation.html" title="Interactive visualization of measurable functions and preimages"></iframe>

## Example problem

**Problem.** Let $`(\mathbb{R}, \mathcal{B}(\mathbb{R}))` be the Borel measurable space. Show that $`f(x) = \mathbf{1}_{\mathbb{Q}}(x)` (the Dirichlet function) is Borel-measurable, and find a sequence of simple functions converging to it pointwise.

<details><summary>Solution</summary>

**Step 1: Show measurability.**

$`f` takes only the values 0 and 1. For any Borel set $`B \subseteq \mathbb{R}`:
- If $`0 \in B` and $`1 \in B`: $`f^{-1}(B) = \mathbb{R} \in \mathcal{B}(\mathbb{R})` ✓
- If $`0 \in B`, $`1 \notin B`: $`f^{-1}(B) = \mathbb{R} \setminus \mathbb{Q} \in \mathcal{B}(\mathbb{R})` (complement of a countable set) ✓
- If $`0 \notin B`, $`1 \in B`: $`f^{-1}(B) = \mathbb{Q} \in \mathcal{B}(\mathbb{R})` (countable set) ✓
- If $`0 \notin B`, $`1 \notin B`: $`f^{-1}(B) = \varnothing \in \mathcal{B}(\mathbb{R})` ✓

So $`f` is Borel-measurable.

**Step 2: Construct simple functions.**

Let $`f_n(x) = \mathbf{1}_{\{q_1, \ldots, q_n\}}(x)` where $`\{q_1, q_2, \ldots\}` is an enumeration of $`\mathbb{Q}`. Each $`f_n` is a simple function (it takes values 0 and 1 on the measurable sets $`\{q_1, \ldots, q_n\}` and its complement). And $`f_n(x) \to \mathbf{1}_{\mathbb{Q}}(x) = f(x)` for every $`x`.

</details>
- If $`0 \in B` and $`1 \in B`: $`f^{-1}(B) = \mathbb{R} \in \mathcal{B}(\mathbb{R})` ✓
- If $`0 \in B`, $`1 \notin B`: $`f^{-1}(B) = \mathbb{R} \setminus \mathbb{Q} \in \mathcal{B}(\mathbb{R})` (complement of a countable set) ✓
- If $`0 \notin B`, $`1 \in B`: $`f^{-1}(B) = \mathbb{Q} \in \mathcal{B}(\mathbb{R})` (countable set) ✓
- If $`0 \notin B`, $`1 \notin B`: $`f^{-1}(B) = \varnothing \in \mathcal{B}(\mathbb{R})` ✓

So $`f` is Borel-measurable.

**Step 2: Construct simple functions.**

Let $`f_n(x) = \mathbf{1}_{\{q_1, \ldots, q_n\}}(x)` where $`\{q_1, q_2, \ldots\}` is an enumeration of $`\mathbb{Q}`. Each $`f_n` is a simple function (it takes values 0 and 1 on the measurable sets $`\{q_1, \ldots, q_n\}` and its complement). And $`f_n(x) \to \mathbf{1}_{\mathbb{Q}}(x) = f(x)` for every $`x`.

</details>