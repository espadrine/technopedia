# Materials processing

Materials processing converts raw material (ore, monomer, sand, fiber) into usable stock—sheet, bar, billet, ingot, filament, or powder—with controlled composition, microstructure, and mechanical properties. It is the first step in every manufacturing chain: no forming, casting, or machining can begin until stock exists.

**Scope note:** This page covers the production of standard stock forms. Shaping that stock into a near-net part geometry is covered in [Forming](./Forming.md); solidifying melt directly into a part shape is covered in [Casting](./Casting.md).
**Scope note:** This page covers the production of standard stock forms. Shaping that stock into a near-net part geometry is covered in [Forming](./Forming.md); solidifying melt directly into a part shape is covered in [Casting](./Casting.md).

**Quick decision guide — which stock form?**

<table>
<tr><th>Part requirement</th><th>Stock form</th><th>Production route</th></tr>
<tr><td>Flat, thin, high volume (panels, brackets)</td><td>Sheet / strip</td><td>Melt → continuous cast (slab) → hot/cold rolling</td></tr>
<tr><td>Solid prismatic, machined later (shafts, blocks)</td><td>Bar / billet</td><td>Melt → continuous cast (billet) → hot rolling or extrusion</td></tr>
<tr><td>Long constant cross-section, complex profile (tubes, frames)</td><td>Extruded profile</td><td>Melt → cast billet → hot extrusion</td></tr>
<tr><td>Very small diameter, long (fasteners, cables)</td><td>Wire / filament</td><td>Bar → multi-pass drawing</td></tr>
<tr><td>Complex geometry, hard or brittle material, low volume</td><td>Powder</td><td>Atomization → pressing → sintering</td></tr>
<tr><td>Hollow container (bottle, jar)</td><td>Polymer preform</td><td>Polymerize → pelletize → injection mold → blow mold</td></tr>
</table>

> **Authoritative sources**
> **Authoritative sources**
> - [ASM Handbook, Volume 1: Properties and Selection: Irons, Steels, and High-Performance Alloys](https://dl.asminternational.org/handbooks/edited-volume/16/Properties-and-Selection-Irons-Steels-and-High)
> - [ASM Handbook, Volume 4: Heat Treating](https://dl.asminternational.org/handbooks/edited-volume/76/Heat-Treating)
> - [ASTM B221/B221M, Standard Specification for Aluminum and Aluminum-Alloy Extruded Bars, Rod, Wire, Profiles, and Tubes](https://www.astm.org/b0221_b0221m-21.html)

## Key concepts

### Stock form → production route

Every stock form is produced by melting and refining a raw material, then reducing the solid to a standard cross-section. The table below maps each stock form to its dominant production route; the sections of this page explain each stage in order.

<table>
<tr><th>Stock form</th><th>Primary production route</th></tr>
<tr><td>Sheet / strip</td><td>Melt → continuous cast (slab) → hot/cold rolling</td></tr>
<tr><td>Bar / rod</td><td>Melt → continuous cast (billet) → hot rolling or extrusion</td></tr>
<tr><td>Billet / bloom</td><td>Melt → continuous casting</td></tr>
<tr><td>Ingot</td><td>Melt → semi-continuous or sand casting</td></tr>
<tr><td>Wire / filament</td><td>Bar → multi-pass drawing (or melt → extrusion → drawing)</td></tr>
<tr><td>Powder</td><td>Melt → gas/water atomization; or chemical reduction (ceramics)</td></tr>
<tr><td>Ceramic green body</td><td>Powder → pressing (uniaxial, isostatic) → sintering</td></tr>
</table>

<details><summary>Details</summary>

**Worked example — 6061-T6 flat bar, 200 × 200 × 50 mm.** A designer needs a machinable block for a CNC fixture. No standard stock form matches a 200 mm square cross-section directly, so the planner picks the closest standard form (extruded flat bar) and lets machining remove the rest. The route is: primary Al → continuous casting (billet) → hot extrusion (flat bar) → solution treatment and artificial aging to the T6 temper → sawing → CNC machining. Certification is per ASTM B221 mill test report.

The general rule: pick the stock form whose cross-section is closest to the part's largest cross-section, then let forming and machining do the rest. Every extra intermediate cross-section (ingot → billet → bar → wire) costs a pass through a mill, so the route with the fewest stages that still yields sound material wins.

</details>

<details><summary>Example problem</summary>

A designer needs a 50 mm thick plate. Why not order 50 mm plate directly from the continuous caster?

<details><summary>Solution</summary>

A continuous caster cannot economically cast 50 mm thick sections at conventional speeds (thick slabs are ~200 mm; thin-slab casters bottom out near 50–100 mm with limited alloys), and an as-cast section has segregated chemistry, coarse dendritic grains, and surface defects. The plate mill solves both: a ~200 mm slab is hot-rolled with 10–50:1 total reduction, which closes the cast porosity, refines the grains, and delivers the 50 mm thickness with certified properties.

</details>

</details>

### Alloying and phase control

The composition of an alloy determines its phase diagram, which in turn sets the achievable strength, ductility, and corrosion resistance. Practically, a small change in carbon content (e.g., 0.2 % → 0.45 %) can shift a steel from a soft, weldable ferrite-pearlite microstructure to a hardenable martensite-capable one—this is the single most important lever in steel grade selection.

<details><summary>Details</summary>

A phase diagram (e.g., Fe–C for steels) maps temperature and composition to stable phases (ferrite, austenite, cementite). Heat treatment—quenching, tempering, annealing—exploits these transitions to tailor microstructure. For polymers, molecular weight, branching, and crystallinity play the analogous role.

Example: 1045 steel (0.45 % C) quenched from austenite becomes martensite (hard, brittle); tempering at 600 °C reduces hardness while restoring ductility.

</details>

<details><summary>Example problem</summary>

A welded frame needs 1018 steel (0.18 % C) and a wear pin needs 1045 steel (0.45 % C). Using the Fe–C diagram, explain why each choice fits its job.

<details><summary>Solution</summary>

At 0.18 % C the steel sits far left of the eutectoid (0.77 % C): even fully quenched it forms little martensite, so welds stay tough and crack-free — ideal for welding. At 0.45 % C the steel is hypoeutectoid but close enough that quenching from the austenite field (above ~727 °C, per the diagram) transforms most of the structure to martensite, which can then be tempered to a hard, wear-resistant state. The carbon content sets which phase transformations are available; the heat treatment (next section) exploits them.

</details>

</details>

<svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simplified Fe-C phase diagram excerpt">
  <rect x="0" y="0" width="460" height="320" fill="#16213e"/>
  <line x1="60" y1="270" x2="420" y2="270" stroke="#4a90d9" stroke-width="2"/>
  <line x1="60" y1="270" x2="60" y2="30" stroke="#4a90d9" stroke-width="2"/>
  <text x="240" y="305" fill="#eee" font-size="13" text-anchor="middle">Carbon content (wt %)</text>
  <text x="20" y="150" fill="#eee" font-size="13" text-anchor="middle" transform="rotate(-90 20 150)">Temperature (°C)</text>
  <text x="60" y="288" fill="#aaa" font-size="11" text-anchor="middle">0</text>
  <text x="240" y="288" fill="#aaa" font-size="11" text-anchor="middle">0.77</text>
  <text x="420" y="288" fill="#aaa" font-size="11" text-anchor="middle">1.2</text>
  <text x="45" y="275" fill="#aaa" font-size="11" text-anchor="end">400</text>
  <text x="45" y="150" fill="#aaa" font-size="11" text-anchor="end">727</text>
  <text x="45" y="40" fill="#aaa" font-size="11" text-anchor="end">912</text>
  <text x="240" y="120" fill="#a8d8ea" font-size="14" text-anchor="middle">Austenite (γ)</text>
  <text x="130" y="200" fill="#74b9ff" font-size="12" text-anchor="middle">Ferrite + Pearlite</text>
  <text x="360" y="200" fill="#74b9ff" font-size="12" text-anchor="middle">Ferrite + Cementite</text>
  <line x1="60" y1="40" x2="240" y2="180" stroke="#e94560" stroke-width="2"/>
  <line x1="240" y1="180" x2="420" y2="120" stroke="#e94560" stroke-width="2"/>
  <line x1="60" y1="180" x2="420" y2="180" stroke="#e94560" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="240" y="196" fill="#e94560" font-size="11" text-anchor="middle">Eutectoid: 727 °C</text>
</svg>

### Melting and refining

Raw ore or scrap is melted, impurities are removed, and the melt is cast into a standard stock shape (ingot, billet, slab, rod). See [Casting](./Casting.md) for the casting process details.

<details><summary>Details</summary>

- **Steelmaking**: BOF or EAF melts iron ore/scrap; ladle refining adjusts chemistry; continuous casting produces slabs, billets, or blooms.
- **Aluminum**: Hall–Héroult electrolysis produces primary Al; scrap remelting cuts energy by ~95 %.
- **Polymers**: Monomers are polymerized (addition or condensation), then pelletized.

The key trade-off is purity versus cost: each additional refining step removes a specific impurity class but adds energy and capital.

</details>

<details><summary>Example problem</summary>

Why is scrap aluminum remelted rather than reprocessed through the Hall–Héroult cell, and what limits how much scrap can be used?

<details><summary>Solution</summary>

Hall–Héroult electrolysis breaks the very strong Al–O bond in alumina and costs roughly 14 kWh per kg of aluminum; remelting scrap needs only a few percent of that energy (~95 % saving), because the metal is already reduced. The limit is contamination: scrap carries alloying elements (Si, Fe, Cu) that accumulate, so mixed scrap is downgraded to casting alloys unless it is sorted by alloy family — which is why purity versus cost is the central trade-off of this stage.

</details>

</details>

### Bulk reduction to stock

After melting, the solid is reduced to a standard cross-section by bulk forming operations—rolling, extrusion, and drawing. See [Forming](./Forming.md) for process details, force calculations, and die design.

<details><summary>Details</summary>

The output of this stage is a standard cross-section (sheet, bar, rod, wire) ready for downstream forming or machining. The specific process mechanics—roll force, extrusion pressure, drawing reduction per pass—are covered in [Forming](./Forming.md).

</details>

<details><summary>Example problem</summary>

A 100 mm diameter billet must become 10 mm rod. Why is this done by hot extrusion (or hot rolling) in one pass rather than by cold drawing?

<details><summary>Solution</summary>

The total area reduction is (100/10)² = 100:1. Cold drawing is limited to ~20–40 % area reduction per pass (the work-hardened material tears or the die force explodes beyond that), so it would need many annealing-and-redraw cycles. Hot working above the recrystallization temperature keeps the material soft, so extrusion achieves the 100:1 reduction (typical range 5–20:1 per pass, with multi-hole dies or a two-step route covering the rest) in one operation; cold drawing is then used only for the final size, tolerance, and surface finish.

</details>

</details>

<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cross-section reduction in rolling, extrusion, and drawing">
  <rect x="0" y="0" width="520" height="240" fill="#16213e"/>
  <!-- Rolling -->
  <text x="90" y="30" fill="#eee" font-size="12" text-anchor="middle">Rolling</text>
  <circle cx="55" cy="70" r="22" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <circle cx="55" cy="110" r="22" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <rect x="20" y="84" width="30" height="12" fill="#e94560"/>
  <rect x="90" y="88" width="40" height="4" fill="#e94560"/>
  <text x="90" y="150" fill="#aaa" font-size="11" text-anchor="middle">Slab → sheet, 10–50:1 total</text>
  <!-- Extrusion -->
  <text x="270" y="30" fill="#eee" font-size="12" text-anchor="middle">Extrusion</text>
  <rect x="215" y="70" width="60" height="40" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <rect x="185" y="80" width="30" height="20" fill="#e94560"/>
  <path d="M275 82 L 305 86 L 305 94 L 275 98 Z" fill="#e94560"/>
  <text x="270" y="150" fill="#aaa" font-size="11" text-anchor="middle">Ram forces billet through die, 5–20:1</text>
  <!-- Drawing -->
  <text x="450" y="30" fill="#eee" font-size="12" text-anchor="middle">Drawing</text>
  <path d="M380 85 L 420 85 L 428 88 L 428 92 L 420 95 L 380 95 Z" fill="#e94560"/>
  <path d="M428 88 L 470 89.5 L 470 90.5 L 428 92 Z" fill="#e94560"/>
  <line x1="470" y1="90" x2="500" y2="90" stroke="#e94560" stroke-width="2"/>
  <path d="M500 90 L 492 86 L 492 94 Z" fill="#e94560"/>
  <text x="450" y="150" fill="#aaa" font-size="11" text-anchor="middle">Bar pulled through die → wire, 20–40%/pass</text>
  <text x="260" y="200" fill="#a8d8ea" font-size="12" text-anchor="middle">Hot working (above recrystallization) allows large reductions;</text>
  <text x="260" y="218" fill="#a8d8ea" font-size="12" text-anchor="middle">cold working gives final size, strength, and finish.</text>
</svg>

### Heat treatment

Heating and cooling a solid stock form—without changing its shape—to rearrange its phases is heat treatment. It is the cheapest property-modification lever in this page: the same 1045 steel bar can leave the mill at ~200 HB (annealed) or ~600 HB (quenched and tempered at low temperature) depending only on cooling path, as captured in a TTT (time–temperature–transformation) diagram.

- **Annealing**: slow furnace cool from above the transformation temperature; softens, relieves stress, maximizes ductility.
- **Quenching**: rapid cool (water, oil, air) from austenite; traps the hard, brittle martensite phase in steels.
- **Tempering**: reheat a quenched part to 150–650 °C then air-cool; trades a little hardness for toughness.
- **Solution treatment + aging**: dissolve alloying elements at high temperature, quench, then precipitate fine particles at moderate temperature (the basis of T4/T6 tempers in aluminum).

<details><summary>Details</summary>

Whether the desired phase forms is a **time** question as much as a temperature one, captured in an isothermal transformation (TTT) diagram: cool fast enough to skip the nose of the C-curve and you get martensite; cool slowly and you get soft pearlite. A 0.45 % C steel quenched in water crosses the nose in seconds and reaches ~600 HB after tempering at 200 °C; the same steel furnace-cooled reaches only ~200 HB because pearlite forms instead of martensite.

**Worked example — AISI 1045 gear blank.** Austenitize at 845 °C (fully austenitic per the Fe–C diagram), water-quench to room temperature in under 5 s (crosses the TTT nose → martensite, ~55 HRC), then temper at 400 °C for 1 h (→ tempered martensite, ~35 HRC, tough enough for gears). Skipping the temper leaves untempered martensite: hard but liable to crack spontaneously.

**Authoritative source:** [ASM Handbook, Volume 4: Heat Treating](https://dl.asminternational.org/handbooks/edited-volume/76/Heat-Treating)

</details>

<details><summary>Example problem</summary>

A 1045 steel pin must reach ~35 HRC for wear resistance, while a welded 1018 (0.18 % C) frame must stay soft and weldable. Which heat treatment applies to each, and why?

<details><summary>Solution</summary>

The pin: austenitize at ~845 °C, water-quench fast enough to miss the TTT nose (→ martensite, ~55 HRC), then temper at 400–600 °C to trade some hardness for toughness (~35 HRC). The frame: leave it hot-rolled or normalize it; its 0.18 % C cannot form much hard martensite, which is exactly what keeps the weld heat-affected zone from hardening and cracking — the same phase-diagram lever, used in the opposite direction.

</details>

</details>

<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schematic TTT diagram with cooling curves">
  <rect x="0" y="0" width="460" height="300" fill="#16213e"/>
  <line x1="60" y1="260" x2="430" y2="260" stroke="#4a90d9" stroke-width="2"/>
  <line x1="60" y1="260" x2="60" y2="30" stroke="#4a90d9" stroke-width="2"/>
  <text x="250" y="290" fill="#eee" font-size="12" text-anchor="middle">Time (log scale, s)</text>
  <text x="25" y="150" fill="#eee" font-size="12" text-anchor="middle" transform="rotate(-90 25 150)">Temperature (°C)</text>
  <path d="M150 60 C 120 110, 120 160, 160 210" fill="none" stroke="#e94560" stroke-width="2"/>
  <path d="M190 60 C 160 110, 160 160, 200 210" fill="none" stroke="#e94560" stroke-width="2"/>
  <text x="205" y="140" fill="#e94560" font-size="11">Pearlite / bainite C-curve</text>
  <line x1="60" y1="70" x2="430" y2="70" stroke="#74b9ff" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="300" y="62" fill="#74b9ff" font-size="11">Austenitize: ~850 °C</text>
  <line x1="60" y1="230" x2="430" y2="230" stroke="#74b9ff" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="300" y="248" fill="#74b9ff" font-size="11">M<sub>s</sub>: martensite start (~220 °C)</text>
  <path d="M70 70 L 95 225" fill="none" stroke="#a29bfe" stroke-width="2"/>
  <text x="80" y="255" fill="#a29bfe" font-size="11">Water quench → martensite</text>
  <path d="M70 70 L 200 130 L 430 200" fill="none" stroke="#a29bfe" stroke-width="2"/>
  <text x="290" y="120" fill="#a29bfe" font-size="11">Furnace cool → coarse pearlite (soft)</text>
</svg>

### Polymer stock production

Polymers skip melting-and-refining entirely: monomers are polymerized into resin, then shaped into stock. Three routes dominate:

- **Pelletizing extrusion**: molten polymer is extruded through a multi-hole die and chopped into pellets—the universal feedstock for injection molding and extrusion.
- **Injection molding of preforms**: pellets are melted and injected into a mold; for PET bottles, a molded "preform" is later reheated and blow-molded.
- **Fiber spinning**: molten or dissolved polymer is pushed through a spinneret (a plate of fine holes); the filaments are drawn 3–10× as they cool, which aligns the chains and multiplies tensile strength.

<details><summary>Details</summary>

**Worked example — PET bottle stock.** Polymerization produces PET pellets (~0.9 g each, dried to <50 ppm moisture or hydrolysis weakens the melt). The pellets are injection-molded into a 20 g preform that looks like a thick test tube with the bottle's threaded neck already formed. The preform is then reheated to ~100 °C, stretched, and blow-molded against a cold mold cavity. The stretch-aligning step raises the PET's strength roughly 2× versus unstretched material—same polymer, different processing history.

</details>

<details><summary>Example problem</summary>

A packaging line needs 20 000 PET bottles per hour. Why is the stock produced as preforms rather than blowing bottles directly from pellets, and why must the pellets be dried before melting?

<details><summary>Solution</summary>

Preforms decouple the two rate-limiting steps: injection molding a preform takes a few seconds and can run on many cavities in parallel, while blow-molding needs the bottle's own mold cycle; separating them lets each step run at its own optimum and lets preforms be shipped to bottling plants. The pellets must be dried to &lt;50 ppm moisture because at PET's ~250 °C processing temperature water hydrolyzes the ester bonds, cutting molecular weight and thus the strength that the stretch-aligning step is supposed to build.

</details>

</details>

### Powder, fiber, and ceramics processing

Not all stock is produced by bulk reduction. Four additional routes cover the remaining stock forms:

<details><summary>Details</summary>

- **Metal powders**: Melt is atomized by high-pressure gas (Ar, N₂) or water, producing spherical particles (10–150 µm). Powders feed powder metallurgy (pressing + sintering) or additive manufacturing.
- **Fiber / filament**: A bar or rod is drawn through a series of reducing dies (each pass 20–40 % area reduction) until the target diameter is reached. For optical fiber, a preform is drawn at ~2000 °C into a continuous strand.
- **Composites / fiber-reinforced polymer stock**: Continuous fibers (glass, carbon, aramid) are impregnated with resin to produce prepreg tape, roving, or woven fabric. The fiber is drawn or woven, then [Additive manufacturing](./Additive-manufacturing.md) builds continuous-fiber parts layer by layer.
- **Ceramics**: Powder (from chemical precipitation, sol–gel, or calcination) is compacted by uniaxial pressing, cold isostatic pressing, or hot isostatic pressing, then sintered at 0.7–0.9 <i>T<sub>m</sub></i> to bond particles. The result is a green or near-net-shape ceramic body.

</details>

<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gas atomization of metal powder">
  <rect x="0" y="0" width="520" height="260" fill="#16213e"/>
  <path d="M60 30 L140 30 L130 90 L70 90 Z" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <text x="100" y="20" fill="#eee" font-size="12" text-anchor="middle">Induction crucible</text>
  <line x1="100" y1="90" x2="100" y2="130" stroke="#e94560" stroke-width="4"/>
  <text x="160" y="115" fill="#74b9ff" font-size="11">Gas jets (Ar / N₂)</text>
  <line x1="150" y1="140" x2="108" y2="150" stroke="#74b9ff" stroke-width="2"/>
  <line x1="150" y1="160" x2="108" y2="155" stroke="#74b9ff" stroke-width="2"/>
  <circle cx="95" cy="170" r="4" fill="#e94560"/>
  <circle cx="110" cy="185" r="3" fill="#e94560"/>
  <circle cx="88" cy="195" r="5" fill="#e94560"/>
  <circle cx="103" cy="205" r="3" fill="#e94560"/>
  <path d="M40 220 L160 220 L130 250 L70 250 Z" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <text x="100" y="245" fill="#eee" font-size="11" text-anchor="middle">Powder: 10–150 µm</text>
  <text x="330" y="130" fill="#a8d8ea" font-size="12" text-anchor="middle">Spherical droplets freeze in flight:</text>
  <text x="330" y="150" fill="#a8d8ea" font-size="12" text-anchor="middle">surface tension pulls each one into a sphere,</text>
  <text x="330" y="170" fill="#a8d8ea" font-size="12" text-anchor="middle">which is why atomized powder flows and</text>
  <text x="330" y="190" fill="#a8d8ea" font-size="12" text-anchor="middle">packs uniformly in pressing and spreading.</text>
</svg>

**Worked example — gas atomization.** A 316L stainless melt is poured as a 4 mm stream and hit by 2 MPa argon jets. Surface tension breaks the stream into droplets that freeze before landing: most particles land between 10 and 150 µm. The powder is sieved, blended with a binder, pressed into a green compact, and sintered at 0.7–0.9 <i>T<sub>m</sub></i> to bond the particles into a solid part.

<details><summary>Example problem</summary>

A powder-metallurgy part must reach 99 % of theoretical density. Why is atomized (spherical) powder preferred over water-atomized (irregular) powder for this, and what step closes the last few percent of porosity?

<details><summary>Solution</summary>

Spherical particles roll and pack uniformly, giving a dense, even green compact; irregular particles bridge and leave large pores. Even so, pressing alone leaves 5–15 % porosity, so the final densification comes from **sintering**: at 0.7–0.9 <i>T<sub>m</sub></i>, diffusion rounds out the contact necks between particles and shrinks the pore network. For the last few percent (critical parts such as aerospace components), **hot isostatic pressing (HIP)** — argon gas at ~100–200 MPa and ~0.7 <i>T<sub>m</sub></i> — collapses the remaining pores plastically.

</details>

</details>

### Property specification and certification

Every stock lot carries a mill test certificate specifying chemistry, mechanical properties (tensile, yield, elongation, hardness), and sometimes NDE results. Verification methods are covered in [Metrology and quality control](./Metrology-and-quality-control.md).

<details><summary>Details</summary>

Standards such as ASTM A36 (structural steel), AMS 4928 (Ti-6Al-4V bars, wire, forgings, flash-welded rings, and drawn shapes), or ISO 6362 (aluminum extrusions) define the minimum properties. The buyer selects a grade that matches the downstream process: a casting grade has higher sulfur tolerance than a forging grade; a welding grade has controlled carbon equivalent.

**Non-destructive examination (NDE)** is required for critical applications (aerospace, pressure vessels, nuclear). Common methods:
- **Ultrasonic testing (UT)**: detects internal voids, inclusions, and laminations in billets, bars, and forgings.
- **X-ray / radiographic testing (RT)**: reveals internal porosity and cracks in castings and welds.
- **Magnetic particle inspection (MPI)**: surfaces and near-surface cracks in ferromagnetic stock (bars, plates).

</details>

## Production flow

<iframe src="./Materials-processing.simulation.html" title="Stock production flow: ore to finished stock"></iframe>

## Example problem

A designer needs a 200 mm × 200 mm × 50 mm block of 6061-T6 aluminum for a CNC-machined fixture. Which stock form and processing route should be specified?

<details><summary>Solution</summary>

1. **Stock form**: A 200 × 200 × 50 mm block is a *bar* (extruded or sawn from an extruded billet). Specify 6061-T6 flat bar, 200 × 200 mm cross-section, 50 mm length.
2. **Processing route**: Primary Al → continuous casting (billet) → hot extrusion (flat bar) → solution heat treatment (530 °C, 8 h) → quench → artificial aging (170 °C, 8 h) → T6 temper.
3. **Certification**: Mill test report per ASTM B221 (extruded Al bar) confirming chemistry (Si 0.4–0.8 %, Cu 0.15–0.40 %, Mg 0.8–1.2 %, etc.) and tensile ≥ 310 MPa.
4. **Downstream**: The block is then machined by [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md); the T6 temper gives a good balance of strength and machinability.

</details>

**Problem 2 — high-volume sheet-metal bracket.** A bracket is stamped from 2 mm sheet at 500 000 units/year. Which stock form and production route should be specified, and why not bar stock machined from solid?

<details><summary>Solution</summary>

1. **Stock form**: 2 mm sheet (strip coil), e.g., HSLA steel or 5052-H32 aluminum depending on load and corrosion requirements.
2. **Route**: Melt → continuous casting (slab) → hot rolling → cold rolling to 2 mm → coil.
3. **Why not bar**: machining each bracket from bar wastes most of the material and removes it at cutting-tool speed; stamping forms the whole part in one press stroke. At 500 000 units/year the die tooling amortizes to almost nothing per part, while per-part material and cycle time dominate — exactly the regime where sheet + stamping wins.

</details>

## Parent

This page is a class in the [Manufacturing](./Readme.md) topic.
