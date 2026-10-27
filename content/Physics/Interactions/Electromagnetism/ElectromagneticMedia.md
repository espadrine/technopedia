# Electromagnetic media

Electromagnetic media is the study of how **matter responds to electromagnetic fields**. In vacuum the field equations use two fixed constants, $`\varepsilon_0` and $`\mu_0`. A medium replaces them with **material response functions** — permittivity $`\varepsilon` (how the material's charges polarize), permeability $`\mu` (how its magnetic moments align), and conductivity $`\sigma` (how easily charges flow) — that encode what the material does to the field. These three numbers, the **constitutive parameters**, set the wave speed, reflection, transmission, absorption, and dispersion in every field regime.

**When it is relevant.** Whenever an electromagnetic field meets matter: a capacitor filled with dielectric, a signal travelling down a coaxial cable or a PCB trace, light through glass or water, a radar wave hitting metal, an MRI coil in tissue, a fiber-optic cable, an antenna near a ground plane, a microwave oven, a solar cell, or a lens. It is the bridge between the field equations of [Electromagnetism](./Readme.md) and the real materials those fields propagate through.

This page modifies **all** field classes — [Electrostatics](./Electrostatics.md), [Magnetostatics](./Magnetostatics.md), [Electrodynamics](./Electrodynamics.md), and [Electromagnetic Radiation](./ElectromagneticRadiation.md) — by replacing the vacuum constants with material response.

> **Authoritative sources**
> - [Maxwell, *A Dynamical Theory of the Electromagnetic Field* (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)
> - Jackson, *Classical Electrodynamics* (constitutive relations and media chapters)
> - Griffiths, *Introduction to Electrodynamics* (standard textbook)
> - [Ellingson, *Electromagnetics I* — Electromagnetic Properties of Materials (LibreTexts)](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Book%3A_Electromagnetics_I_(Ellingson)/02%3A_Electric_and_Magnetic_Fields/2.08%3A_Electromagnetic_Properties_of_Materials)

## 1. Constitutive relations

**Definition.** The three constitutive relations close Maxwell's equations by relating the *auxiliary* fields $`\mathbf{D}` (electric displacement), $`\mathbf{B}` (magnetic flux density), and $`\mathbf{J}` (conduction current density) to the *fundamental* fields $`\mathbf{E}` and $`\mathbf{H}`:

```math
\mathbf{D} = \varepsilon\,\mathbf{E},\qquad
\mathbf{B} = \mu\,\mathbf{H},\qquad
\mathbf{J} = \sigma\,\mathbf{E}
```

In vacuum $`\varepsilon=\varepsilon_0`, $`\mu=\mu_0`, $`\sigma=0`. In a material these become the medium's constitutive parameters.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Why two pairs of fields?* Maxwell's equations are most cleanly written with $`\mathbf{E}` and $`\mathbf{H}` (the fields that exert forces and do work), but the *sources* of the fields are charge and current. The auxiliary fields $`\mathbf{D}` and $`\mathbf{B}` are introduced so that Gauss's law and the no-monopole law depend only on *free* charge and *free* current: $`\nabla\cdot\mathbf{D}=\rho_{\text{free}}` and $`\nabla\cdot\mathbf{B}=0`. The constitutive relations are the material's rule for converting between the two descriptions.

2. *The relations are the material's "personality."* A vacuum has $`\varepsilon_0`, $`\mu_0`, $`\sigma=0`. A dielectric has a large $`\varepsilon` (it polarizes strongly). A ferromagnet has a large $`\mu` (its domains align). A metal has a large $`\sigma` (charges flow). Everything downstream — wave speed, reflection, loss — is a consequence of these three numbers.

3. *They are not always simple scalars.* The linear, isotropic, non-dispersive form above is the simplest case. Real media can make $`\varepsilon`, $`\mu`, $`\sigma` into **tensors** (anisotropic), **frequency-dependent functions** (dispersive), or **field-dependent** (nonlinear). Sections 5 and 8 develop these generalizations.

<svg viewBox="0 0 460 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Constitutive relations mapping fundamental fields to auxiliary fields">
  <rect x="0" y="0" width="460" height="210" fill="#ffffff"/>
  <!-- fundamental fields -->
  <rect x="30" y="30" width="120" height="40" rx="6" fill="#eaf2fb" stroke="#2980b9" stroke-width="2"/>
  <text x="90" y="55" text-anchor="middle" font-family="system-ui" font-size="15" fill="#2980b9">E, H</text>
  <text x="90" y="85" text-anchor="middle" font-family="system-ui" font-size="11" fill="#555">fundamental</text>
  <!-- auxiliary fields -->
  <rect x="310" y="30" width="120" height="40" rx="6" fill="#fdeef0" stroke="#c0392b" stroke-width="2"/>
  <text x="370" y="55" text-anchor="middle" font-family="system-ui" font-size="15" fill="#c0392b">D, B, J</text>
  <text x="370" y="85" text-anchor="middle" font-family="system-ui" font-size="11" fill="#555">auxiliary</text>
  <!-- arrows -->
  <line x1="150" y1="50" x2="305" y2="50" stroke="#2c3e50" stroke-width="2.5"/>
  <polygon points="310,50 298,44 298,56" fill="#2c3e50"/>
  <text x="228" y="42" text-anchor="middle" font-family="system-ui" font-size="12" fill="#2c3e50">constitutive relations</text>
  <!-- three relations -->
  <text x="228" y="120" text-anchor="middle" font-family="system-ui" font-size="14" fill="#2c3e50">D = ε E</text>
  <text x="228" y="145" text-anchor="middle" font-family="system-ui" font-size="14" fill="#2c3e50">B = μ H</text>
  <text x="228" y="170" text-anchor="middle" font-family="system-ui" font-size="14" fill="#2c3e50">J = σ E</text>
  <text x="228" y="198" text-anchor="middle" font-family="system-ui" font-size="11" fill="#777">ε, μ, σ are the material's constitutive parameters</text>
</svg>

4. *Authoritative source.* The constitutive framework is standard; see [Ellingson, Electromagnetic Properties of Materials](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Book%3A_Electromagnetics_I_(Ellingson)/02%3A_Electric_and_Magnetic_Fields/2.08%3A_Electromagnetic_Properties_of_Materials) and Jackson, *Classical Electrodynamics*.

<details><summary>Example problem</summary>

A material has $`\varepsilon_r = 9`, $`\mu_r = 1`, and is a perfect insulator ($`\sigma = 0`). What are its absolute permittivity and permeability?

<details><summary>Solution</summary>

```math
\varepsilon = \varepsilon_r \varepsilon_0 = 9 \times 8.85\times10^{-12} \approx 7.97\times10^{-11}\ \text{F/m}
```

```math
\mu = \mu_r \mu_0 = 1 \times 4\pi\times10^{-7} \approx 1.26\times10^{-6}\ \text{H/m}
```

The relative parameters are the ratios to the vacuum values; the absolute parameters are what you plug into the field equations.
</details>

</details>

</details>

## 2. Permittivity and polarization

**Definition.** The **permittivity** $`\varepsilon` measures how strongly a material polarizes in response to an electric field. The **relative permittivity** (or **dielectric constant**) is $`\varepsilon_r = \varepsilon/\varepsilon_0 \ge 1`. Polarization $`\mathbf{P}` is the dipole moment per unit volume, and $`\mathbf{D} = \varepsilon_0 \mathbf{E} + \mathbf{P}`.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Polarization is charge separation.* In a dielectric, the applied $`\mathbf{E}` field nudges the electrons slightly off the nuclei, creating tiny dipoles. The **polarization** $`\mathbf{P}` is the net dipole moment per unit volume. Bound charges pile up on the surfaces, producing an internal field that *opposes* the applied field.

2. *Permittivity counts the polarization.* The total displacement is $`\mathbf{D} = \varepsilon_0 \mathbf{E} + \mathbf{P}`. For a linear dielectric $`\mathbf{P} = \varepsilon_0 \chi_e \mathbf{E}` (with $`\chi_e` the electric susceptibility), so $`\mathbf{D} = \varepsilon_0(1+\chi_e)\mathbf{E} = \varepsilon \mathbf{E}`. The relative permittivity is $`\varepsilon_r = 1 + \chi_e`.

3. *Why it matters: capacitance and field reduction.* A dielectric between capacitor plates raises the capacitance by $`\varepsilon_r` (it stores more charge at the same voltage) and reduces the field inside the material by $`\varepsilon_r` for a fixed free charge. Water has $`\varepsilon_r \approx 80`, glass $`\varepsilon_r \approx 4--10`, silicon $`\varepsilon_r \approx 11.7`, air $`\varepsilon_r \approx 1.0006`.

<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dielectric polarization: dipoles align and bound charge opposes the applied field">
  <rect x="0" y="0" width="460" height="200" fill="#ffffff"/>
  <!-- capacitor plates -->
  <line x1="60" y1="40" x2="60" y2="160" stroke="#2c3e50" stroke-width="6"/>
  <line x1="400" y1="40" x2="400" y2="160" stroke="#2c3e50" stroke-width="6"/>
  <text x="45" y="105" text-anchor="middle" font-family="system-ui" font-size="16" fill="#2c3e50">+</text>
  <text x="415" y="105" text-anchor="middle" font-family="system-ui" font-size="16" fill="#2c3e50">−</text>
  <!-- dipoles: little +/− pairs aligned left(+)-right(−) -->
  <g font-family="system-ui" font-size="13">
    <g fill="#c0392b"><circle cx="150" cy="70" r="7"/><circle cx="230" cy="70" r="7"/><circle cx="310" cy="70" r="7"/></g>
    <g fill="#2980b9"><circle cx="165" cy="70" r="7"/><circle cx="245" cy="70" r="7"/><circle cx="325" cy="70" r="7"/></g>
    <g fill="#c0392b"><circle cx="150" cy="130" r="7"/><circle cx="230" cy="130" r="7"/><circle cx="310" cy="130" r="7"/></g>
    <g fill="#2980b9"><circle cx="165" cy="130" r="7"/><circle cx="245" cy="130" r="7"/><circle cx="325" cy="130" r="7"/></g>
  </g>
  <!-- bound surface charge -->
  <text x="72" y="105" text-anchor="middle" font-family="system-ui" font-size="12" fill="#c0392b">bound −</text>
  <text x="388" y="105" text-anchor="middle" font-family="system-ui" font-size="12" fill="#2980b9">bound +</text>
  <text x="230" y="185" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">dipoles align with E; bound charge opposes the applied field</text>
</svg>

4. *Authoritative source.* See [Ellingson, Electromagnetic Properties of Materials](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Book%3A_Electromagnetics_I_(Ellingson)/02%3A_Electric_and_Magnetic_Fields/2.08%3A_Electromagnetic_Properties_of_Materials) and Griffiths, *Introduction to Electrodynamics*.

<details><summary>Example problem</summary>

A parallel-plate capacitor has plate area $`A = 0.01\,\text{m}^2` and separation $`d = 1\,\text{mm}`. It is filled with a dielectric of $`\varepsilon_r = 4`. Find its capacitance.

<details><summary>Solution</summary>

```math
C = \frac{\varepsilon_r \varepsilon_0 A}{d}
= \frac{4 \times 8.85\times10^{-12} \times 0.01}{1\times10^{-3}}
\approx 3.54\times10^{-10}\ \text{F} \approx 354\ \text{pF}
```

Without the dielectric the capacitance would be four times smaller ($`\approx 88.5\,\text{pF}`) — the dielectric multiplies it by $`\varepsilon_r`.
</details>

</details>

</details>

## 3. Permeability and magnetization

**Definition.** The **permeability** $`\mu` measures how strongly a material magnetizes in response to a magnetic field. The **relative permeability** is $`\mu_r = \mu/\mu_0`. Magnetization $`\mathbf{M}` is the magnetic dipole moment per unit volume, and $`\mathbf{B} = \mu_0(\mathbf{H} + \mathbf{M})`. Materials are classified by their response: **diamagnetic** ($`\mu_r < 1`, weakly repelled), **paramagnetic** ($`\mu_r > 1`, weakly attracted), and **ferromagnetic** ($`\mu_r \gg 1`, strongly attracted, with hysteresis and saturation).

<details><summary>Details</summary>

**The idea, step by step.**

1. *Magnetization is aligned magnetic dipoles.* Atoms carry tiny magnetic moments (from electron spin and orbital motion). An applied $`\mathbf{H}` field tends to align them. The **magnetization** $`\mathbf{M}` is the net moment per unit volume, and $`\mathbf{B} = \mu_0(\mathbf{H}+\mathbf{M})`.

2. *Three regimes.* In **diamagnetic** materials (copper, water, bismuth) the induced moments oppose the field, so $`\mu_r` is just below 1. In **paramagnetic** materials (aluminum, oxygen) the moments align weakly with the field, so $`\mu_r` is just above 1. In **ferromagnetic** materials (iron, nickel, cobalt) the moments lock into **domains** that align cooperatively, giving $`\mu_r` of hundreds to tens of thousands — but with **hysteresis** (the response depends on history) and **saturation** (it stops growing once all domains align).

3. *Why it matters.* High-$`\mu` materials concentrate magnetic flux, which is why transformer cores, inductor cores, and MRI magnets use them. Ferromagnetic response is nonlinear and history-dependent, so the simple $`\mathbf{B}=\mu\mathbf{H}` relation is only an approximation there; it is exact for the linear diamagnetic and paramagnetic cases.

<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diamagnetic, paramagnetic, and ferromagnetic response to a field">
  <rect x="0" y="0" width="460" height="200" fill="#ffffff"/>
  <!-- three columns -->
  <!-- diamagnetic: arrows oppose -->
  <text x="80" y="30" text-anchor="middle" font-family="system-ui" font-size="13" fill="#2c3e50">Diamagnetic</text>
  <text x="80" y="48" text-anchor="middle" font-family="system-ui" font-size="11" fill="#777">μr &lt; 1</text>
  <g stroke="#2980b9" stroke-width="2.5">
    <line x1="60" y1="80" x2="100" y2="80"/><line x1="60" y1="110" x2="100" y2="110"/><line x1="60" y1="140" x2="100" y2="140"/>
  </g>
  <g fill="#2980b9"><polygon points="60,80 72,75 72,85"/><polygon points="60,110 72,105 72,115"/><polygon points="60,140 72,135 72,145"/></g>
  <!-- paramagnetic: arrows align, small -->
  <text x="230" y="30" text-anchor="middle" font-family="system-ui" font-size="13" fill="#2c3e50">Paramagnetic</text>
  <text x="230" y="48" text-anchor="middle" font-family="system-ui" font-size="11" fill="#777">μr &gt; 1</text>
  <g stroke="#27ae60" stroke-width="2.5">
    <line x1="210" y1="80" x2="250" y2="80"/><line x1="210" y1="110" x2="250" y2="110"/><line x1="210" y1="140" x2="250" y2="140"/>
  </g>
  <g fill="#27ae60"><polygon points="250,80 238,75 238,85"/><polygon points="250,110 238,105 238,115"/><polygon points="250,140 238,135 238,145"/></g>
  <!-- ferromagnetic: arrows align, large -->
  <text x="380" y="30" text-anchor="middle" font-family="system-ui" font-size="13" fill="#2c3e50">Ferromagnetic</text>
  <text x="380" y="48" text-anchor="middle" font-family="system-ui" font-size="11" fill="#777">μr ≫ 1</text>
  <g stroke="#c0392b" stroke-width="3.5">
    <line x1="355" y1="80" x2="405" y2="80"/><line x1="355" y1="110" x2="405" y2="110"/><line x1="355" y1="140" x2="405" y2="140"/>
  </g>
  <g fill="#c0392b"><polygon points="405,80 390,73 390,87"/><polygon points="405,110 390,103 390,117"/><polygon points="405,140 390,133 390,147"/></g>
  <text x="230" y="185" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">magnetic moments: oppose (dia), weakly align (para), strongly align (ferro)</text>
</svg>

4. *Authoritative source.* See [Ellingson, Electromagnetic Properties of Materials](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Book%3A_Electromagnetics_I_(Ellingson)/02%3A_Electric_and_Magnetic_Fields/2.08%3A_Electromagnetic_Properties_of_Materials) and Griffiths, *Introduction to Electrodynamics*.

<details><summary>Example problem</summary>

A toroidal core of relative permeability $`\mu_r = 2000` carries a coil of $`N = 500` turns with current $`I = 0.1\,\text{A}`. The mean magnetic path length is $`\ell = 0.2\,\text{m}`. Find the magnetic field strength $`H` and the flux density $`B`.

<details><summary>Solution</summary>

Ampère's law around the toroid gives $`H = NI/\ell`:

```math
H = \frac{500 \times 0.1}{0.2} = 250\ \text{A/m}
```

Then $`B = \mu H = \mu_r \mu_0 H`:

```math
B = 2000 \times 4\pi\times10^{-7} \times 250 \approx 0.63\ \text{T}
```

The high-$`\mu` core concentrates the flux: the same coil in air ($`\mu_r=1`) would give only $`B \approx 3.1\times10^{-4}\,\text{T}`.
</details>

</details>

</details>

## 4. Conductivity and Ohm's law

**Definition.** The **conductivity** $`\sigma` (units S/m) measures how easily free charges move in response to an electric field. **Ohm's law** in local form is $`\mathbf{J} = \sigma \mathbf{E}`. Its reciprocal is the **resistivity** $`\rho = 1/\sigma`. A conductor has large $`\sigma` (copper $`\approx 5.8\times10^7\,\text{S/m}`); an insulator has $`\sigma \approx 0`.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Conduction is mobile charge.* In a metal, a sea of free electrons drifts under $`\mathbf{E}`. The current density is proportional to the field: $`\mathbf{J} = \sigma \mathbf{E}`. This is the microscopic Ohm's law; the circuit form $`V = IR` is its integral consequence.

2. *Conductivity is the source of loss.* Wherever $`\sigma > 0`, the field does work on the charges at a rate $`\mathbf{J}\cdot\mathbf{E} = \sigma E^2` per unit volume, which is dissipated as heat (Joule heating). This is why a signal in a lossy medium attenuates — the energy is converted to thermal energy. See [Poynting's theorem](./Electrodynamics.md) for the energy bookkeeping.

3. *The spectrum of materials.* Conductors (copper, aluminum) have $`\sigma \sim 10^7--10^8\,\text{S/m}`. Semiconductors (silicon) range over many orders of magnitude depending on doping. Electrolytes and biological tissue are weak conductors ($`\sigma \sim 0.1--1\,\text{S/m}`). Good insulators (glass, dry air) have $`\sigma \ll 10^{-12}\,\text{S/m}`.

<svg viewBox="0 0 460 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conductivity spectrum from insulators to conductors">
  <rect x="0" y="0" width="460" height="190" fill="#ffffff"/>
  <!-- gradient bar -->
  <defs>
    <linearGradient id="cond" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ecf0f1"/>
      <stop offset="0.5" stop-color="#f1c40f"/>
      <stop offset="1" stop-color="#e67e22"/>
    </linearGradient>
  </defs>
  <rect x="40" y="70" width="380" height="26" fill="url(#cond)" stroke="#2c3e50" stroke-width="1"/>
  <text x="40" y="60" font-family="system-ui" font-size="12" fill="#555">insulator (σ ≈ 0)</text>
  <text x="420" y="60" text-anchor="end" font-family="system-ui" font-size="12" fill="#555">conductor (σ ~ 10⁸ S/m)</text>
  <!-- markers -->
  <g font-family="system-ui" font-size="11" fill="#2c3e50">
    <line x1="70" y1="96" x2="70" y2="112" stroke="#2c3e50" stroke-width="1.5"/>
    <text x="70" y="128" text-anchor="middle">glass</text>
    <line x1="180" y1="96" x2="180" y2="112" stroke="#2c3e50" stroke-width="1.5"/>
    <text x="180" y="128" text-anchor="middle">tissue</text>
    <line x1="290" y1="96" x2="290" y2="112" stroke="#2c3e50" stroke-width="1.5"/>
    <text x="290" y="128" text-anchor="middle">silicon</text>
    <line x1="400" y1="96" x2="400" y2="112" stroke="#2c3e50" stroke-width="1.5"/>
    <text x="400" y="128" text-anchor="middle">copper</text>
  </g>
  <text x="230" y="165" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">σ sets Joule loss: power density = σ E²</text>
</svg>

4. *Authoritative source.* See [Ellingson, Electromagnetic Properties of Materials](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Book%3A_Electromagnetics_I_(Ellingson)/02%3A_Electric_and_Magnetic_Fields/2.08%3A_Electromagnetic_Properties_of_Materials) and Griffiths, *Introduction to Electrodynamics*.

<details><summary>Example problem</summary>

A copper wire of cross-sectional area $`A = 1\,\text{mm}^2` carries a current density $`J = 10^6\,\text{A/m}^2`. With $`\sigma = 5.8\times10^7\,\text{S/m}`, find the electric field in the wire and the power dissipated per unit length.

<details><summary>Solution</summary>

From $`\mathbf{J} = \sigma \mathbf{E}`:

```math
E = \frac{J}{\sigma} = \frac{10^6}{5.8\times10^7} \approx 0.017\ \text{V/m}
```

The power per unit length is the Joule heating $`P/\ell = J^2/\sigma \cdot A`:

```math
\frac{P}{\ell} = \frac{J^2}{\sigma}\,A = \frac{(10^6)^2}{5.8\times10^7}\times 10^{-6}
\approx 17.2\ \text{W/m}
```

This is the microscopic form of $`I^2 R`: the field does work on the electrons, and the metal converts it to heat.
</details>

</details>

</details>

## 5. Lossy media and skin depth

**Definition.** A real medium is described by a **complex permittivity** $`\varepsilon_c = \varepsilon - j\,\sigma/\omega` (or equivalently a complex conductivity), which folds conduction loss into the wave equation. In a good conductor the wave decays exponentially with depth; the **skin depth** is the distance over which the field falls by $`1/e`:

```math
\delta = \frac{1}{\sqrt{\pi f \mu \sigma}}
```

<details><summary>Details</summary>

**The idea, step by step.**

1. *Loss appears as an imaginary part.* In a sinusoidal field of angular frequency $`\omega`, the conduction current $`\sigma \mathbf{E}` is in phase with $`\mathbf{E}` while the displacement current $`j\omega\varepsilon\mathbf{E}` is $`90^\circ` out of phase. Combining them gives an effective complex permittivity $`\varepsilon_c = \varepsilon - j\sigma/\omega`. The **loss tangent** $`\tan\delta = \sigma/(\omega\varepsilon)` compares the two: large when conduction dominates (good conductor), small when displacement dominates (dielectric).

2. *The wave decays inside a conductor.* Substituting $`\varepsilon_c` into the wave equation gives a complex propagation constant $`\gamma = \alpha + j\beta`, where $`\alpha` is the attenuation (Np/m). In a **good conductor** ($`\sigma \gg \omega\varepsilon`), $`\alpha \approx \beta \approx \sqrt{\pi f \mu \sigma}`, and the field is $`E(z) = E_0 e^{-z/\delta}` with $`\delta = 1/\alpha`.

3. *Skin depth sets the penetration.* The field (and current) are confined to a thin surface layer of thickness $`\delta`. For copper at $`f = 1\,\text{GHz}`, $`\delta \approx 2.1\,\mu\text{m}`; at $`60\,\text{Hz}` it is $`\approx 8.5\,\text{mm}`. This is why high-frequency currents flow on the surface (the **skin effect**), why RF shielding works, and why thick conductors are wasteful at high frequency.

<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exponential field decay into a conductor with skin depth delta">
  <rect x="0" y="0" width="460" height="200" fill="#ffffff"/>
  <!-- conductor block -->
  <rect x="40" y="40" width="380" height="120" fill="#f5e6d3" stroke="#e67e22" stroke-width="2"/>
  <text x="45" y="35" font-family="system-ui" font-size="12" fill="#555">conductor surface</text>
  <!-- decay curve -->
  <path d="M40,50 C 120,50 150,150 200,158 C 260,164 340,166 420,166" fill="none" stroke="#c0392b" stroke-width="3"/>
  <!-- 1/e marker -->
  <line x1="150" y1="40" x2="150" y2="160" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="150" y="180" text-anchor="middle" font-family="system-ui" font-size="12" fill="#2c3e50">δ (field = E₀/e)</text>
  <text x="60" y="70" font-family="system-ui" font-size="12" fill="#c0392b">|E|</text>
  <text x="410" y="180" text-anchor="end" font-family="system-ui" font-size="12" fill="#555">depth z</text>
  <text x="230" y="198" text-anchor="middle" font-family="system-ui" font-size="11" fill="#777">E(z) = E₀ e^(−z/δ),  δ = 1/√(π f μ σ)</text>
</svg>

4. *Authoritative source.* See Jackson, *Classical Electrodynamics*, and [Ellingson, Electromagnetic Properties of Materials](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Book%3A_Electromagnetics_I_(Ellingson)/02%3A_Electric_and_Magnetic_Fields/2.08%3A_Electromagnetic_Properties_of_Materials).

<details><summary>Example problem</summary>

Compute the skin depth of copper ($`\sigma = 5.8\times10^7\,\text{S/m}`, $`\mu \approx \mu_0`) at $`f = 1\,\text{GHz}`.

<details><summary>Solution</summary>

```math
\delta = \frac{1}{\sqrt{\pi f \mu_0 \sigma}}
= \frac{1}{\sqrt{\pi \times 10^9 \times 4\pi\times10^{-7} \times 5.8\times10^7}}
```

```math
\pi f \mu_0 \sigma \approx 2.27\times10^{15}\ \text{s}^{-2}
\qquad\Rightarrow\qquad
\delta \approx \frac{1}{4.77\times10^{7}} \approx 2.1\times10^{-6}\ \text{m} = 2.1\ \mu\text{m}
```

At $`1\,\text{GHz}` the field penetrates only about two micrometres into copper — a thin skin, hence the name.
</details>

</details>

</details>

## 6. Wave speed and impedance in a medium

**Definition.** In a lossless medium the wave speed and the **intrinsic impedance** are

```math
v = \frac{1}{\sqrt{\mu\varepsilon}} = \frac{c}{\sqrt{\mu_r \varepsilon_r}},\qquad
\eta = \sqrt{\frac{\mu}{\varepsilon}} = \frac{\eta_0}{\sqrt{\mu_r/\varepsilon_r}}
```

where $`\eta_0 = \sqrt{\mu_0/\varepsilon_0} \approx 377\,\Omega` is the impedance of free space.

<details><summary>Details</summary>

**The idea, step by step.**

1. *The medium slows the wave.* The same wave-equation derivation that gives $`c = 1/\sqrt{\mu_0\varepsilon_0}` in vacuum gives $`v = 1/\sqrt{\mu\varepsilon}` in a medium. Since $`\mu \ge \mu_0` and $`\varepsilon \ge \varepsilon_0`, the wave is always slower than $`c`. For a dielectric with $`\mu_r \approx 1`, $`v = c/\sqrt{\varepsilon_r}`.

2. *The impedance sets the E/B ratio.* In a plane wave the ratio of the electric to magnetic field is the intrinsic impedance $`\eta = \sqrt{\mu/\varepsilon}`. In vacuum $`\eta_0 \approx 377\,\Omega`. In a dielectric with $`\varepsilon_r = 4`, $`\eta = 377/2 \approx 189\,\Omega`. This impedance is what determines reflection at an interface (Section 7).

3. *Why it matters.* The speed sets the wavelength in the medium ($`\lambda = v/f`), which governs the size of antennas, transmission lines, and optical paths. The impedance mismatch between two media is the root cause of reflection — the reason a lens needs an anti-reflection coating and a transmission line needs impedance matching.

<svg viewBox="0 0 460 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wave speed and impedance in a medium">
  <rect x="0" y="0" width="460" height="190" fill="#ffffff"/>
  <!-- two waves: fast (vacuum) and slow (medium) -->
  <text x="40" y="30" font-family="system-ui" font-size="12" fill="#2c3e50">vacuum: v = c</text>
  <path d="M40,55 Q70,35 100,55 T160,55 T220,55 T280,55 T340,55 T400,55" fill="none" stroke="#2980b9" stroke-width="2.5"/>
  <text x="40" y="105" font-family="system-ui" font-size="12" fill="#2c3e50">medium: v = c/√(μr εr)</text>
  <path d="M40,130 Q85,110 130,130 T220,130 T310,130" fill="none" stroke="#c0392b" stroke-width="2.5"/>
  <text x="40" y="175" font-family="system-ui" font-size="12" fill="#555">same frequency, shorter wavelength in the medium (λ = v/f)</text>
</svg>

4. *Authoritative source.* See [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008) and Griffiths, *Introduction to Electrodynamics*.

<details><summary>Example problem</summary>

A dielectric has $`\varepsilon_r = 9` and $`\mu_r = 1`. Find the wave speed and the intrinsic impedance.

<details><summary>Solution</summary>

```math
v = \frac{c}{\sqrt{\varepsilon_r \mu_r}} = \frac{3.0\times10^8}{\sqrt{9}} = 1.0\times10^8\ \text{m/s}
```

```math
\eta = \frac{\eta_0}{\sqrt{\varepsilon_r/\mu_r}} = \frac{377}{\sqrt{9}} \approx 126\ \Omega
```

The wave travels at one-third the speed of light, and the impedance is one-third that of free space.
</details>

</details>

</details>

## 7. Boundary conditions and reflection

**Definition.** At an interface between two media, the tangential components of $`\mathbf{E}` and $`\mathbf{H}` are continuous (in the absence of surface charge/current). For a plane wave at **normal incidence**, the **reflection coefficient** (electric field) is

```math
\Gamma = \frac{\eta_2 - \eta_1}{\eta_2 + \eta_1}
```

and the **transmission coefficient** is $`T = 1 + \Gamma = 2\eta_2/(\eta_2+\eta_1)`. The **Fresnel equations** generalize this to oblique incidence and both polarizations.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Fields must match at the boundary.* Maxwell's equations require the tangential $`\mathbf{E}` and $`\mathbf{H}` to be continuous across an interface. An incident wave arriving at the boundary therefore splits into a **reflected** wave (back into medium 1) and a **transmitted** wave (into medium 2), and the sum of incident and reflected fields must equal the transmitted field at the surface.

2. *The coefficient is an impedance ratio.* Enforcing the boundary conditions gives $`\Gamma = (\eta_2-\eta_1)/(\eta_2+\eta_1)`. If the impedances match ($`\eta_2 = \eta_1`), there is no reflection ($`\Gamma = 0`). If medium 2 is a perfect conductor ($`\eta_2 = 0`), the wave is fully reflected with a sign flip ($`\Gamma = -1`).

3. *Power reflection is $`|\Gamma|^2`.* The fraction of incident power reflected is $`|\Gamma|^2`. For a wave going from air ($`\eta_1 \approx 377\,\Omega`) into a dielectric with $`\varepsilon_r = 4` ($`\eta_2 \approx 189\,\Omega`), $`\Gamma \approx -0.33` and $`|\Gamma|^2 \approx 0.11` — about 11% of the power is reflected. This is why glass reflects a little and why anti-reflection coatings (a thin quarter-wave layer) are used to cancel it.

<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Incident, reflected, and transmitted waves at an interface">
  <rect x="0" y="0" width="460" height="200" fill="#ffffff"/>
  <!-- interface -->
  <line x1="230" y1="20" x2="230" y2="180" stroke="#2c3e50" stroke-width="3"/>
  <text x="120" y="30" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">medium 1 (η₁)</text>
  <text x="340" y="30" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">medium 2 (η₂)</text>
  <!-- incident wave (rightward) -->
  <path d="M40,100 Q70,75 100,100 T160,100 T220,100" fill="none" stroke="#27ae60" stroke-width="2.5"/>
  <polygon points="225,100 213,94 213,106" fill="#27ae60"/>
  <text x="120" y="85" text-anchor="middle" font-family="system-ui" font-size="11" fill="#27ae60">incident</text>
  <!-- reflected wave (leftward) -->
  <path d="M220,130 Q190,155 160,130 T100,130 T40,130" fill="none" stroke="#e67e22" stroke-width="2.5"/>
  <polygon points="45,130 57,124 57,136" fill="#e67e22"/>
  <text x="120" y="165" text-anchor="middle" font-family="system-ui" font-size="11" fill="#e67e22">reflected (Γ)</text>
  <!-- transmitted wave (rightward) -->
  <path d="M240,100 Q270,75 300,100 T360,100 T420,100" fill="none" stroke="#2980b9" stroke-width="2.5"/>
  <polygon points="425,100 413,94 413,106" fill="#2980b9"/>
  <text x="340" y="85" text-anchor="middle" font-family="system-ui" font-size="11" fill="#2980b9">transmitted (T)</text>
  <text x="230" y="195" text-anchor="middle" font-family="system-ui" font-size="11" fill="#777">Γ = (η₂ − η₁)/(η₂ + η₁)</text>
</svg>

4. *Authoritative source.* See [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008) and Griffiths, *Introduction to Electrodynamics*.

<details><summary>Example problem</summary>

A plane wave in air ($`\eta_1 \approx 377\,\Omega`) strikes normally a dielectric slab with $`\varepsilon_r = 4`, $`\mu_r = 1`. Find the reflection coefficient and the fraction of power reflected.

<details><summary>Solution</summary>

The slab impedance is $`\eta_2 = \eta_0/\sqrt{\varepsilon_r} = 377/2 \approx 189\,\Omega`. Then

```math
\Gamma = \frac{\eta_2 - \eta_1}{\eta_2 + \eta_1} = \frac{189 - 377}{189 + 377} \approx -0.33
```

The power reflection is

```math
|\Gamma|^2 \approx 0.11
```

so about **11%** of the incident power is reflected and 89% is transmitted. The negative sign means the reflected electric field is inverted.
</details>

</details>

</details>

## 8. Advanced media

**Definition.** Real and engineered media go beyond the scalar, constant parameters of Sections 1–7:

- **Anisotropic** media: $`\varepsilon` and $`\mu` are **tensors**, so the response depends on direction (e.g. crystals, waveguides).
- **Dispersive** media: $`\varepsilon(\omega)`, $`\mu(\omega)` depend on frequency, so the wave speed and reflection vary with frequency (e.g. glass, plasma).
- **Nonlinear** media: the response depends on field strength, e.g. $`\mathbf{P} = \varepsilon_0(\chi^{(1)}\mathbf{E} + \chi^{(2)}\mathbf{E}^2 + \cdots)`, enabling frequency doubling and optical switching.
- **Metamaterials**: subwavelength structures engineered to give **negative** $`\varepsilon` or $`\mu`, producing negative refraction, cloaking, and subwavelength lenses.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Anisotropy: direction matters.* In a crystal the atomic arrangement is not the same in every direction, so $`\mathbf{D}` is not generally parallel to $`\mathbf{E}`. The relation becomes $`\mathbf{D} = \boldsymbol{\varepsilon}\,\mathbf{E}` with $`\boldsymbol{\varepsilon}` a tensor. This is the origin of **birefringence**: an ordinary light beam splits into two polarized rays travelling at different speeds.

2. *Dispersion: frequency matters.* Because polarization and magnetization cannot respond instantaneously, $`\varepsilon` and $`\mu` depend on frequency. The result is **dispersion**: different colours travel at different speeds, which is why a prism spreads white light into a spectrum. The group velocity (the speed of a pulse) differs from the phase velocity, and near absorption resonances the dispersion is strong.

3. *Nonlinearity: amplitude matters.* At high field strengths (lasers), the polarization is no longer proportional to $`\mathbf{E}`. The $`\chi^{(2)}` term mixes frequencies: two photons of frequency $`\omega` can combine into one of $`2\omega` (**second-harmonic generation**), the basis of green laser pointers.

4. *Metamaterials: engineer the parameters.* By arranging subwavelength metallic or dielectric elements, one can make an effective medium with negative $`\varepsilon` or $`\mu`. A medium with both negative (a **double-negative** or **left-handed** medium) has a negative refractive index: light bends the "wrong" way, enabling **negative refraction**, **cloaking**, and **superlenses** that beat the diffraction limit.

<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Negative refraction in a metamaterial">
  <rect x="0" y="0" width="460" height="200" fill="#ffffff"/>
  <!-- interface -->
  <line x1="230" y1="20" x2="230" y2="180" stroke="#2c3e50" stroke-width="3"/>
  <text x="120" y="30" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">n &gt; 0</text>
  <text x="340" y="30" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">metamaterial, n &lt; 0</text>
  <!-- normal -->
  <line x1="230" y1="40" x2="230" y2="160" stroke="#bbb" stroke-width="1" stroke-dasharray="4 3"/>
  <!-- incident ray -->
  <line x1="60" y1="60" x2="230" y2="100" stroke="#27ae60" stroke-width="3"/>
  <polygon points="230,100 216,92 218,106" fill="#27ae60"/>
  <text x="120" y="70" font-family="system-ui" font-size="11" fill="#27ae60">incident</text>
  <!-- normal refraction would go to lower-right; negative goes to upper-right (same side as incident) -->
  <line x1="230" y1="100" x2="400" y2="140" stroke="#999" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="330" y="150" font-family="system-ui" font-size="10" fill="#999">normal refraction</text>
  <line x1="230" y1="100" x2="400" y2="60" stroke="#c0392b" stroke-width="3"/>
  <polygon points="400,60 386,66 388,52" fill="#c0392b"/>
  <text x="330" y="55" font-family="system-ui" font-size="11" fill="#c0392b">negative refraction</text>
  <text x="230" y="195" text-anchor="middle" font-family="system-ui" font-size="11" fill="#777">with n &lt; 0 the refracted ray bends to the same side as the incident ray</text>
</svg>

5. *Authoritative source.* See Jackson, *Classical Electrodynamics*, and the review literature on metamaterials (e.g. Pendry, *Negative Refraction*, 2000).

<details><summary>Example problem</summary>

A dispersive glass has $`\varepsilon_r = 2.25` at the red end of the spectrum and $`\varepsilon_r = 2.56` at the blue end (with $`\mu_r = 1`). Find the refractive index and the speed of light for each colour.

<details><summary>Solution</summary>

The refractive index is $`n = \sqrt{\varepsilon_r \mu_r} = \sqrt{\varepsilon_r}`.

Red: $`n = \sqrt{2.25} = 1.50`, so $`v = c/1.50 = 2.0\times10^8\,\text{m/s}`.

Blue: $`n = \sqrt{2.56} = 1.60`, so $`v = c/1.60 = 1.875\times10^8\,\text{m/s}`.

Blue light travels slower than red in the glass — this frequency dependence (dispersion) is exactly what makes a prism separate colours.
</details>

</details>

</details>

## Interactive: wave speed, reflection, and skin depth

Drag the sliders to change the medium's relative permittivity $`\varepsilon_r`, relative permeability $`\mu_r`, and conductivity $`\sigma`, and watch the wave speed, the normal-incidence reflection coefficient, and the skin depth respond.

<iframe src="./ElectromagneticMedia.simulation.html" title="Wave speed, reflection coefficient, and skin depth as εr, μr, and σ vary"></iframe>

## Related topics

- [Electrostatics](./Electrostatics.md) and [Magnetostatics](./Magnetostatics.md): the static limits, where $`\varepsilon` and $`\mu` set the field from the sources.
- [Electrodynamics](./Electrodynamics.md): the time-varying regime; the displacement current and Poynting theorem that underpin loss.
- [Electromagnetic Radiation](./ElectromagneticRadiation.md): the propagating waves whose speed, reflection, and dispersion are set by the media here.

Part of [Electromagnetism](./Readme.md).

## Quizz

<details><summary>Test yourself</summary>

**Problem.** A uniform plane wave at $`f = 1\,\text{GHz}` travels in air and strikes normally a large copper plate ($`\sigma = 5.8\times10^7\,\text{S/m}`, $`\mu \approx \mu_0`).

1. What is the skin depth of copper at this frequency?
2. What fraction of the incident power is reflected?
3. How far into the copper does the field penetrate before dropping to $`1/e` of its surface value?

<details><summary>Solution</summary>

1. The skin depth is

```math
\delta = \frac{1}{\sqrt{\pi f \mu_0 \sigma}}
= \frac{1}{\sqrt{\pi \times 10^9 \times 4\pi\times10^{-7} \times 5.8\times10^7}}
\approx 2.1\times10^{-6}\ \text{m} = 2.1\ \mu\text{m}
```

2. Copper is a very good conductor, so its intrinsic impedance $`\eta_2 = \sqrt{\mu/(\sigma - j\omega\varepsilon)}` is tiny (on the order of a fraction of an ohm) compared with $`\eta_1 \approx 377\,\Omega`. The reflection coefficient is therefore $`\Gamma \approx (\eta_2 - \eta_1)/(\eta_2 + \eta_1) \approx -1`, and the reflected power fraction $`|\Gamma|^2 \approx 1` — essentially **all** the power is reflected. This is why metal is an excellent RF shield.

3. By definition, the field falls to $`1/e` of its surface value at one skin depth, so the penetration distance is $`\delta \approx 2.1\,\mu\text{m}`. The wave is confined to a skin only a couple of micrometres thick.
</details>

</details>

