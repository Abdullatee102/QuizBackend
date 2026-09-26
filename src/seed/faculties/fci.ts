// src/seed/faculties/fci.ts
import type { SeedFaculty } from '../types.js';

export const fciFaculty: SeedFaculty = {
  facultyName: 'Faculty of Computing and Informatics',
  code: 'FCI',
  departments: [
    {
      deptName: 'Computer Science',
      code: 'CSC',
      courses: [
        // 100 Level
        {
          code: 'CSC 101',
          title: 'Introduction to Computer Science',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What does CPU stand for?', options: ['Central Process Unit', 'Computer Personal Unit', 'Central Processing Unit', 'Central Processor Unit'], correctAnswer: 'Central Processing Unit' },
            { type: 'cbt', question: 'Which of these is a volatile memory?', options: ['ROM', 'Hard Drive', 'RAM', 'Flash Drive'], correctAnswer: 'RAM' },
            { type: 'cbt', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Machine Learning', 'Hyper Transfer Markup Link', 'Hyperlink Text Management Language'], correctAnswer: 'Hyper Text Markup Language' },
            { type: 'cbt', question: 'Which component is considered the brain of the computer?', options: ['Hard Disk', 'CPU', 'RAM', 'Power Supply'], correctAnswer: 'CPU' },
          ],
        },
        {
          code: 'CSC 102',
          title: 'Introduction to Problem Solving',
          level: 100,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'Which data structure operates on a Last-In, First-Out (LIFO) principle?', options: ['Queue', 'Tree', 'Array', 'Stack'], correctAnswer: 'Stack' },
            { type: 'cbt', question: 'In binary, what is the decimal equivalent of \'1010\'?', options: ['8', '10', '12', '14'], correctAnswer: '10' },
            { type: 'cbt', question: 'What is an algorithm?', options: ['A programming language', 'A step-by-step procedure for solving a problem', 'A computer hardware part', 'A database management system'], correctAnswer: 'A step-by-step procedure for solving a problem' },
            { type: 'cbt', question: 'Which flowchart symbol represents a conditional decision?', options: ['Rectangle', 'Oval', 'Diamond', 'Parallelogram'], correctAnswer: 'Diamond' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I (Algebra & Trigonometry)', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I (Mechanics & Properties of Matter)', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II (Calculus)', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II (Electricity & Magnetism)', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'CSC 201',
          title: 'Computer Programming I',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which of the following is an Object-Oriented Programming language?', options: ['C', 'HTML', 'Java', 'SQL'], correctAnswer: 'Java' },
            { type: 'cbt', question: 'What is encapsulation in Object-Oriented Programming?', options: ['Binding data and methods operating on that data into a single unit', 'Inheriting properties from another class', 'Overriding function definitions', 'Executing code in parallel'], correctAnswer: 'Binding data and methods operating on that data into a single unit' },
          ],
        },
        {
          code: 'CSC 202',
          title: 'Computer Programming II',
          level: 200,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'What is polymorphism in Object-Oriented Programming?', options: ['Having multiple classes in one file', 'The ability of different objects to respond to the same message in distinct ways', 'Converting source code to bytecode', 'Allocating memory dynamically'], correctAnswer: 'The ability of different objects to respond to the same message in distinct ways' },
            { type: 'cbt', question: 'Which keyword is used in C++ / Java to refer to the current instance of a class?', options: ['super', 'this', 'self', 'parent'], correctAnswer: 'this' },
          ],
        },
        { code: 'CSC 203', title: 'Discrete Structures', level: 200, semester: 'harmattan', questions: [] },
        { code: 'CSC 205', title: 'Digital Logic Design', level: 200, semester: 'harmattan', questions: [] },
        { code: 'CSC 207', title: 'Assembly Language Programming', level: 200, semester: 'harmattan', questions: [] },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'STA 201', title: 'Statistics for Physical Sciences', level: 200, semester: 'harmattan', questions: [] },
        { code: 'CSC 204', title: 'Data Structures and Algorithms I', level: 200, semester: 'rain', questions: [] },
        { code: 'CSC 206', title: 'Computer Architecture & Organization', level: 200, semester: 'rain', questions: [] },
        { code: 'CSC 208', title: 'Internet & Web Technologies', level: 200, semester: 'rain', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        {
          code: 'CSC 301',
          title: 'Data Structures & Algorithms',
          level: 300,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the worst-case time complexity of binary search?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 'O(log n)' },
            {
              type: 'theory',
              question: 'Discuss the time complexity difference between Merge Sort and Quick Sort.',
              options: [],
              correctAnswer: 'Merge sort has an O(n log n) time complexity across best, average, and worst cases because it consistently divides arrays in halves. Quick sort has an average time complexity of O(n log n) but degrades to O(n^2) in its worst case when poor pivots are chosen.',
              gradingPoints: [
                { concept: 'merge sort worst case is o(n log n)', weight: 0.5, aliases: ['merge sort is always n log n', 'o(n log n) for merge sort'] },
                { concept: 'quick sort worst case is o(n^2)', weight: 0.5, aliases: ['quick sort degrades to n squared', 'o(n^2) when bad pivot'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the concept of graph traversal using Breadth-First Search (BFS).',
              options: [],
              correctAnswer: 'Breadth-First Search (BFS) explores a graph level by level starting from a chosen root node. It uses a queue data structure to visit all immediate neighbors before moving to the next level of nodes.',
              gradingPoints: [
                { concept: 'explores graph level by level', weight: 0.5, aliases: ['level order traversal', 'visits neighbors first', 'layer by layer'] },
                { concept: 'uses a queue data structure', weight: 0.5, aliases: ['fifo queue', 'queue based'] },
              ],
            },
          ],
        },
        { code: 'CSC 303', title: 'Object-Oriented Programming', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 311', title: 'Operating Systems', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 305', title: 'Database Management Systems', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 307', title: 'Theory of Computation & Automata', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 309', title: 'Compiler Construction', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 302', title: 'Systems Analysis & Design', level: 300, semester: 'rain', questions: [] },
        { code: 'CSC 304', title: 'Software Engineering Principles', level: 300, semester: 'rain', questions: [] },
        { code: 'CSC 306', title: 'Computer Networks & Communications', level: 300, semester: 'rain', questions: [] },
        { code: 'CSC 399', title: 'Students Industrial Work Experience Scheme (SIWES)', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'CSC 401', title: 'Software Engineering', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CSC 403', title: 'Distributed Systems & Cloud Computing', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CSC 405', title: 'Computer Graphics & Visualization', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CSC 407', title: 'Human Computer Interaction', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CSC 402', title: 'Research Methodology & Project Proposal', level: 400, semester: 'rain', questions: [] },
        { code: 'CSC 404', title: 'Net-Centric Computing & Wireless Networks', level: 400, semester: 'rain', questions: [] },
        { code: 'CSC 406', title: 'Formal Methods in Software Development', level: 400, semester: 'rain', questions: [] },
        { code: 'CSC 499', title: 'B.Sc. Final Year Project I', level: 400, semester: 'rain', questions: [] },

        // 500 Level
        { code: 'CSC 501', title: 'Artificial Intelligence & Expert Systems', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CSC 503', title: 'Machine Learning & Data Mining', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CSC 505', title: 'Cryptography & Network Security', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CSC 507', title: 'Parallel & High-Performance Computing', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CSC 502', title: 'Bioinformatics & Computational Biology', level: 500, semester: 'rain', questions: [] },
        { code: 'CSC 504', title: 'Quantum Computing & Emerging Tech', level: 500, semester: 'rain', questions: [] },
        { code: 'CSC 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
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
            { type: 'cbt', question: 'What does the CIA triad stand for in information security?', options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Control, Identification, Authentication', 'Cyber, Internet, Application'], correctAnswer: 'Confidentiality, Integrity, Availability' },
            { type: 'cbt', question: 'Which type of attack involves tricking users into revealing sensitive information through fraudulent emails?', options: ['DDoS', 'Phishing', 'SQL Injection', 'Man-in-the-Middle'], correctAnswer: 'Phishing' },
            { type: 'cbt', question: 'What is malware designed to lock files and demand payment called?', options: ['Spyware', 'Adware', 'Ransomware', 'Trojan'], correctAnswer: 'Ransomware' },
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
            { type: 'cbt', question: 'Which encryption type uses both a public key and a private key?', options: ['Symmetric encryption', 'Asymmetric encryption', 'Hashing', 'Base64 encoding'], correctAnswer: 'Asymmetric encryption' },
            { type: 'cbt', question: 'What is the primary function of a firewall?', options: ['To remove computer viruses', 'To monitor and filter incoming and outgoing network traffic', 'To speed up internet connectivity', 'To encrypt hard drive data'], correctAnswer: 'To monitor and filter incoming and outgoing network traffic' },
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
            { type: 'cbt', question: 'What is an Information System?', options: ['A collection of hardware only', 'An integrated set of components for collecting, storing, and processing data', 'A type of operating system', 'A network cable system'], correctAnswer: 'An integrated set of components for collecting, storing, and processing data' },
            { type: 'cbt', question: 'Which of the following is a transaction processing system (TPS)?', options: ['Executive dashboard', 'Point of Sale (POS) system', 'Data warehouse', 'Decision support tool'], correctAnswer: 'Point of Sale (POS) system' },
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
            { type: 'cbt', question: 'What is the primary language used to manage relational databases?', options: ['Python', 'SQL', 'C++', 'Java'], correctAnswer: 'SQL' },
            { type: 'cbt', question: 'What does a Primary Key ensure in a database table?', options: ['Column uniqueness and non-null values', 'Faster network transfer', 'Automatic encryption', 'Foreign key deletion'], correctAnswer: 'Foreign key deletion' },
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
        { code: 'INS 401', title: 'Enterprise Architecture', level: 400, semester: 'harmattan', questions: [] },
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
