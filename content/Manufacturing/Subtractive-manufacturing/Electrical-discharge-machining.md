# Electrical discharge machining

Electrical discharge machining (EDM) removes material by a series of rapid electrical discharges (sparks) between a tool electrode and the workpiece, both submerged in a dielectric fluid. Each spark creates a small crater; compare with [Electrochemical machining](./Electrochemical-machining.md), which removes material by anodic dissolution.

> **Authoritative sources**
> - [ISO 14137:2015, Test conditions for wire electrical-discharge machines](https://www.iso.org/standard/60023.html)
> - [Albinski, Musiol, Miernikiewicz, Labuz, Malota, "Plasma temperature in the electrical discharge machining process", Plasma Sources Sci. Technol. 5:736, 1996](https://doi.org/10.1088/0963-0252/5/4/015)
> - [Bergs, Klocke (eds.), *Manufacturing Processes 3: Electrical Discharge Machining, Electrochemical Manufacturing and Beam Processes*, Springer, 2013](https://link.springer.com/book/10.1007/978-3-662-70580-3)

## Governing physics

EDM is a thermal process: each spark deposits a small, localised energy pulse into the workpiece surface, heating it above the boiling point and ejecting the resulting vapor. The process is governed by four sequential physical events that repeat at a frequency of 10³–10⁵ Hz.

### Dielectric breakdown

The electrode and workpiece are separated by a gap $`g` (10–100 µm) filled with a dielectric fluid. A DC voltage $`V` (100–300 V) is applied across the gap. When the electric field exceeds the dielectric strength of the fluid (~300 V/µm for kerosene), the fluid ionises: free electrons accelerate, collide with molecules, and trigger an electron avalanche. The gap transitions from an insulator to a conducting plasma in a few nanoseconds.

### Plasma channel formation

Once breakdown occurs, a narrow plasma channel (diameter ~10–100 µm) forms between the two electrodes. The channel temperature reaches ≈ 8 000–12 000 K (measured by Albinski et al., 1996). The plasma expands thermally, generating a local pressure of 5–10 MPa that drives material outward from the discharge zone.

### Thermal erosion

The plasma channel heats the workpiece surface above its boiling point. Material is vaporised and ejected by the combined action of the expanding plasma pressure and the surrounding dielectric pressure. The electrode surface is simultaneously eroded (electrode wear). The volume removed per spark is proportional to the spark energy divided by the energy needed to heat and vaporise the material.

### Discharge cycle

The full cycle repeats continuously:

1. **Voltage build-up** – the gap is charged to the set voltage (off-time from the previous spark).
2. **Breakdown** – the dielectric breaks down; the plasma channel forms.
3. **Discharge** – current flows for the pulse-on time $`t_{on}`; material is eroded.
4. **Off-time** – the voltage is removed for $`t_{off}`; the plasma de-ionises, debris is flushed from the gap, and the dielectric recovers its insulating properties.
5. **Repeat** – the cycle restarts.

The energy delivered per spark is:

```math
E_{spark} = I \cdot V \cdot t_{on}
```

where $`I` is the discharge current, $`V` the gap voltage, and $`t_{on}` the pulse-on time. The volume of material removed per spark scales as:

```math
V_{spark} \propto \frac{E_{spark}}{\rho\, c_p\, \Delta T + \rho\, L_v}
```

where $`\rho` is density, $`c_p` specific heat, $`\Delta T` the temperature rise to the boiling point, and $`L_v` the latent heat of vaporisation. This explains why high-melting-point materials (WC, $`T_m \approx 3143` K) remove more slowly than low-melting-point materials (Al, $`T_m \approx 933` K) at the same pulse energy.

<details><summary>Discharge cycle diagram and MRR trade-off</summary>

**Voltage vs. time (one discharge cycle):**

<table>
<tr><th>Phase</th><th>Duration</th><th>Gap voltage</th><th>Gap current</th><th>Physical event</th></tr>
<tr><td>Build-up</td><td><i>t</i><sub>off</sub> (50–500 µs)</td><td>Rises to <i>V</i><sub>set</sub></td><td>0</td><td>Dielectric re-insulates; debris flushed</td></tr>
<tr><td>Breakdown</td><td>~10 ns</td><td><i>V</i><sub>set</sub> → <i>V</i><sub>arc</sub></td><td>0 → <i>I</i><sub>peak</sub></td><td>Electron avalanche; plasma channel forms</td></tr>
<tr><td>Discharge</td><td><i>t</i><sub>on</sub> (5–500 µs)</td><td><i>V</i><sub>arc</sub> (20–50 V)</td><td><i>I</i> (1–300 A)</td><td>Plasma erodes both surfaces</td></tr>
<tr><td>De-ionisation</td><td>~100 ns</td><td><i>V</i><sub>arc</sub> → 0</td><td><i>I</i> → 0</td><td>Plasma cools; ions recombine</td></tr>
</table>

**MRR vs. pulse-on time (schematic, steel workpiece, kerosene dielectric):**

<table>
<tr><th><i>t</i><sub>on</sub> (µs)</th><th>MRR at 10 A (mm³/min)</th><th>MRR at 100 A (mm³/min)</th><th>Ra at 10 A (µm)</th><th>Ra at 100 A (µm)</th></tr>
<tr><td>5</td><td>0.1</td><td>1.5</td><td>0.2</td><td>1.0</td></tr>
<tr><td>20</td><td>0.5</td><td>5</td><td>0.5</td><td>2.0</td></tr>
<tr><td>50</td><td>1.5</td><td>12</td><td>1.0</td><td>3.5</td></tr>
<tr><td>100</td><td>3</td><td>20</td><td>2.0</td><td>5.0</td></tr>
<tr><td>200</td><td>6</td><td>35</td><td>4.0</td><td>8.0</td></tr>
<tr><td>500</td><td>15</td><td>60</td><td>8.0</td><td>12</td></tr>
</table>

The trade-off is clear: longer $`t_{on}` and higher $`I` increase MRR but degrade surface finish. Roughing uses high energy; finishing uses low energy.

</details>



## Dielectric fluid

The dielectric fluid serves three simultaneous roles:

1. **Electrical insulation** – the fluid must withstand the gap voltage between sparks, then break down at a controlled voltage to initiate the discharge. After the spark, it must de-ionise during the off-time to prevent re-striking.
2. **Flushing** – the fluid removes eroded debris (metal particles, vapor) from the gap. Inadequate flushing causes short circuits and unstable discharge.
3. **Cooling** – the fluid quenches the plasma channel and the workpiece surface, limiting the depth of the heat-affected zone.

**Hydrocarbon dielectrics** (kerosene, EDM oil) are the standard for sinker EDM. They provide good insulation, moderate flushing, and leave a thin carbon deposit on the surface (which can be beneficial for mould polishability). Their higher viscosity limits flushing in very narrow gaps.

**Aqueous dielectrics** (deionised water) are used for wire EDM and hole-drilling EDM. They offer better flushing (lower viscosity), higher dielectric strength, and no carbon deposit. They require continuous filtration to remove metal particles.

The dielectric choice affects the recast layer thickness and surface chemistry: hydrocarbon dielectrics produce a slightly thicker recast layer with a carbon-rich surface; aqueous dielectrics produce a thinner, cleaner recast layer.

## Sinker (die-sinking) EDM

A shaped electrode (copper, graphite, or copper-tungsten) is lowered toward the workpiece. A servo-controlled gap (10–100 µm) is maintained; when the gap closes below a threshold, a spark fires and erodes both the electrode and the workpiece.

Key parameters: pulse-on time $`t_{on}` (µs), pulse-off time $`t_{off}` (µs), discharge current $`I` (A), spark gap $`g` (µm), dielectric type (kerosene, deionised water).

<details><summary>Details</summary>

- **Electrode materials**: copper (finishing, good surface transfer), graphite (roughing, low wear, self-sharpening), copper-tungsten (hard materials like carbide, high melting point). Brass is used for hole-drilling electrodes.
- **Material removal per spark**: $`V \propto E_{spark} / (\rho c_p \Delta T + \rho L_v)` where $`E_{spark}` is the spark energy. Typical: 0.001–0.1 mm³ per spark.
- **Electrode wear**: the electrode also erodes. Copper wears ~10–30% of the workpiece removal; graphite wears ~5–15%. For precision work, the electrode is over-sized to compensate.
- **Surface finish**: controlled by pulse energy. Fine finish (Ra 0.2–1 µm) uses short $`t_{on}` (5–20 µs) and low current (1–5 A). Roughing (Ra 5–10 µm) uses long $`t_{on}` (100–500 µs) and high current (50–300 A).
- **Tolerance**: ±0.005–0.02 mm achievable. The spark gap sets the minimum feature size.
- **Applications**: die cavities (injection moulds, forging dies), deep narrow slots, complex 3-D shapes in hardened tool steel, tungsten carbide, titanium, superalloys.

</details>

## Wire EDM

A thin wire (0.1–0.3 mm diameter, brass or copper-clad steel) acts as the electrode and is continuously fed through the workpiece. The wire is strung between upper and lower guides and follows a CNC-defined path.

Key parameters: wire diameter $`d_w` (mm), discharge current $`I` (A), wire feed speed (m/min), cut speed (mm/min), spark gap (µm).

<details><summary>Details</summary>

- **Kerf**: equal to the wire diameter (0.1–0.3 mm). The cut tapers slightly due to wire deflection under tension.
- **Tolerance**: ±0.005 mm. Ra 1–3 µm typical.
- **Through-cut only**: the wire must enter and exit the workpiece, so internal features require a pre-drilled entry hole.
- **Materials**: any electrically conductive material. Hardness is not a limiting factor, but resistivity and thermal conductivity affect MRR.
- **Applications**: moulds and dies, hardened parts, thin-walled components, aerospace components (titanium, Inconel), medical implants.
- **Multi-wire EDM**: a second, thinner wire (0.1 mm) trims the first cut for ±0.002 mm tolerance.

</details>

## Hole-drilling EDM

A rotating tubular electrode (brass or copper, Ø 0.1–10 mm) drills deep, small-diameter holes with deionised water flushing through the tube lumen. The electrode advances incrementally; each spark erodes a small annular volume at the tip.

Key parameters: electrode diameter, rotation speed (1000–3000 rpm), feed rate (µm/rev), discharge current (0.5–5 A), water pressure (0.5–2 MPa).

<details><summary>Details</summary>

- **Aspect ratio**: up to 100:1 (e.g. Ø 0.5 mm × 50 mm deep).
- **Tolerance**: ±0.01–0.05 mm.
- **Surface finish**: Ra 0.5–2 µm.
- **Applications**: turbine blade cooling holes, starter holes for wire EDM, fuel-injector orifices, medical device channels.
- **Distinction from sinker/wire**: the electrode is a closed tube (not a shaped solid or a continuous wire), the flushing is through the electrode lumen (not external jets), and the process is a drilling operation (not a contouring operation). Listed as a distinct type in the ISO 14137 test-conditions vocabulary.

</details>

## Micro-EDM (parameter regime)

Micro-EDM is not a separate machine type but a parameter regime of sinker or wire EDM: sub-millimetre electrodes (or wires < 0.1 mm), very low pulse energies ($`t_{on}` < 5 µs, $`I` < 1 A), and deionised water dielectric for flushing the tiny gap. It produces features below 100 µm with ±1–5 µm tolerance and Ra 0.2–1 µm. Applications include micro-nozzles, micro-dies, MEMS components, and medical micro-tools. The main challenge is maintaining stable discharge in a gap < 50 µm where debris flushing is difficult.

## Variant comparison

<table>
<tr><th>Variant</th><th>Electrode type</th><th>Kerf / min. feature</th><th>Tolerance</th><th>Surface finish (Ra)</th><th>MRR range</th><th>Material range</th><th>Typical applications</th></tr>
<tr><td>Sinker</td><td>Shaped solid (Cu, graphite, Cu-W)</td><td>~50 µm (spark gap)</td><td>± 0.005–0.02 mm</td><td>0.2–10 µm</td><td>0.01–50 mm³/min</td><td>Any conductive</td><td>Die cavities, 3-D shapes, deep slots</td></tr>
<tr><td>Wire</td><td>Continuous wire (0.1–0.3 mm)</td><td>0.1–0.3 mm (wire Ø)</td><td>± 0.002–0.005 mm</td><td>1–3 µm</td><td>0.1–10 mm³/min</td><td>Any conductive</td><td>Through-cuts, contours, thin walls</td></tr>
<tr><td>Hole-drilling</td><td>Rotating tube (brass, Cu, 0.1–10 mm)</td><td>Ø 0.1 mm</td><td>± 0.01–0.05 mm</td><td>0.5–2 µm</td><td>0.001–0.1 mm³/min</td><td>Any conductive</td><td>Cooling holes, starter holes, orifices</td></tr>
<tr><td>Micro-EDM</td><td>Sub-mm solid or wire</td><td>< 100 µm</td><td>± 1–5 µm</td><td>0.2–1 µm</td><td>0.0001–0.01 mm³/min</td><td>Any conductive</td><td>MEMS, micro-nozzles, micro-tools</td></tr>
</table>

## Surface integrity

Each EDM spark creates a local thermal cycle that modifies the workpiece surface. Three zones are produced, from the surface inward:

1. **Recast layer** – re-solidified melt, typically 1–50 µm thick for finishing, up to 100–200 µm for roughing. It is riddled with micro-cracks and has a different microstructure (often martensitic in steels) from the base material.
2. **Heat-affected zone (HAZ)** – 20–200 µm deep. The material is tempered or annealed, losing hardness. In hardened tool steels, the HAZ can be 2–3× the recast layer thickness.
3. **Residual stress** – typically **tensile** in the recast layer (100–500 MPa), which promotes crack initiation under cyclic loading. This is a critical concern for aerospace (turbine blades, landing gear) and medical (implant) applications.

<details><summary>Details</summary>

- **Why tensile?** The rapid quenching of the thin melt layer by the surrounding cooler bulk produces a volume contraction that is constrained by the adjacent material, generating tensile stress in the surface layer.
- **Mitigation**: a light grinding or lapping pass (5–20 µm) after EDM removes the recast layer and HAZ. For applications where this is not possible (e.g. internal cavities), the residual stress must be accounted for in fatigue design.
- **Contrast with ECM**: [Electrochemical machining](./Electrochemical-machining.md) produces no HAZ, no recast layer, and no residual stress, because material is removed by anodic dissolution at near-ambient temperature.
- **Dielectric effect**: hydrocarbon dielectrics (kerosene) produce a slightly thicker recast layer with a carbon-rich surface; aqueous dielectrics (deionised water) produce a thinner, cleaner recast layer. The choice of dielectric is therefore a surface-integrity parameter, not just a process parameter.

</details>

## Example problem

A hardened (HRC 62) tungsten carbide die block (100 × 80 × 40 mm) requires a complex 3-D cavity with 0.5 mm thin walls, 0.02 mm tolerance, and Ra 1.5 µm on the cavity surfaces. The cavity depth is 25 mm. Which EDM variant should be used, and what are the key process settings?

<details><summary>Solution</summary>

1. **Process selection**: Sinker EDM. The cavity is a 3-D internal shape (not a through-cut), so wire EDM is not applicable. The material (WC, HRC 62) is too hard for mechanical machining. Hole-drilling EDM is for cylindrical holes, not complex 3-D cavities.

2. **Electrode design**: The electrode is a negative of the cavity, CNC-machined from copper (roughing) and graphite (finishing). The electrode is over-sized by the expected wear allowance: ~0.05 mm per side for copper, ~0.02 mm per side for graphite. Electrode preparation (CNC machining of the copper/graphite negative) takes 4–8 h depending on cavity complexity.

3. **Orbit strategy and passes**:
   - **Roughing** (2–3 passes): orbit offset 0.1 mm from the final contour. $`t_{on} = 200` µs, $`t_{off} = 100` µs, $`I = 100` A. MRR for WC at 100 A is ~5–10 mm³/min (lower than steel due to the higher melting point, ~3 143 K vs ~1 811 K). Each pass removes ~0.1 mm of stock; 3 passes remove ~0.3 mm.
   - **Finishing** (2–3 passes): orbit offset 0.02 mm from the final contour. $`t_{on} = 10` µs, $`t_{off} = 50` µs, $`I = 3` A. MRR ~0.3–0.5 mm³/min. Achieves Ra 1.5 µm and ±0.02 mm tolerance.

4. **Thin walls (0.5 mm)**: require a small spark gap (10–15 µm) and low current to avoid short-circuiting across the wall. The dielectric (kerosene) must be well-flushed. The 0.5 mm wall is only ~30× the spark gap, so the discharge must be carefully controlled to avoid eroding through.

5. **Cycle time estimate**: cavity volume ~500 mm³. With 70–80% machine utilisation (shorts, re-strikes, electrode changes between passes):
   - Roughing: 3 passes × (500 mm³ / 7 mm³/min) / 0.75 ≈ 285 min ≈ 4.8 h
   - Finishing: 3 passes × (50 mm³ / 0.4 mm³/min) / 0.75 ≈ 500 min ≈ 8.3 h
   - Electrode preparation: 4–8 h (CNC machining, done in parallel if possible)
   - **Total machine time: ~13 h** (realistic range 8–24 h depending on cavity complexity, number of passes, and machine utilisation).

6. **Post-processing**: a light lapping pass (10 µm) is recommended to remove the recast layer and tensile residual stress from the cavity surfaces, especially if the die will be used for high-cycle injection moulding.

</details>