# Interconnect and packaging

Interconnect and packaging connects dies, chips, and boards into a functional module using wire bonding, flip-chip, through-silicon vias (TSVs), and advanced packaging substrates. It is relevant whenever a die must be connected to a PCB, to other dies, or to a system-level package.

> **Authoritative sources**
> - [JEDEC JEP95 — Registered and Standard Outlines for Solid State Products (package outlines and registrations)](https://www.jedec.org/standards-documents/docs/jep95)
> - [JEDEC DG-414 — Design Requirements, Ball Grid Array Package (BGA)](https://www.jedec.org/standards-documents/docs/dg-414h)
> - [IPC-7095E — Design and Assembly Process Guidance for Ball Grid Arrays (BGAs)](https://www.electronics.org/TOC/IPC-7095E_toc.pdf)
> - [TSMC CoWoS — Chip-on-Wafer-on-Substrate (advanced packaging)](https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm)

## Utility

- Connects the die's bond pads to the external world (PCB pins, sockets, or other dies).
- Manages thermal flow: the package is the primary heat path from the die to the ambient.
- Enables multi-chip modules (MCMs) and chiplet architectures that combine dies of different functions and process nodes.

## Package process flow

Every packaged chip, from a small-outline transistor to a 2.5D GPU module, goes through the same ordered sequence of steps: attach the die, form the interconnects, protect the assembly, separate the units, and test.

<svg viewBox="0 0 760 110" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;background:#1a1a2e;border-radius:6px">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#88f"/></marker>
  </defs>
  <g font-family="system-ui" font-size="12" fill="#eee" text-anchor="middle">
    <rect x="10" y="30" width="105" height="40" rx="6" fill="#2a2a4a" stroke="#55a"/><text x="62" y="48">Die attach</text><text x="62" y="63" font-size="10" fill="#aaa">mechanical</text>
    <rect x="135" y="30" width="120" height="40" rx="6" fill="#2a2a4a" stroke="#55a"/><text x="195" y="48">Interconnect</text><text x="195" y="63" font-size="10" fill="#aaa">wire / flip-chip</text>
    <rect x="275" y="30" width="100" height="40" rx="6" fill="#2a2a4a" stroke="#55a"/><text x="325" y="48">Underfill</text><text x="325" y="63" font-size="10" fill="#aaa">flip-chip only</text>
    <rect x="395" y="30" width="110" height="40" rx="6" fill="#2a2a4a" stroke="#55a"/><text x="450" y="48">Molding / lid</text><text x="450" y="63" font-size="10" fill="#aaa">encapsulation</text>
    <rect x="525" y="30" width="105" height="40" rx="6" fill="#2a2a4a" stroke="#55a"/><text x="577" y="48">Singulation</text><text x="577" y="63" font-size="10" fill="#aaa">dice the strip</text>
    <rect x="650" y="30" width="100" height="40" rx="6" fill="#2a2a4a" stroke="#55a"/><text x="700" y="48">Final test</text><text x="700" y="63" font-size="10" fill="#aaa">burn-in, grade</text>
    <line x1="115" y1="50" x2="133" y2="50" stroke="#88f" stroke-width="2" marker-end="url(#arr)"/>
    <line x1="255" y1="50" x2="273" y2="50" stroke="#88f" stroke-width="2" marker-end="url(#arr)"/>
    <line x1="375" y1="50" x2="393" y2="50" stroke="#88f" stroke-width="2" marker-end="url(#arr)"/>
    <line x1="505" y1="50" x2="523" y2="50" stroke="#88f" stroke-width="2" marker-end="url(#arr)"/>
    <line x1="630" y1="50" x2="648" y2="50" stroke="#88f" stroke-width="2" marker-end="url(#arr)"/>
  </g>
</svg>

<details><summary>Details</summary>

Packaging is a *sequential* process: each step prepares the geometry the next step needs. The die cannot be wire-bonded before it is fixed to the die pad; it cannot be molded before the wires exist, or the wires would be frozen in place and untestable; it cannot be tested before singulation because dies on the wafer share common test resources only at wafer level.

The steps, in order:

1. **Die attach** — the back of the die is fixed to the die pad or substrate (see [Die attach](#die-attach) below).
2. **Interconnect** — the die pads are connected to the package: wire bonding or flip-chip (C4) bonding.
3. **Underfill** — for flip-chip only, an epoxy is wicked under the die to couple it mechanically to the substrate.
4. **Molding / encapsulation** — the die and wires are buried in epoxy molding compound, or a metal/ceramic lid is sealed over them.
5. **Singulation** — packages are processed many-at-a-time on a lead frame or reconstituted wafer; a saw or punch separates them.
6. **Final test** — electrical test, burn-in, and speed binning; the package is now a shippable unit.

**Worked example — a 7 × 7 mm QFP microcontroller.** The die is glued with silver-filled epoxy to the copper die pad of a 208-lead frame (step 1). A wire bonder connects 208 die pads to the 208 leads with 25 µm Au wire (step 2, about 2 s per die on a modern bonder). No underfill is used for wire-bonded packages (step 3 skipped). The lead frame strip passes through a transfer-molding press that fills an epoxy cavity around each die (step 4). The strip is sawn into individual packages (step 5), which then go through a 125 °C burn-in for 48 h and an ATE test that sorts them by maximum clock frequency (step 6).

For the advanced-packaging variant of this flow (interposer, chiplets), see [Advanced packaging](#advanced-packaging-chiplets-cowos-fcbga) below; the same six steps apply, with the interposer itself first "die-attached" to the substrate.

Authoritative sources: the JEDEC [JEP95](https://www.jedec.org/standards-documents/docs/jep95) registrations define the standard package outlines that this flow produces.

<details><summary>Example problem</summary>

A flip-chip BGA package skips one of the six steps that a wire-bonded package uses. Which step, and why is it safe to skip?

<details><summary>Solution</summary>

The **underfill** step is skipped for wire-bonded packages. Underfill exists to mechanically couple a flipped die to the substrate so that the thermal-expansion mismatch between silicon and the organic substrate does not fatigue the solder bumps. In a wire-bonded package the die is already glued to the pad (die attach) and the wires are compliant — they flex rather than carry load — so there is no rigid solder joint array to protect.

</details>
</details>

</details>

## Wire bonding

A thin metal wire (18–50 µm diameter; Au, Cu, Al) is ultrasonically bonded between the die's bond pads and the package's lead frame or substrate.

<iframe src="./Interconnect-and-packaging.wire-bond.simulation.html" title="Wire bonding: capillary forms a ball bond, pulls a loop, and places a stitch bond"></iframe>

<details><summary>Details</summary>

Wire bonding is the oldest and still the highest-volume die-to-package interconnect method. A capillary tool threads a wire, melts its tip into a ball (by electric flame-off spark), presses the ball onto the die pad with ultrasonic vibration and force (the **ball bond**), then pulls the wire through a loop profile and presses the wire flat onto the second pad (the **stitch bond**). The wire is then torn off and the cycle repeats at 10–20 bonds per second.

- **Ball bond**: the first bond of each wire; the ball is roughly 2–3× the wire diameter, which is why the ball bond sets the minimum pad pitch.
- **Stitch bond**: the second, ball-less bond of the same wire — simply the flat continuation of the wire where it terminates on the lead. A wire always makes one ball bond and one or more stitch bonds; "stitch bonding" is not a separate high-density technology, it is just the tail end of every wire.
- **Bond pitch**: the center-to-center distance between pads. Minimum ~80 µm for Au ball bonding; ~50 µm for Cu (Cu allows smaller balls and finer pitch, but needs an inert atmosphere because Cu oxidizes).
- **Limitation**: each wire is a series inductance of roughly 1–2 nH/mm, which limits signal speed; and the loop geometry means wires cannot be packed at flip-chip densities.

**Worked example — bonding a 64-pad die.** A die has 64 pads at 90 µm pitch along one edge. The bonder forms a ball on pad 1, loops over the ~1.5 mm gap to the lead frame, places a stitch bond, tears, and moves to pad 2. At 15 bonds/s the whole die takes 64/15 ≈ 4.3 s. The 2 mm long wires contribute ~2–4 nH each — negligible for a 32 kHz watchdog timer, unacceptable for a 10 Gb/s serializer, which is why high-speed I/O moved to flip-chip.

Authoritative sources: package outlines for wire-bonded families are registered in [JEDEC JEP95](https://www.jedec.org/standards-documents/docs/jep95).

<details><summary>Example problem</summary>

A lead frame provides 1.2 mm of loop height between die surface and lead tips. Estimate the minimum die-pad pitch if the ball diameter is 3× the wire diameter and the pad must be at least 1.5× the ball diameter wide.

<details><summary>Solution</summary>

For 25 µm Au wire: ball diameter ≈ 3 × 25 = 75 µm. Pad width ≥ 1.5 × 75 ≈ 112 µm, so the pad pitch must be at least ~112 µm — consistent with the ~80–100 µm practical minimum for Au ball bonding (the pad can slightly overlap the ball). The loop height does not set the pitch; it sets the wire length and therefore the inductance (~1–2 nH/mm × ~2 mm ≈ 2–4 nH).

</details>
</details>

</details>

## Solder and reflow (C4 bumps and BGA balls)

Solder (Sn-Ag-Cu, Pb-free) forms the electrical and mechanical joints for C4 bumps and BGA balls. Soldering fundamentals — wetting, flux, capillary flow — are shared with macro-scale joining; see the [Brazing and soldering](../Joining.md) section of [Joining](../Joining.md).

<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;background:#1a1a2e;border-radius:6px">
  <g font-family="system-ui" font-size="11" fill="#eee">
    <polyline points="40,200 120,200 170,150 230,150 300,60 360,60 420,150 500,150 560,200 720,200" fill="none" stroke="#e74c3c" stroke-width="2.5"/>
    <line x1="40" y1="200" x2="720" y2="200" stroke="#555"/>
    <line x1="40" y1="200" x2="40" y2="30" stroke="#555"/>
    <text x="725" y="124" fill="#88f">liquidus 217 °C (SAC305)</text>
    <text x="300" y="45" fill="#eee" text-anchor="middle">peak 245–260 °C</text>
    <text x="60" y="215" fill="#aaa">ramp</text>
    <text x="165" y="215" fill="#aaa">soak 150–180 °C</text>
    <text x="470" y="215" fill="#aaa">cool-down</text>
    <text x="700" y="215" fill="#aaa">t</text>
  </g>
</svg>

<details><summary>Details</summary>

Solder is a low-melting alloy that wets clean metal surfaces and freezes into a joint that is both electrical and mechanical. In electronics the workhorse is **SAC305** (Sn-96.5/Ag-3.0/Cu-0.5), liquidus 217 °C. The joint is made in a **reflow oven**: the assembly is heated on a controlled profile — ramp to 150–180 °C (solvent evaporation, flux activation), a soak that lets the whole board equalize, a short peak of 245–260 °C that melts the solder for 30–90 s, and a controlled cool-down that freezes the joint as fine, fatigue-resistant grains.

Two joint families on this page use exactly this physics at different scales:

- **C4 bumps**: solder preforms (75–200 µm diameter) are placed on the die pads and substrate pads, then reflowed; surface tension self-aligns the die to within a few µm (see [Flip-chip (C4) bonding](#flip-chip-c4-bonding)).
- **BGA balls**: solder spheres (0.3–1.0 mm) on the substrate bottom attach the package to the PCB — the same reflow, one level up.

**Worked example — reflowing a BGA package onto a PCB.** A 35 mm FCBGA with 4000 balls enters the oven. During soak the large package lags the small resistors around it by tens of degrees; the 60–90 s soak lets it catch up so that every ball reaches liquidus during the peak. Peak is set to 250 °C: 33 K above liquidus (enough to wet and collapse the balls) but below the 260 °C limit that moisture-sensitive package mold compound can tolerate. After cooling, the collapsed balls are ~0.4 mm tall and hold the package 0.4 mm above the board.

- **Reliability**: thermal cycling makes the PCB (CTE ~17 ppm/K) and package (CTE ~7–15 ppm/K) expand differently, fatiguing the solder joints. Joint life is predicted by Coffin-Manson or Darveaux models.
- The board itself — laminating, patterning, drilling — is covered in [PCB fabrication](./PCB-fabrication.md); mounting components onto that finished board is the reflow process described here.

<details><summary>Example problem</summary>

Why must the reflow peak stay below ~260 °C even though a higher peak would wet the pads better?

<details><summary>Solution</summary>

The peak is a compromise. It must exceed the SAC305 liquidus (217 °C) by 30–40 K so the solder is fluid enough to wet, collapse, and self-align — but the package has already been through moisture absorption and preconditioning, and above ~260 °C the epoxy molding compound and die-attach adhesives delaminate (popcorning), and copper pad dissolution and intermetallic growth accelerate. Hence the 245–260 °C window: hot enough to form the joint, cool enough to leave the package intact.

</details>
</details>

</details>

## Flip-chip (C4) bonding

The die is flipped face-down and its solder bumps (C4, 75–200 µm diameter, 130–300 µm pitch) are reflowed onto the substrate's corresponding pads; the finer micro-bump variant (25–55 µm pitch) is used for die-to-die and die-to-interposer connections.

<iframe src="./Interconnect-and-packaging.flip-chip.simulation.html" title="Flip-chip bonding: bump pitch sets I/O count; reflow collapses and self-aligns the die"></iframe>

<details><summary>Details</summary>

In flip-chip, all pads connect *at once* during one reflow, instead of one-at-a-time as in wire bonding. The die is picked up, flux-dipped or flux-printed, placed bump-down on the substrate with a few µm of accuracy, and heated. As the solder melts, the surface tension of each molten blob pulls the die into alignment — this **self-alignment** is the key physics: the die corrects placement errors of up to ~50% of the bump diameter for free. The joint solidifies as a slightly squashed sphere whose height is set by the bump volume and the die weight.

- **Bond pitch**: 130–300 µm for C4 bumps; 25–55 µm for micro-bumps (used between dies stacked with TSVs, and on silicon interposers).
- **Advantage**: the interconnect is the bump itself — under 100 µm long, versus millimeters of wire — so inductance drops by an order of magnitude and I/O density rises by two orders of magnitude.
- **Underfill**: silicon (CTE 2.6 ppm/K) and organic substrate (CTE ~15 ppm/K) expand at different rates; the rigid bumps would shear-fatigue. A capillary-flow epoxy wicks under the die and couples them mechanically, spreading the strain.
- **Use**: mobile SoCs, GPUs, FPGAs — any die with more I/O than wire pitch allows.

**Worked example — bonding a 1000-bump die.** A 10 × 10 mm die has 1000 signal/power pads at a 150 µm C4 pitch. The bonder dispenses flux, places the die (accuracy ±10 µm — the reflow self-alignment absorbs it), and the substrate carrier passes through a reflow profile peaking at 245–260 °C. The bumps collapse from ~100 µm spheres to ~60 µm tall joints. Capillary underfill is dispensed along two edges, wicks across the 60 µm gap in ~30 s, and cures at 150 °C. The die is now electrically connected at 1000 I/O with a total interconnect inductance of ~0.05 nH per bump — versus ~2 nH per wire bond.

Authoritative sources: [IPC-7095E](https://www.electronics.org/TOC/IPC-7095E_toc.pdf) (BGA and flip-chip design and assembly); [JEDEC DG-414](https://www.jedec.org/standards-documents/docs/dg-414h) (BGA package design requirements).

<details><summary>Example problem</summary>

Estimate the number of C4 bumps that fit under a 10 × 10 mm die at 150 µm pitch, assuming a perimeter-free full-area array with 20% of the area lost to power-delivery routing keep-outs.

<details><summary>Solution</summary>

At 150 µm pitch, one row holds 10 mm / 0.15 mm ≈ 66 bumps, so a full array holds 66 × 66 ≈ 4350. With 20% of positions unusable: 4350 × 0.8 ≈ **3500 bumps**. This is ~50× what wire bonding could deliver on the same die (a wire-bonded die is limited to pads along its edges at ~80 µm pitch: 2 × (4 × 125) = 1000 pads at best, and usually far fewer).

</details>
</details>

</details>

## Die attach

Die attach fixes the back of the die to the die pad or substrate; it carries the die's mechanical load and part of its heat path, while the front-side interconnect (wire or bump) carries only the signals.

<details><summary>Details</summary>

The interconnect technologies above are too thin or too compliant to hold the die against shock, vibration, and shear — so the die is attached separately, from the back. Three attachment materials dominate:

- **Silver-filled epoxy adhesive**: the default for plastic packages. An epoxy loaded 70–85% with Ag flakes: electrically and thermally conductive, cured at 150–175 °C, bond line 20–50 µm. Cheap, low temperature, but softens near 150–200 °C.
- **Solder die attach (eutectic)**: a solder layer (e.g., AuSn at 280 °C, or PbSn) melts and wets the die's backside metallization. Used for power devices and high-reliability packages because the joint conducts heat far better and survives higher junction temperatures.
- **Anisotropic conductive film (ACF)**: a film full of Ni/Au spheres that conducts *vertically only* — the spheres are trapped and deformed between opposing pads, and insulate laterally. Used when the die has fine-pitch pads on the attachment plane itself (display driver ICs bonded to glass, camera modules).

**Worked example — power MOSFET in a D²PAK.** The die dissipates 30 W. A silver-filled epoxy bond line of 40 µm at ~7 W/(m·K) over a 10 mm² die would add R = t/(kA) = 40 µm / (10 mm² × 7 W/(m·K)) ≈ 0.08 K/W — acceptable. But at 200 °C junction temperature the epoxy approaches its glass transition, so a solder die attach (AuSn, k ≈ 57 W/(m·K)) is chosen instead, cutting the bond-line resistance to ~0.01 K/W and surviving the temperature.

Authoritative sources: package outlines and die-pad dimensions for attached-die packages are registered in [JEDEC JEP95](https://www.jedec.org/standards-documents/docs/jep95).

<details><summary>Example problem</summary>

A 5 × 5 mm die dissipating 20 W sits on a 40 µm silver-epoxy bond line (k = 7 W/(m·K)). What temperature drop does the bond line itself contribute?

<details><summary>Solution</summary>

R = t/(kA) = 40×10⁻⁶ m / (7 W/(m·K) × 25×10⁻⁶ m²) ≈ 0.23 K/W. At 20 W, the bond line drops ΔT = P·R = 20 × 0.23 ≈ 4.6 K. Small but not negligible — which is why high-power dies use solder die attach (k ≈ 57 W/(m·K)), cutting this to ~0.6 K.

</details>
</details>

</details>

## Molding and encapsulation

Molding buries the die and interconnects in a solid protective body — an epoxy molding compound for plastic packages, or a sealed metal/ceramic lid for high-power and hermetic packages.

<details><summary>Details</summary>

Bare silicon with 25 µm wires cannot survive handling, moisture, or alpha particles. Encapsulation gives the package its mechanical body, blocks moisture and ionic contamination, and (for opaque compounds) blocks light that would photogenerate carriers in the die.

- **Transfer molding**: the dominant process. A pellet of **epoxy molding compound (EMC)** — fused silica filler (~70–85%) in epoxy resin — is heated to ~175 °C, becomes viscous, and is pressed (transferred) into a mold cavity around the lead-frame strip with dies and wires already inside. The filler lowers the CTE to match silicon and copper and slows moisture uptake. Hundreds of packages are molded per press cycle.
- **Lids and heat spreaders**: power packages (CPUs, FPGAs) get a metal **integrated heat spreader (IHS)** — a Cu or Al cap attached to the package substrate with solder or adhesive, with a thermal interface material between lid and die top. The IHS is a package lid, not a bond to the die itself; it spreads the die's heat flux over a flat, large area for the heat sink. Hermetic packages (ceramic, metal-can) use a welded or brazed lid for military/aerospace-grade moisture exclusion.
- **Moisture sensitivity**: EMC absorbs water; at reflow the trapped moisture flashes to vapor and delaminates the compound ("popcorning"). Packages are rated MSL 1–6 by JEDEC J-STD-020 and must be baked before reflow if floor-life is exceeded.

**Worked example — molding a QFP strip.** A 208-lead QFP strip of 50 units is loaded into a mold. Two EMC pellets of ~5 g each are preheated to 80 °C, transferred at 70 kg/cm² into the cavities at 175 °C, and cured in-mold for 90 s, then post-cured 4 h at 175 °C. The silica filler brings the compound CTE to ~10 ppm/K, between Si (2.6) and Cu (17), so the encapsulated wires are not over-stressed during temperature cycling.

Authoritative sources: [JEDEC JEP95](https://www.jedec.org/standards-documents/docs/jep95) defines the molded package outlines; moisture-sensitivity classification is JEDEC J-STD-020.

<details><summary>Example problem</summary>

Why is the molding compound loaded with ~80% fused-silica filler instead of being pure epoxy?

<details><summary>Solution</summary>

Pure epoxy has a CTE of 50–80 ppm/K and a thermal conductivity of ~0.2 W/(m·K). The silicon die (2.6 ppm/K) and copper leads (17 ppm/K) would shear-stress the wires and die attach on every temperature cycle, and the die's heat would be trapped. Fused silica (CTE ~0.5 ppm/K, k ≈ 1.4 W/(m·K)) at 70–85% loading pulls the compound's CTE down to ~8–12 ppm/K — between die and leads — and raises conductivity several-fold, while also cutting cost and moisture uptake.

</details>
</details>

</details>

## Through-silicon vias (TSVs)

Vertical electrical connections that pass through the silicon die, enabling 3D stacking of dies.

<iframe src="./Interconnect-and-packaging.tsv.simulation.html" title="3D die stack: TSVs carry signals vertically through thinned dies joined by micro-bumps"></iframe>

<details><summary>Details</summary>

A TSV is a copper-filled hole drilled through the silicon, so a signal can enter the *top* of a die and leave its *bottom* — the prerequisite for stacking dies vertically. The stack is built by bonding die-on-die (or wafer-on-wafer) with micro-bumps, so the TSVs of all dies line up into a vertical signal path.

- **Diameter**: 2–10 µm; depth: 30–100 µm (the thinned die thickness).
- **Fabrication**: [Etching](./Etching.md) (DRIE / Bosch process) drills the via; [Deposition](./Deposition.md) (PVD or electroplating) fills it with Cu; the top and bottom surfaces are planarized by [Surface finishing](../Surface-finishing.md).
- **Use**: 3D DRAM (HBM), logic-DRAM stacks, power management ICs.
- **Challenge**: TSVs consume die area; the aspect ratio limits the minimum diameter.

**Worked example — an HBM stack.** An HBM3E stack has 8 DRAM dies (each ~45 µm after thinning) plus 4 base-die TSV layers, for ~500 µm total. Each DRAM die carries ~1000 TSVs at 2–5 µm diameter. The TSVs are drilled *before* thinning (via-middle process), filled by electroplating, and the wafer is then ground from 775 µm to ~45 µm — thin enough that the TSV bottoms are exposed for micro-bump bonding. The stack's vertical interconnect length is ~500 µm total, versus ~5 mm if the same dies were wired side-by-side.

Authoritative sources: [TSMC CoWoS / 3DFabric](https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm) covers interposer and stacking technology; [IPC-7095E](https://www.electronics.org/TOC/IPC-7095E_toc.pdf) covers assembly reliability.

<details><summary>Example problem</summary>

A DRAM die is thinned to 50 µm and its TSVs are 5 µm diameter, 50 µm deep. What aspect ratio must the etch achieve, and why does this constrain the minimum diameter?

<details><summary>Solution</summary>

Aspect ratio = depth / diameter = 50/5 = **10:1**. DRIE practically achieves 10–20:1; below ~5 µm diameter the same 50 µm depth needs >10:1, and the etch can no longer keep the hole vertical and the Cu fill void-free — so the die thickness sets the minimum TSV diameter, not lithography.

</details>
</details>

</details>

## Advanced packaging (chiplets, CoWoS, FCBGA)

Multiple dies (chiplets) are assembled on a large organic or silicon interposer to form a single package.

<iframe src="./Interconnect-and-packaging.simulation.html" title="CoWoS cross-section: logic die and HBM stacks on a silicon interposer over an organic FCBGA substrate — hover the layers"></iframe>

<details><summary>Details</summary>

When one reticle-sized die becomes too large to yield economically, or when logic and memory want different process nodes, the monolithic die is split into **chiplets** assembled side-by-side (2.5D) or stacked (3D) inside one package. The interposer is the piece of substrate that carries the fine-pitch die-to-die routing that an organic package substrate cannot.

- **Organic interposer**: a multi-layer PCB-like substrate with fine-pitch routing. Used for FCBGA (flip-chip ball grid array) packages.
- **Silicon interposer**: a thin Si wafer with TSVs and fine-pitch routing. Used for CoWoS (Chip-on-Wafer-on-Substrate) packages (e.g., NVIDIA, AMD GPUs).
- **Chiplet architecture**: a large die is split into smaller dies (chiplets) of different functions and process nodes, then assembled on an interposer. Reduces cost and yield loss.
- **2.5D vs 3D**: 2.5D places dies side-by-side on an interposer; 3D stacks dies vertically with TSVs.
- **Hybrid bonding**: Cu–Cu direct bonding with dielectric adhesion; the successor to micro-bumps for sub-10 µm pitch die-to-die interconnect (HBM4, logic-logic stacks).

**Worked example — routing budget on an interposer.** A logic die and an HBM stack sit 5 mm apart on a silicon interposer. The die-to-die interface needs 1024 signals at 32 Gb/s. At a 55 µm micro-bump pitch with 2:1 signal-to-power, the interface edge needs 1024 × 2 × 55 µm ≈ 113 µm of bump-row width — trivially routable in the interposer's 3–4 metal layers at 0.4 µm lines. The same 1024 links over wire bonds would need ~1024 × 80 µm ≈ 8 cm of die edge — impossible. The interposer is what makes chiplet bandwidth affordable.

Authoritative sources: [TSMC CoWoS](https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm) (silicon interposer technology); [JEDEC DG-414](https://www.jedec.org/standards-documents/docs/dg-414h) (BGA package design requirements).

<details><summary>Example problem</summary>

A chiplet design must move 2 Tb/s between a logic chiplet and a cache chiplet 4 mm apart. If each link runs at 16 Gb/s and the micro-bump pitch is 40 µm with a 1:1 signal-to-power ratio, how wide must the bump interface be?

<details><summary>Solution</summary>

Links needed: 2 Tb/s ÷ 16 Gb/s = 125 signal bumps; with 1:1 signal-to-power, 250 bumps total. At 40 µm pitch, one row of 250 bumps spans 250 × 40 µm = 10 mm. The chiplet edge is ~10 mm wide, so a **single row** suffices — or, more realistically, a few rows for redundancy and power. This is exactly why chiplet interfaces (UCIe, BoW) are specified at tens of µm pitch: the bump field, not the interposer wires, is the constraint.

</details>
</details>

</details>

## Thermal management

The package is the primary thermal path from the die to the ambient; its thermal resistance stack decides the die's junction temperature at a given power.

<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;background:#1a1a2e;border-radius:6px">
  <g font-family="system-ui" font-size="11" fill="#eee">
    <rect x="60" y="120" width="180" height="30" fill="#4a90d9"/><text x="150" y="140" text-anchor="middle">Die (junction)</text>
    <rect x="60" y="100" width="180" height="14" fill="#e67e22"/><text x="150" y="95" text-anchor="middle" fill="#e67e22">TIM1 (paste, 3–15 W/(m·K))</text>
    <rect x="60" y="60" width="180" height="34" fill="#95a5a6"/><text x="150" y="82" text-anchor="middle">IHS (Cu lid)</text>
    <rect x="60" y="46" width="180" height="10" fill="#e67e22"/><text x="150" y="42" text-anchor="middle" fill="#e67e22">TIM2</text>
    <rect x="60" y="16" width="180" height="26" fill="#6ab04c"/><text x="150" y="34" text-anchor="middle">Heat sink + airflow</text>
    <text x="300" y="30" fill="#aaa">Heat flows up: junction → TIM → lid → TIM → sink → ambient</text>
    <text x="300" y="55" fill="#aaa">Each layer adds R = t / (k·A) in series:</text>
    <text x="300" y="80" fill="#eee">R(junction→ambient) = R(die) + R(TIM1) + R(IHS) + R(TIM2) + R(sink)</text>
    <text x="300" y="105" fill="#eee">T(junction) = T(ambient) + P × R(total)</text>
    <text x="300" y="140" fill="#aaa">Example: P = 200 W, R(total) = 0.35 K/W</text>
    <text x="300" y="160" fill="#eee">→ T(junction) = 25 °C + 200 × 0.35 = 95 °C</text>
  </g>
</svg>

<details><summary>Details</summary>

Heat conduction follows Fourier's law: heat flows from hot to cold in proportion to the temperature gradient, and each material layer in the path adds a thermal resistance R = t/(kA) (thickness over conductivity times area). The fundamentals — thermal resistance, conduction, and the heat equation — are developed in [Thermodynamics](../../Physics/Thermodynamics/Readme.md); packaging applies them in a fixed, layered geometry.

The die's heat leaves through a series chain of layers, and the *worst* layer (lowest k·A) dominates:

- **Thermal interface material (TIM)**: a high-conductivity paste or pad between the die (or IHS) and the heat sink. Typical thermal conductivity: 3–15 W/(m·K) for pastes, 5–20 W/(m·K) for pads. TIMs exist because mating surfaces touch at only ~1% of their nominal area (roughness); the TIM fills the remaining 99% of air (k = 0.026 W/(m·K)), which would otherwise dominate the stack.
- **Integrated heat spreader (IHS)**: a metal cap (Cu or Al) attached to the package substrate, with a TIM between the lid and the die top; it provides a flat, uniform surface for the heat sink and protects the die.
- **Thermal vias**: TSVs or substrate vias filled with Cu to conduct heat laterally or vertically through the package.
- **Cold plate / liquid cooling**: for high-power packages (>300 W), a liquid-cooled cold plate is attached to the IHS to remove heat efficiently. (The airflow side of the problem belongs to fluid mechanics, not covered here.)

**Worked example — a 200 W GPU die.** Die 12 × 12 mm, TIM1 50 µm at 5 W/(m·K): R₁ = 50×10⁻⁶ / (5 × 144×10⁻⁶) ≈ 0.07 K/W. Cu IHS, 2 mm, k = 390: R ≈ 0.04 K/W. TIM2, 100 µm at 8 W/(m·K) over the full 40 × 40 mm lid: R ≈ 0.003 K/W. Heat sink + airflow: ~0.25 K/W. Total ≈ 0.36 K/W, so at 200 W the junction sits at 25 + 72 ≈ 97 °C — just under the 100 °C limit. The dominant term is the *air*, not the package: improving the paste cannot fix a bad heat sink.

Authoritative sources: [JEDEC JEP95](https://www.jedec.org/standards-documents/docs/jep95) (package outlines incl. thermal pads); [IPC-7095E](https://www.electronics.org/TOC/IPC-7095E_toc.pdf) (assembly effects on thermal path).

<details><summary>Example problem</summary>

A die is 10 × 10 mm and dissipates 150 W. Option A: TIM paste, 50 µm, k = 4 W/(m·K). Option B: solder TIM, 25 µm, k = 50 W/(m·K). What junction-temperature rise does each TIM add?

<details><summary>Solution</summary>

Area A = 100 mm² = 1 × 10⁻⁴ m².

- Option A: R = 50×10⁻⁶ / (4 × 10⁻⁴) = 0.125 K/W → ΔT = 150 × 0.125 = 18.8 K.
- Option B: R = 25×10⁻⁶ / (50 × 10⁻⁴) = 0.0005 K/W → ΔT ≈ 0.08 K.

The solder TIM buys ~19 K of headroom — the reason high-end CPUs/GPUs use **indium or solder TIM1** instead of paste. (Indium, k ≈ 86 W/(m·K), is used because it is soft enough to relieve CTE stress.)

</details>
</details>

</details>

## Inspection and reliability

Packaged interconnects are verified by non-destructive imaging (X-ray, acoustic microscopy) and by accelerated stress tests (temperature cycling, moisture preconditioning) that predict field life.

<details><summary>Details</summary>

Most of a package's joints are hidden — under the die, under the mold, under the BGA balls — so inspection must see through solid materials, and reliability must be proven by *stress*, not by looking.

- **X-ray imaging**: solder absorbs X-rays strongly, so voids, bridging, and missing balls in BGA and flip-chip joints show directly. It is the standard inline check for hidden joints.
- **Scanning acoustic microscopy (SAM)**: ultrasound reflects at material interfaces; delaminations between mold compound and die (invisible to X-ray) show as bright echoes. Used for moisture-damage screening.
- **Cross-sectioning**: destructive — the package is potted in resin, ground to the plane of interest, and polished for optical/SEM inspection of bump height, intermetallic thickness, and wire bonds.
- **Warpage**: a 60 mm FCBGA substrate can bow hundreds of µm between room temperature and reflow (250 °C), which can lift corner balls off the pads. Warpage is measured shadow-Moïré style over temperature (JEDEC JESD22-B112) and controlled by substrate core symmetry.
- **Temperature cycling**: packages are cycled (e.g., −40 ↔ +125 °C, JESD22-A104) to fatigue the solder joints; the cycles-to-failure feed the Coffin-Manson/Darveaux life models used in the [solder section](#solder-and-reflow-c4-bumps-and-bga-balls).
- **Preconditioning**: moisture soak + reflow (JESD22-A113) simulates floor life before board mounting, to screen for popcorning.

**Worked example — a failing BGA lot.** A customer sees open joints at the four corners of a 45 mm FCBGA after board assembly. X-ray shows the corner balls did not collapse (still spherical, not squashed). SAM shows no mold delamination. The diagnosis: substrate warpage at reflow peak lifted the corners out of the solder paste before wetting — a warpage problem, not a contamination problem. The fix is a stiffer substrate core and a longer soak zone in the reflow profile, verified by shadow-Moïré warpage measurement to JEDEC JESD22-B112.

Authoritative sources: the JEDEC [JESD22 test-method family](https://www.jedec.org/standards-documents) (A104 temperature cycling, A113 preconditioning, B112 warpage) and [IPC-7095E](https://www.electronics.org/TOC/IPC-7095E_toc.pdf) (inspection and rework of BGA/flip-chip assemblies).

<details><summary>Example problem</summary>

A BGA joint survives 1500 cycles of −40 ↔ +125 °C in accelerated testing. The field environment gives an equivalent ΔT of 60 °C per day-cycle. Using a Coffin-Manson exponent n = 2, estimate field life.

<details><summary>Solution</summary>

Coffin-Manson: N_f ∝ (ΔT)⁻ⁿ. Accelerated ΔT = 165 K, field ΔT = 60 K. Acceleration factor = (165/60)² ≈ 7.6. Field cycles = 1500 × 7.6 ≈ 11 400 daily cycles ≈ **31 years** — comfortably above a 10-year product life, so the design passes.

</details>
</details>

</details>

## Example problem

A GPU package contains 1 logic die (5 nm), 4 HBM3E DRAM stacks (each 12-high), and a memory controller die. The package must fit in a 60 × 60 mm FCBGA footprint. Which packaging architecture is appropriate?

<details><summary>Solution</summary>

1. **Architecture**: CoWoS (2.5D silicon interposer). The logic die and HBM stacks are placed side-by-side on a silicon interposer with TSVs. The memory controller die is placed on the same interposer.
2. **Interposer**: ~150 µm thick Si (typical range 100–200 µm), with 3–5 metal layers for routing. TSVs connect the top (die side) to the bottom (substrate side).
3. **HBM3E stacks**: each stack is a 3D stack of 12 DRAM dies connected by TSVs. The bottom die has C4 bumps that connect to the interposer.
4. **Logic die**: flip-chip bonded to the interposer with micro-bumps (25–55 µm pitch).
5. **Substrate**: the interposer is attached to an organic FCBGA substrate (60 × 60 mm, 10–12 layers) with C4 bumps. The substrate has BGA balls on the bottom for PCB attachment.
6. **Thermal**: a heat spreader (IHS) is attached to the package substrate with a thermal interface material (TIM) between the lid and the die tops. The HBM stacks are cooled by the same heat spreader or by a separate cold plate.

</details>

## Parent

This page is a class in the [Electronics](./Readme.md) topic, which is a subtopic of [Manufacturing](../Readme.md).
