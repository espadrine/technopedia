# Ethernet over copper (twisted pair)

Twisted-pair Ethernet is the physical layer of the wired LAN: four balanced copper pairs in a jacket, carrying 1–10 Gb/s over up to 100 m (and 25–40 Gb/s over 30 m). It is relevant whenever devices that are *peers* — computers, switches, access points, cameras — must be networked reliably and cheaply within a building. The layers above the wire (framing, MAC, switching, IP, TCP) are covered in [Networks](../Distributed-Systems/Networks.md); this page is about the wire itself.

> **Authoritative sources**
> - [IEEE 802.3 (Ethernet)](https://standards.ieee.org/standard/802_3-2022.html)
> - [IEEE 802.3ab (1000BASE-T)](https://standards.ieee.org/standard/802_3ab-1999.html)
> - [IEEE 802.3an (10GBASE-T)](https://standards.ieee.org/standard/802_3an-2006.html)
> - [IEEE 802.3bz (2.5GBASE-T / 5GBASE-T)](https://standards.ieee.org/standard/802_3bz-2016.html)
> - [IEEE 802.3bq (25GBASE-T / 40GBASE-T)](https://standards.ieee.org/ieee/802.3bq/6906/)

## Brief history

1. **1990 — 10BASE-T (802.3i).** Twisted pair replaces coaxial cable: two pairs, 10 Mb/s, and the star topology (hub or switch at the centre) that makes the whole cabled LAN manageable. The 8-position RJ45 jack becomes universal.
2. **1999 — 1000BASE-T (802.3ab).** Gigabit over the *same* installed Cat 5 cable, by using all four pairs at 125 MBd each with 5-level PAM signalling and digital cancellation of echo and crosstalk — the first Ethernet PHY that needed serious DSP in every port.
3. **2006 — 10GBASE-T (802.3an).** Ten-fold again, on 4 pairs at 800 MBd with PAM16/DSQ128 coding, Tomlinson–Harashima precoding, and LDPC forward error correction — which is what forced the tighter Cat 6a cable category.
4. **2016 — 2.5/5GBASE-T (802.3bz) and 25/40GBASE-T (802.3bq).** Two opposite answers to the same question: 802.3bz reuses the 10GBASE-T PHY at lower code rates so installed Cat 5e/Cat 6 plants get multi-gigabit speeds ("NBASE-T"), while 802.3bq pushes copper to 25/40 Gb/s over short 30 m shielded Cat 8 runs in data-centre racks.

<details><summary>Details: the physical plant — connector, pairs, and power</summary>

A twisted-pair link is one jacket containing **four twisted pairs** of 0.4–0.6 mm copper, terminated in an **8P8C modular jack** ("RJ45"): 8 pins, each pair on a neighbouring pin pair, with one pair used for transmit and one for receive in the 10/100BASE-T pinout, and all four used bidirectionally in 1000BASE-T. Because each pair is transformer-coupled at both ends, the same four pairs can simultaneously carry **Power over Ethernet (PoE)**: the power source injects a *common-mode* voltage between the pairs (up to 90 W with IEEE 802.3bt), which the data transformers do not see, while the data rides the *differential* signal on each pair. This is copper's quiet killer feature: one cable delivers both the bits and the watts to cameras, access points, and phones — something no fibre can do.

</details>

## Cable categories

**Definition.** A "category" is a *bandwidth* rating (MHz) plus crosstalk and return-loss limits — not a data rate. The data rate comes from the PHY that runs over it.

<table>
<tr><th>Category</th><th>Tested bandwidth</th><th>Shielding</th><th>Typical use</th><th>10GBASE-T reach</th></tr>
<tr><td>Cat 5e</td><td>100 MHz</td><td>unshielded (UTP)</td><td>1 Gb/s at 100 m</td><td>not certified</td></tr>
<tr><td>Cat 6</td><td>250 MHz</td><td>UTP</td><td>1 Gb/s; 10 Gb/s short runs</td><td>55 m (TIA TSB-155)</td></tr>
<tr><td>Cat 6a</td><td>500 MHz</td><td>UTP or F/UTP</td><td>10 Gb/s at 100 m</td><td>100 m</td></tr>
<tr><td>Cat 7</td><td>600 MHz</td><td>shielded per pair (S/FTP)</td><td>10 Gb/s at 100 m</td><td>100 m</td></tr>
<tr><td>Cat 8</td><td>2000 MHz</td><td>shielded (S/FTP)</td><td>25/40 Gb/s in racks</td><td>30 m (per 802.3bq)</td></tr>
</table>

<details><summary>Details: why bandwidth, not rate, is the spec</summary>

The category rating is analog: how far the cable attenuates a sine wave of a given frequency, and how much a pair's signal leaks into its neighbours (crosstalk) and reflects back (return loss). Turning that into a data rate is the PHY's job — which is why the *same* Cat 6a cable carries 1, 2.5, 5, or 10 Gb/s depending on which transceivers you plug in. The PHY spends its noise budget on:

- **Cancellation:** 10GBASE-T actively subtracts echo, near-end crosstalk (NEXT), and far-end crosstalk (FEXT) from all 7 other wire-combinations in the cable (see the next section).
- **Coding:** multi-level symbols (PAM16, see below) pack more bits per Hz.
- **Forward error correction:** LDPC codes repair the errors that survive.

Better cable (higher category) buys margin for all three — which is why the same PHY reaches the full 100 m on Cat 6a but only its certified 55 m limit on Cat 6 (table above).

What the extra rating buys physically is geometry: tighter, *deliberately unequal* twist pitches per pair (so that crosstalk between two pairs does not accumulate in phase over the whole run), a cross-shaped plastic **spline** separator that keeps the four pairs apart in Cat 6a, and — in the shielded categories — foil around each pair and a braid or foil around the whole bundle, which converts crosstalk from a computation problem into a grounding problem.

<div style="max-width:820px">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="410" y="20" text-anchor="middle" font-size="14" fill="#222">What "category" buys: Cat 6a (UTP + spline) vs Cat 8 (S/FTP)</text>
  <circle cx="200" cy="165" r="105" fill="#2b2f38"/>
  <circle cx="200" cy="165" r="97" fill="#e8e4da"/>
  <path d="M 200 70 L 200 260 M 105 165 L 295 165" stroke="#c9b891" stroke-width="14" opacity="0.9"/>
  <circle cx="163" cy="130" r="26" fill="#f6f6f6" stroke="#1a6fc4" stroke-width="3"/>
  <circle cx="216" cy="122" r="26" fill="#f6f6f6" stroke="#1a6fc4" stroke-width="3"/>
  <circle cx="152" cy="205" r="26" fill="#f6f6f6" stroke="#e90" stroke-width="3"/>
  <circle cx="206" cy="216" r="26" fill="#f6f6f6" stroke="#e90" stroke-width="3"/>
  <circle cx="252" cy="163" r="24" fill="#f6f6f6" stroke="#2a2" stroke-width="3"/>
  <circle cx="258" cy="212" r="24" fill="#f6f6f6" stroke="#2a2" stroke-width="3"/>
  <circle cx="128" cy="158" r="22" fill="#f6f6f6" stroke="#a6a" stroke-width="3"/>
  <circle cx="121" cy="112" r="22" fill="#f6f6f6" stroke="#a6a" stroke-width="3"/>
  <text x="200" y="42" text-anchor="middle" font-size="12" fill="#222">twist pitch differs per pair (≈12–25 mm)</text>
  <text x="200" y="292" text-anchor="middle" font-size="12" fill="#555">Cat 6a: unshielded pairs + cross-shaped spline separator</text>
  <circle cx="590" cy="165" r="105" fill="#8a8f99"/>
  <circle cx="590" cy="165" r="97" fill="#d8dce2"/>
  <g>
    <circle cx="548" cy="128" r="30" fill="#e8e4da" stroke="#8a6a2a" stroke-width="2"/>
    <circle cx="548" cy="128" r="24" fill="none" stroke="#c9a83a" stroke-width="3"/>
    <circle cx="540" cy="120" r="9" fill="#d9a066"/><circle cx="557" cy="136" r="9" fill="#d9a066"/>
    <circle cx="634" cy="128" r="30" fill="#e8e4da" stroke="#8a6a2a" stroke-width="2"/>
    <circle cx="634" cy="128" r="24" fill="none" stroke="#c9a83a" stroke-width="3"/>
    <circle cx="626" cy="120" r="9" fill="#d9a066"/><circle cx="643" cy="136" r="9" fill="#d9a066"/>
    <circle cx="548" cy="204" r="30" fill="#e8e4da" stroke="#8a6a2a" stroke-width="2"/>
    <circle cx="548" cy="204" r="24" fill="none" stroke="#c9a83a" stroke-width="3"/>
    <circle cx="540" cy="196" r="9" fill="#d9a066"/><circle cx="557" cy="212" r="9" fill="#d9a066"/>
    <circle cx="634" cy="204" r="30" fill="#e8e4da" stroke="#8a6a2a" stroke-width="2"/>
    <circle cx="634" cy="204" r="24" fill="none" stroke="#c9a83a" stroke-width="3"/>
    <circle cx="626" cy="196" r="9" fill="#d9a066"/><circle cx="643" cy="212" r="9" fill="#d9a066"/>
  </g>
  <text x="590" y="42" text-anchor="middle" font-size="12" fill="#222">each pair individually foil-screened</text>
  <text x="590" y="292" text-anchor="middle" font-size="12" fill="#555">Cat 8: foil per pair (gold) + overall shield, 2000 MHz</text>
</svg>
</div>

<details><summary>Example problem</summary>

A category is specified at, say, 500 MHz, yet 10GBASE-T only puts 800 MBd (400 MHz Nyquist) on each pair. Why is the headroom up to 500 MHz not wasted?

<details><summary>Solution</summary>

Three reasons. First, the *channel* is cable plus connectors plus patch panels: the worst link in a channel must meet the rating up to the specified frequency, and real installations have reflections and impedance discontinuities that eat margin near the band edge. Second, the PHY's noise floor is set by crosstalk, which rises with frequency — the usable band is where signal-minus-crosstalk stays positive, not where the sine wave merely survives. Third, future PHYs reuse the same cable: the 500 MHz rating is exactly what let 25/40GBASE-T (802.3bq) later specify Cat 8 at 2000 MHz while leaving Cat 6a plants running 10GBASE-T with margin. A category is a *property of the cable*; the data rate is a property of the (PHY, cable, length) triple.

</details>

</details>

</details>

## Signalling: from PAM5 to PAM16

**Definition.** 1000BASE-T (802.3ab, 1999) uses 4D-PAM5: five voltage levels on each of 4 pairs, 125 MBd per pair, 8 bits per 4-pair symbol. 10GBASE-T (802.3an, 2006) uses PAM16 (16 levels) on each pair at 800 MBd, with two consecutive levels on a pair forming one 2-D symbol drawn from the **DSQ128** constellation (128 of the 16×16 possible pairs of levels), plus Tomlinson–Harashima precoding and LDPC FEC. 2.5/5GBASE-T (802.3bz, 2016) reuse the 10GBASE-T PHY at lower code rates so they can run on old cable.

How much information a noisy channel of bandwidth $`B` and signal-to-noise ratio can carry is bounded by Shannon's capacity formula — see [Communication](../Information-Theory/Communication.md) for the derivation; the example problem below applies it to one twisted pair.

<div style="max-width:820px">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="410" y="20" text-anchor="middle" font-size="14" fill="#222">Constellations: 4D-PAM5 (1000BASE-T, one pair) vs DSQ128 (10GBASE-T, 2-D)</text>
  <text x="150" y="48" text-anchor="middle" font-size="12" fill="#222">PAM5: 5 levels, 1 dimension</text>
  <line x1="60" y1="250" x2="240" y2="250" stroke="#999"/>
  <line x1="70" y1="250" x2="70" y2="70" stroke="#999"/>
  <g fill="#1a6fc4">
    <circle cx="70" cy="230" r="7"/><circle cx="70" cy="185" r="7"/><circle cx="70" cy="140" r="7"/><circle cx="70" cy="95" r="7"/>
  </g>
  <circle cx="70" cy="275" r="7" fill="#b02020"/>
  <text x="95" y="235" font-size="11" fill="#444">+2</text>
  <text x="95" y="190" font-size="11" fill="#444">+1</text>
  <text x="95" y="145" font-size="11" fill="#444">0</text>
  <text x="95" y="100" font-size="11" fill="#444">−1</text>
  <text x="95" y="280" font-size="11" fill="#b02020">−2</text>
  <text x="150" y="305" text-anchor="middle" font-size="11" fill="#555">4D-PAM5: 8 bits per 4-D symbol (2 per pair) → 4 pairs × 125 MBd = 1 Gb/s</text>
  <text x="560" y="48" text-anchor="middle" font-size="12" fill="#222">DSQ128: 128 allowed (level, next level) pairs out of the 16×16 grid</text>
  <g id="dsq-grid" transform="translate(400,60)"></g>
  <text x="560" y="305" text-anchor="middle" font-size="11" fill="#555">7 bits per 2-D symbol → 3.125 info bits per PAM16 symbol → 4 pairs × 800 MBd = 10 Gb/s</text>
</svg>
</div>
<script>
(function(){
  var g = document.getElementById('dsq-grid');
  if(!g) return;
  var cell = 13, n = 16, ns = 'http://www.w3.org/2000/svg';
  for(var i = 0; i < n; i++){
    for(var j = 0; j < n; j++){
      var x = i*cell, y = (n-1-j)*cell;
      if((i+j)%2 === 0){
        var c = document.createElementNS(ns,'circle');
        c.setAttribute('cx', x+cell/2); c.setAttribute('cy', y+cell/2); c.setAttribute('r', 4);
        c.setAttribute('fill', '#1a6fc4');
        g.appendChild(c);
      } else {
        var r = document.createElementNS(ns,'rect');
        r.setAttribute('x', x); r.setAttribute('y', y);
        r.setAttribute('width', cell); r.setAttribute('height', cell);
        r.setAttribute('fill', '#e8e8ee');
        g.appendChild(r);
      }
    }
  }
  var frame = document.createElementNS(ns,'rect');
  frame.setAttribute('x',0); frame.setAttribute('y',0);
  frame.setAttribute('width', n*cell); frame.setAttribute('height', n*cell);
  frame.setAttribute('fill','none'); frame.setAttribute('stroke','#999');
  g.appendChild(frame);
})();
</script>

<details><summary>Details: why PAM16 and DSQ128</summary>

10GBASE-T must fit 2.5 Gb/s into each pair's usable bandwidth (~400 MHz Nyquist for 800 MBd). That is 6.25 bits per symbol-period — impossible with 2-level signalling (1 bit) or even PAM4 (2 bits). The trick is to treat **two consecutive PAM16 symbol intervals on a pair as one 2-D symbol**: the 16×16 grid of possible (level, next level) pairs has 256 points, and the DSQ128 constellation keeps only the 128 checkerboard ones, which maximises the minimum distance between points and roughly halves the power needed for the same error rate. (So the "two dimensions" are *time* — two successive levels on the same wire — not two wires or two carriers.)

**Tomlinson–Harashima precoding** moves part of the equalisation burden to the *transmitter*: the sender pre-distorts the signal using its knowledge of the channel (learned during link training), so the receiver's equaliser can be simpler and the constellation points land where expected. This matters because a 10GBASE-T receiver is already doing echo, NEXT, and FEXT cancellation on every sample (next section).

**Example.** Compare the two generations on the same four-pair cable: 1000BASE-T needs 2 bits per pair per symbol period and gets them from 5 levels in one dimension; 10GBASE-T needs 3.125 information bits per PAM16 symbol and gets them from a 2-D constellation of 128 points spanning two symbol periods. Each doubling of bits-per-symbol costs roughly 3 dB of signal-to-noise ratio — which is why 10GBASE-T spends its entire noise budget on cancellation, precoding, and FEC before it can afford the constellation at all.

<details><summary>Example problem</summary>

Using the Shannon capacity formula $`C = B\log_2(1 + \mathrm{SNR})` : 10GBASE-T carries 2.5 Gb/s per pair over ~400 MHz of bandwidth. What minimum SNR does each pair need, and why does the real PHY need more?

<details><summary>Solution</summary>

Spectral efficiency = 2.5 Gb/s ÷ 400 MHz = 6.25 bits/s/Hz. Solve log₂(1 + SNR) = 6.25: SNR = 2^6.25 − 1 ≈ 75.6, i.e. ≈ 18.8 dB. The real PHY needs more margin because DSQ128 is not Shannon-optimal, the LDPC code has overhead, and alien crosstalk from neighbouring cables (in the same bundle) adds noise the receiver can only partly cancel. This is exactly why Cat 6a specifies tighter twists and a spline, and why Cat 6 only reaches its certified 55 m limit (table above).

</details>

</details>

</details>

## Noise on the four pairs: echo, NEXT, FEXT

**Definition.** A 10GBASE-T receiver must digitally subtract three interference terms from every sample on every wire: **echo** (its own transmitter's signal reflecting off impedance discontinuities back into its own receiver), **near-end crosstalk (NEXT)** (a neighbour pair's transmitter at the *same* end leaking into this receiver), and **far-end crosstalk (FEXT)** (a neighbour pair's transmitter at the *far* end leaking in, attenuated by the whole cable). That is 7 interferers per wire (1 echo + 3 NEXT + 3 FEXT), each cancelled by an adaptive filter trained on the channel response it measured.

<div style="max-width:860px">
<svg viewBox="0 0 860 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="430" y="20" text-anchor="middle" font-size="14" fill="#222">The 7 interferers of pair 1, and where each comes from</text>
  <rect x="30" y="60" width="150" height="240" rx="8" fill="#2b6cb8"/>
  <text x="105" y="85" text-anchor="middle" font-size="13" fill="#fff">Transmitter</text>
  <rect x="680" y="60" width="150" height="240" rx="8" fill="#2b8a4a"/>
  <text x="755" y="85" text-anchor="middle" font-size="13" fill="#fff">Receiver</text>
  <g stroke-width="3">
    <line x1="180" y1="110" x2="680" y2="110" stroke="#1a6fc4"/>
    <line x1="180" y1="170" x2="680" y2="170" stroke="#e08020"/>
    <line x1="180" y1="230" x2="680" y2="230" stroke="#2a2"/>
    <line x1="180" y1="290" x2="680" y2="290" stroke="#a6a"/>
  </g>
  <text x="430" y="103" text-anchor="middle" font-size="11" fill="#1a6fc4">pair 1 (the wire we follow)</text>
  <text x="430" y="163" text-anchor="middle" font-size="11" fill="#a05a10">pair 2</text>
  <text x="430" y="223" text-anchor="middle" font-size="11" fill="#1a7a2a">pair 3</text>
  <text x="430" y="283" text-anchor="middle" font-size="11" fill="#7a3a8a">pair 4</text>
  <path d="M 200 110 q 25 30 0 60" fill="none" stroke="#b02020" stroke-width="2.5" marker-end="url(#arrR)"/>
  <text x="232" y="146" font-size="11" fill="#b02020">echo (own TX, reflected)</text>
  <path d="M 195 170 q -15 -25 -8 -52" fill="none" stroke="#b02020" stroke-width="2.5" marker-end="url(#arrR)"/>
  <path d="M 195 230 q -20 -35 -12 -105" fill="none" stroke="#b02020" stroke-width="2.5" marker-end="url(#arrR)"/>
  <path d="M 195 290 q -25 -60 -16 -158" fill="none" stroke="#b02020" stroke-width="2.5" marker-end="url(#arrR)"/>
  <text x="40" y="330" font-size="11" fill="#b02020">red: NEXT — neighbour transmitters at the same end leak in</text>
  <path d="M 665 170 q 15 -25 8 -52" fill="none" stroke="#1a7ab0" stroke-width="2.5" marker-end="url(#arrB)"/>
  <path d="M 665 230 q 20 -35 12 -105" fill="none" stroke="#1a7ab0" stroke-width="2.5" marker-end="url(#arrB)"/>
  <path d="M 665 290 q 25 -60 16 -158" fill="none" stroke="#1a7ab0" stroke-width="2.5" marker-end="url(#arrB)"/>
  <text x="600" y="330" font-size="11" fill="#1a7ab0">blue: FEXT — far-end transmitters, attenuated by the cable</text>
  <defs>
    <marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#b02020"/>
    </marker>
    <marker id="arrB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a7ab0"/>
    </marker>
  </defs>
</svg>
</div>

<details><summary>Details: how cancellation actually works</summary>

All three interferers are *deterministic* given the channel: the cable is a linear, time-invariant system over the life of a link, so each interferer is a filtered copy of a signal the PHY chip itself knows (it generated the transmit symbols on all four pairs, and it measured the channel during link training). The receiver therefore runs one adaptive filter per interferer — 7 per wire, 28 per link — subtracting each filtered copy from the received sample before the slicer decides which constellation point was sent.

- **Echo** is the strongest term (the culprit is metres away, at the connector) and needs the longest filter; it is the same problem a voice modem solves with its hybrid, but at 800 MBd.
- **NEXT** is strong too (the interfering transmitter sits in the same chip, metres away) and is continuous, so the canceller runs on every sample.
- **FEXT** is the weakest term, because the interfering signal travelled the whole cable before leaking in — which is why FEXT cancellation is the first to be relaxed in the cheaper 2.5/5GBASE-T PHYs.

What *cannot* be cancelled this way is **alien crosstalk**: interference from transmitters in *other* cables bundled in the same tray, whose symbols the PHY chip has no knowledge of. Alien crosstalk is the reason the certified reach limits in the table above are shorter than a within-the-cable analysis suggests, and the reason Cat 6a's specification added alien-crosstalk limits (TIA TSB-155 documented the interim Cat 6 limits).

<details><summary>Example problem</summary>

Why does FEXT matter less to a receiver than NEXT, even though both leak the same power at the source?

<details><summary>Solution</summary>

The FEXT aggressor's signal must travel the full cable length *before* it leaks into the victim pair, so it arrives attenuated by the cable's insertion loss at the coupling frequency — tens of dB on a 100 m run. The NEXT aggressor leaks in at the receiver's own end, having travelled essentially no cable at all. Since insertion loss grows with both frequency and length, FEXT shrinks as links get longer and faster, while NEXT stays put — which is why near-end isolation (connector quality, twist geometry) is the harder constraint in every twisted-pair standard.

</details>

</details>

</details>

## Autonegotiation

**Definition.** Autonegotiation (IEEE 802.3 clause 28, extended by 802.3bz for 2.5/5G) is the protocol by which two link partners agree on speed, duplex, and flow control *before* the link comes up: each side sends bursts of **fast link pulses (FLPs)** — 17 pulse positions encoding a 16-bit Link Code Word advertising its abilities — repeatedly, until both sides have exchanged capability words and a priority resolution picks the highest common ability.

<div style="max-width:820px">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="410" y="20" text-anchor="middle" font-size="14" fill="#222">Bringing up a link: negotiate, then train</text>
  <rect x="40" y="40" width="160" height="34" rx="6" fill="#2b6cb8"/><text x="120" y="62" text-anchor="middle" font-size="12" fill="#fff">Switch port</text>
  <rect x="620" y="40" width="160" height="34" rx="6" fill="#2b8a4a"/><text x="700" y="62" text-anchor="middle" font-size="12" fill="#fff">NIC</text>
  <line x1="200" y1="57" x2="620" y2="57" stroke="#555"/>
  <g fill="#e08020">
    <rect x="240" y="50" width="3" height="14"/><rect x="248" y="50" width="3" height="14"/><rect x="262" y="50" width="3" height="14"/><rect x="270" y="50" width="3" height="14"/><rect x="284" y="50" width="3" height="14"/>
    <rect x="540" y="50" width="3" height="14"/><rect x="548" y="50" width="3" height="14"/><rect x="562" y="50" width="3" height="14"/><rect x="576" y="50" width="3" height="14"/>
  </g>
  <text x="410" y="42" text-anchor="middle" font-size="11" fill="#a05a10">FLP bursts: 16-bit Link Code Words (abilities)</text>
  <text x="410" y="100" text-anchor="middle" font-size="11" fill="#555">both sides repeat until each has the other's word → highest common ability wins (e.g. 5GBASE-T, full duplex)</text>
  <rect x="240" y="120" width="340" height="26" rx="4" fill="#eeeeee" stroke="#999"/>
  <text x="410" y="137" text-anchor="middle" font-size="11" fill="#333">link training: send known training patterns, measure the channel</text>
  <text x="410" y="165" text-anchor="middle" font-size="11" fill="#555">each receiver learns its echo/NEXT/FEXT responses, sets equalisers &amp; cancellers, checks the margin</text>
  <rect x="290" y="190" width="240" height="26" rx="4" fill="#2b8a4a"/>
  <text x="410" y="207" text-anchor="middle" font-size="12" fill="#fff">LINK UP at the agreed rate</text>
  <text x="410" y="240" text-anchor="middle" font-size="11" fill="#555">if training shows the margin is too thin, the PHYs renegotiate one rate down</text>
</svg>
</div>

<details><summary>Details: negotiation vs training — two different decisions</summary>

Autonegotiation is often confused with link training, but they answer different questions:

- **Negotiation** (the FLP exchange) is a *policy* step, done at the physical layer with analogue pulses precisely so it works when nothing else about the link is configured: it answers "what rates do we both support?" It uses a priority table (10G over 5G over 2.5G over 1G, full over half duplex) so the outcome is deterministic even if both sides advertise overlapping sets. A port that supports 1/2.5/5/10 GbE talking to a 1 Gb/s-only printer settles on 1 Gb/s without any configuration.
- **Training** is a *physics* step, done after the rate is chosen: the two PHYs send known sequences so each receiver can learn the actual channel — its echo, NEXT, and FEXT impulse responses — and converge the cancellers. Training is where the *real* cable is measured, and it is the step that can fail: if the measured margin at the negotiated rate is too thin (a long run on old cable, a bundle full of alien crosstalk), the PHYs fall back and renegotiate one rate down. This is why a 10GBASE-T port on a marginal Cat 6 run does not sit there half-broken — it comes up at 2.5 or 5 Gb/s.

The practical consequence: **the cable category, not the port speed, sets the ceiling.** The negotiation advertises what the silicon can do; training measures what the copper can do; the link runs at the lower of the two.

<details><summary>Example problem</summary>

A 2015 laptop (1 Gb/s only) is plugged into a new multi-gigabit switch. No link comes up until the switch port is set to "1 Gb/s auto". Why did plain autonegotiation fail here, and what does this illustrate?

<details><summary>Solution</summary>

Autonegotiation requires *both* sides to speak it. Old 10/100-only hardware used the same wire pulses for a different mechanism (parallel detection), and a mismatch between a legacy auto-negotiating port and a fixed-speed port can leave each side waiting for the other — the classic "one side 100 full, other side 100 half" duplex mismatch, or no link at all. Forcing the port to "1 Gb/s auto" makes it advertise only that ability and accept the legacy partner's pulses. The lesson: autonegotiation is a protocol with failure modes of its own, and "auto" on both ends is the only configuration that resolves them by construction.

</details>

</details>

</details>

## Copper vs. fibre Ethernet

**Definition.** The same Ethernet MAC and frames run over two PHY families: **?BASE-T** (twisted pair, copper, up to 100 m) and **?BASE-R/SR/LR** (serialised on optical fibre, from tens of metres to 80 km depending on the PHY and fibre grade). 10GBASE-T and 10GBASE-R carry identical packets at identical rates over different media.

<div style="max-width:860px">
<svg viewBox="0 0 860 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="430" y="20" text-anchor="middle" font-size="14" fill="#222">Rate vs reach: copper PHYs (dots) vs fibre PHYs (diamonds)</text>
  <line x1="70" y1="300" x2="820" y2="300" stroke="#999"/>
  <line x1="70" y1="40" x2="70" y2="300" stroke="#999"/>
  <g font-size="10" fill="#555">
    <text x="62" y="316">1 m</text><text x="197" y="316">10 m</text><text x="330" y="316">100 m</text><text x="462" y="316">1 km</text><text x="595" y="316">10 km</text><text x="726" y="316">80 km</text>
    <text x="28" y="304">10 M</text><text x="34" y="216">1 G</text><text x="30" y="128">10 G</text><text x="26" y="46">100 G</text>
  </g>
  <g stroke="#eeeeee">
    <line x1="70" y1="212" x2="820" y2="212"/><line x1="70" y1="124" x2="820" y2="124"/><line x1="70" y1="40" x2="820" y2="40"/>
    <line x1="205" y1="40" x2="205" y2="300"/><line x1="340" y1="40" x2="340" y2="300"/><line x1="475" y1="40" x2="475" y2="300"/><line x1="610" y1="40" x2="610" y2="300"/><line x1="745" y1="40" x2="745" y2="300"/>
  </g>
  <rect x="70" y="40" width="270" height="260" fill="#1a6fc4" opacity="0.07"/>
  <text x="205" y="58" text-anchor="middle" font-size="11" fill="#1a6fc4">copper: ≤ 100 m (30 m for Cat 8 rates)</text>
  <g fill="#1a6fc4" stroke="#0a3a6a">
    <circle cx="340" cy="212" r="6"/><circle cx="340" cy="168" r="6"/><circle cx="340" cy="124" r="6"/>
    <circle cx="322" cy="212" r="6"/><circle cx="305" cy="124" r="6"/>
  </g>
  <g font-size="10" fill="#1a6fc4">
    <text x="350" y="216">1000BASE-T (100 m)</text>
    <text x="350" y="172">2.5/5GBASE-T (100 m)</text>
    <text x="350" y="120">10GBASE-T (100 m)</text>
    <text x="228" y="228">Cat 6, 55 m limit</text>
    <text x="150" y="132">10GBASE-T on Cat 8 (30 m)</text>
  </g>
  <g fill="#b02020" stroke="#701010">
    <path d="M 392 124 l 7 7 l -7 7 l -7 -7 z"/>
    <path d="M 527 124 l 7 7 l -7 7 l -7 -7 z"/>
    <path d="M 662 124 l 7 7 l -7 7 l -7 -7 z"/>
    <path d="M 392 168 l 7 7 l -7 7 l -7 -7 z"/>
  </g>
  <g font-size="10" fill="#b02020">
    <text x="402" y="120">10GBASE-SR (26–400 m, MMF)</text>
    <text x="537" y="120">10GBASE-LR (10 km)</text>
    <text x="600" y="98">10GBASE-ER (40 km)</text>
    <text x="402" y="185">10GBASE-SR on OM3 (26 m min.)</text>
  </g>
  <text x="430" y="332" text-anchor="middle" font-size="11" fill="#555">x: reach (log) · y: data rate (log) · the crossover is the 100 m wall where copper's attenuation wins</text>
</svg>
</div>

<details><summary>Details</summary>

Copper wins on cost, power, and convenience (power over Ethernet, existing building wiring); fibre wins on reach, immunity to electrical noise, and bandwidth ceiling. The crossover is around 100 m — which is exactly why 10GBASE-T stops there. The physics is unforgiving on both sides: copper's attenuation grows roughly as $`\sqrt{f}` per metre (skin effect — see [Cabled external interconnects](./Cabled-external-interconnects.md)), while fibre's attenuation is a flat ~0.2–3 dB/km with no frequency-dependent wall below hundreds of GHz. So every doubling of a copper PHY's rate must be paid for in *distance*, in cable quality, or in silicon (DSP, FEC) — fibre pays none of that tax until reach is measured in kilometres.

Per-PHY fibre reaches vary widely — 10GBASE-SR alone spans roughly 26–400 m depending on the fibre grade (OM3 vs OM4), short-reach copper twinax (10GBASE-CR) sits below even that at ~7 m, and 10GBASE-ER reaches 40 km — but the order of magnitude is what matters: fibre begins where copper's 100 m wall ends.

See [Optical interconnects](./Optical-interconnects.md) for the fibre side, and [Board-level interconnects](./Board-level-interconnects.md) for the chip-to-chip link (XFI) between the MAC and the PHY itself.

<details><summary>Example problem</summary>

A campus needs a 10 Gb/s link between two buildings 300 m apart, across a parking lot. The buildings are already wired with copper between rooms. What medium do you run between the buildings, and why is copper not even considered for that span?

<details><summary>Solution</summary>

Fibre — a pair of 10GBASE-SR (or -LR) transceivers with a 300 m fibre run; OM4 multimode suffices at 300 m for 10GBASE-SR. Copper fails on three independent counts: (1) no twisted-pair PHY reaches 300 m at any rate — the longest certified reach in the table above is 100 m; (2) even if it did, an outdoor run crosses a lightning/ground-potential boundary, and copper would couple surges between the buildings' electrical grounds — fibre is inherently galvanically isolated; (3) the lot is an EMI environment that unshielded copper would have to be engineered against. Inside each building, the existing copper plant takes over from the switch — the division of labour is: copper for the last 100 m, fibre for everything longer.

</details>

</details>

</details>

## Link budget, interactively

The simulation below puts the pieces together: pick a cable category and drag the length, and watch which PHY rates close the link — the available SNR (from insertion loss and crosstalk, both growing with length and frequency) against each PHY's Shannon requirement plus an implementation margin, with the standards' certified reach limits enforced on top.

<iframe src="./Ethernet-copper.simulation.html" title="Twisted-pair link budget: pick a cable category and length, see which PHY rates close the link" style="width:100%;height:640px;border:1px solid #ccc"></iframe>

Notice the two distinct failure modes: below the certified reach, a rate fails only when the *computed* margin goes negative (physics); beyond the certified reach, it fails even when the margin looks positive, because the certification also accounts for alien crosstalk from neighbouring cables, which the within-the-cable model cannot see (standards + installation practice).

## Quiz

<details><summary>Example problem</summary>

A switch port and a NIC both support 1/2.5/5/10 GbE (NBASE-T). They are connected by 60 m of Cat 6 cable. Which rate will they settle on, and why?

<details><summary>Solution</summary>

Not 10 Gb/s: at 60 m, Cat 6 exceeds its certified 10GBASE-T reach limit (55 m — see the table above; TIA TSB-155 documented that limit), and the link-training phase of 10GBASE-T measures the channel's crosstalk and attenuation — the receivers will refuse to close the link at that rate. The autonegotiation fallback is 5 Gb/s (802.3bz), which fits Cat 6's 250 MHz bandwidth at the full 100 m. The lesson: the *cable category*, not the port speed, sets the ceiling — negotiation advertises what the silicon can do, training measures what the copper can do, and the link runs at the lower of the two.

</details>

</details>
