# Electrostatics

Electrostatics is the regime of electromagnetism in which charges are at rest and fields do not change in time. The governing laws are Gauss's law $`\nabla \cdot \mathbf{E} = \rho/\varepsilon_0` and $`\nabla \times \mathbf{E} = 0` (the field is conservative, derived from a scalar potential).

**When it is relevant.** Electrostatics is the slow, static limit of [Electrodynamics](./Electrodynamics.md). It applies whenever the charges of interest are at rest or move slowly enough that the fields they produce are essentially constant on the timescale of the problem. The criterion is that the system's size $`L` is small compared with the distance light travels in the relevant time, $`L \ll c\,\tau` (equivalently, the signal wavelength is much larger than the system). Under that condition the time-derivative terms in Maxwell's equations vanish, the electric field becomes conservative, and the whole problem collapses to a single scalar potential obeying Poisson's equation. This is the regime behind capacitors, electrostatic shielding (Faraday cages), electrostatic precipitators and paint spraying, contact and triboelectric charging, the forces between charged objects, and the non-radiative electric structure of atoms and molecules.

This page treats **vacuum** electrostatics only: the permittivity is the vacuum value $`\varepsilon_0` throughout. How a material modifies the field — dielectrics, polarization, and the constitutive relation $`\mathbf{D}=\varepsilon\mathbf{E}` — is the subject of [Electromagnetic Media](./ElectromagneticMedia.md).

> **Authoritative sources**
> - Griffiths, *Introduction to Electrodynamics* (Ch. 2, Electrostatics)
> - [Ellingson, *Electromagnetics I* — Electrostatics (LibreTexts)](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Book%3A_Electromagnetics_I_(Ellingson)/05%3A_Electrostatics)
> - [OpenStax, *University Physics Vol. 2* — Electric Charges, Force, and Electric Field](https://openstax.org/books/university-physics-volume-2/pages/6-introduction)

Part of [Electromagnetism](./Readme.md); the static limit of [Electrodynamics](./Electrodynamics.md).

## 1. Coulomb's law

**Definition.** The electrostatic force between two point charges $`q_1` and $`q_2` separated by a distance $`r` is

```math
\mathbf{F}_{12} = \frac{1}{4\pi\varepsilon_0}\,\frac{q_1 q_2}{r^2}\,\hat{\mathbf{r}}_{12}
```

where $`\hat{\mathbf{r}}_{12}` points from charge 1 toward charge 2 and $`k \equiv 1/(4\pi\varepsilon_0) \approx 8.99\times10^9\ \text{N·m}^2/\text{C}^2`. The force is central (along the line joining the charges), repulsive for like signs and attractive for opposite signs, and it obeys Newton's third law ($`\mathbf{F}_{12} = -\mathbf{F}_{21}`).

<details><summary>Details</summary>

**The idea, step by step.**

1. *An inverse-square, central force.* Coulomb measured the force between two charged spheres and found it scales as $`1/r^2` and is proportional to the product of the charges. The constant $`k` is fixed by experiment; in SI units it is $`1/(4\pi\varepsilon_0)` with $`\varepsilon_0 \approx 8.85\times10^{-12}\ \text{F/m}`. Because the force points along the line of centres, it is a **central force**, and the $`1/r^2` form is what makes the field of a point charge spherically symmetric.

2. *Superposition.* With more than two charges, the force on any one charge is the **vector sum** of the pairwise Coulomb forces from all the others:

```math
\mathbf{F}_i = \sum_{j\neq i} \frac{1}{4\pi\varepsilon_0}\,\frac{q_i q_j}{r_{ij}^2}\,\hat{\mathbf{r}}_{ij}
```

There is no "three-body" force: every pair interacts independently. This linearity is why the field (Section 2) and the potential add so simply.

3. *Field lines of a point charge.* The field of a single charge is radial: straight lines pointing away from a positive charge and toward a negative one, with density falling as $`1/r^2`.

<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Radial electric field lines of a positive point charge">
  <rect x="0" y="0" width="440" height="260" fill="#ffffff"/>
  <g stroke="#e74c3c" stroke-width="1.6" fill="none">
    <line x1="220" y1="130" x2="220" y2="30"/>
    <line x1="220" y1="130" x2="290" y2="55"/>
    <line x1="220" y1="130" x2="340" y2="100"/>
    <line x1="220" y1="130" x2="360" y2="150"/>
    <line x1="220" y1="130" x2="330" y2="200"/>
    <line x1="220" y1="130" x2="270" y2="235"/>
    <line x1="220" y1="130" x2="170" y2="235"/>
    <line x1="220" y1="130" x2="110" y2="200"/>
    <line x1="220" y1="130" x2="80" y2="150"/>
    <line x1="220" y1="130" x2="100" y2="100"/>
    <line x1="220" y1="130" x2="150" y2="55"/>
  </g>
  <g fill="#e74c3c">
    <polygon points="220,30 215,42 225,42"/>
    <polygon points="360,150 348,146 349,158"/>
    <polygon points="270,235 262,224 274,226"/>
    <polygon points="80,150 92,146 91,158"/>
    <polygon points="150,55 155,67 163,58"/>
  </g>
  <circle cx="220" cy="130" r="16" fill="#e74c3c"/>
  <text x="220" y="136" text-anchor="middle" font-family="system-ui" font-size="18" font-weight="bold" fill="#fff">+</text>
  <line x1="220" y1="130" x2="340" y2="100" stroke="#2c3e50" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="290" y="105" font-family="system-ui" font-size="13" fill="#2c3e50">r</text>
  <text x="220" y="252" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">E ∝ 1/r², radial; lines point outward for +q</text>
</svg>

4. *Authoritative source.* Coulomb's law is the starting point of electrostatics; see Griffiths, *Introduction to Electrodynamics*, Ch. 2, and [Ellingson, Electrostatics](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Book%3A_Electromagnetics_I_(Ellingson)/05%3A_Electrostatics).

<details><summary>Example problem</summary>

Two point charges, $`q_1 = +3.0\,\mu\text{C}` and $`q_2 = -5.0\,\mu\text{C}`, are $`0.40\,\text{m}` apart in vacuum. Find the magnitude and direction of the force on $`q_1`.

<details><summary>Solution</summary>

```math
F = \frac{1}{4\pi\varepsilon_0}\,\frac{|q_1 q_2|}{r^2}
= (8.99\times10^9)\,\frac{(3.0\times10^{-6})(5.0\times10^{-6})}{(0.40)^2}
= (8.99\times10^9)\,\frac{1.5\times10^{-11}}{0.16}
\approx 0.84\ \text{N}
```

Because the charges have opposite signs the force is **attractive**: the force on $`q_1` points toward $`q_2`.
</details>

</details>

</details>

## 2. Electric field and electric potential

**Definition.** The **electric field** is the force per unit test charge:

```math
\mathbf{E} = \frac{\mathbf{F}}{q_0}
```

For a point charge $`q` at the origin, $`\mathbf{E} = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}\hat{\mathbf{r}}`. Because $`\nabla\times\mathbf{E}=0`, the electrostatic field is **conservative** and derives from a **scalar potential** $`V`:

```math
\mathbf{E} = -\nabla V,\qquad V(\mathbf{r}) = -\int_{\text{ref}}^{\mathbf{r}} \mathbf{E}\cdot d\boldsymbol{\ell}
```

The potential difference between two points is the work per unit charge, $`V_a - V_b = -\int_b^a \mathbf{E}\cdot d\boldsymbol{\ell}`. For a point charge (with $`V\to 0` at infinity), $`V = \frac{1}{4\pi\varepsilon_0}\frac{q}{r}`.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Field = force per charge.* Instead of computing the force between every pair of charges, we let the source charges create a field $`\mathbf{E}` at every point, and a test charge $`q_0` placed there simply feels $`\mathbf{F} = q_0 \mathbf{E}`. The field decouples the source from the test charge and, by superposition, is the vector sum of the fields of all the sources.

2. *A conservative field has a potential.* In electrostatics $`\nabla\times\mathbf{E}=0`, so the line integral of $`\mathbf{E}` between two points is **path-independent**. That lets us define a single number at each point — the potential $`V` — whose gradient (with a minus sign) is the field: $`\mathbf{E} = -\nabla V`. The minus sign means the field points "downhill," in the direction of decreasing potential, just as a ball rolls down a slope.

3. *Equipotential surfaces.* Points at the same potential form **equipotential surfaces**. Because $`\mathbf{E} = -\nabla V` is perpendicular to surfaces of constant $`V`, field lines always cross equipotentials at right angles. Near a point charge the equipotentials are concentric spheres ($`V \propto 1/r`); for a dipole they are closed loops around each charge joined by a zero-potential plane between them.

<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Equipotential contours and field lines of a point charge">
  <rect x="0" y="0" width="440" height="260" fill="#ffffff"/>
  <g fill="none" stroke="#2980b9" stroke-width="1.4" stroke-dasharray="5 4">
    <circle cx="220" cy="130" r="40"/>
    <circle cx="220" cy="130" r="75"/>
    <circle cx="220" cy="130" r="110"/>
  </g>
  <g stroke="#e74c3c" stroke-width="1.4">
    <line x1="220" y1="130" x2="220" y2="20"/>
    <line x1="220" y1="130" x2="330" y2="130"/>
    <line x1="220" y1="130" x2="220" y2="240"/>
    <line x1="220" y1="130" x2="110" y2="130"/>
    <line x1="220" y1="130" x2="298" y2="52"/>
    <line x1="220" y1="130" x2="142" y2="208"/>
  </g>
  <g fill="#e74c3c">
    <polygon points="220,20 215,32 225,32"/>
    <polygon points="330,130 318,125 318,135"/>
    <polygon points="220,240 215,228 225,228"/>
    <polygon points="110,130 122,125 122,135"/>
  </g>
  <circle cx="220" cy="130" r="13" fill="#e74c3c"/>
  <text x="220" y="136" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="bold" fill="#fff">+</text>
  <text x="262" y="98" font-family="system-ui" font-size="12" fill="#2980b9">V = const</text>
  <text x="228" y="60" font-family="system-ui" font-size="12" fill="#e74c3c">E</text>
  <text x="220" y="255" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">E ⟂ equipotentials; V ∝ 1/r</text>
</svg>

4. *The potential is a bookkeeping shortcut.* For many charges the potential is just a sum of scalars, $`V(\mathbf{r}) = \frac{1}{4\pi\varepsilon_0}\sum_i q_i/r_i`, which is far easier to add than vectors. Once you have $`V`, the field is its gradient. This "sum scalars, then differentiate" strategy is the workhorse of electrostatics.

5. *Authoritative source.* See Griffiths, *Introduction to Electrodynamics*, Ch. 2, and [OpenStax, University Physics Vol. 2, Ch. 7 (Electric Potential)](https://openstax.org/books/university-physics-volume-2/pages/7-1-electric-potential-energy).

<details><summary>Example problem</summary>

A point charge $`q = +2.0\,\text{nC}` sits at the origin. Find the potential at $`r = 0.10\,\text{m}` and the electric field there (magnitude and direction).

<details><summary>Solution</summary>

```math
V = \frac{1}{4\pi\varepsilon_0}\frac{q}{r}
= (8.99\times10^9)\,\frac{2.0\times10^{-9}}{0.10}
\approx 180\ \text{V}
```

```math
E = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}
= (8.99\times10^9)\,\frac{2.0\times10^{-9}}{(0.10)^2}
\approx 180\ \text{V/m}
```

The field points radially **outward** (positive charge). Notice $`E = V/r` here, which holds for a point charge because $`V \propto 1/r`.
</details>

</details>

</details>

## Interactive: drag the charges

Drag the charges and switch between the electric field (arrows, coloured by strength) and the potential (colour map with equipotential contours). Watch how the field is always perpendicular to the equipotentials, and how a positive and a negative charge together make a dipole pattern.

<iframe src="./Electrostatics.simulation.html" title="Draggable-charge electric field and potential visualizer"></iframe>

## 3. Gauss's law

**Definition.** The total electric flux through any closed surface equals the enclosed charge divided by $`\varepsilon_0`:

```math
\oint_S \mathbf{E}\cdot d\mathbf{A} = \frac{Q_{\text{enc}}}{\varepsilon_0},\qquad \nabla\cdot\mathbf{E} = \frac{\rho}{\varepsilon_0}
```

Gauss's law is one of Maxwell's equations — the integral form of the divergence of the field. It is exact for any closed surface, but it is a *calculation* tool only when the charge distribution has enough symmetry.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Flux counts the net field leaving a surface.* The flux $`\Phi_E = \oint \mathbf{E}\cdot d\mathbf{A}` sums the outward component of the field over a closed surface. Field lines entering contribute negative flux, lines leaving contribute positive flux. Gauss's law says the *net* flux depends only on how much charge is inside.

2. *External charge contributes zero net flux.* A charge outside the surface sends field lines in and out that cancel exactly, so it adds nothing to the net flux. Only the enclosed charge $`Q_{\text{enc}}` matters. This is the deep content of the law: the net flux is a "charge counter."

3. *Symmetry turns it into a calculator.* If the field has a known direction and constant magnitude over a cleverly chosen **Gaussian surface**, the integral reduces to $`E \times (\text{area})`:
   - **Spherical** symmetry (point charge, charged sphere): a concentric sphere gives $`E(4\pi r^2) = Q_{\text{enc}}/\varepsilon_0`, recovering Coulomb's law.
   - **Cylindrical** symmetry (infinite line charge): a coaxial cylinder gives $`E(2\pi r \ell) = \lambda \ell/\varepsilon_0`, so $`E = \lambda/(2\pi\varepsilon_0 r)`.
   - **Planar** symmetry (infinite sheet): a "pillbox" straddling the sheet gives $`E(2A) = \sigma A/\varepsilon_0`, so $`E = \sigma/(2\varepsilon_0)`, independent of distance.

<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gaussian sphere around a point charge with outward flux">
  <rect x="0" y="0" width="440" height="260" fill="#ffffff"/>
  <circle cx="220" cy="130" r="95" fill="none" stroke="#8e44ad" stroke-width="2" stroke-dasharray="6 5"/>
  <g stroke="#e74c3c" stroke-width="1.5">
    <line x1="220" y1="130" x2="220" y2="20"/>
    <line x1="220" y1="130" x2="300" y2="55"/>
    <line x1="220" y1="130" x2="340" y2="110"/>
    <line x1="220" y1="130" x2="340" y2="150"/>
    <line x1="220" y1="130" x2="300" y2="205"/>
    <line x1="220" y1="130" x2="220" y2="240"/>
    <line x1="220" y1="130" x2="140" y2="205"/>
    <line x1="220" y1="130" x2="100" y2="150"/>
    <line x1="220" y1="130" x2="100" y2="110"/>
    <line x1="220" y1="130" x2="140" y2="55"/>
  </g>
  <g fill="#e74c3c">
    <polygon points="220,20 215,32 225,32"/>
    <polygon points="340,110 328,106 329,118"/>
    <polygon points="100,150 112,146 111,158"/>
    <polygon points="140,55 145,67 153,58"/>
  </g>
  <circle cx="220" cy="130" r="12" fill="#e74c3c"/>
  <text x="220" y="136" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="bold" fill="#fff">Q</text>
  <text x="330" y="40" font-family="system-ui" font-size="12" fill="#8e44ad">Gaussian surface S</text>
  <text x="220" y="255" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">∮ E·dA = Q_enc/ε₀ (all lines leave; net flux ∝ enclosed charge)</text>
</svg>

4. *Authoritative source.* Gauss's law is the first of Maxwell's equations; see [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008) and Griffiths, *Introduction to Electrodynamics*, Ch. 1–2.

<details><summary>Example problem</summary>

A long straight wire carries a uniform linear charge density $`\lambda = 5.0\,\mu\text{C/m}`. Use Gauss's law to find the electric field at a distance $`r = 0.05\,\text{m}` from the wire.

<details><summary>Solution</summary>

Choose a coaxial cylindrical Gaussian surface of radius $`r` and length $`\ell`. By symmetry $`\mathbf{E}` is radial and constant on the curved wall, and there is no flux through the end caps. The enclosed charge is $`Q_{\text{enc}} = \lambda \ell`:

```math
E(2\pi r \ell) = \frac{\lambda \ell}{\varepsilon_0}
\quad\Rightarrow\quad
E = \frac{\lambda}{2\pi\varepsilon_0 r}
= \frac{5.0\times10^{-6}}{2\pi(8.85\times10^{-12})(0.05)}
\approx 1.8\times10^{4}\ \text{V/m}
```

The field points radially outward (positive line charge) and falls as $`1/r`.
</details>

</details>

</details>

## 4. Conductors in electrostatic equilibrium and shielding

**Definition.** In a conductor in electrostatic equilibrium: (i) the electric field **inside the conducting material is zero**; (ii) any net charge resides **on the surface**; (iii) the conductor is an **equipotential**; (iv) the field just outside the surface is **perpendicular** to it, with magnitude $`E = \sigma_s/\varepsilon_0` (where $`\sigma_s` is the local surface charge density). A closed conducting shell shields its interior from external static fields — the **Faraday cage**.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Free charges move until the field vanishes.* A metal contains mobile electrons. If any field existed inside the metal, those electrons would feel a force and drift. They keep moving until the field they create exactly cancels the applied one, so the **net** field inside the conducting material is zero. Equilibrium is reached in a fraction of a nanosecond.

2. *Charge is pushed to the surface.* Because the interior field is zero, Gauss's law applied to a surface just inside the boundary gives zero enclosed charge: all excess charge must sit on the surface. The surface charge arranges itself so that the field it produces, added to any external field, is zero inside and perpendicular to the surface outside.

3. *Shielding (the Faraday cage).* Place a closed conductor in an external static field. The external field polarizes the conductor: charge accumulates on the two faces, and the field from that induced charge cancels the external field **everywhere inside the cavity**. The interior is field-free regardless of the external field's strength or shape. This is why a car body protects its occupants from a lightning strike, why a metal box protects sensitive electronics from radio interference, and why the inside of a charged hollow conductor is at a constant potential.

<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Faraday cage: external field lines deflect around a conducting shell, zero field inside">
  <rect x="0" y="0" width="440" height="260" fill="#ffffff"/>
  <g stroke="#2980b9" stroke-width="1.6" fill="none">
    <path d="M20,50 C150,50 200,52 250,55 C300,52 380,50 420,50"/>
    <path d="M20,95 C120,95 160,92 195,80 C230,68 270,66 310,78 C360,92 400,95 420,95"/>
    <path d="M20,130 L180,130"/>
    <path d="M180,130 C160,110 165,80 195,68 C230,55 280,58 320,75"/>
    <path d="M180,130 C160,150 165,180 195,192 C230,205 280,202 320,185"/>
    <path d="M20,165 C120,165 160,168 195,180 C230,192 270,194 310,182 C360,168 400,165 420,165"/>
    <path d="M20,210 C150,210 200,208 250,205 C300,208 380,210 420,210"/>
  </g>
  <g fill="#2980b9">
    <polygon points="420,50 408,45 408,55"/>
    <polygon points="420,95 408,90 408,100"/>
    <polygon points="320,75 308,70 310,82"/>
    <polygon points="320,185 308,180 310,192"/>
    <polygon points="420,165 408,160 408,170"/>
    <polygon points="420,210 408,205 408,215"/>
  </g>
  <circle cx="250" cy="130" r="70" fill="#f5e6d3" stroke="#e67e22" stroke-width="4"/>
  <g font-family="system-ui" font-size="14" font-weight="bold">
    <text x="182" y="112" fill="#2980b9">−</text>
    <text x="179" y="135" fill="#2980b9">−</text>
    <text x="182" y="158" fill="#2980b9">−</text>
    <text x="312" y="112" fill="#c0392b">+</text>
    <text x="315" y="135" fill="#c0392b">+</text>
    <text x="312" y="158" fill="#c0392b">+</text>
  </g>
  <text x="250" y="135" text-anchor="middle" font-family="system-ui" font-size="14" fill="#7f8c8d">E = 0</text>
  <text x="220" y="250" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">external field is cancelled inside the closed conductor (Faraday cage)</text>
</svg>

4. *Authoritative source.* See Griffiths, *Introduction to Electrodynamics*, Ch. 2 (conductors), and [OpenStax, University Physics Vol. 2, Ch. 6 (Conductors in Electrostatic Equilibrium)](https://openstax.org/books/university-physics-volume-2/pages/6-4-conductors-in-electrostatic-equilibrium).

<details><summary>Example problem</summary>

A hollow conducting sphere of radius $`R = 0.10\,\text{m}` carries a net charge $`Q = +6.0\,\mu\text{C}`. Find the electric field (a) at the centre, (b) inside the metal, (c) just outside the surface, and (d) at $`r = 0.30\,\text{m}`.

<details><summary>Solution</summary>

(a) At the centre and (b) anywhere inside the metal, the field is **zero** — the conductor is in electrostatic equilibrium.

(c) Just outside the surface the charge is spread uniformly over the sphere, so the field is that of a point charge at $`r = R`:

```math
E = \frac{1}{4\pi\varepsilon_0}\frac{Q}{R^2}
= (8.99\times10^9)\,\frac{6.0\times10^{-6}}{(0.10)^2}
\approx 5.4\times10^{5}\ \text{V/m}
```

(d) Outside, the sphere behaves as a point charge at the centre:

```math
E = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2}
= (8.99\times10^9)\,\frac{6.0\times10^{-6}}{(0.30)^2}
\approx 6.0\times10^{4}\ \text{V/m}
```

The field is zero inside, jumps to its maximum at the surface, and then falls as $`1/r^2`.
</details>

</details>

</details>

## 5. Capacitance and capacitors

**Definition.** The **capacitance** of a two-conductor system is the charge stored per unit potential difference:

```math
C = \frac{Q}{V}
```

For a parallel-plate capacitor in vacuum (plate area $`A`, separation $`d`, ignoring edge effects),

```math
C = \frac{\varepsilon_0 A}{d}
```

The energy stored is $`U = \tfrac{1}{2}CV^2 = \tfrac{1}{2}QV = Q^2/(2C)`, and it resides in the electric field between the plates.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Capacitance is a geometric property.* A capacitor is two conductors holding equal and opposite charge $`\pm Q` at a potential difference $`V`. The ratio $`C = Q/V` depends only on the geometry (and the vacuum permittivity here), not on how much charge you put on it. Bigger plates and smaller gaps store more charge per volt.

2. *Deriving the parallel-plate value.* By Gauss's law (Section 3), a plate with surface charge density $`\sigma = Q/A` produces a field $`E = \sigma/(2\varepsilon_0)`; the two plates' fields add between them and cancel outside, giving a uniform field $`E = \sigma/\varepsilon_0 = Q/(\varepsilon_0 A)` between the plates. The potential difference is $`V = E d = Qd/(\varepsilon_0 A)`, so

```math
C = \frac{Q}{V} = \frac{\varepsilon_0 A}{d}
```

3. *Energy lives in the field.* Charging a capacitor stores energy $`U = \tfrac{1}{2}CV^2`. This energy is not "in the plates" — it is in the electric field between them, with density $`u = \tfrac{1}{2}\varepsilon_0 E^2` (the electric half of the energy density in [Poynting's theorem](./Electrodynamics.md)). Integrating $`u` over the volume between the plates reproduces $`U = \tfrac{1}{2}CV^2`.

<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallel-plate capacitor: uniform field between plates, fringing at the edges">
  <rect x="0" y="0" width="440" height="240" fill="#ffffff"/>
  <line x1="120" y1="40" x2="120" y2="200" stroke="#2c3e50" stroke-width="6"/>
  <line x1="320" y1="40" x2="320" y2="200" stroke="#2c3e50" stroke-width="6"/>
  <g font-family="system-ui" font-size="14" font-weight="bold" fill="#c0392b">
    <text x="105" y="70">+</text><text x="105" y="110">+</text><text x="105" y="150">+</text><text x="105" y="190">+</text>
  </g>
  <g font-family="system-ui" font-size="14" font-weight="bold" fill="#2980b9">
    <text x="328" y="70">−</text><text x="328" y="110">−</text><text x="328" y="150">−</text><text x="328" y="190">−</text>
  </g>
  <g stroke="#e67e22" stroke-width="1.6">
    <line x1="140" y1="70" x2="300" y2="70"/>
    <line x1="140" y1="110" x2="300" y2="110"/>
    <line x1="140" y1="150" x2="300" y2="150"/>
    <line x1="140" y1="190" x2="300" y2="190"/>
  </g>
  <g fill="#e67e22">
    <polygon points="300,70 288,65 288,75"/>
    <polygon points="300,110 288,105 288,115"/>
    <polygon points="300,150 288,145 288,155"/>
    <polygon points="300,190 288,185 288,195"/>
  </g>
  <g stroke="#e67e22" stroke-width="1.2" fill="none" opacity="0.7">
    <path d="M120,40 C180,20 260,20 320,40"/>
    <path d="M120,200 C180,220 260,220 320,200"/>
  </g>
  <line x1="120" y1="225" x2="320" y2="225" stroke="#2c3e50" stroke-width="1"/>
  <polygon points="120,225 130,221 130,229" fill="#2c3e50"/>
  <polygon points="320,225 310,221 310,229" fill="#2c3e50"/>
  <text x="220" y="222" text-anchor="middle" font-family="system-ui" font-size="12" fill="#2c3e50">d</text>
  <text x="220" y="125" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e67e22">E = V/d (uniform)</text>
</svg>

4. *Authoritative source.* See Griffiths, *Introduction to Electrodynamics*, Ch. 4 (capacitance), and [OpenStax, University Physics Vol. 2, Ch. 8 (Capacitors and Capacitance)](https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance).

<details><summary>Example problem</summary>

A parallel-plate capacitor has square plates of side $`a = 5.0\,\text{cm}` separated by $`d = 1.0\,\text{mm}` in vacuum. Find its capacitance, the charge on each plate when it is connected to a $`12\,\text{V}` source, and the energy stored.

<details><summary>Solution</summary>

The plate area is $`A = a^2 = (0.05)^2 = 2.5\times10^{-3}\ \text{m}^2`. The capacitance is

```math
C = \frac{\varepsilon_0 A}{d}
= \frac{(8.85\times10^{-12})(2.5\times10^{-3})}{1.0\times10^{-3}}
\approx 2.2\times10^{-11}\ \text{F} \approx 22\ \text{pF}
```

The charge is $`Q = CV = (2.2\times10^{-11})(12) \approx 2.7\times10^{-10}\ \text{C} \approx 0.27\ \text{nC}`. The stored energy is

```math
U = \tfrac{1}{2}CV^2 = \tfrac{1}{2}(2.2\times10^{-11})(12)^2 \approx 1.6\times10^{-9}\ \text{J}
```

A small gap and large area give a usable capacitance; inserting a dielectric would multiply $`C` by $`\varepsilon_r` (see [Electromagnetic Media](./ElectromagneticMedia.md)).
</details>

</details>

</details>

## Related topics

- [Electrodynamics](./Electrodynamics.md): the time-varying regime of which electrostatics is the static limit; the displacement current and Poynting theorem that underpin the field energy here.
- [Magnetostatics](./Magnetostatics.md): the magnetic static limit (steady currents), the sibling of electrostatics.
- [Electromagnetic Media](./ElectromagneticMedia.md): how dielectrics and the constitutive relation $`\mathbf{D}=\varepsilon\mathbf{E}` modify the vacuum results on this page.
- [Electromagnetic Radiation](./ElectromagneticRadiation.md): the far-field, propagating limit of the same Maxwell equations.

Part of [Electromagnetism](./Readme.md).

## Quizz

<details><summary>Test yourself</summary>

**Problem.** Two identical conducting spheres, each of radius $`R = 0.05\,\text{m}`, carry charges $`Q_1 = +4.0\,\mu\text{C}` and $`Q_2 = -4.0\,\mu\text{C}` and are held $`d = 0.50\,\text{m}` apart (centre to centre) in vacuum.

1. What is the magnitude of the electrostatic force between the spheres?
2. What is the electric potential at the midpoint between the two centres (take $`V \to 0` at infinity)?
3. If the two spheres are now connected by a thin conducting wire, what charge does each carry afterwards?

<details><summary>Solution</summary>

1. Because $`d \gg R`, each sphere's charge is well approximated as a point charge at its centre. Coulomb's law gives

```math
F = \frac{1}{4\pi\varepsilon_0}\,\frac{|Q_1 Q_2|}{d^2}
= (8.99\times10^9)\,\frac{(4.0\times10^{-6})^2}{(0.50)^2}
\approx 0.58\ \text{N}
```

The force is attractive (opposite signs).

2. The potential is a scalar sum. At the midpoint each sphere is a distance $`d/2 = 0.25\,\text{m}` away, so

```math
V = \frac{1}{4\pi\varepsilon_0}\left(\frac{Q_1}{d/2} + \frac{Q_2}{d/2}\right)
= \frac{1}{4\pi\varepsilon_0}\,\frac{Q_1 + Q_2}{d/2}
= 0
```

The equal and opposite charges cancel exactly — the midpoint lies on the zero-potential plane of the dipole-like pair.

3. Connecting the spheres with a wire lets charge flow until both are at the **same potential**. Identical spheres at the same potential carry the same charge, so the total charge is shared equally:

```math
Q_{\text{each}} = \frac{Q_1 + Q_2}{2} = \frac{+4.0 - 4.0}{2} = 0
```

Both spheres end up neutral. (For *unequal* spheres the final charges would not be equal — they would be proportional to the radii, since $`V = Q/(4\pi\varepsilon_0 R)`.)
</details>

</details>
