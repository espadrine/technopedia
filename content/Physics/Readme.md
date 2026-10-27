# Physics

Physics is the study of matter, energy, space, and time. It is relevant whenever a problem can be reduced to measurable quantities, laws of motion, fields, conservation laws, or probabilities. It provides the foundation for engineering, chemistry, astronomy, materials science, and computing.

## Brief history

1. Antiquity: natural philosophy separated qualitative ideas from quantitative measurement.
2. 1687: Newton's *Principia* unified terrestrial and celestial motion under mechanics.
3. 1865: Maxwell unified electricity, magnetism, and light as a single field theory.
4. 1900–1975: quantum theory, relativity, and quantum field theory replaced absolute space, time, and deterministic particles, and identified the strong and weak interactions.

## Main classes

Physics is organized by the fundamental aspects of reality it isolates. The four categories group subtopics by the principle they describe: motion and force, energy and entropy, the fundamental interactions, and the quantum structure of matter. Real problems combine them, but each category isolates one principle. Use Mechanics for motion and force analysis; Thermodynamics for macroscopic energy limits and entropy; Interactions for field and force descriptions; Standard Model for quantum matter, particles, and cosmology at all scales.

<table>
<tr><th>Page</th><th>Principle</th><th>Subtopics</th><th>Relation to other categories</th></tr>
<tr><td><a href="./Mechanics/Readme.md">Mechanics</a></td><td>Motion and force</td><td>Space, motion, force, momentum</td><td>Provides the Hamiltonian and equations of motion that Thermodynamics and the Standard Model build upon; Mechanics is the large-action limit of quantum mechanics</td></tr>
<tr><td><a href="./Thermodynamics/Readme.md">Thermodynamics</a></td><td>Macroscopic energy and entropy</td><td>Work, energy, conservation laws, heat, entropy</td><td>Macroscopic limit of statistical mechanics applied to many-body systems; sets energy and entropy constraints on all physical processes</td></tr>
<tr><td><a href="./Interactions/Readme.md">Interactions</a></td><td>Field description of the fundamental forces</td><td>Gravity (mass, gravitational field, spacetime, attraction, relativity), electromagnetism (charge, electromagnetic fields, Maxwell equations), strong force, weak force</td><td>Field-theoretic description of each fundamental force; quantized in the Standard Model to give gauge bosons and particle interactions</td></tr>
<tr><td><a href="./Standard-Model/Readme.md">Standard Model</a></td><td>Quantum matter and cosmology</td><td>Elementary particles, nuclear physics, atomic physics, cosmology</td><td>Quantum description of matter and forces; reduces to <a href="./Mechanics/Readme.md">Mechanics</a> via the correspondence principle; built on the <a href="./Quantum-Mechanics/Readme.md">quantum mechanics</a> formalism</td></tr>
</table>



<details><summary>Details</summary>

### How the categories connect

The four categories form a dependency structure. [Quantum mechanics](./Quantum-Mechanics/Readme.md) is the prerequisite formalism for the Standard Model, and [statistical mechanics](./Statistical-Mechanics/Readme.md) is the bridge between Mechanics and Thermodynamics.

**Mechanics → Thermodynamics.** [Statistical mechanics](./Statistical-Mechanics/Readme.md) derives the laws of thermodynamics from the microstates of a system. Given the Hamiltonian (from Mechanics) and the number of particles, one computes entropy, temperature, and free energy. Thermodynamics is thus the macroscopic limit of Mechanics applied to many-body systems.

**Mechanics → Interactions.** Newton's second law $`F = ma` is the starting point for every interaction. Gravity, electromagnetism, and the nuclear forces are all specified by the force (or field) they exert on matter. Relativity modifies the kinematic framework: at speeds near $`c`, Galilean transformations are replaced by Lorentz transformations, and gravity becomes spacetime curvature.

**Interactions → Standard Model.** Each interaction described by a field has a quantum counterpart: electromagnetism becomes QED, the strong force becomes QCD, the weak force is described by electroweak theory. In the quantum description, forces are mediated by gauge bosons rather than continuous fields. The Standard Model unifies the particle content with the quantum description of the interactions.

**Standard Model → Mechanics.** [Quantum mechanics](./Quantum-Mechanics/Readme.md) replaces the definite trajectories of Mechanics with probability amplitudes. In the large-action limit, quantum mechanics reproduces Mechanics (correspondence principle). Atoms, radioactivity, and elementary particles are quantum phenomena with no analogue in Mechanics.

### Field description vs. quantum description

The Interactions category gives the field-theoretic description of each force. The Standard Model gives the quantum description: quantized fields, gauge symmetries, and the particle spectrum. The two are successive approximations — the field description is recovered from the quantum one in the limit of large occupation numbers or large action.

### Learning path

A common sequence mapped to categories: [Mechanics](./Mechanics/Readme.md) → [Thermodynamics](./Thermodynamics/Readme.md) (via [statistical mechanics](./Statistical-Mechanics/Readme.md)) → [Interactions](./Interactions/Readme.md) (electromagnetism, relativity) → [Standard Model](./Standard-Model/Readme.md) (via [quantum mechanics](./Quantum-Mechanics/Readme.md), quantum field theory).

</details>

> **Authoritative sources**
> - [Encyclopaedia Britannica: Physics](https://www.britannica.com/science/physics)
