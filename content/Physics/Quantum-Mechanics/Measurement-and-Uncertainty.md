# Measurement and Uncertainty

Measurement and uncertainty describe how the abstract quantum state connects to experimental outcomes, and why certain pairs of properties cannot be simultaneously sharp. This class is relevant whenever you need to predict what a detector will read, understand why a quantum computer's output is probabilistic, or explain why a classical trajectory emerges from a quantum state. It bridges the formalism of [Quantum states](./Quantum-States.md) to the observable world.

## The Born rule and projective measurement

**Definition.** If a system in state $`|\psi\rangle` is measured with a projective measurement $`\{\hat{P}_i\}` (orthogonal projectors summing to $`\hat{I}`), the outcome $`i` occurs with probability $`p_i = \langle\psi|\hat{P}_i|\psi\rangle`, and the post-measurement state is $`|\psi_i\rangle = \hat{P}_i|\psi\rangle / \sqrt{p_i}`.

<details><summary>Details</summary>

### From state to outcome

The quantum state $`|\psi\rangle` (see [Quantum states](./Quantum-States.md)) encodes all information, but a measurement extracts only one number (or a finite set). The Born rule is the bridge: it assigns probabilities to outcomes based on the overlap between the state and the measurement basis.

**Step 1: Projective (von Neumann) measurement.**

A projective measurement is specified by a set of orthogonal projectors $`\hat{P}_i = |i\rangle\langle i|` that satisfy $`\hat{P}_i\hat{P}_j = \delta_{ij}\hat{P}_i` and $`\sum_i \hat{P}_i = \hat{I}`. The measurement asks: "which basis state is the system in?" The answer is probabilistic, and the state collapses to the measured outcome.

**Step 2: Why collapse?**

If the system is in $`|\psi\rangle = \alpha|0\rangle + \beta|1\rangle` and we measure in the $`\{|0\rangle, |1\rangle\}` basis, we get 0 with probability $`|\alpha|^2` and 1 with probability $`|\beta|^2`. After the measurement, the state is the eigenstate corresponding to the outcome. This is not a unitary evolution — it is an additional postulate. The physical mechanism behind collapse is decoherence (below).

**Example: Stern–Gerlach experiment.**

A spin-½ particle in state $`|\psi\rangle = \frac{1}{\sqrt{3}}|\uparrow_z\rangle + \sqrt{\frac{2}{3}}|\downarrow_z\rangle` enters a Stern–Gerlach apparatus measuring $`S_z`. The beam splits into two: the upper beam (outcome $`+\hbar/2`) carries probability $`1/3`, the lower beam ($`-\hbar/2`) carries probability $`2/3`. If the upper beam is selected, the particle's state is now $`|\uparrow_z\rangle` — the superposition is destroyed.

**Example problem.**

<details><summary>Problem</summary>

A qubit is in state $`|\psi\rangle = \frac{1}{2}|0\rangle + \frac{\sqrt{3}}{2}|1\rangle`. A projective measurement in the computational basis is performed. What are the outcomes and probabilities? If the outcome is 0, what is the state afterward?

<details><summary>Solution</summary>

Outcomes: 0 or 1.

$`P(0) = |1/2|^2 = 1/4`, $`P(1) = |\sqrt{3}/2|^2 = 3/4`.

If outcome is 0: post-measurement state is $`|0\rangle`.

</details>
</details>

</details>

## Generalized measurement (POVM)

**Definition.** A positive-operator-valued measure (POVM) is a set $`\{\hat{E}_k\}` of positive semi-definite operators with $`\sum_k \hat{E}_k = \hat{I}`. The probability of outcome $`k` is $`p_k = \text{Tr}(\hat{\rho}\,\hat{E}_k)`. POVMs generalize projective measurements to include inefficient detectors, indirect measurements, and measurements on subsystems of entangled states.

<details><summary>Details</summary>

### Why go beyond projective measurements?

A projective measurement requires the system to be in a known basis and the detector to be perfect. In practice:

- A detector may miss some events (inefficiency).
- You may measure a property of one particle in an entangled pair without directly accessing it.
- You may want to extract partial information (a "weak measurement").

POVMs capture all of these. Every POVM can be realized by a projective measurement on a larger system (the system plus an ancilla), so POVMs are the most general measurement possible in quantum theory.

**Example: measuring a qubit with an inefficient detector.**

Suppose a detector clicks with probability $`\eta` when the qubit is in $`|1\rangle` and never clicks for $`|0\rangle`. The POVM elements are:

- $`\hat{E}_{\text{click}} = \eta\,|1\rangle\langle 1|`
- $`\hat{E}_{\text{no-click}} = |0\rangle\langle 0| + (1-\eta)|1\rangle\langle 1|`

These are positive and sum to $`\hat{I}`. For $`\eta < 1`, this is not a projective measurement — the "no-click" outcome does not uniquely determine the state.

**Example problem.**

<details><summary>Problem</summary>

A qubit in state $`|\psi\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)` is measured with a POVM $`\{\hat{E}_1 = \frac{1}{2}|0\rangle\langle 0|,\; \hat{E}_2 = \frac{1}{2}|1\rangle\langle 1|,\; \hat{E}_3 = \frac{1}{2}|0\rangle\langle 0| + \frac{1}{2}|1\rangle\langle 1|\}`. Find the three outcome probabilities.

<details><summary>Solution</summary>

$`p_1 = \langle\psi|\hat{E}_1|\psi\rangle = \frac{1}{2}\cdot\frac{1}{2} = \frac{1}{4}`

$`p_2 = \langle\psi|\hat{E}_2|\psi\rangle = \frac{1}{2}\cdot\frac{1}{2} = \frac{1}{4}`

$`p_3 = \langle\psi|\hat{E}_3|\psi\rangle = \frac{1}{2}\cdot\frac{1}{2} + \frac{1}{2}\cdot\frac{1}{2} = \frac{1}{2}`

Check: $`p_1 + p_2 + p_3 = 1`. ✓

</details>
</details>

</details>

## Heisenberg uncertainty principle

**Definition.** For any two observables $`\hat{A}, \hat{B}` with standard deviations $`\Delta A, \Delta B` in state $`|\psi\rangle`: $`\Delta A \cdot \Delta B \geq \frac{1}{2}|\langle[\hat{A},\hat{B}]\rangle|`. For position and momentum: $`\Delta x \cdot \Delta p \geq \hbar/2`.

<details><summary>Details</summary>

### From commutators to uncertainty

The uncertainty principle is not a limitation of measurement technology — it is a statement about the state. A state that is sharply localized in position is necessarily delocalized in momentum, and vice versa. The mathematical origin is the non-commutativity of the operators.

**Derivation sketch.**

Define $`\hat{A}' = \hat{A} - \langle A\rangle\hat{I}` and $`\hat{B}' = \hat{B} - \langle B\rangle\hat{I}`. By the Cauchy–Schwarz inequality:

$`(\Delta A)^2(\Delta B)^2 = \langle\psi|\hat{A}'^2|\psi\rangle\langle\psi|\hat{B}'^2|\psi\rangle \geq |\langle\psi|\hat{A}'\hat{B}'|\psi\rangle|^2`

Decompose $`\hat{A}'\hat{B}' = \frac{1}{2}\{\hat{A}',\hat{B}'\} + \frac{1}{2}[\hat{A}',\hat{B}]`. The anticommutator part is real, the commutator part is imaginary. Taking the modulus squared and dropping the (positive) anticommutator term gives:

$`(\Delta A)^2(\Delta B)^2 \geq \frac{1}{4}|\langle[\hat{A},\hat{B}]\rangle|^2`

For $`[\hat{x},\hat{p}] = i\hbar`: $`\Delta x \cdot \Delta p \geq \hbar/2`.

**Physical interpretation.**

A wave packet localized to width $`\Delta x` in position space has a momentum-space spread $`\Delta p \sim \hbar/\Delta x` (Fourier duality). The more you squeeze the position wavefunction, the broader its Fourier transform. This is a property of waves, not of quantum mechanics per se — but in quantum mechanics, the wavefunction *is* the state, so the trade-off is fundamental.

**Connection to the correspondence principle.**

When the action $`S` of a system is much larger than $`\hbar` (e.g., a baseball, a planet), the relative uncertainty $`\Delta x \cdot \Delta p / S \ll 1`, and the uncertainty principle becomes negligible. The system follows an approximately classical trajectory. This is the bridge to [Mechanics](../Mechanics/Readme.md): classical mechanics is the large-action limit of quantum mechanics.

**Example problem.**

<details><summary>Problem</summary>

An electron is confined to a region of size $`\Delta x = 10^{-10}` m (atomic scale). Estimate the minimum momentum uncertainty and the corresponding kinetic energy. Compare to the rest energy $`mc^2 = 511` keV.

<details><summary>Solution</summary>

$`\Delta p \geq \hbar/(2\Delta x) = 1.055\times10^{-34}/(2\times10^{-10}) = 5.3\times10^{-25}` kg·m/s.

Kinetic energy: $`E \approx (\Delta p)^2/(2m) = (5.3\times10^{-25})^2/(2\times9.11\times10^{-31}) \approx 1.5\times10^{-19}` J $`\approx 1` eV.

This is much less than 511 keV, so the non-relativistic treatment is valid. The electron's kinetic energy in an atom is of order eV, consistent with atomic binding energies.

</details>
</details>

</details>

## Decoherence

**Definition.** Decoherence is the loss of coherence (off-diagonal terms in the density matrix) of a system due to entanglement with its environment. It explains why macroscopic superpositions are not observed: the environment continuously "measures" the system, selecting a preferred basis (the pointer basis) and suppressing interference between branches.

<details><summary>Details</summary>

### From unitary evolution to apparent collapse

The full system + environment evolves unitarily (see [Quantum dynamics](./Quantum-Dynamics.md)). If the system starts in a superposition $`\alpha|0\rangle + \beta|1\rangle` and the environment starts in $`|E_0\rangle`, the joint evolution gives:

$`(\alpha|0\rangle + \beta|1\rangle)|E_0\rangle \longrightarrow \alpha|0\rangle|E_0^{(0)}\rangle + \beta|1\rangle|E_0^{(1)}\rangle`

If the environment states become orthogonal ($`\langle E_0^{(0)}|E_0^{(1)}\rangle \approx 0`), the reduced density matrix of the system (tracing out the environment) becomes:

$`\hat{\rho}_S = |\alpha|^2|0\rangle\langle 0| + |\beta|^2|1\rangle\langle 1|`

The off-diagonal terms $`\alpha\beta^*|0\rangle\langle 1|` have vanished. The system *behaves* as if it is in a classical mixture, even though the global state is still a pure superposition.

**Timescale.**

For a macroscopic object (e.g., a dust grain of mass $`10^{-12}` kg in air at room temperature), the decoherence time in the position basis is $`\sim 10^{-31}` s — effectively instantaneous. For a superconducting qubit isolated from its environment, coherence times can reach milliseconds. The difference is the coupling strength to the environment.

**Decoherence is not the same as collapse.**

Decoherence explains why interference is unobservable in practice, but it does not select a single outcome. The global state still contains all branches. The measurement problem (why we see one outcome and not a superposition) requires an additional interpretive step (Copenhagen, many-worlds, objective collapse, etc.). Decoherence is a many-body phenomenon: it requires the system to be coupled to many environmental degrees of freedom (see [Quantum many-body](./Quantum-Many-Body.md)).

**Example problem.**

<details><summary>Problem</summary>

A qubit in state $`|\psi\rangle = (|0\rangle + |1\rangle)/\sqrt{2}` is coupled to an environment such that after time $`t`, the joint state is $`( |0\rangle|e_0(t)\rangle + |1\rangle|e_1(t)\rangle )/\sqrt{2}` where $`\langle e_0(t)|e_1(t)\rangle = e^{-t/\tau}`. Find the off-diagonal element of the reduced density matrix as a function of $`t`.

<details><summary>Solution</summary>

The reduced density matrix is $`\hat{\rho}_S = \text{Tr}_E[|\Psi\rangle\langle\Psi|]`:

$`\hat{\rho}_S = \frac{1}{2}\begin{pmatrix} 1 & \langle e_1|e_0\rangle \\ \langle e_0|e_1\rangle & 1 \end{pmatrix} = \frac{1}{2}\begin{pmatrix} 1 & e^{-t/\tau} \\ e^{-t/\tau} & 1 \end{pmatrix}`

The off-diagonal element decays as $`e^{-t/\tau}`. At $`t = \tau`, coherence is reduced to $`1/e \approx 37%`; at $`t = 10\tau`, it is $`\sim 5\times10^{-5}` — effectively a classical mixture.

</details>
</details>

</details>

## Quiz

<details><summary>Test your understanding</summary>

**Problem.** A particle is in a Gaussian wave packet $`\psi(x) = (2\pi\sigma^2)^{-1/4}\exp(-x^2/4\sigma^2)`.

1. Compute $`\Delta x`.
2. Compute $`\Delta p` by Fourier transforming to momentum space.
3. Verify the uncertainty relation.

<details><summary>Solution</summary>

1. $`(\Delta x)^2 = \langle x^2\rangle - \langle x\rangle^2 = 2\sigma^2 - 0 = 2\sigma^2`, so $`\Delta x = \sqrt{2}\,\sigma`.

2. The Fourier transform of a Gaussian is a Gaussian: $`\phi(p) \propto \exp(-p^2\sigma^2/\hbar^2)`. This gives $`(\Delta p)^2 = \hbar^2/(4\sigma^2)`, so $`\Delta p = \hbar/(2\sigma)`.

3. $`\Delta x \cdot \Delta p = \sqrt{2}\,\sigma \cdot \hbar/(2\sigma) = \hbar/\sqrt{2} \approx 0.707\,\hbar > \hbar/2`. ✓

The Gaussian is a minimum-uncertainty state only up to the numerical factor; the true minimum is $`\hbar/2`, achieved by a slightly different (complex) Gaussian. The real Gaussian above gives $`\hbar/\sqrt{2}`.

</details>
</details>

> **Authoritative sources**
> - [Heisenberg, *Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik* (1927)](https://en.wikipedia.org/wiki/Heisenberg_uncertainty_principle)
> - [Zurek, *Decoherence, einselection, and the quantum origins of the classical* (Rev. Mod. Phys. 75, 715, 2003)](https://doi.org/10.1103/RevModPhys.75.715)