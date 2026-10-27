# Search and Data Structures

Search and data structures study how to organize data so that algorithms can access it cheaply. They are relevant whenever a program must store, retrieve, or update large collections of items: from a single in-memory hash table to a distributed database serving millions of queries per second.

## Utility

- They choose the representation that makes the dominant access pattern cheap.
- They bound the cost of lookup, insertion, and deletion in terms of collection size.
- They compose: a database index is a B-tree, a search engine is an inverted index of posting lists, a graph is a set of adjacency lists.

<details><summary>Details</summary>

The five classes partition search problems by the *access pattern* that defines the query, and every query reduces to exactly one of them: **positional** (give me the item at index *i*), **key-based** (give me the item with key *k*, or all keys in a range), **pattern** (find where a string or regular expression occurs), **relational** (select the tuples satisfying a predicate over several fields), or **connectivity** (reach every node and edge from a start point). The classes are non-overlapping because each names a different thing the query is *about* — a position, a key, a pattern, a predicate, or a relation — and no query is about two of them at once. They also build on one another: flat structures give $`O(1)` positional access with no ordering; hierarchical structures add ordering for $`O(\log n)` key access; text structures exploit the alphabet to match patterns; relational structures combine multiple key dimensions with predicates; graph structures generalize to arbitrary connectivity.

</details>

## History

- 1959: Hoare develops quicksort, the first $`O(n \log n)` average-case comparison sort.
- 1972: Bayer and McCreight introduce B-trees, which become the dominant disk index structure for relational databases.
- 1996: O'Neil et al. introduce LSM-trees for write-optimized storage.
- 2011: Google open-sources LevelDB, bringing LSM-trees and Bloom filters into mainstream production storage engines.

## Classes

<table>
<tr><th>Page</th><th>Access pattern</th><th>Search</th><th>Insert / Delete</th><th>Space</th></tr>
<tr><td><a href='./Lists.md'>Lists</a></td><td>Positional (index into a sequence)</td><td><i>O</i>(1) by index, <i>O</i>(<i>n</i>) by value</td><td><i>O</i>(1) amortized (vector)</td><td><i>O</i>(<i>n</i>)</td></tr>
<tr><td><a href='./Key-Value-Stores.md'>Key-Value Stores</a></td><td>Key-based (hash or ordered)</td><td><i>O</i>(1) expected / <i>O</i>(log <i>n</i>)</td><td><i>O</i>(1) / <i>O</i>(log <i>n</i>)</td><td><i>O</i>(<i>n</i>)</td></tr>
<tr><td><a href='./Text-Search.md'>Text Search</a></td><td>Pattern / substring</td><td><i>O</i>(<i>n</i>+<i>m</i>) to <i>O</i>(<i>n</i> log <i>n</i>)</td><td><i>O</i>(<i>n</i>)</td><td><i>O</i>(<i>n</i>) to <i>O</i>(<i>n</i> log <i>n</i>)</td></tr>
<tr><td><a href='./Database-Theory/Readme.md'>Database Theory</a></td><td>Relational (predicate over tuples)</td><td><i>O</i>(log <i>n</i>) (indexed)</td><td><i>O</i>(log <i>n</i>)</td><td><i>O</i>(<i>n</i>) + index overhead</td></tr>
<tr><td><a href='./Graphs.md'>Graphs</a></td><td>Connectivity (adjacency)</td><td><i>O</i>(<i>n</i>+<i>m</i>) traversal</td><td><i>O</i>(1) per edge</td><td><i>O</i>(<i>n</i>+<i>m</i>)</td></tr>
</table>

Range-query structures (segment trees, interval trees, range trees) answer "find all items in a range" and are covered across two classes rather than a separate one: ordered key-value stores (B-trees, skip lists) handle one-dimensional key ranges, while text search (suffix trees, tries) handles ranges over the alphabet. See [Key-Value Stores](./Key-Value-Stores.md) and [Text Search](./Text-Search.md).

<iframe src="../Search-and-Data-Structures.simulation.html" title="Interactive visualizations of hash tables, B-trees, and graph traversal"></iframe>

> **Authoritative sources**
> - [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/)
> - [The Art of Computer Programming, Volume 3: Sorting and Searching](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)
