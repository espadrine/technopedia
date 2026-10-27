# Thermodynamic Cycles and Machines

Thermodynamic cycles are closed loops in state space that convert heat into net work (engines) or use work to pump heat (refrigerators, heat pumps). This page is relevant when sizing or comparing engines and refrigerators, building on the [First Law and Internal Energy](./First-Law-and-Internal-Energy.md) and the [Second Law and Entropy](./Second-Law-and-Entropy.md).

> **Authoritative sources**
> - [Carnot cycle — Wikipedia](https://en.wikipedia.org/wiki/Carnot_cycle)
> - [Rankine cycle — Wikipedia](https://en.wikipedia.org/wiki/Rankine_cycle)
> - [Brayton cycle — Wikipedia](https://en.wikipedia.org/wiki/Brayton_cycle)
> - [Cengel & Boles, Thermodynamics: An Engineering Approach, Ch. 7–9](https://www.pearson.com/)

## Carnot cycle

Four reversible steps: two isothermal, two adiabatic (isentropic).

```math
\eta_{\text{Carnot}} = 1 - \frac{T_C}{T_H}
```

No real engine exceeds this efficiency between the same two reservoirs.

<table><tr><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">V</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">P</text>
<path d="M 60,40 Q 100,35 140,50" fill="none" stroke="blue" stroke-width="2"/>
<text x="100" y="32" font-size="9" fill="blue">1→2 isothermal T_H</text>
<path d="M 140,50 Q 160,70 170,100" fill="none" stroke="red" stroke-width="2"/>
<text x="165" y="78" font-size="9" fill="red">2→3 adiabatic</text>
<path d="M 170,100 Q 130,110 80,115" fill="none" stroke="blue" stroke-width="2"/>
<text x="110" y="125" font-size="9" fill="blue">3→4 isothermal T_C</text>
<path d="M 80,115 Q 65,80 60,40" fill="none" stroke="red" stroke-width="2"/>
<text x="42" y="80" font-size="9" fill="red">4→1 adiabatic</text>
<text x="55" y="38" font-size="10" font-weight="bold">1</text>
<text x="142" y="48" font-size="10" font-weight="bold">2</text>
<text x="172" y="102" font-size="10" font-weight="bold">3</text>
<text x="75" y="118" font-size="10" font-weight="bold">4</text>
</svg>

</td><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">S</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">T</text>
<rect x="60" y="35" width="100" height="70" fill="none" stroke="blue" stroke-width="2"/>
<text x="110" y="30" text-anchor="middle" font-size="9" fill="blue">T_H (isothermal)</text>
<text x="110" y="115" text-anchor="middle" font-size="9" fill="blue">T_C (isothermal)</text>
<text x="55" y="75" text-anchor="end" font-size="9" fill="red">isentropic</text>
<text x="165" y="75" font-size="9" fill="red">isentropic</text>
<text x="55" y="33" font-size="10" font-weight="bold">1</text>
<text x="165" y="33" font-size="10" font-weight="bold">2</text>
<text x="165" y="112" font-size="10" font-weight="bold">3</text>
<text x="55" y="112" font-size="10" font-weight="bold">4</text>
</svg>

</td></tr></table>

<details><summary>Details</summary>

**The four steps** (heat engine mode, working fluid is an ideal gas):

1. **Isothermal expansion** at $`T_H`: absorb $`Q_H`, do work.
2. **Adiabatic expansion**: temperature drops from $`T_H` to $`T_C`.
3. **Isothermal compression** at $`T_C`: reject $`Q_C`, work is done on the gas.
4. **Adiabatic compression**: temperature rises from $`T_C` to $`T_H`.

**Why it is the maximum.** The Carnot cycle is fully reversible. Any irreversibility (friction, finite-$`\Delta T` heat transfer, turbulence) reduces efficiency. The [Second Law and Entropy](./Second-Law-and-Entropy.md) sets the ceiling.

**Practical limitation.** Even at $`T_H = 600` K, $`T_C = 300` K, $`\eta_{\text{Carnot}} = 50\%`. Real steam plants achieve 55–80% of the Carnot limit, depending on technology generation (subcritical ≈ 55–65%, supercritical/ultra-supercritical ≈ 70–80%).

</details>

## Otto cycle (spark-ignition engine)

```math
\eta_{\text{Otto}} = 1 - \frac{1}{r^{\gamma-1}}
```

where $`r = V_{\max}/V_{\min}` is the compression ratio and $`\gamma = C_P/C_V`.

<table><tr><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">V</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">P</text>
<path d="M 60,110 Q 50,70 55,40" fill="none" stroke="red" stroke-width="2"/>
<text x="35" y="75" font-size="9" fill="red">1→2 isentropic</text>
<line x1="55" y1="40" x2="55" y2="20" stroke="blue" stroke-width="2"/>
<text x="58" y="30" font-size="9" fill="blue">2→3 const V</text>
<path d="M 55,20 Q 100,30 160,100" fill="none" stroke="green" stroke-width="2"/>
<text x="110" y="50" font-size="9" fill="green">3→4 isentropic</text>
<line x1="160" y1="100" x2="160" y2="110" stroke="orange" stroke-width="2"/>
<text x="163" y="108" font-size="9" fill="orange">4→1 const V</text>
<text x="55" y="115" font-size="10" font-weight="bold">1</text>
<text x="55" y="37" font-size="10" font-weight="bold">2</text>
<text x="55" y="17" font-size="10" font-weight="bold">3</text>
<text x="163" y="103" font-size="10" font-weight="bold">4</text>
</svg>

</td><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">S</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">T</text>
<line x1="60" y1="110" x2="60" y2="50" stroke="red" stroke-width="2"/>
<text x="42" y="80" font-size="9" fill="red">isentropic</text>
<path d="M 60,50 Q 90,35 130,30" fill="none" stroke="blue" stroke-width="2"/>
<text x="95" y="35" font-size="9" fill="blue">const V</text>
<line x1="130" y1="30" x2="130" y2="100" stroke="green" stroke-width="2"/>
<text x="133" y="65" font-size="9" fill="green">isentropic</text>
<path d="M 130,100 Q 95,115 60,110" fill="none" stroke="orange" stroke-width="2"/>
<text x="95" y="120" font-size="9" fill="orange">const V</text>
<text x="55" y="115" font-size="10" font-weight="bold">1</text>
<text x="55" y="47" font-size="10" font-weight="bold">2</text>
<text x="133" y="28" font-size="10" font-weight="bold">3</text>
<text x="133" y="103" font-size="10" font-weight="bold">4</text>
</svg>

</td></tr></table>

<details><summary>Details</summary>

**Steps:** (1) isentropic compression, (2) constant-volume heat addition (combustion), (3) isentropic expansion (power stroke), (4) constant-volume heat rejection (exhaust).

**Limitation.** High compression ratio increases efficiency but also peak temperature, risking auto-ignition (knock). Practical gasoline engines: $`r \approx 8`–$`12`, $`\eta \approx 30`–$`40\%`.

**Energy accounting.** The [First Law and Internal Energy](./First-Law-and-Internal-Energy.md) applied to each step: $`Q_{\text{in}} = m\,c_V(T_3 - T_2)`, $`Q_{\text{out}} = m\,c_V(T_4 - T_1)`, $`W_{\text{net}} = Q_{\text{in}} - Q_{\text{out}}`.

</details>

## Diesel cycle (compression-ignition engine)

```math
\eta_{\text{Diesel}} = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\rho^\gamma - 1}{\gamma(\rho - 1)}
```

where $`r` is the compression ratio and $`\rho = V_3/V_2` is the cutoff ratio.

<table><tr><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">V</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">P</text>
<path d="M 60,110 Q 50,70 55,40" fill="none" stroke="red" stroke-width="2"/>
<text x="35" y="75" font-size="9" fill="red">1→2 isentropic</text>
<line x1="55" y1="40" x2="120" y2="40" stroke="blue" stroke-width="2"/>
<text x="85" y="35" font-size="9" fill="blue">2→3 const P</text>
<path d="M 120,40 Q 150,70 170,110" fill="none" stroke="green" stroke-width="2"/>
<text x="150" y="70" font-size="9" fill="green">3→4 isentropic</text>
<line x1="170" y1="110" x2="170" y2="115" stroke="orange" stroke-width="2"/>
<text x="173" y="113" font-size="9" fill="orange">4→1 const V</text>
<text x="55" y="115" font-size="10" font-weight="bold">1</text>
<text x="55" y="37" font-size="10" font-weight="bold">2</text>
<text x="123" y="37" font-size="10" font-weight="bold">3</text>
<text x="173" y="113" font-size="10" font-weight="bold">4</text>
</svg>

</td><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">S</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">T</text>
<line x1="60" y1="110" x2="60" y2="50" stroke="red" stroke-width="2"/>
<text x="42" y="80" font-size="9" fill="red">isentropic</text>
<path d="M 60,50 Q 90,35 130,30" fill="none" stroke="blue" stroke-width="2"/>
<text x="95" y="35" font-size="9" fill="blue">const P</text>
<line x1="130" y1="30" x2="130" y2="100" stroke="green" stroke-width="2"/>
<text x="133" y="65" font-size="9" fill="green">isentropic</text>
<path d="M 130,100 Q 95,115 60,110" fill="none" stroke="orange" stroke-width="2"/>
<text x="95" y="120" font-size="9" fill="orange">const V</text>
<text x="55" y="115" font-size="10" font-weight="bold">1</text>
<text x="55" y="47" font-size="10" font-weight="bold">2</text>
<text x="133" y="28" font-size="10" font-weight="bold">3</text>
<text x="133" y="103" font-size="10" font-weight="bold">4</text>
</svg>

</td></tr></table>

<details><summary>Details</summary>

**Steps:** (1) isentropic compression, (2) constant-pressure heat addition (fuel injection), (3) isentropic expansion, (4) constant-volume heat rejection.

**Difference from Otto.** Heat addition at constant pressure (not volume) allows higher compression ratios without knock, since peak temperature is lower for a given heat input. Diesel engines: $`r \approx 15`–$`25`, $`\eta \approx 35`–$`50\%`.

</details>

## Brayton cycle (gas turbine / jet engine)

```math
\eta_{\text{Brayton}} = 1 - \frac{1}{r_p^{(\gamma-1)/\gamma}}
```

where $`r_p = P_{\text{high}}/P_{\text{low}}` is the pressure ratio.

<table><tr><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">V</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">P</text>
<path d="M 60,110 Q 50,70 55,40" fill="none" stroke="red" stroke-width="2"/>
<text x="35" y="75" font-size="9" fill="red">1→2 isentropic</text>
<line x1="55" y1="40" x2="140" y2="40" stroke="blue" stroke-width="2"/>
<text x="95" y="35" font-size="9" fill="blue">2→3 const P</text>
<path d="M 140,40 Q 160,70 170,110" fill="none" stroke="green" stroke-width="2"/>
<text x="155" y="70" font-size="9" fill="green">3→4 isentropic</text>
<line x1="170" y1="110" x2="60" y2="110" stroke="orange" stroke-width="2"/>
<text x="110" y="125" font-size="9" fill="orange">4→1 const P</text>
<text x="55" y="115" font-size="10" font-weight="bold">1</text>
<text x="55" y="37" font-size="10" font-weight="bold">2</text>
<text x="143" y="37" font-size="10" font-weight="bold">3</text>
<text x="173" y="113" font-size="10" font-weight="bold">4</text>
</svg>

</td><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">S</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">T</text>
<line x1="60" y1="110" x2="60" y2="50" stroke="red" stroke-width="2"/>
<text x="42" y="80" font-size="9" fill="red">isentropic</text>
<path d="M 60,50 Q 90,35 130,30" fill="none" stroke="blue" stroke-width="2"/>
<text x="95" y="35" font-size="9" fill="blue">const P</text>
<line x1="130" y1="30" x2="130" y2="100" stroke="green" stroke-width="2"/>
<text x="133" y="65" font-size="9" fill="green">isentropic</text>
<path d="M 130,100 Q 95,115 60,110" fill="none" stroke="orange" stroke-width="2"/>
<text x="95" y="120" font-size="9" fill="orange">const P</text>
<text x="55" y="115" font-size="10" font-weight="bold">1</text>
<text x="55" y="47" font-size="10" font-weight="bold">2</text>
<text x="133" y="28" font-size="10" font-weight="bold">3</text>
<text x="133" y="103" font-size="10" font-weight="bold">4</text>
</svg>

</td></tr></table>

<details><summary>Details</summary>

**Steps:** (1) isentropic compression (compressor), (2) constant-pressure heat addition (combustor), (3) isentropic expansion (turbine), (4) constant-pressure heat rejection (exhaust).

**All four steps are at constant pressure or isentropic** — no volume constraints, making it well-suited to continuous-flow (open) machines like gas turbines and jet engines.

**Energy accounting.** Per the [First Law and Internal Energy](./First-Law-and-Internal-Energy.md): $`w_{\text{comp}} = c_P(T_2 - T_1)`, $`w_{\text{turb}} = c_P(T_3 - T_4)`, $`q_{\text{in}} = c_P(T_3 - T_2)`.

**Regeneration.** A heat exchanger (regenerator) preheats the compressor outlet using the turbine exhaust, reducing fuel consumption. With perfect regeneration, the regenerative Brayton cycle efficiency is $`\eta = 1 - T_2/T_3`. Unlike the Ericsson or Stirling cycles (which achieve Carnot efficiency with perfect regeneration because all external heat transfer occurs isothermally), the regenerative Brayton cycle still falls below Carnot because its heat addition and rejection occur over a range of temperatures at constant pressure.

</details>

## Rankine cycle (steam power plant)

```math
\eta_{\text{Rankine}} = \frac{w_{\text{turbine}} - w_{\text{pump}}}{q_{\text{boiler}}}
```

<table><tr><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">V</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">P</text>
<path d="M 50,115 L 55,110" fill="none" stroke="red" stroke-width="2"/>
<text x="35" y="108" font-size="8" fill="red">pump</text>
<path d="M 55,110 Q 80,60 130,35" fill="none" stroke="blue" stroke-width="2"/>
<text x="85" y="60" font-size="9" fill="blue">boiler</text>
<path d="M 130,35 Q 160,70 175,115" fill="none" stroke="green" stroke-width="2"/>
<text x="155" y="75" font-size="9" fill="green">turbine</text>
<path d="M 175,115 Q 120,125 50,115" fill="none" stroke="orange" stroke-width="2"/>
<text x="110" y="130" font-size="9" fill="orange">condenser</text>
<text x="45" y="120" font-size="10" font-weight="bold">1</text>
<text x="50" y="107" font-size="10" font-weight="bold">2</text>
<text x="133" y="33" font-size="10" font-weight="bold">3</text>
<text x="178" y="118" font-size="10" font-weight="bold">4</text>
</svg>

</td><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">S</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">T</text>
<path d="M 50,115 L 55,110" fill="none" stroke="red" stroke-width="2"/>
<text x="35" y="108" font-size="8" fill="red">pump</text>
<path d="M 55,110 Q 80,50 130,30" fill="none" stroke="blue" stroke-width="2"/>
<text x="80" y="55" font-size="9" fill="blue">boiler</text>
<path d="M 130,30 Q 155,65 170,110" fill="none" stroke="green" stroke-width="2"/>
<text x="155" y="70" font-size="9" fill="green">turbine</text>
<path d="M 170,110 Q 120,120 50,115" fill="none" stroke="orange" stroke-width="2"/>
<text x="110" y="128" font-size="9" fill="orange">condenser</text>
<path d="M 40,120 Q 100,90 180,120" fill="none" stroke="gray" stroke-width="1" stroke-dasharray="3,2"/>
<text x="105" y="95" font-size="8" fill="gray">saturation dome</text>
<text x="45" y="120" font-size="10" font-weight="bold">1</text>
<text x="50" y="107" font-size="10" font-weight="bold">2</text>
<text x="133" y="28" font-size="10" font-weight="bold">3</text>
<text x="173" y="113" font-size="10" font-weight="bold">4</text>
</svg>

</td></tr></table>

<details><summary>Details</summary>

**Steps:** (1) isentropic compression (pump, liquid water), (2) constant-pressure heat addition (boiler: liquid → superheated vapor), (3) isentropic expansion (turbine), (4) constant-pressure heat rejection (condenser: vapor → liquid).

**Why not Brayton for steam?** Water's large latent heat and the ability to condense at low temperature make the Rankine cycle more efficient for high-temperature heat sources (fossil, nuclear, solar thermal).

**Energy accounting.** Per the [First Law and Internal Energy](./First-Law-and-Internal-Energy.md): $`w_{\text{pump}} = v_f(P_2 - P_1)` (small), $`w_{\text{turb}} = h_3 - h_4`, $`q_{\text{boiler}} = h_3 - h_2`.

**Improvements.** Reheat (expand in two turbine stages with intermediate reheating), regenerative feedwater heating (extract steam to preheat feedwater), and supercritical operation ($`P > 22.1\text{ MPa}`) push efficiency toward 60%.

</details>

## Stirling cycle

Two isothermal and two isochoric (constant-volume) processes, with a regenerator between the isochoric legs.

```math
\eta_{\text{Stirling}} = 1 - \frac{T_C}{T_H} \quad (\text{perfect regeneration})
```

With perfect regeneration the Stirling cycle achieves Carnot efficiency, because all external heat transfer occurs isothermally.

<table><tr><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">V</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">P</text>
<path d="M 60,40 Q 100,35 140,50" fill="none" stroke="blue" stroke-width="2"/>
<text x="100" y="32" font-size="9" fill="blue">1→2 isothermal T_H</text>
<line x1="140" y1="50" x2="140" y2="100" stroke="red" stroke-width="2"/>
<text x="143" y="78" font-size="9" fill="red">2→3 isochoric</text>
<path d="M 140,100 Q 100,110 60,115" fill="none" stroke="blue" stroke-width="2"/>
<text x="100" y="125" font-size="9" fill="blue">3→4 isothermal T_C</text>
<line x1="60" y1="115" x2="60" y2="40" stroke="red" stroke-width="2"/>
<text x="42" y="80" font-size="9" fill="red">4→1 isochoric</text>
<text x="55" y="38" font-size="10" font-weight="bold">1</text>
<text x="143" y="48" font-size="10" font-weight="bold">2</text>
<text x="143" y="103" font-size="10" font-weight="bold">3</text>
<text x="55" y="118" font-size="10" font-weight="bold">4</text>
</svg>

</td><td>

<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
<rect width="220" height="160" fill="#fafafa" stroke="#ccc"/>
<line x1="30" y1="130" x2="200" y2="130" stroke="black" stroke-width="1"/>
<line x1="30" y1="130" x2="30" y2="15" stroke="black" stroke-width="1"/>
<text x="110" y="150" text-anchor="middle" font-size="11">S</text>
<text x="12" y="75" text-anchor="middle" font-size="11" transform="rotate(-90,12,75)">T</text>
<line x1="60" y1="35" x2="140" y2="35" stroke="blue" stroke-width="2"/>
<text x="100" y="30" font-size="9" fill="blue">isothermal T_H</text>
<line x1="140" y1="35" x2="140" y2="105" stroke="red" stroke-width="2"/>
<text x="143" y="75" font-size="9" fill="red">isochoric</text>
<line x1="140" y1="105" x2="60" y2="105" stroke="blue" stroke-width="2"/>
<text x="100" y="118" font-size="9" fill="blue">isothermal T_C</text>
<line x1="60" y1="105" x2="60" y2="35" stroke="red" stroke-width="2"/>
<text x="42" y="75" font-size="9" fill="red">isochoric</text>
<text x="55" y="33" font-size="10" font-weight="bold">1</text>
<text x="143" y="33" font-size="10" font-weight="bold">2</text>
<text x="143" y="108" font-size="10" font-weight="bold">3</text>
<text x="55" y="108" font-size="10" font-weight="bold">4</text>
</svg>

</td></tr></table>

<details><summary>Details</summary>

**The four steps:**

1. **Isothermal expansion** at $`T_H`: absorb $`Q_H`, do work.
2. **Isochoric cooling** (constant volume): temperature drops from $`T_H` to $`T_C`. In a real engine, the regenerator absorbs this heat.
3. **Isothermal compression** at $`T_C`: reject $`Q_C`, work is done on the gas.
4. **Isochoric heating** (constant volume): temperature rises from $`T_C` to $`T_H`. The regenerator returns the stored heat.

**The regenerator.** A thermal mass (wire mesh, ceramic) placed between the hot and cold ends. During step 2 it absorbs heat from the working fluid; during step 4 it returns that heat. With perfect regeneration, the only external heat transfers are the two isothermal steps, so the cycle is thermodynamically equivalent to Carnot: $`\eta = 1 - T_C/T_H`.

**Comparison with Ericsson cycle.** The Ericsson cycle replaces the two isochoric legs with two isobaric (constant-pressure) legs, also with a regenerator. Like Stirling, it achieves Carnot efficiency with perfect regeneration because all external heat transfer is isothermal. The key distinction from the regenerative Brayton cycle: in Brayton, heat addition and rejection occur at constant pressure over a *range* of temperatures, so even perfect regeneration cannot make it Carnot-equivalent.

**Practical use.** Stirling engines are used in solar thermal concentrators, cogeneration, and niche automotive applications. Their low speed and quiet operation are advantages; the regenerator adds complexity and limits power density.

</details>

## Comparison of cycles

<table>
<tr><th>Cycle</th><th>Efficiency formula</th><th>Key parameter</th><th>Typical η range</th><th>Primary application</th></tr>
<tr><td>Carnot</td><td>1 − T<sub>C</sub>/T<sub>H</sub></td><td>Temperature ratio T<sub>C</sub>/T<sub>H</sub></td><td>50–65% (theoretical max)</td><td>Reference limit</td></tr>
<tr><td>Otto</td><td>1 − 1/<i>r</i><sup>γ−1</sup></td><td>Compression ratio <i>r</i></td><td>30–40%</td><td>Spark-ignition (gasoline) engines</td></tr>
<tr><td>Diesel</td><td>1 − (1/<i>r</i><sup>γ−1</sup>)(ρ<sup>γ</sup>−1)/(γ(ρ−1))</td><td><i>r</i>, cutoff ratio ρ</td><td>35–50%</td><td>Compression-ignition (diesel) engines</td></tr>
<tr><td>Brayton</td><td>1 − 1/<i>r</i><sub>p</sub><sup>(γ−1)/γ</sup></td><td>Pressure ratio <i>r</i><sub>p</sub></td><td>30–45%</td><td>Gas turbines, jet engines</td></tr>
<tr><td>Rankine</td><td>(<i>w</i><sub>turb</sub> − <i>w</i><sub>pump</sub>)/<i>q</i><sub>boiler</sub></td><td>Boiler pressure, reheat</td><td>35–60%</td><td>Steam power plants (fossil, nuclear)</td></tr>
<tr><td>Stirling</td><td>1 − T<sub>C</sub>/T<sub>H</sub> (perfect regen.)</td><td>Temperature ratio T<sub>C</sub>/T<sub>H</sub></td><td>20–40% (practical)</td><td>Solar thermal, cogeneration</td></tr>
</table>

## Refrigeration and heat pumps

The coefficient of performance (COP) replaces efficiency for devices that move heat:

```math
\mathrm{COP}_{\text{ref}} = \frac{Q_C}{W}, \qquad \mathrm{COP}_{\text{HP}} = \frac{Q_H}{W} = \mathrm{COP}_{\text{ref}} + 1
```

Carnot (reversible) limits:

```math
\mathrm{COP}_{\text{ref,Carnot}} = \frac{T_C}{T_H - T_C}, \qquad \mathrm{COP}_{\text{HP,Carnot}} = \frac{T_H}{T_H - T_C}
```

<details><summary>Details</summary>

**Refrigerator vs. heat pump.** Same cycle, different purpose. A refrigerator removes heat from a cold space ($`Q_C` is the desired output). A heat pump delivers heat to a warm space ($`Q_H` is the desired output). Since $`Q_H = Q_C + W`, the heat-pump COP is always 1 greater than the refrigerator COP.

**Vapor-compression cycle.** The standard refrigeration cycle: (1) isentropic compression of vapor, (2) constant-pressure condensation (heat rejection), (3) isenthalpic throttling (expansion valve), (4) constant-pressure evaporation (heat absorption). The throttling step is irreversible, so real COP < Carnot COP.

**Typical values.** Household refrigerator: COP ≈ 2–4. Air-source heat pump: COP ≈ 2–4. Carnot COP at $`T_H = 293` K, $`T_C = 273` K: $`\mathrm{COP}_{\text{ref}} = 13.7` — real machines achieve 25–35% of the Carnot COP.

</details>

## Interactive simulation

<iframe src="./Thermodynamic-Cycles-and-Machines.simulation.html" title="Interactive P-V and T-S diagrams for thermodynamic cycles"></iframe>

## Example problems

### Problem 1: Carnot heat pump

A Carnot heat pump operates between $`T_H = 300` K (indoor) and $`T_C = 275` K (outdoor). It delivers 10 kW of heating to the indoor space. Find the power input and the rate of heat extracted outdoors.

<details><summary>Solution</summary>

Carnot heat-pump COP:

```math
\mathrm{COP}_{\text{HP}} = \frac{T_H}{T_H - T_C} = \frac{300}{25} = 12
```

Power input:

```math
W = \frac{Q_H}{\mathrm{COP}_{\text{HP}}} = \frac{10\text{ kW}}{12} \approx 0.833 \text{ kW}
```

Heat extracted outdoors:

```math
Q_C = Q_H - W = 10 - 0.833 = 9.17 \text{ kW}
```

The heat pump moves 9.17 kW from outside and adds 0.83 kW of work to deliver 10 kW indoors.

</details>

### Problem 2: Otto cycle efficiency

A spark-ignition engine operates on the ideal Otto cycle with a compression ratio $`r = 10` and $`\gamma = 1.4`. The maximum temperature in the cycle is $`T_3 = 2200` K and the minimum is $`T_1 = 300` K. Find the thermal efficiency and the peak pressure ratio $`P_3/P_1`.

<details><summary>Solution</summary>

**Thermal efficiency:**

```math
\eta_{\text{Otto}} = 1 - \frac{1}{r^{\gamma-1}} = 1 - \frac{1}{10^{0.4}} = 1 - \frac{1}{2.512} \approx 0.602 = 60.2\%
```

**Peak pressure ratio.** From the isentropic compression (1→2):

```math
T_2 = T_1 \cdot r^{\gamma-1} = 300 \times 10^{0.4} = 300 \times 2.512 = 753.6 \text{ K}
```

Constant-volume heat addition (2→3): $`P_3/P_2 = T_3/T_2`:

```math
\frac{P_3}{P_2} = \frac{2200}{753.6} = 2.92
```

Isentropic relation for pressure: $`P_2/P_1 = r^{\gamma} = 10^{1.4} = 25.12`. Therefore:

```math
\frac{P_3}{P_1} = \frac{P_3}{P_2} \cdot \frac{P_2}{P_1} = 2.92 \times 25.12 \approx 73.3
```

The peak pressure is about 73 times the intake pressure. This high ratio is why practical engines limit $`r` to 8–12: beyond that, knock and mechanical stress become prohibitive.

</details>
