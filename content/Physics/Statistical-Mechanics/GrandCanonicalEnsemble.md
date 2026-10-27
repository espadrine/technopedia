# Grand Canonical Ensemble

The grand canonical ensemble is the probability measure for a system that exchanges **both energy and particles** with a reservoir. Temperature $`T` and chemical potential $`\mu` are fixed; the energy $`E` and particle number $`N` are random. It is the right tool whenever the particle count is not conserved in the subsystem you care about: an open gas, the electron gas in a metal, a superfluid or superconductor, a reacting mixture, a blackbody cavity, or the occupation of a single quantum state.

Use it when (a) the system is open to particles, or (b) you want the *average* occupation of a state without committing to a total $`N`. It is the natural home for Fermi–Dirac and Bose–Einstein statistics.

> **Authoritative sources**
> - [Wikipedia: Grand canonical ensemble](https://en.wikipedia.org/wiki/Grand_canonical_ensemble)
> - [Chemistry LibreTexts: The Grand Canonical Ensemble](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Advanced_Statistical_Mechanics_(Tuckerman)/06%3A_The_Grand_Canonical_Ensemble)

## Probability weight

Each microstate $`(E, N)` of the system (volume $`V` fixed) has probability

```math
P(E, N) = \frac{1}{\Xi}\, e^{\beta(\mu N - E)}, \qquad \beta = \frac{1}{k_B T}
```

This is the *generalized Boltzmann factor*: the canonical factor $`e^{-\beta E}` multiplied by $`e^{\beta \mu N}`. The $`\mu N` term makes adding particles favorable when $`\mu` is high. For $`s` independent species, $`\mu N` becomes $`\sum_{i=1}^{s} \mu_i N_i`.

<details><summary>Details</summary>

The weight is derived by cutting a small system out of a large isolated (microcanonical) reservoir. The reservoir has $`N_{\text{tot}}` particles and energy $`E_{\text{tot}}`; giving the system $`(E,N)` leaves the reservoir $`(E_{\text{tot}}-E, N_{\text{tot}}-N)`. The probability is proportional to the reservoir's entropy, expanded to first order:

```math
P(E,N) \propto \exp\!\left[\frac{S_{\text{res}}(E_{\text{tot}}-E,\,N_{\text{tot}}-N)}{k_B}\right]
```

Using $`(\partial S/\partial E)_{N}=\beta` and $`(\partial S/\partial N)_{E}=\beta\mu` for the reservoir and dropping the constant $`S_{\text{res}}(E_{\text{tot}},N_{\text{tot}})` gives exactly $`e^{\beta(\mu N - E)}`. The chemical potential is defined by the reservoir's entropy slope:

```math
\mu \equiv \left(\frac{\partial F}{\partial N}\right)_{T,V}
```

so it is the free-energy *cost* of adding one particle. This is the same construction that turns the microcanonical ensemble into the canonical one, with particle exchange added on top. See [MicrocanonicalEnsemble](./MicrocanonicalEnsemble.md) and [CanonicalEnsemble](./CanonicalEnsemble.md).
</details>

## Grand partition function

The normalization constant is the **grand partition function** $`\Xi` (also written $`\mathcal{Z}` or $`Z`):

```math
\Xi(T,\mu,V) = \sum_{N=0}^{\infty} \sum_{\text{states }\alpha} e^{\beta(\mu N - E_{\alpha,N})}
```

For non-interacting particles in single-particle levels $`\varepsilon_i` it **factorizes** over levels, which is what makes the grand ensemble so powerful:

```math
\Xi = \prod_i \Xi_i, \qquad \Xi_i = \begin{cases} 1 + e^{\beta(\mu-\varepsilon_i)} & \text{fermion} \\[4pt] \dfrac{1}{1 - e^{\beta(\mu-\varepsilon_i)}} & \text{boson} \\[4pt] \exp\!\bigl(e^{\beta(\mu-\varepsilon_i)}\bigr) & \text{classical} \end{cases}
```

Every thermodynamic quantity is a derivative of $`\ln \Xi`.

<details><summary>Details</summary>

Because $`\ln \Xi` is the log-sum-exp of all weights, it is the single object that plays the role of the canonical partition function. The factorization is the key: an ideal gas of $`M` independent levels has $`\Xi` as a product of $`M` one-level factors, so the mean occupation of a level is *independent* of all the others. This is why the grand ensemble turns a many-body sum into a sum of one-particle terms.

The derivative identities that follow are the workhorses of the subject:

```math
\langle N \rangle = \frac{\partial \ln \Xi}{\partial (\beta \mu)} = \frac{1}{\beta}\frac{\partial \ln \Xi}{\partial \mu}
```

```math
\langle E \rangle = -\frac{\partial \ln \Xi}{\partial \beta}
```

```math
\langle N^2 \rangle - \langle N \rangle^2 = \frac{\partial^2 \ln \Xi}{\partial (\beta \mu)^2}
```

The last line says the **variance of the particle number** is the second derivative of $`\ln \Xi` — the same pattern as the canonical ensemble, where energy variance is the second $`\beta`-derivative of $`\ln Z`.
</details>

## Grand potential

The thermodynamic potential conjugate to $`T,\mu,V` is the **grand potential** $`\Omega`:

```math
\Omega(T,\mu,V) = -k_B T \ln \Xi
```

It is the Legendre transform of the Helmholtz free energy $`F` that removes the $`N` dependence:

```math
\Omega = F - \mu N, \qquad d\Omega = -S\,dT - N\,d\mu - P\,dV
```

From $`\Omega` you read off every extensive quantity:

```math
N = -\left(\frac{\partial \Omega}{\partial \mu}\right)_{T,V}, \qquad S = -\left(\frac{\partial \Omega}{\partial T}\right)_{\mu,V}, \qquad P = -\left(\frac{\partial \Omega}{\partial V}\right)_{T,\mu}
```

<details><summary>Details</summary>

The grand potential is the free energy of a system allowed to trade particles: $`\Omega = F - \mu N`. Minimizing $`\Omega` over $`N` at fixed $`T,\mu,V` gives the most probable particle number, and in the thermodynamic limit the fluctuations vanish. See [Thermodynamic Potentials and Equilibrium](../Thermodynamics/Thermodynamic-Potentials-and-Equilibrium.md).
</details>

## Mean number and fluctuations

The ensemble average particle number and its variance are

```math
\langle N \rangle = \sum_N N\, P(N), \qquad \operatorname{Var}(N) = \langle N^2 \rangle - \langle N \rangle^2
```

For non-interacting particles these reduce to per-level sums:

```math
\langle N \rangle = \sum_i f_i, \qquad \operatorname{Var}(N) = \sum_i \begin{cases} f_i(1-f_i) & \text{fermion} \\[4pt] f_i(1+f_i) & \text{boson} \\[4pt] f_i & \text{classical} \end{cases}
```

where $`f_i` is the mean occupation of level $`i`. The **fluctuation–dissipation relation** ties the variance to a response:

```math
\operatorname{Var}(N) = k_B T \left(\frac{\partial \langle N \rangle}{\partial \mu}\right)_{T,V}
```

<details><summary>Details</summary>

The relation $`\operatorname{Var}(N) = k_B T\, \partial_\mu \langle N\rangle` says that how much $`N` jitters is the same number as how much $`N` shifts when you nudge $`\mu`. It is the grand-canonical fluctuation formula; see [Statistical Foundations of Thermodynamics](../Thermodynamics/Statistical-Foundations-of-Thermodynamics.md).

Note the three statistics give different fluctuations for the *same* mean number: fermions are anti-bunched ($`f(1-f) < f`), bosons are bunched ($`f(1+f) > f`), and classical particles are Poisson ($`\operatorname{Var}=\langle N\rangle`). This is the seed of phenomena like fermion pressure and Bose condensation. For the thermodynamic limit of these fluctuations and the onset of collective behavior, see [PhaseTransitions](./PhaseTransitions.md).
</details>

<details><summary>Ensemble equivalence</summary>

In the thermodynamic limit ($`N \to \infty`), the grand canonical and canonical ensembles give identical thermodynamic quantities. The relative particle-number fluctuation scales as $`\sqrt{\operatorname{Var}(N)}/\langle N\rangle \sim 1/\sqrt{N}`, so for macroscopic systems the two ensembles are indistinguishable in practice. This is why one can safely use the grand canonical ensemble (which factorizes over levels) even when the total particle number is effectively fixed: the constraint $`N = \text{const}` and the constraint $`\mu = \text{const}` lead to the same macroscopic predictions. The equivalence breaks down for small systems (nanoparticles, single molecules) or near critical points where fluctuations are enhanced.
</details>

## Occupation numbers

The mean occupation $`f` of a single-particle level at energy $`\varepsilon` is the **distribution function**. With $`x = (\varepsilon - \mu)/k_B T`:

<table>
<tr><th>Statistics</th><th>Level factor Ξ<sub><i>i</i></sub></th><th>Occupation <i>f</i>(ε)</th><th>Allowed <i>f</i></th></tr>
<tr><td>Fermi–Dirac (fermions)</td><td>1 + <i>e</i><sup>−<i>x</i></sup></td><td>1/(<i>e</i><sup><i>x</i></sup>+1)</td><td>0 ≤ <i>f</i> ≤ 1</td></tr>
<tr><td>Bose–Einstein (bosons)</td><td>1/(1 − <i>e</i><sup>−<i>x</i></sup>)</td><td>1/(<i>e</i><sup><i>x</i></sup>−1)</td><td><i>f</i> ≥ 0 (requires μ<ε)</td></tr>
<tr><td>Maxwell–Boltzmann (classical)</td><td>exp(<i>e</i><sup>−<i>x</i></sup>)</td><td><i>e</i><sup>−<i>x</i></sup></td><td><i>f</i> ≪ 1</td></tr>
</table>

All three reduce to $`f \approx e^{-x}` when the level is dilute ($`f \ll 1`). The exact classical level factor $`\Xi_i = \exp(e^{-x})` reduces to $`1 + e^{-x}` in the dilute limit (since $`e^{-x} \ll 1` makes $`\exp(e^{-x}) \approx 1 + e^{-x}`), which is the same form as the fermion factor — the two statistics become indistinguishable when occupation is low.

<details><summary>Details</summary>

The difference is the *exclusion rule* on a single level. A fermion level can hold 0 or 1 particle, so $`\Xi_i = e^{-\beta\varepsilon} + e^{\beta(\mu-\varepsilon)}` and $`f = \Xi_i' / \Xi_i = 1/(e^x+1)`. A boson level can hold $`0,1,2,\dots` particles, so $`\Xi_i` is a geometric series that converges only when $`\mu < \varepsilon` — this is why the boson chemical potential is bounded above by the ground-state energy. A classical particle has no restriction, and the dilute limit $`f\ll 1` makes both quantum formulas collapse to $`e^{-x}`.

The interactive simulation below plots the three distributions versus $`x = (\varepsilon-\mu)/k_B T` at fixed $`T`. The Fermi curve is a smooth step at $`x=0` (sharp as $`T\to 0`), the boson curve blows up as $`x\to 0^+` (a precursor of Bose condensation), and the classical curve is the common exponential tail.

The occupation of a state is the bridge to [PhaseTransitions](./PhaseTransitions.md): when a boson level's occupation diverges as $`\mu \to \varepsilon_0`, the excess particles pile into the ground state — Bose–Einstein condensation.
</details>

## Interactive simulation

The simulation below fixes $`T` and $`\mu` for a system of 12 single-particle levels ($`\varepsilon = 0,1,\dots,11`, $`k_B=1`). It draws the particle-number distribution $`P(N)`, the per-level occupations $`f_i`, and a live sample of particles, and it checks the fluctuation–dissipation identity $`k_B T\,\partial_\mu\langle N\rangle = \operatorname{Var}(N)` in real time.

<iframe src="./GrandCanonicalEnsemble.simulation.html" title="Grand canonical ensemble: particle-number distribution, occupations, and live sampling"></iframe>

## Example problem

A two-level fermionic system has levels $`\varepsilon_0 = 0` and $`\varepsilon_1 = 2` (energy units), in contact with a reservoir at $`T = 1` and $`\mu = 0` ($`k_B = 1`). Find the mean occupation of each level, $`\langle N \rangle`, $`\operatorname{Var}(N)`, and the grand potential $`\Omega`.

<details><summary>Solution</summary>

For a fermion, $`f(\varepsilon) = 1/(e^{(\varepsilon-\mu)/T}+1)`.

- Level 0: $`f_0 = 1/(e^{0}+1) = 0.5`.
- Level 1: $`f_1 = 1/(e^{2}+1) = 0.1192`.

Mean number: $`\langle N \rangle = f_0 + f_1 = 0.6192`.

Variance (fermion levels are independent): $`\operatorname{Var}(N) = f_0(1-f_0) + f_1(1-f_1) = 0.25 + 0.1050 = 0.3550`.

Check with fluctuation–dissipation: $`k_B T\,\partial_\mu\langle N\rangle = 0.3550 = \operatorname{Var}(N)`. ✓

Grand partition function: $`\ln\Xi = \ln(1+e^0) + \ln(1+e^{-2}) = \ln 2 + \ln(1+e^{-2}) = 0.8201`, so $`\Omega = -T\ln\Xi = -0.8201`.

The mean energy is $`\langle E\rangle = 0\cdot f_0 + 2\cdot f_1 = 0.2384`.

Note that $`f_i \le 1` for fermions (exclusion), and the variance is *smaller* than the classical/Poisson value $`\langle N\rangle = 0.6192` — a signature of anti-bunching.
</details>

## How this fits together

The grand canonical ensemble is the canonical ensemble with particle exchange added. The chain of ideas is: a reservoir fixes $`T` and $`\mu` (the two intensive slopes of the reservoir's entropy), the generalized Boltzmann factor $`e^{\beta(\mu N - E)}` weights microstates, $`\ln \Xi` is the generating function from which every quantity is a derivative, $`\Omega = -k_B T \ln\Xi` is the thermodynamic potential, and the per-level occupations $`f(\varepsilon)` encode the exclusion statistics. Fluctuations of $`N` are not a nuisance — through $`\operatorname{Var}(N)=k_B T\,\partial_\mu\langle N\rangle` they measure the system's susceptibility to particle exchange, the same link between fluctuations and response that runs through all of statistical mechanics. See [CanonicalEnsemble](./CanonicalEnsemble.md) for the fixed-$`N` limit, [PhaseTransitions](./PhaseTransitions.md) for what happens when $`f(\varepsilon_0)` diverges, and [NonequilibriumStatisticalMechanics](./NonequilibriumStatisticalMechanics.md) for driven systems where $`\mu` is not uniform.
