# Cosmological gravity

Cosmological gravity is general relativity applied to the universe as a whole: on scales above ~100 Mpc the universe is homogeneous and isotropic on average, and its entire gravitational dynamics reduces to a single scale factor $`a(t)` governed by the Friedmann equations. This page covers the *gravitational dynamics* (how the metric evolves); the matter and radiation content, thermal history, and particle processes belong to the [Standard model](../../Standard-Model/Readme.md) topic's [Cosmology](../../Standard-Model/Cosmology.md) page.

> **Authoritative sources**
> - [Friedmann, *On the Possibility of a World with Constant Negative Curvature of Space* (1924)](https://link.springer.com/article/10.1007/s10714-011-1249-9)
> - [Planck Collaboration, *Cosmological parameters* (2018)](https://arxiv.org/abs/1807.06209)

## The Friedmann equations

**Definition.** For a homogeneous and isotropic universe with the FLRW metric,

```math
\left(\frac{\dot a}{a}\right)^2 = \frac{8\pi G}{3}\rho - \frac{kc^2}{a^2},
\qquad
\frac{\ddot a}{a} = -\frac{4\pi G}{3}\left(\rho + \frac{3p}{c^2}\right),
```

where $`a(t)` is the scale factor, $`k` is the spatial curvature, and $`\rho, p` are the total density and pressure.

<details><summary>Details</summary>

1. **Symmetry does the work.** Homogeneity and isotropy force the metric to depend on one function $`a(t)`; the field equations then reduce from ten coupled PDEs to two ODEs. All the complexity of cosmology lives in the *content* $`\rho, p`, not the geometry's form.
2. **Active gravitational mass.** The second equation shows pressure gravitates: a radiation-dominated fluid ($`p = \rho c^2/3`) decelerates expansion three times harder than dust at equal density. Dark energy with $`p = -\rho c^2` does the opposite: it *accelerates* expansion, which is the observed behavior since redshift $`z \approx 0.7`.
3. **Critical density.** Setting $`k = 0` defines $`\rho_{\rm crit} = 3H^2/(8\pi G) \approx 8.5\times10^{-27}` kg/m³ today. The density parameter $`\Omega = \rho/\rho_{\rm crit}` partitions the budget: ~5% ordinary matter, ~27% dark matter, ~68% dark energy.

</details>

## Structure formation

**Definition.** Small density perturbations $`\delta\rho/\rho` grow gravitationally: overdense regions attract more, self-amplify, and collapse into the filaments, clusters, and galaxies of the cosmic web.

<details><summary>Details</summary>

1. **Instability.** In a static Newtonian universe, a density perturbation grows exponentially (Jeans instability). In an expanding universe, growth is only algebraic ($`\delta \propto a` in matter domination), which is why the CMB's tiny $`10^{-5}` anisotropies needed ~13 billion years of growth to become galaxies.
2. **Dark matter's role.** Ordinary (baryonic) matter could not clump before recombination — radiation pressure held it up. Dark matter, feeling no such pressure, started collapsing earlier and built the gravitational scaffolding into which baryons later fell. The observed CMB anisotropy pattern is the fingerprint of this two-component dynamics.

</details>

## Relation to other classes

Cosmological gravity is the homogeneous-isotropic limit of [General relativity](./General-Relativity.md) — the same field equations applied with maximal symmetry. It differs from the other classes in that the *source* is the averaged universe rather than an individual object: [Compact objects](./Compact-Objects.md) and [Gravitational waves](./Gravitational-Waves.md) treat localized solutions, while this class treats the global metric whose expansion carries all of them.
