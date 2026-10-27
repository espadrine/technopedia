# Optical interconnects

Optical interconnects use photons in glass fibre or free space to carry data. They are relevant whenever the distance or bandwidth exceeds what copper can practically deliver: data-centre interconnects between racks and buildings, long-haul and transoceanic telecommunications, satellite laser links, and emerging silicon-photonics I/O on a chip. At the 10 m–1000 km scale, the dominant physics is attenuation and dispersion in the glass, and the design disciplines are photonics, wavelength management, and optical amplification.

The copper side of the crossover is covered by the sibling pages: [Cabled external interconnects](./Cabled-external-interconnects.md) and [Ethernet over copper](./Ethernet-copper.md) own the 1–100 m regime where copper is still cheaper, [Board-level electrical interconnects](./Board-level-interconnects.md) owns the PCB traces that optical modules plug into, and [On-chip interconnects](./On-chip-interconnects.md) owns the in-die wires that optical I/O replaces.

> **Authoritative sources**
> - [ITU-T G.652 (Single-mode fibre)](https://www.itu.int/rec/T-REC-G.652)
> - [ITU-T G.694.1 (DWDM frequency grid)](https://www.itu.int/rec/T-REC-G.694.1)
> - [IEEE 802.3 (Ethernet, including optical PHYs)](https://www.ieee802.org/3/)
> - [OIF 400ZR (coherent DCI implementation agreement)](https://www.oiforum.com/technical-resources/)
> - [OIF CEI-112G (112 Gb/s electrical interface)](https://www.oiforum.com/)

## Fibre types: single-mode vs. multi-mode

**Definition.** Single-mode fibre (SMF, ITU-T G.652) has a 9 µm core that supports one spatial mode; it is used for long-haul (km–1000 km) and data-centre (100 m–2 km) links. Multi-mode fibre (MMF, OM3/OM4) has a 50 or 62.5 µm core that supports many modes; it is used for short-reach (10–550 m) data-centre links.

<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SMF vs MMF: core/cladding cross-section and modal pulse spreading">
  <text x="30" y="24" font-size="13" fill="#222">Single-mode fibre (9 µm core)</text>
  <rect x="30" y="34" width="300" height="70" fill="#d9e8f5" stroke="#8899aa"/>
  <rect x="30" y="65" width="300" height="8" fill="#f5d97a" stroke="#b09a3a"/>
  <line x1="30" y1="69" x2="330" y2="69" stroke="#c0392b" stroke-width="1.5"/>
  <text x="30" y="122" font-size="11" fill="#555">One spatial mode → no modal dispersion</text>
  <text x="420" y="24" font-size="13" fill="#222">Multi-mode fibre (50 µm core)</text>
  <rect x="420" y="34" width="300" height="70" fill="#d9e8f5" stroke="#8899aa"/>
  <rect x="420" y="49" width="300" height="40" fill="#f5d97a" stroke="#b09a3a"/>
  <polyline points="420,69 470,53 520,85 570,53 620,85 670,53 720,69" fill="none" stroke="#c0392b" stroke-width="1.5"/>
  <text x="420" y="122" font-size="11" fill="#555">Many modes, different path lengths → modal dispersion</text>
  <text x="30" y="160" font-size="13" fill="#222">Pulse spreading after the same fibre length</text>
  <path d="M 40 240 Q 55 175 70 240 Z" fill="#2c7fbe"/>
  <text x="30" y="258" font-size="11" fill="#555">Input pulse</text>
  <path d="M 250 240 Q 280 190 310 240 Z" fill="#2c7fbe"/>
  <text x="240" y="258" font-size="11" fill="#555">SMF output (chromatic only)</text>
  <path d="M 470 240 Q 560 205 650 240 Z" fill="#2c7fbe"/>
  <text x="460" y="258" font-size="11" fill="#555">MMF output (modal + chromatic)</text>
</svg>

Attenuation depends on the fibre type and the wavelength; this table is the reference for every link-budget calculation on this page:

<table>
<tr><th>Fibre type</th><th>Wavelength</th><th>Attenuation</th><th>Typical use</th></tr>
<tr><td>SMF (G.652)</td><td>1310 nm</td><td>0.35 dB/km</td><td>Metro, campus, 10 km Ethernet</td></tr>
<tr><td>SMF (G.652)</td><td>1550 nm</td><td>0.20 dB/km</td><td>Long-haul, DCI, DWDM</td></tr>
<tr><td>MMF (OM3/OM4)</td><td>850 nm</td><td>≈3 dB/km</td><td>In-building short reach (VCSELs)</td></tr>
<tr><td>Free space</td><td>1550 nm</td><td>Weather-dependent</td><td>FSO links, satellite laser comms</td></tr>
</table>

<iframe src="./Optical-interconnects.simulation.html" title="Link-budget calculator: distance × attenuation vs launch power and receiver sensitivity"></iframe>

<details><summary>Details</summary>

The key difference is modal dispersion: in MMF, different spatial modes travel at slightly different speeds, spreading the pulse (see the [dispersion](#dispersion-modal-and-chromatic) section). SMF avoids this by supporting only one mode, but requires a more precise (and more expensive) laser source.

**Example.** A data-centre uses OM4 MMF (effective modal bandwidth 4700 MHz·km) for 100 m links between ToR switches, and SMF for 2 km links between buildings. The SMF link uses a 1310 nm or 1550 nm DFB laser; the MMF link uses a VCSEL (vertical-cavity surface-emitting laser) at 850 nm.

**Authoritative sources**

- [ITU-T G.652](https://www.itu.int/rec/T-REC-G.652) — characteristics of single-mode fibre.
- [IEEE 802.3](https://www.ieee802.org/3/) — Clause 52 and later define the 850 nm MMF and 1310/1550 nm SMF PMDs.

<details><summary>Example problem</summary>

A 100 km SMF link at 1550 nm (0.20 dB/km per the table above). The transmitter launches 0 dBm. The receiver sensitivity is −28 dBm. What is the link margin?

<details><summary>Solution</summary>

Total attenuation: 100 km × 0.20 dB/km = 20 dB. Link margin = 0 dBm − 20 dB − (−28 dBm) = 8 dB. This is adequate for a 100 km link without amplification.

</details>

</details>

</details>

## Dispersion: modal and chromatic

**Definition.** Dispersion spreads an optical pulse as it travels, limiting the bit rate–distance product. *Modal dispersion* (MMF only): different spatial modes take different path lengths. *Chromatic dispersion*: different wavelengths travel at different group velocities, with coefficient $`D \approx 17` ps/(nm·km) in SMF at 1550 nm; the pulse spread is $`\Delta T = D \cdot \Delta\lambda \cdot L`.

<iframe src="./Optical-interconnects.simulation.html" title="Animation of a pulse spreading with distance by modal and chromatic dispersion"></iframe>

<details><summary>Details</summary>

**Modal dispersion.** In MMF, rays at steep angles bounce along a longer zig-zag path than the axial ray, so a sharp input pulse arrives smeared over tens of ps per km. This is why MMF is capped at a few hundred metres even though its attenuation (≈3 dB/km) would allow kilometres.

**Chromatic dispersion.** Even in SMF, no laser is perfectly monochromatic: the finite linewidth $`\Delta\lambda` means the pulse is a superposition of wavelengths that arrive at slightly different times. At 1550 nm, $`D = 17` ps/(nm·km): a 0.1 nm-linewidth laser over 100 km spreads by 170 ps — comparable to the 31 ps symbol period of a 32 GBaud signal, so it must be compensated.

**Dispersion compensation.** Three techniques coexist:

1. **Dispersion-compensating fibre (DCF)**: a spool of fibre with $`D \approx -100` ps/(nm·km) that undoes the accumulated dispersion of the transmission fibre (used in long-haul, but it adds loss).
2. **Chirped fibre Bragg gratings**: different wavelengths reflect at different depths, applying a wavelength-dependent delay.
3. **Digital dispersion compensation**: coherent receivers (DSP) equalise dispersion in the electrical domain — this is how modern 400G/800G coherent transceivers handle 80+ km without any inline compensation.

**Example.** A 10 Gb/s NRZ link over SMF at 1550 nm tolerates ~100 ps of spread; with a 0.1 nm laser that allows ~59 km before dispersion (not attenuation) becomes the limit — which is why 10GBASE-LR stops at 10 km with margin.

**Authoritative sources**

- [ITU-T G.652](https://www.itu.int/rec/T-REC-G.652) — specifies the chromatic-dispersion coefficient of SMF.

<details><summary>Example problem</summary>

A 32 GBaud coherent signal (31 ps symbol period) runs over 80 km of SMF at 1550 nm with a 0.1 nm-linewidth laser. How much chromatic dispersion accumulates, and what does a coherent receiver do about it?

<details><summary>Solution</summary>

$`\Delta T = D \cdot \Delta\lambda \cdot L = 17 \text{ ps/(nm·km)} \times 0.1 \text{ nm} \times 80 \text{ km} = 136` ps — about 4.4 symbol periods of smear. A coherent receiver's DSP applies an all-pass equaliser (a frequency-domain phase filter) that reverses the dispersion exactly, so the limit becomes the optical signal-to-noise ratio rather than the pulse shape. A direct-detection link at this rate would need DCF or a chirped Bragg grating instead.

</details>

</details>

</details>

## Wavelength-division multiplexing (WDM)

**Definition.** WDM packs multiple optical channels (wavelengths) into a single fibre. CWDM (Coarse WDM) uses 20 nm spacing (18 channels, 1271–1611 nm). DWDM (Dense WDM) uses the ITU-T G.694.1 fixed grid at 100 GHz (≈0.8 nm) or 50 GHz (≈0.4 nm) spacing. The 35 nm C-band (1530–1565 nm) fits ~44 channels at 100 GHz spacing; 96 channels at 100 GHz requires the combined C+L bands (~77 nm span); alternatively, 96 channels fit an extended C-band (~38.5 nm span, e.g. 1525–1568 nm) at 50 GHz spacing.

<iframe src="./Optical-interconnects.simulation.html" title="Interactive DWDM spectrum visualizer on the ITU grid with aggregate capacity"></iframe>

<details><summary>Details</summary>

WDM is the key technology that makes optical fibre a Tb/s medium. A single SMF pair carrying 96 DWDM channels at 100 Gb/s each moves 9.6 Tb/s; with 400G-per-wavelength coherent transceivers the same fibre carries 38.4 Tb/s.

**Example.** The transoceanic cable MAREA (Bilbao, Spain – Virginia Beach, USA; in service 2018) has 8 fibre pairs and a design capacity of 160 Tb/s, since upgraded to ~200 Tb/s — roughly 25 Tb/s per fibre pair, i.e. on the order of 100 DWDM channels at ~250 Gb/s each. The upgrade was done purely at the landing stations (new transponders), without touching the underwater plant: this is the upgrade granularity that WDM buys.

**Authoritative sources**


- [ITU-T G.694.1](https://www.itu.int/rec/T-REC-G.694.1) — the DWDM frequency grid (193.1 THz anchor, 100/50/25 GHz steps).
- [Telxius: MAREA](https://telxius.com/en/marea-2/) — 8 fibre pairs, 6600 km, 200 Tb/s.
- [Submarine Networks: MAREA](https://www.submarinenetworks.com/en/systems/trans-atlantic/marea) — system details and upgrade history.

<details><summary>Example problem</summary>

How many 100 GHz-spaced DWDM channels fit in the C-band (1530–1565 nm), and what spacing in GHz does 0.8 nm correspond to at 1550 nm?

<details><summary>Solution</summary>

Channel count: 35 nm ÷ 0.8 nm ≈ 44 channels. Spacing in GHz: $`\Delta f = c \cdot \Delta\lambda / \lambda^2 = (3\times10^8 \times 0.8\times10^{-9}) / (1550\times10^{-9})^2 \approx 100` GHz — the standard ITU grid spacing. To reach 96 channels at 100 GHz you must extend into the L-band (C+L, ~77 nm span); at 50 GHz spacing, 96 channels fit an extended C-band of ~38.5 nm (e.g. 1525–1568 nm).

</details>

</details>

</details>

## Optical amplification (EDFA)

**Definition.** An erbium-doped fibre amplifier (EDFA) is a spool of fibre doped with Er³⁺ ions that, pumped at 980 or 1480 nm, amplifies any wavelength in the ~1530–1565 nm band by 20–30 dB — without converting the signal to electricity. Gain-flattening filters keep the amplification uniform across the band.

<details><summary>Details</summary>

The EDFA is the reason 1550 nm won. Two facts line up:

1. **Physics**: silica glass has its attenuation minimum (0.20 dB/km, per the table in the fibre-types section) near 1550 nm, where Rayleigh scattering has fallen off but infrared absorption has not yet risen.
2. **Materials**: the Er³⁺ ion's gain band happens to sit exactly on that minimum. One EDFA amplifies *all* the DWDM channels of the C-band simultaneously — a property no electronic repeater has.

Without optical amplification, a 0.20 dB/km link would need an electronic regenerator (photodetector → electronics → laser) every ~25 km; with EDFAs every 60–80 km, a transatlantic cable crosses 6000+ km with no O-E-O conversion in the middle. **Gain flattening** matters because the Er³⁺ gain spectrum is naturally bumpy (~±2 dB across the band); over 100 cascaded amplifiers those ripples would multiply into a 200 dB tilt, so each amplifier includes a filter that flattens the gain. Raman amplification (pumping the transmission fibre itself) complements EDFAs by lowering the effective span loss.

**Example.** A 6000 km transatlantic system with 75 km amplifier spacing needs ~80 EDFAs, each adding ~4.5 dB of amplified spontaneous emission (ASE) noise; the system is designed so the accumulated OSNR at the far end still supports the target bit rate.

**Authoritative sources**

- [ITU-T G.661](https://www.itu.int/rec/T-REC-G.661) — definitions and test methods for optical amplifiers.

<details><summary>Example problem</summary>

A 300 km SMF link at 1550 nm (0.20 dB/km) launches 0 dBm into a receiver needing −28 dBm. How many EDFAs (gain 20 dB, placed every 100 km) are needed?

<details><summary>Solution</summary>

Total fibre loss: 300 × 0.20 = 60 dB. One EDFA recovers 20 dB, so two EDFAs at 100 km and 200 km leave the last 100 km (20 dB) within the receiver's range: received power = 0 − 60 + 40 = −20 dBm, a margin of 8 dB over −28 dBm. Without amplification the received power would be −60 dBm — 32 dB below sensitivity, i.e. impossible.

</details>

</details>

</details>

## Data-centre interconnect (DCI)

**Definition.** DCI is the optical interconnect between data-centre buildings or campuses, typically 100 m–100 km. It uses SMF with 100G/400G/800G transceivers, either direct-detect (short reach) or coherent (long reach, one wavelength per 100–800G "lambda").

<details><summary>Details</summary>

DCI is the dominant application of optical interconnects in computing. A hyperscale data centre has multiple buildings connected by SMF, with each link carrying 400G or 800G.

**Example.** An 800G DCI link uses 8 × 100G lanes (or 4 × 200G lanes) over SMF. Short-reach variants use direct detection (PAM4 on a single wavelength or parallel lanes); longer reach uses coherent transceivers with DP-QPSK or 16-QAM modulation. The reach is 2–80 km depending on the modulation format and forward error correction (FEC) overhead.

**FEC matters here.** Coherent 100G-per-lambda links (400ZR / Open ROADM class) use ~20% soft-decision FEC (SD-FEC) or open FEC (oFEC) to survive the low OSNR of 80–120 km amplified spans. Do not confuse this with the 7% RS(544,514) FEC of IEEE 802.3 Clause 74/KR4, which protects *electrical* NRZ/PAM4 lanes inside a transceiver or on a PCB — a different layer of the same stack.

The protocol stack above the optical PHY (Ethernet framing, IP, TCP) is covered by [Networks](../Distributed-Systems/Networks.md). The information-theoretic limits (Shannon capacity, FEC overhead) are covered by [Communication](../Information-Theory/Communication.md). The copper side of the 100 m crossover — where a DCI link degrades into an ordinary copper Ethernet run — is covered in [Ethernet over copper](./Ethernet-copper.md).

**Authoritative sources**

- [OIF 400ZR](https://www.oiforum.com/technical-resources/) — 400G coherent DWDM interface for 80–120 km DCI.
- [IEEE 802.3ck / 802.3ct / 802.3cw](https://www.ieee802.org/3/) — 100G/400G/800G optical PMDs (100G per lambda and beyond).

<details><summary>Example problem</summary>

A coherent 100G-per-lambda DCI link uses DP-QPSK at 32 GBaud with 20% oFEC overhead. What is the gross line rate, and how does it land at 100G net?

<details><summary>Solution</summary>

DP-QPSK carries 2 bits per symbol per polarisation, 2 polarisations: 4 bits/symbol. At 32 GBaud: 32 × 4 = 128 Gb/s gross. After 20% FEC overhead: 128 ÷ 1.2 ≈ 106.7 Gb/s. After Ethernet/OTN framing and alignment overhead, the payload is the 100 Gb/s (103.125 Gb/s with 64b/66b line coding) that the Ethernet MAC expects. (The 7% figure belongs to the Clause-74 FEC of electrical NRZ lanes, not to coherent optical links.)

</details>

</details>

</details>

## Optical I/O (silicon photonics)

**Definition.** Optical I/O replaces electrical I/O at a chip's boundary with on-chip photonic transceivers (modulators, waveguides, photodetectors) fabricated in silicon photonics. It targets HPC and AI accelerators, where electrical I/O power and bandwidth density are the limiting factors.

<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Silicon-photonics chip: modulator, waveguide, grating coupler, fibre, photodetector">
  <rect x="20" y="60" width="720" height="150" fill="#eef2f6" stroke="#8899aa"/>
  <text x="30" y="80" font-size="12" fill="#555">Silicon-photonics chip (PIC + EIC)</text>
  <rect x="40" y="110" width="90" height="60" fill="#f5d97a" stroke="#b09a3a"/>
  <text x="48" y="145" font-size="11" fill="#333">Driver +</text>
  <text x="48" y="158" font-size="11" fill="#333">modulator</text>
  <rect x="160" y="133" width="180" height="14" fill="#cfe3f2" stroke="#7a99b5"/>
  <text x="200" y="128" font-size="11" fill="#555">silicon waveguide</text>
  <rect x="360" y="110" width="80" height="60" fill="#d9c8f0" stroke="#8866bb"/>
  <text x="366" y="145" font-size="11" fill="#333">grating</text>
  <text x="366" y="158" font-size="11" fill="#333">coupler</text>
  <rect x="440" y="20" width="120" height="18" fill="#bfe3bf" stroke="#559955"/>
  <text x="452" y="33" font-size="11" fill="#224422">fibre (SMF)</text>
  <line x1="400" y1="110" x2="470" y2="38" stroke="#c0392b" stroke-width="1.5"/>
  <line x1="560" y1="38" x2="620" y2="110" stroke="#c0392b" stroke-width="1.5"/>
  <rect x="560" y="110" width="80" height="60" fill="#d9c8f0" stroke="#8866bb"/>
  <text x="566" y="145" font-size="11" fill="#333">grating</text>
  <text x="566" y="158" font-size="11" fill="#333">coupler</text>
  <rect x="660" y="110" width="70" height="60" fill="#f5d97a" stroke="#b09a3a"/>
  <text x="668" y="145" font-size="11" fill="#333">photo-</text>
  <text x="668" y="158" font-size="11" fill="#333">detector</text>
  <text x="30" y="230" font-size="11" fill="#555">TX: electrical bits → modulator → waveguide → grating coupler → fibre. RX: fibre → coupler → waveguide → photodetector → electrical bits.</text>
</svg>

<details><summary>Details</summary>

Silicon photonics integrates modulators (Mach-Zehnder or micro-ring), waveguides, and photodetectors on a silicon chip, co-packaged with the electronic IC (EIC). The light is coupled to/from the chip via edge couplers or grating couplers into SMF. Optical I/O is the photonics answer to the same die-boundary problem that [On-chip interconnects](./On-chip-interconnects.md) solves electrically: getting Tb/s across a few millimetres of package without melting it.

**Example.** Intel has shipped silicon-photonics transceivers in volume since ~2016 (100G QSFP28 PSM4/LR4/CWDM4 modules, later 400G), used in data-centre switches. In 2024, NVIDIA announced 800G silicon-photonics networking transceivers integrated with its Quantum-X800 InfiniBand and Spectrum-X800 Ethernet switches, cutting optics power by integrating the transceiver with the switch IC.

The advantage: optical I/O has lower energy per bit at high data rates (> 50 Gb/s per lane) and is immune to EMI. The challenge: the laser source is still external (or on a separate chip, because silicon is a poor light emitter), and photonic integration adds packaging cost.

**Authoritative sources**

- [Intel Silicon Photonics 100G PSM4 QSFP28](https://www.intel.com/content/www/us/en/products/sku/96610/intel-silicon-photonics-100g-psm4-qsfp28-optical-transceiver/specifications.html) — shipping silicon-photonics transceiver.
- [NVIDIA: silicon-photonics network switching](https://developer.nvidia.com/blog/a-new-era-in-data-center-networking-with-nvidia-silicon-photonics-based-network-switching) — 2024 Quantum-X800/Spectrum-X800 announcement.
- [Ayar Labs](https://ayarlabs.com/) — optical chiplet I/O ecosystem.

<details><summary>Example problem</summary>

An AI accelerator needs 50 Gb/s per lane across its package. A long-reach electrical serDes costs ~5 pJ/bit; an optical I/O link costs ~2 pJ/bit (modulator + driver + photodetector + TIA). What is the power difference for 64 lanes, and why does the gap grow with data rate?

<details><summary>Solution</summary>

Electrical: 64 × 50 Gb/s × 5 pJ/bit = 16 W. Optical: 64 × 50 Gb/s × 2 pJ/bit = 6.4 W — a saving of ~10 W per chip. The gap grows with rate because electrical loss in copper rises with frequency (skin effect, dielectric loss — see [Board-level electrical interconnects](./Board-level-interconnects.md)), forcing equalisation and more ADC/DSP power per bit, while the optical path loss is roughly frequency-independent; the laser and photodiode cost nearly the same energy whether they carry 25 or 100 Gb/s.

</details>

</details>

</details>

## Free-space optical interconnects

**Definition.** Free-space optics (FSO) replaces the fibre with a modulated laser beam through air or vacuum, used for building-to-building links, rack-to-rack links inside data centres, and inter-satellite laser communication.

<details><summary>Details</summary>

FSO keeps the transceiver physics of the fibre sections above but removes the glass: there is no fibre attenuation (the table's "free space" row) and no chromatic dispersion from silica, but new loss and noise sources appear — atmospheric turbulence and scattering (rain, fog), pointing/acquisition/tracking error between moving terminals, and eye-safety limits on launch power. In vacuum (satellite-to-satellite links) the channel is nearly ideal, which is why laser inter-satellite links carry hundreds of Gb/s over thousands of kilometres. Inside a data centre, FSO competes with fibre only where re-cabling is impossible, because alignment drift and dust make it fragile.

**Example.** A satellite constellation routes traffic between satellites with 100–200 Gb/s laser terminals over 1000–5000 km of vacuum; a terrestrial FSO bridge connects two buildings 1 km apart at 10 Gb/s, degrading to lower rates in heavy rain.

</details>

## Quiz

<details><summary>Example problem 1: parallel fibres vs. DWDM</summary>

A data centre has two buildings 5 km apart. The link must carry 800 Gb/s. Compare two options: (a) **parallel optics** — 8 fibre pairs, each carrying one 100G lane (the 100GBASE-SR8/LR8 convention); (b) **DWDM** — one fibre pair carrying 8 wavelengths at 100G each. Compare fibre count, transceiver cost, and upgrade granularity, and compute the fibre attenuation over 5 km at 1550 nm.

<details><summary>Solution</summary>

**Fibre count.** Option (a) uses 8 fibre pairs; option (b) uses 1 fibre pair. That is the whole point of WDM: it trades optics complexity for glass.

**Transceiver cost.** Option (a) uses 8 cheap, untuned 100G transceivers and no filters. Option (b) needs 8 wavelength-tuned DWDM transceivers plus mux/demux filters — more expensive per bit, but far cheaper than trenching new fibre when ducts are full.

**Upgrade granularity.** Option (a) scales only by lighting spare fibres (or pulling new ones). Option (b) scales by adding another wavelength to the existing fibre pair — no civil works. This is why long-haul and transoceanic systems are DWDM, while short in-building links stay parallel.

**Attenuation.** Either way, 5 km × 0.20 dB/km = 1 dB (plus ~0.6 dB of connectors, per the link-budget calculator). Negligible — no amplification needed.

</details>

</details>

<details><summary>Example problem 2: modal dispersion limit in MMF</summary>

An OM4 fibre has an effective modal bandwidth of 4700 MHz·km at 850 nm. A 25 Gb/s VCSEL link needs roughly 25 GHz of bandwidth. What is the approximate maximum length, and why does 100GBASE-SR4 specify only 100 m over OM4?

<details><summary>Solution</summary>

Ideal length: 4700 MHz·km ÷ 25000 MHz ≈ 0.19 km ≈ 190 m. The standard specifies 100 m because the bandwidth–distance product is a best-case figure: it assumes an ideal (centred) launch, perfect connectors, and no chromatic dispersion from the VCSEL's own linewidth. Real links must leave margin for modal noise, connector offset, and temperature, so the usable length is roughly half the ideal figure.

</details>

</details>
