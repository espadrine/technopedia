# Adversarial Failure

Adversarial failure models study how a system behaves when nodes are not merely crashed but actively malicious: they send contradictory messages, collude, or create fake identities. It is relevant in open networks (blockchains, public internet) where participants cannot be fully trusted. See [Consensus and Consistency](./Robustness/Consensus-and-Consistency.md) for the consensus problem that BFT protocols solve, and [Fault Tolerance](./Robustness/Fault-Tolerance.md) for the crash-fault counterpart.

> **Authoritative sources**
> - [Practical Byzantine Fault Tolerance (Castro & Liskov, 1999)](https://pdos.csail.mit.edu/6.824/papers/castro-practicalbft.pdf)
> - [Reaching Agreement in the Presence of Faults (Pease, Shostak & Lamport, 1980)](https://lamport.azurewebsites.net/pubs/reaching.pdf)
> - [The Sybil Attack (Douceur, 2002)](https://www.microsoft.com/en-us/research/wp-content/uploads/2002/01/IPTPS2002.pdf)

## Byzantine faults

**Byzantine vs. crash**: a crash fault is a node that stops responding (power failure, network partition). A Byzantine fault is a node that responds with arbitrary, possibly malicious messages (sends different values to different peers, lies, colludes). Crash faults are common in practice; Byzantine faults are rare outside open networks.

**Byzantine fault**: a node behaves arbitrarily. Tolerating $`f` Byzantine faults requires $`n \geq 3f + 1` nodes (vs. $`n \geq 2f + 1` for crash faults).

### The 3f+1 lower bound

The $`3f + 1` bound is not a property of PBFT but a fundamental impossibility result. Pease, Shostak & Lamport (1980) proved that no protocol can reach agreement among $`n` processes with $`f` Byzantine faults when $`n \leq 3f`.

**Intuition**: with $`n \leq 3f`, the Byzantine nodes can split the honest nodes into groups and give each group a contradictory story, preventing any two honest nodes from agreeing. For example, with $`n = 4` and $`f = 1`: the single Byzantine node tells node A that node B said "attack" and tells node B that node A said "retreat". Both A and B see a consistent story (one honest node + one Byzantine node agreeing with them), so neither can detect the lie.

<details><summary>Details</summary>

**Proof sketch**: the proof reduces the Byzantine agreement problem to a "general and lieutenants" problem. The general sends an order to $`n - 1` lieutenants. If $`n \leq 3f`, the $`f` traitorous lieutenants can each relay a different version of the order to the remaining lieutenants, making it impossible for the loyal lieutenants to distinguish the true order from the lies. The bound is tight: with $`n = 3f + 1`, a simple protocol (each node broadcasts its value, and all nodes take the majority) succeeds.

**Relation to FLP**: the FLP impossibility (asynchronous + 1 crash → no consensus) is a different impossibility. The 3f+1 bound holds even in a synchronous network; it is about the *number* of Byzantine nodes, not about timing. See [Consensus and Consistency](./Robustness/Consensus-and-Consistency.md) for FLP.

</details>

### PBFT

**PBFT** (Practical Byzantine Fault Tolerance, Castro & Liskov, 1999): a three-phase protocol (pre-prepare, prepare, commit). Tolerates $`f = \lfloor(n-1)/3\rfloor` Byzantine faults. $`O(n^2)` messages per operation.

**Synchrony assumption**: PBFT assumes a **partially synchronous** network: after a global stabilization time (GST), message delays are bounded by a known constant $`\Delta`. Before GST, messages may be arbitrarily delayed or lost. This is a critical assumption: in a fully asynchronous network (no bound on delays), the FLP impossibility applies and no deterministic BFT protocol can guarantee termination. PBFT works in practice because real networks are approximately synchronous after a transient period.

<details><summary>Details</summary>

**PBFT phases**:
1. **Pre-prepare**: the primary (leader) broadcasts the client request to all replicas.
2. **Prepare**: each replica broadcasts a "prepare" message to all others. A replica enters the prepare state when it receives $`2f` matching prepare messages (a quorum of $`2f + 1` including itself).
3. **Commit**: each replica broadcasts a "commit" message. A replica enters the commit state when it receives $`2f` matching commit messages, then replies to the client.

**View change**: if the primary is Byzantine (does not forward requests), replicas detect the timeout and elect a new primary. The view change protocol itself must be Byzantine-tolerant.

**Practical considerations**: most production systems assume crash faults (not Byzantine). The exception is blockchain systems (Bitcoin, Ethereum) and some military/aviation systems. The $`O(n^2)` message complexity limits PBFT to small groups (typically $`n \leq 100`).

</details>

<iframe src="./Adversarial-failure.simulation.html" title="PBFT three-phase protocol with Byzantine nodes"></iframe>

### Other BFT protocols

PBFT is not the only BFT protocol. The design space trades off message complexity, synchrony assumptions, and finality type:

<table>
<tr><th>Protocol</th><th>Message complexity</th><th>Synchrony</th><th>Finality</th><th>Notes</th></tr>
<tr><td>PBFT (1999)</td><td>O(n²) per decision</td><td>Partially synchronous</td><td>Immediate (deterministic)</td><td>Three-phase, leader-based</td></tr>
<tr><td>HotStuff (2019)</td><td>O(n) per decision (amortized)</td><td>Partially synchronous</td><td>Immediate (deterministic)</td><td>Leader-based, pipelined views; used in Diem/Libra</td></tr>
<tr><td>Tendermint (2014)</td><td>O(n²) per round</td><td>Partially synchronous</td><td>Immediate (deterministic)</td><td>Round-based all-to-all voting; used in Cosmos, Ethereum 2.0 beacon chain</td></tr>
<tr><td>Algorand (2019)</td><td>O(n) per round (lottery)</td><td>Asynchronous (probabilistic)</td><td>Probabilistic (final after k rounds)</td><td>Leaderless, stake-weighted lottery; no persistent leader</td></tr>
</table>

<details><summary>Details</summary>

**HotStuff** (Bafna et al., 2019): reduces PBFT's O(n²) to O(n) amortized by pipelining: while the current view is in the commit phase, the next view's pre-prepare is already in flight. Uses a "timeout view change" that is O(n) rather than O(n²).

**Tendermint** (Buchman et al., 2014): similar to PBFT but uses a round-based structure where each round has a propose, pre-vote, and pre-commit phase. A block is committed when 2/3 of validators pre-commit to it. Tolerates f < n/3 crash or Byzantine faults.

**Algorand** (Lindell, 2019): eliminates the leader entirely. In each round, a committee is selected by a stake-weighted verifiable random function (VRF). The committee proposes and votes. Because the committee is small (O(√n)), message complexity is reduced. Finality is probabilistic: after k consecutive rounds of agreement, the block is considered final with probability 1 − ε.

</details>

## Sybil attacks

**Sybil attack**: an attacker creates many fake identities to gain voting power or manipulate consensus. The core insight is that **identity cost** is the defense mechanism: if creating a new identity is cheap, the attacker can outvote the honest nodes; if it is expensive (computation, capital, social trust), the attack becomes economically infeasible.

**Concrete example**: in Bitcoin's proof-of-work, each block is weighted by the hash power that produced it. An attacker who wants to create k fake "nodes" must control k times the mining hardware. To outvote the honest majority, the attacker needs > 50% of the network's total hash power, which requires a capital expenditure that exceeds the potential profit from the attack. Proof-of-stake (Ethereum) achieves the same effect with staked capital: creating a fake validator requires locking up ETH that is slashed if the validator misbehaves.

<details><summary>Details</summary>

**Mitigation strategies**:
- **Permissioned systems** (e.g., a blockchain with known validators): identity verification via certificates or a trusted authority.
- **Proof-of-work** (Bitcoin): creating fake identities requires controlling > 50% of the hash power, which is economically prohibitive.
- **Proof-of-stake** (Ethereum): creating fake identities requires staking a large amount of capital, which is slashed if the validator misbehaves.
- **Reputation systems**: weight votes by historical behavior or social graph centrality.

**Relation to Byzantine faults**: a Sybil attack is a specific type of Byzantine behavior where the attacker's strategy is to multiply identities rather than to send contradictory messages. The 3f + 1 bound assumes each Byzantine node is a single entity; Sybil attacks violate this assumption by inflating n with fake nodes that all behave identically (as one logical attacker).

</details>

## Example problem

**Problem**: A blockchain network has 10 validators. The protocol uses PBFT. How many Byzantine validators can the system tolerate? If an attacker controls 4 validators, can they prevent the system from making progress?

<details><summary>Solution</summary>

**Tolerance**: PBFT tolerates $`f = \lfloor(n-1)/3\rfloor` Byzantine faults. With $`n = 10`: $`f = \lfloor(10-1)/3\rfloor = 3`. The system is *designed* to tolerate 3 Byzantine validators.

**Attacker with 4 validators**: The attacker controls 4 out of 10 validators. Since $`4 > 3`, the attacker exceeds the designed tolerance. The quorum is fixed at design time: $`2f + 1 = 2(3) + 1 = 7` matching messages are required in the prepare phase. This quorum does not change based on how many nodes are actually Byzantine; it is a protocol parameter set when the system was configured for $`f = 3`. The attacker simply has more nodes than the protocol can absorb.

With 4 Byzantine nodes, the honest nodes number 6. The attacker can withhold or contradict messages so that no honest node ever collects 7 matching prepare messages (the 4 Byzantine nodes can send conflicting values, and the 6 honest nodes alone cannot reach the quorum of 7). **Yes, the attacker can prevent the system from making progress.**

**Note**: In practice, blockchain systems use different mechanisms (proof-of-work, proof-of-stake) rather than PBFT, precisely because the $`3f + 1` bound is too restrictive for large, open networks.

</details>