# Scalability

Scalability studies how to partition and distribute work and data across nodes so that a system can handle more load than a single machine can. It is relevant whenever a workload exceeds the capacity of one machine — whether the bottleneck is throughput, latency, or data volume.

## Utility

- It predicts when a system will saturate and how load translates into latency (queueing theory).
- It provides the mechanisms to add capacity: vertical scaling, horizontal scaling, and data distribution.
- It keeps the cost per request low as load grows.

<details><summary>Details</summary>

Scalability sits between the single machine and the cluster: it takes the coordination primitives of [Concurrency](../Concurrency/Readme.md) and the transport of [Networks](../Networks.md) and asks how to spread the load. The first-principles question is structural — how to partition work and data across nodes — not a performance goal in itself. Queueing theory gives the quantitative model (when does a system saturate?), and the scaling strategies give the concrete mechanisms (load balancers, caching, sharding) that change the partition.

</details>

## History

- 1961: Little's law gives the first general relation between the number of items in a system, the arrival rate, and the response time.
- 1967: Amdahl's law bounds the speedup of a parallel system by its serial fraction.
- 2004: MapReduce (Dean & Ghemawat) popularizes data-parallel scaling across clusters.
- 2017: *Designing Data-Intensive Applications* (Kleppmann) systematizes replication, partitioning, and consistency for scalable systems.

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./Queueing-and-Latency.md'>Queueing and Latency</a></td><td>Queues, Little's law, tail latency, backpressure, rate limiting</td><td>Throughput, tail latency, saturation threshold</td><td>How load translates into latency and when a system saturates; does not model how to add capacity</td></tr>
<tr><td><a href='./Scaling-Strategies.md'>Scaling Strategies</a></td><td>Load balancers, caching, CDNs, sharding, autoscaling</td><td>Throughput, cost per request</td><td>How to add capacity (vertical or horizontal) and distribute data; does not model fault tolerance or consistency</td></tr>
</table>

> **Authoritative sources**
> - [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/)
> - [Queueing Systems, Volume 1: Theory (Kleinrock, 1975)](https://www.lk.cs.ucla.edu/LK/B/Books.html)
> - [The Tail at Scale (Dean & Barroso, CACM 2013)](https://research.google/pubs/pub40801/)
