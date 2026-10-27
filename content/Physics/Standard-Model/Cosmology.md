# Cosmology

Cosmology is the study of the universe as a whole: its origin, evolution, and large-scale structure. It applies the Standard Model and general relativity to the universe on the largest scales, explaining the Big Bang, the synthesis of the first elements, the cosmic microwave background, the expansion of space, and the nature of dark matter and dark energy. It is relevant for understanding the origin of the elements, the fate of the universe, and the interpretation of astronomical observations.

> **Authoritative sources**
> - [Weinberg, *Cosmology* (Oxford, 2008)](https://global.oup.com/academic/product/cosmology-9780198526891)
> - [Ryden, *Introduction to Cosmology* (Addison-Wesley, 2003)](https://www.pearson.com/en-us/subject-catalog/p/introduction-to-cosmology/P200000003407)

## The Big Bang

**Definition.** The Big Bang model describes the universe as expanding from an initial hot, dense state ≈ 13.8 billion years ago. The expansion is described by the Friedmann equations derived from general relativity.

<details><summary>Details</summary>

The **Friedmann equation** governs the expansion rate:

```math
H^2 = \frac{8\pi G}{3}\rho - \frac{kc^2}{a^2} + \frac{\Lambda c^2}{3}
```

where $`H = \dot{a}/a` is the Hubble parameter, $`a(t)` is the scale factor, ρ is the energy density, k is the curvature, and Λ is the cosmological constant.

Key epochs:
- **Inflation** (t ~ 10⁻³⁶ s): exponential expansion smoothing the universe.
- **Quark–hadron transition** (t ~ 10⁻⁵ s): quarks confine into hadrons.
- **Nucleosynthesis** (t ~ 3 s to 20 min): light elements form.
- **Recombination** (t ~ 380,000 yr): electrons bind to nuclei; CMB is emitted.
- **Structure formation**: dark matter halos grow; galaxies form.

**Example.** The observed Hubble constant $`H_0 \approx 70` km/s/Mpc gives the Hubble time $`1/H_0 \approx 14` Gyr, consistent with the measured age of the universe.

</details>

## Big Bang nucleosynthesis

**Definition.** Big Bang nucleosynthesis (BBN) is the production of light elements (D, He-3, He-4, Li-7) during the first ≈ 20 minutes, when the universe cooled enough for nuclear reactions to proceed.

<details><summary>Details</summary>

As the universe expands and cools:
- At T ≳ 10⁹ K: neutrons and protons are in thermal equilibrium.
- At T ~ 10⁹ K: weak interactions freeze out; the neutron-to-proton ratio fixes at ≈ 1/7.
- At T ~ 10⁸ K: deuterium forms (the "deuterium bottleneck" is overcome).
- Rapid chain: D → He-3 → He-4. Almost all neutrons end up in He-4.

Predicted abundances (by mass):
- Hydrogen: ≈ 75%
- Helium-4: ≈ 25%
- Deuterium: ≈ 2 × 10⁻⁵
- Helium-3: ≈ 1 × 10⁻⁵
- Lithium-7: ≈ 1 × 10⁻¹⁰

These predictions match observations to high precision, providing strong evidence for the Big Bang model.

**Example.** The observed deuterium abundance in quasar absorption systems is a sensitive probe of the baryon density, since deuterium is easily destroyed in stars.

</details>

## Cosmic microwave background

**Definition.** The cosmic microwave background (CMB) is the relic radiation from recombination (z ≈ 1100), now observed as a nearly perfect blackbody at T = 2.725 K with tiny anisotropies (~10⁻⁵).

<details><summary>Details</summary>

At recombination, the universe became transparent: photons decoupled from matter and have been free-streaming ever since, redshifted from visible/IR to microwave.

The CMB power spectrum shows:
- **Acoustic peaks**: oscillations in the photon-baryon fluid before decoupling. The peak positions and heights encode the baryon density, dark matter density, H₀, and other cosmological parameters.
- **Polarization**: E-modes (scalar perturbations) and B-modes (potentially from gravitational waves from inflation).

The CMB is the most precise probe of the early universe and has measured the flatness of the universe to within ≈ 0.4%.

**Example.** The first acoustic peak at ℓ ≈ 220 corresponds to the sound horizon at decoupling. Its position tells us the universe is spatially flat (Ωₖ ≈ 0).

</details>

## Expansion and dark sector

**Definition.** The expansion of the universe is currently accelerating, driven by dark energy (Λ or a dynamical field). Dark matter (~27% of the energy budget) provides the gravitational scaffolding for structure formation.

<details><summary>Details</summary>

The energy budget of the universe (Planck 2018):
- Dark energy: ≈ 68%
- Dark matter: ≈ 27%
- Baryonic matter: ≈ 5%

**Dark matter**: does not emit or absorb light; inferred from galaxy rotation curves, gravitational lensing, and the CMB. Leading candidates: a stable, weakly-interacting massive particle (WIMP) or axion.

**Dark energy**: causes accelerated expansion. The simplest model is a cosmological constant (w = −1), but dynamical models (quintessence) are also considered.

The **acceleration** was discovered in 1998 via Type Ia supernovae: distant supernovae are dimmer than expected in a decelerating universe.

**Example.** The rotation curve of the Andromeda galaxy shows flat velocity profiles at large radii, indicating a dark matter halo extending far beyond the visible disk.

</details>

## Quiz

<details><summary>Example problem</summary>

The CMB has a peak temperature of 2.725 K. If the universe has expanded by a factor of a = 1100 since recombination, what was the temperature at the time of last scattering? What was the corresponding photon energy (in eV)?

<details><summary>Solution</summary>

The CMB temperature scales as T ∝ 1/a. At recombination:

$`T_{\text{rec}} = T_0 \times a = 2.725 \times 1100 \approx 3000` K.

Photon energy: $`E = k_B T = 8.617 \times 10^{-5} \text{ eV/K} \times 3000 \approx 0.26` eV.

This is in the visible/near-infrared range, consistent with the fact that the universe was opaque (a hot plasma) at this temperature and the photons were in thermal equilibrium with matter.

</details>

</details>