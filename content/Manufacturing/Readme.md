# Manufacturing

## Overview

Manufacturing transforms raw materials, components, and energy into useful physical products. It is relevant whenever a design must become a reliable, repeatable, and affordable object: from a single prototype to a fleet of machines.

The classes below partition manufacturing by the fundamental physical mechanism applied to matter. Five primary classes—solid-state processing, solidify/deposit, remove, bond/finish, and integrate—capture the distinct mechanisms; each contains the specific sub-classes a process planner selects from. A given product normally passes through several of these classes in sequence; the partition is by mechanism, not by product. Process planning / design-for-manufacturability (DFM) / manufacturing engineering and metrology / quality control are cross-cutting functions: they do not transform matter, so they are listed separately rather than as classes.

## History

- 18th–19th-century Industrial Revolution: mechanization replaced hand tools with water- and steam-driven machines, and machine tools with interchangeable parts made precision parts reproducible.
- 20th-century mass production, especially the moving assembly line, made large-scale output economical.
- 1950s–60s: numerical control (CNC) replaced mechanical cams and gears with programmable tool paths, the pivotal shift from mechanical to programmable manufacturing.
- 1980s–present: digital CAD (mid-1980s workstations), industrial robotics (1970s–80s), and additive manufacturing (FDM patented 1986; first industrial 3D printers in the 1990s) made manufacturing more flexible and customized.

## Categorization

The table below gives a five-class primary partition of manufacturing by the fundamental physical mechanism applied to matter. Each primary class groups the specific sub-classes (nine in total) that a process planner selects from.

<table>
<tr><th>Primary class</th><th>Physical mechanism</th><th>Sub-class</th><th>Main idea</th><th>Typical material state</th><th>Key trade-off</th></tr>
<tr><td rowspan="2"><b>Solid-state processing</b></td><td rowspan="2">Prepare and deform solid material</td><td><a href='./Materials-processing.md'>Materials processing</a></td><td>Converts raw material into usable stock with controlled properties</td><td>Metal, polymer, ceramic, composite</td><td>Property control versus cost</td></tr>
<tr><td><a href='./Forming.md'>Forming</a></td><td>Shapes material by plastic deformation into a near-net shape</td><td>Sheet, bar, billet, ingot</td><td>Strength versus tooling cost</td></tr>
<tr><td rowspan="2"><b>Solidify / deposit</b></td><td rowspan="2">Create geometry by phase change or material addition</td><td><a href='./Casting.md'>Casting</a></td><td>Shapes material by solidifying molten material in a mold</td><td>Molten metal, ceramic, polymer</td><td>Geometry freedom versus surface finish and defects</td></tr>
<tr><td><a href='./Additive-manufacturing.md'>Additive manufacturing</a></td><td>Builds parts by adding material layer by layer</td><td>Powder, filament, resin, metal</td><td>Complexity versus speed</td></tr>
<tr><td><b>Remove</b></td><td>Subtract material to reveal geometry</td><td><a href='./Subtractive-manufacturing/Readme.md'>Subtractive manufacturing</a></td><td>Removes material to shape a part</td><td>Bar, sheet, block, billet</td><td>Accuracy versus material waste</td></tr>
<tr><td rowspan="2"><b>Bond / finish</b></td><td rowspan="2">Create or modify material interfaces at the surface</td><td><a href='./Joining.md'>Joining</a></td><td>Creates a material-level bond or fastener between two workpieces by welding, brazing, soldering, adhesive bonding, or mechanical fastening</td><td>Parts, sheets, wires, substrates</td><td>Joint strength versus heat and geometry constraints</td></tr>
<tr><td><a href='./Surface-finishing.md'>Surface finishing</a></td><td>Changes surface properties by coating, plating, polishing, painting, or texturing</td><td>Finished or near-finished parts</td><td>Performance versus cost and waste</td></tr>
<tr><td rowspan="2"><b>Integrate</b></td><td rowspan="2">Arrange or fabricate functional systems</td><td><a href='./Assembly.md'>Assembly</a></td><td>Positions and connects finished components into a functional system, using fasteners, connectors, or clips as needed; its primary purpose is system integration, not creating a load-bearing joint</td><td>Finished parts, fasteners, connectors</td><td>Throughput versus quality control</td></tr>
<tr><td><a href='./Electronics/Readme.md'>Electronics</a></td><td>Makes circuits, chips, and boards; internally uses lithography, deposition, etching, doping, packaging, and joining (internally spans all five mechanisms; classified here by its system-level output)</td><td>Semiconductors, metals, polymers, substrates</td><td>Precision and yield versus cost</td></tr>
</table>

The key discriminator between Joining and Assembly: Joining creates a load-bearing, material-level bond between two workpieces (weld, braze, adhesive), whereas Assembly arranges already-finished components into a functional system using fasteners, connectors, or clips without requiring a material-level bond.

The key discriminator between Casting and Additive manufacturing: Casting defines geometry via a physical mold (the mold is the tool), whereas Additive manufacturing defines geometry via a digital model (the build platform is the tool).

The partition spans from nanometre-scale operations (lithography, chemical-mechanical polishing in Electronics) to metre-scale operations (shipbuilding, large casting); the same five mechanisms operate across many orders of magnitude.

Cross-cutting concerns are Manufacturing subtopics that are not classes in the table because they do not impose a material transformation. They are listed here so that no subtopic is left outside the categorization.

<table>
<tr><th>Cross-cutting concern</th><th>Why it is not a class</th><th>What it does</th></tr>
<tr><td><a href='./Process-planning-and-DFM.md'>Process planning / DFM / manufacturing engineering</a></td><td>It is a decision and information function, not a material state change. It selects processes, sequences operations, and sets tolerances and fixtures</td><td>Chooses the process route, operations, and inspection plan for a part</td></tr>
<tr><td><a href='./Metrology-and-quality-control.md'>Metrology / quality control</a></td><td>It is a verification function, not a material state change. It measures, inspects, calibrates, and verifies conformance to specifications</td><td>Verifies dimensions, geometry, and surface quality against the design</td></tr>
</table>

<iframe src="./Manufacturing.simulation.html" title="Interactive animation of the manufacturing process flow for a smartphone chassis"></iframe>

## Related domains

Manufacturing draws on [Physics](../Physics/Readme.md) (materials science, thermodynamics of phase changes), [Mathematics](../Mathematics/Readme.md) (tolerance stack-up, geometric dimensioning and tolerancing, process optimization), and [Computer Science](../Computer-Science/Readme.md) (CAD/CAM, numerical control, robotics). It also relies heavily on chemistry: electrochemistry in plating and electrochemical machining (underlying electromagnetic principles in [Electromagnetism](../Physics/Interactions/Electromagnetism/Readme.md)), polymer chemistry in additive manufacturing and adhesive bonding, and surface chemistry in finishing and corrosion protection (phase-change and equilibrium principles in [Thermodynamics](../Physics/Thermodynamics/Readme.md)).

<details><summary>How to read the partition</summary>

- Bulk heat treatment (annealing, quenching, tempering, case hardening) changes material properties without altering geometry; it is included in [Materials processing](./Materials-processing.md).
- A typical flow: Materials processing → Forming → Subtractive → Surface finishing → Assembly, with Joining and Metrology interleaved as needed. Casting and Additive manufacturing replace Forming or Subtractive when the geometry or material demands it.
- "Machining" (CNC milling, turning, drilling, grinding) is the dominant practical subcategory of [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md).
- [Electronics](./Electronics/Readme.md) is not a material-transformation family. It is included in the Integrate class because it is a Manufacturing subtopic broad enough to have its own topic page; it produces functional components with internal transformations (lithography, deposition, etching, doping, packaging, joining).

</details>
<details><summary>Example: making a smartphone chassis</summary>

A typical aluminum smartphone chassis invokes several classes in sequence:

1. **Materials processing**: primary aluminum is cast into billets and hot-rolled into sheet.
2. **Forming**: the sheet is deep-drawn or stamped into a near-net chassis shape.
3. **Subtractive manufacturing**: CNC milling trims the edges, machines the camera cutout, and creates the antenna window.
4. **Surface finishing**: anodizing (Type II) grows a 15 µm Al₂O₃ layer for corrosion resistance and color; a sealant is applied.
5. **Assembly**: the chassis is joined (screws, clips) to the display, battery, and internal PCBs, then arranged into the final functional unit.
6. **Metrology / quality control**: CMM verifies critical dimensions; a dye-penetrant test checks for anodizing defects; the finished phone undergoes a drop test and functional test.

Process planning / DFM determines the sequence, tolerances, and fixtures before any material is touched.

</details>

<details><summary>Example: making a cast-iron engine block</summary>

A cast-iron engine block exercises a different subset of the same nine classes, demonstrating that the partition is product-agnostic:

1. **Materials processing**: pig iron is remelted in a cupola or induction furnace; the melt is alloyed and treated to control carbon and silicon content.
2. **Casting**: the molten iron is poured into a sand mold; the block solidifies with near-net geometry including the cylinder bores, water jacket, and oil galleries.
3. **Subtractive manufacturing**: CNC boring and honing finish the cylinder bores to $`\phi 86.000^{+0.010}_{0}` mm; the main-bearing saddles are machined to flatness within 0.02 mm.
4. **Surface finishing**: a phosphate conversion coat is applied to the exterior for paint adhesion; the interior passages are pressure-washed and dried.
5. **Assembly**: the block is bolted to the crankcase, head gasket surfaces are verified, and the block is torqued into the engine sub-assembly with the crankshaft, pistons, and connecting rods.
6. **Metrology / quality control**: a bore gauge verifies cylinder roundness and taper; a dye-penetrant test checks for casting porosity; a hydrostatic test confirms water-jacket integrity.

Process planning / DFM selects the mold design, machining sequence, and torque specifications before production begins.

</details>

## Parent

Manufacturing is a top-level technology domain.
