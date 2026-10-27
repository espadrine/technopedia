# Newtonian gravitation

Newtonian gravitation models gravity as an attractive force between masses, proportional to the product of the masses and inversely proportional to the square of their separation. It is the workhorse of everyday gravity: structural loads, fluid hydrostatics, tides, satellite orbits, and interplanetary trajectories are all computed with it, because in the weak-field, slow-motion regime ($`v \ll c`, $`\Phi/c^2 \ll 1`) it agrees with general relativity to exquisite precision.

> **Authoritative sources**
> - [Newton, *Philosophiæ Naturalis Principia Mathematica* (1687)](https://en.wikisource.org/wiki/Philosophi%C3%A6_Naturalis_Principia_Mathematica)
> - [Chandrasekhar, *Newton's Principia for the Common Reader* (1995)](https://global.oup.com/academic/product/newtons-principia-for-the-common-reader-9780198526759)

## The inverse-square law

**Definition.** Two point masses attract along their line of centers with

```math
\mathbf{F} = -\,G\,\frac{m_1 m_2}{r^2}\,\hat{\mathbf{r}},
\qquad G \approx 6.674\times 10^{-11}\ \mathrm{m^3\,kg^{-1}\,s^{-2}}.
```

<details><summary>Details</summary>

The law has three ingredients, each physically load-bearing:

1. **Proportionality to each mass.** By Newton's third law the force on $`m_1` from $`m_2` must equal the force on $`m_2` from $`m_1`; making the force proportional to *both* masses is the simplest way to guarantee this symmetry. It also makes inertial and gravitational mass identical, the empirical fact later promoted to the equivalence principle in [General relativity](./General-Relativity.md).
2. **Inverse square.** This is the signature of a field spreading over the surface of a sphere of area $`4\pi r^2` in three dimensions. It is what makes bound orbits closed ellipses (Bertrand's theorem) and what makes the shell theorem work.
3. **Instantaneous action at a distance.** Newton's formulation has no propagation delay. This is its deepest flaw: it is an approximation valid when the field changes slowly compared with the light travel time across the system, which is why it fails for [Gravitational waves](./Gravitational-Waves.md).

*Example.* The Earth pulls a 1 kg mass at its surface with $`F = GM_\oplus m/R_\oplus^2 \approx 9.8` N. The same law, applied to the Moon at 60 Earth radii, gives an acceleration $`60^2 \approx 3600` times smaller — about $`0.0027` m/s², which matches the Moon's centripetal acceleration. This was Newton's original unification: the apple and the Moon obey one law.

</details>

## The gravitational field and potential

**Definition.** Instead of pairwise forces, define a field $`\mathbf{g}(\mathbf{r})` (acceleration of a test mass) and a potential $`\Phi(\mathbf{r})` satisfying

```math
\mathbf{g} = -\nabla\Phi, \qquad \nabla^2\Phi = 4\pi G\rho,
```

where $`\rho` is the mass density (Poisson's equation). Outside a spherical mass, $`\Phi = -GM/r` exactly (shell theorem).

<details><summary>Details</summary>

The field formulation is a bookkeeping upgrade with real consequences:

1. **Superposition.** Because the equation for $`\Phi` is linear, the potential of any mass distribution is the sum (integral) of point-mass potentials. This is why engineers can compute the gravity of an irregular asteroid, a dam's water load, or a galaxy's rotation curve by simple integration.
2. **The shell theorem.** A spherically symmetric shell attracts exterior points as if all its mass were at the center, and exerts *zero* force on interior points. This is why planets can be treated as point masses and why the gravity inside a uniform sphere grows linearly with radius.
3. **Energy.** The potential energy of two masses is $`U = -Gm_1m_2/r`. Binding energy is negative: assembling a body from dispersed material releases energy, which powers accretion disks and star formation.

*Example.* Escape velocity: set kinetic energy equal to $`|U|`: $`\tfrac12 v^2 = GM/r`, so $`v_{\rm esc} = \sqrt{2GM/r}` — 11.2 km/s from Earth's surface, independent of the projectile's mass.

</details>

## Orbits and tides

**Definition.** Under an inverse-square attraction, a body of specific angular momentum $`h` follows a conic section with the central mass at a focus; tidal effects come from the *gradient* of the field across an extended body, scaling as $`GM\,\Delta r/r^3`.

<details><summary>Details</summary>

1. **Conic orbits.** The orbit equation is $`r = \frac{h^2/GM}{1 + e\cos\varphi}`: ellipses ($`e<1`), parabolas ($`e=1`), hyperbolas ($`e>1`). Kepler's three laws are corollaries. This is the basis of all [orbital mechanics](../../Mechanics/Readme.md) used for satellites and spacecraft.
2. **Tides.** The Moon pulls the near side of Earth more strongly than the far side. The differential acceleration is $`\Delta g \approx 2GMr/d^3` — note the *cube*: tides are a second-derivative effect. Tidal forces raise ocean bulges, lock rotations, heat Io, and will eventually shred anything falling into a black hole.
3. **Limits of the theory.** Newtonian gravity predicts Mercury's perihelion should be fixed; observation shows a residual precession of 43 arcseconds per century. General relativity explains it exactly — the first crack in the Newtonian picture.

*Example problem.* A satellite orbits Earth at 400 km altitude. What is its orbital period?

<details><summary>Solution</summary>

Kepler's third law: $`T = 2\pi\sqrt{a^3/GM_\oplus}` with $`a = R_\oplus + h \approx 6.77\times10^6` m and $`GM_\oplus = 3.986\times10^{14}` m³/s².

$`T = 2\pi\sqrt{(6.77\times10^6)^3 / 3.986\times10^{14}} \approx 2\pi\sqrt{7.79\times10^{18}/3.986\times10^{14}}` s $`\approx 2\pi\sqrt{1.955\times10^4}` s $`\approx 879` s $`\approx 92` minutes — the familiar low-Earth-orbit period.

</details>
</details>

## Example problem

A planet has twice Earth's mass and twice Earth's radius. What is the surface gravity compared to Earth's?

<details><summary>How to solve it</summary>

Surface gravity is $`g = GM/R^2`. With $`M` doubled and $`R` doubled: $`g' = G(2M)/(2R)^2 = \tfrac{2}{4}\,GM/R^2 = g/2`. The surface gravity is **half** of Earth's — mass grows faster than the square of the radius only if density is held fixed, which is not the case here.

</details>
