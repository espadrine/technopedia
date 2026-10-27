# SQL & Query Planning

**SQL** is a declarative, set-based language over relational algebra. The **query optimizer** translates a SQL statement into a concrete execution plan (a tree of operators) and the **executor** evaluates it. This page covers the compilation and execution of queries.

> **Authoritative sources**
> - [Database System Concepts, Ch. 11–12 (Silberschatz, Korth, Sudarshan)](https://www.db-book.com/)
> - [The PostgreSQL Query Planner](https://www.postgresql.org/docs/current/planner.html)

## SQL as relational algebra

A `SELECT … FROM … WHERE …` corresponds to $`\pi(\sigma(R))`; a `JOIN` corresponds to $`\bowtie` (see [Relational Algebra](./Relational-Algebra.md) for the formal definitions of $`\sigma`, $`\pi`, $`\bowtie`, and the other algebra operators).

- `SELECT col FROM t WHERE pred` → $`\pi_{\text{col}}(\sigma_{\text{pred}}(t))`
- `SELECT * FROM a JOIN b ON a.x = b.y` → $`a \bowtie_{a.x = b.y} b`
- `SELECT DISTINCT col FROM t` → $`\pi_{\text{col}}(t)` (set semantics)
- `SELECT col FROM t ORDER BY col LIMIT k` → top-$`k` selection (not pure relational algebra; requires ordering)

<details><summary>Details</summary>

**Declarative vs. imperative**: SQL specifies *what* to compute, not *how*. The optimizer is free to reorder joins, push predicates, choose indexes, and parallelize. This is analogous to how a compiler optimizes an imperative program: the semantics are fixed, the execution strategy is not.

**Subqueries and CTEs**: `WHERE x IN (SELECT y FROM t)` is a semi-join. `WITH cte AS (SELECT …) SELECT … FROM cte` is a named subexpression that the optimizer may inline or materialize.

**NULL semantics**: SQL uses three-valued logic (true, false, unknown). `NULL = NULL` is *unknown*, not true. This affects `WHERE` (unknown is treated as false) and `JOIN` (NULLs do not match in equi-joins).

**Worked example**: is `SELECT name FROM users WHERE age > 30 OR city = 'Paris'` expressible in pure relational algebra?

<details><summary>Solution</summary>

Yes: $`\pi_{\text{name}}(\sigma_{\text{age} > 30 \,\lor\, \text{city} = \text{'Paris'}}(\text{users}))`. The `OR` is a single selection predicate (algebra allows arbitrary boolean formulas), so no union is needed. Only `DISTINCT`, `ORDER BY`, `LIMIT`, and aggregation fall outside the pure algebra.

</details>

</details>

## Join algorithms

A join of relations $`R` and $`S` can be executed by three physical algorithms. The optimizer picks one per join, based on sizes, indexes, and sort order.

- **Nested-loop join**: for each tuple of $`R`, probe $`S`. With an index on the join column of $`S` (index nested-loop), each probe is $`O(\log |S|)`. No sorting, no hashing; works for any join predicate, including range conditions.
- **Hash join**: build an in-memory hash table on the smaller relation, probe it with the other. Equi-joins only; expected linear time, no index needed.
- **Sort-merge join**: sort both inputs on the join key (or read them pre-sorted from an index), then merge. If both inputs are already sorted, it is linear and its output is sorted on the join key — which can make a downstream `ORDER BY` free.

<table>
<tr><th>Algorithm</th><th>Time (no index, unsorted)</th><th>Extra memory</th><th>Join predicate</th><th>Output sorted?</th></tr>
<tr><td>Nested-loop (block)</td><td>O(|R| × |S|)</td><td>O(1)–O(1 page)</td><td>any</td><td>no</td></tr>
<tr><td>Index nested-loop</td><td>O(|R| · log |S|)</td><td>index on inner</td><td>any (index-supported)</td><td>no</td></tr>
<tr><td>Hash</td><td>O(|R| + |S|) expected</td><td>O(min(|R|, |S|))</td><td>equality only</td><td>no</td></tr>
<tr><td>Sort-merge</td><td>O(|R| log |R| + |S| log |S|); O(|R| + |S|) if pre-sorted</td><td>sort runs</td><td>equality and ranges</td><td>yes, on join key</td></tr>
</table>

<details><summary>Details</summary>

**How the optimizer chooses**: a hash join wins for large unsorted inputs with an equality predicate and no useful index. An index nested-loop wins when the outer relation is small (or highly selective after filtering) and the inner has an index — the cost is one index probe per outer row. A sort-merge wins when the inputs are already sorted (via indexes or a required sort downstream), or for range joins. See [Relational Algebra](./Relational-Algebra.md) for the algebraic definition of the join operator itself.

**Worked example**: `orders` has 10M rows, `customers` has 100k rows, and the query is `SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id WHERE c.country = 'FR'`. Which algorithm is likely cheapest?

<details><summary>Solution</summary>

The filter `c.country = 'FR'` is applied first, leaving perhaps 2k rows of `c`. The optimizer then picks an **index nested-loop join**: for each of the ~2k French customers, probe the index on `orders(customer_id)` — cost ≈ $`2\,000 \times \log(10^7)` index probes, far cheaper than hashing 10M orders or sorting both sides. If the filter were absent (all 100k customers), a **hash join** on the smaller relation (`customers`) would typically win.

</details>

</details>

## Query optimizer

The **query optimizer** translates a relational-algebra expression into a concrete execution plan. It uses table statistics (row counts, column histograms, index availability) to estimate the cost of each candidate plan, then selects the cheapest.

**Cost model**: cost = I/O cost (pages read) + CPU cost (rows processed). The optimizer compares:
- **Sequential scan**: read all pages of the table. Cost ≈ number of pages.
- **Index scan**: seek to the relevant B-tree range. Cost ≈ $`\log n` + number of matching rows.
- **Index-only scan**: read only the index (no table lookup). Cheaper if the index covers all needed columns.

The decisive quantity is **selectivity**: the fraction of rows a predicate keeps. A sequential scan wins when selectivity is high (many rows match); an index scan wins when it is low. The chart below compares the two for a 10M-row table (100,000 pages, random-I/O cost 4× a sequential page read):

<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cost of sequential scan vs index scan as a function of selectivity">
  <rect x="0" y="0" width="720" height="300" fill="#16213e"/>
  <text x="360" y="24" fill="#64b5f6" font-size="15" text-anchor="middle" font-family="sans-serif">Cost (page reads) vs. selectivity — 10M-row table, 100k pages</text>
  <!-- axes -->
  <line x1="70" y1="250" x2="690" y2="250" stroke="#546e7a" stroke-width="1.5"/>
  <line x1="70" y1="250" x2="70" y2="40" stroke="#546e7a" stroke-width="1.5"/>
  <!-- y gridlines: log scale, 10^1 .. 10^5 -->
  <g font-size="11" fill="#90a4ae" font-family="monospace" text-anchor="end">
    <text x="64" y="254">1</text>
    <text x="64" y="204">100</text>
    <text x="64" y="154">10k</text>
    <text x="64" y="104">1M</text>
    <text x="64" y="54">100M</text>
  </g>
  <g stroke="#263238" stroke-width="1">
    <line x1="70" y1="200" x2="690" y2="200"/>
    <line x1="70" y1="150" x2="690" y2="150"/>
    <line x1="70" y1="100" x2="690" y2="100"/>
    <line x1="70" y1="50" x2="690" y2="50"/>
  </g>
  <!-- x labels: selectivity -->
  <g font-size="11" fill="#90a4ae" font-family="monospace" text-anchor="middle">
    <text x="130" y="268">0.0001%</text>
    <text x="250" y="268">0.01%</text>
    <text x="370" y="268">1%</text>
    <text x="490" y="268">10%</text>
    <text x="610" y="268">100%</text>
  </g>
  <text x="380" y="290" fill="#90a4ae" font-size="12" text-anchor="middle" font-family="sans-serif">selectivity (fraction of rows matching the predicate)</text>
  <!-- index scan cost: log n + matching rows; random IO x4. points: sel=1e-6:~4; 1e-4:~44; 1e-3:~404; 1e-2:~4004; 1e-1:~40k; 1:~400k -->
  <!-- log scale y: y = 250 - 50*(log10(cost)) ; cost 1->250, 100->200, 10k->150, 1M->100, 100M->50 -->
  <polyline fill="none" stroke="#4caf50" stroke-width="2.5"
    points="130,250 250,237 370,212 490,163 610,104 690,104"/>
  <!-- seq scan cost: 100000 pages -> y=150 flat -->
  <line x1="130" y1="150" x2="690" y2="150" stroke="#ef5350" stroke-width="2.5" stroke-dasharray="6 4"/>
  <!-- crossover marker -->
  <circle cx="478" cy="150" r="5" fill="#ffab40"/>
  <text x="478" y="136" fill="#ffab40" font-size="11" text-anchor="middle" font-family="sans-serif">crossover ≈ 3–5% selectivity</text>
  <!-- legend -->
  <rect x="480" y="40" width="200" height="46" fill="#0d1117" stroke="#30363d" rx="4"/>
  <line x1="490" y1="55" x2="520" y2="55" stroke="#4caf50" stroke-width="2.5"/>
  <text x="526" y="59" fill="#e0e0e0" font-size="11" font-family="sans-serif">index scan (random I/O)</text>
  <line x1="490" y1="75" x2="520" y2="75" stroke="#ef5350" stroke-width="2.5" stroke-dasharray="6 4"/>
  <text x="526" y="79" fill="#e0e0e0" font-size="11" font-family="sans-serif">sequential scan (100k pages)</text>
</svg>

**Join order**: for $`k` tables, the number of possible join orders (all binary tree shapes × all permutations of the tables) is the $`(k-1)`-th Catalan number times $`k!`:

```math
C_{k-1} \cdot k! = \frac{(2(k-1))!}{(k-1)!}
```

This grows super-exponentially: 12 orders for $`k = 3`, 665,280 for $`k = 7`. No optimizer enumerates them all for large $`k`:
- **PostgreSQL**: dynamic programming over subsets of tables — exhaustive for small joins, and it switches to a greedy genetic search above `geqo_threshold` (default 12) tables.
- **MySQL**: greedy incremental search — it builds the plan one table at a time, at each step picking the table with the lowest estimated incremental cost (with exhaustive search for small joins, controlled by `optimizer_search_depth`).

**Index usage in planning**: the optimizer compares the cost of an index scan against a sequential scan using the selectivity estimates above, and chooses the join algorithm accordingly (see [Join algorithms](#join-algorithms) for the per-algorithm complexities). For the index *types* available (B-tree, hash, composite, covering) and the principles for choosing which indexes to build, see [Schema](./Schema.md).

**Parallel query**: modern optimizers can split a scan or join across multiple CPU cores. The cost model is adjusted: cost / number of workers (with a setup overhead).

<details><summary>Details</summary>

**Selectivity estimation**: the optimizer uses histograms, most-common-value lists, and distinct-count statistics per column; for conjunctive predicates (`AND`) it multiplies selectivities, assuming independence — an assumption that fails for correlated columns and is a classic source of plan misestimates. `ANALYZE` (PostgreSQL) or `ANALYZE TABLE` (MySQL) refreshes the statistics.

**Worked example**: `WHERE status = 'active'` matches 95% of rows; there is a B-tree index on `status`. Which scan does the optimizer pick?

<details><summary>Solution</summary>

The **sequential scan**. Index scan cost ≈ $`\log n + 0.95n` random-I/O page reads (each matching row costs a random heap fetch), which is far more than reading the $`n` pages once sequentially. An index only pays off for low selectivity — this is why an unused index on a low-cardinality column is not a bug, and why the crossover point in the chart above sits at a few percent.

</details>

</details>

## EXPLAIN

`EXPLAIN` shows the chosen plan as a tree of operators. Both PostgreSQL and MySQL support it; `EXPLAIN ANALYZE` additionally *executes* the query and reports actual row counts and timing (PostgreSQL; MySQL 8.0.18+).

**Reading an EXPLAIN plan**:
- The top operator is the output; children are inputs.
- Each node shows: operator type, estimated rows, estimated cost, and (with `ANALYZE`) actual rows and timing.
- A `Seq Scan` on a large table with a tight `WHERE` usually signals a missing index.
- A `Sort` node above a join means the join did not produce sorted output (a sort-merge join would avoid this).

For a three-table join, the plan is a tree whose leaves are access paths (scans) and whose internal nodes are join and sort operators:

<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Query plan tree for a three-table join">
  <rect x="0" y="0" width="720" height="340" fill="#16213e"/>
  <text x="360" y="24" fill="#64b5f6" font-size="15" text-anchor="middle" font-family="sans-serif">Plan tree: SELECT … FROM orders o JOIN customers c ON … JOIN items i ON … LIMIT 20</text>
  <g font-family="monospace" font-size="12" text-anchor="middle">
    <!-- Limit -->
    <rect x="300" y="40" width="120" height="30" rx="4" fill="#1b5e20" stroke="#4caf50"/>
    <text x="360" y="59" fill="#a5d6a7">Limit (20)</text>
    <!-- Sort -->
    <rect x="290" y="95" width="140" height="30" rx="4" fill="#263238" stroke="#546e7a"/>
    <text x="360" y="114" fill="#b0bec5">Sort (cost 843)</text>
    <!-- Hash Join -->
    <rect x="280" y="150" width="160" height="30" rx="4" fill="#263238" stroke="#546e7a"/>
    <text x="360" y="169" fill="#b0bec5">Hash Join o⋈c</text>
    <!-- left child: Seq Scan orders -->
    <rect x="120" y="215" width="180" height="30" rx="4" fill="#263238" stroke="#546e7a"/>
    <text x="210" y="234" fill="#b0bec5">Seq Scan orders (10M)</text>
    <!-- right child: Hash Join o⋈i -->
    <rect x="400" y="215" width="170" height="30" rx="4" fill="#263238" stroke="#546e7a"/>
    <text x="485" y="234" fill="#b0bec5">Hash Join o⋈i</text>
    <!-- grandchildren -->
    <rect x="360" y="280" width="150" height="30" rx="4" fill="#263238" stroke="#546e7a"/>
    <text x="435" y="299" fill="#b0bec5">Seq Scan items</text>
    <rect x="530" y="280" width="150" height="30" rx="4" fill="#263238" stroke="#546e7a"/>
    <text x="605" y="299" fill="#b0bec5">Hash (build side)</text>
  </g>
  <g stroke="#546e7a" stroke-width="1.5" fill="none">
    <line x1="360" y1="70" x2="360" y2="95"/>
    <line x1="360" y1="125" x2="360" y2="150"/>
    <line x1="330" y1="180" x2="210" y2="215"/>
    <line x1="390" y1="180" x2="485" y2="215"/>
    <line x1="485" y1="245" x2="435" y2="280"/>
    <line x1="500" y1="245" x2="605" y2="280"/>
  </g>
  <g font-size="11" fill="#90a4ae" font-family="sans-serif">
    <text x="30" y="59">read bottom-up:</text>
    <text x="30" y="75">scans feed joins,</text>
    <text x="30" y="91">joins feed the sort,</text>
    <text x="30" y="107">the sort feeds the limit</text>
  </g>
</svg>

<details><summary>Details</summary>

**PostgreSQL EXPLAIN example**:
```
Limit  (cost=0.42..8.43 rows=20 width=36)
  ->  Index Scan using idx_orders_cust_created on orders  (cost=0.42..843.21 rows=1000 width=36)
        Index Cond: (customer_id = 42)
```

This shows: the plan is an index scan (not a seq scan), the index condition is `customer_id = 42`, and the `LIMIT 20` stops after 20 rows. The cost 0.42 is the startup cost (seek to the first matching entry); 8.43 is the total cost for 20 rows.

**EXPLAIN ANALYZE** adds actual timing:
```
Limit  (cost=0.42..8.43 rows=20) (actual time=0.051..0.112 rows=20 loops=1)
  ->  Index Scan using idx_orders_cust_created on orders  (cost=0.42..843.21 rows=1000) (actual time=0.048..0.108 rows=20 loops=1)
```

If `actual rows` differs greatly from `estimated rows`, the statistics are stale — run `ANALYZE`.

**Worked example**: an `EXPLAIN ANALYZE` line reads `Seq Scan on orders (cost=0..120000 rows=10) (actual rows=9800000)`. What went wrong and what is the fix?

<details><summary>Solution</summary>

The optimizer estimated 10 matching rows but 9.8M actually matched — a selectivity misestimate of three orders of magnitude, so it wrongly preferred an index scan over a sequential scan. Fix: run `ANALYZE orders` to refresh statistics (and check for correlated columns, which break the independence assumption). See [Transactions](./Transactions.md) for how concurrent writes can also make statistics stale.

</details>

</details>

## Example problem

<details><summary>Quizz</summary>

**Problem**: A table `orders(id, customer_id, amount, created_at)` has 10M rows. The query `SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20` is slow. Design an index and explain why.

<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Composite B-tree index on (customer_id, created_at)">
  <rect x="0" y="0" width="720" height="320" fill="#16213e"/>
  <text x="360" y="24" fill="#64b5f6" font-size="15" text-anchor="middle" font-family="sans-serif">Composite index on (customer_id, created_at): sorted by customer_id, then by created_at within it</text>
  <g font-family="monospace" font-size="12" text-anchor="middle">
    <!-- root -->
    <rect x="290" y="45" width="140" height="32" rx="4" fill="#263238" stroke="#546e7a"/>
    <text x="360" y="65" fill="#e0e0e0">[7 | 42 | 88]</text>
    <!-- leaves -->
    <rect x="60" y="150" width="180" height="60" rx="4" fill="#263238" stroke="#546e7a"/>
    <text x="150" y="170" fill="#e0e0e0">cust 7: t1 &lt; t2 &lt; t3</text>
    <text x="150" y="188" fill="#78909c" font-size="10">sorted by created_at</text>
    <rect x="270" y="150" width="180" height="60" rx="4" fill="#1b5e20" stroke="#4caf50"/>
    <text x="360" y="170" fill="#a5d6a7">cust 42: t9 &gt; t5 &gt; t2 …</text>
    <text x="360" y="188" fill="#81c784" font-size="10">already sorted DESC — no sort step</text>
    <rect x="480" y="150" width="180" height="60" rx="4" fill="#263238" stroke="#546e7a"/>
    <text x="570" y="170" fill="#e0e0e0">cust 88: t1 &lt; t4 &lt; t7</text>
    <text x="570" y="188" fill="#78909c" font-size="10">sorted by created_at</text>
  </g>
  <g stroke="#546e7a" stroke-width="1.5" fill="none">
    <line x1="330" y1="77" x2="150" y2="150"/>
    <line x1="360" y1="77" x2="360" y2="150"/>
    <line x1="390" y1="77" x2="570" y2="150"/>
  </g>
  <!-- sibling pointers -->
  <g stroke="#ffab40" stroke-width="1.5" fill="none">
    <line x1="240" y1="180" x2="270" y2="180"/>
    <line x1="450" y1="180" x2="480" y2="180"/>
  </g>
  <g font-size="11" fill="#90a4ae" font-family="sans-serif">
    <text x="60" y="245">One B-tree seek finds the first entry with customer_id = 42 (O(log n) page reads,</text>
    <text x="60" y="263">log base = fanout ≈ 200, so depth ≈ 4 for 10M rows). The matching entries are contiguous</text>
    <text x="60" y="281">and pre-sorted by created_at DESC, so ORDER BY is free and LIMIT stops the scan after 20.</text>
  </g>
</svg>

<details><summary>Solution</summary>

**Index**: a composite B-tree index on `(customer_id, created_at DESC)`.

**Why it works**:
1. The B-tree index allows an $`O(\log_F n)` seek to the first entry with `customer_id = 42`, where $`F` is the fanout (entries per page). The log base is the fanout, not 2: for 10M rows at fanout ≈ 200, the tree depth is $`\log_{200}(10^7) \approx 3.3`, i.e. ~4 page reads — not $`\log_2(10^7) \approx 23`.
2. Within that range, entries are already sorted by `created_at DESC`, so the `ORDER BY` is free (no sort step).
3. The `LIMIT 20` stops after 20 entries.

Total cost: ~4 page reads for the tree descent + ~20 leaf-entry reads ≈ 24 I/O operations, versus 100,000 pages for a sequential scan.

**Without the index**: the planner would either (a) scan the entire table and filter, or (b) use a single-column index on `customer_id` and then sort the matching rows by `created_at`. Both are far more expensive.

**Write cost**: every INSERT, UPDATE, or DELETE on `orders` must also update the index. For a write-heavy workload, this is a trade-off. See [Key-Value Stores](../Key-Value-Stores.md) for B-tree vs. LSM-tree write characteristics, and [Schema](./Schema.md) for index design principles (composite column ordering, covering indexes).

</details>

</details>

<iframe src="./SQL.simulation.html" title="B-tree index lookup and query execution plan visualizer"></iframe>
