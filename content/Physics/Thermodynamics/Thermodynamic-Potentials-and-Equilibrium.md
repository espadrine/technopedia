# Thermodynamic Potentials and Equilibrium

Thermodynamic potentials (enthalpy, Helmholtz free energy, Gibbs free energy, grand potential) answer the question: *which state is stable under a given set of constraints?* This page is relevant for predicting phase coexistence, chemical reaction direction, battery voltage, and material stability. It unifies the first and second laws into a single minimization principle.

> **Authoritative sources**
> - [Thermodynamic potential — Wikipedia](https://en.wikipedia.org/wiki/Thermodynamic_potential)
> - [Gibbs free energy — Wikipedia](https://en.wikipedia.org/wiki/Gibbs_free_energy)
> - [Callen, Thermodynamics and an Introduction to Thermostatistics, Ch. 5](https://www.oxfordacademic.com/uk/thermodynamics-and-an-introduction-to-thermostatistics/9780198503935)

## The fundamental potentials

<table>
<tr><th>Potential</th><th>Definition</th><th>Natural variables</th><th>Minimized at equilibrium when</th></tr>
<tr><td><i>U</i>(<i>S</i>,<i>V</i>,<i>N</i>)</td><td>Internal energy</td><td><i>S</i>, <i>V</i>, <i>N</i></td><td>(<i>S</i>, <i>V</i>, <i>N</i> fixed)</td></tr>
<tr><td><i>H</i>(<i>S</i>,<i>P</i>,<i>N</i>) = <i>U</i> + PV</td><td>Enthalpy</td><td><i>S</i>, <i>P</i>, <i>N</i></td><td>Constant <i>P</i>, <i>S</i>, <i>N</i> (e.g., throttling)</td></tr>
<tr><td><i>F</i>(<i>T</i>,<i>V</i>,<i>N</i>) = <i>U</i> − TS</td><td>Helmholtz free energy</td><td><i>T</i>, <i>V</i>, <i>N</i></td><td>Constant <i>T</i>, <i>V</i>, <i>N</i> (e.g., system in a heat bath at fixed volume)</td></tr>
<tr><td><i>G</i>(<i>T</i>,<i>P</i>,<i>N</i>) = <i>U</i> + PV − TS</td><td>Gibbs free energy</td><td><i>T</i>, <i>P</i>, <i>N</i></td><td>Constant <i>T</i>, <i>P</i>, <i>N</i> (most common: open to atmosphere, in a heat bath)</td></tr>
<tr><td><i>Ω</i>(<i>T</i>,<i>V</i>,μ) = <i>F</i> − μN</td><td>Grand potential</td><td><i>T</i>, <i>V</i>, μ</td><td>Constant <i>T</i>, <i>V</i>, μ (system in contact with both a heat bath and a particle reservoir)</td></tr>
</table>

<details><summary>Details</summary>

**Why these combinations?** Each potential is a Legendre transform of $`U` that replaces an extensive variable with its conjugate intensive variable. For example, $`F = U - TS` replaces $`S` (extensive) with $`T` (intensive, its conjugate via $`T = (\partial U/\partial S)_{V,N}`). At fixed $`T, V`, minimizing $`F` is equivalent to maximizing $`S_{\text{total}}` (system + reservoir), which is the second law.

**Differential forms:**

```math
dU = T\,dS - P\,dV + \mu\,dN
dH = T\,dS + V\,dP + \mu\,dN
dF = -S\,dT - P\,dV + \mu\,dN
dG = -S\,dT + V\,dP + \mu\,dN
d\Omega = -S\,dT - P\,dV - N\,d\mu
```

These are the **fundamental relations**. All thermodynamic properties can be derived from any one potential as a function of its natural variables (it is a *generating function*).

**Microscopic derivation.** The connection to statistical mechanics is direct: $`F = -k_B T \ln Z` (canonical partition function) and $`G = -k_B T \ln \Xi` (isothermal–isobaric partition function). See [Statistical Foundations of Thermodynamics](./Statistical-Foundations-of-Thermodynamics.md).

</details>

## Stability criteria

At equilibrium the relevant potential is at a minimum with respect to internal variables (composition, phase fractions). For the minimum to be stable (not a saddle point), the potential must satisfy convexity/concavity conditions:

- For $`U(S,V,N)`: $`(\partial^2 U/\partial S^2)_{V,N} > 0` (equivalently $`C_V > 0`) and $`(\partial^2 U/\partial V^2)_{S,N} > 0` (equivalently $`\kappa_S > 0`).
- For $`G(T,P,N)`: $`(\partial^2 G/\partial T^2)_{P,N} < 0` (equivalently $`C_P > 0`) and $`(\partial^2 G/\partial P^2)_{T,N} < 0` (equivalently $`\kappa_T > 0`).

These conditions ensure that the equilibrium is physically realizable: a positive heat capacity means adding heat raises temperature (not lowers it), and a positive compressibility means compressing raises pressure (not lowers it).

## Chemical potential and reaction equilibrium

The chemical potential $`\mu_i = (\partial G / \partial N_i)_{T,P,N_{j\neq i}}` is the molar Gibbs free energy of species $`i` in a mixture.

For a reaction $`\sum_i \nu_i A_i = 0` at constant $`T, P`:

```math
\Delta_r G = \sum_i \nu_i \mu_i
```

- $`\Delta_r G < 0`: reaction proceeds forward.
- $`\Delta_r G = 0`: equilibrium.
- $`\Delta_r G > 0`: reaction proceeds in reverse.

<details><summary>Details</summary>

**Standard state and equilibrium constant.** Writing $`\mu_i = \mu_i^\circ + RT\ln a_i` (where $`a_i` is activity), at equilibrium:

```math
\Delta_r G^\circ = -RT\ln K
```

where $`K` is the equilibrium constant. This connects thermodynamics to chemical kinetics and to electrochemistry (Nernst equation: $`\mathcal{E} = \mathcal{E}^\circ - (RT/nF)\ln Q`).

**Batteries.** The maximum electrical work a battery can deliver at constant $`T, P` is $`\Delta G` of the cell reaction. The open-circuit voltage is $`\mathcal{E} = -\Delta G / (nF)`. See also Electrochemistry (future page) for the full treatment of electrode potentials and the Nernst equation.

</details>

## Phase equilibrium and the Gibbs phase rule

Two phases $`\alpha` and $`\beta` of a pure substance coexist when their chemical potentials are equal:

```math
\mu^\alpha(T,P) = \mu^\beta(T,P)
```

For a system with $`C` components and $`P` phases, the Gibbs phase rule gives the number of intensive degrees of freedom:

```math
F = C - P + 2
```

<details><summary>Details</summary>

**Derivation.** Each phase has $`C + 2` intensive variables ($`T, P`, and $`C` composition variables). At equilibrium, $`T` and $`P` are the same in all phases, and $`\mu_i^\alpha = \mu_i^\beta` for each component and each pair of phases. Counting constraints gives $`F = C - P + 2`.

**Examples:**
- Pure substance ($`C=1`), one phase ($`P=1`): $`F = 2` (choose any $`T, P`).
- Pure substance, two phases (e.g., liquid + vapor): $`F = 1` (vapor pressure curve; choose $`T`, then $`P` is fixed).
- Pure substance, three phases (triple point): $`F = 0` (unique $`T, P`).
- Binary alloy ($`C=2`), two phases: $`F = 2` (choose $`T` and one composition).

**Clapeyron and Clausius–Clapeyron equations.** The slope of a phase boundary:

```math
\frac{dP}{dT} = \frac{\Delta S}{\Delta V} = \frac{\Delta H}{T\,\Delta V}
```

For a vapor–liquid transition ($`V_{\text{gas}} \gg V_{\text{liq}}`, ideal gas): $`dP/dT = \Delta H_{\text{mol}}/(RT^2)` (Clausius–Clapeyron), where $`\Delta H_{\text{mol}}` is the molar latent heat (the enthalpy change per mole transferred between phases). This integrates to the familiar vapor-pressure curve.

<iframe src="./Thermodynamic-Potentials-and-Equilibrium.simulation.html" title="Water phase diagram and Gibbs free energy minimization"></iframe>
</details>

## Maxwell relations

From the equality of mixed partials of a potential, e.g. from $`dG = -S\,dT + V\,dP + \mu\,dN`:

```math
\left(\frac{\partial S}{\partial P}\right)_{T,N} = -\left(\frac{\partial V}{\partial T}\right)_{P,N}
```

The four Maxwell relations (one per potential) allow you to compute entropy changes from measurable $`P, V, T` data.

<details><summary>Details</summary>

**All four (pure substance, $`N` fixed):**

```math
\left(\frac{\partial T}{\partial V}\right)_S = -\left(\frac{\partial P}{\partial S}\right)_V \quad (U)
\left(\frac{\partial T}{\partial P}\right)_S = \left(\frac{\partial V}{\partial S}\right)_P \quad (H)
\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial P}{\partial T}\right)_V \quad (F)
\left(\frac{\partial S}{\partial P}\right)_T = -\left(\frac{\partial V}{\partial T}\right)_P \quad (G)
```

**Use.** To find $`(\partial S/\partial T)_P = C_P/T`, or to compute $`(\partial U/\partial V)_T = T(\partial P/\partial T)_V - P` (which vanishes for an ideal gas, confirming $`U = U(T)`).

</details>

## Example problem

At 298 K and 1 atm, the standard Gibbs free energies of formation are: $`\Delta_f G^\circ(\text{H}_2\text{O, l}) = -237.1\,\text{kJ/mol}`, $`\Delta_f G^\circ(\text{H}_2\text{, g}) = 0`, $`\Delta_f G^\circ(\text{O}_2\text{, g}) = 0`. For the reaction $`\text{H}_2 + \tfrac{1}{2}\text{O}_2 \to \text{H}_2\text{O(l)}`, find $`\Delta_r G^\circ` and the maximum electrical work per mole of water produced. What is the corresponding cell voltage ($`n = 2` electrons)?

<details><summary>Solution</summary>

```math
\Delta_r G^\circ = \Delta_f G^\circ(\text{H}_2\text{O}) - \Delta_f G^\circ(\text{H}_2) - \tfrac{1}{2}\Delta_f G^\circ(\text{O}_2) = -237.1 \text{ kJ/mol}
```

Maximum electrical work (at constant $`T, P`): $`w_{\text{elec,max}} = \Delta_r G^\circ = -237.1\,\text{kJ/mol}` (negative sign means work is done *by* the system).

Cell voltage:

```math
\mathcal{E}^\circ = \frac{-\Delta_r G^\circ}{nF} = \frac{237100}{2 \times 96485} \approx 1.23 \text{ V}
```

This is the standard hydrogen fuel-cell voltage.

</details>