# Operating System

The operating system mediates between programs and hardware: it schedules processes, manages memory, provides file abstractions, and drives I/O devices. Examples include **Linux**, **Windows**, and **macOS** (plus the BSDs); they share the same concepts but differ in implementation (schedulers, syscall sets, file systems). It is relevant whenever a program's resource usage, isolation, or I/O behavior must be understood or controlled.

> **Authoritative sources**
> - [Operating System Concepts (Silberschatz, Galvin, Gagne)](https://www.pearson.com/en-us/subject-catalog/p/operating-system-concepts/P200000003515/9780136874608)
> - [The Design and Implementation of the 4.4BSD Operating System (Leffler et al.)](https://www.oreilly.com/library/view/the-design-and/0130200072/)
> - [Linux man-pages — full syscall list](https://man7.org/linux/man-pages/dir_syscalls.html)
> - [Windows Internals (Russinovich, Solomon, Ionescu)](https://learn.microsoft.com/en-us/sysinternals/resources/windows-internals)
> - [Apple Developer Documentation (macOS)](https://developer.apple.com/documentation/)

## Processes

A **process** is a running program with its own virtual address space, file descriptors, and resources, identified by a unique **PID**. A **thread** shares the process's address space but has its own stack and [registers](./CPU-Architecture.md). A **core** executes one thread at a time (or two with SMT/hyperthreading). **Preemption** is the OS's ability to interrupt a running process and switch to another; **cooperative scheduling** requires the process to voluntarily yield.

For the deeper treatment of M:N scheduling, thread pools, race conditions, and the memory model, see [Concurrency](../Distributed-Systems/Concurrency/Readme.md). A process's memory layout (text, data, bss, heap, stack) and virtual memory (page tables, TLB, swap) are covered in Memory management below; the physical memory hierarchy (caches, RAM, disk) is in [Memory Hierarchy](./Memory-Hierarchy.md).

<details><summary>EXPLANATION</summary>

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

The OS owns each process's **virtual memory**: it builds and maintains the page tables, services page faults, decides which page to evict when RAM is full, and manages the swap area. The hardware MMU only performs the translation mechanically; the page tables are OS data. (The physical memory hierarchy — caches, RAM, disk — is covered in [Memory Hierarchy](./Memory-Hierarchy.md).)

<details><summary>EXPLANATION</summary>

### Virtual address space and page tables

Each process sees a contiguous **virtual address space** (e.g., 48-bit = 256 TB on x86-64). The **MMU** translates virtual to physical addresses using **page tables**. On x86-64, a 4-level table: PML4 → PDPT → PD → PT, each with 512 entries (9 bits of the address per level); the default page size is 4 KB (12-bit offset). The OS allocates the page tables per process and updates them on `fork`/`execve`/`mmap`.

### TLB and huge pages

The **TLB** (Translation Lookaside Buffer) is a small, fully-associative hardware cache of recent page-table entries (typically 64–1024 entries). A TLB hit costs 1 cycle; a miss walks the page table (4–5 memory accesses, 400–500 cycles). **Huge pages** cut TLB pressure dramatically: a **2 MB page** covers 512 × 4 KB (a 1 GB working set needs 512 TLB entries instead of 262,144); a **1 GB page** covers 512 × 2 MB. The OS exposes them via `madvise(MADV_HUGEPAGE)` / `hugetlbfs`; Linux **Transparent Huge Pages (THP)** coalesce 4 KB pages into 2 MB pages in the background.

### Page faults

A **page fault** occurs when a virtual address is not mapped to a physical frame. On a fault, the OS (1) checks the page-table entry for the fault type (not-present, protection, write-on-clean), (2) allocates a free frame, (3) if the page is on disk, issues a DMA read, (4) updates the page table, (5) restarts the faulting instruction. A **major fault** (page on disk: $`\approx 100 \mu s` SSD, $`\approx 10` ms HDD) is expensive; a **minor fault** (page in RAM but not mapped to this process, ~1 µs) is cheap.

### Process memory layout

A process's address space is divided into segments: **text** (code, read-only, shared between processes), **data** (initialized globals), **bss** (zero-initialized globals), **heap** (grows upward; `brk`/`sbrk`/`mmap`), and **stack** (grows downward; one frame per function call). The OS sets the initial layout at `execve` and grows the heap and stack on demand.

<svg width="520" height="360" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <defs>
    <marker id="dn" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#8e24aa"/></marker>
    <marker id="up" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,6 L8,3 L0,0 Z" fill="#ef6c00"/></marker>
  </defs>
  <!-- kernel space -->
  <rect x="200" y="10" width="180" height="45" fill="#fce4ec" stroke="#c62828" stroke-width="2"/>
  <text x="290" y="30" text-anchor="middle" font-weight="bold">Kernel space</text>
  <text x="290" y="46" text-anchor="middle" font-size="9">0xffff800000000000 – 0xffffffffffffffff</text>
  <!-- user/kernel boundary -->
  <line x1="190" y1="62" x2="390" y2="62" stroke="#999" stroke-dasharray="4 3"/>
  <text x="395" y="66" font-size="10" fill="#555">0x00007fffffffffff</text>
  <!-- stack -->
  <rect x="200" y="70" width="180" height="30" fill="#e1bee7" stroke="#8e24aa" stroke-width="2"/>
  <text x="290" y="89" text-anchor="middle" font-size="11">Stack (grows down)</text>
  <text x="10" y="89" font-size="10" fill="#555">0x00007ffffffff000</text>
  <line x1="360" y1="100" x2="360" y2="118" stroke="#8e24aa" stroke-width="1.5" marker-end="url(#dn)"/>
  <!-- gap -->
  <rect x="200" y="122" width="180" height="38" fill="none" stroke="#bbb" stroke-dasharray="4 3"/>
  <text x="290" y="145" text-anchor="middle" font-size="10" fill="#999">unmapped</text>
  <!-- mmap region -->
  <rect x="200" y="166" width="180" height="28" fill="#e0f2f1" stroke="#00897b" stroke-width="2"/>
  <text x="290" y="184" text-anchor="middle" font-size="11">mmap, shared libraries (grow down)</text>
  <text x="10" y="184" font-size="10" fill="#555">≈ 0x7ffff7000000</text>
  <!-- gap -->
  <rect x="200" y="200" width="180" height="38" fill="none" stroke="#bbb" stroke-dasharray="4 3"/>
  <text x="290" y="223" text-anchor="middle" font-size="10" fill="#999">unmapped</text>
  <!-- heap -->
  <rect x="200" y="244" width="180" height="28" fill="#fff3e0" stroke="#ef6c00" stroke-width="2"/>
  <text x="290" y="262" text-anchor="middle" font-size="11">Heap (grows up, brk)</text>
  <line x1="360" y1="244" x2="360" y2="226" stroke="#ef6c00" stroke-width="1.5" marker-end="url(#up)"/>
  <!-- bss / data / text -->
  <rect x="200" y="296" width="180" height="20" fill="#f5f5f5" stroke="#9e9e9e"/>
  <text x="290" y="310" text-anchor="middle" font-size="10">bss (zero-initialized globals)</text>
  <rect x="200" y="318" width="180" height="20" fill="#fff8e1" stroke="#f9a825"/>
  <text x="290" y="332" text-anchor="middle" font-size="10">data (initialized globals, literals)</text>
  <rect x="200" y="340" width="180" height="20" fill="#e3f2fd" stroke="#1565c0"/>
  <text x="290" y="354" text-anchor="middle" font-size="10">text (code)</text>
  <text x="10" y="354" font-size="10" fill="#555">0x400000</text>
  <line x1="190" y1="362" x2="390" y2="362" stroke="#999"/>
  <text x="395" y="366" font-size="10" fill="#555">0x0 — null page, unmapped</text>
  <text x="290" y="14" font-size="9" fill="#c62828"></text>
</svg>

**Page replacement policies** (the OS's responsibility):
- **FIFO** (First-In, First-Out): evict the oldest page in memory. Simple but suffers from **Belady's anomaly** (more frames can increase faults).
- **LRU** (Least Recently Used): evict the page that has not been referenced for the longest time. Optimal in theory (Belady's algorithm) but expensive to track exactly; approximated by hardware reference bits.
- **Clock / Second-Chance**: maintain a circular queue of frames with a use bit. The hand advances; if the use bit is set, clear it and skip; if clear, evict. $`O(1)` per reference, a practical approximation of LRU.
- **Working-set model**: the OS tracks the set of pages a process has referenced in the last $`\tau` time units. If the sum of all working sets exceeds physical memory, the system is **thrashing** (spending more time swapping than computing). Mitigation: reduce the number of admitted processes or increase RAM.

**Swap management**: when RAM is full, the OS writes inactive pages to a swap file (or swap partition) on disk. The swap area is typically $`1`–$`2`× RAM. The OS uses a **page-out** policy (often the same replacement algorithm) to select which pages to write, and a **page-in** policy to bring them back on demand.


</details>


## Drivers and I/O interrupts

**I/O** (Input/Output) is the transfer of data between the CPU and a device (disk, network, keyboard). **Interrupts** are hardware signals that notify the CPU of an event (I/O complete, timer tick, exception). The hardware interrupt mechanism (APIC, interrupt vectors, pipeline flush) is described in [CPU Architecture](./CPU-Architecture.md).

<details><summary>EXPLANATION</summary>

**I/O modes**:
- **Programmed I/O**: the CPU polls the device in a loop. Wastes CPU cycles.
- **Interrupt-driven I/O**: the device raises an interrupt when ready. The CPU handles the interrupt and returns to the current task.
- **DMA**: the device transfers data directly to/from memory without CPU intervention. The CPU is notified by an interrupt when the transfer is complete.

**Interrupt handling** (OS role): the kernel's interrupt handler (ISR) acknowledges the device and schedules a **bottom-half** (softirq, tasklet, or workqueue) to do the heavy work in process context. **NMI** (Non-Maskable Interrupt): cannot be disabled; used for hardware errors.

**Drivers**: kernel modules that implement device-specific I/O operations. A **device driver** exposes a uniform interface (`read`, `write`, `ioctl`) to the rest of the OS, hiding hardware details behind the VFS (Virtual File System) layer.

</details>

## Syscalls

A **syscall** (system call) is the interface between user space and kernel space. It is a controlled transition from user mode to kernel mode (via `syscall` on x86-64, `int 0x80` on x86-32, or `svc` on ARM).

<details><summary>EXPLANATION</summary>

Common syscalls:
- `read(fd, buf, n)` / `write(fd, buf, n)`: transfer data to/from a file descriptor.
- `open(path, flags)` / `close(fd)`: open and close a file.
- `mmap(addr, len, prot, flags, fd, offset)`: map a file or anonymous memory into the process address space.
- `fork()` / `execve(path, argv, envp)` / `waitpid(pid, ...)`: create and manage child processes.
- `brk(addr)` / `sbrk(delta)`: adjust the heap boundary.
- `ioctl(fd, request, arg)`: device-specific control operations.

The kernel validates the arguments, performs the operation, and returns a result (or an error code via `errno`). The user process is blocked until the syscall completes (or returns immediately for non-blocking operations). The full list of Linux syscalls is in the [man-pages syscall index](https://man7.org/linux/man-pages/dir_syscalls.html).

</details>

## Inter-Process Communication

**IPC** mechanisms allow processes to exchange data or synchronize. They are the OS-level primitives that higher-level concurrency patterns (CSP, actor model) build upon.

<details><summary>EXPLANATION</summary>

- **Pipes** (`pipe()`): a unidirectional byte stream between a parent and child (or any two related processes). Backed by a kernel buffer (typically 64 KB). `read`/`write` block when the buffer is full/empty.
- **Unix domain sockets** (`socket(AF_UNIX, ...)`): bidirectional, connection-oriented or datagram, local-only. Faster than TCP loopback (no network stack). Used by `systemd`, D-Bus, and many daemons.
- **Shared memory** (`mmap(MAP_SHARED)`, `shm_open`): two or more processes map the same physical pages into their address spaces. Fastest IPC (no copy), but requires explicit synchronization (mutexes, semaphores) to avoid data races.
- **Message queues** (`mq_open`, System V `msgget`): kernel-managed FIFO of discrete messages. Supports priority and size limits. Decouples sender and receiver.
- **Signals** (`kill(pid, sig)`, `sigaction`): asynchronous notifications (e.g., `SIGTERM`, `SIGCHLD`, `SIGSEGV`). Delivered by the kernel; the receiving process runs a handler or takes the default action (terminate, dump core). Signals are the OS's mechanism for inter-process *notification* rather than data transfer.

</details>

## Boot

The boot sequence takes the machine from power-on to a running user process.

<details><summary>EXPLANATION</summary>

1. **Firmware** (BIOS/UEFI): runs from ROM. Initializes hardware (POST), locates the bootloader.
2. **Bootloader** (GRUB, UEFI boot manager): loads the kernel image and initramfs into memory.
3. **Kernel**: decompresses, initializes subsystems (memory, scheduler, I/O), mounts the root file system.
4. **init** (PID 1): the first user-space process. Spawns system services and the login shell.

The **MBR** (Master Boot Record) is the first 512 bytes of a disk: 446 bytes of bootloader code + 64-byte partition table + 2-byte signature. UEFI replaces the MBR with an **EFI System Partition** (FAT32) containing the boot manager.

</details>

## File systems

A **file system** organizes data on a storage device. A **file** is a sequence of bytes. An **inode** stores metadata (size, permissions, timestamps, block pointers). A **sector** is the minimum unit of disk I/O (512 B for legacy HDDs, 4 KB for modern drives). A **block** is a file-system-level abstraction that groups one or more sectors (typically 4 KB); it is the unit in which the file system allocates and addresses data.

<svg width="520" height="230" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;font-size:12px;">
  <defs><marker id="fsarr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
  <rect x="10" y="14" width="500" height="26" rx="4" fill="#eceff1" stroke="#607d8b"/>
  <rect x="10" y="14" width="90" height="26" fill="#cfd8dc"/><text x="55" y="31" text-anchor="middle" font-size="10">superblock</text>
  <rect x="100" y="14" width="130" height="26" fill="#cfd8dc"/><text x="165" y="31" text-anchor="middle" font-size="10">inode table (metadata)</text>
  <rect x="230" y="14" width="280" height="26" fill="#e3f2fd" stroke="#1565c0"/><text x="370" y="31" text-anchor="middle" font-size="10">data blocks</text>
  <rect x="10" y="70" width="150" height="62" rx="6" fill="#fff8e1" stroke="#f9a825" stroke-width="2"/>
  <text x="85" y="88" text-anchor="middle" font-weight="bold">directory file</text>
  <text x="20" y="106" font-size="11">"file.txt" → inode 42</text>
  <text x="20" y="124" font-size="11">"docs" → inode 7</text>
  <line x1="160" y1="100" x2="208" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#fsarr)"/>
  <text x="184" y="92" text-anchor="middle" font-size="9">lookup</text>
  <rect x="210" y="64" width="150" height="100" rx="6" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="285" y="82" text-anchor="middle" font-weight="bold">inode 42</text>
  <text x="220" y="98" font-size="10">metadata: size, perms,</text>
  <text x="220" y="111" font-size="10">owner, timestamps</text>
  <text x="220" y="128" font-size="10">extents (logical → physical):</text>
  <text x="220" y="143" font-size="10">[0–7] → blocks 100–107</text>
  <text x="220" y="156" font-size="10">[8–9] → blocks 200–201</text>
  <line x1="360" y1="140" x2="425" y2="188" stroke="#333" stroke-width="1.5" marker-end="url(#fsarr)"/>
  <text x="10" y="182" font-size="10" fill="#555">physical blocks:</text>
  <rect x="10" y="190" width="26" height="24" fill="#eceff1" stroke="#b0bec5"/>
  <text x="23" y="206" text-anchor="middle" font-size="8">96</text>
  <rect x="40" y="190" width="26" height="24" fill="#eceff1" stroke="#b0bec5"/>
  <text x="53" y="206" text-anchor="middle" font-size="8">97</text>
  <rect x="70" y="190" width="26" height="24" fill="#eceff1" stroke="#b0bec5"/>
  <text x="83" y="206" text-anchor="middle" font-size="8">98</text>
  <rect x="100" y="190" width="26" height="24" fill="#eceff1" stroke="#b0bec5"/>
  <text x="113" y="206" text-anchor="middle" font-size="8">99</text>
  <rect x="130" y="190" width="26" height="24" fill="#90caf9" stroke="#1565c0"/>
  <text x="143" y="206" text-anchor="middle" font-size="8">100</text>
  <rect x="160" y="190" width="26" height="24" fill="#90caf9" stroke="#1565c0"/>
  <text x="173" y="206" text-anchor="middle" font-size="8">101</text>
  <rect x="190" y="190" width="26" height="24" fill="#90caf9" stroke="#1565c0"/>
  <text x="203" y="206" text-anchor="middle" font-size="8">102</text>
  <rect x="220" y="190" width="26" height="24" fill="#90caf9" stroke="#1565c0"/>
  <text x="233" y="206" text-anchor="middle" font-size="8">103</text>
  <rect x="250" y="190" width="26" height="24" fill="#90caf9" stroke="#1565c0"/>
  <text x="263" y="206" text-anchor="middle" font-size="8">104</text>
  <rect x="280" y="190" width="26" height="24" fill="#90caf9" stroke="#1565c0"/>
  <text x="293" y="206" text-anchor="middle" font-size="8">105</text>
  <rect x="310" y="190" width="26" height="24" fill="#90caf9" stroke="#1565c0"/>
  <text x="323" y="206" text-anchor="middle" font-size="8">106</text>
  <rect x="340" y="190" width="26" height="24" fill="#90caf9" stroke="#1565c0"/>
  <text x="353" y="206" text-anchor="middle" font-size="8">107</text>
  <rect x="370" y="190" width="26" height="24" fill="#eceff1" stroke="#b0bec5"/>
  <text x="383" y="206" text-anchor="middle" font-size="8">108</text>
  <rect x="400" y="190" width="26" height="24" fill="#eceff1" stroke="#b0bec5"/>
  <text x="413" y="206" text-anchor="middle" font-size="8">109</text>
  <rect x="430" y="190" width="26" height="24" fill="#eceff1" stroke="#b0bec5"/>
  <text x="443" y="206" text-anchor="middle" font-size="8">110</text>
  <rect x="460" y="190" width="26" height="24" fill="#eceff1" stroke="#b0bec5"/>
  <text x="473" y="206" text-anchor="middle" font-size="8">111</text>
</svg>

<details><summary>EXPLANATION</summary>

**File descriptors** (fd): a small integer that refers to an open file. `open()` returns an fd; `read(fd, buf, n)`, `write(fd, buf, n)`, `close(fd)` operate on it. fd 0, 1, 2 are stdin, stdout, stderr.

**`open()` flags**: `open(path, flags, mode)` takes a bitmask of flags: `O_RDONLY` / `O_WRONLY` / `O_RDWR` choose the access mode; `O_CREAT` creates the file if missing (with `mode`, e.g. `0644`, as the third argument), `O_TRUNC` empties an existing file, `O_APPEND` seeks to the end before every write, `O_EXCL` (combined with `O_CREAT`) fails if the file already exists — an atomic create. Example: `open("log.txt", O_WRONLY | O_CREAT | O_APPEND, 0644)`.

**Inode metadata**: besides the block/extent pointers, each inode stores (all in `st_mode` and friends): the **file type** — regular file, directory, symbolic link, socket, device, or FIFO (named pipe) — the **owner user and group**, the **permissions** — read/write/execute for user, group, and all others (nine bits, e.g. `0755`), plus setuid/setgid/sticky — and the **timestamps**: `atime` (last read), `mtime` (content last modified), and `ctime` (inode/metadata last changed: permissions, owner, link count… — note `ctime` is *not* creation time on Linux). `stat()` exposes all of these.

**Inode and block mapping**:
- **Extents** (ext4 default, since ext3): the inode stores a tree of extents, each mapping a contiguous range of logical blocks to a contiguous range of physical blocks. With 32-bit logical block addressing and 4 KB blocks, a single file can address up to $`2^{32} \times 4 \text{ KB} = 16` TiB. Extent trees are shallow (typically 1–2 levels) and avoid the pointer-chasing of the legacy scheme.
- **Legacy direct/indirect** (ext2/ext3 fallback): 12 direct block pointers + 1 single-indirect + 1 double-indirect + 1 triple-indirect. With 4 KB blocks (1024 pointers per indirect block): $`12 + 1024 + 1{,}048{,}576 + 1{,}073{,}741{,}824` blocks $`\approx 4` TB per file. This scheme is retained for backward compatibility but is not the default in ext4.

**Allocation strategies**:
- **Contiguous**: a file occupies a contiguous range of blocks. Fast sequential access; external fragmentation.
- **Linked**: each block points to the next. No fragmentation; slow random access.
- **Indexed / extent**: the inode points to a block map (or extent tree). Fast random access; the map itself takes a small amount of space.

**`seek(fd, offset, whence)`**: move the file offset. `lseek(fd, 0, SEEK_END)` returns the file size. **`append`**: `open(path, O_APPEND)` sets the offset to the end before each write.

**`rename(old, new)`**: atomic on the same file system. **`link(old, new)`**: create a new directory entry pointing to the same inode (hard link).

**Journaling** (ext4, XFS, NTFS): log metadata changes before applying them. After a crash, replay the journal to recover consistency.

**Copy-on-write (COW)** (Btrfs, ZFS, APFS): the file system never modifies an existing block or extent in place. A write goes to a brand-new extent, and only then is the inode's pointer atomically updated to the new extent. A crash mid-write leaves the old version intact, so COW is crash-safe without a journal — and it makes snapshots cheap (the old extents are simply kept alive by the snapshot's inode).

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

