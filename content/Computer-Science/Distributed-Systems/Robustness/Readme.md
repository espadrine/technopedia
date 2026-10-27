# Robustness

Robustness studies how a system keeps operating and keeps its data safe despite failures: node crashes, disk failures, and network partitions. It is relevant whenever a system must meet an availability or durability target (e.g., 99.99% uptime, zero data loss).

## Utility

- It keeps the system available when individual nodes fail (replication, failover, quorum).
- It keeps the data durable (write-ahead log, streaming replication, RAID).
- It lets nodes agree on a consistent state even when the network partitions (consensus, consistency models).

<details><summary>Details</summary>

Robustness is the study of survival under failure. It has two faces: **availability and durability** (how to keep serving and keep data when components fail — replication, quorum, failover, write-ahead log) and **agreement** (how to keep a consistent view of the state when the network partitions — consensus, consistency models, the CAP and FLP theorems). The two are coupled: the availability target is in direct tension with consistency, and the RPO/RTO objectives quantify exactly how much of each trade-off a system accepts. For the case where nodes are actively malicious (Byzantine faults, Sybil attacks) rather than merely crashed, see [Adversarial Failure](../Adversarial-failure.md).

</details>

## History

- 1978: Lamport's logical clocks and the happens-before relation give a foundation for ordering events across nodes.
- 1985: FLP impossibility theorem: no deterministic consensus in an asynchronous system with one crash.
- 1998: Paxos (Lamport) provides a practical consensus algorithm.
- 2002: The CAP theorem (Brewer; Gilbert & Lynch) frames the consistency/availability trade-off under partitions.

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./Consensus-and-Consistency.md'>Consensus and Consistency</a></td><td>FLP, CAP, consensus (Paxos, Raft), linearizability, quorum</td><td>Availability, consistency, partition tolerance</td><td>How to agree on a single value or a sequence of values when the network partitions; does not model the physical network or the application</td></tr>
<tr><td><a href='./Fault-Tolerance.md'>Fault Tolerance</a></td><td>Replication, quorum, failover, RPO/RTO, circuit breakers</td><td>RPO, RTO, availability</td><td>How to survive crashes and keep data durable; does not model the consensus protocol or the network</td></tr>
</table>

> **Authoritative sources**
> - [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/)
> - [In Search of an Understandable Consensus Algorithm (Raft, Ongaro & Ousterhout, 2014)](https://raft.github.io/raft.pdf)
> - [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (Gilbert & Lynch, 2002)](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer.pdf)
