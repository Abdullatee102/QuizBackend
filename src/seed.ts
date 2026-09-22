import { db } from './db/index.js';

import {
  facultiesTable,
  departmentsTable,
  coursesTable,
  questionsTable,
} from './db/schema.js';

import { and, eq } from 'drizzle-orm';

// =====================================================
// TYPES
// =====================================================

type GradingPoint = {
  concept: string;
  weight: number;
  aliases?: string[];
};

type SeedQuestion = {
  type: 'cbt' | 'theory';
  question: string;
  options: string[];
  correctAnswer: string;
  gradingPoints?: GradingPoint[];
};

type SeedCourse = {
  code: string;
  title: string;
  level: number;
  semester: string;
  questions: SeedQuestion[];
};

type SeedDepartment = {
  deptName: string;
  code: string;
  courses: SeedCourse[];
};

type SeedFaculty = {
  facultyName: string;
  code: string;
  departments: SeedDepartment[];
};

// =====================================================
// CURRICULUM TREE
// =====================================================

const CURRICULUM_TREE: SeedFaculty[] = [
  {
    facultyName: 'Faculty of Computing and Informatics',
    code: 'FCI',

    departments: [
      {
        deptName: 'Computer Science',
        code: 'CSC',

        courses: [
          {
            code: 'CSC 101',
            title: 'Introduction to Computer Science',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question: 'What does CPU stand for?',
                options: [
                  'Central Process Unit',
                  'Computer Personal Unit',
                  'Central Processing Unit',
                  'Central Processor Unit',
                ],
                correctAnswer: 'Central Processing Unit',
              },

              {
                type: 'cbt',
                question: 'Which of these is a volatile memory?',
                options: [
                  'ROM',
                  'Hard Drive',
                  'RAM',
                  'Flash Drive',
                ],
                correctAnswer: 'RAM',
              },

              {
                type: 'cbt',
                question: 'What does HTML stand for?',
                options: [
                  'Hyper Text Markup Language',
                  'High Tech Machine Learning',
                  'Hyper Transfer Markup Link',
                  'Hyperlink Text Management Language',
                ],
                correctAnswer: 'Hyper Text Markup Language',
              },
              // Added New Question 1 (CBT)
              {
                type: 'cbt',
                question: 'Which component is considered the brain of the computer?',
                options: [
                  'Hard Disk',
                  'CPU',
                  'RAM',
                  'Power Supply',
                ],
                correctAnswer: 'CPU',
              },
            ],
          },

          {
            code: 'CSC 102',
            title: 'Introduction to Problem Solving',
            level: 100,
            semester: 'rain',

            questions: [
              {
                type: 'cbt',
                question:
                  'Which data structure operates on a Last-In, First-Out (LIFO) principle?',
                options: [
                  'Queue',
                  'Tree',
                  'Array',
                  'Stack',
                ],
                correctAnswer: 'Stack',
              },

              {
                type: 'cbt',
                question:
                  "In binary, what is the decimal equivalent of '1010'?",
                options: [
                  '8',
                  '10',
                  '12',
                  '14',
                ],
                correctAnswer: '10',
              },
              // Added New Question 2 (CBT)
              {
                type: 'cbt',
                question: 'Which sorting algorithm has a best-case time complexity of O(n log n)?',
                options: [
                  'Bubble Sort',
                  'Selection Sort',
                  'Merge Sort',
                  'Insertion Sort',
                ],
                correctAnswer: 'Merge Sort',
              },
            ],
          },

          {
            code: 'CSC 301',
            title: 'Data Structures & Algorithms',
            level: 300,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the worst-case time complexity of binary search?',
                options: [
                  'O(n)',
                  'O(log n)',
                  'O(n^2)',
                  'O(1)',
                ],
                correctAnswer: 'O(log n)',
              },

              {
                type: 'theory',
                question:
                  'Discuss the time complexity difference between Merge Sort and Quick Sort.',
                options: [],
                correctAnswer:
                  'Merge sort guarantees O(n log n) worst-case time complexity, whereas Quick sort has O(n^2) worst-case due to poor pivot selections.',

                gradingPoints: [
                  {
                    concept: 'Merge Sort',
                    weight: 20,
                    aliases: [
                      'merge sort algorithm',
                      'merge sorting',
                    ],
                  },

                  {
                    concept: 'O(n log n)',
                    weight: 25,
                    aliases: [
                      'O(nlogn)',
                      'O(n log n) time',
                      'n log n',
                      'linearithmic time',
                    ],
                  },

                  {
                    concept: 'Quick Sort',
                    weight: 20,
                    aliases: [
                      'quick sort algorithm',
                      'quick sorting',
                    ],
                  },

                  {
                    concept: 'O(n^2)',
                    weight: 25,
                    aliases: [
                      'O(n2)',
                      'O(n²)',
                      'n squared',
                      'quadratic time',
                    ],
                  },

                  {
                    concept: 'poor pivot selection',
                    weight: 10,
                    aliases: [
                      'poor pivot selections',
                      'poor pivot choice',
                      'poor pivot choices',
                      'bad pivot selection',
                      'bad pivot choice',
                    ],
                  },
                ],
              },
              // Added New Question 3 (Theory)
              {
                type: 'theory',
                question: 'Explain the concept of graph traversal using Breadth-First Search (BFS).',
                options: [],
                correctAnswer: 'BFS explores graph nodes level by level using a queue data structure, visiting all neighbors of a node before moving to the next level.',
                gradingPoints: [
                  {
                    concept: 'level by level',
                    weight: 40,
                    aliases: ['breadth-wise', 'level-order', 'tiers'],
                  },
                  {
                    concept: 'queue data structure',
                    weight: 60,
                    aliases: ['FIFO queue', 'queue'],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        deptName: 'Cyber Security Science',
        code: 'CYB',

        courses: [
          {
            code: 'CYB 201',
            title: 'Introduction to Information Security',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  "What does the 'C' in the CIA triad stand for?",
                options: [
                  'Control',
                  'Confidentiality',
                  'Computation',
                  'Consistency',
                ],
                correctAnswer: 'Confidentiality',
              },

              {
                type: 'cbt',
                question:
                  'Which attack floods a network or server with traffic to crash it?',
                options: [
                  'Phishing',
                  'Man-in-the-Middle',
                  'DDoS',
                  'SQL Injection',
                ],
                correctAnswer: 'DDoS',
              },
              // Added New Question 4 (CBT)
              {
                type: 'cbt',
                question: 'What type of malware locks user data until a ransom is paid?',
                options: [
                  'Spyware',
                  'Adware',
                  'Ransomware',
                  'Trojan',
                ],
                correctAnswer: 'Ransomware',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Information Systems',
        code: 'INS',

        courses: [
          {
            code: 'INS 202',
            title: 'Management Information Systems',
            level: 200,
            semester: 'rain',

            questions: [
              {
                type: 'cbt',
                question:
                  'What type of system is designed to support organizational decision-making?',
                options: [
                  'TPS',
                  'DSS',
                  'OS',
                  'BIOS',
                ],
                correctAnswer: 'DSS',
              },

              {
                type: 'cbt',
                question: 'What does ERP stand for?',
                options: [
                  'Enterprise Resource Planning',
                  'Enterprise Relationship Process',
                  'External Resource Planning',
                  'Effective Resource Planning',
                ],
                correctAnswer: 'Enterprise Resource Planning',
              },

              {
                type: 'cbt',
                question: 'Which component of an Information System provides instructions for hardware?',
                options: [
                  'Hardware',
                  'Software',
                  'Network',
                  'Data',
                ],
                correctAnswer: 'Software',
              },
            ],
          },
        ],
      },
    ],
  },

  // =====================================================
  // FACULTY OF ENGINEERING AND TECHNOLOGY
  // =====================================================

  {
    facultyName: 'Faculty of Engineering and Technology',
    code: 'FET',

    departments: [
      {
        deptName: 'Computer Engineering',
        code: 'CPE',

        courses: [
          {
            code: 'CPE 101',
            title: 'Engineering Drawing & Design I',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question: 'Which pencil grade is hardest?',
                options: [
                  '2B',
                  'HB',
                  '4H',
                  'B',
                ],
                correctAnswer: '4H',
              },

              {
                type: 'cbt',
                question:
                  'What type of line is used for hidden details?',
                options: [
                  'Continuous thick',
                  'Short dashes',
                  'Chain thin',
                  'Continuous thin',
                ],
                correctAnswer: 'Short dashes',
              },
            ],
          },

          {
            code: 'CPE 301',
            title: 'Microprocessor Systems and Networks',
            level: 300,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'How many pins does the standard 8086 microprocessor have?',
                options: [
                  '28',
                  '40',
                  '64',
                  '80',
                ],
                correctAnswer: '40',
              },

              {
                type: 'theory',
                question:
                  'Explain the role of interrupts in microprocessor architecture.',
                options: [],
                correctAnswer:
                  'Interrupts allow peripheral devices to signal the CPU to suspend current execution and handle a high-priority event.',

                gradingPoints: [
                  {
                    concept:
                      'peripheral devices signal the CPU',
                    weight: 20,
                    aliases: [
                      'peripheral devices notify the CPU',
                      'devices signal the CPU',
                      'external devices signal the CPU',
                      'peripherals signal the processor',
                    ],
                  },

                  {
                    concept:
                      'CPU suspends current execution',
                    weight: 25,
                    aliases: [
                      'CPU pauses current execution',
                      'processor suspends current execution',
                      'processor pauses execution',
                      'CPU stops the current execution temporarily',
                    ],
                  },

                  {
                    concept: 'high-priority event',
                    weight: 20,
                    aliases: [
                      'important event',
                      'urgent event',
                      'high priority task',
                      'important request',
                    ],
                  },

                  {
                    concept: 'handles the event',
                    weight: 25,
                    aliases: [
                      'handles the interrupt',
                      'services the interrupt',
                      'handles the request',
                      'responds to the event',
                      'processes the event',
                    ],
                  },

                  {
                    concept:
                      'resumes previous execution',
                    weight: 10,
                    aliases: [
                      'resumes normal execution',
                      'continues previous execution',
                      'returns to the previous task',
                      'continues the interrupted program',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        deptName: 'Mechanical Engineering',
        code: 'MEE',

        courses: [
          {
            code: 'MEE 201',
            title: 'Applied Mechanics (Statics)',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the condition for a rigid body to be in static equilibrium?',
                options: [
                  'Sum of forces equals zero',
                  'Sum of moments equals zero',
                  'Both forces and moments equal zero',
                  'Velocity is constant',
                ],
                correctAnswer:
                  'Both forces and moments equal zero',
              },

              {
                type: 'cbt',
                question: 'The unit of moment of a force in the SI system is?',
                options: [
                  'N/m',
                  'N.m',
                  'N.s',
                  'kg.m',
                ],
                correctAnswer: 'N.m',
              },

              {
                type: 'cbt',
                question: 'Two equal, opposite and parallel non-collinear forces form a?',
                options: [
                  'Moment',
                  'Couple',
                  'Torque',
                  'Resultant',
                ],
                correctAnswer: 'Couple',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Agricultural Engineering',
        code: 'AGE',
        courses: [
          { code: 'AGE 101', title: 'Introduction to Agricultural Engineering', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the primary goal of Agricultural Engineering?', options: ['Crop production', 'Machine design for farming', 'Soil testing', 'Animal husbandry'], correctAnswer: 'Machine design for farming' }] },
          { code: 'AGE 201', title: 'Intermediate Agricultural Engineering', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'Which machine is commonly used for tillage?', options: ['Tractor', 'Combine harvester', 'Plough', 'Planter'], correctAnswer: 'Plough' }] },
          { code: 'AGE 301', title: 'Advanced Agricultural Engineering', level: 300, semester: 'harmattan', questions: [] },
          { code: 'AGE 401', title: 'Agricultural Engineering Research', level: 400, semester: 'harmattan', questions: [] },
          { code: 'AGE 501', title: 'Agricultural Engineering Seminar', level: 500, semester: 'harmattan', questions: [] }
        ]
      },
      {
        deptName: 'Chemical Engineering',
        code: 'CHE',
        courses: [
          { code: 'CHE 101', title: 'Introduction to Chemical Engineering', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What does chemical engineering primarily deal with?', options: ['Chemical production', 'Building design', 'Computer hardware', 'Farming'], correctAnswer: 'Chemical production' }] },
          { code: 'CHE 201', title: 'Intermediate Chemical Engineering', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the process of separating liquids based on boiling point called?', options: ['Filtration', 'Distillation', 'Evaporation', 'Condensation'], correctAnswer: 'Distillation' }] },
          { code: 'CHE 301', title: 'Advanced Chemical Engineering', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CHE 401', title: 'Chemical Engineering Research', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CHE 501', title: 'Chemical Engineering Seminar', level: 500, semester: 'harmattan', questions: [] }
        ]
      },
      {
        deptName: 'Electronic and Electrical Engineering',
        code: 'EEE',
        courses: [
          { code: 'EEE 101', title: 'Introduction to Electronic and Electrical Engineering', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the unit of electrical current?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correctAnswer: 'Ampere' }] },
          { code: 'EEE 201', title: 'Intermediate Electronic and Electrical Engineering', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What device stores electrical energy in an electric field?', options: ['Resistor', 'Inductor', 'Capacitor', 'Diode'], correctAnswer: 'Capacitor' }] },
          { code: 'EEE 301', title: 'Advanced Electronic and Electrical Engineering', level: 300, semester: 'harmattan', questions: [] },
          { code: 'EEE 401', title: 'Electronic and Electrical Engineering Research', level: 400, semester: 'harmattan', questions: [] },
          { code: 'EEE 501', title: 'Electronic and Electrical Engineering Seminar', level: 500, semester: 'harmattan', questions: [] }
        ]
      },
      {
        deptName: 'Food Engineering',
        code: 'FDE',
        courses: [
          { code: 'FDE 101', title: 'Introduction to Food Engineering', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the main focus of food engineering?', options: ['Food processing', 'Farming', 'Restaurant management', 'Dietetics'], correctAnswer: 'Food processing' }] },
          { code: 'FDE 201', title: 'Intermediate Food Engineering', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'Which process uses heat to kill pathogens in milk?', options: ['Fermentation', 'Pasteurization', 'Freezing', 'Drying'], correctAnswer: 'Pasteurization' }] },
          { code: 'FDE 301', title: 'Advanced Food Engineering', level: 300, semester: 'harmattan', questions: [] },
          { code: 'FDE 401', title: 'Food Engineering Research', level: 400, semester: 'harmattan', questions: [] },
          { code: 'FDE 501', title: 'Food Engineering Seminar', level: 500, semester: 'harmattan', questions: [] }
        ]
      },
      {
        deptName: 'Civil Engineering',
        code: 'CVE',

        courses: [
          {
            code: 'CVE 202',
            title: 'Strength of Materials',
            level: 200,
            semester: 'rain',

            questions: [
              {
                type: 'cbt',
                question:
                  'In mechanics, what is defined as force per unit area?',
                options: [
                  'Strain',
                  'Work',
                  'Power',
                  'Stress',
                ],
                correctAnswer: 'Stress',
              },

              {
                type: 'cbt',
                question: 'The ratio of lateral strain to linear strain is called?',
                options: [
                  "Young's Modulus",
                  "Poisson's Ratio",
                  "Bulk Modulus",
                  "Shear Modulus",
                ],
                correctAnswer: "Poisson's Ratio",
              },

              {
                type: 'cbt',
                question: "Hooke's Law holds good up to?",
                options: [
                  'Yield point',
                  'Elastic limit',
                  'Breaking point',
                  'Plastic limit',
                ],
                correctAnswer: 'Elastic limit',
              },
            ],
          },
        ],
      },
    ],
  },

  // =====================================================
  // FACULTY OF BASIC MEDICAL SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Basic Medical Sciences',
    code: 'FBMS',

    departments: [
      {
        deptName: 'Anatomy',
        code: 'ANA',

        courses: [
          {
            code: 'ANA 201',
            title: 'Gross Anatomy of the Upper Limb',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Which nerve is primarily affected in Carpal Tunnel Syndrome?',
                options: [
                  'Ulnar nerve',
                  'Radial nerve',
                  'Median nerve',
                  'Musculocutaneous nerve',
                ],
                correctAnswer: 'Median nerve',
              },

              {
                type: 'cbt',
                question: 'Which bone is located on the lateral side of the forearm?',
                options: [
                  'Ulna',
                  'Radius',
                  'Humerus',
                  'Clavicle',
                ],
                correctAnswer: 'Radius',
              },

              {
                type: 'cbt',
                question: 'The brachial plexus is formed by the ventral rami of which spinal nerves?',
                options: [
                  'C5-T1',
                  'C3-C7',
                  'T1-T5',
                  'L1-L5',
                ],
                correctAnswer: 'C5-T1',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Physiology',
        code: 'PHS',

        courses: [
          {
            code: 'PHS 201',
            title: 'Medical Physiology - Cell & Blood',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the normal lifespan of a human red blood cell in days?',
                options: [
                  '60 days',
                  '120 days',
                  '180 days',
                  '365 days',
                ],
                correctAnswer: '120 days',
              },

              {
                type: 'cbt',
                question: 'What is the primary function of white blood cells?',
                options: [
                  'Oxygen transport',
                  'Blood clotting',
                  'Defense against infection',
                  'Nutrient distribution',
                ],
                correctAnswer: 'Defense against infection',
              },

              {
                type: 'cbt',
                question: 'Which organ is primarily responsible for the production of red blood cells in adults?',
                options: [
                  'Liver',
                  'Spleen',
                  'Bone marrow',
                  'Kidney',
                ],
                correctAnswer: 'Bone marrow',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Medical Laboratory Science',
        code: 'MLS',

        courses: [
          {
            code: 'MLS 101',
            title: 'Introduction to Professional Nursing',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Who is widely considered the founder of modern nursing?',
                options: [
                  'Clara Barton',
                  'Florence Nightingale',
                  'Mary Seacole',
                  'Virginia Henderson',
                ],
                correctAnswer: 'Florence Nightingale',
              },

              {
                type: 'cbt',
                question: 'Which ethical principle refers to the duty to do good?',
                options: [
                  'Autonomy',
                  'Beneficence',
                  'Nonmaleficence',
                  'Justice',
                ],
                correctAnswer: 'Beneficence',
              },

              {
                type: 'cbt',
                question: 'The nursing process consists of how many primary steps?',
                options: [
                  '3',
                  '4',
                  '5',
                  '6',
                ],
                correctAnswer: '5',
              },
            ],
          },
        ],
      },
    ],
  },

  // =====================================================
  // FACULTY OF MANAGEMENT SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Management Sciences',
    code: 'FMS',

    departments: [
      {
        deptName: 'Accounting',
        code: 'ACC',

        courses: [
          {
            code: 'ACC 101',
            title:
              'Introduction to Financial Accounting I',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the fundamental accounting equation?',
                options: [
                  'Assets = Liabilities + Equity',
                  'Assets = Revenue - Expenses',
                  'Assets + Equity = Liabilities',
                  'Revenue = Assets + Liabilities',
                ],
                correctAnswer:
                  'Assets = Liabilities + Equity',
              },

              {
                type: 'cbt',
                question: "Which financial statement shows a company's financial position at a specific point in time?",
                options: [
                  'Income Statement',
                  'Statement of Cash Flows',
                  'Balance Sheet',
                  'Statement of Retained Earnings',
                ],
                correctAnswer: 'Balance Sheet',
              },

              {
                type: 'cbt',
                question: "In accounting, what does the term 'debit' mean?",
                options: [
                  'Increase in liability',
                  'Decrease in asset',
                  'Left side of an account',
                  'Right side of an account',
                ],
                correctAnswer: 'Left side of an account',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Marketing',
        code: 'MKT',

        courses: [
          {
            code: 'MKT 201',
            title: 'Principles of Marketing',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What are the 4 Ps of the marketing mix?',
                options: [
                  'Product, Price, Place, Promotion',
                  'People, Process, Physical Evidence, Product',
                  'Public, Price, Packaging, Placement',
                  'Planning, Production, Price, Profit',
                ],
                correctAnswer:
                  'Product, Price, Place, Promotion',
              },

              {
                type: 'cbt',
                question: 'The process of dividing a market into distinct groups of buyers with different needs is known as?',
                options: [
                  'Market Targeting',
                  'Market Segmentation',
                  'Market Positioning',
                  'Market Penetration',
                ],
                correctAnswer: 'Market Segmentation',
              },

              {
                type: 'cbt',
                question: 'Which of the following is NOT a stage in the Product Life Cycle?',
                options: [
                  'Introduction',
                  'Growth',
                  'Maturity',
                  'Innovation',
                ],
                correctAnswer: 'Innovation',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Business Management',
        code: 'MGT',

        courses: [
          {
            code: 'MGT 101',
            title: 'Principles of Management',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Who proposed the 14 principles of management?',
                options: [
                  'Max Weber',
                  'Henri Fayol',
                  'Frederick Taylor',
                  'Elton Mayo',
                ],
                correctAnswer: 'Henri Fayol',
              },

              {
                type: 'cbt',
                question: 'Which level of management is responsible for establishing the overall goals and strategy of an organization?',
                options: [
                  'Top Management',
                  'Middle Management',
                  'First-line Management',
                  'Operational Management',
                ],
                correctAnswer: 'Top Management',
              },

              {
                type: 'cbt',
                question: 'The Hawthorne studies are associated with which management approach?',
                options: [
                  'Scientific Management',
                  'Behavioral Approach',
                  'Quantitative Approach',
                  'Systems Approach',
                ],
                correctAnswer: 'Behavioral Approach',
              },
            ],
          },
        ],
      },
      {
        deptName: 'Transport Management',
        code: 'TRM',
        courses: [
          {
            code: 'TRM 101',
            title: 'Introduction to Transport Management',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What does transport management primarily involve?', options: ['Manufacturing goods', 'Planning and coordinating the movement of goods and people', 'Designing roads', 'Building vehicles'], correctAnswer: 'Planning and coordinating the movement of goods and people' },
              { type: 'cbt', question: 'Which of the following is a mode of transportation?', options: ['Manufacturing', 'Rail transport', 'Warehousing', 'Retailing'], correctAnswer: 'Rail transport' },
            ],
          },
          { code: 'TRM 201', title: 'Intermediate Transport Management', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is logistics?', options: ['The study of map making', 'The detailed coordination of complex operations involving goods and services', 'Aircraft navigation', 'Vehicle maintenance'], correctAnswer: 'The detailed coordination of complex operations involving goods and services' }] },
          { code: 'TRM 301', title: 'Advanced Transport Management', level: 300, semester: 'harmattan', questions: [] },
          { code: 'TRM 401', title: 'Transport Management Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'TRM 501', title: 'Transport Management Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // FACULTY OF PURE AND APPLIED SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Pure and Applied Sciences',
    code: 'FPAS',

    departments: [
      {
        deptName: 'Pure and Applied Mathematics',
        code: 'PAM',

        courses: [
          {
            code: 'MTH 101',
            title:
              'Elementary Mathematics I (Algebra & Trigonometry)',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the value of log10(1000)?',
                options: [
                  '1',
                  '2',
                  '3',
                  '10',
                ],
                correctAnswer: '3',
              },

              {
                type: 'cbt',
                question:
                  'What is the sum of angles in a triangle?',
                options: [
                  '90 degrees',
                  '180 degrees',
                  '270 degrees',
                  '360 degrees',
                ],
                correctAnswer: '180 degrees',
              },
            ],
          },

          {
            code: 'MTH 102',
            title:
              'Elementary Mathematics II (Calculus)',
            level: 100,
            semester: 'rain',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the derivative of x^2?',
                options: [
                  'x',
                  '2x',
                  'x^2 / 2',
                  '2',
                ],
                correctAnswer: '2x',
              },
              // Added New Question 5 (Theory)
              {
                type: 'theory',
                question: 'Explain the basic geometric definition of a definite integral using area under a curve.',
                options: [],
                correctAnswer: 'A definite integral represents the net signed area bounded by the function graph, the x-axis, and vertical lines at the integration limits a and b.',
                gradingPoints: [
                  {
                    concept: 'signed area',
                    weight: 50,
                    aliases: ['net area', 'area under the curve'],
                  },
                  {
                    concept: 'integration limits',
                    weight: 50,
                    aliases: ['bounds', 'limits a and b', 'intervals'],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        deptName: 'Pure and Applied Physics',
        code: 'PAP',

        courses: [
          {
            code: 'PHY 101',
            title:
              'General Physics I (Mechanics)',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Which law states that current is proportional to voltage?',
                options: [
                  "Newton's Law",
                  "Faraday's Law",
                  "Ohm's Law",
                  "Hooke's Law",
                ],
                correctAnswer: "Ohm's Law",
              },

              {
                type: 'cbt',
                question:
                  'What is the SI unit of force?',
                options: [
                  'Joule',
                  'Watt',
                  'Newton',
                  'Pascal',
                ],
                correctAnswer: 'Newton',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Biochemistry',
        code: 'BCH',

        courses: [
          {
            code: 'BCH 201',
            title: 'General Biochemistry I',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Which bond links amino acids together in a protein chain?',
                options: [
                  'Glycosidic bond',
                  'Peptide bond',
                  'Phosphodiester bond',
                  'Hydrogen bond',
                ],
                correctAnswer: 'Peptide bond',
              },

              {
                type: 'cbt',
                question: 'What is the primary storage form of glucose in animals?',
                options: [
                  'Starch',
                  'Glycogen',
                  'Cellulose',
                  'Chitin',
                ],
                correctAnswer: 'Glycogen',
              },

              {
                type: 'cbt',
                question: 'Enzymes are biological catalysts composed primarily of?',
                options: [
                  'Lipids',
                  'Carbohydrates',
                  'Proteins',
                  'Nucleic acids',
                ],
                correctAnswer: 'Proteins',
              },
            ],
          },
        ],
      },
      {
        deptName: 'Earth Sciences',
        code: 'EAS',
        courses: [
          { code: 'EAS 101', title: 'Introduction to Earth Sciences', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'Which layer of the Earth is liquid?', options: ['Crust', 'Mantle', 'Outer core', 'Inner core'], correctAnswer: 'Outer core' }, { type: 'cbt', question: 'What is the study of rocks called?', options: ['Biology', 'Petrology', 'Astronomy', 'Hydrology'], correctAnswer: 'Petrology' }] },
          { code: 'EAS 201', title: 'Intermediate Earth Sciences', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What causes earthquakes?', options: ['Volcanic eruptions only', 'Movement of tectonic plates', 'Ocean tides', 'Atmospheric pressure'], correctAnswer: 'Movement of tectonic plates' }] },
          { code: 'EAS 301', title: 'Advanced Earth Sciences', level: 300, semester: 'harmattan', questions: [] },
          { code: 'EAS 401', title: 'Earth Sciences Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'EAS 501', title: 'Earth Sciences Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'General Studies',
        code: 'GST',
        courses: [
          { code: 'GST 101', title: 'Use of English I', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'Which of the following is a conjunction?', options: ['Quickly', 'And', 'Beautiful', 'Run'], correctAnswer: 'And' }, { type: 'cbt', question: 'What is a synonym?', options: ['A word with opposite meaning', 'A word with similar meaning', 'A word that sounds alike', 'A word that is spelt differently'], correctAnswer: 'A word with similar meaning' }] },
          { code: 'GST 201', title: 'Use of English II', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is an essay?', options: ['A short story', 'A structured piece of writing on a specific topic', 'A list of words', 'A type of poem'], correctAnswer: 'A structured piece of writing on a specific topic' }] },
        ],
      },
      {
        deptName: 'Pure and Applied Biology',
        code: 'PAB',
        courses: [
          { code: 'PAB 101', title: 'Introduction to Pure and Applied Biology', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the basic unit of life?', options: ['Atom', 'Cell', 'Molecule', 'Organ'], correctAnswer: 'Cell' }, { type: 'cbt', question: 'Which organelle is responsible for energy production in a cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'], correctAnswer: 'Mitochondria' }] },
          { code: 'PAB 201', title: 'Intermediate Pure and Applied Biology', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is photosynthesis?', options: ['The process of respiration in plants', 'The process by which plants produce food using sunlight', 'The digestion of food in animals', 'The absorption of nutrients from soil'], correctAnswer: 'The process by which plants produce food using sunlight' }] },
          { code: 'PAB 301', title: 'Advanced Pure and Applied Biology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PAB 401', title: 'Pure and Applied Biology Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'PAB 501', title: 'Pure and Applied Biology Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Pure and Applied Chemistry',
        code: 'PAC',
        courses: [
          { code: 'PAC 101', title: 'Introduction to Pure and Applied Chemistry', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the atomic number of Carbon?', options: ['6', '12', '8', '14'], correctAnswer: '6' }, { type: 'cbt', question: 'What is the chemical symbol for water?', options: ['O2', 'CO2', 'H2O', 'NaCl'], correctAnswer: 'H2O' }] },
          { code: 'PAC 201', title: 'Intermediate Pure and Applied Chemistry', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What type of bond forms between sodium and chlorine in table salt?', options: ['Covalent', 'Metallic', 'Ionic', 'Hydrogen'], correctAnswer: 'Ionic' }] },
          { code: 'PAC 301', title: 'Advanced Pure and Applied Chemistry', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PAC 401', title: 'Pure and Applied Chemistry Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'PAC 501', title: 'Pure and Applied Chemistry Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Science Laboratory Technology',
        code: 'SLT',
        courses: [
          { code: 'SLT 101', title: 'Introduction to Science Laboratory Technology', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the primary role of a science laboratory technologist?', options: ['To teach students', 'To maintain and operate laboratory equipment', 'To conduct fieldwork only', 'To manage hospital wards'], correctAnswer: 'To maintain and operate laboratory equipment' }, { type: 'cbt', question: 'What instrument is used to measure temperature?', options: ['Barometer', 'Thermometer', 'Hygrometer', 'Manometer'], correctAnswer: 'Thermometer' }] },
          { code: 'SLT 201', title: 'Intermediate Science Laboratory Technology', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What safety equipment should always be worn in a chemistry lab?', options: ['Gloves only', 'Goggles only', 'Lab coat, gloves, and goggles', 'Only closed-toe shoes'], correctAnswer: 'Lab coat, gloves, and goggles' }] },
          { code: 'SLT 301', title: 'Advanced Science Laboratory Technology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'SLT 401', title: 'Science Laboratory Technology Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'SLT 501', title: 'Science Laboratory Technology Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Statistics',
        code: 'STA',
        courses: [
          { code: 'STA 101', title: 'Introduction to Statistics', level: 100, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the mean of the data set 2, 4, 6, 8, 10?', options: ['5', '6', '4', '7'], correctAnswer: '6' }, { type: 'cbt', question: 'What is statistics?', options: ['The study of plants', 'The science of collecting, analysing, and interpreting data', 'The study of celestial bodies', 'A branch of physics'], correctAnswer: 'The science of collecting, analysing, and interpreting data' }] },
          { code: 'STA 201', title: 'Intermediate Statistics', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What does the standard deviation measure?', options: ['Central tendency', 'Spread or variability of data', 'The most frequent value', 'The middle value'], correctAnswer: 'Spread or variability of data' }] },
          { code: 'STA 301', title: 'Advanced Statistics', level: 300, semester: 'harmattan', questions: [] },
          { code: 'STA 401', title: 'Statistics Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'STA 501', title: 'Statistics Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },


  // =====================================================
  // FACULTY OF ARTS AND SOCIAL SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Arts and Social Sciences',
    code: 'FASS',
    departments: [
      {
        deptName: 'English and Literary Studies',
        code: 'ELS',
        courses: [
          {
            code: 'ELS 101',
            title: 'Introduction to English and Literary Studies',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is literature?', options: ['A branch of science', 'Written works, especially those of artistic value', 'A type of language', 'A school subject only'], correctAnswer: 'Written works, especially those of artistic value' },
              { type: 'cbt', question: 'Which of the following is a genre of literature?', options: ['Biology', 'Poetry', 'Mathematics', 'History'], correctAnswer: 'Poetry' },
              { type: 'cbt', question: 'Who wrote "Things Fall Apart"?', options: ['Wole Soyinka', 'Chimamanda Adichie', 'Chinua Achebe', 'Ben Okri'], correctAnswer: 'Chinua Achebe' },
            ],
          },
          { code: 'ELS 201', title: 'Intermediate English and Literary Studies', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What literary device repeats initial consonant sounds?', options: ['Simile', 'Alliteration', 'Metaphor', 'Irony'], correctAnswer: 'Alliteration' }] },
          { code: 'ELS 301', title: 'Advanced English and Literary Studies', level: 300, semester: 'harmattan', questions: [] },
          { code: 'ELS 401', title: 'English and Literary Studies Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'ELS 501', title: 'English and Literary Studies Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'History and International Studies',
        code: 'HIS',
        courses: [
          {
            code: 'HIS 101',
            title: 'Introduction to History and International Studies',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'When did Nigeria gain independence?', options: ['1957', '1960', '1963', '1966'], correctAnswer: '1960' },
              { type: 'cbt', question: 'What does historiography mean?', options: ['Writing of maps', 'The study and writing of history', 'International diplomacy', 'The study of ancient languages'], correctAnswer: 'The study and writing of history' },
            ],
          },
          { code: 'HIS 201', title: 'Intermediate History and International Studies', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the United Nations?', options: ['A trade organisation', 'An international organisation promoting peace and cooperation', 'A military alliance', 'A financial institution'], correctAnswer: 'An international organisation promoting peace and cooperation' }] },
          { code: 'HIS 301', title: 'Advanced History and International Studies', level: 300, semester: 'harmattan', questions: [] },
          { code: 'HIS 401', title: 'History and International Studies Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'HIS 501', title: 'History and International Studies Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Philosophy',
        code: 'PHL',
        courses: [
          {
            code: 'PHL 101',
            title: 'Introduction to Philosophy',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Who is known as the father of Western philosophy?', options: ['Plato', 'Aristotle', 'Socrates', 'Descartes'], correctAnswer: 'Socrates' },
              { type: 'cbt', question: 'What is ethics?', options: ['The study of numbers', 'The branch of philosophy dealing with moral questions', 'The study of knowledge', 'The study of existence'], correctAnswer: 'The branch of philosophy dealing with moral questions' },
            ],
          },
          { code: 'PHL 201', title: 'Intermediate Philosophy', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is epistemology?', options: ['The study of beauty', 'The study of knowledge and belief', 'The study of the universe', 'The study of ethics'], correctAnswer: 'The study of knowledge and belief' }] },
          { code: 'PHL 301', title: 'Advanced Philosophy', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PHL 401', title: 'Philosophy Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'PHL 501', title: 'Philosophy Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Political Science',
        code: 'POL',
        courses: [
          {
            code: 'POL 101',
            title: 'Introduction to Political Science',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'The supreme power of a state to make and enforce laws within its territory is known as?',
                options: ['Authority', 'Sovereignty', 'Legitimacy', 'Democracy'],
                correctAnswer: 'Sovereignty',
              },
              {
                type: 'cbt',
                question: 'Which of the following is NOT an arm of government?',
                options: ['Executive', 'Judiciary', 'Legislature', 'Military'],
                correctAnswer: 'Military',
              },
              { type: 'cbt', question: 'What is democracy?', options: ['Government by a king', 'Government by a select elite', 'Government by the people', 'Government by the military'], correctAnswer: 'Government by the people' },
            ],
          },
          { code: 'POL 201', title: 'Intermediate Political Science', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is federalism?', options: ['A system with only one central government', 'A system where power is divided between central and regional governments', 'A type of monarchy', 'A form of military rule'], correctAnswer: 'A system where power is divided between central and regional governments' }] },
          { code: 'POL 301', title: 'Advanced Political Science', level: 300, semester: 'harmattan', questions: [] },
          { code: 'POL 401', title: 'Political Science Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'POL 501', title: 'Political Science Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Psychology',
        code: 'PSY',
        courses: [
          {
            code: 'PSY 101',
            title: 'Introduction to Psychology',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Who is known as the father of modern psychology?', options: ['Sigmund Freud', 'Wilhelm Wundt', 'Carl Jung', 'B.F. Skinner'], correctAnswer: 'Wilhelm Wundt' },
              { type: 'cbt', question: 'What is the scientific study of behaviour and mental processes called?', options: ['Sociology', 'Philosophy', 'Psychology', 'Anthropology'], correctAnswer: 'Psychology' },
            ],
          },
          { code: 'PSY 201', title: 'Intermediate Psychology', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the id in Freudian theory?', options: ['The rational part of the mind', 'The unconscious part containing basic instincts', 'The conscience', 'The conscious self'], correctAnswer: 'The unconscious part containing basic instincts' }] },
          { code: 'PSY 301', title: 'Advanced Psychology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PSY 401', title: 'Psychology Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'PSY 501', title: 'Psychology Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Sociology',
        code: 'SOC',
        courses: [
          {
            code: 'SOC 101',
            title: 'Introduction to Sociology',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Who is considered the founder of sociology?', options: ['Karl Marx', 'Max Weber', 'Auguste Comte', 'Emile Durkheim'], correctAnswer: 'Auguste Comte' },
              { type: 'cbt', question: 'What is social stratification?', options: ['A geological process', 'The hierarchical arrangement of individuals in society', 'The spread of culture', 'The migration of peoples'], correctAnswer: 'The hierarchical arrangement of individuals in society' },
            ],
          },
          { code: 'SOC 201', title: 'Intermediate Sociology', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is social mobility?', options: ['Moving between cities', 'Movement of individuals between different social positions', 'The speed of social change', 'Migration across borders'], correctAnswer: 'Movement of individuals between different social positions' }] },
          { code: 'SOC 301', title: 'Advanced Sociology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'SOC 401', title: 'Sociology Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'SOC 501', title: 'Sociology Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Library and Information Science',
        code: 'LIS',
        courses: [
          {
            code: 'LIS 101',
            title: 'Introduction to Library and Information Science',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the Dewey Decimal System?', options: ['A currency system', 'A library classification system for organising books', 'A type of computer program', 'A postal code system'], correctAnswer: 'A library classification system for organising books' },
              { type: 'cbt', question: 'What is a bibliography?', options: ["A book about someone's life", 'A list of sources or references used in a work', 'A type of novel', 'An index of names'], correctAnswer: 'A list of sources or references used in a work' },
            ],
          },
          { code: 'LIS 201', title: 'Intermediate Library and Information Science', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is information retrieval?', options: ['Deleting old records', 'The process of obtaining relevant information from a database or library', 'Translating documents', 'Storing data offline'], correctAnswer: 'The process of obtaining relevant information from a database or library' }] },
          { code: 'LIS 301', title: 'Advanced Library and Information Science', level: 300, semester: 'harmattan', questions: [] },
          { code: 'LIS 401', title: 'Library and Information Science Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'LIS 501', title: 'Library and Information Science Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Mass Communication',
        code: 'MCM',
        courses: [
          {
            code: 'MCM 101',
            title: 'Introduction to Mass Communication',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is mass communication?', options: ['Personal face-to-face conversation', 'The transmission of information to large audiences through media', 'Writing private letters', 'A type of mathematics'], correctAnswer: 'The transmission of information to large audiences through media' },
              { type: 'cbt', question: 'Which of the following is a mass medium?', options: ['A telephone call', 'Television', 'A personal diary', 'A handshake'], correctAnswer: 'Television' },
            ],
          },
          { code: 'MCM 201', title: 'Intermediate Mass Communication', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is gatekeeping in mass communication?', options: ['Locking physical gates', 'The process of selecting what information to publish or broadcast', 'Broadcasting without editing', 'Creating advertisements'], correctAnswer: 'The process of selecting what information to publish or broadcast' }] },
          { code: 'MCM 301', title: 'Advanced Mass Communication', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MCM 401', title: 'Mass Communication Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MCM 501', title: 'Mass Communication Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Economics',
        code: 'ECO',
        courses: [
          {
            code: 'ECO 101',
            title: 'Principles of Microeconomics',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'The central problem of economics is?',
                options: ['Poverty', 'Scarcity', 'Inflation', 'Unemployment'],
                correctAnswer: 'Scarcity',
              },
              {
                type: 'cbt',
                question: 'The responsiveness of quantity demanded to a change in price is called?',
                options: ['Price Ceiling', 'Price Floor', 'Price Elasticity', 'Opportunity Cost'],
                correctAnswer: 'Price Elasticity',
              },
              { type: 'cbt', question: 'What is GDP?', options: ['Global Data Production', 'Gross Domestic Product', 'Government Debt Policy', 'General Distribution Plan'], correctAnswer: 'Gross Domestic Product' },
            ],
          },
          { code: 'ECO 201', title: 'Intermediate Economics', level: 200, semester: 'harmattan', questions: [{ type: 'cbt', question: 'What is the law of supply?', options: ['As price rises, quantity supplied falls', 'As price rises, quantity supplied rises', 'Price and supply are unrelated', 'Supply is always constant'], correctAnswer: 'As price rises, quantity supplied rises' }] },
          { code: 'ECO 301', title: 'Advanced Economics', level: 300, semester: 'harmattan', questions: [] },
          { code: 'ECO 401', title: 'Economics Research Methods', level: 400, semester: 'harmattan', questions: [] },
          { code: 'ECO 501', title: 'Economics Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },
  // =====================================================
  // FACULTY OF ENVIRONMENTAL SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Environmental Sciences',
    code: 'FES',
    departments: [
      {
        deptName: 'Architecture',
        code: 'ARC',
        courses: [
          {
            code: 'ARC 101',
            title: 'Introduction to Architecture',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Architecture?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'ARC 201',
            title: 'Intermediate Architecture',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Architecture?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'ARC 301',
            title: 'Advanced Architecture',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ARC 401',
            title: 'Architecture Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ARC 501',
            title: 'Architecture Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Building',
        code: 'BLD',
        courses: [
          {
            code: 'BLD 101',
            title: 'Introduction to Building',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Building?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'BLD 201',
            title: 'Intermediate Building',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Building?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'BLD 301',
            title: 'Advanced Building',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'BLD 401',
            title: 'Building Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'BLD 501',
            title: 'Building Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Estate Management',
        code: 'ESM',
        courses: [
          {
            code: 'ESM 101',
            title: 'Introduction to Estate Management',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Estate Management?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'ESM 201',
            title: 'Intermediate Estate Management',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Estate Management?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'ESM 301',
            title: 'Advanced Estate Management',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ESM 401',
            title: 'Estate Management Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ESM 501',
            title: 'Estate Management Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Fine and Applied Arts',
        code: 'FAA',
        courses: [
          {
            code: 'FAA 101',
            title: 'Introduction to Fine and Applied Arts',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Fine and Applied Arts?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'FAA 201',
            title: 'Intermediate Fine and Applied Arts',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Fine and Applied Arts?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'FAA 301',
            title: 'Advanced Fine and Applied Arts',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'FAA 401',
            title: 'Fine and Applied Arts Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'FAA 501',
            title: 'Fine and Applied Arts Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Surveying and Geoinformatics',
        code: 'SVG',
        courses: [
          {
            code: 'SVG 101',
            title: 'Introduction to Surveying and Geoinformatics',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Surveying and Geoinformatics?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'SVG 201',
            title: 'Intermediate Surveying and Geoinformatics',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Surveying and Geoinformatics?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'SVG 301',
            title: 'Advanced Surveying and Geoinformatics',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'SVG 401',
            title: 'Surveying and Geoinformatics Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'SVG 501',
            title: 'Surveying and Geoinformatics Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Urban and Regional Planning',
        code: 'URP',
        courses: [
          {
            code: 'URP 101',
            title: 'Introduction to Urban and Regional Planning',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Urban and Regional Planning?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'URP 201',
            title: 'Intermediate Urban and Regional Planning',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Urban and Regional Planning?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'URP 301',
            title: 'Advanced Urban and Regional Planning',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'URP 401',
            title: 'Urban and Regional Planning Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'URP 501',
            title: 'Urban and Regional Planning Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
    ],
  },
  // =====================================================
  // FACULTY OF FOOD AND CONSUMER SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Food and Consumer Sciences',
    code: 'FFCS',
    departments: [
      {
        deptName: 'Food Science',
        code: 'FST',
        courses: [
          {
            code: 'FST 101',
            title: 'Introduction to Food Science',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Food Science?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'FST 201',
            title: 'Intermediate Food Science',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Food Science?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'FST 301',
            title: 'Advanced Food Science',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'FST 401',
            title: 'Food Science Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'FST 501',
            title: 'Food Science Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Nutrition and Dietetics',
        code: 'NTD',
        courses: [
          {
            code: 'NTD 101',
            title: 'Introduction to Nutrition and Dietetics',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Nutrition and Dietetics?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'NTD 201',
            title: 'Intermediate Nutrition and Dietetics',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Nutrition and Dietetics?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'NTD 301',
            title: 'Advanced Nutrition and Dietetics',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'NTD 401',
            title: 'Nutrition and Dietetics Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'NTD 501',
            title: 'Nutrition and Dietetics Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Consumer and Home Economics',
        code: 'CHE',
        courses: [
          {
            code: 'CHE 101',
            title: 'Introduction to Consumer and Home Economics',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Consumer and Home Economics?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'CHE 201',
            title: 'Intermediate Consumer and Home Economics',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Consumer and Home Economics?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'CHE 301',
            title: 'Advanced Consumer and Home Economics',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CHE 401',
            title: 'Consumer and Home Economics Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CHE 501',
            title: 'Consumer and Home Economics Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Hospitality and Tourism',
        code: 'HTM',
        courses: [
          {
            code: 'HTM 101',
            title: 'Introduction to Hospitality and Tourism',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Hospitality and Tourism?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'HTM 201',
            title: 'Intermediate Hospitality and Tourism',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Hospitality and Tourism?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'HTM 301',
            title: 'Advanced Hospitality and Tourism',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'HTM 401',
            title: 'Hospitality and Tourism Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'HTM 501',
            title: 'Hospitality and Tourism Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
    ],
  },
  // =====================================================
  // FACULTY OF BASIC CLINICAL SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Basic Clinical Sciences',
    code: 'FBCS',
    departments: [
      {
        deptName: 'Chemical Pathology',
        code: 'CPT',
        courses: [
          {
            code: 'CPT 101',
            title: 'Introduction to Chemical Pathology',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Chemical Pathology?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'CPT 201',
            title: 'Intermediate Chemical Pathology',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Chemical Pathology?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'CPT 301',
            title: 'Advanced Chemical Pathology',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CPT 401',
            title: 'Chemical Pathology Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CPT 501',
            title: 'Chemical Pathology Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Haematology and Blood Transfusion',
        code: 'HBT',
        courses: [
          {
            code: 'HBT 101',
            title: 'Introduction to Haematology and Blood Transfusion',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Haematology and Blood Transfusion?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'HBT 201',
            title: 'Intermediate Haematology and Blood Transfusion',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Haematology and Blood Transfusion?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'HBT 301',
            title: 'Advanced Haematology and Blood Transfusion',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'HBT 401',
            title: 'Haematology and Blood Transfusion Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'HBT 501',
            title: 'Haematology and Blood Transfusion Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Medical Microbiology and Parasitology',
        code: 'MMP',
        courses: [
          {
            code: 'MMP 101',
            title: 'Introduction to Medical Microbiology and Parasitology',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Medical Microbiology and Parasitology?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'MMP 201',
            title: 'Intermediate Medical Microbiology and Parasitology',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Medical Microbiology and Parasitology?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'MMP 301',
            title: 'Advanced Medical Microbiology and Parasitology',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MMP 401',
            title: 'Medical Microbiology and Parasitology Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MMP 501',
            title: 'Medical Microbiology and Parasitology Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Morbid Anatomy & Histopathology',
        code: 'MAH',
        courses: [
          {
            code: 'MAH 101',
            title: 'Introduction to Morbid Anatomy & Histopathology',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Morbid Anatomy & Histopathology?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'MAH 201',
            title: 'Intermediate Morbid Anatomy & Histopathology',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Morbid Anatomy & Histopathology?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'MAH 301',
            title: 'Advanced Morbid Anatomy & Histopathology',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MAH 401',
            title: 'Morbid Anatomy & Histopathology Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MAH 501',
            title: 'Morbid Anatomy & Histopathology Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Pharmacology & Therapeutics',
        code: 'PHT',
        courses: [
          {
            code: 'PHT 101',
            title: 'Introduction to Pharmacology & Therapeutics',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Pharmacology & Therapeutics?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'PHT 201',
            title: 'Intermediate Pharmacology & Therapeutics',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Pharmacology & Therapeutics?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'PHT 301',
            title: 'Advanced Pharmacology & Therapeutics',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'PHT 401',
            title: 'Pharmacology & Therapeutics Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'PHT 501',
            title: 'Pharmacology & Therapeutics Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
    ],
  },
  // =====================================================
  // FACULTY OF CLINICAL SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Clinical Sciences',
    code: 'FCS',
    departments: [
      {
        deptName: 'Anaesthesia',
        code: 'ANE',
        courses: [
          {
            code: 'ANE 101',
            title: 'Introduction to Anaesthesia',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Anaesthesia?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'ANE 201',
            title: 'Intermediate Anaesthesia',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Anaesthesia?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'ANE 301',
            title: 'Advanced Anaesthesia',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ANE 401',
            title: 'Anaesthesia Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ANE 501',
            title: 'Anaesthesia Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Community Medicine',
        code: 'CMM',
        courses: [
          {
            code: 'CMM 101',
            title: 'Introduction to Community Medicine',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Community Medicine?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'CMM 201',
            title: 'Intermediate Community Medicine',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Community Medicine?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'CMM 301',
            title: 'Advanced Community Medicine',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CMM 401',
            title: 'Community Medicine Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CMM 501',
            title: 'Community Medicine Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Ear, Nose and Throat',
        code: 'ENT',
        courses: [
          {
            code: 'ENT 101',
            title: 'Introduction to Ear, Nose and Throat',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Ear, Nose and Throat?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'ENT 201',
            title: 'Intermediate Ear, Nose and Throat',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Ear, Nose and Throat?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'ENT 301',
            title: 'Advanced Ear, Nose and Throat',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ENT 401',
            title: 'Ear, Nose and Throat Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ENT 501',
            title: 'Ear, Nose and Throat Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Medicine',
        code: 'MED',
        courses: [
          {
            code: 'MED 101',
            title: 'Introduction to Medicine',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Medicine?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'MED 201',
            title: 'Intermediate Medicine',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Medicine?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'MED 301',
            title: 'Advanced Medicine',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MED 401',
            title: 'Medicine Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MED 501',
            title: 'Medicine Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Obstetrics and Gynaecology',
        code: 'OBG',
        courses: [
          {
            code: 'OBG 101',
            title: 'Introduction to Obstetrics and Gynaecology',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Obstetrics and Gynaecology?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'OBG 201',
            title: 'Intermediate Obstetrics and Gynaecology',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Obstetrics and Gynaecology?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'OBG 301',
            title: 'Advanced Obstetrics and Gynaecology',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'OBG 401',
            title: 'Obstetrics and Gynaecology Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'OBG 501',
            title: 'Obstetrics and Gynaecology Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Ophthalmology',
        code: 'OPH',
        courses: [
          {
            code: 'OPH 101',
            title: 'Introduction to Ophthalmology',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Ophthalmology?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'OPH 201',
            title: 'Intermediate Ophthalmology',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Ophthalmology?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'OPH 301',
            title: 'Advanced Ophthalmology',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'OPH 401',
            title: 'Ophthalmology Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'OPH 501',
            title: 'Ophthalmology Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Pediatrics and Child Health',
        code: 'PCH',
        courses: [
          {
            code: 'PCH 101',
            title: 'Introduction to Pediatrics and Child Health',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Pediatrics and Child Health?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'PCH 201',
            title: 'Intermediate Pediatrics and Child Health',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Pediatrics and Child Health?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'PCH 301',
            title: 'Advanced Pediatrics and Child Health',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'PCH 401',
            title: 'Pediatrics and Child Health Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'PCH 501',
            title: 'Pediatrics and Child Health Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Psychiatry',
        code: 'PSY',
        courses: [
          {
            code: 'PSY 101',
            title: 'Introduction to Psychiatry',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Psychiatry?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'PSY 201',
            title: 'Intermediate Psychiatry',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Psychiatry?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'PSY 301',
            title: 'Advanced Psychiatry',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'PSY 401',
            title: 'Psychiatry Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'PSY 501',
            title: 'Psychiatry Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Radiology',
        code: 'RAD',
        courses: [
          {
            code: 'RAD 101',
            title: 'Introduction to Radiology',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Radiology?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'RAD 201',
            title: 'Intermediate Radiology',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Radiology?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'RAD 301',
            title: 'Advanced Radiology',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'RAD 401',
            title: 'Radiology Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'RAD 501',
            title: 'Radiology Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Surgery',
        code: 'SUR',
        courses: [
          {
            code: 'SUR 101',
            title: 'Introduction to Surgery',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Surgery?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'SUR 201',
            title: 'Intermediate Surgery',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Surgery?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'SUR 301',
            title: 'Advanced Surgery',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'SUR 401',
            title: 'Surgery Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'SUR 501',
            title: 'Surgery Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
    ],
  },
  // =====================================================
  // FACULTY OF NURSING SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Nursing Sciences',
    code: 'FNS',
    departments: [
      {
        deptName: 'Mental Health/Psychiatric Nursing',
        code: 'MHN',
        courses: [
          {
            code: 'MHN 101',
            title: 'Introduction to Mental Health/Psychiatric Nursing',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Mental Health/Psychiatric Nursing?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'MHN 201',
            title: 'Intermediate Mental Health/Psychiatric Nursing',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Mental Health/Psychiatric Nursing?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'MHN 301',
            title: 'Advanced Mental Health/Psychiatric Nursing',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MHN 401',
            title: 'Mental Health/Psychiatric Nursing Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MHN 501',
            title: 'Mental Health/Psychiatric Nursing Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Medical/Surgical Nursing',
        code: 'MSN',
        courses: [
          {
            code: 'MSN 101',
            title: 'Introduction to Medical/Surgical Nursing',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Medical/Surgical Nursing?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'MSN 201',
            title: 'Intermediate Medical/Surgical Nursing',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Medical/Surgical Nursing?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'MSN 301',
            title: 'Advanced Medical/Surgical Nursing',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MSN 401',
            title: 'Medical/Surgical Nursing Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MSN 501',
            title: 'Medical/Surgical Nursing Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Maternal and Child Health Nursing',
        code: 'MCN',
        courses: [
          {
            code: 'MCN 101',
            title: 'Introduction to Maternal and Child Health Nursing',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Maternal and Child Health Nursing?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'MCN 201',
            title: 'Intermediate Maternal and Child Health Nursing',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Maternal and Child Health Nursing?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'MCN 301',
            title: 'Advanced Maternal and Child Health Nursing',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MCN 401',
            title: 'Maternal and Child Health Nursing Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'MCN 501',
            title: 'Maternal and Child Health Nursing Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Public/Community Health Nursing',
        code: 'PHN',
        courses: [
          {
            code: 'PHN 101',
            title: 'Introduction to Public/Community Health Nursing',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Public/Community Health Nursing?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'PHN 201',
            title: 'Intermediate Public/Community Health Nursing',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Public/Community Health Nursing?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'PHN 301',
            title: 'Advanced Public/Community Health Nursing',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'PHN 401',
            title: 'Public/Community Health Nursing Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'PHN 501',
            title: 'Public/Community Health Nursing Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
    ],
  },
  // =====================================================
  // FACULTY OF RENEWABLE NATURAL RESOURCES
  // =====================================================

  {
    facultyName: 'Faculty of Renewable Natural Resources',
    code: 'FRNR',
    departments: [
      {
        deptName: 'Forest Resource Management',
        code: 'FRM',
        courses: [
          {
            code: 'FRM 101',
            title: 'Introduction to Forest Resource Management',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Forest Resource Management?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'FRM 201',
            title: 'Intermediate Forest Resource Management',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Forest Resource Management?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'FRM 301',
            title: 'Advanced Forest Resource Management',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'FRM 401',
            title: 'Forest Resource Management Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'FRM 501',
            title: 'Forest Resource Management Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Wildlife and Ecotourism Management',
        code: 'WEM',
        courses: [
          {
            code: 'WEM 101',
            title: 'Introduction to Wildlife and Ecotourism Management',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Wildlife and Ecotourism Management?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'WEM 201',
            title: 'Intermediate Wildlife and Ecotourism Management',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Wildlife and Ecotourism Management?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'WEM 301',
            title: 'Advanced Wildlife and Ecotourism Management',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'WEM 401',
            title: 'Wildlife and Ecotourism Management Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'WEM 501',
            title: 'Wildlife and Ecotourism Management Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Aquaculture and Fisheries Management',
        code: 'AFM',
        courses: [
          {
            code: 'AFM 101',
            title: 'Introduction to Aquaculture and Fisheries Management',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Aquaculture and Fisheries Management?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'AFM 201',
            title: 'Intermediate Aquaculture and Fisheries Management',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Aquaculture and Fisheries Management?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'AFM 301',
            title: 'Advanced Aquaculture and Fisheries Management',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'AFM 401',
            title: 'Aquaculture and Fisheries Management Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'AFM 501',
            title: 'Aquaculture and Fisheries Management Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
    ],
  },
  // =====================================================
  // FACULTY OF AGRICULTURAL SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Agricultural Sciences',
    code: 'FAS',
    departments: [
      {
        deptName: 'Agricultural Extension and Rural Development',
        code: 'AER',
        courses: [
          {
            code: 'AER 101',
            title: 'Introduction to Agricultural Extension and Rural Development',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Agricultural Extension and Rural Development?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'AER 201',
            title: 'Intermediate Agricultural Extension and Rural Development',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Agricultural Extension and Rural Development?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'AER 301',
            title: 'Advanced Agricultural Extension and Rural Development',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'AER 401',
            title: 'Agricultural Extension and Rural Development Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'AER 501',
            title: 'Agricultural Extension and Rural Development Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Animal Nutrition and Biotechnology',
        code: 'ANB',
        courses: [
          {
            code: 'ANB 101',
            title: 'Introduction to Animal Nutrition and Biotechnology',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Animal Nutrition and Biotechnology?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'ANB 201',
            title: 'Intermediate Animal Nutrition and Biotechnology',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Animal Nutrition and Biotechnology?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'ANB 301',
            title: 'Advanced Animal Nutrition and Biotechnology',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ANB 401',
            title: 'Animal Nutrition and Biotechnology Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'ANB 501',
            title: 'Animal Nutrition and Biotechnology Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Animal Production and Health',
        code: 'APH',
        courses: [
          {
            code: 'APH 101',
            title: 'Introduction to Animal Production and Health',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Animal Production and Health?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'APH 201',
            title: 'Intermediate Animal Production and Health',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Animal Production and Health?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'APH 301',
            title: 'Advanced Animal Production and Health',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'APH 401',
            title: 'Animal Production and Health Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'APH 501',
            title: 'Animal Production and Health Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Crop and Environmental Protection',
        code: 'CEP',
        courses: [
          {
            code: 'CEP 101',
            title: 'Introduction to Crop and Environmental Protection',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Crop and Environmental Protection?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'CEP 201',
            title: 'Intermediate Crop and Environmental Protection',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Crop and Environmental Protection?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'CEP 301',
            title: 'Advanced Crop and Environmental Protection',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CEP 401',
            title: 'Crop and Environmental Protection Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CEP 501',
            title: 'Crop and Environmental Protection Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Crop Production & Soil Science',
        code: 'CPS',
        courses: [
          {
            code: 'CPS 101',
            title: 'Introduction to Crop Production & Soil Science',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Crop Production & Soil Science?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'CPS 201',
            title: 'Intermediate Crop Production & Soil Science',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Crop Production & Soil Science?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'CPS 301',
            title: 'Advanced Crop Production & Soil Science',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CPS 401',
            title: 'Crop Production & Soil Science Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'CPS 501',
            title: 'Crop Production & Soil Science Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
      {
        deptName: 'Agricultural Economics',
        code: 'AEC',
        courses: [
          {
            code: 'AEC 101',
            title: 'Introduction to Agricultural Economics',
            level: 100,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'What is the foundational concept of Agricultural Economics?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
              }
            ],
          },
          {
            code: 'AEC 201',
            title: 'Intermediate Agricultural Economics',
            level: 200,
            semester: 'harmattan',
            questions: [
              {
                type: 'cbt',
                question: 'Which of the following applies to intermediate Agricultural Economics?',
                options: ['Concept X', 'Concept Y', 'Concept Z', 'Concept W'],
                correctAnswer: 'Concept X',
              }
            ],
          },
          {
            code: 'AEC 301',
            title: 'Advanced Agricultural Economics',
            level: 300,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'AEC 401',
            title: 'Agricultural Economics Research Methods',
            level: 400,
            semester: 'harmattan',
            questions: [],
          },
          {
            code: 'AEC 501',
            title: 'Agricultural Economics Seminar',
            level: 500,
            semester: 'harmattan',
            questions: [],
          }
        ],
      },
    ],
  },
];

// =====================================================
// SEED DATABASE
// =====================================================

export const seedDatabase = async () => {
  try {
    console.log(
      '[SEED] Starting full relational curriculum insertion...'
    );

    for (const fac of CURRICULUM_TREE) {
      // =================================================
      // FACULTY
      // =================================================

      const [insertedFaculty] = await db
        .insert(facultiesTable)
        .values({
          name: fac.facultyName,
          code: fac.code,
        })
        .onConflictDoUpdate({
          target: facultiesTable.code,

          set: {
            name: fac.facultyName,
          },
        })
        .returning();

      if (!insertedFaculty) {
        console.warn(
          `[SEED] Could not create/find faculty: ${fac.facultyName}`
        );

        continue;
      }

      // =================================================
      // DEPARTMENTS
      // =================================================

      for (const dept of fac.departments) {
        const existingDepartments = await db
          .select()
          .from(departmentsTable)
          .where(
            and(
              eq(
                departmentsTable.facultyId,
                insertedFaculty.id
              ),

              eq(
                departmentsTable.code,
                dept.code
              )
            )
          )
          .limit(1);

        // IMPORTANT:
        // Store the first result in a separate variable.
        // This avoids "Object is possibly undefined".
        let deptRecord =
          existingDepartments[0];

        if (!deptRecord) {
          const [newDepartment] =
            await db
              .insert(departmentsTable)
              .values({
                facultyId:
                  insertedFaculty.id,

                name:
                  dept.deptName,

                code:
                  dept.code,
              })
              .returning();

          if (!newDepartment) {
            console.warn(
              `[SEED] Could not create department: ${dept.deptName}`
            );

            continue;
          }

          deptRecord = newDepartment;
        } else {
          const [updatedDepartment] =
            await db
              .update(departmentsTable)
              .set({
                name:
                  dept.deptName,
              })
              .where(
                eq(
                  departmentsTable.id,
                  deptRecord.id
                )
              )
              .returning();

          if (updatedDepartment) {
            deptRecord = updatedDepartment;
          }
        }

        // =================================================
        // COURSES
        // =================================================

        for (const course of dept.courses) {
          const existingCourses =
            await db
              .select()
              .from(coursesTable)
              .where(
                and(
                  eq(
                    coursesTable.departmentId,
                    deptRecord.id
                  ),

                  eq(
                    coursesTable.code,
                    course.code
                  )
                )
              )
              .limit(1);

          let courseRecord =
            existingCourses[0];

          if (!courseRecord) {
            const [newCourse] =
              await db
                .insert(coursesTable)
                .values({
                  departmentId:
                    deptRecord.id,

                  code:
                    course.code,

                  title:
                    course.title,

                  level:
                    course.level,

                  semester:
                    course.semester,
                })
                .returning();

            if (!newCourse) {
              console.warn(
                `[SEED] Could not create course: ${course.code}`
              );

              continue;
            }

            courseRecord = newCourse;
          } else {
            const [updatedCourse] =
              await db
                .update(coursesTable)
                .set({
                  title:
                    course.title,

                  level:
                    course.level,

                  semester:
                    course.semester,
                })
                .where(
                  eq(
                    coursesTable.id,
                    courseRecord.id
                  )
                )
                .returning();

            if (updatedCourse) {
              courseRecord = updatedCourse;
            }
          }

          // =================================================
          // QUESTIONS
          // =================================================

          for (const q of course.questions) {
            const existingQuestions =
              await db
                .select()
                .from(questionsTable)
                .where(
                  and(
                    eq(
                      questionsTable.courseId,
                      courseRecord.id
                    ),

                    eq(
                      questionsTable.question,
                      q.question
                    )
                  )
                )
                .limit(1);

            const existingQuestion =
              existingQuestions[0];

            const gradingPoints =
              q.gradingPoints ?? [];

            // =============================================
            // UPDATE EXISTING QUESTION
            // =============================================

            if (existingQuestion) {
              await db
                .update(questionsTable)
                .set({
                  type:
                    q.type,

                  options:
                    q.options,

                  correctAnswer:
                    q.correctAnswer,

                  gradingPoints,

                  difficulty:
                    'medium',
                })
                .where(
                  eq(
                    questionsTable.id,
                    existingQuestion.id
                  )
                );

              console.log(
                `[SEED] Updated question: ${course.code} - ${q.question}`
              );
            }

            // =============================================
            // INSERT NEW QUESTION
            // =============================================

            else {
              await db
                .insert(questionsTable)
                .values({
                  courseId:
                    courseRecord.id,

                  type:
                    q.type,

                  question:
                    q.question,

                  options:
                    q.options,

                  correctAnswer:
                    q.correctAnswer,

                  gradingPoints,

                  difficulty:
                    'medium',
                });

              console.log(
                `[SEED] Inserted question: ${course.code} - ${q.question}`
              );
            }
          }
        }
      }
    }

    console.log(
      '[SEED] Successfully seeded curriculum, questions, and theory grading rubrics!'
    );

    process.exit(0);
  } catch (error) {
    console.error(
      '[SEED] Error seeding data:',
      error
    );

    process.exit(1);
  }
};

seedDatabase();