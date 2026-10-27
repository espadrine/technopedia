# Image Processing

Image processing manipulates the pixels of a raster image: converting between color spaces, applying filters, resampling to a new size, and compressing for storage. It is relevant whenever an image must be displayed, edited, or transmitted.

> **Authoritative sources**
> - [Digital Image Processing (Gonzalez & Woods)](https://www.pearson.com/)
> - [Real-Time Rendering (Akenine-Möller, Haines, Hoffman)](https://www.realtimerendering.com/)

## Color spaces

A **color space** is a coordinate system for color. **RGB** stores color as red, green, and blue intensities (the display's primaries); **HSV** stores it as hue, saturation, and value (intuitive for editing). Converting between them is a piecewise-linear change of basis.

<details><summary>Details</summary>

**Step 1 — RGB.** A pixel is a triple (r, g, b) with each channel in $`[0, 1]` (or $`[0, 255]` for 8-bit). The display mixes its red, green, and blue sub-pixels in proportion to these values.

**Step 2 — HSV.** Hue $`h \in [0, 360^\circ)` is the angle around the color wheel; saturation $`s \in [0,1]` is the distance from gray; value $`v \in [0,1]` is the brightness. HSV is a cylinder: the hue is the angle, the radius is the saturation, and the height is the value.

**Step 3 — Why convert.** Editing "make it more red" is a hue/saturation operation (easy in HSV) but a non-trivial combination of channels (awkward in RGB). Compression and perception models (e.g., luminance) also work in other spaces.

**Example problem**: convert the RGB color (1, 0.5, 0) to HSV.

<details><summary>Solution</summary>

$`v = \max(r,g,b) = 1`, $`m = \min(r,g,b) = 0`, so $`s = (v - m)/v = 1`. Since $`v = r`, the hue is $`h = 60^\circ (g - b)/(v - m) = 60^\circ \times 0.5 = 30^\circ`. So HSV = $`(30^\circ, 1, 1)`: a fully saturated orange-yellow.

</details>

</details>

## Filters

A **filter** (convolution) replaces each pixel with a weighted sum of its neighbors: $`(K * I)(x, y) = \sum_{i,j} K(i, j) \, I(x+i, y+j)`. The kernel $`K` encodes the operation: a box kernel blurs, a Laplacian kernel detects edges.

<details><summary>Details</summary>

**Step 1 — Convolution.** Slide the kernel over the image; at each position, multiply the kernel entries by the overlapping pixels and sum. A 3×3 kernel touches 9 pixels per output pixel, so the cost is $`9 \times W \times H` multiply-accumulates for a $`W \times H` image.

**Step 2 — Blur.** A box (or Gaussian) kernel averages neighbors, removing high-frequency detail. A Gaussian kernel $`G(i,j) \propto e^{-(i^2+j^2)/2\sigma^2}` is separable: a 2D Gaussian is a horizontal 1D blur followed by a vertical 1D blur, cutting the cost from $`O(k^2)` to $`O(2k)` per pixel.

**Step 3 — Edge detection.** The Laplacian (second derivative) responds to intensity changes: a pixel whose value differs from its neighbors produces a large response. The Sobel operator combines first derivatives in $`x` and $`y` to estimate the gradient direction and magnitude.

**Example problem**: apply a 3×3 box-blur kernel (all entries $`1/9`) to a pixel with value 9 surrounded by eight pixels of value 0. What is the output?

<details><summary>Solution</summary>

The output is the weighted sum: $`(1/9)(9 + 8 \times 0) = 1`. The blur spreads the single bright pixel's intensity evenly over its 3×3 neighborhood, reducing the peak from 9 to 1.

</details>

</details>

## Resampling

**Resampling** (scaling) maps an image from one pixel grid to another. When the grids do not align, each output pixel's value is estimated from the surrounding input pixels by an interpolation kernel: *nearest neighbor* (fastest, blocky), *bilinear* (smooth, slightly blurry), *bicubic* (sharper, more ringing).

<details><summary>Details</summary>

**Step 1 — The problem.** Scaling a $`W \times H` image to $`W' \times H'` means each output pixel corresponds to a fractional position in the input. Nearest neighbor snaps to the closest input pixel (fast, but blocky); bilinear blends the four surrounding pixels by their fractional offsets (smooth).

**Step 2 — Bilinear.** For an output pixel at input position (x + a, y + b) with $`a, b \in [0,1)`, the value is
$`(1-a)(1-b) I_{00} + a(1-b) I_{10} + (1-a)b I_{01} + ab I_{11}`.
This is a weighted average of the four nearest input pixels, with weights that sum to 1.

**Step 3 — Downscaling.** When shrinking, a single output pixel covers many input pixels; the correct estimate is the *average* over the covered region (a box filter), not the value at the center. Skipping this causes aliasing (moiré).

**Example problem**: bilinearly interpolate between input pixels $`I_{00} = 10`, $`I_{10} = 20`, $`I_{01} = 30`, $`I_{11} = 40` at offset (a, b) = (0.5, 0.5).

<details><summary>Solution</summary>

$`(1-0.5)(1-0.5)(10) + 0.5(1-0.5)(20) + (1-0.5)(0.5)(30) + 0.5(0.5)(40) = 0.25(10 + 20 + 30 + 40) = 0.25 \times 100 = 25`. At the center, bilinear gives the average of the four pixels.

</details>

</details>

## Quizz

<details><summary>Quizz</summary>

**Problem**: A 1000×1000 image is blurred with a separable 5×5 Gaussian (two 1×5 passes). How many multiply-accumulates per pixel, and how does that compare to a direct 5×5 convolution?

<details><summary>Solution</summary>

A direct 5×5 convolution does $`5 \times 5 = 25` multiply-accumulates per pixel. The separable version does two 1×5 passes: $`5 + 5 = 10` per pixel — a 2.5× speedup. The gain grows with kernel size: a $`k \times k` separable filter costs $`2k` vs $`k^2` directly.

</details>

</details>
