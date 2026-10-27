# Magnetostatics

Magnetostatics is the regime of electromagnetism in which currents are steady (time-independent). The governing laws are Ampère's law $`\nabla \times \mathbf{B} = \mu_0 \mathbf{J}` and Gauss's law for magnetism $`\nabla \cdot \mathbf{B} = 0` (no magnetic monopoles).

**Typical applications:** permanent magnets, inductors, MRI magnets.

**When it is relevant.** Magnetostatics is the slow, static limit of [Electrodynamics](./Electrodynamics.md), the magnetic sibling of [Electrostatics](./Electrostatics.md). It applies whenever the currents of interest are steady — or change so slowly that the fields they produce are essentially constant on the timescale of the problem. The criterion is the same as in electrostatics: the system's size $`L` is small compared with the distance light travels in the relevant time, $`L \ll c\,\tau`, so the time-derivative terms in Maxwell's equations vanish. Under that condition the magnetic field is produced only by steady currents (and by the steady magnetization of materials), and the whole problem is governed by two vector equations. This is the regime behind the field of a straight wire, the uniform field inside a solenoid, the force between parallel conductors, and the field of a permanent magnet.

This page treats **vacuum** magnetostatics first: the permeability is the vacuum value $`\mu_0` throughout. How a material modifies the field — permeability, the auxiliary field $`\mathbf{H}`, and the constitutive relation $`\mathbf{B}=\mu\mathbf{H}` — is developed in Section 5 and in [Electromagnetic Media](./ElectromagneticMedia.md).

> **Authoritative sources**
> - [Maxwell, *A Dynamical Theory of the Electromagnetic Field* (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)
> - [Biot–Savart law (Wikipedia)](https://en.wikipedia.org/wiki/Biot%E2%80%93Savart_law)
> - Griffiths, *Introduction to Electrodynamics* (Ch. 5, Magnetostatics)

Part of [Electromagnetism](./Readme.md); the static limit of [Electrodynamics](./Electrodynamics.md).

## 1. Biot–Savart law

**Definition.** The magnetic field $`d\mathbf{B}` at a point due to a small steady current element $`I\,d\boldsymbol{\ell}` is

```math
d\mathbf{B} = \frac{\mu_0}{4\pi}\,\frac{I\,d\boldsymbol{\ell}\times\hat{\mathbf{r}}}{r^2}
```

where $`\hat{\mathbf{r}}` points from the element to the field point and $`r` is the distance. The total field of a steady current is the vector integral (superposition) of these contributions. The field is always **perpendicular** to the current element and to the line joining it to the field point, and it circulates around the current according to the **right-hand rule**.

<details><summary>Details</summary>

**The idea, step by step.**

1. *A current element is the magnetic analogue of a point charge.* Just as a point charge $`q` produces an electric field $`\mathbf{E}\propto q\,\hat{\mathbf{r}}/r^2` (Coulomb's law, [Electrostatics](./Electrostatics.md)), a tiny piece of wire carrying current $`I` produces a magnetic field. The Biot–Savart law is the magnetic "Coulomb's law": it gives the field of the smallest source element, and everything else is built by superposition.

2. *The cross product sets the direction.* The factor $`d\boldsymbol{\ell}\times\hat{\mathbf{r}}` means the field is perpendicular to both the current direction and the line to the field point. Curl the fingers of your right hand in the direction of the current; your thumb points along $`d\boldsymbol{\ell}` and your curled fingers show how $`\mathbf{B}` circles the wire. This is why the field of a straight wire is a set of **concentric circles** around it.

3. *Integrate to get the field of a real wire.* For a long straight wire, every element contributes a field tangent to a circle of radius $`r` around the wire, and all contributions point the same way. Integrating around the whole wire gives the classic result

```math
B = \frac{\mu_0 I}{2\pi r}
```

The field falls as $`1/r` (not $`1/r^2` as in electrostatics) because a wire is an extended source, not a point.

<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Magnetic field lines of a long straight wire: concentric circles around the wire, right-hand rule">
  <rect x="0" y="0" width="440" height="260" fill="#ffffff"/>
  <g fill="none" stroke="#2980b9" stroke-width="1.6">
    <circle cx="220" cy="130" r="35"/>
    <circle cx="220" cy="130" r="70"/>
    <circle cx="220" cy="130" r="105"/>
  </g>
  <g fill="#2980b9">
    <polygon points="220,95 214,107 226,107"/>
    <polygon points="255,130 243,124 243,136"/>
    <polygon points="220,165 214,153 226,153"/>
    <polygon points="185,130 197,124 197,136"/>
    <polygon points="220,60 214,72 226,72"/>
    <polygon points="290,130 278,124 278,136"/>
    <polygon points="220,200 214,188 226,188"/>
    <polygon points="150,130 162,124 162,136"/>
  </g>
  <circle cx="220" cy="130" r="14" fill="#e74c3c"/>
  <text x="220" y="136" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="bold" fill="#fff">&#8593;</text>
  <text x="245" y="120" font-family="system-ui" font-size="13" fill="#e74c3c">I</text>
  <text x="300" y="90" font-family="system-ui" font-size="12" fill="#2980b9">B &#8733; 1/r</text>
  <text x="220" y="252" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">B circles the wire (right-hand rule); &#8593; = current out of the page</text>
</svg>

4. *Authoritative source.* See the [Biot–Savart law](https://en.wikipedia.org/wiki/Biot%E2%80%93Savart_law) and Griffiths, *Introduction to Electrodynamics*, Ch. 5.

<details><summary>Example problem</summary>

A long straight wire carries a steady current $`I = 5.0\,\text{A}`. Find the magnetic field at a distance $`r = 0.10\,\text{m}` from the wire.

<details><summary>Solution</summary>

Use the integrated Biot–Savart result for a long straight wire:

```math
B = \frac{\mu_0 I}{2\pi r}
= \frac{(4\pi\times10^{-7})(5.0)}{2\pi(0.10)}
= \frac{2\times10^{-7}\times 5.0}{0.10}
= 1.0\times10^{-5}\ \text{T} = 10\ \mu\text{T}
```

The field circles the wire; at the point in question it is tangent to the circle of radius $`r` (right-hand rule).
</details>

</details>

</details>

## 2. Ampère's law

**Definition.** The line integral of the magnetic field around any closed loop equals $`\mu_0` times the net current threading the loop:

```math
\oint_C \mathbf{B}\cdot d\boldsymbol{\ell} = \mu_0\, I_{\text{enc}},\qquad \nabla\times\mathbf{B} = \mu_0\mathbf{J}
```

Ampère's law is the integral form of the curl of the field — the magnetic counterpart of Gauss's law in [Electrostatics](./Electrostatics.md). It is exact for any closed loop, but it is a *calculation* tool only when the current distribution has enough symmetry.

<details><summary>Details</summary>

**The idea, step by step.**

1. *The circulation counts the enclosed current.* The line integral $`\oint \mathbf{B}\cdot d\boldsymbol{\ell}` sums the component of the field *along* a closed path. Ampère's law says this circulation depends only on how much current passes through the surface bounded by the path — currents outside the loop contribute nothing to the net circulation. It is a "current counter," exactly as Gauss's law is a "charge counter."

2. *Why the field of a straight wire satisfies it.* Take a circular loop of radius $`r` around a long straight wire. By the right-hand rule $`\mathbf{B}` is everywhere tangent to the loop and has constant magnitude $`B`, so the integral is $`B(2\pi r)`. The enclosed current is $`I`, so $`B(2\pi r)=\mu_0 I`, recovering $`B=\mu_0 I/(2\pi r)` from Section 1 — but without doing the Biot–Savart integral.

3. *Symmetry turns it into a calculator.* Choose an **Ampèrian loop** on which $`\mathbf{B}` is either constant and parallel to $`d\boldsymbol{\ell}` or perpendicular to it (so it contributes nothing):
   - **Infinite straight wire** (cylindrical symmetry): a coaxial circle gives $`B = \mu_0 I/(2\pi r)`.
   - **Long solenoid** (a coil of $`n` turns per unit length): a rectangular loop straddling the wall gives a uniform interior field $`B = \mu_0 n I` and (ideally) zero outside.
   - **Toroid** (a coil wound on a ring, $`N` total turns): a circular loop of radius $`r` inside the core gives $`B = \mu_0 N I/(2\pi r)`, and zero outside.

<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ampèrian loop around a straight wire: B is tangent to the loop, circulation equals mu0 times enclosed current">
  <rect x="0" y="0" width="440" height="260" fill="#ffffff"/>
  <circle cx="220" cy="130" r="90" fill="none" stroke="#8e44ad" stroke-width="2.5" stroke-dasharray="7 5"/>
  <g fill="#8e44ad">
    <polygon points="220,40 213,54 227,54"/>
    <polygon points="310,130 296,123 296,137"/>
    <polygon points="220,220 213,206 227,206"/>
    <polygon points="130,130 144,123 144,137"/>
  </g>
  <circle cx="220" cy="130" r="13" fill="#e74c3c"/>
  <text x="220" y="136" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="bold" fill="#fff">&#8593;</text>
  <text x="243" y="120" font-family="system-ui" font-size="13" fill="#e74c3c">I</text>
  <text x="322" y="70" font-family="system-ui" font-size="12" fill="#8e44ad">Ampèrian loop C</text>
  <text x="220" y="252" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">&#8750; B&#183;d&#8467; = &#956;&#8320; I&#8348;&#8349;&#8349; (B tangent to C, constant magnitude)</text>
</svg>

4. *Authoritative source.* Ampère's law is one of Maxwell's equations; see [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008) and Griffiths, *Introduction to Electrodynamics*, Ch. 5.

<details><summary>Example problem</summary>

A long solenoid has $`n = 1000` turns per metre and carries a current $`I = 2.0\,\text{A}`. Use Ampère's law to find the magnetic field inside the solenoid.

<details><summary>Solution</summary>

Choose a rectangular Ampèrian loop with one side inside the solenoid (length $`\ell`), parallel to the axis, and the other side far outside where $`\mathbf{B}\approx 0`. Inside, $`\mathbf{B}` is uniform and parallel to the path, so the integral is $`B\ell`. The loop threads $`n\ell` turns, each carrying $`I`, so $`I_{\text{enc}} = n\ell I`:

```math
B\,\ell = \mu_0\, n\ell\, I
\quad\Rightarrow\quad
B = \mu_0 n I
= (4\pi\times10^{-7})(1000)(2.0)
\approx 2.5\times10^{-3}\ \text{T} = 2.5\ \text{mT}
```

The field is uniform and axial inside, and (for an ideal long solenoid) zero outside.
</details>

</details>

</details>

## 3. Magnetic vector potential

**Definition.** Because $`\nabla\cdot\mathbf{B}=0`, the magnetic field is the **curl of a vector potential** $`\mathbf{A}`:

```math
\mathbf{B} = \nabla\times\mathbf{A},\qquad
\mathbf{A}(\mathbf{r}) = \frac{\mu_0}{4\pi}\int \frac{I\,d\boldsymbol{\ell}'}{r'}
```

where $`r'` is the distance from the source element to the field point. The vector potential is the magnetic analogue of the electrostatic **scalar potential** $`V` (with $`\mathbf{E}=-\nabla V`): it is a bookkeeping quantity whose derivative gives the field.

<details><summary>Details</summary>

**The idea, step by step.**

1. *No monopoles force a vector potential.* In electrostatics the field is conservative ($`\nabla\times\mathbf{E}=0`), so it is the gradient of a *scalar* $`V`. In magnetostatics the field is *solenoidal* ($`\nabla\cdot\mathbf{B}=0`, no magnetic monopoles), so it is the *curl* of a *vector* $`\mathbf{A}`. The two static regimes are exact mirrors: a scalar potential whose gradient gives $`\mathbf{E}`, and a vector potential whose curl gives $`\mathbf{B}`.

2. *The potential is a sum of scalars, then differentiate.* For a steady current the vector potential at a point is just a scalar sum over the current elements, $`\mathbf{A} = (\mu_0/4\pi)\int I\,d\boldsymbol{\ell}'/r'` — far easier to add than the vector Biot–Savart field. Once you have $`\mathbf{A}`, the field is its curl. This "sum, then differentiate" strategy parallels the electrostatic one and is the workhorse for more complicated geometries.

3. *Gauge freedom.* $`\mathbf{A}` is not unique: adding the gradient of any scalar, $`\mathbf{A}\to\mathbf{A}+\nabla\chi`, leaves $`\mathbf{B}=\nabla\times\mathbf{A}` unchanged. Only $`\mathbf{B}` (and, in quantum mechanics, the line integral of $`\mathbf{A}`) is physically observable — the content of the Aharonov–Bohm effect.

<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Analogy between electrostatics and magnetostatics: scalar potential gives E, vector potential gives B">
  <rect x="0" y="0" width="440" height="240" fill="#ffffff"/>
  <rect x="30" y="30" width="160" height="46" rx="6" fill="#eaf2fb" stroke="#2980b9" stroke-width="2"/>
  <text x="110" y="58" text-anchor="middle" font-family="system-ui" font-size="15" fill="#2c3e50">scalar potential V</text>
  <rect x="250" y="30" width="160" height="46" rx="6" fill="#fdebd0" stroke="#e67e22" stroke-width="2"/>
  <text x="330" y="58" text-anchor="middle" font-family="system-ui" font-size="15" fill="#2c3e50">vector potential A</text>
  <rect x="30" y="150" width="160" height="46" rx="6" fill="#eaf2fb" stroke="#2980b9" stroke-width="2"/>
  <text x="110" y="178" text-anchor="middle" font-family="system-ui" font-size="15" fill="#2c3e50">E = &#8713;V</text>
  <rect x="250" y="150" width="160" height="46" rx="6" fill="#fdebd0" stroke="#e67e22" stroke-width="2"/>
  <text x="330" y="178" text-anchor="middle" font-family="system-ui" font-size="15" fill="#2c3e50">B = &#8713;&#215;A</text>
  <line x1="110" y1="76" x2="110" y2="150" stroke="#2980b9" stroke-width="2"/>
  <polygon points="110,150 104,138 116,138" fill="#2980b9"/>
  <line x1="330" y1="76" x2="330" y2="150" stroke="#e67e22" stroke-width="2"/>
  <polygon points="330,150 324,138 336,138" fill="#e67e22"/>
  <text x="110" y="115" text-anchor="middle" font-family="system-ui" font-size="12" fill="#2980b9">gradient</text>
  <text x="330" y="115" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e67e22">curl</text>
  <text x="220" y="228" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">electrostatics &#8596; magnetostatics: &#8713;V &#8594; E, &#8713;&#215;A &#8594; B</text>
</svg>

4. *Authoritative source.* See Griffiths, *Introduction to Electrodynamics*, Ch. 5 (vector potential), and [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008).

<details><summary>Example problem</summary>

A long straight wire along the $`z`-axis carries current $`I`. Show that a vector potential $`A_z = -(\mu_0 I/2\pi)\ln(r/r_0)` reproduces the field of Section 1.

<details><summary>Solution</summary>

With $`\mathbf{A} = A_z(r)\,\hat{\mathbf{z}}` and $`A_z = -(\mu_0 I/2\pi)\ln(r/r_0)`, the curl in cylindrical coordinates has only a $\`\phi`-component:

```math
B_\phi = -\frac{\partial A_z}{\partial r}
= -\frac{\partial}{\partial r}\left[-\frac{\mu_0 I}{2\pi}\ln\frac{r}{r_0}\right]
= \frac{\mu_0 I}{2\pi}\,\frac{1}{r}
```

This is exactly the field of the long straight wire. The arbitrary constant $`r_0` reflects the gauge freedom: shifting $`A_z` by a constant (or by the gradient of a scalar) does not change $`\mathbf{B}`.
</details>

</details>

</details>

## 4. Magnetic force on currents

**Definition.** A charge $`q` moving with velocity $`\mathbf{v}` in a magnetic field feels the **Lorentz force**

```math
\mathbf{F} = q\,\mathbf{v}\times\mathbf{B}
```

For a steady current $`I` in a wire, the force on a segment is $`d\mathbf{F} = I\,d\boldsymbol{\ell}\times\mathbf{B}`. Two long parallel wires carrying currents $`I_1` and $`I_2` a distance $`d` apart exert a force per unit length

```math
\frac{F}{L} = \frac{\mu_0 I_1 I_2}{2\pi d}
```

on each other — **attractive** for currents in the same direction, **repulsive** for opposite currents.

<details><summary>Details</summary>

**The idea, step by step.**

1. *The magnetic force is always sideways.* The cross product $`\mathbf{v}\times\mathbf{B}` means the force is perpendicular to both the velocity and the field, so it changes the *direction* of a moving charge but never its *speed*. A magnetic field does no work on a charge; it only bends the trajectory into a circle or helix. This is the origin of the circular field lines of Section 1 — a moving charge's own field circles its path.

2. *A current in a field feels a force.* The charges drifting through a wire each feel $`q\mathbf{v}\times\mathbf{B}`; summed over the wire this is $`d\mathbf{F}=I\,d\boldsymbol{\ell}\times\mathbf{B}`. This is the principle behind the electric motor (a current-carrying coil in a field experiences a torque) and the Hall effect.

3. *Parallel wires attract or repel.* Wire 1 creates a circular field $`B_1 = \mu_0 I_1/(2\pi d)` at the location of wire 2. The current in wire 2 then feels $`F/L = I_2 B_1 = \mu_0 I_1 I_2/(2\pi d)`. The right-hand rule shows the force pulls the wires together when the currents flow the same way and pushes them apart when they oppose. This force per unit length is in fact the historical definition of the ampere.

<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel wires with currents in the same direction attract each other">
  <rect x="0" y="0" width="440" height="240" fill="#ffffff"/>
  <line x1="150" y1="30" x2="150" y2="210" stroke="#2c3e50" stroke-width="5"/>
  <line x1="290" y1="30" x2="290" y2="210" stroke="#2c3e50" stroke-width="5"/>
  <g fill="#e74c3c">
    <circle cx="150" cy="70" r="9"/><circle cx="150" cy="120" r="9"/><circle cx="150" cy="170" r="9"/>
    <circle cx="290" cy="70" r="9"/><circle cx="290" cy="120" r="9"/><circle cx="290" cy="170" r="9"/>
  </g>
  <g font-family="system-ui" font-size="12" font-weight="bold" fill="#fff" text-anchor="middle">
    <text x="150" y="74">&#8593;</text><text x="150" y="124">&#8593;</text><text x="150" y="174">&#8593;</text>
    <text x="290" y="74">&#8593;</text><text x="290" y="124">&#8593;</text><text x="290" y="174">&#8593;</text>
  </g>
  <line x1="165" y1="120" x2="275" y2="120" stroke="#27ae60" stroke-width="2.5"/>
  <polygon points="165,120 177,114 177,126" fill="#27ae60"/>
  <polygon points="275,120 263,114 263,126" fill="#27ae60"/>
  <text x="220" y="108" text-anchor="middle" font-family="system-ui" font-size="13" fill="#27ae60">attract</text>
  <text x="220" y="232" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">same-direction currents attract; F/L = &#956;&#8320; I&#8321; I&#8322; / (2&#960; d)</text>
</svg>

4. *Authoritative source.* See Griffiths, *Introduction to Electrodynamics*, Ch. 5 (force on currents), and [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008).

<details><summary>Example problem</summary>

Two long parallel wires are $`d = 0.05\,\text{m}` apart and each carries a current of $`4.0\,\text{A}` in the same direction. Find the force per unit length between them, and state whether it is attractive or repulsive.

<details><summary>Solution</summary>

```math
\frac{F}{L} = \frac{\mu_0 I_1 I_2}{2\pi d}
= \frac{(4\pi\times10^{-7})(4.0)(4.0)}{2\pi(0.05)}
= \frac{2\times10^{-7}\times 16}{0.05}
= 6.4\times10^{-5}\ \text{N/m}
```

Because the currents flow in the **same** direction, the force is **attractive**.
</details>

</details>

</details>

## 5. Magnetic materials: the H field and permeability

**Definition.** In a material the magnetic response is described by the auxiliary field $`\mathbf{H}`, related to $`\mathbf{B}` by the **constitutive relation**

```math
\mathbf{B} = \mu\,\mathbf{H} = \mu_0\,\mu_r\,\mathbf{H}
```

where $`\mu = \mu_0\mu_r` is the **permeability** and $`\mu_r` the **relative permeability** of the material. Ampère's law is then written in terms of the *free* current: $`\nabla\times\mathbf{H} = \mathbf{J}_{\text{free}}`. A **permanent magnet** is a material with a fixed magnetization $`\mathbf{M}` that produces a field even with no external current.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Why a second field, H?* In vacuum $`\mathbf{B}=\mu_0\mathbf{H}` and the two are proportional, so either suffices. In a material, however, the total current that sources $`\mathbf{B}` has two parts: the **free** current you drive through a wire, and the **bound** current from the material's microscopic magnetic dipoles aligning. The field $`\mathbf{H}` is defined so that Ampère's law counts only the free current, $`\nabla\times\mathbf{H}=\mathbf{J}_{\text{free}}`, leaving the material's response in the relation $`\mathbf{B}=\mu\mathbf{H}`. This is the magnetic twin of the $`\mathbf{D}`/$`\mathbf{E}` split in [Electromagnetic Media](./ElectromagneticMedia.md).

2. *Permeability measures how easily a material "conducts" magnetic field.* A vacuum has $`\mu_r=1`. A diamagnet has $`\mu_r` just below 1 (it weakly opposes the field); a paramagnet just above 1 (it weakly enhances it); a ferromagnet (iron, nickel, cobalt) has a large, field-dependent $`\mu_r` that can reach thousands, which is why an iron core multiplies the field of a solenoid by a large factor.

3. *Permanent magnets are steady currents in disguise.* A permanent magnet's field comes from the alignment of atomic magnetic moments (electron spin and orbital motion). Macroscopically this is equivalent to a **bound surface current** flowing around the magnet, so the field of a bar magnet is exactly the field of a steady current loop — the dipole field of Section 6. Magnetostatics therefore describes a permanent magnet without any time dependence: the "current" is frozen into the material.

<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar magnet is equivalent to a bound surface current loop, producing a dipole field">
  <rect x="0" y="0" width="440" height="240" fill="#ffffff"/>
  <rect x="150" y="95" width="140" height="50" rx="6" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>
  <text x="175" y="127" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="bold" fill="#fff">N</text>
  <text x="265" y="127" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="bold" fill="#fff">S</text>
  <g fill="none" stroke="#2980b9" stroke-width="1.8">
    <path d="M150,120 C110,120 90,90 120,70 C150,52 200,52 220,70"/>
    <path d="M290,120 C330,120 350,90 320,70 C290,52 240,52 220,70"/>
    <path d="M150,120 C110,120 90,150 120,170 C150,188 200,188 220,170"/>
    <path d="M290,120 C330,120 350,150 320,170 C290,188 240,188 220,170"/>
  </g>
  <g fill="#2980b9">
    <polygon points="220,70 213,82 227,82"/>
    <polygon points="220,170 213,158 227,158"/>
  </g>
  <text x="220" y="228" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">a permanent magnet &#8773; a bound surface current loop (dipole field)</text>
</svg>

4. *Authoritative source.* See [Electromagnetic Media](./ElectromagneticMedia.md) for the full constitutive treatment, and Griffiths, *Introduction to Electrodynamics*, Ch. 5 (magnetic materials).

<details><summary>Example problem</summary>

The solenoid of Section 2 ($`n=1000` turns/m, $`I=2.0\,\text{A}`) is filled with a core of relative permeability $`\mu_r = 200`. Find the magnetic field inside.

<details><summary>Solution</summary>

Ampère's law in terms of $`\mathbf{H}` depends only on the free current, so $`H = nI` is unchanged by the core:

```math
H = nI = (1000)(2.0) = 2.0\times10^{3}\ \text{A/m}
```

The field $`\mathbf{B}` is then multiplied by the permeability:

```math
B = \mu_0 \mu_r H = (4\pi\times10^{-7})(200)(2.0\times10^{3})
\approx 0.50\ \text{T}
```

The iron core boosts the field from $`2.5\,\text{mT}` (air core) to about $`0.5\,\text{T}` — a factor of $`\mu_r = 200`.
</details>

</details>

</details>

## 6. Magnetic dipole moment and dipole field

**Definition.** A small current loop of current $`I` and area $`A` has a **magnetic dipole moment**

```math
\mathbf{m} = I\,A\,\hat{\mathbf{n}}
```

directed normal to the loop by the right-hand rule. Far from the loop ($`r \gg` loop size), its field is that of a **magnetic dipole**; on the axis of the dipole,

```math
B = \frac{\mu_0}{4\pi}\,\frac{2m}{r^3}
```

<details><summary>Details</summary>

**The idea, step by step.**

1. *A loop is the simplest magnetic dipole.* A single current loop has no net "magnetic charge," but its field is concentrated on one face and returns on the other — just like the north and south poles of a bar magnet. The strength and orientation of this dipole are captured by the single vector $`\mathbf{m}=IA\hat{\mathbf{n}}`. More loops (a coil of $`N` turns) give $`\mathbf{m}=NIA\hat{\mathbf{n}}`.

2. *The far field falls as 1/r³.* Close to the loop the field is complicated, but far away only the dipole term survives and it decays as $`1/r^3` — faster than the $`1/r` of a wire or the $`1/r^2` of a point charge. On the axis the field is $`B = (\mu_0/4\pi)(2m/r^3)`, pointing along $`\mathbf{m}`.

3. *Dipoles are everywhere.* A bar magnet's field is a dipole field (Section 5); the Earth's magnetic field is, to first order, a dipole field from its core; and the magnetic moment of an electron is the quantum dipole that makes ferromagnetism possible. The dipole is the universal building block of magnetostatic fields.

<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Magnetic dipole field lines: closed loops from the north face to the south face, falling as 1 over r cubed">
  <rect x="0" y="0" width="440" height="260" fill="#ffffff"/>
  <g fill="none" stroke="#2980b9" stroke-width="1.8">
    <path d="M220,110 C150,110 120,60 175,45 C230,32 300,55 300,95"/>
    <path d="M220,150 C150,150 120,200 175,215 C230,228 300,205 300,165"/>
    <path d="M220,110 C120,110 70,80 70,130 C70,180 120,150 220,150"/>
    <path d="M220,110 C320,110 370,80 370,130 C370,180 320,150 220,150"/>
  </g>
  <g fill="#2980b9">
    <polygon points="300,95 290,88 292,102"/>
    <polygon points="300,165 290,158 292,172"/>
    <polygon points="70,130 82,124 82,136"/>
    <polygon points="370,130 358,124 358,136"/>
  </g>
  <rect x="205" y="105" width="30" height="50" rx="4" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>
  <text x="220" y="128" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#fff">N</text>
  <text x="220" y="146" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#fff">S</text>
  <text x="220" y="252" text-anchor="middle" font-family="system-ui" font-size="12" fill="#555">dipole field: closed loops, B &#8733; 1/r&#179; far away</text>
</svg>

4. *Authoritative source.* See Griffiths, *Introduction to Electrodynamics*, Ch. 5 (magnetic dipole field), and [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008).

<details><summary>Example problem</summary>

A circular loop of radius $`R = 0.05\,\text{m}` carries a current $`I = 3.0\,\text{A}`. Find its magnetic dipole moment and the field on its axis at $`r = 0.20\,\text{m}`.

<details><summary>Solution</summary>

The dipole moment is

```math
m = I A = I\,\pi R^2 = (3.0)\,\pi(0.05)^2 \approx 2.4\times10^{-2}\ \text{A·m}^2
```

On the axis, far from the loop ($`r \gg R`), the dipole field is

```math
B = \frac{\mu_0}{4\pi}\,\frac{2m}{r^3}
= (10^{-7})\,\frac{2(2.4\times10^{-2})}{(0.20)^3}
= (10^{-7})\,\frac{4.8\times10^{-2}}{8.0\times10^{-3}}
\approx 6.0\times10^{-7}\ \text{T}
```

The field points along the dipole moment (out of the "north" face of the loop).
</details>

</details>

</details>

## Interactive: field of a current loop and solenoid

Trace the magnetic field of a single current loop or a solenoid (a stack of loops) using the Biot–Savart law. Use the sliders to change the current and the number of turns, and watch the field become uniform inside the solenoid and fringe out at the ends.

<iframe src="./Magnetostatics.simulation.html" title="Magnetic field of a current loop and solenoid with adjustable current and turns"></iframe>

## Related topics

- [Electrostatics](./Electrostatics.md): the electric static limit; the mirror image of this page (scalar potential $`\leftrightarrow` vector potential, Gauss's law $`\leftrightarrow` Ampère's law).
- [Electrodynamics](./Electrodynamics.md): the time-varying regime of which magnetostatics is the static limit; Faraday's law and the displacement current that break the steady-current assumption.
- [Electromagnetic Media](./ElectromagneticMedia.md): how permeability and the constitutive relation $`\mathbf{B}=\mu\mathbf{H}` modify the vacuum results of Section 5.
- [Electromagnetic Radiation](./ElectromagneticRadiation.md): the far-field, propagating limit of the same Maxwell equations.

Part of [Electromagnetism](./Readme.md).

## Quizz

<details><summary>Test yourself</summary>

**Problem.** A long solenoid of radius $`R = 0.04\,\text{m}` has $`n = 2000` turns per metre and carries a current $`I = 1.5\,\text{A}`.

1. What is the magnetic field at the centre of the solenoid?
2. What is the magnetic flux through a circular cross-section of the solenoid (radius $`R`)?
3. If the current is doubled, by what factor does the field energy stored per unit length change? (The magnetic energy density is $`u = B^2/(2\mu_0)`.)

<details><summary>Solution</summary>

1. Inside a long solenoid the field is uniform and axial (Section 2):

```math
B = \mu_0 n I = (4\pi\times10^{-7})(2000)(1.5)
\approx 3.8\times10^{-3}\ \text{T}
```

2. The flux through a cross-section of radius $`R` is $`\Phi = B\,A = B\,\pi R^2`:

```math
\Phi = (3.8\times10^{-3})\,\pi(0.04)^2
\approx (3.8\times10^{-3})(5.0\times10^{-3})
\approx 1.9\times10^{-5}\ \text{Wb}
```

3. The energy density is $`u = B^2/(2\mu_0)`, and $`B \propto I`. Doubling the current doubles $`B`, so the energy density — and hence the stored energy per unit length — increases by a factor of $`2^2 = 4`.
</details>

</details>
