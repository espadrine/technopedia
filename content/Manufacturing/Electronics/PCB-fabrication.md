# PCB fabrication

PCB fabrication produces multi-layer printed circuit boards by laminating copper-clad prepreg, patterning copper, drilling vias, and applying a solder mask and silkscreen. It is relevant whenever a product requires a rigid or flexible substrate to route electrical signals between components.

> **Authoritative sources**
> - [IPC-2221B, Generic Standard on Printed Board Design](https://www.ipc.org/)
> - [IPC-6012F, Qualification and Performance Specification for Rigid Printed Boards](https://www.ipc.org/)
> - [IPC-4552B, Specification for Electroless Nickel Immersion Gold (ENIG) Surface Finish](https://www.ipc.org/)

## Utility

- Provides a rigid, multi-layer substrate for routing electrical signals.
- Supports surface-mount and through-hole component attachment.
- Enables high-density interconnect (HDI) designs with micro-vias and buried vias.

## Process flow

A typical multi-layer board follows this sequence: inner-layer imaging and etching → lamination → drilling → PTH plating → outer-layer imaging and etching → solder mask → surface finish → silkscreen → board outline/routing → electrical testing. Note that inner layers are etched *before* lamination (they are pre-patterned copper-clad laminates), while outer layers are etched *after* lamination (on the finished board).

## Key concepts

### Lamination

Copper-clad prepreg sheets (epoxy-glass or polyimide) are stacked with core boards and pressed under heat and pressure to form a multi-layer board.

<details><summary>Details</summary>

- **Core**: a solid dielectric (FR-4, polyimide) with copper on both sides. Provides mechanical rigidity.
- **Prepreg**: a dielectric with copper on one side, used to bond layers together.
- **Layer count**: 2, 4, 6, 8, 12, 16, or more. Each additional layer pair adds cost and complexity.
- **Cure**: the epoxy resin cures at 170–190 °C (up to 200 °C for high-Tg materials) under 200–400 psi pressure. The board is then trimmed to outline.

</details>

### Copper patterning

The copper layer is patterned to form traces and pads by etching or direct imaging.

<details><summary>Details</summary>

- **Subtractive (etching)**: a dry-film photoresist is exposed and developed to define the trace pattern. The exposed copper is etched away. Industrial etchants include H₂SO₄/H₂O₂, ammonium persulfate (APS), and cupric chloride; FeCl₃ is a small-scale/prototype alternative. See [Etching](./Etching.md) for the underlying chemistry. Minimum trace width ~50 µm (standard) or ~25 µm (HDI).
- **Additive (DAP / SAP)**: a thin seed layer (Cu, 0.5 µm) is deposited by [Deposition](./Deposition.md) (electroless or PVD). A photoresist is patterned, and copper is electroplated only on the exposed areas. The resist and seed are stripped. Enables finer traces and better aspect ratios.
- **Direct imaging (LDI)**: a laser directly images the photoresist, eliminating the need for a physical mask. Enables sub-25 µm features.

</details>

### Drilling and plating

Vias and through-holes are drilled and plated to connect layers.

<details><summary>Details</summary>

- **Mechanical drilling**: a carbide drill (0.15–3.0 mm) drills through-holes. Minimum hole size ~0.15 mm for standard drilling; ~0.05–0.1 mm for laser drilling.
- **Laser drilling**: a CO₂ or UV laser drills micro-vias (0.05–0.15 mm) for HDI designs. The laser can drill blind or buried vias that do not pass through the full board thickness.
- **Plating**: the drilled holes are plated with Cu (electroless seed + electroplating) to make them conductive. Minimum plating thickness 20 µm (IPC Class 2) / 25 µm (IPC Class 3).

</details>

### Solder mask and silkscreen

A protective polymer (solder mask) is applied to the board surface, leaving the pads exposed. A silkscreen (legend) is printed to label components.

<details><summary>Details</summary>

- **Solder mask**: a liquid or dry-film epoxy or polyimide, 20–30 µm thick (typical 20–25 µm). Prevents solder from bridging adjacent pads during reflow. Colors: green (most common), black, red, blue, white.
- **Silkscreen**: a UV-curable ink is screen-printed to label component references, polarity marks, and logos.
- **Surface finish**: the exposed pad surface is treated to prevent oxidation and ensure solderability. Options: HASL (hot air solder level), ENIG (electroless nickel immersion gold), OSP (organic solderability preservative); see [Surface finishing](../Surface-finishing.md).

</details>

### Impedance control

For high-speed and RF designs, the characteristic impedance of each trace must be held to a target value (commonly 50 Ω single-ended, 100 Ω differential) within ±10 %.

<details><summary>Details</summary>

- **Key parameters**: trace width, dielectric constant (Dk) of the prepreg/core, and layer spacing (distance to the reference plane). For a microstrip, the characteristic impedance is approximately:

```math
Z_0 \approx \frac{87}{\sqrt{\varepsilon_r + 1.41}} \ln\!\left(\frac{5.99\,h}{w} + 1\right)
```

where <i>h</i> is the dielectric thickness and <i>w</i> is the trace width.
- **Material choice**: low-Dk prepregs (e.g., Rogers RO4350B, Dk ≈ 3.66) are used for RF layers; standard FR-4 (Dk ≈ 4.3–4.5) is acceptable for digital signals up to several GHz.
- **Tolerance**: the fab must hold trace width and dielectric thickness to tight tolerances (±5 µm width, ±10 % Dk) to keep impedance within spec.

</details>

### Board outline and routing

The finished panel is cut into individual boards.

<details><summary>Details</summary>

- **V-score**: a V-shaped groove is scored on one or both sides; the board snaps apart along the score line. Fast and cheap, but limited to rectangular outlines.
- **Routing**: a CNC router with a small end-mill cuts the exact board outline. Supports arbitrary shapes, slots, and chamfers.
- **Laser cutting**: a CO₂ laser ablates the outline. Useful for thin or flexible boards where mechanical stress from routing would damage the board.
- **Panelization**: multiple boards are fabricated on a single panel (with tooling holes and fiducials) to improve throughput; the panel is de-panelized after all processing is complete.

</details>

### Inspection and testing

After fabrication, boards are inspected and electrically tested to ensure yield.

<details><summary>Details</summary>

- **AOI (Automated Optical Inspection)**: high-resolution cameras image both sides of the board to detect solder mask defects, missing silkscreen, copper shorts, and open traces.
- **X-ray inspection**: cross-section or 2-D X-ray images verify via plating thickness, barrel integrity, and buried-via fill. Critical for HDI and BGA substrates.
- **Electrical continuity testing**: a flying-probe or bed-of-nails tester checks every net for shorts and opens against the design database (IPC-6012 Class 2/3).
- **Impedance testing**: TDR measurements on controlled-impedance coupons verify that the stack-up produces the target impedance (see [Impedance control](#impedance-control)).
- **Cross-reference**: the general SPC and NDT principles behind these checks are covered in [Metrology and quality control](../Metrology-and-quality-control.md).

</details>

## Variants

### Rigid-flex PCBs

A combination of rigid and flexible layers in a single board.

<details><summary>Details</summary>

- **Flexible layer**: polyimide (Kapton) with copper, 0.05–0.1 mm thick. Can be bent repeatedly.
- **Rigid layer**: FR-4 or polyimide core, 0.2–1.6 mm thick.
- **Use**: smartphones, cameras, medical devices, aerospace (where space is constrained and the board must flex during assembly or operation).

</details>

## Example problem

A 5G base station requires a 16-layer PCB with 100 µm trace width, 100 µm spacing, and 0.1 mm micro-vias for the RF front-end. Which fabrication process is appropriate?

<details><summary>Solution</summary>

1. **Layer count**: 16 layers (8 signal layers, 4 ground/power planes, 2 mixed). FR-4 core with low-Dk prepreg for RF layers.
2. **Copper patterning**: Additive process (SAP) with LDI. The 100 µm trace width and 100 µm spacing require LDI for accuracy. The additive process avoids the etch-back that would widen the traces in a subtractive process.
3. **Vias**: 0.1 mm micro-vias drilled by UV laser. Blind vias connect adjacent layers; through-vias connect the outer layers to the inner planes.
4. **Plating**: Electroless Cu seed (0.5 µm) + electroplated Cu (25 µm minimum) in the vias.
5. **Solder mask**: Liquid photoimageable solder mask (LPI), 22 µm thick, with 100 µm exposure on the pads.
6. **Surface finish**: ENIG (electroless nickel 3–6 µm + immersion gold 0.05–0.1 µm) for the RF pads to ensure consistent impedance and solderability.
7. **Inspection**: AOI (automated optical inspection) for solder mask defects; X-ray for via plating; impedance test on coupon boards.

</details>

## Simulation

<iframe src="./PCB-fabrication.simulation.html" title="PCB layer stack-up visualization"></iframe>

## Parent

This page is a class in the [Electronics](./Readme.md) topic, which is a subtopic of [Manufacturing](../Readme.md).