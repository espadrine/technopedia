# Computer Hardware

Computer hardware studies the physical substrate on which programs execute: processors, memory, buses, and the operating system that mediates between software and silicon. It is relevant whenever a program's performance, energy consumption, or resource usage must be understood or optimized.

## Utility

- It explains why some operations are fast and others are slow.
- It provides the abstraction (process, thread, file) that software uses to access hardware.
- It enables parallelism: multiple cores, SIMD, and multicore scaling.

<details><summary>Details</summary>

Computer hardware sits between programming and distributed systems: it takes the executable program produced by the compiler and runs it on physical silicon. The key insight is the **memory hierarchy**: registers (1 cycle) → L1 cache (4 cycles) → L2 cache (12 cycles) → L3 cache (40 cycles) → DRAM (100 cycles) → SSD (100,000 cycles) → HDD (10,000,000 cycles). Each level is faster but smaller and more expensive. The operating system manages this hierarchy: it schedules processes onto cores, maps virtual addresses to physical pages, and multiplexes I/O devices.

</details>

## History

- 1945: von Neumann describes stored-program architecture (CPU + memory + I/O).
- 1971: Intel 4004, the first commercial microprocessor.
- 1978: x86 (Intel 8086) establishes the dominant PC architecture.
- 2000s: multicore processors replace clock-speed scaling; SIMD and out-of-order execution become standard.

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./CPU-Architecture.md'>CPU architecture</a></td><td>Instruction set, pipeline, ALU, FPU, registers</td><td>IPC, clock speed, energy per instruction</td><td>How a single core executes instructions; does not model the memory hierarchy or the OS</td></tr>
<tr><td><a href='./Memory-Hierarchy.md'>Memory hierarchy</a></td><td>Caches, RAM, disk, TLB</td><td>Latency, bandwidth, capacity</td><td>How data is stored and accessed at each level; does not model the instruction pipeline</td></tr>
<tr><td><a href='../Interfaces-and-Buses/Readme.md'>Interfaces and buses</a></td><td>PCIe, USB, SATA, NVMe, Ethernet, WiFi</td><td>Bandwidth, latency, power</td><td>How components communicate; does not model the protocol stack or the application</td></tr>
<tr><td><a href='./Operating-System.md'>Operating system</a></td><td>Processes, threads, virtual memory, file systems, drivers</td><td>Context-switch cost, page fault rate, I/O throughput</td><td>How the OS mediates between programs and hardware; does not model the physical layout of the hardware</td></tr>
</table>

> **Authoritative sources**
> - [Computer Architecture: A Quantitative Approach (Hennessy & Patterson)](https://www.elsevier.com/books/computer-architecture/a-quanitative-approach/978-0-12-812493-3)
> - [Operating System Concepts (Silberschatz, Galvin, Gagne)](https://www.pearson.com/en-us/subject-catalog/p/operating-system-concepts/P200000003515/9780136874608)