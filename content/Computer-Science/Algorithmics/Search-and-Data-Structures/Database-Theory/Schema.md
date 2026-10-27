# Schema

A **relational schema** defines the static structure of a database: which tables exist, what columns they have, and how they relate. It is the foundation on which all queries and transactions operate. Designing a good schema is the first step in any persistent-data system: it determines storage cost, query performance, and the integrity guarantees the database can enforce.

> **Authoritative sources**
> - [Database System Concepts, Ch. 1–2 (Silberschatz, Korth, Sudarshan)](https://www.db-book.com/)
> - [Database Systems: The Complete Book, Ch. 1 (Garcia-Molina, Ullman, Widom)](http://infolab.stanford.edu/~ullman/dscb.html)

## Tables and attributes

A **table** (relation) $`R` is a set of **tuples** (rows), each with the same set of typed **attributes** (columns). (In SQL, tables are bags/multisets that allow duplicate rows; see [Relational Algebra](./Relational-Algebra.md).) The **schema** of $`R` is the list of attribute names and their domains.

- **Primary key** ($`PK`): a minimal set of attributes that uniquely identifies each row.
- **Foreign key** ($`FK`): an attribute (or set) in $`R` that references the $`PK` of another table $`S`, enforcing referential integrity.
- **NOT NULL / UNIQUE / CHECK**: additional column-level constraints.

### Data types

Each attribute is declared with a **data type** (domain) that constrains the values it can hold. The choice of type affects storage size, index efficiency, and query semantics:

<table>
<tr><th>Category</th><th>Examples</th><th>Design consideration</th></tr>
<tr><td>Integers</td><td>SMALLINT, INTEGER, BIGINT</td><td>Match the expected range; BIGINT costs 8 bytes vs 4 for INTEGER</td></tr>
<tr><td>Fixed-point / exact</td><td>NUMERIC(p,s), DECIMAL</td><td>Use for money; avoids floating-point rounding</td></tr>
<tr><td>Floating-point</td><td>REAL, DOUBLE PRECISION</td><td>Use for measurements; never for exact arithmetic</td></tr>
<tr><td>Strings</td><td>CHAR(n), VARCHAR(n), TEXT</td><td>CHAR pads to n; VARCHAR stores actual length; TEXT has no limit</td></tr>
<tr><td>Temporal</td><td>DATE, TIME, TIMESTAMP</td><td>DATE = calendar day; TIMESTAMP = instant (with optional timezone)</td></tr>
<tr><td>Binary</td><td>BLOB, BYTEA</td><td>Unstructured payloads; not indexable in most engines</td></tr>
</table>

A common rule: choose the **narrowest type** that safely covers the domain. An `INTEGER` (4 bytes) is preferable to `BIGINT` (8 bytes) when values fit, because smaller types pack more rows per page and compare faster.

<details><summary>Details</summary>

**Referential integrity**: if $`R.fk` references $`S.pk`, then every value of $`R.fk` must either be NULL or match some $`S.pk` value. Deleting a row from $`S` that is referenced by $`R` is rejected (or cascaded, depending on the `ON DELETE` clause).

**Composite keys**: a primary key can span multiple attributes, e.g., $`(student_id, course_id)` for an enrollment table. The whole tuple must be unique; no single attribute need be.

**Surrogate keys**: in practice, databases often add an auto-incrementing integer $`id` as the $`PK` even when a natural key exists, to keep indexes small and stable.

**Type choice in practice**:
- Use `NUMERIC(10,2)` for currency, never `FLOAT`, because $`0.1 + 0.2 \neq 0.3` in binary floating-point.
- Use `VARCHAR(255)` for names (bounded, indexable) and `TEXT` for free-form descriptions (unbounded).
- Use `TIMESTAMP WITH TIME ZONE` for events that must be comparable across timezones; `DATE` for "which day" queries.

<details><summary>Example problem</summary>

A hospital stores patient records. A patient's age is at most 150, their diagnosis code is a 5-character string, and their admission timestamp must be comparable across servers in different timezones. Which types do you choose?

<details><summary>Solution</summary>

- Age: `SMALLINT` (2 bytes, range −32768 to 32767, more than enough for 0–150).
- Diagnosis code: `CHAR(5)` (fixed-length, always exactly 5 characters, compact for indexing).
- Admission: `TIMESTAMP WITH TIME ZONE` (stores an absolute instant; displays in the viewer's local timezone).

</details>

</details>

</details>

## Entity-Relationship modeling

Before writing a relational schema, designers typically model the domain with an **Entity-Relationship (ER) diagram**. An ER diagram captures:

- **Entities** (rectangles): the "nouns" of the domain (e.g., *Book*, *Member*, *Loan*).
- **Attributes** (ellipses): properties of an entity; the **key** attribute is underlined.
- **Relationships** (diamonds): how entities interact, annotated with **cardinality** (1:1, 1:N, M:N).

The ER diagram is a *design tool*: it is not stored in the database. The next step is **mapping** the ER model to relational tables.

### Mapping rules

<table>
<tr><th>ER element</th><th>Relational mapping</th></tr>
<tr><td>Entity with key</td><td>One table; key becomes the <code>PK</code></td></tr>
<tr><td>1:N relationship</td><td><code>FK</code> in the "many" table pointing to the "one" table</td></tr>
<tr><td>M:N relationship</td><td>A separate <strong>junction table</strong> with <code>FK</code>s to both entities; the pair of <code>FK</code>s forms the <code>PK</code></td></tr>
<tr><td>Relationship with its own attributes</td><td>The junction table also carries those attributes</td></tr>
</table>

<details><summary>Details</summary>

**Step 1 – Identify entities and keys.** Walk through the domain description and list every distinct "thing" that has its own identity. For each, pick a natural key or decide on a surrogate.

**Step 2 – Identify relationships and cardinality.** For every pair of entities that interact, determine whether the relationship is 1:1, 1:N, or M:N. A common test: can one instance of A relate to multiple instances of B? Can one instance of B relate to multiple instances of A?

**Step 3 – Map to tables.** Apply the mapping rules above. Every M:N relationship becomes a junction table. Every 1:N relationship adds a foreign key to the "many" side.

**Step 4 – Add relationship attributes.** If the relationship itself has data (e.g., a loan has a date), those attributes go in the junction table.

**Example: Library system.**

- Entities: *Book* (key: `book_id`), *Member* (key: `member_id`), *Loan* (key: `loan_id`).
- Relationships: Book —(1:N)→ Loan (a book can be loaned many times over its lifetime); Member —(1:N)→ Loan (a member can borrow many books over time).
- The Book–Member interaction is M:N over time, so it is captured by the *Loan* entity (a "weak entity" or junction).

The ER diagram for this example:

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="max-width:700px; font-family:sans-serif;">
  <!-- Book entity -->
  <rect x="30" y="80" width="140" height="100" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="100" y="105" text-anchor="middle" font-weight="bold" font-size="14">Book</text>
  <text x="100" y="125" text-anchor="middle" font-size="11" text-decoration="underline">book_id</text>
  <text x="100" y="142" text-anchor="middle" font-size="11">title, author</text>
  <text x="100" y="159" text-anchor="middle" font-size="11">isbn</text>

  <!-- Member entity -->
  <rect x="530" y="80" width="140" height="100" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="600" y="105" text-anchor="middle" font-weight="bold" font-size="14">Member</text>
  <text x="600" y="125" text-anchor="middle" font-size="11" text-decoration="underline">member_id</text>
  <text x="600" y="142" text-anchor="middle" font-size="11">name, email</text>

  <!-- Loan entity (junction) -->
  <rect x="280" y="190" width="140" height="100" rx="6" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="350" y="215" text-anchor="middle" font-weight="bold" font-size="14">Loan</text>
  <text x="350" y="235" text-anchor="middle" font-size="11" text-decoration="underline">loan_id</text>
  <text x="350" y="252" text-anchor="middle" font-size="11">book_id (FK)</text>
  <text x="350" y="269" text-anchor="middle" font-size="11">member_id (FK)</text>
  <text x="350" y="286" text-anchor="middle" font-size="11">borrowed_at, returned_at</text>

  <!-- Relationship lines -->
  <line x1="170" y1="150" x2="280" y2="220" stroke="#333" stroke-width="2"/>
  <text x="210" y="175" font-size="11" fill="#333">1 : N</text>
  <line x1="530" y1="150" x2="420" y2="220" stroke="#333" stroke-width="2"/>
  <text x="480" y="175" font-size="11" fill="#333">1 : N</text>
</svg>

**Mapping result**:

```
books(book_id PK, title, author, isbn)
members(member_id PK, name, email)
loans(loan_id PK, book_id FK→books, member_id FK→members, borrowed_at, returned_at)
```

> **Authoritative sources**
> - [Database System Concepts, Ch. 2 (ER modeling)](https://www.db-book.com/)

<details><summary>Example problem</summary>

Model a university: a *Student* can enroll in many *Courses*; a *Course* can have many *Students*; each enrollment records a *grade*. What tables do you create?

<details><summary>Solution</summary>

- Entities: Student (key: `student_id`), Course (key: `course_id`).
- Relationship: Student ↔ Course is M:N, with attribute `grade`.
- Mapping: three tables.

```
students(student_id PK, name, email)
courses(course_id PK, title, credits)
enrollments(student_id FK→students, course_id FK→courses, grade,
           PK(student_id, course_id))
```

The composite key `(student_id, course_id)` enforces that a student cannot enroll in the same course twice.

</details>

</details>

## Normal forms

**Normal forms** are canonical forms that eliminate redundancy and update anomalies:

- **1NF**: all attributes are atomic (no nested collections, no multi-valued columns).
- **2NF**: 1NF + no partial dependency (every non-key attribute depends on the *whole* composite $`PK`, not just a part).
- **3NF**: 2NF + no transitive dependency (non-key attributes depend only on the $`PK`, not on other non-key attributes).
- **BCNF**: for every non-trivial dependency $`X \to Y`, $`X` is a superkey.

<details><summary>Details</summary>

**Why normalize?** Redundancy causes update anomalies:
- *Insert anomaly*: cannot add a fact without also adding unrelated data.
- *Update anomaly*: changing a department name in one row but not another creates inconsistency.
- *Delete anomaly*: removing a row loses unrelated information.

Normal forms eliminate these by ensuring each fact is stored in exactly one place.

**Functional dependencies**: a dependency $`X \to Y` holds if two tuples that agree on $`X` must also agree on $`Y`. The closure $`X^+` (all attributes determined by $`X`) is computed by the Armstrong axioms (reflexivity, augmentation, transitivity).

The following diagram shows a transitive dependency that violates 3NF:

<svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg" style="max-width:500px; font-family:sans-serif;">
  <!-- X -->
  <rect x="20" y="35" width="100" height="50" rx="6" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="70" y="65" text-anchor="middle" font-size="14" font-weight="bold">X (PK)</text>
  <!-- Y -->
  <rect x="200" y="35" width="100" height="50" rx="6" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>
  <text x="250" y="65" text-anchor="middle" font-size="14" font-weight="bold">Y</text>
  <!-- Z -->
  <rect x="380" y="35" width="100" height="50" rx="6" fill="#ffcdd2" stroke="#c62828" stroke-width="2"/>
  <text x="430" y="65" text-anchor="middle" font-size="14" font-weight="bold">Z</text>
  <!-- Arrows -->
  <line x1="120" y1="60" x2="195" y2="60" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="300" y1="60" x2="375" y2="60" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
  <defs><marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
  <!-- Labels -->
  <text x="155" y="50" text-anchor="middle" font-size="11">X → Y</text>
  <text x="335" y="50" text-anchor="middle" font-size="11">Y → Z</text>
  <text x="250" y="110" text-anchor="middle" font-size="12" fill="#c62828">Transitive: X → Z (violates 3NF)</text>
</svg>

**Concrete example of a 2NF violation**:

Consider a table `enrollments(student_id, course_id, course_title, grade)` with PK `(student_id, course_id)`.
- `course_title` depends only on `course_id` (a *part* of the PK) → **partial dependency** → violates 2NF.
- Fix: split into `courses(course_id PK, course_title)` and `enrollments(student_id, course_id FK, grade)`.

**Denormalization**: in practice, read-heavy systems (OLAP, reporting) denormalize (join tables, add redundant columns) to reduce join cost. The trade-off is write amplification and update anomalies. A common pattern: keep the OLTP schema normalized, and build a denormalized read replica or materialized view for analytics.

> **Authoritative sources**
> - [Database System Concepts, Ch. 6 (Normalization)](https://www.db-book.com/)
> - [Database Systems: The Complete Book, Ch. 10 (Functional Dependencies)](http://infolab.stanford.edu/~ullman/dscb.html)

<details><summary>Example problem</summary>

A table `orders(order_id, customer_id, customer_city, product_id, product_price, quantity)` has PK `order_id`. Identify all normal-form violations and propose a fix.

<details><summary>Solution</summary>

- `customer_city` depends on `customer_id`, not on `order_id` → transitive dependency → violates 3NF.
- `product_price` depends on `product_id`, not on `order_id` → transitive dependency → violates 3NF.

Fix (3NF):

```
customers(customer_id PK, customer_city)
products(product_id PK, product_price)
orders(order_id PK, customer_id FK, product_id FK, quantity)
```

</details>

</details>

## Indexes

> For how B-trees and hash tables work internally, see [Key-Value Stores](../Key-Value-Stores.md). For how the optimizer chooses to use an index at query time, see [SQL & Query Planning](./SQL.md).

An **index** is a secondary data structure that accelerates lookup by a column (or set of columns).

- **B-tree index** on column $`c`: $`O(\log n)` lookup by $`c`, supports range queries ($`c > 5`, $`c BETWEEN 3 AND 7`).
- **Hash index** on column $`c`: $`O(1)` expected equality lookup only.
- **Composite index** on $`(c_1, c_2, \ldots)`: ordered by $`c_1`, then $`c_2`, etc. Supports prefix queries ($`c_1 = 5`), but not $`c_2` alone.
- **Covering index**: includes all columns needed by a query, avoiding a table lookup ("index-only scan").

<details><summary>Details</summary>

**Write overhead**: every INSERT, UPDATE, or DELETE must also update every index on the affected columns. A table with 5 indexes pays 5× the index-maintenance cost on writes. For write-heavy workloads, LSM-tree indexes (see [Key-Value Stores](../Key-Value-Stores.md)) batch writes and merge in the background.

**Index selection heuristics**:
- Equality predicates on the leading column benefit most.
- Range predicates on the leading column are supported by B-trees but not hash indexes.
- A composite index $(a, b)$ serves queries on $`a` alone or $`(a, b)`, but not $`b` alone.
- The **leftmost prefix rule**: the index can only be used if the query constrains the leading column(s) with equality (or a range on the last constrained column).

**Partial indexes**: an index on a subset of rows (e.g., `WHERE status = 'active'`) is smaller and faster to maintain, at the cost of not serving queries on the excluded rows.

**B-tree structure** (simplified, order-3):

<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" style="max-width:600px; font-family:sans-serif;">
  <!-- Root -->
  <rect x="240" y="10" width="120" height="40" rx="4" fill="#e8eaf6" stroke="#3949ab" stroke-width="2"/>
  <text x="300" y="35" text-anchor="middle" font-size="13">[50 | 75]</text>
  <!-- Level 1 -->
  <rect x="60" y="90" width="120" height="40" rx="4" fill="#e8eaf6" stroke="#3949ab" stroke-width="2"/>
  <text x="120" y="115" text-anchor="middle" font-size="13">[10 | 30]</text>
  <rect x="240" y="90" width="120" height="40" rx="4" fill="#e8eaf6" stroke="#3949ab" stroke-width="2"/>
  <text x="300" y="115" text-anchor="middle" font-size="13">[55 | 65]</text>
  <rect x="420" y="90" width="120" height="40" rx="4" fill="#e8eaf6" stroke="#3949ab" stroke-width="2"/>
  <text x="480" y="115" text-anchor="middle" font-size="13">[80 | 95]</text>
  <!-- Level 2 (leaves) -->
  <rect x="10" y="170" width="80" height="40" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="50" y="195" text-anchor="middle" font-size="12">[5, 10]</text>
  <rect x="100" y="170" width="80" height="40" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="140" y="195" text-anchor="middle" font-size="12">[20, 30]</text>
  <rect x="190" y="170" width="80" height="40" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="230" y="195" text-anchor="middle" font-size="12">[40, 50]</text>
  <rect x="280" y="170" width="80" height="40" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="320" y="195" text-anchor="middle" font-size="12">[55, 60]</text>
  <rect x="370" y="170" width="80" height="40" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="410" y="195" text-anchor="middle" font-size="12">[65, 70]</text>
  <rect x="460" y="170" width="80" height="40" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="500" y="195" text-anchor="middle" font-size="12">[80, 90]</text>
  <rect x="550" y="170" width="50" height="40" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
  <text x="575" y="195" text-anchor="middle" font-size="12">[95]</text>
  <!-- Edges -->
  <line x1="270" y1="50" x2="120" y2="90" stroke="#666" stroke-width="1.5"/>
  <line x1="300" y1="50" x2="300" y2="90" stroke="#666" stroke-width="1.5"/>
  <line x1="330" y1="50" x2="480" y2="90" stroke="#666" stroke-width="1.5"/>
  <line x1="90" y1="130" x2="50" y2="170" stroke="#666" stroke-width="1"/>
  <line x1="120" y1="130" x2="140" y2="170" stroke="#666" stroke-width="1"/>
  <line x1="150" y1="130" x2="230" y2="170" stroke="#666" stroke-width="1"/>
  <line x1="280" y1="130" x2="320" y2="170" stroke="#666" stroke-width="1"/>
  <line x1="320" y1="130" x2="410" y2="170" stroke="#666" stroke-width="1"/>
  <line x1="460" y1="130" x2="500" y2="170" stroke="#666" stroke-width="1"/>
  <line x1="500" y1="130" x2="575" y2="170" stroke="#666" stroke-width="1"/>
  <!-- Labels -->
  <text x="300" y="215" text-anchor="middle" font-size="11" fill="#555">Root → internal nodes → leaf pages (each leaf holds a key + row pointer)</text>
</svg>

> **Authoritative sources**
> - [Database System Concepts, Ch. 10 (Indexing)](https://www.db-book.com/)

<details><summary>Example problem</summary>

A table `events(event_id, user_id, created_at, status)` is queried with:
1. `WHERE user_id = 42 AND created_at > '2025-01-01'`
2. `WHERE status = 'pending'`

Which composite index serves query 1 efficiently? Can the same index serve query 2?

<details><summary>Solution</summary>

- Query 1: a composite B-tree index on `(user_id, created_at)` works. The equality on `user_id` narrows to a range of `created_at` values within that user's slice.
- Query 2: the same index does **not** help, because `status` is not the leading column. A separate index on `status` (or a partial index `WHERE status = 'pending'`) is needed.

</details>

</details>

## Interactive normalization checker

The simulation below lets you drag attributes between tables and see which normal form is violated. Try moving `dept_name` into the `employees` table to observe a transitive dependency (3NF violation), or split a composite key to see a partial dependency (2NF violation).

<iframe src="./Schema.simulation.html" title="Interactive normalization checker: drag attributes between tables to see normal-form violations"></iframe>

## Quizz

<details><summary>Example problem</summary>

**Problem**: Design a schema for a library system with books, members, and loans. A book can be loaned to at most one member at a time. A member can have many loans (over time). Each loan records the date borrowed and the date returned.

First, sketch the ER diagram, then map it to relational tables, then verify the result is in 3NF.

<details><summary>Solution</summary>

**ER diagram**:

<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" style="max-width:600px; font-family:sans-serif;">
  <rect x="30" y="40" width="130" height="90" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="95" y="65" text-anchor="middle" font-weight="bold" font-size="13">Book</text>
  <text x="95" y="82" text-anchor="middle" font-size="10" text-decoration="underline">book_id</text>
  <text x="95" y="98" text-anchor="middle" font-size="10">title, author, isbn</text>

  <rect x="440" y="40" width="130" height="90" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="505" y="65" text-anchor="middle" font-weight="bold" font-size="13">Member</text>
  <text x="505" y="82" text-anchor="middle" font-size="10" text-decoration="underline">member_id</text>
  <text x="505" y="98" text-anchor="middle" font-size="10">name, email</text>

  <rect x="235" y="150" width="130" height="90" rx="6" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="300" y="175" text-anchor="middle" font-weight="bold" font-size="13">Loan</text>
  <text x="300" y="192" text-anchor="middle" font-size="10" text-decoration="underline">loan_id</text>
  <text x="300" y="208" text-anchor="middle" font-size="10">book_id, member_id</text>
  <text x="300" y="224" text-anchor="middle" font-size="10">borrowed_at, returned_at</text>

  <line x1="160" y1="100" x2="235" y2="170" stroke="#333" stroke-width="2"/>
  <text x="180" y="130" font-size="11">1 : N</text>
  <line x1="440" y1="100" x2="365" y2="170" stroke="#333" stroke-width="2"/>
  <text x="410" y="130" font-size="11">1 : N</text>
</svg>

**Relational schema**:

```
books(book_id PK, title, author, isbn)
members(member_id PK, name, email)
loans(loan_id PK, book_id FK→books, member_id FK→members, borrowed_at, returned_at)
```

**Why this is 3NF**:
- `books`: `title` and `author` depend on `book_id` (the PK). No transitive dependency.
- `members`: `name` and `email` depend on `member_id`. No transitive dependency.
- `loans`: all non-key attributes depend on `loan_id`. The composite $`(book_id, member_id, borrowed_at)` could serve as an alternative PK, but a surrogate `loan_id` keeps the PK small.

**Constraint**: "at most one active loan per book" is enforced by a partial unique index: `UNIQUE(book_id) WHERE returned_at IS NULL`.

**Index**: a B-tree on `loans(book_id)` supports the query "is this book currently available?" in $`O(\log n)`. A B-tree on `loans(member_id)` supports "what does this member currently have?".

</details>

</details>

