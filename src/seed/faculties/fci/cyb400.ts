// src/seed/faculties/fci/cyb400.ts
import type { SeedCourse } from '../../types.js';

export const cyb400Courses: SeedCourse[] = [
  // 1. CYB 403: Digital Forensics
  {
    code: 'CYB 403',
    title: 'Digital Forensics',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the Chain of Custody in digital forensics and why it is essential for the legal admissibility of electronic evidence.',
        options: [],
        correctAnswer: 'The Chain of Custody is a meticulous, chronologically unbroken record documenting the collection, custody, transfer, analysis, and disposition of digital evidence. It records who gathered the evidence, exact timestamps, handling locations, and verification hashes (MD5/SHA-256). It is essential in court to prove that evidence was not tampered with, altered, or contaminated from the crime scene to the courtroom.',
        gradingPoints: [
          { concept: 'unbroken chronological record of evidence handling, transfer, and storage', weight: 0.5, aliases: ['evidence custody log', 'tracking document'] },
          { concept: 'ensures integrity and legal admissibility by proving evidence was unaltered', weight: 0.5, aliases: ['courtroom admissibility', 'evidence integrity verification'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Forensic Acquisition (Bit-Stream Imaging) vs standard file copying and the role of Hardware Write Blockers.',
        options: [],
        correctAnswer: 'A standard file copy copies only allocated files, changing metadata (access times) and missing deleted files. Forensic acquisition creates an exact bit-by-bit physical duplicate (bit-stream image e.g., raw dd, E01) of the entire drive including unallocated space, slack space, and swap files. A Hardware Write Blocker is physically connected between the evidence drive and forensic workstation to intercept and prevent any write commands from modifying the evidence drive.',
        gradingPoints: [
          { concept: 'bit-stream image captures physical bit-by-bit duplicate including unallocated space', weight: 0.5, aliases: ['raw physical image', 'unallocated and slack space'] },
          { concept: 'hardware write blocker intercepts write signals preventing drive modification', weight: 0.5, aliases: ['write blocking device', 'prevents evidence alteration'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Volatile Memory (RAM) Forensics and artifacts retrieved from memory dumps (e.g., using Volatility).',
        options: [],
        correctAnswer: 'RAM forensics analyzes volatile system memory captured from live machines before shutdown. Volatility can parse memory dumps to extract: active processes (including hidden/injected rootkit processes); open network sockets and active TCP connections; unencrypted passwords, encryption keys (BitLocker), and decrypted command-line histories; and loaded kernel modules and injected DLLs.',
        gradingPoints: [
          { concept: 'captures dynamic state from live machine before shutdown', weight: 0.4, aliases: ['live memory capture', 'volatile evidence'] },
          { concept: 'recovers active processes, network sockets, cleartext passwords, and encryption keys', weight: 0.6, aliases: ['injected processes', 'decrypted keys', 'open connections'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is File Carving in data recovery and how do file headers, footers, and magic numbers enable reconstruction?',
        options: [],
        correctAnswer: 'File Carving recovers files from unallocated disk space without relying on the file system directory tables (which may be formatted or corrupted). It scans raw disk clusters for known file signatures ("Magic Numbers" at headers, e.g., 0xFFD8 for JPEG, 0x89504E47 for PNG) and extracts contiguous data until it reaches the corresponding file footer/trailer or predefined maximum length.',
        gradingPoints: [
          { concept: 'recovers deleted files from unallocated space without filesystem metadata', weight: 0.5, aliases: ['metadata-independent recovery', 'raw cluster carving'] },
          { concept: 'identifies file magic numbers (headers and footers) to extract content', weight: 0.5, aliases: ['file signatures', 'header and trailer scanning'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Order of Volatility in digital evidence collection as defined by RFC 3227.',
        options: [],
        correctAnswer: 'RFC 3227 defines the order of collecting evidence from most volatile (perishable) to least volatile: 1. CPU registers and cache; 2. Routing tables, ARP cache, process tables, kernel statistics, and main RAM; 3. Temporary file systems; 4. Disk storage (hard drives, SSDs); 5. Remote logging and monitoring data; 6. Physical configuration and network topology; and 7. Archival media (tapes, backups).',
        gradingPoints: [
          { concept: 'collects most perishable volatile evidence before less volatile data', weight: 0.5, aliases: ['RFC 3227 volatility', 'preservation sequence'] },
          { concept: 'hierarchy from CPU cache/RAM down to hard drives and backup tapes', weight: 0.5, aliases: ['registers/RAM first', 'disk and tapes last'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Windows Registry Forensics and key registry hives investigated during incident response.',
        options: [],
        correctAnswer: 'The Windows Registry stores OS and user configuration data. Key forensic hives include: SYSTEM (hardware, USB connection artifacts in USBSTOR); SOFTWARE (installed software, autostart persistence in Run keys); SAM and SECURITY (local user accounts and password hashes); and NTUSER.DAT (user-specific activity: UserAssist tracking executed GUI apps, RecentDocs, and TypedURLs).',
        gradingPoints: [
          { concept: 'SYSTEM and SOFTWARE hives track USB devices and autostart persistence', weight: 0.5, aliases: ['USBSTOR', 'Run keys persistence'] },
          { concept: 'NTUSER.DAT tracks user-specific application execution (UserAssist) and recent files', weight: 0.5, aliases: ['UserAssist', 'TypedURLs', 'user activity hives'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Anti-Forensics techniques (Data Wiping, Timestamp Tampering, Steganography) and how forensicators counter them.',
        options: [],
        correctAnswer: 'Anti-forensics aims to destroy, obscure, or alter digital evidence: Data wiping overwrites sectors with zeros/random data (countered via wear-leveling artifacts and unallocated remnants); Timestamp tampering (Timestomping) alters NTFS $STANDARD_INFORMATION times (countered by comparing with $FILE_NAME attributes in MFT); Steganography hides data inside image pixels (countered by statistical steganalysis).',
        gradingPoints: [
          { concept: 'Timestomping countered by analyzing MFT $FILE_NAME timestamps', weight: 0.5, aliases: ['$STANDARD_INFORMATION vs $FILE_NAME', 'MFT analysis'] },
          { concept: 'Steganography and data wiping countered via steganalysis and unallocated analysis', weight: 0.5, aliases: ['statistical steganalysis', 'unallocated cluster analysis'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Network Forensics: packet capture (PCAP) analysis, flow records (NetFlow), and detecting beaconing activity.',
        options: [],
        correctAnswer: 'Network forensics captures and analyzes network traffic to reconstruct cyberattacks. Full packet capture (PCAP analyzed with Wireshark/Zeek) reconstructs transferred payloads, cleartext protocols, and credentials. NetFlow records IP flow metadata (source, destination, port, bytes, duration) over time. Beaconing detection analyzes traffic periodicity (regular callback intervals with jitter) indicating Command and Control (C2) communication.',
        gradingPoints: [
          { concept: 'PCAP full payload capture vs NetFlow metadata summary', weight: 0.5, aliases: ['packet analysis vs flow logs', 'Wireshark deep inspection'] },
          { concept: 'beaconing analysis detects periodic outbound C2 callbacks', weight: 0.5, aliases: ['C2 traffic identification', 'periodic network jitter'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Mobile Device Forensics: Logical Extraction vs File System Extraction vs Physical Extraction.',
        options: [],
        correctAnswer: 'Logical extraction captures active user data via standard backup APIs (calls, contacts, SMS), but misses deleted data. File system extraction accesses all accessible system files, app sandboxes, and databases (including SQLite databases with deleted records in write-ahead logs - WAL). Physical extraction dumps raw NAND flash memory bit-for-bit, bypassing OS locks to recover deleted files, unallocated clusters, and hidden data.',
        gradingPoints: [
          { concept: 'logical uses API backup; filesystem captures accessible OS/app files', weight: 0.5, aliases: ['logical extraction', 'app database extraction'] },
          { concept: 'physical extracts raw bit-by-bit flash memory recovering deleted clusters', weight: 0.5, aliases: ['raw NAND dump', 'unallocated space recovery'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Email Forensics: analyzing Internet Header Fields, SPF, DKIM, and DMARC verification.',
        options: [],
        correctAnswer: 'Email forensics inspects raw email headers to trace phishing origins. Headers reveal Originating IP, Received hops, and Message-ID. Sender Policy Framework (SPF) verifies if sending IP is authorized by the domain DNS. DomainKeys Identified Mail (DKIM) verifies an asymmetric digital signature on the body. DMARC instructs receivers on how to handle emails that fail SPF/DKIM (none, quarantine, reject).',
        gradingPoints: [
          { concept: 'Received header hops trace originating client IP addresses', weight: 0.4, aliases: ['email routing trace', 'originating IP headers'] },
          { concept: 'SPF IP authorization, DKIM cryptographic signatures, and DMARC enforcement policies', weight: 0.6, aliases: ['SPF DKIM DMARC authentication', 'email spoofing defense'] },
        ],
      },
    ],
  },

  // 2. CYB 405: Cyber Threat Intelligence
  {
    code: 'CYB 405',
    title: 'Cyber Threat Intelligence',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the Threat Intelligence Cycle phases: Direction, Collection, Processing, Analysis, Dissemination, and Feedback.',
        options: [],
        correctAnswer: '1. Direction: establishing intelligence requirements and priorities based on business risk; 2. Collection: gathering raw data from internal SIEM logs, OSINT, dark web, and ISACs; 3. Processing: parsing and standardizing raw data into usable formats; 4. Analysis: correlating events to identify threat actor trends and intentions; 5. Dissemination: delivering actionable reports to stakeholders; 6. Feedback: assessing report effectiveness to refine requirements.',
        gradingPoints: [
          { concept: 'Direction, Collection, and Processing of threat data', weight: 0.5, aliases: ['planning priorities', 'data gathering and formatting'] },
          { concept: 'Analysis, Dissemination to stakeholders, and iterative Feedback', weight: 0.5, aliases: ['threat correlation', 'actionable reporting', 'continuous refinement'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Strategic, Operational, Tactical, and Technical Threat Intelligence.',
        options: [],
        correctAnswer: 'Strategic CTI is high-level analysis tailored for executive leadership regarding geopolitical risks, cyber threats, and financial impact. Operational CTI details specific threat actor campaigns, motivations, capabilities, and timing for security managers. Tactical CTI focuses on threat actor Tactics, Techniques, and Procedures (TTPs) for defenders and SOC analysts. Technical CTI consists of specific atomic Indicators of Compromise (IoCs like IP addresses, hashes, domains) for automated ingestion into SIEMs/firewalls.',
        gradingPoints: [
          { concept: 'Strategic for executive business risk; Operational for actor campaigns', weight: 0.5, aliases: ['boardroom strategy', 'threat actor campaigns'] },
          { concept: 'Tactical for defender TTPs; Technical for atomic IoC feeds (IPs, hashes)', weight: 0.5, aliases: ['MITRE TTPs', 'atomic IoCs in SIEM'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Pyramid of Pain concept developed by David Bianco.',
        options: [],
        correctAnswer: 'The Pyramid of Pain illustrates how difficult it is for an adversary to adapt when defenders deny them specific operational indicators: Hash values (Trivial for attacker to change by modifying a single bit); IP addresses (Easy to proxy or lease); Domain names (Simple to register new domains/DGA); Network/Host artifacts (Annoying to recode tools); Tools (Challenging to rebuild specialized exploit kits); and Tactics, Techniques, and Procedures (TTPs - Tough/Painful, as changing fundamental operational behaviors requires retraining actors).',
        gradingPoints: [
          { concept: 'lower levels (hashes, IPs, domains) are trivial/easy for attackers to change', weight: 0.5, aliases: ['atomic indicators', 'trivial pain'] },
          { concept: 'top level (TTPs) imposes maximum pain forcing adversaries to invent new methods', weight: 0.5, aliases: ['TTPs toughest to change', 'disrupting adversary behavior'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the MITRE ATT&CK Framework and how it categorizes adversary Tactics and Techniques.',
        options: [],
        correctAnswer: 'MITRE ATT&CK is a globally accessible, structured knowledge base of real-world adversary behavior based on empirical observations. It organizes threats into a matrix of Tactics (the adversary tactical objective, e.g., Initial Access, Persistence, Privilege Escalation) and Techniques/Sub-techniques (the specific technical methods used to achieve that objective, e.g., Phishing: Spearphishing Attachment, Process Injection). Defenders use it to map threat intelligence, assess detection coverage, and design threat-hunting hypotheses.',
        gradingPoints: [
          { concept: 'structured matrix of adversary Tactics (goals) and Techniques (methods)', weight: 0.6, aliases: ['tactics and techniques matrix', 'real-world adversary TTPs'] },
          { concept: 'used by defenders to map detection gaps and guide threat hunting', weight: 0.4, aliases: ['gap analysis', 'threat hunting mapping'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Cyber Kill Chain model developed by Lockheed Martin.',
        options: [],
        correctAnswer: 'The Cyber Kill Chain models the linear sequence of phases an Advanced Persistent Threat (APT) must execute to achieve an objective: 1. Reconnaissance (harvesting target info); 2. Weaponization (coupling exploit with payload); 3. Delivery (transmitting payload via email/web); 4. Exploitation (executing exploit against vulnerability); 5. Installation (installing malware/backdoor on victim); 6. Command & Control (establishing remote channel); 7. Actions on Objectives (exfiltrating data or causing destruction). Breaking any single link halts the attack.',
        gradingPoints: [
          { concept: 'Reconnaissance, Weaponization, Delivery, Exploitation', weight: 0.5, aliases: ['initial intrusion steps', 'first four kill chain phases'] },
          { concept: 'Installation, Command & Control (C2), Actions on Objectives', weight: 0.5, aliases: ['persistence and execution', 'exfiltration and impact'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Diamond Model of Intrusion Analysis (Adversary, Capability, Infrastructure, Victim).',
        options: [],
        correctAnswer: 'The Diamond Model conceptualizes intrusion events across four interconnected core nodes: 1. Adversary (the malicious actor or organization); 2. Capability (the tools, malware, and exploits employed); 3. Infrastructure (the physical/logical communication channels, servers, and domains used); and 4. Victim (the target organization, person, or asset). Analysts pivot along vertices to uncover unknown nodes (e.g., observing a shared C2 infrastructure links multiple victims to a single adversary).',
        gradingPoints: [
          { concept: 'four core nodes: Adversary, Capability, Infrastructure, Victim', weight: 0.6, aliases: ['diamond model vertices', 'four intrusion elements'] },
          { concept: 'analysts pivot along connections to uncover linked actors or infrastructure', weight: 0.4, aliases: ['pivoting analysis', 'correlating campaign nodes'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Threat Intelligence Sharing standards: STIX (Structured Threat Information eXpression) and TAXII.',
        options: [],
        correctAnswer: 'STIX is a standardized JSON-based language used to represent and serialize cyber threat intelligence information (objects for Threat Actors, Indicators, Campaigns, Malware, Attack Patterns). TAXII (Trusted Automated eXchange of Intelligence Information) is the application-layer protocol and API specifications (over HTTPS) that transports STIX data between organizations, intelligence feeds, and automated defense tools (SOAR/SIEM).',
        gradingPoints: [
          { concept: 'STIX is standardized JSON format defining threat intelligence objects', weight: 0.5, aliases: ['STIX language', 'threat representation format'] },
          { concept: 'TAXII is the transport protocol over HTTPS distributing STIX feeds', weight: 0.5, aliases: ['TAXII transport API', 'automated threat exchange'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Threat Hunting and how do hypothesis-driven investigations differ from passive alert triaging?',
        options: [],
        correctAnswer: 'Passive alert triaging waits for automated security tools (SIEM/EDR) to trigger alerts based on known signatures or rules. Threat Hunting is a proactive, analyst-led iterative search through enterprise networks and endpoints to detect stealthy, persistent threats that have evaded existing security controls. Hypothesis-driven hunting begins with a formulated idea (based on new CTI TTPs or threat actor reports) and analyzes telemetry to confirm or refute adversary presence.',
        gradingPoints: [
          { concept: 'proactive analyst-led search for threats that bypassed automated controls', weight: 0.5, aliases: ['proactive threat discovery', 'assumed breach search'] },
          { concept: 'hypothesis-driven testing based on CTI reports versus reactive alert responding', weight: 0.5, aliases: ['hypothesis testing', 'reactive vs proactive'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Open-Source Intelligence (OSINT) gathering tools and methodologies used in threat intelligence.',
        options: [],
        correctAnswer: 'OSINT collects publicly available information across the clear web, deep web, and public registries. Methodologies include: domain/IP WHOIS lookups; DNS passive historical tracking (SecurityTrails); scanning public code repositories for leaked API secrets (GitGuardian); certificate transparency log analysis (crt.sh); search engine dorking (Google Dorking); and automated intelligence aggregation platforms (Maltego, Shodan).',
        gradingPoints: [
          { concept: 'collects publicly accessible intelligence from registries, web, and search engines', weight: 0.5, aliases: ['public intelligence gathering', 'passive reconnaissance'] },
          { concept: 'uses Shodan, WHOIS, certificate transparency, and code repository scanning', weight: 0.5, aliases: ['OSINT tools', 'Shodan and Maltego', 'crt.sh'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Traffic Light Protocol (TLP) used in threat intelligence dissemination.',
        options: [],
        correctAnswer: 'TLP standardizes information-sharing boundaries: TLP:RED (Strictly confidential, restricted to participants in the specific meeting/exchange only); TLP:AMBER+STRICT (Restricted strictly to the recipient organization); TLP:AMBER (Restricted to recipient organization and its clients who require knowledge); TLP:GREEN (Can be shared within community/industry peers); TLP:CLEAR (Publicly shareable without restriction).',
        gradingPoints: [
          { concept: 'standardized classification labeling for sensitive intelligence sharing', weight: 0.4, aliases: ['information sharing protocol', 'TLP standard'] },
          { concept: 'TLP:RED (participants only), AMBER (organization only), GREEN (community), CLEAR (public)', weight: 0.6, aliases: ['four TLP levels', 'TLP definitions'] },
        ],
      },
    ],
  },

  // 3. CYB 411: Cloud Security
  {
    code: 'CYB 411',
    title: 'Cloud Security',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the Shared Responsibility Model across IaaS, PaaS, and SaaS cloud service architectures.',
        options: [],
        correctAnswer: 'The Shared Responsibility Model delineates security duties between Cloud Service Provider (CSP) and customer. In IaaS (e.g., AWS EC2), CSP secures physical infrastructure, hypervisors, and datacenter; customer is responsible for guest OS, networking configuration, patching, and data. In PaaS (e.g., Heroku), CSP also manages OS and runtime; customer secures application code, configuration, and data. In SaaS (e.g., Microsoft 365), CSP manages everything except customer data, user access identities, and device access.',
        gradingPoints: [
          { concept: 'IaaS customer manages guest OS, patches, network rules, and data', weight: 0.4, aliases: ['IaaS responsibility split', 'guest OS management'] },
          { concept: 'PaaS customer manages application and data; SaaS customer manages identity and data', weight: 0.6, aliases: ['PaaS application level', 'SaaS identity and data ownership'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cloud Identity and Access Management (IAM) best practices: Least Privilege, Role-Based Access, and Service Accounts.',
        options: [],
        correctAnswer: 'Cloud IAM governs authentication and authorization. Best practices include: enforcing Least Privilege by granting fine-grained resource permissions instead of wildcard ("*") policies; avoiding root account usage for daily operations; using short-lived temporary credentials (IAM Roles / STS) instead of long-lived access keys; utilizing dedicated service accounts (service principals) for automated workloads; and enforcing MFA on all administrative users.',
        gradingPoints: [
          { concept: 'least privilege using fine-grained policies avoiding wildcards', weight: 0.5, aliases: ['fine-grained IAM policies', 'avoiding admin access'] },
          { concept: 'short-lived IAM roles and service accounts instead of static access keys', weight: 0.5, aliases: ['temporary STS credentials', 'service principals'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Virtual Private Clouds (VPC): Subnets, Security Groups, and Network Access Control Lists (NACLs).',
        options: [],
        correctAnswer: 'A VPC is an isolated virtual network in the cloud. Public subnets route directly to an Internet Gateway; private subnets route outbound via NAT Gateways. Security Groups act as stateful virtual firewalls applied at the instance network interface level (evaluating allow rules, automatically permitting return traffic). NACLs act as stateless subnet-level boundaries evaluating numbered allow/deny rules in order for both inbound and outbound traffic.',
        gradingPoints: [
          { concept: 'Security Groups are stateful firewalls at the instance ENI level', weight: 0.5, aliases: ['stateful instance firewalls', 'security group allow rules'] },
          { concept: 'NACLs are stateless subnets firewalls evaluating ordered allow/deny rules', weight: 0.5, aliases: ['stateless subnet boundaries', 'NACL rules'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cloud Storage security risks (e.g., Public S3 Buckets) and enforcement controls.',
        options: [],
        correctAnswer: 'Misconfigured public storage buckets expose confidential enterprise databases and backups to the open internet. Controls include: enforcing cloud-wide "Block Public Access" policies; configuring Bucket Policies that deny unencrypted HTTP requests; enabling server-side encryption with KMS customer-managed keys (SSE-KMS); enabling versioning and Object Lock (WORM) against ransomware; and monitoring access via CloudTrail and GuardDuty.',
        gradingPoints: [
          { concept: 'misconfiguration risk exposing sensitive data publicly to the internet', weight: 0.4, aliases: ['public bucket leak', 'unauthenticated exposure'] },
          { concept: 'enforce Block Public Access, bucket policies, SSE-KMS, and Object Lock', weight: 0.6, aliases: ['block public access setting', 'KMS encryption', 'object locking'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Cloud Security Posture Management (CSPM) vs Cloud Workload Protection Platforms (CWPP).',
        options: [],
        correctAnswer: 'CSPM continuously monitors cloud control plane configurations, evaluating resources against compliance frameworks (CIS Benchmarks, HIPAA) and flagging misconfigurations (open security groups, unencrypted storage, excessive IAM permissions). CWPP focuses on runtime protection of compute workloads (VMs, containers, serverless functions), providing endpoint detection, vulnerability management, and behavioral anomaly detection inside the running workload.',
        gradingPoints: [
          { concept: 'CSPM monitors control plane configuration against compliance and misconfiguration', weight: 0.5, aliases: ['configuration audit', 'CIS benchmark compliance'] },
          { concept: 'CWPP protects runtime workloads (VMs, containers) with endpoint and memory defense', weight: 0.5, aliases: ['runtime workload defense', 'container runtime security'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Serverless Security (e.g., AWS Lambda, Cloud Functions) and unique attack vectors.',
        options: [],
        correctAnswer: 'Serverless abstracts underlying servers, eliminating OS patching concerns for customers. However, attack vectors include: Event Injection (untrusted payloads in S3 uploads, SQS messages, or DynamoDB streams triggering vulnerable functions); excessive function IAM permissions; vulnerable third-party dependencies packaged in function layers; and denial-of-wallet attacks that overwhelm concurrent execution limits.',
        gradingPoints: [
          { concept: 'event injection via untrusted message queues and storage triggers', weight: 0.5, aliases: ['event data injection', 'serverless injection attacks'] },
          { concept: 'overprivileged function IAM roles and vulnerable dependencies', weight: 0.5, aliases: ['function least privilege', 'dependency vulnerabilities'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Cloud Key Management Services (KMS) and Hardware Security Modules (Cloud HSM).',
        options: [],
        correctAnswer: 'Cloud KMS provides centralized cryptographic key generation, rotation, and access control policies for encrypting cloud data. Cloud HSM provides dedicated, single-tenant FIPS 140-2 Level 3 validated physical cryptographic hardware devices in the cloud; private keys never leave the hardware boundary in plaintext, meeting stringent financial and regulatory compliance requirements.',
        gradingPoints: [
          { concept: 'Cloud KMS manages centralized key lifecycle and automated rotation', weight: 0.5, aliases: ['key management service', 'envelope encryption'] },
          { concept: 'Cloud HSM provides dedicated single-tenant FIPS 140-2 Level 3 hardware security', weight: 0.5, aliases: ['dedicated hardware module', 'FIPS compliance'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cloud Auditing and Logging using AWS CloudTrail, CloudWatch, and VPC Flow Logs.',
        options: [],
        correctAnswer: 'AWS CloudTrail logs every management and data API call executed in the cloud account (recording who, what, when, and source IP). CloudWatch collects metrics and application log streams, triggering alarms on anomalous behavior. VPC Flow Logs capture metadata of IP traffic entering and leaving network interfaces, enabling forensic detection of unauthorized external connections and data exfiltration.',
        gradingPoints: [
          { concept: 'CloudTrail records immutable API call history across the account', weight: 0.4, aliases: ['API call audit trail', 'account activity tracking'] },
          { concept: 'CloudWatch metrics and VPC Flow Logs network metadata capture', weight: 0.6, aliases: ['VPC flow logs', 'network traffic inspection', 'alarms'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Zero Trust Architecture (ZTA) in cloud environments and the principle of "Never Trust, Always Verify".',
        options: [],
        correctAnswer: 'Traditional perimeter security trusts everything inside the corporate network. Zero Trust Architecture assumes the network is hostile and internal breach is inevitable. It enforces "Never Trust, Always Verify" through: explicit continuous verification of identity, device health, and context; microsegmentation restricting lateral movement; and just-in-time, least-privilege access to resources.',
        gradingPoints: [
          { concept: 'assumes hostile network and inevitable breach discarding perimeter trust', weight: 0.5, aliases: ['never trust always verify', 'assumed breach mindset'] },
          { concept: 'continuous identity verification, microsegmentation, and context-based authorization', weight: 0.5, aliases: ['microsegmentation', 'continuous verification'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Container Security in Kubernetes: Pod Security Standards, Network Policies, and Image Scanning.',
        options: [],
        correctAnswer: 'Kubernetes container security requires: Container image vulnerability scanning (in CI/CD pipelines) to reject images with known CVEs; Pod Security Standards (enforcing "Restricted" baseline, disallowing root containers and host network mounts); Kubernetes Network Policies acting as firewalls between microservices; and RBAC restricting access to the Kubernetes API server.',
        gradingPoints: [
          { concept: 'automated container image scanning for vulnerabilities before deployment', weight: 0.4, aliases: ['image vulnerability scanning', 'CI/CD security gate'] },
          { concept: 'Pod Security Standards (disallowing root) and Network Policies restricting pod traffic', weight: 0.6, aliases: ['non-root containers', 'k8s network policies', 'pod security'] },
        ],
      },
    ],
  },

  // 4. CYB 415: Ethical Hacking
  {
    code: 'CYB 415',
    title: 'Ethical Hacking',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Compare Ethical Hacking with Malicious Hacking across authorization, intent, and disclosure.',
        options: [],
        correctAnswer: 'Ethical hacking (white hat) is conducted with prior written legal authorization, non-destructive intent to improve defenses, and adheres to responsible disclosure guidelines, keeping discovered vulnerabilities confidential until patched. Malicious hacking (black hat) operates without authorization, with criminal intent (financial extortion, data theft, sabotage), and exploits or sells vulnerabilities on dark web forums.',
        gradingPoints: [
          { concept: 'ethical hacking requires explicit written authorization and legal contracts', weight: 0.5, aliases: ['prior authorization', 'legal scope'] },
          { concept: 'intent to improve security with responsible disclosure versus malicious exploitation', weight: 0.5, aliases: ['responsible disclosure', 'constructive intent'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Buffer Overflow exploitation: Stack structure, EIP / RIP overwrite, and Shellcode execution.',
        options: [],
        correctAnswer: 'In x86/x64 architecture, the stack grows toward lower memory and stores local variables, saved base pointer (EBP), and saved instruction pointer (EIP). By supplying input exceeding buffer capacity, an attacker overwrites EIP with the address of injected malicious shellcode (or a JMP ESP instruction), redirecting CPU execution to execute unauthorized arbitrary instructions.',
        gradingPoints: [
          { concept: 'stack layout containing buffers, saved base pointer, and return address (EIP)', weight: 0.5, aliases: ['stack frame', 'saved return address'] },
          { concept: 'overwriting EIP redirects execution to injected shellcode or payload', weight: 0.5, aliases: ['instruction pointer hijack', 'shellcode execution'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Return-Oriented Programming (ROP) and how ROP Chains bypass Data Execution Prevention (DEP).',
        options: [],
        correctAnswer: 'DEP prevents executing code on the stack. Return-Oriented Programming (ROP) bypasses DEP by executing existing legitimate machine instructions already present in executable memory (e.g., libc). The attacker chains together small instruction sequences ending in a RET instruction (called "gadgets"). By arranging gadget addresses on the stack, the attacker executes arbitrary logic or invokes mprotect()/VirtualProtect() to disable DEP.',
        gradingPoints: [
          { concept: 'bypasses DEP by reusing existing legitimate instructions ending in RET (gadgets)', weight: 0.6, aliases: ['ROP gadgets', 'code reuse attack'] },
          { concept: 'chains gadgets on stack to call system functions disabling DEP', weight: 0.4, aliases: ['ROP chain execution', 'calling VirtualProtect'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Cross-Site Request Forgery (CSRF) and how SameSite Cookies and Anti-CSRF Tokens prevent it.',
        options: [],
        correctAnswer: 'CSRF tricks an authenticated user browser into executing unwanted actions on a trusted web application where the user is currently logged in (e.g., transferring funds via an embedded malicious image link). Anti-CSRF tokens mitigate this by requiring a secret, cryptographically unique token in state-changing POST requests that third-party sites cannot read. SameSite cookie attributes (SameSite=Strict/Lax) prevent browsers from sending session cookies with cross-site requests.',
        gradingPoints: [
          { concept: 'tricks victim authenticated browser into sending unauthorized requests', weight: 0.5, aliases: ['confused deputy', 'session riding'] },
          { concept: 'mitigated via unique Anti-CSRF tokens and SameSite cookie attributes', weight: 0.5, aliases: ['CSRF tokens', 'SameSite=Strict cookies'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Server-Side Request Forgery (SSRF) and its exploitation against Cloud Metadata Services.',
        options: [],
        correctAnswer: 'SSRF occurs when an attacker induces a backend web server to make HTTP requests to an unintended arbitrary destination. In cloud environments (AWS, GCP), attackers exploit SSRF to query internal metadata services (e.g., http://169.254.169.254/latest/meta-data/), extracting temporary IAM credentials, cloud secrets, and accessing internal microservices unreachable from the outside internet.',
        gradingPoints: [
          { concept: 'forces backend server to initiate unauthorized internal network requests', weight: 0.5, aliases: ['backend request forgery', 'internal network abuse'] },
          { concept: 'exploits cloud metadata (169.254.169.254) extracting IAM credentials', weight: 0.5, aliases: ['cloud metadata extraction', 'stealing IAM keys'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Password Cracking methodologies: Dictionary Attacks, Rainbow Tables, and GPU-accelerated Brute Force.',
        options: [],
        correctAnswer: 'Dictionary attacks hash words from precompiled wordlists (e.g., RockYou) to match target hashes. Rainbow Tables use precomputed time-memory trade-off tables of hash chains to look up cleartext passwords rapidly, neutralized completely by unique cryptographic salts. GPU-accelerated brute force tools (Hashcat) compute billions of hash attempts per second across massive parallel cores, demanding slow, memory-hard hashing algorithms like bcrypt and Argon2.',
        gradingPoints: [
          { concept: 'dictionary tests common wordlists; rainbow tables use precomputed hash chains', weight: 0.5, aliases: ['wordlist attack', 'precomputed rainbow tables'] },
          { concept: 'salting neutralizes rainbow tables; GPU brute-force requires memory-hard hashes (Argon2)', weight: 0.5, aliases: ['cryptographic salting', 'memory-hard algorithms'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe ARP Spoofing / Poisoning and how it facilitates Man-in-the-Middle (MitM) traffic interception on local networks.',
        options: [],
        correctAnswer: 'On an Ethernet LAN, ARP maps IP addresses to MAC addresses statelessly without authentication. An attacker sends unsolicited, forged gratuitous ARP replies associating the gateway IP with the attacker MAC address, poisoning the target host ARP cache. The target sends all outbound packets to the attacker, allowing traffic sniffing, credential harvesting, or tampering before forwarding traffic to the legitimate gateway.',
        gradingPoints: [
          { concept: 'sends forged gratuitous ARP replies poisoning target host cache', weight: 0.5, aliases: ['ARP cache manipulation', 'unsolicited ARP packets'] },
          { concept: 'diverts traffic through attacker enabling interception and credential theft', weight: 0.5, aliases: ['man-in-the-middle sniffing', 'traffic tampering'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Social Engineering attack techniques: Spear Phishing, Vishing, Smishing, and Waterholing.',
        options: [],
        correctAnswer: 'Spear Phishing targets specific high-value individuals with tailored, researched emails containing malicious attachments or links. Vishing (Voice Phishing) uses phone calls posing as bank fraud departments to extract credentials. Smishing uses SMS texts with urgent links. Waterholing compromises legitimate websites frequently visited by a target organization to serve drive-by malware to its employees.',
        gradingPoints: [
          { concept: 'Spear phishing uses tailored researched targets; Vishing uses phone calls', weight: 0.5, aliases: ['targeted email fraud', 'voice phishing'] },
          { concept: 'Smishing uses SMS text; Waterholing compromises commonly visited industry sites', weight: 0.5, aliases: ['SMS phishing', 'waterhole drive-by attack'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Metasploit Framework architecture: Exploit Modules, Payloads (Singles, Stagers, Meterpreter), and Encoders.',
        options: [],
        correctAnswer: 'Metasploit provides modular penetration testing capabilities. Exploit modules deliver and trigger vulnerabilities on targets. Payloads execute upon successful exploit: Singles are self-contained; Stagers set up an initial network connection to download larger payloads; Meterpreter is an advanced, in-memory, dynamically extensible payload that executes reflectively in RAM without touching disk. Encoders obfuscate shellcode to avoid bad characters and basic signature detection.',
        gradingPoints: [
          { concept: 'Exploits deliver vulnerabilities; Stagers download full payloads', weight: 0.5, aliases: ['exploit module delivery', 'staged payloads'] },
          { concept: 'Meterpreter operates entirely in-memory reflectively; Encoders bypass bad characters', weight: 0.5, aliases: ['in-memory Meterpreter', 'bad character evasion'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Bug Bounty programs and Responsible Vulnerability Disclosure vs Zero-Day Brokerage.',
        options: [],
        correctAnswer: 'Bug bounty programs (e.g., HackerOne) invite external ethical researchers to discover and report security vulnerabilities in exchange for monetary rewards and recognition. Responsible disclosure coordinates with the vendor, giving them a reasonable remediation window (typically 90 days) before public disclosure. Zero-day brokerage sells unpatched vulnerabilities to third parties or governments without vendor notification, raising serious ethical and security concerns.',
        gradingPoints: [
          { concept: 'Bug bounties incentivize ethical discovery with coordinated vendor remediation', weight: 0.5, aliases: ['coordinated vulnerability disclosure', 'bug bounty rewards'] },
          { concept: 'Responsible disclosure gives 90-day fix window versus selling zero-days to brokers', weight: 0.5, aliases: ['remediation window', 'zero-day market ethics'] },
        ],
      },
    ],
  },

  // 5. CYB 402: Wireless & Mobile Security
  {
    code: 'CYB 402',
    title: 'Wireless & Mobile Security',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain Rogue Access Points and Evil Twin attacks in wireless networks and their countermeasures.',
        options: [],
        correctAnswer: 'A Rogue AP is an unauthorized wireless access point connected to an enterprise network. An Evil Twin is an attacker-controlled rogue AP configured with identical SSID and MAC address to a legitimate network; the attacker jams legitimate APs with deauthentication frames, forcing clients to connect to the Evil Twin for credential harvesting. Countermeasures include Wireless Intrusion Prevention Systems (WIPS), 802.1X certificate authentication, and disabling auto-connect.',
        gradingPoints: [
          { concept: 'Evil twin clones SSID/MAC and forces connection via deauth frames', weight: 0.5, aliases: ['cloned AP', 'deauthentication attack'] },
          { concept: 'countermeasures via WIPS, 802.1X certificate authentication, and 802.11w PMF', weight: 0.5, aliases: ['WIPS detection', 'protected management frames'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Android Application Sandboxing and the permission model (Runtime Permissions).',
        options: [],
        correctAnswer: 'Android assigns each installed application a unique Linux User ID (UID), running it in an isolated process. By default, applications cannot access other apps data or hardware resources. The permission model requires apps to declare permissions in AndroidManifest.xml. Dangerous permissions (camera, location, contacts) require explicit runtime user consent, allowing users to grant or revoke permissions dynamically.',
        gradingPoints: [
          { concept: 'assigns unique Linux UID running apps in isolated sandboxed processes', weight: 0.5, aliases: ['UID process isolation', 'android sandbox'] },
          { concept: 'runtime permission model requires explicit user consent for dangerous access', weight: 0.5, aliases: ['runtime permissions', 'manifest declarations'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain iOS Security Architecture: Secure Enclave, Code Signing, and Data Protection API.',
        options: [],
        correctAnswer: 'iOS security uses hardware-enforced trust: The Secure Enclave is a dedicated coprocessor that manages biometric data (Face ID/Touch ID) and cryptographic keys isolated from the main application processor. Mandatory Code Signing ensures only binaries digitally signed by Apple or authorized developers execute. The Data Protection API encrypts individual app files using hardware-derived keys tied to user passcodes.',
        gradingPoints: [
          { concept: 'Secure Enclave coprocessor handles biometrics and keys isolated from CPU', weight: 0.5, aliases: ['secure enclave isolation', 'hardware key vault'] },
          { concept: 'Mandatory code signing and Data Protection API encrypting files with passcode keys', weight: 0.5, aliases: ['cryptographic code signing', 'passcode-derived encryption'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Mobile Device Management (MDM) and Mobile Application Management (MAM) in enterprise BYOD policies.',
        options: [],
        correctAnswer: 'MDM manages and secures entire mobile devices remotely (enforcing lock screens, encryption, remote wiping stolen devices, restricting jailbroken devices). MAM focuses strictly on enterprise applications and corporate data (containerizing corporate apps, preventing copy-pasting corporate data into personal apps) without controlling personal photos and messages, balancing security with user privacy in BYOD environments.',
        gradingPoints: [
          { concept: 'MDM controls entire device configuration, encryption, and remote wipe', weight: 0.5, aliases: ['device-level enforcement', 'remote device wipe'] },
          { concept: 'MAM containerizes enterprise applications and data preserving user privacy', weight: 0.5, aliases: ['application containerization', 'BYOD data separation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Bluetooth security vulnerabilities: Bluesnarfing, Bluejacking, and BLE Relay attacks.',
        options: [],
        correctAnswer: 'Bluejacking sends unsolicited messages to nearby Bluetooth devices (annoying but harmless). Bluesnarfing exploits Bluetooth flaws to access calendar, contacts, and emails without pairing notification. Bluetooth Low Energy (BLE) Relay attacks intercept and relay authentication signals between key fobs and smart vehicles/locks over long distances, unlocking systems without physical proximity.',
        gradingPoints: [
          { concept: 'Bluejacking sends unwanted messages; Bluesnarfing unauthorizedly steals device data', weight: 0.5, aliases: ['bluejacking vs bluesnarfing', 'unauthorized Bluetooth access'] },
          { concept: 'BLE relay attacks forward key fob signals enabling proximity bypass', weight: 0.5, aliases: ['relay attack', 'proximity spoofing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Jailbreaking (iOS) and Rooting (Android) and their security implications.',
        options: [],
        correctAnswer: 'Jailbreaking/Rooting exploits OS vulnerabilities to bypass manufacturer restrictions and gain root/superuser access. Security implications include: stripping application sandboxing protections; disabling code signing enforcement; exposing root privileges to malware; preventing OS security patches; and violating enterprise security policies, triggering automated wipe by MDM systems.',
        gradingPoints: [
          { concept: 'gaining root privileges by circumventing OS security controls', weight: 0.5, aliases: ['superuser access', 'bypassing manufacturer locks'] },
          { concept: 'destroys application sandboxing and exposes system to untrusted malware', weight: 0.5, aliases: ['sandbox elimination', 'malware vulnerability'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Cellular Network security vulnerabilities: IMSI Catchers (Stingrays) and SS7 protocol flaws.',
        options: [],
        correctAnswer: 'IMSI Catchers (Stingrays) spoof legitimate cellular base stations (towers), exploiting 2G/3G lack of mutual authentication to force mobile phones to connect, track physical locations, and eavesdrop on calls/SMS. SS7 (Signaling System No. 7) telecommunications flaws allow remote attackers to track user locations, intercept 2FA SMS verification codes, and redirect telephone calls globally without touching handsets.',
        gradingPoints: [
          { concept: 'IMSI Catchers spoof cell towers exploiting missing mutual authentication', weight: 0.5, aliases: ['fake cell towers', 'Stingray surveillance'] },
          { concept: 'SS7 flaws enable global location tracking and SMS 2FA interception', weight: 0.5, aliases: ['telecom SS7 exploitation', 'SMS interception'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Insecure Data Storage on mobile devices: Shared Preferences, SQLite databases, and Keychain/Keystore.',
        options: [],
        correctAnswer: 'Storing sensitive tokens in plaintext SharedPreferences (Android) or NSUserDefaults (iOS) exposes them to rooted devices and backup extraction. Developers must store sensitive keys and tokens inside Android Keystore (backed by hardware TEE) or iOS Keychain (backed by Secure Enclave), which encrypt credentials using hardware-backed cryptographic keys.',
        gradingPoints: [
          { concept: 'plaintext storage in SharedPreferences/NSUserDefaults exposes data to root exploits', weight: 0.5, aliases: ['insecure local storage', 'unencrypted app data'] },
          { concept: 'use hardware-backed Android Keystore or iOS Keychain for token encryption', weight: 0.5, aliases: ['hardware keystore', 'keychain storage'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Reverse Engineering of mobile apps: APK Decompilation, Obfuscation, and Tamper Detection.',
        options: [],
        correctAnswer: 'Android APKs can be easily decompiled into readable Java/Kotlin source code using tools like JADX and apktool. Obfuscation (e.g., ProGuard/R8) renames classes, methods, and variables to meaningless characters and flattens control flow, frustrating reverse engineering. Anti-tamper techniques check application digital signatures and integrity at runtime, shutting down if modified.',
        gradingPoints: [
          { concept: 'APK decompilation extracts readable source using tools like JADX', weight: 0.4, aliases: ['bytecode decompilation', 'apktool'] },
          { concept: 'Obfuscation renames identifiers and anti-tamper verifies signature integrity', weight: 0.6, aliases: ['code obfuscation ProGuard', 'tamper detection'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe SSL/TLS Certificate Pinning in mobile applications and how Frida bypasses it.',
        options: [],
        correctAnswer: 'Certificate Pinning hardcodes the server specific public key or certificate inside the mobile app binary, rejecting even trusted OS root CA certificates to defeat proxy interception (Burp Suite). Attackers and reverse engineers use dynamic instrumentation frameworks like Frida to hook certificate validation methods in runtime memory, forcing validation functions to return "True" and bypassing pinning.',
        gradingPoints: [
          { concept: 'hardcodes server certificate inside app rejecting rogue CA proxy certificates', weight: 0.5, aliases: ['SSL pinning', 'defeats proxy interception'] },
          { concept: 'Frida dynamic instrumentation hooks verification methods in memory bypassing pinning', weight: 0.5, aliases: ['Frida script bypass', 'runtime hook'] },
        ],
      },
    ],
  },

  // 6. CYB 404: Cyber Risk Assessment & Incident Response
  {
    code: 'CYB 404',
    title: 'Cyber Risk Assessment & Incident Response',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain Cyber Risk Assessment formulas: Risk = Threat x Vulnerability x Impact (and Likelihood x Impact).',
        options: [],
        correctAnswer: 'Cyber Risk quantifies the potential loss from an adverse event: Risk = Threat (the actor/event) x Vulnerability (the exploitable flaw) x Impact (business consequences: financial, reputational, legal). In practical risk matrices, Risk = Likelihood (probability of occurrence) x Impact. If any factor is zero (e.g., vulnerability is fully patched), the risk is zero.',
        gradingPoints: [
          { concept: 'Risk = Threat x Vulnerability x Impact and Likelihood x Impact', weight: 0.5, aliases: ['risk equation', 'risk matrix components'] },
          { concept: 'quantifies expected business loss and guides resource allocation', weight: 0.5, aliases: ['business consequence', 'resource prioritization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Qualitative Risk Assessment and Quantitative Risk Assessment (SLE, ARO, ALE).',
        options: [],
        correctAnswer: 'Qualitative risk assessment uses descriptive scales (High, Medium, Low) and subjective scoring based on stakeholder consensus; it is fast and easy to understand. Quantitative risk assessment calculates exact monetary figures: Single Loss Expectancy (SLE = Asset Value x Exposure Factor); Annualized Rate of Occurrence (ARO = estimated frequency per year); and Annualized Loss Expectancy (ALE = SLE x ARO), allowing formal cost-benefit analysis of security controls.',
        gradingPoints: [
          { concept: 'Qualitative uses subjective categories (High, Med, Low)', weight: 0.4, aliases: ['descriptive risk ranking', 'subjective scoring'] },
          { concept: 'Quantitative calculates SLE (AV x EF) and ALE (SLE x ARO) in monetary terms', weight: 0.6, aliases: ['ALE formula', 'monetary risk calculation', 'SLE and ARO'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the four Risk Treatment Strategies: Mitigation, Acceptance, Transfer, and Avoidance.',
        options: [],
        correctAnswer: '1. Risk Mitigation: implementing security controls (firewalls, training, encryption) to reduce likelihood or impact; 2. Risk Acceptance: acknowledging the risk without controls because mitigation cost exceeds potential loss; 3. Risk Transfer: shifting financial impact to a third party (e.g., cyber insurance, outsourcing); 4. Risk Avoidance: eliminating the risk entirely by discontinuing the risky business activity or technology.',
        gradingPoints: [
          { concept: 'Mitigation implements controls; Acceptance tolerates residual risk', weight: 0.5, aliases: ['risk reduction', 'accepting risk'] },
          { concept: 'Transfer shifts risk via insurance; Avoidance eliminates the risky activity', weight: 0.5, aliases: ['cyber insurance transfer', 'discontinuing activity'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe NIST Cybersecurity Framework (CSF 2.0) core functions: Govern, Identify, Protect, Detect, Respond, Recover.',
        options: [],
        correctAnswer: 'NIST CSF organizes cybersecurity management: Govern (establishing organizational strategy and policy); Identify (understanding assets, risks, and supply chains); Protect (implementing safeguards like access control, training, data security); Detect (monitoring to identify cyber events timely); Respond (taking action upon detected incident); and Recover (restoring services and improving resilience).',
        gradingPoints: [
          { concept: 'Govern, Identify, and Protect functions', weight: 0.5, aliases: ['policy and risk identification', 'safeguard implementation'] },
          { concept: 'Detect, Respond, and Recover functions', weight: 0.5, aliases: ['monitoring detection', 'incident containment and recovery'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the composition and roles within a Computer Security Incident Response Team (CSIRT).',
        options: [],
        correctAnswer: 'A CSIRT manages and responds to enterprise cyber incidents. Roles include: Incident Commander (leads team, coordinates actions, makes critical operational decisions); Lead Investigator (technical forensics and telemetry analysis); Legal Counsel (ensures regulatory and legal compliance); Communications/PR Liaison (manages external public and customer notifications); and IT Operations/Network Engineers (implements containment and recovery changes).',
        gradingPoints: [
          { concept: 'Incident Commander coordinates team and executive decision making', weight: 0.4, aliases: ['incident leadership', 'CSIRT lead'] },
          { concept: 'Technical investigators, legal counsel, PR liaison, and IT engineers', weight: 0.6, aliases: ['forensic analysts', 'legal and communications support'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Containment Strategies during a live Ransomware incident: Short-term vs Long-term containment.',
        options: [],
        correctAnswer: 'Short-term containment immediately isolates infected endpoints from the network (disconnecting network cables, disabling Wi-Fi, isolating via EDR) to stop lateral movement and encryption of shared file servers. Long-term containment involves rebuilding clean network segments, resetting all administrative and service account credentials, blocking malicious C2 domains at firewalls, and applying security patches before reconnecting systems.',
        gradingPoints: [
          { concept: 'short-term isolates affected hosts from network stopping lateral spread', weight: 0.5, aliases: ['immediate network isolation', 'quarantine infected hosts'] },
          { concept: 'long-term resets credentials, blocks C2 domains, and patches clean segments', weight: 0.5, aliases: ['credential revocation', 'rebuilding clean network'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Business Continuity Planning (BCP) vs Disaster Recovery Planning (DRP), defining RTO and RPO.',
        options: [],
        correctAnswer: 'BCP ensures critical business operations can continue during and immediately after a disruption. DRP focuses on technical procedures to restore IT systems and data after a disaster. Recovery Time Objective (RTO) is the maximum acceptable duration systems can remain offline. Recovery Point Objective (RPO) is the maximum acceptable data loss measured in time (e.g., an RPO of 1 hour means no more than 1 hour of transactional data may be lost).',
        gradingPoints: [
          { concept: 'BCP ensures business process continuity; DRP restores IT infrastructure and data', weight: 0.5, aliases: ['business continuity vs disaster recovery'] },
          { concept: 'RTO is maximum allowable downtime; RPO is maximum allowable data loss in time', weight: 0.5, aliases: ['recovery time objective', 'recovery point objective'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Tabletop Exercises (TTX) and their value in testing organizational incident response readiness.',
        options: [],
        correctAnswer: 'A Tabletop Exercise is a discussion-based, scenario-driven simulation where key stakeholders (executives, CSIRT, legal, PR) review their roles and responses to realistic cyber crisis scenarios (e.g., ransomware outbreak or major data breach). It tests communication protocols, identifies gaps in incident playbooks, and clarifies decision-making hierarchies without interrupting live production operations.',
        gradingPoints: [
          { concept: 'discussion-based scenario simulation testing incident response playbooks', weight: 0.5, aliases: ['simulated crisis exercise', 'scenario walkthrough'] },
          { concept: 'identifies gaps in communication, decision hierarchies, and policies non-disruptively', weight: 0.5, aliases: ['identifying playbook gaps', 'testing stakeholder readiness'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Regulatory Breach Notification requirements (e.g., NDPR, GDPR) and legal liability.',
        options: [],
        correctAnswer: 'Data protection regulations mandate that organizations notify supervisory authorities (and affected data subjects) within strict statutory timelines (e.g., GDPR mandates notification within 72 hours of becoming aware of a breach involving personal data risks; NDPR enforces strict reporting to NITDA). Failure to comply can result in severe financial penalties, civil lawsuits, and personal liability for company directors.',
        gradingPoints: [
          { concept: 'mandatory notification of authorities within strict timelines (e.g., 72 hours)', weight: 0.5, aliases: ['72-hour breach notification', 'statutory notification timeline'] },
          { concept: 'compliance avoids severe regulatory fines, lawsuits, and director liability', weight: 0.5, aliases: ['regulatory fines', 'legal liability'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Post-Incident Review (Lessons Learned) meeting objectives and incident documentation.',
        options: [],
        correctAnswer: 'The Lessons Learned meeting occurs after an incident is resolved to conduct a blameless post-mortem. Objectives include: reviewing what happened and identifying root causes; evaluating how effectively the CSIRT responded; analyzing what controls failed; and updating incident playbooks, employee training, and security architecture to prevent recurrence.',
        gradingPoints: [
          { concept: 'conducts blameless post-mortem identifying root cause and timeline', weight: 0.5, aliases: ['root cause analysis', 'blameless post-mortem'] },
          { concept: 'updates playbooks, security controls, and training to prevent recurrence', weight: 0.5, aliases: ['updating incident playbooks', 'corrective actions'] },
        ],
      },
    ],
  },

  // 7. CYB 499: B.Sc. Research Project I
  {
    code: 'CYB 499',
    title: 'B.Sc. Research Project I',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'What are the essential components of a formal B.Sc. Cyber Security Project Proposal?',
        options: [],
        correctAnswer: 'An essential cybersecurity proposal includes: Project Title, Background to the Study, Problem Statement (identifying clear security vulnerability or threat), Aims and Specific Objectives, Scope and Limitations, Significance/Contribution of the Study, Preliminary Literature Review, Proposed Methodology/System Architecture, and Project Schedule (Gantt Chart).',
        gradingPoints: [
          { concept: 'Problem Statement and SMART Objectives', weight: 0.5, aliases: ['clear security problem', 'research goals'] },
          { concept: 'Methodology, Scope, Literature Review, and Timeline', weight: 0.5, aliases: ['architecture approach', 'Gantt chart timeline'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how to formulate a clear, research-worthy Cybersecurity Problem Statement.',
        options: [],
        correctAnswer: 'A research-worthy problem statement must identify an existing, unresolved security challenge, operational inefficiency, or vulnerability in modern systems. It articulates the negative consequences if unaddressed, states why existing solutions are inadequate, and establishes a specific technical gap that the proposed research will address.',
        gradingPoints: [
          { concept: 'identifies real unresolved technical security vulnerability or gap', weight: 0.5, aliases: ['security flaw', 'unaddressed threat'] },
          { concept: 'explains why existing methods fail and justifies the proposed approach', weight: 0.5, aliases: ['deficiency in prior work', 'justification'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the purpose and methodology of conducting a rigorous Literature Review in Cyber Security research.',
        options: [],
        correctAnswer: 'A literature review synthesizes prior academic works, security frameworks, and technical standards related to the problem. It identifies state-of-the-art detection models or cryptography, discovers research gaps, avoids duplicating past studies, and establishes the theoretical justification for the project.',
        gradingPoints: [
          { concept: 'synthesizes prior academic research and technical standards', weight: 0.5, aliases: ['evaluating prior work', 'state of the art review'] },
          { concept: 'identifies gaps in knowledge justifying the new research', weight: 0.5, aliases: ['research gap identification', 'justifying approach'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain ethical and legal considerations when conducting cybersecurity vulnerability research (Responsible Disclosure).',
        options: [],
        correctAnswer: 'Researchers must conduct all testing within isolated local virtual sandboxes or on authorized testbeds, never attacking production third-party systems without permission. If a novel vulnerability in commercial software is discovered, researchers must adhere to Responsible Disclosure, notifying the vendor confidentially and providing reasonable time to patch before public disclosure.',
        gradingPoints: [
          { concept: 'testing restricted strictly to isolated sandboxes or authorized targets', weight: 0.5, aliases: ['sandbox testing', 'no unauthorized testing'] },
          { concept: 'responsible disclosure to vendor before public announcement', weight: 0.5, aliases: ['coordinated disclosure', 'vendor notification'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Experimental Testbed Design for simulating network cyberattacks and evaluating defense algorithms.',
        options: [],
        correctAnswer: 'An experimental testbed uses virtualized networks (e.g., GNS3, Mininet, Proxmox, VMware ESXi) to model enterprise topologies safely. Attack nodes generate controlled traffic (e.g., Scapy, Metasploit), victim nodes run services, and monitoring sensors (Snort, Suricata, Zeek) collect telemetry, enabling repeatable, isolated empirical benchmarking.',
        gradingPoints: [
          { concept: 'virtualized network topology isolating attack and victim nodes safely', weight: 0.5, aliases: ['virtual testbed', 'isolated attack simulation'] },
          { concept: 'sensors and tools enable repeatable, quantifiable benchmarking', weight: 0.5, aliases: ['repeatable experiment', 'telemetry collection'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Quantitative vs Qualitative Evaluation Metrics in Cyber Security systems research.',
        options: [],
        correctAnswer: 'Quantitative evaluation measures objective numerical metrics: Detection Rate (True Positive Rate), False Alarm Rate (False Positive Rate), Precision, F1-score, latency (throughput, response time in ms), and CPU/memory overhead. Qualitative evaluation examines subjective architectural factors: system usability, compliance with standards (ISO 27001), ease of integration, and code maintainability.',
        gradingPoints: [
          { concept: 'Quantitative uses numerical metrics: TPR, FPR, F1-score, latency, and CPU overhead', weight: 0.5, aliases: ['numerical benchmarking', 'accuracy and performance metrics'] },
          { concept: 'Qualitative evaluates usability, standards compliance, and maintainability', weight: 0.5, aliases: ['compliance usability', 'architectural quality'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Public Benchmark Datasets (e.g., NSL-KDD, CIC-IDS-2017, UNSW-NB15) in cybersecurity research.',
        options: [],
        correctAnswer: 'Public benchmark datasets provide standardized network traffic and system log captures containing diverse labeled normal and attack behaviors. Using established benchmarks allows researchers to evaluate their proposed intrusion detection or machine learning models against a recognized baseline, enabling fair, reproducible comparative performance analysis across the scientific community.',
        gradingPoints: [
          { concept: 'provides standardized, labeled traffic and attack traces for research', weight: 0.5, aliases: ['labeled attack data', 'benchmark traffic'] },
          { concept: 'enables fair, reproducible comparison against state-of-the-art models', weight: 0.5, aliases: ['comparative benchmarking', 'reproducible results'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe IEEE Citation Style and avoiding plagiarism in academic dissertation writing.',
        options: [],
        correctAnswer: 'IEEE style uses bracketed numbers in-text (e.g., [1]) corresponding to an end-of-document reference list ordered by appearance. Plagiarism is avoided by paraphrasing concepts in one own words while citing original authors, quoting verbatim text inside quotation marks, and running drafts through anti-plagiarism tools (Turnitin) to verify originality.',
        gradingPoints: [
          { concept: 'IEEE bracketed in-text numbered citations ordered by appearance', weight: 0.5, aliases: ['IEEE referencing', 'numbered citations'] },
          { concept: 'paraphrasing, proper quotation, and verifying originality via Turnitin', weight: 0.5, aliases: ['Turnitin compliance', 'academic originality'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are the required deliverables for the B.Sc. Project Proposal Defense presentation?',
        options: [],
        correctAnswer: 'Deliverables include: A bound/printed Proposal Document reviewed by the project supervisor; a concise slide deck (10–12 slides) highlighting problem statement, objectives, architecture, and timeline; and an authoritative oral presentation demonstrating deep conceptual understanding of the problem and defense against faculty panel questions.',
        gradingPoints: [
          { concept: 'comprehensive written proposal document approved by supervisor', weight: 0.5, aliases: ['proposal document', 'written proposal'] },
          { concept: 'structured slide deck and oral defense of methodology before faculty panel', weight: 0.5, aliases: ['slide presentation', 'oral defense of objectives'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Risk Management and contingency planning for technical project feasibility.',
        options: [],
        correctAnswer: 'Technical risk management anticipates potential project barriers: lack of specialized computational resources, unavailable proprietary APIs, or poor ML model accuracy. A contingency plan establishes alternative paths (e.g., using open-source tools, pre-trained models, or negotiating refined project scope with the supervisor) ensuring successful project completion on schedule.',
        gradingPoints: [
          { concept: 'identifies technical risks and resource constraints beforehand', weight: 0.5, aliases: ['risk identification', 'project feasibility barriers'] },
          { concept: 'establishes alternative contingency paths to guarantee on-time completion', weight: 0.5, aliases: ['contingency planning', 'alternative technical paths'] },
        ],
      },
    ],
  },
];
