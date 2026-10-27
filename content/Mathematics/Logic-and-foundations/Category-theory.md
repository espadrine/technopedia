# Category theory

Category theory is the study of mathematical structure through **objects** and **morphisms** (structure-preserving maps) between them, abstracted away from what the objects are made of. It is relevant whenever you want to state a construction once and for all across many fields — products, "free" constructions, duality, and limits all have a single categorical form — and it is the native language of modern algebra, homotopy type theory, and the semantics of programming languages.

> **Authoritative sources**
> - [S. Eilenberg & S. Mac Lane, General Theory of Natural Equivalences (1945)](https://www.jstor.org/stable/1990284) — where category, functor, and natural transformation were first defined
> - [S. Mac Lane, Categories for the Working Mathematician](https://doi.org/10.1007/978-1-4757-4721-8)
> - [nLab: category theory](https://ncatlab.org/nlab/show/category+theory)

## Category

**Definition.** A **category** $`\mathcal{C}` consists of:

- a collection of **objects**;
- for each pair of objects $`A, B`, a set of **morphisms** $`\mathrm{Hom}(A, B)`, written $`f: A \to B`;
- a **composition** operation $`g \circ f` whenever $`f: A \to B` and $`g: B \to C`;
- an **identity** morphism $`\mathrm{id}_A: A \to A` for each object $`A`;

such that composition is **associative** ($`(h \circ g) \circ f = h \circ (g \circ f)`) and each identity acts as a unit ($`\mathrm{id}_B \circ f = f = f \circ \mathrm{id}_A`).

<details><summary>Details</summary>

A category abstracts the pattern "things, and arrows between them." The only rules are that arrows compose, that composition is associative, and that each object has a do-nothing identity arrow. What the objects *are* and what the arrows *do* is deliberately left unspecified — that is the whole point. The same definition covers sets and functions, groups and homomorphisms, topological spaces and continuous maps, and propositions and proofs (see [Type theory](../Type-theory.md)).

**Example.** The category **Set**: objects are sets, morphisms are functions, composition is function composition, and the identity is the identity function. All the axioms are just the familiar facts about composing functions.

The diagram below shows the two axioms at once: the composite $`g \circ f` is the arrow you get by going $`A \to B \to C`, and each object carries an identity loop.

<svg viewBox="0 0 460 200" width="460" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Composition and identity in a category">
  <defs><marker id="carr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#334"/></marker></defs>
  <g font-family="sans-serif" font-size="18" fill="#222" text-anchor="middle">
    <circle cx="80" cy="90" r="26" fill="#cfe3ff" stroke="#1a56db" stroke-width="2"/><text x="80" y="96">A</text>
    <circle cx="230" cy="90" r="26" fill="#d7f5e3" stroke="#0f7a3d" stroke-width="2"/><text x="230" y="96">B</text>
    <circle cx="380" cy="90" r="26" fill="#ffe0e0" stroke="#c0392b" stroke-width="2"/><text x="380" y="96">C</text>
  </g>
  <g stroke="#334" stroke-width="2" fill="none" marker-end="url(#carr)">
    <line x1="106" y1="90" x2="204" y2="90"/>
    <line x1="256" y1="90" x2="354" y2="90"/>
  </g>
  <text x="150" y="80" font-family="sans-serif" font-size="15" fill="#334">f</text>
  <text x="300" y="80" font-family="sans-serif" font-size="15" fill="#334">g</text>
  <path d="M 80 116 Q 230 190 380 116" stroke="#c2410c" stroke-width="2" fill="none" marker-end="url(#carr)"/>
  <text x="230" y="178" font-family="sans-serif" font-size="15" fill="#c2410c" text-anchor="middle">g ∘ f</text>
  <g stroke="#555" stroke-width="1.5" fill="none" marker-end="url(#carr)">
    <path d="M 80 40 a 10 10 0 1 0 0.1 0"/>
    <path d="M 230 40 a 10 10 0 1 0 0.1 0"/>
    <path d="M 380 40 a 10 10 0 1 0 0.1 0"/>
  </g>
  <text x="80" y="24" font-family="sans-serif" font-size="12" fill="#555" text-anchor="middle">id_A</text>
  <text x="230" y="24" font-family="sans-serif" font-size="12" fill="#555" text-anchor="middle">id_B</text>
  <text x="380" y="24" font-family="sans-serif" font-size="12" fill="#555" text-anchor="middle">id_C</text>
</svg>

> **Authoritative sources**
> - [S. Mac Lane, Categories for the Working Mathematician, Ch. I](https://doi.org/10.1007/978-1-4757-4721-8)

<details><summary>Example problem</summary>

Consider the "category" whose objects are the natural numbers and which has exactly one morphism $`m \to n` if and only if $`m \le n`. Show it is a category.

<details><summary>Solution</summary>

Composition: if $`m \le n` and $`n \le p` then $`m \le p`, and there is exactly one morphism $`m \to p`, so the composite is forced and well-defined. Identity: $`m \le m`, so $`\mathrm{id}_m` exists. Associativity holds automatically because between any two comparable objects there is at most one morphism, so the two ways of composing are the same unique arrow.
</details>

</details>

</details>

## Functor

**Definition.** A **functor** $`F: \mathcal{C} \to \mathcal{D}` assigns to each object $`A` of $`\mathcal{C}` an object $`F(A)` of $`\mathcal{D}`, and to each morphism $`f: A \to B` a morphism $`F(f): F(A) \to F(B)`, preserving composition and identities:

```math
F(g \circ f) = F(g) \circ F(f), \qquad F(\mathrm{id}_A) = \mathrm{id}_{F(A)}
```

<details><summary>Details</summary>

A functor is the "structure-preserving map between structures" of category theory — the homomorphism, but one level up. It sends an entire category (objects *and* arrows) to another, in a way that respects how the arrows fit together.

**Example.** The **free group functor** $`\mathrm{Free}: \mathbf{Set} \to \mathbf{Grp}` sends a set $`S` to the free group on $`S`, and a function $`f: S \to T` to the unique group homomorphism $`\mathrm{Free}(S) \to \mathrm{Free}(T)` that extends $`f`. Because extending a function to a homomorphism is unique, composition and identities are preserved automatically.

The diagram below shows a functor $`F` carrying the small category on the left (objects $`A, B`, arrow $`f`) to the category on the right (objects $`F(A), F(B)`, arrow $`F(f)`). The dashed arrows record what $`F` does to each piece.

<svg viewBox="0 0 520 200" width="520" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A functor mapping one category to another">
  <defs><marker id="farr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#334"/></marker></defs>
  <rect x="20" y="20" width="200" height="160" fill="#f7f9fc" stroke="#999" stroke-dasharray="4 3"/>
  <text x="30" y="40" font-family="sans-serif" font-size="15" fill="#555">C</text>
  <rect x="300" y="20" width="200" height="160" fill="#f7f9fc" stroke="#999" stroke-dasharray="4 3"/>
  <text x="310" y="40" font-family="sans-serif" font-size="15" fill="#555">D</text>
  <g font-family="sans-serif" font-size="16" fill="#222" text-anchor="middle">
    <circle cx="75" cy="110" r="22" fill="#cfe3ff" stroke="#1a56db" stroke-width="2"/><text x="75" y="115">A</text>
    <circle cx="175" cy="110" r="22" fill="#d7f5e3" stroke="#0f7a3d" stroke-width="2"/><text x="175" y="115">B</text>
    <circle cx="355" cy="110" r="22" fill="#cfe3ff" stroke="#1a56db" stroke-width="2"/><text x="355" y="115">F(A)</text>
    <circle cx="455" cy="110" r="22" fill="#d7f5e3" stroke="#0f7a3d" stroke-width="2"/><text x="455" y="115">F(B)</text>
  </g>
  <g stroke="#334" stroke-width="2" fill="none" marker-end="url(#farr)">
    <line x1="97" y1="110" x2="153" y2="110"/>
    <line x1="377" y1="110" x2="433" y2="110"/>
  </g>
  <text x="125" y="100" font-family="sans-serif" font-size="14" fill="#334" text-anchor="middle">f</text>
  <text x="405" y="100" font-family="sans-serif" font-size="14" fill="#334" text-anchor="middle">F(f)</text>
  <g stroke="#c2410c" stroke-width="1.5" stroke-dasharray="5 4" fill="none" marker-end="url(#farr)">
    <line x1="97" y1="98" x2="333" y2="98"/>
    <line x1="197" y1="122" x2="433" y2="122"/>
  </g>
  <text x="215" y="185" font-family="sans-serif" font-size="13" fill="#c2410c" text-anchor="middle">F sends objects to objects and arrows to arrows</text>
</svg>

> **Authoritative sources**
> - [S. Mac Lane, Categories for the Working Mathematician, Ch. I](https://doi.org/10.1007/978-1-4757-4721-8)

<details><summary>Example problem</summary>

The **power-set functor** $`\mathcal{P}: \mathbf{Set} \to \mathbf{Set}` sends a set $`S` to its power set $`\mathcal{P}(S)`, and a function $`f: S \to T` to the map $`\mathcal{P}(f): \mathcal{P}(S) \to \mathcal{P}(T)` given by $`\mathcal{P}(f)(X) = f(X)`. Verify that $`\mathcal{P}` is a functor.

<details><summary>Solution</summary>

For $`f: S \to T` and $`g: T \to U`, $`\mathcal{P}(g \circ f)(X) = (g \circ f)(X) = g(f(X)) = \mathcal{P}(g)(\mathcal{P}(f)(X))`, so composition is preserved. And $`\mathcal{P}(\mathrm{id}_S)(X) = \mathrm{id}_S(X) = X`, so $`\mathcal{P}(\mathrm{id}_S) = \mathrm{id}_{\mathcal{P}(S)}`. Both functor laws hold.
</details>

</details>

</details>

## Natural transformation

**Definition.** A **natural transformation** $`\alpha: F \Rightarrow G` between functors $`F, G: \mathcal{C} \to \mathcal{D}` is a family of morphisms $`\alpha_A: F(A) \to G(A)` (one for each object $`A`) such that for every morphism $`f: A \to B` the **naturality square** commutes:

```math
G(f) \circ \alpha_A = \alpha_B \circ F(f)
```

<details><summary>Details</summary>

A natural transformation is a "map between functors": a coherent family of arrows, one per object, that commutes with *everything in sight*. The word "natural" means the family does not depend on any arbitrary choice — it behaves the same no matter which arrow you slide it past.

**Example.** Let $`F, G: \mathbf{Set} \to \mathbf{Set}` both send a set $`S` to $`S \times S` and a function $`f` to $`f \times f`. Define $`\alpha_S: S \times S \to S \times S` to be the **flip** $`(a, b) \mapsto (b, a)`. This is a natural transformation $`F \Rightarrow G`: for any $`f: S \to T`, both ways around the square send $`(a, b)` to $`(f(b), f(a))`.

The naturality square below is the defining condition: going across the top then down equals going down then across the bottom.

<svg viewBox="0 0 460 220" width="460" height="220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Naturality square for a natural transformation">
  <defs><marker id="narr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#334"/></marker></defs>
  <g font-family="sans-serif" font-size="17" fill="#222" text-anchor="middle">
    <circle cx="110" cy="55" r="30" fill="#cfe3ff" stroke="#1a56db" stroke-width="2"/><text x="110" y="60">F(A)</text>
    <circle cx="350" cy="55" r="30" fill="#d7f5e3" stroke="#0f7a3d" stroke-width="2"/><text x="350" y="60">F(B)</text>
    <circle cx="110" cy="165" r="30" fill="#ffe0e0" stroke="#c0392b" stroke-width="2"/><text x="110" y="170">G(A)</text>
    <circle cx="350" cy="165" r="30" fill="#fff3bf" stroke="#e8a000" stroke-width="2"/><text x="350" y="170">G(B)</text>
  </g>
  <g stroke="#334" stroke-width="2" fill="none" marker-end="url(#narr)">
    <line x1="140" y1="55" x2="320" y2="55"/>
    <line x1="140" y1="165" x2="320" y2="165"/>
    <line x1="110" y1="85" x2="110" y2="135"/>
    <line x1="350" y1="85" x2="350" y2="135"/>
  </g>
  <text x="230" y="45" font-family="sans-serif" font-size="15" fill="#334" text-anchor="middle">F(f)</text>
  <text x="230" y="185" font-family="sans-serif" font-size="15" fill="#334" text-anchor="middle">G(f)</text>
  <text x="90" y="115" font-family="sans-serif" font-size="15" fill="#c2410c" text-anchor="end">α_A</text>
  <text x="370" y="115" font-family="sans-serif" font-size="15" fill="#c2410c">α_B</text>
</svg>

The naturality condition is exactly the statement that this square commutes.

> **Authoritative sources**
> - [S. Eilenberg & S. Mac Lane, General Theory of Natural Equivalences (1945)](https://www.jstor.org/stable/1990284)

<details><summary>Example problem</summary>

Using the flip example above, verify the naturality square commutes for an arbitrary function $`f: S \to T`.

<details><summary>Solution</summary>

Here $`F(f) = G(f) = f \times f`, so $`(f \times f)(a, b) = (f(a), f(b))`. Going down then across: $`\alpha_T(f(a), f(b)) = (f(b), f(a))`. Going across then down: $`\alpha_S` applied to the flipped pair $`(f(a), f(b))` gives $`(f(b), f(a))`. Both paths yield $`(f(b), f(a))`, so the square commutes.
</details>

</details>

</details>

## Limits and universal properties

**Definition.** A **limit** of a diagram $`D: \mathcal{J} \to \mathcal{C}` is an object $`L` together with a **cone** (morphisms $`L \to D(j)` for each object $`j` of $`\mathcal{J}`) that is **universal**: for every other cone from an object $`X` there is a *unique* morphism $`X \to L` making all the triangles commute. The **product** $`A \times B` is the limit of the discrete diagram $`A, B`.

<details><summary>Details</summary>

A **universal property** characterizes an object by *how other objects map into it*, not by what it is made of. The limit is the "best" object that everything maps into: it is the unique (up to isomorphism) answer to a mapping-in problem. Products, equalizers, and pullbacks are all limits of particular diagrams.

**Example.** The product $`A \times B` of sets is the set of pairs $`(a, b)` with projections $`\pi_1: A \times B \to A` and $`\pi_2: A \times B \to B`. Given any set $`X` with maps $`f: X \to A` and $`g: X \to B`, there is a *unique* map $`h: X \to A \times B` making the triangles commute, namely $`h(x) = (f(x), g(x))`.

The cone diagram below shows the universal property: the dashed arrow $`h` is the unique map that factors the cone from $`X` through $`A \times B`.

<svg viewBox="0 0 460 250" width="460" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Universal property of the product as a limit">
  <defs><marker id="larr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#334"/></marker></defs>
  <g font-family="sans-serif" font-size="17" fill="#222" text-anchor="middle">
    <circle cx="230" cy="45" r="26" fill="#fff3bf" stroke="#e8a000" stroke-width="2"/><text x="230" y="50">X</text>
    <circle cx="110" cy="130" r="26" fill="#cfe3ff" stroke="#1a56db" stroke-width="2"/><text x="110" y="135">A</text>
    <circle cx="350" cy="130" r="26" fill="#d7f5e3" stroke="#0f7a3d" stroke-width="2"/><text x="350" y="135">B</text>
    <circle cx="230" cy="210" r="30" fill="#ffe0e0" stroke="#c0392b" stroke-width="2"/><text x="230" y="215">A×B</text>
  </g>
  <g stroke="#334" stroke-width="2" fill="none" marker-end="url(#larr)">
    <line x1="208" y1="60" x2="132" y2="115"/>
    <line x1="252" y1="60" x2="328" y2="115"/>
    <line x1="208" y1="200" x2="132" y2="145"/>
    <line x1="252" y1="200" x2="328" y2="145"/>
  </g>
  <line x1="230" y1="71" x2="230" y2="180" stroke="#c2410c" stroke-width="2" stroke-dasharray="6 4" fill="none" marker-end="url(#larr)"/>
  <text x="150" y="85" font-family="sans-serif" font-size="14" fill="#334">f</text>
  <text x="305" y="85" font-family="sans-serif" font-size="14" fill="#334">g</text>
  <text x="150" y="185" font-family="sans-serif" font-size="14" fill="#334">π₁</text>
  <text x="305" y="185" font-family="sans-serif" font-size="14" fill="#334">π₂</text>
  <text x="245" y="130" font-family="sans-serif" font-size="14" fill="#c2410c">h (unique)</text>
</svg>

> **Authoritative sources**
> - [S. Mac Lane, Categories for the Working Mathematician, Ch. II](https://doi.org/10.1007/978-1-4757-4721-8)

<details><summary>Example problem</summary>

Show that the product $`A \times B` is a limit: given a cone $`f: X \to A`, $`g: X \to B`, exhibit the unique map $`h: X \to A \times B` and check the triangles commute.

<details><summary>Solution</summary>

Define $`h(x) = (f(x), g(x))`. Then $`\pi_1 \circ h(x) = f(x)` and $`\pi_2 \circ h(x) = g(x)`, so both triangles commute. Uniqueness: any map $`h'` with $`\pi_1 \circ h' = f` and $`\pi_2 \circ h' = g` must satisfy $`h'(x) = (\pi_1 h'(x), \pi_2 h'(x)) = (f(x), g(x)) = h(x)`, so $`h' = h`.
</details>

</details>

</details>

## Adjunctions

**Definition.** An **adjunction** $`F \dashv G` between functors $`F: \mathcal{C} \to \mathcal{D}` and $`G: \mathcal{D} \to \mathcal{C}` is a natural bijection of hom-sets

```math
\mathcal{D}(F A, B) \cong \mathcal{C}(A, G B)
```

equivalently, a **unit** $`\eta: \mathrm{id}_{\mathcal{C}} \Rightarrow G F` and a **counit** $`\varepsilon: F G \Rightarrow \mathrm{id}_{\mathcal{D}}` satisfying the triangle identities. $`F` is the **left adjoint** (the "free" functor) and $`G` the **right adjoint** (the "forgetful" functor).

<details><summary>Details</summary>

An adjunction is a precise sense in which one functor is a "left inverse" of another. The left adjoint $`F` is **free**: it builds the most structure you can from a bare object. The right adjoint $`G` is **forgetful**: it strips structure away, keeping only the underlying object. The bijection above says that maps *out of* a free object are the same thing as maps *into* the underlying object — which is exactly the universal property of the free construction. Universal properties are the shadows of adjunctions.

**Example.** $`\mathrm{Free}: \mathbf{Set} \rightleftarrows \mathbf{Grp} : U`, where $`U` is the forgetful functor from groups to sets. Homomorphisms from the free group $`\mathrm{Free}(S)` to a group $`G` are in bijection with plain functions from $`S` to the underlying set of $`G` — a homomorphism is determined entirely by where it sends the generators.

The diagram below shows the two functors and the unit $`\eta` and counit $`\varepsilon` that make the adjunction work.

<svg viewBox="0 0 480 190" width="480" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Adjunction with unit and counit">
  <defs><marker id="jarr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#334"/></marker></defs>
  <rect x="40" y="70" width="90" height="60" fill="#cfe3ff" stroke="#1a56db" stroke-width="2"/>
  <text x="85" y="105" font-family="sans-serif" font-size="18" fill="#222" text-anchor="middle">C</text>
  <rect x="350" y="70" width="90" height="60" fill="#ffe0e0" stroke="#c0392b" stroke-width="2"/>
  <text x="395" y="105" font-family="sans-serif" font-size="18" fill="#222" text-anchor="middle">D</text>
  <line x1="130" y1="88" x2="350" y2="88" stroke="#334" stroke-width="2" marker-end="url(#jarr)"/>
  <text x="240" y="80" font-family="sans-serif" font-size="15" fill="#334" text-anchor="middle">F (free)</text>
  <line x1="350" y1="112" x2="130" y2="112" stroke="#334" stroke-width="2" marker-end="url(#jarr)"/>
  <text x="240" y="130" font-family="sans-serif" font-size="15" fill="#334" text-anchor="middle">G (forgetful)</text>
  <g stroke="#c2410c" stroke-width="1.5">
    <line x1="55" y1="45" x2="115" y2="45"/>
    <line x1="55" y1="51" x2="115" y2="51"/>
  </g>
  <text x="85" y="38" font-family="sans-serif" font-size="13" fill="#c2410c" text-anchor="middle">η : id_C ⇒ G F</text>
  <g stroke="#0f7a3d" stroke-width="1.5">
    <line x1="365" y1="150" x2="425" y2="150"/>
    <line x1="365" y1="156" x2="425" y2="156"/>
  </g>
  <text x="395" y="176" font-family="sans-serif" font-size="13" fill="#0f7a3d" text-anchor="middle">ε : F G ⇒ id_D</text>
</svg>

> **Authoritative sources**
> - [S. Mac Lane, Categories for the Working Mathematician, Ch. IV](https://doi.org/10.1007/978-1-4757-4721-8)

<details><summary>Example problem</summary>

For the adjunction $`\mathrm{Free} \dashv U`, identify which functor is the left adjoint and which is the right adjoint, and state the hom-set bijection it gives.

<details><summary>Solution</summary>

`Free` is the left adjoint and `U` is the right adjoint. The adjunction gives a natural bijection $`\mathbf{Grp}(\mathrm{Free}(S), G) \cong \mathbf{Set}(S, U(G))`: a homomorphism out of the free group on $`S` is the same data as a function from $`S` to the underlying set of $`G`.
</details>

</details>

</details>

## Duality and the opposite category

**Definition.** The **opposite category** $`\mathcal{C}^{\mathrm{op}}` has the same objects as $`\mathcal{C}` but reverses every arrow: a morphism $`f: A \to B` in $`\mathcal{C}` becomes $`f^{\mathrm{op}}: B \to A` in $`\mathcal{C}^{\mathrm{op}}`. A statement about categories is **self-dual** if it stays true when every arrow is reversed.

Duality is a free source of theorems: prove a statement once, and its dual is automatic. A **colimit** is simply a limit in the opposite category, so the coproduct in $`\mathcal{C}` is the product in $`\mathcal{C}^{\mathrm{op}}`, and a left adjoint is a right adjoint after passing to opposites.

## Topoi

**Definition.** A **topos** (plural **topoi**) is a category that behaves like a universe of sets: it has a terminal object, all finite limits, is **cartesian closed**, and has a **subobject classifier**. Such a category supports an **internal logic** — one can carry out "set theory" and reasoning *inside* the category itself.

The category $`\mathbf{Set}` of all sets is the canonical (elementary) topos. Topos theory is the bridge between category theory and logic/foundations: it is the categorical setting in which a category can serve as a foundation in its own right, and it is the framework behind sheaf theory and the semantics of logic.

## Interactive: naturality square explorer

The simulation below lets you build a naturality square and check, arrow by arrow, whether a family of maps commutes with the arrows in sight — the defining condition for a natural transformation.

<iframe src="./Category-theory.simulation.html" title="Interactive naturality square explorer"></iframe>

## Why it matters

Category theory is a **unifying language** rather than a rival foundation: the same constructions (products, limits, adjunctions, duality) recur across algebra, topology, logic, and computation, and the categorical viewpoint states them once, for all. It is the native language of modern algebra and of homotopy type theory, and it organizes programming-language semantics (types as objects, programs as morphisms).

## How it relates to the other classes

Set theory answers "what is an object made of?"; category theory answers "how does an object relate to others?". The two are intertranslatable for most of mathematics: a category that behaves like a universe of sets — a **topos** — supports an internal logic and can serve as a foundation in its own right, so categorical and set-theoretic reasoning can be translated into each other. But category theory keeps only the morphisms, which is why it scales to structures too large or too abstract to be sets. It also meets [Type theory](../Type-theory.md) at homotopy type theory, and it is the language in which the algebraic structures of [Algebraic and discrete mathematics](../Algebraic-and-discrete-mathematics/Readme.md) are most cleanly stated.

## Quizz

<details><summary>Test yourself</summary>

**Problem.** A student defines a "functor" $`F: \mathbf{Set} \to \mathbf{Set}` by $`F(S) = S \times S` on objects and $`F(f) = f \times f` on morphisms, but then claims it is *not* a functor because $`F` "changes the size of the sets." Using the definition of a functor, explain why the claim is wrong and verify the two functor laws.

<details><summary>Solution</summary>

A functor need not preserve size, cardinality, or any property of the objects — it only has to preserve *composition* and *identities*. For $`f: S \to T` and $`g: T \to U`, $`F(g \circ f) = (g \circ f) \times (g \circ f)` sends $`(s, s')` to $`(g(f(s)), g(f(s')))`, while $`F(g) \circ F(f) = (g \times g) \circ (f \times f)` sends $`(s, s')` to $`(g(f(s)), g(f(s')))` — the same, so composition is preserved. And $`F(\mathrm{id}_S) = \mathrm{id}_S \times \mathrm{id}_S = \mathrm{id}_{S \times S}`, so identities are preserved. Both laws hold, so $`F` is a functor.
</details>

</details>
