# Board-level electrical interconnects

Board-level interconnects are the copper traces on a PCB and the through-hole or BGA package pins that connect chips to each other and to the board edge. They are relevant whenever a system must move data between a CPU and its memory, between a CPU and a peripheral (GPU, NIC, SSD), or between a microcontroller and a sensor. At the cm scale, the dominant physics is impedance-matched transmission-line behaviour, and the design discipline is PCB stackup and signal-integrity engineering.

> **Authoritative sources**
> - [PCIe 6.0 Specification](https://pcisig.com/specifications)
> - [DDR5 SDRAM Standard (JESD79-5)](https://www.jedec.org/)
> - [LPDDR5 Standard (JESD209-5)](https://www.jedec.org/)
> - [I²C Specification (NXP/Philips)](https://www.nxp.com/products/interfaces/i2c-bus)
> - [UCIe 1.1 Specification](https://www.uciexpress.org/)

The interactive simulation below shows how a signal propagates along a PCB trace and reflects at an impedance discontinuity—the central signal-integrity problem at this scale.

<iframe src="./Board-level-interconnects.simulation.html" title="PCB trace signal propagation and reflection at an impedance discontinuity"></iframe>

## Memory interfaces (DDR5, HBM3, LPDDR5)

**Definition.** A memory interface is a point-to-point (or shared-bank) electrical link between a memory controller on the CPU/SoC and a DRAM chip or stack. DDR5 uses a 64-bit (x8 × 8) channel per DIMM, split into two independent 32-bit sub-channels; HBM3 stacks 8–16 dies vertically with a 1024-bit wide bus.

<details><summary>Details</summary>

DDR5 (2020) operates at 4800–6400 MT/s per pin. The 64-bit channel is split into two independent 32-bit sub-channels, each with its own command/address bus, allowing the controller to issue a new command to one sub-channel while the other is still completing a transfer (lower effective latency). The data pins (DQ) are single-ended; the clock (CK) and data strobe (DQS_t/DQS_c) are differential pairs on controlled-impedance traces (typically 50 Ω single-ended, 85 Ω differential).

<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;width:100%;font-family:sans-serif;">
  <rect x="10" y="10" width="680" height="200" fill="#f9f9f9" stroke="#ccc" rx="6"/>
  <text x="350" y="32" text-anchor="middle" font-size="13" font-weight="bold">DDR5 64-bit channel: two independent 32-bit sub-channels</text>
  <!-- Sub-channel A -->
  <rect x="30" y="45" width="310" height="80" fill="#e3f2fd" stroke="#1565c0" rx="4"/>
  <text x="185" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">Sub-channel A (32-bit)</text>
  <text x="50" y="80" font-size="10" fill="#333">DQ[0:7]  DQ[8:15]  DQ[16:23]  DQ[24:31]</text>
  <text x="50" y="95" font-size="10" fill="#333">(single-ended, 50 Ω)</text>
  <text x="50" y="112" font-size="10" fill="#333">DQS_t/DQS_c (diff, 85 Ω)  CK_t/CK_c (diff, 85 Ω)</text>
  <!-- Sub-channel B -->
  <rect x="360" y="45" width="310" height="80" fill="#e8f5e9" stroke="#2e7d32" rx="4"/>
  <text x="515" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#2e7d32">Sub-channel B (32-bit)</text>
  <text x="380" y="80" font-size="10" fill="#333">DQ[32:39]  DQ[40:47]  DQ[48:55]  DQ[56:63]</text>
  <text x="380" y="95" font-size="10" fill="#333">(single-ended, 50 Ω)</text>
  <text x="380" y="112" font-size="10" fill="#333">DQS_t/DQS_c (diff, 85 Ω)  CK_t/CK_c (diff, 85 Ω)</text>
  <!-- Controller -->
  <rect x="200" y="140" width="300" height="40" fill="#fff3e0" stroke="#e65100" rx="4"/>
  <text x="350" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#e65100">Memory Controller (independent CA per sub-channel)</text>
  <!-- Arrows -->
  <line x1="185" y1="125" x2="280" y2="140" stroke="#1565c0" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="515" y1="125" x2="420" y2="140" stroke="#2e7d32" stroke-width="1.5" marker-end="url(#arrow)"/>
  <defs><marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#555"/></marker></defs>
</svg>

**Example.** A dual-channel DDR5-5600 system has two 64-bit channels, each at 5600 MT/s, giving a peak bandwidth of 2 × 64 × 5600 / 8 = 89.6 GB/s.

HBM3 (2020) stacks DRAM dies vertically using TSVs (through-silicon vias). The 1024-bit bus at 6.4 Gb/s per pin gives 819 GB/s per stack. The interface is so wide that it is effectively a parallel bus, but the TSVs are short enough (~100 µm) that the signal is still in the RC-delay regime rather than the transmission-line regime.

LPDDR5 (2019) is the mobile variant: 16-bit channel, lower voltage (1.05 V), and a smaller pin count for battery-powered devices.

The reader looking for where these interfaces sit in the full memory hierarchy (latency, capacity, bandwidth trade-offs) should consult [Memory Hierarchy](../Computer-Hardware/Memory-Hierarchy.md).

<details><summary>Example problem</summary>

A server has 8 DDR5-4800 DIMMs in 4 dual-rank channels. What is the peak memory bandwidth?

<details><summary>Solution</summary>

Each channel is 64 bits wide at 4800 MT/s: 64 × 4800 / 8 = 38.4 GB/s per channel. With 4 channels: 4 × 38.4 = 153.6 GB/s peak bandwidth. (Dual-rank does not change bandwidth; it increases capacity.)

</details>

</details>

</details>

Moving from the dedicated memory link to the general-purpose peripheral interconnect, the next class of board-level interconnects connects the CPU to everything else on the board.

## PCIe (Peripheral Component Interconnect Express)

**Definition.** PCIe is a serial, point-to-point, packet-based interconnect using differential signalling, governed by the Link Training and Status State Machine (LTSSM). It connects the CPU to peripherals (GPU, NVMe SSD, NIC) and supports Gen 1 (2.5 GT/s) through Gen 6 (64 GT/s) with PAM4 modulation.

<details><summary>Details</summary>

PCIe replaced the parallel PCI bus in 2003. Each "lane" is a pair of differential signals (TX+/TX−, RX+/RX−). A ×16 link has 16 lanes, giving 16 × 64 Gb/s = 1024 Gb/s = 128 GB/s in one direction at Gen 6.

<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;width:100%;font-family:sans-serif;">
  <rect x="10" y="10" width="680" height="220" fill="#f9f9f9" stroke="#ccc" rx="6"/>
  <text x="350" y="32" text-anchor="middle" font-size="13" font-weight="bold">PCIe ×16 link: 16 differential lanes</text>
  <!-- One lane detail -->
  <rect x="30" y="45" width="200" height="100" fill="#fff" stroke="#333" rx="4"/>
  <text x="130" y="62" text-anchor="middle" font-size="11" font-weight="bold">One lane</text>
  <line x1="50" y1="80" x2="210" y2="80" stroke="#d32f2f" stroke-width="2"/>
  <text x="55" y="76" font-size="9" fill="#d32f2f">TX+</text>
  <line x1="50" y1="92" x2="210" y2="92" stroke="#1565c0" stroke-width="2"/>
  <text x="55" y="106" font-size="9" fill="#1565c0">TX−</text>
  <line x1="50" y1="115" x2="210" y2="115" stroke="#d32f2f" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="55" y="111" font-size="9" fill="#d32f2f">RX+</text>
  <line x1="50" y1="127" x2="210" y2="127" stroke="#1565c0" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="55" y="141" font-size="9" fill="#1565c0">RX−</text>
  <text x="130" y="155" text-anchor="middle" font-size="9" fill="#555">85 Ω differential pair</text>
  <!-- ×16 link -->
  <rect x="260" y="45" width="400" height="100" fill="#fff" stroke="#333" rx="4"/>
  <text x="460" y="62" text-anchor="middle" font-size="11" font-weight="bold">×16 link (16 lanes in parallel)</text>
  <!-- Draw 16 small lane boxes -->
  <g>
    <rect x="280" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="306" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="332" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="358" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="384" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="410" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="436" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="462" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="488" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="514" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="540" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="566" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="592" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="618" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
    <rect x="644" y="72" width="22" height="50" fill="#e3f2fd" stroke="#1565c0" rx="2"/>
  </g>
  <text x="460" y="140" text-anchor="middle" font-size="10" fill="#555">Lane 0 … Lane 15 (each: TX+/TX−/RX+/RX−)</text>
  <!-- Bandwidth label -->
  <text x="460" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#333">Gen 6: 16 × 64 Gb/s = 128 GB/s per direction</text>
  <!-- Arrow from lane to link -->
  <line x1="230" y1="95" x2="260" y2="95" stroke="#555" stroke-width="1.5" marker-end="url(#arrow2)"/>
  <defs><marker id="arrow2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#555"/></marker></defs>
</svg>

The protocol is layered: the physical layer (PHY) handles 128b/130b encoding and equalisation; the data link layer handles ACK/NAK and flow control; the transaction layer handles TLPs (Transaction Layer Packets) with addressing and ordering.

**Example.** An NVIDIA RTX 4090 uses a PCIe Gen 4 ×16 link: 16 × 16 Gb/s = 256 Gb/s = 32 GB/s per direction. The GPU's HBM2e memory (1 TB/s) is much faster than the PCIe link, so the PCIe interface is the bottleneck for data transfer between host and GPU.

CXL (Compute Express Link, 2019) extends PCIe with cache-coherent, peer-to-peer semantics: a CXL device can snoop the host's cache, enabling memory pooling and load-balancing across devices.

<details><summary>Example problem</summary>

A NVMe SSD uses a PCIe Gen 4 ×4 link. What is the maximum sequential read throughput?

<details><summary>Solution</summary>

PCIe Gen 4 is 16 GT/s per lane. With 128b/130b encoding, the effective data rate is 16 × 128/130 ≈ 15.7 Gb/s per lane. With 4 lanes: 4 × 15.7 = 62.8 Gb/s ≈ 7.85 GB/s. In practice, NVMe Gen 4 ×4 drives achieve ~7 GB/s sequential reads.

</details>

</details>

</details>

Stepping down from the multi-gigabit serial links of PCIe, the next class of board-level interconnects are the low-speed control buses that configure and monitor the system.

## Low-speed control buses (SPI, I²C, UART, CAN)

**Definition.** SPI (Serial Peripheral Interface) is a synchronous, master-slave, 4-wire (SCLK, MOSI, MISO, CS) bus. I²C (Inter-Integrated Circuit) is a synchronous, multi-master, 2-wire (SDA, SCL) bus with address-based arbitration. UART (Universal Asynchronous Receiver-Transmitter) is an asynchronous, point-to-point, 2-wire (TX, RX) serial link. CAN (Controller Area Network) is a differential, multi-master, 2-wire (CAN_H, CAN_L) bus with non-destructive bit-wise arbitration.

<details><summary>Details</summary>

These buses operate at low speeds (100 kHz to 100 MHz) and are used for control, configuration, and low-bandwidth data (sensors, EEPROMs, debug consoles, automotive ECUs).

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;width:100%;font-family:sans-serif;">
  <rect x="10" y="10" width="680" height="300" fill="#f9f9f9" stroke="#ccc" rx="6"/>
  <text x="350" y="30" text-anchor="middle" font-size="13" font-weight="bold">Low-speed bus wiring topologies</text>
  <!-- SPI -->
  <rect x="30" y="45" width="310" height="100" fill="#fff" stroke="#333" rx="4"/>
  <text x="185" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">SPI (4-wire, master-slave)</text>
  <rect x="50" y="75" width="60" height="30" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="80" y="94" text-anchor="middle" font-size="9">Master</text>
  <rect x="240" y="75" width="60" height="30" fill="#e8f5e9" stroke="#2e7d32" rx="3"/>
  <text x="270" y="94" text-anchor="middle" font-size="9">Slave</text>
  <line x1="110" y1="80" x2="240" y2="80" stroke="#d32f2f" stroke-width="1.5"/>
  <text x="175" y="77" text-anchor="middle" font-size="8" fill="#d32f2f">SCLK</text>
  <line x1="110" y1="88" x2="240" y2="88" stroke="#1565c0" stroke-width="1.5"/>
  <text x="175" y="85" text-anchor="middle" font-size="8" fill="#1565c0">MOSI</text>
  <line x1="240" y1="96" x2="110" y2="96" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="175" y="106" text-anchor="middle" font-size="8" fill="#2e7d32">MISO</text>
  <line x1="110" y1="104" x2="240" y2="104" stroke="#e65100" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="175" y="118" text-anchor="middle" font-size="8" fill="#e65100">CS (per slave)</text>
  <!-- I2C -->
  <rect x="360" y="45" width="310" height="100" fill="#fff" stroke="#333" rx="4"/>
  <text x="515" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#6a1b9a">I²C (2-wire, multi-slave)</text>
  <rect x="380" y="75" width="50" height="30" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="405" y="94" text-anchor="middle" font-size="9">Master</text>
  <rect x="530" y="70" width="50" height="22" fill="#e8f5e9" stroke="#2e7d32" rx="3"/>
  <text x="555" y="84" text-anchor="middle" font-size="8">Slave A</text>
  <rect x="530" y="96" width="50" height="22" fill="#e8f5e9" stroke="#2e7d32" rx="3"/>
  <text x="555" y="110" text-anchor="middle" font-size="8">Slave B</text>
  <line x1="430" y1="82" x2="640" y2="82" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="535" y="78" text-anchor="middle" font-size="8" fill="#6a1b9a">SDA</text>
  <line x1="430" y1="100" x2="640" y2="100" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="535" y="114" text-anchor="middle" font-size="8" fill="#6a1b9a">SCL</text>
  <line x1="580" y1="82" x2="580" y2="81" stroke="#6a1b9a" stroke-width="1"/>
  <line x1="580" y1="100" x2="580" y2="96" stroke="#6a1b9a" stroke-width="1"/>
  <!-- UART -->
  <rect x="30" y="160" width="310" height="80" fill="#fff" stroke="#333" rx="4"/>
  <text x="185" y="177" text-anchor="middle" font-size="11" font-weight="bold" fill="#00695c">UART (2-wire, point-to-point, async)</text>
  <rect x="50" y="190" width="60" height="28" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="80" y="208" text-anchor="middle" font-size="9">TX</text>
  <rect x="240" y="190" width="60" height="28" fill="#e8f5e9" stroke="#2e7d32" rx="3"/>
  <text x="270" y="208" text-anchor="middle" font-size="9">RX</text>
  <line x1="110" y1="198" x2="240" y2="198" stroke="#00695c" stroke-width="1.5"/>
  <text x="175" y="194" text-anchor="middle" font-size="8" fill="#00695c">TX → RX</text>
  <line x1="240" y1="210" x2="110" y2="210" stroke="#00695c" stroke-width="1.5"/>
  <text x="175" y="224" text-anchor="middle" font-size="8" fill="#00695c">RX → TX (no clock)</text>
  <!-- CAN -->
  <rect x="360" y="160" width="310" height="80" fill="#fff" stroke="#333" rx="4"/>
  <text x="515" y="177" text-anchor="middle" font-size="11" font-weight="bold" fill="#bf360c">CAN (2-wire differential, multi-master)</text>
  <rect x="380" y="190" width="50" height="28" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="405" y="208" text-anchor="middle" font-size="9">Node 1</text>
  <rect x="530" y="190" width="50" height="28" fill="#e8f5e9" stroke="#2e7d32" rx="3"/>
  <text x="555" y="208" text-anchor="middle" font-size="9">Node 2</text>
  <line x1="430" y1="198" x2="640" y2="198" stroke="#bf360c" stroke-width="1.5"/>
  <text x="535" y="194" text-anchor="middle" font-size="8" fill="#bf360c">CAN_H</text>
  <line x1="430" y1="210" x2="640" y2="210" stroke="#bf360c" stroke-width="1.5"/>
  <text x="535" y="224" text-anchor="middle" font-size="8" fill="#bf360c">CAN_L (differential, 85 Ω)</text>
  <!-- Legend -->
  <text x="350" y="270" text-anchor="middle" font-size="10" fill="#555">SPI: dedicated CS per slave · I²C: address-based, open-drain · UART: no clock, agreed baud rate · CAN: differential, bit-wise arbitration</text>
</svg>

**Example.** A microcontroller reads a temperature sensor over I²C at 400 kHz (fast mode). The sensor's 7-bit address is 0x48. The master sends START, the address byte (0x91 for read: 0x48 << 1 | 1), then reads 2 bytes of data.

SPI is faster (up to 100 MHz) but requires a dedicated CS line per slave. I²C is slower but supports many slaves on two wires. UART is the simplest: no clock, no address, just a baud rate agreed upon by both sides. CAN is designed for automotive use: its differential signalling (CAN_H, CAN_L) and non-destructive bit-wise arbitration make it robust to EMI in a car's electrical environment.

<details><summary>Example problem</summary>

An I²C bus has 4 devices with addresses 0x50, 0x51, 0x60, 0x61. The master wants to read from 0x60. How many bits does the master transmit before the first data byte arrives?

<details><summary>Solution</summary>

The master transmits: START (1 bit) + address byte 0xC1 (8 bits, 0x60 << 1 | 1 for read) + ACK (1 bit) = 10 bits. Then the slave sends the first data byte. So 10 bits of master transmission precede the first data byte.

</details>

</details>

</details>

Finally, as the industry moves toward chiplet-based designs, the interconnect boundary shifts from the PCB to the package itself, giving rise to die-to-die links.

## Die-to-die and chiplet links (UCIe)

**Definition.** UCIe (Universal Chiplet Interconnect Express) is an open standard for die-to-die interconnects within a package. It specifies up to 32 GT/s per lane over microbumps (short-range, < 1.5 mm) or TSVs (standard-range, 1.5–50 mm), with a protocol layer compatible with CXL and PCIe.

<details><summary>Details</summary>

The chiplet revolution (AMD EPYC 2017, Intel 2023) made die-to-die links a major design concern. UCIe 1.1 (2023) standardises the physical and protocol layers so that chiplets from different vendors can be mixed in a package.

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;width:100%;font-family:sans-serif;">
  <rect x="10" y="10" width="680" height="260" fill="#f9f9f9" stroke="#ccc" rx="6"/>
  <text x="350" y="32" text-anchor="middle" font-size="13" font-weight="bold">UCIe package cross-section: microbumps and TSVs</text>
  <!-- Substrate -->
  <rect x="50" y="200" width="600" height="40" fill="#ffcc80" stroke="#e65100" rx="2"/>
  <text x="350" y="225" text-anchor="middle" font-size="11" fill="#e65100">Organic substrate (PCB)</text>
  <!-- Die A (left) -->
  <rect x="100" y="100" width="200" height="100" fill="#90caf9" stroke="#1565c0" rx="3"/>
  <text x="200" y="155" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565c0">Chiplet A</text>
  <text x="200" y="172" text-anchor="middle" font-size="10" fill="#333">(e.g., CPU compute)</text>
  <!-- Die B (right) -->
  <rect x="400" y="100" width="200" height="100" fill="#a5d6a7" stroke="#2e7d32" rx="3"/>
  <text x="500" y="155" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">Chiplet B</text>
  <text x="500" y="172" text-anchor="middle" font-size="10" fill="#333">(e.g., I/O / memory)</text>
  <!-- Microbumps between dies -->
  <g>
    <circle cx="310" cy="140" r="4" fill="#f44336"/>
    <circle cx="325" cy="140" r="4" fill="#f44336"/>
    <circle cx="340" cy="140" r="4" fill="#f44336"/>
    <circle cx="355" cy="140" r="4" fill="#f44336"/>
    <circle cx="370" cy="140" r="4" fill="#f44336"/>
    <circle cx="310" cy="160" r="4" fill="#f44336"/>
    <circle cx="325" cy="160" r="4" fill="#f44336"/>
    <circle cx="340" cy="160" r="4" fill="#f44336"/>
    <circle cx="355" cy="160" r="4" fill="#f44336"/>
    <circle cx="370" cy="160" r="4" fill="#f44336"/>
  </g>
  <text x="340" y="130" text-anchor="middle" font-size="9" fill="#f44336">Microbumps</text>
  <text x="340" y="185" text-anchor="middle" font-size="9" fill="#555">short-range: &lt; 1.5 mm</text>
  <!-- TSVs in Die A -->
  <g>
    <rect x="130" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
    <rect x="160" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
    <rect x="190" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
    <rect x="220" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
    <rect x="250" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
  </g>
  <text x="190" y="95" text-anchor="middle" font-size="9" fill="#ff9800">TSVs (through-silicon vias)</text>
  <!-- TSVs in Die B -->
  <g>
    <rect x="430" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
    <rect x="460" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
    <rect x="490" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
    <rect x="520" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
    <rect x="550" y="105" width="6" height="90" fill="#ff9800" opacity="0.7"/>
  </g>
  <!-- BGA balls to substrate -->
  <g>
    <circle cx="120" cy="205" r="3" fill="#616161"/>
    <circle cx="150" cy="205" r="3" fill="#616161"/>
    <circle cx="180" cy="205" r="3" fill="#616161"/>
    <circle cx="210" cy="205" r="3" fill="#616161"/>
    <circle cx="240" cy="205" r="3" fill="#616161"/>
    <circle cx="270" cy="205" r="3" fill="#616161"/>
    <circle cx="420" cy="205" r="3" fill="#616161"/>
    <circle cx="450" cy="205" r="3" fill="#616161"/>
    <circle cx="480" cy="205" r="3" fill="#616161"/>
    <circle cx="510" cy="205" r="3" fill="#616161"/>
    <circle cx="540" cy="205" r="3" fill="#616161"/>
    <circle cx="570" cy="205" r="3" fill="#616161"/>
  </g>
  <!-- Distance annotation -->
  <line x1="300" y1="250" x2="400" y2="250" stroke="#333" stroke-width="1" marker-start="url(#arrL)" marker-end="url(#arrR)"/>
  <text x="350" y="265" text-anchor="middle" font-size="10" fill="#333">1.5 – 50 mm (standard range, TSV)</text>
  <defs>
    <marker id="arrL" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><path d="M8,0 L0,3 L8,6 Z" fill="#333"/></marker>
    <marker id="arrR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker>
  </defs>
</svg>

**Example.** AMD EPYC 9004 (Genoa) has 12 CCDs linked via Infinity Fabric over organic substrate. Intel's 2023 Meteor Lake uses a tile-based design with compute, GPU, SoC, and I/O tiles linked by Foveros 3D packaging.

The engineering regime is intermediate: the distance (1–10 mm) is too long for on-chip RC-delay modelling but too short for full transmission-line design. The dominant concern is bump/TSV parasitics and package-level crosstalk.

See [Interconnect and packaging](../../Manufacturing/Electronics/Interconnect-and-packaging.md) for the fabrication side.

<details><summary>Example problem</summary>

A UCIe ×64 link operates at 32 GT/s per lane. What is the raw bandwidth in one direction? Compare it to a PCIe Gen 5 ×16 link.

<details><summary>Solution</summary>

UCIe ×64 at 32 GT/s: 64 × 32 Gb/s = 2048 Gb/s = 256 GB/s per direction. PCIe Gen 5 ×16 at 32 GT/s with 128b/130b encoding: 16 × 32 × 128/130 ≈ 503 Gb/s ≈ 62.9 GB/s per direction. UCIe delivers roughly 4× the bandwidth of a PCIe Gen 5 ×16 link, which is why chiplet-to-chiplet communication can sustain memory-bandwidth-class data rates within a package.

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

A system has a CPU connected to a GPU via PCIe Gen 5 ×16 and to a NVMe SSD via PCIe Gen 4 ×4. The GPU wants to read a 1 GB texture from the SSD. What is the minimum transfer time over PCIe (ignoring protocol overhead)?

<details><summary>Solution</summary>

The SSD is connected via PCIe Gen 4 ×4: 4 × 16 GT/s × 128/130 ≈ 62.8 Gb/s ≈ 7.85 GB/s. To transfer 1 GB: 1 / 7.85 ≈ 127 ms. (The GPU's PCIe Gen 5 ×16 link is faster, so the SSD's link is the bottleneck.)

</details>

</details>