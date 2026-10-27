# Microcanonical Ensemble

The microcanonical ensemble is the probability measure for an **isolated** system with fixed energy $`E`, volume $`V`, and particle number $`N`. Every microstate compatible with those constraints is equally probable. It is the most fundamental ensemble: all others are derived from it by coupling to reservoirs. It is the right tool for isolated systems: a gas in a perfectly insulated box, the early universe, or any system where no energy or particles are exchanged.

> **Authoritative sources**
> - [Wikipedia: Microcanonical ensemble](https://en.wikipedia.org/wiki/Microcanonical_ensemble)
> - [Reif, Fundamentals of Statistical and Thermal Physics, Ch. 2](https://www.oxfordacademic.com/)
> - [Pathria & Khalil, Statistical Thermodynamics, Ch. 2](https://www.oxfordacademic.com/)

<iframe src="./MicrocanonicalEnsemble.simulation.html" title="2D gas with fixed total energy: particles bounce in a box, energy shell in phase space, and microstate counting"></iframe>

## Equal a priori probability

The postulate: all microstates $`\alpha` with $`H(\alpha) \leq E` (and fixed $`V, N`) have probability

```math
P(\alpha) = \frac{1}{\Omega(E,V,N)}, \qquad \Omega(E,V,N) = \sum_{\alpha:\, H(\alpha) \leq E} 1
```

where $`\Omega(E,V,N)` is the **cumulative number of accessible microstates** — the phase-space volume enclosed by the energy surface $`H = E`. For a classical system:

```math
\Omega(E,V,N) = \frac{1}{h^{3N} N!} \int_{H(q,p) \leq E} dq\,dp
```

The thin-shell density of states is $`\omega(E) = \partial \Omega / \partial E`.

<details><summary>Details</summary>

**Step 1 — The axiom.** The equal a priori probability postulate is the sole axiom of the microcanonical ensemble. It is justified by ergodicity: a generic isolated Hamiltonian system explores all accessible phase-space volume uniformly over long times. The microcanonical probability is a uniform measure on the region $`H \leq E` in phase space.

**Step 2 — Why cumulative, not shell.** The standard convention (Reif, Pathria, Sackur–Tetrode) uses the cumulative count $`\Omega(E) = \int_{H \leq E} dq\,dp / h^{3N}N!` rather than the thin-shell count. The reason is practical: for macroscopic systems, $`\Omega(E)` grows so rapidly with $`E` that $`\ln \Omega` is insensitive to whether one uses the shell or the cumulative volume. The derivative $`\omega(E) = \partial\Omega/\partial E` gives the shell density, and $`\ln \omega \approx \ln \Omega` when $`\Omega` is a power law in $`E`.

**Step 3 — Phase-space picture.** For a single particle in one dimension with Hamiltonian $`H = p^2/(2m) + V(q)`, the accessible region in the $(q,p)$ plane is the interior of the curve $`H(q,p) = E`. The microcanonical ensemble assigns uniform probability density to every point inside that curve.

<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;display:block;margin:12px auto;">
  <rect width="400" height="300" fill="#1a1a2e" rx="8"/>
  <line x1="50" y1="250" x2="370" y2="250" stroke="#555" stroke-width="1.5"/>
  <line x1="50" y1="250" x2="50" y2="20" stroke="#555" stroke-width="1.5"/>
  <text x="375" y="255" fill="#888" font-size="12" font-family="system-ui">q</text>
  <text x="40" y="15" fill="#888" font-size="12" font-family="system-ui">p</text>
  <ellipse cx="210" cy="135" rx="140" ry="95" fill="rgba(244,162,97,0.12)"/>
  <ellipse cx="210" cy="135" rx="140" ry="95" fill="none" stroke="#f4a261" stroke-width="2.5"/>
  <text x="210" y="140" fill="#f4a261" font-size="13" font-family="system-ui" text-anchor="middle">H(q,p) = E</text>
  <text x="210" y="160" fill="#aaa" font-size="11" font-family="system-ui" text-anchor="middle">accessible region (Ω)</text>
  <circle cx="150" cy="100" r="4" fill="#4ecdc4"/>
  <circle cx="250" cy="170" r="4" fill="#4ecdc4"/>
  <circle cx="180" cy="190" r="4" fill="#4ecdc4"/>
  <circle cx="280" cy="110" r="4" fill="#4ecdc4"/>
  <circle cx="130" cy="150" r="4" fill="#4ecdc4"/>
  <text x="150" y="90" fill="#4ecdc4" font-size="10" font-family="system-ui">α₁</text>
  <text x="255" y="185" fill="#4ecdc4" font-size="10" font-family="system-ui">α₂</text>
  <text x="210" y="280" fill="#ccc" font-size="11" font-family="system-ui" text-anchor="middle">P(α) = 1/Ω for every α inside the curve</text>
</svg>

**Step 4 — The shell approximation.** In practice one often writes $`E < H < E + \Delta` with $`\Delta \ll E` but $`\Delta` large enough that $`\Omega(E+\Delta) - \Omega(E) \gg 1` (many states in the shell). The entropy $`S = k_B \ln \Omega` is well-defined because $`\Delta` is negligible on the logarithmic scale.

**Step 5 — Classical vs. quantum.** For a classical system, $`\Omega` is a continuous phase-space volume divided by $`h^{3N}N!` (the $`h^{3N}` makes it dimensionless; the $`N!` corrects for indistinguishability). For a quantum system, $`\Omega` is simply the number of energy eigenstates with $`E_n \leq E`.

> **Authoritative sources**
> - [Reif, Fundamentals of Statistical and Thermal Physics, §2.2](https://www.oxfordacademic.com/)
> - [Pathria & Khalil, Statistical Thermodynamics, §2.1](https://www.oxfordacademic.com/)

<details><summary>Example problem</summary>

A single classical particle of mass $`m` moves in one dimension with Hamiltonian $`H = p^2/(2m)`. Compute $`\Omega(E)`.

<details><summary>Solution</summary>

The accessible region is $`p^2/(2m) \leq E`, i.e. $`|p| \leq \sqrt{2mE}`. The phase-space volume is

```math
\Omega(E) = \frac{1}{h} \int_{-\sqrt{2mE}}^{\sqrt{2mE}} dp = \frac{2\sqrt{2mE}}{h}
```

So $`\Omega \propto E^{1/2}`. The entropy is $`S = k_B \ln \Omega = k_B(\tfrac{1}{2}\ln E + \text{const})` and $`1/T = \partial S/\partial E = k_B/(2E)`.
</details>
</details>
</details>

## Entropy

The Boltzmann entropy is

```math
S(E,V,N) = k_B \ln \Omega(E,V,N)
```

This is the bridge from counting microstates to thermodynamics. Temperature and pressure follow as derivatives:

```math
\frac{1}{T} = \left(\frac{\partial S}{\partial E}\right)_{V,N}, \qquad \frac{P}{T} = \left(\frac{\partial S}{\partial V}\right)_{E,N}
```

<details><summary>Details</summary>

**Step 1 — From counting to thermodynamics.** The entropy $`S = k_B \ln \Omega` converts the enormous number of microstates into an additive (extensive) quantity. For two non-interacting subsystems, $`\Omega_{\text{tot}} = \Omega_1 \cdot \Omega_2` so $`S_{\text{tot}} = S_1 + S_2`.

**Step 2 — Temperature as an entropy slope.** The definition $`1/T = \partial S / \partial E` makes $`T` the Lagrange multiplier that equalizes when two systems are brought into thermal contact. If $`T_1 > T_2`, energy flows from 1 to 2 until the slopes match — this is the zeroth law derived from counting.

**Step 3 — Pressure as a volume derivative.** Similarly, $`P/T = \partial S / \partial V` at fixed $`E, N`. Expanding the box increases the accessible phase-space volume, increasing $`\Omega` and $`S`. The slope gives the thermodynamic pressure.

**Step 4 — Shape of S(E).** For a system with $`\Omega \propto E^a`, the entropy is $`S = k_B(a \ln E + \text{const})`, which is concave in $`E` (since $`\partial^2 S/\partial E^2 = -ak_B/E^2 < 0`). This concavity guarantees that energy flows from hot to cold and that equilibrium is stable.

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;display:block;margin:12px auto;">
  <rect width="400" height="250" fill="#1a1a2e" rx="8"/>
  <line x1="50" y1="210" x2="370" y2="210" stroke="#555" stroke-width="1.5"/>
  <line x1="50" y1="210" x2="50" y2="20" stroke="#555" stroke-width="1.5"/>
  <text x="375" y="215" fill="#888" font-size="12" font-family="system-ui">E</text>
  <text x="30" y="15" fill="#888" font-size="12" font-family="system-ui">S</text>
  <path d="M 55,200 Q 100,120 150,90 Q 200,70 250,58 Q 300,50 360,42" fill="none" stroke="#4ecdc4" stroke-width="2.5"/>
  <line x1="120" y1="105" x2="280" y2="65" stroke="#f4a261" stroke-width="1.5" stroke-dasharray="6,3"/>
  <circle cx="200" cy="72" r="5" fill="#f4a261"/>
  <text x="200" y="60" fill="#f4a261" font-size="11" font-family="system-ui" text-anchor="middle">(E₀, S₀)</text>
  <text x="290" y="55" fill="#f4a261" font-size="11" font-family="system-ui">slope = 1/T</text>
  <text x="200" y="235" fill="#ccc" font-size="11" font-family="system-ui" text-anchor="middle">S(E) = k_B ln Ω(E) — concave for Ω ∝ Eᵃ</text>
</svg>

**Step 5 — Connection to thermodynamics.** The full thermodynamic structure (fundamental relation, Legendre transforms, stability criteria) follows from $`S(E,V,N)`. See [Thermodynamic Potentials and Equilibrium](../Thermodynamics/Thermodynamic-Potentials-and-Equilibrium.md).

> **Authoritative sources**
> - [Reif, Fundamentals of Statistical and Thermal Physics, §2.3](https://www.oxfordacademic.com/)
> - [Statistical Foundations of Thermodynamics](../Thermodynamics/Statistical-Foundations-of-Thermodynamics.md)

<details><summary>Example problem</summary>

Two isolated systems with entropies $`S_1(E_1) = a_1 \ln E_1` and $`S_2(E_2) = a_2 \ln E_2` are brought into thermal contact. Total energy $`E = E_1 + E_2` is fixed. Find the equilibrium energy split.

<details><summary>Solution</summary>

Maximize $`S_{\text{tot}} = a_1 \ln E_1 + a_2 \ln E_2` subject to $`E_1 + E_2 = E`.

Setting $`\partial S_{\text{tot}}/\partial E_1 = 0`: $`a_1/E_1 = a_2/E_2`. This gives $`E_1/E_2 = a_1/a_2`, so $`E_1 = E \cdot a_1/(a_1+a_2)` and $`E_2 = E \cdot a_2/(a_1+a_2)`. The energy splits in proportion to the "heat capacities" $`a_i k_B`.
</details>
</details>
</details>

## Computing the density of states

The key computational skill in the microcanonical ensemble is evaluating $`\Omega(E,V,N)` for a given Hamiltonian. Two canonical examples:

### Classical ideal gas

For $`N` non-interacting particles of mass $`m` in a box of volume $`V`, the Hamiltonian is $`H = \sum_i p_i^2/(2m)`. The phase-space volume with $`H \leq E` is the volume of a $`3N`-dimensional ball of radius $`\sqrt{2mE}` in momentum space, times $`V^N` in configuration space:

```math
\Omega(E,V,N) = \frac{V^N}{N!\, h^{3N}} \cdot \frac{\pi^{3N/2}}{\Gamma(3N/2 + 1)} (2mE)^{3N/2}
```

So $`\Omega \propto V^N \, E^{3N/2}`.

### 3D harmonic oscillator

For a single particle in a 3D isotropic harmonic potential $`H = p^2/(2m) + \tfrac{1}{2}m\omega^2 r^2`, the accessible region in the 6D phase space is a 6D ellipsoid. The cumulative count scales as

```math
\Omega(E) \propto E^3
```

(the exponent equals the number of quadratic terms in $`H` divided by 2, i.e. $`f/2 = 6/2 = 3`).

<details><summary>Details</summary>

**Step 1 — General strategy.** To compute $`\Omega(E) = \int_{H \leq E} dq\,dp / h^{3N}N!`, identify the shape of the region $`H \leq E` in phase space. For separable Hamiltonians (sum of independent quadratic terms), the region is a high-dimensional ellipsoid whose volume is known in closed form.

**Step 2 — Ideal gas in detail.** The momentum integral $`\int_{\sum p_i^2 \leq 2mE} d^{3N}p` is the volume of a $`3N`-dimensional ball of radius $`R = \sqrt{2mE}`:

```math
V_{3N}(R) = \frac{\pi^{3N/2}}{\Gamma(3N/2+1)} R^{3N} = \frac{\pi^{3N/2}}{\Gamma(3N/2+1)} (2mE)^{3N/2}
```

The configuration integral is simply $`\int d^{3N}q = V^N`. Multiplying and dividing by $`h^{3N}N!` gives the result.

**Step 3 — Harmonic oscillator in detail.** The 3D harmonic oscillator has 6 quadratic terms (3 in $`p`, 3 in $`q`). The region $`H \leq E` is a 6D ellipsoid. By a linear change of variables, it maps to a 6D ball, and the volume scales as $`E^{6/2} = E^3`. More generally, a system with $`f` quadratic degrees of freedom has $`\Omega \propto E^{f/2}`.

**Step 4 — Scaling and Stirling.** For macroscopic $`N`, use Stirling's approximation $`\ln N! \approx N \ln N - N` to simplify. The Sackur–Tetrode equation (next section) is the result of this procedure for the ideal gas.

> **Authoritative sources**
> - [Reif, Fundamentals of Statistical and Thermal Physics, §2.4](https://www.oxfordacademic.com/)
> - [Pathria & Khalil, Statistical Thermodynamics, §2.3](https://www.oxfordacademic.com/)

<details><summary>Example problem</summary>

A system has $`f = 4` quadratic degrees of freedom (e.g., a 2D harmonic oscillator). What is the scaling of $`\Omega(E)` and the heat capacity $`C_V`?

<details><summary>Solution</summary>

With $`f = 4` quadratic terms, $`\Omega \propto E^{f/2} = E^2`. Then $`S = k_B \ln \Omega = 2k_B \ln E + \text{const}`.

Temperature: $`1/T = \partial S/\partial E = 2k_B/E` so $`T = E/(2k_B)`.

Heat capacity: $`C_V = \partial E/\partial T = 2k_B`. This matches equipartition: $`C_V = (f/2)k_B = 2k_B`. ✓
</details>
</details>
</details>

## The ideal gas in the microcanonical ensemble

The ideal gas is the most important application. Substituting the phase-space volume into $`S = k_B \ln \Omega` and using Stirling's approximation gives the **Sackur–Tetrode equation**:

```math
S(E,V,N) = Nk_B \left[ \ln\!\left(\frac{V}{N}\left(\frac{4\pi m E}{3Nh}\right)^{3/2}\right) + \frac{5}{2} \right]
```

From this, the ideal gas law and equipartition follow directly:

```math
U = E = \frac{3}{2}Nk_B T, \qquad PV = Nk_B T
```

<details><summary>Details</summary>

**Step 1 — Take the logarithm.** Starting from $`\Omega = \frac{V^N}{N!\,h^{3N}} \cdot \frac{\pi^{3N/2}}{\Gamma(3N/2+1)}(2mE)^{3N/2}`:

```math
\ln \Omega = N\ln V - \ln N! - 3N\ln h + \frac{3N}{2}\ln(2mE) + \frac{3N}{2}\ln\pi - \ln\Gamma\!\left(\tfrac{3N}{2}+1\right)
```

**Step 2 — Apply Stirling.** For large $`N`: $`\ln N! \approx N\ln N - N` and $`\ln\Gamma(3N/2+1) \approx \tfrac{3N}{2}\ln(3N/2) - 3N/2`. Substituting and collecting terms:

```math
\ln \Omega \approx N\ln\!\left[\frac{V}{N}\left(\frac{4\pi m E}{3Nh}\right)^{3/2}\right] + \frac{5N}{2}
```

**Step 3 — Entropy.** Multiplying by $`k_B` gives the Sackur–Tetrode equation. It is extensive: $`S \propto N` when $`V/N` and $`E/N` are held fixed.

**Step 4 — Temperature.** Differentiate: $`1/T = \partial S/\partial E = 3Nk_B/(2E)`, giving $`E = 3Nk_BT/2`. This is the equipartition result: each of the $`3N` quadratic momentum terms contributes $`k_BT/2` to the energy.

**Step 5 — Pressure.** Differentiate: $`P/T = \partial S/\partial V = Nk_B/V`, giving $`PV = Nk_BT`. The ideal gas law emerges purely from phase-space geometry — no intermolecular forces are needed.

**Step 6 — Heat capacity.** $`C_V = \partial E/\partial T = 3Nk_B/2`, constant and independent of temperature. This is the classical result; quantum corrections (Debye, Bose, Fermi) modify it at low $`T`.

<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;display:block;margin:12px auto;">
  <rect width="400" height="220" fill="#1a1a2e" rx="8"/>
  <line x1="50" y1="180" x2="370" y2="180" stroke="#555" stroke-width="1.5"/>
  <line x1="50" y1="180" x2="50" y2="20" stroke="#555" stroke-width="1.5"/>
  <text x="375" y="185" fill="#888" font-size="12" font-family="system-ui">T</text>
  <text x="15" y="15" fill="#888" font-size="12" font-family="system-ui">C_V/Nk_B</text>
  <line x1="50" y1="80" x2="360" y2="80" stroke="#4ecdc4" stroke-width="2.5"/>
  <text x="200" y="72" fill="#4ecdc4" font-size="12" font-family="system-ui" text-anchor="middle">C_V = 3Nk_B/2 (classical ideal gas)</text>
  <text x="200" y="110" fill="#aaa" font-size="11" font-family="system-ui" text-anchor="middle">constant — equipartition</text>
  <text x="200" y="200" fill="#ccc" font-size="11" font-family="system-ui" text-anchor="middle">Each of 3N quadratic terms contributes k_BT/2</text>
</svg>

> **Authoritative sources**
> - [Reif, Fundamentals of Statistical and Thermal Physics, §2.5](https://www.oxfordacademic.com/)
> - [Wikipedia: Sackur–Tetrode equation](https://en.wikipedia.org/wiki/Sackur%E2%80%93Tetrode_equation)

<details><summary>Example problem</summary>

A monatomic ideal gas has $`N = 10^{23}` particles in $`V = 1\,\text{m}^3` at $`T = 300\,\text{K}`. Compute $`E` and $`P`.

<details><summary>Solution</summary>

Energy: $`E = \tfrac{3}{2}Nk_BT = \tfrac{3}{2} \times 10^{23} \times 1.38\times10^{-23} \times 300 \approx 6.2\times10^3\,\text{J}`.

Pressure: $`P = Nk_BT/V = 10^{23} \times 1.38\times10^{-23} \times 300 / 1 \approx 4.1\times10^3\,\text{Pa}` (about 0.04 atm).
</details>
</details>
</details>

## Quantum microcanonical ensemble

For a quantum system with discrete energy eigenvalues $`E_n`, the microcanonical ensemble counts eigenstates:

```math
\Omega(E) = \sum_n \Theta(E - E_n)
```

The classical phase-space volume $`\int dq\,dp / h^{3N}` is replaced by the number of quantum states. In the semiclassical limit ($`\hbar \to 0`), the quantum count reproduces the classical phase-space volume. This connection is essential for quantum statistics: the [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md) uses the same density of states to build the Fermi–Dirac and Bose–Einstein distributions.

<details><summary>Details</summary>

**Step 1 — Discrete counting.** A quantum system has a discrete spectrum $`\{E_n\}`. The microcanonical ensemble at energy $`E` assigns equal probability $`1/\Omega(E)` to every eigenstate $`|n\rangle` with $`E_n \leq E`. There is no phase space to integrate over — just a count.

**Step 2 — Semiclassical limit.** When the level spacing $`\Delta E_n \ll E` (many states below $`E`), the sum $`\sum_n \Theta(E - E_n)` approximates the classical integral $`\int_{H\leq E} dq\,dp/h^{3N}N!`. The factor $`1/h^{3N}` in the classical formula is precisely the number of quantum states per unit phase-space volume (each state occupies a cell of volume $`h^{3N}` by the uncertainty principle).

**Step 3 — Connection to quantum statistics.** The density of single-particle states $`g(\varepsilon) = \partial \Omega_1 / \partial \varepsilon` (where $`\Omega_1` is the single-particle count) enters the Fermi–Dirac and Bose–Einstein occupation formulas. In the grand canonical ensemble, the total particle number is $`N = \sum_\varepsilon g(\varepsilon)\, f(\varepsilon)` where $`f` is the appropriate quantum distribution. See [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md) for the full treatment.

**Step 4 — Example: particle in a 3D box.** The energy levels are $`E_{n_x,n_y,n_z} = \frac{\hbar^2\pi^2}{2mL^2}(n_x^2+n_y^2+n_z^2)`. The number of states with $`E \leq E_0` is the volume of an octant of a sphere of radius $`n = \sqrt{2mL^2 E_0/(\hbar^2\pi^2)}` in the (n_x, n_y, n_z) space: $`\Omega \propto n^3 \propto E^{3/2}` — the same scaling as the classical result.

> **Authoritative sources**
> - [Pathria & Khalil, Statistical Thermodynamics, §2.4](https://www.oxfordacademic.com/)
> - [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md)
</details>

## Energy fluctuations and ensemble equivalence

In the microcanonical ensemble, energy is **exactly fixed**: $`\operatorname{Var}(E) = 0`. This is the most restrictive ensemble. When the system is coupled to a heat bath (canonical ensemble), energy fluctuates with $`\operatorname{Var}(E) = k_B T^2 C_V`. In the thermodynamic limit ($`N \to \infty`), the relative fluctuation $`\sqrt{\operatorname{Var}(E)}/E \sim 1/\sqrt{N}` vanishes, and all ensembles give identical thermodynamic predictions — this is **ensemble equivalence**.

<details><summary>Details</summary>

**Step 1 — Why zero fluctuation.** The microcanonical ensemble conditions on a single energy value. There is no randomness in $`E` — the system is isolated and energy is conserved exactly. All the "randomness" is in which microstate within the energy shell is occupied.

**Step 2 — Canonical fluctuations.** In the canonical ensemble, the system exchanges energy with a bath. The energy distribution is $`P(E) \propto \Omega(E)\, e^{-\beta E}`. The variance is $`\operatorname{Var}(E) = k_B T^2 C_V`. For an ideal gas, $`C_V = 3Nk_B/2`, so $`\operatorname{Var}(E) = \tfrac{9}{4}Nk_B^2T^2` and $`\sqrt{\operatorname{Var}(E)}/E = \sqrt{2/(3N)}`.

**Step 3 — Thermodynamic limit.** As $`N \to \infty` at fixed energy density $`e = E/N`, the relative fluctuation $`\sim 1/\sqrt{N} \to 0`. The canonical energy distribution becomes a delta function at $`E = Ne`, and the canonical and microcanonical predictions for all intensive quantities (temperature, pressure, entropy density) become identical. This is why one can freely choose whichever ensemble is most convenient for a given calculation.

**Step 4 — When equivalence breaks.** For small systems (nanoparticles, single molecules, black holes with few degrees of freedom), the relative fluctuations are not negligible and the ensembles give different predictions. The microcanonical ensemble is the correct one for truly isolated small systems.

See [CanonicalEnsemble](./CanonicalEnsemble.md) for the fixed-$`T` ensemble and [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md) for the fixed-$`T,\mu` ensemble.
</details>

## How this fits together

The microcanonical ensemble is the foundation of statistical mechanics: it defines entropy as a state count ($`S = k_B \ln \Omega`) and temperature as an entropy slope ($`1/T = \partial S/\partial E`). The canonical ensemble (fixed $`T`) and grand canonical ensemble (fixed $`T, \mu`) are derived by embedding the system in a larger microcanonical reservoir. Phase transitions appear as non-analyticities in $`S(E)` in the thermodynamic limit. The quantum microcanonical ensemble connects to quantum statistics (Fermi–Dirac, Bose–Einstein) through the density of states.

See [CanonicalEnsemble](./CanonicalEnsemble.md), [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md), [PhaseTransitions](./PhaseTransitions.md), and [Statistical Foundations of Thermodynamics](../Thermodynamics/Statistical-Foundations-of-Thermodynamics.md).

## Quizz

<details><summary>Problem</summary>

A system has $`\Omega(E) = c \cdot E^3` microstates (for $`E > 0`). Find $`S(E)`, $`T(E)`, and the heat capacity $`C_V`. Identify the physical system this corresponds to.
</details>

<details><summary>Solution</summary>

- **Entropy:** $`S = k_B \ln(c E^3) = k_B(\ln c + 3\ln E)`.
- **Temperature:** $`1/T = \partial S/\partial E = 3k_B/E` so $`T = E/(3k_B)`.
- **Heat capacity:** $`C_V = \partial E/\partial T = 3k_B` (constant, independent of $`T`).

The $`E^3` scaling corresponds to a 3D harmonic oscillator (6 quadratic degrees of freedom: 3 kinetic + 3 potential). The constant heat capacity is the classical equipartition result: $`C_V = (f/2)k_B = (6/2)k_B = 3k_B`. ✓

Note: this is the **cumulative** count. The thin-shell density of states would be $`\omega(E) = \partial\Omega/\partial E = 3cE^2 \propto E^2`, but $`\ln \omega \approx \ln \Omega` for large $`E` (they differ only by a constant in the logarithm), so the thermodynamic predictions are identical.
</details>
