# First Law and Internal Energy

The first law is the conservation of energy applied to thermodynamic systems. It is relevant whenever you need to account for energy transfer between a system and its surroundings: engines, batteries, chemical reactions, phase changes, and material processing. It tells you *how much* energy moves, but not *which direction* (that is the second law).

> **Authoritative sources**
> - [First law of thermodynamics — Wikipedia](https://en.wikipedia.org/wiki/First_law_of_thermodynamics)
> - [Callen, Thermodynamics and an Introduction to Thermostatistics, Ch. 2](https://www.oxfordacademic.com/uk/thermodynamics-and-an-introduction-to-thermostatistics/9780198503935)

## Statement

For a closed system (no mass transfer):

```math
\Delta U = Q - W
```

where $`U` is internal energy, $`Q` is heat added to the system, and $`W` is work done by the system. Equivalently, in differential form:

```math
dU = \delta Q - \delta W
```

<details><summary>Details</summary>

**Sign convention.** The convention above (engineering / physics) takes $`W > 0` when the system does work on the surroundings. IUPAC (chemistry) uses the opposite sign: $`dU = \delta Q + \delta W` where $`W` is work done *on* the system. Always check the convention.

**State function vs. path function.** $`U` is a state function: $`\Delta U` depends only on initial and final states. $`Q` and $`W` are path functions: their values depend on the process. The inexact differentials $`\delta Q`, $`\delta W` (not $`dQ`, $`dW`) reflect this.

**Perpetual motion of the first kind.** A device that produces work with no energy input (no heat, no mass flow) would violate the first law. The first law rules out such a device but does not rule out a 100%-efficient heat engine (that is the second law).

</details>

## Heat

Heat $`Q` is energy transferred between a system and its surroundings *solely due to a temperature difference*. It is a path function (not a state function), which is why it appears as the inexact differential $`\delta Q`. This distinguishes it from internal energy $`U` (a state function) and from work $`W` (another path function, but transferred by means other than a temperature difference).

## Work terms

The most common work terms for a simple compressible system:

```math
\delta W = P\,dV \quad \text{(boundary work)}
```

Other work terms (shaft work, electrical work, surface work) are added as needed:

```math
\delta W = P\,dV + \delta W_{\text{other}}
```

<details><summary>Details</summary>

**$`P\,dV` work.** For a quasi-static (reversible) expansion, the system pressure equals the external pressure at every instant, and the work is the area under the $`P`–$`V` curve:

```math
W = \int_{V_i}^{V_f} P\,dV
```

For an irreversible (free) expansion into vacuum, $`P_{\text{ext}} = 0` and $`W = 0`, even though $`\Delta V \neq 0`.

**Other work.** Electrical work in a battery: $`\delta W_{\text{elec}} = -\mathcal{E}\,dQ_{\text{charge}}`. Shaft work in a turbine: $`\delta W_{\text{shaft}} = \tau\,d\theta`. These are not $`P\,dV` but still count as work in the first law.

</details>

## Internal energy

$`U` is the total microscopic energy of the system: kinetic energy of molecular motion (translation, rotation, vibration) plus potential energy of intermolecular interactions.

```math
U = U(T, V, N, \ldots)
```

For an ideal gas: $`U = U(T)` only (independent of volume).

<details><summary>Details</summary>

**Ideal gas.** For a monatomic ideal gas, $`U = \tfrac{3}{2}Nk_B T`. For a diatomic ideal gas (at moderate $`T`), $`U = \tfrac{5}{2}Nk_B T`. The key point: $`U` depends only on $`T`, not on $`V` or $`P`.

**Real substances.** For a real gas or a condensed phase, $`U = U(T, V)`. The volume dependence comes from intermolecular potential energy. The equation of state (e.g., van der Waals) connects $`P, V, T` and allows you to compute $`(\partial U/\partial V)_T` from thermodynamic identities.

**Reference state.** Only $`\Delta U` is physically meaningful. You choose a reference (e.g., $`U = 0` for an ideal gas at 0 K) and work with differences.

</details>

## Special processes (closed, $`P\,dV` only)

Heat capacities used below: $`C_V = (\partial U/\partial T)_V` (at constant volume) and $`C_P = (\partial H/\partial T)_P` (at constant pressure). For an ideal gas, $`C_P - C_V = nR`.

<table>
<tr><th>Process</th><th>Constraint</th><th>δ <i>Q</i></th><th>δ <i>W</i></th><th>Δ <i>U</i> (ideal gas)</th></tr>
<tr><td>Isobaric</td><td>P = const</td><td>nC<sub><i>P</i></sub>Δ <i>T</i></td><td><i>P</i>Δ <i>V</i></td><td>nC<sub><i>V</i></sub>Δ <i>T</i></td></tr>
<tr><td>Isochoric</td><td>V = const</td><td>Δ <i>U</i></td><td>0</td><td>nC<sub><i>V</i></sub>Δ <i>T</i></td></tr>
<tr><td>Isothermal</td><td>T = const</td><td><i>W</i></td><td>nRTln(<i>V</i><sub><i>f</i></sub>/V<sub><i>i</i></sub>)</td><td>0</td></tr>
<tr><td>Adiabatic (reversible)</td><td><i>Q</i> = 0</td><td>0</td><td>−Δ <i>U</i></td><td>nC<sub><i>V</i></sub>Δ <i>T</i></td></tr>
</table>

<iframe src="./First-Law-and-Internal-Energy.simulation.html" title="P-V diagram of special thermodynamic processes"></iframe>

<details><summary>Details</summary>

**Adiabatic relation.** For a reversible adiabatic process of an ideal gas:

```math
TV^{\gamma - 1} = \text{const}, \quad PV^{\gamma} = \text{const}, \quad P^{1-\gamma}T^{\gamma} = \text{const}
```

where $`\gamma = C_P/C_V`. For a monatomic gas $`\gamma = 5/3`; for diatomic $`\gamma = 7/5`.

**Isothermal.** Since $`\Delta U = 0` for an ideal gas at constant $`T`, all heat input becomes work: $`Q = W = nRT\ln(V_f/V_i)`. This is the basis of the Carnot isothermal steps.

</details>

## Open systems (control volume)

For a control volume with steady mass flow, the first law becomes the steady-flow energy equation:

```math
\dot{Q} - \dot{W} = \dot{m}\left[\left(h + \tfrac{v^2}{2} + gz\right)_{\text{out}} - \left(h + \tfrac{v^2}{2} + gz\right)_{\text{in}}\right]
```

where $`h = u + Pv` is specific enthalpy. See [Thermodynamic Potentials and Equilibrium](./Thermodynamic-Potentials-and-Equilibrium.md) for the definition of enthalpy.

<details><summary>Details</summary>

This equation is the workhorse of turbomachinery (turbines, compressors, nozzles) and heat exchangers. When kinetic and potential energy changes are negligible (common in heat exchangers), it reduces to $`\dot{Q} - \dot{W} = \dot{m}(h_{\text{out}} - h_{\text{in}})`.

</details>

## Example problem

A 2-mol sample of a monatomic ideal gas at 300 K and 1 atm expands reversibly and isothermally to a volume three times its initial volume. Find $`Q`, $`W`, and $`\Delta U`.

<details><summary>Solution</summary>

Isothermal ideal gas: $`\Delta U = 0` (internal energy depends only on $`T`).

Work:
```math
W = nRT\ln\frac{V_f}{V_i} = 2 \times 8.314 \times 300 \times \ln 3 \approx 5480 \text{ J}
```

First law: $`\Delta U = Q - W \Rightarrow Q = W \approx 5480 \text{ J}`.

The gas absorbs 5.48 kJ of heat and does 5.48 kJ of work on the surroundings; its internal energy is unchanged.

</details>