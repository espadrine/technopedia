# Throughput Scaling

Throughput scaling is the story of how to go from a few requests per second to a tremendous amount: each step adds capacity (machines, caching, partitioning) and removes the previous bottleneck. It is relevant whenever a system's load exceeds what its current configuration can serve.

> **Authoritative sources**
> - [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/)

## Bottleneck analysis

**IO-bound vs. compute-bound**: an IO-bound workload spends most of its time waiting for I/O (disk, network); a compute-bound workload spends most of its time computing. The scaling strategy depends on which resource is the bottleneck.

<details><summary>EXPLANATION</summary>

**Measure before scaling**: profile a request's wall-clock time (perf, strace, APM tracing) and find the phase with the largest fraction — that phase is the bottleneck, and only speeding it up increases throughput. If 80% of request time is a database query, the system is IO-bound on the database; if 80% is image encoding, it is compute-bound.

**IO-bound** → faster storage (NVMe), more bandwidth, caching, or [asynchrony](../Concurrency/Asynchrony.md) to multiplex I/O on one thread. **Compute-bound** → more cores, more machines, or a lower-complexity algorithm (an $`O(n^2)` algorithm on 1M items takes 10,000× longer than on 10K items; $`O(n \log n)` only ~150×). See [Parallelism](../Concurrency/Parallelism.md) for partitioning compute-bound work.

Real workloads mix both, and in a multitier architecture each tier has its own bottleneck, so each tier is scaled independently.

</details>

## Throughput scaling: from a few RPS to a tremendous amount

Remember the key identity from [Queueing Theory](./Queueing-Theory.md): **pending requests = throughput × latency**, thus throughput = (queued + in processing) ÷ (time in queue + time to process). So there are exactly two ways to scale throughput: **increase the parallelization** (more requests in processing at once) or **decrease the time to process** each request (faster compute or I/O). The diagram shows overlapping requests: horizontal is time, vertical is the number of pending requests, split into a queued part and an in-processing part. The system below has **2 cores**: the first two requests start processing the moment they arrive; each later request waits in the queue until the oldest in-flight request finishes, then takes that core (the dashed handoff lines).

<svg viewBox="0 0 720 285" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Six requests arrive at a fixed interval at a 2-core server. The first two enter processing immediately; requests 3 to 6 wait in the queue and start processing in arrival order when a core frees (dashed handoffs). At the marked instant, 3 requests are pending: 1 queued and 2 in processing." style="max-width:720px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="ts-ax" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#555"/></marker>
    <marker id="ts-ho" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#888"/></marker>
  </defs>
  <text x="360" y="22" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">Overlapping requests on 2 cores: pending = queued + in processing (Little's law: L = λW)</text>
  <line x1="50" y1="230" x2="50" y2="42" stroke="#555" stroke-width="1.5" marker-end="url(#ts-ax)"/>
  <text x="20" y="140" text-anchor="middle" font-size="11" fill="#555" transform="rotate(-90 20 140)">pending requests</text>
  <line x1="50" y1="230" x2="700" y2="230" stroke="#555" stroke-width="1.5" marker-end="url(#ts-ax)"/>
  <text x="682" y="250" text-anchor="middle" font-size="11" fill="#555">time</text>
  <g font-size="10" fill="#555" text-anchor="end">
    <text x="44" y="62">req 1</text><text x="44" y="90">req 2</text><text x="44" y="118">req 3</text><text x="44" y="146">req 4</text><text x="44" y="174">req 5</text><text x="44" y="202">req 6</text>
  </g>
  <g stroke-width="1.5">
    <rect x="90" y="50" width="180" height="16" fill="#cdeedd" stroke="#3d9a6c"/>
    <rect x="160" y="78" width="180" height="16" fill="#cfe0f5" stroke="#4a6fa5"/>
    <rect x="230" y="106" width="40" height="16" fill="#f5e0cf" stroke="#b57a4a"/><rect x="270" y="106" width="180" height="16" fill="#cdeedd" stroke="#3d9a6c"/>
    <rect x="300" y="134" width="40" height="16" fill="#f5e0cf" stroke="#b57a4a"/><rect x="340" y="134" width="180" height="16" fill="#cfe0f5" stroke="#4a6fa5"/>
    <rect x="370" y="162" width="80" height="16" fill="#f5e0cf" stroke="#b57a4a"/><rect x="450" y="162" width="180" height="16" fill="#cdeedd" stroke="#3d9a6c"/>
    <rect x="440" y="190" width="80" height="16" fill="#f5e0cf" stroke="#b57a4a"/><rect x="520" y="190" width="180" height="16" fill="#cfe0f5" stroke="#4a6fa5"/>
  </g>
  <g stroke="#888" stroke-width="1.5" stroke-dasharray="4 3">
    <line x1="270" y1="66" x2="270" y2="104" marker-end="url(#ts-ho)"/>
    <line x1="340" y1="94" x2="340" y2="132" marker-end="url(#ts-ho)"/>
    <line x1="450" y1="122" x2="450" y2="160" marker-end="url(#ts-ho)"/>
    <line x1="520" y1="150" x2="520" y2="188" marker-end="url(#ts-ho)"/>
  </g>
  <g stroke="#555" stroke-width="1.5"><line x1="90" y1="230" x2="90" y2="240"/><line x1="160" y1="230" x2="160" y2="240"/><line x1="230" y1="230" x2="230" y2="240"/><line x1="300" y1="230" x2="300" y2="240"/><line x1="370" y1="230" x2="370" y2="240"/><line x1="440" y1="230" x2="440" y2="240"/></g>
  <text x="265" y="258" text-anchor="middle" font-size="9.5" fill="#777">requests arrive at a fixed interval</text>
  <line x1="480" y1="40" x2="480" y2="230" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="488" y="50" font-size="9.5" fill="#c0392b">one instant</text>
  <text x="488" y="222" font-size="10" fill="#c0392b">here: 3 pending = 1 queued + 2 in processing</text>
  <rect x="50" y="268" width="12" height="12" fill="#f5e0cf" stroke="#b57a4a"/><text x="66" y="278" font-size="10" fill="#555">queued (waiting)</text>
  <rect x="210" y="268" width="12" height="12" fill="#cdeedd" stroke="#3d9a6c"/><text x="226" y="278" font-size="10" fill="#555">in processing, core 1</text>
  <rect x="390" y="268" width="12" height="12" fill="#cfe0f5" stroke="#4a6fa5"/><text x="406" y="278" font-size="10" fill="#555">in processing, core 2</text>
</svg>

The story below goes from a few requests per second to a tremendous amount, one step at a time; each step names its limitation and how the next step removes it.

### 1. Single server, database on disk (SQLite)

One machine runs the app and a file-backed database (e.g. SQLite) on local disk. Simple, no network hop between app and data — but capped by one machine's CPU, RAM, and disk.

<details><summary>EXPLANATION</summary>

This is where every system starts. SQLite stores the whole database in one file, so all queries serialize on that file — fine for a few RPS, fatal beyond. The limitation is structural: one disk, one CPU, one machine. The next step separates the database from the app so each can be scaled on its own.

</details>

### 2. Compute-bound: separate the database, N-tier architecture, horizontal scaling, load balancer

Move the database to its own machine, split the app into tiers (web → app → database), and put a **load balancer** in front of a pool of identical app servers.

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
  <text x="380" y="222" text-anchor="middle" font-size="11" fill="#666">Stateless tiers (web, app) scale horizontally with ease; the stateful database tier needs the later steps.</text>
  <defs>
    <marker id="arr3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#555"/></marker>
  </defs>
</svg>

<details><summary>EXPLANATION</summary>

**Load balancer algorithms**: **round-robin** cycles through servers (simple, ignores current load); **least connections** sends to the server with the fewest active connections (better for variable durations). The **reverse proxy** (Nginx, HAProxy, Envoy) at the edge also terminates TLS, applies rate limiting (see [backpressure](./Queueing-Theory.md)), routes by path, and buffers slow clients.

**Inside a cluster, Kubernetes does this with services and pods.** A **pod** is the smallest scheduled unit — one or more containers sharing a single network namespace — and gets an ephemeral **pod IP**; pods are created and destroyed freely, so their IPs are not stable. A **Deployment** keeps N replicas of a pod template running. A **Service** gives those replicas a stable identity: a DNS name (`myapp.default.svc.cluster.local`) and a stable virtual **ClusterIP** (service types: `ClusterIP` for internal traffic, `NodePort` to expose a port on each node, `LoadBalancer` to provision an external cloud LB). Request routing then works like this:

1. The client asks **CoreDNS** (the in-cluster DNS server) for the service name and receives the service's **ClusterIP**.
2. **kube-proxy** — which runs as a **DaemonSet, i.e. exactly one instance on every node** — watches the service's endpoints and programs **iptables** (or IPVS) rules on its node: any packet sent to `ClusterIP:port` is rewritten (DNAT) to the `podIP:targetPort` of one **randomly chosen ready pod** — readiness probes keep unready pods out of the endpoint set, so traffic only goes to healthy pods. The pod may be on any node; the rules are the same on all of them.
3. The packet is routed across the node network to that pod's IP and delivered to the container's port.

So the full chain is: **service name → (CoreDNS) → service ClusterIP → (kube-proxy on the sending node, iptables/IPVS, random pick among ready pods) → pod IP (possibly on another node) → container port**. The service *is* the in-cluster load balancer: scaling the Deployment adds pods to the endpoint set, and new traffic is spread across them automatically — no LB reconfiguration needed. See the [Kubernetes docs on Services](https://kubernetes.io/docs/concepts/services-networking/service/) and on [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns/).

<svg viewBox="0 0 780 365" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kubernetes routing example: a pod of service frontend on node 1 resolves service backend via CoreDNS to its ClusterIP, sends the packet there, kube-proxy on node 1 DNATs it to a random ready backend pod on node 2, and the reply returns directly to the pod IP." style="max-width:780px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="k8-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#4a6fa5"/></marker>
    <marker id="k8-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b57a4a"/></marker>
  </defs>
  <text x="390" y="18" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Kubernetes routing: a pod of service `frontend` queries service `backend`</text>
  <rect x="250" y="28" width="280" height="38" rx="8" fill="#eef3fb" stroke="#4a6fa5" stroke-width="2"/>
  <text x="390" y="44" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1c3a5e">Service `backend`</text>
  <text x="390" y="59" text-anchor="middle" font-size="8" fill="#444">ClusterIP 10.96.0.15 · DNS: backend.default.svc.cluster.local</text>
  <rect x="20" y="84" width="350" height="246" rx="10" fill="#ffffff" stroke="#7777bb" stroke-width="1.5"/>
  <text x="36" y="104" font-size="11" font-weight="bold" fill="#4a3a8c">Node 1</text>
  <rect x="35" y="114" width="320" height="36" rx="5" fill="#fdf3e7" stroke="#b57a4a" stroke-width="1.5"/>
  <text x="195" y="129" text-anchor="middle" font-size="9.5" fill="#7a4a12">kube-proxy (DaemonSet: one instance per node)</text>
  <text x="195" y="143" text-anchor="middle" font-size="8" fill="#7a4a12">iptables/IPVS: ClusterIP → random ready pod IP</text>
  <g font-size="9.5" text-anchor="middle">
    <rect x="35" y="164" width="155" height="54" rx="5" fill="#eaf7ee" stroke="#3d9a6c" stroke-width="1.5"/>
    <text x="112" y="183" font-weight="bold" fill="#14532d">pod frontend-abc</text>
    <text x="112" y="198" font-size="8.5" fill="#14532d">10.244.1.5:8080</text>
    <text x="112" y="212" font-size="8" fill="#666">(service frontend)</text>
    <rect x="200" y="164" width="155" height="54" rx="5" fill="#eaf7ee" stroke="#3d9a6c" stroke-width="1.5"/>
    <text x="277" y="183" font-weight="bold" fill="#14532d">pod frontend-def</text>
    <text x="277" y="198" font-size="8.5" fill="#14532d">10.244.1.6:8080</text>
    <text x="277" y="212" font-size="8" fill="#666">(service frontend)</text>
    <rect x="35" y="232" width="155" height="54" rx="5" fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5"/>
    <text x="112" y="251" font-weight="bold" fill="#4a3a8c">pod backend-x1</text>
    <text x="112" y="266" font-size="8.5" fill="#4a3a8c">10.244.1.9:8080</text>
    <text x="112" y="280" font-size="8" fill="#666">(service backend)</text>
  </g>
  <rect x="410" y="84" width="350" height="246" rx="10" fill="#ffffff" stroke="#7777bb" stroke-width="1.5"/>
  <text x="426" y="104" font-size="11" font-weight="bold" fill="#4a3a8c">Node 2</text>
  <rect x="425" y="114" width="320" height="36" rx="5" fill="#fdf3e7" stroke="#b57a4a" stroke-width="1.5"/>
  <text x="585" y="129" text-anchor="middle" font-size="9.5" fill="#7a4a12">kube-proxy (DaemonSet: one instance per node)</text>
  <text x="585" y="143" text-anchor="middle" font-size="8" fill="#7a4a12">iptables/IPVS: ClusterIP → random ready pod IP</text>
  <g font-size="9.5" text-anchor="middle">
    <rect x="425" y="164" width="155" height="54" rx="5" fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5"/>
    <text x="502" y="183" font-weight="bold" fill="#4a3a8c">pod backend-x2</text>
    <text x="502" y="198" font-size="8.5" fill="#4a3a8c">10.244.2.7:8080</text>
    <text x="502" y="212" font-size="8" fill="#666">(service backend)</text>
    <rect x="590" y="164" width="155" height="54" rx="5" fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5"/>
    <text x="667" y="183" font-weight="bold" fill="#4a3a8c">pod backend-x3</text>
    <text x="667" y="198" font-size="8.5" fill="#4a3a8c">10.244.2.8:8080</text>
    <text x="667" y="212" font-size="8" fill="#666">(service backend)</text>
  </g>
  <polyline points="35,191 12,191 12,47 246,47" fill="none" stroke="#4a6fa5" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#k8-a)"/>
  <circle cx="12" cy="120" r="9" fill="#4a6fa5"/><text x="12" y="124" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">1</text>
  <line x1="350" y1="66" x2="350" y2="110" stroke="#4a6fa5" stroke-width="2" marker-end="url(#k8-a)"/>
  <circle cx="350" cy="88" r="9" fill="#4a6fa5"/><text x="350" y="92" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">2</text>
  <line x1="355" y1="132" x2="498" y2="160" stroke="#b57a4a" stroke-width="2" marker-end="url(#k8-b)"/>
  <circle cx="428" cy="140" r="9" fill="#b57a4a"/><text x="428" y="144" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">3</text>
  <text x="390" y="348" text-anchor="middle" font-size="9" fill="#555">1. pod frontend-abc asks CoreDNS: backend.default.svc.cluster.local → 10.96.0.15   2. sends the packet to 10.96.0.15:80 (the ClusterIP)</text>
  <text x="390" y="362" text-anchor="middle" font-size="9" fill="#555">3. kube-proxy on node 1 DNATs it to a random ready backend pod — here 10.244.2.7:8080 on node 2   ·   the reply returns directly to the pod IP, no service involved</text>
</svg>

**Why the database becomes the bottleneck.** The app tiers are stateless, so adding more of them adds capacity — but every request still funnels into one database. By [Amdahl's law](../Concurrency/Parallelism.md), that single serial component caps throughput no matter how many app servers you add. The next steps attack the database from its two limited resources: **connections** (step 3) and **I/O** (step 4).

</details>

### 3. The database socket limit: connection pool, pgbouncer

Each app server opens a pool of database connections; a **connection pooler** (pgbouncer) in front of the database multiplexes many app connections onto few database connections.

<details><summary>EXPLANATION</summary>

A database connection is expensive on the server side (memory, a process or thread). With 100 app servers × 20 connections each, the database faces 2000 connections and chokes — not on queries, but on connection overhead. A pool caps that: each app server keeps a small local pool (e.g. 10 connections), and pgbouncer multiplexes thousands of client connections onto, say, 100 database connections. Limitation removed: the socket/connection ceiling. Next limitation: raw disk I/O for reads.

</details>

### 4. IO-bound, high read volume: indexes, read replicas, caching, CDN

Most workloads are read-heavy. Attack reads in layers: **indexes** in the database, **read replicas** to split reads from writes, an in-memory **cache**, and a **CDN** at the edge.

<details><summary>EXPLANATION</summary>

**Indexes** (B-trees, see [Key-Value Stores](../../Algorithmics/Search-and-Data-Structures/Key-Value-Stores.md)) turn full-table scans into O(log n) lookups — the single biggest read-latency win. **Read replicas** (see [Durability](../Robustness/Durability.md)) let the primary handle writes while replicas serve reads, multiplying read throughput.

**Caching** layers: **cache-aside** (app checks cache, on miss reads DB and populates — risk: thundering herd on a hot key), **write-through** (write to cache and DB together), **write-behind** (cache flushes to DB asynchronously — fast, but can lose data on cache failure). Redis/Memcached serve a 10 ms DB read as a 0.1 ms memory read. **CDN** (Cloudflare, Akamai, Fastly) caches static content and API responses at edge PoPs: a request from Sydney to a US origin (~200 ms) becomes Sydney to a Sydney PoP (~5 ms). See [HTTP caching](../Networks.md) for the protocol-level headers.

</details>

### 5. Hot index page in the cache: partitioning

Reads that use a **random-access index** (e.g. an index on a UUID `id`) touch pages scattered across the whole index. Each such page must be loaded from disk into the **page cache** (the database buffer pool in RAM), and each cache miss **evicts** some other page. If the evicted page is a **hot** one — a page holding a recently created row (e.g. `(id=2e7, created_at=T1)`) among older rows; since UUIDs are random, such pages are scattered across the huge index — then lookups of recent rows start missing too: the cache is thrashed by cold random pages. **Partitioning** fixes this — in PostgreSQL, declarative partitioning by `created_at` (e.g. monthly partitions): each partition gets its own, much smaller `id` index, and the current partition (the hot latest rows) is small enough to stay entirely in cache. The cost: the programmer must always add a `created_at` filter to queries, so that **partition pruning** skips the irrelevant partitions.

<details><summary>EXPLANATION</summary>

Caching helps only if the working set fits in memory — but the failure mode here is subtler: the *total* index is too big to cache, while the *hot subset* is small. In the **before** panel, the buffer pool is full of cold pages of the huge UUID `id` index (gray). The hot pages (green) are scattered: each holds one recent row — `(id=2e7, created_at=T1)`, `(id=e30, created_at=T2)`, `(id=933, created_at=T3)` — plus many older rows. Every random read by UUID loads a cold page in, and each miss evicts a page out — often a hot one — so lookups of recent rows keep missing.

<svg viewBox="0 0 780 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Before partitioning: a huge scattered UUID index on disk, and a buffer pool holding one page per hot key (2e7, e30, 933) plus cold pages, with misses evicting hot pages. After partitioning by created_at: small per-partition indexes on disk, and the buffer pool holding one page with all hot keys together." style="max-width:780px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="pg-in" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#9aa3b2"/></marker>
    <marker id="pg-out" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#c0392b"/></marker>
    <marker id="pg-up" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3d9a6c"/></marker>
    <marker id="pg-mid" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#555"/></marker>
  </defs>
  <text x="380" y="18" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Index on disk vs buffer pool in RAM</text>
  <!-- BEFORE panel -->
  <text x="197" y="36" text-anchor="middle" font-size="11" font-weight="bold" fill="#7a4a12">Before: one huge id (UUID) index</text>
  <rect x="20" y="44" width="355" height="112" rx="8" fill="#ffffff" stroke="#b57a4a" stroke-width="2"/>
  <text x="197" y="60" text-anchor="middle" font-size="10" font-weight="bold" fill="#7a4a12">buffer pool (RAM)</text>
  <g stroke="#9aa3b2" stroke-width="1.2" fill="#e3e6ee">
    <rect x="32" y="68" width="40" height="34"/><rect x="78" y="68" width="40" height="34"/><rect x="170" y="68" width="40" height="34"/><rect x="216" y="68" width="40" height="34"/><rect x="262" y="68" width="40" height="34"/>
    <rect x="32" y="106" width="40" height="34"/><rect x="78" y="106" width="40" height="34"/><rect x="124" y="106" width="40" height="34"/><rect x="170" y="106" width="40" height="34"/><rect x="216" y="106" width="40" height="34"/><rect x="262" y="106" width="40" height="34"/><rect x="308" y="106" width="40" height="34"/>
  </g>
  <g font-size="6.5" text-anchor="middle" fill="#14532d">
    <rect x="124" y="68" width="40" height="34" fill="#cdeedd" stroke="#3d9a6c" stroke-width="2"/><text x="144" y="88" font-size="6.5" fill="#14532d">2e7·T1</text>
    <rect x="308" y="68" width="40" height="34" fill="#cdeedd" stroke="#3d9a6c" stroke-width="2"/><text x="328" y="88">933·T3</text>
    <rect x="216" y="106" width="40" height="34" fill="#cdeedd" stroke="#3d9a6c" stroke-width="2"/><text x="236" y="126">e30·T2</text>
  </g>
  <line x1="60" y1="190" x2="60" y2="162" stroke="#9aa3b2" stroke-width="2" marker-end="url(#pg-in)"/>
  <text x="70" y="180" font-size="9" fill="#666">cache miss: cold UUID page loaded in</text>
  <line x1="300" y1="162" x2="300" y2="190" stroke="#c0392b" stroke-width="2" marker-end="url(#pg-out)"/>
  <text x="290" y="180" text-anchor="end" font-size="9" fill="#c0392b">evicts a page — often a hot one</text>
  <rect x="20" y="200" width="355" height="110" rx="8" fill="#f3f4f6" stroke="#9aa3b2" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="197" y="216" text-anchor="middle" font-size="10" fill="#555">id (UUID) index on disk — huge, pages scattered</text>
  <g stroke="#9aa3b2" stroke-width="1" fill="#dfe3ea">
    <rect x="28" y="226" width="17" height="30"/><rect x="49" y="226" width="17" height="30"/><rect x="91" y="226" width="17" height="30"/><rect x="112" y="226" width="17" height="30"/><rect x="133" y="226" width="17" height="30"/><rect x="154" y="226" width="17" height="30"/><rect x="175" y="226" width="17" height="30"/><rect x="196" y="226" width="17" height="30"/><rect x="217" y="226" width="17" height="30"/><rect x="238" y="226" width="17" height="30"/><rect x="259" y="226" width="17" height="30"/><rect x="280" y="226" width="17" height="30"/><rect x="301" y="226" width="17" height="30"/><rect x="322" y="226" width="17" height="30"/><rect x="343" y="226" width="17" height="30"/>
    <rect x="28" y="264" width="17" height="30"/><rect x="49" y="264" width="17" height="30"/><rect x="70" y="264" width="17" height="30"/><rect x="91" y="264" width="17" height="30"/><rect x="112" y="264" width="17" height="30"/><rect x="133" y="264" width="17" height="30"/><rect x="154" y="264" width="17" height="30"/><rect x="175" y="264" width="17" height="30"/><rect x="196" y="264" width="17" height="30"/><rect x="217" y="264" width="17" height="30"/><rect x="238" y="264" width="17" height="30"/><rect x="259" y="264" width="17" height="30"/><rect x="280" y="264" width="17" height="30"/><rect x="301" y="264" width="17" height="30"/><rect x="322" y="264" width="17" height="30"/><rect x="343" y="264" width="17" height="30"/>
  </g>
  <g fill="#cdeedd" stroke="#3d9a6c" stroke-width="1.5">
    <rect x="70" y="226" width="17" height="30"/><rect x="322" y="226" width="17" height="30"/><rect x="217" y="264" width="17" height="30"/>
  </g>
  <!-- arrow between panels -->
  <line x1="378" y1="170" x2="400" y2="170" stroke="#555" stroke-width="2" marker-end="url(#pg-mid)"/>
  <!-- AFTER panel -->
  <text x="582" y="36" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d5c38">After: partition by created_at (PostgreSQL)</text>
  <g font-size="8.5" text-anchor="middle">
    <rect x="415" y="44" width="105" height="40" rx="6" fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5"/>
    <text x="467" y="67" fill="#1c3a5e">part 2024-01</text>
    <rect x="530" y="44" width="105" height="40" rx="6" fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5"/>
    <text x="582" y="67" fill="#1c3a5e">part 2024-02</text>
    <rect x="645" y="44" width="105" height="40" rx="6" fill="#eaf7ee" stroke="#3d9a6c" stroke-width="3"/>
    <text x="697" y="61" fill="#14532d" font-weight="bold">part 2024-03</text>
    <text x="697" y="75" fill="#14532d">current — hot</text>
  </g>
  <rect x="405" y="92" width="355" height="108" rx="8" fill="#ffffff" stroke="#3d9a6c" stroke-width="2"/>
  <text x="582" y="108" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d5c38">buffer pool (RAM)</text>
  <rect x="420" y="118" width="190" height="30" fill="#cdeedd" stroke="#3d9a6c" stroke-width="2"/>
  <text x="515" y="137" text-anchor="middle" font-size="8" fill="#14532d">one page: all hot keys — 2e7·T1, e30·T2, 933·T3</text>
  <g stroke="#9aa3b2" stroke-width="1.2" fill="#e3e6ee">
    <rect x="620" y="118" width="36" height="30"/><rect x="662" y="118" width="36" height="30"/><rect x="704" y="118" width="36" height="30"/>
    <rect x="420" y="156" width="40" height="30"/><rect x="468" y="156" width="40" height="30"/><rect x="516" y="156" width="40" height="30"/><rect x="564" y="156" width="40" height="30"/><rect x="612" y="156" width="40" height="30"/><rect x="660" y="156" width="40" height="30"/><rect x="708" y="156" width="40" height="30"/>
  </g>
  <line x1="515" y1="242" x2="515" y2="206" stroke="#3d9a6c" stroke-width="2" marker-end="url(#pg-up)"/>
  <text x="525" y="228" font-size="9" fill="#1d5c38">pruned read: only the current partition's small id index is touched</text>
  <rect x="405" y="252" width="355" height="58" rx="8" fill="#f3f4f6" stroke="#9aa3b2" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="582" y="268" text-anchor="middle" font-size="10" fill="#555">indexes on disk — small, one per partition</text>
  <g stroke="#9aa3b2" stroke-width="1" fill="#dfe3ea">
    <rect x="423" y="278" width="14" height="24"/><rect x="441" y="278" width="14" height="24"/><rect x="459" y="278" width="14" height="24"/><rect x="477" y="278" width="14" height="24"/><rect x="495" y="278" width="14" height="24"/>
    <rect x="538" y="278" width="14" height="24"/><rect x="556" y="278" width="14" height="24"/><rect x="574" y="278" width="14" height="24"/><rect x="592" y="278" width="14" height="24"/><rect x="610" y="278" width="14" height="24"/>
  </g>
  <g fill="#cdeedd" stroke="#3d9a6c" stroke-width="1.5">
    <rect x="653" y="278" width="14" height="24"/><rect x="671" y="278" width="14" height="24"/><rect x="689" y="278" width="14" height="24"/><rect x="707" y="278" width="14" height="24"/><rect x="725" y="278" width="14" height="24"/>
  </g>
</svg>

In the **after** panel (PostgreSQL declarative partitioning by `created_at`), each monthly partition has its own small `id` index, and the current partition is the hot one. Queries that filter by `created_at` are **pruned** to the relevant partitions only, so random UUID reads stay within the small per-partition index, and the current partition's hot pages all fit in the buffer pool — nothing hot is evicted.

**Walkthrough.** A social-media table has 500M rows and a PK on UUID `id`. "Show recent posts" lists the latest ids via the `created_at` index, then fetches each post by `id` — but UUIDs are random, so each recent row lives on a different scattered page of the huge `id` index: one page holds `(id=2e7, created_at=T1)` plus a bunch of much older rows, another holds `(id=e30, created_at=T2)` plus old rows, another `(id=933, created_at=T3)` plus old rows. Those pages are hot, but every other fetch-by-id loads a cold page and evicts one from the pool — often a hot one. Result: recent-post lookups miss constantly. After partitioning by `created_at` (monthly), each month's partition has its own small `id` index; a query with `WHERE created_at > now() - interval '1 day' AND id = …` prunes to the current partition, whose id index (one month of UUIDs) fits in cache alongside the hot recent rows. The price is discipline: every query on the table must carry the `created_at` filter, or pruning cannot happen and you scan all partitions.

This is also the bridge to the write side: partitioned tables spread writes across partitions, and the next steps scale beyond what one machine's cache/disk can hold.

</details>

### 6. High write volume: vertical scaling

When writes dominate, the primary database is the serial bottleneck: scale it **up** — bigger machine, more RAM (bigger buffer pool), faster NVMe.

<details><summary>EXPLANATION</summary>

Writes must go to one primary (single-writer), so read replicas do not help. Vertical scaling buys a bigger buffer pool (fewer disk reads), faster storage (lower write latency), and more CPU. It is simple — no code changes — but capped by the largest machine available, and it is a single point of failure. Cost is linear: a 2× machine costs 2×. See [Vertical vs horizontal](#vertical-vs-horizontal-scaling) below.

</details>

### 7. Even higher write volume: sharding, NewSQL, range splits (à la Spanner)

Split the database itself across many machines: **sharding** by key range or hash; **NewSQL** databases (CockroachDB, YugabyteDB) do this with consensus (see [Consistency](../Robustness/Consistency.md)) and automatic **range splits** (Spanner).


<details><summary>EXPLANATION</summary>

**Sharding** partitions rows across nodes by a **shard key** (see [Data Scaling](./Data-Scaling.md) for the ring diagram and trade-offs): **range sharding** assigns contiguous key ranges (simple, but a viral user can hot-spot one shard); **hash sharding** sends key to shard $`h(key) \bmod N` (even, but adding a shard rehashes everything — mitigated by consistent hashing above, with many virtual nodes per server). Each shard is an independent database, so write throughput grows with the shard count. Costs: cross-shard queries and transactions become expensive or impossible, and rebalancing moves data between nodes.

**NewSQL** (CockroachDB, YugabyteDB, Spanner) automates this: data is split into **ranges**, each range is replicated with consensus (Raft/Paxos — see [Consistency](../Robustness/Consistency.md)), ranges **split** automatically when they grow or get hot, and rebalance across nodes. Spanner adds globally consistent transactions across shards using atomic clocks (TrueTime). This is the end of the throughput story: throughput now scales with the number of machines, bounded only by cross-shard coordination.

</details>

See [Data Scaling](./Data-Scaling.md) for the data-side story (single disk → sharding → DHT).

## Vertical vs horizontal scaling

**Vertical scaling** (scale up): more CPU/RAM/disk/network on one machine. No code changes; capped by the largest machine you can buy. **Horizontal scaling** (scale out): more machines behind a load balancer. Capped by the serial fraction ([Amdahl's law](../Concurrency/Parallelism.md)) — a single-writer database or a global lock limits it.

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
  <text x="570" y="218" text-anchor="middle" font-size="11" fill="#666">Capped by Amdahl's law (serial fraction).</text>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#4a7ab5"/></marker>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3d9a6c"/></marker>
  </defs>
</svg>

<details><summary>Cost considerations</summary>

**Vertical scaling is not linear in cost.** In the standard range a 2× machine roughly costs 2×, but the cost *per core* across machine sizes is U-shaped — no, a 1000-core petabyte-RAM machine is nowhere near 1000× a 1-core/1 TB one:

<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schematic cost per core versus machine size: high for tiny machines because fixed costs dominate, roughly linear for standard SKUs in the middle, and superlinear for huge exotic machines." style="max-width:720px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="cc-ax" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#555"/></marker>
  </defs>
  <text x="360" y="18" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Cost per core vs machine size (schematic)</text>
  <line x1="50" y1="210" x2="690" y2="210" stroke="#555" stroke-width="1.5" marker-end="url(#cc-ax)"/>
  <line x1="50" y1="210" x2="50" y2="30" stroke="#555" stroke-width="1.5" marker-end="url(#cc-ax)"/>
  <text x="600" y="232" text-anchor="middle" font-size="10" fill="#555">machine size (cores, RAM) →</text>
  <text x="24" y="120" text-anchor="middle" font-size="10" fill="#555" transform="rotate(-90 24 120)">cost per core</text>
  <path d="M 60 80 Q 180 200 330 195 Q 500 185 665 45" fill="none" stroke="#c0392b" stroke-width="2.5"/>
  <line x1="60" y1="195" x2="690" y2="195" stroke="#3d9a6c" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="375" y="188" text-anchor="middle" font-size="9" fill="#1d5c38">horizontal scaling: N standard machines ≈ N × the sweet-spot per-core cost</text>
  <text x="95" y="60" font-size="9" fill="#666">tiny machines: fixed costs (chassis,</text>
  <text x="95" y="73" font-size="9" fill="#666">PSU, BMC, base licenses) → high per-core cost</text>
  <text x="330" y="228" text-anchor="middle" font-size="9.5" fill="#1d5c38">standard SKUs: roughly linear per core — the sweet spot</text>
  <text x="655" y="66" text-anchor="end" font-size="9" fill="#c0392b">exotic machines (1000 cores, petabyte RAM):</text>
  <text x="655" y="79" text-anchor="end" font-size="9" fill="#c0392b">superlinear — custom SKUs from few vendors, per-core</text>
  <text x="655" y="92" text-anchor="end" font-size="9" fill="#c0392b">software licenses, rack power/cooling limits</text>
</svg>

- **Tiny machines**: fixed costs dominate per unit — don't buy a 1-core box for a job a 4-core box does.
- **Standard SKUs** (cloud instance families, typical 2-socket servers): roughly linear per core, widely available, fit standard racks — the sweet spot.
- **Huge machines**: superlinear and capped — exotic SKUs from few vendors with long lead times, per-core software licenses (some databases charge per core and can exceed the hardware price), and they may not fit a standard rack's power/cooling. So vertical scaling hits a ceiling long before "1000×".

**Horizontal scaling** is additive in per-instance pricing (N machines ≈ N× one machine), minus shared costs: on-premises, racks, switches, PDUs, power and cooling are shared, so a 10-node cluster costs less than 10× a standalone node. In the cloud, **spot/preemptible instances** (60–90% off, but interruptible) suit stateless scale-out workloads. Horizontal also carries a non-monetary cost: coordination complexity (load balancing, data distribution — the steps above).

**What matters is cost per request**: you pay for a machine whether it is 10% or 100% utilized, so right-size to the smallest *standard* instance meeting the SLOs and track cost/RPS. Monitor utilization and downscale below ~40%; [autoscaling](#autoscaling) automates this.

</details>

## Autoscaling

**Autoscaling** (reactive scaling): automatically add or remove instances based on observed metrics (CPU, queue depth, requests/second), eliminating manual capacity planning.

<details><summary>EXPLANATION</summary>

**Kubernetes HPA** adjusts replica count to hold a metric at a target (e.g. CPU 60%). **AWS Auto Scaling groups** offer target tracking, step scaling, and predictive scaling (pre-scale before known spikes). To avoid oscillation, a **cooldown** (e.g. 300 s) follows each action, and scale-in thresholds sit well below scale-out thresholds (e.g. out at 70–80% — before saturation, per [queueing theory](./Queueing-Theory.md) — in at 30%). **Kubernetes VPA** instead resizes each pod's CPU/memory, for workloads that do not parallelize.

**Challenges**: cold start (JIT warm-up, cache fill, connection pools), cost of over-provisioning during scale-out, and the serial bottleneck — if the database is one instance, scaling app servers past a point does nothing (steps 3–7 above).

</details>

## Example problem

**Problem**: A web server handles 1000 requests/second with an average response time of 50 ms. You add a second identical server behind a round-robin load balancer. What is the new throughput and average response time (assuming the servers are independent)?

<details><summary>Solution</summary>

**Before**: 1 server, $`\lambda = 1000` req/s, $`W = 50` ms. By Little's law, $`L = \lambda W = 1000 \times 0.05 = 50` concurrent requests. For an M/M/1 model, the service rate is $`\mu = \lambda + 1/W = 1000 + 20 = 1020` req/s, giving utilization $`\rho = \lambda / \mu \approx 0.98`$ — near saturation.

**After**: 2 servers, round-robin; each handles $`\lambda' = 500` req/s. Maximum sustainable throughput doubles to ~2000 req/s. Modeling each server as M/M/1 with $`\mu = 1020`$: $`\rho' \approx 0.49`$ and $`W' = 1 / (\mu - \lambda') = 1/520 \approx 1.9` ms — the queueing delay collapses from 50 ms to ~1.9 ms.

**Limitation**: this assumes the 50 ms is per-server work. If it is shared I/O (one database), the two servers contend on it and the effective per-server rate is lower — remove the shared bottleneck with the steps above (connection pool, replicas, cache, sharding).

</details>
