# Thermodynamics

Thermodynamics is a direct subtopic of [Physics](../Readme.md). It describes the macroscopic behavior of systems that exchange energy and matter. Use it when macroscopic variables such as pressure, volume, temperature, and composition are sufficient, and microscopic details are not needed. It gives limits for engines and refrigerators, batteries and biological energy conversion, and materials; the classes below develop those limits by law, by cyclic machines, by equilibrium potentials, and by statistical foundations. Rates of heat transfer (conduction, convection, radiation) are treated in transport and fluid-mechanics topics.

## History

- 1824: Carnot analyzes heat engines and identifies the central role of temperature difference.
- 1850s: Joule and Clausius establish the conservation of energy and the first law.
- 1865: Clausius introduces entropy and the second law.
- 1870s: Boltzmann and Gibbs connect entropy to probability and statistical mechanics.

## Categorization

<table>
<tr><th>Page</th><th>Core question</th><th>Central objects</th><th>Relation</th></tr>
<tr><td><a href='./Zeroth-Law-and-Temperature.md'>Zeroth Law and Temperature</a></td><td>What is a thermal state?</td><td><i>T</i></td><td>Defines thermal equilibrium and temperature, the baseline for all other classes.</td></tr>
<tr><td><a href='./First-Law-and-Internal-Energy.md'>First Law and Internal Energy</a></td><td>How is energy conserved?</td><td><i>U</i>, <i>Q</i>, <i>W</i></td><td>Accounts for energy transfer by heat and work in engines, batteries, and material processes.</td></tr>
<tr><td><a href='./Second-Law-and-Entropy.md'>Second Law and Entropy</a></td><td>Which processes are possible?</td><td><i>S</i>, Δ <i>S</i></td><td>Restricts the direction of change and sets the maximum efficiency and coefficient of performance that cyclic machines can approach.</td></tr>
<tr><td><a href='./Thermodynamic-Cycles-and-Machines.md'>Thermodynamic Cycles and Machines</a></td><td>What work or heat transfer can a cyclic device produce?</td><td>η, COP, W<sub>net</sub>, <i>Q</i><sub>H</sub>, <i>Q</i><sub>C</sub></td><td>Applies the first and second laws to Carnot, Otto, Diesel, Rankine, and Brayton cycles, and to refrigeration and heat-pump cycles.</td></tr>
<tr><td><a href='./Thermodynamic-Potentials-and-Equilibrium.md'>Thermodynamic Potentials and Equilibrium</a></td><td>Which state is stable under given constraints?</td><td><i>H</i>, <i>F</i>, <i>G</i>, μ</td><td>Turns the first and second laws into stability criteria. Gibbs free energy and chemical potential are the shared criterion for batteries/electrochemistry and biological energy conversion; phase equilibrium, phase diagrams, and the Gibbs phase rule are the shared criterion for materials. These applications are not separate classes here.</td></tr>
<tr><td><a href='./Statistical-Foundations-of-Thermodynamics.md'>Statistical Foundations of Thermodynamics</a></td><td>How do macroscopic laws emerge from microstates?</td><td><i>Z</i>, <i>k</i><sub>B</sub></td><td>Scoped to deriving <i>S</i> = <i>k</i><sub>B</sub> ln <i>W</i>, partition-function free energies, temperature, and fluctuations.</td></tr>
</table>



<details><summary>How the classes build on each other</summary>

The six classes form a logical progression:

1. **Zeroth Law and Temperature** establishes the concept of thermal equilibrium and defines temperature as the variable that equalizes between systems in contact. Without this, no other law has a state to describe.

2. **First Law and Internal Energy** adds the bookkeeping: energy is conserved, and the change in internal energy equals heat in minus work out. This is an accounting identity with no directionality.

3. **Second Law and Entropy** introduces directionality: not every energy-conserving process is possible. Entropy provides the arrow of time and the quantitative limit on how efficiently heat can be converted to work.

4. **Thermodynamic Cycles and Machines** applies the first and second laws to closed loops (engines, refrigerators, heat pumps). The Carnot cycle is the theoretical upper bound; real cycles (Otto, Diesel, Rankine, Brayton) approach it from below.

5. [Thermodynamic Potentials and Equilibrium](./Thermodynamic-Potentials-and-Equilibrium.md) generalizes the stability question: under fixed $`T, P` the relevant potential is Gibbs free energy $`G`; under fixed $`T, V` it is Helmholtz free energy $`F`. Chemical potential $`\mu` extends the criterion to open systems (batteries, reactions, phase coexistence). Phase transitions and phase diagrams are the macroscopic expression of these stability criteria.

6. **Statistical Foundations of Thermodynamics** derives the macroscopic laws from microstates: entropy as $`S = k_B \ln W`, free energies from partition functions, temperature as $`1/T = \partial S / \partial U`. The full ensemble formalism (microcanonical, canonical, grand canonical) is developed in [Statistical mechanics](../Statistical-Mechanics/Readme.md).

</details>

