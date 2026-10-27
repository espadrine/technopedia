# Quantum Many-Body

Quantum many-body physics describes systems of many identical particles where the indistinguishability and statistics of the particles are essential. It is relevant for condensed matter (metals, superconductors, magnets), ultracold atoms, nuclear physics, and the quantum statistical mechanics that underlies thermodynamics. The key tools are second quantization, Fock space, and the Bose/Fermi statistics that follow from the spin-statistics theorem.

## Identical particles and symmetrization

**Definition.** For $`N` identical particles, the many-body wavefunction must be either symmetric (bosons, integer spin) or antisymmetric (fermions, half-integer spin) under exchange of any two particles: $`\psi(\ldots, x_i, \ldots, x_j, \ldots) = \pm\psi(\ldots, x_j, \ldots, x_i, \ldots)`. The plus sign gives Bose-Einstein statistics; the minus sign gives Fermi-Dirac statistics and the Pauli exclusion principle.

<details><summary>Details</summary>

### Why indistinguishability matters

In classical mechanics, two identical particles can be told apart by their trajectories: particle 1 is at $`(x_1, p_1)` and particle 2 at $`(x_2, p_2)`. In quantum mechanics, if two particles are truly identical (same mass, charge, spin), there is no observable that distinguishes them. The state must therefore be invariant (up to a phase) under particle exchange.

**Step 1: Exchange symmetry.**

Exchanging two particles twice must return the original state. The only phases consistent with this are $`+1` (bosons) and $`-1` (fermions). The spin-statistics theorem (proved in relativistic QFT; see [Quantum field theory](./Quantum-Field-Theory.md)) connects this to spin: integer spin → boson, half-integer spin → fermion.

**Step 2: Consequences for the wavefunction.**

For bosons, the many-body state is a symmetric combination: all particles can occupy the same single-particle state (Bose-Einstein condensation). For fermions, the state is an antisymmetric Slater determinant: no two fermions can occupy the same quantum state (Pauli exclusion), which is the origin of the periodic table, the stability of matter, and the structure of solids.

**Example: two spin-½ fermions.**

Two electrons in orbitals $`\phi_a` and $`\phi_b` with spins $`\sigma_1, \sigma_2`. The spatial part must be antisymmetric if the spin part is symmetric (triplet), and symmetric if the spin part is antisymmetric (singlet):

- Singlet (antisymmetric spin): $`|S\rangle = (|\uparrow\downarrow\rangle - |\downarrow\uparrow\rangle)/\sqrt{2}`, spatial part symmetric: $`\psi_S = (\phi_a(1)\phi_b(2) + \phi_b(1)\phi_a(2))/\sqrt{2}`
- Triplet (symmetric spin): $`|T\rangle = |\uparrow\uparrow\rangle`, $`( |\uparrow\downarrow\rangle + |\downarrow\uparrow\rangle)/\sqrt{2}`, $`|\downarrow\downarrow\rangle`, spatial part antisymmetric: $`\psi_A = (\phi_a(1)\phi_b(2) - \phi_b(1)\phi_a(2))/\sqrt{2}`

If $`a = b` (same orbital), the antisymmetric spatial part vanishes — two fermions cannot be in the same state with the same spin. This is the Pauli exclusion principle.

**Example problem.**

<details><summary>Problem</summary>

Three identical bosons are in a 1D harmonic oscillator. The single-particle energy levels are $`E_n = \hbar\omega(n+1/2)`. Find the ground-state and first-excited-state energies of the three-boson system, and the degeneracy of each.

<details><summary>Solution</summary>

**Ground state:** All three bosons in $`n=0`: $`E = 3\cdot\hbar\omega/2 = 3\hbar\omega/2`. Degeneracy: 1 (all in the same state).

**First excited state:** One boson in $`n=1`, two in $`n=0`: $`E = \hbar\omega(3/2) + \hbar\omega(1/2) = 2\hbar\omega`. Degeneracy: 1 (the excited boson is in $`n=1`, which is non-degenerate in 1D).

For fermions, the ground state would require three different states: $`E = \hbar\omega(1/2 + 3/2 + 5/2) = 5\hbar\omega` — much higher, illustrating the Pauli pressure.

</details>
</details>

</details>

## Second quantization and Fock space

**Definition.** Fock space $`\mathcal{F}` is the direct sum of $`N`-particle Hilbert spaces: $`\mathcal{F} = \mathbb{C}\oplus \mathcal{H}^{\otimes 1}\oplus \mathcal{H}^{\wedge 2}\oplus \cdots` (symmetric for bosons, antisymmetric for fermions). Creation operators $`\hat{a}_i^\dagger` add a particle in mode $`i`; annihilation operators $`\hat{a}_i` remove one. They satisfy $`[\hat{a}_i, \hat{a}_j^\dagger] = \delta_{ij}` (bosons) or $`\{\hat{a}_i, \hat{a}_j^\dagger\} = \delta_{ij}` (fermions).

<details><summary>Details</summary>

### From fixed $`N` to variable $`N`

In first-quantized QM, the number of particles is fixed. But in many-body physics, particles are constantly created and destroyed: electrons scatter in a solid, phonons are emitted in a crystal, atoms are lost from a trap. Second quantization promotes the particle number to a variable and describes the system in Fock space.

**Step 1: Mode expansion.**

Choose a single-particle basis $`\{\phi_i\}`. A one-particle state is $`|i\rangle = \hat{a}_i^\dagger|0\rangle`. A two-particle state is $`|i,j\rangle = \hat{a}_i^\dagger\hat{a}_j^\dagger|0\rangle` (for bosons; for fermions, $`i \neq j` is required and the order matters: $`\hat{a}_i^\dagger\hat{a}_j^\dagger = -\hat{a}_j^\dagger\hat{a}_i^\dagger`).

**Step 2: The Hamiltonian in second quantization.**

A general many-body Hamiltonian is:

$`\hat{H} = \sum_{ij}h_{ij}\hat{a}_i^\dagger\hat{a}_j + \frac{1}{4}\sum_{ijkl}V_{ijkl}\hat{a}_i^\dagger\hat{a}_j^\dagger\hat{a}_l\hat{a}_k`

The first term is the single-particle (kinetic + external potential) energy; the second is the two-body interaction. The coefficients $`h_{ij}` and $`V_{ijkl}` are single- and two-particle matrix elements.

**Step 3: Number operator and conservation.**

The total particle number is $`\hat{N} = \sum_i \hat{a}_i^\dagger\hat{a}_i`. If $`[\hat{H}, \hat{N}] = 0` (no creation/annihilation terms), particle number is conserved and Fock space decomposes into sectors of fixed $`N`.

**Example: the harmonic oscillator as a bosonic mode.**

A single quantum harmonic oscillator is mathematically identical to a single bosonic mode: $`\hat{H} = \hbar\omega(\hat{a}^\dagger\hat{a} + 1/2)`. The Fock states $`|n\rangle = (\hat{a}^\dagger)^n|0\rangle/\sqrt{n!}` are the number states. This is the simplest example of second quantization: the "particles" are quanta of the field mode.

**Example problem.**

<details><summary>Problem</summary>

Two non-interacting fermions occupy modes 1 and 2 in a system with single-particle energies $`\epsilon_1, \epsilon_2`. Write the many-body state in second quantization and compute the expectation value of $`\hat{N}_1 = \hat{a}_1^\dagger\hat{a}_1`.

<details><summary>Solution</summary>

The state is $`|\Psi\rangle = \hat{a}_1^\dagger\hat{a}_2^\dagger|0\rangle`.

$`\langle\Psi|\hat{N}_1|\Psi\rangle = \langle 0|\hat{a}_2\hat{a}_1\hat{a}_1^\dagger\hat{a}_1\hat{a}_2^\dagger|0\rangle`

Using $`\hat{a}_1\hat{a}_1^\dagger = 1 - \hat{a}_1^\dagger\hat{a}_1`:

$`= \langle 0|\hat{a}_2(1-\hat{a}_1^\dagger\hat{a}_1)\hat{a}_1\hat{a}_2^\dagger|0\rangle`

Since $`\hat{a}_1|0\rangle = 0` and $`\hat{a}_1^\dagger\hat{a}_1\hat{a}_1 = 0`:

$`= \langle 0|\hat{a}_2\hat{a}_1\hat{a}_2^\dagger|0\rangle = \langle 0|\hat{a}_2(1-\hat{a}_2^\dagger\hat{a}_2)\hat{a}_2^\dagger|0\rangle`

Wait, let me be more careful. $`\hat{a}_1\hat{a}_2^\dagger = -\hat{a}_2^\dagger\hat{a}_1 + \delta_{12} = -\hat{a}_2^\dagger\hat{a}_1` (since $`1\neq 2`).

$`\langle\Psi|\hat{N}_1|\Psi\rangle = \langle 0|\hat{a}_2\hat{a}_1\hat{a}_1^\dagger\hat{a}_1\hat{a}_2^\dagger|0\rangle`

$`\hat{a}_1\hat{a}_1^\dagger\hat{a}_1 = \hat{a}_1` (since $`\hat{a}_1\hat{a}_1^\dagger = 1-\hat{a}_1^\dagger\hat{a}_1`, so $`(1-\hat{a}_1^\dagger\hat{a}_1)\hat{a}_1 = \hat{a}_1 - 0 = \hat{a}_1`).

$`= \langle 0|\hat{a}_2\hat{a}_1\hat{a}_2^\dagger|0\rangle`

$`\hat{a}_1\hat{a}_2^\dagger = -\hat{a}_2^\dagger\hat{a}_1 + \delta_{12} = -\hat{a}_2^\dagger\hat{a}_1` (for $`1\neq 2`).

$`= \langle 0|\hat{a}_2(-\hat{a}_2^\dagger\hat{a}_1)|0\rangle = -\langle 0|\hat{a}_2\hat{a}_2^\dagger\hat{a}_1|0\rangle = -\langle 0|(1-\hat{a}_2^\dagger\hat{a}_2)\hat{a}_1|0\rangle = -\langle 0|\hat{a}_1|0\rangle = 0`

Wait, that gives 0, but we expect 1 (particle 1 is in mode 1). Let me redo.

$`\langle\Psi|\hat{N}_1|\Psi\rangle = \langle 0|\hat{a}_2\hat{a}_1\hat{a}_1^\dagger\hat{a}_1\hat{a}_2^\dagger|0\rangle`

First: $`\hat{a}_1\hat{a}_2^\dagger|0\rangle = \hat{a}_1|1,2\rangle = |1\rangle` (annihilates particle in mode 2, leaving mode 1 occupied). Actually, $`\hat{a}_1\hat{a}_2^\dagger|0\rangle = \hat{a}_1|2\rangle = 0` since mode 1 is empty.

Let me use a different approach. $`\hat{N}_1|\Psi\rangle = \hat{a}_1^\dagger\hat{a}_1\hat{a}_1^\dagger\hat{a}_2^\dagger|0\rangle = \hat{a}_1^\dagger(1-\hat{a}_1^\dagger\hat{a}_1)\hat{a}_2^\dagger|0\rangle = \hat{a}_1^\dagger\hat{a}_2^\dagger|0\rangle = |\Psi\rangle`.

So $`\hat{N}_1|\Psi\rangle = |\Psi\rangle`, meaning $`\langle\Psi|\hat{N}_1|\Psi\rangle = 1`. ✓

</details>
</details>

</details>

## Bose-Einstein and Fermi-Dirac statistics

**Definition.** The average occupation of a single-particle state of energy $`\epsilon_i` in thermal equilibrium is:

- Bosons: $`\bar{n}_i = 1/(e^{(\epsilon_i-\mu)/k_BT} - 1)`
- Fermions: $`\bar{n}_i = 1/(e^{(\epsilon_i-\mu)/k_BT} + 1)`

The minus sign (bosons) allows unlimited occupation; the plus sign (fermions) enforces $`\bar{n}_i \leq 1` (Pauli exclusion). These distributions are the quantum generalization of the classical Maxwell-Boltzmann distribution.

<details><summary>Details</summary>

### From the grand canonical ensemble

In the grand canonical ensemble (variable particle number, fixed chemical potential $`\mu`), the partition function for a single mode is:

- Boson: $`Z_i = \sum_{n=0}^{\infty}e^{-\beta(\epsilon_i-\mu)n} = 1/(1-e^{-\beta(\epsilon_i-\mu)})` (geometric series, converges for $`\epsilon_i > \mu`)
- Fermion: $`Z_i = \sum_{n=0}^{1}e^{-\beta(\epsilon_i-\mu)n} = 1+e^{-\beta(\epsilon_i-\mu)}` (only $`n=0,1` allowed)

The average occupation follows from $`\bar{n}_i = -\partial\ln Z_i/\partial\beta(\epsilon_i-\mu)`, giving the formulas above.

**Physical consequences.**

- **Fermi-Dirac:** At $`T=0`, all states below the Fermi energy $`\epsilon_F` are filled, all above are empty. This gives the Fermi pressure that stabilizes white dwarfs and determines the electronic properties of metals. The heat capacity of a metal is linear in $`T` (only electrons near $`\epsilon_F` can be excited), unlike the classical $`3Nk_B/2`.

- **Bose-Einstein:** At low $`T`, bosons accumulate in the ground state (Bose-Einstein condensation). The critical temperature for an ideal gas is $`T_c = \frac{2\pi\hbar^2}{mk_B}\left(n/\zeta(3/2)\right)^{2/3}`. Below $`T_c`, a macroscopic fraction of particles occupies the single-particle ground state, producing a coherent matter wave.

**Connection to Thermodynamics.**

These distributions are the quantum content of [statistical mechanics](../Statistical-Mechanics/Readme.md) and [thermodynamics](../Thermodynamics/Readme.md). The classical limit $`e^{(\epsilon_i-\mu)/k_BT} \gg 1` (low density, high temperature) reduces both to the Maxwell-Boltzmann distribution $`\bar{n}_i \approx e^{-(\epsilon_i-\mu)/k_BT}`.

**Example problem.**

<details><summary>Problem</summary>

A 2D electron gas (free fermions in a square of side $`L`) has density $`n = N/L^2`. Find the Fermi energy $`\epsilon_F` and the density of states at the Fermi level.

<details><summary>Solution</summary>

In 2D, the number of states with wavevector $`k < k_F` is $`N = 2\cdot\pi k_F^2 L^2/(2\pi)^2 = k_F^2 L^2/(2\pi)` (factor of 2 for spin). So $`k_F = \sqrt{2\pi n}`.

$`\epsilon_F = \hbar^2 k_F^2/(2m) = \hbar^2\pi n/m`

The 2D density of states (per unit area, per spin) is $`g(\epsilon) = m/(2\pi\hbar^2)` — constant, independent of energy. Including both spins: $`g(\epsilon) = m/(\pi\hbar^2)`.

This constant density of states is a distinctive feature of 2D systems and leads to the linear-$`T` specific heat of a 2D electron gas.

</details>
</details>

</details>

## Mean-field and approximate methods

**Definition.** Mean-field theory replaces the many-body interaction by an average field: each particle moves in the potential created by all others. Examples include Hartree-Fock (for fermions), the Gross-Pitaevskii equation (for weakly interacting bosons), and density functional theory (DFT). The key approximation is $`\hat{a}_i^\dagger\hat{a}_j^\dagger\hat{a}_l\hat{a}_k \approx \langle\hat{a}_i^\dagger\hat{a}_k\rangle\hat{a}_j^\dagger\hat{a}_l + \cdots` (Wick's theorem / decoupling).

<details><summary>Details</summary>

### Taming the exponential complexity

The exact many-body problem has a Hilbert space of dimension exponential in $`N`. Mean-field methods reduce this to a single-particle problem in an effective potential, at the cost of missing correlations.

**Step 1: Hartree-Fock for fermions.**

For $`N` interacting fermions, the Hartree-Fock ansatz is a single Slater determinant. The effective single-particle Hamiltonian is:

$`\hat{h}_{\text{eff}} = \hat{h}_0 + \sum_j(\hat{J}_j - \hat{K}_j)`

where $`\hat{J}_j` is the direct (Hartree) potential and $`\hat{K}_j` is the exchange (Fock) potential, which has no classical analogue and arises from the antisymmetry of the wavefunction. The equations are solved self-consistently.

**Step 2: Gross-Pitaevskii for bosons.**

For weakly interacting bosons in the condensed state, the many-body problem reduces to a nonlinear Schrödinger equation for the condensate wavefunction $`\psi(\mathbf{r})`:

$`i\hbar\partial_t\psi = \left[-\frac{\hbar^2}{2m}\nabla^2 + V_{\text{ext}} + g|\psi|^2\right]\psi`

where $`g = 4\pi\hbar^2 a_s/m` is the coupling constant (related to the s-wave scattering length $`a_s`). This equation describes Bose-Einstein condensates, superfluids, and solitons.

**Step 3: Beyond mean-field.**

Mean-field misses correlations. Systematic improvements include: configuration interaction (CI), coupled cluster (CC), quantum Monte Carlo, and the renormalization group (see [Quantum field theory](./Quantum-Field-Theory.md)). For strongly correlated systems (high-$`T_c` superconductors, quantum Hall states), no mean-field theory is adequate.

**Example problem.**

<details><summary>Problem</summary>

$`N = 10^4` bosons of mass $`m = 1.44\times10^{-25}` kg (Rb-87) are trapped in a 3D harmonic oscillator with frequency $`\omega = 2\pi\times 100` Hz. The s-wave scattering length is $`a_s = 5.3` nm. Estimate the interaction energy per particle in the condensate (Thomas-Fermi regime).

<details><summary>Solution</summary>

In the Thomas-Fermi regime, the condensate density at the center is approximately:

$`n_0 \approx \left(\frac{15N}{4\pi}\right)^{1/3}\left(\frac{m\omega}{\hbar}\right)^{2/3}`

$`m\omega/\hbar = 1.44\times10^{-25}\times 2\pi\times100/1.055\times10^{-34} \approx 8.6\times10^{11}` m⁻²

$`(m\omega/\hbar)^{2/3} \approx (8.6\times10^{11})^{2/3} \approx 4.2\times10^{7}` m⁻⁴

$`(15N/4\pi)^{1/3} = (15\times10^4/12.57)^{1/3} = (1.19\times10^4)^{1/3} \approx 22.8` m⁻¹

$`n_0 \approx 22.8 \times 4.2\times10^7 \approx 9.6\times10^8` m⁻³

Interaction energy per particle: $`E_{\text{int}}/N \approx gn_0/2 = (4\pi\hbar^2 a_s/m)\,n_0/2`

$`g = 4\pi(1.055\times10^{-34})^2(5.3\times10^{-9})/(1.44\times10^{-25}) \approx 5.3\times10^{-52}` J·m³

$`E_{\text{int}}/N \approx 5.3\times10^{-52}\times 9.6\times10^8/2 \approx 2.5\times10^{-43}` J $`\approx 1.6\times10^{-24}` eV $`\approx 0.012` nK

This is much smaller than the trap level spacing $`\hbar\omega/k_B \approx 0.5` nK, confirming the validity of the Thomas-Fermi (many-particle) regime.

</details>
</details>

</details>

## Quiz

<details><summary>Test your understanding</summary>

**Problem.** A system of $`N` non-interacting spin-½ fermions in a 3D infinite well of volume $`V` is at $`T=0`.

1. Find the Fermi wavevector $`k_F` in terms of $`n = N/V`.
2. Find the total kinetic energy per particle.
3. Show that the pressure is $`P = (2/5)n\epsilon_F`.

<details><summary>Solution</summary>

1. Number of states with $`k < k_F`: $`N = 2\cdot V\cdot(4\pi k_F^3/3)/(2\pi)^3 = Vk_F^3/(3\pi^2)`. So $`k_F = (3\pi^2 n)^{1/3}`.

2. $`\epsilon_F = \hbar^2 k_F^2/(2m) = \hbar^2(3\pi^2 n)^{2/3}/(2m)`. Total energy: $`E = \int_0^{\epsilon_F}\epsilon\,g(\epsilon)\,d\epsilon = (3/5)N\epsilon_F`. Per particle: $`E/N = (3/5)\epsilon_F`.

3. $`P = -\partial E/\partial V = -\partial[(3/5)N\epsilon_F]/\partial V`. Since $`\epsilon_F \propto n^{2/3} \propto V^{-2/3}`:

$`P = -(3/5)N\cdot(-2/3)\epsilon_F/V = (2/5)N\epsilon_F/V = (2/5)n\epsilon_F`. ✓

This is the degeneracy pressure that supports white dwarf stars against gravitational collapse.

</details>
</details>

> **Authoritative sources**
> - [Fetter & Walecka, *Quantum Theory of Many-Particle Systems* (1971)](https://en.wikipedia.org/wiki/Quantum_theory_of_many-particle_systems)
> - [Pethick & Smith, *Bose-Einstein Condensation in Dilute Gases* (2008)](https://en.wikipedia.org/wiki/Bose%E2%80%93Einstein_condensation)