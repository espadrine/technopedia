# Metrology / quality control

Metrology / quality control is the verification function that measures, inspects, calibrates, and verifies the results of every manufacturing transformation without itself producing the product geometry or function. It is relevant at every stage: from incoming material inspection to final product test.

> **Authoritative sources**
> - [ISO 9001:2026, Quality management systems — Requirements](https://www.iso.org/standard/9001)
> - [ISO 10360-2:2009, Acceptance and reverification tests for coordinate measuring machines — Part 2: CMMs for measuring length](https://www.iso.org/standard/40954.html)
> - [ISO 21920-2:2021, Geometrical product specifications (GPS) — Surface texture — Profile and areal methods — Part 2: Terms, symbols and parameters for areal texture of surfaces](https://www.iso.org/standard/72226.html)
> - [AS9100D:2018, Quality management systems — Requirements for aviation, space, and defense organizations](https://www.sae.org/standards/as9100d-quality-management-systems-requirements-aviation-space-defense-organizations)

## Utility

- Verifies that parts and systems conform to specification.
- Detects defects before they propagate to downstream operations.
- Provides traceability: every measurement is linked to a part, a process, and a time.
- Drives continuous improvement: measurement data feeds statistical process control (SPC) and root-cause analysis.

## How the sections relate

<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker>
  </defs>
  <!-- Calibration box (bottom, underpins all) -->
  <rect x="200" y="160" width="300" height="40" rx="6" fill="#e8f4fd" stroke="#2196F3" stroke-width="1.5"/>
  <text x="350" y="185" text-anchor="middle" font-size="13" font-weight="bold" fill="#1565C0">Calibration &amp; traceability</text>
  <!-- Arrows up from calibration -->
  <line x1="250" y1="160" x2="150" y2="110" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>
  <line x1="350" y1="160" x2="350" y2="110" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>
  <line x1="450" y1="160" x2="550" y2="110" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>
  <!-- Dimensional metrology -->
  <rect x="50" y="70" width="200" height="40" rx="6" fill="#fff3e0" stroke="#FF9800" stroke-width="1.5"/>
  <text x="150" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#E65100">Dimensional metrology</text>
  <!-- Surface metrology -->
  <rect x="250" y="70" width="200" height="40" rx="6" fill="#fff3e0" stroke="#FF9800" stroke-width="1.5"/>
  <text x="350" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#E65100">Surface metrology</text>
  <!-- Material testing -->
  <rect x="450" y="70" width="200" height="40" rx="6" fill="#e8f5e9" stroke="#4CAF50" stroke-width="1.5"/>
  <text x="550" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">Material &amp; property testing</text>
  <!-- SPC box (top) -->
  <rect x="150" y="10" width="200" height="40" rx="6" fill="#fce4ec" stroke="#E91E63" stroke-width="1.5"/>
  <text x="250" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#880E4F">Statistical process control</text>
  <!-- Arrows to SPC -->
  <line x1="150" y1="70" x2="200" y2="50" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>
  <line x1="350" y1="70" x2="300" y2="50" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>
  <!-- QMS box (right) -->
  <rect x="450" y="10" width="200" height="40" rx="6" fill="#ede7f6" stroke="#673AB7" stroke-width="1.5"/>
  <text x="550" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#4527A0">Quality management systems</text>
  <!-- Arrow from SPC to QMS -->
  <line x1="350" y1="30" x2="450" y2="30" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>
  <!-- Labels -->
  <text x="350" y="215" text-anchor="middle" font-size="11" fill="#666">Calibration underpins all measurement; dimensional and surface data feed SPC; material testing is a parallel verification track.</text>
</svg>

Calibration underpins every measurement. Dimensional and surface metrology produce the data that feeds SPC. Material and property testing runs in parallel as a separate verification track. Quality management systems (QMS) govern the documentation, audit, and continuous-improvement loop that ties all of these together.

## Key concepts

### Dimensional metrology

Measuring the geometry of a part: dimensions, form, orientation, and position. Critical for verifying [subtractive manufacturing](./Subtractive-manufacturing/Readme.md) results, [additive manufacturing](./Additive-manufacturing.md) parts.

<details><summary>Details</summary>

- **CMM (coordinate measuring machine)**: a probe contacts the part surface at many points; the software reconstructs the geometry. Accuracy ±2–8 µm (high-end: ±1 µm), depending on machine class per [ISO 10360-2:2009](https://www.iso.org/standard/40954.html). Used for final inspection of machined and cast parts.
- **Optical metrology**: structured light, laser triangulation, or confocal microscopy. Non-contact; used for surface topography, 3D scanning, and in-line inspection.
- **Interferometry**: a laser interferometer measures displacement with nanometer resolution. Used for calibrating CMMs and for high-precision optics.
- **Calipers, micrometers, gauges**: hand-held instruments for shop-floor inspection. Accuracy ±0.01 mm (calipers) to ±0.001 mm (micrometers).

**CMM probe schematic:**

<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:400px;">
  <!-- Part (block) -->
  <rect x="100" y="120" width="200" height="60" fill="#b0bec5" stroke="#546e7a" stroke-width="1.5"/>
  <text x="200" y="155" text-anchor="middle" font-size="11" fill="#37474f">Workpiece</text>
  <!-- Bore -->
  <circle cx="200" cy="150" r="15" fill="#78909c" stroke="#37474f" stroke-width="1"/>
  <!-- CMM gantry -->
  <rect x="80" y="20" width="240" height="10" fill="#90a4ae" stroke="#546e7a"/>
  <rect x="80" y="20" width="10" height="100" fill="#90a4ae" stroke="#546e7a"/>
  <rect x="310" y="20" width="10" height="100" fill="#90a4ae" stroke="#546e7a"/>
  <!-- Probe arm -->
  <line x1="200" y1="30" x2="200" y2="100" stroke="#37474f" stroke-width="2"/>
  <line x1="200" y1="100" x2="200" y2="130" stroke="#37474f" stroke-width="1.5"/>
  <!-- Probe tip -->
  <circle cx="200" cy="133" r="4" fill="#f44336" stroke="#b71c1c"/>
  <!-- Contact point -->
  <circle cx="200" cy="137" r="2" fill="#f44336"/>
  <!-- Labels -->
  <text x="200" y="15" text-anchor="middle" font-size="11" fill="#37474f">CMM gantry (X, Y, Z axes)</text>
  <text x="260" y="105" font-size="10" fill="#37474f">Probe stylus</text>
  <text x="260" y="140" font-size="10" fill="#b71c1c">Contact point</text>
  <!-- Dimension arrow -->
  <line x1="155" y1="150" x2="245" y2="150" stroke="#1565C0" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="200" y="195" text-anchor="middle" font-size="10" fill="#1565C0">Measured dimension</text>
</svg>

</details>

### Surface metrology

Measuring surface roughness, texture, and topography. Directly related to [surface finishing](./Surface-finishing.md) processes that set the target roughness.

<details><summary>Details</summary>

- **Stylus profilometer**: a diamond tip traces the surface; Ra, Rz, and other parameters are computed. Resolution 0.001 µm (vertical), 0.1 µm (lateral).
- **Optical profilometer (white light, confocal)**: non-contact; maps 3D surface topography over large areas. Used for thin films, coatings, and textured surfaces.
- **Surface roughness standards**: [ISO 21920-2:2021](https://www.iso.org/standard/72226.html) defines parameters (Ra, Rq, Rz, Rmax). Typical values: as-cast Ra 10–50 µm; as-machined (milling/turning) Ra 1.6–6.3 µm (3.2 µm is the common default; 0.8 µm requires a dedicated finishing pass); ground Ra 0.2–0.8 µm; polished Ra < 0.1 µm.

**Surface roughness profile (Ra, Rz, Rmax):**

<svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;">
  <!-- Roughness profile line -->
  <polyline points="20,100 40,85 60,110 80,75 100,95 120,80 140,105 160,70 180,90 200,82 220,108 240,78 260,92 280,72 300,98 320,85 340,102 360,76 380,94 400,80 420,106 440,88 460,96 480,82" fill="none" stroke="#37474f" stroke-width="1.5"/>
  <!-- Mean line -->
  <line x1="20" y1="90" x2="480" y2="90" stroke="#1565C0" stroke-width="1" stroke-dasharray="6,3"/>
  <text x="485" y="93" font-size="9" fill="#1565C0">mean line</text>
  <!-- Ra annotation -->
  <line x1="100" y1="90" x2="100" y2="75" stroke="#E91E63" stroke-width="1.5"/>
  <text x="105" y="82" font-size="10" fill="#E91E63">Ra</text>
  <!-- Rz annotation (peak to valley) -->
  <line x1="280" y1="72" x2="280" y2="108" stroke="#4CAF50" stroke-width="1.5"/>
  <text x="285" y="92" font-size="10" fill="#2E7D32">Rz</text>
  <!-- Rmax annotation -->
  <line x1="400" y1="70" x2="400" y2="108" stroke="#FF9800" stroke-width="1.5"/>
  <text x="405" y="92" font-size="10" fill="#E65100">Rmax</text>
  <!-- Labels -->
  <text x="250" y="170" text-anchor="middle" font-size="11" fill="#37474f">Stylus profilometer trace: Ra (arithmetic mean), Rz (max height in sampling length), Rmax (max peak-to-valley)</text>
</svg>

</details>

### Material and property testing

Measuring the mechanical, chemical, and physical properties of the material. Context: [materials processing](./Materials-processing.md) sets the target properties; this section verifies them.

<details><summary>Details</summary>

- **Tensile test**: a coupon is pulled until fracture; yield strength, ultimate tensile strength, and elongation are measured. (ISO 6892-1)
- **Hardness test**: Brinell, Rockwell, or Vickers. An indenter is pressed into the surface; the indentation size gives the hardness.
- **Spectroscopy**: optical emission (OES) or X-ray fluorescence (XRF) measures the chemical composition of a metal lot.
- **Non-destructive testing (NDT)**: ultrasonic, radiographic, eddy-current, or dye-penetrant inspection to detect internal or surface defects without destroying the part. X-ray CT is particularly important for [additive manufacturing](./Additive-manufacturing.md) parts.

</details>

### Statistical process control (SPC)

Using statistical methods to monitor and control a process in real time. SPC data comes from the dimensional and surface metrology measurements above; the results feed back into [process planning and DFM](./Process-planning-and-DFM.md).

<details><summary>Details</summary>

- **Control charts**: X-bar and R charts track the mean and range of a measured characteristic over time. If the process is in control, the measurements fall within the control limits (±3σ).
- **Process capability (Cpk)**: Cpk = min((USL − X̄) / (3σ), (X̄ − LSL) / (3σ)). Uses *within-subgroup* variation (σ estimated from the average range R̄/d₂). Cpk ≥ 1.33 is the minimum for most industries; Cpk ≥ 1.67 for aerospace.
- **Process performance (Ppk)**: Ppk = min((USL − X̄) / (3σ_overall), (X̄ − LSL) / (3σ_overall)). Uses *overall* variation (σ computed from all individual measurements). Ppk ≤ Cpk always; a large gap signals special-cause variation between subgroups.
- **Pareto analysis**: rank defects by frequency to identify the most impactful issues.
- **Root-cause analysis**: 5-Why, fishbone (Ishikawa) diagram, or FMEA (failure mode and effects analysis) to identify and address the source of a defect.

**Control chart example (in-control vs. out-of-control):**

<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;">
  <!-- Axes -->
  <line x1="50" y1="20" x2="50" y2="170" stroke="#333" stroke-width="1"/>
  <line x1="50" y1="170" x2="480" y2="170" stroke="#333" stroke-width="1"/>
  <!-- UCL -->
  <line x1="50" y1="40" x2="480" y2="40" stroke="#E91E63" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="485" y="43" font-size="9" fill="#E91E63">UCL</text>
  <!-- Center line -->
  <line x1="50" y1="100" x2="480" y2="100" stroke="#1565C0" stroke-width="1.5"/>
  <text x="485" y="103" font-size="9" fill="#1565C0">X̄</text>
  <!-- LCL -->
  <line x1="50" y1="160" x2="480" y2="160" stroke="#E91E63" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="485" y="163" font-size="9" fill="#E91E63">LCL</text>
  <!-- In-control points -->
  <circle cx="70" cy="95" r="3" fill="#4CAF50"/>
  <circle cx="90" cy="105" r="3" fill="#4CAF50"/>
  <circle cx="110" cy="90" r="3" fill="#4CAF50"/>
  <circle cx="130" cy="108" r="3" fill="#4CAF50"/>
  <circle cx="150" cy="97" r="3" fill="#4CAF50"/>
  <circle cx="170" cy="102" r="3" fill="#4CAF50"/>
  <circle cx="190" cy="93" r="3" fill="#4CAF50"/>
  <circle cx="210" cy="107" r="3" fill="#4CAF50"/>
  <circle cx="230" cy="96" r="3" fill="#4CAF50"/>
  <circle cx="250" cy="104" r="3" fill="#4CAF50"/>
  <circle cx="270" cy="92" r="3" fill="#4CAF50"/>
  <circle cx="290" cy="101" r="3" fill="#4CAF50"/>
  <circle cx="310" cy="98" r="3" fill="#4CAF50"/>
  <circle cx="330" cy="106" r="3" fill="#4CAF50"/>
  <circle cx="350" cy="94" r="3" fill="#4CAF50"/>
  <!-- Out-of-control point -->
  <circle cx="370" cy="35" r="4" fill="#f44336"/>
  <circle cx="390" cy="165" r="4" fill="#f44336"/>
  <circle cx="410" cy="38" r="4" fill="#f44336"/>
  <!-- Labels -->
  <text x="260" y="190" text-anchor="middle" font-size="11" fill="#37474f">X-bar chart: green = in-control, red = out-of-control (beyond ±3σ)</text>
  <text x="50" y="15" font-size="10" fill="#333">Measurement</text>
</svg>

**Interactive simulation — X-bar and R control chart with live data:**

<iframe src="./Metrology-and-quality-control.simulation.html" title="Interactive X-bar and R control chart with live data points"></iframe>

</details>

### Calibration and traceability

Ensuring that measurement instruments are accurate and that their readings can be traced to national or international standards.

<details><summary>Details</summary>

- **Calibration**: an instrument is compared to a reference standard of known accuracy. The calibration certificate records the uncertainty of the measurement.
- **Traceability**: the reference standard is traceable to a national metrology institute (NIST, PTB, NPL) or to the SI base units.
- **Calibration interval**: set by the instrument's stability, usage, and the required uncertainty. Typically 1–12 months.
- **Measurement uncertainty**: the range within which the true value lies, with a stated confidence level. Expressed as ±x µm at 95 % confidence.

**Metrology traceability hierarchy:**

<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;">
  <defs>
    <marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker>
  </defs>
  <!-- Level 1: SI -->
  <rect x="150" y="10" width="200" height="35" rx="5" fill="#ede7f6" stroke="#673AB7" stroke-width="1.5"/>
  <text x="250" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="#4527A0">SI base units (m, kg, s, A, K, mol, cd)</text>
  <!-- Level 2: NMI -->
  <rect x="150" y="70" width="200" height="35" rx="5" fill="#e8f4fd" stroke="#2196F3" stroke-width="1.5"/>
  <text x="250" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565C0">National metrology institute</text>
  <text x="250" y="103" text-anchor="middle" font-size="9" fill="#1565C0">(NIST, PTB, NPL, …)</text>
  <!-- Level 3: Calibration lab -->
  <rect x="150" y="130" width="200" height="35" rx="5" fill="#fff3e0" stroke="#FF9800" stroke-width="1.5"/>
  <text x="250" y="152" text-anchor="middle" font-size="12" font-weight="bold" fill="#E65100">Accredited calibration laboratory</text>
  <!-- Level 4: Shop floor -->
  <rect x="150" y="190" width="200" height="35" rx="5" fill="#e8f5e9" stroke="#4CAF50" stroke-width="1.5"/>
  <text x="250" y="212" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">Shop-floor instrument</text>
  <!-- Arrows -->
  <line x1="250" y1="45" x2="250" y2="70" stroke="#333" stroke-width="1.2" marker-end="url(#arr2)"/>
  <line x1="250" y1="105" x2="250" y2="130" stroke="#333" stroke-width="1.2" marker-end="url(#arr2)"/>
  <line x1="250" y1="165" x2="250" y2="190" stroke="#333" stroke-width="1.2" marker-end="url(#arr2)"/>
  <!-- Side labels -->
  <text x="370" y="32" font-size="10" fill="#666">Definition of the metre</text>
  <text x="370" y="92" font-size="10" fill="#666">Realization of SI units</text>
  <text x="370" y="152" font-size="10" fill="#666">Calibration certificates</text>
  <text x="370" y="212" font-size="10" fill="#666">In-service measurement</text>
  <text x="250" y="250" text-anchor="middle" font-size="11" fill="#37474f">Each level calibrates the one below; uncertainty increases downward.</text>
</svg>

</details>

### Quality management systems (QMS)

The organizational framework that governs how metrology and quality control are planned, executed, documented, and improved.

<details><summary>Details</summary>

- **PDCA cycle** (Plan–Do–Check–Act): the core loop of ISO 9001:2026. Plan: define quality objectives and metrology requirements. Do: execute the manufacturing and inspection processes. Check: compare measurement results to specification (SPC, Cpk). Act: implement corrective actions and update procedures.
- **Document control**: every measurement procedure, calibration certificate, and inspection record is a controlled document with a revision history. AS9100D adds requirements for configuration management and traceability of aerospace parts.
- **Role in metrology**: the QMS defines *when* to calibrate, *who* is authorized to perform inspections, *how* non-conforming results are dispositioned (use-as-is, rework, scrap), and *how* measurement data is retained for audit.
- **Internal and external audits**: periodic reviews verify that the metrology program is being followed. Aerospace (AS9100D) and medical (ISO 13485) industries require third-party audits.

</details>

## Example problem

A CNC-machined aluminum bracket has a critical bore of 25.000 ± 0.010 mm. The CMM measures 50 parts and finds a mean of 25.002 mm and a standard deviation of 0.004 mm. Is the process capable?

<details><summary>Solution</summary>

1. **Specification**: LSL = 24.990 mm, USL = 25.010 mm. Tolerance = 0.020 mm.
2. **Process capability**:
   - Cpk (upper) = (USL − X̄) / (3σ) = (25.010 − 25.002) / (3 × 0.004) = 0.008 / 0.012 = 0.67
   - Cpk (lower) = (X̄ − LSL) / (3σ) = (25.002 − 24.990) / (3 × 0.004) = 0.012 / 0.012 = 1.00
   - Cpk = min(0.67, 1.00) = 0.67
3. **Assessment**: Cpk = 0.67 < 1.33. The process is **not capable**. The upper tail is too close to the USL.
4. **Corrective action**: Adjust the tool offset to center the process at 25.000 mm. Re-measure. If σ remains 0.004 mm, Cpk = (25.010 − 25.000) / (3 × 0.004) = 0.010 / 0.012 ≈ 0.83. If Cpk is still < 1.33, reduce σ by improving the machine's repeatability or the fixture's rigidity.
5. **SPC**: Set up an X-bar and R control chart with control limits at X̄ ± 3σ. Monitor the process in real time; investigate any point outside the limits.

**Visual: control chart for the 50 measurements**

<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:520px;">
  <!-- Background -->
  <rect x="0" y="0" width="520" height="220" fill="#fafafa"/>
  <!-- Axes -->
  <line x1="50" y1="15" x2="50" y2="195" stroke="#333" stroke-width="1"/>
  <line x1="50" y1="195" x2="500" y2="195" stroke="#333" stroke-width="1"/>
  <!-- USL line -->
  <line x1="50" y1="30" x2="500" y2="30" stroke="#E91E63" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="505" y="33" font-size="9" fill="#E91E63">USL 25.010</text>
  <!-- LSL line -->
  <line x1="50" y1="180" x2="500" y2="180" stroke="#E91E63" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="505" y="183" font-size="9" fill="#E91E63">LSL 24.990</text>
  <!-- Center line (mean = 25.002) -->
  <line x1="50" y1="105" x2="500" y2="105" stroke="#1565C0" stroke-width="1.5"/>
  <text x="505" y="108" font-size="9" fill="#1565C0">X̄ 25.002</text>
  <!-- UCL (mean + 3σ = 25.014) -->
  <line x1="50" y1="20" x2="500" y2="20" stroke="#FF9800" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="505" y="23" font-size="9" fill="#FF9800">UCL</text>
  <!-- LCL (mean - 3σ = 24.994) -->
  <line x1="50" y1="170" x2="500" y2="170" stroke="#FF9800" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="505" y="173" font-size="9" fill="#FF9800">LCL</text>
  <!-- Data points (50 points, mean 25.002, σ 0.004, mapped: y = 105 - (val-25.002)/0.004*25) -->
  <!-- Scale: 0.001 mm = 6.25 px. USL at 25.010 → y=105-8*6.25=55; LSL at 24.990 → y=105+12*6.25=180 -->
  <circle cx="60" cy="100" r="2.5" fill="#4CAF50"/>
  <circle cx="69" cy="110" r="2.5" fill="#4CAF50"/>
  <circle cx="78" cy="95" r="2.5" fill="#4CAF50"/>
  <circle cx="87" cy="115" r="2.5" fill="#4CAF50"/>
  <circle cx="96" cy="105" r="2.5" fill="#4CAF50"/>
  <circle cx="105" cy="90" r="2.5" fill="#4CAF50"/>
  <circle cx="114" cy="108" r="2.5" fill="#4CAF50"/>
  <circle cx="123" cy="98" r="2.5" fill="#4CAF50"/>
  <circle cx="132" cy="112" r="2.5" fill="#4CAF50"/>
  <circle cx="141" cy="102" r="2.5" fill="#4CAF50"/>
  <circle cx="150" cy="88" r="2.5" fill="#4CAF50"/>
  <circle cx="159" cy="106" r="2.5" fill="#4CAF50"/>
  <circle cx="168" cy="94" r="2.5" fill="#4CAF50"/>
  <circle cx="177" cy="114" r="2.5" fill="#4CAF50"/>
  <circle cx="186" cy="100" r="2.5" fill="#4CAF50"/>
  <circle cx="195" cy="92" r="2.5" fill="#4CAF50"/>
  <circle cx="204" cy="108" r="2.5" fill="#4CAF50"/>
  <circle cx="213" cy="96" r="2.5" fill="#4CAF50"/>
  <circle cx="222" cy="110" r="2.5" fill="#4CAF50"/>
  <circle cx="231" cy="85" r="2.5" fill="#4CAF50"/>
  <circle cx="240" cy="104" r="2.5" fill="#4CAF50"/>
  <circle cx="249" cy="98" r="2.5" fill="#4CAF50"/>
  <circle cx="258" cy="112" r="2.5" fill="#4CAF50"/>
  <circle cx="267" cy="90" r="2.5" fill="#4CAF50"/>
  <circle cx="276" cy="106" r="2.5" fill="#4CAF50"/>
  <circle cx="285" cy="82" r="2.5" fill="#4CAF50"/>
  <circle cx="294" cy="100" r="2.5" fill="#4CAF50"/>
  <circle cx="303" cy="94" r="2.5" fill="#4CAF50"/>
  <circle cx="312" cy="110" r="2.5" fill="#4CAF50"/>
  <circle cx="321" cy="88" r="2.5" fill="#4CAF50"/>
  <circle cx="330" cy="104" r="2.5" fill="#4CAF50"/>
  <circle cx="339" cy="78" r="2.5" fill="#4CAF50"/>
  <circle cx="348" cy="100" r="2.5" fill="#4CAF50"/>
  <circle cx="357" cy="92" r="2.5" fill="#4CAF50"/>
  <circle cx="366" cy="108" r="2.5" fill="#4CAF50"/>
  <circle cx="375" cy="85" r="2.5" fill="#4CAF50"/>
  <circle cx="384" cy="96" r="2.5" fill="#4CAF50"/>
  <circle cx="393" cy="102" r="2.5" fill="#4CAF50"/>
  <circle cx="402" cy="75" r="2.5" fill="#4CAF50"/>
  <circle cx="411" cy="106" r="2.5" fill="#4CAF50"/>
  <circle cx="420" cy="90" r="2.5" fill="#4CAF50"/>
  <circle cx="429" cy="100" r="2.5" fill="#4CAF50"/>
  <circle cx="438" cy="80" r="2.5" fill="#4CAF50"/>
  <circle cx="447" cy="104" r="2.5" fill="#4CAF50"/>
  <circle cx="456" cy="94" r="2.5" fill="#4CAF50"/>
  <circle cx="465" cy="70" r="2.5" fill="#f44336"/>
  <circle cx="474" cy="100" r="2.5" fill="#4CAF50"/>
  <circle cx="483" cy="88" r="2.5" fill="#4CAF50"/>
  <circle cx="492" cy="60" r="2.5" fill="#f44336"/>
  <!-- Annotation: upper tail too close to USL -->
  <rect x="60" y="35" width="120" height="18" rx="3" fill="#fff" opacity="0.8"/>
  <text x="120" y="48" text-anchor="middle" font-size="9" fill="#E91E63">Upper tail near USL</text>
  <!-- X-axis label -->
  <text x="275" y="212" text-anchor="middle" font-size="10" fill="#333">Part number (1–50)</text>
  <!-- Y-axis label -->
  <text x="15" y="105" text-anchor="middle" font-size="10" fill="#333" transform="rotate(-90,15,105)">Bore diameter (mm)</text>
</svg>

The red points near the USL line illustrate why Cpk = 0.67: the process mean is shifted toward the upper specification limit, so the upper tail has insufficient margin.

</details>

## Parent

This page is a cross-cutting concern in the [Manufacturing](./Readme.md) topic.

