# CPU Architecture

CPU architecture studies how a processor executes instructions: from the von Neumann machine and the instruction set, through program execution (pipeline, out-of-order, branch prediction) and the register file, to multicore and interrupts. It is relevant whenever a program's execution time must be understood or optimized at the instruction level.

> **Authoritative sources**
> - [Computer Architecture: A Quantitative Approach (Hennessy & Patterson)](https://www.educate.elsevier.com/book/details/9780128119051)
> - [The RISC-V Reader](http://www.riscvbook.com/)



## Von Neumann architecture

A **von Neumann machine** has a single **memory** that holds both the **program** (the instructions) and the **data**, a **CPU** that reads that memory and computes on it, and **I/O devices** connected to the CPU. The defining idea is the *stored program*: the program is just data in memory, so the same machine can run any program by loading different bits into memory.

<svg width="520" height="210" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:13px;">
  <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
  <!-- CPU box -->
  <rect x="20" y="40" width="170" height="130" rx="8" fill="#e8f0fe" stroke="#4285f4" stroke-width="2"/>
  <text x="105" y="62" text-anchor="middle" font-weight="bold">CPU</text>
  <text x="105" y="110" text-anchor="middle" font-size="11" fill="#4285f4">reads memory, computes, writes back</text>
  <!-- Memory box: program + data -->
  <rect x="270" y="20" width="230" height="92" rx="8" fill="#fef3e0" stroke="#f9ab00" stroke-width="2"/>
  <text x="385" y="40" text-anchor="middle" font-weight="bold">Memory (RAM)</text>
  <rect x="282" y="50" width="100" height="50" rx="4" fill="#fff" stroke="#f9ab00"/>
  <text x="332" y="70" text-anchor="middle" font-size="11">program</text>
  <text x="332" y="86" text-anchor="middle" font-size="10" fill="#555">instructions</text>
  <rect x="388" y="50" width="100" height="50" rx="4" fill="#fff" stroke="#f9ab00"/>
  <text x="438" y="70" text-anchor="middle" font-size="11">data</text>
  <text x="438" y="86" text-anchor="middle" font-size="10" fill="#555">variables</text>
  <!-- Devices box -->
  <rect x="270" y="132" width="230" height="58" rx="8" fill="#e6f4ea" stroke="#34a853" stroke-width="2"/>
  <text x="385" y="156" text-anchor="middle" font-weight="bold">Devices</text>
  <text x="385" y="174" text-anchor="middle" font-size="10" fill="#555">disk, NIC, keyboard, display…</text>
  <!-- CPU <-> Memory -->
  <line x1="190" y1="62" x2="270" y2="55" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="270" y1="80" x2="190" y2="88" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="230" y="48" text-anchor="middle" font-size="11">instructions</text>
  <text x="230" y="103" text-anchor="middle" font-size="11">read/write data</text>
  <!-- CPU <-> Devices -->
  <line x1="190" y1="140" x2="270" y2="155" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="270" y1="170" x2="190" y2="155" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="230" y="132" text-anchor="middle" font-size="11">I/O, interrupts</text>
  <line x1="385" y1="112" x2="385" y2="132" stroke="#34a853" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>

<details><summary>EXPLANATION</summary>

**One memory for code and data.** The CPU reads instruction words from memory exactly like any other data — there is no separate program memory. That is what makes the machine universal: changing the bits in memory changes the program, with no rewiring.

**Harvard architecture.** Some processors (DSPs, microcontrollers) use *separate* instruction and data memories, which allows a simultaneous instruction read and data access in the same cycle — removing the "von Neumann bottleneck". The price: a program cannot be loaded into data memory, so no self-modifying code.

</details>

## Instruction set architecture

The **instruction set architecture (ISA)** is the contract between software and hardware: it defines the **opcodes** (the operations), their **parameters** (operands), the **registers**, and the **addressing modes** (how an operand can reference RAM). Examples: x86-64 (CISC), ARM, RISC-V (RISC). The microarchitecture — pipeline, caches, execution units — is the implementation of that contract and is covered under Program execution below.

<details><summary>EXPLANATION</summary>

**Who creates the ISA, and why.** The CPU manufacturer designs the ISA and publishes the manual — e.g. AMD's [AMD64 Architecture Programmer's Manual](https://docs.amd.com/v/u/en-US/24592_3.25_APM_Vol1_PUB) — so that OS programmers and compiler writers know how to encode programs as bit sequences the chip understands. The CPU is wired onto a motherboard; its pins carry electrical signals encoding instruction and data bits coming from memory. The ISA is precisely the mapping from those bit patterns to their meaning.

**Anatomy of an instruction.** An instruction word is an **opcode** (which operation: add, load, jump…) plus **operand fields** (where the inputs and the output are). An operand can be:

- an **immediate**: a constant encoded directly in the instruction (`addi t0, t1, 5` — the `5`);
- a **register**: a register number (`t0`, `t1` above);
- a **memory address**, computed by an **addressing mode**: base register + index × scale + displacement, e.g. `[rbx + rcx*4 + 8]`.

**Example: summing two numbers in x86-64.** The C function `int sum(int a, int b) { return a + b; }` compiles (System V ABI: arguments in `edi`, `esi`; result returned in `eax`) to:

```
sum:
  lea  eax, [rdi + rsi]   ; eax = edi + esi  (lea computes an address; here used as an add)
  ret                     ; return to the caller; the result is in eax
```

The caller executes `call sum`, which pushes the return address onto the stack and jumps to `sum`; `ret` pops that address back and resumes the caller (the stack mechanics are shown in the simulation under Program execution).

**Register vs. RAM operands, precisely.** The operand fields of an instruction select either a register number or a memory address:

- **RISC-V** uses fixed 32-bit words with explicit fields: `rs1` and `rs2` are 5-bit register numbers, and a 12-bit immediate serves as the displacement for loads/stores — `lw t0, 8(t1)` reads RAM at address `t1 + 8` into `t0`; `sw t0, 8(t1)` writes it back.
- **x86** uses variable-length instructions with a **ModRM** byte whose `mod`/`reg`/`rm` fields encode either a register or an addressing mode, plus an optional **SIB** byte for base + index×scale: `mov eax, [rbx + rcx*4 + 8]` loads `eax` from RAM at `rbx + rcx*4 + 8` (one memory read); `mov [rbx + rcx*4 + 8], eax` stores it.

**CISC vs. RISC.** x86 is CISC: instructions like `movsb` (copy a string byte) do a lot in one opcode; modern x86 CPUs decode them internally into RISC-like **micro-ops** (µops) executed on a superscalar pipeline, while the ISA stays CISC for compatibility. RISC-V is the opposite: every instruction is one simple operation in a fixed 32-bit word.

**Worked example.** `movsb` copies a byte from `[RSI]` to `[RDI]` and increments both. A modern Intel CPU decodes it into 3 µops: (1) load from `[RSI]`, (2) store to `[RDI]`, (3) increment RSI and RDI — each scheduled independently.

> **Authoritative sources**
> - [The RISC-V Reader](http://www.riscvbook.com/)
> - [AMD64 Architecture Programmer's Manual](https://www.amd.com/content/dam/amd/en/documents/processor-tech-docs/programmer-references/40332.pdf)

<details><summary>Example problem</summary>

A RISC-V CPU has 32 general-purpose registers (x0–x31); an x86-64 CPU has 16. Why does RISC-V need more?

<details><summary>Solution</summary>

RISC-V instructions are fixed-width (32 bits) with limited operand fields (3 × 5-bit register numbers). More architectural registers reduce spilling to memory, which matters when each instruction can reference only a few registers directly. x86-64 compensates with variable-length instructions and richer addressing modes.

</details>

</details>

</details>


## Program execution

A binary executable on disk (e.g., an ELF file) is brought into memory by the **loader**: its code and data segments are mapped at their virtual addresses, and the **instruction pointer (IP, also called PC)** is set to the entry point. The CPU then runs the **fetch–decode–execute cycle**: read the instruction word at address IP from memory, decode its opcode and operands, execute it, and update IP (IP + 4 for sequential flow, or a branch target). The simulation below steps through a function call, showing the program in the text segment, the stack growing around the call, the registers, and where the IP points.

<iframe src="./Program-execution.simulation.html" title="Step through a function call: program in the text segment, stack, registers, and IP"></iframe>

<details><summary>EXPLANATION</summary>

**The cycle, step by step.** Take the RISC-V instruction `addi t0, t1, 5` stored at IP = 0x0040:

1. **Read**: fetch the 32-bit word at IP → `0x00500293`.
2. **Decode**: opcode = `0010011` (OP-IMM), destination register rd = `t0` (x5), source rs1 = `t1` (x6), immediate = 5.
3. **Execute**: compute `R[t1] + 5`.
4. **Writeback**: store the result into `R[t0]`.
5. **Update IP**: IP ← IP + 4 (or a branch target).

**IP behavior.** Sequential instructions advance IP by the instruction size; a branch/jump loads IP with the target address. `call` pushes the return address (the IP after the call) onto the stack and jumps; `ret` pops it back into IP — that is the mechanism visible in the simulation above.

</details>

### Taxonomy of parallelism

Modern CPUs exploit three distinct forms of parallelism, each targeting a different source of concurrency:

<table>
<tr><th>Type</th><th>Full name</th><th>Source of parallelism</th><th>Mechanism</th></tr>
<tr><td>ILP</td><td>Instruction-Level Parallelism</td><td>Independent instructions in the stream</td><td>Pipelining, superscalar, out-of-order execution</td></tr>
<tr><td>DLP</td><td>Data-Level Parallelism</td><td>Independent data elements within one operation</td><td>SIMD (SSE, AVX, AVX-512)</td></tr>
<tr><td>TLP</td><td>Thread-Level Parallelism</td><td>Independent threads of execution</td><td>Multicore, SMT (hyperthreading)</td></tr>
</table>

The rest of this page covers each type in turn: ILP (pipelining and out-of-order execution, below), DLP (SIMD, under Registers), and TLP (multicore).



### Pipelining

A **pipeline** divides instruction execution into stages: **Fetch → Decode → Execute → Memory → Writeback**. Each stage takes one cycle; multiple instructions are in different stages simultaneously. Ideal throughput: 1 instruction per cycle (IPC = 1). Pipelining is the first and simplest form of ILP.

<svg width="560" height="170" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <!-- Stage headers -->
  <rect x="10" y="10" width="100" height="30" rx="4" fill="#4285f4"/>
  <text x="60" y="30" text-anchor="middle" fill="#fff" font-weight="bold">Fetch</text>
  <rect x="120" y="10" width="100" height="30" rx="4" fill="#34a853"/>
  <text x="170" y="30" text-anchor="middle" fill="#fff" font-weight="bold">Decode</text>
  <rect x="230" y="10" width="100" height="30" rx="4" fill="#f9ab00"/>
  <text x="280" y="30" text-anchor="middle" fill="#fff" font-weight="bold">Execute</text>
  <rect x="340" y="10" width="100" height="30" rx="4" fill="#ea4335"/>
  <text x="390" y="30" text-anchor="middle" fill="#fff" font-weight="bold">Memory</text>
  <rect x="450" y="10" width="100" height="30" rx="4" fill="#9c27b0"/>
  <text x="500" y="30" text-anchor="middle" fill="#fff" font-weight="bold">Writeback</text>
  <!-- Row 1: I1 -->
  <rect x="450" y="50" width="100" height="24" rx="3" fill="#e1bee7" stroke="#9c27b0"/>
  <text x="500" y="67" text-anchor="middle">I1</text>
  <!-- Row 2: I2 -->
  <rect x="340" y="80" width="100" height="24" rx="3" fill="#ffcdd2" stroke="#ea4335"/>
  <text x="390" y="97" text-anchor="middle">I2</text>
  <!-- Row 3: I3 -->
  <rect x="230" y="110" width="100" height="24" rx="3" fill="#fff9c4" stroke="#f9ab00"/>
  <text x="280" y="127" text-anchor="middle">I3</text>
  <!-- Row 4: I4 -->
  <rect x="120" y="140" width="100" height="24" rx="3" fill="#c8e6c9" stroke="#34a853"/>
  <text x="170" y="157" text-anchor="middle">I4</text>
  <!-- Row 5: I5 -->
  <rect x="10" y="140" width="100" height="24" rx="3" fill="#bbdefb" stroke="#4285f4"/>
  <text x="60" y="157" text-anchor="middle">I5</text>
</svg>

<details><summary>EXPLANATION</summary>

<iframe src="./CPU-pipeline.simulation.html" title="Interactive 5-stage CPU pipeline with branch misprediction"></iframe>
**The five stages.** Each instruction passes through five functional units in sequence. At steady state, one instruction enters Fetch per cycle while another is in Decode, another in Execute, etc. The pipeline is full after 5 cycles and then produces one result per cycle.

**Worked example: 5 instructions, cycle by cycle.**

Consider this RISC-V sequence (no branches):

```
I1: add  r1, r2, r3
I2: mul  r4, r1, r5      (depends on I1)
I3: sub  r6, r7, r8      (independent)
I4: add  r9, r4, r10     (depends on I2)
I5: sw   r9, 0(r11)      (depends on I4)
```

<table>
<tr><th>Cycle</th><th>Fetch</th><th>Decode</th><th>Execute</th><th>Memory</th><th>Writeback</th></tr>
<tr><td>1</td><td>I1</td><td></td><td></td><td></td><td></td></tr>
<tr><td>2</td><td>I2</td><td>I1</td><td></td><td></td><td></td></tr>
<tr><td>3</td><td>I3</td><td>I2</td><td>I1</td><td></td><td></td></tr>
<tr><td>4</td><td>I4</td><td>I3</td><td>I2</td><td>I1</td><td></td></tr>
<tr><td>5</td><td>I5</td><td>I4</td><td>I3</td><td>I2</td><td>I1</td></tr>
<tr><td>6</td><td></td><td>I5</td><td>I4</td><td>I3</td><td>I2</td></tr>
<tr><td>7</td><td></td><td></td><td>I5</td><td>I4</td><td>I3</td></tr>
<tr><td>8</td><td></td><td></td><td></td><td>I5</td><td>I4</td></tr>
<tr><td>9</td><td></td><td></td><td></td><td></td><td>I5</td></tr>
</table>

Total: 9 cycles for 5 instructions → CPI = 9/5 = 1.8 (including fill/drain). At steady state (long program), CPI → 1.

**Data hazards and forwarding.** I2 needs the result of I1, which is not written back until cycle 5. Without forwarding, I2 would stall 2 cycles. With **forwarding** (bypassing the register file), the ALU output of I1 (available at the end of Execute, cycle 3) is routed directly to the ALU input of I2 (cycle 4). No stall.

**Control hazards and branch prediction.** A branch changes the IP. The CPU predicts the outcome (taken/not-taken) and speculatively executes the predicted path. A **misprediction** flushes the pipeline and restarts from the correct target. Modern predictors (TAGE, perceptron) achieve $`> 97\%` accuracy. On a 14–20 stage pipeline, a misprediction penalty is typically 14–20 cycles.

**Structural hazards.** Two instructions need the same resource in the same cycle (e.g., one ALU). Resolved by adding resources (superscalar) or stalling.

> **Authoritative sources**
> - [Computer Architecture: A Quantitative Approach (Hennessy & Patterson)](https://www.educate.elsevier.com/book/details/9780128119051)

<details><summary>Example problem</summary>

A 5-stage pipeline executes the sequence: `add r1, r2, r3` / `add r4, r1, r5` / `add r6, r7, r8`. With full forwarding (no stalls for data hazards), how many cycles does this take?

<details><summary>Solution</summary>

With forwarding, the second `add` can execute in the cycle immediately after the first (the result is forwarded from the Execute stage). The third `add` is independent. The sequence takes 5 + 2 = 7 cycles (5 to fill + 2 more for the last two instructions to complete). CPI = 7/3 ≈ 2.33 for this short sequence.

</details>

</details>

</details>

A single pipeline still issues only one instruction per cycle. To exploit more ILP, the CPU needs multiple execution units and smarter scheduling.



### Superscalar and out-of-order execution

**Superscalar**: the CPU has multiple execution units (e.g., 2 ALUs, 1 FPU, 1 load/store) and can **issue** multiple instructions per cycle. The **issue width** (e.g., 4-wide) is the maximum number of instructions dispatched per cycle.

**Out-of-order (OOO) execution**: the CPU reorders instructions to keep the execution units busy even when data dependencies would stall an in-order pipeline. The mechanism:

- **Register renaming**: eliminates false dependencies (WAR, WAW) by mapping architectural registers to a larger pool of physical registers.
- **Dependency tracking**: the CPU tracks which instructions are waiting for which operands (via the reservation station / issue queue).
- **Reorder buffer (ROB)**: tracks in-flight instructions so that results are **committed in program order** even though they executed out of order.

<svg width="600" height="280" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:11px;">
  <defs><marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
  <!-- Title -->
  <text x="300" y="16" text-anchor="middle" font-weight="bold" font-size="13">Out-of-Order Execution: Renaming → Issue → Commit</text>
  <!-- Architectural registers -->
  <rect x="20" y="30" width="120" height="100" rx="6" fill="#e8f0fe" stroke="#4285f4" stroke-width="1.5"/>
  <text x="80" y="48" text-anchor="middle" font-weight="bold">Arch. Regs</text>
  <text x="80" y="66" text-anchor="middle">R0 → P3</text>
  <text x="80" y="82" text-anchor="middle">R1 → P5</text>
  <text x="80" y="98" text-anchor="middle">R2 → P7</text>
  <text x="80" y="114" text-anchor="middle">R3 → P2</text>
  <!-- Arrow to physical -->
  <line x1="140" y1="80" x2="180" y2="80" stroke="#333" stroke-width="1.5" marker-end="url(#arr2)"/>
  <text x="160" y="72" text-anchor="middle" font-size="10">rename</text>
  <!-- Physical register file -->
  <rect x="180" y="30" width="120" height="100" rx="6" fill="#c8e6c9" stroke="#34a853" stroke-width="1.5"/>
  <text x="240" y="48" text-anchor="middle" font-weight="bold">Physical Regs</text>
  <text x="240" y="66" text-anchor="middle">P0, P1, P2</text>
  <text x="240" y="82" text-anchor="middle">P3, P4, P5</text>
  <text x="240" y="98" text-anchor="middle">P6, P7, P8</text>
  <text x="240" y="114" text-anchor="middle">(128–256 total)</text>
  <!-- Arrow to RS -->
  <line x1="300" y1="80" x2="340" y2="80" stroke="#333" stroke-width="1.5" marker-end="url(#arr2)"/>
  <!-- Reservation Station -->
  <rect x="340" y="30" width="130" height="100" rx="6" fill="#fff9c4" stroke="#f9ab00" stroke-width="1.5"/>
  <text x="405" y="48" text-anchor="middle" font-weight="bold">Reservation Stn</text>
  <text x="405" y="66" text-anchor="middle">I2: wait P5,P6</text>
  <text x="405" y="82" text-anchor="middle">I3: ready ✓</text>
  <text x="405" y="98" text-anchor="middle">I4: wait P5</text>
  <text x="405" y="114" text-anchor="middle">I5: ready ✓</text>
  <!-- Arrow to ROB -->
  <line x1="470" y1="80" x2="510" y2="80" stroke="#333" stroke-width="1.5" marker-end="url(#arr2)"/>
  <!-- ROB -->
  <rect x="510" y="30" width="80" height="100" rx="6" fill="#e1bee7" stroke="#9c27b0" stroke-width="1.5"/>
  <text x="550" y="48" text-anchor="middle" font-weight="bold">ROB</text>
  <text x="550" y="66" text-anchor="middle">I1 ✓</text>
  <text x="550" y="82" text-anchor="middle">I2 …</text>
  <text x="550" y="98" text-anchor="middle">I3 …</text>
  <text x="550" y="114" text-anchor="middle">I4 …</text>
  <!-- Bottom: commit -->
  <rect x="20" y="150" width="570" height="50" rx="6" fill="#fce4ec" stroke="#e91e63" stroke-width="1.5"/>
  <text x="305" y="170" text-anchor="middle" font-weight="bold">Commit (in program order)</text>
  <text x="305" y="190" text-anchor="middle">I1 commits → I2 commits → I3 commits → … (architectural state updated only at commit)</text>
  <!-- Speculative note -->
  <rect x="20" y="215" width="570" height="50" rx="6" fill="#fff3e0" stroke="#ff9800" stroke-width="1.5"/>
  <text x="305" y="235" text-anchor="middle" font-weight="bold">Speculative execution</text>
  <text x="305" y="253" text-anchor="middle">Instructions execute before commit (ROB tracks them). On misprediction, all speculative entries are flushed.</text>
</svg>

<details><summary>EXPLANATION</summary>

**Why OOO is needed.** In a 5-stage in-order pipeline, if I2 depends on I1's result, I2 stalls even if I3 and I4 are independent. With OOO, the CPU dispatches I3 and I4 to execution units while I2 waits, keeping the hardware busy.

**Register renaming.** Architectural registers (e.g., R0–R31) are mapped to a larger pool of physical registers (e.g., 128–256). This eliminates **false dependencies**: a Write-After-Read (WAR) or Write-After-Write (WAW) hazard disappears because each write gets a fresh physical register. Only true data dependencies (Read-After-Write) remain.

**Worked example.** Consider:

```
I1: add  r1, r2, r3    → writes P5 (renamed r1)
I2: mul  r4, r1, r5    → reads P5, writes P8 (renamed r4)
I3: sub  r6, r7, r8    → reads P9, P10, writes P11 (renamed r6)
I4: add  r1, r4, r9    → reads P8, P12, writes P13 (renamed r1 again)
```

I3 is independent of I1/I2 and can execute immediately. I4 must wait for I2's result (P8). The ROB ensures I1 commits before I2, I2 before I3, I3 before I4 — even though I3 may finish before I2.

**Speculative execution.** Modern CPUs execute instructions that have **not yet committed**. The ROB tracks all in-flight instructions. The CPU also performs **speculative store forwarding** (a load can read a value from a prior store that has not yet committed) and **speculatively executes past a branch** before the target is known. This is distinct from branch prediction: even with a perfect predictor, the CPU speculatively fills the ROB with instructions that will only become architecturally visible at commit. On a misprediction or exception, all speculative (uncommitted) entries in the ROB are flushed.

**Interaction with branch prediction.** The CPU speculatively executes down the predicted path, filling the ROB with speculative instructions. On misprediction, the ROB is flushed and refilled from the correct path. The penalty is the number of cycles to refill the pipeline (typically 14–20 cycles on modern CPUs).

> **Authoritative sources**
> - [Computer Architecture: A Quantitative Approach (Hennessy & Patterson)](https://www.educate.elsevier.com/book/details/9780128119051)

<details><summary>Example problem</summary>

A 4-wide OOO CPU has a 128-entry ROB. The program has a loop with 4 independent instructions followed by a dependent instruction. What is the maximum IPC the CPU can sustain in the loop body (ignoring branch effects)?

<details><summary>Solution</summary>

The 4 independent instructions can all be issued in one cycle (4-wide). The 5th instruction depends on one of them, so it must wait 1 cycle. Over 5 instructions: 2 cycles (4 issued in cycle 1, 1 in cycle 2). IPC = 5/2 = 2.5. The ROB is not the bottleneck here (only 5 entries needed).

</details>

</details>

</details>


Superscalar and OOO exploit ILP across *different* instructions. SIMD exploits DLP across *different data elements* within a single instruction.

## Registers

The **register file** is the CPU's fastest storage: a few dozen registers, each addressed by number directly in the instruction word and read or written in a single cycle. They come in four groups:

<svg width="520" height="150" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <rect x="10" y="10" width="500" height="130" rx="8" fill="#f5f5f5" stroke="#333" stroke-width="2"/>
  <text x="260" y="30" text-anchor="middle" font-weight="bold">Register file</text>
  <rect x="25" y="42" width="115" height="85" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="82" y="60" text-anchor="middle" font-weight="bold" font-size="11">General-purpose</text>
  <text x="82" y="78" text-anchor="middle" font-size="10">rax … r15</text>
  <text x="82" y="94" text-anchor="middle" font-size="10">16 × 64-bit</text>
  <text x="82" y="110" text-anchor="middle" font-size="9" fill="#555">integers, addresses</text>
  <rect x="150" y="42" width="115" height="85" rx="6" fill="#fff8e1" stroke="#f9a825" stroke-width="2"/>
  <text x="207" y="60" text-anchor="middle" font-weight="bold" font-size="11">Special-purpose</text>
  <text x="207" y="78" text-anchor="middle" font-size="10">rip, rflags, cr3…</text>
  <text x="207" y="94" text-anchor="middle" font-size="10">IP, flags, control</text>
  <text x="207" y="110" text-anchor="middle" font-size="9" fill="#555">kernel-mode mostly</text>
  <rect x="275" y="42" width="115" height="85" rx="6" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="332" y="60" text-anchor="middle" font-weight="bold" font-size="11">Floating-point</text>
  <text x="332" y="78" text-anchor="middle" font-size="10">xmm0–15, st0–7</text>
  <text x="332" y="94" text-anchor="middle" font-size="10">IEEE-754 (FPU)</text>
  <text x="332" y="110" text-anchor="middle" font-size="9" fill="#555">scalar floats</text>
  <rect x="400" y="42" width="100" height="85" rx="6" fill="#f3e5f5" stroke="#8e24aa" stroke-width="2"/>
  <text x="450" y="60" text-anchor="middle" font-weight="bold" font-size="11">Vector</text>
  <text x="450" y="78" text-anchor="middle" font-size="10">ymm, zmm regs</text>
  <text x="450" y="94" text-anchor="middle" font-size="10">SIMD lanes</text>
  <text x="450" y="110" text-anchor="middle" font-size="9" fill="#555">SSE/AVX/NEON</text>
</svg>

- **General-purpose registers**: integers and addresses; the ALU reads and writes them.
- **Special-purpose registers**: program counter (IP/PC), flags, stack pointer, and other control state.
- **Floating-point registers**: IEEE-754 numbers, operated on by the FPU.
- **Vector registers**: fixed-width lanes for SIMD operations.

### General-purpose registers

On x86-64 one register has several names by width: `rax` is the full 64-bit register, `eax` its low 32 bits, `ax` the low 16, `al` the low 8. **Integers are stored in two's complement**: the most significant bit is the sign, so an $`n`$-bit register holds $`-2^{n-1}`$ to $`2^{n-1}-1`$; a negative number is the bitwise complement of its absolute value plus one ($`-1 = 0xFFFF…FF`$). When an operation exceeds the range, the result **wraps around** (integer **overflow**) and the CPU sets the overflow flag. The **ALU** performs the arithmetic: add, subtract, AND/OR/XOR, shifts, compares.

<details><summary>EXPLANATION</summary>

**Two's complement in one line.** To negate, invert all bits and add 1, so subtraction is a plain addition ($`a - b = a + (\sim b + 1)`$) and the ALU needs no separate subtractor.

**Worked example.** In 8-bit registers, $`0x7F + 1 = 0x80`$: two positive operands produced a negative result, so the signed overflow flag (OF) is set — even though unsigned, $`127 + 1 = 128`$ is fine.

**Why registers matter.** Every ALU operand is a register (or an immediate constant); loading from RAM costs tens to hundreds of cycles (see [Memory Hierarchy](./Memory-Hierarchy.md)). Keeping hot values in registers is what makes the fetch-decode-execute loop fast.

</details>

### ALU and integer encoding

The **ALU** (Arithmetic Logic Unit) performs integer arithmetic and logic — add, subtract, AND/OR/XOR, shifts, compares — with register (or immediate) operands. On x86-64 one physical register has several names by width; they all alias the low bits of `rax`:

<svg width="520" height="160" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <rect x="40" y="20" width="440" height="26" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="260" y="38" text-anchor="middle" font-weight="bold">rax — 64 bits</text>
  <rect x="40" y="58" width="220" height="26" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="150" y="76" text-anchor="middle" font-weight="bold">eax — low 32 bits</text>
  <rect x="40" y="96" width="110" height="26" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>
  <text x="95" y="114" text-anchor="middle" font-weight="bold">ax — low 16</text>
  <rect x="40" y="132" width="55" height="22" fill="#ffcdd2" stroke="#c62828" stroke-width="2"/>
  <text x="67" y="147" text-anchor="middle" font-size="10" font-weight="bold">al</text>
  <rect x="95" y="132" width="55" height="22" fill="#e1bee7" stroke="#8e24aa" stroke-width="2"/>
  <text x="122" y="147" text-anchor="middle" font-size="10" font-weight="bold">ah</text>
  <line x1="260" y1="46" x2="260" y2="58" stroke="#999" stroke-dasharray="3 2"/>
  <line x1="150" y1="84" x2="150" y2="96" stroke="#999" stroke-dasharray="3 2"/>
  <line x1="95" y1="122" x2="95" y2="132" stroke="#999" stroke-dasharray="3 2"/>
  <text x="40" y="12" font-size="10" fill="#555">bit 63 … bit 0 →</text>
</svg>

Integers are stored in **two's complement**: the top bit is the sign, an $`n`$-bit register holds $`-2^{n-1}`$ to $`2^{n-1}-1`$, and negation is "invert all bits and add 1", so the ALU needs no separate subtractor. When an operation exceeds the range, the result **wraps around** (integer **overflow**) and the CPU sets the overflow flag (OF).

<iframe src="./Integer-encoding.simulation.html" title="32-bit two's complement integer: add/subtract buttons and overflow at 0x7FFFFFFF"></iframe>

<details><summary>EXPLANATION</summary>

**Worked example.** In 8-bit registers, $`0x7F + 1 = 0x80`$: two positive operands produced a negative result — signed overflow (OF=1), even though unsigned $`127 + 1 = 128`$ is fine. In 32 bits, $`0x7FFFFFFF + 1 = 0x80000000 = -2^{31}`$: the classic overflow.

**Why it matters.** Compilers and languages rely on this: wrapping is used by hash functions and PRNGs; languages like Rust trap on overflow in debug mode. The flags register records OF (and carry CF, zero ZF, sign SF) for conditional branches.

<details><summary>Example problem</summary>

A 32-bit CPU executes `add r1, r2, r3` where `r2 = 0x7FFFFFFF` and `r3 = 1`. What is the result in `r1`, and is the overflow flag set?

<details><summary>Solution</summary>

$`0x7FFFFFFF + 1 = 0x80000000`$, which is $`-2^{31}`$ in two's complement. The overflow flag is **set**: two positive operands produced a negative result (sign bit flipped from 0 to 1).

</details>

</details>

</details>

### Special-purpose registers

- **Program counter (PC/IP)**: address of the next instruction to fetch; updated to IP+4, or to a branch target.
- **Flags register** (x86 `RFLAGS`): condition codes — zero (ZF), carry (CF), sign (SF), overflow (OF) — set by arithmetic instructions and read by conditional branches.
- **Stack pointer (SP)**: top of the call stack in memory, used by `call`/`ret` (see [Memory Management](../Programming/Memory-Management.md)).
- **Control/status registers**: privilege level, page-table base, interrupt-enable bit — writable only in kernel mode.



### Floating-point registers (FPU, IEEE-754)

The Execute stage performs both integer (ALU) and floating-point (FPU) operations. The FPU reads and writes **IEEE-754** numbers. A **float32** has 1 sign bit, 8 exponent bits, 23 mantissa bits. A **float64** has 1 sign bit, 11 exponent bits, 52 mantissa bits. The value is $`(-1)^s \times 2^{e-127} \times (1 + m/2^{23})` for a normal float32.

<svg width="520" height="80" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <!-- Sign bit -->
  <rect x="10" y="20" width="30" height="30" fill="#ea4335" opacity="0.7"/>
  <text x="25" y="40" text-anchor="middle" fill="#fff" font-weight="bold">s</text>
  <text x="25" y="65" text-anchor="middle" font-size="11">1 bit</text>
  <!-- Exponent -->
  <rect x="40" y="20" width="120" height="30" fill="#f9ab00" opacity="0.7"/>
  <text x="100" y="40" text-anchor="middle" fill="#fff" font-weight="bold">exponent</text>
  <text x="100" y="65" text-anchor="middle" font-size="11">8 bits</text>
  <!-- Mantissa -->
  <rect x="160" y="20" width="340" height="30" fill="#4285f4" opacity="0.7"/>
  <text x="330" y="40" text-anchor="middle" fill="#fff" font-weight="bold">mantissa (fraction)</text>
  <text x="330" y="65" text-anchor="middle" font-size="11">23 bits</text>
  <!-- Total label -->
  <text x="260" y="15" text-anchor="middle" font-size="11">32-bit float32</text>
</svg>

<details><summary>EXPLANATION</summary>

<iframe src="./IEEE-754.simulation.html" title="Interactive IEEE-754 float32 bit manipulation"></iframe>
**Encoding.** The exponent is stored **biased** by 127 (float32) so that a simple unsigned comparison of the exponent field gives the correct ordering. The mantissa stores the fractional part after the leading 1 (which is implicit for normal numbers).

**Worked example: encode 6.5 as float32.**

1. $`6.5 = 1.625 \times 2^2`.
2. Sign: $`s = 0` (positive).
3. Exponent: $`e = 2 + 127 = 129 = 10000001_2`.
4. Mantissa: $`0.625 = 0.101_2`, so the 23-bit field is `10100000000000000000000`.
5. Final: `0 10000001 10100000000000000000000` = `0x40D00000`.

**Special values.** $`+0, -0, +\infty, -\infty, NaN` (Not a Number). $`0/0 = NaN`, $`\infty/\infty = NaN`, $`0 \times \infty = NaN`.

**Rounding modes.** Round-to-nearest (default), round-toward-zero, round-toward-$`+\infty`, round-toward-$`-\infty`.

**Precision and denormals.** float32 has $`\approx 7` decimal digits; float64 has $`\approx 15`. $`0.1 + 0.2 \neq 0.3` in float32 (and float64): $`0.1` and $`0.2` are not exactly representable. When the exponent is all zeros, the leading 1 is dropped (**denormal**), allowing gradual underflow to zero.

> **Authoritative sources**
> - [IEEE 754-2019 Standard for Floating-Point Arithmetic](https://standards.ieee.org/standard/754-2019.html)

<details><summary>Example problem</summary>

What is the smallest positive normal float32? What is the largest?

<details><summary>Solution</summary>

Smallest normal: exponent = 1, mantissa = 0 → $`2^{-126} \approx 1.18 \times 10^{-38}`. Largest normal: exponent = 254, mantissa all 1s → $`(2 - 2^{-23}) \times 2^{127} \approx 3.4 \times 10^{38}`.

</details>

</details>

</details>


### Vector registers and SIMD (SSE, AVX, NEON)

**SIMD** (Single Instruction, Multiple Data): one instruction operates on multiple data elements in parallel. SSE (128-bit), AVX (256-bit), AVX-512 (512-bit) on x86; NEON on ARM. A single `ADDPS` adds 4 floats simultaneously.

<svg width="520" height="140" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <defs><marker id="arr3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
  <!-- Title -->
  <text x="260" y="16" text-anchor="middle" font-weight="bold" font-size="13">SIMD: one opcode, four lanes</text>
  <!-- Opcode -->
  <rect x="10" y="50" width="70" height="40" rx="4" fill="#4285f4"/>
  <text x="45" y="75" text-anchor="middle" fill="#fff" font-weight="bold">ADDPS</text>
  <!-- Arrow -->
  <line x1="80" y1="70" x2="120" y2="70" stroke="#333" stroke-width="2" marker-end="url(#arr3)"/>
  <!-- Vector register: 4 lanes -->
  <rect x="120" y="40" width="380" height="60" rx="4" fill="#e8f0fe" stroke="#4285f4" stroke-width="1.5"/>
  <rect x="120" y="40" width="95" height="60" fill="#bbdefb" stroke="#4285f4"/>
  <text x="167" y="62" text-anchor="middle" font-size="11">lane 0</text>
  <text x="167" y="82" text-anchor="middle" font-size="11">a[0]+b[0]</text>
  <rect x="215" y="40" width="95" height="60" fill="#c8e6c9" stroke="#34a853"/>
  <text x="262" y="62" text-anchor="middle" font-size="11">lane 1</text>
  <text x="262" y="82" text-anchor="middle" font-size="11">a[1]+b[1]</text>
  <rect x="310" y="40" width="95" height="60" fill="#fff9c4" stroke="#f9ab00"/>
  <text x="357" y="62" text-anchor="middle" font-size="11">lane 2</text>
  <text x="357" y="82" text-anchor="middle" font-size="11">a[2]+b[2]</text>
  <rect x="405" y="40" width="95" height="60" fill="#ffcdd2" stroke="#ea4335"/>
  <text x="452" y="62" text-anchor="middle" font-size="11">lane 3</text>
  <text x="452" y="82" text-anchor="middle" font-size="11">a[3]+b[3]</text>
  <!-- Width label -->
  <text x="310" y="118" text-anchor="middle" font-size="11">128-bit XMM register (4 × 32-bit float)</text>
</svg>

<details><summary>EXPLANATION</summary>

**How SIMD works.** A vector register (e.g., a 128-bit XMM register) is divided into fixed-width lanes. A single opcode is broadcast to all lanes simultaneously. For `ADDPS` (add packed single-precision floats), one instruction performs 4 independent 32-bit floating-point additions.

**Worked example.** Add two arrays of 4 floats: `a = [1.0, 2.0, 3.0, 4.0]`, `b = [10.0, 20.0, 30.0, 40.0]`.

1. Load `a` into XMM0 (128 bits: four 32-bit floats).
2. Load `b` into XMM1.
3. Execute `ADDPS XMM0, XMM1` → XMM0 = [11.0, 22.0, 33.0, 44.0].
4. Store XMM0 back to memory.

Four additions in one instruction (vs. 4 scalar instructions). With AVX-512, 16 additions in one instruction.

**When SIMD helps.** SIMD is most effective for **data-parallel** workloads: image processing, audio, scientific computing, matrix operations. The compiler (auto-vectorization) or the programmer (intrinsics) must ensure that the data fits in the vector register width and that the operations are uniform across lanes.

**Limitations.** If the data has irregular access patterns (e.g., a linked list), SIMD cannot help. If the operation is not uniform (e.g., a branch that depends on per-element data), the lanes must be masked or the code must fall back to scalar.

> **Authoritative sources**
> - [Computer Architecture: A Quantitative Approach (Hennessy & Patterson)](https://www.educate.elsevier.com/book/details/9780128119051)

<details><summary>Example problem</summary>

You need to compute the dot product of two 1024-element float arrays. Using AVX (256-bit, 8 floats per register), how many `MULPS` + `ADDPS` instruction pairs are needed (ignoring the final horizontal sum)?

<details><summary>Solution</summary>

1024 elements ÷ 8 per register = 128 vector operations. Each requires one `MULPS` and one `ADDPS` (accumulating into an accumulator register). So 128 pairs of instructions. The final horizontal sum (`HADDPS` or `EXTRACT` + scalar adds) takes a few more instructions.

</details>

</details>

</details>



SIMD parallelizes within one core. The next level of parallelism is across multiple cores on the same chip.

## Multicore

**Multicore**: multiple independent cores on one chip. Each core has its own pipeline, registers, and L1/L2 cache. Cores share L3 cache and DRAM.

**Hyperthreading** (SMT): two logical threads share one physical core's execution units. Increases utilization when one thread is stalled (e.g., waiting for memory). The operating system schedules threads onto logical cores; see [Operating System](./Operating-System.md) for context switching and scheduling.

**Atomic operations.** Across cores, a read-modify-write must be indivisible: x86 provides the `LOCK` prefix and atomic opcodes (`CMPXCHG`, `XADD`), ARM provides load-linked/store-conditional pairs (`LDXR`/`STXR`). These implement spinlocks and lock-free data structures; combined with **memory barriers** (`MFENCE`, `DMB`) they also order memory operations across cores. See [Parallelism](../Distributed-Systems/Concurrency/Parallelism.md).

<details><summary>EXPLANATION</summary>

**Amdahl's law.** The speedup of a parallel system is limited by the serial fraction. $`S = 1 / (f + (1-f)/p)` where $`f` is the serial fraction and $`p` is the number of cores. If 10% of the code is serial, the maximum speedup with infinite cores is $`1/0.1 = 10`.

**Worked example.** A program takes 100 s single-threaded. 80% is parallelizable. With 8 cores: $`S = 1/(0.2 + 0.8/8) = 1/0.3 \approx 3.33`. New time: $`100/3.33 \approx 30` s.

**L1 bandwidth.** A 3 GHz Intel Golden Cove (Alder Lake) core has two 32-byte load ports, giving 64 B/cycle L1 read bandwidth → $`3 \times 10^9 \times 64 = 192` GB/s per core. Older cores (Skylake client) have two 16-byte load ports → 32 B/cycle → 96 GB/s. DRAM bandwidth is shared across all cores and is much lower (typically 50–100 GB/s for dual-channel DDR4); see [Memory Hierarchy](./Memory-Hierarchy.md) for the full memory bandwidth picture and [Interfaces and Buses](./Interfaces-and-Buses/Readme.md) for bus bandwidth.

**Cache coherence.** In a multicore system, the **MESI** protocol (Modified, Exclusive, Shared, Invalid) ensures that all cores see a consistent view of shared memory. Each cache line tracks its coherence state; a write by one core invalidates the line in other cores' caches. See [Memory Hierarchy](./Memory-Hierarchy.md).

> **Authoritative sources**
> - [Computer Architecture: A Quantitative Approach (Hennessy & Patterson)](https://www.educate.elsevier.com/book/details/9780128119051)

<details><summary>Example problem</summary>

A 16-core CPU runs a program where 25% of the time is serial. What is the speedup vs. a single core?

<details><summary>Solution</summary>

$`S = 1/(0.25 + 0.75/16) = 1/(0.25 + 0.0469) = 1/0.2969 \approx 3.37`. The serial fraction dominates: even with 16 cores, the speedup is limited to 4× (the inverse of the serial fraction).

</details>

</details>

</details>



## Interrupts

An **interrupt** is a hardware signal that forces the CPU to suspend the current instruction stream and execute a handler. An **exception** (or trap) is a software-triggered event (e.g., divide-by-zero, page fault) that the CPU detects during instruction execution. Both mechanisms are fundamental: without them, the CPU could not service I/O, enforce memory protection, or multiplex processes.

<details><summary>EXPLANATION</summary>

**Hardware interrupts.** External devices (timer, disk controller, network card) assert an interrupt request line. The CPU, at the end of the current instruction, acknowledges the interrupt: it saves the current state (IP, flags, registers) onto the kernel stack, looks up the handler address in the **interrupt vector table (IVT)**, and jumps to the handler. On x86, the **APIC** (Advanced Programmable Interrupt Controller) routes and prioritizes interrupts; the IVT is a table of 256 entries (one per vector number).

**Software exceptions.** Certain instructions raise exceptions synchronously:

- **Divide-by-zero** (vector 0): `div` by zero.
- **Invalid opcode** (vector 6): illegal instruction.
- **Page fault** (vector 14): access to an unmapped virtual page. The OS loads the page from disk and resumes the instruction.
- **General protection fault** (vector 13): privilege violation (e.g., user-mode code writes to kernel memory).

**Worked example: a timer interrupt.**

1. The timer counts down and asserts IRQ0.
2. The APIC delivers vector 32 to the CPU.
3. The CPU finishes the current instruction, pushes IP and RFLAGS onto the kernel stack.
4. The CPU loads the handler address from IVT[32] into IP.
5. The handler (kernel code) increments a tick counter, checks if a process's time slice expired, and may schedule another process.
6. The handler executes `IRET` (interrupt return): the CPU pops IP and RFLAGS, resuming the interrupted instruction.

**Pipeline flush.** An interrupt or exception **flushes the pipeline**: all in-flight (speculative) instructions in the ROB are discarded. The CPU restarts fetch from the handler address. This is the same mechanism as a branch misprediction flush, but triggered by an external event rather than a wrong prediction.

**Relation to the OS.** The operating system uses interrupts for: timer ticks (scheduling), I/O completion (disk, network), and system calls (a `syscall` instruction is essentially a controlled interrupt). See [Operating System](./Operating-System.md) for how the OS uses these mechanisms for process scheduling, virtual memory, and I/O.

> **Authoritative sources**
> - [Computer Architecture: A Quantitative Approach (Hennessy & Patterson)](https://www.educate.elsevier.com/book/details/9780128119051)
> - [The RISC-V Reader](http://www.riscvbook.com/)

<details><summary>Example problem</summary>

A CPU has a 20-stage pipeline. A disk interrupt arrives while the CPU is executing instruction #500. How many cycles of work are lost to the pipeline flush (assuming the handler takes 100 cycles to execute)?

<details><summary>Solution</summary>

The pipeline flush discards up to 19 in-flight instructions (the 19 stages behind the current one). The CPU then fetches and executes the handler (100 cycles). Total overhead: 19 (flush) + 100 (handler) + a few cycles for state save/restore ≈ 120+ cycles. The interrupted instruction resumes after the handler's `IRET`.

</details>

</details>

</details>



## Quiz


**Problem 1**: A 5-stage pipeline (F, D, E, M, W) executes a loop of 5 instructions with 1 branch at the end. The branch is mispredicted 10% of the time. On a modern 14-stage pipeline, the misprediction penalty is 15 cycles (the pipeline must be flushed and refilled). What is the average CPI (cycles per instruction)?

<details><summary>Solution</summary>

**Ideal CPI**: 1 (one instruction per cycle in a perfectly pipelined machine).

**Branch frequency**: 1 branch per 5 instructions → branch is $`1/5 = 0.2` of all instructions.

**Misprediction penalty**: 15 cycles (realistic for a 14–20 stage pipeline; the 15 in-flight instructions are flushed and the pipeline refills).

**Average CPI**: $`1 + (1/5) \times 0.10 \times 15 = 1 + 0.30 = 1.30` cycles per instruction.

> **Note**: On a simple 5-stage teaching pipeline, the penalty would be only 1–2 cycles. Modern out-of-order CPUs have 14–20 stages, making the penalty 14–20 cycles. The 10% misprediction rate is optimistic; real workloads often see 2–5% with good predictors, but the penalty per misprediction is much higher.

</details>


<details><summary>Problem 2</summary>

A RISC-V CPU has a 5-stage pipeline with full forwarding. It executes the following code:

```
loop:
  lw   r1, 0(r2)       # load
  add  r1, r1, r3      # depends on lw
  sw   r1, 4(r2)       # depends on add
  add  r4, r5, r6      # independent
  bne  r4, r7, loop    # branch (predicted not-taken, 90% accurate)
```

The misprediction penalty is 4 cycles (for this simplified 5-stage pipeline). What is the approximate CPI?

<details><summary>Solution</summary>

**Stalls from data hazards**: With full forwarding, `add` can execute the cycle after `lw` (forwarded from Memory stage). `sw` can execute the cycle after `add` (forwarded from Execute stage). No stalls for data hazards.

**Branch**: 1 branch per 5 instructions. Misprediction rate = 10%. Penalty = 4 cycles.

**CPI** = $`1 + (1/5) \times 0.10 \times 4 = 1 + 0.08 = 1.08`.

The data hazards are fully hidden by forwarding; only the branch misprediction adds overhead.

</details>

</details>
