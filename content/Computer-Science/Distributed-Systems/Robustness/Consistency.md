# Consistency

Consistency studies how multiple nodes agree on a single view of the data despite failures and network partitions: ordering events (clocks), converging replicas (merge strategies, consistency models), reaching agreement (consensus), and grouping operations (transactions). It is relevant whenever a distributed system must maintain a consistent state across replicas. For keeping data safe, see [Durability](./Durability.md); for keeping the service up, see [Availability](./Availability.md).

> **Authoritative sources**
> - [The Part-Time Parliament (Lamport, 1998)](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)
> - [In Search of an Understandable Consensus Algorithm (Raft, Ongaro & Ousterhout, 2014)](https://raft.github.io/raft.pdf)
> - [Time, Clocks, and the Ordering of Events (Lamport, 1978)](https://dl.acm.org/doi/10.1145/359545.359563)
> - [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (Gilbert & Lynch, 2002)](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer.pdf)
> - [Consistency models (Jepsen)](https://jepsen.io/consistency/models)

## Time and clocks

Distributed ordering starts with time. A **day** is one Earth rotation (~86 400 s), a **year** one orbit (~365.25 days), and the **second** is defined atomically (9 192 631 770 periods of the cesium-133 hyperfine transition). Time scales: **UT1** tracks Earth's rotation, **TAI** is the atomic scale, and **UTC** = TAI shifted by **leap seconds** so it stays within 0.9 s of UT1. Computers usually store **Unix time** (seconds since 1970-01-01T00:00:00Z, ignoring leap seconds) and display **ISO 8601** strings. See [this reference on time](https://github.com/espadrine/succinct-cybernetics/blob/master/misc/time.md) for details.

Two practical problems: hardware clocks **drift** (quartz oscillators vary with temperature), so nodes **synchronize** with **NTP** (typically within a few ms on a LAN, tens of ms over the Internet; NTP also disciplines the clock rate, not just the offset); and even perfect clocks cannot order *concurrent* events, which is what logical clocks are for:

- **Lamport timestamp** (logical clock): each node keeps a counter $`C`; on a local event $`C \leftarrow C+1`; on sending a message, attach $`C`; on receiving, $`C \leftarrow \max(C, C_{msg}) + 1`. If event $`a \to b` (a happens-before b), then $`C(a) < C(b)` — but the converse does not hold.
- **Vector clock**: each node keeps a vector of counters, one per node; receiving merges componentwise. Vector clocks detect causality exactly: $`a` and $`b` are concurrent iff neither vector dominates the other.
- **Hybrid logical clocks (HLC)**: combine a physical clock with a logical counter — timestamps close to wall-clock time that still respect causality.

<svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lamport logical clocks on three processes. Each event increments the local counter; a received message sets the counter to max(local, message) plus one." style="max-width:640px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="lc-msg" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b57a4a"/></marker>
  </defs>
  <text x="70" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="#1c3a5e">P1</text>
  <text x="320" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="#1c3a5e">P2</text>
  <text x="570" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="#1c3a5e">P3</text>
  <line x1="70" y1="34" x2="70" y2="170" stroke="#bbb" stroke-dasharray="4 3"/>
  <line x1="320" y1="34" x2="320" y2="170" stroke="#bbb" stroke-dasharray="4 3"/>
  <line x1="570" y1="34" x2="570" y2="170" stroke="#bbb" stroke-dasharray="4 3"/>
  <g font-size="10" font-family="monospace" fill="#334">
    <circle cx="70" cy="60" r="4.5" fill="#4a6fa5"/><text x="82" y="64">e1: C=1</text>
    <circle cx="70" cy="100" r="4.5" fill="#4a6fa5"/><text x="82" y="104">e2: C=2, send m1 (C=2)</text>
    <circle cx="70" cy="150" r="4.5" fill="#4a6fa5"/><text x="82" y="154">e3: C=3</text>
    <circle cx="320" cy="80" r="4.5" fill="#3d8b57"/><text x="332" y="84">recv m1: C=max(0,2)+1=3</text>
    <circle cx="320" cy="120" r="4.5" fill="#3d8b57"/><text x="332" y="124">e4: C=4, send m2 (C=4)</text>
    <circle cx="320" cy="160" r="4.5" fill="#3d8b57"/><text x="332" y="164">e5: C=5</text>
    <circle cx="570" cy="140" r="4.5" fill="#b57a4a"/><text x="500" y="144" text-anchor="end">recv m2: C=max(0,4)+1=5</text>
  </g>
  <line x1="78" y1="100" x2="310" y2="82" stroke="#b57a4a" stroke-width="1.5" marker-end="url(#lc-msg)"/>
  <line x1="328" y1="120" x2="560" y2="138" stroke="#b57a4a" stroke-width="1.5" marker-end="url(#lc-msg)"/>
  <text x="320" y="185" text-anchor="middle" font-size="10" fill="#666">a → b implies C(a) &lt; C(b); incomparable counters mean concurrent events.</text>
</svg>

## Convergence: the linearizability tower

When replicas can diverge (multi-master — see [Availability](./Availability.md)), they must **converge**: the models below range from the strongest to the weakest guarantee. The full spectrum with formal definitions is in [Jepsen's consistency models](https://jepsen.io/consistency/models).

<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Consistency model tower, strongest at the top: linearizability, sequential consistency, causal consistency, session guarantees, eventual consistency at the bottom." style="max-width:640px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="tw-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#555"/></marker>
  </defs>
  <g font-size="12" text-anchor="middle">
    <rect x="170" y="30" width="300" height="30" rx="5" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/><text x="320" y="50" fill="#1b5e20" font-weight="bold">Linearizability (strongest — the C extreme)</text>
    <rect x="170" y="72" width="300" height="30" rx="5" fill="#d7ecd9" stroke="#2e7d32"/><text x="320" y="92" fill="#1b5e20">Sequential consistency</text>
    <rect x="170" y="114" width="300" height="30" rx="5" fill="#e3f0e6" stroke="#2e7d32"/><text x="320" y="134" fill="#1b5e20">Causal consistency (vector clocks)</text>
    <rect x="170" y="156" width="300" height="30" rx="5" fill="#edf5ee" stroke="#2e7d32"/><text x="320" y="176" fill="#1b5e20">Session guarantees: read-your-writes, monotonic reads</text>
    <rect x="170" y="198" width="300" height="30" rx="5" fill="#f5f9f5" stroke="#2e7d32" stroke-dasharray="4 3"/><text x="320" y="218" fill="#1b5e20">Eventual consistency (weakest — the A extreme)</text>
  </g>
  <line x1="500" y1="45" x2="500" y2="212" stroke="#555" stroke-width="1.5" marker-end="url(#tw-arr)"/>
  <text x="512" y="135" font-size="10" fill="#555" transform="rotate(90 512 135)">weaker → more available under partition</text>
  <text x="60" y="50" font-size="10" fill="#666" text-anchor="end">Raft log,</text>
  <text x="60" y="64" font-size="10" fill="#666" text-anchor="end">distributed locks</text>
  <text x="60" y="176" font-size="10" fill="#666" text-anchor="end">social feeds,</text>
  <text x="60" y="190" font-size="10" fill="#666" text-anchor="end">collab editing</text>
  <text x="60" y="218" font-size="10" fill="#666" text-anchor="end">DNS, CDNs</text>
</svg>

**Linearizability**: every operation appears to take effect instantaneously between its invocation and response; all operations serialize in a total order consistent with real time. **Serializability**: concurrent transactions equal some serial order (no real-time constraint). **Causal consistency**: if A causally precedes B, all nodes see A before B. **Eventual consistency**: if writes stop, replicas converge — no time bound.

**Converging divergent replicas — patch / merge**: each node applies the patches (deltas) received from the others and merges the resulting state:

- **Last-writer-wins (LWW)**: the write with the latest timestamp wins. Simple, but silently loses data when two users edit the same field offline.
- **CRDT** (Conflict-free Replicated Data Type): operations designed to be commutative, associative, and idempotent, so replicas converge without coordination. Examples: G-Counter (increment-only), PN-Counter (inc/dec), OR-Set (add/remove with unique tags — union keeps both edits).
- **OT** (Operational Transformation): transform concurrent edits to a shared ordered sequence (collaborative text editing, Google Docs).

<details><summary>EXPLANATION</summary>

**Choosing a model**: linearizability for financial transactions, leader election, distributed locks; causal consistency for collaborative editing and social feeds; eventual consistency for DNS and CDN caches. MVCC (multi-version concurrency control) gives readers a snapshot — the basis of snapshot isolation, between serializability and causal.

**Choosing a merge strategy**: LWW for data where one value must win (session tokens, profile fields); CRDTs for counters, sets, and collaborative state that must converge; OT for ordered sequences (text).

The single-machine analog of consensus is the [mutex](../Concurrency/Readme.md): a lock ensures mutual exclusion among threads, just as a quorum ensures agreement among nodes. Message delivery semantics are covered in [Message Passing](../Concurrency/Message-Passing.md).

</details>

## Impossibility results

**Two generals problem** (1975): two generals must agree to attack or retreat, but messages can be lost. No finite protocol guarantees agreement — the last message always needs an ack, which itself can be lost.

**FLP theorem** (Fischer, Lynch, Paterson, 1985): no *deterministic* consensus algorithm can guarantee termination in an asynchronous system with even one crash. Practical systems escape via **nondeterminism**: randomization (random election timeouts) or failure detectors (timeouts), i.e. partial synchrony.

**Exactly-once delivery is impossible** in an asynchronous network (the same argument as the two generals). The practical answer is **at-least-once delivery + idempotency**: deliver with retries (duplicates possible, with a negligible chance of UUID collision), and make the consumer idempotent. The implication for message queues: track the **user intent at the root** (e.g. an idempotency key on the original command) and let downstream effects be deduplicated by it — see [Message Queues](../Concurrency/Message-Passing.md).

**Byzantine faults** (malicious nodes) require $`n \ge 3f + 1` nodes; see [Adversarial Failure](../Adversarial-Failure.md).

## CAP theorem

**CAP theorem** (Brewer 2000; Gilbert & Lynch 2002): during a **network partition**, a distributed store can provide at most one of:

- **C**onsistency: every read returns the most recent write or an error.
- **A**vailability: every request receives a (non-error) response.

**P**artition tolerance is non-negotiable — real networks partition — so the practical choice is C vs A during a partition. Note the failure can be **localized**: a CP system can keep the majority side fully available and only refuse writes on the minority side, rather than going down entirely.

<details><summary>EXPLANATION</summary>

**Examples**: **CP** (choose consistency): Raft, ZooKeeper, etcd — the minority side returns errors. **AP** (choose availability): Dynamo, Cassandra, CouchDB — both sides accept writes; conflicts are resolved later (CRDTs, LWW — see above). The CAP theorem organizes the consistency tower above: linearizability is the C extreme, eventual consistency the A extreme. See [Jepsen's consistency models](https://jepsen.io/consistency/models) for the formal tower.

</details>

## Consensus: quorum 2f+1, Paxos, Raft

**Consensus** lets a set of nodes agree on a sequence of values despite crashes. A **quorum** of $`2f + 1` nodes tolerates $`f` crash failures (3 nodes → 2, 5 nodes → 3). By the pigeonhole principle, any two quorums of $`n` nodes (size $`> n/2`) intersect in at least one node — so a value committed by one quorum is seen by the next. (Replication mechanics: [Durability](./Durability.md).)

**Paxos** (Lamport, 1998): a proposer sends **prepare** to a quorum, then **accept** with the highest-numbered proposal seen; the first value accepted by a quorum wins.

**Raft** (Ongaro & Ousterhout, 2014): (1) **leader election** — a node whose election timeout (150–300 ms, randomized) fires becomes candidate and needs a quorum of votes; (2) **log replication** — the leader appends entries and sends AppendEntries; a quorum's ack commits the entry; (3) **safety** — a candidate must have a log at least as up-to-date as a quorum's, so a new leader always contains all committed entries.

**2PC (two-phase commit)**: an atomic-commit protocol for distributed transactions — the coordinator asks all participants to prepare, then commits if all vote yes. Blocking: if the coordinator crashes mid-protocol, participants wait forever.

<details><summary>EXPLANATION</summary>

<svg width="400" height="160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#333"/>
    </marker>
  </defs>
  <ellipse cx="80" cy="80" rx="60" ry="30" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="55" y="85" font-size="13" font-family="sans-serif" font-weight="bold">Follower</text>
  <ellipse cx="320" cy="80" rx="60" ry="30" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="295" y="85" font-size="13" font-family="sans-serif" font-weight="bold">Candidate</text>
  <ellipse cx="200" cy="30" rx="60" ry="25" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="175" y="35" font-size="13" font-family="sans-serif" font-weight="bold">Leader</text>
  <line x1="140" y1="70" x2="260" y2="70" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="170" y="65" font-size="10" font-family="sans-serif">timeout fires</text>
  <line x1="260" y1="95" x2="140" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="160" y="112" font-size="10" font-family="sans-serif">new leader / term</text>
  <line x1="300" y1="55" x2="250" y2="40" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="260" y="42" font-size="10" font-family="sans-serif">quorum votes</text>
  <line x1="150" y1="40" x2="100" y2="55" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="80" y="42" font-size="10" font-family="sans-serif">discover</text>
  <text x="80" y="52" font-size="10" font-family="sans-serif">higher term</text>
</svg>

**Log compaction**: the log grows unboundedly; periodically nodes take a **snapshot** of the state and truncate the log. A follower that is too far behind receives a snapshot instead of log entries.

</details>

<iframe src="./Consistency.simulation.html" title="Raft leader election animation"></iframe>

## Transactions: ACID

A **transaction** groups several operations into one unit with four guarantees:

- **Atomicity**: all operations of a transaction commit, or none do (multi-op transaction; implemented with a WAL and undo/redo — see [Transactions](../../Algorithmics/Search-and-Data-Structures/Database-Theory/Transactions.md)).
- **Consistency**: the transaction respects the declared **constraints** (invariants, foreign keys, checks).
- **Isolation**: concurrent transactions do not interfere. Isolation **levels**, weakest to strongest: *read uncommitted* (dirty reads allowed), *read committed* (no dirty reads), *repeatable read* (no non-repeatable reads), *snapshot isolation* (each transaction reads a consistent snapshot; write conflicts abort), *serializable* (as if transactions ran one at a time).
- **Durability**: once committed, the transaction survives any crash (WAL + replication — see [Durability](./Durability.md)).

<details><summary>EXPLANATION</summary>

**Isolation levels as a trade-off**: serializable is easiest to reason about but slowest (locks, or serializable snapshot isolation aborting conflicting transactions); read committed is the common default. The phenomena to avoid are dirty reads, non-repeatable reads, and phantoms — each level forbids a subset.

**ACID across nodes**: atomicity and durability scale via consensus and replication ([Durability](./Durability.md), this page); isolation across nodes is bounded by the consistency model chosen above — a linearizable store gives serializable single-object transactions; multi-object, cross-shard transactions need 2PC/Paxos-style commit.

</details>

## Example problem

**Problem**: A 5-node Raft cluster (A, B, C, D, E) has A as leader. Node A crashes. Describe the leader election and the safety guarantee.

<details><summary>Solution</summary>

1. **Detection**: B–E stop receiving heartbeats; after their randomized election timeouts, they become candidates.
2. **Election**: suppose B's timeout fires first. B increments its term, votes for itself, and requests votes; with a quorum (3 of 5) it becomes leader.
3. **Safety**: the committed entry was written to a quorum {A, B, C}; B was elected by a quorum {B, D, E}. The two quorums intersect at B (pigeonhole: 3 + 3 > 5), so B's log contains every committed entry — nothing is lost.
4. **Recovery**: B heartbeats the others; lagging followers catch up via AppendEntries (or a snapshot).

**Guarantee**: no committed entry is lost, and the system keeps progressing while a quorum (3 of 5) is alive.

</details>
