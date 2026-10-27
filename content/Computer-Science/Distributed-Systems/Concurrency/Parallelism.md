# Parallelism

Parallelism exploits multiple cores to execute computations simultaneously. In the shared-memory model, threads coordinate access to common data structures; in the distributed-memory model, processes communicate via messages. It is relevant whenever a program must increase throughput beyond what a single core can deliver.

This page covers the shared-memory model; see [Message Passing](./Message-Passing.md) for the distributed-memory model.

## Data parallelism vs. task parallelism

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

## Memory model

A **race condition** occurs when two threads access shared state concurrently and at least one writes. The result depends on the interleaving.

Races are not merely a scheduling problem: the CPU and compiler reorder instructions, and each core has its own cache. Without explicit synchronization, a write by one thread is not guaranteed to be visible to another.

**Happens-before**: a partial order on operations. If operation A happens-before B, then B observes A's effects. Without a happens-before edge, the two operations are concurrent and may be reordered.

```
Thread 1                    Thread 2
  │                           │
  │  x = 1                   │
  │  lock(m) ──────────────► │  (unlock→lock edge)
  │  y = 2                   │
  │  unlock(m) ─────────────►│  lock(m)
  │                           │  read x  (sees 1)
  │                           │  read y  (sees 2)
  │                           │  unlock(m)
```

The lock/unlock pair creates a happens-before edge: everything Thread 1 did before `unlock(m)` is visible to Thread 2 after `lock(m)`. Without the lock, the two threads are concurrent and the reads may see stale values.

**Memory barriers** (fences): instructions that prevent reordering across a point. A **release** barrier (before a store) prevents earlier writes from moving after it. An **acquire** barrier (after a load) prevents later reads from moving before it.

**Volatile**: a language-level annotation that prevents the compiler from caching the value in a register or eliminating "dead" stores. In **Java** (JSR-133), `volatile` additionally provides acquire/release semantics: a write to a volatile field happens-before every subsequent read. In **C/C++**, `volatile` only prevents compiler optimizations (register caching, dead-store elimination); it does *not* insert memory barriers and is *not* a synchronization mechanism. Neither language's `volatile` makes compound operations (e.g., `x++`) atomic.

<details><summary>Details</summary>

On x86, the TSO (Total Store Order) memory model is relatively strong: stores are not reordered with other stores, and loads are not reordered with other loads. However, a store can be reordered with a later load (store-load reordering), which is why a release barrier is still needed for correct synchronization.

On ARM (weakly ordered), all four reorderings are possible without barriers. The C11/C++11 memory model provides `memory_order_acquire`, `memory_order_release`, `memory_order_seq_cst`, etc.

The **happens-before** relation is transitive: if A hb B and B hb C, then A hb C. A mutex unlock happens-before the next lock on the same mutex. A channel send happens-before the corresponding receive.

See [Operating System](../../Computer-Hardware/Operating-System.md) for the execution substrate (processes, threads, cores, preemption) that this memory model operates on.

**False sharing**: because each core has its own cache and caches work in units of cache lines (typically 64 bytes), two threads writing to *different* variables that happen to reside on the same cache line will cause the cache line to be invalidated and re-fetched on every write. The result is a severe performance drop with no logical race. The fix is padding: allocate the two variables on separate cache lines (e.g., pad the struct to 64-byte alignment).

</details>

## Synchronization primitives

A **mutex** (mutual exclusion lock) ensures that only one thread accesses the critical section at a time. **Acquire** (lock) → **critical section** → **Release** (unlock). A mutex has **ownership semantics**: only the thread that locked it may unlock it.

A **semaphore** is a counter that allows $`n` threads to enter a critical section. A **binary semaphore** ($`n = 1`) is similar to a mutex but lacks ownership: any thread can release it, not just the one that acquired it. This distinction matters in practice (e.g., you cannot unlock a mutex from a different thread, but you can signal a semaphore from another thread).

<details><summary>Details</summary>

**Deadlock**: four conditions (Coffman):
1. **Mutual exclusion**: a resource is held by one thread.
2. **Hold and wait**: a thread holds a resource and waits for another.
3. **No preemption**: a resource cannot be forcibly taken.
4. **Circular wait**: a cycle of threads waiting for each other.

Breaking any one condition prevents deadlock. Common strategies: lock ordering (acquire locks in a global order), timeout (release and retry), or lock-free algorithms.

**Lock-free algorithms**: use atomic operations (CAS: Compare-And-Swap) to make progress without locks. A **CAS** is: `if (*ptr == expected) *ptr = new; return success`. The ABA problem (see [Atomic operations](#atomic-operations)) is the key correctness challenge for lock-free designs.

**Readers-writer lock**: multiple readers can hold the lock simultaneously; a writer needs exclusive access. Used in databases (MVCC) and caches.

</details>
## Atomic operations

An **atomic operation** is a read-modify-write that the hardware executes as a single indivisible step. The fundamental primitive is **CAS** (Compare-And-Swap):

```math
\text{CAS}(\texttt{ptr},\; \texttt{expected},\; \texttt{new}) = \begin{cases} \texttt{true} & \text{if } *\texttt{ptr} = \texttt{expected},\; *\texttt{ptr} \leftarrow \texttt{new} \\ \texttt{false} & \text{otherwise}
\end{cases}
```

**Atomic increment** ($`\texttt{fetch\_add}(\texttt{ptr}, 1)`): hardware loop of CAS until success. On x86: `lock xadd`. On ARM: `ldadd` (LSE) or `ldxr`/`stxr` loop.

**Memory orderings** (C11/C++11):
- `memory_order_relaxed`: no ordering guarantees beyond atomicity. Use for counters, flags.
- `memory_order_acquire` (on load): subsequent reads/writes cannot move before this load.
- `memory_order_release` (on store): prior reads/writes cannot move after this store.
- `memory_order_seq_cst`: total order across all seq_cst operations. Most expensive; default.

<details><summary>Details</summary>

**The ABA problem**: Thread 1 reads value A. Thread 2 changes A → B → A. Thread 1's CAS(ptr, A, C) succeeds, but the pointer's referent has changed. In lock-free linked lists, the node was freed and reallocated. Solution: a **version counter** (or hazard pointers) — CAS on a 128-bit (pointer, version) pair.

**Lock-free vs wait-free**: lock-free guarantees system-wide progress (some thread always completes); wait-free guarantees every individual thread completes in bounded steps. Wait-free is stronger but harder to implement.

**Double-word CAS (DCAS)**: atomically compare-and-swap two 64-bit words. Available on ARMv8.1+ (`casp`), RISC-V (`amocas.d`). On x86, no native DCAS; use `lock cmpxchg16b` (128-bit) or a lock.

The choice of memory ordering is a performance/correctness trade-off: `relaxed` is fastest but requires careful reasoning; `seq_cst` is safest but adds a full fence on x86 (actually, x86 TSO makes most `seq_cst` operations free — only `mfence` is needed for store-load ordering).

</details>
## Scheduling patterns

Now that we have the primitives to coordinate threads, the next question is how to organize the work across them.

**M:N scheduling**: $`M` user-level threads are multiplexed onto $`N` OS threads (green threads, goroutines). The runtime scheduler decides which user thread runs on which OS thread. Go's runtime: $`\approx 10^6` goroutines on $`\approx 10^2` OS threads.

**Fork/join**: a parent thread forks a child, does work, then joins (waits for the child). The child's result is available after the join. Used in OpenMP, Java's `ForkJoinPool`.

**Thread pool**: a fixed set of worker threads that execute tasks from a queue. Avoids the cost of creating/destroying threads. Size: $`\approx` number of cores for CPU-bound work; $`\approx` number of cores × (1 + wait/compute) for I/O-bound work.

<details><summary>Details</summary>

The thread pool size formula comes from queueing theory: if a task spends a fraction $`w` of its time waiting (I/O) and $`1-w` computing, the optimal pool size is $`C \times (1 + w/(1-w))` where $`C` is the number of cores. For purely CPU-bound work ($`w = 0`), the pool size equals the core count.

M:N scheduling bridges shared-memory parallelism and asynchrony: the user-level threads (goroutines, fibers) are cheap and numerous (like coroutines), while the OS threads provide true parallelism on multiple cores.

</details>
## Amdahl's Law

The speedup $`S` of a program with a serial fraction $`1-p` and a parallel fraction $`p` on $`N` cores is:

```math
S(N) = \frac{1}{(1-p) + \frac{p}{N}}
```

As $`N \to \infty`, $`S \to \frac{1}{1-p}`: the serial fraction is the asymptotic ceiling. For $`p = 0.9` (10% serial), the maximum speedup is $`10\times` regardless of core count.

<details><summary>Details</summary>

Amdahl's Law explains diminishing returns: doubling cores from 4 to 8 helps only if the parallel fraction is high. For $`p = 0.99` and $`N = 8`: $`S = 1/(0.01 + 0.99/8) \approx 7.48`, not 8. The 0.52× loss is the serial overhead (synchronization, I/O, sequential initialization).

In practice, the serial fraction grows with problem size (more data to serialize, more synchronization). This is why Amdahl's Law is often called "the law of diminishing returns" in parallel computing.

Gustafson's Law (1988) reframes the problem: if the problem size scales with $`N`, the speedup is $`S = (1-p) + p \cdot N`, which is linear. This is why embarrassingly parallel workloads (rendering, ML training) scale well, while fixed-size workloads (single simulation) do not.

> **Authoritative sources**
> - [Gustafson, J.L. (1988). "Reevaluating Amdahl's Law." CACM 31(5):114](https://dl.acm.org/doi/10.1145/42411.42415)

</details>
## Example problem

**Problem**: Two threads share a counter `c = 0`. Thread A does `c++` 1000 times; Thread B does `c++` 1000 times. Without synchronization, what is the final value of `c`? How do you fix it?

<details><summary>Solution</summary>

**Without synchronization**: `c++` is not atomic: it is a read-modify-write (3 operations). Thread A reads `c = 5`, Thread B reads `c = 5`, both write `c = 6`. The increment is lost. The final value is $`\leq 2000`, typically much less (e.g., 100–500 depending on timing).

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