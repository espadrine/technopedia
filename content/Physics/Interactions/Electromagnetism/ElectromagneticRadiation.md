# Electromagnetic radiation

Electromagnetic radiation is the propagating-wave solution of Maxwell's equations in free space: coupled, self-sustaining electric and magnetic fields that carry energy and momentum at the speed of light $`c`. It is the same physical phenomenon at every scale — radio, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays differ only in frequency — and its quantum description is a stream of photons with energy $`E = h\nu`.

**When it is relevant.** Electromagnetic radiation is the carrier of essentially all long-range information and energy transfer in technology and nature. It is what you use for:

- **Communication** — radio, Wi-Fi, cellular, radar, and optical fiber.
- **Imaging** — X-ray and CT, optical cameras, infrared thermal imaging, and MRI (RF pulses).
- **Spectroscopy** — identifying materials by the frequencies they absorb or emit.
- **Heating and processing** — microwave ovens, infrared heaters, laser cutting.
- **Astronomy** — observing the universe across the whole spectrum, from pulsar radio to gamma-ray bursts.
- **Photodetection and energy** — solar cells, photodiodes, and photomultipliers.

It is the far-field, high-frequency limit of [Electrodynamics](./Electrodynamics.md) and a core part of [Electromagnetism](./Readme.md). How radiation *interacts with matter* (reflection, refraction, absorption, dispersion) is treated separately in [Electromagnetic Media](./ElectromagneticMedia.md); the general mathematics of waves (the wave equation, standing waves, beats) is treated in [Wave Propagation](../../Mechanics/Oscillations/Wave-Propagation.md).

> **Authoritative sources**
> - [Maxwell, A Dynamical Theory of the Electromagnetic Field (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)
> - [Hertz, experimental confirmation of electromagnetic waves (1887)](https://en.wikipedia.org/wiki/Heinrich_Hertz)
> - [Planck, quantum hypothesis (1900)](https://en.wikipedia.org/wiki/Planck%27s_law)

## Brief history

- **1865** — Maxwell unifies electricity, magnetism, and optics, predicting that light is a self-propagating electromagnetic wave.
- **1887** — Hertz generates and detects radio waves in the lab, confirming Maxwell's prediction.
- **1900** — Planck quantizes the energy of radiation, seeding the photon picture.
- **1895–1901** — Marconi turns the wave into practical long-distance radio communication.

## 1. The free-space electromagnetic wave

**Definition.** A plane wave in vacuum has electric and magnetic fields that are *transverse* (perpendicular to the direction of travel), mutually perpendicular, *in phase*, and related by a fixed ratio:

```math
\mathbf{E}(\mathbf{r},t)=\mathbf{E}_0\cos(\mathbf{k}\cdot\mathbf{r}-\omega t),\qquad
\mathbf{B}(\mathbf{r},t)=\mathbf{B}_0\cos(\mathbf{k}\cdot\mathbf{r}-\omega t)
```

with $`\mathbf{B}_0=\tfrac{1}{c}\,\hat{\mathbf{k}}\times\mathbf{E}_0`, so $`|\mathbf{E}_0|=c\,|\mathbf{B}_0|`, and $`\omega=c\,|\mathbf{k}|`.

<svg viewBox="0 0 600 210" width="100%" role="img" aria-label="Propagating plane wave with E and B fields in phase">
  <line x1="40" y1="105" x2="560" y2="105" stroke="#888" stroke-width="1" stroke-dasharray="4 4"/>
  <path d="M50.0,60.0 L54.2,61.7 L58.3,63.3 L62.5,65.0 L66.7,66.7 L70.8,68.3 L75.0,69.9 L79.2,71.5 L83.3,73.0 L87.5,74.5 L91.7,76.0 L95.8,77.4 L100.0,78.8 L104.2,80.1 L108.3,81.4 L112.5,82.6 L116.7,83.8 L120.8,84.9 L125.0,85.9 L129.2,86.8 L133.3,87.7 L137.5,88.5 L141.7,89.2 L145.8,89.9 L150.0,90.4 L154.2,90.9 L158.3,91.3 L162.5,91.6 L166.7,91.8 L170.8,92.0 L175.0,92.0 L179.2,92.0 L183.3,91.8 L187.5,91.6 L191.7,91.3 L195.8,90.9 L200.0,90.4 L204.2,89.9 L208.3,89.2 L212.5,88.5 L216.7,87.7 L220.8,86.8 L225.0,85.9 L229.2,84.9 L233.3,83.8 L237.5,82.6 L241.7,81.4 L245.8,80.1 L250.0,78.8 L254.2,77.4 L258.3,76.0 L262.5,74.5 L266.7,73.0 L270.8,71.5 L275.0,69.9 L279.2,68.3 L283.3,66.7 L287.5,65.0 L291.7,63.3 L295.8,61.7 L300.0,60.0 L304.2,58.3 L308.3,56.7 L312.5,55.0 L316.7,53.3 L320.8,51.7 L325.0,50.1 L329.2,48.5 L333.3,47.0 L337.5,45.5 L341.7,44.0 L345.8,42.6 L350.0,41.2 L354.2,39.9 L358.3,38.6 L362.5,37.4 L366.7,36.2 L370.8,35.1 L375.0,34.1 L379.2,33.2 L383.3,32.3 L387.5,31.5 L391.7,30.8 L395.8,30.1 L400.0,29.6 L404.2,29.1 L408.3,28.7 L412.5,28.4 L416.7,28.2 L420.8,28.0 L425.0,28.0 L429.2,28.0 L433.3,28.2 L437.5,28.4 L441.7,28.7 L445.8,29.1 L450.0,29.6 L454.2,30.1 L458.3,30.8 L462.5,31.5 L466.7,32.3 L470.8,33.2 L475.0,34.1 L479.2,35.1 L483.3,36.2 L487.5,37.4 L491.7,38.6 L495.8,39.9 L500.0,41.2 L504.2,42.6 L508.3,44.0 L512.5,45.5 L516.7,47.0 L520.8,48.5 L525.0,50.1 L529.2,51.7 L533.3,53.3 L537.5,55.0 L541.7,56.7 L545.8,58.3 L550.0,60.0" fill="none" stroke="#d33" stroke-width="2.5"/>
  <path d="M50.0,150.0 L54.2,151.7 L58.3,153.3 L62.5,155.0 L66.7,156.7 L70.8,158.3 L75.0,159.9 L79.2,161.5 L83.3,163.0 L87.5,164.5 L91.7,166.0 L95.8,167.4 L100.0,168.8 L104.2,170.1 L108.3,171.4 L112.5,172.6 L116.7,173.8 L120.8,174.9 L125.0,175.9 L129.2,176.8 L133.3,177.7 L137.5,178.5 L141.7,179.2 L145.8,179.9 L150.0,180.4 L154.2,180.9 L158.3,181.3 L162.5,181.6 L166.7,181.8 L170.8,182.0 L175.0,182.0 L179.2,182.0 L183.3,181.8 L187.5,181.6 L191.7,181.3 L195.8,180.9 L200.0,180.4 L204.2,179.9 L208.3,179.2 L212.5,178.5 L216.7,177.7 L220.8,176.8 L225.0,175.9 L229.2,174.9 L233.3,173.8 L237.5,172.6 L241.7,171.4 L245.8,170.1 L250.0,168.8 L254.2,167.4 L258.3,166.0 L262.5,164.5 L266.7,163.0 L270.8,161.5 L275.0,159.9 L279.2,158.3 L283.3,156.7 L287.5,155.0 L291.7,153.3 L295.8,151.7 L300.0,150.0 L304.2,148.3 L308.3,146.7 L312.5,145.0 L316.7,143.3 L320.8,141.7 L325.0,140.1 L329.2,138.5 L333.3,137.0 L337.5,135.5 L341.7,134.0 L345.8,132.6 L350.0,131.2 L354.2,129.9 L358.3,128.6 L362.5,127.4 L366.7,126.2 L370.8,125.1 L375.0,124.1 L379.2,123.2 L383.3,122.3 L387.5,121.5 L391.7,120.8 L395.8,120.1 L400.0,119.6 L404.2,119.1 L408.3,118.7 L412.5,118.4 L416.7,118.2 L420.8,118.0 L425.0,118.0 L429.2,118.0 L433.3,118.2 L437.5,118.4 L441.7,118.7 L445.8,119.1 L450.0,119.6 L454.2,120.1 L458.3,120.8 L462.5,121.5 L466.7,122.3 L470.8,123.2 L475.0,124.1 L479.2,125.1 L483.3,126.2 L487.5,127.4 L491.7,128.6 L495.8,129.9 L500.0,131.2 L504.2,132.6 L508.3,134.0 L512.5,135.5 L516.7,137.0 L520.8,138.5 L525.0,140.1 L529.2,141.7 L533.3,143.3 L537.5,145.0 L541.7,146.7 L545.8,148.3 L550.0,150.0" fill="none" stroke="#26c" stroke-width="2.5"/>
  <line x1="50" y1="105" x2="545" y2="105" stroke="#2a2" stroke-width="2"/>
  <polygon points="555,105 543,99 543,111" fill="#2a2"/>
  <text x="558" y="109" font-size="14" fill="#2a2">k</text>
  <text x="20" y="64" font-size="15" fill="#d33">E</text>
  <text x="20" y="154" font-size="15" fill="#26c">B</text>
  <text x="250" y="205" font-size="13" fill="#555">E and B are in phase, both ⊥ to propagation k</text>
</svg>

<details><summary>Details</summary>

**Step 1 — a self-sustaining feedback loop.** In free space there are no charges or currents. Two of Maxwell's equations then say: a *changing* magnetic field produces an electric field (Faraday's law), and a *changing* electric field produces a magnetic field (the Maxwell–Ampère term). Each field regenerates the other, and the pair detaches from its source and travels. This is the whole mechanism of radiation.

**Step 2 — the fields are transverse.** Take a wave moving in the $`+\hat{\mathbf{x}}` direction. Faraday's law forces $`\mathbf{E}` to point, say, along $`\hat{\mathbf{y}}`; the Maxwell–Ampère law then forces $`\mathbf{B}` along $`\hat{\mathbf{z}}`. So $`\mathbf{E}\perp\mathbf{B}\perp\mathbf{k}`: neither field has a component along the direction of travel. This is why light is a *transverse* wave, unlike a sound wave (a [longitudinal](../../Mechanics/Oscillations/Wave-Propagation.md) pressure wave).

**Step 3 — in phase, with a fixed ratio.** The two fields reach their maxima and zero-crossings at the same place and time, and their amplitudes obey $`|\mathbf{E}_0|=c\,|\mathbf{B}_0|`. The ratio $`E/B=c` is a fingerprint of a free-space wave: measure one field and you know the other.

*Example.* A plane wave in vacuum has $`E_0=300\ \text{V/m}`. Then $`B_0=E_0/c=300/(3.0\times10^8)=1.0\times10^{-6}\ \text{T}=1\ \mu\text{T}` — comparable to the Earth's magnetic field.

**Interactive:** drag the frequency slider to see the wavelength and the in-phase $`E`, $`B` fields, and the energy-flow (Poynting) direction.

<iframe src="./ElectromagneticRadiation.simulation.html" title="Propagating plane wave with adjustable frequency, showing E, B fields and the Poynting vector"></iframe>

> **Authoritative sources**
> - [Maxwell, A Dynamical Theory of the Electromagnetic Field (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)

<details><summary>Example problem</summary>

A plane electromagnetic wave in vacuum has a magnetic-field amplitude $`B_0 = 2.5\ \mu\text{T}`. What is the electric-field amplitude $`E_0`?

<details><summary>Solution</summary>

Use $`E_0 = c\,B_0`:

```math
E_0 = (3.0\times10^8\ \text{m/s})(2.5\times10^{-6}\ \text{T}) = 7.5\times10^2\ \text{V/m}
```

So $`E_0 \approx 750\ \text{V/m}`.
</details>
</details>

</details>

## 2. The wave equation

**Definition.** Taking the curl of Faraday's law and substituting the Maxwell–Ampère law turns the coupled field equations into a single wave equation for each field:

```math
\nabla^2 \mathbf{E} = \mu_0\varepsilon_0\,\frac{\partial^2 \mathbf{E}}{\partial t^2},\qquad
\nabla^2 \mathbf{B} = \mu_0\varepsilon_0\,\frac{\partial^2 \mathbf{B}}{\partial t^2}
```

whose propagation speed is $`v=1/\sqrt{\mu_0\varepsilon_0}=c\approx3.0\times10^8\ \text{m/s}`.

<details><summary>Details</summary>

**Step 1 — decouple the equations.** Start from Faraday's law $`\nabla\times\mathbf{E}=-\partial\mathbf{B}/\partial t`. Take the curl of both sides: $`\nabla\times(\nabla\times\mathbf{E})=-\partial(\nabla\times\mathbf{B})/\partial t`.

**Step 2 — substitute the source-free Maxwell–Ampère law.** In vacuum $`\nabla\times\mathbf{B}=\mu_0\varepsilon_0\,\partial\mathbf{E}/\partial t`, so the right side becomes $`-\mu_0\varepsilon_0\,\partial^2\mathbf{E}/\partial t^2`.

**Step 3 — use the vector identity.** With $`\nabla\cdot\mathbf{E}=0` in free space, $`\nabla\times(\nabla\times\mathbf{E})=-\nabla^2\mathbf{E}`. The two negatives cancel and you get the wave equation. The identical steps work for $`\mathbf{B}`.

**Step 4 — read off the speed.** The standard wave equation $`\nabla^2\psi=(1/v^2)\partial^2\psi/\partial t^2` has speed $`v=1/\sqrt{\mu_0\varepsilon_0}`. Plugging in $`\mu_0=4\pi\times10^{-7}\ \text{H/m}` and $`\varepsilon_0=8.85\times10^{-12}\ \text{F/m}` gives $`v\approx3.0\times10^8\ \text{m/s}` — the measured speed of light. This is the moment Maxwell recognized light as an electromagnetic wave.

The *general* solution of this equation (superposition, standing waves, beats, dispersion) is developed in [Wave Propagation](../../Mechanics/Oscillations/Wave-Propagation.md); the full field machinery and the near-field limit are in [Electrodynamics](./Electrodynamics.md). Here we only need the traveling-wave solution of Section 1.

> **Authoritative sources**
> - [Maxwell, A Dynamical Theory of the Electromagnetic Field (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)

<details><summary>Example problem</summary>

Show that the wave speed is $`c` by evaluating $`1/\sqrt{\mu_0\varepsilon_0}` with $`\mu_0=4\pi\times10^{-7}\ \text{H/m}` and $`\varepsilon_0=8.854\times10^{-12}\ \text{F/m}`.

<details><summary>Solution</summary>

```math
\mu_0\varepsilon_0 = (4\pi\times10^{-7})(8.854\times10^{-12}) \approx 1.113\times10^{-17}\ \text{s}^2/\text{m}^2
```

```math
c = \frac{1}{\sqrt{1.113\times10^{-17}}} \approx 2.998\times10^8\ \text{m/s}
```

which matches the measured speed of light to three figures.
</details>
</details>

</details>

## 3. Energy and momentum

**Definition.** The flow of electromagnetic energy is the **Poynting vector**

```math
\mathbf{S} = \frac{1}{\mu_0}\,\mathbf{E}\times\mathbf{B}
```

(pointing in the direction of propagation). Its time average is the **intensity** $`I=\langle S\rangle=\tfrac{1}{2}c\varepsilon_0 E_0^2=\tfrac{1}{2}E_0^2/(\mu_0 c)`. Because the wave carries momentum, it exerts **radiation pressure** $`p=I/c` on a perfect absorber and $`p=2I/c` on a perfect reflector.

<svg viewBox="0 0 340 220" width="300" role="img" aria-label="Poynting vector is the cross product of E and B">
  <line x1="170" y1="110" x2="170" y2="40" stroke="#d33" stroke-width="3"/>
  <polygon points="170,32 164,44 176,44" fill="#d33"/>
  <text x="178" y="45" font-size="15" fill="#d33">E</text>
  <line x1="170" y1="110" x2="250" y2="110" stroke="#26c" stroke-width="3"/>
  <polygon points="258,110 246,104 246,116" fill="#26c"/>
  <text x="252" y="100" font-size="15" fill="#26c">B</text>
  <line x1="170" y1="110" x2="110" y2="170" stroke="#2a2" stroke-width="3"/>
  <polygon points="104,176 118,172 112,162" fill="#2a2"/>
  <text x="70" y="185" font-size="15" fill="#2a2">S = E × B</text>
  <circle cx="170" cy="110" r="3" fill="#333"/>
  <text x="120" y="205" font-size="13" fill="#555">Energy flows along S = E × B</text>
</svg>

<details><summary>Details</summary>

**Step 1 — where the energy goes.** The Poynting vector $`\mathbf{S}=\tfrac{1}{\mu_0}\mathbf{E}\times\mathbf{B}` is the electromagnetic analogue of a fluid's velocity times density: it is power per unit area, and it points where the energy is going. For the plane wave of Section 1, $`\mathbf{E}\times\mathbf{B}` points exactly along $`\mathbf{k}`, so the energy travels with the wave.

**Step 2 — the intensity.** Because $`E` and $`B` oscillate, $`S` oscillates too. The physically relevant quantity is the cycle average. Using $`B=E/c` and $`\langle\cos^2\rangle=\tfrac12`:

```math
I=\langle S\rangle = \frac{1}{\mu_0 c}\,\frac{E_0^2}{2} = \frac{1}{2}c\varepsilon_0 E_0^2
```

*Example.* Sunlight at Earth has $`I\approx1360\ \text{W/m}^2`. The corresponding field amplitude is $`E_0=\sqrt{2I/(c\varepsilon_0)}\approx1.0\times10^3\ \text{V/m}` — a surprisingly large field for something that feels like a gentle warm glow.

**Step 3 — momentum and pressure.** A wave carrying energy $`U` at speed $`c` carries momentum $`p=U/c`. When it is absorbed, it hands that momentum to the surface, producing a pressure $`p_{\text{rad}}=I/c`; a mirror reverses the momentum, doubling the impulse to $`2I/c`. This is the principle behind solar sails.

> **Authoritative sources**
> - [Maxwell, A Dynamical Theory of the Electromagnetic Field (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)

<details><summary>Example problem</summary>

A laser beam of intensity $`I=10\ \text{W/m}^2` strikes a perfectly absorbing surface. What radiation pressure does it exert?

<details><summary>Solution</summary>

For a perfect absorber, $`p_{\text{rad}}=I/c`:

```math
p_{\text{rad}} = \frac{10\ \text{W/m}^2}{3.0\times10^8\ \text{m/s}} \approx 3.3\times10^{-8}\ \text{Pa}
```

Tiny, but real — it is the force that drives light sails and, on a cosmic scale, the pressure that shapes nebulae.
</details>
</details>

</details>

## 4. The electromagnetic spectrum

**Definition.** The spectrum is the full range of electromagnetic radiation ordered by frequency (or wavelength $`\lambda=c/\nu`). All bands are the *same* wave; only the frequency changes. The conventional bands are radio, microwave, infrared, visible, ultraviolet, X-ray, and gamma.

<svg viewBox="0 0 640 150" width="100%" role="img" aria-label="Electromagnetic spectrum bands from radio to gamma">
  <rect x="10"  y="40" width="150" height="40" fill="#7b4fb0"/>
  <rect x="160" y="40" width="110" height="40" fill="#3f7fbf"/>
  <rect x="270" y="40" width="110" height="40" fill="#c0392b"/>
  <rect x="380" y="40" width="70"  height="40" fill="#f1c40f"/>
  <rect x="450" y="40" width="80"  height="40" fill="#8e44ad"/>
  <rect x="530" y="40" width="60"  height="40" fill="#16a085"/>
  <rect x="590" y="40" width="40"  height="40" fill="#c0392b"/>
  <text x="85"  y="65" font-size="13" fill="#fff" text-anchor="middle">Radio</text>
  <text x="215" y="65" font-size="12" fill="#fff" text-anchor="middle">Microwave</text>
  <text x="325" y="65" font-size="12" fill="#fff" text-anchor="middle">Infrared</text>
  <text x="415" y="65" font-size="11" fill="#333" text-anchor="middle">Visible</text>
  <text x="490" y="65" font-size="12" fill="#fff" text-anchor="middle">UV</text>
  <text x="560" y="65" font-size="11" fill="#fff" text-anchor="middle">X-ray</text>
  <text x="610" y="65" font-size="10" fill="#fff" text-anchor="middle">γ</text>
  <line x1="10" y1="95" x2="630" y2="95" stroke="#333" stroke-width="1.5"/>
  <polygon points="630,95 620,90 620,100" fill="#333"/>
  <text x="10" y="115" font-size="12" fill="#555">long λ, low ν</text>
  <text x="560" y="115" font-size="12" fill="#555">short λ, high ν</text>
  <text x="250" y="140" font-size="12" fill="#555">ν increases →  (λ = c / ν)</text>
</svg>

<details><summary>Details</summary>

**Step 1 — one phenomenon, many names.** There is no physical boundary between "radio" and "microwave" or between "visible" and "ultraviolet"; the bands are human conventions chosen because different technologies and different interactions with matter dominate in each range. A 10 GHz microwave and a 10 PHz infrared wave are both just solutions of the same wave equation.

**Step 2 — the frequency–wavelength trade-off.** In vacuum $`\lambda=c/\nu`, so higher frequency always means shorter wavelength. Visible light is a narrow slice: roughly $`400`–$`700\ \text{nm}`, i.e. $`\nu\approx4.3\times10^{14}` to $`7.5\times10^{14}\ \text{Hz}`.

**Step 3 — why the bands matter.** The *interaction* with matter changes across the spectrum: radio waves pass through walls and drive antennas; microwaves rotate water molecules (heating); infrared matches molecular vibrational modes (thermal emission); visible matches electronic transitions in the eye and in pigments; X-rays and gamma rays are energetic enough to ionize atoms. Those material interactions are the subject of [Electromagnetic Media](./ElectromagneticMedia.md).

*Example.* A 915 MHz microwave (a common oven/RF band) has $`\lambda=c/\nu=3.0\times10^8/9.15\times10^8\approx0.33\ \text{m}` — about a third of a meter, which is why microwave cavities and antennas are that size.

> **Authoritative sources**
> - [Maxwell, A Dynamical Theory of the Electromagnetic Field (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)

<details><summary>Example problem</summary>

What is the wavelength of a 2.4 GHz Wi-Fi signal in vacuum?

<details><summary>Solution</summary>

```math
\lambda = \frac{c}{\nu} = \frac{3.0\times10^8\ \text{m/s}}{2.4\times10^9\ \text{Hz}} \approx 0.125\ \text{m} = 12.5\ \text{cm}
```

This is why 2.4 GHz antennas are on the order of a few centimeters to a decimeter long.
</details>
</details>

</details>

## 5. Polarization

**Definition.** Polarization describes how the electric field vector $`\mathbf{E}` is oriented as the wave passes a fixed point. The three canonical states are **linear** (tip of $`\mathbf{E}` traces a line), **circular** (traces a circle), and **elliptical** (traces an ellipse).

<svg viewBox="0 0 480 150" width="100%" role="img" aria-label="Linear, circular, and elliptical polarization states">
  <line x1="60" y1="75" x2="60" y2="20" stroke="#d33" stroke-width="3"/>
  <line x1="60" y1="75" x2="60" y2="130" stroke="#d33" stroke-width="3"/>
  <text x="45" y="148" font-size="12" fill="#555" text-anchor="middle">Linear</text>
  <circle cx="240" cy="75" r="45" fill="none" stroke="#26c" stroke-width="3"/>
  <polygon points="240,28 234,40 246,40" fill="#26c"/>
  <text x="240" y="148" font-size="12" fill="#555" text-anchor="middle">Circular</text>
  <ellipse cx="410" cy="75" rx="45" ry="25" fill="none" stroke="#2a2" stroke-width="3"/>
  <text x="410" y="148" font-size="12" fill="#555" text-anchor="middle">Elliptical</text>
</svg>

<details><summary>Details</summary>

**Step 1 — what is being polarized.** Only the *electric* field is usually meant, because $`\mathbf{E}` is what pushes charges in a detector. As the wave travels, watch the tip of the $`\mathbf{E}` vector at one fixed point in space.

**Step 2 — linear polarization.** If $`\mathbf{E}` always points along one fixed line (say $`\hat{\mathbf{y}}`), the tip traces a line. This is the simplest state and what a straight wire antenna naturally produces.

**Step 3 — circular and elliptical.** A general wave has two perpendicular components, $`E_x` and $`E_y`, that can differ in amplitude and phase. If they are equal in amplitude and $`90^\circ` out of phase, the tip traces a circle (circular polarization, left- or right-handed). If the amplitudes differ, the tip traces an ellipse. Linear and circular are the two special cases of the general elliptical state.

**Step 4 — why it matters.** Polarization is a degree of freedom you can use: polarizing sunglasses block one linear direction to cut glare; satellite and radio links use circular polarization to reject reflections; and the polarization of light from a star or galaxy carries information about magnetic fields and scattering.

*Example.* A wave with $`E_x=E_0\cos(kz-\omega t)` and $`E_y=E_0\sin(kz-\omega t)` has equal amplitudes and a $`90^\circ` phase difference, so it is circularly polarized.

> **Authoritative sources**
> - [Maxwell, A Dynamical Theory of the Electromagnetic Field (1865)](https://royalsocietypublishing.org/doi/10.1098/rspa.1865.0008)

<details><summary>Example problem</summary>

A wave has $`E_x=3\cos(kz-\omega t)` and $`E_y=3\sin(kz-\omega t)` (in V/m). What is its polarization, and what is the magnitude of $`\mathbf{E}` at any instant?

<details><summary>Solution</summary>

The two components have equal amplitude ($`3` V/m) and a $`90^\circ` phase difference, so the wave is **circularly polarized**. The magnitude is

```math
|\mathbf{E}| = \sqrt{E_x^2+E_y^2} = \sqrt{9\cos^2 + 9\sin^2} = 3\ \text{V/m}
```

constant in time — the hallmark of circular polarization.
</details>
</details>

</details>

## 6. Quantum description: photons

**Definition.** Electromagnetic radiation is quantized into **photons**, massless spin-1 quanta, each carrying energy $`E=h\nu=hc/\lambda` and momentum $`p=h/\lambda`.

<details><summary>Details</summary>

**Step 1 — from a continuous wave to discrete quanta.** Classically the wave's energy is continuous and set by its amplitude. Quantum mechanically, the energy of a mode of frequency $`\nu` comes in integer multiples of a single quantum, $`E=h\nu`, where $`h=6.626\times10^{-34}\ \text{J·s}` is Planck's constant. Each quantum is a photon.

**Step 2 — energy and momentum of one photon.** A photon of frequency $`\nu` has

```math
E = h\nu = \frac{hc}{\lambda},\qquad p = \frac{h}{\lambda}
```

and, being massless, always moves at $`c`. Higher frequency means a more energetic photon — this is why X-rays and gamma rays can ionize atoms while radio photons cannot.

**Step 3 — where the classical wave comes from.** A bright beam is simply an enormous number of photons; the classical intensity $`I` of Section 3 is the photon flux times the energy per photon. The full theory — photons as the quanta of the electromagnetic field, gauge symmetry, and the spin-1 nature — is developed in [Quantum Field Theory](../../Quantum-Mechanics/Quantum-Field-Theory.md). Here we only need the single-photon energy–frequency relation.

*Example.* A green photon of $`\lambda=550\ \text{nm}` has $`E=hc/\lambda=(6.626\times10^{-34})(3.0\times10^8)/(5.5\times10^{-7})\approx3.6\times10^{-19}\ \text{J}\approx2.3\ \text{eV}` — just enough to trigger the photoreceptor molecules in your eye.

> **Authoritative sources**
> - [Planck, quantum hypothesis (1900)](https://en.wikipedia.org/wiki/Planck%27s_law)
> - [Quantum Field Theory](../../Quantum-Mechanics/Quantum-Field-Theory.md)

<details><summary>Example problem</summary>

What is the energy, in electronvolts, of a photon of frequency $`\nu=1.0\times10^{15}\ \text{Hz}`?

<details><summary>Solution</summary>

```math
E = h\nu = (6.626\times10^{-34}\ \text{J·s})(1.0\times10^{15}\ \text{Hz}) = 6.63\times10^{-19}\ \text{J}
```

Converting with $`1\ \text{eV}=1.602\times10^{-19}\ \text{J}`:

```math
E = \frac{6.63\times10^{-19}}{1.602\times10^{-19}} \approx 4.1\ \text{eV}
```

This is in the ultraviolet, consistent with the spectrum in Section 4.
</details>
</details>

</details>

## 7. Generation and detection

**Definition.** Electromagnetic radiation is produced by **accelerating charges** and absorbed by driving charges. An **antenna** is a conductor that converts an oscillating current into a radiated wave (transmit) and a received wave into an oscillating current (receive); a **photodetector** converts photons into an electric signal via the photoelectric effect.

<details><summary>Details</summary>

**Step 1 — why accelerating charges radiate.** A charge at rest makes a static field; a charge moving at constant velocity drags its field along. But an *accelerated* charge (an oscillating current in an antenna) shakes its field, and that disturbance propagates outward at $`c` as a wave. This is the source term behind the free-space wave of Section 1. The full near-field and radiation-zone analysis lives in [Electrodynamics](./Electrodynamics.md).

**Step 2 — the antenna as a transducer.** A half-wave dipole driven by an AC current of frequency $`\nu` radiates a wave of that same frequency, with $`\lambda=c/\nu` setting the antenna's size. Reversing the roles, an incoming wave pushes the electrons in the antenna, producing a current you can amplify — the same device transmits and receives.

**Step 3 — detection.** At low frequencies the wave drives currents (antenna, radio receiver). At optical and higher frequencies the photons are energetic enough to eject electrons from a material — the photoelectric effect — which is how solar cells, photodiodes, and photomultipliers turn light into electricity.

*Example.* A 100 MHz FM radio wave has $`\lambda=3\ \text{m}`, so a half-wave dipole is about $`1.5\ \text{m}` long — exactly the scale of a car radio antenna.

> **Authoritative sources**
> - [Hertz, experimental confirmation of electromagnetic waves (1887)](https://en.wikipedia.org/wiki/Heinrich_Hertz)
> - [Electrodynamics](./Electrodynamics.md)

<details><summary>Example problem</summary>

A transmitting antenna radiates at $`\nu=10\ \text{MHz}`. What is the wavelength, and roughly how long should a half-wave dipole be?

<details><summary>Solution</summary>

```math
\lambda = \frac{c}{\nu} = \frac{3.0\times10^8}{1.0\times10^7} = 30\ \text{m}
```

A half-wave dipole is $`\lambda/2 \approx 15\ \text{m}` long.
</details>
</details>

</details>

## Quizz

<details><summary>Try it yourself</summary>

A monochromatic plane wave in vacuum has a frequency of $`\nu=6.0\times10^{14}\ \text{Hz}` and an electric-field amplitude $`E_0=100\ \text{V/m}`.

1. What is its wavelength, and which band of the spectrum is it in?
2. What is the magnetic-field amplitude $`B_0`?
3. What is its intensity $`I`?
4. What is the energy of a single photon of this wave, in eV?

<details><summary>Solution</summary>

1. $`\lambda=c/\nu=3.0\times10^8/6.0\times10^{14}=5.0\times10^{-7}\ \text{m}=500\ \text{nm}` — green **visible** light.
2. $`B_0=E_0/c=100/3.0\times10^8\approx3.3\times10^{-7}\ \text{T}`.
3. $`I=\tfrac12 c\varepsilon_0 E_0^2=\tfrac12(3.0\times10^8)(8.85\times10^{-12})(100)^2\approx1.3\times10^3\ \text{W/m}^2`.
4. $`E=h\nu=(6.626\times10^{-34})(6.0\times10^{14})=3.98\times10^{-19}\ \text{J}\approx2.5\ \text{eV}`.

</details>
</details>
