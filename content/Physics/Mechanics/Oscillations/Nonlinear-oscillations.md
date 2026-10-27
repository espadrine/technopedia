# Nonlinear Oscillations

Nonlinear oscillations occur when the restoring force contains terms beyond the linear (Hooke's-law) term. The period then depends on amplitude, new phenomena such as subharmonics and chaos appear, and superposition no longer holds. Relevant to large-amplitude pendulums, Duffing circuits, metronomes, and many biological rhythms.

> **Authoritative sources**
> - [Landau & Lifshitz, *Mechanics*, §16: Nonlinear Oscillations](https://www.sciencedirect.com/book/monograph/9780750628969/mechanics)
> - [Strogatz, *Nonlinear Dynamics and Chaos*, Ch. 3: Oscillations](https://www.stevenstrogatz.com/books/nonlinear-dynamics-and-chaos-with-applications-to-physics-biology-chemistry-and-engineering)

## Duffing equation

The canonical nonlinear oscillator:

```math
\ddot{x} + \delta\dot{x} + \alpha x + \beta x^3 = \gamma\cos(\omega t)
```

<details><summary>Details</summary>

- $`\beta > 0`: **hardening** spring (stiffness increases with amplitude; period decreases with amplitude).
- $`\beta < 0`: **softening** spring (stiffness decreases; period increases with amplitude).
- $`\delta = 0, \gamma = 0`: undriven, undamped conservative case.
- $`\delta > 0, \gamma > 0`: damped and driven; can exhibit bifurcations and chaos.

The Duffing equation arises from expanding a nonlinear potential $`V(x) = \tfrac{1}{2}\alpha x^2 + \tfrac{1}{4}\beta x^4` to fourth order, so that $`-V'(x) = -\alpha x - \beta x^3`.

The damping term $`\delta\dot{x}` and the driving term $`\gamma\cos(\omega t)` are the nonlinear generalizations of the linear counterparts treated in [Damped oscillations](./Damped-oscillations.md) and [Driven oscillations](./Driven-oscillations.md).

</details>

## Amplitude-dependent period

For the undamped, undriven case ($`\delta = \gamma = 0`), the period of oscillation with amplitude $`A` is:

```math
T(A) = \frac{4}{\sqrt{\alpha + \beta A^2}}\;K\!\Bigl(\sqrt{\frac{\beta A^2}{2(\alpha + \beta A^2)}}\Bigr)
```

where $`K` is the complete elliptic integral of the first kind.

<details><summary>Details</summary>

For small nonlinearity ($`|\beta|A^2 \ll \alpha`), a perturbation expansion gives:

```math
T \approx T_0\left(1 - \frac{3\beta A^2}{8\alpha}\right) \quad (\beta > 0, \text{ hardening})
```

where $`T_0 = 2\pi/\sqrt{\alpha}` is the linear period.

**Pendulum example.** The exact period of a pendulum of length $`L` released at angle $`\theta_0` is:

```math
T = 4\sqrt{\frac{L}{g}}\;K\!\Bigl(\sin\frac{\theta_0}{2}\Bigr)
```

For small angles: $`T \approx T_0(1 + \theta_0^2/16 + 11\theta_0^4/3072 + \cdots)`. At $`\theta_0 = 90°`, the period is about 18% longer than the small-angle value.

</details>

## Phase portrait and limit cycles

In the phase plane, nonlinear systems can exhibit:

- **Closed orbits** (periodic motion) surrounding a center.
- **Limit cycles**: isolated closed orbits that attract (stable) or repel (unstable) nearby trajectories.
- **Separatrices**: boundaries between qualitatively different motions.

<details><summary>Details</summary>

A **stable limit cycle** means the system oscillates with a fixed amplitude regardless of initial conditions (within the basin of attraction). Examples: the van der Pol oscillator (modeling heartbeats, relaxation oscillations), the Hopf bifurcation in fluid dynamics.

The **Poincaré–Bendixson theorem** guarantees that in a 2-D system, any bounded trajectory that does not approach a fixed point must approach a limit cycle. This is why 2-D nonlinear oscillators are so tractable.

In contrast, the [Harmonic oscillator](./Harmonic-oscillator.md) has a family of closed orbits (one for each energy), not a single limit cycle.

</details>

## Van der Pol oscillator

The other canonical nonlinear oscillator is the **van der Pol** equation:

```math
\ddot{x} - \mu(1 - x^2)\dot{x} + x = 0
```

<details><summary>Details</summary>

The parameter $`\mu \geq 0` controls the strength of the nonlinear damping:

- $`\mu = 0`: reduces to the linear harmonic oscillator.
- $`0 < \mu \ll 1`: **weakly nonlinear** regime; the limit cycle is nearly sinusoidal and the period is close to $`2\pi`.
- $`\mu \gg 1`: **relaxation oscillation** regime; the trajectory spends most of its time near $`x = \pm 2` with rapid transitions, producing a sawtooth-like waveform. The period scales as $`T \approx \mu(3 - 2\ln 2)`.

The van der Pol oscillator is a **self-excited** system: energy is injected when $`|x| < 1` (negative damping) and dissipated when $`|x| > 1` (positive damping), producing a stable limit cycle.

**Biological relevance.** The van der Pol equation and its generalizations model:
- Cardiac pacemaker cells (sinoatrial node firing).
- Neural spike generation (integrate-and-fire models).
- Circadian rhythm oscillators.

The connection to the Duffing equation: both are second-order nonlinear ODEs, but the Duffing nonlinearity is in the *restoring force* (position-dependent stiffness) while the van der Pol nonlinearity is in the *damping* (velocity-dependent friction). The Duffing oscillator is conservative (or externally driven); the van der Pol oscillator is self-sustained.

</details>

## Bifurcations and chaos

As a control parameter (e.g., driving amplitude $`\gamma`) is varied, the steady-state response can undergo:

1. **Period-doubling cascade**: $`T \to 2T \to 4T \to \cdots \to` chaos.
2. **Subharmonics**: the response locks to a fraction of the driving frequency ($`\omega/2`, $`\omega/3`, …), visible as additional peaks in the Duffing frequency-response curve at $`\omega \approx 2\omega_0`, $`3\omega_0`, ….
3. **Quasi-periodicity**: motion on a 2-torus (two incommensurate frequencies).
4. **Intermittency**: long laminar phases interrupted by bursts.

<details><summary>Details</summary>

The Duffing oscillator with $`\delta > 0` and varying $`\gamma` exhibits a period-doubling route to chaos. The Lyapunov exponent becomes positive in the chaotic regime, meaning nearby trajectories diverge exponentially.

**Poincaré map.** To study the steady-state of a periodically driven system, one samples the trajectory once per driving period (at $`t = 2\pi n/\omega`). This **Poincaré section** converts the continuous flow into a discrete map: a fixed point of the map corresponds to a periodic orbit, a 2-cycle to a period-doubled orbit, and an infinite set of points to chaos. This is the standard tool for constructing bifurcation diagrams.

**Practical relevance:**
- Metronomes coupled on a common base synchronize via nonlinear interaction.
- Cardiac cells modelled by van der Pol–type equations can fibrillate (chaotic) under perturbation.
- Nonlinear energy sinks in structural engineering use intentional nonlinearity to absorb vibration over a broad frequency band.

</details>

## Simulation

<iframe src="./Nonlinear-oscillations.simulation.html" title="Duffing oscillator: phase portrait and time series with adjustable parameters"></iframe>

## Example problem

**Problem:** A pendulum of length $`L = 1` m is released from rest at $`\theta_0 = 60°`. Estimate its period using the first correction term, and compare with the small-angle value.

<details><summary>Solution</summary>

Small-angle period: $`T_0 = 2\pi\sqrt{L/g} = 2\pi\sqrt{1/9.81} \approx 2.006` s.

First correction: $`T \approx T_0(1 + \theta_0^2/16)`. With $`\theta_0 = \pi/3`:

$`\theta_0^2/16 = (\pi/3)^2/16 = \pi^2/144 \approx 0.0685`.

$`T \approx 2.006 \times 1.0685 \approx 2.143` s.

The exact value (from the elliptic integral) is $`T = 4\sqrt{1/9.81}\,K(\sin 30°) = 4 \times 0.3193 \times K(0.5) \approx 1.277 \times 1.686 \approx 2.154` s. The first-order correction is within 0.5%.

</details>