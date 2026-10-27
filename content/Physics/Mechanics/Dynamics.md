# Dynamics

Dynamics relates forces to the acceleration they produce. It is the causal layer of mechanics: given the state (position, velocity) and the forces, it determines the future trajectory. The special case of zero acceleration (static equilibrium) and the Lagrangian/Hamiltonian reformulations are treated here, as they are the same physics expressed with different tools.

The kinematic quantities (position, velocity, acceleration) are defined in [Kinematics](./Kinematics.md). The force models that serve as input to the equations of motion (gravity, electromagnetism, contact forces) are catalogued in [Interactions](../Interactions/Readme.md).

> **Authoritative sources**
> - [Landau & Lifshitz, *Mechanics* (Course of Theoretical Physics, Vol. 1)](https://www.physics.msu.ru/eng/ll/)

## Newton's laws

```math
\vec{F}_{\text{net}} = m\vec{a}
```

- **First law:** In an inertial frame, zero net force implies constant velocity.
- **Second law:** Net force equals mass times acceleration.
- **Third law:** Forces between two bodies are equal and opposite.

<details><summary>Details</summary>

The second law is the fundamental equation. All other equations of motion (Lagrangian, Hamiltonian) are equivalent reformulations. The first law defines inertial frames; the third law constrains the force model (internal forces cancel in a closed system).

For a system of $`N` particles:

```math
m_i \vec{a}_i = \vec{F}_i^{\text{ext}} + \sum_{j \neq i} \vec{F}_{ij}
```

Summing over all particles, internal forces cancel (third law), giving:

```math
M\vec{a}_{\text{CM}} = \vec{F}_{\text{net}}^{\text{ext}}
```

where $`M` is total mass and $`\vec{a}_{\text{CM}}` is the center-of-mass acceleration.

</details>

## Momentum and impulse

```math
\vec{p} = m\vec{v}, \quad \vec{F} = \frac{d\vec{p}}{dt}
```

Impulse: $`\vec{J} = \int \vec{F}\,dt = \Delta\vec{p}`.

<details><summary>Details</summary>

The momentum form is more general than $`F = ma` (it handles variable-mass systems like rockets). Conservation of total momentum follows when $`\vec{F}_{\text{net}}^{\text{ext}} = 0`.

</details>

## Angular momentum

For a point particle at position $`\vec{r}` with momentum $`\vec{p}`:

```math
\vec{L} = \vec{r} \times \vec{p}, \quad \vec{\tau} = \frac{d\vec{L}}{dt}
```

where $`\vec{\tau} = \vec{r} \times \vec{F}` is the torque about the origin. When $`\vec{\tau} = 0`, angular momentum is conserved.

<details><summary>Details</summary>

The angular momentum $`\vec{L} = \vec{r} \times \vec{p}` is a pseudovector perpendicular to the plane of motion. Its magnitude is $`L = mvr\sin\alpha` where $`\alpha` is the angle between $`\vec{r}` and $`\vec{p}`.

The torque equation $`\vec{\tau} = d\vec{L}/dt` is the rotational analogue of $`\vec{F} = d\vec{p}/dt`. For a system of particles, the total angular momentum about the center of mass is conserved when the net external torque vanishes.

In the Lagrangian formulation, conservation of $`\vec{L}` follows from rotational symmetry via Noether's theorem (see below). The rigid-body extension $`\vec{L} = \mathbf{I}\,\vec{\omega}` (inertia tensor times angular velocity) is treated in [Rigid-Body Mechanics](./Rigid-Body-Mechanics.md).

**Example:** A figure skater pulling in their arms reduces the moment of inertia $`I`, so $`\omega` increases to keep $`L = I\omega` constant.

</details>

## Work and energy

```math
W = \int \vec{F} \cdot d\vec{r}, \quad K = \tfrac{1}{2}mv^2
```

Work–energy theorem: $`W_{\text{net}} = \Delta K`.

For conservative forces: $`W = -\Delta U`, and total mechanical energy $`E = K + U` is conserved.

<details><summary>Details</summary>

A force is conservative if $`\nabla \times \vec{F} = 0` (in a simply connected region), which guarantees the existence of a potential $`U` with $`\vec{F} = -\nabla U`. Non-conservative forces (friction, drag) dissipate mechanical energy into heat; see [Thermodynamics](../Thermodynamics/Readme.md).

</details>

## Static equilibrium

When $`\vec{a} = 0` for all parts of a body:

```math
\sum \vec{F} = 0, \quad \sum \vec{\tau} = 0
```

<details><summary>Details</summary>

Static equilibrium is the $`a = 0` special case of dynamics. It applies to structures (beams, trusses, frames) where all accelerations vanish. The two conditions (force balance and moment balance) give up to 6 scalar equations in 3-D (3 force + 3 moment), which determine unknown reaction forces.

For a 2-D problem: 3 equations ($`\sum F_x = 0`, $`\sum F_y = 0`, $`\sum \tau_O = 0`).

**Example:** A uniform beam of mass $`m` and length $`L` rests on two supports at its ends. Each support carries $`mg/2`.

</details>

## Central forces and the two-body problem

A central force acts along the line joining two bodies: $`\vec{F} = f(r)\,\hat{r}`. The two-body problem (two masses $`m_1`, $`m_2` interacting via a central force) reduces to a one-body problem with reduced mass:

```math
\mu = \frac{m_1 m_2}{m_1 + m_2}
```

The relative coordinate $`\vec{r} = \vec{r}_1 - \vec{r}_2` obeys $`\mu\,\ddot{\vec{r}} = \vec{F}(r)`.

<details><summary>Details</summary>

**Reduction:** The center of mass moves uniformly (no external force). In the center-of-mass frame, the problem is equivalent to a single particle of mass $`\mu` in the potential $`V(r)`.

**Effective potential:** Because angular momentum $`L = \mu r^2 \dot{\theta}` is conserved (central force → zero torque), the radial equation becomes:

```math
\mu \ddot{r} = -\frac{dV}{dr} + \frac{L^2}{\mu r^3}
```

The term $`L^2/(2\mu r^2)` acts as a centrifugal barrier. The effective potential is:

```math
V_{\text{eff}}(r) = V(r) + \frac{L^2}{2\mu r^2}
```

**Kepler's laws** follow for $`V(r) = -GM\mu/r`:
1. Orbits are conic sections (ellipse, parabola, hyperbola).
2. Equal areas are swept in equal times (angular momentum conservation).
3. $`T^2 \propto a^3` (period squared proportional to semi-major axis cubed).

The force law itself (Newton's law of gravitation) is treated in [Gravity](../Interactions/Gravity/Readme.md); this section covers the orbital mechanics that follows from it.

</details>

## Variational principle (Hamilton's principle)

The actual path taken by a mechanical system between two fixed endpoints makes the **action** stationary:

```math
S[\vec{q}(t)] = \int_{t_1}^{t_2} L\bigl(\vec{q}(t),\, \dot{\vec{q}}(t),\, t\bigr)\, dt
```

That is, $`\delta S = 0` for all virtual variations $`\delta q_i(t)` that vanish at the endpoints.

<details><summary>Details</summary>

Hamilton's principle is the variational foundation of all of analytical mechanics. The Euler–Lagrange equations are not independent postulates; they are the **Euler–Lagrange equations of calculus of variations** applied to the functional $`S`.

**Derivation sketch:** Let $`q_i(t) \to q_i(t) + \epsilon\,\eta_i(t)` with $`\eta_i(t_1) = \eta_i(t_2) = 0`. Requiring $`dS/d\epsilon|_{\epsilon=0} = 0`:

```math
0 = \int_{t_1}^{t_2} \left(\frac{\partial L}{\partial q_i}\,\eta_i + \frac{\partial L}{\partial \dot{q}_i}\,\dot{\eta}_i\right) dt
```

Integrating the second term by parts and discarding the boundary term (since $`\eta_i` vanishes at endpoints):

```math
0 = \int_{t_1}^{t_2} \left(\frac{\partial L}{\partial q_i} - \frac{d}{dt}\frac{\partial L}{\partial \dot{q}_i}\right)\eta_i\, dt
```

Since $`\eta_i` is arbitrary, the integrand must vanish, giving the Euler–Lagrange equations.

This variational viewpoint explains *why* the equations work: the true trajectory is the one that extremizes the action, just as a light ray extremizes optical path length (Fermat's principle). It also generalizes naturally to fields (classical field theory) and to quantum mechanics (path integrals).

</details>

## Lagrangian mechanics

For a system with generalized coordinates $`q_i` and $`n` degrees of freedom:

```math
L = T - V, \quad \frac{d}{dt}\frac{\partial L}{\partial \dot{q}_i} - \frac{\partial L}{\partial q_i} = 0
```

<details><summary>Details</summary>

The Lagrangian $`L = T - V` encodes the dynamics in a scalar. The Euler–Lagrange equations are equivalent to Newton's second law but work naturally with constraints (e.g., a pendulum's fixed length) and in any coordinate system.

**Connection to Newton's second law:** For a single particle in Cartesian coordinates, $`T = \tfrac{1}{2}m(\dot{x}^2+\dot{y}^2+\dot{z}^2)` and $`V = V(x,y,z)`. The Euler–Lagrange equation for coordinate $`x`:

```math
\frac{d}{dt}\frac{\partial L}{\partial \dot{x}} - \frac{\partial L}{\partial x} = \frac{d}{dt}(m\dot{x}) - \frac{\partial V}{\partial x} = m\ddot{x} + F_x = 0
```

which is exactly $`m\ddot{x} = -\partial V/\partial x = F_x`. The same holds for $`y` and $`z`, recovering $`\vec{F} = m\vec{a}`. The two formulations are the same physics; the Lagrangian form simply packages the three component equations into a coordinate-free variational statement.

**Noether's theorem:** Every continuous symmetry of $`L` yields a conserved quantity.
- Time-translation symmetry → energy conservation.
- Space-translation symmetry → momentum conservation.
- Rotation symmetry → angular momentum conservation.

This is the deep reason conservation laws exist: they are consequences of the symmetries of space and time, not independent postulates.

</details>

## Hamiltonian mechanics and phase space

```math
p_i = \frac{\partial L}{\partial \dot{q}_i}, \quad H = \sum p_i \dot{q}_i - L
```

Hamilton's equations:

```math
\dot{q}_i = \frac{\partial H}{\partial p_i}, \quad \dot{p}_i = -\frac{\partial H}{\partial q_i}
```

<details><summary>Details</summary>

Phase space is the $`2n`-dimensional space of $`(q_1, \ldots, q_n, p_1, \ldots, p_n)`. Hamilton's equations describe a flow in this space. Liouville's theorem states that the phase-space volume is preserved under this flow, which is the mechanical foundation of [Statistical Mechanics](../Statistical-Mechanics/Readme.md).

The Hamiltonian $`H` equals the total energy $`T + V` when the potential does not depend on velocities and the coordinate transformation is time-independent.

</details>

## Interactive simulation

<iframe src="./Dynamics.simulation.html" title="Particle under gravity, spring, and drag forces with real-time trajectory and energy display"></iframe>

## Example problem

A block of mass $`m` slides down a frictionless incline of angle $`\theta`. Find its acceleration and speed after traveling distance $`s` from rest.

<details><summary>Solution</summary>

Forces along the incline: $`mg\sin\theta`. Newton's second law: $`ma = mg\sin\theta`, so $`a = g\sin\theta`.

Speed after distance $`s`: $`v^2 = 2as = 2gs\sin\theta`, so $`v = \sqrt{2gs\sin\theta}`.

Energy check: $`mgh = \tfrac{1}{2}mv^2` where $`h = s\sin\theta`. Same result.

</details>
