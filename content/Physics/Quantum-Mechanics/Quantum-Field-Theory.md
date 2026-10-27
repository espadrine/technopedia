# Quantum Field Theory

Quantum field theory (QFT) is the relativistic extension of quantum mechanics in which particles are excitations of underlying fields. It is relevant whenever particle creation and annihilation, relativistic effects, or the quantum description of forces are important: particle physics, the quantum electrodynamics of light-matter interaction, the quantum vacuum, and the mathematical framework underlying the [Standard Model](../Standard-Model/Readme.md). QFT provides the general formalism (path integrals, Feynman diagrams, renormalization, gauge symmetry) on which the specific particle content of the Standard Model is built.

## Relativistic quantum fields

**Definition.** A quantum field $`\hat{\phi}(x)` is an operator-valued distribution on spacetime. Its excitations (particles) have energy-momentum $`E^2 = p^2c^2 + m^2c^4`. The field is expanded in creation and annihilation operators: $`\hat{\phi}(x) = \int\frac{d^3p}{(2\pi)^3}\frac{1}{\sqrt{2\omega_\mathbf{p}}}\left(\hat{a}_\mathbf{p}\,e^{-ip\cdot x} + \hat{a}_\mathbf{p}^\dagger\,e^{ip\cdot x}\right)` where $`p\cdot x = \omega t - \mathbf{p}\cdot\mathbf{x}`.

<details><summary>Details</summary>

### From particles to fields

In non-relativistic QM (see [Quantum dynamics](./Quantum-Dynamics.md)), the number of particles is fixed and the state lives in a tensor product of single-particle Hilbert spaces. Special relativity changes this: $`E = mc^2` means energy can convert to mass, so particle number is not conserved. The natural object is a field defined at every point in spacetime, whose quanta are the particles.

**Step 1: The Klein-Gordon field (spin-0).**

The relativistic wave equation $`(\partial_t^2/c^2 - \nabla^2 + m^2c^2/\hbar^2)\phi = 0` is promoted to an operator equation. The field $`\hat{\phi}(x)` is expanded in plane waves with creation ($`\hat{a}^\dagger`), and annihilation ($`\hat{a}`) operators. The commutation relations $`[\hat{\phi}(x), \hat{\pi}(y)] = i\hbar\delta^3(x-y)` ensure the correct particle interpretation.

*Worked example: creating a particle.* Applying the creation operator to the vacuum gives a one-particle state:

$`\hat{a}_\mathbf{p}^\dagger\,|0\rangle = |\mathbf{p}\rangle`

The state $`|\mathbf{p}\rangle` has definite momentum $`\mathbf{p}` and energy $`\omega_\mathbf{p} = \sqrt{|\mathbf{p}|^2 + m^2}`. The field operator $`\hat{\phi}(x)` itself is a superposition of all possible momenta, so acting on the vacuum it creates a spherically symmetric wave packet:

$`\hat{\phi}(x)|0\rangle = \int\frac{d^3p}{(2\pi)^3\sqrt{2\omega_\mathbf{p}}}\,e^{-ip\cdot x}\,|\mathbf{p}\rangle`

This is the bridge to the next section: the two-point correlation function $`\langle 0|\hat{\phi}(x)\hat{\phi}(y)|0\rangle` (the Feynman propagator) encodes the amplitude for a particle created at $`y` to be absorbed at $`x` — it is the internal line in a Feynman diagram.

**Step 2: The Dirac field (spin-½).**

For fermions, the field $`\hat{\psi}(x)` satisfies the Dirac equation $`(i\hbar\gamma^\mu\partial_\mu - mc)\hat{\psi} = 0`. The anticommutation relations (not commutation) enforce the Pauli exclusion principle at the field level. The negative-energy solutions of the Dirac equation are reinterpreted as antiparticles (positrons), a prediction confirmed by the 1932 discovery of the positron.

*Spin-statistics theorem.* In relativistic QFT, Lorentz invariance combined with microcausality (commutators/anticommutators vanish at spacelike separation) forces a unique connection between spin and statistics: integer-spin fields must be quantized with commutators (bosons), and half-integer-spin fields with anticommutators (fermions). This is the spin-statistics theorem, which underlies the Bose/Fermi statistics used in [Quantum many-body](./Quantum-Many-Body.md).

**Step 3: The gauge field (spin-1).**

For massless spin-1 particles (photons, gluons), the field is a four-vector $`\hat{A}_\mu(x)` satisfying the wave equation in a gauge-fixed form. The gauge symmetry $`A_\mu \to A_\mu + \partial_\mu\Lambda` reflects the redundancy in the description: only the field strength $`F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu` is physical.

**Example problem.**

<details><summary>Problem</summary>

A free scalar field of mass $`m` has the Lagrangian density $`\mathcal{L} = \frac{1}{2}(\partial_\mu\phi)(\partial^\mu\phi) - \frac{1}{2}m^2\phi^2` (in units $`c=\hbar=1`). Find the equation of motion and show that the field expansion $`\hat{\phi}(x) = \int\frac{d^3p}{(2\pi)^3\sqrt{2\omega_\mathbf{p}}}(\hat{a}_\mathbf{p}e^{-ipx}+\hat{a}_\mathbf{p}^\dagger e^{ipx})` satisfies it.

<details><summary>Solution</summary>

The Euler-Lagrange equation gives: $`\partial_\mu\partial^\mu\phi + m^2\phi = 0`, i.e., $`(\Box + m^2)\phi = 0` (Klein-Gordon equation).

Substituting the plane wave $`e^{-ipx}`: $`(\Box + m^2)e^{-ipx} = (-p^2 + m^2)e^{-ipx} = 0` requires $`p^2 = m^2`, i.e., $`\omega^2 = |\mathbf{p}|^2 + m^2 = \omega_\mathbf{p}^2`. Each mode in the expansion satisfies the on-shell condition, so the full field satisfies the equation. ✓

</details>
</details>

</details>

## Gauge symmetry and the quantum description of forces

**Definition.** A gauge theory is a QFT with a local symmetry: the Lagrangian is invariant under field-dependent transformations $`\psi(x) \to e^{ie\alpha(x)\hat{T}}\psi(x)` where $`\hat{T}` are generators of a Lie group. Gauge invariance requires the introduction of gauge fields (connections) that transform inhomogeneously, and it determines the form of the interactions. The gauge bosons are the force carriers.

<details><summary>Details</summary>

### Why gauge symmetry is fundamental

**Step 1: From global to local symmetry.**

A global phase rotation $`\psi \to e^{ie\alpha}\psi` of the Dirac field is a symmetry of the free Lagrangian. Demanding that $`\alpha` can depend on spacetime ($`\alpha(x)`) — local gauge invariance — forces the introduction of a gauge field $`A_\mu` that transforms as $`A_\mu \to A_\mu + \partial_\mu\alpha`. The covariant derivative $`D_\mu = \partial_\mu + ieA_\mu` replaces the ordinary derivative, and the interaction $`-e\bar{\psi}\gamma^\mu\psi A_\mu` is determined by the symmetry.

> **Authoritative sources**
> - [Yang & Mills, "Conservation of Isotopic Spin and Isotopic Gauge Invariance" (1954)](https://en.wikipedia.org/wiki/Yang%E2%80%93Mills_theory)

**Step 2: Non-Abelian gauge theories.**

For the weak and strong interactions, the gauge group is non-Abelian (SU(2), SU(3)). The gauge fields self-interact (gluons carry color charge, W bosons carry weak isospin), leading to the rich structure of QCD and the electroweak theory. The field strength tensor acquires a nonlinear term: $`F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu - ig[A_\mu, A_\nu]`.

**Step 3: Spontaneous symmetry breaking.**

The Higgs field acquires a vacuum expectation value $`v \approx 246` GeV. Fermion masses arise from their Yukawa couplings to the Higgs: $`m_f = y_f v/\sqrt{2}`. The W and Z boson masses arise from the gauge-Higgs kinetic term $`|D_\mu H|^2`: when the Higgs field takes its vacuum value, this term generates mass terms $`m_W = gv/2` and $`m_Z = \sqrt{g^2+g'^2}\,v/2` for the gauge bosons.

> **Authoritative sources**
> - [Higgs, "Broken Symmetries and the Masses of Gauge Bosons" (1964)](https://en.wikipedia.org/wiki/Higgs_mechanism)
> - [Englert & Brout, "Broken Symmetry and the Mass of Gauge Vector Mesons" (1964)](https://en.wikipedia.org/wiki/Higgs_mechanism)

**Example problem.**

<details><summary>Problem</summary>

Show that the covariant derivative $`D_\mu = \partial_\mu + ieA_\mu` transforms correctly under the local U(1) gauge transformation $`\psi \to e^{ie\alpha(x)}\psi`, $`A_\mu \to A_\mu + \partial_\mu\alpha`.

<details><summary>Solution</summary>

We need $`D_\mu\psi \to e^{ie\alpha(x)}D_\mu\psi`.

$`D_\mu'\psi' = (\partial_\mu + ieA_\mu')\,e^{ie\alpha}\psi`

$`= (\partial_\mu e^{ie\alpha})\psi + e^{ie\alpha}\partial_\mu\psi + ie(A_\mu + \partial_\mu\alpha)e^{ie\alpha}\psi`

$`= ie\cdot ie(\partial_\mu\alpha)e^{ie\alpha}\psi + e^{ie\alpha}\partial_\mu\psi + ieA_\mu e^{ie\alpha}\psi + ie(\partial_\mu\alpha)e^{ie\alpha}\psi`

$`= -e(\partial_\mu\alpha)e^{ie\alpha}\psi + e^{ie\alpha}\partial_\mu\psi + ieA_\mu e^{ie\alpha}\psi + ie(\partial_\mu\alpha)e^{ie\alpha}\psi`

$`= e^{ie\alpha}(\partial_\mu + ieA_\mu)\psi = e^{ie\alpha}D_\mu\psi`. ✓

The gauge transformation of $`A_\mu` precisely cancels the inhomogeneous term from differentiating $`e^{ie\alpha(x)}`.

</details>
</details>

</details>

## Feynman diagrams and perturbation theory

**Definition.** A Feynman diagram is a graphical representation of a term in the perturbative expansion of an S-matrix element. Each diagram corresponds to a mathematical expression: vertices give coupling constants, internal lines give propagators $`i/(p^2-m^2+i\epsilon)`, external lines give wavefunctions, and loops give momentum integrals. The S-matrix is $`\hat{S} = \mathcal{T}\exp\left(-i\int d^4x\,\mathcal{L}_{\text{int}}\right)`, expanded order by order in the coupling.

<details><summary>Details</summary>

### Computing scattering amplitudes

In QFT, the fundamental question is: given incoming particles, what are the probabilities for various outgoing particles? The answer is encoded in the S-matrix, computed as a perturbative series in the coupling constant. The interaction Lagrangian (e.g., $`\mathcal{L}_{\text{int}} = -e\bar{\psi}\gamma^\mu\psi A_\mu` for QED) is fixed by the gauge symmetry discussed in the previous section.

> **Authoritative sources**
> - [Feynman, "The Theory of Positrons" (1949)](https://en.wikipedia.org/wiki/Feynman_diagram)
> - [Dyson, "The Radiation Theories of Tomonaga, Schwinger, and Feynman" (1949)](https://en.wikipedia.org/wiki/Feynman_diagram)
> - [Schwinger, "On the Quantum Mechanics of Slow Electrons" (1948)](https://en.wikipedia.org/wiki/Feynman_diagram)

**Step 1: The interaction Lagrangian.**

For quantum electrodynamics (QED), $`\mathcal{L}_{\text{int}} = -e\bar{\psi}\gamma^\mu\psi A_\mu`. Each vertex in a Feynman diagram corresponds to one factor of $`-ie\gamma^\mu`, one photon line, and two fermion lines. This vertex structure is a direct consequence of the U(1) gauge symmetry (see the previous section).

**Step 2: Feynman rules.**

- Each vertex: factor $`-ie\gamma^\mu` and a momentum-conserving $`\delta^4`
- Each internal fermion line: propagator $`i(\not{p}+m)/(p^2-m^2+i\epsilon)`
- Each internal photon line: propagator $`-ig_{\mu\nu}/(p^2+i\epsilon)`
- Each loop: integral $`\int d^4p/(2\pi)^4`
- Each external fermion: spinor $`u(p)` or $`\bar{u}(p)`
- Each external photon: polarization vector $`\epsilon_\mu`

**Step 3: Example — electron-muon scattering (tree level).**

$`e^-\mu^- \to e^-\mu^-` proceeds by single-photon exchange (t-channel). The amplitude is:

$`\mathcal{M} = \frac{e^2}{q^2}\bar{u}(p_3)\gamma^\mu u(p_1)\cdot\bar{u}(p_4)\gamma_\mu u(p_2)`

where $`q = p_1 - p_3` is the momentum transfer. This is the relativistic generalization of Rutherford scattering.

<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:500px">
  <line x1="50" y1="60" x2="250" y2="60" stroke="#2563eb" stroke-width="2"/>
  <line x1="250" y1="60" x2="450" y2="60" stroke="#2563eb" stroke-width="2"/>
  <polygon points="140,55 150,60 140,65" fill="#2563eb"/>
  <polygon points="340,55 350,60 340,65" fill="#2563eb"/>
  <line x1="50" y1="140" x2="250" y2="140" stroke="#dc2626" stroke-width="2"/>
  <line x1="250" y1="140" x2="450" y2="140" stroke="#dc2626" stroke-width="2"/>
  <polygon points="140,135 150,140 140,145" fill="#dc2626"/>
  <polygon points="340,135 350,140 340,145" fill="#dc2626"/>
  <path d="M250,60 Q260,75 250,90 Q240,105 250,120 Q260,135 250,140" stroke="#16a34a" stroke-width="2" fill="none"/>
  <text x="30" y="65" font-size="14" fill="#2563eb">e⁻</text>
  <text x="455" y="65" font-size="14" fill="#2563eb">e⁻</text>
  <text x="30" y="145" font-size="14" fill="#dc2626">μ⁻</text>
  <text x="455" y="145" font-size="14" fill="#dc2626">μ⁻</text>
  <text x="255" y="105" font-size="13" fill="#16a34a">γ</text>
  <text x="180" y="30" font-size="13" fill="#333">t-channel photon exchange</text>
  <text x="100" y="50" font-size="11" fill="#555">p₁</text>
  <text x="350" y="50" font-size="11" fill="#555">p₃</text>
  <text x="100" y="160" font-size="11" fill="#555">p₂</text>
  <text x="350" y="160" font-size="11" fill="#555">p₄</text>
</svg>

**Step 4: The φ⁴ contact vertex.**

In $`\phi^4` theory ($`\mathcal{L}_{\text{int}} = -\lambda\phi^4/4!`), the interaction is a four-point contact: all four external particles meet at a single vertex with no internal lines. The tree-level $`2\to 2` amplitude is simply $`\mathcal{M} = -i\lambda`.

<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="max-width:300px">
  <circle cx="150" cy="100" r="6" fill="#7c3aed"/>
  <line x1="150" y1="100" x2="50" y2="40" stroke="#333" stroke-width="2"/>
  <line x1="150" y1="100" x2="250" y2="40" stroke="#333" stroke-width="2"/>
  <line x1="150" y1="100" x2="50" y2="160" stroke="#333" stroke-width="2"/>
  <line x1="150" y1="100" x2="250" y2="160" stroke="#333" stroke-width="2"/>
  <text x="30" y="35" font-size="13" fill="#333">φ</text>
  <text x="255" y="35" font-size="13" fill="#333">φ</text>
  <text x="30" y="175" font-size="13" fill="#333">φ</text>
  <text x="255" y="175" font-size="13" fill="#333">φ</text>
  <text x="130" y="125" font-size="12" fill="#7c3aed">−iλ</text>
  <text x="80" y="195" font-size="13" fill="#333">φ⁴ contact vertex</text>
</svg>

**Example problem.**

<details><summary>Problem</summary>

In $`\phi^4` theory ($`\mathcal{L}_{\text{int}} = -\lambda\phi^4/4!`), draw the tree-level diagram for $`2\to 2` scattering and write the corresponding amplitude.

<details><summary>Solution</summary>

In $`\phi^4` theory, the vertex is a four-point contact interaction. The tree-level $`2\to 2` scattering is a single vertex with no internal lines — there is only one diagram. The amplitude is:

$`\mathcal{M} = -i\lambda`

This is the simplest possible scattering: the four external particles meet at a single point. The cross-section is $`d\sigma/d\Omega = \lambda^2/(64\pi^2 s)` (in the center-of-mass frame, for massless particles).

(Contrast with $`\phi^3` theory, where the tree-level $`2\to 2` amplitude has three diagrams: s-channel, t-channel, and u-channel, each with an internal propagator.)

</details>
</details>

</details>

## Renormalization

**Definition.** Renormalization is the procedure of absorbing the infinities that arise in loop diagrams into a redefinition of the bare parameters (mass, coupling, field normalization) of the Lagrangian. The renormalized theory makes finite predictions in terms of measured (physical) parameters. A theory is renormalizable if only a finite number of parameters need to be redefined; the Standard Model is renormalizable.

<details><summary>Details</summary>

### Why loops diverge and how to handle them

**Step 1: The origin of divergences.**

Loop diagrams involve integrals over internal momenta $`\int d^4p/(2\pi)^4`. For large $`p`, the integrand falls too slowly, and the integral diverges (UV divergence).

*Power counting for the electron self-energy.* The one-loop electron self-energy in QED has the structure:

$`\Sigma(p) \propto e^2 \int^\Lambda \frac{d^4k}{(2\pi)^4}\frac{\gamma^\mu(\not{p}-\not{k}+m)\gamma_\mu}{[(p-k)^2-m^2]\,k^2}`

For large loop momentum $`k \gg m, p`: the numerator scales as $`k` (from $`\not{k}` in the fermion propagator), the denominator as $`k^4` (two propagators, each $`\sim k^2`), so the integrand scales as $`1/k^3`. The measure $`d^4k \sim k^3\,dk` gives:

$`\Sigma(p) \sim e^2 \int^\Lambda \frac{k^3\,dk}{k^3} = e^2 \int^\Lambda \frac{dk}{k} \sim e^2 \ln\Lambda`

The divergence is logarithmic. (A naive estimate $`\int d^4p/p^2 \sim \Lambda^2` would suggest a quadratic divergence, but the actual numerator structure reduces the degree of divergence.)

<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" style="max-width:400px">
  <line x1="30" y1="90" x2="150" y2="90" stroke="#2563eb" stroke-width="2"/>
  <polygon points="80,85 90,90 80,95" fill="#2563eb"/>
  <line x1="250" y1="90" x2="370" y2="90" stroke="#2563eb" stroke-width="2"/>
  <polygon points="300,85 310,90 300,95" fill="#2563eb"/>
  <path d="M150,90 C150,40 250,40 250,90" stroke="#2563eb" stroke-width="2" fill="none"/>
  <polygon points="195,52 205,55 198,62" fill="#2563eb"/>
  <path d="M150,90 C150,140 250,140 250,90" stroke="#16a34a" stroke-width="2" fill="none"/>
  <circle cx="150" cy="90" r="4" fill="#333"/>
  <circle cx="250" cy="90" r="4" fill="#333"/>
  <text x="10" y="95" font-size="13" fill="#2563eb">e⁻</text>
  <text x="375" y="95" font-size="13" fill="#2563eb">e⁻</text>
  <text x="185" y="35" font-size="12" fill="#2563eb">k</text>
  <text x="185" y="155" font-size="12" fill="#16a34a">γ</text>
  <text x="100" y="175" font-size="13" fill="#333">One-loop electron self-energy (logarithmic divergence)</text>
</svg>

**Step 2: Regularization.**

Introduce a cutoff $`\Lambda` (or dimensional regularization: $`d = 4-2\epsilon` dimensions) to make the integral finite. The result depends on $`\Lambda` (or $`1/\epsilon` poles).

**Step 3: Renormalization.**

Write the bare parameters in terms of physical (measured) parameters plus counterterms: $`m_0 = m + \delta m`, $`e_0 = e + \delta e`, $`\phi_0 = \sqrt{Z}\,\phi`. Choose the counterterms to cancel the divergences. The remaining finite part depends on the renormalization scale $`\mu`, and the coupling "runs" with energy: $`\alpha(\mu)` is smaller at high energies (asymptotic freedom for QCD) or larger (for QED).

> **Authoritative sources**
> - [Wilson, "Renormalization Group and Critical Phenomena" (1973)](https://en.wikipedia.org/wiki/Renormalization_group)

**Step 4: The renormalization group.**

The scale dependence of the coupling is governed by the beta function: $`\beta(e) = \mu\,de/d\mu`. For QED (per charged fermion flavor): $`\beta(e) = e^3/(12\pi^2) > 0`, meaning the coupling grows at high energies (the charge is less screened at short distances). For QCD: $`\beta(g) = -g^3(11N_c-2n_f)/(48\pi^2) < 0` (for $`n_f < 11N_c/2`), meaning the coupling decreases at high energies — asymptotic freedom, discovered in 1973 by Gross, Politzer, and Wilczek (Nobel Prize in Physics, 2004).

<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="max-width:500px">
  <line x1="60" y1="240" x2="460" y2="240" stroke="#333" stroke-width="1.5"/>
  <line x1="60" y1="240" x2="60" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="250" y="270" font-size="13" fill="#333" text-anchor="middle">ln(μ / μ₀)  →</text>
  <text x="20" y="130" font-size="13" fill="#333" text-anchor="middle" transform="rotate(-90,20,130)">α(μ)</text>
  <path d="M60,200 Q150,190 250,160 Q350,120 450,50" stroke="#2563eb" stroke-width="2.5" fill="none"/>
  <text x="390" y="45" font-size="12" fill="#2563eb">α_QED(μ) ↑</text>
  <path d="M60,80 Q150,120 250,170 Q350,210 450,230" stroke="#dc2626" stroke-width="2.5" fill="none"/>
  <text x="370" y="225" font-size="12" fill="#dc2626">α_QCD(μ) ↓</text>
  <text x="250" y="15" font-size="13" fill="#333" text-anchor="middle">Running coupling: QED (screening) vs QCD (asymptotic freedom)</text>
  <line x1="160" y1="240" x2="160" y2="245" stroke="#333"/>
  <line x1="260" y1="240" x2="260" y2="245" stroke="#333"/>
  <line x1="360" y1="240" x2="360" y2="245" stroke="#333"/>
  <text x="160" y="255" font-size="10" fill="#555" text-anchor="middle">1</text>
  <text x="260" y="255" font-size="10" fill="#555" text-anchor="middle">2</text>
  <text x="360" y="255" font-size="10" fill="#555" text-anchor="middle">3</text>
</svg>

**Physical significance.**

Renormalization is not a mathematical trick — it reflects the fact that the effective coupling between particles depends on the distance (energy) scale at which they interact. The "charge" of an electron measured at long distance (low energy) is different from the "bare" charge at short distance (high energy) due to vacuum polarization (virtual electron-positron pairs screening the charge). In QCD, the opposite effect occurs: gluon self-interactions cause anti-screening, so the strong coupling decreases at short distances (high energies).

**Example problem.**

<details><summary>Problem</summary>

In QED, the running fine-structure constant is $`\alpha(Q^2) = \alpha(0)/(1 - \Delta\alpha(Q^2))` where $`\Delta\alpha \approx \frac{\alpha}{3\pi}\ln(Q^2/m_e^2)` (one-loop, electron contribution only). Estimate $`\alpha` at the Z-boson mass scale $`Q = m_Z = 91` GeV.

<details><summary>Solution</summary>

$`\ln(Q^2/m_e^2) = \ln((91\times10^3)^2/(0.511)^2) = \ln(3.2\times10^{10}) \approx 24.2`

$`\Delta\alpha \approx \frac{1/137}{3\pi}\times 24.2 \approx \frac{24.2}{1290} \approx 0.019`

$`\alpha(m_Z^2) \approx (1/137)/(1-0.019) \approx 1/134`

(The actual measured value is $`\alpha(m_Z^2) \approx 1/127.9`. The electron-only one-loop estimate gives $`\approx 1/134` and captures only about a third of the total shift; the remainder comes from muon and tau loops, quark contributions, and higher-order corrections.)

</details>
</details>

</details>

## The path integral formulation

**Definition.** The QFT path integral (or functional integral) expresses the generating functional of all correlation functions as an integral over all field configurations: $`Z[J] = \int \mathcal{D}\phi\; e^{iS[\phi] + i\int J\phi}`. The $`n`-point correlation functions are obtained by functional differentiation of $`Z[J]` with respect to the source $`J`.

<details><summary>Details</summary>

### From the path integral to Feynman diagrams

**Step 1: The generating functional.**

The path integral over field configurations $`\phi(x)` is:

$`Z[J] = \int \mathcal{D}\phi\; \exp\left[i\int d^4x\left(\mathcal{L}_0 + \mathcal{L}_{\text{int}} + J\phi\right)\right]`

where $`\mathcal{L}_0` is the free Lagrangian and $`J(x)` is an external source. The $`n`-point Green's functions are:

$`G^{(n)}(x_1,\ldots,x_n) = \frac{1}{i^n}\frac{\delta^n Z[J]}{\delta J(x_1)\cdots\delta J(x_n)}\bigg|_{J=0}`

For the free theory, $`Z[J]` is a Gaussian functional integral and can be evaluated exactly, giving $`G^{(2)} = \Delta_F(x-y)` (the Feynman propagator). Interactions are handled by expanding $`e^{iS_{\text{int}}}` in a power series — this is the origin of the perturbative expansion and Feynman diagrams.

This is the field-theoretic generalization of the path integral in [Quantum dynamics](./Quantum-Dynamics.md), where one integrates over particle trajectories rather than field configurations.

**Step 2: Wick rotation and connection to statistical mechanics.**

For Euclidean (imaginary-time) path integrals, set $`t \to -i\tau` (Wick rotation). The action becomes $`S_E = \int d^4x_E\;\mathcal{L}_E` with $`\mathcal{L}_E` positive-definite for stable theories, and the path integral becomes:

$`Z_E = \int \mathcal{D}\phi\; e^{-S_E[\phi]}`

This has the same form as the partition function in [Thermodynamics](../Thermodynamics/Readme.md): $`Z = \text{Tr}\,e^{-\beta H}`. The Euclidean path integral is the bridge between QFT and statistical mechanics, and it is the basis of lattice QFT computations.

**Example problem.**

<details><summary>Problem</summary>

For a free scalar field, show that the two-point function $`\langle 0|\hat{\phi}(x)\hat{\phi}(y)|0\rangle` equals the Feynman propagator $`\Delta_F(x-y) = \int\frac{d^4p}{(2\pi)^4}\frac{i}{p^2-m^2+i\epsilon}e^{-ip(x-y)}`.

<details><summary>Solution</summary>

Using the field expansion $`\hat{\phi}(x) = \int\frac{d^3p}{(2\pi)^3\sqrt{2\omega_\mathbf{p}}}(\hat{a}_\mathbf{p}e^{-ipx}+\hat{a}_\mathbf{p}^\dagger e^{ipx})` and the commutation relation $`[\hat{a}_\mathbf{p},\hat{a}_\mathbf{q}^\dagger] = (2\pi)^3\delta^3(\mathbf{p}-\mathbf{q})`:

$`\langle 0|\hat{\phi}(x)\hat{\phi}(y)|0\rangle = \int\frac{d^3p\,d^3q}{(2\pi)^6\sqrt{4\omega_\mathbf{p}\omega_\mathbf{q}}}\langle 0|(\hat{a}_\mathbf{p}e^{-ipx}+\hat{a}_\mathbf{p}^\dagger e^{ipx})(\hat{a}_\mathbf{q}e^{-iqy}+\hat{a}_\mathbf{q}^\dagger e^{iqy})|0\rangle`

Only the $`\hat{a}_\mathbf{p}\hat{a}_\mathbf{q}^\dagger` term survives (the vacuum has no particles to annihilate, and $`\hat{a}^\dagger|0\rangle` is killed by $`\langle 0|\hat{a}`):

$`= \int\frac{d^3p}{(2\pi)^3 2\omega_\mathbf{p}}\,e^{-ip(x-y)}`

Extending to four-dimensional momentum with $`\omega = \pm\sqrt{\mathbf{p}^2+m^2}` and closing the contour gives:

$`\Delta_F(x-y) = \int\frac{d^4p}{(2\pi)^4}\frac{i}{p^2-m^2+i\epsilon}e^{-ip(x-y)}` ✓

</details>
</details>

</details>

## The quantum vacuum

**Definition.** The quantum vacuum $`|0\rangle` is the lowest-energy state of a quantum field, but it is not empty: it contains zero-point fluctuations with energy $`E_0 = \frac{1}{2}\hbar\omega` per mode. These fluctuations have observable consequences: virtual particles in loop diagrams, the Casimir effect, and the Lamb shift.

<details><summary>Details</summary>

### The vacuum is not nothing

**Step 1: Zero-point energy.**

Each mode of a quantum field is a harmonic oscillator with ground-state energy $`\frac{1}{2}\hbar\omega`. Summing over all modes:

$`E_0 = \sum_\mathbf{k}\frac{1}{2}\hbar\omega_\mathbf{k} \to \int\frac{d^3k}{(2\pi)^3}\frac{1}{2}\hbar\omega_\mathbf{k}`

This integral diverges (UV), but *differences* in vacuum energy are physical. The Casimir effect measures the change in vacuum energy when boundary conditions are altered (e.g., two conducting plates separated by distance $`a`):

$`F_{\text{Casimir}} = -\frac{\pi^2\hbar c}{240\,a^4}` per unit area

**Step 2: Virtual particles.**

In perturbation theory, internal lines in Feynman diagrams represent virtual particles: they are off-shell ($`p^2 \neq m^2`), exist for a time $`\Delta t \sim \hbar/\Delta E` (consistent with the uncertainty principle), and mediate interactions. The vacuum polarization of QED — virtual $`e^+e^-` pairs surrounding a charge — is the physical origin of the running coupling discussed in the renormalization section.

**Step 3: Observable consequences.**

- **Casimir effect:** attractive force between uncharged conducting plates, measured to ~5% accuracy (Lamoreaux, 1997).
- **Lamb shift:** the $`2S_{1/2}` and $`2P_{1/2}` levels of hydrogen, degenerate in Dirac theory, are split by vacuum fluctuations and self-energy (measured by Lamb and Retherford, 1947).
- **Spontaneous emission:** an excited atom decays even in empty space because the vacuum electromagnetic field provides a perturbation that couples the excited state to the ground state plus a photon.

**Example problem.**

<details><summary>Problem</summary>

Two parallel conducting plates of area $`A` are separated by distance $`a`. Estimate the Casimir force per unit area using the mode-counting argument: the change in zero-point energy is $`\Delta E \propto A \int_{k_{\min}}^{\Lambda} dk\,k^2 \cdot \frac{1}{2}\hbar c k` where the minimum mode frequency is set by the plate separation ($`k_{\min} \sim \pi/a`). Show that the force scales as $`F/A \propto 1/a^4`.

<details><summary>Solution</summary>

The zero-point energy per unit area for a single mode with wavevector $`k` is $`\frac{1}{2}\hbar c k` per unit area (after integrating over the transverse directions). The density of states in 3D is $`\propto k^2\,dk`. The change in energy due to the plates modifies the allowed modes:

$`\Delta E/A \propto \int dk\,k^2 \cdot \frac{1}{2}\hbar c k \cdot \delta(k)`

where $`\delta(k)` encodes the boundary-condition modification. A more careful calculation (zeta-function regularization or direct mode summation) gives:

$`\Delta E/A = -\frac{\pi^2\hbar c}{720\,a^3}`

The force per unit area is $`F/A = -\partial(\Delta E/A)/\partial a = -\frac{\pi^2\hbar c}{240\,a^4}`.

The $`1/a^4` scaling follows from dimensional analysis: the only length scale is $`a`, and the only energy scale is $`\hbar c/a`, so $`F/A \sim (\hbar c/a)/a^3 = \hbar c/a^4`. ✓

</details>
</details>

</details>

## Boundary with the Standard Model

This page covers the *general formalism*: how to construct a gauge theory, compute its predictions with Feynman diagrams, handle divergences with renormalization, and understand the quantum vacuum. The *specific* gauge group SU(3)×SU(2)×U(1), the particle spectrum (quarks, leptons, Higgs), and the phenomenology of particle physics are the domain of the [Standard Model](../Standard-Model/Readme.md) topic page.

## Quiz

<details><summary>Test your understanding</summary>

**Problem.** In $`\phi^4` theory in $`d = 4-2\epsilon` dimensions, the coupling $`\lambda` has mass dimension $`[\lambda] = 2\epsilon`. The one-loop beta function is $`\beta(\lambda) = 3\lambda^2/(16\pi^2) + O(\lambda^3)`.

1. Is the theory super-renormalizable, renormalizable, or non-renormalizable in $`d=4`?
2. Solve the RG equation $`d\lambda/d\ln\mu = 3\lambda^2/(16\pi^2)` to find $`\lambda(\mu)` in terms of $`\lambda(\mu_0)`.
3. What happens to $`\lambda(\mu)` as $`\mu \to \infty`?

<details><summary>Solution</summary>

1. In $`d=4`, $`[\lambda] = 0` (dimensionless). The theory is marginally renormalizable (the coupling is dimensionless but runs logarithmically).

2. Separating variables: $`d\lambda/\lambda^2 = 3\,d\ln\mu/(16\pi^2)`. Integrating: $`-1/\lambda(\mu) + 1/\lambda(\mu_0) = 3\ln(\mu/\mu_0)/(16\pi^2)`.

$`\lambda(\mu) = \lambda(\mu_0)/\left[1 - \frac{3\lambda(\mu_0)}{16\pi^2}\ln(\mu/\mu_0)\right]`

3. As $`\mu \to \infty`, the denominator approaches zero from above (for $`\lambda > 0`), so $`\lambda(\mu) \to \infty`. This is a Landau pole: the theory becomes strongly coupled (and eventually inconsistent) at a finite energy scale $`\mu_{\text{LP}} = \mu_0\exp(16\pi^2/(3\lambda(\mu_0)))`. This signals that $`\phi^4` theory is not a complete UV theory — it must be embedded in a more fundamental framework.

</details>
</details>

<iframe src="./Quantum-Field-Theory.simulation.html" title="Running coupling explorer: α_QED(μ) and α_QCD(μ) vs energy scale"></iframe>

> **Authoritative sources**
> - [Peskin & Schroeder, *An Introduction to Quantum Field Theory* (1995)](https://en.wikipedia.org/wiki/An_Introduction_to_Quantum_Field_Theory)
> - [Weinberg, *The Quantum Theory of Fields*, Vol. I (1995)](https://en.wikipedia.org/wiki/The_Quantum_Theory_of_Fields)
> - [Feynman, "The Theory of Positrons" (Phys. Rev. 76, 1949)](https://en.wikipedia.org/wiki/Feynman_diagram)
> - [Wilson, "Renormalization Group and Critical Phenomena" (Phys. Rev. B, 1973)](https://en.wikipedia.org/wiki/Renormalization_group)
> - [Yang & Mills, "Conservation of Isotopic Spin and Isotopic Gauge Invariance" (Phys. Rev. 96, 1954)](https://en.wikipedia.org/wiki/Yang%E2%80%93Mills_theory)

