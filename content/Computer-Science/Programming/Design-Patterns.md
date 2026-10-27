# Design Patterns

Design patterns are recurring, named solutions to common software design problems. They are relevant when a program must be structured for long-term maintainability, testability, and extensibility — when a codebase outgrows its initial structure and the trade-offs between coupling, cohesion, and flexibility start to matter. This page organizes the patterns into four lenses, from the most abstract to the most concrete: **architectural decomposition** (how to split a system into components), **object-oriented programming** (how to bundle data and behavior), **functional programming** (how to express computation as pure transformations), and **event-driven programming** (how to structure a reactive, message-passing system).

> **Authoritative sources**
> - [Design Patterns: Elements of Reusable Object-Oriented Software (Gang of Four)](https://www.oreilly.com/library/view/design-patterns-elements/0201633612/)
> - [Design Principles and Design Patterns (Robert C. Martin, 2000)](https://wnmurphy.com/assets/pdf/Robert_C._Martin_-_2000_-_Principles_and_Patterns.pdf)
> - [Domain-Driven Design (Evans)](https://www.domainlanguage.com/ddd/)
> - [Patterns of Enterprise Application Architecture (Martin Fowler)](https://martinfowler.com/eaaCatalog/)
> - [Hexagonal (Ports & Adapters) Architecture (Alistair Cockburn, 2005)](https://alistair.cockburn.us/hexagonal-architecture)
> - [The Hillside Group (home of the Portland Pattern Repository and PLoP)](https://hillside.net/)
> - [Design Patterns in Dynamic Programming (Peter Norvig, 1996)](https://www.norvig.com/design-patterns/design-patterns.pdf)

## Architectural decomposition

**Definition.** Decompose a system into components with low, well-defined, interfaced intercommunication, so that the whole achieves its Kolmogorov complexity — the simplest structure that still expresses the required behavior (Occam's razor).

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" font-family="Helvetica, Arial, sans-serif">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#333"/>
    </marker>
  </defs>
  <style>
    .box { fill: #eef3fb; stroke: #3b5b8f; stroke-width: 1.5; }
    .label { fill: #1c2733; font-size: 13px; }
    .msg { stroke: #333; stroke-width: 1.5; marker-end: url(#arrow); }
    .life { stroke: #b0b8c0; stroke-width: 1; stroke-dasharray: 4 4; }
    .plabel { fill: #1c2733; font-size: 13px; font-weight: bold; text-anchor: middle; }
  </style>

  <!-- Participant headers -->
  <g>
    <rect class="box" x="75" y="50" width="90" height="34" rx="4"/>
    <text class="plabel" x="120" y="71">Client</text>
    <rect class="box" x="240" y="50" width="90" height="34" rx="4"/>
    <text class="plabel" x="285" y="71">Shop</text>
    <rect class="box" x="405" y="50" width="90" height="34" rx="4"/>
    <text class="plabel" x="450" y="71">Cart</text>
    <rect class="box" x="570" y="50" width="90" height="34" rx="4"/>
    <text class="plabel" x="615" y="71">Inventory</text>
    <rect class="box" x="735" y="50" width="90" height="34" rx="4"/>
    <text class="plabel" x="780" y="71">Payment</text>
  </g>

  <!-- Lifelines -->
  <line class="life" x1="120" y1="84" x2="120" y2="400"/>
  <line class="life" x1="285" y1="84" x2="285" y2="400"/>
  <line class="life" x1="450" y1="84" x2="450" y2="400"/>
  <line class="life" x1="615" y1="84" x2="615" y2="400"/>
  <line class="life" x1="780" y1="84" x2="780" y2="400"/>

  <!-- Messages -->
  <g>
    <line class="msg" x1="120" y1="120" x2="283" y2="120"/>
    <text class="label" x="202" y="112" text-anchor="middle">add to cart</text>
    <line class="msg" x1="285" y1="155" x2="613" y2="155"/>
    <text class="label" x="449" y="147" text-anchor="middle">book item</text>
    <line class="msg" x1="285" y1="190" x2="448" y2="190"/>
    <text class="label" x="366" y="182" text-anchor="middle">add item</text>
    <line class="msg" x1="120" y1="225" x2="283" y2="225"/>
    <text class="label" x="202" y="217" text-anchor="middle">checks out</text>
    <line class="msg" x1="285" y1="260" x2="778" y2="260"/>
    <text class="label" x="532" y="252" text-anchor="middle">authorize payment</text>
    <line class="msg" x1="285" y1="295" x2="613" y2="295"/>
    <text class="label" x="449" y="287" text-anchor="middle">fulfill items</text>
    <line class="msg" x1="285" y1="330" x2="778" y2="330"/>
    <text class="label" x="532" y="322" text-anchor="middle">capture payment</text>
    <line class="msg" x1="285" y1="365" x2="448" y2="365"/>
    <text class="label" x="366" y="357" text-anchor="middle">delete items</text>
  </g>
</svg>

<details><summary>Details</summary>

1. Identify the business **entities**, then lay out the business process.
2. Specify the business **requirements**: for example, the shop should not capture a payment until we know the order is fulfilled; if the client purchases an item, it must be removed from inventory.
3. **Decompose**: Define implicit but necessary entities (for instance: if the requirement is “I want my bank account to be credited for the amount of the item I sold”, there is an implicit payment entity). If there are too many entities, categorize them and group them into a larger block; if there are too many processes inside an entity, make it a block and define its sub-entities.
4. Adjust the **interactions** between entities to reduce the complexity, for example by decreasing the number of interactions.
5. Define the **interfaces** between entities: specify the data flow, the format (input and output schemas for each endpoint), the synchronicity, the error handling.
6. Define the **data structures** inside each entity: for example, the cart entity must contain a list of items, each with a quantity and a price.
7. Implement the **business logic** for each endpoint in each entity.

In steps 1 thru 4:

**Target the simplest structure that works (Occam's razor).** The goal of decomposition is to reach the system's **Kolmogorov complexity**: the shortest description that still produces the required behavior. Every extra component, interface, or abstraction is a cost you must justify. This is why you **build for the present, not for the future** — a component that anticipates a requirement that never arrives is pure overhead. Note that **requirements increase complexity exponentially**: each new requirement multiplies the interactions you must design for, so the cheapest place to cut complexity is at the requirements, not at the code.

**Break the system into components with separation of concerns.** Split the system into components, each with one job. Then **recursively break down** each component until every piece has a single, nameable responsibility. The decomposition should follow the problem's natural boundaries, not an arbitrary technical split.

**Let the domains drive the boundaries (Domain-Driven Design).** In **Domain-Driven Design**, the components follow the business domains, and **product objects correspond to domains**: an `Order`, an `Invoice`, a `Customer` are first-class objects owned by their domain. The vocabulary of the code mirrors the vocabulary of the business.

**The factorization/coupling trade-off.** Factorizing (splitting) reduces duplication, but it **increases the blast surface**: more components means more interfaces and more places a change can ripple. The right decomposition is the one where the reduction in duplication and the clarity of each component outweigh the added coupling.

In step 5:

**Keep the coupling low**: a component should talk to as few others as possible, and only through those interfaces. **Avoid leaking abstractions** — an interface must not expose implementation details (a `PaymentGateway` interface should not force callers to know it is backed by a specific provider).

**Separate reads from writes (CQRS).** **Handle data access and data mutation separately in interfaces** — Command Query Responsibility Segregation. A read model optimized for queries and a write model optimized for mutations can have different shapes; keeping them apart means a change to how you query does not force a change to how you write.

In step 6:

**Assign data ownership.** For each type of data, exactly **one component is the source of truth**, and no other component may modify it. Other components read through the owner's interface. This removes write-write conflicts and makes the data flow auditable.

In step 7:

**Optimize only the bottleneck.** **Premature optimization is the root of all evil.** Decompose for clarity and correctness first; measure, and only then optimize the component that actually limits performance.
</details>

## Object-oriented programming

**Definition.** Group functions (then called **methods**) in a type (then called a **class**) that contains related data (then called **attributes**), when those functions operate on that data. It is like function overloading, but with an implicit first argument — the object itself, called `self` or `this`.

<details><summary>Details</summary>

**Bundle data and behavior into a class.** A **class** groups related **data** (the **attributes**) together with the **functions** (the **methods**) that operate on that data. The rule of thumb: put a method in a class when it operates on that class's data.

**The implicit first argument.** A method is a function that takes the object itself as an implicit first argument, conventionally named `self` (Python, Rust) or `this` (C++, Java, JavaScript). Calling `obj.method(x)` is really `method(obj, x)`. This is what lets a method read and mutate its own attributes.

**Encapsulation.** Mark **attributes private** and expose **public methods** as the only way to read or change them. The class controls its own invariants; callers cannot put it in an invalid state.

**Inheritance.**
Apart from encapsulation, a big advantage of grouping functions into methods is that it defines an interface that subclasses inherit.

A **subclass** is a class that extends another class (the **superclass** or **parent class**): it inherits its attributes and methods, and can extend it with more attributes and methods. In our shop example, a `Product` has a price and can be purchased, and an `InventoryProduct` can be shipped right away, while a `BackorderProduct` can be purchased but not shipped until it is restocked. The `InventoryProduct` and `BackorderProduct` classes inherit the `Product` class's attributes and methods, but each has its own implementation of the `fulfill()` method.

- **Overriding**: a subclass can redefine a superclass method by defining a method with the same name, establishing a distinct implementation.
- **Polymorphism**: a function can take the superclass as an argument, and invoke a superclass method. A caller can pass a subtype to the function, and the correct subclass method implementation runs at runtime (dynamic dispatch). This is the mechanism that makes the GoF patterns below work.
- **Overloading**: several methods can share a name but differ in their argument types (resolved statically).

**Abstract methods and interfaces.** An **interface** (or abstract class) declares methods without implementing them; concrete classes implement the interface. Code depends on the interface, not the concrete class — this is the seam that Dependency Inversion (SOLID) exploits.

**Composition over inheritance.** Inheritance couples you to a fixed hierarchy (you may wish to inherit from multiple superclasses and pick one randomly) and creates fragile base classes (you may want to alter the superclass to be more and more generic). Prefer building a class from *other* objects (has-a) over deep inheritance hierarchies (is-a). That is composition: adding other classes as attributes rather than inheriting from them.

Overall, the most valuable aspect of OOP is interfacing: the ability to define a contract for how to interact with a set of types, each of which have a distinct implementation. That interface is achievable without inheritance, even though inheritance is sometimes the most succinct way to express it.

### When NOT to use patterns

A pattern is a *cost* (indirection, extra types, learning curve) that pays off only when the specific problem it solves is present. Introducing a pattern for a problem that does not exist is an anti-pattern.

**The cost of a pattern:**
- **Indirection**: each layer of abstraction adds a hop. A reader must follow the interface to find the implementation. For a small, stable codebase, a direct call is clearer.
- **Learning curve**: a team unfamiliar with the pattern will misread the code. "Why is there a `Box<dyn Trait>` here?" costs onboarding time.
- **Debugging difficulty**: stack traces through multiple layers of delegation are harder to read than a straight-line call.
- **Premature generalization**: designing for a "future" variation that never materializes adds complexity with no benefit.

**The principle: the simplest design that works.** Introduce a pattern only when:
1. The variation point is *real* (you have already added the second concrete case), not hypothetical.
2. The cost of *not* using the pattern (e.g., a growing `if/else` chain, a god class) exceeds the cost of the indirection: future modifications take more time without the pattern.
3. The team can name the pattern and explain *why* it is there in a code comment or PR description.

**Common anti-patterns:**
- *Pattern for the sake of a pattern*: wrapping a single function in a Strategy interface when no second strategy exists.
- *Over-abstraction*: five layers of Facade → Adapter → Proxy → Decorator → Strategy for a 200-line module.
- *Premature Singleton*: making a class a Singleton before you know whether a second instance will ever be needed.

A useful heuristic: if you can delete the pattern and replace it with a direct call or a simple function without losing a real requirement, the pattern is not yet justified. This is the **YAGNI** principle (You Aren't Gonna Need It) applied to abstractions, and it mirrors the cost/benefit logic of [Interface Segregation](#solid-principles): a narrow, justified interface beats a broad, speculative one.

<details><summary>Example problem</summary>

A `Vehicle` class has `drive()`, and subclasses `Car` and `Truck` override it. A new `ElectricCar` should behave like a `Car` but also like a `Battery` which you can `charge()` and that reports battery level. Should `ElectricCar` inherit from `Car`, from `Battery`, or something else? Justify with the principles above.

<details><summary>Solution</summary>

**Compose.** `ElectricCar` *is a* `Car` (inheritance is defensible for `drive()`), but battery level is a separate concern with its own invariants (charge, capacity, degradation). Give `ElectricCar` a private `Battery` attribute (encapsulation) and expose `batteryLevel()` as a public method (composition over inheritance). This keeps the `Car` hierarchy shallow and lets you swap the battery model without touching `Car`.

</details>

</details>

</details>

### SOLID principles

SOLID is a set of five design principles that explain *why* patterns exist and how they relate to each other. Each principle identifies a specific failure mode in object-oriented design.

- **S**ingle Responsibility: a module has one reason to change. Violation → a class grows into a god object.
- **O**pen/Closed: open for extension, closed for modification. Violation → adding a feature requires editing existing code.
- **L**iskov Substitution: a subtype must be usable wherever its supertype is expected. Violation → `if (type == X)` checks scattered through callers.
- **I**nterface Segregation: many specific interfaces beat one general one. Violation → implementers are forced to provide methods they do not use.
- **D**ependency Inversion: depend on abstractions, not concretions. Violation → the core logic is coupled to a specific database driver.

<details><summary>Details</summary>

**Origin.** Robert C. Martin introduced the five principles in his 2000 paper *"Design Principles and Design Patterns"* and elaborated them in his 2003 book *Agile Software Development, Principles, Patterns, and Practices*. The SOLID acronym was coined by Michael Feathers in his 2004 book *Working Effectively with Legacy Code*. The principles build directly on the GoF book (1994), which first catalogued the patterns that satisfy them.

**How the principles interlock.** They are not independent:
- Dependency Inversion *enables* Open/Closed: you extend by injecting a new implementation behind an interface, without modifying existing code.
- Interface Segregation *supports* Single Responsibility: a narrow interface has exactly one reason to change.
- Liskov Substitution is the *correctness condition* that makes polymorphism safe: if a subtype breaks the contract, the caller's assumptions are violated.

**Patterns as mechanisms.** Each SOLID principle is satisfied by specific patterns:
- Strategy → Open/Closed (add a new algorithm without editing the context).
- Dependency Injection (creational) → Dependency Inversion.
- Observer → Single Responsibility (the publisher does not know who is interested).

<details><summary>Example problem</summary>

A `ReportGenerator` class currently has methods `generatePdf()`, `generateHtml()`, and `generateCsv()`. A product manager asks for `generateXlsx()`. Which SOLID principle is violated, and which pattern fixes it?

<details><summary>Solution</summary>

The class violates **Single Responsibility** (it has multiple reasons to change: one per format) and **Open/Closed** (adding a format requires editing the class). The fix is the **Strategy pattern**: define a `ReportFormat` interface with a `render()` method; each format is a concrete strategy. `ReportGenerator` holds a `ReportFormat` and delegates. Adding XLSX is a new subclass — no existing code changes.

</details>

</details>

</details>

### The GoF catalog

The GoF catalog defines 23 patterns in three categories. The table below lists all 23 with a one-line decision guide; the full catalog is in the [Gang of Four book](https://www.oreilly.com/library/view/design-patterns-elements/0201633612/).

<table>
<tr><th>Category</th><th>Pattern</th><th>Use when</th></tr>
<tr><td rowspan="5">Creational</td><td>Factory Method</td><td>Creation logic varies by subclass or product variant</td></tr>
<tr><td>Abstract Factory</td><td>You need families of related objects behind one interface</td></tr>
<tr><td>Builder</td><td>Construction has many optional steps or a complex configuration</td></tr>
<tr><td>Prototype</td><td>Cloning is cheaper than re-constructing (expensive init)</td></tr>
<tr><td>Singleton</td><td>Exactly one instance is required (e.g., a hardware driver)</td></tr>
<tr><td rowspan="7">Structural</td><td>Adapter</td><td>Two incompatible interfaces must collaborate</td></tr>
<tr><td>Bridge</td><td>Abstraction and implementation must vary independently</td></tr>
<tr><td>Composite</td><td>A tree of parts must be treated uniformly</td></tr>
<tr><td>Decorator</td><td>Add behavior dynamically without subclassing</td></tr>
<tr><td>Facade</td><td>A complex subsystem needs a simplified entry point</td></tr>
<tr><td>Flyweight</td><td>Many objects share the same intrinsic state (memory pressure)</td></tr>
<tr><td>Proxy</td><td>Control access: lazy init, access control, remote stub</td></tr>
<tr><td rowspan="11">Behavioral</td><td>Chain of Responsibility</td><td>A request should be handled by the first capable handler</td></tr>
<tr><td>Command</td><td>Encapsulate a request for queuing, logging, or undo</td></tr>
<tr><td>Iterator</td><td>Traverse a collection without exposing its representation</td></tr>
<tr><td>Mediator</td><td>Many objects communicate and you want to remove direct references</td></tr>
<tr><td>Memento</td><td>Capture/restore internal state without exposing it</td></tr>
<tr><td>Observer</td><td>Multiple dependents react to a state change (pub/sub)</td></tr>
<tr><td>State</td><td>Behavior changes with internal state (state machine as objects)</td></tr>
<tr><td>Strategy</td><td>Swap algorithms at runtime behind a common interface</td></tr>
<tr><td>Template Method</td><td>Fix the algorithm skeleton; let subclasses override steps</td></tr>
<tr><td>Visitor</td><td>Add operations to a hierarchy without modifying the classes</td></tr>
<tr><td>Interpreter</td><td>Evaluate sentences in a mini-language (grammar as objects)</td></tr>
</table>

### Strategy

**Definition.** Define a family of algorithms, encapsulate each, and make them interchangeable. The context depends on an abstraction; concrete strategies are injected.

<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:520px;margin:10px 0;">
  <defs><marker id="arr1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#888"/></marker></defs>
  <rect x="10" y="50" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#64ffda" stroke-width="1.5"/>
  <text x="75" y="72" text-anchor="middle" fill="#eee" font-size="11" font-weight="bold">Context</text>
  <text x="75" y="88" text-anchor="middle" fill="#aaa" font-size="9">uses strategy</text>
  <rect x="200" y="50" width="130" height="50" rx="6" fill="#2d2d44" stroke="#ffd54f" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="265" y="72" text-anchor="middle" fill="#eee" font-size="11" font-weight="bold">Strategy</text>
  <text x="265" y="88" text-anchor="middle" fill="#aaa" font-size="9">execute()</text>
  <rect x="390" y="15" width="120" height="40" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="450" y="40" text-anchor="middle" fill="#eee" font-size="10">ConcreteA</text>
  <rect x="390" y="105" width="120" height="40" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="450" y="130" text-anchor="middle" fill="#eee" font-size="10">ConcreteB</text>
  <line x1="140" y1="75" x2="195" y2="75" stroke="#888" stroke-width="1.5" marker-end="url(#arr1)"/>
  <line x1="385" y1="35" x2="330" y2="60" stroke="#888" stroke-width="1.5" marker-end="url(#arr1)"/>
  <line x1="385" y1="125" x2="330" y2="90" stroke="#888" stroke-width="1.5" marker-end="url(#arr1)"/>
  <text x="155" y="68" fill="#aaa" font-size="9">depends on</text>
  <text x="340" y="42" fill="#aaa" font-size="9">implements</text>
  <text x="340" y="122" fill="#aaa" font-size="9">implements</text>
</svg>

<details><summary>Details</summary>

**Step 1 — Identify the variation point.** You have a context (e.g., a `PaymentProcessor`) whose behavior changes based on a choice (payment method). The variation is the *algorithm*: how to process a payment.

**Step 2 — Extract the interface.** Define a `PaymentStrategy` interface with a single method `process(order: Order)`. This is the abstraction the context depends on (Dependency Inversion).

**Step 3 — Implement concrete strategies.** Each payment method (CreditCard, PayPal, Crypto) is a class implementing `PaymentStrategy`.

**Step 4 — Inject the strategy.** The context receives a `PaymentStrategy` via constructor or setter. Swapping the algorithm at runtime is a single assignment.

```rust
trait PaymentStrategy {
    fn process(&self, order: &Order) -> Result<(), Error>;
}

struct CreditCardStrategy { /* ... */ }
impl PaymentStrategy for CreditCardStrategy {
    fn process(&self, order: &Order) -> Result<(), Error> { /* charge card */ }
}

struct PaymentProcessor {
    strategy: Box<dyn PaymentStrategy>,
}
impl PaymentProcessor {
    fn handle(&self, order: &Order) -> Result<(), Error> {
        self.strategy.process(order)
    }
}
```

**Why it satisfies SOLID:** Open/Closed — add `CryptoStrategy` without touching `PaymentProcessor`. Interface Segregation — the interface has one method.

<details><summary>Example problem</summary>

A text editor supports three alignment modes (left, center, justify). A user can switch modes at any time. Sketch the Strategy structure.

<details><summary>Solution</summary>

Define `AlignStrategy` with `align(line: &str, width: usize) -> String`. Concrete strategies: `LeftAlign`, `CenterAlign`, `Justify`. The `Editor` holds a `Box<dyn AlignStrategy>` and calls `align` on each line. Switching mode is `editor.strategy = Box::new(CenterAlign)`.

</details>

</details>

</details>

### Observer

**Definition.** Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:520px;margin:10px 0;">
  <defs><marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#888"/></marker></defs>
  <rect x="10" y="50" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#64ffda" stroke-width="1.5"/>
  <text x="75" y="72" text-anchor="middle" fill="#eee" font-size="11" font-weight="bold">Subject</text>
  <text x="75" y="88" text-anchor="middle" fill="#aaa" font-size="9">notify()</text>
  <rect x="200" y="50" width="130" height="50" rx="6" fill="#2d2d44" stroke="#ffd54f" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="265" y="72" text-anchor="middle" fill="#eee" font-size="11" font-weight="bold">Observer</text>
  <text x="265" y="88" text-anchor="middle" fill="#aaa" font-size="9">update(event)</text>
  <rect x="390" y="10" width="120" height="35" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="450" y="32" text-anchor="middle" fill="#eee" font-size="10">EmailNotifier</text>
  <rect x="390" y="62" width="120" height="35" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="450" y="84" text-anchor="middle" fill="#eee" font-size="10">SMSNotifier</text>
  <rect x="390" y="114" width="120" height="35" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="450" y="136" text-anchor="middle" fill="#eee" font-size="10">Analytics</text>
  <line x1="140" y1="75" x2="195" y2="75" stroke="#888" stroke-width="1.5" marker-end="url(#arr2)"/>
  <line x1="385" y1="28" x2="330" y2="60" stroke="#888" stroke-width="1.5" marker-end="url(#arr2)"/>
  <line x1="385" y1="80" x2="330" y2="75" stroke="#888" stroke-width="1.5" marker-end="url(#arr2)"/>
  <line x1="385" y1="132" x2="330" y2="90" stroke="#888" stroke-width="1.5" marker-end="url(#arr2)"/>
  <text x="155" y="68" fill="#aaa" font-size="9">notifies</text>
</svg>

<details><summary>Details</summary>

**Step 1 — Identify the dependency.** Multiple objects (notifiers, UI panels, loggers) react to the same state change (an event on the subject). Without Observer, the subject must know and call each dependent directly — tight coupling.

**Step 2 — Define the Observer interface.** `trait Observer { fn update(&self, event: &Event); }`.

**Step 3 — The Subject maintains a list.** The subject holds `Vec<Box<dyn Observer>>`. On state change, it iterates and calls `update`.

**Step 4 — Subscribers register.** Each concrete observer calls `subject.subscribe(self)`. The subject does not know *who* is interested (Single Responsibility).

```rust
trait Observer { fn update(&self, event: &Event); }

struct EventBus {
    observers: Vec<Box<dyn Observer>>,
}
impl EventBus {
    fn subscribe(&mut self, obs: Box<dyn Observer>) { self.observers.push(obs); }
    fn publish(&self, event: &Event) {
        for o in &self.observers { o.update(event); }
    }
}
```

**Why it satisfies SOLID:** Single Responsibility — the publisher's only job is to broadcast. Open/Closed — add a new observer without modifying the publisher.

The observer pattern is heavily used in event-driven programming, and, in the context of distributed systems, in message queueing.
An entity emits events related to its state updates, and other entities subscribe to those events. The publisher does not know the subscribers, and they may grow over time.

Message queueing, however, typically falls into two categories: the observer (a stream of events), or the command (a stream of requests).
Typically, use the observer when the number of entities that want the same messages grows, and use the command when many entities want to send the same message to a single entity.

<details><summary>Example problem</summary>

A stock-trading app has a `PriceFeed` that updates every second. Three UI widgets (chart, ticker, alert) need the new price. Sketch the Observer wiring.

<details><summary>Solution</summary>

`PriceFeed` is the Subject. Define `trait PriceObserver { fn on_price(&self, p: Price); }`. `ChartWidget`, `TickerWidget`, `AlertWidget` implement it. On startup, each calls `feed.subscribe(Box::new(widget))`. When the feed receives a new tick, it calls `publish(&price)`, which iterates all observers.

</details>

</details>

</details>

### Decorator

**Definition.** Attach additional responsibilities to an object dynamically. Decorators wrap an object and add behavior without modifying the original class.

<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:520px;margin:10px 0;">
  <defs><marker id="arr3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#888"/></marker></defs>
  <rect x="10" y="50" width="130" height="50" rx="6" fill="#2d2d44" stroke="#ffd54f" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="75" y="72" text-anchor="middle" fill="#eee" font-size="11" font-weight="bold">Component</text>
  <text x="75" y="88" text-anchor="middle" fill="#aaa" font-size="9">draw()</text>
  <rect x="200" y="10" width="130" height="40" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="265" y="35" text-anchor="middle" fill="#eee" font-size="10">ConcreteComponent</text>
  <rect x="200" y="60" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#64ffda" stroke-width="1.5"/>
  <text x="265" y="82" text-anchor="middle" fill="#eee" font-size="11" font-weight="bold">Decorator</text>
  <text x="265" y="98" text-anchor="middle" fill="#aaa" font-size="9">wraps Component</text>
  <rect x="390" y="60" width="120" height="50" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="450" y="82" text-anchor="middle" fill="#eee" font-size="10">BorderDecorator</text>
  <text x="450" y="98" text-anchor="middle" fill="#aaa" font-size="9">+ ShadowDecorator</text>
  <line x1="195" y1="30" x2="140" y2="60" stroke="#888" stroke-width="1.5" marker-end="url(#arr3)"/>
  <line x1="195" y1="85" x2="140" y2="75" stroke="#888" stroke-width="1.5" marker-end="url(#arr3)"/>
  <line x1="385" y1="85" x2="330" y2="85" stroke="#888" stroke-width="1.5" marker-end="url(#arr3)"/>
  <text x="150" y="40" fill="#aaa" font-size="9">implements</text>
  <text x="150" y="82" fill="#aaa" font-size="9">extends</text>
  <text x="340" y="78" fill="#aaa" font-size="9">extends</text>
</svg>

<details><summary>Details</summary>

**Step 1 — Identify the cross-cutting behavior.** You need to add a border, a shadow, and a tooltip to a UI element. Subclassing would create a combinatorial explosion (BorderShadowTooltip, BorderTooltipShadow, …).

**Step 2 — Define the Component interface.** `trait Drawable { fn draw(&self); }`.

**Step 3 — The Decorator wraps a Component.** `struct BorderDecorator { inner: Box<dyn Drawable> }` implements `Drawable` by drawing the border *then* delegating to `inner.draw()`.

**Step 4 — Compose decorators.** `let el = BorderDecorator(Box::new(ShadowDecorator(Box::new(ConcreteElement))));` — each layer adds one behavior.

```rust
trait Drawable { fn draw(&self); }

struct BorderDecorator { inner: Box<dyn Drawable> }
impl Drawable for BorderDecorator {
    fn draw(&self) {
        print!("[border] ");
        self.inner.draw();
    }
}
```

**Why it satisfies SOLID:** Open/Closed — add a new decorator class without modifying existing ones. Single Responsibility — each decorator adds exactly one behavior.

<details><summary>Example problem</summary>

A `Stream` type needs optional buffering, compression, and encryption layers, in any combination. How does Decorator apply?

<details><summary>Solution</summary>

`trait Stream { fn read(&mut self) -> Vec<u8>; }`. `BufferedStream { inner: Box<dyn Stream> }` buffers reads. `CompressedStream { inner: Box<dyn Stream> }` decompresses. `EncryptedStream { inner: Box<dyn Stream> }` decrypts. Compose: `EncryptedStream(Box::new(CompressedStream(Box::new(BufferedStream(raw)))))`. Each layer is independent; any subset can be applied.

</details>

</details>

</details>

### Factory Method

**Definition.** Define an interface for creating an object, but let subclasses decide which class to instantiate. The class is deferred to a subclass.

<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:520px;margin:10px 0;">
  <defs><marker id="arr4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#888"/></marker></defs>
  <rect x="10" y="50" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#64ffda" stroke-width="1.5"/>
  <text x="75" y="72" text-anchor="middle" fill="#eee" font-size="11" font-weight="bold">Creator</text>
  <text x="75" y="88" text-anchor="middle" fill="#aaa" font-size="9">factory_method()</text>
  <rect x="200" y="50" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="265" y="72" text-anchor="middle" fill="#eee" font-size="10">ConcreteCreator</text>
  <text x="265" y="88" text-anchor="middle" fill="#aaa" font-size="9">returns ConcreteProduct</text>
  <rect x="390" y="50" width="120" height="50" rx="6" fill="#2d2d44" stroke="#ffd54f" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="450" y="72" text-anchor="middle" fill="#eee" font-size="11" font-weight="bold">Product</text>
  <text x="450" y="88" text-anchor="middle" fill="#aaa" font-size="9">interface</text>
  <line x1="140" y1="75" x2="195" y2="75" stroke="#888" stroke-width="1.5" marker-end="url(#arr4)"/>
  <line x1="330" y1="75" x2="385" y2="75" stroke="#888" stroke-width="1.5" marker-end="url(#arr4)"/>
  <text x="150" y="68" fill="#aaa" font-size="9">inherits</text>
  <text x="340" y="68" fill="#aaa" font-size="9">creates</text>
</svg>

<details><summary>Details</summary>

**Step 1 — Identify the creation variation.** A `Document` class needs to create `Page` objects, but the page format (PDF, HTML, Markdown) depends on the output target. The creator (`Document`) should not know the concrete page class.

**Step 2 — Define the Product interface.** `trait Page { fn render(&self) -> String; }`.

**Step 3 — The Creator declares a factory method.** `trait Document { fn create_page(&self) -> Box<dyn Page>; }`. The base class calls `self.create_page()` but does not instantiate the concrete type.

**Step 4 — Subclasses override.** `PdfDocument::create_page()` returns `Box::new(PdfPage)`. `HtmlDocument::create_page()` returns `Box::new(HtmlPage)`.

```rust
trait Page { fn render(&self) -> String; }
trait Document {
    fn create_page(&self) -> Box<dyn Page>;
    fn build(&self) -> String { self.create_page().render() }
}
struct PdfDocument;
impl Document for PdfDocument {
    fn create_page(&self) -> Box<dyn Page> { Box::new(PdfPage) }
}
```

**Why it satisfies SOLID:** Open/Closed — add `MarkdownDocument` without modifying `build()`. Dependency Inversion — `Document` depends on the `Page` abstraction, not a concrete class.

<details><summary>Example problem</summary>

A game engine creates different `Sprite` types (2D, 3D, particle) depending on the renderer backend. Where does Factory Method fit?

<details><summary>Solution</summary>

`trait Sprite { fn draw(&self); }`. `trait Renderer { fn create_sprite(&self, kind: SpriteKind) -> Box<dyn Sprite>; }`. `GpuRenderer::create_sprite(SpriteKind::Particle)` returns `Box::new(GpuParticleSprite)`. The game loop calls `renderer.create_sprite(...)` without knowing the concrete type.

</details>

</details>

</details>

### The pattern movement and its critique

**Definition.** Design patterns as a discipline began in architecture, not programming, and its central claim — that recurring, named solutions beat ad-hoc ones — has been both adopted and challenged.

<details><summary>Details</summary>

**Origin.** The idea comes from Christopher Alexander's *A Pattern Language* (1977), which described recurring solutions to building-design problems. In the early 1990s this was transplanted to software: the Portland Pattern Repository (PPR) and the Hillside Group's PLoP (Pattern Languages of Programs) conferences became the home of the movement, and the GoF book (1994) codified 23 object-oriented patterns.

**The modern critique.** Peter Norvig's *Design Patterns in Dynamic Programming* (1996) showed that many GoF patterns exist to compensate for the limits of statically-typed, class-based languages. In a language with first-class functions and closures, several patterns collapse to plain language features:
- **Strategy** becomes a function value passed as an argument.
- **Command** becomes a closure that captures its receiver and arguments.
- **Observer** becomes a list of callbacks.

This does not make the patterns wrong — it makes them *language-relative*: a pattern is worth naming when the language does not already give you the mechanism for free. The "From objects to functions" section above shows the same design problem expressed in both lenses.

</details>

## Functional programming

**Definition.** Express computation as **pure functions** and **immutable values**, rather than as procedures that mutate state: define each value from its definition, and express a sequential computation as a composition of functions.

<details><summary>Details</summary>

**Define values, don't mutate them.** Assign a variable **immutably from its definition** rather than initializing it and then mutating it in a loop. For the mean squared error, write the definition directly:

```js
const mse = list.map(x => (x - mean) ** 2).reduce((sum, e) => sum + e) / list.length;
```

instead of the imperative version:

```js
let mse = 0;
for (const x of list) { mse += (x - mean) ** 2; }
mse /= list.length;
```

The first form *is* the definition of MSE; the second is a procedure that happens to compute it.

**Reach for higher-order functions.** The immutable style leans on **higher-order functions** that take or return functions: `map`, `reduce`, `filter`, `zip`. They let you express a transformation as a pipeline of small, named steps.

**Use lazy evaluation when the data is unbounded.** You can express an **infinite list** as a generator and take only what you need, with **memoization** so each element is computed once:

```js
function* naturals() { let n = 0; while (true) { yield n; n++; } }
const first10 = [...naturals()].slice(0, 10); // [0, 1, ..., 9]
```

**Implement functions by their definition, with recursion.** Define a function in terms of itself. Fibonacci:

```js
const fib = n => n < 2 ? n : fib(n - 1) + fib(n - 2);
```

**Make side-effects explicit (pure functions).** A **pure function** does not mutate state and has no hidden inputs. Express side-effects as **explicit state parameters**: instead of a function that reads and writes a global, pass the state in and return the new state. This makes functions composable and testable.

**Compose functions instead of sequencing statements.** Express a sequential computation as a **composition of functions**: instead of a function that takes an input, mutates it, and returns it, write functions that take an input and return a new output, then compose them:

```js
const pipeline = compose(validate, normalize, transform);
const result = pipeline(input);
```

<details><summary>Example problem</summary>

Rewrite this imperative function in the functional style (immutable, higher-order, pure):

```js
function topScores(grades, n) {
  const out = [];
  for (const g of grades) { if (g >= 90) { out.push(g); } }
  out.sort((a, b) => b - a);
  return out.slice(0, n);
}
```

<details><summary>Solution</summary>

```js
const topScores = (grades, n) =>
  grades.filter(g => g >= 90)
        .sort((a, b) => b - a)
        .slice(0, n);
```

Each step is a pure, higher-order function; the result is defined by its transformation of the input, with no mutation of `grades` or any global.

</details>

</details>

</details>

### From objects to functions

**Definition.** The same design problem can be expressed in object-oriented form (interface + concrete classes) or in functional form (algebraic data type + interpreter function). The structural correspondence is direct: a Strategy interface becomes a sum type; the context's dispatch becomes a pattern match; the interpreter is the "concrete strategy."

<details><summary>Details</summary>

**Why the correspondence is real.** The two encodings are the *initial* and *final* forms of the same data. In the functional (initial) form, the data is a value — a sum type — and every operation is a function that consumes it (this is the Church encoding: a value is represented by the functions it can be passed to). In the object-oriented (final) form, the data and its operations are bundled into one object, and dispatch is dynamic. The OO lens emphasizes *state ownership and message passing*; the functional lens emphasizes *data as values and transformations as pure functions*.

**Concrete example — notification system.** The same problem (send a message via a chosen channel) solved both ways:

```rust
// OOP: Strategy pattern
trait Notifier { fn send(&self, msg: &str); }
struct EmailNotifier;
impl Notifier for EmailNotifier { fn send(&self, msg: &str) { /* SMTP */ } }
struct SmsNotifier;
impl Notifier for SmsNotifier { fn send(&self, msg: &str) { /* SMS API */ } }
// Context:
fn notify(n: &dyn Notifier, msg: &str) { n.send(msg); }
```

```rust
// FP: ADT + interpreter
enum Notify { Email(String), Sms(String) }  // the data, as a value
fn interpret(n: &Notify) {
    match n {
        Notify::Email(m) => { /* SMTP */ }
        Notify::Sms(m)   => { /* SMS API */ }
    }
}
```

The Strategy interface `Notifier` corresponds to the ADT `Notify`; the concrete classes correspond to the match arms; the context function `notify` corresponds to `interpret`.

**The expression problem.** The two encodings trade off in opposite directions, and this is the key lesson:
- **OO is open to new data, closed to new operations.** Adding a channel (a new variant) is a new class — no existing code changes. But adding a new *operation* (e.g., `log()`) means editing every concrete class.
- **FP is open to new operations, closed to new data.** Adding a new operation is a new function — no existing code changes. But adding a channel (a new variant) means editing *every* function that pattern-matches on `Notify`, including `interpret`.

So the claim that "adding WhatsApp needs no existing code changes" is only true in the OO encoding. In the FP encoding, adding `Notify::WhatsApp` forces you to touch `interpret` (and any other match site) — that is exactly the cost of the initial encoding. Choose the encoding by which axis changes more often: if you add *channels* frequently, prefer OO; if you add *operations* frequently, prefer the ADT.

**Pointers to formal definitions.** For the formal definitions of Functor, Applicative, and Monad (the algebraic structures that generalize this correspondence), see [Control Flow and Semantics](./Control-Flow-and-Semantics.md). For type-theoretic foundations (sum types, product types, polymorphism, type classes), see [Language Theory](./Language-Theory.md).

</details>

## Event-driven programming

**Definition.** Structure a reactive system around events and messages: a frontend that reacts to state changes (MVC), and a backend that processes a stream of requests through an event loop, with decoupled components (ports and adapters), scheduled jobs, and an append-only event log.

<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;margin:10px 0;">
  <defs><marker id="arr5" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#888"/></marker></defs>
  <rect x="10" y="55" width="100" height="35" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="60" y="77" text-anchor="middle" fill="#eee" font-size="10">HTTP API</text>
  <rect x="10" y="130" width="100" height="35" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="60" y="152" text-anchor="middle" fill="#eee" font-size="10">UI / CLI</text>
  <rect x="450" y="55" width="100" height="35" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="500" y="77" text-anchor="middle" fill="#eee" font-size="10">Database</text>
  <rect x="450" y="130" width="100" height="35" rx="6" fill="#1e3a5f" stroke="#e94560" stroke-width="1"/>
  <text x="500" y="152" text-anchor="middle" fill="#eee" font-size="10">Message Queue</text>
  <polygon points="280,35 345,72.5 345,147.5 280,185 215,147.5 215,72.5" fill="#2d2d44" stroke="#64ffda" stroke-width="1.5"/>
  <text x="280" y="105" text-anchor="middle" fill="#eee" font-size="11" font-weight="bold">Application Core</text>
  <text x="280" y="122" text-anchor="middle" fill="#aaa" font-size="9">domain logic</text>
  <line x1="110" y1="72" x2="212" y2="95" stroke="#888" stroke-width="1.5" marker-end="url(#arr5)"/>
  <line x1="110" y1="147" x2="212" y2="125" stroke="#888" stroke-width="1.5" marker-end="url(#arr5)"/>
  <line x1="348" y1="95" x2="447" y2="72" stroke="#888" stroke-width="1.5" marker-end="url(#arr5)"/>
  <line x1="348" y1="125" x2="447" y2="147" stroke="#888" stroke-width="1.5" marker-end="url(#arr5)"/>
  <text x="150" y="90" fill="#aaa" font-size="9">inbound port</text>
  <text x="360" y="90" fill="#aaa" font-size="9">outbound port</text>
</svg>

<details><summary>Details</summary>

**Frontend — MVC.** Applying CQRS to a Human-Computer interaction (HCI) requires offering two interfaces:
1. The **Controller** receives user input, and mutates the product's source-of-truth data structure (which MVC calls the **Model**) (the the state of the application).
2. The **View** observes the Model (Observer pattern) and renders the user interface (either from scratch, or with a smart difference-detection system like React or Vue).

This pattern is what we call **Model-View-Controller (MVC)**.
Used in frontend frameworks (React, Vue), web frameworks (Rails, Spring). Django uses MVT (Model-View-Template), a variant where the View is a function and the Template handles rendering.

**Backend — process flow.** A backend is a loop over events:
1. **Initialization**: load config, open connections, register routes.
2. **Event loop**: wait for an incoming request, run it in a thread pool, repeat.
3. **Routing**: match the request to a handler function, for instance: `POST /users` → `createUserHandler`.
4. **Middlewares**: cross-cutting steps (auth, logging, rate-limiting) that wrap the handler. Typically, each middleware adds data in a common data structure, and calls the next middleware in the chain with it.
4. **Handlers**: run the business logic for the request. Typically, they will:
   1. Load all relevant state from the database and by calling external services in parallel,
   2. Compute the necessary state changes,
   3. Make the corresponding mutable calls to external services and commit all changes to the database, and
   4. Return a response.

**Backend — Hexagonal architecture (Ports and Adapters).** If the data structure of your HTTP JSON request is the same data structure that your handler logic computes on, and the same data structure found in your database schema, then when you compute business logic, you incur the limitations of both the HTTP request (e.g. no circular references, limited data types, HTTP-specific details like query parameters), and of the database schema (e.g. no nested objects, designed for fast disk query). This is a violation of the **Single Responsibility Principle**: your business logic should not be constrained by the limitations of external systems.
Having separate data structures for the HTTP request, the internal logic, and the database schema, lets you design and evolve each one to best fit their own requirements.

More generally, you want three types of data structures:
1. **Inbound data structures**: the data structure of the request, which is constrained by the external system (HTTP, message queue, keyboard inputs, etc.).
2. **Business data structures**: the internal data structure of your service.
3. **Outbound data structures**: the data structure of the response, which is constrained by the external system (database, HTTP, message queue, screen, etc.).

The inbound and outbound interfaces are called **ports**, inspired by TCP ports.
You must convert from the external data structure to the internal one and vice-versa: the **adapters** are the layers of code that perform this conversion.
- Request adapter: **parses** the inbound payload into the internal data structure.
- Response adapter: **serializes** the internal data structure into the outbound payload.
This is called **Hexagonal architecture**.
It gives an additional benefit: you can test your business logic in isolation, without needing to run a web server or a database, applying the **Dependency Inversion Principle**: the business logic depends on interfaces, not on concrete implementations.

**Backend — servers, workers, cron (job scheduler).** Long-running work is split: a **server** handles synchronous requests; **workers** process queued jobs; **cron** triggers scheduled jobs. A **job scheduler** pattern dispatches jobs to workers, often with retries and concurrency limits.

**Backend — job replay (dead letter queue).** When a job fails repeatedly, it is moved to a **dead letter queue** (DLQ) instead of being dropped or blocking the pipeline. The DLQ lets you inspect, fix, and **replay** the failed jobs without reprocessing the whole stream.

**Backend — actor model.** Concurrent computation is modeled as **actors** that communicate exclusively by asynchronous message passing. Each actor has a mailbox (queue) and processes messages one at a time. Used in Erlang/OTP and Akka (Scala). See [Message Passing](../Distributed-Systems/Concurrency/Message-Passing.md) for the full treatment of CSP and the actor model.

**Backend — event sourcing.** **Store events, not state.** The system's state is a projection of an append-only log of events. You can **rebuild state from events** at any time, and **event replay** (re-applying the log) lets you build a new projection or recover from a bug.

<details><summary>Example problem</summary>

You are building an order-processing service. The business rules (pricing, discounts, tax) must be unit-testable without a real database or HTTP server, and you expect to swap the database and the HTTP framework later. Which architectural pattern fits, and how do you lay out the layers?

<details><summary>Solution</summary>

**Hexagonal architecture.** The order domain logic (pricing, discounts, tax) is the **application core**. Define an **inbound port** `OrderService` (the operations the outside world can request) and an **outbound port** `OrderRepository` (the persistence the core needs). The HTTP handler is a *driver adapter* that calls `OrderService`; the database client is a *driven adapter* that implements `OrderRepository`. Because the core depends only on the two port interfaces, a unit test injects an in-memory fake repository and a fake HTTP caller — no database, no server. Swapping the database later is a new adapter; the core is untouched (Dependency Inversion).

</details>

</details>

> **Authoritative sources**
> - [Patterns of Enterprise Application Architecture (Martin Fowler)](https://martinfowler.com/eaaCatalog/)
> - [Hexagonal (Ports & Adapters) Architecture (Alistair Cockburn, 2005)](https://alistair.cockburn.us/hexagonal-architecture)

</details>

## Quizz

<details><summary>Quizz</summary>

A text editor must support **undo/redo** across many operations (insert, delete, format), and every operation must also be recorded so it can be replayed to a collaborator in a shared session. Which design pattern fits, and why?

<details><summary>Solution</summary>

**Command pattern.** Wrap each operation in a Command object that exposes `execute()` and `undo()`:

```rust
trait Command {
    fn execute(&self, doc: &mut Doc);
    fn undo(&self, doc: &mut Doc);
}
struct Insert { pos: usize, text: String }
impl Command for Insert {
    fn execute(&self, doc: &mut Doc) { doc.insert(self.pos, &self.text); }
    fn undo(&self, doc: &mut Doc)   { doc.delete(self.pos, self.text.len()); }
}
```

The editor keeps a history stack. **Undo** pops the last command and calls `undo()`; **redo** re-executes it. Because each command is self-contained, replaying the session to a collaborator is just re-executing the recorded commands in order.

This satisfies **Single Responsibility** (each command knows how to apply and reverse itself) and makes queuing, logging, and network replay fall out for free — the same reason Command appears in the interactive simulation's undo/redo tab.

</details>

</details>
