# Nuclear physics

Nuclear physics describes the structure and behavior of atomic nuclei: the strong-interaction bound states of protons and neutrons (nucleons), the reactions that transform them, and the radioactive decays that reveal the weak interaction. It is relevant whenever the nucleus itself matters: energy production (fission reactors, fusion), medical imaging and radiotherapy, radiometric dating, and the nucleosynthesis that built the elements (see [Cosmology](./Cosmology.md)).

The nucleus sits between two levels of description. Below it, nucleons are bound states of quarks and gluons (see [Elementary particles](./Elementary-Particles.md)); the force between nucleons is a residual of the [strong interaction](../Interactions/Readme.md), just as the van der Waals force between molecules is a residual of electromagnetism. Above it, the nucleus is simply the positive charge $`+Ze` that anchors the electron shells of [atomic physics](./Atomic-Physics.md). And because nuclei are quantum objects, the tools come from [quantum mechanics](../Quantum-Mechanics/Readme.md): bound states and shell filling from the [Pauli principle](../Quantum-Mechanics/Quantum-Many-Body.md), and decay through barriers from [tunneling](../Quantum-Mechanics/Quantum-Dynamics.md).

> **Authoritative sources**
> - [Krane, *Introductory Nuclear Physics* (Wiley, 1988)](https://www.wiley.com/en-us/Introductory+Nuclear+Physics-p-9780471805533)
> - [Particle Data Group, Review of Particle Physics](https://pdg.lbl.gov/)

## The nuclear force

**Definition.** The nuclear force is the residual strong interaction between nucleons: a short-range attraction (range ≈ 1–2 fm) with a repulsive core, approximately charge-independent, plus the long-range Coulomb repulsion between protons.

<details><summary>Details</summary>

### Where the force comes from

[Quantum chromodynamics](../Interactions/Readme.md) confines quarks into protons and neutrons (see [Elementary particles](./Elementary-Particles.md)). Each nucleon is color-neutral, so — like two neutral atoms — two nucleons feel almost no force at large distance. But their quark clouds polarize each other, leaving a **residual** attraction at short range, analogous to the van der Waals force between molecules (see [molecular bonds](./Atomic-Physics.md)). This residual force is what binds nuclei.

### Properties

- **Short range**: effective range ≈ 1–2 fm ($`1 \text{ fm} = 10^{-15}` m); beyond ~3 fm it is negligible. Yukawa explained the exponential falloff as exchange of a massive particle: $`V(r) \propto -e^{-r/\lambda}/r` with $`\lambda = \hbar/(m_\pi c) \approx 1.4` fm — the pion (mass ≈ 140 MeV) is the force carrier.
- **Repulsive core**: below ~0.5 fm the force turns strongly repulsive, which is why nuclei have a nearly constant density (saturation) rather than collapsing.
- **Charge independence**: approximately the same for p–p, n–n, and p–n pairs in the same spin-isospin channel.
- **Spin dependence**: the deuteron (p + n) is bound only in the spin-triplet channel ($`B = 2.22` MeV); the spin-singlet state is unbound. A tensor component mixes S and D waves.
- **Saturation**: each nucleon interacts mainly with its nearest neighbors, so total binding energy grows roughly as $`A`, not $`A^2`.

### The potential between two nucleons

For two protons, the effective potential is the sum of the short-range nuclear well and the long-range Coulomb repulsion $`V_C(r) = 1.44 \text{ MeV·fm}/r`:

```math
V(r) \approx -V_0\, \frac{e^{-r/\lambda}}{r/\lambda} + \frac{1.44 \text{ MeV·fm}}{r}
```

<svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg" style="max-width:560px">
  <line x1="50" y1="40" x2="50" y2="312" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="152" x2="510" y2="152" stroke="#333" stroke-width="1.5"/>
  <text x="20" y="176" font-size="11" fill="#333" transform="rotate(-90,20,176)">V (MeV)</text>
  <text x="280" y="325" font-size="11" fill="#333" text-anchor="middle">r (fm)</text>
  <text x="42" y="44" font-size="10" fill="#555" text-anchor="end">+35</text>
  <text x="42" y="156" font-size="10" fill="#555" text-anchor="end">0</text>
  <text x="42" y="316" font-size="10" fill="#555" text-anchor="end">−50</text>
  <line x1="140" y1="152" x2="140" y2="156" stroke="#333"/>
  <text x="140" y="168" font-size="10" fill="#555" text-anchor="middle">1</text>
  <line x1="230" y1="152" x2="230" y2="156" stroke="#333"/>
  <text x="230" y="168" font-size="10" fill="#555" text-anchor="middle">2</text>
  <line x1="320" y1="152" x2="320" y2="156" stroke="#333"/>
  <text x="320" y="168" font-size="10" fill="#555" text-anchor="middle">3</text>
  <line x1="410" y1="152" x2="410" y2="156" stroke="#333"/>
  <text x="410" y="168" font-size="10" fill="#555" text-anchor="middle">4</text>
  <line x1="500" y1="152" x2="500" y2="156" stroke="#333"/>
  <text x="500" y="168" font-size="10" fill="#555" text-anchor="middle">5</text>
  <path d="M 86 40 L 99 184 L 113 258 L 131 290 L 149 280 L 176 232 L 212 184 L 248 158 L 293 144 L 347 155 L 410 152 L 500 152" fill="none" stroke="#2266cc" stroke-width="2.5"/>
  <path d="M 95 146 L 140 147 L 185 149 L 230 150 L 320 150 L 410 151 L 500 151" fill="none" stroke="#cc3333" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="50" y1="159" x2="500" y2="159" stroke="#888" stroke-width="1" stroke-dasharray="2,3"/>
  <text x="505" y="163" font-size="10" fill="#888">−2.2 MeV (deuteron)</text>
  <text x="150" y="250" font-size="11" fill="#2266cc">nuclear well (Yukawa):</text>
  <text x="150" y="264" font-size="10" fill="#2266cc">depth ≈ 40–100 MeV, range ≈ 1–2 fm</text>
  <text x="300" y="130" font-size="11" fill="#cc3333">Coulomb repulsion 1.44 MeV·fm / r</text>
  <text x="300" y="118" font-size="9" fill="#cc3333">(small for p–p, but ≈ 30 MeV for α + heavy daughter)</text>
  <text x="86" y="34" font-size="10" fill="#2266cc" text-anchor="middle">repulsive core</text>
</svg>

The Coulomb tail looks tiny on this scale — but it is the whole story of [alpha decay](#radioactivity) and fission: for an $`\alpha` particle facing a heavy daughter ($`Z \approx 90`), the same $`1/r` term reaches ≈ 30 MeV at the nuclear surface, forming a barrier that the $`\alpha` can only escape by [quantum tunneling](../Quantum-Mechanics/Quantum-Dynamics.md).

### Example: why the deuteron is fragile

The deuteron's binding energy (2.22 MeV) is tiny compared with typical nuclear wells (~40 MeV) because it is bound only by the tensor part of the force in the spin-triplet channel — there is no bound p–p or n–n nucleus. This is direct evidence that the nuclear force depends on spin and isospin, not just position.

> **Authoritative sources**
> - [Krane, *Introductory Nuclear Physics*, Ch. 4 "The force between nucleons"](https://www.wiley.com/en-us/Introductory+Nuclear+Physics-p-9780471805533)
> - [Yukawa, *On the Interaction of Elementary Particles* (1935)](https://doi.org/10.1143/PTP.17.1)

<details><summary>Example problem</summary>

Yukawa proposed that a force of range $`\lambda` is carried by a particle of mass $`m = \hbar/(\lambda c)`. The nuclear force has range ≈ 1.4 fm. Estimate the mass of its carrier, in MeV/$`c^2`. (Use $`\hbar c = 197.3` MeV·fm.)

<details><summary>Solution</summary>

```math
m c^2 = \frac{\hbar c}{\lambda} = \frac{197.3 \text{ MeV·fm}}{1.4 \text{ fm}} \approx 141 \text{ MeV}
```

This matches the pion mass ($`m_{\pi} c^2 \approx 140` MeV) — the prediction that led to the discovery of the pion in 1947, and the first concrete picture of a force as particle exchange (see [Elementary particles](./Elementary-Particles.md)).

</details>

</details>

</details>

## Nuclear structure: liquid drop and shell models

**Definition.** A nucleus with $`Z` protons and $`N` neutrons (mass number $`A = Z + N`) is a quantum bound state of $`A` nucleons. Its binding energy is described by two complementary models: the **liquid drop** (collective, like an incompressible fluid) and the **shell model** (independent nucleons filling quantized orbits, like electrons in atoms).

<details><summary>Details</summary>

### Step 1: the liquid drop model

Because the nuclear force is short-ranged and saturating, a nucleus behaves like a droplet of incompressible fluid: each nucleon contributes a fixed volume energy, only surface nucleons lose neighbors, protons repel each other via Coulomb, and the [Pauli exclusion principle](../Quantum-Mechanics/Quantum-Many-Body.md) penalizes proton–neutron imbalance. The Bethe–Weizsäcker semi-empirical mass formula:

```math
B(A,Z) = a_V A - a_S A^{2/3} - a_C \frac{Z(Z-1)}{A^{1/3}} - a_A \frac{(A-2Z)^2}{A} + \delta(A,Z)
```

with $`a_V \approx 15.8` MeV (volume), $`a_S \approx 18.3` MeV (surface), $`a_C \approx 0.714` MeV (Coulomb), $`a_A \approx 23.2` MeV (asymmetry), and a pairing term $`\delta = \pm 12/\sqrt{A}` (positive for even–even nuclei, negative for odd–odd, zero for odd $`A`).

**Example.** For iron-56 ($`A = 56`, $`Z = 26`): volume term $`15.8 \times 56 = 884.8`; surface $`18.3 \times 56^{2/3} = 267.9`; Coulomb $`0.714 \times 26 \times 25 / 56^{1/3} = 121.3`; asymmetry $`23.2 \times 16/56 = 6.6`; pairing $`+1.6`. Total $`B \approx 490.6` MeV, i.e. $`B/A \approx 8.76` MeV — within 0.4% of the measured 8.79 MeV.

### Step 2: where the liquid drop fails — magic numbers

The liquid drop formula predicts binding energy varying smoothly with $`Z` and $`N`. But experiment shows certain nuclei are exceptionally stable and abundant: those with

```math
N \text{ or } Z = 2,\ 8,\ 20,\ 28,\ 50,\ 82,\ 126
```

the **magic numbers**. Nuclei with both $`N` and $`Z` magic (doubly magic: $`{}^4`He, $`{}^{16}`O, $`{}^{40}`Ca, $`{}^{48}`Ca, $`{}^{208}`Pb) are spherical, rigid, and tightly bound. A smooth droplet model cannot explain this — just as classical physics could not explain the discrete spectral lines that revealed [electron shells](./Atomic-Physics.md).

### Step 3: the shell model

The **nuclear shell model** (Mayer and Jensen, 1949) treats each nucleon as moving independently in the average potential well created by all the others (a Woods–Saxon well, similar in spirit to the electron shells of [atomic physics](./Atomic-Physics.md)). Because nucleons are fermions, the [Pauli exclusion principle](../Quantum-Mechanics/Quantum-Many-Body.md) forces them to fill discrete levels: closed shells correspond to the magic numbers.

The crucial difference from atoms is the **spin–orbit coupling**: the nuclear spin–orbit splitting is strong and has the *opposite* sign to the atomic case (where it is a small relativistic effect). A level with orbital angular momentum $`\ell` splits into $`j = \ell + 1/2` (lower) and $`j = \ell - 1/2` (higher), and the large gaps after the lowered $`j = \ell + 1/2` levels reproduce the magic numbers 28, 50, 82, and 126.

<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg" style="max-width:440px">
  <text x="220" y="18" font-size="12" fill="#333" text-anchor="middle">Spin–orbit splitting of the 1f shell (magic number 28)</text>
  <line x1="60" y1="105" x2="160" y2="105" stroke="#222" stroke-width="2.5"/>
  <text x="110" y="97" font-size="11" fill="#222" text-anchor="middle">1f (no spin–orbit)</text>
  <text x="110" y="122" font-size="10" fill="#555" text-anchor="middle">10 states (ℓ=3, spin ±½)</text>
  <line x1="280" y1="60" x2="380" y2="60" stroke="#cc0000" stroke-width="2.5"/>
  <text x="330" y="52" font-size="11" fill="#cc0000" text-anchor="middle">1f₅⁄₂ (higher)</text>
  <text x="330" y="77" font-size="10" fill="#cc0000" text-anchor="middle">6 states</text>
  <line x1="280" y1="150" x2="380" y2="150" stroke="#006600" stroke-width="2.5"/>
  <text x="330" y="142" font-size="11" fill="#006600" text-anchor="middle">1f₇⁄₂ (lower)</text>
  <text x="330" y="167" font-size="10" fill="#006600" text-anchor="middle">8 states</text>
  <line x1="160" y1="105" x2="280" y2="60" stroke="#999" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="160" y1="105" x2="280" y2="150" stroke="#999" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="225" y="95" font-size="10" fill="#555">strong splitting,</text>
  <text x="225" y="108" font-size="10" fill="#555">opposite sign to atoms</text>
  <text x="400" y="154" font-size="10" fill="#006600">← filling these 8 states</text>
  <text x="400" y="167" font-size="10" fill="#006600">gives the gap at Z, N = 28</text>
</svg>

The shell model explains why $`{}^{4}`He (closed 1s shell), $`{}^{16}`O (closed 1p shell), and the calcium isotopes ($`Z = 20`) are so stable, and why neutron shell closures at $`N = 126` shape the abundance peaks of the heavy elements formed in [nucleosynthesis](./Cosmology.md).

> **Authoritative sources**
> - [Krane, *Introductory Nuclear Physics*, Ch. 5 "Nuclear models"](https://www.wiley.com/en-us/Introductory+Nuclear+Physics-p-9780471805533)
> - [Mayer, *On Closed Shells in Nuclei* (Phys. Rev. 74, 1948)](https://doi.org/10.1103/PhysRev.74.235)
> - [Weizsäcker, *Zur Theorie der Kernmassen* (1935)](https://doi.org/10.1007/BF01337700)

<details><summary>Example problem</summary>

The bottom of the valley of stability is well approximated by $`Z = A / \left(2 + \frac{a_C}{2 a_A} A^{2/3}\right)`. Predict the most stable $`Z` for $`A = 120` (use $`a_C = 0.714`, $`a_A = 23.2`), and identify the element.

<details><summary>Solution</summary>

$`A^{2/3} = 120^{2/3} \approx 24.3`, so the denominator is $`2 + \frac{0.714}{46.4} \times 24.3 = 2 + 0.374 = 2.374`.

```math
Z = \frac{120}{2.374} \approx 50.5 \Rightarrow Z = 50
```

$`Z = 50` is tin — and 50 is a magic number. Tin has the largest number of stable isotopes (10) of any element, a direct signature of the shell closure.

</details>

</details>

</details>

## Binding energy: the energy landscape of fission and fusion

**Definition.** The binding energy per nucleon $`B/A` measures how tightly a nucleus is bound. Energy is released by any rearrangement — fission or fusion — that moves nuclei **up** the $`B/A` curve toward its maximum at iron.

<details><summary>Details</summary>

### Step 1: the curve

Plotting $`B/A` against mass number $`A` gives the most important single picture in nuclear energy physics:

<svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" style="max-width:560px">
  <line x1="60" y1="20" x2="60" y2="300" stroke="#333" stroke-width="1.5"/>
  <line x1="60" y1="300" x2="525" y2="300" stroke="#333" stroke-width="1.5"/>
  <text x="290" y="330" font-size="11" fill="#333" text-anchor="middle">mass number A</text>
  <text x="18" y="160" font-size="11" fill="#333" transform="rotate(-90,18,160)">B/A (MeV per nucleon)</text>
  <text x="52" y="304" font-size="10" fill="#555" text-anchor="end">0</text>
  <text x="52" y="244" font-size="10" fill="#555" text-anchor="end">2</text>
  <text x="52" y="188" font-size="10" fill="#555" text-anchor="end">4</text>
  <text x="52" y="132" font-size="10" fill="#555" text-anchor="end">6</text>
  <text x="52" y="76" font-size="10" fill="#555" text-anchor="end">8</text>
  <text x="52" y="24" font-size="10" fill="#555" text-anchor="end">10</text>
  <line x1="60" y1="300" x2="66" y2="300" stroke="#333"/>
  <text x="60" y="316" font-size="10" fill="#555" text-anchor="middle">0</text>
  <line x1="152" y1="300" x2="152" y2="304" stroke="#333"/>
  <text x="152" y="316" font-size="10" fill="#555" text-anchor="middle">50</text>
  <line x1="244" y1="300" x2="244" y2="304" stroke="#333"/>
  <text x="244" y="316" font-size="10" fill="#555" text-anchor="middle">100</text>
  <line x1="336" y1="300" x2="336" y2="304" stroke="#333"/>
  <text x="336" y="316" font-size="10" fill="#555" text-anchor="middle">150</text>
  <line x1="428" y1="300" x2="428" y2="304" stroke="#333"/>
  <text x="428" y="316" font-size="10" fill="#555" text-anchor="middle">200</text>
  <line x1="520" y1="300" x2="520" y2="304" stroke="#333"/>
  <text x="520" y="316" font-size="10" fill="#555" text-anchor="middle">250</text>
  <polyline points="64,269 66,221 67,102 71,151 75,103 82,85 89,77 97,75 104,69 112,63 119,62 134,61 148,58 163,54 174,54 198,56 226,59 257,61 281,62 310,65 336,68 391,75 423,78 446,81 492,88" fill="none" stroke="#2266cc" stroke-width="2.5"/>
  <circle cx="163" cy="54" r="4" fill="#aa2222"/>
  <text x="172" y="48" font-size="11" fill="#aa2222">peak: Fe-56 / Ni-62 ≈ 8.8 MeV</text>
  <line x1="112" y1="150" x2="152" y2="72" stroke="#557722" stroke-width="1.5" marker-end="url(#arrG)"/>
  <text x="95" y="165" font-size="10" fill="#557722">fusion: light nuclei</text>
  <text x="95" y="178" font-size="10" fill="#557722">climb toward the peak</text>
  <line x1="470" y1="105" x2="290" y2="72" stroke="#775522" stroke-width="1.5" marker-end="url(#arrG)"/>
  <text x="400" y="122" font-size="10" fill="#775522">fission: heavy nuclei</text>
  <text x="400" y="135" font-size="10" fill="#775522">descend toward the peak</text>
  <defs>
    <marker id="arrG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0,0 8,3 0,6" fill="#775522"/>
    </marker>
  </defs>
</svg>

Three features to read off the curve:

1. **Rapid rise** up to $`A \approx 20`: each added nucleon is grabbed by the short-range force (this is why [nucleosynthesis](./Cosmology.md) in stars releases energy).
2. **Broad peak at iron** ($`B/A \approx 8.8` MeV): iron-group nuclei are the most tightly bound — the ash of nuclear burning, and the endpoint of exothermic fusion.
3. **Slow decline** beyond $`A \approx 60`: the Coulomb repulsion of the growing proton population wins out (the $`Z^2/A^{1/3}` term in the mass formula), so very heavy nuclei are less bound per nucleon and can release energy by splitting.

### Step 2: reading energy release off the curve

The energy released by a rearrangement is the total binding energy gained:

```math
E_{\text{released}} = \Delta\!\left(\frac{B}{A}\right) \times A
```

- **Fission**: uranium at $`B/A \approx 7.6` MeV splitting into fragments near $`A \approx 120` at $`B/A \approx 8.5` MeV gains ≈ 0.9 MeV per nucleon → ≈ 200 MeV per fission.
- **Fusion**: four protons → one $`{}^4`He climbs from 0 (free protons) to 7.07 MeV per nucleon; after paying the proton→neutron conversions and the positron rest masses, ≈ 26.7 MeV per helium made (this is the Sun's energy source).

### Step 3: energy per kilogram

Because nuclear binding energies (~MeV per nucleon) are ~10⁶ times larger than chemical bond energies (~eV per molecule), nuclear fuels are enormously more energy-dense than chemical ones:

<table>
<tr><th>Energy source</th><th>Energy density (J/kg)</th><th>Mechanism</th></tr>
<tr><td>Coal (chemical)</td><td>≈ 3 × 10⁷</td><td>Electron rearrangement (eV-scale bonds)</td></tr>
<tr><td>U-235 fission</td><td>≈ 8 × 10¹³</td><td>Heavy nucleus splits toward the peak of the curve</td></tr>
<tr><td>D–T fusion</td><td>≈ 3.4 × 10¹⁴</td><td>Light nuclei climb toward the peak of the curve</td></tr>
</table>

**Applications.** Fission reactors exploit the neutron multiplication of the fission reaction (see [Nuclear reactions](#nuclear-reactions)) to sustain a controlled chain reaction. Fusion powers the stars (see [Cosmology](./Cosmology.md)) and drives terrestrial fusion-energy research, where the D–T reaction is the leading candidate because it has the largest cross-section at reachable temperatures.

> **Authoritative sources**
> - [Krane, *Introductory Nuclear Physics*, Ch. 13 "Nuclear fission" and Ch. 14 "Nuclear fusion"](https://www.wiley.com/en-us/Introductory+Nuclear+Physics-p-9780471805533)

<details><summary>Example problem</summary>

Verify the energy density of D–T fusion fuel. One D–T reaction releases 17.6 MeV; the reactants (deuteron + triton) have a total mass of 5 u. (1 u = 1.6605 × 10⁻²⁷ kg; 1 MeV = 1.602 × 10⁻¹³ J.)

<details><summary>Solution</summary>

Energy per reaction: $`17.6 \times 1.602 \times 10^{-13} = 2.82 \times 10^{-12}` J.

Mass per reaction: $`5 \times 1.6605 \times 10^{-27} = 8.30 \times 10^{-27}` kg.

```math
\frac{E}{m} = \frac{2.82 \times 10^{-12}}{8.30 \times 10^{-27}} \approx 3.4 \times 10^{14} \text{ J/kg}
```

Compare coal at $`3 \times 10^7` J/kg: fusion fuel is about 10 million times more energy-dense — the direct macroscopic consequence of the MeV-vs-eV scale difference between nuclear and chemical binding.

</details>

</details>

</details>

## Nuclear reactions

**Definition.** A nuclear reaction transforms one set of nuclei into another, conserving charge, baryon number, lepton number, energy, and momentum. Its energy balance is the **Q-value**: $`Q = (m_i - m_f)c^2`, positive for exothermic reactions.

<details><summary>Details</summary>

### Step 1: the conservation laws

Whatever happens in a nuclear reaction, the books must balance: total charge $`Z`, total baryon number $`A` (for nucleons), lepton number, energy, and momentum are conserved. Writing a reaction is therefore bookkeeping: match the superscripts (mass numbers) and subscripts (atomic numbers) on both sides.

### Step 2: the main reaction types

- **Elastic scattering**: the projectile and target exchange kinetic energy but keep their identity and internal state: $`p + p \to p + p`. This is how Rutherford discovered the nucleus, and how neutron moderators slow neutrons in reactors.
- **Inelastic scattering**: the target is left in an excited state: $`n + {}^{12}\text{C} \to n' + {}^{12}\text{C}^*`, followed by $`{}^{12}\text{C}^* \to {}^{12}\text{C} + \gamma` (4.44 MeV). The outgoing neutron carries less energy.
- **Charge-exchange (transfer) reactions**: a nucleon is exchanged, changing the product's species: $`p + {}^{14}\text{N} \to n + {}^{14}\text{O}` is a (p,n) reaction that converts a target proton into a neutron, moving the residual nucleus one step up in $`Z` — not mere scattering, since the projectile changes identity too.
- **Fusion**: light nuclei combine: $`{}^{2}\text{H} + {}^{3}\text{H} \to {}^{4}\text{He} + n + 17.6` MeV. Coulomb repulsion makes the rate extremely temperature-sensitive (see the [binding energy curve](#binding-energy-the-energy-landscape-of-fission-and-fusion) for why it releases energy).
- **Fission**: a heavy nucleus splits: $`n + {}^{235}\text{U} \to {}^{141}\text{Ba} + {}^{92}\text{Kr} + 3n`, releasing ≈ 200 MeV and 2–3 neutrons — the neutrons can fission further nuclei, enabling the chain reaction at the heart of reactors.

### Step 3: the Q-value

The Q-value is the rest-mass difference converted to kinetic energy:

```math
Q = \left(\sum m_i - \sum m_f\right) c^2
```

**Example.** For the D–T reaction, using atomic masses $`m({}^{2}\text{H}) = 2.014102` u, $`m({}^{3}\text{H}) = 3.016049` u, $`m({}^{4}\text{He}) = 4.002603` u, $`m(n) = 1.008665` u: $`m_i = 5.017522` u, $`m_f = 5.011268` u, so $`Q = 0.018883 \times 931.5 \approx 17.6` MeV — exothermic, as the binding-energy curve predicts.

> **Authoritative sources**
> - [Krane, *Introductory Nuclear Physics*, Ch. 11 "Nuclear reactions"](https://www.wiley.com/en-us/Introductory+Nuclear+Physics-p-9780471805533)
> - [Particle Data Group, Review of Particle Physics](https://pdg.lbl.gov/)

<details><summary>Example problem</summary>

The proton–proton chain in the Sun converts four protons into one helium-4 nucleus, two positrons, two neutrinos, and energy. Using $`m({}^{4}\text{He}) = 4.002603` u and $`m(p) = 1.007276` u, compute the total energy released per helium-4 nucleus formed. (Ignore the neutrino rest masses; 1 u = 931.5 MeV/$`c^2`.)

<details><summary>Solution</summary>

Initial mass: $`4 \times 1.007276 = 4.029104` u.

Final rest mass: $`4.002603` u — the helium-4 atomic mass already accounts for the two electrons whose places the two positrons effectively take (the positron masses cancel the missing electron masses in the bookkeeping).

```math
Q = (4.029104 - 4.002603) \times 931.5 = 0.026501 \times 931.5 \approx 24.7 \text{ MeV}
```

Each positron then annihilates with an electron, releasing $`2 \times 0.511 = 1.022` MeV; the two annihilations add $`2 \times 1.022 = 2.04` MeV, bringing the total to $`24.7 + 2.0 \approx 26.7` MeV — the figure quoted for the Sun's energy source (see [Cosmology](./Cosmology.md)).

</details>

</details>

</details>

## Radioactivity

**Definition.** Radioactivity is the spontaneous transformation of an unstable nucleus: **alpha** decay (strong + Coulomb, tunneling), **beta** decay (weak interaction), or **gamma** decay (electromagnetic). The decay rate follows $`N(t) = N_0 e^{-\lambda t}` with half-life $`t_{1/2} = \ln 2/\lambda`.

<details><summary>Details</summary>

### Step 1: alpha decay — tunneling through the Coulomb barrier

An $`\alpha` particle (a helium-4 nucleus) is preformed inside a heavy nucleus, trapped by the Coulomb barrier described in [the nuclear force section](#the-nuclear-force). Classically it could never escape; quantum mechanically it [tunnels](../Quantum-Mechanics/Quantum-Dynamics.md) through the barrier with a tiny but nonzero probability per collision — which is why alpha half-lives range from microseconds to billions of years for nearly the same decay energy (the Geiger–Nuttall law).

<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" style="max-width:520px">
  <line x1="40" y1="190" x2="500" y2="190" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="60" x2="40" y2="270" stroke="#333" stroke-width="1.5"/>
  <text x="270" y="292" font-size="11" fill="#333" text-anchor="middle">r (fm)</text>
  <text x="16" y="165" font-size="11" fill="#333" transform="rotate(-90,16,165)">V (MeV)</text>
  <line x1="150" y1="190" x2="150" y2="194" stroke="#333"/>
  <text x="150" y="206" font-size="10" fill="#555" text-anchor="middle">5</text>
  <line x1="260" y1="190" x2="260" y2="194" stroke="#333"/>
  <text x="260" y="206" font-size="10" fill="#555" text-anchor="middle">10</text>
  <line x1="370" y1="190" x2="370" y2="194" stroke="#333"/>
  <text x="370" y="206" font-size="10" fill="#555" text-anchor="middle">15</text>
  <line x1="480" y1="190" x2="480" y2="194" stroke="#333"/>
  <text x="480" y="206" font-size="10" fill="#555" text-anchor="middle">20</text>
  <rect x="238" y="98" width="242" height="79" fill="#ff6666" opacity="0.15"/>
  <path d="M 62 270 L 238 270 L 238 98 L 260 107 L 282 115 L 304 121 L 348 131 L 392 138 L 436 144 L 480 148" fill="none" stroke="#2266cc" stroke-width="2.5"/>
  <line x1="62" y1="177" x2="500" y2="177" stroke="#aa2222" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="470" y="171" font-size="10" fill="#aa2222" text-anchor="end">Eα = 4.2 MeV</text>
  <text x="150" y="250" font-size="10" fill="#2266cc" text-anchor="middle">α preformed in the well</text>
  <text x="360" y="90" font-size="10" fill="#cc3333" text-anchor="middle">Coulomb barrier ≈ 29 MeV at R ≈ 9 fm</text>
  <text x="360" y="160" font-size="10" fill="#cc3333" text-anchor="middle">tunneling region</text>
</svg>

**Example.** $`{}^{238}`U $`\to {}^{234}`Th $`+ \alpha + 4.27` MeV, with $`t_{1/2} = 4.5 \times 10^9` yr — long because the 4.2 MeV $`\alpha` sits far below the ≈ 29 MeV barrier top.

### Step 2: beta decay — the weak interaction at work

In beta-minus decay a neutron converts to a proton via the [weak interaction](../Interactions/Readme.md), emitting an electron and an antineutrino through a $`W^-` boson (see [Elementary particles](./Elementary-Particles.md)):

```math
n \to p + e^- + \bar{\nu}_e
```

Beta decay moves a nucleus along the valley of stability (changing $`N` and $`Z` at fixed $`A`) and is the dominant decay mode of the neutron-rich fission fragments. The neutrino carries away variable energy — the observation of its continuous electron spectrum was the first evidence for the neutrino.

### Step 3: gamma decay — photons from nuclear levels

After alpha or beta decay the daughter nucleus is often left in an excited state. It sheds the excitation by emitting a high-energy photon — nuclear [electromagnetic radiation](../Interactions/Electromagnetism/Readme.md) at the MeV scale. Gamma decay changes neither $`Z` nor $`A`.

**Example.** $`{}^{99m}`Tc $`\to {}^{99}`Tc $`+ \gamma` (140 keV, $`t_{1/2} = 6.0` h): the workhorse of nuclear medicine, injected into patients for imaging because the 140 keV photon escapes the body and is easily detected.

### Step 4: a complete decay scheme

The classic decay scheme of cobalt-60 ties all three ideas together: the beta decay creates the excited daughter, and the gamma cascade de-excites it.

<svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" style="max-width:560px">
  <text x="280" y="20" font-size="12" fill="#333" text-anchor="middle">Decay scheme of cobalt-60</text>
  <line x1="80" y1="260" x2="200" y2="260" stroke="#222" stroke-width="2.5"/>
  <text x="140" y="280" font-size="11" fill="#222" text-anchor="middle">⁶⁰Co  0 (5⁺)</text>
  <text x="140" y="294" font-size="10" fill="#555" text-anchor="middle">t½ = 5.27 y</text>
  <line x1="300" y1="80" x2="420" y2="80" stroke="#222" stroke-width="2.5"/>
  <text x="430" y="84" font-size="11" fill="#222">2505.7 keV (4⁺)</text>
  <line x1="300" y1="164" x2="420" y2="164" stroke="#222" stroke-width="2.5"/>
  <text x="430" y="168" font-size="11" fill="#222">1332.5 keV (2⁺)</text>
  <line x1="300" y1="260" x2="420" y2="260" stroke="#222" stroke-width="2.5"/>
  <text x="430" y="264" font-size="11" fill="#222">⁶⁰Ni  0 (0⁺)</text>
  <line x1="200" y1="260" x2="298" y2="82" stroke="#0066cc" stroke-width="2" marker-end="url(#arrB)"/>
  <text x="215" y="200" font-size="10" fill="#0066cc">β⁻ (E<tspan baseline-shift="sub" font-size="8">max</tspan> = 0.318 MeV)</text>
  <line x1="340" y1="82" x2="340" y2="162" stroke="#cc6600" stroke-width="2" marker-end="url(#arrG2)"/>
  <text x="348" y="120" font-size="10" fill="#cc6600">γ 1173 keV</text>
  <line x1="380" y1="166" x2="380" y2="258" stroke="#cc6600" stroke-width="2" marker-end="url(#arrG2)"/>
  <text x="388" y="215" font-size="10" fill="#cc6600">γ 1332 keV</text>
  <defs>
    <marker id="arrB" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0,0 8,3 0,6" fill="#0066cc"/>
    </marker>
    <marker id="arrG2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0,0 8,3 0,6" fill="#cc6600"/>
    </marker>
  </defs>
</svg>

Note the division of labor: the **weak** interaction (β⁻) changes the species of nucleus; the **electromagnetic** interaction (the two γ's) then drains the excitation energy of the daughter $`{}^{60}`Ni. The two sharp gamma lines (1173 and 1332 keV) are used to calibrate gamma detectors.

### Step 5: the decay law and radiometric dating

Each unstable nucleus decays with a fixed probability per unit time $`\lambda`, independent of age and chemistry:

```math
N(t) = N_0 e^{-\lambda t}, \qquad t_{1/2} = \frac{\ln 2}{\lambda}
```

**Example.** Carbon-14 ($`t_{1/2} = 5730` yr) is produced in the atmosphere and taken up by living organisms. When they die, the intake stops and the $`{}^{14}`C/$`{}^{12}`C ratio decays exponentially — measuring it dates organic remains up to ~50 000 years (see the example problem below).

> **Authoritative sources**
> - [Krane, *Introductory Nuclear Physics*, Ch. 6 "Radioactive decay", Ch. 8 "Alpha decay", Ch. 9 "Beta decay", Ch. 10 "Gamma decay"](https://www.wiley.com/en-us/Introductory+Nuclear+Physics-p-9780471805533)
> - [Geiger & Nuttall, *The ranges of the α particles from radioactive substances* (1911)](https://doi.org/10.1080/14786440908637156)

<details><summary>Example problem</summary>

An archaeological wooden sample has $`{}^{14}\text{C}/{}^{12}\text{C}` activity equal to one quarter of that of living wood. How old is it? ($`t_{1/2} = 5730` yr.)

<details><summary>Solution</summary>

The activity is proportional to the number of $`{}^{14}`C nuclei, so $`N/N_0 = 1/4 = e^{-\lambda t}`.

```math
t = \frac{\ln 4}{\lambda} = 2\, t_{1/2} = 2 \times 5730 \approx 11\,460 \text{ yr}
```

Each halving of the activity adds one half-life: two halvings → two half-lives.

</details>

</details>

</details>

## Interactive simulation

Explore the binding-energy curve interactively: slide the mass number to see where a nucleus sits on the curve, and read off the energy released by fissioning it or by fusing two copies of it. Near iron, neither direction pays.

<iframe src="./Nuclear-Physics.simulation.html" title="Interactive binding-energy explorer: fission and fusion energy release"></iframe>

## Quiz

<details><summary>Example problem</summary>

A uranium-235 nucleus absorbs a thermal neutron and fissions into barium-141 and krypton-92, releasing 3 neutrons. Given the atomic masses: $`m({}^{235}\text{U}) = 235.044` u, $`m(n) = 1.009` u, $`m({}^{141}\text{Ba}) = 140.914` u, $`m({}^{92}\text{Kr}) = 91.926` u, compute the Q-value of the reaction in MeV. (1 u = 931.5 MeV/$`c^2`.)

<details><summary>Solution</summary>

The reaction is: $`n + {}^{235}\text{U} \to {}^{141}\text{Ba} + {}^{92}\text{Kr} + 3n`.

Initial mass: $`m_i = m(n) + m({}^{235}\text{U}) = 1.009 + 235.044 = 236.053` u.

Final mass: $`m_f = m({}^{141}\text{Ba}) + m({}^{92}\text{Kr}) + 3\,m(n) = 140.914 + 91.926 + 3(1.009) = 235.867` u.

Mass defect: $`\Delta m = m_i - m_f = 236.053 - 235.867 = 0.186` u.

Q-value: $`Q = \Delta m \times 931.5 = 0.186 \times 931.5 \approx 173` MeV.

Two remarks. First, using atomic masses is legitimate here: the 92 electrons of the uranium atom cancel exactly against the 56 + 36 = 92 electrons of the barium and krypton atoms, because total $`Z` is conserved. Second, the measured fission energy is ≈ 200 MeV rather than 173 MeV because the neutron-rich fragments $`{}^{141}`Ba and $`{}^{92}`Kr are radioactive: their subsequent beta decays and gamma emissions add ≈ 30 MeV, and real fission produces a range of fragment splits, not just this symmetric-ish channel.

</details>

</details>

</details>

