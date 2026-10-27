# Canonical Ensemble

The canonical ensemble is the probability measure for a system in contact with a **heat bath** at fixed temperature $`T`, with fixed volume $`V` and particle number $`N`. Energy $`E` is random. It is the right tool for equilibrium properties at a specified temperature: a gas in a thermostat, a solid in an oven, or any system where $`T` is controlled but energy fluctuates. It is the most commonly used ensemble in chemistry and condensed matter.

> **Authoritative sources**
> - [Wikipedia: Canonical ensemble](https://en.wikipedia.org/wiki/Canonical_ensemble)
> - [Pathria & Khalil, Statistical Thermodynamics, Ch. 3](https://www.oxfordacademic.com/)

## Boltzmann factor

Each microstate $`\alpha` with energy $`E_\alpha` has probability

```math
P(\alpha) = \frac{e^{-\beta E_\alpha}}{Z}, \qquad \beta = \frac{1}{k_B T}
```

where $`Z` is the **partition function** (normalization):

```math
Z(T,V,N) = \sum_\alpha e^{-\beta E_\alpha}
```

<details><summary>Details</summary>

**Derivation from the microcanonical reservoir.** Imagine a small system $`S` (the "system") in contact with a very large reservoir $`R` (the "heat bath"), with total energy $`E_{\text{tot}}` fixed. The combined system is isolated, so it is described by the [microcanonical ensemble](./MicrocanonicalEnsemble.md): every microstate of $`S+R` with energy $`E_{\text{tot}}` is equally likely.

If $`S` is in microstate $`\alpha` with energy $`E_\alpha`, the reservoir must have energy $`E_{\text{tot}} - E_\alpha`. The number of reservoir microstates compatible with this is $`\Omega_R(E_{\text{tot}} - E_\alpha)`. The probability of $`\alpha` is therefore proportional to this count:

```math
P(\alpha) \propto \Omega_R(E_{\text{tot}} - E_\alpha)
```

Since $`E_\alpha \ll E_{\text{tot}}`, expand the reservoir entropy $`S_R = k_B \ln \Omega_R` to first order:

```math
S_R(E_{\text{tot}} - E_\alpha) \approx S_R(E_{\text{tot}}) - E_\alpha \left(\frac{\partial S_R}{\partial E}\right)_{\!E_{\text{tot}}}
```

The slope $`(1/k_B)(\partial S_R/\partial E) = 1/(k_B T) = \beta` defines the temperature of the reservoir. Exponentiating:

```math
P(\alpha) \propto e^{-\beta E_\alpha}
```

The normalization constant is the partition function $`Z = \sum_\alpha e^{-\beta E_\alpha}`.

**Two-level example.** Consider a single spin in a magnetic field with energies $`E_0 = 0` (spin down) and $`E_1 = \varepsilon` (spin up):

```math
Z = 1 + e^{-\beta\varepsilon}, \qquad P_0 = \frac{1}{1+e^{-\beta\varepsilon}}, \qquad P_1 = \frac{e^{-\beta\varepsilon}}{1+e^{-\beta\varepsilon}}
```

At low temperature ($`\beta\varepsilon \gg 1`), the system is almost certainly in the ground state. At high temperature ($`\beta\varepsilon \ll 1`), both states are equally likely.

<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="max-width:300px;display:block;margin:12px auto">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#888"/></marker>
  </defs>
  <!-- Energy axis -->
  <line x1="40" y1="180" x2="40" y2="20" stroke="#888" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="25" y="15" fill="#aaa" font-size="12">E</text>
  <!-- Ground state -->
  <line x1="60" y1="160" x2="140" y2="160" stroke="#4ecdc4" stroke-width="3"/>
  <text x="148" y="164" fill="#4ecdc4" font-size="12">E₀ = 0</text>
  <!-- Excited state -->
  <line x1="60" y1="50" x2="140" y2="50" stroke="#f4a261" stroke-width="3"/>
  <text x="148" y="54" fill="#f4a261" font-size="12">E₁ = ε</text>
  <!-- Energy gap arrow -->
  <line x1="100" y1="155" x2="100" y2="55" stroke="#888" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr)"/>
  <text x="105" y="110" fill="#ccc" font-size="11">ε</text>
  <!-- Probability bars -->
  <rect x="200" y="150" width="80" height="10" fill="rgba(78,205,196,0.6)" rx="2"/>
  <text x="200" y="175" fill="#ccc" font-size="10">P₀ (low T: ≈1)</text>
  <rect x="200" y="40" width="20" height="10" fill="rgba(244,162,97,0.6)" rx="2"/>
  <text x="200" y="65" fill="#ccc" font-size="10">P₁ (low T: ≈0)</text>
  <!-- Boltzmann factor label -->
  <text x="60" y="195" fill="#a8d8ea" font-size="11">P₁/P₀ = e^{-βε}</text>
</svg>

**Partition function as a Laplace transform.** For a continuous density of states $`\Omega(E)`:

```math
Z = \int_0^{\infty} \Omega(E)\, e^{-\beta E}\, dE
```

This is the Laplace transform of $`\Omega(E)` with parameter $`\beta`. At low temperature, only states near the ground state contribute; at high temperature, the integral samples the full density of states.

**Factorization for non-interacting particles.** If the total energy is a sum of single-particle energies $`E = \sum_i \varepsilon_{n_i}`, the partition function factorizes:

```math
Z_N = \frac{1}{N!}\left(\sum_n e^{-\beta \varepsilon_n}\right)^N
```

The $`1/N!` (Gibbs factor) corrects for indistinguishability. See [Statistical Foundations of Thermodynamics](../Thermodynamics/Statistical-Foundations-of-Thermodynamics.md) for the ideal-gas application.

> **Authoritative sources**
> - [Wikipedia: Boltzmann distribution](https://en.wikipedia.org/wiki/Boltzmann_distribution)
> - [Schroeder, Thermal Physics, Ch. 4](https://www.oxfordacademic.com/uk/thermal-physics/9780199442952)

<details><summary>Example problem</summary>

A three-level system has energies $`E_0 = 0`, $`E_1 = \varepsilon`, $`E_2 = 3\varepsilon`. Find $`Z`, the probabilities, and the mean energy at $`\beta\varepsilon = 1`.

<details><summary>Solution</summary>

```math
Z = 1 + e^{-1} + e^{-3} = 1 + 0.3679 + 0.0498 = 1.4177
```

```math
P_0 = \frac{1}{1.4177} = 0.705, \quad P_1 = \frac{0.3679}{1.4177} = 0.260, \quad P_2 = \frac{0.0498}{1.4177} = 0.035
```

```math
\langle E \rangle = \frac{0 \cdot 1 + \varepsilon \cdot e^{-1} + 3\varepsilon \cdot e^{-3}}{Z} = \frac{0.3679 + 0.1494}{1.4177}\,\varepsilon = 0.365\,\varepsilon
```

</details>
</details>

</details>

## Additivity of partition functions

For two **independent** subsystems $`A` and $`B` (no interaction energy, no shared degrees of freedom), the total partition function is the product:

```math
Z_{\text{tot}} = Z_A \times Z_B
```

More generally, for $`N` independent subsystems: $`Z_{\text{tot}} = \prod_i Z_i`.

<details><summary>Details</summary>

**Why the product?** If $`A` is in state $`i` with energy $`E_i^A` and $`B` is in state $`j` with energy $`E_j^B`, the combined state $(i,j)$ has energy $`E_i^A + E_j^B` (additivity of energy for independent systems). The joint Boltzmann factor is:

```math
e^{-\beta(E_i^A + E_j^B)} = e^{-\beta E_i^A} \cdot e^{-\beta E_j^B}
```

Summing over all joint states:

```math
Z_{\text{tot}} = \sum_{i,j} e^{-\beta E_i^A}\, e^{-\beta E_j^B} = \left(\sum_i e^{-\beta E_i^A}\right)\left(\sum_j e^{-\beta E_j^B}\right) = Z_A \cdot Z_B
```

**Consequence: extensivity of free energy.** Since $`F = -k_B T \ln Z`:

```math
F_{\text{tot}} = -k_B T \ln(Z_A Z_B) = -k_B T(\ln Z_A + \ln Z_B) = F_A + F_B
```

The Helmholtz free energy is **extensive** (additive) for independent subsystems. This is the statistical-mechanical origin of the extensivity of thermodynamic potentials.

**Example: ideal gas as $`N` independent particles.** For $`N` non-interacting, indistinguishable particles:

```math
Z_N = \frac{1}{N!}(Z_1)^N
```

where $`Z_1` is the single-particle partition function. The $`1/N!` prevents overcounting of permutations (Gibbs paradox). Taking the logarithm: $`\ln Z_N = N \ln Z_1 - \ln N! \approx N(\ln Z_1 - \ln N + 1)` (Stirling), which is extensive in $`N`.

<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" style="max-width:340px;display:block;margin:12px auto">
  <!-- System A box -->
  <rect x="20" y="20" width="100" height="80" fill="none" stroke="#4ecdc4" stroke-width="2" rx="6"/>
  <text x="55" y="65" fill="#4ecdc4" font-size="13" font-weight="bold">A</text>
  <text x="35" y="90" fill="#aaa" font-size="10">Z_A</text>
  <!-- Multiplication sign -->
  <text x="140" y="68" fill="#ccc" font-size="20">×</text>
  <!-- System B box -->
  <rect x="170" y="20" width="100" height="80" fill="none" stroke="#f4a261" stroke-width="2" rx="6"/>
  <text x="205" y="65" fill="#f4a261" font-size="13" font-weight="bold">B</text>
  <text x="185" y="90" fill="#aaa" font-size="10">Z_B</text>
  <!-- Equals -->
  <text x="285" y="68" fill="#ccc" font-size="20">=</text>
  <!-- Combined -->
  <text x="300" y="68" fill="#a8d8ea" font-size="13">Z_A·Z_B</text>
</svg>

> **Authoritative sources**
> - [Reif, Fundamentals of Statistical and Thermal Physics, Ch. 5](https://www.oxfordacademic.com/)

<details><summary>Example problem</summary>

Two independent two-level systems (each with levels $`0` and $`\varepsilon`) are in a heat bath. Find $`Z_{\text{tot}}` and the probability that both are in their excited states.

<details><summary>Solution</summary>

Each system has $`Z_1 = 1 + e^{-\beta\varepsilon}`. By additivity:

```math
Z_{\text{tot}} = (1 + e^{-\beta\varepsilon})^2
```

The probability that both are excited is the product of individual probabilities:

```math
P(\text{both excited}) = \left(\frac{e^{-\beta\varepsilon}}{1+e^{-\beta\varepsilon}}\right)^2 = \frac{e^{-2\beta\varepsilon}}{(1+e^{-\beta\varepsilon})^2}
```

This equals the Boltzmann weight of the joint state $(1,1)$ with energy $`2\varepsilon` divided by $`Z_{\text{tot}}`, confirming consistency.

</details>
</details>

</details>

## Helmholtz free energy

The thermodynamic potential conjugate to $`(T, V, N)` is the **Helmholtz free energy**:

```math
F(T,V,N) = -k_B T \ln Z
```

All thermodynamic quantities are derivatives of $`F`:

```math
S = -\left(\frac{\partial F}{\partial T}\right)_{V,N}, \qquad P = -\left(\frac{\partial F}{\partial V}\right)_{T,N}, \qquad \mu = \left(\frac{\partial F}{\partial N}\right)_{T,V}
```

<details><summary>Details</summary>

**Why $`F`?** The Helmholtz free energy $`F = U - TS` is the Legendre transform of the internal energy $`U(S,V,N)` that replaces the entropy variable $`S` with its conjugate $`T = (\partial U/\partial S)_{V,N}`. At fixed $`T, V, N`, the equilibrium state minimizes $`F`. This is the statistical-mechanical statement of the second law for systems in a heat bath.

**Derivation from $`Z`.** The mean energy is:

```math
\langle E \rangle = \frac{\sum_\alpha E_\alpha\, e^{-\beta E_\alpha}}{Z} = -\frac{\partial \ln Z}{\partial \beta}
```

The Gibbs entropy of the canonical distribution is:

```math
S = -k_B \sum_\alpha P_\alpha \ln P_\alpha = -k_B \sum_\alpha P_\alpha(-\beta E_\alpha - \ln Z) = k_B \beta \langle E \rangle + k_B \ln Z
```

Substituting into $`F = \langle E \rangle - TS`:

```math
F = \langle E \rangle - T(k_B \beta \langle E \rangle + k_B \ln Z) = \langle E \rangle - \langle E \rangle - k_B T \ln Z = -k_B T \ln Z
```

**Practical use.** Once you compute $`Z(T,V,N)` from the microscopic Hamiltonian, every thermodynamic quantity follows by differentiation. This is the central workflow of equilibrium statistical mechanics.

> **Authoritative sources**
> - [Wikipedia: Helmholtz free energy](https://en.wikipedia.org/wiki/Helmholtz_free_energy)
> - [Thermodynamic Potentials and Equilibrium](../Thermodynamics/Thermodynamic-Potentials-and-Equilibrium.md)

<details><summary>Example problem</summary>

A single harmonic oscillator has energy levels $`E_n = \hbar\omega(n + \tfrac{1}{2})`, $`n = 0, 1, 2, \ldots`. Find $`Z`, $`F`, and $`\langle E \rangle`.

<details><summary>Solution</summary>

```math
Z = \sum_{n=0}^{\infty} e^{-\beta\hbar\omega(n+1/2)} = \frac{e^{-\beta\hbar\omega/2}}{1 - e^{-\beta\hbar\omega}}
```

```math
F = -k_B T \ln Z = \frac{\hbar\omega}{2} + k_B T \ln(1 - e^{-\beta\hbar\omega})
```

```math
\langle E \rangle = -\frac{\partial \ln Z}{\partial \beta} = \frac{\hbar\omega}{2} + \frac{\hbar\omega}{e^{\beta\hbar\omega} - 1}
```

At high temperature ($`k_B T \gg \hbar\omega`): $`\langle E \rangle \approx k_B T` (classical equipartition). At low temperature: $`\langle E \rangle \approx \hbar\omega/2` (zero-point energy).

</details>
</details>

</details>

## Entropy in the canonical ensemble

The entropy of a system in the canonical ensemble is:

```math
S = k_B\!\left(\ln Z + \beta\langle E \rangle\right) = \frac{\langle E \rangle - F}{T}
```

<details><summary>Details</summary>

**Derivation.** Start from the Gibbs entropy formula applied to the canonical distribution $`P_\alpha = e^{-\beta E_\alpha}/Z`:

```math
S = -k_B \sum_\alpha P_\alpha \ln P_\alpha
```

Substitute $`\ln P_\alpha = -\beta E_\alpha - \ln Z`:

```math
S = -k_B \sum_\alpha P_\alpha(-\beta E_\alpha - \ln Z) = k_B \beta \sum_\alpha P_\alpha E_\alpha + k_B \ln Z \sum_\alpha P_\alpha
```

Since $`\sum_\alpha P_\alpha = 1` and $`\sum_\alpha P_\alpha E_\alpha = \langle E \rangle`:

```math
S = k_B \beta \langle E \rangle + k_B \ln Z
```

**Connection to thermodynamics.** Using $`F = -k_B T \ln Z` (so $`\ln Z = -F/(k_B T)`):

```math
S = k_B \beta \langle E \rangle - \frac{F}{T} = \frac{\langle E \rangle}{T} - \frac{F}{T} = \frac{\langle E \rangle - F}{T}
```

This is exactly the thermodynamic identity $`F = U - TS` rearranged: $`S = (U - F)/T`. The canonical ensemble reproduces the thermodynamic relation between internal energy, free energy, and entropy.

**Physical interpretation.** The two terms in $`S = k_B(\ln Z + \beta\langle E\rangle)` have distinct meanings:
- $`k_B \ln Z`: the "configurational" entropy — the number of accessible states weighted by the Boltzmann factor.
- $`k_B \beta \langle E \rangle = \langle E \rangle/T`: the "thermal" contribution from the energy the system carries.

**Example: two-level system.** With $`Z = 1 + e^{-\beta\varepsilon}`:

```math
S = k_B\!\left[\ln(1+e^{-\beta\varepsilon}) + \frac{\beta\varepsilon}{e^{\beta\varepsilon}+1}\right]
```

At $`T \to 0`: $`S \to 0` (third law — the system is in a unique ground state). At $`T \to \infty`: $`S \to k_B \ln 2` (maximum entropy — both states equally likely).

> **Authoritative sources**
> - [Wikipedia: Gibbs entropy](https://en.wikipedia.org/wiki/Gibbs_entropy)
> - [Pathria & Khalil, Statistical Thermodynamics, Ch. 3](https://www.oxfordacademic.com/)

<details><summary>Example problem</summary>

Show that for the two-level system, $`S = (\langle E \rangle - F)/T` holds identically.

<details><summary>Solution</summary>

We have $`F = -k_B T \ln(1+e^{-\beta\varepsilon})` and $`\langle E \rangle = \varepsilon/(e^{\beta\varepsilon}+1)`.

```math
\frac{\langle E \rangle - F}{T} = \frac{\varepsilon}{T(e^{\beta\varepsilon}+1)} + k_B \ln(1+e^{-\beta\varepsilon})
```

Since $`\varepsilon/T = k_B \beta\varepsilon` and $`\ln(1+e^{-\beta\varepsilon}) = \ln((e^{\beta\varepsilon}+1)/e^{\beta\varepsilon}) = \ln(e^{\beta\varepsilon}+1) - \beta\varepsilon`:

```math
\frac{\langle E \rangle - F}{T} = \frac{k_B \beta\varepsilon}{e^{\beta\varepsilon}+1} + k_B\ln(e^{\beta\varepsilon}+1) - k_B\beta\varepsilon
```

```math
= k_B\ln(e^{\beta\varepsilon}+1) + k_B\beta\varepsilon\!\left(\frac{1}{e^{\beta\varepsilon}+1} - 1\right)
= k_B\ln(e^{\beta\varepsilon}+1) - \frac{k_B\beta\varepsilon\, e^{\beta\varepsilon}}{e^{\beta\varepsilon}+1}
```

This equals $`k_B[\ln(1+e^{-\beta\varepsilon}) + \beta\varepsilon/(e^{\beta\varepsilon}+1)]` after rewriting, confirming the identity. ∎

</details>
</details>

</details>

## Pressure from the partition function

The pressure is obtained directly from the partition function:

```math
P = k_B T \left(\frac{\partial \ln Z}{\partial V}\right)_{T,N}
```

This is equivalent to $`P = -(\partial F/\partial V)_{T,N}` since $`F = -k_B T \ln Z`.

<details><summary>Details</summary>

**Derivation.** From $`F = -k_B T \ln Z`, the thermodynamic relation $`P = -(\partial F/\partial V)_{T,N}` gives:

```math
P = -\frac{\partial}{\partial V}(-k_B T \ln Z) = k_B T \left(\frac{\partial \ln Z}{\partial V}\right)_{T,N}
```

**Ideal gas law.** For $`N` classical, non-interacting particles in volume $`V`:

```math
Z_N = \frac{1}{N!}\left(\frac{V}{\lambda_T^3}\right)^N, \qquad \lambda_T = \frac{h}{\sqrt{2\pi m k_B T}}
```

Taking the logarithm: $`\ln Z_N = N\ln V - 3N\ln\lambda_T - \ln N!`. Differentiating with respect to $`V` at fixed $`T, N`:

```math
P = k_B T \cdot \frac{N}{V} \quad \Longrightarrow \quad PV = Nk_B T
```

This recovers the ideal gas law directly from the partition function.

**Microscopic interpretation.** The volume dependence of $`Z` comes from the number of available single-particle states in volume $`V`. Increasing $`V` increases $`Z` (more states), and the system "pushes back" against the walls — this is pressure.

> **Authoritative sources**
> - [Wikipedia: Partition function (statistical mechanics)](https://en.wikipedia.org/wiki/Partition_function_(statistical_mechanics))
> - [Schroeder, Thermal Physics, Ch. 6](https://www.oxfordacademic.com/uk/thermal-physics/9780199442952)

<details><summary>Example problem</summary>

A single particle is confined in a one-dimensional box of length $`L` with energy levels $`E_n = n^2\hbar^2/(8mL^2)`, $`n = 1, 2, 3, \ldots`. In the high-temperature limit, show that $`P = k_B T/L`.

<details><summary>Solution</summary>

In the high-temperature limit ($`k_B T \gg \hbar^2/(8mL^2)`), the sum over states becomes an integral:

```math
Z_1 = \sum_{n=1}^{\infty} e^{-\beta n^2\hbar^2/(8mL^2)} \approx \int_0^{\infty} e^{-\beta n^2\hbar^2/(8mL^2)}\, dn = \frac{L}{\lambda_T}
```

where $`\lambda_T = h/\sqrt{2\pi m k_B T}` is the thermal de Broglie wavelength.

```math
P = k_B T \frac{\partial \ln Z_1}{\partial L} = k_B T \cdot \frac{1}{L}
```

This is the one-dimensional ideal gas law: $`PL = k_B T`. ∎

</details>
</details>

</details>

## Energy and fluctuations

The mean energy and its variance are

```math
\langle E \rangle = -\frac{\partial \ln Z}{\partial \beta}, \qquad \operatorname{Var}(E) = \frac{\partial^2 \ln Z}{\partial \beta^2} = k_B T^2 C_V
```

The **fluctuation–dissipation relation** $`\operatorname{Var}(E) = k_B T^2 C_V` ties the energy variance to the heat capacity: a system with large $`C_V` (readily absorbs heat) has large energy fluctuations.

<details><summary>Details</summary>

**Derivation of the variance.** The mean energy is:

```math
\langle E \rangle = \frac{\sum_\alpha E_\alpha\, e^{-\beta E_\alpha}}{Z} = -\frac{1}{Z}\frac{\partial Z}{\partial \beta} = -\frac{\partial \ln Z}{\partial \beta}
```

The second moment:

```math
\langle E^2 \rangle = \frac{1}{Z}\frac{\partial^2 Z}{\partial \beta^2}
```

Therefore:

```math
\operatorname{Var}(E) = \langle E^2 \rangle - \langle E \rangle^2 = \frac{\partial^2 \ln Z}{\partial \beta^2}
```

Since $`C_V = \partial\langle E\rangle/\partial T` and $`\partial/\partial T = -(1/k_B T^2)\,\partial/\partial\beta`:

```math
\operatorname{Var}(E) = -\frac{\partial \langle E \rangle}{\partial \beta} = k_B T^2 \frac{\partial \langle E \rangle}{\partial T} = k_B T^2 C_V
```

**Thermodynamic limit.** For a macroscopic system with $`N \sim 10^{23}` particles, the relative energy fluctuation is:

```math
\frac{\sqrt{\operatorname{Var}(E)}}{\langle E \rangle} \sim \frac{1}{\sqrt{N}} \approx 10^{-12}
```

This is the key result behind the **equivalence of ensembles**: in the thermodynamic limit ($`N \to \infty`, $`V \to \infty`, $`N/V` fixed), the canonical ensemble gives the same macroscopic predictions as the microcanonical ensemble, because the energy distribution becomes a delta function. The canonical ensemble is the one used in the standard equivalence proof: the relative fluctuations $`\sim 1/\sqrt{N} \to 0` justify replacing the fluctuating energy by its mean. See [Statistical Foundations of Thermodynamics](../Thermodynamics/Statistical-Foundations-of-Thermodynamics.md) for the full argument.

**Small systems.** For nanoparticles or single-molecule experiments ($`N \sim 10^2`–$`10^6`), the relative fluctuations are significant and the deterministic thermodynamic description breaks down. See [NonequilibriumStatisticalMechanics](./NonequilibriumStatisticalMechanics.md) for fluctuation theorems.

**Connection to the grand canonical ensemble.** The canonical energy fluctuation $`\operatorname{Var}(E) = k_B T^2 C_V` is the analogue of the grand-canonical particle-number fluctuation $`\operatorname{Var}(N) = k_B T\, \partial_\mu \langle N\rangle`. Both express the same principle: the variance of the conserved quantity exchanged with the reservoir is proportional to the corresponding response function. See [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md).

> **Authoritative sources**
> - [Wikipedia: Fluctuation–dissipation theorem](https://en.wikipedia.org/wiki/Fluctuation%E2%80%93dissipation_theorem)
> - [Kubo, "The Response of Electron System to External Fields," J. Phys. Soc. Jpn. 12, 570 (1957)](https://doi.org/10.1143/JPSJ.12.570)

<details><summary>Example problem</summary>

For the two-level system ($`E_0 = 0`, $`E_1 = \varepsilon`), compute $`\operatorname{Var}(E)` and verify that it equals $`k_B T^2 C_V`.

<details><summary>Solution</summary>

```math
\langle E \rangle = \frac{\varepsilon}{e^{\beta\varepsilon}+1}, \qquad \langle E^2 \rangle = \frac{\varepsilon^2}{e^{\beta\varepsilon}+1}
```

(since $`E^2 = \varepsilon^2` when excited and $`0` when in the ground state, so $`\langle E^2 \rangle = \varepsilon^2 P_1 = \varepsilon^2/(e^{\beta\varepsilon}+1)`).

```math
\operatorname{Var}(E) = \frac{\varepsilon^2}{e^{\beta\varepsilon}+1} - \frac{\varepsilon^2}{(e^{\beta\varepsilon}+1)^2} = \frac{\varepsilon^2\, e^{\beta\varepsilon}}{(e^{\beta\varepsilon}+1)^2}
```

Now $`C_V = k_B(\beta\varepsilon)^2 e^{\beta\varepsilon}/(e^{\beta\varepsilon}+1)^2`, so:

```math
k_B T^2 C_V = k_B T^2 \cdot k_B \beta^2 \varepsilon^2 \frac{e^{\beta\varepsilon}}{(e^{\beta\varepsilon}+1)^2} = \frac{\varepsilon^2\, e^{\beta\varepsilon}}{(e^{\beta\varepsilon}+1)^2} = \operatorname{Var}(E) \quad \checkmark
```

</details>
</details>

</details>

## Quantum density-matrix formulation

For quantum systems, the canonical ensemble is expressed using the **density matrix**:

```math
\rho = \frac{e^{-\beta \hat{H}}}{Z}, \qquad Z = \operatorname{Tr}(e^{-\beta \hat{H}})
```

The expectation value of any observable $`\hat{A}` is:

```math
\langle A \rangle = \operatorname{Tr}(\rho\, \hat{A})
```

<details><summary>Details</summary>

**From classical to quantum.** In the classical canonical ensemble, microstates are points in phase space and $`P(\alpha)` is a probability density. In quantum mechanics, the state is a density operator $`\rho` on Hilbert space. The classical Boltzmann weight $`e^{-\beta E_\alpha}` becomes the operator $`e^{-\beta \hat{H}}` (defined by the spectral decomposition of $`\hat{H}`):

If $`\hat{H}|n\rangle = E_n|n\rangle`, then $`e^{-\beta\hat{H}}|n\rangle = e^{-\beta E_n}|n\rangle`, and:

```math
\rho = \sum_n \frac{e^{-\beta E_n}}{Z}\,|n\rangle\langle n|
```

**Expectation values.** For any observable $`\hat{A}`:

```math
\langle A \rangle = \operatorname{Tr}(\rho\, \hat{A}) = \sum_n \frac{e^{-\beta E_n}}{Z}\, \langle n|\hat{A}|n\rangle
```

This generalizes the classical $`\sum_\alpha P_\alpha A_\alpha` to the quantum setting. In particular:

```math
\langle E \rangle = \operatorname{Tr}(\rho\, \hat{H}) = -\frac{\partial \ln Z}{\partial \beta}
```

**Entropy.** The von Neumann entropy $`S = -k_B \operatorname{Tr}(\rho \ln \rho)` reduces to the Gibbs entropy in the classical limit and equals $`k_B(\ln Z + \beta\langle E\rangle)` for the canonical state.

**Connection to quantum statistics.** When the system consists of many indistinguishable particles, the trace in $`Z = \operatorname{Tr}(e^{-\beta\hat{H}})` is over the appropriate (symmetrized or antisymmetrized) many-body Hilbert space. This is where Fermi–Dirac and Bose–Einstein statistics enter naturally. See [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md) for the quantum ideal gas and occupation-number formalism.

> **Authoritative sources**
> - [Wikipedia: Density matrix](https://en.wikipedia.org/wiki/Density_matrix)
> - [Wikipedia: Canonical ensemble (quantum)](https://en.wikipedia.org/wiki/Canonical_ensemble#Quantum_mechanics)

<details><summary>Example problem</summary>

A spin-$`\tfrac{1}{2}` particle in a magnetic field $`B\hat{z}` has Hamiltonian $`\hat{H} = -\mu B\, \hat{\sigma}_z` with eigenvalues $`E_\pm = \mp \mu B`. Write $`\rho` explicitly and compute $`\langle \sigma_z \rangle`.

<details><summary>Solution</summary>

```math
Z = e^{\beta\mu B} + e^{-\beta\mu B} = 2\cosh(\beta\mu B)
```

```math
\rho = \frac{1}{2\cosh(\beta\mu B)}\begin{pmatrix} e^{\beta\mu B} & 0 \\ 0 & e^{-\beta\mu B} \end{pmatrix}
```

```math
\langle \sigma_z \rangle = \operatorname{Tr}(\rho\, \sigma_z) = \frac{e^{\beta\mu B} - e^{-\beta\mu B}}{2\cosh(\beta\mu B)} = \tanh(\beta\mu B)
```

At $`T \to 0`: $`\langle\sigma_z\rangle \to 1` (fully polarized). At $`T \to \infty`: $`\langle\sigma_z\rangle \to 0` (unpolarized). This is the basis of nuclear magnetic resonance (NMR) thermodynamics.

</details>
</details>

</details>

<iframe src="./CanonicalEnsemble.simulation.html" title="Two-level system in a heat bath: Boltzmann probabilities, mean energy, and Schottky heat-capacity peak as a function of temperature"></iframe>

## Example problem

A two-level system has ground state energy $`E_0 = 0` and excited state energy $`E_1 = \varepsilon`. It is in contact with a heat bath at temperature $`T`. Find the partition function, mean energy, and heat capacity, and identify the Schottky anomaly.

<details><summary>Solution</summary>

- Partition function: $`Z = 1 + e^{-\beta\varepsilon}`.
- Mean energy: $`\langle E \rangle = \varepsilon \cdot e^{-\beta\varepsilon}/(1 + e^{-\beta\varepsilon}) = \varepsilon/(e^{\beta\varepsilon}+1)`.
- Heat capacity: $`C_V = \partial \langle E\rangle/\partial T = k_B (\beta\varepsilon)^2 e^{-\beta\varepsilon}/(1+e^{-\beta\varepsilon})^2`.

At $`T \to 0`: $`\langle E\rangle \to 0`, $`C_V \to 0` (ground state frozen). At $`T \to \infty`: $`\langle E\rangle \to \varepsilon/2`, $`C_V \to 0` (equipartition between two levels).

The **Schottky anomaly**: $`C_V` peaks at $`T \approx 0.417\,\varepsilon/k_B` (equivalently $`\beta\varepsilon \approx 2.399`), with peak value $`C_V^{\max} \approx 0.439\, k_B`. This is a hallmark of any system with a finite number of energy levels and is observed in real materials (e.g., paramagnetic salts, molecular crystals) as a characteristic bump in the low-temperature heat capacity.

</details>

## How this fits together

The canonical ensemble is the microcanonical ensemble with a heat bath added: the reservoir fixes $`T` (the entropy slope), and the Boltzmann factor $`e^{-\beta E}` weights microstates. The partition function $`Z` is the generating function for all thermodynamic quantities: energy, entropy, pressure, and chemical potential all follow by differentiation.

**Equivalence of ensembles.** The canonical ensemble is the one used in the standard thermodynamic-limit equivalence proof: the relative energy fluctuations scale as $`1/\sqrt{N} \to 0`, so the canonical and microcanonical ensembles give identical macroscopic predictions for large systems. This justifies using the simpler canonical formalism (fixed $`T` rather than fixed $`E`) for all practical equilibrium calculations.

Adding particle exchange to the heat bath gives the grand canonical ensemble, where the partition function is replaced by the grand partition function $`\Xi`. See [MicrocanonicalEnsemble](./MicrocanonicalEnsemble.md) for the isolated limit, [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md) for the open-system generalization, and [PhaseTransitions](./PhaseTransitions.md) for non-analyticities in $`F` at critical points.
