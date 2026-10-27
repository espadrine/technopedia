# Second Law and Entropy

The second law states which processes are possible and sets the ultimate efficiency limit for any heat engine. It is relevant whenever you need to determine the direction of a spontaneous process, the maximum work extractable, or the minimum work required for a separation or refrigeration task. It is the law that makes thermodynamics predictive rather than merely bookkeeping.

> **Authoritative sources**
> - [Second law of thermodynamics — Wikipedia](https://en.wikipedia.org/wiki/Second_law_of_thermodynamics)
> - [Clausius, "Ueber die bewegende Kraft der Wärme," Annalen der Physik und Chemie 155, 368–397, 500–524 (1850)](https://onlinelibrary.wiley.com/doi/10.1002/andp.18501550306)
> - [Callen, Thermodynamics and an Introduction to Thermostatistics, Ch. 4](https://www.oxfordacademic.com/uk/thermodynamics-and-an-introduction-to-thermostatistics/9780198503935)

## Kelvin–Planck and Clausius statements

- **Kelvin–Planck:** No cyclic device can convert heat from a single reservoir entirely into work.
- **Clausius:** No cyclic device can transfer heat from a colder body to a hotter body with no other effect.

These are equivalent formulations of the second law.

<details><summary>Details</summary>

**Equivalence proof sketch.** Assume Kelvin–Planck is false: a device converts $`Q_C` from a single reservoir at $`T_C` entirely into work $`W = Q_C`. Use that work to drive a Carnot refrigerator between $`T_C` and $`T_H`, pumping heat $`Q_C'` from $`T_C` to $`T_H`. Net effect: heat flows from $`T_C` to $`T_H` with no other change — violating Clausius. The reverse argument works similarly.

**Practical meaning.** A heat engine *must* reject waste heat to a cold sink. A refrigerator *must* consume work (or a higher-temperature heat input) to pump heat upward. These are not engineering limitations; they are fundamental.

</details>

## Entropy

Entropy $`S` is a state function defined for a reversible process by:

```math
dS = \frac{\delta Q_{\text{rev}}}{T}
```

For any process between two equilibrium states:

```math
\Delta S = S_f - S_i = \int_i^f \frac{\delta Q_{\text{rev}}}{T}
```

<details><summary>Details</summary>

**State function.** Although $`\delta Q` is path-dependent, $`\delta Q_{\text{rev}}/T` is an exact differential. The entropy change between two states is the same regardless of the actual path; you compute it along any convenient reversible path connecting the same states.

**Units.** $`[S] = \text{J/K}`. Molar entropy: J/(mol·K). Specific entropy: J/(kg·K).

**Absolute entropy (third law).** The third law states $`S \to 0` as $`T \to 0` for a perfect crystal. This gives entropy an absolute zero, unlike internal energy.

**Statistical meaning.** $`S = k_B \ln W` (Boltzmann) or $`S = -k_B \sum_i p_i \ln p_i` (Gibbs/von Neumann). See [Statistical Foundations of Thermodynamics](./Statistical-Foundations-of-Thermodynamics.md) for the microstate counting.

</details>

## Clausius inequality

For any cyclic process:

```math
\oint \frac{\delta Q}{T} \leq 0
```

Equality holds for a reversible cycle; strict inequality for an irreversible one.

For a process between two states (not necessarily cyclic):

```math
\Delta S \geq \int \frac{\delta Q}{T}
```

where the integral is over the *actual* (possibly irreversible) path.

<details><summary>Details</summary>

**Derivation sketch.** Consider a system undergoing an irreversible process from state 1 to state 2. Connect state 2 back to state 1 by a reversible path. The total cycle is irreversible, so $`\oint \delta Q/T < 0`. Splitting the integral:

```math
\int_1^2 \frac{\delta Q_{\text{irr}}}{T} + \int_2^1 \frac{\delta Q_{\text{rev}}}{T} < 0
```

The second integral is $`-(S_2 - S_1) = -\Delta S`. Therefore $`\Delta S > \int_1^2 \delta Q_{\text{irr}}/T`.

**Isolated system.** If $`Q = 0` (adiabatic, isolated), then $`\Delta S \geq 0`. Entropy of an isolated system never decreases. This is the most common form used to judge spontaneity.

</details>

### Entropy production

For an irreversible process, the entropy production is:

```math
\sigma = \Delta S - \int \frac{\delta Q}{T} \geq 0
```

or in rate form $`\dot{\sigma} \geq 0`. By the Gouy–Stodola theorem, the lost work (exergy destruction) is $`W_{\text{lost}} = T_0\,\sigma`, where $`T_0` is the environment temperature.

<details><summary>Details</summary>

**Connection to lost work.** In any real (irreversible) process, some work potential is destroyed. The Gouy–Stodola theorem quantifies this: the exergy destroyed equals the environment temperature times the entropy produced. For a reversible process, $`\sigma = 0` and no exergy is destroyed. For an irreversible process, $`\sigma > 0` and the lost work is proportional to the irreversibility.

**Engineering use.** In cycle analysis, the entropy production rate identifies where in a power plant or refrigeration system the largest losses occur (combustion, throttling, friction, heat transfer). See [Thermodynamic Cycles and Machines](./Thermodynamic-Cycles-and-Machines.md) for the cycle-by-cycle analysis.

</details>

<iframe src="./Second-Law-and-Entropy.simulation.html" title="Free expansion and entropy increase"></iframe>

## Entropy change for common processes (ideal gas)

```math
\Delta S = nC_V\ln\frac{T_f}{T_i} + nR\ln\frac{V_f}{V_i}
```

Equivalently:

```math
\Delta S = nC_P\ln\frac{T_f}{T_i} - nR\ln\frac{P_f}{P_i}
```

<details><summary>Details</summary>

**Isothermal expansion** ($`T_f = T_i`): $`\Delta S = nR\ln(V_f/V_i) > 0` for expansion.

**Adiabatic reversible** ($`Q = 0`, reversible): $`\Delta S = 0` (isentropic).

**Free expansion** (irreversible, adiabatic, ideal gas): $`\Delta S = nR\ln(V_f/V_i) > 0`. Even though $`Q = 0`, entropy increases because the process is irreversible.

**Mixing.** When two different ideal gases mix at the same $`T, P`, the entropy of mixing is $`\Delta S_{\text{mix}} = -nR\sum_i x_i \ln x_i > 0`. This is a purely entropic driving force (no enthalpy change for ideal gases).

</details>

## Carnot efficiency

For a reversible (Carnot) engine operating between reservoirs at $`T_H` and $`T_C`:

```math
\eta_{\text{Carnot}} = 1 - \frac{T_C}{T_H}
```

This relation defines the absolute temperature ratio $`T_H/T_C = Q_H/Q_C`; see [Zeroth Law and Temperature](./Zeroth-Law-and-Temperature.md) for the full discussion of the temperature scale.

<details><summary>Details</summary>

**No engine can exceed Carnot.** Suppose an engine E has efficiency $`\eta_E > \eta_{\text{Carnot}}`. Run E forward and a Carnot refrigerator (the reverse of a Carnot engine) backward, both between the same reservoirs, sized so they exchange the same heat with the cold reservoir. The net effect: heat is drawn from the hot reservoir and fully converted to work, with no other change — a perpetual motion machine of the second kind, forbidden by the second law.

See [Thermodynamic Cycles and Machines](./Thermodynamic-Cycles-and-Machines.md) for the full Carnot cycle analysis.

</details>

## Example problem

One mole of an ideal gas ($`C_V = \tfrac{3}{2}R`) at 300 K, 1 atm undergoes a free expansion into a vacuum until its volume is doubled. Find $`\Delta S` of the gas and of the universe. Then: what is the minimum work required to compress the gas back to its original volume isothermally at 300 K?

<details><summary>Solution</summary>

**Part 1: Entropy change.**

Free expansion: $`Q = 0`, $`W = 0`, so $`\Delta U = 0` and $`T_f = T_i = 300\text{ K}` (ideal gas).

Entropy change (compute along a reversible isothermal path between the same states):

```math
\Delta S_{\text{gas}} = nR\ln\frac{V_f}{V_i} = 1 \times 8.314 \times \ln 2 \approx 5.76 \text{ J/K}
```

The surroundings exchange no heat ($`Q = 0`), so $`\Delta S_{\text{surr}} = 0`.

```math
\Delta S_{\text{universe}} = 5.76 \text{ J/K} > 0
```

The process is irreversible (as expected for a free expansion), and the total entropy increases.

**Part 2: Minimum work to restore the original state.**

To compress the gas back isothermally at 300 K from $`V_f = 2V_i` to $`V_i`, the minimum work is the reversible isothermal compression work:

```math
W_{\min} = nRT\ln\frac{V_f}{V_i} = 8.314 \times 300 \times \ln 2 \approx 1729 \text{ J}
```

This equals $`T_0\,\Delta S_{\text{universe}} = 300 \times 5.76 \approx 1728 \text{ J}` (rounding). The entropy increase quantifies the lost work potential (exergy): the free expansion destroyed 1729 J of useful work that can never be recovered without expending at least that much work to undo the process.

</details>