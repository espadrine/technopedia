# Cryptography

Cryptography provides mathematical tools to protect data from adversaries: encryption (confidentiality), authentication (integrity), and key exchange (agreement). It is relevant whenever data must be kept secret, verified, or agreed upon between parties who do not share a pre-existing secret.

## How these pieces fit together

Modern cryptography is a tower of constructions: each layer assumes only the one below it. **Randomness** seeds a **PRF/PRG**, which turns a short key into an unlimited-looking keystream; a **block or stream cipher** uses that to encrypt; an **AEAD** wraps the cipher with authentication; a **KDF** derives the keys from a shared secret; and **key exchange** (Diffie–Hellman or a KEM) establishes that shared secret between strangers. **Hybrid encryption** (what TLS does) is simply the whole stack assembled end to end.

<svg viewBox="0 0 720 175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cryptography primitives build on each other: randomness, PRF, ciphers, AEAD, key exchange, KDF, hybrid encryption">
  <defs><marker id="arrTop" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#444"/></marker></defs>
  <g font-family="sans-serif" font-size="12" text-anchor="middle">
    <rect x="10" y="20" width="115" height="44" rx="6" fill="#e8f0fe" stroke="#4a6fa5"/>
    <text x="67" y="38">Randomness</text><text x="67" y="54">(seed, CSPRNG)</text>
    <line x1="125" y1="42" x2="163" y2="42" stroke="#444" marker-end="url(#arrTop)"/>
    <rect x="168" y="20" width="110" height="44" rx="6" fill="#e8f0fe" stroke="#4a6fa5"/>
    <text x="223" y="38">PRF / PRG</text><text x="223" y="54">(keystream)</text>
    <line x1="278" y1="42" x2="316" y2="42" stroke="#444" marker-end="url(#arrTop)"/>
    <rect x="321" y="20" width="135" height="44" rx="6" fill="#e8f0fe" stroke="#4a6fa5"/>
    <text x="388" y="38">Block / stream</text><text x="388" y="54">cipher + mode</text>
    <line x1="456" y1="42" x2="494" y2="42" stroke="#444" marker-end="url(#arrTop)"/>
    <rect x="499" y="20" width="105" height="44" rx="6" fill="#e8f0fe" stroke="#4a6fa5"/>
    <text x="551" y="38">AEAD</text><text x="551" y="54">(conf + auth)</text>
    <line x1="604" y1="42" x2="642" y2="42" stroke="#444" marker-end="url(#arrTop)"/>
    <rect x="647" y="20" width="65" height="44" rx="6" fill="#e8f0fe" stroke="#4a6fa5"/>
    <text x="679" y="46">Hybrid</text>
    <rect x="321" y="115" width="135" height="44" rx="6" fill="#fdeaea" stroke="#a54a4a"/>
    <text x="388" y="133">Key exchange</text><text x="388" y="149">(DH, KEM)</text>
    <line x1="456" y1="137" x2="494" y2="137" stroke="#444" marker-end="url(#arrTop)"/>
    <rect x="499" y="115" width="105" height="44" rx="6" fill="#fdeaea" stroke="#a54a4a"/>
    <text x="551" y="133">KDF</text><text x="551" y="149">(HKDF, PBKDF2)</text>
    <line x1="551" y1="115" x2="551" y2="69" stroke="#444" marker-end="url(#arrTop)"/>
    <text x="360" y="95" font-size="11" fill="#666">keys flow up into the ciphers</text>
  </g>
</svg>

**Security parameter.** Modern cryptography is parameterized by a security level $`\lambda` (e.g., $`\lambda = 128` bits). A scheme is secure if no adversary running in time $`2^{\lambda}` can break it with non-negligible probability. Key sizes map to security levels (NIST SP 800-57): AES-128 → 128-bit classical / 64-bit quantum (Grover's algorithm quadratically speeds up brute force, halving the exponent), AES-256 → 256-bit classical / 128-bit quantum, RSA-2048 → 112-bit, RSA-3072 → 128-bit, EC-256 → 128-bit.

> **Authoritative sources**
> - [New Directions in Cryptography (Diffie & Hellman, 1976)](https://ieeexplore.ieee.org/document/1654161)
> - [The Design of Rijndael: AES (Daemen & Rijmen)](https://www.aes-std.com/)
> - [NIST SP 800-57 Part 1 Rev 5: Recommendation for Key Management](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf)
> - [NIST SP 800-38A: Recommendation for Block Cipher Modes of Operation](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38a.pdf)
> - [RFC 2898: PBKDF2](https://datatracker.ietf.org/doc/html/rfc2898)
> - [FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM)](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf)

## Randomness

A **PRNG** (Pseudo-Random Number Generator) is a deterministic function $`f: \{0,1\}^s \to \{0,1\}^*` that, given a secret seed (state) $`s`, produces a sequence indistinguishable from uniform to any efficient observer. The **state** is the internal memory; the **cycle** is the period before the sequence repeats. A **random oracle** is an idealized function that returns a uniform random value for each new input and is consistent on repeated inputs.

<details><summary>Details</summary>

**Step 1 — The global picture.** A PRNG is a state machine: seed the state once, then each call updates the state and emits a function of it. *Security* means next-output unpredictability: an adversary who has seen any number of outputs must be unable to predict the next one. This divides PRNGs into two families: **statistical PRNGs** (LCG, Mersenne Twister), which look uniform but are predictable, and **CSPRNGs** (ChaCha20, AES-CTR-DRBG), which are unpredictable because recovering the state from the outputs is computationally infeasible.

**Step 2 — A concrete example.** Take an LCG with $`a = 7`, $`c = 0`, $`m = 13`, seed $`s_0 = 1`. The outputs are 7, 10, 5, 9, 11, 12, 6, 3, 8, 4, 2, then back to 1: the cycle has length 12. Knowing the parameters and a single output, an attacker computes every past and future value with simple arithmetic — the sequence only *looks* random. A CSPRNG with a 256-bit state behaves the same way internally, but the state update is a cryptographic function, so recovering the state from outputs costs about $`2^{256}` operations.

<svg viewBox="0 0 560 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PRNG as a state machine: state, update function, output">
  <defs><marker id="arrRng" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#444"/></marker></defs>
  <g font-family="sans-serif" font-size="13" text-anchor="middle">
    <rect x="30" y="40" width="110" height="40" rx="6" fill="#e8f0fe" stroke="#4a6fa5"/><text x="85" y="65">state s_t</text>
    <line x1="140" y1="60" x2="200" y2="60" stroke="#444" marker-end="url(#arrRng)"/>
    <rect x="205" y="40" width="150" height="40" rx="6" fill="#fdeaea" stroke="#a54a4a"/><text x="280" y="65">update: s_{t+1} = g(s_t)</text>
    <path d="M280,40 L280,15 L85,15 L85,35" fill="none" stroke="#444" marker-end="url(#arrRng)"/>
    <line x1="355" y1="60" x2="415" y2="60" stroke="#444" marker-end="url(#arrRng)"/>
    <rect x="420" y="40" width="110" height="40" rx="6" fill="#d8f3dc" stroke="#2d6a4f"/><text x="475" y="65">output r_t</text>
    <text x="280" y="108" font-size="11" fill="#666">same state, same outputs: the seed is everything</text>
  </g>
</svg>

**Step 3 — Authoritative sources.** The standard for random bit generation is [NIST SP 800-90A: Recommendation for Random Bit Generation](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90Ar1.pdf).

**Step 4 — Example problem.**

<details><summary>Example problem: why an LCG must never guard a secret</summary>

A lottery site draws numbers with an LCG $`s_{t+1} = (a s_t + c) \bmod m` where $`m = 2^{31}`, $`a = 1103515245`, $`c = 12345`, and publishes each draw. An attacker sees two consecutive outputs. Explain how they predict all future draws.

<details><summary>Solution</summary>

The current state *is* the last output. Solve for it: $`s_t = a^{-1}(s_{t+1} - c) \bmod m`. Since $`a` is odd, it is invertible modulo $`2^{31}` (odd numbers share no factor with $`2^{31}`), so the inverse exists and is computable with the extended Euclidean algorithm. With $`s_t` recovered, the attacker replays the recurrence forward and knows every future draw before it happens. The fix is a CSPRNG, where the state update is a one-way function of the state (see the one-way functions in the [Asymmetric cryptography](#asymmetric-cryptography) section).

</details>
</details>

</details>

## Block and stream ciphers

A **one-time pad** (OTP) encrypts $`m` with a uniform random key $`k` of the same length: $`c = m \oplus k`. It is information-theoretically secure (Shannon, 1949) but requires a key as long as the message. The security rests on the entropy of the key: if $`H(k) = |m|` bits, the ciphertext is independent of the plaintext (see [Coding and entropy](./Coding-and-Entropy.md) for the entropy definitions). The OTP is the only cipher with unconditional security; all practical ciphers rely on computational assumptions.

A **PRF** (Pseudo-Random Function) $`F_k: \{0,1\}^* \to \{0,1\}^n` is a keyed function indistinguishable from a uniform random function to any efficient adversary. A **PRP** (Pseudo-Random Permutation) is a keyed bijection indistinguishable from a uniform random permutation.

**Stream cipher**: encrypts a keystream (from a PRF) XORed with the plaintext. **CTR mode** turns a block cipher into a stream cipher: $`c_i = m_i \oplus E_k(\text{nonce} \| i)`. The **nonce** must be unique per message (reusing a nonce with the same key breaks security).

**Block cipher modes**:
- **ECB** (Electronic Codebook): encrypt each block independently. Insecure: identical plaintext blocks produce identical ciphertext blocks.
- **CBC** (Cipher Block Chaining): $`c_i = E_k(m_i \oplus c_{i-1})` with $`c_0 = \text{IV}`. The **IV** (initialization vector) must be random and unique.

**IND-CPA** (Indistinguishability under Chosen-Plaintext Attack): the adversary chooses two messages and receives the encryption of one; it must not distinguish which. CBC and CTR achieve IND-CPA.

**IND-CCA** (Indistinguishability under Chosen-Ciphertext Attack): the adversary can also query a decryption oracle. Requires an **AEAD** (Authenticated Encryption with Associated Data) scheme — see [Authentication and hashing](#authentication-and-hashing) below.

<details><summary>Details</summary>

**Step 1 — The global picture.** Practical ciphers are built by climbing from the OTP: a **PRG** (PRF on a counter) stretches a short seed into a long keystream, giving a **stream cipher**; a **PRP** on fixed-size blocks gives a **block cipher**, and **modes of operation** chain the blocks. The security ladder goes: OTP (unconditional) → IND-CPA (safe against eavesdroppers) → IND-CCA (safe against active tampering, needs authentication).

**Step 2 — A concrete example: ECB leaks patterns.** Encrypt the two-block message $`m_1 = m_2`. ECB applies $`E_k` to each block independently, so $`c_1 = c_2`: the repetition in the plaintext is copied to the ciphertext. CBC mixes each block with the previous ciphertext (or the IV) before encrypting, so identical plaintext blocks produce different ciphertext blocks. CTR encrypts a counter to make a keystream, so no plaintext block ever meets $`E_k` directly.

<svg viewBox="0 0 640 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ECB mode: identical plaintext blocks give identical ciphertext blocks">
  <defs><marker id="arrEcb" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#444"/></marker></defs>
  <g font-family="sans-serif" font-size="13" text-anchor="middle">
    <rect x="20" y="20" width="80" height="28" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="60" y="39">m₁</text>
    <line x1="100" y1="34" x2="150" y2="34" stroke="#444" marker-end="url(#arrEcb)"/>
    <rect x="155" y="18" width="70" height="32" rx="4" fill="#dbe7f3" stroke="#1d3557"/><text x="190" y="39">E_k</text>
    <line x1="225" y1="34" x2="275" y2="34" stroke="#444" marker-end="url(#arrEcb)"/>
    <rect x="280" y="20" width="80" height="28" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="320" y="39">c₁</text>
    <rect x="20" y="70" width="80" height="28" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="60" y="89">m₂ = m₁</text>
    <line x1="100" y1="84" x2="150" y2="84" stroke="#444" marker-end="url(#arrEcb)"/>
    <rect x="155" y="68" width="70" height="32" rx="4" fill="#dbe7f3" stroke="#1d3557"/><text x="190" y="89">E_k</text>
    <line x1="225" y1="84" x2="275" y2="84" stroke="#444" marker-end="url(#arrEcb)"/>
    <rect x="280" y="70" width="80" height="28" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="320" y="89">c₂ = c₁</text>
    <text x="480" y="55" font-size="12" fill="#a4262c">pattern leaks: c₁ = c₂</text>
    <text x="480" y="75" font-size="11" fill="#666">each block encrypted alone</text>
  </g>
</svg>

<svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CBC mode: each block is XORed with the previous ciphertext before encryption">
  <defs><marker id="arrCbc" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#444"/></marker></defs>
  <g font-family="sans-serif" font-size="13" text-anchor="middle">
    <rect x="20" y="20" width="60" height="28" rx="4" fill="#e5dbff" stroke="#3d348b"/><text x="50" y="39">IV</text>
    <line x1="80" y1="34" x2="118" y2="34" stroke="#444" marker-end="url(#arrCbc)"/>
    <circle cx="132" cy="34" r="14" fill="#fff" stroke="#3d348b"/><text x="132" y="39">⊕</text>
    <rect x="170" y="20" width="60" height="28" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="200" y="39">m₁</text>
    <line x1="170" y1="34" x2="150" y2="34" stroke="#444" marker-end="url(#arrCbc)"/>
    <rect x="230" y="18" width="70" height="32" rx="4" fill="#dbe7f3" stroke="#1d3557"/><text x="265" y="39">E_k</text>
    <line x1="216" y1="34" x2="226" y2="34" stroke="#444" marker-end="url(#arrCbc)"/>
    <line x1="300" y1="34" x2="350" y2="34" stroke="#444" marker-end="url(#arrCbc)"/>
    <rect x="355" y="20" width="60" height="28" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="385" y="39">c₁</text>
    <circle cx="132" cy="94" r="14" fill="#fff" stroke="#3d348b"/><text x="132" y="99">⊕</text>
    <rect x="170" y="80" width="60" height="28" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="200" y="99">m₂</text>
    <line x1="170" y1="94" x2="150" y2="94" stroke="#444" marker-end="url(#arrCbc)"/>
    <rect x="230" y="78" width="70" height="32" rx="4" fill="#dbe7f3" stroke="#1d3557"/><text x="265" y="99">E_k</text>
    <line x1="216" y1="94" x2="226" y2="94" stroke="#444" marker-end="url(#arrCbc)"/>
    <line x1="300" y1="94" x2="350" y2="94" stroke="#444" marker-end="url(#arrCbc)"/>
    <rect x="355" y="80" width="60" height="28" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="385" y="99">c₂</text>
    <path d="M385,48 L385,66 L132,66 L132,76" fill="none" stroke="#a4262c" marker-end="url(#arrCbc)"/>
    <text x="500" y="60" font-size="12" fill="#666">chaining hides patterns:</text>
    <text x="500" y="80" font-size="12" fill="#666">c₁ feeds into block 2</text>
  </g>
</svg>

<svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CTR mode: the block cipher encrypts counters to make a keystream, XORed with the plaintext">
  <defs><marker id="arrCtr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#444"/></marker></defs>
  <g font-family="sans-serif" font-size="13" text-anchor="middle">
    <rect x="20" y="20" width="90" height="28" rx="4" fill="#e5dbff" stroke="#3d348b"/><text x="65" y="39">nonce‖1</text>
    <line x1="110" y1="34" x2="150" y2="34" stroke="#444" marker-end="url(#arrCtr)"/>
    <rect x="155" y="18" width="70" height="32" rx="4" fill="#dbe7f3" stroke="#1d3557"/><text x="190" y="39">E_k</text>
    <line x1="225" y1="34" x2="265" y2="34" stroke="#444" marker-end="url(#arrCtr)"/>
    <circle cx="280" cy="34" r="14" fill="#fff" stroke="#3d348b"/><text x="280" y="39">⊕</text>
    <rect x="320" y="20" width="60" height="28" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="350" y="39">m₁</text>
    <line x1="320" y1="34" x2="298" y2="34" stroke="#444" marker-end="url(#arrCtr)"/>
    <line x1="294" y1="34" x2="410" y2="34" stroke="#444" marker-end="url(#arrCtr)"/>
    <rect x="415" y="20" width="60" height="28" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="445" y="39">c₁</text>
    <rect x="20" y="80" width="90" height="28" rx="4" fill="#e5dbff" stroke="#3d348b"/><text x="65" y="99">nonce‖2</text>
    <line x1="110" y1="94" x2="150" y2="94" stroke="#444" marker-end="url(#arrCtr)"/>
    <rect x="155" y="78" width="70" height="32" rx="4" fill="#dbe7f3" stroke="#1d3557"/><text x="190" y="99">E_k</text>
    <line x1="225" y1="94" x2="265" y2="94" stroke="#444" marker-end="url(#arrCtr)"/>
    <circle cx="280" cy="94" r="14" fill="#fff" stroke="#3d348b"/><text x="280" y="99">⊕</text>
    <rect x="320" y="80" width="60" height="28" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="350" y="99">m₂</text>
    <line x1="320" y1="94" x2="298" y2="94" stroke="#444" marker-end="url(#arrCtr)"/>
    <line x1="294" y1="94" x2="410" y2="94" stroke="#444" marker-end="url(#arrCtr)"/>
    <rect x="415" y="80" width="60" height="28" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="445" y="99">c₂</text>
    <text x="540" y="60" font-size="12" fill="#666">parallelizable:</text>
    <text x="540" y="80" font-size="12" fill="#666">blocks are independent</text>
  </g>
</svg>

You can reproduce all three modes interactively in the [Interactive exploration](#interactive-exploration) section at the end of this page.

**Step 3 — Building a block cipher: the Feistel network.** A Feistel round splits the block into halves $`L, R` and computes $`L_{i+1} = R_i`, $`R_{i+1} = L_i \oplus F_k(R_i)`. The magic: because only the $`F` output is XORed, the round is invertible *even if $`F` is not* — decryption runs the same rounds with reversed key order. Luby–Rackoff (1986) proved that 3 rounds turn a PRF into a PRP (IND-CPA secure) and 4 rounds into a *strong* PRP (IND-CCA secure).

<svg viewBox="0 0 620 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One Feistel round: L and R halves, round function F_k, XOR, then swap">
  <defs><marker id="arrFei" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#444"/></marker></defs>
  <g font-family="sans-serif" font-size="13" text-anchor="middle">
    <rect x="20" y="25" width="70" height="30" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="55" y="45">L_i</text>
    <rect x="20" y="95" width="70" height="30" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="55" y="115">R_i</text>
    <line x1="90" y1="110" x2="150" y2="110" stroke="#444" marker-end="url(#arrFei)"/>
    <rect x="155" y="95" width="80" height="30" rx="4" fill="#dbe7f3" stroke="#1d3557"/><text x="195" y="115">F_k</text>
    <line x1="235" y1="110" x2="285" y2="110" stroke="#444" marker-end="url(#arrFei)"/>
    <circle cx="300" cy="70" r="15" fill="#fff" stroke="#3d348b"/><text x="300" y="75">⊕</text>
    <path d="M262,110 L300,110 L300,89" fill="none" stroke="#444" marker-end="url(#arrFei)"/>
    <path d="M90,40 L300,40 L300,51" fill="none" stroke="#444" marker-end="url(#arrFei)"/>
    <rect x="420" y="25" width="90" height="30" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="465" y="45">L_{i+1} = R_i</text>
    <rect x="420" y="85" width="90" height="30" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="465" y="105">R_{i+1}</text>
    <line x1="315" y1="70" x2="416" y2="98" stroke="#444" marker-end="url(#arrFei)"/>
    <path d="M55,55 L55,91" fill="none" stroke="#a4262c" marker-end="url(#arrFei)"/>
    <text x="30" y="78" font-size="11" fill="#a4262c">swap</text>
    <text x="530" y="70" font-size="11" fill="#666">invertible even if</text>
    <text x="530" y="86" font-size="11" fill="#666">F_k is not</text>
  </g>
</svg>

**Step 4 — AES and cryptanalysis.** **AES** (Rijndael): 128-bit block, 128/192/256-bit key, 10/12/14 rounds. Each round: SubBytes (S-box), ShiftRows, MixColumns, AddRoundKey. The S-box is a nonlinear permutation over $`\mathbb{F}_{2^8}` (the finite field with 256 elements, built over $`\mathbb{F}_2`). AES implements Shannon's two principles: **diffusion** spreads the influence of one plaintext bit across many ciphertext bits; **confusion** makes the key–ciphertext relationship complex. The two generic attacks on such designs are **linear cryptanalysis** (Matsui, 1993: find linear approximations holding with probability away from 1/2, recover key bits) and **differential cryptanalysis** (Biham & Shamir, 1990: find input differences predicting output differences, recover key bits). AES's round count is chosen so both attacks cost more than brute force.

**Step 5 — Authoritative sources.** The modes above are specified in [NIST SP 800-38A](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38a.pdf), and AES in [FIPS 197](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf); the Feistel result is [Luby & Rackoff, "How to Construct Pseudorandom Permutations from Pseudorandom Functions" (1988)](https://epubs.siam.org/doi/10.1137/0218058).

**Step 6 — Example problem.**

<details><summary>Example problem: nonce reuse in CTR mode</summary>

An encryptor reuses the same nonce for two messages $`m` and $`m'` under the same CTR key. Show what an eavesdropper learns, and why this reduces the scheme to a two-time pad.

<details><summary>Solution</summary>

CTR computes $`c = m \oplus E_k(\text{nonce} \| i)` and $`c' = m' \oplus E_k(\text{nonce} \| i)` — the *same* keystream for both. XORing the ciphertexts cancels the keystream: $`c \oplus c' = m \oplus m'`. The eavesdropper now holds the XOR of two plaintexts, exactly the situation of a two-time pad: if $`m` has known structure (headers, padding, natural language), $`m'` can often be recovered by crib-dragging. Uniqueness of the nonce per key is therefore a hard requirement, not a recommendation.

</details>
</details>

</details>

## Authentication and hashing

A **hash** $`H: \{0,1\}^* \to \{0,1\}^n` is collision-resistant and preimage-resistant: it fingerprints data without any key. A **MAC** (Message Authentication Code) $`\text{MAC}_k(m)` is a keyed hash: only holders of $`k` can produce a valid tag, so a valid tag authenticates both the message and its origin. An **AEAD** (Authenticated Encryption with Associated Data, e.g., AES-GCM, ChaCha20-Poly1305) combines encryption and authentication in one primitive, achieving IND-CCA security.

<details><summary>Details</summary>

**Step 1 — The global picture.** Three tools, three questions: *has this data changed?* (hash), *did someone with the key vouch for this data?* (MAC), *is this ciphertext both secret and vouched for?* (AEAD). When composing encryption and a MAC by hand, order matters: **EtM** (Encrypt-then-MAC) is the only composition provably secure in general (given a CPA-secure encryption and a secure MAC; Bellare & Namprempre, 2000). **MtE** (MAC-then-Encrypt) and **E&M** (Encrypt-and-MAC) are not provably secure in general — MtE's flaws led to real padding-oracle attacks (e.g., Lucky 13 on TLS).

**Step 2 — A concrete example.** To authenticate $`m` with HMAC: compute $`\text{HMAC}_k(m) = H((k \oplus \text{opad}) \| H((k \oplus \text{ipad}) \| m))` — the two pads make the construction a secure MAC even though plain $`H(k \| m)` is not. To encrypt *and* authenticate with **GCM**: run CTR mode for confidentiality, then compute a Galois-field MAC (GHASH) over the ciphertext and associated data; the tag covers both, so headers can be authenticated without being encrypted.

**Step 3 — The sponge construction.** **SHA-3** (Keccak) is built as a **sponge**: a permutation $`\pi` on $`b` bits; absorb the message into the state block by block, then squeeze out the output. The **rate** is the part of the state touched per block; the **capacity** is the untouched part. Security: preimage resistance up to $`\text{capacity}/2` bits, and collision resistance up to $`\min(\text{output\_length}/2,\; \text{capacity}/2)` bits. For example, SHAKE128 has rate 1344 and capacity 256, giving 128 bits of preimage security ($`256/2`), independent of the large rate.

<svg viewBox="0 0 620 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sponge construction: absorb phase then squeeze phase over rate and capacity">
  <defs><marker id="arrSpg" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#444"/></marker></defs>
  <g font-family="sans-serif" font-size="12" text-anchor="middle">
    <rect x="200" y="30" width="120" height="110" rx="6" fill="#e8f0fe" stroke="#4a6fa5"/>
    <rect x="200" y="30" width="120" height="45" fill="#d8f3dc" stroke="#2d6a4f"/>
    <text x="260" y="57">rate r</text>
    <text x="260" y="115">capacity c</text>
    <rect x="40" y="40" width="70" height="26" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="75" y="58">m₁</text>
    <rect x="40" y="75" width="70" height="26" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="75" y="93">m₂</text>
    <rect x="40" y="110" width="70" height="26" rx="4" fill="#f8d7da" stroke="#7b2d26"/><text x="75" y="128">…</text>
    <line x1="110" y1="53" x2="196" y2="53" stroke="#444" marker-end="url(#arrSpg)"/>
    <line x1="110" y1="88" x2="196" y2="88" stroke="#444" marker-end="url(#arrSpg)"/>
    <line x1="110" y1="123" x2="196" y2="123" stroke="#444" marker-end="url(#arrSpg)"/>
    <text x="150" y="25" font-size="11" fill="#666">absorb: XOR in, then π</text>
    <line x1="320" y1="53" x2="420" y2="53" stroke="#444" marker-end="url(#arrSpg)"/>
    <rect x="425" y="40" width="70" height="26" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="460" y="58">z₁</text>
    <line x1="320" y1="88" x2="420" y2="88" stroke="#444" marker-end="url(#arrSpg)"/>
    <rect x="425" y="75" width="70" height="26" rx="4" fill="#d8f3dc" stroke="#2d6a4f"/><text x="460" y="93">z₂</text>
    <text x="470" y="130" font-size="11" fill="#666">squeeze: read r, then π</text>
    <text x="260" y="160" font-size="11" fill="#666">security: preimage ≤ c/2 bits, collision ≤ min(output/2, c/2) bits</text>
  </g>
</svg>

**Step 4 — Modern AEAD properties.** **Key-committing AEAD**: the ciphertext commits to the key (no different key decrypts it to the same plaintext) — important when the decrypted plaintext is fed to another key-dependent component. **Misuse-resistant AEAD** (e.g., SIV mode): remains secure even if the nonce is accidentally reused, at the cost of two passes over the data.

**Step 5 — Authoritative sources.** [FIPS 202: SHA-3 Standard](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf), [RFC 8439: ChaCha20-Poly1305](https://datatracker.ietf.org/doc/html/rfc8439), and [Bellare & Namprempre, "Authenticated Encryption" (2000)](https://eprint.iacr.org/2000/025).

**Step 6 — Example problem.**

<details><summary>Example problem: choosing the composition order</summary>

A protocol must encrypt a message and authenticate it with a MAC, using a separate CPA-secure cipher and a secure MAC. Compare EtM and MtE: which order lets the receiver reject forged ciphertexts *before* decrypting, and why does the other order invite attacks?

<details><summary>Solution</summary>

In **EtM**, the tag is computed over the ciphertext and sent alongside it; the receiver verifies the tag first and only decrypts if it is valid. Forged or tampered ciphertexts never reach the decryption code, so decryption oracles are unavailable to the attacker — this is what IND-CCA security requires. In **MtE**, the receiver must decrypt before it can check the tag, so malformed ciphertexts reach the decryption code; if decryption behaves differently for different padding errors (timing, error messages), the attacker gets a **padding oracle** that leaks plaintext information — the Lucky 13 attack on TLS 1.2's CBC suites worked exactly this way.

</details>
</details>

</details>

## Key generation and derivation

A **KDF** (Key Derivation Function) $`\text{KDF}(\text{input}, \text{salt}, \text{info}) \to \text{key}` derives a fixed-length key from arbitrary input. **PBKDF2** (RFC 2898) iterates a PRF (HMAC) $`c` times per block:

```math
U_1^{(i)} = \text{PRF}(P,\; S \,\|\, \text{INT}_{32\text{\_BE}}(i))
U_j^{(i)} = \text{PRF}(P,\; U_{j-1}^{(i)}) \quad \text{for } j = 2, \ldots, c
T_i = U_1^{(i)} \oplus U_2^{(i)} \oplus \cdots \oplus U_c^{(i)}
\text{DK} = T_1 \,\|\, T_2 \,\|\, \cdots \quad (\text{truncated to } dkLen)
```

**Key stretching** (bcrypt, scrypt, Argon2) adds memory and CPU cost to make brute-force attacks expensive. **Salt** is a random per-password value that prevents rainbow table attacks. **Key separation** uses domain-specific labels (e.g., `"encryption"`, `"authentication"`) to derive distinct keys from a master key.

KDFs bridge the symmetric and asymmetric worlds: in TLS 1.3, HKDF derives session keys from the shared secret produced by an asymmetric key exchange (ECDHE or ML-KEM). In hybrid encryption, a KEM produces a shared secret that a KDF then expands into encryption and authentication keys (see [Networks](../Distributed-Systems/Networks.md) for the full TLS protocol).

<details><summary>Details</summary>

**Step 1 — The global picture.** A KDF solves two different problems depending on the input. If the input is *high-entropy but non-uniform* (a Diffie–Hellman shared secret), use an **extract-then-expand** KDF like HKDF: extract a uniform pseudorandom key, then expand it into as many labeled keys as needed. If the input is *low-entropy* (a human password), no construction can create entropy — instead, a **PBKDF** makes each guess expensive, so the attacker's offline search is slowed.

**Step 2 — A concrete example.** Storing a password: pick a random 128-bit salt $`S`, run PBKDF2-HMAC-SHA256 with $`c = 600{,}000` iterations, store $`(S, \text{DK})`. A legitimate login costs one run (milliseconds); an attacker with the stolen database must run 600,000 HMACs *per guessed password*, per user (because of the salt). **Key separation** then splits the result: from a master key $`K`, derive $`K_{enc} = \text{KDF}(K, \text{"enc"})` and $`K_{mac} = \text{KDF}(K, \text{"mac"})`, so a leak in one context cannot compromise the other.

**Step 3 — The main constructions.** **bcrypt**: Blowfish-based, $`2^w` iterations (work factor $`w`), 60-character output, slow by design. **scrypt**: memory-hard; requires $`N` blocks of $`128 \cdot r` bytes, resisting GPU/ASIC attacks. **Argon2**: winner of the Password Hashing Competition (2015); variants Argon2i (side-channel resistant), Argon2d (data-dependent), Argon2id (hybrid); parameters: memory cost $`m`, iterations $`t`, parallelism $`p`. **HKDF** (RFC 5869): extract $`\text{PRK} = \text{HMAC}(\text{salt}, \text{IKM})`, then expand $`OKM_i = \text{HMAC}(\text{PRK}, \text{OKM}_{i-1} \| \text{info} \| i)`; used in TLS 1.3, SSH, and IPsec.

**Step 4 — Authoritative sources.** [RFC 2898: PBKDF2](https://datatracker.ietf.org/doc/html/rfc2898) and [RFC 5869: HKDF](https://datatracker.ietf.org/doc/html/rfc5869).

**Step 5 — Example problem.**

<details><summary>Example problem: why the salt is stored in the clear</summary>

A password database stores $`(\text{salt}, \text{PBKDF2}(\text{password}, \text{salt}, c))` with the salt visible to anyone who steals the database. Since the salt is not secret, does it provide any security? What exactly does it prevent?

<details><summary>Solution</summary>

The salt is not meant to be secret; it prevents *amortized* attacks. Without salts, an attacker precomputes a rainbow table of $`\text{PBKDF2}(\text{password})` for common passwords once and reuses it against every database forever. With a per-user random salt, the table would have to be rebuilt for each user of each database, multiplying the attacker's work by the number of salts. Salts also prevent detecting identical passwords across users (the stored hashes differ). What the salt does *not* do is slow down a single targeted guess — that is the job of the iteration count (key stretching).

</details>
</details>

</details>

Now that we have a way to derive keys, the remaining question is how to establish the initial shared secret in the first place, when the two parties share no pre-existing key.

## Asymmetric cryptography

**One-way functions and trapdoors.** A **one-way function** $`f` is easy to compute but hard to invert: given $`y = f(x)`, no efficient algorithm recovers $`x`. A **trapdoor one-way function** has a secret key $`s` that makes inversion easy: $`f_s(x)` is hard to invert without $`s`, but easy with $`s`. Public-key cryptography is built on trapdoor one-way functions: the public key defines $`f_s`, the private key is the trapdoor $`s`. RSA uses the trapdoor of factoring; ECC uses the trapdoor of the discrete log on elliptic curves.

**Diffie–Hellman key exchange**: Alice picks $`a`, sends $`g^a \bmod p`; Bob picks $`b`, sends $`g^b \bmod p`. Both compute $`g^{ab} \bmod p`. Security relies on the hardness of the discrete log problem.

**Public-key encryption and key exchange** (RSA, ElGamal, ECDH): encrypt with the public key, decrypt with the private key. RSA: $`c = m^e \bmod n`, $`m = c^d \bmod n` where $`ed \equiv 1 \bmod \varphi(n)`. ECDH is a key *exchange* protocol (not an encryption scheme): both parties derive a shared secret from their public keys.

**Digital signatures** (RSA, ECDSA, EdDSA): sign with the private key, verify with the public key. Provides authentication and non-repudiation.

**KEM** (Key Encapsulation Mechanism): generates a random key and an encapsulation (ciphertext) that allows the recipient to recover the key. KEMs are asymmetric primitives used in hybrid encryption (e.g., ML-KEM in TLS 1.3). The sender encapsulates a key; the recipient decapsulates it using their private key.

<details><summary>Details</summary>

**Step 1 — The global picture.** Symmetric cryptography assumes a shared key; asymmetric cryptography removes that assumption using computational asymmetry: operations that are easy in one direction and hard in the other. Three primitives follow: **key exchange** (build a shared secret over a public channel), **public-key encryption** (anyone can encrypt to you), and **signatures** (only you can vouch for data). All three rest on one-way or trapdoor functions.

**Step 2 — A concrete example: toy RSA.** Take $`p = 3`, $`q = 11`, so $`n = 33` and $`\varphi(n) = 20`. Pick $`e = 3` (coprime to 20); then $`d = e^{-1} \bmod 20 = 7` (since $`3 \times 7 = 21 \equiv 1`). To encrypt $`m = 4`: $`c = 4^3 \bmod 33 = 64 \bmod 33 = 31`. To decrypt: $`31^7 \bmod 33 = 4`. Anyone can encrypt with $`(n, e) = (33, 3)`; only the holder of $`d = 7` can invert — and with real 2048-bit primes, recovering $`d` from $`(n, e)` requires factoring $`n`, which is infeasible. You can watch the same structure interactively with the Diffie–Hellman tab of the [Interactive exploration](#interactive-exploration) section.

**Step 3 — Signature schemes.** **ECDSA** operates on points of an elliptic curve $`E: y^2 = x^3 + ax + b \bmod p`; signatures are $`(r, s)` pairs; it is more efficient than RSA for the same security level (256-bit EC ≈ 3072-bit RSA). **EdDSA** uses Edwards curves ($`x^2 + y^2 = 1 + dt^2`); simpler implementation, constant-time, resistant to side-channel attacks; used in SSH, TLS 1.3, and Bitcoin (via Schnorr).

**Step 4 — Hybrid encryption.** TLS 1.3 uses an asymmetric KEM (or ECDHE) to establish a shared secret, then a symmetric AEAD for bulk data — the efficiency of symmetric crypto with the convenience of public keys. See [Networks](../Distributed-Systems/Networks.md) for the full TLS handshake.

### Post-quantum cryptography

Shor's algorithm (1994) solves integer factoring and discrete log in polynomial time on a quantum computer, breaking RSA and ECC. NIST finalized three post-quantum standards in August 2024:

- **FIPS 203 (ML-KEM)**: lattice-based KEM (Module-Lattice Key Encapsulation, formerly CRYSTALS-Kyber). Replaces ECDHE for key exchange.
- **FIPS 204 (ML-DSA)**: lattice-based digital signatures (Module-Lattice Digital Signature Algorithm, formerly CRYSTALS-Dilithium). Replaces RSA/ECDSA signatures.
- **FIPS 205 (SLH-DSA)**: hash-based signatures (SPHINCS+). Stateless, security reduces to hash collision resistance.

Lattice-based schemes rely on the hardness of the Learning With Errors (LWE) problem; hash-based schemes rely only on the security of a hash function. FALCON (FN-DSA, FIPS 206) is a lattice-based signature scheme still in development and was not in the first finalized batch.

**Step 5 — Authoritative sources.** [RSA: "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems" (1978)](https://dl.acm.org/doi/10.1145/359340.359342) and [FIPS 186-5: Digital Signature Standard](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf).

**Step 6 — Example problem.**

<details><summary>Example problem: why eavesdroppers cannot follow a Diffie–Hellman exchange</summary>

Alice sends $`g^a \bmod p` and Bob sends $`g^b \bmod p` over a public channel; an eavesdropper sees both, plus $`g` and $`p`. Explain why the eavesdropper cannot compute the shared secret $`g^{ab} \bmod p`, and what would happen if they could take discrete logarithms.

<details><summary>Solution</summary>

To get $`g^{ab}` from $`g^a` and $`g^b`, the eavesdropper would need to combine the two exponents without knowing either one. The best known generic route is to solve the **discrete logarithm** problem — recover $`a` from $`g^a \bmod p` — after which computing $`(g^b)^a` is trivial. For large prime $`p` (2048-bit and up) or elliptic-curve groups, discrete log is believed to require about $`2^{\lambda}` operations for a $`\lambda`-bit security level, so the eavesdropper is stuck with the **Computational Diffie–Hellman** problem. If they *could* take discrete logarithms (e.g., with Shor's algorithm on a large quantum computer), they would recover $`a`, then $`g^{ab}`, and the entire exchange would collapse — which is exactly why post-quantum KEMs like ML-KEM are being deployed.

</details>
</details>

</details>

## Zero-knowledge proofs and commitment schemes

A **commitment scheme** lets a party commit to a value (publish a commitment) and later reveal it, without being able to change it. It must be **binding** (the commitment determines the value) and **hiding** (the commitment reveals nothing about the value). A simple construction: commit to $`m` by publishing $`H(r \| m)` for a random nonce $`r` — hiding comes from $`r`, binding from collision resistance.

A **zero-knowledge proof** (ZKP) lets a prover convince a verifier that a statement is true without revealing any information beyond its truth. It must satisfy **completeness** (an honest prover convinces the verifier), **soundness** (a cheating prover cannot convince the verifier of a false statement), and **zero-knowledge** (the verifier learns nothing else). These primitives underpin blockchain (e.g., zk-SNARKs in Zcash), secure multi-party computation, and privacy-preserving authentication. They build on the same one-way and trapdoor functions as public-key cryptography but add the properties of *hiding* and *knowledge transfer without information leakage*.

<details><summary>Details</summary>

**Step 1 — The global picture.** Encryption hides data; signatures vouch for data. Commitments and ZKPs do something neither does: they let you *prove things about hidden data*. A commitment is the cryptographic equivalent of sealing a value in an envelope; a ZKP is the equivalent of convincing someone the envelope contains a valid solution without opening it.

**Step 2 — A concrete example: Schnorr identification.** Alice wants to prove she knows the discrete log $`a` of $`A = g^a` (her private key) without revealing $`a`. She picks a random $`r`, sends the **commitment** $`e = g^r`; Bob replies with a random **challenge** $`c`; Alice answers with $`z = r + c a`; Bob checks $`g^z = e \cdot A^c`. The protocol is complete (honest Alice always passes), sound (a cheater without $`a` fails for a random $`c` except with negligible probability), and zero-knowledge (Bob could simulate the whole transcript himself with random $`z` and a fitted $`e`, so the transcript proves nothing beyond Alice's honesty). This *commit–challenge–response* shape is the skeleton of most ZK protocols.

**Step 3 — Authoritative sources.** [The Knowledge Complexity of Interactive Proof-Systems (Goldwasser, Micali & Rackoff, 1985)](https://ieeexplore.ieee.org/document/1056985) and [How to Construct Random Functions (for commitments from one-way functions)](https://ieeexplore.ieee.org/document/1056332).

**Step 4 — Example problem.**

<details><summary>Example problem: binding and hiding of a hash commitment</summary>

Alice commits to a bid by publishing $`H(r \| m)` with a random 256-bit $`r`, and reveals $`(r, m)` later. Which property stops her from changing her bid after seeing competitors' commitments, and which property stops competitors from reading her bid? What breaks if $`r` is omitted?

<details><summary>Solution</summary>

**Binding** (from collision resistance of $`H`) stops the bid change: to open the commitment as a different $`m'`, Alice would need $`H(r \| m) = H(r' \| m')`, i.e., a collision. **Hiding** (from $`r` being random and 256 bits) stops competitors: without $`r`, every $`m` is consistent with the digest, and brute-forcing $`r \| m` jointly is infeasible. If $`r` is omitted, hiding collapses: competitors hash each plausible bid ("$`100{,}000`", "$`100{,}001`", …) and match against the commitment — a dictionary attack, exactly like unsalted password hashing.

</details>
</details>

</details>

## Interactive exploration

The simulation below demonstrates three constructions from this page. **Diffie–Hellman**: set the public parameters $`p, g` and the private values $`a, b`, click *Exchange*, and watch both parties arrive at the same shared secret while the eavesdropper sees only public values. **Block Cipher Modes**: enter plaintext blocks containing a repetition (the default `AB AB CD AB` does), click *Encrypt*, and compare how ECB copies the pattern into the ciphertext while CBC and CTR hide it. **Feistel Network**: choose a number of rounds, click *Animate*, and step through the rounds to see how an invertible permutation emerges from a non-invertible round function.

<iframe src="./Cryptography.simulation.html" title="Diffie-Hellman key exchange, block cipher modes, and Feistel network"></iframe>

## Example problem

<details><summary>Problem</summary>

**Problem**: Design a secure protocol for Alice to send a 1 MB file to Bob over an insecure channel, assuming they share no pre-existing secret. Specify the key exchange, encryption, and authentication steps.

<details><summary>Solution</summary>

1. **Key exchange**: Alice and Bob perform an **ECDHE** (Elliptic Curve Diffie–Hellman Ephemeral) key exchange. Alice generates an ephemeral key pair $`(a, A = aG)`, Bob generates $`(b, B = bG)`. They exchange $`A` and $`B`. Both compute the shared secret $`S = aB = bA`.

2. **Key derivation**: Derive session keys from $`S` using a KDF (e.g., HKDF): $`K_{enc} = \text{HKDF}(S, \text{"enc"})`, $`K_{mac} = \text{HKDF}(S, \text{"mac"})`.

3. **Encryption**: Encrypt the file with **AES-256-GCM** (an AEAD) using $`K_{enc}`. GCM provides both confidentiality and integrity. Use a random 96-bit nonce (included in the ciphertext header).

4. **Authentication**: GCM's built-in MAC authenticates both the ciphertext and any associated data (e.g., a file header). No separate MAC is needed.

5. **Forward secrecy**: The ephemeral keys $`a, b` are discarded after the session. Even if Bob's long-term private key is later compromised, past sessions remain secure.

This is essentially what TLS 1.3 does. The total overhead is $`\approx 2 \times 32` bytes (two public keys) + 12 bytes (nonce) + 16 bytes (GCM tag) per file.

</details>
</details>

