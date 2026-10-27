# Coding and Entropy

Coding and entropy study how to represent data using the fewest bits. They are relevant whenever storage or bandwidth is limited and the data's statistical structure can be exploited.

> **Authoritative sources**
> - [A Mathematical Theory of Communication](https://ieeexplore.ieee.org/document/6773024)
> - [Prediction and Entropy of Printed English](https://ieeexplore.ieee.org/document/6773263)
> - [Elements of Information Theory (Cover & Thomas)](https://www.nowpublishers.com/article/Details/EIT-001)
> - [A Method for the Construction of Minimum-Redundancy Codes (Huffman, 1952)](https://ieeexplore.ieee.org/document/1617112)

## Fixed-length vs. variable-length codes

A **fixed-length code** assigns every symbol the same number of bits: $`\lceil \log_2 |\mathcal{X}| \rceil` bits per symbol, regardless of probability. ASCII is the canonical example: 7 bits for every character, whether it is a common `e` or a rare `z`.

A **variable-length (prefix-free) code** assigns shorter codewords to more probable symbols and longer ones to rarer symbols. The constraint is that no codeword may be a prefix of another, so the decoder can always tell where one symbol ends and the next begins. The expected length of such a code can be strictly less than $`\lceil \log_2 |\mathcal{X}| \rceil` whenever the distribution is non-uniform.

This distinction motivates the rest of the page: entropy quantifies *how much* shorter a variable-length code can be, and the source coding theorem and Huffman coding show *how close* to that limit one can get.

<details><summary>Details</summary>

**Step 1 — what decoding requires.** The decoder receives one long bit string with no separators and must split it into codewords, left to right. The split must be unique for every possible string, otherwise the message is ambiguous.

**Step 2 — what goes wrong without prefix-freeness.** Take the code A = `0`, B = `1`, C = `01`. The bit string `01` has two valid readings:

- a single symbol C,
- the symbol A followed by the symbol B.

The decoder cannot tell which one was sent. The problem is that `0` (a codeword for A) is a *prefix* of `01` (a codeword for C): after reading `0`, the decoder cannot know whether the codeword is already complete.

**Step 3 — why prefix-freeness fixes it.** If no codeword is a prefix of another, the decoder can read bits left to right and stop at the *first* codeword that matches. That first match is the only possible one, because no longer codeword can start with those same bits. Decoding is then a simple greedy scan — no separators, no length fields, no backtracking.

**Step 4 — the tree picture.** A binary code is a binary tree: each edge is a bit (left = 0, right = 1), and each codeword is the path from the root to a node. Prefix-freeness means exactly that all symbols sit on **leaves**: a codeword that is a prefix of another would be an internal node with children, which is impossible if every symbol is a leaf.

<svg viewBox="0 0 470 320" width="470" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="470" height="320" fill="#16213e" rx="8"/>
  <text x="235" y="22" fill="#7ec8e3" font-size="13" text-anchor="middle" font-family="system-ui">Prefix-free code as a binary tree: symbols are leaves</text>
  <line x1="50" y1="160" x2="160" y2="80" stroke="#555" stroke-width="1.5"/>
  <line x1="50" y1="160" x2="160" y2="230" stroke="#555" stroke-width="1.5"/>
  <line x1="170" y1="230" x2="280" y2="190" stroke="#555" stroke-width="1.5"/>
  <line x1="170" y1="230" x2="280" y2="275" stroke="#555" stroke-width="1.5"/>
  <line x1="290" y1="275" x2="400" y2="245" stroke="#555" stroke-width="1.5"/>
  <line x1="290" y1="275" x2="400" y2="300" stroke="#555" stroke-width="1.5"/>
  <text x="95" y="108" fill="#aaa" font-size="12" font-family="monospace">0</text>
  <text x="95" y="210" fill="#aaa" font-size="12" font-family="monospace">1</text>
  <text x="215" y="200" fill="#aaa" font-size="12" font-family="monospace">0</text>
  <text x="215" y="265" fill="#aaa" font-size="12" font-family="monospace">1</text>
  <text x="335" y="250" fill="#aaa" font-size="12" font-family="monospace">0</text>
  <text x="335" y="300" fill="#aaa" font-size="12" font-family="monospace">1</text>
  <circle cx="50" cy="160" r="9" fill="#f9a826"/>
  <circle cx="165" cy="80" r="14" fill="#7ec8e3"/>
  <circle cx="165" cy="230" r="9" fill="#f9a826"/>
  <circle cx="285" cy="190" r="14" fill="#7ec8e3"/>
  <circle cx="285" cy="275" r="9" fill="#f9a826"/>
  <circle cx="405" cy="245" r="14" fill="#7ec8e3"/>
  <circle cx="405" cy="300" r="14" fill="#7ec8e3"/>
  <text x="165" y="84" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui">A</text>
  <text x="285" y="194" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui">B</text>
  <text x="405" y="249" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui">C</text>
  <text x="405" y="304" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui">D</text>
  <text x="165" y="58" fill="#eee" font-size="12" text-anchor="middle" font-family="monospace">0</text>
  <text x="285" y="168" fill="#eee" font-size="12" text-anchor="middle" font-family="monospace">10</text>
  <text x="405" y="223" fill="#eee" font-size="12" text-anchor="middle" font-family="monospace">110</text>
  <text x="425" y="305" fill="#eee" font-size="12" text-anchor="start" font-family="monospace">111</text>
  <text x="30" y="164" fill="#888" font-size="10" text-anchor="end" font-family="system-ui">root</text>
</svg>

Here A = `0`, B = `10`, C = `110`, D = `111`. Every symbol is a leaf, so the code is prefix-free and the greedy scan decodes any bit string uniquely.

<details><summary>Example problem</summary>

Using the code above (A = `0`, B = `10`, C = `110`, D = `111`):

1. Decode the bit string `100110111`.
2. Is the code {A = `0`, C = `01`} prefix-free? Why not, and what does it break?

<details><summary>Solution</summary>

1. Scan left to right, stopping at the first codeword match: `10` → B, then `0` → A, then `110` → C, then `111` → D. The string decodes to **B A C D**. The first-match rule is unambiguous precisely because the code is prefix-free.
2. No: `0` is a prefix of `01`. The string `01` could be a single C or an A followed by a `1`-starting codeword — the greedy first-match scan would misdecode it. This is exactly the ambiguity of Step 2.

</details>
</details>

</details>

## Information and entropy

The **self-information** of an event $`x` with probability $`p(x)` is $`I(x) = -\log_2 p(x)` bits.

The **entropy** of a discrete random variable $`X` with distribution $`p` is:

```math
H(X) = -\sum_x p(x) \log_2 p(x)
```

Entropy is the average self-information and the lower bound on the expected code length of any lossless prefix-free code.

<details><summary>Details</summary>

**Properties**:
- $`H(X) = 0` iff $`X` is deterministic.
- $`H(X) \leq \log_2 |\mathcal{X}|`, with equality iff $`X` is uniform.
- $`H(X, Y) = H(X) + H(Y|X)` (chain rule).
- $`H(X, Y) \leq H(X) + H(Y)` (subadditivity).

**Mutual information**: $`I(X; Y) = H(X) - H(X|Y) = \sum_{x,y} p(x,y) \log_2 \frac{p(x,y)}{p(x)p(y)} \geq 0`. It measures how much knowing $`Y` reduces uncertainty about $`X`.

**Conditional entropy**: $`H(X|Y) = \sum_y p(y) H(X|Y=y)`. The number of bits still needed to describe $`X` after observing $`Y`.

All logarithms in this page are base 2, so all quantities are in bits.

Example: English text has entropy $`\approx 0.6`–$`1.3` bits/character over a 27-character alphabet (26 letters + space), versus $`\log_2 27 \approx 4.75` bits for a uniform distribution. The achievable compression ratio is therefore $`0.6/4.75 \approx 13%` to $`1.3/4.75 \approx 27%` of the original size. Shannon's 1951 estimate in [Prediction and Entropy of Printed English](https://ieeexplore.ieee.org/document/6773263) gives the 0.6–1.3 range.

</details>

## Redundancy

The **redundancy** of a source is the fraction of the available code space wasted by the source's non-uniform distribution:

```math
R = 1 - \frac{H(X)}{\log_2 |\mathcal{X}|}
```

A uniform source has $`R = 0` (no waste); a highly skewed source has $`R` close to 1 (most of the code space is unused).

<details><summary>Details</summary>

For English text (27-character alphabet, $`H \approx 1.0` bits/char as a midpoint): $`R \approx 1 - 1.0/4.75 \approx 79%`. This means roughly 79% of the 4.75 bits per character are "wasted" because the distribution is far from uniform. Redundancy is what lossless compression exploits: by using a variable-length code, the compressor removes this waste and approaches the entropy bound.

Redundancy is also the quantity that error-correcting codes *introduce* deliberately (see [Communication](./Communication.md)): a small amount of added redundancy makes the code robust to channel noise.

</details>

## Kraft inequality

A set of codeword lengths $`l_1, l_2, \ldots, l_n` is realizable as a binary prefix-free code if and only if:

```math
\sum_{i=1}^{n} 2^{-l_i} \leq 1
```

This is the **Kraft inequality**. It is the key combinatorial constraint that makes the coding problem well-posed: it says the codewords must "fit" in the binary tree without overlapping.

<details><summary>Details</summary>

**Intuition**: each codeword of length $`l_i` occupies a subtree of size $`2^{-l_i}` of the full binary tree. The Kraft inequality says these subtrees must be disjoint (total area $`\leq 1`). Equality holds when the tree is full (every internal node has two children).

The picture below shows the code space as a unit square: each codeword of length $`l` claims a rectangle of area $`2^{-l}`. For the prefix-free code A = `0`, B = `10`, C = `110`, D = `111`, the four rectangles exactly tile the square (Kraft sum = 1, a full tree). A code whose rectangles did not fill the square would leave unused code space; rectangles that *overlapped* would correspond to a prefix violation, which is impossible.

<svg viewBox="0 0 470 300" width="470" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="470" height="300" fill="#16213e" rx="8"/>
  <text x="235" y="22" fill="#7ec8e3" font-size="13" text-anchor="middle" font-family="system-ui">Kraft inequality: codewords tile the unit code space</text>
  <rect x="60" y="40" width="240" height="120" fill="#7ec8e3" opacity="0.85"/>
  <rect x="60" y="160" width="240" height="60" fill="#f9a826" opacity="0.85"/>
  <rect x="60" y="220" width="240" height="30" fill="#8bc34a" opacity="0.85"/>
  <rect x="60" y="250" width="240" height="30" fill="#e06666" opacity="0.85"/>
  <text x="180" y="105" fill="#1a1a2e" font-size="13" font-weight="bold" text-anchor="middle" font-family="monospace">0  (area 1/2)</text>
  <text x="180" y="195" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="monospace">10  (1/4)</text>
  <text x="180" y="240" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">110  (1/8)</text>
  <text x="180" y="270" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">111  (1/8)</text>
  <line x1="60" y1="40" x2="60" y2="280" stroke="#888" stroke-width="1"/>
  <line x1="300" y1="40" x2="300" y2="280" stroke="#888" stroke-width="1"/>
  <text x="180" y="295" fill="#aaa" font-size="11" text-anchor="middle" font-family="system-ui">total area = 1/2 + 1/4 + 1/8 + 1/8 = 1 (Kraft sum)</text>
</svg>

**Necessity**: in any prefix-free code, the leaves are disjoint subtrees, so their total area is at most 1.

**Sufficiency**: if the inequality holds, one can construct a prefix-free code with exactly those lengths by filling a binary tree level by level (a greedy leaf-placement algorithm).

The Kraft inequality is the constraint under which Huffman coding optimizes the expected length, and it is the tool used in the proof of the source coding theorem.

</details>

## Source coding theorem

**Theorem (Shannon's first theorem).** For any discrete memoryless source with entropy $`H(X)`, and any prefix-free code with expected codeword length $`L`:

```math
H(X) \leq L < H(X) + 1
```

The lower bound is tight: there exists a prefix-free code whose expected length is within 1 bit of the entropy. For block codes of length $`n` (encoding $`n`-tuples of symbols), the gap shrinks to $`1/n` per symbol, so the bound is asymptotically tight.

<details><summary>Details</summary>

**Lower bound** ($`L \geq H(X)`):

Let $`l_i` be the codeword length for symbol $`x_i` with probability $`p_i`. By the Kraft inequality, $`\sum_i 2^{-l_i} \leq 1`. Define $`q_i = 2^{-l_i}`; then $`\sum_i q_i \leq 1`. Extend to a proper distribution by adding a dummy symbol with probability $`1 - \sum_i q_i`.

By the **Gibbs inequality** (relative entropy is non-negative):

```math
\sum_i p_i \log_2 \frac{1}{p_i} \leq \sum_i p_i \log_2 \frac{1}{q_i}
```

Since $`q_i = 2^{-l_i}`, the right side is $`\sum_i p_i l_i = L`. The left side is $`H(X)`. Hence $`H(X) \leq L`.

**Upper bound** ($`L < H(X) + 1`):

Choose codeword lengths $`l_i = \lceil -\log_2 p_i \rceil`. Then $`l_i < -\log_2 p_i + 1`, so:

```math
L = \sum_i p_i l_i < \sum_i p_i(-\log_2 p_i + 1) = H(X) + 1
```

It remains to verify the Kraft inequality. Since $`l_i = \lceil -\log_2 p_i \rceil` by definition, the first sum is exactly:

```math
\sum_i 2^{-l_i} = \sum_i 2^{-\lceil -\log_2 p_i \rceil} \leq \sum_i 2^{-\log_2 p_i} = \sum_i p_i = 1
```

where the single inequality uses $`\lceil y \rceil \geq y`, hence $`2^{-\lceil y \rceil} \leq 2^{-y}`. So the lengths are realizable, and a prefix-free code with expected length $`< H(X) + 1` exists.

**Typical-set intuition**: the theorem has a purely combinatorial reading. For a sequence of $`n` i.i.d. symbols, the law of large numbers concentrates almost all probability mass on the **typical set**: roughly $`2^{nH(X)}` sequences, each with probability close to $`2^{-nH(X)}`. Indexing one typical sequence therefore takes about $`\log_2 2^{nH(X)} = nH(X)` bits, i.e. $`H(X)` bits per symbol. The atypical sequences outside this set are exponentially rare, so giving them long codewords costs almost nothing in expectation. This counting argument is the heart of the theorem, and it explains why encoding blocks of $`n` symbols shrinks the gap to $`1/n` per symbol.

</details>

## Huffman coding

**Huffman coding** is a greedy algorithm that constructs the optimal prefix-free code (minimum expected length) for a known probability distribution.

**Algorithm**:
1. Start with a leaf node for each symbol, weighted by its probability.
2. Repeatedly merge the two least-probable nodes into a new parent node whose probability is the sum.
3. Assign bit 0 to one child and bit 1 to the other at each merge.
4. The codeword for each symbol is the path from the root to its leaf.

**Optimality theorem**: The Huffman code is the prefix-free code with the minimum expected codeword length for the given distribution. It satisfies $`H(X) \leq L_{\text{Huffman}} < H(X) + 1`, and the gap $`L_{\text{Huffman}} - H(X)` is strictly less than 1 bit per symbol.

The Kraft inequality is the constraint that makes the problem well-posed: among all length assignments satisfying Kraft, Huffman finds the one that minimizes $`\sum p_i l_i`.

<div style="background:#16213e;border-radius:8px;padding:12px;max-width:660px;margin:12px 0">
<div style="color:#7ec8e3;font-size:0.95em;margin-bottom:6px;font-family:system-ui">Huffman construction, step by step, for p = (A: 0.5, B: 0.25, C: 0.125, D: 0.125)</div>
<svg id="huff-svg" viewBox="0 0 660 300" width="100%" xmlns="http://www.w3.org/2000/svg"></svg>
<button id="huff-btn" style="margin-top:6px">Next merge step</button>
<span id="huff-status" style="color:#aaa;font-size:0.85em;font-family:system-ui;margin-left:8px"></span>
</div>
<script>
(function () {
  var step = 0;
  var leaf = function (x, y, label, p) {
    return '<circle cx="' + x + '" cy="' + y + '" r="16" fill="#7ec8e3"/>' +
      '<text x="' + x + '" y="' + (y + 4) + '" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">' + label + '</text>' +
      '<text x="' + x + '" y="' + (y + 34) + '" fill="#aaa" font-size="11" text-anchor="middle" font-family="monospace">' + p + '</text>';
  };
  var inner = function (x, y, label) {
    return '<circle cx="' + x + '" cy="' + y + '" r="13" fill="#f9a826"/>' +
      '<text x="' + x + '" y="' + (y + 4) + '" fill="#1a1a2e" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">' + label + '</text>';
  };
  var edge = function (x1, y1, x2, y2, bit) {
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#555" stroke-width="1.5"/>' +
      '<text x="' + (mx + (x2 < x1 ? -10 : 10)) + '" y="' + (my - 4) + '" fill="#aaa" font-size="12" text-anchor="middle" font-family="monospace">' + bit + '</text>';
  };
  var frames = [
    { svg: leaf(90, 250, 'A', '0.5') + leaf(250, 250, 'B', '0.25') + leaf(450, 250, 'C', '0.125') + leaf(590, 250, 'D', '0.125'),
      status: 'Step 0: one leaf per symbol, weighted by probability.' },
    { svg: leaf(90, 250, 'A', '0.5') + leaf(250, 250, 'B', '0.25') +
        edge(450, 250, 520, 170, '0') + edge(590, 250, 520, 170, '1') + inner(520, 170, '0.25'),
      status: 'Step 1: merge the two least-probable nodes, C + D = 0.25.' },
    { svg: leaf(90, 250, 'A', '0.5') +
        edge(250, 250, 385, 100, '0') + edge(520, 170, 385, 100, '1') + inner(385, 100, '0.5') +
        edge(450, 250, 520, 170, '0') + edge(590, 250, 520, 170, '1') + inner(520, 170, '0.25'),
      status: 'Step 2: merge the two least-probable nodes, B (0.25) + CD (0.25) = 0.5.' },
    { svg: edge(90, 250, 240, 30, '0') + edge(385, 100, 240, 30, '1') + inner(240, 30, '1.0') +
        leaf(90, 250, 'A', '0.5') +
        edge(250, 250, 385, 100, '0') + edge(520, 170, 385, 100, '1') + inner(385, 100, '0.5') +
        edge(450, 250, 520, 170, '0') + edge(590, 250, 520, 170, '1') + inner(520, 170, '0.25'),
      status: 'Step 3: merge A (0.5) + BCD (0.5) = 1.0. Codewords: A=0, B=10, C=110, D=111.' }
  ];
  function render() {
    document.getElementById('huff-svg').innerHTML = frames[step].svg;
    document.getElementById('huff-status').textContent = frames[step].status;
    document.getElementById('huff-btn').textContent = step < frames.length - 1 ? 'Next merge step' : 'Restart';
  }
  document.getElementById('huff-btn').addEventListener('click', function () {
    step = (step + 1) % frames.length;
    render();
  });
  render();
})();
</script>

<details><summary>Details</summary>

**Why greedy works**: the two least-probable symbols are always siblings at the deepest level of the optimal tree (exchange argument). Merging them reduces the problem to $`n-1` symbols, and the greedy choice is locally optimal at every step.

**Example**: probabilities $`(0.5, 0.25, 0.125, 0.125)` (the distribution animated in the diagram above).
- Merge 0.125 + 0.125 → 0.25
- Merge 0.25 + 0.25 → 0.5
- Merge 0.5 + 0.5 → 1.0
- Codewords: `0`, `10`, `110`, `111`. Expected length = 1.75 = $`H` (exact, because all probabilities are powers of 2, so every $`-\log_2 p_i` is an integer and no codeword needs rounding up).

**Shannon–Fano coding**: the other classical way to build a prefix-free code. It works top-down: sort the symbols by decreasing probability, recursively split the ordered list into two groups of approximately equal total probability, and assign bit 0 to one group and bit 1 to the other. This contrasts with Huffman's bottom-up greedy merge. Shannon–Fano is simple and often close to optimal, but its split can waste code space, so it does **not** always reach the Huffman optimum; Huffman's construction is the one with the optimality guarantee above.

**Practical use**: Huffman coding is the entropy-coding stage in DEFLATE (gzip, PNG, ZIP), JPEG, and MP3. See [Compression](./Compression.md) for how it is combined with other techniques.

</details>

Huffman coding is not the only way to approach the entropy bound. **Arithmetic coding** encodes the entire message as a single interval in $`[0, 1)` and achieves the entropy bound more closely: the total overhead is less than 2 bits for the whole message, not per symbol. See [Compression](./Compression.md) for details.

## Encodings

Practical character and data encodings come in two families, constrained by two different things:

- A **variable-length, prefix-free code** such as UTF-8 is constrained by the *source distribution*: it assigns shorter codewords to more probable symbols, exactly like Huffman coding.
- A **fixed-length code** such as Base-32 or Base-64 is constrained by the *alphabet size*: every codeword has the same length, so it carries zero redundancy with respect to its own alphabet (the Kraft sum is exactly 1), and the source distribution plays no role in its design.

What all of them share with Huffman codes is the **prefix-free (self-synchronizing) property** from the first section of this page: a decoder scanning left to right can always tell where one codeword ends and the next begins.

- **ASCII** (7 bits) is a fixed-length code over 128 symbols: every character costs the same, so its redundancy equals $`1 - H/7` for the actual text distribution.

- **UTF-8** is a variable-length, prefix-free code over the full Unicode range. Common ASCII characters (which dominate real text) get 1 byte; rarer code points get 2–4 bytes. The leading bits of each byte (`0`, `110`, `1110`, `11110`) signal the length, and continuation bytes start with `10`, so no encoding is a prefix of another and a decoder can resynchronize from any byte boundary.

- **Base-32** (RFC 4648) is a fixed-length code: 5 bits per character over a 32-character alphabet (A–Z, 2–7). The binding constraint is the alphabet, not the distribution: 32 is the largest power of two that fits in a case-insensitive, unambiguous printable alphabet.

- **Base-64** is a fixed-length code: 6 bits per character over a 64-character alphabet (A–Z, a–z, 0–9, +, /). Again the constraint is the alphabet: 64 is the largest power of two that fits in printable ASCII, making it the most compact text-safe binary encoding. Padding with `=` aligns the output to 4-character blocks.

<details><summary>Details</summary>

**The shared principle: prefix-freeness.** For UTF-8, the leading-bit pattern (`0` for 1 byte, `110` for 2, `1110` for 3, `11110` for 4, with continuation bytes `10xxxxxx`) makes the set of encodings prefix-free: no code point's byte sequence is a prefix of another's. A decoder that hits a corrupt or resyncs mid-stream can determine the length of the next code point from the first byte alone, without any external length field — the same greedy first-match decoding as the binary prefix tree in the first section.

**The contrast: fixed-length, zero-redundancy codes.** Base-32 and Base-64 do not exploit any source distribution: every character carries exactly 5 or 6 bits, all $`2^5` or $`2^6` codewords are used, and the Kraft sum is exactly 1. Their redundancy with respect to their own alphabet is zero; the only "loss" is the mapping itself, which inflates the data by $`8/5 = 1.6` (Base-32) or $`8/6 \approx 1.33` (Base-64) plus padding, because 8-bit bytes do not align with 5- or 6-bit groups. They exist to carry binary data through channels that only safely transmit a restricted printable alphabet (email, URLs, JSON), not to compress.

**Where the entropy idea does apply**: UTF-8's expected length on real text is close to 1 byte per character precisely because ASCII-range code points dominate — a skewed distribution exploited by a variable-length code, the same mechanism Huffman formalizes. ASCII, being fixed-length, cannot do this: its 7 bits per character are spent uniformly whether the text is full of `e` or of `z`.

Base-64 in practice: used in MIME email attachments, JWT tokens, and data URIs.

</details>

## Interactive exploration

<iframe src="./Coding-and-Entropy.simulation.html" title="Huffman coding and entropy bound"></iframe>

## Example problem

<details><summary>Quizz</summary>

**Problem**: A source emits 4 symbols with probabilities $`(0.4, 0.3, 0.2, 0.1)`. Compute the entropy, build the Huffman code, compute its expected length, and compare it with the entropy bound.

<details><summary>How to solve</summary>

1. Compute the entropy with $`H = -\sum_i p_i \log_2 p_i`. None of the probabilities is a power of 2, so expect a non-integer value.
2. Run the Huffman algorithm: repeatedly merge the two least-probable nodes. Watch the tie at 0.3 (the merged node and the original 0.3 symbol).
3. Read the codewords off the tree, compute $`L = \sum_i p_i l_i`, and check the Kraft sum.
4. Compare $`L` with $`H`: the gap must satisfy $`0 \leq L - H < 1` (source coding theorem). Here the probabilities are not powers of 2, so the Huffman code cannot reach $`H` exactly — each $`l_i` must be an integer at least as large as $`-\log_2 p_i`.

<details><summary>Solution</summary>

**Entropy**:
$`H = -(0.4 \log_2 0.4 + 0.3 \log_2 0.3 + 0.2 \log_2 0.2 + 0.1 \log_2 0.1)`
$`\approx 0.529 + 0.521 + 0.464 + 0.332 = 1.846` bits/symbol.

**Huffman code**:
- Merge 0.1 + 0.2 → 0.3
- Merge 0.3 (symbol) + 0.3 (merged node) → 0.6
- Merge 0.4 + 0.6 → 1.0
- Codewords: symbol 0.4 → `0` (1 bit), symbol 0.3 → `10` (2 bits), symbol 0.2 → `110` (3 bits), symbol 0.1 → `111` (3 bits).

**Expected length**: $`L = 0.4(1) + 0.3(2) + 0.2(3) + 0.1(3) = 0.4 + 0.6 + 0.6 + 0.3 = 1.9` bits/symbol.

**Gap**: $`L - H = 1.9 - 1.846 = 0.054` bits, which satisfies $`0 < L - H < 1`. Unlike the power-of-2 distribution $`(0.5, 0.25, 0.125, 0.125)`, here the Huffman code does **not** reach the entropy bound exactly: lengths must be integers, so a little code space is necessarily wasted.

**Kraft check**: $`2^{-1} + 2^{-2} + 2^{-3} + 2^{-3} = 0.5 + 0.25 + 0.125 + 0.125 = 1 \leq 1`. ✓ (full tree, no code space wasted).

**Redundancy**: $`R = 1 - H/\log_2 4 = 1 - 1.846/2 \approx 0.077 = 7.7%`.

</details>
</details>
</details>
