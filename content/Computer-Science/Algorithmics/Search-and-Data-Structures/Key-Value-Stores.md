# Key-Value Stores

Key-value stores organize data so that a key maps to a value, supporting fast lookup, insertion, and deletion by key. They are relevant whenever the access pattern is "give me the value for this key" — from an in-memory cache to a distributed database. They build on flat structures (arrays, lists) by adding a mapping layer: a hash function or an ordering that routes the key to the right location.

> **Authoritative sources**
> - [Introduction to Algorithms (CLRS), Ch. 11–13, 18](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/)
> - [The Art of Computer Programming, Vol. 3](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)
> - [Pugh, "Skip Lists: A Probabilistic Alternative to Balanced Trees" (1990)](https://dl.acm.org/doi/10.1145/79840.79843)
> - [O'Neil et al., "The Log-Structured Merge-Tree (LSM-Tree)" (1996)](https://www.cs.umb.edu/~poneil/lsmtree.pdf)

## Comparison

<table>
<tr><th>Structure</th><th>Search</th><th>Insert</th><th>Space</th><th>Medium</th><th>Primary use case</th></tr>
<tr><td>Hash table</td><td><i>O</i>(1) expected</td><td><i>O</i>(1) expected</td><td><i>O</i>(<i>n</i>)</td><td>In-memory</td><td>Caches, dictionaries, dedup</td></tr>
<tr><td>Balanced BST</td><td><i>O</i>(log <i>n</i>)</td><td><i>O</i>(log <i>n</i>)</td><td><i>O</i>(<i>n</i>)</td><td>In-memory</td><td>Ordered iteration, range queries</td></tr>
<tr><td>Skip list</td><td><i>O</i>(log <i>n</i>) expected</td><td><i>O</i>(log <i>n</i>) expected</td><td><i>O</i>(<i>n</i>) expected</td><td>In-memory</td><td>Sorted sets (Redis ZSET), memtables</td></tr>
<tr><td>B-tree</td><td><i>O</i>(log<sub><i>m</i></sub> <i>n</i>) I/Os</td><td><i>O</i>(log<sub><i>m</i></sub> <i>n</i>) I/Os</td><td><i>O</i>(<i>n</i>)</td><td>Disk</td><td>Database indexes (InnoDB, SQLite)</td></tr>
<tr><td>LSM-tree</td><td><i>O</i>(log <i>n</i>) with bloom filters</td><td><i>O</i>(1) (memtable)</td><td><i>O</i>(<i>n</i> · <i>L</i>) worst case</td><td>Disk + RAM</td><td>Write-heavy stores (RocksDB, Cassandra)</td></tr>
</table>

## Hash tables

A hash table maps keys to values via a hash function $`h: K \to \{0, \ldots, m-1\}`.

- **Lookup / Insert / Delete**: $`O(1)` expected.
- **Load factor**: $`\alpha = n/m`. Performance degrades when $`\alpha > 0.7` (chaining) or $`\alpha > 0.5` (open addressing).

<details><summary>Details</summary>

A hash table is an array of $`m` slots. The hash function $`h(k)` computes the slot index for key $`k`. When two keys map to the same slot, a **collision** occurs and must be resolved.

**Step 1 — The hash function.**

The hash function compresses an arbitrary key into a small integer. For a table of size $`m = 7`, a simple hash is $`h(k) = k \bmod 7`.

*Example*: insert keys 5, 3, 8, 1.
- $`h(5) = 5 \bmod 7 = 5` → slot 5
- $`h(3) = 3 \bmod 7 = 3` → slot 3
- $`h(8) = 8 \bmod 7 = 1` → slot 1
- $`h(1) = 1 \bmod 7 = 1` → slot 1 (collision with 8!)

**Step 2 — Collision resolution.**

Two standard strategies:

- **Chaining**: each slot holds a linked list of all keys that hash to it. Slot 1 now holds [8, 1]. Lookup walks the chain: expected chain length is $`\alpha = n/m = 4/7 \approx 0.57`.
- **Open addressing**: on collision, probe to the next slot. Linear probing: $`h(i) = (h(k) + i) \bmod m`. Key 1 collides at slot 1, so it probes to slot 2.

**Step 3 — Resizing.**

When $`\alpha` exceeds a threshold (e.g. 0.75), the table is rehashed into an array of size $`2m`. Every key is reinserted. Amortized cost per insertion remains $`O(1)` because the expensive resize is spread over many cheap insertions.

**Step 4 — Hash function quality.**

A good hash is approximately universal: for any two distinct keys $`k_1 \neq k_2`, $`\Pr[h(k_1) = h(k_2)] \leq 1/m`. In practice, 64-bit hashes (xxHash, MurmurHash, FNV) with a random seed suffice.

<svg viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;">
  <text x="10" y="15" font-size="12" font-weight="bold">Chaining: m = 7, keys {5, 3, 8, 1}</text>
  <rect x="10" y="30" width="50" height="28" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="35" y="49" text-anchor="middle" font-size="11">0</text>
  <rect x="80" y="30" width="50" height="28" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="105" y="49" text-anchor="middle" font-size="11">1</text>
  <rect x="150" y="30" width="50" height="28" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="175" y="49" text-anchor="middle" font-size="11">2</text>
  <rect x="220" y="30" width="50" height="28" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="245" y="49" text-anchor="middle" font-size="11">3</text>
  <rect x="290" y="30" width="50" height="28" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="315" y="49" text-anchor="middle" font-size="11">4</text>
  <rect x="360" y="30" width="50" height="28" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="385" y="49" text-anchor="middle" font-size="11">5</text>
  <rect x="430" y="30" width="50" height="28" fill="#e3f2fd" stroke="#1565c0" rx="3"/>
  <text x="455" y="49" text-anchor="middle" font-size="11">6</text>
  <line x1="105" y1="58" x2="105" y2="75" stroke="#d32f2f" stroke-width="1.5"/>
  <rect x="80" y="75" width="50" height="24" fill="#ffcdd2" stroke="#d32f2f" rx="3"/>
  <text x="105" y="92" text-anchor="middle" font-size="11">8</text>
  <line x1="105" y1="99" x2="105" y2="112" stroke="#d32f2f" stroke-width="1.5"/>
  <rect x="80" y="112" width="50" height="24" fill="#ffcdd2" stroke="#d32f2f" rx="3"/>
  <text x="105" y="129" text-anchor="middle" font-size="11">1</text>
  <text x="140" y="105" font-size="10" fill="#d32f2f">collision!</text>
  <line x1="245" y1="58" x2="245" y2="75" stroke="#388e3c" stroke-width="1.5"/>
  <rect x="220" y="75" width="50" height="24" fill="#c8e6c9" stroke="#388e3c" rx="3"/>
  <text x="245" y="92" text-anchor="middle" font-size="11">3</text>
  <line x1="385" y1="58" x2="385" y2="75" stroke="#388e3c" stroke-width="1.5"/>
  <rect x="360" y="75" width="50" height="24" fill="#c8e6c9" stroke="#388e3c" rx="3"/>
  <text x="385" y="92" text-anchor="middle" font-size="11">5</text>
  <text x="10" y="165" font-size="10" fill="#555">h(k) = k mod 7. Slot 1 has a chain of length 2 (keys 8 and 1).</text>
</svg>

**Open addressing vs. chaining**: open addressing wins on cache locality (single contiguous array) and space (no pointers). Chaining wins on simplicity and handles deletion more gracefully (tombstones in open addressing complicate probing).

> **Authoritative source**: CLRS Ch. 11 (Hash Tables), pp. 257–290.

<details><summary>Example problem</summary>

You have a hash table of size $`m = 11` using linear probing with $`h(k) = k \bmod 11`. Insert keys 22, 33, 44, 55, 66. Then look up key 33. How many probes are needed?

<details><summary>Solution</summary>

- $`h(22) = 22 \bmod 11 = 0` → slot 0
- $`h(33) = 33 \bmod 11 = 0` → slot 0 occupied, probe slot 1 → empty, insert at 1
- $`h(44) = 44 \bmod 11 = 0` → slot 0 occupied, slot 1 occupied, probe slot 2 → insert at 2
- $`h(55) = 55 \bmod 11 = 0` → probe 0, 1, 2 (all occupied), slot 3 → insert at 3
- $`h(66) = 66 \bmod 11 = 0` → probe 0, 1, 2, 3 (all occupied), slot 4 → insert at 4

Lookup 33: $`h(33) = 0` → occupied (22), probe 1 → found (33). **2 probes**.

</details>

</details>

</details>

## Balanced binary search trees

A **binary search tree (BST)** stores keys in a binary tree satisfying the BST invariant: for every node, all keys in its left subtree are smaller and all keys in its right subtree are larger. Without balancing, a BST can degenerate to a linked list ($`O(n)`). **Balanced BSTs** enforce structural invariants that guarantee $`O(\log n)` height.

- **Search / Insert / Delete**: $`O(\log n)` worst case.
- **Space**: $`O(n)` (one node per key, two child pointers + color/balance field).
- **Ordered iteration**: in-order traversal yields keys in sorted order in $`O(n)`.

<details><summary>Details</summary>

**Step 1 — The BST invariant.**

In a BST, for any node $`v` with key $`k_v`:
- Every key in $`v`'s left subtree is $`< k_v`.
- Every key in $`v`'s right subtree is $`> k_v`.

This means a search for key $`k` follows a single path: go left if $`k < k_v`, right if $`k > k_v`. The search cost equals the depth of the target node.

*Example*: insert 5, 3, 8, 1, 4 into an empty BST.

<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="max-width:320px;">
  <circle cx="160" cy="30" r="18" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="160" y="35" text-anchor="middle" font-size="13" font-weight="bold">5</text>
  <line x1="145" y1="42" x2="80" y2="85" stroke="#333"/>
  <circle cx="80" cy="95" r="18" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="80" y="100" text-anchor="middle" font-size="13" font-weight="bold">3</text>
  <line x1="175" y1="42" x2="240" y2="85" stroke="#333"/>
  <circle cx="240" cy="95" r="18" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="240" y="100" text-anchor="middle" font-size="13" font-weight="bold">8</text>
  <line x1="65" y1="107" x2="40" y2="145" stroke="#333"/>
  <circle cx="40" cy="155" r="18" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
  <text x="40" y="160" text-anchor="middle" font-size="13" font-weight="bold">1</text>
  <line x1="95" y1="107" x2="120" y2="145" stroke="#333"/>
  <circle cx="120" cy="155" r="18" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
  <text x="120" y="160" text-anchor="middle" font-size="13" font-weight="bold">4</text>
  <text x="10" y="190" font-size="10" fill="#555">BST: left &lt; parent &lt; right. Height = 2 (3 levels).</text>
</svg>

Search for 4: 5 → go left (4 < 5) → 3 → go right (4 > 3) → found. 2 comparisons.

**Step 2 — Why balance is needed.**

If keys arrive in sorted order (1, 2, 3, …, n), the BST becomes a right-leaning chain of height $`n-1`. Search degrades to $`O(n)`. A balanced BST enforces a height bound of $`O(\log n)`.

**Step 3 — AVL trees (height balance).**

An **AVL tree** (Adelson-Velskii–Landis, 1962) requires that for every node, the heights of the left and right subtrees differ by at most 1. After an insertion or deletion, the tree is rebalanced with at most two rotations (left, right, left-right, right-left) along the path to the root.

*Example*: insert 1, 2, 3 into an AVL tree. After inserting 3, node 1 has a right-heavy subtree (height 2 vs. 0). A left rotation at node 1 makes node 2 the root, restoring balance.

**Step 4 — Red-black trees (color invariants).**

A **red-black tree** (Guibas & Sedgewick, 1978) colors each node red or black and enforces:
1. Every node is red or black.
2. The root is black.
3. Every leaf (NIL) is black.
4. A red node has only black children.
5. Every path from a node to its descendant leaves contains the same number of black nodes.

Rule 5 bounds the height: the longest path (alternating red-black) is at most twice the shortest (all black), so height $`\leq 2\log_2(n+1)`.

*Example*: insert 5, 3, 8, 1, 4. After inserting 4 (red), its parent 3 is also red — violating rule 4. A left rotation at 3 and a color swap restores the invariants.

**Step 5 — Comparison and use.**

<table>
<tr><th>Property</th><th>AVL</th><th>Red-black</th></tr>
<tr><td>Height bound</td><td>≤ 1.44 log₂(<i>n</i>+2)</td><td>≤ 2 log₂(<i>n</i>+1)</td></tr>
<tr><td>Rotations per insert</td><td>≤ 2</td><td>≤ 3</td></tr>
<tr><td>Use</td><td>When search is dominant</td><td>When insert/delete are frequent</td></tr>
</table>

Red-black trees are the basis of C++ `std::map`, Java `TreeMap`, and most OS schedulers. AVL trees appear in database indexes where search is more common than update.

> **Authoritative sources**: CLRS Ch. 12 (Elementary BSTs) and Ch. 13 (Red-Black Trees). Adelson-Velskii & Landis, "An algorithm for the organization of information" (1962).

<details><summary>Example problem</summary>

You insert the keys 10, 20, 30, 40, 50 into an AVL tree. After each insertion, the tree is rebalanced. What is the height of the tree after all five insertions?

<details><summary>Solution</summary>

- Insert 10: tree = [10], height 0.
- Insert 20: 10 → right 20. Height 1. Balanced.
- Insert 30: 10 → right 20 → right 30. Node 10 has right height 2, left height 0. Imbalance! Left rotation at 10: 20 becomes root, 10 left, 30 right. Height 1.
- Insert 40: 20 → left 10, right 30 → right 40. Node 20: left height 1, right height 2. Balanced (diff ≤ 1). Height 2.
- Insert 50: 30 → right 40 → right 50. Node 30: right height 2, left height 0. Imbalance! Left rotation at 30: 40 becomes child of 20's right, 30 left of 40, 50 right of 40. Height 2.

Final height: **2** (3 levels). The tree is balanced.

</details>

</details>

</details>

## Skip lists

A skip list is a probabilistic balanced search structure: each element has a random number of "levels" of forward pointers, creating a multi-level linked list that skips over elements at higher levels.

- **Search / Insert / Delete**: $`O(\log n)` expected.
- **Space**: $`O(n)` expected (geometric distribution of levels).
- **Simpler to implement** than AVL or red-black trees (no rotations; only pointer manipulation).

<details><summary>Details</summary>

**Step 1 — The base level.**

Level 0 is a sorted linked list. Search is $`O(n)`: walk forward until you find the key.

**Step 2 — Adding levels.**

Each new element gets a level by "flipping a coin" until it lands: level 1 with probability 1/2, level 2 with probability 1/4, etc. The expected number of levels per element is 2, so total space is $`O(n)`. Higher levels act as express lanes: a search starts at the top level and drops down when it would overshoot.

*Example*: insert keys 3, 7, 12, 1, 9. Suppose the coin flips give levels: 3→2, 7→1, 12→3, 1→1, 9→2.

<svg viewBox="0 0 500 170" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;">
  <text x="5" y="25" font-size="11" fill="#555">L3</text>
  <circle cx="50" cy="22" r="14" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="50" y="26" text-anchor="middle" font-size="11" font-weight="bold">12</text>
  <line x1="64" y1="22" x2="480" y2="22" stroke="#e65100" stroke-width="1.5"/>
  <text x="5" y="55" font-size="11" fill="#555">L2</text>
  <circle cx="50" cy="52" r="14" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="50" y="56" text-anchor="middle" font-size="11" font-weight="bold">3</text>
  <line x1="64" y1="52" x2="140" y2="52" stroke="#e65100" stroke-width="1.5"/>
  <circle cx="155" cy="52" r="14" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="155" y="56" text-anchor="middle" font-size="11" font-weight="bold">9</text>
  <line x1="169" y1="52" x2="240" y2="52" stroke="#e65100" stroke-width="1.5"/>
  <circle cx="255" cy="52" r="14" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="255" y="56" text-anchor="middle" font-size="11" font-weight="bold">12</text>
  <line x1="269" y1="52" x2="480" y2="52" stroke="#e65100" stroke-width="1.5"/>
  <text x="5" y="85" font-size="11" fill="#555">L1</text>
  <circle cx="50" cy="82" r="14" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="50" y="86" text-anchor="middle" font-size="11" font-weight="bold">1</text>
  <line x1="64" y1="82" x2="100" y2="82" stroke="#2e7d32" stroke-width="1.5"/>
  <circle cx="115" cy="82" r="14" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="115" y="86" text-anchor="middle" font-size="11" font-weight="bold">3</text>
  <line x1="129" y1="82" x2="170" y2="82" stroke="#2e7d32" stroke-width="1.5"/>
  <circle cx="185" cy="82" r="14" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="185" y="86" text-anchor="middle" font-size="11" font-weight="bold">7</text>
  <line x1="199" y1="82" x2="240" y2="82" stroke="#2e7d32" stroke-width="1.5"/>
  <circle cx="255" cy="82" r="14" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="255" y="86" text-anchor="middle" font-size="11" font-weight="bold">9</text>
  <line x1="269" y1="82" x2="310" y2="82" stroke="#2e7d32" stroke-width="1.5"/>
  <circle cx="325" cy="82" r="14" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="325" y="86" text-anchor="middle" font-size="11" font-weight="bold">12</text>
  <line x1="339" y1="82" x2="480" y2="82" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="5" y="115" font-size="11" fill="#555">L0</text>
  <circle cx="50" cy="112" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="50" y="116" text-anchor="middle" font-size="11" font-weight="bold">1</text>
  <line x1="64" y1="112" x2="100" y2="112" stroke="#1565c0" stroke-width="1.5"/>
  <circle cx="115" cy="112" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="115" y="116" text-anchor="middle" font-size="11" font-weight="bold">3</text>
  <line x1="129" y1="112" x2="170" y2="112" stroke="#1565c0" stroke-width="1.5"/>
  <circle cx="185" cy="112" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="185" y="116" text-anchor="middle" font-size="11" font-weight="bold">7</text>
  <line x1="199" y1="112" x2="240" y2="112" stroke="#1565c0" stroke-width="1.5"/>
  <circle cx="255" cy="112" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="255" y="116" text-anchor="middle" font-size="11" font-weight="bold">9</text>
  <line x1="269" y1="112" x2="310" y2="112" stroke="#1565c0" stroke-width="1.5"/>
  <circle cx="325" cy="112" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="325" y="116" text-anchor="middle" font-size="11" font-weight="bold">12</text>
  <line x1="339" y1="112" x2="480" y2="112" stroke="#1565c0" stroke-width="1.5"/>
  <line x1="50" y1="36" x2="50" y2="38" stroke="#999" stroke-dasharray="2"/>
  <line x1="50" y1="66" x2="50" y2="68" stroke="#999" stroke-dasharray="2"/>
  <line x1="115" y1="96" x2="115" y2="98" stroke="#999" stroke-dasharray="2"/>
  <line x1="155" y1="66" x2="155" y2="68" stroke="#999" stroke-dasharray="2"/>
  <line x1="255" y1="66" x2="255" y2="68" stroke="#999" stroke-dasharray="2"/>
  <line x1="255" y1="96" x2="255" y2="98" stroke="#999" stroke-dasharray="2"/>
  <line x1="325" y1="96" x2="325" y2="98" stroke="#999" stroke-dasharray="2"/>
  <text x="10" y="155" font-size="10" fill="#555">Search for 9: L3: 12 &gt; 9, drop. L2: 3 &lt; 9, 9 found! (2 steps at L2 + 1 drop)</text>
</svg>

**Step 3 — Search algorithm.**

Start at the top-left. At each node, if the forward pointer's key is $`\leq` target, move forward; otherwise drop down one level. This is analogous to binary search but on a linked structure.

*Example*: search for 9 in the diagram above. Start at L3 (key 12): 12 > 9, drop to L2. At L2, key 3: 3 < 9, move forward. Key 9: found! Total: 1 drop + 2 forward moves = 3 steps.

**Step 4 — Why use them?**

Redis uses skip lists for sorted sets (ZSET). LevelDB uses them for the in-memory memtable. They are easier to implement correctly than balanced BSTs (no rotations, only pointer splicing) and perform comparably in practice.

**Range queries**: a skip list supports $`O(\log n + k)` range queries (find start, then walk forward at level 0), which is better than a hash table ($`O(n)`) and comparable to a BST.

> **Authoritative source**: Pugh, "Skip Lists: A Probabilistic Alternative to Balanced Trees", CACM 33(10), 1990.

<details><summary>Example problem</summary>

A skip list uses probability $`p = 1/2` for promoting to the next level. You insert 1000 elements. What is the expected total number of forward pointers across all levels?

<details><summary>Solution</summary>

Each element has level $`L` with $`\Pr[L = l] = (1/2)^l` for $`l \geq 1`. The expected level is $`\sum_{l=1}^{\infty} l \cdot (1/2)^l = 2`. Each element at level $`l` has $`l` forward pointers. So the expected total pointers is $`1000 \times 2 = 2000`.

</details>

</details>

</details>

## B-trees

A **B-tree of order $`m`** is an $`m`-ary search tree where:
- Every internal node except the root has at least $`\lceil m/2 \rceil` children; the root has at least 2 children unless it is a leaf.
- Every node has at most $`m` children.
- All leaves are at the same depth.
- A node with $`c` children stores $`c - 1` keys.

- **Search**: $`O(\log_m n)` disk accesses (each node = one disk block).
- **Insert / Delete**: $`O(\log_m n)` with possible splits / merges.

<details><summary>Details</summary>

**Step 1 — Why B-trees exist.**

A binary tree of $`n` keys has height $`\log_2 n`. For $`n = 10^9`, that's 30 levels. If each level is a separate disk block, a search costs 30 random I/Os. A B-tree of order $`m = 256` has height $`\log_{256}(10^9) \approx 3`, so only 3 disk accesses. The fan-out (branching factor) is the key: more keys per node → fewer levels.

**Step 2 — The structure.**

A B-tree node stores up to $`m - 1` keys and $`m` child pointers. Keys within a node are sorted. For a search target $`k`, the node determines which child to follow: the child between the two keys that bracket $`k`.

*Example*: a B-tree of order 4 (max 3 keys per node). Root: [10, 20, 30]. Children: [1,5,8], [12,15,18], [22,25,28], [35,40,45].

<svg viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg" style="max-width:480px;">
  <rect x="140" y="15" width="200" height="35" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
  <text x="180" y="38" text-anchor="middle" font-size="12" font-weight="bold">10</text>
  <text x="240" y="38" text-anchor="middle" font-size="12" font-weight="bold">20</text>
  <text x="300" y="38" text-anchor="middle" font-size="12" font-weight="bold">30</text>
  <line x1="160" y1="50" x2="60" y2="90" stroke="#333"/>
  <line x1="210" y1="50" x2="170" y2="90" stroke="#333"/>
  <line x1="270" y1="50" x2="290" y2="90" stroke="#333"/>
  <line x1="320" y1="50" x2="410" y2="90" stroke="#333"/>
  <rect x="10" y="90" width="100" height="35" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="4"/>
  <text x="35" y="113" text-anchor="middle" font-size="11">1</text>
  <text x="60" y="113" text-anchor="middle" font-size="11">5</text>
  <text x="85" y="113" text-anchor="middle" font-size="11">8</text>
  <rect x="120" y="90" width="100" height="35" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="4"/>
  <text x="145" y="113" text-anchor="middle" font-size="11">12</text>
  <text x="170" y="113" text-anchor="middle" font-size="11">15</text>
  <text x="195" y="113" text-anchor="middle" font-size="11">18</text>
  <rect x="240" y="90" width="100" height="35" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="4"/>
  <text x="265" y="113" text-anchor="middle" font-size="11">22</text>
  <text x="290" y="113" text-anchor="middle" font-size="11">25</text>
  <text x="315" y="113" text-anchor="middle" font-size="11">28</text>
  <rect x="360" y="90" width="100" height="35" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="4"/>
  <text x="385" y="113" text-anchor="middle" font-size="11">35</text>
  <text x="410" y="113" text-anchor="middle" font-size="11">40</text>
  <text x="435" y="113" text-anchor="middle" font-size="11">45</text>
  <text x="10" y="150" font-size="10" fill="#555">Search 25: root → 25 is between 20 and 30 → go to 3rd child → found. 2 disk accesses.</text>
</svg>

**Step 3 — Insertion and splitting.**

If a node overflows ($`> m-1` keys), it splits into two nodes and the median key is pushed up to the parent. If the root splits, the tree grows by one level.

*Example*: order 4, leaf [12, 15, 18] receives key 16 → [12, 15, 16, 18] (4 keys > 3 max). Split: left [12, 15], right [18], push 16 up to root. Root becomes [10, 16, 20, 30] — now 4 keys > 3 max, so root also splits.

**Step 4 — Deletion and merging.**

If a node underflows ($`< \lceil m/2 \rceil - 1` keys), it merges with a sibling or borrows from one. If the root becomes empty, the tree shrinks by one level.

**Step 5 — Capacity.**

With $`m = 256` (a 4 KB block holding 256 16-byte keys), a B-tree of 3 levels holds $`256^3 \approx 16` million keys in 3 disk accesses. A B-tree of 4 levels holds $`256^4 \approx 4` billion keys in 4 disk accesses.

**B+ trees** (used in MySQL InnoDB, PostgreSQL, SQLite): all data is in the leaves; internal nodes store only keys. Leaves are linked for efficient range scans. This is the standard index structure in relational databases (see [Database Theory](./Database-Theory/Readme.md)).

> **Authoritative source**: CLRS Ch. 18 (B-Trees), pp. 431–452. Bayer & McCreight, "Organization and Maintenance of Large Ordered Indices" (1972).

<details><summary>Example problem</summary>

A B-tree of order 5 (max 4 keys per node) has a leaf [10, 20, 30, 40]. You insert key 25. Describe the split.

<details><summary>Solution</summary>

After inserting 25: [10, 20, 25, 30, 40] — 5 keys, exceeds max of 4. Split at the median (index 2): left = [10, 20, 25], right = [30, 40]. Push median key 25 up to the parent. The parent gains one key and one child pointer.

</details>

</details>

</details>

## LSM-trees

A **Log-Structured Merge-tree** optimizes for write throughput by converting random writes into sequential appends:

1. New writes go to an in-memory **memtable** (a sorted structure, often a skip list).
2. When the memtable is full, it is flushed to an immutable **SST** (Sorted String Table) on disk.
3. Background **compaction** merges overlapping SSTs, discarding tombstones and expired entries.

- **Write**: $`O(1)` (append to memtable) → $`O(\log n)` (flush, amortized).
- **Read**: check memtable, then SSTs in order. Worst case $`O(\log n \cdot L)` where $`L` is the number of levels. With per-SST bloom filters, the expected read is closer to $`O(\log n)` because most levels are skipped (a negative lookup is rejected by the filter with high probability).
- **Space amplification**: up to $`L` copies of a key during compaction.

<details><summary>Details</summary>

**Step 1 — The write path.**

Every write is an append to the in-memory memtable (a skip list or a sorted array). This is $`O(\log n)` in the memtable but the memtable is small (tens of MB), so it fits in L2/L3 cache. No random disk I/O occurs on the write path.

*Example*: 100K writes/sec × 100 bytes/write = 10 MB/s. A 64 MB memtable fills in ~6 seconds. Each flush is a single sequential write of 64 MB to disk.

**Step 2 — The flush.**

When the memtable reaches its size limit, it is sorted (if not already) and written as an immutable SST file. The SST is a sorted run of (key, value) pairs with an index for binary search. A new empty memtable is activated.

**Step 3 — Compaction.**

Over time, many SSTs accumulate. Compaction merges overlapping SSTs into fewer, larger ones, discarding tombstones (deleted keys) and expired entries.

<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;">
  <rect x="10" y="15" width="120" height="40" fill="#fff3e0" stroke="#e65100" stroke-width="2" rx="4"/>
  <text x="70" y="40" text-anchor="middle" font-size="11" font-weight="bold">Memtable</text>
  <text x="70" y="52" text-anchor="middle" font-size="9" fill="#555">(skip list)</text>
  <line x1="130" y1="35" x2="170" y2="35" stroke="#333" stroke-width="1.5"/>
  <text x="150" y="28" text-anchor="middle" font-size="9">flush</text>
  <rect x="175" y="15" width="80" height="40" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
  <text x="215" y="33" text-anchor="middle" font-size="11" font-weight="bold">L0</text>
  <text x="215" y="48" text-anchor="middle" font-size="9">SST × 4</text>
  <rect x="175" y="70" width="80" height="40" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
  <text x="215" y="88" text-anchor="middle" font-size="11" font-weight="bold">L1</text>
  <text x="215" y="103" text-anchor="middle" font-size="9">SST × 10</text>
  <rect x="175" y="125" width="80" height="40" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
  <text x="215" y="143" text-anchor="middle" font-size="11" font-weight="bold">L2</text>
  <text x="215" y="158" text-anchor="middle" font-size="9">SST × 100</text>
  <line x1="255" y1="35" x2="290" y2="35" stroke="#d32f2f" stroke-width="1.5"/>
  <text x="272" y="28" text-anchor="middle" font-size="9" fill="#d32f2f">compact</text>
  <line x1="255" y1="90" x2="290" y2="90" stroke="#d32f2f" stroke-width="1.5"/>
  <text x="272" y="83" text-anchor="middle" font-size="9" fill="#d32f2f">compact</text>
  <rect x="310" y="15" width="190" height="150" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="4"/>
  <text x="405" y="35" text-anchor="middle" font-size="11" font-weight="bold">Read path</text>
  <text x="320" y="55" font-size="10">1. Check memtable (skip list)</text>
  <text x="320" y="72" font-size="10">2. For each SST (L0→L2):</text>
  <text x="330" y="89" font-size="10">   a. Bloom filter: key present?</text>
  <text x="330" y="106" font-size="10">   b. If yes: binary search SST</text>
  <text x="330" y="123" font-size="10">   c. If no: skip this SST</text>
  <text x="320" y="145" font-size="10" fill="#555">With bloom filters, most SSTs</text>
  <text x="320" y="158" font-size="10" fill="#555">are skipped → expected O(log n)</text>
</svg>

**Step 4 — Compaction strategies.**

- **Size-tiered**: merge SSTs of similar size. Good write throughput, high space amplification.
- **Leveled** (LevelDB, RocksDB): each level is $`10\times` larger than the previous. Better read performance, more write amplification.
- **Universal** (Cassandra): merge a set of SSTs when their total size exceeds a threshold.

**Step 5 — Bloom filters on the read path.**

Each SST carries a [Bloom filter](./Lists.md) (a probabilistic set). On a read, the filter is checked first: if the key is definitely absent, the SST is skipped without a disk read. With a false-positive rate of 1%, a read that would check $`L = 7` levels only actually reads $`\approx 1` SST on average, bringing expected read cost close to $`O(\log n)`.`}}</invoke>

**Use cases**: RocksDB, Cassandra, HBase, LevelDB, ScyllaDB. Ideal for write-heavy workloads (time-series data, event logs, IoT).

> **Authoritative source**: O'Neil, O'Neil, Weikum, "The Log-Structured Merge-Tree (LSM-Tree)" (1996). Also: Google LevelDB design doc (2011).

<details><summary>Example problem</summary>

An LSM-tree has 5 levels (L0–L4) with a size ratio of 10×. The total dataset is 100 GB. A read for a key that is not present must check the memtable and then each level. Without bloom filters, how many SSTs must be searched? With bloom filters (1% false positive), how many on average?

<details><summary>Solution</summary>

Level sizes: L0 = 1 GB, L1 = 10 GB, L2 = 100 GB (but capped at 100 GB total, so let's say L0=1, L1=5, L2=10, L3=30, L4=54 GB). Each level has multiple SSTs. Without bloom filters, the read must binary-search every SST in every level: potentially $`O(L)` SSTs (one per level in the best case, more in L0). With bloom filters at 1% false positive, each level is skipped with 99% probability. Expected SSTs actually read: $`\approx 5 \times 0.01 = 0.05` plus the memtable check. In practice, the key is found (or confirmed absent) after checking the memtable and ~1 SST.

</details>

</details>

</details>

## Example problem

<details><summary>Example problem</summary>

Choose between a B-tree and an LSM-tree for a write-heavy workload with 10M keys and 100K writes/sec on a 4 KB-block SSD. Justify.

<details><summary>Solution</summary>

**B-tree**: each write may touch 3–4 nodes (leaf + internal levels). With 100K writes/sec, that's 300–400K random 4 KB I/Os/sec. An SSD sustains ~50K random IOPS, so the B-tree is I/O-bound and will queue writes.

**LSM-tree**: writes go to the memtable ($`O(1)`). When full (say 64 MB), a single sequential flush of 64 MB occurs. At 100K writes/sec × 100 bytes/write = 10 MB/s, a flush happens every ~6 seconds. Compaction is sequential and can be throttled. The write path is never random.

**Verdict**: LSM-tree. The write path is sequential (append to memtable, sequential flush), avoiding the random I/O bottleneck of B-tree updates. The cost is higher read latency (check memtable + up to $`L` SSTs) and space amplification during compaction — acceptable for a write-heavy workload.

</details>

</details>

## Interactive simulation

<iframe src="./Key-Value-Stores.simulation.html" title="Interactive visualization of key-value store structures: hash table, balanced BST, skip list, B-tree, and LSM-tree"></iframe>
