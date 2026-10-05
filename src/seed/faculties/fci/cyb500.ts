// src/seed/faculties/fci/cyb500.ts
import type { SeedCourse } from '../../types.js';

export const cyb500Courses: SeedCourse[] = [
  // 1. CYB 501: Information Security Management
  {
    code: 'CYB 501',
    title: 'Information Security Management',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the structure and implementation of an Information Security Management System (ISMS) based on ISO/IEC 27001.',
        options: [],
        correctAnswer: 'ISO/IEC 27001 specifies requirements for establishing, implementing, maintaining, and continually improving an ISMS. It follows the Plan-Do-Check-Act (PDCA) cycle: Plan (establishing context, risk assessment, and security policy); Do (implementing Annex A controls and risk treatment plan); Check (monitoring, internal audits, management reviews); and Act (corrective actions and continual improvement). It provides an auditable management framework ensuring business-aligned information protection.',
        gradingPoints: [
          { concept: 'Plan-Do-Check-Act (PDCA) lifecycle management of security controls', weight: 0.5, aliases: ['PDCA cycle', 'continuous improvement loop'] },
          { concept: 'risk assessment, Statement of Applicability (SoA), and Annex A control enforcement', weight: 0.5, aliases: ['statement of applicability', 'Annex A controls'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Information Security Governance and the role of the Chief Information Security Officer (CISO).',
        options: [],
        correctAnswer: 'Information Security Governance provides strategic direction, ensures security objectives are achieved, verifies risk is managed properly, and validates enterprise resources are used responsibly. The CISO bridges executive leadership and technical operations: establishing corporate security policies, aligning security strategy with business goals, managing cybersecurity budgets, ensuring regulatory compliance, and reporting residual risk directly to the Board of Directors.',
        gradingPoints: [
          { concept: 'strategic alignment of security objectives with enterprise business goals', weight: 0.5, aliases: ['executive alignment', 'boardroom governance'] },
          { concept: 'CISO role managing policies, budgets, compliance, and reporting residual risk to Board', weight: 0.5, aliases: ['CISO leadership', 'reporting to board of directors'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Security Policies, Standards, Guidelines, and Procedures in corporate governance.',
        options: [],
        correctAnswer: 'Policies are high-level, mandatory executive statements outlining security goals and organizational commitment (e.g., Acceptable Use Policy). Standards are mandatory, specific technical requirements or metrics enforcing policy (e.g., "All passwords must be >= 14 characters"). Guidelines are non-mandatory recommendations or best practices providing guidance. Procedures are mandatory, step-by-step operational instructions for carrying out specific tasks (e.g., employee offboarding checklist).',
        gradingPoints: [
          { concept: 'Policies are mandatory high-level executive directives; Standards are mandatory technical rules', weight: 0.5, aliases: ['policy vs standard', 'mandatory rules'] },
          { concept: 'Guidelines are non-mandatory advice; Procedures are step-by-step task instructions', weight: 0.5, aliases: ['guidelines recommendations', 'operational procedures'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Third-Party / Supply Chain Risk Management and Vendor Security Assessments.',
        options: [],
        correctAnswer: 'Supply chain risk arises from vulnerabilities introduced by external suppliers, SaaS providers, and contractors with access to corporate networks or data. Organizations manage this by: conducting vendor risk assessments (evaluating SOC 2 Type II reports, ISO certifications); including security requirements and breach notification clauses in Service Level Agreements (SLAs); assessing fourth-party dependencies; and enforcing continuous monitoring of vendor security posture.',
        gradingPoints: [
          { concept: 'identifies risks from external vendors, contractors, and software dependencies', weight: 0.5, aliases: ['vendor risk management', 'supply chain vulnerability'] },
          { concept: 'evaluates SOC 2 reports and enforces contractual security SLAs and audit rights', weight: 0.5, aliases: ['SOC 2 Type II', 'contractual security requirements'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Security Awareness and Training Programs and measuring their behavioral effectiveness.',
        options: [],
        correctAnswer: 'Security Awareness programs educate employees on recognizing and responding to social engineering threats (phishing, tailgating, CEO fraud). Effectiveness is measured quantitatively by conducting simulated phishing campaigns (tracking click rates, reporting rates over time), monitoring reported incident volume, and evaluating policy compliance metrics, shifting organizational security culture from human vulnerability to human defense.',
        gradingPoints: [
          { concept: 'educates employees to recognize social engineering, phishing, and physical threats', weight: 0.5, aliases: ['security culture', 'employee training'] },
          { concept: 'measured via simulated phishing metrics, reporting rates, and compliance trends', weight: 0.5, aliases: ['phishing simulations', 'measuring behavioral change'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Asset Classification and Information Lifecycle Management in enterprise security.',
        options: [],
        correctAnswer: 'Asset classification categorizes data based on its sensitivity and potential impact if compromised (e.g., Public, Internal, Confidential, Restricted). Information Lifecycle Management governs data across six stages: Creation, Storage, Usage, Sharing, Archiving, and Destruction. Classification dictates handling rules, access controls, retention periods, and approved cryptographic erasure or physical destruction methods (NIST SP 800-88).',
        gradingPoints: [
          { concept: 'classifies data by sensitivity and business impact (Confidential, Restricted)', weight: 0.5, aliases: ['data classification tiers', 'sensitivity labeling'] },
          { concept: 'governs lifecycle stages from creation to secure cryptographic/physical destruction', weight: 0.5, aliases: ['data lifecycle management', 'NIST 800-88 sanitization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Business Impact Analysis (BIA) and establishing Maximum Tolerable Downtime (MTD).',
        options: [],
        correctAnswer: 'A Business Impact Analysis (BIA) identifies critical organizational functions and evaluates the financial, operational, and reputational consequences of disruptions. It establishes Maximum Tolerable Downtime (MTD - the longest time a business function can be offline before irreversible failure occurs), which sets the upper boundary for setting technical Recovery Time Objectives (RTO < MTD) and Recovery Point Objectives (RPO).',
        gradingPoints: [
          { concept: 'identifies critical business processes and quantifies disruption consequences', weight: 0.5, aliases: ['BIA methodology', 'critical process analysis'] },
          { concept: 'establishes MTD setting the upper threshold for technical RTO and RPO targets', weight: 0.5, aliases: ['maximum tolerable downtime', 'RTO boundary'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Security Metrics and Key Performance Indicators (KPIs) vs Key Risk Indicators (KRIs).',
        options: [],
        correctAnswer: 'Security metrics provide quantifiable data on security posture. Key Performance Indicators (KPIs) measure historical operational effectiveness of security activities (e.g., Mean Time to Detect - MTTD, Mean Time to Respond - MTTR, patch deployment compliance percentage). Key Risk Indicators (KRIs) are forward-looking metrics providing early warning signs of increasing risk exposure (e.g., number of unpatched critical CVEs older than 30 days, high privileged account growth).',
        gradingPoints: [
          { concept: 'KPIs measure past operational effectiveness (MTTD, MTTR, patch rates)', weight: 0.5, aliases: ['performance indicators', 'operational metrics'] },
          { concept: 'KRIs provide forward-looking predictive warnings of rising risk exposure', weight: 0.5, aliases: ['risk indicators', 'early warning metrics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Identity Governance and Administration (IGA): Privileged Access Management (PAM) and Access Certification.',
        options: [],
        correctAnswer: 'IGA ensures appropriate user identity lifecycles across enterprise resources. Privileged Access Management (PAM) secures administrative accounts (root, domain admin) via credential vaulting, automated password rotation, session recording, and Just-In-Time (JIT) elevation. Access Certification requires managers to review and re-authorize employee system permissions periodically, preventing privilege creep and orphaned accounts.',
        gradingPoints: [
          { concept: 'PAM vaults administrative credentials with session recording and JIT access', weight: 0.5, aliases: ['privileged access controls', 'credential vaulting'] },
          { concept: 'access certification periodically re-audits permissions preventing privilege creep', weight: 0.5, aliases: ['access recertification', 'least privilege audits'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Cyber Insurance policies: Coverage types, exclusions, and mandatory underwriting security controls.',
        options: [],
        correctAnswer: 'Cyber insurance transfers financial risk from cyber incidents. Coverage includes first-party losses (forensic response, business interruption, ransom extortion negotiations) and third-party liabilities (regulatory fines, customer privacy lawsuits). Exclusions typically include unpatched known vulnerabilities, nation-state acts of war, or failure to maintain stated controls. Underwriters mandate controls before issuing policies: multi-factor authentication (MFA) everywhere, immutable backups, and EDR deployment.',
        gradingPoints: [
          { concept: 'covers first-party losses (forensics, business interruption) and third-party liabilities', weight: 0.5, aliases: ['first-party and third-party coverage', 'risk transfer'] },
          { concept: 'underwriters mandate MFA, immutable backups, and EDR as prerequisites', weight: 0.5, aliases: ['mandatory underwriting controls', 'war exclusion clauses'] },
        ],
      },
    ],
  },

  // 2. CYB 503: Critical Infrastructure Protection
  {
    code: 'CYB 503',
    title: 'Critical Infrastructure Protection',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define Critical Infrastructure and identify key national critical sectors.',
        options: [],
        correctAnswer: 'Critical Infrastructure encompasses physical and cyber assets, systems, and networks so vital to a nation that their incapacitation or destruction would have a debilitating impact on national security, national economic security, or public health and safety. Key sectors include: Energy and Electrical Power Grids, Water and Wastewater Systems, Transportation Systems, Financial Services, Healthcare and Public Health, Telecommunications, and Defense Industrial Base.',
        gradingPoints: [
          { concept: 'assets essential for national security, economy, and public safety', weight: 0.5, aliases: ['national vital assets', 'critical infrastructure definition'] },
          { concept: 'sectors: Energy/Power Grid, Water, Healthcare, Financial, Telecommunications', weight: 0.5, aliases: ['key infrastructure sectors', 'power and water sectors'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Information Technology (IT) and Operational Technology (OT / ICS) security requirements.',
        options: [],
        correctAnswer: 'IT systems prioritize the CIA triad: Confidentiality is paramount, downtime for patching is acceptable, and devices are updated frequently with short lifecycles (3–5 years). OT/ICS systems govern physical processes and prioritize Availability and Safety above all: downtime can cause physical catastrophe or loss of life; systems operate 24/7 in real time with millisecond latency requirements; devices (PLCs, RTUs) have decades-long lifecycles and cannot tolerate sudden restarts for patching.',
        gradingPoints: [
          { concept: 'IT prioritizes Confidentiality with regular patching and maintenance windows', weight: 0.5, aliases: ['IT CIA triad', 'confidentiality priority'] },
          { concept: 'OT prioritizes Availability and Human Safety with zero downtime tolerance and legacy hardware', weight: 0.5, aliases: ['OT availability and safety', 'industrial real-time constraints'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe SCADA system architecture: Human-Machine Interface (HMI), Programmable Logic Controllers (PLCs), and Remote Terminal Units (RTUs).',
        options: [],
        correctAnswer: 'Supervisory Control and Data Acquisition (SCADA) systems monitor and control distributed industrial processes: HMIs provide graphical interfaces for human operators to view telemetry and input control commands; PLCs are ruggedized industrial microcomputers executing real-time logic controlling actuators, valves, and motors based on sensor inputs; RTUs collect sensor data from remote field sites and telemetry back to supervisory control centers over telemetry radio or cellular links.',
        gradingPoints: [
          { concept: 'HMI provides operator visualization and supervisory control', weight: 0.33, aliases: ['human machine interface', 'operator dashboard'] },
          { concept: 'PLCs execute deterministic physical control of actuators and sensors', weight: 0.33, aliases: ['programmable logic controller', 'real-time sensor control'] },
          { concept: 'RTUs interface remote field sites telemetry with supervisory centers', weight: 0.34, aliases: ['remote terminal units', 'field telemetry'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Purdue Enterprise Reference Architecture (Purdue Model) for industrial network segmentation.',
        options: [],
        correctAnswer: 'The Purdue Model segments industrial networks into hierarchical security levels: Level 0 (Physical Process: sensors, actuators); Level 1 (Basic Control: PLCs, RTUs); Level 2 (Area Supervisory Control: local HMIs, engineering workstations); Level 3 (Site Operations: batch management, historians); Level 3.5 (Industrial DMZ / IDMZ isolating OT from IT); Level 4 (Enterprise IT network: business planning, logistics); Level 5 (Corporate WAN and cloud). Strict firewalls prevent direct communication between Level 4 and Level 2.',
        gradingPoints: [
          { concept: 'Level 0-1 physical and direct PLC control; Level 2-3 supervisory control', weight: 0.5, aliases: ['Purdue levels 0 to 3', 'OT control levels'] },
          { concept: 'Level 3.5 IDMZ strictly isolates OT process networks from Level 4 enterprise IT', weight: 0.5, aliases: ['industrial DMZ', 'Purdue model segmentation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe industrial communication protocols and their inherent security vulnerabilities: Modbus, DNP3, and IEC 60870-5-104.',
        options: [],
        correctAnswer: 'Legacy industrial protocols were designed decades ago for isolated serial links without security: Modbus TCP and DNP3 lack authentication, integrity checks, and encryption. An attacker with network access can inject arbitrary control commands (e.g., Modbus function code 05 write coil to trip a breaker) or spoof sensor telemetry values. Modern revisions (e.g., Secure DNP3, Modbus Security over TLS) add cryptographic integrity, but legacy unencrypted implementations remain pervasive.',
        gradingPoints: [
          { concept: 'legacy protocols lack authentication, encryption, and integrity verification', weight: 0.5, aliases: ['plaintext industrial protocols', 'missing authentication in Modbus'] },
          { concept: 'attackers can inject unauthorized commands or spoof telemetry directly', weight: 0.5, aliases: ['command injection in PLCs', 'spoofing sensor readings'] },
        ],
      },
      {
        type: 'theory',
        question: 'Analyze the Stuxnet malware campaign and its significance in cyber-physical warfare.',
        options: [],
        correctAnswer: 'Stuxnet (discovered 2010) was the first known weaponized malware designed to cause physical destruction to critical industrial infrastructure (Iran Natanz nuclear centrifuges). It crossed air-gaps via infected USB drives, leveraged four zero-day Windows exploits, compromised Siemens Step 7 engineering software, modified PLC code controlling variable frequency drives to spin centrifuges to self-destruction, while simultaneously replaying normal telemetry to HMIs to deceive human operators.',
        gradingPoints: [
          { concept: 'weaponized cyber-physical attack crossing air-gaps via USB to sabotage centrifuges', weight: 0.5, aliases: ['first cyber-physical weapon', 'Natanz enrichment sabotage'] },
          { concept: 'modified Siemens PLC code causing physical damage while spoofing normal telemetry', weight: 0.5, aliases: ['Siemens PLC tampering', 'deceiving HMI operators'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Air-Gap networks in critical environments and mechanisms used to bridge or exfiltrate data across air-gaps.',
        options: [],
        correctAnswer: 'An air-gap physically isolates a secure network from all untrusted external networks (including the internet). Adversaries bridge air-gaps through: physical supply chain insertion (compromised USB drives or technician laptops); acoustical covert channels (ultrasonic speaker-to-microphone data transfer); electromagnetic emissions (TEMPEST / radio frequencies modulated by CPU activity); and optical side channels (flickering LEDs captured by drones/cameras).',
        gradingPoints: [
          { concept: 'complete physical disconnection of sensitive networks from the internet', weight: 0.4, aliases: ['air-gapped architecture', 'physical isolation'] },
          { concept: 'bridged via physical media (USBs) or covert side channels (acoustic, RF, optical)', weight: 0.6, aliases: ['covert channel exfiltration', 'USB supply chain bridging'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Safety Instrumented Systems (SIS) and their independence from Distributed Control Systems (DCS).',
        options: [],
        correctAnswer: 'A Safety Instrumented System (SIS) is a dedicated, independent automated emergency shutdown system designed to protect human life, the environment, and physical plant assets when industrial processes exceed safe operating limits. Standard engineering practices mandate that the SIS must be physically and logically separate from the basic process control system (DCS/BPCS), ensuring that a DCS cyber compromise cannot prevent emergency shutdown actuators from activating.',
        gradingPoints: [
          { concept: 'independent emergency shutdown system designed to prevent physical catastrophe', weight: 0.5, aliases: ['safety instrumented system', 'emergency shutdown'] },
          { concept: 'strictly separate from BPCS/DCS ensuring process compromises cannot disable safety', weight: 0.5, aliases: ['logical and physical separation', 'failsafe protection'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the TRITON / TRISIS malware framework targeting industrial safety systems.',
        options: [],
        correctAnswer: 'TRITON (discovered 2017 in a Saudi petrochemical plant) was the first malware designed specifically to attack Safety Instrumented Systems (Schneider Electric Triconex safety controllers). It infected engineering workstations, communicated via proprietary TriStation protocol to reprogram safety logic, intending to disable emergency shutdown systems or force shutdown, demonstrating adversary intent to cause catastrophic physical explosions and casualties.',
        gradingPoints: [
          { concept: 'first malware targeting Safety Instrumented Systems (Triconex controllers)', weight: 0.5, aliases: ['TRISIS safety attack', 'Triconex controller compromise'] },
          { concept: 'intended to disable emergency safety shutdown mechanisms risking physical explosion', weight: 0.5, aliases: ['disabling plant safety', 'catastrophic physical impact'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Industrial Cyber Resilience strategies: Unidirectional Security Gateways (Data Diodes) and Network Microsegmentation.',
        options: [],
        correctAnswer: 'Data Diodes enforce physical one-way communication using hardware fiber optics (photodiode transmitter and receiver), allowing industrial telemetry to flow outbound from OT to IT historians while making inbound cyberattack traffic physically impossible. Microsegmentation uses firewalls and industrial switches to isolate individual operational zones (conforming to ISA/IEC 62443 Zones and Conduits), containing compromises within a single cell.',
        gradingPoints: [
          { concept: 'Data Diodes enforce physical one-way outbound data flow via optical hardware', weight: 0.5, aliases: ['hardware data diode', 'unidirectional gateway'] },
          { concept: 'Microsegmentation enforces ISA/IEC 62443 Zones and Conduits isolating compromises', weight: 0.5, aliases: ['zones and conduits', 'OT microsegmentation'] },
        ],
      },
    ],
  },

  // 3. CYB 509: Malware Analysis
  {
    code: 'CYB 509',
    title: 'Malware Analysis',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Compare Static Malware Analysis with Dynamic Malware Analysis methodologies.',
        options: [],
        correctAnswer: 'Static Analysis examines malware binary code and properties without executing the program (examining hashes, PE headers, strings, import/export tables, and decompiling/disassembling via Ghidra/IDA Pro); it is safe and provides comprehensive coverage, but is hindered by obfuscation and packing. Dynamic Analysis executes malware inside a secure, monitored sandbox (e.g., Cuckoo Sandbox) to observe runtime behavior (process creation, registry modifications, network C2 beacons); it is fast, but risks sandbox evasion.',
        gradingPoints: [
          { concept: 'Static analyzes binary without execution using strings, PE headers, and disassembly', weight: 0.5, aliases: ['non-execution analysis', 'reverse engineering Ghidra'] },
          { concept: 'Dynamic executes malware in isolated sandbox observing runtime system and network behavior', weight: 0.5, aliases: ['behavioral monitoring', 'sandbox execution'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Portable Executable (PE) File Header structure: DOS Header, PE Header, Section Headers, and Import Address Table (IAT).',
        options: [],
        correctAnswer: 'The Windows PE format structures executable binaries: 1. DOS Header starts with magic bytes "MZ" (0x4D5A) and e_lfanew pointer to the PE header; 2. PE Header contains the signature "PE\\0\\0", Machine architecture, and Optional Header with AddressOfEntryPoint; 3. Section Headers define memory segments (.text for code, .data for initialized variables, .rsrc for resources); 4. Import Address Table (IAT) lists external Windows API functions (DLLs) the malware imports, revealing suspected capabilities.',
        gradingPoints: [
          { concept: 'DOS MZ header, e_lfanew pointer, and PE header with EntryPoint address', weight: 0.5, aliases: ['PE header components', 'AddressOfEntryPoint'] },
          { concept: 'Section headers (.text, .data) and Import Address Table revealing API calls', weight: 0.5, aliases: ['IAT imports', 'executable sections'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Packed and Obfuscated Malware and unpacking techniques using tools like PE-bear and x64dbg.',
        options: [],
        correctAnswer: 'Packed malware compresses or encrypts the malicious executable payload inside an outer wrapper with a small unpacking stub to evade antivirus signatures. In static analysis, packed files exhibit very few imports in the IAT and high Section Entropy (> 7.0). Analysts unpack binaries using debuggers (x64dbg) by running the stub, breaking at the transition between the unpacker and original code (Original Entry Point - OEP), and dumping the unpacked process memory to disk (using Scylla) to fix the IAT.',
        gradingPoints: [
          { concept: 'packed malware compresses payload with unpacking stub; exhibits high entropy', weight: 0.5, aliases: ['high section entropy', 'packed executable'] },
          { concept: 'locating Original Entry Point (OEP) in debugger and dumping unpacked memory', weight: 0.5, aliases: ['finding OEP', 'process dumping Scylla'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Anti-Analysis and Anti-Debugging techniques used by malware (e.g., IsDebuggerPresent, RDTSC, INT 3).',
        options: [],
        correctAnswer: 'Malware detects analysis environments: Anti-debugging checks the Process Environment Block (PEB) BeingDebugged flag via IsDebuggerPresent API; uses RDTSC (Read Time-Stamp Counter) instructions to detect execution delays caused by human debugging; or injects INT 3 software breakpoints to see if a debugger intercepts them. Analysts bypass these by patching binary instructions (NOPing checks), using debugger plugins (ScyllaHide), or hooking PEB pointers.',
        gradingPoints: [
          { concept: 'checks PEB BeingDebugged flag, RDTSC timing checks, and exception trapping', weight: 0.6, aliases: ['IsDebuggerPresent', 'timing-based evasion', 'anti-debugging checks'] },
          { concept: 'countered by patching binary checks with NOPs or using anti-anti-debugging plugins', weight: 0.4, aliases: ['ScyllaHide', 'NOPing conditional jumps'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Anti-Virtual Machine (Anti-VM) techniques (MAC address checks, CPUID, registry keys) and evasion countermeasures.',
        options: [],
        correctAnswer: 'Malware detects virtual sandboxes to terminate or exhibit benign behavior: it checks MAC address vendor prefixes (e.g., 00:05:69 for VMware); inspects registry keys and device drivers (VBoxGuestAdditions); executes CPUID checking hypervisor presence bits; checks screen resolution, mouse movement, and recent files. Analysts counter this by hardening VMs (cloaking hypervisor artifacts, spoofing MACs, and simulating realistic human user activity).',
        gradingPoints: [
          { concept: 'detects hypervisor artifacts via MAC prefixes, driver files, and CPUID checks', weight: 0.5, aliases: ['VM detection', 'hypervisor artifact checks'] },
          { concept: 'monitors human user interaction (mouse movement) and countered via VM hardening', weight: 0.5, aliases: ['human interaction simulation', 'hardened sandbox'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Process Injection techniques: DLL Injection, Process Hollowing, and Reflective DLL Loading.',
        options: [],
        correctAnswer: 'Process injection runs malicious code in the address space of a legitimate process to hide from task managers: DLL Injection forces a target process to load a malicious DLL using VirtualAllocEx, WriteProcessMemory, and CreateRemoteThread calling LoadLibrary; Process Hollowing creates a legitimate suspended process, unmaps its code (ZwUnmapViewOfSection), writes malicious code in its place, and resumes execution; Reflective DLL Loading loads a DLL directly from memory without calling Windows API LoadLibrary or touching disk.',
        gradingPoints: [
          { concept: 'DLL Injection allocates memory and invokes CreateRemoteThread with LoadLibrary', weight: 0.33, aliases: ['remote thread injection'] },
          { concept: 'Process Hollowing unmaps legitimate suspended process replacing it with malware', weight: 0.33, aliases: ['hollowing technique', 'ZwUnmapViewOfSection'] },
          { concept: 'Reflective DLL loading executes directly from memory bypassing disk and LoadLibrary', weight: 0.34, aliases: ['in-memory reflective loading', 'stealth execution'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain YARA Rules syntax and application in malware classification and hunting.',
        options: [],
        correctAnswer: 'YARA is a pattern-matching tool used to identify and classify malware samples. A YARA rule consists of: Meta (author, description, date); Strings (hexadecimal byte patterns, text strings, regular expressions); and Condition (Boolean logic defining match criteria, e.g., "uint16(0) == 0x5A4D and all of ($s*) and filesize < 500KB"). Security teams use YARA rules to scan filesystems, memory dumps, and incoming email streams for malware families.',
        gradingPoints: [
          { concept: 'structured pattern-matching language with Meta, Strings, and Condition sections', weight: 0.5, aliases: ['YARA rule sections', 'meta strings condition'] },
          { concept: 'matches byte sequences, strings, and PE metadata for automated malware hunting', weight: 0.5, aliases: ['malware signature matching', 'hunting rule conditions'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Ransomware internal architecture: File enumeration, Symmetric/Asymmetric key generation, and Shadow Copy deletion.',
        options: [],
        correctAnswer: 'Modern ransomware (e.g., LockBit) operates in stages: 1. Disables defenses and executes "vssadmin delete shadows" to destroy Volume Shadow Copies; 2. Generates a random AES/ChaCha20 symmetric key per victim file for rapid bulk encryption; 3. Encrypts the symmetric key using an embedded attacker master RSA public key, appending it to the encrypted file; 4. Changes desktop wallpaper and drops a ransom note; recovery is impossible without the attacker private key.',
        gradingPoints: [
          { concept: 'deletes volume shadow copies preventing system restore via vssadmin', weight: 0.33, aliases: ['shadow copy destruction'] },
          { concept: 'hybrid encryption using random symmetric file keys encrypted with master public key', weight: 0.34, aliases: ['hybrid key encryption', 'AES and RSA combination'] },
          { concept: 'drops ransom note demanding cryptocurrency for private decryption key', weight: 0.33, aliases: ['ransom note generation', 'extortion mechanism'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Command and Control (C2) communication mechanisms: Domain Generation Algorithms (DGA) vs Fast Flux DNS.',
        options: [],
        correctAnswer: 'Domain Generation Algorithms (DGA) dynamically compute hundreds of pseudo-random domain names daily using a seeded mathematical formula (e.g., date-based); the malware queries these domains until reaching one registered by the attacker, frustrating static domain blacklists. Fast Flux DNS rapidly changes the IP addresses associated with a single domain name (with very short TTLs) across a botnet of compromised proxy hosts, hiding the true backend C2 server.',
        gradingPoints: [
          { concept: 'DGA dynamically computes pseudo-random domains daily defeating static blacklists', weight: 0.5, aliases: ['algorithmic domain generation', 'seed-based domains'] },
          { concept: 'Fast Flux rapidly shifts IP records with low TTLs across proxy bots concealing C2', weight: 0.5, aliases: ['fast flux DNS', 'rapid IP shifting'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Sandbox Isolation and safety guidelines for establishing a Malware Analysis Lab.',
        options: [],
        correctAnswer: 'A malware analysis lab must prevent accidental infections: host workstations must be physically isolated or run host-only virtual networks with zero bridge to corporate LANs; host-to-guest shared folders and clipboards must be permanently disabled; internet access should be routed through simulated network services (INetSim / FakeNet-NG) to capture C2 beacons without letting malware reach real servers; clean base snapshots must be restored after every analysis.',
        gradingPoints: [
          { concept: 'host-only isolated virtual networks with disabled clipboards and shared folders', weight: 0.5, aliases: ['isolated hypervisor', 'sandbox containment'] },
          { concept: 'simulated internet services (INetSim) to capture C2 traffic safely with snapshot rollback', weight: 0.5, aliases: ['simulated network INetSim', 'clean snapshot restoration'] },
        ],
      },
    ],
  },

  // 4. CYB 502: Cyber Governance, Law & Privacy
  {
    code: 'CYB 502',
    title: 'Cyber Governance, Law & Privacy',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Analyze the Cybercrimes (Prohibition, Prevention, etc.) Act 2015 of Nigeria: Key offenses and penalties.',
        options: [],
        correctAnswer: 'The Nigerian Cybercrimes Act 2015 provides a comprehensive legal framework against cyber offenses: It criminalizes unauthorized system access (hacking), system interference, interception of electronic communications, cyberstalking, identity theft, child pornography, and critical national information infrastructure sabotage. Penalties range from heavy financial fines to life imprisonment for attacks causing death or critical infrastructure sabotage.',
        gradingPoints: [
          { concept: 'criminalizes hacking, identity theft, cyberstalking, and infrastructure sabotage', weight: 0.5, aliases: ['Nigerian cyber law offenses', 'cybercrimes act prohibitions'] },
          { concept: 'stipulates severe penalties from heavy fines to life imprisonment for critical sabotage', weight: 0.5, aliases: ['statutory penalties', 'legal consequences'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Nigeria Data Protection Act (NDPA 2023) and the mandate of the Nigeria Data Protection Commission (NDPC).',
        options: [],
        correctAnswer: 'The NDPA 2023 is Nigeria primary legislation safeguarding personal data and privacy rights. It establishes the NDPC as the independent regulatory authority. The Act establishes lawful bases for data processing (consent, contract, legal obligation), grants data subjects rights (access, rectification, erasure, objection), mandates Data Protection Officers (DPOs), and imposes heavy fines (up to 10 million Naira or 2% of annual gross revenue) for non-compliance.',
        gradingPoints: [
          { concept: 'establishes NDPC as regulator and defines lawful bases for processing', weight: 0.5, aliases: ['NDPA 2023 framework', 'NDPC regulatory authority'] },
          { concept: 'grants data subject rights and imposes strict non-compliance financial penalties', weight: 0.5, aliases: ['data subject rights', 'statutory fines'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare GDPR with NDPA 2023: Extraterritoriality, Cross-border Data Transfers, and Data Subject Rights.',
        options: [],
        correctAnswer: 'Both frameworks prioritize privacy and consent. Extraterritoriality: GDPR applies to any organization globally processing EU resident data; NDPA applies to processing within Nigeria and entities outside Nigeria processing Nigerian citizens data. Cross-border transfers require an adequacy decision by the commission or standard contractual clauses. Data subject rights in both include the right to access, rectify, port data, and the "Right to be Forgotten" (erasure).',
        gradingPoints: [
          { concept: 'extraterritorial scope applying to foreign organizations targeting residents', weight: 0.5, aliases: ['extraterritorial jurisdiction', 'global applicability'] },
          { concept: 'cross-border adequacy requirements and data subject rights (erasure, portability)', weight: 0.5, aliases: ['cross border transfer rules', 'right to be forgotten'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Budapest Convention on Cybercrime and International Mutual Legal Assistance Treaties (MLAT).',
        options: [],
        correctAnswer: 'The Budapest Convention is the first international treaty addressing internet crimes, harmonizing national criminal laws, establishing investigative procedures, and fostering international cooperation. Mutual Legal Assistance Treaties (MLAT) provide formal legal mechanisms allowing law enforcement in one country to gather digital evidence, subpoenas, and witness testimonies located in another country, overcoming jurisdictional boundaries in trans-national cybercrimes.',
        gradingPoints: [
          { concept: 'Budapest Convention harmonizes cyber laws and international cooperation', weight: 0.5, aliases: ['international treaty on cybercrime', 'global legal harmonization'] },
          { concept: 'MLAT enables cross-border law enforcement evidence gathering and subpoenas', weight: 0.5, aliases: ['mutual legal assistance', 'cross-border evidence retrieval'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Privacy by Design (PbD) principles and incorporating privacy throughout the software engineering lifecycle.',
        options: [],
        correctAnswer: 'Privacy by Design (created by Ann Cavoukian) mandates embedding privacy into system architecture proactively rather than as an afterthought. Core principles include: 1. Proactive not reactive; 2. Privacy as the default setting (zero opt-in required); 3. Privacy embedded into design; 4. Full functionality (positive-sum, no trade-offs); 5. End-to-end security; 6. Visibility and transparency; 7. Respect for user privacy (user-centric).',
        gradingPoints: [
          { concept: 'proactive integration of privacy into system architecture as the default setting', weight: 0.5, aliases: ['privacy as default', 'proactive privacy engineering'] },
          { concept: 'end-to-end security, full functionality, and user-centric transparency', weight: 0.5, aliases: ['seven PbD principles', 'transparency and positive-sum'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Electronic Evidence Admissibility in Nigerian Courts under Section 84 of the Evidence Act 2011.',
        options: [],
        correctAnswer: 'Section 84 of the Nigerian Evidence Act 2011 governs the admissibility of computer-generated electronic documents. It requires a Certificate of Compliance signed by an officer in charge of the computer: certifying that the device was operating properly without interference during data production; that data was regularly fed into it during ordinary activities; and that the computer was not malfunctioning, ensuring evidence reliability.',
        gradingPoints: [
          { concept: 'Section 84 mandates Certificate of Compliance for computer-generated evidence', weight: 0.6, aliases: ['certificate of compliance', 'Section 84 evidence act'] },
          { concept: 'certifies device operated properly without tampering during record generation', weight: 0.4, aliases: ['device operational integrity', 'unaltered data production'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Digital Rights Management (DRM) and Copyright Infringement in software and digital content.',
        options: [],
        correctAnswer: 'DRM uses access control technologies and encryption to restrict unauthorized copying, distribution, and modification of proprietary digital works. Copyright protects original software source code and creative works automatically upon creation. Infringement occurs through unauthorized software piracy, reverse engineering violating licenses, or cracking DRM protections, exposing offenders to civil damages and criminal penalties.',
        gradingPoints: [
          { concept: 'DRM enforces technical access controls and encryption on digital assets', weight: 0.5, aliases: ['digital rights enforcement', 'anti-piracy technology'] },
          { concept: 'copyright protects original code; infringement leads to civil and criminal liability', weight: 0.5, aliases: ['software copyright infringement', 'piracy and licensing laws'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Data Sovereignty and Data Localization laws and their impact on global Cloud Computing.',
        options: [],
        correctAnswer: 'Data Sovereignty dictates that digital data is subject to the laws and governance of the physical nation where it is stored. Data Localization mandates that certain categories of citizen or financial data must be stored and processed within domestic borders. This forces cloud providers to build local sovereign data centers, complicates multinational cloud architectures, and limits cross-border data analytics.',
        gradingPoints: [
          { concept: 'data is subject to legal jurisdiction of the physical storage territory', weight: 0.5, aliases: ['data sovereignty jurisdiction', 'territorial data laws'] },
          { concept: 'localization mandates domestic storage, forcing regional data center expansion', weight: 0.5, aliases: ['data localization mandates', 'domestic cloud residency'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the role of Data Protection Impact Assessments (DPIA) before deploying high-risk IT systems.',
        options: [],
        correctAnswer: 'A DPIA is a mandatory systematic risk assessment process conducted before implementing new technologies likely to result in high risks to individuals rights (e.g., AI biometric surveillance, mass health databases). It describes data processing operations, assesses necessity and proportionality, identifies privacy risks, and outlines mitigation controls, preventing regulatory sanctions.',
        gradingPoints: [
          { concept: 'systematic risk assessment required prior to deploying high-risk data processing', weight: 0.5, aliases: ['mandatory privacy impact assessment', 'DPIA process'] },
          { concept: 'evaluates necessity, proportionality, and mitigates risks to data subject rights', weight: 0.5, aliases: ['proportionality assessment', 'privacy risk mitigation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Cyber Warfare and International Humanitarian Law (IHL) in cyberspace (Tallinn Manual).',
        options: [],
        correctAnswer: 'The Tallinn Manual analyzes how international law applies to cyber warfare. It establishes that existing IHL principles apply in cyberspace: Distinction (cyberattacks must distinguish between military targets and civilian infrastructure, forbidding attacks on hospitals/dams); Proportionality (collateral civilian damage must not exceed concrete military advantage); and State Sovereignty (prohibiting unauthorized cyber operations violating territorial integrity).',
        gradingPoints: [
          { concept: 'Tallinn Manual applies International Humanitarian Law to cyber warfare', weight: 0.4, aliases: ['IHL in cyberspace', 'Tallinn Manual 2.0'] },
          { concept: 'principles of Distinction (military vs civilian), Proportionality, and Sovereignty', weight: 0.6, aliases: ['distinction and proportionality', 'protecting civilian infrastructure'] },
        ],
      },
    ],
  },

  // 5. CYB 504: Blockchain & Cryptographic Protocols
  {
    code: 'CYB 504',
    title: 'Blockchain & Cryptographic Protocols',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain Blockchain internal architecture: Merkle Trees, Cryptographic Block Hashing, and Genesis Block.',
        options: [],
        correctAnswer: 'A blockchain is an append-only distributed ledger of cryptographically linked blocks. The Genesis Block is the hardcoded first block (Block 0). Each block header contains: timestamp, nonce, previous block hash, and the Merkle Root. A Merkle Tree aggregates transactions into a binary hash tree where leaf nodes represent transaction hashes and parent nodes represent hashes of concatenated children; the root hash allows fast, tamper-evident verification of transaction integrity in O(log n).',
        gradingPoints: [
          { concept: 'cryptographically linked blocks where each header references previous block hash', weight: 0.5, aliases: ['hash pointer chain', 'previous block hash linkage'] },
          { concept: 'Merkle Tree binary hashing allows tamper-evident verification via Merkle Root', weight: 0.5, aliases: ['merkle root verification', 'O(log n) inclusion proof'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Proof of Work (PoW) with Proof of Stake (PoS) consensus algorithms: Security vs Resource Consumption.',
        options: [],
        correctAnswer: 'Proof of Work (PoW) achieves consensus by requiring miners to solve computationally intensive hashing puzzles (finding a nonce yielding a hash below a target difficulty); it provides robust security against Sybil attacks, but consumes massive electrical energy and has low transaction throughput. Proof of Stake (PoS) selects block validators based on economic stake (tokens locked); it reduces energy usage by >99.9% and increases throughput, relying on economic slashing to destroy stakes of malicious actors.',
        gradingPoints: [
          { concept: 'PoW uses computational puzzle solving; secure but massive electrical waste', weight: 0.5, aliases: ['computational mining', 'PoW energy consumption'] },
          { concept: 'PoS uses economic stake validation with slashing penalties saving energy', weight: 0.5, aliases: ['validator staking', 'slashing mechanism', 'PoS efficiency'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Smart Contract security vulnerabilities: Reentrancy Attacks (e.g., The DAO hack) and Flash Loan exploits.',
        options: [],
        correctAnswer: 'Reentrancy occurs when a smart contract calls an external untrusted contract before updating its internal balance state; the external contract recursively calls back into the withdraw function before state updates, draining funds (e.g., The DAO hack). Mitigations include using the Checks-Effects-Interactions pattern or reentrancy guard mutexes. Flash loan exploits borrow uncollateralized millions within a single transaction to manipulate automated market maker (AMM) price oracles, extracting protocol liquidity.',
        gradingPoints: [
          { concept: 'Reentrancy occurs when external calls precede internal state balance updates', weight: 0.5, aliases: ['reentrancy vulnerability', 'The DAO hack'] },
          { concept: 'mitigated via Checks-Effects-Interactions pattern and reentrancy guards', weight: 0.5, aliases: ['checks-effects-interactions', 'mutex reentrancy guard'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Zero-Knowledge Proofs (ZKP), zk-SNARKs, and privacy-preserving blockchain transactions.',
        options: [],
        correctAnswer: 'A Zero-Knowledge Proof allows a Prover to convince a Verifier that a statement is true without revealing any secret information beyond the validity of the statement itself (satisfying Completeness, Soundness, and Zero-Knowledge). zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) provide short proofs verifiable in milliseconds without interactive communication, enabling privacy blockchains (Zcash) to verify transaction legitimacy while keeping sender, receiver, and amount completely encrypted.',
        gradingPoints: [
          { concept: 'proves knowledge of a secret without disclosing the secret itself', weight: 0.5, aliases: ['zero knowledge principle', 'completeness soundness zero-knowledge'] },
          { concept: 'zk-SNARKs provide succinct non-interactive proofs verifying encrypted transactions', weight: 0.5, aliases: ['zk-SNARK succinct proof', 'privacy-preserving blockchain'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe 51% Attacks and Double-Spending vulnerabilities in decentralized networks.',
        options: [],
        correctAnswer: 'A 51% Attack occurs when an entity controls more than half of the network mining hash rate (PoW) or staked capital (PoS). The attacker can reorganize the blockchain by building an alternate private chain faster than the public chain, broadcasting it to rewrite transaction history. This enables Double-Spending: spending coins in a merchant transaction, reorganizing the chain to erase the transfer, and reclaiming the original coins.',
        gradingPoints: [
          { concept: 'controlling majority hash rate allows attacker to rewrite blockchain history', weight: 0.5, aliases: ['majority mining takeover', 'chain reorganization'] },
          { concept: 'enables double-spending by reversing confirmed transactions on private branch', weight: 0.5, aliases: ['double spending exploit', 'reversing spent coins'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Secure Multi-Party Computation (SMPC) and Secret Sharing (Shamir\'s Secret Sharing).',
        options: [],
        correctAnswer: 'SMPC enables multiple parties to jointly compute a function over their private inputs without revealing their individual inputs to one another. Shamir\'s Secret Sharing divides a master secret S into n shares such that any threshold k shares (k <= n) can reconstruct S using polynomial interpolation (Lagrange interpolation on a degree k-1 polynomial), while any k-1 shares reveal zero information about the secret, securing distributed cryptographic keys.',
        gradingPoints: [
          { concept: 'SMPC computes functions over private inputs without revealing raw inputs', weight: 0.5, aliases: ['multi-party computation', 'private distributed computation'] },
          { concept: 'Shamir Secret Sharing uses (k, n) polynomial threshold reconstruction', weight: 0.5, aliases: ['threshold secret sharing', 'lagrange polynomial interpolation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cryptographic Wallets: Hot Wallets vs Cold Wallets, and Hierarchical Deterministic (HD) Wallets (BIP-32/BIP-39).',
        options: [],
        correctAnswer: 'Hot Wallets are connected to the internet (browser extensions, mobile apps), offering convenience but vulnerable to malware. Cold Wallets store private keys completely offline on hardware devices (Ledger, Trezor) or paper. BIP-39 generates a human-readable 12-to-24 word Mnemonic Seed Phrase that deterministically derives a master seed. BIP-32 HD wallets use this seed to generate a tree of billions of public-private key pairs from a single backup.',
        gradingPoints: [
          { concept: 'Hot wallets are online and vulnerable; Cold wallets store keys offline in hardware', weight: 0.4, aliases: ['online vs offline storage', 'hardware wallets'] },
          { concept: 'BIP-39 mnemonic seed phrase deterministically derives tree of keys via BIP-32 HD wallet', weight: 0.6, aliases: ['mnemonic phrase', 'hierarchical deterministic wallet'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Byzantine Fault Tolerance (BFT) and Practical Byzantine Fault Tolerance (pBFT).',
        options: [],
        correctAnswer: 'The Byzantine Generals Problem models distributed consensus where rogue/compromised nodes can send conflicting or malicious messages. A system is Byzantine Fault Tolerant if it functions correctly despite up to f faulty nodes among 3f + 1 total nodes (tolerating < 1/3 malicious nodes). Practical BFT (pBFT) optimizes state machine replication across phases (Pre-prepare, Prepare, Commit) using digital signatures, reaching consensus in O(R^2) message exchanges without energy-wasteful mining.',
        gradingPoints: [
          { concept: 'tolerates up to f arbitrary or malicious nodes among 3f+1 total nodes', weight: 0.5, aliases: ['byzantine fault model', 'tolerating one third malicious nodes'] },
          { concept: 'pBFT uses Pre-prepare, Prepare, Commit phases reaching consensus without mining', weight: 0.5, aliases: ['practical BFT phases', 'state machine replication'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cross-Chain Bridges and their associated security vulnerabilities.',
        options: [],
        correctAnswer: 'Cross-chain bridges enable transferring assets and data between distinct independent blockchains (e.g., Ethereum to Solana) by locking tokens on the source chain and minting synthetic wrapped tokens on the destination chain. Bridges are prime attack targets due to: centralized multi-sig validator compromises (e.g., Ronin Bridge $600M hack); smart contract logic flaws in deposit verification; and fake deposit event spoofing, leading to massive protocol insolvencies.',
        gradingPoints: [
          { concept: 'locks assets on source chain and mints wrapped tokens on destination chain', weight: 0.5, aliases: ['cross-chain asset transfer', 'wrapped tokens bridge'] },
          { concept: 'vulnerabilities in multi-sig validator compromises and deposit verification flaws', weight: 0.5, aliases: ['validator private key compromise', 'bridge exploits'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Quantum Computing threats to Blockchain (Shor\'s and Grover\'s algorithms) and Post-Quantum Blockchain.',
        options: [],
        correctAnswer: 'Quantum computers running Shor\'s algorithm will break Elliptic Curve Cryptography (ECDSA secp256k1), allowing attackers to derive private keys directly from exposed public addresses and forge transactions. Grover\'s algorithm provides a quadratic speedup against PoW SHA-256 hashing, which is easily mitigated by doubling hash lengths (SHA-512). Post-quantum blockchains are transitioning to lattice-based and hash-based signature schemes (e.g., CRYSTALS-Dilithium, SPHINCS+).',
        gradingPoints: [
          { concept: 'Shor algorithm breaks ECDSA public-key cryptography deriving private keys', weight: 0.5, aliases: ['breaks elliptic curve signatures', 'Shor algorithm threat'] },
          { concept: 'Grover requires larger hash sizes; post-quantum requires lattice-based signatures', weight: 0.5, aliases: ['CRYSTALS-Dilithium', 'lattice-based cryptography'] },
        ],
      },
    ],
  },

  // 6. CYB 599: B.Sc. Final Year Project II
  {
    code: 'CYB 599',
    title: 'B.Sc. Final Year Project II',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Outline the execution and full implementation phase of a B.Sc. Cyber Security final year project.',
        options: [],
        correctAnswer: 'The execution phase involves: 1. Deploying the technical cybersecurity artifact (e.g., intrusion detection engine, secure cryptographic protocol, or automated vulnerability scanner); 2. Integrating simulated attack testbeds and enterprise datasets; 3. Executing empirical penetration testing and performance benchmarking; 4. Analyzing statistical outcomes and false-positive rates; 5. Compiling the complete final dissertation; and 6. Preparing oral presentation and live technical demonstration.',
        gradingPoints: [
          { concept: 'implementing technical cybersecurity system and testbed integration', weight: 0.5, aliases: ['system construction', 'artifact implementation'] },
          { concept: 'empirical attack benchmarking, statistical evaluation, and thesis writing', weight: 0.5, aliases: ['penetration benchmarking', 'final dissertation compilation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the complete standard chapter layout of a university B.Sc. Cyber Security dissertation.',
        options: [],
        correctAnswer: 'The standard layout includes: Preliminary pages (Title, Certification, Abstract, Table of Contents); Chapter 1: Introduction (Background, Problem Statement, Aims/Objectives, Scope, Significance); Chapter 2: Literature Review and Theoretical Framework; Chapter 3: System Architecture, Methodology, and Security Design; Chapter 4: System Implementation, Experimental Testing, Results, and Performance Evaluation; Chapter 5: Summary, Conclusions, and Recommendations; References (IEEE style); and Appendices.',
        gradingPoints: [
          { concept: 'Preliminary pages and Chapters 1 & 2 (Introduction and Literature Review)', weight: 0.4, aliases: ['problem statement and literature'] },
          { concept: 'Chapters 3, 4, and 5 (Architecture, Results/Testing, Conclusions, and References)', weight: 0.6, aliases: ['methodology design', 'results and testing', 'conclusions and references'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how empirical security testing and performance benchmarking should be presented in Chapter 4.',
        options: [],
        correctAnswer: 'Chapter 4 must present quantitative evidence of system efficacy against simulated attacks: Precision, Recall, F1-Score, Detection Rate, False Positive Rate, throughput, packet processing latency, and resource utilization (CPU/RAM). Results must be visualized via comparative confusion matrices, ROC-AUC curves, and statistical summary tables benchmarked against existing state-of-the-art models with objective analytical commentary.',
        gradingPoints: [
          { concept: 'quantitative detection metrics: Precision, Recall, F1-score, and False Positive Rate', weight: 0.5, aliases: ['detection metrics', 'confusion matrix benchmarks'] },
          { concept: 'visualization via ROC curves and tables benchmarked against baseline models', weight: 0.5, aliases: ['ROC-AUC visualization', 'comparative evaluation tables'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the enforcement of Anti-Plagiarism policies (Turnitin) and academic integrity in cybersecurity dissertations.',
        options: [],
        correctAnswer: 'Anti-plagiarism policies verify academic originality against global repositories of scientific journals, conference proceedings, and student theses. Turnitin calculates a Similarity Index; universities enforce strict compliance (typically <= 15-20% overall, excluding references). Students must paraphrase concepts in their own words, cite all sources using IEEE standards, and avoid unauthorized AI text generation or code plagiarism.',
        gradingPoints: [
          { concept: 'verifies originality against global publications via Turnitin Similarity Index', weight: 0.5, aliases: ['Turnitin compliance', 'academic originality'] },
          { concept: 'proper paraphrasing, quotation, and IEEE referencing standards', weight: 0.5, aliases: ['paraphrasing standards', 'avoiding plagiarism'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are the essential components and best practices for delivering an effective final year project Oral Defense in Cyber Security?',
        options: [],
        correctAnswer: 'An effective defense requires: a structured slide deck (15–20 slides) highlighting the problem statement, objectives, architecture, experimental results, and conclusion; presenting a flawless, pre-configured live demonstration of the security artifact; adhering strictly to the allotted time (10–15 mins); and answering examiners questions calmly and authoritatively with grounding in cybersecurity principles.',
        gradingPoints: [
          { concept: 'structured concise slides focusing on problem, architecture, results, and conclusion', weight: 0.4, aliases: ['slide presentation', 'clear slide layout'] },
          { concept: 'pre-tested live demonstration and authoritative defense of examiner questions', weight: 0.6, aliases: ['live demo', 'answering panel questions'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Unit Testing, Integration Testing, and Adversarial Stress Testing of the developed security artifact.',
        options: [],
        correctAnswer: 'Unit testing verifies individual cryptographic functions and parsing modules in isolation. Integration testing verifies seamless interaction between data ingestion pipelines, database schemas, detection engines, and alert dashboards. Adversarial stress testing subjects the system to high-volume malicious traffic, edge-case malformed packets, and evasion techniques to verify system resilience under active attack.',
        gradingPoints: [
          { concept: 'unit tests verify individual functions; integration tests verify end-to-end components', weight: 0.5, aliases: ['unit and integration testing', 'module validation'] },
          { concept: 'adversarial stress testing evaluates robustness against evasion and packet flooding', weight: 0.5, aliases: ['stress testing', 'adversarial evasion testing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how software containerization (Docker) and open-source release (GitHub) enhance the credibility of a cybersecurity project.',
        options: [],
        correctAnswer: 'Packaging the project into a Docker container guarantees reproducibility, eliminating dependency mismatches ("it works on my machine") across examiner and evaluator machines. Releasing clean, well-documented source code on GitHub with comprehensive README files, architectural diagrams, and installation scripts proves technical maturity and contributes to the open-source security community.',
        gradingPoints: [
          { concept: 'Docker containerization guarantees environment reproducibility across testing machines', weight: 0.5, aliases: ['docker reproducibility', 'dependency packaging'] },
          { concept: 'open-source GitHub repository with documentation proves technical transparency', weight: 0.5, aliases: ['GitHub repository', 'open-source contribution'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss handling unexpected technical roadblocks (e.g., high false alarm rates, dataset class imbalance) during project implementation.',
        options: [],
        correctAnswer: 'When confronted with technical roadblocks such as severe dataset class imbalance (where normal traffic outnumbers attack traffic 99:1), a researcher applies sound methodologies: synthetic oversampling (SMOTE), focal loss functions, or ensemble methods; documents limitations transparently; and consults the supervisor to adjust algorithmic parameters rather than manipulating raw experimental data.',
        gradingPoints: [
          { concept: 'applying scientific remedies (SMOTE oversampling, focal loss) to technical challenges', weight: 0.5, aliases: ['resolving class imbalance', 'SMOTE techniques'] },
          { concept: 'transparent documentation of limitations and supervisor consultation', weight: 0.5, aliases: ['scientific transparency', 'supervisor guidance'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe post-defense procedures: implementing panel corrections, supervisor sign-off, and final hardbound archival.',
        options: [],
        correctAnswer: 'Following defense: the student compiles all internal and external examiner comments; updates the dissertation chapters systematically; submits the revised thesis to the supervisor and department head for verification; and binds official hardbound copies in the university prescribed faculty color with gold lettering for library and departmental archives.',
        gradingPoints: [
          { concept: 'systematically implementing examiner recommendations and revisions', weight: 0.5, aliases: ['addressing panel feedback', 'revising dissertation'] },
          { concept: 'formal supervisor sign-off and submitting university hardbound archive copies', weight: 0.5, aliases: ['supervisor approval', 'hardbound submission'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss transitioning a successful cybersecurity undergraduate project into a patent, research publication, or commercial startup.',
        options: [],
        correctAnswer: 'A high-impact project can be condensed into an IEEE or ACM cybersecurity conference/journal paper by emphasizing novel algorithms, threat models, and benchmarking. Alternatively, novel software tools or algorithms with commercial potential can be incubated into a cybersecurity startup through patent protection, enterprise pilot testing, and venture incubation.',
        gradingPoints: [
          { concept: 'condensing dissertation into peer-reviewed IEEE/ACM conference or journal paper', weight: 0.5, aliases: ['academic publication', 'IEEE conference paper'] },
          { concept: 'commercial incubation through intellectual property protection and startup incubation', weight: 0.5, aliases: ['commercialization', 'technology startup'] },
        ],
      },
    ],
  },
];
