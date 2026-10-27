# Information Theory

Information theory studies the mathematical limits of encoding, compression, transmission, and protection of data. It is relevant whenever information must be stored compactly, sent reliably over a noisy channel, or kept secret from an adversary.

## Utility

- It bounds the minimum number of bits needed to represent a source.
- It designs codes that achieve those bounds (compression, error correction).
- It provides the mathematical foundation for cryptography.

<details><summary>Details</summary>

Information theory sits between algorithmics and the physical world: it takes the abstract data produced by an algorithm and asks how many bits are truly needed, how to pack them efficiently, and how to protect them from noise or eavesdroppers. The key insight is that the limits are mathematical (entropy, channel capacity) and are independent of the particular hardware or protocol used to implement them.

</details>

## History

- 1948: Shannon publishes "A Mathematical Theory of Communication," defining entropy and channel capacity.
- 1952: Huffman publishes optimal prefix-free codes.
- 1960s: Reed-Solomon codes and convolutional codes mature for error correction.
- 1976: Diffie and Hellman publish "New Directions in Cryptography," founding public-key cryptography.

## Classes

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./Coding-and-Entropy.md'>Coding and entropy</a></td><td>Alphabets, encodings, entropy measures</td><td>Bits per symbol, entropy, redundancy</td><td>How to represent data compactly; does not model the channel or the adversary</td></tr>
<tr><td><a href='./Compression.md'>Compression</a></td><td>Lossless and lossy codecs</td><td>Compression ratio, distortion, bitrate</td><td>How to reduce the number of bits; does not model the transmission channel</td></tr>
<tr><td><a href='./Communication.md'>Communication</a></td><td>Error-correcting codes, channel models</td><td>Bit error rate, code rate, channel capacity</td><td>How to transmit reliably over a noisy channel; does not model the source or the adversary</td></tr>
<tr><td><a href='./Cryptography.md'>Cryptography</a></td><td>Ciphers, hashes, key exchange</td><td>Key size, advantage, security parameter</td><td>How to protect data from an adversary; does not model the physical channel</td></tr>
</table>

> **Authoritative sources**
> - [A Mathematical Theory of Communication](https://ieeexplore.ieee.org/document/6773024)
> - [Elements of Information Theory (Cover & Thomas)](https://www.nowpublishers.com/article/Details/EIT-001)
