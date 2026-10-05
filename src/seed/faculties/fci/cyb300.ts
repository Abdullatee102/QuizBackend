// src/seed/faculties/fci/cyb300.ts
import type { SeedCourse } from '../../types.js';

export const cyb300Courses: SeedCourse[] = [
  // 1. CYB 301: Network Security & Cryptography
  {
    code: 'CYB 301',
    title: 'Network Security & Cryptography',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the working principle of the IPsec protocol suite in both Transport Mode and Tunnel Mode.',
        options: [],
        correctAnswer: 'IPsec operates at the Network Layer to provide data confidentiality, integrity, and authentication. In Transport Mode, only the payload of the IP packet is encrypted or authenticated, while the original IP header remains exposed; it is primarily used for end-to-end host communication. In Tunnel Mode, the entire original IP packet (header and payload) is encrypted and encapsulated inside a brand new IP packet with a new header, forming the foundation of site-to-site Virtual Private Networks (VPNs).',
        gradingPoints: [
          { concept: 'Transport Mode protects payload leaving original IP header intact', weight: 0.5, aliases: ['host-to-host mode', 'payload encryption only'] },
          { concept: 'Tunnel Mode encapsulates and encrypts entire original IP packet in new header', weight: 0.5, aliases: ['gateway-to-gateway VPN', 'packet encapsulation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the TLS 1.3 Handshake protocol and how it establishes secure end-to-end communication.',
        options: [],
        correctAnswer: 'TLS 1.3 improves security and latency over prior versions by completing the handshake in a single round-trip (1-RTT). The client sends ClientHello with supported cryptographic suites and key share parameters (Ephemeral Diffie-Hellman). The server responds with ServerHello, selecting the cipher, providing its own key share, and transmitting its encrypted X.509 digital certificate. Both derive symmetric session keys, authenticating the server and establishing an encrypted channel immediately.',
        gradingPoints: [
          { concept: '1-RTT handshake using Ephemeral Diffie-Hellman key share', weight: 0.5, aliases: ['single round trip', 'ephemeral key exchange'] },
          { concept: 'server certificate authentication and symmetric session key derivation', weight: 0.5, aliases: ['digital certificate verification', 'session key derivation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Packet Filtering Firewalls, Stateful Inspection Firewalls, and Next-Generation Firewalls (NGFW).',
        options: [],
        correctAnswer: 'Packet filtering firewalls inspect packets statelessly at Network/Transport layers based on static rules (source/destination IP, port, protocol); they are fast but easily spoofed. Stateful inspection firewalls track active connection states (e.g., TCP handshakes) in a state table, permitting return traffic automatically. Next-Generation Firewalls (NGFW) perform deep packet inspection at the Application layer (Layer 7), integrating intrusion prevention systems (IPS), SSL/TLS decryption, and application awareness.',
        gradingPoints: [
          { concept: 'packet filtering inspects header fields statelessly', weight: 0.33, aliases: ['stateless filtering', 'static IP/port rules'] },
          { concept: 'stateful inspection tracks connection state tables', weight: 0.33, aliases: ['TCP state tracking', 'stateful firewall'] },
          { concept: 'NGFW inspects application layer traffic with IPS and SSL decryption', weight: 0.34, aliases: ['deep packet inspection', 'layer 7 awareness'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the mathematical foundation of Elliptic Curve Cryptography (ECC) and its advantage over RSA.',
        options: [],
        correctAnswer: 'ECC is based on the algebraic structure of elliptic curves over finite fields defined by Weierstrass equations (y^2 = x^3 + ax + b). Its security relies on the Elliptic Curve Discrete Logarithm Problem (ECDLP)—given point G and P = k*G, finding scalar k is computationally intractable. Its primary advantage over RSA is equivalent cryptographic strength with significantly smaller key sizes (e.g., a 256-bit ECC key offers equivalent security to a 3072-bit RSA key), reducing computational overhead, bandwidth, and battery usage.',
        gradingPoints: [
          { concept: 'based on elliptic curves over finite fields and ECDLP intractability', weight: 0.5, aliases: ['point addition and scalar multiplication', 'ECDLP problem'] },
          { concept: 'equivalent security with much smaller key sizes compared to RSA', weight: 0.5, aliases: ['256-bit vs 3072-bit', 'lower computational and bandwidth cost'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Denial of Service (DoS) and Distributed Denial of Service (DDoS) attack categories: Volumetric, Protocol, and Application-Layer attacks.',
        options: [],
        correctAnswer: 'Volumetric attacks flood network bandwidth with massive traffic volumes (e.g., UDP/DNS amplification) measured in Gbps. Protocol attacks exploit weaknesses in transport protocols to exhaust server resources (e.g., TCP SYN floods exhausting connection backlogs). Application-layer attacks (Layer 7) target web server resources with apparently legitimate requests (e.g., HTTP GET floods, Slowloris) that consume database and memory pools.',
        gradingPoints: [
          { concept: 'volumetric floods bandwidth and protocol exploits network stack state tables', weight: 0.5, aliases: ['UDP amplification', 'SYN flood'] },
          { concept: 'application layer attacks exhaust web/application server resources', weight: 0.5, aliases: ['HTTP floods', 'Slowloris attack', 'layer 7 DDoS'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Virtual Private Network (VPN) and how do OpenVPN and WireGuard differ in architecture?',
        options: [],
        correctAnswer: 'A VPN creates an encrypted tunnel across untrusted public networks, ensuring confidentiality and integrity. OpenVPN is a mature, highly configurable protocol running in user space via OpenSSL, supporting both TCP and UDP, but is complex with large codebases. WireGuard is a modern, lightweight protocol implemented in Linux kernel space using modern cryptography (ChaCha20, Poly1305, Curve25519) with a compact codebase (~4,000 lines), offering substantially higher throughput and lower latency.',
        gradingPoints: [
          { concept: 'creates encrypted tunnel over public networks for private transmission', weight: 0.4, aliases: ['encrypted network tunnel', 'secure tunnel'] },
          { concept: 'WireGuard is kernel-space with compact codebase and modern crypto vs user-space OpenVPN', weight: 0.6, aliases: ['wireguard kernel performance', 'compact code comparison'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the structure and operation of a Public Key Infrastructure (PKI) Certificate Revocation List (CRL) versus Online Certificate Status Protocol (OCSP).',
        options: [],
        correctAnswer: 'When a certificate private key is compromised, the CA revokes it. A Certificate Revocation List (CRL) is a periodically published, digitally signed file listing serial numbers of all revoked certificates; clients must download the entire list, causing bandwidth bloat and latency. Online Certificate Status Protocol (OCSP) provides real-time status queries where the client queries the CA responder for a specific certificate serial number, receiving an instant signed status (Good, Revoked, Unknown).',
        gradingPoints: [
          { concept: 'CRL publishes full signed list of revoked certificate serial numbers periodically', weight: 0.5, aliases: ['certificate revocation list', 'batch download'] },
          { concept: 'OCSP queries real-time status of individual certificates on demand', weight: 0.5, aliases: ['real-time revocation checking', 'OCSP stapling'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Wireless Network security protocols: WEP, WPA2 (AES-CCMP), and WPA3 (SAE).',
        options: [],
        correctAnswer: 'WEP used flawed RC4 stream ciphers with short 24-bit IVs and CRC32, making it crackable in minutes. WPA2 introduced strong AES-CCMP encryption and 4-way handshakes, but remained vulnerable to offline dictionary attacks via captured handshakes and KRACK key reinstallation attacks. WPA3 replaces the 4-way pre-shared key handshake with Simultaneous Authentication of Equals (SAE - Dragonfly handshake), providing forward secrecy and resisting offline password guessing.',
        gradingPoints: [
          { concept: 'WEP is broken with flawed IVs and RC4; WPA2 uses AES-CCMP', weight: 0.5, aliases: ['WEP vulnerabilities', 'WPA2 4-way handshake'] },
          { concept: 'WPA3 uses Simultaneous Authentication of Equals preventing offline dictionary attacks', weight: 0.5, aliases: ['WPA3 SAE', 'Dragonfly handshake', 'forward secrecy'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the working of an Intrusion Detection System (IDS) vs Intrusion Prevention System (IPS).',
        options: [],
        correctAnswer: 'An IDS is a passive monitoring system placed out-of-band via a network TAP or SPAN port; it inspects copies of network traffic, analyzes patterns, and alerts administrators when malicious behavior is detected without interrupting traffic flow. An IPS is an active security device placed directly in-line with network traffic; it monitors traffic in real time and actively blocks, drops, or resets connections immediately upon detecting malicious activity.',
        gradingPoints: [
          { concept: 'IDS is passive out-of-band monitoring and alerting', weight: 0.5, aliases: ['passive detection', 'span port monitoring'] },
          { concept: 'IPS is active in-line traffic inspection and packet dropping/blocking', weight: 0.5, aliases: ['in-line blocking', 'active prevention'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain DNS Spoofing / Cache Poisoning and how DNSSEC mitigates this vulnerability.',
        options: [],
        correctAnswer: 'DNS cache poisoning occurs when an attacker tricks a recursive DNS resolver into caching fraudulent IP address mappings for a domain name, redirecting users to malicious phishing servers. DNSSEC (Domain Name System Security Extensions) mitigates this by cryptographically signing DNS resource records using asymmetric public key cryptography, enabling resolvers to verify data origin authentication and message integrity through a chain of trust.',
        gradingPoints: [
          { concept: 'injects fraudulent IP records into resolver cache redirecting users', weight: 0.5, aliases: ['DNS cache poisoning', 'fraudulent DNS records'] },
          { concept: 'DNSSEC provides cryptographic digital signatures verifying authenticity', weight: 0.5, aliases: ['cryptographic DNS records', 'RRSIG and DNSKEY verification'] },
        ],
      },
    ],
  },

  // 2. CYB 303: Operating Systems Security
  {
    code: 'CYB 303',
    title: 'Operating Systems Security',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain Mandatory Access Control (MAC) vs Discretionary Access Control (DAC) in operating systems.',
        options: [],
        correctAnswer: 'In Discretionary Access Control (DAC), the resource owner decides access permissions for other users (e.g., standard Linux chmod/chown). In Mandatory Access Control (MAC), access decisions are enforced centrally by the operating system kernel security policy based on fixed security clearances and classification labels (e.g., SELinux, AppArmor); individual resource owners cannot override system-wide policies.',
        gradingPoints: [
          { concept: 'DAC allows resource owner to grant permissions at their discretion', weight: 0.5, aliases: ['owner controlled permissions', 'standard Unix permissions'] },
          { concept: 'MAC enforces central OS kernel security policy labels that owners cannot bypass', weight: 0.5, aliases: ['centralized security policy', 'SELinux mandatory labels'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC).',
        options: [],
        correctAnswer: 'RBAC assigns permissions to defined organizational roles (e.g., Administrator, Auditor, Student), and users are assigned to roles, simplifying enterprise privilege management. ABAC evaluates dynamic policies based on attributes of the subject (user), resource (file), action (read/write), and environmental context (time, location, device security posture), enabling fine-grained, context-aware authorization decisions.',
        gradingPoints: [
          { concept: 'RBAC grants permissions based on user organizational roles', weight: 0.5, aliases: ['role assignments', 'role based permissions'] },
          { concept: 'ABAC evaluates dynamic attributes of subject, resource, action, and environment', weight: 0.5, aliases: ['context-aware access', 'attribute based policies'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain OS Memory Protection techniques: Data Execution Prevention (DEP) and Address Space Layout Randomization (ASLR).',
        options: [],
        correctAnswer: 'Data Execution Prevention (DEP / NX bit) enforces hardware-level marking of data pages (stack and heap) as non-executable, preventing injected shellcode from executing. Address Space Layout Randomization (ASLR) randomly arranges the address space positions of key data areas (stack, heap, shared libraries) on process launch, preventing attackers from predicting target memory addresses for return-oriented programming (ROP) and control flow hijacking.',
        gradingPoints: [
          { concept: 'DEP marks data pages non-executable preventing shellcode execution', weight: 0.5, aliases: ['NX bit', 'W^X write or execute'] },
          { concept: 'ASLR randomizes memory offsets preventing address prediction for ROP', weight: 0.5, aliases: ['memory randomization', 'prevents return-to-libc'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Privilege Escalation attacks (Vertical vs Horizontal) and common mitigation strategies.',
        options: [],
        correctAnswer: 'Horizontal privilege escalation occurs when an attacker accesses data or functions belonging to another user with identical privilege levels (e.g., User A accessing User B private files). Vertical privilege escalation occurs when a lower-privileged user gains higher administrative/root privileges by exploiting kernel flaws, misconfigured sudoers, or SUID binaries. Mitigations include enforcing least privilege, removing unnecessary SUID binaries, kernel hardening, and strict access controls.',
        gradingPoints: [
          { concept: 'horizontal escalation between peer users; vertical escalation to higher administrative privilege', weight: 0.5, aliases: ['peer user access vs root escalation'] },
          { concept: 'mitigation via least privilege, SUID audits, and kernel patching', weight: 0.5, aliases: ['sudoers hardening', 'SUID removal'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Sandboxing and OS Containerization (e.g., Linux Namespaces and cgroups) from a security perspective.',
        options: [],
        correctAnswer: 'Linux containers (Docker, LXC) provide isolated user-space environments sharing the host kernel. Linux Namespaces isolate system resources per container (PID namespace isolates processes, NET isolates networking, MNT isolates filesystems, USER isolates UIDs). Control Groups (cgroups) meter and limit physical resources (CPU, RAM, I/O) preventing denial-of-service through resource starvation. Security profiles like seccomp filters restrict accessible kernel system calls.',
        gradingPoints: [
          { concept: 'Namespaces isolate view of system resources (PID, network, mounts)', weight: 0.5, aliases: ['linux namespaces isolation'] },
          { concept: 'cgroups constrain resource consumption and seccomp filters system calls', weight: 0.5, aliases: ['resource limits', 'seccomp syscall filtering'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Rootkit, what are its types (User-mode, Kernel-mode, Firmware), and why are kernel rootkits so dangerous?',
        options: [],
        correctAnswer: 'A rootkit is stealthy malware designed to maintain persistent administrative access while concealing its presence and running processes. User-mode rootkits modify binaries or hook API calls (e.g., LD_PRELOAD). Kernel-mode rootkits execute inside Ring 0, modifying kernel data structures (DKOM) or hooking system call tables to hide files and network sockets from the OS itself, making detection by standard antivirus nearly impossible.',
        gradingPoints: [
          { concept: 'stealth malware designed to maintain root access while hiding artifacts', weight: 0.4, aliases: ['stealth persistence', 'process hiding'] },
          { concept: 'kernel rootkits execute in Ring 0 modifying kernel structures making detection difficult', weight: 0.6, aliases: ['DKOM', 'syscall table hooking', 'ring 0 rootkit'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain System Auditing and Log Management (e.g., Linux auditd, Windows Event Logs) in forensic accountability.',
        options: [],
        correctAnswer: 'System auditing records immutable records of security-relevant operating system events (user logins, privilege changes, file accesses, process executions). Linux auditd uses kernel hooks to generate audit logs conforming to regulatory standards. Centralized log forwarding (SIEM, syslog-ng over TLS) prevents attackers who achieve root access on local machines from tampering with or erasing their audit trails.',
        gradingPoints: [
          { concept: 'records security-relevant system calls, logins, and file accesses', weight: 0.5, aliases: ['audit trail', 'event logging', 'auditd'] },
          { concept: 'centralized remote log shipping prevents local log tampering by attackers', weight: 0.5, aliases: ['remote SIEM forwarding', 'tamper-resistant logging'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how SUID / SGID permission bits function in Unix/Linux and their associated security risks.',
        options: [],
        correctAnswer: 'The SUID (Set User ID) bit allows a program to execute with the privileges of the file owner (often root) rather than the executing user (e.g., passwd command). If an SUID binary contains vulnerabilities (like buffer overflows) or insecure environment variable handling, an unprivileged local user can exploit it to spawn an interactive root shell, resulting in immediate vertical privilege escalation.',
        gradingPoints: [
          { concept: 'executes binary with privileges of file owner rather than invoking user', weight: 0.5, aliases: ['setuid execution', 'runs as root'] },
          { concept: 'vulnerabilities in SUID binaries allow immediate root privilege escalation', weight: 0.5, aliases: ['suid exploitation', 'privilege escalation risk'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Secure Boot, measured boot, and remote attestation in modern operating system startup security.',
        options: [],
        correctAnswer: 'Secure Boot ensures the firmware only executes bootloaders and kernel drivers cryptographically signed by trusted vendors. Measured Boot uses the TPM to cryptographically hash each stage of the boot sequence (firmware, bootloader, kernel) into Platform Configuration Registers (PCRs). Remote Attestation allows an external verifier to inspect signed PCR quotes to verify system integrity before granting network access.',
        gradingPoints: [
          { concept: 'Secure Boot verifies digital signatures of boot components', weight: 0.5, aliases: ['signed bootloader', 'cryptographic verification'] },
          { concept: 'Measured Boot records hashes into TPM PCRs for remote attestation', weight: 0.5, aliases: ['TPM PCR measurements', 'remote attestation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Principle of Least Privilege in operating system user management and service isolation.',
        options: [],
        correctAnswer: 'The Principle of Least Privilege dictates that every process, service, and user must operate using only the minimal set of privileges required to perform its function. In practice: background network daemons (web servers, database engines) should run under dedicated unprivileged service accounts (e.g., www-data) rather than root, ensuring that a daemon compromise does not grant full control over the host operating system.',
        gradingPoints: [
          { concept: 'grants minimal permissions necessary for required task', weight: 0.5, aliases: ['minimum necessary rights', 'privilege reduction'] },
          { concept: 'running daemons under unprivileged service accounts isolates compromises', weight: 0.5, aliases: ['service account isolation', 'prevents root takeover'] },
        ],
      },
    ],
  },

  // 3. CYB 305: Database Security & Auditing
  {
    code: 'CYB 305',
    title: 'Database Security & Auditing',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain Database Auditing and the distinction between Standard Auditing and Fine-Grained Auditing (FGA).',
        options: [],
        correctAnswer: 'Database Auditing records database activities to provide accountability, detect unauthorized access, and ensure compliance. Standard auditing monitors operations at the statement or privilege level (e.g., who executed SELECT on table Employees). Fine-Grained Auditing (FGA) monitors access based on specific data content or business conditions (e.g., auditing SELECT statements on Employees only when Salary > 1,000,000), capturing the exact SQL text and bind values.',
        gradingPoints: [
          { concept: 'Standard auditing tracks statement and object level actions', weight: 0.5, aliases: ['object-level auditing', 'privilege tracking'] },
          { concept: 'Fine-Grained Auditing records events based on granular data values and conditions', weight: 0.5, aliases: ['FGA', 'data content condition auditing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Transparent Data Encryption (TDE) and how it protects Data at Rest in database systems.',
        options: [],
        correctAnswer: 'Transparent Data Encryption (TDE) encrypts database data files, log files, and backup files at rest at the storage layer without requiring changes to application code. It uses a two-tier key hierarchy: a Database Encryption Key (DEK) encrypts actual database blocks, while a Master Key stored in an external security module or keystore encrypts the DEK. If physical disks or backups are stolen, the data cannot be read without the master key.',
        gradingPoints: [
          { concept: 'encrypts data files, logs, and backups at rest transparently to applications', weight: 0.5, aliases: ['data at rest encryption', 'storage layer encryption'] },
          { concept: 'two-tier key hierarchy with DEK encrypted by master key in external keystore', weight: 0.5, aliases: ['two-tier key management', 'database encryption key'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Inference and Aggregation problems in database security and statistical databases.',
        options: [],
        correctAnswer: 'The Aggregation problem occurs when individually non-sensitive pieces of information are combined to disclose sensitive classified information. The Inference problem occurs when an unauthorized user deduces sensitive confidential data by executing legal, authorized queries (such as statistical COUNT, SUM, AVG queries) and correlating responses with background knowledge. Defenses include query restriction, output perturbation (noise injection), and differential privacy.',
        gradingPoints: [
          { concept: 'Aggregation combines non-sensitive data to reveal sensitive insights', weight: 0.5, aliases: ['data correlation problem', 'combining public fields'] },
          { concept: 'Inference deduces confidential data via statistical queries and background knowledge', weight: 0.5, aliases: ['inference attack', 'statistical database disclosure'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe SQL Injection attack vectors (In-band, Inferential/Blind, Out-of-band) and defense mechanisms.',
        options: [],
        correctAnswer: 'In-band SQLi uses the same channel to launch the attack and harvest results (Error-based, UNION-based). Inferential (Blind) SQLi does not display data directly; the attacker reconstructs information bit-by-bit by observing Boolean responses (True/False) or time delays (Time-based SQLi). Out-of-band SQLi triggers database DNS/HTTP requests to external attacker-controlled servers. Defense requires prepared statements with parameterized queries and strict input validation.',
        gradingPoints: [
          { concept: 'In-band (UNION/Error), Blind (Boolean/Time), and Out-of-band vectors', weight: 0.6, aliases: ['SQLi categories', 'blind SQL injection'] },
          { concept: 'defense strictly via parameterized queries and input validation', weight: 0.4, aliases: ['prepared statements defense', 'parameterization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Database Privilege Management: System Privileges vs Object Privileges, and the principle of least privilege.',
        options: [],
        correctAnswer: 'System privileges grant the ability to perform administrative tasks across the database (e.g., CREATE USER, ALTER DATABASE, CREATE ANY TABLE). Object privileges grant rights to perform data actions on specific database objects (e.g., SELECT, INSERT, UPDATE, DELETE on a specific table or view). Enforcing least privilege prevents granting "ANY" privileges, restricting user accounts and applications strictly to object-level access on required tables.',
        gradingPoints: [
          { concept: 'system privileges grant broad administrative actions', weight: 0.5, aliases: ['administrative rights', 'create any table'] },
          { concept: 'object privileges grant specific actions on designated tables', weight: 0.5, aliases: ['table-level CRUD permissions', 'least privilege enforcement'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Database Masking (Static Data Masking vs Dynamic Data Masking) and where is each used?',
        options: [],
        correctAnswer: 'Static Data Masking (SDM) permanently transforms sensitive production data into realistic but fictional data in non-production databases (testing, development), preventing exposure of real customer records to developers. Dynamic Data Masking (DDM) obscures sensitive data in real time in query results based on user privileges (e.g., displaying only the last 4 digits of a credit card: ****-****-****-1234) while the underlying data in storage remains unchanged.',
        gradingPoints: [
          { concept: 'Static masking permanently sanitizes copies for development/testing', weight: 0.5, aliases: ['permanent data sanitization', 'non-production masking'] },
          { concept: 'Dynamic masking obfuscates query results on the fly without changing storage', weight: 0.5, aliases: ['real-time query masking', 'role-based masking'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Row-Level Security (RLS) in modern databases (like PostgreSQL) and its use cases.',
        options: [],
        correctAnswer: 'Row-Level Security (RLS) restricts which rows of a table a query returns or modifies based on security policies evaluated per user session. For example, a tenant policy ensures that an employee in a multi-tenant SaaS database can only query rows where tenant_id matches their session tenant identifier, enforcing database-level multi-tenancy isolation even if application code contains missing WHERE clauses.',
        gradingPoints: [
          { concept: 'evaluates security policies to restrict row visibility per user session', weight: 0.5, aliases: ['policy-driven row filtering', 'PostgreSQL RLS'] },
          { concept: 'enforces multi-tenant isolation and prevents data leaks from missing WHERE clauses', weight: 0.5, aliases: ['multi-tenancy isolation', 'database-level guardrail'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Database Activity Monitoring (DAM) and how it detects anomalous DBA behavior.',
        options: [],
        correctAnswer: 'Database Activity Monitoring (DAM) inspects database traffic independently of native DBMS engines using network sniffers or memory sensors. It provides real-time policy monitoring without performance degradation, detecting insider threats and compromised DBA accounts (such as after-hours bulk data exports or schema tampering) that could otherwise disable native database audit logs.',
        gradingPoints: [
          { concept: 'independent monitoring of database traffic via network/agent sensors', weight: 0.5, aliases: ['external activity monitoring', 'out-of-band monitoring'] },
          { concept: 'detects insider threats and DBA anomalies that could tamper with native logs', weight: 0.5, aliases: ['privileged user monitoring', 'unalterable audit'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Column-Level Encryption in databases and how does it compare with Whole-Disk Encryption?',
        options: [],
        correctAnswer: 'Whole-Disk Encryption protects physical media against theft but exposes decrypted data to anyone logged into the operating system or database. Column-Level Encryption encrypts specific sensitive columns (e.g., social security numbers, credit cards) within the database using application-managed or database keys. Even if an attacker gains unauthorized administrative access to the database or reads the raw data pages, the encrypted columns cannot be decrypted without the specific column keys.',
        gradingPoints: [
          { concept: 'whole-disk protects against hardware theft but leaves data readable to OS/DBA', weight: 0.5, aliases: ['disk-level encryption limits'] },
          { concept: 'column-level encrypts specific sensitive fields protecting against unauthorized DBAs', weight: 0.5, aliases: ['field-level encryption', 'granular key protection'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Database Backups in disaster recovery and strategies for securing backup media.',
        options: [],
        correctAnswer: 'Database backups ensure business continuity and recovery from data corruption, ransomware, and disaster. Securing backups requires: encrypting backup files with independent cryptographic keys; storing immutable copies (WORM storage) that cannot be altered or deleted by ransomware; storing backups offsite geographically; and testing restoration procedures periodically.',
        gradingPoints: [
          { concept: 'ensures recovery against data loss, disaster, and ransomware', weight: 0.5, aliases: ['disaster recovery', 'business continuity'] },
          { concept: 'requires backup encryption, immutable storage, offsite retention, and restore testing', weight: 0.5, aliases: ['encrypted backups', 'immutable WORM storage'] },
        ],
      },
    ],
  },

  // 4. CYB 302: Vulnerability Assessment & Penetration Testing
  {
    code: 'CYB 302',
    title: 'Vulnerability Assessment & Penetration Testing',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Compare Vulnerability Assessment (VA) with Penetration Testing (PT).',
        options: [],
        correctAnswer: 'Vulnerability Assessment is a broad, non-destructive automated process that scans systems to identify and catalog known vulnerabilities and security weaknesses (often rated via CVSS scores). Penetration Testing is an authorized, goal-oriented active simulation of real-world cyberattacks that exploits identified vulnerabilities to determine whether an attacker can breach defenses, compromise sensitive data, and pivot deeper into the network.',
        gradingPoints: [
          { concept: 'VA is broad automated scanning identifying potential vulnerabilities', weight: 0.5, aliases: ['vulnerability scanning', 'breadth-oriented audit'] },
          { concept: 'PT is active exploitation simulating real attacks to verify exploitability', weight: 0.5, aliases: ['active exploitation', 'depth-oriented breach simulation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the five phases of a formal Penetration Testing methodology (Reconnaissance, Scanning, Exploitation, Post-Exploitation, Reporting).',
        options: [],
        correctAnswer: '1. Reconnaissance (gathering target intelligence via OSINT, passive/active methods); 2. Scanning & Enumeration (identifying live hosts, open ports, and running services via Nmap); 3. Exploitation (leveraging vulnerabilities using exploits to gain initial access); 4. Post-Exploitation (privilege escalation, persistence, pivoting across internal subnets); and 5. Reporting (documenting technical findings, business impact, and remediation steps).',
        gradingPoints: [
          { concept: 'Reconnaissance, Scanning, and Exploitation', weight: 0.5, aliases: ['intelligence gathering', 'port scanning', 'gaining access'] },
          { concept: 'Post-Exploitation and Remediation Reporting', weight: 0.5, aliases: ['lateral movement', 'privilege escalation', 'executive report'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Common Vulnerability Scoring System (CVSS v3.1) Base Metric components.',
        options: [],
        correctAnswer: 'CVSS v3.1 evaluates vulnerability severity on a scale from 0.0 to 10.0 using Base Metrics: Exploitability metrics (Attack Vector: Network/Adjacent/Local/Physical; Attack Complexity; Privileges Required; User Interaction) and Impact metrics (Confidentiality, Integrity, and Availability impact, along with Scope changed/unchanged). Vulnerabilities are categorized as Low, Medium, High, or Critical (9.0–10.0).',
        gradingPoints: [
          { concept: 'Base score evaluated on scale 0.0 to 10.0', weight: 0.3, aliases: ['CVSS scale', 'severity rating'] },
          { concept: 'Exploitability metrics: Attack Vector, Complexity, Privileges, User Interaction', weight: 0.4, aliases: ['exploitability factors'] },
          { concept: 'Impact metrics: CIA impact and Scope', weight: 0.3, aliases: ['confidentiality integrity availability impact'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Port Scanning techniques: TCP Connect Scan vs SYN Stealth Scan (Half-Open Scan).',
        options: [],
        correctAnswer: 'A TCP Connect scan (-sT in Nmap) completes the full 3-way handshake (SYN, SYN-ACK, ACK); it does not require raw socket root privileges, but is loud and easily logged by target firewalls. A SYN Stealth scan (-sS) sends a SYN packet; if the target replies with SYN-ACK, the port is open, and Nmap immediately sends an RST packet to tear down the connection without completing the handshake, bypassing basic connection logging.',
        gradingPoints: [
          { concept: 'TCP Connect completes full 3-way handshake and is easily logged', weight: 0.5, aliases: ['full handshake scan', 'unprivileged port scan'] },
          { concept: 'SYN stealth sends RST upon receiving SYN-ACK avoiding full connection establishment', weight: 0.5, aliases: ['half-open scan', 'stealth RST teardown'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Pivoting and Lateral Movement in penetration testing and how are SSH Tunnels and Port Forwarding used?',
        options: [],
        correctAnswer: 'Pivoting is the technique of using an initially compromised host as a jump-box to route attack traffic into isolated internal subnets that are unreachable from the external network. Penetration testers use SSH local/remote/dynamic port forwarding (or tools like Chisel/Proxychains) to route traffic through the compromised host, scanning and compromising internal servers.',
        gradingPoints: [
          { concept: 'using compromised host to route traffic into isolated internal subnets', weight: 0.5, aliases: ['jump box technique', 'internal network pivoting'] },
          { concept: 'uses SSH port forwarding, SOCKS proxies, and tunneling tools', weight: 0.5, aliases: ['ssh tunneling', 'proxychains', 'port forwarding'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Black-Box, White-Box, and Gray-Box penetration testing.',
        options: [],
        correctAnswer: 'Black-Box testing simulates an external attacker with zero prior knowledge of the target system, assessing perimeter defense realism. White-Box testing gives the tester full access to architectural blueprints, network diagrams, and source code, allowing thorough in-depth security analysis. Gray-Box testing provides partial knowledge (such as unprivileged user credentials), simulating insider threats or authenticated users.',
        gradingPoints: [
          { concept: 'Black-box has zero knowledge simulating external attacker', weight: 0.33, aliases: ['zero knowledge test'] },
          { concept: 'White-box has complete access to code and architecture', weight: 0.33, aliases: ['full knowledge test', 'source review'] },
          { concept: 'Gray-box has partial knowledge simulating insider threats', weight: 0.34, aliases: ['partial knowledge test', 'authenticated user'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role and ethical constraints of the Rules of Engagement (RoE) document in penetration testing.',
        options: [],
        correctAnswer: 'The Rules of Engagement (RoE) is a legally binding agreement between client and tester defining the testing scope: permitted IP ranges/domains, excluded critical infrastructure, authorized testing hours, emergency contact protocols, handling of discovered sensitive data, and permitted testing methods (e.g., forbidding destructive DoS attacks). It protects testers from legal liability under computer crime laws.',
        gradingPoints: [
          { concept: 'legally binding document defining authorized scope, targets, and methods', weight: 0.5, aliases: ['testing scope definition', 'authorized targets'] },
          { concept: 'sets testing hours, exclusions, emergency protocols, and legal authorization', weight: 0.5, aliases: ['liability protection', 'out-of-bounds targets'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Automated Web Application Vulnerability Scanners (e.g., OWASP ZAP, Burp Suite) and their limitations.',
        options: [],
        correctAnswer: 'Web scanners crawl applications and inject test payloads to detect common flaws like SQLi, XSS, and misconfigurations automatically. Their limitations include: generating false positives; missing complex multi-step business logic vulnerabilities (e.g., manipulating price parameters during checkout); inability to navigate complex modern single-page apps with multi-factor authentication; and potential risk of database corruption if unsafe methods are invoked.',
        gradingPoints: [
          { concept: 'crawls and injects payloads detecting common web vulnerabilities', weight: 0.5, aliases: ['automated web scanning', 'DAST tools'] },
          { concept: 'limitations include false positives, missing business logic flaws, and stateful flows', weight: 0.5, aliases: ['business logic limitations', 'false positive noise'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Privilege Escalation on Linux systems via Misconfigured Sudo Privileges and Cron Jobs.',
        options: [],
        correctAnswer: 'Attackers inspect "sudo -l" to find commands runnable as root without passwords; if a binary like vim, less, or find has sudo rights, GTFOBins techniques spawn root shells. Insecure cron jobs running as root that execute world-writable scripts or programs located in writable directories allow an attacker to modify the script content, executing arbitrary commands with root privileges when the cron job fires.',
        gradingPoints: [
          { concept: 'sudo -l misconfigurations exploited via GTFOBins to escape to root', weight: 0.5, aliases: ['sudo rights abuse', 'GTFOBins'] },
          { concept: 'world-writable scripts executed by root cron jobs allow code injection', weight: 0.5, aliases: ['cron job exploitation', 'insecure cron permissions'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Post-Exploitation Clean-up procedure and why is it essential for professional penetration testers?',
        options: [],
        correctAnswer: 'Clean-up is the mandatory final phase where the tester removes all artifacts introduced during testing: deleting uploaded web shells, scripts, and temporary files; terminating backdoor processes and listening ports; removing created test user accounts; and restoring modified system configurations to their original baseline state, ensuring client systems are not left vulnerable to real attackers.',
        gradingPoints: [
          { concept: 'removes web shells, backdoor processes, test accounts, and tools', weight: 0.5, aliases: ['artifact deletion', 'removing backdoors'] },
          { concept: 'restores system configurations ensuring environment is not left vulnerable', weight: 0.5, aliases: ['restoring original state', 'leaving no security holes'] },
        ],
      },
    ],
  },

  // 5. CYB 304: Biometrics & Authentication Systems
  {
    code: 'CYB 304',
    title: 'Biometrics & Authentication Systems',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain the three classic authentication factors: Something you know, Something you have, and Something you are.',
        options: [],
        correctAnswer: '1. Something you know: knowledge-based factors such as passwords, PINs, and security questions; vulnerable to brute-force and phishing. 2. Something you have: possession-based factors such as hardware security tokens (YubiKey), smartphones with authenticator apps, and smart cards. 3. Something you are: biometric factors based on physiological or behavioral characteristics like fingerprints, iris patterns, and facial geometry.',
        gradingPoints: [
          { concept: 'knowledge (passwords), possession (tokens/phones), and inherence (biometrics)', weight: 0.6, aliases: ['three authentication factors', 'knowledge possession inherence'] },
          { concept: 'examples and security trade-offs for each factor', weight: 0.4, aliases: ['factor examples', 'phishing and theft risks'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Physiological Biometrics and Behavioral Biometrics with examples.',
        options: [],
        correctAnswer: 'Physiological biometrics measure static physical body characteristics that remain largely stable over time (e.g., fingerprints, iris patterns, retina scans, facial geometry, DNA). Behavioral biometrics measure dynamic behavioral patterns that individuals develop over time (e.g., keystroke dynamics, voice cadence, signature dynamics, gait analysis); they support continuous authentication but have higher variance.',
        gradingPoints: [
          { concept: 'Physiological measures stable physical traits (fingerprints, iris, facial)', weight: 0.5, aliases: ['static physical characteristics', 'fingerprint iris'] },
          { concept: 'Behavioral measures dynamic habits (keystroke dynamics, voice, gait)', weight: 0.5, aliases: ['behavioral traits', 'continuous authentication'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain False Acceptance Rate (FAR), False Rejection Rate (FRR), and the Crossover Error Rate (CER / EER) in biometric systems.',
        options: [],
        correctAnswer: 'False Acceptance Rate (FAR) is the percentage of unauthorized impostors incorrectly accepted by the system. False Rejection Rate (FRR) is the percentage of authorized legitimate users incorrectly rejected. Adjusting the sensitivity threshold trades off FAR against FRR. The Crossover Error Rate (CER / Equal Error Rate - EER) is the point where FAR equals FRR; a lower CER indicates a superior, more accurate biometric system.',
        gradingPoints: [
          { concept: 'FAR is impostor acceptance rate and FRR is legitimate rejection rate', weight: 0.5, aliases: ['Type I and Type II errors', 'impostor pass rate'] },
          { concept: 'CER/EER is the intersection point where FAR = FRR indicating overall accuracy', weight: 0.5, aliases: ['equal error rate', 'accuracy benchmark'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe biometric spoofing attacks and how Liveness Detection (Presentation Attack Detection - PAD) prevents them.',
        options: [],
        correctAnswer: 'Spoofing attacks present artificial biometric replicas (e.g., silicone fingerprint molds, printed photos, 3D masks, video replays) to fool sensors. Liveness detection (PAD) verifies that the biometric sample comes from a living subject: passive methods detect micro-textures, skin reflection, or thermal heat; active methods challenge the user to blink, smile, or follow random prompts.',
        gradingPoints: [
          { concept: 'spoofing uses artificial replicas like silicone molds and printed photos', weight: 0.5, aliases: ['presentation attacks', 'fake biometric replicas'] },
          { concept: 'liveness detection checks physiological signs (heat, blinking, texture)', weight: 0.5, aliases: ['PAD', 'liveness verification', 'active/passive liveness'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the working of FIDO2 and WebAuthn for Passwordless Public-Key Authentication.',
        options: [],
        correctAnswer: 'FIDO2 / WebAuthn replaces shared passwords with public-key cryptography. During registration, the user\'s local authenticator (TouchID, YubiKey) generates a unique key pair bound to the website origin, sending only the public key to the server. During login, the server sends a challenge; the authenticator requests user biometric/PIN verification locally and signs the challenge with its private key. Because the private key never leaves the device and is bound to the domain, phishing is mathematically impossible.',
        gradingPoints: [
          { concept: 'generates domain-bound keypair storing private key locally in hardware', weight: 0.5, aliases: ['WebAuthn keypair', 'hardware bound credentials'] },
          { concept: 'signs server challenge locally via biometric/PIN making phishing impossible', weight: 0.5, aliases: ['challenge signing', 'phishing-resistant authentication'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare HMAC-based One-Time Password (HOTP) with Time-based One-Time Password (TOTP).',
        options: [],
        correctAnswer: 'HOTP (RFC 4226) generates one-time passcodes using HMAC-SHA1 of a shared secret key and an incrementing counter; it requires counter synchronization between client and server, failing if the token is pressed repeatedly out of sync. TOTP (RFC 6238) replaces the counter with the current Unix epoch time divided into 30-second time steps, eliminating counter de-synchronization issues and powering modern authenticator apps (Google Authenticator).',
        gradingPoints: [
          { concept: 'HOTP uses counter and shared secret with HMAC', weight: 0.5, aliases: ['counter based OTP', 'RFC 4226'] },
          { concept: 'TOTP uses current timestamp divided into 30-second windows', weight: 0.5, aliases: ['time-based OTP', 'RFC 6238', 'authenticator apps'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Single Sign-On (SSO) and how SAML 2.0 and OpenID Connect (OIDC) implement federated identity.',
        options: [],
        correctAnswer: 'SSO allows a user to authenticate once and access multiple independent applications. SAML 2.0 uses XML-based assertions exchanged between an Identity Provider (IdP) and Service Provider (SP), widely used in enterprise legacy systems. OpenID Connect (OIDC) is a modern identity layer built on OAuth 2.0, using JSON Web Tokens (ID Tokens / JWT) exchanged via REST APIs, providing a lightweight, mobile-friendly identity verification protocol.',
        gradingPoints: [
          { concept: 'single authentication across multiple systems using Identity Provider', weight: 0.4, aliases: ['federated identity', 'centralized authentication'] },
          { concept: 'SAML uses XML assertions; OIDC uses JSON Web Tokens (JWT) on OAuth 2.0', weight: 0.6, aliases: ['SAML XML vs OIDC JWT', 'OAuth 2.0 identity layer'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Iris Recognition vs Retina Scanning in ocular biometrics.',
        options: [],
        correctAnswer: 'Iris recognition captures high-resolution near-infrared images of the colored muscular ring around the pupil, analyzing intricate trabecular meshwork patterns; it is non-intrusive, fast, and captures external patterns. Retina scanning illuminates the back of the eye through the pupil to map the unique pattern of blood vessels on the retina; it is highly accurate and nearly impossible to forge, but is invasive, requiring close proximity to an infrared laser, limiting user acceptance.',
        gradingPoints: [
          { concept: 'Iris recognition analyzes external iris patterns via near-infrared non-intrusively', weight: 0.5, aliases: ['iris pattern analysis', 'non-contact scanning'] },
          { concept: 'Retina scanning maps internal blood vessels at back of eye, highly accurate but invasive', weight: 0.5, aliases: ['retinal blood vessels', 'invasive ocular scan'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Biometric Template Protection: Cancelable Biometrics and Biometric Cryptosystems.',
        options: [],
        correctAnswer: 'Unlike passwords, compromised biometric traits cannot be reissued. Biometric template protection secures raw data: Cancelable Biometrics applies an intentional, repeatable non-invertible mathematical distortion to the biometric data before storage; if compromised, a new distortion transform is applied to create a new template. Biometric Cryptosystems (e.g., Fuzzy Vault, Fuzzy Commitment) securely bind or generate cryptographic keys with biometric data without storing the template itself.',
        gradingPoints: [
          { concept: 'biometrics cannot be changed once compromised requiring non-invertible protection', weight: 0.4, aliases: ['template revocation problem', 'privacy risks'] },
          { concept: 'cancelable biometrics applies distortion; cryptosystems bind keys via fuzzy vaults', weight: 0.6, aliases: ['non-invertible transform', 'fuzzy vault', 'fuzzy commitment'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Continuous Authentication using Behavioral Biometrics in zero-trust environments.',
        options: [],
        correctAnswer: 'Traditional authentication validates identity once at login. Continuous authentication monitors user behavior persistently throughout the entire active session using background behavioral biometrics: mouse movement dynamics, typing cadence, touchscreen pressure, and application usage patterns. If behavioral confidence scores drop below a threshold (suggesting a hijacked session), the system dynamically challenges the user with step-up multi-factor authentication.',
        gradingPoints: [
          { concept: 'monitors user identity throughout session rather than single login check', weight: 0.5, aliases: ['persistent session monitoring', 'zero trust authentication'] },
          { concept: 'uses mouse dynamics, typing cadence, and triggers step-up MFA upon anomaly', weight: 0.5, aliases: ['keystroke typing cadence', 'step-up challenge'] },
        ],
      },
    ],
  },

  // 6. CYB 399: SIWES Industrial Attachment
  {
    code: 'CYB 399',
    title: 'SIWES Industrial Attachment',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'State the primary objectives of the Students Industrial Work Experience Scheme (SIWES) in university Cyber Security education.',
        options: [],
        correctAnswer: 'The primary objectives of SIWES in Cyber Security are: 1. To bridge the gap between theoretical classroom knowledge and practical industrial security operations; 2. To expose students to live Security Operations Center (SOC) environments, enterprise firewalls, and incident response workflows; 3. To instill workplace discipline, confidentiality ethics, and professionalism; and 4. To prepare graduates for career roles in information assurance.',
        gradingPoints: [
          { concept: 'bridges theory and live enterprise security operations', weight: 0.5, aliases: ['classroom to industry SOC', 'hands-on security experience'] },
          { concept: 'exposes students to real-world incidents, ethics, and career readiness', weight: 0.5, aliases: ['professional ethics', 'SOC workflows', 'incident response'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the purpose and required documentation in a Cyber Security SIWES Logbook.',
        options: [],
        correctAnswer: 'The SIWES logbook serves as an official legal and academic record of daily technical activities during attachment. A cybersecurity intern records: daily security tasks executed (e.g., firewall rule configurations, vulnerability scan reviews, log analyses), tools utilized, weekly summaries of technical competencies gained, and supervisor verification stamps and signatures.',
        gradingPoints: [
          { concept: 'records daily technical security tasks, configurations, and tools', weight: 0.5, aliases: ['daily security logging', 'technical tasks record'] },
          { concept: 'weekly analytical summaries with supervisor verification signatures', weight: 0.5, aliases: ['supervisor sign-off', 'weekly competence reviews'] },
        ],
      },
      {
        type: 'theory',
        question: 'Outline the standard structure and chapters of a formal SIWES Technical Report in Cyber Security.',
        options: [],
        correctAnswer: 'A formal SIWES technical report consists of: Chapter 1: Introduction and Organizational Profile (company structure, IT/security organogram); Chapter 2: Security Infrastructure and Departmental Responsibilities; Chapter 3: Technical Tasks and Case Studies (penetration tests, SIEM monitoring, policy authoring); Chapter 4: Industrial Challenges and Remediations; Chapter 5: Summary, Conclusions, and Recommendations; followed by References and Appendices.',
        gradingPoints: [
          { concept: 'Introduction, Company Profile, and Security Architecture', weight: 0.4, aliases: ['company background', 'security infrastructure'] },
          { concept: 'Technical Tasks, Case Studies, Challenges, and Recommendations', weight: 0.6, aliases: ['case studies', 'penetration testing projects', 'recommendations'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss non-disclosure agreements (NDAs) and professional confidentiality ethics for cybersecurity interns handling sensitive enterprise data.',
        options: [],
        correctAnswer: 'Cybersecurity interns often have access to sensitive network topologies, vulnerability scan reports, customer data, and administrator passwords. Non-disclosure agreements (NDAs) legally bind interns not to disclose proprietary vulnerabilities or client records. Professional ethics demand that interns never extract sensitive data for personal use, never conduct unauthorized scanning, and report all discovered flaws immediately to internal supervisors.',
        gradingPoints: [
          { concept: 'legal obligation under NDA to protect proprietary data and vulnerabilities', weight: 0.5, aliases: ['non-disclosure compliance', 'confidentiality agreement'] },
          { concept: 'ethical duty to report flaws internally without unauthorized testing or exfiltration', weight: 0.5, aliases: ['responsible disclosure', 'no unauthorized testing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role and daily operations of a Security Operations Center (SOC) observed during industrial attachment.',
        options: [],
        correctAnswer: 'A Security Operations Center (SOC) monitors, detects, analyzes, and responds to cyber incidents around the clock. SOC Tier 1 analysts monitor SIEM alerts, triage anomalies, and filter out false positives. Tier 2 analysts conduct deep forensic investigations on escalated alerts. Tier 3 analysts perform proactive threat hunting and malware analysis. All work is coordinated through Incident Response Playbooks and ticketing systems.',
        gradingPoints: [
          { concept: '24/7 monitoring, detection, and analysis of security events', weight: 0.4, aliases: ['continuous monitoring', 'security monitoring center'] },
          { concept: 'tiered analyst hierarchy (triage, deep investigation, threat hunting) and playbooks', weight: 0.6, aliases: ['tier 1 2 3 analysts', 'incident playbooks', 'SIEM alerts'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Security Information and Event Management (SIEM) systems (e.g., Splunk, Wazuh) used in industry.',
        options: [],
        correctAnswer: 'A SIEM aggregates and normalizes log data from firewalls, servers, routers, endpoints, and databases in a centralized data store. It applies correlation rules to link disparate events across systems in real time (e.g., multiple failed logins followed by an outbound data transfer), triggering high-priority alerts and generating compliance audit reports.',
        gradingPoints: [
          { concept: 'aggregates and normalizes logs from heterogeneous enterprise sources', weight: 0.5, aliases: ['centralized log collection', 'event aggregation'] },
          { concept: 'correlation rules link events across systems to trigger security alerts', weight: 0.5, aliases: ['event correlation', 'real-time alert detection'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how Industrial Experience highlights the difference between compliance checklists and actual operational security.',
        options: [],
        correctAnswer: 'Compliance (e.g., ISO 27001, PCI-DSS) is a static checklist verifying that policies, backups, and encryption standards exist on paper. Actual operational security is a dynamic, continuous process of hardening systems against evolving threat actors: a company can be 100% compliant on paper yet remain completely vulnerable to novel phishing techniques, zero-day exploits, or unmonitored lateral movement.',
        gradingPoints: [
          { concept: 'compliance is a static check verifying policies and documentation exist', weight: 0.5, aliases: ['checkbox security', 'regulatory compliance audit'] },
          { concept: 'operational security is continuous defense against live threats and real exploit paths', weight: 0.5, aliases: ['threat-informed defense', 'real-world resilience'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Incident Response Life Cycle steps (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned).',
        options: [],
        correctAnswer: '1. Preparation (tools, team training, playbooks); 2. Identification (detecting and determining scope of breach); 3. Containment (isolating affected systems to prevent spread); 4. Eradication (removing malware, backdoors, and compromised credentials); 5. Recovery (restoring systems from clean backups and monitoring); 6. Lessons Learned (post-incident review to improve defenses).',
        gradingPoints: [
          { concept: 'Preparation, Identification, and Containment phases', weight: 0.5, aliases: ['initial breach handling', 'isolating compromised hosts'] },
          { concept: 'Eradication, Recovery, and Lessons Learned post-mortem', weight: 0.5, aliases: ['malware removal', 'system restore', 'post-incident review'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are the key evaluation criteria for the university SIWES oral defense in Cyber Security?',
        options: [],
        correctAnswer: 'Key evaluation criteria include: 1. Depth of cybersecurity projects executed during attachment; 2. Student clarity and practical command of security tools (Wireshark, Nmap, SIEM, Firewalls); 3. Quality and completeness of the written technical report and verified logbook; 4. Confidence and competence in answering examiner technical questions; and 5. Professionalism of presentation delivery.',
        gradingPoints: [
          { concept: 'depth of technical cybersecurity projects and tool proficiency', weight: 0.5, aliases: ['technical mastery', 'practical contribution'] },
          { concept: 'oral defense presentation quality, answering questions, and report adherence', weight: 0.5, aliases: ['answering panel questions', 'report rigor'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss how practical SIWES training assists in formulating a cybersecurity Final Year Project topic.',
        options: [],
        correctAnswer: 'SIWES exposes students to unresolved industry pain points (such as high false-positive rates in SIEMs, API security blind spots, or IoT firmware vulnerabilities). This allows students to formulate final year project problem statements based on authentic industry challenges rather than simulated textbook scenarios, ensuring high academic and commercial value.',
        gradingPoints: [
          { concept: 'identifies real unresolved industry problems and security gaps', weight: 0.5, aliases: ['practical problem identification', 'industry relevance'] },
          { concept: 'provides familiarity with enterprise architectures and modern tooling', weight: 0.5, aliases: ['enterprise tools', 'applied project formulation'] },
        ],
      },
    ],
  },
  // Shared courses
  { code: 'CSC 305', title: 'Database Management Systems', level: 300, semester: 'harmattan', questions: [] },
  { code: 'CSC 311', title: 'Operating Systems', level: 300, semester: 'harmattan', questions: [] },
  { code: 'CSC 306', title: 'Computer Networks & Communications', level: 300, semester: 'rain', questions: [] },
];
