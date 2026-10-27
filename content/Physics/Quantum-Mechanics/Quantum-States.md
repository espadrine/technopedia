# Quantum States

Quantum states are the mathematical objects that encode everything knowable about a physical system. They are relevant whenever you need to describe a system whose properties are not simultaneously definite: an electron in an atom, a spin in a magnetic field, or two particles that are entangled. The state space (Hilbert space) is the foundation on which measurement, dynamics, and many-body physics are built.

## Hilbert space and superposition

**Definition.** A quantum state is a ray (equivalence class of vectors up to a global phase) in a complex Hilbert space $`\mathcal{H}`. A general state is a superposition $`|\psi\rangle = \sum_i c_i |i\rangle` where $`\sum_i |c_i|^2 = 1`.

<details><summary>Details</summary>

### From classical to quantum states

In [classical mechanics](../Mechanics/Readme.md), the state of a particle is a point in phase space: a definite position $`x` and momentum $`p` simultaneously. Quantum mechanics replaces this with a vector in an abstract complex vector space.

**Step 1: Why a vector space?**

The key experimental fact is superposition: if a system can be in state A and in state B, it can also be in any linear combination $`\alpha|A\rangle + \beta|B\rangle`. This is not a mixture ("either A or B") but a genuinely new state with interference properties. A vector space is the minimal structure that supports this.

**Step 2: Why complex?**

Interference requires a phase. The probability of a transition from state $`|\psi\rangle` to state $`|\phi\rangle` is $`|\langle\phi|\psi\rangle|^2`, which depends on the relative phase between components. Real amplitudes cannot produce the full range of interference patterns observed in experiments (e.g., the Aharonov–Bohm effect).

**Step 3: Normalization and the Born rule.**

The squared norm $`\langle\psi|\psi\rangle = 1` ensures that the total probability of all possible outcomes sums to 1. The coefficient $`|c_i|^2` gives the probability of finding the system in basis state $`|i\rangle` upon measurement (see [Measurement and uncertainty](./Measurement-and-Uncertainty.md)).

**Example: a spin-½ particle.**

The Hilbert space is $`\mathbb{C}^2`. The basis states are $`|\uparrow\rangle = (1,0)^T` and $`|\downarrow\rangle = (0,1)^T`. A general state is $`|\psi\rangle = \alpha|\uparrow\rangle + \beta|\downarrow\rangle` with $`|\alpha|^2 + |\beta|^2 = 1`. The state $`|\psi\rangle = \frac{1}{\sqrt{2}}(|\uparrow\rangle + |\downarrow\rangle)` is a superposition: measuring spin along z gives up or down with equal probability, but the state is not "either up or down" — it has a definite phase relationship that produces interference if measured along a different axis.

<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <line x1="50" y1="150" x2="350" y2="150" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="150" x2="50" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="30" y="165" font-size="12">|↓⟩</text>
  <text x="30" y="30" font-size="12">|↑⟩</text>
  <line x1="50" y1="150" x2="200" y2="80" stroke="blue" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="120" y="95" font-size="11" fill="blue">|ψ⟩ = α|↑⟩ + β|↓⟩</text>
  <line x1="50" y1="150" x2="200" y2="80" stroke="blue" stroke-width="2" stroke-dasharray="4" opacity="0.4"/>
  <line x1="200" y1="80" x2="200" y2="150" stroke="gray" stroke-width="1" stroke-dasharray="3"/>
  <line x1="200" y1="80" x2="50" y2="80" stroke="gray" stroke-width="1" stroke-dasharray="3"/>
  <text x="205" y="120" font-size="10" fill="gray">β</text>
  <text x="110" y="145" font-size="10" fill="gray">α</text>
  <text x="150" y="190" font-size="11">Hilbert space C² for a spin-½ particle</text>
</svg>

**Example problem.**

<details><summary>Problem</summary>

A qubit is in the state $`|\psi\rangle = \frac{1}{2}|\uparrow\rangle + \frac{i\sqrt{3}}{2}|\downarrow\rangle`. What is the probability of measuring spin-up along z? What is the probability of measuring spin-up along x, where $`|+_x\rangle = \frac{1}{\sqrt{2}}(|\uparrow\rangle + |\downarrow\rangle)`?

<details><summary>Solution</summary>

**Spin-up along z:** $`P(\uparrow_z) = |\langle\uparrow|\psi\rangle|^2 = |1/2|^2 = 1/4`.

**Spin-up along x:**

$`\langle+_x|\psi\rangle = \frac{1}{\sqrt{2}}\left(\frac{1}{2} + \frac{i\sqrt{3}}{2}\right) = \frac{1+i\sqrt{3}}{2\sqrt{2}}`.

$`P(+_x) = \left|\frac{1+i\sqrt{3}}{2\sqrt{2}}\right|^2 = \frac{1+3}{8} = \frac{1}{2}`.

The phase matters: without the $`i`, the x-probability would be $`(1/2 + \sqrt{3}/2)^2/2 = (2+\sqrt{3})/4 \approx 0.933`, very different from $`1/2`.

</details>
</details>

</details>

## Observables and operators

**Definition.** An observable is a self-adjoint (Hermitian) operator $`\hat{A}` on $`\mathcal{H}`. Its eigenvalues are the possible measurement outcomes; its eigenvectors form a complete orthonormal basis. The expectation value in state $`|\psi\rangle` is $`\langle\psi|\hat{A}|\psi\rangle`.

<details><summary>Details</summary>

### Why Hermitian operators?

A measurement outcome must be a real number. The condition $`\hat{A} = \hat{A}^\dagger` (Hermiticity) guarantees real eigenvalues. Additionally, the spectral theorem ensures that the eigenvectors of a Hermitian operator form a complete orthonormal basis, so any state can be expanded in terms of possible outcomes.

**Example: position and momentum.**

In the position representation, $`\hat{x}` acts by multiplication: $`(\hat{x}\psi)(x) = x\,\psi(x)`. The momentum operator is $`\hat{p} = -i\hbar\,\partial/\partial x`. These satisfy the canonical commutation relation $`[\hat{x}, \hat{p}] = i\hbar\,\hat{I}`. This non-commutativity is the algebraic origin of the uncertainty principle (see [Measurement and uncertainty](./Measurement-and-Uncertainty.md)).

**Example: spin operators.**

The spin-½ operators are $`\hat{S}_i = \frac{\hbar}{2}\sigma_i` where $`\sigma_i` are the Pauli matrices:

$`\sigma_x = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad \sigma_y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \quad \sigma_z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}`

They satisfy $`[\sigma_i, \sigma_j] = 2i\epsilon_{ijk}\sigma_k` and $`\sigma_i\sigma_j = \delta_{ij}\hat{I} + i\epsilon_{ijk}\sigma_k`. The eigenvalues of each $`\hat{S}_i` are $`\pm\hbar/2`, giving the two possible spin measurement outcomes.

**Example problem.**

<details><summary>Problem</summary>

Show that $`\sigma_x` and $`\sigma_z` do not commute, and find the eigenvectors of $`\sigma_x`.

<details><summary>Solution</summary>

$`\sigma_x\sigma_z = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}`

$`\sigma_z\sigma_x = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}`

So $`[\sigma_x, \sigma_z] = \sigma_x\sigma_z - \sigma_z\sigma_x = \begin{pmatrix} 0 & -2 \\ 2 & 0 \end{pmatrix} = -2i\sigma_y \neq 0`.

Eigenvectors of $`\sigma_x`: solve $`\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} a \\ b \end{pmatrix} = \lambda\begin{pmatrix} a \\ b \end{pmatrix}`.

For $`\lambda = +1`: $`b = a`, so $`|+_x\rangle = \frac{1}{\sqrt{2}}(1,1)^T`.
For $`\lambda = -1`: $`b = -a`, so $`|-_x\rangle = \frac{1}{\sqrt{2}}(1,-1)^T`.

</details>
</details>

</details>

## Entanglement

**Definition.** A composite system in state $`|\Psi\rangle \in \mathcal{H}_A \otimes \mathcal{H}_B` is entangled if it cannot be written as $`|\psi\rangle_A \otimes |\phi\rangle_B`. Entangled states exhibit correlations stronger than any classical (local hidden-variable) model allows.

<details><summary>Details</summary>

### Why entanglement is non-classical

A separable (product) state $`|\psi\rangle_A \otimes |\phi\rangle_B` means each subsystem has its own independent state. An entangled state means the whole has a definite state but the parts do not — measuring one part instantaneously constrains the other, regardless of distance.

**Example: the Bell state.**

$`|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|\uparrow\uparrow\rangle + |\downarrow\downarrow\rangle)`

Neither particle has a definite spin. If you measure particle A along z and get up, particle B is instantly in the up state. But the key non-classical feature is that the correlations hold for *any* measurement axis simultaneously, violating Bell inequalities. No pre-existing local assignment of "A is up, B is up" can reproduce the quantum predictions for all measurement directions.

**Connection to quantum information.**

Entanglement is the resource for quantum computing, quantum teleportation, and quantum cryptography. A register of $`n` entangled qubits lives in a $`2^n`-dimensional Hilbert space, enabling exponential parallelism in certain algorithms. This application domain builds directly on the state-space formalism described here.

**Example problem.**

<details><summary>Problem</summary>

Show that $`|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|\uparrow\uparrow\rangle + |\downarrow\downarrow\rangle)` is also maximally entangled in the x-basis, i.e., it can be rewritten as $`\frac{1}{\sqrt{2}}(|+_x+_x\rangle + |-_-x\rangle)`.

<details><summary>Solution</summary>

Using $`|\uparrow\rangle = \frac{1}{\sqrt{2}}(|+_x\rangle + |-_x\rangle)` and $`|\downarrow\rangle = \frac{1}{\sqrt{2}}(|+_x\rangle - |-_x\rangle)`:

$`|\uparrow\uparrow\rangle = \frac{1}{2}(|+_x+_x\rangle + |+_x-_x\rangle + |-_x+_x\rangle + |-_-x\rangle)`

$`|\downarrow\downarrow\rangle = \frac{1}{2}(|+_x+_x\rangle - |+_x-_x\rangle - |-_x+_x\rangle + |-_-x\rangle)`

Sum: $`|\uparrow\uparrow\rangle + |\downarrow\downarrow\rangle = |+_x+_x\rangle + |-_-x\rangle`

Therefore $`|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|+_x+_x\rangle + |-_-x\rangle)`. The state is symmetric under change of basis — a hallmark of maximal entanglement.

</details>
</details>

</details>

## Spin and angular momentum

**Definition.** Angular momentum in quantum mechanics is quantized: $`\hat{J}^2 |j,m\rangle = \hbar^2 j(j+1)|j,m\rangle` and $`\hat{J}_z |j,m\rangle = \hbar m |j,m\rangle` where $`j = 0, \frac{1}{2}, 1, \ldots` and $`m = -j, -j+1, \ldots, j`. Spin is the intrinsic angular momentum with no classical analogue.

<details><summary>Details</summary>

### Quantization of angular momentum

In classical mechanics, angular momentum $`\mathbf{L} = \mathbf{r} \times \mathbf{p}` can take any magnitude and direction. In quantum mechanics, the commutation relations $`[\hat{J}_i, \hat{J}_j] = i\hbar\epsilon_{ijk}\hat{J}_k` force the eigenvalues to be discrete. The total angular momentum quantum number $`j` can be integer (bosons) or half-integer (fermions), and the projection $`m` takes $`2j+1` values.

**Why spin has no classical analogue.**

Orbital angular momentum arises from spatial motion ($`\mathbf{r} \times \mathbf{p}`), but spin is an intrinsic property: an electron has spin $`\hbar/2` even at a point, with no spatial extent to rotate. The two-valuedness of spin-½ (only up or down along any axis) and the $`2\pi` rotation giving a minus sign (requiring $`4\pi` to return to the original state) have no classical counterpart.

**Connection to the Standard Model.**

The spin of a particle determines its statistics (integer spin → Bose-Einstein, half-integer → Fermi-Dirac; see [Quantum many-body](./Quantum-Many-Body.md)) and its role in the [Standard Model](../Standard-Model/Readme.md) gauge structure. Fermions (spin-½) are matter; bosons (spin-1) mediate forces.

**Example problem.**

<details><summary>Problem</summary>

A particle has total angular momentum $`j = 1`. How many values can $`m` take? What are the possible values of $`\hat{J}^2` in units of $`\hbar^2`?

<details><summary>Solution</summary>

$`m` takes $`2j+1 = 3` values: $`m = -1, 0, +1`.

$`\hat{J}^2 = \hbar^2 j(j+1) = \hbar^2 \cdot 1 \cdot 2 = 2\hbar^2`.

Note that $`\hat{J}^2` is the same for all three $`m` states — the magnitude is fixed, only the direction (projection) varies.

</details>
</details>

</details>

## Quiz

<details><summary>Test your understanding</summary>

**Problem.** A two-level system has basis states $`|0\rangle, |1\rangle` and is prepared in the state $`|\psi\rangle = \frac{1}{\sqrt{5}}|0\rangle + \frac{2i}{\sqrt{5}}|1\rangle`. A measurement of the observable $`\hat{A} = |0\rangle\langle 1| + |1\rangle\langle 0|` (= $`\sigma_x`) is performed.

1. What are the possible outcomes?
2. What are their probabilities?
3. What is the expectation value $`\langle\hat{A}\rangle`?

<details><summary>Solution</summary>

1. $`\hat{A} = \sigma_x` has eigenvalues $`\pm 1`, so the outcomes are $`+1` and $`-1`.

2. $`\langle+_x|\psi\rangle = \frac{1}{\sqrt{2}}\left(\frac{1}{\sqrt{5}} + \frac{2i}{\sqrt{5}}\right) = \frac{1+2i}{\sqrt{10}}`

$`P(+1) = \frac{|1+2i|^2}{10} = \frac{5}{10} = \frac{1}{2}`

$`\langle-_x|\psi\rangle = \frac{1}{\sqrt{2}}\left(\frac{1}{\sqrt{5}} - \frac{2i}{\sqrt{5}}\right) = \frac{1-2i}{\sqrt{10}}`

$`P(-1) = \frac{|1-2i|^2}{10} = \frac{5}{10} = \frac{1}{2}`

3. $`\langle\hat{A}\rangle = (+1)\cdot\frac{1}{2} + (-1)\cdot\frac{1}{2} = 0`.

Check: $`\langle\psi|\sigma_x|\psi\rangle = \frac{1}{\sqrt{5}}\cdot\frac{2i}{\sqrt{5}} + \frac{-2i}{\sqrt{5}}\cdot\frac{1}{\sqrt{5}} = \frac{2i - 2i}{5} = 0`. ✓

</details>
</details>

> **Authoritative sources**
> - [Dirac, *The Principles of Quantum Mechanics* (1930)](https://en.wikipedia.org/wiki/The_Principles_of_Quantum_Mechanics)
> - [Sakurai & Napolitano, *Modern Quantum Mechanics* (2017)](https://www.cambridge.org/us/academic/subjects/physics/quantum-physics-relativity-quantum-optics/modern-quantum-mechanics)