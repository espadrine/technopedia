# Data Scaling

Data scaling is the story of how to go from handling a small amount of data to a tremendous amount: each step's limitation is what the next step removes. It is relevant whenever the dataset outgrows one disk — in capacity, I/O rate, or availability.

> **Authoritative sources**
> - [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/)

## The ladder: single disk → sharding → DHT

The same story one level down, for the *data* itself: each step's limitation is what the next step removes.

### Single disk

One machine's disk holds everything, managed by a [file system](../../Computer-Hardware/Operating-System.md) (inodes/extents, allocation). Limitation: capacity (~TBs per disk), I/O rate, and it is a single point of failure.

### Sharding

Split the dataset across machines by a **shard key** — range or hash (see step 7 of [Throughput Scaling](./Throughput-Scaling.md) for why sharding scales writes).

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
 Each shard holds a subset, so capacity and I/O grow with the shard count. Limitation: a fixed shard count means rebalancing is expensive, hot shards appear, and there is no global view of the key space.

### DHT (Distributed Hash Table)

A **DHT** removes the central directory: nodes themselves form a ring (Chord) where each node owns the keys hashing between it and its predecessor, and a **finger table** lets any node route a lookup in $`O(\log N)` hops. Adding/removing a node only affects its neighbors' ranges. Used by Cassandra/Dynamo-style partitioners and BitTorrent (trackerless). Limitation: plain DHTs answer exact-key lookups efficiently, but range queries need extra structure (ordered rings, secondary indexes).

<details><summary>EXPLANATION</summary>

**Chord walkthrough.** Keys and nodes are hashed onto a circle of $`2^m` identifiers. Node $`n` is responsible for keys in $`(\text{predecessor}(n), n]`. To find the owner of key $`k`, a node forwards the query to the finger closest to $`k` that does not overshoot — each hop at least halves the distance, hence $`O(\log N)` hops. Join: a new node contacts any node, learns its predecessor, and takes over part of its range. Leave/failure: the successor's successor takes over, and the data was replicated on successors anyway (see [replication](../Robustness/Durability.md)).

**From sharding to DHT.** Manual sharding fixes the number of shards upfront and pays a big rebalance when it changes; a DHT makes the ring itself the routing table, so the system grows and shrinks organically. The price is that the DHT owns only key→node routing; secondary indexes, transactions, and SQL sit on top (or are given up — see consistency trade-offs in [Consistency](../Robustness/Consistency.md)).

</details>

## Example problem

**Problem**: You have 4 TB of user data on a single 8 TB disk (which also holds the OS), growing 500 GB/month, with nightly backups. The disk also fails once a year. Which step of the data-scaling story do you take first, and why?

<details><summary>Solution</summary>

First add **redundancy**, not capacity: the single disk is a single point of failure (see [Durability](../Robustness/Durability.md) — replication/RAID), and backups alone give a large RPO. In parallel, plan the move to **sharding** once a single disk's capacity (~8–16 TB) or I/O rate is the binding constraint: at 500 GB/month you hit the disk's limit in about a year. Sharding by user ID spreads capacity and I/O across nodes; only if you need decentralized, self-organizing placement (or a very large number of nodes) do you go to a **DHT**.

</details>
