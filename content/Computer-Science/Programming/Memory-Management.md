# Memory Management

Memory management studies how programs allocate, access, and reclaim memory. It is relevant whenever a program's memory usage must be bounded, predictable, or safe.

Three main approaches cover the landscape: the **stack** is automatic and scoped to function calls (push on entry, pop on return); the **heap** is explicit and long-lived (the programmer or runtime allocates and frees blocks); **garbage collection** is automatic but global (a background or stop-the-world pass reclaims unreachable objects). The stack is fastest but limited in size and lifetime; the heap is flexible but requires discipline; GC trades a pause for safety.

> **Authoritative sources**
> - [The Garbage Collection Handbook (Jones, Hosking, Moss)](https://www.gchandbook.org/index.html)
> - [Operating System Concepts (Silberschatz, Galvin, Gagne)](https://www.wiley.com/en-us/shop/general-end-user-computing/operating-system-concepts-10th-edition-p-9781119320913)

## Stack and function frames

The **stack** is a LIFO region of memory. Each **function frame** (activation record) stores: local variables, parameters, return address, and saved registers. Pushed on call, popped on return. The compiler lays out each frame; see [Compilation](./Compilation.md) for how registers and stack slots are assigned.

**Stack overflow**: unbounded recursion exhausts the stack (typically 1–8 MB). The OS kills the process.

<details><summary>Details</summary>

**Stack vs. heap**: stack allocation is $`O(1)` (move a pointer); heap allocation is $`O(1)`–$`O(n)` depending on the allocator. Stack memory is automatically reclaimed when the function returns; heap memory must be explicitly freed (or collected).

**Tail call optimization (TCO)**: if a function's last action is a call to another function, the current frame can be reused. $`f(n) = n == 0 ? 0 : f(n-1) + 1` cannot be TCO'd (the `+1` is pending); $`f(n, acc) = n == 0 ? acc : f(n-1, acc+1)` can.

**Stack smashing**: writing past the end of a local array overwrites the return address. See [Security](./Security.md) for exploit mitigations.

The physical layout of the stack within the process address space (text, data, heap, stack, mmap regions) is described in [Memory Hierarchy](../Computer-Hardware/Memory-Hierarchy.md).

</details>

## Heap and manual allocation

The **heap** is a large region of memory managed by an **allocator**. **Pointers** hold addresses; **references** are typed pointers (in managed languages).

**Manual allocation** (C, Rust with `unsafe`): the programmer calls `malloc`/`free` (or `Box::new`/`drop`). Errors: **memory leaks** (forgot to free), **use-after-free** (accessed freed memory), **double free** (freed twice), **dangling pointer** (pointer to freed memory).

<details><summary>Details</summary>

**Allocators**:
- **First fit**: scan from the start, allocate the first block that fits.
- **Best fit**: allocate the smallest block that fits.
- **Buddy allocator**: split/merge power-of-2 blocks; $`O(\log n)`.
- **Slab allocator**: pre-allocate pools of fixed-size objects; reduces fragmentation.
- **Arena/bump allocator**: allocate by moving a pointer; free all at once. Fast but no individual deallocation.

**Fragmentation**: external (free blocks too small to use) and internal (allocated block larger than needed). The **coalescing** step in `free` merges adjacent free blocks.

<iframe src="./Memory-Management.simulation.html" title="Memory allocator visualization"></iframe>

**Memory alignment and padding**: the CPU requires certain types to start at specific addresses (e.g., a 64-bit integer at a multiple of 8). The compiler inserts **padding** bytes between struct fields so each member is aligned. A cache line is typically 64 bytes; aligning a hot struct to a cache-line boundary avoids **false sharing** (two cores writing to different fields of the same cache line). Misalignment can cause a hardware fault on some architectures (ARM) or a performance penalty on others (x86).

**Memory-mapped I/O (mmap)**: the OS maps a file or device into the process address space, so the program accesses file contents through ordinary pointer dereferences. The kernel pages data in on demand. This is a distinct allocation strategy: the "heap" is the file, and the OS manages the virtual-to-physical mapping.

**Rust's ownership model**: each value has exactly one owner; the borrow checker enforces ownership and borrowing rules at compile time. See [Security](./Security.md) for the full safety guarantees.

</details>

## Garbage collection

**Garbage collection (GC)** automatically reclaims memory that is no longer reachable. **Reference counting** frees an object when its reference count drops to zero (simple but fails on cycles).

**Tracing GC** (mark-and-sweep, copying, generational): identify live objects by traversing from roots (stack, globals, registers); reclaim the rest.

<details><summary>Details</summary>

**Mark-and-sweep**: two phases. **Mark**: traverse from roots, mark reachable objects. **Sweep**: free unmarked objects. $`O(n)` where $`n` is the number of objects. Pauses the application (stop-the-world).

**Copying GC** (semi-space, generational): divide the heap into generations. Young generation (frequently allocated, short-lived) is collected by copying live objects to a new space. Old generation (long-lived) is collected less frequently. Reduces pause time.

**Generational hypothesis**: the vast majority of objects die young (commonly cited as 80–95% depending on workload). The young generation is collected by a **minor GC** (fast, $`< 10` ms); the old generation by a **major GC** (slow, $`100`–$`1000` ms).

**Reference counting** (Objective-C, Swift ARC, Python): each object has a count; increment on reference, decrement on dereference; free at zero. Fast (no pauses) but fails on cycles (A → B → A). Python uses a cycle detector as a fallback.

**Memory leaks**: objects that are reachable but no longer needed (e.g., a global cache that grows unbounded). Not a GC bug; a program design issue.

</details>

## Example problem

**Problem**: A program allocates 1000 objects of 64 bytes each on a 64,000-byte heap using a first-fit allocator (the heap is now full). After 500 objects are freed (alternating: free 1, 3, 5, …, 999), can a new 320-byte allocation succeed?

<details><summary>Solution</summary>

The heap is exactly 64,000 bytes (1000 × 64). After all 1000 objects are allocated, the heap is full.

After freeing odd-indexed blocks (indices 1, 3, 5, …, 999), 500 blocks of 64 bytes are free, but they are scattered:

```
| A | F | A | F | A | F | A | F | ... | A | F | A |
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |   | 998| 999|1000|
```

(A = allocated/live, F = free). No two free blocks are adjacent, so **no coalescing** is possible.

**Without coalescing**: the largest free block is 64 bytes. A 320-byte allocation **fails** despite 32,000 bytes being free (external fragmentation).

**With coalescing**: the freed blocks are at positions 1, 3, 5, …, 999 (0-indexed). No two freed blocks are adjacent (they alternate with live blocks), so no coalescing occurs. The result is the same: the largest free block is 64 bytes, and the allocation fails.

This illustrates why **buddy allocators** and **slab allocators** are preferred: they reduce fragmentation by design.

</details>
