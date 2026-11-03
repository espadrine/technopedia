# Wireless interfaces

Wireless interfaces use electromagnetic waves in free space to carry data between devices. They are relevant whenever a physical cable is impractical: mobile phones, laptops, sensors, satellites. At the cm–10⁴ km scale, the dominant physics is path loss, multipath, and diffraction; the design disciplines are RF/antenna design, spectrum management, and MIMO/OFDM signal processing. All five interface families below are applications of the same link-budget physics, so start with [Wireless link fundamentals](#wireless-link-fundamentals) before diving into a specific family.

The protocol stacks above the physical layer (association, IP, TCP, HTTP, TLS) are covered once, here, by [Networks](../../Distributed-Systems/Networks.md); the Shannon-capacity limit that bounds every link's data rate is covered by [Communication](../../Information-Theory/Communication.md), and the underlying wave physics by [Electromagnetism](../../../Physics/Interactions/Electromagnetism/Readme.md) and [Wave propagation](../../../Physics/Mechanics/Oscillations/Wave-Propagation.md).

> **Authoritative sources**
> - [IEEE 802.11 (Wi-Fi 6/6E/7: 802.11ax, 802.11be)](https://www.ieee802.org/11/)
> - [3GPP 5G NR (TS 38.211)](https://www.3gpp.org/)
> - [ITU-R IMT-2020 (M.2150) 5G requirements](https://www.itu.int/rec/R-REC-M.2150)
> - [Bluetooth Core Specification](https://www.bluetooth.com/specifications/)
> - [NFC Forum Technical Specifications](https://nfc-forum.org/)
> - [ISO/IEC 14443 (proximity cards, NFC-A/B)](https://www.iso.org/standard/72429.html)
> - [IEEE 802.15.4 (Zigbee PHY/MAC)](https://www.ieee802.org/15/)

## Wireless link fundamentals

**Definition.** Every wireless link is a power budget. Free-space path loss is
$`\mathrm{FSPL_{dB}} = 20\log_{10}(d_{\mathrm{km}}) + 20\log_{10}(f_{\mathrm{MHz}}) + 32.44`,
and the received power is $`P_{rx} = P_{tx} + G_{tx} + G_{rx} - \mathrm{FSPL}` (all in dB/dBm). The achievable data rate is then bounded by Shannon: $`C = B\log_2(1 + \mathrm{SNR})`.

<details><summary>Details</summary>

**Step 1 — The link budget.** A transmitter radiates power $`P_{tx}`; the wave spreads over a sphere of radius $`d`, so the power density falls as $`1/d^2` (the inverse-square law of [wave propagation](../../../Physics/Mechanics/Oscillations/Wave-Propagation.md)). Antennas focus the energy: a gain $`G_{tx}` on the transmit side and $`G_{rx}` on the receive side. Collecting the terms in decibels gives the link budget: $`P_{rx} = P_{tx} + G_{tx} + G_{rx} - \mathrm{FSPL}`. The Friis equation behind the FSPL formula also carries a $`20\log_{10}(f)` term: at higher frequencies, the same aperture antenna captures less power, which is why mmWave links are short-range.

**Step 2 — A worked example.** A Wi-Fi access point at 2.4 GHz, 1 m from a laptop: FSPL = 32.44 + 20·log₁₀(0.001) + 20·log₁₀(2400) = 32.44 − 60 + 67.6 ≈ 60 dB. With P_tx = 20 dBm (100 mW) and 0 dB gains, the receiver gets −40 dBm — comfortably above a typical −80 dBm sensitivity. At 100 m the path loss is 80 dB and the received power −60 dBm: still workable, but with much less margin.

<svg width="640" height="300" viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Free-space path loss versus distance at 2.4 GHz and 5 GHz">
  <rect x="0" y="0" width="640" height="300" fill="#fafafa"/>
  <line x1="70" y1="250" x2="600" y2="250" stroke="#333" stroke-width="1.5"/>
  <line x1="70" y1="20" x2="70" y2="250" stroke="#333" stroke-width="1.5"/>
  <text x="335" y="285" text-anchor="middle" font-size="13" fill="#333">distance (m, log scale)</text>
  <text x="20" y="140" text-anchor="middle" font-size="13" fill="#333" transform="rotate(-90 20 140)">path loss (dB)</text>
  <text x="70" y="268" text-anchor="middle" font-size="11">1</text>
  <text x="335" y="268" text-anchor="middle" font-size="11">10</text>
  <text x="600" y="268" text-anchor="middle" font-size="11">100</text>
  <text x="62" y="254" text-anchor="end" font-size="11">40</text>
  <text x="62" y="158" text-anchor="end" font-size="11">60</text>
  <text x="62" y="66" text-anchor="end" font-size="11">80</text>
  <line x1="70" y1="158" x2="600" y2="158" stroke="#ddd" stroke-width="1"/>
  <line x1="70" y1="66" x2="600" y2="66" stroke="#ddd" stroke-width="1"/>
  <polyline points="70,250 335,158 600,66" fill="none" stroke="#1565c0" stroke-width="2.5"/>
  <polyline points="70,222 335,130 600,38" fill="none" stroke="#c62828" stroke-width="2.5"/>
  <circle cx="70" cy="250" r="3.5" fill="#1565c0"/><circle cx="335" cy="158" r="3.5" fill="#1565c0"/><circle cx="600" cy="66" r="3.5" fill="#1565c0"/>
  <circle cx="70" cy="222" r="3.5" fill="#c62828"/><circle cx="335" cy="130" r="3.5" fill="#c62828"/><circle cx="600" cy="38" r="3.5" fill="#c62828"/>
  <text x="470" y="105" font-size="13" fill="#c62828">5 GHz (+6 dB)</text>
  <text x="470" y="180" font-size="13" fill="#1565c0">2.4 GHz</text>
  <text x="90" y="40" font-size="12" fill="#555">+20 dB per decade of distance</text>
</svg>

**Step 3 — Modulation versus range.** A receiver needs a minimum signal-to-noise ratio (SNR) per modulation: QPSK carries 2 bits/symbol at ~10 dB SNR; 256-QAM carries 8 bits/symbol but needs ~28 dB; 1024-QAM needs ~35 dB. Since SNR falls with distance, real systems use **adaptive modulation**: full speed close to the access point, dropping to QPSK at the cell edge. This is the fundamental throughput-versus-range trade-off of every wireless interface below.

**Step 4 — Multipath fading.** In indoor and urban environments the wave reaches the receiver by many reflected paths of different lengths. The copies add constructively or destructively depending on frequency and position, so the received power fluctuates (fading) rather than following a clean inverse-square curve. Two standard mitigations: **OFDM** splits the band into many narrow sub-carriers so that each experiences only flat fading, and **MIMO** uses multiple antennas so that several independent fading paths exist simultaneously.

**Step 5 — Explore it interactively.** The simulator below computes the link budget and Shannon-limited data rate for five real interfaces. Move the distance slider and watch the achievable modulation fall as the SNR drops.

<iframe src="./Wireless-interfaces.simulation.html" title="Wireless link budget simulator: path loss, SNR and data rate versus distance for five wireless interfaces"></iframe>

**Step 6 — Sources and limits.** The Shannon bound $`C = B\log_2(1+\mathrm{SNR})` is derived in [Communication](../../Information-Theory/Communication.md); the wave phenomena (reflection, diffraction, inverse-square spreading) in [Wave propagation](../../../Physics/Mechanics/Oscillations/Wave-Propagation.md) and [Electromagnetism](../../../Physics/Interactions/Electromagnetism/Readme.md).

<details><summary>Example problem</summary>

A 5G small cell transmits at 3.5 GHz with 30 dBm, 5 dB transmit antenna gain and 0 dB receive gain. What is the received power at 200 m, and is a 256-QAM link (needs −78 dBm received power for adequate SNR in 100 MHz) feasible?

<details><summary>Solution</summary>

FSPL = 32.44 + 20·log₁₀(0.2) + 20·log₁₀(3500) = 32.44 − 14.0 + 70.9 ≈ 89.3 dB.
P_rx = 30 + 5 + 0 − 89.3 = −54.3 dBm.
−54.3 dBm is 23.7 dB above −78 dBm, so 256-QAM is feasible with a healthy margin — the link is SNR-rich, and the operator would rather reuse the frequency in a neighbouring cell than raise power.

</details>

</details>

</details>

## Wi-Fi (IEEE 802.11)

**Definition.** Wi-Fi is a shared-medium, OFDM-based wireless LAN. Wi-Fi 6 (802.11ax, 2019) operates at 2.4 GHz and 5 GHz; its 9.6 Gb/s peak PHY rate requires 8 spatial streams × 160 MHz × 1024-QAM (MCS11, rate 5/6): 8 × 1201 Mb/s ≈ 9.6 Gb/s. Wi-Fi 6E (2021) adds the 6 GHz band. Wi-Fi 7 (802.11be, 2024) adds 320 MHz channels and 4096-QAM.

<details><summary>Details</summary>

**Step 1 — Sharing the medium.** All devices in a cell share the same frequency band. Classic Wi-Fi coordinates access with CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance): listen before transmitting, back off a random time if busy. Wi-Fi 6 adds OFDMA (Orthogonal Frequency-Division Multiple Access): the access point schedules groups of OFDM sub-carriers to several users simultaneously, which is far more efficient for many small packets.

**Step 2 — OFDM sub-carriers.** The channel is divided into many narrow sub-carriers (78.125 kHz each in 802.11ax), modulated independently. Because each sub-carrier is narrow compared with the channel's frequency-selective fading, each experiences only *flat* fading — this is the multipath defence from [Wireless link fundamentals](#wireless-link-fundamentals). The diagram shows an OFDMA frame: the AP assigns sub-carrier groups (resource units) to different users.

<svg width="640" height="220" viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OFDM sub-carriers and OFDMA resource-unit assignment in a 20 MHz Wi-Fi channel">
  <rect x="0" y="0" width="640" height="220" fill="#fafafa"/>
  <text x="20" y="30" font-size="13" fill="#333">20 MHz channel = 242 data sub-carriers (78.125 kHz each) — 40 shown</text>
  <g>
    <rect x="20"  y="45" width="15" height="40" fill="#1565c0"/><rect x="35"  y="45" width="15" height="40" fill="#1565c0"/><rect x="50"  y="45" width="15" height="40" fill="#1565c0"/><rect x="65"  y="45" width="15" height="40" fill="#1565c0"/>
    <rect x="80"  y="45" width="15" height="40" fill="#1565c0"/><rect x="95"  y="45" width="15" height="40" fill="#1565c0"/><rect x="110" y="45" width="15" height="40" fill="#1565c0"/><rect x="125" y="45" width="15" height="40" fill="#1565c0"/>
    <rect x="140" y="45" width="15" height="40" fill="#2e7d32"/><rect x="155" y="45" width="15" height="40" fill="#2e7d32"/><rect x="170" y="45" width="15" height="40" fill="#2e7d32"/><rect x="185" y="45" width="15" height="40" fill="#2e7d32"/>
    <rect x="200" y="45" width="15" height="40" fill="#2e7d32"/><rect x="215" y="45" width="15" height="40" fill="#2e7d32"/><rect x="230" y="45" width="15" height="40" fill="#2e7d32"/><rect x="245" y="45" width="15" height="40" fill="#2e7d32"/>
    <rect x="260" y="45" width="15" height="40" fill="#ef6c00"/><rect x="275" y="45" width="15" height="40" fill="#ef6c00"/><rect x="290" y="45" width="15" height="40" fill="#ef6c00"/><rect x="305" y="45" width="15" height="40" fill="#ef6c00"/>
    <rect x="320" y="45" width="15" height="40" fill="#ef6c00"/><rect x="335" y="45" width="15" height="40" fill="#ef6c00"/><rect x="350" y="45" width="15" height="40" fill="#ef6c00"/><rect x="365" y="45" width="15" height="40" fill="#ef6c00"/>
    <rect x="380" y="45" width="15" height="40" fill="#6a1b9a"/><rect x="395" y="45" width="15" height="40" fill="#6a1b9a"/><rect x="410" y="45" width="15" height="40" fill="#6a1b9a"/><rect x="425" y="45" width="15" height="40" fill="#6a1b9a"/>
    <rect x="440" y="45" width="15" height="40" fill="#6a1b9a"/><rect x="455" y="45" width="15" height="40" fill="#6a1b9a"/><rect x="470" y="45" width="15" height="40" fill="#6a1b9a"/><rect x="485" y="45" width="15" height="40" fill="#6a1b9a"/>
    <rect x="500" y="45" width="15" height="40" fill="#9e9e9e"/><rect x="515" y="45" width="15" height="40" fill="#9e9e9e"/><rect x="530" y="45" width="15" height="40" fill="#9e9e9e"/><rect x="545" y="45" width="15" height="40" fill="#9e9e9e"/>
    <rect x="560" y="45" width="15" height="40" fill="#9e9e9e"/><rect x="575" y="45" width="15" height="40" fill="#9e9e9e"/><rect x="590" y="45" width="15" height="40" fill="#9e9e9e"/><rect x="605" y="45" width="15" height="40" fill="#9e9e9e"/>
  </g>
  <text x="20" y="105" font-size="12" fill="#1565c0">■ user A (8 sub-carriers)</text>
  <text x="200" y="105" font-size="12" fill="#2e7d32">■ user B</text>
  <text x="290" y="105" font-size="12" fill="#ef6c00">■ user C</text>
  <text x="390" y="105" font-size="12" fill="#6a1b9a">■ user D</text>
  <text x="500" y="105" font-size="12" fill="#757575">■ pilot / null</text>
  <text x="20" y="140" font-size="13" fill="#333">Each sub-carrier sees flat fading; a deep fade kills one narrow sub-carrier,</text>
  <text x="20" y="158" font-size="13" fill="#333">not the whole 20 MHz channel. Forward error correction repairs the lost bits.</text>
  <text x="20" y="190" font-size="13" fill="#333">Per-stream rate = sub-carriers × bits/symbol × code rate × symbols/s.</text>
  <text x="20" y="208" font-size="13" fill="#333">MIMO multiplies this by the number of spatial streams.</text>
</svg>

**Step 3 — The bands and channels.** 2.4 GHz: three non-overlapping 20 MHz channels (11 channels defined in North America, 13 in Europe). 5 GHz: up to 25 non-overlapping 20 MHz channels depending on region, aggregable into 40/80/160 MHz. 6 GHz (Wi-Fi 6E/7): 7 × 160 MHz channels, or 3 × 320 MHz channels for Wi-Fi 7. Wider channels raise the data rate proportionally but concentrate interference and reduce the number of non-overlapping networks.

**Step 4 — MIMO.** Multiple antennas at both ends create independent spatial streams: spatial multiplexing multiplies throughput by the stream count, while beamforming focuses energy toward a client and extends range (see the 5G section for the beamforming diagram — the principle is identical).

**Step 5 — Worked example (the 9.6 Gb/s peak).** The standard's table value for HE160 MCS11 (1024-QAM, rate 5/6) is 1201 Mb/s per stream at 400 ns guard interval (after pilots, training fields and overhead). Eight spatial streams: 8 × 1201 = 9608 ≈ **9.6 Gb/s**. Real throughput is ~60–70% of PHY rate after framing, ACKs and retransmissions.

**Step 6 — Sources.** [IEEE 802.11ax](https://www.ieee802.org/11/) defines the rate tables used above; [802.11be (Wi-Fi 7)](https://www.ieee802.org/11/Reports/tgbe_update.htm) adds 320 MHz and 4096-QAM.

<details><summary>Example problem</summary>

A Wi-Fi 6 client uses 2 spatial streams, an 80 MHz channel, 256-QAM with coding rate 5/6 (MCS9). What is the PHY data rate?

<details><summary>Solution</summary>

From the 802.11ax rate table, HE80 MCS9 (256-QAM, 5/6) is 573.5 Mb/s per stream at 800 ns guard interval. Two spatial streams: 2 × 573.5 = 1147 Mb/s ≈ 1.15 Gb/s PHY rate. (Note the coding rate is 5/6 — 802.11 has no 7/8 rate; its rates are 1/2, 2/3, 3/4 and 5/6.)

</details>

</details>

</details>

## Bluetooth

**Definition.** Bluetooth is a short-range (1–100 m), low-power, point-to-point or point-to-multipoint personal-area interface at 2.4 GHz. Bluetooth Low Energy (LE) hops once per connection event, with a connection interval from 7.5 ms to 4 s (up to ~133 hops/s); classic BR/EDR hops 1600 times per second. Data rates: up to 2 Mb/s (LE 2M PHY) or 3 Mb/s (BR/EDR).

<details><summary>Details</summary>

**Step 1 — Design goals.** Bluetooth targets personal-area networking: headphones, keyboards, mice, wearables. The driving constraints are power (µW in sleep, mW transmitting) and cost, not peak throughput — a sensor that must run a year on a coin cell accepts 100 ms of latency to save radio-on time.

**Step 2 — Frequency hopping.** The 2.4 GHz band is crowded (Wi-Fi, microwave ovens, Zigbee). Bluetooth defends itself with FHSS: 79 × 1 MHz channels (BR/EDR) or 40 × 2 MHz channels (LE), hopping pseudo-randomly. A narrowband interferer only corrupts the occasional hop; the link retransmits and adapts the channel map. The animation below shows a BLE connection hopping across its 37 data channels (37–39 are reserved for advertising); the red channels are corrupted by a fixed Wi-Fi network.

<div style="border:1px solid #ccc;border-radius:4px;padding:10px;max-width:660px;background:#fafafa">
<svg id="fhss-svg" width="640" height="170" viewBox="0 0 640 170" xmlns="http://www.w3.org/2000/svg"></svg>
<p style="font-size:12px;margin:4px 0 0 0" id="fhss-status">Channel —</p>
</div>
<script>
(function(){
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.getElementById('fhss-svg');
  var status = document.getElementById('fhss-status');
  var cells = [];
  var interfered = {12:true, 13:true, 14:true, 25:true, 26:true};
  for (var i = 0; i < 40; i++) {
    var r = document.createElementNS(NS,'rect');
    var x = 10 + (i % 20) * 31, y = i < 20 ? 20 : 70;
    r.setAttribute('x', x); r.setAttribute('y', y);
    r.setAttribute('width', 26); r.setAttribute('height', 40);
    r.setAttribute('fill', interfered[i] ? '#e57373' : '#90caf9');
    r.setAttribute('stroke', '#555');
    svg.appendChild(r);
    var t = document.createElementNS(NS,'text');
    t.setAttribute('x', x + 13); t.setAttribute('y', y + 25);
    t.setAttribute('text-anchor','middle'); t.setAttribute('font-size','10');
    t.setAttribute('fill','#1a1a1a');
    t.textContent = i;
    svg.appendChild(t);
    cells.push(r);
  }
  var lbl = document.createElementNS(NS,'text');
  lbl.setAttribute('x', 10); lbl.setAttribute('y', 135);
  lbl.setAttribute('font-size','12'); lbl.setAttribute('fill','#333');
  lbl.textContent = '40 BLE channels × 2 MHz. Red = corrupted by a fixed Wi-Fi network (adaptive frequency hopping avoids these).';
  svg.appendChild(lbl);
  var seed = 12345;
  function rnd(){ seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
  var prev = -1, hops = 0;
  function hop(){
    if (prev >= 0) { cells[prev].setAttribute('stroke','#555'); cells[prev].setAttribute('stroke-width','1'); }
    var c = Math.floor(rnd() * 37);
    cells[c].setAttribute('stroke','#000'); cells[c].setAttribute('stroke-width','3');
    prev = c; hops++;
    status.textContent = 'Hop #' + hops + ' → channel ' + c +
      (interfered[c] ? ' — interfered: packet lost, retransmit on next event' : ' — clean') +
      ' (real connection interval: 7.5 ms – 4 s; animation slowed ~100×)';
  }
  hop();
  setInterval(hop, 700);
})();
</script>

**Step 3 — Connection events and power.** A BLE connection exchanges data only during short *connection events*, separated by the connection interval (7.5 ms – 4 s, negotiated). One frequency hop occurs per connection event. A longer interval means fewer hops, less radio-on time, lower power, more latency — the central trade-off of BLE scheduling.

**Step 4 — Worked example.** A BLE mouse with a 100 ms connection interval wakes for ~2 ms per event: a duty cycle of ~2%, averaging tens of µW. A BR/EDR audio link instead streams continuously at 1600 hops/s, accepting ~1 mW for constant throughput.

**Step 5 — Sources.** The [Bluetooth Core Specification](https://www.bluetooth.com/specifications/) defines the hopping sequences, channel map and connection intervals.

<details><summary>Example problem</summary>

A Bluetooth LE audio stream (LC3 codec) requires 200 kbps. The BLE LE 1M PHY rate is 1 Mbps. What fraction of the airtime is used for audio?

<details><summary>Solution</summary>

200 kbps / 1 Mbps = 20%. The remaining 80% goes to protocol overhead (headers, ACKs, retransmissions) and idle time. With connection events batching the audio every 7.5 ms, the radio is on only during those events, so the *energy* duty cycle is far lower than the 20% airtime figure suggests.

</details>

</details>

</details>

## NFC (Near Field Communication)

**Definition.** NFC is a short-range (≤ 4 cm), contactless, 13.56 MHz wireless interface for data exchange and payment. It uses inductive coupling (magnetic near field) rather than radiative propagation, with data rates of 106–424 kbps (ISO/IEC 14443).

<details><summary>Details</summary>

**Step 1 — Near field versus far field.** Every antenna has two regions. In the *far field*, energy radiates away as waves and power falls as $`1/r^2`. In the *near field* (within roughly one wavelength: 22 m at 13.56 MHz), the dominant interaction is magnetic coupling between loop antennas, and the coupled energy falls as $`1/r^3`. That extra power of $`r` is what confines NFC to centimetres — a security feature as much as a limitation: eavesdropping or relay attacks require proximity.

<svg width="640" height="300" viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Inductive 1/r-cubed versus radiative 1/r-squared field decay">
  <rect x="0" y="0" width="640" height="300" fill="#fafafa"/>
  <line x1="60" y1="250" x2="610" y2="250" stroke="#333" stroke-width="1.5"/>
  <line x1="60" y1="20" x2="60" y2="250" stroke="#333" stroke-width="1.5"/>
  <text x="335" y="285" text-anchor="middle" font-size="13" fill="#333">distance r (cm)</text>
  <text x="18" y="140" text-anchor="middle" font-size="13" fill="#333" transform="rotate(-90 18 140)">coupled power (relative)</text>
  <polyline points="110,40 160,90 260,140 360,165 460,180 610,190" fill="none" stroke="#1565c0" stroke-width="2.5"/>
  <polyline points="110,40 160,115 260,190 360,222 460,236 610,244" fill="none" stroke="#c62828" stroke-width="2.5"/>
  <circle cx="110" cy="40" r="3.5" fill="#333"/>
  <text x="118" y="36" font-size="12" fill="#333">r = 1 cm</text>
  <text x="430" y="170" font-size="13" fill="#1565c0">radiative 1/r²</text>
  <text x="430" y="228" font-size="13" fill="#c62828">inductive 1/r³</text>
  <line x1="260" y1="40" x2="260" y2="250" stroke="#aaa" stroke-dasharray="4 4"/>
  <text x="266" y="55" font-size="12" fill="#555">4 cm NFC limit: the 1/r³ curve</text>
  <text x="266" y="72" font-size="12" fill="#555">has already fallen ~30 dB below 1/r²</text>
</svg>

**Step 2 — Load modulation.** The tag is passive: it has no battery. The reader's 13.56 MHz field induces a current in the tag's loop antenna, which powers the tag's chip. The tag then answers by *loading* its antenna slightly, which the reader senses as a tiny change in the reader's own field current — speaking by modulating the reader's power, not by transmitting.

**Step 3 — Worked example.** A contactless payment: the phone is held within 4 cm of the terminal. The reader polls at 13.56 MHz; the card responds with its UID and payment data (EMV). The whole transaction takes under a second; the RF exchange itself is a few milliseconds.

**Step 4 — Relation to RFID.** NFC is a subset of RFID (Radio-Frequency Identification). The distinction: NFC supports peer-to-peer mode (two powered devices take turns as reader and tag), while classic RFID is strictly reader→tag.

**Step 5 — Sources.** [ISO/IEC 14443](https://www.iso.org/standard/72429.html) defines the A/B modulation and framing; the [NFC Forum](https://nfc-forum.org/) defines the higher-level modes (P2P, card emulation, NDEF data exchange).

<details><summary>Example problem</summary>

An NFC tag answers at 106 kbps. How long does a 16-byte (128-bit) UID take to transmit?

<details><summary>Solution</summary>

128 bits / 106 kbps = 128 / 106000 ≈ 1.2 ms. In practice the frame adds a start bit, parity and a 16-bit CRC, so the on-air time is ~2 ms — negligible next to the ~300 ms of the surrounding payment protocol.

</details>

</details>

</details>

## Zigbee (IEEE 802.15.4)

**Definition.** Zigbee is a low-power, low-rate (250 kb/s) mesh networking interface at 2.4 GHz (also 868/915 MHz), built on the IEEE 802.15.4 PHY/MAC: 16 × 5 MHz channels, DSSS with OQPSK, ~10–100 m per hop, designed for years of battery life in building automation and sensor networks.

<details><summary>Details</summary>

**Step 1 — Niche.** Zigbee sits between Bluetooth (higher rate, fewer devices, star topology) and LoRa (kilometre range, bits per second). Its niche: hundreds of battery-powered sensors (lights, locks, thermostats) forming a self-healing mesh in a home or building, each message a few dozen bytes.

**Step 2 — The mesh.** Three node types: a coordinator (one per network), routers (mains-powered, forward packets), and end devices (battery-powered, sleep almost always, talk only to their parent router). Routing over multiple hops extends coverage far beyond a single 10–100 m radio hop; if a router dies, packets reroute — the dashed link below.

<svg width="640" height="280" viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zigbee mesh topology: coordinator, routers, end devices">
  <rect x="0" y="0" width="640" height="280" fill="#fafafa"/>
  <line x1="320" y1="70" x2="150" y2="150" stroke="#888" stroke-width="1.5"/>
  <line x1="320" y1="70" x2="490" y2="150" stroke="#888" stroke-width="1.5"/>
  <line x1="150" y1="150" x2="490" y2="150" stroke="#888" stroke-width="1.5" stroke-dasharray="6 4"/>
  <line x1="150" y1="150" x2="70"  y2="230" stroke="#888" stroke-width="1.5"/>
  <line x1="150" y1="150" x2="230" y2="230" stroke="#888" stroke-width="1.5"/>
  <line x1="490" y1="150" x2="410" y2="230" stroke="#888" stroke-width="1.5"/>
  <line x1="490" y1="150" x2="570" y2="230" stroke="#888" stroke-width="1.5"/>
  <circle cx="320" cy="70"  r="18" fill="#c62828"/><text x="320" y="75"  text-anchor="middle" font-size="11" fill="#fff">ZC</text>
  <circle cx="150" cy="150" r="16" fill="#ef6c00"/><text x="150" y="155" text-anchor="middle" font-size="11" fill="#fff">ZR</text>
  <circle cx="490" cy="150" r="16" fill="#ef6c00"/><text x="490" y="155" text-anchor="middle" font-size="11" fill="#fff">ZR</text>
  <circle cx="70"  cy="230" r="13" fill="#1565c0"/><circle cx="230" cy="230" r="13" fill="#1565c0"/>
  <circle cx="410" cy="230" r="13" fill="#1565c0"/><circle cx="570" cy="230" r="13" fill="#1565c0"/>
  <text x="320" y="40"  text-anchor="middle" font-size="12" fill="#c62828">Coordinator</text>
  <text x="150" y="120" text-anchor="middle" font-size="12" fill="#ef6c00">Router (mains)</text>
  <text x="490" y="120" text-anchor="middle" font-size="12" fill="#ef6c00">Router (mains)</text>
  <text x="70"  y="258" text-anchor="middle" font-size="12" fill="#1565c0">End device</text>
  <text x="230" y="258" text-anchor="middle" font-size="12" fill="#1565c0">End device</text>
  <text x="410" y="258" text-anchor="middle" font-size="12" fill="#1565c0">End device</text>
  <text x="570" y="258" text-anchor="middle" font-size="12" fill="#1565c0">End device</text>
  <text x="320" y="200" text-anchor="middle" font-size="12" fill="#555">dashed: alternate route if a router dies (self-healing mesh)</text>
</svg>

**Step 3 — Power discipline.** End devices sleep > 99% of the time and wake on a beacon or a schedule. A sensor sending 20 bytes every 60 s at 250 kb/s is on the air for 20×8/250000 = 0.64 ms per minute — a duty cycle of ~0.001%, which is how a coin cell lasts years.

**Step 4 — Coexistence.** Zigbee shares 2.4 GHz with Wi-Fi and Bluetooth. Its 5 MHz DSSS channels are narrow and low-power; deployments place the network on a 2.4 GHz channel between the Wi-Fi channels (e.g. Zigbee channels 15, 20 or 25 sit between the popular Wi-Fi 1, 6 and 11).

**Step 5 — Related low-power and wide-area interfaces.** **UWB** (802.15.4z, ~500 MHz bandwidth at 6–8 GHz) trades range (~10 m) for centimetre-precision ranging — used for digital car keys and asset trackers. **LoRa** uses sub-GHz ISM bands with chirp spread spectrum to trade rate (kb/s) for kilometres of range in IoT telemetry. **GNSS** (GPS, Galileo: L-band 1.1–1.6 GHz) is a receive-only wireless interface: one-way satellite broadcasts, position computed from the time-of-arrival of four or more satellites.

**Step 6 — Sources.** [IEEE 802.15.4](https://www.ieee802.org/15/) defines PHY and MAC; the [Connectivity Standards Alliance](https://csa-iot.org/) defines the Zigbee routing and application layers on top.

<details><summary>Example problem</summary>

A Zigbee door sensor reports 20 bytes every 60 s. Including a 2× protocol overhead factor, what is its radio-on duty cycle, and why does this matter for battery life?

<details><summary>Solution</summary>

Payload on-air time: 20 × 8 / 250000 = 0.64 ms; with 2× overhead ≈ 1.3 ms per 60 s. Duty cycle ≈ 1.3 ms / 60 s ≈ 0.002%. A sensor drawing ~5 mA while transmitting and ~2 µA asleep averages ≈ 5 mA × 0.00002 + 2 µA ≈ 2.1 µA — a 220 mAh coin cell lasts ~12 years in the ideal case, and realistically 2–5 years accounting for polling and retransmissions.

</details>

</details>

</details>

## Cellular (5G NR)

**Definition.** 5G NR (New Radio, 3GPP) is a wide-area cellular wireless interface operating at sub-6 GHz (FR1) and mmWave (FR2: 24–71 GHz). The IMT-2020 peak downlink requirement is 20 Gb/s (and 100 Mb/s for mid-band cell-edge users), reached with wide aggregated bandwidths and 8-layer MIMO.

<details><summary>Details</summary>

**Step 1 — Flexible OFDM numerology.** 5G NR uses OFDM (downlink) and DFT-s-OFDM (uplink, lower peak-to-average power for handsets) with scalable sub-carrier spacing: 15, 30, 60, 120 or 240 kHz. The spacing sets the slot length: a slot is 14 OFDM symbols, so at 15 kHz a slot is 1 ms, at 30 kHz 0.5 ms, at 120 kHz 0.125 ms — finer spacing for wide coverage, coarser for low latency and mmWave.

**Step 2 — Massive MIMO and beamforming.** Base stations use 64–256 antenna elements. Driving each element with a controlled phase shift makes the wavefronts add constructively in one direction and cancel elsewhere: a steerable beam with ~10·log₁₀(N) dB of array gain (18 dB for 64 elements) aimed at each user. This is what lets the same spectrum serve many users simultaneously without interfering.

<svg width="640" height="300" viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Massive MIMO beamforming: a 64-element array steers beams toward two users">
  <rect x="0" y="0" width="640" height="300" fill="#fafafa"/>
  <text x="20" y="28" font-size="13" fill="#333">64-element array (8 shown), phase-steered beams</text>
  <g>
    <rect x="40" y="60"  width="14" height="22" fill="#37474f"/>
    <rect x="40" y="90"  width="14" height="22" fill="#37474f"/>
    <rect x="40" y="120" width="14" height="22" fill="#37474f"/>
    <rect x="40" y="150" width="14" height="22" fill="#37474f"/>
    <rect x="40" y="180" width="14" height="22" fill="#37474f"/>
    <rect x="40" y="210" width="14" height="22" fill="#37474f"/>
    <rect x="40" y="240" width="14" height="22" fill="#37474f"/>
    <rect x="40" y="270" width="14" height="22" fill="#37474f"/>
  </g>
  <text x="30" y="55" font-size="12" fill="#37474f">array</text>
  <path d="M 60 150 Q 280 60 510 88" fill="none" stroke="#1565c0" stroke-width="3" opacity="0.8"/>
  <path d="M 60 150 Q 300 110 510 96" fill="none" stroke="#1565c0" stroke-width="1.5" opacity="0.5"/>
  <path d="M 60 150 Q 300 20 510 80"  fill="none" stroke="#1565c0" stroke-width="1.5" opacity="0.5"/>
  <path d="M 60 160 Q 280 260 510 228" fill="none" stroke="#2e7d32" stroke-width="3" opacity="0.8"/>
  <path d="M 60 160 Q 300 210 510 222" fill="none" stroke="#2e7d32" stroke-width="1.5" opacity="0.5"/>
  <path d="M 60 160 Q 300 300 510 236" fill="none" stroke="#2e7d32" stroke-width="1.5" opacity="0.5"/>
  <circle cx="520" cy="90"  r="9" fill="#1565c0"/><text x="535" y="95"  font-size="13" fill="#1565c0">user A</text>
  <circle cx="520" cy="230" r="9" fill="#2e7d32"/><text x="535" y="235" font-size="13" fill="#2e7d32">user B</text>
  <text x="200" y="150" font-size="12" fill="#555">constructive addition in the beam direction:</text>
  <text x="200" y="168" font-size="12" fill="#555">array gain ≈ 10·log₁₀(64) ≈ 18 dB</text>
  <text x="200" y="186" font-size="12" fill="#555">cancellation elsewhere → little inter-user interference</text>
</svg>

**Step 3 — mmWave and slicing.** FR2 (24–71 GHz) offers up to 400 MHz per carrier but suffers the frequency term of the path-loss formula plus atmospheric absorption: ~100–200 m cells, suited to stadiums and dense urban hotspots. Network slicing lets one physical network carry multiple virtual networks with different QoS (IoT, URLLC, eMBB).

**Step 4 — Worked example.** A mid-band deployment: 3.5 GHz, 100 MHz, 4-layer MIMO. Per stream, 100 MHz at 30 kHz spacing gives 273 resource blocks × 12 = 3276 sub-carriers; at 256-QAM (8 bits/symbol) with 14 symbols per 0.5 ms slot, that is 3276 × 8 × 14 / 0.0005 ≈ 734 Mb/s per stream, ≈ 2.9 Gb/s for 4 streams before overhead — consistent with real-world mid-band 5G measurements of 1–2 Gb/s.

**Step 5 — Sources.** [3GPP TS 38.211](https://www.3gpp.org/) defines the OFDM numerology and resource grid; [ITU-R M.2150 (IMT-2020)](https://www.itu.int/rec/R-REC-M.2150) sets the 20 Gb/s peak-rate requirement.

<details><summary>Example problem</summary>

A 5G NR cell uses 100 MHz at 3.5 GHz with 30 kHz sub-carrier spacing. How many sub-carriers are in the channel, and how long is a slot?

<details><summary>Solution</summary>

Raw division gives 100 MHz / 30 kHz ≈ 3333, but the resource grid is quantised in resource blocks of 12 sub-carriers with guard bands reserved: 100 MHz at 30 kHz SCS = **273 RBs = 3276 sub-carriers**. The slot length scales inversely with the sub-carrier spacing: 14 OFDM symbols give 1 ms at 15 kHz, **0.5 ms at 30 kHz**, 0.125 ms at 120 kHz.

</details>

</details>

</details>

## Satellite

**Definition.** Satellite communication links ground stations to satellites in LEO (~550 km), MEO (~8000–20000 km) or GEO (35786 km), typically at 2–50 GHz. LEO constellations (Starlink, OneWeb) deliver broadband internet with 20–60 ms latency; GEO delivers broadcast coverage with ~119 ms one-way propagation.

<details><summary>Details</summary>

**Step 1 — The geometry sets the latency.** One-way propagation delay is slant range / c. The diagram shows the three regimes and the slant range from a ground terminal to a satellite (longer than the altitude, except directly overhead).

<svg width="640" height="340" viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Orbital regimes with slant range and one-way latency (not to scale)">
  <rect x="0" y="0" width="640" height="340" fill="#fafafa"/>
  <circle cx="320" cy="330" r="70" fill="#90caf9" stroke="#1565c0" stroke-width="2"/>
  <text x="320" y="335" text-anchor="middle" font-size="13" fill="#0d47a1">Earth</text>
  <circle cx="320" cy="330" r="105" fill="none" stroke="#2e7d32" stroke-width="1.5" stroke-dasharray="5 4"/>
  <circle cx="320" cy="330" r="170" fill="none" stroke="#ef6c00" stroke-width="1.5" stroke-dasharray="5 4"/>
  <circle cx="320" cy="330" r="255" fill="none" stroke="#c62828" stroke-width="1.5" stroke-dasharray="5 4"/>
  <circle cx="415" cy="270" r="6" fill="#2e7d32"/>
  <circle cx="455" cy="200" r="6" fill="#ef6c00"/>
  <circle cx="320" cy="75"  r="6" fill="#c62828"/>
  <circle cx="320" cy="260" r="4" fill="#0d47a1"/>
  <text x="332" y="256" font-size="11" fill="#0d47a1">ground terminal</text>
  <line x1="320" y1="260" x2="415" y2="270" stroke="#2e7d32" stroke-width="2"/>
  <text x="352" y="282" font-size="11" fill="#2e7d32">slant range</text>
  <text x="428" y="268" font-size="12" fill="#2e7d32">LEO 550 km</text>
  <text x="428" y="284" font-size="11" fill="#2e7d32">slant ≈ 1100–1900 km, one-way ≈ 4–6 ms</text>
  <text x="468" y="198" font-size="12" fill="#ef6c00">MEO ~8000–20000 km</text>
  <text x="468" y="214" font-size="11" fill="#ef6c00">one-way ≈ 27–70 ms (GNSS lives here)</text>
  <text x="335" y="72"  font-size="12" fill="#c62828">GEO 35786 km</text>
  <text x="335" y="88"  font-size="11" fill="#c62828">one-way ≈ 119 ms, fixed over the equator</text>
  <text x="20" y="30" font-size="12" fill="#555">Orbit radii not to scale. Latency = slant range / c.</text>
</svg>

**Step 2 — Path loss and Doppler.** At 12 GHz over a 1200 km LEO slant range, FSPL = 32.44 + 20·log₁₀(1200) + 20·log₁₀(12000) ≈ 169.6 dB; at 20 GHz over 550 km it is ≈ 173 dB. Both ends answer with high-gain antennas: the Starlink user terminal is a phased array (~1280 elements) that steers its beam electronically as satellites cross the sky. A LEO satellite moves at ~7.5 km/s, so the Doppler shift is Δf = v·f/c = 7500 × 20×10⁹ / 3×10⁸ ≈ **500 kHz** at 20 GHz — three orders of magnitude beyond a terrestrial mobile cell's Doppler, and the terminal must track and compensate it continuously.

**Step 3 — Latency and TCP.** LEO one-way is ~4–6 ms of pure propagation per hop (20–60 ms end-to-end with multiple hops and processing); GEO is ~119 ms one-way, so a single-hop echo (terminal → satellite → gateway) round-trips in ~238 ms, and a user-to-user connection across two GEO hops sees ~480–600 ms RTT. Long RTT inflates the bandwidth-delay product, so TCP needs large windows (or satellite-specific proxies) to keep the pipe full — see [Networks](../../Distributed-Systems/Networks.md).

**Step 4 — Worked example.** A Starlink user terminal links to a LEO satellite in Ku-band: downlink 10.7–12.7 GHz, uplink 14.0–14.5 GHz (the Ka-band 20/30 GHz links connect satellites to the gateways). The phased array (~1280 elements) hands the beam from satellite to satellite every few minutes as LEO satellites pass overhead; per-user downlink rates are ~50–250 Mbps.

**Step 5 — Sources.** [ITU-R](https://www.itu.int/) regulates the Ku/Ka spectrum allocations; the [CCSDS](https://public.ccsds.org/) defines the space-link protocols used above them.

<details><summary>Example problem</summary>

A GEO satellite at 35786 km provides a 100 Mbps downlink to a single-hop connection (terminal → satellite → gateway). What is the bandwidth-delay product, and how does a user-to-user GEO connection change the picture?

<details><summary>Solution</summary>

One-way propagation: 35786 km / 3×10⁸ m/s ≈ 119 ms. A single-hop echo round-trip is ~238 ms, giving BDP = 100 Mbps × 238 ms ≈ 23.8 Mbit ≈ 3 MB — the TCP window must exceed 3 MB to keep the pipe full. A user-to-user connection crosses two satellite hops (up, down, up, down), so the real RTT is ~480–600 ms and the effective BDP roughly doubles; this is why interactive applications (video calls, gaming) feel poor on GEO and why LEO constellations exist.

</details>

</details>

</details>

## Quiz

<details><summary>Example problem</summary>

A Wi-Fi 6 router (4×4 MIMO, 160 MHz, 256-QAM, rate 5/6) and a 5G NR cell (4-layer MIMO, 100 MHz, 256-QAM, 30 kHz sub-carrier spacing) both serve a single user. Which provides the higher peak PHY rate, and by what factor?

<details><summary>Solution</summary>

**Wi-Fi 6:** from the 802.11ax rate table, HE160 MCS9 (256-QAM, 5/6, 800 ns GI) is 1147 Mb/s per stream. Four streams: 4 × 1147 ≈ **4.6 Gb/s**. (The often-quoted 9.6 Gb/s peak needs 8 streams × 1024-QAM: 8 × 1201 Mb/s.)

**5G NR:** 100 MHz at 30 kHz SCS = 273 RBs = 3276 sub-carriers. A slot at 30 kHz SCS is 0.5 ms with 14 OFDM symbols. Per stream: 3276 × 8 bits × 14 / 0.5 ms ≈ 734 Mb/s. Four streams: ≈ **2.9 Gb/s**.

Wi-Fi 6 is ≈ 4.6 / 2.9 ≈ **1.6× faster** in this configuration. The gap is modest because both are OFDM at the same modulation: Wi-Fi wins on channel width per stream, and 5G closes the gap (and exceeds it) with carrier aggregation, wider total bandwidth and 8-layer MIMO to meet its 20 Gb/s IMT-2020 peak requirement.

</details>

</details>