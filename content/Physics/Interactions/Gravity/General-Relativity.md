# General relativity

General relativity (GR) is the geometric theory of gravity: mass-energy curves spacetime, and free bodies follow the straightest possible paths (geodesics) in that curved geometry. It is needed whenever gravity is strong ($`\Phi/c^2` not negligible), when precision matters (GPS time correction, pulsar timing), or when the source is not just matter but any stress-energy, including pressure, radiation, and the field's own energy. It is the parent theory of every other page in the [Gravity](./Readme.md) topic: [Newtonian gravitation](./Newtonian-Gravitation.md) is its weak-field limit, and [Gravitational waves](./Gravitational-Waves.md), [Compact objects](./Compact-Objects.md), and [Cosmological gravity](./Cosmological-Gravity.md) are its radiative, strong-field stationary, and homogeneous-isotropic solution families.

> **Authoritative sources**
> - [Einstein, *The Foundation of the General Theory of Relativity* (1916)](https://en.wikisource.org/wiki/The_Foundation_of_the_General_Theory_of_Relativity)
> - [Misner, Thorne & Wheeler, *Gravitation* (1973)](https://www.amazon.com/Gravitation-Charles-Misner/dp/0716703368)
> - [Wald, *General Relativity* (1984)](https://press.uchicago.edu/ucp/books/book/chicago/G/bo3620305.html)

## The equivalence principle

**Definition.** Locally, the effects of a gravitational field are indistinguishable from those of an accelerated frame: a freely falling body follows a path independent of its mass and composition, and in a small enough laboratory free fall feels like zero gravity.

<details><summary>Details</summary>

1. **Weak equivalence principle.** Inertial mass equals gravitational mass, so all bodies fall with the same acceleration. Eötvös-type experiments verify this to $`\sim 10^{-13}`. Newtonian gravity *assumes* it; GR *builds the theory on it*.
2. **Einstein equivalence principle.** In a freely falling frame, all non-gravitational physics reduces to special relativity. Gravity is therefore not a force in the usual sense: it is the *geometry* that remains after you remove every local effect.
3. **Consequences.** Gravitational time dilation: clocks deeper in a potential well run slow by $`\Delta f/f \approx \Delta\Phi/c^2`. GPS satellites gain about 38 μs/day net (GR slows them by 45 μs/day at altitude, special relativity speeds them up by 7 μs/day from orbital speed); without correction, GPS positions would drift by kilometers per day.

*Example.* An astronaut in a windowless capsule in orbit floats because the capsule and the astronaut are both in free fall — the equivalence principle in action, not the absence of gravity.

</details>

## The Einstein field equations

**Definition.** Ten coupled nonlinear equations relating spacetime curvature to stress-energy:

```math
G_{\mu\nu} \equiv R_{\mu\nu} - \tfrac{1}{2}R\,g_{\mu\nu}
= \frac{8\pi G}{c^4}\,T_{\mu\nu}.
```

<details><summary>Details</summary>

1. **Left side: geometry.** $`g_{\mu\nu}` is the metric (the machine that converts coordinate separations into proper times and distances); $`R_{\mu\nu}` and $`R` are its curvatures. The Einstein tensor $`G_{\mu\nu}` is divergence-free, automatically conserving energy-momentum.
2. **Right side: matter.** $`T_{\mu\nu}` packages density, momentum flux, pressure, and shear. Crucially, *pressure gravitates*: radiation-dominated matter ($`p = \rho c^2/3`) pulls three times harder than dust. This is why the early universe's expansion decelerated faster, and why pressure can make collapse inevitable inside [Compact objects](./Compact-Objects.md).
3. **Nonlinearity.** Gravity gravitates: the field's own energy is a source. This makes exact solutions rare and is the technical root of why quantizing gravity is hard (see the [Gravity](./Readme.md) overview).
4. **Weak-field limit.** With $`g_{00} \approx -(1 + 2\Phi/c^2)`, the field equations reduce to Poisson's equation $`\nabla^2\Phi = 4\pi G\rho` — Newton's theory reappears, which is why the Newtonian page works so well on Earth.

*Example.* The Schwarzschild solution ($`T_{\mu\nu}=0` outside a spherical mass) yields light deflection of $`4GM/(c^2 b)` at impact parameter $`b` — twice the Newtonian prediction, confirmed by Eddington in 1919.

</details>

## Geodesic motion and classic tests

**Definition.** Free bodies follow geodesics of the metric; the three classical tests are perihelion precession, light deflection, and gravitational redshift.

<details><summary>Details</summary>

1. **Geodesic equation.** $`\dfrac{d^2x^\mu}{d\tau^2} + \Gamma^\mu_{\alpha\beta}\dfrac{dx^\alpha}{d\tau}\dfrac{dx^\beta}{d\tau} = 0`, where $`\Gamma^\mu_{\alpha\beta}` (Christoffel symbols) encode how the coordinate basis twists and stretches. In the weak field this reduces to Newton's $`\ddot{\mathbf{r}} = -\nabla\Phi` plus small corrections.
2. **Perihelion precession.** The relativistic correction to the orbit equation is $`\Delta\varphi \approx 6\pi GM/(c^2 a(1-e^2))` per orbit — 43″/century for Mercury, and minutes of arc per orbit for binary pulsars.
3. **Gravitational redshift.** Light climbing out of a potential well loses frequency: $`\Delta\lambda/\lambda \approx GM/(c^2 r)`. Pound–Rebka (1959) measured it over a 22.5 m tower.
4. **Modern tests.** Shapiro time delay, Gravity Probe B frame dragging, and Event Horizon Telescope shadow imaging all confirm GR in regimes spanning 15 orders of magnitude in field strength.

*Example problem.* How much slower does a clock run at Earth's surface compared to far away?

<details><summary>Solution</summary>

$`\Delta f/f \approx -GM_\oplus/(c^2 R_\oplus) = -(3.986\times10^{14})/((3\times10^8)^2 \times 6.37\times10^6)`.

Numerator: $`3.986\times10^{14}`. Denominator: $`9\times10^{16} \times 6.37\times10^6 = 5.73\times10^{23}`.

$`\Delta f/f \approx -7.0\times10^{-10}`: a surface clock loses about 22 ms per year relative to a clock at infinity (partially offset by Earth's rotation for a real observer).

</details>
</details>

## Example problem

Why does GPS need *both* special-relativistic and general-relativistic corrections?

<details><summary>How to solve it</summary>

Satellite clocks tick faster because they are higher in Earth's gravitational potential (GR effect: $`+\Delta\Phi/c^2`, about +45 μs/day) but slower because they move at ~3.9 km/s (special relativity: $`-v^2/2c^2`, about −7 μs/day). The net is +38 μs/day, and since light travels ~300 m per μs, ignoring it would corrupt positions by ~11 km/day. Both effects are of the same order of magnitude ($`v^2/c^2 \sim GM/(c^2 r)`), so neither can be neglected.

</details>
