// src/seed/faculties/fci.ts
import type { SeedFaculty } from '../types.js';
import { csc100Courses } from './fci/csc100.js';
import { csc200Courses } from './fci/csc200.js';
import { csc300Courses } from './fci/csc300.js';
import { csc400Courses } from './fci/csc400.js';
import { csc500Courses } from './fci/csc500.js';

export const fciFaculty: SeedFaculty = {
  facultyName: 'Faculty of Computing and Informatics',
  code: 'FCI',
  departments: [
    {
      deptName: 'Computer Science',
      code: 'CSC',
      courses: [
        ...csc100Courses,
        ...csc200Courses,
        ...csc300Courses,
        ...csc400Courses,
        ...csc500Courses,
      ],
    },
    {
      deptName: 'Cyber Security Science',
      code: 'CYB',
      courses: [
        // 100 Level
        {
          code: 'CYB 101',
          title: 'Introduction to Cyber Security',
          level: 100,
          semester: 'harmattan',
          questions: [
            {
              type: 'cbt',
              question: 'What does the CIA triad stand for in information security?',
              options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Control, Identification, Authentication', 'Cyber, Internet, Application'],
              correctAnswer: 'Confidentiality, Integrity, Availability',
            },
            {
              type: 'cbt',
              question: 'Which type of attack involves tricking users into revealing sensitive credentials through fraudulent emails?',
              options: ['DDoS', 'Phishing', 'SQL Injection', 'Man-in-the-Middle'],
              correctAnswer: 'Phishing',
            },
            {
              type: 'cbt',
              question: 'What is malware designed to encrypt victim files and demand payment for the decryption key called?',
              options: ['Spyware', 'Adware', 'Ransomware', 'Trojan Horse'],
              correctAnswer: 'Ransomware',
            },
            {
              type: 'cbt',
              question: 'What is a vulnerability in cybersecurity?',
              options: ['A malicious software program', 'A weakness or flaw in system design, implementation, or operation', 'An authorized security audit', 'A hardware firewall device'],
              correctAnswer: 'A weakness or flaw in system design, implementation, or operation',
            },
            {
              type: 'cbt',
              question: 'Which principle of security states that users should be granted only the minimum access rights necessary to perform their jobs?',
              options: ['Principle of Least Privilege', 'Defense in Depth', 'Fail-Safe Defaults', 'Open Design'],
              correctAnswer: 'Principle of Least Privilege',
            },
            {
              type: 'cbt',
              question: 'What type of malware disguises itself as legitimate or harmless software to deceive users into installing it?',
              options: ['Worm', 'Rootkit', 'Trojan Horse', 'Logic Bomb'],
              correctAnswer: 'Trojan Horse',
            },
            {
              type: 'cbt',
              question: 'What form of social engineering occurs in person by following an authorized individual through a secure door without badges?',
              options: ['Tailgating / Piggybacking', 'Phishing', 'Vishing', 'Watering Hole attack'],
              correctAnswer: 'Tailgating / Piggybacking',
            },
            {
              type: 'cbt',
              question: 'Which of the following is a multi-factor authentication (MFA) combination?',
              options: ['Password and PIN', 'Password and fingerprint biometric', 'Username and mother maiden name', 'Two different passwords'],
              correctAnswer: 'Password and fingerprint biometric',
            },
            {
              type: 'cbt',
              question: 'What is a computer compromised by malware and controlled remotely as part of a botnet called?',
              options: ['Zombie', 'Honeypot', 'Firewall', 'Proxy'],
              correctAnswer: 'Zombie',
            },
            {
              type: 'cbt',
              question: 'Which term describes an unpatched security flaw actively exploited before the vendor becomes aware or releases a fix?',
              options: ['Zero-Day Vulnerability', 'Buffer Overflow', 'Syntax Error', 'Deadlock'],
              correctAnswer: 'Zero-Day Vulnerability',
            },
          ],
        },
        { code: 'CSC 101', title: 'Introduction to Computer Science', level: 100, semester: 'harmattan', questions: [] },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'CYB 102', title: 'Fundamentals of Computing & Cyber Ethics', level: 100, semester: 'rain', questions: [] },
        { code: 'CSC 102', title: 'Introduction to Problem Solving', level: 100, semester: 'rain', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
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
        { code: 'CYB 203', title: 'Discrete Mathematics for Cyber Security', level: 200, semester: 'harmattan', questions: [] },
        { code: 'CSC 201', title: 'Computer Programming I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'CSC 205', title: 'Digital Logic Design', level: 200, semester: 'harmattan', questions: [] },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'STA 201', title: 'Statistics for Physical Sciences', level: 200, semester: 'harmattan', questions: [] },

        { code: 'CYB 202', title: 'Computer Architecture for Security', level: 200, semester: 'rain', questions: [] },
        { code: 'CYB 204', title: 'Secure Programming', level: 200, semester: 'rain', questions: [] },
        { code: 'CSC 202', title: 'Computer Programming II', level: 200, semester: 'rain', questions: [] },
        { code: 'CSC 204', title: 'Data Structures and Algorithms I', level: 200, semester: 'rain', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'CYB 301', title: 'Network Security & Cryptography', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CYB 303', title: 'Operating Systems Security', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CYB 305', title: 'Database Security & Auditing', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 305', title: 'Database Management Systems', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 311', title: 'Operating Systems', level: 300, semester: 'harmattan', questions: [] },

        { code: 'CYB 302', title: 'Vulnerability Assessment & Penetration Testing', level: 300, semester: 'rain', questions: [] },
        { code: 'CYB 304', title: 'Biometrics & Authentication Systems', level: 300, semester: 'rain', questions: [] },
        { code: 'CSC 306', title: 'Computer Networks & Communications', level: 300, semester: 'rain', questions: [] },
        { code: 'CYB 399', title: 'SIWES Industrial Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'CYB 403', title: 'Digital Forensics', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CYB 405', title: 'Cyber Threat Intelligence', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CYB 411', title: 'Cloud Security', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CYB 415', title: 'Ethical Hacking', level: 400, semester: 'harmattan', questions: [] },

        { code: 'CYB 402', title: 'Wireless & Mobile Security', level: 400, semester: 'rain', questions: [] },
        { code: 'CYB 404', title: 'Cyber Risk Assessment & Incident Response', level: 400, semester: 'rain', questions: [] },
        { code: 'CYB 499', title: 'B.Sc. Research Project I', level: 400, semester: 'rain', questions: [] },

        // 500 Level
        { code: 'CYB 501', title: 'Information Security Management', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CYB 503', title: 'Critical Infrastructure Protection', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CYB 509', title: 'Malware Analysis', level: 500, semester: 'harmattan', questions: [] },

        { code: 'CYB 502', title: 'Cyber Governance, Law & Privacy', level: 500, semester: 'rain', questions: [] },
        { code: 'CYB 504', title: 'Blockchain & Cryptographic Protocols', level: 500, semester: 'rain', questions: [] },
        { code: 'CYB 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Information Systems',
      code: 'INS',
      courses: [
        // 100 Level
        {
          code: 'INS 101',
          title: 'Foundations of Information Systems',
          level: 100,
          semester: 'harmattan',
          questions: [
            {
              type: 'cbt',
              question: 'What is an Information System?',
              options: ['A collection of hardware only', 'An integrated set of components for collecting, storing, and processing data', 'A type of operating system', 'A network cable system'],
              correctAnswer: 'An integrated set of components for collecting, storing, and processing data',
            },
            {
              type: 'cbt',
              question: 'Which of the following is an example of a Transaction Processing System (TPS)?',
              options: ['Executive dashboard', 'Point of Sale (POS) supermarket cash register', 'Data warehouse reporting tool', 'Expert system shell'],
              correctAnswer: 'Point of Sale (POS) supermarket cash register',
            },
            {
              type: 'cbt',
              question: 'What are the five essential components of any computer-based information system?',
              options: ['Hardware, Software, Data, Procedures, and People', 'CPU, RAM, Hard Disk, Monitor, Keyboard', 'Input, Process, Output, Storage, Control', 'Java, Python, C++, SQL, HTML'],
              correctAnswer: 'Hardware, Software, Data, Procedures, and People',
            },
            {
              type: 'cbt',
              question: 'What is the distinction between Data and Information?',
              options: ['Data is processed output; information is raw facts', 'Data is raw unorganized facts; information is processed meaningful data', 'Data and information are completely identical', 'Information is stored only in RAM'],
              correctAnswer: 'Data is raw unorganized facts; information is processed meaningful data',
            },
            {
              type: 'cbt',
              question: 'Which type of information system is tailored to provide senior executives with high-level summarized strategic metrics?',
              options: ['Executive Support System (ESS / EIS)', 'Transaction Processing System (TPS)', 'Process Control System', 'Office Automation System (OAS)'],
              correctAnswer: 'Executive Support System (ESS / EIS)',
            },
            {
              type: 'cbt',
              question: 'What does ERP stand for in enterprise information systems?',
              options: ['Enterprise Resource Planning', 'Electronic Record Processing', 'Entity Relationship Protocol', 'Extended Routing Process'],
              correctAnswer: 'Enterprise Resource Planning',
            },
            {
              type: 'cbt',
              question: 'Which system helps organizations capture, organize, and share intellectual knowledge assets among employees?',
              options: ['Knowledge Management System (KMS)', 'Decision Support System', 'Supply Chain System', 'Point of Sale System'],
              correctAnswer: 'Knowledge Management System (KMS)',
            },
            {
              type: 'cbt',
              question: 'What does CRM stand for in customer-facing information systems?',
              options: ['Customer Relationship Management', 'Central Resource Model', 'Client Record Maintenance', 'Corporate Risk Mitigation'],
              correctAnswer: 'Customer Relationship Management',
            },
            {
              type: 'cbt',
              question: 'In information systems analysis, what is a Business Process?',
              options: ['A computer assembly line', 'A set of logically related activities executed to achieve a specific business outcome', 'A company annual tax filing', 'A network wiring blueprint'],
              correctAnswer: 'A set of logically related activities executed to achieve a specific business outcome',
            },
            {
              type: 'cbt',
              question: 'Which competitive advantage framework identifies Five Competitive Forces shaping an industry?',
              options: ['Michael Porter Five Forces Model', 'Maslow Hierarchy', 'McKinsey 7S Framework', 'Boston Consulting Group Matrix'],
              correctAnswer: 'Michael Porter Five Forces Model',
            },
          ],
        },
        { code: 'CSC 101', title: 'Introduction to Computer Science', level: 100, semester: 'harmattan', questions: [] },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'INS 102', title: 'Business Processes & Information Tech', level: 100, semester: 'rain', questions: [] },
        { code: 'CSC 102', title: 'Introduction to Problem Solving', level: 100, semester: 'rain', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'INS 207',
          title: 'Database Systems & Information Management',
          level: 200,
          semester: 'harmattan',
          questions: [
            {
              type: 'cbt',
              question: 'What is the primary query language used to define and manipulate data in relational database management systems?',
              options: ['Python', 'SQL', 'C++', 'Java'],
              correctAnswer: 'SQL',
            },
            {
              type: 'cbt',
              question: 'What does a Primary Key constraint enforce on a table column?',
              options: ['Column uniqueness and non-null values', 'Faster network transfer', 'Automatic encryption', 'Foreign key deletion'],
              correctAnswer: 'Column uniqueness and non-null values',
            },
            {
              type: 'cbt',
              question: 'Which SQL command is used to retrieve data records from a database table?',
              options: ['GET', 'SELECT', 'EXTRACT', 'RETRIEVE'],
              correctAnswer: 'SELECT',
            },
            {
              type: 'cbt',
              question: 'What type of key establishes a link and referential integrity constraint between two tables?',
              options: ['Foreign Key', 'Primary Key', 'Candidate Key', 'Super Key'],
              correctAnswer: 'Foreign Key',
            },
            {
              type: 'cbt',
              question: 'Which SQL clause is used to filter records based on a specified boolean condition?',
              options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
              correctAnswer: 'WHERE',
            },
            {
              type: 'cbt',
              question: 'What does the SQL statement "DROP TABLE Customers;" perform?',
              options: ['Deletes all records while keeping the table structure', 'Permanently removes the table structure and all its data from the database', 'Backs up the table to disk', 'Hides the table from queries'],
              correctAnswer: 'Permanently removes the table structure and all its data from the database',
            },
            {
              type: 'cbt',
              question: 'Which join type returns all rows from the left table, and matching rows from the right table (filling nulls for non-matches)?',
              options: ['INNER JOIN', 'LEFT (OUTER) JOIN', 'RIGHT (OUTER) JOIN', 'CROSS JOIN'],
              correctAnswer: 'LEFT (OUTER) JOIN',
            },
            {
              type: 'cbt',
              question: 'What database operation groups rows sharing identical values in summary queries (e.g., COUNT, AVG)?',
              options: ['ORDER BY', 'GROUP BY', 'PARTITION BY', 'DISTINCT'],
              correctAnswer: 'GROUP BY',
            },
            {
              type: 'cbt',
              question: 'What is a Data Dictionary in database management?',
              options: ['A repository storing metadata about data schemas, tables, fields, and constraints', 'A spelling checker for SQL queries', 'A backup archive on tape', 'A client user guide'],
              correctAnswer: 'A repository storing metadata about data schemas, tables, fields, and constraints',
            },
            {
              type: 'cbt',
              question: 'Which SQL keyword ensures that query result rows do not contain duplicate values?',
              options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'PRIMARY'],
              correctAnswer: 'DISTINCT',
            },
          ],
        },
        { code: 'INS 201', title: 'Fundamentals of Enterprise Systems', level: 200, semester: 'harmattan', questions: [] },
        { code: 'CSC 201', title: 'Computer Programming I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'STA 201', title: 'Statistics for Physical Sciences', level: 200, semester: 'harmattan', questions: [] },

        { code: 'INS 202', title: 'Business Data Communications', level: 200, semester: 'rain', questions: [] },
        { code: 'INS 204', title: 'Web Systems & E-Commerce', level: 200, semester: 'rain', questions: [] },
        { code: 'CSC 202', title: 'Computer Programming II', level: 200, semester: 'rain', questions: [] },
        { code: 'CSC 204', title: 'Data Structures and Algorithms I', level: 200, semester: 'rain', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'INS 301', title: 'Systems Analysis & Design', level: 300, semester: 'harmattan', questions: [] },
        { code: 'INS 303', title: 'Decision Support Systems & Business Intelligence', level: 300, semester: 'harmattan', questions: [] },
        { code: 'INS 305', title: 'Information Storage & Retrieval', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 305', title: 'Database Management Systems', level: 300, semester: 'harmattan', questions: [] },

        { code: 'INS 302', title: 'Enterprise Resource Planning (ERP) Systems', level: 300, semester: 'rain', questions: [] },
        { code: 'INS 304', title: 'IS Audit and Controls', level: 300, semester: 'rain', questions: [] },
        { code: 'CSC 304', title: 'Software Engineering Principles', level: 300, semester: 'rain', questions: [] },
        { code: 'INS 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'INS 401', title: 'Project Management', level: 400, semester: 'harmattan', questions: [] },
        { code: 'INS 403', title: 'Data Warehousing & Business Analytics', level: 400, semester: 'harmattan', questions: [] },
        { code: 'INS 407', title: 'IT Project Management', level: 400, semester: 'harmattan', questions: [] },

        { code: 'INS 402', title: 'Knowledge Management Systems', level: 400, semester: 'rain', questions: [] },
        { code: 'INS 404', title: 'Global Information Technology Management', level: 400, semester: 'rain', questions: [] },
        { code: 'INS 499', title: 'B.Sc. Final Year Project I', level: 400, semester: 'rain', questions: [] },

        // 500 Level
        { code: 'INS 503', title: 'Big Data Architecture & Analytics', level: 500, semester: 'harmattan', questions: [] },
        { code: 'INS 515', title: 'Information Systems Strategy & Governance', level: 500, semester: 'harmattan', questions: [] },

        { code: 'INS 502', title: 'Digital Transformation & Innovation', level: 500, semester: 'rain', questions: [] },
        { code: 'INS 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
  ],
};
