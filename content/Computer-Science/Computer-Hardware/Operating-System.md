# Operating System

The operating system mediates between programs and hardware: it schedules processes, manages memory, provides file abstractions, and drives I/O devices. It is relevant whenever a program's resource usage, isolation, or I/O behavior must be understood or controlled.

> **Authoritative sources**
> - [Operating System Concepts (Silberschatz, Galvin, Gagne)](https://www.pearson.com/en-us/subject-catalog/p/operating-system-concepts/P200000003515/9780136874608)
> - [The Design and Implementation of the 4.4BSD Operating System (Leffler et al.)](https://www.oreilly.com/library/view/the-design-and/0130200072/)

## Processes

A **process** is a running program with its own virtual address space, file descriptors, and resources, identified by a unique **PID**. A **thread** shares the process's address space but has its own stack and registers. A **core** executes one thread at a time (or two with SMT/hyperthreading). **Preemption** is the OS's ability to interrupt a running process and switch to another; **cooperative scheduling** requires the process to voluntarily yield.

For the deeper treatment of M:N scheduling, thread pools, race conditions, and the memory model, see [Concurrency](../Distributed-Systems/Concurrency/Readme.md). For the hardware-level memory layout (text, data, bss, heap, stack segments) and the virtual-memory mechanism (MMU, TLB, page-table walk), see [Memory Hierarchy](./Memory-Hierarchy.md).

<details><summary>Details</summary>

**Scheduling algorithms**:
- **FCFS** (First-Come, First-Served): simple but suffers from the **convoy effect** (a long process blocks all others).
- **SJF** (Shortest Job First): optimal for minimizing average waiting time. Requires knowing the burst length.
- **Round Robin**: each process gets a time quantum (e.g., 10 ms). Fair but high context-switch overhead.
- **CFS** (Completely Fair Scheduler, Linux 2007–2023, legacy): each process has a "virtual runtime"; the scheduler picks the process with the smallest virtual runtime. $`O(\log n)` with a red-black tree.
- **EEVDF** (Earliest Eligible Virtual Deadline First, Linux ≥ 6.6, current default): extends CFS with a per-task deadline derived from its nice value. A task is *eligible* once its virtual time has advanced past its deadline; among eligible tasks, the one with the earliest deadline runs first. $`O(\log n)` with a red-black tree.

**Context switch**: save the current process's state (registers, PC, SP) to its PCB (Process Control Block); load the next process's state. Cost: $`\approx 1`–$`10 \mu s` (kernel) + cache/TLB flush ($`\approx 1000` cycles). The pipeline flush on context switch is a hardware cost described in [CPU Architecture](./CPU-Architecture.md).

**Virtual memory** (OS role): the OS allocates page-table entries, handles page faults by loading pages from disk or swap, and decides which page to evict when RAM is full. The hardware mechanism (MMU translation, TLB caching, page-table walk) is covered in [Memory Hierarchy](./Memory-Hierarchy.md).

</details>

## Memory management

The OS's primary contribution to memory management is deciding **which page to evict** when RAM is full, managing the **swap** area, and detecting **thrashing**. The hardware translation (MMU, TLB, page-table walk) belongs to [Memory Hierarchy](./Memory-Hierarchy.md).

<details><summary>Details</summary>

**Page replacement policies** (the OS's responsibility):
- **FIFO** (First-In, First-Out): evict the oldest page in memory. Simple but suffers from **Belady's anomaly** (more frames can increase faults).
- **LRU** (Least Recently Used): evict the page that has not been referenced for the longest time. Optimal in theory (Belady's algorithm) but expensive to track exactly; approximated by hardware reference bits.
- **Clock / Second-Chance**: maintain a circular queue of frames with a use bit. The hand advances; if the use bit is set, clear it and skip; if clear, evict. $`O(1)` per reference, a practical approximation of LRU.
- **Working-set model**: the OS tracks the set of pages a process has referenced in the last $`\tau` time units. If the sum of all working sets exceeds physical memory, the system is **thrashing** (spending more time swapping than computing). Mitigation: reduce the number of admitted processes or increase RAM.

**Swap management**: when RAM is full, the OS writes inactive pages to a swap file (or swap partition) on disk. The swap area is typically $`1`–$`2`× RAM. The OS uses a **page-out** policy (often the same replacement algorithm) to select which pages to write, and a **page-in** policy to bring them back on demand.

**Page fault handling** (OS role): on a fault, the OS (1) checks the page-table entry to determine the fault type (not-present, protection, write-on-clean), (2) allocates a free frame, (3) if the page is on disk, issues a DMA read, (4) updates the page table, (5) restarts the faulting instruction. The hardware TLB and page-table walk that triggered the fault are described in [Memory Hierarchy](./Memory-Hierarchy.md).

</details>

## Drivers and I/O interrupts

**I/O** (Input/Output) is the transfer of data between the CPU and a device (disk, network, keyboard). **Interrupts** are hardware signals that notify the CPU of an event (I/O complete, timer tick, exception). The hardware interrupt mechanism (APIC, interrupt vectors, pipeline flush) is described in [CPU Architecture](./CPU-Architecture.md).

<details><summary>Details</summary>

**I/O modes**:
- **Programmed I/O**: the CPU polls the device in a loop. Wastes CPU cycles.
- **Interrupt-driven I/O**: the device raises an interrupt when ready. The CPU handles the interrupt and returns to the current task.
- **DMA**: the device transfers data directly to/from memory without CPU intervention. The CPU is notified by an interrupt when the transfer is complete.

**Interrupt handling** (OS role): the kernel's interrupt handler (ISR) acknowledges the device and schedules a **bottom-half** (softirq, tasklet, or workqueue) to do the heavy work in process context. **NMI** (Non-Maskable Interrupt): cannot be disabled; used for hardware errors.

**Drivers**: kernel modules that implement device-specific I/O operations. A **device driver** exposes a uniform interface (`read`, `write`, `ioctl`) to the rest of the OS, hiding hardware details behind the VFS (Virtual File System) layer.

</details>

## Syscalls

A **syscall** (system call) is the interface between user space and kernel space. It is a controlled transition from user mode to kernel mode (via `syscall` on x86-64, `int 0x80` on x86-32, or `svc` on ARM).

<details><summary>Details</summary>

Common syscalls:
- `read(fd, buf, n)` / `write(fd, buf, n)`: transfer data to/from a file descriptor.
- `open(path, flags)` / `close(fd)`: open and close a file.
- `mmap(addr, len, prot, flags, fd, offset)`: map a file or anonymous memory into the process address space.
- `fork()` / `execve(path, argv, envp)` / `waitpid(pid, ...)`: create and manage child processes.
- `brk(addr)` / `sbrk(delta)`: adjust the heap boundary.
- `ioctl(fd, request, arg)`: device-specific control operations.

The kernel validates the arguments, performs the operation, and returns a result (or an error code via `errno`). The user process is blocked until the syscall completes (or returns immediately for non-blocking operations).

</details>

## Inter-Process Communication

**IPC** mechanisms allow processes to exchange data or synchronize. They are the OS-level primitives that higher-level concurrency patterns (CSP, actor model) build upon.

<details><summary>Details</summary>

- **Pipes** (`pipe()`): a unidirectional byte stream between a parent and child (or any two related processes). Backed by a kernel buffer (typically 64 KB). `read`/`write` block when the buffer is full/empty.
- **Unix domain sockets** (`socket(AF_UNIX, ...)`): bidirectional, connection-oriented or datagram, local-only. Faster than TCP loopback (no network stack). Used by `systemd`, D-Bus, and many daemons.
- **Shared memory** (`mmap(MAP_SHARED)`, `shm_open`): two or more processes map the same physical pages into their address spaces. Fastest IPC (no copy), but requires explicit synchronization (mutexes, semaphores) to avoid data races.
- **Message queues** (`mq_open`, System V `msgget`): kernel-managed FIFO of discrete messages. Supports priority and size limits. Decouples sender and receiver.
- **Signals** (`kill(pid, sig)`, `sigaction`): asynchronous notifications (e.g., `SIGTERM`, `SIGCHLD`, `SIGSEGV`). Delivered by the kernel; the receiving process runs a handler or takes the default action (terminate, dump core). Signals are the OS's mechanism for inter-process *notification* rather than data transfer.

</details>

## Boot

The boot sequence takes the machine from power-on to a running user process.

<details><summary>Details</summary>

1. **Firmware** (BIOS/UEFI): runs from ROM. Initializes hardware (POST), locates the bootloader.
2. **Bootloader** (GRUB, UEFI boot manager): loads the kernel image and initramfs into memory.
3. **Kernel**: decompresses, initializes subsystems (memory, scheduler, I/O), mounts the root file system.
4. **init** (PID 1): the first user-space process. Spawns system services and the login shell.

The **MBR** (Master Boot Record) is the first 512 bytes of a disk: 446 bytes of bootloader code + 64-byte partition table + 2-byte signature. UEFI replaces the MBR with an **EFI System Partition** (FAT32) containing the boot manager.

</details>

## File systems

A **file system** organizes data on a storage device. A **file** is a sequence of bytes. An **inode** stores metadata (size, permissions, timestamps, block pointers). A **sector** is the minimum unit of disk I/O (512 B for legacy HDDs, 4 KB for modern drives). A **block** is a file-system-level abstraction that groups one or more sectors (typically 4 KB); it is the unit in which the file system allocates and addresses data.

<details><summary>Details</summary>

**File descriptors** (fd): a small integer that refers to an open file. `open()` returns an fd; `read(fd, buf, n)`, `write(fd, buf, n)`, `close(fd)` operate on it. fd 0, 1, 2 are stdin, stdout, stderr.

**Inode and block mapping**:
- **Extents** (ext4 default, since ext3): the inode stores a tree of extents, each mapping a contiguous range of logical blocks to a contiguous range of physical blocks. With 32-bit logical block addressing and 4 KB blocks, a single file can address up to $`2^{32} \times 4 \text{ KB} = 16` TiB. Extent trees are shallow (typically 1–2 levels) and avoid the pointer-chasing of the legacy scheme.
- **Legacy direct/indirect** (ext2/ext3 fallback): 12 direct block pointers + 1 single-indirect + 1 double-indirect + 1 triple-indirect. With 4 KB blocks (1024 pointers per indirect block): $`12 + 1024 + 1{,}048{,}576 + 1{,}073{,}741{,}824` blocks $`\approx 4` TB per file. This scheme is retained for backward compatibility but is not the default in ext4.

**Allocation strategies**:
- **Contiguous**: a file occupies a contiguous range of blocks. Fast sequential access; external fragmentation.
- **Linked**: each block points to the next. No fragmentation; slow random access.
- **Indexed / extent**: the inode points to a block map (or extent tree). Fast random access; the map itself takes a small amount of space.

**`seek(fd, offset, whence)`**: move the file offset. `lseek(fd, 0, SEEK_END)` returns the file size. **`append`**: `open(path, O_APPEND)` sets the offset to the end before each write.

**`rename(old, new)`**: atomic on the same file system. **`link(old, new)`**: create a new directory entry pointing to the same inode (hard link).

**Journaling** (ext4, XFS, NTFS): log metadata changes before applying them. After a crash, replay the journal to recover consistency. **Copy-on-write** (ZFS, Btrfs): modify a copy of the block, then atomically update the pointer. Crash-safe without a journal.

</details>

## Simulation

<iframe src="./Operating-System.simulation.html" title="Process scheduler: Gantt chart for FCFS, SJF, and Round Robin"></iframe>

<iframe src="./Operating-System-PageReplacement.simulation.html" title="Page replacement: LRU vs Clock with a sequence of page references"></iframe>

## Example problem

**Problem**: A process calls `open("/data/file.txt", O_RDONLY)`, then `read(fd, buf, 4096)`, then `close(fd)`. Describe the sequence of syscalls, disk accesses, and cache interactions.

<details><summary>Solution</summary>

1. **`open("/data/file.txt", O_RDONLY)`**:
   - The kernel resolves the path: look up `/data` in the root directory's inode, then `file.txt` in `/data`'s inode.
   - If the directory entries are not in the **dentry cache** or **inode cache**, the kernel reads the directory blocks from disk.
   - The kernel creates a `file` structure and assigns an fd (e.g., 3).
   - **Disk accesses**: 0–2 (if cached) or 2–4 (if cold: root dir + /data dir + inode).

2. **`read(fd, buf, 4096)`**:
   - The kernel checks the file's current offset (0).
   - It looks up the block containing offset 0 in the inode's extent tree.
   - If the block is in the **page cache** (buffer cache), it copies 4096 bytes to `buf`. **Disk access: 0**.
   - If not in the page cache, it issues a disk read (DMA), waits for the interrupt, then copies. **Disk access: 1** ($`\approx 100 \mu s` for SSD, $`\approx 10` ms for HDD).
   - The offset advances to 4096.

3. **`close(fd)`**:
   - The kernel decrements the file's reference count. If it reaches 0, it frees the `file` structure.
   - The inode and dentry remain in the cache (for future lookups).
   - **Disk access: 0**.

**Cache interaction summary** (cold start, all caches empty):

<table>
<tr><th>Syscall</th><th>Dentry cache</th><th>Inode cache</th><th>Page cache</th></tr>
<tr><td><code>open("/data/file.txt")</code></td><td>MISS → load</td><td>MISS → load</td><td>—</td></tr>
<tr><td><code>read(fd, buf, 4096)</code></td><td>HIT</td><td>HIT</td><td>MISS → DMA read</td></tr>
<tr><td><code>close(fd)</code></td><td>HIT (retained)</td><td>HIT (retained)</td><td>HIT (retained)</td></tr>
</table>

**Total disk accesses**: 0–6 (depending on cache state). The page cache is the most important: it makes repeated reads of the same file a memory copy instead of a disk read.

</details>

