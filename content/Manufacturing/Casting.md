# Casting

Casting shapes material by solidifying molten material in a mold. It is relevant when a part's geometry is too complex for forming or machining, when large parts are needed, or when the material is naturally castable (most metals, ceramics, polymers).

> **Authoritative sources**
> - [ASM Handbook, Volume 15: Casting](https://www.asminternational.org/)
> - [ISO 8062-3:2023 — General dimensional and geometrical tolerances and machining allowances for castings](https://www.iso.org/standard/77952.html)
> - [ISO 185:2016 — Grey cast irons — Classification](https://www.iso.org/standard/69618.html)

## Utility

- Produces complex geometries (internal cavities, thin walls) in a single step.
- Scales from small jewelry to 100-tonne castings; the primary route for pipes, engine blocks, turbine blades, and machine frames.
- Low per-part cost at high volume (die casting) and viable one-off cost at low volume (sand, lost-foam).

## Key concepts

Start with the physics that every process shares, then read the processes as different ways of exploiting or fighting that physics.

### Solidification and defects

Regardless of whether the mold is sand, ceramic, or steel, the same cooling-rate-driven microstructure and defect mechanisms apply. Every process section below builds on this one.

<details><summary>Details</summary>

**Step-by-step tutorial.**

1. **Pour and cool.** Superheated liquid metal enters the mold and immediately starts losing heat through the mold wall. The rate of heat extraction (governed by the mold material's thermal diffusivity) sets everything that follows: steel and graphite molds cool fastest, ceramic shells slowly, sand slowest.
2. **Nucleation at the mold wall — the chill zone.** The cold wall produces a large undercooling, so many crystals nucleate at once and grow into each other, forming a fine-grained surface layer called the *chill zone*.
3. **Columnar growth.** Behind the chill, a few favorably oriented grains grow inward as long columns, following the heat flow. Fast cooling (metal molds) favors long columnar zones; slow cooling (sand) lets equiaxed grains take over.
4. **Equiaxed center.** In the last liquid, free-floating crystals grow in all directions, giving a coarser, equiaxed (equal-axed) center. Finer equiaxed grains generally mean better toughness and less segregation, which is why foundries add grain refiners.
5. **Shrinkage and feeding.** Most metals shrink 0.7–3 % in volume on solidification (grey iron ~0.7 %, aluminum 1.3–1.8 %, steel ~2 %, zinc 2.5 %). If the last-to-solidify region is not fed by liquid metal from a reservoir (*riser* or *feeder*), it collapses into a shrinkage cavity or dispersed porosity. Riser sizing follows Chvorinov's rule, <i>t</i> = <i>B</i> (<i>V</i>/<i>A</i>)<sup>n</sup> with <i>n</i> ≈ 2: the riser must stay liquid longer than the region it feeds.
6. **Segregation and hot tearing.** Solute elements concentrate in the last-to-solidify liquid (segregation), and a solid skeleton that cannot accommodate the shrinkage strain tears apart while still hot (hot tearing).

**Worked example — a 2 kg aluminum bracket in green sand.** The sand mold extracts heat slowly, so the chill zone is thin and the interior is mostly coarse equiaxed grains. The designer places a riser on the thickest boss so it solidifies last and feeds the boss; the thin walls solidify first and are fed through the still-liquid center. Total solidification takes a few minutes; the bracket shows fine surface grains (good finish for sand) and, if the riser was undersized, dispersed shrinkage porosity in the boss that a denser riser or a chill (a metal insert that accelerates local cooling) would remove.

The microstructure below shows the three zones from mold wall (left) to center (right):

<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:600px;font-family:sans-serif;font-size:11px;">
  <defs>
    <marker id="arrow2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#333"/>
    </marker>
  </defs>
  <rect x="10" y="10" width="20" height="180" fill="#888" stroke="#333"/>
  <text x="20" y="195" text-anchor="middle" font-size="10">Mold</text>
  <rect x="30" y="10" width="60" height="180" fill="#4169e1" opacity="0.6"/>
  <text x="60" y="195" text-anchor="middle" font-size="10">Chill</text>
  <g fill="none" stroke="#fff" stroke-width="0.5">
    <circle cx="40" cy="30" r="4"/><circle cx="55" cy="25" r="3"/><circle cx="70" cy="35" r="4"/>
    <circle cx="45" cy="55" r="3"/><circle cx="60" cy="50" r="4"/><circle cx="75" cy="60" r="3"/>
    <circle cx="40" cy="80" r="4"/><circle cx="55" cy="75" r="3"/><circle cx="70" cy="85" r="4"/>
    <circle cx="45" cy="105" r="3"/><circle cx="60" cy="100" r="4"/><circle cx="75" cy="110" r="3"/>
    <circle cx="40" cy="130" r="4"/><circle cx="55" cy="125" r="3"/><circle cx="70" cy="135" r="4"/>
    <circle cx="45" cy="155" r="3"/><circle cx="60" cy="150" r="4"/><circle cx="75" cy="160" r="3"/>
  </g>
  <rect x="90" y="10" width="120" height="180" fill="#daa520" opacity="0.5"/>
  <text x="150" y="195" text-anchor="middle" font-size="10">Columnar</text>
  <g stroke="#fff" stroke-width="0.8" fill="none">
    <line x1="100" y1="10" x2="100" y2="190"/>
    <line x1="115" y1="10" x2="115" y2="190"/>
    <line x1="130" y1="10" x2="130" y2="190"/>
    <line x1="145" y1="10" x2="145" y2="190"/>
    <line x1="160" y1="10" x2="160" y2="190"/>
    <line x1="175" y1="10" x2="175" y2="190"/>
    <line x1="190" y1="10" x2="190" y2="190"/>
    <line x1="205" y1="10" x2="205" y2="190"/>
  </g>
  <rect x="210" y="10" width="150" height="180" fill="#2e8b57" opacity="0.4"/>
  <text x="285" y="195" text-anchor="middle" font-size="10">Equiaxed</text>
  <g fill="none" stroke="#fff" stroke-width="0.8">
    <polygon points="230,30 245,20 260,30 255,45 235,45"/>
    <polygon points="270,25 285,15 300,25 295,40 275,40"/>
    <polygon points="310,30 325,20 340,30 335,45 315,45"/>
    <polygon points="230,70 245,60 260,70 255,85 235,85"/>
    <polygon points="270,65 285,55 300,65 295,80 275,80"/>
    <polygon points="310,70 325,60 340,70 335,85 315,85"/>
    <polygon points="230,110 245,100 260,110 255,125 235,125"/>
    <polygon points="270,105 285,95 300,105 295,120 275,120"/>
    <polygon points="310,110 325,100 340,110 335,125 315,125"/>
    <polygon points="230,150 245,140 260,150 255,165 235,165"/>
    <polygon points="270,145 285,135 300,145 295,160 275,160"/>
    <polygon points="310,150 325,140 340,150 335,165 315,165"/>
  </g>
  <line x1="370" y1="100" x2="418" y2="100" stroke="#333" stroke-width="2" marker-end="url(#arrow2)"/>
  <text x="395" y="90" text-anchor="middle" font-size="10">Cooling</text>
  <text x="395" y="115" text-anchor="middle" font-size="10">direction</text>
</svg>

**Sources**: ASM Handbook, Volume 15: Casting; J. Campbell, *Complete Casting Handbook* (Elsevier).

<details><summary>Example problem</summary>

A 100 mm-diameter aluminum ingot solidifies with a large pipe (shrinkage cavity) down its center. Explain why it forms, and give two ways to eliminate it.

<details><summary>Solution</summary>

Aluminum shrinks ~1.3–1.8 % in volume on solidification. The ingot solidifies from the mold wall inward and from the bottom upward, so the last liquid sits at the thermal center; when it freezes there is no liquid left to feed it, and the deficit appears as a shrinkage pipe. Fixes: (1) place a riser on top, sized (via Chvorinov's rule) so it stays liquid longer than the ingot and feeds the shrinking center; (2) make solidification directional toward the riser with an insulating or exothermic sleeve and a chilled base; (3) in stock production, avoid the problem entirely with continuous casting, which feeds the sump continuously.

</details>

</details>

</details>

### Sand casting

A pattern is used to form a sand mold; molten metal is poured in, solidified, and the sand is broken away.

<details><summary>Details</summary>

**Variants (cheatsheet).**

- **Green sand**: silica sand bound with clay and water. Cheap, reusable, but moderate surface finish (Ra 6.3–25 µm) and dimensional accuracy of ±0.75–1.5 mm on a 100 mm dimension (ISO 8062-3 casting tolerance grades CT9–CT11).
- **Resin-bonded sand**: phenolic or urethane resin. Better surface finish, used for medium production.
- **Shell molding**: a thin shell of resin-bonded sand is formed around a heated metal pattern. High accuracy (±0.2 mm), surface finish reaching ~3 µm, used for precision parts.

**Step-by-step tutorial.**

1. **Pattern.** A replica of the part, slightly oversized to compensate for solidification shrinkage and machining allowance, is made of wood, metal, or resin. Loose pieces or sloped surfaces (draft) let it be withdrawn from the sand.
2. **Mold.** The pattern is embedded in the *drag* (bottom flask) filled with sand, the flask is flipped, the *cope* (top flask) is added, and the sprue (pour channel) and riser (feed reservoir) are formed. The two halves are separated, the pattern withdrawn, and the flasks reassembled at the *parting line*.
3. **Core.** Internal cavities (a water jacket, a bore) are made by placing pre-baked sand *cores* into the mold; they are destroyed during shakeout.
4. **Pour.** Molten metal flows down the sprue, through the gating system, and fills the cavity. Pouring temperature and rate are chosen to fill thin sections before they freeze while avoiding turbulence that entrains oxide film and gas.
5. **Solidify and shakeout.** The casting solidifies as in the [Solidification and defects](#solidification-and-defects) section; then the mold is broken apart ("shakeout") and the sand is reclaimed.
6. **Fettling.** The sprue, risers, and flash are cut off and the part is ground and cleaned.

**Worked example — 500 gray-iron pump housings.** A wood pattern (with 1 % shrink allowance) is mounted on a matchplate; green sand is rammed around it in a cope-and-drag flask. Cores form the internal volute passage. Gray iron is poured at ~1400 °C; its ~0.7 % solidification shrinkage and graphite expansion make feeding easy, so a small riser suffices. Shakeout after ~20 min, fettling, and the housings are ready for machining of the sealing face. Tolerance on a 200 mm dimension: about ±1.5–2 mm (CT9–CT11), so the sealing face carries machining allowance.

Cross-section of a cope-and-drag sand mold:

<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;font-family:sans-serif;font-size:12px;">
  <rect x="60" y="30" width="400" height="80" fill="#e8d5b7" stroke="#8b7355"/>
  <rect x="60" y="110" width="400" height="80" fill="#d9c49a" stroke="#8b7355"/>
  <rect x="120" y="10" width="16" height="100" fill="#f4a460" stroke="#8b4513"/>
  <rect x="400" y="10" width="16" height="100" fill="#f4a460" stroke="#8b4513"/>
  <ellipse cx="270" cy="110" rx="100" ry="20" fill="#f4a460" stroke="#8b4513"/>
  <rect x="240" y="96" width="60" height="28" fill="#d2b48c" stroke="#8b4513"/>
  <line x1="60" y1="110" x2="460" y2="110" stroke="#333" stroke-dasharray="6 4"/>
  <text x="70" y="50">Cope</text>
  <text x="70" y="175">Drag</text>
  <text x="465" y="114">Parting line</text>
  <text x="100" y="8">Sprue</text>
  <text x="385" y="8">Riser</text>
  <text x="243" y="92">Core</text>
  <text x="230" y="205">Cavity (the part)</text>
</svg>

**Sources**: ISO 8062-3:2023 (tolerance grades); ASM Handbook, Volume 15: Casting.

<details><summary>Example problem</summary>

A drawing calls for a 150 mm green-sand casting dimension with ±0.5 mm tolerance. Is green sand adequate, and what should the foundry propose?

<details><summary>Solution</summary>

No. Green sand on a 150 mm dimension sits around CT9–CT11, roughly ±1–2 mm — two to four times looser than requested. Options: (1) keep green sand but add machining allowance on that face and finish it by machining; (2) switch to shell molding or resin-bonded sand (±0.2–0.5 mm); (3) switch to investment casting if the whole part needs that accuracy. The cheapest route is usually (1): cast loose, machine tight.

</details>

</details>

</details>

### Investment casting (lost-wax)

A wax pattern is coated in ceramic slurry, the wax is melted out, and molten metal is poured into the ceramic shell.

<details><summary>Details</summary>

**Cheatsheet.** Surface finish Ra 1.6–6 µm (specialized processes reach ~0.8 µm); dimensional accuracy ±0.1 mm. Used for turbine blades, jewelry, surgical instruments, and complex aerospace parts. The ceramic shell must withstand the pour temperature and thermal shock.

**Step-by-step tutorial.**

1. **Wax pattern.** Molten wax is injection-molded in an aluminum die — the same injection principle as [die casting](#die-casting), but with wax. Each pattern is an exact replica of the part plus shrink and machining allowances.
2. **Treeing.** Patterns are welded onto a central wax sprue so many parts share one shell ("tree").
3. **Shell build.** The tree is dipped in a fine ceramic slurry (the *faced coat*, which sets the surface finish), stuccoed with coarse grit, and dried; this dip–stucco–dry cycle is repeated 6–10 times to build a shell thick enough to survive handling and the pour.
4. **Dewax.** The shell is flash-heated (steam autoclave or furnace) so the wax melts and drains out, leaving a hollow ceramic mold.
5. **Fire and pour.** The shell is fired at ~1000 °C for strength, then poured while hot (to avoid thermal shock and premature freezing of thin sections). For high-integrity parts the shell is evacuated or a small overpressure is applied to minimize gas porosity and ensure complete fill of thin sections.
6. **Knockout.** The ceramic is broken away mechanically or with water jets, and parts are cut from the tree.

**Worked example — a nickel-superalloy turbine blade.** A wax pattern with a ceramic-wire core inside it forms the internal cooling channels. Eight zirconia slurry layers build a shell that survives a 1500 °C vacuum pour. Because the shell is fired hot and the metal is superalloy, the as-cast blade needs only grinding of the root and polishing of the airfoil — the complex airfoil and channels come out of the mold finished.

Shell cross-section (wax pattern inside layered ceramic):

<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;font-family:sans-serif;font-size:12px;">
  <ellipse cx="160" cy="110" rx="70" ry="45" fill="#ffd700" stroke="#b8860b"/>
  <ellipse cx="160" cy="110" rx="85" ry="60" fill="none" stroke="#c8bfa0" stroke-width="7"/>
  <ellipse cx="160" cy="110" rx="100" ry="75" fill="none" stroke="#a89f80" stroke-width="7"/>
  <ellipse cx="160" cy="110" rx="115" ry="90" fill="none" stroke="#888470" stroke-width="7"/>
  <text x="160" y="114" text-anchor="middle">Wax</text>
  <text x="300" y="60">Faced coat (fine, sets finish)</text>
  <text x="300" y="90">Stucco layers 2–4</text>
  <text x="300" y="120">Outer layers (strength)</text>
  <text x="300" y="160">Shell fired to ~1000 °C,</text>
  <text x="300" y="180">wax melted out, then poured</text>
</svg>

**Sources**: ASM Handbook, Volume 15: Casting; Investment Casting Institute publications.

<details><summary>Example problem</summary>

Why is investment casting chosen for a nickel-superalloy turbine blade rather than high-pressure die casting, which is far faster?

<details><summary>Solution</summary>

Two reasons. (1) Material: Inconel-type superalloys melt around 1300–1400 °C and are highly reactive with steel dies; no die-casting die survives that, so HPDC is limited to Al, Zn, and Mg. (2) Integrity: turbine blades need porosity-free, fine, controlled microstructures and internal cooling channels, which the ceramic shell + vacuum pour + core system provides and HPDC (with its entrapped-gas porosity) cannot.

</details>

</details>

</details>

### Die casting

Molten metal (typically aluminum, zinc, magnesium) is forced into a steel die at high pressure.

<details><summary>Details</summary>

**Variants (cheatsheet).**

- **High-pressure die casting (HPDC)**: 50–150 MPa injection pressure. Very fast cycle (seconds), surface finish Ra 0.8–3.2 µm as-cast (zinc Zamak at the lower end, aluminum A380 at the upper; worn dies or very complex features can degrade this to ~6.3 µm), but porosity is common due to gas entrapment.
- **Low-pressure die casting (LPDC)**: 0.02–0.2 MPa (most commonly 0.06–0.15 MPa for aluminum). Slower but lower porosity; used for engine blocks and transmission housings.
- **Squeeze casting**: pressure is maintained during solidification to minimize porosity.
- **Permanent mold (gravity die) casting**: a reusable metal mold is filled by gravity or low-pressure head, with no high-pressure injection. It sits between sand casting and HPDC in the process spectrum: better surface finish and dimensional accuracy than sand, lower tooling cost and porosity than HPDC. Typical for aluminum and magnesium parts in medium-to-high volume.

The steel die is expensive but lasts 100,000+ shots, making die casting economical above ~10,000 parts.

**Step-by-step tutorial.**

1. **Die preparation.** Two steel die halves are clamped and sprayed with a release agent that also cools the die surface.
2. **Shot.** In a *cold-chamber* machine (aluminum, magnesium) a measured dose of molten metal is ladled into a shot sleeve and a hydraulic plunger drives it into the die at 50–150 MPa; in a *hot-chamber* machine (zinc, whose alloys do not attack the gooseneck) the injection mechanism sits in the melt and cycles continuously.
3. **Fill and solidify.** The metal fills the cavity in tens of milliseconds; venting lets air escape, but some is entrained — the source of HPDC porosity. The metal solidifies against the steel die in seconds (fast cooling → fine surface grains, per [Solidification and defects](#solidification-and-defects)).
4. **Eject.** The die opens and ejector pins push the part out; the cycle repeats every ~30–60 s.
5. **Trim.** The overflow, gates, and flash are trimmed in a punch die and remelted.

**Worked example — an aluminum A380 gearbox housing, 200,000 units/year.** A cold-chamber HPDC machine injects at ~70 MPa; cycle time 45 s, so one machine produces the annual volume. As-cast finish Ra ~1.6–3.2 µm and ±0.1 mm on a 100 mm dimension mean only the bearing bores need machining. The entrapped-gas porosity is acceptable because the housing is not pressure-tight and will not be welded (welding would expand the gas and blister the surface).

Cold-chamber HPDC schematic:

<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;font-family:sans-serif;font-size:12px;">
  <defs>
    <marker id="arrow3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#333"/>
    </marker>
  </defs>
  <line x1="8" y1="110" x2="22" y2="110" stroke="#333" stroke-width="2" marker-end="url(#arrow3)"/>
  <rect x="24" y="88" width="36" height="44" fill="#4682b4" stroke="#191970"/>
  <rect x="60" y="83" width="180" height="54" fill="#555"/>
  <rect x="66" y="98" width="120" height="24" fill="#f4a460"/>
  <rect x="240" y="40" width="90" height="140" fill="#7788aa" stroke="#191970"/>
  <rect x="380" y="40" width="90" height="140" fill="#7788aa" stroke="#191970"/>
  <rect x="240" y="95" width="90" height="12" fill="#f4a460"/>
  <rect x="330" y="75" width="50" height="55" fill="#f4a460" stroke="#8b4513"/>
  <text x="30" y="150">Plunger</text>
  <text x="80" y="155">Shot sleeve (molten metal)</text>
  <text x="240" y="32">Fixed die</text>
  <text x="380" y="32">Moving die</text>
  <text x="322" y="145">Cavity</text>
  <text x="255" y="90">Gate</text>
  <text x="440" y="115">50–150 MPa</text>
</svg>

**Sources**: NADCA (North American Die Casting Association) standards; ASM Handbook, Volume 15: Casting.

<details><summary>Example problem</summary>

A zinc electrical connector needs 200,000 units/year, Ra ≤ 1.6 µm, and ±0.05 mm on a 30 mm dimension. Which die-casting variant, and why?

<details><summary>Solution</summary>

Hot-chamber HPDC with a zinc alloy (Zamak 3). Zinc's low melting point (~420 °C) lets the injection mechanism sit in the melt, giving very short cycles (seconds) and long die life; zinc fills fine detail at low injection pressures and delivers Ra ~0.8–1.6 µm and ±0.05 mm on small dimensions as-cast. The 200,000-unit volume easily amortizes the steel die.

</details>

</details>

</details>

### Lost-foam (pattern) casting

An expanded polystyrene (EPS) pattern is placed in a sand mold and molten metal is poured directly over it; the foam vaporizes and is consumed during pouring. No core or pattern removal is needed. Increasingly used for engine blocks, cylinder heads, and complex automotive parts where near-net-shape geometry reduces machining.

<details><summary>Details</summary>

**Step-by-step tutorial.**

1. **EPS pattern fabrication.** Polystyrene beads are pre-expanded with steam, then steam-molded in an aluminum tool into the full pattern shape (or segments glued together). The pattern is an exact positive of the part — it *is* the pattern and the core at once, which is why cores disappear in this process.
2. **Coating.** The pattern is dipped in a thin refractory slurry and dried. The coating is the actual mold surface: it sets the finish, and it must be permeable enough to let the vaporized foam gas escape.
3. **Flasking.** The coated pattern is placed in a flask and loose, unbonded dry sand is poured around it and vibrated to compact. No binder, no hardening: the coating holds the sand off the metal.
4. **Pouring dynamics.** This is the heart of the process. As metal advances, the foam ahead of it must vaporize and its gas must escape through the coating. The pour rate must match the foam's vaporization rate: pour too slowly and the mold can collapse or the front stalls (misrun); pour too fast and liquid overtakes the foam, trapping foam decomposition products in the metal (carbon films, porosity).
5. **Solidify and shakeout.** Solidification follows the same physics as every other process ([Solidification and defects](#solidification-and-defects)); the loose sand simply falls away — no raking, no core knocking.

**Typical defects.** Surface roughness and "orange peel" laps where foam residue was trapped against the coating; dimensional inaccuracy from pattern expansion during steam molding (EPS patterns can distort after molding, so they are aged before use); misruns in thin sections where the vaporization front outran the metal.

**Worked example — an aluminum cylinder head.** The water jacket and ports, which would each need a separate core in sand casting, are simply part of the glued EPS pattern. The pattern cluster is coated, flasked in dry sand, and poured at ~740 °C with the pour rate tuned to the vaporization front. The result is a near-net head with no core-assembly step and far less machining of the port surfaces — the reason foundries adopted it for complex blocks and heads.

<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;font-family:sans-serif;font-size:12px;">
  <rect x="60" y="40" width="440" height="170" fill="#d9c49a" stroke="#8b7355"/>
  <rect x="250" y="18" width="60" height="22" fill="#f4a460" stroke="#8b4513"/>
  <rect x="270" y="40" width="20" height="60" fill="#f4a460"/>
  <rect x="270" y="100" width="20" height="32" fill="#ff4500"/>
  <rect x="200" y="132" width="160" height="55" fill="#ffffff" stroke="#999"/>
  <line x1="200" y1="132" x2="360" y2="132" stroke="#ff4500" stroke-width="2" stroke-dasharray="5 3"/>
  <text x="255" y="14">Pouring cup</text>
  <text x="295" y="70">Sprue</text>
  <text x="295" y="122">Metal front</text>
  <text x="365" y="128">Vaporization front</text>
  <text x="205" y="165">EPS pattern</text>
  <text x="70" y="228">Flask of loose, unbonded dry sand</text>
</svg>

**Sources**: ASM Handbook, Volume 15: Casting; American Foundry Society, lost-foam process publications.

<details><summary>Example problem</summary>

An engine-block foundry wants to eliminate the dozens of cores needed for the water jacket. Which process fits, and what new defect risks come with it?

<details><summary>Solution</summary>

Lost-foam casting: the EPS pattern includes the water jacket geometry, so no cores are needed and the jacket comes out as-cast. New risks: (1) foam-vaporization defects — carbon films and porosity if the pour outruns the vaporization front; (2) misruns if the front outruns the pour; (3) pattern distortion from steam molding and handling, which propagates directly into casting dimensions; (4) surface roughness from foam residue at the coating interface. All are managed by pattern aging, coating permeability, and pour-rate control.

</details>

</details>

</details>

### Centrifugal casting

Molten metal is poured into a rotating mold; centrifugal force (typically 60–100 times gravity) presses the metal against the mold wall, so the bore of a tube, pipe, or ring forms without any core.

<details><summary>Details</summary>

**Cheatsheet.** The effective acceleration is $`G = \omega^2 r / g`; foundries run 60–100 g so the metal forms a uniform annulus regardless of gravity. Dimensional accuracy ±0.2–0.5 mm on the outside diameter (the bore is set by the poured metal volume); surface finish Ra 3–12 µm; cycle minutes; metal or graphite mold, reusable for thousands of pours.

**Step-by-step tutorial.**

1. **Spin up.** A cylindrical metal (or graphite) mold is rotated about its axis — horizontal for long pipes and cylinder liners, vertical for rings and short tubes.
2. **Pour.** Metal is poured into the spinning mold; the centrifugal field flings it to the wall, where it spreads into an even annulus. The axis of rotation *is* the bore of the finished part — no core, no core prints, no core assembly.
3. **Solidify.** Solidification proceeds from the mold wall inward, i.e. directionally toward the bore. This is the process's key advantage: the wall solidifies first and is always fed by liquid metal closer to the free surface, so the casting is dense and sound.
4. **Segregation to the bore.** The same field that presses the metal outward also floats less-dense inclusions and traps shrinkage at the free surface — the bore. The bore carries the defects, and it is machined off (or is the surface that gets bored to size anyway).
5. **Extract.** Rotation stops, the tube or ring is pulled from the mold, and the bore is machined.

**Variants.** *True* centrifugal casting (a hollow part whose bore is the rotation axis: pipes, cylinder liners, bushings); *semi-centrifugal* (solid-of-revolution parts like wheels, spun about a central riser); *centrifuging* (several small molds on a spinning table, using the field to feed thin sections).

**Worked example — a 6 m ductile-iron water pipe.** A horizontal water-cooled steel mold spins at ~1000 rpm; a measured ladle of ductile iron runs in along the axis and spreads into a 6 mm wall. The pipe solidifies from the mold wall inward in about a minute, dense and free of shrinkage; any inclusions sit in the bore skin, which is machined or spun out. One mold pours thousands of pipes — this is how most of the world's ductile-iron water mains are made.

<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;font-family:sans-serif;font-size:12px;">
  <defs>
    <marker id="arrow4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#333"/>
    </marker>
  </defs>
  <circle cx="180" cy="130" r="110" fill="#7788aa" stroke="#191970"/>
  <circle cx="180" cy="130" r="90" fill="#f4a460" stroke="#8b4513"/>
  <circle cx="180" cy="130" r="55" fill="#1a1a2e"/>
  <path d="M 180 5 A 125 125 0 0 1 305 130" fill="none" stroke="#333" stroke-width="2" marker-end="url(#arrow4)"/>
  <text x="180" y="134" text-anchor="middle" fill="#aaa">Bore</text>
  <text x="180" y="255" text-anchor="middle">Rotating mold (500–1500 rpm)</text>
  <text x="320" y="60">Metal annulus pressed to the</text>
  <text x="320" y="78">wall by 60–100 g</text>
  <text x="320" y="110">Bore forms without a core</text>
  <text x="320" y="140">Solidifies wall → bore:</text>
  <text x="320" y="158">always fed, dense wall</text>
  <text x="320" y="190">Inclusions &amp; shrinkage collect</text>
  <text x="320" y="208">at the bore (machined off)</text>
</svg>

**Sources**: ASM Handbook, Volume 15: Casting; ISO 2531 (ductile-iron pipes).

<details><summary>Example problem</summary>

A 6 m ductile-iron water pipe with a 200 mm bore is to be cast. Why is no core needed, and where do the inclusions end up?

<details><summary>Solution</summary>

The mold spins about the pipe's own axis at 60–100 g, so the metal forms an annulus against the mold wall; the empty center of rotation *is* the 200 mm bore, defined by how much metal is poured — no core is required. Inclusions and any residual shrinkage are less dense than the melt, so the centrifugal field drives them inward, where they concentrate in the bore skin, which is machined away when the pipe is finished to size.

</details>

</details>

</details>

### Continuous casting

Continuous casting is the upstream stock-production route: molten metal is poured into a water-cooled, oscillating mold and withdrawn as a continuous strand of slab, billet, or bloom. It produces stock rather than individual parts, so it is not a part-casting process like the sections above; it is covered as the primary stock-production step in [Materials processing](./Materials-processing.md), and its output feeds [Forming](./Forming.md) and [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md).

### Casting simulation (CAE)

Modern casting design rarely relies on trial pours alone: numerical simulation of mold filling, solidification, and residual stress predicts defects before the first physical trial.

<details><summary>Details</summary>

- **What is simulated**: transient mold filling (velocity fields, air entrapment, oxide-film folding), heat transfer and solidification (temperature fields, solidification-time maps, feeding criteria such as the Niyama criterion for shrinkage porosity), and thermo-mechanical behavior (distortion, hot-tear risk, residual stress).
- **Commercial tools**: MAGMASOFT, ProCAST (ESI Group), AnyCasting, FLOW-3D CAST.
- **How it is used**: the foundry meshes mold + casting, runs fill and solidification, and iterates gating, riser, and chill design until the predicted porosity and hot-tear indices are acceptable — cutting physical trial pours from several to one or none.
- **Limitations**: results depend on accurate thermophysical data; the metal–mold interface heat-transfer coefficient is the largest uncertainty, so simulation predicts trends and risk locations more reliably than exact defect sizes.

</details>

## Process comparison

<table>
<tr><th>Process</th><th>Dimensional tolerance</th><th>Surface finish (Ra)</th><th>Cycle time</th><th>Tooling / mold cost</th><th>Min. economical batch</th><th>Typical materials</th></tr>
<tr><td>Sand casting (green)</td><td>±0.75–1.5 mm (CT9–CT11 at 100 mm)</td><td>6.3–25 µm</td><td>minutes</td><td>Low (pattern + sand)</td><td>1</td><td>Iron, steel, Al, Cu, Ni</td></tr>
<tr><td>Shell molding</td><td>±0.2 mm</td><td>~3 µm</td><td>minutes</td><td>Moderate</td><td>10–100</td><td>Steel, Al, Cu</td></tr>
<tr><td>Investment casting</td><td>±0.1 mm</td><td>1.6–6 µm</td><td>hours (shell build)</td><td>Moderate (wax die)</td><td>10–1000</td><td>Superalloys, steel, Al, Ti</td></tr>
<tr><td>Permanent mold (gravity)</td><td>±0.2 mm</td><td>3–10 µm</td><td>1–5 min</td><td>Moderate–high (metal mold)</td><td>100–1000</td><td>Al, Mg, Zn</td></tr>
<tr><td>Die casting (HPDC)</td><td>±0.1 mm</td><td>0.8–3.2 µm (up to 6.3 µm with worn dies or complex features)</td><td>seconds</td><td>High (steel die)</td><td>10 000+</td><td>Al, Zn, Mg</td></tr>
<tr><td>Lost-foam</td><td>±0.3 mm</td><td>6–25 µm</td><td>minutes</td><td>Low (EPS pattern)</td><td>1</td><td>Iron, Al</td></tr>
<tr><td>Centrifugal casting</td><td>±0.2–0.5 mm (OD)</td><td>3–12 µm</td><td>minutes</td><td>Moderate (metal/graphite mold)</td><td>10+</td><td>Iron, steel, Cu, Ni</td></tr>
</table>

Continuous casting is excluded from the table: it produces stock (slab, billet, bloom), not parts — see [Materials processing](./Materials-processing.md).

## Process flow schematic

<svg viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:900px;font-family:sans-serif;font-size:12px;">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#333"/>
    </marker>
  </defs>
  <!-- Sand casting flow -->
  <rect x="10" y="10" width="120" height="30" rx="4" fill="#e8d5b7" stroke="#8b7355"/>
  <text x="70" y="30" text-anchor="middle">Pattern</text>
  <rect x="150" y="10" width="120" height="30" rx="4" fill="#e8d5b7" stroke="#8b7355"/>
  <text x="210" y="30" text-anchor="middle">Sand mold</text>
  <rect x="290" y="10" width="120" height="30" rx="4" fill="#f4a460" stroke="#8b4513"/>
  <text x="350" y="30" text-anchor="middle">Pour metal</text>
  <rect x="430" y="10" width="120" height="30" rx="4" fill="#c0c0c0" stroke="#555"/>
  <text x="490" y="30" text-anchor="middle">Solidify</text>
  <rect x="570" y="10" width="120" height="30" rx="4" fill="#d2b48c" stroke="#8b7355"/>
  <text x="630" y="30" text-anchor="middle">Break mold</text>
  <rect x="710" y="10" width="120" height="30" rx="4" fill="#90ee90" stroke="#2e8b57"/>
  <text x="770" y="30" text-anchor="middle">Part</text>
  <text x="10" y="55" font-size="11" fill="#555">Sand casting</text>
  <line x1="130" y1="25" x2="148" y2="25" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="270" y1="25" x2="288" y2="25" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="410" y1="25" x2="428" y2="25" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="550" y1="25" x2="568" y2="25" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="690" y1="25" x2="708" y2="25" stroke="#333" marker-end="url(#arrow)"/>

  <!-- Investment casting flow -->
  <rect x="10" y="70" width="120" height="30" rx="4" fill="#ffd700" stroke="#b8860b"/>
  <text x="70" y="90" text-anchor="middle">Wax pattern</text>
  <rect x="150" y="70" width="120" height="30" rx="4" fill="#f5f5dc" stroke="#8b8b00"/>
  <text x="210" y="90" text-anchor="middle">Ceramic shell</text>
  <rect x="290" y="70" width="120" height="30" rx="4" fill="#ff6347" stroke="#8b0000"/>
  <text x="350" y="90" text-anchor="middle">Wax out</text>
  <rect x="430" y="70" width="120" height="30" rx="4" fill="#f4a460" stroke="#8b4513"/>
  <text x="490" y="90" text-anchor="middle">Pour metal</text>
  <rect x="570" y="70" width="120" height="30" rx="4" fill="#c0c0c0" stroke="#555"/>
  <text x="630" y="90" text-anchor="middle">Solidify</text>
  <rect x="710" y="70" width="120" height="30" rx="4" fill="#90ee90" stroke="#2e8b57"/>
  <text x="770" y="90" text-anchor="middle">Part</text>
  <text x="10" y="115" font-size="11" fill="#555">Investment casting</text>
  <line x1="130" y1="85" x2="148" y2="85" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="270" y1="85" x2="288" y2="85" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="410" y1="85" x2="428" y2="85" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="550" y1="85" x2="568" y2="85" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="690" y1="85" x2="708" y2="85" stroke="#333" marker-end="url(#arrow)"/>

  <!-- Die casting flow -->
  <rect x="10" y="130" width="120" height="30" rx="4" fill="#4682b4" stroke="#191970"/>
  <text x="70" y="150" text-anchor="middle">Steel die</text>
  <rect x="150" y="130" width="120" height="30" rx="4" fill="#f4a460" stroke="#8b4513"/>
  <text x="210" y="150" text-anchor="middle">Inject metal</text>
  <rect x="290" y="130" width="120" height="30" rx="4" fill="#c0c0c0" stroke="#555"/>
  <text x="350" y="150" text-anchor="middle">Solidify</text>
  <rect x="430" y="130" width="120" height="30" rx="4" fill="#90ee90" stroke="#2e8b57"/>
  <text x="490" y="150" text-anchor="middle">Eject part</text>
  <text x="10" y="175" font-size="11" fill="#555">Die casting</text>
  <line x1="130" y1="145" x2="148" y2="145" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="270" y1="145" x2="288" y2="145" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="410" y1="145" x2="428" y2="145" stroke="#333" marker-end="url(#arrow)"/>

  <!-- Lost-foam casting flow -->
  <rect x="10" y="190" width="120" height="30" rx="4" fill="#ffffff" stroke="#999"/>
  <text x="70" y="210" text-anchor="middle">EPS pattern</text>
  <rect x="150" y="190" width="120" height="30" rx="4" fill="#c8bfa0" stroke="#8b8b00"/>
  <text x="210" y="210" text-anchor="middle">Refractory coat</text>
  <rect x="290" y="190" width="120" height="30" rx="4" fill="#d9c49a" stroke="#8b7355"/>
  <text x="350" y="210" text-anchor="middle">Dry-sand flask</text>
  <rect x="430" y="190" width="120" height="30" rx="4" fill="#f4a460" stroke="#8b4513"/>
  <text x="490" y="210" text-anchor="middle">Pour (foam vaporizes)</text>
  <rect x="570" y="190" width="120" height="30" rx="4" fill="#c0c0c0" stroke="#555"/>
  <text x="630" y="210" text-anchor="middle">Solidify</text>
  <rect x="710" y="190" width="120" height="30" rx="4" fill="#90ee90" stroke="#2e8b57"/>
  <text x="770" y="210" text-anchor="middle">Part</text>
  <text x="10" y="235" font-size="11" fill="#555">Lost-foam casting</text>
  <line x1="130" y1="205" x2="148" y2="205" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="270" y1="205" x2="288" y2="205" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="410" y1="205" x2="428" y2="205" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="550" y1="205" x2="568" y2="205" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="690" y1="205" x2="708" y2="205" stroke="#333" marker-end="url(#arrow)"/>

  <!-- Centrifugal casting flow -->
  <rect x="10" y="250" width="120" height="30" rx="4" fill="#7788aa" stroke="#191970"/>
  <text x="70" y="270" text-anchor="middle">Spin mold</text>
  <rect x="150" y="250" width="120" height="30" rx="4" fill="#f4a460" stroke="#8b4513"/>
  <text x="210" y="270" text-anchor="middle">Pour metal</text>
  <rect x="290" y="250" width="120" height="30" rx="4" fill="#ff8c00" stroke="#8b4513"/>
  <text x="350" y="270" text-anchor="middle">Press to wall</text>
  <rect x="430" y="250" width="120" height="30" rx="4" fill="#c0c0c0" stroke="#555"/>
  <text x="490" y="270" text-anchor="middle">Solidify</text>
  <rect x="570" y="250" width="120" height="30" rx="4" fill="#90ee90" stroke="#2e8b57"/>
  <text x="630" y="270" text-anchor="middle">Extract tube</text>
  <text x="10" y="295" font-size="11" fill="#555">Centrifugal casting</text>
  <line x1="130" y1="265" x2="148" y2="265" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="270" y1="265" x2="288" y2="265" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="410" y1="265" x2="428" y2="265" stroke="#333" marker-end="url(#arrow)"/>
  <line x1="550" y1="265" x2="568" y2="265" stroke="#333" marker-end="url(#arrow)"/>
</svg>

## Interactive simulation

<iframe src="./Casting.simulation.html" title="Mold filling and solidification microstructure animation"></iframe>

## Quizz

<details><summary>Example problem</summary>

A turbine blade with a complex airfoil cross-section, internal cooling channels, and a 1.5 mm minimum wall thickness must be produced from a nickel superalloy (Inconel 718). Which casting process is appropriate, and what does the full route look like?

<details><summary>Solution</summary>

1. **Process**: Investment casting (lost-wax). Sand casting cannot achieve the 1.5 mm wall or the internal channels. Die casting is not suitable for nickel superalloys (melting point ~1336 °C, high reactivity with steel dies).
2. **Wax pattern**: Made by injection molding into a steel die. The internal cooling channels are formed by wax inserts or by a lost-core process.
3. **Ceramic shell**: 8–10 layers of zirconia-based slurry, dried and fired. Must withstand 1500 °C pour.
4. **Pour**: Vacuum investment casting to minimize gas porosity. The blade is oriented with the thickest section (root) at the top to feed the thin airfoil.
5. **Post-casting**: Hot isostatic pressing (HIP) — the part is held at elevated temperature (~0.7 of the melting point) in high-pressure (100–200 MPa) inert argon gas, which collapses the residual gas-filled pores and welds their surfaces shut, closing internal porosity; then [Subtractive manufacturing](./Subtractive-manufacturing/Readme.md) for the root dovetail and [Surface finishing](./Surface-finishing.md) for the airfoil surface.

</details>

</details>

## Parent

This page is a class in the [Manufacturing](./Readme.md) topic.
