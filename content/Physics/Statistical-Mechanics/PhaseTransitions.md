# Phase Transitions

Phase transitions are abrupt changes in the macroscopic state of a system as a control parameter (temperature, pressure, field) crosses a critical value. They are relevant whenever collective behavior emerges: water freezing, magnets ordering, superconductors forming, fluids separating, or any system where a small parameter change produces a qualitative structural shift. They are the domain where statistical mechanics meets materials science, cosmology, and critical phenomena.

> **Authoritative sources**
> - [Wikipedia: Phase transition](https://en.wikipedia.org/wiki/Phase_transition)
> - [Goldenfeld, Lectures on Phase Transitions and the Renormalization Group (Cambridge University Press / Routledge)](https://www.routledge.com/Lectures-On-Phase-Transitions-And-The-Renormalization-Group/Goldenfeld/p/book/9780201554090)
> - [Cardy, Scaling and Renormalization in Statistical Physics (Cambridge University Press)](https://www.cambridge.org/core/books/scaling-and-renormalization-in-statistical-physics/924C0B0D39123F681CF3353C42E5E836)

## Order parameter

A phase transition is characterized by an **order parameter** $`\phi` that is zero in the symmetric (disordered) phase and nonzero in the broken-symmetry (ordered) phase:

```math
\phi = 0 \quad (T > T_c), \qquad \phi \neq 0 \quad (T < T_c)
```

Examples: magnetization $`M` (ferromagnet), density difference $`\rho_l - \rho_g` (liquid–gas), superconducting gap $`\Delta`.

<details><summary>Details</summary>

**Global idea.** The order parameter is the macroscopic variable that distinguishes the two phases: it measures *how much* symmetry the disordered phase has that the ordered phase lacks. It transforms under the symmetry group that is broken. A ferromagnet breaks $`\mathbb{Z}_2` spin-flip symmetry; a liquid–gas transition breaks the density-translation symmetry. The choice of order parameter is not unique — any quantity that vanishes in the disordered phase and is nonzero in the ordered phase works.

**The Landau picture.** Write the free energy as an analytic function of the order parameter, constrained by symmetry: $`F(\phi) = a(T-T_c)\phi^2 + b\phi^4 + \cdots` with $`b > 0`. Above $`T_c` the coefficient of $`\phi^2` is positive, so the minimum sits at $`\phi = 0` (disordered). Below $`T_c` it is negative, so two symmetric minima appear at $`\phi = \pm\sqrt{a(T_c-T)/(2b)}` (ordered), giving the mean-field prediction $`\phi \sim (T_c - T)^{1/2}`.

**Example.** For a ferromagnet, $`\phi` is the net magnetization. Above the Curie temperature, thermal fluctuations point the atomic spins in random directions and $`M = 0`. Below it, the spin-spin coupling wins and the system spontaneously picks one of the two minima — a *symmetry breaking* choice that the Hamiltonian itself does not make.

<svg viewBox="0 0 500 260" width="500" height="260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="plotclip"><rect x="60" y="30" width="380" height="200"/></clipPath>
  </defs>
  <rect x="60" y="30" width="380" height="200" fill="#fafafa" stroke="#ccc"/>
  <line x1="60" y1="208.6" x2="440" y2="208.6" stroke="#888" stroke-width="1"/>
  <line x1="250" y1="30" x2="250" y2="230" stroke="#888" stroke-width="1" stroke-dasharray="4 3"/>
  <g clip-path="url(#plotclip)">
    <path d="M67.9 -221.8 L71.9 -190.5 L75.8 -160.9 L79.8 -133.1 L83.8 -106.9 L87.7 -82.3 L91.7 -59.3 L95.6 -37.7 L99.6 -17.5 L103.5 1.4 L107.5 19.1 L111.5 35.5 L115.4 50.8 L119.4 65.1 L123.3 78.3 L127.3 90.5 L131.3 101.8 L135.2 112.3 L139.2 121.9 L143.1 130.8 L147.1 139.0 L151.0 146.4 L155.0 153.3 L159.0 159.5 L162.9 165.2 L166.9 170.4 L170.8 175.1 L174.8 179.3 L178.8 183.2 L182.7 186.6 L186.7 189.7 L190.6 192.5 L194.6 195.0 L198.5 197.1 L202.5 199.1 L206.5 200.8 L210.4 202.3 L214.4 203.6 L218.3 204.7 L222.3 205.7 L226.3 206.5 L230.2 207.1 L234.2 207.7 L238.1 208.1 L242.1 208.3 L246.0 208.5 L250.0 208.6 L254.0 208.5 L257.9 208.3 L261.9 208.1 L265.8 207.7 L269.8 207.1 L273.8 206.5 L277.7 205.7 L281.7 204.7 L285.6 203.6 L289.6 202.3 L293.5 200.8 L297.5 199.1 L301.5 197.1 L305.4 195.0 L309.4 192.5 L313.3 189.7 L317.3 186.6 L321.3 183.2 L325.2 179.3 L329.2 175.1 L333.1 170.4 L337.1 165.2 L341.0 159.5 L345.0 153.3 L349.0 146.4 L352.9 139.0 L356.9 130.8 L360.8 121.9 L364.8 112.3 L368.8 101.8 L372.7 90.5 L376.7 78.3 L380.6 65.1 L384.6 50.8 L388.5 35.5 L392.5 19.1 L396.5 1.4 L400.4 -17.5 L404.4 -37.7 L408.3 -59.3 L412.3 -82.3 L416.3 -106.9 L420.2 -133.1 L424.2 -160.9 L428.1 -190.5 L432.1 -221.8" fill="none" stroke="#c0392b" stroke-width="2"/>
    <path d="M67.9 -103.8 L71.9 -77.5 L75.8 -52.9 L79.8 -29.9 L83.8 -8.5 L87.7 11.5 L91.7 30.0 L95.6 47.2 L99.6 63.1 L103.5 77.8 L107.5 91.4 L111.5 103.9 L115.4 115.4 L119.4 125.8 L123.3 135.4 L127.3 144.2 L131.3 152.1 L135.2 159.2 L139.2 165.7 L143.1 171.5 L147.1 176.7 L151.0 181.3 L155.0 185.4 L159.0 189.1 L162.9 192.2 L166.9 195.0 L170.8 197.4 L174.8 199.5 L178.8 201.2 L182.7 202.7 L186.7 204.0 L190.6 205.0 L194.6 205.9 L198.5 206.6 L202.5 207.1 L206.5 207.6 L210.4 207.9 L214.4 208.1 L218.3 208.3 L222.3 208.4 L226.3 208.5 L230.2 208.5 L234.2 208.6 L238.1 208.6 L242.1 208.6 L246.0 208.6 L250.0 208.6 L254.0 208.6 L257.9 208.6 L261.9 208.6 L265.8 208.6 L269.8 208.5 L273.8 208.5 L277.7 208.4 L281.7 208.3 L285.6 208.1 L289.6 207.9 L293.5 207.6 L297.5 207.1 L301.5 206.6 L305.4 205.9 L309.4 205.0 L313.3 204.0 L317.3 202.7 L321.3 201.2 L325.2 199.5 L329.2 197.4 L333.1 195.0 L337.1 192.2 L341.0 189.1 L345.0 185.4 L349.0 181.3 L352.9 176.7 L356.9 171.5 L360.8 165.7 L364.8 159.2 L368.8 152.1 L372.7 144.2 L376.7 135.4 L380.6 125.8 L384.6 115.4 L388.5 103.9 L392.5 91.4 L396.5 77.8 L400.4 63.1 L404.4 47.2 L408.3 30.0 L412.3 11.5 L416.3 -8.5 L420.2 -29.9 L424.2 -52.9 L428.1 -77.5 L432.1 -103.8" fill="none" stroke="#7f8c8d" stroke-width="2"/>
    <path d="M67.9 14.3 L71.9 35.5 L75.8 55.2 L79.8 73.3 L83.8 90.0 L87.7 105.3 L91.7 119.3 L95.6 132.1 L99.6 143.7 L103.5 154.2 L107.5 163.7 L111.5 172.3 L115.4 179.9 L119.4 186.6 L123.3 192.6 L127.3 197.8 L131.3 202.3 L135.2 206.2 L139.2 209.4 L143.1 212.2 L147.1 214.4 L151.0 216.2 L155.0 217.6 L159.0 218.6 L162.9 219.2 L166.9 219.6 L170.8 219.7 L174.8 219.6 L178.8 219.3 L182.7 218.9 L186.7 218.3 L190.6 217.6 L194.6 216.8 L198.5 216.0 L202.5 215.2 L206.5 214.3 L210.4 213.5 L214.4 212.6 L218.3 211.9 L222.3 211.1 L226.3 210.5 L230.2 209.9 L234.2 209.4 L238.1 209.1 L242.1 208.8 L246.0 208.6 L250.0 208.6 L254.0 208.6 L257.9 208.8 L261.9 209.1 L265.8 209.4 L269.8 209.9 L273.8 210.5 L277.7 211.1 L281.7 211.9 L285.6 212.6 L289.6 213.5 L293.5 214.3 L297.5 215.2 L301.5 216.0 L305.4 216.8 L309.4 217.6 L313.3 218.3 L317.3 218.9 L321.3 218.9 L325.2 219.6 L329.2 219.7 L333.1 219.6 L337.1 219.2 L341.0 218.6 L345.0 217.6 L349.0 216.2 L352.9 214.4 L356.9 212.2 L360.8 209.4 L364.8 206.2 L368.8 202.3 L372.7 197.8 L376.7 192.6 L380.6 186.6 L384.6 179.9 L388.5 172.3 L392.5 163.7 L396.5 154.2 L400.4 143.7 L404.4 132.1 L408.3 119.3 L412.3 105.3 L416.3 90.0 L420.2 73.3 L424.2 55.2 L428.1 35.5 L432.1 14.3" fill="none" stroke="#2471a3" stroke-width="2"/>
  </g>
  <circle cx="170.8" cy="219.7" r="4" fill="#2471a3"/>
  <circle cx="329.2" cy="219.7" r="4" fill="#2471a3"/>
  <line x1="170.8" y1="219.7" x2="170.8" y2="208.6" stroke="#2471a3" stroke-dasharray="3 2"/>
  <line x1="329.2" y1="219.7" x2="329.2" y2="208.6" stroke="#2471a3" stroke-dasharray="3 2"/>
  <text x="446" y="60" font-size="12" fill="#c0392b">T &gt; T<tspan font-size="9" dy="3">c</tspan></text>
  <text x="446" y="120" font-size="12" fill="#7f8c8d">T = T<tspan font-size="9" dy="3">c</tspan></text>
  <text x="446" y="180" font-size="12" fill="#2471a3">T &lt; T<tspan font-size="9" dy="3">c</tspan></text>
  <text x="452" y="180" font-size="12" fill="#2471a3">T &lt; T</text>
  <text x="482" y="184" font-size="9" fill="#2471a3">c</text>
  <text x="140" y="248" font-size="12" fill="#2471a3">−φ₀</text>
  <text x="322" y="248" font-size="12" fill="#2471a3">+φ₀</text>
  <text x="196" y="248" font-size="11" fill="#555">order parameter φ</text>
</svg>

The double well below $`T_c` is the whole story of spontaneous symmetry breaking: the system must *choose* one minimum, and an infinite system cannot tunnel between them.

**Authoritative sources.** [Landau's original 1937 paper (republished, English translation)](https://link.springer.com/article/10.1007/978-3-319-42579-8_9); [Cardy, *Scaling and Renormalization in Statistical Physics*, ch. 4](https://www.cambridge.org/core/books/scaling-and-renormalization-in-statistical-physics/924C0B0D39123F681CF3353C42E5E836).

<details><summary>Example problem</summary>

For the Landau free energy $`F(\phi) = a(T-T_c)\phi^2 + b\phi^4` with $`a, b > 0`, find the equilibrium order parameter at $`T = 0.96\,T_c` in terms of $`a` and $`b`, and verify it vanishes as $`(T_c - T)^{1/2}`.

<details><summary>Solution</summary>

Minimize: $`dF/d\phi = 2a(T-T_c)\phi + 4b\phi^3 = 0`. Nonzero solutions: $`\phi^2 = a(T_c - T)/(2b)`, so $`\phi = \pm\sqrt{a \cdot 0.04\,T_c\,/\,(2b)} = \pm\sqrt{0.02\,a T_c / b}`. The square-root dependence on $`(T_c - T)` is the mean-field exponent $`\beta = 1/2` in action.
</details>

</details>

</details>

## Critical exponents

Near the critical point $`T_c`, thermodynamic quantities vanish or diverge as power laws of the reduced temperature $`t = (T - T_c)/T_c`:

```math
\phi \sim |t|^{\beta}, \quad C \sim |t|^{-\alpha}, \quad \chi \sim |t|^{-\gamma}, \quad \xi \sim |t|^{-\nu}
```

where $`C` is the specific heat, $`\chi` the susceptibility and $`\xi` the correlation length. Only $`\phi` vanishes at $`T_c` (positive exponent $`\beta`); the response functions $`C`, $`\chi` and $`\xi` all *diverge* (negative exponents). The exponents are **universal**: they depend only on the spatial dimension $`d` and the symmetry of the order parameter, not on microscopic details.

<table>
<tr><th>Exponent</th><th>Quantity</th><th>Mean-field (Landau)</th><th>2D Ising (exact)</th></tr>
<tr><td><i>α</i></td><td>Specific heat <i>C</i> ∝ |<i>t</i>|<sup>−α</sup></td><td>0</td><td>0 (logarithmic divergence)</td></tr>
<tr><td><i>β</i></td><td>Order parameter <i>φ</i> ∝ |<i>t</i>|<sup>β</sup></td><td>1/2</td><td>1/8</td></tr>
<tr><td><i>γ</i></td><td>Susceptibility <i>χ</i> ∝ |<i>t</i>|<sup>−γ</sup></td><td>1</td><td>7/4</td></tr>
<tr><td><i>ν</i></td><td>Correlation length <i>ξ</i> ∝ |<i>t</i>|<sup>−ν</sup></td><td>1/2</td><td>1</td></tr>
</table>

<details><summary>Details</summary>

**Global idea.** Power laws are the fingerprint of scale invariance. The **correlation length** $`\xi` is the distance over which fluctuations of the order parameter are correlated. At the critical point, $`\xi \to \infty`, and the system becomes scale-invariant: fluctuations exist on *all* length scales, which is exactly why a power law (the only scale-free functional form) describes the singularities. This is why critical phenomena are described by the **renormalization group (RG)**: integrating out short-distance modes reveals the same physics at longer scales.

**Example.** Cool a ferromagnet toward its Curie point from above. Domains of aligned spins grow from a few lattice spacings to macroscopic size ($`\xi \to \infty`); the susceptibility $`\chi` — the response to an external field — diverges because a whole correlated region flips coherently; the specific heat $`C` peaks (in 2D Ising it diverges only logarithmically, $`C \sim \ln|t|`, corresponding to $`\alpha = 0`).

**Scaling relations.** The exponents are not independent. The **hyperscaling relation** $`\alpha + 2\beta + \gamma = d\nu` connects them, and it holds below the upper critical dimension. Mean-field theory (Landau) gives $`\alpha = 0, \beta = 1/2, \gamma = 1, \nu = 1/2` and is exact only for $`d \geq 4` (the upper critical dimension). For the 2D Ising model, exact results (Onsager, Yang) give $`\alpha = 0, \beta = 1/8, \gamma = 7/4, \nu = 1`.

**Authoritative sources.** [Onsager, *Crystal Statistics I* (1944)](https://journals.aps.org/pr/abstract/10.1103/PhysRev.65.117); [Goldenfeld, *Lectures on Phase Transitions and the Renormalization Group*, ch. 3](https://www.routledge.com/Lectures-On-Phase-Transitions-And-The-Renormalization-Group/Goldenfeld/p/book/9780201554090).

<details><summary>Example problem</summary>

Using the hyperscaling relation $`\alpha + 2\beta + \gamma = d\nu`, check the exact 2D Ising exponents $`\alpha = 0, \beta = 1/8, \gamma = 7/4, \nu = 1` and the mean-field exponents $`\alpha = 0, \beta = 1/2, \gamma = 1, \nu = 1/2` at $`d = 4`.

<details><summary>Solution</summary>

2D Ising: $`0 + 2(1/8) + 7/4 = 1/4 + 7/4 = 2 = d\nu = 2 \times 1`. ✓

Mean-field at $`d = 4`: $`0 + 2(1/2) + 1 = 2 = d\nu = 4 \times 1/2`. ✓ Both saturate the relation — the first because 2D Ising is below its upper critical dimension, the second because $`d = 4` *is* the upper critical dimension of mean-field theory.
</details>

</details>

</details>

## Types of transitions

<table>
<tr><th>Type</th><th>Order parameter</th><th>Free energy</th><th>Example</th></tr>
<tr><td>Second-order (continuous)</td><td>Continuous onset: <i>φ</i> ∝ |<i>T</i>−<i>T</i><sub>c</sub>|<sup>β</sup></td><td>Smooth, but derivatives diverge</td><td>Ferromagnet, liquid–gas (at critical point)</td></tr>
<tr><td>First-order (discontinuous)</td><td>Jumps: <i>φ</i> finite at <i>T</i><sub>c</sub></td><td>Two minima coexist; latent heat</td><td>Water freezing, solid–liquid</td></tr>
<tr><td>Quantum</td><td>Driven by non-thermal parameter (pressure, field)</td><td>At <i>T</i> = 0</td><td>Superconductor–insulator, BCS gap</td></tr>
<tr><td>Topological</td><td>No local order parameter; invariant changes</td><td>No symmetry breaking</td><td>Anyon statistics, topological insulator</td></tr>
</table>

The liquid–gas pressure–temperature phase diagram makes the geometry concrete: the coexistence curve separates two phases, ends at a critical point, and meets a second transition line at the triple point.

<svg viewBox="0 0 500 320" width="500" height="320" xmlns="http://www.w3.org/2000/svg">
  <rect x="60" y="30" width="400" height="250" fill="#fafafa" stroke="#ccc"/>
  <line x1="60" y1="280" x2="460" y2="280" stroke="#888" stroke-width="1.5"/>
  <line x1="60" y1="280" x2="60" y2="30" stroke="#888" stroke-width="1.5"/>
  <text x="452" y="298" font-size="14" font-style="italic">T</text>
  <text x="30" y="42" font-size="14" font-style="italic">P</text>
  <path d="M60 262 C 100 245, 130 232, 150 220" fill="none" stroke="#2471a3" stroke-width="2.5"/>
  <path d="M150 220 C 155 150, 160 90, 168 40" fill="none" stroke="#1e8449" stroke-width="2.5"/>
  <path d="M150 220 C 220 195, 310 150, 380 90" fill="none" stroke="#c0392b" stroke-width="2.5"/>
  <path d="M380 90 C 410 72, 440 60, 460 52" fill="none" stroke="#c0392b" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="150" cy="220" r="5" fill="#222"/>
  <circle cx="380" cy="90" r="5" fill="#222"/>
  <text x="70" y="120" font-size="14" fill="#1e8449">Solid</text>
  <text x="235" y="150" font-size="14" fill="#c0392b">Liquid</text>
  <text x="330" y="250" font-size="14" fill="#2471a3">Gas</text>
  <text x="408" y="105" font-size="12" fill="#555">supercritical</text>
  <text x="415" y="120" font-size="12" fill="#555">fluid</text>
  <text x="118" y="243" font-size="12">triple point</text>
  <text x="330" y="78" font-size="12">critical point</text>
  <text x="200" y="185" font-size="11" fill="#c0392b" transform="rotate(-18 200 185)">coexistence curve (boiling)</text>
  <text x="128" y="130" font-size="11" fill="#1e8449" transform="rotate(-85 128 130)">melting line</text>
  <text x="52" y="252" font-size="11" fill="#2471a3" transform="rotate(-20 52 252)">sublimation</text>
</svg>

<details><summary>Details</summary>

**Global idea.** The type of transition is determined by the behavior of the free energy $`F` at the transition. If $`F` itself is continuous but a *first* derivative (entropy $`S = -\partial F/\partial T`, volume $`V = \partial F/\partial P`) jumps, the transition is **first-order**: latent heat $`L = T_c \Delta S` is released, and two phases coexist in equilibrium. If the first derivatives are continuous but a *second* derivative (specific heat, compressibility, susceptibility) diverges, the transition is **second-order** (continuous).

**Example.** In the phase diagram above, follow the boiling curve from the triple point upward: crossing it at any pressure below the critical pressure is a first-order transition (water jumps from density $`\rho_g` to $`\rho_l`, absorbing latent heat). But the curve *ends* at the critical point — above it there is no distinction between liquid and gas, and approaching that endpoint along the curve gives a continuous transition with diverging compressibility and critical exponents. The melting line, by contrast, has no known critical point: solid and liquid differ by a symmetry (positional order), not just by degree.

**Quantum and topological transitions.** Quantum phase transitions occur at $`T = 0` and are controlled by a non-thermal parameter; at finite $`T` they are rounded over a scale $`T \sim \xi^{-z}` where $`z` is the dynamic critical exponent. Topological transitions (e.g., the Kosterlitz–Thouless transition in 2D superfluids) involve the unbinding of topological defects rather than symmetry breaking — the 2016 Nobel prize recognized this work.

**Authoritative sources.** [Kosterlitz & Thouless, *Ordering, metastability and phase transitions in two-dimensional systems* (1973)](https://iopscience.iop.org/article/10.1088/0022-3719/6/7/010); [Nobel Prize 2016: topological phase transitions](https://www.nobelprize.org/prizes/physics/2016/summary/).

<details><summary>Example problem</summary>

Water boils at 100 °C at 1 atm with latent heat $`L = 2.26` MJ/kg. Explain why boiling is first-order while the critical-point endpoint of the boiling curve is second-order, and what happens to the latent heat as the critical point is approached.

<details><summary>Solution</summary>

At 100 °C, liquid and gas have different densities and entropies: $`S` (a first derivative of $`F`) jumps, so the transition is first-order and $`L = T\Delta S \neq 0`. As the critical point is approached along the coexistence curve, the density difference $`\rho_l - \rho_g` (the order parameter) vanishes as $`|T - T_c|^{\beta}`, so $`\Delta S \to 0` and the latent heat smoothly goes to zero — the discontinuity shrinks to nothing and only the diverging *derivative* (compressibility, specific heat) remains, which is the second-order signature.
</details>

</details>

</details>

## Simulation: the 2D Ising model

The Ising model — spins $`s_i = \pm 1` on a lattice with energy $`E = -J \sum_{\langle i j\rangle} s_i s_j` — is the hydrogen atom of phase transitions. The simulation below runs Metropolis dynamics at temperature $`T` (in units of $`J/k_B`, with $`T_c = 2.269`): drag the slider through $`T_c` and watch domains of aligned spins form, coarsen, and finally lock into a single ordered phase, while the magnetization $`|m|` (the order parameter) turns on continuously.

<iframe src="./PhaseTransitions.simulation.html" title="2D Ising model: spin ordering as temperature crosses the critical point"></iframe>

## Renormalization group

The RG is the systematic framework for critical phenomena. The idea: coarse-grain the system by integrating out short-distance degrees of freedom, then rescale. The Hamiltonian flows in parameter space:

```math
H_{\ell+1} = \mathcal{R}[H_\ell]
```

Fixed points of the RG flow correspond to critical points. The **relevant** and **irrelevant** directions at a fixed point determine the critical exponents and the universality class.

<svg viewBox="0 0 500 300" width="500" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="480" height="280" fill="#fafafa" stroke="#ccc"/>
  <line x1="250" y1="30" x2="250" y2="270" stroke="#999" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="256" y="45" font-size="12" fill="#555">critical surface (t = 0)</text>
  <line x1="60" y1="150" x2="440" y2="150" stroke="#bbb" stroke-width="1"/>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0 0 L6 3 L0 6 z" fill="#333"/>
    </marker>
    <marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0 0 L6 3 L0 6 z" fill="#c0392b"/>
    </marker>
  </defs>
  <line x1="250" y1="60" x2="250" y2="135" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="250" y1="240" x2="250" y2="165" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="240" y1="150" x2="150" y2="150" stroke="#c0392b" stroke-width="1.5" marker-end="url(#arrR)"/>
  <line x1="260" y1="150" x2="350" y2="150" stroke="#c0392b" stroke-width="1.5" marker-end="url(#arrR)"/>
  <path d="M90 70 C 150 90, 200 120, 238 143" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <path d="M410 230 C 350 210, 300 180, 262 157" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <path d="M90 230 C 140 235, 190 220, 235 175" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#arrR)"/>
  <path d="M410 70 C 360 65, 310 80, 265 125" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#arrR)"/>
  <circle cx="250" cy="150" r="7" fill="#222"/>
  <text x="262" y="172" font-size="13" font-weight="bold">critical fixed point</text>
  <text x="60" y="290" font-size="12" fill="#c0392b">← relevant direction (reduced temperature t) →</text>
  <text x="20" y="160" font-size="12" fill="#333" transform="rotate(-90 20 160)">irrelevant directions</text>
  <text x="330" y="255" font-size="11" fill="#c0392b">flows off the critical surface</text>
  <text x="330" y="269" font-size="11" fill="#c0392b">run away (no criticality)</text>
</svg>

<details><summary>Details</summary>

**Global idea.** Coarse-graining replaces blocks of spins by a single effective spin and rescales lengths back. Repeating this generates a *flow* in the space of Hamiltonians. Criticality means scale invariance, and scale invariance means the flow must reach a **fixed point** ($`\mathcal{R}[H^*] = H^*`): the system looks the same at every scale. Near a fixed point, perturbations decompose into **relevant** directions (they grow under coarse-graining and push the system away from criticality — the reduced temperature $`t` is one) and **irrelevant** directions (they shrink and die out). The rate of growth/decay *is* the critical exponent: $`\nu = 1/y_t` where $`y_t` is the relevant eigenvalue.

**Example.** An Ising ferromagnet, a liquid–gas system, and a lattice gas look nothing alike microscopically, yet all three flow to the same fixed point under coarse-graining — hence they share the exact same exponents ($`\beta = 1/8` etc. in 2D). That is **universality**, and it is why studying one lattice model teaches us about real fluids.

**Computing exponents.** The **epsilon expansion** ($`\epsilon = 4 - d`) computes exponents perturbatively around the upper critical dimension; the **Monte Carlo RG** and **tensor network** methods provide non-perturbative results in low dimensions.

**Authoritative sources.** [Wilson & Kogut, *The Renormalization Group and the ε Expansion* (1974)](https://www.sciencedirect.com/science/article/pii/S0370157374800171); [Cardy, *Scaling and Renormalization in Statistical Physics*, ch. 3](https://www.cambridge.org/core/books/scaling-and-renormalization-in-statistical-physics/924C0B0D39123F681CF3353C42E5E836).

<details><summary>Example problem</summary>

A system sits exactly on its critical surface ($`t = 0`) but slightly off in an irrelevant direction with eigenvalue $`y < 0`. What happens to it under repeated coarse-graining, and why does this not spoil criticality?

<details><summary>Solution</summary>

The irrelevant perturbation shrinks as $`b^{y n}` after $`n` coarse-graining steps of scale factor $`b > 1`, since $`y < 0`. The flow converges to the fixed point anyway, so the long-distance physics is still scale-invariant and critical. This is precisely why microscopic details do not affect critical exponents: they couple to irrelevant directions. Only a relevant direction (like $`t \neq 0`) would grow and carry the flow away, cutting off the divergence of $`\xi` at a finite scale $`\xi \sim |t|^{-\nu}`.
</details>

</details>

</details>

## Quiz

<details><summary>Quiz: correlation length near the critical point</summary>

A 2D Ising ferromagnet has critical temperature $`T_c = 2.269\, J/k_B`. Estimate the correlation length at $`T = 0.99\, T_c` using $`\nu = 1` (exact for 2D Ising). Then estimate it at $`T = 0.999\, T_c` and explain what the trend means physically.

<details><summary>Solution</summary>

The correlation length scales as $`\xi \sim |T - T_c|^{-\nu}`. With $`\nu = 1`:

$`|T - T_c|/T_c = 0.01` so $`\xi \sim (0.01)^{-1} = 100` lattice spacings.

At $`T = 0.999\, T_c`: $`\xi \sim 1000` lattice spacings. Each factor of 10 closer to $`T_c` multiplies the correlated region by 10. The system is approaching the critical point where $`\xi \to \infty` and the correlation length becomes macroscopic: domains span the whole sample, fluctuations occur on all scales, and the power-law (scale-free) critical behavior takes over. You can watch this domain growth directly in the [simulation above](#simulation-the-2d-ising-model) by sliding $`T` toward $`2.269`.
</details>

</details>

## How this fits together

Phase transitions are where the ensembles meet collective behavior. The grand canonical ensemble's occupation function $`f(\varepsilon_0)` diverges at the Bose condensation transition. The canonical ensemble's free energy $`F` develops non-analyticities at critical points. The microcanonical ensemble's entropy $`S(E)` shows a double-hump for first-order transitions. The RG provides the unifying framework: all critical phenomena are fixed points of the coarse-graining flow. See [GrandCanonicalEnsemble](./GrandCanonicalEnsemble.md) for the occupation-number picture, [CanonicalEnsemble](./CanonicalEnsemble.md) for the free-energy picture, and [NonequilibriumStatisticalMechanics](./NonequilibriumStatisticalMechanics.md) for driven and time-dependent transitions.
