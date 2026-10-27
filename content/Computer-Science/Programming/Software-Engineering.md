# Software Engineering

Software engineering studies how to build, test, deploy, and monitor software at scale. It is relevant whenever a program must be maintained by a team, deployed to production, and kept reliable over time. The discipline spans the full lifecycle: from committing code to a shared repository, through automated testing and continuous integration, to deploying with minimal risk and observing the running system.

> **Authoritative sources**
> - [Continuous Delivery (Humble & Farley)](https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/)
> - [xUnit Test Patterns (Meszaros)](https://www.oreilly.com/library/view/xunit-test-patterns/9780131495050/)
> - [OpenTelemetry Specification](https://opentelemetry.io/docs/specs/otel/)
> - [DORA Accelerate State of DevOps Report](https://dora.dev/research/)

## Version control

**Git** is a distributed version control system. A **commit** is a snapshot of the repository with a message, author, and parent pointer. A **branch** is a movable pointer to a commit. A **merge** combines two branches; a **rebase** replays commits on top of another branch.

<details><summary>Details</summary>

### The data model

Git stores four object types in a content-addressable store: **blobs** (file contents), **trees** (directory listings), **commits** (snapshots), and **tags** (named references). Each object is identified by a content-addressable hash (SHA-1 for existing repositories; Git 3.0 transitions new repositories to SHA-256). A commit points to a tree (the file system at that point) and one or more parent commits.

**Example**: You edit `main.c` and run `git commit`. Git creates a new blob for the file content, a new tree referencing that blob, and a new commit pointing to the tree and the previous commit. The branch pointer `main` advances to the new commit.

### Branching strategies

- **Git Flow**: `main` (production), `develop` (integration), `feature/*`, `release/*`, `hotfix/*`. Suited to release-driven projects.
- **Trunk-based**: everyone commits to `main`; feature flags control rollout. Short-lived branches ($`< 1` day).
- **GitHub Flow**: `main` + short-lived feature branches; pull requests for review.

**Example**: In a trunk-based team, Alice creates branch `feat/login`, commits three times, opens a pull request, and merges within a day. The branch is deleted. No long-lived integration branch exists.

### Merge vs. rebase

Merge preserves history (a merge commit shows the divergence); rebase creates a linear history (rewrites commit hashes). Rebase is preferred for local commits; merge for shared branches.

<details><summary>Example problem</summary>

You have three local commits on branch `feature/x` that were created before a teammate pushed to `main`. Should you merge or rebase?

<details><summary>Solution</summary>

Rebase. Your commits are local (not shared), so rewriting their hashes is safe. Rebasing `feature/x` onto the updated `main` gives a linear history: your three commits appear as if they were made after the teammate's work. If you had already pushed `feature/x` and others were building on it, you would merge instead to avoid rewriting shared history.

</details>

</details>

</details>

## Code review

**Code review** is the practice of a peer examining a change (typically a pull request or merge request) before it is merged. It catches bugs, enforces style, transfers knowledge, and creates a second set of eyes on critical logic.

<details><summary>Details</summary>

### What a review covers

A review examines: correctness (does the code do what the spec says?), readability (can another engineer follow it?), test coverage (are the changes tested?), and security (no injection, no secret leakage, no privilege escalation). See [Security](./Security.md) for the specific threat classes a reviewer should check.

**Example**: A pull request adds a new API endpoint. The reviewer checks: (1) input validation (no SQL injection), (2) error handling (no stack traces leaked to the client), (3) tests (a unit test for the happy path and one for a malformed input), (4) naming (the function name matches its behavior).

### Review metrics

- **Review time**: median time from PR opened to first review. Target: $`< 4` hours for small PRs.
- **Defect escape rate**: fraction of bugs found in production that should have been caught in review.
- **PR size**: median lines changed per PR. Smaller PRs ($`< 400` lines) are reviewed more thoroughly.

### Practical guidelines

- Review within one business day; stale reviews lose context.
- Keep PRs small: one logical change per PR.
- Use checklists for recurring concerns (error handling, logging, API compatibility).
- Automate what can be automated: linters, formatters, and static analysis run in CI before a human reviews.

<details><summary>Example problem</summary>

A team notices that 40% of production bugs are traced to missing input validation. How should they change their review process?

<details><summary>Solution</summary>

Add a mandatory checklist item: "Does every external input (HTTP parameter, file, message) have explicit validation before use?" Pair this with an automated static analysis rule (e.g., a linter that flags unvalidated user input). The reviewer checks the automated findings; the linter catches the mechanical misses. Over time, the defect escape rate for injection-class bugs drops because the check is no longer dependent on individual reviewer attention.

</details>

</details>

</details>

## Testing

**Unit tests**: test a single function or class in isolation. **Integration tests**: test the interaction between components. **Acceptance tests**: test the system against user requirements.

**Assertion**: a check that a condition holds; if it fails, the test fails. **Regression tests**: tests that verify a previously fixed bug does not reappear. **Fuzzing**: generate random or structured inputs to find crashes and undefined behavior.

<details><summary>Details</summary>

### The test pyramid

The test pyramid organizes tests by cost and coverage. Many unit tests (fast, cheap, isolate logic), fewer integration tests (slower, test component interaction), few acceptance tests (slowest, test the full user journey). An inverted pyramid (many E2E tests) is fragile and slow.

<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;">
  <polygon points="200,20 320,120 80,120" fill="#4a90d9" opacity="0.85"/>
  <text x="200" y="85" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">Acceptance (few)</text>
  <polygon points="80,120 320,120 360,180 40,180" fill="#5cb85c" opacity="0.85"/>
  <text x="200" y="155" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">Integration (some)</text>
  <polygon points="40,180 360,180 390,210 10,210" fill="#f0ad4e" opacity="0.85"/>
  <text x="200" y="200" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">Unit (many)</text>
</svg>

**Example**: A payment service has 200 unit tests (each testing one function: `calculateTax`, `validateCard`, `formatInvoice`), 30 integration tests (testing the payment flow: card → gateway → ledger), and 5 acceptance tests (end-to-end: user clicks "Pay" → confirmation email arrives).

### Property-based testing

Instead of specific inputs, specify properties that must hold for all inputs. `for all lists l: sort(sort(l)) == sort(l)`. Tools: QuickCheck (Haskell), Hypothesis (Python), proptest (Rust).

**Example**: You write a function `merge(a, b)` that merges two sorted lists. A property test asserts: `for all sorted lists a, b: is_sorted(merge(a, b))` and `for all sorted lists a, b: set(merge(a, b)) == set(a) ∪ set(b)`. The test framework generates hundreds of random inputs and checks the property holds for each.

### Fuzzing

**Coverage-guided fuzzing** (AFL, libFuzzer) uses coverage feedback to guide input generation. **Structure-aware fuzzing** (Jazzer, honggfuzz) uses the program's type information to generate valid inputs.

**Example**: You fuzz a JSON parser. The fuzzer starts with `{"key": "value"}`, mutates bytes, and tracks which code paths are hit. When a new branch is reached (e.g., a nested object), the fuzzer focuses mutations there. After 10 million iterations, it finds a 3-byte input that triggers a buffer overflow.

### Mutation testing

Introduce small bugs (mutations) into the code; if the test suite does not catch the mutation, the tests are insufficient.

**Example**: The line `if (x > 0)` is mutated to `if (x >= 0)`. If no test fails, the suite does not distinguish between the two, meaning the boundary case $`x = 0` is untested.

> **Authoritative sources**
> - [xUnit Test Patterns (Meszaros)](https://www.oreilly.com/library/view/xunit-test-patterns/9780131495050/)

<details><summary>Example problem</summary>

Your team has 500 unit tests and 50 end-to-end tests. The end-to-end suite takes 45 minutes and is flaky (fails 10% of the time on CI). What should you do?

<details><summary>Solution</summary>

1. Identify the flaky E2E tests: usually they depend on timing, shared state, or external services. Replace them with integration tests that mock the external dependency.
2. Move assertions from E2E to unit/integration level: if an E2E test checks that "the total is correct", add a unit test for the calculation and an integration test for the API response.
3. Keep only 5–10 E2E tests for the critical user journeys (login, checkout, payment). Target: E2E suite under 10 minutes, 0% flake rate.
4. The freed CI time (35 minutes) can be spent on more integration tests or a longer fuzzing run.

</details>

</details>

</details>

## CI/CD

**CI** (Continuous Integration): every commit triggers a build, test, and static analysis pipeline. Fail fast: the first failing stage stops the pipeline.

**CD** (Continuous Delivery/Deployment): every passing build is deployable. **Continuous Delivery**: a human approves the deployment. **Continuous Deployment**: the deployment is automatic.

The **DORA metrics** (Deployment Frequency, Lead Time for Changes, Change Failure Rate, Failed Deployment Recovery Time) are the industry-standard framework for measuring software delivery performance. They are tracked in the observability stack and reviewed in team retrospectives.

<details><summary>Details</summary>

### Pipeline stages

A typical pipeline: build → unit test → integration test → security scan → deploy to staging → acceptance test → deploy to production. The security scan stage (SAST, dependency audit, container image scan) is described in [Security](./Security.md).

<svg viewBox="0 0 700 80" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#555"/>
    </marker>
  </defs>
  <rect x="5" y="25" width="80" height="30" rx="4" fill="#4a90d9"/>
  <text x="45" y="45" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">Build</text>
  <line x1="85" y1="40" x2="105" y2="40" stroke="#555" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="105" y="25" width="80" height="30" rx="4" fill="#5cb85c"/>
  <text x="145" y="45" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">Unit test</text>
  <line x1="185" y1="40" x2="205" y2="40" stroke="#555" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="205" y="25" width="90" height="30" rx="4" fill="#5cb85c"/>
  <text x="250" y="45" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">Integration</text>
  <line x1="295" y1="40" x2="315" y2="40" stroke="#555" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="315" y="25" width="90" height="30" rx="4" fill="#f0ad4e"/>
  <text x="360" y="45" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">Security scan</text>
  <line x1="405" y1="40" x2="425" y2="40" stroke="#555" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="425" y="25" width="90" height="30" rx="4" fill="#9b59b6"/>
  <text x="470" y="45" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">Staging</text>
  <line x1="515" y1="40" x2="535" y2="40" stroke="#555" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="535" y="25" width="90" height="30" rx="4" fill="#e74c3c"/>
  <text x="580" y="45" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">Production</text>
</svg>

**Example**: A developer pushes a commit. The CI runner compiles the code (build), runs 200 unit tests (30 s), runs 30 integration tests against a test database (2 min), scans dependencies for known CVEs (1 min), and deploys to a staging environment. If the integration tests pass, the staging deployment triggers 5 acceptance tests. All green → the artifact is tagged `v2.14.3` and is ready for production.

### Deployment strategies

- **Blue-green**: two identical environments; switch traffic from blue to green. Instant rollback: switch back.
- **Canary**: deploy to a small percentage of users (e.g., 5%); monitor metrics; roll out to 100% or roll back.
- **Rolling update**: replace instances one at a time (Kubernetes default). No extra capacity needed.

<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style="max-width:600px;">
  <!-- Blue-Green -->
  <text x="100" y="20" text-anchor="middle" font-size="12" font-family="sans-serif" font-weight="bold">Blue-Green</text>
  <rect x="20" y="30" width="70" height="25" rx="3" fill="#3498db"/>
  <text x="55" y="47" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">Blue (old)</text>
  <rect x="20" y="60" width="70" height="25" rx="3" fill="#2ecc71"/>
  <text x="55" y="77" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">Green (new)</text>
  <text x="55" y="100" text-anchor="middle" font-size="10" font-family="sans-serif">Switch LB</text>
  <!-- Canary -->
  <text x="300" y="20" text-anchor="middle" font-size="12" font-family="sans-serif" font-weight="bold">Canary</text>
  <rect x="230" y="30" width="50" height="25" rx="3" fill="#3498db"/>
  <text x="255" y="47" text-anchor="middle" fill="white" font-size="9" font-family="sans-serif">95%</text>
  <rect x="285" y="30" width="30" height="25" rx="3" fill="#e74c3c"/>
  <text x="300" y="47" text-anchor="middle" fill="white" font-size="9" font-family="sans-serif">5%</text>
  <text x="300" y="70" text-anchor="middle" font-size="10" font-family="sans-serif">Monitor →</text>
  <rect x="230" y="80" width="85" height="25" rx="3" fill="#e74c3c"/>
  <text x="272" y="97" text-anchor="middle" fill="white" font-size="9" font-family="sans-serif">100% (or rollback)</text>
  <!-- Rolling -->
  <text x="500" y="20" text-anchor="middle" font-size="12" font-family="sans-serif" font-weight="bold">Rolling</text>
  <rect x="440" y="30" width="25" height="25" rx="3" fill="#3498db"/>
  <rect x="470" y="30" width="25" height="25" rx="3" fill="#3498db"/>
  <rect x="500" y="30" width="25" height="25" rx="3" fill="#e74c3c"/>
  <rect x="530" y="30" width="25" height="25" rx="3" fill="#3498db"/>
  <text x="500" y="70" text-anchor="middle" font-size="10" font-family="sans-serif">One at a time</text>
</svg>

**Example**: A canary deployment of a new search algorithm: 5% of traffic (≈ 500 requests/min) hits the new version. After 10 minutes, the error rate is 0.2% (baseline 0.1%) and p99 latency is 120 ms (baseline 110 ms). The team rolls out to 25%, then 50%, then 100% over the next hour. If at any step the error rate exceeds 1%, the canary is rolled back automatically.

### Infrastructure as Code

Define infrastructure (servers, networks, databases) in code (Terraform, Pulumi, CloudFormation). Version-controlled, reviewable, reproducible. The target [Operating System](../Computer-Hardware/Operating-System.md) and [Computer Hardware](../Computer-Hardware/Readme.md) are declared in the IaC configuration, so the environment is identical from staging to production.

**Example**: A Terraform file declares: 3 `t3.medium` instances in an auto-scaling group, an ALB in front, an RDS PostgreSQL instance, and a VPC with public/private subnets. Running `terraform apply` creates or updates all of these. The same file is used for staging (1 instance) and production (3 instances) via a variable.

### DORA metrics in practice

The four DORA metrics are computed from CI/CD and observability data:

- **Deployment Frequency**: how often code reaches production (per day, per week).
- **Lead Time for Changes**: time from commit to production.
- **Change Failure Rate**: fraction of deployments that cause an incident.
- **Failed Deployment Recovery Time**: time to restore service after a failed deployment.

Teams are categorized as Elite, High, Medium, or Low performers based on these four metrics. The goal is not a specific number but continuous improvement: reduce lead time, increase deployment frequency, and keep failure rate and recovery time low.

<details><summary>Example problem</summary>

Your team deploys once a month. Each deployment takes 4 hours and has a 30% failure rate. When a deployment fails, it takes 2 days to recover. Using DORA metrics, what is your current performance level, and what is the first change you would make?

<details><summary>Solution</summary>

Current DORA metrics: Deployment Frequency = 1/month (Low), Lead Time = unknown but likely days (Low), Change Failure Rate = 30% (Low), Recovery Time = 2 days (Low). This is a "Low" performer.

First change: break the monthly deployment into smaller, more frequent deployments. Introduce a CI pipeline so that every commit is built and tested. Deploy to staging automatically. This reduces the blast radius of each deployment (smaller change = lower failure rate) and makes failures easier to diagnose (you know which commit broke it). Target: weekly deployments within one quarter, daily within two quarters.

</details>

</details>

</details>

## Observability

**Logging**: structured records of events (timestamp, level, message, context). **Metrics**: numerical time series (CPU, memory, request rate, latency). **Tracing**: distributed traces that follow a request across services (OpenTelemetry, Jaeger). In a [Distributed Systems](../Distributed-Systems/Readme.md) architecture, tracing is essential to follow a request across service boundaries.

**Alerting**: notify when a metric exceeds a threshold or a pattern is detected. **SLO** (Service Level Objective): a target (e.g., 99.9% of requests < 200 ms). **Error budget**: the allowed failure rate (0.1%); when exhausted, freeze feature work and fix reliability.

<details><summary>Details</summary>

### The three pillars

Logs (what happened), metrics (how much), traces (how it flowed). Together, they answer: "Is the system healthy? What is wrong? Where did it fail?"

**Example**: A user reports a slow checkout. The metrics dashboard shows p99 latency spiked at 14:02. The trace for that request shows: `api-gateway (5 ms) → auth-service (12 ms) → inventory-service (1800 ms) → database (1750 ms)`. The logs for `inventory-service` at 14:02 show: `WARN: connection pool exhausted, waiting 1750 ms for a connection`. Root cause: the connection pool was too small for the traffic spike.

### OpenTelemetry

A vendor-neutral standard for instrumentation. The SDK collects spans, metrics, and logs; the collector exports them to a backend (Jaeger, Prometheus, Loki). The specification defines the data model (spans, attributes, resource) and the protocol (OTLP over gRPC or HTTP).

**Example**: A Go service uses the OpenTelemetry SDK to create a span for each HTTP request. The span includes attributes: `http.method`, `http.status_code`, `db.system=postgres`. The OTLP collector batches spans and exports them to Jaeger. In the Jaeger UI, you search by `service=inventory-service` and `http.status_code=500` to find all failing requests.

### Dashboards and correlation

Grafana (metrics), Kibana (logs), Jaeger (traces). Correlate by trace ID: a slow request in the dashboard links to the trace, which links to the logs. A single trace ID threads through all three systems.

### Chaos engineering

Intentionally inject failures (kill a node, add latency, drop packets) to verify that the system behaves as expected. This is a practical application of [Fault Tolerance](../Distributed-Systems/Robustness/Fault-Tolerance.md) principles: you test the system's resilience before a real failure occurs. Tools: Chaos Monkey (Netflix), Litmus (Kubernetes).

**Example**: Every Friday at 10:00, a chaos experiment kills one pod in the `payment-service` deployment. The expected behavior: the load balancer routes to the remaining pods, the killed pod is restarted by the orchestrator, and the error rate stays below 0.1%. If the error rate spikes above 1%, the experiment is a failure and the team investigates before the next run.

> **Authoritative sources**
> - [OpenTelemetry Specification](https://opentelemetry.io/docs/specs/otel/)

<details><summary>Example problem</summary>

Your SLO is 99.9% of requests < 500 ms. Over the last 30 days, 0.3% of requests exceeded 500 ms. What is your error budget consumption, and what should you do?

<details><summary>Solution</summary>

Error budget = 1 − 0.999 = 0.1% (1 in 1000 requests may exceed 500 ms). You consumed 0.3%, which is 3× your budget. The budget is exhausted.

Action: freeze feature development for one sprint. Use the sprint to: (1) identify the slow requests via tracing (which service, which query), (2) fix the root cause (add an index, increase connection pool, add caching), (3) verify the SLO is met for 7 consecutive days before resuming feature work. This is the SLO-driven development loop: the error budget is the mechanism that forces reliability work to compete with feature work on equal footing.

</details>

</details>

</details>

## Interactive simulation

<iframe src="./Software-Engineering.simulation.html" title="CI/CD pipeline and deployment strategies"></iframe>

## Quiz

<details><summary>Example problem</summary>

**Problem**: A team of 5 developers works on a web application. They deploy weekly, and each deployment takes 2 hours. A bug is found in production 3 days after deployment. How can they reduce the time-to-detection and time-to-recovery?

<details><summary>Solution</summary>

**Reduce time-to-detection**:
1. **CI pipeline**: every commit triggers build + unit tests + integration tests. Catches most bugs before they reach production.
2. **Code review**: every PR is reviewed before merge. A second pair of eyes catches logic errors that tests miss.
3. **Staging environment**: deploy to a staging environment that mirrors production. Run acceptance tests and smoke tests.
4. **Monitoring and alerting**: set up metrics (error rate, latency, throughput) and alerts. A spike in 500 errors triggers an alert within minutes, not days.
5. **Structured logging**: log request IDs, user IDs, and error details. When an alert fires, the on-call engineer can find the relevant logs in seconds.

**Reduce time-to-recovery**:
1. **Rollback**: keep the previous deployment artifact. Roll back in minutes, not hours.
2. **Feature flags**: wrap risky features in flags. If a bug is found, disable the flag without redeploying.
3. **Canary deployment**: deploy to 5% of users first. If the error rate spikes, roll back the canary before it affects all users.
4. **Blue-green**: keep the old environment running. Switch traffic back if the new deployment fails.

**Result**: weekly 2-hour deployments become daily 10-minute deployments. Bugs are caught in CI (minutes) or in the canary (minutes), not in production (days). DORA metrics improve: Deployment Frequency goes from 1/week to 1/day; Failed Deployment Recovery Time goes from 3 days to minutes.

</details>

</details>

Software engineering studies how to build, test, deploy, and monitor software at scale. It is relevant whenever a program must be maintained by a team, deployed to production, and kept reliable over time.

> **Authoritative sources**
> - [The Mythical Man-Month (Brooks)](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)
> - [Continuous Delivery (Humble & Farley)](https://www.oreilly.com/library/view/continuous-delivery/9780133524809/)

## Version control

**Git** is a distributed version control system. A **commit** is a snapshot of the repository with a message, author, and parent pointer. A **branch** is a movable pointer to a commit. A **merge** combines two branches; a **rebase** replays commits on top of another branch.

<details><summary>Details</summary>

**Git data model**: objects (blobs, trees, commits, tags) stored in a content-addressable store (SHA-1 hash). A commit points to a tree (the file system at that point) and one or more parent commits.

**Branching strategies**:
- **Git Flow**: `main` (production), `develop` (integration), `feature/*`, `release/*`, `hotfix/*`.
- **Trunk-based**: everyone commits to `main`; feature flags control rollout. Short-lived branches ($`< 1` day).
- **GitHub Flow**: `main` + short-lived feature branches; PRs for review.

**Merge vs. rebase**: merge preserves history (a merge commit shows the divergence); rebase creates a linear history (rewrites commit hashes). Rebase is preferred for local commits; merge for shared branches.

</details>

## Testing

**Unit tests**: test a single function or class in isolation. **Integration tests**: test the interaction between components. **Acceptance tests**: test the system against user requirements.

**Assertion**: a check that a condition holds; if it fails, the test fails. **Regression tests**: tests that verify a previously fixed bug does not reappear. **Fuzzing**: generate random or structured inputs to find crashes and undefined behavior.

<details><summary>Details</summary>

**Test pyramid**: many unit tests (fast, cheap), fewer integration tests (slower), few acceptance tests (slowest). Inverted pyramid (many E2E tests) is fragile and slow.

**Property-based testing**: instead of specific inputs, specify properties that must hold for all inputs. `for all lists l: sort(sort(l)) == sort(l)`. Tools: QuickCheck (Haskell), Hypothesis (Python), proptest (Rust).

**Fuzzing**: **coverage-guided fuzzing** (AFL, libFuzzer) uses coverage feedback to guide input generation. **Structure-aware fuzzing** (Jazzer, honggfuzz) uses the program's type information to generate valid inputs.

**Mutation testing**: introduce small bugs (mutations) into the code; if the test suite does not catch the mutation, the tests are insufficient.

</details>

## CI/CD

**CI** (Continuous Integration): every commit triggers a build, test, and static analysis pipeline. Fail fast: the first failing stage stops the pipeline.

**CD** (Continuous Delivery/Deployment): every passing build is deployable. **Continuous Delivery**: a human approves the deployment. **Continuous Deployment**: the deployment is automatic.

<details><summary>Details</summary>

**Pipeline stages**: build → unit test → integration test → security scan → deploy to staging → acceptance test → deploy to production.

**Deployment strategies**:
- **Blue-green**: two identical environments; switch traffic from blue to green.
- **Canary**: deploy to a small percentage of users; monitor; roll out or roll back.
- **Rolling update**: replace instances one at a time (Kubernetes default).

**Infrastructure as Code** (IaC): define infrastructure (servers, networks, databases) in code (Terraform, Pulumi, CloudFormation). Version-controlled, reviewable, reproducible.

</details>

## Observability

**Logging**: structured records of events (timestamp, level, message, context). **Metrics**: numerical time series (CPU, memory, request rate, latency). **Tracing**: distributed traces that follow a request across services (OpenTelemetry, Jaeger).

**Alerting**: notify when a metric exceeds a threshold or a pattern is detected. **SLO** (Service Level Objective): a target (e.g., 99.9% of requests < 200 ms). **Error budget**: the allowed failure rate (0.1%); when exhausted, freeze feature work and fix reliability.

<details><summary>Details</summary>

**The three pillars**: logs (what happened), metrics (how much), traces (how it flowed). Together, they answer: "Is the system healthy? What is wrong? Where did it fail?"

**OpenTelemetry**: a vendor-neutral standard for instrumentation. The SDK collects spans, metrics, and logs; the collector exports them to a backend (Jaeger, Prometheus, Loki).

**Dashboards**: Grafana (metrics), Kibana (logs), Jaeger (traces). Correlate by trace ID: a slow request in the dashboard links to the trace, which links to the logs.

**Chaos engineering**: intentionally inject failures (kill a node, add latency, drop packets) to verify that the system behaves as expected. Tools: Chaos Monkey (Netflix), Litmus (Kubernetes).

</details>

## Example problem

**Problem**: A team of 5 developers works on a web application. They deploy weekly, and each deployment takes 2 hours. A bug is found in production 3 days after deployment. How can they reduce the time-to-detection and time-to-recovery?

<details><summary>Solution</summary>

**Reduce time-to-detection**:
1. **CI pipeline**: every commit triggers build + unit tests + integration tests. Catches most bugs before they reach production.
2. **Staging environment**: deploy to a staging environment that mirrors production. Run acceptance tests and smoke tests.
3. **Monitoring and alerting**: set up metrics (error rate, latency, throughput) and alerts. A spike in 500 errors triggers an alert within minutes, not days.
4. **Structured logging**: log request IDs, user IDs, and error details. When an alert fires, the on-call engineer can find the relevant logs in seconds.

**Reduce time-to-recovery**:
1. **Rollback**: keep the previous deployment artifact. Roll back in minutes, not hours.
2. **Feature flags**: wrap risky features in flags. If a bug is found, disable the flag without redeploying.
3. **Canary deployment**: deploy to 5% of users first. If the error rate spikes, roll back the canary before it affects all users.
4. **Blue-green**: keep the old environment running. Switch traffic back if the new deployment fails.

**Result**: weekly 2-hour deployments become daily 10-minute deployments. Bugs are caught in CI (minutes) or in the canary (minutes), not in production (days).

</details>
