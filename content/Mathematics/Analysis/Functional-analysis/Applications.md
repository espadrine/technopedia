# Applications

Applications is where the machinery of the other three pages pays off. The same Hilbert-space and operator language that abstracts Euclidean geometry is exactly the language of quantum mechanics, and the same weak/compact-operator ideas give existence theorems for partial differential equations. This page covers the two flagship applications: quantum mechanics (states, observables, time evolution) and PDEs (weak solutions and existence by the direct method).

> **Authoritative sources**
> - [M. Reed & B. Simon, *Methods of Modern Mathematical Physics*](https://www.ams.org/bookstore/getitemspage?item=CBM-009)
> - [L. C. Evans, *Partial Differential Equations*, Ch. 6–7](https://www.ams.org/bookstore/getitemspage?item=CBM-012)

## Quantum mechanics

**Definition.** In quantum mechanics the state of a system is a unit vector (equivalently a ray) in a Hilbert space $`\mathcal{H}`; an **observable** is a self-adjoint operator on $`\mathcal{H}`; and the possible measured values of an observable are its spectrum.

<details><summary>Details</summary>

### States and expectation values

A pure state is a unit vector $`\psi \in \mathcal{H}` (vectors differing by a phase represent the same physical state, so really a "ray"). If $`A` is an observable, the expected value of measuring $`A` in state $`\psi` is the number $`\langle A\psi, \psi \rangle`. Because $`A` is self-adjoint, this number is real — see [Operators](./Operators.md).

**Example.** A spin-$`1/2` particle has state space $`\mathcal{H} = \mathbb{C}^2`. The spin in the $`z`-direction is the observable $`S_z = \frac{\hbar}{2}\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}`, whose spectrum $`\{\hbar/2, -\hbar/2\}` is exactly the two outcomes of a Stern–Gerlach measurement.

### Time evolution is a one-parameter unitary group

The time evolution of a state with Hamiltonian $`H` (a self-adjoint operator) is given by the Schrödinger equation

```math
i\hbar\, \frac{d}{dt}\psi(t) = H\,\psi(t), \qquad \psi(t) = e^{-iHt/\hbar}\,\psi(0).
```

The family $`U(t) = e^{-iHt/\hbar}` is a one-parameter group of unitary operators — this is Stone's theorem in action, and it is why probability is conserved. The operator $`e^{-iHt/\hbar}` is defined by the functional calculus of the spectral theorem.

<svg viewBox="0 0 440 150" width="440" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A quantum state as a vector in Hilbert space, with an observable's eigenvectors as axes">
  <line x1="40" y1="120" x2="400" y2="120" stroke="#888" stroke-width="1"/>
  <line x1="40" y1="120" x2="40" y2="20" stroke="#888" stroke-width="1"/>
  <line x1="40" y1="120" x2="300" y2="60" stroke="#2b6cb0" stroke-width="2"/>
  <circle cx="300" cy="60" r="4" fill="#2b6cb0"/>
  <text x="305" y="55" font-size="12" fill="#2b6cb0">psi (state)</text>
  <line x1="40" y1="120" x2="150" y2="120" stroke="#2f855a" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="90" y="140" font-size="12" fill="#2f855a">eigenvector of A</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Let $`A` be a self-adjoint operator and $`\psi` a unit vector. Show that the expectation value $`\langle A\psi, \psi \rangle` is real.

<details><summary>Solution</summary>

$`\langle A\psi, \psi \rangle = \langle \psi, A^* \psi \rangle = \langle \psi, A \psi \rangle = \overline{\langle A\psi, \psi \rangle}`, using $`A = A^*`. A complex number equal to its own conjugate is real. ∎

</details>

</details>

</details>

## PDEs and weak solutions

**Definition.** A **weak solution** of a PDE is a function in a Sobolev space that satisfies the equation in the distributional sense (after integrating by parts to move derivatives onto smooth test functions). Existence is often proved by the **direct method**: a minimizing sequence has a weakly convergent subsequence whose limit is the solution.

<details><summary>Details</summary>

### Why weak solutions

Classical (smooth) solutions to PDEs often do not exist, especially for nonsmooth data or nonlinear equations. Weak solutions relax the requirement: instead of the equation holding pointwise, it holds after pairing with test functions. This is exactly the language of [Distributions](./Distributions.md) — a weak solution is a function whose weak derivatives satisfy the PDE.

**Sobolev spaces.** The natural home for weak solutions is a Sobolev space $`H^1`, the space of $`L^2` functions whose weak first derivatives are also in $`L^2`. These are Banach (indeed Hilbert) spaces, so all the machinery of [Spaces](./Spaces.md) applies.

### The direct method of the calculus of variations

To solve $`-\Delta u = f` with zero boundary data, one minimizes the energy

```math
J(v) = \frac{1}{2}\int |\nabla v|^2 - \int f\,v
```

over the affine space of admissible functions. The argument has three steps, each a theorem from the other pages:
1. **Boundedness:** a minimizing sequence is bounded in $`H^1`.
2. **Weak compactness:** because $`H^1` is reflexive, a subsequence converges weakly to some $`u` (see [Spaces](./Spaces.md)).
3. **Lower semicontinuity:** the energy satisfies $`J(u) \leq \liminf J(u_n)`, so $`u` is the minimizer, and the Euler–Lagrange equation gives $`-\Delta u = f` in the weak sense.

<svg viewBox="0 0 440 150" width="440" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The direct method: a bounded minimizing sequence has a weakly convergent subsequence">
  <circle cx="220" cy="75" r="55" fill="none" stroke="#2b6cb0" stroke-width="1.5"/>
  <circle cx="190" cy="60" r="4" fill="#2f855a"/>
  <circle cx="250" cy="90" r="4" fill="#2f855a"/>
  <circle cx="210" cy="100" r="4" fill="#2f855a"/>
  <circle cx="220" cy="75" r="5" fill="#c53030"/>
  <text x="228" y="70" font-size="12" fill="#c53030">u (weak limit)</text>
  <text x="120" y="145" font-size="12" fill="#333">bounded minimizing sequence -> weakly convergent subsequence</text>
</svg>

<details><summary>Example problem</summary>

**Problem.** Explain why the Poisson equation $`-\Delta u = f` on a bounded domain with $`f \in L^2` and zero boundary conditions has a weak solution in $`H_0^1`.

<details><summary>Solution</summary>

Minimize $`J(v) = \frac{1}{2}\int |\nabla v|^2 - \int f v` over $`H_0^1`. By the Poincaré inequality, $`J` is coercive and bounded below, so a minimizing sequence $`(v_n)` is bounded in $`H_0^1`. Since $`H_0^1` is a Hilbert (hence reflexive) space, a subsequence converges weakly to some $`u \in H_0^1`. The norm $`v \mapsto \int |\nabla v|^2` is convex and continuous, hence weakly lower semicontinuous, so $`u` minimizes $`J`. Taking the first variation of $`J` at $`u` gives $`\int \nabla u \cdot \nabla \varphi = \int f \varphi` for all test functions $`\varphi`, which is precisely the weak form of $`-\Delta u = f`. ∎

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

**Problem.** In quantum mechanics, show that if $`H` is a self-adjoint Hamiltonian, then the time-evolution operator $`U(t) = e^{-iHt/\hbar}` is unitary for every real $`t`.

<details><summary>Solution</summary>

By the functional calculus, $`U(t)^* = e^{iHt/\hbar}` (the adjoint conjugates the exponent). Then $`U(t)^* U(t) = e^{iHt/\hbar} e^{-iHt/\hbar} = e^{0} = I`, since the two exponents are functions of the same self-adjoint operator $`H` and hence commute. So $`U(t)` is unitary, which is why it preserves the norm (and hence total probability) of a state. ∎

</details>

</details>