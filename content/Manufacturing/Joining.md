# Joining

Joining creates a material-level bond or fastener between two workpieces by welding, brazing, soldering, adhesive bonding, or mechanical fastening. It is relevant when a product is composed of multiple parts that must be connected with a joint that transfers load, seals a fluid, or carries electrical current.

> **Authoritative sources**
> - [ISO 4063:2023, Welding, brazing, soldering and cutting — Nomenclature of processes and reference numbers](https://www.iso.org/standard/75108.html)
> - [AWS D1.1:2020, Structural Welding Code — Steel](https://webstore.ansi.org/standards/aws/awsd11m2020)

## Utility

- Combines separately manufactured parts into a larger structure.
- Enables hybrid designs: a cast housing welded to a machined insert.
- Creates sealed joints for pressure vessels, pipelines, and electronic enclosures.

## Key concepts

The five categories below partition joining by the **physical mechanism** that creates the bond:

1. **Melting the base metal** → fusion welding
2. **Melting only a filler** (base metal stays solid) → brazing / soldering
3. **Chemical / polymer bond** → adhesive bonding
4. **Mechanical interlock** → fastening
5. **Plastic deformation without melting** → solid-state joining

A single product usually combines several of these mechanisms in sequence. Consider an electric-vehicle battery pack: the aluminum enclosure is **friction-stir welded** (solid-state) into a watertight housing; the copper busbars are **brazed** to the cell terminals for low-resistance current flow; the cells are **adhesively bonded** into the tray to distribute vibration load; and the whole tray is **riveted** (self-piercing) to the steel chassis. Each mechanism is chosen because it is the only one that satisfies that particular joint's load, seal, or electrical requirement.

### Fusion welding

The base metal at the joint is melted (with or without a filler) and the molten pool solidifies into a continuous joint.

<details><summary>Details</summary>

**Step 1 — The mechanism.** A concentrated heat source (arc, beam, flame, or resistive) raises the base metal at the joint above its melting point. The molten pool, optionally fed with a filler wire, wets the edges of the two parts; as the source moves on, the pool solidifies into a single continuous piece of metal. The region of base metal that was heated but not melted is the heat-affected zone (HAZ), whose microstructure and strength differ from both the weld and the untouched base metal.

**Step 2 — A worked example.** A 6 mm steel plate is butt-welded with GMAW (MIG). A 1.0 mm ER70S-6 wire is fed continuously into the arc; the arc melts a small pool in the plate and the wire tip. The welder travels at ~300 mm/min, laying down a bead. The heat input (voltage × current ÷ travel speed) sets the HAZ width: too high and the HAZ grows, softening the joint and distorting the plate; too low and the pool does not fully fuse the edges (lack of fusion).

**Step 3 — The main process families.**

- **Arc welding (SMAW, GMAW, GTAW)**: an electric arc between an electrode and the workpiece melts the metal. GMAW (MIG) is the most common for steel; GTAW (TIG) gives the highest quality for thin sections and reactive metals (titanium, stainless).
- **Resistance welding (spot, seam, projection)**: current passes through the joint; the I²R heat melts a small volume. Used for sheet metal (automotive body, appliances).
- **Oxy-fuel welding**: a flame (acetylene + oxygen) melts the metal. Used for repair and thin sections where arc equipment is impractical.
- **Electron beam / laser welding**: a focused beam melts a narrow, deep joint. Used for aerospace (titanium, nickel) and automotive (laser seam welding of body panels).

Key parameters: heat input (affects HAZ width and distortion), filler composition, preheat temperature, and post-weld heat treatment.

**Weld pool and HAZ schematic** (cross-section of a butt weld):

<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;">
  <rect x="0" y="40" width="170" height="100" fill="#8899aa" rx="2"/>
  <rect x="230" y="40" width="170" height="100" fill="#8899aa" rx="2"/>
  <path d="M170,40 Q200,140 230,40 Z" fill="#ffcc44" stroke="#cc8800" stroke-width="1"/>
  <path d="M170,40 Q200,140 230,40" fill="none" stroke="#cc8800" stroke-width="1"/>
  <rect x="155" y="40" width="15" height="100" fill="#cc6633" opacity="0.6"/>
  <rect x="230" y="40" width="15" height="100" fill="#cc6633" opacity="0.6"/>
  <text x="80" y="95" font-size="11" fill="#fff">Base metal</text>
  <text x="185" y="95" font-size="11" fill="#333">Weld</text>
  <text x="140" y="30" font-size="10" fill="#cc6633">HAZ</text>
  <text x="235" y="30" font-size="10" fill="#cc6633">HAZ</text>
  <line x1="162" y1="25" x2="162" y2="40" stroke="#cc6633" stroke-width="1"/>
  <line x1="238" y1="25" x2="238" y2="40" stroke="#cc6633" stroke-width="1"/>
</svg>

> **Authoritative sources**
> - [AWS D1.1:2020, Structural Welding Code — Steel](https://webstore.ansi.org/standards/aws/awsd11m2020)
> - [ISO 4063:2023, Nomenclature of welding processes](https://www.iso.org/standard/75108.html)

<details><summary>Example problem</summary>

A 3 mm stainless-steel sheet must be welded to a 3 mm titanium sheet for a sealed aerospace duct. Which arc process is most appropriate, and why?

<details><summary>Solution</summary>

GTAW (TIG). Both stainless and titanium are reactive at high temperature and need an inert atmosphere; TIG provides a stable, controllable arc with a narrow, clean pool and no spatter, and it is the standard process for thin reactive-metal sections. A shielding gas (argon, or argon/helium for titanium) protects the pool and the hot HAZ from oxidation. GMAW would introduce spatter and a wider HAZ that is harder to control on 3 mm reactive sheet.

</details>

</details>

</details>

### Brazing and soldering

A filler metal with a lower melting point than the base metal is drawn into the joint by capillary action; the base metal is not melted.

<details><summary>Details</summary>

**Step 1 — The mechanism.** The joint is heated above the filler's melting point but below the base metal's melting point. The molten filler wets the clean surfaces and is pulled into the narrow gap by capillary action (surface tension). On cooling, the filler solidifies, bonding the parts while the base metal has never melted — so there is no HAZ and the parts keep their original properties.

**Step 2 — A worked example.** A copper tube is inserted into a copper fitting with a 0.1 mm gap. The joint is fluxed and heated with a torch until the filler (a tin-silver-copper solder, melting ~217–230 °C) melts. The molten solder is drawn all the way around the joint by capillary action, and a thin fillet forms at the entry. The base copper stays solid throughout.

**Step 3 — Brazing vs. soldering.**

- **Brazing**: filler melts above 450 °C (e.g., copper-phosphorus, silver-based). Used for copper tubing, heat exchangers, and tool assembly.
- **Soldering**: filler melts below 450 °C (e.g., Sn-Pb, Sn-Ag-Cu). Used for [electronics](./Electronics/Readme.md) (PCB assembly), plumbing, and jewelry.
- **Flux**: removes oxide from the joint surfaces and protects the molten filler from re-oxidation.
- **Joint design**: the gap between parts (0.05–0.2 mm for brazing) must be uniform for capillary flow.

**Capillary action in a brazing joint** — the molten filler is drawn into the narrow gap by surface tension:

<iframe src="./Joining.simulation.html" title="Capillary action in a brazing joint — filler drawn into a gap by surface tension"></iframe>

> **Authoritative sources**
> - [AWS A5.10, Specification for Filler Metals for Brazing and Braze Welding](https://www.aws.org/)
> - [ISO 4063:2023, Nomenclature of brazing and soldering processes](https://www.iso.org/standard/75108.html)

<details><summary>Example problem</summary>

You must join two aluminum plates with a 0.15 mm uniform gap at a service temperature of 150 °C. Should you braise or solder, and what constrains the choice?

<details><summary>Solution</summary>

Braise. The 450 °C threshold is a process definition, not a service limit: the filler must melt above 450 °C to be called brazing, but the joint only needs to *survive* 150 °C. A silver- or aluminum-silicon brazing filler (melting ~600–650 °C) is used, with a flux suited to aluminum (which forms a stubborn oxide). Soldering would also work mechanically, but a solder joint's strength drops sharply near 150 °C, so brazing gives a safer margin. The 0.15 mm gap is within the 0.05–0.2 mm range needed for capillary flow.

</details>

</details>

</details>

### Adhesive bonding

A polymer or inorganic adhesive cures between two surfaces to create a bond.

<details><summary>Details</summary>

**Step 1 — The mechanism.** A liquid or semi-liquid adhesive is applied to the prepared surfaces, the parts are clamped, and the adhesive cures (by cross-linking, evaporation, or heat) into a solid that transfers load across the whole overlap area. Unlike a weld, the bond is a *layer* of material, so it carries load in shear and peel over a large area rather than through a narrow line.

**Step 2 — A worked example.** An automotive windshield is bonded to the roof with a structural urethane. The glass and metal are cleaned and primed, a bead of adhesive is dispensed, the glass is positioned, and it is clamped for ~30 minutes while the urethane cures. The cured joint carries the windshield's weight and, in a crash, keeps it in place.

**Step 3 — The main adhesive families.**

- **Structural adhesives**: epoxy, acrylic, or polyurethane. Bond strength 10–30 MPa in shear. Used for automotive (windshield, body panels), aerospace (composite-to-metal), and construction.
- **Instant adhesives (cyanoacrylate)**: cure in seconds. Used for small, low-stress joints.
- **Hot-melt adhesives**: thermoplastic, re-meltable. Used for packaging and assembly.
- **Advantages over welding**: joins dissimilar materials, distributes load over a larger area, no HAZ, lower energy.
- **Limitations**: limited temperature range, creep under sustained load, difficult to inspect.

> **Authoritative sources**
> - [ISO 13935, Determination of tensile adhesion of structural adhesives](https://www.iso.org/)
> - [ISO 4587, Determination of lap-shear strength of adhesive joints](https://www.iso.org/)

<details><summary>Example problem</summary>

A design team wants to replace a welded lap joint between two steel plates with an adhesive bond to avoid the HAZ. What is the most important mechanical failure mode to check, and why is it different from the weld?

<details><summary>Solution</summary>

Peel and shear at the ends of the overlap. In a lap joint the adhesive is loaded in shear, but the bending of the plates concentrates peel stress at the two ends of the overlap — the classic weak point. A weld, by contrast, is a continuous line of metal whose strength is set by the weld metal and HAZ, not by a peel concentration. So the adhesive design must lengthen the overlap and control the plate stiffness to keep end peel stress below the adhesive's peel strength, which is far lower than its shear strength.

</details>

</details>

</details>

### Mechanical fastening

A physical connector (bolt, rivet, pin, clip) clamps or interlocks two parts. Load-bearing, permanent fasteners (rivets) are the joining-side concern; disassemblable bolts, screws, and clips that arrange finished components into a product are covered in [Assembly](./Assembly.md).

<details><summary>Details</summary>

**Step 1 — The mechanism.** A fastener transfers load by bearing and clamp force rather than by a metallurgical bond. A rivet is permanently deformed so it cannot be removed; a bolt is loaded in tension to clamp the parts together, and the clamp force (preload) is what keeps the joint from separating under external load.

**Step 2 — A worked example.** Two aluminum airframe skins are joined with a solid rivet. A dimple is formed in the outer skin, the rivet is inserted, and a bucking bar behind the joint lets the gun upset the rivet tail, forming a second head that clamps the skins. The joint is permanent and carries the skin's shear load through the rivet bearing.

**Step 3 — The main fastener families.**

- **Riveted joints**: a rivet is deformed (solid, blind, or self-piercing) to clamp the parts. Used in aerospace (airframe skins) and construction.
- **Self-piercing rivets (SPR)**: a mandrel drives a rivet through two sheets without a pre-drilled hole, upsetting the tail to form a mechanical interlock. Used for joining steel to aluminum in automotive (e.g., mixed-material body-in-white).
- **Bolted joints**: a bolt in tension clamps the parts; preload is critical — a properly torqued bolt carries the external load in tension, not in bearing. General bolted-assembly practice (torque specs, patterns, disassemblable connections) belongs to [Assembly](./Assembly.md); here bolts matter only as permanent load-bearing joints.

**Bolt preload and joint separation** — an interactive showing how preload keeps a joint clamped under an external tensile load:

<iframe src="./Joining-bolt.simulation.html" title="Bolt preload versus external load — joint separation interactive"></iframe>

> **Authoritative sources**
> - [ASTM F742, Standard Specification for Solid Rivets, Steel, for General Use](https://www.astm.org/)
> - [ISO 4063:2023, Nomenclature of mechanical fastening processes](https://www.iso.org/standard/75108.html)

<details><summary>Example problem</summary>

A mixed-material car body joins a steel panel to an aluminum panel. Why is a self-piercing rivet preferred over a welded joint here?

<details><summary>Solution</summary>

Welding steel to aluminum forms brittle intermetallic compounds and requires dissimilar-metal welding techniques that are slow and hard to qualify. An SPR needs no pre-drilled hole, joins the two thicknesses in one stroke, and creates a mechanical interlock that is tolerant of the different thermal expansions of steel and aluminum. It is fast, repeatable, and works on the mixed-material body-in-white without a metallurgical bond.

</details>

</details>

</details>

### Solid-state joining

The base metal is plastically deformed or diffused at the interface **without melting**. No filler is required (or only a thin interlayer).

<details><summary>Details</summary>

**Step 1 — The mechanism.** The two surfaces are brought into intimate contact and bonded by plastic deformation or atomic diffusion, all below the melting point. Because nothing melts, there is no HAZ, no solidification cracking, and no porosity from a cooling pool — the joint is often as strong as the base metal.

**Step 2 — A worked example.** Two aluminum battery-enclosure halves are friction-stir welded. A rotating tool with a shoulder and a pin is plunged into the joint line and traversed along it; frictional heat softens (but does not melt) the metal, and the tool stirs and forges it into a continuous joint. The result is a watertight, near-full-strength seam with minimal distortion.

**Step 3 — The main solid-state processes.**

- **Friction stir welding (FSW)**: a rotating, non-consumable tool with a shoulder and pin is plunged into the joint line and traversed along it; frictional heat softens (but does not melt) the metal, and the tool stirs and forges the material into a continuous joint. Invented at TWI in 1991 (Wayne Thomas). Widely used in aerospace (airframe frames) and automotive (aluminum battery enclosures, body panels). Produces no porosity, no HAZ cracking, and minimal distortion.
- **Diffusion bonding**: two clean, flat surfaces are held in contact under pressure and temperature (typically $`0.5\text{–}0.8\, T_m`) for an extended time; atomic diffusion across the interface creates a metallurgical bond. Used for superalloy turbine disks, ceramic-to-metal seals, and semiconductor packaging.
- **Magnetic pulse welding (MPW)**: a high-current pulse generates a magnetic field that accelerates one part into the other at up to several hundred m/s (typically 100–500 m/s); the kinetic energy creates a solid-state bond through plastic deformation. Used for dissimilar-metal tubes (Al-to-steel heat exchangers) and automotive exhaust systems.

> **Authoritative sources**
> - [TWI, Friction stir welding](https://www.twi-global.com/technical-knowledge/job-knowledge/friction-stir-welding-147)
> - [GB 2306366 A, Friction stir welding patent (Thomas, 1991)](https://patents.google.com/patent/GB2306366A/en)

<details><summary>Example problem</summary>

A turbine disk is made by diffusion bonding two superalloy rings at $`0.7\, T_m` under vacuum. Why is this preferred over fusion welding the ring?

<details><summary>Solution</summary>

Superalloys are prone to solidification cracking and coarse, brittle grain growth when fusion-welded, and a weld pool would degrade the high-temperature creep strength the disk needs. Diffusion bonding at $`0.7\, T_m` keeps the material solid, so the fine, directionally solidified grain structure and the alloy's precipitate strengthening are preserved across the joint. The bond forms by atomic diffusion, giving a joint with essentially the same creep life as the base metal.

</details>

</details>

</details>

## Joint design and non-destructive evaluation

The geometry, gap, and inspection of a joint determine whether the chosen mechanism actually produces a sound, load-carrying connection.

<details><summary>Details</summary>

**Step 1 — Joint geometry sets the load path.** The geometry of the joint determines load path, stress concentration, and which joining process can be applied. The four basic geometries are the lap, butt, T, and corner joints.

<svg viewBox="0 0 520 120" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;">
  <!-- Lap joint -->
  <rect x="10" y="30" width="80" height="20" fill="#8899aa"/>
  <rect x="40" y="50" width="80" height="20" fill="#8899aa"/>
  <text x="30" y="100" font-size="11" text-anchor="middle">Lap</text>
  <!-- Butt joint -->
  <rect x="140" y="30" width="40" height="40" fill="#8899aa"/>
  <rect x="180" y="30" width="40" height="40" fill="#8899aa"/>
  <line x1="180" y1="30" x2="180" y2="70" stroke="#ffcc44" stroke-width="3"/>
  <text x="180" y="100" font-size="11" text-anchor="middle">Butt</text>
  <!-- T joint -->
  <rect x="280" y="30" width="40" height="40" fill="#8899aa"/>
  <rect x="260" y="60" width="80" height="20" fill="#8899aa"/>
  <text x="300" y="100" font-size="11" text-anchor="middle">T</text>
  <!-- Corner joint -->
  <rect x="400" y="30" width="20" height="50" fill="#8899aa"/>
  <rect x="400" y="60" width="50" height="20" fill="#8899aa"/>
  <text x="425" y="100" font-size="11" text-anchor="middle">Corner</text>
</svg>

**Step 2 — Gap tolerance is process-specific.** The gap between the parts must match the process, or the joint fails:

- **Brazing / soldering**: 0.05–0.2 mm uniform gap; capillary flow fails if the gap is too large (>0.3 mm) or too small (<0.03 mm).
- **Fusion welding**: root gap 0–2 mm (butt welds); too large a gap causes burn-through, too small causes lack of fusion.
- **Adhesive bonding**: 0.1–0.5 mm; too thick a bead reduces shear strength.

**Step 3 — Non-destructive evaluation (NDE) verifies the joint.** Because a joint's flaws are often internal, NDE methods inspect without destroying the part:

<table>
<tr><th>Method</th><th>Detects</th><th>Typical use</th></tr>
<tr><td>Dye penetrant</td><td>Surface-breaking cracks, porosity</td><td>Quick field inspection of welds, castings</td></tr>
<tr><td>X-ray / CT</td><td>Internal voids, lack of fusion, inclusions</td><td>Pressure vessels, aerospace welds</td></tr>
<tr><td>Ultrasonic (UT)</td><td>Internal flaws, thickness measurement</td><td>Thick-section welds, pipelines</td></tr>
<tr><td>Eddy current</td><td>Surface/near-surface cracks, coating thickness</td><td>Heat-exchanger tubes, aerospace</td></tr>
<tr><td>Magnetic particle</td><td>Surface/near-surface flaws in ferromagnetic parts</td><td>Steel welds, castings</td></tr>
</table>

> **Authoritative sources**
> - [ISO 17635, General guidelines for the technical specification for the examination of welds by non-destructive testing](https://www.iso.org/)
> - [ASTM E165, Standard Practice for Liquid Penetrant Inspection](https://www.astm.org/)

<details><summary>Example problem</summary>

A thick (40 mm) steel pipeline weld must be inspected for internal flaws. Which NDE method is most appropriate, and why not dye penetrant?

<details><summary>Solution</summary>

Ultrasonic testing (UT). UT penetrates the full 40 mm thickness and detects internal flaws (lack of fusion, slag inclusions, internal cracks) and measures wall thickness. Dye penetrant only reveals surface-breaking defects, so it cannot see the internal flaws that are the real risk in a thick-section pipeline weld. X-ray/CT would also work but is slower and more expensive for long pipeline runs, so UT is the standard choice.

</details>

</details>

</details>

See [Metrology and quality control](./Metrology-and-quality-control.md) for detailed NDE methodology and acceptance criteria.

## Quizz

<details><summary>Example problem</summary>

A stainless steel (316L) heat exchanger requires brazed joints between copper tubes and a stainless steel header. The operating temperature is 200 °C. Which joining process and filler should be used?

<details><summary>Solution</summary>

1. **Challenge**: Copper and stainless steel are dissimilar; a direct fusion weld would produce a brittle intermetallic. The joint must be brazed.
2. **Filler**: A silver-based filler (e.g., Ag-Cu, 70 wt% Ag) has a solidus at ~779 °C (the Ag–Cu eutectic is at 71.9 wt% Ag, 779 °C; a 70/30 alloy is slightly hypoeutectic so its solidus is at the eutectic temperature). This is well above the 450 °C brazing threshold. It wets both copper and stainless steel.
3. **Flux**: A borax-based flux for high-temperature brazing, or a vacuum/furnace brazing process (no flux needed).
4. **Process**: Furnace brazing in a vacuum or inert atmosphere (argon). The assembly is heated to ~800 °C, held for 5–10 min, then cooled.
5. **Joint design**: The tube-to-header joint is a lap joint with a 0.1 mm gap for capillary flow.
6. **Inspection**: Dye penetrant or X-ray to verify full penetration and absence of voids.

</details>

</details>

## Related pages

- [Assembly](./Assembly.md) — arranges finished components into a product; joining creates the material-level bond between them.
- [Electronics](./Electronics/Readme.md) — soldering in PCB assembly and interconnect contexts.
- [Surface finishing](./Surface-finishing.md) — surface preparation (cleaning, roughening) before joining.
- [Metrology and quality control](./Metrology-and-quality-control.md) — NDE methods and acceptance criteria for joints.

## Parent

This page is a class in the [Manufacturing](./Readme.md) topic.

