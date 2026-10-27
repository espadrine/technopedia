# Programming

Programming studies how to specify computations precisely, how to transform specifications into executable programs, and how to structure programs for correctness, efficiency, and maintainability. It is relevant whenever a computation must be written, compiled, tested, or maintained.

## Utility

- It gives precise syntax and semantics to procedures.
- It maps programs onto memory, processes, and devices.
- It supports coordination across machines and users.
- It provides methods for proving correctness and detecting bugs.

<details><summary>Details</summary>

Programming sits between algorithmics and hardware: it takes the abstract procedure chosen by algorithmics and gives it a precise, machine-checkable form. The language specification defines what programs mean; the compiler transforms source into executable form; the runtime (OS, memory manager) executes the program on hardware. The boundary with algorithmics is: algorithmics asks "what is the procedure and what does it cost?"; programming asks "how do I write it so a machine can execute it, and how do I know it is correct?". The boundary with hardware is: programming specifies the computation; hardware provides the substrate.

</details>

## History

- 1957: FORTRAN makes high-level languages and compilers practical.
- 1972: C provides a portable, low-level language for systems programming.
- 1978: Unix and C make operating systems portable.
- 2000s: Java, C#, and garbage-collected languages make memory safety the default for application development.

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./Control-Flow-and-Semantics.md'>Control flow and semantics</a></td><td>Statements, expressions, scope, closures, recursion</td><td>Expressiveness, type safety, predictability</td><td>What a program means; does not model how it is compiled or executed</td></tr>
<tr><td><a href='./Memory-Management.md'>Memory management</a></td><td>Stack, heap, allocators, garbage collectors</td><td>Allocation cost, GC pause, memory overhead</td><td>How memory is allocated and reclaimed; does not model the physical memory hierarchy</td></tr>
<tr><td><a href='./Language-Theory.md'>Language theory</a></td><td>Tokenizers, parsers, type systems, grammars</td><td>Parse time, type inference power, expressiveness</td><td>How source code is structured and checked; does not model the target architecture</td></tr>
<tr><td><a href='./Compilation.md'>Compilation</a></td><td>Compilers, linkers, AOT/JIT, bytecode</td><td>Compile time, code size, runtime performance</td><td>How source is transformed into executable form; does not model the OS or the network</td></tr>
<tr><td><a href='./Design-Patterns.md'>Design patterns</a></td><td>Architectural and structural patterns</td><td>Coupling, cohesion, testability, maintainability</td><td>How to structure a program for long-term maintenance; does not model the algorithm or the hardware</td></tr>
<tr><td><a href='./Security.md'>Security</a></td><td>Memory safety, injection, authentication, authorization</td><td>Attack surface, exploitability, privilege level</td><td>How to protect a program from malicious input and misuse; does not model the cryptographic primitives themselves</td></tr>
<tr><td><a href='./Software-Engineering.md'>Software engineering</a></td><td>Version control, testing, CI/CD, observability</td><td>Defect rate, deployment frequency, mean time to recovery</td><td>How to build, test, deploy, and monitor software at scale; does not model the algorithm or the hardware</td></tr>
</table>

> **Authoritative sources**
> - [The Art of Computer Programming, Volume 1](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)
> - [ACM/IEEE-CS Curriculum Guidelines 2020](https://www.acm.org/education/curricula-guidelines)
