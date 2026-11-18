# Durability

Durability studies how to keep committed data safe despite failures — disks, machines, whole sites. It is relevant whenever data must survive crashes: the "D" in ACID and the RPO half of every reliability target. The sections below progress from a single node (WAL, RAID) to multiple nodes (quorum replication, streaming replication — where RPO/RTO are defined) to placement across failure domains (the replication hierarchy). For keeping the *service* up, see [Availability](./Availability.md); for agreeing on state across nodes, see [Consistency](./Consistency.md); for malicious nodes, see [Adversarial Failure](../Adversarial-Failure.md).

> **Authoritative sources**
> - [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/)
> - [In Search of an Understandable Consensus Algorithm (Raft, Ongaro & Ousterhout, 2014)](https://raft.github.io/raft.pdf)

## Write-ahead log (WAL)

A storage engine updates several scattered pages per write; a crash mid-update leaves them half-written. The fix: append a description of the change to a sequential **log first** (one `fsync`), apply it to the pages afterwards, and **replay** the log on restart. The log is the source of truth; the pages are a cache of it. See [Transactions](../../Algorithmics/Search-and-Data-Structures/Database-Theory/Transactions.md) for the log-structured storage treatment.

## RAID (one node, many disks)

Inside one machine, disks are combined redundantly: **RAID 1** (mirroring), **RAID 5/6** (striping with one/two parity disks), **RAID 10** (mirrored stripes). RAID protects against *disk* failure, not machine failure. See [Memory Hierarchy](../../Computer-Hardware/Memory-Hierarchy.md).

## Replication and quorum (multiple nodes)

**Replication**: store $`r` copies of each data item on different nodes (the **replication factor**). A **quorum** of $`q` replicas must acknowledge a write; reads consult $`q` replicas. Choosing $`q > r/2` guarantees any two quorums intersect, so a reader always sees the latest committed value.

**Crash**: a single node stops (power loss, kernel panic, OOM kill). The quorum of remaining nodes takes over the failed node's workload.

**Partition**: the cluster splits into groups that cannot communicate, even though every node may still be up. Only the side holding a majority quorum can accept writes; the minority must reject requests (consistency) or serve stale reads (availability) — see [Consistency](./Consistency.md). A crash removes a node; a partition removes *links* — only the second can leave two sides each believing they are in charge (split-brain).

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

<details><summary>EXPLANATION</summary>

**Why replication alone is not enough.** Suppose 3 replicas hold a value and a client writes a new value to only one of them, then reads from another. The read returns the stale value. Replication without a coordination rule gives no consistency guarantee.

**The quorum rule.** Require every write to be acknowledged by $`q` replicas and every read to consult $`q` replicas, with $`q > r/2`. Any write quorum and any read quorum then share at least $`2q - r \geq 1` node, so the read quorum contains at least one node that saw the write. Example: with $`r = 5, q = 3`$, write quorum {A, B, C} and read quorum {C, D, E} share node C — the orange node above — which carries the latest committed value to the reader.

**Leader election.** In practice one node is the **leader** and the others followers. If the leader fails, followers detect the silence (heartbeat timeout) and elect a new leader via consensus — see [Consistency](./Consistency.md). The election itself needs a quorum, which is why a partitioned minority cannot elect a rival leader (no split-brain).

**Example problem**: a 5-node cluster uses $`q = 3`$. Nodes A and B are taken down for maintenance, then C crashes. Can the cluster still commit writes? What if instead the network splits into {A, B} and {C, D, E}?

<details><summary>Solution</summary>

With A, B, C down, only 2 nodes are alive — below the quorum of 3: writes are blocked (consistency over availability). With the split {A, B} vs {C, D, E}, the majority side {C, D, E} keeps accepting writes; the minority {A, B} must reject writes (or serve stale reads). No split-brain is possible because only one side has a quorum.

</details>

</details>

## Streaming and multi-node replication

**Streaming replication**: the leader sends each write to the followers in real time (**multi-node replication**); the write is durable once a **quorum** acknowledges. The commit rule sets the durability/latency trade-off:

- **Synchronous** (commit only after quorum ack): **RPO = 0** — no committed write is ever lost — but the client waits for the slowest quorum member.
- **Asynchronous** (leader acks immediately, ships the log in the background): lower latency, but a crash can lose the tail of the log — **RPO > 0**.

<details><summary>EXPLANATION</summary>

**RPO and RTO.** **RPO** (Recovery Point Objective): the maximum acceptable data loss, measured in time — with synchronous replication RPO = 0 (no committed write is ever lost); with asynchronous replication RPO = the replication lag (the tail of the log can be lost). **RTO** (Recovery Time Objective): the maximum acceptable downtime before service is restored (leader election + state catch-up — see [Availability](./Availability.md)). On an incident timeline:

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

</details>

## Replication hierarchy: racks, AZs, regions

Replicas must be spread across **independent failure domains**, because real failures are correlated (a ToR switch, a power feed, a whole datacenter can fail at once). The hierarchy, outermost last:

1. **Different racks / switches** within one datacenter.
2. **Electrically separate AZs**: cloud regions are divided into availability zones — physically separate datacenters with independent power and networking. E.g. **tripreplication across 3 AZs** (2-2-1 for $`r = 5$`) survives any single AZ failure with RPO = 0.
3. **Another region**: one replica (or an async replica set) in a different region survives a whole-region disaster — asynchronous, so cross-region RPO > 0, at tens-to-hundreds of ms of write latency if synchronous.

## Example problem

**Problem**: A 5-node cluster (replication factor 5, quorum 3) uses asynchronous replication with a 10 s replication lag, plus one asynchronous replica in another region (30 s lag). The leader crashes at 12:00:00 without having replicated the last writes. What is the RPO within the region, and across regions?

<details><summary>Solution</summary>

**Within the region**: the leader acked writes immediately and replicated in the background; the followers are up to 10 s behind, so up to 10 s of writes are lost → **RPO = 10 s**. (With synchronous quorum ack it would have been RPO = 0.) **Across regions**: the other region's replica is 30 s behind → **RPO = 30 s** if you fail over there. The failover *time* (RTO) is the [Availability](./Availability.md) side: election + catch-up + DNS/global-LB switch.

</details>

## Simulation

<iframe src="./Durability.simulation.html" title="Quorum intersection: toggle nodes and watch write/read quorums"></iframe>
