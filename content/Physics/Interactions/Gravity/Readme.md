# Gravity

Gravity is the interaction by which mass-energy curves spacetime, producing the attractive effect we observe as weight, orbital motion, and the large-scale structure of the universe. It is relevant whenever mass is present: engineering (structural loads, fluid pressure), orbital mechanics (satellites, spacecraft trajectories), geophysics (tidal forces, gravitational anomalies), astrophysics (stellar evolution, black holes), and cosmology (expansion, structure formation).

> **Authoritative sources**
> - [Einstein, *The Foundation of the General Theory of Relativity* (1916)](https://en.wikisource.org/wiki/The_Foundation_of_the_General_Theory_of_Relativity)
> - [Misner, Thorne & Wheeler, *Gravitation* (1973)](https://www.amazon.com/Gravitation-Charles-Misner/dp/0716703368)

## Brief history

1. 1687: Newton formulates the inverse-square law, unifying falling apples and planetary orbits.
2. 1915: Einstein publishes general relativity, identifying gravity with spacetime curvature.
3. 1919: Eddington's eclipse expedition confirms light deflection, validating GR.
4. 2015: LIGO detects gravitational waves from a binary black-hole merger, opening a new observational window.

## Categorization

The five classes separate gravity by the regime or first-principle aspect it isolates: the Newtonian force law, the geometric theory, radiative degrees of freedom, equilibrium/collapse solutions, and the largest-scale behavior. General relativity is the parent theory: the last four rows are its weak-field limit, its radiative solutions, its strong-field stationary solutions, and its homogeneous-isotropic limit.

<table>
<tr><th>Page</th><th>Class</th><th>Regime / principle</th><th>Governing law(s)</th><th>Typical application</th><th>Relation to other classes</th></tr>
<tr><td><a href="./Newtonian-Gravitation.md">Newtonian gravitation</a></td><td>Weak field, slow motion (<i>v</i> ≪ <i>c</i>, Φ/c<sup>2</sup> ≪ 1)</td><td>∇<sup>2</sup> Φ = 4π <i>G</i> ρ, <b><i>F</i></b> = −<i>m</i>∇Φ</td><td>Orbital mechanics, structural loads, tides, fluid hydrostatics</td><td>Leading-order limit of general relativity; reduces to a single scalar potential</td></tr>
<tr><td><a href="./General-Relativity.md">General relativity</a></td><td>Full geometric theory; equivalence principle</td><td><i>G</i><sub>μν</sub> = 8π <i>G</i> <i>T</i><sub>μν</sub>/c<sup>4</sup></td><td>GPS correction, black-hole physics, gravitational lensing, cosmology</td><td>Contains Newtonian gravitation as the weak-field limit; source is the full stress-energy tensor</td></tr>
<tr><td><a href="./Gravitational-Waves.md">Gravitational waves</a></td><td>Radiative (time-varying quadrupole) degrees of freedom</td><td>Linearized Einstein equations in transverse-traceless gauge; <i>h</i><sub>μν</sub><sup>TT</sup></td><td>LIGO/Virgo/KAGRA detection, binary pulsar timing, cosmological distance ladder</td><td>Propagating solutions of GR at <i>c</i>; carry energy and angular momentum away from sources</td></tr>
<tr><td><a href="./Compact-Objects.md">Compact objects</a></td><td>Strong-field equilibrium or collapse (Φ/c<sup>2</sup> ∼ 1)</td><td>TOV equation (neutron stars); Schwarzschild / Kerr metrics (black holes)</td><td>Pulsar timing, accretion-disk spectroscopy, event-horizon imaging</td><td>Exact or near-exact GR solutions where Newtonian gravity is insufficient</td></tr>
<tr><td><a href="./Cosmological-Gravity.md">Cosmological gravity</a></td><td>Largest scales (≳ Mpc); homogeneous and isotropic average</td><td>Friedmann equations; <i>a</i>̈/a = −4π <i>G</i>(ρ+3<i>p</i>)/3<i>c</i><sup>2</sup></td><td>Expansion history, CMB anisotropies, large-scale structure, dark energy</td><td>GR applied to a homogeneous fluid; gravity dominates over all other interactions on these scales</td></tr>
</table>

## Interactive simulation

The simulation below shows a test particle orbiting a central mass. Drag the
<strong>Relativistic compactness</strong> slider: at small values the orbit is a
closed Newtonian ellipse (the deformed spacetime grid is nearly flat); as the
central compactness grows, the grid curves visibly and the orbit's periapsis
precesses, exactly as observed for Mercury and for pulsars in binary systems.
<iframe src="../Gravity.simulation.html" width="100%" height="560" title="Test particle orbiting a mass on a deformable spacetime grid, with a slider from the Newtonian to the strong-field regime" style="border:1px solid #ccc; border-radius:4px;"></iframe>

## Details

<details><summary>Details</summary>

### From Newton to Einstein


Newton's law $`F = Gm_1 m_2 / r^2` is exact in the limit of weak fields and low velocities. It treats gravity as a force acting instantaneously at a distance through a scalar potential $`\Phi`. General relativity replaces this picture: mass-energy tells spacetime how to curve (Einstein field equations), and curved spacetime tells matter how to move (geodesic equation). The Newtonian potential is recovered as the $`g_{00}` component of the metric in the weak-field, slow-motion limit:

```math
g_{00} \approx -\left(1 + \frac{2\Phi}{c^2}\right)
```

### Why gravity is unique

Among the four fundamental interactions, gravity is the only one that has not been quantized in a complete, experimentally verified theory. It couples to the stress-energy tensor (which includes the gravitational field's own energy), making it non-linear and non-renormalizable in perturbation theory. This is why the other three forces are described by quantum gauge theories while gravity remains classical (geometric) in all practical applications — not because a quantum theory of gravity is impossible, but because none has yet been experimentally confirmed.

### Coupling hierarchy

The gravitational coupling between two protons is $`\sim 10^{-36}` times the electromagnetic coupling. Gravity is negligible at particle scales but dominates at astronomical scales because it is purely attractive and has infinite range, so it accumulates without cancellation.

### Boundary with Standard-Model cosmology

This topic covers the *gravitational dynamics* of the universe (Friedmann equations, expansion, structure formation); the matter/energy content and thermal history of the early universe (nucleosynthesis, recombination, CMB anisotropy physics) belong to the [Cosmology](../../Standard-Model/Cosmology.md) page under the [Standard model](../../Standard-Model/Readme.md).

</details>