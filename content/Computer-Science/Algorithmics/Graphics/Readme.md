# Graphics

Computer graphics turns geometric and image data into pixels on a display. It is relevant whenever a scene must be drawn, an image processed, or a frame rendered in real time: from a 2D chart to a 3D game to a medical scan.

## Utility

- It represents shapes (geometry) so they can be transformed, measured, and tested.
- It turns geometry into pixels (rendering) at a target frame rate.
- It manipulates the resulting pixels (image processing) for color, filtering, and compression.

<details><summary>Details</summary>

The three subtopics below partition graphics by the *stage* of the pipeline. **Geometry** is the mathematical representation of shapes (what to draw); **rendering** is the process of turning that geometry into a color image (how to draw it); **image processing** is the manipulation of the resulting pixels (post-processing). Each builds on the previous: geometry supplies the primitives, rendering rasterizes or traces them into a framebuffer, and image processing refines the framebuffer before it reaches the display.

Graphics draws on [Mathematics](../../../Mathematics/Readme.md): linear algebra (transformations, projections) from [Algebraic and discrete mathematics](../../../Mathematics/Algebraic-and-discrete-mathematics/Readme.md), and calculus and differential geometry (curves, surfaces, shading) from [Analysis](../../../Mathematics/Analysis/Readme.md). It is constrained by [Computer Hardware](../../Computer-Hardware/Readme.md) (GPU, SIMD, memory bandwidth) and by [Information Theory](../../Information-Theory/Readme.md) (compression of images and video).

</details>

## History

- 1974: The Z-buffer (Watson) makes hidden-surface removal practical for real-time rendering.
- 1983: Whitted's ray tracing brings reflections and refractions into rendered images.
- 1997: Path tracing makes global illumination practical for offline rendering.
- 2010s: GPU compute (CUDA, compute shaders) turns the graphics pipeline into a general parallel engine.

## Classes

The three classes partition graphics by pipeline stage: geometry (what to draw), rendering (how to draw it), and image processing (refining the pixels).

<table>
<tr><th>Page</th><th>Core object</th><th>Key metric</th><th>Boundary</th></tr>
<tr><td><a href='./Geometry.md'>Geometry</a></td><td>Meshes, curves, surfaces, transformations</td><td>Vertex/face count, transform cost, memory</td><td>The mathematical representation of shapes; does not decide how to turn them into pixels</td></tr>
<tr><td><a href='./Rendering.md'>Rendering</a></td><td>Rasterization, ray tracing, shading, the framebuffer</td><td>Frame rate, image quality, fill rate</td><td>How to turn geometry into a color image; does not model the physical display or GPU</td></tr>
<tr><td><a href='./Image-Processing.md'>Image Processing</a></td><td>Color spaces, filters, resampling, compression</td><td>PSNR, filter cost, compression ratio</td><td>Manipulating the resulting pixels; does not decide what to draw</td></tr>
</table>

> **Authoritative sources**
> - [Computer Graphics: Principles and Practice (Hearn & Baker)](https://www.ics.uci.edu/~gopi/cgbook/)
> - [Real-Time Rendering (Akenine-Möller, Haines, Hoffman)](https://www.realtimerendering.com/)
