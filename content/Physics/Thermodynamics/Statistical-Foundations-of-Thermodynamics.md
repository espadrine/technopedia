# Statistical Foundations of Thermodynamics

This page derives the macroscopic laws of thermodynamics from the counting of microstates. It is relevant when you need to understand *why* entropy increases, *what* temperature means microscopically, or when you need to compute thermodynamic properties (heat capacity, equation of state, fluctuations) from a microscopic model. It is scoped to the bridge between microstates and macroscopic variables; the full ensemble formalism is in [Statistical mechanics](../Statistical-Mechanics/Readme.md).

> **Authoritative sources**
> - [Boltzmann entropy — Wikipedia](https://en.wikipedia.org/wiki/Boltzmann_entropy)
> - [Partition function — Wikipedia](https://en.wikipedia.org/wiki/Partition_function_(statistical_mechanics))
> - [Schroeder, Thermal Physics, Ch. 4–6](https://www.oxfordacademic.com/uk/thermal-physics/9780199442952)

## Boltzmann entropy

For a system with $`W` accessible microstates (all equally probable in the microcanonical ensemble):

```math
S = k_B \ln W
```

<details><summary>Details</summary>

**Why the logarithm?** Entropy must be extensive: if you combine two independent systems A and B, the total number of microstates is $`W_{\text{tot}} = W_A \cdot W_B` (product, by the multiplication rule). Extensivity requires $`S_{\text{tot}} = S_A + S_B`. The only function satisfying $`f(W_A W_B) = f(W_A) + f(W_B)` is $`f(W) = k_B \ln W` (up to a constant).

**Concrete combinatorial example: $`N` coins.** Toss $`N` fair coins. A *macrostate* is specified by the number of heads $`k` (from $`0` to $`N`); a *microstate* is a specific sequence of heads and tails. The number of microstates for a given $`k` is the binomial coefficient:

```math
W(k) = \binom{N}{k} = \frac{N!}{k!(N-k)!}
```

For $`N = 10`, the macrostate $`k = 5` (five heads) has $`W = \binom{10}{5} = 252` microstates, while $`k = 0` or $`k = 10` has only $`W = 1`. The total number of microstates is $`\sum_k W(k) = 2^N`. The most probable macrostate is overwhelmingly the one with $`k \approx N/2`, and its multiplicity grows as $`\binom{N}{N/2} \sim 2^N / \sqrt{\pi N/2}` — *exponentially* in $`N`. Taking the logarithm, $`S = k_B \ln W`, converts this exponential growth into a quantity that is *linear* in $`N` (extensive): $`\ln \binom{N}{N/2} \approx N \ln 2 - \tfrac{1}{2}\ln(\pi N/2) \approx N \ln 2` for large $`N`.

<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style="max-width:380px;display:block;margin:12px auto">
  <line x1="45" y1="170" x2="365" y2="170" stroke="#888" stroke-width="1.5"/>
  <line x1="45" y1="170" x2="45" y2="15" stroke="#888" stroke-width="1.5"/>
  <text x="350" y="188" fill="#aaa" font-size="12">k</text>
  <text x="18" y="15" fill="#aaa" font-size="11">W(k)</text>
  <rect x="33" y="169.4" width="24" height="0.6" fill="#4ecdc4"/>
  <rect x="65" y="163.8" width="24" height="6.2" fill="#4ecdc4"/>
  <rect x="97" y="142.3" width="24" height="27.7" fill="#4ecdc4"/>
  <rect x="129" y="96.2" width="24" height="73.8" fill="#4ecdc4"/>
  <rect x="161" y="40.8" width="24" height="129.2" fill="#4ecdc4"/>
  <rect x="193" y="15" width="24" height="155" fill="#f4a261"/>
  <rect x="225" y="40.8" width="24" height="129.2" fill="#4ecdc4"/>
  <rect x="257" y="96.2" width="24" height="73.8" fill="#4ecdc4"/>
  <rect x="289" y="142.3" width="24" height="27.7" fill="#4ecdc4"/>
  <rect x="321" y="163.8" width="24" height="6.2" fill="#4ecdc4"/>
  <rect x="353" y="169.4" width="24" height="0.6" fill="#4ecdc4"/>
  <text x="180" y="12" fill="#f4a261" font-size="11">W = 252</text>
  <text x="95" y="185" fill="#aaa" font-size="10">N = 10 coins: W(k) = C(10,k), peak at k = N/2</text>
</svg>

**Why does entropy increase?** The number of microstates corresponding to a macrostate with energy spread over a larger volume (or more mixed composition) is overwhelmingly larger. The system evolves toward the macrostate with the most microstates, as formalized by the [Second Law and Entropy](./Second-Law-and-Entropy.md).

**Gibbs/von Neumann entropy.** The Boltzmann formula $`S = k_B \ln W` assumes every microstate is equally probable — true in the [microcanonical ensemble](../Statistical-Mechanics/MicrocanonicalEnsemble.md). When microstates are *not* equally probable (e.g., the [canonical ensemble](../Statistical-Mechanics/CanonicalEnsemble.md), where higher-energy states are less likely), the correct generalization is the **Gibbs entropy**:

```math
S = -k_B \sum_i p_i \ln p_i
```

For a quantum system: $`S = -k_B \, \text{Tr}(\rho \ln \rho)` where $`\rho` is the density matrix. The two forms agree when all $`p_i = 1/W`: $`-k_B \sum_i (1/W)\ln(1/W) = k_B \ln W`. Use the Boltzmann form for an isolated system (equal a priori probabilities) and the Gibbs form for a system in contact with a reservoir (unequal probabilities); the full derivation is in [CanonicalEnsemble](../Statistical-Mechanics/CanonicalEnsemble.md).

> **Authoritative sources**
> - [Boltzmann entropy — Wikipedia](https://en.wikipedia.org/wiki/Boltzmann_entropy)
> - [Gibbs entropy — Wikipedia](https://en.wikipedia.org/wiki/Gibbs_entropy)

<details><summary>Example problem</summary>

Toss $`N = 20` fair coins. (a) How many microstates correspond to the macrostate $`k = 10` heads? (b) What is the entropy of that macrostate in units of $`k_B`? (c) Show that $`S/k_B` is approximately extensive, i.e., proportional to $`N`.

<details><summary>Solution</summary>

(a) $`W(10) = \binom{20}{10} = 184756`.

(b) $`S/k_B = \ln 184756 \approx 12.13`.

(c) The maximum multiplicity scales as $`\binom{N}{N/2} \sim 2^N/\sqrt{\pi N/2}`, so $`S/k_B \approx N \ln 2 - \tfrac{1}{2}\ln(\pi N/2)`. For $`N = 20`: $`20 \ln 2 - \tfrac{1}{2}\ln(5\pi) \approx 13.86 - 1.73 = 12.13`, matching (b). The leading term $`N \ln 2` is linear in $`N`, confirming extensivity.

</details>
</details>

</details>

## Temperature from statistics

In the microcanonical ensemble, temperature is defined by:

```math
\frac{1}{T} \equiv \left(\frac{\partial S}{\partial U}\right)_{V,N}
```

<details><summary>Details</summary>

**Derivation.** Consider two systems A and B in thermal contact, with total energy $`U = U_A + U_B` fixed. The most probable energy division maximizes $`S_{\text{tot}} = S_A(U_A) + S_B(U_B)`:

```math
\frac{\partial S_{\text{tot}}}{\partial U_A} = \frac{\partial S_A}{\partial U_A} - \frac{\partial S_B}{\partial U_B} = 0
```

This gives $`(\partial S_A/\partial U_A) = (\partial S_B/\partial U_B)`, i.e., the two systems have the same value of $`1/T`. This is the statistical derivation of the zeroth law: thermal equilibrium equalizes temperature.

**Reading the slope.** The slope of the $`S(U)` curve at any energy is the inverse temperature. Because $`S(U)` is concave (its slope decreases as $`U` grows), a system with more energy has a *lower* temperature. For a concrete model, take $`S(U) = \sqrt{U}` (in units of $`k_B`): at $`U = 25`, $`1/T = 1/(2\sqrt{25}) = 0.1`, so $`T = 10`. Energy flows from the steeper-slope (hotter) system to the flatter-slope (cooler) one until the slopes match.

<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style="max-width:380px;display:block;margin:12px auto">
  <line x1="45" y1="170" x2="365" y2="170" stroke="#888" stroke-width="1.5"/>
  <line x1="45" y1="170" x2="45" y2="15" stroke="#888" stroke-width="1.5"/>
  <text x="355" y="188" fill="#aaa" font-size="12">U</text>
  <text x="30" y="15" fill="#aaa" font-size="12">S</text>
  <polyline fill="none" stroke="#4ecdc4" stroke-width="2.5" points="45.0,170.0 61.0,135.3 77.0,121.0 93.0,110.0 109.0,100.7 125.0,92.5 141.0,85.1 157.0,78.3 173.0,72.0 189.0,66.0 205.0,60.4 221.0,55.0 237.0,49.9 253.0,45.0 269.0,40.3 285.0,35.8 301.0,31.4 317.0,27.1 333.0,23.0 349.0,18.9 365.0,15.0"/>
  <line x1="45" y1="131.3" x2="205" y2="53.8" stroke="#f4a261" stroke-width="1.5" stroke-dasharray="5,3"/>
  <circle cx="125" cy="92.5" r="4" fill="#fff" stroke="#f4a261" stroke-width="2"/>
  <text x="150" y="72" fill="#f4a261" font-size="12">slope = 1/T</text>
  <text x="290" y="40" fill="#4ecdc4" font-size="12">S(U)</text>
</svg>

**Equilibrium of two systems.** The total entropy $`S_{\text{tot}}(U_A) = S_A(U_A) + S_B(U - U_A)` is a concave function of $`U_A` with a single maximum. At the maximum the slope vanishes, which is exactly the condition $`\partial S_A/\partial U_A = \partial S_B/\partial U_B`. For two identical systems the maximum sits at $`U_A = U/2`.

<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style="max-width:380px;display:block;margin:12px auto">
  <line x1="45" y1="170" x2="365" y2="170" stroke="#888" stroke-width="1.5"/>
  <line x1="45" y1="170" x2="45" y2="15" stroke="#888" stroke-width="1.5"/>
  <text x="350" y="188" fill="#aaa" font-size="12">U_A</text>
  <text x="30" y="15" fill="#aaa" font-size="12">S</text>
  <polyline fill="none" stroke="#4a90d9" stroke-width="1.5" points="45.0,170.0 61.0,145.6 77.0,135.6 93.0,127.8 109.0,121.3 125.0,115.5 141.0,110.3 157.0,105.6 173.0,101.1 189.0,96.9 205.0,93.0 221.0,89.2 237.0,85.6 253.0,82.2 269.0,78.9 285.0,75.7 301.0,72.6 317.0,69.6 333.0,66.7 349.0,63.8 365.0,61.1"/>
  <polyline fill="none" stroke="#f4a261" stroke-width="1.5" points="45.0,61.1 61.0,63.8 77.0,66.7 93.0,69.6 109.0,72.6 125.0,75.7 141.0,78.9 157.0,82.2 173.0,85.6 189.0,89.2 205.0,93.0 221.0,96.9 237.0,101.1 253.0,105.6 269.0,110.3 285.0,115.5 301.0,121.3 317.0,127.8 333.0,135.6 349.0,145.6 365.0,170.0"/>
  <polyline fill="none" stroke="#66bb6a" stroke-width="2.5" points="45.0,61.1 61.0,39.5 77.0,32.2 93.0,27.4 109.0,23.9 125.0,21.2 141.0,19.2 157.0,17.7 173.0,16.7 189.0,16.2 205.0,16.0 221.0,16.2 237.0,16.7 253.0,17.7 269.0,19.2 285.0,21.2 301.0,23.9 317.0,27.4 333.0,32.2 349.0,39.5 365.0,61.1"/>
  <line x1="205" y1="170" x2="205" y2="16" stroke="#ccc" stroke-width="1" stroke-dasharray="4,3"/>
  <circle cx="205" cy="16" r="4" fill="#66bb6a"/>
  <text x="55" y="150" fill="#4a90d9" font-size="11">S_A</text>
  <text x="295" y="135" fill="#f4a261" font-size="11">S_B</text>
  <text x="110" y="12" fill="#66bb6a" font-size="11">S_tot (max)</text>
  <text x="120" y="185" fill="#ccc" font-size="10">U_A* : ∂S_A/∂U_A = ∂S_B/∂U_B = 1/T</text>
</svg>

**Negative temperature.** For systems with an upper bound on energy (e.g., spin systems in a magnetic field), $`S(U)` can decrease with $`U`, giving $`T < 0`. Such a system is *hotter* than any positive-temperature system: heat flows from $`T = -1` K$` to `T = +\infty` K$` to `T = +1` K$.

> **Authoritative sources**
> - [Temperature — Wikipedia](https://en.wikipedia.org/wiki/Temperature)
> - [Schroeder, Thermal Physics, Ch. 2](https://www.oxfordacademic.com/uk/thermal-physics/9780199442952)

<details><summary>Example problem</summary>

Two identical systems each have entropy $`S(U) = a \sqrt{U}` (with $`a` a constant). They are placed in thermal contact with total energy $`U`. Find the equilibrium energy of each system and the common temperature.

<details><summary>Solution</summary>

Maximize $`S_{\text{tot}} = a(\sqrt{U_A} + \sqrt{U - U_A})`. Setting $`\partial S_{\text{tot}}/\partial U_A = 0`:

```math
\frac{a}{2\sqrt{U_A}} - \frac{a}{2\sqrt{U - U_A}} = 0 \implies U_A = U - U_A \implies U_A = U_B = \frac{U}{2}
```

The common inverse temperature is:

```math
\frac{1}{T} = \left.\frac{\partial S}{\partial U}\right|_{U/2} = \frac{a}{2\sqrt{U/2}} = \frac{a}{\sqrt{2U}}
```

so $`T = \sqrt{2U}/a`. The energy splits equally because the two systems are identical and $`S(U)` is concave.

</details>
</details>

</details>

## From microstates to the partition function

The microcanonical entropy $`S = k_B \ln W` counts states in a thin energy shell $`[E, E + \Delta E]`. The **density of states** $`\Omega(E)` is the number of states per unit energy, so $`W(E) \approx \Omega(E)\,\Delta E`. The canonical partition function is the Laplace transform of this density:

```math
Z(T,V,N) = \int_0^{\infty} \Omega(E)\, e^{-\beta E}\, dE
```

For a discrete spectrum this reduces to the sum over individual levels.

<details><summary>Details</summary>

**Step 1 — from a shell to a density.** The microcanonical count $`W(E) = \Omega(E)\,\Delta E` is only meaningful for a *thin* shell. The density of states $`\Omega(E)` strips off the arbitrary shell width $`\Delta E` and gives the number of states per unit energy. For a system with a discrete spectrum, $`\Omega(E)` is a comb of delta peaks at each level; for a macroscopic system the levels are so dense that $`\Omega(E)` is a smooth function.

**Step 2 — why a Laplace transform.** The canonical ensemble weights each energy by the Boltzmann factor $`e^{-\beta E}` (derived in [CanonicalEnsemble](../Statistical-Mechanics/CanonicalEnsemble.md)). Summing (integrating) the weighted density of states over all energies gives the partition function:

```math
Z = \int_0^{\infty} \Omega(E)\, e^{-\beta E}\, dE
```

This is exactly the **Laplace transform** of $`\Omega(E)` with transform variable $`\beta`. The Laplace transform is the tool that connects the two ensembles: the microcanonical ensemble is characterized by $`\Omega(E)` (a function of energy), and the canonical ensemble by $`Z(\beta)` (a function of inverse temperature). The transform is invertible, so no information is lost — the two descriptions are equivalent.

**Step 3 — where the integral is dominated.** The integrand $`\Omega(E)\, e^{-\beta E}` is a product of a *growing* function ($`\Omega(E)`, more states at higher energy) and a *decaying* function ($`e^{-\beta E}`, Boltzmann suppression). The product is a peaked function, and the peak location $`E^*` is the mean energy $`\langle E \rangle`. At low temperature ($`\beta` large) the peak sits near the ground state; at high temperature ($`\beta` small) it moves to higher energy.

<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style="max-width:380px;display:block;margin:12px auto">
  <line x1="45" y1="170" x2="365" y2="170" stroke="#888" stroke-width="1.5"/>
  <line x1="45" y1="170" x2="45" y2="15" stroke="#888" stroke-width="1.5"/>
  <text x="355" y="188" fill="#aaa" font-size="12">E</text>
  <text x="50" y="12" fill="#aaa" font-size="11">Ω(E)·e^(−βE)</text>
  <polygon fill="rgba(102,187,106,0.25)" points="45,170 45.0,170.0 55.7,134.9 66.3,106.5 77.0,83.9 87.7,66.1 98.3,52.5 109.0,42.4 119.7,35.3 130.3,30.7 141.0,28.2 151.7,27.4 162.3,28.1 173.0,29.9 183.7,32.7 194.3,36.2 205.0,40.3 215.7,44.8 226.3,49.7 237.0,54.7 247.7,59.9 258.3,65.1 269.0,70.4 279.7,75.5 290.3,80.6 301.0,85.6 311.7,90.5 322.3,95.2 333.0,99.7 343.7,104.0 354.3,108.2 365.0,112.1 365,170"/>
  <polyline fill="none" stroke="#66bb6a" stroke-width="2.5" points="45.0,170.0 55.7,134.9 66.3,106.5 77.0,83.9 87.7,66.1 98.3,52.5 109.0,42.4 119.7,35.3 130.3,30.7 141.0,28.2 151.7,27.4 162.3,28.1 173.0,29.9 183.7,32.7 194.3,36.2 205.0,40.3 215.7,44.8 226.3,49.7 237.0,54.7 247.7,59.9 258.3,65.1 269.0,70.4 279.7,75.5 290.3,80.6 301.0,85.6 311.7,90.5 322.3,95.2 333.0,99.7 343.7,104.0 354.3,108.2 365.0,112.1"/>
  <line x1="151.7" y1="170" x2="151.7" y2="27.4" stroke="#f4a261" stroke-width="1" stroke-dasharray="4,3"/>
  <circle cx="151.7" cy="27.4" r="4" fill="#f4a261"/>
  <text x="158" y="24" fill="#f4a261" font-size="11">peak = ⟨E⟩</text>
  <text x="235" y="150" fill="#66bb6a" font-size="12">Z = area</text>
</svg>

**Worked example (single 3D harmonic oscillator).** The energy levels are $`E_n = \hbar\omega(n + \tfrac{1}{2})`, so the density of states is a comb of delta peaks. The partition function is a geometric series:

```math
Z = \sum_{n=0}^{\infty} e^{-\beta \hbar\omega(n+1/2)} = \frac{e^{-\beta\hbar\omega/2}}{1 - e^{-\beta\hbar\omega}}
```

At high temperature ($`\beta\hbar\omega \ll 1`), $`Z \approx 1/(\beta\hbar\omega)`, and the mean energy $`\langle E \rangle = -\partial \ln Z/\partial \beta \approx k_B T` — the classical equipartition result. The full treatment, including the free energy and entropy, is in [CanonicalEnsemble](../Statistical-Mechanics/CanonicalEnsemble.md).

> **Authoritative sources**
> - [Laplace transform — Wikipedia](https://en.wikipedia.org/wiki/Laplace_transform)
> - [Partition function — Wikipedia](https://en.wikipedia.org/wiki/Partition_function_(statistical_mechanics))

<details><summary>Example problem</summary>

A system has a continuous density of states $`\Omega(E) = c\, E` (linear in energy, $`c > 0`). (a) Write the partition function as an integral. (b) Evaluate it and find the mean energy $`\langle E \rangle`.

<details><summary>Solution</summary>

(a) $`Z = \int_0^{\infty} c\, E\, e^{-\beta E}\, dE`.

(b) Using $`\int_0^{\infty} E\, e^{-\beta E}\, dE = 1/\beta^2`:

```math
Z = \frac{c}{\beta^2}, \qquad \langle E \rangle = -\frac{\partial \ln Z}{\partial \beta} = -\frac{\partial}{\partial \beta}(\ln c - 2\ln\beta) = \frac{2}{\beta} = 2 k_B T
```

The linear density of states $`\Omega(E) \propto E` is that of a 2D harmonic oscillator, whose two oscillators each contribute $`k_B T` (kinetic + potential) at high temperature, giving $`\langle E \rangle = 2 k_B T` — consistent with the result above.

</details>
</details>

</details>

## Canonical partition function

For a system in contact with a heat bath at temperature $`T` (canonical ensemble):

```math
Z(T,V,N) = \sum_i e^{-\beta E_i}, \quad \beta = \frac{1}{k_B T}
```

All thermodynamic quantities follow from $`Z`:

```math
F = -k_B T \ln Z
S = -\left(\frac{\partial F}{\partial T}\right)_{V,N}
U = -\frac{\partial \ln Z}{\partial \beta}
P = k_B T \left(\frac{\partial \ln Z}{\partial V}\right)_{T,N}
```

The Helmholtz free energy $`F` is the thermodynamic potential natural to the canonical ensemble; its role in equilibrium and stability is developed in [Thermodynamic Potentials and Equilibrium](./Thermodynamic-Potentials-and-Equilibrium.md).

**Why $`Z` works — the simplest non-trivial case.** The two-level system (levels $`E_0 = 0`, $`E_1 = \varepsilon`) is the minimal example that shows the machinery. Its partition function is $`Z = 1 + e^{-\beta\varepsilon}`. At low temperature the ground state dominates ($`Z \to 1`, $`\langle E \rangle \to 0`); at high temperature both levels are equally populated ($`Z \to 2`, $`\langle E \rangle \to \varepsilon/2`). The heat capacity $`C = \partial \langle E \rangle/\partial T` vanishes at both extremes and peaks in between — the **Schottky anomaly**. The interactive simulation below lets you sweep the temperature and watch the populations, mean energy, and heat capacity respond.

<iframe src="./Statistical-Foundations-of-Thermodynamics.simulation.html" title="Two-level system: populations, mean energy, and Schottky heat-capacity peak"></iframe>

<details><summary>Details</summary>

**Ideal gas (key result).** For $`N` non-interacting, indistinguishable particles in volume $`V`:

```math
Z_N = \frac{1}{N!}\left[\frac{V}{\lambda_T^3}\right]^N, \quad \lambda_T = \frac{h}{\sqrt{2\pi m k_B T}}
```

where $`\lambda_T` is the thermal de Broglie wavelength and the $`1/N!` (Gibbs factor) corrects for indistinguishability. From this single expression: $`PV = Nk_B T` (ideal gas law), $`U = \tfrac{3}{2}Nk_B T` (monatomic), $`C_V = \tfrac{3}{2}Nk_B`.

**Quantum correction.** When $`n\lambda_T^3 \gtrsim 1` (high density or low temperature), quantum statistics (Fermi–Dirac or Bose–Einstein) replace the classical Boltzmann factor.

The full ensemble formalism — the Boltzmann-factor derivation from a reservoir, additivity of partition functions, pressure, and the density-matrix formulation — is developed in [CanonicalEnsemble](../Statistical-Mechanics/CanonicalEnsemble.md).

> **Authoritative sources**
> - [Partition function — Wikipedia](https://en.wikipedia.org/wiki/Partition_function_(statistical_mechanics))
> - [CanonicalEnsemble](../Statistical-Mechanics/CanonicalEnsemble.md)

</details>

## Fluctuations

In the canonical ensemble, energy fluctuates around its mean:

```math
\langle (\Delta U)^2 \rangle = k_B T^2 C_V
```

For a macroscopic system ($`N \sim 10^{23}`), the relative fluctuation is:

```math
\frac{\sqrt{\langle(\Delta U)^2\rangle}}{\langle U \rangle} \sim \frac{1}{\sqrt{N}} \approx 10^{-12}
```

<details><summary>Details</summary>

**Why thermodynamics works.** The energy distribution $`P(E) = \Omega(E)e^{-\beta E}/Z` is a narrow peak around $`\langle E \rangle` with width $`\sigma_E = \sqrt{k_B T^2 C_V}`. In the thermodynamic limit ($`N \to \infty`, $`V \to \infty`, $`N/V` fixed), the relative width $`\sigma_E/\langle E \rangle \sim 1/\sqrt{N} \to 0`, so the peak becomes a delta function. This justifies treating $`U, S, T` as sharp, deterministic quantities: the first and second laws are not violated, they are the overwhelmingly probable behavior.

<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style="max-width:380px;display:block;margin:12px auto">
  <line x1="45" y1="170" x2="365" y2="170" stroke="#888" stroke-width="1.5"/>
  <line x1="45" y1="170" x2="45" y2="15" stroke="#888" stroke-width="1.5"/>
  <text x="355" y="188" fill="#aaa" font-size="12">E</text>
  <text x="25" y="15" fill="#aaa" font-size="12">P(E)</text>
  <polyline fill="none" stroke="#4a90d9" stroke-width="2.5" points="45.0,170.0 53.0,170.0 61.0,170.0 69.0,170.0 77.0,169.9 85.0,169.9 93.0,169.7 101.0,169.2 109.0,168.3 117.0,166.5 125.0,163.2 133.0,157.7 141.0,149.0 149.0,136.5 157.0,119.7 165.0,99.0 173.0,76.0 181.0,53.0 189.0,33.2 197.0,19.8 205.0,15.0 213.0,19.8 221.0,33.2 229.0,53.0 237.0,76.0 245.0,99.0 253.0,119.7 261.0,136.5 269.0,149.0 277.0,157.7 285.0,163.2 293.0,166.5 301.0,168.3 309.0,169.2 317.0,169.7 325.0,169.9 333.0,169.9 341.0,170.0 349.0,170.0 357.0,170.0 365.0,170.0"/>
  <line x1="205" y1="170" x2="205" y2="15" stroke="#66bb6a" stroke-width="1.5"/>
  <line x1="173" y1="170" x2="173" y2="76" stroke="#f4a261" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="237" y1="170" x2="237" y2="76" stroke="#f4a261" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="208" y="30" fill="#66bb6a" font-size="12">⟨E⟩</text>
  <text x="150" y="90" fill="#f4a261" font-size="11">−σ</text>
  <text x="240" y="90" fill="#f4a261" font-size="11">+σ</text>
  <text x="110" y="185" fill="#aaa" font-size="10">σ = √(k_B T² C_V),  σ/⟨E⟩ ~ 1/√N</text>
</svg>

**Small systems.** For nanoparticles, molecular motors, or single-molecule experiments ($`N \sim 10^2`–$`10^6`), the relative fluctuations are significant. The fluctuation-dissipation theorem and Jarzynski equality ($`\langle e^{-\beta W} \rangle = e^{-\beta \Delta F}`) replace the deterministic second law with statistical inequalities. These are treated in [Nonequilibrium statistical mechanics](../Statistical-Mechanics/NonequilibriumStatisticalMechanics.md).

The full derivation of the energy variance, and the related pressure and volume fluctuations (including critical opalescence), are in [CanonicalEnsemble](../Statistical-Mechanics/CanonicalEnsemble.md).

> **Authoritative sources**
> - [Fluctuation–dissipation theorem — Wikipedia](https://en.wikipedia.org/wiki/Fluctuation%E2%80%93dissipation_theorem)
> - [CanonicalEnsemble](../Statistical-Mechanics/CanonicalEnsemble.md)

</details>

## Third law from statistics

For a system with a **non-degenerate** ground state, the entropy vanishes as the temperature approaches absolute zero:

```math
T \to 0 \implies W \to 1 \implies S = k_B \ln 1 = 0
```

<details><summary>Details</summary>

**Statistical statement of the third law.** In the canonical ensemble, the probability of a state of energy $`E` is $`e^{-\beta E}/Z`. As $`T \to 0` ($`\beta \to \infty`), the Boltzmann factor $`e^{-\beta E}` suppresses every state except the ground state. If the ground state is unique (non-degenerate, $`g_0 = 1`), then $`Z \to 1` and the system is certainly in that one state: $`W \to 1`, so $`S = k_B \ln W \to 0`.

**Role of ground-state degeneracy.** If the ground state is $`g_0`-fold degenerate, then $`Z \to g_0` and $`S \to k_B \ln g_0 \neq 0`. The residual entropy $`S_0 = k_B \ln g_0` is the statistical content of the third law's "perfect crystal" caveat: a perfectly ordered crystal has a unique ground state ($`g_0 = 1`), while a disordered solid (e.g., ice, with many equivalent proton arrangements) retains a finite residual entropy. This connects to the thermodynamic statement in [Second Law and Entropy](./Second-Law-and-Entropy.md).

**Connection to the heat capacity.** The third law is consistent with the low-temperature behavior of the heat capacity: for a non-degenerate system, $`C \to 0` as $`T \to 0` (as seen in the two-level Schottky anomaly and the harmonic oscillator), so no entropy is "left behind" at zero temperature. For the two-level system, at $`k_B T = \varepsilon` ($`\beta\varepsilon = 1`), $`S/k_B = \ln(1+e^{-1}) + 1/(e+1) \approx 0.582` — already well below the high-temperature limit $`k_B \ln 2 \approx 0.693\, k_B`.

<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style="max-width:380px;display:block;margin:12px auto">
  <line x1="45" y1="170" x2="365" y2="170" stroke="#888" stroke-width="1.5"/>
  <line x1="45" y1="170" x2="45" y2="15" stroke="#888" stroke-width="1.5"/>
  <text x="335" y="188" fill="#aaa" font-size="11">k_B T/ε</text>
  <text x="15" y="15" fill="#aaa" font-size="11">S/k_B</text>
  <line x1="45" y1="16.1" x2="365" y2="16.1" stroke="#f4a261" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="290" y="13" fill="#f4a261" font-size="11">ln 2</text>
  <polyline fill="none" stroke="#4ecdc4" stroke-width="2.5" points="45.0,170.0 53.0,169.3 61.0,150.1 69.0,116.8 77.0,89.1 85.0,69.8 93.0,56.6 101.0,47.5 109.0,41.1 117.0,36.4 125.0,32.9 133.0,30.2 141.0,28.2 149.0,26.5 157.0,25.2 165.0,24.1 173.0,23.2 181.0,22.5 189.0,21.9 197.0,21.3 205.0,20.9 213.0,20.5 221.0,20.1 229.0,19.8 237.0,19.6 245.0,19.3 253.0,19.1 261.0,18.9 269.0,18.8 277.0,18.6 285.0,18.5 293.0,18.3 301.0,18.2 309.0,18.1 317.0,18.0 325.0,18.0 333.0,17.9 341.0,17.8 349.0,17.7 357.0,17.7 365.0,17.6"/>
  <text x="60" y="160" fill="#4ecdc4" font-size="11">S → 0 as T → 0</text>
</svg>

> **Authoritative sources**
> - [Third law of thermodynamics — Wikipedia](https://en.wikipedia.org/wiki/Third_law_of_thermodynamics)
> - [Second Law and Entropy](./Second-Law-and-Entropy.md)

<details><summary>Example problem</summary>

A system has a non-degenerate ground state at $`E_0 = 0` and a single excited state at $`E_1 = \varepsilon`. (a) Find $`S(T)` in the canonical ensemble. (b) Show that $`S \to 0` as $`T \to 0` and $`S \to k_B \ln 2` as $`T \to \infty`.

<details><summary>Solution</summary>

(a) With $`Z = 1 + e^{-\beta\varepsilon}`:

```math
S = k_B\left(\ln Z + \beta\langle E \rangle\right) = k_B\left[\ln(1+e^{-\beta\varepsilon}) + \frac{\beta\varepsilon}{e^{\beta\varepsilon}+1}\right]
```

(b) As $`T \to 0` ($`\beta\varepsilon \to \infty`): $`e^{-\beta\varepsilon} \to 0`, so $`\ln(1+e^{-\beta\varepsilon}) \to 0` and $`\beta\varepsilon/(e^{\beta\varepsilon}+1) \to 0`, giving $`S \to 0`. As $`T \to \infty` ($`\beta\varepsilon \to 0`): $`\ln(1+e^{-\beta\varepsilon}) \to \ln 2` and $`\beta\varepsilon/(e^{\beta\varepsilon}+1) \to 0`, giving $`S \to k_B \ln 2`. The low-temperature limit $`S \to 0` is the statistical third law for this non-degenerate two-level system.

</details>
</details>

</details>

## Quizz

<details><summary>Quizz</summary>

A three-dimensional harmonic oscillator has energy levels $`E_{n_x n_y n_z} = \hbar\omega\left(n_x + n_y + n_z + \tfrac{3}{2}\right)`, $`n_i = 0, 1, 2, \ldots`. It is in contact with a heat bath at temperature $`T`.

(a) Write the partition function $`Z` as a product of three identical 1D sums and evaluate it.
(b) Find the mean energy $`\langle E \rangle`.
(c) Find the heat capacity $`C_V` and show that $`C_V \to 3 k_B` as $`T \to \infty` and $`C_V \to 0` as $`T \to 0`.

<details><summary>Solution</summary>

(a) The 3D partition function factorizes into three independent 1D oscillators:

```math
Z = \left(\sum_{n=0}^{\infty} e^{-\beta\hbar\omega(n+1/2)}\right)^3 = \left(\frac{e^{-\beta\hbar\omega/2}}{1 - e^{-\beta\hbar\omega}}\right)^3
```

(b) The mean energy is three times the 1D result:

```math
\langle E \rangle = 3\left(\frac{\hbar\omega}{2} + \frac{\hbar\omega}{e^{\beta\hbar\omega}-1}\right)
```

(c) The heat capacity is:

```math
C_V = 3 k_B (\beta\hbar\omega)^2 \frac{e^{\beta\hbar\omega}}{(e^{\beta\hbar\omega}-1)^2}
```

- **High temperature** ($`\beta\hbar\omega \ll 1`): expand $`e^{\beta\hbar\omega} \approx 1 + \beta\hbar\omega`, so $`C_V \approx 3 k_B (\beta\hbar\omega)^2/(\beta\hbar\omega)^2 = 3 k_B`. This is the classical equipartition result: three oscillators, each with a kinetic and a potential quadratic term, contribute $`3 \times k_B = 3 k_B`.
- **Low temperature** ($`\beta\hbar\omega \gg 1`): $`e^{\beta\hbar\omega} \gg 1`, so $`C_V \approx 3 k_B (\beta\hbar\omega)^2 e^{-\beta\hbar\omega} \to 0`. The oscillator is frozen in its ground state, consistent with the statistical third law.

</details>
</details>
