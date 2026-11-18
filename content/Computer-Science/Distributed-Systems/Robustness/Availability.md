# Availability

Availability studies how a system keeps *serving* despite failures — node crashes, disk failures, network partitions, whole-site outages. It is relevant whenever a system must meet an availability target (e.g. 99.99% uptime). For keeping *data* safe, see [Durability](./Durability.md); for agreeing on state, see [Consistency](./Consistency.md); for malicious nodes, see [Adversarial Failure](../Adversarial-Failure.md).

**Connection to CAP**: during a partition, the system must choose between consistency and availability (see [Consistency](./Consistency.md)). The RTO target below quantifies how much downtime is acceptable.

> **Authoritative sources**
> - [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/)
> - [Release It! (Nygard) — origin of the circuit breaker and bulkhead patterns](https://pragprog.com/titles/mnee2/release-it-second-edition/)

## Availability and RTO

**Availability** is the fraction of time the system is operational. For a component with mean time between failures (MTBF) and mean time to repair (MTTR):

```math
A = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}}
```

Worked example: MTBF = 30 days = 2 592 000 s, MTTR = 30 s → $`A = 2592000 / 2592030 \approx 0.9999884` → 99.9988% — just under five nines (99.999%); with the same MTBF, MTTR must be $`\le 25.9` s for five nines.

**RTO** (Recovery Time Objective): the maximum acceptable downtime before service is restored (see [Durability](./Durability.md) for the RPO/RTO timeline).

**Caveat**: this formula assumes failures are independent. Real failures are often **correlated** — a datacenter power outage or a bad deployment takes many nodes at once — so spread replicas and services across independent failure domains (see the topology ladder below, and [Durability](./Durability.md)).

## Failover vs load balancing: when to use which

A **load balancer** spreads requests across many interchangeable nodes — use it for **stateless** tiers (web/app servers, read replicas): any node can answer any request, so adding nodes adds capacity directly. A **failover** pair moves a **single-writer** workload (the leader, the primary database) to a standby when the active node dies — use it for stateful, single-writer components, where two writers would conflict. The standby takes over by replaying the **WAL streaming replication** from the primary (see [Durability](./Durability.md)).

**Active-passive**: the standby is idle until failover (RTO = detection + switch, seconds). **Active-active** (multi-master): both nodes serve simultaneously, RTO ≈ 0, but concurrent writes to the same key must be reconciled — see below.

<details><summary>EXPLANATION</summary>

**The rule of thumb**: if the request is a read or a stateless computation, load-balance it. If it is a write to a single source of truth, failover (or elect one leader via consensus — see [Consistency](./Consistency.md)). A load balancer in front of a multi-writer database does not remove the single-writer bottleneck — it just hides it until two primaries conflict.

**Detection**: health checks / heartbeats (Kubernetes liveness and readiness probes, load-balancer health checks) remove a dead node from the pool before clients notice; the failover then promotes a standby.

</details>

## Deployment topologies: single server → datacenter → multi-AZ → multi-region

The escalation ladder for surviving bigger failure domains:

- **Single server**: everything on one machine. No redundancy.
- **Multi-server in one datacenter**: quorum/replicas across nodes and racks (ToR switches are a shared failure domain — spread across them).
- **Multi-AZ**: availability zones are physically separate datacenters with independent power/networking; placing replicas in 3 AZs (e.g. 2-2-1 for $`r = 5``) survives any single AZ failure: RPO = 0, RTO of seconds, at the cost of cross-AZ write latency.
- **Multi-region**: for whole-region outages, replicate asynchronously to another region (synchronous cross-region quorums are impractical at tens-to-hundreds of ms). Typically active-active multi-master with conflict resolution: cross-region RPO > 0; RTO includes DNS / global load-balancer failover and cache warm-up (minutes).

## Multi-master replication

When several nodes accept writes simultaneously (active-active, or cross-region), the same key can be written in two places at once. Two things are needed: a way to **timestamp/order** the writes (real clocks **drift**, so nodes synchronize with **NTP**; for event ordering use **Lamport timestamps** or **vector clocks** — see [Consistency](./Consistency.md)), and a way to **merge** divergent versions: **patch / merge**, **last-writer-wins**, **CRDTs**, **OT** — see [Consistency](./Consistency.md) for the details.

## Fault-tolerance patterns

Production systems (microservices, Kubernetes) use a set of patterns to contain and recover from failures:

- **Circuit breaker**: after $`n` consecutive failures, stop calling the dependency for a cooldown period. Prevents cascading failures.
- **Bulkhead**: isolate resources (thread pools, connections) per dependency so one failure does not exhaust shared resources.
- **Retry with exponential backoff and jitter**: retry with increasing, randomized delay ($`d, 2d, 4d, \ldots`); pair with idempotent operations only.
- **Graceful degradation**: return a reduced or cached response instead of an error when a dependency is unavailable.
- **Health checks / liveness probes**: periodic pings to detect a dead node before it is needed.

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

**Chaos engineering**: fault-tolerance designs that are never exercised fail when needed. Chaos engineering validates them deliberately: Netflix's **Chaos Monkey** randomly terminates production instances; LitmusChaos injects latency, disk failures, and AZ outages on schedule.

<details><summary>EXPLANATION</summary>

**The cascading failure.** A service calls dependency D with a 5 s timeout. D slows down; every request holds its thread for 5 s, the pool fills, and *unrelated* requests time out too — one slow dependency has taken down the whole service.

**The circuit breaker trips.** After $`n` failures the breaker moves CLOSED → OPEN and rejects calls to D *immediately*, freeing threads and giving D room to recover. After a cooldown, OPEN → HALF-OPEN: one test call is let through; success closes the circuit, failure re-opens it. Try it in the simulation below.

**Contain the blast radius with bulkheads.** While the circuit is still CLOSED, a **bulkhead** partitions the thread pool (20 threads for D, 20 for E, the rest for local work), so a hanging D only strands its own 20 threads.

**Retry, but only safely.** Blind retries cause a **thundering herd** on the recovering dependency — hence exponential backoff with jitter. Retrying a non-idempotent operation ("charge the card") can double-apply it: pair retries with idempotency keys (see [Consistency](./Consistency.md)).

**Degrade and detect.** **Graceful degradation** serves a cached/simplified response instead of an error; **health checks** remove dead nodes before clients notice. **Chaos engineering** exercises all of it on purpose, in business hours.

**Example problem**: service S calls dependency D with a 5 s timeout, 50 worker threads, no patterns. D's latency rises to 6 s for 2 minutes. Roughly what throughput can S sustain, and how do a circuit breaker + bulkhead change that?

<details><summary>Solution</summary>

Without patterns: each thread is occupied 5 s per call, serving ≈ 0.2 req/s instead of 10; with all 50 stuck on D, throughput collapses to ≈ 10 req/s and unrelated requests time out. With a bulkhead (10 threads for D) + breaker (trips after 5 failures): the 10 D-threads trip the breaker within ≈ 0.5 s, calls to D are then rejected instantly, and the other 40 threads keep serving at full rate.

</details>

</details>

## Example problem

**Problem**: A 5-node cluster (replication factor 5, quorum 3) serves a financial API with an SLO of 99.99% availability. Node A (the leader) and node B crash simultaneously at 12:00:00. Leader election completes at 12:00:05; the new leader needs 20 s to catch up before accepting writes. What is the actual RTO for this incident? Does it meet the SLO? (For the RPO, see [Durability](./Durability.md).)

<details><summary>Solution</summary>

**RTO** = 5 s (election) + 20 s (catch-up) = 25 s. The 99.99% SLO allows ≈ 52.6 min downtime/year; a single 25 s incident is well within budget — **met**.

</details>

## See also

- [Durability](./Durability.md) for replication, quorum, WAL, RAID, RPO.
- [Consistency](./Consistency.md) for clocks, CAP, the consistency tower, consensus, ACID.
- [Adversarial Failure](../Adversarial-Failure.md) for Byzantine and Sybil fault models.

<iframe src="./Availability.simulation.html" title="Circuit breaker state machine: CLOSED → OPEN → HALF-OPEN"></iframe>
