# Nonequilibrium Statistical Mechanics

Nonequilibrium statistical mechanics describes systems that are **driven, relaxing, or transporting**: heat flowing through a wire, particles diffusing in a concentration gradient, a fluid sheared by a moving wall, or a system far from equilibrium after a quench. It is relevant whenever the system is not in thermal equilibrium: biological cells, electronic devices, climate systems, active matter, and any system with sustained currents or time-dependent driving. It extends the equilibrium ensembles to time-dependent probability distributions. For the equilibrium building blocks, see [Statistical Mechanics](./Readme.md).

> **Authoritative sources**
> - [Kubo, Statistical-Mechanical Theory of Non-Equilibrium Processes, JPSJ 12, 570 (1957)](https://doi.org/10.1143/JPSJ.12.570)
> - [Jarzynski, Nonequilibrium Equality for Free Energy Differences, PRL 78, 2690 (1997)](https://doi.org/10.1103/PhysRevLett.78.2690)
> - [Crooks, Entropy Production Fluctuation Theorem and the Nonequilibrium Work Relation, PRE 60, 2721 (1999)](https://doi.org/10.1103/PhysRevE.60.2721)
> - [Seifert, Stochastic Thermodynamics, Rev. Mod. Phys. 85, 1057 (2012)](https://doi.org/10.1103/RevModPhys.85.1057)

## Master equation and Fokker–Planck equation

The probability distribution $`P(\mathbf{x}, t)` of a system's state evolves according to a **master equation** (discrete states) or a **Fokker–Planck equation** (continuous states):

```math
\frac{\partial P}{\partial t} = \sum_{\mathbf{x}'} \bigl[ W(\mathbf{x}' \to \mathbf{x})\, P(\mathbf{x}', t) - W(\mathbf{x} \to \mathbf{x}')\, P(\mathbf{x}, t) \bigr]
```

For a continuous variable $`x` with drift $`A(x)` and diffusion $`D(x)` (Itô convention):

```math
\frac{\partial P}{\partial t} = -\frac{\partial}{\partial x}\bigl[A(x)\,P\bigr] + \frac{\partial^2}{\partial x^2}\bigl[D(x)\,P\bigr]
```

> **Note.** The form above is the Itô convention. In the Stratonovich convention the diffusion term reads $`\partial_x[D(x)\,\partial_x P]` instead. The two differ when $`D(x)` is position-dependent; they coincide for constant $`D`.

**State-transition schematic (two-state system):**

<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;">
  <circle cx="100" cy="80" r="35" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="100" y="85" text-anchor="middle" font-size="14" fill="#1565c0">State 0</text>
  <circle cx="300" cy="80" r="35" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="300" y="85" text-anchor="middle" font-size="14" fill="#e65100">State 1</text>
  <line x1="140" y1="65" x2="255" y2="65" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="197" y="55" text-anchor="middle" font-size="12">W₀₁</text>
  <line x1="260" y1="95" x2="145" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="200" y="115" text-anchor="middle" font-size="12">W₁₀</text>
  <defs><marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
</svg>

<details><summary>Details</summary>

**Step 1: The master equation as a probability flow.**

The master equation says: the rate of change of probability in state $`x` equals the total probability flowing *into* $`x` minus the total flowing *out*. For a two-state system with states 0 and 1 and transition rates $`W_{01}` (0→1) and $`W_{10}` (1→0):

```math
\dot{P}_0 = -W_{01}\,P_0 + W_{10}\,P_1, \qquad \dot{P}_1 = W_{01}\,P_0 - W_{10}\,P_1
```

**Step 2: Solve the two-state example.**

With $`P_0 + P_1 = 1`, the solution is

```math
P_0(t) = P_0^{\text{eq}} + \bigl(P_0(0) - P_0^{\text{eq}}\bigr)\, e^{-(W_{01}+W_{10})\,t}
```

where $`P_0^{\text{eq}} = W_{10}/(W_{01}+W_{10})`. The relaxation time is $`\tau = 1/(W_{01}+W_{10})`. At equilibrium, detailed balance holds: $`W_{01}\,P_0^{\text{eq}} = W_{10}\,P_1^{\text{eq}}`.

**Step 3: From discrete to continuous — the Fokker–Planck equation.**

When the state space is continuous (e.g., position $`x`), the Kramers–Moyal expansion of the master equation truncates at second order if the steps are small. The result is the Fokker–Planck equation with drift $`A(x)` (deterministic force) and diffusion $`D(x)` (noise strength). For the Langevin equation $`m\ddot{x} = -\gamma\dot{x} + F + \xi(t)` with $`\langle\xi(t)\xi(t')\rangle = 2\gamma k_B T\,\delta(t-t')`, the overdamped limit ($`m\to 0`) gives $`A(x) = F/\gamma` and $`D = k_B T/\gamma`.

**Step 4: Detailed balance and nonequilibrium currents.**

The condition $`W(x\to x')P_{\text{eq}}(x) = W(x'\to x)P_{\text{eq}}(x')` ensures zero net probability current at equilibrium. When violated (e.g., by a non-conservative driving force), a sustained current $`J(x) = A(x)P - \partial_x[D(x)P] \neq 0` persists, and the system produces entropy. See [CanonicalEnsemble](./CanonicalEnsemble.md) for the equilibrium fixed point $`P_{\text{eq}} \propto e^{-\beta E}`.

**Step 5: Interactive simulation.**

The simulation below shows a Brownian particle under the Langevin equation. You can adjust the friction $`\gamma` and temperature $`T` to observe the transition from ballistic (inertial) to diffusive (overdamped) motion, and verify the Einstein relation $`D = k_B T/\gamma` from the mean-squared displacement.

<iframe src="./NonequilibriumStatisticalMechanics.simulation.html" title="Langevin Brownian particle: ballistic-to-diffusive transition and Einstein relation"></iframe>

> **Authoritative sources**
> - [van Kampen, Stochastic Processes in Physics and Chemistry, Ch. 3](https://doi.org/10.1016/C2009-0-15511-8)
> - [Risken, The Fokker–Planck Equation, 2nd ed.](https://doi.org/10.1007/978-3-642-05182-6)

<details><summary>Example problem</summary>

A two-state system has rates $`W_{01} = 2\,\text{s}^{-1}` and $`W_{10} = 1\,\text{s}^{-1}`. Starting from $`P_0(0) = 1`, find $`P_0(t)` and the equilibrium probability.

<details><summary>Solution</summary>

$`P_0^{\text{eq}} = W_{10}/(W_{01}+W_{10}) = 1/3`. The relaxation rate is $`W_{01}+W_{10} = 3\,\text{s}^{-1}`.

```math
P_0(t) = \frac{1}{3} + \frac{2}{3}\,e^{-3t}
```

At $`t = 1\,\text{s}`: $`P_0(1) = \frac{1}{3} + \frac{2}{3}e^{-3} \approx 0.34`.
</details>
</details>
</details>

## Linear response and Kubo formula

For a small perturbation $`h(t)` coupled to an observable $`B`, the response of observable $`A` is

```math
\langle A(t) \rangle - \langle A \rangle_{\text{eq}} = \int_{-\infty}^{t} \chi_{AB}(t-t')\, h(t')\, dt'
```

where the **response function** (Kubo formula) is

```math
\chi_{AB}(t) = \frac{i}{\hbar} \langle [A(t), B(0)] \rangle_{\text{eq}}
```

The **fluctuation–dissipation theorem (FDT)** in its classical form connects the response to equilibrium correlations:

```math
\chi_{AB}(\omega) = \frac{1}{2k_B T}\, S_{AB}(\omega)
```

where $`S_{AB}(\omega)` is the symmetrized spectral density $`S_{AB}(\omega) = \int_{-\infty}^{\infty} dt\, e^{i\omega t}\, \tfrac{1}{2}\langle\{A(t),B(0)\}\rangle_{\text{eq}}`. The quantum generalization replaces the prefactor with $`\tanh(\beta\hbar\omega/2)/(2\hbar)` (see Details).

**FDT breakdown with driving strength:**

<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" style="max-width:420px;">
  <rect x="0" y="0" width="420" height="220" fill="#fafafa"/>
  <line x1="50" y1="180" x2="390" y2="180" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="180" x2="50" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="220" y="210" text-anchor="middle" font-size="12">Driving strength h</text>
  <text x="20" y="100" text-anchor="middle" font-size="12" transform="rotate(-90,20,100)">Response / h</text>
  <line x1="50" y1="180" x2="200" y2="80" stroke="#1565c0" stroke-width="2.5"/>
  <text x="120" y="110" font-size="11" fill="#1565c0">Linear (FDT holds)</text>
  <path d="M200,80 Q280,50 390,40" fill="none" stroke="#c62828" stroke-width="2.5" stroke-dasharray="6,3"/>
  <text x="300" y="55" font-size="11" fill="#c62828">Nonlinear (FDT breaks)</text>
  <line x1="200" y1="180" x2="200" y2="75" stroke="#666" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="200" y="195" text-anchor="middle" font-size="10">h*</text>
</svg>

<details><summary>Details</summary>

**Step 1: What the FDT says.**

The FDT states that the linear response of a system at equilibrium to a small perturbation is completely determined by the equilibrium fluctuations of the same observable. In the classical limit, the susceptibility (response) is proportional to the symmetrized correlation function:

```math
\chi_{AB}(\omega) = \frac{1}{2k_B T}\, S_{AB}(\omega)
```

This is the nonequilibrium generalization of the equilibrium fluctuation relations: $`\operatorname{Var}(E) = k_B T^2 C_V` (canonical) and $`\operatorname{Var}(N) = k_B T\, \partial_\mu \langle N\rangle` (grand canonical). See [Statistical Foundations of Thermodynamics](../Thermodynamics/Statistical-Foundations-of-Thermodynamics.md).

**Step 2: Worked example — magnetization in a field.**

Consider $`N` non-interacting spins in a magnetic field $`B(t)`. The observable is the magnetization $`M = \sum_i \mu \sigma_i`. The perturbation is $`h(t) = B(t)`.

- Equilibrium: $`\langle M \rangle_{\text{eq}} = N\mu\tanh(\beta\mu B_0)`.
- Susceptibility: $`\chi_{MM} = \partial\langle M\rangle/\partial B = N\mu^2\beta\,\text{sech}^2(\beta\mu B_0)`.
- Equilibrium correlation: $`S_{MM}(\omega=0) = \langle M^2\rangle - \langle M\rangle^2 = N\mu^2\,\text{sech}^2(\beta\mu B_0)`.
- FDT check: $`\chi_{MM} = S_{MM}(0)/(k_B T)` ✓.

**Step 3: Quantum generalization.**

In the quantum case, the FDT takes the form

```math
\chi_{AB}(\omega) = \frac{1}{2\hbar}\bigl[1 - e^{-\beta\hbar\omega}\bigr]\, S_{AB}(\omega) = \frac{\tanh(\beta\hbar\omega/2)}{2\hbar}\, S_{AB}(\omega)
```

where $`S_{AB}(\omega)` is the symmetrized spectral density. In the classical limit $`\hbar\omega \ll k_B T`, $`\tanh(\beta\hbar\omega/2) \approx \beta\hbar\omega/2`, giving $`\chi_{AB}(\omega) \approx \omega/(2k_B T)\, S_{AB}(\omega)`, which is consistent with the classical FDT up to the conventional factor of $`\omega` relating the one-sided and two-sided spectra.

**Step 4: When the FDT breaks down.**

The FDT holds only for **linear** response (small $`h`). Far from equilibrium, the response is nonlinear: higher-order response functions $`\chi^{(2)}, \chi^{(3)}, \ldots` appear, and the simple proportionality between response and correlation no longer holds. The diagram above illustrates this: for $`h < h^*` the response is linear (FDT valid); for $`h > h^*` it saturates or becomes nonlinear (FDT invalid).

> **Authoritative sources**
> - [Kubo, JPSJ 12, 570 (1957)](https://doi.org/10.1143/JPSJ.12.570)
> - [Callen & Welton, Phys. Rev. 83, 34 (1951)](https://doi.org/10.1103/PhysRev.83.34)

<details><summary>Example problem</summary>

A paramagnetic salt with $`N = 10^{20}` spins of moment $`\mu = 10^{-23}\,\text{J/T}` is in a field $`B_0 = 0.1\,\text{T}` at $`T = 300\,\text{K}`. Compute the static susceptibility $`\chi_{MM}` and verify the FDT.

<details><summary>Solution</summary>

Since $`\beta\mu B_0 = (10^{-23} \times 0.1)/(1.38\times10^{-23}\times 300) \approx 2.4\times10^{-4} \ll 1`, we are in the Curie-law regime:

```math
\chi_{MM} \approx \frac{N\mu^2}{k_B T} = \frac{10^{20}\times(10^{-23})^2}{1.38\times10^{-23}\times 300} \approx 2.4\times10^{-14}\,\text{J/T}
```

The equilibrium correlation at zero frequency is $`S_{MM}(0) = N\mu^2 = 10^{-26}\,\text{J}^2/\text{T}^2`.

FDT check: $`S_{MM}(0)/(k_B T) = 10^{-26}/(1.38\times10^{-23}\times 300) \approx 2.4\times10^{-14}` ✓.
</details>
</details>
</details>

## Transport coefficients

In the linear-response regime, transport is described by **Onsager reciprocal relations**:

```math
J_i = \sum_j L_{ij}\, X_j
```

where $`J_i` are fluxes (heat, particle, momentum) and $`X_j` are thermodynamic forces (gradients of $`1/T`, $`\mu/T`, velocity). The Onsager matrix $`L_{ij}` is symmetric: $`L_{ij} = L_{ji}`.

Examples:
- Fourier's law: $`\mathbf{J}_Q = -\kappa \nabla T`
- Fick's law: $`\mathbf{J}_n = -D \nabla n`
- Ohm's law: $`\mathbf{J}_e = \sigma \mathbf{E}`

<details><summary>Details</summary>

**Step 1: Derivation from time-reversal symmetry.**

The Onsager relations follow from the microscopic reversibility of the equations of motion. If the dynamics is invariant under $`t \to -t` combined with $`\mathbf{p} \to -\mathbf{p}`, then the cross-correlation of two fluxes satisfies $`L_{ij} = L_{ji}` (or $`L_{ij} = -L_{ji}` if one flux is odd under time reversal, e.g., magnetization).

**Step 2: Concrete example — thermoelectric coupling.**

In a conductor with both a temperature gradient and an electric field, the coupled transport equations are

```math
\mathbf{J}_e = \sigma\,\mathbf{E} - \sigma S\,\nabla T, \qquad \mathbf{J}_Q = \Pi\,\sigma\,\mathbf{E} - \kappa\,\nabla T
```

The Onsager symmetry requires $`S = \Pi/\sigma` (Seebeck coefficient equals Peltier coefficient divided by conductivity, up to $`T`). This is the Thomson relation.

**Step 3: Entropy production and the second law.**

The local entropy production rate is $`\sigma_s = \sum_i J_i X_i \geq 0`. For a symmetric positive-semidefinite Onsager matrix, this is automatically satisfied. Far from equilibrium, the linear relation $`J = LX` breaks down and nonlinear transport (turbulence, pattern formation) emerges. See [PhaseTransitions](./PhaseTransitions.md) for how nonequilibrium driving can induce phase transitions.

> **Authoritative sources**
> - [Onsager, Phys. Rev. 37, 405 (1931)](https://doi.org/10.1103/PhysRev.37.405)
> - [de Groot & Mazur, Non-Equilibrium Thermodynamics](https://doi.org/10.1016/S0076-5392(08)60146-X)

<details><summary>Example problem</summary>

A metal wire of length $`L = 1\,\text{cm}` has a temperature difference $`\Delta T = 1\,\text{K}` across it. The thermal conductivity is $`\kappa = 400\,\text{W/(m·K)}` and the Seebeck coefficient is $`S = 2\,\mu\text{V/K}`. Find the open-circuit voltage and the entropy production rate per unit volume.

<details><summary>Solution</summary>

Open-circuit voltage (no current): $`V = S\,\Delta T = 2\times10^{-6}\times 1 = 2\,\mu\text{V}`.

Entropy production per unit volume: $`\sigma_s = \kappa(\nabla T)^2/T^2 = 400\times(100)^2/300^2 \approx 4.4\,\text{W/(m}^3\text{·K)}`.
</details>
</details>
</details>

## Entropy production and the second law

The **entropy production rate** is the central organizing principle of nonequilibrium thermodynamics:

```math
\sigma_s = \sum_i J_i\, X_i \geq 0
```

Near equilibrium, the **minimum entropy production principle** (Prigogine) states that a system with fixed boundary conditions relaxes to the steady state that minimizes $`\sigma_s`. Far from equilibrium, the second law emerges as an inequality from the Jarzynski equality via Jensen's inequality.

<details><summary>Details</summary>

**Step 1: Local entropy balance.**

For a continuum, the entropy density $`s(\mathbf{r},t)` obeys

```math
\frac{\partial s}{\partial t} = -\nabla \cdot \mathbf{J}_s + \sigma_s
```

where $`\mathbf{J}_s` is the entropy flux and $`\sigma_s \geq 0` is the local entropy production rate. In the linear regime, $`\sigma_s = \sum_i J_i X_i` with fluxes and forces as in the Onsager section. The second law ($`\sigma_s \geq 0`) is a local statement: entropy is produced at every point, not just on average.

**Step 2: Minimum entropy production (Prigogine, 1945).**

For a system near equilibrium with fixed boundary conditions (e.g., fixed temperature difference across a slab), the steady state minimizes the total entropy production. Example: in a 1D slab with fixed $`T_1, T_2`, the steady-state temperature profile is linear, and any deviation increases $`\int \sigma_s\, dV`. This principle does **not** hold far from equilibrium.

**Step 3: Second law from the Jarzynski equality.**

The Jarzynski equality $`\langle e^{-\beta W_d}\rangle = e^{-\beta\Delta F}` is an exact identity. Applying Jensen's inequality to the convex function $`e^{-x}`:

```math
\langle W_d \rangle \geq -\frac{1}{\beta}\ln\langle e^{-\beta W_d}\rangle = \Delta F
```

This recovers the second law $`\langle W_d\rangle \geq \Delta F` as a consequence of an exact equality. The equality holds only for reversible (quasistatic) processes; any irreversibility makes the inequality strict. This connects the macroscopic second law to the microscopic fluctuation theorems below.

> **Authoritative sources**
> - [Prigogine, Introduction to Thermodynamics of Irreversible Processes](https://doi.org/10.1002/andp.19455310103)
> - [Jarzynski, PRL 78, 2690 (1997)](https://doi.org/10.1103/PhysRevLett.78.2690)

<details><summary>Example problem</summary>

A system is driven from state A to state B with $`\Delta F = 5\,k_B T`. In $`10^6` independent trials, the average work is $`\langle W_d\rangle = 7\,k_B T`. Compute the average entropy production in units of $`k_B` and verify it is consistent with the second law.

<details><summary>Solution</summary>

Average entropy production: $`\langle \Sigma\rangle = \beta(\langle W_d\rangle - \Delta F) = (7-5) = 2\,k_B`.

Since $`\langle\Sigma\rangle = 2\,k_B > 0`, the second law is satisfied. The irreversibility is moderate: the process is far from reversible (which would give $`\langle\Sigma\rangle = 0`).
</details>
</details>
</details>

## Fluctuation theorems

Far from equilibrium, the **Jarzynski equality** and **Crooks fluctuation theorem** generalize the second law:

```math
\langle e^{-\beta W_d} \rangle = e^{-\beta \Delta F}
```

```math
\frac{P_F(W)}{P_R(-W)} = e^{\beta(W - \Delta F)}
```

where $`W_d` is the work done in a nonequilibrium process and $`\Delta F` is the free-energy difference. These hold for **any** driving protocol, not just linear response.

<details><summary>Details</summary>

**Step 1: The Jarzynski equality as an exact identity.**

The Jarzynski equality is not an approximation: it holds for arbitrary driving protocols, arbitrary initial equilibrium states, and arbitrary system size. It reduces to the second law by Jensen's inequality (see the Entropy production section above). The equality encodes the full statistics of work, not just the mean.

**Step 2: The Crooks theorem and time-reversal.**

The Crooks fluctuation theorem relates the probability $`P_F(W)` of observing work $`W` in a forward protocol to the probability $`P_R(-W)` of observing work $`-W` in the time-reversed protocol. The ratio is fixed by the free-energy difference. In the limit of large systems or long times, the ratio becomes sharply peaked and the second law emerges as a statement about typical trajectories.

**Step 3: Experimental verification.**

These theorems have been verified in single-molecule pulling experiments (RNA unfolding, DNA stretching) and in colloidal particles in optical traps. In the RNA experiments, the work distribution for unfolding and refolding shows the predicted exponential ratio, and the Jarzynski equality correctly extracts the free-energy difference even for fast, far-from-equilibrium pulling.

**Step 4: Connection to equilibrium.**

In the quasistatic limit (infinitely slow driving), $`W_d \to \Delta F` with zero variance, and both the Jarzynski equality and Crooks theorem reduce to the equilibrium statement $`\Delta F = W_{\text{rev}}`. See [MicrocanonicalEnsemble](./MicrocanonicalEnsemble.md) for the isolated-system limit where work is the only energy exchange.

> **Authoritative sources**
> - [Jarzynski, PRL 78, 2690 (1997)](https://doi.org/10.1103/PhysRevLett.78.2690)
> - [Crooks, PRE 60, 2721 (1999)](https://doi.org/10.1103/PhysRevE.60.2721)
> - [Collin, Ritter, Berry, Levental, Austin, Liphardt, Crooks, Nature 437, 23 (2005)](https://doi.org/10.1038/nature04091)

<details><summary>Example problem</summary>

A two-level system with gap $`\varepsilon` is driven by suddenly changing the gap from $`\varepsilon_0` to $`\varepsilon_1`. The initial state is thermal at temperature $`T`. Compute the work distribution and verify the Jarzynski equality.

<details><summary>Solution</summary>

The Hamiltonian is $`H = \varepsilon|1\rangle\langle 1|`. The work is $`W = \langle n|H_1 - H_0|n\rangle`. If the system is in state $`|0\rangle`: $`W = 0`. If in $`|1\rangle`: $`W = \varepsilon_1 - \varepsilon_0`.

The initial probability of the excited state is $`p = e^{-\beta\varepsilon_0}/(1+e^{-\beta\varepsilon_0})`.

```math
\langle e^{-\beta W}\rangle = (1-p)\cdot 1 + p\cdot e^{-\beta(\varepsilon_1-\varepsilon_0)} = \frac{1 + e^{-\beta\varepsilon_1}}{1+e^{-\beta\varepsilon_0}} = e^{-\beta\Delta F}
```

where $`\Delta F = -k_B T\ln[(1+e^{-\beta\varepsilon_1})/(1+e^{-\beta\varepsilon_0})]`. ✓
</details>
</details>
</details>

## Quizz

A particle of mass $`m` in a viscous medium at temperature $`T` is subject to a constant force $`F`. Show that in the overdamped limit the mean velocity is $`F/\gamma` and the diffusion coefficient is $`k_B T/\gamma`.

<details><summary>Solution</summary>

Start from the Langevin equation:

```math
m\ddot{x} = -\gamma\dot{x} + F + \xi(t), \qquad \langle\xi(t)\xi(t')\rangle = 2\gamma k_B T\,\delta(t-t')
```

**Step 1: Overdamped limit.**

In the limit $`m \to 0` (or equivalently $`t \gg m/\gamma`), the inertial term vanishes and the equation becomes

```math
\dot{x} = \frac{F}{\gamma} + \eta(t)
```

where $`\eta(t)` is a white noise with $`\langle\eta(t)\eta(t')\rangle = 2D\,\delta(t-t')` and $`D = k_B T/\gamma`.

**Step 2: Mean velocity.**

Taking the ensemble average: $`\langle\dot{x}\rangle = F/\gamma + \langle\eta\rangle = F/\gamma`. The particle drifts at the force divided by friction.

**Step 3: Diffusion coefficient (Einstein relation).**

The mean-squared displacement is

```math
\langle [x(t)-x(0)]^2 \rangle = \frac{F^2}{\gamma^2}t^2 + 2Dt
```

For $`F = 0` (pure diffusion): $`\langle\Delta x^2\rangle = 2Dt`, giving $`D = k_B T/\gamma`.

**Step 4: Connection to the FDT.**

The Einstein relation $`D = \mu_{\text{mob}}\, k_B T` (where $`\mu_{\text{mob}} = 1/\gamma` is the mobility) is a direct consequence of the fluctuation–dissipation theorem: the same friction $`\gamma` that causes dissipation (the drift term) also sets the noise amplitude (the diffusion term). This is the simplest physical manifestation of the FDT.
</details>