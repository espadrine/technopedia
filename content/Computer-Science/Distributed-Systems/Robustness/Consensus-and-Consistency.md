# Consensus and Consistency

Consensus and consistency study how multiple nodes agree on a single value or a sequence of values, despite failures and network partitions. They are relevant whenever a distributed system must maintain a consistent state across replicas.

> **Authoritative sources**
> - [The Part-Time Parliament (Lamport, 1998)](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)
> - [In Search of an Understandable Consensus Algorithm (Raft, Ongaro & Ousterhout, 2014)](https://raft.github.io/raft.pdf)
> - [Time, Clocks, and the Ordering of Events (Lamport, 1978)](https://dl.acm.org/doi/10.1145/359575.359579)
> - [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (Gilbert & Lynch, 2002)](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer.pdf)

## Impossibility results

The **two generals problem** (Akkoyunlu, Ekanadham & Huber, 1975) is the foundational intuition: two generals must agree to attack or retreat, but messages can be lost. No finite protocol guarantees agreement. This thought experiment motivates the formal result below.

**FLP theorem** (Fischer, Lynch, Paterson, 1985): no deterministic consensus algorithm can guarantee termination in an asynchronous system with even one crash failure. The proof uses a topological argument: the state space is connected, and a decision requires a discontinuity.

<details><summary>Details</summary>

**Why FLP matters**: it shows that consensus requires either (1) synchrony (bounded message delays), (2) randomization (probabilistic termination), or (3) a failure detector (a mechanism that detects crashes). In practice, systems use a combination: timeouts (approximate synchrony) + leader election (randomization via random timeouts).

**Byzantine faults** (malicious nodes) require $`n \geq 3f + 1` nodes; see [Adversarial-failure](../Adversarial-failure.md) for the full treatment.

</details>

## CAP theorem

**CAP theorem** (Brewer, 2000; Gilbert & Lynch, 2002): a distributed data store can provide at most two of three guarantees simultaneously:
- **C**onsistency: every read returns the most recent write or an error.
- **A**vailability: every request receives a (non-error) response.
- **P**artition tolerance: the system continues to operate despite an arbitrary number of messages being dropped by the network.

Since network partitions are inevitable, the practical choice is between C and A during a partition.

<details><summary>Details</summary>

**Consistency (C)**: all nodes see the same data at the same time. A read after a write returns the written value. This is the strongest guarantee (linearizability).

**Availability (A)**: every request gets a response, even if the response is stale. The system does not block or return errors during a partition.

**Partition tolerance (P)**: the system tolerates network partitions. Since real networks partition, P is non-negotiable for any distributed system. The choice is C vs. A.

**Examples**:
- **CP** (choose consistency): Raft, ZooKeeper, etcd. During a partition, the minority side returns errors.
- **AP** (choose availability): Dynamo, Cassandra, CouchDB. During a partition, both sides accept writes; conflicts are resolved later.

The CAP theorem is the organizing principle for the consistency models below: linearizability is the C extreme, eventual consistency is the A extreme.

</details>

## Consensus algorithms

**Paxos** (Lamport, 1998): a two-phase protocol (prepare + accept). A **proposer** selects a value, sends a prepare request to a quorum ($`> n/2`), then an accept request. The first value accepted by a quorum is the consensus value.

**Raft** (Ongaro & Ousterhout, 2014): a more understandable consensus algorithm. Three phases:
1. **Leader election**: a node times out and becomes a candidate. It requests votes from peers. A quorum ($`> n/2`) elects the leader.
2. **Log replication**: the leader appends entries to its log and sends AppendEntry RPCs to followers. A quorum acknowledges; the leader commits the entry.
3. **Safety**: a leader can only commit entries from its own term. A follower rejects a leader with a lower term.

**2PC (Two-Phase Commit)** (Garcia-Molina, 1987): an atomic commit protocol for distributed transactions. Phase 1 (prepare): the coordinator asks all participants if they can commit. Phase 2 (commit/abort): if all vote "yes," the coordinator commits; otherwise it aborts. 2PC is the basis for distributed database transactions.

<details><summary>Details</summary>

**Quorum**: $`2f + 1` nodes tolerate $`f` crash failures. For 3 nodes: quorum = 2. For 5 nodes: quorum = 3. For 7 nodes: quorum = 4. See [Fault-Tolerance](./Fault-Tolerance.md) for replication strategies and quorum-based read/write policies.

**Quorum intersection property**: any two quorums of $`n` nodes (size $`> n/2`) must share at least one node. This is the safety argument: if a value is committed (accepted by a quorum), any future leader (elected by a quorum) must have heard of it.

<svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="20" font-size="12" font-family="sans-serif">Quorum intersection (n=5, quorum=3):</text>
  <rect x="10" y="35" width="180" height="30" rx="4" fill="#e3f2fd" stroke="#1565c0"/>
  <text x="20" y="55" font-size="11" font-family="sans-serif">Quorum 1: {A, B, C}</text>
  <rect x="120" y="35" width="180" height="30" rx="4" fill="#fff3e0" stroke="#e65100"/>
  <text x="130" y="55" font-size="11" font-family="sans-serif">Quorum 2: {B, D, E}</text>
  <rect x="120" y="35" width="30" height="30" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="125" y="55" font-size="11" font-family="sans-serif" font-weight="bold">B</text>
  <text x="10" y="90" font-size="11" font-family="sans-serif" fill="#333">Any two 3-subsets of a 5-set share ≥ 1 element (pigeonhole: 3+3 > 5).</text>
  <text x="10" y="108" font-size="11" font-family="sans-serif" fill="#333">The overlap guarantees a committed value is known to the new leader.</text>
</svg>

**Leader election (Raft)**: each node has a random election timeout (150–300 ms). If no heartbeat is received within the timeout, the node becomes a candidate and increments its term. It votes for itself and requests votes from peers. The first candidate to get a quorum becomes the leader.

**Raft state machine**:

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

**Log compaction**: the log grows unbounded. **Snapshots**: periodically, a node saves its state and truncates the log. A new follower that is too far behind receives a snapshot instead of the full log.

**2PC details**: 2PC is blocking: if the coordinator crashes after participants have voted "yes" but before sending the commit, participants are stuck in the "prepared" state. This is why 2PC is used for short-lived transactions, not for long-running consensus. Paxos and Raft solve this by making the log the source of truth.

</details>

<iframe src="./Consensus-and-Consistency.simulation.html" title="Raft leader election animation"></iframe>

## Consistency models

The CAP theorem organizes the consistency spectrum: under a partition, a system chooses between consistency (C) and availability (A). The models below range from the strongest (C extreme) to the weakest (A extreme).

**Linearizability** (strongest, C): every operation appears to take effect instantaneously at some point between its invocation and response. All reads and writes are serialized in a total order consistent with real time. Raft's committed log is linearizable.

**Serializability**: the result of concurrent transactions is equivalent to some serial execution. Weaker than linearizability (no real-time constraint).

**Causal consistency**: if operation A causally precedes operation B (A's result is used by B), then all nodes observe A before B. Unrelated operations may be seen in different orders.

**Read-your-writes**: a reader always sees its own previous writes. A per-client guarantee.

**Monotonic reads**: once a client reads a value, subsequent reads never return an older value.

**Eventual consistency** (weakest, A): if writes stop, all replicas eventually converge to the same value. No bound on convergence time.

<details><summary>Details</summary>

**Linearizability vs. serializability**: linearizability adds a real-time constraint. If client X writes value 5 at time t₁ and client Y reads at time t₂ > t₁, a linearizable system must return 5 to Y. A serializable system might return an older value if the serial order places Y's read before X's write.

**MVCC** (Multi-Version Concurrency Control): readers see a snapshot; writers create new versions. Provides snapshot isolation (a weaker form of serializability). Used in PostgreSQL, Oracle, and many NoSQL stores.

**Causal consistency in practice**: implemented with vector clocks or hybrid logical clocks. DynamoDB's "strong" consistency is linearizable; its "eventual" mode is eventual consistency.

**Choosing a model**:
- Linearizability: financial transactions, leader election, distributed locks.
- Causal consistency: collaborative editing, social media feeds.
- Eventual consistency: DNS, CDN caches, analytics.

The single-machine analog of consensus is the [mutex](../Concurrency/Readme.md): a lock ensures mutual exclusion among threads, just as a quorum ensures agreement among nodes. Message delivery semantics (at-least-once, exactly-once) and message queues are covered in [Message-Passing](../Concurrency/Message-Passing.md).

</details>

## Example problem

**Problem**: A 5-node Raft cluster (nodes A, B, C, D, E) has A as the leader. Node A crashes. Describe the leader election process and the safety guarantees.

<details><summary>Solution</summary>

1. **Detection**: B, C, D, E stop receiving heartbeats from A. After their election timeouts (150–300 ms, random), they become candidates.

2. **Election**: Suppose B's timeout fires first. B increments its term to 2, votes for itself, and sends RequestVote to C, D, E. C, D, E have not voted in term 2, so they grant their votes. B has 4 votes (itself + C, D, E) > quorum (3). B becomes the leader.

3. **Safety**: B's log is at least as up-to-date as any other node's log (Raft's election restriction: a candidate must have a log at least as up-to-date as a quorum of peers). B cannot commit entries from a previous term that were not committed. Any entry that was committed before A's crash is in B's log.

   **Quorum intersection guarantee**: the committed entry was written to a quorum (3 of 5 nodes). B was elected by a quorum (3 of 5 nodes). By the pigeonhole principle, these two quorums share at least one node, so B (or a node that voted for B) has the committed entry.

   <svg width="360" height="100" xmlns="http://www.w3.org/2000/svg">
     <text x="10" y="18" font-size="11" font-family="sans-serif">Committed entry in quorum {A, B, C}; B elected by quorum {B, D, E}:</text>
     <rect x="10" y="30" width="150" height="28" rx="4" fill="#e3f2fd" stroke="#1565c0"/>
     <text x="20" y="49" font-size="10" font-family="sans-serif">Wrote: {A, B, C}</text>
     <rect x="100" y="30" width="150" height="28" rx="4" fill="#fff3e0" stroke="#e65100"/>
     <text x="110" y="49" font-size="10" font-family="sans-serif">Elected: {B, D, E}</text>
     <rect x="100" y="30" width="25" height="28" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
     <text x="103" y="49" font-size="10" font-family="sans-serif" font-weight="bold">B</text>
     <text x="10" y="80" font-size="10" font-family="sans-serif" fill="#333">Overlap = {B} → B has the committed entry. Safety holds.</text>
   </svg>

4. **Recovery**: B sends heartbeats to C, D, E. They switch to follower mode and accept B's term. If D's log is behind B's, B sends the missing entries via AppendEntry. D applies them and catches up.

**Guarantee**: no committed entry is lost. The new leader's log contains all committed entries. The system continues to make progress as long as a quorum (3 of 5) is alive.

</details>
