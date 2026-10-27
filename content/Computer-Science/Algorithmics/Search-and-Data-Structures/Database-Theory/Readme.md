# Database Theory

Database theory studies how to store, query, and maintain collections of structured records (tuples) with guarantees of correctness and performance. It is relevant whenever an application must persist data, enforce constraints, and answer multi-table queries. It builds on key-value stores (B-tree indexes, hash indexes) and list structures (posting lists, sorted runs) but adds the dimension of *relational algebra*: predicates over multiple attributes, joins, and transactional consistency.

## Utility

- It gives a formal model (relational algebra) for expressing multi-table queries.
- It provides execution guarantees: ACID transactions, index-backed $`O(\log n)` lookups, and cost-based query planning.
- It composes with distributed systems: sharding, replication, and consensus extend the single-node model.

<details><summary>Details</summary>

The five classes partition database theory by the *fundamental question* each answers: structure (what data exists), semantics (what operations mean), execution (how operations run efficiently), concurrency (how parallel access stays safe), and evolution (how the structure changes over time). Each builds on the previous: you must define a schema before you can write algebra over it, you must define algebra before you can compile it to a plan, you must have a plan before you can reason about concurrent execution, and you must have all of the above before you can safely evolve the schema.

</details>

## History

- 1970: Codd publishes the relational model, defining tables, keys, and relational algebra.
- 1974: System R (IBM) demonstrates a working relational DBMS with SQL and a cost-based optimizer.
- 1978: Oracle ships the first commercial relational database.
- 1995: MVCC and WAL-based recovery become standard in PostgreSQL and MySQL InnoDB.

## Classes

<table>
<tr><th>Page</th><th>Aspect</th><th>Key question</th><th>Core guarantee</th></tr>
<tr><td><a href='./Schema.md'>Schema</a></td><td>Structure</td><td>What tables, columns, and keys exist?</td><td>Referential integrity, normalization</td></tr>
<tr><td><a href='./Relational-Algebra.md'>Relational Algebra</a></td><td>Semantics</td><td>What does a query compute?</td><td>Set-theoretic correctness of joins, selections, projections</td></tr>
<tr><td><a href='./SQL.md'>SQL &amp; Query Planning</a></td><td>Execution</td><td>How is a query compiled and run cheaply?</td><td>Cost-optimal plan, index usage</td></tr>
<tr><td><a href='./Transactions.md'>Transactions</a></td><td>Concurrency</td><td>How do parallel operations stay consistent?</td><td>ACID, serializability, MVCC</td></tr>
<tr><td><a href='./Migrations.md'>Migrations</a></td><td>Evolution</td><td>How does the schema change over time?</td><td>Ordered, idempotent, reversible schema changes</td></tr>
</table>

> **Authoritative sources**
> - [Database System Concepts (Silberschatz, Korth, Sudarshan)](https://www.db-book.com/)
> - [Database Systems: The Complete Book (Garcia-Molina, Ullman, Widom)](http://infolab.stanford.edu/~ullman/dscb.html)
