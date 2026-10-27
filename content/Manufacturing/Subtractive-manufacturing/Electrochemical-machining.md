# Electrochemical machining

Electrochemical machining (ECM) removes material by anodic dissolution: the workpiece is the anode of an electrochemical cell, and material is dissolved into an electrolyte (typically NaNO₃ or NaCl solution) flowing at high velocity between the tool (cathode) and the workpiece. No physical contact occurs between tool and workpiece, so there is no tool wear and no heat-affected zone. ECM is the preferred process for large-area, complex-shaped cavities in conductive materials where mechanical machining would be too slow or would introduce residual stresses.

> **Authoritative sources**
> - [G. K. Loper, *Manufacturing Processes 3: Electrical Discharge Machining, Electrochemical Machining and Beam Technologies*, Springer, 2023](https://link.springer.com/book/10.1007/978-3-662-70580-3)
> - [Electrochemical machining and allied processes: a comprehensive review, *J. Mater. Sci.*, 2023](https://link.springer.com/article/10.1007/s10008-023-05610-x)

## Governing physics

Material removal follows Faraday's law of electrolysis. The mass removed is proportional to the charge passed:

```math
\dot{m} = \frac{M \cdot I}{n \cdot F}
```

where $`M` is the molar mass (kg/mol), $`I` is the current (A), $`n` is the number of electrons per atom in the dissolution reaction, and $`F = 96\,485` C/mol is Faraday's constant. The current efficiency $`\eta` (typically 0.7–0.95) accounts for side reactions:

```math
\dot{V} = \frac{\eta \cdot M \cdot I}{n \cdot F \cdot \rho}
```

where $`\rho` is the material density (kg/m³) and $`\dot{V}` is the volumetric removal rate (m³/s).

<details><summary>Details</summary>

- **Dissolution mechanism**: at the anode surface, metal atoms lose electrons and enter the electrolyte as cations: $`\text{Fe} \rightarrow \text{Fe}^{2+} + 2e^-`. The electrolyte carries the ions away.
- **Current density**: typically 10–1000 A/cm². Higher current density increases MRR but reduces shape fidelity (the current spreads in the electrolyte gap).
- **Gap control**: the tool–workpiece gap (0.1–1 mm) is maintained by a servo feed. The electrolyte flows at 10–30 m/s through the gap to remove heat and dissolved material.
- **Thermal and mechanical neutrality**: the electrochemical reaction occurs only at the surface; the bulk temperature rise is < 10 °C, so the metallurgical structure is preserved. Unlike grinding or EDM, ECM does not introduce compressive or tensile residual stresses.

</details>

<iframe src="./Electrochemical-machining.simulation.html" title="ECM cell: anode dissolution, electrolyte flow, hydrogen evolution, and servo gap control"></iframe>

## Electrolyte selection

The choice of electrolyte is a key practical decision that trades material removal rate against shape fidelity and surface finish.

<table>
<tr><th>Electrolyte</th><th>Typical concentration</th><th>MRR (relative)</th><th>Passivation tendency</th><th>Shape fidelity</th><th>Surface finish</th><th>Typical application</th></tr>
<tr><td>NaCl</td><td>10–20 %</td><td>High</td><td>Low</td><td>Lower</td><td>Rougher (Ra 2–5 µm)</td><td>High-MRR roughing, large cavities</td></tr>
<tr><td>NaNO₃</td><td>15–25 %</td><td>Moderate</td><td>Moderate</td><td>Higher</td><td>Finer (Ra 0.5–2 µm)</td><td>Finishing, precision airfoils</td></tr>
</table>

<details><summary>Details</summary>

- **NaCl**: the chloride ion is a strong depassivant; it keeps the anode surface active, giving the highest MRR. However, the aggressive chemistry produces more localised dissolution (pitting) and slightly lower shape fidelity. Temperature is kept below 60 °C to limit corrosion of the tool.
- **NaNO₃**: the nitrate ion is a mild oxidiser that allows a thin, uniform passive film to form and re-dissolve, giving smoother, more uniform dissolution. MRR is 20–40 % lower than NaCl, but surface finish and dimensional accuracy are superior.
- **Temperature**: both electrolytes are operated at 40–60 °C. Higher temperature increases conductivity (and MRR) but accelerates passivation and tool corrosion.
- **Flow rate**: 20–100 L/min depending on gap area; the goal is to keep the gap concentration of dissolved metal below the saturation limit to avoid redeposition.

</details>

## Tool (cathode) design

The cathode is the geometric negative of the desired cavity, offset outward by the equilibrium gap.

<details><summary>Details</summary>

- **Equilibrium gap**: the fundamental operating principle of ECM. The servo feed advances the tool at a rate that exactly matches the anodic dissolution rate at the gap surface. At equilibrium, the gap $`g_{\text{eq}}` is the distance at which the current density (and hence dissolution rate) equals the feed rate. If the gap is too small, the current density rises and the tool is pushed back; if too large, the tool advances. The servo system stabilises at $`g_{\text{eq}}`.
- **Offset calculation**: the tool is machined as the negative of the part geometry, offset by $`g_{\text{eq}}` in the normal direction. For a flat surface this is a simple parallel offset; for complex 3-D shapes the offset is computed in CAD (accounting for the fact that the gap is not uniform in corners and edges where the current density is higher).
- **Cathode materials**:
  - **Lead (Pb)**: most common; soft, easy to machine, low cost. Used for large-area contour ECM.
  - **Copper (Cu)**: higher conductivity, used when the tool must also conduct high current over a large area.
  - **Graphite**: used for very high-temperature applications or when the electrolyte is aggressive.
  - **PTFE-lined**: a conductive core (copper or steel) coated with PTFE to isolate non-machining surfaces and prevent stray current.
- **Tool wear**: zero in principle (the cathode does not dissolve), but mechanical wear from electrolyte impingement and thermal expansion can occur over many cycles.

</details>

## Process variants

### Contour ECM (shaped tool)

A shaped cathode (lead, copper, or graphite) is fed toward the workpiece. The tool shape is the negative of the desired cavity, offset by the gap. Used for turbine blade airfoils, die cavities, and large complex shapes.

Key parameters: current $`I` (kA), gap $`g` (mm), electrolyte flow rate (L/min), feed rate (mm/min).

<details><summary>Details</summary>

- **MRR**: 1–2 000 mm³/min (very high for large areas).
- **Tolerance**: ±5–50 µm. Ra 0.5–5 µm.
- **Tool wear**: zero (the cathode does not dissolve).
- **Applications**: turbine blade airfoils (Inconel, titanium), large die cavities, gun barrels (bore finishing).

</details>

### Electrochemical grinding (ECG)

A hybrid of grinding and ECM: an abrasive wheel (cathode) and an electrolyte are used simultaneously. The electrolyte dissolves the material electrochemically, and the abrasive removes the passive oxide layer.

<details><summary>Details</summary>

- **Advantage over pure grinding**: 5–10× faster, no wheel wear, no HAZ, no residual stress.
- **Tolerance**: ±5–20 µm. Ra 0.2–1 µm.
- **Applications**: hardened tool steel, tungsten carbide, superalloy blades, surgical instruments.

</details>

### Electrochemical drilling / deep-hole ECM

A tubular cathode is fed into a pre-drilled hole; the electrolyte flows through the tube and dissolves the bore wall. Used for deep, narrow holes in hardened or superalloy material.

<details><summary>Details</summary>

- **Aspect ratio**: up to 20:1 (depth to diameter).
- **Tolerance**: ±10–50 µm.
- **Applications**: fuel-nozzle orifices, turbine disk cooling holes, gun-barrel bores.

</details>

### Pulsed ECM (PECM)

A pulsed power supply replaces the DC source. The short on-pulse (µs) dissolves material at the surface before the passive film can form; the off-pulse allows the electrolyte to flush the gap. The effective gap is reduced to 10–50 µm (vs. 0.1–1 mm in continuous ECM), dramatically improving shape fidelity and enabling micro-features.

<details><summary>Details</summary>

- **Key parameters**:
  - Pulse on-time: 1–100 µs
  - Pulse off-time: 1–100 µs
  - Peak current density: 100–1000 A/cm² (higher than continuous ECM)
  - Effective gap: 10–50 µm
- **Advantages**: superior shape fidelity (±2–10 µm), finer surface finish (Ra 0.1–1 µm), ability to machine micro-channels and micro-cavities.
- **Limitations**: lower average MRR than continuous ECM (duty cycle < 100 %), more complex power electronics.
- **Applications**: micro-electro-mechanical systems (MEMS), precision die cavities, medical implants, micro-fluidic channels.

</details>

## Safety

<details><summary>Details</summary>

- **Hydrogen gas**: the cathodic reaction $`\text{2H}_2\text{O} + 2e^- \rightarrow \text{H}_2 + 2\text{OH}^-` produces hydrogen at the cathode. The work area must be well ventilated; hydrogen is flammable (4–75 % in air) and can accumulate in enclosed spaces.
- **Spent electrolyte**: contains dissolved metal ions (Fe, Ni, Cr, Co) and metal hydroxides. These are regulated effluents. Typical treatment: pH adjustment to 9–10 with NaOH to precipitate metal hydroxides, followed by filter-press dewatering. The sludge is disposed of as hazardous waste; the clarified water can be recycled.
- **Electrical safety**: ECM cells operate at low voltage (10–30 V) but very high current (kA range). Arc-flash and shock hazards require interlocks and insulated tooling.

</details>

## Example problem

An Inconel 718 turbine blade airfoil (chord 150 mm, span 200 mm, thickness 8 mm) must be machined from a solid billet. The airfoil has a complex 3-D camber line and a minimum wall thickness of 2 mm. The material is solution-treated (no further heat treatment after machining). Which process is most appropriate, and what are the key ECM parameters?

<details><summary>Solution</summary>

1. **Process selection**: Contour ECM. The airfoil is a complex 3-D shape in a superalloy (Inconel 718, HRC ~35 after solution treatment). Mechanical 5-axis milling would take 20–40 h, introduce residual stresses, and require multiple setups. EDM would be too slow for the large area. ECM removes the material in 2–4 h with no HAZ and no residual stress.
2. **Electrolyte**: 20 % NaNO₃ in water, flow rate 50 L/min, temperature 40–50 °C.
3. **Current**: 2–5 kA (current density ~300 A/cm² on the active area).
4. **Gap**: 0.5 mm, maintained by a 5-axis servo feed.
5. **Tool**: a shaped lead cathode, the negative of the airfoil offset by 0.5 mm.
6. **Tolerance**: ±20 µm on the airfoil profile. Ra 1–2 µm.
7. **Post-processing**: a light ECG pass (Ra 0.5 µm) on the pressure and suction surfaces if required by the aerodynamic specification.

</details>
