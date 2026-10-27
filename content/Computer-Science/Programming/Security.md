# Security

Security studies how to protect software from malicious input, misuse, and unauthorized access. It is relevant whenever a program processes untrusted data, manages credentials, or grants access to resources.

> **Authoritative sources**
> - [The Web Application Hacker's Handbook (Stuttard & Pinto, 2nd ed.)](https://www.oreilly.com/library/view/the-web-application/9781118026472/)
> - [OWASP Top 10 (2025)](https://top10.owasp.org/2025/)
> - [NIST SP 800-63: Digital Identity Guidelines](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b.pdf)
> - [RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446)

## Layered defense

Security is a stack of independent layers, each protecting a different boundary:

1. **Memory safety** — protect the runtime: prevent the program from being corrupted by its own memory errors.
2. **Injection** — protect the input boundary: prevent untrusted data from being interpreted as code or commands.
3. **Authentication** — verify identity: confirm that the principal is who it claims to be.
4. **Authorization** — enforce access: ensure the authenticated principal may perform the requested action.
5. **Transport security** — protect the channel: ensure data in transit is confidential and intact.

The layers are ordered from the most internal boundary (memory the program owns) to the most external (data in transit over the network).

A failure in one layer should not cascade: defense in depth means each layer is independently sufficient to stop a different class of attack.

## Memory safety

Memory errors (buffer overflow, use-after-free, double free, dangling pointer, stack smashing) are the primary source of exploitable vulnerabilities in systems languages. The security consequence is **arbitrary code execution**: an attacker who controls the corrupted memory can redirect the program's control flow to injected shellcode. See [Memory Management](./Memory-Management.md) for the mechanics of each error.

**Mitigations** (from a security perspective):
- **ASLR** (Address Space Layout Randomization): randomize stack, heap, and library addresses so the attacker cannot predict where to jump.
- **Stack canaries**: a random value placed before the return address; if overwritten, the process aborts before the corrupted return is used.
- **DEP/NX** (No-Execute): mark the stack and heap as non-executable so injected shellcode cannot run.
- **Safe languages**: Rust's ownership model eliminates use-after-free and data races at compile time; Go's GC eliminates use-after-free but not data races.

<iframe src="./Security.simulation.html" title="Buffer overflow exploit chain with mitigations"></iframe>

<details><summary>Details</summary>

**Exploit chain** (from a security perspective): the attacker overwrites the return address with the address of shellcode placed in the buffer. ASLR makes the target address unpredictable; the canary detects the overwrite; DEP prevents executing the stack. All three must be defeated simultaneously for the exploit to succeed.

**Sandboxing**: restrict a program's access to system resources (files, network, devices). **Containerization** (Docker, Kubernetes) uses OS-level isolation (namespaces, cgroups) managed by the [Operating System](../Computer-Hardware/Operating-System.md). **Virtual machines** provide hardware-level isolation via a hypervisor.

</details>

## Injection

Injection occurs when untrusted input is interpreted as code, a query, or a command by the application. The OWASP category A05 covers SQL injection, command injection, template injection, LDAP injection, and XSS.

**SQL injection**: user input is concatenated into a SQL query. `SELECT * FROM users WHERE name = '` + input + `'`. Mitigation: parameterized queries (`WHERE name = ?`).

**Command injection**: user input is passed to a shell command. `system("ping " + input)`. Mitigation: avoid shell invocation; use argument arrays.

**XSS** (Cross-Site Scripting): user input is rendered as HTML/JavaScript. `<script>steal(cookies)</script>`. Mitigation: output encoding, Content-Security-Policy.

**CSRF** (Cross-Site Request Forgery): a malicious site triggers a request to a trusted site using the victim's session cookie. Mitigation: anti-CSRF tokens, SameSite cookies.

<iframe src="./Security.simulation.html" title="SQL injection: string concatenation vs parameterized queries"></iframe>

<details><summary>Details</summary>

**OWASP Top 10** (2025): A01 Broken Access Control, A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging and Alerting Failures, A10 Mishandling of Exceptional Conditions.

**Defense in depth**: multiple independent layers of defense. Even if one layer fails, others catch the attack. Example: input validation → parameterized queries → least-privilege DB user → network segmentation.

**Principle of least privilege**: each component runs with the minimum permissions it needs. A web server should not have `root` access; a database user should not have `DROP TABLE` privileges.

**Zero trust**: never trust, always verify. Every request is authenticated and authorized, regardless of its origin (internal or external network).

**Supply chain security**: attacks that compromise a dependency, build tool, or update channel (dependency confusion, typosquatting, malicious package updates). Mitigations: signed builds (SLSA), Software Bill of Materials (SBOM), pinned dependency versions, and reproducible builds. Notable incidents: SolarWinds (2020), Log4Shell (2021), xz-utils backdoor (2024).

**Security testing**: **fuzzing** (generate random or guided inputs to crash the program), **static analysis** (SAST: inspect source or bytecode for known vulnerability patterns without executing), **dynamic analysis** (DAST: probe a running application with crafted requests), and **penetration testing** (a human or automated red team attempts to exploit the system end-to-end). See [Software Engineering](./Software-Engineering.md) for testing methodology.

</details>

## Authentication

**Password hashing**: store a hash of the password, not the password. The requirement is a **slow, memory-hard KDF** with a **per-user salt**, cost-tuned so each hash takes $`\approx 0.5`–$`1` s on the target hardware. See [Cryptography](../Information-Theory/Cryptography.md) for the algorithm details (bcrypt, scrypt, Argon2, PBKDF2) and their parameters.

**Salt**: a random per-password value prepended to the password before hashing. Prevents rainbow table attacks and ensures identical passwords produce different hashes.

<details><summary>Details</summary>

**Multi-factor authentication (MFA)**: combine something you know (password) with something you have (TOTP, hardware key) or something you are (biometric).

**Session management**: after authentication, issue a session token (random, 256-bit). Store it in an HTTP-only, Secure, SameSite cookie. Invalidate on logout. Rotate on privilege change.

</details>

## Authorization

**ACL** (Access Control List): a list of (principal, resource, permission) tuples. Fine-grained but hard to manage at scale.

**RBAC** (Role-Based Access Control): assign permissions to roles; assign roles to users. `admin → {read, write, delete}`, `user → {read}`. Simpler than ACLs for large systems.

<details><summary>Details</summary>

**ABAC** (Attribute-Based Access Control): policies are expressions over attributes (user role, resource type, time of day, IP address). More flexible than RBAC but harder to reason about.

**OAuth 2.0 / OpenID Connect**: delegated authorization. The resource server (API) trusts the authorization server (IdP). The client receives an access token (short-lived) and a refresh token (long-lived). Used in social login, API access.

**JWT** (JSON Web Token): a signed token containing claims (user ID, roles, expiry). Stateless: the server does not need to store sessions. The signature (HMAC, RSA, ECDSA) prevents tampering.

</details>

## Transport security

TLS encrypts the channel between client and server, providing confidentiality, integrity, and authentication; the full handshake, certificate validation, and forward secrecy are described in [Networks](../Distributed-Systems/Networks.md), and the cipher suites and key-exchange mechanisms in [Cryptography](../Information-Theory/Cryptography.md).

<details><summary>Details</summary>

**Certificate validation**: the client checks that the server's certificate is signed by a trusted CA, is not expired, and matches the hostname. A misconfigured or expired certificate breaks the trust chain and the browser warns the user.

**Forward secrecy**: with ephemeral key exchange (ECDHE), the session key is derived from temporary keys that are discarded after the handshake. Even if the server's long-term private key is later compromised, past sessions remain confidential.

</details>

## Example problem

**Problem**: A web application stores user passwords. An attacker obtains the database. The passwords were stored using MD5. What is the risk, and what should the application do?

<details><summary>Solution</summary>

**Risk**: MD5 is fast ($`\approx 10^{11}` hashes/second on a modern GPU) and unsalted (if no salt was used). The attacker can use a rainbow table or brute-force to recover most passwords in minutes. Even with a salt, MD5 is too fast for a GPU.

**Remediation**:
1. **Force a password reset** for all users (the MD5 hashes are compromised).
2. **Re-hash** with a slow KDF: Argon2id or bcrypt (see [Cryptography](../Information-Theory/Cryptography.md) for parameters).
3. **Add a salt**: a random 16-byte value per user, stored alongside the hash.
4. **Implement rate limiting** on the login endpoint to slow online brute-force.
5. **Enable MFA** to reduce the impact of password compromise.

**Prevention**: never use fast hashes (MD5, SHA-1, SHA-256) for password storage. Always use a purpose-built KDF with a per-user salt and a cost parameter tuned to make each hash take $`\approx 0.5`–$`1` s.

```python
# Vulnerable: MD5 (fast, no salt, no memory hardness)
import hashlib
stored = hashlib.md5(password.encode()).hexdigest()

# Secure: Argon2id (slow, memory-hard, per-user salt)
from argon2 import PasswordHasher
ph = PasswordHasher(time_cost=3, memory_cost=256 * 1024, parallelism=4)
stored = ph.hash(password)  # includes salt and parameters
# Verify on login:
ph.verify(stored, password)
```

</details>

