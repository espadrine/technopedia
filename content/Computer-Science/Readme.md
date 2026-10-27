# Computer Science

Computer science studies information, computation, and the design of systems that process information. It is relevant whenever a problem can be modeled as data plus rules, or when software, hardware, or networks must be built, analyzed, or optimized.

## Utility

- It turns informal procedures into precise algorithms with provable cost bounds.
- It chooses representations that make operations cheap and information compact.
- It connects abstract models to hardware, languages, and distributed systems.

<details><summary>Details</summary>

The five classes, ordered from most concrete to most abstract, span the full stack from running system to problem:

1. **Computer Hardware** asks how the program is physically executed: it provides the processor, memory hierarchy, and operating system that schedule instructions and manage resources.
2. **Programming** asks how to specify, structure, and maintain computations: it gives syntax, semantics, types, and compilation rules that turn an algorithm into an executable program, and covers the security and engineering practices that keep it correct and maintainable.
3. **Distributed Systems** asks how computation is coordinated across machines: it provides network protocols, consensus mechanisms, and fault-tolerance strategies that make a cluster behave like one machine.
4. **Information Theory** asks how to encode, compress, and protect the data that passes between layers: it bounds the minimum number of bits, designs error-correcting codes, and provides cryptographic primitives.
5. **Algorithmics** asks what can be computed and at what cost: it selects the representation and the procedure (the algorithm) that transforms input into output.

The hard part is not any single step but the interface between them: choosing a representation that is both algorithmically efficient and physically realizable, specifying it in a language that compiles to the target hardware, and deploying it in a network that tolerates failure.

The dependencies between classes are bidirectional: the choice of a data structure (Algorithmics) is constrained by the memory hierarchy (Computer Hardware), the design of a distributed algorithm (Distributed Systems) is constrained by network latency, and the choice of a programming language (Programming) is influenced by the target architecture (Computer Hardware). Each class both informs and is informed by the others.

Computer science is deeply rooted in [Mathematics](../Mathematics/Readme.md): algorithmics rests on formal logic and measure theory, information theory on probability and coding theory, and optimization on [convex analysis](../Mathematics/Analysis/Readme.md). It is equally grounded in [Physics](../Physics/Readme.md): computer hardware is built on semiconductor physics and quantum mechanics, and the thermodynamic limits of computation connect directly to statistical mechanics. It also connects to [Manufacturing](../Manufacturing/Readme.md): semiconductor fabrication (lithography, deposition, etching) is the physical process that produces the hardware studied by the Computer Hardware class; the yield, cost, and miniaturization limits of a chip are determined by manufacturing physics, not by algorithmic design.

Quantum computing is an emerging area that does not fit cleanly into a single class: quantum algorithms and quantum error correction belong to Algorithmics, while qubits and quantum processors belong to Computer Hardware.
</details>

## History

- 1936: Turing formalizes computation with Turing machines.
- 1945: von Neumann describes stored-program computer architecture.
- 1948: Shannon publishes "A Mathematical Theory of Communication," founding information theory.
- 2010s: Deep learning reshapes algorithmics (neural architectures), hardware (GPU/TPU design), and information theory (representation learning).

## Classes

The field is partitioned into five first-principles classes, each answering a distinct question about the layers of computation. The boundary is crisp: **algorithmics** studies the abstract objects and their cost; **information theory** studies the mathematical limits of encoding and transmission; **programming** studies the formal specification and transformation of procedures; **computer hardware** studies the physical execution substrate; **distributed systems** studies coordination across space and time. No class subsumes another: an algorithm is not a language, a language is not a circuit, a circuit is not a protocol, and a protocol is not a code.

The table is ordered as an abstraction gradient, from the most concrete (computer hardware) to the most abstract (algorithmics). The rows are ordered by level of abstraction, not by dependency: do not read them as a pipeline. Each layer both constrains and informs the others in both directions.

<table>
<tr><th>Topic</th><th>Utility</th><th>Key concepts</th></tr>
<tr><td><a href="./Computer-Hardware/Readme.md">Computer Hardware</a></td><td>How the program is physically executed</td><td>Processor, memory hierarchy, operating system, I/O interfaces</td></tr>
<tr><td><a href="./Programming/Readme.md">Programming</a></td><td>How to specify, structure, and maintain computations</td><td>Syntax, semantics, types, compilation, memory management, security</td></tr>
<tr><td><a href="./Distributed-Systems/Readme.md">Distributed Systems</a></td><td>How computation is coordinated across machines</td><td>Networks, consensus, fault tolerance, scaling, concurrency</td></tr>
<tr><td><a href="./Information-Theory/Readme.md">Information Theory</a></td><td>How to encode, compress, and protect data</td><td>Bits, entropy, error correction, compression, cryptography</td></tr>
<tr><td><a href="./Algorithmics/Readme.md">Algorithmics</a></td><td>What can be computed and at what cost</td><td>Computability, complexity, data structures, graphics, optimization</td></tr>
</table>

The boundary between [Interfaces and buses](./Interfaces-and-Buses/Readme.md) (Computer Hardware) and **Networks** (Distributed Systems) is the machine boundary: interfaces and buses move data between components inside a single machine (on-chip, board-level, cabled, optical, and wireless links such as PCIe, USB, and the Ethernet cable), while networks move data between distinct machines and coordinate them (IP, TCP, HTTP, TLS). A PCIe link is an interface; a TCP connection carried over Ethernet is a network.

### Cross-cutting concerns

Security and performance engineering are cross-cutting concerns that span multiple classes. Security draws on Information Theory (ciphers, key exchange), Programming (memory safety, injection, authentication, authorization), Computer Hardware (ASLR, sandboxing, isolation), and Distributed Systems (TLS, zero trust). Performance engineering draws on Algorithmics (complexity bounds), Information Theory (bit-rate reduction), Programming (optimization passes), Computer Hardware (caching, prefetching), and Distributed Systems (load balancing, queueing).

### Application areas

Computer graphics / visualization and human-computer interaction (HCI) are application areas that span multiple classes rather than constituting a first-principles class of their own. Graphics draws on Algorithmics (rendering, ray tracing), Computer Hardware (GPU/TPU, SIMD), Information Theory (compression of images and video), and Programming (shaders, scene graphs). HCI draws on Programming (UI frameworks, event loops), Computer Hardware (input devices, displays, interfaces), and Algorithmics (layout, text search, recommendation). They are covered within the relevant class pages rather than as a separate class.

<iframe src="../Computer-Science.simulation.html" title="The five classes of computer science as an abstraction gradient"></iframe>

> **Authoritative sources**
> - [On Computable Numbers, with an Application to the Entscheidungsproblem](https://www.turingarchive.ac.uk/radiolab/OnComputableNumbers.pdf)
> - [A Mathematical Theory of Communication](https://ieeexplore.ieee.org/document/6773024)
> - [The Art of Computer Programming, Volume 1](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)
> - [ACM/IEEE-CS Curriculum Guidelines 2020](https://www.acm.org/education/curricula-guidelines)



