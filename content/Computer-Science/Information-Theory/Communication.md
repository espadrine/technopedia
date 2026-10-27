# Communication

Communication studies how to transmit data reliably over a noisy channel. It is relevant whenever data must cross a physical medium (wire, air, fiber) that introduces errors.

Three questions structure the subject: **channel capacity** sets the fundamental limit on how fast information can be sent; **error detection** flags when the received bits differ from what was sent; **error correction** repairs the errors so the receiver recovers the original message. Each section builds on the previous: capacity tells you whether a target rate is achievable, detection tells you an error occurred, and correction restores the data.

> **Authoritative sources**
> - [A Mathematical Theory of Communication](https://ieeexplore.ieee.org/document/6773024)
> - [Error Control Coding (Lin & Costello)](https://www.pearson.com/en-us/subject-catalog/p/theory-and-practice-of-error-control/P200000003516/9780130415924)

## Channel models

Three canonical channels capture the essential noise mechanisms:

<table>
<tr><th>Channel</th><th>Parameter</th><th>Capacity</th><th>Typical use</th></tr>
<tr><td>Binary Symmetric Channel (BSC)</td><td>crossover probability <i>p</i></td><td><i>C</i> = 1 − <i>H</i><sub>b</sub>(<i>p</i>)</td><td>Model for digital links with bit flips</td></tr>
<tr><td>Binary Erasure Channel (BEC)</td><td>erasure probability <i>ε</i></td><td><i>C</i> = 1 − <i>ε</i></td><td>Model for channels that lose symbols (e.g. packet loss)</td></tr>
<tr><td>Additive White Gaussian Noise (AWGN)</td><td>bandwidth <i>B</i>, SNR</td><td><i>C</i> = <i>B</i> log₂(1 + SNR)</td><td>Model for analog / RF links</td></tr>
</table>

The BSC is the simplest discrete model: each bit is flipped independently with probability $`p`. The BEC replaces bits with an erasure marker (the receiver knows which positions are lost). The AWGN channel is the continuous analogue; its capacity is the **Shannon–Hartley theorem**.

## Channel capacity

The **Shannon capacity** of a discrete memoryless channel is:

```math
C = \max_{p(x)} I(X; Y)
```

bits per channel use, where $`I(X;Y)` is the mutual information and $`H(X)` is the entropy (see [Coding and entropy](./Coding-and-Entropy.md) for definitions). For a binary symmetric channel with crossover probability $`p`:

```math
C = 1 - H_b(p) = 1 + p\log_2 p + (1-p)\log_2(1-p)
```

The **channel coding theorem** states that reliable communication at any rate $`R < C` is possible with sufficiently long codes; no code can reliably communicate at $`R > C`.

The **code rate** $`R = k/n` is the ratio of information bits $`k` to the total codeword length $`n`. It measures the overhead: a rate of $`R = 0.5` means one parity bit per data bit. A code can only operate reliably when $`R \leq C`.

**Source–channel separation theorem** (Shannon 1948): optimal source coding (compression) and channel coding (error correction) can be designed independently. The source is compressed to its entropy rate, then the compressed stream is protected by a channel code operating below capacity. This is why [Compression](./Compression.md) and this page are separate topics: each solves a different problem, and the optimal solution to one does not depend on the details of the other.

<details><summary>Details</summary>

**AWGN channel**: For a continuous channel with bandwidth $`B` Hz and signal-to-noise ratio $`\text{SNR}`:

```math
C = B \log_2(1 + \text{SNR}) \quad \text{bits/s}
```

This is the **Shannon–Hartley theorem**. It sets the ultimate limit for any modulation and coding scheme on that channel.

**Practical gap**: Polar codes (Arikan 2009) provably achieve capacity for binary-input DMC channels and approach within a small gap (≲ 0.1 dB) for large block lengths. LDPC codes are typically within 0.5–1 dB of capacity. Turbo codes (1993) were the first practical codes to come close.

</details>

## Error detection

**Parity bit**: append 1 bit so the total number of 1s is even (or odd). Detects single-bit errors.

**Checksum**: sum all bytes (mod $`2^8` or $`2^{16}`); append the complement. Detects most single-bit and some multi-bit errors. Used in TCP, IP.

**CRC** (Cyclic Redundancy Check): treat the message as a polynomial $`m(x)` over $`\mathbb{F}_2`; compute $`m(x) \bmod g(x)` where $`g(x)` is a generator polynomial (e.g., CRC-32: $`x^{32} + x^{26} + x^{23} + x^{22} + x^{16} + x^{12} + x^{11} + x^{10} + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1`). Append the remainder. Detects all burst errors of length $`\leq \deg g` and most longer errors.

> **Authoritative sources**
> - [IEEE 802.3 (Ethernet) standard](https://www.ieee802.org/3/)
> - [Cyclic redundancy check (Wikipedia)](https://en.wikipedia.org/wiki/Cyclic_redundancy_check)

The **minimum Hamming distance** $`d_{min}` of a code is the smallest number of positions in which any two distinct codewords differ. It is the single most important parameter linking detection to correction:

- A code with minimum distance $`d_{min}` **detects** up to $`d_{min} - 1` errors.
- A code with minimum distance $`d_{min}` **corrects** up to $`\lfloor (d_{min}-1)/2 \rfloor` errors.

For example, $`d_{min} = 3` detects 2 errors and corrects 1; $`d_{min} = 5` detects 4 errors and corrects 2.

<details><summary>Details</summary>

**CRC properties**:
- Detects all single-bit errors.
- Detects all double-bit errors (if $`g(x)` has $`\geq 3` terms).
- Detects all burst errors of length $`\leq \deg g(x)`.
- Detects $`(1 - 2^{-(\deg g - 1)})` of longer burst errors.

CRC is a linear code: the set of valid codewords forms a vector space over $`\mathbb{F}_2`. This makes hardware implementation trivial (a shift register with XOR feedback).

**Hamming distance** $`d_H(c_1, c_2)`: the number of positions in which two codewords differ. The minimum distance $`d_{min} = \min_{c_1 \neq c_2} d_H(c_1, c_2)` determines the error-detection and correction capability as stated above.

</details>

## Error correction

**Hamming code** $`(2^m - 1, 2^m - 1 - m)`: adds $`m` parity bits to protect $`2^m - 1 - m` data bits. Has $`d_{min} = 3`: corrects single-bit errors. Example: Hamming(7,4) protects 4 data bits with 3 parity bits.

**Reed-Solomon code** $`(n, k)` over $`\mathbb{F}_{2^m}`: encodes $`k` symbols into $`n` symbols; corrects up to $`t = (n-k)/2` symbol errors. Used in CDs, QR codes, SSDs, Deep Space Network.

**Convolutional codes**: pass the input through a shift register with XOR feedback; the output is a sequence of parity bits. Decoded with the Viterbi algorithm (dynamic programming over the trellis).

**LDPC codes**: sparse parity-check matrix; decoded with belief propagation (iterative message passing on the factor graph). Used in Wi-Fi (802.11ax), DVB-S2, 5G.

<details><summary>Details</summary>

**Reed-Solomon example**: RS(255, 223) over $`\mathbb{F}_{256}` encodes 223 bytes into 255 bytes, correcting up to 16 byte errors. Used in CD (C2 error correction) and QR codes.

**Viterbi algorithm**: for a convolutional code with constraint length $`K`, the trellis has $`2^{K-1}` states. At each time step, for each state, keep only the path with the minimum Hamming distance to the received sequence. Complexity: $`O(n \cdot 2^{K-1})`.

**Belief propagation** (for LDPC): alternate between variable nodes ("what is my value?") and check nodes ("is my constraint satisfied?"). Converges in $`\approx 10`–$`20` iterations for good codes.

</details>

## Simulation

<iframe src="./Communication.simulation.html" title="BSC channel with error-correcting code"></iframe>

## Example problem

**Problem**: A message of 1000 bits is sent over a BSC with $`p = 0.01`. What is the channel capacity? If a (1023, 1013) Hamming code is used, what is the code rate and the probability of undetected error per codeword (approximate)?

<details><summary>Solution</summary>

**Capacity**: $`C = 1 - H_b(0.01) = 1 + 0.01\log_2(0.01) + 0.99\log_2(0.99) \approx 1 - 0.0808 = 0.919` bits/use.

**Code rate**: $`R = k/n = 1013/1023 \approx 0.990`. Since $`R > C`, this code rate exceeds capacity: reliable communication is **not** guaranteed at this rate with this code. A practical code would need $`R \leq 0.919`, e.g., a (1023, 940) code.

**Undetected error probability**: The Hamming(1023, 1013) code has $`d_{min} = 3`: it corrects 1 error and detects 2. With $`np = 10.23` expected errors per codeword, the code will almost always see more than 1 error and declare a failure (or, in a real system, request retransmission). The probability of an undetected error (3 or more errors that map to another valid codeword) is:

```math
P_{\text{undetected}} = \sum_{i=d_{min}}^{n} A_i\, p^i (1-p)^{n-i}
```

where $`A_i` is the number of codewords of weight $`i`. For a Hamming code with $`n = 1023` and $`p = 0.01`, the dominant term is $`A_3 \cdot p^3 (1-p)^{n-3}` with $`A_3 = n(n-1)/6 = 174{,}251`, giving $`P_{\text{undetected}} \approx 6 \times 10^{-6}`, which is very small.

</details>
