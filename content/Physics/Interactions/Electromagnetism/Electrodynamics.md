# Electrodynamics

Electrodynamics is the regime of electromagnetism in which fields vary in time. Two coupled laws drive it: **Faraday's law** makes a changing magnetic flux produce a circulating electric field, and the **Maxwell–Ampère term** (displacement current) makes a changing electric field produce a magnetic field. Together they let energy and information move through space, and they reduce to [Electrostatics](./Electrostatics.md) and [Magnetostatics](./Magnetostatics.md) when the time derivatives vanish.

Electrodynamics is the engine behind transformers, generators, inductors, capacitors, induction heating, and the near field of every antenna. It is the bridge between the static laws you already know and the propagating waves of [Electromagnetic Radiation](./ElectromagneticRadiation.md).

> **Authoritative sources**
> - [Maxwell, *A Dynamical Theory of the Electromagnetic Field* (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)
> - [Heaviside, *Electromagnetic Induction and its Propagation* (1885–1887)](https://en.wikipedia.org/wiki/Heaviside%E2%80%93Maxwell_equations)
> - Griffiths, *Introduction to Electrodynamics* (standard textbook)
> - Jackson, *Classical Electrodynamics* (graduate reference)

## Scope: near field, far field, and the quasi-static limit

Electrodynamics covers **time-varying fields that have not yet detached from their source**. Two boundaries keep its scope distinct from the other classes:

- **Quasi-static (lumped) limit.** When every dimension $`L` of a circuit is much smaller than the wavelength $`\lambda = c/f` of the fields it produces, the phase of the field is essentially the same everywhere on the circuit. Then the fields can be "lumped" into ideal $`R`, $`L`, $`C` elements and Kirchhoff's laws apply. This is the criterion $`L \ll \lambda` that makes circuit theory valid (Section 5).
- **Near field vs. far field.** Around an antenna of size $`a`, the **near field** (reactive, energy sloshes back and forth) extends to roughly $`r \lesssim \lambda/(2\pi)`; beyond it lies the **far field** (radiative, energy flows away irreversibly at $`c`). The far field is the subject of [Electromagnetic Radiation](./ElectromagneticRadiation.md). Electrodynamics owns the near field and everything quasi-static; radiation owns the far field.

When the time derivatives are set to zero, Faraday's law gives $`\nabla\times\mathbf{E}=0` and Ampère's law gives $`\nabla\times\mathbf{B}=\mu_0\mathbf{J}`: the static limits of [Electrostatics](./Electrostatics.md) and [Magnetostatics](./Magnetostatics.md).

## 1. Faraday's law of induction

**Definition.** A changing magnetic flux through a loop drives an electromotive force (EMF) around it:

```math
\mathcal{E} = \oint \mathbf{E}\cdot d\boldsymbol{\ell} = -\frac{d\Phi_B}{dt},\qquad
\Phi_B = \int_S \mathbf{B}\cdot d\mathbf{A}
```

Differential form: $`\nabla\times\mathbf{E} = -\partial\mathbf{B}/\partial t`. The minus sign is **Lenz's law**: the induced current flows so as to oppose the change in flux that created it.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Flux is the "amount of field" through a surface.* The magnetic flux $`\Phi_B = \int \mathbf{B}\cdot d\mathbf{A}` counts how much $`\mathbf{B}` threads a surface. If the field strength, the area, or the tilt changes, the flux changes.

2. *A changing flux creates a circulating electric field.* Faraday's law says the line integral of $`\mathbf{E}` around any closed loop equals the negative rate of change of flux through that loop. Unlike the electrostatic field (which is conservative, $`\nabla\times\mathbf{E}=0`), this induced $`\mathbf{E}` is **non-conservative**: it forms closed loops with no source charge. This is the key new object in electrodynamics.

3. *Lenz's law fixes the direction.* The induced current's own magnetic field opposes the *change* in flux. If flux into the page is increasing, the induced current circulates to make flux out of the page. This is energy conservation in disguise: you must do work pushing the magnet in, and that work becomes the electrical energy delivered.

<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Changing magnetic flux inducing a circulating electric field">
  <rect x="0" y="0" width="420" height="250" fill="#ffffff"/>
  <!-- loop (face on) -->
  <circle cx="210" cy="125" r="85" fill="none" stroke="#2c3e50" stroke-width="4"/>
  <!-- B out of page: dots -->
  <g fill="#2980b9">
    <circle cx="180" cy="100" r="4"/><circle cx="240" cy="100" r="4"/>
    <circle cx="180" cy="150" r="4"/><circle cx="240" cy="150" r="4"/>
    <circle cx="210" cy="125" r="4"/>
  </g>
  <text x="210" y="70" text-anchor="middle" font-family="system-ui" font-size="14" fill="#2980b9">B (out of page, increasing)</text>
  <!-- induced E circulating arrow -->
  <path d="M 210 40 A 85 85 0 0 1 295 125" fill="none" stroke="#e74c3c" stroke-width="3"/>
  <polygon points="295,125 288,113 302,116" fill="#e74c3c"/>
  <text x="330" y="120" font-family="system-ui" font-size="14" fill="#e74c3c">induced E</text>
  <text x="210" y="235" text-anchor="middle" font-family="system-ui" font-size="13" fill="#555">dΦ/dt &lt; 0 ⇒ E circulates to oppose the change (Lenz)</text>
</svg>

4. *Worked example: a magnet entering a coil.* Push a bar magnet into a coil of $`N` turns. The flux through the coil rises, so an EMF $`\mathcal{E} = -N\,d\Phi_B/dt` appears and a current flows while the magnet moves. Pull it out and the current reverses. Hold it still and the current stops — only the *change* matters.

<iframe src="./Electrodynamics.simulation.html" title="Faraday induction: moving magnet through a coil producing induced EMF"></iframe>

5. *Authoritative source.* Faraday's law is the second of the four Maxwell equations in its modern form; see [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008).

<details><summary>Example problem</summary>

A circular loop of radius $`r = 5\,\text{cm}` is in a uniform magnetic field perpendicular to its plane. The field increases linearly from $`0` to $`0.4\,\text{T}` in $`0.2\,\text{s}`. Find the induced EMF.

<details><summary>Solution</summary>

The flux is $`\Phi_B = B\,\pi r^2` (field perpendicular, so the full area counts). The rate of change is constant:

```math
\frac{d\Phi_B}{dt} = \pi r^2 \frac{dB}{dt} = \pi (0.05)^2 \frac{0.4}{0.2}
= \pi (0.0025)(2) \approx 0.0157\ \text{T·m}^2/\text{s}
```

So $`|\mathcal{E}| = 0.0157\ \text{V} \approx 15.7\ \text{mV}`. By Lenz's law the induced current circulates to oppose the increasing field.
</details>

</details>

</details>

## 2. Maxwell–Ampère law and the displacement current

**Definition.** Ampère's law, completed by Maxwell, reads

```math
\nabla\times\mathbf{B} = \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
```

The extra term $`\mu_0\varepsilon_0\,\partial\mathbf{E}/\partial t` is the **displacement current density**. It is required so that the equation is consistent with charge conservation, and it is what lets a changing electric field generate a magnetic field.

<details><summary>Details</summary>

**The idea, step by step.**

1. *The original Ampère law has a hole.* The steady-current form $`\nabla\times\mathbf{B}=\mu_0\mathbf{J}` works for steady currents, where $`\nabla\cdot\mathbf{J}=0`. Take the divergence of both sides: $`\nabla\cdot(\nabla\times\mathbf{B})=0` (always), so the law *requires* $`\nabla\cdot\mathbf{J}=0`. But that fails for time-varying currents — charge piles up where current changes, so $`\nabla\cdot\mathbf{J} = -\partial\rho/\partial t \neq 0`.

2. *Charge conservation forces the fix.* The continuity equation $`\nabla\cdot\mathbf{J} = -\partial\rho/\partial t` is charge conservation. Combine it with Gauss's law $`\nabla\cdot\mathbf{E}=\rho/\varepsilon_0` to get $`\nabla\cdot\mathbf{J} + \varepsilon_0\,\partial(\nabla\cdot\mathbf{E})/\partial t = 0`. Adding $`\varepsilon_0\,\partial\mathbf{E}/\partial t` to the current makes the divergence of the right-hand side vanish, restoring consistency. That added term is the displacement current.

3. *Concrete picture: a charging capacitor.* Conduction current $`I` flows in the wire and stops at the plate — no charge crosses the gap. Yet the current must be continuous around the loop. The growing electric field between the plates carries a displacement current $`I_d = \varepsilon_0\,d\Phi_E/dt = I` that exactly matches the conduction current, so $`\mathbf{B}` is continuous whether you thread the loop through the wire or through the gap.

<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Displacement current in a charging capacitor">
  <rect x="0" y="0" width="440" height="240" fill="#ffffff"/>
  <!-- wires -->
  <line x1="40" y1="120" x2="180" y2="120" stroke="#2c3e50" stroke-width="3"/>
  <line x1="260" y1="120" x2="400" y2="120" stroke="#2c3e50" stroke-width="3"/>
  <!-- plates -->
  <line x1="180" y1="80" x2="180" y2="160" stroke="#2c3e50" stroke-width="5"/>
  <line x1="260" y1="80" x2="260" y2="160" stroke="#2c3e50" stroke-width="5"/>
  <!-- conduction current arrow -->
  <line x1="60" y1="120" x2="150" y2="120" stroke="#27ae60" stroke-width="3"/>
  <polygon points="150,120 138,114 138,126" fill="#27ae60"/>
  <text x="95" y="108" font-family="system-ui" font-size="13" fill="#27ae60">I (conduction)</text>
  <!-- displacement current arrows in gap -->
  <g stroke="#e67e22" stroke-width="2.5" stroke-dasharray="5 4">
    <line x1="205" y1="150" x2="205" y2="95"/>
    <line x1="220" y1="150" x2="220" y2="95"/>
    <line x1="235" y1="150" x2="235" y2="95"/>
  </g>
  <polygon points="220,95 214,107 226,107" fill="#e67e22"/>
  <text x="220" y="185" text-anchor="middle" font-family="system-ui" font-size="13" fill="#e67e22">I_d (displacement)</text>
  <text x="220" y="60" text-anchor="middle" font-family="system-ui" font-size="13" fill="#555">E field between plates</text>
</svg>

4. *Why it matters beyond bookkeeping.* The displacement term is not a bookkeeping trick: it is the term that, together with Faraday's law, makes electromagnetic waves possible (Section 3). Without it, a changing field could not sustain itself in empty space.

5. *Authoritative source.* Maxwell introduced the displacement current in [A Dynamical Theory of the Electromagnetic Field (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008).

<details><summary>Example problem</summary>

A parallel-plate capacitor of plate area $`A = 0.02\,\text{m}^2` is charging with a conduction current $`I = 4\,\text{A}`. Find the displacement current and the rate of change of the electric field between the plates.

<details><summary>Solution</summary>

Continuity requires the displacement current to equal the conduction current: $`I_d = I = 4\,\text{A}`. Since $`I_d = \varepsilon_0\,A\,dE/dt`,

```math
\frac{dE}{dt} = \frac{I_d}{\varepsilon_0 A}
= \frac{4}{(8.85\times10^{-12})(0.02)} \approx 2.26\times10^{13}\ \text{V/(m·s)}
```

The huge rate reflects how little permittivity vacuum has: a modest current builds a very rapidly changing field.
</details>

</details>

</details>

## 3. The coupled Maxwell equations and wave generation

**Definition.** In vacuum the four Maxwell equations are

```math
\nabla\cdot\mathbf{E}=\frac{\rho}{\varepsilon_0},\quad
\nabla\cdot\mathbf{B}=0,\quad
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t},\quad
\nabla\times\mathbf{B}=\mu_0\mathbf{J}+\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
```

In a source-free region ($`\rho=0,\ \mathbf{J}=0`), taking the curl of Faraday's law and substituting the Ampère law yields the wave equation for each field:

```math
\nabla^2\mathbf{E} = \mu_0\varepsilon_0\,\frac{\partial^2\mathbf{E}}{\partial t^2},\qquad
\nabla^2\mathbf{B} = \mu_0\varepsilon_0\,\frac{\partial^2\mathbf{B}}{\partial t^2}
```

with wave speed $`c = 1/\sqrt{\mu_0\varepsilon_0} \approx 3.0\times10^8\ \text{m/s}`.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Each law feeds the other.* Faraday's law: a changing $`\mathbf{B}` makes a curling $`\mathbf{E}`. The Maxwell–Ampère law: a changing $`\mathbf{E}` makes a curling $`\mathbf{B}`. Neither field needs a charge or current to keep going once it is moving — each regenerates the other.

2. *Chase the algebra.* Take the curl of Faraday's law: $`\nabla\times(\nabla\times\mathbf{E}) = -\partial(\nabla\times\mathbf{B})/\partial t`. Use the vector identity $`\nabla\times(\nabla\times\mathbf{E}) = \nabla(\nabla\cdot\mathbf{E}) - \nabla^2\mathbf{E}`; in a source-free region $`\nabla\cdot\mathbf{E}=0`, so the left side is $`-\nabla^2\mathbf{E}`. Substitute the Ampère law for $`\nabla\times\mathbf{B}` and the wave equation falls out.

3. *The speed is a surprise.* The wave speed $`c = 1/\sqrt{\mu_0\varepsilon_0}` depends only on the vacuum permittivity and permeability — the same constants that govern static electricity and magnetism. Maxwell recognized this equals the measured speed of light, unifying optics with electromagnetism.

4. *Transverse, in phase, perpendicular.* A plane wave traveling in direction $`\hat{\mathbf{k}}` has $`\mathbf{E}` and $`\mathbf{B}` perpendicular to each other and to the direction of travel, in phase, with $`B = E/c`. The field energy flows in the direction $`\mathbf{E}\times\mathbf{B}` (Section 6).

5. *Authoritative source.* The wave prediction is the climax of [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008); the propagating-wave treatment continues in [Electromagnetic Radiation](./ElectromagneticRadiation.md).

<details><summary>Example problem</summary>

A plane wave in vacuum has peak electric field $`E_0 = 120\ \text{V/m}`. Find the peak magnetic field and the average intensity (power per unit area).

<details><summary>Solution</summary>

The peak magnetic field is $`B_0 = E_0/c = 120/(3.0\times10^8) = 4.0\times10^{-7}\ \text{T}`. The average intensity is the time-average of the Poynting vector:

```math
\langle S\rangle = \frac{1}{2}\frac{E_0^2}{\mu_0 c} = \frac{E_0^2}{2\,Z_0}
= \frac{120^2}{2\times 377} \approx 19.1\ \text{W/m}^2
```

where $`Z_0 = \mu_0 c \approx 377\ \Omega` is the impedance of free space.
</details>

</details>

</details>

## 4. Applications of induction

**Definition.** Faraday's law, applied to engineered geometries, gives the workhorses of electrical technology: **transformers** (change voltage via coupled coils), **generators** (convert mechanical rotation into EMF), **eddy currents** (induced circulating currents in bulk conductors), and **induction heating** (eddy currents and hysteresis that heat a conductor).

<details><summary>Details</summary>

**The idea, step by step.**

1. *Transformer: coupling two coils through shared flux.* A primary coil driven by AC creates a time-varying flux in a common core; that flux links the secondary coil and induces an EMF there. The turns ratio sets the voltage ratio: $`V_2/V_1 = N_2/N_1`. Power is (ideally) conserved, so current scales inversely: $`I_2/I_1 = N_1/N_2`.

<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Transformer with primary and secondary coils on a common core">
  <rect x="0" y="0" width="440" height="240" fill="#ffffff"/>
  <!-- core -->
  <rect x="120" y="60" width="200" height="120" fill="none" stroke="#7f8c8d" stroke-width="10"/>
  <!-- primary coil (left) -->
  <g fill="none" stroke="#2980b9" stroke-width="3">
    <circle cx="120" cy="90" r="10"/><circle cx="120" cy="115" r="10"/>
    <circle cx="120" cy="140" r="10"/><circle cx="120" cy="165" r="10"/>
  </g>
  <line x1="120" y1="80" x2="120" y2="40" stroke="#2980b9" stroke-width="3"/>
  <line x1="120" y1="175" x2="120" y2="210" stroke="#2980b9" stroke-width="3"/>
  <circle cx="120" cy="222" r="10" fill="none" stroke="#2980b9" stroke-width="2"/>
  <text x="120" y="226" text-anchor="middle" font-family="system-ui" font-size="10" fill="#2980b9">~</text>
  <text x="95" y="130" text-anchor="middle" font-family="system-ui" font-size="12" fill="#2980b9">N₁</text>
  <!-- secondary coil (right) -->
  <g fill="none" stroke="#c0392b" stroke-width="3">
    <circle cx="320" cy="90" r="10"/><circle cx="320" cy="115" r="10"/>
    <circle cx="320" cy="140" r="10"/><circle cx="320" cy="165" r="10"/>
  </g>
  <line x1="320" y1="80" x2="320" y2="40" stroke="#c0392b" stroke-width="3"/>
  <line x1="320" y1="175" x2="320" y2="210" stroke="#c0392b" stroke-width="3"/>
  <rect x="312" y="205" width="16" height="24" fill="none" stroke="#c0392b" stroke-width="2"/>
  <text x="345" y="130" text-anchor="middle" font-family="system-ui" font-size="12" fill="#c0392b">N₂</text>
  <text x="220" y="125" text-anchor="middle" font-family="system-ui" font-size="12" fill="#7f8c8d">shared flux Φ</text>
</svg>

2. *Generator: Faraday in reverse of a motor.* Rotate a coil in a magnetic field and the flux through it varies sinusoidally, $`\Phi_B = \Phi_0\cos(\omega t)`, giving $`\mathcal{E} = \Phi_0\omega\sin(\omega t)` — an AC voltage. This is how most of the world's electricity is made.

3. *Eddy currents: induction in bulk metal.* A changing field induces circulating currents throughout a conductor, not just in a wire. These currents create their own opposing field (Lenz's law), producing magnetic braking, damping, and losses.

4. *Induction heating: eddy currents as a heater.* A high-frequency field drives strong eddy currents in a metal workpiece; the resistance of the metal converts that current to heat. Because the field is applied without contact, it heats the metal directly and rapidly — used in induction cooktops, melting, and hardening.

5. *Authoritative source.* The transformer and generator relations follow directly from Faraday's law in [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008).

<details><summary>Example problem</summary>

A step-down transformer has $`N_1 = 1000` primary turns and $`N_2 = 250` secondary turns. The primary is connected to a $`240\,\text{V}` (rms) supply and the secondary feeds a $`12\,\Omega` load. Find the secondary voltage and the primary current (ideal transformer).

<details><summary>Solution</summary>

The turns ratio is $`N_2/N_1 = 0.25`, so $`V_2 = 0.25 \times 240 = 60\,\text{V}`. The secondary current is $`I_2 = V_2/R = 60/12 = 5\,\text{A}`. Ideal power conservation gives $`V_1 I_1 = V_2 I_2`, so

```math
I_1 = \frac{V_2 I_2}{V_1} = \frac{60 \times 5}{240} = 1.25\ \text{A}
```

Equivalently $`I_1 = I_2\,N_2/N_1 = 5 \times 0.25 = 1.25\,\text{A}`.
</details>

</details>

</details>

## 5. Quasi-static limit and lumped circuit theory

**Definition.** When a circuit's size $`L` is much smaller than the wavelength $`\lambda = c/f` of its signals, the fields are quasi-static and the circuit reduces to ideal lumped elements: a **resistor** $`R` (dissipates), an **inductor** $`L` (stores magnetic energy, $`V = L\,dI/dt`), and a **capacitor** $`C` (stores electric energy, $`I = C\,dV/dt`), obeying Kirchhoff's laws. A series **RLC** circuit is a damped harmonic oscillator with natural frequency $`\omega_0 = 1/\sqrt{LC}`.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Why lumping is an approximation.* The full field solution has a phase that varies across the circuit by $`\sim 2\pi L/\lambda`. When $`L \ll \lambda`, that phase variation is negligible, so the voltage and current are the same at every point of a given element — the premise of lumped circuit theory. This is the same $`L \ll \lambda` criterion from the Scope section, and it is why a $`50\,\text{MHz}` circuit ($`\lambda \approx 6\,\text{m}`) can be lumped on a $`10\,\text{cm}` board but a $`3\,\text{GHz}` circuit ($`\lambda \approx 10\,\text{cm}`) cannot.

2. *Inductor and capacitor are the two storage modes.* An inductor's voltage is proportional to the *rate of change* of current ($`V = L\,dI/dt`): it resists changes in current and stores energy $`U = \tfrac{1}{2}LI^2` in its magnetic field. A capacitor's current is proportional to the *rate of change* of voltage ($`I = C\,dV/dt`): it resists changes in voltage and stores energy $`U = \tfrac{1}{2}CV^2` in its electric field. These are the circuit shadows of Faraday's law and the displacement current.

3. *RLC as an oscillator.* In a series RLC circuit, energy sloshes between the inductor's magnetic field and the capacitor's electric field, exactly like a mass–spring (see [Harmonic oscillator](../../Mechanics/Oscillations/Harmonic-oscillator.md)). The undamped natural frequency is $`\omega_0 = 1/\sqrt{LC}`; the resistor damps the oscillation with time constant $`\tau = 2L/R`.

<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Series RLC circuit">
  <rect x="0" y="0" width="460" height="200" fill="#ffffff"/>
  <!-- loop -->
  <rect x="60" y="40" width="340" height="120" fill="none" stroke="#2c3e50" stroke-width="2.5"/>
  <!-- source (left) -->
  <circle cx="60" cy="100" r="18" fill="#ffffff" stroke="#2c3e50" stroke-width="2.5"/>
  <path d="M 50 100 q 5 -8 10 0 q 5 8 10 0" fill="none" stroke="#2c3e50" stroke-width="2"/>
  <text x="60" y="140" text-anchor="middle" font-family="system-ui" font-size="12" fill="#2c3e50">V(t)</text>
  <!-- resistor (top) -->
  <path d="M 150 40 l 8 -12 l 16 24 l 16 -24 l 16 24 l 16 -24 l 8 12" fill="none" stroke="#e67e22" stroke-width="2.5"/>
  <text x="190" y="28" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e67e22">R</text>
  <!-- inductor (right) -->
  <path d="M 400 130 a 8 8 0 0 1 16 0 a 8 8 0 0 1 16 0 a 8 8 0 0 1 16 0" fill="none" stroke="#2980b9" stroke-width="2.5" transform="rotate(90 400 100)"/>
  <text x="425" y="105" text-anchor="middle" font-family="system-ui" font-size="12" fill="#2980b9">L</text>
  <!-- capacitor (bottom) -->
  <line x1="200" y1="160" x2="200" y2="150" stroke="#8e44ad" stroke-width="2.5"/>
  <line x1="200" y1="150" x2="230" y2="150" stroke="#8e44ad" stroke-width="3"/>
  <line x1="230" y1="150" x2="230" y2="160" stroke="#8e44ad" stroke-width="2.5"/>
  <line x1="240" y1="150" x2="270" y2="150" stroke="#8e44ad" stroke-width="3"/>
  <line x1="270" y1="150" x2="270" y2="160" stroke="#8e44ad" stroke-width="2.5"/>
  <text x="235" y="185" text-anchor="middle" font-family="system-ui" font-size="12" fill="#8e44ad">C</text>
</svg>

4. *Authoritative source.* The lumped-element model and its $`L \ll \lambda` validity are standard; see Griffiths, *Introduction to Electrodynamics*, and any circuits text.

<details><summary>Example problem</summary>

A series RLC circuit has $`L = 10\,\text{mH}` and $`C = 250\,\text{nF}`. Find the resonant frequency. If $`R = 20\,\Omega`, find the quality factor $`Q`.

<details><summary>Solution</summary>

The resonant frequency is

```math
f_0 = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\sqrt{(10\times10^{-3})(250\times10^{-9})}}
= \frac{1}{2\pi\sqrt{2.5\times10^{-9}}} \approx 3.18\ \text{kHz}
```

The quality factor is $`Q = \omega_0 L / R = (1/\sqrt{LC})\,L/R = \sqrt{L/C}/R`:

```math
Q = \frac{\sqrt{10\times10^{-3}/(250\times10^{-9})}}{20}
= \frac{\sqrt{40000}}{20} = \frac{200}{20} = 10
```

A $`Q = 10` means the oscillation decays over roughly $`Q/\pi \approx 3` cycles — a lightly damped resonance.
</details>

</details>

</details>

## 6. Poynting theorem and energy flow

**Definition.** Electromagnetic energy density and flux are

```math
u = \tfrac{1}{2}\left(\varepsilon_0 E^2 + \frac{B^2}{\mu_0}\right),\qquad
\mathbf{S} = \frac{1}{\mu_0}\,\mathbf{E}\times\mathbf{B}
```

**Poynting's theorem** is the local energy-conservation law:

```math
\frac{\partial u}{\partial t} + \nabla\cdot\mathbf{S} = -\mathbf{J}\cdot\mathbf{E}
```

The Poynting vector $`\mathbf{S}` points in the direction energy flows; $`\mathbf{J}\cdot\mathbf{E}` is the rate at which the field does work on charges.

<details><summary>Details</summary>

**The idea, step by step.**

1. *Energy lives in the field, not the wire.* The density $`u` has two equal-and-symmetric parts: electric ($`\tfrac{1}{2}\varepsilon_0 E^2`), stored in capacitors, and magnetic ($`B^2/(2\mu_0)`), stored in inductors. The field is the real carrier of energy.

2. *The Poynting vector is the energy current.* $`\mathbf{S} = \mathbf{E}\times\mathbf{B}/\mu_0` has units of W/m² and points where the energy is going. In a plane wave it points along the direction of propagation, with magnitude $`S = E^2/(\mu_0 c)`.

3. *The surprising direction: energy flows through space.* In a charging capacitor, the energy does **not** travel up the wire and into the plates. The Poynting vector points *inward from the surrounding space into the gap between the plates* — the field energy flows through the space around the wires and into the region where it is being stored. This is one of the most counterintuitive and important results in electrodynamics.

<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Poynting vector energy flow into a charging capacitor">
  <rect x="0" y="0" width="440" height="240" fill="#ffffff"/>
  <!-- wires -->
  <line x1="60" y1="120" x2="180" y2="120" stroke="#2c3e50" stroke-width="3"/>
  <line x1="260" y1="120" x2="380" y2="120" stroke="#2c3e50" stroke-width="3"/>
  <!-- plates -->
  <line x1="180" y1="80" x2="180" y2="160" stroke="#2c3e50" stroke-width="5"/>
  <line x1="260" y1="80" x2="260" y2="160" stroke="#2c3e50" stroke-width="5"/>
  <!-- E field between plates (vertical) -->
  <g stroke="#2980b9" stroke-width="2">
    <line x1="220" y1="150" x2="220" y2="95"/>
  </g>
  <polygon points="220,95 214,107 226,107" fill="#2980b9"/>
  <text x="220" y="70" text-anchor="middle" font-family="system-ui" font-size="12" fill="#2980b9">E</text>
  <!-- S vectors pointing inward into the gap -->
  <g stroke="#e74c3c" stroke-width="2.5">
    <line x1="150" y1="60" x2="195" y2="100"/>
    <line x1="290" y1="60" x2="245" y2="100"/>
    <line x1="150" y1="180" x2="195" y2="140"/>
    <line x1="290" y1="180" x2="245" y2="140"/>
  </g>
  <g fill="#e74c3c">
    <polygon points="195,100 184,96 190,108"/>
    <polygon points="245,100 256,96 250,108"/>
    <polygon points="195,140 184,144 190,132"/>
    <polygon points="245,140 256,144 250,132"/>
  </g>
  <text x="220" y="215" text-anchor="middle" font-family="system-ui" font-size="13" fill="#e74c3c">S = E×B/μ₀ flows into the gap</text>
</svg>

4. *Authoritative source.* Poynting's theorem follows from the Maxwell equations; see [Maxwell (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008) and Griffiths, *Introduction to Electrodynamics*.

<details><summary>Example problem</summary>

A long straight wire carries a steady current $`I` and has a uniform electric field $`E` along its surface (due to its resistance) and a circular magnetic field $`B = \mu_0 I/(2\pi r)` at radius $`r`. Show that the Poynting vector points radially *into* the wire, and find the power per unit length entering the wire at its surface $`r = a`.

<details><summary>Solution</summary>

At the surface, $`\mathbf{E}` is axial and $`\mathbf{B}` is azimuthal, so $`\mathbf{S} = \mathbf{E}\times\mathbf{B}/\mu_0` points radially inward — energy flows from the surrounding field into the wire, where it is dissipated as heat. Its magnitude at $`r=a` is

```math
S = \frac{E}{\mu_0}\cdot\frac{\mu_0 I}{2\pi a} = \frac{E I}{2\pi a}
```

The power per unit length is the flux through the cylindrical surface of radius $`a`:

```math
\frac{P}{\ell} = S \cdot (2\pi a) = E I
```

which is exactly the Joule heating per unit length, $`I^2 R/\ell = I E` (since $`E = R\ell^{-1} I`). Energy conservation closes perfectly.
</details>

</details>

</details>

## 7. Retarded potentials and causality

**Definition.** Fields at a point respond to sources at an **earlier** time, because changes propagate at $`c`. The scalar and vector potentials are **retarded potentials**:

```math
\phi(\mathbf{r},t) = \frac{1}{4\pi\varepsilon_0}\int \frac{\rho(\mathbf{r}',\, t - R/c)}{R}\,d^3r',\qquad
\mathbf{A}(\mathbf{r},t) = \frac{\mu_0}{4\pi}\int \frac{\mathbf{J}(\mathbf{r}',\, t - R/c)}{R}\,d^3r'
```

where $`R = |\mathbf{r}-\mathbf{r}'|` is the distance from the source point. The fields are then $`\mathbf{E} = -\nabla\phi - \partial\mathbf{A}/\partial t` and $`\mathbf{B} = \nabla\times\mathbf{A}`.

<details><summary>Details</summary>

**The idea, step by step.**

1. *No instantaneous action at a distance.* In the static limit the potentials look instantaneous, but the full solution uses the source at the **retarded time** $`t - R/c`: the field at $`\mathbf{r}` today depends on what the source did $`R/c` ago. This is causality built into Maxwell's equations — information and energy never travel faster than $`c`.

2. *The retarded time is the light-travel time.* A source $`R` meters away influences you only after $`R/c` seconds. For a source $`1\,\text{m}` away that delay is $`\sim 3\,\text{ns}`; for the Sun ($`1.5\times10^{11}\,\text{m}`) it is $`\sim 500\,\text{s}`. You see the Sun as it was eight minutes ago.

3. *Near field vs. far field from the same solution.* Expanding the retarded potentials for a small source: the terms that fall off as $`1/r^2` and $`1/r^3` are the **near (reactive) field** — they store energy locally and belong to electrodynamics. The term that falls off as $`1/r` is the **radiation (far) field** — it carries energy away and is the subject of [Electromagnetic Radiation](./ElectromagneticRadiation.md). The boundary between them is around $`r \sim \lambda/(2\pi)`.

4. *Authoritative source.* The retarded-potential solution of the wave equation is standard; see Jackson, *Classical Electrodynamics*, and Griffiths, *Introduction to Electrodynamics*.

<details><summary>Example problem</summary>

A radio transmitter $`300\,\text{km}` away switches on. How long after the switch does the signal reach a receiver, and what is the wavelength of a $`100\,\text{MHz}` signal?

<details><summary>Solution</summary>

The travel time is $`t = d/c = 300\times10^3 / (3.0\times10^8) = 1.0\times10^{-3}\,\text{s} = 1\,\text{ms}`. The wavelength is

```math
\lambda = \frac{c}{f} = \frac{3.0\times10^8}{100\times10^6} = 3\ \text{m}
```

Since the receiver is $`10^5` wavelengths away, it is deep in the far field, where the $`1/r` radiation term dominates.
</details>

</details>

</details>

## Related topics

- [Electrostatics](./Electrostatics.md) and [Magnetostatics](./Magnetostatics.md): the static limits when the time derivatives vanish.
- [Electromagnetic Radiation](./ElectromagneticRadiation.md): the far-field, propagating-wave limit of the same coupled equations.
- [Electromagnetic Media](./ElectromagneticMedia.md): constitutive relations $`\mathbf{D}=\varepsilon\mathbf{E}`, $`\mathbf{B}=\mu\mathbf{H}` that replace the vacuum constants in every regime above.
- [Harmonic oscillator](../../Mechanics/Oscillations/Harmonic-oscillator.md): the mechanical analog of the RLC circuit.

Part of [Electromagnetism](./Readme.md).

## Quizz

<details><summary>Test yourself</summary>

**Problem.** A single loop of wire (radius $`r = 10\,\text{cm}`) lies in a uniform magnetic field perpendicular to its plane. The field is switched on and rises linearly to $`B = 0.5\,\text{T}` over $`0.1\,\text{s}`.

1. What is the magnitude of the induced EMF?
2. If the loop has resistance $`R = 0.5\,\Omega`, what is the induced current, and which way does it flow (viewed from the side the field is increasing toward)?
3. Explain, using energy conservation, why the current flows that way.

<details><summary>Solution</summary>

1. The flux is $`\Phi_B = B\,\pi r^2`, so

```math
|\mathcal{E}| = \pi r^2 \frac{dB}{dt} = \pi (0.10)^2 \frac{0.5}{0.1}
= \pi (0.01)(5) \approx 0.157\ \text{V}
```

2. The current is $`I = \mathcal{E}/R = 0.157/0.5 \approx 0.31\,\text{A}`. By Lenz's law it flows so as to oppose the *increasing* field: viewed from the side the field points toward, it circulates **counter-clockwise**, producing a field back the other way.

3. The induced current's field opposes the change, so the growing external field and the induced field partially cancel inside the loop. Pushing the field up therefore requires external work; that work is exactly the electrical energy dissipated as $`I^2 R` heat in the loop. If the current flowed the other way it would *aid* the change, creating energy from nothing — violating conservation. This is Lenz's law as a statement of energy conservation.
</details>

</details>
