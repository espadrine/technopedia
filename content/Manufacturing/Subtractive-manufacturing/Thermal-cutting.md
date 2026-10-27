# Thermal cutting

Thermal cutting removes material by heating it to its melting or boiling point with a concentrated energy source (laser, plasma arc, oxy-fuel flame, or electron beam) and ejecting the molten or vaporised material. It is the dominant method for 2-D contour cutting of sheet and plate, and the only practical way to cut very thick sections (> 50 mm) without mechanical force.

> **Authoritative sources**
> - [ISO 9013:2017, Thermal cutting — Classification of thermal cuts](https://www.iso.org/standard/60321.html)
> - [AWS C5.2, Recommended Practices for Plasma Arc Cutting and Gouging](https://www.aws.org/)
> - [AWS C4.9/C4.9M, Recommended Practices for Oxyacetylene Cutting of Steel](https://www.aws.org/)
> - [AWS C7.1M/C7.1, Recommended Practices for Electron Beam Welding and Allied Processes](https://www.aws.org/)

## Common principles

All four thermal cutting processes share the same underlying physics:

1. **Energy-density threshold.** The material must be heated above its melting point (or boiling point, for keyhole-mode laser and EB) at the cut front. The required power density is $`q = P / A` where $`P` is the delivered power and $`A` is the effective interaction area. Below this threshold the material merely heats without cutting.
2. **Heat transfer.** Once the cut front is established, heat conducts laterally into the workpiece, creating a heat-affected zone (HAZ). Convection (gas flow) and radiation also carry energy away. The HAZ width is governed by the thermal diffusivity $`\alpha = k / (\rho c_p)` of the material and the dwell time (thickness / cut speed).
3. **Assist / cutting gas.** A gas jet (N₂, O₂, Ar, air) serves two roles: it ejects the molten or vaporised material from the kerf, and (for O₂ on steel) it supplies additional exothermic energy that sustains the cut. Without the gas, the melt re-solidifies and the cut stalls.
4. **Penetration–kerf trade-off.** Greater penetration depth requires more energy, which widens the kerf and enlarges the HAZ. This fundamental trade-off is what differentiates the four processes: laser and EB concentrate energy into a tiny spot (narrow kerf, limited thickness), while plasma and oxy-fuel spread energy over a wider zone (wider kerf, greater thickness).

The material properties that govern cuttability (thermal conductivity, melting point, oxidation behaviour, electrical conductivity) are covered in [Materials processing](../Materials-processing.md).

## Process comparison

<table>
<tr><th>Process</th><th>Kerf width</th><th>HAZ</th><th>Max thickness (steel)</th><th>Edge quality (Ra)</th><th>Material restrictions</th><th>Relative cost</th><th>Typical applications</th></tr>
<tr><td>Laser (fibre)</td><td>0.1–0.5 mm</td><td>0.1–0.5 mm</td><td>~25 mm (O₂), ~15 mm (N₂)</td><td>10–20 µm</td><td>Most metals; non-metals with CO₂</td><td>Medium–High</td><td>Sheet metal, automotive, aerospace</td></tr>
<tr><td>Plasma (HD/UHD)</td><td>1–3 mm</td><td>0.5–2 mm</td><td>50–100 mm</td><td>25–50 µm</td><td>Electrically conductive only</td><td>Low–Medium</td><td>Structural steel, shipbuilding, fabrication</td></tr>
<tr><td>Oxy-fuel</td><td>5–15 mm</td><td>2–5 mm</td><td>300 mm</td><td>50–100 µm</td><td>Ferrous metals only</td><td>Low</td><td>Thick plate, structural, shipbuilding</td></tr>
<tr><td>Electron beam</td><td>0.1–0.5 mm</td><td>&lt; 0.1 mm</td><td>50 mm</td><td>5–15 µm</td><td>Most metals (vacuum-compatible)</td><td>Very high</td><td>Aerospace, nuclear, superalloys</td></tr>
</table>

## Laser cutting

A focused laser beam (CO₂ at 10.6 µm, or fibre at 1.06 µm) heats the material to its boiling point; an assist gas (N₂, O₂, or air) ejects the molten metal.

Key parameters: laser power $`P` (W), spot diameter $`d` (µm), cut speed $`v` (m/min), assist gas pressure (bar), focal position (mm above/below surface).

<details><summary>Details</summary>

- **Conduction mode** (low power, thin sheet): the beam heats the surface; conduction spreads the heat. The gas blows away the melt. Used for < 2 mm steel with N₂.
- **Keyhole mode** (high power, thick section): the beam vaporises the metal, creating a plasma-filled keyhole. The recoil pressure and gas flow eject the melt. Used for 2–25 mm steel with O₂ (exothermic) or N₂ (inert).
- **Kerf**: 0.1–0.5 mm for fibre laser on steel. The kerf tapers with thickness.
- **Heat-affected zone (HAZ)**: 0.1–0.5 mm for steel; negligible for aluminium with N₂.
- **Materials**: carbon steel, stainless, aluminium, copper (fibre laser), titanium. Non-metals (wood, acrylic, fabric) are cut with CO₂ laser.

### Keyhole-mode cross-section

<div style="text-align:center; margin:1em 0;">
<svg width="320" height="260" viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
  <!-- Workpiece -->
  <rect x="40" y="120" width="240" height="100" fill="#8899aa" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="235" text-anchor="middle" font-size="11" fill="#333">Workpiece (steel plate)</text>
  <!-- Laser beam -->
  <line x1="160" y1="10" x2="160" y2="120" stroke="red" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="175" y="30" font-size="10" fill="red">Laser beam</text>
  <!-- Keyhole (vaporisation channel) -->
  <path d="M155,120 L158,175 L162,175 L165,120 Z" fill="#ff6600" stroke="#cc3300" stroke-width="1"/>
  <text x="180" y="155" font-size="9" fill="#cc3300">Keyhole</text>
  <text x="180" y="165" font-size="9" fill="#cc3300">(vaporisation)</text>
  <!-- Melt pool -->
  <ellipse cx="160" cy="178" rx="18" ry="6" fill="#ffaa00" opacity="0.7"/>
  <text x="195" y="182" font-size="9" fill="#996600">Melt pool</text>
  <!-- HAZ -->
  <ellipse cx="160" cy="180" rx="30" ry="10" fill="none" stroke="#cc6600" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="200" y="195" font-size="9" fill="#cc6600">HAZ</text>
  <!-- Assist gas -->
  <path d="M150,100 L155,120 M170,100 L165,120" stroke="#4488cc" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <text x="100" y="105" font-size="9" fill="#4488cc">Assist gas (N₂/O₂)</text>
  <!-- Ejected melt -->
  <path d="M158,175 Q140,200 130,220 M162,175 Q180,200 190,220" stroke="#ff6600" stroke-width="1.5" fill="none"/>
  <text x="120" y="225" font-size="9" fill="#ff6600">Ejected melt</text>
  <!-- Kerf label -->
  <line x1="155" y1="225" x2="165" y2="225" stroke="#333" stroke-width="1"/>
  <text x="160" y="240" text-anchor="middle" font-size="9" fill="#333">Kerf</text>
  <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#4488cc"/></marker></defs>
</svg>
</div>

The laser and electron-beam equipment used here is the same technology family as in [Joining](../Joining.md) (laser welding, EB welding); the difference is that the beam is scanned along a contour rather than held at a stationary joint.

</details>

## Plasma cutting

An electric arc ionises a gas (argon, hydrogen, nitrogen, or air) to a plasma jet at 20 000–30 000 °C. The jet melts and the gas flow blows away the molten metal.

Key parameters: arc current (A), gas flow (L/min), electrode-to-workpiece distance (standoff, mm), cut speed (m/min).

<details><summary>Details</summary>

- **Conventional plasma**: cuts up to 20 mm steel, kerf 2–5 mm, Ra 25–50 µm. Used for structural steel, shipbuilding, and fabrication shops.
- **High-definition (HD) plasma**: a constricted arc and higher gas pressure reduce the kerf to 1–2 mm and improve edge quality. Cuts up to 50 mm.
- **Ultra-high-definition (UHD) plasma**: approaches laser quality on 10–25 mm steel at a fraction of the cost.
- **Materials**: any electrically conductive metal (steel, aluminium, copper, titanium). Non-conductive materials cannot be cut.

### Plasma arc constriction cross-section

<div style="text-align:center; margin:1em 0;">
<svg width="320" height="260" viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
  <!-- Workpiece -->
  <rect x="40" y="140" width="240" height="80" fill="#8899aa" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="235" text-anchor="middle" font-size="11" fill="#333">Workpiece</text>
  <!-- Torch body -->
  <rect x="145" y="10" width="30" height="50" fill="#666" stroke="#333" stroke-width="1"/>
  <text x="190" y="30" font-size="9" fill="#333">Torch / nozzle</text>
  <!-- Constriction ring -->
  <rect x="148" y="55" width="24" height="15" fill="#999" stroke="#333" stroke-width="1"/>
  <text x="190" y="67" font-size="9" fill="#333">Constriction</text>
  <!-- Plasma jet -->
  <path d="M155,70 L158,140 L162,140 L165,70 Z" fill="#ffcc00" stroke="#ff8800" stroke-width="1"/>
  <text x="180" y="105" font-size="9" fill="#ff8800">Plasma jet</text>
  <text x="180" y="115" font-size="9" fill="#ff8800">(20 000–30 000 °C)</text>
  <!-- Melt pool -->
  <ellipse cx="160" cy="145" rx="20" ry="7" fill="#ffaa00" opacity="0.7"/>
  <!-- HAZ -->
  <ellipse cx="160" cy="148" rx="35" ry="12" fill="none" stroke="#cc6600" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="205" y="155" font-size="9" fill="#cc6600">HAZ</text>
  <!-- Ejected metal -->
  <path d="M158,145 Q135,175 125,200 M162,145 Q185,175 195,200" stroke="#ff6600" stroke-width="1.5" fill="none"/>
  <text x="115" y="205" font-size="9" fill="#ff6600">Ejected melt</text>
  <!-- Gas flow arrows -->
  <path d="M150,80 L155,130 M170,80 L165,130" stroke="#4488cc" stroke-width="1" fill="none"/>
  <text x="95" y="95" font-size="9" fill="#4488cc">Gas flow</text>
  <!-- Kerf -->
  <line x1="155" y1="220" x2="165" y2="220" stroke="#333" stroke-width="1"/>
  <text x="160" y="240" text-anchor="middle" font-size="9" fill="#333">Kerf</text>
</svg>
</div>

</details>

## Oxy-fuel (flame) cutting

A preheating flame (oxygen + acetylene or propane) brings the steel to its ignition temperature (~1 300 °C); a high-pressure oxygen jet then oxidises (burns) the metal, and the reaction heat sustains the cut.

Key parameters: preheat flame type, oxygen cutting pressure (bar), cut speed (m/min), kerf width (mm).

<details><summary>Details</summary>

- **Only works on ferrous metals** (carbon steel, low-alloy steel) that oxidise exothermically. Stainless steel, aluminium, and copper cannot be oxy-fuel cut.
- **Thickness range**: 5 mm to 300 mm. The only practical method for very thick plates (> 100 mm).
- **Kerf**: 5–15 mm (wide). HAZ: 2–5 mm with a decarburised layer.
- **Edge quality**: rough (Ra 50–100 µm); usually followed by machining or grinding for critical dimensions.

### Oxy-fuel flame geometry

<div style="text-align:center; margin:1em 0;">
<svg width="320" height="260" viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
  <!-- Workpiece -->
  <rect x="40" y="130" width="240" height="90" fill="#8899aa" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="235" text-anchor="middle" font-size="11" fill="#333">Steel plate</text>
  <!-- Torch -->
  <rect x="148" y="10" width="24" height="40" fill="#666" stroke="#333" stroke-width="1"/>
  <text x="185" y="25" font-size="9" fill="#333">Torch</text>
  <!-- Preheat flames (outer) -->
  <path d="M152,50 Q140,80 145,125" stroke="#ff8800" stroke-width="2" fill="none"/>
  <path d="M168,50 Q180,80 175,125" stroke="#ff8800" stroke-width="2" fill="none"/>
  <text x="90" y="90" font-size="9" fill="#ff8800">Preheat</text>
  <text x="90" y="100" font-size="9" fill="#ff8800">flames</text>
  <!-- Oxygen cutting jet (centre) -->
  <line x1="160" y1="50" x2="160" y2="130" stroke="#4488ff" stroke-width="2.5"/>
  <text x="185" y="80" font-size="9" fill="#4488ff">O₂ cutting</text>
  <text x="185" y="90" font-size="9" fill="#4488ff">jet</text>
  <!-- Reaction zone (bright) -->
  <ellipse cx="160" cy="132" rx="12" ry="5" fill="#ffff00" opacity="0.8"/>
  <text x="185" y="135" font-size="9" fill="#999900">Reaction zone</text>
  <!-- Melt / oxide ejection -->
  <path d="M155,135 Q130,170 120,200 M165,135 Q190,170 200,200" stroke="#ff4400" stroke-width="1.5" fill="none"/>
  <text x="110" y="205" font-size="9" fill="#ff4400">Melt + oxide</text>
  <!-- HAZ -->
  <ellipse cx="160" cy="140" rx="40" ry="15" fill="none" stroke="#cc6600" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="210" y="150" font-size="9" fill="#cc6600">HAZ (2–5 mm)</text>
  <!-- Kerf -->
  <line x1="150" y1="220" x2="170" y2="220" stroke="#333" stroke-width="1"/>
  <text x="160" y="240" text-anchor="middle" font-size="9" fill="#333">Kerf (5–15 mm)</text>
</svg>
</div>

</details>

## Electron-beam (EB) cutting

A focused beam of high-energy electrons (150–200 kV) in a vacuum melts and vaporises the material. The beam is deflected by electromagnetic lenses.

Key parameters: beam current (mA), accelerating voltage (kV), scan speed (m/s), vacuum level (Pa).

<details><summary>Details</summary>

- **Kerf**: 0.1–0.5 mm, very straight edges, minimal HAZ (< 0.1 mm).
- **Thickness**: up to 50 mm steel in a single pass.
- **Limitation**: requires a vacuum chamber, so the part must fit inside. Used for aerospace (titanium, superalloys) and nuclear components where HAZ must be minimised.
- **Cost**: very high capital and operating cost; used only when laser cannot meet the HAZ or kerf requirement.

### EB column in vacuum

<div style="text-align:center; margin:1em 0;">
<svg width="320" height="260" viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
  <!-- Vacuum chamber -->
  <rect x="30" y="10" width="260" height="240" fill="#f0f4ff" stroke="#666" stroke-width="2" rx="8"/>
  <text x="160" y="25" text-anchor="middle" font-size="10" fill="#666">Vacuum chamber (&lt; 10⁻³ Pa)</text>
  <!-- Electron gun -->
  <rect x="145" y="35" width="30" height="25" fill="#444" stroke="#222" stroke-width="1"/>
  <text x="190" y="50" font-size="9" fill="#333">Electron gun</text>
  <!-- Focusing lens -->
  <ellipse cx="160" cy="80" rx="15" ry="8" fill="none" stroke="#336699" stroke-width="1.5"/>
  <text x="190" y="84" font-size="9" fill="#336699">EM lens</text>
  <!-- EB column -->
  <line x1="160" y1="60" x2="160" y2="150" stroke="#00ccff" stroke-width="2"/>
  <text x="175" y="110" font-size="9" fill="#0099cc">EB column</text>
  <text x="175" y="120" font-size="9" fill="#0099cc">(150–200 kV)</text>
  <!-- Workpiece -->
  <rect x="80" y="150" width="160" height="60" fill="#8899aa" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="225" text-anchor="middle" font-size="10" fill="#333">Workpiece</text>
  <!-- Vaporisation zone -->
  <ellipse cx="160" cy="153" rx="8" ry="4" fill="#ff6600" opacity="0.8"/>
  <!-- HAZ (very small) -->
  <ellipse cx="160" cy="155" rx="12" ry="5" fill="none" stroke="#cc6600" stroke-width="0.8" stroke-dasharray="2,2"/>
  <text x="195" y="160" font-size="8" fill="#cc6600">HAZ &lt; 0.1 mm</text>
  <!-- Vapor ejection -->
  <path d="M155,150 Q140,130 135,115 M165,150 Q180,130 185,115" stroke="#ff9900" stroke-width="1" fill="none" stroke-dasharray="3,2"/>
  <text x="100" y="115" font-size="8" fill="#ff9900">Vapour</text>
  <!-- Deflection coils -->
  <rect x="140" y="95" width="40" height="12" fill="none" stroke="#336699" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="190" y="105" font-size="8" fill="#336699">Deflection</text>
</svg>
</div>

The EB source is the same technology used in [Joining](../Joining.md) for electron-beam welding; cutting simply scans the beam along a contour.

</details>

## Decision heuristic

When selecting among the four thermal cutting processes, apply these rules in order:

1. **Material check.** If the material is non-ferrous (stainless, Al, Cu, Ti) or non-metallic, oxy-fuel is excluded. If the material is non-conductive, plasma is excluded. If the part must fit in a vacuum chamber and HAZ must be < 0.1 mm, EB is the only option.
2. **Thickness.** > 100 mm → oxy-fuel (only practical option). 25–100 mm → plasma (HD/UHD). < 25 mm → laser or plasma; < 15 mm → laser preferred for quality.
3. **Tolerance and edge quality.** ± 0.2 mm or Ra < 20 µm → laser or EB. ± 0.5 mm → HD/UHD plasma acceptable. ± 1 mm or looser → conventional plasma or oxy-fuel.
4. **Cost and volume.** Low volume / one-off → plasma or oxy-fuel (low capital). High volume with tight tolerances → laser (amortised over many parts). Aerospace / nuclear with HAZ-critical requirements → EB despite cost.

## Example problem

A fabrication shop needs to cut 12 mm carbon steel plate (S355) into 2 m × 1 m panels with a tolerance of ±0.5 mm and no further machining. The production rate is 200 panels per week. Which thermal process is most appropriate, and why?

<details><summary>Solution</summary>

1. **Oxy-fuel**: kerf 5–10 mm, HAZ 2–5 mm, edge Ra 50–100 µm. The ±0.5 mm tolerance is not achievable without secondary machining. **Rejected**.
2. **Plasma (conventional)**: kerf 2–4 mm, edge quality moderate. Tolerance ±0.5 mm is marginal. **Possible but not optimal**.
3. **Laser (fibre, 6 kW, O₂ assist)**: kerf 0.3–0.5 mm, HAZ 0.2 mm, edge Ra 10–20 µm. Tolerance ±0.2 mm easily achieved. Cut speed ~10 m/min for 12 mm S355. **Selected**.
4. **Electron beam**: overkill; requires vacuum, very high cost. **Rejected**.

The fibre laser at 6 kW with O₂ assist is the correct choice: it meets the tolerance, produces a clean edge requiring no secondary operation, and the throughput (200 panels × ~2 min cutting each ≈ 400 min ≈ 7 h of cutting per week) is well within a single machine's capacity.

</details>

<iframe src="./Thermal-cutting.simulation.html" title="Interactive comparison of the four thermal cutting processes"></iframe>

## Parent

This page is a class in the [Subtractive manufacturing](./Readme.md) topic.
4. **Electron beam**: overkill; requires vacuum, very high cost. **Rejected**.

The fibre laser at 6 kW with O₂ assist is the correct choice: it meets the tolerance, produces a clean edge requiring no secondary operation, and the throughput (200 panels × ~2 min cutting each ≈ 400 min ≈ 7 h of cutting per week) is well within a single machine's capacity.

</details>