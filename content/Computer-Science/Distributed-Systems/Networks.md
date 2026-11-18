# Networks

Networks study how messages are transmitted between machines: the protocols, addressing, and security layers that make communication possible. They are relevant whenever a program must exchange data with another machine.

> **Authoritative sources**
> - [RFC 791: Internet Protocol](https://datatracker.ietf.org/doc/html/rfc791)
> - [RFC 793: Transmission Control Protocol](https://datatracker.ietf.org/doc/html/rfc793)
> - [RFC 768: User Datagram Protocol](https://datatracker.ietf.org/doc/html/rfc768)
> - [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)
> - [RFC 8446: TLS 1.3](https://datatracker.ietf.org/doc/html/rfc8446)
> - [RFC 9000: QUIC](https://datatracker.ietf.org/doc/html/rfc9000)

## TCP/IP layering model

The TCP/IP stack ([RFC 1122](https://datatracker.ietf.org/doc/html/rfc1122)) is a set of layers, each providing a service to the layer above. Data is **encapsulated** as it travels down (each layer prepends its header) and **decapsulated** as it travels up (each layer strips its header).

<table>
<tr><th>Layer</th><th>Protocol</th><th>Unit</th><th>Key field</th></tr>
<tr><td>Application</td><td>HTTP, DNS, TLS</td><td>Message</td><td>Method, path, status code</td></tr>
<tr><td>Transport</td><td>TCP, UDP</td><td>Segment / Datagram</td><td>Source port, destination port</td></tr>
<tr><td>Network</td><td>IP</td><td>Packet</td><td>Source IP, destination IP, TTL</td></tr>
<tr><td>Link</td><td>Ethernet, Wi-Fi</td><td>Frame</td><td>Source MAC, destination MAC</td></tr>
<tr><td>Physical</td><td>Copper/fiber/ radio signalling</td><td>Bits</td><td>Voltage or light level, preamble</td></tr>
</table>

A web request `GET /api/data` becomes: HTTP request → TCP segment (ports 54321→443) → IP packet (192.168.1.10→93.184.216.34) → Ethernet frame (MAC AA:BB→MAC CC:DD). Each router strips the Ethernet frame, reads the IP header to decide the next hop, and re-encapsulates with a new Ethernet frame.

The physical and link layers carry frames between directly connected nodes — covered in the next two sections (and electrically in [Interfaces and Buses](../Computer-Hardware/Interfaces-and-Buses/Readme.md)). Everything above the link layer is the subject of the rest of this page.

<details><summary>EXPLANATION</summary>

**Protocols are standards.** Each layer is defined by a standard document (typically an RFC) that fixes the exact bytes of its header, so any implementation can talk to any other. Layers depend on the layer below — HTTP needs TCP (or QUIC/UDP), which needs IP, which needs a link layer — forming a **protocol stack**; the lower layers are interchangeable (IP over Wi-Fi instead of Ethernet, HTTP over QUIC instead of TCP).

**Encapsulation, concretely.** Each layer takes the upper layer's data and wraps it: it prepends its own header (and the link layer appends a trailer). The result nests like Russian dolls:

<svg viewBox="0 0 780 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Encapsulation of a GET request: the HTTP message sits inside a TCP segment, inside an IPv4 packet, inside an Ethernet frame. Each layer adds its own header; the frame also has a preamble, SFD and FCS trailer." style="max-width:780px;width:100%;background:#f8f9fb;border-radius:8px">
  <text x="390" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Encapsulation: each layer wraps the upper layer's data in its own header</text>
  <rect x="20" y="50" width="740" height="252" rx="8" fill="#f3eefb" stroke="#7777bb" stroke-width="2"/>
  <text x="32" y="68" font-size="11" font-weight="bold" fill="#4a3a8c">Ethernet frame (link)</text>
  <text x="752" y="68" text-anchor="end" font-size="9.5" fill="#4a3a8c">preamble 7B + SFD 1B + header 14B + payload + FCS 4B (+ IPG 12B) = 115 B on the wire</text>
  <rect x="32" y="78" width="150" height="212" rx="4" fill="#e8e8f5" stroke="#7777bb"/>
  <text x="40" y="96" font-size="9" fill="#333">dst MAC (6B)</text>
  <text x="40" y="110" font-size="9" fill="#333">src MAC (6B)</text>
  <text x="40" y="124" font-size="9" fill="#333">EtherType (2B)</text>
  <text x="40" y="142" font-size="8.5" fill="#666">0x0800 = IPv4</text>
  <rect x="190" y="78" width="556" height="212" rx="4" fill="#eef3fb" stroke="#4a6fa5" stroke-width="2"/>
  <text x="200" y="96" font-size="11" font-weight="bold" fill="#1c3a5e">IPv4 packet (network) — 77 B</text>
  <rect x="200" y="104" width="104" height="174" rx="4" fill="#cfe0f5" stroke="#4a6fa5"/>
  <text x="208" y="122" font-size="9" fill="#12365e">IPv4 header</text>
  <text x="208" y="134" font-size="9" fill="#12365e">20 B</text>
  <text x="208" y="152" font-size="8.5" fill="#666">protocol = 6</text>
  <text x="208" y="164" font-size="8.5" fill="#666">(TCP)</text>
  <rect x="312" y="104" width="422" height="174" rx="4" fill="#eaf7ee" stroke="#3d8b57" stroke-width="2"/>
  <text x="322" y="122" font-size="11" font-weight="bold" fill="#1d5c38">TCP segment (transport) — 57 B</text>
  <rect x="322" y="130" width="96" height="136" rx="4" fill="#cdeedd" stroke="#3d8b57"/>
  <text x="330" y="148" font-size="9" fill="#14532d">TCP header</text>
  <text x="330" y="160" font-size="9" fill="#14532d">20 B</text>
  <text x="330" y="178" font-size="8.5" fill="#666">ports 54321→443</text>
  <rect x="426" y="130" width="296" height="136" rx="4" fill="#fdf3e7" stroke="#b57a4a" stroke-width="2"/>
  <text x="436" y="148" font-size="11" font-weight="bold" fill="#7a4a12">HTTP request — 37 B</text>
  <text x="436" y="168" font-size="9" font-family="monospace" fill="#5c3317">GET / HTTP/1.1\r\n</text>
  <text x="436" y="184" font-size="9" font-family="monospace" fill="#5c3317">Host: example.com\r\n</text>
  <text x="436" y="200" font-size="9" font-family="monospace" fill="#5c3317">\r\n</text>
  <text x="436" y="226" font-size="8.5" fill="#7a4a12">CRLF = 0x0D 0x0A; the message</text>
  <text x="436" y="240" font-size="8.5" fill="#7a4a12">ends with an empty line</text>
</svg>

**Worked example, byte by byte.** Send `GET / HTTP/1.1` with a single header:

```http
GET / HTTP/1.1\r\n
Host: example.com\r\n
\r\n
```

That is 37 bytes of HTTP message (14 + 2 CRLF + 17 + 2 CRLF + 2 empty line). Then:

- **TCP** prepends its 20-byte header → a 57-byte segment (ports 54321→443, sequence/ack numbers).
- **IP** prepends its 20-byte header → a 77-byte packet (src 192.168.1.10, dst 93.184.216.34, protocol 6 = TCP, TTL 64).
- **Ethernet** prepends 14 bytes (dst MAC, src MAC, EtherType 0x0800) and appends a 4-byte FCS → a 95-byte frame; on the wire add the 7-byte preamble, 1-byte SFD and 12-byte interpacket gap → 115 bytes transmitted.

**Typical sizes.** The Ethernet **MTU** (maximum transmission unit) is 1500 bytes of payload, so an IP packet is at most 1500 bytes and a TCP segment at most 1500 − 20 − 20 = **1460 bytes (the MSS)**. A maximal frame is 14 + 1500 + 4 = 1522 bytes (1542 on the wire with preamble/SFD/gap). At the other extreme, a frame has a 64-byte minimum: a bare TCP ACK is a 40-byte IP packet (20 IP + 20 TCP, no data), giving a 60-byte frame, padded to 64. Datacenter links often enable **jumbo frames** (~9000 bytes) to amortize per-packet processing. On the public Internet most packets are small — many are pure ACKs — so the *average* packet is a few hundred bytes, not 1500.

**Header formats.** The exact bit layout of each header is detailed in the sections below: the [Ethernet frame](#point-to-point-links-ethernet-and-wi-fi), the [IPv4 and IPv6 headers](#ip-and-routing), the [TCP header](#tcp).

</details>

## The physical path: from a laptop to a datacenter

Every packet travels over physical **links**. A laptop in a home connects over **Wi-Fi or Ethernet** to a **home router** (which does [NAT](#ip-and-routing) and runs [DHCP](#dhcp)). The router connects to an **ONT** (Optical Network Terminal) over **FTTH** (Fiber To The Home, e.g. [GPON — ITU-T G.984](https://www.itu.int/rec/T-REC-G.984/en)) — fiber all the way into the home. The ISP aggregates many homes at an **OLT** and backhauls over metro fiber, using **optical repeaters/amplifiers** (EDFA) every ~80–100 km to boost the light signal. Between continents, traffic crosses **undersea submarine cables**: fiber pairs lying on the seabed, with in-line amplifiers every ~50–100 km, landing at cable landing stations. At the destination sits the **datacenter**: rows of **racks** (typically 42U), each topped by a **top-of-rack (ToR) switch**, with racks wired to **spine switches** in a leaf-spine fabric, plus power and cooling.

<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The physical path of a packet: laptop, home router, ONT over FTTH, OLT, metro fiber to a PoP or IXP, long-haul backbone or undersea cable, landing station, then inside the datacenter: spine switches, top-of-rack switch, server rack." style="max-width:760px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="ph-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#555"/></marker>
  </defs>
  <text x="380" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">The physical path of a packet: from a laptop to a datacenter</text>
  <!-- home / access row -->
  <rect x="10" y="70" width="130" height="60" rx="6" fill="#eaf7ee" stroke="#3d8b57" stroke-width="2"/>
  <text x="75" y="97" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d5c38">Laptop</text>
  <text x="75" y="116" text-anchor="middle" font-size="10" fill="#444">NIC</text>
  <line x1="140" y1="100" x2="186" y2="100" stroke="#555" stroke-width="2" marker-end="url(#ph-arr)"/>
  <text x="163" y="62" text-anchor="middle" font-size="9" fill="#555">Wi-Fi / Ethernet</text>
  <text x="163" y="146" text-anchor="middle" font-size="8.5" fill="#777">meters</text>
  <rect x="190" y="70" width="130" height="60" rx="6" fill="#eaf7ee" stroke="#3d8b57" stroke-width="2"/>
  <text x="255" y="97" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d5c38">Home router</text>
  <text x="255" y="116" text-anchor="middle" font-size="10" fill="#444">NAT · DHCP</text>
  <line x1="320" y1="100" x2="366" y2="100" stroke="#555" stroke-width="2" marker-end="url(#ph-arr)"/>
  <text x="343" y="62" text-anchor="middle" font-size="9" fill="#555">fiber drop</text>
  <rect x="370" y="70" width="130" height="60" rx="6" fill="#eaf7ee" stroke="#3d8b57" stroke-width="2"/>
  <text x="435" y="97" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d5c38">ONT</text>
  <text x="435" y="116" text-anchor="middle" font-size="10" fill="#444">optical modem</text>
  <line x1="500" y1="100" x2="546" y2="100" stroke="#555" stroke-width="2" marker-end="url(#ph-arr)"/>
  <text x="523" y="62" text-anchor="middle" font-size="9" fill="#555">FTTH · GPON</text>
  <text x="523" y="146" text-anchor="middle" font-size="8.5" fill="#777">1–10 Gb/s, passive splitter</text>
  <rect x="550" y="70" width="130" height="60" rx="6" fill="#eef3fb" stroke="#4a6fa5" stroke-width="2"/>
  <text x="615" y="97" text-anchor="middle" font-size="13" font-weight="bold" fill="#1c3a5e">OLT</text>
  <text x="615" y="116" text-anchor="middle" font-size="10" fill="#444">ISP central office</text>
  <!-- connector down to the long-haul row -->
  <line x1="615" y1="130" x2="615" y2="226" stroke="#555" stroke-width="2" marker-end="url(#ph-arr)"/>
  <text x="627" y="185" font-size="9" fill="#555">metro fiber · EDFA repeaters</text>
  <text x="627" y="198" font-size="9" fill="#555">every ~80–100 km</text>
  <!-- long-haul row, right to left -->
  <rect x="550" y="230" width="130" height="60" rx="6" fill="#eef3fb" stroke="#4a6fa5" stroke-width="2"/>
  <text x="615" y="257" text-anchor="middle" font-size="13" font-weight="bold" fill="#1c3a5e">PoP / IXP</text>
  <text x="615" y="276" text-anchor="middle" font-size="10" fill="#444">networks interconnect</text>
  <line x1="550" y1="260" x2="514" y2="260" stroke="#555" stroke-width="2" marker-end="url(#ph-arr)"/>
  <text x="532" y="222" text-anchor="middle" font-size="9" fill="#555">long haul</text>
  <rect x="360" y="230" width="150" height="60" rx="6" fill="#fdf3e7" stroke="#b57a4a" stroke-width="2"/>
  <text x="435" y="255" text-anchor="middle" font-size="13" font-weight="bold" fill="#7a4a12">Backbone /</text>
  <text x="435" y="270" text-anchor="middle" font-size="13" font-weight="bold" fill="#7a4a12">undersea cable</text>
  <path d="M 362 306 q 9 -8 18 0 t 18 0 t 18 0 t 18 0 t 18 0 t 18 0 t 18 0 t 18 0" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <circle cx="385" cy="302" r="3" fill="#e67e22"/><circle cx="430" cy="302" r="3" fill="#e67e22"/><circle cx="475" cy="302" r="3" fill="#e67e22"/><circle cx="505" cy="302" r="3" fill="#e67e22"/>
  <text x="435" y="326" text-anchor="middle" font-size="9" fill="#7a4a12">seabed cable · in-line amplifiers every ~50–100 km</text>
  <line x1="360" y1="260" x2="324" y2="260" stroke="#555" stroke-width="2" marker-end="url(#ph-arr)"/>
  <text x="342" y="222" text-anchor="middle" font-size="9" fill="#555">cable lands</text>
  <rect x="190" y="230" width="130" height="60" rx="6" fill="#eef3fb" stroke="#4a6fa5" stroke-width="2"/>
  <text x="255" y="257" text-anchor="middle" font-size="13" font-weight="bold" fill="#1c3a5e">Landing station</text>
  <text x="255" y="276" text-anchor="middle" font-size="10" fill="#444">meet-me room</text>
  <line x1="190" y1="260" x2="154" y2="260" stroke="#555" stroke-width="2" marker-end="url(#ph-arr)"/>
  <text x="172" y="222" text-anchor="middle" font-size="9" fill="#555">100–800 Gb/s</text>
  <!-- datacenter container -->
  <rect x="10" y="222" width="140" height="98" rx="8" fill="#f3eefb" stroke="#7777bb" stroke-width="2"/>
  <text x="80" y="238" text-anchor="middle" font-size="11" font-weight="bold" fill="#4a3a8c">Datacenter</text>
  <rect x="22" y="246" width="116" height="18" rx="4" fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5"/>
  <text x="80" y="259" text-anchor="middle" font-size="9.5" fill="#333">spine switches</text>
  <line x1="80" y1="264" x2="80" y2="268" stroke="#7777bb" stroke-width="1.5" marker-end="url(#ph-arr)"/>
  <rect x="22" y="270" width="116" height="18" rx="4" fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5"/>
  <text x="80" y="283" text-anchor="middle" font-size="9.5" fill="#333">ToR switch</text>
  <line x1="80" y1="288" x2="80" y2="292" stroke="#7777bb" stroke-width="1.5" marker-end="url(#ph-arr)"/>
  <rect x="22" y="294" width="116" height="18" rx="4" fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5"/>
  <text x="80" y="307" text-anchor="middle" font-size="9.5" fill="#333">rack → server</text>
</svg>

<details><summary>EXPLANATION</summary>

**Hop by hop.**

1. **Laptop NIC** → Wi-Fi radio or copper Ethernet cable → **home router**. This first link is short (meters) and slow (hundreds of Mb/s).
2. **Home router** → **ONT** over **FTTH**: a fiber strand carries the home's traffic at 1–10 Gb/s (GPON/XGS-PON), shared with neighbors via a passive splitter.
3. **ONT** → **OLT** at the ISP's central office; from there, metro fiber (with repeaters where runs are long) to a **PoP** (Point of Presence) or **IXP** (Internet Exchange Point), where networks interconnect.
4. Long haul: backbone fiber between cities, or an **undersea cable** between continents (submarine repeaters amplify the optical signal in-line; a cable carries multiple fiber pairs, each tens of Tb/s with coherent optics).
5. **Datacenter**: the cable lands at a landing station, connects to the DC's meet-me room and core routers, then **spine switches**, then the **ToR switch** in the server's **rack**, then the server's NIC. Inside the DC, links are short (meters) and fast (100–800 Gb/s per link).

**Datacenter design**: the building contains **rooms**; each room holds **rows** of **racks** (typically 42U) facing each other across hot/cold aisles for cooling. Each rack has a **top-of-rack (ToR) switch** at the top, a **PDU** (power distribution unit) on the side feeding every server, and servers whose **NIC** plugs into the ToR. Every ToR uplinks to the **spine switches**, forming a non-blocking Clos fabric so any two servers can talk at full speed. Power is sized in kW per rack, fed from the grid through a **UPS**, backed by a **backup generator** on outage.

<svg viewBox="0 0 780 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Datacenter hierarchy: a building contains rooms, a room contains rows of racks, each 42U rack holds servers with NICs plus a top-of-rack switch and a PDU, every ToR uplinks to the spine switches, and power flows from the grid through a UPS backed by a generator to the PDUs." style="max-width:780px;width:100%;background:#f8f9fb;border-radius:8px">
  <defs>
    <marker id="dc-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#555"/></marker>
    <marker id="dc-pwr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b57a4a"/></marker>
  </defs>
  <text x="390" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">Datacenter hierarchy: building → rooms → rows → racks → servers, spine fabric, backup power</text>
  <rect x="16" y="40" width="748" height="384" rx="10" fill="none" stroke="#7777bb" stroke-width="2" stroke-dasharray="8 4"/>
  <text x="28" y="58" font-size="11" font-weight="bold" fill="#4a3a8c">datacenter building</text>
  <rect x="36" y="70" width="420" height="34" rx="6" fill="#e8e8f5" stroke="#7777bb" stroke-width="2"/>
  <text x="246" y="91" text-anchor="middle" font-size="11" fill="#333">spine switches (leaf-spine Clos fabric)</text>
  <rect x="36" y="116" width="420" height="220" rx="8" fill="#f3eefb" stroke="#9a8fd0" stroke-width="1.5"/>
  <text x="48" y="134" font-size="10.5" fill="#4a3a8c">room (rows face each other: cold aisle / hot aisle)</text>
  <rect x="52" y="144" width="388" height="86" rx="5" fill="#ffffff" stroke="#b0a6dd"/>
  <text x="436" y="158" text-anchor="end" font-size="9.5" fill="#666">row</text>
  <g fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5">
    <rect x="60" y="166" width="85" height="54" rx="3"/><rect x="155" y="166" width="85" height="54" rx="3"/><rect x="250" y="166" width="85" height="54" rx="3"/><rect x="345" y="166" width="85" height="54" rx="3"/>
    <rect x="52" y="240" width="388" height="86" rx="5" fill="#ffffff" stroke="#b0a6dd"/>
    <rect x="60" y="262" width="85" height="54" rx="3"/><rect x="155" y="262" width="85" height="54" rx="3"/><rect x="250" y="262" width="85" height="54" rx="3"/><rect x="345" y="262" width="85" height="54" rx="3"/>
  </g>
  <g fill="#cdeedd" stroke="#3d9a6c" stroke-width="1">
    <rect x="60" y="166" width="85" height="8" rx="3"/><rect x="155" y="166" width="85" height="8" rx="3"/><rect x="250" y="166" width="85" height="8" rx="3"/><rect x="345" y="166" width="85" height="8" rx="3"/>
    <rect x="60" y="262" width="85" height="8" rx="3"/><rect x="155" y="262" width="85" height="8" rx="3"/><rect x="250" y="262" width="85" height="8" rx="3"/><rect x="345" y="262" width="85" height="8" rx="3"/>
  </g>
  <g font-size="8.5" fill="#4a3a8c" text-anchor="middle">
    <text x="102" y="198">rack 42U</text><text x="197" y="198">rack 42U</text><text x="292" y="198">rack 42U</text><text x="387" y="198">rack 42U</text>
    <text x="102" y="294">rack 42U</text><text x="197" y="294">rack 42U</text><text x="292" y="294">rack 42U</text><text x="387" y="294">rack 42U</text>
  </g>
  <text x="436" y="254" text-anchor="end" font-size="9.5" fill="#666">row</text>
  <line x1="200" y1="104" x2="200" y2="142" stroke="#555" stroke-width="1.5" marker-end="url(#dc-arr)"/>
  <line x1="300" y1="104" x2="300" y2="142" stroke="#555" stroke-width="1.5" marker-end="url(#dc-arr)"/>
  <text x="250" y="124" text-anchor="middle" font-size="9" fill="#555">ToR uplinks</text>
  <polygon points="430,166 500,70 500,336 430,220" fill="#7777bb" opacity="0.08"/>
  <line x1="430" y1="166" x2="500" y2="70" stroke="#4a3a8c" stroke-width="1.5" stroke-dasharray="5 3"/>
  <line x1="430" y1="220" x2="500" y2="336" stroke="#4a3a8c" stroke-width="1.5" stroke-dasharray="5 3"/>
  <rect x="345" y="166" width="85" height="54" rx="3" fill="none" stroke="#4a3a8c" stroke-width="2.5"/>
  <text x="465" y="136" text-anchor="middle" font-size="9" fill="#4a3a8c">one rack,</text>
  <text x="465" y="148" text-anchor="middle" font-size="9" fill="#4a3a8c">expanded</text>
  <rect x="500" y="70" width="264" height="266" rx="8" fill="#ffffff" stroke="#7777bb" stroke-width="2"/>
  <text x="632" y="90" text-anchor="middle" font-size="11" font-weight="bold" fill="#4a3a8c">one rack (42U)</text>
  <rect x="512" y="100" width="196" height="26" rx="4" fill="#cdeedd" stroke="#3d9a6c" stroke-width="1.5"/>
  <text x="610" y="117" text-anchor="middle" font-size="10.5" fill="#14532d">ToR switch</text>
  <line x1="560" y1="100" x2="458" y2="92" stroke="#555" stroke-width="1.5" marker-end="url(#dc-arr)"/>
  <text x="502" y="90" text-anchor="middle" font-size="8.5" fill="#555">uplink</text>
  <g>
    <rect x="512" y="136" width="160" height="40" rx="4" fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5"/>
    <text x="524" y="160" font-size="10" fill="#1c3a5e">server</text>
    <rect x="676" y="147" width="28" height="16" rx="2" fill="#ffd54f" stroke="#b58a1a"/>
    <text x="690" y="158" text-anchor="middle" font-size="8" fill="#7a5c00">NIC</text>
    <rect x="512" y="182" width="160" height="40" rx="4" fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5"/>
    <text x="524" y="206" font-size="10" fill="#1c3a5e">server</text>
    <rect x="676" y="193" width="28" height="16" rx="2" fill="#ffd54f" stroke="#b58a1a"/>
    <text x="690" y="204" text-anchor="middle" font-size="8" fill="#7a5c00">NIC</text>
    <rect x="512" y="228" width="160" height="40" rx="4" fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5"/>
    <text x="524" y="252" font-size="10" fill="#1c3a5e">server</text>
    <rect x="676" y="239" width="28" height="16" rx="2" fill="#ffd54f" stroke="#b58a1a"/>
    <text x="690" y="250" text-anchor="middle" font-size="8" fill="#7a5c00">NIC</text>
  </g>
  <line x1="708" y1="126" x2="716" y2="126" stroke="#3d9a6c" stroke-width="1.5"/>
  <line x1="716" y1="126" x2="716" y2="248" stroke="#3d9a6c" stroke-width="1.5"/>
  <line x1="704" y1="155" x2="716" y2="155" stroke="#3d9a6c" stroke-width="1.5"/>
  <line x1="704" y1="201" x2="716" y2="201" stroke="#3d9a6c" stroke-width="1.5"/>
  <line x1="704" y1="247" x2="716" y2="247" stroke="#3d9a6c" stroke-width="1.5"/>
  <rect x="732" y="100" width="24" height="228" rx="4" fill="#f5e0cf" stroke="#b57a4a" stroke-width="1.5"/>
  <text x="744" y="214" text-anchor="middle" font-size="10" fill="#7a4a12" transform="rotate(-90 744 214)">PDU</text>
  <g stroke="#b57a4a" stroke-width="1.5" stroke-dasharray="3 2">
    <line x1="672" y1="170" x2="732" y2="170"/>
    <line x1="672" y1="216" x2="732" y2="216"/>
    <line x1="672" y1="262" x2="732" y2="262"/>
  </g>
  <rect x="36" y="348" width="728" height="60" rx="8" fill="#fdf3e7" stroke="#b57a4a" stroke-width="1.5"/>
  <rect x="52" y="364" width="110" height="28" rx="4" fill="#ffffff" stroke="#b57a4a"/>
  <text x="107" y="382" text-anchor="middle" font-size="10" fill="#7a4a12">grid power</text>
  <line x1="162" y1="378" x2="186" y2="378" stroke="#b57a4a" stroke-width="2" marker-end="url(#dc-pwr)"/>
  <rect x="190" y="364" width="90" height="28" rx="4" fill="#ffffff" stroke="#b57a4a"/>
  <text x="235" y="382" text-anchor="middle" font-size="10" fill="#7a4a12">UPS</text>
  <line x1="280" y1="378" x2="304" y2="378" stroke="#b57a4a" stroke-width="2" marker-end="url(#dc-pwr)"/>
  <rect x="308" y="364" width="150" height="28" rx="4" fill="#ffffff" stroke="#b57a4a"/>
  <text x="383" y="382" text-anchor="middle" font-size="10" fill="#7a4a12">backup generator</text>
  <text x="470" y="382" font-size="9.5" fill="#7a4a12">on grid outage the generator takes over via the UPS; each rack's PDU feeds its servers</text>
  <polyline points="470,378 744,378 744,330" fill="none" stroke="#b57a4a" stroke-width="2" marker-end="url(#dc-pwr)"/>
  <text x="390" y="448" text-anchor="middle" font-size="10.5" fill="#666">Hierarchy: building → room(s) → rows → racks (ToR switch + PDU + servers with NICs); spine layer above all racks; power: grid → UPS → generator → PDU.</text>
</svg>

Each hop is a point-to-point link (or a shared medium, for Wi-Fi) — the subject of the next section.

</details>

## Point-to-point links: Ethernet and Wi-Fi

The link layer carries **frames** between directly connected nodes. Its electrical/optical details (signalling, cables, transceivers) are covered in [Interfaces and Buses](../Computer-Hardware/Interfaces-and-Buses/Readme.md).

**Ethernet** ([IEEE 802.3](https://standards.ieee.org/ieee/802.3/)): a **frame** is destination MAC (6 B) + source MAC (6 B) + EtherType (2 B) + payload (46–1500 B) + FCS (CRC-32, 4 B). **MAC addresses** are 48-bit and globally unique. Originally a shared coaxial cable with CSMA/CD; today links are **switched** and full-duplex: a **switch** learns which MAC address is on which port (from frame source addresses) and forwards each frame only to the destination port. Speeds: 1/10/25/100/400 GbE over copper or fiber.

**Wi-Fi** ([IEEE 802.11](https://standards.ieee.org/ieee/802.11/)): a *shared* radio medium, not point-to-point. The access point and clients use **CSMA/CA** — listen before transmitting, with a random backoff on collision. Channels live in the 2.4/5/6 GHz bands, 20–320 MHz wide. **OFDMA** (Wi-Fi 6+) splits a channel into resource units so the AP can serve many clients in one transmission; **MIMO** uses multiple antennas for parallel spatial streams.

<details><summary>EXPLANATION</summary>

**The Ethernet frame, byte by byte.** An IEEE 802.3 frame on the wire looks like this (sizes in bytes):

<svg viewBox="0 0 780 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ethernet frame layout: preamble 7 bytes, start-of-frame delimiter 1 byte, destination MAC 6, source MAC 6, EtherType or length 2, payload 46 to 1500, frame check sequence 4, then a 12-byte interpacket gap." style="max-width:780px;width:100%;background:#f8f9fb;border-radius:8px">
  <text x="390" y="20" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Ethernet frame layout (on the wire, left to right)</text>
  <g font-size="8.5" text-anchor="middle">
    <rect x="20" y="40" width="70" height="44" fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5"/>
    <text x="55" y="58" fill="#4a3a8c">preamble</text><text x="55" y="70" fill="#666">7 B</text>
    <rect x="90" y="40" width="30" height="44" fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5"/>
    <text x="105" y="58" fill="#4a3a8c">SFD</text><text x="105" y="70" fill="#666">1 B</text>
    <rect x="120" y="40" width="80" height="44" fill="#cfe0f5" stroke="#4a6fa5" stroke-width="1.5"/>
    <text x="160" y="56" fill="#12365e">dst MAC</text><text x="160" y="68" fill="#666">6 B</text>
    <rect x="200" y="40" width="80" height="44" fill="#cfe0f5" stroke="#4a6fa5" stroke-width="1.5"/>
    <text x="240" y="56" fill="#12365e">src MAC</text><text x="240" y="68" fill="#666">6 B</text>
    <rect x="280" y="40" width="70" height="44" fill="#cfe0f5" stroke="#4a6fa5" stroke-width="1.5"/>
    <text x="315" y="56" fill="#12365e">EtherType</text><text x="315" y="68" fill="#666">2 B</text>
    <rect x="350" y="40" width="300" height="44" fill="#fdf3e7" stroke="#b57a4a" stroke-width="1.5"/>
    <text x="500" y="56" fill="#7a4a12">payload (typically an IP packet)</text><text x="500" y="68" fill="#666">46–1500 B</text>
    <rect x="650" y="40" width="60" height="44" fill="#e8e8f5" stroke="#7777bb" stroke-width="1.5"/>
    <text x="680" y="58" fill="#4a3a8c">FCS</text><text x="680" y="70" fill="#666">4 B</text>
    <rect x="710" y="40" width="60" height="44" fill="none" stroke="#999" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="740" y="58" fill="#666">IPG</text><text x="740" y="70" fill="#666">12 B</text>
  </g>
  <text x="390" y="106" text-anchor="middle" font-size="9.5" fill="#666">Example values: dst MAC AA:BB:CC:DD:EE:FF, src MAC 11:22:33:44:55:66, EtherType 0x0800 (IPv4), FCS = CRC-32 of the frame. Minimum frame 64 B (14+46+4); maximum 1522 B; jumbo frames ~9000 B in datacenters.</text>
</svg>

<table>
<tr><th>Field</th><th>Size</th><th>Meaning</th></tr>
<tr><td>Preamble</td><td>7 B</td><td>alternating 0s and 1s, to synchronize the receiver's clock</td></tr>
<tr><td>SFD (start of frame delimiter)</td><td>1 B</td><td>10101011 — breaks the preamble pattern, marks the frame start</td></tr>
<tr><td>Destination MAC</td><td>6 B</td><td>48-bit address of the target device; first 3 B are the vendor's OUI; bit U/L = universal vs locally assigned, bit I/G = unicast vs multicast</td></tr>
<tr><td>Source MAC</td><td>6 B</td><td>sender's MAC, learned by switches from this field</td></tr>
<tr><td>EtherType</td><td>2 B</td><td>payload protocol: 0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP; if &lt; 1536, it is the payload length instead (IEEE 802.3)</td></tr>
<tr><td>Payload</td><td>46–1500 B</td><td>data from the layer above (usually an IP packet); padded up to 46 B if smaller</td></tr>
<tr><td>FCS</td><td>4 B</td><td>CRC-32 checksum of the frame; corrupted frames are dropped silently (no retransmission at this layer)</td></tr>
<tr><td>Interpacket gap</td><td>12 B</td><td>idle line between frames, not part of the frame</td></tr>
</table>

**Ethernet frame walkthrough.** Host A (MAC AA:BB…) sends to host B (MAC CC:DD…) through a switch. A builds the frame (dst MAC, src MAC, EtherType 0x0800 for IPv4, payload, CRC). The switch reads the dst MAC, looks it up in its MAC table (learned from earlier source addresses), and forwards the frame out only that port — or floods if unknown. On the receiving NIC, the FCS is verified (CRC-32); a mismatch means the frame is dropped (Ethernet does not retransmit — that is the layer above's job).

**Why Wi-Fi is slower than Ethernet.** The medium is shared: only one station transmits at a time per channel, so all clients split the airtime, and CSMA/CA adds random backoff. Range and interference (walls, neighbors' networks) reduce the PHY rate, and retransmissions at the 802.11 level add latency.

</details>


## IP and routing

**IP** (Internet Protocol) assigns each interface a 32-bit ([IPv4](https://datatracker.ietf.org/doc/html/rfc791)) or 128-bit ([IPv6](https://datatracker.ietf.org/doc/html/rfc8200)) address. **CIDR** (Classless Inter-Domain Routing): `/24` means 24 bits for the network, 8 for the host (256 addresses).

**NAT** (Network Address Translation): a router maps private addresses (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) to a public address. Multiple devices share one public IP.

**Routing**: a router forwards packets based on a routing table. **BGP** (Border Gateway Protocol, [RFC 4271](https://datatracker.ietf.org/doc/html/rfc4271)) is the inter-domain routing protocol: it exchanges reachability information between autonomous systems.

<details><summary>EXPLANATION</summary>

**The IPv4 header, bit by bit.** 20 bytes = 5 rows of 32 bits, sent in network byte order (big-endian):

<svg viewBox="0 0 700 205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IPv4 header layout: five 32-bit rows. Row 1: version 4 bits, IHL 4 bits, DSCP 6 bits, ECN 2 bits, total length 16 bits. Row 2: identification 16, flags 3, fragment offset 13. Row 3: TTL 8, protocol 8, header checksum 16. Rows 4 and 5: source and destination addresses, 32 bits each." style="max-width:700px;width:100%;background:#f8f9fb;border-radius:8px">
  <text x="350" y="18" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">IPv4 header: 20 bytes = 5 × 32-bit words</text>
  <text x="30" y="36" font-size="9" fill="#666">bit 0</text>
  <text x="670" y="36" text-anchor="end" font-size="9" fill="#666">bit 31</text>
  <g font-size="9" text-anchor="middle" fill="#12365e">
    <g fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5">
      <rect x="30" y="44" width="80" height="24"/><rect x="110" y="44" width="80" height="24"/><rect x="190" y="44" width="120" height="24"/><rect x="310" y="44" width="40" height="24"/><rect x="350" y="44" width="320" height="24"/>
      <rect x="30" y="72" width="320" height="24"/><rect x="350" y="72" width="60" height="24"/><rect x="410" y="72" width="260" height="24"/>
      <rect x="30" y="100" width="160" height="24"/><rect x="190" y="100" width="160" height="24"/><rect x="350" y="100" width="320" height="24"/>
      <rect x="30" y="128" width="640" height="24"/>
      <rect x="30" y="156" width="640" height="24"/>
    </g>
    <text x="70" y="60">Version (4)</text><text x="150" y="60">IHL (4)</text><text x="250" y="60">DSCP (6)</text><text x="330" y="60">ECN (2)</text><text x="510" y="60">Total length (16)</text>
    <text x="190" y="88">Identification (16)</text><text x="380" y="88">Flags (3)</text><text x="540" y="88">Fragment offset (13)</text>
    <text x="110" y="116">TTL (8)</text><text x="270" y="116">Protocol (8)</text><text x="510" y="116">Header checksum (16)</text>
    <text x="350" y="144">Source address (32)</text>
    <text x="350" y="172">Destination address (32)</text>
  </g>
  <text x="350" y="198" text-anchor="middle" font-size="9.5" fill="#666">Our GET example: version 4, IHL 5, total length 77 B, TTL 64, protocol 6 (TCP), src 192.168.1.10, dst 93.184.216.34.</text>
</svg>

<table>
<tr><th>Field</th><th>Size</th><th>Meaning</th></tr>
<tr><td>Version</td><td>4 bits</td><td>0100 = IPv4</td></tr>
<tr><td>IHL</td><td>4 bits</td><td>header length in 32-bit words (5 = 20 B, no options)</td></tr>
<tr><td>DSCP + ECN</td><td>6 + 2 bits</td><td>priority (DiffServ) and Explicit Congestion Notification</td></tr>
<tr><td>Total length</td><td>16 bits</td><td>whole packet in bytes (header + payload), max 65 535</td></tr>
<tr><td>Identification</td><td>16 bits</td><td>tag shared by all fragments of one packet, for reassembly</td></tr>
<tr><td>Flags + fragment offset</td><td>3 + 13 bits</td><td>DF = don't fragment, MF = more fragments follow; offset in 8-byte units</td></tr>
<tr><td>TTL</td><td>8 bits</td><td>hops remaining; each router decrements and drops the packet at 0, so packets cannot loop forever</td></tr>
<tr><td>Protocol</td><td>8 bits</td><td>payload protocol: 1 = ICMP, 6 = TCP, 17 = UDP</td></tr>
<tr><td>Header checksum</td><td>16 bits</td><td>one's-complement sum over the header; detects corruption</td></tr>
<tr><td>Source / destination address</td><td>32 + 32 bits</td><td>IPv4 addresses in dot-decimal, e.g. 192.168.1.10</td></tr>
</table>

**Fragmentation.** If a packet is larger than the next link's MTU (e.g. 1500 B for Ethernet), a router splits it into fragments, each with its own IPv4 header carrying the same identification and the MF/offset fields; fragments may travel different paths and are reassembled by the receiver. If DF is set, the router instead drops the packet and returns an ICMP "Fragmentation Needed" — the basis of **Path MTU Discovery (PMTUD)**. IPv6 routers never fragment: only the source may, via an extension header, after PMTUD.

**The IPv6 header** (fixed 40 bytes): version 4b (0110), traffic class 8b (DSCP/ECN as in IPv4), flow label 20b (identifies a flow), payload length 16b, next header 8b (payload protocol or first extension header), hop limit 8b (like TTL), source address 128b, destination address 128b. Addresses are colon-separated hex with one `::` compression of zeros: `::1` is localhost, `fe80::/10` link-local (not routed), `fc00::/7` unique-local (private), `2001:db8::/32` reserved for documentation.

**IP is best-effort**: packets can be lost, duplicated, reordered, or corrupted without IP noticing — reliability is the transport layer's job (TCP). Within a /24, the .0 address names the network and .255 is the broadcast address; both are unusable for hosts.

**Special IPv4 ranges**: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 private (typically behind NAT); 127.0.0.0/8 loopback (127.0.0.1 = localhost); 169.254.0.0/16 link-local; 0.0.0.0/8 "this host" (used by DHCP); 100.64.0.0/10 carrier-grade NAT; 224.0.0.0/4 multicast; 255.255.255.255 broadcast; 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 documentation examples.

**ARP** (Address Resolution Protocol, [RFC 826](https://datatracker.ietf.org/doc/html/rfc826)): maps an IP address to a MAC address on the local network. `ARP request: "Who has 192.168.1.1?"` → `ARP reply: "192.168.1.1 is at AA:BB:CC:DD:EE:FF"`.

**ICMP** (Internet Control Message Protocol, [RFC 792](https://datatracker.ietf.org/doc/html/rfc792)): error messages and diagnostics. `ping` uses ICMP Echo Request/Reply. `traceroute` uses ICMP Time Exceeded (each router decrements the TTL; when it hits 0, it sends a Time Exceeded).

**BGP**: each autonomous system (AS) runs a BGP speaker. BGP exchanges **prefixes** (e.g., `192.168.0.0/16`) and **paths** (the sequence of ASes). BGP is a path-vector protocol: it detects loops by checking the AS path. Convergence: $`\approx 1`–$`5` minutes after a topology change. **BFD** (Bidirectional Forwarding Detection) can reduce failover to approximately 1 second or less, which is the standard in modern data centers.

**IPv6** ([RFC 8200](https://datatracker.ietf.org/doc/html/rfc8200)): 128-bit addresses. Eliminates NAT (every device has a globally unique address). SLAAC (Stateless Address Autoconfiguration): a device generates its own address from its MAC (or a random interface ID) and the router's prefix.

The IP header includes a **checksum** field for error detection (a 16-bit one's complement sum), a simpler mechanism than the [CRC](../Information-Theory/Communication.md) used at the link layer.

</details>

## TCP

**TCP** (Transmission Control Protocol, [RFC 793](https://datatracker.ietf.org/doc/html/rfc793)) provides reliable, ordered, byte-stream delivery over IP. A **socket** is identified by (IP, port, protocol). A **port** is a 16-bit number (0–65535) that identifies a process.

**3-way handshake**: SYN → SYN-ACK → ACK. Establishes the connection and synchronizes sequence numbers.

**Socket API**: the primary interface between application code and the network stack (implemented by the [Operating System](../Computer-Hardware/Operating-System.md) as file descriptors):

<table>
<tr><th>Call</th><th>Role</th><th>Side</th></tr>
<tr><td><code>socket()</code></td><td>Create a socket (choose family, type, protocol)</td><td>Both</td></tr>
<tr><td><code>bind()</code></td><td>Associate a local (IP, port) with the socket</td><td>Server</td></tr>
<tr><td><code>listen()</code></td><td>Mark the socket as passive (accept incoming connections)</td><td>Server</td></tr>
<tr><td><code>accept()</code></td><td>Block until a connection arrives; return a new socket</td><td>Server</td></tr>
<tr><td><code>connect()</code></td><td>Initiate a 3-way handshake to a remote (IP, port)</td><td>Client</td></tr>
<tr><td><code>send()</code> / <code>recv()</code></td><td>Write / read bytes on the connection</td><td>Both</td></tr>
<tr><td><code>close()</code></td><td>Tear down the connection (FIN)</td><td>Both</td></tr>
</table>

<details><summary>EXPLANATION</summary>

**The TCP header, bit by bit.** Minimum 20 bytes = 5 rows of 32 bits (plus optional options):

<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TCP header layout: source port 16 bits, destination port 16, sequence number 32, acknowledgment number 32, data offset 4, reserved 3, nine flag bits (NS CWR ECE URG ACK PSH RST SYN FIN), window 16, checksum 16, urgent pointer 16, then options." style="max-width:700px;width:100%;background:#f8f9fb;border-radius:8px">
  <text x="350" y="18" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">TCP header: 20 bytes minimum = 5 × 32-bit words (+ options)</text>
  <text x="30" y="36" font-size="9" fill="#666">bit 0</text>
  <text x="670" y="36" text-anchor="end" font-size="9" fill="#666">bit 31</text>
  <g fill="#eaf7ee" stroke="#3d8b57" stroke-width="1.5">
    <rect x="30" y="44" width="320" height="24"/><rect x="350" y="44" width="320" height="24"/>
    <rect x="30" y="72" width="640" height="24"/>
    <rect x="30" y="100" width="640" height="24"/>
    <rect x="30" y="128" width="80" height="24"/><rect x="110" y="128" width="60" height="24"/>
    <rect x="170" y="128" width="20" height="24"/><rect x="190" y="128" width="20" height="24"/><rect x="210" y="128" width="20" height="24"/><rect x="230" y="128" width="20" height="24"/><rect x="250" y="128" width="20" height="24"/><rect x="270" y="128" width="20" height="24"/><rect x="290" y="128" width="20" height="24"/><rect x="310" y="128" width="20" height="24"/><rect x="330" y="128" width="20" height="24"/>
    <rect x="350" y="128" width="320" height="24"/>
    <rect x="30" y="156" width="320" height="24"/><rect x="350" y="156" width="320" height="24"/>
    <rect x="30" y="184" width="640" height="24" fill="none" stroke="#3d8b57" stroke-dasharray="5 3"/>
  </g>
  <g text-anchor="middle" fill="#14532d">
    <text x="190" y="60" font-size="9">Source port (16)</text><text x="510" y="60" font-size="9">Destination port (16)</text>
    <text x="350" y="88" font-size="9">Sequence number (32)</text>
    <text x="350" y="116" font-size="9">Acknowledgment number (32)</text>
    <text x="70" y="144" font-size="8.5">Data offset (4)</text><text x="140" y="144" font-size="8.5">Res (3)</text>
    <text x="180" y="144" font-size="7.5">NS</text><text x="200" y="144" font-size="7.5">CWR</text><text x="220" y="144" font-size="7.5">ECE</text><text x="240" y="144" font-size="7.5">URG</text><text x="260" y="144" font-size="7.5">ACK</text><text x="280" y="144" font-size="7.5">PSH</text><text x="300" y="144" font-size="7.5">RST</text><text x="320" y="144" font-size="7.5">SYN</text><text x="340" y="144" font-size="7.5">FIN</text>
    <text x="510" y="144" font-size="9">Window (16)</text>
    <text x="190" y="172" font-size="9">Checksum (16)</text><text x="510" y="172" font-size="9">Urgent pointer (16)</text>
    <text x="350" y="200" font-size="9">Options (variable, zero-padded to 32-bit words): MSS, window scale, timestamps…</text>
  </g>
  <text x="350" y="232" text-anchor="middle" font-size="9.5" fill="#666">Example: a SYN has SYN=1 and sequence number = the client's randomly chosen ISN; the SYN-ACK has SYN=1, ACK=1, ack = ISN+1.</text>
</svg>

<table>
<tr><th>Field</th><th>Size</th><th>Meaning</th></tr>
<tr><td>Source / destination port</td><td>16 + 16 bits</td><td>identify the application processes on each host (with the IP addresses, they form the socket)</td></tr>
<tr><td>Sequence number</td><td>32 bits</td><td>in a SYN: the Initial Sequence Number (ISN, chosen randomly); otherwise ISN + 1 + bytes already sent — this is what allows reordering</td></tr>
<tr><td>Acknowledgment number</td><td>32 bits</td><td>the next byte expected from the peer (in SYN-ACK: client ISN + 1)</td></tr>
<tr><td>Data offset</td><td>4 bits</td><td>header size in 32-bit words (5 = 20 B without options)</td></tr>
<tr><td>Flags</td><td>9 bits</td><td>NS, CWR, ECE (congestion), URG (urgent pointer valid), ACK, PSH (push to application), RST (reset), SYN, FIN</td></tr>
<tr><td>Window</td><td>16 bits</td><td>receive window: how many bytes the sender may still send (flow control)</td></tr>
<tr><td>Checksum</td><td>16 bits</td><td>over header + data + a pseudo-header (IPs, length, protocol), to detect corruption</td></tr>
<tr><td>Urgent pointer</td><td>16 bits</td><td>offset to urgent data when URG is set</td></tr>
<tr><td>Options</td><td>0–40 B</td><td>MSS (max segment size, typically 1460 B), window scale, SACK, timestamps</td></tr>
</table>

**Sequence numbers**: each byte is numbered. The receiver acknowledges the next expected byte. **Retransmission**: if an ACK is not received within the RTO (Retransmission Timeout), the sender retransmits. The RTO is estimated from RTT samples (Jacobson's algorithm: $`RTO = SRTT + 4 \times RTTVAR`).

**Flow control**: the receiver advertises a **window** (the number of bytes it can buffer). The sender does not send more than the window. Prevents the sender from overwhelming the receiver.

**Congestion control**: the sender limits its rate to avoid overloading the network. **TCP Reno/Cubic**: slow start (exponential growth until the window reaches the slow-start threshold), congestion avoidance (linear growth), fast retransmit (3 duplicate ACKs → halve the window), fast recovery (continue without slow start).

<iframe src="./Networks.simulation.html" title="TCP congestion control: slow start, congestion avoidance, and fast retransmit"></iframe>

**TCP state machine**:

<table>
<tr><th>State</th><th>Event</th><th>Next state</th></tr>
<tr><td>CLOSED</td><td>active open (connect)</td><td>SYN_SENT</td></tr>
<tr><td>SYN_SENT</td><td>receive SYN-ACK</td><td>ESTABLISHED</td></tr>
<tr><td>CLOSED</td><td>passive open (listen+accept)</td><td>LISTEN → SYN_RCVD</td></tr>
<tr><td>SYN_RCVD</td><td>receive ACK</td><td>ESTABLISHED</td></tr>
<tr><td>ESTABLISHED</td><td>active close (FIN)</td><td>FIN_WAIT_1</td></tr>
<tr><td>FIN_WAIT_1</td><td>receive ACK</td><td>FIN_WAIT_2</td></tr>
<tr><td>FIN_WAIT_2</td><td>receive FIN</td><td>TIME_WAIT</td></tr>
<tr><td>TIME_WAIT</td><td>2×MSL timer expires</td><td>CLOSED</td></tr>
<tr><td>ESTABLISHED</td><td>passive close (FIN)</td><td>CLOSE_WAIT</td></tr>
<tr><td>CLOSE_WAIT</td><td>active close (FIN)</td><td>LAST_ACK</td></tr>
<tr><td>LAST_ACK</td><td>receive ACK</td><td>CLOSED</td></tr>
</table>

**Non-blocking I/O and event loops**: a socket can be set to non-blocking mode so that `recv()` returns immediately with `EWOULDBLOCK` instead of sleeping. An [event loop](./Concurrency/Asynchrony.md) (e.g., `epoll`, `kqueue`, `io_uring`) multiplexes many sockets in a single thread, enabling [concurrent](./Concurrency/Readme.md) connections without one thread per connection.

</details>

## UDP

**UDP** (User Datagram Protocol, [RFC 768](https://datatracker.ietf.org/doc/html/rfc768)) provides connectionless, unordered, unreliable datagram delivery over IP. The header is 8 bytes: source port, destination port, length, checksum.

<table>
<tr><th>Property</th><th>TCP</th><th>UDP</th></tr>
<tr><td>Connection</td><td>3-way handshake</td><td>None</td></tr>
<tr><td>Ordering</td><td>Guaranteed</td><td>Not guaranteed</td></tr>
<tr><td>Reliability</td><td>Retransmission + ACKs</td><td>Best-effort</td></tr>
<tr><td>Header size</td><td>20 bytes (min)</td><td>8 bytes</td></tr>
<tr><td>Use cases</td><td>HTTP, TLS, SSH, file transfer</td><td>DNS, QUIC, VoIP, gaming, video streaming</td></tr>
</table>

<details><summary>EXPLANATION</summary>

UDP is the transport for [DNS](#dns), [QUIC/HTTP 3](#http), VoIP (RTP), and real-time multiplayer gaming. In each case, the application implements its own reliability (or deliberately accepts loss) because the per-packet overhead of TCP's retransmission and ordering is unacceptable for latency-sensitive traffic.

QUIC (RFC 9000) builds a reliable, ordered stream on top of UDP, combining transport and encryption in a single protocol. See [HTTP](#http) below.

</details>

## HTTP

**HTTP** (HyperText Transfer Protocol, [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110)) is an application-layer protocol for web communication. A **request** has a method (GET, POST, PUT, DELETE), a **path**, **headers**, and an optional **body**. A **response** has a **status code** (200, 404, 500), headers, and a body.

<details><summary>EXPLANATION</summary>

**Message format.** Both requests and responses are plain text: a start line, then header lines (`Name: value`), then an **empty line** (CRLF), then the optional body. Each line ends with CRLF (`0x0D 0x0A`).

<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HTTP message format: a request has a request line (method, path, version), header lines, an empty line, and an optional body; a response has a status line, header lines, an empty line, and a body." style="max-width:760px;width:100%;background:#f8f9fb;border-radius:8px">
  <text x="380" y="18" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">HTTP message format: start line → headers → empty line → body</text>
  <text x="195" y="34" text-anchor="middle" font-size="11" font-weight="bold" fill="#1c3a5e">request</text>
  <rect x="20" y="42" width="350" height="176" rx="6" fill="#eef3fb" stroke="#4a6fa5" stroke-width="2"/>
  <rect x="20" y="42" width="350" height="24" rx="6" fill="#cfe0f5"/>
  <text x="30" y="58" font-size="9" font-family="monospace" fill="#12365e">GET /search?q=cat HTTP/1.1</text>
  <g font-size="8.5" font-family="monospace" fill="#333">
    <text x="30" y="82">Host: example.com</text>
    <text x="30" y="96">Accept: application/json</text>
    <text x="30" y="110">User-Agent: curl/8.5.0</text>
    <text x="30" y="124">Authorization: Bearer eyJ…</text>
  </g>
  <line x1="20" y1="136" x2="370" y2="136" stroke="#4a6fa5" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="30" y="150" font-size="8.5" fill="#666">← empty line (CRLF) ends the headers</text>
  <rect x="20" y="158" width="350" height="60" rx="4" fill="#fdf3e7" stroke="#b57a4a" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="30" y="182" font-size="8.5" fill="#7a4a12">body (empty for GET, POST, …)</text>
  <text x="565" y="34" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d5c38">response</text>
  <rect x="390" y="42" width="350" height="176" rx="6" fill="#eaf7ee" stroke="#3d8b57" stroke-width="2"/>
  <rect x="390" y="42" width="350" height="24" rx="6" fill="#cdeedd"/>
  <text x="400" y="58" font-size="9" font-family="monospace" fill="#14532d">HTTP/1.1 200 OK</text>
  <g font-size="8.5" font-family="monospace" fill="#333">
    <text x="400" y="82">Content-Type: application/json</text>
    <text x="400" y="96">Content-Length: 12</text>
    <text x="400" y="110">Cache-Control: max-age=60</text>
    <text x="400" y="124">ETag: "33a64df5"</text>
  </g>
  <line x1="390" y1="136" x2="740" y2="136" stroke="#3d8b57" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="400" y="150" font-size="8.5" fill="#666">← empty line (CRLF) ends the headers</text>
  <rect x="390" y="158" width="350" height="60" rx="4" fill="#fdf3e7" stroke="#b57a4a" stroke-width="1.5"/>
  <text x="400" y="182" font-size="9" font-family="monospace" fill="#7a4a12">{"ok": true}</text>
  <text x="380" y="240" text-anchor="middle" font-size="9.5" fill="#666">Every line ends with CRLF (0x0D 0x0A); headers are case-insensitive `Name: value` pairs.</text>
</svg>

**Example request** (with a query string) and **response**:

```http
GET /search?q=cat&lang=en HTTP/1.1
Host: example.com
Accept: application/json
User-Agent: curl/8.5.0
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9…

```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 12
Cache-Control: max-age=60
ETag: "33a64df5"
Date: Sat, 31 Dec 2016 15:31:45 GMT
Connection: keep-alive

{"ok": true}
```

**Status codes** (first digit = class): **1xx** informational (101 Switching Protocols, for WebSockets); **2xx** success (200 OK, 201 Created, 204 No Content); **3xx** redirection (301 Moved Permanently + `Location`, 304 Not Modified); **4xx** client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests); **5xx** server error (500 Internal Server Error, 503 Service Unavailable + `Retry-After`).

**Common headers**:

<table>
<tr><th>Header</th><th>Direction</th><th>Meaning</th></tr>
<tr><td><code>Host</code></td><td>request</td><td>target host (required in HTTP/1.1; includes the port if non-default) — one server can host many sites</td></tr>
<tr><td><code>Content-Type</code></td><td>both</td><td>MIME type of the body: <code>application/json</code>, <code>text/html; charset=utf-8</code>, …</td></tr>
<tr><td><code>Content-Length</code></td><td>both</td><td>body size in bytes (alternative: <code>Transfer-Encoding: chunked</code>)</td></tr>
<tr><td><code>Accept</code></td><td>request</td><td>media types the client can parse</td></tr>
<tr><td><code>Authorization</code></td><td>request</td><td>credentials: <code>Bearer &lt;token&gt;</code>, <code>Basic &lt;base64&gt;</code></td></tr>
<tr><td><code>User-Agent</code></td><td>request</td><td>client software identifier</td></tr>
<tr><td><code>Cookie</code> / <code>Set-Cookie</code></td><td>req / resp</td><td>session state (the server sets a cookie; the client echoes it)</td></tr>
<tr><td><code>Cache-Control</code>, <code>ETag</code>, <code>Last-Modified</code></td><td>both</td><td>caching directives and validators</td></tr>
<tr><td><code>Location</code></td><td>response</td><td>redirect target for 3xx</td></tr>
<tr><td><code>Transfer-Encoding</code></td><td>response</td><td><code>chunked</code>: body sent as size-prefixed chunks when the length is unknown</td></tr>
</table>

**REST**: a set of constraints on HTTP: resources identified by URIs, operations by methods (GET = read, POST = create, PUT = update, DELETE = remove), stateless (no session state on the server), uniform interface.

**Body formats** (selected via `Content-Type`):

- **Query string** — key/value pairs in the URL after `?`, URL-encoded, joined by `&`: `GET /search?q=cat&lang=en HTTP/1.1`. Parsed by the server into a map.
- **JSON** — `Content-Type: application/json`, body `{"name": "Ada", "age": 36}`.
- **Form** — `Content-Type: application/x-www-form-urlencoded`; same encoding as the query string, but in the body: `name=Ada&age=36`.
- **Multipart** ([RFC 7578](https://datatracker.ietf.org/doc/html/rfc7578)) — several parts separated by a boundary, each with its own headers (used for file uploads):

```http
POST /upload HTTP/1.1
Host: example.com
Content-Type: multipart/form-data; boundary=----boundary123

------boundary123
Content-Disposition: form-data; name="comment"

Hello!
------boundary123
Content-Disposition: form-data; name="file"; filename="pic.png"
Content-Type: image/png

<binary bytes of the PNG>
------boundary123--
```

- **Binary** — `application/octet-stream`, raw bytes (e.g. an image download).

**Chunked transfer encoding** example — when the server does not know the body length upfront (streaming), it sends `Transfer-Encoding: chunked` and prefixes each chunk with its size in hex, ending with a `0` chunk:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Transfer-Encoding: chunked

7E
<!doctype html><html>… 126 bytes …</html>
0

```

**Caching** ([RFC 9111](https://datatracker.ietf.org/doc/html/rfc9111)): `Cache-Control: max-age=3600` (cache for 1 hour). `ETag` / `If-None-Match`: the server returns 304 Not Modified if the resource is unchanged. `Last-Modified` / `If-Modified-Since`: time-based revalidation. See [Throughput Scaling](./Scalability/Throughput-Scaling.md) for CDN and application-level caching.

**SSE** (Server-Sent Events, [WHATWG HTML](https://html.spec.whatwg.org/multipage/server-sent-events.html)): the server pushes events to the client over a single HTTP connection. `Content-Type: text/event-stream`. Unidirectional (server → client). Used for live updates, notifications.

**WebSockets** ([RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455)): a full-duplex, bidirectional protocol over a single TCP connection. Upgraded from HTTP (`Upgrade: websocket`). Used for chat, collaborative editing, real-time gaming.

**HTTP/2** ([RFC 9113](https://datatracker.ietf.org/doc/html/rfc9113)): multiplexes multiple requests and responses over a single TCP connection using binary framing and stream IDs. Eliminates head-of-line blocking at the application layer (though TCP-level retransmission can still stall all streams). Negotiated via ALPN (`h2`) during the TLS handshake.

**HTTP/3 (QUIC)**: replaces TCP+TLS with a single UDP-based protocol ([HTTP/3 — RFC 9114](https://datatracker.ietf.org/doc/html/rfc9114), [QUIC — RFC 9000](https://datatracker.ietf.org/doc/html/rfc9000)). QUIC integrates transport and encryption, performs its own 0-RTT/1-RTT handshake, and multiplexes streams independently—eliminating head-of-line blocking entirely (a lost packet in one stream does not stall others). Negotiated via ALPN (`h3`). See [UDP](#udp) for the transport layer.

</details>

## TLS

**TLS** (Transport Layer Security) encrypts the communication between a client and a server. **TLS 1.3** ([RFC 8446](https://datatracker.ietf.org/doc/html/rfc8446)): 1-RTT handshake (or 0-RTT for resumption). Key exchange: ECDHE (Elliptic Curve Diffie-Hellman Ephemeral). Cipher suite: AES-256-GCM or ChaCha20-Poly1305. The cryptographic primitives (ECDHE, AES-GCM, ChaCha20-Poly1305) are described in [Cryptography](../Information-Theory/Cryptography.md).

<details><summary>EXPLANATION</summary>

**Handshake** (TLS 1.3):
1. Client → Server: ClientHello (supported ciphers, key share, SNI).
2. Server → Client: ServerHello (chosen cipher, key share), {EncryptedExtensions, Certificate, CertificateVerify, Finished}.
3. Client → Server: Finished.

The **EncryptedExtensions** message (carried in the server's flight, encrypted with the handshake keys) carries ALPN (Application-Layer Protocol Negotiation, e.g., selecting `h2` or `http/1.1`), key usage, and other negotiated parameters.

The shared secret is derived from the ECDHE key exchange. The certificate is signed by a CA (Certificate Authority); the client verifies the chain of trust.

**Certificate**: contains the server's public key, domain name, validity period, and the CA's signature. The client checks: (1) the certificate is signed by a trusted CA, (2) the domain name matches, (3) the certificate is not expired.

**Forward secrecy**: the ECDHE keys are ephemeral. Even if the server's private key is compromised later, past sessions cannot be decrypted.

**TLS 1.3 handshake sequence**:

<table>
<tr><th>Step</th><th>Direction</th><th>Messages</th><th>Encrypted?</th></tr>
<tr><td>1</td><td>Client → Server</td><td>ClientHello</td><td>No</td></tr>
<tr><td>2</td><td>Server → Client</td><td>ServerHello</td><td>No</td></tr>
<tr><td>3</td><td>Server → Client</td><td>EncryptedExtensions, Certificate, CertificateVerify, Finished</td><td>Yes (handshake keys)</td></tr>
<tr><td>4</td><td>Client → Server</td><td>Finished</td><td>Yes (handshake keys)</td></tr>
</table>

After step 4, both sides switch to application data keys. The entire handshake is 1 RTT (steps 1–2 are the RTT; steps 3–4 can be pipelined).

</details>

## DNS

**DNS** (Domain Name System, [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)) maps domain names to IP addresses. A **query** goes: resolver → root server → TLD server → authoritative server. **Caching**: each resolver caches the answer for the TTL (Time To Live).

<details><summary>EXPLANATION</summary>

**DNS record types**: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail server), TXT (text, e.g., SPF, DKIM), NS (name server), SOA (Start of Authority).

**DNSSEC** ([RFC 4033](https://datatracker.ietf.org/doc/html/rfc4033)): signs DNS records to prevent spoofing. The root zone is signed; each zone signs its records. The client verifies the chain of signatures.

**DNS over HTTPS (DoH)** ([RFC 8484](https://datatracker.ietf.org/doc/html/rfc8484)) / **DNS over TLS (DoT)** ([RFC 7858](https://datatracker.ietf.org/doc/html/rfc7858)): encrypts the DNS query to prevent eavesdropping and tampering by the local resolver.

DNS queries use UDP port 53 (falling back to TCP for large responses). See [UDP](#udp) below.

</details>

## DHCP

**DHCP** (Dynamic Host Configuration Protocol, [RFC 2131](https://datatracker.ietf.org/doc/html/rfc2131)): a client requests an IP address, subnet mask, gateway, and DNS servers from a DHCP server. **DORA**: Discover → Offer → Request → Acknowledge.

<details><summary>EXPLANATION</summary>

**DHCP lease**: the IP address is leased for a period (e.g., 24 hours). The client must renew before the lease expires. If the server is unreachable, the client keeps using the address until the lease expires.

DHCP uses UDP ports 67 (server) and 68 (client). The initial Discover is a broadcast (255.255.255.255) because the client does not yet have an IP address.

</details>

## Example problem

**Problem**: A client at 192.168.1.10 wants to fetch `https://example.com/api/data`. Describe the sequence of protocol interactions from DNS to TLS to HTTP.

<details><summary>Solution</summary>

1. **DNS**: The client sends a DNS query for `example.com` to its resolver (e.g., 8.8.8.8) over UDP port 53. The resolver queries the root → `.com` TLD → `example.com` authoritative server. The answer: `93.184.216.34` (A record). Cached for the TTL.

2. **TCP**: The client calls `socket()`, `connect()` to `93.184.216.34:443`. 3-way handshake: SYN → SYN-ACK → ACK.

3. **TLS**: The client sends a ClientHello (supported ciphers, ECDHE key share, SNI = `example.com`). The server responds with ServerHello, then the encrypted flight: EncryptedExtensions (ALPN: `h2`), Certificate (signed by Let's Encrypt), CertificateVerify, Finished. The client verifies the certificate chain and sends Finished. The shared secret is derived from the ECDHE exchange.

4. **HTTP**: The client sends `GET /api/data` as an HTTP/2 stream over the TLS-encrypted connection. The server responds with `200 OK`, `Content-Type: application/json`, and the JSON body.

5. **Teardown**: The client sends a FIN; the server responds with FIN-ACK. The TCP connection is closed.

**Total RTTs**: 1 (DNS, if not cached) + 1 (TCP) + 1 (TLS 1.3) + 1 (HTTP) = 4 RTTs. With TLS session resumption (0-RTT): 3 RTTs. With QUIC (HTTP/3): the TCP and TLS handshakes are merged, reducing to 1 (DNS) + 1 (QUIC) + 1 (HTTP) = 3 RTTs, or 2 with 0-RTT resumption.

</details>

