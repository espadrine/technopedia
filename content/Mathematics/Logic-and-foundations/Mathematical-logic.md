# Mathematical logic

Mathematical logic is the formal study of reasoning itself: it defines precise languages, precise notions of truth, and precise notions of proof, and then studies the relationship between truth and proof. It is the meta-discipline that underlies every other class of [Logic and foundations](./Readme.md).

> **Authoritative sources**
> - [K. Gödel (1931), Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I](https://doi.org/10.1007/BF01700692)
> - [Stanford Encyclopedia of Philosophy: Gödel's Incompleteness Theorems](https://plato.stanford.edu/entries/goedel-incompleteness/)
> - [Stanford Encyclopedia of Philosophy: Model Theory](https://plato.stanford.edu/entries/model-theory/)
> - [Stanford Encyclopedia of Philosophy: The Completeness Theorem](https://plato.stanford.edu/entries/completeness-theorem/)
> - [Stanford Encyclopedia of Philosophy: The Compactness Theorem](https://plato.stanford.edu/entries/compactness-theorem/)
> - [A. Tarski (1933), Der Wahrheitsbegriff in den formalisierten Sprachen](https://plato.stanford.edu/entries/tarski-truth/)
> - [G. Gentzen (1936), Über die Zulässigkeit der Cut-Elimination](https://plato.stanford.edu/entries/gentzen/)

## Propositional and predicate logic

The starting point is a **language**: a set of symbols with a grammar for **well-formed formulas (wffs)**. **Propositional logic** builds formulas from atomic propositions using **connectives** ($`\wedge` and, $`\vee` or, $`\neg` not, $`\to` implication, $`\leftrightarrow` biconditional). **Predicate (first-order) logic** adds **variables**, **function symbols**, **predicate symbols**, and the **quantifiers** $`\forall` (for all) and $`\exists` (there exists), so formulas can talk about the internal structure of objects.

<details><summary>Details</summary>

**Step 1 — Why formalize?** Natural-language arguments are ambiguous: "some", "and", "if" shift meaning with context. A formal language removes the ambiguity. A formula is a finite string of symbols, and "provable" becomes a precise, mechanically checkable relation. This is the foundation every later section builds on.

**Step 2 — Propositional connectives.** Each connective has a fixed truth function. The **truth table** below lists the value of a compound formula for every assignment of truth values to its atoms. A formula true on every row is a **tautology** (valid); one false on every row is a **contradiction**.

<table>
<tr><th>P</th><th>Q</th><th>¬P</th><th>P ∧ Q</th><th>P ∨ Q</th><th>P → Q</th></tr>
<tr><td>T</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>T</td><td>F</td><td>F</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>F</td><td>T</td><td>T</td><td>F</td><td>T</td><td>T</td></tr>
<tr><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td><td>T</td></tr>
</table>

Note that $`P \to Q` is false only when $`P` is true and $`Q` is false — this is why "if it rains, the ground is wet" is not falsified by a dry day with no rain.

**Step 3 — Quantifiers.** First-order logic lets a formula bind variables. $`\forall x\, P(x)` says every object satisfies $`P`; $`\exists x\, P(x)` says at least one does. Quantifiers have **scope** (the formula they bind) and interact: $`\forall x\, \exists y\, R(x,y)` ("everyone has a friend") is not the same as $`\exists y\, \forall x\, R(x,y)` ("there is one friend of everyone").

**Step 4 — From formulas to truth.** A propositional formula is evaluated by a **valuation** (an assignment of T/F to atoms). A first-order formula is evaluated by a **structure** (the next section). This split — syntax (the formula) versus semantics (its truth) — is the axis the whole field turns on.

> **Authoritative sources**
> - [Stanford Encyclopedia of Philosophy: Propositional Logic](https://plato.stanford.edu/entries/logic-propositional/)
> - [Stanford Encyclopedia of Philosophy: First-Order Logic](https://plato.stanford.edu/entries/logic-firstorder/)

<details><summary>Example problem</summary>

Is $`(P \to Q) \wedge (P \to \neg Q)` a contradiction?

<details><summary>Solution</summary>

Work through the truth table. The formula is true only when both implications hold. If $`P` is false, both implications are vacuously true, so the conjunction is true. If $`P` is true, then $`Q` and $`\neg Q` must both be true, which is impossible. So the formula is true exactly when $`P` is false — it is **not** a contradiction (it is satisfiable).
</details>
</details>
</details>

## Formal systems

A **formal system** is a set of symbols, a grammar for well-formed formulas, a set of **axioms**, and **inference rules**. A **proof** is a finite sequence of formulas where each is an axiom or follows from earlier ones by an inference rule. Nothing in a formal proof depends on meaning: it is pure symbol manipulation, which is what makes proofs checkable by machine.

<details><summary>Details</summary>

**Step 1 — The four ingredients.** A formal system is fully specified by (i) an **alphabet** of symbols, (ii) a **grammar** deciding which strings are well-formed formulas, (iii) a set of **axioms** (wffs taken as true without proof), and (iv) **inference rules** (patterns that turn earlier formulas into new ones). For example, modus ponens is the rule: from $`A` and $`A \to B` infer $`B`.

**Step 2 — A proof is a tree of rule applications.** Each formula in a proof cites either an axiom or a rule applied to earlier lines. Because every step is a local, checkable pattern, a whole proof can be verified by a machine that never "understands" the content.

The parse tree of the wff $`(P \wedge (Q \to R))` shows how the grammar recursively builds a formula from its subformulas:

<svg viewBox="0 0 420 240" width="420" height="240" role="img" aria-label="Parse tree of (P and (Q implies R))">
  <defs>
    <marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8892a6"/></marker>
  </defs>
  <line x1="210" y1="46" x2="110" y2="118" stroke="#8892a6" stroke-width="2" marker-end="url(#arw)"/>
  <line x1="210" y1="46" x2="310" y2="118" stroke="#8892a6" stroke-width="2" marker-end="url(#arw)"/>
  <line x1="310" y1="134" x2="250" y2="200" stroke="#8892a6" stroke-width="2" marker-end="url(#arw)"/>
  <line x1="310" y1="134" x2="370" y2="200" stroke="#8892a6" stroke-width="2" marker-end="url(#arw)"/>
  <g font-family="ui-monospace, Menlo, monospace" font-size="18" text-anchor="middle">
    <circle cx="210" cy="34" r="20" fill="#e7f0ff" stroke="#1a56db" stroke-width="2"/><text x="210" y="40" fill="#1a56db">∧</text>
    <circle cx="110" cy="130" r="20" fill="#fff" stroke="#8892a6" stroke-width="2"/><text x="110" y="136" fill="#223">P</text>
    <circle cx="310" cy="130" r="20" fill="#e7f0ff" stroke="#1a56db" stroke-width="2"/><text x="310" y="136" fill="#1a56db">→</text>
    <circle cx="250" cy="212" r="20" fill="#fff" stroke="#8892a6" stroke-width="2"/><text x="250" y="218" fill="#223">Q</text>
    <circle cx="370" cy="212" r="20" fill="#fff" stroke="#8892a6" stroke-width="2"/><text x="370" y="218" fill="#223">R</text>
  </g>
</svg>

The root is the outermost connective; leaves are the atomic propositions. The tree is what a parser produces and what a proof checker walks.

**Step 3 — Provability is decidable.** Given a formal system and a formula, "is there a proof of this formula?" is a well-defined question: enumerate all finite strings and check each for being a valid proof. This decidability of *proof checking* (as opposed to *finding* proofs) is what makes formal systems the substrate for machine-checked mathematics.

> **Authoritative sources**
> - [Stanford Encyclopedia of Philosophy: Formalism](https://plato.stanford.edu/entries/formalism/)

<details><summary>Example problem</summary>

In a system with axiom $`P \to Q` and rule modus ponens, is $`Q` provable from the single assumption $`P`?

<details><summary>Solution</summary>

Yes. Line 1: $`P` (assumption). Line 2: $`P \to Q` (axiom). Line 3: $`Q` (modus ponens on lines 1 and 2). A three-line proof exists, so $`Q` is provable.
</details>
</details>
</details>

## Semantics and model theory

**Model theory** gives the formal language meaning. A **structure** (or model) interprets the symbols of a language over a set; a formula is **satisfied** by a structure when it is true under that interpretation. Three central results:

- **Gödel's completeness theorem**: a formula is provable from a set of axioms if and only if it is true in every model of those axioms. Syntax and semantics coincide for first-order logic.
- **Compactness theorem**: if every finite subset of a set of axioms has a model, the whole set has a model. Consequence: first-order logic cannot pin down the natural numbers up to isomorphism (non-standard models exist).
- **Löwenheim–Skolem theorem**: if a first-order theory has an infinite model, it has models of every infinite cardinality. First-order logic cannot control the size of its models.

<details><summary>Details</summary>

**Step 1 — What a structure is.** A structure for a language $`\mathcal{L}` is a set $`D` (the **domain**) together with an interpretation of every symbol: each constant is an element of $`D`, each $`n`-ary function is a map $`D^n \to D`, each $`n`-ary predicate is a subset of $`D^n`. The diagram below shows a structure with domain $`\{a, b, c\}`, a constant $`c`, a unary function $`f`, and a unary predicate $`P`:

<svg viewBox="0 0 460 250" width="460" height="250" role="img" aria-label="A structure interpreting a language over a three-element domain">
  <rect x="20" y="20" width="420" height="210" rx="10" fill="#f4f7fb" stroke="#b9c2d0" stroke-width="2"/>
  <text x="36" y="46" font-family="system-ui, sans-serif" font-size="14" fill="#445">domain D = {a, b, c}</text>
  <g font-family="ui-monospace, Menlo, monospace" font-size="20" text-anchor="middle">
    <circle cx="110" cy="120" r="26" fill="#d3f9d8" stroke="#2f9e44" stroke-width="2"/><text x="110" y="127" fill="#223">a</text>
    <circle cx="230" cy="120" r="26" fill="#fff" stroke="#8892a6" stroke-width="2"/><text x="230" y="127" fill="#223">b</text>
    <circle cx="350" cy="120" r="26" fill="#d3f9d8" stroke="#2f9e44" stroke-width="2"/><text x="350" y="127" fill="#223">c</text>
  </g>
  <defs><marker id="arw2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a56db"/></marker></defs>
  <path d="M230,146 Q230,190 118,146" fill="none" stroke="#1a56db" stroke-width="2" marker-end="url(#arw2)"/>
  <path d="M350,146 Q350,190 238,146" fill="none" stroke="#1a56db" stroke-width="2" marker-end="url(#arw2)"/>
  <path d="M110,146 Q110,190 342,146" fill="none" stroke="#1a56db" stroke-width="2" marker-end="url(#arw2)"/>
  <text x="230" y="212" font-family="ui-monospace, Menlo, monospace" font-size="14" fill="#1a56db" text-anchor="middle">f: a→b, b→c, c→a</text>
  <text x="36" y="222" font-family="ui-monospace, Menlo, monospace" font-size="14" fill="#2f9e44">P = {a, c}   (green = in P)</text>
</svg>

Here $`P` is true of $`a` and $`c` (green) and false of $`b`; the function $`f` cycles the three elements.

**Step 2 — Satisfaction.** A formula is **satisfied** by a structure (written $`\mathcal{M} \models \varphi`) when it is true under the interpretation. Atomic facts are read off directly: $`\mathcal{M} \models P(a)` because $`a \in P`. Compound formulas are evaluated recursively, and quantifiers range over the domain: $`\mathcal{M} \models \forall x\, P(x)` holds only if every element of $`D` is in $`P` — false here, since $`b \notin P`.

**Step 3 — Completeness.** Gödel's completeness theorem says provability and universal truth coincide for first-order logic: $`\Gamma \vdash \varphi` iff $`\Gamma \models \varphi`. This is deep and non-obvious; for second-order logic the two notions *diverge* (there are valid second-order sentences with no effective proof).

**Step 4 — Compactness and Löwenheim–Skolem.** Compactness says truth is "local": if every finite piece of a theory is satisfiable, so is the whole theory. Löwenheim–Skolem says first-order logic cannot fix the size of a model: any theory with an infinite model has models of every infinite cardinality. Together they explain why first-order logic cannot characterize the natural numbers up to isomorphism — non-standard, and arbitrarily large, models always exist.

> **Authoritative sources**
> - [A. Tarski (1933), Der Wahrheitsbegriff in den formalisierten Sprachen](https://plato.stanford.edu/entries/tarski-truth/)
> - [Stanford Encyclopedia of Philosophy: Model Theory](https://plato.stanford.edu/entries/model-theory/)
> - [Stanford Encyclopedia of Philosophy: The Completeness Theorem](https://plato.stanford.edu/entries/completeness-theorem/)
> - [Stanford Encyclopedia of Philosophy: The Compactness Theorem](https://plato.stanford.edu/entries/compactness-theorem/)

<details><summary>Example problem</summary>

In the structure above, is $`\exists x\, (P(x) \wedge f(x) \notin P)` satisfied?

<details><summary>Solution</summary>

Check each element. $`f(a) = b` and $`b \notin P`, while $`a \in P`. So $`x = a` witnesses the formula: $`P(a)` holds and $`f(a) = b` is not in $`P`. The formula is satisfied.
</details>
</details>
</details>

<iframe src="./Mathematical-logic.simulation.html" title="Interactive first-order model checker: pick a structure and see which formulas it satisfies"></iframe>

## Proof theory

**Proof theory** studies proofs as mathematical objects. Its central technique is **cut elimination** (Gentzen): every proof using lemmas can be mechanically transformed into a direct, lemma-free proof. Consequences include **consistency proofs** (Gentzen proved the consistency of arithmetic using transfinite induction up to the ordinal $`\varepsilon_0`) and **ordinal analysis**, which measures the strength of a theory by the ordinal needed to prove its consistency.

<details><summary>Details</summary>

**Step 1 — Proofs as objects.** In proof theory a proof is a tree whose leaves are axioms and whose internal nodes are rule applications. The **cut rule** lets you reason through a lemma $`L`: from $`A \vdash L` and $`L \vdash C` infer $`A \vdash C`. Cuts make proofs short and readable, but they introduce an intermediate formula $`L` that is not forced by the conclusion.

**Step 2 — Cut elimination.** Gentzen's theorem says every proof can be transformed, by a mechanical procedure, into an equivalent proof with no cuts. The animation below shows a proof that goes through a lemma $`L` (a cut) being rewritten into a direct proof that reaches $`C` without it:

<div id="cutdemo" style="font-family:ui-monospace, Menlo, monospace; font-size:14px; background:#fff; border:1px solid #d5dbe5; border-radius:8px; padding:14px; max-width:520px;">
  <div id="cutstate" style="line-height:1.9; white-space:pre;"></div>
  <div style="margin-top:12px;">
    <button id="cutbtn" style="font:inherit; font-size:13px; padding:7px 12px; border:1px solid #1a56db; background:#1a56db; color:#fff; border-radius:8px; cursor:pointer;">Eliminate the cut →</button>
    <button id="cutreset" style="font:inherit; font-size:13px; padding:7px 12px; border:1px solid #b9c2d0; background:#fff; border-radius:8px; cursor:pointer;">Reset</button>
  </div>
  <div id="cutmsg" style="font-family:system-ui, sans-serif; font-size:13px; color:#556; margin-top:10px; line-height:1.5;"></div>
</div>

<script>
(function () {
  var states = [
    {
      tree: "  A ⊢ L        L ⊢ C\n  ───────────────────── (cut)\n  A ⊢ C",
      msg: "This proof uses a <b>cut</b> through the lemma L: it proves A ⊢ L and L ⊢ C separately, then glues them. The conclusion A ⊢ C is reached only via the intermediate L."
    },
    {
      tree: "  A ⊢ L        L ⊢ C\n  ─────────────────────\n  (inline the subproof of L)\n  A ⊢ C",
      msg: "Cut elimination <b>inlines</b> the subproof that produced L into the second branch, so the proof no longer needs L as a separate lemma."
    },
    {
      tree: "  A ⊢ C\n  (direct: every step is an\n   axiom or a local rule)",
      msg: "The result is a <b>direct</b> proof of A ⊢ C with no cut. It is longer but uses only the axioms and local rules — this is the <b>subformula property</b>: only subformulas of the conclusion appear."
    }
  ];
  var i = 0;
  var tree = document.getElementById('cutstate');
  var msg = document.getElementById('cutmsg');
  function show() { tree.textContent = states[i].tree; msg.innerHTML = states[i].msg; }
  document.getElementById('cutbtn').addEventListener('click', function () { if (i < states.length - 1) { i++; show(); } });
  document.getElementById('cutreset').addEventListener('click', function () { i = 0; show(); });
  show();
})();
</script>

**Step 3 — Why it matters.** Cut elimination yields the **subformula property** (only subformulas of the conclusion occur in the proof), which in turn gives **consistency proofs**: a consistent logic cannot prove a contradiction, because a cut-free proof of $`A \wedge \neg A` would have to contain both $`A` and $`\neg A` as subformulas of the conclusion in an impossible way. Gentzen used a transfinite version of this argument, indexed by ordinals below $`\varepsilon_0`, to prove the consistency of Peano arithmetic — a result that cannot be proved inside the system itself (by the second incompleteness theorem).

> **Authoritative sources**
> - [G. Gentzen (1936), Über die Zulässigkeit der Cut-Elimination](https://plato.stanford.edu/entries/gentzen/)
> - [Stanford Encyclopedia of Philosophy: Gentzen's Proof Theory](https://plato.stanford.edu/entries/gentzen/)

<details><summary>Example problem</summary>

A cut-free proof of $`P \to Q` in propositional logic may contain which formulas as subformulas?

<details><summary>Solution</summary>

By the subformula property, only subformulas of the conclusion $`P \to Q` may appear: namely $`P \to Q`, $`P`, and $`Q`. No other formula (for instance $`R` or $`P \wedge Q`) can occur anywhere in a cut-free proof of $`P \to Q`.
</details>
</details>
</details>

## Incompleteness

Gödel's **incompleteness theorems** (1931) are the landmark results of the field:

1. Any consistent, effectively axiomatized theory strong enough to express arithmetic is **incomplete**: some true statement in its language is unprovable.
2. Such a theory cannot prove its own consistency.

The proofs use computability techniques (encoding statements about provability inside arithmetic itself) — see [Computability and decidability](./Computability-and-decidability.md) for the machinery of arithmetization and the halting problem. The theorems are statements about formal systems, so they belong to Mathematical logic; the computability angle is the proof technique and the interpretive lens.

<details><summary>Details</summary>

**Step 1 — Arithmetization.** The key move is to encode syntax as arithmetic. Every formula and proof is assigned a natural number (its **Gödel number**), and "x is the Gödel number of a proof of y" becomes an ordinary, primitive-recursive relation on natural numbers. This is where the [Computability and decidability](./Computability-and-decidability.md) machinery enters: provability is a computable (indeed decidable) relation.

The construction of the Gödel sentence proceeds in stages:

<svg viewBox="0 0 520 300" width="520" height="300" role="img" aria-label="Gödel sentence construction: arithmetization to self-reference">
  <defs><marker id="arw3" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#8892a6"/></marker></defs>
  <g font-family="system-ui, sans-serif" font-size="13">
    <rect x="30" y="20" width="460" height="52" rx="8" fill="#e7f0ff" stroke="#1a56db" stroke-width="2"/>
    <text x="46" y="42" fill="#1a56db" font-weight="700">1. Arithmetization</text>
    <text x="46" y="60" fill="#334">each formula φ gets a Gödel number ⌜φ⌝ ∈ ℕ</text>
    <line x1="260" y1="72" x2="260" y2="92" stroke="#8892a6" stroke-width="2" marker-end="url(#arw3)"/>
    <rect x="30" y="94" width="460" height="52" rx="8" fill="#e7f0ff" stroke="#1a56db" stroke-width="2"/>
    <text x="46" y="116" fill="#1a56db" font-weight="700">2. Provability predicate</text>
    <text x="46" y="134" fill="#334">Prov_T(x): "x is the number of a T-proof of ⌜x⌝" — a formula of arithmetic</text>
    <line x1="260" y1="146" x2="260" y2="166" stroke="#8892a6" stroke-width="2" marker-end="url(#arw3)"/>
    <rect x="30" y="168" width="460" height="52" rx="8" fill="#fff3bf" stroke="#e8a000" stroke-width="2"/>
    <text x="46" y="190" fill="#b07d00" font-weight="700">3. Diagonal lemma</text>
    <text x="46" y="208" fill="#334">there is a sentence G with T ⊢ G ↔ ¬Prov_T(⌜G⌝)</text>
    <line x1="260" y1="220" x2="260" y2="240" stroke="#8892a6" stroke-width="2" marker-end="url(#arw3)"/>
    <rect x="30" y="242" width="460" height="46" rx="8" fill="#d3f9d8" stroke="#2f9e44" stroke-width="2"/>
    <text x="46" y="270" fill="#2b8a3e" font-weight="700">G says of itself: "G is not provable in T"</text>
  </g>
</svg>

**Step 2 — The Gödel sentence.** The **diagonal lemma** guarantees a sentence $`G` such that the theory proves $`G \leftrightarrow \neg \mathrm{Prov}_T(\ulcorner G\urcorner)` — that is, $`G` asserts its own unprovability. If $`T` proved $`G`, then $`\mathrm{Prov}_T(\ulcorner G\urcorner)` would be true, contradicting $`G`; so a consistent $`T` does not prove $`G`. But then $`\neg \mathrm{Prov}_T(\ulcorner G\urcorner)` is true, so $`G` is true. Hence $`G` is true but unprovable: the first incompleteness theorem.

**Step 3 — The second theorem.** Let $`\mathrm{Con}(T)` be the arithmetical sentence asserting that no proof of a contradiction exists. If $`T` proved $`\mathrm{Con}(T)`, one could build a sentence that is provable exactly when $`T` is inconsistent, and the first theorem applied to it would force $`T` to be inconsistent. So a consistent $`T` cannot prove its own consistency.

**Step 4 — What it means in practice.** Incompleteness does not make mathematics unusable: it bounds what any single fixed axiom system can capture, and it explains why proof assistants and set theorists sometimes need new axioms (such as large cardinals) to settle independent statements like the continuum hypothesis.

> **Authoritative sources**
> - [K. Gödel (1931), Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I](https://doi.org/10.1007/BF01700692)
> - [Stanford Encyclopedia of Philosophy: Gödel's Incompleteness Theorems](https://plato.stanford.edu/entries/goedel-incompleteness/)
> - [Stanford Encyclopedia of Philosophy: The Diagonal Lemma](https://plato.stanford.edu/entries/diagonal-lemma/)

<details><summary>Example problem</summary>

Is the statement "this sentence is not provable in Peano Arithmetic" a well-formed arithmetic sentence?

<details><summary>Solution</summary>

Yes — Gödel's arithmetization encodes provability as a primitive-recursive relation between formula numbers, so the sentence is an ordinary statement about natural numbers, which is what makes the construction work inside arithmetic.
</details>
</details>
</details>

## Quizz

<details><summary>Try it yourself</summary>

**Problem.** A first-order theory $`T` has a model whose domain has exactly 5 elements. By which of the three central results of model theory (completeness, compactness, Löwenheim–Skolem) can you conclude that $`T` also has a model with infinitely many elements? State the reasoning in one or two sentences.

<details><summary>How to solve it</summary>

Use the **Löwenheim–Skolem theorem**. It says that if a first-order theory has an infinite model, it has models of every infinite cardinality — and, in its upward form, that any theory with a model has a model of any larger cardinality. Since $`T` has a 5-element model, the upward Löwenheim–Skolem theorem gives a model of $`T` with infinitely many elements. (Completeness and compactness do not by themselves control the size of models, so they are not the right tools here.)
</details>
</details>
