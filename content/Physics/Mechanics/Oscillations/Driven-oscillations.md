# Driven Oscillations

Driven oscillations describe a system subjected to an external periodic force. A distinct but related mechanism is **parametric excitation**, in which a system parameter (stiffness, length, inductance) is modulated periodically rather than a force being applied. Together they explain resonance, the frequency response of filters, and the operation of parametric amplifiers. They are relevant to mechanical resonance, electrical tuning, bridge dynamics, and MEMS devices.

<svg width="420" height="150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="fah" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="#e74c3c"/>
    </marker>
  </defs>
  <rect x="18" y="25" width="10" height="100" fill="#555"/>
  <line x1="18" y1="25" x2="18" y2="125" stroke="#333" stroke-width="3"/>
  <polyline points="28,55 42,45 56,65 70,45 84,65 98,45 112,65 126,45 140,55" fill="none" stroke="#333" stroke-width="2"/>
  <text x="84" y="38" text-anchor="middle" fill="#333" font-size="12" font-style="italic">k</text>
  <line x1="28" y1="85" x2="70" y2="85" stroke="#333" stroke-width="2"/>
  <rect x="70" y="75" width="30" height="20" fill="none" stroke="#333" stroke-width="2"/>
  <line x1="85" y1="75" x2="85" y2="95" stroke="#333" stroke-width="2"/>
  <line x1="100" y1="85" x2="140" y2="85" stroke="#333" stroke-width="2"/>
  <text x="85" y="112" text-anchor="middle" fill="#333" font-size="12" font-style="italic">c</text>
  <rect x="140" y="45" width="45" height="50" fill="#4a90d9" stroke="#2a5a8a" stroke-width="2" rx="3"/>
  <text x="162" y="76" text-anchor="middle" fill="white" font-size="14" font-weight="bold">m</text>
  <line x1="185" y1="70" x2="255" y2="70" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#fah)"/>
  <text x="262" y="74" fill="#e74c3c" font-size="13" font-style="italic">F₀ cos(ωt)</text>
</svg>

> **Authoritative sources**
> - [OpenStax University Physics Volume 1, §15.6: Forced Oscillations and Resonance](https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations-and-resonance)
> - [Landau &amp; Lifshitz, *Mechanics*, §14: Forced Oscillations](https://www.physics.msu.ru/eng/ll/)

## Equation of motion (force-driven)

```math
m\ddot{x} + c\dot{x} + kx = F_0\cos(\omega t)
```

where $`c` is the damping coefficient, $`k` the stiffness, $`\omega_0 = \sqrt{k/m}` the natural frequency, and $`\gamma = c/(2m)` the damping rate. The drive has amplitude $`F_0` and angular frequency $`\omega`.

<details><summary>Details</summary>

**Decomposition into transient + steady-state.** Because the equation is linear, the full solution is the sum of two independent parts:

```math
x(t) = x_{\text{trans}}(t) + x_{ss}(t)
```

- The **transient** $`x_{\text{trans}}` solves the homogeneous (free) equation $`m\ddot{x} + c\dot{x} + kx = 0`. It is set by the initial conditions and decays as $`e^{-\gamma t}` (see [Damped oscillations](./Damped-oscillations.md)).
- The **steady-state** $`x_{ss}` is a particular solution that oscillates *at the drive frequency* $`\omega`, not at $`\omega_0`. It persists forever as long as the drive is on.

After a few damping time constants ($`t \gtrsim 1/\gamma`), the transient is gone and only the steady-state remains. This is why a driven system "locks" to the drive frequency: whatever the initial motion, the long-time motion is a pure sinusoid at $`\omega`.

<svg width="400" height="240" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="115" x2="390" y2="115" stroke="#333" stroke-width="1"/>
  <line x1="40" y1="20" x2="40" y2="210" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="210" x2="390" y2="210" stroke="#333" stroke-width="1.5"/>
  <text x="385" y="228" fill="#888" font-size="11" font-style="italic">t</text>
  <text x="22" y="28" fill="#888" font-size="11" font-style="italic">x</text>
  <polyline points="40.0,91.3 40.9,88.5 41.8,85.9 42.6,83.3 43.5,80.8 44.4,78.4 45.3,76.0 46.1,73.8 47.0,71.6 47.9,69.5 48.8,67.6 49.6,65.7 50.5,63.9 51.4,62.3 52.3,60.8 53.1,59.4 54.0,58.1 54.9,56.9 55.8,55.9 56.6,55.0 57.5,54.2 58.4,53.6 59.3,53.1 60.1,52.7 61.0,52.5 61.9,52.4 62.8,52.4 63.6,52.6 64.5,52.9 65.4,53.4 66.3,54.0 67.1,54.7 68.0,55.6 68.9,56.6 69.8,57.7 70.6,59.0 71.5,60.4 72.4,61.9 73.3,63.5 74.1,65.2 75.0,67.0 75.9,69.0 76.8,71.0 77.6,73.2 78.5,75.4 79.4,77.8 80.3,80.2 81.1,82.7 82.0,85.2 82.9,87.9 83.7,90.6 84.6,93.3 85.5,96.1 86.4,98.9 87.2,101.8 88.1,104.7 89.0,107.6 89.9,110.6 90.7,113.5 91.6,116.4 92.5,119.4 93.4,122.3 94.2,125.2 95.1,128.1 96.0,131.0 96.9,133.8 97.7,136.6 98.6,139.3 99.5,142.0 100.4,144.6 101.2,147.1 102.1,149.6 103.0,152.0 103.9,154.3 104.7,156.5 105.6,158.6 106.5,160.6 107.4,162.5 108.2,164.3 109.1,166.0 110.0,167.5 110.9,169.0 111.7,170.3 112.6,171.5 113.5,172.5 114.4,173.4 115.2,174.2 116.1,174.8 117.0,175.3 117.9,175.7 118.7,175.9 119.6,176.0 120.5,175.9 121.4,175.7 122.2,175.4 123.1,174.9 124.0,174.2 124.9,173.5 125.7,172.5 126.6,171.5 127.5,170.3 128.4,169.0 129.2,167.6 130.1,166.0 131.0,164.3 131.9,162.5 132.7,160.6 133.6,158.6 134.5,156.5 135.4,154.3 136.2,151.9 137.1,149.5 138.0,147.1 138.9,144.5 139.7,141.9 140.6,139.2 141.5,136.4 142.4,133.6 143.2,130.8 144.1,127.9 145.0,125.0 145.9,122.1 146.7,119.1 147.6,116.2 148.5,113.2 149.4,110.3 150.2,107.3 151.1,104.4 152.0,101.5 152.9,98.6 153.7,95.8 154.6,93.0 155.5,90.3 156.4,87.6 157.2,85.0 158.1,82.5 159.0,80.0 159.9,77.6 160.7,75.3 161.6,73.2 162.5,71.1 163.4,69.1 164.2,67.2 165.1,65.5 166.0,63.8 166.9,62.3 167.7,60.9 168.6,59.7 169.5,58.6 170.4,57.6 171.2,56.7 172.1,56.0 173.0,55.5 173.9,55.1 174.7,54.8 175.6,54.6 176.5,54.7 177.4,54.8 178.2,55.1 179.1,55.6 180.0,56.2 180.9,56.9 181.7,57.8 182.6,58.8 183.5,60.0 184.4,61.3 185.2,62.7 186.1,64.2 187.0,65.9 187.9,67.7 188.7,69.6 189.6,71.6 190.5,73.7 191.4,75.9 192.2,78.2 193.1,80.6 194.0,83.1 194.9,85.7 195.7,88.3 196.6,91.0 197.5,93.8 198.4,96.6 199.2,99.4 200.1,102.3 201.0,105.2 201.9,108.2 202.7,111.1 203.6,114.1 204.5,117.1 205.4,120.0 206.3,123.0 207.1,125.9 208.0,128.8 208.9,131.7 209.8,134.5 210.6,137.3 211.5,140.1 212.4,142.7 213.3,145.3 214.1,147.8 215.0,150.3 215.9,152.7 216.8,154.9 217.6,157.1 218.5,159.2 219.4,161.1 220.3,163.0 221.1,164.7 222.0,166.3 222.9,167.8 223.8,169.1 224.6,170.3 225.5,171.4 226.4,172.4 227.3,173.2 228.1,173.8 229.0,174.3 229.9,174.7 230.8,174.9 231.6,175.0 232.5,174.9 233.4,174.7 234.3,174.4 235.1,173.8 236.0,173.2 236.9,172.4 237.8,171.5 238.6,170.4 239.5,169.2 240.4,167.8 241.3,166.3 242.1,164.7 243.0,163.0 243.9,161.2 244.8,159.2 245.6,157.1 246.5,155.0 247.4,152.7 248.3,150.3 249.1,147.9 250.0,145.4 250.9,142.8 251.8,140.1 252.6,137.4 253.5,134.6 254.4,131.7 255.3,128.9 256.1,126.0 257.0,123.0 257.9,120.1 258.8,117.1 259.6,114.1 260.5,111.1 261.4,108.2 262.3,105.2 263.1,102.3 264.0,99.4 264.9,96.6 265.8,93.8 266.6,91.0 267.5,88.3 268.4,85.7 269.3,83.1 270.1,80.7 271.0,78.3 271.9,76.0 272.8,73.8 273.6,71.7 274.5,69.7 275.4,67.8 276.3,66.0 277.1,64.4 278.0,62.9 278.9,61.5 279.8,60.2 280.6,59.1 281.5,58.1 282.4,57.3 283.3,56.6 284.1,56.0 285.0,55.6 285.9,55.3 286.8,55.2 287.6,55.3 288.5,55.4 289.4,55.8 290.3,56.2 291.1,56.9 292.0,57.6 292.9,58.5 293.8,59.6 294.6,60.8 295.5,62.1 296.4,63.5 297.3,65.1 298.1,66.8 299.0,68.6 299.9,70.6 300.8,72.6 301.6,74.8 302.5,77.0 303.4,79.4 304.3,81.8 305.1,84.3 306.0,86.9 306.9,89.6 307.8,92.3 308.6,95.1 309.5,97.9 310.4,100.8 311.3,103.7 312.1,106.6 313.0,109.6 313.9,112.5 314.8,115.5 315.6,118.5 316.5,121.4 317.4,124.4 318.3,127.3 319.1,130.2 320.0,133.1 320.9,135.9 321.8,138.6 322.6,141.3 323.5,144.0 324.4,146.5 325.3,149.0 326.1,151.4 327.0,153.7 327.9,155.9 328.8,158.0 329.6,160.1 330.5,161.9 331.4,163.7 332.3,165.4 333.1,166.9 334.0,168.3 334.9,169.6 335.8,170.7 336.6,171.7 337.5,172.5 338.4,173.3 339.3,173.8 340.1,174.2 341.0,174.5 341.9,174.6 342.8,174.6 343.6,174.4 344.5,174.1 345.4,173.6 346.3,173.0 347.1,172.3 348.0,171.4 348.9,170.3 349.8,169.1 350.6,167.8 351.5,166.4 352.4,164.8 353.3,163.1 354.1,161.3 355.0,159.4 355.9,157.3 356.8,155.2 357.6,152.9 358.5,150.6 359.4,148.2 360.3,145.6 361.1,143.1 362.0,140.4 362.9,137.7 363.8,134.9 364.6,132.1 365.5,129.2 366.4,126.3 367.3,123.4 368.1,120.4 369.0,117.4 369.9,114.5 370.8,111.5 371.6,108.5 372.5,105.6 373.4,102.7 374.3,99.8 375.1,96.9 376.0,94.1 376.9,91.3 377.8,88.7 378.6,86.0 379.5,83.5 380.4,81.0 381.3,78.6 382.1,76.3 383.0,74.1 383.9,72.0 384.8,70.0 385.6,68.1 386.5,66.3 387.4,64.7 388.3,63.1 389.1,61.7 390.0,60.5" fill="none" stroke="#4fc3f7" stroke-width="2.5"/>
  <polyline points="40.0,115.0 40.9,112.0 41.8,109.1 42.6,106.1 43.5,103.2 44.4,100.3 45.3,97.5 46.1,94.6 47.0,91.9 47.9,89.2 48.8,86.5 49.6,84.0 50.5,81.5 51.4,79.1 52.3,76.7 53.1,74.5 54.0,72.4 54.9,70.4 55.8,68.5 56.6,66.7 57.5,65.0 58.4,63.5 59.3,62.1 60.1,60.8 61.0,59.7 61.9,58.7 62.8,57.8 63.6,57.1 64.5,56.5 65.4,56.1 66.3,55.8 67.1,55.6 68.0,55.7 68.9,55.8 69.8,56.1 70.6,56.6 71.5,57.2 72.4,57.9 73.3,58.8 74.1,59.8 75.0,61.0 75.9,62.3 76.8,63.7 77.6,65.3 78.5,67.0 79.4,68.8 80.3,70.7 81.1,72.8 82.0,74.9 82.9,77.1 83.7,79.5 84.6,81.9 85.5,84.4 86.4,87.0 87.2,89.6 88.1,92.3 89.0,95.1 89.9,97.9 90.7,100.8 91.6,103.7 92.5,106.6 93.4,109.6 94.2,112.5 95.1,115.5 96.0,118.5 96.9,121.4 97.7,124.4 98.6,127.3 99.5,130.2 100.4,133.0 101.2,135.8 102.1,138.6 103.0,141.3 103.9,143.9 104.7,146.5 105.6,148.9 106.5,151.3 107.4,153.6 108.2,155.8 109.1,157.9 110.0,159.9 110.9,161.8 111.7,163.6 112.6,165.2 113.5,166.7 114.4,168.1 115.2,169.4 116.1,170.5 117.0,171.5 117.9,172.3 118.7,173.0 119.6,173.6 120.5,174.0 121.4,174.3 122.2,174.4 123.1,174.3 124.0,174.1 124.9,173.8 125.7,173.3 126.6,172.7 127.5,171.9 128.4,171.0 129.2,170.0 130.1,168.8 131.0,167.5 131.9,166.0 132.7,164.4 133.6,162.7 134.5,160.9 135.4,158.9 136.2,156.9 137.1,154.7 138.0,152.5 138.9,150.1 139.7,147.7 140.6,145.2 141.5,142.6 142.4,139.9 143.2,137.2 144.1,134.4 145.0,131.6 145.9,128.7 146.7,125.8 147.6,122.9 148.5,119.9 149.4,117.0 150.2,114.0 151.1,111.0 152.0,108.1 152.9,105.1 153.7,102.2 154.6,99.3 155.5,96.5 156.4,93.7 157.2,91.0 158.1,88.3 159.0,85.7 159.9,83.1 160.7,80.7 161.6,78.3 162.5,76.0 163.4,73.8 164.2,71.7 165.1,69.7 166.0,67.9 166.9,66.1 167.7,64.5 168.6,63.0 169.5,61.6 170.4,60.4 171.2,59.3 172.1,58.3 173.0,57.5 173.9,56.9 174.7,56.3 175.6,55.9 176.5,55.7 177.4,55.6 178.2,55.7 179.1,55.9 180.0,56.3 180.9,56.8 181.7,57.4 182.6,58.2 183.5,59.1 184.4,60.2 185.2,61.4 186.1,62.8 187.0,64.3 187.9,65.9 188.7,67.6 189.6,69.4 190.5,71.4 191.4,73.5 192.2,75.6 193.1,77.9 194.0,80.3 194.9,82.7 195.7,85.3 196.6,87.9 197.5,90.5 198.4,93.3 199.2,96.1 200.1,98.9 201.0,101.8 201.9,104.7 202.7,107.6 203.6,110.6 204.5,113.5 205.4,116.5 206.3,119.5 207.1,122.4 208.0,125.4 208.9,128.3 209.8,131.1 210.6,134.0 211.5,136.8 212.4,139.5 213.3,142.2 214.1,144.8 215.0,147.3 215.9,149.8 216.8,152.1 217.6,154.4 218.5,156.6 219.4,158.6 220.3,160.6 221.1,162.4 222.0,164.2 222.9,165.8 223.8,167.2 224.6,168.6 225.5,169.8 226.4,170.9 227.3,171.8 228.1,172.6 229.0,173.2 229.9,173.7 230.8,174.1 231.6,174.3 232.5,174.4 233.4,174.3 234.3,174.1 235.1,173.7 236.0,173.1 236.9,172.5 237.8,171.6 238.6,170.7 239.5,169.6 240.4,168.3 241.3,167.0 242.1,165.5 243.0,163.9 243.9,162.1 244.8,160.2 245.6,158.3 246.5,156.2 247.4,154.0 248.3,151.7 249.1,149.3 250.0,146.9 250.9,144.3 251.8,141.7 252.6,139.0 253.5,136.3 254.4,133.5 255.3,130.6 256.1,127.7 257.0,124.8 257.9,121.9 258.8,118.9 259.6,116.0 260.5,113.0 261.4,110.0 262.3,107.1 263.1,104.2 264.0,101.3 264.9,98.4 265.8,95.6 266.6,92.8 267.5,90.1 268.4,87.4 269.3,84.8 270.1,82.3 271.0,79.8 271.9,77.5 272.8,75.2 273.6,73.1 274.5,71.0 275.4,69.1 276.3,67.3 277.1,65.6 278.0,64.0 278.9,62.5 279.8,61.2 280.6,60.0 281.5,59.0 282.4,58.1 283.3,57.3 284.1,56.7 285.0,56.2 285.9,55.9 286.8,55.7 287.6,55.6 288.5,55.7 289.4,56.0 290.3,56.4 291.1,57.0 292.0,57.7 292.9,58.5 293.8,59.5 294.6,60.6 295.5,61.9 296.4,63.3 297.3,64.8 298.1,66.4 299.0,68.2 299.9,70.1 300.8,72.1 301.6,74.2 302.5,76.4 303.4,78.7 304.3,81.1 305.1,83.6 306.0,86.1 306.9,88.7 307.8,91.4 308.6,94.2 309.5,97.0 310.4,99.9 311.3,102.7 312.1,105.7 313.0,108.6 313.9,111.6 314.8,114.5 315.6,117.5 316.5,120.5 317.4,123.4 318.3,126.3 319.1,129.2 320.0,132.1 320.9,134.9 321.8,137.7 322.6,140.4 323.5,143.1 324.4,145.6 325.3,148.1 326.1,150.6 327.0,152.9 327.9,155.1 328.8,157.3 329.6,159.3 330.5,161.2 331.4,163.0 332.3,164.7 333.1,166.3 334.0,167.7 334.9,169.0 335.8,170.2 336.6,171.2 337.5,172.1 338.4,172.8 339.3,173.4 340.1,173.9 341.0,174.2 341.9,174.4 342.8,174.4 343.6,174.2 344.5,173.9 345.4,173.5 346.3,172.9 347.1,172.2 348.0,171.3 348.9,170.3 349.8,169.2 350.6,167.9 351.5,166.5 352.4,164.9 353.3,163.3 354.1,161.5 355.0,159.6 355.9,157.6 356.8,155.5 357.6,153.2 358.5,150.9 359.4,148.5 360.3,146.0 361.1,143.4 362.0,140.8 362.9,138.1 363.8,135.3 364.6,132.5 365.5,129.7 366.4,126.8 367.3,123.8 368.1,120.9 369.0,117.9 369.9,115.0 370.8,112.0 371.6,109.0 372.5,106.1 373.4,103.2 374.3,100.3 375.1,97.4 376.0,94.6 376.9,91.9 377.8,89.2 378.6,86.5 379.5,83.9 380.4,81.5 381.3,79.0 382.1,76.7 383.0,74.5 383.9,72.4 384.8,70.4 385.6,68.5 386.5,66.7 387.4,65.0 388.3,63.5 389.1,62.1 390.0,60.8" fill="none" stroke="#aed581" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polyline points="40.0,91.3 40.9,91.5 41.8,91.8 42.6,92.2 43.5,92.6 44.4,93.1 45.3,93.6 46.1,94.1 47.0,94.7 47.9,95.4 48.8,96.0 49.6,96.7 50.5,97.5 51.4,98.2 52.3,99.0 53.1,99.8 54.0,100.7 54.9,101.5 55.8,102.4 56.6,103.3 57.5,104.2 58.4,105.1 59.3,106.0 60.1,106.9 61.0,107.8 61.9,108.7 62.8,109.6 63.6,110.5 64.5,111.5 65.4,112.3 66.3,113.2 67.1,114.1 68.0,114.9 68.9,115.8 69.8,116.6 70.6,117.4 71.5,118.2 72.4,118.9 73.3,119.7 74.1,120.4 75.0,121.0 75.9,121.7 76.8,122.3 77.6,122.9 78.5,123.4 79.4,124.0 80.3,124.5 81.1,124.9 82.0,125.3 82.9,125.7 83.7,126.1 84.6,126.4 85.5,126.7 86.4,127.0 87.2,127.2 88.1,127.4 89.0,127.5 89.9,127.6 90.7,127.7 91.6,127.8 92.5,127.8 93.4,127.8 94.2,127.7 95.1,127.6 96.0,127.5 96.9,127.4 97.7,127.2 98.6,127.0 99.5,126.8 100.4,126.6 101.2,126.3 102.1,126.0 103.0,125.7 103.9,125.4 104.7,125.0 105.6,124.7 106.5,124.3 107.4,123.9 108.2,123.5 109.1,123.0 110.0,122.6 110.9,122.2 111.7,121.7 112.6,121.2 113.5,120.8 114.4,120.3 115.2,119.8 116.1,119.3 117.0,118.8 117.9,118.4 118.7,117.9 119.6,117.4 120.5,116.9 121.4,116.5 122.2,116.0 123.1,115.5 124.0,115.1 124.9,114.6 125.7,114.2 126.6,113.8 127.5,113.4 128.4,113.0 129.2,112.6 130.1,112.2 131.0,111.9 131.9,111.5 132.7,111.2 133.6,110.9 134.5,110.6 135.4,110.3 136.2,110.1 137.1,109.8 138.0,109.6 138.9,109.4 139.7,109.2 140.6,109.0 141.5,108.9 142.4,108.7 143.2,108.6 144.1,108.5 145.0,108.4 145.9,108.4 146.7,108.3 147.6,108.3 148.5,108.3 149.4,108.3 150.2,108.3 151.1,108.3 152.0,108.4 152.9,108.5 153.7,108.6 154.6,108.6 155.5,108.8 156.4,108.9 157.2,109.0 158.1,109.2 159.0,109.3 159.9,109.5 160.7,109.7 161.6,109.9 162.5,110.1 163.4,110.3 164.2,110.5 165.1,110.7 166.0,111.0 166.9,111.2 167.7,111.4 168.6,111.7 169.5,111.9 170.4,112.2 171.2,112.4 172.1,112.7 173.0,112.9 173.9,113.2 174.7,113.4 175.6,113.7 176.5,114.0 177.4,114.2 178.2,114.4 179.1,114.7 180.0,114.9 180.9,115.2 181.7,115.4 182.6,115.6 183.5,115.8 184.4,116.0 185.2,116.2 186.1,116.4 187.0,116.6 187.9,116.8 188.7,117.0 189.6,117.1 190.5,117.3 191.4,117.5 192.2,117.6 193.1,117.7 194.0,117.8 194.9,118.0 195.7,118.1 196.6,118.1 197.5,118.2 198.4,118.3 199.2,118.4 200.1,118.4 201.0,118.5 201.9,118.5 202.7,118.5 203.6,118.5 204.5,118.5 205.4,118.5 206.3,118.5 207.1,118.5 208.0,118.5 208.9,118.4 209.8,118.4 210.6,118.4 211.5,118.3 212.4,118.2 213.3,118.2 214.1,118.1 215.0,118.0 215.9,117.9 216.8,117.8 217.6,117.7 218.5,117.6 219.4,117.5 220.3,117.4 221.1,117.3 222.0,117.1 222.9,117.0 223.8,116.9 224.6,116.8 225.5,116.6 226.4,116.5 227.3,116.4 228.1,116.2 229.0,116.1 229.9,116.0 230.8,115.8 231.6,115.7 232.5,115.6 233.4,115.4 234.3,115.3 235.1,115.2 236.0,115.1 236.9,114.9 237.8,114.8 238.6,114.7 239.5,114.6 240.4,114.5 241.3,114.4 242.1,114.3 243.0,114.2 243.9,114.1 244.8,114.0 245.6,113.9 246.5,113.8 247.4,113.7 248.3,113.6 249.1,113.6 250.0,113.5 250.9,113.5 251.8,113.4 252.6,113.4 253.5,113.3 254.4,113.3 255.3,113.2 256.1,113.2 257.0,113.2 257.9,113.2 258.8,113.1 259.6,113.1 260.5,113.1 261.4,113.1 262.3,113.1 263.1,113.2 264.0,113.2 264.9,113.2 265.8,113.2 266.6,113.2 267.5,113.3 268.4,113.3 269.3,113.3 270.1,113.4 271.0,113.4 271.9,113.5 272.8,113.5 273.6,113.6 274.5,113.6 275.4,113.7 276.3,113.7 277.1,113.8 278.0,113.9 278.9,113.9 279.8,114.0 280.6,114.1 281.5,114.1 282.4,114.2 283.3,114.3 284.1,114.3 285.0,114.4 285.9,114.5 286.8,114.6 287.6,114.6 288.5,114.7 289.4,114.8 290.3,114.8 291.1,114.9 292.0,115.0 292.9,115.0 293.8,115.1 294.6,115.2 295.5,115.2 296.4,115.3 297.3,115.3 298.1,115.4 299.0,115.4 299.9,115.5 300.8,115.5 301.6,115.6 302.5,115.6 303.4,115.7 304.3,115.7 305.1,115.7 306.0,115.8 306.9,115.8 307.8,115.8 308.6,115.9 309.5,115.9 310.4,115.9 311.3,115.9 312.1,115.9 313.0,116.0 313.9,116.0 314.8,116.0 315.6,116.0 316.5,116.0 317.4,116.0 318.3,116.0 319.1,116.0 320.0,116.0 320.9,115.9 321.8,115.9 322.6,115.9 323.5,115.9 324.4,115.9 325.3,115.9 326.1,115.9 327.0,115.8 327.9,115.8 328.8,115.8 329.6,115.8 330.5,115.7 331.4,115.7 332.3,115.7 333.1,115.6 334.0,115.6 334.9,115.6 335.8,115.5 336.6,115.5 337.5,115.5 338.4,115.4 339.3,115.4 340.1,115.4 341.0,115.3 341.9,115.3 342.8,115.2 343.6,115.2 344.5,115.2 345.4,115.1 346.3,115.1 347.1,115.1 348.0,115.0 348.9,115.0 349.8,115.0 350.6,114.9 351.5,114.9 352.4,114.9 353.3,114.8 354.1,114.8 355.0,114.8 355.9,114.7 356.8,114.7 357.6,114.7 358.5,114.7 359.4,114.7 360.3,114.6 361.1,114.6 362.0,114.6 362.9,114.6 363.8,114.6 364.6,114.5 365.5,114.5 366.4,114.5 367.3,114.5 368.1,114.5 369.0,114.5 369.9,114.5 370.8,114.5 371.6,114.5 372.5,114.5 373.4,114.5 374.3,114.5 375.1,114.5 376.0,114.5 376.9,114.5 377.8,114.5 378.6,114.5 379.5,114.5 380.4,114.5 381.3,114.5 382.1,114.5 383.0,114.6 383.9,114.6 384.8,114.6 385.6,114.6 386.5,114.6 387.4,114.6 388.3,114.6 389.1,114.7 390.0,114.7" fill="none" stroke="#ff8a65" stroke-width="1.5" stroke-dasharray="2,3"/>
  <line x1="250" y1="150" x2="250" y2="150" stroke="none"/>
  <rect x="250" y="150" width="140" height="52" fill="none" stroke="none"/>
  <line x1="255" y1="158" x2="275" y2="158" stroke="#4fc3f7" stroke-width="2.5"/>
  <text x="280" y="162" fill="#4fc3f7" font-size="10">x(t) total</text>
  <line x1="255" y1="174" x2="275" y2="174" stroke="#aed581" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="280" y="178" fill="#aed581" font-size="10">steady-state</text>
  <line x1="255" y1="190" x2="275" y2="190" stroke="#ff8a65" stroke-width="1.5" stroke-dasharray="2,3"/>
  <text x="280" y="194" fill="#ff8a65" font-size="10">transient (decays)</text>
</svg>

> **Authoritative source for this section:** [Landau &amp; Lifshitz, *Mechanics*, §14: Forced Oscillations](https://www.physics.msu.ru/eng/ll/)

<details><summary>Example problem</summary>

A driven oscillator has $`\gamma = 0.5` s⁻¹. How long until the transient amplitude has fallen to 5% of its initial value?

<details><summary>Solution</summary>

The transient envelope is $`e^{-\gamma t}`. Set $`e^{-0.5\,t} = 0.05`: $`t = \ln(20)/0.5 \approx 2.996/0.5 \approx 6.0` s.

</details>

</details>

</details>

## Steady-state response

The steady-state solution oscillates at the drive frequency:

```math
x_{ss}(t) = X(\omega)\cos(\omega t - \delta)
```

where the amplitude and phase lag are:

```math
X(\omega) = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2}}, \qquad \tan\delta = \frac{2\gamma\omega}{\omega_0^2 - \omega^2}
```

<details><summary>Details</summary>

**Three frequency regimes.**

- **Low frequency** ($`\omega \ll \omega_0`): the spring dominates, $`X \approx F_0/k` (the static deflection) and $`\delta \approx 0` (in phase). The mass barely moves before the force reverses.
- **Resonance** ($`\omega \approx \omega_0`): the inertial and spring terms nearly cancel, so the damping term alone balances the drive. The amplitude is large and $`\delta \approx \pi/2` (velocity in phase with force).
- **High frequency** ($`\omega \gg \omega_0`): inertia dominates, $`X \approx F_0/(m\omega^2) \to 0` and $`\delta \approx \pi` (out of phase). The mass is effectively rigid and barely responds.

**Amplitude response curve.** The plot of $`X(\omega)` versus $`\omega` is the *frequency response* of the oscillator: a resonance peak centered near $`\omega_0`. The width of the peak at half its maximum height is the **bandwidth** $`\Delta\omega`.

<svg width="400" height="240" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="210" x2="390" y2="210" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="20" x2="40" y2="210" stroke="#333" stroke-width="1.5"/>
  <text x="385" y="228" fill="#888" font-size="11" font-style="italic">ω</text>
  <text x="18" y="28" fill="#888" font-size="11" font-style="italic">X(ω)</text>
  <line x1="40" y1="123.6" x2="390" y2="123.6" stroke="#e0a800" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="151.4" y1="123.6" x2="151.4" y2="210" stroke="#e0a800" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="201.3" y1="123.6" x2="201.3" y2="210" stroke="#e0a800" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="151.4" y1="200" x2="201.3" y2="200" stroke="#e0a800" stroke-width="1.5"/>
  <line x1="151.4" y1="196" x2="151.4" y2="204" stroke="#e0a800" stroke-width="1.5"/>
  <line x1="201.3" y1="196" x2="201.3" y2="204" stroke="#e0a800" stroke-width="1.5"/>
  <text x="176" y="196" fill="#e0a800" font-size="10" text-anchor="middle">Δω</text>
  <polyline points="40.0,175.5 42.8,175.4 45.6,175.4 48.4,175.3 51.2,175.2 54.0,175.1 56.8,175.0 59.6,174.8 62.4,174.6 65.2,174.3 68.0,174.0 70.8,173.7 73.6,173.4 76.4,173.0 79.2,172.6 82.0,172.1 84.8,171.6 87.6,171.1 90.4,170.4 93.2,169.8 96.0,169.1 98.8,168.3 101.6,167.4 104.4,166.5 107.2,165.5 110.0,164.3 112.8,163.1 115.6,161.8 118.4,160.3 121.2,158.7 124.0,156.9 126.8,155.0 129.6,152.8 132.4,150.4 135.2,147.7 138.0,144.7 140.8,141.3 143.6,137.4 146.4,133.0 149.2,128.0 152.0,122.3 154.8,115.7 157.6,108.1 160.4,99.3 163.2,89.3 166.0,78.0 168.8,65.9 171.6,53.8 174.4,43.4 177.2,37.2 180.0,37.3 182.8,43.9 185.6,55.4 188.4,69.2 191.2,83.3 194.0,96.4 196.8,108.1 199.6,118.2 202.4,127.0 205.2,134.6 208.0,141.1 210.8,146.7 213.6,151.7 216.4,156.0 219.2,159.8 222.0,163.1 224.8,166.2 227.6,168.9 230.4,171.3 233.2,173.5 236.0,175.5 238.8,177.3 241.6,178.9 244.4,180.4 247.2,181.8 250.0,183.1 252.8,184.3 255.6,185.4 258.4,186.5 261.2,187.4 264.0,188.3 266.8,189.1 269.6,189.9 272.4,190.7 275.2,191.4 278.0,192.0 280.8,192.6 283.6,193.2 286.4,193.8 289.2,194.3 292.0,194.8 294.8,195.2 297.6,195.7 300.4,196.1 303.2,196.5 306.0,196.9 308.8,197.3 311.6,197.6 314.4,198.0 317.2,198.3 320.0,198.6 322.8,198.9 325.6,199.2 328.4,199.4 331.2,199.7 334.0,199.9 336.8,200.2 339.6,200.4 342.4,200.6 345.2,200.9 348.0,201.1 350.8,201.3 353.6,201.5 356.4,201.6 359.2,201.8 362.0,202.0 364.8,202.2 367.6,202.3 370.4,202.5 373.2,202.6 376.0,202.8 378.8,202.9 381.6,203.1 384.4,203.2 387.2,203.3 390.0,203.4" fill="none" stroke="#4fc3f7" stroke-width="2"/>
  <circle cx="180" cy="37.3" r="3" fill="#ff5252"/>
  <text x="192" y="34" fill="#ff5252" font-size="10">peak</text>
  <line x1="180" y1="210" x2="180" y2="216" stroke="#888" stroke-width="1"/>
  <text x="180" y="228" fill="#888" font-size="10" text-anchor="middle">ω₀</text>
</svg>

**Phase-lag curve.** The phase lag $`\delta(\omega)` rises smoothly from $`0` to $`\pi`, passing through $`\pi/2` exactly at $`\omega = \omega_0`.

<svg width="400" height="240" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="210" x2="390" y2="210" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="20" x2="40" y2="210" stroke="#333" stroke-width="1.5"/>
  <text x="385" y="228" fill="#888" font-size="11" font-style="italic">ω</text>
  <text x="20" y="28" fill="#888" font-size="11" font-style="italic">δ</text>
  <line x1="40" y1="115" x2="390" y2="115" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="44" y="112" fill="#888" font-size="10">π/2</text>
  <line x1="40" y1="20" x2="390" y2="20" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="44" y="17" fill="#888" font-size="10">π</text>
  <text x="44" y="208" fill="#888" font-size="10">0</text>
  <polyline points="40.0,210.0 42.8,209.8 45.6,209.5 48.4,209.3 51.2,209.0 54.0,208.8 56.8,208.5 59.6,208.3 62.4,208.0 65.2,207.8 68.0,207.5 70.8,207.2 73.6,206.9 76.4,206.6 79.2,206.3 82.0,206.0 84.8,205.7 87.6,205.4 90.4,205.0 93.2,204.6 96.0,204.3 98.8,203.9 101.6,203.4 104.4,203.0 107.2,202.5 110.0,202.0 112.8,201.4 115.6,200.9 118.4,200.2 121.2,199.5 124.0,198.8 126.8,198.0 129.6,197.1 132.4,196.1 135.2,195.0 138.0,193.8 140.8,192.4 143.6,190.9 146.4,189.1 149.2,187.1 152.0,184.7 154.8,181.9 157.6,178.6 160.4,174.7 163.2,169.9 166.0,164.1 168.8,157.1 171.6,148.5 174.4,138.4 177.2,127.1 180.0,115.0 182.8,103.2 185.6,92.4 188.4,83.1 191.2,75.3 194.0,68.9 196.8,63.7 199.6,59.3 202.4,55.8 205.2,52.7 208.0,50.2 210.8,48.0 213.6,46.1 216.4,44.5 219.2,43.1 222.0,41.8 224.8,40.7 227.6,39.7 230.4,38.7 233.2,37.9 236.0,37.2 238.8,36.5 241.6,35.9 244.4,35.3 247.2,34.7 250.0,34.2 252.8,33.8 255.6,33.4 258.4,33.0 261.2,32.6 264.0,32.2 266.8,31.9 269.6,31.6 272.4,31.3 275.2,31.0 278.0,30.8 280.8,30.5 283.6,30.3 286.4,30.1 289.2,29.8 292.0,29.6 294.8,29.4 297.6,29.3 300.4,29.1 303.2,28.9 306.0,28.7 308.8,28.6 311.6,28.4 314.4,28.3 317.2,28.2 320.0,28.0 322.8,27.9 325.6,27.8 328.4,27.6 331.2,27.5 334.0,27.4 336.8,27.3 339.6,27.2 342.4,27.1 345.2,27.0 348.0,26.9 350.8,26.8 353.6,26.7 356.4,26.6 359.2,26.5 362.0,26.5 364.8,26.4 367.6,26.3 370.4,26.2 373.2,26.2 376.0,26.1 378.8,26.0 381.6,25.9 384.4,25.9 387.2,25.8 390.0,25.7" fill="none" stroke="#aed581" stroke-width="2"/>
  <line x1="180" y1="210" x2="180" y2="115" stroke="#ff5252" stroke-width="1" stroke-dasharray="3,3"/>
  <circle cx="180" cy="115" r="3" fill="#ff5252"/>
  <text x="180" y="228" fill="#888" font-size="10" text-anchor="middle">ω₀</text>
</svg>

> **Authoritative source for this section:** [OpenStax University Physics Volume 1, §15.6: Forced Oscillations and Resonance](https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations-and-resonance)

<details><summary>Example problem</summary>

For $`\omega_0 = 10` rad/s, $`\gamma = 0.5` s⁻¹, $`F_0/m = 2` m/s², compute $`X` at $`\omega = 2\omega_0 = 20` rad/s.

<details><summary>Solution</summary>

$`X = \dfrac{2}{\sqrt{(100 - 400)^2 + (2 \times 0.5 \times 20)^2}} = \dfrac{2}{\sqrt{(-300)^2 + 20^2}} = \dfrac{2}{\sqrt{90000 + 400}} = \dfrac{2}{\sqrt{90400}} \approx \dfrac{2}{300.7} \approx 0.00665` m.

</details>

</details>

</details>

## Resonance and quality factor

The peak amplitude (at the displacement resonance $`\omega_{res}`) is, in the weak-damping limit:

```math
X_{\max} = \frac{F_0}{c\,\omega_0} = \frac{F_0}{2m\gamma\,\omega_0} = Q\,\frac{F_0}{k}
```

<details><summary>Details</summary>

**Displacement vs. velocity resonance.** The amplitude $`X(\omega)` is maximized at

```math
\omega_{res} = \sqrt{\omega_0^2 - 2\gamma^2} \approx \omega_0 \quad (\gamma \ll \omega_0)
```

not exactly at $`\omega_0`. The displacement peak only coincides with $`\omega_0` in the weak-damping limit. By contrast, the **velocity** (and hence the **power**) response is maximized exactly at $`\omega = \omega_0`, because there the velocity is in phase with the driving force. For high-$`Q` systems the two frequencies are nearly identical, which is why the distinction is often glossed over.

**Quality factor.** $`Q = \omega_0/(2\gamma)` quantifies the sharpness of resonance. A high-$`Q` system (tuning fork, $`Q \sim 10^3`; superconducting cavity, $`Q \sim 10^{10}`) has a narrow peak and stores energy for many cycles; a low-$`Q` system (shock absorber, $`Q \sim 1`) has a broad, flat response. Equivalently, $`Q` is the number of radians of phase over which the free (undriven) oscillation decays by $`e`; see [Damped oscillations](./Damped-oscillations.md) for the free-decay analysis.

**Bandwidth.** The full width at half maximum of the amplitude peak is

```math
\Delta\omega \approx 2\gamma = \frac{\omega_0}{Q}, \qquad \text{i.e.} \quad \frac{\Delta\omega}{\omega_0} \approx \frac{1}{Q}
```

so a higher-$`Q` system has a narrower resonance. (Note $`\Delta\omega` is a frequency in s⁻¹, whereas $`1/Q` is dimensionless; the two are related through $`\omega_0`.)

**Practical resonance.** In engineering, resonance is exploited (musical instruments, radio tuning, MRI) or avoided (bridge design, building seismic isolation, turbine-blade fatigue). The 1940 Tacoma Narrows Bridge collapse is a classic—though often oversimplified—example of wind-driven resonance.

> **Authoritative source for this section:** [Landau &amp; Lifshitz, *Mechanics*, §14: Forced Oscillations](https://www.physics.msu.ru/eng/ll/)

<details><summary>Example problem</summary>

A resonator has $`\omega_0 = 1000` rad/s and $`Q = 50`. Estimate its bandwidth $`\Delta\omega` and the fractional bandwidth $`\Delta\omega/\omega_0`.

<details><summary>Solution</summary>

$`\Delta\omega = \omega_0/Q = 1000/50 = 20` rad/s. The fractional bandwidth is $`\Delta\omega/\omega_0 = 1/Q = 0.02` (2%).

</details>

</details>

</details>

## Energy and power at resonance

The instantaneous power delivered by the drive is $`P(t) = F_0\cos(\omega t)\,\dot{x}`. Its cycle average is:

```math
\langle P \rangle = \frac{1}{2} F_0 \omega X \sin\delta
```

<details><summary>Details</summary>

**Maximum power transfer at $`\omega = \omega_0`.** The average power is proportional to $`\sin\delta`. Since $`\delta = \pi/2` exactly at $`\omega = \omega_0`, the power is maximized there—*not* at the displacement peak $`\omega_{res}`. Physically, at $`\omega = \omega_0` the velocity $`\dot{x}` is in phase with the force, so the drive does positive work on every half-cycle. This is why **velocity resonance** (and power resonance) sits at $`\omega_0` while **displacement resonance** sits slightly below it.

At resonance the average power is $`\langle P\rangle_{\omega_0} = F_0^2/(2c)`, and the stored energy is $`E = \tfrac{1}{2}k X_{\max}^2`. The quality factor can be read as the number of radians of phase over which the stored energy decays by $`e`: $`Q \approx \omega_0 E / \langle P\rangle`.

> **Authoritative source for this section:** [OpenStax University Physics Volume 1, §15.6: Forced Oscillations and Resonance](https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations-and-resonance)

<details><summary>Example problem</summary>

Using $`F_0 = 10` N and $`c = 2` N·s/m, find the average power delivered at resonance.

<details><summary>Solution</summary>

$`\langle P\rangle_{\omega_0} = F_0^2/(2c) = 100/4 = 25` W.

</details>

</details>

</details>

## Electrical analog: the RLC circuit

The same mathematics governs a series RLC circuit driven by a voltage source:

```math
L\ddot{q} + R\dot{q} + \frac{1}{C}q = V_0\cos(\omega t)
```

<details><summary>Details</summary>

The mapping between the mechanical and electrical systems is exact:

<table>
<tr><th>Mechanical</th><th>Electrical</th><th>Role</th></tr>
<tr><td>mass <i>m</i></td><td>inductance <i>L</i></td><td>inertia / energy in field</td></tr>
<tr><td>damping <i>c</i></td><td>resistance <i>R</i></td><td>dissipation</td></tr>
<tr><td>stiffness <i>k</i></td><td>1/capacitance 1/<i>C</i></td><td>restoring / energy storage</td></tr>
<tr><td>displacement <i>x</i></td><td>charge <i>q</i></td><td>state variable</td></tr>
<tr><td>force <i>F</i><sub>0</sub></td><td>voltage <i>V</i><sub>0</sub></td><td>drive</td></tr>
</table>

Under this map $`\omega_0 = 1/\sqrt{LC}`, $`\gamma = R/(2L)`, and $`Q = \omega_0 L/R = \sqrt{L/C}/R`. The resonance peak becomes the **tuned circuit**: at $`\omega = \omega_0` the inductive and capacitive reactances cancel, the impedance is purely resistive ($`Z = R`), and the current is maximal. This is the basis of radio tuning and band-pass filters, and it is the electrical realization of everything in the resonance analysis above.

> **Authoritative source for this section:** [OpenStax University Physics Volume 2, §16.5: RLC Series Circuits](https://openstax.org/books/university-physics-volume-2/pages/16-5-rlc-series-circuits)

<details><summary>Example problem</summary>

A series RLC circuit has $`L = 10` mH, $`C = 25` nF, $`R = 10` Ω. Find $`\omega_0` and $`Q`.

<details><summary>Solution</summary>

$`\omega_0 = 1/\sqrt{LC} = 1/\sqrt{10^{-2} \times 25 \times 10^{-9}} = 1/\sqrt{2.5 \times 10^{-10}} \approx 6.3 \times 10^4` rad/s.

$`Q = \omega_0 L/R = 6.3 \times 10^4 \times 10^{-2}/10 \approx 63`.

</details>

</details>

</details>

## Parametric excitation

Instead of applying an external force, a system parameter (e.g., length, stiffness, inductance) is modulated periodically:

```math
m\ddot{x} + c\dot{x} + k_0\bigl[1 + \varepsilon\cos(\Omega t)\bigr]x = 0
```

<details><summary>Details</summary>

This is a **Mathieu equation** (when $`\varepsilon` is small and $`c = 0`). The key feature: energy is pumped into the system by modulating a parameter, not by applying a direct force.

**Parametric resonance** occurs when the modulation frequency is near *twice* the natural frequency, $`\Omega \approx 2\omega_0`. Within the instability band the amplitude grows exponentially, provided the modulation depth $`\varepsilon` exceeds a threshold set by damping. The instability region in the $`(\Omega, \varepsilon)` plane is a "tongue" opening out from $`\Omega = 2\omega_0`:

<svg width="400" height="240" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="210" x2="390" y2="210" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="20" x2="40" y2="210" stroke="#333" stroke-width="1.5"/>
  <text x="385" y="228" fill="#888" font-size="11" font-style="italic">ε</text>
  <text x="14" y="28" fill="#888" font-size="11" font-style="italic">Ω/ω₀</text>
  <line x1="40" y1="115" x2="390" y2="115" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="44" y="112" fill="#888" font-size="10">2</text>
  <polygon points="127.5,101.0 133.3,100.1 139.2,99.2 145.0,98.3 150.8,97.4 156.7,96.5 162.5,95.5 168.3,94.6 174.2,93.7 180.0,92.8 185.8,91.9 191.7,91.1 197.5,90.2 203.3,89.3 209.2,88.4 215.0,87.5 220.8,86.6 226.7,85.7 232.5,84.8 238.3,84.0 244.2,83.1 250.0,82.2 255.8,81.3 261.7,80.5 267.5,79.6 273.3,78.7 279.2,77.9 285.0,77.0 290.8,76.1 296.7,75.3 302.5,74.4 308.3,73.6 314.2,72.7 320.0,71.8 325.8,71.0 331.7,70.1 337.5,69.3 343.3,68.5 349.2,67.6 355.0,66.8 360.8,65.9 366.7,65.1 372.5,64.2 378.3,63.4 384.2,62.6 390.0,61.7 390.0,177.1 384.2,175.9 378.3,174.8 372.5,173.7 366.7,172.6 360.8,171.4 355.0,170.3 349.2,169.2 343.3,168.1 337.5,167.0 331.7,165.9 325.8,164.8 320.0,163.7 314.2,162.6 308.3,161.6 302.5,160.5 296.7,159.4 290.8,158.3 285.0,157.2 279.2,156.2 273.3,155.1 267.5,154.1 261.7,153.0 255.8,151.9 250.0,150.9 244.2,149.8 238.3,148.8 232.5,147.8 226.7,146.7 220.8,145.7 215.0,144.7 209.2,143.6 203.3,142.6 197.5,141.6 191.7,140.6 185.8,139.5 180.0,138.5 174.2,137.5 168.3,136.5 162.5,135.5 156.7,134.5 150.8,133.5 145.0,132.5 139.2,131.5 133.3,130.5 127.5,129.5" fill="rgba(255,82,82,0.25)" stroke="none"/>
  <polyline points="40.0,115.0 45.8,114.1 51.7,113.1 57.5,112.2 63.3,111.2 69.2,110.3 75.0,109.3 80.8,108.4 86.7,107.5 92.5,106.5 98.3,105.6 104.2,104.7 110.0,103.8 115.8,102.8 121.7,101.9 127.5,101.0 133.3,100.1 139.2,99.2 145.0,98.3 150.8,97.4 156.7,96.5 162.5,95.5 168.3,94.6 174.2,93.7 180.0,92.8 185.8,91.9 191.7,91.1 197.5,90.2 203.3,89.3 209.2,88.4 215.0,87.5 220.8,86.6 226.7,85.7 232.5,84.8 238.3,84.0 244.2,83.1 250.0,82.2 255.8,81.3 261.7,80.5 267.5,79.6 273.3,78.7 279.2,77.9 285.0,77.0 290.8,76.1 296.7,75.3 302.5,74.4 308.3,73.6 314.2,72.7 320.0,71.8 325.8,71.0 331.7,70.1 337.5,69.3 343.3,68.5 349.2,67.6 355.0,66.8 360.8,65.9 366.7,65.1 372.5,64.2 378.3,63.4 384.2,62.6 390.0,61.7" fill="none" stroke="#ff5252" stroke-width="2"/>
  <polyline points="40.0,115.0 45.8,116.0 51.7,116.9 57.5,117.9 63.3,118.8 69.2,119.8 75.0,120.7 80.8,121.7 86.7,122.7 92.5,123.6 98.3,124.6 104.2,125.6 110.0,126.6 115.8,127.6 121.7,128.5 127.5,129.5 133.3,130.5 139.2,131.5 145.0,132.5 150.8,133.5 156.7,134.5 162.5,135.5 168.3,136.5 174.2,137.5 180.0,138.5 185.8,139.5 191.7,140.6 197.5,141.6 203.3,142.6 209.2,143.6 215.0,144.7 220.8,145.7 226.7,146.7 232.5,147.8 238.3,148.8 244.2,149.8 250.0,150.9 255.8,151.9 261.7,153.0 267.5,154.1 273.3,155.1 279.2,156.2 285.0,157.2 290.8,158.3 296.7,159.4 302.5,160.5 308.3,161.6 314.2,162.6 320.0,163.7 325.8,164.8 331.7,165.9 337.5,167.0 343.3,168.1 349.2,169.2 355.0,170.3 360.8,171.4 366.7,172.6 372.5,173.7 378.3,174.8 384.2,175.9 390.0,177.1" fill="none" stroke="#ff5252" stroke-width="2"/>
  <line x1="127.5" y1="20" x2="127.5" y2="210" stroke="#e0a800" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="131" y="34" fill="#e0a800" font-size="10">ε_th (damping)</text>
  <text x="250" y="112" fill="#ff5252" font-size="10" text-anchor="middle">instability (parametric resonance)</text>
</svg>

**Examples:**
- A child on a swing pumps by periodically changing their effective length (standing/sitting).
- Parametric amplifiers in superconducting circuits modulate a Josephson junction's inductance.
- MEMS resonators use parametric pumping for frequency multiplication.
- The Faraday wave experiment: a fluid surface modulated vertically develops standing waves at half the driving frequency.

Parametric excitation is a **subcase of driven oscillations**: the "drive" enters through a coefficient rather than a source term. The distinction matters because parametric resonance occurs at $`\Omega = 2\omega_0` (not $`\omega_0`) and can amplify signals without adding a direct force.

> **Authoritative source for this section:** [Landau &amp; Lifshitz, *Mechanics*, §14: Forced Oscillations](https://www.physics.msu.ru/eng/ll/)

<details><summary>Example problem</summary>

A pendulum of natural frequency $`\omega_0 = 2` rad/s is driven parametrically. At what modulation frequency does the primary parametric resonance occur?

<details><summary>Solution</summary>

The primary parametric resonance is at $`\Omega = 2\omega_0 = 4` rad/s.

</details>

</details>

</details>

## Simulation

<iframe src="./Driven-oscillations.simulation.html" title="Driven oscillator: adjustable drive frequency, damping, and force, with live amplitude-response curve"></iframe>

## Quizz

<details><summary>Quizz</summary>

**Problem:** A driven damped oscillator has $`\omega_0 = 10` rad/s, $`\gamma = 0.5` s⁻¹, and $`F_0/m = 2` m/s². Find the steady-state amplitude at (a) $`\omega = \omega_0`, (b) $`\omega = 2\omega_0`, and (c) the ratio $`X(\omega_0)/X(2\omega_0)`.

<details><summary>Solution</summary>

(a) At resonance: $`X = (F_0/m)/(2\gamma\,\omega_0) = 2/(2 \times 0.5 \times 10) = 2/10 = 0.2` m.

(b) At $`\omega = 20` rad/s:

$`X = 2/\sqrt{(100-400)^2 + (2 \times 0.5 \times 20)^2} = 2/\sqrt{90000 + 400} = 2/\sqrt{90400} \approx 2/300.7 \approx 0.00665` m.

(c) Ratio: $`X(\omega_0)/X(2\omega_0) = 0.2/0.00665 \approx 30`. The amplitude at $`2\omega_0` is about 30× smaller than at resonance, illustrating the sharpness of the peak for $`Q = \omega_0/(2\gamma) = 10`.

</details>

</details>
