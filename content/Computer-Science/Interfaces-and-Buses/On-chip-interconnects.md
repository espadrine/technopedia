# On-chip interconnects

On-chip interconnects are the metallic or polysilicon wires that carry signals between functional units within a single silicon die. They are relevant whenever a processor or SoC must move data between its own components: between a core and its L1 cache, between cores in a multicore chip, or between a CPU and an on-die memory controller. At the µm–mm scale, the dominant physics is RC delay, and the design discipline is transistor-level timing closure.

This page covers the three canonical topologies in increasing order of scale and complexity — **shared bus**, **crossbar**, **network-on-chip** — plus the innermost interconnect of all, the **register file**. The consumer of these wires on the core side (pipelines, renaming, out-of-order execution) is described in [CPU Architecture](../Computer-Hardware/CPU-Architecture.md); the latency and bandwidth context that motivates the whole design is in [Memory Hierarchy](../Computer-Hardware/Memory-Hierarchy.md); and the boundary where an "interconnect" stops being on-chip (chiplets, package substrates, PCB traces) is covered in [Board-level electrical interconnects](./Board-level-interconnects.md).

## The physics: RC delay

<details><summary>Details</summary>

Why is RC delay the dominant physics on-die, when board-level traces are transmission lines? A wire must be treated as a transmission line only when its length is a significant fraction of the signal's rise-time distance ($`L \gtrsim t_\text{rise} \cdot v` where $`v` is the propagation speed, roughly $`c/2` in silicon dioxide). On-die wires are µm to a few mm long with sub-100-ps rise times, so they behave as **lumped RC circuits**: no reflections, no impedance matching, no termination. The wire is a resistance in series with a capacitance to the substrate and to neighbouring wires.

The classic model is the **Elmore delay** for a distributed RC line of length $`L`, with resistance $`r` and capacitance $`c` per unit length:

```math
t_{pd} \approx 0.69\, r\, c\, L^2
```

The quadratic dependence on length is the single most important fact on this page: **doubling a wire's length quadruples its delay**. Three design consequences follow:

1. **Repeaters.** Long wires are split into $`n` segments separated by buffers, turning $`L^2` into $`n \cdot (L/n)^2 = L^2/n`. This is why NoC routers exist at all: a 10 mm wire is unusable, but ten 1 mm segments with a register at each boundary are fine.
2. **Wires do not scale.** Transistor delay has improved by orders of magnitude per process generation; wire resistance and capacitance have not (copper resistivity rises with thinning, and capacitance is set by geometry). On modern chips, interconnect — not transistors — sets the critical path.
3. **Crosstalk.** The same capacitance that sets delay couples neighbouring wires; a bus bundles its wires so they switch together, and spacing or shielding protects critical signals.

</details>

## Shared bus

**Definition.** A single set of wires shared by all participants; only one master drives the bus at a time, selected by an arbiter.

<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" style="max-width:640px;width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="320" y="22" text-anchor="middle" font-size="15" font-weight="bold">Shared bus with a central arbiter</text>
  <!-- masters -->
  <g font-size="13" text-anchor="middle">
    <rect x="40"  y="50" width="110" height="40" fill="#dbe9ff" stroke="#3366cc"/><text x="95"  y="75">CPU core</text>
    <rect x="180" y="50" width="110" height="40" fill="#dbe9ff" stroke="#3366cc"/><text x="235" y="75">GPU</text>
    <rect x="320" y="50" width="110" height="40" fill="#dbe9ff" stroke="#3366cc"/><text x="375" y="75">DMA engine</text>
    <rect x="460" y="50" width="110" height="40" fill="#dbe9ff" stroke="#3366cc"/><text x="515" y="75">Video codec</text>
  </g>
  <!-- taps -->
  <g stroke="#3366cc" stroke-width="2">
    <line x1="95"  y1="90" x2="95"  y2="150"/>
    <line x1="235" y1="90" x2="235" y2="150"/>
    <line x1="375" y1="90" x2="375" y2="150"/>
    <line x1="515" y1="90" x2="515" y2="150"/>
  </g>
  <!-- bus lines -->
  <g stroke-width="4">
    <line x1="40" y1="150" x2="600" y2="150" stroke="#c0392b"/>
    <line x1="40" y1="165" x2="600" y2="165" stroke="#e67e22"/>
    <line x1="40" y1="180" x2="600" y2="180" stroke="#27ae60"/>
  </g>
  <g font-size="12">
    <text x="606" y="154" fill="#c0392b">Address</text>
    <text x="606" y="169" fill="#e67e22">Data</text>
    <text x="606" y="184" fill="#27ae60">Control</text>
  </g>
  <!-- arbiter -->
  <rect x="250" y="215" width="140" height="40" fill="#fff3cd" stroke="#8a6d00"/>
  <text x="320" y="240" text-anchor="middle" font-size="13">Arbiter</text>
  <g stroke="#8a6d00" stroke-width="2" stroke-dasharray="4 3">
    <line x1="95"  y1="215" x2="250" y2="240"/>
    <line x1="235" y1="215" x2="290" y2="255"/>
    <line x1="375" y1="215" x2="350" y2="255"/>
    <line x1="515" y1="215" x2="390" y2="240"/>
  </g>
  <text x="320" y="285" text-anchor="middle" font-size="12" fill="#555">One master granted at a time; all others tri-state their drivers</text>
</svg>

<details><summary>Details</summary>

A shared bus is the simplest interconnect topology. All masters (CPU, DMA, GPU) connect to the same address, data, and control lines. An arbiter (typically a priority encoder or round-robin) grants bus access to one master at a time; every other master tri-states its drivers.

**Example.** The canonical on-chip example is ARM's **AMBA** family, which wires the peripherals of most ARM-based SoCs (and many others). **AMBA AHB** is a multi-master system bus supporting burst transfers and split transactions; **AMBA APB** is a simple, low-power, single-manager bus for slow peripherals (UARTs, timers, GPIO). A typical SoC hangs a fast AHB backbone off the CPU and bridges it to an APB segment for the slow periphery. AMBA **AXI** (IHI 0022) generalises this into point-to-point channels — see the crossbar section below.

The key trade-off: a shared bus is cheap — the wire count is $`O(1)` in the number of masters, since the bus width does not grow — but the aggregate bandwidth is fixed. Adding masters adds contention, not throughput.

**Fairness.** Under strict priority, a low-priority master can be **starved** indefinitely (a bounded-unfairness problem, distinct from *priority inversion*, which is when a low-priority *holder* of a resource blocks a high-priority requester). Round-robin or weighted fair queuing guarantees each master a bounded wait.

Try it yourself: the simulation below runs four masters against a strict-priority and a round-robin arbiter. Master 0 requests every cycle; watch its share of grants under each policy, and watch the starvation counter for the low-priority masters.

<iframe src="./On-chip-interconnects.simulation.html" title="Bus arbiter demo: strict priority vs round-robin, showing starvation"></iframe>

<details><summary>Example problem</summary>

Two masters request the bus simultaneously. Master A has priority 1, Master B has priority 2. The arbiter uses strict priority. Which master gets the bus, and what is the worst-case wait for Master B?

<details><summary>Solution</summary>

Master A gets the bus (higher priority). Master B waits until Master A releases the bus. In the worst case, if Master A issues back-to-back transactions, Master B can be starved indefinitely — plain starvation under strict priority (not priority inversion, which requires a resource *holder*). This motivates round-robin or weighted fair queuing in modern arbiters, which bound the wait to at most one transaction per competing master.

</details>

</details>

</details>

> **Authoritative sources**
> - [AMBA AXI Protocol Specification (IHI 0022)](https://developer.arm.com/documentation/ihi0022/latest/)
> - [AMBA specifications overview (AHB, APB, AXI, CHI)](https://www.arm.com/architecture/system-architectures/amba/amba-specifications)

## Crossbar

**Definition.** A fully connected switching fabric: every input port can be connected to any output port simultaneously, giving non-blocking, point-to-point paths.

<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" style="max-width:640px;width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="320" y="22" text-anchor="middle" font-size="15" font-weight="bold">4×4 crossbar: the worked example's matching</text>
  <!-- inputs -->
  <g font-size="13" text-anchor="end">
    <text x="88" y="74">Core 0</text>
    <text x="88" y="134">Core 1</text>
    <text x="88" y="194">Core 2</text>
    <text x="88" y="254">Core 3</text>
  </g>
  <!-- outputs -->
  <g font-size="13" text-anchor="middle">
    <text x="160" y="300">MC 0</text>
    <text x="260" y="300">MC 1</text>
    <text x="360" y="300">MC 2</text>
    <text x="460" y="300">MC 3</text>
  </g>
  <!-- input/output stubs -->
  <g stroke="#3366cc" stroke-width="2">
    <line x1="95" y1="70" x2="140" y2="70"/><line x1="95" y1="130" x2="140" y2="130"/>
    <line x1="95" y1="190" x2="140" y2="190"/><line x1="95" y1="250" x2="140" y2="250"/>
    <line x1="160" y1="270" x2="160" y2="285"/><line x1="260" y1="270" x2="260" y2="285"/>
    <line x1="360" y1="270" x2="360" y2="285"/><line x1="460" y1="270" x2="460" y2="285"/>
  </g>
  <!-- crosspoints: cx in {160,260,360,460}, cy in {70,130,190,250} -->
  <g>
    <!-- granted connections: C0->MC2, C2->MC0, C3->MC3 -->
    <circle cx="360" cy="70"  r="11" fill="#27ae60" stroke="#145a32" stroke-width="2"/>
    <circle cx="160" cy="190" r="11" fill="#27ae60" stroke="#145a32" stroke-width="2"/>
    <circle cx="460" cy="250" r="11" fill="#27ae60" stroke="#145a32" stroke-width="2"/>
    <!-- blocked: C1->MC2 (output already used) -->
    <circle cx="360" cy="130" r="11" fill="#e74c3c" stroke="#922b21" stroke-width="2"/>
    <!-- idle crosspoints -->
    <g fill="#ddd" stroke="#999">
      <circle cx="160" cy="70" r="7"/><circle cx="260" cy="70" r="7"/><circle cx="460" cy="70" r="7"/>
      <circle cx="160" cy="130" r="7"/><circle cx="260" cy="130" r="7"/><circle cx="460" cy="130" r="7"/>
      <circle cx="260" cy="190" r="7"/><circle cx="360" cy="190" r="7"/><circle cx="460" cy="190" r="7"/>
      <circle cx="160" cy="250" r="7"/><circle cx="260" cy="250" r="7"/><circle cx="360" cy="250" r="7"/>
    </g>
  </g>
  <!-- active path traces -->
  <g stroke="#27ae60" stroke-width="3" fill="none" opacity="0.7">
    <path d="M 140 70 H 360"/>
    <path d="M 140 190 H 160 V 270"/>
    <path d="M 140 250 H 460 V 270"/>
    <path d="M 360 70 V 270"/>
  </g>
  <g font-size="12">
    <text x="500" y="74" fill="#145a32">● granted</text>
    <text x="500" y="134" fill="#922b21">● blocked</text>
    <text x="500" y="194" fill="#777">○ idle</text>
  </g>
  <text x="320" y="330" text-anchor="middle" font-size="12" fill="#555">A valid configuration is a matching: at most one connection per input and per output</text>
</svg>

<details><summary>Details</summary>

A crossbar (or crosspoint switch) provides a dedicated path between any input and any output. If there are $`N` inputs and $`N` outputs, the crossbar has $`N^2` **crosspoints** — one connection point where an input row crosses an output column, each a pass-gate plus its control logic. (A 2×2 switch is a small building block assembled from several crosspoints, not a crosspoint itself.) Each cycle the configured connections must form a *matching*: at most one connection per input and per output, which is the only way a crossbar "blocks".

**Example.** A 4-core CPU with a 4×4 crossbar connecting four cores to four memory controllers. Each core can access its own memory controller simultaneously with the other cores accessing theirs — no contention. AMBA **AXI** is the standard channel-based protocol spoken over such point-to-point fabrics: five independent channels (read address/data, write address/data, write response) per manager–subordinate pair, which is what makes parallel paths useful.

The cost is quadratic in the number of ports: a 16×16 crossbar has 256 crosspoints, each with routing logic, and the wires to reach them grow too. This is why large SoCs move to ring or mesh topologies.

<details><summary>Example problem</summary>

A 4×4 crossbar connects 4 cores to 4 memory controllers. Core 0 requests MC 2, Core 1 requests MC 2, Core 2 requests MC 0, Core 3 requests MC 3. How many requests can be served simultaneously?

<details><summary>Solution</summary>

Core 0→MC 2, Core 2→MC 0, and Core 3→MC 3 can all be served simultaneously (no two share an input or output). Core 1→MC 2 conflicts with Core 0→MC 2 (same output), so it must wait. Three of four requests are served in this cycle.

</details>

</details>

</details>

## Ring and mesh NoC

**Definition.** A Network-on-Chip (NoC) replaces the crossbar with a regular topology (ring, 2-D mesh, torus) where each node is a router connected to its neighbours. Packets are routed hop-by-hop.

<svg id="mesh-svg" viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" style="max-width:640px;width:100%;background:#fafafa;border:1px solid #ccc">
  <text x="320" y="22" text-anchor="middle" font-size="15" font-weight="bold">4×4 mesh NoC: a packet routed corner to corner</text>
  <g id="mesh-links" stroke="#999" stroke-width="3"></g>
  <g id="mesh-nodes"></g>
  <circle id="mesh-packet" r="9" fill="#c0392b" stroke="#7b241c" stroke-width="2" opacity="0"/>
  <text id="mesh-status" x="320" y="325" text-anchor="middle" font-size="13" fill="#333">hop 0 / 6</text>
</svg>

<script>
(function () {
  var dx = 110, dy = 80, x0 = 160, y0 = 55;
  function pos(i, j) { return [x0 + j * dx, y0 + i * dy]; }

  var links = document.getElementById('mesh-links');
  var nodes = document.getElementById('mesh-nodes');
  // links between horizontal and vertical neighbours
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (j < 3) {
        var a = pos(i, j), b = pos(i, j + 1);
        var l = document.createElementNS(NS, 'line');
        l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]);
        l.setAttribute('x2', b[0]); l.setAttribute('y2', b[1]);
        links.appendChild(l);
      }
      if (i < 3) {
        var c = pos(i, j), d = pos(i + 1, j);
        var l2 = document.createElementNS(NS, 'line');
        l2.setAttribute('x1', c[0]); l2.setAttribute('y1', c[1]);
        l2.setAttribute('x2', d[0]); l2.setAttribute('y2', d[1]);
        links.appendChild(l2);
      }
    }
  }
  // routers
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var p = pos(i, j);
      var r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', p[0] - 18); r.setAttribute('y', p[1] - 18);
      r.setAttribute('width', 36); r.setAttribute('height', 36);
      r.setAttribute('rx', 6);
      r.setAttribute('fill', '#dbe9ff'); r.setAttribute('stroke', '#3366cc');
      nodes.appendChild(r);
      var t = document.createElementNS(NS, 'text');
      t.setAttribute('x', p[0]); t.setAttribute('y', p[1] + 4);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-size', '11');
      t.setAttribute('fill', '#333');
      t.textContent = '(' + i + ',' + j + ')';
      nodes.appendChild(t);
    }
  }
  // packet path: (0,0) -> (3,3), 6 hops
  var path = [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[3,3]];
  var packet = document.getElementById('mesh-packet');
  var status = document.getElementById('mesh-status');
  var step = 0;
  function place(k) {
    var p = pos(path[k][0], path[k][1]);
    packet.setAttribute('cx', p[0]); packet.setAttribute('cy', p[1]);
    packet.setAttribute('opacity', '1');
    status.textContent = 'hop ' + k + ' / 6';
  }
  place(0);
  setInterval(function () {
    step = (step + 1) % (path.length + 2); // pause 2 ticks at the destination
    if (step >= path.length) {
      if (step === path.length) { status.textContent = 'delivered after 6 hops'; }
      if (step === path.length + 1) { step = -1; return; }
      return;
    }
    place(step);
  }, 900);
})();
</script>

<details><summary>Details</summary>


As core counts grew beyond ~16, the quadratic wire cost of a crossbar became prohibitive. A mesh NoC connects each router to its north, south, east, and west neighbours; a ring connects each node to exactly two neighbours. A packet traverses multiple hops, each adding one router latency (~1–2 cycles). The animation above walks a packet from router (0,0) to router (3,3) — six hops, the mesh's diameter.

**Examples.** Intel's client CPUs (Skylake through Coffee Lake) connect cores, cache slices, and the integrated GPU over a bidirectional **ring**; AMD's Infinity Fabric in Ryzen/EPYC is likewise assembled from ring segments. For larger fabrics, Intel's Xeon Phi (Knights Landing) used a 2-D **mesh** across its 72 cores. Coherent NoC protocols are standardised too: AMBA **CHI** (IHI 0051) and **ACE** define snoop, DVM, and data messages over such fabrics, so that a mesh can be cache-coherent out of the box.

The trade-off: a mesh scales linearly in wire count — an $`N \times N` 2-D mesh has $`2N(N-1)` bidirectional links ($`N` rows of $`N-1` horizontal links plus $`N` columns of $`N-1` vertical links; boundary nodes have fewer neighbours) — but latency grows with the diameter, $`2(\sqrt{N}-1)` hops for an $`N \times N` mesh of $`N` nodes. Virtual channels and wormhole routing mitigate head-of-line blocking.

<details><summary>Example problem</summary>

A 4×4 mesh NoC has 16 cores. What is the maximum hop count (diameter) between any two cores, and how does this compare to a 4×4 crossbar?

<details><summary>Solution</summary>

The diameter of a 4×4 mesh is 6 hops (corner to opposite corner: 3 + 3). A 4×4 crossbar has a diameter of 1 hop (any input to any output in a single switch). The mesh trades 6× latency for a much lower wire count: the mesh has $`2 \cdot 4 \cdot 3 = 24` bidirectional links, while the crossbar has $`4^2 = 16` crosspoints per direction of transfer — but the crossbar's wiring and muxing per crosspoint is far heavier, and the gap explodes with port count (a 16×16 crossbar needs 256 crosspoints versus 480 mesh links for a 16×16 mesh of 256 nodes).

</details>

</details>

</details>

> **Authoritative sources**
> - [A survey of research and practices of Network-on-chip (ACM Computing Surveys)](https://dl.acm.org/doi/10.1145/1132952.1132953)
> - [AMBA CHI Architecture Specification (IHI 0051)](https://developer.arm.com/documentation/ihi0051/latest/)
>
> The standard textbook is W. Dally & B. Towles, *Principles and Practices of Interconnection Networks*, Morgan Kaufmann, 2004.

## Register file and on-die SRAM

**Definition.** The register file is the innermost interconnect: the multi-ported array of flip-flop-based bit-cells and the metal routing that lets execution units read operands and write results in a single cycle, over wires only tens of µm long.

<details><summary>Details</summary>

A register file is not a bus in the traditional sense, but it is where all on-chip interconnect begins: the ALU reads two registers and writes one result per cycle, and the "interconnect" is the metal routing from the execution units to the register file, typically 10–100 µm. In the [memory hierarchy](../Computer-Hardware/Memory-Hierarchy.md) it is the top level — and structurally it is *not* an SRAM array: SRAM optimises density with few ports, while a register file needs many ports, so it is built from flip-flop/latch bit-cells with dedicated access paths per port.

**Example.** The x86-64 architectural register file has 16 general-purpose registers (64 bits each). Out-of-order cores keep a much larger *physical* register file to support register renaming — how and why is covered in [CPU Architecture](../Computer-Hardware/CPU-Architecture.md); the interconnect-relevant fact is simply that many execution units must each read two registers and write one every cycle, so the port count, not the capacity, dominates the design.

The design constraint is access time: a register file must be readable and writable in a single clock cycle (~0.3 ns at 3 GHz). Each additional read port adds a full set of word-lines and bit-lines spanning the whole array, so area grows roughly quadratically in port count while capacity grows linearly. This limits the size to a few hundred entries; beyond that, the array becomes too large (and its wires too long, per the RC-delay section) to access in one cycle.

<details><summary>Example problem</summary>

A register file has 32 registers of 64 bits, with 2 read ports and 1 write port. How many bit-cells does it contain, how many per-port access paths does that imply, and why does the port count — not the 2048 bits — dominate its area?

<details><summary>Solution</summary>

Capacity: $`32 \times 64 = 2048` bit-cells. Each bit-cell needs one access path per port: $`2048 \times 3 = 6144` port paths. Each read port requires its own word-line per register and its own bit-line per bit, routed across the entire array — so going from 1 to 2 read ports roughly doubles that wiring, while doubling capacity (32→64 registers) only doubles the cell count. Because the wiring per port spans the whole array and must charge/discharge within one ~0.3 ns cycle, area and delay are set by the port count; this is exactly why register files stop at a few hundred entries and why caches (which need few ports) use dense SRAM instead.

</details>

</details>

</details>

## The package boundary: die-to-die

When the "interconnect" crosses from one silicon die to another inside a single package — chiplets linked by UCIe, AMD's Infinity Fabric, Intel's EMIB — the engineering regime changes: the distances (1–10 mm) and the bump/TSV parasitics belong to packaging, not to on-die RC design. That subject is treated in [Board-level electrical interconnects](./Board-level-interconnects.md), and the fabrication side (TSV formation, microbump placement, CoWoS assembly) in [Interconnect and packaging](../../Manufacturing/Electronics/Interconnect-and-packaging.md).

## Scaling summary

The three topologies are three points on a single trade-off: **wire count versus blocking**.

<table>
<tr><th>Topology</th><th>Wire count</th><th>Blocking</th><th>Latency</th><th>Typical use</th></tr>
<tr><td>Shared bus</td><td>O(1) — fixed width, independent of master count</td><td>Fully blocking: one transaction at a time</td><td>1 hop + arbitration wait</td><td>Peripheral fabrics (AMBA APB/AHB)</td></tr>
<tr><td>Crossbar</td><td>O(N²) crosspoints and muxing</td><td>Non-blocking (limited only by matching conflicts)</td><td>1 hop</td><td>Core ↔ cache banks, small SoC fabrics (AMBA AXI)</td></tr>
<tr><td>Ring</td><td>O(N) links</td><td>Contention on shared segments</td><td>Up to N/2 hops</td><td>Client CPUs, mid-size coherent clusters</td></tr>
<tr><td>2-D mesh</td><td>O(N) links — 2N(N−1) for an N×N mesh</td><td>Local contention, multi-hop</td><td>Up to 2(√N−1) hops</td><td>Many-core (Xeon Phi), coherent NoC (AMBA CHI)</td></tr>
</table>

A bus buys universality with O(1) wires and pays with total serialization; a crossbar buys zero blocking with O(N²) hardware; a ring or mesh buys O(N) scalability with multi-hop latency. Every on-chip fabric in production is a hybrid of these three — e.g. crossbars inside a cluster, rings or meshes between clusters.

## Quiz

<details><summary>Example problem</summary>

A SoC has 4 cores and 4 memory controllers. Every link is 64 bits wide and runs at 1 GHz, so one link carries 8 GB/s. Compare three fabrics:

(a) a single shared 64-bit bus at 1 GHz;
(b) a 4×4 crossbar;
(c) a 4×4 mesh where each memory controller hangs off one router and each hop adds 1 cycle of latency.

(i) What is the peak aggregate bandwidth of each fabric?
(ii) All 4 cores each demand 8 GB/s from a *distinct* memory controller. Which fabrics sustain this?
(iii) In the mesh, a core sits 3 hops from its controller. What latency does that add compared to the crossbar?

<details><summary>How to solve</summary>

<details><summary>Solution</summary>

(i) The bus carries 8 GB/s **total** — its width and clock are fixed, so aggregate bandwidth is 8 GB/s no matter how many masters contend. The crossbar gives each of the 4 input–output pairs its own 8 GB/s path: 32 GB/s aggregate. The mesh also has 4 private controller links (32 GB/s in principle), but flows that share a link must split it, so the *sustainable* aggregate depends on the traffic pattern.

(ii) The bus cannot: 4 × 8 = 32 GB/s is demanded of an 8 GB/s medium. The crossbar can: four distinct inputs to four distinct outputs is a valid matching, so all four flows run at full speed simultaneously. The mesh can too, *if* the four flows' paths are link-disjoint; if two flows cross the same link, they share its 8 GB/s.

(iii) The crossbar delivers in 1 hop; the mesh needs 3 hops, i.e. 2 extra cycles of latency per request (more if routers pipeline header/body separately). This is the price of the mesh's O(N) wiring: bandwidth scales, latency grows with distance — the exact inverse of the bus, whose latency is constant but whose bandwidth never scales.

</details>

</details>

</details>
