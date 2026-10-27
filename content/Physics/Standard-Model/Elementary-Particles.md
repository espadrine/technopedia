# Elementary Particles

Elementary particles are the irreducible excitations of quantum fields: the smallest known constituents of matter and the mediators of the fundamental interactions. This page is relevant whenever one must identify the particle content of a process, compute a scattering amplitude, or understand the gauge structure that constrains all particle interactions.

The formalism in which these particles are described is [quantum field theory](../Quantum-Mechanics/Quantum-Field-Theory.md); the forces they mediate are catalogued in the [Interactions](../Interactions/Readme.md) category; and the strong-interaction bound states they form (hadrons, nuclei) are the subject of [nuclear physics](./Nuclear-Physics.md).

> **Authoritative sources**
> - [Particle Data Group, Review of Particle Physics](https://pdg.lbl.gov/)
> - [Peskin & Schroeder, *An Introduction to Quantum Field Theory*](https://en.wikipedia.org/wiki/An_Introduction_to_Quantum_Field_Theory)

## Gauge structure

**Definition.** The Standard Model is a quantum field theory with gauge group SU(3)×SU(2)×U(1). Matter fields (fermions) transform under representations of this group; force carriers (gauge bosons) are the connections associated with each factor. Electric charge is fixed by the quantum numbers through the Gell-Mann–Nishijima relation $`Q = T_3 + Y/2`.

<details><summary>Details</summary>

**Step 1: three gauge factors, three interactions.** The gauge group has three factors, each corresponding to one interaction:

1. **SU(3)** — the strong interaction (QCD). Acts on the "color" degree of freedom of quarks. The gauge bosons are the eight gluons.
2. **SU(2)** — the weak isospin. Acts on left-handed fermion doublets. The gauge bosons are W¹, W², W³ (which mix to give W⁺, W⁻, and a component of Z⁰).
3. **U(1)** — hypercharge. Acts on all fermions with a charge assignment. The gauge boson B mixes with W³ to give the photon (γ) and the Z⁰ boson.

<svg viewBox="0 0 580 300" xmlns="http://www.w3.org/2000/svg" style="max-width:580px">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L6,3 L0,6 Z" fill="#333"/>
    </marker>
  </defs>
  <text x="290" y="20" font-size="14" fill="#333" text-anchor="middle">Gauge group → gauge bosons → interaction</text>
  <rect x="20" y="40" width="120" height="44" rx="6" fill="#fde8e8" stroke="#dc2626"/>
  <text x="80" y="67" font-size="15" fill="#dc2626" text-anchor="middle">SU(3)</text>
  <line x1="140" y1="62" x2="198" y2="62" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="200" y="40" width="150" height="44" rx="6" fill="#fff" stroke="#999"/>
  <text x="275" y="67" font-size="14" fill="#333" text-anchor="middle">8 gluons g</text>
  <line x1="350" y1="62" x2="408" y2="62" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="410" y="40" width="150" height="44" rx="6" fill="#fde8e8" stroke="#dc2626"/>
  <text x="485" y="67" font-size="14" fill="#dc2626" text-anchor="middle">Strong (QCD)</text>
  <rect x="20" y="100" width="120" height="44" rx="6" fill="#e8f0fd" stroke="#2563eb"/>
  <text x="80" y="127" font-size="15" fill="#2563eb" text-anchor="middle">SU(2)</text>
  <line x1="140" y1="122" x2="198" y2="122" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="200" y="100" width="150" height="44" rx="6" fill="#fff" stroke="#999"/>
  <text x="275" y="127" font-size="14" fill="#333" text-anchor="middle">W¹, W², W³</text>
  <line x1="350" y1="122" x2="408" y2="122" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="410" y="100" width="150" height="44" rx="6" fill="#e8f0fd" stroke="#2563eb"/>
  <text x="485" y="127" font-size="14" fill="#2563eb" text-anchor="middle">Weak</text>
  <rect x="20" y="160" width="120" height="44" rx="6" fill="#e8fde8" stroke="#16a34a"/>
  <text x="80" y="187" font-size="15" fill="#16a34a" text-anchor="middle">U(1)</text>
  <line x1="140" y1="182" x2="198" y2="182" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="200" y="160" width="150" height="44" rx="6" fill="#fff" stroke="#999"/>
  <text x="275" y="187" font-size="14" fill="#333" text-anchor="middle">B</text>
  <line x1="350" y1="182" x2="408" y2="182" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="410" y="160" width="150" height="44" rx="6" fill="#e8fde8" stroke="#16a34a"/>
  <text x="485" y="187" font-size="14" fill="#16a34a" text-anchor="middle">Hypercharge</text>
  <rect x="60" y="224" width="460" height="44" rx="6" fill="#f5f0ff" stroke="#7c3aed"/>
  <text x="290" y="251" font-size="13" fill="#7c3aed" text-anchor="middle">After EWSB: W³ + B → Z⁰ + γ  (γ massless; W⁺, W⁻, Z⁰ massive)</text>
</svg>

**Step 2: charge from quantum numbers.** Each fermion carries a weak isospin $`T_3` and a hypercharge $`Y`. The electric charge is the combination $`Q = T_3 + Y/2` (the Gell-Mann–Nishijima relation). This single formula is what fixes the entire charge spectrum of the Standard Model.

*Worked example.* The left-handed quark doublet $`(u_L, d_L)` has hypercharge $`Y = 1/3`. The up quark has $`T_3 = +1/2`, so $`Q_u = 1/2 + (1/3)/2 = 2/3`. The down quark has $`T_3 = -1/2`, so $`Q_d = -1/2 + (1/3)/2 = -1/3`. The left-handed lepton doublet $`(\nu_L, \ell_L)` has $`Y = -1`: the neutrino gets $`Q_\nu = 1/2 + (-1)/2 = 0` and the charged lepton $`Q_\ell = -1/2 + (-1)/2 = -1`.

**Step 3: electroweak symmetry breaking.** Before symmetry breaking the gauge group is the full SU(2)×U(1). After the Higgs field acquires a vacuum expectation value (see the [Higgs boson](#higgs-boson) section), the unbroken subgroup is U(1)ₑₘ, whose gauge boson is the photon. The W⁺, W⁻, and Z⁰ acquire mass; the photon remains massless. The general mechanism (spontaneous symmetry breaking, the "eaten" degrees of freedom) is developed in the [gauge-symmetry section of the QFT page](../Quantum-Mechanics/Quantum-Field-Theory.md); here we only use its consequence for the particle content.

> **Authoritative sources**
> - [Gell-Mann & Nishijima, "The Conserved Vector Current Hypothesis" (1956)](https://en.wikipedia.org/wiki/Gell%E2%80%93Mann%E2%80%93Nishijima_relation)
> - [Glashow, "Partial-symmetries of weak interactions" (1961)](https://en.wikipedia.org/wiki/Electroweak_theory)

**Example problem.**

<details><summary>Problem</summary>

A left-handed fermion doublet has hypercharge $`Y = -1`. What are the electric charges of its two components, and which Standard Model doublet is it?

<details><summary>Solution</summary>

The two components have $`T_3 = +1/2` and $`T_3 = -1/2`. Using $`Q = T_3 + Y/2` with $`Y = -1`:

- Upper component: $`Q = 1/2 + (-1)/2 = 0` → a neutrino.
- Lower component: $`Q = -1/2 + (-1)/2 = -1` → a charged lepton.

A neutral/charged doublet with no color is a **lepton doublet** $`(\nu_L, \ell_L)`.

</details>
</details>

</details>

## Fermions (matter particles)

**Definition.** Fermions are spin-½ particles that obey the Pauli exclusion principle. They come in three generations, each with the same particle types but increasing mass.

<details><summary>Details</summary>

**Step 1: the three generations.** Each generation contains one quark doublet and one lepton doublet (plus right-handed singlets). The particle content is:

<table>
<tr><th>Type</th><th>1st gen</th><th>2nd gen</th><th>3rd gen</th></tr>
<tr><td>Up-type quark</td><td>u (+2/3)</td><td>c (+2/3)</td><td>t (+2/3)</td></tr>
<tr><td>Down-type quark</td><td>d (−1/3)</td><td>s (−1/3)</td><td>b (−1/3)</td></tr>
<tr><td>Charged lepton</td><td>e (−1)</td><td>μ (−1)</td><td>τ (−1)</td></tr>
<tr><td>Neutrino</td><td>νₑ</td><td>ν_μ</td><td>ν_τ</td></tr>
</table>

(Charges in units of the proton charge <i>e</i>.)

<svg viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg" style="max-width:580px">
  <text x="290" y="20" font-size="14" fill="#333" text-anchor="middle">Three generations: one quark doublet + one lepton doublet each</text>
  <rect x="20" y="36" width="170" height="180" rx="8" fill="#f8fafc" stroke="#94a3b8"/>
  <text x="105" y="56" font-size="14" fill="#334155" text-anchor="middle" font-weight="bold">Generation 1</text>
  <rect x="35" y="66" width="140" height="60" rx="5" fill="#fde8e8" stroke="#dc2626"/>
  <text x="105" y="84" font-size="12" fill="#dc2626" text-anchor="middle">quark doublet</text>
  <text x="105" y="104" font-size="13" fill="#333" text-anchor="middle">(u, d)</text>
  <rect x="35" y="134" width="140" height="60" rx="5" fill="#e8f0fd" stroke="#2563eb"/>
  <text x="105" y="152" font-size="12" fill="#2563eb" text-anchor="middle">lepton doublet</text>
  <text x="105" y="172" font-size="13" fill="#333" text-anchor="middle">(νₑ, e)</text>
  <rect x="205" y="36" width="170" height="180" rx="8" fill="#f8fafc" stroke="#94a3b8"/>
  <text x="290" y="56" font-size="14" fill="#334155" text-anchor="middle" font-weight="bold">Generation 2</text>
  <rect x="220" y="66" width="140" height="60" rx="5" fill="#fde8e8" stroke="#dc2626"/>
  <text x="290" y="84" font-size="12" fill="#dc2626" text-anchor="middle">quark doublet</text>
  <text x="290" y="104" font-size="13" fill="#333" text-anchor="middle">(c, s)</text>
  <rect x="220" y="134" width="140" height="60" rx="5" fill="#e8f0fd" stroke="#2563eb"/>
  <text x="290" y="152" font-size="12" fill="#2563eb" text-anchor="middle">lepton doublet</text>
  <text x="290" y="172" font-size="13" fill="#333" text-anchor="middle">(ν_μ, μ)</text>
  <rect x="390" y="36" width="170" height="180" rx="8" fill="#f8fafc" stroke="#94a3b8"/>
  <text x="475" y="56" font-size="14" fill="#334155" text-anchor="middle" font-weight="bold">Generation 3</text>
  <rect x="405" y="66" width="140" height="60" rx="5" fill="#fde8e8" stroke="#dc2626"/>
  <text x="475" y="84" font-size="12" fill="#dc2626" text-anchor="middle">quark doublet</text>
  <text x="475" y="104" font-size="13" fill="#333" text-anchor="middle">(t, b)</text>
  <rect x="405" y="134" width="140" height="60" rx="5" fill="#e8f0fd" stroke="#2563eb"/>
  <text x="475" y="152" font-size="12" fill="#2563eb" text-anchor="middle">lepton doublet</text>
  <text x="475" y="172" font-size="13" fill="#333" text-anchor="middle">(ν_τ, τ)</text>
  <line x1="40" y1="235" x2="530" y2="235" stroke="#333" stroke-width="1.5"/>
  <polygon points="530,230 542,235 530,240" fill="#333"/>
  <text x="290" y="252" font-size="12" fill="#333" text-anchor="middle">mass increases →</text>
</svg>

**Step 2: quarks vs. leptons.**
- **Quarks** carry color charge (triplet under SU(3)) and are confined: they never appear in isolation, only in color-neutral hadrons (see [nuclear physics](./Nuclear-Physics.md)).
- **Leptons** do not carry color charge and are never confined.
- **Neutrinos** are neutral and have tiny masses (see the [neutrinos](#neutrinos) subsection).

**Step 3: the mass hierarchy.** Within each type, mass increases sharply across generations: the top quark ($`m_t \approx 173` GeV) is about 10⁵ times heavier than the up quark, and the tau is about 3500 times heavier than the electron. The reason for this hierarchy is not explained by the Standard Model.

> **Authoritative sources**
> - [Particle Data Group, Review of Particle Physics](https://pdg.lbl.gov/)

**Example problem.**

<details><summary>Problem</summary>

The electron $`e^-` is a first-generation charged lepton. State its electric charge, its left-handed weak isospin, its color, and the gauge bosons it couples to.

<details><summary>Solution</summary>

- Electric charge: $`Q = -1`.
- Left-handed weak isospin: $`T_3 = -1/2` (it is the lower component of the $`(\nu_e, e)` doublet).
- Color: singlet (no color charge).
- It couples to the **photon** (electric charge), the **W⁻** (charged weak current: $`e_L \to \nu_{eL} + W^-`), the **Z⁰** (neutral weak current), and the **Higgs** (Yukawa coupling, gives it mass). It does not couple to gluons.

</details>
</details>

</details>

### Neutrinos

**Definition.** Neutrinos are electrically neutral, colorless leptons. In the minimal Standard Model they are massless; the observation of neutrino oscillations shows they have tiny, non-zero masses — the only confirmed physics beyond the minimal Standard Model.

<details><summary>Details</summary>

**Step 1: why they are special.** The minimal Standard Model contains only left-handed neutrinos and no right-handed partners, so no renormalizable mass term can be written for them. Neutrino oscillation experiments (Super-Kamiokande, SNO, 2002) show that a neutrino produced as one flavor (νₑ, ν_μ, ν_τ) is later detected as another, which is only possible if the flavor states are superpositions of states with different non-zero masses.

**Step 2: what this means.** The mass eigenstates (ν₁, ν₂, ν₃) differ from the flavor eigenstates by a mixing matrix (the PMNS matrix), exactly analogous to the CKM mixing of quarks. The measured mass-squared differences are $`\Delta m^2 \sim 10^{-3}` and $`\sim 10^{-5}` eV², so neutrino masses are at most a few tenths of an eV — many orders of magnitude below every other fermion.

**Step 3: open questions.** Whether neutrinos are Dirac or Majorana particles (i.e. whether the antineutrino is the same particle as the neutrino), and the absolute mass scale, are still open. These questions sit at the boundary with [cosmology](./Cosmology.md), where the sum of neutrino masses affects structure formation.

> **Authoritative sources**
> - [Super-Kamiokande, "Observation of Neutrino Oscillations" (1998)](https://en.wikipedia.org/wiki/Super-Kamiokande)
> - [PDG, Neutrino Masses and Mixing](https://pdg.lbl.gov/)

</details>

## Antiparticles

**Definition.** Every particle has an antiparticle with the same mass and spin but opposite values of all additive quantum numbers (electric charge, color, lepton number, baryon number). A particle that is its own antiparticle is called a self-conjugate (neutral) particle.

<details><summary>Details</summary>

**Step 1: the rule.** Charge conjugation flips the sign of every additive charge while leaving mass and spin unchanged. The antiparticle of the electron is the **positron** $`e^+` (charge +1, same mass 0.511 MeV); the antiparticle of the up quark is the **anti-up quark** $`\bar{u}` (charge −2/3, anti-color).

**Step 2: which particles are self-conjugate.** A particle can be its own antiparticle only if all its additive charges vanish. The photon, the Z⁰, and (in the minimal model) the neutrinos are neutral; the photon and Z⁰ are self-conjugate. The Higgs boson is also its own antiparticle.

**Step 3: annihilation.** When a particle meets its antiparticle they can annihilate into bosons, conserving all charges. An electron and positron annihilate into two photons ($`e^+ e^- \to \gamma \gamma`); a quark and antiquark can annihilate into gluons or a photon. This is how matter and antimatter are created and destroyed in equal amounts in the early universe (see [cosmology](./Cosmology.md)).

**Step 4: CPT.** The CPT theorem guarantees that a particle and its antiparticle have exactly equal mass and lifetime. Any measured difference would signal a breakdown of the Standard Model's foundations.

> **Authoritative sources**
> - [Dirac, "A Quantum Theory of the Electron" (1928)](https://en.wikipedia.org/wiki/Dirac_equation)
> - [CPT theorem](https://en.wikipedia.org/wiki/CPT_symmetry)

**Example problem.**

<details><summary>Problem</summary>

An antineutron is observed. State its electric charge, its baryon number, and whether it is its own antiparticle.

<details><summary>Solution</summary>

The neutron (udd, charge 0, baryon number +1) has an antiparticle, the **antineutron** ($`\bar{u}\bar{d}\bar{d}`):
- Electric charge: 0 (the sum of the anti-quark charges $`-2/3 + 1/3 + 1/3 = 0`).
- Baryon number: −1 (opposite of the neutron's +1).
- It is **not** its own antiparticle: although its electric charge is zero, its baryon number is non-zero, so the antineutron is distinct from the neutron.

</details>
</details>

</details>

## Gauge bosons (force carriers)

**Definition.** Gauge bosons are spin-1 particles that mediate the fundamental interactions. The Standard Model contains eight gluons (g), three weak bosons (W⁺, W⁻, Z⁰), and one photon (γ).

<details><summary>Details</summary>

**Step 1: the four carriers.**
- **Gluons** (8): massless, carry color charge themselves (adjoint representation of SU(3)), mediate the strong force. Self-interaction of gluons leads to confinement and asymptotic freedom.
- **W⁺, W⁻** (mass ≈ 80.4 GeV/c²): mediate charged-current weak interactions (e.g., beta decay).
- **Z⁰** (mass ≈ 91.2 GeV/c²): mediates neutral-current weak interactions.
- **Photon** (γ): massless, mediates electromagnetism.

**Step 2: charged vs. neutral currents.** The W bosons change the electric charge of the particles they connect (a charged current): a down quark becomes an up quark. The Z⁰ and the photon connect particles of the same charge (neutral currents). This distinction is what makes the weak interaction able to change particle identity, as in beta decay.

**Step 3: beta decay as a worked process.** In beta-minus decay, a down quark emits a W⁻ and becomes an up quark; the W⁻ then decays into an electron and an electron antineutrino.

<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" style="max-width:520px">
  <text x="260" y="20" font-size="14" fill="#333" text-anchor="middle">Beta-minus decay: d → u + W⁻ → e⁻ + ν̄ₑ</text>
  <line x1="60" y1="200" x2="160" y2="90" stroke="#2563eb" stroke-width="2"/>
  <polygon points="116.1,138.3 107.3,154.7 100.6,148.6" fill="#2563eb"/>
  <line x1="160" y1="90" x2="250" y2="40" stroke="#2563eb" stroke-width="2"/>
  <polygon points="212.9,60.6 199.3,73.3 194.9,65.4" fill="#2563eb"/>
  <path d="M160.0,90.0 L178.7,88.3 L191.3,106.7 L212.0,98.3 L224.7,116.7 L245.3,108.3 L258.0,126.7 L278.7,118.3 L291.3,136.7 L312.0,128.3 L324.7,146.7 L345.3,138.3 L360.0,150.0" stroke="#16a34a" stroke-width="2" fill="none"/>
  <line x1="360" y1="150" x2="460" y2="190" stroke="#dc2626" stroke-width="2"/>
  <polygon points="418.4,173.3 400.0,170.8 403.3,162.5" fill="#dc2626"/>
  <line x1="360" y1="150" x2="460" y2="110" stroke="#dc2626" stroke-width="2"/>
  <polygon points="418.4,126.7 403.3,137.5 400.0,129.2" fill="#dc2626"/>
  <circle cx="160" cy="90" r="4" fill="#333"/>
  <circle cx="360" cy="150" r="4" fill="#333"/>
  <text x="30" y="205" font-size="14" fill="#2563eb">d</text>
  <text x="255" y="38" font-size="14" fill="#2563eb">u</text>
  <text x="255" y="120" font-size="13" fill="#16a34a">W⁻</text>
  <text x="465" y="195" font-size="14" fill="#dc2626">e⁻</text>
  <text x="465" y="108" font-size="14" fill="#dc2626">ν̄ₑ</text>
</svg>

The field-theoretic description of each force (Maxwell equations, the strong and weak fields) is in the [Interactions](../Interactions/Readme.md) category; here the same forces appear as the exchange of these bosons.

> **Authoritative sources**
> - [Feynman, "The Theory of Positrons" (1949)](https://en.wikipedia.org/wiki/Feynman_diagram)
> - [Particle Data Group, Review of Particle Physics](https://pdg.lbl.gov/)

**Example problem.**

<details><summary>Problem</summary>

In the beta-minus decay of a neutron, a down quark turns into an up quark. Which gauge boson is emitted, and why can the photon not play this role?

<details><summary>Solution</summary>

The emitted boson is the **W⁻**. The down quark (Q = −1/3) becomes an up quark (Q = +2/3), a change of +1 in electric charge, so the emitted boson must carry charge −1 to conserve charge: that is the W⁻. The photon is electrically neutral and only mediates neutral currents, so it cannot change a down quark into an up quark.

</details>
</details>

</details>

## Higgs boson

**Definition.** The Higgs boson (H, mass ≈ 125 GeV/c²) is the spin-0 excitation of the Higgs field. Its nonzero vacuum expectation value breaks electroweak symmetry and gives mass to W, Z, quarks, and charged leptons.

<details><summary>Details</summary>

**Step 1: the mechanism (formalism).** The Higgs field is an SU(2) doublet with hypercharge $`Y = 1`. Its potential has the "Mexican hat" shape, and its nonzero vacuum expectation value $`v \approx 246` GeV breaks the electroweak symmetry. The full derivation — the Mexican-hat potential, the three "eaten" degrees of freedom that become the longitudinal modes of W⁺, W⁻, Z⁰, and the Yukawa mass formula $`m_f = y_f v/\sqrt{2}` — is developed in the [gauge-symmetry section of the QFT page](../Quantum-Mechanics/Quantum-Field-Theory.md). Here we keep only the phenomenology.

<svg viewBox="0 0 520 290" xmlns="http://www.w3.org/2000/svg" style="max-width:520px">
  <text x="260" y="20" font-size="14" fill="#333" text-anchor="middle">Higgs potential V(r) = −μ²r² + λr⁴ (cross-section of the Mexican hat)</text>
  <line x1="60" y1="30" x2="60" y2="250" stroke="#333" stroke-width="1.5"/>
  <line x1="60" y1="250" x2="460" y2="250" stroke="#333" stroke-width="1.5"/>
  <line x1="60" y1="164.4" x2="460" y2="164.4" stroke="#bbb" stroke-width="1" stroke-dasharray="4,3"/>
  <path d="M60.0,164.4 L63.3,164.5 L66.7,164.5 L70.0,164.7 L73.3,164.8 L76.7,165.0 L80.0,165.3 L83.3,165.6 L86.7,165.9 L90.0,166.3 L93.3,166.8 L96.7,167.3 L100.0,167.8 L103.3,168.4 L106.7,169.0 L110.0,169.6 L113.3,170.3 L116.7,171.1 L120.0,171.9 L123.3,172.7 L126.7,173.5 L130.0,174.4 L133.3,175.3 L136.7,176.3 L140.0,177.3 L143.3,178.3 L146.7,179.4 L150.0,180.5 L153.3,181.6 L156.7,182.7 L160.0,183.9 L163.3,185.0 L166.7,186.3 L170.0,187.5 L173.3,188.7 L176.7,190.0 L180.0,191.2 L183.3,192.5 L186.7,193.8 L190.0,195.1 L193.3,196.4 L196.7,197.7 L200.0,199.0 L203.3,200.3 L206.7,201.6 L210.0,202.9 L213.3,204.2 L216.7,205.5 L220.0,206.8 L223.3,208.0 L226.7,209.3 L230.0,210.5 L233.3,211.6 L236.7,212.8 L240.0,213.9 L243.3,215.0 L246.7,216.1 L250.0,217.1 L253.3,218.1 L256.7,219.0 L260.0,219.9 L263.3,220.8 L266.7,221.5 L270.0,222.3 L273.3,222.9 L276.7,223.5 L280.0,224.0 L283.3,224.5 L286.7,224.9 L290.0,225.2 L293.3,225.4 L296.7,225.5 L300.0,225.6 L303.3,225.5 L306.7,225.3 L310.0,225.1 L313.3,224.7 L316.7,224.2 L320.0,223.7 L323.3,222.9 L326.7,222.1 L330.0,221.1 L333.3,220.0 L336.7,218.8 L340.0,217.4 L343.3,215.9 L346.7,214.2 L350.0,212.4 L353.3,210.4 L356.7,208.3 L360.0,205.9 L363.3,203.4 L366.7,200.8 L370.0,197.9 L373.3,194.9 L376.7,191.6 L380.0,188.2 L383.3,184.5 L386.7,180.6 L390.0,176.6 L393.3,172.3 L396.7,167.7 L400.0,163.0 L403.3,158.0 L406.7,152.7 L410.0,147.2 L413.3,141.5 L416.7,135.5 L420.0,129.2 L423.3,122.7 L426.7,115.8 L430.0,108.7 L433.3,101.3 L436.7,93.6 L440.0,85.6 L443.3,77.3 L446.7,68.7 L450.0,59.7 L453.3,50.4 L456.7,40.8 L460.0,30.9" stroke="#7c3aed" stroke-width="2.5" fill="none"/>
  <line x1="299.7" y1="225.6" x2="299.7" y2="250" stroke="#dc2626" stroke-width="1" stroke-dasharray="3,3"/>
  <circle cx="299.7" cy="225.6" r="4" fill="#dc2626"/>
  <text x="299.7" y="268" font-size="12" fill="#dc2626" text-anchor="middle">r = v/√2 (vacuum)</text>
  <text x="60" y="158" font-size="11" fill="#555" text-anchor="end">V = 0</text>
  <text x="260" y="285" font-size="12" fill="#333" text-anchor="middle">r = |φ|  (field magnitude)</text>
  <text x="20" y="140" font-size="12" fill="#333" text-anchor="middle" transform="rotate(-90,20,140)">V(r)</text>
</svg>

**Step 2: the mass spectrum.** The Higgs couples to every fermion with a strength (Yukawa coupling) $`y_f` proportional to its mass: $`m_f = y_f v/\sqrt{2}`. The top quark has the largest coupling ($`y_t \approx 1`), the electron the smallest ($`y_e \approx 3 \times 10^{-6}`). The W and Z masses are $`m_W = gv/2 \approx 80.4` GeV and $`m_Z \approx 91.2` GeV.

**Step 3: discovery.** The Higgs boson was discovered at the LHC in 2012 by the ATLAS and CMS collaborations via its decay channels $`H \to \gamma\gamma` and $`H \to ZZ^* \to 4\ell`. Its measured mass of 125.25 GeV is consistent with the electroweak precision predictions.

> **Authoritative sources**
> - [ATLAS, "Observation of a new particle in the search for the Standard Model Higgs boson" (2012)](https://arxiv.org/abs/1207.7214)
> - [CMS, "Observation of a new boson at a mass of 125 GeV" (2012)](https://arxiv.org/abs/1207.7215)

**Example problem.**

<details><summary>Problem</summary>

Using $`m_f = y_f v/\sqrt{2}` with $`v \approx 246` GeV, estimate the Yukawa coupling of the top quark, given $`m_t \approx 173` GeV.

<details><summary>Solution</summary>

$`y_t = m_t \sqrt{2}/v = 173 \times 1.414 / 246 \approx 244.6 / 246 \approx 0.99`.

So $`y_t \approx 1`, the largest Yukawa coupling in the Standard Model — the top quark is the only fermion whose mass is comparable to the electroweak scale.

</details>
</details>

</details>

## Quiz

<details><summary>Example problem</summary>

A particle is observed with the following quantum numbers: electric charge $`Q = -1/3`, color triplet, weak isospin doublet (left-handed), and it participates in strong interactions. Identify the particle and state which gauge bosons it couples to.

<details><summary>Solution</summary>

- Electric charge −1/3 and color triplet → a down-type quark.
- Weak isospin doublet (left-handed) → it is the left-handed component of a quark doublet.
- The down-type quarks are d, s, b. Without additional mass information, the lightest is the **down quark** $`d`.

The down quark couples to:
- **Gluons** (color charge, strong interaction)
- **W⁻** (charged weak current: $`d_L \to u_L + W^-`)
- **Z⁰** (neutral weak current)
- **Photon** (electric charge)
- **Higgs** (Yukawa coupling, gives it mass)

</details>
</details>

<iframe src="./Elementary-Particles.simulation.html" title="Standard Model particle explorer and Q = T3 + Y/2 charge calculator"></iframe>
