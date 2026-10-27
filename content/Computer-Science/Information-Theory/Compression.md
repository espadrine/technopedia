# Compression

Compression reduces the number of bits needed to represent data, either **losslessly** (exact reconstruction) or **lossily** (controlled distortion). It is relevant whenever storage or bandwidth is limited: text and binaries on disk, images, audio, video. Compression and channel coding are complementary stages: compression removes the redundancy the *source* contains, while channel coding (see [Communication](./Communication.md)) adds controlled redundancy to protect the remaining bits from noise.

> **Authoritative sources**
> - [RFC 1951: DEFLATE Compressed Data Format](https://www.rfc-editor.org/info/rfc1951/)
> - [ITU-T T.81 / ISO/IEC 10918-1: JPEG](https://www.itu.int/rec/T-REC-T.81/en)
> - [ISO/IEC 11172-3: MPEG-1 Audio](https://www.iso.org/standard/16451.html)
> - [RFC 6716: Definition of the Opus Audio Codec](https://www.rfc-editor.org/info/rfc6716)
> - [RFC 8878: Zstandard Compression](https://www.rfc-editor.org/info/rfc8878)

## Lossless compression

The **source coding theorem** (Shannon, 1948) states that no lossless code can have expected length below the entropy $`H` of the source, and this bound is asymptotically achievable. All the algorithms below approach this fundamental limit. See [Coding and entropy](./Coding-and-Entropy.md) for the full statement and proof.

**Run-length encoding (RLE)**: replace runs of identical symbols with a count. $`AAAAABBBCC \to 5A\;3B\;2C`. Effective for data with long runs; expands data with no runs.

**LZ77 (backreference)**: replace repeated substrings with a (offset, length) pair pointing to the previous occurrence. Sliding window of size $`W`; maximum match length $`L`. Basis of DEFLATE, gzip, zstd, Brotli.

**LZW (dictionary)**: build a dictionary of previously seen strings; emit dictionary indices. The dictionary grows during encoding. Used in GIF, TIFF.

**Huffman coding**: assign shorter codewords to more probable symbols. Optimal among prefix-free codes for a known distribution (see [Coding and entropy](./Coding-and-Entropy.md)). Used in JPEG, MP3, DEFLATE.

**DEFLATE** (RFC 1951): combines LZ77 (backreferences) with Huffman coding. The basis of gzip, ZIP, PNG.

**Arithmetic coding**: encodes the entire message as a single fraction in $`[0,1)` whose interval shrinks by the probability of each symbol. Achieves entropy more closely than Huffman (which is limited to integer bit lengths).

**Modern general-purpose formats**: **bzip2** applies the Burrows–Wheeler transform (a reversible permutation that clusters repeated contexts into runs) before entropy coding — strong ratio, slow. **zstd** (RFC 8878) pairs LZ77-style matching with FSE (finite-state entropy, an arithmetic-coding relative) and Huffman coding, tuned for very high speed. **Brotli** (RFC 7932) adds a built-in static dictionary of common web strings to a DEFLATE-like core, for HTTP content encoding.

<details><summary>Details</summary>

**LZ77 example**: encoding "ABRACADABRA" with window $`W = 12`, max match $`L = 4`, minimum match 3:
- positions 0–6: `A`, `B`, `R`, `A`, `C`, `A`, `D` are all literals (each longest match is shorter than 3 symbols);
- position 7: the lookahead is "ABRA", the window holds "ABRACAD". The longest match starts at window position 0 — that is, at index 0 of the text, offset $`7 - 0 = 7` — and runs for 4 symbols: emit **(offset 7, length 4)** and skip 4 symbols;
- result: `A B R A C A D (7,4)` — 8 tokens cover all 11 symbols.

A backreference may overlap the lookahead: "AAAAAA" encodes as `A` then (1, 4), because the match source keeps re-reading the just-written `A`s. Try it in the [interactive LZ77 matcher](#interactive-exploration) below.

**Huffman construction**: repeatedly merge the two least-probable symbols until one node remains. The depth of each leaf is its codeword length. For probabilities A 0.4, B 0.3, C 0.15, D 0.1, E 0.05: merge E+D → 0.15, then 0.15+C → 0.30, then 0.30+B → 0.60, then 0.60+A → 1.0.

<svg viewBox="0 0 520 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Huffman tree for probabilities 0.4, 0.3, 0.15, 0.1, 0.05">
  <g stroke="#8899aa" stroke-width="1.5" fill="none">
    <line x1="230" y1="45" x2="110" y2="115"/><line x1="230" y1="45" x2="350" y2="115"/>
    <line x1="350" y1="115" x2="280" y2="185"/><line x1="350" y1="115" x2="410" y2="185"/>
    <line x1="410" y1="185" x2="350" y2="255"/><line x1="410" y1="185" x2="440" y2="255"/>
    <line x1="440" y1="255" x2="410" y2="315"/><line x1="440" y1="255" x2="480" y2="315"/>
  </g>
  <g font-size="11" fill="#8899aa" text-anchor="middle">
    <text x="160" y="75">0</text><text x="300" y="75">1</text>
    <text x="305" y="145">0</text><text x="390" y="145">1</text>
    <text x="370" y="215">0</text><text x="435" y="215">1</text>
    <text x="415" y="285">0</text><text x="470" y="285">1</text>
  </g>
  <g stroke="#ffffff" stroke-width="1.5">
    <circle cx="230" cy="30" r="17" fill="#4a4a8a"/><circle cx="110" cy="115" r="15" fill="#2d6a4f"/>
    <circle cx="350" cy="115" r="17" fill="#4a4a8a"/><circle cx="280" cy="185" r="15" fill="#2d6a4f"/>
    <circle cx="410" cy="185" r="17" fill="#4a4a8a"/><circle cx="350" cy="255" r="15" fill="#2d6a4f"/>
    <circle cx="440" cy="255" r="17" fill="#4a4a8a"/><circle cx="410" cy="315" r="15" fill="#2d6a4f"/>
    <circle cx="480" cy="315" r="15" fill="#2d6a4f"/>
  </g>
  <g font-size="12" fill="#ffffff" text-anchor="middle">
    <text x="230" y="34">1.00</text><text x="110" y="119" font-weight="bold">A</text>
    <text x="350" y="119">0.60</text><text x="280" y="189" font-weight="bold">B</text>
    <text x="410" y="189">0.30</text><text x="350" y="259" font-weight="bold">C</text>
    <text x="440" y="259">0.15</text><text x="410" y="319" font-weight="bold">D</text>
    <text x="480" y="319" font-weight="bold">E</text>
  </g>
</svg>

Codewords: A = `0`, B = `10`, C = `110`, D = `1110`, E = `1111`. Expected length $`L = 0.4 \cdot 1 + 0.3 \cdot 2 + 0.15 \cdot 3 + 0.1 \cdot 4 + 0.05 \cdot 4 = 1.95` bits, against an entropy $`H \approx 1.92` bits — the gap is under 1 bit because Huffman cannot use fractional lengths.

**Arithmetic coding example**: with $`p(A) = p(B) = 0.5`, start with the interval $`[0,1)`. Encoding `A` shrinks it to $`[0, 0.5)`; encoding `B` shrinks it to its second half, $`[0.25, 0.5)`. Any value in $`[0.25, 0.5)` — say 0.375 = binary 0.011 — decodes to "AB". The interval width is $`0.25`, i.e. $`-\log_2 0.25 = 2` bits of information, and the 3 emitted bits come within the usual sub-bit overhead.

Authoritative source: [RFC 1951](https://www.rfc-editor.org/info/rfc1951/) (DEFLATE: LZ77 + Huffman as used in gzip, ZIP, PNG).

<details><summary>Example problem</summary>

Build the Huffman code for the distribution A 0.5, B 0.25, C 0.125, D 0.125. What is the expected code length, and how does it compare to the entropy?

<details><summary>Solution</summary>

Merge D+C → 0.25, then 0.25+B → 0.5, then 0.5+A → 1.0. Codewords: A = `0`, B = `10`, C = `110`, D = `111`. Expected length $`L = 0.5 \cdot 1 + 0.25 \cdot 2 + 0.125 \cdot 3 + 0.125 \cdot 3 = 1.75` bits. The entropy is $`H = -(0.5\log_2 0.5 + 0.25\log_2 0.25 + 2 \cdot 0.125\log_2 0.125) = 1.75` bits: the distribution is dyadic (every probability is a power of $`1/2`), so Huffman reaches the entropy exactly.

</details>
</details>

</details>

## Lossy compression: the common pattern

All lossy codecs follow the same three-stage structure:

1. **Transform** — rewrite the signal in a domain where perception is simple (spatial frequencies for images, time–frequency for audio). Reversible: no information is lost.
2. **Quantize** — round each coefficient to a multiple of a step size, using a perceptual model to choose coarse steps where the senses are insensitive. This is the *only* lossy stage: it discards information below the perceptual threshold.
3. **Entropy-code** — compress the quantized coefficients losslessly (Huffman, arithmetic, or run-length + Huffman), exploiting the many zeros the quantizer produced.

<svg viewBox="0 0 740 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The three stages of lossy compression: transform, quantize, entropy-code">
  <defs>
    <marker id="ar1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill="#8899aa"/>
    </marker>
  </defs>
  <text x="370" y="18" text-anchor="middle" font-size="12" fill="#8899aa">only stage 2 discards information — stages 1 and 3 are reversible</text>
  <rect x="20" y="40" width="200" height="62" rx="8" fill="#1e3a5f" stroke="#4a9eff"/>
  <text x="120" y="68" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff">1 · Transform</text>
  <text x="120" y="88" text-anchor="middle" font-size="11" fill="#bcd0e8">signal → perceptual domain</text>
  <line x1="220" y1="71" x2="258" y2="71" stroke="#8899aa" stroke-width="2" marker-end="url(#ar1)"/>
  <rect x="262" y="40" width="200" height="62" rx="8" fill="#5a2a2a" stroke="#e07070"/>
  <text x="362" y="68" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff">2 · Quantize</text>
  <text x="362" y="88" text-anchor="middle" font-size="11" fill="#f0c8c8">discard below perceptual threshold</text>
  <line x1="462" y1="71" x2="500" y2="71" stroke="#8899aa" stroke-width="2" marker-end="url(#ar1)"/>
  <rect x="504" y="40" width="200" height="62" rx="8" fill="#1e3a5f" stroke="#4a9eff"/>
  <text x="604" y="68" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff">3 · Entropy-code</text>
  <text x="604" y="88" text-anchor="middle" font-size="11" fill="#bcd0e8">lossless, exploits the zeros</text>
</svg>

The sections below differ only in the transform (DCT for images, MDCT for audio, DCT + motion compensation for video) and the perceptual model (visual vs. auditory masking).

<details><summary>Details</summary>

**Worked mini-example**: take a 2-sample block of pixel values $`[64, 72]` and run it through the three stages with a toy transform (the Haar step, which is the simplest orthogonal transform: it replaces a pair by its scaled sum and scaled difference).

1. *Transform*: $`a = (64+72)/\sqrt{2} \approx 95.2` (the average, i.e. the DC term) and $`d = (64-72)/\sqrt{2} \approx -5.7` (the detail, i.e. the AC term). All the energy now sits in one coefficient.
2. *Quantize*: keep $`a` exactly, but divide $`d` by the step 16 and round: $`-5.7 / 16 \approx -0.35 \to 0`. The detail is discarded — the eye barely notices a 4-level difference inside a smooth pair.
3. *Entropy-code*: emit $`a` (~7 bits) plus a 1-bit flag "AC = 0", instead of the raw 16 bits.
4. *Decode*: invert the transform with $`d = 0`: both samples become $`a/\sqrt{2} \approx 68`. Error: 4 per sample, invisible on a smooth gradient.

This is exactly what JPEG does to an 8×8 block, and what MP3 does to a frame of audio — only the transform and the perceptual model change.

Authoritative source: [ITU-T T.81 (JPEG)](https://www.itu.int/rec/T-REC-T.81/en) — the canonical instance of the three-stage pattern.

<details><summary>Example problem</summary>

Run the same pipeline on the block $`[64, 96]` with quantization step 16 on the AC term. What are the transformed coefficients, the quantized AC value, and the decoded samples?

<details><summary>Solution</summary>

Transform: $`a = 160/\sqrt{2} \approx 113.1`, $`d = (64-96)/\sqrt{2} \approx -22.6`. Quantize: $`-22.6/16 \approx -1.41 \to -1`, dequantized $`d' = -16`. Decode: $`x_0 = (a + d')/\sqrt{2} \approx 68.7`, $`x_1 = (a - d')/\sqrt{2} \approx 91.3`. Both samples are off by ≈ 4.3 — the quantization error of $`16 - 22.6 = 6.6` in the AC term, split evenly across the pair by the inverse transform.

</details>
</details>

</details>

## Lossy image compression

An image is a 2D array of **pixels**, each with **RGB** (or YCbCr) values. Lossy compression exploits the fact that the human visual system is insensitive to high-frequency spatial detail.

**Pipeline** (JPEG):

<svg viewBox="0 0 780 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="JPEG encoding pipeline">
  <defs>
    <marker id="ar2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill="#8899aa"/>
    </marker>
  </defs>
  <g font-size="11" fill="#ffffff" text-anchor="middle">
    <rect x="8"   y="22" width="88" height="36" rx="6" fill="#1e3a5f" stroke="#4a9eff"/><text x="52"  y="44">RGB→YCbCr</text>
    <rect x="118" y="22" width="88" height="36" rx="6" fill="#1e3a5f" stroke="#4a9eff"/><text x="162" y="44">4:2:0 chroma</text>
    <rect x="228" y="22" width="88" height="36" rx="6" fill="#1e3a5f" stroke="#4a9eff"/><text x="272" y="44">8×8 blocks</text>
    <rect x="338" y="22" width="88" height="36" rx="6" fill="#1e3a5f" stroke="#4a9eff"/><text x="382" y="44">DCT</text>
    <rect x="448" y="22" width="88" height="36" rx="6" fill="#5a2a2a" stroke="#e07070"/><text x="492" y="44">Quantize</text>
    <rect x="558" y="22" width="88" height="36" rx="6" fill="#1e3a5f" stroke="#4a9eff"/><text x="602" y="44">Huffman</text>
    <rect x="668" y="22" width="88" height="36" rx="6" fill="#2d6a4f" stroke="#52b788"/><text x="712" y="44">bitstream</text>
  </g>
  <g stroke="#8899aa" stroke-width="2">
    <line x1="96"  y1="40" x2="114" y2="40" marker-end="url(#ar2)"/>
    <line x1="206" y1="40" x2="224" y2="40" marker-end="url(#ar2)"/>
    <line x1="316" y1="40" x2="334" y2="40" marker-end="url(#ar2)"/>
    <line x1="426" y1="40" x2="444" y2="40" marker-end="url(#ar2)"/>
    <line x1="536" y1="40" x2="554" y2="40" marker-end="url(#ar2)"/>
    <line x1="646" y1="40" x2="664" y2="40" marker-end="url(#ar2)"/>
  </g>
</svg>

1. Convert RGB → YCbCr (luma + chroma).
2. Downsample chroma (4:2:0: quarter the chroma resolution).
3. Split into 8×8 blocks.
4. Apply **DCT** (Discrete Cosine Transform) to each block: $`F(u,v) = \frac{1}{4} C(u) C(v) \sum_{x=0}^{7} \sum_{y=0}^{7} f(x,y) \cos\frac{(2x+1)u\pi}{16} \cos\frac{(2y+1)v\pi}{16}` where $`C(0) = 1/\sqrt{2}` and $`C(k) = 1` for $`k > 0`.
5. Quantize: divide each DCT coefficient by a quantization step (larger steps for high frequencies).
6. Encode the quantized coefficients with Huffman or arithmetic coding.

**DCT vs FFT**: this page uses the DCT (and its audio cousin, the MDCT), not the FFT. The DCT is the real-valued, even-symmetric variant of the DFT: the DCT of $`N` real points equals the DFT of the $`2N`-point even extension of the signal, and it needs no complex arithmetic. The FFT is the fast $`O(N \log N)` algorithm that computes DFTs — and, via that even-extension trick, DCTs as well.

<details><summary>Details</summary>

**Why DCT?**: Natural images have most of their energy in low-frequency DCT coefficients. The top-left coefficient (DC) captures the average; the rest (AC) capture detail. Quantizing AC coefficients to zero discards detail the eye barely notices.

<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DCT energy compaction: energy concentrates in the DC and low-frequency AC coefficients">
  <line x1="50" y1="170" x2="610" y2="170" stroke="#8899aa" stroke-width="1.5"/>
  <line x1="50" y1="170" x2="50" y2="20" stroke="#8899aa" stroke-width="1.5"/>
  <g fill="#4a9eff">
    <rect x="70"  y="40"  width="40" height="130"/>
    <rect x="130" y="120" width="40" height="50"/>
    <rect x="190" y="138" width="40" height="32"/>
    <rect x="250" y="148" width="40" height="22"/>
    <rect x="310" y="154" width="40" height="16"/>
    <rect x="370" y="159" width="40" height="11"/>
    <rect x="430" y="162" width="40" height="8"/>
    <rect x="490" y="164" width="40" height="6"/>
  </g>
  <g font-size="11" fill="#8899aa" text-anchor="middle">
    <text x="90" y="186">DC</text><text x="150" y="186">AC1</text><text x="210" y="186">AC2</text>
    <text x="270" y="186">AC3</text><text x="330" y="186">AC4</text><text x="390" y="186">AC5</text>
    <text x="450" y="186">AC6</text><text x="510" y="186">AC7</text>
  </g>
  <text x="330" y="205" text-anchor="middle" font-size="12" fill="#8899aa">typical 8-point DCT spectrum of a natural image block: energy concentrates at low frequencies</text>
</svg>

**Quantization table**: 8×8 matrix of divisors. The JPEG standard provides a default table; the quality parameter scales it. Higher quality → smaller divisors → less distortion.

**PNG** is lossless: it uses a filter (predict each row from the previous) followed by DEFLATE. No DCT, no quantization.

**Modern lossy image formats**: **WebP** (VP8 intra prediction + DCT) and **AVIF** (AV1 intra frames) keep the same transform → quantize → entropy-code pattern but add richer spatial prediction and better entropy coders, typically halving the bitrate of JPEG at equal quality.

Authoritative source: [ITU-T T.81 (JPEG)](https://www.itu.int/rec/T-REC-T.81/en).

<details><summary>Example problem</summary>

An 8×8 block is constant, every pixel equal to 100. What are its 64 DCT coefficients, and why does this make smooth regions so cheap to encode?

<details><summary>Solution</summary>

Every AC coefficient is 0: the block has no variation, so all the cosine terms sum to zero. The DC coefficient alone carries the average: with the orthonormal scaling, $`F(0,0) = \frac{1}{8}\sum_{x,y} f(x,y) = \frac{6400}{8} = 800`. The whole block therefore reduces to one number plus 63 zeros — which the entropy coder represents with a single "all AC zero" code. Smooth regions of natural images are close to this extreme, which is why JPEG spends most of its bits on edges and texture.

</details>
</details>

</details>

## Lossy audio compression

**Sound** is a pressure wave. The **Nyquist–Shannon sampling theorem** states that a bandlimited signal with maximum frequency $`f_{max}` can be perfectly reconstructed from samples at rate $`f_s > 2 f_{max}`.

Human hearing spans $`20 \text{ Hz}` to $`20 \text{ kHz}`, so $`f_s = 44.1 \text{ kHz}` (CD) or $`48 \text{ kHz}` suffices.

**MP3 / AAC pipeline**:
1. Split the signal into frames (MPEG-1 Layer III: 1152 samples = 2 granules of 576 samples, each granule transformed by 18 MDCT blocks of 32 coefficients; AAC: 1024 samples = one long MDCT, or 8 short windows of 128 for transients).
2. Apply the MDCT (Modified DCT) to each frame: overlapping windows avoid the block-boundary artifacts a plain DCT would cause.
3. Apply a psychoacoustic model: compute the masking threshold per frequency band (loud sounds mask nearby quiet sounds).
4. Quantize spectral coefficients below the masking threshold to zero, and allocate the remaining bits across bands.
5. Encode the quantized coefficients with Huffman coding.

<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Psychoacoustic masking: a loud tone raises the masking threshold, so quieter tones below the curve are discarded">
  <line x1="40" y1="190" x2="610" y2="190" stroke="#8899aa" stroke-width="1.5"/>
  <line x1="40" y1="190" x2="40" y2="20" stroke="#8899aa" stroke-width="1.5"/>
  <text x="325" y="215" text-anchor="middle" font-size="12" fill="#8899aa">frequency →</text>
  <text x="20" y="105" font-size="12" fill="#8899aa" transform="rotate(-90 20 105)">level →</text>
  <path d="M 60 150 C 140 150, 170 150, 195 70 C 205 55, 215 55, 225 70 C 250 150, 300 155, 380 160 C 480 165, 560 165, 610 165" fill="none" stroke="#e07070" stroke-width="2"/>
  <line x1="210" y1="55" x2="210" y2="190" stroke="#e07070" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="210" y="45" text-anchor="middle" font-size="11" fill="#e07070">loud tone</text>
  <circle cx="255" cy="140" r="5" fill="#8899aa"/>
  <text x="262" y="132" font-size="11" fill="#8899aa">masked → discarded</text>
  <circle cx="500" cy="100" r="5" fill="#52b788"/>
  <text x="507" y="95" font-size="11" fill="#52b788">above threshold → kept</text>
</svg>

<details><summary>Details</summary>

**Perceptual coding** exploits three phenomena:
- Critical bands: the ear processes $`\approx 24`–$`25` independent frequency bands.
- Masking: a loud tone masks quieter tones within $`\approx 100`–$`200` Hz.
- Temporal masking: a loud sound masks sounds within $`\approx 1`–$`20` ms before and after it.

**Bit reservoir**: MP3 main data is Huffman-coded and need not fit in its own frame. A frame that needs fewer bits than its allotment deposits the surplus into a *bit reservoir*; a frame facing a difficult passage borrows from it. Quality is thereby smoothed across frames instead of dipping exactly on the hard parts.

**AAC profiles**: AAC-LC (Low Complexity) is the plain MDCT + Huffman scheme described above. HE-AAC adds **SBR** (Spectral Band Replication): the encoder transmits only the low half of the spectrum plus a small parametric description, and the decoder reconstructs the high frequencies by transposing the low ones — roughly doubling the effective bandwidth at low bitrates. HE-AAC v2 adds parametric stereo on top.

**Opus** (RFC 6716) switches between two internal codecs according to content and bitrate: **SILK** (linear prediction, speech-oriented) at low rates and **CELT** (MDCT-based) at high rates, which is why one codec covers everything from narrowband speech to full-band music.

**Bitrate**: MP3 at 128 kbps total for stereo allocates 64 kbps per channel, yielding $`\approx 64000 / 44100 \approx 1.45` bits per sample per channel. The psychoacoustic model decides how to distribute these bits across frequency bins.

Authoritative source: [ISO/IEC 11172-3 (MPEG-1 Audio)](https://www.iso.org/standard/16451.html).

<details><summary>Example problem</summary>

A recording contains no energy above 15 kHz. What is the minimum sampling rate that preserves it exactly, and why does a 20 kHz sampling rate fail?

<details><summary>Solution</summary>

Nyquist–Shannon requires $`f_s > 2 f_{max} = 30` kHz; 32 kHz suffices, and CD's 44.1 kHz leaves margin for real filters. At $`f_s = 20` kHz, all energy between 10 and 15 kHz exceeds the Nyquist frequency $`f_s/2 = 10` kHz and *aliases*: it folds back into 5–10 kHz, corrupting frequencies that were correctly sampled. This is why decoders must low-pass filter before downsampling.

</details>
</details>

</details>

## Lossy video compression

Video is a sequence of **frames** at a **framerate** (24, 30, 60 fps). Lossy video compression exploits both spatial redundancy (within a frame) and temporal redundancy (between frames).

**Frame types** (H.264/AVC, H.265/HEVC):
- **I-frame** (Intra): encoded independently using spatial prediction + DCT (like JPEG). No temporal dependency.
- **P-frame** (Predicted): encodes the difference from the previous I or P frame using **motion compensation** (block matching + motion vectors).
- **B-frame** (Bidirectional): encodes the difference from both the previous and next reference frames. Most efficient but adds latency.

<svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="I/P/B frame dependencies in a GOP">
  <defs>
    <marker id="ar3" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill="#8899aa"/>
    </marker>
  </defs>
  <g font-size="13" font-weight="bold" text-anchor="middle">
    <rect x="40"  y="30" width="56" height="36" rx="6" fill="#2d6a4f" stroke="#52b788"/><text x="68"  y="53" fill="#ffffff">I</text>
    <rect x="130" y="30" width="56" height="36" rx="6" fill="#4a3a7a" stroke="#9d7bd8"/><text x="158" y="53" fill="#ffffff">B</text>
    <rect x="220" y="30" width="56" height="36" rx="6" fill="#4a3a7a" stroke="#9d7bd8"/><text x="248" y="53" fill="#ffffff">B</text>
    <rect x="310" y="30" width="56" height="36" rx="6" fill="#1e3a5f" stroke="#4a9eff"/><text x="338" y="53" fill="#ffffff">P</text>
    <rect x="400" y="30" width="56" height="36" rx="6" fill="#4a3a7a" stroke="#9d7bd8"/><text x="428" y="53" fill="#ffffff">B</text>
    <rect x="490" y="30" width="56" height="36" rx="6" fill="#4a3a7a" stroke="#9d7bd8"/><text x="518" y="53" fill="#ffffff">B</text>
    <rect x="580" y="30" width="56" height="36" rx="6" fill="#2d6a4f" stroke="#52b788"/><text x="608" y="53" fill="#ffffff">I</text>
  </g>
  <g stroke="#8899aa" stroke-width="1.5" fill="none">
    <path d="M 338 70 C 338 105, 68 105, 68 72" marker-end="url(#ar3)"/>
    <path d="M 158 70 C 150 92, 100 92, 80 74" marker-end="url(#ar3)"/>
    <path d="M 168 70 C 190 92, 300 92, 326 72" marker-end="url(#ar3)"/>
    <path d="M 248 70 C 256 92, 306 92, 330 72" marker-end="url(#ar3)"/>
    <path d="M 428 70 C 420 92, 370 92, 348 72" marker-end="url(#ar3)"/>
    <path d="M 438 70 C 460 92, 570 92, 596 72" marker-end="url(#ar3)"/>
    <path d="M 518 70 C 526 92, 576 92, 600 72" marker-end="url(#ar3)"/>
  </g>
  <text x="320" y="140" text-anchor="middle" font-size="12" fill="#8899aa">P and B frames store only motion-compensated differences from their reference frames (arrows)</text>
</svg>

**Motion compensation**: divide the frame into 16×16 or 8×8 blocks; for each block, search a reference frame for the best-matching block; store the motion vector (offset) and the residual (difference).

<details><summary>Details</summary>

**GOP** (Group of Pictures): the sequence of frames between two I-frames. A longer GOP means fewer I-frames (smaller file) but longer error propagation if a frame is corrupted — and a longer seek time, since a player must start decoding at an I-frame.

**Rate-distortion optimization**: the encoder chooses quantization parameters to minimize $`D + \lambda R` where $`D` is distortion (MSE) and $`R` is bitrate. This is a Lagrangian relaxation of the rate-distortion function.

**H.265/HEVC** improves on H.264 with larger CTUs (up to 64×64), more prediction modes, and a more parallelizable CABAC implementation (reduced context models, bin grouping). **AV1** (open) and **H.266/VVC** push further with neural-network-based tools.

Authoritative source: [ITU-T H.264 (AVC)](https://www.itu.int/rec/T-REC-H.264).

<details><summary>Example problem</summary>

A 30 fps video uses a GOP of 30. Each I-frame compresses to 60 kB and each P-frame to 6 kB (B-frames are folded into the P-frame budget for this estimate). Estimate the bitrate.

<details><summary>Solution</summary>

One GOP per second contains 1 I-frame and 29 P-frames: $`60 + 29 \times 6 = 234` kB/s $`\approx 234{,}000 \times 8 = 1.87` Mbps. The single I-frame is ~26% of the budget despite being 1/30 of the frames — which is why encoders place I-frames at scene cuts, where temporal prediction fails anyway.

</details>
</details>

</details>

## Interactive exploration

The simulation below steps through **LZ77**: at each position, the encoder searches the sliding window for the longest match with the lookahead, emitting either a literal or an (offset, length) backreference. Try "ABRACADABRA" (the worked example above), then "AAAAAA" to see an overlapping match, then shrink the window to see matches lost.

<iframe src="./Compression.simulation.html" title="LZ77 sliding-window matcher: step through literal and backreference emission"></iframe>

## Quizz

**Problem**: A 1920×1080 image has 2,073,600 pixels, each 24-bit RGB. What is the file size in bits? If JPEG compresses it to a quality where the DCT coefficients are quantized to 8 bits each (64 coefficients per 8×8 block), what is the compressed size before entropy coding?

<details><summary>Solution</summary>

**Uncompressed**: $`2{,}073{,}600 \times 24 = 49{,}766{,}400` bits $`\approx 6.22` MB.

**Compressed (before entropy coding)**:
- Number of 8×8 blocks: $`(1920/8) \times (1080/8) = 240 \times 135 = 32{,}400` blocks.
- Each block: 64 coefficients × 8 bits = 512 bits.
- Total: $`32{,}400 \times 512 = 16{,}588{,}800` bits $`\approx 2.07` MB.

This is before Huffman/arithmetic coding, which would further reduce the size (many quantized coefficients are zero and can be run-length encoded). The actual JPEG file would be well under 2 MB at this quality.

</details>


Compression reduces the number of bits needed to represent data, either losslessly (exact reconstruction) or lossily (controlled distortion). It is relevant whenever storage or bandwidth is limited. Compression and channel coding (see [Communication](./Communication.md)) are complementary stages: compression reduces the number of bits to send, while channel coding protects them from noise.

> **Authoritative sources**
> - [RFC 1951: DEFLATE Compressed Data Format](https://www.rfc-editor.org/info/rfc1951/)
> - [ITU-T T.81 / ISO/IEC 10918-1: JPEG](https://www.itu.int/rec/T-REC-T.81/en)
> - [ISO/IEC 11172-3: MPEG-1 Audio](https://www.iso.org/standard/16451.html)

## Lossless text compression

The **source coding theorem** (Shannon, 1948) states that no lossless code can have expected length below the entropy $`H` of the source, and this bound is asymptotically achievable. All the algorithms below approach this fundamental limit. See [Coding and entropy](./Coding-and-Entropy.md) for the full statement and proof.

**Run-length encoding (RLE)**: replace runs of identical symbols with a count. $`AAAAABBBCC \to 5A\;3B\;2C`. Effective for data with long runs; expands data with no runs.

**LZ77 (backreference)**: replace repeated substrings with a (offset, length) pair pointing to the previous occurrence. Sliding window of size $`W`; maximum match length $`L`. Basis of DEFLATE and gzip.

**LZW (dictionary)**: build a dictionary of previously seen strings; emit dictionary indices. The dictionary grows during encoding. Used in GIF, TIFF.

**Huffman coding**: assign shorter codewords to more probable symbols. Optimal among prefix-free codes for a known distribution (see [Coding and entropy](./Coding-and-Entropy.md)). Used in JPEG, MP3, DEFLATE.

**DEFLATE** (RFC 1951): combines LZ77 (backreferences) with Huffman coding. The basis of gzip, ZIP, PNG.

**Arithmetic coding**: encodes the entire message as a single fraction in $`[0,1)` whose interval shrinks by the probability of each symbol. Achieves entropy more closely than Huffman (which is limited to integer bit lengths).

<details><summary>Details</summary>

**LZ77 example**: Encoding "ABRACADABRA" with window 12, max match 4:
- `A` → literal
- `B` → literal
- `R` → literal
- `A` → literal
- `C` → literal
- `A` → literal
- `D` → literal
- `AB` → (offset 5, length 2) [matches "AB" at position 1]
- `RA` → (offset 3, length 2) [matches "RA" at position 3]

**Huffman construction**: repeatedly merge the two least-probable symbols until one node remains. The depth of each leaf is its codeword length. The resulting code is optimal among all prefix-free codes for the given distribution.

**Arithmetic coding**: maintain an interval $`[low, high)`. For each symbol $`s` with cumulative probability $`[F(s), F(s)+p(s))`, subdivide the current interval proportionally. After $`n` symbols, any value in the final interval decodes to the original message. The interval width is $`\prod p(s_i)`, so the code length approaches $`-\log_2 \prod p(s_i) = \sum -\log_2 p(s_i)`. By the law of large numbers, the expected code length per symbol approaches $`H` (the entropy of the source).

</details>

## Lossy compression: the common pattern

All lossy codecs follow the same high-level structure: **transform** the signal into a perceptually-relevant domain → **quantize** using a perceptual model (discard components below the perceptual threshold) → **entropy-code** the residuals. The sections below differ only in the transform (DCT for images, MDCT for audio, DCT + motion compensation for video) and the perceptual model (visual vs. auditory masking).

## Lossy image compression

An image is a 2D array of **pixels**, each with **RGB** (or YCbCr) values. Lossy compression exploits the fact that the human visual system is insensitive to high-frequency spatial detail.

**Pipeline** (JPEG):
1. Convert RGB → YCbCr (luma + chroma).
2. Downsample chroma (4:2:0: quarter the chroma resolution).
3. Split into 8×8 blocks.
4. Apply **DCT** (Discrete Cosine Transform) to each block: $`F(u,v) = \frac{1}{4} C(u) C(v) \sum_{x=0}^{7} \sum_{y=0}^{7} f(x,y) \cos\frac{(2x+1)u\pi}{16} \cos\frac{(2y+1)v\pi}{16}` where $`C(0) = 1/\sqrt{2}` and $`C(k) = 1` for $`k > 0`.
5. Quantize: divide each DCT coefficient by a quantization step (larger steps for high frequencies).
6. Encode the quantized coefficients with Huffman or arithmetic coding.

<details><summary>Details</summary>

**Why DCT?**: Natural images have most of their energy in low-frequency DCT coefficients. The top-left coefficient (DC) captures the average; the rest (AC) capture detail. Quantizing AC coefficients to zero discards detail the eye barely notices.

**Quantization table**: 8×8 matrix of divisors. The JPEG standard provides a default table; the quality parameter scales it. Higher quality → smaller divisors → less distortion.

**PNG** is lossless: it uses a filter (predict each row from the previous) followed by DEFLATE. No DCT, no quantization.

</details>

## Lossy audio compression

**Sound** is a pressure wave. The **Nyquist–Shannon sampling theorem** states that a bandlimited signal with maximum frequency $`f_{max}` can be perfectly reconstructed from samples at rate $`f_s > 2 f_{max}`.

Human hearing spans $`20 \text{ Hz}` to $`20 \text{ kHz}`, so $`f_s = 44.1 \text{ kHz}` (CD) or $`48 \text{ kHz}` suffices.

**MP3 / AAC pipeline**:
1. Split the signal into short frames (MP3: 1152 samples = 3 subframes of 384; AAC: 1024 samples = 4 subframes of 256).
2. Apply MDCT (Modified DCT) to each frame.
3. Map frequencies to **Mel** scale (perceptual frequency: $`m = 2595 \log_{10}(1 + f/700)`).
4. Apply a psychoacoustic model: compute the masking threshold (loud sounds mask nearby quiet sounds).
5. Quantize spectral coefficients below the masking threshold to zero.
6. Encode the remaining coefficients with Huffman coding.

<details><summary>Details</summary>

**Mel spectrogram**: a time-frequency representation where the frequency axis is in Mel units. It is the input to many speech recognition and audio classification models.

**Bitrate**: MP3 at 128 kbps total for stereo allocates 64 kbps per channel, yielding $`\approx 64000 / 44100 \approx 1.45` bits per sample per channel. The psychoacoustic model decides how to distribute these bits across frequency bins.

**Perceptual coding** exploits three phenomena:
- Critical bands: the ear processes $`\approx 24`–$`25` independent frequency bands.
- Masking: a loud tone masks quieter tones within $`\approx 100`–$`200` Hz.
- Temporal masking: a loud sound masks sounds within $`\approx 1`–$`20` ms before and after it.

</details>

## Lossy video compression

Video is a sequence of **frames** at a **framerate** (24, 30, 60 fps). Lossy video compression exploits both spatial redundancy (within a frame) and temporal redundancy (between frames).

**Frame types** (H.264/AVC, H.265/HEVC):
- **I-frame** (Intra): encoded independently using spatial prediction + DCT (like JPEG). No temporal dependency.
- **P-frame** (Predicted): encodes the difference from the previous I or P frame using **motion compensation** (block matching + motion vectors).
- **B-frame** (Bidirectional): encodes the difference from both the previous and next reference frames. Most efficient but adds latency.

**Motion compensation**: divide the frame into 16×16 or 8×8 blocks; for each block, search a reference frame for the best-matching block; store the motion vector (offset) and the residual (difference).

<details><summary>Details</summary>

**GOP** (Group of Pictures): the sequence of frames between two I-frames. A longer GOP means fewer I-frames (smaller file) but longer error propagation if a frame is corrupted.

**Rate-distortion optimization**: the encoder chooses quantization parameters to minimize $`D + \lambda R` where $`D` is distortion (MSE) and $`R` is bitrate. This is a Lagrangian relaxation of the rate-distortion function.

**H.265/HEVC** improves on H.264 with larger CTUs (up to 64×64), more prediction modes, and a more parallelizable CABAC implementation (reduced context models, bin grouping). **AV1** (open) and **H.266/VVC** push further with neural-network-based tools.

</details>

## Interactive exploration

<iframe src="./Compression.simulation.html" title="Huffman coding tree builder"></iframe>

## Example problem

**Problem**: A 1920×1080 image has 2,073,600 pixels, each 24-bit RGB. What is the file size in bits? If JPEG compresses it to a quality where the DCT coefficients are quantized to 8 bits each (64 coefficients per 8×8 block), what is the compressed size before entropy coding?

<details><summary>Solution</summary>

**Uncompressed**: $`2{,}073{,}600 \times 24 = 49{,}766{,}400` bits $`\approx 6.22` MB.

**Compressed (before entropy coding)**:
- Number of 8×8 blocks: $`(1920/8) \times (1080/8) = 240 \times 135 = 32{,}400` blocks.
- Each block: 64 coefficients × 8 bits = 512 bits.
- Total: $`32{,}400 \times 512 = 16{,}588{,}800` bits $`\approx 2.07` MB.

This is before Huffman/arithmetic coding, which would further reduce the size (many quantized coefficients are zero and can be run-length encoded). The actual JPEG file would be well under 2 MB at this quality.

</details>
