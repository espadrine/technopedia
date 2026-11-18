# Robustness

Robustness studies how a system keeps operating and keeps its data safe despite failures: node crashes, disk failures, and network partitions. It is relevant whenever a system must meet an availability or durability target (e.g., 99.99% uptime, zero data loss).

## Utility

- It keeps the data durable (write-ahead log, replication, RAID, replication hierarchy).
- It keeps the system available when individual nodes fail (failover, load balancing, multi-master, multi-AZ/multi-region).
- It lets nodes agree on a consistent state even when the network partitions (clocks, consistency models, consensus, ACID).

<details><summary>EXPLANATION</summary>

Robustness is the study of survival under failure, in three layers. **Durability** keeps committed data safe (WAL, replication with quorum, RAID, and a replication hierarchy across racks/AZs/regions). **Availability** keeps the service up (failover vs load balancing for single-writer components, deployment topologies from a single server to multi-region, multi-master replication, and the circuit-breaker/bulkhead patterns). **Consistency** keeps a single view of the data across nodes (clocks and time synchronization, the linearizability tower, patch/merge with CRDTs and OT, the CAP/FLP/exactly-once impossibility results, consensus with Paxos and Raft, and ACID transactions). The layers are coupled: the availability target is in direct tension with consistency, and RPO/RTO quantify exactly how much of each trade-off a system accepts. For malicious nodes rather than crashes, see [Adversarial Failure](../Adversarial-Failure.md).

</details>

## History

- 1978: Lamport's logical clocks and the happens-before relation give a foundation for ordering events across nodes.
- 1985: FLP impossibility theorem: no deterministic consensus in an asynchronous system with one crash.
- 1998: Paxos (Lamport) provides a practical consensus algorithm.
- 2002: The CAP theorem (Brewer; Gilbert & Lynch) frames the consistency/availability trade-off under partitions.

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./Durability.md'>Durability</a></td><td>WAL, streaming/multi-node replication, replication factor, quorum, RAID, replication hierarchy (racks/AZs/regions), RPO</td><td>RPO, durability</td><td>How to keep committed data safe across disk/machine/site failures; does not model availability mechanisms or consistency protocols</td></tr>
<tr><td><a href='./Availability.md'>Availability</a></td><td>Failover vs load balancer (single-writer), deployment topologies (single server → DC → multi-AZ → multi-region), multi-master, RTO, availability formula, circuit breaker/bulkhead/retry, chaos engineering</td><td>RTO, availability (nines)</td><td>How to keep serving under failures; does not model replication mechanics or the consistency tower</td></tr>
<tr><td><a href='./Consistency.md'>Consistency</a></td><td>Time and clocks (UT1/UTC/TAI, Unix, leap second, NTP, drift, Lamport, vector), linearizability tower, patch/merge (LWW, CRDTs, OT), two generals, FLP, exactly-once impossibility + idempotency, CAP, consensus 2f+1 (Paxos, Raft), ACID and isolation levels</td><td>Consistency vs availability under partition</td><td>How to order events and agree on values when the network partitions; does not model replication mechanics or failover patterns</td></tr>
</table>

> **Authoritative sources**
> - [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/)
> - [In Search of an Understandable Consensus Algorithm (Raft, Ongaro & Ousterhout, 2014)](https://raft.github.io/raft.pdf)
> - [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (Gilbert & Lynch, 2002)](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer.pdf)
> - [Consistency models (Jepsen)](https://jepsen.io/consistency/models)
