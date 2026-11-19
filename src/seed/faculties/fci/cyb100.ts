// src/seed/faculties/fci/cyb100.ts
import type { SeedCourse } from '../../types.js';

export const cyb100Courses: SeedCourse[] = [
  {
    code: "CYB 101",
    title: "Introduction to Cyber Security",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "What does the CIA triad stand for in information security?",
      "options": [
        "Central Intelligence Agency",
        "Confidentiality, Integrity, Availability",
        "Control, Identification, Authentication",
        "Cyber, Internet, Application"
      ],
      "correctAnswer": "Confidentiality, Integrity, Availability"
    },
      {
      "type": "cbt",
      "question": "Which type of attack involves tricking users into revealing sensitive credentials through fraudulent emails?",
      "options": [
        "DDoS",
        "Phishing",
        "SQL Injection",
        "Man-in-the-Middle"
      ],
      "correctAnswer": "Phishing"
    },
      {
      "type": "cbt",
      "question": "What is malware designed to encrypt victim files and demand payment for the decryption key called?",
      "options": [
        "Spyware",
        "Adware",
        "Ransomware",
        "Trojan Horse"
      ],
      "correctAnswer": "Ransomware"
    },
      {
      "type": "cbt",
      "question": "What is a vulnerability in cybersecurity?",
      "options": [
        "A malicious software program",
        "A weakness or flaw in system design, implementation, or operation",
        "An authorized security audit",
        "A hardware firewall device"
      ],
      "correctAnswer": "A weakness or flaw in system design, implementation, or operation"
    },
      {
      "type": "cbt",
      "question": "Which principle of security states that users should be granted only the minimum access rights necessary to perform their jobs?",
      "options": [
        "Principle of Least Privilege",
        "Defense in Depth",
        "Fail-Safe Defaults",
        "Open Design"
      ],
      "correctAnswer": "Principle of Least Privilege"
    },
      {
      "type": "cbt",
      "question": "What type of malware disguises itself as legitimate or harmless software to deceive users into installing it?",
      "options": [
        "Worm",
        "Rootkit",
        "Trojan Horse",
        "Logic Bomb"
      ],
      "correctAnswer": "Trojan Horse"
    },
      {
      "type": "cbt",
      "question": "What form of social engineering occurs in person by following an authorized individual through a secure door without badges?",
      "options": [
        "Tailgating / Piggybacking",
        "Phishing",
        "Vishing",
        "Watering Hole attack"
      ],
      "correctAnswer": "Tailgating / Piggybacking"
    },
      {
      "type": "cbt",
      "question": "Which of the following is a multi-factor authentication (MFA) combination?",
      "options": [
        "Password and PIN",
        "Password and fingerprint biometric",
        "Username and mother maiden name",
        "Two different passwords"
      ],
      "correctAnswer": "Password and fingerprint biometric"
    },
      {
      "type": "cbt",
      "question": "What is a computer compromised by malware and controlled remotely as part of a botnet called?",
      "options": [
        "Zombie",
        "Honeypot",
        "Firewall",
        "Proxy"
      ],
      "correctAnswer": "Zombie"
    },
      {
      "type": "cbt",
      "question": "Which term describes an unpatched security flaw actively exploited before the vendor becomes aware or releases a fix?",
      "options": [
        "Zero-Day Vulnerability",
        "Buffer Overflow",
        "Syntax Error",
        "Deadlock"
      ],
      "correctAnswer": "Zero-Day Vulnerability"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Introduction to Cyber Security (CYB 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Introduction to Cyber Security is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Introduction to Cyber Security for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Introduction to Cyber Security integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Introduction to Cyber Security (CYB 101) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Introduction to Cyber Security.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Introduction to Cyber Security guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Introduction to Cyber Security at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Introduction to Cyber Security leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "CYB 103",
    title: "Foundations of Computing & Cybersecurity Lab",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "Which command-line tool is standardly used in Linux to test network connectivity and measure round-trip latency to a host?",
      "options": [
        "ping",
        "traceroute",
        "ifconfig",
        "netstat"
      ],
      "correctAnswer": "ping"
    },
      {
      "type": "cbt",
      "question": "What does the Linux command \"chmod 700 filename\" set permissions to?",
      "options": [
        "Read, write, and execute for owner only",
        "Read and execute for all users",
        "Read only for owner",
        "Full public access for everyone"
      ],
      "correctAnswer": "Read, write, and execute for owner only"
    },
      {
      "type": "cbt",
      "question": "Which network utility displays all active network connections and listening ports on a local computer?",
      "options": [
        "netstat",
        "nslookup",
        "grep",
        "mkdir"
      ],
      "correctAnswer": "netstat"
    },
      {
      "type": "cbt",
      "question": "What is the standard loopback IP address in IPv4 networking?",
      "options": [
        "127.0.0.1",
        "192.168.1.1",
        "10.0.0.1",
        "255.255.255.0"
      ],
      "correctAnswer": "127.0.0.1"
    },
      {
      "type": "cbt",
      "question": "Which cryptographic hash utility is used on Linux terminals to verify file download integrity?",
      "options": [
        "sha256sum",
        "cat",
        "diff",
        "chmod"
      ],
      "correctAnswer": "sha256sum"
    },
      {
      "type": "cbt",
      "question": "What does the command \"ipconfig /all\" do in a Windows command prompt?",
      "options": [
        "Displays detailed TCP/IP network configuration and MAC addresses",
        "Reboots the network adapter",
        "Clears DNS cache",
        "Pings the gateway router"
      ],
      "correctAnswer": "Displays detailed TCP/IP network configuration and MAC addresses"
    },
      {
      "type": "cbt",
      "question": "Which terminal text editor in Linux is famous for its distinct Command Mode and Insert Mode?",
      "options": [
        "Vim",
        "Nano",
        "Notepad",
        "Gedit"
      ],
      "correctAnswer": "Vim"
    },
      {
      "type": "cbt",
      "question": "What does the command \"traceroute\" (or \"tracert\") display?",
      "options": [
        "The series of routers/hops a packet traverses to reach a destination",
        "The CPU utilization history",
        "The list of installed software",
        "The Wi-Fi password in plaintext"
      ],
      "correctAnswer": "The series of routers/hops a packet traverses to reach a destination"
    },
      {
      "type": "cbt",
      "question": "In a virtualized security sandbox lab, what software component isolates the guest operating system from host hardware?",
      "options": [
        "Hypervisor",
        "Compiler",
        "BIOS Battery",
        "Sound Driver"
      ],
      "correctAnswer": "Hypervisor"
    },
      {
      "type": "cbt",
      "question": "What is a Live USB distribution like Kali Linux commonly used for in cyber security labs?",
      "options": [
        "Booting a portable environment for penetration testing and forensics without altering the host hard drive",
        "Speeding up computer gaming",
        "Installing office spreadsheets",
        "Formatting external hard drives automatically"
      ],
      "correctAnswer": "Booting a portable environment for penetration testing and forensics without altering the host hard drive"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Foundations of Computing & Cybersecurity Lab (CYB 103) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Foundations of Computing & Cybersecurity Lab is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Foundations of Computing & Cybersecurity Lab for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Foundations of Computing & Cybersecurity Lab integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Foundations of Computing & Cybersecurity Lab (CYB 103) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Foundations of Computing & Cybersecurity Lab.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Foundations of Computing & Cybersecurity Lab guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Foundations of Computing & Cybersecurity Lab at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Foundations of Computing & Cybersecurity Lab leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "CYB 102",
    title: "Fundamentals of Computing & Cyber Ethics",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "What does Cyber Ethics study?",
      "options": [
        "The moral, legal, and social issues involving cyber technology and user behavior",
        "The physical assembly of server chassis",
        "The mathematical design of microprocessors",
        "The speed optimization of graphics cards"
      ],
      "correctAnswer": "The moral, legal, and social issues involving cyber technology and user behavior"
    },
      {
      "type": "cbt",
      "question": "What is a White Hat Hacker?",
      "options": [
        "An ethical security professional who probes systems for vulnerabilities with prior authorization",
        "A malicious attacker stealing credit cards",
        "An amateur downloading hacking scripts without understanding",
        "A state-sponsored spy"
      ],
      "correctAnswer": "An ethical security professional who probes systems for vulnerabilities with prior authorization"
    },
      {
      "type": "cbt",
      "question": "What Nigerian legislation provides the legal framework for the prohibition and prevention of cybercrimes?",
      "options": [
        "Cybercrimes (Prohibition, Prevention, etc.) Act 2015",
        "Companies and Allied Matters Act",
        "Evidence Act 2011",
        "Criminal Code Act 1916"
      ],
      "correctAnswer": "Cybercrimes (Prohibition, Prevention, etc.) Act 2015"
    },
      {
      "type": "cbt",
      "question": "What is Plagiarism in computing and academic research?",
      "options": [
        "Using someone else code, writing, or ideas without proper attribution",
        "Installing open-source software with permission",
        "Pair programming with a classmate",
        "Borrowing a book from the library"
      ],
      "correctAnswer": "Using someone else code, writing, or ideas without proper attribution"
    },
      {
      "type": "cbt",
      "question": "What is a Non-Disclosure Agreement (NDA)?",
      "options": [
        "A legally binding contract where parties agree not to disclose confidential information shared with them",
        "A license for downloading video games",
        "A network routing handshake protocol",
        "A firewall rule specification"
      ],
      "correctAnswer": "A legally binding contract where parties agree not to disclose confidential information shared with them"
    },
      {
      "type": "cbt",
      "question": "Which term describes malicious activity targeting individuals online through repeated harassment, threats, or intimidation?",
      "options": [
        "Cyberbullying / Cyberharassment",
        "Spamming",
        "Phishing",
        "Data Mining"
      ],
      "correctAnswer": "Cyberbullying / Cyberharassment"
    },
      {
      "type": "cbt",
      "question": "What ethical principle requires obtaining clear user permission before collecting, processing, or storing personal data?",
      "options": [
        "Informed Consent",
        "Copyright Infringement",
        "Right to Exploit",
        "Fair Use"
      ],
      "correctAnswer": "Informed Consent"
    },
      {
      "type": "cbt",
      "question": "What is Intellectual Property (IP) in the software industry?",
      "options": [
        "Creations of the mind such as software source code, algorithms, and designs protected by law",
        "Physical computer servers and switches",
        "A public IP address leased from an ISP",
        "Computer memory and cache storage"
      ],
      "correctAnswer": "Creations of the mind such as software source code, algorithms, and designs protected by law"
    },
      {
      "type": "cbt",
      "question": "What is a \"Grey Hat\" hacker?",
      "options": [
        "A hacker who may violate laws or ethical standards without malicious intent, often disclosing flaws to vendors",
        "A purely benevolent authorized auditor",
        "A cybercriminal engaged in ransomware extortion",
        "A novice computer user"
      ],
      "correctAnswer": "A hacker who may violate laws or ethical standards without malicious intent, often disclosing flaws to vendors"
    },
      {
      "type": "cbt",
      "question": "What international framework protects individuals personal data and privacy in digital spaces (pioneered in the EU)?",
      "options": [
        "General Data Protection Regulation (GDPR)",
        "HIPAA",
        "PCI-DSS",
        "SOX"
      ],
      "correctAnswer": "General Data Protection Regulation (GDPR)"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Fundamentals of Computing & Cyber Ethics (CYB 102) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Fundamentals of Computing & Cyber Ethics is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Fundamentals of Computing & Cyber Ethics for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Fundamentals of Computing & Cyber Ethics integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Fundamentals of Computing & Cyber Ethics (CYB 102) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Fundamentals of Computing & Cyber Ethics.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Fundamentals of Computing & Cyber Ethics guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Fundamentals of Computing & Cyber Ethics at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Fundamentals of Computing & Cyber Ethics leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "CSC 101",
    title: "Introduction to Computer Science",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Introduction to Computer Science (CSC 101), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Introduction to Computer Science in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Introduction to Computer Science in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Introduction to Computer Science?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Introduction to Computer Science."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Introduction to Computer Science."
    },
      {
      "type": "cbt",
      "question": "At 100 level in CSC 101 (Introduction to Computer Science), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in Introduction to Computer Science?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Introduction to Computer Science (CSC 101)?",
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
      "question": "How do practitioners and researchers address complex constraints in Introduction to Computer Science?",
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
      "question": "In Introduction to Computer Science, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in Introduction to Computer Science (CSC 101)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Introduction to Computer Science?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Introduction to Computer Science?",
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
      "question": "Explain the fundamental theoretical foundation of Introduction to Computer Science (CSC 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Introduction to Computer Science is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Introduction to Computer Science for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Introduction to Computer Science integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Introduction to Computer Science (CSC 101) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Introduction to Computer Science.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Introduction to Computer Science guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Introduction to Computer Science at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Introduction to Computer Science leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "MTH 101",
    title: "Elementary Mathematics I",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Elementary Mathematics (MTH 101), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Elementary Mathematics in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Elementary Mathematics in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Elementary Mathematics?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Elementary Mathematics."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Elementary Mathematics."
    },
      {
      "type": "cbt",
      "question": "At 100 level in MTH 101 (Elementary Mathematics), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in Elementary Mathematics?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Elementary Mathematics (MTH 101)?",
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
      "question": "How do practitioners and researchers address complex constraints in Elementary Mathematics?",
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
      "question": "In Elementary Mathematics, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in Elementary Mathematics (MTH 101)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Elementary Mathematics?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Elementary Mathematics?",
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
      "question": "Explain the fundamental theoretical foundation of Elementary Mathematics (MTH 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Elementary Mathematics is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Elementary Mathematics for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Elementary Mathematics integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Elementary Mathematics (MTH 101) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Elementary Mathematics.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Elementary Mathematics guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Elementary Mathematics at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Elementary Mathematics leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "PHY 101",
    title: "General Physics I",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of General Physics (PHY 101), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing General Physics in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing General Physics in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in General Physics?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to General Physics."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to General Physics."
    },
      {
      "type": "cbt",
      "question": "At 100 level in PHY 101 (General Physics), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in General Physics?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in General Physics (PHY 101)?",
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
      "question": "How do practitioners and researchers address complex constraints in General Physics?",
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
      "question": "In General Physics, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in General Physics (PHY 101)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in General Physics?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for General Physics?",
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
      "question": "Explain the fundamental theoretical foundation of General Physics (PHY 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "General Physics is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in General Physics for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in General Physics integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to General Physics (PHY 101) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern General Physics.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in General Physics guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting General Physics at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in General Physics leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "CHM 101",
    title: "General Chemistry I",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of General Chemistry (CHM 101), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing General Chemistry in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing General Chemistry in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in General Chemistry?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to General Chemistry."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to General Chemistry."
    },
      {
      "type": "cbt",
      "question": "At 100 level in CHM 101 (General Chemistry), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in General Chemistry?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in General Chemistry (CHM 101)?",
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
      "question": "How do practitioners and researchers address complex constraints in General Chemistry?",
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
      "question": "In General Chemistry, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in General Chemistry (CHM 101)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in General Chemistry?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for General Chemistry?",
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
      "question": "Explain the fundamental theoretical foundation of General Chemistry (CHM 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "General Chemistry is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in General Chemistry for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in General Chemistry integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to General Chemistry (CHM 101) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern General Chemistry.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in General Chemistry guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting General Chemistry at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in General Chemistry leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "GST 111",
    title: "Communication in English I",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Communication in English (GST 111), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Communication in English in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Communication in English in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Communication in English?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Communication in English."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Communication in English."
    },
      {
      "type": "cbt",
      "question": "At 100 level in GST 111 (Communication in English), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in Communication in English?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Communication in English (GST 111)?",
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
      "question": "How do practitioners and researchers address complex constraints in Communication in English?",
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
      "question": "In Communication in English, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in Communication in English (GST 111)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Communication in English?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Communication in English?",
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
      "question": "Explain the fundamental theoretical foundation of Communication in English (GST 111) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Communication in English is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Communication in English for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Communication in English integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Communication in English (GST 111) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Communication in English.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Communication in English guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Communication in English at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Communication in English leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "LIB 101",
    title: "Use of Library and Study Skills",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Use of Library and Study Skills (LIB 101), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Use of Library and Study Skills in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Use of Library and Study Skills in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Use of Library and Study Skills?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Use of Library and Study Skills."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Use of Library and Study Skills."
    },
      {
      "type": "cbt",
      "question": "At 100 level in LIB 101 (Use of Library and Study Skills), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in Use of Library and Study Skills?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Use of Library and Study Skills (LIB 101)?",
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
      "question": "How do practitioners and researchers address complex constraints in Use of Library and Study Skills?",
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
      "question": "In Use of Library and Study Skills, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in Use of Library and Study Skills (LIB 101)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Use of Library and Study Skills?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Use of Library and Study Skills?",
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
      "question": "Explain the fundamental theoretical foundation of Use of Library and Study Skills (LIB 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Use of Library and Study Skills is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Use of Library and Study Skills for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Use of Library and Study Skills integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Use of Library and Study Skills (LIB 101) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Use of Library and Study Skills.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Use of Library and Study Skills guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Use of Library and Study Skills at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Use of Library and Study Skills leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "CSC 102",
    title: "Introduction to Problem Solving",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Introduction to Problem Solving (CSC 102), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Introduction to Problem Solving in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Introduction to Problem Solving in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Introduction to Problem Solving?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Introduction to Problem Solving."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Introduction to Problem Solving."
    },
      {
      "type": "cbt",
      "question": "At 100 level in CSC 102 (Introduction to Problem Solving), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in Introduction to Problem Solving?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Introduction to Problem Solving (CSC 102)?",
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
      "question": "How do practitioners and researchers address complex constraints in Introduction to Problem Solving?",
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
      "question": "In Introduction to Problem Solving, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in Introduction to Problem Solving (CSC 102)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Introduction to Problem Solving?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Introduction to Problem Solving?",
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
      "question": "Explain the fundamental theoretical foundation of Introduction to Problem Solving (CSC 102) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Introduction to Problem Solving is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Introduction to Problem Solving for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Introduction to Problem Solving integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Introduction to Problem Solving (CSC 102) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Introduction to Problem Solving.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Introduction to Problem Solving guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Introduction to Problem Solving at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Introduction to Problem Solving leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "MTH 102",
    title: "Elementary Mathematics II",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Elementary Mathematics (MTH 102), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Elementary Mathematics in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Elementary Mathematics in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Elementary Mathematics?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Elementary Mathematics."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Elementary Mathematics."
    },
      {
      "type": "cbt",
      "question": "At 100 level in MTH 102 (Elementary Mathematics), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in Elementary Mathematics?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Elementary Mathematics (MTH 102)?",
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
      "question": "How do practitioners and researchers address complex constraints in Elementary Mathematics?",
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
      "question": "In Elementary Mathematics, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in Elementary Mathematics (MTH 102)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Elementary Mathematics?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Elementary Mathematics?",
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
      "question": "Explain the fundamental theoretical foundation of Elementary Mathematics (MTH 102) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Elementary Mathematics is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Elementary Mathematics for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Elementary Mathematics integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Elementary Mathematics (MTH 102) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Elementary Mathematics.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Elementary Mathematics guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Elementary Mathematics at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Elementary Mathematics leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "PHY 102",
    title: "General Physics II",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of General Physics (PHY 102), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing General Physics in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing General Physics in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in General Physics?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to General Physics."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to General Physics."
    },
      {
      "type": "cbt",
      "question": "At 100 level in PHY 102 (General Physics), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in General Physics?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in General Physics (PHY 102)?",
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
      "question": "How do practitioners and researchers address complex constraints in General Physics?",
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
      "question": "In General Physics, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in General Physics (PHY 102)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in General Physics?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for General Physics?",
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
      "question": "Explain the fundamental theoretical foundation of General Physics (PHY 102) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "General Physics is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in General Physics for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in General Physics integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to General Physics (PHY 102) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern General Physics.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in General Physics guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting General Physics at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in General Physics leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "CHM 102",
    title: "General Chemistry II",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of General Chemistry (CHM 102), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing General Chemistry in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing General Chemistry in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in General Chemistry?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to General Chemistry."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to General Chemistry."
    },
      {
      "type": "cbt",
      "question": "At 100 level in CHM 102 (General Chemistry), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in General Chemistry?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in General Chemistry (CHM 102)?",
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
      "question": "How do practitioners and researchers address complex constraints in General Chemistry?",
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
      "question": "In General Chemistry, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in General Chemistry (CHM 102)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in General Chemistry?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for General Chemistry?",
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
      "question": "Explain the fundamental theoretical foundation of General Chemistry (CHM 102) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "General Chemistry is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in General Chemistry for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in General Chemistry integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to General Chemistry (CHM 102) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern General Chemistry.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in General Chemistry guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting General Chemistry at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in General Chemistry leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
    code: "GST 121",
    title: "Use of English II & Logic",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Use of English II & Logic (GST 121), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Use of English II & Logic in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Use of English II & Logic in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Use of English II & Logic?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Use of English II & Logic."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Use of English II & Logic."
    },
      {
      "type": "cbt",
      "question": "At 100 level in GST 121 (Use of English II & Logic), how is rigorous methodological evaluation typically performed?",
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
      "question": "What is the significance of error control and validation in Use of English II & Logic?",
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
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Use of English II & Logic (GST 121)?",
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
      "question": "How do practitioners and researchers address complex constraints in Use of English II & Logic?",
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
      "question": "In Use of English II & Logic, why is documentation and standardization critical for professional practice?",
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
      "question": "What is the primary risk of neglecting foundational principles in Use of English II & Logic (GST 121)?",
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
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Use of English II & Logic?",
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
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Use of English II & Logic?",
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
      "question": "Explain the fundamental theoretical foundation of Use of English II & Logic (GST 121) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Use of English II & Logic is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
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
      "question": "Analyze the critical methodologies and analytical tools utilized in Use of English II & Logic for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Use of English II & Logic integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
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
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Use of English II & Logic (GST 121) and outline mitigation strategies.",
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
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Use of English II & Logic.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Use of English II & Logic guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
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
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Use of English II & Logic at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Use of English II & Logic leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
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
