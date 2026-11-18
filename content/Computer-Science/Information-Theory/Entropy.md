# Entropy

Entropy measures the uncertainty in a random source: the average number of bits needed to describe its outcomes. It is relevant whenever you want to know how compressible data is, or how much information a signal carries. See [Coding](./Coding.md) for the codes that approach this bound.

> **Authoritative sources**
> - [A Mathematical Theory of Communication](https://ieeexplore.ieee.org/document/6773024)
> - [Prediction and Entropy of Printed English](https://ieeexplore.ieee.org/document/6773263)
> - [Elements of Information Theory (Cover & Thomas)](https://www.nowpublishers.com/article/Details/EIT-001)

## Information and entropy

The **self-information** of an event $`x` with probability $`p(x)` is $`I(x) = -\log_2 p(x)` bits.

The **entropy** of a discrete random variable $`X` with distribution $`p` is:

```math
H(X) = -\sum_x p(x) \log_2 p(x)
```

Entropy is the average self-information and the lower bound on the expected code length of any lossless prefix-free code.

<details><summary>EXPLANATION</summary>

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

<details><summary>EXPLANATION</summary>

For English text (27-character alphabet, $`H \approx 1.0` bits/char as a midpoint): $`R \approx 1 - 1.0/4.75 \approx 79%`. This means roughly 79% of the 4.75 bits per character are "wasted" because the distribution is far from uniform. Redundancy is what lossless compression exploits: by using a variable-length code, the compressor removes this waste and approaches the entropy bound.

Redundancy is also the quantity that error-correcting codes *introduce* deliberately (see [Communication](./Communication.md)): a small amount of added redundancy makes the code robust to channel noise.

</details>

## Quiz

<details><summary>Problem</summary>

A source emits 3 symbols with probabilities $`(0.5, 0.25, 0.25)`. Compute its entropy $`H` in bits per symbol, and its redundancy relative to a uniform 3-symbol alphabet.

<details><summary>Solution</summary>

$`H = -(0.5 \log_2 0.5 + 0.25 \log_2 0.25 + 0.25 \log_2 0.25) = 0.5 + 0.5 + 0.5 = 1.5` bits/symbol. A uniform 3-symbol alphabet has entropy $`\log_2 3 \approx 1.585` bits, so the redundancy is $`R = 1 - 1.5/1.585 \approx 0.054` (about 5.4% of the code space is wasted by the non-uniform distribution).

</details>
</details>
