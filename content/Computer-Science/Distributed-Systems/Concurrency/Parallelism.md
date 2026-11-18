# Parallelism

Parallelism uses multiple CPU cores to execute computations at the same instant. In the **shared-memory model**, threads coordinate through common data structures; in the **distributed-memory model**, processes communicate via messages. It is relevant whenever a program must increase throughput beyond what a single core can deliver.

This page covers the shared-memory model; see [Message Passing](./Message-Passing.md) for the distributed-memory model.

## Data parallelism vs task parallelism

A first-principles split distinguishes two fundamental patterns:

<table>
<tr><th></th><th>Data parallelism</th><th>Task parallelism</th></tr>
<tr><td>Pattern</td><td>Same operation on different data</td><td>Different operations on different data</td></tr>
<tr><td>Examples</td><td>SIMD, GPU kernels, map/reduce</td><td>Fork/join, thread pool, pipeline stages</td></tr>
<tr><td>Scaling</td><td>Embarrassingly parallel; scales with data size</td><td>Limited by task granularity and dependencies</td></tr>
<tr><td>Communication</td><td>Minimal (data partitioned upfront)</td><td>Results must be combined (join, reduce)</td></tr>
</table>

> **Authoritative sources**
> - [Modern Operating Systems (Tanenbaum & Bos)](https://www.pearson.com/en-us/subject-catalog/p/modern-operating-systems/P200000003514/9780133591692)
> - [The C11 Memory Model (C11 §5.2.4)](https://portable32.github.io/c11memory/)

## The execution substrate: cores, processes, threads

A **CPU core** executes one instruction stream at a time (see [CPU Architecture](../../Computer-Hardware/CPU-Architecture.md) for registers, the ALU, and the fetch/decode/execute cycle). A **thread** is the unit of execution that the [operating system](../../Computer-Hardware/Operating-System.md) schedules onto a core; a **process** is a group of threads with its own virtual address space. **Preemption** means the OS can interrupt a thread at any instruction and switch to another (a context switch) — so even on one core, executions interleave.

**Fork/join**: a parent process or thread *forks* children that run concurrently, then *joins* them (waits for their results).

At the hardware level, an **atomic operation** is a read-modify-write the CPU executes as one indivisible step (e.g. `lock`-prefixed instructions on x86, `ldxr`/`stxr` on ARM). Atomicity at this level is what makes the synchronization primitives below possible — see [Contention](#contention).

<details><summary>EXPLANATION</summary>

**Why more cores need more coordination.** One core runs one instruction stream: no interleaving, no races. Two cores run two instruction streams *at the same time*, and both may touch the same memory. Because each core has its own cache, a write on core 1 is not instantly visible on core 2 unless the hardware and the compiler are told to synchronize — this is the memory model in [Contention](#contention).

**Threads vs processes.** A thread is cheap: it shares the process's address space, so threads can read and write the same variables directly — convenient, but exactly what creates race conditions. A process is heavier (its own address space, page tables, file descriptors), but isolation is total: processes cannot corrupt each other's memory, and they communicate only through explicit IPC (pipes, sockets, or [message passing](./Message-Passing.md)). The rule of thumb: threads for shared-memory parallelism on one machine, processes for isolation and for spanning machines.

**Preemption.** The OS scheduler decides which thread runs on which core, and it can preempt a thread at *any* point — between any two instructions. That is why you cannot reason "I'll just check the flag before writing": the switch can happen between the check and the write. Only atomic operations and locks close that gap.

**Fork/join walkthrough.** A web crawler forks 8 child processes, each fetching a slice of URLs, writing results to its own files; the parent joins all 8, then merges the results. The children never share memory, so no locks are needed — the join is the only synchronization.

</details>

## Scheduling patterns

Now that the units of execution exist, the next question is how to organize work across them.

**Scheduler/job/worker**: a **scheduler** receives **jobs**, splits them into tasks, and dispatches them to **workers**; workers return results to the scheduler, which aggregates them.

**Thread pool**: a fixed set of worker threads executes tasks from a queue, avoiding the cost of creating/destroying threads per task. Size: $`\approx` number of cores for CPU-bound work; $`\approx` number of cores × (1 + wait/compute) for I/O-bound work.

**M:N scheduling**: $`M` user-level threads (green threads, goroutines) are multiplexed onto $`N` OS threads by the runtime scheduler. Go's runtime: $`\approx 10^6` goroutines on $`\approx 10^2` OS threads.

**Fork/join**: a parent forks children, does its own work, then joins (waits for) the children; the children's results are available after the join. Used in OpenMP and Java's `ForkJoinPool`.

<details><summary>EXPLANATION</summary>

The thread pool size formula comes from queueing theory: if a task spends a fraction $`w` of its time waiting (I/O) and $`1-w` computing, the optimal pool size is $`C \times (1 + w/(1-w))` where $`C` is the number of cores. For purely CPU-bound work ($`w = 0`), the pool size equals the core count. See [Queueing and Latency](../Scalability/Queueing-Theory.md) for the underlying model.

M:N scheduling bridges shared-memory parallelism and asynchrony: the user-level threads (goroutines, fibers) are cheap and numerous (like [coroutines](./Asynchrony.md)), while the OS threads provide true parallelism on multiple cores. The same pattern appears one level up, across machines: an M:N mapping of requests to servers is exactly what a load balancer does (see [Throughput Scaling](../Scalability/Throughput-Scaling.md)).

</details>

## Contention

When several threads share state, their operations can interleave badly. **Contention** is the family of problems this creates, and the primitives below are its solutions.

### Race conditions and the memory model

A **race condition** occurs when two threads access shared state concurrently and at least one writes; the result depends on the interleaving. Races are not merely a scheduling problem: the CPU and compiler reorder instructions, and each core has its own cache. Without explicit synchronization, a write by one thread is not guaranteed to be visible to another.

**Happens-before**: a partial order on operations. If operation A happens-before B, then B observes A's effects. A lock/unlock pair creates a happens-before edge: everything the unlocking thread did before `unlock(m)` is visible to the thread after `lock(m)`.

<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two threads on two cores. Thread 1 writes x = 1, locks m, writes y = 2, unlocks m. The unlock-to-lock edge is a happens-before edge, so thread 2's reads after locking m see x = 1 and y = 2." style="max-width:560px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="hb-lane" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#888"/></marker>
    <marker id="hb-edge" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#e76f51"/></marker>
  </defs>
  <text x="140" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#1c3a5e">Thread 1 (core 0)</text>
  <text x="420" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#1c3a5e">Thread 2 (core 1)</text>
  <line x1="140" y1="34" x2="140" y2="230" stroke="#bbb" stroke-width="1.5" stroke-dasharray="4 3"/>
  <line x1="420" y1="34" x2="420" y2="230" stroke="#bbb" stroke-width="1.5" stroke-dasharray="4 3"/>
  <g font-size="11" fill="#334" font-family="monospace">
    <circle cx="140" cy="55" r="5" fill="#4a6fa5"/><text x="155" y="59">x = 1</text>
    <circle cx="140" cy="95" r="5" fill="#4a6fa5"/><text x="155" y="99">lock(m)</text>
    <circle cx="140" cy="135" r="5" fill="#4a6fa5"/><text x="155" y="139">y = 2</text>
    <circle cx="140" cy="175" r="5" fill="#e76f51"/><text x="155" y="179">unlock(m)</text>
    <circle cx="420" cy="195" r="5" fill="#3d8b57"/><text x="300" y="199" text-anchor="end">lock(m)</text>
    <circle cx="420" cy="225" r="5" fill="#3d8b57"/><text x="300" y="229" text-anchor="end">read x → 1, read y → 2</text>
  </g>
  <line x1="148" y1="175" x2="412" y2="193" stroke="#e76f51" stroke-width="2.5" marker-end="url(#hb-edge)"/>
  <text x="280" y="168" text-anchor="middle" font-size="11" font-weight="bold" fill="#e76f51">happens-before edge (unlock → lock)</text>
  <text x="280" y="245" text-anchor="middle" font-size="10" fill="#666">Without the mutex there is no edge: the reads may see stale values.</text>
</svg>

**Memory barriers** (fences): instructions that prevent reordering across a point. A **release** barrier (before a store) prevents earlier writes from moving after it; an **acquire** barrier (after a load) prevents later reads from moving before it.

**Volatile**: a language-level annotation that prevents the compiler from caching the value in a register or eliminating "dead" stores. In **Java** (JSR-133), `volatile` additionally provides acquire/release semantics. In **C/C++**, `volatile` only prevents compiler optimizations; it does *not* insert memory barriers and is *not* a synchronization mechanism. Neither language's `volatile` makes compound operations (e.g. `x++`) atomic.

<details><summary>EXPLANATION</summary>

On x86, the TSO (Total Store Order) memory model is relatively strong: stores are not reordered with other stores, and loads are not reordered with other loads; but a store can be reordered with a later load (store-load reordering), which is why a release barrier is still needed for correct synchronization. On ARM (weakly ordered), all four reorderings are possible without barriers. The C11/C++11 memory model provides `memory_order_acquire`, `memory_order_release`, `memory_order_seq_cst`, etc.

The **happens-before** relation is transitive: if A hb B and B hb C, then A hb C. A mutex unlock happens-before the next lock on the same mutex; a channel send happens-before the corresponding receive (see [Message Passing](./Message-Passing.md)).

**False sharing**: caches work in units of cache lines (typically 64 bytes). Two threads writing to *different* variables that happen to sit on the same cache line invalidate each other's line on every write — a severe slowdown with no logical race. The fix is padding: place the variables on separate cache lines.

</details>

### Locks: mutex and semaphore

A **mutex** (mutual exclusion lock) ensures only one thread is in the critical section at a time: **acquire** (lock) → critical section → **release** (unlock). A mutex has **ownership semantics**: only the thread that locked it may unlock it.

A **semaphore** is a counter allowing $`n` threads into a critical section. A **binary semaphore** ($`n = 1`) resembles a mutex but lacks ownership: any thread can signal it. That distinction matters (you cannot unlock someone else's mutex, but you can signal a semaphore from another thread — used e.g. to wake a waiter).

<details><summary>EXPLANATION</summary>

**Readers-writer lock**: multiple readers may hold the lock simultaneously; a writer needs exclusive access. Used in databases (MVCC) and caches.

**Spinlock vs blocking lock**: a spinlock busy-waits (burns CPU) until the lock is free — fine for very short critical sections on a dedicated core; a blocking lock puts the thread to sleep and lets the OS run something else — right for longer sections.

</details>

### Deadlock: Coffman conditions, dining philosophers, resource ordering

**Deadlock** is a state where a set of threads each wait for a resource held by another, so none can proceed. Four **Coffman conditions** must all hold:

1. **Mutual exclusion**: a resource is held by one thread.
2. **Hold and wait**: a thread holds a resource and waits for another.
3. **No preemption**: a resource cannot be forcibly taken.
4. **Circular wait**: a cycle of threads waiting for each other.

Breaking any one condition prevents deadlock. The standard strategies are **resource hierarchy and ordering** (assign every resource a global rank; threads may only acquire locks in increasing rank order — this breaks circular wait by construction) and **timeout** (release and retry).

<svg viewBox="0 0 320 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five philosophers evenly spaced around a table, with one fork between each pair of adjacent philosophers. Each philosopher needs the two neighboring forks to eat." style="max-width:320px;width:100%;background:#f8f9fb;border-radius:8px">
  <text x="160" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Dining philosophers: 5 philosophers, 5 forks</text>
  <circle cx="160" cy="160" r="60" fill="#eef3fb" stroke="#4a6fa5" stroke-width="2"/>
  <text x="160" y="165" text-anchor="middle" font-size="10" fill="#1c3a5e">table</text>
  <g font-size="10" font-weight="bold" text-anchor="middle">
    <circle cx="160" cy="70" r="14" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="1.5"/><text x="160" y="74" fill="#12365e">P0</text>
    <circle cx="245.6" cy="132.2" r="14" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="1.5"/><text x="245.6" y="136.2" fill="#12365e">P1</text>
    <circle cx="212.9" cy="232.8" r="14" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="1.5"/><text x="212.9" y="236.8" fill="#12365e">P2</text>
    <circle cx="107.1" cy="232.8" r="14" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="1.5"/><text x="107.1" y="236.8" fill="#12365e">P3</text>
    <circle cx="74.4" cy="132.2" r="14" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="1.5"/><text x="74.4" y="136.2" fill="#12365e">P4</text>
  </g>
  <g stroke="#b58a1a" stroke-width="2" fill="none">
    <g transform="translate(195.27,111.46) rotate(36)"><line x1="0" y1="-2" x2="0" y2="10"/><line x1="-3.5" y1="-11" x2="-3.5" y2="-2"/><line x1="0" y1="-11" x2="0" y2="-2"/><line x1="3.5" y1="-11" x2="3.5" y2="-2"/><line x1="-3.5" y1="-2" x2="3.5" y2="-2"/></g>
    <g transform="translate(217.06,178.54) rotate(108)"><line x1="0" y1="-2" x2="0" y2="10"/><line x1="-3.5" y1="-11" x2="-3.5" y2="-2"/><line x1="0" y1="-11" x2="0" y2="-2"/><line x1="3.5" y1="-11" x2="3.5" y2="-2"/><line x1="-3.5" y1="-2" x2="3.5" y2="-2"/></g>
    <g transform="translate(160,220) rotate(180)"><line x1="0" y1="-2" x2="0" y2="10"/><line x1="-3.5" y1="-11" x2="-3.5" y2="-2"/><line x1="0" y1="-11" x2="0" y2="-2"/><line x1="3.5" y1="-11" x2="3.5" y2="-2"/><line x1="-3.5" y1="-2" x2="3.5" y2="-2"/></g>
    <g transform="translate(102.94,178.54) rotate(252)"><line x1="0" y1="-2" x2="0" y2="10"/><line x1="-3.5" y1="-11" x2="-3.5" y2="-2"/><line x1="0" y1="-11" x2="0" y2="-2"/><line x1="3.5" y1="-11" x2="3.5" y2="-2"/><line x1="-3.5" y1="-2" x2="3.5" y2="-2"/></g>
    <g transform="translate(124.73,111.46) rotate(324)"><line x1="0" y1="-2" x2="0" y2="10"/><line x1="-3.5" y1="-11" x2="-3.5" y2="-2"/><line x1="0" y1="-11" x2="0" y2="-2"/><line x1="3.5" y1="-11" x2="3.5" y2="-2"/><line x1="-3.5" y1="-2" x2="3.5" y2="-2"/></g>
  </g>
  <g font-size="9" text-anchor="middle" fill="#7a5c00">
    <text x="204.7" y="101.5">f0</text>
    <text x="232.3" y="186.5">f1</text>
    <text x="160" y="243">f2</text>
    <text x="87.7" y="186.5">f3</text>
    <text x="115.3" y="101.5">f4</text>
  </g>
</svg>

<details><summary>EXPLANATION</summary>

**Dining philosophers walkthrough.** Five philosophers sit around a table with five forks; each needs the fork on their left *and* on their right to eat. If all five pick up their left fork simultaneously, every fork is held, and each philosopher waits forever for a right fork that will never be released: mutual exclusion, hold-and-wait, no preemption, circular wait — all four Coffman conditions at once.

**Fixes.**
- **Resource hierarchy**: number the forks 0–4 and require every philosopher to pick up the lower-numbered fork first. Then the philosopher between forks 4 and 0 picks up fork 0 first, so fork 4 can never be held while someone waits for it — the cycle is broken by the global ordering.
- **Arbitrate**: a table-wide **semaphore with count P − 1 = 4**. Each philosopher first does `P(table)`, then acquires the left fork's lock, then the right fork's lock, eats, and releases in reverse order. At most 4 of the 5 philosophers are ever in the fork-acquiring region, and with 5 forks on the table at least one fork is always free, so the circular wait cannot form — while two non-adjacent philosophers can still be eating at the same time.
- **Timeout**: a philosopher who cannot get the second fork within $`t` puts the first one down and retries later — breaks no-preemption by voluntary release.

</details>

### Atomic operations and lock-free programming

An **atomic operation** is a read-modify-write the hardware executes as a single indivisible step. The fundamental primitive is **CAS** (Compare-And-Swap):

```math
\text{CAS}(\texttt{ptr},\; \texttt{expected},\; \texttt{new}) = \begin{cases} \texttt{true} & \text{if } *\texttt{ptr} = \texttt{expected},\; *\texttt{ptr} \leftarrow \texttt{new} \\ \texttt{false} & \text{otherwise}\end{cases}
```

**Atomic increment** ($`\texttt{fetch\_add}(\texttt{ptr}, 1)`): a hardware loop of CAS until success. On x86: `lock xadd`; on ARM: `ldadd` (LSE) or an `ldxr`/`stxr` loop.

**Memory orderings** (C11/C++11):
- `memory_order_relaxed`: atomicity only, no ordering. Use for counters, flags.
- `memory_order_acquire` (on load): subsequent reads/writes cannot move before this load.
- `memory_order_release` (on store): prior reads/writes cannot move after this store.
- `memory_order_seq_cst`: total order across all seq_cst operations. Safest; default.

<details><summary>EXPLANATION</summary>

**The ABA problem**: Thread 1 reads value A. Thread 2 changes A → B → A. Thread 1's CAS(ptr, A, C) succeeds, but the pointer's referent has changed (in a lock-free linked list, the node may have been freed and reallocated). Solution: a **version counter** (or hazard pointers) — CAS on a 128-bit (pointer, version) pair.

**Lock-free vs wait-free**: lock-free guarantees system-wide progress (some thread always completes); wait-free guarantees every individual thread completes in a bounded number of steps. Wait-free is stronger but harder to implement.

**Double-word CAS (DCAS)**: atomically compare-and-swap two 64-bit words (ARMv8.1+ `casp`, RISC-V `amocas.d`). On x86, use `lock cmpxchg16b` (128-bit) or fall back to a lock.

The choice of memory ordering is a performance/correctness trade-off: `relaxed` is fastest but requires careful reasoning; `seq_cst` is safest (on x86, most `seq_cst` operations are free because TSO is already strong — only store-load ordering needs `mfence`).

</details>

## Amdahl's Law

The speedup $`S` of a program with a serial fraction $`1-p` and a parallel fraction $`p` on $`N` cores is:

```math
S(N) = \frac{1}{(1-p) + \frac{p}{N}}
```

As $`N \to \infty`, $`S \to \frac{1}{1-p}`: the serial fraction is the asymptotic ceiling. For $`p = 0.9` (10% serial), the maximum speedup is $`10\times` regardless of core count.

<details><summary>EXPLANATION</summary>

Amdahl's Law explains diminishing returns: doubling cores from 4 to 8 helps only if the parallel fraction is high. For $`p = 0.99` and $`N = 8`: $`S = 1/(0.01 + 0.99/8) \approx 7.48`, not 8 — the 0.52× loss is the serial overhead (synchronization, I/O, sequential initialization).

Gustafson's Law (1988) reframes the problem: if the problem size scales with $`N`, the speedup is $`S = (1-p) + p \cdot N`, which is linear. This is why embarrassingly parallel workloads (rendering, ML training) scale well, while fixed-size workloads (a single simulation) do not.

> **Authoritative sources**
> - [Gustafson, J.L. (1988). "Reevaluating Amdahl's Law." CACM 31(5):114](https://dl.acm.org/doi/10.1145/42411.42415)

</details>

## Example problem

**Problem**: Two threads share a counter `c = 0`. Thread A does `c++` 1000 times; Thread B does `c++` 1000 times. Without synchronization, what is the final value of `c`? How do you fix it?

<details><summary>Solution</summary>

**Without synchronization**: `c++` is not atomic: it is a read-modify-write (load, add, store). Thread A reads `c = 5`, Thread B reads `c = 5`, both write `c = 6` — the increment is lost. The final value is $`\leq 2000`, typically much less depending on timing.

**Fix 1: Mutex**:
```c
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
void thread_a() { for (int i = 0; i < 1000; i++) { pthread_mutex_lock(&lock); c++; pthread_mutex_unlock(&lock); } }
```

**Fix 2: Atomic**:
```c
_Atomic int c = 0;
void thread_a() { for (int i = 0; i < 1000; i++) { c++; } }
```
The compiler generates a `lock xadd` instruction (x86) or `ldadd` (ARM), which is atomic.

**Fix 3: Lock-free (CAS)**:
```c
void thread_a() { for (int i = 0; i < 1000; i++) { int old; do { old = c; } while (!CAS(&c, old, old + 1)); } }
```

All three give `c = 2000`.

</details>

## Simulation

<iframe src="./Parallelism.simulation.html" title="Race condition in read-modify-write, with mutex and CAS synchronization"></iframe>
