# Continuum Mechanics

Continuum mechanics describes the motion and deformation of matter modeled as a continuous distribution of material points. It is relevant to structural engineering (beams, shells, foundations), fluid dynamics (aerodynamics, hydraulics), geophysics (seismic waves, mantle convection), and biomechanics. It is the complement to [Rigid-Body Mechanics](./Rigid-Body-Mechanics.md): where rigid-body mechanics assumes no deformation, continuum mechanics is built around it.

> **Authoritative sources**
> - [Gurtin, *An Introduction to Continuum Mechanics* (Academic Press, 1981)](https://www.elsevier.com/books/an-introduction-to-continuum-mechanics/gurtin/978-0-12-304420-5)
> - [Landau & Lifshitz, *Theory of Elasticity* (Course of Theoretical Physics, Vol. 9)](https://www.physics.msu.ru/eng/ll/)
> - [Batchelor, *An Introduction to Fluid Dynamics* (Cambridge University Press)](https://www.cambridge.org/core/books/an-introduction-to-fluid-dynamics/18AA1576B9C579CE25621E80F9266993)

## Lagrangian vs Eulerian description

Continuum mechanics admits two equivalent viewpoints for tracking matter:

- **Lagrangian (material) description**: track each material point. The reference position $`\vec{X}` labels a particle; its current position is $`\vec{x} = \vec{X} + \vec{u}(\vec{X}, t)`. The displacement field $`\vec{u}` is a function of the material label.
- **Eulerian (spatial) description**: observe what happens at a fixed spatial point $`\vec{x}`. The velocity field $`\vec{v}(\vec{x}, t)` and stress field $`\boldsymbol{\sigma}(\vec{x}, t)` are functions of the spatial coordinate.

The two are related by the material (substantial) derivative:

```math
\frac{D}{Dt} = \frac{\partial}{\partial t} + \vec{v}\cdot\nabla
```

which converts an Eulerian rate into the rate following a material point. Solids are naturally described in the Lagrangian frame (small displacements from a reference configuration); fluids in the Eulerian frame (particles pass through every point).

<details><summary>Details</summary>

**Why two descriptions?** In a solid, each atom stays near its equilibrium position, so it is natural to label particles by their reference location $`\vec{X}` and ask "where did this particle go?" In a fluid, particles flow past every point, so it is natural to fix a spatial location $`\vec{x}` and ask "what is the velocity here right now?"

**Concrete example: a stretching rubber band.** Consider a rubber band of rest length $`L_0 = 1\;\text{m}`, fixed at the left end and pulled at the right end. At time $`t`, the right end has moved to $`x = L_0 + \delta(t)`. 

- *Lagrangian*: a particle initially at $`\vec{X} = (X, 0, 0)` with $`0 \le X \le L_0` is now at $`\vec{x} = (X(1 + \delta/L_0), 0, 0)`. The displacement is $`\vec{u}(\vec{X}, t) = (X\,\delta/L_0, 0, 0)`. 
- *Eulerian*: at a fixed spatial point $`\vec{x} = (x, 0, 0)` the velocity is $`\vec{v}(\vec{x}, t) = (x\,\dot{\delta}/(L_0 + \delta), 0, 0)`. 

The material derivative converts between them: for the velocity field, $`Dv_x/Dt = \partial v_x/\partial t + v_x\,\partial v_x/\partial x` gives the acceleration of the particle currently at $`x`. 

<svg width="420" height="130" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ah1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#ff7043"/></marker></defs>
  <line x1="50" y1="30" x2="350" y2="30" stroke="#888" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="45" y="20" fill="#aaa" font-size="11">X = 0</text>
  <text x="335" y="20" fill="#aaa" font-size="11">X = L&#8320;</text>
  <text x="150" y="50" fill="#888" font-size="11">Reference (material) configuration</text>
  <line x1="50" y1="85" x2="385" y2="85" stroke="#4fc3f7" stroke-width="2"/>
  <text x="45" y="105" fill="#4fc3f7" font-size="11">x = 0</text>
  <text x="365" y="105" fill="#4fc3f7" font-size="11">x = L&#8320; + &#948;</text>
  <text x="150" y="120" fill="#4fc3f7" font-size="11">Current (spatial) configuration</text>
  <line x1="350" y1="35" x2="380" y2="80" stroke="#ff7043" stroke-width="1.5" marker-end="url(#ah1)"/>
  <text x="360" y="62" fill="#ff7043" font-size="10">u</text>
</svg>

**Example problem.** A rod of length $`L_0 = 2\;\text{m}` undergoes the displacement field $`u_x(X) = 0.01\,X^2/L_0` (in metres). Find the Lagrangian strain $`\varepsilon_{xx}` at $`X = L_0/2`. 

<details><summary>Solution</summary>

$`\varepsilon_{xx} = \partial u_x / \partial X = 0.01 \cdot 2X / L_0 = 0.02\,X / L_0`. 

At $`X = L_0/2`: $`\varepsilon_{xx} = 0.02 \cdot (L_0/2)/L_0 = 0.01`. 

</details>

</details>

## Deformation and strain

Given the displacement field $`\vec{u}(\vec{X})` (Lagrangian setting), the infinitesimal strain tensor is:

```math
\varepsilon_{ij} = \tfrac{1}{2}\left(\frac{\partial u_i}{\partial X_j} + \frac{\partial u_j}{\partial X_i}\right)
```

This tensor is valid under the **small-strain assumption**: both displacements and displacement gradients must be small, $`|\nabla \vec{u}| \ll 1`. For finite deformations, the full deformation gradient $`\mathbf{F} = \partial \vec{x}/\partial \vec{X}` and the Green–Lagrange strain $`\mathbf{E} = \tfrac{1}{2}(\mathbf{F}^T\mathbf{F} - \mathbf{I})` must be used instead.

<details><summary>Details</summary>

**Step 1: What is a displacement field?** A displacement field assigns to every material point (labelled by $`\vec{X}`) a vector $`\vec{u}(\vec{X})` telling how far and in what direction the point has moved. Physically, if you mark a grid on a rubber sheet and then stretch it, the displacement of each grid intersection is a point in the displacement field.

**Step 2: Deriving strain from a line element.** Consider two neighbouring material points $`\vec{X}` and $`\vec{X} + d\vec{X}`. After deformation, the line element becomes:

```math
d\vec{x} = \left(\mathbf{I} + \nabla\vec{u}\right) d\vec{X}
```

The squared length changes from $`|d\vec{X}|^2` to $`|d\vec{x}|^2 = d\vec{X}^T(\mathbf{I} + \nabla\vec{u})^T(\mathbf{I} + \nabla\vec{u})\,d\vec{X}`. Expanding and keeping only first-order terms (valid when $`|\nabla\vec{u}| \ll 1`):

```math
|d\vec{x}|^2 \approx |d\vec{X}|^2 + 2\,d\vec{X}^T \boldsymbol{\varepsilon}\, d\vec{X}
```

The symmetric part of $`\nabla\vec{u}` is the strain tensor $`\boldsymbol{\varepsilon}`; the antisymmetric part is the infinitesimal rotation (which does not change lengths).

**Step 3: 2-D example.** A square element of side $`\delta` in the $`x`-$`y` plane undergoes the displacement $`u_x = \alpha\,x`, $`u_y = \beta\,y` (no shear). Then:

```math
\varepsilon_{xx} = \alpha, \quad \varepsilon_{yy} = \beta, \quad \varepsilon_{xy} = 0
```

The square becomes a rectangle of sides $`\delta(1+\alpha)` and $`\delta(1+\beta)`. 

<svg width="320" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="40" width="60" height="60" fill="none" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="30" y="35" fill="#888" font-size="10">undeformed</text>
  <rect x="160" y="35" width="75" height="70" fill="rgba(79,195,247,0.15)" stroke="#4fc3f7" stroke-width="2"/>
  <text x="165" y="30" fill="#4fc3f7" font-size="10">deformed</text>
  <text x="180" y="75" fill="#ff7043" font-size="11">&#949;&#8339;&#8339; = &#945;</text>
  <text x="240" y="75" fill="#ff7043" font-size="11">&#949;&#7505;&#7505; = &#946;</text>
  <line x1="100" y1="70" x2="150" y2="70" stroke="#ff7043" stroke-width="1.5"/>
  <polygon points="150,70 144,67 144,73" fill="#ff7043"/>
  <text x="65" y="115" fill="#aaa" font-size="10">x</text>
  <text x="30" y="75" fill="#aaa" font-size="10">y</text>
</svg>

**Step 4: Validity and finite deformation.** The infinitesimal strain tensor $`\boldsymbol{\varepsilon}` is a linearization. It is valid when $`|\nabla\vec{u}| \ll 1` (typically strains below a few percent in engineering). For large deformations (rubber, biological tissue, metal forming), one must use:

- Deformation gradient: $`\mathbf{F} = \partial \vec{x}/\partial \vec{X}` 
- Green–Lagrange strain: $`\mathbf{E} = \tfrac{1}{2}(\mathbf{F}^T\mathbf{F} - \mathbf{I})` 
- Eulerian (Almansi) strain: $`\mathbf{e} = \tfrac{1}{2}(\mathbf{I} - \mathbf{H}^T\mathbf{H})` where $`\mathbf{H} = \nabla\vec{v}` 

The polar decomposition $`\mathbf{F} = \mathbf{R}\mathbf{U}` separates rotation $`\mathbf{R}` from stretch $`\mathbf{U}`, which is essential for finite-strain constitutive models.

**Step 5: Example problem.** A 2-D plate undergoes the displacement field $`u_x = 0.002\,x + 0.001\,y`, $`u_y = 0.001\,x + 0.003\,y` (all in metres, $`x, y` in metres). Compute the full strain tensor and check whether the small-strain assumption holds.

<details><summary>Solution</summary>

$`\varepsilon_{xx} = \partial u_x/\partial x = 0.002` 

$`\varepsilon_{yy} = \partial u_y/\partial y = 0.003` 

$`\varepsilon_{xy} = \tfrac{1}{2}(\partial u_x/\partial y + \partial u_y/\partial x) = \tfrac{1}{2}(0.001 + 0.001) = 0.001` 

The strain tensor is $`\boldsymbol{\varepsilon} = \begin{pmatrix} 0.002 & 0.001 \\ 0.001 & 0.003 \end{pmatrix}`. 

The maximum displacement gradient is $`|\nabla\vec{u}| \sim 0.003 \ll 1`, so the small-strain assumption is well satisfied.

</details>

</details>

## Stress

The Cauchy stress tensor $`\sigma_{ij}` gives the traction (force per unit area) on a surface with unit normal $`\hat{n}`:

```math
t_i = \sigma_{ij}\,n_j
```

The tensor is symmetric ($`\sigma_{ij} = \sigma_{ji}`), giving 6 independent components in 3-D. The symmetry follows from the **balance of angular momentum** (zero body couple): taking the moment of the momentum balance about an arbitrary point and requiring the net torque to vanish for any volume yields $`\sigma_{ij} = \sigma_{ji}`. See the [Conservation laws](#conservation-laws) section for the momentum balance that the stress tensor enters.

<details><summary>Details</summary>

**Step 1: Traction and stress.** The traction vector $`\vec{t}` on a surface element $`dA` with normal $`\hat{n}` is the force per unit area exerted by the material on one side on the material on the other. Cauchy's theorem states that $`\vec{t}` depends only on $`\hat{n}` (not on the shape of the surface) and is linear in $`\hat{n}`: $`\vec{t} = \boldsymbol{\sigma}\,\hat{n}`. 

**Step 2: Components.** In 3-D, $`\boldsymbol{\sigma}` is a $`3\times 3` matrix:

```math
\boldsymbol{\sigma} = \begin{pmatrix} \sigma_{xx} & \sigma_{xy} & \sigma_{xz} \\ \sigma_{yx} & \sigma_{yy} & \sigma_{yz} \\ \sigma_{zx} & \sigma_{zy} & \sigma_{zz} \end{pmatrix}
```

Diagonal entries are normal stresses (tension positive); off-diagonal entries are shear stresses.

**Step 3: Why symmetric?** Consider an infinitesimal cube. The balance of angular momentum (no body couple) requires that the net torque about any axis vanishes. Taking moments about the $`z`-axis: the shear stresses $`\sigma_{xy}` and $`\sigma_{yx}` produce torques that cancel only if $`\sigma_{xy} = \sigma_{yx}`. Repeating for the other axes gives $`\sigma_{ij} = \sigma_{ji}` for all $`i, j`. This reduces the 9 components to 6 independent ones.

<svg width="280" height="210" xmlns="http://www.w3.org/2000/svg">
  <rect x="60" y="50" width="120" height="120" fill="rgba(171,71,188,0.1)" stroke="#ab47bc" stroke-width="2"/>
  <line x1="30" y1="110" x2="55" y2="110" stroke="#ff5252" stroke-width="2"/>
  <polygon points="55,110 48,106 48,114" fill="#ff5252"/>
  <line x1="185" y1="110" x2="210" y2="110" stroke="#ff5252" stroke-width="2"/>
  <polygon points="210,110 203,106 203,114" fill="#ff5252"/>
  <text x="15" y="105" fill="#ff5252" font-size="10">&#963;&#8339;&#8339;</text>
  <text x="212" y="105" fill="#ff5252" font-size="10">&#963;&#8339;&#8339;</text>
  <line x1="120" y1="25" x2="120" y2="45" stroke="#ff5252" stroke-width="2"/>
  <polygon points="120,45 116,38 124,38" fill="#ff5252"/>
  <line x1="120" y1="175" x2="120" y2="195" stroke="#ff5252" stroke-width="2"/>
  <polygon points="120,195 116,202 124,202" fill="#ff5252"/>
  <text x="125" y="22" fill="#ff5252" font-size="10">&#963;&#7505;&#7505;</text>
  <line x1="60" y1="70" x2="80" y2="70" stroke="#4fc3f7" stroke-width="1.5"/>
  <polygon points="80,70 74,67 74,73" fill="#4fc3f7"/>
  <text x="50" y="65" fill="#4fc3f7" font-size="9">&#963;&#7505;&#8339;</text>
  <line x1="180" y1="150" x2="160" y2="150" stroke="#4fc3f7" stroke-width="1.5"/>
  <polygon points="160,150 166,147 166,153" fill="#4fc3f7"/>
  <text x="182" y="148" fill="#4fc3f7" font-size="9">&#963;&#7505;&#8339;</text>
  <text x="95" y="115" fill="#aaa" font-size="10">cube element</text>
</svg>

**Step 4: Relation to momentum balance.** The stress tensor enters the local momentum balance (Cauchy's equation of motion), presented in the [Conservation laws](#conservation-laws) section:

```math
\rho\,\vec{a} = \nabla \cdot \boldsymbol{\sigma} + \vec{f}_{\text{body}}
```

This is the continuum analogue of $`F = ma` from [Dynamics](./Dynamics.md), applied to an infinitesimal volume element.

**Step 5: Example problem.** A cube of side $`a = 1\;\text{cm}` is subjected to the stress state $`\sigma_{xx} = 50\;\text{MPa}`, $`\sigma_{yy} = 20\;\text{MPa}`, $`\sigma_{xy} = 10\;\text{MPa}` (all other components zero). Find the traction vector on a face with normal $`\hat{n} = (1/\sqrt{2}, 1/\sqrt{2}, 0)`. 

<details><summary>Solution</summary>

$`t_x = \sigma_{xx} n_x + \sigma_{xy} n_y = 50 \cdot \frac{1}{\sqrt{2}} + 10 \cdot \frac{1}{\sqrt{2}} = \frac{60}{\sqrt{2}} = 30\sqrt{2}\;\text{MPa}` 

$`t_y = \sigma_{xy} n_x + \sigma_{yy} n_y = 10 \cdot \frac{1}{\sqrt{2}} + 20 \cdot \frac{1}{\sqrt{2}} = \frac{30}{\sqrt{2}} = 15\sqrt{2}\;\text{MPa}` 

$`t_z = 0` 

So $`\vec{t} = (30\sqrt{2},\; 15\sqrt{2},\; 0)\;\text{MPa}`. 

</details>

</details>

## Conservation laws

The three fundamental balance laws, in local (differential) form, are:

**Mass (continuity):**

```math
\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho\,\vec{v}) = 0
```

**Linear momentum (Cauchy's equation of motion):**

```math
\rho\,\frac{D\vec{v}}{Dt} = \nabla \cdot \boldsymbol{\sigma} + \vec{f}_{\text{body}}
```

**Energy (first law for continua):**

```math
\rho\,\frac{D e}{Dt} = \sigma_{ij}\,D_{ij} - \nabla\cdot\vec{q} + \rho\,r
```

where $`e` is specific internal energy, $`\vec{q}` the heat flux, $`r` a volumetric heat source, and $`D_{ij} = \tfrac{1}{2}(\partial v_i/\partial x_j + \partial v_j/\partial x_i)` the strain-rate tensor. See [Thermodynamics](../Thermodynamics/Readme.md) for the thermodynamic context.

<details><summary>Details</summary>

**Step 1: From integral to local form.** The integral balance laws (e.g., $`\frac{d}{dt}\int_{V(t)} \rho\,dV = 0` for mass) hold for any material volume $`V(t)`. Applying the Reynolds transport theorem (converting the material derivative of an integral to an integral of the material derivative) and then the divergence theorem (converting the surface integral of flux to a volume integral of divergence), and requiring the result to hold for *any* sub-volume, yields the local (pointwise) form. The local form is what is used in PDE solvers.

**Step 2: The material derivative.** The operator $`D/Dt = \partial/\partial t + \vec{v}\cdot\nabla` is a pointwise operator that follows a material particle. In the Lagrangian description it reduces to $`\partial/\partial t` (since the label $`\vec{X}` is fixed); in the Eulerian description it includes the convective term $`\vec{v}\cdot\nabla`. 

**Step 3: Boundary conditions.** A well-posed continuum-mechanics problem requires boundary conditions on $`\partial V`:

- **Essential (Dirichlet)**: prescribe the displacement $`\vec{u}` (or velocity $`\vec{v}`) on part of the boundary $`\Gamma_u`. 
- **Natural (Neumann)**: prescribe the traction $`\vec{t} = \boldsymbol{\sigma}\cdot\hat{n}` on the remaining part $`\Gamma_t`. 

<svg width="360" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="30" width="250" height="120" fill="rgba(79,195,247,0.05)" stroke="#4fc3f7" stroke-width="2"/>
  <line x1="50" y1="30" x2="50" y2="150" stroke="#ff7043" stroke-width="4"/>
  <text x="5" y="95" fill="#ff7043" font-size="11">u = 0</text>
  <text x="5" y="110" fill="#ff7043" font-size="9">(Dirichlet)</text>
  <line x1="300" y1="30" x2="300" y2="150" stroke="#ab47bc" stroke-width="4"/>
  <text x="305" y="95" fill="#ab47bc" font-size="11">t = t&#8320;</text>
  <text x="305" y="110" fill="#ab47bc" font-size="9">(Neumann)</text>
  <line x1="50" y1="30" x2="300" y2="30" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="155" y="25" fill="#888" font-size="9">free (t = 0)</text>
  <text x="155" y="95" fill="#aaa" font-size="12">&#937;</text>
  <line x1="300" y1="60" x2="320" y2="60" stroke="#ab47bc" stroke-width="1.5"/>
  <polygon points="320,60 314,57 314,63" fill="#ab47bc"/>
  <line x1="300" y1="120" x2="320" y2="120" stroke="#ab47bc" stroke-width="1.5"/>
  <polygon points="320,120 314,117 314,123" fill="#ab47bc"/>
</svg>

Together they close the system and are the natural input to the finite element method.

**Step 4: Example problem.** An incompressible fluid flows in a pipe of radius $`R` with velocity profile $`v_z(r) = v_0(1 - r^2/R^2)`. Verify the continuity equation.

<details><summary>Solution</summary>

For incompressible flow, $`\rho = \text{const}`, so continuity reduces to $`\nabla \cdot \vec{v} = 0`. 

In cylindrical coordinates with axisymmetric flow ($`\partial/\partial\theta = 0`, $`v_r = 0`, $`v_\theta = 0`):

$`\nabla \cdot \vec{v} = \frac{1}{r}\frac{\partial}{\partial r}(r\,v_r) + \frac{\partial v_z}{\partial z} = 0 + 0 = 0` 

The continuity equation is satisfied (the velocity profile is steady and fully developed, so $`\partial v_z/\partial z = 0`). 

</details>

</details>

## Constitutive relations

The constitutive law closes the system by relating stress to deformation (solids) or strain rate (fluids).

**Linear elasticity (Hooke's law, isotropic):**

```math
\sigma_{ij} = \lambda\,\varepsilon_{kk}\,\delta_{ij} + 2\mu\,\varepsilon_{ij}
```

where $`\lambda` and $`\mu` are Lamé parameters. In terms of Young's modulus $`E` and Poisson's ratio $`\nu`:

```math
\mu = \frac{E}{2(1+\nu)}, \quad \lambda = \frac{E\nu}{(1+\nu)(1-2\nu)}
```

**Newtonian fluid:**

```math
\sigma_{ij} = -p\,\delta_{ij} + 2\mu\,D_{ij}
```

where $`D_{ij} = \tfrac{1}{2}\left(\frac{\partial v_i}{\partial x_j} + \frac{\partial v_j}{\partial x_i}\right)` is the strain-rate tensor (distinct from the elastic strain $`\varepsilon_{ij}`). 

<details><summary>Details</summary>

**Step 1: Why a constitutive law is needed.** The balance laws (mass, momentum, energy) are universal—they apply to any continuum. But they contain the stress tensor $`\boldsymbol{\sigma}` as an unknown. The constitutive law provides the material-specific relation between stress and deformation, closing the system.

**Step 2: Hooke's law in 1-D.** For a uniaxial bar: $`\sigma = E\,\varepsilon`. The single constant $`E` (Young's modulus) replaces the two Lamé parameters because $`\varepsilon_{kk} = \varepsilon` and $`\sigma_{ij} = 0` for $`i \neq j` in 1-D.

**Step 3: From Hooke's law to Navier–Stokes.** For a Newtonian fluid, substituting $`\sigma_{ij} = -p\delta_{ij} + 2\mu D_{ij}` into the momentum balance and using incompressibility ($`\nabla\cdot\vec{v} = 0`) gives the Navier–Stokes equations:

```math
\rho\left(\frac{\partial \vec{v}}{\partial t} + \vec{v}\cdot\nabla\vec{v}\right) = -\nabla p + \mu\nabla^2\vec{v} + \vec{f}
```

**Step 4: Elastodynamics.** For elastic solids with small strain and no body force, the linearized equations reduce to the elastodynamic wave equation, connecting to [Oscillations and Waves](./Oscillations/Readme.md).

**Step 5: Example problem.** A copper rod ($`E = 110\;\text{GPa}`, $`\nu = 0.34`) is subjected to a uniaxial stress $`\sigma_{xx} = 80\;\text{MPa}`. Find the Lamé parameters and the strain in the $`x`-direction.

<details><summary>Solution</summary>

$`\mu = E/[2(1+\nu)] = 110 \times 10^9 / [2(1.34)] = 41.0\;\text{GPa}` 

$`\lambda = E\nu/[(1+\nu)(1-2\nu)] = 110 \times 10^9 \times 0.34 / [(1.34)(0.32)] = 88.1\;\text{GPa}` 

Uniaxial strain: $`\varepsilon_{xx} = \sigma_{xx}/E = 80 \times 10^6 / 110 \times 10^9 = 7.27 \times 10^{-4}` 

</details>

</details>

## Variational formulation and the finite element method

The **principle of virtual work** states: for every admissible virtual displacement $`\delta\vec{u}` (vanishing on the Dirichlet boundary), the internal virtual work equals the external virtual work:

```math
\int_\Omega \boldsymbol{\sigma} : \boldsymbol{\varepsilon}(\delta\vec{u})\; dV = \int_{\Gamma_t} \vec{t}\cdot\delta\vec{u}\; dA + \int_\Omega \vec{f}\cdot\delta\vec{u}\; dV
```

This is the foundation of the finite element method (FEM): the balance laws + constitutive law + boundary conditions form a closed PDE system, and the variational statement provides the weak form that FEM discretizes into a linear (or nonlinear) algebraic system $`\mathbf{K}\,\mathbf{u} = \mathbf{F}`. 

<details><summary>Details</summary>

**Step 1: From strong to weak form.** Start with the strong form (local momentum balance): $`\nabla\cdot\boldsymbol{\sigma} + \vec{f} = \rho\vec{a}` in $`\Omega`, with $`\vec{u} = \bar{\vec{u}}` on $`\Gamma_u` and $`\boldsymbol{\sigma}\hat{n} = \bar{\vec{t}}` on $`\Gamma_t`. Multiply by a test function $`\delta\vec{u}` (zero on $`\Gamma_u`) and integrate over $`\Omega`:

```math
\int_\Omega (\nabla\cdot\boldsymbol{\sigma} + \vec{f})\cdot\delta\vec{u}\; dV = \int_\Omega \rho\vec{a}\cdot\delta\vec{u}\; dV
```

**Step 2: Integration by parts.** Apply the divergence theorem to the stress term:

```math
\int_\Omega \nabla\cdot\boldsymbol{\sigma} : \delta\vec{u}\; dV = \int_{\partial\Omega} \boldsymbol{\sigma}\hat{n}\cdot\delta\vec{u}\; dA - \int_\Omega \boldsymbol{\sigma} : \nabla\delta\vec{u}\; dV
```

The boundary integral splits into $`\Gamma_u` (where $`\delta\vec{u} = 0`, so it vanishes) and $`\Gamma_t` (where $`\boldsymbol{\sigma}\hat{n} = \bar{\vec{t}}`). The result is the weak form stated above.

**Step 3: Discretization (FEM).** Approximate $`\vec{u} = \sum_a u_a\,N_a(\vec{x})` with shape functions $`N_a`. Substituting into the weak form and choosing $`\delta\vec{u} = N_b` for each node $`b` gives:

```math
\sum_a K_{ba}\,u_a = F_b
```

where $`K_{ba} = \int_\Omega \mathbf{B}_b^T \mathbf{D}\, \mathbf{B}_a\; dV` is the element stiffness matrix ($`\mathbf{D}` is the constitutive matrix, $`\mathbf{B}_a` the strain-displacement matrix). Assembling over all elements gives the global system $`\mathbf{K}\,\mathbf{u} = \mathbf{F}`. 

**Step 4: Connection to Lagrangian mechanics.** The variational principle is the continuum analogue of the principle of virtual work in [Dynamics](./Dynamics.md) and is closely related to Hamilton's principle. In the static case, it is equivalent to minimizing the total potential energy $`\Pi = U - W_{\text{ext}}`. 

**Step 5: Example problem.** A 1-D bar of length $`L`, cross-section $`A`, modulus $`E`, is fixed at $`x=0` and loaded by force $`F` at $`x=L`. Using a single finite element (two nodes), find the nodal displacements.

<details><summary>Solution</summary>

The element stiffness matrix for a 1-D bar element is:

$`K = \frac{EA}{L}\begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}` 

The force vector is $`\mathbf{F} = (0, F)^T` (reaction at node 1, applied force at node 2).

With $`u_1 = 0` (Dirichlet), the second row gives: $`-\frac{EA}{L}u_1 + \frac{EA}{L}u_2 = F`, so $`u_2 = FL/(EA)`. 

This matches the analytical solution $`\Delta L = FL/(EA)`. 

</details>

</details>

## Putting it together

The complete continuum-mechanics problem is: (1) choose a description (Lagrangian or Eulerian), (2) express the deformation (strain or strain rate), (3) compute the stress from the constitutive law, (4) enforce the balance laws, and (5) apply boundary conditions. Together these form a closed system of PDEs that the finite element method discretizes into a solvable algebraic system, providing the primary computational tool in structural and fluid engineering.

## Quizz

<details><summary>Quizz</summary>

A steel rod (cross-section $`A = 10^{-4}\;\text{m}^2`, length $`L = 2\;\text{m}`, $`E = 200\;\text{GPa}`) is stretched by a force $`F = 10\;\text{kN}`. Find the elongation and the maximum stress.

<details><summary>Solution</summary>

Stress: $`\sigma = F/A = 10^4 / 10^{-4} = 10^8\;\text{Pa} = 100\;\text{MPa}`. 

Strain: $`\varepsilon = \sigma / E = 10^8 / 2\times10^{11} = 5\times10^{-4}`. 

Elongation: $`\Delta L = \varepsilon \cdot L = 5\times10^{-4} \times 2 = 10^{-3}\;\text{m} = 1\;\text{mm}`. 

The maximum stress is $`100\;\text{MPa}` (uniform along the bar since the cross-section is constant).

</details>

</details>

## Simulation

<iframe src="./Continuum-Mechanics.simulation.html" title="1-D bar deformation: displacement, strain, and stress under axial load (uniform and non-uniform cross-section)"></iframe>