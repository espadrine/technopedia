# Oscillations and Waves

Oscillations are repeated variations of a quantity around an equilibrium; waves are the propagation of such a disturbance through space. They occur whenever inertia, a restoring force, and little dissipation combine, making systems exchange energy between motion and stored configuration. Oscillations and waves are relevant to clocks, vibration isolation, resonance, electrical filters, molecular vibration, sound, seismic activity, water waves, and string instruments. The fundamental building block is the [Harmonic oscillator](./Harmonic-oscillator.md), from which all other oscillation types derive.

<details><summary>Details</summary>

The baseline model is a mass $`m` displaced from equilibrium by $`x`. For small displacement, the restoring force is approximately linear: $`F = -kx`. Newton's law gives $`m\ddot{x} + kx = 0`, whose solution is $`x(t) = A\cos(\omega t + \phi)` with $`\omega = \sqrt{k/m}`.

**Physical interpretation.** The system exchanges energy between kinetic ($`\tfrac{1}{2}m\dot{x}^2`) and potential ($`\tfrac{1}{2}kx^2`) forms. The period $`T = 2\pi/\omega` is independent of amplitude—a hallmark of linearity.

**Units.** $`k` has units N/m (or equivalently kg/s²); $`\omega` is rad/s; $`A` has the same units as $`x`.

**When the linear approximation breaks down.** For a pendulum, the linear model $`\ddot{\theta} + (g/L)\theta = 0` is valid only for $`|\theta| \ll 1` rad. Beyond that, the $`\sin\theta` term introduces amplitude-dependent period (see [Nonlinear oscillations](./Nonlinear-oscillations.md)).

</details>

## Brief history

- Galileo recognized pendulum isochronism.
- Hooke associated a linear restoring force with displacement.
- Newton's laws made small oscillations quantitatively predictable.
- Fourier analysis connected oscillations to superposition and normal modes.

## Categorization

Each class isolates one physical mechanism that modifies or extends the ideal harmonic oscillator.

<table>
<tr><th>Page</th><th>Physical mechanism isolated</th><th>Typical behavior</th><th>Where it matters</th></tr>
<tr><td><a href='./Harmonic-oscillator.md'>Harmonic oscillator</a></td><td>Linear restoring force (baseline)</td><td>Constant period, sinusoidal motion</td><td>Clocks, reference models</td></tr>
<tr><td><a href='./Damped-oscillations.md'>Damped oscillations</a></td><td>Dissipation: energy loss to environment</td><td>Decaying amplitude, quality factor</td><td>Shock absorbers, pendulums, circuits</td></tr>
<tr><td><a href='./Driven-oscillations.md'>Driven oscillations</a></td><td>External energy input (force or parameter modulation)</td><td>Resonance, steady-state response, parametric growth</td><td>Filters, tuning, bridges, parametric amplifiers</td></tr>
<tr><td><a href='./Coupled-oscillations.md'>Coupled oscillations</a></td><td>Multiple interacting degrees of freedom</td><td>Normal modes, beat frequencies</td><td>Molecules, crystals, coupled circuits</td></tr>
<tr><td><a href='./Nonlinear-oscillations.md'>Nonlinear oscillations</a></td><td>Higher-order force terms beyond linear</td><td>Amplitude-dependent period, chaos</td><td>Metronomes, large pendulums, nonlinear circuits</td></tr>
<tr><td><a href='./Wave-Propagation.md'>Wave propagation</a></td><td>Continuous-media (spatial) limit of coupled oscillators</td><td>Wave equation, dispersion, interference</td><td>Sound, seismic waves, water waves, strings</td></tr>
</table>

> **Authoritative sources**
> - [OpenStax University Physics Volume 1, Chapter 15: Oscillations](https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion)

