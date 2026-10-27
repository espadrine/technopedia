# Quantum Dynamics

Quantum dynamics describes how a quantum state evolves in time. It is relevant whenever you need to predict the time-dependence of a system: the oscillation of a qubit in a magnetic field, the scattering of two particles, the tunneling of an electron through a barrier, or the propagation of a wave packet. The dynamics is governed by the Hamiltonian, which encodes the interactions (see [Interactions](../Interactions/Readme.md)).

## The Schrödinger equation

**Definition.** The state $`|\psi(t)\rangle` evolves according to $`i\hbar\,\partial_t |\psi(t)\rangle = \hat{H}|\psi(t)\rangle`, where $`\hat{H}` is the Hamiltonian operator. The formal solution is $`|\psi(t)\rangle = \hat{U}(t,t_0)|\psi(t_0)\rangle` with $`\hat{U}(t,t_0) = \mathcal{T}\exp\left(-\frac{i}{\hbar}\int_{t_0}^{t}\hat{H}(t')\,dt'\right)`. For a time-independent Hamiltonian: $`\hat{U}(t) = e^{-i\hat{H}t/\hbar}`.

<details><summary>Details</summary>

### From the classical Hamiltonian to the quantum one

In [classical mechanics](../Mechanics/Readme.md), the state evolves via Hamilton's equations: $`\dot{q} = \partial H/\partial p`, $`\dot{p} = -\partial H/\partial q`. In quantum mechanics, the state is a vector in Hilbert space (see [Quantum states](./Quantum-States.md)) and evolves via the Schrödinger equation. The classical Hamiltonian function $`H(q,p)` becomes an operator $`\hat{H}` by the correspondence $`q \to \hat{q}`, $`p \to \hat{p} = -i\hbar\,\partial/\partial x`.

**Step 1: Time-independent case.**

If $`\hat{H}` does not depend on time, the evolution operator is $`\hat{U}(t) = e^{-i\hat{H}t/\hbar}`. If the initial state is an energy eigenstate $`\hat{H}|n\rangle = E_n|n\rangle`, then $`|\psi(t)\rangle = e^{-iE_n t/\hbar}|n\rangle` — the state picks up only a global phase, and all measurable probabilities are constant. Superpositions of energy eigenstates, however, oscillate: $`|\psi(t)\rangle = c_1 e^{-iE_1 t/\hbar}|1\rangle + c_2 e^{-iE_2 t/\hbar}|2\rangle` has a time-dependent relative phase $`e^{-i(E_2-E_1)t/\hbar}` that produces oscillating probabilities.

**Step 2: Time-dependent case.**

When $`\hat{H}` depends on time (e.g., a time-varying electromagnetic field), the evolution operator involves a time-ordering $`\mathcal{T}`. There is no simple exponential form, and one must use perturbation theory or numerical methods.

**Example: a two-level system in a resonant field.**

A qubit with energy splitting $`\hbar\omega_0` is driven by an oscillating field of frequency $`\omega \approx \omega_0`. In the rotating-wave approximation, the effective Hamiltonian in the interaction picture is $`\hat{H}_{\text{eff}} = \frac{\hbar}{2}\begin{pmatrix} \Delta & \Omega \\ \Omega & -\Delta \end{pmatrix}` where $`\Delta = \omega - \omega_0` is the detuning and $`\Omega` is the Rabi frequency. Starting in $`|0\rangle`, the probability of finding the system in $`|1\rangle` oscillates as $`P_1(t) = \frac{\Omega^2}{\Omega^2 + \Delta^2}\sin^2\left(\frac{\sqrt{\Omega^2+\Delta^2}\,t}{2}\right)`. At resonance ($`\Delta = 0`), full population transfer occurs at $`t = \pi/\Omega` (a $`\pi`-pulse).

<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="120" x2="380" y2="120" stroke="#333" stroke-width="1"/>
  <line x1="40" y1="20" x2="40" y2="120" stroke="#333" stroke-width="1"/>
  <text x="10" y="70" font-size="11" transform="rotate(-90,10,70)">P₁(t)</text>
  <text x="200" y="140" font-size="11">t</text>
  <path d="M 40 120 Q 80 20, 120 120 Q 160 20, 200 120 Q 240 20, 280 120 Q 320 20, 360 120" fill="none" stroke="blue" stroke-width="2"/>
  <text x="70" y="50" font-size="10" fill="blue">Rabi oscillations (resonant drive)</text>
  <line x1="120" y1="120" x2="120" y2="20" stroke="red" stroke-width="1" stroke-dasharray="3"/>
  <text x="125" y="35" font-size="10" fill="red">π-pulse: full transfer</text>
</svg>

**Example problem.**

<details><summary>Problem</summary>

A spin-½ particle in a uniform magnetic field $`\mathbf{B} = B_0\hat{z}` has Hamiltonian $`\hat{H} = -\gamma B_0 \hat{S}_z = -\frac{\hbar\omega_0}{2}\sigma_z` where $`\omega_0 = \gamma B_0`. If the initial state is $`|\uparrow_x\rangle = (|\uparrow_z\rangle + |\downarrow_z\rangle)/\sqrt{2}`, find $`|\psi(t)\rangle` and the probability of measuring $`S_z = +\hbar/2`.

<details><summary>Solution</summary>

$`|\psi(t)\rangle = e^{-i\hat{H}t/\hbar}|\uparrow_x\rangle = e^{i\omega_0 t\sigma_z/2}\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} e^{i\omega_0 t/2} \\ e^{-i\omega_0 t/2} \end{pmatrix}`

$`P(\uparrow_z) = |\langle\uparrow_z|\psi(t)\rangle|^2 = \frac{1}{2}|e^{i\omega_0 t/2}|^2 = \frac{1}{2}`

The probability is constant at 1/2 — the spin precesses around z at frequency $`\omega_0`, but the z-component remains equally likely to be up or down. However, $`\langle S_x\rangle(t) = \frac{\hbar}{2}\cos(\omega_0 t)` oscillates, showing the precession.

</details>
</details>

</details>

## Time-dependent perturbation theory

**Definition.** For $`\hat{H} = \hat{H}_0 + \hat{V}(t)`, the transition amplitude from state $`|i\rangle` to state $`|f\rangle` (first order) is $`c_f^{(1)}(t) = -\frac{i}{\hbar}\int_{t_0}^{t}\langle f|\hat{V}(t')|i\rangle\,e^{i\omega_{fi}t'}\,dt'` where $`\omega_{fi} = (E_f - E_i)/\hbar`. Fermi's golden rule gives the transition rate: $`\Gamma_{i\to f} = \frac{2\pi}{\hbar}|\langle f|\hat{V}|i\rangle|^2\rho(E_f)`."

<details><summary>Details</summary>

### When the Hamiltonian changes slowly

Many physical situations involve a small time-dependent perturbation: an atom in a weak electromagnetic wave, a particle encountering a short potential barrier, a qubit subjected to a control pulse. Exact solutions are rare; perturbation theory expands in powers of $`\hat{V}`.

**Step 1: First-order amplitude.**

Assume the system starts in an eigenstate $`|i\rangle` of $`\hat{H}_0` at $`t = -\infty`. The first-order correction to the amplitude of finding it in state $`|f\rangle` at time $`t` is an integral of the matrix element of $`\hat{V}` weighted by the phase factor $`e^{i\omega_{fi}t'}`. The integral is large when $`\omega_{fi} \approx 0` (energy conservation) — this is the resonance condition.

**Step 2: Fermi's golden rule.**

For a perturbation that is on for a long time $`T`, the transition probability grows as $`T^2\,\text{sinc}^2(\omega_{fi}T/2)`. The rate (probability per unit time) in the limit $`T \to \infty` becomes proportional to $`2\pi\delta(E_f - E_i)`, which for a continuum of final states gives the density of states $`\rho(E_f)`. This is Fermi's golden rule.

**Example: spontaneous emission.**

An excited atom coupled to the electromagnetic vacuum (a time-dependent perturbation from the quantized field) decays with rate $`\Gamma = \frac{\omega_0^3|\mathbf{d}|^2}{3\pi\epsilon_0\hbar c^3}` where $`\mathbf{d}` is the dipole matrix element. This is a first-order process in the field coupling.

**Example problem.**

<details><summary>Problem</summary>

A particle in a 1D infinite well of width $`a` is in the ground state $`\psi_1(x) = \sqrt{2/a}\sin(\pi x/a)`. A time-dependent perturbation $`\hat{V}(t) = V_0 x\,e^{-t^2/\tau^2}` is applied. Write the first-order amplitude for transition to the first excited state $`\psi_2(x) = \sqrt{2/a}\sin(2\pi x/a)`.

<details><summary>Solution</summary>

The matrix element is:

$`\langle 2|x|1\rangle = \frac{2}{a}\int_0^a \sin(2\pi x/a)\,x\,\sin(\pi x/a)\,dx`

Using $`\sin A\sin B = \frac{1}{2}[\cos(A-B) - \cos(A+B)]`:

$`= \frac{1}{a}\int_0^a x[\cos(\pi x/a) - \cos(3\pi x/a)]\,dx`

$`= \frac{1}{a}\left[\frac{a^2}{\pi}\sin(\pi x/a)\bigg|_0^a - \frac{a^2}{3\pi}\sin(3\pi x/a)\bigg|_0^a + \frac{a}{\pi}\bigg(\frac{1}{\pi} - \frac{1}{3\pi}\bigg)\right]`

Actually, evaluating $`\int_0^a x\cos(n\pi x/a)\,dx = \frac{a}{n\pi}\sin(n\pi) - \frac{a^2}{n^2\pi^2}[\cos(n\pi)-1] = \frac{a^2}{n^2\pi^2}(1-\cos(n\pi))`:

For $`n=1`: $`\frac{a^2}{\pi^2}\cdot 2 = 2a^2/\pi^2`
For $`n=3`: $`\frac{a^2}{9\pi^2}\cdot 2 = 2a^2/(9\pi^2)`

$`\langle 2|x|1\rangle = \frac{1}{a}\left(\frac{2a^2}{\pi^2} - \frac{2a^2}{9\pi^2}\right) = \frac{2a}{\pi^2}\cdot\frac{8}{9} = \frac{16a}{9\pi^2}`

The first-order amplitude is:

$`c_2^{(1)}(t) = -\frac{iV_0}{\hbar}\cdot\frac{16a}{9\pi^2}\int_{-\infty}^{t} e^{-t'^2/\tau^2}\,e^{i\omega_{21}t'}\,dt'`

where $`\omega_{21} = (E_2-E_1)/\hbar = 3\pi^2\hbar/(2ma^2)`. For $`\tau \gg 1/\omega_{21}` (slow perturbation), the transition is suppressed by energy non-conservation.

</details>
</details>

</details>

## Scattering theory

**Definition.** Scattering describes the asymptotic behavior of a wave packet that approaches, interacts with, and recedes from a potential. The S-matrix $`\hat{S}` maps incoming to outgoing states: $`|\psi_{\text{out}}\rangle = \hat{S}|\psi_{\text{in}}\rangle`. The differential cross-section is $`d\sigma/d\Omega = |f(\theta,\phi)|^2` where $`f` is the scattering amplitude.

<details><summary>Details</summary>

### From wave packets to plane waves

A scattering experiment sends a particle toward a target and measures where it ends up. Quantum mechanically, the incoming state is a wave packet (or, in the idealized limit, a plane wave). The outgoing state consists of an undistorted forward component plus a spherical outgoing wave $`f(\theta,\phi)\,e^{ikr}/r`.

**Step 1: The scattering amplitude.**

For a spherically symmetric potential $`V(r)`, the scattering amplitude in the partial-wave expansion is:

$`f(\theta) = \frac{1}{k}\sum_{\ell=0}^{\infty}(2\ell+1)e^{i\delta_\ell}\sin\delta_\ell\,P_\ell(\cos\theta)`

where $`\delta_\ell` are the phase shifts and $`P_\ell` are Legendre polynomials. Each partial wave $`\ell` contributes a term weighted by $`(2\ell+1)` and the phase shift $`\delta_\ell`.

**Step 2: Low-energy (s-wave) scattering.**

At low energies, only $`\ell = 0` contributes. The cross-section becomes isotropic: $`\sigma = 4\pi a^2` where $`a = -\tan\delta_0/k` is the scattering length. This single parameter characterizes low-energy scattering and is central to ultracold atom physics and neutron scattering.

**Connection to the Standard Model.**

In relativistic quantum field theory (see [Quantum field theory](./Quantum-Field-Theory.md)), scattering is described by Feynman diagrams and the S-matrix elements are computed from loop integrals. The non-relativistic scattering theory above is the low-energy limit of the full QFT calculation.

**Example problem.**

<details><summary>Problem</summary>

A neutron of wavelength $`\lambda = 1` Å scatters from a small spherical potential well of depth $`V_0 = 100` meV and radius $`R = 1` Å. In the s-wave approximation, estimate the scattering length if $`kR \ll 1`.

<details><summary>Solution</summary>

$`k = 2\pi/\lambda = 2\pi/10^{-10} = 6.28\times10^{10}` m⁻¹. $`kR = 6.28\times10^{10}\times10^{-10} = 6.28`. This is not $`\ll 1`, so the s-wave approximation is marginal. For a true low-energy estimate, we would need $`\lambda \gg R`.

For a hard sphere of radius $`R` (infinite potential), $`a = R` and $`\sigma = 4\pi R^2 = 4\pi(10^{-10})^2 \approx 1.3\times10^{-19}` m² = 130 barns.

For a finite well, the scattering length depends on the bound-state condition: if the well supports a virtual state near zero energy, $`a` can be much larger than $`R` (resonant scattering).

</details>
</details>

</details>

## Path integrals

**Definition.** The path integral (Feynman) formulation expresses the propagator as a sum over all paths: $`K(x_f,t_f;x_i,t_i) = \int\mathcal{D}[x(t)]\,\exp\left(\frac{i}{\hbar}\int_{t_i}^{t_f}L(x,\dot{x})\,dt\right)`. Each path contributes a phase proportional to the classical action. In the limit $`\hbar \to 0` (or large action), the path of stationary action (the classical trajectory) dominates — this is the correspondence principle.

<details><summary>Details</summary>

### A third formulation of quantum mechanics

Alongside matrix mechanics (Heisenberg) and wave mechanics (Schrödinger), the path integral (Feynman, 1948) provides a conceptually distinct formulation. Instead of evolving a state vector, one sums over all possible histories weighted by $`e^{iS/\hbar}`.

**Step 1: The propagator as a sum over paths.**

The amplitude for a particle to go from $`(x_i, t_i)` to $`(x_f, t_f)` is:

$`K = \lim_{N\to\infty}\left(\frac{m}{2\pi i\hbar\epsilon}\right)^{N/2}\int\prod_{n=1}^{N-1}dx_n\,\exp\left[\frac{i}{\hbar}\sum_{n=0}^{N-1}\left(\frac{m(x_{n+1}-x_n)^2}{2\epsilon} - \epsilon V(x_n)\right)\right]`

where $`\epsilon = (t_f-t_i)/N`. Each term in the sum is the Lagrangian evaluated along a discrete path.

**Step 2: The classical limit.**

When the action $`S \gg \hbar`, paths near the classical trajectory (where $`\delta S = 0`) contribute constructively (their phases align), while paths far from the classical one cancel by destructive interference. The result is that the particle follows the classical trajectory — the correspondence principle connecting to [Mechanics](../Mechanics/Readme.md).

**Step 3: Why path integrals matter beyond computation.**

Path integrals are not merely a calculational tool for QFT. They provide:
- A natural framework for quantum gravity (sum over geometries).
- A direct connection between quantum and statistical mechanics (Wick rotation $`t \to -i\hbar\beta` turns the path integral into a partition function; see [Thermodynamics](../Thermodynamics/Readme.md)).
- A geometric picture of quantum interference (the double-slit experiment is a sum over paths through both slits).

**Example: the free-particle propagator.**

For $`V = 0`, the path integral can be evaluated exactly. The result is:

$`K(x_f,t_f;x_i,t_i) = \sqrt{\frac{m}{2\pi i\hbar(t_f-t_i)}}\exp\left[\frac{im(x_f-x_i)^2}{2\hbar(t_f-t_i)}\right]`

This is a Gaussian in $`(x_f - x_i)` with a complex phase — the quantum analogue of the classical free-particle trajectory.

**Example problem.**

<details><summary>Problem</summary>

Using the path integral, show that for a free particle, the propagator at $`t_f - t_i = T` satisfies the composition law $`K(x_f,T_1+T_2;x_i) = \int dx\,K(x_f,T_1;x)\,K(x,T_2;x_i)`.

<details><summary>Solution</summary>

$`\int dx\,\sqrt{\frac{m}{2\pi i\hbar T_1}}\sqrt{\frac{m}{2\pi i\hbar T_2}}\exp\left[\frac{im}{2\hbar}\left(\frac{(x_f-x)^2}{T_1}+\frac{(x-x_i)^2}{T_2}\right)\right]`

Complete the square in the exponent. The coefficient of $`x^2` is $`-im/(2\hbar)(1/T_1+1/T_2) = -im/(2\hbar)\cdot(T_1+T_2)/(T_1T_2)`. The linear term gives the shift. After Gaussian integration, the result is:

$`\sqrt{\frac{m}{2\pi i\hbar(T_1+T_2)}}\exp\left[\frac{im(x_f-x_i)^2}{2\hbar(T_1+T_2)}\right] = K(x_f,T_1+T_2;x_i)`

The composition law is satisfied. ✓

</details>
</details>

</details>

## Quiz

<details><summary>Test your understanding</summary>

**Problem.** A qubit with Hamiltonian $`\hat{H} = \frac{\hbar\omega}{2}\sigma_z` is initially in state $`|0\rangle = |\uparrow_z\rangle`. At time $`t = 0`, a sudden perturbation $`\hat{V} = \hbar\Omega\,\sigma_x` is applied for a duration $`\tau = \pi/(2\Omega)` (a $`\pi/2`-pulse). Find the state after the pulse (to first order in $`\Omega/\omega`, assuming $`\Omega \ll \omega`).

<details><summary>Solution</summary>

During the pulse, the total Hamiltonian is $`\hat{H} + \hat{V} = \frac{\hbar\omega}{2}\sigma_z + \hbar\Omega\sigma_x`. To first order in $`\Omega/\omega`, the dominant evolution is from $`\hat{H}`: $`|\psi(t)\rangle \approx e^{-i\omega t/2}|0\rangle`. The perturbation gives a first-order correction:

$`|\psi(\tau)\rangle \approx e^{-i\omega\tau/2}\left[|0\rangle - i\Omega\int_0^\tau dt\,e^{i\omega t}\sigma_x|0\rangle\right]`

$`\sigma_x|0\rangle = |1\rangle`, so:

$`|\psi(\tau)\rangle \approx e^{-i\omega\tau/2}\left[|0\rangle - i\Omega\,e^{i\omega\tau/2}\frac{e^{i\omega\tau}-1}{i\omega}|1\rangle\right]`

For $`\Omega \ll \omega` and $`\tau = \pi/(2\Omega)`, the integral $`\int_0^\tau e^{i\omega t}dt = (e^{i\omega\tau}-1)/(i\omega) \approx -1/(i\omega)` (since $`\omega\tau \gg 1` and the oscillatory integral is small). So the correction is of order $`\Omega/\omega \ll 1`.

To leading order, the state remains approximately $`|0\rangle` (up to a phase). The $`\pi/2`-pulse would fully transfer population only if $`\omega \approx 0` (resonant drive) — here the large detuning $`\omega \gg \Omega` suppresses the transition. This illustrates the importance of the resonance condition in time-dependent perturbation theory.

</details>
</details>

> **Authoritative sources**
> - [Schrödinger, *Quantisierung als Eigenwertproblem* (Ann. Phys. 384, 1926)](https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation)
> - [Feynman & Hibbs, *Quantum Mechanics and Path Integrals* (1965)](https://en.wikipedia.org/wiki/Feynman%E2%80%93Hibbs_book)