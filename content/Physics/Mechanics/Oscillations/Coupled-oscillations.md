# Coupled oscillations

Coupled oscillations describe two or more oscillators that interact, so that the motion of one affects the other. The system's behavior decomposes into **normal modes**: independent patterns of motion, each oscillating at its own frequency. This is relevant to molecular vibrations, phonons in crystals, coupled pendulums, and LC filter networks — anywhere energy sloshes between degrees of freedom.

> **Authoritative sources**
> - [Landau & Lifshitz, *Mechanics*, §23: Oscillations of systems with more than one degree of freedom](https://www.physics.msu.ru/eng/ll/)
> - [Physics LibreTexts, 8.4: Coupled Oscillators and Normal Modes](https://phys.libretexts.org/Courses/University_of_California_Davis/UCD%3A_Physics_9HA__Classical_Mechanics/8%3A_Small_Oscillations/8.4%3A_Coupled_Oscillators_and_Normal_Modes)
> - [MIT OpenCourseWare 8.03SC, Lecture 4: Coupled Oscillators, Normal Modes](https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-i-mechanical-vibrations-and-waves/lecture-4/)

## Two coupled oscillators

The canonical setup: two masses $`m_1` and $`m_2` attached to fixed walls by springs of stiffness $`k_1` and $`k_2`, and coupled to each other by a spring of stiffness $`k_c`:

<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg" style="max-width:600px;width:100%;background:#16213e;border-radius:6px">
  <rect x="22" y="55" width="8" height="90" fill="#555"/>
  <rect x="570" y="55" width="8" height="90" fill="#555"/>
  <g stroke="#555" stroke-width="1">
    <line x1="22" y1="60" x2="14" y2="68"/><line x1="22" y1="75" x2="14" y2="83"/><line x1="22" y1="90" x2="14" y2="98"/><line x1="22" y1="105" x2="14" y2="113"/><line x1="22" y1="120" x2="14" y2="128"/><line x1="22" y1="135" x2="14" y2="143"/>
    <line x1="578" y1="60" x2="586" y2="68"/><line x1="578" y1="75" x2="586" y2="83"/><line x1="578" y1="90" x2="586" y2="98"/><line x1="578" y1="105" x2="586" y2="113"/><line x1="578" y1="120" x2="586" y2="128"/><line x1="578" y1="135" x2="586" y2="143"/>
  </g>
  <polyline points="30,100 55,100 63,86 77,114 91,86 105,114 119,86 133,114 141,100 170,100" fill="none" stroke="#7ec8e3" stroke-width="2"/>
  <polyline points="230,100 250,100 258,86 272,114 286,86 300,114 314,86 328,114 336,100 370,100" fill="none" stroke="#f39c12" stroke-width="2"/>
  <polyline points="430,100 450,100 458,86 472,114 486,86 500,114 514,86 528,114 536,100 570,100" fill="none" stroke="#7ec8e3" stroke-width="2"/>
  <rect x="170" y="75" width="60" height="50" rx="4" fill="#e74c3c"/>
  <rect x="370" y="75" width="60" height="50" rx="4" fill="#3498db"/>
  <text x="200" y="106" fill="#fff" font-size="16" text-anchor="middle" font-family="sans-serif">m₁</text>
  <text x="400" y="106" fill="#fff" font-size="16" text-anchor="middle" font-family="sans-serif">m₂</text>
  <text x="100" y="72" fill="#7ec8e3" font-size="15" text-anchor="middle" font-family="serif" font-style="italic">k</text>
  <text x="300" y="72" fill="#f39c12" font-size="15" text-anchor="middle" font-family="serif" font-style="italic">k<tspan font-size="11" dy="3">c</tspan></text>
  <text x="500" y="72" fill="#7ec8e3" font-size="15" text-anchor="middle" font-family="serif" font-style="italic">k</text>
  <line x1="200" y1="150" x2="200" y2="172" stroke="#666" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="400" y1="150" x2="400" y2="172" stroke="#666" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="200" y1="165" x2="240" y2="165" stroke="#f39c12" stroke-width="2"/>
  <polygon points="240,165 232,161 232,169" fill="#f39c12"/>
  <line x1="400" y1="165" x2="440" y2="165" stroke="#f39c12" stroke-width="2"/>
  <polygon points="440,165 432,161 432,169" fill="#f39c12"/>
  <text x="248" y="170" fill="#f39c12" font-size="14" font-family="serif" font-style="italic">x₁</text>
  <text x="448" y="170" fill="#f39c12" font-size="14" font-family="serif" font-style="italic">x₂</text>
</svg>

Newton's second law on each mass gives two coupled equations, where each $`\ddot{x}_i` depends on *both* displacements through the coupling term $`k_c x_j`:

```math
m_1\ddot{x}_1 + (k_1 + k_c)x_1 - k_c x_2 = 0
```

```math
m_2\ddot{x}_2 + (k_2 + k_c)x_2 - k_c x_1 = 0
```

<details><summary>Details</summary>

**Matrix form.** With $`\mathbf{x} = (x_1, x_2)^T`, the equations become $`\mathbf{M}\ddot{\mathbf{x}} + \mathbf{K}\mathbf{x} = 0`, where $`\mathbf{M}` is the diagonal mass matrix and $`\mathbf{K}` the stiffness matrix. Trying a solution $`\mathbf{x}(t) = \mathbf{e}\,e^{i\omega t}` gives the eigenvalue problem $`\mathbf{M}^{-1}\mathbf{K}\,\mathbf{e} = \omega^2\mathbf{e}`: **the squares of the normal-mode frequencies are the eigenvalues of $`\mathbf{M}^{-1}\mathbf{K}`** (equivalently, the frequencies are the square roots of those eigenvalues), and the eigenvectors give the mode patterns. For $`N` coupled oscillators, $`\mathbf{M}^{-1}\mathbf{K}` is $`N \times N` and there are exactly $`N` normal modes.

**Symmetric case.** For $`m_1 = m_2 = m` and $`k_1 = k_2 = k`, the eigenvectors are $`(1, 1)` and $`(1, -1)`, giving the two normal frequencies:

```math
\omega_+ = \sqrt{\frac{k}{m}} \qquad \omega_- = \sqrt{\frac{k + 2k_c}{m}}
```

The **in-phase mode** ($`x_1 = x_2`, eigenvector $`(1,1)`): the coupling spring is never stretched, so it exerts no force — each mass oscillates as if the other were absent, at the bare frequency $`\sqrt{k/m}`. The **out-of-phase mode** ($`x_1 = -x_2`, eigenvector $`(1,-1)`): the coupling spring is stretched twice as much as either outer spring per unit displacement, adding $`2k_c` to the effective stiffness, so the frequency rises to $`\sqrt{(k+2k_c)/m}`.

<details><summary>Example problem</summary>

Take $`m_1 = 2` kg, $`m_2 = 1` kg, $`k_1 = k_2 = 0` (masses connected only to each other by $`k_c = 10` N/m, free to translate). Show that one normal mode has $`\omega = 0`. **Solution:** the stiffness matrix is $`\begin{pmatrix} k_c & -k_c \\ -k_c & k_c \end{pmatrix}`; the vector $`(1,1)` is an eigenvector with eigenvalue 0 — the whole pair translates freely, with no restoring force. This zero-frequency mode is the discrete analogue of a sound wave's long-wavelength limit.

</details>

</details>

## Normal modes

A normal mode is a pattern in which all parts oscillate at the *same* frequency with *fixed* relative amplitudes. Any motion of the system — however complicated — is a superposition of the normal modes:

```math
x_i(t) = \sum_{n} A_n\, e_i^{(n)} \cos(\omega_n t + \phi_n)
```

where $`e_i^{(n)}` is the $`i`-th component of the $`n`-th eigenvector (the mode pattern) and $`A_n, \phi_n` are set by the initial conditions.

For the symmetric two-mass system, the two mode patterns are:

<svg viewBox="0 0 620 170" xmlns="http://www.w3.org/2000/svg" style="max-width:620px;width:100%;background:#16213e;border-radius:6px">
  <text x="150" y="24" fill="#7ec8e3" font-size="15" text-anchor="middle" font-family="sans-serif">In-phase: x₁ = x₂, frequency ω₊</text>
  <rect x="12" y="55" width="6" height="60" fill="#555"/>
  <polyline points="18,85 40,85 48,73 60,97 72,73 84,97 96,73 104,85 120,85" fill="none" stroke="#7ec8e3" stroke-width="2"/>
  <polyline points="180,85 200,85 208,73 220,97 232,73 244,97 256,73 264,85 280,85" fill="none" stroke="#f39c12" stroke-width="2"/>
  <rect x="120" y="65" width="60" height="40" rx="4" fill="#e74c3c"/>
  <rect x="280" y="65" width="60" height="40" rx="4" fill="#3498db"/>
  <line x1="150" y1="45" x2="190" y2="45" stroke="#f39c12" stroke-width="2"/>
  <polygon points="190,45 182,41 182,49" fill="#f39c12"/>
  <line x1="310" y1="45" x2="350" y2="45" stroke="#f39c12" stroke-width="2"/>
  <polygon points="350,45 342,41 342,49" fill="#f39c12"/>
  <text x="150" y="135" fill="#aaa" font-size="13" text-anchor="middle" font-family="sans-serif">both masses move together:</text>
  <text x="150" y="153" fill="#aaa" font-size="13" text-anchor="middle" font-family="sans-serif">coupling spring unstretched</text>
  <polyline points="500,85 515,85 523,73 535,97 547,73 552,85 560,85" fill="none" stroke="#f39c12" stroke-width="2"/>
  <rect x="440" y="65" width="60" height="40" rx="4" fill="#e74c3c"/>
  <rect x="560" y="65" width="60" height="40" rx="4" fill="#3498db"/>
  <line x1="470" y1="45" x2="510" y2="45" stroke="#f39c12" stroke-width="2"/>
  <polygon points="510,45 502,41 502,49" fill="#f39c12"/>
  <line x1="590" y1="45" x2="550" y2="45" stroke="#f39c12" stroke-width="2"/>
  <polygon points="550,45 558,41 558,49" fill="#f39c12"/>
  <text x="470" y="135" fill="#aaa" font-size="13" text-anchor="middle" font-family="sans-serif">masses move oppositely:</text>
  <text x="470" y="153" fill="#aaa" font-size="13" text-anchor="middle" font-family="sans-serif">coupling spring stretched, higher ω</text>
</svg>

<details><summary>Details</summary>

**Why eigenvectors?** In a mode, the ratio $`x_1/x_2` stays constant in time — that is the defining property of an eigenvector. Only then can both masses share a single $`\cos(\omega_n t)` factor. Any other motion mixes the two modes, so the ratio changes in time.

**Orthogonality.** Modes with different frequencies are orthogonal with respect to the mass matrix: $`\sum_i M_i\, e_i^{(n)} e_i^{(m)} = 0` for $`n \neq m`. This lets you project any initial condition onto the modes independently, exactly like a Fourier decomposition (see [Wave propagation](./Wave-Propagation.md)).

**Physical picture.** In the in-phase mode the coupling spring does no work, so the mode cannot exchange energy with anything — it oscillates in isolation. In the out-of-phase mode the coupling spring alternately stores and releases energy, adding stiffness and raising the frequency. Coupling always splits the frequencies apart: degenerate identical oscillators become $`\omega_+` and $`\omega_- \gt \omega_+`.

<details><summary>Example problem</summary>

A symmetric system with $`k = 25` N/m, $`k_c = 3` N/m, $`m = 1` kg starts at rest with $`x_1 = 2` cm, $`x_2 = 0`. Decompose into modes. **Solution:** $`(2, 0) = (1,1) + (1,-1)`, so $`A_+ = A_- = 2/\sqrt{2}` cm in normalized eigenvectors — equal parts of each mode. Since the mode frequencies are close ($`\omega_+ = 5` rad/s, $`\omega_- = \sqrt{31} \approx 5.57` rad/s), the two mode superpositions drift in and out of phase, producing beats (next section).

</details>

</details>

## Energy exchange and beats

If the excitation is not a pure mode — say mass 1 is displaced by $`A` and released from rest while mass 2 is held at 0 — the motion is an equal superposition of both modes:

```math
x_1(t) = \frac{A}{2}\bigl[\cos(\omega_+ t) + \cos(\omega_- t)\bigr]
```

```math
x_2(t) = \frac{A}{2}\bigl[\cos(\omega_+ t) - \cos(\omega_- t)\bigr]
```

<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;width:100%;background:#16213e;border-radius:6px">
  <line x1="50" y1="110" x2="665" y2="110" stroke="#444" stroke-width="1"/>
  <line x1="50" y1="20" x2="50" y2="200" stroke="#444" stroke-width="1"/>
  <path d="M60 40.0 L62 40.5 L64 42.1 L66 44.7 L68 48.2 L70 52.7 L72 58.0 L74 64.0 L76 70.7 L78 78.0 L80 85.6 L82 93.6 L84 101.7 L86 109.9 L88 118.0 L90 125.8 L92 133.3 L94 140.4 L96 146.9 L98 152.8 L100 157.9 L102 162.2 L104 165.6 L106 168.1 L108 169.7 L110 170.4 L112 170.1 L114 168.9 L116 166.9 L118 164.1 L120 160.5 L122 156.3 L124 151.5 L126 146.2 L128 140.5 L130 134.6 L132 128.5 L134 122.3 L136 116.2 L138 110.2 L140 104.5 L142 99.2 L144 94.2 L146 89.7 L148 85.8 L150 82.5 L152 79.8 L154 77.7 L156 76.3 L158 75.5 L160 75.4 L162 75.8 L164 76.8 L166 78.3 L168 80.2 L170 82.5 L172 85.1 L174 87.9 L176 90.9 L178 94.0 L180 97.0 L182 100.0 L184 102.8 L186 105.4 L188 107.8 L190 109.9 L192 111.6 L194 113.0 L196 113.9 L198 114.5 L200 114.8 L202 114.6 L204 114.2 L206 113.4 L208 112.4 L210 111.2 L212 109.8 L214 108.4 L216 106.9 L218 105.5 L220 104.2 L222 103.1 L224 102.1 L226 101.5 L228 101.2 L230 101.2 L232 101.6 L234 102.4 L236 103.7 L238 105.3 L240 107.3 L242 109.7 L244 112.5 L246 115.5 L248 118.8 L250 122.2 L252 125.8 L254 129.4 L256 132.9 L258 136.3 L260 139.5 L262 142.4 L264 144.9 L266 146.9 L268 148.5 L270 149.5 L272 149.8 L274 149.5 L276 148.5 L278 146.8 L280 144.4 L282 141.3 L284 137.6 L286 133.2 L288 128.3 L290 122.9 L292 117.0 L294 110.8 L296 104.4 L298 97.8 L300 91.2 L302 84.6 L304 78.3 L306 72.3 L308 66.7 L310 61.6 L312 57.1 L314 53.3 L316 50.4 L318 48.2 L320 47.0 L322 46.7 L324 47.4 L326 49.0 L328 51.6 L330 55.2 L332 59.6 L334 64.8 L336 70.9 L338 77.5 L340 84.8 L342 92.4 L344 100.5 L346 108.7 L348 117.0 L350 125.3 L352 133.4 L354 141.2 L356 148.5 L358 155.3 L360 161.4 L362 166.8 L364 171.3 L366 174.9 L368 177.5 L370 179.1 L372 179.7 L374 179.2 L376 177.7 L378 175.2 L380 171.7 L382 167.4 L384 162.2 L386 156.2 L388 149.7 L390 142.6 L392 135.1 L394 127.3 L396 119.4 L398 111.4 L400 103.6 L402 96.0 L404 88.7 L406 81.8 L408 75.6 L410 69.9 L412 65.0 L414 60.9 L416 57.6 L418 55.2 L420 53.7 L422 53.0 L424 53.3 L426 54.4 L428 56.3 L430 59.0 L432 62.4 L434 66.3 L436 70.8 L438 75.8 L440 81.1 L442 86.6 L444 92.2 L446 97.9 L448 103.5 L450 108.9 L452 114.1 L454 118.9 L456 123.3 L458 127.3 L460 130.7 L462 133.6 L464 135.9 L466 137.6 L468 138.7 L470 139.3 L472 139.2 L474 138.7 L476 137.7 L478 136.2 L480 134.4 L482 132.3 L484 130.0 L486 127.5 L488 125.0 L490 122.4 L492 119.9 L494 117.5 L496 115.3 L498 113.3 L500 111.6 L502 110.3 L504 109.3 L506 108.6 L508 108.3 L510 108.3 L512 108.7 L514 109.4 L516 110.4 L518 111.6 L520 113.0 L522 114.5 L524 116.1 L526 117.6 L528 119.2 L530 120.6 L532 121.8 L534 122.7 L536 123.4 L538 123.7 L540 123.6 L542 123.1 L544 122.2 L546 120.8 L548 118.9 L550 116.6 L552 114.0 L554 110.9 L556 107.5 L558 103.8 L560 99.9 L562 95.8 L564 91.7 L566 87.6 L568 83.6 L570 79.8 L572 76.3 L574 73.1 L576 70.4 L578 68.2 L580 66.6 L582 65.6 L584 65.3 L586 65.7 L588 66.9 L590 68.8 L592 71.5 L594 74.9 L596 79.0 L598 83.8 L600 89.2 L602 95.0 L604 101.3 L606 108.0 L608 114.9 L610 121.9 L612 128.9 L614 135.8 L616 142.5 L618 148.9 L620 154.8 L622 160.1 L624 164.8 L626 168.8 L628 171.9 L630 174.1 L632 175.4 L634 175.7 L636 175.0 L638 173.4 L640 170.7" fill="none" stroke="#e74c3c" stroke-width="1.5"/>
  <path d="M60 40.0 L62 40.0 L64 40.1 L66 40.1 L68 40.2 L70 40.4 L72 40.5 L74 40.7 L76 41.0 L78 41.2 L80 41.5 L82 41.8 L84 42.1 L86 42.5 L88 42.9 L90 43.3 L92 43.8 L94 44.3 L96 44.8 L98 45.3 L100 45.9 L102 46.5 L104 47.1 L106 47.8 L108 48.5 L110 49.2 L112 49.9 L114 50.7 L116 51.4 L118 52.2 L120 53.1 L122 53.9 L124 54.8 L126 55.7 L128 56.6 L130 57.6 L132 58.6 L134 59.5 L136 60.6 L138 61.6 L140 62.7 L142 63.7 L144 64.8 L146 65.9 L148 67.1 L150 68.2 L152 69.4 L154 70.6 L156 71.8 L158 73.0 L160 74.3 L162 75.5 L164 76.8 L166 78.1 L168 79.4 L170 80.7 L172 82.0 L174 83.3 L176 84.7 L178 86.0 L180 87.4 L182 88.8 L184 90.2 L186 91.6 L188 93.0 L190 94.4 L192 95.8 L194 97.2 L196 98.6 L198 100.1 L200 101.5 L202 102.9 L204 104.4 L206 105.8 L208 107.3 L210 108.7 L212 109.8 L214 108.4 L216 106.9 L218 105.5 L220 104.0 L222 102.6 L224 101.2 L226 99.7 L228 98.3 L230 96.9 L232 95.4 L234 94.0 L236 92.6 L238 91.2 L240 89.8 L242 88.5 L244 87.1 L246 85.7 L248 84.4 L250 83.0 L252 81.7 L254 80.4 L256 79.1 L258 77.8 L260 76.5 L262 75.2 L264 74.0 L266 72.7 L268 71.5 L270 70.3 L272 69.1 L274 68.0 L276 66.8 L278 65.7 L280 64.6 L282 63.5 L284 62.4 L286 61.4 L288 60.3 L290 59.3 L292 58.3 L294 57.4 L296 56.4 L298 55.5 L300 54.6 L302 53.7 L304 52.9 L306 52.0 L308 51.2 L310 50.5 L312 49.7 L314 49.0 L316 48.3 L318 47.6 L320 47.0 L322 46.4 L324 45.8 L326 45.2 L328 44.7 L330 44.2 L332 43.7 L334 43.2 L336 42.8 L338 42.4 L340 42.1 L342 41.7 L344 41.4 L346 41.1 L348 40.9 L350 40.7 L352 40.5 L354 40.3 L356 40.2 L358 40.1 L360 40.0 L362 40.0 L364 40.0 L366 40.0 L368 40.1 L370 40.2 L372 40.3 L374 40.4 L376 40.6 L378 40.8 L380 41.0 L382 41.3 L384 41.6 L386 41.9 L388 42.2 L390 42.6 L392 43.0 L394 43.5 L396 43.9 L398 44.4 L400 44.9 L402 45.5 L404 46.0 L406 46.7 L408 47.3 L410 47.9 L412 48.6 L414 49.3 L416 50.1 L418 50.8 L420 51.6 L422 52.4 L424 53.3 L426 54.1 L428 55.0 L430 55.9 L432 56.9 L434 57.8 L436 58.8 L438 59.8 L440 60.8 L442 61.8 L444 62.9 L446 64.0 L448 65.1 L450 66.2 L452 67.3 L454 68.5 L456 69.7 L458 70.9 L460 72.1 L462 73.3 L464 74.6 L466 75.8 L468 77.1 L470 78.4 L472 79.7 L474 81.0 L476 82.3 L478 83.6 L480 85.0 L482 86.3 L484 87.7 L486 89.1 L488 90.5 L490 91.9 L492 93.3 L494 94.7 L496 96.1 L498 97.5 L500 99.0 L502 100.4 L504 101.8 L506 103.3 L508 104.7 L510 106.2 L512 107.6 L514 109.1 L516 109.5 L518 108.0 L520 106.6 L522 105.2 L524 103.7 L526 102.3 L528 100.8 L530 99.4 L532 98.0 L534 96.5 L536 95.1 L538 93.7 L540 92.3 L542 90.9 L544 89.5 L546 88.1 L548 86.8 L550 85.4 L552 84.0 L554 82.7 L556 81.4 L558 80.1 L560 78.8 L562 77.5 L564 76.2 L566 74.9 L568 73.7 L570 72.5 L572 71.2 L574 70.0 L576 68.9 L578 67.7 L580 66.6 L582 65.4 L584 64.3 L586 63.2 L588 62.2 L590 61.1 L592 60.1 L594 59.1 L596 58.1 L598 57.1 L600 56.2 L602 55.3 L604 54.4 L606 53.5 L608 52.7 L610 51.9 L612 51.1 L614 50.3 L616 49.6 L618 48.8 L620 48.1 L622 47.5 L624 46.8 L626 46.2 L628 45.6 L630 45.1 L632 44.6 L634 44.1 L636 43.6 L638 43.1 L640 42.7" fill="none" stroke="#f39c12" stroke-width="1.5" stroke-dasharray="6 4"/>
  <path d="M60 180.0 L62 180.0 L64 179.9 L66 179.9 L68 179.8 L70 179.6 L72 179.5 L74 179.3 L76 179.0 L78 178.8 L80 178.5 L82 178.2 L84 177.9 L86 177.5 L88 177.1 L90 176.7 L92 176.2 L94 175.7 L96 175.2 L98 174.7 L100 174.1 L102 173.5 L104 172.9 L106 172.2 L108 171.5 L110 170.8 L112 170.1 L114 169.3 L116 168.6 L118 167.8 L120 166.9 L122 166.1 L124 165.2 L126 164.3 L128 163.4 L130 162.4 L132 161.4 L134 160.5 L136 159.4 L138 158.4 L140 157.3 L142 156.3 L144 155.2 L146 154.1 L148 152.9 L150 151.8 L152 150.6 L154 149.4 L156 148.2 L158 147.0 L160 145.7 L162 144.5 L164 143.2 L166 141.9 L168 140.6 L170 139.3 L172 138.0 L174 136.7 L176 135.3 L178 134.0 L180 132.6 L182 131.2 L184 129.8 L186 128.4 L188 127.0 L190 125.6 L192 124.2 L194 122.8 L196 121.4 L198 119.9 L200 118.5 L202 117.1 L204 115.6 L206 114.2 L208 112.7 L210 111.3 L212 110.2 L214 111.6 L216 113.1 L218 114.5 L220 116.0 L222 117.4 L224 118.8 L226 120.3 L228 121.7 L230 123.1 L232 124.6 L234 126.0 L236 127.4 L238 128.8 L240 130.2 L242 131.5 L244 132.9 L246 134.3 L248 135.6 L250 137.0 L252 138.3 L254 139.6 L256 140.9 L258 142.2 L260 143.5 L262 144.8 L264 146.0 L266 147.3 L268 148.5 L270 149.7 L272 150.9 L274 152.0 L276 153.2 L278 154.3 L280 155.4 L282 156.5 L284 157.6 L286 158.6 L288 159.7 L290 160.7 L292 161.7 L294 162.6 L296 163.6 L298 164.5 L300 165.4 L302 166.3 L304 167.1 L306 168.0 L308 168.8 L310 169.5 L312 170.3 L314 171.0 L316 171.7 L318 172.4 L320 173.0 L322 173.6 L324 174.2 L326 174.8 L328 175.3 L330 175.8 L332 176.3 L334 176.8 L336 177.2 L338 177.6 L340 177.9 L342 178.3 L344 178.6 L346 178.9 L348 179.1 L350 179.3 L352 179.5 L354 179.7 L356 179.8 L358 179.9 L360 180.0 L362 180.0 L364 180.0 L366 180.0 L368 179.9 L370 179.8 L372 179.7 L374 179.6 L376 179.4 L378 179.2 L380 179.0 L382 178.7 L384 178.4 L386 178.1 L388 177.8 L390 177.4 L392 177.0 L394 176.5 L396 176.1 L398 175.6 L400 175.1 L402 174.5 L404 174.0 L406 173.3 L408 172.7 L410 172.1 L412 171.4 L414 170.7 L416 169.9 L418 169.2 L420 168.4 L422 167.6 L424 166.7 L426 165.9 L428 165.0 L430 164.1 L432 163.1 L434 162.2 L436 161.2 L438 160.2 L440 159.2 L442 158.2 L444 157.1 L446 156.0 L448 154.9 L450 153.8 L452 152.7 L454 151.5 L456 150.3 L458 149.1 L460 147.9 L462 146.7 L464 145.4 L466 144.2 L468 142.9 L470 141.6 L472 140.3 L474 139.0 L476 137.7 L478 136.4 L480 135.0 L482 133.7 L484 132.3 L486 130.9 L488 129.5 L490 128.1 L492 126.7 L494 125.3 L496 123.9 L498 122.5 L500 121.0 L502 119.6 L504 118.2 L506 116.7 L508 115.3 L510 113.8 L512 112.4 L514 110.9 L516 110.5 L518 112.0 L520 113.4 L522 114.8 L524 116.3 L526 117.7 L528 119.2 L530 120.6 L532 122.0 L534 123.5 L536 124.9 L538 126.3 L540 127.7 L542 129.1 L544 130.5 L546 131.9 L548 133.2 L550 134.6 L552 136.0 L554 137.3 L556 138.6 L558 139.9 L560 141.2 L562 142.5 L564 143.8 L566 145.1 L568 146.3 L570 147.5 L572 148.8 L574 150.0 L576 151.1 L578 152.3 L580 153.4 L582 154.6 L584 155.7 L586 156.8 L588 157.8 L590 158.9 L592 159.9 L594 160.9 L596 161.9 L598 162.9 L600 163.8 L602 164.7 L604 165.6 L606 166.5 L608 167.3 L610 168.1 L612 168.9 L614 169.7 L616 170.4 L618 171.2 L620 171.9 L622 172.5 L624 173.2 L626 173.8 L628 174.4 L630 174.9 L632 175.4 L634 175.9 L636 176.4 L638 176.9 L640 177.3" fill="none" stroke="#f39c12" stroke-width="1.5" stroke-dasharray="6 4"/>
  <line x1="206" y1="30" x2="206" y2="190" stroke="#888" stroke-width="1" stroke-dasharray="3 4"/>
  <line x1="499" y1="30" x2="499" y2="190" stroke="#888" stroke-width="1" stroke-dasharray="3 4"/>
  <text x="206" y="205" fill="#888" font-size="12" text-anchor="middle" font-family="sans-serif">t = π/(ω₋−ω₊): all energy on m₂</text>
  <text x="499" y="205" fill="#888" font-size="12" text-anchor="middle" font-family="sans-serif">t = 2π/(ω₋−ω₊): back on m₁</text>
  <text x="60" y="32" fill="#e74c3c" font-size="13" font-family="sans-serif">x₁(t)</text>
  <text x="120" y="60" fill="#f39c12" font-size="13" font-family="sans-serif">envelope ±A cos[(ω₋−ω₊)t/2]</text>
  <text x="655" y="125" fill="#aaa" font-size="13" text-anchor="end" font-family="serif" font-style="italic">t</text>
</svg>

<details><summary>Details</summary>

**Sum-to-product form.** Applying the identities $`\cos\alpha + \cos\beta = 2\cos\frac{\alpha-\beta}{2}\cos\frac{\alpha+\beta}{2}` and $`\cos\alpha - \cos\beta = -2\sin\frac{\alpha-\beta}{2}\sin\frac{\alpha+\beta}{2}`:

```math
x_1(t) = A\cos\!\Bigl(\frac{\omega_- - \omega_+}{2}\,t\Bigr)\cos\!\Bigl(\frac{\omega_+ + \omega_-}{2}\,t\Bigr)
```

```math
x_2(t) = A\sin\!\Bigl(\frac{\omega_- - \omega_+}{2}\,t\Bigr)\sin\!\Bigl(\frac{\omega_+ + \omega_-}{2}\,t\Bigr)
```

Each mass oscillates rapidly at the average frequency $`(\omega_+ + \omega_-)/2`, under a slowly varying envelope of angular frequency $`(\omega_- - \omega_+)/2`. The two envelopes are in quadrature: when $`|\cos|` is maximal for mass 1, $`|\sin|` is zero for mass 2.

**Beat frequency.** The envelope amplitude repeats at the **beat frequency**

```math
f_{beat} = \frac{|\omega_- - \omega_+|}{2\pi}
```

— the same formula as the beats heard between two detuned tuning forks, and the same interference mathematics as in [Wave propagation](./Wave-Propagation.md).

**Energy transfer period.** The *energy* on each mass is proportional to the envelope *squared*, $`\cos^2\!\bigl(\frac{\omega_- - \omega_+}{2}t\bigr)` and $`\sin^2\!\bigl(\frac{\omega_- - \omega_+}{2}t\bigr)`. Squaring doubles the angular frequency, so the energy sloshes completely from mass 1 to mass 2 and back with period

```math
T_{transfer} = \frac{2\pi}{\omega_- - \omega_+} = \frac{1}{f_{beat}}
```

At $`t = \pi/(\omega_- - \omega_+)` (half period), mass 1 is momentarily at rest with zero energy and mass 2 carries all of it; at $`t = 2\pi/(\omega_- - \omega_+)` the energy is back on mass 1. Total energy is conserved — the coupling spring is the pipe through which it flows.

<details><summary>Example problem</summary>

Two identical pendulums ($`m = 0.5` kg each, $`L = 1` m, so $`\omega_0 = \sqrt{g/L} \approx 3.13` rad/s) are coupled by a weak spring that raises the antisymmetric frequency to $`\omega_- = 3.33` rad/s. One pendulum is released from rest at $`5` cm. How long until the *other* pendulum swings at full amplitude? **Solution:** $`T_{transfer} = 2\pi/(3.33 - 3.13) = 2\pi/0.20 \approx 31` s. The beat frequency is $`f_{beat} = 0.20/(2\pi) \approx 0.032` Hz — slow energy exchange is the signature of weak coupling.

</details>

</details>

<iframe src="./Coupled-oscillations.simulation.html" title="Interactive simulation of two coupled oscillators showing normal modes and beats" style="width:100%;height:640px;border:none;border-radius:6px"></iframe>

## Extension to N oscillators and waves

Couple $`N` identical masses (spacing $`a`) with springs $`k` to their neighbors, plus a weak coupling $`k_c` (with $`\epsilon = k_c/k`), and the $`N` normal frequencies form a *band* indexed by a wavenumber $`k_n = n\pi/(N a)`:

```math
\omega(k) = \omega_0\sqrt{1 + 2\epsilon\bigl(1 - \cos(ka)\bigr)}, \qquad \omega_0 = \sqrt{\frac{k}{m}}
```

<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" style="max-width:640px;width:100%;background:#16213e;border-radius:6px">
  <text x="150" y="22" fill="#7ec8e3" font-size="14" text-anchor="middle" font-family="sans-serif">chain of N coupled masses</text>
  <g stroke="#7ec8e3" stroke-width="1.5" fill="none">
    <polyline points="60,45 72,38 84,52 96,38 108,52 120,38 126,45"/>
    <polyline points="150,45 162,38 174,52 186,38 198,52 210,38 216,45"/>
    <polyline points="240,45 252,38 264,52 276,38 288,52 300,38 306,45"/>
  </g>
  <g fill="#e74c3c">
  <text x="150" y="185" fill="#aaa" font-size="12" text-anchor="middle" font-family="serif" font-style="italic">k = 0</text>
  <text x="420" y="185" fill="#aaa" font-size="12" text-anchor="middle" font-family="serif" font-style="italic">k = π/a</text>
  <line x1="130" y1="110" x2="130" y2="200" stroke="#444" stroke-width="1"/>
  <line x1="130" y1="170" x2="440" y2="170" stroke="#444" stroke-width="1"/>
  <path d="M150,170 164,169 177,167 191,163 204,158 218,152 231,144 245,137 258,128 272,120 285,111 299,103 312,95 326,87 339,80 353,74 366,69 380,65 393,62 407,61 420,60" fill="none" stroke="#f39c12" stroke-width="2"/>
  <line x1="130" y1="170" x2="150" y2="170" stroke="#4caf50" stroke-width="2"/>
  <text x="124" y="174" fill="#4caf50" font-size="13" text-anchor="end" font-family="serif" font-style="italic">ω₀</text>
  <text x="124" y="64" fill="#4caf50" font-size="13" text-anchor="end" font-family="serif" font-style="italic">ωₘₐₓ</text>
  <text x="285" y="200" fill="#aaa" font-size="13" text-anchor="middle" font-family="serif" font-style="italic">ka</text>
  <text x="470" y="120" fill="#f39c12" font-size="13" font-family="sans-serif">ω(k) band:</text>
  <text x="470" y="138" fill="#f39c12" font-size="13" font-family="sans-serif">N discrete modes</text>
  <text x="470" y="156" fill="#f39c12" font-size="13" font-family="sans-serif">fill this curve</text>
  <text x="470" y="138" fill="#f39c12" font-size="13" font-family="sans-serif">N discrete modes</text>
  <text x="470" y="156" fill="#f39c12" font-size="13" font-family="sans-serif">fill this curve</text>
</svg>

In the limit $`N \to \infty`, the discrete modes fill the curve densely and the system is described by the [wave equation](./Wave-Propagation.md) — a continuous medium instead of a chain of masses.

<details><summary>Details</summary>

**The bridge from particles to fields.** The ladder is:

- 2 coupled masses → 2 normal modes (two discrete frequencies).
- $`N` coupled masses → $`N` normal modes, whose frequencies fill the band $`\omega(k)` between $`\omega_0` (in-phase, $`k = 0`) and $`\omega_0\sqrt{1 + 4\epsilon}` (alternating, $`k = \pi/a`).
- $`N \to \infty` → a continuum of modes: a wave with dispersion relation $`\omega(k)`. For small $`ka`, $`\cos(ka) \approx 1 - (ka)^2/2`, so $`\omega \approx \omega_0\sqrt{1 + \epsilon (ka)^2} \approx \omega_0 (1 + \tfrac{\epsilon}{2}(ka)^2)` — nearly linear near $`k = 0`, where the continuum approximation is best.

**Where the same band structure appears.** Atoms in a crystal (phonon dispersion — the $`k = 0` acoustic mode is the "in-phase" mode, and the speed of sound is its slope), coupled LC circuits (filter passbands), a guitar string (harmonics are the normal modes), and a drum membrane (2D modes). In every case, the continuum limit of coupled oscillators is a field.

<details><summary>Example problem</summary>

For a chain with $`\epsilon = 0.01` (weak coupling) and $`a = 1` nm, compare $`\omega` at $`k = \pi/(100a)` to $`\omega_0`. **Solution:** $`1 - \cos(0.01\pi) = 1 - \cos(0.0314) \approx 4.93 \times 10^{-4}`, so $`\omega \approx \omega_0\sqrt{1 + 2 \times 0.01 \times 4.93 \times 10^{-4}} \approx \omega_0(1 + 4.9 \times 10^{-6})`. Long-wavelength modes barely feel the coupling — which is why sound in a crystal propagates almost dispersionlessly at low frequency.

</details>

</details>

<details><summary>Quizz</summary>

**Problem.** Two identical masses ($`m = 1` kg) are connected to fixed walls by springs of stiffness $`k = 100` N/m and to each other by a coupling spring $`k_c = 50` N/m. Mass 1 is displaced by 10 cm and released from rest, with mass 2 held at its equilibrium position and then released.

1. Find the two normal-mode frequencies.
2. Find the beat frequency and the time for the energy to transfer completely to mass 2.
3. Sketch (or describe) the displacement of each mass at that moment.

<details><summary>Solution</summary>

**1. Normal-mode frequencies.** For the symmetric case:

- In-phase: $`\omega_+ = \sqrt{k/m} = \sqrt{100/1} = 10` rad/s.
- Out-of-phase: $`\omega_- = \sqrt{(k + 2k_c)/m} = \sqrt{(100 + 100)/1} = \sqrt{200} \approx 14.14` rad/s.

**2. Beat frequency and transfer time.** The initial condition $`(A, 0)` is an equal superposition of the two modes, so the envelope beats at

```math
f_{beat} = \frac{|\omega_- - \omega_+|}{2\pi} = \frac{14.14 - 10}{2\pi} = \frac{4.14}{6.28} \approx 0.66\ \text{Hz}
```

The energy is proportional to the envelope squared, so it transfers completely from mass 1 to mass 2 in half the beat period:

```math
t_{transfer} = \frac{\pi}{\omega_- - \omega_+} = \frac{\pi}{4.14} \approx 0.76\ \text{s}
```

and returns to mass 1 after a full period $`T_{transfer} = 2\pi/(\omega_- - \omega_+) \approx 1.52` s.

**3. State at $`t \approx 0.76` s.** Mass 1 is momentarily at rest at its equilibrium position (its envelope $`\cos\bigl(\frac{\omega_- - \omega_+}{2}t\bigr) = \cos(\pi/2) = 0`), while mass 2 reaches its maximum displacement of 10 cm — all the energy has crossed the coupling spring. The two masses then play the motion back in reverse, returning the energy to mass 1 at $`t \approx 1.52` s.

</details>

</details>

