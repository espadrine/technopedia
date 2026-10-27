# Lithography

Lithography transfers a geometric pattern from a mask (or a digital source) onto a photoresist-coated substrate using light, electron beams, ion beams, or a physical stamp. It is the defining step in semiconductor fabrication: every transistor, wire, and via on a chip is defined by a lithography exposure.

> **Authoritative sources**
> - [B. W. Smith & K. Suzuki, *Microlithography: Science and Technology*, 3rd ed. (CRC Press, 2020)](https://www.routledge.com/Microlithography-Science-and-Technology/Smith-Suzuki/p/book/9781032836737)
> - [NIST EUV Lithography Working Group Report (2023), NIST SP 1500-208](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=956144)

## Utility

Lithography is the bottleneck of semiconductor manufacturing for three interlocking reasons:

- **It sets the minimum feature size.** The resolution of the lithography tool determines the smallest transistor gate, the narrowest interconnect, and the smallest via. Every other process step (etch, deposition, planarization) is designed around the pattern that lithography defines.
- **It is the most capital-intensive step.** A single low-NA EUV scanner (NA 0.33) costs approximately $180–240 M; a High-NA EUV scanner (NA 0.55) costs roughly $380 M. At leading-edge nodes, lithography accounts for a large fraction of total fab cost, both in equipment and in the mask sets required for multi-patterning.
- **It determines transistor count per die.** Historically, Dennard scaling (1974) assumed that feature dimensions could be scaled by a constant factor while maintaining the same power density, doubling transistor count every two years (Moore's law). Lithography is the step that makes that scaling physically possible—or impossible.

When the diffraction limit of a given wavelength is reached, the industry must either shorten the wavelength (ArF → EUV), increase the numerical aperture (low-NA → high-NA EUV), or add patterning steps (multi-patterning). Each option carries a steep cost, which is why lithography drives the pace and economics of the entire semiconductor industry.

## Key concepts

### Resolution limit (fundamental physics)

The minimum resolvable feature size in optical lithography is governed by the Rayleigh criterion:

```math
R = k_1 \cdot \lambda / \mathrm{NA}
```

where $`R` is the minimum resolvable half-pitch, $`k_1` is a process factor (typically 0.25–0.35), $`\lambda` is the wavelength of the illumination, and $`\mathrm{NA}` is the numerical aperture of the projection optics. The depth of focus is:

```math
\mathrm{DOF} = k_2 \cdot \lambda / \mathrm{NA}^2
```

with $`k_2` a process factor of order 1. Resolution and depth of focus are in direct tension: increasing NA improves resolution but shrinks the focus window.

<details><summary>Why diffraction limits resolution</summary>

A lens is a finite-aperture system. When a point source is imaged through a circular aperture, the image is not a point but an **Airy disk**: a bright central spot surrounded by concentric rings of decreasing intensity. The radius of the first dark ring is

```math
r = 1.22 \, \lambda / \mathrm{NA}
```

Two point sources are resolvable only when the first minimum of one Airy disk falls at or beyond the center of the other (the Rayleigh criterion). This gives a minimum separation of $`\Delta x \approx \lambda / \mathrm{NA}`.

The underlying reason is that the finite aperture of the lens **truncates the spatial frequency spectrum** of the image. A perfect image of an arbitrary pattern would require all spatial frequencies up to infinity; a lens with numerical aperture NA can only transmit frequencies up to $`f_{\max} = \mathrm{NA} / \lambda`. Features with spatial frequency above this cutoff are simply lost, setting a hard lower bound on the smallest printable feature.

This is the **Abbe diffraction limit**: no optical system can focus light to a spot smaller than approximately $`\lambda / (2 \, \mathrm{NA})`. It is not an engineering limitation that better lenses can overcome; it is a consequence of the wave nature of light.

</details>

### Photolithography (optical)

A patterned mask is illuminated with UV light; the light passes through the transparent regions of the mask and exposes the photoresist on the wafer. After development, the resist pattern is transferred into the underlying film by [Etching](./Etching.md).

**Optical path (schematic):**

<svg viewBox="0 0 720 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:720px;height:auto;">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#333"/>
    </marker>
  </defs>
  <rect x="10" y="40" width="80" height="40" rx="4" fill="#fff3cd" stroke="#333"/>
  <text x="50" y="65" text-anchor="middle" font-size="11" fill="#333">Light source</text>
  <line x1="90" y1="60" x2="140" y2="60" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="145" y="40" width="70" height="40" rx="4" fill="#d1ecf1" stroke="#333"/>
  <text x="180" y="65" text-anchor="middle" font-size="11" fill="#333">Condenser</text>
  <line x1="215" y1="60" x2="265" y2="60" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="270" y="30" width="80" height="60" rx="2" fill="#e2e3e5" stroke="#333"/>
  <text x="310" y="55" text-anchor="middle" font-size="11" fill="#333">Mask</text>
  <text x="310" y="70" text-anchor="middle" font-size="9" fill="#666">(reticle)</text>
  <line x1="350" y1="60" x2="400" y2="60" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="405" y="35" width="90" height="50" rx="4" fill="#d4edda" stroke="#333"/>
  <text x="450" y="58" text-anchor="middle" font-size="11" fill="#333">Projection</text>
  <text x="450" y="72" text-anchor="middle" font-size="11" fill="#333">lens (4x)</text>
  <line x1="495" y1="60" x2="545" y2="60" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="550" y="40" width="90" height="40" rx="4" fill="#f8d7da" stroke="#333"/>
  <text x="595" y="58" text-anchor="middle" font-size="11" fill="#333">Wafer</text>
  <text x="595" y="72" text-anchor="middle" font-size="9" fill="#666">(photoresist)</text>
  <text x="360" y="110" text-anchor="middle" font-size="10" fill="#666">Light path: source → condenser → mask → projection optics → wafer</text>
</svg>

<details><summary>Details</summary>

- **Wavelengths and generations:**

<table>
<tr><th>Generation</th><th>Wavelength</th><th>NA</th><th>Typical k₁</th><th>Min. half-pitch</th></tr>
<tr><td>g-line</td><td>436 nm</td><td>0.6</td><td>0.35</td><td>≈ 254 nm</td></tr>
<tr><td>i-line</td><td>365 nm</td><td>0.6</td><td>0.35</td><td>≈ 213 nm</td></tr>
<tr><td>KrF</td><td>248 nm</td><td>0.6</td><td>0.30</td><td>≈ 124 nm</td></tr>
<tr><td>ArF dry</td><td>193 nm</td><td>0.75</td><td>0.28</td><td>≈ 72 nm</td></tr>
<tr><td>ArF immersion</td><td>193 nm (in water, n = 1.44)</td><td>1.35</td><td>0.25</td><td>≈ 36 nm</td></tr>
<tr><td>EUV (low-NA)</td><td>13.5 nm</td><td>0.33</td><td>0.30</td><td>≈ 12 nm</td></tr>
<tr><td>EUV (high-NA)</td><td>13.5 nm</td><td>0.55</td><td>0.30</td><td>≈ 7.4 nm</td></tr>
</table>

- **EUV lithography**: 13.5 nm light is generated by laser-ablated tin droplets in a vacuum chamber and focused by a multi-layer Mo/Si Bragg reflector (no glass optics exist at this wavelength). Enables 7 nm and below nodes.
- **High-NA EUV**: The next generation uses a numerical aperture of 0.55 (versus 0.33 for standard EUV), improving resolution by a factor of $`0.55/0.33 \approx 1.67`. Each tool costs approximately $380 M. High-NA EUV is targeted for sub-2 nm logic nodes (expected deployment 2025–2027).
- **Immersion**: In ArF immersion, a layer of ultrapure water (refractive index 1.44) fills the gap between the final lens element and the wafer, effectively increasing NA from 0.75 to 1.35 without changing the wavelength.
- **Multi-patterning**: At nodes below the single-exposure resolution limit, the same area is exposed multiple times with different masks to create features smaller than the diffraction limit. See the diagram below.

</details>

**Resolution vs. wavelength (each generation):**

<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:600px;height:auto;">
  <line x1="60" y1="240" x2="560" y2="240" stroke="#333" stroke-width="1.5"/>
  <line x1="60" y1="240" x2="60" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="310" y="270" text-anchor="middle" font-size="11" fill="#333">Lithography generation</text>
  <text x="20" y="130" text-anchor="middle" font-size="11" fill="#333" transform="rotate(-90,20,130)">Min. half-pitch (nm)</text>
  <rect x="80" y="30" width="50" height="210" fill="#ffc107" stroke="#333"/>
  <text x="105" y="255" text-anchor="middle" font-size="9" fill="#333">g-line</text>
  <text x="105" y="25" text-anchor="middle" font-size="9" fill="#333">254</text>
  <rect x="150" y="62" width="50" height="178" fill="#ff9800" stroke="#333"/>
  <text x="175" y="255" text-anchor="middle" font-size="9" fill="#333">i-line</text>
  <text x="175" y="57" text-anchor="middle" font-size="9" fill="#333">213</text>
  <rect x="220" y="136" width="50" height="104" fill="#4caf50" stroke="#333"/>
  <text x="245" y="255" text-anchor="middle" font-size="9" fill="#333">KrF</text>
  <text x="245" y="131" text-anchor="middle" font-size="9" fill="#333">124</text>
  <rect x="290" y="180" width="50" height="60" fill="#2196f3" stroke="#333"/>
  <text x="315" y="255" text-anchor="middle" font-size="9" fill="#333">ArF dry</text>
  <text x="315" y="175" text-anchor="middle" font-size="9" fill="#333">72</text>
  <rect x="360" y="210" width="50" height="30" fill="#9c27b0" stroke="#333"/>
  <text x="385" y="255" text-anchor="middle" font-size="9" fill="#333">ArF imm.</text>
  <text x="385" y="205" text-anchor="middle" font-size="9" fill="#333">36</text>
  <rect x="430" y="230" width="50" height="10" fill="#f44336" stroke="#333"/>
  <text x="455" y="255" text-anchor="middle" font-size="9" fill="#333">EUV 0.33</text>
  <text x="455" y="225" text-anchor="middle" font-size="9" fill="#333">12</text>
  <rect x="500" y="234" width="50" height="6" fill="#d32f2f" stroke="#333"/>
  <text x="525" y="255" text-anchor="middle" font-size="9" fill="#333">EUV 0.55</text>
  <text x="525" y="229" text-anchor="middle" font-size="9" fill="#333">7.4</text>
  <text x="55" y="240" text-anchor="end" font-size="9" fill="#666">0</text>
  <text x="55" y="180" text-anchor="end" font-size="9" fill="#666">100</text>
  <text x="55" y="120" text-anchor="end" font-size="9" fill="#666">200</text>
  <text x="55" y="60" text-anchor="end" font-size="9" fill="#666">300</text>
</svg>

**Multi-patterning (how pitch is halved):**

<svg viewBox="0 0 660 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:660px;height:auto;">
  <text x="110" y="20" text-anchor="middle" font-size="11" fill="#333">Single exposure (pitch P)</text>
  <rect x="20" y="30" width="180" height="50" fill="#f5f5f5" stroke="#333"/>
  <rect x="30" y="35" width="20" height="40" fill="#333"/>
  <rect x="70" y="35" width="20" height="40" fill="#333"/>
  <rect x="110" y="35" width="20" height="40" fill="#333"/>
  <rect x="150" y="35" width="20" height="40" fill="#333"/>
  <text x="110" y="95" text-anchor="middle" font-size="9" fill="#666">1 mask, 1 exposure</text>
  <text x="330" y="20" text-anchor="middle" font-size="11" fill="#333">Double patterning (pitch P/2)</text>
  <rect x="240" y="30" width="180" height="50" fill="#f5f5f5" stroke="#333"/>
  <rect x="250" y="35" width="12" height="40" fill="#333"/>
  <rect x="270" y="35" width="12" height="40" fill="#333"/>
  <rect x="290" y="35" width="12" height="40" fill="#333"/>
  <rect x="310" y="35" width="12" height="40" fill="#333"/>
  <rect x="330" y="35" width="12" height="40" fill="#333"/>
  <rect x="350" y="35" width="12" height="40" fill="#333"/>
  <rect x="370" y="35" width="12" height="40" fill="#333"/>
  <rect x="390" y="35" width="12" height="40" fill="#333"/>
  <text x="330" y="95" text-anchor="middle" font-size="9" fill="#666">2 masks, 2 exposures + spacer</text>
  <text x="550" y="20" text-anchor="middle" font-size="11" fill="#333">Triple patterning (pitch P/3)</text>
  <rect x="460" y="30" width="180" height="50" fill="#f5f5f5" stroke="#333"/>
  <rect x="470" y="35" width="8" height="40" fill="#333"/>
  <rect x="484" y="35" width="8" height="40" fill="#333"/>
  <rect x="498" y="35" width="8" height="40" fill="#333"/>
  <rect x="512" y="35" width="8" height="40" fill="#333"/>
  <rect x="526" y="35" width="8" height="40" fill="#333"/>
  <rect x="540" y="35" width="8" height="40" fill="#333"/>
  <rect x="554" y="35" width="8" height="40" fill="#333"/>
  <rect x="568" y="35" width="8" height="40" fill="#333"/>
  <rect x="582" y="35" width="8" height="40" fill="#333"/>
  <rect x="596" y="35" width="8" height="40" fill="#333"/>
  <rect x="610" y="35" width="8" height="40" fill="#333"/>
  <text x="550" y="95" text-anchor="middle" font-size="9" fill="#666">3 masks, 3 exposures</text>
  <text x="330" y="130" text-anchor="middle" font-size="10" fill="#666">Each additional exposure halves (or thirds) the achievable pitch but adds masks, alignment steps, and cost.</text>
  <text x="330" y="148" text-anchor="middle" font-size="10" fill="#666">The pattern is then transferred into the film by etching (see Etching).</text>
</svg>

### Electron-beam lithography (EBL)

A focused electron beam writes the pattern directly onto the resist, without a mask. Because electrons have a de Broglie wavelength of picometers at typical beam energies (100 keV → $`\lambda_e \approx 0.004` nm), diffraction is negligible and resolution is set by beam spot size and scattering.

<details><summary>Details</summary>

- **Resolution**: < 10 nm (down to ~1 nm with advanced tools). Used for mask fabrication and R&D.
- **Throughput**: very slow (serial writing). A single 300 mm mask can take hours to days.
- **Proximity effect**: forward- and back-scattered electrons expose neighboring areas; correction algorithms (e.g., PROX) are required.
- **Use**: mask blanks for photolithography, nanophotonic structures, quantum devices, research prototyping.
- **Variants**: variable-shaped beam (VSB) EBL writes rectangles at high speed; multi-beam EBL (e.g., Vistec, Elionix) uses hundreds of beams in parallel to improve throughput.

</details>

### Other methods

Beyond optical and electron-beam lithography, several distinct techniques complete the landscape:

<details><summary>X-ray lithography</summary>

- **Wavelength**: ~0.5 nm (soft X-rays), far shorter than EUV.
- **Principle**: X-rays pass through a phase mask (no absorption mask needed at this wavelength) and expose a resist on a wafer in close proximity to the mask (no projection lens; demagnification is achieved geometrically).
- **Status**: Demonstrated at IBM and others in the 1990s–2000s; not adopted for high-volume manufacturing because EUV proved more practical. Remains of interest for mask inspection and specialized applications.

</details>

<details><summary>Ion-beam lithography</summary>

- **Principle**: A focused ion beam (typically Ga⁺ or He⁺) writes the pattern directly, analogous to EBL but with ions instead of electrons. Ions have negligible de Broglie wavelength, so there is no diffraction limit.
- **Resolution**: ~1–5 nm (limited by beam spot and ion-induced damage).
- **Advantage**: Ions implant into the substrate, enabling direct material modification without a separate etch step.
- **Use**: Focused ion beam (FIB) systems are used for mask repair, cross-sectioning, and nanoscale prototyping. Not used for high-volume IC patterning due to low throughput.

</details>

<details><summary>Nanoimprint lithography (NIL)</summary>

- **Principle**: A physical stamp (mold) with the inverse pattern is pressed into a thermoplastic or UV-curable resist, mechanically transferring the pattern. No light, no electrons, no ions.
- **Resolution**: < 10 nm demonstrated; limited by stamp fabrication and alignment.
- **Advantage**: No diffraction limit; very low cost per wafer once the stamp is made.
- **Limitations**: Alignment for multi-layer stacking is challenging; defect control at high volume is difficult; throughput is lower than optical scanners.
- **Use**: Research, some display backplane manufacturing, and potential future high-volume applications.

</details>

### Resolution Enhancement Techniques (RET)

The naive Rayleigh criterion assumes a perfect mask and ideal optics. In practice, modern fabs push well beyond the "first-order" limit using a suite of **Resolution Enhancement Techniques** that modify the mask, the illumination, or both. These techniques are a major part of what makes lithography the most expensive and complex step in the fab.

<details><summary>Details</summary>

- **Optical Proximity Correction (OPC)**: The mask geometry is deliberately distorted (serifs, hammerheads, line-end extensions) so that the *image* on the wafer matches the intended pattern. OPC compensates for the fact that isolated lines, dense lines, and corners all diffract differently. Computed by rigorous electromagnetic simulation of the optical system.

- **Phase-Shift Masks (PSM)**: Adjacent transparent regions of the mask are given a 180° phase difference. The resulting destructive interference at the boundary sharpens the image edge, effectively improving resolution by ~20–30% without changing λ or NA. Types: attenuated PSM (aTSM) and alternating PSM (aPSM).

- **Off-Axis Illumination (OAI)**: The illumination is shifted or shaped (annular, quadrupole, dipole) so that only specific diffraction orders reach the lens. This improves image contrast for particular pattern types (e.g., dense line/space) at the cost of other pattern types. Often combined with OPC.

- **Inverse Lithography Technology (ILT)**: The mask is treated as a grid of pixels (or sub-pixels), and an optimization algorithm (often gradient-based or adjoint-method) computes the pixel intensities that produce the target wafer image. ILT subsumes OPC and can achieve the best possible image fidelity for a given optical system, at the cost of enormous computational resources and mask complexity.

- **Hybrid approaches**: Modern leading-edge layers typically combine OAI + ILT + advanced resist + multi-patterning. The choice of RET stack is a co-optimization problem involving the optical system, the resist, and the downstream [Etching](./Etching.md) process.

</details>

### Photoresist

Photoresist is the light-sensitive (or particle-sensitive) polymer that records the pattern. It is a consumable material used in photolithography, EBL, and other exposure-based methods—not a lithography technique itself.

<details><summary>Details</summary>

- **Positive resist**: exposed regions become soluble in developer and are washed away. Most common in IC manufacturing (e.g., chemically amplified resists based on polycaprolactone).
- **Negative resist**: exposed regions cross-link and become insoluble. Used for high-resolution or high-aspect-ratio structures (e.g., SU-8 for MEMS).
- **Thickness**: 0.1–2 µm for IC; up to 100 µm for thick-film or MEMS.
- **Coating**: spin-coating at 2000–5000 rpm produces a uniform film; post-apply bake (PAB) removes residual solvent.
- **EUV resists**: require new chemistries because 13.5 nm photons are absorbed in the top ~50 nm of the resist, generating secondary electrons that do the actual exposure. Stochastic effects (shot noise) become significant at the smallest features.
- **Role in the fab flow**: After development, the resist pattern serves as a mask for [Etching](./Etching.md) of the underlying [Deposition](./Deposition.md) layer. The resist is then stripped and the cycle repeats for the next layer.

</details>

### Fab flow context

Lithography is one step in a repeating cycle that builds a chip layer by layer:

<svg viewBox="0 0 700 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;height:auto;">
  <defs>
    <marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#333"/>
    </marker>
  </defs>
  <rect x="10" y="30" width="90" height="40" rx="6" fill="#fff3cd" stroke="#333"/>
  <text x="55" y="55" text-anchor="middle" font-size="10" fill="#333">Litho</text>
  <line x1="100" y1="50" x2="130" y2="50" stroke="#333" stroke-width="1.5" marker-end="url(#arr2)"/>
  <rect x="135" y="30" width="90" height="40" rx="6" fill="#d1ecf1" stroke="#333"/>
  <text x="180" y="55" text-anchor="middle" font-size="10" fill="#333">Develop</text>
  <line x1="225" y1="50" x2="255" y2="50" stroke="#333" stroke-width="1.5" marker-end="url(#arr2)"/>
  <rect x="260" y="30" width="90" height="40" rx="6" fill="#f8d7da" stroke="#333"/>
  <text x="305" y="55" text-anchor="middle" font-size="10" fill="#333">Etch</text>
  <line x1="350" y1="50" x2="380" y2="50" stroke="#333" stroke-width="1.5" marker-end="url(#arr2)"/>
  <rect x="385" y="30" width="90" height="40" rx="6" fill="#d4edda" stroke="#333"/>
  <text x="430" y="55" text-anchor="middle" font-size="10" fill="#333">Deposit</text>
  <line x1="475" y1="50" x2="505" y2="50" stroke="#333" stroke-width="1.5" marker-end="url(#arr2)"/>
  <rect x="510" y="30" width="90" height="40" rx="6" fill="#e2e3e5" stroke="#333"/>
  <text x="555" y="55" text-anchor="middle" font-size="10" fill="#333">CMP</text>
  <path d="M 600 50 Q 650 50 650 80 Q 650 95 55 95 Q 10 95 10 70" fill="none" stroke="#666" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr2)"/>
  <text x="330" y="90" text-anchor="middle" font-size="9" fill="#666">repeat for each layer (50–100+ cycles in a modern chip)</text>
</svg>

A modern logic chip requires 50–100+ such cycles. Lithography is performed 20–40 times per wafer (more with multi-patterning). The [Etching](./Etching.md) step transfers the resist pattern into the deposited film; the [Deposition](./Deposition.md) step adds the next layer of material; CMP (chemical-mechanical planarization) flattens the surface before the next lithography cycle.

## Example problem

A 5 nm logic chip has a dense gate layer with a half-pitch of 21 nm. Compare the patterning options:

1. **ArF immersion** (λ = 193 nm, NA = 1.35, k₁ = 0.25): single-exposure resolution is $`R = 0.25 \times 193 / 1.35 \approx 35.7` nm. Since 21 nm < 35.7 nm, multi-patterning is required. How many exposures?
2. **EUV low-NA** (λ = 13.5 nm, NA = 0.33, k₁ = 0.30): single-exposure resolution is $`R = 0.30 \times 13.5 / 0.33 \approx 12.3` nm. Can 21 nm be achieved in a single exposure?
3. Compare the number of masks, alignment steps, and relative cost.

<details><summary>Solution</summary>

**ArF immersion:**

- Single-exposure resolution: $`R = k_1 \cdot \lambda / \mathrm{NA} = 0.25 \times 193 / 1.35 \approx 35.7` nm.
- Required half-pitch: 21 nm. Ratio: $`35.7 / 21 \approx 1.7`.
- Since the ratio is between 1 and 2, **double patterning** (2×) is needed: two masks, two exposures, plus a spacer etch step to create the intermediate lines. Total: 2 litho exposures + 1 spacer deposition + 1 spacer etch + 2 alignment steps.
- If the required pitch were tighter (e.g., 15 nm), triple patterning (3×) would be needed: 3 masks, 3 exposures, 3 alignment steps.

**EUV low-NA:**

- Single-exposure resolution: $`R = 0.30 \times 13.5 / 0.33 \approx 12.3` nm.
- Required half-pitch: 21 nm. Since 21 nm > 12.3 nm, a **single exposure** suffices with a comfortable margin ($`k_1^{\text{effective}} = 12.3/21 \approx 0.59`, well within the 0.25–0.35 design target when accounting for process margin).
- Total: 1 mask, 1 exposure, 1 alignment step.

**Comparison:**

<table>
<tr><th>Option</th><th>Masks</th><th>Exposures</th><th>Alignment steps</th><th>Extra steps</th><th>Relative cost</th></tr>
<tr><td>ArF immersion 2×</td><td>2</td><td>2</td><td>2</td><td>Spacer dep + etch</td><td>~2× single EUV</td></tr>
<tr><td>EUV single</td><td>1</td><td>1</td><td>1</td><td>None</td><td>1× (baseline)</td></tr>
</table>

**Conclusion:** EUV single-exposure is strongly preferred for the 21 nm half-pitch gate layer: it halves the mask count, eliminates the spacer process, and reduces alignment error accumulation. ArF immersion multi-patterning remains viable for less-critical layers where EUV is not yet cost-effective or where the required pitch is above ~25 nm.

</details>

## Interactive simulation

<iframe src="./Lithography.simulation.html" title="Interactive lithography resolution calculator"></iframe>

## Parent

This page is a class in the [Electronics](./Readme.md) topic, which is a subtopic of [Manufacturing](../Readme.md).