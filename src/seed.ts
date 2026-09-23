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
// CURRICULUM TREE - OFFICIAL LAUTECH ACADEMIC STRUCTURE
// =====================================================

const CURRICULUM_TREE: SeedFaculty[] = [
  // =====================================================
  // 1. FACULTY OF COMPUTING AND INFORMATICS
  // =====================================================
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
          { code: 'CSC 401', title: 'Software Engineering', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CSC 501', title: 'Artificial Intelligence & Expert Systems', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Cyber Security Science',
        code: 'CYB',
        courses: [
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
          { code: 'CYB 301', title: 'Network Security & Cryptography', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CYB 403', title: 'Digital Forensics', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CYB 405', title: 'Cyber Threat Intelligence', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CYB 411', title: 'Cloud Security', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CYB 415', title: 'Ethical Hacking', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CYB 501', title: 'Information Security Management', level: 500, semester: 'harmattan', questions: [] },
          { code: 'CYB 509', title: 'Malware Analysis', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Information Systems',
        code: 'INS',
        courses: [
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
          {
            code: 'INS 207',
            title: 'Database Systems & Information Management',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the primary language used to manage relational databases?', options: ['Python', 'SQL', 'C++', 'Java'], correctAnswer: 'SQL' },
              { type: 'cbt', question: 'What does a Primary Key ensure in a database table?', options: ['Column uniqueness and non-null values', 'Faster network transfer', 'Automatic encryption', 'Foreign key deletion'], correctAnswer: 'Column uniqueness and non-null values' },
            ],
          },
          { code: 'INS 301', title: 'Systems Analysis & Design', level: 300, semester: 'harmattan', questions: [] },
          { code: 'INS 401', title: 'Enterprise Architecture', level: 400, semester: 'harmattan', questions: [] },
          { code: 'INS 407', title: 'IT Project Management', level: 400, semester: 'harmattan', questions: [] },
          { code: 'INS 515', title: 'Information Systems Strategy & Governance', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 2. FACULTY OF ENGINEERING AND TECHNOLOGY
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
            title: 'Introduction to Computer Engineering',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which logic gate outputs TRUE only when both inputs are TRUE?', options: ['OR Gate', 'AND Gate', 'NOT Gate', 'XOR Gate'], correctAnswer: 'AND Gate' },
              { type: 'cbt', question: 'What is the binary representation of decimal 5?', options: ['100', '101', '110', '111'], correctAnswer: '101' },
            ],
          },
          {
            code: 'CPE 201',
            title: 'Digital Logic & Design',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which theorem is used to simplify Boolean expressions?', options: ['Ohm\'s Law', 'De Morgan\'s Law', 'Thevenin\'s Theorem', 'Fourier Transform'], correctAnswer: 'De Morgan\'s Law' },
              { type: 'cbt', question: 'What is a Flip-Flop in digital electronics?', options: ['A combinational circuit', 'A sequential bistable multivibrator used as memory', 'An amplifier circuit', 'A voltage regulator'], correctAnswer: 'A sequential bistable multivibrator used as memory' },
            ],
          },
          {
            code: 'CPE 301',
            title: 'Microprocessor Systems and Networks',
            level: 300,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'How many pins does the standard 8086 microprocessor have?', options: ['16', '24', '40', '64'], correctAnswer: '40' },
              {
                type: 'theory',
                question: 'Explain the role of interrupts in microprocessor architecture.',
                options: [],
                correctAnswer: 'Interrupts allow external devices or software conditions to temporarily halt the current execution of the CPU, prompting it to service a time-critical routine called an Interrupt Service Routine (ISR) before returning to its prior state.',
                gradingPoints: [
                  { concept: 'halts cpu execution temporarily', weight: 0.5, aliases: ['pauses processor', 'interrupts current program'] },
                  { concept: 'executes interrupt service routine isr', weight: 0.5, aliases: ['runs isr', 'handles interrupt service routine'] },
                ],
              },
            ],
          },
          { code: 'CPE 401', title: 'Embedded Systems Engineering', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CPE 501', title: 'Computer Systems Architecture & Design', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Mechanical Engineering',
        code: 'MEE',
        courses: [
          {
            code: 'MEE 101',
            title: 'Applied Mechanics I',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 'Newton' },
              { type: 'cbt', question: 'What does Newton\'s First Law of Motion state?', options: ['Force equals mass times acceleration', 'An object at rest stays at rest unless acted upon by an external force', 'Every action has an equal and opposite reaction', 'Energy cannot be created or destroyed'], correctAnswer: 'An object at rest stays at rest unless acted upon by an external force' },
            ],
          },
          {
            code: 'MEE 201',
            title: 'Engineering Thermodynamics',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What does the First Law of Thermodynamics state?', options: ['Entropy of an isolated system always increases', 'Energy can neither be created nor destroyed, only transformed', 'Absolute zero cannot be reached', 'Pressure is inversely proportional to volume'], correctAnswer: 'Energy can neither be created nor destroyed, only transformed' },
              { type: 'cbt', question: 'What is an isobaric process?', options: ['A process occurring at constant temperature', 'A process occurring at constant pressure', 'A process occurring at constant volume', 'A process with no heat transfer'], correctAnswer: 'A process occurring at constant pressure' },
            ],
          },
          { code: 'MEE 301', title: 'Fluid Mechanics', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MEE 401', title: 'Heat and Mass Transfer', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MEE 501', title: 'Mechanical Vibrations & Machine Design', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Civil Engineering',
        code: 'CVE',
        courses: [
          {
            code: 'CVE 101',
            title: 'Introduction to Civil Engineering',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which material is primarily formed by mixing cement, water, sand, and aggregates?', options: ['Timber', 'Concrete', 'Asphalt', 'Steel'], correctAnswer: 'Concrete' },
              { type: 'cbt', question: 'What is the primary function of a foundation in civil structures?', options: ['To provide aesthetic value', 'To safely transmit building loads to the supporting ground', 'To prevent roof leakage', 'To insulate against heat'], correctAnswer: 'To safely transmit building loads to the supporting ground' },
            ],
          },
          {
            code: 'CVE 202',
            title: 'Strength of Materials & Mechanics of Solids',
            level: 200,
            semester: 'rain',
            questions: [
              { type: 'cbt', question: 'What is the ratio of tensile stress to tensile strain called?', options: ['Poisson\'s ratio', 'Shear modulus', 'Young\'s modulus', 'Bulk modulus'], correctAnswer: 'Young\'s modulus' },
              { type: 'cbt', question: 'What is Hooke\'s Law valid up to?', options: ['Yield point', 'Elastic limit', 'Plastic range', 'Fracture point'], correctAnswer: 'Elastic limit' },
            ],
          },
          { code: 'CVE 301', title: 'Structural Analysis I', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CVE 401', title: 'Geotechnical Engineering & Soil Mechanics', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CVE 501', title: 'Reinforced Concrete & Foundation Design', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Agricultural Engineering',
        code: 'AGE',
        courses: [
          {
            code: 'AGE 101',
            title: 'Introduction to Agricultural Engineering',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the primary role of agricultural engineering?', options: ['Crop harvesting by hand only', 'Application of engineering principles to agricultural production and processing', 'Animal medication diagnosis', 'Financial auditing of farms'], correctAnswer: 'Application of engineering principles to agricultural production and processing' },
              { type: 'cbt', question: 'Which machine is widely used for primary tillage in mechanized farming?', options: ['Combine harvester', 'Mouldboard plough', 'Grain dryer', 'Sprinkler'], correctAnswer: 'Mouldboard plough' },
            ],
          },
          {
            code: 'AGE 201',
            title: 'Farm Power and Machinery',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What component of a tractor delivers rotational mechanical power to attached implements?', options: ['Differential lock', 'Power Take-Off (PTO) shaft', 'Drawbar', 'Carburettor'], correctAnswer: 'Power Take-Off (PTO) shaft' },
              { type: 'cbt', question: 'Which engine cycle is standard for modern heavy farm tractors?', options: ['Four-stroke diesel cycle', 'Two-stroke petrol cycle', 'Rotary Wankel cycle', 'Steam Rankine cycle'], correctAnswer: 'Four-stroke diesel cycle' },
            ],
          },
          { code: 'AGE 301', title: 'Soil and Water Engineering', level: 300, semester: 'harmattan', questions: [] },
          { code: 'AGE 401', title: 'Post-Harvest Processing Technology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'AGE 501', title: 'Farm Structures and Environmental Control', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Chemical Engineering',
        code: 'CHE',
        courses: [
          {
            code: 'CHE 101',
            title: 'Introduction to Chemical Engineering',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the primary focus of Chemical Engineering?', options: ['Designing microchips', 'Transforming raw materials into useful chemical products at industrial scale', 'Constructing highways', 'Building residential structures'], correctAnswer: 'Transforming raw materials into useful chemical products at industrial scale' },
              { type: 'cbt', question: 'Which law forms the basis of material balance calculations?', options: ['Law of Conservation of Mass', 'Ohm\'s Law', 'Coulomb\'s Law', 'Bernoulli\'s Principle'], correctAnswer: 'Law of Conservation of Mass' },
            ],
          },
          {
            code: 'CHE 201',
            title: 'Chemical Process Principles & Stoichiometry',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What separation technique separates components based on differences in boiling points?', options: ['Filtration', 'Distillation', 'Centrifugation', 'Crystallization'], correctAnswer: 'Distillation' },
              { type: 'cbt', question: 'What is a steady-state process in chemical engineering?', options: ['Process where variables change rapidly over time', 'Process where system variables remain constant with respect to time', 'Process operating at absolute zero', 'Process with no mass input'], correctAnswer: 'Process where system variables remain constant with respect to time' },
            ],
          },
          { code: 'CHE 301', title: 'Chemical Engineering Thermodynamics', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CHE 401', title: 'Unit Operations & Separation Processes', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CHE 501', title: 'Chemical Reaction Engineering & Plant Design', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Electronic and Electrical Engineering',
        code: 'EEE',
        courses: [
          {
            code: 'EEE 101',
            title: 'Basic Electrical Engineering',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the unit of electrical potential difference?', options: ['Ampere', 'Volt', 'Ohm', 'Farad'], correctAnswer: 'Volt' },
              { type: 'cbt', question: 'According to Ohm\'s Law, current (I) equals:', options: ['V × R', 'V / R', 'R / V', 'V + R'], correctAnswer: 'V / R' },
            ],
          },
          {
            code: 'EEE 201',
            title: 'Circuit Theory and Electronics',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which semiconductor device allows current to flow in only one direction?', options: ['Resistor', 'Diode', 'Inductor', 'Capacitor'], correctAnswer: 'Diode' },
              { type: 'cbt', question: 'What theorem states that algebraic sum of currents entering a node is zero?', options: ['Kirchhoff\'s Voltage Law (KVL)', 'Kirchhoff\'s Current Law (KCL)', 'Norton\'s Theorem', 'Superposition Theorem'], correctAnswer: 'Kirchhoff\'s Current Law (KCL)' },
            ],
          },
          { code: 'EEE 301', title: 'Electromagnetic Fields and Waves', level: 300, semester: 'harmattan', questions: [] },
          { code: 'EEE 401', title: 'Control Systems Engineering', level: 400, semester: 'harmattan', questions: [] },
          { code: 'EEE 501', title: 'Power System Analysis & High Voltage Engineering', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Food Engineering',
        code: 'FDE',
        courses: [
          {
            code: 'FDE 101',
            title: 'Introduction to Food Engineering',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is food engineering?', options: ['Cooking in restaurants', 'Application of engineering principles to the processing, preservation, and packaging of food', 'Organic farming', 'Grocery retail management'], correctAnswer: 'Application of engineering principles to the processing, preservation, and packaging of food' },
              { type: 'cbt', question: 'Which thermal process is commonly used to eliminate pathogenic organisms in milk?', options: ['Fermentation', 'Pasteurization', 'Freezing', 'Milling'], correctAnswer: 'Pasteurization' },
            ],
          },
          {
            code: 'FDE 201',
            title: 'Food Process Engineering Principles',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is water activity (aw) in food preservation?', options: ['The total weight of water', 'The ratio of vapor pressure of water in food to pure water', 'The pH of food water', 'The boiling point of food'], correctAnswer: 'The ratio of vapor pressure of water in food to pure water' },
              { type: 'cbt', question: 'Which drying method relies on sublimation of ice under vacuum?', options: ['Spray drying', 'Freeze drying (Lyophilization)', 'Drum drying', 'Sun drying'], correctAnswer: 'Freeze drying (Lyophilization)' },
            ],
          },
          { code: 'FDE 301', title: 'Heat and Mass Transfer in Food Processing', level: 300, semester: 'harmattan', questions: [] },
          { code: 'FDE 401', title: 'Food Processing Plant Machinery & Storage', level: 400, semester: 'harmattan', questions: [] },
          { code: 'FDE 501', title: 'Food Plant Design and Quality Assurance', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 3. FACULTY OF ENVIRONMENTAL SCIENCES
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
            title: 'Introduction to Architectural Design',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What are the three core principles of architecture identified by Vitruvius?', options: ['Speed, Cost, Size', 'Durability, Utility, Beauty (Firmitas, Utilitas, Venustas)', 'Height, Depth, Volume', 'Color, Shadow, Texture'], correctAnswer: 'Durability, Utility, Beauty (Firmitas, Utilitas, Venustas)' },
              { type: 'cbt', question: 'What is an orthographic projection used for in architectural drafting?', options: ['Creating 3D artistic rendering', 'Representing a 3D object in two dimensions using parallel projection lines', 'Recording sound acoustic reflections', 'Measuring soil load capacity'], correctAnswer: 'Representing a 3D object in two dimensions using parallel projection lines' },
            ],
          },
          {
            code: 'ARC 201',
            title: 'Architectural Graphics & Studio',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is a building elevation in architectural drawings?', options: ['A horizontal cut through a building', 'A view of a building seen from one side (exterior facade)', 'A view from directly above', 'A structural foundation diagram'], correctAnswer: 'A view of a building seen from one side (exterior facade)' },
              { type: 'cbt', question: 'What standard scale is commonly used for residential floor plans in Nigeria?', options: ['1:1', '1:50 or 1:100', '1:1000', '1:5000'], correctAnswer: '1:50 or 1:100' },
            ],
          },
          { code: 'ARC 301', title: 'Building Climatology & Advanced Design', level: 300, semester: 'harmattan', questions: [] },
          { code: 'ARC 401', title: 'Urban Design & Housing', level: 400, semester: 'harmattan', questions: [] },
          { code: 'ARC 501', title: 'Professional Practice & Thesis', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Building',
        code: 'BLD',
        courses: [
          {
            code: 'BLD 101',
            title: 'Introduction to Building Technology',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the substructure of a building?', options: ['The roof and ceiling', 'The part of the building below ground level including the foundation', 'The windows and doors', 'The interior wall finishes'], correctAnswer: 'The part of the building below ground level including the foundation' },
              { type: 'cbt', question: 'What is the primary function of damp proof course (DPC)?', options: ['To increase wall strength', 'To prevent rising damp from ground into walls', 'To provide thermal insulation', 'To anchor roof trusses'], correctAnswer: 'To prevent rising damp from ground into walls' },
            ],
          },
          {
            code: 'BLD 201',
            title: 'Building Construction & Materials',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is curing of concrete?', options: ['Painting the surface', 'Maintaining adequate moisture and temperature during early hardening to achieve target strength', 'Mixing sand and gravel', 'Demolishing defective structural members'], correctAnswer: 'Maintaining adequate moisture and temperature during early hardening to achieve target strength' },
              { type: 'cbt', question: 'Which bond in bricklaying consists of alternate headers and stretchers in every course?', options: ['English Bond', 'Flemish Bond', 'Stretcher Bond', 'Header Bond'], correctAnswer: 'Flemish Bond' },
            ],
          },
          { code: 'BLD 301', title: 'Structural Mechanics & Building Services', level: 300, semester: 'harmattan', questions: [] },
          { code: 'BLD 401', title: 'Construction Management & Economics', level: 400, semester: 'harmattan', questions: [] },
          { code: 'BLD 501', title: 'Advanced Building Maintenance & Project Management', level: 500, semester: 'harmattan', questions: [] },
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
              { type: 'cbt', question: 'What is real property in estate management?', options: ['Moveable household furniture', 'Land and all permanently attached structures', 'Bank cash reserves', 'Intellectual patents'], correctAnswer: 'Land and all permanently attached structures' },
              { type: 'cbt', question: 'What constitutes a freehold estate?', options: ['An estate with indefinite duration of ownership', 'A tenancy lasting strictly 1 year', 'A government leasehold of 99 years', 'A monthly rental contract'], correctAnswer: 'An estate with indefinite duration of ownership' },
            ],
          },
          {
            code: 'ESM 201',
            title: 'Principles of Valuation I',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which method of valuation is based on comparing sales prices of similar properties in the area?', options: ['Cost Method', 'Investment Method', 'Comparable Sales (Market) Method', 'Residual Method'], correctAnswer: 'Comparable Sales (Market) Method' },
              { type: 'cbt', question: 'What is Years Purchase (YP) in property valuation?', options: ['The calendar year a house was purchased', 'The present value of a periodic income of 1 Naira for a specified period', 'The mortgage repayment period', 'The depreciation rate per year'], correctAnswer: 'The present value of a periodic income of 1 Naira for a specified period' },
            ],
          },
          { code: 'ESM 301', title: 'Property Development & Finance', level: 300, semester: 'harmattan', questions: [] },
          { code: 'ESM 401', title: 'Urban Land Economics', level: 400, semester: 'harmattan', questions: [] },
          { code: 'ESM 501', title: 'Property Rating & Taxation', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Fine and Applied Arts',
        code: 'FAA',
        courses: [
          {
            code: 'FAA 101',
            title: 'Basic Drawing and Design',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which of the following are the primary colors in traditional art?', options: ['Green, Orange, Violet', 'Red, Yellow, Blue', 'Black, White, Gray', 'Cyan, Magenta, Yellow'], correctAnswer: 'Red, Yellow, Blue' },
              { type: 'cbt', question: 'What is chiaroscuro in drawing and painting?', options: ['The use of strong contrasts between light and dark to give volume', 'Sculpting with plaster', 'Weaving textile patterns', 'Firing clay in a kiln'], correctAnswer: 'The use of strong contrasts between light and dark to give volume' },
            ],
          },
          {
            code: 'FAA 201',
            title: 'History of African Art & Studio Practice',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which ancient Nigerian civilization is famous for its terracotta sculptures dating back to 500 BC?', options: ['Nok culture', 'Igbo-Ukwu bronze', 'Benin kingdom', 'Oyo Empire'], correctAnswer: 'Nok culture' },
              { type: 'cbt', question: 'What traditional medium was extensively utilized in the historical brass castings of ancient Benin?', options: ['Direct stone carving', 'Lost-wax (cire perdue) casting technique', 'Welded steel assembly', 'Plaster molding'], correctAnswer: 'Lost-wax (cire perdue) casting technique' },
            ],
          },
          { code: 'FAA 301', title: 'Painting, Sculpture & Ceramics', level: 300, semester: 'harmattan', questions: [] },
          { code: 'FAA 401', title: 'Advanced Studio Exploration & Exhibition', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Surveying and Geoinformatics',
        code: 'SVG',
        courses: [
          {
            code: 'SVG 101',
            title: 'Introduction to Surveying',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the primary objective of land surveying?', options: ['Designing interior rooms', 'Determining the terrestrial positions of points and distances/angles between them', 'Manufacturing concrete blocks', 'Estimating building construction cost'], correctAnswer: 'Determining the terrestrial positions of points and distances/angles between them' },
              { type: 'cbt', question: 'Which instrument is primarily used for measuring horizontal and vertical angles in surveying?', options: ['Theodolite', 'Hydrometer', 'Barometer', 'Anemometer'], correctAnswer: 'Theodolite' },
            ],
          },
          {
            code: 'SVG 201',
            title: 'Basic Land Surveying & Levelling',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is a Bench Mark (BM) in levelling operations?', options: ['A temporary station for equipment storage', 'A permanent reference point of known elevation above sea level', 'A tripod locking mechanism', 'A compass bearing error'], correctAnswer: 'A permanent reference point of known elevation above sea level' },
              { type: 'cbt', question: 'What does GPS stand for in satellite geoinformatics?', options: ['Geodetic Position Scanner', 'Global Positioning System', 'General Photogrammetry Satellite', 'Geographic Planning Survey'], correctAnswer: 'Global Positioning System' },
            ],
          },
          { code: 'SVG 301', title: 'Geodesy & Photogrammetry', level: 300, semester: 'harmattan', questions: [] },
          { code: 'SVG 401', title: 'Geographic Information Systems & Remote Sensing', level: 400, semester: 'harmattan', questions: [] },
          { code: 'SVG 501', title: 'Hydrographic & Engineering Surveying', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Urban and Regional Planning',
        code: 'URP',
        courses: [
          {
            code: 'URP 101',
            title: 'Introduction to City & Regional Planning',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is zoning in urban planning?', options: ['Constructing boundary fences', 'Dividing urban land into zones designated for specific uses like residential, commercial, or industrial', 'Measuring road speeds', 'Allocating water pipes'], correctAnswer: 'Dividing urban land into zones designated for specific uses like residential, commercial, or industrial' },
              { type: 'cbt', question: 'What is urban sprawl?', options: ['The rapid, uncontrolled expansion of urban areas into surrounding rural land', 'Vertical building of skyscrapers', 'Subway train construction', 'Planting of city trees'], correctAnswer: 'The rapid, uncontrolled expansion of urban areas into surrounding rural land' },
            ],
          },
          {
            code: 'URP 201',
            title: 'Planning Studio & Site Planning',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is a master plan in urban development?', options: ['A blueprint for a single family house', 'A comprehensive long-term planning document guiding the physical and economic growth of an entire city', 'A daily traffic schedule', 'A tax billing system'], correctAnswer: 'A comprehensive long-term planning document guiding the physical and economic growth of an entire city' },
              { type: 'cbt', question: 'What is the purpose of an Environmental Impact Assessment (EIA) in planning?', options: ['To determine contractor wages', 'To evaluate the likely environmental consequences of a proposed development project', 'To design electrical wiring', 'To market real estate properties'], correctAnswer: 'To evaluate the likely environmental consequences of a proposed development project' },
            ],
          },
          { code: 'URP 301', title: 'Regional Planning Techniques & Transportation', level: 300, semester: 'harmattan', questions: [] },
          { code: 'URP 401', title: 'Environmental Impact Assessment & Urban Renewal', level: 400, semester: 'harmattan', questions: [] },
          { code: 'URP 501', title: 'Planning Law, Administration & Governance', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 4. FACULTY OF FOOD AND CONSUMER SCIENCES
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
              { type: 'cbt', question: 'What is food science?', options: ['Agricultural crop planting', 'The study of the physical, chemical, and biological makeup of food and the concepts underlying food processing', 'Culinary menu pricing', 'Supermarket shelf arrangement'], correctAnswer: 'The study of the physical, chemical, and biological makeup of food and the concepts underlying food processing' },
              { type: 'cbt', question: 'Which nutrient group is the primary source of immediate energy for the human body?', options: ['Proteins', 'Carbohydrates', 'Vitamins', 'Minerals'], correctAnswer: 'Carbohydrates' },
            ],
          },
          {
            code: 'FST 201',
            title: 'Food Chemistry & Biochemistry',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What reaction causes non-enzymatic browning in cooked foods involving amino acids and reducing sugars?', options: ['Photosynthesis', 'Maillard reaction', 'Hydrolysis', 'Saponification'], correctAnswer: 'Maillard reaction' },
              { type: 'cbt', question: 'What is retrogradation in starchy food systems?', options: ['The breakdown of lipids', 'The realignment of amylose and amylopectin molecules upon cooling of gelatinized starch', 'The fermentation of sugars by yeast', 'The oxidation of ascorbic acid'], correctAnswer: 'The realignment of amylose and amylopectin molecules upon cooling of gelatinized starch' },
            ],
          },
          { code: 'FST 301', title: 'Food Microbiology & Preservation', level: 300, semester: 'harmattan', questions: [] },
          { code: 'FST 401', title: 'Sensory Evaluation & Food Analysis', level: 400, semester: 'harmattan', questions: [] },
          { code: 'FST 501', title: 'Food Quality Control & Product Development', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Nutrition and Dietetics',
        code: 'NTD',
        courses: [
          {
            code: 'NTD 101',
            title: 'Introduction to Human Nutrition',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which deficiency disease is caused by inadequate dietary intake of Vitamin C?', options: ['Rickets', 'Scurvy', 'Beriberi', 'Pellagra'], correctAnswer: 'Scurvy' },
              { type: 'cbt', question: 'What are the fat-soluble vitamins?', options: ['Vitamins B and C', 'Vitamins A, D, E, and K', 'Vitamins B1, B2, and B6', 'Vitamin C and Folic Acid'], correctAnswer: 'Vitamins A, D, E, and K' },
            ],
          },
          {
            code: 'NTD 201',
            title: 'Nutritional Biochemistry & Human Metabolism',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What metabolic pathway converts glucose into pyruvate to yield ATP?', options: ['Gluconeogenesis', 'Glycolysis', 'Beta-oxidation', 'Urea cycle'], correctAnswer: 'Glycolysis' },
              { type: 'cbt', question: 'What is Basal Metabolic Rate (BMR)?', options: ['Energy expended during vigorous exercise', 'The minimum amount of energy required to sustain vital bodily functions at complete rest', 'Total daily caloric intake', 'Energy used for digesting food'], correctAnswer: 'The minimum amount of energy required to sustain vital bodily functions at complete rest' },
            ],
          },
          { code: 'NTD 301', title: 'Clinical Nutrition & Diet Therapy', level: 300, semester: 'harmattan', questions: [] },
          { code: 'NTD 401', title: 'Community Nutrition & Assessment', level: 400, semester: 'harmattan', questions: [] },
          { code: 'NTD 501', title: 'Public Health Nutrition & Dietetics Internship', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Consumer and Home Economics',
        code: 'CFS',
        courses: [
          {
            code: 'CFS 101',
            title: 'Introduction to Consumer & Home Economics',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the core focus of Consumer and Home Economics?', options: ['Commercial banking', 'Improving the well-being of individuals, families, and communities through resource management', 'Stock market trading', 'Automobile repair'], correctAnswer: 'Improving the well-being of individuals, families, and communities through resource management' },
              { type: 'cbt', question: 'What are consumer rights designed to protect against?', options: ['Fair competition', 'Unfair business practices, hazardous products, and misleading advertising', 'Voluntary donations', 'Product warranties'], correctAnswer: 'Unfair business practices, hazardous products, and misleading advertising' },
            ],
          },
          {
            code: 'CFS 201',
            title: 'Family Resource Management & Consumer Behavior',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is a family budget?', options: ['A list of family groceries only', 'A planned financial statement balancing expected income and expenditures over a given period', 'A tax penalty notice', 'A bank loan application'], correctAnswer: 'A planned financial statement balancing expected income and expenditures over a given period' },
              { type: 'cbt', question: 'Which factor most heavily influences consumer decision-making during purchasing?', options: ['Income, price, perceived quality, and personal preferences', 'Only the weather forecast', 'Store paint color', 'The date of company registration'], correctAnswer: 'Income, price, perceived quality, and personal preferences' },
            ],
          },
          { code: 'CFS 301', title: 'Textiles, Clothing & Interior Design', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CFS 401', title: 'Consumer Rights, Economics & Child Development', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CFS 501', title: 'Family Studies & Community Development Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Hospitality and Tourism',
        code: 'HTM',
        courses: [
          {
            code: 'HTM 101',
            title: 'Introduction to Hospitality & Tourism Management',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What are the main sectors of the hospitality industry?', options: ['Accommodation, food and beverage, travel, and recreation', 'Mining, forestry, and construction', 'Heavy manufacturing and chemical refining', 'Banking and telecommunications only'], correctAnswer: 'Accommodation, food and beverage, travel, and recreation' },
              { type: 'cbt', question: 'What is ecotourism?', options: ['Mass urban clubbing', 'Responsible travel to natural areas that conserves the environment and improves local well-being', 'High-end luxury gambling trips', 'Business corporate conferences'], correctAnswer: 'Responsible travel to natural areas that conserves the environment and improves local well-being' },
            ],
          },
          {
            code: 'HTM 201',
            title: 'Food and Beverage Operations',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is an "A la carte" menu?', options: ['A fixed price multi-course meal', 'A menu where each item is ordered and priced separately', 'A free buffet service', 'A staff-only cafeteria list'], correctAnswer: 'A menu where each item is ordered and priced separately' },
              { type: 'cbt', question: 'What does FIFO stand for in hospitality inventory management?', options: ['First In, First Out', 'Fast Income, Fast Output', 'Fixed In, Flexible Out', 'Final Invoice, Final Order'], correctAnswer: 'First In, First Out' },
            ],
          },
          { code: 'HTM 301', title: 'Hotel Front Office & Accommodation Management', level: 300, semester: 'harmattan', questions: [] },
          { code: 'HTM 401', title: 'Tourism Planning & Sustainable Development', level: 400, semester: 'harmattan', questions: [] },
          { code: 'HTM 501', title: 'Strategic Hospitality Management & Resort Planning', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 5. FACULTY OF MANAGEMENT SCIENCES
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
            title: 'Financial Accounting I',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the fundamental accounting equation?', options: ['Assets = Liabilities - Equity', 'Assets = Liabilities + Equity', 'Equity = Assets + Liabilities', 'Liabilities = Assets + Equity'], correctAnswer: 'Assets = Liabilities + Equity' },
              { type: 'cbt', question: 'In double-entry bookkeeping, an increase in an asset is recorded as a:', options: ['Credit', 'Debit', 'Liability', 'Revenue'], correctAnswer: 'Debit' },
              { type: 'cbt', question: 'Which financial statement shows a company\'s financial position at a specific point in time?', options: ['Income Statement', 'Cash Flow Statement', 'Balance Sheet (Statement of Financial Position)', 'Statement of Changes in Equity'], correctAnswer: 'Balance Sheet (Statement of Financial Position)' },
            ],
          },
          {
            code: 'ACC 201',
            title: 'Cost & Management Accounting',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is a fixed cost in managerial accounting?', options: ['A cost that changes directly with production volume', 'A cost that remains constant in total regardless of output level within a relevant range', 'The cost of direct materials', 'The sales commission paid to agents'], correctAnswer: 'A cost that remains constant in total regardless of output level within a relevant range' },
              { type: 'cbt', question: 'What is the break-even point?', options: ['The point where profit equals total cost', 'The sales volume where total revenue equals total costs (zero profit/loss)', 'The maximum possible production capacity', 'The point of highest dividend payment'], correctAnswer: 'The sales volume where total revenue equals total costs (zero profit/loss)' },
            ],
          },
          { code: 'ACC 301', title: 'Auditing & Assurance Services', level: 300, semester: 'harmattan', questions: [] },
          { code: 'ACC 401', title: 'Advanced Financial Accounting & Reporting', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Marketing',
        code: 'MKT',
        courses: [
          {
            code: 'MKT 101',
            title: 'Fundamentals of Marketing',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What are the traditional 4 Ps of the marketing mix?', options: ['Price, Production, People, Policy', 'Product, Price, Place, Promotion', 'Plan, Package, Perform, Profit', 'People, Process, Physical evidence, Position'], correctAnswer: 'Product, Price, Place, Promotion' },
              { type: 'cbt', question: 'What is market segmentation?', options: ['Dividing a broad market into distinct subsets of consumers with common needs', 'Setting the final retail price', 'Terminating unprofitable products', 'Exporting products overseas'], correctAnswer: 'Dividing a broad market into distinct subsets of consumers with common needs' },
              { type: 'cbt', question: 'Which marketing orientation focuses on meeting customer needs better than competitors?', options: ['Production Concept', 'Product Concept', 'Marketing Concept', 'Selling Concept'], correctAnswer: 'Marketing Concept' },
            ],
          },
          {
            code: 'MKT 201',
            title: 'Consumer Behavior & Market Research',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is cognitive dissonance in consumer behavior?', options: ['Excitement immediately upon purchasing a luxury item', 'Post-purchase psychological tension or doubt about whether the right decision was made', 'The desire to imitate friends\' shopping habits', 'Automatic repeat purchasing'], correctAnswer: 'Post-purchase psychological tension or doubt about whether the right decision was made' },
              { type: 'cbt', question: 'What is primary data in marketing research?', options: ['Data collected for the first time specifically for the research problem at hand', 'Data published in government census reports', 'Competitor financial balance sheets', 'Old company sales records'], correctAnswer: 'Data collected for the first time specifically for the research problem at hand' },
            ],
          },
          { code: 'MKT 301', title: 'Product Planning & Pricing Strategy', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MKT 401', title: 'Strategic Marketing Management & Global Marketing', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Business Management',
        code: 'MGT',
        courses: [
          {
            code: 'MGT 101',
            title: 'Introduction to Business Management',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What are the four primary functions of management?', options: ['Planning, Organizing, Leading, Controlling', 'Hiring, Firing, Selling, Accounting', 'Buying, Producing, Marketing, Financing', 'Strategizing, Budgeting, Advertising, Delivering'], correctAnswer: 'Planning, Organizing, Leading, Controlling' },
              { type: 'cbt', question: 'Who is recognized as the father of Scientific Management?', options: ['Henri Fayol', 'Max Weber', 'Frederick W. Taylor', 'Peter Drucker'], correctAnswer: 'Frederick W. Taylor' },
              { type: 'cbt', question: 'What is a SWOT analysis used for in strategic planning?', options: ['Calculating income tax', 'Assessing Strengths, Weaknesses, Opportunities, and Threats', 'Monitoring employee attendance', 'Auditing inventory count'], correctAnswer: 'Assessing Strengths, Weaknesses, Opportunities, and Threats' },
            ],
          },
          {
            code: 'MGT 201',
            title: 'Organizational Behavior & Theory',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is at the base (lowest level) of Maslow\'s Hierarchy of Needs?', options: ['Self-actualization', 'Safety needs', 'Physiological needs', 'Esteem needs'], correctAnswer: 'Physiological needs' },
              { type: 'cbt', question: 'What does Douglas McGregor\'s Theory Y assume about employees?', options: ['Employees naturally dislike work and must be coerced', 'Employees are self-motivated, enjoy work, and seek responsibility', 'Employees only care about monetary bonuses', 'Employees cannot be trained'], correctAnswer: 'Employees are self-motivated, enjoy work, and seek responsibility' },
            ],
          },
          { code: 'MGT 301', title: 'Human Resource Management', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MGT 401', title: 'Strategic Management & Business Policy', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Transport Management',
        code: 'TRM',
        courses: [
          {
            code: 'TRM 101',
            title: 'Introduction to Transport Systems',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What does transport management primarily involve?', options: ['Manufacturing goods', 'Planning, coordinating, and optimizing the movement of passengers and freight', 'Designing roads only', 'Vehicle engine assembly'], correctAnswer: 'Planning, coordinating, and optimizing the movement of passengers and freight' },
              { type: 'cbt', question: 'Which mode of transport is most cost-effective for moving high-volume, bulk commodities over long international distances?', options: ['Air freight', 'Maritime (Sea) transport', 'Road trucking', 'Pipeline transport'], correctAnswer: 'Maritime (Sea) transport' },
            ],
          },
          {
            code: 'TRM 201',
            title: 'Logistics & Supply Chain Management',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is multimodal transportation?', options: ['Using only one type of vehicle', 'The transportation of goods using two or more different modes under a single contract', 'Pedestrian walking routes', 'Bicycle courier delivery'], correctAnswer: 'The transportation of goods using two or more different modes under a single contract' },
              { type: 'cbt', question: 'What is the bullwhip effect in supply chain logistics?', options: ['A physical whip used in horse transport', 'Increasing fluctuation in inventory demand as one moves further up the supply chain from consumer to supplier', 'Sudden discounts on shipping freight', 'Fast port clearance speeds'], correctAnswer: 'Increasing fluctuation in inventory demand as one moves further up the supply chain from consumer to supplier' },
            ],
          },
          { code: 'TRM 301', title: 'Transport Economics & Infrastructure Planning', level: 300, semester: 'harmattan', questions: [] },
          { code: 'TRM 401', title: 'Fleet Management & Aviation Operations', level: 400, semester: 'harmattan', questions: [] },
          { code: 'TRM 501', title: 'Maritime Transport & International Logistics', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 6. FACULTY OF PURE AND APPLIED SCIENCES
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
            code: 'PAM 101',
            title: 'Elementary Mathematics I (Algebra & Trigonometry)',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What are the roots of the quadratic equation x^2 - 5x + 6 = 0?', options: ['x = 1, 6', 'x = 2, 3', 'x = -2, -3', 'x = 0, 5'], correctAnswer: 'x = 2, 3' },
              { type: 'cbt', question: 'What is the value of sin(90°)?', options: ['0', '0.5', '1', 'Undefined'], correctAnswer: '1' },
            ],
          },
          {
            code: 'MTH 102',
            title: 'Elementary Mathematics II (Calculus)',
            level: 100,
            semester: 'rain',
            questions: [
              { type: 'cbt', question: 'What is the derivative of f(x) = x^3 with respect to x?', options: ['3x', '3x^2', 'x^2', '6x'], correctAnswer: '3x^2' },
              {
                type: 'theory',
                question: 'Explain the basic geometric definition of a definite integral using area under a curve.',
                options: [],
                correctAnswer: 'A definite integral represents the net signed area bounded by the function graph, the x-axis, and vertical lines at the limits of integration.',
                gradingPoints: [
                  { concept: 'represents net signed area', weight: 0.5, aliases: ['area under curve', 'bounded area'] },
                  { concept: 'between function and x-axis over limits', weight: 0.5, aliases: ['from a to b', 'limits of integration'] },
                ],
              },
            ],
          },
          {
            code: 'PAM 201',
            title: 'Mathematical Methods & Real Analysis',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the limit of (sin x)/x as x approaches 0?', options: ['0', '1', 'Infinity', '-1'], correctAnswer: '1' },
              { type: 'cbt', question: 'A sequence is said to be convergent if it:', options: ['Increases infinitely', 'Approaches a finite limit as n approaches infinity', 'Alternates between positive and negative numbers', 'Has all elements equal to zero'], correctAnswer: 'Approaches a finite limit as n approaches infinity' },
            ],
          },
          { code: 'PAM 301', title: 'Abstract Algebra & Complex Analysis', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PAM 401', title: 'Functional Analysis & Differential Equations', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Pure and Applied Physics',
        code: 'PAP',
        courses: [
          {
            code: 'PAP 101',
            title: 'General Physics I (Mechanics & Thermal Physics)',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the acceleration due to gravity (g) at standard sea level on Earth?', options: ['8.9 m/s^2', '9.8 m/s^2', '10.8 m/s^2', '12.0 m/s^2'], correctAnswer: '9.8 m/s^2' },
              { type: 'cbt', question: 'What is kinetic energy given by for an object of mass m and velocity v?', options: ['m × v', '0.5 × m × v^2', 'm × g × h', 'm × v^2'], correctAnswer: '0.5 × m × v^2' },
            ],
          },
          {
            code: 'PAP 201',
            title: 'Modern Physics & Electromagnetism',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What phenomenon proves the particle nature of light?', options: ['Interference', 'Diffraction', 'Photoelectric effect', 'Refraction'], correctAnswer: 'Photoelectric effect' },
              { type: 'cbt', question: 'What is Planck\'s constant (h) approximately equal to?', options: ['6.626 × 10^-34 J·s', '3.00 × 10^8 m/s', '1.602 × 10^-19 C', '9.109 × 10^-31 kg'], correctAnswer: '6.626 × 10^-34 J·s' },
            ],
          },
          { code: 'PAP 301', title: 'Quantum Mechanics & Solid State Physics', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PAP 401', title: 'Nuclear Physics & Computational Physics', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Biochemistry',
        code: 'BCH',
        courses: [
          {
            code: 'BCH 201',
            title: 'General Biochemistry I (Biomolecules)',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What are the monomeric building blocks of proteins?', options: ['Fatty acids', 'Nucleotides', 'Amino acids', 'Monosaccharides'], correctAnswer: 'Amino acids' },
              { type: 'cbt', question: 'Which bond links amino acids together in a polypeptide chain?', options: ['Glycosidic bond', 'Peptide bond', 'Phosphodiester bond', 'Hydrogen bond'], correctAnswer: 'Peptide bond' },
              { type: 'cbt', question: 'Which biomolecule carries the primary genetic blueprint in human cells?', options: ['Lipids', 'Carbohydrates', 'DNA (Deoxyribonucleic acid)', 'Proteins'], correctAnswer: 'DNA (Deoxyribonucleic acid)' },
            ],
          },
          { code: 'BCH 301', title: 'Enzymology & Intermediary Metabolism', level: 300, semester: 'harmattan', questions: [] },
          { code: 'BCH 401', title: 'Molecular Biology & Genetic Engineering', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Earth Sciences',
        code: 'EAS',
        courses: [
          {
            code: 'EAS 101',
            title: 'Introduction to Physical Geology',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which of the following is the liquid layer of the Earth\'s interior?', options: ['Crust', 'Mantle', 'Outer Core', 'Inner Core'], correctAnswer: 'Outer Core' },
              { type: 'cbt', question: 'What type of rock forms from the cooling and solidification of molten magma?', options: ['Sedimentary rock', 'Igneous rock', 'Metamorphic rock', 'Fossiliferous rock'], correctAnswer: 'Igneous rock' },
            ],
          },
          {
            code: 'EAS 201',
            title: 'Mineralogy & Petrology',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What scale is standard for measuring the relative hardness of minerals?', options: ['Richter scale', 'Mohs scale', 'Kelvin scale', 'Beaufort scale'], correctAnswer: 'Mohs scale' },
              { type: 'cbt', question: 'What is the hardest naturally occurring mineral on Mohs scale (hardness 10)?', options: ['Quartz', 'Corundum', 'Topaz', 'Diamond'], correctAnswer: 'Diamond' },
            ],
          },
          { code: 'EAS 301', title: 'Structural Geology & Stratigraphy', level: 300, semester: 'harmattan', questions: [] },
          { code: 'EAS 401', title: 'Applied Geophysics & Hydrogeology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'EAS 501', title: 'Economic Geology & Petroleum Exploration', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'General Studies',
        code: 'GST',
        courses: [
          {
            code: 'GST 101',
            title: 'Use of English & Communication Skills',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which part of speech is used to connect words, phrases, or clauses?', options: ['Preposition', 'Conjunction', 'Interjection', 'Adverb'], correctAnswer: 'Conjunction' },
              { type: 'cbt', question: 'What is a topic sentence in paragraph writing?', options: ['The final closing sentence of an essay', 'The sentence that expresses the main idea of the paragraph', 'A footnote citation', 'A list of references'], correctAnswer: 'The sentence that expresses the main idea of the paragraph' },
            ],
          },
          {
            code: 'GST 102',
            title: 'Philosophy and Logic',
            level: 100,
            semester: 'rain',
            questions: [
              { type: 'cbt', question: 'What is a deductive argument?', options: ['An argument where the conclusion necessarily follows from true premises', 'A guess based on intuition', 'An appeal to popular emotion', 'A fallacy with false conclusions'], correctAnswer: 'An argument where the conclusion necessarily follows from true premises' },
              { type: 'cbt', question: 'What is the ad hominem fallacy?', options: ['Arguing in a circle', 'Attacking the person making the argument rather than addressing the argument itself', 'Appealing to ignorance', 'Assuming correlation implies causation'], correctAnswer: 'Attacking the person making the argument rather than addressing the argument itself' },
            ],
          },
          {
            code: 'GST 201',
            title: 'Nigerian Peoples and Culture',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which region of Nigeria was historically characterized by acephalous (segmentary) political systems?', options: ['Old Oyo Empire', 'Pre-colonial Igbo society', 'Sokoto Caliphate', 'Borno Empire'], correctAnswer: 'Pre-colonial Igbo society' },
            ],
          },
          {
            code: 'GST 202',
            title: 'Peace and Conflict Resolution',
            level: 200,
            semester: 'rain',
            questions: [
              { type: 'cbt', question: 'What is mediation in conflict resolution?', options: ['Using military force to enforce a ceasefire', 'A voluntary process where an impartial third party assists disputing parties in reaching a settlement', 'Imposing a binding judicial verdict', 'Ignoring the dispute until it fades'], correctAnswer: 'A voluntary process where an impartial third party assists disputing parties in reaching a settlement' },
            ],
          },
        ],
      },
      {
        deptName: 'Pure and Applied Biology',
        code: 'PAB',
        courses: [
          {
            code: 'PAB 101',
            title: 'General Biology I (Plant and Animal Biology)',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the powerhouse organelle of the eukaryotic cell responsible for ATP production?', options: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Endoplasmic reticulum'], correctAnswer: 'Mitochondrion' },
              { type: 'cbt', question: 'What green pigment in chloroplasts is essential for photosynthesis?', options: ['Carotenoid', 'Chlorophyll', 'Anthocyanin', 'Melanin'], correctAnswer: 'Chlorophyll' },
            ],
          },
          {
            code: 'PAB 201',
            title: 'Cell Biology & Genetics',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What stage of mitosis is characterized by chromosomes aligning at the cell equator?', options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], correctAnswer: 'Metaphase' },
              { type: 'cbt', question: 'According to Mendelian genetics, what is the expected phenotypic ratio in a monohybrid cross of heterozygous parents (Aa × Aa)?', options: ['1:1', '3:1', '9:3:3:1', '1:2:1'], correctAnswer: '3:1' },
            ],
          },
          { code: 'PAB 301', title: 'Ecology & Developmental Biology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PAB 401', title: 'Evolutionary Biology & Biotechnology', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Pure and Applied Chemistry',
        code: 'PAC',
        courses: [
          {
            code: 'PAC 101',
            title: 'General Chemistry I (Physical & Inorganic)',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the atomic number of Carbon?', options: ['6', '8', '12', '14'], correctAnswer: '6' },
              { type: 'cbt', question: 'What type of chemical bond involves the sharing of electron pairs between atoms?', options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'], correctAnswer: 'Covalent bond' },
            ],
          },
          {
            code: 'PAC 201',
            title: 'Organic Chemistry I & Analytical Methods',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What functional group characterizes alcohols?', options: ['-COOH (Carboxyl)', '-OH (Hydroxyl)', '-CHO (Aldehyde)', '-NH2 (Amine)'], correctAnswer: '-OH (Hydroxyl)' },
              { type: 'cbt', question: 'What is the general molecular formula for alkanes (saturated hydrocarbons)?', options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnHn'], correctAnswer: 'CnH2n+2' },
            ],
          },
          { code: 'PAC 301', title: 'Instrumental Methods of Chemical Analysis', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PAC 401', title: 'Advanced Physical & Polymer Chemistry', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Science Laboratory Technology',
        code: 'SLT',
        courses: [
          {
            code: 'SLT 101',
            title: 'Laboratory Techniques & Safety Measures',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the primary personal protective equipment (PPE) required when handling volatile acids in a laboratory?', options: ['Sunglasses', 'Lab coat, safety goggles, gloves, and working under a fume hood', 'Winter jacket', 'Dust mask only'], correctAnswer: 'Lab coat, safety goggles, gloves, and working under a fume hood' },
              { type: 'cbt', question: 'Which laboratory glassware is specifically calibrated to deliver exact variable volumes of liquid during titration?', options: ['Beaker', 'Burette', 'Conical flask', 'Graduated cylinder'], correctAnswer: 'Burette' },
            ],
          },
          {
            code: 'SLT 201',
            title: 'Instrumentation & Analytical Chemistry',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What principle governs the operation of a UV-Visible spectrophotometer?', options: ['Ohm\'s Law', 'Beer-Lambert Law (Absorbance is proportional to concentration)', 'Bernoulli\'s Principle', 'Newton\'s Law of Cooling'], correctAnswer: 'Beer-Lambert Law (Absorbance is proportional to concentration)' },
              { type: 'cbt', question: 'What device is used to separate particles from a solution according to size and density by spinning at high speed?', options: ['Spectrophotometer', 'Centrifuge', 'Autoclave', 'Refractometer'], correctAnswer: 'Centrifuge' },
            ],
          },
          { code: 'SLT 301', title: 'Biological & Chemical Laboratory Technology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'SLT 401', title: 'Quality Control & Laboratory Management', level: 400, semester: 'harmattan', questions: [] },
          { code: 'SLT 501', title: 'Advanced Instrumentation & Project Seminar', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Statistics',
        code: 'STA',
        courses: [
          {
            code: 'STA 101',
            title: 'Descriptive Statistics & Probability',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the arithmetic mean of the dataset {4, 8, 6, 10, 12}?', options: ['6', '7', '8', '9'], correctAnswer: '8' },
              { type: 'cbt', question: 'What measure of central tendency represents the most frequently occurring score in a distribution?', options: ['Mean', 'Median', 'Mode', 'Standard Deviation'], correctAnswer: 'Mode' },
            ],
          },
          {
            code: 'STA 201',
            title: 'Statistical Inference & Probability Distributions',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is a Type I error in hypothesis testing?', options: ['Accepting a false null hypothesis', 'Rejecting a true null hypothesis (false positive)', 'Calculating the wrong sample size', 'Dividing by zero'], correctAnswer: 'Rejecting a true null hypothesis (false positive)' },
              { type: 'cbt', question: 'What is the mean and variance of a standard normal distribution (Z)?', options: ['Mean = 1, Variance = 0', 'Mean = 0, Variance = 1', 'Mean = 0, Variance = 0', 'Mean = 1, Variance = 1'], correctAnswer: 'Mean = 0, Variance = 1' },
            ],
          },
          { code: 'STA 301', title: 'Design and Analysis of Experiments', level: 300, semester: 'harmattan', questions: [] },
          { code: 'STA 401', title: 'Time Series Analysis & Econometrics', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 7. FACULTY OF ARTS AND SOCIAL SCIENCES
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
            title: 'Introduction to English Grammar and Composition',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which figure of speech makes an explicit comparison using the words "like" or "as"?', options: ['Metaphor', 'Simile', 'Hyperbole', 'Personification'], correctAnswer: 'Simile' },
              { type: 'cbt', question: 'Who is the author of the celebrated African novel "Things Fall Apart"?', options: ['Wole Soyinka', 'Chinua Achebe', 'Ngugi wa Thiong\'o', 'Chimamanda Ngozi Adichie'], correctAnswer: 'Chinua Achebe' },
            ],
          },
          {
            code: 'ELS 201',
            title: 'Introduction to African Prose and Poetry',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What literary device is characterized by the repetition of initial consonant sounds in neighboring words?', options: ['Assonance', 'Alliteration', 'Onomatopoeia', 'Oxymoron'], correctAnswer: 'Alliteration' },
              { type: 'cbt', question: 'Who was the first African to win the Nobel Prize in Literature (1986)?', options: ['Chinua Achebe', 'Wole Soyinka', 'Naguib Mahfouz', 'Nadine Gordimer'], correctAnswer: 'Wole Soyinka' },
            ],
          },
          { code: 'ELS 301', title: 'Phonology and Applied Linguistics', level: 300, semester: 'harmattan', questions: [] },
          { code: 'ELS 401', title: 'Literary Theory and Modernism', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'History and International Studies',
        code: 'HIS',
        courses: [
          {
            code: 'HIS 101',
            title: 'Nigeria from Earliest Times to 1800',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'On what date did Nigeria formally gain independence from British colonial rule?', options: ['October 1, 1960', 'January 1, 1914', 'October 1, 1963', 'May 29, 1999'], correctAnswer: 'October 1, 1960' },
              { type: 'cbt', question: 'Who was the British colonial administrator that orchestrated the 1914 Amalgamation of Northern and Southern Nigeria?', options: ['Lord Frederick Lugard', 'Sir Arthur Richards', 'John Macpherson', 'Hugh Clifford'], correctAnswer: 'Lord Frederick Lugard' },
            ],
          },
          {
            code: 'HIS 201',
            title: 'Evolution of Modern International System',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which treaty signed in 1648 established the modern concept of sovereign nation-states?', options: ['Treaty of Versailles', 'Peace of Westphalia', 'Treaty of Utrecht', 'Congress of Vienna'], correctAnswer: 'Peace of Westphalia' },
              { type: 'cbt', question: 'Which global intergovernmental organization was founded in 1945 following World War II to maintain international peace?', options: ['League of Nations', 'United Nations (UN)', 'African Union (AU)', 'European Union (EU)'], correctAnswer: 'United Nations (UN)' },
            ],
          },
          { code: 'HIS 301', title: 'Diplomatic History of Africa', level: 300, semester: 'harmattan', questions: [] },
          { code: 'HIS 401', title: 'International Law and Organizations', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Philosophy',
        code: 'PHL',
        courses: [
          {
            code: 'PHL 101',
            title: 'Introduction to Philosophy & Logic',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the literal Greek etymology of the word "Philosophy"?', options: ['Study of nature', 'Love of wisdom (Philos + Sophia)', 'Search for numbers', 'Art of debate'], correctAnswer: 'Love of wisdom (Philos + Sophia)' },
              { type: 'cbt', question: 'Which ancient Greek philosopher was sentenced to death in Athens for corrupting the youth and impiety?', options: ['Plato', 'Socrates', 'Aristotle', 'Pythagoras'], correctAnswer: 'Socrates' },
            ],
          },
          {
            code: 'PHL 201',
            title: 'Epistemology & Theories of Knowledge',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What branch of philosophy is primarily concerned with the nature, origin, and scope of human knowledge?', options: ['Ethics', 'Epistemology', 'Aesthetics', 'Metaphysics'], correctAnswer: 'Epistemology' },
              { type: 'cbt', question: 'What philosophical school of thought argues that sensory experience is the primary source of all knowledge?', options: ['Rationalism', 'Empiricism', 'Idealism', 'Existentialism'], correctAnswer: 'Empiricism' },
            ],
          },
          { code: 'PHL 301', title: 'Ethics and Moral Philosophy', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PHL 401', title: 'African Philosophy & Contemporary Trends', level: 400, semester: 'harmattan', questions: [] },
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
              { type: 'cbt', question: 'What is the supreme, absolute power of a state to govern its territory free from external control called?', options: ['Authority', 'Sovereignty', 'Legitimacy', 'Hegemony'], correctAnswer: 'Sovereignty' },
              { type: 'cbt', question: 'Which of the following is NOT one of the three classic arms of government?', options: ['Executive', 'Legislature', 'Judiciary', 'Military'], correctAnswer: 'Military' },
            ],
          },
          {
            code: 'POL 102',
            title: 'Citizen and the State',
            level: 100,
            semester: 'rain',
            questions: [
              { type: 'cbt', question: 'What form of government is defined as rule by the people through freely elected representatives?', options: ['Autocracy', 'Oligarchy', 'Democracy', 'Theocracy'], correctAnswer: 'Democracy' },
              { type: 'cbt', question: 'What political concept divides governmental powers between a central authority and regional component units?', options: ['Unitary system', 'Federalism', 'Feudalism', 'Confederation only'], correctAnswer: 'Federalism' },
            ],
          },
          {
            code: 'POL 201',
            title: 'Nigerian Government and Politics',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'In which year was Nigeria declared a Federal Republic with a President as Head of State?', options: ['1960', '1963', '1979', '1999'], correctAnswer: '1963' },
            ],
          },
          { code: 'POL 301', title: 'Comparative Politics & Political Thought', level: 300, semester: 'harmattan', questions: [] },
          { code: 'POL 401', title: 'Public Policy Analysis & International Relations', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Psychology',
        code: 'PSY',
        courses: [
          {
            code: 'PSY 101',
            title: 'Basic Concepts in Psychology',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the scientific definition of Psychology?', options: ['The study of paranormal phenomena', 'The scientific study of behavior and mental processes', 'The biological analysis of brain cells only', 'The medical treatment of physical illness'], correctAnswer: 'The scientific study of behavior and mental processes' },
              { type: 'cbt', question: 'Who founded the first formal psychology laboratory in Leipzig, Germany in 1879?', options: ['Sigmund Freud', 'Wilhelm Wundt', 'B.F. Skinner', 'Ivan Pavlov'], correctAnswer: 'Wilhelm Wundt' },
            ],
          },
          {
            code: 'PSY 201',
            title: 'Developmental Psychology & Personality Theory',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'According to Sigmund Freud\'s psychoanalytic model, which component of personality operates entirely on the pleasure principle?', options: ['The Ego', 'The Id', 'The Superego', 'The Conscious'], correctAnswer: 'The Id' },
              { type: 'cbt', question: 'In Pavlov\'s classical conditioning experiment with dogs, what was the meat powder initially serving as?', options: ['Conditioned stimulus (CS)', 'Unconditioned stimulus (UCS)', 'Conditioned response (CR)', 'Neutral stimulus (NS)'], correctAnswer: 'Unconditioned stimulus (UCS)' },
            ],
          },
          { code: 'PSY 301', title: 'Cognitive & Physiological Psychology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PSY 401', title: 'Clinical & Abnormal Psychology', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Sociology',
        code: 'SOC',
        courses: [
          {
            code: 'SOC 101',
            title: 'Introduction to Sociology & Social Institutions',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Who is widely regarded as the founding father of Sociology who coined the term in 1838?', options: ['Karl Marx', 'Auguste Comte', 'Max Weber', 'Emile Durkheim'], correctAnswer: 'Auguste Comte' },
              { type: 'cbt', question: 'What is the primary agent of socialization in human society?', options: ['Mass media', 'The Family', 'Peer group', 'Workplace'], correctAnswer: 'The Family' },
            ],
          },
          {
            code: 'SOC 201',
            title: 'Social Change and Development in Africa',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is social stratification?', options: ['The physical building of roads', 'The hierarchical arrangement of individuals and groups into strata or social classes in society', 'The extinction of ancient languages', 'The migration of rural workers to farms'], correctAnswer: 'The hierarchical arrangement of individuals and groups into strata or social classes in society' },
              { type: 'cbt', question: 'Which sociological concept refers to the movement of individuals or groups between different social and economic positions?', options: ['Social mobility', 'Cultural diffusion', 'Social entropy', 'Deviance'], correctAnswer: 'Social mobility' },
            ],
          },
          { code: 'SOC 301', title: 'Sociological Theory & Social Stratification', level: 300, semester: 'harmattan', questions: [] },
          { code: 'SOC 401', title: 'Criminology & Medical Sociology', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Library and Information Science',
        code: 'LIS',
        courses: [
          {
            code: 'LIS 101',
            title: 'Introduction to Library & Information Resources',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the Dewey Decimal Classification (DDC) system?', options: ['A monetary tax system', 'A proprietary library classification system used to organize books by subject on library shelves', 'A database programming syntax', 'A postal zip code format'], correctAnswer: 'A proprietary library classification system used to organize books by subject on library shelves' },
              { type: 'cbt', question: 'What is an academic bibliography?', options: ['A personal memoir of an author', 'A comprehensive list of books, articles, and sources used or referred to in a scholarly work', 'A dictionary of foreign terms', 'A library borrower\'s card'], correctAnswer: 'A comprehensive list of books, articles, and sources used or referred to in a scholarly work' },
            ],
          },
          {
            code: 'LIS 201',
            title: 'Cataloguing, Classification & Indexing',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What does OPAC stand for in modern library systems?', options: ['Online Public Access Catalog', 'Open Publishing Academic Center', 'Official Postal Archive Code', 'Optical Photocopy Automated Core'], correctAnswer: 'Online Public Access Catalog' },
              { type: 'cbt', question: 'What standard international 13-digit code uniquely identifies commercially published books?', options: ['ISSN', 'ISBN', 'DOI', 'URL'], correctAnswer: 'ISBN' },
            ],
          },
          { code: 'LIS 301', title: 'Information Retrieval & Database Management', level: 300, semester: 'harmattan', questions: [] },
          { code: 'LIS 401', title: 'Digital Libraries & Archives Management', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Mass Communication',
        code: 'MCM',
        courses: [
          {
            code: 'MCM 101',
            title: 'Introduction to Mass Communication & Media',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is mass communication?', options: ['A confidential face-to-face talk', 'The transmission of messages to large, widespread, and heterogeneous audiences through mass media', 'Writing a personal diary', 'A telephone call between two people'], correctAnswer: 'The transmission of messages to large, widespread, and heterogeneous audiences through mass media' },
              { type: 'cbt', question: 'Which of the following is considered broadcast media?', options: ['Billboards', 'Television and Radio', 'Magazines', 'Direct postal mail'], correctAnswer: 'Television and Radio' },
            ],
          },
          {
            code: 'MCM 201',
            title: 'News Writing & Reporting',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What journalism structural model presents the most critical facts at the very beginning of a news story?', options: ['Inverted Pyramid structure', 'Chronological narrative', 'Diamond model', 'Hourglass style'], correctAnswer: 'Inverted Pyramid structure' },
              { type: 'cbt', question: 'What are the classic 5 Ws and 1 H in news reporting?', options: ['Who, What, Where, When, Why, and How', 'Work, Write, Win, Warn, Wait, and Hear', 'Words, Wealth, Wire, Web, World, and Hope', 'Where, When, Which, Will, Way, and Help'], correctAnswer: 'Who, What, Where, When, Why, and How' },
            ],
          },
          { code: 'MCM 301', title: 'Broadcast Production & Media Law', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MCM 401', title: 'Public Relations, Advertising & Media Ethics', level: 400, semester: 'harmattan', questions: [] },
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
              { type: 'cbt', question: 'The fundamental economic problem facing all human societies is:', options: ['Poverty', 'Scarcity of resources relative to unlimited human wants', 'Inflation', 'Unemployment'], correctAnswer: 'Scarcity of resources relative to unlimited human wants' },
              { type: 'cbt', question: 'The responsiveness of quantity demanded to a change in price is called:', options: ['Price Ceiling', 'Price Elasticity of Demand', 'Price Floor', 'Opportunity Cost'], correctAnswer: 'Price Elasticity of Demand' },
              { type: 'cbt', question: 'What is opportunity cost?', options: ['The financial purchase cost of a good', 'The value of the next best alternative foregone when making a choice', 'The cost of advertising', 'Government taxation'], correctAnswer: 'The value of the next best alternative foregone when making a choice' },
            ],
          },
          {
            code: 'ECO 102',
            title: 'Principles of Macroeconomics',
            level: 100,
            semester: 'rain',
            questions: [
              { type: 'cbt', question: 'What does GDP stand for in macroeconomic analysis?', options: ['Global Data Production', 'Gross Domestic Product', 'Government Debt Policy', 'General Distribution Plan'], correctAnswer: 'Gross Domestic Product' },
              { type: 'cbt', question: 'What is inflation?', options: ['A sustained increase in the general price level of goods and services in an economy over time', 'A decrease in currency supply', 'An increase in export tariffs', 'A decrease in unemployment rates'], correctAnswer: 'A sustained increase in the general price level of goods and services in an economy over time' },
            ],
          },
          {
            code: 'ECO 201',
            title: 'Intermediate Microeconomics',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What does the Law of Supply state?', options: ['As price rises, quantity supplied falls', 'As price rises, quantity supplied increases, ceteris paribus', 'Supply is independent of market price', 'Consumers dictate production costs'], correctAnswer: 'As price rises, quantity supplied increases, ceteris paribus' },
              { type: 'cbt', question: 'What type of market structure is characterized by a single seller with no close substitutes and high barriers to entry?', options: ['Perfect competition', 'Monopoly', 'Oligopoly', 'Monopolistic competition'], correctAnswer: 'Monopoly' },
            ],
          },
          { code: 'ECO 301', title: 'Applied Econometrics & Development Economics', level: 300, semester: 'harmattan', questions: [] },
          { code: 'ECO 401', title: 'Monetary Economics & Public Finance', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 8. FACULTY OF BASIC MEDICAL SCIENCES
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
            title: 'Gross Anatomy of Upper & Lower Limbs',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which bone is the longest and strongest in the human body?', options: ['Humerus', 'Femur', 'Tibia', 'Fibula'], correctAnswer: 'Femur' },
              { type: 'cbt', question: 'Which major nerve passes through the carpal tunnel of the wrist?', options: ['Radial nerve', 'Median nerve', 'Ulnar nerve', 'Sciatic nerve'], correctAnswer: 'Median nerve' },
              { type: 'cbt', question: 'How many pairs of ribs are found in the normal human thoracic cage?', options: ['10 pairs', '12 pairs', '14 pairs', '24 pairs'], correctAnswer: '12 pairs' },
            ],
          },
          {
            code: 'ANA 202',
            title: 'General Embryology & Histology',
            level: 200,
            semester: 'rain',
            questions: [
              { type: 'cbt', question: 'What are the three primary germ layers formed during human gastrulation?', options: ['Ectoderm, Mesoderm, Endoderm', 'Epidermis, Dermis, Hypodermis', 'Cortex, Medulla, Stroma', 'Epithelium, Endothelium, Mesothelium'], correctAnswer: 'Ectoderm, Mesoderm, Endoderm' },
              { type: 'cbt', question: 'Which epithelial tissue type lines the alveoli of the lungs for rapid gas exchange?', options: ['Simple squamous epithelium', 'Stratified columnar epithelium', 'Transitional epithelium', 'Pseudostratified ciliated epithelium'], correctAnswer: 'Simple squamous epithelium' },
            ],
          },
          { code: 'ANA 301', title: 'Neuroanatomy & Head and Neck', level: 300, semester: 'harmattan', questions: [] },
          { code: 'ANA 401', title: 'Advanced Histochemistry & Anatomical Research', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Physiology',
        code: 'PHS',
        courses: [
          {
            code: 'PHS 201',
            title: 'Cardiovascular and Respiratory Physiology',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is recognized as the natural pacemaker of the human heart?', options: ['Atrioventricular (AV) node', 'Sinoatrial (SA) node', 'Bundle of His', 'Purkinje fibers'], correctAnswer: 'Sinoatrial (SA) node' },
              { type: 'cbt', question: 'What is the normal resting arterial blood pressure for a healthy young adult?', options: ['80/120 mmHg', '120/80 mmHg', '140/90 mmHg', '100/60 mmHg'], correctAnswer: '120/80 mmHg' },
              { type: 'cbt', question: 'What is the normal physiological pH range of arterial human blood?', options: ['6.80 - 7.00', '7.35 - 7.45', '7.80 - 8.00', '6.00 - 6.50'], correctAnswer: '7.35 - 7.45' },
            ],
          },
          {
            code: 'PHS 202',
            title: 'Renal, Gastrointestinal and Endocrine Physiology',
            level: 200,
            semester: 'rain',
            questions: [
              { type: 'cbt', question: 'What is the basic functional structural unit of the human kidney?', options: ['Neuron', 'Nephron', 'Glomerulus only', 'Alveolus'], correctAnswer: 'Nephron' },
              { type: 'cbt', question: 'Which hormone produced by the beta cells of the pancreatic islets lowers blood glucose levels?', options: ['Glucagon', 'Insulin', 'Cortisol', 'Thyroxine'], correctAnswer: 'Insulin' },
            ],
          },
          { code: 'PHS 301', title: 'Neurophysiology & Sensory Systems', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PHS 401', title: 'Environmental & Exercise Physiology', level: 400, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Medical Laboratory Science',
        code: 'MLS',
        courses: [
          {
            code: 'MLS 101',
            title: 'Introduction to Medical Laboratory Science',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the primary role of a Medical Laboratory Scientist?', options: ['Perform complex surgical operations', 'Analyze biological specimens (blood, urine, tissues) to aid medical diagnosis and treatment', 'Prescribe medications to patients', 'Manage hospital admissions'], correctAnswer: 'Analyze biological specimens (blood, urine, tissues) to aid medical diagnosis and treatment' },
              { type: 'cbt', question: 'Which anticoagulant is standard in purple/lavender-top blood collection tubes for Complete Blood Count (CBC)?', options: ['Sodium citrate', 'EDTA (Ethylenediaminetetraacetic acid)', 'Heparin', 'Sodium fluoride'], correctAnswer: 'EDTA (Ethylenediaminetetraacetic acid)' },
            ],
          },
          {
            code: 'MLS 201',
            title: 'Clinical Chemistry & Haematology Techniques',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the primary iron-containing oxygen-transport metalloprotein in red blood cells?', options: ['Myoglobin', 'Hemoglobin', 'Albumin', 'Ferritin'], correctAnswer: 'Hemoglobin' },
              { type: 'cbt', question: 'Which staining technique is standard in hematology to differentiate peripheral blood cells under microscopy?', options: ['Gram stain', 'Leishman / Romanowsky stain', 'Acid-fast stain', 'Sudan black stain'], correctAnswer: 'Leishman / Romanowsky stain' },
            ],
          },
          { code: 'MLS 301', title: 'Medical Microbiology & Parasitology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MLS 401', title: 'Histopathology & Immunohaematology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MLS 501', title: 'Clinical Diagnostic Practicum & Research Project', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 9. FACULTY OF BASIC CLINICAL SCIENCES
  // =====================================================
  {
    facultyName: 'Faculty of Basic Clinical Sciences',
    code: 'FBCS',
    departments: [
      {
        deptName: 'Chemical Pathology',
        code: 'CPT',
        courses: [
          { code: 'CPT 301', title: 'Clinical Chemistry & Metabolic Disorders', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CPT 401', title: 'Endocrinology, Toxicology & Diagnostic Enzymology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CPT 501', title: 'Advanced Chemical Pathology & Quality Assurance', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Haematology and Blood Transfusion',
        code: 'HBT',
        courses: [
          { code: 'HBT 301', title: 'Basic Haematology & Hemostasis', level: 300, semester: 'harmattan', questions: [] },
          { code: 'HBT 401', title: 'Blood Transfusion Science & Immunohematology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'HBT 501', title: 'Haematological Malignancies & Advanced Hemostasis', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Medical Microbiology and Parasitology',
        code: 'MMP',
        courses: [
          { code: 'MMP 301', title: 'Bacteriology & Medical Mycology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MMP 401', title: 'Medical Virology & Parasitology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MMP 501', title: 'Antimicrobial Chemotherapy & Public Health Microbiology', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Morbid Anatomy & Histopathology',
        code: 'MAH',
        courses: [
          { code: 'MAH 301', title: 'General Pathology & Cellular Adaptations', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MAH 401', title: 'Systemic Pathology & Autopsy Techniques', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MAH 501', title: 'Diagnostic Cytopathology & Forensic Pathology', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Pharmacology & Therapeutics',
        code: 'PHT',
        courses: [
          { code: 'PHT 301', title: 'General Pharmacology & Autonomic Nervous System Drugs', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PHT 401', title: 'Cardiovascular, CNS & Chemotherapeutic Agents', level: 400, semester: 'harmattan', questions: [] },
          { code: 'PHT 501', title: 'Clinical Pharmacology & Toxicology', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 10. FACULTY OF CLINICAL SCIENCES
  // =====================================================
  {
    facultyName: 'Faculty of Clinical Sciences',
    code: 'FCS',
    departments: [
      {
        deptName: 'Anaesthesia',
        code: 'ANE',
        courses: [
          { code: 'ANE 401', title: 'Principles of Anaesthesia & Perioperative Care', level: 400, semester: 'harmattan', questions: [] },
          { code: 'ANE 501', title: 'Intensive Care Medicine, Resuscitation & Pain Management', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Community Medicine',
        code: 'CMM',
        courses: [
          { code: 'CMM 301', title: 'Epidemiology, Biostatistics & Public Health', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CMM 401', title: 'Occupational Health, Maternal & Child Health', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CMM 501', title: 'Primary Health Care & Health Systems Management', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Ear, Nose and Throat',
        code: 'ENT',
        courses: [
          { code: 'ENT 401', title: 'Basic Otolaryngology & Head-Neck Examination', level: 400, semester: 'harmattan', questions: [] },
          { code: 'ENT 501', title: 'Clinical Otorhinolaryngology & Surgical Interventions', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Medicine',
        code: 'MED',
        courses: [
          { code: 'MED 301', title: 'Foundations of Clinical Medicine & History Taking', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MED 401', title: 'Cardiology, Pulmonology & Gastroenterology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MED 501', title: 'Nephrology, Neurology & Infectious Diseases', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Obstetrics and Gynaecology',
        code: 'OBG',
        courses: [
          { code: 'OBG 401', title: 'Antenatal Care, Normal Labour & Puerperium', level: 400, semester: 'harmattan', questions: [] },
          { code: 'OBG 501', title: 'High-Risk Obstetrics, Gynaecological Oncology & Reproductive Health', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Ophthalmology',
        code: 'OPH',
        courses: [
          { code: 'OPH 401', title: 'Clinical Ophthalmology & Vision Science', level: 400, semester: 'harmattan', questions: [] },
          { code: 'OPH 501', title: 'Ophthalmic Surgery & Blindness Prevention', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Pediatrics and Child Health',
        code: 'PCH',
        courses: [
          { code: 'PCH 401', title: 'Neonatology & Child Development', level: 400, semester: 'harmattan', questions: [] },
          { code: 'PCH 501', title: 'Pediatric Infectious Diseases, Nutrition & Pediatric Emergencies', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Psychiatry',
        code: 'PCY',
        courses: [
          { code: 'PCY 401', title: 'General Psychopathology & Psychiatric Assessment', level: 400, semester: 'harmattan', questions: [] },
          { code: 'PCY 501', title: 'Clinical Psychiatry, Psychopharmacology & Psychotherapy', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Radiology',
        code: 'RAD',
        courses: [
          { code: 'RAD 401', title: 'Principles of Diagnostic Imaging & X-Ray Interpretation', level: 400, semester: 'harmattan', questions: [] },
          { code: 'RAD 501', title: 'Advanced Imaging: CT, MRI, Ultrasound & Interventional Radiology', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Surgery',
        code: 'SUR',
        courses: [
          { code: 'SUR 301', title: 'Principles of Surgery, Asepsis & Wound Healing', level: 300, semester: 'harmattan', questions: [] },
          { code: 'SUR 401', title: 'General Surgery, Orthopaedics & Trauma', level: 400, semester: 'harmattan', questions: [] },
          { code: 'SUR 501', title: 'Urology, Neurosurgery, Cardiothoracic & Pediatric Surgery', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 11. FACULTY OF NURSING SCIENCES
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
            code: 'MHN 201',
            title: 'Foundations of Psychiatric Nursing',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the primary therapeutic goal in psychiatric mental health nursing?', options: ['Sedating all agitated patients', 'Establishing a therapeutic nurse-client relationship to promote optimal mental functioning', 'Administering electric shock without consent', 'Enforcing institutional isolation'], correctAnswer: 'Establishing a therapeutic nurse-client relationship to promote optimal mental functioning' },
              { type: 'cbt', question: 'Which communication technique is considered non-therapeutic in psychiatric nursing?', options: ['Active listening', 'Giving false reassurance ("Don\'t worry, everything will be fine")', 'Open-ended questioning', 'Reflecting feelings'], correctAnswer: 'Giving false reassurance ("Don\'t worry, everything will be fine")' },
            ],
          },
          { code: 'MHN 301', title: 'Therapeutic Communication & Psychosocial Interventions', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MHN 401', title: 'Care of Patients with Acute & Chronic Mental Disorders', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MHN 501', title: 'Community Mental Health & Psychiatric Rehabilitation', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Medical/Surgical Nursing',
        code: 'MSN',
        courses: [
          {
            code: 'MSN 201',
            title: 'Foundations of Medical-Surgical Nursing',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the priority nursing assessment in the immediate postoperative recovery period (PACU)?', options: ['Bowel sounds', 'Airway patency and respiratory adequacy', 'Urine output over 24 hours', 'Surgical scar appearance'], correctAnswer: 'Airway patency and respiratory adequacy' },
              { type: 'cbt', question: 'Which vital sign observation is an early warning sign of hypovolemic shock in surgical patients?', options: ['Bradycardia and hypertension', 'Tachycardia and falling blood pressure (hypotension)', 'Flushed dry skin', 'Decreased respiratory rate'], correctAnswer: 'Tachycardia and falling blood pressure (hypotension)' },
            ],
          },
          { code: 'MSN 301', title: 'Nursing Care in Cardiovascular, Respiratory & GI Disorders', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MSN 401', title: 'Critical Care Nursing, Trauma & Oncology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MSN 501', title: 'Advanced Surgical Nursing & Perioperative Management', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Maternal and Child Health Nursing',
        code: 'MCN',
        courses: [
          {
            code: 'MCN 201',
            title: 'Reproductive Health & Embryology in Nursing',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the normal fetal heart rate range during pregnancy and labor?', options: ['60 - 100 beats per minute', '110 - 160 beats per minute', '180 - 220 beats per minute', '40 - 80 beats per minute'], correctAnswer: '110 - 160 beats per minute' },
              { type: 'cbt', question: 'What is the Apgar score utilized for in neonatal nursing?', options: ['Assessing newborn physical transition immediately at 1 and 5 minutes after birth', 'Calculating breastmilk formula volume', 'Determining baby eye color', 'Estimating adult height'], correctAnswer: 'Assessing newborn physical transition immediately at 1 and 5 minutes after birth' },
            ],
          },
          { code: 'MCN 301', title: 'Midwifery & Antenatal Nursing Care', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MCN 401', title: 'Intrapartum, Postpartum & Neonatal Nursing', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MCN 501', title: 'High-Risk Obstetric Nursing & Gynecologic Care', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Public/Community Health Nursing',
        code: 'PHN',
        courses: [
          {
            code: 'PHN 201',
            title: 'Introduction to Community Health Nursing & Epidemiology',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What level of disease prevention is represented by childhood immunizations (e.g. BCG, Polio)?', options: ['Primary prevention', 'Secondary prevention', 'Tertiary prevention', 'Quaternary prevention'], correctAnswer: 'Primary prevention' },
              { type: 'cbt', question: 'What is endemic disease in community epidemiology?', options: ['A worldwide outbreak across continents', 'The constant habitual presence of a disease within a given geographic area', 'A single isolated case', 'A laboratory-created infection'], correctAnswer: 'The constant habitual presence of a disease within a given geographic area' },
            ],
          },
          { code: 'PHN 301', title: 'Primary Health Care & Environmental Health', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PHN 401', title: 'Family Health, School Health & Immunization Services', level: 400, semester: 'harmattan', questions: [] },
          { code: 'PHN 501', title: 'Public Health Administration & Community Health Practicum', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 12. FACULTY OF RENEWABLE NATURAL RESOURCES
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
            title: 'Introduction to Forest Resources',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is silviculture in forestry?', options: ['The mining of silver minerals', 'The art and science of controlling the establishment, growth, composition, health, and quality of forests', 'The manufacturing of paper furniture', 'The hunting of wild animals'], correctAnswer: 'The art and science of controlling the establishment, growth, composition, health, and quality of forests' },
              { type: 'cbt', question: 'What vital ecological role do tropical rainforests play in global climate regulation?', options: ['Acting as major carbon sinks through photosynthesis', 'Reflecting 100% of solar radiation', 'Depleting atmospheric oxygen', 'Preventing groundwater recharge'], correctAnswer: 'Acting as major carbon sinks through photosynthesis' },
            ],
          },
          {
            code: 'FRM 201',
            title: 'Silviculture & Dendrology',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is dendrology?', options: ['The study of ocean currents', 'The botanical identification and systematic study of trees and woody plants', 'The carbon dating of dinosaur bones', 'The chemical analysis of soil pH'], correctAnswer: 'The botanical identification and systematic study of trees and woody plants' },
              { type: 'cbt', question: 'What is standard Diameter at Breast Height (DBH) measurement height in forest mensuration?', options: ['0.5 meters above ground', '1.3 meters (4.5 feet) above ground', '2.5 meters above ground', '3.0 meters above ground'], correctAnswer: '1.3 meters (4.5 feet) above ground' },
            ],
          },
          { code: 'FRM 301', title: 'Forest Mensuration & Inventory', level: 300, semester: 'harmattan', questions: [] },
          { code: 'FRM 401', title: 'Wood Science & Forest Economics', level: 400, semester: 'harmattan', questions: [] },
          { code: 'FRM 501', title: 'Forest Policy, Law & Agroforestry Management', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Wildlife and Ecotourism Management',
        code: 'WEM',
        courses: [
          {
            code: 'WEM 101',
            title: 'Introduction to Wildlife Management',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What constitutes the wildlife habitat triad essential for animal survival?', options: ['Food, Water, and Cover/Shelter', 'Cages, Lights, and Heaters', 'Fences, Gates, and Guards', 'Roads, Trails, and Signs'], correctAnswer: 'Food, Water, and Cover/Shelter' },
              { type: 'cbt', question: 'What is the IUCN Red List used for globally?', options: ['Listing prohibited hunting weapons', 'Assessing the global extinction risk and conservation status of biological species', 'Recording revenue from national park tickets', 'Certifying zoo animal breeders'], correctAnswer: 'Assessing the global extinction risk and conservation status of biological species' },
            ],
          },
          {
            code: 'WEM 201',
            title: 'Wildlife Ecology and Habitats',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the carrying capacity (K) of a wildlife habitat?', options: ['The maximum number of tourists allowed per vehicle', 'The maximum population size of a species that the environment can sustain indefinitely', 'The physical weight of animal cages', 'The total area of a national park'], correctAnswer: 'The maximum population size of a species that the environment can sustain indefinitely' },
              { type: 'cbt', question: 'What is a keystone species in ecology?', options: ['The most numerous species in an ecosystem', 'A species that has a disproportionately large effect on its natural environment relative to its abundance', 'Any newly introduced exotic species', 'Species raised exclusively in captivity'], correctAnswer: 'A species that has a disproportionately large effect on its natural environment relative to its abundance' },
            ],
          },
          { code: 'WEM 301', title: 'Ecotourism Principles & Protected Area Management', level: 300, semester: 'harmattan', questions: [] },
          { code: 'WEM 401', title: 'Wildlife Population Dynamics & Conservation', level: 400, semester: 'harmattan', questions: [] },
          { code: 'WEM 501', title: 'Park Planning & Wildlife Enterprise Management', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Aquaculture and Fisheries Management',
        code: 'AFM',
        courses: [
          {
            code: 'AFM 101',
            title: 'Introduction to Fisheries & Aquatic Sciences',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is aquaculture?', options: ['Ocean mineral extraction', 'The breeding, rearing, and harvesting of fish, shellfish, and aquatic plants in controlled aquatic environments', 'Commercial deep-sea ship manufacturing', 'Water bottling for human consumption'], correctAnswer: 'The breeding, rearing, and harvesting of fish, shellfish, and aquatic plants in controlled aquatic environments' },
              { type: 'cbt', question: 'Which species is the most widely cultivated commercial catfish in Nigerian aquaculture?', options: ['Clarias gariepinus (African Sharptooth Catfish)', 'Salmo salar (Atlantic Salmon)', 'Gadus morhua (Atlantic Cod)', 'Thunnus thynnus (Bluefin Tuna)'], correctAnswer: 'Clarias gariepinus (African Sharptooth Catfish)' },
            ],
          },
          {
            code: 'AFM 201',
            title: 'Fish Biology, Anatomy and Taxonomy',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What primary organ do fish utilize for dissolved oxygen respiration in water?', options: ['Lungs', 'Gills', 'Spiracles', 'Tracheae'], correctAnswer: 'Gills' },
              { type: 'cbt', question: 'What critical water quality parameter must be continuously maintained above 4-5 mg/L for healthy warm-water fish ponds?', options: ['Dissolved Oxygen (DO)', 'Salinity level', 'Water hardness', 'Turbidity'], correctAnswer: 'Dissolved Oxygen (DO)' },
            ],
          },
          { code: 'AFM 301', title: 'Aquaculture Systems & Fish Nutrition', level: 300, semester: 'harmattan', questions: [] },
          { code: 'AFM 401', title: 'Fish Health Management & Water Quality Analysis', level: 400, semester: 'harmattan', questions: [] },
          { code: 'AFM 501', title: 'Fisheries Economics, Extension & Post-Harvest Technology', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  },

  // =====================================================
  // 13. FACULTY OF AGRICULTURAL SCIENCES
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
            title: 'Introduction to Agricultural Extension',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is the primary mission of Agricultural Extension services?', options: ['Levying farm taxes', 'Disseminating research-proven agricultural technologies and improved practices to farmers and rural communities', 'Managing commercial fertilizer sales monopolies', 'Enforcing government land seizure'], correctAnswer: 'Disseminating research-proven agricultural technologies and improved practices to farmers and rural communities' },
              { type: 'cbt', question: 'What extension teaching method involves demonstrating a new farming technique step-by-step on a farmer\'s field?', options: ['Radio broadcast', 'Method demonstration / Result demonstration', 'Mass newspaper advert', 'Lecture in a classroom'], correctAnswer: 'Method demonstration / Result demonstration' },
            ],
          },
          {
            code: 'AER 201',
            title: 'Rural Sociology & Community Development',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'According to Everett Rogers\' Diffusion of Innovations model, which adopter category is first to try new agricultural technologies?', options: ['Laggards', 'Innovators', 'Late Majority', 'Early Majority'], correctAnswer: 'Innovators' },
              { type: 'cbt', question: 'What is the participatory bottom-up approach in rural agricultural development?', options: ['Directives issued solely from federal headquarters', 'Actively involving local rural farmers in identifying problems, planning, and executing agricultural projects', 'Ignoring local knowledge completely', 'Importing foreign labor for farm work'], correctAnswer: 'Actively involving local rural farmers in identifying problems, planning, and executing agricultural projects' },
            ],
          },
          { code: 'AER 301', title: 'Extension Communication Methods & Audio-Visuals', level: 300, semester: 'harmattan', questions: [] },
          { code: 'AER 401', title: 'Programme Planning & Evaluation in Agriculture', level: 400, semester: 'harmattan', questions: [] },
          { code: 'AER 501', title: 'Administration, Supervision & Youth in Agriculture', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Animal Nutrition and Biotechnology',
        code: 'ANB',
        courses: [
          {
            code: 'ANB 101',
            title: 'Introductory Animal Science',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which of the following farm animals is classified as a ruminant with a four-compartment stomach?', options: ['Pig', 'Cow (Cattle)', 'Chicken (Poultry)', 'Horse'], correctAnswer: 'Cow (Cattle)' },
              { type: 'cbt', question: 'What are the four compartments of the ruminant stomach in anatomical order?', options: ['Rumen, Reticulum, Omasum, Abomasum', 'Stomach, Gizzard, Crop, Intestine', 'Duodenum, Jejunum, Ileum, Cecum', 'Proventriculus, Ventriculus, Cloaca, Colon'], correctAnswer: 'Rumen, Reticulum, Omasum, Abomasum' },
            ],
          },
          {
            code: 'ANB 201',
            title: 'Principles of Animal Nutrition & Feedstuffs',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which major feed ingredient serves as the primary protein source in poultry and livestock feed formulations in Nigeria?', options: ['Maize grain', 'Soybean meal (or Groundnut cake - GNC)', 'Wheat offal', 'Limestone'], correctAnswer: 'Soybean meal (or Groundnut cake - GNC)' },
              { type: 'cbt', question: 'What is crude fiber in proximate feed analysis?', options: ['The fat content soluble in ether', 'The insoluble carbohydrate fraction consisting primarily of cellulose, hemicellulose, and lignin', 'The total moisture content', 'The inorganic mineral ash'], correctAnswer: 'The insoluble carbohydrate fraction consisting primarily of cellulose, hemicellulose, and lignin' },
            ],
          },
          { code: 'ANB 301', title: 'Ruminant and Non-Ruminant Nutrition', level: 300, semester: 'harmattan', questions: [] },
          { code: 'ANB 401', title: 'Applied Feed Formulation & Feed Milling', level: 400, semester: 'harmattan', questions: [] },
          { code: 'ANB 501', title: 'Animal Biotechnology & Molecular Nutrition', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Animal Production and Health',
        code: 'APH',
        courses: [
          {
            code: 'APH 101',
            title: 'Introduction to Livestock Production',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is colostrum in mammalian livestock management?', options: ['The first milk produced by the mother after birth, rich in maternal antibodies and nutrients', 'Processed commercial powdered milk', 'Spoiled sour milk', 'A synthetic vaccine shot'], correctAnswer: 'The first milk produced by the mother after birth, rich in maternal antibodies and nutrients' },
              { type: 'cbt', question: 'What is the standard gestation period for cattle (cows)?', options: ['114 days', '150 days', 'Approximately 283 days (9 months)', '365 days'], correctAnswer: 'Approximately 283 days (9 months)' },
            ],
          },
          {
            code: 'APH 201',
            title: 'Anatomy & Physiology of Farm Animals',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which viral disease in poultry is characterized by high mortality, respiratory distress, and green diarrhea?', options: ['Coccidiosis', 'Newcastle Disease', 'Fowl Cholera', 'Favus'], correctAnswer: 'Newcastle Disease' },
              { type: 'cbt', question: 'What management practice involves cutting the sharp tip of a chick\'s beak to prevent cannibalism and egg pecking?', options: ['Debeaking (Beak trimming)', 'Castration', 'Dehorning', 'Docking'], correctAnswer: 'Debeaking (Beak trimming)' },
            ],
          },
          { code: 'APH 301', title: 'Poultry, Swine & Ruminant Production', level: 300, semester: 'harmattan', questions: [] },
          { code: 'APH 401', title: 'Livestock Diseases, Prevention & Herd Health', level: 400, semester: 'harmattan', questions: [] },
          { code: 'APH 501', title: 'Livestock Processing Technology & Farm Management', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Crop and Environmental Protection',
        code: 'CEP',
        courses: [
          {
            code: 'CEP 101',
            title: 'Introduction to Crop Protection',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What are the three core components of the Plant Disease Triangle required for infectious disease development?', options: ['Susceptible Host, Virulent Pathogen, and Favorable Environment', 'Sunlight, Fertilizer, and High Tractor Speed', 'Chemical Spray, Dry Soil, and Acid Rain', 'Cold Storage, Seed Coating, and Packaging'], correctAnswer: 'Susceptible Host, Virulent Pathogen, and Favorable Environment' },
              { type: 'cbt', question: 'What type of chemical pesticide is specifically formulated to control unwanted weed vegetation?', options: ['Insecticide', 'Herbicide', 'Fungicide', 'Nematicide'], correctAnswer: 'Herbicide' },
            ],
          },
          {
            code: 'CEP 201',
            title: 'Agricultural Entomology & Plant Pathology',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What insect pest is a notorious vector for transmitting the African Cassava Mosaic Virus (ACMV)?', options: ['Stem borer', 'Whitefly (Bemisia tabaci)', 'Armyworm', 'Termite'], correctAnswer: 'Whitefly (Bemisia tabaci)' },
              { type: 'cbt', question: 'What is Integrated Pest Management (IPM)?', options: ['Exclusive heavy spraying of synthetic chemicals daily', 'An ecosystem-based strategy combining biological, cultural, physical, and chemical tools to minimize pest damage economically and safely', 'Abandoning infected crops completely', 'Burning all farmland yearly'], correctAnswer: 'An ecosystem-based strategy combining biological, cultural, physical, and chemical tools to minimize pest damage economically and safely' },
            ],
          },
          { code: 'CEP 301', title: 'Weed Science & Pesticide Application Technology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CEP 401', title: 'Integrated Pest Management & Plant Disease Control', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CEP 501', title: 'Environmental Toxicology & Post-Harvest Pest Management', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Crop Production & Soil Science',
        code: 'CPS',
        courses: [
          {
            code: 'CPS 101',
            title: 'Introduction to Crop Production',
            level: 100,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'Which three primary macronutrients are supplied in standard commercial inorganic NPK fertilizers?', options: ['Nitrogen (N), Phosphorus (P), and Potassium (K)', 'Nickel (Ni), Platinum (Pt), and Krypton (Kr)', 'Sodium (Na), Lead (Pb), and Calcium (Ca)', 'Iron (Fe), Zinc (Zn), and Copper (Cu)'], correctAnswer: 'Nitrogen (N), Phosphorus (P), and Potassium (K)' },
              { type: 'cbt', question: 'What agricultural practice involves growing two or more crops simultaneously in the same field during the same season?', options: ['Monoculture', 'Intercropping (Mixed cropping)', 'Clean fallowing', 'Strip mining'], correctAnswer: 'Intercropping (Mixed cropping)' },
            ],
          },
          {
            code: 'CPS 201',
            title: 'Fundamentals of Soil Science & Soil Chemistry',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What are the three fundamental mineral particle size classes that determine soil texture?', options: ['Gravel, Boulder, and Cobble', 'Sand, Silt, and Clay', 'Humus, Peat, and Compost', 'Nitrate, Phosphate, and Potash'], correctAnswer: 'Sand, Silt, and Clay' },
              { type: 'cbt', question: 'What soil pH value is considered neutral for agricultural soils?', options: ['pH 4.0', 'pH 7.0', 'pH 9.5', 'pH 14.0'], correctAnswer: 'pH 7.0' },
            ],
          },
          { code: 'CPS 301', title: 'Arable and Tree Crop Production', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CPS 401', title: 'Soil Fertility, Fertilizer Management & Soil Survey', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CPS 501', title: 'Seed Technology & Advanced Soil Conservation', level: 500, semester: 'harmattan', questions: [] },
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
              { type: 'cbt', question: 'What are the classical four factors of agricultural production?', options: ['Tractors, Diesel, Seeds, and Rain', 'Land, Labor, Capital, and Management (Entrepreneurship)', 'Banks, Markets, Roads, and Stores', 'Fertilizer, Insecticide, Hoe, and Cutlass'], correctAnswer: 'Land, Labor, Capital, and Management (Entrepreneurship)' },
              { type: 'cbt', question: 'What economic law states that adding more of one factor of production while holding others constant will eventually yield smaller per-unit increases in output?', options: ['Law of Demand', 'Law of Diminishing Marginal Returns', 'Law of Comparative Advantage', 'Gresham\'s Law'], correctAnswer: 'Law of Diminishing Marginal Returns' },
            ],
          },
          {
            code: 'AEC 201',
            title: 'Principles of Farm Management & Production Economics',
            level: 200,
            semester: 'harmattan',
            questions: [
              { type: 'cbt', question: 'What is depreciation in agricultural asset management?', options: ['Sudden increase in market land value', 'The loss in value of a farm asset over time due to wear, tear, age, and obsolescence', 'Farm loan interest rate', 'The cost of hired manual labor'], correctAnswer: 'The loss in value of a farm asset over time due to wear, tear, age, and obsolescence' },
              { type: 'cbt', question: 'What is a farm enterprise budget?', options: ['An estimate of the expected costs and returns for a specific single agricultural enterprise (e.g. 1 hectare of maize)', 'The total national agricultural budget of Nigeria', 'A commercial bank savings passbook', 'A list of agricultural subsidy grants'], correctAnswer: 'An estimate of the expected costs and returns for a specific single agricultural enterprise (e.g. 1 hectare of maize)' },
            ],
          },
          { code: 'AEC 301', title: 'Agricultural Marketing & Prices', level: 300, semester: 'harmattan', questions: [] },
          { code: 'AEC 401', title: 'Agricultural Finance & Project Analysis', level: 400, semester: 'harmattan', questions: [] },
          { code: 'AEC 501', title: 'Resource Economics & Agricultural Policy', level: 500, semester: 'harmattan', questions: [] },
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
    console.log('[SEED] Starting full relational curriculum insertion...');

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
        console.warn(`[SEED] Could not create/find faculty: ${fac.facultyName}`);
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
              eq(departmentsTable.facultyId, insertedFaculty.id),
              eq(departmentsTable.code, dept.code)
            )
          )
          .limit(1);

        let deptRecord = existingDepartments[0];

        if (!deptRecord) {
          const [newDepartment] = await db
            .insert(departmentsTable)
            .values({
              facultyId: insertedFaculty.id,
              name: dept.deptName,
              code: dept.code,
            })
            .returning();

          if (!newDepartment) {
            console.warn(`[SEED] Could not create department: ${dept.deptName}`);
            continue;
          }

          deptRecord = newDepartment;
        } else {
          const [updatedDepartment] = await db
            .update(departmentsTable)
            .set({
              name: dept.deptName,
            })
            .where(eq(departmentsTable.id, deptRecord.id))
            .returning();

          if (updatedDepartment) {
            deptRecord = updatedDepartment;
          }
        }

        // =================================================
        // COURSES
        // =================================================
        for (const course of dept.courses) {
          const existingCourses = await db
            .select()
            .from(coursesTable)
            .where(
              and(
                eq(coursesTable.departmentId, deptRecord.id),
                eq(coursesTable.code, course.code)
              )
            )
            .limit(1);

          let courseRecord = existingCourses[0];

          if (!courseRecord) {
            const [newCourse] = await db
              .insert(coursesTable)
              .values({
                departmentId: deptRecord.id,
                code: course.code,
                title: course.title,
                level: course.level,
                semester: course.semester,
              })
              .returning();

            if (!newCourse) {
              console.warn(`[SEED] Could not create course: ${course.code}`);
              continue;
            }

            courseRecord = newCourse;
          } else {
            const [updatedCourse] = await db
              .update(coursesTable)
              .set({
                title: course.title,
                level: course.level,
                semester: course.semester,
              })
              .where(eq(coursesTable.id, courseRecord.id))
              .returning();

            if (updatedCourse) {
              courseRecord = updatedCourse;
            }
          }

          // =================================================
          // QUESTIONS
          // =================================================
          for (const qItem of course.questions) {
            const existingQuestions = await db
              .select()
              .from(questionsTable)
              .where(
                and(
                  eq(questionsTable.courseId, courseRecord.id),
                  eq(questionsTable.question, qItem.question)
                )
              )
              .limit(1);

            const existingQuestion = existingQuestions[0];
            const gradingPoints = qItem.gradingPoints ?? [];

            // =============================================
            // UPDATE EXISTING QUESTION
            // =============================================
            if (existingQuestion) {
              await db
                .update(questionsTable)
                .set({
                  type: qItem.type,
                  options: qItem.options,
                  correctAnswer: qItem.correctAnswer,
                  gradingPoints,
                  difficulty: 'medium',
                })
                .where(eq(questionsTable.id, existingQuestion.id));

              console.log(`[SEED] Updated question: ${course.code} - ${qItem.question.substring(0, 35)}...`);
            }
            // =============================================
            // INSERT NEW QUESTION
            // =============================================
            else {
              await db
                .insert(questionsTable)
                .values({
                  courseId: courseRecord.id,
                  type: qItem.type,
                  question: qItem.question,
                  options: qItem.options,
                  correctAnswer: qItem.correctAnswer,
                  gradingPoints,
                  difficulty: 'medium',
                });

              console.log(`[SEED] Inserted question: ${course.code} - ${qItem.question.substring(0, 35)}...`);
            }
          }
        }
      }
    }

    console.log('[SEED] Successfully seeded LAUTECH curriculum, questions, and theory grading rubrics!');
    process.exit(0);
  } catch (error) {
    console.error('[SEED] Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
