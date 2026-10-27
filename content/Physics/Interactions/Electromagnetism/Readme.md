# Electromagnetism

Electromagnetism is the branch of physics that describes electric and magnetic fields, the forces they exert on charges, and the propagation of light and radio waves. It is relevant whenever electric charge is present, current flows, magnetic materials respond, energy is transmitted by wires or radiation, or electromagnetic waves interact with matter.

> **Authoritative sources**
> - [Maxwell, A Dynamical Theory of the Electromagnetic Field](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)

## Brief history

- 1785: Coulomb quantifies the force between electric charges.
- 1820: Oersted shows that an electric current deflects a compass needle.
- 1831: Faraday discovers electromagnetic induction.
- 1865: Maxwell unifies electricity, magnetism, and optics in a wave theory.

## Categorization

The five classes separate the subject by field regime and first-principle role: static electric fields, static magnetic fields, near-field time-varying coupling, far-field radiation, and material response. Induction and radiation are not separate fundamental classes; they are near-field and far-field limits of the same time-varying Maxwell coupling.

<table>
<tr><th>Page</th><th>Regime</th><th>Governing law(s)</th><th>Typical application</th><th>Relation to other classes</th></tr>
<tr><td><a href="./Electrostatics.md">Electrostatics</a></td><td>Charges at rest</td><td>Gauss's law ∇ ⋅ <i>E</i>⃗ = ρ/ε<sub>0</sub>, ∇ × <i>E</i>⃗ = 0</td><td>Capacitors, shielding, electrostatic precipitators</td><td>Static limit of electrodynamics when time derivatives vanish</td></tr>
<tr><td><a href="./Magnetostatics.md">Magnetostatics</a></td><td>Steady currents</td><td>Ampère's law ∇ × <i>B</i>⃗ = μ<sub>0</sub> <i>J</i>⃗, ∇ ⋅ <i>B</i>⃗ = 0</td><td>Permanent magnets, inductors, MRI magnets</td><td>Static limit of electrodynamics; magnetic fields have no monopole sources</td></tr>
<tr><td><a href="./Electrodynamics.md">Electrodynamics</a></td><td>Time-varying fields</td><td>Full Maxwell's equations, Faraday's law, Poynting theorem</td><td>Transformers, induction heating, antennas (near field)</td><td>Contains induction and quasi-static circuit theory; reduces to electrostatics and magnetostatics for slow fields</td></tr>
<tr><td><a href="./ElectromagneticRadiation.md">Electromagnetic Radiation</a></td><td>Propagating waves</td><td>Wave equation, dispersion, quantum: <i>E</i> = <i>h</i>ν</td><td>Optics, radio, X-rays, lasers, photodetectors</td><td>Far-field/high-frequency limit of electrodynamics; interacts with media</td></tr>
<tr><td><a href="./ElectromagneticMedia.md">Electromagnetic Media</a></td><td>Constitutive response (applies to all regimes above)</td><td><i>D</i>⃗ = ε <i>E</i>⃗, <i>B</i>⃗ = μ <i>H</i>⃗, <i>J</i>⃗ = σ <i>E</i>⃗</td><td>Dielectrics, superconductors, metamaterials, waveguides</td><td>Modifies all field classes; sets wave speed, reflection, transmission, and loss</td></tr>
</table>

Lumped-element circuit theory (Kirchhoff laws, impedance, RC/RL/RLC, circuit power) is not a separate first-principle class. It is the quasi-static limit of electrodynamics, valid when circuit dimensions are much smaller than the wavelength, and should be read under the Electrodynamics class.



<details><summary>Details</summary>

The central force law is the Lorentz force: $`\mathbf{F}=q\mathbf{E}+q\mathbf{v}\times\mathbf{B}`. In vacuum, the fields obey Maxwell equations:

```math
\nabla\cdot\mathbf{E}=\frac{\rho}{\varepsilon_0},\quad
\nabla\cdot\mathbf{B}=0,
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t},\quad
\nabla\times\mathbf{B}=\mu_0\mathbf{J}+\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
```

Electrostatics and magnetostatics are the limits in which the time-derivative terms are negligible. Electrodynamics keeps those terms: Faraday law makes changing magnetic flux produce electric fields, and the Maxwell-Ampere term makes changing electric fields produce magnetic fields. Radiation is the far-field solution of the same coupled equations, while media replace vacuum constants with material response functions.

</details>