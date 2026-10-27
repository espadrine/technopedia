# Assembly

Assembly arranges already-finished components into a functional system, typically without bonding. It is relevant when a product is composed of multiple independently manufactured parts that must be positioned, fastened, connected, and tested into a working whole.

> **Scope note — Assembly vs. Joining.** Assembly arranges finished components using fasteners, connectors, or clips that do not create a material-level bond; [Joining](./Joining.md) does create such a bond. A riveted aircraft skin is Joining; bolting an engine to a frame is Assembly. This page covers the assembly *process*: how stations present parts, fasten them, and are organized into a line.

> **Authoritative sources**
> - [ISO 10218-1:2025, Robotics — Safety requirements — Part 1: Industrial robots](https://www.iso.org/standard/73933.html) — the central standard for robotic and cobot stations (actuator choice, force limiting, shared workspaces).
> - [Boothroyd, Dewhurst, Knight, Product Design for Manufacture and Assembly (3rd ed., CRC Press, 2010)](https://www.routledge.com/Product-Design-for-Manufacture-and-Assembly/Boothroyd-Dewhurst-Knight/p/book/9781420089271) — the reference method for assembly-line design and the DFA index.
> - [ISO 9283:1998, Manipulating industrial robots — Performance criteria and related test methods](https://www.iso.org/standard/22244.html) — the test method behind the robot pose-repeatability figures quoted below.

## Utility

- Transforms a set of parts into a product with system-level function.
- Determines the final product's reliability: a well-designed assembly is robust to part-to-part variation.
- Often the dominant cost in labor-intensive products (automotive, aerospace, consumer electronics).

## Key concepts

### Fixturing and positioning

Fixtures, jigs, and part-presentation devices hold workpieces in a defined pose so that fastening, connection, or inspection can proceed without re-aiming.

<details><summary>Details</summary>

**Step 1 — The idea.** Every downstream operation (fastening, connection, inspection) assumes the part is in a known pose; fixturing is how the station guarantees that pose, every cycle. Five pieces do the work:

- **Locating scheme**: the 3-2-1 principle constrains all six degrees of freedom with the minimum number of contacts (3 on the primary plane, 2 on the secondary, 1 on the tertiary).
- **Part presentation**: gravity-fed chutes, vibratory bowls, and rotary indexing tables orient parts before they reach the operator or robot, so a single repeatable pose arrives at the point of use.
- **Poka-yoke fixtures**: geometry that makes an incorrect pose physically impossible — a keyed connector (one flat on a cylindrical pin) allows only one rotational orientation; a chamfered guide rail allows insertion in only one translational direction.
- **Clamping**: pneumatic, hydraulic, or mechanical clamps hold the workpiece against the locators with a force above the process force but below the part-deformation limit.
- **Actuator choice**: manual (operator hand), robotic (6-axis arm with gripper), or cobot (force-limited, shared workspace, per [ISO 10218-1](https://www.iso.org/standard/73933.html)). The fixture design is independent of the actuator: the same fixture can serve a human or a robot.

**Step 2 — A worked example.** A keyed connector: a cylindrical pin with one flat, entering a chamfered socket whose opening matches the flat. Of the 4 possible rotational orientations, only 1 fits — the geometry, not the operator's attention, eliminates the error.

**Step 3 — See it in action.** Rotate the part (click left or right of center) and try to insert it. Only the keyed orientation seats.

<iframe src="./Assembly-poka-yoke.simulation.html" title="Poka-yoke: keyed connector insertion demo"></iframe>

**Step 4 — Authoritative source.** The locating and presentation practices above are the manual-assembly handling and insertion methods of the [Boothroyd DFA reference](https://www.routledge.com/Product-Design-for-Manufacture-and-Assembly/Boothroyd-Dewhurst-Knight/p/book/9781420089271); the cobot force limits come from [ISO 10218-1](https://www.iso.org/standard/73933.html).

**Step 5 — Check yourself.**

<details><summary>Example problem</summary>

A station inserts a 4-pin connector that can enter its socket in 4 rotational orientations. A random insertion succeeds 1 time in 4. Redesign the interface so that a wrong insertion is physically impossible, and add a feature that *confirms* correct seating.

<details><summary>Solution</summary>

Add a key: one flat on the cylindrical connector body and a matching flat in the socket opening, so only 1 of 4 orientations fits (the other 3 are blocked by interference). Add a chamfer on the socket lead-in so the part self-aligns translationally. For confirmation, add a detent that clicks at full engagement — the operator (or a sensor) hears the click and knows the part is seated.

</details>

</details>

</details>

### Fastening and connection

The assembly-process discipline of joining parts at the station: fastening sequence, in-line torque verification, tool selection for the station, and how fasteners are specified in the bill of materials. The physics of the joint itself — the torque–clamp-force relationship, press-fit mechanics, adhesive bonding — is covered in [Joining](./Joining.md).

<details><summary>Details</summary>

**Step 1 — The idea.** A fastening operation is a process step with a specification, a tool, and a verification. The station designer decides four things:

- **Fastening sequence**: which fasteners go first, and in what order and pattern. Corner screws are tightened in a cross pattern, not sequentially, so the clamp load builds up evenly and the part does not warp.
- **In-line torque verification**: a calibrated electric driver logs the applied torque at each fastener; out-of-tolerance values trigger a rework flag immediately, at the station where the error was made.
- **Tool selection for the station**: manual (ratchet wrench, screwdriver), robotic (torque-controlled electric driver, rivet gun), or cobot (light fastening with force feedback). Robotic stations must satisfy the safety requirements of [ISO 10218-1](https://www.iso.org/standard/73933.html).
- **BOM specification**: each fastener appears in the bill of materials with size (M3, M4, M5), grade, torque spec, and quantity. The station's tooling and the torque log are keyed to the BOM line, so a missing or over-torqued fastener is traceable to a part number.

**Step 2 — A worked example.** An M3 grade 12.9 screw is specified at 0.5 N·m ± 0.05. The driver logs a torque–angle curve for each fastener: a curve that stops short of the window means under-torque (loose joint); a curve that overshoots means a stripped thread. Either way the station flags the unit for rework before it moves downstream.

**Step 3 — See it in action.** The torque–angle signature below shows a pass (green, inside the 0.45–0.55 N·m window) and a fail (red, overshooting into thread stripping).

<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Torque-angle signature with target window">
  <rect x="60" y="20" width="460" height="180" fill="#16213e"/>
  <rect x="60" y="60" width="460" height="40" fill="#1f3a5f"/>
  <text x="528" y="85" fill="#7ec8e3" font-size="12" text-anchor="end">target 0.45–0.55 N·m</text>
  <line x1="60" y1="200" x2="520" y2="200" stroke="#888" stroke-width="1.5"/>
  <line x1="60" y1="200" x2="60" y2="20" stroke="#888" stroke-width="1.5"/>
  <text x="290" y="235" fill="#ccc" font-size="13" text-anchor="middle">rotation (deg)</text>
  <text x="30" y="115" fill="#ccc" font-size="13" text-anchor="middle" transform="rotate(-90 30 115)">torque (N·m)</text>
  <path d="M 60 200 C 180 198, 300 170, 400 100 S 470 78, 500 76" fill="none" stroke="#4ecca3" stroke-width="2.5"/>
  <path d="M 60 200 C 170 198, 280 165, 370 95 S 450 40, 480 30" fill="none" stroke="#e94560" stroke-width="2.5" stroke-dasharray="6 4"/>
  <circle cx="440" cy="80" r="5" fill="#4ecca3"/>
  <text x="452" y="72" fill="#4ecca3" font-size="12">pass: stops in window</text>
  <circle cx="452" cy="34" r="5" fill="#e94560"/>
  <text x="464" y="52" fill="#e94560" font-size="12">fail: overshoot</text>
</svg>

**Step 4 — Authoritative source.** The safety requirements for robotic and cobot fastening stations (force limiting, shared-workspace control) are specified in [ISO 10218-1:2025](https://www.iso.org/standard/73933.html).

**Step 5 — Check yourself.**

<details><summary>Example problem</summary>

A subassembly has 4 corner screws, each specified at 0.4 N·m. The operator tightens them sequentially (1 → 2 → 3 → 4, each to full torque in one pass). Why is this a defect risk, and what sequence should the station specify instead?

<details><summary>Solution</summary>

Sequential tightening builds the full clamp load at the first corner before the others are engaged: the part rocks on the first fastener, the gasket or mating surface is compressed unevenly, and the part can warp or crack — and the last screw then fights a pre-loaded joint. The station should specify a cross pattern (1 → 3 → 2 → 4 for corners numbered around the part) in several passes, raising the torque in steps (e.g., 30 % → 70 % → 100 % of spec) so the clamp load builds evenly. The in-line torque log then verifies each fastener against the same spec.

</details>

</details>

</details>

### Line design and material flow

The spatial and temporal organization of stations, transport, and buffers that moves parts from kitting to finished product.

<details><summary>Details</summary>

**Step 1 — The idea.** Takt time sets the rhythm of the line: $`t_{\text{takt}} = \frac{\text{available production time}}{\text{demand per period}}`. It is the fundamental constraint: every station's cycle time must be ≤ takt time, and it applies to all assembly methods, not just manual lines. Line balancing decomposes the total work content into $`n` stations such that $`\sum_{i=1}^{n} t_i \leq n \cdot t_{\text{takt}}`; the line efficiency is $`\eta = \frac{\sum t_i}{n \cdot t_{\text{takt}}}` (target ≥ 85 %). The remaining levers are transport and layout:

- **Conveyors and AGVs**: fixed conveyors (roller, belt, overhead) move the product in a fixed sequence; AGVs (automated guided vehicles) provide flexible routing between cells and are preferred when the product mix changes frequently.
- **Kitting**: all parts for one unit are gathered into a kit (bin, tote, or tray) before assembly begins, reducing search time and preventing missing-part errors.
- **WIP buffers**: small queues between stations absorb variability — a slow station does not immediately stop the upstream one. Buffer size is set by the coefficient of variation of cycle times.
- **Cell-based layout**: a group of stations (human, robot, or mixed) assembles a subassembly in a closed cell; cells are self-contained and can be duplicated for capacity scaling.

**Step 2 — A worked example.** A 5-station line with a 60 s takt: station cycle times 45, 55, 50, 55, and 60 s. The efficiency is $`\eta = \frac{45+55+50+55+60}{5 \times 60} = \frac{265}{300} \approx 88\ \%`. The top-down layout below shows the stations, their actuators, and the buffers between them.

<svg viewBox="0 0 780 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top-down assembly line layout with five stations">
  <defs><marker id="arr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L8,3.5 L0,7 Z" fill="#7ec8e3"/></marker></defs>
  <rect x="10" y="45" width="130" height="62" rx="6" fill="#16213e" stroke="#7ec8e3"/>
  <text x="75" y="66" fill="#eee" font-size="12" text-anchor="middle">1 · Kitting</text>
  <text x="75" y="82" fill="#aaa" font-size="11" text-anchor="middle">AGV + gravity feed</text>
  <text x="75" y="97" fill="#4ecca3" font-size="11" text-anchor="middle">45 s</text>
  <rect x="170" y="45" width="130" height="62" rx="6" fill="#16213e" stroke="#7ec8e3"/>
  <text x="235" y="66" fill="#eee" font-size="12" text-anchor="middle">2 · Sub-A</text>
  <text x="235" y="82" fill="#aaa" font-size="11" text-anchor="middle">robot (6-axis)</text>
  <text x="235" y="97" fill="#4ecca3" font-size="11" text-anchor="middle">55 s</text>
  <rect x="330" y="45" width="130" height="62" rx="6" fill="#16213e" stroke="#7ec8e3"/>
  <text x="395" y="66" fill="#eee" font-size="12" text-anchor="middle">3 · Sub-B</text>
  <text x="395" y="82" fill="#aaa" font-size="11" text-anchor="middle">manual + cobot</text>
  <text x="395" y="97" fill="#4ecca3" font-size="11" text-anchor="middle">50 s</text>
  <rect x="490" y="45" width="130" height="62" rx="6" fill="#16213e" stroke="#7ec8e3"/>
  <text x="555" y="66" fill="#eee" font-size="12" text-anchor="middle">4 · Combine</text>
  <text x="555" y="82" fill="#aaa" font-size="11" text-anchor="middle">robot (6-axis)</text>
  <text x="555" y="97" fill="#4ecca3" font-size="11" text-anchor="middle">55 s</text>
  <rect x="650" y="45" width="120" height="62" rx="6" fill="#16213e" stroke="#e94560"/>
  <text x="710" y="66" fill="#eee" font-size="12" text-anchor="middle">5 · EOL test</text>
  <text x="710" y="82" fill="#aaa" font-size="11" text-anchor="middle">manual + auto</text>
  <text x="710" y="97" fill="#e94560" font-size="11" text-anchor="middle">60 s = takt</text>
  <line x1="140" y1="76" x2="166" y2="76" stroke="#7ec8e3" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="300" y1="76" x2="326" y2="76" stroke="#7ec8e3" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="460" y1="76" x2="486" y2="76" stroke="#7ec8e3" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="620" y1="76" x2="646" y2="76" stroke="#7ec8e3" stroke-width="2" marker-end="url(#arr)"/>
  <text x="153" y="130" fill="#888" font-size="10" text-anchor="middle">buffer</text>
  <text x="313" y="130" fill="#888" font-size="10" text-anchor="middle">buffer</text>
  <text x="473" y="130" fill="#888" font-size="10" text-anchor="middle">buffer</text>
  <text x="633" y="130" fill="#888" font-size="10" text-anchor="middle">buffer</text>
  <text x="390" y="158" fill="#7ec8e3" font-size="12" text-anchor="middle">η = 265/300 ≈ 88 % (target ≥ 85 %)</text>
</svg>

**Step 3 — See it in action.** The animation fills each station's bar against the takt window; the dashed line is the takt time, and the efficiency readout uses the general formula above.

<iframe src="./Assembly-line-balancing.simulation.html" title="Line balancing: station cycle times vs. takt time"></iframe>

**Step 4 — Authoritative source.** The balancing method and the efficiency target are from the manual-assembly-line chapters of the [Boothroyd DFA reference](https://www.routledge.com/Product-Design-for-Manufacture-and-Assembly/Boothroyd-Dewhurst-Knight/p/book/9781420089271).

**Step 5 — Check yourself.**

<details><summary>Example problem</summary>

Three tasks of 20 s each are assigned to 3 stations on a line with a 60 s takt. Compute the line efficiency from the general formula, and explain why the per-station ratio (20/60) is not the definition.

<details><summary>Solution</summary>

$`\eta = \frac{\sum t_i}{n \cdot t_{\text{takt}}} = \frac{20+20+20}{3 \times 60} = \frac{60}{180} \approx 33\ \%`. The per-station ratio 20/60 happens to give the same number only because all three stations happen to be equally loaded; in general the stations are not equal (one may take 45 s, another 55 s), so the efficiency must be computed from the total work content $`\sum t_i` against the total capacity $`n \cdot t_{\text{takt}}`. At 33 % the line is badly under-loaded: the tasks should be redistributed (fewer stations, or a shorter takt) to reach the ≥ 85 % target.

</details>

</details>

</details>

### Verification and testing

Assembly-specific checks that confirm the product functions correctly before release.

<details><summary>Details</summary>

**Step 1 — The idea.** Verification closes the loop that fixturing and fastening open: it confirms that the assembled product actually works, and records the evidence. The pieces:

- **End-of-line (EOL) functional test**: the product is powered on and its key functions are exercised (display, sensors, actuators, connectivity). Pass/fail criteria are defined per product (e.g., motor RPM within ±5 %, camera image brightness > 100 cd/m²).
- **Power-on self-test (POST)**: an automated firmware routine that verifies all subsystems respond. Used in electronics, automotive ECUs, and medical devices.
- **Torque verification**: the calibrated driver's log (see [Fastening and connection](#fastening-and-connection)) is reviewed at EOL; out-of-tolerance fasteners trigger a rework flag.
- **Traceability**: each serial number is linked to the parts lot, station data, and test results. Required for aerospace (AS9100) and medical (ISO 13485) products.
- **Calibration and measurement**: the instruments used in testing (torque wrenches, multimeters, vision systems) must be calibrated. See [Metrology and quality control](./Metrology-and-quality-control.md) for calibration intervals and traceability.

**Step 2 — A worked example.** A drone's EOL test powers the unit on, runs the POST (all subsystems respond), then exercises the functions: motors spin at 1000 RPM ± 50, GPS locks in < 5 s, IMU bias < 0.01 °/s, camera captures 1920×1080 with no dead pixels. Any failure routes the unit to a rework station, and the failure is written to the serial number's record.

**Step 3 — See it in action.** The EOL flow below branches on the pass/fail decision; every branch writes to the traceability record.

<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="End-of-line test flow with pass and rework branches">
  <defs><marker id="arr2" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L8,3.5 L0,7 Z" fill="#7ec8e3"/></marker></defs>
  <rect x="20" y="40" width="100" height="44" rx="6" fill="#16213e" stroke="#7ec8e3"/>
  <text x="70" y="66" fill="#eee" font-size="12" text-anchor="middle">Power on</text>
  <rect x="160" y="40" width="100" height="44" rx="6" fill="#16213e" stroke="#7ec8e3"/>
  <text x="210" y="66" fill="#eee" font-size="12" text-anchor="middle">POST</text>
  <rect x="300" y="40" width="120" height="44" rx="6" fill="#16213e" stroke="#7ec8e3"/>
  <text x="360" y="66" fill="#eee" font-size="12" text-anchor="middle">Functional test</text>
  <polygon points="470,20 545,62 470,104 395,62" fill="#16213e" stroke="#e94560"/>
  <text x="470" y="67" fill="#eee" font-size="12" text-anchor="middle">Pass?</text>
  <line x1="120" y1="62" x2="156" y2="62" stroke="#7ec8e3" stroke-width="2" marker-end="url(#arr2)"/>
  <line x1="260" y1="62" x2="296" y2="62" stroke="#7ec8e3" stroke-width="2" marker-end="url(#arr2)"/>
  <line x1="420" y1="62" x2="391" y2="62" stroke="#7ec8e3" stroke-width="2" marker-end="url(#arr2)"/>
  <rect x="430" y="160" width="110" height="44" rx="6" fill="#16213e" stroke="#4ecca3"/>
  <text x="485" y="180" fill="#4ecca3" font-size="12" text-anchor="middle">Pack / ship</text>
  <text x="485" y="196" fill="#888" font-size="10" text-anchor="middle">+ record result</text>
  <rect x="180" y="160" width="120" height="44" rx="6" fill="#16213e" stroke="#e94560"/>
  <text x="240" y="180" fill="#e94560" font-size="12" text-anchor="middle">Rework flag</text>
  <text x="240" y="196" fill="#888" font-size="10" text-anchor="middle">+ record failure</text>
  <line x1="500" y1="90" x2="500" y2="156" stroke="#4ecca3" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="512" y="120" fill="#4ecca3" font-size="11">yes</text>
  <line x1="440" y1="90" x2="260" y2="156" stroke="#e94560" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="330" y="120" fill="#e94560" font-size="11">no</text>
  <text x="280" y="228" fill="#7ec8e3" font-size="12" text-anchor="middle">Every branch writes to the serial number's traceability record.</text>
</svg>

**Step 4 — Authoritative source.** The traceability and calibration requirements for medical-device assembly are specified in [ISO 13485:2016](https://www.iso.org/standard/59752.html); aerospace uses AS9100 with the same structure.

**Step 5 — Check yourself.**

<details><summary>Example problem</summary>

An electric driver logs the torque at every fastener, so the torque data is recorded automatically. Why must the torque wrench and driver still be calibrated on a schedule?

<details><summary>Solution</summary>

The log is only as trustworthy as the instrument that produced it: a driver that has drifted (worn clutch, temperature shift) will happily log wrong values as if they were correct. Calibration ties the instrument's readings to a traceable standard at a fixed interval, so the logged torque at each fastener means what the spec says it means — and the traceability record (serial number → station → torque log → calibration record) holds up in an audit.

</details>

</details>

</details>

### Design for Assembly (DFA)

Design decisions made at the product level that reduce assembly time, cost, and error rate — before the line is designed.

<details><summary>Details</summary>

**Step 1 — The idea.** DFA moves the assembly problem upstream: instead of making the line cope with a hard product, make the product easy to assemble. The levers:

- **Minimize part count**: every part adds handling, fastening, and inspection time. Combine functions into a single part where possible (e.g., a housing that integrates the bracket and the cable guide).
- **One-direction insertion**: design parts so they can only be inserted in the correct orientation. Keyed connectors, asymmetric shapes, and chamfered guides eliminate a class of errors without operator attention.
- **Standard fasteners**: use as few fastener types as possible. A single M4 screw for all subassemblies reduces tool changes, inventory, and training.
- **Modular design**: group parts into subassemblies that can be built independently and combined at the end. Each module is a self-contained unit with a defined interface (mechanical, electrical, thermal).
- **Gravity-fed part presentation**: orient parts so gravity alone presents them in the correct pose at the workstation, eliminating the feeder and operator re-orientation.
- **DFA index**: Boothroyd's method scores each part on insertion, fastening, and handling operations; a lower score indicates a simpler, cheaper assembly. See the [authoritative source](https://www.routledge.com/Product-Design-for-Manufacture-and-Assembly/Boothroyd-Dewhurst-Knight/p/book/9781420089271) for the full method.

**Step 2 — A worked example.** The consumer drone below (see the [example problem](#example-problem)) applies all three poka-yoke levers at once: a keyed motor connector (one flat → only one rotational orientation fits), a snap-fit battery latch (only closes when fully seated), and a camera alignment pin (only one rotational position). Each eliminates an error mode geometrically.

**Step 3 — See it in action.** Cross-section of the keyed connector: the flat on the pin matches the flat in the socket, so 3 of the 4 rotational orientations are blocked by interference.

<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cross-section of a keyed connector: pin with flat entering keyed socket">
  <defs><marker id="arr3" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L8,3.5 L0,7 Z" fill="#e94560"/></marker></defs>
  <rect x="60" y="150" width="200" height="60" rx="4" fill="#2a2a4a" stroke="#7ec8e3"/>
  <rect x="110" y="150" width="100" height="22" fill="#1a1a2e" stroke="#7ec8e3"/>
  <rect x="110" y="150" width="100" height="6" fill="#e94560"/>
  <text x="270" y="166" fill="#e94560" font-size="12">socket: keyed opening (flat on top)</text>
  <text x="270" y="184" fill="#aaa" font-size="11">chamfered lead-in self-aligns the part</text>
  <rect x="130" y="60" width="60" height="70" rx="28" fill="#7ec8e3"/>
  <rect x="130" y="60" width="60" height="10" fill="#e94560"/>
  <line x1="200" y1="65" x2="252" y2="65" stroke="#e94560" stroke-width="1.5" marker-end="url(#arr3)"/>
  <text x="258" y="60" fill="#e94560" font-size="12">flat (the key)</text>
  <text x="258" y="76" fill="#aaa" font-size="11">blocks 3 of 4 orientations</text>
  <line x1="160" y1="134" x2="160" y2="146" stroke="#4ecca3" stroke-width="2" marker-end="url(#arr3)"/>
  <text x="60" y="228" fill="#4ecca3" font-size="12">Only the keyed orientation fits; the detent click at full engagement confirms seating.</text>
</svg>

**Step 4 — Authoritative source.** The DFA index and the part-count/insertion rules are from [Boothroyd, Dewhurst, Knight, Product Design for Manufacture and Assembly](https://www.routledge.com/Product-Design-for-Manufacture-and-Assembly/Boothroyd-Dewhurst-Knight/p/book/9781420089271).

**Step 5 — Check yourself.**

<details><summary>Example problem</summary>

A housing subassembly is attached with 6 screws of 4 different types (two M2 self-tapping, two M3 machine, one M4 machine, one M5 shoulder). Redesign the attachment to reduce assembly cost.

<details><summary>Solution</summary>

Standardize to a single M4 machine screw for all six positions (one tool, one torque spec, one spare part), and integrate the mounting bosses into the housing so no separate bracket part is needed (part count drops by one). The DFA index falls because both the handling and fastening scores per part drop: fewer part types to feed, one tool with no changeovers, and one torque spec to verify in-line.

</details>

</details>

</details>

## Example problem

A consumer drone has 45 unique parts: a carbon-fiber frame, 4 motors, 4 propellers, a flight controller, a battery, a camera, and various fasteners and connectors. Design a 3-station assembly line with a takt time of 2 minutes.

<details><summary>Solution</summary>

1. **Decompose into subassemblies and balance the line**:
   - **Station 1 (100 s)**: Mount 4 motors on the frame using M3×8 SHCS (grade 12.9), torque 0.5 N·m ± 0.05. Attach 4 propellers with M2.5×6 screws, torque 0.2 N·m. Route motor wires to the flight controller connector (keyed, 4-pin).
   - **Station 2 (110 s)**: Install the flight controller (4× M3×6, torque 0.4 N·m), battery (snap-fit latch, verified by detent click), and camera (1× M2.5 alignment pin + 2× M2.5×4, torque 0.15 N·m). Connect all wiring. Perform POST: motors spin at 1000 RPM ± 50, camera initializes (image brightness > 100 cd/m²).
   - **Station 3 (105 s)**: Torque-check all 14 fasteners (re-verify within ±10 % of spec). Apply serial number label. Run EOL test: GPS lock < 5 s, IMU bias < 0.01 °/s, camera image capture (resolution 1920×1080, no dead pixels). Package.
   - **Balance check**: $`\eta = \frac{\sum t_i}{n \cdot t_{\text{takt}}} = \frac{100+110+105}{3 \times 120} = \frac{315}{360} \approx 88\ \%`, above the ≥ 85 % target. ✓

2. **Poka-yoke features and error reduction**:
   - Motor connectors are keyed (one flat on a cylindrical body): 4 orientations are possible, 3 of which are wrong, so the *theoretical random* error rate is 75 % (3 of 4 orientations). Operators are not random — they try, feel the resistance of the interference, and re-orient — so the *observed historical* rate was ~5 % of insertions. The key makes wrong orientation physically impossible → ~0 %.
   - Battery bay latch: only closes when fully seated → eliminates partial-insertion errors (historically ~2 % of units).
   - Camera bracket alignment pin: only one rotational position → eliminates misalignment (historically ~1.5 % of units).
   - **Combined effect**: the three error modes are independent, so the rework rates add: 5 % + 2 % + 1.5 % ≈ 8.5 % of units required rework before poka-yoke. After poka-yoke, all three error modes are physically impossible, so the total drops to < 0.5 % (the residual comes from error modes the features do not address, e.g., a missing fastener, which the torque log catches instead).

3. **Metrology and traceability**:
   - Each station uses a calibrated torque driver (calibration interval: 12 months, per [Metrology and quality control](./Metrology-and-quality-control.md)).
   - Station 3's EOL test records all sensor readings (GPS time-to-fix, IMU bias, camera pixel count) to a database keyed by serial number.
   - For operation sequencing and takt-time derivation, see [Process planning and DFM](./Process-planning-and-DFM.md).
   - PCB-level assembly (soldering, reflow) is covered under [Electronics](./Electronics/Readme.md).

</details>

## Parent

This page is a class in the [Manufacturing](./Readme.md) topic.