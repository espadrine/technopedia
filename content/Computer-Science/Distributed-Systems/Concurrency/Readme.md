# Concurrency

Concurrency studies how to coordinate multiple units of execution (threads, processes, goroutines) that share state or communicate. It is relevant whenever a program must exploit multiple cores, handle I/O without blocking, or coordinate independent workers.

**Concurrency** is the *structure* of a program: it describes how multiple units of work are organized and may interleave. **Parallelism** is the *execution*: it is the simultaneous execution of multiple units on multiple cores. A program can be concurrent without being parallel (interleaved on one core), and parallel without being concurrent (embarrassingly parallel, no coordination needed).

## History

- 1965: Dijkstra's THE multiprogramming system introduces concurrent processes and semaphores.
- 1978: Hoare's *Communicating Sequential Processes* (CACM 21, 8) formalizes channel-based communication.
- 1978: Lamport's *Time, Clocks, and the Ordering of Events in a Distributed System* (CACM 21, 7) defines the happens-before relation, the foundation of event ordering in concurrent and distributed systems.
- 2009: Go is open-sourced with goroutines and channels, bringing CSP to a mainstream systems language (Go 1.0, the first stable release, ships in 2012).

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='../../Computer-Hardware/Operating-System.md'>Operating system</a></td><td>Processes, threads, CPU cores, preemption</td><td>Context-switch cost, degree of parallelism</td><td>Execution substrate on which the three coordination classes run; it provides the units of execution but does not model coordination logic itself</td></tr>
<tr><td><a href='./Parallelism.md'>Parallelism</a></td><td>Scheduler (job/worker, M:N), thread pool, lock/mutex, semaphore, fork/join, race conditions, deadlock</td><td>Contention, throughput, deadlock freedom</td><td>Shared-state coordination; does not model I/O or inter-process communication</td></tr>
<tr><td><a href='./Asynchrony.md'>Asynchrony</a></td><td>Event loop, async/await</td><td>Latency, throughput on a single core</td><td>Non-blocking I/O; does not model shared state or multi-core parallelism</td></tr>
<tr><td><a href='./Message-Passing.md'>Message passing</a></td><td>CSP, channels, map/reduce, event sourcing</td><td>Message throughput, ordering guarantees</td><td>Communication without shared state; does not model the physical network</td></tr>
</table>

How the classes fit together: the operating system is the *substrate* — it supplies the processes, threads, and cores that every other class runs on. On top of it, **parallelism** and **message passing** are the two alternative coordination strategies for multiple cores (shared mutable state versus communicating private state), while **asynchrony** is the single-core strategy for I/O-bound workloads; asynchrony and message passing combine naturally, since an event loop is often driven by incoming messages.

> **Authoritative sources**
> - [Modern Operating Systems (Tanenbaum & Bos)](https://www.pearson.com/en-us/subject-catalog/p/modern-operating-systems/P200000003514/9780133591692)
> - [Communicating Sequential Processes (Hoare, CACM 1978)](https://dl.acm.org/doi/10.1145/359576.359585)
> - [Time, Clocks, and the Ordering of Events in a Distributed System (Lamport, CACM 21, 7, pp. 558–565, 1978)](https://dl.acm.org/doi/10.1145/333577.333591)

<iframe src="./Concurrency.simulation.html" title="The same workload under each concurrency class: sequential, parallelism, asynchrony, message passing"></iframe>
