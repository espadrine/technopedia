# Deposition

Deposition adds a thin film of conductor, insulator, or semiconductor material onto a substrate. It is the material-adding step in electronics fabrication: every metal wire, dielectric layer, and semiconductor channel on a chip is deposited.

> **Authoritative sources**
> - [Handbook of Thin Film Deposition, 5th ed. (Schepis, 2011)](https://www.sciencedirect.com/book/edited-volume/9780443135231/handbook-of-thin-film-deposition)
> - [Sze & Ng, Physics of Semiconductor Devices, 3rd ed. (2006)](https://onlinelibrary.wiley.com/doi/book/10.1002/0470068329)
> - [Pierson, Handbook of Chemical Vapor Deposition, 2nd ed. (1999)](https://www.sciencedirect.com/book/9780815514329/handbook-of-chemical-vapor-deposition-cvd)
> - [Puurunen, "Surface chemistry of atomic layer deposition", J. Appl. Phys. 97, 121301 (2005)](https://doi.org/10.1063/1.1940727)
> - [Stoney, "The tension of metallic films deposited by electrolysis", Proc. R. Soc. Lond. A 82, 172 (1909)](https://doi.org/10.1098/rspa.1909.0021)

## Utility

- Builds up the layered structure of a chip: alternating conductors and insulators.
- Enables 3D structures (FinFET, GAA) by conformally coating high-aspect-ratio features.
- The film thickness, uniformity, stress, and step coverage directly affect device performance and yield.

## Role in the fabrication flow

A chip is built layer by layer in a repeating cycle:

1. **[Lithography](./Lithography.md)** — pattern a resist on the wafer.
2. **Deposition** — add the material (this page).
3. **[Etching](./Etching.md)** — remove material outside the pattern.
4. **Planarization** — flatten the surface by chemical-mechanical polishing (CMP): the wafer is pressed face-down on a rotating pad soaked in an abrasive, chemically reactive slurry, which removes roughly 10–100 nm of the highest topography per pass until the surface is flat again. CMP is needed because each deposition + etch cycle adds height; without it, later lithography could not focus on a flat plane. CMP is a step between deposition and etch in *every* layer, not a packaging-specific operation.
5. Repeat for the next layer.

Each cycle adds one functional layer (a gate oxide, a metal interconnect, a well region, etc.). After 50–100 cycles the wafer contains the full 3D stack of a modern logic or memory chip. Deposition is the step that actually adds material; without it the etch and planarization steps have nothing to shape.

## Key concepts

### Chemical vapor deposition (CVD)

A gas-phase chemical reaction at the heated substrate surface deposits a solid film; variants (thermal, plasma-enhanced, metalorganic) differ only in how the reaction energy is supplied.

<details><summary>Details</summary>

**How it works, step by step.** Precursor gases are flowed into a reactor chamber. They diffuse through a boundary layer to the wafer, adsorb on the hot surface, react there (the surface must be hot enough, or a plasma must crack the molecules), and the solid product stays as film while by-products desorb and are pumped away. The rate is limited either by the surface reaction (temperature-controlled, gives good coverage) or by gas transport (flow-controlled, gives high rate but poor coverage).

**Worked example — PECVD silicon dioxide.** A fab deposits an interlayer dielectric from SiH₄ + N₂O at 350 °C with a 13.56 MHz plasma. The plasma dissociates N₂O into reactive O and N species, so the oxide grows at ~100 nm/min — about 10× faster than a purely thermal process at the same temperature — while staying below the 450 °C limit that protects doped junctions and metal lines. A 500 nm film therefore takes ~5 min of deposition.

**Reactor geometry:**

<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:460px;">
  <rect x="10" y="10" width="440" height="180" fill="#f9f9f9" stroke="#888"/>
  <text x="230" y="26" text-anchor="middle" font-size="12" font-weight="bold">Showerhead CVD reactor</text>
  <rect x="60" y="40" width="340" height="10" fill="#90A4AE"/>
  <text x="230" y="38" text-anchor="middle" font-size="10" fill="#555">showerhead gas distributor (precursor + co-reactant in)</text>
  <g fill="#4FC3F7">
    <circle cx="120" cy="60" r="3"/><circle cx="180" cy="70" r="3"/><circle cx="240" cy="62" r="3"/><circle cx="300" cy="72" r="3"/><circle cx="350" cy="60" r="3"/>
    <circle cx="150" cy="90" r="3"/><circle cx="260" cy="95" r="3"/><circle cx="330" cy="100" r="3"/>
  </g>
  <rect x="60" y="120" width="340" height="14" fill="#FF7043"/>
  <text x="230" y="131" text-anchor="middle" font-size="10" fill="#fff">heated chuck (200–1100 °C, or RF plasma above)</text>
  <rect x="120" y="112" width="220" height="8" fill="#8D6E63"/>
  <text x="230" y="119" text-anchor="middle" font-size="9" fill="#fff">wafer + growing film</text>
  <text x="230" y="160" text-anchor="middle" font-size="10" fill="#555">by-products pumped out (SiH₄ + N₂O → SiO₂ + H₂ + N₂)</text>
  <text x="230" y="178" text-anchor="middle" font-size="10" fill="#555">rate: 10–500 nm/min · conformality: good (step coverage &gt; 90 %)</text>
</svg>

**Main variants:**

- **Thermal CVD**: precursor gases react at the substrate surface at 300–1100 °C. Example: TEOS + O₂ → SiO₂. Best step coverage; slower.
- **Plasma-enhanced CVD (PECVD)**: a plasma provides the activation energy, allowing deposition at 200–400 °C (some processes up to 470 °C). Used for SiO₂, Si₃N₄, and amorphous silicon.
- **Metalorganic CVD (MOCVD)**: organometallic precursors deposit III-V or II-VI compounds (GaAs, InP). Used for LEDs, lasers, and HEMTs.
- **Atomic layer deposition (ALD)**: a self-limiting special case of CVD — see the next section.

**Reference:** [Pierson, Handbook of Chemical Vapor Deposition (1999)](https://www.sciencedirect.com/book/9780815514329/handbook-of-chemical-vapor-deposition-cvd).

<details><summary>Example problem</summary>

A PECVD tool deposits SiO₂ at 100 nm/min. How long must it run to fill a 0.5 µm gap between metal lines, and what limits the temperature?

<details><summary>Solution</summary>

- Time = thickness / rate = 500 nm / (100 nm/min) = **5 min**.
- The temperature is limited by the thermal budget of the layers already on the wafer: dopants must not diffuse and aluminum (melting 660 °C) must not be present, so PECVD runs at 200–400 °C, using the plasma to supply the reaction energy instead of heat.

</details>
</details>

</details>

### Atomic layer deposition (ALD)

A self-limiting special case of CVD: alternating precursor pulses each saturate the surface, so exactly one atomic layer (a fraction of a monolayer, ~0.1 nm) is added per cycle, independent of how long the pulse lasts.

<details><summary>Details</summary>

**How it works, step by step.** One cycle has four steps: (1) pulse precursor A — its molecules chemisorb on the surface until every reactive site is occupied, then the uptake *stops by itself* (self-limiting); (2) purge the excess A away; (3) pulse co-reactant B, which reacts with the adsorbed A to form one layer of product and regenerates reactive sites; (4) purge again. Because each step saturates, the growth per cycle (GPC) is fixed by surface chemistry, not by time or gas flow — which is why ALD coats deep trenches and nanowires with atomic uniformity even at aspect ratios of 10:1 to 20:1 (beyond that, purge times must be extended because diffusion into the feature becomes slow).

**Worked example — HfO₂ high-k gate dielectric.** HfCl₄ + H₂O at 300 °C gives a growth per cycle of ~0.1–0.15 nm (about 10–15 % of one HfO₂ monolayer per cycle, as measured by Puurunen for the analogous TMA/H₂O system). To grow a 5 nm gate dielectric: 5 nm / 0.12 nm per cycle ≈ **42 cycles**. Each cycle takes ~5–10 s, so the film takes a few minutes — slow, but the thickness control is ±1 % across the wafer.

**One ALD cycle:**

<svg viewBox="0 0 460 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:460px;">
  <g font-size="10" text-anchor="middle">
    <rect x="5" y="20" width="105" height="90" fill="#f9f9f9" stroke="#888"/>
    <rect x="15" y="95" width="85" height="10" fill="#8D6E63"/>
    <g fill="#81C784"><circle cx="30" cy="90" r="3"/><circle cx="50" cy="90" r="3"/><circle cx="70" cy="90" r="3"/><circle cx="90" cy="90" r="3"/></g>
    <text x="57" y="14" font-weight="bold">1. Pulse A</text>
    <text x="57" y="115" fill="#555">A chemisorbs to saturation</text>
    <rect x="120" y="20" width="105" height="90" fill="#f9f9f9" stroke="#888"/>
    <rect x="130" y="95" width="85" height="10" fill="#8D6E63"/>
    <g fill="#81C784"><circle cx="145" cy="90" r="3"/><circle cx="165" cy="90" r="3"/><circle cx="185" cy="90" r="3"/><circle cx="205" cy="90" r="3"/></g>
    <text x="172" y="14" font-weight="bold">2. Purge</text>
    <text x="172" y="115" fill="#555">excess A removed</text>
    <rect x="235" y="20" width="105" height="90" fill="#f9f9f9" stroke="#888"/>
    <rect x="245" y="95" width="85" height="10" fill="#8D6E63"/>
    <g fill="#E57373"><circle cx="260" cy="90" r="3"/><circle cx="280" cy="90" r="3"/><circle cx="300" cy="90" r="3"/><circle cx="320" cy="90" r="3"/></g>
    <text x="287" y="14" font-weight="bold">3. Pulse B</text>
    <text x="287" y="115" fill="#555">B reacts: one layer forms</text>
    <rect x="350" y="20" width="105" height="90" fill="#f9f9f9" stroke="#888"/>
    <rect x="360" y="95" width="85" height="10" fill="#8D6E63"/>
    <g fill="#9575CD"><circle cx="375" cy="90" r="3"/><circle cx="395" cy="90" r="3"/><circle cx="415" cy="90" r="3"/><circle cx="435" cy="90" r="3"/></g>
    <text x="402" y="14" font-weight="bold">4. Purge</text>
    <text x="402" y="115" fill="#555">new sites ready: +1 cycle</text>
  </g>
</svg>

**Reference:** [Puurunen, J. Appl. Phys. 97, 121301 (2005)](https://doi.org/10.1063/1.1940727).

<details><summary>Example problem</summary>

An ALD process for Al₂O₃ from TMA/H₂O grows 0.11 nm per cycle. How many cycles for a 20 nm capacitor dielectric, and why does extending the TMA pulse time not make the film thicker?

<details><summary>Solution</summary>

- Cycles = 20 nm / 0.11 nm ≈ **182 cycles**.
- Extending the pulse does not help: once every surface hydroxyl site has reacted with TMA, additional molecules find no reactive sites and are simply purged away. The reaction is *self-limiting* — the GPC is set by surface chemistry, not by dose.

</details>
</details>

</details>

### Physical vapor deposition (PVD)

A solid source is vaporized in vacuum and condenses on the substrate; atoms travel in straight lines, so coverage of shadowed regions is limited.

<details><summary>Details</summary>

**How it works, step by step.** The source material is turned into vapor — by heating it (evaporation) or by bombarding it with energetic ions (sputtering). Because the chamber is at high vacuum, the atoms fly without collisions and land on whatever surface has a direct line of sight to the source. Film growth is therefore directional: horizontal surfaces get thick films, trench bottoms get thin ones. A magnetic field (magnetron) traps electrons near the target so more Ar⁺ ions are created, raising the rate.

**Worked example — sputtered aluminum interconnect.** An Al target is sputtered with Ar⁺ at 300 W in 1 mTorr of argon; the wafer sits 5 cm away at ~150 °C. Atoms leave the target over a broad angular distribution, so the step coverage on a 1 µm deep via is ~30–60 % at the bottom — which is why sputtered metal needs a conformal ALD/TiN liner first, and why modern damascene flows deposit Cu by electroplating instead. Typical sputter rate: 1–10 nm/min per kW-class power.

**Sputtering geometry:**

<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:460px;">
  <rect x="10" y="10" width="440" height="180" fill="#f9f9f9" stroke="#888"/>
  <text x="230" y="26" text-anchor="middle" font-size="12" font-weight="bold">Magnetron sputtering</text>
  <rect x="130" y="40" width="200" height="14" fill="#FFB74D"/>
  <text x="230" y="51" text-anchor="middle" font-size="10" fill="#fff">target (cathode, −400 V)</text>
  <g fill="#E53935"><circle cx="150" cy="70" r="4"/><circle cx="230" cy="75" r="4"/><circle cx="310" cy="68" r="4"/></g>
  <text x="330" y="72" font-size="10" fill="#E53935">Ar⁺</text>
  <g fill="#FFB74D"><circle cx="200" cy="100" r="2.5"/><circle cx="230" cy="110" r="2.5"/><circle cx="260" cy="105" r="2.5"/><circle cx="215" cy="120" r="2.5"/><circle cx="245" cy="125" r="2.5"/></g>
  <text x="285" y="115" font-size="10" fill="#B26A00">ejected atoms (line-of-sight)</text>
  <rect x="130" y="150" width="200" height="10" fill="#8D6E63"/>
  <rect x="130" y="144" width="200" height="6" fill="#FFB74D"/>
  <text x="230" y="175" text-anchor="middle" font-size="10" fill="#555">wafer — thick film on top surfaces, thin in trenches</text>
</svg>

**Main variants:**

- **Thermal evaporation**: the source is heated until it evaporates; the vapor condenses on the substrate. Line-of-sight deposition; poor step coverage. Used for thin metal films (Al, Cu, Au) and in research.
- **Sputtering**: ions (Ar⁺) bombard a target, ejecting atoms that deposit on the substrate. Better step coverage than evaporation. Used for metal interconnects, barrier layers (TaN, TiN), and hard masks.
- **Magnetron sputtering**: a magnetic field confines electrons near the target, increasing ionization and deposition rate. The standard PVD tool in fabs.
- **Pulsed laser deposition (PLD)**: a laser ablates a target; the plasma plume deposits on the substrate. Used for complex oxide films (YBCO, PZT) and multilayers.

<details><summary>Example problem</summary>

A sputter tool deposits TiN at 4 nm/min. A barrier of 10 nm is needed on the via bottom, but the step coverage at the bottom of a 1 µm deep, 0.3 µm wide via is only 30 %. What bottom thickness results from a nominal 10 nm deposition, and how is the shortfall fixed?

<details><summary>Solution</summary>

- Bottom thickness = 30 % × 10 nm = **3 nm** — too thin to block Cu diffusion.
- Fixes: rotate the wafer and add collimation or ion-beam assistance to narrow the angular distribution; or switch to a conformal method (ALD TiN, ~0.1 nm/cycle) for the barrier layer, then sputter the bulk metal.

</details>
</details>

</details>

### Electroplating and electroless deposition

A metal is deposited from a liquid electrolyte — electrochemically (driven by an external current) or autocatalytically (electroless). The general mechanism, chemistry, and corrosion/wear applications are covered in [Surface finishing](../Surface-finishing.md); here only the electronics-specific uses matter:

- **Copper damascene fill**: after a thin sputtered or CVD seed layer, Cu is electroplated into trenches and vias at 1–10 µm/h — the only economical way to fill high-aspect-ratio metal lines (see [Interconnect and packaging](./Interconnect-and-packaging.md)).
- **PCB copper thickening**: electroplated Cu builds the 10–100 µm traces and through-hole barrels of a board (see [PCB fabrication](./PCB-fabrication.md)).
- **Electroless copper on non-conductors**: a palladium-catalyzed reduction metallizes bare glass-epoxy or ceramic, creating the conductive base for subsequent plating.
- **TSV and micro-bump filling**: bottom-up plating with suppressor/accelerator additives void-free-fills through-silicon vias and pads in 3D IC packaging.

### Epitaxy

A single-crystal film is grown on a single-crystal substrate with the same lattice orientation; the film *continues* the crystal rather than nucleating grains.

<details><summary>Details</summary>

**How it works, step by step.** Atoms arrive at a hot, atomically clean single-crystal surface and find lattice sites that continue the substrate's periodicity. If the arriving species are supplied as beams in ultra-high vacuum, growth is slow and precisely controlled layer by layer (MBE); if they arrive as gas molecules that decompose on the surface, it is vapor-phase epitaxy (MOVPE, or Si epitaxy from SiH₄). Lattice mismatch between film and substrate creates strain — which is exploited deliberately: compressively strained SiGe in transistor sources/drains boosts hole mobility (see [Film stress](#film-stress)).

**Worked example — silicon epitaxy.** A Si wafer is heated to 1100 °C in SiH₄ at low pressure; SiH₄ decomposes at the surface, Si atoms lock into lattice sites, and H₂ desorbs. A 1 µm epi layer grows in ~5 min at ~0.2 µm/min. The layer is doped in-situ (adding diborane or phosphine) to form the wells of a CMOS process.

**Main variants:**

- **Molecular beam epitaxy (MBE)**: ultra-high vacuum, atomic-beam sources. Grows III-V and II-VI heterostructures with monolayer precision. Used for quantum wells, HEMTs, and research.
- **Metalorganic vapor phase epitaxy (MOVPE)**: organometallic precursors in a gas stream. Higher throughput than MBE. Used for LEDs, lasers, and 5G power amplifiers.
- **Silicon epitaxy**: SiH₄ decomposes on a Si wafer at 1100–1200 °C. Grows the channel and well regions of a CMOS chip. (Mechanistically a CVD process, classified separately because the product is a single crystal, not a polycrystalline or amorphous film.)

<details><summary>Example problem</summary>

Why must an epitaxial reactor be far cleaner than a CVD oxide reactor, and what happens if a single dust particle lands on the wafer before growth?

<details><summary>Solution</summary>

- Epitaxy copies the substrate's atomic lattice; any contaminant or particle becomes a nucleation site for misoriented grains or a stacking fault that propagates through the whole layer.
- A dust particle shadows the lattice: the film grows polycrystalline around it and the defect ruins every device built on that spot — hence front-end fabs run epitaxy in class-1 cleanrooms with in-situ pre-growth HCl or high-temperature bakes to strip the native oxide.

</details>
</details>

</details>

## Film stress

Every deposited film is either stretched (**tensile**) or squeezed (**compressive**) along its plane. Stress is a first-order process parameter: it bends wafers, cracks or peels films, and — deliberately — changes transistor speed.

**Where it comes from:**

- **Thermal mismatch**: film and substrate have different thermal expansion coefficients; cooling after a hot deposition leaves a residual stress $`\sigma_{th} = E_f (\alpha_f - \alpha_s) \Delta T`.
- **Intrinsic growth stress**: built in during deposition itself — atomic peening (sputtered ions compact the film → compressive), grain coalescence and vacancy annihilation (→ tensile), and incorporation of impurities or by-products (PECVD hydrogen → compressive).

**Measuring it:** the wafer bends, and the curvature gives the stress through the Stoney equation:

```math
\sigma_f = \frac{E_s\, t_s^2}{6\, R\, t_f}
```

where $`E_s` and $`t_s` are the substrate's Young's modulus and thickness, $`R` the measured wafer-bow radius, and $`t_f` the film thickness. A 500 µm Si wafer with a 1 µm film bowing by 50 µm over 150 mm corresponds to roughly ±100 MPa.

**Why it matters in CMOS — strain engineering:** mechanical strain deforms the silicon lattice and splits the conduction/valence bands, changing carrier mobility. The effect is used on purpose:

- **Tensile Si₃N₄ contact-etch-stop liners** (~1–3 GPa tensile) stretch the channel and speed up *nMOS* electrons.
- **Compressive SiGe source/drain epitaxy** squeezes the channel and speeds up *pMOS* holes.
- Uncontrolled stress does the opposite: a highly compressive PECVD oxide can bow the wafer, crack low-k dielectrics, or shift transistor thresholds across the die.

<svg viewBox="0 0 460 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:460px;">
  <g font-size="10" text-anchor="middle">
    <path d="M 20 60 Q 115 20 210 60 L 210 70 Q 115 30 20 70 Z" fill="#2196F3"/>
    <path d="M 20 70 Q 115 30 210 70 L 210 130 Q 115 90 20 130 Z" fill="#8D6E63"/>
    <text x="115" y="20" font-weight="bold">Tensile film → wafer smiles</text>
    <text x="115" y="150" fill="#555">film shrinks: edges curl up (σ &gt; 0)</text>
    <path d="M 250 40 Q 345 80 440 40 L 440 50 Q 345 90 250 50 Z" fill="#2196F3"/>
    <path d="M 250 50 Q 345 90 440 50 L 440 110 Q 345 70 250 110 Z" fill="#8D6E63"/>
    <text x="345" y="30" font-weight="bold">Compressive film → wafer frowns</text>
    <text x="345" y="140" fill="#555">film expands: edges curl down (σ &lt; 0)</text>
  </g>
</svg>

<details><summary>Example problem</summary>

A 1 µm PECVD nitride is deposited at 400 °C on a 775 µm Si wafer and cools to room temperature. α(Si) = 2.6×10⁻⁶ /K, α(Si₃N₄) = 3.2×10⁻⁶ /K, E(nitride) ≈ 300 GPa. What thermal stress results, and is it tensile or compressive?

<details><summary>Solution</summary>

- ΔT = 400 − 25 = 375 K; Δα = 3.2 − 0.6 ×10⁻⁶... using α(Si₃N₄) − α(Si) = 0.6×10⁻⁶ /K:
- σ = E Δα ΔT = 300 GPa × 0.6×10⁻⁶ /K × 375 K ≈ **67 MPa, tensile** (the nitride contracts less than... it contracts *more* than silicon, so it ends up stretched).
- This is small compared with the ±1–3 GPa intrinsic stress of PECVD nitride — which is why the deposition recipe (pressure, RF power, SiH/NH₃ ratio) is the real stress knob, tuned to deliver the desired tensile liner for nMOS mobility.

</details>
</details>

## Comparison of deposition classes

ALD is a special case of CVD (a self-limiting surface-reaction process), so it is listed as a sub-row of CVD. Rates are the primary throughput knob and trade off against film quality: fast films are less conformal, more defective, and more stressed.

<table>
<tr><th>Class</th><th>Mechanism</th><th>Typical rate</th><th>Temperature</th><th>Conformality</th><th>Typical film stress</th><th>Typical applications</th></tr>
<tr><td><b>CVD</b> (parent class: gas-phase surface reaction)</td><td colspan="6">Precursor gases react at the wafer surface; variants differ in how the reaction energy is supplied</td></tr>
<tr><td>&nbsp;&nbsp;└ Thermal CVD</td><td>Heat-driven surface reaction</td><td>10–500 nm/min</td><td>300–1100 °C</td><td>Good (step coverage &gt; 90 %)</td><td>±100 MPa – 1 GPa</td><td>Epitaxy-adjacent oxides, spacers, TEOS oxides</td></tr>
<tr><td>&nbsp;&nbsp;└ PECVD</td><td>Plasma-cracked species react at surface</td><td>50–1000 nm/min</td><td>200–400 °C</td><td>Good</td><td>−1 GPa (compressive) to +3 GPa (tensile), tunable</td><td>Interlayer dielectrics, Si₃N₄ stress liners, passivation</td></tr>
<tr><td>&nbsp;&nbsp;└ ALD (self-limiting CVD)</td><td>Saturated surface reaction, ~1 monolayer fraction/cycle</td><td>0.05–0.5 nm/cycle (rate set by cycle time, ~5–10 s)</td><td>100–400 °C</td><td>Excellent up to ~10–20:1 AR</td><td>Low, near-neutral (relaxed, defect-poor films)</td><td>High-k dielectrics, barrier/liner layers, GAA gates</td></tr>
<tr><td>PVD (sputter / evaporation)</td><td>Vapor condensation (line-of-sight)</td><td>1–100 nm/min</td><td>Room temp – 400 °C</td><td>Poor to moderate (step coverage 30–70 %)</td><td>Tensile (evaporation) to compressive (energetic sputtering), ±0.1–2 GPa</td><td>Metal interconnects, hard masks, barrier layers</td></tr>
<tr><td>Electroplating</td><td>Electrochemical reduction in solution</td><td>1–10 µm/h</td><td>Room temp – 60 °C</td><td>Good (additives give bottom-up fill)</td><td>Tensile, 10–200 MPa</td><td>Cu damascene fill, PCB Cu, TSV filling, bump pads</td></tr>
<tr><td>Epitaxy (MBE / MOVPE / Si)</td><td>Crystal-lattice-matched growth</td><td>0.1–10 µm/h (MBE); 0.1–1 µm/min (Si epi)</td><td>200–1200 °C</td><td>Planar only (no step coverage)</td><td>Set by lattice mismatch (e.g. compressive SiGe on Si)</td><td>CMOS channels/wells, SiGe stressors, III-V lasers, HEMTs</td></tr>
</table>

## Conformality: ALD vs. CVD/PVD in a trench

The figure below shows a cross-section of a high-aspect-ratio trench (depth ≈ 10× width). The left panel shows a conformal ALD coating (uniform thickness on all surfaces); the right panel shows a non-conformal CVD/PVD coating (thick on top, pinched at the bottom).

<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;">
  <!-- Left: ALD conformal -->
  <rect x="10" y="10" width="230" height="200" fill="#f9f9f9" stroke="#ccc"/>
  <text x="125" y="28" text-anchor="middle" font-size="12" font-weight="bold">ALD (conformal)</text>
  <!-- Substrate -->
  <rect x="30" y="160" width="190" height="40" fill="#ddd"/>
  <!-- Trench -->
  <rect x="90" y="60" width="70" height="100" fill="#fff"/>
  <!-- ALD coating: uniform 6px on all sides of trench -->
  <rect x="84" y="54" width="82" height="106" fill="none" stroke="#2196F3" stroke-width="6"/>
  <!-- Top surface coating -->
  <rect x="30" y="54" width="60" height="6" fill="#2196F3"/>
  <rect x="170" y="54" width="50" height="6" fill="#2196F3"/>
  <!-- Labels -->
  <text x="125" y="195" text-anchor="middle" font-size="10" fill="#555">uniform thickness</text>

  <!-- Right: CVD/PVD non-conformal -->
  <rect x="260" y="10" width="230" height="200" fill="#f9f9f9" stroke="#ccc"/>
  <text x="375" y="28" text-anchor="middle" font-size="12" font-weight="bold">CVD / PVD (non-conformal)</text>
  <!-- Substrate -->
  <rect x="280" y="160" width="190" height="40" fill="#ddd"/>
  <!-- Trench -->
  <rect x="340" y="60" width="70" height="100" fill="#fff"/>
  <!-- Non-conformal coating: thick on top, thin at bottom -->
  <path d="M 334 54 L 416 54 L 416 60 L 410 60 L 410 155 L 400 160 L 350 160 L 340 155 L 340 60 L 334 60 Z" fill="#FF9800"/>
  <!-- Top surface coating (thicker) -->
  <rect x="280" y="48" width="54" height="12" fill="#FF9800"/>
  <rect x="416" y="48" width="54" height="12" fill="#FF9800"/>
  <!-- Labels -->
  <text x="375" y="195" text-anchor="middle" font-size="10" fill="#555">pinched at bottom</text>
</svg>

## Film quality and process parameters

Film quality is the set of measurable properties that decide whether a deposited layer works in the device: thickness, uniformity, conformality, roughness, interface cleanliness, and stress. Every one of them trades off against **deposition rate** — the primary throughput knob a process engineer turns. Fast processes (PECVD, sputtering) deliver high throughput but rougher, more stressed, less conformal films; slow ones (ALD, MBE) deliver near-perfect films at a fraction of the wafers per hour.

<details><summary>Details</summary>

**Thickness and uniformity.** Measured by spectroscopic ellipsometry (in-line, non-destructive, 49-point maps). Example: a 300 mm wafer with a nominal 50 nm PECVD SiO₂ film reads 50.2 nm at the center and 49.8 nm at the edge — a spread of 0.4 nm on 50 nm, i.e. 0.8 % uniformity, inside the typical ±2 % CVD spec (ALD specs are tighter, ±1 %).

**Step coverage (conformality).** Measured by cross-section TEM or SEM on a patterned witness wafer. Example: on a 2:1 via, CVD gives 95 % (bottom thickness / top thickness), ALD gives 99 %, sputtering 40 % — which is why sputtered barrier layers need ALD liners in deep vias.

**Deposition rate.** Measured from film thickness divided by deposition time (nm/min, or nm/cycle for ALD). Example: the same SiO₂ film above grows at 100 nm/min, so a 25-wafer batch takes ~5 min of deposition plus pump/heat-up overhead; an ALD 5 nm HfO₂ at 0.12 nm/cycle and 8 s/cycle takes ~55 min of pure cycling. Rate is the reason PECVD, not ALD, fills thick dielectric layers, and ALD, not PECVD, gates the transistor.

**Surface roughness.** Measured by AFM (RMS). Example: an ALD Al₂O₃ film reads 0.2 nm RMS — atomically smooth because each cycle re-smooths the surface — while a sputtered Al film reads 3–5 nm RMS because grains grow competitively.

**Interface quality.** Cross-section TEM and XPS check for intermixing or contamination at the film/substrate boundary. Example: a poor pre-deposition clean leaves ~1 nm of native oxide under a gate electrode, shifting the threshold voltage of every transistor on the wafer.

**Stress.** Measured by wafer-bow (Stoney, see [Film stress](#film-stress)). Example: a PECVD nitride liner is tuned from −1 GPa (compressive) to +3 GPa (tensile) by changing the SiH₄/NH₃ ratio and RF power, without changing its function as a diffusion barrier.

</details>

## Interactive simulation

<iframe src="./Deposition.simulation.html" title="CVD vs PVD vs ALD deposition mechanisms"></iframe>

## Quiz

A 3 nm GAA (gate-all-around) transistor requires a conformal high-k dielectric (HfO₂, 5 nm thick) to coat the nanowire channel (aspect ratio 10:1). Which deposition process is appropriate, and how many cycles does it take?

<details><summary>How to solve it</summary>

<details><summary>Solution</summary>

1. **Requirement**: 5 nm HfO₂ with < 1 % thickness variation over a 10:1 aspect-ratio nanowire.
2. **Process**: ALD. CVD and PVD cannot achieve the required conformality at this aspect ratio. ALD's self-limiting reaction deposits a fixed amount per cycle regardless of exposure time, giving uniform thickness on every surface.
3. **Precursors**: HfCl₄ + H₂O (or O₃) as the co-reactant. Each cycle deposits ~0.1–0.15 nm of HfO₂ (typical for HfCl₄/H₂O at 300 °C); 5 nm / 0.12 nm per cycle ≈ **42 cycles**. (TDMAH-based precursors give ~0.1–0.15 nm/cycle as well, with better thermal stability.)
4. **Temperature**: 250–350 °C (compatible with back-end-of-line thermal budgets).
5. **Verification**: cross-section TEM for thickness and step coverage; spectroscopic ellipsometry for in-line thickness monitoring; wafer-bow metrology to confirm the film stress is acceptable.

</details>
</details>

## Parent

This page is a class in the [Electronics](./Readme.md) topic, which is a subtopic of [Manufacturing](../Readme.md).


Deposition adds a thin film of conductor, insulator, or semiconductor material onto a substrate. It is the material-adding step in electronics fabrication: every metal wire, dielectric layer, and semiconductor channel on a chip is deposited.

> **Authoritative sources**
> - [Handbook of Thin Film Deposition, 5th ed. (Schepis, 2011)](https://www.sciencedirect.com/book/edited-volume/9780443135231/handbook-of-thin-film-deposition)
> - [Sze & Ng, Physics of Semiconductor Devices, 3rd ed. (2006)](https://onlinelibrary.wiley.com/doi/book/10.1002/0470068329)

## Utility

- Builds up the layered structure of a chip: alternating conductors and insulators.
- Enables 3D structures (FinFET, GAA) by conformally coating high-aspect-ratio features.
- The film thickness, uniformity, and step coverage directly affect device performance and yield.

## Role in the fabrication flow

A chip is built layer by layer in a repeating cycle:

1. **[Lithography](./Lithography.md)** — pattern a resist on the wafer.
2. **Deposition** — add the material (this page).
3. **[Etching](./Etching.md)** — remove material outside the pattern.
4. **Planarization** — flatten the surface (CMP, see [Interconnect and packaging](./Interconnect-and-packaging.md)).
5. Repeat for the next layer.

Each cycle adds one functional layer (a gate oxide, a metal interconnect, a well region, etc.). After 50–100 cycles the wafer contains the full 3D stack of a modern logic or memory chip. Deposition is the step that actually adds material; without it the etch and planarization steps have nothing to shape.

## Key concepts

### Chemical vapor deposition (CVD)

A gas-phase reaction deposits a solid film on the substrate surface.

<details><summary>Details</summary>

- **Thermal CVD**: precursor gases react at the substrate surface at 300–1100 °C. Example: SiH₄ + O₂ → SiO₂ (thermal oxide for gate dielectrics and spacers). Good step coverage, moderate rate.
- **Plasma-enhanced CVD (PECVD)**: a plasma provides the activation energy, allowing deposition at 100–300 °C. Used for SiO₂, Si₃N₄, and amorphous silicon.
- **Atomic layer deposition (ALD)**: a self-limiting surface reaction deposits one atomic layer per cycle (e.g., TiCl₄ + H₂O → TiO₂). Conformal up to moderate aspect ratios (~10:1 to 20:1) with good uniformity; conformality degrades at higher aspect ratios due to mass-transport (diffusion) limitations and requires process optimization (longer purge times, lower precursor pressure). Used for high-k dielectrics and barrier layers.
- **Metalorganic CVD (MOCVD)**: organometallic precursors deposit III-V or II-VI compounds (GaAs, InP). Used for LEDs, lasers, and HEMTs.

</details>

### Physical vapor deposition (PVD)

A solid source is vaporized and condensed on the substrate.

<details><summary>Details</summary>

- **Thermal evaporation**: the source is heated until it evaporates; the vapor condenses on the substrate. Line-of-sight deposition; poor step coverage. Used for thin metal films (Al, Cu, Au).
- **Sputtering**: ions (Ar⁺) bombard a target, ejecting atoms that deposit on the substrate. Better step coverage than evaporation. Used for metal interconnects, barrier layers (TaN, TiN), and hard masks.
- **Magnetron sputtering**: a magnetic field confines electrons near the target, increasing ionization and deposition rate. The standard PVD tool in fabs.
- **Pulsed laser deposition (PLD)**: a laser ablates a target; the plasma deposits on the substrate. Used for oxide films (YBCO, PZT) and multilayer structures.

</details>

### Electroplating and electroless deposition

A metal is deposited electrochemically or by chemical reduction. This section covers the electronics-specific applications; for the general manufacturing context (corrosion resistance, wear protection) see [Surface finishing](../Surface-finishing.md).

<details><summary>Details</summary>

- **Electroplating (electronics)**: Cu is deposited from an electrolyte onto a seed layer. Used for PCB copper thickening in [PCB fabrication](./PCB-fabrication.md), TSV filling in 3D ICs (see [Interconnect and packaging](./Interconnect-and-packaging.md)).
- **Electroless copper**: a chemical reduction deposits Cu on a catalytically active surface (palladium-seeded). Used to make non-conductive substrates (glass, ceramic) conductive before electroplating.
- **Electroless nickel (electronics)**: uniform Ni-P coating on complex geometries. Used for magnetic cores in inductors and for seed layers in advanced packaging.

</details>

### Epitaxy

A single-crystal film is grown on a single-crystal substrate with the same lattice orientation.

<details><summary>Details</summary>

- **Molecular beam epitaxy (MBE)**: ultra-high vacuum, atomic-beam sources. Grows III-V and II-VI heterostructures with monolayer precision. Used for quantum wells, HEMTs, and research.
- **Metalorganic vapor phase epitaxy (MOVPE)**: organometallic precursors in a gas stream. Higher throughput than MBE. Used for LEDs, lasers, and 5G power amplifiers.
- **Silicon epitaxy**: SiH₄ decomposes on a Si wafer at 1100–1200 °C. Grows the channel and well regions of a CMOS chip. (This is a CVD process in mechanism but is classified separately here because the product is a single crystal, not a polycrystalline or amorphous film.)

</details>

## Comparison of deposition classes

<table>
<tr><th>Class</th><th>Mechanism</th><th>Temperature</th><th>Conformality</th><th>Typical thickness</th><th>Typical applications</th></tr>
<tr><td>CVD / PECVD</td><td>Gas-phase surface reaction</td><td>100–1100 °C</td><td>Good (step coverage &gt; 90 %)</td><td>10 nm – 10 µm</td><td>Gate oxides, spacers, interlayer dielectrics</td></tr>
<tr><td>ALD</td><td>Self-limiting surface reaction, 1 layer/cycle</td><td>100–400 °C</td><td>Excellent up to ~10–20:1 AR</td><td>1 – 100 nm</td><td>High-k dielectrics, barrier layers, GAA gates</td></tr>
<tr><td>PVD (sputter / evap)</td><td>Vapor condensation (line-of-sight)</td><td>Room temp – 400 °C</td><td>Poor to moderate (step coverage 30–70 %)</td><td>10 nm – 1 µm</td><td>Metal interconnects, hard masks, barrier layers</td></tr>
<tr><td>Electroplating</td><td>Electrochemical reduction in solution</td><td>Room temp – 60 °C</td><td>Good (electromigration fills from bottom)</td><td>1 µm – 1 mm</td><td>PCB Cu, TSV filling, wire bond pads</td></tr>
<tr><td>Epitaxy (MBE / MOVPE / Si)</td><td>Crystal-lattice-matched growth</td><td>200–1200 °C</td><td>Planar only (no step coverage)</td><td>10 nm – 10 µm</td><td>CMOS channels, III-V lasers, HEMTs</td></tr>
</table>

## Conformality: ALD vs. CVD/PVD in a trench

The figure below shows a cross-section of a high-aspect-ratio trench (depth ≈ 10× width). The left panel shows a conformal ALD coating (uniform thickness on all surfaces); the right panel shows a non-conformal CVD/PVD coating (thick on top, pinched at the bottom).

<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;">
  <!-- Left: ALD conformal -->
  <rect x="10" y="10" width="230" height="200" fill="#f9f9f9" stroke="#ccc"/>
  <text x="125" y="28" text-anchor="middle" font-size="12" font-weight="bold">ALD (conformal)</text>
  <!-- Substrate -->
  <rect x="30" y="160" width="190" height="40" fill="#ddd"/>
  <!-- Trench -->
  <rect x="90" y="60" width="70" height="100" fill="#fff"/>
  <!-- ALD coating: uniform 6px on all sides of trench -->
  <rect x="84" y="54" width="82" height="106" fill="none" stroke="#2196F3" stroke-width="6"/>
  <!-- Top surface coating -->
  <rect x="30" y="54" width="60" height="6" fill="#2196F3"/>
  <rect x="170" y="54" width="50" height="6" fill="#2196F3"/>
  <!-- Labels -->
  <text x="125" y="195" text-anchor="middle" font-size="10" fill="#555">uniform thickness</text>

  <!-- Right: CVD/PVD non-conformal -->
  <rect x="260" y="10" width="230" height="200" fill="#f9f9f9" stroke="#ccc"/>
  <text x="375" y="28" text-anchor="middle" font-size="12" font-weight="bold">CVD / PVD (non-conformal)</text>
  <!-- Substrate -->
  <rect x="280" y="160" width="190" height="40" fill="#ddd"/>
  <!-- Trench -->
  <rect x="340" y="60" width="70" height="100" fill="#fff"/>
  <!-- Non-conformal coating: thick on top, thin at bottom -->
  <path d="M 334 54 L 416 54 L 416 60 L 410 60 L 410 155 L 400 160 L 350 160 L 340 155 L 340 60 L 334 60 Z" fill="#FF9800"/>
  <!-- Top surface coating (thicker) -->
  <rect x="280" y="48" width="54" height="12" fill="#FF9800"/>
  <rect x="416" y="48" width="54" height="12" fill="#FF9800"/>
  <!-- Labels -->
  <text x="375" y="195" text-anchor="middle" font-size="10" fill="#555">pinched at bottom</text>
</svg>

## Film quality metrics

<details><summary>Details</summary>

- **Thickness and uniformity**: measured by spectroscopic ellipsometry (in-line, non-destructive). Typical spec: ±2 % thickness uniformity across a 300 mm wafer for CVD; ±1 % for ALD.
- **Step coverage**: measured by cross-section TEM (transmission electron microscopy). Typical values: &gt; 90 % for CVD, &gt; 99 % for ALD at moderate aspect ratios (≤ 20:1).
- **Surface topography / roughness**: measured by profilometry (stylus or optical) and AFM. Typical roughness: &lt; 1 nm RMS for ALD oxides, 1–3 nm for CVD dielectrics.
- **Interface quality**: cross-section TEM and XPS (X-ray photoelectron spectroscopy) to check for intermixing or contamination at the film/substrate boundary.

</details>

## Interactive simulation

<iframe src="./Deposition.simulation.html" title="CVD vs PVD vs ALD deposition mechanisms"></iframe>

## Example problem

A 3 nm GAA (gate-all-around) transistor requires a conformal high-k dielectric (HfO₂, 5 nm thick) to coat the nanowire channel (aspect ratio 10:1). Which deposition process is appropriate?

<details><summary>Solution</summary>

1. **Requirement**: 5 nm HfO₂ with < 1 % thickness variation over a 10:1 aspect-ratio nanowire.
2. **Process**: ALD. CVD and PVD cannot achieve the required conformality at this aspect ratio. ALD's self-limiting reaction ensures one atomic layer per cycle, giving uniform thickness regardless of geometry.
3. **Precursors**: HfCl₄ + H₂O (or O₃) as the co-reactant. Each cycle deposits ~0.05 nm of HfO₂ (0.5 Å/cycle, typical for HfCl₄/H₂O at 300 °C); ~100 cycles give 5 nm. (TDMAH-based precursors give ~0.07–0.16 nm/cycle, requiring fewer cycles.)
4. **Temperature**: 250–350 °C (compatible with back-end-of-line processing).
5. **Verification**: Cross-section TEM to measure thickness and step coverage; spectroscopic ellipsometry for in-line thickness monitoring.

</details>

## Parent

This page is a class in the [Electronics](./Readme.md) topic, which is a subtopic of [Manufacturing](../Readme.md).
## Parent

This page is a class in the [Electronics](./Readme.md) topic, which is a subtopic of [Manufacturing](../Readme.md).
