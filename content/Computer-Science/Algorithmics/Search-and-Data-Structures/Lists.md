# Lists

Lists are flat, sequential data structures that store elements in a fixed order. They are relevant when the access pattern is positional (by index) or when the collection is small enough that a linear scan is acceptable. They form the foundation upon which all other search structures build: a hash table is an array of buckets, a B-tree is a tree of arrays, and a graph is a set of adjacency lists.

The progression through this page follows the natural evolution of the idea: **arrays** are the primitive (fixed-size, contiguous); **vectors** add dynamic sizing on top of arrays; **linked lists** trade cache locality for $`O(1)` splice at arbitrary positions; **stacks, queues, and deques** restrict the access pattern to the ends of any of the above; and **Bloom filters** repurpose a bit array as a probabilistic membership oracle.

**The trade-off triangle.** Choosing among these structures is a three-way tension: *random-access speed* (favors arrays), *insertion/deletion speed* (favors linked lists), and *space overhead* (favors arrays). No single structure wins all three corners, so the right choice is dictated by which corner your access pattern stresses most.

<svg viewBox="0 0 420 300" width="100%" style="max-width:440px;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg">
  <polygon points="210,55 70,255 350,255" fill="none" stroke="#e94560" stroke-width="2"/>
  <circle cx="210" cy="55" r="6" fill="#e94560"/>
  <circle cx="70" cy="255" r="6" fill="#e94560"/>
  <circle cx="350" cy="255" r="6" fill="#e94560"/>
  <text x="210" y="30" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Random-access speed</text>
  <text x="210" y="46" text-anchor="middle" fill="#a0a0c0" font-size="12">favors arrays</text>
  <text x="70" y="278" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Insertion / deletion</text>
  <text x="70" y="294" text-anchor="middle" fill="#a0a0c0" font-size="12">favors linked lists</text>
  <text x="350" y="278" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Space overhead</text>
  <text x="350" y="294" text-anchor="middle" fill="#a0a0c0" font-size="12">favors arrays</text>
</svg>


> **Authoritative sources**
> - [Introduction to Algorithms (CLRS), Ch. 10](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/)
> - [The Art of Computer Programming, Vol. 1: Fundamental Algorithms](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)

## Arrays

An array of $`n` elements in contiguous memory supports:
- Random access by index: $`O(1)`
- Search by value: $`O(n)`
- Insertion / deletion at position $`i`: $`O(n)` (shift)

<details><summary>Details</summary>

**How it works.** An array is a block of $`n \times w` bytes (where $`w` is the element width) allocated contiguously. Element $`i` lives at address $`\text{base} + i \cdot w`, so the CPU computes the address with a single multiply-and-add. No pointer chasing is needed.

<svg viewBox="0 0 440 130" width="100%" style="max-width:470px;display:block;margin:8px auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
  <rect x="10" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="36" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="62" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="88" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="114" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="140" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="166" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="192" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="218" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="244" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="270" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="296" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="322" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="348" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="374" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <rect x="400" y="30" width="24" height="30" fill="#0f3460" stroke="#e94560"/>
  <text x="22" y="49" fill="#fff" font-size="10" text-anchor="middle">0</text>
  <text x="126" y="49" fill="#fff" font-size="10" text-anchor="middle">4</text>
  <text x="230" y="49" fill="#fff" font-size="10" text-anchor="middle">8</text>
  <text x="334" y="49" fill="#fff" font-size="10" text-anchor="middle">12</text>
  <text x="412" y="49" fill="#fff" font-size="10" text-anchor="middle">15</text>
  <text x="22" y="76" fill="#a0a0c0" font-size="9" text-anchor="middle">0x1000</text>
  <text x="412" y="76" fill="#a0a0c0" font-size="9" text-anchor="middle">0x103C</text>
  <line x1="10" y1="90" x2="424" y2="90" stroke="#4ecdc4" stroke-width="2"/>
  <line x1="10" y1="90" x2="10" y2="96" stroke="#4ecdc4" stroke-width="2"/>
  <line x1="424" y1="90" x2="424" y2="96" stroke="#4ecdc4" stroke-width="2"/>
  <text x="217" y="114" fill="#4ecdc4" font-size="11" text-anchor="middle">one 64-byte cache line = 16 × int32, loaded together</text>
</svg>


**Worked example.** Consider an array of 8 `int32` values (4 bytes each) starting at address `0x1000`:

<table>
<tr><th>Index</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
<tr><th>Address</th><td>0x1000</td><td>0x1004</td><td>0x1008</td><td>0x100C</td><td>0x1010</td><td>0x1014</td><td>0x1018</td><td>0x101C</td></tr>
<tr><th>Value</th><td>42</td><td>7</td><td>99</td><td>1</td><td>55</td><td>3</td><td>88</td><td>12</td></tr>
</table>

Accessing index 5: address = `0x1000 + 5 × 4 = 0x1014` → value 3. One memory access, $`O(1)`.

**Cache locality.** A cache line (typically 64 bytes) loads 16 `int32` elements at once. Sequential iteration over an array achieves near-peak bandwidth because each access hits the same cache line. This is why arrays outperform linked lists for iteration despite $`O(n)` insertion. See [Memory Hierarchy](../../Computer-Hardware/Memory-Hierarchy.md) for the full treatment of cache lines, spatial and temporal locality, and the memory wall.

**Lookup tables.** A precomputed array indexed by the key itself (e.g., a 256-entry table for byte values). $`O(1)` access, $`O(|K|)` space. Used for character classification, base64 decoding, and small integer key maps. See [Knuth, TAOCP Vol. 1: Fundamental Algorithms](https://www-cs-faculty.stanford.edu/~knuth/taocp.html) for the classical treatment of arrays and sequential access.

**Example problem.**

<details><summary>Problem</summary>

You have an array of 1000 `int64` values. How many cache lines are touched by a single full sequential scan (assuming 64-byte cache lines and no prefetching)?

<details><summary>Solution</summary>

Each `int64` is 8 bytes. 1000 × 8 = 8000 bytes total. 8000 ÷ 64 = 125 cache lines. A sequential scan touches exactly 125 cache lines (one miss per line, assuming cold cache).

</details>

</details>

</details>

## Vectors (growable arrays)

A vector amortizes $`O(1)` append by growing capacity geometrically. Over $`n` insertions, the underlying array is reallocated $`O(\log n)` times; total work is $`O(n)` (amortized $`O(1)` per insertion).

<details><summary>Details</summary>

**How it works.** A vector maintains two numbers: *size* (number of elements) and *capacity* (number of allocated slots). When `size == capacity`, the vector allocates a new block of $`c \times \text{capacity}` bytes, copies all elements, and frees the old block. The amortized cost per insertion is $`\frac{1}{1 - 1/c}` element-copies.

**Growth factor.** Any constant factor $`c > 1` gives $`O(1)` amortized per insertion. For example, $`c = 1.5` gives amortized cost 3 per insertion; $`c = 2` gives amortized cost 2. The factor $`c = 2` minimizes the number of reallocations ($`\log_2 n`), while smaller factors reduce peak memory waste. Peak memory usage is at most $`c \cdot n` elements (just before a shrink, if supported).

**Worked example.** Start with capacity 1, growth factor 2:

<table>
<tr><th>Insertion #</th><th>Size</th><th>Capacity</th><th>Reallocation?</th><th>Copies</th></tr>
<tr><td>1</td><td>1</td><td>1</td><td>No</td><td>0</td></tr>
<tr><td>2</td><td>2</td><td>2</td><td>Yes (1→2)</td><td>1</td></tr>
<tr><td>3</td><td>3</td><td>4</td><td>Yes (2→4)</td><td>2</td></tr>
<tr><td>4</td><td>4</td><td>4</td><td>No</td><td>0</td></tr>
<tr><td>5</td><td>5</td><td>8</td><td>Yes (4→8)</td><td>4</td></tr>
<tr><td>6</td><td>6</td><td>8</td><td>No</td><td>0</td></tr>
<tr><td>7</td><td>7</td><td>8</td><td>No</td><td>0</td></tr>
<tr><td>8</td><td>8</td><td>8</td><td>No</td><td>0</td></tr>
<tr><td>9</td><td>9</td><td>16</td><td>Yes (8→16)</td><td>8</td></tr>
</table>

Total copies for 9 insertions: 1+2+4+8 = 15 < 2×9. Amortized ≈ 1.67 per insertion.

**Language implementations.** In C++, `std::vector` uses geometric growth (typically doubling). In Rust, `Vec` uses a similar strategy. In Python, `list` over-allocates by $`\sim 12.5\%` per growth step for large lists; for small lists the capacity roughly doubles. See [CLRS, Ch. 10 (Elementary Data Structures)](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/) for the amortized-analysis treatment of dynamic arrays.

**Vectors and sorting.** A sorted vector supports $`O(\log n)` binary search.

**Example problem.**

<details><summary>Problem</summary>

A vector starts with capacity 1 and doubles on overflow. After inserting 1024 elements, how many total element-copies have occurred?

<details><summary>Solution</summary>

Reallocations happen at sizes 1, 2, 4, 8, …, 512. Copies: 1+2+4+…+512 = 1023. Total copies = 1023 ≈ $`n - 1` for $`n = 1024` (a power of 2).

</details>

</details>

</details>

## Linked lists

A singly linked list stores elements in nodes with a `next` pointer. A doubly linked list adds a `prev` pointer.

- Access by index: $`O(n)`
- Insertion / deletion at a known node: $`O(1)`
- Space: $`O(n)` + pointer overhead per node (8 bytes for `next`, 16 bytes for `next`+`prev` on 64-bit)

<details><summary>Details</summary>

**How it works.** Each node is a separate heap allocation containing the element and one or two pointers. To insert after node $`p`, allocate a new node, set its `next` to $`p.\text{next}`, then set $`p.\text{next}` to the new node. No existing elements move.

<svg viewBox="0 0 480 130" width="100%" style="max-width:500px;display:block;margin:8px auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
  <defs>
    <marker id="llR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e94560"/></marker>
    <marker id="llL" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#4ecdc4"/></marker>
    <marker id="llG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a0a0c0"/></marker>
  </defs>
  <rect x="40" y="50" width="80" height="40" fill="#0f3460" stroke="#e94560" stroke-width="2"/>
  <text x="80" y="75" fill="#fff" font-size="14" text-anchor="middle">3</text>
  <rect x="200" y="50" width="80" height="40" fill="#0f3460" stroke="#e94560" stroke-width="2"/>
  <text x="240" y="75" fill="#fff" font-size="14" text-anchor="middle">7</text>
  <rect x="360" y="50" width="80" height="40" fill="#0f3460" stroke="#e94560" stroke-width="2"/>
  <text x="400" y="75" fill="#fff" font-size="14" text-anchor="middle">99</text>
  <line x1="120" y1="60" x2="198" y2="60" stroke="#e94560" stroke-width="2" marker-end="url(#llR)"/>
  <line x1="280" y1="60" x2="358" y2="60" stroke="#e94560" stroke-width="2" marker-end="url(#llR)"/>
  <text x="159" y="54" fill="#e94560" font-size="10" text-anchor="middle">next</text>
  <text x="319" y="54" fill="#e94560" font-size="10" text-anchor="middle">next</text>
  <line x1="200" y1="80" x2="122" y2="80" stroke="#4ecdc4" stroke-width="2" marker-end="url(#llL)"/>
  <line x1="360" y1="80" x2="282" y2="80" stroke="#4ecdc4" stroke-width="2" marker-end="url(#llL)"/>
  <text x="159" y="96" fill="#4ecdc4" font-size="10" text-anchor="middle">prev</text>
  <text x="319" y="96" fill="#4ecdc4" font-size="10" text-anchor="middle">prev</text>
  <text x="6" y="75" fill="#a0a0c0" font-size="11">head</text>
  <line x1="34" y1="70" x2="38" y2="70" stroke="#a0a0c0" stroke-width="1.5" marker-end="url(#llG)"/>
  <line x1="440" y1="70" x2="446" y2="70" stroke="#a0a0c0" stroke-width="1.5" marker-end="url(#llG)"/>
  <text x="448" y="75" fill="#a0a0c0" font-size="11">NULL</text>
</svg>


**Worked example.** Insert 42 after the node holding 7 in the list `3 → 7 → 99`:

1. Allocate new node: `new = Node(42, next = NULL)`
2. `new.next = 7.next` → `new.next` points to node(99)
3. `7.next = new` → node(7).next now points to node(42)

Result: `3 → 7 → 42 → 99`. Three pointer writes, $`O(1)`.

**Cache locality.** Each node is a separate heap allocation, so iteration causes a cache miss per node (unless the allocator happens to place them adjacently). This is the fundamental trade-off: linked lists buy $`O(1)` splice at the cost of spatial locality. They are preferred when:
- Frequent insertion/deletion at arbitrary positions (e.g., an editor's undo buffer).
- The collection is small and the pointer overhead is negligible.
- A memory pool or arena allocator is used to improve locality.

In practice, most general-purpose containers (Java `ArrayList`, C++ `std::vector`) prefer arrays over linked lists. See [Memory Management](../../Programming/Memory-Management.md) for the heap allocation model that makes linked lists expensive, and [CLRS, Ch. 10 (Elementary Data Structures)](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/) for the pointer-relinking analysis.

**Example problem.**

<details><summary>Problem</summary>

You have a singly linked list of 1000 nodes. What is the cost of deleting the node at position 500? What about a doubly linked list?

<details><summary>Solution</summary>

Singly: $`O(n)` — you must walk from the head to position 499 to get the predecessor, then relink. Cost ≈ 500 pointer dereferences.

Doubly: still $`O(n)` to *find* position 500 (no random access), but once you have the node, deletion is $`O(1)` (relink `prev.next` and `next.prev`). The savings are only in the deletion step itself, not the search.

</details>

</details>

</details>

## Stacks, Queues, and Deques

These are *restricted access patterns* layered on top of any of the structures above. They expose only the ends of the sequence, giving $`O(1)` for every operation regardless of the underlying representation.

<table>
<tr><th>Structure</th><th>Access pattern</th><th>Push / Enqueue</th><th>Pop / Dequeue</th><th>Peek</th></tr>
<tr><td>Stack</td><td>LIFO (last-in, first-out)</td><td><i>O</i>(1)</td><td><i>O</i>(1)</td><td><i>O</i>(1)</td></tr>
<tr><td>Queue</td><td>FIFO (first-in, first-out)</td><td><i>O</i>(1)</td><td><i>O</i>(1)</td><td><i>O</i>(1)</td></tr>
<tr><td>Deque</td><td>Both ends</td><td><i>O</i>(1)</td><td><i>O</i>(1)</td><td><i>O</i>(1)</td></tr>
</table>

<details><summary>Details</summary>

**Stack (LIFO).** The most recent element is the first removed. Implementations: an array with a `top` index (push = write at `top`, pop = read and decrement), or a singly linked list where the head is the top. Typical uses: call-stack management, expression evaluation, DFS traversal (see [Graphs](./Graphs.md)), undo/redo buffers.

**Worked example (stack).** Push 3, 7, 1; pop; push 9; pop:

<table>
<tr><th>Step</th><th>Operation</th><th>Stack (top → bottom)</th></tr>
<tr><td>1</td><td>push 3</td><td>[3]</td></tr>
<tr><td>2</td><td>push 7</td><td>[7, 3]</td></tr>
<tr><td>3</td><td>push 1</td><td>[1, 7, 3]</td></tr>
<tr><td>4</td><td>pop → 1</td><td>[7, 3]</td></tr>
<tr><td>5</td><td>push 9</td><td>[9, 7, 3]</td></tr>
<tr><td>6</td><td>pop → 9</td><td>[7, 3]</td></tr>
</table>

**Queue (FIFO).** The oldest element is the first removed. Implementations: a circular buffer (array with `head` and `tail` indices that wrap around), or two stacks (enqueue on one, dequeue from the other, amortized $`O(1)`). Typical uses: BFS traversal (see [Graphs](./Graphs.md)), task scheduling, I/O buffering, message passing.

**Worked example (queue, circular buffer of size 4).**

<table>
<tr><th>Step</th><th>Operation</th><th>Buffer [0..3]</th><th>head</th><th>tail</th></tr>
<tr><td>1</td><td>enqueue 10</td><td>[10, _, _, _]</td><td>0</td><td>1</td></tr>
<tr><td>2</td><td>enqueue 20</td><td>[10, 20, _, _]</td><td>0</td><td>2</td></tr>
<tr><td>3</td><td>dequeue → 10</td><td>[_, 20, _, _]</td><td>1</td><td>2</td></tr>
<tr><td>4</td><td>enqueue 30</td><td>[_, 20, 30, _]</td><td>1</td><td>3</td></tr>
<tr><td>5</td><td>dequeue → 20</td><td>[_, _, 30, _]</td><td>2</td><td>3</td></tr>
<tr><td>6</td><td>enqueue 40</td><td>[_, _, 30, 40]</td><td>2</td><td>0 (wrap)</td></tr>
</table>

**Deque (double-ended queue).** Supports push/pop at both ends in $`O(1)`. Implementations: a circular buffer with room for one extra slot (to distinguish full from empty), or a block list (array of fixed-size blocks, each pointing to the next/previous block). Typical uses: sliding-window maximum, BFS with backtracking, undo with both directions.

**Relationship to other structures.** A stack is a vector with only `push_back`/`pop_back` exposed. A queue is a vector (or circular buffer) with `push_back`/`pop_front`. A deque is a vector with both ends exposed. The restriction is purely on the *interface*, not the implementation. See [CLRS, Ch. 10 (Elementary Data Structures)](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/) for the standard stack/queue/deque definitions.

**Example problem.**

<details><summary>Problem</summary>

Design a queue using two stacks such that each element is moved at most twice over its lifetime. What is the amortized cost of `enqueue` and `dequeue`?

<details><summary>Solution</summary>

Maintain `in_stack` and `out_stack`. `enqueue(x)`: push onto `in_stack`. `dequeue()`: if `out_stack` is empty, pop all elements from `in_stack` and push them onto `out_stack` (reversing order). Then pop from `out_stack`. Each element is pushed/popped at most twice (once into `in_stack`, once into `out_stack`), so the amortized cost per operation is $`O(1)`.

</details>

</details>

</details>

## Bloom filters

A Bloom filter is a space-efficient *probabilistic* set-membership test built on a bit array (a list of bits). It answers "is element $`x` in the set?" with no false negatives but a tunable false-positive rate.

A Bloom filter repurposes the simplest list — a bit array — as a probabilistic oracle, illustrating how the array primitive underlies even non-sequential data structures.

- $`k` independent hash functions map each element to $`k` bits in a bit array of size $`m`.
- **Insert**: set $`k` bits. $`O(k)`.
- **Query**: all $`k` bits set → "maybe present"; any bit clear → "definitely absent". $`O(k)`.
- False positive rate: $`\varepsilon \approx (1 - e^{-kn/m})^k`.
- No false negatives. No deletion (unless using a counting Bloom filter).

<details><summary>Details</summary>

**How it works.** Each element is hashed $`k` times, producing $`k` bit positions in the array. Insertion sets those bits. A query checks whether all $`k` positions are set. As more elements are inserted, bits collide and the false-positive rate rises.

<svg viewBox="0 0 440 132" width="100%" style="max-width:470px;display:block;margin:8px auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
  <circle cx="80" cy="18" r="12" fill="#e94560"/>
  <text x="80" y="22" fill="#fff" font-size="12" text-anchor="middle">A</text>
  <circle cx="210" cy="18" r="12" fill="#4ecdc4"/>
  <text x="210" y="22" fill="#1a1a2e" font-size="12" text-anchor="middle">B</text>
  <circle cx="340" cy="18" r="12" fill="#ffd700"/>
  <text x="340" y="22" fill="#1a1a2e" font-size="12" text-anchor="middle">C</text>
  <line x1="80" y1="30" x2="74" y2="88" stroke="#e94560" stroke-width="1.5"/>
  <line x1="80" y1="30" x2="204" y2="88" stroke="#e94560" stroke-width="1.5"/>
  <line x1="80" y1="30" x2="308" y2="88" stroke="#e94560" stroke-width="1.5"/>
  <line x1="210" y1="30" x2="126" y2="88" stroke="#4ecdc4" stroke-width="1.5"/>
  <line x1="210" y1="30" x2="204" y2="88" stroke="#4ecdc4" stroke-width="1.5"/>
  <line x1="210" y1="30" x2="360" y2="88" stroke="#4ecdc4" stroke-width="1.5"/>
  <line x1="340" y1="30" x2="74" y2="88" stroke="#ffd700" stroke-width="1.5"/>
  <line x1="340" y1="30" x2="256" y2="88" stroke="#ffd700" stroke-width="1.5"/>
  <line x1="340" y1="30" x2="360" y2="88" stroke="#ffd700" stroke-width="1.5"/>
  <rect x="10" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <rect x="36" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <rect x="62" y="90" width="24" height="26" fill="#e94560" stroke="#e94560"/>
  <rect x="88" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <rect x="114" y="90" width="24" height="26" fill="#e94560" stroke="#e94560"/>
  <rect x="140" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <rect x="166" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <rect x="192" y="90" width="24" height="26" fill="#e94560" stroke="#e94560"/>
  <rect x="218" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <rect x="244" y="90" width="24" height="26" fill="#e94560" stroke="#e94560"/>
  <rect x="270" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <rect x="296" y="90" width="24" height="26" fill="#e94560" stroke="#e94560"/>
  <rect x="322" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <rect x="348" y="90" width="24" height="26" fill="#e94560" stroke="#e94560"/>
  <rect x="374" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <rect x="400" y="90" width="24" height="26" fill="#1a1a2e" stroke="#333"/>
  <text x="22" y="130" fill="#a0a0c0" font-size="9" text-anchor="middle">0</text>
  <text x="74" y="130" fill="#a0a0c0" font-size="9" text-anchor="middle">2</text>
  <text x="126" y="130" fill="#a0a0c0" font-size="9" text-anchor="middle">4</text>
  <text x="204" y="130" fill="#a0a0c0" font-size="9" text-anchor="middle">7</text>
  <text x="256" y="130" fill="#a0a0c0" font-size="9" text-anchor="middle">9</text>
  <text x="308" y="130" fill="#a0a0c0" font-size="9" text-anchor="middle">11</text>
  <text x="360" y="130" fill="#a0a0c0" font-size="9" text-anchor="middle">13</text>
  <text x="412" y="130" fill="#a0a0c0" font-size="9" text-anchor="middle">15</text>
</svg>


**Worked example.** Bit array of $`m = 16` bits, $`k = 3` hash functions. Insert elements A, B, C:

<table>
<tr><th>Element</th><th>h₁</th><th>h₂</th><th>h₃</th><th>Bits set</th></tr>
<tr><td>A</td><td>2</td><td>7</td><td>11</td><td>positions 2, 7, 11</td></tr>
<tr><td>B</td><td>4</td><td>7</td><td>13</td><td>positions 4, 7, 13</td></tr>
<tr><td>C</td><td>2</td><td>9</td><td>13</td><td>positions 2, 9, 13</td></tr>
</table>

Array after inserts: `[0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0]`

Query D (hashes to positions 2, 7, 14): position 14 is 0 → **definitely absent**. ✓
Query E (hashes to positions 2, 7, 13): all set → **maybe present** (false positive if E was never inserted).

**Optimal parameters.** For $`n` elements and target FPR $`\varepsilon`:

```math
m = \frac{-n \ln \varepsilon}{(\ln 2)^2} \approx 1.44 \, n \log_2(1/\varepsilon)
```

```math
k = \frac{m}{n} \ln 2
```

For 10M elements at 1% FPR: $`m \approx 9.6` bits per element, total $`\approx 96` million bits $`\approx 12` MB.

**Uses.** Cache filtering (avoid disk lookups for missing keys), deduplication (web crawlers), distributed systems (Cassandra's bloom filter on SSTables — see [Key-Value Stores](./Key-Value-Stores.md)), and network packet filtering.

**Counting Bloom filters** replace bits with small counters (typically 4 bits), enabling deletion at the cost of 4× space.

> **Authoritative source**
> - [Burton H. Bloom, "Space/Time Trade-offs in Hash Coding with Allowable Errors," CACM 13(7):422–426, 1970](https://dl.acm.org/doi/10.1145/362686.362692)


**Example problem.**

<details><summary>Problem</summary>

You need a membership test for 100 million URLs (average 64 bytes) with at most 1% false positive rate and no false negatives. What is the minimum memory footprint?

<details><summary>Solution</summary>

A Bloom filter with $`n = 10^8` and $`\varepsilon = 0.01`:

```math
m = \frac{-n \ln \varepsilon}{(\ln 2)^2} = \frac{-10^8 \times (-4.605)}{0.480} \approx 9.59 \times 10^8 \text{ bits} \approx 120 \text{ MB}
```

```math
k = \frac{m}{n} \ln 2 \approx 9.59 \times 0.693 \approx 6.6 \;\Rightarrow\; k = 7
```

Total: **≈ 120 MB** for 100M URLs, versus 6.4 GB for storing the full URLs. The 1% FPR means 1M false positives per 100M queries — acceptable for a web crawler's "already seen" check.

</details>

</details>

</details>

## Comparison

<table>
<tr><th>Structure</th><th>Random access</th><th>Search by value</th><th>Insert at pos <i>i</i></th><th>Delete at pos <i>i</i></th><th>Space overhead</th><th>Cache behavior</th></tr>
<tr><td>Array</td><td><i>O</i>(1)</td><td><i>O</i>(<i>n</i>)</td><td><i>O</i>(<i>n</i>)</td><td><i>O</i>(<i>n</i>)</td><td>None</td><td>Excellent (contiguous)</td></tr>
<tr><td>Vector</td><td><i>O</i>(1)</td><td><i>O</i>(<i>n</i>) / <i>O</i>(log <i>n</i>) sorted</td><td><i>O</i>(<i>n</i>)</td><td><i>O</i>(<i>n</i>)</td><td>≤ <i>c</i>·<i>n</i> (capacity)</td><td>Excellent (contiguous)</td></tr>
<tr><td>Linked list</td><td><i>O</i>(<i>n</i>)</td><td><i>O</i>(<i>n</i>)</td><td><i>O</i>(1) at known node</td><td><i>O</i>(1) at known node</td><td>8–16 B/node (pointers)</td><td>Poor (pointer chasing)</td></tr>
<tr><td>Stack</td><td><i>O</i>(1) top only</td><td><i>O</i>(<i>n</i>)</td><td><i>O</i>(1) top</td><td><i>O</i>(1) top</td><td>Depends on backing</td><td>Depends on backing</td></tr>
<tr><td>Queue</td><td><i>O</i>(1) ends only</td><td><i>O</i>(<i>n</i>)</td><td><i>O</i>(1) tail</td><td><i>O</i>(1) head</td><td>Depends on backing</td><td>Depends on backing</td></tr>
<tr><td>Deque</td><td><i>O</i>(1) ends only</td><td><i>O</i>(<i>n</i>)</td><td><i>O</i>(1) either end</td><td><i>O</i>(1) either end</td><td>Depends on backing</td><td>Depends on backing</td></tr>
<tr><td>Bloom filter</td><td><i>O</i>(1) per bit</td><td><i>O</i>(<i>k</i>) membership</td><td><i>O</i>(<i>k</i>)</td><td>Not supported (counting: <i>O</i>(<i>k</i>))</td><td><i>m</i> bits (no element storage)</td><td>Good (bit array)</td></tr>
</table>

## Interactive simulation

<iframe src="./Lists.simulation.html" title="Interactive visualization of list data structures"></iframe>

## Quizz

<details><summary>Example problem</summary>

**Problem.** You are building a text editor with an undo/redo system. The user can type (push), undo (pop), and redo (re-push). You also need to support "jump to line 500" (random access). Which combination of data structures would you use, and why?

<details><summary>Solution</summary>

Use a **vector** for the document text (random access to line 500 in $`O(1)`, and $`O(1)` amortized append for typing). Maintain a **stack** of undo operations (each entry records what to revert) and a **stack** of redo operations. Typing pushes onto the undo stack and clears the redo stack. Undo pops from the undo stack and pushes onto the redo stack. Redo does the reverse.

Why not a linked list for the document? Random access to line 500 would be $`O(n)`, and the pointer overhead per character/word would be prohibitive. Why not a plain array? The document grows and shrinks; a vector handles that with amortized $`O(1)` append.

The undo/redo stacks could be backed by the same vector (using a `top` index) or by a separate vector of operation records. The key insight: the *access pattern* (LIFO for undo/redo, random access for the document) dictates the structure choice.

</details>

</details>
