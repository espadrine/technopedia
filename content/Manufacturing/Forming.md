# Forming

Forming shapes material by plastic deformation into a near-net shape without removing or adding material. It is relevant when a part's gross geometry can be achieved by bending, pressing, or stretching a stock piece, and when the resulting grain flow improves strength in the load-bearing directions.

> **Authoritative sources**
> - [ASM Handbook, Volume 14A: Metalworking — Bulk Forming](https://www.asminternational.org/)
> - [ASM Handbook, Volume 14B: Metalworking — Sheet Forming](https://www.asminternational.org/)
> - [ISO 6892-1:2019, Metallic materials — Tensile testing](https://www.iso.org/standard/72681.html)

## Utility

- Produces near-net-shape parts with minimal material waste.
- Grain flow follows the part geometry, improving fatigue and impact strength.
- High throughput for repetitive shapes (sheet metal, wire, tube).

**When NOT to use forming:**

- Geometry too complex for a single die (deep undercuts, internal features) → consider [Additive manufacturing](./Additive-manufacturing.md) or [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) for the internal features.
- Material too brittle (cast iron, ceramics, some titanium alloys) → forming causes cracking; use [Casting](./Casting.md) or [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) instead.
- Very small production runs where die/tooling cost dominates → [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) or [Additive manufacturing](./Additive-manufacturing.md) avoids the tooling cost.
- Very tight dimensional tolerances (±0.01 mm or better) that forming cannot achieve without a subsequent machining step → use forming for the gross shape, then finish with [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md).

**Scope note:** This page covers *part shaping*—converting standard stock (sheet, bar, billet) into a near-net part geometry. The upstream reduction of a melt to standard stock cross-section (slab → coil, billet → bar) is covered in [Materials processing](./Materials-processing.md).
<table>
<tr><th colspan="2">Forming branches</th></tr>
<tr><td><b>Sheet forming</b><br>Stock: sheet / strip (t &lt; 6 mm)<br>Operations: bending, deep drawing, stamping</td><td><b>Bulk forming</b><br>Stock: billet / bar / ingot<br>Operations: forging, extrusion, rolling, wire drawing</td></tr>
</table>
## Physics of plastic deformation

All forming operations are applications of the same underlying stress–strain behaviour. The key concepts from plasticity theory (see also [Continuum Mechanics](../Physics/Mechanics/Continuum-Mechanics.md) for the stress–strain tensor framework) are:

- **Yield criterion**: A material yields when the von Mises equivalent stress $`\sigma_{\text{vm}} = \sqrt{\tfrac{1}{2}\big[(\sigma_1-\sigma_2)^2+(\sigma_2-\sigma_3)^2+(\sigma_3-\sigma_1)^2\big]}` reaches the uniaxial yield strength $`\sigma_y`.
- **Strain hardening**: After yielding, the flow stress increases with plastic strain: $`\sigma_f = K\,\varepsilon_p^n` (Hollomon equation), where $`K` is the strength coefficient and $`n` the strain-hardening exponent.
- **Anisotropy**: Rolling and forging align grains, making properties direction-dependent. The plastic strain ratio (r-value) quantifies this for sheet.

Understanding these three effects lets you predict the force required, the thinning pattern, and the springback for any forming operation.

## Sheet forming

Sheet forming operates on thin stock (t < 6 mm) where the deformation is approximately plane-strain through the thickness. The dominant failure modes are tearing (tension) and wrinkling (compression).

### Bending

A sheet or strip is forced around a die to create a permanent angle.

**Key formulas:**

```math
\text{Bend allowance:} \quad BA = \frac{\pi}{180}\,(R + K\,t)\,\theta
```

where $`R` is the inside bend radius, $`K` the bend deduction factor (≈ 0.33–0.5 for most metals), $`t` the sheet thickness, and $`\theta` the bend angle in degrees.

```math
\text{Minimum bend radius:} \quad R_{\min} \approx f(\text{elongation},\;\text{grain direction})
```

<details><summary>Details</summary>

The key parameter is the **minimum bend radius**, which depends on the material's ductility (elongation) and the bend direction relative to the grain. For mild steel, a typical minimum inside radius is 1× the sheet thickness for a 90° bend; for aluminum, ≈ 1× t for soft tempers (e.g. 5052-H32) and up to 3–4× t for hard tempers (e.g. 6061-T6).

**Springback**: after the die is removed, the part elastically recovers by an angle $`\Delta\theta`. The die angle must be overbent to compensate. Springback is larger for high-yield-strength materials and for bends with a large radius-to-thickness ratio. The standard formula (per ASM Handbook Vol. 14B) is:

```math
\Delta\theta = \theta\,(1 - K), \quad K = 4x^3 - 3x + 1, \quad x = \frac{\sigma_y\, R}{E\, t}
```

where $`\theta` is the bend angle, $`E` is Young's modulus, $`\sigma_y` the yield strength, $`R` the inside bend radius, and $`t` the sheet thickness. For steel (σ_y ≈ 250 MPa, E ≈ 200 GPa, R = t, θ = 90°): x = 250/(200 000) = 0.00125, K ≈ 0.99625, so Δθ ≈ 90° × 0.00375 ≈ 0.34°.

The bend deduction factor K accounts for the neutral axis shifting toward the inside of the bend. For R/t < 1, K ≈ 0.33; for R/t > 3, K ≈ 0.5.

</details>

### Deep drawing

A flat blank is drawn into a die cavity to form a cup or box shape.

**Key formulas:**

```math
\text{LDR} = \frac{D_{\text{blank}}}{D_{\text{die}}}
```

```math
D_{\text{blank}} \approx \sqrt{D_{\text{die}}^2 + 4\,D_{\text{die}}\,h}
```

where $`h` is the cup depth. The LDR must stay below the material's limiting drawing ratio (LDR_max ≈ 2.0–2.5 for mild steel).

<details><summary>Details</summary>

The **limiting drawing ratio (LDR)** is the maximum blank-to-die diameter ratio before tearing. For mild steel, LDR ≈ 2.0–2.5. A draw bead and blank-holder force prevent wrinkling.

The **r-value** (plastic strain ratio) measures resistance to thinning: r > 1 means the material resists thinning in the width direction, which is desirable for deep drawing. High-r steels (HSLA) are used for automotive body panels.

The blank diameter is computed from area conservation (the sheet is incompressible in the plastic regime):

```math
\pi\,\frac{D_{\text{blank}}^2}{4} = \pi\,\frac{D_{\text{die}}^2}{4} + \pi\,D_{\text{die}}\,h
```

which simplifies to $`D_{\text{blank}} \approx \sqrt{D_{\text{die}}^2 + 4\,D_{\text{die}}\,h}`.

The interactive simulation below shows a cross-section of a deep-drawing operation: the blank is drawn into the die cavity while the blank-holder applies a clamping force to prevent wrinkling.

<iframe src="./Forming.simulation.html" title="Deep-drawing cup forming animation"></iframe>

</details>

### Stamping / press forming

A sheet blank is shaped by a punch and die in a single or multi-station press, producing complex 3-D shapes (automotive panels, appliance housings).

**Key formulas:**
```math
F_{\text{draw}} \approx \pi\, d_p\, t\, \sigma_f\, (DR - 0.7)
```

where $`d_p` is the punch (die) diameter, $`t` the sheet thickness, $`\sigma_f` the flow stress, and $`DR = D_{\text{blank}}/D_{\text{die}}` the drawing ratio (per ASM Handbook Vol. 14B / Groover).

<details><summary>Details</summary>

Stamping encompasses all sheet-forming operations performed in a press: air forming, coining, ironing, and multi-stage progressive die operations. It is the dominant process for automotive body-in-white (BIW) panels, where a single station may combine drawing, redrawing, and trimming.

The drawing force is determined by the flow stress, the punch perimeter, the sheet thickness, and the drawing ratio. For a 1.0 mm sheet of mild steel (σ_f ≈ 300 MPa) with a 150 mm punch diameter and DR = 1.77: F ≈ π × 0.150 × 0.001 × 300 × 10⁶ × (1.77 − 0.7) ≈ 151 kN.

Stamping is distinguished from deep drawing by the use of a full punch–die set (rather than a simple cup die) and by the ability to form complex 3-D surfaces in a single stroke. See [Continuum Mechanics](../Physics/Mechanics/Continuum-Mechanics.md) for the underlying stress analysis.

</details>

## Bulk forming

Bulk forming operates on thick stock (billet, bar, ingot) where the deformation is fully three-dimensional. The dominant concern is achieving full die fill and controlling grain flow.

### Forging

A billet or ingot is compressed between dies (open-die or closed-die) to produce a near-net-shape part.

**Key formulas:**

```math
F_{\text{forge}} \approx \sigma_{\text{flow}} \times A_{\text{contact}}
```

```math
\sigma_{\text{flow}} = K\,\varepsilon_p^n \quad \text{(Hollomon)}
```

<details><summary>Details</summary>

- **Open-die forging**: the billet is upset, spread, or drawn between flat or shaped dies. Used for large parts (crankshafts, turbine discs).
- **Closed-die (impression-die) forging**: the billet is forced into a die cavity. Flash is trimmed. Used for high-volume parts (connectors, gears, valve bodies).
- **Hot forging**: above recrystallization temperature; low force, full grain flow.
- **Warm forging**: between room temperature and recrystallization; better surface finish and dimensional accuracy than hot, lower force than cold.
- **Cold forging**: room temperature; very high strength (work hardening), excellent surface finish, but limited to small parts and ductile materials.

The key trade-off is part complexity versus die cost and material waste (flash). The forging force is the product of the flow stress (from the [Continuum Mechanics](../Physics/Mechanics/Continuum-Mechanics.md) stress–strain curve) and the contact area. For a 50 mm diameter billet of steel at 1000 °C (σ_flow ≈ 300 MPa), the force is ≈ 300 × 10⁶ × π × 0.025² ≈ 590 kN.

</details>

### Extrusion

A billet is forced through a die to produce a constant cross-section.

**Key formulas:**

```math
P_{\text{extrusion}} = \sigma_{\text{flow}} \times \ln\!\left(\frac{A_b}{A_p}\right)
```

where $`A_b` is the billet cross-sectional area and $`A_p` the product cross-sectional area. The ratio $`A_b/A_p` is the extrusion ratio (R).

<details><summary>Details</summary>

- **Forward extrusion**: the ram pushes the billet through the die. The billet sticks to the container wall, increasing friction.
- **Backward extrusion**: the ram pushes the billet into a hollow die; the part exits through the ram. Lower force, used for tubes and hollow parts.
- **Hydrostatic extrusion**: the billet is surrounded by pressurized fluid; very low friction, used for long extrusions of hard materials.

Extrusion is the primary route for aluminum profiles (window frames, heat sinks) and copper wire. The pressure formula above is the ideal (frictionless) case; in practice, a friction factor of 1.2–1.5 is applied. The upstream billet is produced by [Materials processing](./Materials-processing.md) (casting → homogenization → extrusion-ready billet).

</details>
### Wire drawing

A rod or wire is pulled through a die to reduce its cross-section, producing wire, rod, or tube with tight dimensional tolerances.

**Key formula:**

```math
F_{\text{draw}} \approx \sigma_{\text{flow}} \times A_p \times \ln\!\left(\frac{A_b}{A_p}\right)
```

where $`A_b` is the billet (input) cross-sectional area and $`A_p` the product (output) cross-sectional area. The force is applied in tension on the product side (pulling), distinguishing it from extrusion where the force is applied in compression on the billet side.

<details><summary>Details</summary>

- **Single-die drawing**: one die per pass; the wire is pulled through by a capstan or motor. Used for copper wire, steel wire, and aluminum rod.
- **Multi-die (block) drawing**: several dies in series reduce the cross-section in one pass; used for high-speed wire production.
- **Lubrication**: a soap or polymer lubricant is applied to reduce friction and die wear.
- **Reduction per pass**: typically 20–40 % area reduction per die; multiple passes are used for large total reductions.

Wire drawing is the primary route for electrical wire (copper, aluminum) and for precision steel wire (springs, fasteners). The upstream rod is produced by [Materials processing](./Materials-processing.md) (extrusion or rolling).

</details>

### Rolling

A stock piece is passed between rotating rolls to reduce thickness or produce a curved shape.

**Key formulas:**

```math
\text{Reduction per pass:} \quad \Delta h = h_{\text{in}} - h_{\text{out}}
```

```math
F_{\text{roll}} \approx \sigma_{\text{flow}} \times w \times \sqrt{R\,\Delta h}
```

where $`w` is the strip width, $`R` the roll radius, and $`\Delta h` the thickness reduction. The maximum reduction per pass is limited by the available roll force and the material's flow stress.

<details><summary>Details</summary>

- **Flat rolling** (upstream stock reduction): slab → hot-rolled coil → cold-rolled sheet. For the full upstream process, see [Materials processing](./Materials-processing.md).
- **Ring rolling**: a ring blank is rolled to reduce its diameter and increase its wall thickness. Used for large rings (flanges, turbine casings).
- **Profile rolling**: shaped rolls produce I-beams, rails, or other structural sections.

Rolling is the highest-throughput forming process: a modern hot-rolling mill can produce 50+ tonnes per hour. The stock entering the mill (slab, bloom) is produced by continuous casting in [Materials processing](./Materials-processing.md). The rolled sheet or bar is then the input to sheet forming or [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md).

</details>

## Example problem

An automotive body panel requires a deep-drawn cup with a 150 mm diameter and 80 mm depth from 1.0 mm sheet. Which material and process parameters should be selected?

<details><summary>Solution</summary>

1. **Blank diameter from area conservation**: The sheet is incompressible in the plastic regime, so the blank area equals the cup surface area (bottom + wall):

```math
D_{\text{blank}} \approx \sqrt{D_{\text{die}}^2 + 4\,D_{\text{die}}\,h} = \sqrt{150^2 + 4 \times 150 \times 80} = \sqrt{22500 + 48000} = \sqrt{70500} \approx 265\;\text{mm}
```

2. **Drawing ratio**: $`\text{LDR} = D_{\text{blank}}/D_{\text{die}} = 265/150 \approx 1.77`. This is within the typical LDR_max of 2.0–2.5 for mild steel, so a single-stage draw is feasible.

3. **Material**: Use a high-r-value steel (r ≈ 2.0) or aluminum 5182 (r ≈ 1.8) to resist thinning. The r-value ensures the material resists necking in the wall region.

4. **Process parameters**: Single-stage deep drawing with a draw bead and blank-holder force of ~50 kN. Die radius ≥ 3 mm (≥ 3×t) to avoid excessive strain concentration at the corner.

5. **Springback**: For a 90° flange with R = t, the springback is ≈ 0.34° (see the springback formula in the Bending section). Overbend the die angle by this amount to compensate.

</details>

## Parent

This page is a class in the [Manufacturing](./Readme.md) topic.