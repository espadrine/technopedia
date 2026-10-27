# Wave Propagation

Wave propagation describes how a disturbance travels through a medium or field, carrying energy without net transport of matter. It is the spatial extension of oscillation: where a single oscillator repeats in time, a wave repeats in both space and time. It is relevant to acoustics, optics, seismology, water engineering, musical instruments, and signal transmission.

> **Authoritative sources**
> - [OpenStax University Physics Volume 1, §16.1: Traveling Waves](https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves)
> - [OpenStax University Physics Volume 1, §16.2: Mathematics of Waves](https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves)

## The wave equation

For a 1-D string (or any linear, lossless medium):

```math
\frac{\partial^2 y}{\partial t^2} = c^2 \frac{\partial^2 y}{\partial x^2}
```

General solution (d'Alembert): $`y(x,t) = f(x - ct) + g(x + ct)`.

<details><summary>Details</summary>

The two terms represent waves traveling in the $`+x` and $`-x` directions at speed $`c`. For a string under tension $`T` with linear density $`\mu`: $`c = \sqrt{T/\mu}`. For sound in a fluid: $`c = \sqrt{K/\rho}` where $`K` is the bulk modulus and $`\rho` is the volume mass density. For electromagnetic waves in vacuum: $`c = 1/\sqrt{\mu_0 \varepsilon_0}`.

In 3-D: $`\nabla^2 y = (1/c^2)\,\partial^2 y/\partial t^2`. Spherical waves decay as $`1/r`; plane waves do not.

</details>

## Derivation from first principles

The wave equation is not an axiom; it follows directly from Newton's second law applied to a small element of a stretched string.

<details><summary>Details</summary>

Consider a string of linear density $`\mu` under tension $`T`. Take a small segment of length $`dx` at position $`x`. The vertical forces on the segment come from the tension at each end. For small slopes $`\partial y/\partial x \ll 1`, the net vertical force is:

```math
F_y \approx T\left(\frac{\partial y}{\partial x}\bigg|_{x+dx} - \frac{\partial y}{\partial x}\bigg|_{x}\right) = T\,\frac{\partial^2 y}{\partial x^2}\,dx
```

Newton's second law for the segment (mass $`\mu\,dx`):

```math
\mu\,dx\;\frac{\partial^2 y}{\partial t^2} = T\,\frac{\partial^2 y}{\partial x^2}\,dx
```

Dividing by $`\mu\,dx`:

```math
\frac{\partial^2 y}{\partial t^2} = \frac{T}{\mu}\;\frac{\partial^2 y}{\partial x^2} = c^2\,\frac{\partial^2 y}{\partial x^2}
```

The same structure appears in every linear, lossless medium: inertia (mass per unit volume or length) on the left, a restoring mechanism (tension, bulk modulus, elastic modulus) on the right. The wave speed is always the square root of (stiffness / inertia).

</details>

## Sinusoidal waves and dispersion

A monochromatic plane wave:

```math
y(x,t) = A\cos(kx - \omega t + \phi)
```

where $`k = 2\pi/\lambda` (wavenumber), $`\omega = 2\pi f` (angular frequency), and $`c = \omega/k`.

<details><summary>Details</summary>

**Dispersion:** In a dispersive medium, $`c` depends on frequency: $`\omega = \omega(k)`. The phase velocity is $`v_p = \omega/k`; the group velocity is $`v_g = d\omega/dk`. When $`v_g \neq v_p`, wave packets spread over time.

Examples:
- Deep-water gravity waves: $`\omega^2 = gk` (strongly dispersive).
- Sound in air: $`\omega = ck` (nearly non-dispersive).
- Light in glass: $`n(\omega)` varies (chromatic dispersion).

</details>

## The wave equation is universal

The same PDE $`\partial^2 y/\partial t^2 = c^2\,\nabla^2 y` appears in many physical contexts. The field variable $`y` and the wave speed $`c` change, but the mathematical structure is identical.

<table>
<tr><th>Domain</th><th>Field variable <i>y</i></th><th>Wave speed <i>c</i></th><th>Typical regime</th></tr>
<tr><td>String vibration</td><td>Transverse displacement</td><td>√(T/μ)</td><td>1-D, non-dispersive</td></tr>
<tr><td>Acoustics (sound)</td><td>Pressure deviation</td><td>√(K/ρ)</td><td>3-D, nearly non-dispersive</td></tr>
<tr><td>Electromagnetism</td><td>Electric / magnetic field</td><td>1/√(μ₀ε₀)</td><td>3-D, non-dispersive in vacuum</td></tr>
<tr><td>Deep-water gravity waves</td><td>Surface elevation</td><td>√(g/k)</td><td>2-D, strongly dispersive</td></tr>
<tr><td>Quantum mechanics (free particle)</td><td>Wave function ψ</td><td>ℏ/(2m) (group velocity)</td><td>3-D, dispersive (Schrödinger eq.)</td></tr>
</table>

Recognizing this common structure lets you transfer intuition: a node in a string is the same mathematical object as a pressure node in a pipe or a field node in a cavity.

## Superposition and interference

For linear media, the principle of superposition holds:

```math
y_{\text{total}} = y_1 + y_2
```

<details><summary>Details</summary>

Two waves of the same frequency and amplitude traveling in opposite directions form a **standing wave**:

```math
y = 2A\cos(kx)\cos(\omega t)
```

Nodes (zero displacement for all $`t`) occur where $`\cos(kx) = 0`, i.e. $`x = (n+\tfrac{1}{2})\pi/k` for $`n = 0, 1, 2, \ldots`. Antinodes (maximum displacement) occur where $`|\cos(kx)| = 1`, i.e. $`x = n\pi/k`.

Two waves with slightly different frequencies produce **beats** at frequency $`|f_1 - f_2|`.

Interference is the basis of diffraction gratings, noise-cancelling headphones, and the double-slit experiment.

</details>

## Boundary conditions: reflection and transmission

When a wave encounters a change in medium (a junction, a fixed end, a free end), part of it is reflected and part is transmitted. The behavior is governed by the **wave impedance** of each medium.

<details><summary>Details</summary>

For a string, the wave impedance is $`Z = \sqrt{T\mu}` (units: N·s/m). At an interface between two strings with impedances $`Z_1` and $`Z_2`:

```math
r = \frac{Z_1 - Z_2}{Z_1 + Z_2}, \qquad t = \frac{2\,Z_1}{Z_1 + Z_2}
```

where $`r` is the reflection coefficient (amplitude ratio of reflected to incident wave) and $`t` is the transmission coefficient (amplitude ratio of transmitted to incident wave).

Special cases:
- **Fixed end** ($`Z_2 \to \infty`): $`r = -1`, $`t = 0`. The wave reflects with a phase inversion (sign flip).
- **Free end** ($`Z_2 \to 0`): $`r = +1`, $`t = 0`. The wave reflects without phase inversion.
- **Matched impedances** ($`Z_1 = Z_2`): $`r = 0`, $`t = 1`. No reflection; all energy is transmitted.

The same formalism applies to:
- **Acoustics:** $`Z = \rho c` (acoustic impedance). Impedance matching prevents echo and maximizes sound transmission.
- **Optics:** Fresnel equations give reflection/transmission of light at a dielectric interface; the impedance analog is $`Z = \sqrt{\mu/\varepsilon}`.
- **Electrical transmission lines:** $`Z_0 = \sqrt{L/C}` (characteristic impedance). Mismatches cause signal reflections.

Energy conservation requires $`r^2 + t^2\,Z_1/Z_2 = 1` (the transmitted power is scaled by the impedance ratio).

</details>

## Energy transport

The average power carried by a sinusoidal wave on a string (linear density $`\mu`):

```math
P = \tfrac{1}{2}\,\mu\,c\,\omega^2 A^2
```

For a 3-D medium (e.g. sound in air, volume density $`\rho`), the intensity (power per unit area) is:

```math
I = \tfrac{1}{2}\,\rho\,c\,\omega^2 A^2
```

<details><summary>Details</summary>

Energy is carried by the wave but the medium's particles only oscillate locally. The energy density is split equally between kinetic and potential parts, oscillating in phase with the motion.

For sound: $`I = p_0^2 / (2\rho c)` where $`p_0` is the pressure amplitude. Here $`\rho` is the volume mass density of the medium (e.g. 1.2 kg/m³ for air), distinct from the linear density $`\mu` used for a 1-D string.

The distinction: $`\mu` [kg/m] is mass per unit length (1-D string); $`\rho` [kg/m³] is mass per unit volume (3-D fluid or solid). Both play the role of "inertia" in the wave speed formula.

</details>

## Interactive simulation

<iframe src="./Wave-Propagation.simulation.html" title="Traveling and standing waves on a string"></iframe>

## Example problem

A string of length $`L = 1\;\text{m}`, linear density $`\mu = 0.01\;\text{kg/m}`, is under tension $`T = 100\;\text{N}`. Find the fundamental frequency of the standing wave.

<details><summary>Solution</summary>

Wave speed: $`c = \sqrt{T/\mu} = \sqrt{100/0.01} = 100\;\text{m/s}`.

For a string fixed at both ends, the fundamental has wavelength $`\lambda_1 = 2L = 2\;\text{m}`.

Fundamental frequency: $`f_1 = c/\lambda_1 = 100/2 = 50\;\text{Hz}`.

</details>

</details>