# Migrations

**Schema migrations** are versioned, ordered scripts that evolve the database schema over time (add column, add index, split table, rename). They are the mechanism by which a database schema changes in lockstep with application code, ensuring that every deployment has a consistent schema.

> **Authoritative sources**
> - [Flyway Documentation](https://documentation.red-gate.com/fd/flyway-documentation)
> - [Alembic Documentation](https://alembic.sqlalchemy.org/)
> - [Liquibase Documentation](https://www.liquibase.com/docs)

## Versioned migrations

Each migration is a numbered script (e.g., `001_create_users.sql`, `002_add_email_to_users.sql`) applied exactly once, in order. A `schema_migrations` table tracks which versions have been applied.

- **Apply**: run the next unapplied migration in order. Each is wrapped in a transaction (atomic).
- **Track**: the `schema_migrations` table stores `(version, applied_at, checksum)`. The checksum detects tampering.
- **Idempotency**: a well-designed migration is safe to re-run (e.g., `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE … ADD COLUMN IF NOT EXISTS`).

<details><summary>Details</summary>

**Tools**:
- **Flyway** (Java): directory of numbered SQL or Java-based migrations. Supports `baseline` (adopt an existing schema) and `repair` (fix checksum mismatches).
- **Alembic** (Python/SQLAlchemy): generates migration scripts from model diffs. Supports autogenerate (detect schema changes from ORM models).
- **Liquibase**: XML/YAML/SQL changelogs. Supports `preconditions` (only apply if a condition holds) and `rollback`.
- **Rails migrations**: Ruby-based, integrated with the Rails framework. `db:migrate` applies, `db:rollback` reverts.

**Ordering and branching**: in a team, multiple developers create migrations in parallel. The version number (timestamp or sequence) resolves ordering. Conflicts (two migrations with the same number) are detected at apply time.

**CI integration**: migrations are part of the deployment pipeline. The CI step runs migrations against a staging database to catch conflicts before production. See [Software Engineering](../../../Programming/Software-Engineering.md) for CI/CD patterns.

</details>

## Online migrations

Adding a column or index on a large table can lock it for minutes (or hours). **Online migration** tools avoid this by performing the change incrementally.

**gh-ost** (GitHub) / **pt-online-schema-change** (Percona) algorithm:
1. Create a **shadow table** with the new schema.
2. Copy rows from the original table to the shadow table in batches (e.g., 1000 rows at a time).
3. Tail the **WAL** (PostgreSQL) or **binlog** (MySQL) to apply concurrent writes to the shadow table.
4. When the copy catches up, **atomically swap** table names (original → backup, shadow → original).
5. Drop the backup table.

The original table is briefly locked only at the final rename (milliseconds).

<iframe src="./Migrations.simulation.html" title="Step-by-step animation of the online migration shadow-table algorithm"></iframe>

<details><summary>Details</summary>

**Why not just `ALTER TABLE`?** In PostgreSQL, `ADD COLUMN` (without a default) is metadata-only (instant). But `ADD COLUMN … DEFAULT <expr>` rewrites the entire table. `CREATE INDEX` (without `CONCURRENTLY`) locks the table. `CREATE INDEX CONCURRENTLY` builds the index in the background but takes longer and cannot run inside a transaction.

**In MySQL (InnoDB)**: `ALTER TABLE` with `ALGORITHM=INPLACE, LOCK=NONE` performs many changes online (add index, add column with default). But some changes (change column type, drop column) still require a table copy.

**Risks of online migrations**:
- The shadow table doubles storage temporarily.
- If the process is interrupted, the shadow table must be cleaned up.
- The final rename is a brief lock; if the table is heavily written, the rename may time out.
- Concurrent DDL (another migration running) can interfere.

**Best practice**: run online migrations during low-traffic windows, monitor replication lag, and have a rollback plan (drop the shadow table, keep the original).

</details>

## Reversibility and forward-only

A **down-migration** (rollback) reverts an up-migration. In practice:

- **Safe down-migrations**: dropping an added column, dropping an added index, reverting a rename.
- **Dangerous down-migrations**: dropping a column that has data (data loss), reverting a type change (data may not fit the old type).

**Forward-only strategy**: in production, never run down-migrations. Instead:
1. Add the new column (nullable, or with a default).
2. Deploy code that writes to both old and new columns (dual-write).
3. Backfill the new column from the old.
4. Deploy code that reads from the new column.
5. Drop the old column (in a later migration).

This is the **expand → migrate → contract** pattern. It avoids downtime and data loss.

<details><summary>Details</summary>

**Feature flags**: combine migrations with feature flags. The migration adds the schema; the feature flag controls whether the application uses the new schema. This decouples schema changes from code changes, allowing the schema to be deployed independently.

**Backfill**: for large tables, backfilling a new column is done in batches (e.g., 10K rows at a time) to avoid long-running transactions and lock contention. Tools: `pg_repack`, custom scripts, or the online migration tool's copy phase.

**Testing migrations**: run migrations against a copy of production data (anonymized) in a staging environment. This catches issues like: a column that is NOT NULL but has no default, an index that takes too long to build, a type change that loses data.

</details>

## Example problem

**Problem**: You need to add a `status` column (values: `active`, `archived`, default `active`) to a `users` table with 50M rows. The table is heavily written (10K inserts/sec). Design the migration strategy.

<details><summary>Solution</summary>

**Step 1: Add column (instant in PostgreSQL)**
```sql
ALTER TABLE users ADD COLUMN status TEXT NOT NULL DEFAULT 'active';
```
In PostgreSQL 11+, adding a column with a constant default is metadata-only (no table rewrite). The new column is visible immediately; existing rows return the default without being physically updated.

**Step 2: Add index (online)**
```sql
CREATE INDEX CONCURRENTLY idx_users_status ON users(status);
```
`CONCURRENTLY` builds the index in the background without locking the table. Takes longer but does not block writes.

**Step 3: Deploy code**
Deploy application code that sets `status` on new inserts and updates. No dual-write needed (the default handles existing rows).

**Why not `gh-ost`?** Because PostgreSQL 11+ makes `ADD COLUMN … DEFAULT <const>` instant, there is no need for a shadow table. The online migration tool is only needed for operations that rewrite the table (e.g., changing a column type, adding a computed default).

**If the table were in MySQL**:
```sql
ALTER TABLE users ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'active', ALGORITHM=INPLACE, LOCK=NONE;
```
InnoDB supports adding a column with a constant default in-place (no table copy). For the index:
```sql
ALTER TABLE users ADD INDEX idx_users_status (status), ALGORITHM=INPLACE, LOCK=NONE;
```

**Monitoring**: watch replication lag during the index build. If lag exceeds a threshold, pause the migration (or let it complete if it is close). The 10K inserts/sec continue unimpeded.

</details>
