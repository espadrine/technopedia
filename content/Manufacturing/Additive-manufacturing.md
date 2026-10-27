# Additive manufacturing

Additive manufacturing builds a part by adding material layer by layer, following a digital model. It is relevant when the geometry is too complex for subtractive or forming processes, when rapid prototyping is needed, or when topologically optimized parts with internal channels and lattice structures are required.

> **Authoritative sources**
> - [ISO/ASTM 52900:2021, Additive manufacturing — General principles — Fundamentals and vocabulary](https://www.iso.org/standard/74514.html)
> - [ASTM F2792-12, Standard Terminology for Additive Manufacturing Technologies](https://www.astm.org/f2792-12.html)

## Utility

- Produces geometries impossible by other means: internal channels, conformal cooling, lattice structures, organic freeform surfaces.
- No tooling cost; a single machine can produce one part or ten thousand.
- Reduces part count: a multi-part assembly can be printed as a single piece.

The five process categories below correspond to five of the seven ISO/ASTM 52900 process families (Material extrusion, Vat photopolymerization, Powder bed fusion, Binder jetting, Directed energy deposition). The two remaining families are: **Material jetting** (droplet-based deposition, e.g. PolyJet / MJMJ, where a piezoelectric printhead jets photopolymer droplets that are UV-cured in flight) and **Sheet lamination** (bonding and cutting thin sheets layer by layer, e.g. LOM / UAM).

## History

- **1986** — Scott Crump patents FDM (fused deposition modeling) at 3D Systems; Chuck Hull patents stereolithography (SLA) the same year.
- **1989** — Carl Deckard at the University of Texas patents selective laser sintering (SLS).
- **1990s** — Metal powder-bed fusion (SLM/DMLS) and electron-beam melting (EBM) emerge from aerospace R&D.
- **2010s** — Commercialization accelerates: multi-laser SLM machines, large-format FDM, and binder-jetting production lines bring AM into serial manufacturing.

## How additive manufacturing works

All five processes share the same fundamental workflow: a digital model is converted into horizontal slices, and material is deposited or solidified one slice at a time until the part is complete.

<svg width="620" height="70" viewBox="0 0 620 70" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#aaa"/>
    </marker>
  </defs>
  <rect x="5" y="15" width="110" height="40" rx="6" fill="#2196F3" opacity="0.85"/>
  <text x="60" y="40" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif">CAD model</text>
  <line x1="115" y1="35" x2="145" y2="35" stroke="#aaa" stroke-width="2" marker-end="url(#arr)"/>
  <rect x="150" y="15" width="110" height="40" rx="6" fill="#4CAF50" opacity="0.85"/>
  <text x="205" y="40" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif">Slice</text>
  <line x1="260" y1="35" x2="290" y2="35" stroke="#aaa" stroke-width="2" marker-end="url(#arr)"/>
  <rect x="295" y="15" width="110" height="40" rx="6" fill="#FF9800" opacity="0.85"/>
  <text x="350" y="40" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif">Build</text>
  <line x1="405" y1="35" x2="435" y2="35" stroke="#aaa" stroke-width="2" marker-end="url(#arr)"/>
  <rect x="440" y="15" width="130" height="40" rx="6" fill="#9C27B0" opacity="0.85"/>
  <text x="505" y="40" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif">Post-process</text>
</svg>

### Slicing

The CAD model (typically a watertight STL or STEP file) is sliced into thin horizontal layers by slicer software. Each layer becomes a toolpath: the sequence of positions where material is deposited (extrusion, laser scan, binder jet) or where the build platform moves. Layer thickness determines Z-resolution and build time.

### Build orientation

The part is oriented in the build volume to balance three competing factors:

- **Strength**: the XY-plane (within a layer) is stronger than the Z-direction (between layers) in most processes.
- **Supports**: fewer overhangs reduce support material and post-processing effort.
- **Build time**: a shorter Z-extent means fewer layers and a faster build.

### Supports and the 45° rule

In most processes, a surface that overhangs more than 45° from vertical cannot be built without support, because the new layer has nothing beneath it to adhere to. Support structures are added by the slicer and removed after the build. In powder-bed processes (SLS, SLM), the surrounding unfused powder acts as a natural support, eliminating the need for separate support structures.

<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Build platform -->
  <rect x="20" y="170" width="260" height="10" fill="#555"/>
  <text x="150" y="195" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Build platform</text>
  <!-- Part body (vertical wall) -->
  <rect x="40" y="50" width="60" height="120" fill="#4a90d9" opacity="0.7"/>
  <!-- 45 degree overhang (no support needed) -->
  <polygon points="100,50 160,110 100,110" fill="#4a90d9" opacity="0.5"/>
  <text x="130" y="85" fill="#fff" font-size="10" font-family="sans-serif" transform="rotate(45,130,85)">≤ 45°</text>
  <!-- Steep overhang (support needed) -->
  <polygon points="100,110 170,130 100,170" fill="#e94560" opacity="0.5"/>
  <text x="140" y="155" fill="#fff" font-size="10" font-family="sans-serif" transform="rotate(15,140,155)">&gt; 45°</text>
  <!-- Support structure -->
  <line x1="120" y1="130" x2="120" y2="170" stroke="#e94560" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="140" y1="135" x2="140" y2="170" stroke="#e94560" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="160" y1="140" x2="160" y2="170" stroke="#e94560" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="145" y="165" fill="#e94560" font-size="9" font-family="sans-serif">supports</text>
  <!-- Angle arc -->
  <path d="M 100 110 A 30 30 0 0 0 121 131" fill="none" stroke="#ffd700" stroke-width="1.5"/>
  <text x="108" y="128" fill="#ffd700" font-size="9" font-family="sans-serif">45°</text>
</svg>

### Why layer-by-layer enables new geometry

Subtractive processes remove material from a solid block; forming deforms a sheet or billet. Both are constrained by the tool's access to the surface. Additive processes build from the inside out: every voxel is reachable by the deposition head, so internal channels, conformal cooling passages, and lattice infill become possible without any tool access. This is the fundamental reason additive manufacturing exists as a distinct class.

## Key concepts

### Fused deposition modeling (FDM) / Fused filament fabrication (FFF)

A thermoplastic filament is melted in a heated nozzle and deposited as a continuous bead, layer by layer, on a build platform.

<details><summary>Details</summary>

**Step 1 — Filament feeding.** A drive motor pulls a 1.75 mm or 2.85 mm thermoplastic filament through a heated block (typically 180–400 °C depending on material). The filament softens and is pushed through a small orifice (0.2–0.6 mm) as a molten bead.

<svg width="280" height="180" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  <!-- Heated block -->
  <rect x="80" y="20" width="120" height="80" rx="4" fill="#555" stroke="#777" stroke-width="1"/>
  <text x="140" y="65" text-anchor="middle" fill="#ff6b6b" font-size="11" font-family="sans-serif">Heated block</text>
  <text x="140" y="80" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">(200–400 °C)</text>
  <!-- Filament entering -->
  <rect x="130" y="0" width="20" height="25" fill="#ff6b6b" opacity="0.7"/>
  <text x="160" y="15" fill="#aaa" font-size="10" font-family="sans-serif">Filament</text>
  <!-- Nozzle tip -->
  <polygon points="120,100 160,100 145,130 135,130" fill="#888"/>
  <text x="170" y="120" fill="#aaa" font-size="10" font-family="sans-serif">Nozzle</text>
  <!-- Molten bead -->
  <ellipse cx="140" cy="135" rx="12" ry="5" fill="#e94560"/>
  <!-- Deposited layer -->
  <rect x="60" y="140" width="160" height="8" fill="#ff6b6b" opacity="0.6"/>
  <text x="230" y="148" fill="#aaa" font-size="10" font-family="sans-serif">Bead</text>
  <!-- Previous layer -->
  <rect x="60" y="148" width="160" height="8" fill="#aa3333" opacity="0.5"/>
  <text x="230" y="156" fill="#aaa" font-size="10" font-family="sans-serif">Layer below</text>
  <!-- Heat arrows -->
  <line x1="100" y1="40" x2="100" y2="90" stroke="#ff6b6b" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="180" y1="40" x2="180" y2="90" stroke="#ff6b6b" stroke-width="1" stroke-dasharray="3,2"/>
</svg>

**Step 2 — Layer deposition.** The nozzle follows a 2-D toolpath (the slice) while extruding. The bead solidifies on contact with the layer below, bonding by diffusion. Layer height is typically 0.05–0.3 mm.

**Step 3 — Infill and perimeter.** The slicer generates outer perimeters (walls) and an interior infill pattern (grid, gyroid, honeycomb) at 10–100 % density. The infill pattern affects stiffness, weight, and print time.

**Step 4 — Supports.** Overhanging features (>45° from vertical) require support structures printed in a soluble or breakable material. Supports are removed after the build.

**Step 5 — Anisotropy.** The part is weaker in the Z-direction (between layers) than in the XY-plane. A 90° bend across layers can reduce tensile strength by up to 50 %.

**Materials**: PLA, ABS, PETG, nylon, carbon-fiber-filled composites, PEEK.

**Typical use**: functional prototypes, jigs, fixtures, low-stress end-use parts.

> **Authoritative sources**
> - [US Patent 4,542,027 — Crump, Apparatus for making three dimensional objects (1985)](https://patents.google.com/patent/US4542027)

<details><summary>Example problem</summary>

A 50 mm × 50 mm × 10 mm plate is printed in PLA with 0.2 mm layers, 20 % gyroid infill, and 2 perimeters. Estimate the number of layers and the approximate print time if the nozzle deposits at 50 mm/s and the total extrusion path length is 12 000 mm.

<details><summary>Solution</summary>

1. Number of layers: 10 mm / 0.2 mm = 50 layers.
2. Print time: 12 000 mm / 50 mm/s = 240 s ≈ 4 min (extrusion time only; travel and cooling add ~30–50 %).

</details>

</details>

</details>

### Stereolithography (SLA) / Digital light processing (DLP)

A UV laser (SLA) or projector (DLP) selectively cures a liquid photopolymer resin, one thin layer at a time, in a vat.

<details><summary>Details</summary>

**Step 1 — Vat and platform.** A transparent-bottomed vat holds liquid photopolymer resin. A build platform starts just below the resin surface.

**Step 2 — Curing.** A UV laser (SLA) or a UV projector (DLP) traces the cross-section of the first layer through the resin. The exposed resin polymerizes and adheres to the platform.

<svg width="280" height="200" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Vat -->
  <rect x="40" y="40" width="200" height="140" rx="4" fill="none" stroke="#777" stroke-width="2"/>
  <!-- Resin -->
  <rect x="42" y="60" width="196" height="118" fill="#4a90d9" opacity="0.25"/>
  <text x="140" y="130" text-anchor="middle" fill="#4a90d9" font-size="11" font-family="sans-serif">Resin</text>
  <!-- Laser beam -->
  <line x1="140" y1="10" x2="140" y2="60" stroke="#ff0" stroke-width="2"/>
  <circle cx="140" cy="60" r="4" fill="#ff0"/>
  <text x="155" y="25" fill="#ff0" font-size="10" font-family="sans-serif">UV laser</text>
  <!-- Laser head -->
  <rect x="120" y="5" width="40" height="12" rx="2" fill="#888"/>
  <!-- Platform -->
  <rect x="80" y="55" width="120" height="6" fill="#888"/>
  <text x="210" y="60" fill="#aaa" font-size="10" font-family="sans-serif">Platform</text>
  <!-- Cured layer on platform -->
  <rect x="100" y="48" width="80" height="7" fill="#e94560" opacity="0.7"/>
  <text x="210" y="52" fill="#e94560" font-size="10" font-family="sans-serif">Cured layer</text>
  <!-- Lift arrow -->
  <line x1="140" y1="45" x2="140" y2="25" stroke="#fff" stroke-width="1.5" marker-end="url(#arr2)"/>
  <defs>
    <marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#fff"/>
    </marker>
  </defs>
  <text x="148" y="35" fill="#fff" font-size="9" font-family="sans-serif">Lift</text>
  <!-- Transparent bottom -->
  <rect x="40" y="178" width="200" height="4" fill="#aaa" opacity="0.5"/>
  <text x="140" y="195" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Transparent vat bottom</text>
</svg>

**Step 3 — Layer separation.** The platform lifts out of the resin by one layer thickness (25–150 µm). A doctor blade (SLA) or the projector's next frame (DLP) exposes a fresh resin surface.

**Step 4 — Repeat.** Steps 2–3 repeat until the part is complete.

**Step 5 — Post-processing.** The part is washed in isopropyl alcohol to remove uncured resin, then UV-cured in a chamber for 10–60 min to reach full mechanical properties.

**Resolution**: XY 25–100 µm, Z 25–150 µm. Much finer than FDM.

**Materials**: standard resins, tough resins, flexible resins, castable resins (for jewelry), dental resins.

**Limitations**: resins are typically brittle, have limited temperature resistance, and are not suitable for high-stress structural parts.

**Typical use**: high-detail prototypes, dental models, jewelry masters, small functional parts.

> **Authoritative sources**
> - [US Patent 4,575,330 — Hull, Apparatus for production of three-dimensional objects by stereolithography (1986)](https://patents.google.com/patent/US4575330)

<details><summary>Example problem</summary>

A dental crown 15 mm tall is printed in SLA with 50 µm layer height. How many layers are required, and what is the minimum build time if each layer takes 2 s to cure?

<details><summary>Solution</summary>

1. Number of layers: 15 mm / 0.05 mm = 300 layers.
2. Minimum cure time: 300 × 2 s = 600 s = 10 min (plus wash and post-cure).

</details>

</details>

</details>

### Selective laser sintering (SLS) / Selective laser melting (SLM) / Electron beam melting (EBM)

A laser or electron beam selectively fuses (SLM, EBM) or sinters (SLS) a powder bed, one layer at a time.

<details><summary>Details</summary>

**Step 1 — Powder spreading.** A recoater blade spreads a thin layer of powder (50–100 µm) over the build platform.

<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Container -->
  <rect x="30" y="30" width="240" height="150" rx="3" fill="none" stroke="#777" stroke-width="2"/>
  <!-- Powder bed (unfused) -->
  <rect x="32" y="100" width="236" height="78" fill="#555" opacity="0.4"/>
  <text x="150" y="150" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">Unfused powder</text>
  <!-- Fused part (bottom layers) -->
  <rect x="80" y="140" width="140" height="38" fill="#c0c0c0" opacity="0.8"/>
  <text x="150" y="163" text-anchor="middle" fill="#333" font-size="10" font-family="sans-serif">Fused part</text>
  <!-- Current layer being scanned -->
  <rect x="80" y="135" width="140" height="5" fill="#ffd700" opacity="0.9"/>
  <!-- Laser -->
  <line x1="150" y1="10" x2="150" y2="135" stroke="#ff0000" stroke-width="2"/>
  <circle cx="150" cy="135" r="4" fill="#ff4444"/>
  <rect x="130" y="5" width="40" height="12" rx="2" fill="#888"/>
  <text x="175" y="15" fill="#ff4444" font-size="10" font-family="sans-serif">Laser</text>
  <!-- Recoater blade -->
  <rect x="30" y="95" width="240" height="4" fill="#4a90d9"/>
  <text x="250" y="93" fill="#4a90d9" font-size="9" font-family="sans-serif">Recoater</text>
  <!-- Platform -->
  <rect x="50" y="178" width="200" height="6" fill="#666"/>
  <text x="150" y="195" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Build platform</text>
</svg>

**Step 2 — Selective fusion.** A laser (SLM: 400–1000 W single laser; up to 4 × 400 W = 1600 W multi-laser, e.g. EOS M400-4, SLM 280 PS) or an electron beam (EBM) scans the cross-section, fully melting (SLM) or sintering (SLS) the powder in the exposed regions.

**Step 3 — Platform descent.** The build platform lowers by one layer thickness. A new powder layer is spread. Steps 2–3 repeat.

**Step 4 — Powder removal.** After the build, the part is buried in unfused powder. The powder is blown or brushed away. In SLS, the unfused powder acts as support, so no separate support structures are needed.

**Step 5 — Post-processing.** Metal parts require heat treatment (stress relief at 550–650 °C for Ti-6Al-4V, aging for Ni superalloys) and often [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) for critical surfaces.

**SLS (polymer)**: nylon (PA12) powder is selectively sintered. Parts are isotropic in the XY-plane but anisotropic in Z.

**EBM (Electron Beam Melting, PBF-EB)**: an electron beam in a vacuum chamber scans a preheated powder bed (up to 1000 °C). The preheating reduces thermal stress, making it suitable for reactive alloys (titanium, tantalum, niobium). Build rates are higher than SLM but surface finish is coarser.

**Build envelope**: typically 250 × 250 × 300 mm (polymer) or 250 × 250 × 330 mm (metal).

**Defects**: lack of fusion, porosity, spatter, warping. Process parameters (laser power, scan speed, hatch spacing) are critical and material-specific.

**Typical use**: aerospace brackets, turbine blades, medical implants, tooling inserts.

> **Authoritative sources**
> - [US Patent 4,863,538 — Deckard et al., Method of producing parts by selective sintering (1989)](https://patents.google.com/patent/US4863538)
> - [K. V. S. S. et al., "Selective laser melting of metallic powders: a review," *Materials Science and Engineering A*, 2020](https://doi.org/10.1016/j.msea.2020.142589)

<details><summary>Example problem</summary>

A Ti-6Al-4V bracket 80 mm tall is built by SLM with 60 µm layers and a single 400 W laser. The hatch spacing is 80 µm and the scan speed is 1000 mm/s. Estimate the number of layers and the approximate laser-on time for one layer if the cross-section area is 2000 mm².

<details><summary>Solution</summary>

1. Number of layers: 80 mm / 0.06 mm ≈ 1333 layers.
2. Laser-on time per layer: the laser must cover 2000 mm² at 80 µm hatch spacing. Total scan length = 2000 mm² / 0.08 mm = 25 000 mm. Time = 25 000 mm / 1000 mm/s = 25 s per layer.
3. Total laser-on time: 1333 × 25 s ≈ 33 325 s ≈ 9.3 h (plus recoating and platform movement).

</details>

</details>

</details>

### Binder jetting

A liquid binder is selectively jetted onto a powder bed to bond particles into a "green" part; the green part is then sintered or infiltrated to reach full density.

<details><summary>Details</summary>

**Step 1 — Powder spreading.** A thin layer of powder (sand, metal, or ceramic) is spread over the build platform.

**Step 2 — Binder jetting.** A piezoelectric printhead (similar to an inkjet) selectively deposits droplets of liquid binder onto the powder, bonding particles where the binder lands. The entire layer is printed in one pass, making binder jetting much faster than laser-based processes.

<svg width="280" height="200" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Container -->
  <rect x="30" y="30" width="220" height="150" rx="3" fill="none" stroke="#777" stroke-width="2"/>
  <!-- Powder bed -->
  <rect x="32" y="120" width="216" height="58" fill="#8B7355" opacity="0.4"/>
  <text x="140" y="155" text-anchor="middle" fill="#8B7355" font-size="10" font-family="sans-serif">Powder bed</text>
  <!-- Green part (bottom) -->
  <rect x="80" y="145" width="120" height="33" fill="#6B4226" opacity="0.7"/>
  <text x="140" y="165" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">Green part</text>
  <!-- Current layer -->
  <rect x="80" y="140" width="120" height="5" fill="#D2691E" opacity="0.8"/>
  <!-- Printhead -->
  <rect x="60" y="40" width="160" height="20" rx="3" fill="#888"/>
  <text x="140" y="55" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">Printhead</text>
  <!-- Nozzles -->
  <line x1="80" y1="60" x2="80" y2="70" stroke="#aaa" stroke-width="1"/>
  <line x1="100" y1="60" x2="100" y2="70" stroke="#aaa" stroke-width="1"/>
  <line x1="120" y1="60" x2="120" y2="70" stroke="#aaa" stroke-width="1"/>
  <line x1="140" y1="60" x2="140" y2="70" stroke="#aaa" stroke-width="1"/>
  <line x1="160" y1="60" x2="160" y2="70" stroke="#aaa" stroke-width="1"/>
  <line x1="180" y1="60" x2="180" y2="70" stroke="#aaa" stroke-width="1"/>
  <line x1="200" y1="60" x2="200" y2="70" stroke="#aaa" stroke-width="1"/>
  <!-- Droplets -->
  <circle cx="100" cy="80" r="3" fill="#4a90d9"/>
  <circle cx="120" cy="85" r="3" fill="#4a90d9"/>
  <circle cx="140" cy="80" r="3" fill="#4a90d9"/>
  <circle cx="160" cy="85" r="3" fill="#4a90d9"/>
  <circle cx="180" cy="80" r="3" fill="#4a90d9"/>
  <text x="210" y="85" fill="#4a90d9" font-size="9" font-family="sans-serif">Binder</text>
  <!-- Platform -->
  <rect x="50" y="178" width="180" height="6" fill="#666"/>
  <text x="140" y="195" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Build platform</text>
</svg>

**Step 3 — Layer stacking.** The platform lowers, a new powder layer is spread, and the process repeats. The green part is held together by the binder.

**Step 4 — Debinding and sintering.** The green part is removed from the powder. For metal parts, it is first debound (binder removed by heat or solvent), then sintered in a furnace. Sintering causes **volumetric shrinkage of ~15–20 %** (equivalent to a **linear shrinkage of ~5–10 %**); the CAD model must be scaled up by the inverse of the linear shrinkage to compensate. Alternatively, the part can be infiltrated with molten metal to close porosity.

**Materials**: sand (for molds), metal powders (steel, aluminum, titanium), ceramic powders.

**Limitations**: as-printed (green) parts are weak; the sintering step is required for full density.

**Typical use**: high-volume production of small metal parts (jewelry, dental, consumer goods), sand molds for [Casting](./Casting.md).

> **Authoritative sources**
> - [US Patent 5,464,542 — Levy et al., Three-dimensional object manufacturing (1995)](https://patents.google.com/patent/US5464542)

<details><summary>Example problem</summary>

A steel gear 30 mm in diameter is printed by binder jetting and then sintered. The linear shrinkage is 8 %. What diameter should the green part be printed at to achieve a final 30 mm diameter?

<details><summary>Solution</summary>

Final = Green × (1 − shrinkage)
30 = Green × 0.92
Green = 30 / 0.92 ≈ 32.6 mm

The green part must be printed at ≈ 32.6 mm diameter.

</details>

</details>

</details>

### Directed energy deposition (DED)

A metal wire or powder is fed into a laser or electron-beam melt pool on a substrate, building material in a 3-D path.

<details><summary>Details</summary>

**Step 1 — Substrate preparation.** A metal substrate (or existing part for repair) is clamped to a multi-axis stage.

**Step 2 — Melt pool formation.** A laser (DMD: 1–10 kW) or an electric arc (WAAM: TIG, MIG, or plasma) creates a small melt pool on the substrate surface.

<svg width="280" height="200" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Substrate -->
  <rect x="40" y="150" width="200" height="20" fill="#666"/>
  <text x="140" y="165" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">Substrate</text>
  <!-- Deposited beads -->
  <rect x="60" y="140" width="160" height="10" fill="#c0c0c0" opacity="0.7"/>
  <rect x="70" y="130" width="140" height="10" fill="#c0c0c0" opacity="0.6"/>
  <rect x="80" y="120" width="120" height="10" fill="#c0c0c0" opacity="0.5"/>
  <!-- Torch head -->
  <rect x="110" y="20" width="60" height="40" rx="4" fill="#888"/>
  <text x="140" y="45" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">Torch</text>
  <!-- Laser/arc beam -->
  <line x1="140" y1="60" x2="140" y2="118" stroke="#ff4444" stroke-width="2"/>
  <circle cx="140" cy="120" r="6" fill="#ff6600" opacity="0.8"/>
  <text x="155" y="90" fill="#ff4444" font-size="10" font-family="sans-serif">Laser / Arc</text>
  <!-- Wire feed -->
  <line x1="170" y1="30" x2="145" y2="115" stroke="#aaa" stroke-width="3"/>
  <text x="185" y="35" fill="#aaa" font-size="10" font-family="sans-serif">Wire</text>
  <!-- Melt pool glow -->
  <ellipse cx="140" cy="122" rx="15" ry="5" fill="#ff6600" opacity="0.4"/>
  <!-- Multi-axis hint -->
  <text x="40" y="190" fill="#aaa" font-size="9" font-family="sans-serif">4–5 axis stage</text>
  <line x1="40" y1="175" x2="240" y2="175" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/>
</svg>

**Step 3 — Material feeding.** A wire (0.5–3 mm diameter) or powder is fed into the melt pool. The deposited material solidifies and bonds metallurgically to the substrate or the previous bead.

**Step 4 — Multi-axis deposition.** The substrate moves on 4–5 axes (or the head moves on a gantry), allowing deposition in any orientation. This enables building large, complex, or repair geometries that would not fit in a powder-bed or vat-based machine.

**Step 5 — Post-processing.** DED parts often require [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) to achieve final dimensions and surface finish.

**Laser DED (DMD)**: deposition rates 0.5–5 kg/h. Used for repairing and adding material to existing parts (turbine blades, dies).

**WAAM (Wire Arc Additive Manufacturing)**: deposition rates 2–15 kg/h. Suitable for large structural components (ship hulls, aerospace frames, tooling).

**Hybrid manufacturing**: a 5-axis CNC machine with an integrated DED head can machine and deposit in the same setup, combining [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) and additive in one process.

**Typical use**: repair, large structures, hybrid manufacturing.

> **Authoritative sources**
> - [M. Gu et al., "Directed energy deposition of metallic materials: physical fundamentals and emerging challenges," *Additive Manufacturing*, 2020](https://doi.org/10.1016/j.addma.2020.101184)

<details><summary>Example problem</summary>

A WAAM process deposits steel at 5 kg/h with a bead cross-section of 2 mm × 3 mm. How long does it take to build a 500 mm long, 20 mm wide, 10 mm thick plate?

<details><summary>Solution</summary>

1. Volume of the plate: 500 × 20 × 10 = 100 000 mm³.
2. Steel density: 7850 kg/m³ = 7.85 × 10⁻⁶ kg/mm³.
3. Mass: 100 000 × 7.85 × 10⁻⁶ = 0.785 kg.
4. Time: 0.785 kg / 5 kg/h = 0.157 h ≈ 9.4 min (deposition time only; travel and cooling add more).

</details>

</details>

</details>

## Process comparison

<table>
<tr><th>Process</th><th>ISO/ASTM 52900 category</th><th>XY resolution</th><th>Z resolution</th><th>Build size (typ.)</th><th>Materials</th><th>Build speed</th><th>Typical application</th></tr>
<tr><td>FDM / FFF</td><td>Material extrusion</td><td>0.1–0.4 mm</td><td>0.05–0.3 mm</td><td>200–1000 mm</td><td>Thermoplastics (PLA, ABS, nylon, PEEK)</td><td>Slow (hours–days)</td><td>Prototypes, jigs, fixtures</td></tr>
<tr><td>SLA / DLP</td><td>Vat photopolymerization</td><td>25–100 µm</td><td>25–150 µm</td><td>150–400 mm</td><td>Photopolymer resins</td><td>Medium (hours)</td><td>Dental, jewelry, high-detail models</td></tr>
<tr><td>SLS / SLM / EBM</td><td>Powder bed fusion</td><td>50–300 µm</td><td>50–300 µm</td><td>250–1000 mm</td><td>Polymers (PA12); metals (Ti, Al, steel, Ni)</td><td>Medium–fast (hours)</td><td>Aerospace, medical, tooling</td></tr>
<tr><td>Binder jetting</td><td>Binder jetting</td><td>100–300 µm</td><td>100–300 µm</td><td>250–1000 mm</td><td>Sand, metals, ceramics</td><td>Fast (minutes–hours)</td><td>High-volume metal parts, sand molds</td></tr>
<tr><td>DED (DMD, WAAM)</td><td>Directed energy deposition</td><td>0.2–1 mm</td><td>0.1–1 mm</td><td>Unlimited (gantry)</td><td>Metals (Ti, Al, steel, Ni, Inconel)</td><td>Fast (kg/h for WAAM)</td><td>Repair, large structures, hybrid</td></tr>
</table>

## Process selection

A quick heuristic for choosing among the five categories:

<table>
<tr><th>Criterion</th><th>Guidance</th></tr>
<tr><td>Material type</td><td>Polymer → FDM, SLA, SLS. Metal → SLM, EBM, binder jetting, DED. Ceramic → binder jetting. Sand → binder jetting.</td></tr>
<tr><td>Required tolerance</td><td>≤ 0.1 mm → SLA (polymer) or SLM (metal) + machining. 0.1–0.5 mm → SLS, FDM. > 0.5 mm → DED, binder jetting.</td></tr>
<tr><td>Production volume</td><td>1–10 parts → SLM, SLS, FDM. 100–10 000 → binder jetting (lowest cost per part at volume). > 10 000 → consider [Casting](./Casting.md) or [Forming](./Forming.md).</td></tr>
<tr><td>Geometry complexity</td><td>Internal channels, lattices → SLM, SLS (no supports). Overhangs > 45° → SLS (powder support) or SLM (with supports). Large thin walls → DED.</td></tr>
<tr><td>Part size</td><td>&lt; 200 mm → FDM, SLA. 200–500 mm → SLS, SLM. > 500 mm → DED, large-format SLM.</td></tr>
<tr><td>Post-processing budget</td><td>Minimal → FDM, SLA. Heat treatment + machining → SLM, EBM. Sintering furnace → binder jetting.</td></tr>
</table>

## Post-processing

Post-processing is a shared concern across all additive processes. The as-printed part is rarely the final part.

- **Support removal**: FDM, SLA, SLM (mechanical or chemical). SLS parts are freed from powder by air blast.
- **Curing / sintering**: SLA parts need UV post-cure; binder-jetted metal parts need debinding + sintering (volumetric shrinkage ~15–20 %, linear ~5–10 %).
- **Heat treatment**: SLM/EBM metal parts require stress-relief annealing (e.g. 550–650 °C for Ti-6Al-4V) and sometimes aging.
- **Machining**: critical surfaces and tight tolerances are finished by [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) (5-axis milling, turning).
- **Surface finishing**: sanding, bead blasting, or [Surface finishing](./Surface-finishing.md) processes for cosmetic or functional surfaces.

## Defects and quality

Additive parts contain process-specific defects that must be detected and controlled:

- **Lack of fusion / porosity** (SLM, SLS, DED): incomplete melting of powder particles. Detected by X-ray CT or metallographic cross-section.
- **Warping / delamination** (FDM, SLM): thermal contraction pulls the part off the build platform.
- **Spatter / balling** (SLM, EBM): molten powder ejected from the melt pool.
- **Dimensional inaccuracy** (all): layer-to-layer accumulation, shrinkage (binder jetting), or warping.

Inspection and dimensional verification follow the methods described in [Metrology / quality control](./Metrology-and-quality-control.md): CMM for external dimensions, X-ray CT for internal porosity, and ultrasonic testing for subsurface defects.

<iframe src="./Additive-manufacturing.simulation.html" title="Layer-by-layer additive manufacturing process animation"></iframe>

<details><summary>Quiz</summary>

A lightweight drone frame requires a single-piece structure with internal lattice channels for weight reduction, a titanium alloy (Ti-6Al-4V), and a 0.1 mm tolerance on mounting interfaces. Which additive process is appropriate?

<details><summary>Solution</summary>

1. **Material**: Ti-6Al-4V requires a metal additive process. FDM and SLA are out (polymer only).
2. **Process**: SLM (selective laser melting) or EBM. SLM gives better surface finish and dimensional accuracy; EBM is faster and handles reactive alloys well. For 0.1 mm tolerance, SLM is preferred.
3. **Design**: The lattice channels are designed in the CAD model. The build orientation is chosen to minimize supports and to align the strongest direction (XY-plane) with the primary load path.
4. **Post-processing**: Stress-relief heat treatment (550–650 °C, 2 h, vacuum). The mounting interfaces are machined by [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) (5-axis milling) to 0.1 mm tolerance.
5. **Inspection**: X-ray CT to verify internal porosity; [Metrology / quality control](./Metrology-and-quality-control.md) for dimensional verification.

</details>

</details>

## Parent

This page is a class in the [Manufacturing](./Readme.md) topic.
