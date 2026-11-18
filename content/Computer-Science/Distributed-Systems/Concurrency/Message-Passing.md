# Message Passing

Message passing coordinates processes (or threads) that communicate exclusively through messages, with no shared state. It is relevant when the units of work are independent, when isolation is required (fault containment), or when the program spans multiple machines.

> **Authoritative sources**
> - [Communicating Sequential Processes (Hoare, 1985)](https://www.cs.ox.ac.uk/ucs/hoarebook.pdf)
> - [Actors: A Model of Concurrent Computation in Distributed Systems (Agha, 1986)](https://dspace.mit.edu/entities/publication/0b4cb2ed-5ea9-4ca9-b98e-1f440c654f3d)
> - [MapReduce: Simplified Data Processing on Large Clusters (Dean & Ghemawat, 2004)](https://www.usenix.org/legacy/events/osdi04/tech/full_papers/dean/dean.pdf)

## CSP (channels)

Processes communicate exclusively through **channels**. No shared state. `P := send(ch, x); Q := receive(ch)`.

Used in Go (goroutines + channels) and Clojure (core.async).

<details><summary>EXPLANATION</summary>

A **channel** is a typed pipe. In Go:
- **Unbuffered**: send blocks until a receiver is ready (synchronous handoff).
- **Buffered** (`make(chan T, n)`): send blocks only when the buffer is full.

Channel operations are the synchronization points: a send happens-before the corresponding receive. This gives you the happens-before guarantee without explicit locks (see [Parallelism](./Parallelism.md) for the memory model).

<svg width="420" height="130" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="40" width="90" height="50" rx="4" fill="#00c853" stroke="#fff" stroke-width="1"/>
  <text x="55" y="70" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">Sender</text>
  <line x1="100" y1="65" x2="148" y2="65" stroke="#888" stroke-width="2"/>
  <polygon points="155,65 145,60 145,70" fill="#888"/>
  <rect x="155" y="35" width="120" height="60" rx="4" fill="none" stroke="#64ffda" stroke-width="2"/>
  <text x="215" y="53" text-anchor="middle" fill="#64ffda" font-size="11" font-family="monospace">buffer (n)</text>
  <rect x="163" y="60" width="24" height="24" fill="#ffd54f" opacity="0.8"/>
  <rect x="191" y="60" width="24" height="24" fill="#ffd54f" opacity="0.8"/>
  <rect x="219" y="60" width="24" height="24" fill="none" stroke="#555" stroke-width="1"/>
  <rect x="247" y="60" width="24" height="24" fill="none" stroke="#555" stroke-width="1"/>
  <line x1="275" y1="65" x2="318" y2="65" stroke="#888" stroke-width="2"/>
  <polygon points="325,65 315,60 315,70" fill="#888"/>
  <rect x="325" y="40" width="90" height="50" rx="4" fill="#448aff" stroke="#fff" stroke-width="1"/>
  <text x="370" y="70" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">Receiver</text>
  <circle cx="125" cy="65" r="8" fill="#ff5252"/>
  <text x="125" y="115" text-anchor="middle" fill="#ff5252" font-size="10" font-family="monospace">blocks if full</text>
  <circle cx="298" cy="65" r="8" fill="#ff5252"/>
  <text x="298" y="115" text-anchor="middle" fill="#ff5252" font-size="10" font-family="monospace">blocks if empty</text>
</svg>

**CSP vs Actor**: in CSP, a channel is a shared object that both sender and receiver reference; the send and receive are synchronous (or buffered). In the actor model, a message is sent to an actor's address (mailbox); the sender does not block on delivery.

**Formal semantics**: CSP is an algebra of processes with four core operators:
- **Prefix** ($`a.P`): perform action *a*, then behave as *P*.
- **Choice** ($`P \sqcap Q`): behave as *P* or *Q* (nondeterministic).
- **Parallel** ($`P \parallel Q`): run *P* and *Q* concurrently, synchronizing on shared actions.
- **Hiding** ($`P \backslash H`): make actions in set *H* internal.

**Deadlock hazard**: with unbuffered channels, two goroutines can each block on a send to the other's channel — the circular-wait pattern of the dining philosophers. See [Parallelism](./Parallelism.md) for the Coffman conditions and prevention strategies (resource ordering, timeout).

<iframe src="./Message-Passing.simulation.html" title="Producer-consumer with buffered channel"></iframe>

</details>

## Actor model

Each **actor** has a **mailbox** (queue) and processes messages one at a time. Actors communicate by sending messages (no shared state). An actor can create child actors, and a parent can supervise (restart) a failed child.

Used in Erlang/OTP and Akka.

<details><summary>EXPLANATION</summary>

The actor model provides **fault containment**: if one actor crashes, only its parent's supervision tree is affected. This is why Erlang/OTP is used in telecom systems (99.999% availability) and Akka in microservices.

**Supervision strategies**: **one-for-one** (restart only the failed child), **one-for-all** (restart all siblings), **rest-for-one** (restart the failed child and all created after it).

The **mailbox** is the actor's queue. Messages are processed sequentially, so the actor's internal state is never concurrent — race conditions are eliminated by construction.

<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="150" y="10" width="100" height="40" rx="4" fill="#448aff" stroke="#fff" stroke-width="1"/>
  <text x="200" y="35" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">Supervisor</text>
  <line x1="170" y1="50" x2="80" y2="100" stroke="#888" stroke-width="1.5"/>
  <line x1="200" y1="50" x2="200" y2="100" stroke="#888" stroke-width="1.5"/>
  <line x1="230" y1="50" x2="320" y2="100" stroke="#888" stroke-width="1.5"/>
  <rect x="30" y="100" width="100" height="40" rx="4" fill="#00c853" stroke="#fff" stroke-width="1"/>
  <text x="80" y="125" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">Worker A</text>
  <rect x="150" y="100" width="100" height="40" rx="4" fill="#ff5252" stroke="#fff" stroke-width="1"/>
  <text x="200" y="125" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">Worker B ✗</text>
  <rect x="270" y="100" width="100" height="40" rx="4" fill="#00c853" stroke="#fff" stroke-width="1"/>
  <text x="320" y="125" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">Worker C</text>
  <rect x="20" y="90" width="360" height="60" rx="6" fill="none" stroke="#ffd54f" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="200" y="170" text-anchor="middle" fill="#ffd54f" font-size="11" font-family="monospace">fault-containment boundary (one_for_one: only B restarts)</text>
</svg>

</details>

## Message queues

A **message queue** (Kafka, RabbitMQ, NATS, SQS) is a broker between producers and consumers: producers publish messages to a **topic**, the broker stores them, and consumers pull them — often in **consumer groups**, where each message goes to one member of the group. Queues decouple the two sides in time (the producer does not wait for the consumer) and in space (they never share memory).

Note: TCP already provides reliable, in-order byte-stream delivery at the transport layer (see [Networks](../Networks.md)). The delivery semantics below are about the application-level queue, not the network.

- **At-most-once**: the message may be lost, but never duplicated.
- **At-least-once**: the message is delivered at least once; duplicates are possible. Most queues (Kafka, RabbitMQ, NATS) default to this.
- **Exactly-once**: effectively achieved via at-least-once + an **idempotent** consumer (processing the same event twice has the same effect as once). True exactly-once delivery is impossible in an asynchronous network — see [Consistency](../Robustness/Consistency.md).

**Ordering**: a single queue or partition preserves the producer's order. Across partitions, global ordering is not guaranteed without additional coordination.

### Kafka's design: topics, partitions, consumer groups, committed offsets

**Kafka** organizes messages into **topics**; each topic is an append-only **event log** split into **partitions** (for parallelism). A producer appends a record with a **key**; the key is hashed to a partition, so all records with the same key (e.g. a user ID) land in the same partition, in order. Consumers join a **consumer group**: the group assigns each partition to exactly one consumer (rebalanced when members join or leave), and each consumer tracks its progress by **committing its offset** per partition — the offset is stored consumer-side (in Kafka, in the internal `__consumer_offsets` topic), so a restarted or rebalanced consumer resumes exactly where it left off.

<svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kafka design: a producer appends to a topic split into three partitions, each an append-only log of records with offsets; a consumer group assigns partition 0 and 1 to consumer A and partition 2 to consumer B; the committed offset marks how far each consumer has read." style="max-width:760px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="kf-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#555"/></marker>
  </defs>
  <text x="380" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Kafka: topic = append-only log split into partitions; consumer group + committed offsets</text>
  <rect x="20" y="44" width="110" height="36" rx="5" fill="#fdf3e7" stroke="#b57a4a" stroke-width="1.5"/>
  <text x="75" y="66" text-anchor="middle" font-size="11" fill="#7a4a12">producer</text>
  <text x="75" y="98" text-anchor="middle" font-size="8.5" fill="#7a4a12">key → hash → partition</text>
  <line x1="130" y1="62" x2="166" y2="62" stroke="#555" stroke-width="2" marker-end="url(#kf-arr)"/>
  <rect x="170" y="36" width="570" height="120" rx="8" fill="#f3eefb" stroke="#7777bb" stroke-width="2"/>
  <text x="182" y="54" font-size="11" font-weight="bold" fill="#4a3a8c">topic: orders</text>
  <g font-size="8" text-anchor="middle">
    <rect x="182" y="64" width="420" height="22" rx="3" fill="#ffffff" stroke="#9a8fd0"/>
    <text x="192" y="79" text-anchor="start" fill="#4a3a8c" font-size="8.5">p0</text>
    <g fill="#e8e8f5" stroke="#7777bb" stroke-width="1">
      <rect x="210" y="67" width="38" height="16"/><rect x="248" y="67" width="38" height="16"/><rect x="286" y="67" width="38" height="16"/><rect x="324" y="67" width="38" height="16"/><rect x="362" y="67" width="38" height="16"/><rect x="400" y="67" width="38" height="16"/><rect x="438" y="67" width="38" height="16"/><rect x="476" y="67" width="38" height="16"/>
    </g>
    <text x="229" y="78" fill="#4a3a8c">0</text><text x="267" y="78" fill="#4a3a8c">1</text><text x="305" y="78" fill="#4a3a8c">2</text><text x="343" y="78" fill="#4a3a8c">3</text><text x="381" y="78" fill="#4a3a8c">4</text><text x="419" y="78" fill="#4a3a8c">5</text><text x="457" y="78" fill="#4a3a8c">6</text><text x="495" y="78" fill="#4a3a8c">7</text>
    <text x="520" y="79" fill="#666">…</text>
    <rect x="182" y="92" width="420" height="22" rx="3" fill="#ffffff" stroke="#9a8fd0"/>
    <text x="192" y="107" text-anchor="start" fill="#4a3a8c" font-size="8.5">p1</text>
    <g fill="#e8e8f5" stroke="#7777bb" stroke-width="1">
      <rect x="210" y="95" width="38" height="16"/><rect x="248" y="95" width="38" height="16"/><rect x="286" y="95" width="38" height="16"/><rect x="324" y="95" width="38" height="16"/>
    </g>
    <text x="229" y="106" fill="#4a3a8c">0</text><text x="267" y="106" fill="#4a3a8c">1</text><text x="305" y="106" fill="#4a3a8c">2</text><text x="343" y="106" fill="#4a3a8c">3</text>
    <text x="370" y="107" fill="#666">…</text>
    <rect x="182" y="120" width="420" height="22" rx="3" fill="#ffffff" stroke="#9a8fd0"/>
    <text x="192" y="135" text-anchor="start" fill="#4a3a8c" font-size="8.5">p2</text>
    <g fill="#e8e8f5" stroke="#7777bb" stroke-width="1">
      <rect x="210" y="123" width="38" height="16"/><rect x="248" y="123" width="38" height="16"/>
    </g>
    <text x="229" y="134" fill="#4a3a8c">0</text><text x="267" y="134" fill="#4a3a8c">1</text>
    <text x="292" y="135" fill="#666">…</text>
  </g>
  <line x1="400" y1="64" x2="400" y2="86" stroke="#e63946" stroke-width="2.5"/>
  <text x="406" y="62" font-size="8" fill="#e63946">committed offset</text>
  <g stroke="#555" stroke-width="1.5">
    <line x1="610" y1="75" x2="632" y2="75" marker-end="url(#kf-arr)"/>
    <line x1="610" y1="103" x2="632" y2="103" marker-end="url(#kf-arr)"/>
    <line x1="610" y1="131" x2="632" y2="131" marker-end="url(#kf-arr)"/>
  </g>
  <text x="640" y="79" font-size="8.5" fill="#555">append</text>
  <rect x="170" y="170" width="570" height="92" rx="8" fill="#eaf7ee" stroke="#3d8b57" stroke-width="2"/>
  <text x="182" y="188" font-size="11" font-weight="bold" fill="#1d5c38">consumer group: analytics</text>
  <line x1="300" y1="156" x2="272" y2="196" stroke="#3d8b57" stroke-width="1.5" marker-end="url(#kf-arr)"/>
  <line x1="450" y1="156" x2="472" y2="196" stroke="#3d8b57" stroke-width="1.5" marker-end="url(#kf-arr)"/>
  <rect x="182" y="198" width="180" height="52" rx="5" fill="#cdeedd" stroke="#3d9a6c" stroke-width="1.5"/>
  <text x="272" y="220" text-anchor="middle" font-size="10" font-weight="bold" fill="#14532d">consumer A</text>
  <text x="272" y="236" text-anchor="middle" font-size="9" fill="#14532d">partitions 0, 1</text>
  <rect x="382" y="198" width="180" height="52" rx="5" fill="#cdeedd" stroke="#3d9a6c" stroke-width="1.5"/>
  <text x="472" y="220" text-anchor="middle" font-size="10" font-weight="bold" fill="#14532d">consumer B</text>
  <text x="472" y="236" text-anchor="middle" font-size="9" fill="#14532d">partition 2</text>
  <text x="650" y="212" text-anchor="middle" font-size="9" fill="#1d5c38">each consumer commits</text>
  <text x="650" y="226" text-anchor="middle" font-size="9" fill="#1d5c38">its offset per partition</text>
  <text x="650" y="240" text-anchor="middle" font-size="9" fill="#1d5c38">(rebalance → reassign)</text>
  <text x="380" y="276" text-anchor="middle" font-size="9.5" fill="#666">N partitions → up to N consumers per group process in parallel; several groups each read the whole topic (fan-out). Ordering holds only within a partition.</text>
</svg>

<details><summary>EXPLANATION</summary>

**Why an append-only log.** Each partition is a sequential file on disk (plus the OS page cache): appends are cheap sequential writes, and consumers read sequentially too — Kafka moves data with zero-copy `sendfile`, so it sustains millions of messages/second. Records are kept for a retention period (by time or size), then deleted; **log compaction** keeps only the latest record per key (for changelog/state topics).

**Partitions give parallelism and ordering.** Producers write partitions in parallel; within a partition, order is total (records get increasing offsets). Across partitions there is no order — if you need per-key ordering, route by key (same key → same partition). A consumer group scales consumption up to the partition count: each partition is read by exactly one consumer of the group, so N partitions → N parallel consumers. Adding a second consumer group gives **fan-out**: every group independently reads the whole topic (one service for analytics, another for auditing, another for search indexing).

**Committed offsets give at-least-once + replay.** The consumer reads records, processes them, then commits the offset of the next record to read. If it crashes before committing, it re-reads from the last committed offset — duplicates are possible (at-least-once), which is why consumers must be idempotent (see above). Committing also means you can deliberately **replay** by resetting an offset: reprocess the whole log after a bug fix, or rebuild a read model (see [Event sourcing](#event-sourcing)).

**Rebalancing.** When a consumer joins or leaves a group, partitions are reassigned (a stop-the-world rebalance in older versions; incremental cooperative rebalancing in newer ones). A consumer that is too slow can be kicked out of the group (max.poll.interval exceeded).

**Why at-least-once is the practical default.** The producer sends a message and the broker acks; if the ack is lost, the producer retries — and the broker may now hold the message twice. No finite protocol can avoid this (it is the two-generals problem at the application layer), so systems accept at-least-once and make the consumer idempotent: e.g. include a unique event ID and deduplicate, or design the operation so applying it twice is harmless. This is where "exactly-once" really comes from — the consumer side, not the network. See [Consistency](../Robustness/Consistency.md) for the impossibility result and the idempotency discussion (tracking user intent at the root, and what it implies for message queues).

**Backpressure through the queue.** A bounded queue between a fast producer and a slow consumer is backpressure in structural form: when the queue is full, the producer blocks (or drops, per policy). See [Queueing and Latency](../Scalability/Queueing-Theory.md).

**Queue as buffer between tiers.** In a multitier architecture, a queue between the web tier and the worker tier absorbs load spikes: the web tier acks immediately, and workers drain the queue at their own pace.

</details>

## Events vs commands

A **command** is an imperative request — "do this" (`CreateOrder`) — sent to *one* handler that must execute it. An **event** is the notification of a fact that already happened — "this happened" (`OrderCreated`) — published so that *any number* of interested parties can react to it.

- Use the **command pattern** when you scale the entities that **produce the same data**: many producers put commands on a queue, and the workers form a competing-consumer group — each command is executed exactly once, by one worker (a single order-creation service, many callers).
- Use the **observer pattern** (publish/subscribe, fan-out) when you scale the entities that **need the same data**: one producer publishes an event, and every interested subscriber receives a copy — in Kafka, every consumer group reads the whole topic, so analytics, auditing, and search indexing can all react to `OrderCreated` independently.

Rule of thumb: **commands scale the writers** (point-to-point, one handler per command); **events scale the readers** (broadcast, one copy per subscriber). Naming convention: commands are imperative verbs, events are past-tense facts. Commands usually go to a single consumer group (or a dedicated queue); events go to a topic read by many groups.

<details><summary>EXPLANATION</summary>

**Why the distinction matters.** A command has exactly one intended recipient: sending it twice would double-apply it (charge the card twice), so it needs a single-owner queue and idempotency on the handler. An event is a fact: it happened once, and any number of observers may react — duplicating the *notification* to several subscribers is the point, not a bug; each subscriber deduplicates by event ID if it must not react twice.

**Mixing them.** A common architecture: services communicate with commands when one service owns a job (order placement), and publish events when many services care about the outcome (order placed → notify warehouse, billing, email). The event log of [Kafka](#message-queues) and [event sourcing](#event-sourcing) is what makes the fan-out side scalable and replayable.

</details>

## Map/reduce

**Map/reduce** (Dean & Ghemawat, 2004) is a data-parallel pattern (see [Parallelism](./Parallelism.md)) for processing large datasets across a cluster:

1. **Map**: each worker applies a function to its chunk of the input, emitting `(key, value)` pairs.
2. **Shuffle**: pairs are grouped by key and sent to the reducer responsible for that key.
3. **Reduce**: each reducer aggregates its key's values and emits the result.

<details><summary>EXPLANATION</summary>

**Word-count walkthrough.** Input: a corpus split into chunks. Map: for each word `w` in the chunk, emit `(w, 1)`. Shuffle: all pairs with the same word go to the same reducer. Reduce: sum the counts for each word. The map phase is embarrassingly parallel; the reduce phase combines results — the classic data-parallelism shape.

**Why it scales.** The framework (Hadoop, Spark) handles the boring parts: splitting input, scheduling map tasks on any free worker, re-executing failed tasks, and merging partial results. Because tasks are stateless and results are combined at the end, adding machines adds throughput nearly linearly — bounded only by the reduce/join step (Amdahl's law).

**Fault tolerance.** Workers crash; the framework simply re-runs their tasks on other machines. This works because map and reduce are pure functions of their input.

</details>

## Event sourcing

In **event sourcing**, the source of truth is an append-only log of **events** (facts that happened: `UserRegistered`, `ItemAddedToCart`, `PaymentCaptured`); the current state is derived by *replaying* the log (a fold over the events). Instead of storing "balance = 100", you store the deposits and withdrawals.

<details><summary>EXPLANATION</summary>

**Why it works.** The log is append-only, so writes are cheap (sequential I/O — the same trick as the write-ahead log in [Durability](../Robustness/Durability.md)). State is a projection: `balance = sum(events)`. You can rebuild any past state by replaying up to a point, derive new read models (projections) by folding the same log differently, and audit everything, because nothing is ever overwritten.

**Delivery matters.** Event-sourced systems rely on [message queues](#message-queues) with at-least-once delivery plus idempotent consumers: a replayed or duplicated event must not double-apply. Design events to be idempotent by nature (e.g. `PaymentCaptured(idempotency_key, amount)`), and keep the "user intent" at the root — the original command that caused the event — so retries are safe. See [Consistency](../Robustness/Consistency.md) for exactly-once impossibility and idempotency.

**Relation to ACID.** Event sourcing is not a replacement for [Consistency](../Robustness/Consistency.md): the log append can be atomic and durable, but the derived projections are eventually consistent unless you add coordination.

</details>

## Serialization

When messages cross machine boundaries they must be serialized into a byte format (JSON, Protocol Buffers, MessagePack) before being sent over the network. This is a practical concern distinct from the in-process channel model, where values are passed by reference or copy within the same address space. See [Networks](../Networks.md) for the transport layer that carries these serialized bytes.

## Quiz

**Problem**: Design a producer-consumer system where a producer generates 10,000 items and 4 consumers process them. Use Go channels. What happens if a consumer is slower than the producer? How do you prevent unbounded memory growth?

<details><summary>Solution</summary>

```go
func main() {
    ch := make(chan int, 100) // buffered channel, capacity 100
    var wg sync.WaitGroup

    // Producer
    go func() {
        for i := 0; i < 10000; i++ {
            ch <- i // blocks if buffer is full
        }
        close(ch)
    }()

    // 4 consumers
    for w := 0; w < 4; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for item := range ch {
                process(item)
            }
        }()
    }
    wg.Wait()
}
```

**Without a buffer** (unbuffered channel): the producer blocks on every send until a consumer is ready — natural backpressure: the producer cannot outpace the consumers.

**With a buffer** (capacity 100): the producer can get 100 items ahead before blocking. This smooths out bursts but uses memory.

**Unbounded growth** is prevented by the channel's capacity. If you need different semantics, use a queue with a size limit and a policy (drop oldest, drop newest, block producer).

The key insight: the channel *is* the synchronization. No locks, no shared state. The happens-before guarantee (send hb receive) ensures the consumer sees the item in the state the producer left it.

</details>

**Secondary question**: In an Erlang/OTP system, a supervisor manages 3 worker actors. Worker B crashes with a `badarg` exception. The supervision strategy is `one_for_one` with restart intensity (10 restarts in 5 seconds). What happens? What if Worker B crashes 11 times in 5 seconds?

<details><summary>Solution</summary>

**First crash**: the supervisor catches the `badarg` exception from Worker B. Because the strategy is `one_for_one`, only Worker B is restarted; Workers A and C continue running.

**11th crash in 5 seconds**: the restart intensity limit (10 in 5 s) is exceeded. The supervisor itself terminates, and the whole supervision subtree shuts down; the parent of this supervisor is notified.

**Key insight**: the supervision tree is the fault-containment boundary. A single actor's failure is isolated to its subtree unless the restart intensity is exceeded — the "let it crash" philosophy: do not try to prevent the crash; bound its blast radius.

</details>
