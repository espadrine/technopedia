# Statistical-Mechanics

Statistical mechanics connects microscopic laws with macroscopic thermodynamics. It is relevant whenever many degrees of freedom make direct calculation impossible: gases, solids, liquids, plasmas, spin systems, quantum fields, polymers, biological ensembles, and information engines. It explains temperature, entropy, pressure, chemical potential, phase behavior, fluctuations, and transport from microstate probabilities.

## When it is relevant

Use it when a system has many parts, when macroscopic variables emerge from microscopic states, or when you need to predict response to heat, pressure, chemical exchange, or time-dependent driving. The thermodynamic laws that emerge are developed in [Statistical Foundations of Thermodynamics](../Thermodynamics/Statistical-Foundations-of-Thermodynamics.md).

## Brief history

- Boltzmann linked entropy to the number of compatible microstates.
- Gibbs introduced ensembles for systems in contact with reservoirs.
- Einstein used statistical fluctuations to explain Brownian motion.
- Onsager and Kubo developed linear response and fluctuation-dissipation ideas.

## Categorization

The main classes separate the subject by the defining condition or regime that makes the probability problem distinct.

<table>
<tr><th>Page</th><th>Class</th><th>Defining condition / regime</th><th>Typical use</th><th>Key quantities</th></tr>
<tr><td><a href='./MicrocanonicalEnsemble.md'>MicrocanonicalEnsemble</a></td><td>Microcanonical ensemble</td><td>Isolated system with fixed energy</td><td>Entropy, temperature, isolated gases</td><td>Energy, entropy, microstate count</td></tr>
<tr><td><a href='./CanonicalEnsemble.md'>CanonicalEnsemble</a></td><td>Canonical ensemble</td><td>Fixed temperature through a heat bath</td><td>Equilibrium properties at fixed temperature</td><td>Temperature, free energy, partition function</td></tr>
<tr><td><a href='./GrandCanonicalEnsemble.md'>GrandCanonicalEnsemble</a></td><td>Grand canonical ensemble</td><td>Fixed temperature and chemical potential with particle exchange</td><td>Open systems, gases, superconductivity, reaction equilibrium</td><td>Chemical potential, particle number, grand potential</td></tr>
<tr><td><a href='./PhaseTransitions.md'>PhaseTransitions</a></td><td>Phase transitions</td><td>Collective behavior in large systems</td><td>Order, criticality, universality, material phases</td><td>Order parameter, correlation length, susceptibility</td></tr>
<tr><td><a href='./NonequilibriumStatisticalMechanics.md'>NonequilibriumStatisticalMechanics</a></td><td>Nonequilibrium statistical mechanics</td><td>Time-dependent driving, relaxation, or transport</td><td>Heat flow, diffusion, driven systems, fluctuation theorems</td><td>Currents, entropy production, response functions</td></tr>
</table>

Quantum statistics (Fermi-Dirac, Bose-Einstein, quantum ideal gas) is not a separate class here; it is the occupation-number structure used inside the ensemble pages, especially [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md), and it becomes central in [PhaseTransitions](./PhaseTransitions.md) for quantum spin and field systems.

## How the classes relate

Microcanonical, canonical, and grand canonical ensembles are equilibrium probability measures for different exchange conditions. Quantum statistics supplies the allowed occupation numbers for indistinguishable particles in those ensembles. Phase transitions describe how collective order appears in large systems. Nonequilibrium statistical mechanics describes time-dependent behavior, transport, and relaxation.
