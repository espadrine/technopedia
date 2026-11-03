# Thunderbolt

Thunderbolt is a cabled expansion interface that tunnels [PCIe](./Board-level-interconnects.md) and [DisplayPort](./DisplayPort-and-HDMI.md) over one cable. Its defining idea is that a dock should not translate protocols: it should carry the computer's *native* buses to the outside world. It is the docking-and-expansion member of the [cabled external interconnect](./Cabled-external-interconnects.md) family. Thunderbolt 5 (spec finalised 2024) provides 80 Gb/s in each direction simultaneously (full duplex), with a 120 Gb/s asymmetric "Bandwidth Boost" for video-heavy setups, using PAM3 signalling.

> **Authoritative sources**
> - [Thunderbolt™ technology documents (Intel)](https://www.intel.com/content/www/us/en/collections/technology/thunderbolt-technology.html)
> - [Thunderbolt 5 Technology Brief (Intel, 2023)](https://www.thunderbolttechnology.net/sites/default/files/Thunderbolt_5_TechBrief_2023_09_12.pdf)
> - [USB4® Specification v2.0 (USB-IF)](https://usb.org/document-library/usb4r-specification-v20)

## The tunnel architecture

**Definition.** A Thunderbolt link is a packet-switched fabric. Thunderbolt 1/2 used four lanes organised as two independent full-duplex 10 Gb/s channels; Thunderbolt 3/4/5 use two differential lane pairs per direction (one pair each way). Everything else — PCIe transactions, DisplayPort video, [USB](./USB.md) 3 traffic — is wrapped in small packets ("tunnels") and multiplexed over those lanes.

<details><summary>Details: why tunneling instead of translation</summary>

A dock has three jobs: displays, USB devices, and (sometimes) a network or storage adapter. The naive design translates each protocol at the dock — a USB hub chip, a display scaler, a NIC. Thunderbolt instead says: the computer already has PCIe and DisplayPort *inside*; just carry them out.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 340" style="width:100%;max-width:900px;background:#fafcff;border:1px solid #ccd;border-radius:8px">
  <defs>
    <marker id="ab" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1565c0"/></marker>
    <marker id="ag" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#2e7d32"/></marker>
    <marker id="ao" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#e65100"/></marker>
  </defs>
  <text x="450" y="24" text-anchor="middle" font-size="16" font-weight="bold" fill="#223">Tunnels: native buses carried as packets over one cable</text>
  <rect x="20" y="45" width="330" height="270" rx="10" fill="#eef3fb" stroke="#8899bb"/>
  <text x="185" y="68" text-anchor="middle" font-size="14" font-weight="bold" fill="#334">Host (laptop)</text>
  <rect x="40" y="85" width="130" height="46" rx="6" fill="#dbe7f7" stroke="#1565c0"/>
  <text x="105" y="104" text-anchor="middle" font-size="12" fill="#123">GPU</text>
  <text x="105" y="120" text-anchor="middle" font-size="10" fill="#456">PCIe endpoint</text>
  <rect x="40" y="150" width="130" height="46" rx="6" fill="#ddf0dd" stroke="#2e7d32"/>
  <text x="105" y="169" text-anchor="middle" font-size="12" fill="#123">Display engine</text>
  <text x="105" y="185" text-anchor="middle" font-size="10" fill="#456">DisplayPort source</text>
  <rect x="40" y="215" width="130" height="46" rx="6" fill="#fdeada" stroke="#e65100"/>
  <text x="105" y="234" text-anchor="middle" font-size="12" fill="#123">xHCI controller</text>
  <text x="105" y="250" text-anchor="middle" font-size="10" fill="#456">USB 3 host</text>
  <rect x="205" y="120" width="120" height="120" rx="8" fill="#fff" stroke="#556" stroke-width="2"/>
  <text x="265" y="165" text-anchor="middle" font-size="12" font-weight="bold" fill="#223">Thunderbolt</text>
  <text x="265" y="182" text-anchor="middle" font-size="12" font-weight="bold" fill="#223">host router</text>
  <text x="265" y="205" text-anchor="middle" font-size="10" fill="#567">packetises + muxes</text>
  <text x="265" y="220" text-anchor="middle" font-size="10" fill="#567">all tunnels</text>
  <line x1="170" y1="108" x2="205" y2="150" stroke="#1565c0" stroke-width="2.5" marker-end="url(#ab)"/>
  <line x1="170" y1="173" x2="205" y2="178" stroke="#2e7d32" stroke-width="2.5" marker-end="url(#ag)"/>
  <line x1="170" y1="238" x2="205" y2="208" stroke="#e65100" stroke-width="2.5" marker-end="url(#ao)"/>
  <rect x="375" y="150" width="150" height="60" rx="8" fill="#fffbe6" stroke="#bba13a"/>
  <text x="450" y="174" text-anchor="middle" font-size="11" fill="#554">USB-C cable</text>
  <text x="450" y="192" text-anchor="middle" font-size="10" fill="#775">2 lane pairs per direction</text>
  <line x1="325" y1="170" x2="375" y2="172" stroke="#556" stroke-width="3"/>
  <line x1="525" y1="172" x2="575" y2="172" stroke="#556" stroke-width="3"/>
  <text x="450" y="232" text-anchor="middle" font-size="10" fill="#886">PCIe + DP + USB3 packets interleaved</text>
  <rect x="575" y="45" width="305" height="270" rx="10" fill="#f4f1ec" stroke="#998877"/>
  <text x="727" y="68" text-anchor="middle" font-size="14" font-weight="bold" fill="#334">Dock / enclosure</text>
  <rect x="595" y="120" width="120" height="120" rx="8" fill="#fff" stroke="#556" stroke-width="2"/>
  <text x="655" y="165" text-anchor="middle" font-size="12" font-weight="bold" fill="#223">Thunderbolt</text>
  <text x="655" y="182" text-anchor="middle" font-size="12" font-weight="bold" fill="#223">device router</text>
  <text x="655" y="205" text-anchor="middle" font-size="10" fill="#567">unpacks tunnels,</text>
  <text x="655" y="220" text-anchor="middle" font-size="10" fill="#567">re-forwards the rest</text>
  <rect x="740" y="85" width="125" height="46" rx="6" fill="#dbe7f7" stroke="#1565c0"/>
  <text x="802" y="104" text-anchor="middle" font-size="12" fill="#123">NVMe slot</text>
  <text x="802" y="120" text-anchor="middle" font-size="10" fill="#456">real PCIe device</text>
  <rect x="740" y="150" width="125" height="46" rx="6" fill="#ddf0dd" stroke="#2e7d32"/>
  <text x="802" y="169" text-anchor="middle" font-size="12" fill="#123">Monitor</text>
  <text x="802" y="185" text-anchor="middle" font-size="10" fill="#456">real DP sink</text>
  <rect x="740" y="215" width="125" height="46" rx="6" fill="#fdeada" stroke="#e65100"/>
  <text x="802" y="234" text-anchor="middle" font-size="12" fill="#123">USB hub</text>
  <text x="802" y="250" text-anchor="middle" font-size="10" fill="#456">behind host xHCI</text>
  <line x1="715" y1="150" x2="740" y2="112" stroke="#1565c0" stroke-width="2.5" marker-end="url(#ab)"/>
  <line x1="715" y1="178" x2="740" y2="174" stroke="#2e7d32" stroke-width="2.5" marker-end="url(#ag)"/>
  <line x1="715" y1="208" x2="740" y2="236" stroke="#e65100" stroke-width="2.5" marker-end="url(#ao)"/>
  <text x="450" y="300" text-anchor="middle" font-size="11" fill="#556">Blue = PCIe tunnel · Green = DisplayPort tunnel · Orange = USB 3 tunnel — one fabric, three protocols</text>
</svg>

- A GPU in an enclosure is a real PCIe device: the host's root complex enumerates it across the cable as if it were on the motherboard — the same [board-level PCIe](./Board-level-interconnects.md) transactions, just packetised.
- A monitor is a real DisplayPort sink: the GPU drives it directly, with no scaler in between (see [DisplayPort and HDMI](./DisplayPort-and-HDMI.md)).
- A USB hub in the dock is a real USB 3 device behind the host's xHCI controller (see [USB](./USB.md)).

The cost is that every device in the chain must understand the tunnel protocol, and the cable must be a *switch fabric*, not a wire. The benefit is that a dock adds capabilities the host never had to be designed for — which is why a 2015 laptop can drive a 2024 dock.

<details><summary>Example problem: the eGPU bandwidth budget</summary>

An eGPU enclosure is plugged into a Thunderbolt 4 host (40 Gb/s per direction, 32 Gb/s of it guaranteed for PCIe). The GPU uploads texture and geometry data from the host at 8 Gb/s, renders to the laptop's internal 4K60 display — whose 12.5 Gb/s framebuffer stream must travel back across the cable — and also drives an external 4K60 monitor plugged directly into the enclosure. Does each direction of the cable fit?

<details><summary>Solution</summary>

Downstream (host → GPU): the 8 Gb/s of texture uploads. The external monitor's video never crosses the cable — it is generated *inside* the enclosure and exits through the enclosure's own DisplayPort connector. Upstream (GPU → host): the 12.5 Gb/s internal-display framebuffer. Both directions fit easily: 8 < 40 and 12.5 < 40, and the PCIe portion (8 + 12.5 = 20.5 Gb/s) is under the guaranteed 32 Gb/s. The instructive part is *where* the traffic flows: an eGPU is cheap on cable bandwidth precisely because the heaviest stream it produces (the external monitor's pixels) never touches the cable — only the internal display's copy-back does. That is the opposite of a dock, where the displays are the main cable load.

</details>

</details>

</details>

## Topology: the daisy chain

**Definition.** Thunderbolt devices chain, up to 6 devices from a single host port. Every device's controller is a small *switch*: it consumes the packets addressed to it and re-forwards all other traffic to the next device downstream. Bandwidth is therefore budgeted **per segment**, not per cable.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" style="width:100%;max-width:900px;background:#fafcff;border:1px solid #ccd;border-radius:8px">
  <text x="450" y="26" text-anchor="middle" font-size="16" font-weight="bold" fill="#223">Daisy chain: each device re-forwards what it does not consume</text>
  <rect x="20" y="80" width="130" height="70" rx="8" fill="#eef3fb" stroke="#8899bb"/>
  <text x="85" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#223">Host</text>
  <text x="85" y="130" text-anchor="middle" font-size="10" fill="#556">TB controller</text>
  <rect x="250" y="80" width="160" height="70" rx="8" fill="#f4f1ec" stroke="#998877"/>
  <text x="330" y="105" text-anchor="middle" font-size="13" font-weight="bold" fill="#223">NVMe enclosure</text>
  <text x="330" y="125" text-anchor="middle" font-size="10" fill="#556">consumes PCIe packets,</text>
  <text x="330" y="139" text-anchor="middle" font-size="10" fill="#556">forwards DP packets</text>
  <rect x="510" y="80" width="160" height="70" rx="8" fill="#f4f1ec" stroke="#998877"/>
  <text x="590" y="105" text-anchor="middle" font-size="13" font-weight="bold" fill="#223">Dock</text>
  <text x="590" y="125" text-anchor="middle" font-size="10" fill="#556">consumes DP + USB3,</text>
  <text x="590" y="139" text-anchor="middle" font-size="10" fill="#556">end of chain</text>
  <rect x="740" y="80" width="140" height="70" rx="8" fill="#ddf0dd" stroke="#2e7d32"/>
  <text x="810" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#223">4K monitor</text>
  <text x="810" y="130" text-anchor="middle" font-size="10" fill="#556">DP sink</text>
  <line x1="150" y1="115" x2="250" y2="115" stroke="#556" stroke-width="3"/>
  <line x1="410" y1="115" x2="510" y2="115" stroke="#556" stroke-width="3"/>
  <line x1="670" y1="115" x2="740" y2="115" stroke="#556" stroke-width="3"/>
  <text x="200" y="100" text-anchor="middle" font-size="10" fill="#a33" font-weight="bold">segment 1</text>
  <text x="460" y="100" text-anchor="middle" font-size="10" fill="#a33" font-weight="bold">segment 2</text>
  <text x="705" y="100" text-anchor="middle" font-size="10" fill="#a33" font-weight="bold">segment 3</text>
  <text x="200" y="160" text-anchor="middle" font-size="10" fill="#456">SSD + video + USB</text>
  <text x="460" y="160" text-anchor="middle" font-size="10" fill="#456">video + USB</text>
  <text x="705" y="160" text-anchor="middle" font-size="10" fill="#456">video only</text>
  <text x="450" y="210" text-anchor="middle" font-size="11" fill="#556">The segment nearest the host carries the sum of all downstream traffic — it fills up first.</text>
</svg>

<details><summary>Details: why per-segment budgeting matters</summary>

A point-to-point link like [SATA](./SATA.md) or [Ethernet over copper](./Ethernet-copper.md) has exactly one load: the traffic of the device at the other end. A Thunderbolt chain has one load *per segment*, and the segments are not independent — every packet destined for device 3 also occupies segments 1 and 2. Two consequences:

1. **Placement matters.** What matters is the *sum* of traffic on each segment, and the segment nearest the host always carries the largest sum.
2. **A slow device does not slow the chain's rate, only its budget.** The link still runs at full speed; the packets simply share it.

<details><summary>Example problem</summary>

On the chain above (Thunderbolt 4, 40 Gb/s per direction), the SSD reads at 2 GB/s, the monitor needs 12.5 Gb/s of video, and USB devices behind the dock carry 4 Gb/s downstream. What is the load on segment 1, and does it fit?

<details><summary>Solution</summary>

Segment 1 carries everything: downstream = 12.5 Gb/s video + 4 Gb/s USB = 16.5 Gb/s; upstream = 16 Gb/s (the SSD read, 2 GB/s = 16 Gb/s). Both fit under 40 Gb/s. Note that the SSD read does *not* count against downstream — full duplex budgets each direction separately. Had the SSD been behind the dock instead, its read traffic would also have occupied segment 2: placement changes which segments are stressed, never the total.

</details>

</details>

</details>

## Generations

**Definition.** Five generations since 2011, all speaking the same tunnel protocol; each step raised the per-direction rate or tightened the guarantees, while keeping backward compatibility through the USB-C or mini-DisplayPort connector.

<table>
<tr><th>Generation</th><th>Year</th><th>Rate per direction</th><th>Signalling</th><th>Notable</th></tr>
<tr><td>Thunderbolt 1</td><td>2011</td><td>10 Gb/s (2 × 5)</td><td>NRZ, optical or copper</td><td>First PCIe+DP tunnel; mini DisplayPort connector</td></tr>
<tr><td>Thunderbolt 2</td><td>2013</td><td>20 Gb/s (aggregated)</td><td>NRZ</td><td>Channel aggregation for 4K video</td></tr>
<tr><td>Thunderbolt 3</td><td>2015</td><td>40 Gb/s</td><td>NRZ over USB-C</td><td>Adopted the USB-C connector; 15 W charging</td></tr>
<tr><td>Thunderbolt 4</td><td>2020</td><td>40 Gb/s</td><td>NRZ</td><td>Same rate, stricter contract: ≥ 32 Gb/s PCIe, dual 4K or one 8K display, 100 W charging on at least one port, wake-from-sleep, 2 m passive cables</td></tr>
<tr><td>Thunderbolt 5</td><td>2024</td><td>80 Gb/s (120 asymmetric)</td><td>PAM3, 25.6 GBd</td><td>64 Gb/s of PCIe — 2× Thunderbolt 4's 32 Gb/s; 240 W PD; Bandwidth Boost to 120 Gb/s for display-heavy setups</td></tr>
</table>

<details><summary>Details: PAM3 and the 25.6 GBd number</summary>

Thunderbolt 5's PHY is *specified* at 25.6 GBaud per lane with PAM3 (3-level pulse-amplitude modulation); the data rate is derived from that symbol rate, not the other way around. Each PAM3 symbol carries log₂ 3 ≈ 1.585 bits, so the raw line rate is 25.6 × 1.585 ≈ 40.6 Gb/s per lane. Framing cannot use a fractional number of bits per symbol, so the spec maps blocks of 11 bits onto 7 trits (since 3⁷ = 2187 ≥ 2¹¹ = 2048), giving 25.6 × 11/7 ≈ 40.2 Gb/s of payload per lane — over two lanes, ≈ 80 Gb/s per direction.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 200" style="width:100%;max-width:900px;background:#fafcff;border:1px solid #ccd;border-radius:8px">
  <text x="450" y="24" text-anchor="middle" font-size="15" font-weight="bold" fill="#223">NRZ (2 levels) vs PAM3 (3 levels) at the same symbol rate</text>
  <line x1="60" y1="150" x2="400" y2="150" stroke="#99a" stroke-width="1"/>
  <text x="60" y="172" font-size="11" fill="#556">NRZ, 20 GBd → 20 Gb/s per lane</text>
  <polyline points="60,70 110,70 110,130 160,130 160,70 210,70 210,130 260,130 260,70 310,70 310,130 360,130 360,70 400,70" fill="none" stroke="#1565c0" stroke-width="3"/>
  <line x1="60" y1="70" x2="400" y2="70" stroke="#ccd" stroke-width="1" stroke-dasharray="4 4"/>
  <text x="410" y="74" font-size="10" fill="#1565c0">1</text>
  <text x="410" y="134" font-size="10" fill="#1565c0">0</text>
  <line x1="520" y1="150" x2="860" y2="150" stroke="#99a" stroke-width="1"/>
  <text x="520" y="172" font-size="11" fill="#556">PAM3, 25.6 GBd → ≈ 40 Gb/s per lane</text>
  <polyline points="520,55 570,55 570,100 620,100 620,145 670,145 670,55 720,55 720,100 770,100 770,145 820,145 820,55 860,55" fill="none" stroke="#2e7d32" stroke-width="3"/>
  <line x1="520" y1="55" x2="860" y2="55" stroke="#ccd" stroke-width="1" stroke-dasharray="4 4"/>
  <line x1="520" y1="145" x2="860" y2="145" stroke="#ccd" stroke-width="1" stroke-dasharray="4 4"/>
  <text x="866" y="59" font-size="10" fill="#2e7d32">+1</text>
  <text x="866" y="104" font-size="10" fill="#2e7d32">0</text>
  <text x="866" y="149" font-size="10" fill="#2e7d32">−1</text>
</svg>

PAM3 trades SNR margin for symbol rate: three levels squeezed into the same voltage swing shrink the eye, so the PHY needs stronger equalisation and forward error correction — the same trade 10GBASE-T made with PAM16, but far gentler, because a 1 m cable has far less attenuation than 100 m of twisted pair. The general rule is Shannon's: for a fixed channel, bits per second are bought either with bandwidth (symbol rate) or with SNR (levels) — see [Communication](../../Information-Theory/Communication.md).

<details><summary>Example problem</summary>

Why not keep NRZ and simply double the symbol rate to 51.2 GBd to reach the same 40 Gb/s per lane?

<details><summary>Solution</summary>

Because the cable, not the silicon, is the constraint. A 51.2 GBd NRZ signal has its fundamental energy near 25.6 GHz, where a 2 m passive copper cable's insertion loss is severe — the eye would close before any receiver could open it. PAM3 at 25.6 GBd needs only ~12.8 GHz of bandwidth, at the price of 10·log₁₀(3) ≈ 4.8 dB less SNR margin, which short-reach equalisation and FEC can recover. Halving the required bandwidth to buy 4.8 dB of SNR is exactly the right trade on a short, lossy copper channel — and it is the same reasoning that made [Ethernet over copper](./Ethernet-copper.md) adopt PAM4/PAM16 at long reach.

</details>

</details>

</details>

## Power delivery

**Definition.** Thunderbolt carries DC power on the same USB-C connector, on wires separate from the high-speed pairs, following the [USB Power Delivery](./USB.md) standard: 15 W mandatory at the Thunderbolt 3 launch, 100 W (20 V × 5 A) with Thunderbolt 4, and 240 W (48 V × 5 A, USB PD 3.1 "Extended Power Range") with Thunderbolt 5.

<details><summary>Details: why power grew 16×</summary>

The tunnel architecture created a new class of device — the bus-powered dock — whose capability is set by its wattage. 15 W runs a hub and an SSD; 100 W runs a dock *and* charges the laptop through it; 240 W charges gaming laptops through the same cable that carries the display. Raising power meant raising voltage (48 V) rather than only current, because cable heating is I²R: at 240 W, 5 A at 48 V dissipates 16× less heat in the cable than 20 A at 12 V. The trade-off is connector safety: 48 V sits at the edge of the SELV (safety extra-low voltage) domain, which is why EPR cables are e-marked and explicitly rated.

</details>

## Security

**Definition.** Because Thunderbolt tunnels raw PCIe, a plugged-in device can issue DMA (direct memory access) — read and write system RAM without the CPU — which turns an untrusted cable into a memory-disclosure attack. Thunderbolt 3 and later mitigate this with a user-approved firmware-based connection manager, and hosts pair it with Kernel DMA Protection (the IOMMU blocks DMA from devices until the OS has authorised them).

<details><summary>Details: the trust problem tunnelling creates</summary>

A [USB](./USB.md) device can only ask the OS for data through a driver; a tunnelled PCIe device talks to memory *directly*, at hardware speed, below every OS check. This is the same power that makes an eGPU possible — it is the attack surface too ("Thunderclap"-class attacks, 2019). The defences are layered:

1. **Connection manager (firmware).** The host's Thunderbolt controller does not enumerate a new device until the user approves it (or a previously-approved device is recognised); "display-only" devices can be allowed without full trust.
2. **Kernel DMA Protection / IOMMU.** Even an approved device is confined: the IOMMU maps only the memory regions the OS explicitly grants, so a malicious or compromised device cannot scan RAM.
3. **Per-device secure connect.** One-time approval per device identity, so the approval prompt does not train users to click "always allow".

The first-principles lesson: tunnelling a *trusted, internal* bus to the *outside* moves a trust boundary across the cable, and the security model must be rebuilt at the new boundary.

</details>

## USB4 vs. Thunderbolt

**Definition.** USB4 (2019) adopted Thunderbolt 3's tunnel architecture as a standard; the difference is what is *guaranteed*. USB4 makes PCIe tunneling optional; Thunderbolt requires it. Thunderbolt 4/5 additionally guarantee minimum PCIe bandwidth (32 Gb/s / 64 Gb/s), 2 m passive cables, and dual-4K display support.

<details><summary>Details</summary>

Practically: a USB4-only host may refuse to enumerate an eGPU (no PCIe tunneling), while a Thunderbolt host must. A USB4 dock may give you USB 3 ports and a display but a slow storage path; a Thunderbolt 4 dock must give you at least 32 Gb/s of PCIe. The logos are not just branding — they are different *contracts* over the same physical cable.

<table>
<tr><th>Guarantee</th><th>USB4</th><th>Thunderbolt 4</th><th>Thunderbolt 5</th></tr>
<tr><td>PCIe tunneling</td><td>Optional</td><td>Required</td><td>Required</td></tr>
<tr><td>Minimum PCIe bandwidth</td><td>None</td><td>32 Gb/s</td><td>64 Gb/s (80 Gb/s link)</td></tr>
<tr><td>Displays</td><td>One (via DP tunnel)</td><td>Dual 4K or one 8K</td><td>Dual 4K or one 8K (more with Bandwidth Boost)</td></tr>
<tr><td>Charging</td><td>Per USB PD</td><td>100 W on at least one port</td><td>Up to 240 W</td></tr>
<tr><td>2 m passive cable</td><td>Not required</td><td>Required</td><td>Required</td></tr>
</table>

<details><summary>Example problem</summary>

You plug an NVMe SSD enclosure, an eGPU, and a monitor into a host whose port is USB4-only (no PCIe tunneling support). What works, and at what speed?

<details><summary>Solution</summary>

The monitor works: USB4 mandates the DisplayPort tunnel. The SSD enclosure works, but not as a PCIe/NVMe device — it falls back to its USB 3 "bridge" mode, capped by the USB 3 tunnel (typically 10–20 Gb/s instead of the ~32 Gb/s a Thunderbolt PCIe tunnel provides). The eGPU does not work at all: without a PCIe tunnel there is no way to enumerate it. This is exactly the contract difference: same cable, same connectors, different guarantees.

</details>

</details>

</details>

## Interactive: the per-segment bandwidth budget

Both worked examples above reduce to one exercise: add up the traffic on each segment, in each direction, and compare with the link rate. Try it — note how the segment nearest the host always carries the most, and how DSC changes the displays' share.

<iframe src="./Thunderbolt.simulation.html" title="Per-segment, per-direction Thunderbolt bandwidth budget simulator" style="width:100%;height:660px;border:1px solid #ccc;border-radius:8px"></iframe>

## Quiz

<details><summary>Example problem</summary>

A Thunderbolt 3 (40 Gb/s per direction) chain is wired host → NVMe drive enclosure → 4K60 monitor. The drive reads at 2 GB/s and the monitor needs 12.5 Gb/s of video. Does the segment between the host and the drive enclosure have enough downstream capacity?

<details><summary>Solution</summary>

The segment between host and drive carries *both* the drive traffic and the monitor's video (the video must pass through the drive enclosure's Thunderbolt controller to reach the monitor). Downstream demand: 2 GB/s = 16 Gb/s + 12.5 Gb/s = 28.5 Gb/s < 40 Gb/s. It fits, with ~11.5 Gb/s of headroom. If the drive wrote at 2 GB/s *and* the host read from it simultaneously, the full-duplex link would still cope, since each direction is budgeted separately. A second 4K60 display would push downstream demand to 41 Gb/s and start dropping frames — *if the displays ran uncompressed*. With DisplayPort's DSC (visually lossless compression, see [DisplayPort and HDMI](./DisplayPort-and-HDMI.md)), each 4K60 stream shrinks to roughly a third (~4 Gb/s), and both displays plus the SSD fit comfortably.

</details>

</details>
