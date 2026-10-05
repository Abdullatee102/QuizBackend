// src/seed/faculties/fci/ins200.ts
import type { SeedCourse } from '../../types.js';

export const ins200Courses: SeedCourse[] = [
  // 1. INS 201: Fundamentals of Enterprise Systems
  {
    code: 'INS 201',
    title: 'Fundamentals of Enterprise Systems',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What is the primary operational architecture that enables Enterprise Systems to integrate diverse departments?',
        options: [
          'A centralized database shared across all functional business modules',
          'Separate isolated spreadsheets maintained by each team',
          'Physical peer-to-peer serial cable connections between offices',
          'Individual paper ledgers reconciled manually at year end',
        ],
        correctAnswer: 'A centralized database shared across all functional business modules',
      },
      {
        type: 'cbt',
        question: 'Which enterprise module manages general ledger, accounts payable, accounts receivable, and cash management?',
        options: [
          'Financial and Accounting Module',
          'Human Resource Payroll Shell',
          'Shop Floor Routing Kernel',
          'Point of Sale Terminal',
        ],
        correctAnswer: 'Financial and Accounting Module',
      },
      {
        type: 'cbt',
        question: 'What is the primary benefit of Enterprise Systems over legacy siloed software?',
        options: [
          'Real-time information visibility, standardized processes, and elimination of data redundancy',
          'Lower initial implementation cost and zero staff training requirements',
          'Elimination of computer hardware infrastructure',
          'Support for only single-user offline desktop environments',
        ],
        correctAnswer: 'Real-time information visibility, standardized processes, and elimination of data redundancy',
      },
      {
        type: 'cbt',
        question: 'What is a "Best Practice" in the context of commercial ERP packages like SAP or Oracle?',
        options: [
          'The most effective, industry-proven process routines pre-configured into the ERP system',
          'Writing custom machine code for every transaction',
          'Allowing each employee to modify the core database schema',
          'Refusing software version updates indefinitely',
        ],
        correctAnswer: 'The most effective, industry-proven process routines pre-configured into the ERP system',
      },
      {
        type: 'cbt',
        question: 'What term describes adapting an enterprise software package to align with a company unique workflow without modifying core source code?',
        options: ['Configuration', 'Decompilation', 'Overclocking', 'Refactoring'],
        correctAnswer: 'Configuration',
      },
      {
        type: 'cbt',
        question: 'Which of the following enterprise modules focuses on talent acquisition, performance appraisal, and compensation?',
        options: [
          'Human Capital Management (HCM) / HR Module',
          'Materials Requirement Planning (MRP)',
          'Warehouse Management Module',
          'Quality Assurance Inspection Module',
        ],
        correctAnswer: 'Human Capital Management (HCM) / HR Module',
      },
      {
        type: 'cbt',
        question: 'What is "Data Redundancy" in poorly integrated corporate databases?',
        options: [
          'Duplicate data stored across multiple uncoordinated files and tables causing inconsistency',
          'Automatic cloud backup redundancy',
          'Compressing image files to save disk sectors',
          'Dual power supply cords on database servers',
        ],
        correctAnswer: 'Duplicate data stored across multiple uncoordinated files and tables causing inconsistency',
      },
      {
        type: 'cbt',
        question: 'What is the "Big Bang" cutover strategy in enterprise system rollout?',
        options: [
          'Switching from the legacy system to the new enterprise system instantaneously across all sites on a designated go-live date',
          'Gradually deploying module by module over 5 years',
          'Running both systems in parallel for a whole decade',
          'Deploying only to a tiny branch office pilot permanently',
        ],
        correctAnswer: 'Switching from the legacy system to the new enterprise system instantaneously across all sites on a designated go-live date',
      },
      {
        type: 'cbt',
        question: 'What does MRP stand for in manufacturing enterprise applications?',
        options: [
          'Material Requirements Planning',
          'Master Routing Protocol',
          'Modern Resource Partitioning',
          'Machine Reliability Platform',
        ],
        correctAnswer: 'Material Requirements Planning',
      },
      {
        type: 'cbt',
        question: 'Which role acts as the bridge between technical software engineers and end business users during ERP implementation?',
        options: [
          'Business Analyst / Functional Consultant',
          'Database Hardware Janitor',
          'Network Cable Technician',
          'Security Guard',
        ],
        correctAnswer: 'Business Analyst / Functional Consultant',
      },
    ],
  },

  // 2. INS 202: Business Data Communications
  {
    code: 'INS 202',
    title: 'Business Data Communications',
    level: 200,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'Which OSI model layer is responsible for end-to-end reliable delivery, segment flow control, and error recovery?',
        options: ['Transport Layer (Layer 4)', 'Physical Layer (Layer 1)', 'Data Link Layer (Layer 2)', 'Session Layer (Layer 5)'],
        correctAnswer: 'Transport Layer (Layer 4)',
      },
      {
        type: 'cbt',
        question: 'What is a Virtual Private Network (VPN) primarily used for in modern corporate environments?',
        options: [
          'Creating an encrypted, secure tunnel over a public network (like the Internet) for remote workers to access corporate resources',
          'Boosting broadband download bandwidth beyond ISP limits',
          'Replacing Ethernet cables with copper phone wires',
          'Formatting hard drives automatically upon login',
        ],
        correctAnswer: 'Creating an encrypted, secure tunnel over a public network (like the Internet) for remote workers to access corporate resources',
      },
      {
        type: 'cbt',
        question: 'Which device operates at Layer 3 (Network Layer) to inspect IP addresses and forward packets between different subnets?',
        options: ['Router', 'Repeater', 'Hub', 'Unmanaged Switch'],
        correctAnswer: 'Router',
      },
      {
        type: 'cbt',
        question: 'What is Bandwidth in business telecommunications?',
        options: [
          'The maximum data transfer capacity of a communication channel expressed in bits per second (bps)',
          'The physical length of the twisted pair copper wire in meters',
          'The amount of RAM inside a network interface card',
          'The weight of the rack-mounted enterprise server',
        ],
        correctAnswer: 'The maximum data transfer capacity of a communication channel expressed in bits per second (bps)',
      },
      {
        type: 'cbt',
        question: 'What communication mode allows bidirectional data transmission, but only one direction at a time (e.g., walkie-talkie)?',
        options: ['Half-Duplex', 'Simplex', 'Full-Duplex', 'Multiplex'],
        correctAnswer: 'Half-Duplex',
      },
      {
        type: 'cbt',
        question: 'Which protocol translates human-readable domain names (such as lautech.edu.ng) into machine-routable IP addresses?',
        options: ['DNS (Domain Name System)', 'DHCP', 'SNMP', 'FTP'],
        correctAnswer: 'DNS (Domain Name System)',
      },
      {
        type: 'cbt',
        question: 'What does DHCP dynamically assign to client devices when they connect to a corporate local area network?',
        options: [
          'IP address, Subnet Mask, Default Gateway, and DNS server addresses',
          'Operating system product keys',
          'Root administrator passwords',
          'Hardware MAC serial certificates',
        ],
        correctAnswer: 'IP address, Subnet Mask, Default Gateway, and DNS server addresses',
      },
      {
        type: 'cbt',
        question: 'Which transmission medium provides the highest bandwidth capacity and immunity to electromagnetic interference (EMI)?',
        options: ['Fiber Optic Cable', 'Unshielded Twisted Pair (UTP)', 'Coaxial Cable', 'Copper Telephone Wire'],
        correctAnswer: 'Fiber Optic Cable',
      },
      {
        type: 'cbt',
        question: 'What is Latency in packet-switched computer networks?',
        options: [
          'The round-trip time delay taken for a data packet to travel from source to destination and receive acknowledgement',
          'The total volume of files downloaded per month',
          'The number of collision domains on a switch',
          'The percentage of packet headers compressed',
        ],
        correctAnswer: 'The round-trip time delay taken for a data packet to travel from source to destination and receive acknowledgement',
      },
      {
        type: 'cbt',
        question: 'Which wireless standard family governs high-speed enterprise Wi-Fi local area communications?',
        options: ['IEEE 802.11', 'IEEE 802.3', 'IEEE 754', 'ISO 9001'],
        correctAnswer: 'IEEE 802.11',
      },
    ],
  },

  // 3. INS 203: Information Systems Hardware & Architecture
  {
    code: 'INS 203',
    title: 'IS Hardware & Computer Systems Architecture',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What are the main components of the classic Von Neumann computer architecture?',
        options: [
          'Central Processing Unit (ALU and Control Unit), Memory, and Input/Output mechanisms',
          'Monitor, Keyboard, Mouse, and Desktop chassis',
          'HTML, CSS, JavaScript, and Web Server',
          'Frontend UI, REST API, Database, and Cache',
        ],
        correctAnswer: 'Central Processing Unit (ALU and Control Unit), Memory, and Input/Output mechanisms',
      },
      {
        type: 'cbt',
        question: 'What role does Cache memory perform between the CPU and main system RAM?',
        options: [
          'Provides ultra-fast, high-speed buffer memory to store frequently referenced instructions and data',
          'Permanent storage for archive backup files',
          'Converts AC power from wall outlets into DC electricity',
          'Cools down CPU silicon chips via liquid convection',
        ],
        correctAnswer: 'Provides ultra-fast, high-speed buffer memory to store frequently referenced instructions and data',
      },
      {
        type: 'cbt',
        question: 'What is Server Virtualization in enterprise data centers?',
        options: [
          'Partitioning a single physical server into multiple isolated virtual machines (VMs) using a hypervisor',
          'Replacing physical keyboards with touchscreen displays',
          'Running servers exclusively without internet connection',
          'Painting server racks with camouflage colors',
        ],
        correctAnswer: 'Partitioning a single physical server into multiple isolated virtual machines (VMs) using a hypervisor',
      },
      {
        type: 'cbt',
        question: 'What is RAID (Redundant Array of Independent Disks) primarily used for in enterprise storage?',
        options: [
          'Combining multiple hard disk drives for data redundancy, fault tolerance, and improved I/O throughput',
          'Increasing internet download bandwidth',
          'Displaying 4K video graphics to desktop monitors',
          'Scanning email attachments for trojan viruses',
        ],
        correctAnswer: 'Combining multiple hard disk drives for data redundancy, fault tolerance, and improved I/O throughput',
      },
      {
        type: 'cbt',
        question: 'Which RAID level uses disk striping with distributed parity to withstand a single drive failure?',
        options: ['RAID 5', 'RAID 0', 'RAID 1', 'JBOD'],
        correctAnswer: 'RAID 5',
      },
      {
        type: 'cbt',
        question: 'What distinguishes Solid State Drives (SSDs) from traditional Hard Disk Drives (HDDs)?',
        options: [
          'SSDs use NAND flash memory with no moving mechanical parts, resulting in vastly faster read/write speeds and lower latency',
          'SSDs use magnetic spinning platters and read/write actuator arms',
          'SSDs can only store data while power is continuously supplied',
          'SSDs have much slower random access times than mechanical HDDs',
        ],
        correctAnswer: 'SSDs use NAND flash memory with no moving mechanical parts, resulting in vastly faster read/write speeds and lower latency',
      },
      {
        type: 'cbt',
        question: 'What is a Blade Server in enterprise computing racks?',
        options: [
          'A stripped-down, modular server chassis designed to minimize physical space and energy consumption while sharing power/cooling',
          'A sharp device used to strip fiber optic jackets',
          'A desktop computer fitted with gaming liquid coolers',
          'A handheld barcode inventory scanner',
        ],
        correctAnswer: 'A stripped-down, modular server chassis designed to minimize physical space and energy consumption while sharing power/cooling',
      },
      {
        type: 'cbt',
        question: 'What does a Type-1 (Bare Metal) Hypervisor run directly on?',
        options: [
          'Directly on the physical host hardware without an underlying host operating system',
          'Inside an existing Windows desktop application window',
          'On a smartphone Android emulator',
          'Within a web browser JavaScript engine',
        ],
        correctAnswer: 'Directly on the physical host hardware without an underlying host operating system',
      },
      {
        type: 'cbt',
        question: 'What is an Uninterruptible Power Supply (UPS) designed to deliver to server infrastructure?',
        options: [
          'Emergency battery power during electrical mains outages to prevent unexpected server shutdowns and data corruption',
          'Unlimited free electrical power generation indefinitely',
          'High voltage current to destroy rogue malware laptops',
          'Liquid nitrogen cooling to processors',
        ],
        correctAnswer: 'Emergency battery power during electrical mains outages to prevent unexpected server shutdowns and data corruption',
      },
      {
        type: 'cbt',
        question: 'What is SAN (Storage Area Network) in enterprise information infrastructure?',
        options: [
          'A dedicated, high-speed specialized network that provides block-level network access to shared pools of storage devices',
          'A small USB flash drive plugged into an office laptop',
          'An internet service provider telephone line',
          'A wireless Bluetooth keyboard connector',
        ],
        correctAnswer: 'A dedicated, high-speed specialized network that provides block-level network access to shared pools of storage devices',
      },
    ],
  },

  // 4. INS 204: Web Systems & E-Commerce
  {
    code: 'INS 204',
    title: 'Web Systems & E-Commerce',
    level: 200,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'Which e-commerce business model describes an enterprise selling directly to individual consumers (e.g., Jumia, Amazon)?',
        options: ['B2C (Business-to-Consumer)', 'B2B (Business-to-Business)', 'C2C (Consumer-to-Consumer)', 'C2B (Consumer-to-Business)'],
        correctAnswer: 'B2C (Business-to-Consumer)',
      },
      {
        type: 'cbt',
        question: 'What protocol secures e-commerce transactions by encrypting HTTP web traffic over TLS?',
        options: ['HTTPS', 'FTP', 'Telnet', 'SMTP'],
        correctAnswer: 'HTTPS',
      },
      {
        type: 'cbt',
        question: 'What does a Payment Gateway (e.g., Paystack, Flutterwave) do in online shopping systems?',
        options: [
          'Securely authorizes credit/debit card transactions and transmits funds between customer banks and merchant merchant accounts',
          'Physically packs cartons and ships them to postal offices',
          'Calculates product manufacturing defects',
          'Hosts product catalogue photos on social media',
        ],
        correctAnswer: 'Securely authorizes credit/debit card transactions and transmits funds between customer banks and merchant merchant accounts',
      },
      {
        type: 'cbt',
        question: 'What is a "Shopping Cart Abandonment Rate" metric in e-commerce analytics?',
        options: [
          'The percentage of online shoppers who add items to their virtual cart but leave without completing the purchase',
          'The rate at which physical supermarket carts are damaged by customers',
          'The speed of credit card checkout in physical retail stores',
          'The number of products refunded due to poor packaging',
        ],
        correctAnswer: 'The percentage of online shoppers who add items to their virtual cart but leave without completing the purchase',
      },
      {
        type: 'cbt',
        question: 'What web architecture pattern separates the presentation layer, business application logic, and database layer?',
        options: ['Three-Tier Architecture', 'Single Monolithic Script', 'Zero-Tier Model', 'Flat File Architecture'],
        correctAnswer: 'Three-Tier Architecture',
      },
      {
        type: 'cbt',
        question: 'What is Search Engine Optimization (SEO)?',
        options: [
          'The process of enhancing a website visibility and ranking on unpaid search engine results pages',
          'Buying illegal keywords on the dark web',
          'Deleting all website meta tags to save page loading memory',
          'Locking web content behind private paid firewalls',
        ],
        correctAnswer: 'The process of enhancing a website visibility and ranking on unpaid search engine results pages',
      },
      {
        type: 'cbt',
        question: 'Which cookie attribute protects authentication session cookies from being accessed by malicious client-side JavaScript?',
        options: ['HttpOnly', 'SameSite=None', 'Max-Age=0', 'Domain=localhost'],
        correctAnswer: 'HttpOnly',
      },
      {
        type: 'cbt',
        question: 'In C2C e-commerce (such as eBay, Jiji, or OLX), who conducts transactions with whom?',
        options: [
          'Individual consumers trade or sell items directly to other individual consumers',
          'Government agencies procure stationery from factories',
          'Wholesalers sell freight containers to distributors',
          'Enterprises sell bulk licenses to universities',
        ],
        correctAnswer: 'Individual consumers trade or sell items directly to other individual consumers',
      },
      {
        type: 'cbt',
        question: 'What does an SSL/TLS digital certificate issued by a trusted Certificate Authority (CA) guarantee to web visitors?',
        options: [
          'Verification of domain identity ownership and cryptographic encryption of communications in transit',
          'Immunity of web server software from all bugs',
          '100% guarantee that the business will never go bankrupt',
          'Unlimited bandwidth speeds for all customers',
        ],
        correctAnswer: 'Verification of domain identity ownership and cryptographic encryption of communications in transit',
      },
      {
        type: 'cbt',
        question: 'What is Responsive Web Design in modern web systems?',
        options: [
          'Designing web interfaces that dynamically adapt layout and usability across different screen sizes and device types',
          'Writing web servers that reply within one nanosecond',
          'Using voice recognition only for navigation',
          'Creating separate domain websites for every user',
        ],
        correctAnswer: 'Designing web interfaces that dynamically adapt layout and usability across different screen sizes and device types',
      },
    ],
  },

  // 5. INS 205: Information Systems Principles
  {
    code: 'INS 205',
    title: 'Information Systems Principles',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What does the Systems Development Life Cycle (SDLC) represent?',
        options: [
          'A structured framework defining the stages involved in planning, creating, testing, deploying, and maintaining an information system',
          'The physical operational lifespan of a computer battery',
          'The licensing expiration date of desktop software',
          'The annual sales accounting period of a firm',
        ],
        correctAnswer: 'A structured framework defining the stages involved in planning, creating, testing, deploying, and maintaining an information system',
      },
      {
        type: 'cbt',
        question: 'In the SDLC, which phase immediately follows system requirements analysis?',
        options: ['System Design', 'System Maintenance', 'System Decommissioning', 'Live Production Cutover'],
        correctAnswer: 'System Design',
      },
      {
        type: 'cbt',
        question: 'What is a Feasibility Study in information systems planning?',
        options: [
          'An evaluation of technical, economic, legal, operational, and scheduling practicality of a proposed system project',
          'A typing speed test for prospective data entry staff',
          'Measuring the physical temperature of the server room',
          'A price negotiation with office chair suppliers',
        ],
        correctAnswer: 'An evaluation of technical, economic, legal, operational, and scheduling practicality of a proposed system project',
      },
      {
        type: 'cbt',
        question: 'What does ROI stand for when justifying capital investment in corporate IT projects?',
        options: ['Return on Investment', 'Rate of Information', 'Record of Inventory', 'Routing Operating Index'],
        correctAnswer: 'Return on Investment',
      },
      {
        type: 'cbt',
        question: 'What is the role of Feedback in an open information system?',
        options: [
          'Output that is returned to appropriate members of the organization to help evaluate or refine the input and transformation stages',
          'Noise in audio microphones during zoom calls',
          'Complaint forms thrown into paper bins',
          'Printing error logs on physical scrap paper',
        ],
        correctAnswer: 'Output that is returned to appropriate members of the organization to help evaluate or refine the input and transformation stages',
      },
      {
        type: 'cbt',
        question: 'Which of the following is an example of an informal information system inside an organization?',
        options: [
          'Spontaneous discussions and rumors exchanged during coffee breaks or hallway chats',
          'The corporate SAP financial ledger',
          'The official HR employee personnel database',
          'The electronic payroll direct deposit software',
        ],
        correctAnswer: 'Spontaneous discussions and rumors exchanged during coffee breaks or hallway chats',
      },
      {
        type: 'cbt',
        question: 'What does TCO (Total Cost of Ownership) calculate for an IT asset?',
        options: [
          'The comprehensive cost of acquiring, deploying, operating, training, maintaining, and retiring the asset over its full lifecycle',
          'The initial retail purchase price quoted on the vendor invoice only',
          'The shipping customs duty fee paid at the seaport',
          'The resale scrap metal price of discarded computers',
        ],
        correctAnswer: 'The comprehensive cost of acquiring, deploying, operating, training, maintaining, and retiring the asset over its full lifecycle',
      },
      {
        type: 'cbt',
        question: 'In information systems governance, what is an SLA (Service Level Agreement)?',
        options: [
          'A formal contract defining specific measurable service performance standards (such as 99.9% uptime) between service provider and client',
          'A software license allowing installation on five laptops',
          'A user password policy agreement',
          'A receipt confirming software payment',
        ],
        correctAnswer: 'A formal contract defining specific measurable service performance standards (such as 99.9% uptime) between service provider and client',
      },
      {
        type: 'cbt',
        question: 'What principle dictates that data collected by an information system must be accurate, complete, and reliable?',
        options: ['Data Quality / Data Integrity', 'Data Redundancy', 'Data Proliferation', 'Data Obfuscation'],
        correctAnswer: 'Data Quality / Data Integrity',
      },
      {
        type: 'cbt',
        question: 'What is a "Pilot Study" implementation method in system deployment?',
        options: [
          'Introducing the new system to only one limited department or geographic branch to evaluate performance before full rollout',
          'Hiring aircraft pilots to test flight reservation software',
          'Switching the entire university system live overnight',
          'Discarding the software after one week of test trials',
        ],
        correctAnswer: 'Introducing the new system to only one limited department or geographic branch to evaluate performance before full rollout',
      },
    ],
  },

  // 6. INS 207: Database Systems & Information Management
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
        options: [
          'Deletes all records while keeping the table structure',
          'Permanently removes the table structure and all its data from the database',
          'Backs up the table to disk',
          'Hides the table from queries',
        ],
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
        options: [
          'A repository storing metadata about data schemas, tables, fields, and constraints',
          'A spelling checker for SQL queries',
          'A backup archive on tape',
          'A client user guide',
        ],
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

  // 7. INS 209: Enterprise Information Systems
  {
    code: 'INS 209',
    title: 'Enterprise Information Systems',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What is the primary objective of Enterprise Application Integration (EAI)?',
        options: [
          'Connecting diverse subsystems and legacy databases to share business logic and information in real time',
          'Formatting all computers with the same desktop wallpaper',
          'Enforcing employees to use identical email signatures',
          'Replacing relational databases with simple CSV files',
        ],
        correctAnswer: 'Connecting diverse subsystems and legacy databases to share business logic and information in real time',
      },
      {
        type: 'cbt',
        question: 'Which enterprise system coordinates upstream suppliers, manufacturers, distribution centers, and retail outlets?',
        options: [
          'Supply Chain Management (SCM)',
          'Office Desktop Suite',
          'Video Editing Software',
          'Personal Time Tracker',
        ],
        correctAnswer: 'Supply Chain Management (SCM)',
      },
      {
        type: 'cbt',
        question: 'In enterprise systems, what is the "Bullwhip Effect" in supply chains?',
        options: [
          'Small fluctuations in consumer retail demand causing magnified swings up the supply chain toward wholesalers and manufacturers',
          'Physical damage caused by industrial robotic arms',
          'Sudden collapse of corporate intranet bandwidth during lunchtime',
          'Loss of paper invoices during transport',
        ],
        correctAnswer: 'Small fluctuations in consumer retail demand causing magnified swings up the supply chain toward wholesalers and manufacturers',
      },
      {
        type: 'cbt',
        question: 'What is an Enterprise Data Warehouse (EDW)?',
        options: [
          'A central repository of integrated, historical, and subject-oriented data consolidated from multiple operational sources for reporting and analysis',
          'A physical warehouse where computer boxes and monitors are stored',
          'A temporary scratch directory on an employee workstation',
          'A single table storing customer passwords',
        ],
        correctAnswer: 'A central repository of integrated, historical, and subject-oriented data consolidated from multiple operational sources for reporting and analysis',
      },
      {
        type: 'cbt',
        question: 'What does ETL stand for in data warehousing processes?',
        options: [
          'Extract, Transform, Load',
          'Electronic Transmission Line',
          'Enterprise Transaction Log',
          'Entity Traversal Language',
        ],
        correctAnswer: 'Extract, Transform, Load',
      },
      {
        type: 'cbt',
        question: 'What is "Just-In-Time" (JIT) manufacturing enabled by modern enterprise supply chain systems?',
        options: [
          'A production strategy that aligns raw-material orders directly with production schedules to minimize inventory holding costs',
          'Rushing product assembly minutes before shipping deadlines',
          'Delivering shipments only during night shifts',
          'Producing infinite excess inventory to fill warehouses',
        ],
        correctAnswer: 'A production strategy that aligns raw-material orders directly with production schedules to minimize inventory holding costs',
      },
      {
        type: 'cbt',
        question: 'What does Business-to-Business (B2B) electronic data interchange (EDI) replace?',
        options: [
          'Paper-based purchase orders, invoices, and shipping notices exchanged between corporate trading partners',
          'Face-to-face employee lunches',
          'Credit cards in retail department stores',
          'Broadband fiber optic internet connections',
        ],
        correctAnswer: 'Paper-based purchase orders, invoices, and shipping notices exchanged between corporate trading partners',
      },
      {
        type: 'cbt',
        question: 'Which architectural style structures enterprise software as a collection of loosely coupled, fine-grained autonomous services?',
        options: ['Microservices Architecture', 'Monolithic Executable', 'Single Threaded Script', 'Batch Job Loop'],
        correctAnswer: 'Microservices Architecture',
      },
      {
        type: 'cbt',
        question: 'What is Master Data in an enterprise organization?',
        options: [
          'Core business entities (such as customers, products, employees, suppliers) consistently shared across all enterprise applications',
          'Temporary log files generated during system reboot',
          'The operating system kernel installation files',
          'Draft emails saved in the inbox',
        ],
        correctAnswer: 'Core business entities (such as customers, products, employees, suppliers) consistently shared across all enterprise applications',
      },
      {
        type: 'cbt',
        question: 'Which tool allows business executives to monitor Key Performance Indicators (KPIs) in real time with visual charts and gauges?',
        options: ['Executive Dashboard', 'Text Editor', 'Command Line Prompt', 'Hex Viewer'],
        correctAnswer: 'Executive Dashboard',
      },
    ],
  },

  // 8. INS 211: Human Computer Interaction for IS
  {
    code: 'INS 211',
    title: 'Human Computer Interaction for IS',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What is the primary focus of Human-Computer Interaction (HCI)?',
        options: [
          'Understanding and optimizing how humans interact with computational systems to ensure high usability and user satisfaction',
          'Maximizing CPU clock speed through overclocking',
          'Writing efficient low-level assembly compilers',
          'Soldering circuit boards in hardware factories',
        ],
        correctAnswer: 'Understanding and optimizing how humans interact with computational systems to ensure high usability and user satisfaction',
      },
      {
        type: 'cbt',
        question: 'In interface design, what does "Affordance" mean?',
        options: [
          'The perceived visual property of an object that suggests how it should be used (e.g., a raised button affords pressing)',
          'The financial retail cost of purchasing the software license',
          'The memory consumption required to render a dialog box',
          'The bandwidth required to download web icons',
        ],
        correctAnswer: 'The perceived visual property of an object that suggests how it should be used (e.g., a raised button affords pressing)',
      },
      {
        type: 'cbt',
        question: 'Which usability evaluation method involves experts inspecting an interface against recognized design principles?',
        options: [
          'Heuristic Evaluation (e.g., Nielsen 10 Usability Heuristics)',
          'Stress Testing under heavy network load',
          'Automated SQL unit testing',
          'Decompiling the binary source code',
        ],
        correctAnswer: 'Heuristic Evaluation (e.g., Nielsen 10 Usability Heuristics)',
      },
      {
        type: 'cbt',
        question: 'What is the "Mental Model" of a user in interactive system design?',
        options: [
          'A user internal psychological understanding of how a system works based on prior experience and perception',
          'The technical schematic diagram drawn by backend database architects',
          'The CPU instruction pipeline model',
          'The memory allocation table in system RAM',
        ],
        correctAnswer: 'A user internal psychological understanding of how a system works based on prior experience and perception',
      },
      {
        type: 'cbt',
        question: 'What is Fitts Law used to predict in graphical user interface ergonomics?',
        options: [
          'The time required to rapidly move to and click a target area as a function of the target distance and width',
          'The rate at which hard drives fail after five years',
          'The power consumption of high-resolution OLED monitors',
          'The price drop of computer microchips every two years',
        ],
        correctAnswer: 'The time required to rapidly move to and click a target area as a function of the target distance and width',
      },
      {
        type: 'cbt',
        question: 'What does UX stand for compared to UI in digital product development?',
        options: [
          'UX is User Experience (overall journey, feeling, and ease); UI is User Interface (visual graphical elements)',
          'UX is Unix Execution; UI is Universal Input',
          'UX and UI are completely synonymous terms with no distinction',
          'UX is physical hardware; UI is operating system kernel',
        ],
        correctAnswer: 'UX is User Experience (overall journey, feeling, and ease); UI is User Interface (visual graphical elements)',
      },
      {
        type: 'cbt',
        question: 'What is a "Persona" in user-centered design methodology?',
        options: [
          'A fictitious, research-based archetype representing a key group of target users with specific goals and pain points',
          'A security password token sent via SMS',
          'A pseudonym used by hackers to disguise their IP',
          'A licensed software avatar in video games',
        ],
        correctAnswer: 'A fictitious, research-based archetype representing a key group of target users with specific goals and pain points',
      },
      {
        type: 'cbt',
        question: 'Which design principle suggests giving immediate feedback (auditory, visual, or haptic) upon user actions?',
        options: ['Visibility of System Status', 'Security through Obscurity', 'Maximum Latency Principle', 'Delayed Action Protocol'],
        correctAnswer: 'Visibility of System Status',
      },
      {
        type: 'cbt',
        question: 'What is the purpose of Wireframing in the design lifecycle of an interactive information system?',
        options: [
          'Creating low-fidelity structural blueprints to plan interface layout and content hierarchy before visual design and coding',
          'Connecting copper wires behind server racks',
          'Testing high-voltage grounding in computer laboratories',
          'Compiling TypeScript code into production bundles',
        ],
        correctAnswer: 'Creating low-fidelity structural blueprints to plan interface layout and content hierarchy before visual design and coding',
      },
      {
        type: 'cbt',
        question: 'In accessibility guidelines (WCAG), what does high Color Contrast ensure?',
        options: [
          'Text and interactive elements remain easily readable for users with visual impairments or color blindness',
          'Monitors consume zero electrical energy',
          'Websites appear identical on black-and-white printouts only',
          'Images load ten times faster across satellite connections',
        ],
        correctAnswer: 'Text and interactive elements remain easily readable for users with visual impairments or color blindness',
      },
    ],
  },

  // Shared 200 Level courses
  { code: 'CSC 201', title: 'Computer Programming I', level: 200, semester: 'harmattan', questions: [] },
  { code: 'CSC 203', title: 'Foundations of Sequential Programming', level: 200, semester: 'harmattan', questions: [] },
  { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
  { code: 'STA 201', title: 'Statistics for Physical Sciences', level: 200, semester: 'harmattan', questions: [] },
  { code: 'CSC 202', title: 'Computer Programming II', level: 200, semester: 'rain', questions: [] },
  { code: 'CSC 204', title: 'Data Structures and Algorithms I', level: 200, semester: 'rain', questions: [] },
  { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },
  { code: 'ENT 211', title: 'Entrepreneurship and Innovation', level: 200, semester: 'harmattan', questions: [] },
];
