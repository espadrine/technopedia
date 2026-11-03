# USB

USB (Universal Serial Bus) is the dominant cabled peripheral interface: the plug you use for keyboards, mice, cameras, drives, and chargers. Its utility comes from three design decisions — a **host-enumerated tree topology** (devices are cheap and dumb), **hot-plug with automatic configuration** (plug it in, it just works), and **power over the same cable** (one cable for data and watts). It is relevant whenever a general-purpose computer must connect to peripheral devices that are not peers.

> **Authoritative sources**
> - [USB-IF document library (all USB specifications)](https://www.usb.org/documents)
> - [USB4® Specification v2.0](https://usb.org/document-library/usb4r-specification-v20)

## Generations and data rates

**Definition.** Each USB generation defines a line rate per lane; from USB 3.2 onward, two lanes can be bonded (`×2`). USB4 abandons dedicated USB semantics and packets everything (USB 3, DisplayPort, optionally PCIe) over the lanes.

<table>
<tr><th>Generation</th><th>Year</th><th>Line rate</th><th>Encoding</th><th>Effective payload</th></tr>
<tr><td>USB 1.0 Low/Full</td><td>1996</td><td>1.5 / 12 Mb/s</td><td>NRZI</td><td>~1.2 / 9.6 Mb/s</td></tr>
<tr><td>USB 2.0 High</td><td>2000</td><td>480 Mb/s</td><td>NRZI + 8b/10b-like bit stuffing</td><td>~280 Mb/s real-world</td></tr>
<tr><td>USB 3.0 (Gen 1)</td><td>2008</td><td>5 Gb/s</td><td>8b/10b</td><td>~4 Gb/s</td></tr>
<tr><td>USB 3.1 (Gen 2)</td><td>2013</td><td>10 Gb/s</td><td>128b/132b</td><td>~9.7 Gb/s</td></tr>
<tr><td>USB 3.2 Gen 2×2</td><td>2017</td><td>2 lanes × 10 Gb/s</td><td>128b/132b</td><td>~19.4 Gb/s</td></tr>
<tr><td>USB4 Gen 3×2</td><td>2019</td><td>2 lanes × 20 Gb/s (NRZ)</td><td>128b/132b</td><td>~38.5 Gb/s per direction</td></tr>
<tr><td>USB4 v2 Gen 4</td><td>2022</td><td>80 Gb/s (PAM3, 25.6 GBd)</td><td>PAM3 + FEC</td><td>~77 Gb/s per direction</td></tr>
</table>

<details><summary>Details: reading the naming, and why rates doubled</summary>

The naming went through three confusing eras. Originally rates were named directly (1.5/12/480 Mb/s). Then "USB 3.2 Gen 1×1 / Gen 2×2" named the *lane speed* and the *lane count*: Gen 2×2 means two lanes at 10 Gb/s each. Marketing names ("SuperSpeed", "SuperSpeed+", "USB 20Gbps") are a fourth layer entirely — always check the line rate.

The rate doublings came from three independent levers, in order:

1. **Faster symbol rate** (480 Mb/s → 5 Gb/s → 10 Gb/s): more transitions per second, limited by the cable's attenuation (see the parent page's skin-effect section).
2. **More bits per symbol**: USB4 v2 switches from NRZ (1 bit/symbol) to PAM3 (three voltage levels, ~1.58 bits/symbol) at 25.6 GBd, nearly doubling the rate at the *same* symbol rate — the same trick Thunderbolt 5 uses.
3. **More lanes**: bonding the two TX and two RX differential pairs of the USB-C connector into one logical link (×2).

Each lever costs something: symbol rate costs cable length, multi-level signalling costs SNR margin, lane bonding costs power and silicon.

</details>

## Topology: the host-device tree

**Definition.** USB is a tiered star: exactly one host (the "root hub") owns the bus; hubs extend it (up to 7 tiers); every device gets one of 127 addresses assigned by the host during **enumeration**. Devices never speak to each other.

<details><summary>Details: what happens when you plug in a device</summary>

1. **Detect.** The device pulls the D+ (full-speed) or D− (low-speed) line up through a resistor; the hub notices the voltage change on its port.
2. **Reset.** The host resets the port and listens at the default address 0.
3. **Describe.** The host asks for *descriptors* — standardized data structures that say what the device is (class: HID, mass storage, video…), its endpoints, and its power needs.
4. **Assign.** The host gives the device a unique address (1–127) and loads the matching [driver](../../Computer-Hardware/Operating-System.md).
5. **Schedule.** From then on the host *polls*: USB has no device-initiated traffic (except remote wakeup). Time is divided into 1 ms frames; the host schedules each endpoint's share.

This polling model is why a cheap mouse and a 10 Gb/s drive share one protocol, and why USB latency for device-initiated events is bounded by the polling interval (1–125 µs for interrupt endpoints).

<details><summary>Example problem</summary>

You daisy-chain a 4-port hub into a 7-port hub into a 4-port hub, and fill every port with devices. How many devices can be addressed, and what limits the count?

<details><summary>Solution</summary>

Each hub consumes one address itself, so the total is bounded by 127 addresses (7 bits) minus the hubs. The deeper limit is the **7-tier** rule (root hub + 6 hubs of depth) and, practically, **power**: each hub must supply 500 mA per port from its own upstream connection, so an unpowered hub chain runs out of watts long before it runs out of addresses.

</details>

</details>

</details>

## Power delivery

**Definition.** USB carries 5 V by default: 500 mA per port for USB 2.0 (2.5 W), 900 mA for USB 3.0 (4.5 W). USB-C raises the default to 1.5 A or 3 A (up to 15 W), and USB Power Delivery (PD) negotiates up to 48 V × 5 A = **240 W** (PD 3.1) over the CC pins.

<details><summary>Details: how negotiation works</summary>

Power negotiation happens on the **CC (Configuration Channel)** pins, separate from the data lanes:

- **Orientation and attachment:** the host has pull-up resistors on CC1 and CC2; the device/cable has pull-downs. Which CC pair conducts tells the host which way the reversible plug was inserted.
- **Current level:** the pull-up value advertises the default current (500 mA / 1.5 A / 3 A).
- **PD contract:** above 3 A, power delivery switches to *BMC communication* on the CC line: source and sink exchange messages (5 V, 9 V, 20 V, 28 V, 36 V, 48 V profiles) and agree on a voltage/current contract before the source applies it.

The consequence: a single USB-C cable can charge a laptop (100 W+) while carrying 80 Gb/s of data — the power and data domains are negotiated independently.

<details><summary>Example problem</summary>

A USB-C monitor needs 15 W and also receives DisplayPort video from the laptop. Explain what the CC pins and the data lanes each do here.

<details><summary>Solution</summary>

The CC pins carry the PD negotiation: the monitor (a *sink*) and the laptop (a *source*) agree on a contract — e.g. 5 V at 3 A — and the laptop then sources 15 W on VBUS. The video is unrelated to that negotiation: it rides the four high-speed differential pairs as a DisplayPort tunnel. One cable, two independent contracts: power on VBUS/CC, data on the TX/RX pairs.

</details>

</details>

</details>

## Transfer types

**Definition.** USB defines four transfer types on every endpoint: **control** (enumeration, configuration), **bulk** (best-effort, high throughput, retried — drives), **interrupt** (small, bounded-latency polls — keyboards), and **isochronous** (guaranteed bandwidth, no retries — audio/video streams).

<details><summary>Details</summary>

The four types are the same trade-off between latency guarantees and loss tolerance, resolved differently:

- **Control** is low-volume and always gets bandwidth; it is how the host learns what the device is.
- **Bulk** uses whatever bandwidth is left, and retries on error — perfect for a flash drive, terrible for a phone call.
- **Interrupt** endpoints are polled at a fixed interval (1 ms to 125 µs); the host guarantees the poll, so a keypress is never late by more than one interval.
- **Isochronous** reserves a fixed slice of every frame and *never retries* — a lost audio sample is skipped, not retransmitted, because a late sample is worse than a lost one.

This is the same distinction as TCP (bulk, retries) vs. UDP with a reserved rate (isochronous) in [networks](../../Distributed-Systems/Networks.md), and the same one that drove FireWire's isochronous channels.

</details>

## Quiz

<details><summary>Example problem</summary>

A 2.5 W (500 mA) USB 2.0 webcam works when plugged directly into the laptop, but fails when plugged into an unpowered hub that also has a 500 mA drive attached. Why?

<details><summary>Solution</summary>

The hub itself consumes one unit load (100 mA, or 500 mA if bus-powered design requires it) and must divide its single upstream 500 mA allocation among its downstream ports. Two 500 mA devices demand 1 A from a port that supplies 0.5 A. The hub must reject or fail the over-current draw — the fix is a *self-powered* hub with its own supply, which is exactly why powered hubs exist.

</details>

</details>
