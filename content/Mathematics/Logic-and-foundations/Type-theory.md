# Type theory

Type theory is a foundational framework in which every term carries a **type**, and a type is at once a set-like collection and a specification of behavior. It is the mathematical substrate of proof assistants (Coq, Agda, Lean) and of the type systems of programming languages.

> **Authoritative sources**
> - [A. Church (1940), A Formulation of the Simple Theory of Types](https://doi.org/10.2307/2266170)
> - [P. Martin-Löf, Intuitionistic Type Theory (1984)](https://archive-pml.github.io/martin-lof/pdfs/Bibliography.pdf)
> - [The HoTT Book (2013)](https://homotopytypetheory.org/book/)

## Core ideas

- **Simply typed lambda calculus** (Church 1940): terms are built from variables, abstraction λx.t, and application; well-typed terms cannot "go wrong" (no application of a function to an argument of the wrong shape). Type checking is decidable.
- **Curry–Howard correspondence**: propositions correspond to types, and proofs correspond to programs. A proof of "A and B" is a pair; a proof of "A or B" is a tagged injection; a proof of "A implies B" is a function. This is why type theory is simultaneously a logic and a programming language.
- **Dependent types** (Martin-Löf): types may depend on values, so a type can express a proposition about a specific value — e.g. the type of vectors of length *n*. This lets a proof assistant check that a program meets its specification by type checking alone.
- **Intuitionistic logic.** Type theory validates exactly intuitionistic logic: a proof of "A or not A" must construct a witness, so the law of excluded middle is not automatic. Classical principles can be added as axioms, but the constructive default is what makes proofs computable (proofs can be run as programs, a property called *proof relevance*).
- **Homotopy type theory** (2013) interprets types as spaces and equalities as paths, connecting foundations to homotopy theory and making type theory a language for higher-dimensional mathematics.

## How it relates to the other classes

Type theory, [Set theory](../Set-theory.md), and [Category theory](../Category-theory.md) are three rival foundational languages: set theory is membership-based, category theory is morphism-based, and type theory is judgment-based (a term is *typed*, not merely a member). Type theory ties directly back to [Mathematical logic](../Mathematical-logic.md) through Curry–Howard and to [Computability and decidability](../Computability-and-decidability.md) through the lambda calculus, one of the two classic models of computation.
