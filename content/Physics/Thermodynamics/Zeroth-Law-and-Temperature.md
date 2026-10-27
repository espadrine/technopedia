# Zeroth Law and Temperature

The zeroth law defines thermal equilibrium and the temperature variable. It is the logical prerequisite for every other thermodynamic law: without a well-defined temperature, the first and second laws have no state to describe. Use it when you need to justify that a thermometer reading is meaningful, or when you need to define what "same temperature" means operationally.

> **Authoritative sources**
> - [Zeroth law of thermodynamics — Wikipedia](https://en.wikipedia.org/wiki/Zeroth_law_of_thermodynamics)
> - [Callen, Thermodynamics and an Introduction to Thermostatistics, Ch. 1](https://www.oxfordacademic.com/uk/thermodynamics-and-an-introduction-to-thermostatistics/9780198503935)

## Thermal equilibrium

**Definition.** Two systems in thermal contact are in *thermal equilibrium* when no net heat flows between them. The relation "is in thermal equilibrium with" ($`\sim`) is an equivalence relation: reflexive, symmetric, and transitive. Transitivity is the zeroth law proper.

<details><summary>Details</summary>

**Step 1 — Operational definition and diathermal walls.**

To test whether two systems are in thermal equilibrium, you place them in *thermal contact*: they are separated by a **diathermal wall** (a wall that permits energy transfer as heat but not matter). If, after a sufficiently long time, no macroscopic change occurs in either system — no net heat flow, no change in any measurable variable — the two systems are in thermal equilibrium.

The entire operational definition rests on the existence of diathermal walls. Without a wall that allows heat to flow freely, you cannot bring two systems into thermal contact, and the equivalence relation has no physical meaning. In practice, a thin metal wall or direct contact between solids approximates a diathermal wall well.

**Step 2 — The equivalence relation.**

The zeroth law states that the relation $`\sim` satisfies all three properties of an equivalence relation:

- **Reflexive:** $`A \sim A`. A system is trivially in equilibrium with itself.
- **Symmetric:** $`A \sim B \;\Longrightarrow\; B \sim A`. If no net heat flows from A to B, none flows from B to A.
- **Transitive (the zeroth law proper):** $`A \sim B \;\text{and}\; B \sim C \;\Longrightarrow\; A \sim C`.

Because $`\sim` is an equivalence relation, the set of all systems partitions into **equivalence classes**. Each class can be labeled by a single real number — temperature. Without transitivity, no single labeling variable would exist; you would need a separate parameter for every pair of systems.

**Step 3 — Visualizing the partition.**

The following diagram shows five systems and the thermal-contact relations between them. Systems connected by a solid line are in thermal equilibrium. The dashed line between A and C is *not* a direct contact; it is the consequence of transitivity. A, B, and C all belong to the same equivalence class (same temperature), even though A and C are never placed in direct contact. D and E form a second, distinct equivalence class.

<svg width="420" height="230" xmlns="http://www.w3.org/2000/svg" style="background:#16213e;border-radius:8px;margin:12px 0;display:block">
  <!-- Equivalence class 1: A, B, C -->
  <circle cx="90" cy="60" r="28" fill="rgba(230,57,70,0.2)" stroke="#e63946" stroke-width="2"/>
  <text x="90" y="65" text-anchor="middle" fill="#eee" font-size="14" font-weight="bold">A</text>
  <circle cx="210" cy="60" r="28" fill="rgba(255,159,67,0.2)" stroke="#ff9f43" stroke-width="2"/>
  <text x="210" y="65" text-anchor="middle" fill="#eee" font-size="14" font-weight="bold">B</text>
  <circle cx="330" cy="60" r="28" fill="rgba(8,145,178,0.2)" stroke="#0891b2" stroke-width="2"/>
  <text x="330" y="65" text-anchor="middle" fill="#eee" font-size="14" font-weight="bold">C</text>
  <!-- Solid lines: A-B, B-C (direct contact) -->
  <line x1="118" y1="60" x2="182" y2="60" stroke="#52b788" stroke-width="2.5"/>
  <line x1="238" y1="60" x2="302" y2="60" stroke="#52b788" stroke-width="2.5"/>
  <!-- Dashed line A-C (transitivity, not direct contact) -->
  <line x1="118" y1="60" x2="302" y2="60" stroke="#52b788" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.45"/>
  <!-- Equivalence class 2: D, E -->
  <circle cx="150" cy="165" r="28" fill="rgba(157,78,221,0.2)" stroke="#9d4edd" stroke-width="2"/>
  <text x="150" y="170" text-anchor="middle" fill="#eee" font-size="14" font-weight="bold">D</text>
  <circle cx="270" cy="165" r="28" fill="rgba(157,78,221,0.2)" stroke="#9d4edd" stroke-width="2"/>
  <text x="270" y="170" text-anchor="middle" fill="#eee" font-size="14" font-weight="bold">E</text>
  <line x1="178" y1="165" x2="242" y2="165" stroke="#52b788" stroke-width="2.5"/>
  <!-- Labels -->
  <text x="210" y="108" text-anchor="middle" fill="#aaa" font-size="11">Class 1: T&#8321;  (A &#8764; B &#8764; C)</text>
  <text x="210" y="215" text-anchor="middle" fill="#aaa" font-size="11">Class 2: T&#8322;  (D &#8764; E)</text>
  <!-- Legend -->
  <line x1="30" y1="130" x2="55" y2="130" stroke="#52b788" stroke-width="2.5"/>
  <text x="60" y="134" fill="#888" font-size="10">direct contact</text>
  <line x1="30" y1="145" x2="55" y2="145" stroke="#52b788" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="60" y="149" fill="#888" font-size="10">transitivity</text>
</svg>

**Step 4 — Worked example.**

Suppose you have three metal blocks: A at 400 K, B at 300 K, and C at 350 K. You place A in contact with B through a thin copper wall (a diathermal wall). Heat flows from A to B until both reach a common temperature. You then place B in contact with C. Heat flows from B to C until both reach a common temperature. By transitivity, A and C are in thermal equilibrium with each other, even though they were never placed in direct contact. All three blocks now share the same equivalence class and the same temperature.

**Step 5 — Thermometers.**

A thermometer is a system C whose one macroscopic variable (e.g., volume of mercury, resistance of a wire) depends only on the equivalence class it shares with the system being measured. The zeroth law guarantees that this reading is independent of the thermometer used: any two thermometers in the same equivalence class give the same reading (up to calibration).

> **Authoritative sources**
> - [Zeroth law of thermodynamics — Wikipedia](https://en.wikipedia.org/wiki/Zeroth_law_of_thermodynamics)
> - [Callen, Ch. 1](https://www.oxfordacademic.com/uk/thermodynamics-and-an-introduction-to-thermostatistics/9780198503935)

<details><summary>Example problem</summary>

You have four objects: a cup of hot water (A), a metal spoon (B), a glass of cold water (C), and a room-temperature table (D). You place the spoon in the hot water and wait until equilibrium. You then remove the spoon, place it in the cold water, and wait until equilibrium. Is the hot water in thermal equilibrium with the cold water? Explain using the zeroth law.

<details><summary>Solution</summary>

No. After the first step, A &#8764; B (hot water and spoon share a temperature). After the second step, B &#8764; C (spoon and cold water share a temperature). But the spoon's temperature *changed* between the two steps: it was at the hot-water temperature in step 1 and at the cold-water temperature in step 2. The transitivity of $`\sim` requires that B be in the *same* equilibrium state in both relations. Since B is in different states, transitivity does not apply, and A and C are not in thermal equilibrium.

</details>

</details>

</details>

## Temperature as an intensive variable

**Definition.** Temperature $`T` is the intensive variable that equalizes when two systems are placed in thermal contact:

```math
T_A = T_B \quad \Longleftrightarrow \quad \text{A and B in thermal equilibrium}
```

<details><summary>Details</summary>

**Step 1 — Intensive vs. extensive.**

A variable is *extensive* if it scales with the amount of material (volume, internal energy, entropy) and *intensive* if it does not (temperature, pressure). If you split a system in two, each half has the same temperature and pressure, but half the volume and internal energy. Temperature is the intensive variable that equalizes at thermal equilibrium.

**Step 2 — Thermal contact and the equilibrium condition.**

Two systems are in thermal contact when they can exchange energy as heat through a diathermal wall but not matter or volume. At equilibrium, their temperatures are equal. This is the operational content of the zeroth law: the condition $`T_A = T_B` is both necessary and sufficient for thermal equilibrium.

**Step 3 — Temperature scales.**

The zeroth law justifies the *existence* of a temperature scale but does not fix it. Any monotonic function of the equivalence-class label is a valid temperature scale. The Kelvin scale is fixed by the second law (Carnot efficiency) and, in the modern SI (since 2019), by the Boltzmann constant $`k_B = 1.380649 \times 10^{-23}` J/K.

**Step 4 — Statistical definition (pointer).**

At the microscopic level, temperature is defined by $`1/T = (\partial S / \partial U)_{V,N}`. This makes the operational (zeroth-law) definition and the fundamental (statistical) definition coincide. The full derivation is developed in [Statistical Foundations of Thermodynamics](./Statistical-Foundations-of-Thermodynamics.md).

**Step 5 — Worked example.**

Two identical copper blocks, each of mass 1 kg, are at 400 K and 300 K. The specific heat of copper is $`c = 385` J/(kg·K). When placed in thermal contact (isolated from the surroundings), the final equilibrium temperature is:

```math
T_f = \frac{m c \, T_1 + m c \, T_2}{2 m c} = \frac{T_1 + T_2}{2} = \frac{400 + 300}{2} = 350 \text{ K}
```

Both blocks end at 350 K regardless of their mass — this is the intensive character of temperature. If you doubled the mass of both blocks, the equilibrium temperature would still be 350 K.

> **Authoritative sources**
> - [Callen, Ch. 1](https://www.oxfordacademic.com/uk/thermodynamics-and-an-introduction-to-thermostatistics/9780198503935)

<details><summary>Example problem</summary>

A 2 kg block of iron ($`c = 450` J/(kg·K)) at 500 K is placed in thermal contact with a 1 kg block of aluminum ($`c = 900` J/(kg·K)) at 300 K. The system is isolated. Find the equilibrium temperature.

<details><summary>Solution</summary>

Energy conservation (first law, no work): $`m_{\text{Fe}} c_{\text{Fe}} (T_f - 500) + m_{\text{Al}} c_{\text{Al}} (T_f - 300) = 0`.

```math
2 \times 450 \,(T_f - 500) + 1 \times 900\,(T_f - 300) = 0
```

```math
900\,T_f - 450000 + 900\,T_f - 270000 = 0
```

```math
1800\,T_f = 720000 \quad\Longrightarrow\quad T_f = 400 \text{ K}
```

The equilibrium temperature is 400 K. The iron and aluminum have equal heat capacities ($`m c = 900` J/K each), so the result is exactly the midpoint of the two initial temperatures weighted by heat capacity.

</details>

</details>

</details>

## Empirical temperature

**Definition.** Before the second law, temperature is defined empirically: choose a reference substance and a measurable property $`X`, and set

```math
T_{\text{emp}} = T_0 \, \frac{X}{X_0}
```

where $`T_0`, $`X_0` are the values at a fixed reference point.

<details><summary>Details</summary>

**Step 1 — The empirical construction.**

Pick a reference substance (e.g., a gas at low pressure) and a measurable property $`X` (pressure, volume, resistance). Fix a reference point (e.g., the triple point of water at $`T_0 = 273.16` K). For any other state, measure $`X` and compute $`T_{\text{emp}} = T_0 \, X / X_0`. This gives a number that labels the equivalence class.

**Step 2 — The ideal gas thermometer.**

For an ideal gas at fixed volume, $`X = P` (pressure). The empirical temperature is proportional to pressure. In the limit of zero pressure, all gas thermometers (regardless of gas species) agree, defining the ideal-gas temperature scale. This is the most practical realization of the thermodynamic temperature.

**Step 3 — Common empirical thermometers.**

Three practical types are widely used:

1. **Constant-volume gas thermometer** — measures pressure of a fixed amount of gas.
2. **Resistance (platinum) thermometer** — measures electrical resistance of a platinum wire.
3. **Thermocouple** — measures the Seebeck voltage between two dissimilar metals.

At finite pressure, current, or junction temperature, these three give slightly different readings for the same equilibrium state. They converge to a common value only in the ideal limit (zero pressure, zero current, ideal junctions), which is the thermodynamic temperature.

**Step 4 — Convergence diagram.**

The following diagram shows how the readings of three different empirical thermometers converge to the thermodynamic temperature as the non-ideal parameter (pressure, current, etc.) is driven to zero.

<svg width="440" height="270" xmlns="http://www.w3.org/2000/svg" style="background:#16213e;border-radius:8px;margin:12px 0;display:block">
  <!-- Axes -->
  <line x1="70" y1="230" x2="410" y2="230" stroke="#888" stroke-width="1.5"/>
  <line x1="70" y1="230" x2="70" y2="20" stroke="#888" stroke-width="1.5"/>
  <!-- Axis labels -->
  <text x="240" y="258" text-anchor="middle" fill="#aaa" font-size="11">non-ideal parameter (P, I, &#8230;) &#8594; 0</text>
  <text x="20" y="130" text-anchor="middle" fill="#aaa" font-size="11" transform="rotate(-90,20,130)">reading</text>
  <!-- Thermodynamic temperature line -->
  <line x1="70" y1="105" x2="410" y2="105" stroke="#52b788" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="415" y="109" fill="#52b788" font-size="10">T (thermodynamic)</text>
  <!-- Gas thermometer curve (converges from above) -->
  <path d="M 400,55 Q 260,72 110,97 Q 80,101 70,105" fill="none" stroke="#e63946" stroke-width="2"/>
  <text x="370" y="48" fill="#e63946" font-size="10">gas (P)</text>
  <!-- Resistance thermometer curve (converges from below) -->
  <path d="M 400,160 Q 260,135 110,112 Q 80,108 70,105" fill="none" stroke="#ff9f43" stroke-width="2"/>
  <text x="370" y="175" fill="#ff9f43" font-size="10">resistance (I)</text>
  <!-- Thermocouple curve (converges from above, steeper) -->
  <path d="M 400,35 Q 260,62 110,93 Q 80,99 70,105" fill="none" stroke="#0891b2" stroke-width="2"/>
  <text x="370" y="30" fill="#0891b2" font-size="10">thermocouple</text>
  <!-- Convergence point -->
  <circle cx="70" cy="105" r="5" fill="#52b788"/>
  <text x="78" y="122" fill="#52b788" font-size="10">ideal limit</text>
</svg>

**Step 5 — Worked example.**

A constant-volume gas thermometer uses helium. At the triple point of water ($`T_0 = 273.16` K), the helium pressure is $`P_0 = 100.0` kPa. At an unknown temperature, the pressure reads $`P = 120.0` kPa. The empirical temperature is:

```math
T_{\text{emp}} = 273.16 \times \frac{120.0}{100.0} = 327.8 \text{ K}
```

In the zero-pressure limit this would equal the thermodynamic temperature. At finite pressure, a small correction (on the order of a few tenths of a kelvin) would be needed.

**Step 6 — Limitations.**

The empirical scale depends on the choice of reference substance. The second law (via Carnot) shows that there is a unique absolute scale — the thermodynamic temperature — that makes the efficiency of a Carnot engine depend only on the two reservoir temperatures. See [Second Law and Entropy](./Second-Law-and-Entropy.md) for the absolute temperature definition.

> **Authoritative sources**
> - [Gas thermometer — NIST](https://www.nist.gov/pml/thermometry/gas-thermometry)
> - [Callen, Ch. 1](https://www.oxfordacademic.com/uk/thermodynamics-and-an-introduction-to-thermostatistics/9780198503935)

<details><summary>Example problem</summary>

A platinum resistance thermometer reads $`R = 130.7` &#937; at the triple point of water ($`T_0 = 273.16` K, $`R_0 = 100.0` &#937;) and $`R = 155.0` &#937; at an unknown temperature. Using the linear approximation $`T_{\text{emp}} = T_0 \, R / R_0`, find the temperature.

<details><summary>Solution</summary>

```math
T_{\text{emp}} = 273.16 \times \frac{155.0}{100.0} = 423.4 \text{ K}
```

This is approximately 150.2 °C. In practice, the platinum resistance–temperature relation is not perfectly linear, and a higher-order polynomial (the Callendar–Van Dusen equation) is used for precision work. The linear approximation is adequate to within about 0.1 K over this range.

</details>

</details>

</details>

## Quizz

<details><summary>Problem</summary>

A mercury thermometer reads 37.0 °C in a patient's mouth. A resistance thermometer reads 310.15 K in the same mouth. A third system (a cup of coffee) is in thermal equilibrium with the patient. What can you conclude about the coffee's temperature, and why is the answer independent of which thermometer you use?

<details><summary>Solution</summary>

The patient's mouth is in thermal equilibrium with both thermometers, so all three (mercury thermometer, resistance thermometer, mouth) share the same equivalence class. The coffee is in thermal equilibrium with the patient, so by transitivity (the zeroth law) the coffee is in the same equivalence class as both thermometers.

Therefore the coffee's temperature is 37.0 °C = 310.15 K. The answer is independent of which thermometer you use because the zeroth law guarantees that all thermometers in the same equivalence class read the same value (up to calibration). The mercury thermometer and the resistance thermometer agree here because 37.0 °C + 273.15 = 310.15 K; at other temperatures or with non-ideal instruments they might differ slightly, but the *conclusion* that the coffee is in the same equilibrium class does not depend on the instrument.

</details>

</details>

<iframe src="./Zeroth-Law-and-Temperature.simulation.html" title="Three systems reaching thermal equilibrium"></iframe>