# Atomic Physics

Atomic physics describes the structure and behavior of atoms: the electromagnetic bound states of nuclei and electrons. It explains the periodic table, spectral lines, chemical bonding, and the quantized energy levels that underpin chemistry, spectroscopy, and modern electronics. It is relevant whenever the discrete energy structure of matter matters: from laser design to semiconductor physics to astrophysical spectroscopy.

> **Authoritative sources**
> - [Foot, *Atomic Physics* (Oxford, 2005)](https://global.oup.com/academic/product/atomic-physics-9780198506916)
> - [Griffiths, *Introduction to Quantum Mechanics* (Pearson, 2018)](https://www.pearson.com/en-us/subject-catalog/p/introduction-to-quantum-mechanics/P200000003405)
> - [Bohr, On the Constitution of Atoms and Molecules (1913)](https://doi.org/10.1002/andp.19133492602)

## The hydrogen atom

**Definition.** The hydrogen atom is the simplest atom: one proton and one electron bound by the Coulomb potential. Its energy levels are $`E_n = -13.6 \text{ eV}/n^2` for $`n = 1, 2, 3, \ldots`.

<details><summary>Details</summary>

### From the Bohr model to the Schrödinger equation

In 1913, Niels Bohr proposed that the electron in hydrogen occupies only certain allowed circular orbits with quantized angular momentum $`L = n\hbar`. This ad hoc quantization reproduced the observed $`1/n^2` energy spacing and explained the hydrogen spectrum. The Bohr model was a crucial stepping stone: it identified the correct energy formula and the role of angular momentum quantization, but it could not explain line intensities, fine structure, or multi-electron atoms.

The full quantum-mechanical treatment replaces orbits with wavefunctions. Solving the [Schrödinger equation](../Quantum-Mechanics/Quantum-Dynamics.md) for the Coulomb potential $`V(r) = -e^2/(4\pi\varepsilon_0 r)` yields the same energy eigenvalues:

```math
E_n = -\frac{m_e e^4}{2(4\pi\varepsilon_0)^2 \hbar^2} \cdot \frac{1}{n^2} = -\frac{13.6 \text{ eV}}{n^2}
```

The [quantum states](../Quantum-Mechanics/Quantum-States.md) of hydrogen are labeled by four quantum numbers:

- **Principal** $`n = 1, 2, 3, \ldots` — sets the energy.
- **Orbital angular momentum** $`\ell = 0, 1, \ldots, n-1` — labeled s, p, d, f, …
- **Magnetic** $`m_\ell = -\ell, \ldots, +\ell` — orientation in a magnetic field.
- **Spin** $`s = 1/2` for the electron.

The Bohr radius $`a_0 = 4\pi\varepsilon_0 \hbar^2/(m_e e^2) \approx 0.529` Å sets the size scale of the atom.

### Energy-level diagram

The figure below shows the first four energy levels of hydrogen and the principal transitions:

<svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" style="max-width:520px">
  <line x1="60" y1="20" x2="60" y2="320" stroke="#333" stroke-width="1.5"/>
  <polygon points="60,15 55,25 65,25" fill="#333"/>
  <text x="15" y="170" font-size="12" fill="#333" transform="rotate(-90,15,170)">Energy (eV)</text>
  <line x1="80" y1="280" x2="200" y2="280" stroke="#222" stroke-width="2"/>
  <text x="210" y="284" font-size="12" fill="#222">n=1 (−13.6 eV)</text>
  <line x1="80" y1="200" x2="200" y2="200" stroke="#222" stroke-width="2"/>
  <text x="210" y="204" font-size="12" fill="#222">n=2 (−3.4 eV)</text>
  <line x1="80" y1="150" x2="200" y2="150" stroke="#222" stroke-width="2"/>
  <text x="210" y="154" font-size="12" fill="#222">n=3 (−1.51 eV)</text>
  <line x1="80" y1="115" x2="200" y2="115" stroke="#222" stroke-width="2"/>
  <text x="210" y="119" font-size="12" fill="#222">n=4 (−0.85 eV)</text>
  <line x1="80" y1="40" x2="200" y2="40" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="210" y="44" font-size="12" fill="#888">0 eV (ionization)</text>
  <line x1="100" y1="200" x2="100" y2="280" stroke="#4444ff" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="105" y="245" font-size="10" fill="#4444ff">Lyman-α (121.6 nm)</text>
  <line x1="130" y1="150" x2="130" y2="200" stroke="#ff4444" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="135" y="180" font-size="10" fill="#ff4444">Hα (656 nm)</text>
  <line x1="160" y1="115" x2="160" y2="200" stroke="#ff8800" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="165" y="160" font-size="10" fill="#ff8800">Hβ (486 nm)</text>
  <line x1="190" y1="150" x2="190" y2="280" stroke="#8800cc" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="195" y="220" font-size="10" fill="#8800cc">Lyman-β (102.6 nm)</text>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0,0 8,3 0,6" fill="#333"/>
    </marker>
  </defs>
</svg>

### Worked example: Lyman-alpha

The Lyman-alpha line corresponds to the transition $`n=2 \to n=1`:

```math
E_{\gamma} = E_2 - E_1 = -3.4 - (-13.6) = 10.2 \text{ eV}
```

Wavelength: $`\lambda = hc/E = 1240/10.2 \approx 121.6` nm (ultraviolet).

> **Authoritative sources**
> - [Bohr (1913), Phil. Mag. 26, 1](https://doi.org/10.1080/14786441309437138)
> - [Griffiths, *Introduction to Quantum Mechanics*, Ch. 4](https://www.pearson.com/en-us/subject-catalog/p/introduction-to-quantum-mechanics/P200000003405)

<details><summary>Example problem</summary>

Compute the ionization energy of hydrogen from the $`n=2` state (i.e., the energy needed to take the electron from $`n=2` to $`n=\infty`).

<details><summary>Solution</summary>

The ionization energy from level $`n` is $`E_{\text{ion}} = 0 - E_n = 13.6/n^2` eV.

For $`n=2`: $`E_{\text{ion}} = 13.6/4 = 3.4` eV.

A photon of wavelength $`\lambda = 1240/3.4 \approx 365` nm (near-UV) can ionize a hydrogen atom in its first excited state.

</details>

</details>

</details>

## Fine structure and spin-orbit coupling

**Definition.** Fine structure is the small splitting of hydrogen energy levels caused by relativistic corrections to the electron kinetic energy and by the coupling of the electron's spin magnetic moment to the magnetic field it experiences in its own rest frame (spin-orbit coupling). The splitting is of order $`\alpha^2` relative to the main $`13.6/n^2` spacing, where $`\alpha \approx 1/137` is the fine-structure constant.

<details><summary>Details</summary>

### Why the levels split

In the basic Schrödinger treatment, all states with the same $`n` but different $`\ell` are degenerate (e.g., 2s and 2p have the same energy). In reality, three relativistic effects lift this degeneracy:

1. **Relativistic kinetic energy correction**: the electron speed in inner orbits approaches $`c`, so the kinetic energy $`p^2/2m` must be replaced by the relativistic expression. This shifts all levels slightly.

2. **Spin-orbit coupling**: in the electron's rest frame, the orbiting proton constitutes a current loop, producing a magnetic field $`\mathbf{B}_{\text{so}}`. The electron's spin magnetic moment $`\boldsymbol{\mu}_s = -g_s \mu_B \mathbf{S}/\hbar` interacts with this field:

```math
H_{\text{so}} = \frac{1}{2m_e^2 c^2} \frac{1}{r}\frac{dV}{dr}\, \mathbf{L} \cdot \mathbf{S}
```

The factor of $`1/2` is the Thomas precession correction.

3. **Darwin term**: a contact interaction affecting only $`s`-states ($`\ell=0`).

The total angular momentum $`\mathbf{J} = \mathbf{L} + \mathbf{S}` is the good quantum number. For a given $`\ell`, the spin couples to give $`j = \ell \pm 1/2` (except $`\ell=0` where only $`j=1/2`).

### The fine-structure formula

The combined correction to the energy is:

```math
E_{n,j} = -\frac{13.6 \text{ eV}}{n^2}\left[1 + \frac{\alpha^2}{n}\left(\frac{n}{j+\tfrac{1}{2}} - \frac{3}{4}\right)\right]
```

For $`n=2`: the $`2p_{3/2}` level is slightly higher than the $`2p_{1/2}` level, and the $`2s_{1/2}` level is degenerate with $`2p_{1/2}` (to this order). The $`2p_{3/2} \to 2s_{1/2}` transition produces the famous 2.1 μm "fine-structure line" of hydrogen.

### Diagram: fine-structure splitting of n=2

<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" style="max-width:460px">
  <line x1="50" y1="20" x2="50" y2="180" stroke="#333" stroke-width="1.5"/>
  <polygon points="50,15 45,25 55,25" fill="#333"/>
  <text x="10" y="100" font-size="11" fill="#333" transform="rotate(-90,10,100)">Energy</text>
  <line x1="80" y1="60" x2="180" y2="60" stroke="#222" stroke-width="2"/>
  <text x="190" y="64" font-size="11" fill="#222">2p<tspan baseline-shift="sub" font-size="9">3/2</tspan></text>
  <line x1="80" y1="80" x2="180" y2="80" stroke="#222" stroke-width="2"/>
  <text x="190" y="84" font-size="11" fill="#222">2p<tspan baseline-shift="sub" font-size="9">1/2</tspan></text>
  <line x1="80" y1="82" x2="180" y2="82" stroke="#666" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="190" y="96" font-size="11" fill="#666">2s<tspan baseline-shift="sub" font-size="9">1/2</tspan> (degenerate with 2p<tspan baseline-shift="sub" font-size="9">1/2</tspan>)</text>
  <line x1="80" y1="160" x2="180" y2="160" stroke="#222" stroke-width="2"/>
  <text x="190" y="164" font-size="11" fill="#222">1s<tspan baseline-shift="sub" font-size="9">1/2</tspan></text>
  <line x1="220" y1="60" x2="220" y2="82" stroke="#cc0000" stroke-width="1.5" marker-end="url(#arrow2)"/>
  <text x="228" y="75" font-size="10" fill="#cc0000">2.1 μm</text>
  <line x1="75" y1="60" x2="75" y2="82" stroke="#999" stroke-width="1"/>
  <line x1="73" y1="60" x2="77" y2="60" stroke="#999" stroke-width="1"/>
  <line x1="73" y1="82" x2="77" y2="82" stroke="#999" stroke-width="1"/>
  <text x="55" y="75" font-size="9" fill="#999">ΔE</text>
  <defs>
    <marker id="arrow2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0,0 8,3 0,6" fill="#cc0000"/>
    </marker>
  </defs>
</svg>

> **Authoritative sources**
> - [Foot, *Atomic Physics*, Ch. 2](https://global.oup.com/academic/product/atomic-physics-9780198506916)
> - [Berestetskii, Lifshitz & Pitaevskii, *Quantum Electrodynamics*, §43](https://www.physics.rutgers.edu/~sprung/pdf/berestetskii.pdf)

<details><summary>Example problem</summary>

Estimate the fine-structure splitting of the $`n=2` level in hydrogen. Use $`\alpha \approx 1/137` and the main energy $`E_2 = -3.4` eV.

<details><summary>Solution</summary>

The fine-structure correction is of order $`\alpha^2 |E_n|`:

```math
\Delta E \sim \alpha^2 \cdot 3.4 \text{ eV} = \frac{3.4}{137^2} \approx 1.8 \times 10^{-4} \text{ eV}
```

More precisely, the $`2p_{3/2}`–$`2p_{1/2}` splitting is $`\Delta E = \alpha^2 \cdot 3.4/2 \approx 9 \times 10^{-5}` eV, corresponding to a wavelength shift of about 0.01 nm in the 656 nm Hα line.

</details>

</details>

</details>

## Multi-electron atoms and the periodic table

**Definition.** Multi-electron atoms are described by the [Pauli exclusion principle](../Quantum-Mechanics/Quantum-Many-Body.md) and the Aufbau principle: electrons fill orbitals in order of increasing energy, with at most two (opposite-spin) electrons per spatial orbital.

<details><summary>Details</summary>

### Why multi-electron atoms are harder

In hydrogen, the electron sees a pure $`-e^2/r` Coulomb potential and the problem is exactly solvable. In a multi-electron atom with nuclear charge $`Ze`, each electron feels:

1. The attractive Coulomb potential of the nucleus: $`-Ze^2/(4\pi\varepsilon_0 r)`.
2. The repulsive Coulomb potential of all other electrons: $`+e^2/(4\pi\varepsilon_0 r_{ij})`.

The electron–electron repulsion terms make the Schrödinger equation unsolvable in closed form. The key physical insight is **screening** (or shielding): inner electrons partially cancel the nuclear charge, so an outer electron sees an **effective nuclear charge** $`Z_{\text{eff}} < Z`. This is why the energy of an orbital depends on both $`n` and $`\ell`: orbitals with smaller $`\ell` (more penetrating, e.g. s orbitals) spend more time near the nucleus and feel a larger $`Z_{\text{eff}}`, lowering their energy relative to higher-$`\ell` orbitals with the same $`n`.

### The filling rules

- **Pauli exclusion principle**: no two electrons in an atom can share the same set of four quantum numbers $`(n, \ell, m_\ell, m_s)`. Each spatial orbital holds at most two electrons (one spin-up, one spin-down).
- **Aufbau principle** (Madelung rule): orbitals fill in order of increasing $`n + \ell`; ties are broken by lower $`n` first. This is an **empirical rule** with known exceptions (e.g., Cr: $`[\text{Ar}]\,3d^5 4s^1` rather than $`3d^4 4s^2`; Cu: $`[\text{Ar}]\,3d^{10} 4s^1` rather than $`3d^9 4s^2`), where exchange energy and near-degeneracy shift the ground state.
- **Hund's rule**: degenerate orbitals (same $`n, \ell`) are singly occupied with parallel spins before any pairing occurs.

### Orbital-filling diagram

The diagram below shows the filling order for the first 36 elements (up to krypton), with the $`n+\ell` rule:

<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" style="max-width:560px">
  <text x="280" y="18" font-size="12" fill="#333" text-anchor="middle">Orbital filling order (Madelung rule: increasing n+ℓ, then n)</text>
  <rect x="20" y="35" width="50" height="28" rx="4" fill="#e8f4e8" stroke="#4a4"/>
  <text x="45" y="54" font-size="11" fill="#222" text-anchor="middle">1s</text>
  <rect x="80" y="35" width="50" height="28" rx="4" fill="#e8f4e8" stroke="#4a4"/>
  <text x="105" y="54" font-size="11" fill="#222" text-anchor="middle">2s</text>
  <rect x="140" y="35" width="50" height="28" rx="4" fill="#fff3e0" stroke="#a80"/>
  <text x="165" y="54" font-size="11" fill="#222" text-anchor="middle">2p</text>
  <rect x="200" y="35" width="50" height="28" rx="4" fill="#fff3e0" stroke="#a80"/>
  <text x="225" y="54" font-size="11" fill="#222" text-anchor="middle">3s</text>
  <rect x="260" y="35" width="50" height="28" rx="4" fill="#e3f2fd" stroke="#26c"/>
  <text x="285" y="54" font-size="11" fill="#222" text-anchor="middle">3p</text>
  <rect x="320" y="35" width="50" height="28" rx="4" fill="#e3f2fd" stroke="#26c"/>
  <text x="345" y="54" font-size="11" fill="#222" text-anchor="middle">4s</text>
  <rect x="380" y="35" width="50" height="28" rx="4" fill="#fce4ec" stroke="#c26"/>
  <text x="405" y="54" font-size="11" fill="#222" text-anchor="middle">3d</text>
  <rect x="440" y="35" width="50" height="28" rx="4" fill="#fce4ec" stroke="#c26"/>
  <text x="465" y="54" font-size="11" fill="#222" text-anchor="middle">4p</text>
  <rect x="500" y="35" width="50" height="28" rx="4" fill="#fce4ec" stroke="#c26"/>
  <text x="525" y="54" font-size="11" fill="#222" text-anchor="middle">5s</text>
  <rect x="20" y="75" width="50" height="28" rx="4" fill="#f3e5f5" stroke="#808"/>
  <text x="45" y="94" font-size="11" fill="#222" text-anchor="middle">4d</text>
  <rect x="80" y="75" width="50" height="28" rx="4" fill="#f3e5f5" stroke="#808"/>
  <text x="105" y="94" font-size="11" fill="#222" text-anchor="middle">5p</text>
  <rect x="140" y="75" width="50" height="28" rx="4" fill="#f3e5f5" stroke="#808"/>
  <text x="165" y="94" font-size="11" fill="#222" text-anchor="middle">6s</text>
  <rect x="200" y="75" width="50" height="28" rx="4" fill="#efebe9" stroke="#654"/>
  <text x="225" y="94" font-size="11" fill="#222" text-anchor="middle">4f</text>
  <rect x="260" y="75" width="50" height="28" rx="4" fill="#efebe9" stroke="#654"/>
  <text x="285" y="94" font-size="11" fill="#222" text-anchor="middle">5d</text>
  <rect x="320" y="75" width="50" height="28" rx="4" fill="#efebe9" stroke="#654"/>
  <text x="345" y="94" font-size="11" fill="#222" text-anchor="middle">6p</text>
  <rect x="380" y="75" width="50" height="28" rx="4" fill="#efebe9" stroke="#654"/>
  <text x="405" y="94" font-size="11" fill="#222" text-anchor="middle">7s</text>
  <path d="M 45 63 L 45 75 L 105 75 L 105 63" fill="none" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
  <path d="M 165 63 L 165 75 L 225 75 L 225 63" fill="none" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="45" y="120" font-size="9" fill="#666" text-anchor="middle">2</text>
  <text x="105" y="120" font-size="9" fill="#666" text-anchor="middle">2</text>
  <text x="165" y="120" font-size="9" fill="#666" text-anchor="middle">6</text>
  <text x="225" y="120" font-size="9" fill="#666" text-anchor="middle">2</text>
  <text x="285" y="120" font-size="9" fill="#666" text-anchor="middle">6</text>
  <text x="345" y="120" font-size="9" fill="#666" text-anchor="middle">2</text>
  <text x="405" y="120" font-size="9" fill="#666" text-anchor="middle">10</text>
  <text x="465" y="120" font-size="9" fill="#666" text-anchor="middle">6</text>
  <text x="525" y="120" font-size="9" fill="#666" text-anchor="middle">2</text>
  <text x="20" y="150" font-size="10" fill="#555">Each color = one value of n+ℓ. Filling proceeds left-to-right, top-to-bottom.</text>
  <text x="20" y="165" font-size="10" fill="#555">Exceptions: Cr (3d⁵4s¹), Cu (3d¹⁰4s¹), and several heavier elements deviate from this order.</text>
</svg>

### The periodic table

The periodic table organizes elements by atomic number $`Z`. Elements in the same column (group) have the same valence electron configuration, explaining chemical periodicity. The [nucleus](./Nuclear-Physics.md) provides the positive charge $`+Ze` that binds the electrons; its internal structure (protons, neutrons, strong force) is the subject of nuclear physics.

**Example.** Carbon ($`Z = 6`): configuration $`1s^2\, 2s^2\, 2p^2`. The two 2p electrons occupy separate orbitals with parallel spins (Hund's rule), giving carbon its tetravalent chemistry.

> **Authoritative sources**
> - [Foot, *Atomic Physics*, Ch. 3](https://global.oup.com/academic/product/atomic-physics-9780198506916)
> - [Cowan, *The Theory of Atomic Structure and Spectra* (1980)](https://doi.org/10.1017/CBO9780511524787)

<details><summary>Example problem</summary>

Write the ground-state electron configuration of iron ($`Z = 26`) and of chromium ($`Z = 24`). Explain why chromium is an exception to the Madelung rule.

<details><summary>Solution</summary>

**Iron** ($`Z=26`): Fill in order 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶.
Configuration: $`[\text{Ar}]\, 3d^6\, 4s^2`.

**Chromium** ($`Z=24`): The Madelung rule predicts $`[\text{Ar}]\, 3d^4\, 4s^2`, but the observed configuration is $`[\text{Ar}]\, 3d^5\, 4s^1`.

Reason: a half-filled d-subshell ($`d^5`) has extra exchange-stabilization energy (all five d-electrons have parallel spins, maximizing the number of parallel-spin pairs). The energy gain from this exchange interaction exceeds the small energy cost of promoting one 4s electron into the 3d subshell.

</details>

</details>

</details>

## Spectral lines

**Definition.** Spectral lines are the discrete frequencies of [electromagnetic radiation](../Interactions/Electromagnetism/Readme.md) emitted or absorbed when an electron transitions between quantized energy levels: $`h\nu = E_i - E_f`.

<details><summary>Details</summary>

### Connection to the hydrogen energy levels

The Rydberg formula is a direct restatement of the hydrogen energy-level formula. Starting from $`E_n = -13.6/n^2` eV, the photon energy for a transition $`n_i \to n_f` is:

```math
h\nu = E_{n_i} - E_{n_f} = 13.6\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right) \text{ eV}
```

Converting to wavelength $`\lambda = c/\nu = hc/(h\nu)`:

```math
\frac{1}{\lambda} = R_H\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right), \quad R_H = \frac{13.6 \text{ eV}}{hc} \approx 1.097 \times 10^7 \text{ m}^{-1}
```

So the Rydberg constant is not an independent empirical parameter — it is fixed by the same physics that gives $`E_n = -13.6/n^2`.

### Emission, absorption, and selection rules

- **Emission**: an electron drops from a higher to a lower level, emitting a photon of energy $`h\nu = E_{\text{high}} - E_{\text{low}}`.
- **Absorption**: an electron absorbs a photon of exactly the right energy to jump to a higher level.
- **Selection rules**: electric-dipole transitions require $`\Delta \ell = \pm 1` and $`\Delta m_\ell = 0, \pm 1`. Transitions violating these rules are "forbidden" (they can still occur via weaker multipole mechanisms, but with much lower probability).

### Spectral-line diagram

The figure below shows the hydrogen emission spectrum (visible Balmer series) and the corresponding absorption spectrum:

<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg" style="max-width:540px">
  <line x1="40" y1="180" x2="520" y2="180" stroke="#333" stroke-width="1.5"/>
  <polygon points="525,180 515,175 515,185" fill="#333"/>
  <text x="280" y="205" font-size="11" fill="#333" text-anchor="middle">Wavelength (nm)</text>
  <line x1="80" y1="177" x2="80" y2="183" stroke="#333" stroke-width="1"/>
  <text x="80" y="195" font-size="9" fill="#555" text-anchor="middle">400</text>
  <line x1="180" y1="177" x2="180" y2="183" stroke="#333" stroke-width="1"/>
  <text x="180" y="195" font-size="9" fill="#555" text-anchor="middle">450</text>
  <line x1="280" y1="177" x2="280" y2="183" stroke="#333" stroke-width="1"/>
  <text x="280" y="195" font-size="9" fill="#555" text-anchor="middle">500</text>
  <line x1="380" y1="177" x2="380" y2="183" stroke="#333" stroke-width="1"/>
  <text x="380" y="195" font-size="9" fill="#555" text-anchor="middle">550</text>
  <line x1="480" y1="177" x2="480" y2="183" stroke="#333" stroke-width="1"/>
  <text x="480" y="195" font-size="9" fill="#555" text-anchor="middle">600</text>
  <line x1="92" y1="180" x2="92" y2="100" stroke="#8800cc" stroke-width="3"/>
  <text x="92" y="92" font-size="9" fill="#8800cc" text-anchor="middle">Hδ 410</text>
  <line x1="132" y1="180" x2="132" y2="80" stroke="#0066ff" stroke-width="3"/>
  <text x="132" y="72" font-size="9" fill="#0066ff" text-anchor="middle">Hγ 434</text>
  <line x1="232" y1="180" x2="232" y2="60" stroke="#00ccaa" stroke-width="3"/>
  <text x="232" y="52" font-size="9" fill="#00ccaa" text-anchor="middle">Hβ 486</text>
  <line x1="508" y1="180" x2="508" y2="40" stroke="#ff2200" stroke-width="3"/>
  <text x="508" y="32" font-size="9" fill="#ff2200" text-anchor="middle">Hα 656</text>
  <text x="280" y="25" font-size="12" fill="#333" text-anchor="middle">Hydrogen emission spectrum (Balmer series, visible)</text>
  <rect x="60" y="110" width="200" height="50" rx="4" fill="#fffde7" stroke="#ccc"/>
  <text x="160" y="125" font-size="9" fill="#555" text-anchor="middle">Absorption: dark lines at same wavelengths</text>
  <line x1="92" y1="130" x2="92" y2="155" stroke="#333" stroke-width="2"/>
  <line x1="132" y1="130" x2="132" y2="155" stroke="#333" stroke-width="2"/>
  <line x1="232" y1="130" x2="232" y2="155" stroke="#333" stroke-width="2"/>
  <rect x="60" y="130" width="200" height="25" fill="#ffffcc" opacity="0.5"/>
</svg>

### Multi-electron spectral lines

In multi-electron atoms, the energy levels depend on both $`n` and $`\ell` (due to screening), so the spectrum is richer. The sodium D-line at 589 nm arises from the $`3p \to 3s` transition. The fine structure splits this into two closely spaced lines at 589.0 and 589.6 nm (the $`3p_{1/2}` and $`3p_{3/2}` upper levels).

> **Authoritative sources**
> - [Foot, *Atomic Physics*, Ch. 4](https://global.oup.com/academic/product/atomic-physics-9780198506916)
> - [Rydberg, *Zur Theorie der Spektrallinien* (1890)](https://doi.org/10.1007/978-3-642-58968-4)

<details><summary>Example problem</summary>

A spectral line is observed at 486.1 nm. Identify the transition in hydrogen that produces it. (Use $`E_n = -13.6/n^2` eV and $`hc = 1240` eV·nm.)

<details><summary>Solution</summary>

Photon energy: $`E = 1240/486.1 \approx 2.55` eV.

We need $`13.6(1/n_f^2 - 1/n_i^2) = 2.55`, i.e. $`1/n_f^2 - 1/n_i^2 = 0.1875`.

Try $`n_f = 2`: $`1/4 - 1/n_i^2 = 0.1875 \Rightarrow 1/n_i^2 = 0.0625 \Rightarrow n_i = 4`.

This is the Hβ line: the $`n=4 \to n=2` transition (Balmer-beta).

</details>

</details>

</details>

## The Zeeman effect

**Definition.** The Zeeman effect is the splitting of atomic spectral lines in the presence of an external magnetic field. It arises because the magnetic field lifts the degeneracy of the $`m_\ell` (and $`m_s`) sub-levels, producing multiple closely spaced lines instead of one.

<details><summary>Details</summary>

### Mechanism

In the absence of a field, states with the same $`n, \ell` but different $`m_\ell` are degenerate. An external magnetic field $`\mathbf{B} = B\hat{z}` couples to the orbital and spin magnetic moments:

```math
H_Z = \mu_B (L_z + g_s S_z)\frac{B}{\hbar} = \mu_B (m_\ell + g_s\, m_s)\, B
```

where $`\mu_B = e\hbar/(2m_e) \approx 5.79 \times 10^{-5}` eV/T is the Bohr magneton and $`g_s \approx 2`.

Each sub-level shifts by $`\Delta E = \mu_B (m_\ell + g_s m_s) B`. Since the selection rule $`\Delta m_\ell = 0, \pm 1` still applies, a single spectral line splits into multiple components.

### Normal vs. anomalous Zeeman effect

- **Normal Zeeman effect**: occurs when spin is effectively zero (or when the total spin of the upper and lower states is the same). A line splits into **three** components (a triplet): $`\Delta m = 0` (π line, unshifted) and $`\Delta m = \pm 1` (σ lines, shifted by $`\pm \mu_B B`).

- **Anomalous Zeeman effect**: occurs when spin-orbit coupling is significant (the common case). The level splits into $`2J+1` sub-levels labeled by $`m_J`, and the pattern is more complex. In the **Paschen-Back regime** (very strong field), spin-orbit coupling is broken and the splitting reverts to a pattern based on $`m_\ell` and $`m_s` separately.

### Diagram: normal Zeeman splitting

<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style="max-width:480px">
  <line x1="60" y1="40" x2="120" y2="40" stroke="#222" stroke-width="2"/>
  <line x1="140" y1="40" x2="200" y2="40" stroke="#222" stroke-width="2"/>
  <line x1="220" y1="40" x2="280" y2="40" stroke="#222" stroke-width="2"/>
  <text x="90" y="32" font-size="10" fill="#222" text-anchor="middle">m=−1</text>
  <text x="170" y="32" font-size="10" fill="#222" text-anchor="middle">m=0</text>
  <text x="250" y="32" font-size="10" fill="#222" text-anchor="middle">m=+1</text>
  <text x="30" y="44" font-size="11" fill="#222">p</text>
  <line x1="140" y1="140" x2="200" y2="140" stroke="#222" stroke-width="2"/>
  <text x="170" y="132" font-size="10" fill="#222" text-anchor="middle">m=0</text>
  <text x="30" y="144" font-size="11" fill="#222">s</text>
  <line x1="90" y1="42" x2="155" y2="138" stroke="#0066ff" stroke-width="1.5"/>
  <line x1="170" y1="42" x2="170" y2="138" stroke="#00aa00" stroke-width="1.5"/>
  <line x1="250" y1="42" x2="185" y2="138" stroke="#0066ff" stroke-width="1.5"/>
  <text x="340" y="90" font-size="11" fill="#333">Spectrum:</text>
  <line x1="350" y1="70" x2="350" y2="110" stroke="#0066ff" stroke-width="2"/>
  <line x1="380" y1="70" x2="380" y2="110" stroke="#00aa00" stroke-width="2"/>
  <line x1="410" y1="70" x2="410" y2="110" stroke="#0066ff" stroke-width="2"/>
  <text x="350" y="122" font-size="9" fill="#0066ff" text-anchor="middle">σ⁻</text>
  <text x="380" y="122" font-size="9" fill="#00aa00" text-anchor="middle">π</text>
  <text x="410" y="122" font-size="9" fill="#0066ff" text-anchor="middle">σ⁺</text>
  <line x1="440" y1="160" x2="440" y2="60" stroke="#888" stroke-width="1.5" marker-end="url(#arrowB)"/>
  <text x="448" y="110" font-size="11" fill="#888">B</text>
  <defs>
    <marker id="arrowB" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0,0 8,3 0,6" fill="#888"/>
    </marker>
  </defs>
</svg>

### The Stark effect (brief note)

An external **electric** field similarly splits or shifts energy levels (the Stark effect). For hydrogen, the linear Stark effect mixes states of the same $`n` but different parity (e.g., 2s and 2p), lifting the $`m_\ell` degeneracy. The Stark effect is generally smaller than the Zeeman effect for typical laboratory fields but is important in astrophysics (pressure broadening in stellar atmospheres).

> **Authoritative sources**
> - [Foot, *Atomic Physics*, Ch. 5](https://global.oup.com/academic/product/atomic-physics-9780198506916)
> - [Zeeman, *Sur la modification que subit la polarisation de la lumière émise par les rayons d'un champ magnétique* (1897)](https://doi.org/10.1016/j.physa.2004.12.023)

<details><summary>Example problem</summary>

A hydrogen spectral line at 500 nm is observed in a magnetic field of $`B = 1` T. Estimate the splitting between adjacent Zeeman components. (Use $`\mu_B = 5.79 \times 10^{-5}` eV/T and $`hc = 1240` eV·nm.)

<details><summary>Solution</summary>

Energy splitting: $`\Delta E = \mu_B B = 5.79 \times 10^{-5}` eV.

Wavelength splitting: $`\Delta\lambda = \lambda^2 \Delta E / (hc) = (500)^2 \times 5.79 \times 10^{-5} / 1240 \approx 0.0117` nm.

So the three components are separated by about 0.012 nm — resolvable with a high-resolution spectrometer but invisible to the naked eye.

</details>

</details>

</details>

## Molecular bonds

**Definition.** Molecular bonds arise from the electromagnetic interaction between the electrons and nuclei of adjacent atoms. The dominant types are covalent (shared electrons), ionic (electron transfer), and metallic (delocalized electrons). This section gives a brief atomic-physics introduction; a full treatment belongs to molecular physics and quantum chemistry.

<details><summary>Details</summary>

### The LCAO method

The **Linear Combination of Atomic Orbitals (LCAO)** method approximates molecular orbitals as superpositions of atomic orbitals on the constituent atoms. For a diatomic molecule AB:

```math
\psi_{\pm} = \frac{1}{\sqrt{2(1 \pm S)}}(\phi_A \pm \phi_B)
```

where $`\phi_A` and $`\phi_B` are atomic orbitals on atoms A and B, and $`S = \langle \phi_A | \phi_B \rangle` is the overlap integral. The $`+` combination is the **bonding** orbital (lower energy, electron density concentrated between the nuclei); the $`-` combination is the **antibonding** orbital (higher energy, node between the nuclei).

### Molecular orbital diagram for H₂

<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" style="max-width:500px">
  <text x="250" y="18" font-size="12" fill="#333" text-anchor="middle">Molecular orbital diagram for H₂</text>
  <line x1="60" y1="100" x2="140" y2="100" stroke="#222" stroke-width="2"/>
  <text x="100" y="92" font-size="11" fill="#222" text-anchor="middle">1s (H<tspan baseline-shift="sub" font-size="9">A</tspan>)</text>
  <text x="100" y="120" font-size="10" fill="#555" text-anchor="middle">−13.6 eV</text>
  <line x1="360" y1="100" x2="440" y2="100" stroke="#222" stroke-width="2"/>
  <text x="400" y="92" font-size="11" fill="#222" text-anchor="middle">1s (H<tspan baseline-shift="sub" font-size="9">B</tspan>)</text>
  <text x="400" y="120" font-size="10" fill="#555" text-anchor="middle">−13.6 eV</text>
  <line x1="190" y1="140" x2="310" y2="140" stroke="#006600" stroke-width="2.5"/>
  <text x="250" y="132" font-size="11" fill="#006600" text-anchor="middle">σ(1s) bonding</text>
  <text x="250" y="158" font-size="10" fill="#006600" text-anchor="middle">−16.3 eV</text>
  <line x1="190" y1="60" x2="310" y2="60" stroke="#cc0000" stroke-width="2.5"/>
  <text x="250" y="52" font-size="11" fill="#cc0000" text-anchor="middle">σ*(1s) antibonding</text>
  <text x="250" y="78" font-size="10" fill="#cc0000" text-anchor="middle">−8.0 eV</text>
  <line x1="140" y1="100" x2="190" y2="140" stroke="#999" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="140" y1="100" x2="190" y2="60" stroke="#999" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="360" y1="100" x2="310" y2="140" stroke="#999" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="360" y1="100" x2="310" y2="60" stroke="#999" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="240" y="145" font-size="14" fill="#006600">↑↓</text>
  <line x1="30" y1="30" x2="30" y2="200" stroke="#333" stroke-width="1"/>
  <polygon points="30,25 25,35 35,35" fill="#333"/>
  <text x="12" y="120" font-size="10" fill="#333" transform="rotate(-90,12,120)">Energy</text>
  <line x1="460" y1="100" x2="460" y2="140" stroke="#666" stroke-width="1"/>
  <line x1="457" y1="100" x2="463" y2="100" stroke="#666" stroke-width="1"/>
  <line x1="457" y1="140" x2="463" y2="140" stroke="#666" stroke-width="1"/>
  <text x="468" y="123" font-size="9" fill="#666">D₀ ≈ 4.5 eV</text>
</svg>

### Types of bonds

- **Covalent bond**: two atoms share a pair of electrons in a bonding molecular orbital. The bonding MO is lower in energy than the atomic orbitals; the antibonding MO is higher. H₂ has a bond energy ≈ 4.5 eV and bond length ≈ 0.74 Å.
- **Ionic bond**: one atom transfers an electron to another; the resulting ions are held by Coulomb attraction. Example: NaCl. The bond energy is the difference between the ionization energy of the donor, the electron affinity of the acceptor, and the Madelung (lattice) energy.
- **Metallic bond**: valence electrons are delocalized over the entire lattice, forming a "sea" of electrons that binds the positive ion cores. Described by band theory: the discrete atomic levels broaden into energy bands.

### Van der Waals interactions

The **Lennard-Jones potential** models weak van der Waals (dispersion) interactions between neutral atoms or molecules:

```math
V(r) = 4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^6\right]
```

The $`r^{-12}` term models Pauli repulsion at short range; the $`r^{-6}` term is the London dispersion attraction (induced dipole–induced dipole).

> **Authoritative sources**
> - [Pauling, *The Nature of the Chemical Bond* (1960)](https://doi.org/10.1515/9781400842771)
> - [Lennard-Jones, *On the determination of molecular fields* (1924)](https://doi.org/10.1098/rspa.1924.0131)

<details><summary>Example problem</summary>

Two hydrogen atoms approach each other. Using the MO picture, explain why the bonding σ orbital is lower in energy than the atomic 1s orbital, while the antibonding σ* orbital is higher. Estimate the bond order of H₂.

<details><summary>Solution</summary>

In the LCAO picture, the bonding combination $`\psi_+ = (\phi_A + \phi_B)/\sqrt{2(1+S)}` has constructive interference between the nuclei: the electron density is enhanced in the internuclear region, lowering the potential energy (the electron is attracted to both nuclei simultaneously). The kinetic energy cost (from the spatial confinement) is smaller than the potential energy gain, so the net energy drops below the atomic level.

The antibonding combination $`\psi_- = (\phi_A - \phi_B)/\sqrt{2(1-S)}` has a node between the nuclei: electron density is excluded from the bonding region, and the electron is effectively repelled from the internuclear zone, raising the energy.

**Bond order** = (number of electrons in bonding MOs − number in antibonding MOs) / 2 = (2 − 0)/2 = **1**.

A bond order of 1 corresponds to a single bond, consistent with the observed H–H bond.

</details>

</details>

</details>

## Interactive simulation

Explore the hydrogen energy levels interactively: click on two levels to see the emitted or absorbed photon's wavelength and color.

<iframe src="./Atomic-Physics.simulation.html" title="Interactive hydrogen energy-level explorer"></iframe>

## Quiz

<details><summary>Example problem</summary>

An electron in a hydrogen atom makes a transition from $`n = 3` to $`n = 1`. Compute the wavelength of the emitted photon. (Use $`E_n = -13.6/n^2` eV and $`hc = 1240` eV·nm.)

<details><summary>Solution</summary>

Energy of the photon: $`E = E_3 - E_1 = -13.6/9 - (-13.6/1) = 13.6(1 - 1/9) = 13.6 \times 8/9 \approx 12.09` eV.

Wavelength: $`\lambda = hc/E = 1240/12.09 \approx 102.6` nm.

This is the Lyman-beta line, in the ultraviolet.

</details>

</details>

</details>

</details>