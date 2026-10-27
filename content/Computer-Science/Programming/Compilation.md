# Compilation

Compilation studies how source code is transformed into executable programs. It is relevant whenever a program must be translated from one representation to another for execution on a target architecture.

> **Authoritative sources**
> - [Compilers: Principles, Techniques, and Practice (Aho, Lam, Sethi, Ullman)](https://cs.stanford.edu/people/ouster/compilers-book.html)
> - [Modern Compiler Implementation in ML (Appel)](https://www.cs.princeton.edu/~appel/modern/ml/)

## Compiler pipeline

A **compiler** transforms source code into machine code through a sequence of passes:

```math
\text{source} \xrightarrow{\text{tokenize}} \text{tokens} \xrightarrow{\text{parse}} \text{AST} \xrightarrow{\text{type check}} \text{typed AST} \xrightarrow{\text{IR gen}} \text{IR} \xrightarrow{\text{optimize}} \text{IR}' \xrightarrow{\text{code gen}} \text{machine code}
```

<details><summary>Details</summary>

The pipeline is a sequence of **passes**, each of which reads one representation and produces the next. Passes are independent: a compiler can be re-targeted by replacing the back-end (IR → machine code) while keeping the same front-end (source → IR).

<iframe src="./Compilation.simulation.html" title="Animated compiler pipeline: source code transformed through each pass"></iframe>

</details>

## Front-end: parsing and type checking

The front-end translates source text into a structured, type-checked representation. It is target-independent: the same front-end can feed any back-end.

- **Tokenizer (lexer)**: splits the character stream into tokens (identifiers, literals, operators, keywords). See [Language Theory](./Language-Theory.md) for grammar and tokenization details.
- **Parser**: builds an Abstract Syntax Tree (AST) from the token stream using a grammar (LL, LR, recursive descent). See [Language Theory](./Language-Theory.md) for parser construction.
- **Type checker**: walks the AST, infers or verifies types, and rejects ill-typed expressions. See [Language Theory](./Language-Theory.md) for type systems and Hindley-Milner inference.

<details><summary>Details</summary>

The front-end is where most user-facing error messages originate. A good front-end reports the first error with a precise location and a suggestion. The AST is a tree whose nodes are syntactic constructs (function calls, conditionals, assignments) and whose leaves are identifiers and literals. The type checker annotates each node with its type, producing a **typed AST** that the IR generator can consume.

The front-end is entirely target-independent. The same C front-end can produce x86, ARM, or RISC-V code by swapping the back-end. This separation is the key architectural insight of the compiler pipeline.

</details>

## Intermediate Representations

An **intermediate representation (IR)** is a machine-independent, structured form of the program that sits between the front-end and the back-end. IRs exist because:

1. The AST is too high-level for optimization (it mirrors source syntax, not computation).
2. The target ISA is too low-level to be portable (each architecture has different registers, opcodes, and calling conventions).
3. A middle form lets the compiler apply optimizations once, independent of the target.

### Three-address code (TAC)

Every operation is expressed with at most three operands: $`x \leftarrow y \ op \ z`. This eliminates nested expressions and makes data dependencies explicit.

```
// Source:  c = (a + b) * (a - b)
// TAC:
  t1 = a + b
  t2 = a - b
  c  = t1 * t2
```

### Static Single Assignment (SSA) form

In **SSA**, every variable is assigned exactly once. Multiple logical assignments to the same variable become distinct SSA names ($`x_1, x_2, x_3`), joined by **phi (φ) nodes** at control-flow merge points.

```
// Source:
//   if (cond) { x = 1; } else { x = 2; }
//   y = x + 3;
// SSA:
  x1 = 1
  x2 = 2
  x3 = φ(x1, x2)   // at the merge point
  y  = x3 + 3
```

SSA makes data-flow analysis (liveness, reaching definitions, constant propagation) linear-time and local, because each variable has a single definition site.

<details><summary>Details</summary>

**Why SSA matters for optimization**: In non-SSA form, a variable like `x` may be defined in many places, so a pass that wants to know "what value does `x` have here?" must search all preceding definitions. In SSA, the value at any point is determined by following the single definition chain (or a φ node). This turns global data-flow problems into local graph traversals.

**Common IRs in practice**:
- **LLVM IR**: SSA-based, three-address, with explicit memory operations (loads/stores). Used by Clang, Rust, Swift.
- **GCC GIMPLE**: three-address, not SSA (SSA is a separate internal form, GIMPLE-SSA).
- **JVM bytecode**: stack-based, not SSA. The JVM JIT (C1/C2) converts bytecode to SSA internally for optimization.
- **MLIR**: a framework for composing multiple IRs at different abstraction levels (e.g., tensor ops → loop ops → memory ops → machine ops).

The choice of IR is a trade-off: higher-level IRs preserve more structure (loops, arrays, pointers) for aggressive optimizations; lower-level IRs are closer to the target and easier to schedule.

</details>

## Optimization passes

Optimization transforms the IR to reduce execution time, code size, or power consumption while preserving semantics. Passes are organized by the scope of analysis they perform.

### Local (basic-block) optimizations

- **Constant folding**: evaluate constant expressions at compile time ($`x = 3 + 4` → $`x = 7`).
- **Dead code elimination**: remove instructions whose results are never used.
- **Common subexpression elimination (CSE)**: compute a repeated expression once and reuse the result.

### Loop optimizations

- **Loop-invariant code motion (LICM)**: hoist computations that do not change across iterations out of the loop.
- **Loop unrolling**: replicate the loop body $`k` times to reduce branch overhead and expose instruction-level parallelism.
- **Vectorization**: transform scalar loop iterations into SIMD instructions that process multiple data elements per instruction. See [CPU Architecture](../Computer-Hardware/CPU-Architecture.md) for SIMD register details.

### Global (whole-function) optimizations

- **Inlining**: replace a function call with the callee's body, eliminating call overhead and exposing further optimization opportunities.
- **Partial evaluation**: specialize the program for known inputs, eliminating dead branches.
- **Register allocation**: assign virtual registers (variables) to the limited set of physical CPU registers. See [Memory Management](./Memory-Management.md) for the register-vs-memory hierarchy.

<details><summary>Details</summary>

**Register allocation** is the most complex optimization. It is modeled as a **graph coloring** problem:

- **Nodes**: live variables (virtual registers).
- **Edges**: two variables are connected if they are simultaneously live (they **interfere**).
- **Colors**: the available physical registers.
- **Goal**: assign a color to every node so that no two adjacent nodes share a color. If the graph is not $`k`-colorable (where $`k` is the number of physical registers), some variables must be **spilled** to memory (stack slots).

<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style="max-width:400px; margin:1em auto; display:block;">
  <circle cx="80" cy="60" r="22" fill="#4a90d9" opacity="0.85"/>
  <text x="80" y="65" text-anchor="middle" fill="white" font-size="12" font-weight="bold">a</text>
  <circle cx="200" cy="40" r="22" fill="#e74c3c" opacity="0.85"/>
  <text x="200" y="45" text-anchor="middle" fill="white" font-size="12" font-weight="bold">b</text>
  <circle cx="320" cy="60" r="22" fill="#2ecc71" opacity="0.85"/>
  <text x="320" y="65" text-anchor="middle" fill="white" font-size="12" font-weight="bold">c</text>
  <circle cx="140" cy="140" r="22" fill="#f39c12" opacity="0.85"/>
  <text x="140" y="145" text-anchor="middle" fill="white" font-size="12" font-weight="bold">d</text>
  <circle cx="260" cy="140" r="22" fill="#9b59b6" opacity="0.85"/>
  <text x="260" y="145" text-anchor="middle" fill="white" font-size="12" font-weight="bold">e</text>
  <line x1="100" y1="60" x2="180" y2="42" stroke="#555" stroke-width="2"/>
  <line x1="220" y1="42" x2="300" y2="58" stroke="#555" stroke-width="2"/>
  <line x1="95" y1="78" x2="128" y2="125" stroke="#555" stroke-width="2"/>
  <line x1="155" y1="140" x2="240" y2="140" stroke="#555" stroke-width="2"/>
  <line x1="275" y1="125" x2="310" y2="80" stroke="#555" stroke-width="2"/>
  <line x1="100" y1="75" x2="245" y2="130" stroke="#555" stroke-width="2" stroke-dasharray="4"/>
  <text x="200" y="190" text-anchor="middle" font-size="11" fill="#333">Interference graph: 5 variables, 3 physical registers → 2 spills needed</text>
</svg>

**Chaitin's algorithm** (Chaitin et al., 1981) extends greedy coloring with a **spilling** strategy: if a node has degree ≥ $`k` (more neighbors than available registers), it is tentatively removed, the graph is colored, and the removed node is assigned a stack slot (spill). The interference graph is built in $`O(n^2)` time (pairwise liveness checks over $`n` variables); the coloring step is $`O(n + m)` where $`m` is the number of edges. The overall complexity depends on the spilling strategy chosen.

**Simpler alternatives**: linear-scan allocation (used by V8, .NET) processes variables in order of their live range and assigns the first free register, spilling when none is available. It is $`O(n \log n)` and fast enough for JIT compilers where compile time is critical.

</details>

## Code generation

Code generation is the final, target-specific phase: it translates the optimized IR into a sequence of instructions for a specific [ISA](../Computer-Hardware/CPU-Architecture.md).

### Instruction selection

Match IR patterns to target instructions. This is a **tree-covering** or **dynamic-programming** problem: find the cheapest sequence of instructions that computes the same result as the IR expression tree.

```
// IR:  t1 = a + b
//      t2 = t1 * 4
// x86-64 selection:
  mov  rax, [a]
  add  rax, [b]      ; t1 = a + b
  shl  rax, 2        ; t2 = t1 * 4  (shift is cheaper than imul by power of 2)
```

### Instruction scheduling

Reorder instructions within a basic block to hide pipeline stalls (data hazards, branch mispredictions). The scheduler respects data dependencies but may reorder independent instructions to fill pipeline slots. See [CPU Architecture](../Computer-Hardware/CPU-Architecture.md) for pipelining and out-of-order execution details.

### Peephole optimization

Examine a small window of consecutive instructions and replace them with a shorter or faster equivalent:

- $`x = x + 0` → delete (no-op).
- $`x = x * 1` → delete.
- $`push x; pop x` → delete.
- $`x = x << 1` → $`x = x + x` (on some ISAs, addition is faster than shift).

<details><summary>Details</summary>

Code generation is the most target-specific part of the compiler. A single IR can be lowered to x86-64, AArch64, or RISC-V by swapping the instruction selection table and the scheduling model. The **calling convention** (which registers hold arguments, which are caller-saved vs. callee-saved) is part of the target ABI and is handled here. See [CPU Architecture](../Computer-Hardware/CPU-Architecture.md) for the full ISA description, register files, and calling conventions.

The output of code generation is an **object file** (ELF on Linux, Mach-O on macOS, PE/COFF on Windows) containing:
- Machine code (the instruction stream).
- A symbol table (function and global variable names).
- Relocation entries (places where addresses must be fixed up by the linker).
- Section metadata (alignment, read/write/execute permissions).

</details>

## Linking

The **linker** combines multiple object files (and libraries) into a single executable or shared library. It is distinct from the **loader**, which maps the final binary into memory at process start.

### Static linking

The linker resolves all symbol references at build time, copying the needed code from libraries (e.g., `libc.a`) directly into the executable. The result is a self-contained binary with no runtime library dependencies.

### Dynamic linking

The linker records references to shared libraries (e.g., `libc.so`) and the **dynamic linker** (runtime loader, e.g., `ld-linux.so`) resolves them at process start or on first use. This reduces binary size and allows multiple processes to share one copy of the library in memory.

### Symbol resolution and relocation

Each object file exports symbols (functions, globals) and imports symbols it references. The linker:
1. **Merges** symbol tables from all input objects.
2. **Resolves** each undefined symbol to exactly one definition (or reports an error).
3. **Performs relocations**: patches placeholder addresses in the code and data sections with the final addresses assigned by the linker.

### Linking vs. loading

- **Linking** (static or dynamic): resolves symbols and produces a final binary with fixed section layout. Happens at build time (static) or process start (dynamic).
- **Loading**: the OS kernel maps the binary's sections into the process's virtual address space, sets up the stack, and transfers control to the entry point (`_start`). See [Memory Management](./Memory-Management.md) for virtual memory and the process address space layout.

<details><summary>Details</summary>

**Position-independent code (PIC)**: dynamically linked code must be position-independent because the shared library may be loaded at any address. PIC uses a **Global Offset Table (GOT)** and **Procedure Linkage Table (PLT)** to resolve addresses at runtime. Modern compilers (x86-64, AArch64) generate PIC by default.

**Link-time optimization (LTO)**: the linker receives IR (not machine code) from each translation unit, enabling cross-module inlining, dead code elimination, and register allocation across function boundaries. This is a hybrid of compilation and linking.

</details>

## Execution models

Three models govern when and how compilation happens relative to execution:

- **AOT (Ahead-Of-Time)**: the entire program is compiled to native machine code before execution. Fast startup, no runtime overhead. Used by C, C++, Rust, Go.
- **JIT (Just-In-Time)**: the program is compiled to bytecode, then the runtime compiles hot code paths to native machine code during execution. Slower startup, but can optimize based on runtime profiles (e.g., which branches are taken, which types are actually used). Used by Java (HotSpot), JavaScript (V8, SpiderMonkey), .NET (CoreCLR).
- **Bytecode interpretation**: the bytecode is executed instruction-by-instruction by an interpreter, with no native compilation. Simplest to implement, slowest at runtime. Used by Python (CPython), Ruby (MRI).

<details><summary>Details</summary>

**Bytecode** is a platform-independent intermediate representation. The JVM bytecode, .NET IL, and Python bytecode are all examples. Bytecode is easier to verify (security: the JVM verifier checks type safety before execution) and to optimize (JIT: the runtime can specialize code based on observed types) than native code.

**Tiered compilation** (used by HotSpot, V8): the runtime starts with a fast, unoptimized JIT (or interpreter) and progressively compiles hot functions with more aggressive optimizations. V8 uses three tiers: Sparkplug (baseline), Maglev (mid-tier), and TurboFan (optimizing, with deoptimization if assumptions are violated).

**AOT + JIT hybrid**: .NET Native (AOT) and GraalVM (AOT for Java) compile to native code at build time but may still use runtime profiling for adaptive optimization.

</details>

## Example problem

**Problem**: A C function `int sum(int *a, int n)` sums an array of $`n` integers. A caller invokes it three times with arrays of lengths $`n_1, n_2, n_3`. After inlining, how many times does the loop body execute?

<details><summary>Solution</summary>

Inlining copies the function body into each call site. The loop body executes $`n_1 + n_2 + n_3` times total — once per element across all three arrays. The inlining itself does not change the iteration count; it eliminates the call/return overhead (register save/restore, jump) and exposes the loop to further optimizations (unrolling, vectorization, register allocation) that reduce the per-iteration cost.

</details>