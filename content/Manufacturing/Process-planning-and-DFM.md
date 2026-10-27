# Process planning and DFM

Process planning / design-for-manufacturability (DFM) / manufacturing engineering is the decision and information function that selects processes, sequences operations, sets tolerances and fixtures, and designs parts so that the chosen processes can make them reliably. It does not transform matter; it orchestrates the transformations.

## Utility

- Translates a CAD model into a sequence of manufacturing operations with parameters, fixtures, and tolerances.
- Reduces cost and lead time by selecting the most economical process for each feature.
- Prevents design errors that would make a part impossible or prohibitively expensive to manufacture.

> **Authoritative sources**
> - [ISO 10303:2020, Industrial automation systems and integration — Product data representation and exchange (STEP)](https://www.iso.org/standard/75736.html)
> - [Boothroyd, Dewhurst, Knight — *Product Design for Manufacture and Assembly*, 3rd ed., CRC Press, 2010, ISBN 9781420089271](https://www.routledge.com/Product-Design-for-Manufacture-and-Assembly/Boothroyd-Dewhurst-Knight/p/book/9781420089271)

## Workflow

The process planning pipeline connects the design intent to the shop floor:

<svg width="780" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Process planning pipeline from CAD model to shop floor">
  <defs>
    <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L9,3 L0,6 Z" fill="#555"/>
    </marker>
  </defs>
  <rect x="10" y="20" width="160" height="40" rx="6" fill="#e7f1ff" stroke="#0d6efd"/>
  <text x="90" y="45" text-anchor="middle" font-size="14">CAD model</text>
  <rect x="210" y="20" width="170" height="40" rx="6" fill="#e7f1ff" stroke="#0d6efd"/>
  <text x="295" y="45" text-anchor="middle" font-size="14">Feature recognition</text>
  <rect x="420" y="20" width="160" height="40" rx="6" fill="#e7f1ff" stroke="#0d6efd"/>
  <text x="500" y="45" text-anchor="middle" font-size="14">Process selection</text>
  <rect x="620" y="20" width="150" height="40" rx="6" fill="#e7f1ff" stroke="#0d6efd"/>
  <text x="695" y="45" text-anchor="middle" font-size="14">Operation sequencing</text>
  <rect x="10" y="90" width="150" height="40" rx="6" fill="#fff3cd" stroke="#ffc107"/>
  <text x="85" y="115" text-anchor="middle" font-size="14">Fixture design</text>
  <rect x="210" y="90" width="150" height="40" rx="6" fill="#fff3cd" stroke="#ffc107"/>
  <text x="285" y="115" text-anchor="middle" font-size="14">CAM</text>
  <rect x="420" y="90" width="150" height="40" rx="6" fill="#fff3cd" stroke="#ffc107"/>
  <text x="495" y="115" text-anchor="middle" font-size="14">Post-processing</text>
  <rect x="620" y="90" width="150" height="40" rx="6" fill="#d1e7dd" stroke="#198754"/>
  <text x="695" y="115" text-anchor="middle" font-size="14">Shop floor</text>
  <line x1="170" y1="40" x2="206" y2="40" stroke="#555" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="380" y1="40" x2="416" y2="40" stroke="#555" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="580" y1="40" x2="616" y2="40" stroke="#555" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="695" y1="60" x2="695" y2="86" stroke="#555" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="620" y1="110" x2="584" y2="110" stroke="#555" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="420" y1="110" x2="384" y2="110" stroke="#555" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="210" y1="110" x2="174" y2="110" stroke="#555" stroke-width="2" marker-end="url(#arr)"/>
</svg>

Each stage consumes the output of the previous one. Feature recognition extracts geometric features (pockets, holes, slots, fillets) from the CAD model. Process selection assigns a manufacturing process to each feature. Operation sequencing orders the operations. Tolerance allocation distributes the system tolerance across features. Fixture design determines how the part is held. CAM generates tool paths. Post-processing translates to machine-specific code.

## Process selection

Given a part's geometry, material, tolerance, surface finish, and batch size, select the appropriate process for each feature.

<details><summary>Details</summary>

- **Decision criteria**: geometry complexity, material, batch size, tolerance, surface finish, cost, and lead time.
- **Rule of thumb**: for a feature, choose the process that achieves the required tolerance and finish at the lowest cost per part for the given batch size.
- **Hybrid processes**: a part may use multiple processes. E.g., a turbine blade: [Casting](./Casting.md) (gross shape) → [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) (precision machining) → [Surface finishing](./Surface-finishing.md) (coating).
- **Batch-size threshold**: below ~50 parts, additive or direct machining is often cheapest; above ~500, casting or forming amortizes tooling; above ~10 000, dedicated tooling (die-casting, stamping) dominates.

</details>

The economics are driven by the fixed tooling cost $`C_{\text{tooling}}/N` amortized over the batch size $`N` versus the per-part cost (material + machine time). Processes with expensive tooling but fast cycles (casting, forming, stamping) win at high batch sizes; processes with no tooling but slow cycles (additive, direct machining) win at low batch sizes. The crossover batch size $`N^*` is where the two total-cost curves intersect:

<svg width="760" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cost per part versus batch size, showing the crossover between two processes">
  <line x1="60" y1="250" x2="720" y2="250" stroke="#333" stroke-width="2"/>
  <line x1="60" y1="250" x2="60" y2="30" stroke="#333" stroke-width="2"/>
  <text x="390" y="285" text-anchor="middle" font-size="14">Batch size N (log scale)</text>
  <text x="25" y="140" text-anchor="middle" font-size="14" transform="rotate(-90 25 140)">Cost per part</text>
  <line x1="60" y1="90" x2="700" y2="200" stroke="#0d6efd" stroke-width="2.5"/>
  <line x1="60" y1="180" x2="700" y2="120" stroke="#dc3545" stroke-width="2.5"/>
  <circle cx="393" cy="145" r="6" fill="#198754"/>
  <line x1="393" y1="145" x2="393" y2="250" stroke="#198754" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="405" y="135" font-size="13" fill="#198754">Crossover N*</text>
  <text x="120" y="75" font-size="13" fill="#0d6efd">No-tooling process (additive, direct machining)</text>
  <text x="430" y="215" font-size="13" fill="#dc3545">Dedicated-tooling process (casting, forming, stamping)</text>
  <text x="640" y="270" font-size="12" fill="#666">high volume</text>
  <text x="70" y="270" font-size="12" fill="#666">prototype</text>
</svg>

**Worked example** — an aluminum bracket, batch size 1000:

<table>
<tr><th>Route</th><th>Material</th><th>Machine time</th><th>Tooling / fixture</th><th>Total per part</th></tr>
<tr><td>CNC milling from bar</td><td>$3.20</td><td>$4.50</td><td>$0.50 (soft jaws)</td><td><b>$8.20</b></td></tr>
<tr><td>Die-casting + finish machining</td><td>$2.80</td><td>$3.00</td><td>$12.00 (die, amortized)</td><td>$17.80</td></tr>
<tr><td>Additive (SLM) + machining</td><td>$8.00</td><td>$6.00</td><td>$0</td><td>$14.00</td></tr>
</table>

At $`N = 1000` the die cost of die-casting is not yet amortized, so milling wins. The crossover with die-casting occurs around 5 000–10 000 parts, where the shallower-slope casting curve drops below the machining line.

**Example problem** — a brass hose fitting, batch size 200. Candidate routes: CNC turning from bar ($2.10 material + $1.80 machine time + $0.10 tooling per part), hot forging + machining ($0.90 material + $1.20 machine time + $4.50 die amortized over 200). Which route wins, and above which batch size does the answer flip?

<details><summary>Solution</summary>

- CNC turning: 2.10 + 1.80 + 0.10 = <b>$4.00</b> per part.
- Forging + machining: 0.90 + 1.20 + 4.50 = <b>$6.60</b> per part.
- CNC turning wins at $`N = 200`: the forging die ($900 total) is amortized over too few parts. The crossover is at $`N^* = 900 / (4.00 - 2.10 - 0.10) \approx 500` parts, above which forging becomes cheaper.

</details>

### Design for Manufacturability (DFM)

DFM is a cross-cutting review discipline applied *before* the process plan is frozen. The detailed rules live in each process page; this section only maps them:

<table>
<tr><th>Process family</th><th>Dominant DFM concerns</th><th>See page</th></tr>
<tr><td>Casting</td><td>Uniform wall thickness, draft angles, fillets, avoid undercuts needing cores</td><td><a href="./Casting.md">Casting</a></td></tr>
<tr><td>Forming</td><td>Bend radius ≥ 1× thickness, features ≥ 2× thickness from bend lines, springback</td><td><a href="./Forming.md">Forming</a></td></tr>
<tr><td>Subtractive (machining)</td><td>Tool access, pocket aspect ratios, standard tools, one-setup design</td><td><a href="./Subtractive-manufacturing/Readme.md">Subtractive manufacturing</a></td></tr>
<tr><td>Additive</td><td>Overhangs and support removal, minimum feature size, build orientation</td><td><a href="./Additive-manufacturing.md">Additive manufacturing</a></td></tr>
</table>

The overarching principle: **design for the process, not against it**. A DFM review should occur at the concept stage, not after the CAD model is frozen.

### Operation sequencing

The order in which operations are performed affects quality, cost, and feasibility.

<details><summary>Details</summary>

**Step 1 — Global rule.** Sequence operations so that every operation references a datum that already exists: roughing removes bulk material and stress first, thermal treatments that distort the part come next, and precision finishing comes last so that no later operation destroys the achieved accuracy.

**Step 2 — Ordering rules.**

- **Roughing before finishing**: remove bulk material with a roughing operation, then finish with a precision operation.
- **Thermal operations early**: heat treatment, casting, or forming are done before precision machining to avoid distortion.
- **Primary datum first**: machine the primary datum face before any other feature, so that all subsequent operations reference a stable, accurate surface.
- **Fixturing**: each operation requires a fixture that locates and clamps the part. The fixture design affects achievable tolerance and cycle time (see the [Fixture and workholding design](#fixture-and-workholding-design) section below).
- **In-process inspection**: critical dimensions are measured after each operation to detect drift before the next operation.
- **Deburr and clean** between operations to prevent chip contamination of finished surfaces.

**Step 3 — Worked example.** For the aluminum bracket of the Quizz below, the sequence is: Op 10 rough mill the pocket (leaves 0.5 mm stock, removes ~90 % of the chip volume); Op 20 finish mill the pocket (0.2 mm stepover, reaches final dimensions while the part stays in the same fixture); Op 30 drill and ream the mounting holes (reaming last, because it references the finished pocket faces); Op 40 deburr and clean. Reversing Ops 20 and 40 would leave chips in the pocket during reaming and scratch the finished surfaces during deburring.

**Step 4 — Authoritative source.** The roughing/finishing and datum-first rules are the operation-planning chapters of [Boothroyd, Dewhurst, Knight, *Product Design for Manufacture and Assembly*](https://www.routledge.com/Product-Design-for-Manufacture-and-Assembly/Boothroyd-Dewhurst-Knight/p/book/9781420089271).

**Example problem** — a steel part needs four operations: (a) rough milling, (b) quench-and-temper heat treatment, (c) finish milling, (d) drilling and reaming of a Ø10 H7 hole. Order them and justify.

<details><summary>Solution</summary>

1. (a) Rough milling — remove bulk material while the steel is still soft; leave finishing stock.
2. (b) Heat treatment — it distorts the part, so it must precede all precision work.
3. (c) Finish milling — brings the part to final dimensions after the distortion is done.
4. (d) Drill and ream — the H7 hole needs a reaming pass referencing the finished faces; drilling before heat treatment would let the hole distort and close up.

</details>

</details>

### Tolerance allocation

The system-level tolerance is allocated to individual features and operations.

<details><summary>Details</summary>

**Worst-case (linear) stack-up**:

```math
T_{\text{system}} = \sum_{i=1}^{n} T_i
```

Each individual tolerance $`T_i` is the full bilateral tolerance of feature $`i`. The result is the maximum possible deviation. Conservative, simple, and independent of the distribution of errors.

**Statistical (RSS) stack-up**:

```math
T_{\text{system}} = \sqrt{\sum_{i=1}^{n} T_i^2}
```

Assumes each $`T_i` is an independent, normally distributed error with 3σ spread. The system tolerance is the 3σ of the combined distribution. For equal-magnitude tolerances the RSS result is tighter than worst-case by a factor of $`\sqrt{n}`: 50 % tighter at $`n = 4`, 67 % tighter at $`n = 9`.

A dimensional chain is the sequence of features whose errors accumulate into one system dimension (here a clearance gap $`G` between the last block and the wall):

<svg width="760" height="220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dimensional chain: four blocks with individual tolerances accumulating into a gap">
  <defs>
    <marker id="arr2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L9,3 L0,6 Z" fill="#333"/>
    </marker>
    <pattern id="hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#888" stroke-width="2"/>
    </pattern>
  </defs>
  <rect x="30" y="60" width="20" height="100" fill="url(#hatch)" stroke="#555"/>
  <rect x="50" y="60" width="140" height="100" fill="#e7f1ff" stroke="#0d6efd"/>
  <text x="120" y="115" text-anchor="middle" font-size="16">A</text>
  <rect x="190" y="60" width="140" height="100" fill="#e7f1ff" stroke="#0d6efd"/>
  <text x="260" y="115" text-anchor="middle" font-size="16">B</text>
  <rect x="330" y="60" width="140" height="100" fill="#e7f1ff" stroke="#0d6efd"/>
  <text x="400" y="115" text-anchor="middle" font-size="16">C</text>
  <rect x="470" y="60" width="140" height="100" fill="#e7f1ff" stroke="#0d6efd"/>
  <text x="540" y="115" text-anchor="middle" font-size="16">D</text>
  <rect x="610" y="60" width="20" height="100" fill="url(#hatch)" stroke="#555"/>
  <rect x="630" y="60" width="70" height="100" fill="#d1e7dd" stroke="#198754"/>
  <text x="665" y="115" text-anchor="middle" font-size="16" fill="#198754">G</text>
  <line x1="50" y1="45" x2="190" y2="45" stroke="#333" stroke-width="1.5" marker-start="url(#arr2)" marker-end="url(#arr2)"/>
  <line x1="190" y1="45" x2="330" y2="45" stroke="#333" stroke-width="1.5" marker-start="url(#arr2)" marker-end="url(#arr2)"/>
  <line x1="330" y1="45" x2="470" y2="45" stroke="#333" stroke-width="1.5" marker-start="url(#arr2)" marker-end="url(#arr2)"/>
  <line x1="470" y1="45" x2="610" y2="45" stroke="#333" stroke-width="1.5" marker-start="url(#arr2)" marker-end="url(#arr2)"/>
  <text x="120" y="38" text-anchor="middle" font-size="13">±0.1</text>
  <text x="260" y="38" text-anchor="middle" font-size="13">±0.1</text>
  <text x="400" y="38" text-anchor="middle" font-size="13">±0.1</text>
  <text x="540" y="38" text-anchor="middle" font-size="13">±0.1</text>
  <text x="380" y="195" text-anchor="middle" font-size="13" fill="#198754">Gap G: worst-case ±0.4 mm, RSS ±0.2 mm (n = 4, equal tolerances)</text>
</svg>

**Worked example.** Four blocks, each ±0.1 mm, in the chain above. Worst-case: $`T = 4 \times 0.1 = 0.4` mm. RSS: $`T = \sqrt{4 \times 0.1^2} = 0.2` mm — 50 % tighter, because it is unlikely that all four errors align in the same direction.

**Cost-based allocation**:

The allocation problem is:

```math
\min_{T_1, \ldots, T_n} \; \sum_{i=1}^{n} C_i(T_i) \quad \text{s.t.} \quad f(T_1, \ldots, T_n) \leq T_{\text{system}}
```

where $`C_i(T_i)` is the cost of achieving tolerance $`T_i` on feature $`i` (typically $`C_i \propto T_i^{-k}` with $`k \approx 0.5`–$`1.0`), and $`f` is the stack-up function (linear or RSS). The optimal solution equalizes the marginal cost per unit of tolerance across all features: $`\partial C_i / \partial T_i = \lambda` for all $`i`.

**Practical guidance**:
- Use worst-case for safety-critical or functional fits (gears, bearings).
- Use RSS for non-critical dimensional chains with $`n \geq 4` independent errors.
- Use cost-based allocation when the system tolerance is loose enough to allow trade-offs.

**Example problem** — a chain of 5 features, each ±0.05 mm, must fit a system tolerance of ±0.15 mm. Does the chain pass with worst-case? With RSS?

<details><summary>Solution</summary>

- Worst-case: $`T = 5 \times 0.05 = 0.25` mm > 0.15 mm → <b>FAIL</b>.
- RSS: $`T = 0.05 \times \sqrt{5} \approx 0.112` mm ≤ 0.15 mm → <b>PASS</b>.
- RSS is admissible here because the 5 errors come from independent operations; verify with the [tolerance stack-up simulation](#interactive-simulation) above.

</details>

</details>

### Fixture and workholding design

A fixture locates, clamps, and supports the workpiece during an operation. It is a major determinant of achievable tolerance, cycle time, and setup cost.

<details><summary>Details</summary>

**Step 1 — Global rule.** A rigid body in 3-D has 6 degrees of freedom (3 translations, 3 rotations). The fixture must remove all 6 with the minimum number of contact points, then clamp. The canonical scheme is 3-2-1:

<svg width="760" height="280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3-2-1 locating principle: 3 points on the primary face, 2 on the secondary, 1 on the tertiary">
  <rect x="220" y="50" width="280" height="150" fill="#f8f9fa" stroke="#333" stroke-width="2"/>
  <text x="360" y="130" text-anchor="middle" font-size="15" fill="#666">Workpiece</text>
  <polygon points="245,200 275,200 260,215" fill="#0d6efd"/>
  <polygon points="345,200 375,200 360,215" fill="#0d6efd"/>
  <polygon points="445,200 475,200 460,215" fill="#0d6efd"/>
  <polygon points="205,75 205,105 190,90" fill="#198754"/>
  <polygon points="205,145 205,175 190,160" fill="#198754"/>
  <polygon points="515,110 515,140 530,125" fill="#dc3545"/>
  <text x="360" y="240" text-anchor="middle" font-size="13" fill="#0d6efd">Primary datum: 3 points → removes 1 translation + 2 rotations</text>
  <text x="120" y="90" text-anchor="middle" font-size="13" fill="#198754">Secondary: 2 points</text>
  <text x="120" y="108" text-anchor="middle" font-size="13" fill="#198754">→ 1 translation + 1 rotation</text>
  <text x="620" y="120" text-anchor="middle" font-size="13" fill="#dc3545">Tertiary: 1 point</text>
  <text x="620" y="138" text-anchor="middle" font-size="13" fill="#dc3545">→ 1 translation</text>
</svg>

**Step 2 — The 3-2-1 locating principle.**

- **3 points** on the primary datum face (removes 3 DOF: 2 rotations, 1 translation).
- **2 points** on the secondary datum face (removes 2 DOF: 1 rotation, 1 translation).
- **1 point** on the tertiary datum face (removes 1 DOF: 1 translation).

The 3-2-1 scheme is the minimum constraint. Additional locators are used only for support (to prevent deflection under cutting forces), not for location.

**Step 3 — Clamp force.** The clamp force must exceed the maximum cutting force component that tends to lift or rotate the part, with a safety factor of 2–3:

```math
F_{\text{clamp}} \geq \frac{F_{\text{cut, lift}}}{\mu} \cdot SF
```

where $`\mu` is the coefficient of friction between the part and the fixture (typically 0.3–0.5 for steel-on-steel), and $`SF` is the safety factor. For a milling operation, $`F_{\text{cut, lift}}` is the vertical component of the cutting force, which can be estimated from the specific cutting force $`K_c` (N/mm²) times the uncut chip area.

**Worked example.** Milling lifts the part with $`F_{\text{cut, lift}} = 300` N; $`\mu = 0.4`, $`SF = 2`. Then $`F_{\text{clamp}} \geq (300 / 0.4) \times 2 = 1500` N — a standard vise rated at 5 kN is sufficient.

**Step 4 — Trade-off: fixture complexity vs. achievable tolerance.**

- A simple vise or soft jaws: setup in minutes, tolerance ~0.1 mm, low cost.
- A dedicated fixture with precision locators: setup in hours, tolerance ~0.01 mm, high cost (amortized over batch).
- A palletized fixture with in-process probing: setup in seconds (changeover), tolerance ~0.005 mm, very high cost, justified for high-mix, high-volume lines.

The fixture must be designed *after* the operation sequence is fixed, because the clamping face and access directions depend on which features are machined in which setup.

**Example problem** — a cutting operation tends to lift the part with 500 N; the fixture pads are dry steel-on-steel ($`\mu = 0.3`); the shop uses a safety factor of 2.5. What minimum clamp force must the fixture provide?

<details><summary>Solution</summary>

$`F_{\text{clamp}} \geq (500 / 0.3) \times 2.5 \approx 4167` N ≈ 4.2 kN. A hand-operated vise is marginal; use a power clamp or add a down-hold strap directly over the cutting zone.

</details>

</details>

### CAM and tool path generation

The process plan is translated into machine-readable tool paths by CAM software.

<details><summary>Details</summary>

**Step 1 — Global flow.** CAM takes the CAD model plus the process plan (which operations, which tools, which parameters) and generates the tool path: roughing passes that follow the stock boundary, finishing passes that follow the final geometry, then drilling cycles. The tool path determines cycle time, surface finish, and tool wear.

**Step 2 — Verification and post-processing.**

- **Simulation**: the CAM software simulates the tool path to detect collisions, overcuts, and undercuts before the part is machined.
- **Post-processing**: the tool path is translated into the specific machine's control language (FANUC, Siemens, Heidenhain, etc.).

**Step 3 — Cycle time estimation**:

```math
t_{\text{cycle}} = t_{\text{cut}} + t_{\text{rapid}} + t_{\text{setup}}
```

where $`t_{\text{cut}}` depends on feed rate, stepover, and depth of cut; $`t_{\text{rapid}}` on machine travel speed; $`t_{\text{setup}}` on fixture and tool-change time.

**Worked example.** A facing pass of 200 mm at a feed rate of 1200 mm/min: $`t_{\text{cut}} = 200/1200 = 0.167` min. Rapids of 300 mm at 15 000 mm/min: $`t_{\text{rapid}} = 0.02` min. One tool change of 6 s: $`t_{\text{setup}} = 0.1` min. Total $`t_{\text{cycle}} \approx 0.29` min ≈ 17 s per part.

**Example problem** — a pocket finishing pass has a total path length of 1200 mm at 900 mm/min, plus 500 mm of rapids at 12 000 mm/min, plus two tool changes of 5 s each. Compute the cycle time in minutes.

<details><summary>Solution</summary>

$`t_{\text{cut}} = 1200/900 = 1.333` min; $`t_{\text{rapid}} = 500/12000 = 0.042` min; $`t_{\text{setup}} = 2 \times 5/60 = 0.167` min. Total $`t_{\text{cycle}} \approx 1.54` min ≈ 1 min 33 s per part.

</details>

</details>

### Data exchange and standards

A process plan is a formal data object, not just informal notes. The ISO 10303 (STEP) standard family defines how process plans are structured and exchanged between CAD, CAM, and ERP systems.

<details><summary>Details</summary>

**Step 1 — The standard.** **ISO 10303-224** (Application protocol: Mechanical product definition for process planning using machining features) defines the data model for machining process plans: operations, setups, tools, tolerances, and fixtures as structured entities.

**Step 2 — Worked example.** An aerospace supplier receives an AP 224 file from a customer. The planning software parses it and validates the plan automatically: every machining feature in the model has an assigned operation, every tolerance is within the shop's demonstrated process capability, and every tool called out exists in the tool library. The check catches one hole with no assigned drilling operation before the plan reaches the shop floor — a defect that would otherwise surface as a scrapped part.

**Step 3 — Practice.**

- In practice, most shops still exchange process plans as PDFs, Excel sheets, or proprietary CAM files. STEP AP 224 adoption is growing in aerospace and automotive supply chains where multi-vendor data exchange is mandatory.
- The key benefit of a structured process plan: it can be validated (e.g., check that all features are covered, that tolerances are consistent, that tool access is feasible) before the plan reaches the shop floor.

</details>

## Interactive simulation

<iframe src="./Process-planning-and-DFM.simulation.html" title="Tolerance stack-up calculator: worst-case vs. RSS"></iframe>

## Parent

This page is a cross-cutting concern in the [Manufacturing](./Readme.md) topic.

## Quizz

A designer has a CAD model of a 100 mm × 100 mm × 50 mm aluminum (6061-T6) bracket with a 5 mm deep pocket, a 2 mm thick wall, and a 0.1 mm tolerance on the mounting holes. The batch size is 1000. Which process plan should be used?

<details><summary>Solution</summary>

1. **Stock**: 6061-T6 flat bar, 100 × 100 × 50 mm. Source from [Materials processing](./Materials-processing.md).
2. **Process selection**:
   - Gross shape: the bar is already the right size. No [Forming](./Forming.md) or [Casting](./Casting.md) needed.
   - Pocket and holes: [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) (CNC milling). The 5 mm pocket and 2 mm wall are within the capability of a 3-axis or 4-axis mill.
   - Surface finish: the as-machined finish (Ra 1.6 µm) is acceptable. No [Surface finishing](./Surface-finishing.md) needed unless a cosmetic finish is required.
3. **Operation sequence**:
   - Op 10: Rough mill the pocket (stepover 1 mm, depth of cut 2 mm).
   - Op 20: Finish mill the pocket (stepover 0.2 mm, depth of cut 0.5 mm).
   - Op 30: Drill and ream the mounting holes (0.1 mm tolerance requires reaming).
   - Op 40: Deburr and clean.
4. **Fixturing**: a vise with soft jaws to clamp the bar. The pocket is machined in one setup to maintain the 0.1 mm tolerance.
5. **Inspection**: CMM (coordinate measuring machine) after Op 40 to verify all critical dimensions. [Metrology and quality control](./Metrology-and-quality-control.md).
6. **Cost comparison** (batch = 1000):

<table>
<tr><th>Process route</th><th>Material</th><th>Machine time</th><th>Tooling / fixture</th><th>Inspection</th><th>Total per part</th></tr>
<tr><td>CNC milling (chosen)</td><td>$3.20</td><td>$4.50 (15 min @ $18/h)</td><td>$0.50 (soft jaws, amortized)</td><td>$0.80</td><td><b>$9.00</b></td></tr>
<tr><td>Aluminum die-casting + machining</td><td>$2.80</td><td>$3.00 (5 min machining)</td><td>$12.00 (die, amortized over 1000)</td><td>$0.80</td><td>$18.60</td></tr>
<tr><td>SLM (additive) + machining</td><td>$8.00 (powder + support)</td><td>$6.00 (post-processing + machining)</td><td>$0 (no tooling)</td><td>$1.20</td><td>$15.20</td></tr>
</table>

   CNC milling wins at this batch size: the die-casting die cost ($12 000) is not amortized enough at 1000 parts, and SLM material + post-processing cost is too high for a simple bracket. The crossover for die-casting would be at ~5000–10 000 parts.
7. **Cost summary**: at 1000 parts, total cost ≈ $9 000. The cycle time is ~15 min/part; the total machine time is ~250 hours.

</details>
