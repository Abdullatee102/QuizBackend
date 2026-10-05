// src/seed/faculties/fci/ins100.ts
import type { SeedCourse } from '../../types.js';

export const ins100Courses: SeedCourse[] = [
  // 1. INS 101: Foundations of Information Systems
  {
    code: 'INS 101',
    title: 'Foundations of Information Systems',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What is an Information System (IS)?',
        options: [
          'A hardware-only computer assembly',
          'An integrated set of components for collecting, storing, and processing data into information',
          'A single software application used for word processing',
          'A network cable infrastructure',
        ],
        correctAnswer: 'An integrated set of components for collecting, storing, and processing data into information',
      },
      {
        type: 'cbt',
        question: 'Which of the following is an example of a Transaction Processing System (TPS)?',
        options: [
          'Supermarket Point of Sale (POS) scanner system',
          'Executive revenue forecasting dashboard',
          'Data warehouse online analytical processing tool',
          'Strategic decision simulator',
        ],
        correctAnswer: 'Supermarket Point of Sale (POS) scanner system',
      },
      {
        type: 'cbt',
        question: 'What are the five essential components of a computer-based information system?',
        options: [
          'Hardware, Software, Data, Procedures, and People',
          'Input, Processing, Storage, Output, Feedback',
          'CPU, RAM, Hard Disk, Monitor, Keyboard',
          'Java, Python, C++, SQL, PHP',
        ],
        correctAnswer: 'Hardware, Software, Data, Procedures, and People',
      },
      {
        type: 'cbt',
        question: 'What is the fundamental difference between data and information?',
        options: [
          'Data is raw unorganized facts; information is processed, meaningful context',
          'Data is structured reports; information is random sensor signals',
          'Data and information are identical terms in information science',
          'Data exists only in computer RAM while information is printed',
        ],
        correctAnswer: 'Data is raw unorganized facts; information is processed, meaningful context',
      },
      {
        type: 'cbt',
        question: 'Which information system is designed specifically to provide senior executives with high-level summaries and trend analytics?',
        options: [
          'Executive Support System (ESS)',
          'Transaction Processing System (TPS)',
          'Office Automation System (OAS)',
          'Process Control System (PCS)',
        ],
        correctAnswer: 'Executive Support System (ESS)',
      },
      {
        type: 'cbt',
        question: 'What does ERP stand for in enterprise information systems?',
        options: [
          'Enterprise Resource Planning',
          'Electronic Record Processing',
          'Extended Routing Protocol',
          'Entity Relationship Partitioning',
        ],
        correctAnswer: 'Enterprise Resource Planning',
      },
      {
        type: 'cbt',
        question: 'Which system helps organizations capture, organize, document, and disseminate tacit and explicit intellectual capital?',
        options: [
          'Knowledge Management System (KMS)',
          'Decision Support System (DSS)',
          'Supply Chain Management (SCM)',
          'Point of Sale (POS)',
        ],
        correctAnswer: 'Knowledge Management System (KMS)',
      },
      {
        type: 'cbt',
        question: 'What does CRM stand for in commercial enterprise software?',
        options: [
          'Customer Relationship Management',
          'Client Record Maintenance',
          'Central Resource Mapping',
          'Corporate Risk Mitigation',
        ],
        correctAnswer: 'Customer Relationship Management',
      },
      {
        type: 'cbt',
        question: 'In information systems analysis, what is a Business Process?',
        options: [
          'A series of logically connected activities performed by humans and systems to deliver value to customers',
          'A legal certificate filed with corporate affairs commission',
          'A computer assembly manufacturing workflow only',
          'The annual accounting audit report',
        ],
        correctAnswer: 'A series of logically connected activities performed by humans and systems to deliver value to customers',
      },
      {
        type: 'cbt',
        question: 'Which strategic management framework identifies Five Competitive Forces that shape industry attractiveness and IT strategy?',
        options: [
          'Michael Porter Five Forces Model',
          'Maslow Hierarchy of Needs',
          'McKinsey 7S Framework',
          'Boston Consulting Group Matrix',
        ],
        correctAnswer: 'Michael Porter Five Forces Model',
      },
    ],
  },

  // 2. INS 102: Business Processes & Information Technology
  {
    code: 'INS 102',
    title: 'Business Processes & Information Tech',
    level: 100,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What does Business Process Reengineering (BPR) advocate?',
        options: [
          'Fundamental rethinking and radical redesign of core business processes to achieve dramatic performance gains',
          'Minor incremental adjustments to existing clerical tasks',
          'Replacing all workers with industrial robots',
          'Outsourcing payroll without altering workflows',
        ],
        correctAnswer: 'Fundamental rethinking and radical redesign of core business processes to achieve dramatic performance gains',
      },
      {
        type: 'cbt',
        question: 'What notation standard is universally used to diagram business workflows visually?',
        options: [
          'BPMN (Business Process Model and Notation)',
          'HTML5',
          'JSON Schema',
          'Assembly mnemonic code',
        ],
        correctAnswer: 'BPMN (Business Process Model and Notation)',
      },
      {
        type: 'cbt',
        question: 'Which software suite coordinates cross-functional activities across inventory, procurement, manufacturing, and distribution?',
        options: [
          'SCM (Supply Chain Management)',
          'CAD (Computer Aided Design)',
          'Photoshop',
          'Compiler suite',
        ],
        correctAnswer: 'SCM (Supply Chain Management)',
      },
      {
        type: 'cbt',
        question: 'What is the primary objective of workflow automation in modern organizations?',
        options: [
          'Eliminate manual handoffs, reduce error rates, and accelerate cycle times',
          'Increase paperwork consumption',
          'Prevent staff from communicating via email',
          'Maximize server cooling costs',
        ],
        correctAnswer: 'Eliminate manual handoffs, reduce error rates, and accelerate cycle times',
      },
      {
        type: 'cbt',
        question: 'In BPMN diagrams, what shape standard denotes an Event (such as Start or End of a process)?',
        options: ['Circle', 'Rectangle', 'Diamond', 'Cylinder'],
        correctAnswer: 'Circle',
      },
      {
        type: 'cbt',
        question: 'In BPMN diagrams, what shape represents a Gateway used for decision分岐?',
        options: ['Diamond', 'Circle', 'Rectangle', 'Triangle'],
        correctAnswer: 'Diamond',
      },
      {
        type: 'cbt',
        question: 'What is an As-Is process model compared to a To-Be process model?',
        options: [
          'As-Is describes the current state; To-Be describes the proposed improved target state',
          'As-Is is the software code; To-Be is the database schema',
          'As-Is is historical archive; To-Be is accounting balance',
          'Both denote identical theoretical diagrams',
        ],
        correctAnswer: 'As-Is describes the current state; To-Be describes the proposed improved target state',
      },
      {
        type: 'cbt',
        question: 'What does SaaS stand for in cloud-based information technology delivery?',
        options: [
          'Software as a Service',
          'Storage and Security Suite',
          'System Analysis and Simulation',
          'Structured Algorithm and Syntax',
        ],
        correctAnswer: 'Software as a Service',
      },
      {
        type: 'cbt',
        question: 'What is the role of an Enterprise Data Bus or Middleware in business process integration?',
        options: [
          'Enables disparate software applications to exchange data seamlessly via standardized protocols',
          'Provides physical electricity to office workstations',
          'Acts as an antivirus cleaner on employee computers',
          'Prints physical invoices on line printers',
        ],
        correctAnswer: 'Enables disparate software applications to exchange data seamlessly via standardized protocols',
      },
      {
        type: 'cbt',
        question: 'Which business metric assesses the ratio of successful outputs generated relative to resources consumed?',
        options: [
          'Process Efficiency',
          'Bandwidth latency',
          'Clock cycle count',
          'Heap footprint',
        ],
        correctAnswer: 'Process Efficiency',
      },
    ],
  },

  // 3. INS 103: Information Systems & Organizations
  {
    code: 'INS 103',
    title: 'Information Systems in Organizations',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'How do information systems alter organizational hierarchy and structure?',
        options: [
          'By flattening organizational hierarchies through direct dissemination of operational data to management',
          'By requiring extra layers of middle management clerks',
          'By isolating field employees from headquarters communication',
          'By preventing departmental collaboration',
        ],
        correctAnswer: 'By flattening organizational hierarchies through direct dissemination of operational data to management',
      },
      {
        type: 'cbt',
        question: 'What is Organizational Culture in the context of information systems adoption?',
        options: [
          'The shared assumptions, values, norms, and behavioral routines held by members of an organization',
          'The specific programming language mandated by IT department',
          'The physical architecture of the server room',
          'The computer warranty policy',
        ],
        correctAnswer: 'The shared assumptions, values, norms, and behavioral routines held by members of an organization',
      },
      {
        type: 'cbt',
        question: 'Which economic theory argues that IT lowers the cost of market participation and contract monitoring, leading to smaller, leaner firms?',
        options: [
          'Transaction Cost Theory',
          'Keynesian Monetary Theory',
          'Ricardian Trade Model',
          'Classical Mechanics Theory',
        ],
        correctAnswer: 'Transaction Cost Theory',
      },
      {
        type: 'cbt',
        question: 'According to Agency Theory, why do firms implement information monitoring systems?',
        options: [
          'To reduce agency costs and ensure agents (employees/managers) act in the best interests of principals (owners)',
          'To generate decorative status charts for annual reports',
          'To slow down internet browsing speeds',
          'To eliminate customer relationships',
        ],
        correctAnswer: 'To reduce agency costs and ensure agents (employees/managers) act in the best interests of principals (owners)',
      },
      {
        type: 'cbt',
        question: 'What is Change Management in enterprise information system implementation?',
        options: [
          'A systematic approach to transitioning individuals, teams, and organizations to adopt new technology workflows smoothly',
          'Exchanging outdated coins for banknotes in petty cash',
          'Replacing broken computer keyboards with wireless models',
          'Updating operating system security patches automatically',
        ],
        correctAnswer: 'A systematic approach to transitioning individuals, teams, and organizations to adopt new technology workflows smoothly',
      },
      {
        type: 'cbt',
        question: 'Which of the following is the most frequent non-technical cause of large-scale enterprise system implementation failure?',
        options: [
          'User resistance to change and lack of executive leadership commitment',
          'Insufficient optical mouse sensitivity',
          'Ethernet cable coloring errors',
          'Excessive server cooling capacity',
        ],
        correctAnswer: 'User resistance to change and lack of executive leadership commitment',
      },
      {
        type: 'cbt',
        question: 'What does a CIO (Chief Information Officer) primarily oversee?',
        options: [
          'Strategic alignment of information technology infrastructure and assets with overarching business goals',
          'Physical janitorial maintenance of computer labs',
          'Typing speed tests for entry-level secretaries',
          'Repairing damaged desktop display cables',
        ],
        correctAnswer: 'Strategic alignment of information technology infrastructure and assets with overarching business goals',
      },
      {
        type: 'cbt',
        question: 'In competitive advantage strategy, what does "Lock-in" or high Switching Cost refer to?',
        options: [
          'The expense, effort, and inconvenience a customer or organization incurs when migrating from one vendor system to a competitor',
          'Padlocking the data center entry door at night',
          'Password complexity rules with 16 characters',
          'Restricting network access after business hours',
        ],
        correctAnswer: 'The expense, effort, and inconvenience a customer or organization incurs when migrating from one vendor system to a competitor',
      },
      {
        type: 'cbt',
        question: 'What is a Virtual Organization enabled by telecommunication and internet technology?',
        options: [
          'A networked enterprise utilizing digital links to collaborate across geographic and corporate boundaries without substantial physical premises',
          'A video game simulation with artificial companies',
          'A company that has filed for bankruptcy',
          'An offline print newspaper publisher',
        ],
        correctAnswer: 'A networked enterprise utilizing digital links to collaborate across geographic and corporate boundaries without substantial physical premises',
      },
      {
        type: 'cbt',
        question: 'What role does an intranet play within a modern corporate organization?',
        options: [
          'A secured, private internal network accessible exclusively to authorized organizational staff for communication and operational resources',
          'The global public worldwide web',
          'A public social media platform open to all citizens',
          'A cable TV channel broadcasting local news',
        ],
        correctAnswer: 'A secured, private internal network accessible exclusively to authorized organizational staff for communication and operational resources',
      },
    ],
  },

  // Shared 100 Level courses
  { code: 'CSC 101', title: 'Introduction to Computer Science', level: 100, semester: 'harmattan', questions: [] },
  { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
  { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
  { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
  { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
  { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
  { code: 'CSC 102', title: 'Introduction to Problem Solving', level: 100, semester: 'rain', questions: [] },
  { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
  { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
  { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
  { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },
];
