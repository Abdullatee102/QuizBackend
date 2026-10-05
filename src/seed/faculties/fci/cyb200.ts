// src/seed/faculties/fci/cyb200.ts
import type { SeedCourse } from '../../types.js';

export const cyb200Courses: SeedCourse[] = [
  // 1. CYB 201: Principles of Information Security
  {
    code: 'CYB 201',
    title: 'Principles of Information Security',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'Which encryption type uses both a public key and a private key mathematically linked together?',
        options: ['Symmetric encryption', 'Asymmetric encryption', 'Hashing', 'Base64 encoding'],
        correctAnswer: 'Asymmetric encryption',
      },
      {
        type: 'cbt',
        question: 'What is the primary function of a network firewall?',
        options: ['To remove computer viruses from hard drives', 'To monitor and filter incoming and outgoing traffic based on security rules', 'To speed up internet connectivity bandwidth', 'To encrypt local storage volumes'],
        correctAnswer: 'To monitor and filter incoming and outgoing traffic based on security rules',
      },
      {
        type: 'cbt',
        question: 'What security service ensures that a sender cannot deny having sent a specific message or transaction?',
        options: ['Confidentiality', 'Integrity', 'Non-repudiation', 'Availability'],
        correctAnswer: 'Non-repudiation',
      },
      {
        type: 'cbt',
        question: 'Which symmetric encryption standard uses a 128-bit block size and key sizes of 128, 192, or 256 bits?',
        options: ['DES', 'AES', 'RSA', 'MD5'],
        correctAnswer: 'AES',
      },
      {
        type: 'cbt',
        question: 'What is a Honeypot in network security?',
        options: ['A decoy system designed to lure, detect, and analyze unauthorized intruder behavior', 'An antivirus engine update mechanism', 'A secure encrypted USB token', 'A high-speed gigabit switch'],
        correctAnswer: 'A decoy system designed to lure, detect, and analyze unauthorized intruder behavior',
      },
      {
        type: 'cbt',
        question: 'Which security model focuses strictly on data confidentiality with the rule: "No read-up, no write-down"?',
        options: ['Bell-LaPadula Model', 'Biba Integrity Model', 'Clark-Wilson Model', 'Brewer-Nash (Chinese Wall) Model'],
        correctAnswer: 'Bell-LaPadula Model',
      },
      {
        type: 'cbt',
        question: 'Which security model focuses strictly on data integrity with the rule: "No read-down, no write-up"?',
        options: ['Bell-LaPadula Model', 'Biba Integrity Model', 'Take-Grant Model', 'Harrison-Ruzzo-Ullman Model'],
        correctAnswer: 'Biba Integrity Model',
      },
      {
        type: 'cbt',
        question: 'What attack intercepts and alters communication between two legitimate parties without their knowledge?',
        options: ['Man-in-the-Middle (MitM) attack', 'Denial of Service', 'SQL Injection', 'Cross-Site Scripting'],
        correctAnswer: 'Man-in-the-Middle (MitM) attack',
      },
      {
        type: 'cbt',
        question: 'What does a digital signature provide in network transactions?',
        options: ['Confidentiality and compression', 'Authentication, integrity, and non-repudiation', 'Only data encryption', 'Faster network routing'],
        correctAnswer: 'Authentication, integrity, and non-repudiation',
      },
      {
        type: 'cbt',
        question: 'Which port scanning tool is widely regarded as the industry standard for network discovery and vulnerability auditing?',
        options: ['Wireshark', 'Nmap', 'Burp Suite', 'Metasploit'],
        correctAnswer: 'Nmap',
      },
    ],
  },

  // 2. CYB 203: Discrete Mathematics for Cyber Security
  {
    code: 'CYB 203',
    title: 'Discrete Mathematics for Cyber Security',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What mathematical field forms the foundation for RSA public key cryptography and Diffie-Hellman key exchange?',
        options: ['Modular Arithmetic and Number Theory', 'Calculus of Variations', 'Fluid Dynamics', 'Thermodynamics'],
        correctAnswer: 'Modular Arithmetic and Number Theory',
      },
      {
        type: 'cbt',
        question: 'According to Fermat Little Theorem, if p is a prime and a is an integer not divisible by p, then a^(p-1) mod p is equal to:',
        options: ['0', '1', 'p - 1', 'a'],
        correctAnswer: '1',
      },
      {
        type: 'cbt',
        question: 'What is the greatest common divisor gcd(a, b) of two relatively prime (coprime) integers?',
        options: ['0', '1', '2', 'a * b'],
        correctAnswer: '1',
      },
      {
        type: 'cbt',
        question: 'Which algorithm efficiently computes the greatest common divisor of two integers a and b in logarithmic time?',
        options: ['Euclidean Algorithm', 'Dijkstra Algorithm', 'Prim Algorithm', 'Bellman-Ford Algorithm'],
        correctAnswer: 'Euclidean Algorithm',
      },
      {
        type: 'cbt',
        question: 'What does Euler Totient Function phi(n) count for a positive integer n?',
        options: ['The number of prime factors of n', 'The number of positive integers less than n that are coprime to n', 'The divisors of n', 'The square roots of n'],
        correctAnswer: 'The number of positive integers less than n that are coprime to n',
      },
      {
        type: 'cbt',
        question: 'For two distinct prime numbers p and q, what is Euler totient phi(p * q)?',
        options: ['(p - 1) * (q - 1)', 'p * q - 1', '(p + 1) * (q + 1)', 'p + q - 1'],
        correctAnswer: '(p - 1) * (q - 1)',
      },
      {
        type: 'cbt',
        question: 'Which mathematical theorem guarantees a unique solution modulo the product of pairwise coprime moduli for a system of congruences?',
        options: ['Chinese Remainder Theorem (CRT)', 'Pythagorean Theorem', 'Bayes Theorem', 'Central Limit Theorem'],
        correctAnswer: 'Chinese Remainder Theorem (CRT)',
      },
      {
        type: 'cbt',
        question: 'What is the modular multiplicative inverse of 3 modulo 11 (find x such that 3x = 1 mod 11)?',
        options: ['2', '4', '7', '9'],
        correctAnswer: '4',
      },
      {
        type: 'cbt',
        question: 'In modern cryptography, what algebraic structure consists of points satisfying y^2 = x^3 + ax + b over a finite field?',
        options: ['Elliptic Curve', 'Hyperbolic Paraboloid', 'Mandelbrot Fractal', 'Fibonacci Spiral'],
        correctAnswer: 'Elliptic Curve',
      },
      {
        type: 'cbt',
        question: 'Which computational problem states that given g, p, and g^x mod p, finding x is computationally intractable for large primes?',
        options: ['Discrete Logarithm Problem (DLP)', 'Traveling Salesperson Problem', 'Halting Problem', 'Boolean Satisfiability'],
        correctAnswer: 'Discrete Logarithm Problem (DLP)',
      },
    ],
  },

  // 3. CYB 202: Computer Architecture for Security
  {
    code: 'CYB 202',
    title: 'Computer Architecture for Security',
    level: 200,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What hardware security feature marks specific memory areas (like the stack and heap) as non-executable to prevent buffer overflow attacks?',
        options: ['Execute Disable Bit (XD/NX bit / DEP)', 'ECC Memory', 'Hyper-Threading', 'Overclocking'],
        correctAnswer: 'Execute Disable Bit (XD/NX bit / DEP)',
      },
      {
        type: 'cbt',
        question: 'What is a Trusted Platform Module (TPM)?',
        options: ['A dedicated secure cryptoprocessor chip on the motherboard that securely stores cryptographic keys and performs hardware authentication', 'A high-speed graphics processing unit', 'A type of secondary storage tape', 'A power supply surge protector'],
        correctAnswer: 'A dedicated secure cryptoprocessor chip on the motherboard that securely stores cryptographic keys and performs hardware authentication',
      },
      {
        type: 'cbt',
        question: 'Which side-channel vulnerability exploit speculative execution branch prediction in modern CPUs to read unauthorized memory?',
        options: ['Spectre and Meltdown', 'Stuxnet and Flame', 'SQL Injection and XSS', 'Heartbleed and Shellshock'],
        correctAnswer: 'Spectre and Meltdown',
      },
      {
        type: 'cbt',
        question: 'What is Address Space Layout Randomization (ASLR)?',
        options: ['A security technique that randomizes memory locations of program components to prevent reliable return-to-libc and shellcode execution', 'A method of defragmenting physical hard drives', 'A dynamic RAM refresh protocol', 'An algorithm for cache line replacement'],
        correctAnswer: 'A security technique that randomizes memory locations of program components to prevent reliable return-to-libc and shellcode execution',
      },
      {
        type: 'cbt',
        question: 'In processor privilege hierarchies, what protection ring does the operating system kernel typically execute in?',
        options: ['Ring 0', 'Ring 1', 'Ring 2', 'Ring 3'],
        correctAnswer: 'Ring 0',
      },
      {
        type: 'cbt',
        question: 'What hardware component inside modern CPUs is responsible for isolating virtual memory pages and enforcing read/write/execute permissions?',
        options: ['Memory Management Unit (MMU)', 'Arithmetic Logic Unit (ALU)', 'Floating Point Unit (FPU)', 'Control Bus'],
        correctAnswer: 'Memory Management Unit (MMU)',
      },
      {
        type: 'cbt',
        question: 'What is UEFI Secure Boot designed to protect against?',
        options: ['Rootkits and unauthorized bootloader tampering during system startup', 'Network phishing attacks', 'DDoS volumetric attacks', 'Browser cookie theft'],
        correctAnswer: 'Rootkits and unauthorized bootloader tampering during system startup',
      },
      {
        type: 'cbt',
        question: 'What is Direct Memory Access (DMA) attack in physical hardware security?',
        options: ['An attacker connects a malicious peripheral via PCIe/Thunderbolt to read/write memory bypassing the OS CPU access controls', 'A brute-force Wi-Fi crack', 'A cross-site request forgery', 'A phishing email credential capture'],
        correctAnswer: 'An attacker connects a malicious peripheral via PCIe/Thunderbolt to read/write memory bypassing the OS CPU access controls',
      },
      {
        type: 'cbt',
        question: 'What hardware feature on Intel CPUs creates isolated secure memory enclaves (TEE) that even a compromised OS kernel cannot access?',
        options: ['Intel SGX (Software Guard Extensions)', 'Intel SpeedStep', 'Intel TurboBoost', 'Intel QuickSync'],
        correctAnswer: 'Intel SGX (Software Guard Extensions)',
      },
      {
        type: 'cbt',
        question: 'Which attack measures tiny fluctuations in electrical power consumption or electromagnetic emissions of a cryptographic chip to extract secret keys?',
        options: ['Side-Channel Attack (e.g., Differential Power Analysis)', 'SYN Flood attack', 'Man-in-the-Middle attack', 'Directory Traversal attack'],
        correctAnswer: 'Side-Channel Attack (e.g., Differential Power Analysis)',
      },
    ],
  },

  // 4. CYB 204: Secure Programming
  {
    code: 'CYB 204',
    title: 'Secure Programming',
    level: 200,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What software vulnerability occurs when an application writes more data to a memory buffer than it was allocated, overwriting adjacent memory?',
        options: ['Buffer Overflow', 'Race Condition', 'Cross-Site Scripting', 'Null Pointer Dereference'],
        correctAnswer: 'Buffer Overflow',
      },
      {
        type: 'cbt',
        question: 'Which dangerous C standard library function does NOT check destination buffer boundaries and is notoriously prone to buffer overflows?',
        options: ['strcpy()', 'strncpy()', 'fgets()', 'snprintf()'],
        correctAnswer: 'strcpy()',
      },
      {
        type: 'cbt',
        question: 'What is a "Stack Canary" used for in compiled binaries?',
        options: ['A small pseudo-random value placed before the stack return address to detect buffer overflow tampering before function return', 'An antivirus icon on the desktop', 'A compiler code optimizer', 'A memory leak detector'],
        correctAnswer: 'A small pseudo-random value placed before the stack return address to detect buffer overflow tampering before function return',
      },
      {
        type: 'cbt',
        question: 'What type of software vulnerability occurs when code attempts to use memory after it has already been freed, leading to potential arbitrary code execution?',
        options: ['Use-After-Free (UAF)', 'Integer Overflow', 'SQL Injection', 'Cross-Site Request Forgery'],
        correctAnswer: 'Use-After-Free (UAF)',
      },
      {
        type: 'cbt',
        question: 'How should sensitive passwords always be stored in a production database?',
        options: ['Hashed with a strong cryptographic algorithm (e.g., Argon2, bcrypt) along with a unique random Salt', 'Encrypted using Base64 encoding', 'Stored in plaintext for easy customer service lookup', 'Reversibly encrypted with a hardcoded static key'],
        correctAnswer: 'Hashed with a strong cryptographic algorithm (e.g., Argon2, bcrypt) along with a unique random Salt',
      },
      {
        type: 'cbt',
        question: 'What is input validation principle: "Whitelisting" vs "Blacklisting"?',
        options: ['Whitelisting accepts only explicitly permitted known-good inputs, whereas blacklisting tries to block known-bad inputs', 'Blacklisting is universally more secure than whitelisting', 'Whitelisting converts strings to integers', 'Blacklisting checks memory addresses'],
        correctAnswer: 'Whitelisting accepts only explicitly permitted known-good inputs, whereas blacklisting tries to block known-bad inputs',
      },
      {
        type: 'cbt',
        question: 'What vulnerability occurs when an application uses untrusted user input directly in an OS system command (e.g., system() or exec())?',
        options: ['Command Injection', 'Buffer Overflow', 'Denial of Service', 'Memory Corruption'],
        correctAnswer: 'Command Injection',
      },
      {
        type: 'cbt',
        question: 'What is Integer Overflow in low-level programming?',
        options: ['An arithmetic operation attempts to create a numeric value outside the maximum representable range of the data type, wrapping around', 'Dividing an integer by zero', 'Converting an integer to a float', 'Allocating an integer on the heap'],
        correctAnswer: 'An arithmetic operation attempts to create a numeric value outside the maximum representable range of the data type, wrapping around',
      },
      {
        type: 'cbt',
        question: 'Which secure coding practice ensures that database queries are protected against SQL Injection by separating SQL query structure from data values?',
        options: ['Parameterized Queries (Prepared Statements)', 'Regular Expression blacklisting', 'Concatenating strings using escape characters', 'Disabling database transactions'],
        correctAnswer: 'Parameterized Queries (Prepared Statements)',
      },
      {
        type: 'cbt',
        question: 'What is Static Application Security Testing (SAST)?',
        options: ['Analyzing application source code or bytecode for security vulnerabilities without executing the program', 'Testing application responses during runtime live attacks', 'Testing server physical cooling units', 'Conducting user survey interviews'],
        correctAnswer: 'Analyzing application source code or bytecode for security vulnerabilities without executing the program',
      },
    ],
  },
  // Shared courses
  { code: 'CSC 201', title: 'Computer Programming I', level: 200, semester: 'harmattan', questions: [] },
  { code: 'CSC 205', title: 'Digital Logic Design', level: 200, semester: 'harmattan', questions: [] },
  { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
  { code: 'STA 201', title: 'Statistics for Physical Sciences', level: 200, semester: 'harmattan', questions: [] },
  { code: 'CSC 202', title: 'Computer Programming II', level: 200, semester: 'rain', questions: [] },
  { code: 'CSC 204', title: 'Data Structures and Algorithms I', level: 200, semester: 'rain', questions: [] },
  { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },
];
