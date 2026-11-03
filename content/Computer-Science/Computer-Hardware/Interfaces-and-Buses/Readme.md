# Interfaces and Buses

An interface or bus is the physical and logical pathway by which information travels between two or more components of a computing system. Every transfer of data—from a register to an ALU, from a CPU to a memory chip, from a laptop to the internet—crosses at least one interface. Understanding interfaces and buses is essential whenever you are designing, debugging, or selecting hardware; choosing between DDR5 and LPDDR5, between PCIe Gen 6 and CXL, between USB4 and Thunderbolt 5, all reduce to questions about the underlying interface.

This page covers the **physical layer** of each interface: the medium, the signalling, the bandwidth limits, and the topology. The logical/protocol layer (framing, arbitration, error correction) is treated within each physical class below. Higher-level protocol stacks (IP, TCP, HTTP, TLS) are covered by [Networks](../../Distributed-Systems/Networks.md), and the information-theoretic limits that bound every medium (Shannon capacity, error correction) are covered by [Communication](../../Information-Theory/Communication.md).

## Brief history

1. **1970s – The system bus era.** The IBM PC (1981) popularised a single parallel bus (ISA) shared by all peripheral cards. Every component spoke on the same wires, and arbitration was simple but bandwidth was capped.
2. **1990s – Serialisation begins.** As parallel bus widths grew, crosstalk and EMI between adjacent wires scaled with frequency, making wide parallel buses infeasible beyond ~100 MHz. Serial differential pairs became the only viable path. SPI, I²C, and UART replaced wide parallel buses for low-speed control. USB (1996) and FireWire (1995) introduced serial, point-to-point, hot-pluggable cabling to the consumer.
3. **2000s – The on-chip explosion and the serial board.** Multicore processors and System-on-Chip designs made internal interconnects (crossbars, mesh NoCs) as critical as external buses. DDR memory standards raced from DDR1 to DDR4. At the board level, the parallel-to-serial transition completed: PCIe replaced PCI, and SATA replaced PATA.
4. **2010s–present – Coherence, chiplets, and convergence.** CXL (2019) introduced cache-coherent, peer-to-peer interconnect over PCIe, a qualitative shift from shared bus to coherent fabric. The chiplet revolution (AMD EPYC 2017, Intel 2023) made die-to-die links (UCIe) a major standard, reshaping the on-chip/board-level boundary. PCIe, CXL, Thunderbolt, and USB4 share signalling layers. Optical I/O and wireless (Wi-Fi 6E, 5G) push bandwidth beyond what copper can carry at distance. DDR5 (2020) extended the memory interface race.

## Categorisation

The five classes below are distinguished by the **engineering regime** in which the signal propagates: the scale of the conductor, the dominant loss mechanism, and the design discipline that governs it. On-chip and board-level are both electrical conduction in metal, but the physics that dominates (RC delay vs. impedance-matched transmission lines) and the tools used (transistor-level simulation vs. PCB stackup design) are fundamentally different. The "optical" row is a medium-based category that cuts across distance: optical interconnects exist at board level (silicon photonics I/O), at the cabled level (fibre between racks), and at long-haul (transoceanic cables); it is listed separately because the engineering discipline (photonics, wavelength management) is distinct from copper at every scale.

<table>
<tr><th>Page</th><th>Engineering regime</th><th>Typical distance</th><th>Typical bandwidth</th><th>Topology</th><th>Representative examples</th></tr>
<tr><td><a href="./On-chip-interconnects.md">On-chip interconnects</a></td><td>Metallic / polysilicon wires on a single die; RC-delay dominated</td><td>µm – mm (within a die)</td><td>Tb/s aggregate</td><td>Shared bus, crossbar, ring, mesh NoC</td><td>CPU bus, crossbar, mesh NoC, register file</td></tr>
<tr><td><a href="./Board-level-interconnects.md">Board-level electrical interconnects</a></td><td>Copper traces on a PCB and through-hole / BGA package pins; impedance-matched transmission lines</td><td>cm (board or package)</td><td>Gb/s per lane</td><td>Point-to-point (PCIe, DDR), shared bus (I²C, SPI)</td><td>DDR5, HBM3, PCIe, SPI, I²C, UART, CAN</td></tr>
<tr><td><a href="./Cabled-external-interconnects.md">Cabled external interconnects</a></td><td>Shielded copper cable between systems; conductor loss + radiation dominate</td><td>m – 100 m</td><td>Gb/s – 80 Gb/s</td><td>Point-to-point</td><td>USB4, Thunderbolt 5, Ethernet (copper), SATA, HDMI/DisplayPort</td></tr>
<tr><td><a href="./Optical-interconnects.md">Optical interconnects</a></td><td>Photons in glass fibre or free-space optics; attenuation and dispersion dominate</td><td>10 m – 1000 km</td><td>Tb/s per fibre</td><td>Point-to-point, WDM multiplexed</td><td>Fibre Ethernet, optical I/O, data-centre interconnect</td></tr>
<tr><td><a href="./Wireless-interfaces.md">Wireless interfaces</a></td><td>Electromagnetic waves in free space; diffraction, multipath, and path loss dominate</td><td>cm – 10⁴ km</td><td>Mb/s – Gb/s</td><td>Shared medium (CSMA/OFDMA), point-to-point (satellite)</td><td>Wi-Fi, Bluetooth, NFC, Zigbee, 5G, satellite</td></tr>
</table>

Each class above has one explanation page per family. The cabled-external class in particular splits into five families, one page each: [USB](./USB.md) (peripheral tree), [Thunderbolt](./Thunderbolt.md) (docking & expansion), [Ethernet over copper](./Ethernet-copper.md) (peer LAN), [SATA](./SATA.md) (storage), and [DisplayPort & HDMI](./DisplayPort-and-HDMI.md) (display).

The boundary between "board-level" and "cabled external" is not a physics boundary—both are copper transmission lines governed by the same Maxwell equations—but a **system/packaging boundary**: on-board traces are designed as part of a PCB stackup (controlled impedance, ground planes, via transitions), while off-board cables are designed as discrete assemblies (connector pinout, shielding, hot-plug, EMI compliance). The dominant loss mechanism also shifts: dielectric loss at the cm scale gives way to conductor loss and radiation at the m scale.

Memory interfaces (DDR5, HBM3, LPDDR5) appear in the board-level row, but the reader looking for latency and bandwidth context in the full memory hierarchy should consult [Memory Hierarchy](../../Computer-Hardware/Memory-Hierarchy.md).

Die-to-die and chiplet interconnects (UCIe, AMD Infinity Fabric, Intel EMIB) operate at 1–10 mm distances through TSVs, microbumps, or organic substrate. They are subsumed under the board-level row in this table but are treated explicitly in [Board-level electrical interconnects](./Board-level-interconnects.md).

### A single data path

A single network transfer crosses multiple classes in sequence:

CPU register → ALU → memory controller → DDR5 (board-level) → PCIe (board-level) → NIC → Ethernet cable (cabled) → fibre (optical) → router → …

Each arrow is a different interface class with its own physics, protocol, and engineering discipline. The interactive simulation below lets you trace a packet through the stack.

<details><summary>Details: dominant physics per class</summary>

The reason the physical medium is the right first-principles axis is that each regime is dominated by a different physical effect:

- **On-chip (µm–mm):** RC delay. Wires are short enough that the signal is a lumped circuit; the delay is set by the resistance of the metal and the capacitance to the substrate. No reflection, no impedance matching needed.
- **Board-level (cm):** Impedance matching. Traces are long enough to be transmission lines; reflections from impedance discontinuities (vias, connectors) corrupt the signal unless the line is terminated. Dielectric loss in the PCB substrate is the dominant attenuation.
- **Cabled (m–100 m):** Conductor loss and radiation. The skin effect concentrates current in a thin surface layer, increasing resistance with frequency. Shielding and twist geometry control radiation and crosstalk.
- **Optical (10 m–1000 km):** Attenuation and dispersion. The signal is a photon; loss is set by the glass (0.2 dB/km in SMF at 1550 nm) and dispersion (chromatic, modal) spreads the pulse. Wavelength-division multiplexing (WDM) packs many channels into one fibre.
- **Wireless (cm–10⁴ km):** Diffraction, path loss, and multipath. The signal propagates in free space; power falls as $`1/d^2` (or worse in urban environments). Multipath reflections cause fading; OFDM and MIMO mitigate it.

</details>

## Related topics

- [Networks](../../Distributed-Systems/Networks.md) covers the protocol layers (IP, TCP, HTTP, TLS) that sit above the physical interfaces described here. A reader looking for "how does Ethernet work" should start here for the PHY and signalling, then move to Networks for framing, addressing, and routing.
- [Communication](../../Information-Theory/Communication.md) provides the Shannon capacity and error-correction limits that bound every physical medium.
- [Memory Hierarchy](../../Computer-Hardware/Memory-Hierarchy.md) gives the latency and bandwidth context for the memory interfaces (DDR5, HBM3) that appear in the board-level row.
- [Interconnect and packaging](../../../Manufacturing/Electronics/Interconnect-and-packaging.md) covers the fabrication side (wire bonding, flip-chip, TSVs, CoWoS) of the same physical interconnects studied electrically here.
- [Electromagnetism](../../../Physics/Interactions/Electromagnetism/Readme.md) is the foundational physics: skin effect, attenuation, dispersion, and diffraction are all consequences of Maxwell's equations applied to different geometries.

When selecting an interface for a new design, start by identifying which physical domain your signal must traverse, then consult the corresponding subpage for protocol options and trade-offs.