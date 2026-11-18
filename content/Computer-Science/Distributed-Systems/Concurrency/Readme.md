# Concurrency

Concurrency studies how a program coordinates multiple units of execution — threads, processes, coroutines — that share state or communicate. It is relevant whenever a program must use several CPU cores at once, or keep doing useful work while waiting for I/O.

**Concurrency** is about *structure*: a concurrent program is organized as many units of work that may interleave. **Parallelism** is about *execution*: many units running at the same instant on multiple cores. A program can be concurrent without being parallel (many tasks interleaved on one core), and can run in parallel without any coordination (independent tasks on many cores).

## Utility

- It uses all the CPU cores of a machine: more throughput than a single core can deliver ([Parallelism](./Parallelism.md)).
- It keeps a single core busy while waiting for I/O — thousands of network connections on one thread ([Asynchrony](./Asynchrony.md)).
- It coordinates independent units by exchanging messages instead of sharing state ([Message Passing](./Message-Passing.md)).

<details><summary>EXPLANATION</summary>

Start from the hardware: a [CPU](../../Computer-Hardware/CPU-Architecture.md) has several **cores**, each executing one instruction stream at a time, and an [operating system](../../Computer-Hardware/Operating-System.md) that multiplexes **threads** (and heavier **processes**) onto those cores, **preempting** them at any moment. That substrate is what makes concurrency necessary *and* possible: several units of execution exist, but they can be interrupted anywhere, so shared state needs coordination.

On top of this substrate, there are three coordination strategies, one per page below:

1. **Parallelism** uses the cores. Split the work into *data parallelism* (same operation on different data) or *task parallelism* (different operations), organize it with scheduling patterns (scheduler/job/worker, M:N scheduling, thread pools, fork/join), and handle *contention* on shared state: race conditions, locks/mutexes, semaphores, deadlock (dining philosophers, resource hierarchy and ordering), and hardware atomic operations.
2. **Asynchrony** is concurrency *without* parallelism: on a single core, never block on I/O. **Coroutines** suspend and resume instead of blocking; an **event loop** multiplexes them; **async/await** is the syntax that writes them linearly.
3. **Message passing** avoids shared state altogether: units communicate by sending messages — CSP channels, **message queues**, **map/reduce**, **event sourcing**.

Worked examples and simulations live in the subpages: a race-condition simulator in [Parallelism](./Parallelism.md), an event-loop animation in [Asynchrony](./Asynchrony.md), and a producer–consumer channel simulation in [Message Passing](./Message-Passing.md).

</details>

## History

- 1968: Dijkstra's THE multiprogramming system introduces concurrent processes and semaphores.
- 1978: Hoare's *Communicating Sequential Processes* formalizes channel-based communication; Lamport's *Time, Clocks, and the Ordering of Events* defines the happens-before relation.
- 2009: Go is open-sourced with goroutines and channels, bringing CSP to a mainstream systems language (Go 1.0 ships in 2012).

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./Parallelism.md'>Parallelism</a></td><td>Data vs task parallelism; CPU/OS refresher (cores, processes vs threads, preemption, atomic operations); scheduler/job/worker, M:N scheduling, thread pool; race conditions, mutex, semaphore, deadlock, resource ordering</td><td>Contention, throughput, deadlock freedom</td><td>How to use multiple cores and coordinate shared state; does not model I/O waiting or inter-process messages</td></tr>
<tr><td><a href='./Asynchrony.md'>Asynchrony</a></td><td>Coroutines, event loop, async/await</td><td>Latency, throughput on a single core</td><td>How to stay responsive while waiting for I/O on one core (concurrency without parallelism); does not model shared state or multiple cores</td></tr>
<tr><td><a href='./Message-Passing.md'>Message passing</a></td><td>CSP channels, actor model, message queues, map/reduce, event sourcing</td><td>Message throughput, ordering and delivery guarantees</td><td>How to coordinate by communicating instead of sharing state; does not model the physical network</td></tr>
</table>

> **Authoritative sources**
> - [Modern Operating Systems (Tanenbaum & Bos)](https://www.pearson.com/en-us/subject-catalog/p/modern-operating-systems/P200000003514/9780133591692)
> - [Communicating Sequential Processes (Hoare, CACM 1978)](https://dl.acm.org/doi/10.1145/359576.359585)
> - [Time, Clocks, and the Ordering of Events in a Distributed System (Lamport, CACM 21, 7, 1978)](https://dl.acm.org/doi/10.1145/359545.359563)

<iframe src="./Concurrency.simulation.html" title="The same workload under each concurrency class: sequential, parallelism, asynchrony, message passing"></iframe>
