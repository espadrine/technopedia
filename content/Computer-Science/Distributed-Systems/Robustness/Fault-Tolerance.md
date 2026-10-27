# Fault Tolerance

Fault tolerance (robustness) studies how a system continues to operate despite component failures: node crashes, disk failures, and network partitions. It is relevant whenever a system must meet an availability or durability target (e.g., 99.99% uptime, zero data loss). This page covers crash faults; for the case where nodes are actively malicious (Byzantine faults, Sybil attacks), see [Adversarial Failure](../Adversarial-failure.md).

**Connection to CAP**: the availability target is in direct tension with consistency. When a network partition occurs, the system must choose: reject requests on the minority side (consistency, sacrificing availability) or serve stale data (availability, sacrificing consistency). The RPO and RTO targets below quantify exactly how much of each trade-off a system accepts. See [Consensus and Consistency](./Consensus-and-Consistency.md) for the full CAP theorem and consistency models.

> **Authoritative sources**
> - [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/)
> - [In Search of an Understandable Consensus Algorithm (Raft, Ongaro & Ousterhout, 2014)](https://raft.github.io/raft.pdf)
> - [Release It! (Nygard) — origin of the circuit breaker and bulkhead patterns](https://pragprog.com/titles/mnee2/release-it-second-edition/)

## Replication and quorum

**Replication**: store $`r` copies of each data item on different nodes. A **quorum** of $`q` replicas must acknowledge a write. Read from $`q` replicas. Choosing $`q > r/2` guarantees that any two quorums intersect, so a reader always sees the latest committed value.

**Crash**: a single node stops (power loss, kernel panic, OOM kill). The strategy is **failover**: a standby node, or the quorum of remaining nodes, takes over the failed node's workload. The rest of the cluster stays connected, so only the failed node's role must be reassigned.

**Partition**: the cluster splits into two or more groups that cannot communicate, even though every node may still be up. The strategy is **quorum**: only the side holding a majority can accept writes; the minority side must either reject requests (consistency) or serve stale reads (availability). The fault-tolerance mechanism differs fundamentally between the two: a crash removes a node, a partition removes *links*, and only the second can leave two sides each believing they are in charge (split-brain).

**Failover**: when a node fails, its workload is transferred to a standby node. **Active-passive**: the standby is idle until the primary fails; failover takes seconds (RTO > 0). **Active-active**: both nodes handle traffic simultaneously, giving zero failover delay (RTO ≈ 0), but the key challenge is conflict resolution when both nodes write the same key concurrently—this connects to the multi-master and CRDT discussion below.

<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" style="max-width:660px;width:100%;background:#16213e;border-radius:8px">
  <text x="330" y="24" text-anchor="middle" fill="#7ec8e3" font-size="16" font-weight="bold">Quorum intersection (r = 5, q = 3)</text>
  <ellipse cx="235" cy="135" rx="175" ry="85" fill="#2d6a4f" fill-opacity="0.30" stroke="#52b788" stroke-width="2"/>
  <ellipse cx="425" cy="135" rx="175" ry="85" fill="#1d3557" fill-opacity="0.45" stroke="#457b9d" stroke-width="2"/>
  <text x="150" y="228" text-anchor="middle" fill="#52b788" font-size="13">Write quorum {A, B, C}</text>
  <text x="510" y="228" text-anchor="middle" fill="#457b9d" font-size="13">Read quorum {C, D, E}</text>
  <g font-size="15" font-weight="bold" text-anchor="middle">
    <circle cx="130" cy="150" r="22" fill="#2d6a4f" stroke="#52b788" stroke-width="2"/><text x="130" y="156" fill="#fff">A</text>
    <circle cx="205" cy="85" r="22" fill="#2d6a4f" stroke="#52b788" stroke-width="2"/><text x="205" y="91" fill="#fff">B</text>
    <circle cx="330" cy="135" r="24" fill="#f4a261" stroke="#e76f51" stroke-width="3"/><text x="330" y="141" fill="#000">C</text>
    <circle cx="465" cy="85" r="22" fill="#1d3557" stroke="#457b9d" stroke-width="2"/><text x="465" y="91" fill="#fff">D</text>
    <circle cx="540" cy="160" r="22" fill="#1d3557" stroke="#457b9d" stroke-width="2"/><text x="540" y="166" fill="#fff">E</text>
  </g>
  <text x="330" y="185" text-anchor="middle" fill="#f4a261" font-size="12">intersection: has the latest committed value</text>
</svg>

<details><summary>Details</summary>

**Step 1 — Why replication alone is not enough.** Suppose 3 replicas hold a value and a client writes a new value to only one of them, then reads from another. The read returns the stale value. Replication without a coordination rule gives no consistency guarantee.

**Step 2 — The quorum rule.** Require every write to be acknowledged by $`q` replicas and every read to consult $`q` replicas, with $`q > r/2`. Any write quorum and any read quorum then share at least $`2q - r \geq 1` node, so the read quorum contains at least one node that saw the write. Example: with $`r = 5, q = 3`, write quorum {A, B, C} and read quorum {C, D, E} share node C — the orange node in the diagram above — which carries the latest committed value to the reader.

**Step 3 — Leader election.** In practice a replicated system does not let every node accept writes: one node is the **leader** and the others are followers. If the leader fails, the followers detect the silence (heartbeat timeout) and elect a new leader via the consensus protocol — see [Consensus and Consistency](./Consensus-and-Consistency.md) for the full Raft/Paxos mechanism. The election itself needs a quorum, which is why a partitioned minority cannot elect a rival leader (no split-brain).

**Step 4 — Multi-master and conflict resolution.** Some systems instead let multiple nodes accept writes simultaneously. When divergent writes must be reconciled, the general approach is **patch / merge**: each node applies the patches (deltas) received from other nodes and merges the resulting state. Specific strategies:
- **Last-writer-wins (LWW)**: the write with the latest timestamp wins. Simple but loses data.
- **CRDT** (Conflict-free Replicated Data Type): operations are designed to be commutative and idempotent. No conflict resolution needed. Examples: G-Counter (increment-only), PN-Counter (increment/decrement), OR-Set (add/remove).
- **OT** (Operational Transformation): transform concurrent edits to a shared document (e.g., collaborative text editing). Google Docs uses OT.

**Example problem**: a 5-node cluster uses $`q = 3`. An administrator takes nodes A and B down for maintenance, then a third node (C) crashes. Can the cluster still commit writes? What if instead the network splits into {A, B} and {C, D, E}?

<details><summary>Solution</summary>

With A, B, C down, only 2 nodes are alive, which is below the quorum of 3: writes are blocked (the cluster chooses consistency over availability). With the split {A, B} vs {C, D, E}, the majority side {C, D, E} keeps accepting writes; the minority side {A, B} must reject writes (or serve stale reads). No split-brain is possible because only one side has a quorum.

</details>

</details>

## Durability

**Streaming replication**: the leader sends each write to followers in real time. The write is durable when a quorum acknowledges. The **replication factor** $`r` determines the number of copies.

**Write-ahead log (WAL)**: log the change before applying it; replay after a crash. See [Transactions](../../Algorithmics/Search-and-Data-Structures/Database-Theory/Transactions.md) for the B-tree and log-structured storage treatment.

**RPO** (Recovery Point Objective): the maximum acceptable data loss, measured in time. RPO = 0 means no committed data is ever lost (synchronous replication with quorum). RPO = 5 min means up to 5 minutes of writes may be lost.

**RTO** (Recovery Time Objective): the maximum acceptable downtime before service is restored. RTO = 30 s means the system must be back in service within 30 seconds of a failure.

<svg viewBox="0 0 660 190" xmlns="http://www.w3.org/2000/svg" style="max-width:660px;width:100%;background:#16213e;border-radius:8px">
  <text x="330" y="26" text-anchor="middle" fill="#7ec8e3" font-size="16" font-weight="bold">RPO and RTO on an incident timeline</text>
  <line x1="50" y1="110" x2="610" y2="110" stroke="#888" stroke-width="2"/>
  <polygon points="610,110 598,104 598,116" fill="#888"/>
  <line x1="200" y1="110" x2="200" y2="60" stroke="#f4a261" stroke-width="2"/>
  <circle cx="200" cy="110" r="6" fill="#f4a261"/>
  <text x="200" y="48" text-anchor="middle" fill="#f4a261" font-size="13">last replicated write</text>
  <line x1="400" y1="110" x2="400" y2="60" stroke="#e63946" stroke-width="2"/>
  <circle cx="400" cy="110" r="6" fill="#e63946"/>
  <text x="400" y="48" text-anchor="middle" fill="#e63946" font-size="13">failure</text>
  <line x1="560" y1="110" x2="560" y2="60" stroke="#52b788" stroke-width="2"/>
  <circle cx="560" cy="110" r="6" fill="#52b788"/>
  <text x="560" y="48" text-anchor="middle" fill="#52b788" font-size="13">service restored</text>
  <line x1="200" y1="140" x2="400" y2="140" stroke="#f4a261" stroke-width="3" marker-end="url(#arr1)"/>
  <text x="300" y="162" text-anchor="middle" fill="#f4a261" font-size="13">RPO: max data loss (writes between t₀ and failure)</text>
  <line x1="400" y1="140" x2="560" y2="140" stroke="#52b788" stroke-width="3" marker-end="url(#arr2)"/>
  <text x="480" y="182" text-anchor="middle" fill="#52b788" font-size="13">RTO: max downtime</text>
  <defs>
    <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#f4a261" stroke-width="1.5"/></marker>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#52b788" stroke-width="1.5"/></marker>
  </defs>
</svg>

**Availability**: the fraction of time the system is operational. For a component with mean time between failures (MTBF) and mean time to repair (MTTR):

```math
A = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}}
```

Worked example: MTBF = 30 days = 2 592 000 s, MTTR = 30 s → $`A = 2592000 / 2592030 \approx 0.9999884` → 99.9988%, which is *just under* five nines (five nines = 99.999%). To reach 99.999% with the same MTBF, the repair time must satisfy $`\text{MTTR} \leq \text{MTBF} \times (1 - A)/A \approx 2\,592\,000 \times 10^{-5} \approx 25.9` s.

**Caveat**: this formula assumes failures are *independent and identically distributed*. Real failures are often **correlated**: a datacenter power outage, a shared network switch, or a single bad deployment takes down many nodes at once. Correlated failures make the real availability far lower than the formula predicts, which is why quorum members must be spread across independent failure domains (see [Multi-datacenter fault tolerance](#multi-datacenter-fault-tolerance) below).

<details><summary>Details</summary>

**Step 1 — Why a log comes first.** A storage engine (e.g., a B-tree) updates several scattered pages per write. If the process crashes mid-update, the pages are half-written and the data is corrupt. The fix is to append a description of the change to a sequential log *first* (one `fsync`), apply it to the pages afterwards, and replay the log on restart. The log is the source of truth; the pages are a cache of it.

**Step 2 — From one machine to a cluster.** Streaming replication applies the same log on followers. The commit rule decides durability: with synchronous quorum ack, a write confirmed to the client exists on a quorum, so no single crash (and no minority partition) can lose it — RPO = 0. With asynchronous replication the leader acks immediately and ships the log in the background, so a crash can lose the tail of the log — RPO > 0.

**Step 3 — RPO/RTO trade-off.** Synchronous replication (write is durable only after quorum ack) gives RPO = 0 but adds write latency: the client waits for the slowest quorum member. Asynchronous replication gives lower latency but RPO > 0. The RTO is determined by failover speed: leader election time + state catch-up time.

**Step 4 — Hardware-level redundancy.** RAID (mirroring, striping with parity) applies the same replication idea inside one machine's disks; it protects against disk failure but not against machine failure. It is a type of sharding. See [Memory Hierarchy](../../Computer-Hardware/Memory-Hierarchy.md).

**Example problem**: a service has MTBF = 100 days and MTTR = 2 hours. What is its availability, and how many nines is that? What MTTR would give 99.9% ("three nines") with the same MTBF?

<details><summary>Solution</summary>

MTBF = 8 640 000 s, MTTR = 7 200 s. $`A = 8640000 / 8647200 \approx 0.999167` → 99.9167%, a bit over three nines (99.9%) but far from four nines (99.99%). For exactly 99.9%: $`\text{MTTR} = \text{MTBF} \times (1 - A)/A = 8\,640\,000 \times 0.001/0.999 \approx 8\,649` s ≈ 2.4 hours. Note how a *longer* tolerated repair time still yields lower availability here — the point is that 99.9% is a *looser* target, so a 2.4 h MTTR suffices, whereas the 2 h MTTR already beats it.

</details>

</details>

## Fault-tolerance patterns

Production systems (microservices, Kubernetes) use a set of patterns to contain and recover from failures:

- **Circuit breaker**: after $`n` consecutive failures, stop calling the dependency for a cooldown period. Prevents cascading failures.
- **Bulkhead**: isolate resources (thread pools, connections) per dependency so one failure does not exhaust shared resources.
- **Retry with exponential backoff and jitter**: retry a failed operation with increasing delay ($`d, 2d, 4d, \ldots`), randomized with a Gaussian to avoid thundering herd.
- **Graceful degradation**: return a reduced or cached response instead of an error when a dependency is unavailable.
- **Health checks / liveness probes**: periodic pings to detect a dead node before it is needed. Kubernetes uses liveness and readiness probes.

<svg viewBox="0 0 660 260" xmlns="http://www.w3.org/2000/svg" style="max-width:660px;width:100%;background:#16213e;border-radius:8px">
  <text x="330" y="28" text-anchor="middle" fill="#7ec8e3" font-size="16" font-weight="bold">Circuit breaker state machine</text>
  <g font-size="14" font-weight="bold" text-anchor="middle">
    <rect x="40" y="60" width="150" height="50" rx="10" fill="#2d6a4f" stroke="#52b788" stroke-width="2"/>
    <text x="115" y="90" fill="#fff">CLOSED</text>
    <rect x="470" y="60" width="150" height="50" rx="10" fill="#3d0000" stroke="#e63946" stroke-width="2"/>
    <text x="545" y="90" fill="#e63946">OPEN</text>
    <rect x="255" y="180" width="150" height="50" rx="10" fill="#7a5c00" stroke="#f4a261" stroke-width="2"/>
    <text x="330" y="210" fill="#f4a261">HALF-OPEN</text>
  </g>
  <line x1="190" y1="75" x2="470" y2="75" stroke="#e63946" stroke-width="2" marker-end="url(#arrR)"/>
  <text x="330" y="66" text-anchor="middle" fill="#e63946" font-size="12">failures ≥ threshold</text>
  <path d="M 545 110 Q 545 160 405 195" fill="none" stroke="#f4a261" stroke-width="2" marker-end="url(#arrA)"/>
  <text x="560" y="160" text-anchor="middle" fill="#f4a261" font-size="12">cooldown expires</text>
  <path d="M 255 195 Q 115 160 115 110" fill="none" stroke="#52b788" stroke-width="2" marker-end="url(#arrG)"/>
  <text x="100" y="160" text-anchor="middle" fill="#52b788" font-size="12">test call succeeds</text>
  <path d="M 405 215 Q 545 215 545 110" fill="none" stroke="#e63946" stroke-width="2" marker-end="url(#arrR)"/>
  <text x="480" y="240" text-anchor="middle" fill="#e63946" font-size="12">test call fails</text>
  <defs>
    <marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#e63946" stroke-width="1.5"/></marker>
    <marker id="arrG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#52b788" stroke-width="1.5"/></marker>
    <marker id="arrA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#f4a261" stroke-width="1.5"/></marker>
  </defs>
</svg>

**Chaos engineering**: fault-tolerance designs that are never exercised do not work when needed. Chaos engineering validates them deliberately: Netflix's **Chaos Monkey** randomly terminates production instances to prove that failover and retries absorb the loss; tools like **LitmusChaos** inject latency, disk failures, or availability-zone outages on schedule. The practice turns the patterns above (circuit breaker, bulkhead, retry, quorum failover) from paper designs into continuously tested behavior.

<details><summary>Details</summary>

**Step 1 — The cascading failure.** A service calls dependency D with a 5 s timeout. D slows down (e.g., its database is overloaded). Every incoming request now holds its thread for 5 s waiting for D, so the service's thread pool fills, and *unrelated* requests start timing out too: one slow dependency has taken down the whole service. This is a cascading failure.

**Step 2 — The circuit breaker trips.** A circuit breaker wraps calls to D and counts consecutive failures. After $`n` failures it moves CLOSED → OPEN and rejects calls to D *immediately*, without waiting for the timeout. Threads are freed, the service keeps serving everything that does not need D, and D gets time to recover (no more load from this caller). After a cooldown, OPEN → HALF-OPEN: one test call is let through. If it succeeds, the circuit closes; if it fails, it re-opens. Try it in the [circuit-breaker simulation](#fault-tolerance-patterns) below.

**Step 3 — Contain the blast radius with bulkheads.** A circuit breaker alone does not stop the thread-pool exhaustion in step 1 while the circuit is still CLOSED. A **bulkhead** partitions the pool: 20 threads reserved for calls to D, 20 for E, the rest for local work. When D hangs, only its 20 threads are stuck; the other 80 keep serving.

**Step 4 — Retry, but only safely.** Retrying a failed request is the simplest recovery, but blind retries cause a **thundering herd** (everyone retries at the same instant, re-overloading the recovering dependency) — hence exponential backoff with jitter. Worse, retrying a non-idempotent operation (e.g., `INCR`, or "charge the card") can double-apply it. Always pair retry with idempotent operations or idempotency keys. See [Consensus and Consistency](./Consensus-and-Consistency.md) for idempotency.

**Step 5 — Degrade and detect.** **Graceful degradation** is the user-facing half of the circuit breaker: when D is unavailable, serve a cached or simplified response (stale recommendations, a "likes" counter frozen at its last value) instead of an error. **Health checks** are the detection half: a load balancer or orchestrator pings each node periodically (Kubernetes liveness/readiness probes) and stops routing to — or restarts — nodes that fail, so a dead node is removed *before* clients notice.

**Step 6 — Test it on purpose.** Steps 1–5 are only trustworthy if exercised: chaos engineering (see above) injects the failures so the breakers trip, the bulkheads hold, and the failover completes — during business hours, with the team watching, rather than during the first real outage.

**Example problem**: service S calls dependency D with a 5 s timeout, 50 worker threads, and no patterns. D's latency rises from 100 ms to 6 s for 2 minutes. Roughly how many requests per second can S still serve during the incident, and how do a circuit breaker + bulkhead change that?

<details><summary>Solution</summary>

Without patterns: each thread is occupied 5 s per call to D, so each thread serves ≈ 0.2 req/s instead of 10 req/s. With 50 threads all stuck on D, throughput collapses to ≈ 10 req/s (50 × 0.2), and requests not needing D time out too. With a bulkhead (10 threads for D) + circuit breaker (trips after 5 failures, rejects instantly): the 10 D-threads trip the breaker within ≈ 0.5 s, after which calls to D are rejected in microseconds and the other 40 threads keep serving at full rate. Only a brief burst of slow requests is affected.

</details>

</details>

## Multi-datacenter fault tolerance

Node-level replication does not help if the whole site fails: a datacenter can lose power, networking, or cooling all at once — the correlated failure the availability formula warns about. The standard escalation is:

- **Cross-AZ replication**: cloud providers divide a region into **availability zones** (AZs) — physically separate datacenters with independent power and networking. Placing quorum members in 3 AZs (e.g., 2-2-1 for $`r = 5`) means any single AZ failure leaves a majority intact: RPO = 0 and RTO of seconds, at the cost of cross-AZ write latency.
- **Cross-region replication**: for survival of a whole-region outage, replicate asynchronously to another region. Latency (tens to hundreds of ms) makes synchronous cross-region quorums impractical, so this is typically **active-active multi-master** with conflict resolution (CRDTs, LWW — see above): RPO > 0 across regions.
- **Region-scale RPO/RTO**: the same objectives apply one level up. RTO now includes DNS / global load-balancer failover and cache warm-up (typically minutes); RPO is bounded by the cross-region replication lag. The RPO/RTO timeline above applies unchanged at this scale.

## Example problem

**Problem**: A 5-node cluster (replication factor = 5, quorum = 3) serves a financial API with an SLO of 99.99% availability. Node A (the leader) and node B crash simultaneously at 12:00:00. Leader election completes at 12:00:05. The new leader needs 20 s to catch up the remaining followers' state before accepting writes.

1. What is the actual RTO for this incident? Does it meet the SLO?
2. What is the RPO if the cluster uses synchronous replication (quorum ack required)?
3. If the cluster instead uses asynchronous replication with a 10 s replication lag, what is the RPO?

<details><summary>Solution</summary>

**1. RTO**: The system is unavailable from 12:00:00 (failure) until writes can resume. Writes resume after leader election (5 s) + state catch-up (20 s) = 25 s. So RTO = 25 s. The SLO of 99.99% allows at most 52.6 min of downtime per year (≈ 4.3 min per month). A single 25 s incident is well within budget. **The SLO is met.**

**2. RPO (synchronous)**: A write is committed only when a quorum (3 of 5) has acknowledged. With A and B down, at least one of C, D, E has every committed entry. **RPO = 0**: no committed data is lost.

**3. RPO (asynchronous, 10 s lag)**: The leader acks the client immediately and replicates in the background. If the leader crashes before the write reaches a quorum, up to 10 s of writes are lost. **RPO = 10 s**: up to 10 seconds of writes may be lost.

</details>

## See also

- [Scaling Strategies](../Scalability/Scaling-Strategies.md) for sharding, partitioning, and horizontal scaling.
- [Consensus and Consistency](./Consensus-and-Consistency.md) for CAP, linearizability, and consensus protocols.
- [Adversarial Failure](../Adversarial-failure.md) for Byzantine and Sybil fault models.

<iframe src="./Fault-Tolerance.simulation.html" title="Quorum intersection: toggle nodes and watch write/read quorums"></iframe>

<iframe src="./Fault-Tolerance-circuit-breaker.simulation.html" title="Circuit breaker state machine: CLOSED → OPEN → HALF-OPEN"></iframe>
