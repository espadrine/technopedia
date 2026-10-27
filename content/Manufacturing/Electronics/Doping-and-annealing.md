# Doping and annealing

Doping changes the electrical properties of a semiconductor region *in place*: a tiny, controlled concentration of impurity atoms (donors or acceptors) is introduced into the crystal lattice, multiplying the number of mobile charge carriers by many orders of magnitude without adding a layer ([Deposition](./Deposition.md)) or removing material ([Etching](./Etching.md)). Annealing is its inseparable partner: a thermal step that repairs the crystal damage doping causes and moves the dopant atoms onto electrically active lattice sites. Every source, drain, well, and channel-adjustment region in every CMOS chip exists because of this pair of steps.

> **Authoritative sources**
> - [Shockley, "Forming semiconductive devices by ionic bombardment", US Patent 2,787,564 (1957) — the founding patent of doping by ionic bombardment](https://patents.google.com/patent/US2787564A/en)
> - [May & Sze, *Fundamentals of Semiconductor Fabrication* (Wiley, 2004) — chapters on ion implantation, diffusion, and thermal oxidation](https://www.wiley.com/en-us/Fundamentals+of+Semiconductor+Fabrication-p-x000219787)
> - [Deal & Grove, "General Relationship for the Thermal Oxidation of Silicon", J. Appl. Phys. 36, 3770 (1965)](https://doi.org/10.1063/1.1702010)
> - [Ryssel & Ruge, *Ion Implantation* (Wiley, 1986)](https://www.wiley.com/eng-Ion+Implantation-p-9780471903220)

## Utility

- Creates the **n-type and p-type regions** (wells, sources, drains) whose junctions make diodes and whose gate-controlled sandwich makes transistors. Without doping silicon is nearly an insulator: intrinsic silicon has only ~1×10¹⁰ carriers/cm³ at room temperature, while a source/drain region carries ~10²⁰ dopants/cm³.
- Sets the **threshold voltage** of every transistor (channel doping) and the **resistance** of contacts and plugs.
- **Thermal oxidation** (covered here because it shares the furnace and the thermal budget) grows the SiO₂ gate and field oxides by *consuming* the silicon surface — again modifying existing material rather than depositing a foreign film.

## Why doping works: donors and acceptors

**Definition.** Silicon is tetravalent. Replacing one Si atom with a group-V atom (P, As, Sb) leaves a loosely bound fifth electron that is donated to the conduction band (**donor**, n-type); replacing it with a group-III atom (B) leaves a missing bond — a hole — that accepts an electron (**acceptor**, p-type). At room temperature essentially every dopant atom is ionized, so the carrier concentration equals the dopant concentration: n ≈ N_D (donors) or p ≈ N_A (acceptors).

<details><summary>Details</summary>

**The step-by-step picture.** In a pure silicon crystal every valence electron is locked in a bond; only the rare thermal excitation across the 1.12 eV band gap provides carriers (intrinsic concentration n_i ≈ 1×10¹⁰ cm⁻³ at 300 K). A dopant atom changes this locally:

1. **Donor (P, As, Sb):** the fifth valence electron is not needed for bonding; it is bound to its donor by only ~0.045 eV (phosphorus) — about 25× less than the band gap — so room-temperature thermal energy ionizes essentially all donors, freeing one electron and leaving a fixed positive ion.
2. **Acceptor (B):** one bond is incomplete; an electron from a neighbouring filled bond hops in for ~0.045 eV, creating a mobile hole (a vacancy that behaves as a positive charge) and a fixed negative ion.
3. **Carrier type:** whichever dopant dominates wins. In an n-type region n ≈ N_D and the hole population collapses to p = n_i²/n (mass-action law); in a p-type region the reverse. Equal donor and acceptor concentrations *compensate* — the region behaves as intrinsic again.

**Why junctions matter:** where a p-region touches an n-region, carriers diffuse across and leave a depletion zone with a built-in field — the p–n junction, the diode, and the drain/body barrier of every MOSFET. The depth and sharpness of the doped region (the junction depth x_j) is the key geometric output of a doping step, just as the critical dimension is for [Lithography](./Lithography.md).

**Worked example.** A source/drain doped with arsenic at N_D = 1×10²⁰ cm⁻³ has n ≈ 10²⁰ cm⁻³ — ten billion times intrinsic — and a resistivity of ~0.001 Ω·cm instead of ~2×10⁵ Ω·cm. Replacing roughly 1 silicon atom in 5,000,000 (lattice density 5×10²² cm⁻³) turns an insulator into a near-metal.

<svg viewBox="0 0 660 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:660px;font-family:sans-serif">
  <text x="165" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Donor (P in Si): n-type</text>
  <text x="495" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Acceptor (B in Si): p-type</text>
  <circle cx="60" cy="70" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="60" y="75" text-anchor="middle" font-size="10">Si</text>
  <circle cx="120" cy="70" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="120" y="75" text-anchor="middle" font-size="10">Si</text>
  <circle cx="90" cy="115" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="90" y="120" text-anchor="middle" font-size="10">Si</text>
  <circle cx="150" cy="115" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="150" y="120" text-anchor="middle" font-size="10">Si</text>
  <circle cx="60" cy="160" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="60" y="165" text-anchor="middle" font-size="10">Si</text>
  <circle cx="120" cy="160" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="120" y="165" text-anchor="middle" font-size="10">Si</text>
  <circle cx="120" cy="115" r="17" fill="#ffcc80" stroke="#ef6c00" stroke-width="2"/><text x="120" y="120" text-anchor="middle" font-size="10" font-weight="bold">P⁺</text>
  <circle cx="163" cy="98" r="5" fill="#c62828"/>
  <text x="178" y="102" font-size="10" fill="#c62828">free e⁻</text>
  <circle cx="420" cy="70" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="420" y="75" text-anchor="middle" font-size="10">Si</text>
  <circle cx="480" cy="70" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="480" y="75" text-anchor="middle" font-size="10">Si</text>
  <circle cx="450" cy="115" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="450" y="120" text-anchor="middle" font-size="10">Si</text>
  <circle cx="510" cy="115" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="510" y="120" text-anchor="middle" font-size="10">Si</text>
  <circle cx="420" cy="160" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="420" y="165" text-anchor="middle" font-size="10">Si</text>
  <circle cx="480" cy="160" r="16" fill="#cfd8dc" stroke="#78909c"/><text x="480" y="165" text-anchor="middle" font-size="10">Si</text>
  <circle cx="450" cy="70" r="17" fill="#b3e5fc" stroke="#0277bd" stroke-width="2"/>
  <text x="450" y="75" text-anchor="middle" font-size="10" font-weight="bold" fill="#01579b">B⁻</text>
  <circle cx="492" cy="92" r="6" fill="none" stroke="#1565c0" stroke-width="2" stroke-dasharray="2 2"/>
  <text x="505" y="96" font-size="10" fill="#1565c0">hole (mobile +)</text>
  <text x="165" y="205" text-anchor="middle" font-size="11" fill="#555">fifth electron donated → mobile e⁻, fixed + ion</text>
  <text x="495" y="205" text-anchor="middle" font-size="11" fill="#555">missing bond electron → mobile hole, fixed − ion</text>
</svg>

**Authoritative sources:** the founding patent [US 2,787,564 (Shockley)](https://patents.google.com/patent/US2787564A/en); carrier statistics in [Sze & Ng, *Physics of Semiconductor Devices*](https://onlinelibrary.wiley.com/doi/book/10.1002/0470068329).

<details><summary>Example problem</summary>

A silicon region is doped with N_D = 5×10¹⁶ cm⁻³ phosphorus. At 300 K (n_i = 1×10¹⁰ cm⁻³), what are the electron and hole concentrations, and what happens if the same region also receives a boron implant of N_A = 5×10¹⁶ cm⁻³?

<details><summary>Solution</summary>

n ≈ N_D = 5×10¹⁶ cm⁻³; by mass action p = n_i²/n = (10¹⁰)²/5×10¹⁶ = 2×10³ cm⁻³. With equal donor and acceptor concentrations the dopants compensate: each boron accepts an electron from a phosphorus donor, and the region behaves as intrinsic silicon again. This is why a well implant must *overwhelm*, not merely match, the substrate doping.

</details>
</details>
</details>

## Ion implantation

**Definition.** Dopant ions are accelerated to 1 keV–3 MeV and fired into the wafer; the depth profile is a Gaussian centred on the projected range R_p with straggle ΔR_p, both set by ion energy and mass:

N(x) = (dose / (√(2π) · ΔR_p)) · exp( −(x − R_p)² / (2ΔR_p²) )

The dose (ions/cm²) is measured by integrating the wafer current — implantation is the only major fab step whose recipe is literally an electric charge.

<details><summary>Details</summary>

**How it works, step by step.**

1. **Ion source:** a gas (BF₃, PH₃, AsH₃) or sputtered solid is ionized; a magnet analyses the ions by mass-to-charge so only the wanted species (e.g. ¹¹B⁺) reaches the beamline.
2. **Acceleration:** the beam is accelerated to the set energy — energy, not time, sets the depth. Typical: 0.5–5 keV for ultra-shallow source/drains, 30–80 keV for channel doping, up to MeV for deep wells.
3. **Scanning and dose integration:** the beam is rastered across the wafer; the dose is the integrated beam current divided by area and ion charge.
4. **Stopping:** the ion loses energy to nuclear collisions (which *damage* the crystal and, at high dose, amorphize it) and to electronic excitation, stopping at R_p with statistical spread ΔR_p. Heavier ions stop shallower at the same energy.
5. **Masking:** photoresist, oxide, or polysilicon films block the beam, so implants go only through windows opened by [Lithography](./Lithography.md).
6. **Annealing** (next section) repairs the damage and activates the dopants.

**Worked example — ultra-shallow source/drain.** A 0.5 keV boron implant has R_p ≈ 2 nm, ΔR_p ≈ 1.2 nm. For a dose of 1×10¹⁵ cm⁻² the peak concentration is dose/(√(2π)·ΔR_p) = 10¹⁵/(2.507 × 1.2×10⁻⁷ cm) ≈ 3×10²¹ cm⁻³ — above boron's solid solubility (~2×10²⁰ cm⁻³), so the anneal cannot activate it all. Ultra-shallow junctions sit right at the activation limit.

**Channeling:** an ion entering exactly along a crystal axis sees open channels between atomic rows and penetrates far deeper than R_p. It is suppressed by tilting the wafer ~7° off-axis, or by a thin amorphous screen oxide.

<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:620px;font-family:sans-serif">
  <rect x="60" y="20" width="540" height="180" fill="#fafafa" stroke="#999"/>
  <line x1="60" y1="200" x2="600" y2="200" stroke="#8d6e63" stroke-width="6"/>
  <text x="595" y="216" text-anchor="end" font-size="10" fill="#6d4c41">silicon surface</text>
  <line x1="60" y1="20" x2="60" y2="200" stroke="#888"/>
  <path d="M 100 195 C 180 190, 240 60, 320 55 C 400 60, 460 190, 540 195" fill="none" stroke="#c62828" stroke-width="2.5"/>
  <line x1="320" y1="55" x2="320" y2="200" stroke="#c62828" stroke-dasharray="4 3"/>
  <text x="320" y="45" text-anchor="middle" font-size="11" fill="#c62828">peak = dose / (√(2π)·ΔR_p)</text>
  <text x="320" y="214" text-anchor="middle" font-size="11" fill="#c62828">R_p (projected range)</text>
  <line x1="255" y1="90" x2="385" y2="90" stroke="#1565c0" stroke-dasharray="3 3"/>
  <text x="395" y="94" font-size="10" fill="#1565c0">±ΔR_p (straggle)</text>
  <text x="325" y="245" text-anchor="middle" font-size="11" fill="#555">depth x →  ·  as-implanted profile N(x) ≈ Gaussian</text>
</svg>

**Authoritative sources:** [May & Sze, *Fundamentals of Semiconductor Fabrication*](https://www.wiley.com/en-us/Fundamentals+of+Semiconductor+Fabrication-p-x000219787); [Shockley, US 2,787,564](https://patents.google.com/patent/US2787564A/en).

<details><summary>Example problem</summary>

A well implant uses phosphorus at 150 keV (R_p ≈ 190 nm, ΔR_p ≈ 55 nm) with dose 5×10¹² cm⁻². (a) What is the peak concentration? (b) A buried layer sits 600 nm deep: estimate the dopant concentration reaching it.

<details><summary>Solution</summary>

(a) N_peak = dose/(√(2π)·ΔR_p) = 5×10¹²/(2.507 × 5.5×10⁻⁶ cm) ≈ 3.6×10¹⁷ cm⁻³.
(b) At x = 600 nm, (x − R_p)/ΔR_p = 410/55 ≈ 7.45, so N ≈ N_peak·exp(−7.45²/2) ≈ 3.6×10¹⁷ × 10⁻¹² ≈ 4×10⁵ cm⁻³ — negligible. The Gaussian tail falls so fast that a 3σ design rule (junction at R_p + 3ΔR_p ≈ 355 nm) leaves an enormous margin. In practice, channeling tails and anneal-enhanced diffusion, not the as-implanted profile, set the real junction depth.

</details>
</details>
</details>

## Thermal diffusion (drive-in)

**Definition.** At 900–1200 °C dopants move by solid-state diffusion: a constant-source (predeposition) step gives an erfc profile, and a limited-source (drive-in) step spreads an existing dose as a Gaussian:

limited source: N(x,t) = (Q/√(πDt)) · exp(−x²/(4Dt)), with D = D₀·exp(−E_a/kT)

Diffusion was the dominant doping method before ~1980; today it survives mainly as the *drive-in* half of implantation — the implant sets the dose, the furnace moves it.

<details><summary>Details</summary>

**How it works, step by step.**

1. **Predeposition (constant source):** the wafer sits in a furnace in a dopant-bearing ambient (e.g. BCl₃ or POCl₃ with O₂); the surface concentration pins at the solid-solubility limit and dopant diffuses in as N(x,t) = N₀·erfc(x/2√(Dt)).
2. **Drive-in (limited source):** the surface source is removed (oxide cap or ambient change); the dose Q already inside spreads as a Gaussian, and the junction depth x_j (where N crosses the substrate concentration) grows as √(Dt) — the fundamental scaling of all thermal processing.
3. **Temperature dominates:** D roughly doubles every ~10 °C near 1000 °C (E_a ≈ 3.5–4.5 eV). A 1000 °C, 1 h drive-in run accidentally at 1010 °C lands ~15 % deeper — hence furnace control to fractions of a degree.
4. **Why implants won:** diffusion is isotropic (dopants move sideways under the mask, degrading CD control), high-temperature, and cannot make ultra-shallow profiles. Implantation sets the dose cold, with charge-metering precision; diffusion only redistributes it.

**Worked example.** Boron at 1100 °C has D ≈ 3×10⁻¹³ cm²/s. After a 60 min drive-in the diffusion length √(Dt) = √(3×10⁻¹³ × 3600) ≈ 1×10⁻⁵ cm = 0.1 µm; a junction to a 10¹⁷ cm⁻³ substrate from a 10¹⁵ cm⁻² dose lands near x_j ≈ 0.5 µm.

**Authoritative sources:** [May & Sze, *Fundamentals of Semiconductor Fabrication*](https://www.wiley.com/en-us/Fundamentals+of+Semiconductor+Fabrication-p-x000219787), diffusion chapters.

<details><summary>Example problem</summary>

A drive-in at 1000 °C (D = 2×10⁻¹³ cm²/s) takes 4 hours. The furnace must instead run at 1050 °C, where D = 6×10⁻¹³ cm²/s. What time at 1050 °C gives the same junction depth?

<details><summary>Solution</summary>

Junction depth scales as √(Dt), so equal depth requires D₁t₁ = D₂t₂: t₂ = (2×10⁻¹³ × 4 h)/6×10⁻¹³ = 1.33 h ≈ 80 min. A 50 °C error cuts the required time by 3× — the reason thermal budgets are specified in °C·min and furnaces are held to ±0.5 °C.

</details>
</details>
</details>

## Annealing: repairing damage and activating dopants

**Definition.** A thermal step (typically 950–1050 °C for seconds to minutes, or ~1300 °C for milliseconds) that (1) recrystallizes the amorphized layer by solid-phase epitaxy, (2) moves dopant atoms onto substitutional lattice sites where they are electrically active, and (3) must fit inside the wafer's thermal budget without smearing the junctions it activates.

<details><summary>Details</summary>

**Why it is needed.** Each implanted ion knocks hundreds of atoms off their lattice sites; at high dose the surface layer amorphizes. A dopant atom that is not on a lattice site is *not* electrically active — it neither donates nor accepts. The anneal does three things in one thermal cycle:

1. **Solid-phase epitaxy (SPE):** if the implant amorphized the surface, the crystal re-grows from the amorphous/crystalline interface upward at ~1–10 nm/min near 600 °C, incorporating dopant atoms onto lattice sites as the front passes — which is why pre-amorphizing implants actually help activation.
2. **Activation:** dopants on substitutional sites become electrically active, up to the solid-solubility ceiling (B ~2×10²⁰ cm⁻³, As ~1.5×10²⁰ cm⁻³ near 1000 °C); excess dopant clusters into inactive precipitates.
3. **Diffusion — the enemy:** the same heat drives the unwanted √(Dt) smearing of the junction. The history of annealing hardware is a fight to get (1) and (2) while minimizing (3).

**The evolution of annealing hardware:**

- **Furnace anneal** (batch, 30–60 min at 900–1000 °C): cheap and uniform, but diffuses junctions far too much for modern nodes.
- **RTP (rapid thermal anneal)**, 1980s–: single wafer, lamp-heated, 1–60 s at 1000–1100 °C — activation with only a few nm of junction motion.
- **Millisecond anneals** (flash-lamp, laser): the surface is heated for under 1 ms; dopants activate with essentially zero diffusion — required for today's ultra-shallow junctions.
- **SPER (solid-phase epitaxial regrowth)**: low-temperature (~600–700 °C) recrystallization of a pre-amorphized layer, used when even seconds of diffusion is too much.

**Worked example.** A 0.5 keV boron implant (R_p = 2 nm) needs activation. A 5 s RTP at 1000 °C (D ≈ 3×10⁻¹⁴ cm²/s) gives √(Dt) ≈ 1.2 nm of spreading — acceptable. A 30 min furnace anneal at the same temperature gives √(Dt) ≈ 73 nm — the junction is destroyed. Same temperature, same activation; only the *time* differs. Every node shrink has forced shorter anneals.

**Authoritative sources:** [May & Sze, *Fundamentals of Semiconductor Fabrication*](https://www.wiley.com/en-us/Fundamentals+of+Semiconductor+Fabrication-p-x000219787); the [IRDS roadmap](https://irds.ieee.org/) chapters on front-end processing.

<details><summary>Example problem</summary>

An ultra-shallow junction must be activated with diffusion length √(Dt) ≤ 3 nm. At 1050 °C boron has D ≈ 1×10⁻¹³ cm²/s. Is a 10 s RTP acceptable? What anneal time does the budget allow?

<details><summary>Solution</summary>

t_max = (3×10⁻⁷ cm)²/D = 9×10⁻¹⁴/1×10⁻¹³ = 0.9 s. A 10 s RTP gives √(Dt) = √(10⁻¹²) = 10 nm — 3× over budget. The process needs a lower temperature (D falls exponentially), a millisecond flash/laser anneal, or pre-amorphization with SPER. This arithmetic is why millisecond annealing became standard below the 65 nm node.

</details>
</details>
</details>

## Thermal oxidation

**Definition.** Heating silicon in O₂ (dry, 800–1200 °C) or H₂O (wet) ambient grows SiO₂ *by consuming the silicon*: 1 nm of oxide grown consumes 0.46 nm of silicon. Growth follows the Deal–Grove law x² + Ax = B(t + τ).

<details><summary>Details</summary>

**How it works, step by step.** Oxidizer molecules (O₂ or H₂O) diffuse *through* the already-grown oxide to the Si/SiO₂ interface, react there (Si + O₂ → SiO₂), and the interface advances into the wafer. The Deal–Grove model balances the fluxes: thin oxides grow reaction-limited (linear, x ∝ t), thick oxides diffusion-limited (parabolic, x ∝ √t). Because growth consumes the substrate, oxidation is self-limiting and perfectly conformal in a way no deposited film is. It belongs on this page because it shares the furnace, the thermal budget, and the "modify existing material" character of doping: no layer is added from outside — the substrate itself is transformed.

**Worked example.** Dry oxidation at 1000 °C grows ~0.3 µm in about 5 hours; the same oxide wet (H₂O) takes ~30 min, because water diffuses through SiO₂ faster — at the cost of a looser, more etchable film. A 5 nm gate oxide is grown dry in minutes at 800–900 °C.

**Authoritative sources:** [Deal & Grove (1965)](https://doi.org/10.1063/1.1702010) — the original paper, still the standard model.

<details><summary>Example problem</summary>

A field oxidation grows 500 nm of SiO₂. How much silicon is consumed, and why does a 200 nm Si₃N₄ mask prevent oxidation of the silicon beneath it?

<details><summary>Solution</summary>

Silicon consumed = 0.46 × 500 nm = 230 nm. The nitride mask works because neither O₂ nor H₂O diffuses through Si₃N₄ appreciably — the oxidizer never reaches the silicon, so no oxide forms there. This is why nitride is the standard hard mask for thermal steps, and why oxidizing through a [Lithography](./Lithography.md)-defined window can transfer a pattern with no etch at all.

</details>
</details>
</details>

## Implantation versus diffusion

<table>
<tr><th>Property</th><th>Ion implantation</th><th>Thermal diffusion</th></tr>
<tr><td>Dose control</td><td>Charge integration, ±1 % or better</td><td>Gas-phase chemistry, ±5–10 %</td></tr>
<tr><td>Depth set by</td><td>Beam energy (keV–MeV), at room temperature</td><td>Time × temperature (√(Dt))</td></tr>
<tr><td>Lateral spread</td><td>Small (≈ ΔR_p, nm scale)</td><td>Large — isotropic, moves under the mask</td></tr>
<tr><td>Profile shape</td><td>Gaussian (as-implanted)</td><td>erfc (constant source) / Gaussian (drive-in)</td></tr>
<tr><td>Crystal damage</td><td>Yes — requires anneal</td><td>None</td></tr>
<tr><td>Thermal budget cost</td><td>Low (implant is cold)</td><td>High (900–1200 °C)</td></tr>
<tr><td>Modern role</td><td>All dose-critical steps (wells, S/D, channel, threshold adjust)</td><td>Drive-in/redistribution after implant; deep wells</td></tr>
</table>

## Role in the CMOS flow

A simplified CMOS sequence shows where doping sits relative to the other classes:

1. **Well implants** (deep, up to MeV) define the n-well and p-well in the substrate.
2. **Shallow trench isolation**: [etch](./Etching.md), oxide [deposition](./Deposition.md), CMP planarization.
3. **Gate stack**: [deposit](./Deposition.md) gate oxide + gate electrode, pattern by [Lithography](./Lithography.md) + etch.
4. **Channel/threshold-adjust implants**, through the gate oxide.
5. **Source/drain extension and halo implants** — ultra-shallow, angled.
6. **Spacers**: [deposition](./Deposition.md) + anisotropic [etch](./Etching.md).
7. **Source/drain implants** — the heavy-dose (~10¹⁵ cm⁻²) regions.
8. **Activation anneal** — RTA or flash, activating steps 4–7 at once.
9. Silicide, contacts, and the [interconnect stack](./Interconnect-and-packaging.md).

Every doped region is patterned through a window opened by [Lithography](./Lithography.md); the implant itself adds no layer and removes none — doping is the only class whose output is a change of *electrical* properties at fixed geometry.

<iframe src="./Electronics.simulation.html" title="Interactive chip process-flow simulator: use the Implant step to dope the open regions of the wafer cross-section"></iframe>

## Quizz

<details>
<summary>Quizz: building a source/drain junction</summary>

A 45 nm node MOSFET needs a source/drain junction x_j ≈ 20 nm deep with sheet resistance below 500 Ω/sq, and the activation budget allows at most 3 nm of diffusion. Which doping method and anneal do you choose, and why can neither pure diffusion nor a furnace anneal meet the spec?

<details><summary>How to solve it</summary>

1. **Depth:** 20 nm needs R_p ≈ 10–15 nm, i.e. ~1–2 keV boron or a few keV arsenic. Pure diffusion cannot make a 20 nm junction: even a short 900 °C predeposition gives √(Dt) of tens of nanometres, with an erfc profile and poor dose control.
2. **Dose control:** sheet resistance below 500 Ω/sq needs a dose near 10¹⁵ cm⁻² metered to a few percent — only charge integration in an implanter achieves this.
3. **Activation within budget:** t_max = (3×10⁻⁷ cm)²/D. At 1050 °C (D ≈ 1×10⁻¹³ cm²/s) that is 0.9 s — impossible in a furnace, marginal for RTP. Use a millisecond flash or laser anneal (or pre-amorphize and use SPER), which activates near the solubility limit while √(Dt) stays under 3 nm.
4. **Answer:** low-energy (~1–2 keV) ion implantation at ~10¹⁵ cm⁻² dose, followed by a millisecond flash/laser activation anneal — exactly the source/drain scheme used from the 90 nm node onward.

</details>
</details>

## Parent

This page is a class in the [Electronics](./Readme.md) topic, which is a subtopic of [Manufacturing](../Readme.md).
