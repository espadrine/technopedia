# SATA

SATA (Serial ATA) is the point-to-point storage link between a host and a drive: one differential pair in each direction, 8b/10b coded, at 1.5, 3, or 6 Gb/s. It replaced the wide parallel PATA (IDE) ribbon in 2003 and remains the standard interface for hard drives and budget SSDs, though performance SSDs have moved to NVMe over PCIe. This page covers the SATA-specific layers — connectors, framing, command queuing, host software interface. The general serialisation physics it shares with every cabled link (why serial beat parallel, skin effect, attenuation versus length) is treated in [Cabled external interconnects](./Cabled-external-interconnects.md).

> **Authoritative sources**
> - [Serial ATA specification (SATA-IO, purchase page for Revisions 2.6–3.5)](https://sata-io.org/developers/purchase-specification)
> - [SATA-IO — specification releases and roadmap](https://sata-io.org/)
> - [Serial ATA AHCI Specification, Rev. 1.3.1 (Intel)](https://www.intel.com/content/dam/www/public/us/en/documents/technical-specifications/serial-ata-ahci-spec-rev1-3-1.pdf)
> - [NVM Express specification revisions (NVMe consortium)](https://nvmexpress.org/specifications/)

## Brief history

1. **2003 — SATA 1.0.** One thin differential pair each way replaces the 40/80-wire PATA ribbon and its master/slave cable sharing: 1.5 Gb/s line rate (150 MB/s payload), point-to-point, hot-pluggable.
2. **2004–2005 — SATA 2.0.** Line rate doubles to 3 Gb/s (300 MB/s); Native Command Queuing (NCQ) and hot-plug reporting become mandatory.
3. **2009 — SATA 3.0.** 6 Gb/s (600 MB/s), the last speed step; the mSATA connector appears for small-form-factor SSDs.
4. **2013–present — SATA 3.2 and the NVMe era.** SATA 3.2 adds SATA Express and the M.2 connector, but NVMe over PCIe takes the performance segment; SATA remains the hard-drive and budget-SSD standard.

## Speed generations

**Definition.** Three generations, all with the same connectors and the same protocol, differing only in line rate. Every generation pays a fixed 20% coding tax: 8b/10b encoding turns each 8 payload bits into 10 line bits.

<table>
<tr><th>Generation</th><th>Year</th><th>Line rate</th><th>Line coding</th><th>Payload rate</th><th>Max cable</th></tr>
<tr><td>SATA 1.0</td><td>2003</td><td>1.5 Gb/s</td><td>8b/10b</td><td>150 MB/s</td><td>1 m</td></tr>
<tr><td>SATA 2.0</td><td>2004</td><td>3 Gb/s</td><td>8b/10b</td><td>300 MB/s</td><td>1 m</td></tr>
<tr><td>SATA 3.0</td><td>2009</td><td>6 Gb/s</td><td>8b/10b</td><td>600 MB/s</td><td>1 m</td></tr>
</table>

<div style="max-width:820px">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="410" y="20" text-anchor="middle" font-size="14" fill="#222">Line rate vs payload rate: the 8b/10b tax is 20% at every generation</text>
  <line x1="70" y1="220" x2="800" y2="220" stroke="#999"/>
  <g font-size="11" fill="#555">
    <text x="150" y="238" text-anchor="middle">SATA 1.0 (2003)</text>
    <text x="430" y="238" text-anchor="middle">SATA 2.0 (2004)</text>
    <text x="710" y="238" text-anchor="middle">SATA 3.0 (2009)</text>
  </g>
  <g>
    <rect x="90" y="170" width="120" height="50" fill="#8a8f99"/>
    <rect x="90" y="170" width="96" height="50" fill="#1a6fc4"/>
    <rect x="370" y="120" width="120" height="100" fill="#8a8f99"/>
    <rect x="370" y="120" width="96" height="100" fill="#1a6fc4"/>
    <rect x="650" y="70" width="120" height="150" fill="#8a8f99"/>
    <rect x="650" y="70" width="96" height="150" fill="#1a6fc4"/>
  </g>
  <g font-size="11" fill="#fff">
    <text x="138" y="199" text-anchor="middle">150 MB/s</text>
    <text x="418" y="174" text-anchor="middle">300 MB/s</text>
    <text x="698" y="149" text-anchor="middle">600 MB/s</text>
  </g>
  <g font-size="11" fill="#444">
    <text x="150" y="160" text-anchor="middle">187.5 MB/s line</text>
    <text x="430" y="110" text-anchor="middle">375 MB/s line</text>
    <text x="710" y="60" text-anchor="middle">750 MB/s line</text>
  </g>
  <text x="20" y="40" font-size="11" fill="#8a8f99">■ line rate (coded)</text>
  <text x="150" y="40" font-size="11" fill="#1a6fc4">■ payload (after 8/10 decode)</text>
  <text x="410" y="256" text-anchor="middle" font-size="11" fill="#555">grey = bits on the wire · blue = payload bits · the missing 20% is the 8b/10b coding overhead</text>
</svg>
</div>

<details><summary>Details</summary>

The payload rate is not a marketing rounding of the line rate — it follows from the coding. Work it through for SATA 3.0:

1. **Line rate.** The PHY clocks 6 × 10⁹ symbols per second, one bit per symbol (NRZ on a differential pair), so the wire carries 6 Gb/s.
2. **Decode.** 8b/10b maps every 8-bit payload byte to a 10-bit symbol chosen to keep the DC balance and enough transitions for clock recovery. Only 8 of every 10 wire bits are data: the payload rate is 6 × 10⁹ × 8/10 = 4.8 × 10⁹ bit/s.
3. **Convert to bytes.** 4.8 × 10⁹ ÷ 8 = 6 × 10⁸ bytes/s = **600 MB/s**.

The same three steps give 150 MB/s for 1.5 Gb/s and 300 MB/s for 3 Gb/s — the payload is always exactly 80% of the line rate. Why pay 20%? Because 8b/10b guarantees a transition density and running-disparity balance that let the receiver recover the clock from the data itself, with no separate clock wire — the same trade-off every serial link of the era made (PCIe Gen 1/2, Fibre Channel, Gigabit Ethernet all use 8b/10b; see [Cabled external interconnects](./Cabled-external-interconnects.md) for why serial won over parallel in the first place).

**On cable length.** Internal SATA is limited to **1 m**; the external variant **eSATA** allows up to **2 m** (the Gen1m/Gen2m specifications) but mandates shielded cable and connectors to get there. The 1 m internal limit is not arbitrary: at 6 Gb/s, attenuation and crosstalk eat the noise budget quickly. The SATA specification does not mandate the adaptive equalisation and link-training machinery that 10GBASE-T or PCIe Gen 3+ use to buy back margin on long channels; Gen 3 receivers in practice do include equalisation DSP to close marginal links, but the specification does not tighten the cable plant to extend the reach — hence 1 m, and 2 m only with eSATA's shielding.

<details><summary>Example problem</summary>

An early SATA hard drive (2004) streams 55 MB/s. Which generation does it saturate, and how much headroom does SATA 3.0 leave for it?

<details><summary>Solution</summary>

SATA 1.0's payload is 150 MB/s, so a 55 MB/s drive uses 55/150 ≈ 37% of the link — SATA 1.0 is not the bottleneck for a spinning platter of that era (a 7200 rpm drive's media rate, not the interface, sets the pace). On SATA 3.0 the same drive uses 55/600 ≈ 9%. The lesson: for mechanical drives the interface has been over-provisioned since 2003, which is why SATA survived as the hard-drive standard even after SSDs — it is only when flash arrived that the 600 MB/s ceiling started to bind (see the simulation at the end of this page).

</details>

</details>

</details>

## Connectors: data and power are separate

**Definition.** The SATA **data connector is 7 pins**: two differential pairs (transmit, receive) and three grounds — nothing else. Power is a **separate 15-pin connector** carrying 3.3 V, 5 V, and 12 V rails. Internal SATA cable runs are limited to 1 m; the external variant eSATA is the same protocol with mandatory shielding, rated up to 2 m.

<div style="max-width:860px">
<svg viewBox="0 0 860 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="430" y="22" text-anchor="middle" font-size="14" fill="#222">The two SATA connectors: 7 signal pins, 15 power pins</text>
  <text x="215" y="52" text-anchor="middle" font-size="13" fill="#222">Data connector (7 pins)</text>
  <rect x="60" y="65" width="310" height="46" rx="4" fill="#d8dce2" stroke="#666"/>
  <g stroke="#333" stroke-width="1.5">
    <rect x="75"  y="75" width="26" height="26" fill="#888"/>
    <rect x="115" y="75" width="26" height="26" fill="#1a6fc4"/>
    <rect x="155" y="75" width="26" height="26" fill="#1a6fc4"/>
    <rect x="195" y="75" width="26" height="26" fill="#888"/>
    <rect x="235" y="75" width="26" height="26" fill="#2a8a4a"/>
    <rect x="275" y="75" width="26" height="26" fill="#2a8a4a"/>
    <rect x="315" y="75" width="26" height="26" fill="#888"/>
  </g>
  <g font-size="10" fill="#222" text-anchor="middle">
    <text x="88"  y="128">1</text><text x="128" y="128">2</text><text x="168" y="128">3</text>
    <text x="208" y="128">4</text><text x="248" y="128">5</text><text x="288" y="128">6</text><text x="328" y="128">7</text>
  </g>
  <g font-size="10" fill="#444" text-anchor="middle">
    <text x="88"  y="142">GND</text><text x="128" y="142">A+</text><text x="168" y="142">A−</text>
    <text x="208" y="142">GND</text><text x="248" y="142">B−</text><text x="288" y="142">B+</text><text x="328" y="142">GND</text>
  </g>
  <text x="215" y="165" text-anchor="middle" font-size="11" fill="#1a6fc4">blue: host transmit pair (A+, A−)</text>
  <text x="215" y="181" text-anchor="middle" font-size="11" fill="#2a8a4a">green: host receive pair (B+, B−)</text>
  <text x="215" y="197" text-anchor="middle" font-size="11" fill="#555">grey: grounds, interleaved to isolate the two pairs</text>
  <text x="215" y="220" text-anchor="middle" font-size="11" fill="#555">no power, no sideband, no clock pin —</text>
  <text x="215" y="236" text-anchor="middle" font-size="11" fill="#555">the clock is recovered from the 8b/10b data itself</text>

  <text x="645" y="52" text-anchor="middle" font-size="13" fill="#222">Power connector (15 pins)</text>
  <rect x="490" y="65" width="310" height="46" rx="4" fill="#d8dce2" stroke="#666"/>
  <g stroke="#333" stroke-width="1.5">
    <rect x="500" y="75" width="14" height="26" fill="#e08020"/><rect x="518" y="75" width="14" height="26" fill="#e08020"/><rect x="536" y="75" width="14" height="26" fill="#e08020"/>
    <rect x="554" y="75" width="14" height="26" fill="#888"/><rect x="572" y="75" width="14" height="26" fill="#888"/><rect x="590" y="75" width="14" height="26" fill="#888"/>
    <rect x="608" y="75" width="14" height="26" fill="#b02020"/><rect x="626" y="75" width="14" height="26" fill="#b02020"/><rect x="644" y="75" width="14" height="26" fill="#b02020"/>
    <rect x="662" y="75" width="14" height="26" fill="#888"/><rect x="680" y="75" width="14" height="26" fill="#888"/><rect x="698" y="75" width="14" height="26" fill="#888"/>
    <rect x="716" y="75" width="14" height="26" fill="#c8b400"/><rect x="734" y="75" width="14" height="26" fill="#c8b400"/><rect x="752" y="75" width="14" height="26" fill="#c8b400"/>
  </g>
  <g font-size="10" fill="#444" text-anchor="middle">
    <text x="525" y="128">1–3</text><text x="597" y="128">4–6</text><text x="651" y="128">7–9</text><text x="705" y="128">10–12</text><text x="759" y="128">13–15</text>
  </g>
  <g font-size="10" text-anchor="middle">
    <text x="525" y="142" fill="#e08020">+3.3 V</text><text x="597" y="142" fill="#555">GND</text><text x="651" y="142" fill="#b02020">+5 V</text><text x="705" y="142" fill="#555">GND</text><text x="759" y="142" fill="#8a7a00">+12 V</text>
  </g>
  <text x="645" y="165" text-anchor="middle" font-size="11" fill="#555">three rails × three pins each: 1.5 A per pin,</text>
  <text x="645" y="181" text-anchor="middle" font-size="11" fill="#555">so 4.5 A per rail (54 W at 12 V) for spin-up motors</text>
  <text x="645" y="204" text-anchor="middle" font-size="11" fill="#555">2.5-inch drives use only 5 V; 3.5-inch drives</text>
  <text x="645" y="220" text-anchor="middle" font-size="11" fill="#555">need 12 V for the spindle motor</text>
  <text x="645" y="243" text-anchor="middle" font-size="11" fill="#555">pin 3 (3.3 V) doubles as PWDIS on some drives:</text>
  <text x="645" y="259" text-anchor="middle" font-size="11" fill="#555">wiring it disables power-on-in-standby</text>
</svg>
</div>

<details><summary>Details</summary>

Splitting data from power is a deliberate simplification: the data connector stays small (a 2.5-inch drive is only 7 mm thick), and devices that need only one function can omit the other — an eSATA bracket carries data with no power, and a powered enclosure carries power with no host data path. Compare USB-C, which multiplexes power and data on one 24-pin plug and therefore needs a negotiation protocol (USB-PD) just to agree on volts and amps; SATA's split is possible because both ends are fixed-function and the drive never negotiates its power rail.

Two details of the pinout repay attention:

- **Grounds between the pairs.** Pins 1, 4, and 7 are ground, so each differential pair is flanked by a ground on both sides. This isolates the transmit pair from the receive pair (less crosstalk at the connector, where the tight twist geometry ends) and lets the cable's shield and drain wire bond to signal ground at defined points.
- **Three pins per rail.** Each power pin is rated 1.5 A, so a rail with three pins carries up to 4.5 A. A 3.5-inch drive's spindle motor draws several amps at 12 V during spin-up — a single pin would be the thermal weak point, so the connector triples them.

<details><summary>Example problem</summary>

A 3.5-inch drive spins up at 2 A on the 12 V rail and 0.5 A on the 5 V rail. Is the 15-pin connector within rating, and what total spin-up power does it deliver?

<details><summary>Solution</summary>

12 V × 2 A = 24 W and 5 V × 0.5 A = 2.5 W, so 26.5 W total. The 12 V rail has three pins at 1.5 A each = 4.5 A capacity, so 2 A uses 44% of it; the 5 V rail likewise. The connector is comfortably within rating — the tripled pins exist precisely so that the worst-case spin-up transient (which can be several amps for a second or two) never approaches a single pin's limit. Note the 3.3 V rail is unused by most 3.5-inch drives; it exists for 2.5-inch drives and for the PWDIS feature.

</details>

</details>

</details>

## The protocol: FIS exchange

**Definition.** SATA communicates by exchanging **Frame Information Structures (FISs)**: the host sends a command FIS (read/write/identify), the drive returns data FISs and a status FIS. Every frame carries a CRC; the link layer wraps frames in primitive symbols (SYNC, HOLD, EOF) that double as flow control. NCQ (Native Command Queuing) lets the drive reorder up to 32 outstanding commands.

<div style="max-width:860px">
<svg id="fisSvg" viewBox="0 0 860 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="430" y="22" text-anchor="middle" font-size="14" fill="#222">One read command, frame by frame (click Play)</text>
  <rect x="40" y="50" width="170" height="60" rx="6" fill="#2b6cb8"/>
  <text x="125" y="75" text-anchor="middle" font-size="13" fill="#fff">Host</text>
  <text x="125" y="93" text-anchor="middle" font-size="10" fill="#dce8f8">AHCI controller</text>
  <rect x="650" y="50" width="170" height="60" rx="6" fill="#2b8a4a"/>
  <text x="735" y="75" text-anchor="middle" font-size="13" fill="#fff">Drive</text>
  <text x="735" y="93" text-anchor="middle" font-size="10" fill="#dff0e4">SATA target</text>
  <line x1="210" y1="120" x2="650" y2="120" stroke="#999" stroke-width="2"/>
  <line x1="210" y1="200" x2="650" y2="200" stroke="#999" stroke-width="2"/>
  <text x="430" y="112" text-anchor="middle" font-size="11" fill="#555">host → drive (outgoing pair)</text>
  <text x="430" y="192" text-anchor="middle" font-size="11" fill="#555">drive → host (incoming pair)</text>
  <g id="fisFrame" visibility="hidden">
    <rect x="0" y="-14" width="150" height="28" rx="5" fill="#1a6fc4" stroke="#0a3a6a"/>
    <text x="75" y="4" text-anchor="middle" font-size="11" fill="#fff" id="fisFrameLabel">FIS</text>
  </g>
  <text id="fisPrimL" x="230" y="145" font-size="11" fill="#a05a10" font-family="monospace"></text>
  <text id="fisPrimR" x="630" y="225" text-anchor="end" font-size="11" fill="#a05a10" font-family="monospace"></text>
  <text id="fisStatus" x="430" y="260" text-anchor="middle" font-size="12" fill="#222"></text>
  <text id="fisStep" x="430" y="282" text-anchor="middle" font-size="11" fill="#777"></text>
  <rect id="fisBtn" x="395" y="296" width="70" height="24" rx="5" fill="#2b6cb8" style="cursor:pointer"/>
  <text id="fisBtnLabel" x="430" y="313" text-anchor="middle" font-size="12" fill="#fff" style="cursor:pointer">Play</text>
</svg>
</div>
<script>
(function(){
  var frame = document.getElementById('fisFrame');
  if(!frame) return;
  var label = document.getElementById('fisFrameLabel');
  var primL = document.getElementById('fisPrimL');
  var primR = document.getElementById('fisPrimR');
  var status = document.getElementById('fisStatus');
  var stepTxt = document.getElementById('fisStep');
  var btn = document.getElementById('fisBtn');
  var btnLabel = document.getElementById('fisBtnLabel');
  // steps: [statusText, stepText, dir(1=host->drive, -1=drive->host, 0=none), frameLabel, fillColor, holdPause]
  var steps = [
    ['Link idle: both sides stream SYNC primitives continuously', 'SYNC keeps the receiver locked between frames', 0, '', '#1a6fc4', false],
    ['Host sends the Command FIS (Register FIS host-to-device): the LBA, count and read opcode', 'Frame: SOF primitive · payload · CRC · EOF', 1, 'Command FIS', '#1a6fc4', false],
    ['Drive accepts the frame and returns the R_OK primitive', 'If the CRC had failed, it would send R_ERR and the host would retry', -1, '', '#1a6fc4', false],
    ['Drive streams the Data FIS back with the requested sectors', 'Host buffer is busy: it asserts HOLD, the drive pauses mid-frame', -1, 'Data FIS', '#2a8a4a', true],
    ['HOLD released: the rest of the Data FIS completes, drive sends EOF', 'HOLD/HOLDA primitives are the flow control — no separate credit protocol', -1, 'Data FIS', '#2a8a4a', false],
    ['Drive reports completion with the Status FIS (Register FIS device-to-host)', 'Same register values (status, error) the old IDE task file carried', -1, 'Status FIS', '#8a5aa0', false]
  ];
  var cur = -1, t = 0, playing = false, holding = false, holdT = 0;
  var STEP_MS = 2600, HOLD_MS = 1400;
  function setStep(i){
    cur = i; t = 0; holding = false;
    var s = steps[i];
    status.textContent = s[0];
    stepTxt.textContent = s[1];
    primL.textContent = ''; primR.textContent = '';
    if(s[2] === 0){
      frame.setAttribute('visibility','hidden');
      primL.textContent = 'SYNC SYNC SYNC …';
      primR.textContent = 'SYNC SYNC SYNC …';
    } else {
      frame.setAttribute('visibility', s[3] ? 'visible' : 'hidden');
      label.textContent = s[3];
      frame.querySelector('rect').setAttribute('fill', s[4]);
      var y = (s[2] === 1) ? 120 : 200;
      var x = (s[2] === 1) ? 230 : 470;
      frame.setAttribute('transform','translate(' + x + ',' + y + ')');
    }
  }
  function tick(dt){
    if(cur < 0) return;
    var s = steps[cur];
    if(s[2] === 0){ t += dt; if(t > STEP_MS*0.6) next(); return; }
    if(s[5] && t > STEP_MS*0.45 && !holding){
      holding = true; holdT = 0;
      primL.textContent = 'HOLD HOLD …';
    }
    if(holding){
      holdT += dt;
      if(holdT > HOLD_MS){ holding = false; primL.textContent = ''; }
      return; // frame frozen mid-flight while HOLD is asserted
    }
    t += dt;
    var p = Math.min(t / STEP_MS, 1);
    var x0 = 230, x1 = 470; // travel range for the frame group
    var x, y = (s[2] === 1) ? 120 : 200;
    if(s[2] === 1){ x = x0 + p * (x1 - x0); }
    else { x = x1 - p * (x1 - x0); }
    frame.setAttribute('transform','translate(' + x + ',' + y + ')');
    if(p >= 1){
      if(s[2] === 1){ primR.textContent = 'R_OK'; }
      else { primL.textContent = 'R_OK'; }
      next();
    }
  }
  function next(){
    var n = (cur + 1) % steps.length;
    setStep(n);
  }
  var last = null;
  function loop(ts){
    if(playing && last !== null) tick(ts - last);
    last = ts;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  btn.addEventListener('click', function(){
    playing = !playing;
    btnLabel.textContent = playing ? 'Pause' : 'Play';
    if(playing && cur < 0) setStep(0);
  });
})();
</script>

<details><summary>Details</summary>

**Where the FIS comes from.** SATA was designed for a frictionless transition from PATA, so its command FIS is a literal photograph of the old IDE task-file registers: the 8-bit command code, sector number, cylinder, drive/head, and count bytes that software used to write to I/O ports are carried field-for-field in the FIS payload. The same driver commands, the same register semantics — only the transport changed. This backward compatibility made adoption trivial, but it also caps the protocol: one command queue of depth 32, one device per cable, and a register-shaped command set that maps poorly to flash memory's parallelism (see [NCQ and AHCI](#ncq-and-ahci) below).

**Framing and flow control.** The link layer wraps every FIS between primitive symbols — a 32-bit control word repeated as needed: SOF opens the frame, CRC protects the payload, EOF closes it. Between frames, both sides stream SYNC to keep the receiver's clock recovery locked. When a receiver's buffers fill, it asserts **HOLD**; the transmitter pauses mid-frame and repeats **HOLDA** until HOLD drops. This is flow control without any credit accounting: the pause is signalled in-band, at symbol granularity, and costs nothing when unused.

**The overhead budget.** The 600 MB/s payload computed above is not all data. Each frame pays SOF/EOF primitives, a 4-byte CRC, and the FIS type header; between frames, SYNC and flow-control primitives flow continuously. A well-driven sequential transfer keeps this under ~10%, which is why a good SATA 3.0 SSD reports ~550 MB/s rather than 600 — the arithmetic is exactly the example problem below, and the simulation at the end of this page lets you move the numbers around.

<details><summary>Example problem</summary>

A drive is streaming a large sequential read. Mid-frame, the host's buffer fills and the host asserts HOLD for 2 ms out of every 10 ms. What is the ceiling this puts on throughput, ignoring all other overheads?

<details><summary>Solution</summary>

HOLD freezes the frame in place, so the link delivers payload for only 8 of every 10 ms: the effective payload rate is 600 MB/s × 0.8 = 480 MB/s. This is the in-band flow-control tax — it is why the protocol-overhead slider in the simulation below exists, and why a drive whose internal buffer is small (or whose cache-flush pattern stalls the host) can fall well below its headline number even though the copper could carry more.

</details>

</details>

</details>

## NCQ and AHCI

**Definition.** **NCQ** (Native Command Queuing) lets the host hand the drive up to **32 queued commands** that the drive may execute in any order — so a hard drive can service them in seek order instead of arrival order. **AHCI** (Advanced Host Controller Interface) is the standard host-side controller interface above the FIS exchange: software writes command entries to memory-resident command lists, and the AHCI controller builds and transmits the FISes, reporting completion through interrupts.

<details><summary>Details</summary>

The path of one read under AHCI (see the [AHCI 1.3.1 specification](https://www.intel.com/content/dam/www/public/us/en/documents/technical-specifications/serial-ata-ahci-spec-rev1-3-1.pdf) for the register and memory layouts):

1. The OS fills a **command table** in RAM: a command header pointing to a Register FIS-to-device (the LBA and count, i.e. the task-file image) and a PRDT listing the DMA buffers for the data.
2. The OS sets the command's issue bit in the port's command register.
3. The AHCI controller DMA-reads the table, transmits the Command FIS, receives the Data FIS, and DMA-writes the data into the buffers — the CPU is not involved in the transfer.
4. The drive returns the Status FIS; the controller raises an interrupt and updates the done bits.

**Why queue depth matters.** With one outstanding command, a hard drive that takes 10 ms per random 4 KB read delivers 100 IOPS. With 32 outstanding, the drive's scheduler can order them by head position, so the average seek per command drops and the commands overlap: even with no scheduling gain at all, pipelining alone lifts the ceiling to 32/0.010 = 3200 IOPS. NCQ is why the depth-32 queue — not bandwidth — is the number that matters for desktop hard-drive latency.

<details><summary>Example problem</summary>

A hard drive takes 10 ms per random 4 KB read, of which 8 ms is seek/rotational latency and 2 ms is transfer. With NCQ depth 32 and perfect seek ordering, the average non-overlapping delay per command falls to 5 ms. What is the IOPS and the delivered bandwidth?

<details><summary>Solution</summary>

With the queue keeping the drive busy, the effective service time per command is the 5 ms average delay plus the 2 ms transfer = 7 ms, so IOPS ≈ 1000/7 ≈ 143. Bandwidth = 143 × 4 KB ≈ 572 KB/s. Note how far both numbers sit from the link's 600 MB/s: random access on spinning rust is limited by mechanics, not by SATA — the interface could be 100× faster and these numbers would not move. (This is also why NCQ does nothing for an SSD's random reads: flash has no seek to reorder around.)

</details>

</details>

</details>

## Connector variants and hot-plug

**Definition.** The same SATA protocol appears in several physical packages: the standard 7+15-pin cable pair, the **mSATA** card (2009, mini-PCIe footprint), the **M.2** slot wired in SATA mode (B+M key, routes two of the slot's pins to the SATA differential pairs), the short-lived **SATA Express** slot, and the external **eSATA** (shielded, up to 2 m). Internal variants support hot-plug if the host controller and drive declare it.

<table>
<tr><th>Variant</th><th>Year</th><th>Form</th><th>Rate</th><th>Hot-plug</th><th>Fate</th></tr>
<tr><td>SATA cable (7+15 pin)</td><td>2003</td><td>cable + drive connectors</td><td>up to 6 Gb/s</td><td>yes (with AHCI support)</td><td>universal</td></tr>
<tr><td>eSATA</td><td>2004</td><td>shielded external connector</td><td>up to 6 Gb/s, 2 m</td><td>yes (by spec)</td><td>niche; displaced by USB</td></tr>
<tr><td>mSATA</td><td>2009</td><td>mini-PCIe-sized card</td><td>up to 6 Gb/s</td><td>no</td><td>displaced by M.2</td></tr>
<tr><td>SATA Express (SATAe)</td><td>2013</td><td>motherboard slot</td><td>SATA or PCIe ×2</td><td>no</td><td>dead end; M.2 won</td></tr>
<tr><td>M.2 (SATA mode)</td><td>2013</td><td>M.2 card, B+M key</td><td>up to 6 Gb/s</td><td>no</td><td>standard for SATA SSDs</td></tr>
</table>

<details><summary>Details</summary>

**Hot-plug.** SATA was designed for it from the start, unlike PATA: the data connector's ground pins are longer than the signal pins, so grounding happens before any signal line mates (a "staggered" pinout), and AHCI controllers support mechanical presence detection and cold-presence-detect interrupts so the OS can enumerate a drive inserted into a live port. eSATA makes this mandatory; internal hot-plug is optional but common on server backplanes, where a failed drive is swapped without powering down the chassis.

**Why the variants died or lived.** mSATA and M.2 SATA carry the identical protocol over different physical cards — M.2 won because it is thinner, uses the same slot as NVMe drives, and needs no cable. SATA Express is the instructive failure: it tried to make one slot serve both SATA and PCIe, but a slot that runs at the slower standard's speed whenever a SATA drive is inserted satisfies nobody, and M.2 (which simply wires the same pins differently per module type) replaced it within a few years.

<details><summary>Example problem</summary>

A laptop has one M.2 slot, key B+M, wired for both SATA and PCIe. You insert an M.2 SATA drive. Why can the same slot also take an NVMe drive, and what decides which protocol runs?

<details><summary>Solution</summary>

The M.2 slot carries PCI Express lanes plus sideband signals on its edge connector; the SATA variant of the standard routes two of those pins to a SATA PHY instead of leaving them as PCIe lanes. Which protocol runs is decided by the module's *keying* and the chipset's configuration: a B+M-keyed SATA drive presents its pairs on the SATA pins, and the chipset's SATA controller claims the port. An M-keyed NVMe drive lands on the PCIe lanes instead (see [Board-level interconnects](./Board-level-interconnects.md) for what a PCIe lane is physically). One slot, two protocols, distinguished by key notches — the mechanical key is the protocol selector.

</details>

</details>

</details>

## SATA vs NVMe

**Definition.** NVMe is a command set and host interface designed for flash, running over PCIe lanes rather than a SATA PHY: up to **64K queues of 64K commands** each (versus one queue of 32), no ATA register legacy, and 128b/130b coding at PCIe Gen 3 (versus 8b/10b). A PCIe Gen 3 ×4 link moves ~3.94 GB/s — about 6.5× SATA 3.0's payload.

<details><summary>Details</summary>

The comparison is not "newer is faster" but a lesson in what legacy costs. SATA's command model — one queue, depth 32, register-shaped FISes, one device per cable — was engineered for 2003's hard drives, and every one of those choices is a ceiling for flash, which has no seek time to schedule around and many parallel NAND dies to keep busy. NVMe (see the [NVMe specification](https://nvmexpress.org/specifications/)) starts from PCIe's point-to-point lanes — the physical layer is described in [Board-level interconnects](./Board-level-interconnects.md) — and defines a scalable queue model that matches flash's parallelism. The bandwidth ratio (3.94 GB/s vs 0.6 GB/s) is the smaller half of the story; the queue-depth and latency differences are what make NVMe drives feel faster at small random I/O.

SATA survives where its ceiling does not bind: hard drives (mechanically limited far below 600 MB/s), bulk storage, and budget SSDs — plus universal compatibility, since every OS and BIOS for 20 years speaks it.

<details><summary>Example problem</summary>

A SATA 3.0 SSD reads at 550 MB/s. The same flash controller is moved to an NVMe PCIe Gen 3 ×4 board (~3.94 GB/s effective). How much faster can the NVMe version be, and what limits it?

<details><summary>Solution</summary>

Up to 3.94/0.55 ≈ 7× on paper — but only if the flash array itself can source that rate. A 4-channel SATA-class controller cannot; the NVMe version needs more NAND channels to saturate the link. The lesson: a faster interface only helps when the *device*, not the link, was the bottleneck — here the SATA link was the bottleneck (550/600 ≈ 92% utilisation), so the flash behind it had headroom to spare.

</details>

</details>

</details>

## Link utilisation, interactively

The simulation below ties the numbers together: pick a generation, set the drive's own sequential speed and the protocol overhead, and see whether the link or the device is the bottleneck — with the 550 MB/s-on-600 MB/s case as the default.

<iframe src="./SATA.simulation.html" title="SATA link utilisation: line rate, 8b/10b overhead, protocol overhead and drive speed" style="width:100%;height:640px;border:1px solid #ccc"></iframe>

Notice the two regimes: when the drive slider sits below the usable link rate, the system is **device-bound** and the generation selector changes nothing; push the drive past it and the link clamps the throughput — which is precisely the transition SATA SSDs crossed in the early 2010s, and the reason NVMe exists.

## Quiz

<details><summary>Example problem</summary>

A technician connects a 2.5-inch SATA drive with only the 7-pin data cable plugged in. The BIOS never enumerates the drive. Why, and what does this reveal about the connector design?

<details><summary>Solution</summary>

The 7-pin data connector carries data only — two differential pairs and three grounds. With the 15-pin power connector unconnected, the drive's PHY has no power at all, so no link comes up and the controller sees nothing on the port. The split design is deliberate: it keeps the data plug small (a 2.5-inch drive is only 7 mm thick) and lets the power connector carry three rails (3.3/5/12 V) at amp-level currents that a 7-pin data plug was never sized for.

</details>

</details>
