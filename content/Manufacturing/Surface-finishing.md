# Surface finishing

Surface finishing changes the surface properties of a part by coating, plating, polishing, painting, or texturing. It is relevant when a part's surface must resist corrosion, wear, or heat; provide a specific electrical or optical property; or meet an aesthetic requirement.

> **Authoritative sources**
> - [ISO 1456:2009, Metallic and other inorganic coatings — Electrodeposited coatings of nickel plus chromium and of copper plus nickel plus chromium](https://www.iso.org/standard/51920.html)
> - [ASTM B689, Standard Specification for Electroplated Engineering Nickel Coatings](https://www.astm.org/)
> - [MIL-PRF-8625, Anodizing, Aluminum and Aluminum Alloys](https://everyspec.com/MIL-PRF/MIL-PRF-00001_00999/download.php?spec=MIL-PRF-8625C.1999-06-15.pdf)
> - [ASTM B733, Standard Specification for Electroless Nickel-Phosphorus Coatings on Metal](https://www.astm.org/)

## Utility

- Protects the base material from corrosion, wear, or oxidation.
- Provides a specific surface property: conductivity, reflectivity, friction, or biocompatibility.
- Enables assembly: a plated surface can be soldered; a painted surface can be bonded.

## Key concepts

<table>
<tr><th>Process</th><th>Mechanism</th><th>Typical thickness</th><th>Achievable Ra</th><th>Primary application</th></tr>
<tr><td>Electroplating</td><td>Electrochemical</td><td>0.25–250 µm</td><td>0.1–1 µm</td><td>Wear, corrosion, appearance</td></tr>
<tr><td>Electroless plating</td><td>Chemical (autocatalytic)</td><td>5–100 µm</td><td>0.1–0.5 µm</td><td>Uniform coating on complex geometry</td></tr>
<tr><td>CVD / PVD / ALD</td><td>Vapor-phase</td><td>0.01–20 µm</td><td>&lt; 0.1 µm</td><td>Cutting tools, semiconductors, MEMS</td></tr>
<tr><td>Polishing / lapping</td><td>Mechanical</td><td>Removes 0.1–100 µm</td><td>&lt; 0.05 µm</td><td>Optical, medical, precision parts</td></tr>
<tr><td>Coating / painting</td><td>Thermal cure</td><td>10–300 µm</td><td>1–10 µm</td><td>Corrosion, aesthetics, architecture</td></tr>
<tr><td>Anodizing (Type II / III)</td><td>Electrochemical</td><td>5–250 µm</td><td>0.1–1 µm</td><td>Corrosion, wear (aerospace, architecture)</td></tr>
<tr><td>Thermal spray</td><td>Thermal (kinetic)</td><td>50–500 µm</td><td>1–10 µm</td><td>Wear, erosion, large components</td></tr>
<tr><td>Passivation</td><td>Chemical</td><td>&lt; 1 µm (native oxide)</td><td>No change</td><td>Stainless steel, medical, food-grade</td></tr>
</table>

### Electroplating

A metal is deposited electrochemically onto a conductive substrate by passing current through an electrolyte containing the metal ions.

<details><summary>Details</summary>

- **Nickel plating**: 5–50 µm. Corrosion resistance, wear resistance, and a base for other coatings. Electrolytic nickel (ASTM B689) or electroless nickel (phosphorus-containing, self-catalyzed).
- **Chromium plating**: 8–250 µm hard chrome (wear, corrosion; general engineering 13–50 µm, hydraulic rods 20–100 µm, dimensional restoration 50–500+ µm) or 0.25–1.0 µm decorative chrome (appearance; the nickel undercoat carries the corrosion protection).
- **Copper plating**: 10–100 µm. A base coat for nickel/chrome on non-ferrous parts; also used for electrical conductivity.
- **Gold plating**: 0.4–3 µm. Corrosion resistance and solderability for electronics connectors (15–120 µin).

Key parameters: current density (A/dm²), bath composition, temperature, and part geometry (throwing power). Edges and corners receive more current and thus a thicker deposit.

For detailed process physics and electronics-specific parameters, see [Deposition](./Electronics/Deposition.md).

</details>

### Electroless plating

A metal is deposited by a chemical reduction reaction on a catalytically active surface, without an external current.

<details><summary>Details</summary>

- **Electroless nickel (EN)**: 1–12 % phosphorus (ASTM B733: Type II 1–3 %, Type III 2–4 %, Type IV 5–9 %, Type V 10 %+). Uniform thickness regardless of geometry. Used for magnetic cores, automotive parts, and chemical equipment.
- **Electroless copper**: deposited on non-conductive substrates (PCBs, composites) to make them conductive before electroplating.
- **Advantage**: uniform coverage on complex geometries; no current distribution issues.
- **Limitation**: slower than electroplating; bath life is limited by decomposition.

For detailed process physics and electronics-specific parameters, see [Deposition](./Electronics/Deposition.md).

</details>

### Chemical vapor deposition (CVD) and physical vapor deposition (PVD)

A thin film is deposited from a vapor phase onto a substrate.

<details><summary>Details</summary>

- **CVD**: a gas-phase reaction deposits a solid film. Examples: diamond-like carbon (DLC) on cutting tools, silicon nitride on turbine blades. Thickness 5–20 µm.
- **PVD**: a solid source is vaporized (evaporation, sputtering) and condensed on the substrate. Examples: TiN (gold-colored, hard) on drill bits, CrN on molds. Thickness 1–5 µm.
- **ALD (atomic layer deposition)**: a self-limiting surface reaction deposits one atomic layer per cycle. Used for ultra-thin (0.01–1 µm), conformal coatings on high-aspect-ratio structures (semiconductor, MEMS).

These processes are also central to [Electronics](./Electronics/Readme.md) fabrication. For detailed process physics and electronics-specific parameters, see [Deposition](./Electronics/Deposition.md).

</details>

### Polishing and lapping

A mechanical or chemical-mechanical process reduces surface roughness to a mirror or near-mirror finish.

<details><summary>Details</summary>

- **Grinding → superfinishing → polishing**: a sequence of decreasing abrasive grit. Final Ra < 0.1 µm.
- **CMP (chemical mechanical planarization)**: a slurry and a rotating pad polish a wafer flat. Critical in [Electronics](./Electronics/Readme.md) for multi-layer interconnects.
- **Electropolishing**: the part is the anode in an electrolyte; the surface is dissolved uniformly, reducing Ra and removing burrs. Used for stainless steel tubing and surgical instruments.

</details>

### Coating and painting

A liquid or powder coating is applied to the surface and cured.

<details><summary>Details</summary>

- **Powder coating**: a dry powder (epoxy, polyester) is electrostatically applied and cured at 180–220 °C. Thickness 60–300 µm. Used for automotive, appliances, and architectural metal.
- **Liquid painting**: a solvent- or water-based paint is sprayed, dipped, or flow-coated and cured. Thickness 10–100 µm.
- **Conversion coatings**: a thin inorganic layer (chromate, phosphate, black oxide) is formed on the surface to improve paint adhesion and corrosion resistance.

</details>

### Anodizing

An aluminum part is the anode in an electrolyte (typically sulfuric acid); a porous Al₂O₃ layer grows into the surface. The pores are sealed or dyed.

<details><summary>Details</summary>

- **Type II (standard)**: 5–25 µm, 15–25 µm typical. Used for architectural aluminum, consumer electronics, and general corrosion protection. Specified to ASTM B137.
- **Type III (hard)**: 25–250 µm, 350–550 HV. Specified to MIL-PRF-8625. Used for aerospace structural parts, hydraulic cylinders, and high-wear applications where a thick, hard, wear-resistant oxide is required.
- **Process**: anodic dissolution in H₂SO₄ (Type II) or oxalic/sulfuric acid (Type III) at 18–22 °C. The porous structure is sealed in hot water or nickel acetate to close the pores and lock in dye.
- **Advantage**: the coating is integral with the substrate (not a separate layer that can chip); excellent wear and corrosion resistance for aluminum.

</details>

### Thermal spray coatings

A material (metal, ceramic, or polymer) is melted or heated and projected onto a substrate at high velocity, forming a bonded coating.

<details><summary>Details</summary>

- **HVOF (high-velocity oxy-fuel)**: fuel gas and oxygen burn to accelerate molten/semi-molten particles to 700–1200 m/s. Thickness 50–500 µm. Used for turbine blades, pump shafts, and offshore structures. Excellent adhesion and low porosity.
- **Plasma spray**: an electric arc (10 000–30 000 K) melts ceramic or metal powder; particles are carried by argon/helium. Thickness 100–500 µm (up to several mm). Used for thermal barrier coatings (TBCs) on turbine blades and erosion protection.
- **Flame spray**: a fuel-oxygen flame melts wire or powder. Thickness 100–500 µm. Lower cost, used for general wear and corrosion protection.
- **Cold spray**: solid particles are accelerated by a supersonic gas jet and bond kinetically without melting. Thickness 50–500 µm. Used for restoring dimensions and depositing pure metals (Cu, Ni, Ti) without thermal distortion.
- **Applications**: wear/erosion/corrosion protection on large components where machining or electroplating is impractical (turbine blades, pump shafts, offshore structures, gun barrels).

</details>

### Passivation

A chemical treatment that removes free iron from stainless steel or titanium surfaces and enhances the native chromium-oxide (or titanium-oxide) passive layer.

<details><summary>Details</summary>

- **Process**: immersion or spray in nitric acid (ASTM A967) or citric acid (ASTM A380) at 60–80 °C for 10–30 min. The acid dissolves free iron and any non-protective oxides, leaving a uniform Cr₂O₃ (or TiO₂) layer.
- **Thickness**: the passive layer is < 1 µm (typically 2–5 nm); it is not a coating but an enhanced native oxide.
- **Applications**: medical implants, food-grade equipment, pharmaceutical processing, and any stainless steel part where pitting resistance is critical.
- **Limitation**: only effective on materials that form a stable passive oxide (stainless steel, titanium, nickel alloys). Does not protect carbon steel.

</details>

## Interactive: multi-coat system

<iframe src="./Surface finishing.simulation.html" title="Layered multi-coat system with adjustable thicknesses"></iframe>

## Example problem

A titanium (Ti-6Al-4V) hip implant must have a corrosion-resistant, biocompatible surface with Ra < 0.2 µm. Which surface finishing process is appropriate?

<details><summary>Solution</summary>

1. **Base material**: Ti-6Al-4V is already biocompatible and corrosion-resistant. The goal is to reduce surface roughness and remove machining marks.
2. **Process sequence**:
   - Mechanical polishing: diamond paste (6 µm → 1 µm → 0.25 µm) on a felt wheel.
   - Electropolishing: 10–20 V in a phosphoric/boric acid electrolyte for 30–60 s. Removes the deformed surface layer, reduces Ra to < 0.1 µm, and improves corrosion resistance.
3. **Inspection**: Surface profilometry to verify Ra < 0.2 µm; [Metrology and quality control](./Metrology-and-quality-control.md) for dimensional verification.
4. **Sterilization**: The finished implant is sterilized (autoclave or gamma) before packaging. No further coating is needed.

**Why not apply a coating (e.g., PVD TiN) instead?**

- Ti-6Al-4V is already biocompatible; a coating adds a potential failure interface (delamination, spalling) that the bare alloy does not have.
- A PVD coating may introduce elements (e.g., nitrogen, carbon) that are not certified for long-term implant contact.
- The coating adds thickness, which may interfere with the implant's designed geometry and fit.
- Polishing + electropolishing achieves the required Ra and enhances the native TiO₂ passive layer without adding a foreign material. The simplest process that meets the requirement is preferred in medical device design.

</details>

## Parent

This page is a class in the [Manufacturing](./Readme.md) topic.

## Example problem

A titanium (Ti-6Al-4V) hip implant must have a corrosion-resistant, biocompatible surface with Ra < 0.2 µm. Which surface finishing process is appropriate?

<details><summary>Solution</summary>

1. **Base material**: Ti-6Al-4V is already biocompatible and corrosion-resistant. The goal is to reduce surface roughness and remove machining marks.
2. **Process sequence**:
   - Mechanical polishing: diamond paste (6 µm → 1 µm → 0.25 µm) on a felt wheel.
   - Electropolishing: 10–20 V in a phosphoric/boric acid electrolyte for 30–60 s. Removes the deformed surface layer, reduces Ra to < 0.1 µm, and improves corrosion resistance.
3. **Inspection**: Surface profilometry to verify Ra < 0.2 µm; [Metrology / quality control](./Metrology-and-quality-control.md) for dimensional verification.
4. **Sterilization**: The finished implant is sterilized (autoclave or gamma) before packaging. No further coating is needed.

</details>

## Parent

This page is a class in the [Manufacturing](./Readme.md) topic.
