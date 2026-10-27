# Subtractive manufacturing

Subtractive manufacturing creates a part by removing material from a solid stock until the desired geometry is achieved. It is the dominant production method for metal parts and remains essential whenever a component must be machined from a single billet, plate, or bar, or when a specific surface finish, tolerance, or material property (e.g. grain direction, heat-treat state) cannot be achieved by [additive manufacturing](../Additive-manufacturing.md) or [forming](../Forming.md).

Use subtractive manufacturing when:

- The part is a solid or near-solid shape (gears, housings, shafts, turbine blades).
- Tight tolerances (≤ 10 µm) or fine surface finishes (Ra < 0.4 µm) are required.
- The material is already in the desired metallurgical state (forged, cast, heat-treated).
- Production volume ranges from one-off prototypes to high-volume automotive parts.

## History

- **Antiquity → 18th c.** – Chisels, files, and natural-abrasive grinding wheels remove metal by hand; the mechanism is purely mechanical.
- **1797** – Henry Maudslay builds the first sliding-rest lathe, making precision turning reproducible and launching the modern machine-tool industry.
- **1924** – Serge Braun (Paris) patents spark [electrical discharge machining](./Electrical-discharge-machining.md), opening the non-contact, hardness-independent route.
- **1960s–70s** – Industrial [laser](./Thermal-cutting.md) and plasma cutting, plus [electrochemical](./Electrochemical-machining.md) and [chemical](./Chemical-machining.md) machining, mature for aerospace and electronics.

## Classes

The five classes are defined by the **physical mechanism of material removal** – the type of energy or force that separates material from the workpiece. They are mutually exclusive: a given process removes material by exactly one dominant mechanism.

<table>
<tr><th>Page</th><th>Removal mechanism</th><th>Typical MRR (mm³/min)</th><th>Surface finish (Ra, µm)</th><th>Tolerance (µm)</th><th>Material independence</th></tr>
<tr><td><a href='./Mechanical-machining.md'>Mechanical machining</a></td><td>Kinetic force of a tool</td><td>1 – 5 000</td><td>0.2 – 25</td><td>± 5 – 50</td><td>Depends on hardness ratio</td></tr>
<tr><td><a href='./Thermal-cutting.md'>Thermal cutting</a></td><td>Heat (melting / vaporising)</td><td>0.1 – 1 000</td><td>1 – 10</td><td>± 50 – 200</td><td>High (any meltable material)</td></tr>
<tr><td><a href='./Electrical-discharge-machining.md'>Electrical discharge machining</a></td><td>Spark plasma (vaporisation)</td><td>0.01 – 50</td><td>0.2 – 3</td><td>± 1 – 25</td><td>Any electrically conductive material</td></tr>
<tr><td><a href='./Electrochemical-machining.md'>Electrochemical machining</a></td><td>Anodic dissolution in electrolyte</td><td>1 – 2 000</td><td>0.5 – 5</td><td>± 5 – 50</td><td>Any conductive material</td></tr>
<tr><td><a href='./Chemical-machining.md'>Chemical machining</a></td><td>Chemical dissolution / etching</td><td>0.001 – 1</td><td>0.1 – 1</td><td>±10% of thickness</td><td>Any material with a suitable reagent</td></tr>
</table>

## Decision heuristic

The table above gives per-class capability ranges. To select a class, ask in order:

1. **Geometry complexity** – Is the part a 2-D contour (sheet/plate) or a 3-D solid? 2-D contours favour thermal or chemical; 3-D solids favour mechanical, EDM, or ECM.
2. **Production volume** – One-off or low-volume (< 100) favours mechanical (no dedicated tooling) or EDM (electrode is the tool). High volume (> 10 000) favours ECM (no tool wear) or chemical (no tooling at all).
3. **Tooling / fixture cost** – If the part is too large or too expensive to fixture for a multi-axis mill, ECM or chemical milling (mask + reagent) avoids the fixture entirely.
4. **Heat-affected zone (HAZ) sensitivity** – If the material must retain its as-received microstructure (e.g. superalloy blades, hardened tool steel), exclude thermal and EDM; use mechanical grinding, ECM, or chemical.
5. **Part size and area** – Very large flat areas (aircraft skins, ship plates) favour thermal or ECM; very small features (< 100 µm) favour chemical or wire EDM.

<iframe src="./Subtractive-manufacturing.simulation.html" title="Interactive comparison of subtractive manufacturing classes"></iframe>

## Parent

Subtractive manufacturing is a class in the [Manufacturing](../Readme.md) topic.