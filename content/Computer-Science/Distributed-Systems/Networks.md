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

The TCP/IP stack is a set of layers, each providing a service to the layer above. Data is **encapsulated** as it travels down (each layer prepends its header) and **decapsulated** as it travels up (each layer strips its header).

<table>
<tr><th>Layer</th><th>Protocol</th><th>Unit</th><th>Key field</th></tr>
<tr><td>Application</td><td>HTTP, DNS, TLS</td><td>Message</td><td>Method, path, status code</td></tr>
<tr><td>Transport</td><td>TCP, UDP</td><td>Segment / Datagram</td><td>Source port, destination port</td></tr>
<tr><td>Network</td><td>IP</td><td>Packet</td><td>Source IP, destination IP, TTL</td></tr>
<tr><td>Link</td><td>Ethernet, Wi-Fi</td><td>Frame</td><td>Source MAC, destination MAC</td></tr>
</table>

A web request `GET /api/data` becomes: HTTP request → TCP segment (ports 54321→443) → IP packet (192.168.1.10→93.184.216.34) → Ethernet frame (MAC AA:BB→MAC CC:DD). Each router strips the Ethernet frame, reads the IP header to decide the next hop, and re-encapsulates with a new Ethernet frame.

The physical and link layers (Ethernet, Wi-Fi, [Interfaces and Buses](../Interfaces-and-Buses/Readme.md)) carry frames between directly connected nodes. Everything above the link layer is the subject of this page.

## DNS

**DNS** (Domain Name System) maps domain names to IP addresses. A **query** goes: resolver → root server → TLD server → authoritative server. **Caching**: each resolver caches the answer for the TTL (Time To Live).

<details><summary>Details</summary>

**DNS record types**: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail server), TXT (text, e.g., SPF, DKIM), NS (name server), SOA (Start of Authority).

**DNSSEC**: signs DNS records to prevent spoofing. The root zone is signed; each zone signs its records. The client verifies the chain of signatures.

**DNS over HTTPS (DoH)** / **DNS over TLS (DoT)**: encrypts the DNS query to prevent eavesdropping and tampering by the local resolver.

DNS queries use UDP port 53 (falling back to TCP for large responses). See [UDP](#udp) below.

</details>

## DHCP

**DHCP** (Dynamic Host Configuration Protocol): a client requests an IP address, subnet mask, gateway, and DNS servers from a DHCP server. **DORA**: Discover → Offer → Request → Acknowledge.

<details><summary>Details</summary>

**DHCP lease**: the IP address is leased for a period (e.g., 24 hours). The client must renew before the lease expires. If the server is unreachable, the client keeps using the address until the lease expires.

DHCP uses UDP ports 67 (server) and 68 (client). The initial Discover is a broadcast (255.255.255.255) because the client does not yet have an IP address.

</details>

## IP and routing

**IP** (Internet Protocol) assigns each interface a 32-bit (IPv4) or 128-bit (IPv6) address. **CIDR** (Classless Inter-Domain Routing): `/24` means 24 bits for the network, 8 for the host (256 addresses).

**NAT** (Network Address Translation): a router maps private addresses (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) to a public address. Multiple devices share one public IP.

**Routing**: a router forwards packets based on a routing table. **BGP** (Border Gateway Protocol) is the inter-domain routing protocol: it exchanges reachability information between autonomous systems.

<details><summary>Details</summary>

**ARP** (Address Resolution Protocol): maps an IP address to a MAC address on the local network. `ARP request: "Who has 192.168.1.1?"` → `ARP reply: "192.168.1.1 is at AA:BB:CC:DD:EE:FF"`.

**ICMP** (Internet Control Message Protocol): error messages and diagnostics. `ping` uses ICMP Echo Request/Reply. `traceroute` uses ICMP Time Exceeded (each router decrements the TTL; when it hits 0, it sends a Time Exceeded).

**BGP**: each autonomous system (AS) runs a BGP speaker. BGP exchanges **prefixes** (e.g., `192.168.0.0/16`) and **paths** (the sequence of ASes). BGP is a path-vector protocol: it detects loops by checking the AS path. Convergence: $`\approx 1`–$`5` minutes after a topology change. **BFD** (Bidirectional Forwarding Detection) can reduce failover to approximately 1 second or less, which is the standard in modern data centers.

**IPv6**: 128-bit addresses. Eliminates NAT (every device has a globally unique address). SLAAC (Stateless Address Autoconfiguration): a device generates its own address from its MAC (or a random interface ID) and the router's prefix.

The IP header includes a **checksum** field for error detection (a 16-bit one's complement sum), a simpler mechanism than the [CRC](../Information-Theory/Communication.md) used at the link layer.

</details>

## TCP

**TCP** (Transmission Control Protocol) provides reliable, ordered, byte-stream delivery over IP. A **socket** is identified by (IP, port, protocol). A **port** is a 16-bit number (0–65535) that identifies a process.

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

<details><summary>Details</summary>

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

**UDP** (User Datagram Protocol) provides connectionless, unordered, unreliable datagram delivery over IP. The header is 8 bytes: source port, destination port, length, checksum.

<table>
<tr><th>Property</th><th>TCP</th><th>UDP</th></tr>
<tr><td>Connection</td><td>3-way handshake</td><td>None</td></tr>
<tr><td>Ordering</td><td>Guaranteed</td><td>Not guaranteed</td></tr>
<tr><td>Reliability</td><td>Retransmission + ACKs</td><td>Best-effort</td></tr>
<tr><td>Header size</td><td>20 bytes (min)</td><td>8 bytes</td></tr>
<tr><td>Use cases</td><td>HTTP, TLS, SSH, file transfer</td><td>DNS, QUIC, VoIP, gaming, video streaming</td></tr>
</table>

<details><summary>Details</summary>

UDP is the transport for [DNS](#dns), [QUIC/HTTP 3](#http), VoIP (RTP), and real-time multiplayer gaming. In each case, the application implements its own reliability (or deliberately accepts loss) because the per-packet overhead of TCP's retransmission and ordering is unacceptable for latency-sensitive traffic.

QUIC (RFC 9000) builds a reliable, ordered stream on top of UDP, combining transport and encryption in a single protocol. See [HTTP](#http) below.

</details>

## TLS

**TLS** (Transport Layer Security) encrypts the communication between a client and a server. **TLS 1.3** (RFC 8446): 1-RTT handshake (or 0-RTT for resumption). Key exchange: ECDHE (Elliptic Curve Diffie-Hellman Ephemeral). Cipher suite: AES-256-GCM or ChaCha20-Poly1305. The cryptographic primitives (ECDHE, AES-GCM, ChaCha20-Poly1305) are described in [Cryptography](../Information-Theory/Cryptography.md).

<details><summary>Details</summary>

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

## HTTP

**HTTP** (HyperText Transfer Protocol) is an application-layer protocol for web communication. A **request** has a method (GET, POST, PUT, DELETE), a **path**, **headers**, and an optional **body**. A **response** has a **status code** (200, 404, 500), headers, and a body.

<details><summary>Details</summary>

**REST**: a set of constraints on HTTP: resources identified by URIs, operations by methods (GET = read, POST = create, PUT = update, DELETE = remove), stateless (no session state on the server), uniform interface.

**Body formats**: `application/json`, `application/x-www-form-urlencoded` (query string), `multipart/form-data` (file uploads), `application/octet-stream` (binary).

**Query string**: `?key=value&key2=value2`. Parsed into a map. **Form data**: `POST` with `Content-Type: application/x-www-form-urlencoded`.

**Caching**: `Cache-Control: max-age=3600` (cache for 1 hour). `ETag` / `If-None-Match`: the server returns 304 Not Modified if the resource is unchanged. `Last-Modified` / `If-Modified-Since`: time-based revalidation. See [Scaling Strategies](./Scalability/Scaling-Strategies.md) for CDN and application-level caching.

**Chunked transfer encoding**: the response body is sent in chunks, each prefixed with its size in hex. Used when the total length is unknown (e.g., streaming).

**SSE** (Server-Sent Events): the server pushes events to the client over a single HTTP connection. `Content-Type: text/event-stream`. Unidirectional (server → client). Used for live updates, notifications.

**WebSockets**: a full-duplex, bidirectional protocol over a single TCP connection. Upgraded from HTTP (`Upgrade: websocket`). Used for chat, collaborative editing, real-time gaming.

**HTTP/2**: multiplexes multiple requests and responses over a single TCP connection using binary framing and stream IDs. Eliminates head-of-line blocking at the application layer (though TCP-level retransmission can still stall all streams). Negotiated via ALPN (`h2`) during the TLS handshake.

**HTTP/3 (QUIC)**: replaces TCP+TLS with a single UDP-based protocol (RFC 9000). QUIC integrates transport and encryption, performs its own 0-RTT/1-RTT handshake, and multiplexes streams independently—eliminating head-of-line blocking entirely (a lost packet in one stream does not stall others). Negotiated via ALPN (`h3`). See [UDP](#udp) for the transport layer.

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

