# Cabled external interconnects

Cabled external interconnects are detachable copper cable assemblies that connect separate devices: a laptop to a dock, a server to a switch, a console to a TV, a motherboard to a drive. They are relevant whenever two independent, separately-powered devices must exchange data over a link a user can plug and unplug — which means the cable must also solve problems board traces never face: **hot-plug** (the link comes up live, without resetting either end), **EMI compliance** (the cable is an antenna, and regulators limit what it may radiate), **power delivery** (the cable often carries watts alongside bits), and **length** (metres, not centimetres, so conductor loss accumulates).

Each family below solves a different *job*:

- **USB** solves *peripherals*: one host enumerating a tree of keyboards, cameras, and drives.
- **Thunderbolt** solves *docking and expansion*: collapsing PCIe, display, and USB into one cable.
- **Ethernet over copper** solves *peer local networking*: symmetric links between equals, up to 100 m.
- **SATA** solves *storage*: a simple host-to-drive block pipe.
- **HDMI / DisplayPort** solve *display*: a one-way, low-latency video stream to a sink.

They all ride the same physics — differential signalling over twisted, shielded copper — and they all hit the same wall: attenuation that grows with frequency and length ([Electromagnetism](../../../Physics/Interactions/Electromagnetism/Readme.md)). The sections below go from the most familiar job (peripherals) to the most specialised (display), then step back to the shared physics that sets every "max cable length" number you have ever read on a box.

> **Authoritative sources**
> - [USB4® Specification v2.0 (USB-IF)](https://usb.org/document-library/usb4r-specification-v20)
> - [Thunderbolt™ technology documents (Intel)](https://www.intel.com/content/www/us/en/collections/technology/thunderbolt-technology.html)
> - [IEEE 802.3 (Ethernet)](https://standards.ieee.org/standard/802_3-2022.html)
> - [IEEE 802.3bq (25GBASE-T / 40GBASE-T)](https://standards.ieee.org/ieee/802.3bq/6906/)
> - [SATA specification (SATA-IO)](https://sata-io.org/)
> - [VESA DisplayPort standards](https://www.vesa.org/vesa-standards/)
> - [HDMI specification (HDMI Licensing Administrator)](https://www.hdmi.org/spec21sub/specification)

## Brief history

1. **1960s–1987 — The legacy era.** [RS-232](https://standards.ieee.org/ieee/232/5940/) serial terminals and modems, then analog VGA video (1987), established the detachable cable as a product category: slow, unidirectional or point-to-point, with no negotiation — the user set the parameters by hand.
2. **1995–2003 — Hot-plug serial peripherals.** FireWire (IEEE 1394, 1995) and USB 1.0 (1996) replaced the tangle of parallel ports with hot-pluggable serial cables; USB's host-enumerated tree won on cost. SATA (2003) did the same inside the box, replacing the wide grey PATA ribbon.
3. **2002–2010 — Digital video and 10 Gb/s copper.** HDMI (2002) and DisplayPort (2006) digitised the display cable; 10GBASE-T (IEEE 802.3an, 2006) pushed twisted-pair copper to 10 Gb/s over 100 m using PAM16 modulation and heavy digital signal processing.
4. **2015–present — Convergence on USB-C.** Thunderbolt 3 (2015) tunnelled PCIe and DisplayPort over the USB-C connector; USB4 (2019) adopted that tunnel architecture as a standard; USB4 v2 (USB-IF, 2022) and Thunderbolt 5 (spec finalised 2024) doubled it again to 80 Gb/s per direction using PAM3 signalling. One cable type now covers peripherals, docks, displays, and networking.

## Categorisation

The five classes are separated by the **fundamental job and topology** of the link — who talks to whom, and in what pattern. That axis is more fundamental than connector shape or era: it determines the protocol (does a host enumerate? do peers contend? is the stream one-way?), and the protocol determines what the cable must carry.

<table>
<tr><th>Page</th><th>Job &amp; topology</th><th>Signalling &amp; medium</th><th>Max length</th><th>Line rate</th><th>Examples</th></tr>
<tr><td><a href="./USB.md">USB</a></td><td>Host–device peripheral tree; host enumerates up to 127 devices</td><td>Differential pairs, NRZ (≤20 Gb/s) or PAM3 (80 Gb/s); USB-C or legacy connectors</td><td>~2–5 m passive</td><td>1.5 Mb/s – 80 Gb/s</td><td>USB 1.0–3.2, USB4, USB-C PD</td></tr>
<tr><td><a href="./Thunderbolt.md">Thunderbolt</a></td><td>Expansion &amp; docking; tunnels PCIe + DisplayPort over one cable, daisy-chained</td><td>PAM3 differential pairs over the USB-C connector</td><td>0.8 m passive, ~3 m active</td><td>40–80 Gb/s per direction (120 Gb/s asymmetric)</td><td>Thunderbolt 3/4/5</td></tr>
<tr><td><a href="./Ethernet-copper.md">Ethernet (copper)</a></td><td>Peer LAN; switched star of equals</td><td>PAM5 / PAM16 (DSQ128) over 4 balanced twisted pairs</td><td>100 m (Cat 6a); 30 m (Cat 8, 25/40GBASE-T)</td><td>1–10 Gb/s; 25/40 Gb/s short reach</td><td>1000BASE-T, 10GBASE-T, 25GBASE-T</td></tr>
<tr><td><a href="./SATA.md">SATA</a></td><td>Storage block I/O; point-to-point host ↔ drive</td><td>One differential pair each way, 8b/10b coded</td><td>1 m</td><td>1.5 / 3 / 6 Gb/s</td><td>SATA 1.0–3.0, eSATA</td></tr>
<tr><td><a href="./DisplayPort-and-HDMI.md">DisplayPort &amp; HDMI</a></td><td>Display stream; one-way source → sink video + audio</td><td>TMDS (HDMI) or 8b/10b &amp; 128b/132b differential lanes (DisplayPort)</td><td>~3 m passive; 100 m active-optical</td><td>4.95–48 Gb/s (HDMI), 8.64–80 Gb/s (DP 2.1)</td><td>HDMI 1.0–2.1, DisplayPort 1.4/2.1, DVI</td></tr>
</table>

The boundary between these families and the [board-level interconnects](./Board-level-interconnects.md) they attach to is a packaging boundary, not a physics boundary: a USB4 host is internally a PCIe root complex whose lanes are re-timed onto a cable; a SATA drive is internally an NVMe-like flash controller fed by a SATA PHY. And when a run exceeds what copper can drive — a 300 m link between buildings — the job passes to [optical interconnects](./Optical-interconnects.md).

## The shared physics: why every cable has a length limit

**Definition.** A cable is a lossy transmission line: signal power decays exponentially with length, and the decay constant grows with frequency because of the **skin effect** — at high frequency, current crowds into a thin layer of depth $`\delta = \sqrt{2\rho/(\omega\mu)}` at the conductor surface, shrinking the effective cross-section and raising resistance as $`\sqrt{f}`.

<details><summary>Details</summary>

Drag the frequency slider: the shaded ring is where the current actually flows in a copper conductor of a twisted-pair cable (radius 250 µm, like a Cat 6a strand). Depth $`\delta` (copper) ≈ $`65.2/\sqrt{f_{\text{MHz}}}` µm.

<div id="skin-demo">
<canvas id="skin-canvas" width="560" height="300" style="max-width:100%;background:#fafafa;border:1px solid #ccc"></canvas>
<div>
  <label>Frequency: <span id="skin-f-label">100 MHz</span></label>
  <input type="range" id="skin-f" min="0" max="1000" value="500" style="width:320px">
</div>
<div id="skin-readout" style="font-family:monospace"></div>
</div>
<script>
(function(){
  var cv = document.getElementById('skin-canvas'), ctx = cv.getContext('2d');
  var slider = document.getElementById('skin-f');
  function fFromSlider(v){ return Math.pow(10, 5 + (v/1000)*5); } // 1e5 .. 1e10 Hz
  function fmt(f){ if(f>=1e9) return (f/1e9).toFixed(2)+' GHz'; if(f>=1e6) return (f/1e6).toFixed(1)+' MHz'; return (f/1e3).toFixed(0)+' kHz'; }
  function draw(){
    var f = fFromSlider(+slider.value);
    var dUm = 65.2/Math.sqrt(f/1e6);          // skin depth in µm
    var aUm = 250;                             // conductor radius, µm
    var scale = 220/aUm;                       // px per µm
    var cx = 170, cy = 150;
    ctx.clearRect(0,0,560,300);
    // conductor
    ctx.beginPath(); ctx.arc(cx,cy,aUm*scale,0,7); ctx.fillStyle='#d9a066'; ctx.fill();
    // current-carrying annulus (depth delta, clipped to radius)
    var dPx = Math.min(dUm*scale, aUm*scale);
    ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,aUm*scale,0,7); ctx.clip();
    ctx.beginPath(); ctx.arc(cx,cy,aUm*scale,0,7); ctx.fillStyle='#ffd24d'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx,cy,aUm*scale-dPx,0,7); ctx.fillStyle='#d9a066'; ctx.fill();
    ctx.restore();
    ctx.beginPath(); ctx.arc(cx,cy,aUm*scale,0,7); ctx.strokeStyle='#7a4a1d'; ctx.stroke();
    if(dPx < aUm*scale){ ctx.beginPath(); ctx.arc(cx,cy,aUm*scale-dPx,0,7); ctx.setLineDash([4,4]); ctx.strokeStyle='#b8860b'; ctx.stroke(); ctx.setLineDash([]); }
    // labels
    ctx.fillStyle='#222'; ctx.font='13px sans-serif';
    ctx.fillText('conductor cross-section (Cu, r = 250 µm)', 20, 24);
    ctx.fillStyle='#8a5a00'; ctx.fillText('current flows here (depth δ)', 300, 90);
    // AC resistance ratio (a >> δ regime): Rac/Rdc ≈ a/(2δ)
    var ratio = dUm < aUm/3 ? (aUm/(2*dUm)) : Math.max(1, (aUm*aUm)/(2*aUm*dUm - dUm*dUm));
    document.getElementById('skin-f-label').textContent = fmt(f);
    document.getElementById('skin-readout').innerHTML =
      'δ = ' + dUm.toFixed(2) + ' µm &nbsp;|&nbsp; used area ≈ ' +
      Math.min(100, (100*(2*aUm*dUm - dUm*dUm)/(aUm*aUm))).toFixed(1) + '% of conductor' +
      ' &nbsp;|&nbsp; R<sub>AC</sub>/R<sub>DC</sub> ≈ ' + (ratio<1.02?1.0:ratio.toFixed(1)) + '×';
  }
  slider.addEventListener('input', draw); draw();
})();
</script>

The consequence is exponential: attenuation in dB per metre grows roughly as $`\sqrt{f}` , so every generation that doubles the data rate either shortens the maximum cable, thickens the conductors, adds active re-timers, or encodes more bits per symbol (which needs more SNR — see [Communication](../../Information-Theory/Communication.md)). That single trade-off explains almost every number in the table below.

<details><summary>Example problem</summary>

A Cat 6a strand has radius 250 µm. At 400 MHz (the Nyquist bandwidth of one 10GBASE-T pair), what fraction of the conductor's cross-section carries current, and roughly how many times higher is the AC resistance than the DC resistance?

<details><summary>Solution</summary>

$`\delta = 65.2/\sqrt{400} \approx 3.3` µm. Since $`\delta \ll a` , current flows in a shell of area ≈ $`2\pi a\,\delta` , i.e. a fraction $`2\delta/a = 6.6/250 \approx 2.6\%` of the cross-section. The AC resistance is roughly $`a/(2\delta) \approx 38\times` the DC resistance — which is why a 100 m 10GBASE-T link needs DSP, crosstalk cancellation, and strong FEC to close.

</details>

</details>

</details>

### Bandwidth vs. cable length, interactively

The chart below compares the reach of the main cabled interfaces. Solid segments are passive copper (wire only); dashed segments need active electronics in the connector; dotted segments are fibre. Drag the length cursor to see which interfaces survive at that distance.

<iframe src="./Cabled-external-interconnects.simulation.html" title="Bandwidth vs cable length for USB4, Thunderbolt 5, 10GBASE-T, SATA and HDMI" style="width:100%;height:560px;border:1px solid #ccc"></iframe>

Notice the pattern: **rate and reach trade off**. SATA trades reach (1 m) for simplicity and cost; 10GBASE-T trades silicon complexity (PAM16, precoding, LDPC) for 100 m; USB4/Thunderbolt buy 80 Gb/s by accepting sub-metre passive cables and re-timers beyond that.

## USB (peripherals)

**Definition.** [USB](./USB.md) is a hot-pluggable, host-enumerated serial bus: one host polls a tree of up to 127 devices. USB4 v2 (2022) carries 80 Gb/s per direction over USB-C using PAM3, and tunnels USB 3, DisplayPort, and (optionally) PCIe traffic as packets over those lanes.

<details><summary>Details</summary>

USB's defining choice is the **host-device tree**: devices never talk to each other, only to the host, which assigns each an address during *enumeration* when it is plugged in. This makes devices cheap and hot-plug trivial, at the cost of host overhead. Power is part of the spec: 5 V at up to 500 mA (USB 2.0 unit load), 900 mA (USB 3.0), and up to 240 W with USB-C Power Delivery 3.1 (48 V, 5 A).

<div style="max-width:780px">
<svg viewBox="0 0 780 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="390" y="22" text-anchor="middle" font-size="14" fill="#222">USB tiered star: the host enumerates every device (up to 127 addresses)</text>
  <line x1="390" y1="60" x2="200" y2="120" stroke="#555"/><line x1="390" y1="60" x2="390" y2="120" stroke="#555"/><line x1="390" y1="60" x2="580" y2="120" stroke="#555"/>
  <rect x="330" y="30" width="120" height="30" rx="6" fill="#2b6cb8"/><text x="390" y="50" text-anchor="middle" font-size="13" fill="#fff">Host controller</text>
  <rect x="140" y="120" width="120" height="28" rx="6" fill="#4a8bd4"/><text x="200" y="139" text-anchor="middle" font-size="12" fill="#fff">Hub (addr 2)</text>
  <rect x="330" y="120" width="120" height="28" rx="6" fill="#4a8bd4"/><text x="390" y="139" text-anchor="middle" font-size="12" fill="#fff">Device (addr 3)</text>
  <rect x="520" y="120" width="120" height="28" rx="6" fill="#4a8bd4"/><text x="580" y="139" text-anchor="middle" font-size="12" fill="#fff">Hub (addr 4)</text>
  <line x1="200" y1="148" x2="110" y2="210" stroke="#555"/><line x1="200" y1="148" x2="200" y2="210" stroke="#555"/><line x1="200" y1="148" x2="290" y2="210" stroke="#555"/>
  <line x1="580" y1="148" x2="510" y2="210" stroke="#555"/><line x1="580" y1="148" x2="620" y2="210" stroke="#555"/>
  <rect x="70" y="210" width="80" height="26" rx="5" fill="#7fb069"/><text x="110" y="227" text-anchor="middle" font-size="11" fill="#fff">Keyboard</text>
  <rect x="160" y="210" width="80" height="26" rx="5" fill="#7fb069"/><text x="200" y="227" text-anchor="middle" font-size="11" fill="#fff">Camera</text>
  <rect x="250" y="210" width="80" height="26" rx="5" fill="#7fb069"/><text x="290" y="227" text-anchor="middle" font-size="11" fill="#fff">Mouse</text>
  <rect x="470" y="210" width="80" height="26" rx="5" fill="#7fb069"/><text x="510" y="227" text-anchor="middle" font-size="11" fill="#fff">Drive</text>
  <rect x="580" y="210" width="80" height="26" rx="5" fill="#7fb069"/><text x="620" y="227" text-anchor="middle" font-size="11" fill="#fff">Headset</text>
  <text x="390" y="275" text-anchor="middle" font-size="12" fill="#666">Hubs add tiers (max 7); each device gets one address from the host</text>
</svg>
</div>

The USB-C connector carries all of this over 24 pins arranged in two mirrored rows — which is *why it is reversible*: either row can serve as the active one, and the CC pins tell the host which orientation was inserted.

<div style="max-width:820px">
<svg viewBox="0 0 820 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="410" y="20" text-anchor="middle" font-size="14" fill="#222">USB-C receptacle: 24 pins, two mirrored rows (reversible)</text>
  <rect x="30" y="30" width="760" height="190" fill="none" stroke="#999"/>
  <g font-size="9" text-anchor="middle">
  <!-- Row A -->
  <g>
  <rect x="40"  y="45" width="52" height="26" fill="#333"/><text x="66"  y="62" fill="#fff">A1</text><text x="66"  y="40" fill="#333">GND</text>
  <rect x="100" y="45" width="52" height="26" fill="#1a6fc4"/><text x="126" y="62" fill="#fff">A2</text><text x="126" y="40" fill="#1a6fc4">TX1+</text>
  <rect x="160" y="45" width="52" height="26" fill="#1a6fc4"/><text x="186" y="62" fill="#fff">A3</text><text x="186" y="40" fill="#1a6fc4">TX1−</text>
  <rect x="220" y="45" width="52" height="26" fill="#d33"/><text x="246" y="62" fill="#fff">A4</text><text x="246" y="40" fill="#d33">VBUS</text>
  <rect x="280" y="45" width="52" height="26" fill="#2a2"/><text x="306" y="62" fill="#fff">A5</text><text x="306" y="40" fill="#2a2">CC1</text>
  <rect x="340" y="45" width="52" height="26" fill="#e90"/><text x="366" y="62" fill="#fff">A6</text><text x="366" y="40" fill="#e90">D+</text>
  <rect x="400" y="45" width="52" height="26" fill="#e90"/><text x="426" y="62" fill="#fff">A7</text><text x="426" y="40" fill="#e90">D−</text>
  <rect x="460" y="45" width="52" height="26" fill="#a6a"/><text x="486" y="62" fill="#fff">A8</text><text x="486" y="40" fill="#a6a">SBU1</text>
  <rect x="520" y="45" width="52" height="26" fill="#d33"/><text x="546" y="62" fill="#fff">A9</text><text x="546" y="40" fill="#d33">VBUS</text>
  <rect x="580" y="45" width="52" height="26" fill="#1a6fc4"/><text x="606" y="62" fill="#fff">A10</text><text x="606" y="40" fill="#1a6fc4">RX2+</text>
  <rect x="640" y="45" width="52" height="26" fill="#1a6fc4"/><text x="666" y="62" fill="#fff">A11</text><text x="666" y="40" fill="#1a6fc4">RX2−</text>
  <rect x="700" y="45" width="52" height="26" fill="#333"/><text x="726" y="62" fill="#fff">A12</text><text x="726" y="40" fill="#333">GND</text>
  </g>
  <!-- Row B -->
  <g>
  <rect x="40"  y="150" width="52" height="26" fill="#333"/><text x="66"  y="167" fill="#fff">B1</text><text x="66"  y="192" fill="#333">GND</text>
  <rect x="100" y="150" width="52" height="26" fill="#1a6fc4"/><text x="126" y="167" fill="#fff">B2</text><text x="126" y="192" fill="#1a6fc4">RX1+</text>
  <rect x="160" y="150" width="52" height="26" fill="#1a6fc4"/><text x="186" y="167" fill="#fff">B3</text><text x="186" y="192" fill="#1a6fc4">RX1−</text>
  <rect x="220" y="150" width="52" height="26" fill="#d33"/><text x="246" y="167" fill="#fff">B4</text><text x="246" y="192" fill="#d33">VBUS</text>
  <rect x="280" y="150" width="52" height="26" fill="#2a2"/><text x="306" y="167" fill="#fff">B5</text><text x="306" y="192" fill="#2a2">CC2</text>
  <rect x="340" y="150" width="52" height="26" fill="#e90"/><text x="366" y="167" fill="#fff">B6</text><text x="366" y="192" fill="#e90">D+</text>
  <rect x="400" y="150" width="52" height="26" fill="#e90"/><text x="426" y="167" fill="#fff">B7</text><text x="426" y="192" fill="#e90">D−</text>
  <rect x="460" y="150" width="52" height="26" fill="#a6a"/><text x="486" y="167" fill="#fff">B8</text><text x="486" y="192" fill="#a6a">SBU2</text>
  <rect x="520" y="150" width="52" height="26" fill="#d33"/><text x="546" y="167" fill="#fff">B9</text><text x="546" y="192" fill="#d33">VBUS</text>
  <rect x="580" y="150" width="52" height="26" fill="#1a6fc4"/><text x="606" y="167" fill="#fff">B10</text><text x="606" y="192" fill="#1a6fc4">TX2+</text>
  <rect x="640" y="150" width="52" height="26" fill="#1a6fc4"/><text x="666" y="167" fill="#fff">B11</text><text x="666" y="192" fill="#1a6fc4">TX2−</text>
  <rect x="700" y="150" width="52" height="26" fill="#333"/><text x="726" y="167" fill="#fff">B12</text><text x="726" y="192" fill="#333">GND</text>
  </g>
  </g>
  <text x="410" y="215" text-anchor="middle" font-size="11" fill="#555">Blue: high-speed differential pairs (2 TX + 2 RX) · Red: power · Green: CC (orientation &amp; PD negotiation)</text>
  <text x="410" y="231" text-anchor="middle" font-size="11" fill="#555">Orange: USB 2.0 D+/D− · Purple: SBU (sideband) · Black: ground returns</text>
</svg>
</div>

<details><summary>Example problem</summary>

A USB 3.2 Gen 2×2 (20 Gb/s) external SSD is connected to a laptop. The SSD's internal NVMe interface is PCIe Gen 3 ×4 (~3.94 GB/s effective). What is the bottleneck?

<details><summary>Solution</summary>

USB 3.2 Gen 2×2: 20 Gb/s line rate ≈ 2 GB/s after 128b/132b coding overhead. The internal NVMe link can deliver ~3.94 GB/s. The USB cable (≈2 GB/s) is the bottleneck: the SSD can deliver at most ~2 GB/s to the host, no matter how fast its flash is. This is why USB4 (which tunnels the NVMe drive's native PCIe instead of translating it to USB storage protocol) made external SSDs dramatically faster.

</details>

</details>

</details>

## Thunderbolt (docking & expansion)

**Definition.** [Thunderbolt](./Thunderbolt.md) is a cabled expansion interface that tunnels PCIe and DisplayPort — the two buses a computer already speaks internally — over a single USB-C cable, daisy-chained across up to six devices. Thunderbolt 5 (spec finalised 2024) provides 80 Gb/s in each direction simultaneously (full duplex), with a 120 Gb/s asymmetric boost for video-heavy setups, using PAM3 signalling.

<details><summary>Details</summary>

Thunderbolt's insight is that a dock should not translate protocols: it should carry the computer's *native* buses. A Thunderbolt host packets PCIe transactions and DisplayPort video into "tunnels" over the same differential lanes, and a dock unpacks them to real PCIe slots, display connectors, and Ethernet. USB4 (2019) adopted this tunnel architecture — the difference is that Thunderbolt *guarantees* PCIe tunneling, while USB4 makes it optional.

**Worked example — the eGPU.** An external GPU enclosure contains a graphics card on a PCIe slot, tunnelled to the host. Real enclosures tunnel PCIe Gen 3 ×4: 32 Gb/s raw, ≈ 3.9 GB/s effective after 128b/130b coding. Check it against the cable:

- USB4 Gen 3×2 / Thunderbolt 3/4: 40 Gb/s **per direction** (full duplex) ≈ 5 GB/s. The 3.9 GB/s PCIe tunnel fits, leaving ~1 GB/s for a display tunnel — this is why 40 Gb/s eGPUs work but are the ceiling.
- Thunderbolt 5 / USB4 v2: 80 Gb/s per direction ≈ 10 GB/s. Two PCIe Gen 3 ×4 tunnels, or one Gen 4 ×4 (64 Gb/s raw ≈ 7.9 GB/s effective), now fit.
- No cable interface serves a GPU that needs 32 **GB/s** of host transfer (e.g. streaming large model weights every step): that exceeds even 10 GB/s, and needs a direct PCIe Gen 5 ×16 slot (64 GB/s) on the [board level](./Board-level-interconnects.md).

<details><summary>Example problem</summary>

A Thunderbolt 5 dock connects a workstation to two 4K60 displays, a 10 Gb/s Ethernet adapter, and an NVMe SSD that reads at 2 GB/s. All traffic flows away from the host except display video (toward the displays). Does the downstream direction have capacity?

<details><summary>Solution</summary>

Downstream budget: two 4K60 streams ≈ 2 × 12.5 Gb/s = 25 Gb/s; assume a worst-case 10 Gb/s of *downstream* network traffic; SSD reads go *upstream*, so they do not count against downstream. Worst case downstream ≈ 25 + 10 = 35 Gb/s < 80 Gb/s. It fits with room to spare — and note the per-direction accounting: the SSD's 16 Gb/s of read traffic rides the *upstream* 80 Gb/s, which is why full-duplex links make docks practical.

</details>

</details>

</details>

## Ethernet over copper (peer LAN)

**Definition.** [Ethernet over twisted pair](./Ethernet-copper.md) (IEEE 802.3) is the cabled LAN physical layer: four balanced twisted pairs, 100 m at 1–10 Gb/s (1000BASE-T, 10GBASE-T), and 25/40 Gb/s over 30 m of Cat 8 (802.3bq). 10GBASE-T encodes with PAM16 and the DSQ128 constellation across pairs, with Tomlinson–Harashima precoding and LDPC forward error correction.

<details><summary>Details</summary>

Ethernet's topology is the opposite of USB's: **peers**, joined through switches in a star. No host enumerates anybody; every port negotiates speed and duplex with its link partner automatically (autonegotiation), then the PHYs train on the actual cable before committing to a rate — which is why the *cable category*, not the port speed, sets the ceiling on a marginal run.

<div style="max-width:820px">
<svg viewBox="0 0 820 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="410" y="20" text-anchor="middle" font-size="14" fill="#222">Cat 6a construction: 4 twisted pairs, spline separator, foil shield, jacket</text>
  <!-- cross-section -->
  <circle cx="200" cy="180" r="120" fill="#3a3f4b"/>
  <circle cx="200" cy="180" r="112" fill="#c9a86a"/>
  <circle cx="200" cy="180" r="104" fill="#e8e4da"/>
  <g>
    <circle cx="160" cy="140" r="30" fill="#f2f2f2" stroke="#1a6fc4" stroke-width="3"/><circle cx="216" cy="128" r="30" fill="#f2f2f2" stroke="#1a6fc4" stroke-width="3"/>
    <circle cx="150" cy="215" r="30" fill="#f2f2f2" stroke="#e90" stroke-width="3"/><circle cx="208" cy="228" r="30" fill="#f2f2f2" stroke="#e90" stroke-width="3"/>
    <circle cx="255" cy="170" r="30" fill="#f2f2f2" stroke="#2a2" stroke-width="3"/><circle cx="262" cy="222" r="30" fill="#f2f2f2" stroke="#2a2" stroke-width="3"/>
    <circle cx="120" cy="172" r="26" fill="#f2f2f2" stroke="#a6a" stroke-width="3"/><circle cx="112" cy="120" r="26" fill="#f2f2f2" stroke="#a6a" stroke-width="3"/>
  </g>
  <text x="200" y="322" text-anchor="middle" font-size="12" fill="#555">cross-section: each colour is one twisted pair (2 conductors)</text>
  <!-- twist side view -->
  <text x="600" y="60" text-anchor="middle" font-size="12" fill="#222">one pair, side view: each twist</text>
  <text x="600" y="76" text-anchor="middle" font-size="12" fill="#222">swaps the wires' exposure to noise</text>
  <path d="M 470 170 q 20 -55 40 0 q 20 55 40 0 q 20 -55 40 0 q 20 55 40 0 q 20 -55 40 0 q 20 55 40 0" fill="none" stroke="#1a6fc4" stroke-width="4"/>
  <path d="M 470 170 q 20 55 40 0 q 20 -55 40 0 q 20 55 40 0 q 20 -55 40 0 q 20 55 40 0 q 20 -55 40 0" fill="none" stroke="#c33" stroke-width="4"/>
  <line x1="470" y1="240" x2="510" y2="240" stroke="#222" stroke-width="2"/>
  <line x1="510" y1="235" x2="510" y2="245" stroke="#222"/><line x1="470" y1="235" x2="470" y2="245" stroke="#222"/>
  <text x="490" y="258" text-anchor="middle" font-size="11" fill="#222">twist pitch</text>
  <text x="600" y="290" text-anchor="middle" font-size="11" fill="#555">twisting equalises crosstalk and radiation from both wires</text>
</svg>
</div>

The protocol layers above the PHY (framing, MAC, switching, IP, TCP) are covered in [Networks](../../Distributed-Systems/Networks.md). For runs beyond 100 m, or between buildings, the same Ethernet frames move to fibre — see [Optical interconnects](./Optical-interconnects.md) (10GBASE-R vs. 10GBASE-T).

The full treatment — the cable-category table (bandwidths, shielding, certified 10GBASE-T reach per category), the PAM5 → PAM16/DSQ128 signalling story, echo/NEXT/FEXT cancellation, autonegotiation and link training, the copper-vs-fibre crossover, and the Shannon-capacity worked example for one twisted pair — is on the [Ethernet over copper](./Ethernet-copper.md) page, together with an interactive link-budget simulator.

</details>

## SATA (storage)

**Definition.** [SATA](./SATA.md) (Serial ATA) is a point-to-point host-to-drive storage link: one differential pair in each direction, 8b/10b coded, at 1.5, 3, or 6 Gb/s (SATA 3.0, 2009). The 7-pin data connector carries only the two differential pairs and three grounds; power arrives on a separate 15-pin connector.

<details><summary>Details</summary>

SATA (2003) replaced the wide PATA ribbon with two thin differential pairs — the same serialisation wave that produced PCIe at the [board level](./Board-level-interconnects.md). The protocol is a simple command/response exchange of *Frame Information Structures* (FISs): the host sends a command FIS, the drive returns data and status FISs, with CRC on every frame. Maximum cable length is 1 m; the external variant eSATA adds shielding for the same 1–2 m.



**Example.** A 2.5-inch SATA SSD reads at 550 MB/s. The SATA 3.0 link is 6 Gb/s line rate; after 8b/10b coding that is 600 MB/s of payload. The drive is using 550/600 ≈ 92% of the link — the link, not the flash, is the bottleneck, which is why fast SSDs moved to NVMe over PCIe (≈ 3.94 GB/s for Gen 3 ×4, with a deeper command-queue protocol).

<details><summary>Example problem</summary>

A SATA 3.0 SSD reports 550 MB/s sequential read. What fraction of the SATA payload capacity is it using, and where does the rest go?

<details><summary>Solution</summary>

550/600 ≈ 92%. The remaining ~8% is protocol overhead: FIS framing, CRC, primitive symbols (SYNC, HOLD) between frames, and command turnaround — the drive is never purely streaming data.

</details>

</details>

</details>

## DisplayPort & HDMI (display)

[DisplayPort and HDMI](./DisplayPort-and-HDMI.md) are the one-way, latency-critical video links from a source (GPU) to a sink (monitor or TV): HDMI dominates TVs and consoles, DisplayPort monitors and docks. HDMI carries video as three TMDS lanes plus a clock lane (up to 18 Gb/s, or 48 Gb/s with Fixed Rate Link in HDMI 2.1); DisplayPort sends packetised video over 1–4 lanes (up to 32.4 Gb/s in DP 1.4, 80 Gb/s with UHBR in DP 2.1) and can carry several displays over one cable via MST. Because DisplayPort is packetised, it is the video protocol tunnelled inside Thunderbolt and USB4 — which is why docks speak DisplayPort. The full treatment — the bandwidth-budget arithmetic, link training, USB-C Alt Mode, HDCP and adaptive sync — is on the [DisplayPort and HDMI](./DisplayPort-and-HDMI.md) page.


## Legacy interconnects

Three older cabled interfaces complete the historical picture, and their ideas survive inside the modern ones:

- **RS-232** (1960s): single-ended ±12 V serial, point-to-point, no negotiation. Its framing (start bit, data bits, stop bit) is the ancestor of every UART, and it survives in industrial equipment and console ports.
- **VGA** (1987): analog RGB over 15 pins, video as *voltages* rather than bits — the reason display cables moved to digital (HDMI/DP): digitise at the source, not at the end of a lossy analog cable.
- **FireWire (IEEE 1394)** (1995): USB's contemporary and first rival — peer-to-peer rather than host-device, with guaranteed isochronous bandwidth, which made it beloved for audio/video. It lost to USB on cost and licensing simplicity, but its isochronous-stream idea lives on in DisplayPort's timed streams and USB's isochronous transfer type.

## Quiz

<details><summary>Example problem</summary>

A building is wired wall-to-wall with Cat 6 cable, and the longest run is 70 m. You need to deliver 10 Gb/s Ethernet over that run without rewiring. Why does plain 10GBASE-T fail, and what are two workable options?

<details><summary>Solution</summary>

10GBASE-T is specified for 100 m only over Cat 6a (500 MHz, tighter twist, better alien-crosstalk isolation). Over Cat 6, the standard (TIA TSB-155) certifies 10GBASE-T only to **55 m** — at 70 m the crosstalk and attenuation exceed what the PAM16/DSQ128 receiver can equalise, so the link will not close reliably. Options:

1. **Drop to 5GBASE-T** (IEEE 802.3bz, 2016): it reuses 10GBASE-T's DSP at lower spectral demand and runs at full 100 m on Cat 6 (even Cat 5e) — half the speed, but no rewiring.
2. **Convert to fibre for that run**: a pair of media converters with a short fibre patch solves the length outright, since fibre's attenuation is far lower per metre — see [Optical interconnects](./Optical-interconnects.md).

(Replacing the run with Cat 6a is the third, obvious-but-disruptive option.)

</details>

</details>

## Related pages

- [USB](./USB.md), [Thunderbolt](./Thunderbolt.md), [Ethernet (copper)](./Ethernet-copper.md), [SATA](./SATA.md), [DisplayPort & HDMI](./DisplayPort-and-HDMI.md) — the five families, one explanation page each.
- [Board-level interconnects](./Board-level-interconnects.md) — the PCIe and NVMe links that USB4 tunnels and SATA drives contain; the same transmission-line physics at centimetre scale.
- [Optical interconnects](./Optical-interconnects.md) — what takes over when copper's length limit is hit (fibre Ethernet, 10GBASE-R).
- [Electromagnetism](../../../Physics/Interactions/Electromagnetism/Readme.md) — the skin effect, radiation, and crosstalk from first principles.
- [Networks](../../Distributed-Systems/Networks.md) — the protocol layers (Ethernet MAC, IP, TCP) that ride on the copper PHY.
- [Communication](../../Information-Theory/Communication.md) — Shannon capacity and error correction, which set the SNR budgets used above.
