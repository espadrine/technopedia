# Damped Oscillations

Damped oscillations describe oscillatory motion in which energy is gradually lost to the environment (friction, air resistance, electrical resistance). They model real oscillators that would otherwise keep oscillating forever: the [Harmonic oscillator](./Harmonic-oscillator.md) is the undamped baseline, and [Driven oscillations](./Driven-oscillations.md) adds an external force.

<svg width="420" height="130" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="dah" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="red"/>
    </marker>
  </defs>
  <!-- Wall -->
  <rect x="20" y="20" width="10" height="90" fill="#555"/>
  <line x1="20" y1="20" x2="20" y2="110" stroke="#333" stroke-width="3"/>
  <!-- Spring (top path) -->
  <polyline points="30,50 45,38 60,62 75,38 90,62 105,38 120,62 135,38 150,50" fill="none" stroke="#333" stroke-width="2"/>
  <text x="90" y="32" text-anchor="middle" fill="#333" font-size="12" font-style="italic">k</text>
  <!-- Dashpot (bottom path) -->
  <line x1="30" y1="85" x2="70" y2="85" stroke="#333" stroke-width="2"/>
  <rect x="70" y="75" width="30" height="20" fill="none" stroke="#333" stroke-width="2"/>
  <line x1="85" y1="75" x2="85" y2="95" stroke="#333" stroke-width="2"/>
  <line x1="100" y1="85" x2="150" y2="85" stroke="#333" stroke-width="2"/>
  <text x="85" y="112" text-anchor="middle" fill="#333" font-size="12" font-style="italic">c</text>
  <!-- Mass -->
  <rect x="150" y="40" width="45" height="50" fill="#4a90d9" stroke="#2a5a8a" stroke-width="2" rx="3"/>
  <text x="172" y="72" text-anchor="middle" fill="white" font-size="14" font-weight="bold">m</text>
  <!-- Displacement arrow -->
  <line x1="195" y1="65" x2="260" y2="65" stroke="red" stroke-width="2" marker-end="url(#dah)"/>
  <text x="228" y="82" text-anchor="middle" fill="red" font-size="12" font-style="italic">x</text>
  <!-- Equilibrium dashed line -->
  <line x1="172" y1="15" x2="172" y2="110" stroke="#999" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="172" y="12" text-anchor="middle" fill="#999" font-size="10">equilibrium</text>
</svg>

> **Authoritative sources**
> - [OpenStax University Physics Volume 1, §15.5: Damped Oscillations](https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations)
> - [Landau & Lifshitz, *Mechanics*, §21: Free oscillations in one dimension](https://www.physics.msu.ru/eng/ll/)

## Equation of motion

```math
m\ddot{x} + c\dot{x} + kx = 0
```

where $`c` is the damping coefficient (N·s/m). Define $`\gamma = c/(2m)` (damping rate, s⁻¹) and $`\omega_0 = \sqrt{k/m}` (natural frequency).

<details><summary>Details</summary>

The characteristic equation is $`r^2 + 2\gamma r + \omega_0^2 = 0` with roots $`r = -\gamma \pm \sqrt{\gamma^2 - \omega_0^2}`. Three regimes result depending on the sign of the discriminant $`\gamma^2 - \omega_0^2`.

**Physical origin of damping.** For a mass moving through a fluid at low speed, the drag force is approximately linear: $`F_d = -c\dot{x}`. In an RLC circuit, the resistor provides the analogous energy loss. In a pendulum, air drag and pivot friction combine to give an effective $`c`.

**Electrical analog: the RLC circuit.** The same equation governs a series RLC circuit:

```math
L\ddot{q} + R\dot{q} + \frac{1}{C}\,q = 0
```

The mapping is exact: $`m \leftrightarrow L`, $`c \leftrightarrow R`, $`k \leftrightarrow 1/C`, $`x \leftrightarrow q`. Under this map $`\omega_0 = 1/\sqrt{LC}`, $`\gamma = R/(2L)`, and the three regimes correspond to:

- **Underdamped RLC** ($`R < 2\sqrt{L/C}`): the circuit rings (oscillatory charge decay).
- **Critically damped RLC** ($`R = 2\sqrt{L/C}`): fastest settling without oscillation.
- **Overdamped RLC** ($`R > 2\sqrt{L/C}`): slow exponential discharge.

This is the basis of radio tuning, band-pass filters, and pulse-shaping circuits. See [Driven oscillations](./Driven-oscillations.md) for the driven (forced) RLC case.

> **Authoritative source for this section:** [OpenStax University Physics Volume 2, §16.5: RLC Series Circuits](https://openstax.org/books/university-physics-volume-2/pages/16-5-rlc-series-circuits)

</details>

## Damping ratio

The **damping ratio** is the dimensionless parameter:

```math
\zeta = \frac{\gamma}{\omega_0} = \frac{c}{2\sqrt{mk}}
```

It directly classifies the regime: $`\zeta < 1` underdamped, $`\zeta = 1` critically damped, $`\zeta > 1` overdamped. Engineers in control theory and structural dynamics work primarily in terms of $`\zeta` rather than $`\gamma`.

<details><summary>Details</summary>

**Why ζ is the natural dimensionless parameter.** The equation of motion has three parameters ($`m`, $`c`, $`k`), but only two independent ratios can be formed from them (since the equation is homogeneous in $`x`). The natural frequency $`\omega_0 = \sqrt{k/m}` sets the time scale, and the damping rate $`\gamma = c/(2m)` sets the decay rate. Their ratio $`\zeta = \gamma/\omega_0` is the single dimensionless number that determines the qualitative behavior: it is the ratio of the *actual* damping to the *critical* damping $`c_{\text{crit}} = 2\sqrt{mk}`.

- If $`\zeta < 1`: damping is weaker than critical → the system oscillates.
- If $`\zeta = 1`: damping is exactly critical → fastest non-oscillatory return.
- If $`\zeta > 1`: damping exceeds critical → the system creeps back.

**Concrete example.** A car suspension has $`m = 300` kg (one wheel), $`k = 30{,}000` N/m, and $`c = 2000` N·s/m.

- $`\omega_0 = \sqrt{30000/300} = 10` rad/s.
- $`\gamma = 2000/(2 \times 300) = 3.33` s⁻¹.
- $`\zeta = 3.33/10 = 0.33 < 1`: underdamped. The wheel bounces a few times after hitting a bump.

The critical damping would be $`c_{\text{crit}} = 2\sqrt{300 \times 30000} = 2 \times 3000 = 6000` N·s/m. The actual damper provides only about one-third of critical damping, which is typical for car suspensions (they are deliberately underdamped for ride comfort).

> **Authoritative source for this section:** [OpenStax University Physics Volume 1, §15.5: Damped Oscillations](https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations)

</details>

## Three regimes

<table>
<tr><th>Regime</th><th>Condition</th><th>Solution form</th><th>Behavior</th></tr>
<tr><td>Underdamped</td><td>ζ &lt; 1 (γ &lt; ω₀)</td><td>e<sup>−γt</sup> cos(ω<sub>d</sub> t + φ)</td><td>Oscillates with decaying amplitude</td></tr>
<tr><td>Critically damped</td><td>ζ = 1 (γ = ω₀)</td><td>(A + Bt) e<sup>−γt</sup></td><td>Fastest return to equilibrium, no oscillation</td></tr>
<tr><td>Overdamped</td><td>ζ &gt; 1 (γ &gt; ω₀)</td><td>A e<sup>r₁t</sup> + B e<sup>r₂t</sup></td><td>Slow exponential decay, no oscillation</td></tr>
</table>

### Underdamped ($`\zeta < 1`)

The damped frequency is $`\omega_d = \sqrt{\omega_0^2 - \gamma^2} = \omega_0\sqrt{1 - \zeta^2}`. The amplitude envelope is $`A\,e^{-\gamma t}`. The **quality factor** is $`Q = \omega_0/(2\gamma) = 1/(2\zeta)`. For $`Q \gg 1` (i.e. $`\zeta \ll 1`), the system oscillates many cycles before the amplitude drops significantly.

<details><summary>Details</summary>

The full solution is $`x(t) = A\,e^{-\gamma t}\cos(\omega_d\, t + \phi)`.

**Phase-space picture.** In the $`(x, \dot{x})` plane, the trajectory is a spiral converging to the origin. This contrasts with the undamped [Harmonic oscillator](./Harmonic-oscillator.md), whose phase portrait is a family of closed orbits.

<svg width="220" height="200" xmlns="http://www.w3.org/2000/svg">
  <line x1="30" y1="100" x2="200" y2="100" stroke="#333" stroke-width="1"/>
  <line x1="110" y1="10" x2="110" y2="190" stroke="#333" stroke-width="1"/>
  <text x="195" y="115" fill="#888" font-size="10" font-style="italic">x</text>
  <text x="115" y="18" fill="#888" font-size="10" font-style="italic">ẋ</text>
  <!-- Undamped closed orbit (dashed) -->
  <ellipse cx="110" cy="100" rx="70" ry="55" fill="none" stroke="#666" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="155" y="55" fill="#666" font-size="9">undamped</text>
  <!-- Damped spiral -->
  <polyline points="170,100 160.5,123.3 147.3,137.2 132.2,142.0 117.0,139.1 103.0,130.0 91.3,116.8 82.5,101.2 76.8,85.3 74.3,70.4 74.5,57.7 77.0,48.0 81.1,41.6 86.2,38.4 91.5,38.2 96.7,40.5 101.2,44.5 104.8,49.7 107.3,55.3 108.7,60.7 109.1,65.6 108.6,69.5 107.4,72.3 105.7,74.0 103.9,74.5 102.0,74.1 100.3,72.9 98.9,71.3 97.8,69.4 97.1,67.4 96.8,65.6 96.9,64.0 97.2,62.8 97.7,62.1 98.3,61.7 99.0,61.7 99.6,62.0 100.2,62.5 100.6,63.1 100.9,63.8 101.1,64.5 101.1,65.1 101.0,65.6 100.9,65.9 100.7,66.1 100.5,66.2 100.2,66.1 100.0,66.0 99.9,65.8 99.7,65.5 99.6,65.3 99.6,65.1 99.6,64.9 99.7,64.7 99.7,64.6 99.8,64.6 99.9,64.6 100.0,64.7 100.0,64.8 100.1,64.9 100.1,65.0" fill="none" stroke="#4fc3f7" stroke-width="2"/>
  <circle cx="110" cy="100" r="3" fill="#ff8a65"/>
  <text x="115" y="108" fill="#ff8a65" font-size="9">origin</text>
</svg>

**Numerical example.** Let $`m = 1` kg, $`k = 25` N/m, $`c = 2` N·s/m. Then $`\omega_0 = 5`, $`\gamma = 1`, $`\zeta = 0.2`, $`\omega_d = \sqrt{24} \approx 4.90` rad/s. With $`x(0) = 1`, $`\dot{x}(0) = 0`:

- $`x(0) = 1.000`
- $`x(0.5) = e^{-0.5}\cos(2.45) = 0.607 \times (-0.770) = -0.467`
- $`x(1.0) = e^{-1}\cos(4.90) = 0.368 \times (-0.183) = -0.067`
- $`x(1.5) = e^{-1.5}\cos(7.35) = 0.223 \times 0.558 = 0.124`
- $`x(2.0) = e^{-2}\cos(9.80) = 0.135 \times (-0.999) = -0.135`

The amplitude envelope $`e^{-t}` drops to $`e^{-1} \approx 0.37` after one time constant ($`t = 1/\gamma = 1` s).

> **Authoritative source for this section:** [OpenStax University Physics Volume 1, §15.5: Damped Oscillations](https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations)

</details>

### Critically damped ($`\zeta = 1`)

The solution is $`x(t) = (A + Bt)\,e^{-\gamma t}`. The system returns to equilibrium in the shortest time without overshooting.

<details><summary>Details</summary>

**Why the repeated root gives $`t\,e^{-\gamma t}`.** At $`\zeta = 1` the discriminant vanishes: $`r = -\gamma` is a double root. The general solution of a second-order ODE with a repeated root $`r` is $`x(t) = (A + Bt)\,e^{rt}`. The factor $`t` appears because the two linearly independent solutions of $`(D - r)^2 x = 0` are $`e^{rt}` and $`t\,e^{rt}` (the second is obtained by differentiating the first with respect to $`r`).

**Numerical example.** Let $`m = 1`, $`k = 25`, $`c = 10` (so $`\gamma = 5 = \omega_0`, $`\zeta = 1`). With $`x(0) = 1`, $`\dot{x}(0) = 0`:

- $`A = 1`, $`B = \gamma = 5` (from $`x'(0) = B - \gamma A = 0`).
- $`x(t) = (1 + 5t)\,e^{-5t}`.
- $`x(0.1) = 1.5 \times e^{-0.5} = 1.5 \times 0.607 = 0.910`
- $`x(0.5) = 3.5 \times e^{-2.5} = 3.5 \times 0.0821 = 0.287`
- $`x(1.0) = 6.0 \times e^{-5} = 6.0 \times 0.00674 = 0.0404`
- $`x(2.0) = 11.0 \times e^{-10} \approx 0.0005`

The system is essentially at equilibrium by $`t \approx 1/\gamma = 0.2` s.

**Design target.** Critical damping is the design goal for door closers, galvanometers, and many measurement instruments. Any deviation — slightly underdamped — introduces a small overshoot; slightly overdamped — slows the return.

> **Authoritative source for this section:** [Landau & Lifshitz, *Mechanics*, §21: Free oscillations in one dimension](https://www.physics.msu.ru/eng/ll/)

<details><summary>Example problem</summary>

A door closer has $`m = 5` kg and $`k = 200` N/m. What damping coefficient $`c` gives critical damping?

<details><summary>Solution</summary>

Critical damping requires $`\zeta = 1`, i.e. $`c = 2\sqrt{mk}`.

$`c = 2\sqrt{5 \times 200} = 2\sqrt{1000} = 2 \times 31.6 = 63.2` N·s/m.

</details>

</details>

</details>

### Overdamped ($`\zeta > 1`)

Both roots are real and negative: $`r_{1,2} = -\gamma \pm \sqrt{\gamma^2 - \omega_0^2}`. The motion is a sum of two exponentials with different time constants; the slower one dominates at long times.

<details><summary>Details</summary>

**Two time constants.** The two roots give two decay rates: $`|r_1| = \gamma - \sqrt{\gamma^2 - \omega_0^2}` (slow) and $`|r_2| = \gamma + \sqrt{\gamma^2 - \omega_0^2}` (fast). The fast mode dies quickly, leaving the slow mode to govern the long-time behavior.

**Large-ζ limit.** For $`\gamma \gg \omega_0` (i.e. $`\zeta \gg 1`), expand the slow root:

```math
r_1 = -\gamma + \sqrt{\gamma^2 - \omega_0^2} \approx -\gamma + \gamma\!\left(1 - \frac{\omega_0^2}{2\gamma^2}\right) = -\frac{\omega_0^2}{2\gamma}
```

The slow-mode time constant is therefore:

```math
\tau = \frac{1}{|r_1|} = \frac{2\gamma}{\omega_0^2} = \frac{c}{k}
```

**Numerical example.** Let $`m = 1`, $`k = 1`, $`c = 10` (so $`\gamma = 5`, $`\omega_0 = 1`, $`\zeta = 5`).

- $`r_1 = -5 + \sqrt{25 - 1} = -5 + 4.899 = -0.101`
- $`r_2 = -5 - 4.899 = -9.899`
- Slow time constant: $`\tau_1 = 1/0.101 \approx 9.9` s.
- Fast time constant: $`\tau_2 = 1/9.899 \approx 0.101` s.
- Check: $`c/k = 10/1 = 10` s ≈ $`\tau_1` (the approximation $`\tau \approx c/k` is excellent for $`\zeta = 5`).

The system creeps back to equilibrium over roughly 10 s without any oscillation. This regime is common in heavily viscous systems (e.g., a mass moving through honey).

> **Authoritative source for this section:** [Landau & Lifshitz, *Mechanics*, §21: Free oscillations in one dimension](https://www.physics.msu.ru/eng/ll/)

</details>

**Side-by-side comparison of the three regimes** (same $`\omega_0 = 5`, different $`\gamma`):

<svg width="520" height="180" xmlns="http://www.w3.org/2000/svg">
  <!-- Underdamped subplot -->
  <rect x="10" y="10" width="160" height="120" fill="none" stroke="#444" stroke-width="1"/>
  <line x1="10" y1="70" x2="170" y2="70" stroke="#333" stroke-width="0.5"/>
  <polyline points="10.0,20.0 13.2,27.3 16.4,39.8 19.6,54.9 22.8,69.9 26.0,82.7 29.2,91.8 32.4,96.3 35.6,96.4 38.8,92.5 42.0,86.0 45.2,78.1 48.4,70.2 51.6,63.4 54.8,58.6 58.0,56.2 61.2,56.1 64.4,58.1 67.6,61.5 70.8,65.7 74.0,69.8 77.2,73.4 80.4,76.0 83.6,77.3 86.8,77.3 90.0,76.3 93.2,74.5 96.4,72.3 99.6,70.1 102.8,68.2 106.0,66.9 109.2,66.2 112.4,66.1 115.6,66.7 118.8,67.6 122.0,68.8 125.2,69.9 128.4,70.9 131.6,71.6 134.8,72.0 138.0,72.0 141.2,71.8 144.4,71.3 147.6,70.7 150.8,70.1 154.0,69.5 157.2,69.1 160.4,68.9 163.6,68.9 166.8,69.1 170.0,69.3" fill="none" stroke="#4fc3f7" stroke-width="2"/>
  <text x="90" y="145" text-anchor="middle" fill="#4fc3f7" font-size="11">Underdamped (ζ = 0.2)</text>
  <!-- Critical subplot -->
  <rect x="180" y="10" width="160" height="120" fill="none" stroke="#444" stroke-width="1"/>
  <line x1="180" y1="70" x2="340" y2="70" stroke="#333" stroke-width="0.5"/>
  <polyline points="180.0,20.0 183.2,23.1 186.4,29.6 189.6,36.9 192.8,43.8 196.0,49.7 199.2,54.6 202.4,58.4 205.6,61.4 208.8,63.7 212.0,65.4 215.2,66.7 218.4,67.6 221.6,68.3 224.8,68.8 228.0,69.1 231.2,69.4 234.4,69.6 237.6,69.7 240.8,69.8 244.0,69.8 247.2,69.9 250.4,69.9 253.6,69.9 256.8,70.0 260.0,70.0 263.2,70.0 266.4,70.0 269.6,70.0 272.8,70.0 276.0,70.0 279.2,70.0 282.4,70.0 285.6,70.0 288.8,70.0 292.0,70.0 295.2,70.0 298.4,70.0 301.6,70.0 304.8,70.0 308.0,70.0 311.2,70.0 314.4,70.0 317.6,70.0 320.8,70.0 324.0,70.0 327.2,70.0 330.4,70.0 333.6,70.0 336.8,70.0 340.0,70.0" fill="none" stroke="#aed581" stroke-width="2"/>
  <text x="260" y="145" text-anchor="middle" fill="#aed581" font-size="11">Critical (ζ = 1)</text>
  <!-- Overdamped subplot -->
  <rect x="350" y="10" width="160" height="120" fill="none" stroke="#444" stroke-width="1"/>
  <line x1="350" y1="70" x2="510" y2="70" stroke="#333" stroke-width="0.5"/>
  <polyline points="350.0,20.0 353.2,22.5 356.4,26.7 359.6,31.0 362.8,34.9 366.0,38.5 369.2,41.7 372.4,44.6 375.6,47.2 378.8,49.5 382.0,51.6 385.2,53.4 388.4,55.1 391.6,56.6 394.8,58.0 398.0,59.2 401.2,60.3 404.4,61.3 407.6,62.2 410.8,63.0 414.0,63.7 417.2,64.3 420.4,64.9 423.6,65.4 426.8,65.9 430.0,66.3 433.2,66.7 436.4,67.0 439.6,67.3 442.8,67.6 446.0,67.8 449.2,68.1 452.4,68.3 455.6,68.4 458.8,68.6 462.0,68.7 465.2,68.9 468.4,69.0 471.6,69.1 474.8,69.2 478.0,69.3 481.2,69.3 484.4,69.4 487.6,69.5 490.8,69.5 494.0,69.6 497.2,69.6 500.4,69.7 503.6,69.7 506.8,69.7 510.0,69.7" fill="none" stroke="#ff8a65" stroke-width="2"/>
  <text x="430" y="145" text-anchor="middle" fill="#ff8a65" font-size="11">Overdamped (ζ = 2)</text>
  <!-- Axis labels -->
  <text x="90" y="168" text-anchor="middle" fill="#888" font-size="10" font-style="italic">t</text>
  <text x="260" y="168" text-anchor="middle" fill="#888" font-size="10" font-style="italic">t</text>
  <text x="430" y="168" text-anchor="middle" fill="#888" font-size="10" font-style="italic">t</text>
</svg>

## Energy decay

For the underdamped case, the energy decays as:

```math
E(t) \approx E_0\, e^{-2\gamma t}
```

<details><summary>Details</summary>

The energy half-life is $`t_{1/2} = \ln 2 / (2\gamma)`. The number of oscillations before the energy drops by a factor $`e` is $`N = Q/(2\pi)`. A high-$`Q` system (e.g., a tuning fork, $`Q \sim 10^3`) rings for hundreds of cycles.

The **logarithmic decrement** is $`\delta = \gamma T_d = 2\pi\gamma/\omega_d \approx \pi/Q` for $`Q \gg 1`. It is measured experimentally as the natural log of the ratio of successive peak amplitudes.

**Connection to resonance.** The same quality factor $`Q = \omega_0/(2\gamma)` that quantifies how slowly the free oscillation decays also quantifies the sharpness of the resonance peak in a driven system: a high-$`Q` oscillator has a narrow resonance with a large peak amplitude. See [Driven oscillations](./Driven-oscillations.md) for the full resonance analysis.

> **Authoritative source for this section:** [OpenStax University Physics Volume 1, §15.5: Damped Oscillations](https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations)

</details>

## Simulation

<iframe src="./Damped-oscillations.simulation.html" title="Damped oscillation: three regimes"></iframe>

## Quizz

<details><summary>Quizz</summary>

**Problem:** A 2 kg mass on a spring ($`k = 50` N/m) has a damping coefficient $`c = 4` N·s/m. Determine the regime, the damped frequency, and the time for the amplitude to fall to 1% of its initial value.

<details><summary>Solution</summary>

- $`\omega_0 = \sqrt{50/2} = 5` rad/s.
- $`\gamma = c/(2m) = 4/4 = 1` s⁻¹.
- $`\zeta = \gamma/\omega_0 = 1/5 = 0.2 < 1`: **underdamped**.
- $`\omega_d = \sqrt{25 - 1} = \sqrt{24} \approx 4.90` rad/s.
- Amplitude envelope: $`e^{-\gamma t}`. Set $`e^{-t} = 0.01`: $`t = \ln(100) \approx 4.61` s.

</details>

</details>
