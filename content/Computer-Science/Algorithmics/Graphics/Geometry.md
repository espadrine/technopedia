# Geometry

Geometry is the mathematical representation of shapes: the vertices, edges, and faces that bound a surface, and the transformations that move and deform it. It is relevant whenever a scene must be stored, measured, transformed, or tested for intersection before it is drawn.

> **Authoritative sources**
> - [Computer Graphics: Principles and Practice (Hearn & Baker)](https://www.ics.uci.edu/~gopi/cgbook/)
> - [Real-Time Rendering (Akenine-Möller, Haines, Hoffman)](https://www.realtimerendering.com/)

## Meshes

A **mesh** is a set of vertices (points in space), edges (pairs of vertices), and faces (usually triangles) that together bound a surface. For a closed genus-0 triangle mesh, $`V - E + F = 2` (Euler's formula) and $`E = 3F/2` (each edge is shared by two triangles).

<details><summary>Details</summary>

**Step 1 — Why triangles.** A triangle is always planar (three points define a plane), so it needs no subdivision and rasterizes exactly. Higher-order polygons (quads, n-gons) must be split into triangles first, which is why triangle meshes are the standard interchange format.

**Step 2 — Storage.** The compact layout is a *position buffer* (each vertex stored once) plus an *index buffer* (triangles reference vertices by index). Sharing vertices avoids duplication and keeps per-vertex attributes (normals, texture coordinates) consistent across faces.

**Example problem**: a closed triangle mesh has 6 vertices and 12 edges. How many faces does it have?

<details><summary>Solution</summary>

Euler's formula gives $`F = 2 - V + E = 2 - 6 + 12 = 8`. Consistency check: $`E = 3F/2 = 3 \times 8 / 2 = 12` ✓. The mesh is an octahedron.

</details>

</details>

## Transformations

A **transformation** maps points from one coordinate frame to another. The standard affine transformations — translation, rotation, and scaling — are represented by $`4 \times 4` matrices so that they compose by matrix multiplication and apply uniformly to points and directions.

<details><summary>Details</summary>

**Step 1 — Homogeneous coordinates.** A 3D point (x, y, z) is written as the 4-vector (x, y, z, 1) and a direction as (x, y, z, 0). This lets a single $`4 \times 4` matrix encode translation (not linear in 3D) alongside rotation and scaling (linear).

**Step 2 — The matrices.** Translation by $`(t_x, t_y, t_z)`:

```math
T = \begin{pmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \end{pmatrix}
```

Rotation about the $`z`-axis by angle $`\theta`:

```math
R_z = \begin{pmatrix} \cos\theta & -\sin\theta & 0 & 0 \\ \sin\theta & \cos\theta & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{pmatrix}
```

**Step 3 — Composition.** Applying scale $`S`, then rotation $`R_z`, then translation $`T` to a point $`p` is $`T R_z S \, p` (matrices act right-to-left). The product is a single $`4 \times 4` matrix, so a whole scene's transform is one matrix multiply per vertex.

**Example problem**: rotate the point (1, 0, 0) by $`90^\circ` about the $`z`-axis.

<details><summary>Solution</summary>

With $`\theta = 90^\circ`, $`\cos\theta = 0` and $`\sin\theta = 1`, so $`R_z (1, 0, 0, 1)^T = (0, 1, 0, 1)^T`. The point moves to (0, 1, 0), a quarter-turn counterclockwise about $`z`.

</details>

</details>

## Curves and surfaces

A **parametric curve** is a map $`t \mapsto C(t)` from a parameter interval to space; a **parametric surface** is a map $`(u, v) \mapsto S(u, v)`. Bézier curves are the standard smooth primitives, built from control points and Bernstein basis functions.

<details><summary>Details</summary>

**Step 1 — Bézier curves.** A cubic Bézier curve with control points $`P_0, P_1, P_2, P_3` is

```math
C(t) = (1-t)^3 P_0 + 3(1-t)^2 t \, P_1 + 3(1-t) t^2 \, P_2 + t^3 P_3, \quad t \in [0,1].
```

The curve starts at $`P_0` and ends at $`P_3` (the endpoints lie on the curve), while $`P_1, P_2` pull the curve toward them without being on it. The Bernstein coefficients form a partition of unity (they sum to 1), so the curve lies in the convex hull of its control points.

**Step 2 — Why parametric.** A parametric form lets you evaluate the curve at any $`t` (for rendering), differentiate it (for normals and shading), and reparameterize it (for animation), all without re-solving an implicit equation.

**Example problem**: for the cubic Bézier with $`P_0 = (0,0)`, $`P_1 = (1,0)`, $`P_2 = (1,1)`, $`P_3 = (0,1)`, find $`C(0.5)`.

<details><summary>Solution</summary>

At $`t = 0.5` the Bernstein weights are $`(1/8, 3/8, 3/8, 1/8)`. So

```math
C(0.5) = \tfrac{1}{8}(0,0) + \tfrac{3}{8}(1,0) + \tfrac{3}{8}(1,1) + \tfrac{1}{8}(0,1) = (0.75,\, 0.5).
```

</details>

</details>

## Quizz

<details><summary>Quizz</summary>

**Problem**: A closed triangle mesh has 200 faces. How many edges and how many vertices does it have?

<details><summary>Solution</summary>

Every edge is shared by two faces, so $`E = 3F/2 = 3 \times 200 / 2 = 300`. Euler's formula gives $`V = 2 + E - F = 2 + 300 - 200 = 102` vertices (for a genus-0 surface).

</details>

</details>
