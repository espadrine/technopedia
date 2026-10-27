# Rigid-Body Mechanics

Rigid-body mechanics extends point-mass dynamics to extended bodies that do not deform. It is relevant to rotating machinery, spacecraft attitude control, robotics, and any system where the distance between material points is fixed. It builds on [Dynamics](./Dynamics.md) (forces, energy, momentum) and [Kinematics](./Kinematics.md) (velocity, acceleration).

> **Authoritative sources**
> - [Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed.](https://www.pearson.com/en-us/subject-catalog/p/classical-mechanics/P200000006871/9780201657029)

## Rigid-body kinematics

A rigid body's configuration is specified by the position $`\vec{r}_0` of a reference point and a rotation $`\hat{R}(t) \in SO(3)`.

Velocity of a point at position $`\vec{r}` relative to the reference point:

```math
\vec{v} = \vec{v}_0 + \vec{\omega} \times \vec{r}
```

**Rolling without slipping.** For a round body of radius $`R` rolling on a fixed surface, the contact point is instantaneously at rest, which couples translation to rotation:

```math
v = \omega\,R, \qquad a = \alpha\,R
```

with $`\alpha = \dot{\omega}` the angular acceleration. This constraint is what makes a rolling disk accelerate more slowly down a ramp than a sliding block (see the [Quizz](#quizz)).

<details><summary>Details</summary>

$`\vec{\omega}` is the angular velocity vector. The cross-product form encodes that all points rotate about an instantaneous axis. The acceleration adds a centripetal term:

```math
\vec{a} = \vec{a}_0 + \dot{\vec{\omega}} \times \vec{r} + \vec{\omega} \times (\vec{\omega} \times \vec{r})
```

The term $`\vec{\omega} \times (\vec{\omega} \times \vec{r})` is the centripetal acceleration, always directed toward the rotation axis.

**Connecting SO(3) to ω.** The rotation matrix $`\hat{R}(t)` is a $`3\times 3` orthogonal matrix with determinant 1. The angular velocity vector is the body-frame representation of the time derivative of the rotation:

```math
\hat{R}^{\mathsf{T}}\,\dot{\hat{R}} = [\vec{\omega}]_\times
```

where the angular velocity vector $`\vec{\omega}` is the vector corresponding to the skew-symmetric matrix $`\hat{R}^{\mathsf{T}}\,\dot{\hat{R}}` as written below:

```math
\hat{R}^{\mathsf{T}}\,\dot{\hat{R}} = [\vec{\omega}]_\times
```

A common parameterization of $`\hat{R}` is via three Euler angles (e.g., z-y'-z'' convention), which reduce the three degrees of freedom of SO(3) to three coordinates.

</details>

## Moment of inertia

```math
I_{ij} = \int \rho(\vec{r})\,(r^2\delta_{ij} - x_i x_j)\,d^3r
```

For a point mass: $`I = mr^2` about an axis at distance $`r`.

<details><summary>Details</summary>

**Step 1 — The inertia tensor as a geometric object.** The inertia tensor $`\mathbf{I}` is a symmetric $`3\times 3` matrix. Its eigenvalues are the principal moments of inertia; the eigenvectors define the principal axes. The tensor can be visualized as an ellipsoid (the *inertia ellipsoid*): the surface $`\vec{x}^{\mathsf{T}}\mathbf{I}\,\vec{x} = 1` has semi-axes of length 1/√I₁, 1/√I₂, and 1/√I₃ along the principal directions.

<svg width="360" height="240" viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:10px auto;max-width:100%;">
  <rect width="360" height="240" fill="#1a1a2e" rx="8"/>
  <!-- Inertia ellipsoid (2D projection) -->
  <ellipse cx="180" cy="120" rx="100" ry="60" fill="none" stroke="#4fc3f7" stroke-width="2"/>
  <ellipse cx="180" cy="120" rx="100" ry="60" fill="rgba(79,195,247,0.08)"/>
  <!-- Principal axes -->
  <line x1="180" y1="120" x2="290" y2="120" stroke="#66bb6a" stroke-width="1.5"/>
  <text x="295" y="124" fill="#66bb6a" font-size="11">1/√I₁</text>
  <line x1="180" y1="120" x2="180" y2="55" stroke="#ff7043" stroke-width="1.5"/>
  <text x="185" y="50" fill="#ff7043" font-size="11">1/√I₂</text>
  <line x1="180" y1="120" x2="120" y2="165" stroke="#ce93d8" stroke-width="1.5"/>
  <text x="95" y="180" fill="#ce93d8" font-size="11">1/√I₃</text>
  <!-- Center dot -->
  <circle cx="180" cy="120" r="3" fill="#fff"/>
  <!-- Label -->
  <text x="180" y="225" fill="#aaa" font-size="11" text-anchor="middle">Inertia ellipsoid: xᵀ I x = 1</text>
</svg>

**Step 2 — Off-diagonal terms (products of inertia).** The components $`I_{ij}` with $`i \neq j` measure how the mass distribution is *tilted* relative to the chosen axes: they vanish whenever the body has a symmetry plane containing the corresponding axes. When they are nonzero, $`\vec{L} = \mathbf{I}\,\vec{\omega}` is no longer parallel to $`\vec{\omega}` — the body wobbles as it spins. Choosing the principal axes as the coordinate frame diagonalizes $`\mathbf{I}` and removes this coupling.

**Step 3 — Worked example: thin rod about its center.** Consider a uniform thin rod of mass $`m` and length $`L`, lying along the $`x`-axis, rotating about the $`y`-axis through its center.

1. The linear density is $`\lambda = m/L`.
2. A mass element at position $`x` (with $`-L/2 \leq x \leq L/2`) has mass $`dm = \lambda\,dx`.
3. Its distance to the y-axis is $`|x|`, so it contributes $`dI = x^2\,dm = \lambda\,x^2\,dx`.
4. Integrating: $`I_y = \lambda\int_{-L/2}^{L/2} x^2\,dx = \frac{m}{L}\cdot\frac{L^3}{12} = \tfrac{1}{12}mL^2`.

**Step 4 — Useful theorems.**

*Parallel-axis theorem (tensor form).* Shifting the origin by a vector $`\vec{d}`:

```math
I'_{ij} = I_{ij} + m\,(d^2\,\delta_{ij} - d_i\,d_j)
```

The scalar form $`I' = I + m\,d^2` is obtained by projecting onto the axis direction.

*Perpendicular axis theorem.* For a planar lamina lying in the $`xy`-plane:

```math
I_z = I_x + I_y
```

This follows directly from the definition: for a point in the plane, $`z = 0` so $`I_z = \int \rho\,(x^2+y^2)\,dA = I_x + I_y`.

**Common values:**
- Solid sphere about center: $`\tfrac{2}{5}mR^2`
- Solid cylinder about axis: $`\tfrac{1}{2}mR^2`
- Thin rod about center: $`\tfrac{1}{12}mL^2`
- Thin disk about diameter: $`\tfrac{1}{4}mR^2` (by perpendicular axis theorem)

> **Authoritative sources**
> - [Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., Ch. 4](https://www.pearson.com/en-us/subject-catalog/p/classical-mechanics/P200000006871/9780201657029)

<details><summary>Example problem</summary>

A uniform solid sphere of mass $`m` and radius $`R` has a thin cylindrical hole of radius $`r` (with $`r \ll R`) drilled through its center, parallel to a diameter. Find the moment of inertia of the remaining body about that diameter.

<details><summary>Solution</summary>

By the parallel-axis theorem (in reverse), the moment of inertia of the removed cylinder about the diameter is the sum of its moment about its own axis and the $`md^2` correction. Since the cylinder's axis coincides with the diameter, $`d = 0`, so the cylinder's moment about the diameter is simply its moment about its own long axis: $`I_{\text{cyl}} = \tfrac{1}{2}m_{\text{cyl}}\,r^2` where $`m_{\text{cyl}} = \rho\,\pi r^2 (2R)` is the mass of the removed cylinder.

The remaining body has moment of inertia:

```math
I = \tfrac{2}{5}mR^2 - \tfrac{1}{2}m_{\text{cyl}}\,r^2
```

For $`r \ll R`, the correction is small and $`I \approx \tfrac{2}{5}mR^2`.

</details>

</details>

</details>

## Angular momentum and torque

```math
\vec{L} = \mathbf{I}\,\vec{\omega}, \quad \vec{\tau} = \frac{d\vec{L}}{dt}
```

<details><summary>Details</summary>

In general $`\vec{L}` and $`\vec{\omega}` are not parallel (they are parallel only along principal axes).

**Body frame vs. space frame.** The *body frame* is a coordinate system that rotates with the rigid body, aligned with its principal axes. In this frame the inertia tensor $`\mathbf{I}` is constant (diagonal, with entries $`I_1, I_2, I_3`). The *space frame* is inertial. The time derivative of any vector $`\vec{A}` in the space frame relates to its derivative in the body frame by:

```math
\left(\frac{d\vec{A}}{dt}\right)_{\text{space}} = \left(\frac{d\vec{A}}{dt}\right)_{\text{body}} + \vec{\omega} \times \vec{A}
```

<svg width="400" height="260" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:10px auto;max-width:100%;">
  <rect width="400" height="260" fill="#1a1a2e" rx="8"/>
  <!-- Space frame (fixed) -->
  <line x1="200" y1="180" x2="200" y2="60" stroke="#888" stroke-width="1.5"/>
  <polygon points="200,55 196,63 204,63" fill="#888"/>
  <text x="205" y="62" fill="#888" font-size="11">Z (space)</text>
  <line x1="200" y1="180" x2="310" y2="180" stroke="#888" stroke-width="1.5"/>
  <polygon points="315,180 307,176 307,184" fill="#888"/>
  <text x="318" y="184" fill="#888" font-size="11">X</text>
  <line x1="200" y1="180" x2="140" y2="220" stroke="#888" stroke-width="1.5"/>
  <polygon points="136,223 143,217 140,225" fill="#888"/>
  <text x="120" y="235" fill="#888" font-size="11">Y</text>
  <!-- Body frame (rotated ~30 degrees) -->
  <line x1="200" y1="180" x2="260" y2="80" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="263,75 254,83 264,87" fill="#66bb6a"/>
  <text x="268" y="78" fill="#66bb6a" font-size="11">3 (body)</text>
  <line x1="200" y1="180" x2="300" y2="210" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="305,212 297,206 298,215" fill="#66bb6a"/>
  <text x="308" y="218" fill="#66bb6a" font-size="11">1</text>
  <line x1="200" y1="180" x2="150" y2="130" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="147,126 153,133 145,135" fill="#66bb6a"/>
  <text x="130" y="125" fill="#66bb6a" font-size="11">2</text>
  <!-- Vector A shown in both frames -->
  <line x1="200" y1="180" x2="240" y2="110" stroke="#4fc3f7" stroke-width="2.5"/>
  <polygon points="242,105 234,113 244,117" fill="#4fc3f7"/>
  <text x="248" y="108" fill="#4fc3f7" font-size="12">A</text>
  <!-- Rotation arrow -->
  <path d="M 230 155 A 35 35 0 0 1 220 130" fill="none" stroke="#ff7043" stroke-width="1.5"/>
  <polygon points="218,126 222,135 215,134" fill="#ff7043"/>
  <text x="235" y="145" fill="#ff7043" font-size="11">ω</text>
  <!-- Labels -->
  <text x="10" y="250" fill="#aaa" font-size="11">Space frame (fixed) vs. body frame (rotating with the body)</text>
</svg>

Applying this to $`\vec{L}` and using $`\vec{L} = \mathbf{I}\,\vec{\omega}` with constant $`\mathbf{I}` in the body frame gives Euler's equations:

```math
I_1\dot{\omega}_1 - (I_2 - I_3)\omega_2\omega_3 = \tau_1
I_2\dot{\omega}_2 - (I_3 - I_1)\omega_3\omega_1 = \tau_2
I_3\dot{\omega}_3 - (I_1 - I_2)\omega_1\omega_2 = \tau_3
```

The terms $`(I_j - I_k)\omega_j\omega_k` arise from the $`\vec{\omega} \times \vec{L}` correction: they vanish when the body is spherically symmetric ($`I_1 = I_2 = I_3`) or when rotation is about a single principal axis.

> **Authoritative sources**
> - [Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., Ch. 5](https://www.pearson.com/en-us/subject-catalog/p/classical-mechanics/P200000006871/9780201657029)

</details>

## Precession and gyroscopic effects

For a symmetric top ($`I_1 = I_2`), torque-free precession carries the angular velocity around the symmetry axis at rate:

```math
\Omega = \frac{(I_3 - I_1)\,\omega_3}{I_1}
```

**Intermediate axis theorem:** rotation about the intermediate principal axis of a triaxial body is unstable — a tiny perturbation grows and the body tumbles (the Dzhanibekov effect).

<details><summary>Details</summary>

**Step 1 — Euler's equations for a symmetric top.** For a body with $`I_1 = I_2 \neq I_3` (e.g., a spinning top, a bicycle wheel), Euler's equations with $`\vec{\tau} = 0` give:

```math
\dot{\omega}_1 = \frac{I_2 - I_3}{I_1}\,\omega_2\,\omega_3, \quad
\dot{\omega}_2 = \frac{I_3 - I_1}{I_1}\,\omega_3\,\omega_1, \quad
\dot{\omega}_3 = 0
```

The component $`\omega_3` along the symmetry axis is constant. In the body frame, $`\vec{\omega}` traces a circle at angular rate $`\Omega = (I_3 - I_1)\omega_3 / I_1` around the symmetry axis.

**Step 2 — The two-cone picture.** In the space frame, $`\vec{L}` is fixed (no torque). The body's symmetry axis (the 3-axis) precesses around $`\vec{L}`. The angular velocity $`\vec{\omega}` lies between $`\vec{L}` and the symmetry axis. The tip of $`\vec{\omega}` traces:

- a cone on the *body* (the **body cone**), with half-angle determined by $`\omega_3 / \omega`
- a cone in *space* (the **space cone**), with half-angle determined by the angle between $`\vec{\omega}` and $`\vec{L}`

The body cone rolls without slipping on the space cone. This is the geometric picture of torque-free precession.

<svg width="420" height="300" viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:10px auto;max-width:100%;">
  <rect width="420" height="300" fill="#1a1a2e" rx="8"/>
  <!-- L vector: vertical, fixed -->
  <line x1="210" y1="260" x2="210" y2="50" stroke="#ff7043" stroke-width="3"/>
  <polygon points="210,44 204,56 216,56" fill="#ff7043"/>
  <text x="220" y="55" fill="#ff7043" font-size="15" font-weight="bold">L</text>
  <!-- Symmetry axis e3: at ~25 degrees from vertical to the right -->
  <line x1="210" y1="260" x2="300" y2="65" stroke="#66bb6a" stroke-width="2.5"/>
  <polygon points="303,60 293,68 303,72" fill="#66bb6a"/>
  <text x="308" y="63" fill="#66bb6a" font-size="13">e₃</text>
  <!-- omega: between L and e3 -->
  <line x1="210" y1="260" x2="250" y2="55" stroke="#4fc3f7" stroke-width="2.5"/>
  <polygon points="252,49 243,58 253,62" fill="#4fc3f7"/>
  <text x="258" y="52" fill="#4fc3f7" font-size="13">ω</text>
  <!-- Space cone: dashed lines from vertex -->
  <line x1="210" y1="260" x2="120" y2="65" stroke="#66bb6a" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>
  <line x1="210" y1="260" x2="300" y2="65" stroke="#66bb6a" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>
  <ellipse cx="210" cy="160" rx="90" ry="20" fill="none" stroke="#66bb6a" stroke-width="1.2" stroke-dasharray="5,3" opacity="0.6"/>
  <text x="310" y="165" fill="#66bb6a" font-size="11" opacity="0.9">space cone</text>
  <!-- Body cone: dashed lines from vertex -->
  <line x1="210" y1="260" x2="170" y2="55" stroke="#4fc3f7" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>
  <line x1="210" y1="260" x2="250" y2="55" stroke="#4fc3f7" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>
  <ellipse cx="210" cy="160" rx="50" ry="12" fill="none" stroke="#4fc3f7" stroke-width="1.2" stroke-dasharray="5,3" opacity="0.6"/>
  <text x="90" y="140" fill="#4fc3f7" font-size="11" opacity="0.9">body cone</text>
  <!-- Angle arc between L and e3 -->
  <path d="M 210 220 A 40 40 0 0 1 230 215" fill="none" stroke="#fff" stroke-width="1" opacity="0.5"/>
  <text x="232" y="225" fill="#fff" font-size="10" opacity="0.7">α</text>
  <!-- Angle arc between e3 and omega -->
  <path d="M 230 215 A 25 25 0 0 0 222 218" fill="none" stroke="#fff" stroke-width="1" opacity="0.5"/>
  <text x="237" y="208" fill="#fff" font-size="10" opacity="0.7">β</text>
  <!-- Caption -->
  <text x="10" y="290" fill="#aaa" font-size="11">Torque-free precession: the body cone rolls without slipping on the space cone</text>
</svg>

**Step 3 — Intermediate axis theorem (tennis racket theorem / Dzhanibekov effect).** For a triaxial body ($`I_1 < I_2 < I_3`), rotation about the axis of largest moment ($`I_3`) or smallest moment ($`I_1`) is stable, but rotation about the intermediate axis ($`I_2`) is unstable. A small perturbation in $`\omega_1` or $`\omega_3` grows exponentially, causing the body to tumble. This was dramatically demonstrated by cosmonaut Vladimir Dzhanibekov, who observed the tumbling of a wing nut in orbit aboard the space station Salyut 7 in June 1985. The theorem follows directly from the linearized Euler equations: the eigenvalues of the perturbation are real (unstable) for the intermediate axis and imaginary (stable oscillation) for the other two.

**Step 4 — Gyroscopic stability.** A rapidly spinning symmetric body resists changes to its spin axis because $`\vec{L}` is large. An applied torque $`\vec{\tau}` produces a change $`d\vec{L} = \vec{\tau}\,dt` perpendicular to $`\vec{L}`, causing precession rather than tipping. This is the principle behind gyroscopes, spacecraft reaction wheels, and the stability of a spinning bicycle wheel.

> **Authoritative sources**
> - [Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., Ch. 5](https://www.pearson.com/en-us/subject-catalog/p/classical-mechanics/P200000006871/9780201657029)

<details><summary>Example problem</summary>

A thin rectangular plate (dimensions $`a \times b` with $`a > b`) is spinning freely in space about its center. If it is given a small perturbation away from rotation about the axis along side $`b` (the intermediate axis), describe the subsequent motion.

<details><summary>Solution</summary>

The moments of inertia about the center are $`I_a = \tfrac{1}{12}mb^2` (about the axis along side $`a`), $`I_b = \tfrac{1}{12}ma^2` (about the axis along side $`b`), and $`I_c = \tfrac{1}{12}m(a^2+b^2)` (about the axis perpendicular to the plate). Since $`a > b`, we have $`I_a < I_b < I_c`. Rotation about the axis along side $`b` is about the *intermediate* axis. By the intermediate axis theorem, this rotation is unstable: the small perturbation grows and the plate tumbles, alternating between rotations about the $`a`-axis and the $`c`-axis. The motion is periodic (the plate "flips" and returns), but it never settles back to pure rotation about the $`b`-axis.

</details>

</details>

</details>

## Rotational kinetic energy

```math
T_{\text{rot}} = \tfrac{1}{2}\vec{\omega} \cdot \mathbf{I}\,\vec{\omega} = \tfrac{1}{2}\vec{\omega} \cdot \vec{L}
```

<details><summary>Details</summary>

In principal axes: $`T_{\text{rot}} = \tfrac{1}{2}(I_1\omega_1^2 + I_2\omega_2^2 + I_3\omega_3^2)`.

The total kinetic energy of a rigid body is the sum of translational (center of mass) and rotational (about center of mass) parts:

```math
T = \tfrac{1}{2}M v_0^2 + \tfrac{1}{2}\vec{\omega}\cdot\mathbf{I}_{\text{CM}}\,\vec{\omega}
```

This decomposition is exact for any rigid body.

**Lagrangian formulation.** The Lagrangian of a rigid body in an inertial frame is

```math
\mathcal{L} = T - V = \tfrac{1}{2}M v_0^2 + \tfrac{1}{2}\vec{\omega}\cdot\mathbf{I}_{\text{CM}}\,\vec{\omega} - V
```

where $`V` is the potential energy (e.g., gravitational). Expressed in body-frame Euler angles $`(\phi, \theta, \psi)` with $`\mathbf{I}` diagonal, the Euler–Lagrange equations $`\frac{d}{dt}\frac{\partial \mathcal{L}}{\partial \dot{q}_i} - \frac{\partial \mathcal{L}}{\partial q_i} = 0` reproduce Euler's equations (see the [Angular momentum and torque](#angular-momentum-and-torque) section). The cyclic nature of $`\psi` (the spin angle) gives the conservation of $`L_3 = I_3\omega_3`.

> **Authoritative sources**
> - [Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., Ch. 5](https://www.pearson.com/en-us/subject-catalog/p/classical-mechanics/P200000006871/9780201657029)

</details>

## Interactive simulation

<iframe src="./Rigid-Body-Mechanics.simulation.html" title="Rotating rigid body with ω and L vectors"></iframe>

## Quizz

**Problem 1 — Rolling disk down a ramp.** A uniform solid disk of mass $`m` and radius $`R` rolls without slipping down a ramp of angle $`\theta`. Find its acceleration.

<details><summary>Solution</summary>

Forces: gravity component $`mg\sin\theta` down the ramp, friction $`f` up the ramp (provides torque).

Translation: $`ma = mg\sin\theta - f`.

Rotation about center: $`I\alpha = fR`, with $`I = \tfrac{1}{2}mR^2`.

No-slip constraint: $`a = \alpha R`.

Substituting: $`\tfrac{1}{2}mR^2 \cdot a/R = fR \Rightarrow f = \tfrac{1}{2}ma`.

Then: $`ma = mg\sin\theta - \tfrac{1}{2}ma \Rightarrow \tfrac{3}{2}ma = mg\sin\theta \Rightarrow a = \tfrac{2}{3}g\sin\theta`.

</details>

**Problem 2 — Symmetric top under gravity.** A symmetric top (mass $`m`, moment of inertia $`I_3` about the symmetry axis, $`I_1 = I_2` about transverse axes) has its tip fixed at the origin. The center of mass is at distance $`\ell` along the symmetry axis. The top spins rapidly about its symmetry axis with angular velocity $`\omega_3` and precesses steadily at rate $`\Omega` about the vertical. Find the steady precession rate.

<details><summary>Solution</summary>

For steady precession, the symmetry axis makes a constant angle $`\theta` with the vertical, and $`\dot{\theta} = 0`. The angular velocity decomposes as:

```math
\vec{\omega} = \Omega\,\hat{z} + \omega_3\,\hat{e}_3
```

where $`\hat{e}_3` is the unit vector along the symmetry axis.

The torque about the fixed point is $`\vec{\tau} = m\vec{g} \times \vec{\ell}` with magnitude $`\tau = mg\ell\sin\theta`.

For steady precession, $`\vec{L}` precesses about the vertical at rate $`\Omega`. The rate of change of $`\vec{L}` is:

```math
\frac{d\vec{L}}{dt} = \Omega\,\hat{z} \times \vec{L}
```

The component of $`\vec{L}` perpendicular to $`\hat{z}` has magnitude $`L\sin\theta`, so:

```math
\tau = \Omega\, L \sin\theta
```

For a rapidly spinning top, $`L \approx I_3\,\omega_3` (the spin dominates). The steady precession rate is:

```math
\Omega = \frac{mg\ell}{I_3\,\omega_3}
```

This shows that faster spin gives slower precession — the gyroscopic effect. For a complete treatment including nutation (oscillation of $`\theta`), see the [Lagrangian](./Dynamics.md) formulation with cyclic coordinates.

</details>