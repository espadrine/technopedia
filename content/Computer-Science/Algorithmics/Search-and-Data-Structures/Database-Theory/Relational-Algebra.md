# Relational Algebra

**Relational algebra** is the formal, set-theoretic query language of the relational model. It defines what a query *computes* (semantics) independently of how it is executed. Every SQL query can be expressed as an extended relational algebra expression — although SQL itself goes beyond the pure algebra, with bag semantics, three-valued `NULL` logic, `ORDER BY`, and `LIMIT`.

A **relation** is a set of tuples over a schema: the notions of relation, tuple, attribute, and key are defined in [Schema](./Schema.md).

> **Authoritative sources**
> - [Database System Concepts, Ch. 5 (Silberschatz, Korth, Sudarshan)](https://www.db-book.com/)
> - [Database Systems: The Complete Book, Ch. 2 (Garcia-Molina, Ullman, Widom)](http://infolab.stanford.edu/~ullman/dscb.html)

## Core operations

<table>
<tr><th>Operation</th><th>Notation</th><th>Effect</th></tr>
<tr><td>Select</td><td>σ<sub>p</sub>(R)</td><td>Rows of R satisfying predicate p</td></tr>
<tr><td>Project</td><td>π<sub>a₁,…,aₖ</sub>(R)</td><td>Columns a₁,…,aₖ of R (duplicates removed)</td></tr>
<tr><td>Cartesian product</td><td>R × S</td><td>All pairs (r, s) with r ∈ R, s ∈ S</td></tr>
<tr><td>Join</td><td>R ⋈ S</td><td>Cartesian product filtered to matching join attributes</td></tr>
<tr><td>Union</td><td>R ∪ S</td><td>Rows in R or S (duplicates removed)</td></tr>
<tr><td>Difference</td><td>R − S</td><td>Rows in R but not in S</td></tr>
<tr><td>Division</td><td>R ÷ S</td><td>Rows of R that pair with every row of S</td></tr>
<tr><td>Rename</td><td>ρ<sub>S</sub>(R)</td><td>Rename relation R to S</td></tr>
</table>

The first seven operations (select, project, Cartesian product, union, difference, division, rename) form Codd's original algebra. **Join** is a *derived* operation — an abbreviation for a Cartesian product followed by a select, $`R \bowtie S \equiv \sigma_p(R \times S)` — listed in the table because of its overwhelming practical importance. So when a text speaks of "the seven core operations", join is not counted.

<details><summary>Details</summary>

**Set vs. bag semantics**: pure relational algebra operates on *sets* (no duplicates, no order). In practice, SQL uses *bag* (multiset) semantics: `SELECT` without `DISTINCT` preserves duplicates. The bag variant of project is written $`\pi^*`.

**Closure**: the set of all expressions built from these operations is *closed*: the result of any expression is itself a relation, so operations can be composed arbitrarily.

**Expressiveness**: relational algebra is equivalent in expressive power to the relational calculus (Codd's theorem). Any query expressible in one is expressible in the other. The practical consequence: any SQL query can be translated to a relational algebra expression, and the query optimizer works by rewriting algebraic expressions.

**Reading an expression**: nested expressions are read *from the inside out* — the innermost operation executes first, and its result (a relation, by closure) feeds the next operation outward.

Worked example — read $`\pi_{\text{name}}\bigl(\sigma_{\text{city}='Paris'}(\text{customers})\bigr)`:

1. Innermost: $`\sigma_{\text{city}='Paris'}(\text{customers})` — keep only the rows of `customers` whose city is Paris. Say this yields `{(1, Alice, Paris), (3, Carol, Paris)}`.
2. Outer: $`\pi_{\text{name}}(\cdot)` — keep only the `name` column of that intermediate relation, removing duplicates. Result: `{Alice, Carol}`.

The same inside-out reading scales to any depth: in $`\pi_{\text{name}}(\sigma_{\text{city}='Paris'}(\text{customers}) \bowtie \text{orders})`, first filter `customers`, then join with `orders`, then project to `name`.

**Example problem**: in the expression $`\pi_{\text{city}}\bigl(\sigma_{\text{amount}>100}(\text{orders})\bigr)`, what does the innermost operation produce, and what does the whole expression return, given `orders = {(10, 1, 200), (11, 1, 50), (12, 3, 150)}` with schema `orders(oid, cust_id, amount)`?

<details><summary>Solution</summary>

1. Innermost $`\sigma_{\text{amount}>100}(\text{orders})` keeps rows with amount over 100: `{(10, 1, 200), (12, 3, 150)}` — the row `(11, 1, 50)` is eliminated.
2. Outer $`\pi_{\text{city}}` is ill-typed here: `city` is not an attribute of `orders`. This is the point of the exercise — every attribute named in a projection must exist in the schema of its input relation. The correct expression would first join with `customers` (which has the `city` column), e.g. $`\pi_{\text{city}}(\sigma_{\text{amount}>100}(\text{orders}) \bowtie \text{customers})`.

</details>

</details>

## Joins

A **join** $`R \bowtie S` on attribute $`a` produces all pairs $`(r, s)` where $`r.a = s.a`. The result has all columns of $`R` and $`S` (with the join column appearing once). Joins are the most common operation in real queries: almost every query that touches more than one table joins.

**Join types**:
- **Inner join** ($`\bowtie`): only matching rows.
- **Left outer join** ($`\bowtie_{\text{left}}`): all rows of $`R`; unmatched $`S` columns are NULL.
- **Right outer join** ($`\bowtie_{\text{right}}`): all rows of $`S`; unmatched $`R` columns are NULL.
- **Full outer join** ($`\bowtie_{\text{full}}`): all rows of both; unmatched columns are NULL.
- **Cross join** ($`\times`): Cartesian product (no join predicate).

**How joins are executed** (nested loop, hash join, sort-merge join, and their complexities) is covered in [SQL & Query Planning](./SQL.md).

<details><summary>Details</summary>

**Join correctness**: the inner join $`R \bowtie_{R.a = S.a} S` is equivalent to $`\sigma_{R.a = S.a}(R \times S)`. The outer join extends this: a left outer join is $`(R \bowtie S) \cup (R - \pi_R(R \bowtie S))` with NULLs filled in the $`S` columns.

**Natural join**: $`R \bowtie S` joins on *all* shared attribute names. An **equi-join** specifies the join predicate explicitly: $`R \bowtie_{R.a = S.b} S`.

**Theta join**: the join predicate is any comparison ($`R.a < S.b`, $`R.a \neq S.b`). An equi-join is the special case where the predicate is equality.

**Multi-way joins**: $`R \bowtie S \bowtie T` is ambiguous without parentheses. The query optimizer (see [SQL & Query Planning](./SQL.md)) chooses the join order that minimizes cost. Join is associative and commutative (for inner joins), so the optimizer is free to reorder.

**Semi-join** ($`R \ltimes S`): returns rows of $`R` that have a match in $`S`, without duplicating $`S` columns. Useful for `EXISTS` subqueries.

**Anti-join**: rows of $`R` with *no* match in $`S`. Useful for `NOT EXISTS`.

**Example problem**: with `customers = {(1, Alice, Paris), (2, Bob, Lyon)}` and `orders = {(10, 1, 200), (11, 1, 50)}`, what is the *left outer join* $`\text{customers} \bowtie_{\text{left}} \text{orders}` on `id = cust_id`?

<details><summary>Solution</summary>

Alice (id 1) matches both orders, so she contributes two rows. Bob (id 2) has no matching order, so he contributes one row with the `orders` columns filled with NULL:

```
(1, Alice, Paris, 10, 1, 200)
(1, Alice, Paris, 11, 1, 50)
(2, Bob,   Lyon,  NULL, NULL, NULL)
```

An inner join would have dropped Bob entirely; the left outer join keeps him. In SQL: `SELECT * FROM customers LEFT JOIN orders ON customers.id = orders.cust_id;`

</details>

</details>

### Visual: how a join works

<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;font-family:monospace;font-size:13px;">
  <rect x="10" y="10" width="200" height="100" fill="#e3f2fd" stroke="#1565c0" rx="4"/>
  <text x="110" y="30" text-anchor="middle" font-weight="bold">R (customers)</text>
  <text x="20" y="50">id | name | city</text>
  <text x="20" y="70">1  | Alice| Paris</text>
  <text x="20" y="90">2  | Bob  | Lyon</text>
  <rect x="10" y="120" width="200" height="90" fill="#e3f2fd" stroke="#1565c0" rx="4"/>
  <text x="110" y="140" text-anchor="middle" font-weight="bold">S (orders)</text>
  <text x="20" y="160">oid | cust_id | amt</text>
  <text x="20" y="180">10  | 1       | 200</text>
  <text x="20" y="200">11  | 1       | 50</text>
  <line x1="210" y1="110" x2="280" y2="110" stroke="#333" stroke-width="2" marker-end="url(#arr)"/>
  <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#333"/></marker></defs>
  <text x="245" y="100" text-anchor="middle" font-size="11">⋈ on id=cust_id</text>
  <rect x="290" y="10" width="390" height="110" fill="#fff3e0" stroke="#e65100" rx="4"/>
  <text x="485" y="30" text-anchor="middle" font-weight="bold">R ⋈ S</text>
  <text x="300" y="50">id | name | city  | oid | cust_id | amt</text>
  <text x="300" y="70" fill="#1b5e20">1  | Alice| Paris | 10  | 1       | 200</text>
  <text x="300" y="90" fill="#1b5e20">1  | Alice| Paris | 11  | 1       | 50</text>
  <text x="300" y="110" fill="#b71c1c" font-size="11">(Bob has no matching order → excluded)</text>
</svg>

### Interactive: step-by-step relational algebra

The simulation below walks through two scenarios step by step: a join query ("names of Paris customers with an order over 100") and a division query ("students enrolled in *all* courses").

<iframe src="./Relational-Algebra.simulation.html" title="Step-by-step relational algebra visualizer: join and division scenarios"></iframe>

## Division

Division $`R \div S` answers "all" queries: it returns the rows of $`R` that are associated with *every* row of $`S`.

<details><summary>Details</summary>

**Formal definition**: let $`A` be the set of attributes of $`R` that do not appear in $`S`, and let $`r_A` denote the tuple $`r` restricted to the attributes $`A`. Then:

```math
R \div S = \{\, r_A \mid \forall s_B \in S,\; (r_A, s_B) \in R \,\}
```

In words: keep each $`A`-value that appears in $`R` paired with *every* tuple of $`S`. Note the condition is membership in $`R` itself — not in $`R \times S`, which would be trivially true and make the definition vacuous.

Equivalently, using only the core operations (with $`A` the attributes of $`R` not in $`S`):

```math
R \div S = \pi_A(R) - \pi_A\!\bigl(\pi_A(R) \times S - R\bigr)
```

Read it inside-out: $`\pi_A(R) \times S` builds *every* combination of an $`A`-value with a tuple of $`S`; subtracting $`R` leaves the combinations that are *missing*; projecting those to $`A` gives the $`A`-values that fail the "all" test; subtracting them from $`\pi_A(R)` leaves the ones that pass.

**Worked example**: "Find students enrolled in *all* courses." Let `Enrolled(student, course)` contain:

```
(Alice, Math)  (Alice, CS)   (Alice, Bio)
(Bob, Math)
(Carol, Math)  (Carol, CS)  (Carol, Bio)
```

and `Courses(course)` contain `(Math), (CS), (Bio)`. Then `Enrolled ÷ Courses = {(Alice), (Carol)}`: Alice and Carol each appear paired with Math, CS *and* Bio, while Bob is missing CS and Bio.

<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" style="max-width:720px;font-family:monospace;font-size:13px;">
  <rect x="10" y="10" width="230" height="200" fill="#e3f2fd" stroke="#1565c0" rx="4"/>
  <text x="125" y="30" text-anchor="middle" font-weight="bold">Enrolled(student, course)</text>
  <text x="25" y="55">Alice | Math</text>
  <text x="25" y="75">Alice | CS</text>
  <text x="25" y="95">Alice | Bio</text>
  <text x="25" y="115">Bob   | Math</text>
  <text x="25" y="135">Carol | Math</text>
  <text x="25" y="155">Carol | CS</text>
  <text x="25" y="175">Carol | Bio</text>
  <rect x="10" y="215" width="230" height="30" fill="#eceff1" stroke="#78909c" rx="4"/>
  <text x="125" y="235" text-anchor="middle" font-weight="bold">Courses: Math, CS, Bio</text>
  <line x1="250" y1="120" x2="300" y2="120" stroke="#333" stroke-width="2" marker-end="url(#arr2)"/>
  <defs><marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#333"/></marker></defs>
  <text x="275" y="110" text-anchor="middle" font-size="12">÷</text>
  <rect x="310" y="10" width="390" height="200" fill="#fff3e0" stroke="#e65100" rx="4"/>
  <text x="505" y="30" text-anchor="middle" font-weight="bold">Check each student against ALL courses</text>
  <text x="325" y="60" fill="#1b5e20">Alice: Math ✓  CS ✓  Bio ✓  → kept</text>
  <text x="325" y="90" fill="#b71c1c">Bob:   Math ✓  CS ✗  Bio ✗  → dropped</text>
  <text x="325" y="120" fill="#1b5e20">Carol: Math ✓  CS ✓  Bio ✓  → kept</text>
  <rect x="310" y="150" width="390" height="50" fill="#e8f5e9" stroke="#2e7d32" rx="4"/>
  <text x="505" y="172" text-anchor="middle" font-weight="bold">Enrolled ÷ Courses</text>
  <text x="505" y="192" text-anchor="middle">Alice, Carol</text>
</svg>

**SQL equivalent**:
```sql
SELECT student
FROM Enrolled e
WHERE NOT EXISTS (
  SELECT c.course FROM Courses c
  WHERE NOT EXISTS (
    SELECT 1 FROM Enrolled e2
    WHERE e2.student = e.student AND e2.course = c.course
  )
);
```

**Example problem**: with `Enrolled` as above but `Courses = {(Math), (CS)}` (Bio no longer offered), what is `Enrolled ÷ Courses`?

<details><summary>Solution</summary>

Now every student must be paired with Math *and* CS.

- Alice: Math ✓, CS ✓ → kept.
- Bob: Math ✓, CS ✗ → dropped.
- Carol: Math ✓, CS ✓ → kept.

Answer: `{(Alice), (Carol)}`. Notice the answer grew relative to the three-course version: shrinking $`S` makes the "all" condition easier to satisfy. Division is monotone decreasing in $`S`.

</details>

</details>

## Aggregation

Aggregation ($`\gamma`): groups rows by a set of attributes and computes a summary function (SUM, COUNT, AVG, MIN, MAX) over each group. This is an *extension* beyond pure relational algebra, but it is the most important one in practice — every practical SQL query that uses `GROUP BY` relies on it.

<details><summary>Details</summary>

**Notation**: $`\gamma_{a_1,\ldots,a_k;\; F_1(b_1),\ldots,F_m(b_m)}(R)` where $`a_1,\ldots,a_k` are the grouping attributes and $`F_i` are aggregate functions applied to attribute $`b_i`.

**How it works**: partition the rows of $`R` into groups that share the same values of the grouping attributes, then collapse each group into a single output row carrying the group key and the aggregate values.

<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" style="max-width:720px;font-family:monospace;font-size:13px;">
  <rect x="10" y="10" width="250" height="150" fill="#e3f2fd" stroke="#1565c0" rx="4"/>
  <text x="135" y="30" text-anchor="middle" font-weight="bold">orders ⋈ customers</text>
  <text x="20" y="55">Alice | Paris | 200</text>
  <text x="20" y="75">Alice | Paris | 50</text>
  <text x="20" y="95">Bob   | Lyon  | 120</text>
  <text x="20" y="115">Carol | Paris | 150</text>
  <line x1="270" y1="85" x2="320" y2="85" stroke="#333" stroke-width="2" marker-end="url(#arr3)"/>
  <defs><marker id="arr3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#333"/></marker></defs>
  <text x="295" y="75" text-anchor="middle" font-size="11">group by city</text>
  <rect x="330" y="10" width="170" height="150" fill="#fff8e1" stroke="#f9a825" rx="4"/>
  <text x="415" y="30" text-anchor="middle" font-weight="bold">Groups</text>
  <rect x="340" y="45" width="150" height="30" fill="#ffe0b2"/>
  <text x="348" y="65">Paris: 200, 50, 150</text>
  <rect x="340" y="85" width="150" height="30" fill="#ffe0b2"/>
  <text x="348" y="105">Lyon: 120</text>
  <line x1="510" y1="85" x2="560" y2="85" stroke="#333" stroke-width="2" marker-end="url(#arr3)"/>
  <text x="535" y="75" text-anchor="middle" font-size="11">SUM</text>
  <rect x="570" y="10" width="140" height="150" fill="#e8f5e9" stroke="#2e7d32" rx="4"/>
  <text x="640" y="30" text-anchor="middle" font-weight="bold">Result</text>
  <text x="585" y="60">Paris | 400</text>
  <text x="585" y="90">Lyon  | 120</text>
</svg>

**Example**: "Total amount per city":

```math
\gamma_{\text{city};\; \text{SUM}(\text{amount})}(\text{orders} \bowtie \text{customers})
```

With the data in the diagram, the groups are `{Paris: 200+50+150}` and `{Lyon: 120}`, so the result is `{(Paris, 400), (Lyon, 120)}`.

**SQL equivalent**:
```sql
SELECT c.city, SUM(o.amount)
FROM orders o JOIN customers c ON o.customer_id = c.id
GROUP BY c.city;
```

**Why it is an extension**: pure relational algebra (the seven core operations) cannot express aggregation. Codd's theorem holds for the *unextended* algebra; aggregation requires the *extended* relational algebra. See Silberschatz, Korth & Sudarshan, Ch. 5.2.

**Example problem**: with `orders ⋈ customers = {(Alice, Paris, 200), (Alice, Paris, 50), (Bob, Lyon, 120), (Carol, Paris, 150)}`, compute $`\gamma_{\text{city};\; \text{COUNT}(*),\; \text{MAX}(\text{amount})}(\text{orders} \bowtie \text{customers})`.

<details><summary>Solution</summary>

Partition by `city`:

- Group `Paris`: rows `(Alice, Paris, 200)`, `(Alice, Paris, 50)`, `(Carol, Paris, 150)` → COUNT = 3, MAX(amount) = 200.
- Group `Lyon`: row `(Bob, Lyon, 120)` → COUNT = 1, MAX(amount) = 120.

Result: `{(Paris, 3, 200), (Lyon, 1, 120)}`. Each group collapses to exactly one row, carrying the group key plus one value per aggregate function.

</details>

</details>

## Algebraic properties

The algebraic laws of relational algebra are what make query optimization possible: the optimizer rewrites an expression into an equivalent one that is cheaper to execute.

<table>
<tr><th>Law</th><th>Form</th></tr>
<tr><td>Commutativity of union</td><td>R ∪ S = S ∪ R</td></tr>
<tr><td>Commutativity of join</td><td>R ⋈ S = S ⋈ R (inner join)</td></tr>
<tr><td>Associativity of union</td><td>(R ∪ S) ∪ T = R ∪ (S ∪ T)</td></tr>
<tr><td>Associativity of join</td><td>(R ⋈ S) ⋈ T = R ⋈ (S ⋈ T) (inner join)</td></tr>
<tr><td>Distributivity of select over join</td><td>σ<sub>p</sub>(R ⋈ S) = σ<sub>p</sub>(R) ⋈ S (when p references only R)</td></tr>
<tr><td>Distributivity of project over union</td><td>π<sub>A</sub>(R ∪ S) = π<sub>A</sub>(R) ∪ π<sub>A</sub>(S)</td></tr>
<tr><td>Absorption</td><td>R ∪ (R ∩ S) = R; R ∩ (R ∪ S) = R</td></tr>
</table>

<details><summary>Details</summary>

**Why these matter**: the distributivity of select over join is the basis of *predicate pushdown* — pushing a filter below a join reduces the number of rows entering the join. The commutativity and associativity of join let the optimizer reorder multi-way joins to find the cheapest plan. Together, these laws give the optimizer a search space of equivalent expressions from which it picks the most efficient one.

<svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg" style="max-width:720px;font-family:monospace;font-size:13px;">
  <text x="360" y="20" text-anchor="middle" font-weight="bold">Predicate pushdown: same result, far fewer rows joined</text>
  <rect x="20" y="40" width="300" height="130" fill="#ffebee" stroke="#c62828" rx="4"/>
  <text x="170" y="62" text-anchor="middle" font-weight="bold">Before pushdown</text>
  <text x="35" y="90">σ (customers ⋈ orders)</text>
  <text x="35" y="115">join input: 1,000,000 × 5,000,000</text>
  <text x="35" y="140" fill="#b71c1c">rows entering join: 5 × 10¹²</text>
  <rect x="400" y="40" width="300" height="130" fill="#e8f5e9" stroke="#2e7d32" rx="4"/>
  <text x="550" y="62" text-anchor="middle" font-weight="bold">After pushdown</text>
  <text x="415" y="90">σ(customers) ⋈ σ(orders)</text>
  <text x="415" y="115">filters applied first: 500 × 100</text>
  <text x="415" y="140" fill="#1b5e20">rows entering join: 50,000</text>
</svg>

**Worked example**: consider $`\sigma_{\text{city}='Paris'}(\text{customers} \bowtie \text{orders})`. Since the predicate references only attributes of `customers`, distributivity gives $`\sigma_{\text{city}='Paris'}(\text{customers}) \bowtie \text{orders}`. If `customers` has 1,000,000 rows of which 500 are in Paris, the join input shrinks from 1,000,000 rows to 500 — before a single pair is matched.

**Example problem**: using the algebraic laws, rewrite $`\pi_{\text{name}}\bigl(\sigma_{\text{city}='Paris'}(\text{customers} \bowtie \text{orders})\bigr)` into an equivalent expression that is likely cheaper to execute, and justify each rewrite.

<details><summary>Solution</summary>

1. **Push the select down** (distributivity of select over join, predicate references only `customers`):
   $`\pi_{\text{name}}\bigl(\sigma_{\text{city}='Paris'}(\text{customers}) \bowtie \text{orders}\bigr)`.
2. **Push the projection down** (distributivity of project over join): only `name` (from `customers`) and `cust_id` (the join column of `orders`) are needed:
   $`\pi_{\text{name}}\bigl(\pi_{\text{name},\text{id}}(\sigma_{\text{city}='Paris'}(\text{customers})) \bowtie \pi_{\text{cust\_id}}(\text{orders})\bigr)`.

Both rewrites preserve the result exactly (they are instances of the laws in the table), but the second plan touches far fewer columns and rows — this is precisely the kind of transformation a query planner performs, as described in [SQL & Query Planning](./SQL.md).

</details>

See [SQL & Query Planning](./SQL.md) for how these laws are applied in practice.

</details>

## Example problem

**Problem**: Given tables `orders(id, customer_id, amount)` and `customers(id, name, city)`, write the relational algebra expression for: "names of customers in Paris who have placed at least one order over 100."

<details><summary>Solution</summary>

```
π_name( σ_city='Paris'(customers) ⋈ σ_amount>100(orders) )
```

Step by step:
1. $`\sigma_{\text{amount} > 100}(\text{orders})` — select orders over 100.
2. $`\sigma_{\text{city} = 'Paris'}(\text{customers})` — select Paris customers.
3. $`\bowtie` on `customer_id = id` — join the two filtered relations.
4. $`\pi_{\text{name}}` — project to just the name column (removes duplicates).

**Equivalent SQL**:
```sql
SELECT c.name
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE c.city = 'Paris' AND o.amount > 100;
```

The optimizer may reorder these steps using the algebraic laws above; see [SQL & Query Planning](./SQL.md) for the execution strategies.

</details>

