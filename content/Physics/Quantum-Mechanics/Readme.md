# Quantum Mechanics

Quantum mechanics describes systems where the action is comparable to $`\hbar`, or equivalently where the de Broglie wavelength is comparable to the system size. It is relevant for atoms, solids, chemistry, lasers, semiconductors, quantum computing, particle physics, and any system where classical determinism breaks down. It replaces definite trajectories with probability amplitudes, superposition, and the uncertainty principle.

## Brief history

1. 1900: Planck's blackbody law introduced quantized energy exchange.
2. 1905: Einstein's photoelectric effect showed light carries discrete quanta.
3. 1913: Bohr quantized atomic orbits, explaining spectral lines.
4. 1925–1927: Heisenberg, Schrödinger, Dirac, and Born formulated modern quantum mechanics: matrices, waves, and probability amplitudes.

## Main classes

Quantum mechanics is organized by the fundamental structures it introduces: the state space, the measurement process, the dynamics, the many-body extension, and the relativistic field generalization. Each class isolates one aspect of the quantum formalism.

<table>
<tr><th>Page</th><th>Core idea</th><th>Relation to other classes</th></tr>
<tr><td>[Quantum states](./Quantum-States.md)</td><td>Hilbert space, superposition, entanglement, basis and observables, spin and angular momentum</td><td>The foundation: all other classes act on states; reduces to a point in phase space in the large-action (correspondence) limit</td></tr>
<tr><td>[Measurement and uncertainty](./Measurement-and-Uncertainty.md)</td><td>Born rule, projective and POVM measurement, Heisenberg uncertainty, decoherence</td><td>Connects the abstract state to experimental outcomes; explains why classical trajectories emerge; decoherence is a many-body phenomenon (system + environment)</td></tr>
<tr><td>[Quantum dynamics](./Quantum-Dynamics.md)</td><td>Schrödinger equation, time evolution, perturbation theory, scattering, path integrals</td><td>Describes how states change; the Hamiltonian encodes the interactions (see [Interactions](../Interactions/Readme.md)); path integrals provide an independent formulation alongside wave and matrix mechanics</td></tr>
<tr><td>[Quantum many-body](./Quantum-Many-Body.md)</td><td>Identical particles, second quantization, Fock space, Bose/Fermi statistics, mean-field methods</td><td>Extends single-particle QM to variable particle number; provides the framework for condensed matter and quantum statistical mechanics (see [Thermodynamics](../Thermodynamics/Readme.md))</td></tr>
<tr><td>[Quantum field theory](./Quantum-Field-Theory.md)</td><td>Relativistic quantum fields, Feynman diagrams, renormalization, gauge symmetry (general formalism)</td><td>The relativistic extension; provides the general framework on which the [Standard Model](../Standard-Model/Readme.md) builds its specific particle content and gauge group SU(3)×SU(2)×U(1)</td></tr>
</table>



<details><summary>Details</summary>

### What quantum mechanics changes

Quantum mechanics changes two classical assumptions. First, the state of a system is a vector (or density operator) in Hilbert space, not a point in phase space. In the large-action limit ($`S \gg \hbar`), the quantum state reduces to a classical trajectory — the correspondence principle that bridges to [Mechanics](../Mechanics/Readme.md). Second, measurement is an active process that changes the state; this has no classical analogue.

### The Hamiltonian and interactions

The Hamiltonian that drives quantum dynamics encodes the fundamental interactions. The electromagnetic interaction appears in the minimal coupling $`\mathbf{p} \to \mathbf{p} - q\mathbf{A}` (see [Electromagnetism](../Interactions/Electromagnetism/Readme.md)). The strong and weak interactions require the full quantum field theory formalism (see [Quantum field theory](./Quantum-Field-Theory.md)).

### Boundary with the Standard Model

The [Quantum field theory](./Quantum-Field-Theory.md) class covers the *general formalism*: path integrals, Feynman diagrams, renormalization, and gauge symmetry as a mathematical structure. The [Standard Model](../Standard-Model/Readme.md) topic page covers the *specific application*: the gauge group SU(3)×SU(2)×U(1), the particle spectrum (quarks, leptons, Higgs), and the phenomenology of particle physics. In short: QFT is the language; the Standard Model is the sentence it speaks.

### Quantum statistical mechanics

Thermodynamic and statistical properties of quantum systems (blackbody radiation, Fermi-Dirac and Bose-Einstein statistics, quantum phase transitions) are treated in [Thermodynamics](../Thermodynamics/Readme.md) and [Statistical mechanics](../Statistical-Mechanics/Readme.md). Quantum statistical mechanics builds on the [Quantum states](./Quantum-States.md) and [Quantum dynamics](./Quantum-Dynamics.md) classes applied to many identical particles: the grand canonical partition function is a trace over Fock space (see [Quantum many-body](./Quantum-Many-Body.md)).

### Applications and cross-references

- **Lasers and semiconductors:** the quantum description of band structure, stimulated emission, and p-n junctions underlies modern electronics. See [Standard Model](../Standard-Model/Readme.md) for the atomic-scale foundation (atomic physics, nuclear physics).
- **Quantum information and computation:** entanglement (a property of the state space) is the resource for quantum algorithms, quantum error correction, and quantum cryptography. A register of $`n` entangled qubits lives in a $`2^n`-dimensional Hilbert space, enabling exponential speedups for specific problems. This application domain builds directly on the state/measurement/dynamics formalism.
- **Correspondence principle:** when the action of a system is much larger than $`\hbar` (e.g., a baseball, a planet), quantum mechanics reproduces classical mechanics. The uncertainty $`\Delta x \cdot \Delta p \sim \hbar \ll S` becomes negligible, and the particle follows an approximately classical trajectory. This is the explicit bridge to [Mechanics](../Mechanics/Readme.md).

</details>

> **Authoritative sources**
> - [Dirac, *The Principles of Quantum Mechanics* (1930)](https://en.wikipedia.org/wiki/The_Principles_of_Quantum_Mechanics)
> - [Sakurai & Napolitano, *Modern Quantum Mechanics* (2017)](https://www.cambridge.org/us/academic/subjects/physics/quantum-physics-relativity-quantum-optics/modern-quantum-mechanics)
> - [Born, *Zur Quantenmechanik der Stossvorgänge* (Z. Phys. 37, 1926)](https://en.wikipedia.org/wiki/Max_Born)
> - [Peskin & Schroeder, *An Introduction to Quantum Field Theory* (1995)](https://en.wikipedia.org/wiki/An_Introduction_to_Quantum_Field_Theory)
