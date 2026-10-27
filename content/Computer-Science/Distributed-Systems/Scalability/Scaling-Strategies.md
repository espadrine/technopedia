# Scaling Strategies

Scaling strategies are the engineering actions—adding capacity (vertical) or adding machines (horizontal)—that increase a system's throughput, reduce its latency, or lower its cost per request. They are relevant whenever a system's load exceeds the capacity of its current configuration.

> **Authoritative sources**
> - [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/)

## Bottleneck analysis

**IO-bound vs. compute-bound**: an IO-bound workload spends most of its time waiting for I/O (disk, network). A compute-bound workload spends most of its time computing. The scaling strategy depends on which resource is the bottleneck.

<details><summary>Details</summary>

**Key takeaways of this section**:

1. **Measure before scaling**: profile a request's wall-clock time and find the phase with the largest fraction — that phase is the bottleneck, and only speeding it up increases throughput.
2. **IO-bound** → faster storage (NVMe), more bandwidth, or [Asynchrony](../Concurrency/Asynchrony.md) to multiplex I/O on one thread; caching reduces I/O altogether.
3. **Compute-bound** → more cores (vertical), more machines (horizontal), or a lower-complexity algorithm — the highest-leverage fix.
4. **Real workloads mix both**, and in a multitier architecture each tier has its own bottleneck, so each tier is scaled independently.

</details>

### Identifying the bottleneck

Measure the fraction of time the system spends in each phase (I/O wait, CPU, lock contention, network). The phase consuming the largest fraction is the bottleneck.

<details><summary>Details</summary>

Use profiling tools (perf, strace, APM tracing) to decompose a request's wall-clock time. If 80% of request time is spent waiting on a database query, the system is IO-bound on the database. If 80% is spent in a CPU-intensive computation (e.g., image encoding), it is compute-bound. The bottleneck is the single resource that, if made faster, would increase overall throughput.

</details>

Most real systems are a mix: a web request might be 60% I/O (database, cache) and 40% compute (serialization, business logic). The overall throughput is still limited by the most constrained resource, so identify it first — then scale I/O and CPU independently: e.g., add NVMe storage for the I/O portion while adding CPU cores for the compute portion. In a multitier architecture, different tiers may have different bottleneck types, so each tier is scaled independently (see the multitier diagram in the Horizontal scaling section below).

### IO-bound scaling

The bottleneck is the I/O device (disk, NIC). Adding CPU cores does not help.

<details><summary>Details</summary>

Solutions: faster storage (NVMe over SATA), more network bandwidth, or [Asynchrony](../Concurrency/Asynchrony.md) to multiplex many I/O operations on a single thread (event loop). A single event-loop thread can handle 100K concurrent connections because it is never blocked waiting for I/O. Caching (below) reduces I/O by serving repeated reads from memory.

</details>

### Compute-bound scaling

The bottleneck is CPU. Solutions: add more cores (vertical), distribute work across machines (horizontal), or reduce the algorithmic complexity.

<details><summary>Details</summary>

A $`O(n^2)` algorithm on 1M items takes 10,000× longer than on 10K items; an $`O(n \log n)` algorithm takes only ~150× longer. Reducing algorithmic complexity is the highest-leverage optimization for compute-bound workloads. See [Parallelism](../Concurrency/Parallelism.md) for how to partition compute-bound work across cores or machines.

</details>

## Vertical scaling

**Vertical scaling** (scale up): add more resources to a single machine (CPU, RAM, disk, network). Simple: no code changes. Limited by the maximum size of a single machine.

<details><summary>Details</summary>

**When to scale up**: the workload fits on one machine; the bottleneck is a single resource (e.g., CPU). A database with 100 GB of data and 10K QPS can run on a 64-core, 256 GB RAM machine.

**When to scale out**: the workload exceeds the maximum single-machine capacity; the bottleneck is distributed (e.g., network, disk I/O). A web server with 1M requests/second needs multiple machines.

</details>

<details><summary>Practical considerations: cost</summary>

Vertical scaling is linear in cost (a 2× machine costs 2×). The cost per request decreases with utilization: a half-loaded 64-core machine costs the same as a fully loaded one, so right-sizing (choosing the smallest instance that meets SLOs) directly reduces cost per request.

**Cloud pricing**: each additional instance is billed independently (per-second or per-hour). A 2× cluster costs exactly 2× in per-instance pricing. However, **spot/preemptible instances** (AWS Spot, GCP Preemptible) offer 60–90% discounts in exchange for possible interruption, making them suitable for stateless, horizontally-scaled workloads that can tolerate node loss.

**On-premises**: shared infrastructure (network switches, storage arrays, power, cooling) is amortized across nodes, so horizontal scaling can be sub-linear in cost. A 10-node cluster may cost less than 10× a single node because the switch and power budget are shared.

**Right-sizing**: monitor utilization and downscale when average utilization drops below ~40%. Over-provisioned instances waste budget without improving SLOs. Autoscaling (below) automates this.

</details>

## Horizontal scaling

**Horizontal scaling** (scale out): add more machines. The workload is distributed across multiple nodes. By [Amdahl's law](../Concurrency/Parallelism.md), the speedup from $`N` machines is bounded by $`1 / ((1 - P) + P / N)` where $`P` is the parallelizable fraction: any serial component (e.g., a single-writer database, a global lock) caps the achievable throughput regardless of how many machines you add.

<svg viewBox="0 0 760 270" xmlns="http://www.w3.org/2000/svg" style="max-width:760px;width:100%;background:#f8f9fb;border-radius:8px">
  <text x="190" y="24" text-anchor="middle" font-size="15" font-weight="bold" fill="#1a3c6e">Vertical scaling (scale up)</text>
  <rect x="90" y="90" width="100" height="80" rx="6" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="2"/>
  <text x="140" y="125" text-anchor="middle" font-size="12" fill="#1a3c6e">1 server</text>
  <text x="140" y="143" text-anchor="middle" font-size="11" fill="#444">4 cores · 16 GB</text>
  <line x1="205" y1="130" x2="255" y2="130" stroke="#4a7ab5" stroke-width="2" marker-end="url(#arr)"/>
  <text x="230" y="120" text-anchor="middle" font-size="11" fill="#4a7ab5">bigger</text>
  <rect x="265" y="70" width="130" height="120" rx="6" fill="#a9c8ec" stroke="#2c5f9e" stroke-width="2"/>
  <text x="330" y="120" text-anchor="middle" font-size="12" fill="#12365e">1 bigger server</text>
  <text x="330" y="140" text-anchor="middle" font-size="11" fill="#333">64 cores · 256 GB</text>
  <text x="190" y="230" text-anchor="middle" font-size="11" fill="#666">No code changes; capped by the largest machine you can buy.</text>
  <text x="570" y="24" text-anchor="middle" font-size="15" font-weight="bold" fill="#1a6e4a">Horizontal scaling (scale out)</text>
  <rect x="470" y="60" width="200" height="26" rx="6" fill="#cdeedd" stroke="#3d9a6c" stroke-width="2"/>
  <text x="570" y="78" text-anchor="middle" font-size="12" fill="#14532d">load balancer</text>
  <rect x="470" y="120" width="90" height="46" rx="6" fill="#cdeedd" stroke="#3d9a6c" stroke-width="2"/>
  <text x="515" y="140" text-anchor="middle" font-size="11" fill="#14532d">server 1</text>
  <text x="515" y="156" text-anchor="middle" font-size="10" fill="#444">4c · 16 GB</text>
  <rect x="580" y="120" width="90" height="46" rx="6" fill="#cdeedd" stroke="#3d9a6c" stroke-width="2"/>
  <text x="625" y="140" text-anchor="middle" font-size="11" fill="#14532d">server 2</text>
  <text x="625" y="156" text-anchor="middle" font-size="10" fill="#444">4c · 16 GB</text>
  <rect x="690" y="120" width="60" height="46" rx="6" fill="#eaf7f0" stroke="#3d9a6c" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="720" y="140" text-anchor="middle" font-size="11" fill="#14532d">+N</text>
  <text x="720" y="156" text-anchor="middle" font-size="10" fill="#444">more…</text>
  <line x1="515" y1="86" x2="515" y2="116" stroke="#3d9a6c" stroke-width="2" marker-end="url(#arr2)"/>
  <line x1="625" y1="86" x2="625" y2="116" stroke="#3d9a6c" stroke-width="2" marker-end="url(#arr2)"/>
  <line x1="700" y1="86" x2="715" y2="116" stroke="#3d9a6c" stroke-width="2" stroke-dasharray="4,3" marker-end="url(#arr2)"/>
  <text x="570" y="200" text-anchor="middle" font-size="11" fill="#666">Add identical machines; needs traffic + data distribution.</text>
  <text x="570" y="218" text-anchor="middle" font-size="11" fill="#666">Capped by Amdahl's law (serial fraction P).</text>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#4a7ab5"/></marker>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3d9a6c"/></marker>
  </defs>
</svg>

**Multitier architecture**: separate the application into tiers: load balancer → web servers → application servers → database. Each tier can be scaled independently. See [Networks](../Networks.md) for the protocols (HTTP, TCP, TLS) that connect these tiers.

<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style="max-width:760px;width:100%;background:#f8f9fb;border-radius:8px">
  <text x="380" y="22" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">Multitier architecture: each tier scales independently</text>
  <rect x="20" y="95" width="90" height="50" rx="6" fill="#e8e8f5" stroke="#7777bb" stroke-width="2"/>
  <text x="65" y="116" text-anchor="middle" font-size="12" fill="#333">clients</text>
  <text x="65" y="133" text-anchor="middle" font-size="10" fill="#666">browsers</text>
  <rect x="150" y="95" width="110" height="50" rx="6" fill="#cdeedd" stroke="#3d9a6c" stroke-width="2"/>
  <text x="205" y="116" text-anchor="middle" font-size="12" fill="#14532d">load balancer</text>
  <text x="205" y="133" text-anchor="middle" font-size="10" fill="#666">+ reverse proxy</text>
  <rect x="300" y="55" width="100" height="40" rx="6" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="2"/>
  <text x="350" y="80" text-anchor="middle" font-size="11" fill="#12365e">web × N</text>
  <rect x="300" y="145" width="100" height="40" rx="6" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="2"/>
  <text x="350" y="170" text-anchor="middle" font-size="11" fill="#12365e">web × N</text>
  <rect x="440" y="55" width="100" height="40" rx="6" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="2"/>
  <text x="490" y="80" text-anchor="middle" font-size="11" fill="#12365e">app × M</text>
  <rect x="440" y="145" width="100" height="40" rx="6" fill="#cfe0f5" stroke="#4a7ab5" stroke-width="2"/>
  <text x="490" y="170" text-anchor="middle" font-size="11" fill="#12365e">app × M</text>
  <rect x="590" y="95" width="150" height="50" rx="6" fill="#f5e0cf" stroke="#b57a4a" stroke-width="2"/>
  <text x="665" y="116" text-anchor="middle" font-size="12" fill="#5c3317">database</text>
  <text x="665" y="133" text-anchor="middle" font-size="10" fill="#666">often the serial bottleneck</text>
  <line x1="110" y1="120" x2="146" y2="120" stroke="#555" stroke-width="2" marker-end="url(#arr3)"/>
  <line x1="260" y1="112" x2="296" y2="80" stroke="#555" stroke-width="2" marker-end="url(#arr3)"/>
  <line x1="260" y1="128" x2="296" y2="160" stroke="#555" stroke-width="2" marker-end="url(#arr3)"/>
  <line x1="400" y1="75" x2="436" y2="75" stroke="#555" stroke-width="2" marker-end="url(#arr3)"/>
  <line x1="400" y1="165" x2="436" y2="165" stroke="#555" stroke-width="2" marker-end="url(#arr3)"/>
  <line x1="540" y1="85" x2="586" y2="112" stroke="#555" stroke-width="2" marker-end="url(#arr3)"/>
  <line x1="540" y1="155" x2="586" y2="128" stroke="#555" stroke-width="2" marker-end="url(#arr3)"/>
  <text x="380" y="222" text-anchor="middle" font-size="11" fill="#666">Stateless tiers (web, app) scale horizontally with ease; the stateful database tier needs sharding or replication to follow.</text>
  <defs>
    <marker id="arr3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#555"/></marker>
  </defs>
</svg>

<details><summary>Details</summary>

**Key takeaways of this section**:

1. **Amdahl's law caps scale-out**: the serial fraction $`1 - P` (single-writer database, global lock) bounds throughput no matter how many machines you add — find and remove serial components first.
2. **Multitier architecture** separates stateless tiers (web, app), which scale out trivially, from the stateful database tier, which needs sharding or replication.
3. **Traffic distribution** (load balancer, reverse proxy) spreads *requests* across machines.
4. **Data distribution** (caching, CDN, sharding) spreads *state* so the data tier does not become the new serial bottleneck.

</details>

### Traffic distribution

How incoming requests are spread across machines.

#### Load balancer

Distributes incoming requests across multiple backend servers to equalize load.

<details><summary>Details</summary>

**Round-robin**: cycle through servers in order. Simple but ignores current load.

**Least connections**: send to the server with the fewest active connections. Better for variable request durations.

**Consistent hashing**: hash the request key (e.g., user ID) to a position on a circular ring; each server owns the arc from its position to the next server's position. A key is routed to the server that owns its position. When a server is added or removed, only the keys in the affected arc (approximately $`1/N` of the total) need to be remapped. In practice, each physical server is represented by many **virtual nodes** (e.g., 100–200) on the ring to ensure even distribution despite the randomness of the hash. Without virtual nodes, a small number of servers can produce highly uneven arc sizes.

</details>

<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" style="max-width:720px;width:100%;background:#f8f9fb;border-radius:8px">
  <text x="360" y="22" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">Consistent hashing ring: a key goes to the first server clockwise</text>
  <circle cx="360" cy="175" r="100" fill="none" stroke="#999" stroke-width="2"/>
  <path d="M 360 75 A 100 100 0 0 1 460 175" fill="none" stroke="#4a7ab5" stroke-width="6" opacity="0.35"/>
  <text x="432" y="112" text-anchor="middle" font-size="11" fill="#2c5f9e">S2 owns this arc</text>
  <circle cx="360" cy="75" r="14" fill="#a9c8ec" stroke="#2c5f9e" stroke-width="2"/>
  <text x="360" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="#12365e">S1</text>
  <circle cx="460" cy="175" r="14" fill="#a9c8ec" stroke="#2c5f9e" stroke-width="2"/>
  <text x="492" y="172" text-anchor="middle" font-size="12" font-weight="bold" fill="#12365e">S2</text>
  <circle cx="360" cy="275" r="14" fill="#a9c8ec" stroke="#2c5f9e" stroke-width="2"/>
  <text x="360" y="303" text-anchor="middle" font-size="12" font-weight="bold" fill="#12365e">S3</text>
  <circle cx="260" cy="175" r="14" fill="#a9c8ec" stroke="#2c5f9e" stroke-width="2"/>
  <text x="228" y="172" text-anchor="middle" font-size="12" font-weight="bold" fill="#12365e">S4</text>
  <circle cx="459" cy="76" r="6" fill="#ffd54f" stroke="#b58a1a" stroke-width="1.5"/>
  <text x="472" y="66" text-anchor="start" font-size="11" fill="#7a5c00">k1</text>
  <line x1="462" y1="82" x2="466" y2="160" stroke="#b58a1a" stroke-width="1.5" marker-end="url(#arrk)"/>
  <circle cx="481" cy="245" r="6" fill="#ffd54f" stroke="#b58a1a" stroke-width="1.5"/>
  <text x="494" y="252" text-anchor="start" font-size="11" fill="#7a5c00">k2</text>
  <line x1="474" y1="250" x2="378" y2="272" stroke="#b58a1a" stroke-width="1.5" marker-end="url(#arrk)"/>
  <circle cx="261" cy="274" r="6" fill="#ffd54f" stroke="#b58a1a" stroke-width="1.5"/>
  <text x="240" y="290" text-anchor="end" font-size="11" fill="#7a5c00">k3</text>
  <line x1="256" y1="268" x2="262" y2="193" stroke="#b58a1a" stroke-width="1.5" marker-end="url(#arrk)"/>
  <circle cx="228" cy="102" r="6" fill="#ffd54f" stroke="#b58a1a" stroke-width="1.5"/>
  <text x="214" y="94" text-anchor="end" font-size="11" fill="#7a5c00">k4</text>
  <line x1="234" y1="106" x2="348" y2="78" stroke="#b58a1a" stroke-width="1.5" marker-end="url(#arrk)"/>
  <text x="360" y="180" text-anchor="middle" font-size="11" fill="#666">hash(key) → position</text>
  <text x="360" y="198" text-anchor="middle" font-size="11" fill="#666">on the ring</text>
  <text x="360" y="318" text-anchor="middle" font-size="11" fill="#666">Adding or removing a server only remaps the keys in one arc (~1/N of the keys).</text>
  <defs>
    <marker id="arrk" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#b58a1a"/></marker>
  </defs>
</svg>

#### Reverse proxy

A server that forwards requests to upstream servers, handling TLS termination, rate limiting, and routing.

<details><summary>Details</summary>

Common implementations: Nginx, HAProxy, Envoy. The reverse proxy sits at the edge of the service and can: terminate TLS (offloading CPU from app servers), apply rate limiting (see [Queueing and Latency](./Queueing-and-Latency.md) for backpressure mechanisms), route by path or header, and buffer slow clients. See [Networks](../Networks.md) for the underlying transport protocols.

</details>

### Data distribution

How state (data) is spread so the data tier does not become the serial bottleneck.

#### Caching

Store frequently accessed data in memory to reduce backend load and latency.

<details><summary>Details</summary>

**Cache-aside**: the application checks the cache; on a miss, it reads from the database and populates the cache. Simple, but a thundering herd (many simultaneous misses for the same key) can overwhelm the database.

**Write-through**: the application writes to the cache and the database simultaneously. The cache is always consistent but writes are slower.

**Write-behind (write-back)**: the application writes to the cache; the cache asynchronously flushes to the database. Fast writes, but data can be lost on cache failure.

Common in-memory caches: Redis, Memcached. A cache hit reduces a 10 ms database read to a 0.1 ms memory read, a 100× latency improvement for the cached portion.

</details>

#### CDN (Content Delivery Network)

A global network of edge servers that cache static content close to the user.

<details><summary>Details</summary>

Providers: Cloudflare, Akamai, Fastly. A CDN caches images, CSS, JS, and sometimes API responses at edge locations (PoPs) near the user. This reduces round-trip latency (a request from Sydney to a US origin is ~200 ms; to a Sydney PoP is ~5 ms) and reduces origin load. CDNs also provide DDoS mitigation and TLS termination at the edge.

</details>

#### Sharding

Partition the data across multiple database nodes so that each node handles a subset of the total load, enabling linear throughput growth with the number of shards.

<details><summary>Details</summary>

The **shard key** determines which node holds a given record. The goal is even load distribution: each shard should receive approximately $`1/N` of the total requests. Common shard keys: user ID (range or hash), geographic region, tenant ID.

**Range sharding**: assign contiguous key ranges to shards. Simple, but hot keys (e.g., a viral user) can overload one shard.

**Hash sharding**: hash the key and assign to shard $`h(key) \mod N`. Even distribution, but adding a shard requires rehashing all keys (mitigated by consistent hashing with virtual nodes).

**Database scaling before sharding**: the database is usually the first bottleneck that horizontal app-server scaling cannot resolve, because it is a shared serial resource (see Amdahl's law above). Before sharding, try the cheaper database-specific options: **read replicas** (replicate the database and split reads from writes — read/write splitting at the application or proxy layer — for read-heavy workloads), **connection pooling** (a small pool of database connections shared by all app servers, since each connection is expensive on the database side), and vertical scaling of the database node. See [Fault Tolerance](../Robustness/Fault-Tolerance.md) for replication, and [Consensus and Consistency](../Robustness/Consensus-and-Consistency.md) for how sharding interacts with consistency guarantees.

</details>

## Autoscaling

**Autoscaling** (reactive scaling): automatically add or remove instances based on observed metrics (CPU utilization, request queue depth, custom metrics), eliminating the need for manual capacity planning.

<details><summary>Details</summary>

**Kubernetes HPA** (Horizontal Pod Autoscaler): monitors a metric (CPU, memory, or a custom metric like requests/second) and adjusts the number of replicas to keep the metric at a target value. For example, target CPU at 60%: if average CPU across pods reaches 80%, HPA scales out; if it drops to 30%, HPA scales in.

**AWS Auto Scaling groups**: maintain a desired number of EC2 instances within a defined range. Scaling policies: **target tracking** (keep a metric at a target, analogous to HPA), **step scaling** (add N instances when the metric crosses a threshold), **predictive scaling** (use historical patterns to pre-scale before a known traffic spike).

**Scale-in / scale-out thresholds and cooldowns**: to prevent oscillation (scale out, then immediately scale in), a **cooldown period** (e.g., 300 s) is enforced after each scaling action. During the cooldown, no further scaling occurs. The scale-out threshold is typically set at 70–80% utilization (before saturation, per the queueing-theory argument in [Queueing and Latency](./Queueing-and-Latency.md)); the scale-in threshold is lower (e.g., 30%) to avoid flapping.

**Vertical autoscaling (Kubernetes VPA)**: adjusts the CPU/memory requests and limits of pods rather than the number of replicas. Useful when the workload is not easily parallelizable.

**Challenges**: cold-start latency (a new instance needs time to warm up: JIT compilation, cache population, connection pool establishment), cost (over-provisioning during scale-out), and the serial bottleneck (if the database is a single instance, scaling app servers beyond a point does not help—see Amdahl's law above).

</details>

## Simulation

<iframe src="./Scaling-Strategies.simulation.html" title="Queueing models: effect of horizontal scaling (number of servers N), independent M/M/1 vs shared-queue M/M/N"></iframe>

## Example problem

**Problem**: A web server handles 1000 requests/second with an average response time of 50 ms. You add a second identical server behind a round-robin load balancer. What is the new throughput and average response time (assuming the servers are independent)?

<details><summary>Solution</summary>

**Before**: 1 server, $`\lambda = 1000` req/s, $`W = 50` ms. By Little's law, $`L = \lambda W = 1000 \times 0.05 = 50` concurrent requests. For an M/M/1 model, the service rate is $`\mu = \lambda + 1/W = 1000 + 20 = 1020` req/s, giving utilization $`\rho = \lambda / \mu = 1000 / 1020 \approx 0.98`. The server is near saturation.

**After**: 2 servers, round-robin. Each server handles $`\lambda' = 500` req/s. If the response time is independent of load (no queueing, e.g., fixed I/O latency), each server still takes 50 ms. Maximum sustainable throughput doubles to 2000 req/s ($`2\mu = 2040` req/s); the completed throughput at the current arrival rate is still 1000 req/s, with each server handling 500 req/s. Average response time: $`\approx 51` ms (50 ms service + 1 ms load balancer overhead).

**With queueing**: model each server as M/M/1 with $`\mu = 1020` req/s. At $`\lambda' = 500`: $`\rho' = 500 / 1020 \approx 0.49`. Average time in system: $`W' = 1 / (\mu - \lambda') = 1 / 520 \approx 1.9` ms. The queueing delay drops dramatically from the original $`W = 1/(1020 - 1000) = 50` ms to $`\approx 1.9` ms.

**Limitation**: this model assumes each server is an independent M/M/1 with the same $`\mu = 1020`. In practice, the 50 ms response time is dominated by shared I/O (database, network), so the two servers contend on the same backend. The effective service rate per server is lower than 1020 because database connections, disk I/O, and network bandwidth are shared. To truly remove the shared bottleneck, the database must be sharded or replicated so that each app server has its own dedicated I/O path. See [Fault Tolerance](../Robustness/Fault-Tolerance.md) for how replication and sharding eliminate shared-resource contention.

</details>
