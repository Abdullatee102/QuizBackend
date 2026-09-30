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
        { code: 'CSC 303', title: 'Object-Oriented Programming', level: 300, semester: 'harmattan', questions: [
            { type: 'cbt', question: 'Which sorting algorithm is not stable by default?', options: ['Merge Sort', 'Insertion Sort', 'Quick Sort', 'Bubble Sort'], correctAnswer: 'Quick Sort' },
            { type: 'cbt', question: 'What data structure is used to implement a priority queue?', options: ['Array', 'Linked List', 'Heap', 'Stack'], correctAnswer: 'Heap' },
            { type: 'cbt', question: 'Which graph traversal uses a Stack?', options: ['Breadth-First Search', 'Depth-First Search', 'Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm'], correctAnswer: 'Depth-First Search' },
            { type: 'cbt', question: 'What is the prefix notation also known as?', options: ['Polish Notation', 'Reverse Polish Notation', 'Infix Notation', 'Postfix Notation'], correctAnswer: 'Polish Notation' },
            { type: 'cbt', question: 'In an AVL tree, the balance factor of any node can only be:', options: ['-2, -1, 0', '-1, 0, 1', '0, 1, 2', '1, 2, 3'], correctAnswer: '-1, 0, 1' },
            { type: 'cbt', question: 'Which algorithm finds the Minimum Spanning Tree?', options: ['Dijkstra\'s', 'Floyd-Warshall', 'Kruskal\'s', 'Bellman-Ford'], correctAnswer: 'Kruskal\'s' },
            { type: 'cbt', question: 'What is the best case time complexity of Bubble Sort?', options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)'], correctAnswer: 'O(n)' },
            { type: 'cbt', question: 'A directed acyclic graph (DAG) can always be sorted using:', options: ['Topological Sort', 'Insertion Sort', 'Merge Sort', 'Heap Sort'], correctAnswer: 'Topological Sort' },
            { type: 'cbt', question: 'What is the maximum number of children a node can have in a Binary Tree?', options: ['1', '2', '3', 'Any number'], correctAnswer: '2' },
            { type: 'cbt', question: 'Which hashing resolution method uses linked lists?', options: ['Linear Probing', 'Quadratic Probing', 'Double Hashing', 'Separate Chaining'], correctAnswer: 'Separate Chaining' },
] },
        { code: 'CSC 311', title: 'Operating Systems', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 305', title: 'Database Management Systems', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 307', title: 'Theory of Computation & Automata', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 309', title: 'Compiler Construction', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CSC 302', title: 'Systems Analysis & Design', level: 300, semester: 'rain', questions: [] },
        { code: 'CSC 304', title: 'Software Engineering Principles', level: 300, semester: 'rain', questions: [] },
        { code: 'CSC 306', title: 'Computer Networks & Communications', level: 300, semester: 'rain', questions: [] },
        { code: 'CSC 399', title: 'Students Industrial Work Experience Scheme (SIWES)', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'CSC 401', title: 'Software Engineering', level: 400, semester: 'harmattan', questions: [
            { type: 'theory', question: 'Discuss the trade-offs between Waterfall and Agile model architecture.', options: [], correctAnswer: 'Waterfall is linear and inflexible, suitable for stable requirements, while Agile is iterative, flexible, and handles changing requirements well.', gradingPoints: [{ concept: 'Waterfall is linear', weight: 0.5, aliases: ['rigid', 'sequential'] }, { concept: 'Agile is iterative', weight: 0.5, aliases: ['flexible', 'sprints'] }] },
            { type: 'theory', question: 'Explain Monolithic vs. Microservices system architecture.', options: [], correctAnswer: 'Monolithic architecture builds an application as a single unified unit, making scaling difficult. Microservices architecture divides it into smaller, independent services that communicate over a network, enabling easier scaling.', gradingPoints: [{ concept: 'Monolithic is single unit', weight: 0.5, aliases: ['unified', 'tightly coupled'] }, { concept: 'Microservices are independent', weight: 0.5, aliases: ['loose coupling', 'separate services'] }] },
            { type: 'theory', question: 'Describe the three main categories of Design Patterns.', options: [], correctAnswer: 'Creational patterns deal with object creation. Structural patterns deal with object composition and class structure. Behavioral patterns deal with communication between objects.', gradingPoints: [{ concept: 'Creational for object creation', weight: 0.33, aliases: ['create objects'] }, { concept: 'Structural for composition', weight: 0.33, aliases: ['class structure'] }, { concept: 'Behavioral for communication', weight: 0.33, aliases: ['interaction between objects'] }] },
            { type: 'theory', question: 'What is a Continuous Integration & Continuous Deployment (CI/CD) pipeline?', options: [], correctAnswer: 'CI/CD automates the building, testing, and deployment of applications. CI ensures code changes are regularly merged and tested, while CD automates the release process to production environments.', gradingPoints: [{ concept: 'CI automates testing and merging', weight: 0.5, aliases: ['continuous integration', 'automated build'] }, { concept: 'CD automates deployment', weight: 0.5, aliases: ['continuous deployment', 'release to production'] }] },
            { type: 'theory', question: 'Compare Functional vs. Non-Functional testing.', options: [], correctAnswer: 'Functional testing verifies what the system does against requirements (e.g., unit tests). Non-functional testing verifies how the system performs (e.g., performance, security, usability).', gradingPoints: [{ concept: 'Functional tests what system does', weight: 0.5, aliases: ['behavior', 'requirements'] }, { concept: 'Non-functional tests how system performs', weight: 0.5, aliases: ['performance', 'security', 'usability'] }] },
] },
        { code: 'CSC 403', title: 'Distributed Systems & Cloud Computing', level: 400, semester: 'harmattan', questions: [
            { type: 'theory', question: 'Explain the CAP Theorem and its implications.', options: [], correctAnswer: 'The CAP Theorem states that a distributed data store can only guarantee two out of three: Consistency, Availability, and Partition Tolerance. In the presence of a network partition, one must choose between consistency and availability.', gradingPoints: [{ concept: 'Consistency, Availability, Partition Tolerance', weight: 0.5, aliases: ['CAP'] }, { concept: 'Pick two out of three', weight: 0.5, aliases: ['trade-off'] }] },
            { type: 'theory', question: 'Compare IaaS, PaaS, and SaaS cloud service models.', options: [], correctAnswer: 'IaaS provides raw infrastructure like VMs. PaaS provides platforms and environments for developers. SaaS provides fully functional software applications accessed via the web.', gradingPoints: [{ concept: 'IaaS is infrastructure', weight: 0.33, aliases: ['VM', 'servers'] }, { concept: 'PaaS is platform', weight: 0.33, aliases: ['environment', 'developer tools'] }, { concept: 'SaaS is software', weight: 0.33, aliases: ['application', 'end-user software'] }] },
            { type: 'theory', question: 'How does RPC (Remote Procedure Call) mechanism work?', options: [], correctAnswer: 'RPC allows a program to execute a procedure on a remote server as if it were local. It involves client stubs marshalling parameters into a message, sending it over the network, and the server stub unmarshalling and executing the call.', gradingPoints: [{ concept: 'Execute procedure remotely', weight: 0.5, aliases: ['remote server', 'local feel'] }, { concept: 'Marshalling and unmarshalling parameters', weight: 0.5, aliases: ['stubs', 'serialization'] }] },
            { type: 'theory', question: 'Describe the MapReduce programming model.', options: [], correctAnswer: 'MapReduce processes large datasets in parallel. The Map phase filters and sorts data, while the Reduce phase aggregates and summarizes the mapped data.', gradingPoints: [{ concept: 'Map phase filters and sorts', weight: 0.5, aliases: ['mapping', 'distribute'] }, { concept: 'Reduce phase aggregates', weight: 0.5, aliases: ['summarize', 'combine'] }] },
            { type: 'theory', question: 'Explain the Raft Consensus algorithm states.', options: [], correctAnswer: 'In Raft, a node can be a Leader (handles requests), a Follower (passive, responds to leader), or a Candidate (requests votes to become leader during an election).', gradingPoints: [{ concept: 'Leader, Follower, Candidate', weight: 0.8, aliases: ['three states'] }, { concept: 'Election process', weight: 0.2, aliases: ['votes'] }] },
] },
        { code: 'CSC 405', title: 'Computer Graphics & Visualization', level: 400, semester: 'harmattan', questions: [
            { type: 'theory', question: 'What are the stages of the Graphics Rendering Pipeline?', options: [], correctAnswer: 'The pipeline transforms 3D models into 2D images. Main stages include vertex processing (transformations), rasterization (converting to pixels/fragments), and fragment shading (coloring and lighting).', gradingPoints: [{ concept: 'Vertex processing', weight: 0.33, aliases: ['transformations'] }, { concept: 'Rasterization', weight: 0.33, aliases: ['pixels', 'fragments'] }, { concept: 'Fragment shading', weight: 0.33, aliases: ['coloring', 'lighting'] }] },
            { type: 'theory', question: 'Compare Ray Tracing vs. Rasterization.', options: [], correctAnswer: 'Rasterization is fast and projects 3D polygons onto a 2D screen, commonly used in real-time graphics. Ray Tracing simulates light paths physics to achieve photorealism, but is computationally expensive.', gradingPoints: [{ concept: 'Rasterization is fast polygon projection', weight: 0.5, aliases: ['real-time'] }, { concept: 'Ray Tracing simulates light physics', weight: 0.5, aliases: ['photorealism', 'expensive'] }] },
            { type: 'theory', question: 'Explain the Phong Reflection Model components.', options: [], correctAnswer: 'The Phong model combines Ambient reflection (constant background light), Diffuse reflection (light scattering based on angle), and Specular reflection (shiny highlights based on view angle).', gradingPoints: [{ concept: 'Ambient reflection', weight: 0.33, aliases: ['background light'] }, { concept: 'Diffuse reflection', weight: 0.33, aliases: ['matte', 'scattering'] }, { concept: 'Specular reflection', weight: 0.33, aliases: ['shiny', 'highlights'] }] },
            { type: 'theory', question: 'Why are 4x4 Homogeneous Coordinates used in 3D Affine Transformations?', options: [], correctAnswer: 'Homogeneous coordinates allow all affine transformations, including translation, rotation, and scaling, to be represented as matrix multiplications, enabling them to be easily composed.', gradingPoints: [{ concept: 'Allows translation via matrix multiplication', weight: 0.5, aliases: ['uniform representation'] }, { concept: 'Composition of transformations', weight: 0.5, aliases: ['combining matrices'] }] },
            { type: 'theory', question: 'How does the Z-Buffer algorithm remove hidden surfaces?', options: [], correctAnswer: 'The Z-Buffer stores the depth (Z-value) of each pixel. When rendering a new fragment, its depth is compared to the stored depth; it is only drawn if it is closer to the camera.', gradingPoints: [{ concept: 'Stores depth of each pixel', weight: 0.5, aliases: ['Z-value'] }, { concept: 'Compares depth to draw closer fragments', weight: 0.5, aliases: ['hidden surface removal'] }] },
] },
        { code: 'CSC 407', title: 'Human Computer Interaction', level: 400, semester: 'harmattan', questions: [
            { type: 'theory', question: 'List and explain three of Jakob Nielsens Usability Heuristics.', options: [], correctAnswer: 'Examples include: Visibility of system status (keeping users informed), Match between system and real world (using familiar language), and User control and freedom (supporting undo/redo).', gradingPoints: [{ concept: 'Visibility of system status', weight: 0.33, aliases: ['status'] }, { concept: 'Match between system and real world', weight: 0.33, aliases: ['familiar'] }, { concept: 'User control and freedom', weight: 0.33, aliases: ['undo', 'redo'] }] },
            { type: 'theory', question: 'What are the phases of the User-Centered Design (UCD) process?', options: [], correctAnswer: 'UCD involves understanding the context of use, specifying user requirements, designing solutions, and evaluating against requirements iteratively.', gradingPoints: [{ concept: 'Understand context and requirements', weight: 0.5, aliases: ['users', 'needs'] }, { concept: 'Iterative design and evaluation', weight: 0.5, aliases: ['testing', 'prototyping'] }] },
            { type: 'theory', question: 'Explain Fitts Law and its implication in UI design.', options: [], correctAnswer: 'Fitts Law states that the time to acquire a target is a function of the distance to the target and its size. In UI design, clickable areas should be larger and closer to the users cursor to reduce interaction time.', gradingPoints: [{ concept: 'Time depends on distance and size', weight: 0.5, aliases: ['target acquisition'] }, { concept: 'Make important buttons larger and closer', weight: 0.5, aliases: ['UI implication'] }] },
            { type: 'theory', question: 'Compare Formative vs. Summative evaluation in usability testing.', options: [], correctAnswer: 'Formative evaluation is conducted during the design process to find and fix issues. Summative evaluation is conducted at the end to assess overall usability and compare against benchmarks.', gradingPoints: [{ concept: 'Formative during design to fix issues', weight: 0.5, aliases: ['early', 'iterative'] }, { concept: 'Summative at the end for assessment', weight: 0.5, aliases: ['final', 'benchmark'] }] },
            { type: 'theory', question: 'What are the WCAG POUR principles?', options: [], correctAnswer: 'POUR stands for Perceivable (content is accessible to senses), Operable (UI can be navigated), Understandable (content is clear), and Robust (compatible with assistive technologies).', gradingPoints: [{ concept: 'Perceivable, Operable, Understandable, Robust', weight: 1.0, aliases: ['POUR'] }] },
] },
        { code: 'CSC 402', title: 'Research Methodology & Project Proposal', level: 400, semester: 'rain', questions: [
            { type: 'theory', question: 'What is the purpose of a Literature Review in academic research?', options: [], correctAnswer: 'A literature review synthesizes existing research, identifies gaps in current knowledge, and establishes the theoretical framework and justification for the proposed study.', gradingPoints: [{ concept: 'Synthesizes existing research', weight: 0.5, aliases: ['summarizes', 'prior work'] }, { concept: 'Identifies gaps in knowledge', weight: 0.5, aliases: ['justification'] }] },
            { type: 'theory', question: 'Compare Quantitative and Qualitative research methodologies.', options: [], correctAnswer: 'Quantitative research uses numerical data and statistical analysis to test hypotheses. Qualitative research explores non-numerical data like interviews or observations to understand concepts or experiences.', gradingPoints: [{ concept: 'Quantitative uses numerical data', weight: 0.5, aliases: ['statistics', 'metrics'] }, { concept: 'Qualitative explores concepts/experiences', weight: 0.5, aliases: ['interviews', 'non-numerical'] }] },
            { type: 'theory', question: 'Why is Academic Integrity important and how is Plagiarism prevented?', options: [], correctAnswer: 'Academic integrity ensures honesty and credit to original authors. Plagiarism is prevented through proper citation standards (e.g., IEEE, APA) and summarizing ideas in one\'s own words.', gradingPoints: [{ concept: 'Honesty and credit to authors', weight: 0.5, aliases: ['academic integrity'] }, { concept: 'Proper citation standards', weight: 0.5, aliases: ['referencing', 'IEEE', 'APA'] }] },
            { type: 'theory', question: 'How do you formulate a Research Problem Statement using SMART objectives?', options: [], correctAnswer: 'A problem statement clearly defines the issue. SMART objectives ensure the research goals are Specific, Measurable, Achievable, Relevant, and Time-bound.', gradingPoints: [{ concept: 'Clearly defines the issue', weight: 0.3, aliases: ['problem statement'] }, { concept: 'Specific, Measurable, Achievable, Relevant, Time-bound', weight: 0.7, aliases: ['SMART'] }] },
            { type: 'theory', question: 'Differentiate between Primary and Secondary data collection methods.', options: [], correctAnswer: 'Primary data is collected firsthand by the researcher for the specific study (e.g., experiments, surveys). Secondary data is pre-existing data collected by others (e.g., literature, databases).', gradingPoints: [{ concept: 'Primary data is collected firsthand', weight: 0.5, aliases: ['original', 'surveys'] }, { concept: 'Secondary data is pre-existing', weight: 0.5, aliases: ['existing', 'literature'] }] },
] },
        { code: 'CSC 404', title: 'Net-Centric Computing & Wireless Networks', level: 400, semester: 'rain', questions: [
            { type: 'theory', question: 'Map the OSI 7-Layer Model to the TCP/IP 4-Layer Architecture.', options: [], correctAnswer: 'OSI Application, Presentation, and Session map to TCP/IP Application. OSI Transport maps to TCP/IP Transport. OSI Network maps to TCP/IP Internet. OSI Data Link and Physical map to TCP/IP Network Access.', gradingPoints: [{ concept: 'Application layers map to Application', weight: 0.3, aliases: [] }, { concept: 'Transport to Transport, Network to Internet', weight: 0.4, aliases: [] }, { concept: 'Data Link/Physical to Network Access', weight: 0.3, aliases: [] }] },
            { type: 'theory', question: 'Compare TCP vs. UDP protocols.', options: [], correctAnswer: 'TCP is connection-oriented, reliable, and uses a 3-way handshake, but is slower. UDP is connectionless, unreliable, and low-latency, suitable for streaming.', gradingPoints: [{ concept: 'TCP is reliable and connection-oriented', weight: 0.5, aliases: ['3-way handshake'] }, { concept: 'UDP is unreliable and low-latency', weight: 0.5, aliases: ['connectionless', 'fast'] }] },
            { type: 'theory', question: 'Explain Wi-Fi collision avoidance via CSMA/CA and RTS/CTS.', options: [], correctAnswer: 'CSMA/CA avoids collisions by listening before transmitting. RTS/CTS (Request/Clear to Send) prevents the hidden node problem by reserving the wireless channel before data transmission.', gradingPoints: [{ concept: 'CSMA/CA listens before transmitting', weight: 0.5, aliases: ['collision avoidance'] }, { concept: 'RTS/CTS reserves the channel', weight: 0.5, aliases: ['hidden node problem'] }] },
            { type: 'theory', question: 'What is NAT and why is IPv4 to IPv6 migration necessary?', options: [], correctAnswer: 'NAT translates private IP addresses to public IPs, slowing IPv4 exhaustion. Migration to IPv6 is necessary because IPv4\'s 32-bit address space is exhausted, whereas IPv6 uses 128-bit addresses providing vast space.', gradingPoints: [{ concept: 'NAT translates private to public IPs', weight: 0.5, aliases: ['Network Address Translation'] }, { concept: 'IPv6 128-bit solves IPv4 32-bit exhaustion', weight: 0.5, aliases: ['address exhaustion'] }] },
            { type: 'theory', question: 'Describe 5G Cellular Architecture concepts like Network Slicing and Massive MIMO.', options: [], correctAnswer: 'Network Slicing creates virtualized, isolated networks over a shared physical infrastructure for specific use cases. Massive MIMO uses numerous antennas for beamforming, drastically increasing capacity and efficiency.', gradingPoints: [{ concept: 'Network Slicing creates virtual isolated networks', weight: 0.5, aliases: ['virtualized', 'specific use cases'] }, { concept: 'Massive MIMO uses many antennas for beamforming', weight: 0.5, aliases: ['capacity', 'efficiency'] }] },
] },
        { code: 'CSC 406', title: 'Formal Methods in Software Development', level: 400, semester: 'rain', questions: [
            { type: 'theory', question: 'Explain Formal Specifications and Hoare Logic triples.', options: [], correctAnswer: 'Formal specifications mathematically describe software behavior. A Hoare triple {P} C {Q} means if precondition P is true before executing command C, and C terminates, postcondition Q will be true.', gradingPoints: [{ concept: 'Hoare triple {P} C {Q}', weight: 0.5, aliases: ['precondition', 'postcondition'] }, { concept: 'Mathematically describe behavior', weight: 0.5, aliases: ['formal specifications'] }] },
            { type: 'theory', question: 'Compare Model Checking with Automated Theorem Proving.', options: [], correctAnswer: 'Model Checking exhaustively explores finite-state spaces to verify properties automatically. Theorem Proving uses logical inference to prove system properties, often requiring manual guidance but works on infinite state spaces.', gradingPoints: [{ concept: 'Model Checking explores finite-state spaces', weight: 0.5, aliases: ['exhaustive', 'automatic'] }, { concept: 'Theorem Proving uses logical inference', weight: 0.5, aliases: ['infinite state', 'manual guidance'] }] },
            { type: 'theory', question: 'Describe Z Notation state schemas.', options: [], correctAnswer: 'Z Notation uses mathematical schemas. A state schema consists of a signature (declaring variables and types) and a state invariant (logical predicates constraining the variables).', gradingPoints: [{ concept: 'Signature declares variables', weight: 0.5, aliases: ['types'] }, { concept: 'State invariant constrains variables', weight: 0.5, aliases: ['predicates'] }] },
            { type: 'theory', question: 'What are Loop Invariants and Loop Variants?', options: [], correctAnswer: 'A Loop Invariant is a condition that remains true before and after each iteration of a loop, proving partial correctness. A Loop Variant is a mathematical function that strictly decreases each iteration, proving termination.', gradingPoints: [{ concept: 'Loop Invariant remains true', weight: 0.5, aliases: ['partial correctness'] }, { concept: 'Loop Variant strictly decreases', weight: 0.5, aliases: ['proves termination'] }] },
            { type: 'theory', question: 'Differentiate between Partial Correctness and Total Correctness.', options: [], correctAnswer: 'Partial Correctness guarantees that if a program terminates, the output is correct. Total Correctness incorporates Partial Correctness plus the proof that the program will actually terminate.', gradingPoints: [{ concept: 'Partial Correctness assumes termination', weight: 0.5, aliases: ['if it terminates'] }, { concept: 'Total Correctness proves termination', weight: 0.5, aliases: ['guarantees termination'] }] },
] },
        { code: 'CSC 499', title: 'B.Sc. Final Year Project I', level: 400, semester: 'rain', questions: [
            { type: 'theory', question: 'What are the essential components of a CS Final Year Project Proposal?', options: [], correctAnswer: 'Essential components include the Introduction, Problem Statement, Objectives, Methodology, Scope/Limitations, and Literature Review.', gradingPoints: [{ concept: 'Problem Statement and Objectives', weight: 0.5, aliases: ['goals'] }, { concept: 'Methodology and Literature Review', weight: 0.5, aliases: ['scope'] }] },
            { type: 'theory', question: 'Describe the IEEE System Requirements Specification (SRS) document structure.', options: [], correctAnswer: 'The IEEE SRS typically includes an Introduction (purpose, scope), Overall Description (user characteristics, constraints), and Specific Requirements (functional, non-functional, interface requirements).', gradingPoints: [{ concept: 'Introduction and Overall Description', weight: 0.5, aliases: ['scope', 'constraints'] }, { concept: 'Specific Requirements (functional/non-functional)', weight: 0.5, aliases: ['interface'] }] },
            { type: 'theory', question: 'Explain the Feasibility Study TELOS model.', options: [], correctAnswer: 'TELOS stands for Technical (can it be built?), Economic (is it cost-effective?), Legal (is it lawful?), Operational (will it be used?), and Schedule (can it be done in time?).', gradingPoints: [{ concept: 'Technical, Economic, Legal, Operational, Schedule', weight: 1.0, aliases: ['TELOS'] }] },
            { type: 'theory', question: 'Compare System Architecture Diagrams vs. Data Flow Diagrams (DFD).', options: [], correctAnswer: 'System Architecture Diagrams show the high-level physical or logical structure of components (e.g., client-server). DFDs show how data moves through processes, stores, and external entities at various levels (0/1/2).', gradingPoints: [{ concept: 'Architecture shows structural components', weight: 0.5, aliases: ['high-level', 'client-server'] }, { concept: 'DFD shows data movement and processes', weight: 0.5, aliases: ['data flow', 'levels'] }] },
            { type: 'theory', question: 'What are the evaluation criteria for an Oral Defense?', options: [], correctAnswer: 'Evaluation typically covers clarity of the problem statement, technical rigor of the methodology, presentation skills, ability to answer questions, and a working software demonstration.', gradingPoints: [{ concept: 'Clarity and technical rigor', weight: 0.5, aliases: ['problem statement', 'methodology'] }, { concept: 'Presentation and working software demo', weight: 0.5, aliases: ['answering questions', 'demonstration'] }] },
] },

        // 500 Level
        { code: 'CSC 501', title: 'Artificial Intelligence & Expert Systems', level: 500, semester: 'harmattan', questions: [
            { type: 'cbt', question: 'What is a hypervisor?', options: ['A fast processor', 'Software that creates and runs virtual machines', 'A network routing protocol', 'A file system type'], correctAnswer: 'Software that creates and runs virtual machines' },
            { type: 'cbt', question: 'Which of the following is a type 1 hypervisor?', options: ['VMware Workstation', 'VirtualBox', 'Xen', 'QEMU'], correctAnswer: 'Xen' },
            { type: 'cbt', question: 'What problem does the Banker\'s Algorithm solve?', options: ['Deadlock Avoidance', 'Process Scheduling', 'Memory Fragmentation', 'Network Routing'], correctAnswer: 'Deadlock Avoidance' },
            { type: 'cbt', question: 'In a distributed system, what is clock synchronization used for?', options: ['Speeding up processing', 'Ensuring events are ordered correctly across nodes', 'Saving power', 'Preventing memory leaks'], correctAnswer: 'Ensuring events are ordered correctly across nodes' },
            { type: 'cbt', question: 'Which distributed file system is developed by Google?', options: ['HDFS', 'NFS', 'GFS', 'AFS'], correctAnswer: 'GFS' },
            { type: 'cbt', question: 'What is thrashing in operating systems?', options: ['Excessive CPU heating', 'Excessive paging operations leading to low CPU utilization', 'High network latency', 'Disk failure'], correctAnswer: 'Excessive paging operations leading to low CPU utilization' },
            { type: 'cbt', question: 'Which scheduling algorithm provides the shortest average waiting time?', options: ['First-Come, First-Served', 'Shortest Job First', 'Round Robin', 'Priority Scheduling'], correctAnswer: 'Shortest Job First' },
            { type: 'cbt', question: 'What is a thread?', options: ['A separate program in execution', 'A lightweight unit of execution within a process', 'A hardware core', 'A memory segment'], correctAnswer: 'A lightweight unit of execution within a process' },
            { type: 'cbt', question: 'What is a translation lookaside buffer (TLB)?', options: ['A disk cache', 'A hardware cache for page table entries', 'A network buffer', 'A CPU register'], correctAnswer: 'A hardware cache for page table entries' },
            { type: 'cbt', question: 'Which condition is necessary for a deadlock to occur?', options: ['Preemption', 'Mutual Exclusion', 'Wait and Free', 'Linear Allocation'], correctAnswer: 'Mutual Exclusion' },
] },
        { code: 'CSC 503', title: 'Machine Learning & Data Mining', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CSC 505', title: 'Cryptography & Network Security', level: 500, semester: 'harmattan', questions: [
            { type: 'cbt', question: 'Which algorithm is an asymmetric cryptographic algorithm?', options: ['AES', 'DES', 'RSA', 'Blowfish'], correctAnswer: 'RSA' },
            { type: 'cbt', question: 'What is the purpose of a cryptographic hash function?', options: ['To encrypt data reversibly', 'To generate a fixed-size fingerprint of data', 'To compress files', 'To route packets securely'], correctAnswer: 'To generate a fixed-size fingerprint of data' },
            { type: 'cbt', question: 'In Public Key Infrastructure (PKI), what is used to verify a digital signature?', options: ['The sender\'s private key', 'The sender\'s public key', 'The receiver\'s private key', 'The receiver\'s public key'], correctAnswer: 'The sender\'s public key' },
            { type: 'cbt', question: 'What type of attack involves overwhelming a server with traffic?', options: ['Phishing', 'Man-in-the-Middle', 'DDoS', 'SQL Injection'], correctAnswer: 'DDoS' },
            { type: 'cbt', question: 'Which protocol is primarily used for secure web browsing?', options: ['FTP', 'HTTP', 'HTTPS', 'Telnet'], correctAnswer: 'HTTPS' },
            { type: 'cbt', question: 'What does a firewall do?', options: ['Encrypts all data', 'Monitors and controls incoming and outgoing network traffic', 'Scans for viruses', 'Speeds up the network'], correctAnswer: 'Monitors and controls incoming and outgoing network traffic' },
            { type: 'cbt', question: 'What is social engineering?', options: ['Manipulating people into giving up confidential information', 'Building secure networks', 'Encrypting social media', 'Hacking physical locks'], correctAnswer: 'Manipulating people into giving up confidential information' },
            { type: 'cbt', question: 'Which algorithm is considered the standard for symmetric encryption today?', options: ['DES', '3DES', 'AES', 'RC4'], correctAnswer: 'AES' },
            { type: 'cbt', question: 'What is a zero-day vulnerability?', options: ['A vulnerability with zero impact', 'A previously unknown vulnerability that hackers exploit before a patch exists', 'A virus that deletes itself in zero days', 'A secure port'], correctAnswer: 'A previously unknown vulnerability that hackers exploit before a patch exists' },
            { type: 'cbt', question: 'What is the primary function of an Intrusion Detection System (IDS)?', options: ['To block all traffic', 'To encrypt data', 'To detect and alert on unauthorized access attempts', 'To speed up network throughput'], correctAnswer: 'To detect and alert on unauthorized access attempts' },
] },
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
