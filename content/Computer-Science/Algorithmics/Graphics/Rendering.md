# Rendering

Rendering is the process of turning geometric primitives into a color image (a framebuffer) at a target frame rate. It is relevant whenever a scene must be drawn: from a 2D chart to a 3D game to a photorealistic film frame.

> **Authoritative sources**
> - [Real-Time Rendering (Akenine-Möller, Haines, Hoffman)](https://www.realtimerendering.com/)
> - [Computer Graphics: Principles and Practice (Hearn & Baker)](https://www.ics.uci.edu/~gopi/cgbook/)

## Rasterization

**Rasterization** maps geometric primitives (triangles) to the pixels they cover, writing color and depth into the framebuffer. It is the workhorse of real-time rendering: the cost is proportional to the number of pixels covered (fill rate), not the number of triangles.

<details><summary>Details</summary>

**Step 1 — The pipeline.** A vertex is transformed by the model-view-projection matrix into *clip space*, perspective-divided into *normalized device coordinates* (NDC), then mapped to *screen space* (pixel coordinates). The triangle is then *rasterized*: each pixel it covers is shaded and written to the framebuffer.

**Step 2 — The z-buffer.** For each pixel, the rasterizer compares the fragment's depth against the stored depth. If the fragment is closer, it overwrites the color and depth. This is the **z-buffer** (hidden-surface removal): after all fragments are processed, the framebuffer holds the front-most surface at every pixel.

**Step 3 — Shading.** A *fragment shader* computes the color of each pixel: typically a lighting model (e.g., Lambert's law, $`I = I_0 \max(0, \hat{n} \cdot \hat{l})` for a diffuse surface) plus texture sampling.

**Example problem**: a 1920×1080 framebuffer is fully covered by opaque triangles, and each fragment runs a shader that does 4 texture fetches. How many texture fetches per frame?

<details><summary>Solution</summary>

The framebuffer has $`1920 \times 1080 = 2{,}073{,}600` pixels. With full coverage and 4 fetches per fragment, the frame issues $`4 \times 2{,}073{,}600 \approx 8.3 \times 10^6` texture fetches. This is why fill rate and texture bandwidth, not triangle count, usually bound real-time rendering.

</details>

</details>

## Ray tracing

**Ray tracing** casts a ray from the camera through each pixel and computes the color of the first surface it hits, recursing for reflections and shadows. It is the standard for offline, photorealistic rendering: the cost is proportional to the number of rays (and their recursion depth), not the number of pixels covered.

<details><summary>Details</summary>

**Step 1 — Primary rays.** For each pixel, build a ray from the camera origin through the pixel's NDC position. Intersect it against the scene's bounding hierarchy (BVH) to find the nearest hit.

**Step 2 — Recursion.** At a hit, cast a *shadow ray* toward each light (to test visibility) and, for reflective surfaces, a *reflection ray* in the mirror direction. Each recursion adds a bounce; the contribution decays by the surface's reflectance, so the recursion terminates.

**Step 3 — Why it is slow.** Ray tracing is *primary*-ray bound: every pixel spawns at least one ray, and each bounce spawns more. Rasterization, by contrast, is *fill*-bound and processes pixels in parallel. This is why ray tracing moved from offline (film) to real time only when GPUs gained enough parallel ray-intersection throughput.

**Example problem**: a scene with a mirror-finish floor and 2 lights. How many rays does one pixel spawn at bounce depth 3?

<details><summary>Solution</summary>

At each hit, the pixel spawns 1 shadow ray per light (2) plus 1 reflection ray (the floor is mirror), so 3 rays per bounce. Over 3 bounces the total is $`1 + 3 + 3^2 + 3^3 = 40` rays (the initial primary ray plus the geometric series of bounces). In practice the reflection ray's contribution decays, so deeper bounces are culled.

</details>

</details>

## Anti-aliasing

**Anti-aliasing** reduces the jagged "staircase" edges (aliasing) that arise when a continuous image is sampled at a finite pixel grid. The two main families are *supersampling* (render at higher resolution, then downsample) and *temporal* (accumulate samples over frames).

<details><summary>Details</summary>

**Step 1 — The cause.** A pixel is a sample of the image at one point, but the true image varies continuously. When an edge falls between samples, it appears as a staircase. This is a sampling artifact governed by the Nyquist limit: features finer than half the pixel spacing cannot be represented.

**Step 2 — Supersampling (SSAA).** Render the scene at $`k \times k` the pixel resolution (e.g., $`2 \times 2` = 4 samples per pixel), then average the $`k^2` samples into one output pixel. The cost is $`k^2`× the fill rate, so $`2 \times 2` SSAA is 4× more expensive.

**Step 3 — Temporal (TAA).** Reuse samples from previous frames (the camera and scene move slowly), accumulating a different sub-pixel offset each frame. This amortizes the supersampling cost over time at the price of slight ghosting on fast motion.

**Example problem**: $`2 \times 2` supersampling on a 1920×1080 target. How many fragments are shaded per frame?

<details><summary>Solution</summary>

The supersampled buffer is $`(2 \times 1920) \times (2 \times 1080) = 3840 \times 2160` pixels, so $`3840 \times 2160 = 8{,}294{,}400` fragments are shaded — 4× the $`2{,}073{,}600` of the target resolution.

</details>

</details>

## Quizz

<details><summary>Quizz</summary>

**Problem**: A scene renders 500,000 triangles that together cover 1,000,000 pixels, and each fragment does 2 texture fetches. Which resource — vertex throughput or fill rate — is the bottleneck, and how many texture fetches occur?

<details><summary>Solution</summary>

Rasterization cost is fill-bound: 1,000,000 fragments are shaded (not 500,000 triangles). Texture fetches = $`2 \times 1{,}000{,}000 = 2{,}000{,}000`. Because the fragment count (1M) far exceeds the triangle count (0.5M), fill rate and texture bandwidth — not vertex throughput — are the bottleneck.

</details>

</details>
