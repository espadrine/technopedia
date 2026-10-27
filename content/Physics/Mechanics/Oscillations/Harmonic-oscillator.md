# Harmonic Oscillator

The harmonic oscillator is the simplest system that oscillates: a mass on a linear spring, or any system whose restoring force is proportional to displacement. It is the baseline model from which all other oscillatory behavior is built. It is relevant to clocks, molecular vibrations, LC circuits, and as the local approximation near any stable equilibrium. See [Oscillations and Waves](./Readme.md) for the broader context and categorization.

The harmonic oscillator is the reference point for every other oscillation type: adding dissipation gives [Damped oscillations](./Damped-oscillations.md), adding an external force gives [Driven oscillations](./Driven-oscillations.md), and nonlinear restoring forces give [Nonlinear oscillations](./Nonlinear-oscillations.md).

<svg width="420" height="130" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="red"/>
    </marker>
  </defs>
  <!-- Wall -->
  <rect x="20" y="25" width="10" height="80" fill="#555"/>
  <line x1="20" y1="25" x2="20" y2="105" stroke="#333" stroke-width="3"/>
  <!-- Spring zigzag -->
  <polyline points="30,65 45,50 60,80 75,50 90,80 105,50 120,80 135,50 150,65" fill="none" stroke="#333" stroke-width="2"/>
  <!-- Mass -->
  <rect x="150" y="45" width="40" height="40" fill="#4a90d9" stroke="#2a5a8a" stroke-width="2" rx="3"/>
  <text x="170" y="70" text-anchor="middle" fill="white" font-size="14" font-weight="bold">m</text>
  <!-- Spring label -->
  <text x="90" y="40" text-anchor="middle" fill="#333" font-size="12" font-style="italic">k</text>
  <!-- Equilibrium dashed line -->
  <line x1="170" y1="18" x2="170" y2="105" stroke="#999" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="170" y="14" text-anchor="middle" fill="#999" font-size="10">equilibrium</text>
  <!-- Displacement arrow -->
  <line x1="190" y1="100" x2="250" y2="100" stroke="red" stroke-width="2" marker-end="url(#ah)"/>
  <text x="220" y="118" text-anchor="middle" fill="red" font-size="12" font-style="italic">x</text>
</svg>

> **Authoritative sources**
> - [OpenStax University Physics Volume 1, §15.1: Simple Harmonic Motion](https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion)
> - [Landau & Lifshitz, *Mechanics*, §21: Free oscillations in one dimension](https://www.physics.msu.ru/eng/ll/)

## Equation of motion

```math
m\ddot{x} + kx = 0
```

General solution: $`x(t) = A\cos(\omega t + \phi)`, where $`\omega = \sqrt{k/m}`, $`T = 2\pi/\omega = 2\pi\sqrt{m/k}`, $`f = 1/T`.

**Complex exponential form.** The solution is equivalently $`x(t) = \operatorname{Re}\!\bigl[A e^{i\omega t}\bigr]`, or $`x(t) = \tfrac{1}{2}\bigl(Ae^{i\omega t} + A^* e^{-i\omega t}\bigr)`. This form is used in coupled oscillations, wave propagation, and Fourier analysis.

**Amplitude and phase from initial conditions.** Given $`x(0) = x_0` and $`\dot{x}(0) = v_0`:

```math
A = \sqrt{x_0^2 + \left(\frac{v_0}{\omega}\right)^2}, \qquad \phi = -\arctan\!\left(\frac{v_0}{\omega\, x_0}\right)
```

(with the quadrant of $`\phi` determined by the signs of $`x_0` and $`v_0`).

<details><summary>Details</summary>

The equation is second-order, linear, and homogeneous. Two initial conditions ($`x(0)` and $`\dot{x}(0)`) determine $`A` and $`\phi`. The solution can also be written as $`x(t) = C_1\cos(\omega t) + C_2\sin(\omega t)`.

**Energy.** Total mechanical energy is conserved:

```math
E = \tfrac{1}{2}m\dot{x}^2 + \tfrac{1}{2}kx^2 = \tfrac{1}{2}kA^2
```

Energy oscillates between kinetic (maximum at $`x = 0`) and potential (maximum at $`x = \pm A`) at twice the oscillation frequency.

**Phase space.** The trajectory in the $`(x, \dot{x})` plane is an ellipse: $`(x/A)^2 + (\dot{x}/(\omega A))^2 = 1`. All orbits are closed, confirming periodicity.

<svg width="280" height="220" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="110" x2="260" y2="110" stroke="#333" stroke-width="1.5"/>
  <line x1="150" y1="10" x2="150" y2="210" stroke="#333" stroke-width="1.5"/>
  <text x="255" y="125" fill="#333" font-size="11" font-style="italic">x</text>
  <text x="155" y="18" fill="#333" font-size="11" font-style="italic">ẋ</text>
  <ellipse cx="150" cy="110" rx="100" ry="80" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <circle cx="230" cy="70" r="4" fill="red"/>
  <text x="248" y="115" fill="#666" font-size="10">A</text>
  <text x="155" y="28" fill="#666" font-size="10">ωA</text>
</svg>

**Universality.** Any system near a stable equilibrium has a quadratic potential $`V(x) \approx V_0 + \tfrac{1}{2}k(x-x_0)^2`, so the harmonic oscillator is the universal local model. See [Dynamics](../Dynamics.md) for the general equilibrium analysis.

> **Authoritative source for this section:** [Landau & Lifshitz, *Mechanics*, §21: Free oscillations in one dimension](https://www.physics.msu.ru/eng/ll/)

<details><summary>Example problem</summary>

A mass $`m = 2` kg is attached to a spring with $`k = 50` N/m. At $`t = 0` it is at $`x_0 = 0.1` m with velocity $`v_0 = 0.5` m/s. Find $`A` and $`\phi`.

<details><summary>Solution</summary>

$`\omega = \sqrt{50/2} = 5` rad/s.

$`A = \sqrt{0.1^2 + (0.5/5)^2} = \sqrt{0.01 + 0.01} = \sqrt{0.02} \approx 0.141` m.

$`\phi = -\arctan(0.5/(5 \times 0.1)) = -\arctan(1) = -\pi/4` rad.

</details>

</details>

</details>

## Isochronism and cross-domain examples

The period $`T = 2\pi\sqrt{m/k}` is **independent of amplitude**—this is the defining property of harmonic motion (isochronism). It depends only on the system's inertia and stiffness, not on how far the mass is displaced.

<details><summary>Details</summary>

Isochronism is a direct consequence of linearity: the restoring force is proportional to displacement, so the effective stiffness the mass feels is the same at every point of the trajectory. In nonlinear oscillators the period depends on amplitude (see [Nonlinear oscillations](./Nonlinear-oscillations.md)).

**Cross-domain examples of the harmonic oscillator:**

- **Simple pendulum** (small angle $`|\theta| \ll 1`): $`T = 2\pi\sqrt{L/g}`. Here the mass cancels; the "spring constant" is $`mg/L`.
- **LC circuit**: $`\omega = 1/\sqrt{LC}`. Charge plays the role of displacement, inductance of mass, and $`1/C` of spring constant.
- **Torsional oscillator**: $`\omega = \sqrt{\kappa/I}` where $`\kappa` is torsional stiffness and $`I` is moment of inertia.
- **Molecular vibration**: diatomic molecules vibrate at $`\omega = \sqrt{k_{\text{bond}}/\mu}` where $`\mu` is reduced mass.

<svg width="340" height="150" xmlns="http://www.w3.org/2000/svg">
  <!-- Pendulum -->
  <circle cx="60" cy="20" r="3" fill="#333"/>
  <line x1="60" y1="20" x2="85" y2="100" stroke="#333" stroke-width="1.5"/>
  <circle cx="85" cy="100" r="8" fill="#4a90d9"/>
  <text x="75" y="60" fill="#666" font-size="10" font-style="italic">L</text>
  <text x="60" y="130" text-anchor="middle" fill="#333" font-size="11">Pendulum</text>
  <!-- LC circuit -->
  <rect x="160" y="45" width="20" height="40" fill="none" stroke="#333" stroke-width="1.5"/>
  <text x="170" y="70" text-anchor="middle" fill="#333" font-size="10" font-style="italic">L</text>
  <line x1="180" y1="45" x2="210" y2="45" stroke="#333" stroke-width="1.5"/>
  <line x1="210" y1="45" x2="210" y2="52" stroke="#333" stroke-width="1.5"/>
  <line x1="205" y1="52" x2="215" y2="52" stroke="#333" stroke-width="1.5"/>
  <line x1="205" y1="58" x2="215" y2="58" stroke="#333" stroke-width="1.5"/>
  <line x1="210" y1="58" x2="210" y2="85" stroke="#333" stroke-width="1.5"/>
  <line x1="210" y1="85" x2="180" y2="85" stroke="#333" stroke-width="1.5"/>
  <line x1="180" y1="85" x2="180" y2="45" stroke="#333" stroke-width="1.5"/>
  <text x="185" y="130" text-anchor="middle" fill="#333" font-size="11">LC circuit</text>
  <!-- Torsional -->
  <rect x="270" y="40" width="30" height="30" fill="#4a90d9" rx="3"/>
  <line x1="285" y1="70" x2="285" y2="100" stroke="#333" stroke-width="2"/>
  <path d="M 275 35 Q 285 25 295 35" fill="none" stroke="red" stroke-width="1.5"/>
  <text x="285" y="130" text-anchor="middle" fill="#333" font-size="11">Torsional</text>
</svg>

> **Authoritative source for this section:** [OpenStax University Physics Volume 1, §15.1: Simple Harmonic Motion](https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion)

<details><summary>Example problem</summary>

A simple pendulum has a period of 2 s on Earth ($`g = 9.8` m/s²). What is its length? What would its period be on the Moon ($`g_{\text{moon}} = 1.62` m/s²)?

<details><summary>Solution</summary>

$`L = gT^2/(4\pi^2) = 9.8 \times 4 / (4\pi^2) = 39.2 / 39.48 \approx 0.993` m.

On the Moon: $`T_{\text{moon}} = 2\pi\sqrt{L/g_{\text{moon}}} = 2\pi\sqrt{0.993/1.62} \approx 2\pi \times 0.782 \approx 4.91` s.

</details>

</details>

</details>

## Superposition

Because the equation is linear, any linear combination of solutions is also a solution:

```math
x(t) = A_1\cos(\omega t) + A_2\sin(\omega t) = A\cos(\omega t + \phi)
```

**Concrete example.** Let $`x_1 = 2\cos(3t)` and $`x_2 = \cos(3t + \pi/2) = -\sin(3t)`. Their sum is:

```math
x = 2\cos(3t) - \sin(3t) = \sqrt{5}\,\cos\!\left(3t + \arctan\tfrac{1}{2}\right)
```

so $`A = \sqrt{5} \approx 2.24` and $`\phi \approx 0.464` rad.

<svg width="400" height="180" xmlns="http://www.w3.org/2000/svg">
  <line x1="30" y1="90" x2="380" y2="90" stroke="#333" stroke-width="1"/>
  <line x1="30" y1="10" x2="30" y2="170" stroke="#333" stroke-width="1"/>
  <text x="375" y="105" fill="#333" font-size="10" font-style="italic">t</text>
  <text x="20" y="15" fill="#333" font-size="10" font-style="italic">x</text>
  <!-- x1 = 2cos(3t) -->
  <polyline points="30,30 55,90 80,150 105,90 130,30 155,90 180,150 205,90 230,30 255,90 280,150 305,90 330,30 355,90 380,150" fill="none" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- x2 = -sin(3t) -->
  <polyline points="30,90 55,135 80,90 105,45 130,90 155,135 180,90 205,45 230,90 255,135 280,90 305,45 330,90 355,135 380,90" fill="none" stroke="#27ae60" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Sum -->
  <polyline points="30,50 55,90 80,140 105,90 130,40 155,90 180,140 205,90 230,40 255,90 280,140 305,90 330,40 355,90 380,140" fill="none" stroke="#2c3e50" stroke-width="2.5"/>
  <!-- Legend -->
  <line x1="240" y1="160" x2="260" y2="160" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="264" y="164" fill="#e74c3c" font-size="9">x₁</text>
  <line x1="290" y1="160" x2="310" y2="160" stroke="#27ae60" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="314" y="164" fill="#27ae60" font-size="9">x₂</text>
  <line x1="340" y1="160" x2="360" y2="160" stroke="#2c3e50" stroke-width="2.5"/>
  <text x="364" y="164" fill="#2c3e50" font-size="9">x</text>
</svg>

<details><summary>Details</summary>

Superposition is the foundation for [Coupled oscillations](./Coupled-oscillations.md) (normal modes) and [Wave propagation](./Wave-Propagation.md) (Fourier decomposition). It fails for [Nonlinear oscillations](./Nonlinear-oscillations.md), where modes interact.

The complex exponential form makes superposition especially transparent: if $`x_1 = \operatorname{Re}[A_1 e^{i\omega t}]` and $`x_2 = \operatorname{Re}[A_2 e^{i\omega t}]`, then $`x_1 + x_2 = \operatorname{Re}[(A_1 + A_2)e^{i\omega t}]`. Adding phasors in the complex plane is equivalent to adding sinusoids in time.

> **Authoritative source for this section:** [Landau & Lifshitz, *Mechanics*, §21: Free oscillations in one dimension](https://www.physics.msu.ru/eng/ll/)

<details><summary>Example problem</summary>

Two oscillators with the same frequency $`\omega = 4` rad/s have displacements $`x_1 = 3\cos(4t)` and $`x_2 = 4\cos(4t + \pi/2)`. Find the amplitude and phase of their sum.

<details><summary>Solution</summary>

$`x_2 = 4\cos(4t + \pi/2) = -4\sin(4t)`.

$`x = 3\cos(4t) - 4\sin(4t)`.

$`A = \sqrt{3^2 + 4^2} = 5`.

$`\phi = -\arctan(4/3) \approx -0.927` rad.

So $`x = 5\cos(4t - 0.927)`.

</details>

</details>

</details>

<iframe src="./Harmonic-oscillator.simulation.html" title="Interactive harmonic oscillator: mass-spring, phase space, and energy exchange"></iframe>

<details><summary>Quizz</summary>

**Problem:** A 0.5 kg mass is attached to a spring with $`k = 200` N/m. It is pulled 3 cm from equilibrium and released from rest. Find the period, the maximum speed, the total energy, and the complex amplitude $`Ae^{i\phi}`.

<details><summary>Solution</summary>

- $`\omega = \sqrt{k/m} = \sqrt{200/0.5} = 20` rad/s.
- Period: $`T = 2\pi/\omega = 2\pi/20 \approx 0.314` s.
- Initial conditions: $`x_0 = 0.03` m, $`v_0 = 0`.
- Amplitude: $`A = \sqrt{x_0^2 + (v_0/\omega)^2} = x_0 = 0.03` m.
- Phase: $`\phi = -\arctan(0) = 0`.
- Maximum speed: $`v_{\max} = A\omega = 0.03 \times 20 = 0.6` m/s.
- Total energy: $`E = \tfrac{1}{2}kA^2 = \tfrac{1}{2}(200)(0.03)^2 = 0.09` J.
- Complex amplitude: $`Ae^{i\phi} = 0.03 \cdot e^{i \cdot 0} = 0.03`.

</details>

</details>