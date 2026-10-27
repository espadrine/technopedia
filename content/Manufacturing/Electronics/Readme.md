# Electronics

Electronics manufacturing produces functional electronic components—integrated circuits, printed circuit boards, sensors, and modules—by depositing, patterning, doping, and interconnecting conductive, insulating, and semiconducting materials at the micro- to nano-scale. It is relevant whenever a product requires electrical or computational function: from a microcontroller on a PCB to a 3 nm logic chip.

Electronics is a Manufacturing subtopic broad enough to warrant its own topic page. It is not a single material-transformation class; it internally uses deposition, etching, lithography, doping, joining ([Joining](../Joining.md)), and [Surface finishing](../Surface-finishing.md) in combination.

## History

- 1947: The transistor (Bell Labs) replaced vacuum tubes, enabling solid-state electronics.
- 1959: The integrated circuit (Kilby, Noyce) placed multiple transistors on a single chip.
- 1970s–80s: Photolithography scaled from 10 µm to 1 µm; CMOS became the dominant logic family; ion implantation replaced thermal diffusion for doping.
- 2000s–present: Sub-10 nm nodes, 3D stacking (FinFET, GAA), advanced packaging (chiplets, CoWoS), and EUV lithography.

> **Authoritative sources**
> - [ITRS / IRDS Roadmaps](https://www.intel.com/content/www/us/en/articles/marketing-collateral/industry-reports.html)
> - [IPC-2221, Generic Standard on Printed Board Design](https://www.ipc.org/ipc-2221-generic-standard-printed-board-design) — the generic PCB design and fabrication standard
> - [SEMI International Standards](https://www.semi.org/en/products-services/standards) — materials, equipment, and process standards for semiconductor manufacturing

## Categorization

The table lists the primary classes of electronics manufacturing. The partition is by the physical operation performed on the substrate: define a geometry (pattern), add material, remove material, modify material in place, or integrate finished parts. One class, PCB fabrication, is a product-level process flow rather than a single atomic operation; it is listed because it produces a distinct product (the printed circuit board) with its own industry and standards.

<table>
<tr><th>Page</th><th>Operation</th><th>Main idea</th><th>Typical scale</th><th>Key trade-off</th></tr>
<tr><td><a href='./Lithography.md'>Lithography</a></td><td>Pattern</td><td>Transfers a geometric pattern onto a photoresist-coated substrate using light, electron, or ion beams</td><td>10 nm – 1 mm</td><td>Resolution versus throughput and cost</td></tr>
<tr><td><a href='./Deposition.md'>Deposition</a></td><td>Add material</td><td>Deposits a thin film of conductor, insulator, or semiconductor onto a substrate by CVD, PVD, or electroplating</td><td>1 nm – 100 µm</td><td>Conformality and step coverage versus speed</td></tr>
<tr><td><a href='./Etching.md'>Etching</a></td><td>Remove material</td><td>Removes selected regions of a deposited film by dry (plasma) or wet (chemical) etching; includes CMP, the chemical-mechanical planarization that flattens the wafer between layers</td><td>1 nm – 1 mm</td><td>Selectivity and anisotropy versus rate</td></tr>
<tr><td><a href='./Doping-and-annealing.md'>Doping and annealing</a></td><td>Modify material</td><td>Alters the electrical properties of a semiconductor region in place by ion implantation or thermal diffusion, then repairs the crystal and activates the dopants by annealing</td><td>10 nm – 10 µm deep</td><td>Junction sharpness versus crystal damage and thermal budget</td></tr>
<tr><td><a href='./Interconnect-and-packaging.md'>Interconnect and packaging</a></td><td>Integrate</td><td>Connects dies, chips, and boards into a functional module using wire bonding, flip-chip, or through-silicon vias</td><td>10 µm – 100 mm</td><td>Bandwidth and thermal path versus cost and yield</td></tr>
<tr><td><a href='./PCB-fabrication.md'>PCB fabrication</a></td><td>Composite: laminate, pattern, drill, plate</td><td>Produces multi-layer printed circuit boards by laminating copper-clad prepreg, patterning copper, and drilling vias — a product-level process flow that composes the unit operations above at board scale</td><td>0.1 mm – 1 m</td><td>Layer count and density versus cost and signal integrity</td></tr>
</table>

<details><summary>How to read the partition</summary>

- A chip is made by repeating lithography → deposition → etching → planarization (CMP) many times to build up layers of transistors and interconnects; doping steps (wells, source/drain, channel adjustments) are interleaved after lithography opens a window, before the [Deposition](./Deposition.md) of the next layer.
- Doping is a genuinely distinct operation: it modifies the material already in place (it adds dopant atoms, but no layer), which is why it is neither [Deposition](./Deposition.md) (new film on top) nor [Etching](./Etching.md) (material removed).
- PCB fabrication is a product-level process, not a single atomic operation: a PCB's primary purpose is signal routing and component attachment, and its flow internally composes lamination (a form of joining), copper deposition, lithography-style patterning, etching, and drilling at a macroscopic scale.
- Packaging connects the die to the PCB (or to other dies in a multi-chip module).

</details>

<iframe src="./Electronics.simulation.html" title="Interactive chip process-flow simulator: deposit, pattern, etch, dope, and planarize layers to build a transistor cross-section"></iframe>

## Parent

Electronics is a subtopic of [Manufacturing](../Readme.md).
