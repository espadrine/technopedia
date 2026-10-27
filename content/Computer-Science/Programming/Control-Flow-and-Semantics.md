# Control Flow and Semantics

Control flow and semantics define what a program means: how statements execute, how variables are bound, how functions compose, and how expressions are evaluated. They are relevant whenever a program's behavior must be predicted, reasoned about, or verified. This page covers the control-flow constructs (conditionals, loops, exceptions), the binding and scoping rules that give variables meaning, the evaluation strategies that determine *when* and *how* expressions are reduced, and the formal semantics frameworks that make all of this precise.

> **Authoritative sources**
> - [The Art of Computer Programming, Volume 1](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)
> - [Types and Programming Languages (Pierce, 2002, MIT Press)](https://mitpress.mit.edu/9780262303828/types-and-programming-languages/)
> - [The Formal Semantics of Programming Languages (Winskel, 1993, MIT Press)](https://mitpress.mit.edu/9780262731549/the-formal-semantics-of-programming-languages/)

## Sequencing, state, and assignment

Every imperative language rests on two primitive rules. **Skip** ($`\text{skip}`) does nothing: it is the identity on state. **Sequencing** ($`S_1; S_2`) composes two statements: evaluate $`S_1` to an intermediate state $`\sigma'`, then evaluate $`S_2` in $`\sigma'`. A **state** $`\sigma` is a mapping from variables to values ($`\sigma : \text{Var} \to \text{Val}`), and **assignment** $`x := e` is a state update: it produces $`\sigma[x := v]`, the state identical to $`\sigma` except that $`x` now maps to the value $`v` of $`e`.

<details><summary>Details</summary>

These three notions — state, skip, composition — are the foundation on which every other control-flow rule builds: `if` and `while` are just different ways of choosing *which* sequence of assignments to run.

**The state**: think of $`\sigma` as a table with one row per variable currently in scope. There is exactly one cell per binding; assignment overwrites the cell's content, it never creates a second cell. (Where those cells live physically — stack frame or heap — is covered in [Memory Management](./Memory-Management.md).)

**Assignment**: $`\sigma[x := v]` is defined pointwise: it agrees with $`\sigma` on every variable except $`x`, where it maps $`x \mapsto v`. All other bindings are untouched — this is what makes assignment *local*.

**Skip**: $`\text{skip}` leaves the state unchanged: $`\sigma \vdash \text{skip} \to \sigma`. It is the identity element of sequencing: $`S; \text{skip}` and $`\text{skip}; S` behave exactly like $`S`. This is why a `for` loop with an empty body is legal and means "repeat the condition test only".

**Composition**: $`S_1; S_2` is evaluated left to right:

$`\frac{\sigma \vdash S_1 \to \sigma' \quad \sigma' \vdash S_2 \to \sigma''}{\sigma \vdash S_1; S_2 \to \sigma''}`

**Specific example**: take the program $`x := 3;\; y := x + 1` starting from the empty state $`\sigma_0 = \{\}`:

1. Evaluate $`x := 3`: the state becomes $`\sigma_1 = \sigma_0[x := 3] = \{x \mapsto 3\}`.
2. Evaluate $`y := x + 1` *in* $`\sigma_1`: look up $`x` (yields 3), compute 4, and the state becomes $`\sigma_2 = \sigma_1[y := 4] = \{x \mapsto 3,\; y \mapsto 4\}`.

The order matters: had the program been $`y := x + 1;\; x := 3`, the lookup of $`x` in step 2 would fail (or yield a default), which is why sequencing is not commutative.

<svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:640px;background:#0d1117;border-radius:8px">
  <text x="20" y="30" fill="#64ffda" font-family="monospace" font-size="15">σ = { x ↦ 2,  y ↦ 5 }</text>
  <rect x="20" y="45" width="60" height="26" fill="#16213e" stroke="#0f3460" rx="4"/>
  <text x="30" y="63" fill="#e0e0e0" font-family="monospace" font-size="13">x: 2</text>
  <rect x="90" y="45" width="60" height="26" fill="#16213e" stroke="#0f3460" rx="4"/>
  <text x="100" y="63" fill="#e0e0e0" font-family="monospace" font-size="13">y: 5</text>
  <text x="200" y="63" fill="#ffd93d" font-family="monospace" font-size="15">x := 7</text>
  <line x1="290" y1="58" x2="360" y2="58" stroke="#64ffda" stroke-width="2"/>
  <polygon points="360,58 350,53 350,63" fill="#64ffda"/>
  <text x="200" y="90" fill="#a0a0a0" font-family="monospace" font-size="12">only the x cell changes</text>
  <text x="400" y="30" fill="#64ffda" font-family="monospace" font-size="15">σ[x := 7] = { x ↦ 7,  y ↦ 5 }</text>
  <rect x="400" y="45" width="60" height="26" fill="#2a1a1a" stroke="#ff6b6b" rx="4"/>
  <text x="410" y="63" fill="#ff6b6b" font-family="monospace" font-size="13">x: 7</text>
  <rect x="470" y="45" width="60" height="26" fill="#16213e" stroke="#0f3460" rx="4"/>
  <text x="480" y="63" fill="#e0e0e0" font-family="monospace" font-size="13">y: 5</text>
  <text x="20" y="120" fill="#a0a0a0" font-family="monospace" font-size="12">skip:  σ[skip] = σ   (identity)</text>
  <text x="20" y="140" fill="#a0a0a0" font-family="monospace" font-size="12">seq:   S1;S2  =  run S1 to σ′, then S2 in σ′</text>
</svg>

**Authoritative source**: [The Formal Semantics of Programming Languages (Winskel, 1993)](https://mitpress.mit.edu/9780262731549/the-formal-semantics-of-programming-languages/) — chapters 1–3 build everything from exactly these rules.

<details><summary>Example problem</summary>

Starting from the empty state, what is the final state of $`x := 2;\; x := x \cdot x;\; y := x + x`? Which single statement could you replace with `skip` without changing the result?

<details><summary>Solution</summary>

- $`x := 2` gives $`\sigma_1 = \{x \mapsto 2\}`.
- $`x := x \cdot x` looks up 2, computes 4, gives $`\sigma_2 = \{x \mapsto 4\}`.
- $`y := x + x` looks up 4 twice, gives $`\sigma_3 = \{x \mapsto 4,\; y \mapsto 8\}`.

The first statement $`x := 2` can be replaced by `skip` only if $`x` already holds 2 in the initial state; from the *empty* state, no statement can be removed — each assignment feeds the next. This shows sequencing is genuinely order-dependent: removing or reordering any $`S_i` changes the intermediate states that later statements read.

</details>
</details>

</details>

## Conditionals and loops

**if**: $`\text{if } b \text{ then } S_1 \text{ else } S_2` executes $`S_1` if $`b` is true, else $`S_2`. **while**: $`\text{while } b \text{ do } S` repeats $`S` while $`b` is true. **for**: a bounded loop with three components — initialization, condition, and update — that desugars directly to a `while` loop.

<details><summary>Details</summary>

Conditionals and loops are *derived* rules: each one selects which sequence of assignments (the primitive from the previous section) to run, and how many times.

**Short-circuit evaluation**: $`a \&\& b` evaluates $`b` only if $`a` is true; $`a \|\| b` evaluates $`b` only if $`a` is false. This is a semantic choice, not a syntactic one.

**The `for` loop desugared**: the C-style `for (init; cond; update) body` is syntactic sugar for:

```text
init;
while (cond) {
  body;
  update;
}
```

"Bounded" means the loop's lifetime is controlled by three explicit parts: `init` runs once before the first test, `cond` is checked before every iteration, and `update` runs after each iteration. This contrasts with an unbounded `while` where the programmer must manage the counter manually.

**Loop invariants**: a predicate $`P` that holds before and after each iteration. Proving $`P` holds at loop exit (when $`b` is false) establishes the loop's postcondition.

**Tail position and tail recursion**: a call is in **tail position** when no operation is pending after it — the caller's frame has nothing left to do, so it can be discarded before the call executes. A function whose recursive calls are all in tail position is *tail-recursive* and can be compiled to a loop. Whether a runtime actually performs this **tail-call optimization** is a property of the implementation, not the language semantics; the mechanism (stack frames, stack overflow) is covered in [Memory Management](./Memory-Management.md).

<details><summary>Example problem</summary>

In `f(n) { if (n == 0) return 0; return 1 + f(n - 1); }`, is the recursive call in tail position? What minimal rewrite makes it so?

<details><summary>Solution</summary>

No: the call's result is used by the pending operation `1 + …`, so the caller's frame must survive the call. Moving the pending addition into an accumulator parameter — `f(n, acc) { if (n == 0) return acc; return f(n - 1, acc + 1); }` — leaves nothing pending after the call, putting it in tail position. See [Memory Management](./Memory-Management.md) for how this eliminates stack growth.

</details>
</details>

</details>

## Variables, scope, and closures

A **variable** is a named binding in an environment. **Scope** determines where a binding is visible. **Closures** capture the environment in which a function is defined, allowing the function to access variables that are no longer in scope. The physical layout of environments and stack frames is covered in [Memory Management](./Memory-Management.md).

<details><summary>Details</summary>

**Lexical scope** (static): a variable's scope is determined by its textual position. $`let x = 1; let f = () => x; let x = 2; f() // returns 1`.

**Dynamic scope**: a variable's scope is determined by the call stack. Rare in modern languages (Scheme's `dynamic-wind`, R5RS+; Common Lisp uses `unwind-protect` instead).

The difference is easiest to see when the same program is resolved both ways:

<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;background:#0d1117;border-radius:8px">
  <text x="20" y="28" fill="#e0e0e0" font-family="monospace" font-size="13">let x = 1;</text>
  <text x="20" y="50" fill="#e0e0e0" font-family="monospace" font-size="13">function outer() {</text>
  <text x="40" y="72" fill="#e0e0e0" font-family="monospace" font-size="13">let x = 2;</text>
  <text x="40" y="94" fill="#e0e0e0" font-family="monospace" font-size="13">function inner() { return x; }</text>
  <text x="40" y="116" fill="#e0e0e0" font-family="monospace" font-size="13">return inner;</text>
  <text x="20" y="138" fill="#e0e0e0" font-family="monospace" font-size="13">}</text>
  <text x="20" y="160" fill="#e0e0e0" font-family="monospace" font-size="13">function caller() {</text>
  <text x="40" y="182" fill="#e0e0e0" font-family="monospace" font-size="13">let x = 3;</text>
  <text x="40" y="204" fill="#e0e0e0" font-family="monospace" font-size="13">return outer()();  // inner called here</text>
  <text x="20" y="226" fill="#e0e0e0" font-family="monospace" font-size="13">}</text>
  <rect x="330" y="60" width="150" height="24" fill="#16213e" stroke="#64ffda" rx="4"/>
  <text x="340" y="77" fill="#64ffda" font-family="monospace" font-size="12">outer's x = 2</text>
  <rect x="330" y="170" width="150" height="24" fill="#16213e" stroke="#ff6b6b" rx="4"/>
  <text x="340" y="187" fill="#ff6b6b" font-family="monospace" font-size="12">caller's x = 3</text>
  <line x1="300" y1="88" x2="330" y2="74" stroke="#64ffda" stroke-width="2"/>
  <polygon points="330,74 319,73 325,82" fill="#64ffda"/>
  <line x1="300" y1="198" x2="330" y2="184" stroke="#ff6b6b" stroke-width="2" stroke-dasharray="5,3"/>
  <polygon points="330,184 319,183 325,192" fill="#ff6b6b"/>
  <text x="500" y="77" fill="#64ffda" font-family="monospace" font-size="12">lexical: inner's x</text>
  <text x="500" y="95" fill="#64ffda" font-family="monospace" font-size="12">resolves where inner</text>
  <text x="500" y="113" fill="#64ffda" font-family="monospace" font-size="12">is WRITTEN → 2</text>
  <text x="500" y="187" fill="#ff6b6b" font-family="monospace" font-size="12">dynamic: resolves</text>
  <text x="500" y="205" fill="#ff6b6b" font-family="monospace" font-size="12">where inner is CALLED</text>
  <text x="500" y="223" fill="#ff6b6b" font-family="monospace" font-size="12">→ 3</text>
</svg>

**Closures**: $`let makeCounter = () => { let n = 0; return () => { n++; return n; }; }; let c = makeCounter(); c(); // 1, c(); // 2`. The inner function captures the mutable cell for $`n`. The environment cell is shared: every call to `c()` mutates the same cell.

<svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:640px;background:#0d1117;border-radius:8px">
  <rect x="30" y="40" width="120" height="40" fill="#16213e" stroke="#64ffda" rx="6"/>
  <text x="55" y="65" fill="#64ffda" font-family="monospace" font-size="14">inc ()</text>
  <rect x="30" y="110" width="120" height="40" fill="#16213e" stroke="#64ffda" rx="6"/>
  <text x="55" y="135" fill="#64ffda" font-family="monospace" font-size="14">dec ()</text>
  <line x1="150" y1="60" x2="300" y2="80" stroke="#ffd93d" stroke-width="2"/>
  <line x1="150" y1="130" x2="300" y2="100" stroke="#ffd93d" stroke-width="2"/>
  <polygon points="300,80 288,76 291,86" fill="#ffd93d"/>
  <polygon points="300,100 288,104 291,94" fill="#ffd93d"/>
  <rect x="300" y="70" width="110" height="40" fill="#2a2a1a" stroke="#ffd93d" rx="6"/>
  <text x="325" y="95" fill="#ffd93d" font-family="monospace" font-size="14">n = 0</text>
  <text x="430" y="85" fill="#a0a0a0" font-family="monospace" font-size="12">← ONE shared cell,</text>
  <text x="430" y="103" fill="#a0a0a0" font-family="monospace" font-size="12">captured by both</text>
  <text x="430" y="121" fill="#a0a0a0" font-family="monospace" font-size="12">closures</text>
  <text x="30" y="175" fill="#a0a0a0" font-family="monospace" font-size="12">inc() → 1, inc() → 2, dec() → 1: both closures read and write the same cell.</text>
</svg>

**Hoisting**: in JavaScript, variable declarations (`var`) and function declarations are moved to the top of their scope before execution. `let` and `const` are hoisted but not initialized (temporal dead zone).

**Connection to the formal model**: this is the state-and-assignment model of the [sequencing section](#sequencing-state-and-assignment) with one addition — an *environment* layer mapping names to cells, so that two names may share one cell (closures) or one name may denote different cells in different scopes (`let` per iteration).

**Authoritative source**: [ECMAScript Language Specification — Lexical Environments](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html).

<details><summary>Example problem</summary>

Under dynamic scoping, what does the scope-nesting program above print when `caller()` runs? Why do most modern languages reject dynamic scoping?

<details><summary>Solution</summary>

It returns 3: `inner` is called from `caller`, so dynamic resolution picks `caller`'s `x`. Dynamic scoping is rejected because a function's meaning then depends on its *callers* — you cannot reason about a function in isolation, and renaming a variable in any caller can silently change the callee's behavior. Lexical scope makes every function's meaning fixed at its definition site, which is what enables local reasoning and separate compilation.

</details>
</details>

</details>

## Functions, composition, and currying

A **function** maps inputs to outputs. **Recursion** is a function that calls itself. **Higher-order functions** take functions as arguments or return functions: `map`, `filter`, `reduce`, `fold`. The type system that constrains which functions can be composed is studied in [Language Theory](./Language-Theory.md).

<details><summary>Details</summary>

**Composition**: $`(g \circ f)(x) = g(f(x))`, type $`(A \to B) \to (B \to C) \to (A \to C)`. Composition is associative — $`h \circ (g \circ f) = (h \circ g) \circ f` — which is why pipelines of transformations can be regrouped freely.

**Partial application**: fixing one argument of $`f: A \times B \to C` yields $`f': A \to (B \to C)`.

**Currying**: $`f: A \times B \to C` is equivalent to $`f': A \to (B \to C)`. $`f(a, b) = f'(a)(b)`. Currying is what makes partial application uniform: every function of several arguments is secretly a function of one argument returning a function.

**Specific example**: with `add = a => b => a + b`, the partially applied `add(3)` is the function $`b \mapsto 3 + b`, and `map(add(3), [1, 2, 3])` yields `[4, 5, 6]` — no new machinery needed, just composition of an existing function with `map`.

**Recursion schemes**: catamorphisms (folds) and anamorphisms (unfolds) generalize recursion over inductive data types. A left fold (the default `reduce` in Python, JavaScript, and Haskell's `foldl`):

$`\text{foldl}(f, z, [a_1, \ldots, a_n]) = f(\ldots f(f(z, a_1), a_2) \ldots, a_n)`

A right fold (Haskell's `foldr`):

$`\text{foldr}(f, z, [a_1, \ldots, a_n]) = f(a_1, f(a_2, \ldots f(a_n, z) \ldots))`

The left fold is strict in the accumulator; the right fold can be lazy and may terminate on infinite lists.

**Authoritative source**: [Haskell Report, section on folds](https://www.haskell.org/onlinereport/standard-prelude.html).

<details><summary>Example problem</summary>

Why does `foldr` terminate on the infinite list `[1, 2, 3, ...]` for `foldr (\x acc -> if x > 2 then acc else x : acc) []` while `foldl` with the same arguments never produces a result?

<details><summary>Solution</summary>

`foldr` is defined as $`f(a_1, \text{foldr}(f, z, \text{rest}))`: it produces the outermost application $`f(1, \ldots)` *before* forcing the rest of the list. Here $`f` returns `x : acc` without inspecting `acc` when $`x > 2` is false... more precisely, for each $`x \leq 2` it conses and only the *tail* remains unevaluated; once $`x > 2`, $`f` returns `acc` without forcing the tail, so the infinite remainder is never demanded. `foldl` is $`f(\text{foldl}(f, z', \text{rest}), a)`: the recursive call on the rest of the list is the *first* argument, so any result requires the whole infinite list to be consumed first. This strictness asymmetry is exactly the call-by-need behavior discussed in the next section.

</details>
</details>

</details>

## Functors, applicatives, and monads

Functors, applicatives, and monads generalize plain function composition to computations wrapped in a *context* (optionality, lists, effects). They are the category-theory layer above the composition and currying of the previous section.

- **Functor**: $`fmap: (A \to B) \to F(A) \to F(B)` — lifts a plain function over a structure (e.g., `Option`, `List`).
- **Applicative**: $`pure: A \to F(A)`, $`(<*>): F(A \to B) \to F(A) \to F(B)` — applies a function in context to a value in context.
- **Monad**: $`return: A \to M(A)`, $`>>=: M(A) \to (A \to M(B)) \to M(B)` — chains computations where the next step depends on the previous result.

The progression: a plain function maps $`A \to B`; a functor maps that function over a wrapper $`F`; an applicative applies a wrapped function to a wrapped value; a monad chains when the next step depends on the previous result.

<details><summary>Details</summary>

**Global picture**: each layer adds one degree of dependency. Functor: the function is total and independent per element. Applicative: the *shape* of the computation is fixed in advance (all arguments known up front). Monad: the shape may depend on intermediate results — which is why monads can model effects like exceptions (stop early) and state (thread $`\sigma` through).

**Specific example**: parsing two integers where the second parse depends on the first requires a monad (`>>=`); parsing two *independent* integers needs only an applicative (`<*>`), which is why applicative parsers can be parallelized and monadic ones generally cannot.

**Where to go next**: the practical, pattern-level uses of these abstractions (Option chaining, Result propagation, promise chaining as a monad) with worked code are treated in [Design Patterns](./Design-Patterns.md); this page fixes only the type signatures and the progression.

**Authoritative source**: [Applicative Programming with Effects (McBride & Paterson, 2008)](https://www.staff.city.ac.uk/~ross/papers/Applicative.html) and [Monads for Functional Programming (Wadler, 1995)](https://homepages.inf.ed.ac.uk/wadler/papers/marktoberdorf/baastad.pdf).

<details><summary>Example problem</summary>

Given `safeDiv : Int -> Int -> Maybe Int`, why can `safeDiv 6 3` be written with `fmap` but `divAll : Int -> [Int] -> Maybe [Int]` (divide `n` by every element, failing if any division fails) needs a monad?

<details><summary>Solution</summary>

`safeDiv 6 3` applies a *known* function to *known* arguments; only the result is wrapped, so `fmap` suffices. In `divAll`, whether to continue with the next element depends on the *result* of the previous division — the structure of the computation depends on intermediate values. That dependency is precisely what `>>=` adds over `<*>`: applicative computations have a fixed shape, monadic ones do not.

</details>
</details>

</details>

## Evaluation strategies

An **evaluation strategy** specifies the order in which sub-expressions are reduced and when function arguments are evaluated. This is a semantic choice that affects both performance and expressiveness.

<details><summary>Details</summary>

**Call-by-value (strict / eager)**: arguments are fully evaluated *before* the function body executes. This is the strategy of C, Java, Python, and most imperative languages. Side effects in arguments are visible to the callee.

**Call-by-name (lazy)**: arguments are substituted unevaluated into the body and evaluated only when needed. This can avoid unnecessary computation but may re-evaluate the same expression multiple times.

**Call-by-need (lazy with memoization)**: like call-by-name, but each argument is evaluated at most once and the result is cached. Haskell's default strategy. This gives the efficiency of strict evaluation with the laziness of call-by-name.

**A concrete comparison**: take $`f(x) = x + x` and call it with a side-effecting argument — a counter increment:

```javascript
let counter = 0;
function inc() { counter++; return counter; }
function f(x) { return x + x; }
f(inc());
```

The comparison, rendered as raw HTML (LaTeXMarkdown does not render pipe tables):

<table>
<tr><th>Strategy</th><th>What happens</th><th>Result</th><th>Final counter</th></tr>
<tr><td>Call-by-value</td><td><code>inc()</code> evaluated once, value 1 passed to the body</td><td>2</td><td>1</td></tr>
<tr><td>Call-by-name</td><td><code>inc()</code> substituted, giving <code>inc() + inc()</code>; each occurrence evaluated when needed</td><td>1 + 2 = 3</td><td>2</td></tr>
<tr><td>Call-by-need</td><td><code>inc()</code> evaluated once (value 1), result cached and reused</td><td>2</td><td>1</td></tr>
</table>

Call-by-name is the only strategy where the argument's side effect happens *twice* — and it happens *interleaved with* the body's execution rather than before it, which is why call-by-name programs with effects are notoriously hard to reason about. Call-by-need restores the "evaluated once" guarantee while keeping laziness.

**Evaluation order**: even in strict languages, the order in which arguments are evaluated is often unspecified (C) or left-to-right (Java, Python). This matters when arguments have side effects.

**Short-circuit vs. full evaluation**: $`a \&\& b` and $`a \|\| b` are inherently non-strict in their second operand — a special case of call-by-name embedded in an otherwise strict language.

The choice of strategy interacts with the type system (see [Language Theory](./Language-Theory.md)) and with the compiler's code generation (see [Compilation](./Compilation.md)): a lazy language requires the runtime to allocate thunks (unevaluated expressions) on the heap.

**Authoritative source**: [Report on the Algorithmic Language Haskell 2010 — semantics of lazy evaluation](https://www.haskell.org/onlinereport/haskell2010/).

<details><summary>Example problem</summary>

Under call-by-name, `f(inc())` above returns 3 and leaves `counter = 2`. What does `g(x) = 1` return under each strategy when called as `g(inc())`, and what is `counter` afterwards?

<details><summary>Solution</summary>

All three strategies return 1, but the side effects differ. Call-by-value evaluates `inc()` before the call: `counter = 1`. Call-by-name substitutes the argument into the body `1` — the argument never appears, so it is *never* evaluated: `counter = 0`. Call-by-need also defers evaluation, and since the thunk is never demanded, `counter = 0`. This is the key expressiveness difference: non-strict strategies can discard unused arguments entirely, which strict evaluation cannot.

</details>
</details>

</details>

## Exceptions and non-local exits

Exceptions are a control-flow mechanism that transfers control from a throwing site to the nearest enclosing handler, bypassing intermediate frames. They generalize the `break`/`return` pattern to arbitrary nesting depths.

<details><summary>Details</summary>

**try / catch / finally**:

```text
try {
  S;            // may throw
} catch (e: T) {
  H;            // handler for type T
} finally {
  C;            // cleanup, runs whether or not an exception was thrown
}
```

The `finally` block runs on normal completion, on exception, and on non-local exit (e.g., `return` inside `try`). This makes it the canonical place for resource cleanup.

**Non-local exits**: `return`, `break`, `continue`, and exceptions all transfer control out of the current frame without executing the remaining statements. The key semantic question is: *which cleanup code runs?* In most languages, `finally` blocks and destructors run in reverse order of entry as the stack unwinds.

<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;background:#0d1117;border-radius:8px">
  <text x="20" y="28" fill="#64ffda" font-family="monospace" font-size="14">Stack before the throw</text>
  <rect x="20" y="45" width="200" height="40" fill="#16213e" stroke="#0f3460" rx="4"/>
  <text x="35" y="70" fill="#e0e0e0" font-family="monospace" font-size="13">main  [has catch]</text>
  <rect x="20" y="95" width="200" height="40" fill="#16213e" stroke="#0f3460" rx="4"/>
  <text x="35" y="120" fill="#e0e0e0" font-family="monospace" font-size="13">readFile  [finally]</text>
  <rect x="20" y="145" width="200" height="40" fill="#16213e" stroke="#0f3460" rx="4"/>
  <text x="35" y="170" fill="#e0e0e0" font-family="monospace" font-size="13">parse  [throws]</text>
  <text x="250" y="70" fill="#ffd93d" font-family="monospace" font-size="13">throw!</text>
  <line x1="220" y1="165" x2="250" y2="165" stroke="#ff6b6b" stroke-width="2"/>
  <line x1="250" y1="165" x2="250" y2="65" stroke="#ff6b6b" stroke-width="2"/>
  <line x1="250" y1="65" x2="290" y2="65" stroke="#ff6b6b" stroke-width="2"/>
  <polygon points="290,65 280,60 280,70" fill="#ff6b6b"/>
  <text x="250" y="120" fill="#ff6b6b" font-family="monospace" font-size="12">unwind: parse's</text>
  <text x="250" y="138" fill="#ff6b6b" font-family="monospace" font-size="12">frame popped, its</text>
  <text x="250" y="156" fill="#ff6b6b" font-family="monospace" font-size="12">finally runs first</text>
  <text x="330" y="28" fill="#64ffda" font-family="monospace" font-size="14">Cleanup order during unwinding</text>
  <text x="330" y="60" fill="#e0e0e0" font-family="monospace" font-size="13">1. parse:     finally { close(file) }   ← runs</text>
  <text x="330" y="85" fill="#e0e0e0" font-family="monospace" font-size="13">2. readFile:  frame popped, locals freed</text>
  <text x="330" y="110" fill="#e0e0e0" font-family="monospace" font-size="13">3. main:      catch (e) { handle }      ← lands</text>
  <text x="330" y="150" fill="#a0a0a0" font-family="monospace" font-size="12">Cleanup runs in reverse order of entry,</text>
  <text x="330" y="168" fill="#a0a0a0" font-family="monospace" font-size="12">like popping nested parentheses.</text>
  <text x="330" y="200" fill="#a0a0a0" font-family="monospace" font-size="12">No handler anywhere → the program</text>
  <text x="330" y="218" fill="#a0a0a0" font-family="monospace" font-size="12">terminates after running all finallys.</text>
  <text x="20" y="250" fill="#a0a0a0" font-family="monospace" font-size="12">The exception does not "break" scope: each unwound frame runs the same</text>
  <text x="20" y="268" fill="#a0a0a0" font-family="monospace" font-size="12">cleanup (finally blocks, destructors, variable deallocation) that a normal</text>
  <text x="20" y="286" fill="#a0a0a0" font-family="monospace" font-size="12">return would — only the control-transfer target differs.</text>
</svg>

**Interaction with scope**: an exception does not "break" scope — it triggers the same cleanup (variable deallocation, `finally` blocks) that a normal return would, but the control transfer target is the handler, not the caller.

**Scheme's `dynamic-wind`** (R5RS+) and **Common Lisp's `unwind-protect`** provide explicit before/after guards that run on any exit (normal or exceptional), making the cleanup contract explicit rather than implicit.

**Checked vs. unchecked exceptions**: Java distinguishes checked (must be declared or caught) from unchecked (runtime) exceptions. C++ uses `noexcept` specifications. Python has no checked exceptions. The choice affects the type system and the compiler's code generation.

**Authoritative source**: [R5RS Scheme — control features (`dynamic-wind`)](https://schemers.org/Documents/Standards/R5RS/HTML/r5rs-Z-H-9.html).

<details><summary>Example problem</summary>

In the stack-unwinding diagram above, suppose `readFile`'s `finally` block itself throws. Which handler catches that new exception, and what happens to the original exception from `parse`?

<details><summary>Solution</summary>

The new exception propagates from `readFile`'s frame *upward* — it is not caught by `main`'s `catch` in the sense of resuming the original flow; rather, the original exception from `parse` is *discarded* (in most languages: Java, JavaScript, Python), and the new exception continues unwinding from `readFile`. `main`'s handler receives the *second* exception. This "exception during cleanup" problem is why some languages (e.g., Python's `raise ... from`, Java's suppressed exceptions in try-with-resources) provide a way to chain or suppress the original exception instead of losing it.

</details>
</details>

</details>

## Operational and denotational semantics

Formal semantics gives a mathematical definition of what a program means, independent of any particular implementation. The primitives it must define first are exactly the ones from the [sequencing section](#sequencing-state-and-assignment): the state $`\sigma`, assignment $`\sigma[x := v]`, `skip`, and composition $`S_1; S_2`.

<details><summary>Details</summary>

**Operational semantics** defines meaning as a sequence of state transitions:

- **Big-step (natural) semantics**: $`\sigma \vdash e \Downarrow v` — expression $`e` in state $`\sigma` evaluates in one (possibly compound) step to value $`v`.
- **Small-step (structural) semantics**: $`\sigma \vdash e \to e'` — one atomic transition. The reflexive-transitive closure $`\to^*` gives the full evaluation. Small-step makes it easier to reason about intermediate states and to define concurrency.

**Denotational semantics** maps each syntactic construct to a mathematical object (usually a function between domains):

- A command denotes a function from state to state: $`\llbracket S \rrbracket : \Sigma \to \Sigma`.
- An expression denotes a function from environment to value: $`\llbracket e \rrbracket : \Gamma \to V`.
- The key property is **compositionality**: the denotation of a compound expression is determined solely by the denotations of its parts.

**Axiomatic semantics** (Hoare logic) specifies meaning as pre/postcondition triples: $`\{P\} \; S \; \{Q\}` means "if $`P` holds before $`S` and $`S` terminates, then $`Q` holds after." This is the basis for formal verification.

**The two primitive rules, formally**:

$`\sigma \vdash \text{skip} \to \sigma \qquad \frac{\sigma \vdash S_1 \to \sigma' \quad \sigma' \vdash S_2 \to \sigma''}{\sigma \vdash S_1; S_2 \to \sigma''}`

`skip` is the identity on state; $`S_1; S_2` composes by evaluating $`S_1` to a state $`\sigma'`, then $`S_2` in $`\sigma'`. Every other rule (`if`, `while`, exceptions) is defined on top of these.

**Worked example**: take the tiny program $`x := 3;\; y := x + 1` from the empty state $`\sigma_0 = \{\}`.

**(a) Big-step derivation** — one judgment per compound command, bottom-up:

$`\frac{\sigma_0 \vdash x := 3 \Downarrow \sigma_1 \qquad \sigma_1 \vdash y := x + 1 \Downarrow \sigma_2}{\sigma_0 \vdash x := 3;\; y := x + 1 \Downarrow \sigma_2}`

where $`\sigma_1 = \{x \mapsto 3\}` and $`\sigma_2 = \{x \mapsto 3,\; y \mapsto 4\}`. The premise on the left is discharged by the assignment axiom $`\sigma \vdash x := 3 \Downarrow \sigma[x := 3]`; the right premise needs the expression sub-derivation $`\sigma_1 \vdash x + 1 \Downarrow 4` before the assignment axiom applies.

**(b) Small-step derivation** — a linear trace of atomic transitions on *configurations* $`\langle S, \sigma \rangle`:

$`\langle x := 3;\; y := x + 1,\; \sigma_0 \rangle`<br>
$`\to \langle y := x + 1,\; \{x \mapsto 3\} \rangle`<br>
$`\to \langle \text{skip},\; \{x \mapsto 3,\; y \mapsto 4\} \rangle`<br>
$`\to \{x \mapsto 3,\; y \mapsto 4\}`

Each arrow is one rule application: the sequencing rule exposes $`x := 3` first, the assignment axiom fires, then the same happens for $`y := x + 1`, and finally the `skip` rule terminates the trace.

**(c) Denotational mapping** — no states are "reached"; the program *is* a function:

$`\llbracket x := 3 \rrbracket = \lambda \sigma.\; \sigma[x := 3]`<br>
$`\llbracket S_1; S_2 \rrbracket = \llbracket S_2 \rrbracket \circ \llbracket S_1 \rrbracket`<br>
$`\llbracket x := 3;\; y := x + 1 \rrbracket\, \sigma_0 = \sigma_0[x := 3][y := 4] = \{x \mapsto 3,\; y \mapsto 4\}`

The three frameworks agree on the outcome ($`\sigma_2`), but they expose different information: the big-step derivation shows *why* the result holds, the small-step trace shows *each intermediate state* (essential for concurrency), and the denotation shows the program as a composable function, enabling algebraic laws such as $`\llbracket S; \text{skip} \rrbracket = \llbracket S \rrbracket`.

<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;background:#0d1117;border-radius:8px">
  <text x="20" y="28" fill="#64ffda" font-family="monospace" font-size="14">Small-step: a chain of atomic transitions</text>
  <rect x="20" y="45" width="180" height="34" fill="#16213e" stroke="#0f3460" rx="4"/>
  <text x="30" y="67" fill="#e0e0e0" font-family="monospace" font-size="12">⟨ S1;S2 , σ ⟩</text>
  <line x1="200" y1="62" x2="250" y2="62" stroke="#64ffda" stroke-width="2"/>
  <polygon points="250,62 240,57 240,67" fill="#64ffda"/>
  <rect x="255" y="45" width="180" height="34" fill="#16213e" stroke="#0f3460" rx="4"/>
  <text x="265" y="67" fill="#e0e0e0" font-family="monospace" font-size="12">⟨ S2 , σ′ ⟩</text>
  <line x1="435" y1="62" x2="485" y2="62" stroke="#64ffda" stroke-width="2"/>
  <polygon points="485,62 475,57 475,67" fill="#64ffda"/>
  <rect x="490" y="45" width="150" height="34" fill="#16213e" stroke="#0f3460" rx="4"/>
  <text x="500" y="67" fill="#e0e0e0" font-family="monospace" font-size="12">σ″</text>
  <text x="20" y="105" fill="#a0a0a0" font-family="monospace" font-size="12">each → is one rule; intermediate states σ′ are visible</text>
  <text x="20" y="150" fill="#64ffda" font-family="monospace" font-size="14">Big-step: one judgment for the whole evaluation</text>
  <rect x="20" y="167" width="300" height="34" fill="#16213e" stroke="#ffd93d" rx="4"/>
  <text x="30" y="189" fill="#ffd93d" font-family="monospace" font-size="12">σ ⊢ S1;S2 ⇓ σ″</text>
  <text x="340" y="189" fill="#a0a0a0" font-family="monospace" font-size="12">no intermediate states — result only</text>
  <text x="20" y="228" fill="#a0a0a0" font-family="monospace" font-size="12">Small-step suits concurrency and nontermination; big-step suits termination proofs.</text>
</svg>

The three approaches are equivalent in expressive power for sequential programs but differ in what they make easy to reason about: operational → execution traces; denotational → algebraic laws; axiomatic → correctness proofs.

**Authoritative source**: [The Formal Semantics of Programming Languages (Winskel, 1993)](https://mitpress.mit.edu/9780262731549/the-formal-semantics-of-programming-languages/).

<details><summary>Example problem</summary>

Write the small-step trace of $`x := 0;\; \text{while } (x < 2) \text{ do } x := x + 1` from the empty state, down to the first three transitions and the final state.

<details><summary>Solution</summary>

$`\langle x := 0;\; \text{while } x < 2 \text{ do } x := x + 1,\; \{\} \rangle`<br>
$`\to \langle \text{while } x < 2 \text{ do } x := x + 1,\; \{x \mapsto 0\} \rangle` (assignment axiom)<br>
$`\to \langle x := x + 1;\; \text{while } x < 2 \text{ do } x := x + 1,\; \{x \mapsto 0\} \rangle` (while unrolls when the guard holds)<br>
$`\to \langle \text{while } x < 2 \text{ do } x := x + 1,\; \{x \mapsto 1\} \rangle` (assignment; the `skip` after the unrolled body is elided)<br>
$`\to \langle x := x + 1;\; \text{while } \ldots,\; \{x \mapsto 1\} \rangle \to \langle \text{while } \ldots,\; \{x \mapsto 2\} \rangle`<br>
Now the guard $`x < 2` is false, so the while rule yields `skip`, and $`\langle \text{skip}, \{x \mapsto 2\} \rangle \to \{x \mapsto 2\}`. Final state: $`\{x \mapsto 2\}`.

</details>
</details>

</details>

The interactive simulation below steps through a `for` loop's phases (init, condition, body, update) and shows how two closures share one environment cell — the concrete counterpart of the sequencing and closure sections above.

<iframe src="./Control-Flow-and-Semantics.simulation.html" title="Loop execution and closure capture visualization"></iframe>

## Quiz

<details><summary>Quiz</summary>

**Problem**: Explain why the following JavaScript code prints `3, 3, 3` and not `0, 1, 2`:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

<details><summary>Solution</summary>

The code prints `3, 3, 3` because `var` is function-scoped (not block-scoped). All three closures capture the *same* binding of `i`. By the time the `setTimeout` callbacks execute (after 100 ms), the loop has already finished and `i === 3`.

In the terms of the [Variables, scope, and closures](#variables-scope-and-closures) section: the `var` binding creates **one environment cell** for the entire function scope, so all three closures capture that same cell; `let` creates a **fresh cell per block iteration**, so each closure captures its own. The loop's `update` statement ($`i{+}{+}`) is an assignment $`\sigma[i := v]` on that shared cell — exactly the state-update semantics of the [sequencing section](#sequencing-state-and-assignment) — and each callback reads the cell only after the loop has written 3 into it.

To print `0, 1, 2`, use `let` (block-scoped): each iteration creates a new binding for `i`, and each closure captures its own copy:

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// prints 0, 1, 2
```

Or use an IIFE to create a new scope per iteration:

```javascript
for (var i = 0; i < 3; i++) {
  (function(j) { setTimeout(() => console.log(j), 100); })(i);
}
// prints 0, 1, 2
```

</details>
</details>
