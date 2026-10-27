# Memory Hierarchy

The memory hierarchy organizes storage from fast, small, expensive (registers, caches) to slow, large, cheap (DRAM, disk). It is relevant whenever a program's performance is limited by memory access rather than computation. The fundamental motivation is the **memory wall**: CPU performance grew at roughly 60% per year through the 1990s and early 2000s, while DRAM latency has remained roughly constant at 60–100 ns. The hierarchy exists to hide this growing gap.

<svg width="560" height="320" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <defs>
    <marker id="arrowDown" markerWidth="8" markerHeight="6" refX="4" refY="6" orient="auto"><path d="M0,0 L4,6 L8,0" fill="#e74c3c"/></marker>
  </defs>
  <!-- Pyramid levels (top to bottom: fastest to slowest) -->
  <polygon points="230,10 330,10 340,50 220,50" fill="#e74c3c" opacity="0.85"/>
  <text x="280" y="35" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">Registers</text>
  <text x="380" y="35" fill="#555" font-size="10">1 cyc · KB</text>

  <polygon points="210,55 350,55 365,95 195,95" fill="#e67e22" opacity="0.85"/>
  <text x="280" y="80" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">L1 Cache</text>
  <text x="380" y="80" fill="#555" font-size="10">4 cyc · 32–64 KB</text>

  <polygon points="190,100 370,100 390,140 170,140" fill="#f1c40f" opacity="0.85"/>
  <text x="280" y="125" text-anchor="middle" fill="#333" font-weight="bold" font-size="11">L2 Cache</text>
  <text x="380" y="125" fill="#555" font-size="10">12 cyc · 256 KB–1 MB</text>

  <polygon points="165,145 395,145 420,185 140,185" fill="#2ecc71" opacity="0.85"/>
  <text x="280" y="170" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">L3 Cache</text>
  <text x="380" y="170" fill="#555" font-size="10">40 cyc · 8–64 MB</text>

  <polygon points="140,190 420,190 450,230 110,230" fill="#3498db" opacity="0.85"/>
  <text x="280" y="215" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">DRAM</text>
  <text x="380" y="215" fill="#555" font-size="10">100 cyc · 8–128 GB</text>

  <polygon points="110,235 450,235 480,275 80,275" fill="#9b59b6" opacity="0.85"/>
  <text x="280" y="260" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">SSD</text>
  <text x="380" y="260" fill="#555" font-size="10">50–100 µs · 256 GB–8 TB</text>

  <polygon points="80,280 480,280 510,315 50,315" fill="#7f8c8d" opacity="0.85"/>
  <text x="280" y="303" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">HDD</text>
  <text x="380" y="303" fill="#555" font-size="10">10 ms · 1–20 TB</text>

  <!-- Miss arrows on the left -->
  <line x1="195" y1="35" x2="160" y2="35" stroke="#e74c3c" stroke-width="1.5" marker-end="url(#arrowDown)"/>
  <text x="155" y="30" text-anchor="end" fill="#e74c3c" font-size="10">miss →</text>
  <line x1="175" y1="80" x2="140" y2="80" stroke="#e74c3c" stroke-width="1.5" marker-end="url(#arrowDown)"/>
  <line x1="155" y1="125" x2="120" y2="125" stroke="#e74c3c" stroke-width="1.5" marker-end="url(#arrowDown)"/>
  <line x1="135" y1="170" x2="100" y2="170" stroke="#e74c3c" stroke-width="1.5" marker-end="url(#arrowDown)"/>
  <line x1="115" y1="215" x2="80" y2="215" stroke="#e74c3c" stroke-width="1.5" marker-end="url(#arrowDown)"/>
  <line x1="95" y1="260" x2="60" y2="260" stroke="#e74c3c" stroke-width="1.5" marker-end="url(#arrowDown)"/>
  <text x="55" y="170" text-anchor="middle" fill="#e74c3c" font-size="10" transform="rotate(-90,55,170)">miss cascade</text>
</svg>

<table>
<tr><th>Level</th><th>Latency (cycles @ 1 GHz)</th><th>Latency (time)</th><th>Bandwidth</th><th>Capacity</th></tr>
<tr><td>Registers</td><td>1</td><td>1 ns</td><td>~100 GB/s (per core)</td><td>KB</td></tr>
<tr><td>L1 cache</td><td>4</td><td>4 ns</td><td>~100 GB/s</td><td>32–64 KB</td></tr>
<tr><td>L2 cache</td><td>12</td><td>12 ns</td><td>~50 GB/s</td><td>256 KB–1 MB</td></tr>
<tr><td>L3 cache</td><td>40</td><td>40 ns</td><td>~50 GB/s</td><td>8–64 MB</td></tr>
<tr><td>DRAM</td><td>100</td><td>100 ns</td><td>~50 GB/s (dual-channel DDR4)</td><td>8–128 GB</td></tr>
<tr><td>SSD (SATA)</td><td>100,000</td><td>100 µs</td><td>~500 MB/s</td><td>256 GB–8 TB</td></tr>
<tr><td>SSD (NVMe)</td><td>50,000</td><td>50 µs</td><td>3–7 GB/s</td><td>256 GB–8 TB</td></tr>
<tr><td>HDD</td><td>10,000,000</td><td>10 ms</td><td>~200 MB/s</td><td>1–20 TB</td></tr>
</table>

> **Authoritative sources**
> - [Computer Architecture: A Quantitative Approach (Hennessy & Patterson)](https://www.elsevier.com/books/computer-architecture/a-quanitative-approach/978-0-12-812493-3)
> - [Operating System Concepts (Silberschatz, Galvin, Gagne)](https://www.pearson.com/en-us/subject-catalog/p/operating-system-concepts/P200000003515/9780136874608)
> - [Wulf & McKee, "Hitting the Memory Wall: Implications of the Obvious," ACM SIGARCH Computer Architecture News, 1995](https://dl.acm.org/doi/10.1145/216585.216588)
> - [Papamarcos & Patel, "A Low-Overhead Coherence Solution for Multiprocessors with Private Cache Memories," IEEE Trans. Computers, 1984](https://dl.acm.org/doi/10.1145/800015.808204)

## Latency vs. Bandwidth

Two distinct quantities govern memory performance, and confusing them leads to wrong design decisions:

- **Latency** is the time from a request to the first byte of data arriving. It is dominated by the number of levels traversed (tag compare, row activation, column read, coherence check).
- **Bandwidth** is the sustained transfer rate once the initial latency is paid. It is determined by bus width, clock speed, and the number of parallel channels.

A single random 64-byte read from DRAM takes 100 cycles (100 ns) but transfers only 64 bytes, yielding an effective rate of 0.64 GB/s. A sequential stream of 64-byte lines, however, keeps the DRAM pipeline full and achieves the full 50 GB/s. The distinction is critical: **sequential access is bandwidth-bound; random access is latency-bound.**

DRAM achieves peak bandwidth through **bank interleaving**: a DRAM chip is divided into 8–32 banks, each with its own row buffer. While one bank is in row-activation (tRCD), another can be in column-read (tCL), and a third can be precharging (tRAS). The memory controller issues commands to different banks in parallel, so the aggregate throughput approaches the bus limit even though each individual access takes the full tRCD + tCL sequence.

<details><summary>Details</summary>

**Why sequential access saturates bandwidth**: A DRAM column read returns 64 bytes per burst. If the next request is to the adjacent column in the same row, the row is already open and the controller skips tRCD, issuing only tCL. For a fully sequential stream, every access after the first is a "row hit" and the effective latency drops to tCL (~13 cycles). The bus is never idle, so bandwidth equals the bus rate.

**Why random access is latency-bound**: Each random access likely hits a different row, forcing a full tRCD + tCL sequence (~30 cycles) per access. With only one outstanding request, the effective bandwidth is 64 B / 30 cycles ≈ 2 GB/s per channel—far below the 25.6 GB/s bus rate. Modern CPUs hide this with out-of-order execution and multiple outstanding loads, but the fundamental limit remains.

**Worked example**: A program reads 1 GB sequentially from a dual-channel DDR4-3200 system (51.2 GB/s peak). Time = 1 GB / 51.2 GB/s ≈ 19.5 ms. The same 1 GB read with random 64-byte accesses at 100 ns each: 16,384,000 accesses × 100 ns = 1.64 s—84× slower.

</details>

## Caches

A **cache** is a small, fast memory that stores copies of frequently accessed data. The **L1 cache** (32–64 KB, 4 cycles) is per-core; the **L2 cache** (256 KB–1 MB, 12 cycles) is per-core or per-pair; the **L3 cache** (8–64 MB, 40 cycles) is shared. A cache miss stalls the [CPU pipeline](./CPU-Architecture.md) until the data arrives.

<details><summary>Details</summary>

### Cache line and mapping

The **cache line** (typically 64 bytes) is the unit of transfer between levels. A miss loads the entire line, not a single byte. This exploits **spatial locality**: nearby data is likely to be accessed soon.

**Mapping** determines which set a given address can occupy:
- **Direct-mapped**: address → exactly one set (set = addr mod num_sets). Simple, but two addresses that map to the same set conflict.
- **Set-associative** ($`k`-way): address → one of $`k` sets in a group. Balances conflict and tag-comparison cost.
- **Fully associative**: address → any set. Maximum flexibility; requires comparing the tag against every entry.

### Replacement and write policies

**Replacement** (when a set is full):
- **LRU** (Least Recently Used): evict the line not accessed for the longest time.
- **Random**: evict a random line. Surprisingly effective for streaming workloads where LRU thrashes.

**Write policy**:
- **Write-through**: write to cache and to the next level simultaneously. Simple but every write pays the next-level latency.
- **Write-back**: write to cache only; write to the next level when the line is evicted. Fast, but requires a **dirty bit** per line.
- **Write-allocate**: on a write miss, load the line into the cache first (preferred when the line will be read again) or write directly to the next level (no-write-allocate).

### Store buffers and write combining

Between the [CPU pipeline](./CPU-Architecture.md) and L1, two distinct hardware stages decouple stores from the rest of the machine:

- **Store buffer**: a small FIFO (typically 16–64 entries) that accepts store data from the pipeline immediately. The pipeline retires the store instruction in 1 cycle; the store buffer drains to L1 in the background. This is what allows the CPU to retire stores without waiting for the cache.
- **Write-combining buffer**: coalesces multiple partial-line writes (e.g., four 16-byte stores) into a single full-line write before committing to L1. Without it, four partial writes would cause four separate cache-line modifications; with it, one full-line write suffices.

These buffers are the hardware substrate of the **x86-TSO** (Total Store Order) memory model: stores are visible to other cores in program order, but loads may be reordered with respect to stores. The `mfence` instruction flushes the store buffer, making all prior stores globally visible. On ARM, the weaker default ordering (stores may be reordered with other stores) requires explicit `dmb` (Data Memory Barrier) instructions. See [Parallelism](../Distributed-Systems/Concurrency/Parallelism.md) for the full memory-model discussion.

### Locality

- **Temporal**: recently accessed data is likely to be accessed again (e.g., a loop counter).
- **Spatial**: data near recently accessed data is likely to be accessed soon (e.g., the next element in an array).

### Worked example: tracing a write

Trace a 4-byte write to virtual address 0x1000 through a 2-way set-associative L1 (32 KB, 64-byte lines, write-back, write-allocate):

1. **Address decomposition**: 32 KB / 64 B = 512 lines. 2-way → 256 sets. Offset = 6 bits (64 B), Index = 8 bits (256 sets), Tag = remaining bits. For 0x1000: offset = 0x00, index = 0x10 (set 16), tag = 0x1.
2. **Tag compare**: Check both ways in set 16. Suppose way 0 holds tag 0x1 (hit) → write the 4 bytes into the cached line. Mark the line **dirty** (write-back).
3. **Store buffer**: The 4-byte store enters the store buffer. The pipeline retires immediately.
4. **Write-combining**: If this is the first partial write to this line, it is buffered. If a second 4-byte write to the same line arrives before the line is committed, both are coalesced.
5. **Commit**: When the store buffer drains, the 4 bytes are written into L1 way 0, set 16. The dirty bit is set. No write to L2 occurs until the line is evicted.

<details><summary>Problem</summary>

A 4-way set-associative L1 has 64 KB, 64-byte lines. How many sets does it have? If address 0x3F8C is accessed, what are the tag, index, and offset (assuming a 32-bit address)?

<details><summary>Solution</summary>

64 KB / 64 B = 1024 lines. 4-way → 256 sets. Offset = 6 bits, Index = 8 bits (256 sets), Tag = 32 − 6 − 8 = 18 bits.

0x3F8C = 0000 0000 0000 0011 1111 1000 1100
- Offset (low 6 bits): 001100 = 0x0C
- Index (next 8 bits): 11111000 = 0xF8
- Tag (top 18 bits): 000000000000001111 = 0x003F

</details>

</details>

</details>

## Prefetching

A **hardware prefetcher** predicts future memory accesses and loads data into the cache before it is requested, hiding latency and improving effective bandwidth. Prefetching is the primary mechanism that turns a latency-bound random access pattern into a bandwidth-bound sequential one.

<details><summary>Details</summary>

### Types of prefetchers

- **Next-line prefetcher**: on a cache miss, also fetch the adjacent cache line. Exploits spatial locality for sequential access. Simple, low overhead.
- **Stride prefetcher**: maintains a small **history table** (typically 16–64 entries) indexed by the PC or address. On each miss, it records the address. If the last two misses to the same table entry have a constant difference (the stride), it prefetches `current + stride`. For example, accessing `a[0], a[4], a[8], …` (stride = 4 × element_size) is detected after the second miss.
- **Stream prefetcher**: detects a stream of sequential accesses across multiple lines and prefetches a window ahead (e.g., 4–8 lines). More aggressive than next-line; used for large array scans.

### Cost of a wrong prefetch

A wrong prefetch (the predicted address is never accessed) has three costs:
1. **Cache pollution**: the prefetched line occupies a cache set and may evict a useful line (increasing the miss rate for the actual workload).
2. **Bandwidth waste**: the DRAM bus is occupied transferring data that is never used, reducing bandwidth available for real requests.
3. **Coherence traffic**: in a multicore system, the prefetched line enters the coherence protocol (MESI), generating snoop traffic for a line no core will use.

Modern prefetchers use a **confidence counter**: a prefetch is issued only after the stride has been confirmed by 2–3 consecutive accesses. If a prefetch is not consumed before the line is evicted, the counter is decremented, eventually disabling the prefetch for that pattern.

### Prefetch depth and cache size

The **prefetch distance** (how many lines ahead to fetch) must be large enough to cover the DRAM latency (100 cycles) but small enough to fit in the cache. For a 32 KB L1 (512 lines), a prefetch distance of 8–16 lines is safe; 64 lines would evict the working set. The optimal distance is approximately `DRAM_latency / access_interval`. For a sequential scan at 1 line per 4 cycles, the distance is 100/4 = 25 lines.

### Worked example: stride-4 over a 1 MB array

A program accesses `a[0], a[4], a[8], …` over a 1 MB array (16,384 elements of 64 B each, i.e., 16,384 cache lines). The L1 is 32 KB (512 lines).

- **Without prefetch**: Each access is a compulsory miss (stride 4 means only 1 in 4 lines is touched, and the working set of touched lines is 16,384/4 = 4,096 lines >> 512). Hit rate ≈ 0%. Average access = 100 cycles (DRAM).
- **With stride-4 prefetch**: After the first two misses, the prefetcher detects stride = 4 lines and prefetches `current + 4`. The prefetch distance is 8 lines (covers 100-cycle DRAM latency at 12-cycle L1 hit rate). The prefetched lines arrive just in time: hit rate ≈ 80% (the first few accesses and the tail are still misses). Average access ≈ 0.8 × 4 + 0.2 × 100 = 23.2 cycles—a 4.3× speedup.

</details>

## Cache coherence

In a multicore system, each core has its own private L1 (and sometimes L2) cache. When two cores access the same memory location, their cache copies can diverge. **Cache coherence** is the mechanism that ensures all cores see a consistent view of memory.

<details><summary>Details</summary>

### MESI protocol

Each cache line is in one of four states:

<svg width="420" height="200" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <defs>
    <marker id="cohArr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#333"/></marker>
  </defs>
  <!-- States as circles -->
  <circle cx="70" cy="100" r="30" fill="#e74c3c" opacity="0.8"/>
  <text x="70" y="105" text-anchor="middle" fill="#fff" font-weight="bold">M</text>
  <text x="70" y="145" text-anchor="middle" font-size="10" fill="#555">Modified</text>

  <circle cx="210" cy="50" r="30" fill="#2ecc71" opacity="0.8"/>
  <text x="210" y="55" text-anchor="middle" fill="#fff" font-weight="bold">E</text>
  <text x="210" y="95" text-anchor="middle" font-size="10" fill="#555">Exclusive</text>

  <circle cx="210" cy="150" r="30" fill="#3498db" opacity="0.8"/>
  <text x="210" y="155" text-anchor="middle" fill="#fff" font-weight="bold">S</text>
  <text x="210" y="195" text-anchor="middle" font-size="10" fill="#555">Shared</text>

  <circle cx="350" cy="100" r="30" fill="#95a5a6" opacity="0.8"/>
  <text x="350" y="105" text-anchor="middle" fill="#fff" font-weight="bold">I</text>
  <text x="350" y="145" text-anchor="middle" font-size="10" fill="#555">Invalid</text>

  <!-- Transitions -->
  <!-- I -> E (read miss, no other copy) -->
  <line x1="320" y1="85" x2="240" y2="55" stroke="#333" stroke-width="1.5" marker-end="url(#cohArr)"/>
  <text x="290" y="62" font-size="10" fill="#333">read miss</text>
  <!-- I -> S (read miss, other copy exists) -->
  <line x1="320" y1="115" x2="240" y2="145" stroke="#333" stroke-width="1.5" marker-end="url(#cohArr)"/>
  <text x="290" y="140" font-size="10" fill="#333">read miss</text>
  <!-- E -> M (local write) -->
  <line x1="225" y1="75" x2="95" y2="85" stroke="#333" stroke-width="1.5" marker-end="url(#cohArr)"/>
  <text x="160" y="72" font-size="10" fill="#333">write</text>
  <!-- S -> M (local write, invalidate others) -->
  <line x1="185" y1="135" x2="95" y2="115" stroke="#333" stroke-width="1.5" marker-end="url(#cohArr)"/>
  <text x="140" y="135" font-size="10" fill="#333">write</text>
  <!-- M -> I (invalidate from other core) -->
  <line x1="100" y1="115" x2="320" y2="115" stroke="#333" stroke-width="1.5" marker-end="url(#cohArr)"/>
  <text x="210" y="112" font-size="10" fill="#333">invalidate</text>
  <!-- E -> I (invalidate) -->
  <line x1="240" y1="65" x2="320" y2="85" stroke="#333" stroke-width="1.5" marker-end="url(#cohArr)"/>
  <!-- S -> I (invalidate) -->
  <line x1="240" y1="145" x2="320" y2="115" stroke="#333" stroke-width="1.5" marker-end="url(#cohArr)"/>
</svg>

- **M** (Modified): the line is dirty (written) and exists only in this cache.
- **E** (Exclusive): the line is clean and exists only in this cache.
- **S** (Shared): the line is clean and may exist in multiple caches.
- **I** (Invalid): the line is not valid in this cache.

**MOESI**: adds an **O** (Owned) state between M and S. The owner holds the dirty line and can serve reads to other cores without writing back to memory, reducing bus traffic.

### Snoop vs. directory protocols

- **Snoop-based**: every cache monitors the bus. When a core issues a read or write, all other caches check whether they hold the line and respond. Simple for a small number of cores; bus traffic grows linearly with core count.
- **Directory-based**: a central directory (in L3 or a dedicated controller) tracks which caches hold a copy of each line. Only the relevant caches are contacted. Used in many modern multicore and NUMA designs.

### False sharing

**False sharing** occurs when two cores write to different variables that reside in the same 64-byte cache line. The coherence protocol sees writes to the same line and invalidates the other core's copy on every write, causing a **coherence ping-pong**: each write forces the other core to re-fetch the line from memory (or from the other core's cache), adding 40–100 cycles per access.

**Example**: Two threads each increment a counter. If `counter_a` and `counter_b` are adjacent in memory (same 64-byte line), every increment of `counter_a` invalidates `counter_b`'s line in the other core's cache, and vice versa. The fix is **padding**: allocate each counter in its own cache line (e.g., `struct { int counter; char pad[60]; }`).

False sharing is the most common real-world coherence performance problem. It is invisible in single-threaded benchmarks and manifests only under parallel load. See [Parallelism](../Distributed-Systems/Concurrency/Parallelism.md) for the broader concurrency context.

### Coherence traffic cost

A coherence miss (e.g., a write to a line in Shared state) requires: (1) invalidating all other copies, (2) waiting for acknowledgments, (3) then proceeding. This adds 20–40 cycles on top of the base DRAM latency. In a 16-core system with a snoop protocol, a single write can generate 15 snoop responses, saturating the interconnect.

</details>

## Physical memory

**DRAM** (Dynamic RAM) is the main memory: 100 cycles, 8–128 GB per system. It is volatile (loses data on power loss). **SRAM** (Static RAM) is used for L1–L3 caches: 4–40 cycles, but 6× the area of DRAM, making it impractical for main memory. **NVRAM** (Non-Volatile RAM) retains data without power; a small, emerging tier (Intel Optane was discontinued in 2022; CXL-attached persistent memory is the current direction). The register file (flip-flop based) is 1 cycle.

<details><summary>Details</summary>

### The DRAM cell and why DRAM is slow

A DRAM cell is a **1T1C** structure: one transistor (access switch) and one capacitor (stores a charge = 1 bit). The capacitor leaks charge, so DRAM must be **refreshed** every 64 ms (all rows re-read and re-written). This is why DRAM is called "dynamic."

A DRAM chip is organized into **banks** (8–32 per chip), each containing a grid of rows and columns. An access to a specific cell requires a three-step sequence:

1. **Row activation (tRCD ≈ 14 cycles)**: open the row in the row buffer (sense the entire row, ~1 Kbit).
2. **Column read (tCL ≈ 14 cycles)**: read the specific column from the row buffer.
3. **Precharge (tRAS ≈ 35 cycles)**: close the row and restore the capacitor charges.

The minimum time between two accesses to the *same* bank is tRCD + tCL + tRAS ≈ 63 cycles. This is the fundamental source of DRAM latency. The memory controller hides this by interleaving accesses across banks (see [Latency vs. Bandwidth](#latency-vs-bandwidth)).

<svg width="500" height="120" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:11px;">
  <!-- DRAM timing diagram -->
  <text x="10" y="20" font-weight="bold">DRAM timing (single bank):</text>
  <!-- Time axis -->
  <line x1="10" y1="100" x2="490" y2="100" stroke="#333" stroke-width="1"/>
  <text x="250" y="115" text-anchor="middle" font-size="10">time →</text>
  <!-- tRCD bar -->
  <rect x="10" y="35" width="140" height="20" fill="#e74c3c" opacity="0.7" rx="3"/>
  <text x="80" y="49" text-anchor="middle" fill="#fff" font-size="10">Row Activate (tRCD)</text>
  <!-- tCL bar -->
  <rect x="150" y="35" width="140" height="20" fill="#f39c12" opacity="0.7" rx="3"/>
  <text x="220" y="49" text-anchor="middle" fill="#fff" font-size="10">Column Read (tCL)</text>
  <!-- tRAS bar -->
  <rect x="290" y="35" width="180" height="20" fill="#2ecc71" opacity="0.7" rx="3"/>
  <text x="380" y="49" text-anchor="middle" fill="#fff" font-size="10">Precharge (tRAS)</text>
  <!-- Data output -->
  <rect x="150" y="65" width="140" height="15" fill="#3498db" opacity="0.7" rx="3"/>
  <text x="220" y="76" text-anchor="middle" fill="#fff" font-size="10">Data on bus</text>
  <!-- Labels -->
  <text x="10" y="30" font-size="10" fill="#e74c3c">tRCD ≈ 14 cyc</text>
  <text x="150" y="30" font-size="10" fill="#f39c12">tCL ≈ 14 cyc</text>
  <text x="290" y="30" font-size="10" fill="#2ecc71">tRAS ≈ 35 cyc</text>
</svg>

### SRAM

An SRAM cell is a **6T latch** (two cross-coupled inverters + two access transistors). No refresh is needed (the state is maintained by positive feedback), but the 6 transistors occupy 6× the area of a 1T1C DRAM cell. This makes SRAM suitable only for small, fast caches (L1–L3), not for main memory.

### NVRAM and emerging tiers

- **Intel Optane** (3D XPoint): 100–200 ns latency, byte-addressable, non-volatile. Discontinued in 2022.
- **CXL-attached memory**: uses the Compute Express Link (CXL) protocol over PCIe to attach additional DRAM or persistent memory to a CPU. Adds a tier between local DRAM and remote NUMA memory.

### ECC and bandwidth

**ECC** (Error-Correcting Code): adds parity bits (typically 8 per 64-byte word) to detect and correct single-bit errors. Standard in server DRAM; optional in consumer systems.

**Bandwidth**: DRAM bandwidth = number of channels × bus width × transfer rate. A dual-channel DDR4-3200 system: $`2 \times 8 \text{ B} \times 3200 \text{ MT/s} = 51.2 \text{ GB/s}`.

</details>

## Virtual memory

Each process sees a contiguous virtual address space (e.g., 48-bit = 256 TB). The **MMU** (Memory Management Unit) translates virtual addresses to physical addresses using **page tables**. The **TLB** (Translation Lookaside Buffer) is a hardware cache of recent translations.

<details><summary>Details</summary>

### Page tables

A **page table** maps virtual page numbers to physical frame numbers. On x86-64, a 4-level table: PML4 → PDPT → PD → PT. Each level is a 512-entry table (9 bits of address per level). The default page size is 4 KB (12 bits of offset).

### TLB and huge pages

The **TLB** is a small, fully-associative hardware cache of recent page-table entries (typically 64–1024 entries). A TLB hit: 1 cycle. A TLB miss: 4–5 memory accesses (walk the page table), adding 400–500 cycles.

**Huge pages** reduce TLB pressure dramatically:
- A **2 MB page** (512 × 4 KB) reduces the number of TLB entries needed by 512×. A 1 GB working set needs only 512 TLB entries with 2 MB pages instead of 262,144 with 4 KB pages.
- A **1 GB page** (512 × 2 MB) reduces entries by 262,144×. Used for very large, contiguous allocations (e.g., database buffers, GPU mappings).

The OS enables huge pages via `madvise(MADV_HUGEPAGE)` or the `hugetlbfs` filesystem. Linux **Transparent Huge Pages (THP)** automatically coalesce 4 KB pages into 2 MB pages in the background. Huge pages are critical for workloads with large, sequential working sets (databases, JVM heaps, scientific computing) where TLB misses dominate.

### Page faults

A **page fault** occurs when a virtual address is not mapped to a physical frame. The OS loads the page from disk (SSD: $`\approx 100 \mu s`, HDD: $`\approx 10` ms). A **major fault** (page on disk) is expensive; a **minor fault** (page in RAM but not mapped to this process) is cheap (~1 µs).

The software management of virtual memory—swap policy, working-set model, thrashing mitigation, and per-process memory layout (text, data, heap, stack)—is covered in [Operating System](./Operating-System.md).

</details>

## NUMA

NUMA (Non-Uniform Memory Access) exists because each CPU socket has its own DRAM memory controllers physically attached to it (see [Physical memory](#physical-memory)). When a system has multiple sockets, each socket's cores can access their local DRAM directly, but must traverse an interconnect (e.g., Intel UPI, AMD Infinity Fabric) to reach another socket's DRAM. Remote accesses also require **coherence traffic** through the interconnect (see [Cache coherence](#cache-coherence)), adding further latency.

<svg width="480" height="200" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <defs>
    <marker id="numaArr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#333"/></marker>
  </defs>
  <!-- Socket 0 -->
  <rect x="20" y="30" width="160" height="140" rx="8" fill="#e8f0fe" stroke="#4285f4" stroke-width="2"/>
  <text x="100" y="52" text-anchor="middle" font-weight="bold">Socket 0</text>
  <rect x="35" y="62" width="60" height="30" rx="4" fill="#fff" stroke="#4285f4"/>
  <text x="65" y="82" text-anchor="middle" font-size="11">Core 0</text>
  <rect x="105" y="62" width="60" height="30" rx="4" fill="#fff" stroke="#4285f4"/>
  <text x="135" y="82" text-anchor="middle" font-size="11">Core 1</text>
  <rect x="35" y="105" width="130" height="30" rx="4" fill="#d4e6fc" stroke="#4285f4"/>
  <text x="100" y="125" text-anchor="middle" font-size="11">Local DRAM</text>
  <text x="100" y="158" text-anchor="middle" font-size="10" fill="#2ecc71">100 cyc</text>

  <!-- Socket 1 -->
  <rect x="300" y="30" width="160" height="140" rx="8" fill="#fef3e0" stroke="#f9ab00" stroke-width="2"/>
  <text x="380" y="52" text-anchor="middle" font-weight="bold">Socket 1</text>
  <rect x="315" y="62" width="60" height="30" rx="4" fill="#fff" stroke="#f9ab00"/>
  <text x="345" y="82" text-anchor="middle" font-size="11">Core 2</text>
  <rect x="385" y="62" width="60" height="30" rx="4" fill="#fff" stroke="#f9ab00"/>
  <text x="415" y="82" text-anchor="middle" font-size="11">Core 3</text>
  <rect x="315" y="105" width="130" height="30" rx="4" fill="#fde8c8" stroke="#f9ab00"/>
  <text x="380" y="125" text-anchor="middle" font-size="11">Local DRAM</text>
  <text x="380" y="158" text-anchor="middle" font-size="10" fill="#2ecc71">100 cyc</text>

  <!-- Interconnect -->
  <line x1="180" y1="120" x2="300" y2="120" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#numaArr)"/>
  <line x1="300" y1="130" x2="180" y2="130" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#numaArr)"/>
  <text x="240" y="112" text-anchor="middle" font-size="10" fill="#e74c3c">UPI / Infinity Fabric</text>
  <text x="240" y="148" text-anchor="middle" font-size="10" fill="#e74c3c">remote: 140–200 cyc</text>
</svg>

Accessing local DRAM takes 100 cycles; accessing remote DRAM takes 140–200 cycles (extra hop through the interconnect plus coherence snoop). This non-uniformity means that thread-to-memory placement affects performance.

<details><summary>Details</summary>

A 2-socket server with 2 NUMA nodes: each socket has its own DRAM channels (see [Physical memory](#physical-memory)). The interconnect connects the two memory controllers. A core on node 0 reading from node 1's memory incurs the interconnect latency on top of the DRAM latency, and the coherence protocol must snoop node 1's caches (see [Cache coherence](#cache-coherence)).

Operating systems and runtimes can pin threads and memory allocations to a specific node to minimize remote accesses:
- Linux: `numactl --cpunodebind=0 --membind=0 ./program`
- Java: `-XX:+UseNUMA` (G1/ZGC)
- Go: `GOMAXPROCS` + `numactl`

A common anti-pattern: allocating a large array on node 0 (because the allocating thread is pinned there) and then having threads on node 1 access it. The fix is **first-touch policy**: have the thread that will use the memory perform the first write, so the page is allocated on its local node.

</details>

## Disk and storage

### Storage media

**HDD** (Hard Disk Drive): 10 ms (10,000,000 cycles). Spinning platter, mechanical arm. **SSD (SATA)**: 100 µs (100,000 cycles). **SSD (NVMe)**: 50 µs (50,000 cycles). NAND flash, no moving parts.

**Sectors**: the minimum unit of disk I/O (512 bytes for HDD, 4 KB for SSD). A **block** (file system level) is typically 4 KB.

<details><summary>Details</summary>

**HDD anatomy**: platters (magnetic storage), actuator arm (positions the read/write head), spindle motor (spins the platter at 5400–15000 RPM). **Seek time** (5–10 ms) dominates; **rotational latency** (2.5–4 ms) is the wait for the sector to rotate under the head.

**SSD**: NAND flash cells store 1–4 bits each (SLC, MLC, TLC, QLC). **Wear leveling**: distribute writes evenly across cells to prevent premature failure. **Garbage collection**: erase and rewrite blocks to free space. **Write amplification**: the ratio of bytes written to NAND vs. bytes written by the host. SSDs connect via [NVMe over PCIe](../Interfaces-and-Buses/Readme.md), which reduces protocol overhead compared to SATA.

</details>

### Redundancy and striping

**RAID** (Redundant Array of Independent Disks) combines multiple disks for throughput and/or [fault tolerance](../Distributed-Systems/Robustness/Fault-Tolerance.md):

<table>
<tr><th>Level</th><th>Minimum disks</th><th>Usable capacity</th><th>Fault tolerance</th><th>Use case</th></tr>
<tr><td>RAID 0</td><td>2</td><td><i>n</i> × single</td><td>None</td><td>Maximum throughput (scratch, render)</td></tr>
<tr><td>RAID 1</td><td>2</td><td><i>n</i>/2 × single</td><td>1 disk</td><td>Boot volumes, small critical data</td></tr>
<tr><td>RAID 5</td><td>3</td><td>(<i>n</i>−1) × single</td><td>1 disk</td><td>General storage, balanced</td></tr>
<tr><td>RAID 6</td><td>4</td><td>(<i>n</i>−2) × single</td><td>2 disks</td><td>Large arrays, long rebuild times</td></tr>
</table>

<details><summary>Details</summary>

- **RAID 0** (striping): data is interleaved across $`n` disks. Read throughput scales linearly; a single disk failure loses all data.
- **RAID 1** (mirroring): each disk has an identical copy. Read throughput doubles (read from either mirror); write throughput is unchanged (write to both).
- **RAID 5** (distributed parity): parity is spread across all disks. A read of a missing block reconstructs it from the other $`n-2` data blocks + parity. Write penalty: read-modify-write of the parity block.
- **RAID 6** (double parity): two independent parity blocks. Tolerates 2 simultaneous disk failures. Important for large arrays where a rebuild of a 16 TB disk takes hours, during which a second failure would be catastrophic.

</details>

## Quizz

<details><summary>Problem</summary>

**Part 1 (Cache hit rate)**: A program accesses a 1 MB array sequentially. The L1 cache is 32 KB (8-way, 64-byte lines), the L2 is 1 MB (16-way), and DRAM is 100 cycles. What is the average access time if the L1 hit rate is 90%, the L2 hit rate is 95% (of L1 misses), and DRAM is 100 cycles?

**Part 2 (NUMA)**: A thread on node 0 reads 50 MB from node 1's memory. The remote DRAM bandwidth is 25 GB/s (half of local, due to interconnect contention) and the remote latency is 160 cycles. Estimate the total time.

**Part 3 (Virtual memory / TLB)**: A process touches 1 GB of memory sequentially with 4 KB pages. The TLB has 1024 entries (fully associative, LRU). Estimate the TLB miss rate and the average address-translation cost (TLB hit = 1 cycle, TLB miss = 4 memory accesses at 100 cycles each).

<details><summary>Solution</summary>

**Part 1: Given hit rates.**

- **L1 hit**: 4 cycles. Probability: 0.90.
- **L2 hit**: 4 + 12 = 16 cycles. Probability: 0.10 × 0.95 = 0.095.
- **DRAM hit**: 4 + 12 + 100 = 116 cycles. Probability: 0.10 × 0.05 = 0.005.

**Average**: $`0.90 \times 4 + 0.095 \times 16 + 0.005 \times 116 = 3.6 + 1.52 + 0.58 = 5.7` cycles.

**What actually happens with sequential access**: For a 1 MB sequential access, $`1 \text{ MB} / 64 \text{ B} = 16{,}384` cache lines. The L1 holds $`512/16384 \approx 3%` of the array. Without prefetch, the hit rate is ≈ 0% (all compulsory misses). With a stride/next-line prefetcher, the effective hit rate can reach 80–90%, bringing the average close to the 5.7-cycle figure.

**Part 2: NUMA remote read.**

50 MB at 25 GB/s: $`50 \times 10^6 / (25 \times 10^9) = 2 \text{ ms}`. The initial latency (160 cycles ≈ 160 ns at 1 GHz) is negligible compared to the transfer time. Total ≈ **2 ms**. For comparison, the same 50 MB from local DRAM at 50 GB/s would take 1 ms.

**Part 3: TLB miss rate.**

1 GB / 4 KB = 262,144 pages. The TLB holds 1024 entries. For sequential access, the TLB covers $`1024 \times 4 \text{ KB} = 4 \text{ MB}` of the working set at any time. After the initial fill, every 1024th page access is a TLB miss (the oldest entry is evicted).

TLB miss rate = $`1/1024 \approx 0.1%`.

Average translation cost = $`0.999 \times 1 + 0.001 \times 400 = 0.999 + 0.4 = 1.4` cycles per access. (4 memory accesses × 100 cycles = 400 cycles for a TLB miss.)

With 2 MB huge pages: 1 GB / 2 MB = 512 pages. The TLB (1024 entries) holds all 512 pages → **0% TLB miss rate**. Average cost = 1 cycle. This is a 1.4× improvement in translation overhead, and the benefit grows with working-set size.

</details>

</details>

<iframe src="./Memory-Hierarchy.simulation.html" title="Memory hierarchy access patterns, prefetching, NUMA, and page faults"></iframe>

