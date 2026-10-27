# Compact objects

Compact objects — white dwarfs, neutron stars, and black holes — are the end states of stellar evolution, where gravity has overwhelmed every pressure support except quantum degeneracy or, ultimately, nothing at all. They are the strong-field solutions of the [Gravity](./Readme.md) topic: the regimes where $`\Phi/c^2` approaches 1 and general relativity is not a correction but the whole story.

> **Authoritative sources**
> - [Oppenheimer & Volkoff, *On Massive Neutron Cores* (1939)](https://journals.aps.org/pr/abstract/10.1103/PhysRev.55.374)
> - [Tolman's relativity thermodynamics chapter, and the TOV equation](https://en.wikipedia.org/wiki/Tolman%E2%80%93Oppenheimer%E2%80%93Volkoff_equation)
> - [Event Horizon Telescope, *First M87 Event Horizon Telescope Results* (2019)](https://iopscience.iop.org/article/10.3847/2041-8213/ab0ec7)

## White dwarfs: electron degeneracy

**Definition.** A white dwarf is supported by electron degeneracy pressure, giving a mass–radius relation $`R \propto M^{-1/3}`: adding mass makes the star *smaller*, until the Chandrasekhar limit $`M_{\rm Ch} \approx 1.44\,M_\odot`, beyond which no electron pressure can hold it up.

<details><summary>Details</summary>

1. **Degeneracy pressure.** Squeezing electrons into a smaller volume raises their Fermi momentum (Pauli exclusion); the resulting pressure is independent of temperature. Relativistic degeneracy softens the equation of state ($`p \propto \rho^{4/3}`), which caps the supported mass.
2. **Chandrasekhar limit.** Above $`1.44\,M_\odot`, degeneracy fails and collapse proceeds — the trigger for Type Ia supernovae (accreting dwarfs) and core-collapse supernovae (iron cores reaching the limit).

</details>

## Neutron stars and the TOV equation

**Definition.** A neutron star is supported by neutron degeneracy pressure plus nuclear forces; its structure follows the Tolman–Oppenheimer–Volkoff (TOV) equation, the general-relativistic generalization of hydrostatic equilibrium:

```math
\frac{dp}{dr} = -\frac{G\left(\rho + p/c^2\right)\left(m(r) + 4\pi r^3 p/c^2\right)}
{r^2\left(1 - 2Gm(r)/(c^2 r)\right)}.
```

<details><summary>Details</summary>

1. **Pressure gravitates.** The TOV equation adds $`p/c^2` to the density in *both* factors and multiplies the whole thing by the metric factor $`(1 - 2Gm/c^2r)^{-1}`. Pressure, which helps in Newtonian mechanics, makes relativistic collapse *worse* — this is why there is a maximum neutron-star mass ($`\sim 2.3\,M_\odot` observed, exact value equation-of-state dependent) and no stable object can be arbitrarily massive.
2. **Buchdahl bound.** Even with exotic support, any static sphere of radius $`R` needs $`2GM/(c^2R) < 8/9`: get within ~11% of your Schwarzschild radius and no equation of state can save you.
3. **Observations.** Radio pulsar timing weighs neutron stars to $`\sim 10^{-4}` precision; NICER measures radii; gravitational-wave events like GW170817 constrain the equation of state through tidal deformability.

</details>

## Black holes

**Definition.** When $`2GM/(c^2R) \to 1`, an event horizon forms at the Schwarzschild radius

```math
r_s = \frac{2GM}{c^2} \approx 3\ \mathrm{km} \times \frac{M}{M_\odot},
```

a one-way causal boundary: the defining strong-field object of GR, fully described by the Kerr metric (mass + spin + charge).

<details><summary>Details</summary>

1. **No-hair theorem.** A stationary black hole is completely characterized by mass, spin, and charge — an enormous information compression compared to the star that formed it.
2. **Kerr metric.** Real astrophysical black holes spin; the Kerr solution's frame dragging drags spacetime around the horizon and shrinks it to $`r_+ = GM/c^2` for an extremal hole.
3. **Observations.** The Event Horizon Telescope imaged the shadows of M87* and Sgr A*; LIGO hears their mergers. Both probe the same geometry from complementary sides.

</details>

## Relation to other classes

Compact objects are the strong-field *stationary* solutions of [General relativity](./General-Relativity.md); their mergers are the loudest sources of [Gravitational waves](./Gravitational-Waves.md), and their abundance and formation history feed into [Cosmological gravity](./Cosmological-Gravity.md) through the matter budget of the universe.
