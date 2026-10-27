# Asynchrony

Asynchrony handles many I/O operations on a single thread without blocking. It is relevant when a server must handle thousands of concurrent connections, or when a UI must remain responsive while waiting for network responses.

Asynchrony is a prerequisite for distributed systems: non-blocking I/O allows a single process to maintain thousands of network connections, handle timeouts and retries without stalling, and implement circuit breakers. Without it, every connection that waits for a remote node would pin an OS thread, making horizontal scaling impossible at the single-node level.

> **Authoritative sources**
> - [Node.js Event Loop (Node.js docs)](https://nodejs.org/en/learn/getting-started/how-nodejs-sees-the-world)
> - [The Definitive Guide to the Event Loop (Philipp Spiess)](https://dev.to/phillipspiess/the-definitive-guide-to-the-event-loop-3dif)
> - [Rust Async Book](https://rust-lang.github.io/async-book/)
> - [Tokio documentation](https://tokio.rs/)

## Event loop

A single thread multiplexes many I/O operations. It registers callbacks for events (socket readable, timer expired) and dispatches them in order. The kernel's `epoll` (Linux), `kqueue` (BSD/macOS), or IOCP (Windows) notifies the loop when a file descriptor is ready, avoiding busy-waiting.

Used in Node.js, Nginx (one event loop per worker process), Redis, and the browser's main thread.

<details><summary>Details</summary>

The event loop is a concurrency pattern, not a parallelism pattern: it achieves high throughput on a single core by never blocking. The key insight is that I/O is the bottleneck, not computation: a server spends most of its time waiting for network data, not processing it.

The loop phases (Node.js):
1. **Timers**: execute `setTimeout`/`setInterval` callbacks.
2. **Pending callbacks**: execute system-level callbacks (e.g., TCP errors).
3. **Idle, prepare**: internal use.
4. **Poll**: retrieve new I/O events; execute I/O callbacks.
5. **Check**: execute `setImmediate` callbacks.
6. **Close callbacks**: execute close handlers (e.g., `socket.on('close')`).

A blocking operation (synchronous file I/O, CPU-intensive computation) stalls the entire loop. This is why Node.js uses worker threads for CPU-bound work, and why [Parallelism](./Parallelism.md) (thread pools) complements asynchrony: the event loop handles I/O, and worker threads handle computation.

<iframe src="./Asynchrony.simulation.html" title="Event loop cycling through its phases with pending sockets, timers, and I/O callbacks"></iframe>

</details>

The event loop is the *scheduler* (runtime mechanism); async/await is the *programming model* (developer-facing syntax) that lets the developer express continuations without manual callback chaining.

## async/await

`async/await` is syntactic sugar for continuations. `await expr` suspends the current coroutine and resumes it when `expr` completes. The event loop drives the coroutines.

<details><summary>Details</summary>

`async/await` desugars into a state machine: each `await` is a suspension point. The compiler generates an enum (state machine) whose variants represent the states between suspension points. Resuming is a function call into the state machine. This is why `async` functions are cheap to create (no OS thread) but cannot be cancelled mid-instruction.

In Go, goroutines are the runtime's coroutines; see [Message Passing](./Message-Passing.md) for the channel model and [Parallelism](./Parallelism.md) for the M:N scheduler.

In Rust, `async fn` generates a `Future` (an enum-based state machine implementing the `Future` trait). The executor (tokio, or smol as a lightweight alternative) polls the future on the event loop.

</details>

## Limitations and pitfalls

Asynchrony trades thread isolation for a single-threaded execution model, introducing several practical difficulties.

<details><summary>Details</summary>

**Callback hell** (pre-async/await): chaining multiple asynchronous operations produces deeply nested callbacks that are hard to read and maintain.

```js
// Pre-async/await: three sequential I/O operations
fs.readFile('a.txt', (err, a) => {
  fs.readFile('b.txt', (err, b) => {
    fs.writeFile('out.txt', a + b, (err) => {
      // done
    });
  });
});
```

**Error-handling complexity**: in early JavaScript, `try/catch` cannot cross an `await` boundary inside a callback. Each callback must handle its own error, and a missed `err` check silently swallows the failure. `async/await` restores structured error handling, but only when the entire call chain is `async`.

**Fragmented stack traces**: because a coroutine is suspended and resumed across multiple event-loop iterations, the call stack at the point of an error does not include the frames from before the suspension. Debugging requires async-aware tooling (e.g., V8's `--async-stack-traces`).

**Head-of-line blocking**: if one I/O operation is slow (or a callback performs a long synchronous computation), the entire loop is stalled and every other pending connection waits. A single `fs.readFileSync` on a slow disk can freeze 10,000 connections. Mitigations: offload to worker threads, enforce timeouts, and use circuit breakers (see [Fault Tolerance](../Robustness/Fault-Tolerance.md)).

</details>

## Example problem

**Problem**: A Node.js server receives 10,000 concurrent HTTP requests, each requiring a 50 ms database query. Compare the thread-per-request model (one OS thread per connection) with the event-loop model (one thread, non-blocking I/O). What are the memory and throughput implications?

<details><summary>Solution</summary>

**Thread-per-request**:
- 10,000 threads × 8 MB stack (typical) = 80 GB of stack memory.
- Context switches: 10,000 threads on 8 cores → heavy scheduler overhead.
- Throughput limited by thread creation/switching cost.

**Event loop**:
- 1 thread, 10,000 file descriptors in `epoll`.
- Memory: 10,000 × (socket buffer + small state) ≈ a few hundred MB.
- Throughput: limited by I/O bandwidth, not by thread switching.
- The 50 ms DB query is non-blocking: the loop registers a callback and continues serving other requests.

<table>
<tr><th></th><th>Thread-per-request</th><th>Event loop</th></tr>
<tr><td>Memory</td><td>~80 GB (stacks)</td><td>~200 MB (fd state + buffers)</td></tr>
<tr><td>Context switches</td><td>~10,000 per scheduling round</td><td>0 (single thread)</td></tr>
<tr><td>Throughput ceiling</td><td>Thread creation / switch cost</td><td>I/O bandwidth</td></tr>
<tr><td>Failure mode</td><td>Thread exhaustion → OOM</td><td>One blocking call stalls all connections</td></tr>
</table>

The event loop wins by orders of magnitude in memory and context-switch cost. The trade-off: a single blocking call (e.g., synchronous file I/O) stalls all 10,000 connections.

</details>

