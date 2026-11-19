// src/seed/faculties/fci/cyb200.ts
import type { SeedCourse } from '../../types.js';

export const cyb200Courses: SeedCourse[] = [
  {
    code: "CYB 201",
    title: "Principles of Information Security",
    level: 200,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "Which encryption type uses both a public key and a private key mathematically linked together?",
      "options": [
        "Symmetric encryption",
        "Asymmetric encryption",
        "Hashing",
        "Base64 encoding"
      ],
      "correctAnswer": "Asymmetric encryption"
    },
      {
      "type": "cbt",
      "question": "What is the primary function of a network firewall?",
      "options": [
        "To remove computer viruses from hard drives",
        "To monitor and filter incoming and outgoing traffic based on security rules",
        "To speed up internet connectivity bandwidth",
        "To encrypt local storage volumes"
      ],
      "correctAnswer": "To monitor and filter incoming and outgoing traffic based on security rules"
    },
      {
      "type": "cbt",
      "question": "What security service ensures that a sender cannot deny having sent a specific message or transaction?",
      "options": [
        "Confidentiality",
        "Integrity",
        "Non-repudiation",
        "Availability"
      ],
      "correctAnswer": "Non-repudiation"
    },
      {
      "type": "cbt",
      "question": "Which symmetric encryption standard uses a 128-bit block size and key sizes of 128, 192, or 256 bits?",
      "options": [
        "DES",
        "AES",
        "RSA",
        "MD5"
      ],
      "correctAnswer": "AES"
    },
      {
      "type": "cbt",
      "question": "What is a Honeypot in network security?",
      "options": [
        "A decoy system designed to lure, detect, and analyze unauthorized intruder behavior",
        "An antivirus engine update mechanism",
        "A secure encrypted USB token",
        "A high-speed gigabit switch"
      ],
      "correctAnswer": "A decoy system designed to lure, detect, and analyze unauthorized intruder behavior"
    },
      {
      "type": "cbt",
      "question": "Which security model focuses strictly on data confidentiality with the rule: \"No read-up, no write-down\"?",
      "options": [
        "Bell-LaPadula Model",
        "Biba Integrity Model",
        "Clark-Wilson Model",
        "Brewer-Nash (Chinese Wall) Model"
      ],
      "correctAnswer": "Bell-LaPadula Model"
    },
      {
      "type": "cbt",
      "question": "Which security model focuses strictly on data integrity with the rule: \"No read-down, no write-up\"?",
      "options": [
        "Bell-LaPadula Model",
        "Biba Integrity Model",
        "Take-Grant Model",
        "Harrison-Ruzzo-Ullman Model"
      ],
      "correctAnswer": "Biba Integrity Model"
    },
      {
      "type": "cbt",
      "question": "What attack intercepts and alters communication between two legitimate parties without their knowledge?",
      "options": [
        "Man-in-the-Middle (MitM) attack",
        "Denial of Service",
        "SQL Injection",
        "Cross-Site Scripting"
      ],
      "correctAnswer": "Man-in-the-Middle (MitM) attack"
    },
      {
      "type": "cbt",
      "question": "What does a digital signature provide in network transactions?",
      "options": [
        "Confidentiality and compression",
        "Authentication, integrity, and non-repudiation",
        "Only data encryption",
        "Faster network routing"
      ],
      "correctAnswer": "Authentication, integrity, and non-repudiation"
    },
      {
      "type": "cbt",
      "question": "Which port scanning tool is widely regarded as the industry standard for network discovery and vulnerability auditing?",
      "options": [
        "Wireshark",
        "Nmap",
        "Burp Suite",
        "Metasploit"
      ],
      "correctAnswer": "Nmap"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Principles of Information Security (CYB 201) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Principles of Information Security is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Principles of Information Security for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Principles of Information Security integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Principles of Information Security (CYB 201) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Principles of Information Security.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Principles of Information Security guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Principles of Information Security at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Principles of Information Security leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "CYB 203",
    title: "Discrete Mathematics for Cyber Security",
    level: 200,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "What mathematical field forms the foundation for RSA public key cryptography and Diffie-Hellman key exchange?",
      "options": [
        "Modular Arithmetic and Number Theory",
        "Calculus of Variations",
        "Fluid Dynamics",
        "Thermodynamics"
      ],
      "correctAnswer": "Modular Arithmetic and Number Theory"
    },
      {
      "type": "cbt",
      "question": "According to Fermat Little Theorem, if p is a prime and a is an integer not divisible by p, then a^(p-1) mod p is equal to:",
      "options": [
        "0",
        "1",
        "p - 1",
        "a"
      ],
      "correctAnswer": "1"
    },
      {
      "type": "cbt",
      "question": "What is the greatest common divisor gcd(a, b) of two relatively prime (coprime) integers?",
      "options": [
        "0",
        "1",
        "2",
        "a * b"
      ],
      "correctAnswer": "1"
    },
      {
      "type": "cbt",
      "question": "Which algorithm efficiently computes the greatest common divisor of two integers a and b in logarithmic time?",
      "options": [
        "Euclidean Algorithm",
        "Dijkstra Algorithm",
        "Prim Algorithm",
        "Bellman-Ford Algorithm"
      ],
      "correctAnswer": "Euclidean Algorithm"
    },
      {
      "type": "cbt",
      "question": "What does Euler Totient Function phi(n) count for a positive integer n?",
      "options": [
        "The number of prime factors of n",
        "The number of positive integers less than n that are coprime to n",
        "The divisors of n",
        "The square roots of n"
      ],
      "correctAnswer": "The number of positive integers less than n that are coprime to n"
    },
      {
      "type": "cbt",
      "question": "For two distinct prime numbers p and q, what is Euler totient phi(p * q)?",
      "options": [
        "(p - 1) * (q - 1)",
        "p * q - 1",
        "(p + 1) * (q + 1)",
        "p + q - 1"
      ],
      "correctAnswer": "(p - 1) * (q - 1)"
    },
      {
      "type": "cbt",
      "question": "Which mathematical theorem guarantees a unique solution modulo the product of pairwise coprime moduli for a system of congruences?",
      "options": [
        "Chinese Remainder Theorem (CRT)",
        "Pythagorean Theorem",
        "Bayes Theorem",
        "Central Limit Theorem"
      ],
      "correctAnswer": "Chinese Remainder Theorem (CRT)"
    },
      {
      "type": "cbt",
      "question": "What is the modular multiplicative inverse of 3 modulo 11 (find x such that 3x = 1 mod 11)?",
      "options": [
        "2",
        "4",
        "7",
        "9"
      ],
      "correctAnswer": "4"
    },
      {
      "type": "cbt",
      "question": "In modern cryptography, what algebraic structure consists of points satisfying y^2 = x^3 + ax + b over a finite field?",
      "options": [
        "Elliptic Curve",
        "Hyperbolic Paraboloid",
        "Mandelbrot Fractal",
        "Fibonacci Spiral"
      ],
      "correctAnswer": "Elliptic Curve"
    },
      {
      "type": "cbt",
      "question": "Which computational problem states that given g, p, and g^x mod p, finding x is computationally intractable for large primes?",
      "options": [
        "Discrete Logarithm Problem (DLP)",
        "Traveling Salesperson Problem",
        "Halting Problem",
        "Boolean Satisfiability"
      ],
      "correctAnswer": "Discrete Logarithm Problem (DLP)"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Discrete Mathematics for Cyber Security (CYB 203) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Discrete Mathematics for Cyber Security is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Discrete Mathematics for Cyber Security for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Discrete Mathematics for Cyber Security integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Discrete Mathematics for Cyber Security (CYB 203) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Discrete Mathematics for Cyber Security.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Discrete Mathematics for Cyber Security guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Discrete Mathematics for Cyber Security at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Discrete Mathematics for Cyber Security leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "CYB 202",
    title: "Computer Architecture for Security",
    level: 200,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "What hardware security feature marks specific memory areas (like the stack and heap) as non-executable to prevent buffer overflow attacks?",
      "options": [
        "Execute Disable Bit (XD/NX bit / DEP)",
        "ECC Memory",
        "Hyper-Threading",
        "Overclocking"
      ],
      "correctAnswer": "Execute Disable Bit (XD/NX bit / DEP)"
    },
      {
      "type": "cbt",
      "question": "What is a Trusted Platform Module (TPM)?",
      "options": [
        "A dedicated secure cryptoprocessor chip on the motherboard that securely stores cryptographic keys and performs hardware authentication",
        "A high-speed graphics processing unit",
        "A type of secondary storage tape",
        "A power supply surge protector"
      ],
      "correctAnswer": "A dedicated secure cryptoprocessor chip on the motherboard that securely stores cryptographic keys and performs hardware authentication"
    },
      {
      "type": "cbt",
      "question": "Which side-channel vulnerability exploit speculative execution branch prediction in modern CPUs to read unauthorized memory?",
      "options": [
        "Spectre and Meltdown",
        "Stuxnet and Flame",
        "SQL Injection and XSS",
        "Heartbleed and Shellshock"
      ],
      "correctAnswer": "Spectre and Meltdown"
    },
      {
      "type": "cbt",
      "question": "What is Address Space Layout Randomization (ASLR)?",
      "options": [
        "A security technique that randomizes memory locations of program components to prevent reliable return-to-libc and shellcode execution",
        "A method of defragmenting physical hard drives",
        "A dynamic RAM refresh protocol",
        "An algorithm for cache line replacement"
      ],
      "correctAnswer": "A security technique that randomizes memory locations of program components to prevent reliable return-to-libc and shellcode execution"
    },
      {
      "type": "cbt",
      "question": "In processor privilege hierarchies, what protection ring does the operating system kernel typically execute in?",
      "options": [
        "Ring 0",
        "Ring 1",
        "Ring 2",
        "Ring 3"
      ],
      "correctAnswer": "Ring 0"
    },
      {
      "type": "cbt",
      "question": "What hardware component inside modern CPUs is responsible for isolating virtual memory pages and enforcing read/write/execute permissions?",
      "options": [
        "Memory Management Unit (MMU)",
        "Arithmetic Logic Unit (ALU)",
        "Floating Point Unit (FPU)",
        "Control Bus"
      ],
      "correctAnswer": "Memory Management Unit (MMU)"
    },
      {
      "type": "cbt",
      "question": "What is UEFI Secure Boot designed to protect against?",
      "options": [
        "Rootkits and unauthorized bootloader tampering during system startup",
        "Network phishing attacks",
        "DDoS volumetric attacks",
        "Browser cookie theft"
      ],
      "correctAnswer": "Rootkits and unauthorized bootloader tampering during system startup"
    },
      {
      "type": "cbt",
      "question": "What is Direct Memory Access (DMA) attack in physical hardware security?",
      "options": [
        "An attacker connects a malicious peripheral via PCIe/Thunderbolt to read/write memory bypassing the OS CPU access controls",
        "A brute-force Wi-Fi crack",
        "A cross-site request forgery",
        "A phishing email credential capture"
      ],
      "correctAnswer": "An attacker connects a malicious peripheral via PCIe/Thunderbolt to read/write memory bypassing the OS CPU access controls"
    },
      {
      "type": "cbt",
      "question": "What hardware feature on Intel CPUs creates isolated secure memory enclaves (TEE) that even a compromised OS kernel cannot access?",
      "options": [
        "Intel SGX (Software Guard Extensions)",
        "Intel SpeedStep",
        "Intel TurboBoost",
        "Intel QuickSync"
      ],
      "correctAnswer": "Intel SGX (Software Guard Extensions)"
    },
      {
      "type": "cbt",
      "question": "Which attack measures tiny fluctuations in electrical power consumption or electromagnetic emissions of a cryptographic chip to extract secret keys?",
      "options": [
        "Side-Channel Attack (e.g., Differential Power Analysis)",
        "SYN Flood attack",
        "Man-in-the-Middle attack",
        "Directory Traversal attack"
      ],
      "correctAnswer": "Side-Channel Attack (e.g., Differential Power Analysis)"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Computer Architecture for Security (CYB 202) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Computer Architecture for Security is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Computer Architecture for Security for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Computer Architecture for Security integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Computer Architecture for Security (CYB 202) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Computer Architecture for Security.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Computer Architecture for Security guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Computer Architecture for Security at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Computer Architecture for Security leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "CYB 204",
    title: "Secure Programming",
    level: 200,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "What software vulnerability occurs when an application writes more data to a memory buffer than it was allocated, overwriting adjacent memory?",
      "options": [
        "Buffer Overflow",
        "Race Condition",
        "Cross-Site Scripting",
        "Null Pointer Dereference"
      ],
      "correctAnswer": "Buffer Overflow"
    },
      {
      "type": "cbt",
      "question": "Which dangerous C standard library function does NOT check destination buffer boundaries and is notoriously prone to buffer overflows?",
      "options": [
        "strcpy()",
        "strncpy()",
        "fgets()",
        "snprintf()"
      ],
      "correctAnswer": "strcpy()"
    },
      {
      "type": "cbt",
      "question": "What is a \"Stack Canary\" used for in compiled binaries?",
      "options": [
        "A small pseudo-random value placed before the stack return address to detect buffer overflow tampering before function return",
        "An antivirus icon on the desktop",
        "A compiler code optimizer",
        "A memory leak detector"
      ],
      "correctAnswer": "A small pseudo-random value placed before the stack return address to detect buffer overflow tampering before function return"
    },
      {
      "type": "cbt",
      "question": "What type of software vulnerability occurs when code attempts to use memory after it has already been freed, leading to potential arbitrary code execution?",
      "options": [
        "Use-After-Free (UAF)",
        "Integer Overflow",
        "SQL Injection",
        "Cross-Site Request Forgery"
      ],
      "correctAnswer": "Use-After-Free (UAF)"
    },
      {
      "type": "cbt",
      "question": "How should sensitive passwords always be stored in a production database?",
      "options": [
        "Hashed with a strong cryptographic algorithm (e.g., Argon2, bcrypt) along with a unique random Salt",
        "Encrypted using Base64 encoding",
        "Stored in plaintext for easy customer service lookup",
        "Reversibly encrypted with a hardcoded static key"
      ],
      "correctAnswer": "Hashed with a strong cryptographic algorithm (e.g., Argon2, bcrypt) along with a unique random Salt"
    },
      {
      "type": "cbt",
      "question": "What is input validation principle: \"Whitelisting\" vs \"Blacklisting\"?",
      "options": [
        "Whitelisting accepts only explicitly permitted known-good inputs, whereas blacklisting tries to block known-bad inputs",
        "Blacklisting is universally more secure than whitelisting",
        "Whitelisting converts strings to integers",
        "Blacklisting checks memory addresses"
      ],
      "correctAnswer": "Whitelisting accepts only explicitly permitted known-good inputs, whereas blacklisting tries to block known-bad inputs"
    },
      {
      "type": "cbt",
      "question": "What vulnerability occurs when an application uses untrusted user input directly in an OS system command (e.g., system() or exec())?",
      "options": [
        "Command Injection",
        "Buffer Overflow",
        "Denial of Service",
        "Memory Corruption"
      ],
      "correctAnswer": "Command Injection"
    },
      {
      "type": "cbt",
      "question": "What is Integer Overflow in low-level programming?",
      "options": [
        "An arithmetic operation attempts to create a numeric value outside the maximum representable range of the data type, wrapping around",
        "Dividing an integer by zero",
        "Converting an integer to a float",
        "Allocating an integer on the heap"
      ],
      "correctAnswer": "An arithmetic operation attempts to create a numeric value outside the maximum representable range of the data type, wrapping around"
    },
      {
      "type": "cbt",
      "question": "Which secure coding practice ensures that database queries are protected against SQL Injection by separating SQL query structure from data values?",
      "options": [
        "Parameterized Queries (Prepared Statements)",
        "Regular Expression blacklisting",
        "Concatenating strings using escape characters",
        "Disabling database transactions"
      ],
      "correctAnswer": "Parameterized Queries (Prepared Statements)"
    },
      {
      "type": "cbt",
      "question": "What is Static Application Security Testing (SAST)?",
      "options": [
        "Analyzing application source code or bytecode for security vulnerabilities without executing the program",
        "Testing application responses during runtime live attacks",
        "Testing server physical cooling units",
        "Conducting user survey interviews"
      ],
      "correctAnswer": "Analyzing application source code or bytecode for security vulnerabilities without executing the program"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Secure Programming (CYB 204) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Secure Programming is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Secure Programming for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Secure Programming integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Secure Programming (CYB 204) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Secure Programming.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Secure Programming guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Secure Programming at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Secure Programming leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "CSC 201",
    title: "Computer Programming I",
    level: 200,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Computer Programming (CSC 201), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Computer Programming in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Computer Programming in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Computer Programming?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Computer Programming."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Computer Programming."
    },
      {
      "type": "cbt",
      "question": "At 200 level in CSC 201 (Computer Programming), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Computer Programming?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Computer Programming (CSC 201)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Computer Programming?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Computer Programming, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Computer Programming (CSC 201)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Computer Programming?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 200-level curriculum, what is the expected learning outcome for Computer Programming?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Computer Programming (CSC 201) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Computer Programming is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Computer Programming for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Computer Programming integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Computer Programming (CSC 201) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Computer Programming.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Computer Programming guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Computer Programming at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Computer Programming leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "CSC 205",
    title: "Digital Logic Design",
    level: 200,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Digital Logic Design (CSC 205), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Digital Logic Design in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Digital Logic Design in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Digital Logic Design?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Digital Logic Design."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Digital Logic Design."
    },
      {
      "type": "cbt",
      "question": "At 200 level in CSC 205 (Digital Logic Design), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Digital Logic Design?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Digital Logic Design (CSC 205)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Digital Logic Design?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Digital Logic Design, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Digital Logic Design (CSC 205)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Digital Logic Design?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 200-level curriculum, what is the expected learning outcome for Digital Logic Design?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Digital Logic Design (CSC 205) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Digital Logic Design is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Digital Logic Design for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Digital Logic Design integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Digital Logic Design (CSC 205) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Digital Logic Design.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Digital Logic Design guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Digital Logic Design at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Digital Logic Design leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "MTH 201",
    title: "Mathematical Methods I",
    level: 200,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Mathematical Methods (MTH 201), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Mathematical Methods in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Mathematical Methods in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Mathematical Methods?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Mathematical Methods."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Mathematical Methods."
    },
      {
      "type": "cbt",
      "question": "At 200 level in MTH 201 (Mathematical Methods), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Mathematical Methods?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Mathematical Methods (MTH 201)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Mathematical Methods?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Mathematical Methods, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Mathematical Methods (MTH 201)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Mathematical Methods?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 200-level curriculum, what is the expected learning outcome for Mathematical Methods?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Mathematical Methods (MTH 201) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Mathematical Methods is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Mathematical Methods for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Mathematical Methods integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Mathematical Methods (MTH 201) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Mathematical Methods.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Mathematical Methods guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Mathematical Methods at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Mathematical Methods leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "STA 201",
    title: "Statistics for Physical Sciences",
    level: 200,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Statistics for Physical Sciences (STA 201), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Statistics for Physical Sciences in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Statistics for Physical Sciences in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Statistics for Physical Sciences?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Statistics for Physical Sciences."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Statistics for Physical Sciences."
    },
      {
      "type": "cbt",
      "question": "At 200 level in STA 201 (Statistics for Physical Sciences), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Statistics for Physical Sciences?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Statistics for Physical Sciences (STA 201)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Statistics for Physical Sciences?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Statistics for Physical Sciences, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Statistics for Physical Sciences (STA 201)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Statistics for Physical Sciences?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 200-level curriculum, what is the expected learning outcome for Statistics for Physical Sciences?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Statistics for Physical Sciences (STA 201) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Statistics for Physical Sciences is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Statistics for Physical Sciences for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Statistics for Physical Sciences integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Statistics for Physical Sciences (STA 201) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Statistics for Physical Sciences.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Statistics for Physical Sciences guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Statistics for Physical Sciences at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Statistics for Physical Sciences leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "CSC 202",
    title: "Computer Programming II",
    level: 200,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Computer Programming (CSC 202), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Computer Programming in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Computer Programming in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Computer Programming?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Computer Programming."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Computer Programming."
    },
      {
      "type": "cbt",
      "question": "At 200 level in CSC 202 (Computer Programming), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Computer Programming?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Computer Programming (CSC 202)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Computer Programming?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Computer Programming, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Computer Programming (CSC 202)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Computer Programming?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 200-level curriculum, what is the expected learning outcome for Computer Programming?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Computer Programming (CSC 202) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Computer Programming is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Computer Programming for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Computer Programming integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Computer Programming (CSC 202) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Computer Programming.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Computer Programming guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Computer Programming at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Computer Programming leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "CSC 204",
    title: "Data Structures and Algorithms I",
    level: 200,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Data Structures and Algorithms (CSC 204), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Data Structures and Algorithms in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Data Structures and Algorithms in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Data Structures and Algorithms?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Data Structures and Algorithms."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Data Structures and Algorithms."
    },
      {
      "type": "cbt",
      "question": "At 200 level in CSC 204 (Data Structures and Algorithms), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Data Structures and Algorithms?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Data Structures and Algorithms (CSC 204)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Data Structures and Algorithms?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Data Structures and Algorithms, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Data Structures and Algorithms (CSC 204)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Data Structures and Algorithms?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 200-level curriculum, what is the expected learning outcome for Data Structures and Algorithms?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Data Structures and Algorithms (CSC 204) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Data Structures and Algorithms is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Data Structures and Algorithms for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Data Structures and Algorithms integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Data Structures and Algorithms (CSC 204) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Data Structures and Algorithms.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Data Structures and Algorithms guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Data Structures and Algorithms at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Data Structures and Algorithms leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "GST 201",
    title: "Entrepreneurship Studies I",
    level: 200,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Entrepreneurship Studies (GST 201), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Entrepreneurship Studies in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Entrepreneurship Studies in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Entrepreneurship Studies?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Entrepreneurship Studies."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Entrepreneurship Studies."
    },
      {
      "type": "cbt",
      "question": "At 200 level in GST 201 (Entrepreneurship Studies), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Entrepreneurship Studies?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Entrepreneurship Studies (GST 201)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Entrepreneurship Studies?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Entrepreneurship Studies, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Entrepreneurship Studies (GST 201)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Entrepreneurship Studies?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 200-level curriculum, what is the expected learning outcome for Entrepreneurship Studies?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Entrepreneurship Studies (GST 201) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Entrepreneurship Studies is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Entrepreneurship Studies for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Entrepreneurship Studies integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Entrepreneurship Studies (GST 201) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Entrepreneurship Studies.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Entrepreneurship Studies guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Entrepreneurship Studies at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Entrepreneurship Studies leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  }
];
