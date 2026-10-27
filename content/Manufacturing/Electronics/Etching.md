# Etching

Etching removes selected regions of a film by dissolving or bombarding away every atom that is not protected by a mask. It is the material-removing step of electronics fabrication: after [Lithography](./Lithography.md) defines a pattern in a photoresist, the etch transfers that pattern into the film underneath — and the etched geometry, not the resist pattern, is what the device is made of.

> **Authoritative sources**
> - [May & Sze, *Fundamentals of Semiconductor Fabrication* (Wiley, 2004)](https://www.wiley.com/en-us/Fundamentals+of+Semiconductor+Fabrication-p-x000219787)
> - [Laermer & Schilp, "Method of anisotropically etching silicon", US Patent 5,501,893 (Robert Bosch GmbH, 1996) — the original Bosch DRIE process](https://patents.google.com/patent/US5501893A/en)
> - [Sato et al., "Characterization of orientation-dependent etching properties of single-crystal silicon: effects of KOH concentration", Sensors and Actuators A 64, 87 (1998)](https://doi.org/10.1016/S0924-4247(97)01658-0)
> - [Madou, *Fundamentals of Microfabrication and Nanotechnology*, 3rd ed. (CRC Press)](https://www.routledge.com/Fundamentals-of-Microfabrication-and-Nanotechnology-Three-Volume-Set/Madou/p/book/9780849331800)

## Role in the fabrication flow

A chip is built layer by layer in a repeating cycle:

1. **[Deposition](./Deposition.md)** — add the film to be shaped (oxide, metal, poly-Si…).
2. **[Lithography](./Lithography.md)** — coat a photoresist and expose it through a mask, defining where material may remain.
3. **Etch** (this page) — remove the film everywhere the resist does not protect it, transferring the pattern into the film.
4. **Resist strip and clean** — remove the resist and etch residues (O₂ plasma or wet strip).
5. Repeat for the next layer.

The etch is the step where the pattern becomes physical: the resist is sacrificial, the etched film is not. Every transistor gate, interconnect line, via and MEMS cavity owes its final shape to an etch.

## Utility

- Transfers the lithographic pattern into the underlying film — the resist pattern itself is never part of the device.
- Defines the final geometry of transistor gates, interconnects, vias, trenches and MEMS cavities.
- **Critical dimension (CD) control**: the final CD is the sum of the lithographic CD and the etch bias (the CD offset introduced by the etch, from mask erosion, lateral etch and passivation): final CD = litho CD + etch bias. The [Lithography](./Lithography.md) page covers the litho half of this budget; the etch half is governed by selectivity and anisotropy, defined below. A ±1 nm gate-CD error shifts the threshold voltage and drive current of every transistor on the die.
- Selectivity (how fast the target etches relative to the mask and the layer below), anisotropy (how directional the removal is) and rate determine yield — and every etch is a trade-off between the three.

## Key concepts

### Wet etching

A liquid etchant (acid, base or oxidizer) dissolves the exposed film: isotropically in amorphous or polycrystalline films, or along crystallographic planes in a single crystal.

<details><summary>Details</summary>

**How it works, step by step.** The wafer is immersed in (or sprayed with) a liquid etchant. The etchant (1) transports to the surface, (2) reacts with the exposed film, converting it into a soluble product, and (3) the product diffuses away. In a liquid, molecules arrive at the surface from every direction with equal probability, so an *amorphous* film etches equally fast in every direction: the etch front is a circle expanding from the mask opening, and the etch tunnels under the mask — the **undercut** — by exactly as much as it goes down. In a *single crystal*, however, different crystal planes dissolve at very different rates, so the etch becomes anisotropic along crystallographic directions even though the chemistry itself has no preferred direction.

**Worked example — KOH V-grooves.** KOH etches Si(100) planes about 100× faster than the (111) planes, which make a 54.74° angle with the wafer surface. Etching a window in a Si(100) wafer therefore stops laterally on four (111) planes, producing a pit with perfectly flat 54.7° sidewalls — the basis of MEMS membranes, nozzles and cavities. Conversely, HF dissolving a sacrificial SiO₂ layer under a released MEMS plate is chosen *because* it is isotropic: it must creep horizontally over long distances to undercut the plate.

<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:660px;font-family:sans-serif">
  <text x="165" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Isotropic (wet)</text>
  <text x="495" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Anisotropic (RIE / DRIE)</text>
  <rect x="20" y="70" width="290" height="130" fill="#cfd8dc" stroke="#90a4ae"/>
  <rect x="20" y="190" width="290" height="22" fill="#90a4ae"/>
  <text x="30" y="206" font-size="10" fill="#37474f">substrate</text>
  <path d="M 80 70 A 50 50 0 0 0 130 120 L 200 120 A 50 50 0 0 0 250 70 Z" fill="#ffffff" stroke="#78909c"/>
  <line x1="130" y1="70" x2="130" y2="120" stroke="#c62828" stroke-dasharray="4 3"/>
  <line x1="200" y1="70" x2="200" y2="120" stroke="#c62828" stroke-dasharray="4 3"/>
  <rect x="20" y="50" width="110" height="20" fill="#ffcc80" stroke="#ef6c00"/>
  <rect x="200" y="50" width="110" height="20" fill="#ffcc80" stroke="#ef6c00"/>
  <text x="30" y="64" font-size="10" fill="#5d3a00">resist</text>
  <line x1="80" y1="95" x2="130" y2="95" stroke="#c62828" stroke-width="1.5"/>
  <polygon points="80,95 88,91 88,99" fill="#c62828"/>
  <text x="82" y="110" font-size="10" fill="#c62828">undercut = depth</text>
  <text x="165" y="235" text-anchor="middle" font-size="11" fill="#555">rate equal in all directions → semicircular profile</text>
  <rect x="350" y="70" width="290" height="130" fill="#cfd8dc" stroke="#90a4ae"/>
  <rect x="350" y="190" width="290" height="22" fill="#90a4ae"/>
  <rect x="460" y="70" width="70" height="50" fill="#ffffff" stroke="#78909c"/>
  <line x1="460" y1="70" x2="460" y2="120" stroke="#c62828" stroke-dasharray="4 3"/>
  <line x1="530" y1="70" x2="530" y2="120" stroke="#c62828" stroke-dasharray="4 3"/>
  <rect x="350" y="50" width="110" height="20" fill="#ffcc80" stroke="#ef6c00"/>
  <rect x="530" y="50" width="110" height="20" fill="#ffcc80" stroke="#ef6c00"/>
  <text x="360" y="64" font-size="10" fill="#5d3a00">resist</text>
  <text x="560" y="100" font-size="10" fill="#2e7d32">vertical wall,</text>
  <text x="560" y="112" font-size="10" fill="#2e7d32">undercut ≈ 0</text>
  <text x="495" y="235" text-anchor="middle" font-size="11" fill="#555">directional removal → vertical walls</text>
</svg>

**Authoritative sources:** [Sato et al. (1998)](https://doi.org/10.1016/S0924-4247(97)01658-0) measured the orientation-dependent KOH etch rates behind the crystallographic model above; [Madou, *Fundamentals of Microfabrication*](https://www.routledge.com/Fundamentals-of-Microfabrication-and-Nanotechnology-Three-Volume-Set/Madou/p/book/9780849331800) covers wet-etching practice in depth.

<details><summary>Example problem</summary>

A KOH V-groove must be etched completely through a 525 µm thick Si(100) wafer. What minimum mask-opening width is needed, and roughly how long does the etch take in 30 % KOH at 80 °C (~1 µm/min on (100))?

<details><summary>Solution</summary>

The groove's sidewalls are (111) planes at 54.74° to the surface. The groove reaches through when the two sidewalls meet at the bottom, i.e. when the mouth width w satisfies w = 2·d / tan(54.74°) = 2d/√2 ≈ 1.41·d. For d = 525 µm: w ≈ 742 µm. At ~1 µm/min, etching 525 µm takes about 9 hours. Wet anisotropic etching is deep but slow, and the 54.7° geometry is fixed by the crystal, not by the mask.

</details>
</details>
</details>

### Dry etching (plasma etching)

A plasma of reactive radicals and energetic ions removes the film by a combination of chemical reaction and physical bombardment; the directionality of the ion flux is what makes the etch anisotropic.

<details><summary>Details</summary>

**Step 1 — make a plasma.** A gas such as CF₄, CHF₃, SF₆ or Cl₂ is fed into a vacuum chamber and broken into ions and radicals by an RF field (typically 13.56 MHz). Radicals (F, Cl atoms) are neutral and fly in all directions; ions are charged and can be accelerated by electric fields.

**Step 2 — two removal mechanisms.** Radicals react chemically with the film, forming a volatile product (e.g. Si + 4F → SiF₄↑): fast but isotropic, like a wet etch. Ions accelerated vertically through the sheath (the thin field region above the wafer) sputter and break bonds physically: directional but barely selective. **Reactive ion etching (RIE)** combines them: ion bombardment clears inhibitor films and breaks bonds only on horizontal surfaces, so the chemical attack proceeds vertically while the sidewalls stay protected — anisotropy from directionality, selectivity from chemistry.

<svg viewBox="0 0 560 310" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;font-family:sans-serif">
  <rect x="20" y="20" width="520" height="270" fill="#f9f9f9" stroke="#888"/>
  <text x="280" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">RIE chamber: two fluxes, two roles</text>
  <text x="280" y="40" text-anchor="middle" font-size="10" fill="#555">gas in: CF₄ / CHF₃ / SF₆ / Cl₂ ↓</text>
  <rect x="140" y="48" width="240" height="12" fill="#90a4ae"/>
  <text x="280" y="74" text-anchor="middle" font-size="10" fill="#555">grounded electrode (showerhead)</text>
  <rect x="40" y="80" width="480" height="120" fill="#ede7f6"/>
  <g stroke="#00897b" stroke-width="2">
    <line x1="120" y1="120" x2="100" y2="105"/><line x1="200" y1="140" x2="222" y2="128"/>
    <line x1="300" y1="110" x2="285" y2="130"/><line x1="380" y1="135" x2="402" y2="122"/>
    <line x1="160" y1="170" x2="145" y2="185"/><line x1="330" y1="165" x2="350" y2="180"/>
    <line x1="430" y1="110" x2="425" y2="90"/>
  </g>
  <g fill="#00897b">
    <circle cx="98" cy="104" r="3"/><circle cx="224" cy="127" r="3"/><circle cx="283" cy="132" r="3"/>
    <circle cx="424" cy="121" r="3"/><circle cx="143" cy="187" r="3"/><circle cx="352" cy="181" r="3"/><circle cx="424" cy="88" r="3"/>
  </g>
  <g stroke="#c62828" stroke-width="2.5">
    <line x1="230" y1="150" x2="230" y2="196"/><line x1="280" y1="150" x2="280" y2="196"/><line x1="330" y1="150" x2="330" y2="196"/>
  </g>
  <g fill="#c62828">
    <polygon points="230,200 225,190 235,190"/><polygon points="280,200 275,190 285,190"/><polygon points="330,200 325,190 335,190"/>
  </g>
  <rect x="40" y="196" width="480" height="16" fill="#e3f2fd" stroke="#90caf9"/>
  <text x="280" y="208" text-anchor="middle" font-size="9" fill="#1565c0">sheath: the electric field accelerates ions vertically</text>
  <rect x="140" y="216" width="240" height="10" fill="#8d6e63"/>
  <rect x="120" y="226" width="280" height="16" fill="#ff7043"/>
  <text x="280" y="238" text-anchor="middle" font-size="10" fill="#fff">RF-powered electrode (13.56 MHz) + wafer</text>
  <text x="530" y="292" text-anchor="end" font-size="10" fill="#555">by-products → pump</text>
  <text x="30" y="292" font-size="10" fill="#00897b">teal: radicals — isotropic, chemical</text>
  <text x="280" y="292" text-anchor="middle" font-size="10" fill="#c62828">red: ions — directional, physical</text>
</svg>

**Step 3 — decouple density from energy (ICP).** In a simple RIE the same RF power sets both ion density and ion energy. An inductively coupled plasma (ICP) adds a coil that generates the plasma separately, so rate (density) and damage (energy) can be tuned independently.

**Step 4 — go deep: the Bosch DRIE process.** For trenches deeper than ~10 µm, plain RIE is too slow or too isotropic. The Bosch process (Laermer & Schilp, 1996) alternates two steps many times: a short **etch** step (SF₆ for silicon — as in MEMS and through-silicon vias; CHF₃ or CF₄ for SiO₂, as in 3D NAND), then a **passivation** step in which C₄F₈ deposits a ~5–10 nm fluorocarbon film on *all* surfaces. The next etch step's ions strip that film from horizontal bottoms but not from vertical sidewalls, so the trench advances vertically — leaving a small lateral **scallop** per cycle. Aspect ratios above 100:1 are routine.

**Step 5 — stop at the right depth.** Endpoint detection stops the etch when the target film is gone: a change in plasma optical emission, laser interferometry of the etch front, or a shift in RF impedance.

**Worked example — gate-etch selectivity.** Etching a 150 nm poly-Si gate over a 2 nm gate oxide with a spec of "remove ≤ 1 nm of gate oxide": the oxide loss is depth/S, so S = rate(Si)/rate(SiO₂) ≥ 150/1 = 150:1. This is why gate etchers are among the most tightly specified tools in a fab.

**Authoritative sources:** the Bosch process is described in [US Patent 5,501,893 (Laermer & Schilp, 1996)](https://patents.google.com/patent/US5501893A/en); plasma-etching fundamentals are in [May & Sze, *Fundamentals of Semiconductor Fabrication*](https://www.wiley.com/en-us/Fundamentals+of+Semiconductor+Fabrication-p-x000219787).

<details><summary>Example problem</summary>

A 3D-NAND-style stack needs a 5 µm deep hole etched in SiO₂ through a 200 nm hard mask, and the process tolerates at most 50 nm of mask erosion. What minimum mask-to-film selectivity is needed, and which gas chemistry is appropriate?

<details><summary>Solution</summary>

Mask loss = etch depth ÷ selectivity = 5 µm / S ≤ 50 nm, so S ≥ 100:1. A photoresist mask cannot survive that, so a SiO₂ or metal hard mask is used. For SiO₂ the standard chemistry is fluorocarbon (CHF₃ or CF₄, often with C₄F₈ passivation in a Bosch-type cycle), which both etches SiO₂ and deposits sidewall inhibitors; SF₆ would be the choice for silicon, not for SiO₂.

</details>
</details>
</details>

### Ion milling (ion beam etching)

A collimated beam of inert ions (usually Ar⁺) sputters atoms off the film by pure momentum transfer — no chemistry at all.

<details><summary>Details</summary>

**How it works, step by step.** An ion gun ionizes argon and extracts a beam accelerated to 100–1000 eV that hits the wafer in vacuum. Each ion transfers momentum to surface atoms; when the transfer exceeds the surface binding energy, an atom is ejected (the **sputter yield**, typically 0.1–3 atoms per ion). Because the beam is collimated, milling is directional; because there is no chemistry, it etches everything — metals, oxides, diamond, ceramics — with little selectivity beyond differences in sputter yield.

**Worked example.** Gold is hard to etch chemically (no volatile fluoride or chloride at low temperature), so it is ion-milled: at 500 eV and 1 mA/cm², with a sputter yield of ~1.5 atoms/ion and an atomic density of 5.9×10²² atoms/cm³, the rate is (1×10⁻³/1.6×10⁻¹⁹) × 1.5 / 5.9×10²² ≈ 1.6 nm/s ≈ 95 nm/min. Slow — which is why milling is reserved for thin films and cleaning, not deep patterning.

**Limitations:** slow, barely selective, and the energetic beam amorphizes the top few nanometres and implants Ar into the surface — acceptable on a back-end metal, unacceptable in a transistor channel.

<details><summary>Example problem</summary>

You must remove a 30 nm Pt film (sputter yield 1.0 at 500 eV, atomic density 2.7×10²² atoms/cm³) with a 1 mA/cm² Ar⁺ beam. How long does it take?

<details><summary>Solution</summary>

Ion flux: 1×10⁻³ A/cm² ÷ 1.6×10⁻¹⁹ C = 6.25×10¹⁵ ions cm⁻² s⁻¹. Removal rate: 6.25×10¹⁵ × 1.0 ÷ 2.7×10²² ≈ 2.3×10⁻⁷ cm/s ≈ 2.3 nm/s. Time for 30 nm: ≈ 13 s.

</details>
</details>
</details>

### Etch damage and mask erosion

Physical and chemical side-effects of the etch that degrade the underlying device and shift the final geometry away from the lithographic pattern.

<details><summary>Details</summary>

- **Ion damage / implantation**: energetic ions (10–200 eV) displace atoms in a 10–50 nm surface layer, degrading carrier mobility and increasing leakage; mitigated by a post-etch anneal or a sacrificial removal layer.
- **Charging**: insulating films (SiO₂, Si₃N₄) accumulate charge during plasma exposure; the local fields deflect ions, causing non-uniform etching or gate-oxide breakdown.
- **Polymer residue**: fluorocarbon passivation (C₄F₈) and resist byproducts leave a carbon-rich film, removed by an O₂ plasma or a wet clean.
- **Mask erosion (CD loss)**: the mask is consumed during the etch, and its recession widens the feature. The arithmetic: mask loss = etch depth ÷ selectivity. A 100 nm resist mask with 100:1 selectivity loses 1000 nm / 100 = 10 nm over a 1 µm etch — acceptable. The same 1 µm etch at 10:1 selectivity would consume 1000/10 = 100 nm — the entire mask — before the film was cleared, which is why deep etches require hard masks. The resulting etch bias must be compensated in the [Lithography](./Lithography.md) CD budget.
- **Sidewall roughness**: stochastic ion bombardment and Bosch cycling leave 1–5 nm RMS sidewall roughness, which scatters electrons in narrow interconnects and adds gate-length variability.

</details>
### Chemical-mechanical planarization (CMP)

A hybrid removal step: a rotating pad soaks the wafer in a chemically reactive abrasive slurry, so the highest topography is dissolved *and* ground away until the whole surface is flat. It is the "remove" step that closes every deposition cycle in a multi-layer chip.

<details><summary>Details</summary>

**How it works, step by step.** The wafer is mounted face-down on a rotating carrier and pressed against a rotating polyurethane pad soaked in slurry — abrasive nanoparticles (silica, ceria, alumina) in a chemically active solution. Material is removed by the *combination* of the two mechanisms this page separates: the chemistry weakens or dissolves the surface (as in wet etching), and the mechanical abrasion of pad asperities and particles scrapes the weakened layer off (a micro-scale ion-milling analogue). The removal rate follows the Preston equation: rate = K_p · pressure · velocity, so removal is fastest exactly where the surface sticks up highest — the process is self-limiting and drives the surface flat.

**Why it is needed:** every deposition + etch cycle adds topography. After a few metal layers the wafer surface is a mountain range, and [Lithography](./Lithography.md) can no longer focus depth-of-focus-tight optics on it. CMP flattens the wafer after every layer (and after the shallow-trench-isolation fill), so that 50–100 cycles can stack up. It is the step that makes planar multi-layer fabrication possible at all.

**Worked example.** Copper damascene: [deposit](./Deposition.md) a barrier + copper seed, electroplate copper to overfill the trenches, then CMP the copper *back until only the trench fill remains* — the metal lines are defined by the CMP stop, not by an etch. The slurry chemistry is tuned so the removal rate drops sharply on the underlying barrier dielectric (selectivity by chemistry, exactly as in a wet etch).

<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:620px;font-family:sans-serif">
  <text x="310" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">CMP: chemistry weakens, abrasion removes the highs</text>
  <rect x="60" y="40" width="500" height="26" rx="13" fill="#90a4ae"/>
  <text x="310" y="58" text-anchor="middle" font-size="10" fill="#fff">rotating polyurethane pad</text>
  <g fill="#ef6c00"><circle cx="150" cy="76" r="3"/><circle cx="230" cy="80" r="3"/><circle cx="310" cy="74" r="3"/><circle cx="390" cy="80" r="3"/><circle cx="470" cy="76" r="3"/></g>
  <text x="310" y="94" text-anchor="middle" font-size="10" fill="#ef6c00">slurry: abrasive nanoparticles + reactive chemistry</text>
  <rect x="60" y="100" width="120" height="40" fill="#b0bec5"/>
  <rect x="180" y="120" width="120" height="20" fill="#b0bec5"/>
  <rect x="300" y="100" width="120" height="40" fill="#b0bec5"/>
  <rect x="420" y="120" width="120" height="20" fill="#b0bec5"/>
  <line x1="60" y1="100" x2="540" y2="100" stroke="#c62828" stroke-dasharray="5 4"/>
  <text x="555" y="104" font-size="10" fill="#c62828">target flat plane</text>
  <rect x="60" y="160" width="500" height="14" fill="#8d6e63"/>
  <text x="310" y="172" text-anchor="middle" font-size="10" fill="#fff">wafer</text>
  <text x="310" y="200" text-anchor="middle" font-size="11" fill="#555">rate = K_p · pressure · velocity (Preston) — highest points go first</text>
  <text x="310" y="220" text-anchor="middle" font-size="11" fill="#555">chemistry (wet-etch-like) + abrasion (momentum-like) = hybrid removal</text>
</svg>

<details><summary>Example problem</summary>

A copper damascene step overfills trenches with 300 nm of copper above a 50 nm TaN barrier. The copper slurry removes Cu at 200 nm/min with 50:1 selectivity over TaN. How long must CMP run, and how much barrier can it safely remove?

<details><summary>Solution</summary>

Removing 300 nm of copper overburden takes 300/200 = 1.5 min. At 50:1 selectivity, the barrier loss during that time is 300/50 = 6 nm — so the barrier must be thicker than ~6 nm plus margin (typically 10–25 nm is deposited). If the polish ran 2× longer (e.g. non-uniformity), 12 nm of barrier would vanish and the copper would contact the dielectric — a classic CMP-endpoint yield loss.

</details>
</details>
</details>

### Method comparison

<table>
<tr><th>Method</th><th>Mechanism</th><th>Anisotropy</th><th>Selectivity</th><th>Typical rate</th><th>Min. patternable feature</th><th>Primary use</th></tr>
<tr><td>Wet etching</td><td>Chemical dissolution</td><td>Isotropic (or crystallographic)</td><td>High (10–1000:1)</td><td>1–100 µm/min</td><td>~1 µm (undercut-limited)</td><td>Sacrificial release, MEMS V-grooves, strips</td></tr>
<tr><td>Dry / plasma etching (RIE, ICP, DRIE)</td><td>Ion bombardment + radical chemistry</td><td>Anisotropic (directional ions)</td><td>Moderate (2–100:1)</td><td>0.1–10 µm/min</td><td>~5 nm (set by lithography)</td><td>CMOS gates, 3D NAND, TSVs, MEMS</td></tr>
<tr><td>Ion milling</td><td>Physical sputtering (no chemistry)</td><td>Directional (beam)</td><td>Low (1–5:1)</td><td>0.01–1 µm/min</td><td>N/A (not a patterning tool)</td><td>Cleaning; non-etchable materials (Au, Pt, diamond)</td></tr>
</table>

<iframe src="./Etching.simulation.html" title="Etch profile simulator: compare isotropic wet etch, anisotropic RIE and Bosch DRIE (scalloped) profiles under a resist mask"></iframe>

## Quizz

<details>
<summary>Quizz: which etch for a 3D NAND stack?</summary>

A 3D NAND flash memory requires 1000 stacked layers of SiO₂/Ta₂O₅, each 10 nm thick, with word-line trenches of aspect ratio 100:1. Which etching process is appropriate, and why can the other two classes not do it?

<details><summary>How to solve it</summary>

1. **Requirement**: 1000 × 10 nm = 10 µm of total depth at a 100:1 aspect ratio — deep *and* vertical.
2. **Eliminate wet etching**: liquid etchants are isotropic (or fixed to 54.7° crystal planes); a 10 µm deep wet hole in a µm-scale opening would undercut laterally by micrometres and never stay vertical.
3. **Eliminate plain RIE**: without cyclic passivation, the radical component undercuts the mask over a 10 µm etch, and ion directionality alone cannot keep the walls vertical at 100:1.
4. **Answer: DRIE (Bosch process)**. CHF₃ (or CF₄) plasma etches the SiO₂/Ta₂O₅ stack vertically while C₄F₈ passivation cycles protect the sidewalls; the passivation thickness (5–10 nm) sets the scallop height, and the etch stops on the Si substrate by optical-emission endpoint detection.
5. **Afterwards**: the trench is filled by a conformal [Deposition](./Deposition.md) step (ALD), and the word lines are defined by a further [Lithography](./Lithography.md) + etch cycle.

</details>
</details>

## Parent

This page is a class in the [Electronics](./Readme.md) topic, which is a subtopic of [Manufacturing](../Readme.md).
