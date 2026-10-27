# Graphs

Graphs model arbitrary connectivity between entities: social networks, road maps, dependency graphs, circuits. They are relevant whenever the relationship between items is not a simple hierarchy or key-value mapping but an arbitrary set of edges.

The generalization chain is: a **tree** is a connected acyclic graph; a **DAG** (directed acyclic graph) generalizes a tree by allowing multiple parents; a **general graph** allows arbitrary cycles and multi-edges. Every structure that is a tree or DAG is also a graph, so graph algorithms subsume tree and DAG algorithms.

> **Authoritative sources**
> - [Introduction to Algorithms (CLRS), Ch. 22–26](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/)
> - [Networks (Barabási)](https://www.penguinrandomhouse.com/books/15576/networks-by-alfred-l-barabasi/)

## Definitions

A graph $`G = (V, E)` has a set of vertices $`V` and a set of edges $`E`.

- **Directed** (digraph): each edge is an ordered pair $`(u, v)`, written $`u \to v`. The edge $`u \to v` does not imply $`v \to u`.
- **Undirected**: each edge is an unordered pair $`\{u, v\}`, written $`uv`. The edge $`uv` is the same as $`vu`.
- **Weighted**: each edge carries a numeric weight $`w(u,v) \geq 0` (or possibly negative).
- **Simple**: no self-loops, no parallel (multi-)edges.
- **DAG**: a directed graph with no directed cycles.

Every algorithm below behaves differently for directed vs. undirected graphs: topological sort applies only to DAGs, cycle detection differs (back edges in DFS for directed; any non-tree edge for undirected), and MST is defined only for undirected graphs.

## Representation

A graph $`G = (V, E)` with $`|V| = n`, $`|E| = m`:

<table>
<tr><th>Representation</th><th>Space</th><th>Edge query</th><th>Iterate neighbors</th></tr>
<tr><td>Adjacency list</td><td><i>O</i>(<i>n</i> + <i>m</i>)</td><td><i>O</i>(deg(<i>v</i>))</td><td><i>O</i>(deg(<i>v</i>))</td></tr>
<tr><td>Adjacency matrix</td><td><i>O</i>(<i>n</i><sup>2</sup>)</td><td><i>O</i>(1)</td><td><i>O</i>(<i>n</i>)</td></tr>
<tr><td>Hash set of edges</td><td><i>O</i>(<i>n</i> + <i>m</i>)</td><td><i>O</i>(1) expected</td><td><i>O</i>(deg(<i>v</i>))</td></tr>
</table>

<details><summary>Details</summary>

**Adjacency list**: an array of lists (or vectors). Best for sparse graphs ($`m \ll n^2`). The standard choice for most algorithms. Each list is a [List](./Lists.md) structure.

**Adjacency matrix**: a 2D boolean array. Best for dense graphs or when edge queries are frequent. Supports fast matrix multiplication for transitive closure: the naive algorithm is $`O(n^3)`; Strassen's divide-and-conquer gives $`O(n^{\log_2 7}) \approx O(n^{2.807})`; the best-known algorithms achieve $`O(n^{\omega})` with $`\omega < 2.373`.

**Edge list**: a flat array of (u, v, weight) tuples. Compact, good for external-memory algorithms and GPU parallelism.

**Complexity context**: the Big-O bounds above are analyzed in the framework of [Computability and Complexity Classes](../Computability-and-Complexity-Classes.md), which defines time and space complexity and complexity classes.

</details>

## Traversal: BFS and DFS

**BFS** (Breadth-First Search): explore level by level using a queue.
- **Time**: $`O(n + m)`.
- **Finds**: shortest paths in unweighted graphs, connected components, cycle detection (in undirected graphs).

**DFS** (Depth-First Search): explore as deep as possible using a stack (or recursion).
- **Time**: $`O(n + m)`.
- **Finds**: connected components, cycle detection, topological order, articulation points, biconnected components.

<details><summary>Details</summary>

**BFS**: maintain a queue. Start from source $`s`, mark visited, enqueue neighbors. The first time a vertex is dequeued, the path to it is shortest (in edge count).

**Worked example** — BFS on a 6-node graph:

Consider the undirected graph with edges: 0-1, 0-2, 1-3, 2-4, 3-4, 4-5. Start from node 0.

<table>
<tr><th>Step</th><th>Dequeue</th><th>Queue (front→back)</th><th>Visited</th><th>Distances</th></tr>
<tr><td>0</td><td>—</td><td>[0]</td><td>{0}</td><td>d(0)=0</td></tr>
<tr><td>1</td><td>0</td><td>[1, 2]</td><td>{0,1,2}</td><td>d(1)=1, d(2)=1</td></tr>
<tr><td>2</td><td>1</td><td>[2, 3]</td><td>{0,1,2,3}</td><td>d(3)=2</td></tr>
<tr><td>3</td><td>2</td><td>[3, 4]</td><td>{0,1,2,3,4}</td><td>d(4)=2</td></tr>
<tr><td>4</td><td>3</td><td>[4]</td><td>{0,1,2,3,4}</td><td>(4 already visited)</td></tr>
<tr><td>5</td><td>4</td><td>[5]</td><td>{0,1,2,3,4,5}</td><td>d(5)=3</td></tr>
<tr><td>6</td><td>5</td><td>[]</td><td>{0,1,2,3,4,5}</td><td>(done)</td></tr>
</table>

The BFS levels are:

<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="200" cy="30" r="18" fill="#0f3460" stroke="#e94560" stroke-width="2"/>
  <text x="200" y="35" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">0</text>
  <circle cx="120" cy="90" r="18" fill="#16213e" stroke="#4ecdc4" stroke-width="2"/>
  <text x="120" y="95" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">1</text>
  <circle cx="280" cy="90" r="18" fill="#16213e" stroke="#4ecdc4" stroke-width="2"/>
  <text x="280" y="95" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">2</text>
  <circle cx="60" cy="150" r="18" fill="#1a1a2e" stroke="#ffd700" stroke-width="2"/>
  <text x="60" y="155" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">3</text>
  <circle cx="200" cy="150" r="18" fill="#1a1a2e" stroke="#ffd700" stroke-width="2"/>
  <text x="200" y="155" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">4</text>
  <circle cx="340" cy="150" r="18" fill="#1a1a2e" stroke="#ff6b6b" stroke-width="2"/>
  <text x="340" y="155" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">5</text>
  <line x1="200" y1="48" x2="120" y2="72" stroke="#555" stroke-width="1.5"/>
  <line x1="200" y1="48" x2="280" y2="72" stroke="#555" stroke-width="1.5"/>
  <line x1="120" y1="108" x2="60" y2="132" stroke="#555" stroke-width="1.5"/>
  <line x1="280" y1="108" x2="200" y2="132" stroke="#555" stroke-width="1.5"/>
  <line x1="120" y1="108" x2="200" y2="132" stroke="#555" stroke-width="1.5"/>
  <line x1="200" y1="168" x2="340" y2="150" stroke="#555" stroke-width="1.5"/>
  <text x="30" y="35" fill="#888" font-size="11" font-family="sans-serif">level 0</text>
  <text x="30" y="95" fill="#888" font-size="11" font-family="sans-serif">level 1</text>
  <text x="30" y="155" fill="#888" font-size="11" font-family="sans-serif">level 2</text>
  <text x="370" y="155" fill="#888" font-size="11" font-family="sans-serif">level 3</text>
</svg>

**DFS**: maintain a stack (or call stack). Three states per vertex: white (unvisited), gray (in progress), black (done). A back edge (to a gray vertex) indicates a cycle in a directed graph; in an undirected graph, any edge to an already-visited vertex that is not the parent indicates a cycle.

**Topological sort** (Kahn's algorithm): repeatedly remove vertices with in-degree 0. $`O(n + m)`. Fails (detects a cycle) if not all vertices are removed. Used in build systems (make, Bazel), dependency resolution (npm, cargo), and course scheduling.

**Interactive visualization**: see the [Graphs simulation](./Graphs.simulation.html) for animated BFS, DFS, and Dijkstra.

</details>

## Shortest paths

**Dijkstra's algorithm**: single-source shortest paths in graphs with non-negative edge weights.
- **Time**: $`O((n + m) \log n)` with a binary heap ($`O(\log n)` per extract-min and decrease-key).
- **Correctness**: greedy — the vertex with the smallest tentative distance is finalized.

**Bellman-Ford**: handles negative weights (but not negative cycles).
- **Time**: $`O(nm)`.

**A\***: Dijkstra + a heuristic $`h(v)`.
- **Time**: $`O(b^d)` in the worst case, but much faster in practice when $`h` is informative.
- **Optimality**: A* is optimal when $`h` is **admissible**: $`h(v) \leq d^*(v, t)` for all $`v`, where $`d^*(v, t)` is the true shortest distance from $`v` to the target $`t`.
- **Efficiency**: if $`h` is additionally **consistent** (a.k.a. monotone): $`h(u) \leq c(u,v) + h(v)` for every edge $(u,v)$, then each node is expanded at most once, and the algorithm terminates without re-opening nodes. Consistency implies admissibility.

<details><summary>Details</summary>

**Dijkstra**: maintain a priority queue of (distance, vertex). Pop the minimum, relax its outgoing edges. Each vertex is finalized once. The binary heap gives $`O(\log n)` per extract-min and $`O(\log n)` per decrease-key.

**Worked example** — Dijkstra on a 5-node weighted graph:

Edges: A→B (4), A→C (2), B→C (1), B→D (5), C→D (8), C→E (10), D→E (2). Source: A.

<table>
<tr><th>Iteration</th><th>Extract-min</th><th>Relax edges</th><th>PQ state (dist, node)</th></tr>
<tr><td>1</td><td>A (0)</td><td>A→B: d(B)=4; A→C: d(C)=2</td><td>[(2,C), (4,B)]</td></tr>
<tr><td>2</td><td>C (2)</td><td>C→D: d(D)=10; C→E: d(E)=12; C→B: 2+1=3 &lt; 4 → d(B)=3</td><td>[(3,B), (10,D), (12,E)]</td></tr>
<tr><td>3</td><td>B (3)</td><td>B→D: 3+5=8 &lt; 10 → d(D)=8; B→C: already finalized</td><td>[(8,D), (12,E)]</td></tr>
<tr><td>4</td><td>D (8)</td><td>D→E: 8+2=10 &lt; 12 → d(E)=10</td><td>[(10,E)]</td></tr>
<tr><td>5</td><td>E (10)</td><td>(no outgoing edges)</td><td>[]</td></tr>
</table>

Shortest distances from A: d(A)=0, d(B)=3, d(C)=2, d(D)=8, d(E)=10.

<svg width="420" height="220" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="110" r="20" fill="#0f3460" stroke="#e94560" stroke-width="2"/>
  <text x="60" y="115" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">A</text>
  <circle cx="200" cy="50" r="20" fill="#16213e" stroke="#4ecdc4" stroke-width="2"/>
  <text x="200" y="55" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">B</text>
  <circle cx="200" cy="170" r="20" fill="#16213e" stroke="#4ecdc4" stroke-width="2"/>
  <text x="200" y="175" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">C</text>
  <circle cx="340" cy="50" r="20" fill="#1a1a2e" stroke="#ffd700" stroke-width="2"/>
  <text x="340" y="55" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">D</text>
  <circle cx="340" cy="170" r="20" fill="#1a1a2e" stroke="#ff6b6b" stroke-width="2"/>
  <text x="340" y="175" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">E</text>
  <line x1="78" y1="100" x2="182" y2="58" stroke="#555" stroke-width="1.5"/>
  <text x="120" y="72" fill="#aaa" font-size="11" font-family="monospace">4</text>
  <line x1="78" y1="120" x2="182" y2="162" stroke="#555" stroke-width="1.5"/>
  <text x="120" y="150" fill="#aaa" font-size="11" font-family="monospace">2</text>
  <line x1="200" y1="70" x2="200" y2="150" stroke="#555" stroke-width="1.5"/>
  <text x="208" y="112" fill="#aaa" font-size="11" font-family="monospace">1</text>
  <line x1="218" y1="58" x2="322" y2="50" stroke="#555" stroke-width="1.5"/>
  <text x="265" y="45" fill="#aaa" font-size="11" font-family="monospace">5</text>
  <line x1="218" y1="162" x2="322" y2="58" stroke="#555" stroke-width="1.5"/>
  <text x="280" y="105" fill="#aaa" font-size="11" font-family="monospace">8</text>
  <line x1="218" y1="178" x2="322" y2="170" stroke="#555" stroke-width="1.5"/>
  <text x="265" y="185" fill="#aaa" font-size="11" font-family="monospace">10</text>
  <line x1="340" y1="70" x2="340" y2="150" stroke="#555" stroke-width="1.5"/>
  <text x="348" y="112" fill="#aaa" font-size="11" font-family="monospace">2</text>
  <line x1="78" y1="120" x2="182" y2="162" stroke="#4ecdc4" stroke-width="3" opacity="0.6"/>
  <line x1="218" y1="162" x2="322" y2="58" stroke="#4ecdc4" stroke-width="3" opacity="0.6"/>
  <line x1="340" y1="70" x2="340" y2="150" stroke="#4ecdc4" stroke-width="3" opacity="0.6"/>
  <text x="60" y="210" fill="#4ecdc4" font-size="11" font-family="sans-serif">Shortest path A→C→D→E (cost 10)</text>
</svg>

**Floyd-Warshall**: all-pairs shortest paths in $`O(n^3)`. Dynamic programming over the set of allowed intermediate vertices.

**A\***: the heuristic $`h(v)` estimates the remaining cost to the target. In a grid, Manhattan distance is admissible. In a road network, the crow-fly (Euclidean) distance is admissible. A* is the basis of GPS navigation and game pathfinding.

See also [Learning Paradigms and Models](../Learning-Paradigms-and-Models.md) for the RL framing of shortest-path problems.

</details>

## Minimum spanning trees

An **MST** of a weighted connected undirected graph is a tree spanning all vertices with minimum total edge weight.

**Kruskal's algorithm**: sort edges by weight; add an edge if it doesn't form a cycle (union-find).
- **Time**: $`O(m \log m)`.

**Prim's algorithm**: grow the tree from a root; at each step, add the cheapest edge crossing the cut.
- **Time**: $`O(m \log n)` with a binary heap.

<details><summary>Details</summary>

**Union-Find** (disjoint set union): supports `make-set`, `find`, `union` in $`O(\alpha(n))` amortized per operation (inverse Ackermann, effectively constant). Path compression + union by rank.

**Cut property**: for any cut of the graph, the minimum-weight edge crossing the cut is in some MST. Both Kruskal and Prim exploit this property.

**Worked example** — Kruskal on a 6-node weighted graph:

Edges (sorted by weight): AB(1), BC(2), CD(3), DE(4), EF(5), AC(6), BE(7), DF(8).

<table>
<tr><th>Step</th><th>Edge considered</th><th>Weight</th><th>Union-Find sets</th><th>Action</th></tr>
<tr><td>1</td><td>AB</td><td>1</td><td>{A,B}, {C}, {D}, {E}, {F}</td><td>Add (no cycle)</td></tr>
<tr><td>2</td><td>BC</td><td>2</td><td>{A,B,C}, {D}, {E}, {F}</td><td>Add (no cycle)</td></tr>
<tr><td>3</td><td>CD</td><td>3</td><td>{A,B,C,D}, {E}, {F}</td><td>Add (no cycle)</td></tr>
<tr><td>4</td><td>DE</td><td>4</td><td>{A,B,C,D,E}, {F}</td><td>Add (no cycle)</td></tr>
<tr><td>5</td><td>EF</td><td>5</td><td>{A,B,C,D,E,F}</td><td>Add (no cycle)</td></tr>
<tr><td>6</td><td>AC</td><td>6</td><td>{A,B,C,D,E,F}</td><td>Skip (cycle)</td></tr>
<tr><td>7</td><td>BE</td><td>7</td><td>{A,B,C,D,E,F}</td><td>Skip (cycle)</td></tr>
<tr><td>8</td><td>DF</td><td>8</td><td>{A,B,C,D,E,F}</td><td>Skip (cycle)</td></tr>
</table>

MST edges: AB, BC, CD, DE, EF. Total weight: 1+2+3+4+5 = 15.

<svg width="380" height="220" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="18" fill="#0f3460" stroke="#e94560" stroke-width="2"/>
  <text x="60" y="65" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">A</text>
  <circle cx="180" cy="40" r="18" fill="#16213e" stroke="#4ecdc4" stroke-width="2"/>
  <text x="180" y="45" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">B</text>
  <circle cx="300" cy="60" r="18" fill="#16213e" stroke="#4ecdc4" stroke-width="2"/>
  <text x="300" y="65" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">C</text>
  <circle cx="60" cy="160" r="18" fill="#1a1a2e" stroke="#ffd700" stroke-width="2"/>
  <text x="60" y="165" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">D</text>
  <circle cx="180" cy="180" r="18" fill="#1a1a2e" stroke="#ffd700" stroke-width="2"/>
  <text x="180" y="185" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">E</text>
  <circle cx="300" cy="160" r="18" fill="#1a1a2e" stroke="#ff6b6b" stroke-width="2"/>
  <text x="300" y="165" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">F</text>
  <line x1="76" y1="55" x2="164" y2="44" stroke="#4ecdc4" stroke-width="3"/>
  <text x="115" y="42" fill="#4ecdc4" font-size="10" font-family="monospace">1</text>
  <line x1="196" y1="44" x2="284" y2="55" stroke="#4ecdc4" stroke-width="3"/>
  <text x="235" y="42" fill="#4ecdc4" font-size="10" font-family="monospace">2</text>
  <line x1="300" y1="78" x2="300" y2="142" stroke="#4ecdc4" stroke-width="3"/>
  <text x="308" y="112" fill="#4ecdc4" font-size="10" font-family="monospace">3</text>
  <line x1="76" y1="165" x2="164" y2="176" stroke="#4ecdc4" stroke-width="3"/>
  <text x="115" y="178" fill="#4ecdc4" font-size="10" font-family="monospace">4</text>
  <line x1="196" y1="176" x2="284" y2="165" stroke="#4ecdc4" stroke-width="3"/>
  <text x="235" y="178" fill="#4ecdc4" font-size="10" font-family="monospace">5</text>
  <line x1="60" y1="78" x2="60" y2="142" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="180" y1="58" x2="180" y2="162" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="300" y1="78" x2="300" y2="142" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="60" y="210" fill="#4ecdc4" font-size="11" font-family="sans-serif">MST (solid) vs. rejected edges (dashed)</text>
</svg>

**Applications**: network design (minimize cable length), clustering (single-linkage), image segmentation (minimum spanning tree of a pixel graph), and approximation algorithms (Christofides: MST gives a 1.5-approximation for TSP).

</details>

## Network flows

A **flow network** is a directed graph with a source $`s`, a sink $`t`, and a capacity $`c(u,v) \geq 0` on each edge. A **flow** assigns a value $`f(u,v)` to each edge such that:
- **Capacity constraint**: $`0 \leq f(u,v) \leq c(u,v)`.
- **Flow conservation**: for every vertex $`v \neq s, t`, the inflow equals the outflow: $`\sum_{u} f(u,v) = \sum_{w} f(v,w)`.

The **max-flow problem** finds the maximum value of flow from $`s` to $`t`.

**Ford-Fulkerson method**: repeatedly find an augmenting path in the residual graph and push flow along it.
- **Time**: $`O(m \cdot F)` where $`F` is the max flow value (pseudo-polynomial; can be slow with irrational capacities).

**Edmonds-Karp**: Ford-Fulkerson with BFS to find the shortest augmenting path.
- **Time**: $`O(VE^2)` (polynomial).

**Max-flow min-cut theorem**: the maximum flow value equals the minimum cut capacity. A **cut** $(S, T)$ partitions vertices with $`s \in S`, $`t \in T`; its capacity is $\sum_{u \in S, v \in T} c(u,v)$.

<details><summary>Details</summary>

**Residual graph**: after pushing flow, the residual graph has forward edges with residual capacity $`c(u,v) - f(u,v)` and backward edges with capacity $`f(u,v)` (allowing "undo"). An augmenting path is any $`s \to t` path in the residual graph.

**Worked example** — Ford-Fulkerson on a small network:

Nodes: s, a, b, t. Edges and capacities: s→a (3), s→b (2), a→b (1), a→t (2), b→t (3).

<table>
<tr><th>Iteration</th><th>Augmenting path</th><th>Bottleneck</th><th>Flow pushed</th><th>Residual capacities</th></tr>
<tr><td>1</td><td>s→a→t</td><td>min(3,2)=2</td><td>2</td><td>s→a:1, a→t:0, s→b:2, a→b:1, b→t:3</td></tr>
<tr><td>2</td><td>s→b→t</td><td>min(2,3)=2</td><td>2</td><td>s→a:1, s→b:0, a→b:1, b→t:1</td></tr>
<tr><td>3</td><td>s→a→b→t</td><td>min(1,1,1)=1</td><td>1</td><td>s→a:0, a→b:0, b→t:0</td></tr>
</table>

No more augmenting paths exist. Max flow = 2 + 2 + 1 = **5**.

The min cut is $`S = \{s, a, b\}`, $`T = \{t\}`: capacity = c(a,t) + c(b,t) = 2 + 3 = 5. ✓

<svg width="380" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="100" r="20" fill="#0f3460" stroke="#e94560" stroke-width="2"/>
  <text x="50" y="105" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">s</text>
  <circle cx="170" cy="50" r="20" fill="#16213e" stroke="#4ecdc4" stroke-width="2"/>
  <text x="170" y="55" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">a</text>
  <circle cx="170" cy="150" r="20" fill="#16213e" stroke="#4ecdc4" stroke-width="2"/>
  <text x="170" y="155" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">b</text>
  <circle cx="320" cy="100" r="20" fill="#1a1a2e" stroke="#ffd700" stroke-width="2"/>
  <text x="320" y="105" text-anchor="middle" fill="#fff" font-size="13" font-family="monospace">t</text>
  <line x1="68" y1="90" x2="152" y2="58" stroke="#4ecdc4" stroke-width="2.5"/>
  <text x="95" y="65" fill="#aaa" font-size="11" font-family="monospace">3/3</text>
  <line x1="68" y1="110" x2="152" y2="142" stroke="#4ecdc4" stroke-width="2.5"/>
  <text x="95" y="140" fill="#aaa" font-size="11" font-family="monospace">2/2</text>
  <line x1="170" y1="70" x2="170" y2="130" stroke="#555" stroke-width="1.5"/>
  <text x="178" y="105" fill="#aaa" font-size="11" font-family="monospace">1/1</text>
  <line x1="188" y1="58" x2="302" y2="92" stroke="#4ecdc4" stroke-width="2.5"/>
  <text x="240" y="68" fill="#aaa" font-size="11" font-family="monospace">2/2</text>
  <line x1="188" y1="142" x2="302" y2="108" stroke="#4ecdc4" stroke-width="2.5"/>
  <text x="240" y="140" fill="#aaa" font-size="11" font-family="monospace">3/3</text>
  <line x1="250" y1="20" x2="250" y2="180" stroke="#ff6b6b" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="255" y="30" fill="#ff6b6b" font-size="11" font-family="sans-serif">min cut (cap=5)</text>
  <text x="50" y="195" fill="#4ecdc4" font-size="11" font-family="sans-serif">flow/capacity on each edge</text>
</svg>

**Applications**:
- **Bipartite matching**: reduce to max-flow by adding a source connected to the left partition and a sink from the right partition, all with capacity 1.
- **Image segmentation**: the min-cut of a graph whose nodes are pixels and whose edge weights encode color similarity separates foreground from background (graph cuts).
- **Project scheduling**: the critical path in a project network is the longest path; the dual (min-cut) identifies the set of tasks whose delay would extend the project.
- **Transportation**: maximize throughput in a road or pipe network.

</details>

## Graph properties

Several structural properties classify a graph and determine which algorithms apply:

<table>
<tr><th>Property</th><th>Definition</th><th>Typical application</th></tr>
<tr><td>Bipartite</td><td>Vertices split into two sets; every edge crosses between sets (no odd cycle)</td><td>Scheduling, matching, map coloring (2-color)</td></tr>
<tr><td>Planar</td><td>Can be drawn in the plane with no edge crossings</td><td>Circuit routing, map coloring (4-color theorem), VLSI layout</td></tr>
<tr><td>Eulerian</td><td>Has a cycle that uses every edge exactly once (all vertices have even degree)</td><td>Route inspection (postal routes), network design</td></tr>
<tr><td>Hamiltonian</td><td>Has a cycle that visits every vertex exactly once</td><td>TSP, circuit design, scheduling</td></tr>
</table>

- **Bipartite** detection: BFS 2-coloring in $`O(n + m)`. If any edge connects two vertices of the same color, the graph is not bipartite.
- **Planarity**: tested in $`O(n)` time (Hopcroft–Tarjan). The 4-color theorem guarantees every planar graph is vertex-4-colorable.
- **Eulerian**: check that the graph is connected and every vertex has even degree (undirected) or in-degree = out-degree (directed).
- **Hamiltonian**: NP-complete in general; no known polynomial-time algorithm.

## Quizz

**Problem**: Given a directed graph with 500 nodes and 2000 weighted edges (all weights positive), find the shortest path from node 1 to node 500. Which algorithm do you choose and why?

<details><summary>Solution</summary>

**Choice**: Dijkstra's algorithm with a binary heap.

**Reasoning**:
1. All weights are positive → Dijkstra applies (Bellman-Ford is unnecessary).
2. The graph is sparse: $`m = 2000 \ll n^2 = 250{,}000` → adjacency list representation.
3. Time: $`O((n + m) \log n) = O(2500 \cdot \log 500) \approx 22{,}500` operations.
4. A* would be faster in practice if a good admissible heuristic is available (e.g., geographic distance for a road network), but without domain-specific structure, Dijkstra is the safe default.
5. Floyd-Warshall ($`O(n^3) = 125{,}000{,}000`) is overkill for a single-source query.

**If weights could be negative**: switch to Bellman-Ford, $`O(nm) = 1{,}000{,}000` operations.

**If the graph were undirected and unweighted**: BFS in $`O(n + m) = 2500` operations.

</details>

<iframe src="./Graphs.simulation.html" title="Interactive graph traversal: BFS, DFS, and Dijkstra animations"></iframe>