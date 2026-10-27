# Message Passing

Message passing coordinates processes (or threads) that communicate exclusively through messages, with no shared state. It is relevant when the units of work are independent, when isolation is required (fault containment), or when the program spans multiple machines.

> **Authoritative sources**
> - [Communicating Sequential Processes (Hoare, 1985)](https://www.cs.ox.ac.uk/ucs/hoarebook.pdf)
> - [Actors: A Model of Concurrent Computation in Distributed Systems (Agha, 1986)](https://dspace.mit.edu/entities/publication/0b4cb2ed-5ea9-4ca9-b98e-1f440c654f3d)
> - [MapReduce: Simplified Data Processing on Large Clusters (Dean & Ghemawat, 2004)](https://www.usenix.org/legacy/events/osdi04/tech/full_papers/dean/dean.pdf)

## CSP (channels)

Processes communicate exclusively through channels. No shared state. `P := send(ch, x); Q := receive(ch)`.

Used in Go (goroutines + channels) and Clojure (core.async).

<details><summary>Details</summary>

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

**CSP vs Actor**: in CSP, a channel is a shared object that both sender and receiver reference; the send and receive are synchronous (or buffered). In the actor model, a message is sent to an actor's address (mailbox); the sender does not block on delivery. CSP has a single communication primitive (channel); actors have a richer message-passing model (reply, supervision, forwarding).

**Formal semantics**: CSP is defined as an algebra of processes with four core operators:
- **Prefix** ($`a.P`): perform action *a*, then behave as *P*.
- **Choice** ($`P \sqcap Q`): behave as *P* or *Q* (nondeterministic).
- **Parallel** ($`P \parallel Q`): run *P* and *Q* concurrently, synchronizing on shared actions.
- **Hiding** ($`P \backslash H`): make actions in set *H* internal (unsynchronizable).

The full algebra (refinement, traces, failures-divergences) is in Hoare's 1985 book. The practical Go channel model is a restricted instance: channels are typed, and the only operators are send, receive, and close.

**Deadlock hazard**: with unbuffered channels, two goroutines can each block on a send to the other's channel, creating a circular wait. This is the classic deadlock pattern in CSP: the channel operation is the "resource," and the circular wait arises when P1 waits for P2 to receive while P2 waits for P1 to receive. The general Coffman conditions (mutual exclusion, hold-and-wait, no preemption, circular wait) apply here. See [Parallelism](./Parallelism.md) for the full treatment of deadlock conditions and prevention strategies.

<iframe src="./Message-Passing.simulation.html" title="Producer-consumer with buffered channel"></iframe>

</details>

## Actor model

Each actor has a mailbox (queue) and processes messages one at a time. Actors communicate by sending messages (no shared state). An actor can create child actors, and a parent can supervise (restart) a failed child.

Used in Erlang/OTP and Akka. Go channels can be used to implement actor-like patterns, but the Go runtime itself is CSP-based (goroutines + channels).

<details><summary>Details</summary>

The actor model provides **fault containment**: if one actor crashes, only its parent's supervision tree is affected. This is why Erlang/OTP is used in telecom systems (99.999% availability) and why Akka is popular for microservices.

**Supervision strategies**:
- **One-for-one**: restart only the failed child.
- **One-for-all**: restart all siblings when one fails.
- **Rest-for-one**: restart the failed child and all children created after it.

The **mailbox** is the actor's queue. Messages are processed sequentially, so the actor's internal state is never concurrent. This eliminates race conditions by construction.

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

## Delivery guarantees

Note: TCP already provides reliable, in-order byte-stream delivery at the transport layer (see [Networks](../Networks.md)). The at-most-once / at-least-once / exactly-once semantics discussed here are about the application-level message queue (Kafka, RabbitMQ, NATS), not the network.

Message-passing systems must specify how many times a message is delivered and in what order.

- **At-most-once**: the message may be lost, but never duplicated.
- **At-least-once**: the message is delivered at least once; duplicates are possible.
- **Exactly-once**: the message is delivered exactly once (achieved via at-least-once + idempotent consumers).

**Ordering**: a single channel or partition preserves the sender's order. Across multiple channels or partitions, global ordering is not guaranteed without additional coordination (see [Consensus and Consistency](../Robustness/Consensus-and-Consistency.md) for consistency models and delivery semantics in partitioned systems).

<details><summary>Details</summary>

In practice, most message queues (Kafka, RabbitMQ, NATS) provide at-least-once delivery by default. The consumer achieves effective exactly-once by being **idempotent**: processing the same event twice has the same effect as processing it once. This is the standard pattern in event-sourced and stream-processing systems.

For a full treatment of delivery guarantees, ordering, and their interaction with consistency, see [Consensus and Consistency](../Robustness/Consensus-and-Consistency.md).

</details>

## Serialization

When messages cross machine boundaries they must be serialized into a byte format (JSON, Protocol Buffers, MessagePack, etc.) before being sent over the network. This is a practical concern distinct from the in-process channel model, where values are passed by reference or copy within the same address space. See [Networks](../Networks.md) for the transport layer that carries these serialized bytes.

## Applications

Message passing underlies higher-level patterns such as MapReduce, event sourcing, and microservice communication. These are application-level designs that use message passing as the distribution mechanism, not communication paradigms themselves.

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

**Without a buffer** (unbuffered channel): the producer blocks on every send until a consumer is ready. This is natural backpressure: the producer cannot outpace the consumers.

**With a buffer** (capacity 100): the producer can get 100 items ahead before blocking. This smooths out bursts but uses memory.

**Unbounded growth** is prevented by the channel's capacity. If you need truly unbounded buffering, use a queue with a size limit and a policy (drop oldest, drop newest, block producer).

The key insight: the channel *is* the synchronization. No locks, no shared state. The happens-before guarantee (send hb receive) ensures the consumer sees the item in the state the producer left it.

</details>

**Secondary question**: In an Erlang/OTP system, a supervisor manages 3 worker actors. Worker B crashes with a `badarg` exception. The supervision strategy is `one_for_one` with restart intensity (10 restarts in 5 seconds). What happens? What if Worker B crashes 11 times in 5 seconds?

<details><summary>Solution</summary>

**First crash**: The supervisor catches the `badarg` exception from Worker B. Because the strategy is `one_for_one`, only Worker B is restarted. Workers A and C continue running. The restart counter for Worker B increments to 1.

**11th crash in 5 seconds**: The restart intensity limit (10 in 5 s) is exceeded. The supervisor itself terminates (its own restart type is `temporary` by default, so it does not restart). The entire supervision tree shuts down: Workers A and C are also terminated. The parent of this supervisor is notified.

**Key insight**: The supervision tree is the fault-containment boundary. A single actor's failure is isolated to its subtree unless the restart intensity is exceeded, in which case the failure propagates upward. This is the "let it crash" philosophy: you do not try to prevent the crash; you design the supervision tree so that the blast radius is bounded.

</details>