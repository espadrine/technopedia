# Transactions

A **transaction** is a logical unit of work that the database treats as all-or-nothing. Transactions guarantee that concurrent operations on shared data produce correct results, even in the presence of crashes. They are the foundation of data integrity in any multi-user system.

> **Authoritative sources**
> - [Database System Concepts, Ch. 13–19 (Silberschatz, Korth, Sudarshan)](https://www.db-book.com/)
> - [Database Systems: The Complete Book, Ch. 17–19 (Garcia-Molina, Ullman, Widom)](http://infolab.stanford.edu/~ullman/dscb.html)

## ACID properties

- **Atomicity**: a transaction's operations are all-or-nothing. Either all effects are visible, or none are.
- **Consistency**: the database moves from one valid state to another. This is ultimately an *application-level* property: the application defines what "consistent" means (business invariants, domain rules), and the database provides enforcement mechanisms (constraints, triggers, foreign keys) to reject transactions that would violate them.
- **Isolation**: concurrent transactions do not interfere; each sees a consistent snapshot.
- **Durability**: once committed, a transaction's effects survive crashes and power failures.

### Transaction lifecycle

A transaction passes through a sequence of states. The lifecycle determines *when* atomicity and durability kick in:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 200" width="720" height="200" style="max-width:100%;font-family:sans-serif;">
  <!-- Active -->
  <rect x="20" y="60" width="120" height="44" rx="8" fill="#4a90d9" stroke="#2c5f8a" stroke-width="2"/>
  <text x="80" y="87" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Active</text>
  <!-- Partially Committed -->
  <rect x="200" y="60" width="160" height="44" rx="8" fill="#f0ad4e" stroke="#c07d1a" stroke-width="2"/>
  <text x="280" y="87" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Partially Committed</text>
  <!-- Committed -->
  <rect x="420" y="60" width="120" height="44" rx="8" fill="#5cb85c" stroke="#3a7a3a" stroke-width="2"/>
  <text x="480" y="87" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Committed</text>
  <!-- Terminated -->
  <rect x="600" y="60" width="100" height="44" rx="8" fill="#888" stroke="#555" stroke-width="2"/>
  <text x="650" y="87" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Terminated</text>
  <!-- Failed -->
  <rect x="200" y="140" width="100" height="44" rx="8" fill="#d9534f" stroke="#a03030" stroke-width="2"/>
  <text x="250" y="167" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Failed</text>
  <!-- Aborted -->
  <rect x="380" y="140" width="100" height="44" rx="8" fill="#d9534f" stroke="#a03030" stroke-width="2"/>
  <text x="430" y="167" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Aborted</text>
  <!-- Arrows -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <line x1="140" y1="82" x2="196" y2="82" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="360" y1="82" x2="416" y2="82" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="540" y1="82" x2="596" y2="82" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- Active to Failed -->
  <line x1="80" y1="104" x2="80" y2="162" stroke="#333" stroke-width="2"/>
  <line x1="80" y1="162" x2="196" y2="162" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- Failed to Aborted -->
  <line x1="300" y1="162" x2="376" y2="162" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- Aborted to Terminated -->
  <line x1="480" y1="162" x2="620" y2="162" stroke="#333" stroke-width="2"/>
  <line x1="620" y1="162" x2="620" y2="108" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- Labels -->
  <text x="168" y="74" text-anchor="middle" fill="#555" font-size="11">commit</text>
  <text x="388" y="74" text-anchor="middle" fill="#555" font-size="11">WAL flush</text>
  <text x="568" y="74" text-anchor="middle" fill="#555" font-size="11">durable</text>
  <text x="130" y="135" text-anchor="middle" fill="#555" font-size="11">error</text>
  <text x="338" y="154" text-anchor="middle" fill="#555" font-size="11">rollback</text>
</svg>

- **Active**: the transaction is executing operations (reads, writes).
- **Partially Committed**: all operations have executed; the commit is in progress (WAL is being flushed to stable storage).
- **Committed**: the commit record is on stable storage; effects are visible to other transactions.
- **Failed**: an error was detected (constraint violation, system crash); the transaction cannot complete.
- **Aborted**: the transaction has been rolled back; all effects undone via the undo log.
- **Terminated**: the final state, reached after commit or after abort.

<details><summary>Details</summary>

**Atomicity mechanism**: the **undo log** (or rollback segment) records before-images of modified data. On abort, the undo log is applied in reverse to restore the pre-transaction state.

**Durability mechanism**: the **WAL** (Write-Ahead Log) records after-images *before* the data page is written to disk. On crash recovery, the WAL is replayed (redo) to re-apply committed changes, and the undo log is applied to roll back uncommitted changes.

**Consistency**: the application defines the invariants (e.g., "account balance ≥ 0", "exactly one doctor on call"). The database enforces them via schema constraints (foreign keys, CHECK, NOT NULL) and triggers. If a transaction would violate a constraint, the database rejects it — but the *definition* of consistency belongs to the application, not the database engine.

**Isolation**: the strongest guarantee. Implemented via locking or MVCC (see below). The SQL standard defines four levels (see next section).

</details>

## Isolation levels

The SQL standard defines four isolation levels, weakest to strongest:

- **Read Uncommitted**: dirty reads possible (reading another transaction's uncommitted data).
- **Read Committed**: no dirty reads; non-repeatable reads possible (re-reading a row may yield a different value).
- **Repeatable Read**: no non-repeatable reads; phantoms possible (a re-query may return new rows).
- **Serializable**: full isolation; no anomalies. Equivalent to some serial execution order.

<details><summary>Details</summary>

**Anomalies**:
- *Dirty read*: T1 reads a value that T2 wrote but has not yet committed. If T2 aborts, T1 read a value that never existed.
- *Non-repeatable read*: T1 reads a row, T2 updates and commits it, T1 re-reads and gets a different value.
- *Phantom read*: T1 executes a range query, T2 inserts a new row in that range and commits, T1 re-executes and sees the new row.
- *Lost update*: T1 and T2 both read the same row, both write, and one write is lost.

**PostgreSQL**: default is Read Committed. Serializable uses **SSI** (Serializable Snapshot Isolation), which detects conflicts at commit time and aborts the offending transaction.

**MySQL InnoDB**: default is Repeatable Read (stronger than the SQL standard default). Uses MVCC with next-key locking to prevent phantoms.

**Trade-off**: stronger isolation → more conflict detection → more aborts → lower throughput. In practice, Read Committed is the sweet spot for most OLTP workloads.

<details><summary>Example problem</summary>

T1 executes `SELECT balance FROM accounts WHERE id = 1` (reads 500), then T2 executes `UPDATE accounts SET balance = 600 WHERE id = 1` and commits. T1 then re-reads the same row.

At which isolation levels does T1 see 500 both times? At which does it see 500 then 600?

<details><summary>Solution</summary>

- **Read Uncommitted**: T1 may see 500 then 600 (or even T2's uncommitted 600 before T2 commits).
- **Read Committed**: T1 sees 500 then 600 (non-repeatable read). Each read takes a fresh snapshot.
- **Repeatable Read**: T1 sees 500 both times. The snapshot is fixed at the first read.
- **Serializable**: T1 sees 500 both times (same as Repeatable Read, plus no phantoms).

The key distinction: Read Committed takes a *new* snapshot per statement; Repeatable Read and Serializable take a *single* snapshot for the whole transaction.

</details>

</details>

## Concurrency control: the design space

Concurrency control sits on a spectrum between **pessimistic** (locking: assume conflicts are likely, block early) and **optimistic** (MVCC / SSI: assume conflicts are rare, detect them late). The choice depends on the workload's conflict rate: high-conflict workloads favour locking; low-conflict workloads favour MVCC.

## MVCC

**Multi-Version Concurrency Control** (MVCC): each write creates a new version of a row with a transaction ID (or timestamp). Readers see a consistent snapshot (all versions with ID ≤ their start time). Writers do not block readers.

- **Read path**: a reader sees the latest version with `txid ≤ reader_start_txid`.
- **Write path**: a writer creates a new version; the old version is marked dead (but not deleted until no active transaction can see it).
- **Cleanup**: VACUUM (PostgreSQL) or purge threads (InnoDB) remove dead versions.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 160" width="700" height="160" style="max-width:100%;font-family:sans-serif;">
  <!-- Version chain -->
  <rect x="30" y="40" width="140" height="50" rx="6" fill="#5cb85c" stroke="#3a7a3a" stroke-width="2"/>
  <text x="100" y="60" text-anchor="middle" fill="white" font-size="12" font-weight="bold">v1 (tx=1)</text>
  <text x="100" y="78" text-anchor="middle" fill="white" font-size="11">committed</text>

  <rect x="220" y="40" width="140" height="50" rx="6" fill="#5cb85c" stroke="#3a7a3a" stroke-width="2"/>
  <text x="290" y="60" text-anchor="middle" fill="white" font-size="12" font-weight="bold">v2 (tx=3)</text>
  <text x="290" y="78" text-anchor="middle" fill="white" font-size="11">committed</text>

  <rect x="410" y="40" width="140" height="50" rx="6" fill="#f0ad4e" stroke="#c07d1a" stroke-width="2"/>
  <text x="480" y="60" text-anchor="middle" fill="white" font-size="12" font-weight="bold">v3 (tx=5)</text>
  <text x="480" y="78" text-anchor="middle" fill="white" font-size="11">active</text>

  <!-- Arrows between versions -->
  <line x1="170" y1="65" x2="216" y2="65" stroke="#333" stroke-width="2" marker-end="url(#arrow2)"/>
  <line x1="360" y1="65" x2="406" y2="65" stroke="#333" stroke-width="2" marker-end="url(#arrow2)"/>

  <!-- Reader -->
  <rect x="220" y="120" width="140" height="36" rx="6" fill="#4a90d9" stroke="#2c5f8a" stroke-width="2"/>
  <text x="290" y="143" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Reader (tx=4)</text>
  <!-- Arrow from reader to v2 -->
  <line x1="290" y1="120" x2="290" y2="94" stroke="#4a90d9" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrow2)"/>
  <text x="310" y="112" fill="#4a90d9" font-size="11">sees v2</text>

  <!-- Arrow marker -->
  <defs>
    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>

  <!-- Label -->
  <text x="350" y="20" text-anchor="middle" fill="#555" font-size="12">Version chain for row "account B"</text>
</svg>

<details><summary>Details</summary>

**Why MVCC over locking?** Locking (two-phase locking) blocks readers when a writer holds an exclusive lock. MVCC eliminates read-write blocking: readers always see a consistent snapshot, writers always proceed. The cost is extra storage (multiple versions) and periodic cleanup.

**Snapshot isolation vs. serializability**: MVCC provides snapshot isolation (each transaction sees a consistent snapshot), but snapshot isolation is *not* equivalent to serializability. A **write skew** anomaly can occur: two transactions read different rows, both pass their checks, both write, and the combined result violates a constraint. SSI (PostgreSQL) or serializable isolation (Oracle) closes this gap.

**Write skew example (two doctors on call)**:

- Constraint: exactly one doctor must be on call at any time.
- T1 reads doctor A's status: "not on call". T1 writes: "A is on call".
- T2 reads doctor B's status: "not on call". T2 writes: "B is on call".
- Both transactions commit. Now *two* doctors are on call — the constraint is violated.
- Under serializable isolation, the database detects that T1 and T2 both read and wrote overlapping data (the "on call" invariant) and aborts one of them.

This anomaly is invisible to snapshot isolation because T1 and T2 read *different* rows (no read-write or write-write conflict on the same row), yet the combined effect is inconsistent.

**WAL integration**: in PostgreSQL, each transaction's changes are first written to the WAL (for durability), then applied to the data pages. The WAL also records the transaction's start and commit/abort, which MVCC uses to determine visibility.

**Distributed generalization**: in a distributed database, MVCC extends to multiple nodes. Linearizability (see [Consensus and Consistency](../../../Distributed-Systems/Robustness/Consensus-and-Consistency.md)) replaces the single-node snapshot guarantee.

</details>

## Locking

**Two-phase locking (2PL)**: a transaction acquires all locks before releasing any (growing phase → shrinking phase). This guarantees conflict serializability.

- **Shared lock (S)**: for reads. Multiple transactions may hold S on the same row.
- **Exclusive lock (X)**: for writes. Only one transaction may hold X; it conflicts with S.
- **Upgrade**: S → X requires first releasing S (to avoid deadlock).
- **Strict 2PL**: hold X locks until commit (prevents cascading aborts).

**Deadlock**: two or more transactions wait for each other's locks. Detected via the **wait-for graph** (a cycle means deadlock). Resolution: abort one transaction (the "victim") and let the other proceed. Alternatively, timeout-based detection.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200" style="max-width:100%;font-family:sans-serif;">
  <defs>
    <marker id="arrow3" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#d9534f"/>
    </marker>
  </defs>
  <!-- T1 node -->
  <circle cx="120" cy="100" r="40" fill="#4a90d9" stroke="#2c5f8a" stroke-width="2"/>
  <text x="120" y="105" text-anchor="middle" fill="white" font-size="16" font-weight="bold">T1</text>
  <!-- T2 node -->
  <circle cx="280" cy="100" r="40" fill="#f0ad4e" stroke="#c07d1a" stroke-width="2"/>
  <text x="280" y="105" text-anchor="middle" fill="white" font-size="16" font-weight="bold">T2</text>
  <!-- T1 waits for T2 (T1 holds X on A, wants X on B held by T2) -->
  <path d="M 155 75 Q 200 40 245 75" fill="none" stroke="#d9534f" stroke-width="2.5" marker-end="url(#arrow3)"/>
  <text x="200" y="45" text-anchor="middle" fill="#d9534f" font-size="11">T1 waits for T2 (lock on B)</text>
  <!-- T2 waits for T1 (T2 holds X on B, wants X on A held by T1) -->
  <path d="M 245 125 Q 200 160 155 125" fill="none" stroke="#d9534f" stroke-width="2.5" marker-end="url(#arrow3)"/>
  <text x="200" y="175" text-anchor="middle" fill="#d9534f" font-size="11">T2 waits for T1 (lock on A)</text>
  <!-- Cycle label -->
  <text x="200" y="105" text-anchor="middle" fill="#d9534f" font-size="13" font-weight="bold">DEADLOCK</text>
</svg>

<details><summary>Details</summary>

**Lock granularity**: row-level (fine-grained, high concurrency), page-level, table-level (coarse-grained, low overhead). Most databases use row-level locks for DML and table-level locks for DDL.

**Intent locks**: a table-level intent lock (IS, IX) signals that a transaction holds (or wants) row-level locks within the table. This allows the lock manager to quickly reject conflicting table-level requests without scanning all rows.

**Lock coupling vs. lock cranking**: in B-tree indexes, lock coupling (hold parent lock while acquiring child lock) is simpler; lock cranking (release parent before acquiring child) allows more concurrency but is more complex.

**Deadlock prevention**: ordering (always acquire locks in a global order) prevents deadlocks but reduces concurrency. In practice, detection + abort is preferred.

</details>

## Serializability

A schedule of concurrent transactions is **serializable** if it is equivalent to some serial (one-at-a-time) order.

- **Conflict serializability**: two operations *conflict* if they access the same data item and at least one is a write. The **conflict graph** has an edge from T1 to T2 if T1's operation conflicts with T2's later operation. The schedule is conflict-serializable iff the conflict graph is acyclic.
- **View serializability**: a weaker notion; the schedule is view-serializable if for every transaction, the reads and writes are indistinguishable from some serial order. All conflict-serializable schedules are view-serializable, but not vice versa.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width="500" height="200" style="max-width:100%;font-family:sans-serif;">
  <defs>
    <marker id="arrow4" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <!-- Title -->
  <text x="250" y="20" text-anchor="middle" fill="#555" font-size="12">Conflict graph (acyclic → serializable)</text>
  <!-- T1 node -->
  <circle cx="150" cy="100" r="40" fill="#4a90d9" stroke="#2c5f8a" stroke-width="2"/>
  <text x="150" y="105" text-anchor="middle" fill="white" font-size="16" font-weight="bold">T1</text>
  <!-- T2 node -->
  <circle cx="350" cy="100" r="40" fill="#f0ad4e" stroke="#c07d1a" stroke-width="2"/>
  <text x="350" y="105" text-anchor="middle" fill="white" font-size="16" font-weight="bold">T2</text>
  <!-- Edge T1 -> T2 -->
  <line x1="190" y1="85" x2="306" y2="85" stroke="#333" stroke-width="2" marker-end="url(#arrow4)"/>
  <text x="250" y="75" text-anchor="middle" fill="#333" font-size="11">W(A) before R(A)</text>
  <!-- Edge T1 -> T2 (second) -->
  <line x1="190" y1="115" x2="306" y2="115" stroke="#333" stroke-width="2" marker-end="url(#arrow4)"/>
  <text x="250" y="140" text-anchor="middle" fill="#333" font-size="11">R(B) before W(B)</text>
  <!-- Acyclic label -->
  <text x="250" y="180" text-anchor="middle" fill="#5cb85c" font-size="13" font-weight="bold">✓ Acyclic → equivalent to T1, T2</text>
</svg>

<details><summary>Details</summary>

**Testing serializability**: build the conflict graph. If it has a cycle, the schedule is not conflict-serializable. Example: T1 writes A, T2 writes A, T1 reads A → cycle T1→T2→T1 → not serializable.

**SSI (PostgreSQL)**: instead of preventing conflicts during execution, SSI lets transactions run under snapshot isolation and detects conflicts at commit time. If a conflict is detected, the transaction is aborted and retried. This is more efficient than pessimistic locking for workloads with low conflict rates.

**Distributed serializability**: in a multi-node system, serializability requires a global order of transactions. Achieved via consensus (Paxos, Raft) or timestamp ordering. See [Consensus and Consistency](../../../Distributed-Systems/Robustness/Consensus-and-Consistency.md).

<details><summary>Example problem</summary>

Consider the schedule:
- T1: W(A), R(B)
- T2: R(A), W(B)
- T1: W(B)
- T2: R(B)

Is this schedule conflict-serializable? Draw the conflict graph.

<details><summary>Solution</summary>

Conflicts (same data item, at least one write, in order):
- T1 W(A) before T2 R(A): edge T1→T2
- T1 R(B) before T2 W(B): edge T1→T2
- T1 W(B) before T2 R(B): edge T1→T2

All edges go T1→T2. The graph is acyclic. The schedule is conflict-serializable, equivalent to the serial order T1 then T2.

</details>

</details>

## WAL and recovery

The **Write-Ahead Log** (WAL) is a sequential log of all changes, written *before* the corresponding data page is modified on disk.

- **Write rule**: log record for a change must be on stable storage before the data page is written.
- **Recovery**: on crash, replay the WAL from the last checkpoint: redo committed transactions, undo uncommitted ones.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 320" width="420" height="320" style="max-width:100%;font-family:sans-serif;">
  <!-- Title -->
  <text x="210" y="20" text-anchor="middle" fill="#555" font-size="12">WAL record sequence</text>
  <!-- Records -->
  <rect x="60" y="35" width="300" height="30" rx="4" fill="#5cb85c" stroke="#3a7a3a" stroke-width="1.5"/>
  <text x="210" y="55" text-anchor="middle" fill="white" font-size="12">BEGIN T1</text>

  <rect x="60" y="72" width="300" height="30" rx="4" fill="#4a90d9" stroke="#2c5f8a" stroke-width="1.5"/>
  <text x="210" y="92" text-anchor="middle" fill="white" font-size="12">W(A, 100)  [after-image]</text>

  <rect x="60" y="109" width="300" height="30" rx="4" fill="#4a90d9" stroke="#2c5f8a" stroke-width="1.5"/>
  <text x="210" y="129" text-anchor="middle" fill="white" font-size="12">W(B, 200)  [after-image]</text>

  <rect x="60" y="146" width="300" height="30" rx="4" fill="#5cb85c" stroke="#3a7a3a" stroke-width="1.5"/>
  <text x="210" y="166" text-anchor="middle" fill="white" font-size="12">COMMIT T1</text>

  <rect x="60" y="183" width="300" height="30" rx="4" fill="#5cb85c" stroke="#3a7a3a" stroke-width="1.5"/>
  <text x="210" y="203" text-anchor="middle" fill="white" font-size="12">BEGIN T2</text>

  <rect x="60" y="220" width="300" height="30" rx="4" fill="#4a90d9" stroke="#2c5f8a" stroke-width="1.5"/>
  <text x="210" y="240" text-anchor="middle" fill="white" font-size="12">W(C, 300)  [after-image]</text>

  <!-- Crash marker -->
  <line x1="40" y1="265" x2="380" y2="265" stroke="#d9534f" stroke-width="3" stroke-dasharray="8,4"/>
  <text x="210" y="285" text-anchor="middle" fill="#d9534f" font-size="13" font-weight="bold">⚡ CRASH</text>

  <!-- Recovery annotation -->
  <text x="210" y="310" text-anchor="middle" fill="#555" font-size="11">Recovery: redo T1 (committed), undo T2 (uncommitted)</text>
</svg>

<details><summary>Details</summary>

**Checkpoint**: a periodic snapshot of the database state. The WAL before the checkpoint can be truncated. Recovery starts from the last checkpoint, not from the beginning of the WAL.

**Group commit**: multiple transactions' log records are batched into a single disk flush, amortizing the I/O cost. This is a major throughput optimization.

**WAL vs. binlog**: in MySQL, the **binlog** (binary log) is a logical log of SQL statements or row changes, used for replication. The **redo log** (InnoDB) is the physical WAL, used for crash recovery. They serve different purposes.

**Distributed replication**: in a distributed database, the WAL is replicated to other nodes (streaming replication, quorum writes). See [Fault Tolerance](../../../Distributed-Systems/Robustness/Fault-Tolerance.md) for the distributed replication of WAL.

</details>

## VACUUM and space management

**VACUUM** (PostgreSQL): removes dead tuples (versions no longer visible to any active transaction) to reclaim space. Runs in the background (autovacuum) or manually.

- **InnoDB**: purge threads perform the same function. Additionally, InnoDB can **defragment** pages (merge free space) and **shrink** files.
- **Table bloat**: if VACUUM falls behind, dead tuples accumulate and the table grows. This degrades scan performance (more pages to read) and index performance (more entries to traverse).

<details><summary>Details</summary>

**HOT (Heap-Only Tuple) updates**: if an update does not modify any indexed columns, PostgreSQL creates a new tuple in the same page and links it to the old one. The index is not updated, and VACUUM can compact the chain without touching the index.

**Fill factor**: a table or index can be created with a fill factor < 100%, leaving free space for future updates. This reduces page splits and index bloat at the cost of more pages.

**Distributed concerns**: in a sharded database, VACUUM runs independently on each shard. A long-running transaction on one shard can prevent VACUUM from cleaning up on that shard (the old version is still visible to that transaction).

</details>

## Interactive simulation

The simulation below shows two concurrent transactions interleaving on shared data items. Step through the schedule to see how lock acquisition/release (pessimistic) and MVCC version chains (optimistic) each handle the same workload.

<iframe src="./Transactions.simulation.html" title="Concurrent transactions: lock acquisition and MVCC version chains"></iframe>

## Example problem

**Problem**: Two transactions run concurrently on a bank database:
- T1: transfer $100 from account A to account B (read A, write A−100, write B+100, commit)
- T2: transfer $50 from account B to account C (read B, write B−50, write C+50, commit)

Under Read Committed isolation with MVCC, can a lost update occur? What about under Serializable?

<details><summary>Solution</summary>

**Read Committed + MVCC**:
- T1 reads B (sees version at T1's snapshot time).
- T2 reads B (sees version at T2's snapshot time).
- If T1 commits first, T2's write to B is based on a stale read. T2 overwrites T1's change → **lost update**.
- The lost update is caused by the *lack of serializability*: T2 read B before T1 committed, so T2's write does not account for T1's change. MVCC is the mechanism that *allows* this interleaving (by not blocking T2's read), but the anomaly itself is a consequence of the non-serializable schedule, not of MVCC per se.

**Serializable (SSI)**:
- T1 writes B. T2 also writes B. SSI detects the write-write conflict at commit time.
- T2 is aborted and retried. On retry, T2 reads the new version of B (including T1's $100 deposit) and writes B−50 correctly.
- No lost update.

**Lesson**: Read Committed is sufficient for most workloads, but for financial transactions where write-write conflicts on the same row are common, Serializable (or explicit row-level locking with `SELECT … FOR UPDATE`) is required.
</details>

