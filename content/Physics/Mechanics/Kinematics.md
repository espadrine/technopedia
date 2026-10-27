# Kinematics

Kinematics describes motion without reference to its causes. It is the geometric and temporal language used by every other branch of mechanics: [Dynamics](./Dynamics.md), [Oscillations and Waves](./Oscillations/Readme.md), [Rigid-Body Mechanics](./Rigid-Body-Mechanics.md), and [Continuum Mechanics](./Continuum-Mechanics.md) all express their equations in kinematic quantities.

> **Authoritative sources**
> - [OpenStax University Physics Volume 1, Chapter 3: Motion Along a Straight Line](https://openstax.org/books/university-physics-volume-1/pages/3-1-position-displacement-and-average-velocity)
> - [OpenStax University Physics Volume 1, Chapter 4: Motion in Two and Three Dimensions](https://openstax.org/books/university-physics-volume-1/pages/4-1-displacement-and-velocity-vectors)

## Position, velocity, acceleration

For a particle in $`\mathbb{R}^3`:

```math
\vec{r}(t), \quad \vec{v}(t) = \frac{d\vec{r}}{dt}, \quad \vec{a}(t) = \frac{d\vec{v}}{dt}
```

Speed is the magnitude of velocity; it is a scalar and loses directional information: $`|\vec{v}| \neq \vec{v}` in general. A car going 60 km/h north and a car going 60 km/h south have the same speed but different velocities.

In polar coordinates $`(r, \theta)`:

```math
\vec{v} = \dot{r}\,\hat{r} + r\dot{\theta}\,\hat{\theta}
\vec{a} = (\ddot{r} - r\dot{\theta}^2)\,\hat{r} + (r\ddot{\theta} + 2\dot{r}\dot{\theta})\,\hat{\theta}
```

<details><summary>Details</summary>

The polar form separates radial and tangential components. The term $`-r\dot{\theta}^2` is the centripetal acceleration (always inward), and $`2\dot{r}\dot{\theta}` is the Coriolis term (appears when the radial distance changes while the particle also rotates). In 3-D, spherical coordinates add a $`\phi`-component; the full expression follows the same pattern: each coordinate's second derivative plus cross-terms from the changing basis vectors.

For uniform circular motion ($`r = \text{const}`, $`\dot{r} = 0`), the formulas reduce to $`\vec{v} = r\dot{\theta}\,\hat{\theta}` and $`\vec{a} = -r\dot{\theta}^2\,\hat{r}`, recovering the familiar centripetal-acceleration result. This connects directly to the Frenet–Serret decomposition below.

</details>

## Geometric interpretation: tangential and normal components

For a particle constrained to a curve, the Frenet–Serret frame decomposes acceleration into two orthogonal parts:

```math
\vec{a} = \ddot{s}\,\hat{t} + \frac{\dot{s}^2}{\rho}\,\hat{n}
```

where $`\hat{t}` is the unit tangent, $`\hat{n}` the principal normal, $`\rho` the radius of curvature, and $`s` the arc length. Velocity is always tangent to the trajectory: $`\vec{v} = \dot{s}\,\hat{t}`.

- **Tangential component** $`\ddot{s}\,\hat{t}`: changes the speed (magnitude of velocity).
- **Normal (centripetal) component** $`\dot{s}^2/\rho\,\hat{n}`: changes the direction of velocity.

<details><summary>Details</summary>

**Uniform circular motion.** A particle on a circle of radius $`R` at constant angular speed $`\omega` has $`\dot{s} = R\omega` (constant) and $`\rho = R`. The tangential component vanishes ($`\ddot{s} = 0`) and the entire acceleration is centripetal:

```math
\vec{a} = -\omega^2 R\,\hat{r}
```

This is the special case where the Frenet normal $`\hat{n}` coincides with the inward radial direction $`-\hat{r}`.

**Projectile motion.** For a projectile under gravity, the tangential component is $`g\sin\alpha` (where $`\alpha` is the angle between the velocity and the horizontal) and the normal component is $`g\cos\alpha`. At the apex, $`\alpha = 0` and the full acceleration is normal (centripetal); at launch and landing, the tangential component is largest.

The Frenet–Serret frame is the natural language for any curved trajectory and is the bridge between the polar-coordinate formulas above and the general vector description.

</details>

## Constant-acceleration equations (1-D)

When $`a` is constant:

```math
v = v_0 + at
x = x_0 + v_0 t + \tfrac{1}{2}at^2
v^2 = v_0^2 + 2a(x - x_0)
```

<details><summary>Details</summary>

These four equations are algebraically equivalent; any three determine the fourth. They apply to free fall ($`a = -g`), uniformly accelerated vehicles, and any 1-D motion with constant acceleration. In 2-D or 3-D with constant $`\vec{a}`, each component satisfies the same set independently.

**Example:** A ball thrown upward at $`v_0 = 20\;\text{m/s}`. Time to peak: $`t = v_0/g \approx 2.04\;\text{s}`. Maximum height: $`h = v_0^2/(2g) \approx 20.4\;\text{m}`.

</details>

## From acceleration to position: integration

The practical direction in solving motion problems is the inverse of differentiation: given $`\vec{a}(t)`, recover $`\vec{v}(t)` and $`\vec{r}(t)` by successive integration.

```math
\vec{v}(t) = \vec{v}_0 + \int_0^t \vec{a}(t')\,dt'
\vec{r}(t) = \vec{r}_0 + \int_0^t \vec{v}(t')\,dt'
```

Each integration introduces one constant of integration (the initial velocity or position), so two initial conditions are needed to fully determine the trajectory.

<details><summary>Details</summary>

For constant acceleration the integrals evaluate to the closed-form equations in the previous section. For time-dependent acceleration (e.g., drag $`\vec{a} = -k\vec{v}`), the integrals must be solved analytically or numerically. In 2-D and 3-D the integration is performed component-wise.

This inverse direction is what a student uses most often: the problem gives forces (hence acceleration) and initial conditions, and asks for the trajectory.

</details>

## Relative motion and Galilean transformation

For two inertial frames $`S` and $`S'` with $`S'` moving at constant velocity $`\vec{u}` relative to $`S`:

```math
\vec{r}' = \vec{r} - \vec{u}\,t, \quad \vec{v}' = \vec{v} - \vec{u}, \quad \vec{a}' = \vec{a}, \quad t' = t
```

Time is absolute: both observers agree on the duration of any event ($`t' = t`). Velocities differ by the constant $`\vec{u}`, but accelerations are identical.

<details><summary>Details</summary>

**Ball dropped from a moving train.** A passenger on a train moving at constant $`\vec{u}` drops a ball. In the train frame $`S'`, the ball falls straight down: $`x' = 0`, $`y' = -\tfrac{1}{2}gt^2`. In the ground frame $`S`, the ball follows a parabola: $`x = ut`, $`y = -\tfrac{1}{2}gt^2`. Both observers measure the same acceleration $`\vec{a} = \vec{a}' = (0, -g)` and the same time of flight. The trajectories differ, but the physics (acceleration, time) is invariant.

Acceleration is invariant under Galilean transformations, which is why Newton's laws take the same form in all inertial frames. This invariance breaks down at relativistic speeds; see [Interactions](../Interactions/Readme.md) for the Lorentz transformation.

</details>

<iframe src="./Kinematics.simulation.html" title="Projectile motion with velocity, acceleration, and Frenet-Serret tangential/normal decomposition"></iframe>

## Example problem

A projectile is launched from the origin at speed $`v_0` and angle $`\theta` above horizontal. Find the range and maximum height.

<details><summary>Solution</summary>

Decompose: $`v_{0x} = v_0\cos\theta`, $`v_{0y} = v_0\sin\theta`.

**Time of flight.** Using $`y = y_0 + v_{0y}\,t + \tfrac{1}{2}a_y\,t^2` with $`y_0 = 0`, $`a_y = -g`, and setting $`y = 0` at landing:

```math
0 = v_0\sin\theta\;t - \tfrac{1}{2}g\,t^2 \;\Longrightarrow\; T = \frac{2v_0\sin\theta}{g}
```

**Range.** Using $`x = x_0 + v_{0x}\,t` (no horizontal acceleration) with $`t = T`:

```math
R = v_0\cos\theta \cdot \frac{2v_0\sin\theta}{g} = \frac{v_0^2 \sin 2\theta}{g}
```

**Maximum height.** Using $`v_y^2 = v_{0y}^2 + 2a_y\,\Delta y` with $`v_y = 0` at the peak:

```math
0 = v_0^2\sin^2\theta - 2g\,h \;\Longrightarrow\; h = \frac{v_0^2 \sin^2\theta}{2g}
```

Maximum range occurs at $`\theta = 45°` (since $`\sin 2\theta` is maximized there).

</details>