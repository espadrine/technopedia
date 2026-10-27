# Distributed Systems

Distributed systems study how to coordinate computation across multiple machines that communicate over a network. They are relevant whenever a single machine cannot provide the required throughput, availability, or data capacity.

## Utility

- It enables horizontal scaling: adding machines to increase throughput.
- It provides fault tolerance: the system survives individual node failures.
- It coordinates state: multiple nodes agree on a consistent view of the data.

<details><summary>Details</summary>

Distributed systems sit at the rightmost end of the computation pipeline: they take the executable programs running on individual machines (produced by the hardware and OS layers) and coordinate them into a single logical system. The fundamental challenge is that the network is unreliable: messages are lost, delayed, or duplicated; nodes crash; and the network can partition. The design space is governed by the **CAP theorem** (a partitioned system must choose between consistency and availability) and the **FLP impossibility** (no deterministic consensus algorithm can tolerate even one crash in an asynchronous system).

</details>

<iframe src="../Distributed-Systems.simulation.html" title="Quorum, network partitions, and the CAP trade-off in a 5-node replicated cluster"></iframe>

## History

- 1978: Lamport publishes "Time, Clocks, and the Ordering of Events," founding distributed systems theory.
- 1985: FLP impossibility theorem: no deterministic consensus in an asynchronous system with one crash.
- 1987: Two-phase commit (Garcia-Molina & Salem) formalizes atomic commit for distributed transactions.
- 1998: Paxos (Lamport) provides a practical consensus algorithm.

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./Concurrency/Readme.md'>Concurrency</a></td><td>Threads, processes, locks, message passing, event loops</td><td>Throughput, contention, deadlock freedom</td><td>How to coordinate units of execution (threads, processes, coroutines) that share state or communicate; the substrate on which the distributed classes run</td></tr>
<tr><td><a href='./Networks.md'>Networks</a></td><td>Protocols, sockets, routing, TLS</td><td>Latency, throughput, reliability</td><td>How messages are transmitted between machines; does not model the application logic</td></tr>
<tr><td><a href='./Scalability/Readme.md'>Scalability</a></td><td>Queues, Little's law, load balancers, caching, sharding</td><td>Throughput, tail latency, cost per request</td><td>How to partition and distribute work and data across nodes to add capacity; does not model fault tolerance or consistency</td></tr>
<tr><td><a href='./Robustness/Readme.md'>Robustness</a></td><td>Replication, quorum, failover, RPO/RTO, consensus (Paxos, Raft), CAP, FLP</td><td>RPO, RTO, availability, consistency</td><td>How to survive failures and keep a consistent state when the network partitions; does not model the physical network or the application</td></tr>
<tr><td><a href='./Adversarial-failure.md'>Adversarial failure</a></td><td>Byzantine faults, PBFT, Sybil attacks</td><td>Byzantine tolerance (3f+1), identity cost</td><td>How to survive malicious nodes that deviate from the protocol; does not model crash faults or the network</td></tr>
</table>

> **Authoritative sources**
> - [Time, Clocks, and the Ordering of Events (Lamport, 1978)](https://dl.acm.org/doi/10.1145/359575.359579)
> - [Impossibility of Distributed Consensus with One Faulty Process (Fischer, Lynch & Paterson, 1985)](https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf)
> - [The Part-Time Parliament (Lamport, 1998)](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)
> - [In Search of an Understandable Consensus Algorithm (Raft, Ongaro & Ousterhout, 2014)](https://raft.github.io/raft.pdf)
