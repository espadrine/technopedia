# Geometry and topology

Geometry and topology studies space, shape, distance, and invariants under transformation. It is relevant whenever a problem involves spatial structure, curvature, classification of shapes, or properties preserved under continuous deformation. It underlies physics, computer graphics, data science (topological data analysis), and the foundations of analysis.

## Brief history

- Antiquity: Euclidean geometry, practical measurement of area and volume.
- 17th century: analytic geometry (Descartes, Fermat) and projective geometry.
- 19th century: non-Euclidean geometry (Gauss, Bolyai, Lobachevsky), Riemannian geometry, and the birth of topology (Möbius, Riemann).
- 20th century onward: algebraic topology, differential geometry, algebraic geometry (Hilbert, Grothendieck), and geometric measure theory expand the field.

## Classes

The following sub-areas do not yet have dedicated pages in Technopedia.

<table>
<tr><th>Sub-area</th><th>Core objects</th><th>Structure added</th><th>How it relates</th></tr>
<tr><td>Topology</td><td>open sets, continuity, connectedness, compactness, homotopy, homology</td><td>open sets only</td><td>studies shape under continuous deformation; provides invariants for classification; underlies analysis and algebraic topology</td></tr>
<tr><td>Differential geometry</td><td>manifolds, curvature, geodesics, Riemannian metrics, tensors</td><td>+ smooth atlas, metric</td><td>studies smooth shape and curvature; underlies general relativity, gauge theory, and optimization on manifolds</td></tr>
<tr><td>Euclidean and affine geometry</td><td>points, lines, planes, distances, angles, transformations, coordinates</td><td>+ flat metric, parallel postulate</td><td>the classical study of shape and measurement; underlies physics, engineering, and computer graphics</td></tr>
<tr><td>Algebraic geometry</td><td>varieties, schemes, sheaves, ideals, polynomial equations</td><td>polynomial equations, Zariski topology</td><td>studies geometric objects defined by polynomial equations; bridges algebra and geometry; underlies number theory, string theory, and coding theory</td></tr>
</table>

<details><summary>Details</summary>

Use the table as a map:
- For invariants under deformation, connectedness, or compactness, begin with Topology.
- For smooth shape, curvature, or manifolds, begin with Differential geometry.
- For classical shape, distance, or coordinate geometry, begin with Euclidean and affine geometry.
- For geometric objects defined by polynomial equations, or for the interplay of algebra and geometry, begin with Algebraic geometry.

**How the classes nest.** The first three rows form a strict nesting hierarchy, visible in the "Structure added" column. Topology is the most general: a topological space carries only a collection of open sets. Differential geometry refines this by equipping the space with a smooth atlas, turning it into a smooth manifold and allowing the definition of curvature, geodesics, and tensors. Euclidean geometry is the special case of a Riemannian manifold with constant zero curvature, where the metric is flat and the parallel postulate holds. Each step down the chain adds structure and restricts the class of spaces under study.

**Algebraic geometry as a distinct class.** Algebraic geometry studies varieties and schemes—objects defined by polynomial equations—equipped with the Zariski topology. Unlike the first three classes, it does not nest within the topological hierarchy; instead, it introduces a different kind of structure: the ring of regular functions and the ideal-theoretic machinery (ideals, sheaves) that encodes the geometry. Its objects can be viewed as topological spaces (Zariski topology) or, in the smooth case, as algebraic varieties that carry a natural smooth structure. It bridges [Algebraic and discrete mathematics](../Algebraic-and-discrete-mathematics/Readme.md) and geometry, and underlies number theory, string theory, and coding theory.

**Geometric measure theory.** Geometric measure theory, mentioned in the history, is a cross-cutting area that applies [measure theory](../Probability-and-statistics/Measure-theory/Readme.md) to geometric objects such as currents, varifolds, and rectifiable sets. It is not a sub-class of geometry and topology per se; the measure-theoretic machinery it relies on lives under Probability and statistics.

Topology, Differential geometry, Euclidean and affine geometry, and Algebraic geometry are each broad enough to be topic pages with their own categorizations; they are listed here as classes but do not yet have their own pages.

</details>