# Chemical machining

Chemical machining (also called chemical milling or photochemical machining) removes material by chemical dissolution: a reagent (acid, base, or oxidising solution) selectively dissolves the exposed areas of a workpiece, while a resist (mask) protects the areas to be retained. No mechanical force, heat, or electricity is applied to the material. It is the only subtractive process that can produce micro-features on non-conductive or extremely thin, stress-sensitive substrates without introducing any mechanical or thermal damage.

For thin-film etching in semiconductor and MEMS fabrication (nm–µm scale, part of a multi-step lithography process), see [Etching](../Electronics/Etching.md). Chemical machining covers bulk material removal (µm–mm scale) as a standalone process.

> **Authoritative sources**
> - [K. Kumar, D. Zindani, J. P. Davim, 'Chemical Machining', in *Advanced Machining and Manufacturing Processes*, Springer, 2018](https://link.springer.com/chapter/10.1007/978-3-319-76075-9_7)
> - [Wikipedia: Photochemical machining](https://en.wikipedia.org/wiki/Photochemical_machining)

## Governing physics

The dissolution rate is governed by the reaction kinetics at the metal–reagent interface. For a first-order reaction:

```math
\dot{d} = k \cdot C_0 \cdot e^{-E_a / (R T)}
```

where $`\dot{d}` is the etch rate (mm/min), $`k` is the rate constant, $`C_0` is the reagent concentration, $`E_a` is the activation energy, $`R` is the gas constant, and $`T` is the absolute temperature. In practice, the etch rate is specified by the reagent manufacturer (e.g. 0.010–0.030 mm/min for FeCl₃ on copper at 40–50 °C, 30% solution).

<details><summary>Details</summary>

- **Selectivity**: the reagent must dissolve the workpiece material but not the resist. Common pairs: FeCl₃ / copper, H₂SO₄ / aluminium, NaOH / aluminium, HF / glass, aqua regia / gold.
- **Etch factor (EF)**: the ratio of vertical etch depth to lateral undercut. Because the reagent attacks the material laterally as well as vertically, the etched profile is trapezoidal. EF is typically 1:1 to 3:1 depending on material, etchant, and process parameters (e.g. FeCl₃ on copper achieves EF ≈ 2.5–3.2). A lower EF means more undercut relative to depth.
- **Mass-transfer limitation**: in practice the etch rate is often mass-transfer limited (diffusion of reagent to the surface and removal of dissolved products) rather than purely kinetics-limited. The Arrhenius equation above is a good first-order model, but the effective rate constant depends on flow conditions (spray pressure, agitation, concentration gradient).
- **Aspect ratio**: limited by the reagent's ability to penetrate and flush the feature. Typical maximum aspect ratio (depth : width) is 5:1 for open features; much lower for narrow slots.
- **Temperature control**: etch rate is strongly temperature-dependent. A ±1 °C variation can change the rate by 5–10%.

</details>

## Photochemical machining (PCM)

A photoresist is spin-coated on the workpiece, exposed through a photomask, and developed to define the pattern. The exposed (or unexposed, depending on resist type) areas are then etched.

Key parameters: resist thickness (µm), exposure energy (mJ/cm²), etch rate (mm/min), etch time (min), etch factor.

<details><summary>Details</summary>

- **Minimum feature size**: approximately equal to material thickness (limited by isotropic etching and undercut; minimum hole diameter ≈ 1.1–1.2× thickness).
- **Tolerance**: ±10% of material thickness (±2.5 µm on 0.025 mm foil, ±100 µm on 1 mm stock).
- **Surface finish**: Ra 0.1–1 µm (the etched surface is smooth; no tool marks).
- **Thickness range**: 0.013–2.0 mm (standard production 0.025–1.0 mm; extended capability to 2.0 mm).
- **Double-sided etching**: the standard approach for through-etching uses two registered phototools (top and bottom) and etchant sprays from both sides simultaneously. This halves the depth each etch front must travel and produces the characteristic hourglass profile with a cusp at mid-thickness. Where a square edge is functionally required (bearing surface, precision aperture), the feature must be dimensioned to the narrowest point or a secondary operation is needed.
- **Applications**: electronic enclosures, heat sinks, filters, stents, microfluidic channels, decorative parts, aerospace brackets (aluminium, stainless steel, titanium).

</details>

## Chemical milling (large-area)

A non-photochemical resist (rubber, plastic, or paint) is applied to protect the areas to be retained. The exposed areas are etched in a tank or by spray. Used for large, simple shapes (aircraft skins, sheet-metal brackets).

<details><summary>Details</summary>

- **Etch rate**: 0.01–0.1 mm/min (slower than PCM for thick sections).
- **Tolerance**: ±0.1–0.5 mm (limited by resist edge quality and etch uniformity).
- **Applications**: aircraft skin panels (aluminium), large stainless-steel brackets, decorative etching.

</details>

## Sacrificial layer removal

A chemical reaction dissolves a sacrificial layer without an external power source. Example: alkaline dissolution of aluminium in NaOH, used to remove aluminium sacrificial layers in composite layups.

<details><summary>Details</summary>

- **Aluminium in NaOH**: $`2\text{Al} + 2\text{NaOH} + 6\text{H}_2\text{O} \rightarrow 2\text{Na}[\text{Al}(\text{OH})_4] + 3\text{H}_2`. Rate: 0.1–1 mm/min depending on concentration and temperature.
- **Applications**: removing aluminium sacrificial layers in composite layups, cleaning, surface texturing.

</details>

## Safety and environment

Chemical machining uses hazardous reagents (HF, aqua regia, concentrated acids and bases). Operators require full PPE (acid-resistant gloves, face shield, apron), local exhaust ventilation, and spill containment. Spent etchant must be neutralised before disposal, and waste streams (heavy-metal sludge, fluoride-containing effluent) must be treated per local environmental regulations.

## History

PCM emerged in the 1960s as an offshoot of the printed circuit board industry, where the same photoresist + etchant chemistry was already in use. This historical connection explains why the process is mature and well-characterised: decades of PCB production refined the resist formulations, etchant recipes, and spray-etch equipment that PCM now relies on.

## Example problem

A medical device manufacturer needs to produce 10 000 titanium stent blanks per month. Each stent is a 0.05 mm thick Ti-6Al-4V tube (Ø 3.5 mm, 15 mm long) with a pattern of 200 rectangular windows (0.5 × 1.0 mm) arranged in a helical pattern. The tolerance on window dimensions is ±0.02 mm. Which chemical machining process is appropriate, and what are the key parameters?

<details><summary>Solution</summary>

1. **Process selection**: Photochemical machining (PCM). The features are small (0.5 mm), the material is thin (0.05 mm), and the tolerance is tight (±0.02 mm). Mechanical machining is impractical for 200 features on a 3.5 mm tube. EDM is too slow for 10 000 parts per month.
2. **Resist**: a positive photoresist (e.g. AZ 4620), 10 µm thick, spin-coated on the tube. The helical pattern is exposed through a cylindrical photomask.
3. **Etchant**: H₂O₂ / H₂SO₄ / HF mixture (or a proprietary Ti etchant). Etch rate: 0.01 mm/min.
4. **Etch time**: With double-sided etching (the standard approach for through-etching), each side etches 0.025 mm: 0.025 mm / 0.01 mm/min = 2.5 min. (Single-sided would require 5 min.)
5. **Undercut**: ~0.02 mm per side (EF ≈ 2.5). The 0.5 mm window becomes 0.54 mm after etch. The photomask is designed 0.04 mm smaller to compensate.
6. **Tolerance**: ±0.02 mm is achievable with controlled etch time (±0.1 min) and uniform reagent flow.
7. **Throughput**: 10 000 parts × 2.5 min etch = 25 000 min ≈ 417 h. With 4 etch tanks running in parallel, this is ~104 h ≈ 13 shifts per month. Feasible with 2 machines.

</details>

<iframe src="./Chemical-machining.simulation.html" title="Cross-section of the chemical etching process showing undercut, etch factor, and double-sided etch profile"></iframe>

## Parent

This page is a class in the [Subtractive manufacturing](./Readme.md) topic, which is a subtopic of [Manufacturing](../Readme.md).