# Queueing and Latency

Queueing and latency models how load translates into response time, when a system saturates, and how to protect against overload. It is relevant whenever a system's throughput, latency, or tail-latency SLO must be predicted or guaranteed under variable demand.

> **Authoritative sources**
> - [Queueing Systems, Volume 1: Theory (Kleinrock, 1975) — author's book list, UCLA](https://www.lk.cs.ucla.edu/LK/B/Books.html)
> - [The Tail at Scale (Dean & Barroso, CACM 2013)](https://research.google/pubs/pub40801/)
> - [The Tail at Scale (Dean & Barroso, CACM 2013)](https://research.google/pubs/pub40801/)

## Queueing theory

A **queue** forms whenever work arrives faster than it is served, even temporarily. **Little's law**: $`L = \lambda W` where $`L` is the average number of items in the system, $`\lambda` is the arrival rate, and $`W` is the average time in the system.

**M/M/1 queue** (Poisson arrivals, exponential service times, 1 server): the utilization is $`\rho = \lambda / \mu`. The average time in the system is $`W = 1 / (\mu - \lambda)`. The average waiting time in the queue (excluding service) is $`W_q = \rho / (\mu - \lambda) = \lambda / (\mu(\mu - \lambda))`. As $`\rho \to 1`, both $`W` and $`W_q` diverge to $`\infty`.

<svg viewBox="0 0 660 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="M/M/1 queue: arrivals at rate lambda enter a FIFO queue, are served at rate mu, and depart. Total time W = queueing time Wq plus service time S.">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#334"/></marker>
  </defs>
  <text x="70" y="24" text-anchor="middle" font-size="13" fill="#334">arrivals</text>
  <text x="70" y="42" text-anchor="middle" font-size="13" fill="#334" font-style="italic">rate λ</text>
  <line x1="70" y1="55" x2="70" y2="95" stroke="#334" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="110" y1="55" x2="110" y2="95" stroke="#334" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="150" y1="55" x2="150" y2="95" stroke="#334" stroke-width="2" marker-end="url(#arr)"/>
  <rect x="185" y="55" width="150" height="50" rx="6" fill="#eef3fb" stroke="#4a6fa5" stroke-width="2"/>
  <text x="260" y="76" text-anchor="middle" font-size="14" fill="#1c3a5e" font-weight="bold">FIFO queue</text>
  <text x="260" y="95" text-anchor="middle" font-size="12" fill="#1c3a5e" font-style="italic">Lq waiting</text>
  <line x1="335" y1="80" x2="395" y2="80" stroke="#334" stroke-width="2" marker-end="url(#arr)"/>
  <rect x="400" y="55" width="130" height="50" rx="6" fill="#eaf7ee" stroke="#3d8b57" stroke-width="2"/>
  <text x="465" y="76" text-anchor="middle" font-size="14" fill="#1d5c38" font-weight="bold">server</text>
  <text x="465" y="95" text-anchor="middle" font-size="12" fill="#1d5c38" font-style="italic">rate μ</text>
  <line x1="530" y1="80" x2="600" y2="80" stroke="#334" stroke-width="2" marker-end="url(#arr)"/>
  <text x="622" y="85" text-anchor="middle" font-size="13" fill="#334">departures</text>
  <path d="M 185 130 L 185 122 L 465 122 L 465 130" fill="none" stroke="#888" stroke-width="1.5"/>
  <text x="325" y="150" text-anchor="middle" font-size="13" fill="#334">time in system  W = Wq (queueing) + S (service)</text>
</svg>

<details><summary>Details</summary>

**Little's law in practice**: if a server handles 1000 requests/second with an average response time of 10 ms, the average number of in-flight requests is $`L = 1000 \times 0.01 = 10`: the server only needs 10 concurrent request slots, no matter how fast individual requests are. Little's law is remarkably general — it holds for any stable queue, regardless of the arrival or service distributions, which is why it is the first tool to reach for when sizing connection pools, thread pools, or worker counts.

**Why you must scale before saturation**: as $`\rho \to 1`, $`W \to \infty`. This is the mathematical reason you must add capacity before utilization reaches a critical threshold, typically 70–80%. At $`\rho = 0.8`, $`W = 5 / \mu` (5× the service time); at $`\rho = 0.95`, $`W = 20 / \mu` (20× the service time). The growth is non-linear — the curve below shows $`W` (in units of service time) against $`\rho`:

<svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Average time in system W, in units of service time, versus utilization rho. The curve stays near 1 until rho is about 0.7, then diverges to infinity as rho approaches 1.">
  <line x1="40" y1="220" x2="470" y2="220" stroke="#334" stroke-width="1.5"/>
  <line x1="40" y1="220" x2="40" y2="20" stroke="#334" stroke-width="1.5"/>
  <text x="255" y="243" text-anchor="middle" font-size="13" fill="#334" font-style="italic">utilization ρ</text>
  <text x="14" y="125" text-anchor="middle" font-size="13" fill="#334" transform="rotate(-90 14 125)" font-style="italic">W (× service time)</text>
  <text x="34" y="225" text-anchor="end" font-size="11" fill="#334">1</text>
  <text x="34" y="125" text-anchor="end" font-size="11" fill="#334">11</text>
  <text x="34" y="25" text-anchor="end" font-size="11" fill="#334">21</text>
  <text x="40" y="236" text-anchor="middle" font-size="11" fill="#334">0</text>
  <text x="250" y="236" text-anchor="middle" font-size="11" fill="#334">0.5</text>
  <text x="460" y="236" text-anchor="middle" font-size="11" fill="#334">1</text>
  <line x1="40" y1="125" x2="470" y2="125" stroke="#dde" stroke-width="1"/>
  <line x1="40" y1="25" x2="470" y2="25" stroke="#dde" stroke-width="1"/>
  <polyline fill="none" stroke="#c0392b" stroke-width="2.5" points="40,220 50.4,219.7 60.9,219.4 71.3,219.2 81.8,218.8 92.2,218.5 102.7,218.2 113.1,217.8 123.6,217.4 134,217 144.5,216.5 154.9,216 165.4,215.5 175.8,215 186.2,214.4 196.7,213.7 207.1,213 217.6,212.3 228,211.5 238.5,210.6 248.9,209.6 259.4,208.5 269.8,207.3 280.3,205.9 290.7,204.4 301.2,202.7 311.6,200.7 322,198.5 332.5,195.9 342.9,192.8 353.4,189.1 363.8,184.6 374.3,179 384.7,171.8 395.2,162.3 405.6,149.2 416.1,129.9 426.5,98.5 437,38.7 447.4,20"/>
  <line x1="374.3" y1="179" x2="374.3" y2="220" stroke="#3d8b57" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="374" y="210" text-anchor="middle" font-size="11" fill="#3d8b57">ρ = 0.8 → 5×</text>
  <line x1="416.1" y1="129.9" x2="416.1" y2="220" stroke="#e67e22" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="410" y="160" text-anchor="middle" font-size="11" fill="#e67e22">ρ = 0.9 → 10×</text>
</svg>

Waiting until 95% utilization already means users experience 20× the baseline latency. When this happens, the fix is to add capacity — vertically, horizontally, or automatically. The concrete techniques (bottleneck analysis, vertical vs horizontal scaling, load balancers, caching, sharding, cost models, and autoscaling) are covered in [Scaling Strategies](./Scaling-Strategies.md).

**Where latency comes from**: the end-to-end response time a user sees is the sum of network transit time (propagation, transmission, and congestion delays in [Networks](../Networks.md)), queueing delay at each hop ($`W_q` above), and service time ($`S`). Queueing theory only models the last two; a 200 ms round trip across an ocean cannot be improved by adding servers, only by moving content closer (CDNs) or reducing round trips.

**When M/M/1 is a good model — and when it breaks**: M/M/1 assumes Poisson arrivals and exponential service times. It is a good first-order model for stateless request handling with roughly uniform service times, and it correctly captures the qualitative non-linear blow-up near saturation. It breaks down when arrivals are bursty (diurnal patterns, flash crowds — bursts see much worse latency than the average $`\lambda` suggests) or when service times are heavy-tailed (database queries, GC pauses — the mean $`1/\mu` then understates the tail). In those cases use M/G/1 (arbitrary service distribution, where the Pollaczek–Khinchine formula adds a variance term to $`W_q`), or measure and simulate, as the simulation below does.

**Mini-example**: a disk serves 80 I/O operations/second with a mean service time of 10 ms ($`\mu = 100`/s), and requests arrive at $`\lambda = 75`/s. Then $`\rho = 0.75` and $`W = 1/(100 - 75) = 40` ms: each operation spends on average 30 ms waiting and 10 ms being served. If the disk is upgraded to $`\mu = 125`/s, $`W = 1/50 = 20` ms — doubling the speed halved the latency, because $`\rho` dropped to 0.6.

<details><summary>Mini-problem</summary>

A web cache answers in 2 ms of service time ($`\mu = 500`/s) and receives 450 requests/second. (a) What is $`\rho`, $`W`, and $`L`? (b) A marketing campaign doubles the traffic. What happens?

<details><summary>Solution</summary>

(a) $`\rho = 450/500 = 0.9`. $`W = 1/(500 - 450) = 20` ms — ten times the service time, even though the server is only at 90% utilization. By Little's law, $`L = 450 \times 0.02 = 9` requests in the system.

(b) At $`\lambda = 900 > \mu = 500`, the queue grows without bound: the system is unstable. This is why capacity planning targets $`\rho \le 0.7`–$`0.8` rather than 1.0 — it leaves headroom for bursts and traffic growth.

</details></details>

</details>

## Tail latency

**Tail latency** (p99, p999) is the response-time threshold that 99% (resp. 99.9%) of requests beat. Averages hide the tail: a system with 99% of requests at 10 ms and 1% at 500 ms has an average of 14 ms but a p99 of 500 ms.

**Fan-out amplification**: when a request makes $`n` sequential sub-calls, the total latency is the sum of the sub-call latencies. By the union bound, the sum of the per-call $`(1 - \varepsilon/n)`-quantiles is an upper bound on the $`(1 - \varepsilon)`-quantile of the total. To bound the p99 of a request that makes 10 sequential calls, sum the per-call p99.9 values — not the per-call p99s, which only bound the p90 of the total. A system with 10 sequential calls at p99.9 = 15 ms each has a p99 of at most 150 ms.

<details><summary>Details</summary>

**Why averages hide the tail**: the mean is dominated by the bulk of requests. A single slow request (a GC pause, a disk seek, a network retransmission) inflates the p99 without visibly moving the mean. SLOs are therefore stated in percentiles — "99% of requests complete in under 200 ms" — because the mean says nothing about the worst user experience, and in a service with millions of users even the p99.999 describes thousands of real requests per day.

**The union-bound argument**: let $`X_1, \ldots, X_n` be the sub-call latencies. For any $`\varepsilon > 0`, by the union bound:

```math
P\!\left(\sum_{i=1}^{n} X_i > \sum_{i=1}^{n} x_i\right) \leq \sum_{i=1}^{n} P(X_i > x_i) \leq \sum_{i=1}^{n} \frac{\varepsilon}{n} = \varepsilon
```

where $`x_i` is the $`(1 - \varepsilon/n)`-quantile of $`X_i`. Hence $`\sum_i x_i` is an upper bound on the $`(1 - \varepsilon)`-quantile of the sum. The converse trap: summing per-call p99s (each with $`P(X_i > x_i) = 0.01`) gives only $`P(\text{total} > \sum x_i) \le 0.01n` — for $`n = 10` that bounds the p90 of the total, not the p99. Each extra "nine" of end-to-end guarantee pushes the required per-call quantile further out, which is why tail SLOs get expensive fast as fan-out grows.

**Tail latency and saturation**: tail latency is the primary reason to scale before the mean suggests trouble. In an M/M/1 queue the total time in system $`W` is exponentially distributed with rate $`\mu(1 - \rho)`, so $`P(W > t) = e^{-\mu(1-\rho)t}` and the p99 of the response time is:

```math
W_{99} = \frac{\ln 100}{\mu (1 - \rho)} \approx \frac{4.6}{\mu(1-\rho)}
```

At $`\rho = 0.95`, $`W_{99} \approx 92/\mu`: the p99 response time is about 92× the service time, while the mean is only 20×. The tail degrades roughly five times faster than the mean as the server saturates — percentiles are the sensitive overload detector.

**Mitigations**: hedging (send a duplicate request if the first is slower than the p95, and keep the faster reply — cheap when the tail is rare), prioritized scheduling of short requests, and per-request deadlines with early abandonment. These are described in "The Tail at Scale" (authoritative source above).

**Mini-example**: an API gateway calls 3 services in parallel and returns when all respond. Each service has p99 = 30 ms and p999 = 80 ms. The response time is the max of the three. By the union bound, $`P(\max_i X_i > 80) \le 3 \times 0.001 = 0.003`: the p99.7 of the gateway response is at most 80 ms. To guarantee a p99.9, each service would need p99.967 ≈ p99.97.

<details><summary>Mini-problem</summary>

A page load fires 20 parallel requests to independent backends, each with p99 = 100 ms. At least how many of the 20 requests can you expect to exceed 100 ms, and what does that do to the page load time?

<details><summary>Solution</summary>

By the union bound, $`P(\text{some request} > 100\text{ ms}) \le 20 \times 0.01 = 0.2`: up to 20% of page loads have at least one straggler. Since the page completes only when the slowest request does, roughly 1 in 5 page loads is gated by a >100 ms request even though every backend individually meets its p99. This is the fan-out amplification that motivates hedging and tail-tolerant design ("The Tail at Scale").

</details></details>

</details>

## Backpressure and rate limiting

**Backpressure** is the mechanism by which a downstream component signals an upstream one to slow down or stop sending work. **Rate limiting** caps the rate at which a system accepts new requests, protecting it from overload.

<svg viewBox="0 0 660 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Token bucket: tokens are added to a bucket at a constant rate r up to capacity b. Each arriving request consumes one token; a request that finds the bucket empty is rejected with HTTP 429.">
  <defs>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#334"/></marker>
  </defs>
  <text x="90" y="30" text-anchor="middle" font-size="13" fill="#334">tokens drip in</text>
  <text x="90" y="48" text-anchor="middle" font-size="13" fill="#334" font-style="italic">rate r</text>
  <line x1="90" y1="58" x2="90" y2="88" stroke="#3d8b57" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arr2)"/>
  <path d="M 40 150 A 50 50 0 0 1 140 150 Z" fill="#eaf7ee" stroke="#3d8b57" stroke-width="2"/>
  <circle cx="70" cy="135" r="5" fill="#3d8b57"/><circle cx="90" cy="128" r="5" fill="#3d8b57"/>
  <circle cx="110" cy="135" r="5" fill="#3d8b57"/><circle cx="85" cy="143" r="5" fill="#3d8b57"/>
  <text x="90" y="172" text-anchor="middle" font-size="12" fill="#1d5c38" font-style="italic">capacity b</text>
  <line x1="145" y1="120" x2="235" y2="120" stroke="#334" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="190" y="110" text-anchor="middle" font-size="12" fill="#334">1 token / request</text>
  <rect x="240" y="95" width="150" height="50" rx="6" fill="#eef3fb" stroke="#4a6fa5" stroke-width="2"/>
  <text x="315" y="116" text-anchor="middle" font-size="13" fill="#1c3a5e" font-weight="bold">requests in</text>
  <text x="315" y="134" text-anchor="middle" font-size="12" fill="#1c3a5e" font-style="italic">bursts up to b</text>
  <line x1="390" y1="110" x2="460" y2="110" stroke="#334" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="425" y="100" text-anchor="middle" font-size="12" fill="#3d8b57">accepted</text>
  <line x1="390" y1="132" x2="460" y2="132" stroke="#c0392b" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="428" y="152" text-anchor="middle" font-size="12" fill="#c0392b">429 + Retry-After</text>
  <text x="560" y="115" text-anchor="middle" font-size="12" fill="#334">long-term rate</text>
  <text x="560" y="133" text-anchor="middle" font-size="13" fill="#334" font-style="italic">≤ r</text>
</svg>

<details><summary>Details</summary>

**Token bucket**: a bucket holds at most $`b` tokens; tokens are added at a constant rate $`r` (e.g. 100 tokens/second). Each request consumes one token; a request that finds the bucket empty is rejected or queued. This allows short bursts of up to $`b` requests while enforcing the long-term rate $`r` — exactly the knob you need to keep $`\lambda` below the $`\mu` that queueing theory says you must not exceed.

**Leaky bucket**: requests enter a fixed-size buffer that drains at a constant rate; a request that arrives when the buffer is full is dropped. Unlike the token bucket, the output rate is constant regardless of the input pattern — useful when the downstream (a database, a third-party API) can only absorb a fixed rate. The cost is added latency: requests wait in the buffer, so the leaky bucket is itself a queue with $`W_q > 0`.

**Load shedding**: when the system is at capacity, it deliberately rejects low-priority work to protect high-priority work: drop analytics events before transactions, serve stale cached responses instead of hitting the database, or return HTTP 429 (Too Many Requests) with a `Retry-After` header. Well-behaved clients back off exponentially with jitter, avoiding the thundering-herd retry storm that would otherwise re-create the burst.

**Interaction with queueing**: backpressure is the practical implementation of the queueing-theory insight that $`W \to \infty` as $`\rho \to 1`. Rather than letting the queue grow without bound (degrading latency for everyone, including the requests you could have served), the system rejects the excess, keeping $`\rho` below the saturation threshold and latency low for accepted requests. A bounded queue plus rejection is strictly better than an unbounded queue under overload.

**Where it applies**: at the edge (reverse proxy, API gateway), between tiers (a fixed-size database connection pool is a leaky bucket), and inside a service (bounded worker-pool queues). At the network level, TCP congestion control is backpressure in its purest form — the receiver's window and dropped packets tell the sender to slow down (see [Networks](../Networks.md)).

<details><summary>Mini-problem</summary>

An API has a token bucket with $`r = 50` tokens/second and $`b = 200`. A client that has been idle sends a burst of 300 requests at once, then 60 requests/second forever. How many of the burst are accepted, and what happens to the steady stream?

<details><summary>Solution</summary>

The bucket holds $`b = 200` tokens, so 200 of the 300 burst requests are accepted instantly and 100 are rejected (429). Afterwards, tokens arrive at $`r = 50`/s but the client offers 60/s: only 50 requests/second pass in steady state, and 10 requests/second are rejected. The bucket converts an overload of 120% into a clean 100% with explicit rejection of the remainder — the client should back off or reduce its rate rather than retry all failures.

</details></details>

</details>

## From saturation to capacity

When measurement shows $`\rho` approaching the danger zone, the response is to add capacity. The decision tree — identify the bottleneck (IO-bound vs compute-bound), scale vertically or horizontally (load balancers, reverse proxies, caching, CDNs, sharding), automate with autoscaling (metric-driven scale-out with cooldowns, e.g. Kubernetes HPA or AWS Auto Scaling groups), and weigh the cost per request — is covered in [Scaling Strategies](./Scaling-Strategies.md). The simulation below shows the simplest such decision quantitatively: how response time $`W` falls as load is split across $`N` servers.

## Simulation

The simulation below is a discrete-event M/M/1 simulator. Arrivals are Poisson at rate $`\lambda`; each arrival is sent to one of $`N` servers chosen uniformly at random, so each server runs its own independent M/M/1 queue fed at rate $`\lambda/N` (splitting a Poisson stream keeps each sub-stream Poisson, which is what makes the per-server M/M/1 formulas exact). Adjust the sliders to see the measured average time in system track the theoretical $`W = 1/(\mu - \lambda/N)`, and watch it diverge as $`\rho = \lambda/(N\mu) \to 1` — then increase $`N` to see horizontal scaling pull the system back from saturation.

<iframe src="./Queueing-and-Latency.simulation.html" title="M/M/1 queue simulation: effect of arrival rate, service rate, and number of servers N on response time" style="width:100%;height:560px;border:1px solid #ccd;border-radius:6px;"></iframe>

## Example problem

**Problem**: A microservice makes 5 sequential calls to downstream dependencies. Each call has a p99 latency of 20 ms. What is the upper bound on the p99 of the total request? What if you want to bound the p99.9 instead?

<details><summary>Solution</summary>

**Bounding the p99**: to bound the p99 of the total ($`\varepsilon = 0.01`), each sub-call must be taken at its $`(1 - \varepsilon/n)`-quantile with $`n = 5`, i.e. the $`(1 - 0.002)`-quantile = p99.8. If each call has p99.8 = 25 ms, the p99 of the total is at most $`5 \times 25 = 125` ms.

If you only know the per-call p99s (20 ms each), their sum bounds the $`(1 - 0.01 \times 5)`-quantile = p95 of the total — not the p99, which could be significantly higher.

**Bounding the p99.9**: now $`\varepsilon = 0.001`, so each sub-call must be taken at its $`(1 - 0.001/5)`-quantile = p99.98. If each call has p99.98 = 40 ms, the p99.9 of the total is at most $`5 \times 40 = 200` ms.

**Key insight**: the tighter the end-to-end SLO (lower $`\varepsilon`), the further into each dependency's tail you must look. A composite service needs each dependency to meet a *stricter* per-call SLO than the overall target — and if a dependency cannot meet it, the remedies are architectural: reduce the fan-out, parallelize the calls (sum becomes max), add hedging, or put the dependency behind a cache so most requests never pay its tail at all.

</details>
