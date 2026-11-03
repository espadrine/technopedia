# DisplayPort and HDMI

DisplayPort and HDMI are the two cabled **display interconnects**: one-way, latency-critical video (and audio) links from a *source* (a GPU) to a *sink* (a monitor or TV). HDMI dominates TVs and consoles; DisplayPort dominates PC monitors, docks, and anything tunnelled through [Thunderbolt](./Thunderbolt.md) or USB4 (see [USB](./USB.md)). Both descend from the same problem: moving a *timed, constant-rate* stream of pixels down a cable with no possibility of retransmission — a lost pixel is simply gone, so the physical layer is engineered for very low error rates rather than for retries. They are one of the five families of [cabled external interconnects](./Cabled-external-interconnects.md).

> **Authoritative sources**
> - [VESA DisplayPort standards](https://www.vesa.org/vesa-standards/)
> - [VESA Display Stream Compression (DSC)](https://vesa.org/vesa-display-compression-codecs/dsc/)
> - [HDMI specification (HDMI Licensing Administrator / HDMI Forum)](https://www.hdmi.org/spec21sub/specification)

## The shared arithmetic: the display bandwidth budget

**Definition.** A display link is a *constant-rate budget*. A video mode requires a payload rate

$`R \;=\; W \times H \times f_{\text{refresh}} \times b_{\text{blank}} \times n_{\text{bits/px}}`

where $`b_{\text{blank}}` accounts for the horizontal and vertical blanking intervals (the times per frame in which no active pixels are sent, but the link still transmits). The link can carry its **line rate** × the *code efficiency* of its line coding:

<table>
<tr><th>Line coding</th><th>Used by</th><th>Efficiency</th></tr>
<tr><td>8b/10b (TMDS-style)</td><td>HDMI 1.x–2.0, DisplayPort RBR–HBR3, SATA, PCIe Gen1/2</td><td>8/10 = 0.80</td></tr>
<tr><td>16b/18b</td><td>HDMI 2.1 FRL</td><td>16/18 ≈ 0.889</td></tr>
<tr><td>128b/132b</td><td>DisplayPort UHBR (DP 2.x), PCIe Gen3+</td><td>128/132 ≈ 0.970</td></tr>
</table>

Bits per pixel depend on colour format: 4:4:4 RGB sends 3 × bpc bits per pixel, 4:2:2 sends 2 × bpc, 4:2:0 sends 1.5 × bpc (chroma subsampling trades colour resolution for bandwidth).

**A note on blanking.** The factor $`b_{\text{blank}} = 1.2` used in the hand calculations below is a *deliberately conservative round number*, not a spec value. Real reduced-blanking timings (VESA CVT-RB) land around 1.03–1.08 for common modes (≈1.05 for 4K60), while the legacy CEA-861 4K60 timing is ≈1.19. When reproducing these sums against a spec sheet, use the actual timing's pixel clock — the calculator below lets you set the factor explicitly and estimate the CVT-RB value.

Drag the controls: every verdict below ("does 4K60 HDR fit on HDMI 2.0?") is this one computation.

<iframe src="./DisplayPort-and-HDMI.simulation.html" title="Interactive display bandwidth budget calculator: resolution, refresh, bpc, chroma, blanking and link coding vs required rate" style="width:100%;height:640px;border:1px solid #ccc"></iframe>

<details><summary>Details</summary>

The budget has only four levers, and every product decision about display links is one of them:

1. **Fewer pixels** (lower resolution or refresh) — what "dynamic resolution scaling" and reduced-blanking timings do.
2. **Fewer bits per pixel** — 8 bpc instead of 10, or 4:2:2/4:2:0 chroma subsampling (why "HDR on HDMI 2.0" often silently means 4:2:2).
3. **More link bandwidth** — more lanes, a faster link rate, or a more efficient line code.
4. **Compression** — DSC ([see Compression](../../Information-Theory/Compression.md)), which is *visually lossless* and compresses roughly 3×, at the cost of a line-width latency of a few microseconds.

Because the stream is constant-rate, there is no "burst" trick: if the required rate exceeds the payload, the mode simply does not display (or the source silently falls back to one of the levers above — which is why a monitor sometimes drops to 30 Hz or 4:2:2 after you connect it with the wrong cable).

<details><summary>Example problem</summary>

A 5K display (5120 × 2880) at 60 Hz, RGB 4:4:4, 10 bpc. Does it fit on a DisplayPort 1.4 link at HBR3 (32.4 Gb/s line, 25.92 Gb/s payload)? What is the cheapest fix?

<details><summary>Solution</summary>

Active rate: 5120 × 2880 × 60 ≈ 884.7 Mpx/s × 30 bits ≈ 26.5 Gb/s. With blanking: × 1.2 ≈ 31.8 Gb/s, or × 1.05 (CVT-RB) ≈ 27.8 Gb/s. Both exceed the 25.92 Gb/s payload — **no**. Cheapest fixes in order: chroma subsampling to 4:2:2 (20 bits/px → ≈ 18.5–21.2 Gb/s, fits), or a DP 2.x UHBR10 link (payload ≈ 38.8 Gb/s), or DSC. This is exactly why 5K displays shipped with (and effectively required) DisplayPort, not HDMI 2.0.

</details>
</details>

</details>

## HDMI: TMDS and Fixed Rate Link

**Definition.** HDMI 1.x–2.0 carries video over **three TMDS data lanes plus a dedicated clock lane**. Line rates: 4.95 Gb/s (HDMI 1.0–1.2), 10.2 Gb/s (HDMI 1.3 *and* 1.4 — 1.4 added features like Ethernet and ARC, not bandwidth), and 18 Gb/s (HDMI 2.0, 6 Gb/s per lane). After 8b/10b coding the video payload is 3.96, 8.16 and 14.4 Gb/s respectively. HDMI 2.1 replaces TMDS with **Fixed Rate Link (FRL)**: 4 lanes at up to 12 Gb/s each = 48 Gb/s line rate (≈ 42.7 Gb/s payload after 16b/18b coding), plus DSC compression for 8K and very-high-refresh modes.

<div style="max-width:840px">
<svg viewBox="0 0 840 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="300" y="22" font-size="14" fill="#222" text-anchor="middle">HDMI (TMDS): a raw, timed pixel stream</text>
  <rect x="20" y="45" width="120" height="80" rx="6" fill="#2b6cb8"/>
  <text x="80" y="80" font-size="12" fill="#fff" text-anchor="middle">GPU</text>
  <text x="80" y="96" font-size="10" fill="#cfe3f7" text-anchor="middle">(source)</text>
  <rect x="580" y="45" width="120" height="80" rx="6" fill="#2f855a"/>
  <text x="640" y="80" font-size="12" fill="#fff" text-anchor="middle">TV</text>
  <text x="640" y="96" font-size="10" fill="#d7f0df" text-anchor="middle">(sink)</text>
  <line x1="140" y1="62" x2="580" y2="62" stroke="#1a6fc4" stroke-width="3"/>
  <text x="355" y="56" font-size="11" fill="#1a6fc4" text-anchor="middle">Lane 2 — data</text>
  <line x1="140" y1="88" x2="580" y2="88" stroke="#1a6fc4" stroke-width="3"/>
  <text x="355" y="82" font-size="11" fill="#1a6fc4" text-anchor="middle">Lane 1 — data</text>
  <line x1="140" y1="114" x2="580" y2="114" stroke="#1a6fc4" stroke-width="3"/>
  <text x="355" y="108" font-size="11" fill="#1a6fc4" text-anchor="middle">Lane 0 — data</text>
  <line x1="140" y1="140" x2="580" y2="140" stroke="#c05621" stroke-width="3" stroke-dasharray="8 5"/>
  <text x="355" y="134" font-size="11" fill="#c05621" text-anchor="middle">Clock lane — the pixel clock itself</text>
  <text x="355" y="172" font-size="11" fill="#666" text-anchor="middle">10 bits per byte, transition-minimised; the sink locks its refresh to the clock lane</text>

  <text x="300" y="212" font-size="14" fill="#222" text-anchor="middle">DisplayPort: packetised lanes + a control side channel</text>
  <rect x="20" y="232" width="120" height="80" rx="6" fill="#2b6cb8"/>
  <text x="80" y="267" font-size="12" fill="#fff" text-anchor="middle">GPU</text>
  <text x="80" y="283" font-size="10" fill="#cfe3f7" text-anchor="middle">(source)</text>
  <rect x="580" y="232" width="120" height="80" rx="6" fill="#2f855a"/>
  <text x="640" y="267" font-size="12" fill="#fff" text-anchor="middle">Monitor</text>
  <text x="640" y="283" font-size="10" fill="#d7f0df" text-anchor="middle">(sink)</text>
  <line x1="140" y1="248" x2="580" y2="248" stroke="#1a6fc4" stroke-width="3"/>
  <line x1="140" y1="274" x2="580" y2="274" stroke="#1a6fc4" stroke-width="3"/>
  <line x1="140" y1="300" x2="580" y2="274" stroke="none"/>
  <line x1="140" y1="300" x2="580" y2="300" stroke="#1a6fc4" stroke-width="3"/>
  <line x1="140" y1="326" x2="580" y2="326" stroke="#1a6fc4" stroke-width="3"/>
  <text x="355" y="242" font-size="11" fill="#1a6fc4" text-anchor="middle">Lane 3</text>
  <text x="355" y="268" font-size="11" fill="#1a6fc4" text-anchor="middle">Lane 1</text>
  <text x="355" y="294" font-size="11" fill="#1a6fc4" text-anchor="middle">Lane 0</text>
  <text x="355" y="320" font-size="11" fill="#1a6fc4" text-anchor="middle">Lane 2</text>
  <!-- packet cells on lane 3 -->
  <g font-size="8" fill="#fff" text-anchor="middle">
    <rect x="150" y="243" width="52" height="10" fill="#6b46c1"><title>MSA: mode / timing metadata</title></rect>
    <text x="176" y="243.5" dy="8">MSA</text>
    <rect x="242" y="243" width="90" height="10" fill="#3182ce"><title>Video stream payload</title></rect>
    <text x="292" y="243" dy="8">video payload</text>
    <rect x="342" y="243" width="60" height="10" fill="#38a169"><title>Secondary data: audio, HDR metadata</title></rect>
    <text x="372" y="243" dy="8">audio</text>
    <rect x="412" y="243" width="70" height="10" fill="#d69e2e"><title>SDP: HDR, adaptive-sync metadata</title></rect><text x="447" y="243" dy="8">SDP (HDR, VRR)</text>
    <rect x="510" y="243" width="60" height="10" fill="#3182ce"><title>Video payload</title></rect>
  </g>
  <line x1="140" y1="352" x2="580" y2="352" stroke="#805ad5" stroke-width="2"/>
  <text x="355" y="347" font-size="11" fill="#805ad5" text-anchor="middle">AUX channel (low-speed): EDID/DisplayID reads, link training, sideband messages</text>
  <line x1="140" y1="374" x2="580" y2="374" stroke="#c05621" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="355" y="369" font-size="11" fill="#c05621" text-anchor="middle">HPD wire — dedicated hot-plug detect</text>
  <text x="420" y="394" font-size="11" fill="#666" text-anchor="middle">Each lane carries packets; timing metadata travels in the packets, not as a separate clock lane</text>
</svg>
</div>

<details><summary>Details</summary>

**TMDS** (Transition-Minimised Differential Signalling) sends each byte as a 10-bit symbol chosen to minimise signal transitions and balance DC — a scheme HDMI inherited from DVI (1999), which HDMI 1.0 (2002) extended with audio, CEC device control, and HDCP copy protection. The separate clock lane is the giveaway that this is a *timed* stream: the sink recovers the pixel clock from a dedicated pair and locks its refresh to it, so the line rate of each data lane is an exact multiple of the pixel clock.

**HDMI 2.1's Fixed Rate Link** is a different philosophy: the link runs at a fixed rate decoupled from the pixel clock, and video timing is conveyed by the link structure itself. FRL does *not* do away with structure: the link still sends repeating training and alignment patterns, and the sink recovers video timing from the fixed-rate link clock together with the timing references carried in the packetised stream — the pixel clock is no longer the rhythm of the cable, but a derived quantity. This decoupling is what lets one fixed-rate link serve every video mode, and what lets DSC compress modes (8K60, 4K240) that would never fit uncompressed.

Sources: [HDMI 2.1 specification (HDMI Licensing Administrator)](https://www.hdmi.org/spec21sub/specification) · [HDMI Forum specifications overview](https://hdmiforum.org/specifications/)

<details><summary>Example problem</summary>

Can HDMI 2.0 (18 Gb/s line, 14.4 Gb/s video payload after 8b/10b) carry 3840 × 2160 @ 60 Hz, RGB 4:4:4, 10 bpc?

<details><summary>Solution</summary>

Active pixel rate: 3840 × 2160 × 60 ≈ 497.7 Mpx/s. With the conservative 1.2× blanking: 497.7 Mpx/s × 1.2 × 30 bits ≈ 17.9 Gb/s > 14.4 — **no**. With realistic CVT-RB blanking (≈1.05) it is still ≈ 15.7 Gb/s, so the conclusion is robust to the blanking assumption. At 8 bpc it needs ≈ 11.9 Gb/s (1.2×) or ≈ 10.4 Gb/s (CVT-RB) and fits. This is the origin of the "4K60 HDR needs HDMI 2.1, or 4:2:2 chroma, or DSC" rule of thumb.

</details>
</details>
</details>

## DisplayPort: packetised lanes, AUX and link training

**Definition.** DisplayPort (VESA, 2006) sends video as *packets* over 1–4 differential lanes. Link rates: RBR 6.48, HBR 10.8, HBR2 21.6, HBR3 32.4 Gb/s aggregate (8b/10b coded, so HBR3 yields a 25.92 Gb/s payload — DP 1.4 era); UHBR 10/13.5/20 in DP 2.x reach 40/54/80 Gb/s (128b/132b coded). Link control uses a **dedicated hot-plug-detect (HPD) wire** plus a separate low-speed **AUX channel** carrying EDID/DisplayID reads (via DPCD), link training, and sideband messages. **MST** (Multi-Stream Transport) multiplexes several displays over one link.

<details><summary>Details</summary>

DisplayPort was designed by VESA as a royalty-free, packetised successor to analog VGA and TMDS-era DVI. Packetisation is the key structural difference from HDMI 1.x: because the link carries packets rather than a raw pixel stream, it can

- multiplex several displays over one cable (**MST**) — the basis of most USB-C and Thunderbolt docks;
- tunnel cleanly inside [Thunderbolt](./Thunderbolt.md) and USB4, which carry DisplayPort *packets* as one of their tunnel types — the reason docks speak DisplayPort and not HDMI;
- add metadata (HDR, adaptive sync) as new packet types without changing the pixel format.

**Link training** is the other signature mechanism. On connect, the source reads the sink's capabilities over AUX, then sends test patterns while sweeping the PHY's *voltage swing* and *pre-emphasis* levels until the receiver reports a clean eye. The link therefore adapts to the cable it actually finds — a short good cable trains at low swing, a long cheap cable forces maximum swing and pre-emphasis — instead of being designed for one worst case. Try it:

<div style="max-width:660px">
<canvas id="ltCanvas" width="640" height="250" style="max-width:100%;background:#fafafa;border:1px solid #ccc"></canvas>
<div style="margin-top:6px">
  <label>Cable quality:
    <select id="ltCable">
      <option value="0">short, good</option>
      <option value="1" selected>typical</option>
      <option value="2">long</option>
      <option value="3">long + cheap</option>
    </select></label>
  <button id="ltAuto">Auto-train</button>
  <button id="ltStep">Step</button>
  <button id="ltReset">Reset</button>
</div>
<div id="ltOut" style="font-family:ui-monospace,monospace;font-size:12.5px;margin-top:6px;line-height:1.5"></div>
</div>
<script>
(function(){
  var cv = document.getElementById('ltCanvas'), ctx = cv.getContext('2d');
  var out = document.getElementById('ltOut');
  var ATT = [0.12, 0.32, 0.52, 0.72];
  var NAMES = ['short, good','typical','long','long + cheap'];
  var THRESH = 0.30;
  var s = 0, p = 0, timer = null;

  function ampOf(s){ return 0.55 + 0.15 * s; }
  function eyeOf(s, p, att){
    var a = ampOf(s);
    var e = a * (1 - att) + p * 0.28 * att * a;
    e -= p * 0.06 * (1 - att) * a;      // pre-emphasis overshoots on good cables
    return Math.min(e, a * 0.92);
  }
  function sig(bits, t, a, att, pre){
    var h = (0.10 + 0.45 * att) / 2, v = bits[0];
    for (var i = 1; i < 4; i++){
      var d = bits[i] - bits[i-1];
      if (!d) continue;
      var x = t - i;
      var u = Math.max(-1, Math.min(1, x / h));
      v += d * 0.5 * (1 + Math.sin(u * Math.PI / 2));
      if (x > 0) v += d * att * 0.30 * Math.exp(-5 * x) * Math.sin(2 * Math.PI * 2.5 * x);
      if (pre > 0 && x > 0) v += d * pre * 0.20 * Math.min(att * 1.6, 1) *
                                 Math.exp(-Math.pow((x - 0.10) / 0.05, 2));
    }
    return v * a;
  }
  function draw(){
    var att = ATT[+document.getElementById('ltCable').value];
    var a = ampOf(s), e = eyeOf(s, p, att);
    ctx.clearRect(0, 0, cv.width, cv.height);
    var pad = 40, pw = cv.width - pad - 20, mid = 130, sc = 150;
    ctx.font = '12px sans-serif';
    // traces
    ctx.strokeStyle = 'rgba(26,108,196,0.16)';
    for (var k = 0; k < 70; k++){
      var bits = [0,1,2,3].map(function(){ return Math.random() < 0.5 ? 0 : 1; });
      ctx.beginPath();
      for (var j = 0; j <= 200; j++){
        var t = 0.5 + (j / 200) * 2;
        var v = sig(bits, t, a, att, p);
        var x = pad + (t - 0.5) / 2 * pw;
        var y = mid - (v - a / 2) * sc;
        j ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
    // sampling point
    ctx.strokeStyle = '#c05621'; ctx.setLineDash([5,4]);
    ctx.beginPath(); ctx.moveTo(pad + pw / 2, 20); ctx.lineTo(pad + pw / 2, 235); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#c05621'; ctx.textAlign = 'center';
    ctx.fillText('sampling point', pad + pw / 2, 16);
    ctx.fillStyle = '#555'; ctx.textAlign = 'left';
    ctx.fillText('2 UI of the received eye', pad, 244);
    // verdict badge
    var ok = e >= THRESH, marg = e >= THRESH * 0.5;
    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = ok ? '#1d7a1d' : (marg ? '#b7791f' : '#a11');
    ctx.textAlign = 'right';
    ctx.fillText(ok ? 'eye open' : (marg ? 'marginal' : 'eye closed'), cv.width - 20, 24);
    out.innerHTML =
      'cable: ' + NAMES[+document.getElementById('ltCable').value] +
      ' (attenuation ' + Math.round(att * 100) + '%) &nbsp;|&nbsp; ' +
      'swing level ' + s + ', pre-emphasis level ' + p +
      ' &nbsp;|&nbsp; eye opening ≈ ' + e.toFixed(2) + ' V<br>' +
      (ok ? 'receiver reports a clean eye → <b>link locked</b>, BER &lt; 10⁻⁹'
          : marg ? 'receiver reports errors (visible as "sparkles") — keep training'
                 : 'receiver reports no link — keep training');
  }
  function step(){
    if (s < 3){ s++; }
    else if (p < 3){ s = 0; p++; }
    else { stop(); return false; }
    draw();
    return eyeOf(s, p, ATT[+document.getElementById('ltCable').value]) < THRESH;
  }
  function stop(){ if (timer){ clearInterval(timer); timer = null; } }
  document.getElementById('ltAuto').onclick = function(){
    stop(); draw();
    timer = setInterval(function(){ if (!step()) stop(); }, 350);
  };
  document.getElementById('ltStep').onclick = function(){ stop(); step(); };
  document.getElementById('ltReset').onclick = function(){ stop(); s = 0; p = 0; draw(); };
  document.getElementById('ltCable').onchange = function(){ stop(); s = 0; p = 0; draw(); };
  draw();
})();
</script>

On a good cable the link locks at low swing immediately; on a long cheap cable it sweeps all swing levels and then all pre-emphasis levels before locking — which is exactly what you see in a DisplayPort debug log when a marginal cable "takes a while to come up".

Sources: [VESA DisplayPort standard (DP 1.4a and 2.1)](https://vesa.org/vesa-displayport-standard/) · [VESA Display Stream Compression (DSC)](https://vesa.org/vesa-display-compression-codecs/)

<details><summary>Example problem</summary>

A DisplayPort 1.4 link (HBR3, 32.4 Gb/s line, 25.92 Gb/s payload) drives one 4K120 display, RGB 4:4:4, 10 bpc. Does it fit uncompressed? What does a real 4K120 8-bit monitor do instead?

<details><summary>Solution</summary>

Active rate: 3840 × 2160 × 120 ≈ 995.3 Mpx/s × 30 bits ≈ 29.9 Gb/s; with blanking ≈ 35.8 Gb/s (1.2×) or ≈ 31.3 Gb/s (CVT-RB). Both exceed 25.92 Gb/s — **no** at 10 bpc. At 8 bpc the active rate is ≈ 23.9 Gb/s: too much with 1.2× blanking (28.6 Gb/s), but ≈ 25.0 Gb/s with CVT-RB — a hair under the payload, which is why real 8-bit 4K120 monitors do run uncompressed on HBR3 with reduced-blanking timings. The other levers: 4:2:2 chroma (≈ 23.9 Gb/s at 10 bpc, fits), or DSC, which compresses ~3× and makes 10 bpc 4K120 comfortable. This is the arithmetic every high-refresh monitor buyer is implicitly running.

</details>
</details>
</details>

## Connectors and the USB-C Alt-Mode mux

**Definition.** HDMI uses the 19-pin Type-A connector; DisplayPort uses a 20-pin connector (with a smaller *mini DisplayPort* variant, the shell that Thunderbolt 1–2 also used). USB-C is not a third display interface but a *connector with a mux*: in **DisplayPort Alt Mode**, up to four DP lanes are mapped onto the USB-C SuperSpeed pairs, AUX rides on the SBU pins, and hot-plug is signalled over the CC pins — so the same cable that carries [USB](./USB.md) peripherals can carry a full DisplayPort link instead.

<table>
<tr><th>Connector</th><th>Video lanes available</th><th>Where you meet it</th></tr>
<tr><td>HDMI Type A</td><td>3 TMDS + clock (1.x–2.0) or 4 FRL lanes</td><td>TVs, consoles, projectors, most GPUs</td></tr>
<tr><td>DisplayPort (full size)</td><td>4 main lanes + AUX + HPD</td><td>PC monitors, GPUs, docks</td></tr>
<tr><td>Mini DisplayPort</td><td>Same signals, smaller shell</td><td>Older laptops; Thunderbolt 1–2 ports</td></tr>
<tr><td>USB-C (full-featured)</td><td>2 or 4 DP lanes in Alt Mode, shared with USB 3 / Thunderbolt</td><td>Laptops, phones, docks, monitors</td></tr>
</table>

<div style="max-width:820px">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="410" y="20" text-anchor="middle" font-size="14" fill="#222">USB-C Alt Mode: a mux decides what the SuperSpeed pairs carry</text>
  <rect x="20" y="50" width="150" height="46" rx="6" fill="#2b6cb8"/>
  <text x="95" y="72" text-anchor="middle" font-size="12" fill="#fff">GPU</text>
  <text x="95" y="86" text-anchor="middle" font-size="10" fill="#cfe3f7">4 DP lanes</text>
  <rect x="20" y="190" width="150" height="46" rx="6" fill="#2f855a"/>
  <text x="95" y="212" text-anchor="middle" font-size="12" fill="#fff">USB host</text>
  <text x="95" y="226" text-anchor="middle" font-size="10" fill="#d7f0df">USB 3.x</text>
  <rect x="300" y="90" width="170" height="120" rx="8" fill="#6b46c1"/>
  <text x="415" y="125" text-anchor="middle" font-size="12" fill="#fff">Alt-Mode mux</text>
  <text x="415" y="142" text-anchor="middle" font-size="10" fill="#e9d8fd">negotiated over CC pins</text>
  <text x="415" y="160" text-anchor="middle" font-size="10" fill="#e9d8fd">mode A: 4 lanes DP</text>
  <text x="415" y="176" text-anchor="middle" font-size="10" fill="#e9d8fd">mode B: 2 lanes DP + USB3</text>
  <line x1="170" y1="72" x2="300" y2="120" stroke="#1a6fc4" stroke-width="3"/>
  <line x1="170" y1="212" x2="300" y2="190" stroke="#2f855a" stroke-width="3"/>
  <rect x="620" y="70" width="90" height="160" rx="14" fill="#333"/>
  <text x="665" y="60" text-anchor="middle" font-size="12" fill="#222">USB-C</text>
  <line x1="530" y1="110" x2="620" y2="110" stroke="#1a6fc4" stroke-width="3"/>
  <text x="575" y="104" text-anchor="middle" font-size="10" fill="#1a6fc4">SS pairs</text>
  <line x1="530" y1="150" x2="620" y2="150" stroke="#1a6fc4" stroke-width="3"/>
  <line x1="530" y1="190" x2="620" y2="190" stroke="#805ad5" stroke-width="2"/>
  <text x="575" y="184" text-anchor="middle" font-size="10" fill="#805ad5">SBU = AUX</text>
  <line x1="530" y1="220" x2="620" y2="220" stroke="#2f855a" stroke-width="2"/>
  <text x="575" y="214" text-anchor="middle" font-size="10" fill="#2f855a">CC</text>
  <text x="410" y="272" text-anchor="middle" font-size="11" fill="#666">The same four pairs carry either a full DP link, or half a DP link plus USB 3 — never both at full width.</text>
</svg>
</div>

<details><summary>Details</summary>

The mux is why USB-C display behaviour is so confusing in practice. A USB-C port can run DP Alt Mode in **4-lane mode** (all four SuperSpeed pairs carry DisplayPort; no USB 3 data) or **2-lane mode** (two pairs carry DP, two carry USB 3). Which modes a port supports, and at which DP link rates, is a property of the specific laptop — not of the USB-C logo. And when the port is a [Thunderbolt](./Thunderbolt.md) port, the DP traffic is *tunnelled* as packets inside the Thunderbolt link instead, which is why a Thunderbolt dock can drive two 4K displays *and* offer full USB bandwidth simultaneously, while a plain Alt-Mode dock must trade one against the other.

This is also why a "USB-C to HDMI" adapter can be passive (it only re-wires the connector when the port supports DP Alt Mode with an HDMI-conversion pin mapping) or needs an active converter chip (when the port has no Alt Mode at all, and the adapter must read pixels out of USB bandwidth).

<details><summary>Example problem</summary>

A dock advertises "dual 4K60 displays plus 10 Gb/s USB 3" over a single USB-C cable from a laptop whose port supports DP Alt Mode at HBR3. Can plain Alt Mode deliver this?

<details><summary>Solution</summary>
No. In 2-lane mode the DP payload is only 2 × 8.1 Gb/s × 0.8 ≈ 13 Gb/s — not enough for two 4K60 streams (≈ 24–36 Gb/s together, or ≈ 8–12 Gb/s each with DSC). In 4-lane mode there is plenty of DP bandwidth but *zero* USB 3 left. The advertised dock therefore either (a) is a Thunderbolt dock, which tunnels DP packets over its own 40–80 Gb/s link independently of Alt-Mode lane splitting, or (b) relies on DSC to squeeze both streams into 2-lane mode. The connector was never the constraint — the lane *allocation* was.
</details>
</details>
</details>

## Copy protection (HDCP) and adaptive sync (VRR)

**Definition.** Two link-level features sit on top of both standards. **HDCP** (High-bandwidth Digital Content Protection) encrypts the video stream end-to-end with keys negotiated between source and sink at link setup; a sink that lacks the required HDCP version gets a black or downgraded picture for protected content. **Adaptive sync** (VRR — variable refresh rate; FreeSync on the DisplayPort side, VRR/G-Sync Compatible on the HDMI side) lets the sink change its refresh rate per frame, with the timing conveyed as link metadata instead of a fixed pixel clock.

<details><summary>Details</summary>

**HDCP** is why a perfectly good cable can still give you a black screen. Each HDCP version has a bandwidth tier: HDCP 1.4 covers up to 4K30-class streams, and HDCP 2.2/2.3 is required for 4K HDR content. The negotiation happens over the link's control path (AUX for DisplayPort, the CEC/SDA lines for HDMI) *before* video flows; if the sink's receiver cannot authenticate at the required version, the source refuses to send protected content. This is a policy mechanism riding on the link, not a physics limit — which is why it fails in ways bandwidth arithmetic cannot explain.

**Adaptive sync** inverts the founding assumption of both links — a fixed, timed pixel rate. The source sends a special packet (DP) or signalling period (HDMI VRR) declaring the duration of the next frame, and the sink stretches or shrinks that frame's scan-out instead of tearing or dropping to a fixed divisor of 60 Hz. The result: no stutter at frame rates that do not divide evenly into the refresh rate, and no tearing without a queue latency penalty. DisplayPort standardised it first (DP 1.2a Adaptive-Sync, the basis of FreeSync); HDMI 2.1 made VRR part of the FRL feature set.

<details><summary>Example problem</summary>
A console connected to an older 4K TV plays SDR games fine, but HDR content shows a black screen. The cable is certified 18 Gb/s. What is the likely cause, and why does the bandwidth arithmetic say nothing is wrong?
</details>
<details><summary>Solution</summary>
Almost certainly HDCP: HDR content is marked as requiring HDCP 2.2, and an older 4K TV may only implement HDCP 1.4. The source authenticates the sink at link setup, sees the wrong version, and refuses to transmit — a black screen. The bandwidth arithmetic is irrelevant: 18 Gb/s is plenty for the mode; the failure is in the key exchange on the control channel, not in the data lanes. (Swap the TV or the AVR in the chain — any device in the middle must also support HDCP 2.2.)
</details>
</details>

## Legacy: VGA and DVI

**Definition.** DVI (1999) is HDMI's direct ancestor: the same TMDS signalling, video only, single-link 4.95 Gb/s line (3.96 Gb/s payload), with a *dual-link* variant that doubles the data lanes for high-resolution monitors. VGA (1987) is the analog predecessor: RGB as three continuously varying voltages plus sync, digitised at the *sink* end of a lossy analog cable — the reason the industry moved to digital display links.

<div style="max-width:660px">
<canvas id="avCanvas" width="640" height="270" style="max-width:100%;background:#fafafa;border:1px solid #ccc"></canvas>
<div style="margin-top:6px">
  <button id="mV">VGA (analog)</button>
  <button id="mD">DVI (digital)</button>
  <label style="margin-left:12px">Cable length: <span id="lenL">10 m</span>
    <input type="range" id="len" min="1" max="30" value="10" style="width:180px"></label>
</div>
<div id="avOut" style="font-size:12.5px;color:#555;margin-top:4px"></div>
</div>
<script>
(function(){
  var cv = document.getElementById('avCanvas'), ctx = cv.getContext('2d');
  var out = document.getElementById('avOut'), lenL = document.getElementById('lenL');
  var len = document.getElementById('len'), mode = 'vga';
  // offscreen test pattern
  var off = document.createElement('canvas'); off.width = 640; off.height = 200;
  (function(){
    var o = off.getContext('2d'), cols = ['#fff','#ff0','#0ff','#0f0','#f0f','#f00','#00f','#000'];
    for (var i = 0; i < 8; i++){ o.fillStyle = cols[i]; o.fillRect(i * 80, 0, 80, 90); }
    for (var y = 0; y < 40; y++) for (var x = 0; x < 160; x++)
      if ((x + y) % 2) { o.fillStyle = '#000'; o.fillRect(320 + x * 2, 100 + y, 2, 2); }
    o.fillStyle = '#000'; o.fillRect(0, 100, 320, 40);
    o.fillStyle = '#fff'; o.font = '28px sans-serif'; o.fillText('Aa Bb 12:34', 12, 130);
    for (var v = 0; v < 40; v++){ o.fillStyle = '#000'; o.fillRect(v * 8, 150, 1, 50); }
    o.fillStyle = '#000'; o.fillRect(340, 150, 2, 50);
  })();
  function render(){
    var L = +len.value; lenL.textContent = L + ' m';
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.drawImage(off, 0, 20);
    if (mode === 'vga'){
      var blur = L * 0.09;
      if (ctx.filter !== undefined){
        ctx.filter = 'blur(' + blur + 'px)';
        ctx.drawImage(off, 0, 20);
        ctx.filter = 'none';
      } else {
        var t = document.createElement('canvas'); t.width = 64; t.height = 20;
        t.getContext('2d').drawImage(off, 0, 0, 64, 20);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(t, 0, 20, 640, 200);
      }
      ctx.globalAlpha = Math.min(0.5, L / 60);
      ctx.drawImage(off, 4 + L * 0.25, 20);   // ghosting: reflected copy
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(255,255,255,' + Math.min(0.35, L / 90) + ')'; // contrast loss
      ctx.fillRect(0, 20, 640, 200);
      out.textContent = 'VGA: attenuation and reflections smear edges, ghost the image and wash out contrast — quality depends on cable length. The monitor re-digitises whatever arrives.';
    } else {
      if (L > 15){
        var n = (L - 15) * 45;
        for (var i = 0; i < n; i++){
          ctx.fillStyle = Math.random() < 0.5 ? '#fff' : '#f00';
          ctx.fillRect(Math.random() * 640, 20 + Math.random() * 200, 2, 2);
        }
        out.textContent = 'DVI at ' + L + ' m: the image is pixel-perfect, but the link margin is gone — errors appear as isolated "sparkles", and past the limit the link stops closing entirely.';
      } else {
        out.textContent = 'DVI at ' + L + ' m: bit-perfect. Digital links do not blur; they either work or (past the margin) show sparkles or drop out.';
      }
    }
  }
  document.getElementById('mV').onclick = function(){ mode = 'vga'; render(); };
  document.getElementById('mD').onclick = function(){ mode = 'dvi'; render(); };
  len.oninput = render;
  render();
})();
</script>

<details><summary>Details</summary>

VGA's weakness was structural, not a matter of build quality: an analog voltage degrades along the cable — attenuation rolls off high frequencies (blurring sharp edges), impedance mismatches reflect energy back as ghosts, and noise adds directly to the pixel values — so image quality depended on cable length and quality, and the sink had to re-digitise a signal that had been digital inside the GPU. DVI, HDMI and DisplayPort digitise at the source and keep the signal digital end-to-end: the only degradation is bit errors, which a healthy link avoids entirely and a marginal one shows as isolated sparkles — never as blur. The same physics sets the analog limits (see [Electromagnetism](../../../Physics/Interactions/Electromagnetism/Readme.md)); digital coding plus link training simply buys the margin back.

DVI's *dual-link* variant is the same lesson in bandwidth form: one TMDS link was not enough for the 30-inch monitors of 2004, so DVI simply doubled the data lanes — the same "more lanes" lever DisplayPort and HDMI FRL still pull today.

Sources: [VESA DisplayPort standards (successor to DVI)](https://www.vesa.org/vesa-standards/)

<details><summary>Example problem</summary>
Why does DVI have a *dual-link* variant? Compute it: can single-link DVI (3.96 Gb/s video payload) carry a 2560 × 1600 monitor at 60 Hz, 8 bpc RGB, with 1.2× blanking?
<details><summary>Solution</summary>
Active rate: 2560 × 1600 × 60 ≈ 245.8 Mpx/s × 24 bits ≈ 5.90 Gb/s; with 1.2× blanking ≈ 7.08 Gb/s — far above the 3.96 Gb/s single-link payload. Dual-link DVI doubles the data lanes (9.9 Gb/s line, 7.92 Gb/s payload), which fits. That is the whole reason the dual-link connector and cable exist: same signalling, twice the lanes, because "more lanes" was the only bandwidth lever TMDS had before DSC existed.
</details>
</details>
</details>

## Quiz

<details><summary>Example problem</summary>

A laptop has one DisplayPort 1.4 output (HBR3, 25.92 Gb/s payload) and wants to drive **two 4K60 displays, RGB 4:4:4 at 10 bpc**, through an MST hub. Why does this fail, and which DisplayPort features address it?

<details><summary>How to solve it</summary>

Run the bandwidth budget twice — once per display — and compare the sum against the link payload. Each 4K60 10 bpc stream needs 497.7 Mpx/s × blanking × 30 bits. Then ask what levers exist once the cable is fixed.

<details><summary>Solution</summary>

Each stream needs ≈ 17.9 Gb/s with the conservative 1.2× blanking (≈ 15.7 Gb/s with CVT-RB), so two streams need ≈ 31–36 Gb/s — well over the 25.92 Gb/s payload. **The link cannot carry both uncompressed.** Note that MST itself is not the problem: MST only *shares* the link's payload between streams; it cannot create bandwidth.

What fixes it:

1. **DSC** (Display Stream Compression, DP 1.4): ~3× visually lossless compression brings each stream to ≈ 5–6 Gb/s, so both fit comfortably — this is exactly what MST docks with dual 4K monitors do.
2. **Chroma subsampling** to 4:2:2 (20 bits/px) halves each stream to ≈ 11.9 Gb/s, so both fit at ≈ 23.8 Gb/s — at the cost of colour resolution.
3. A faster link (DP 2.x UHBR10, ≈ 38.8 Gb/s payload) fits both uncompressed.

The deeper lesson: a display link is a *constant-rate budget*. Once the cable's payload is fixed, the only levers are fewer pixels, fewer bits per pixel, or compression — and DSC is the lever that preserves image quality while pulling it.

</details>
</details>
</details>
