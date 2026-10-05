// src/seed/faculties/fci/csc300.ts
import type { SeedCourse } from '../../types.js';

export const csc300Courses: SeedCourse[] = [
  // =========================================================================
  // 300 LEVEL HARMATTAN SEMESTER
  // =========================================================================

  // 1. CSC 301: Data Structures & Algorithms
  {
    code: 'CSC 301',
    title: 'Data Structures & Algorithms',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Discuss the time complexity difference between Merge Sort and Quick Sort across different input scenarios.',
        options: [],
        correctAnswer: 'Merge sort has an O(n log n) time complexity across best, average, and worst cases because it consistently divides arrays in halves and requires O(n) auxiliary space. Quick sort has an average time complexity of O(n log n) with in-place partitioning, but degrades to O(n^2) in its worst case when poor pivots (such as already sorted elements) are chosen.',
        gradingPoints: [
          { concept: 'merge sort worst case is o(n log n)', weight: 0.5, aliases: ['merge sort is always n log n', 'guaranteed o(n log n)'] },
          { concept: 'quick sort degrades to o(n^2) when bad pivot selected', weight: 0.5, aliases: ['quick sort worst case o(n^2)', 'unbalanced partitions'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept of graph traversal using Breadth-First Search (BFS) and state its underlying data structure and time complexity.',
        options: [],
        correctAnswer: 'Breadth-First Search (BFS) explores a graph level by level starting from a chosen root vertex. It uses a First-In First-Out (FIFO) queue data structure to visit all immediate neighbors before moving to the next distance tier. Its time complexity on an adjacency list is O(V + E) where V is vertices and E is edges.',
        gradingPoints: [
          { concept: 'explores graph level by level', weight: 0.4, aliases: ['layer by layer', 'breadth first exploration', 'visits neighbors first'] },
          { concept: 'uses a queue data structure', weight: 0.3, aliases: ['fifo queue', 'queue based'] },
          { concept: 'time complexity o(v + e)', weight: 0.3, aliases: ['o(vertices plus edges)', 'linear in terms of vertices and edges'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the balancing mechanism of an AVL tree and how tree rotations restore equilibrium.',
        options: [],
        correctAnswer: 'An AVL tree is a self-balancing binary search tree where the balance factor of every node (height of left subtree minus height of right subtree) must be -1, 0, or +1. When an insertion or deletion causes a balance factor of +2 or -2, equilibrium is restored in O(log n) time using single rotations (LL, RR) or double rotations (LR, RL).',
        gradingPoints: [
          { concept: 'balance factor between -1, 0, +1', weight: 0.5, aliases: ['height difference at most 1', 'balance factor constraint'] },
          { concept: 'restores balance via single and double rotations', weight: 0.5, aliases: ['LL, RR, LR, RL rotations', 'tree rotation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Dijkstra\'s Single-Source Shortest Path algorithm and its limitation with negative edge weights.',
        options: [],
        correctAnswer: 'Dijkstra\'s algorithm finds the shortest path from a source vertex to all other vertices in a weighted directed graph using a greedy strategy and a min-priority queue (or heap). It maintains tentative distances and iteratively relaxes edges of the unvisited vertex with minimum distance. It fails on graphs with negative edge weights because it assumes once a vertex is visited, its shortest distance is finalized.',
        gradingPoints: [
          { concept: 'greedy selection with min-priority queue', weight: 0.5, aliases: ['priority queue', 'iterative edge relaxation'] },
          { concept: 'fails with negative edge weights', weight: 0.5, aliases: ['cannot handle negative weights', 'assumes non-negative edges'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Dynamic Programming with the Greedy algorithmic approach.',
        options: [],
        correctAnswer: 'Dynamic Programming solves problems with overlapping subproblems and optimal substructure by memoizing or tabulating subproblem solutions to avoid redundant computations (e.g., 0/1 Knapsack). In contrast, a Greedy algorithm makes the locally optimal choice at each step without reconsidering past decisions, which is faster but only yields a global optimum when the greedy-choice property holds (e.g., Fractional Knapsack).',
        gradingPoints: [
          { concept: 'dynamic programming memoizes overlapping subproblems', weight: 0.5, aliases: ['memoization', 'tabulation', 'subproblem overlap'] },
          { concept: 'greedy makes irrevocable locally optimal choices', weight: 0.5, aliases: ['local optimum', 'greedy choice property'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the working principle and operations of a Binary Min-Heap.',
        options: [],
        correctAnswer: 'A Binary Min-Heap is a complete binary tree where the key at any parent node is less than or equal to the keys of its children, ensuring the minimum element is always at the root. Key operations include insert (adding at the end and bubbling up / heapifying up in O(log n)) and extract-min (removing root, moving last element to root, and sifting down in O(log n)).',
        gradingPoints: [
          { concept: 'parent node key is less than or equal to children', weight: 0.5, aliases: ['min-heap property', 'minimum element at root'] },
          { concept: 'insert and extract-min operate in o(log n) via heapify', weight: 0.5, aliases: ['heapify', 'sift up and sift down', 'o(log n)'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Topological Sorting in a Directed Acyclic Graph (DAG) and what are its applications?',
        options: [],
        correctAnswer: 'Topological sort produces a linear ordering of vertices in a DAG such that for every directed edge (u, v), vertex u comes before vertex v. It can be computed in O(V + E) using DFS or Kahn\'s algorithm (in-degree reduction). Common applications include task scheduling, build systems dependency resolution, and course prerequisite planning.',
        gradingPoints: [
          { concept: 'linear ordering where edge source precedes target', weight: 0.5, aliases: ['precedence ordering', 'linear ordering of DAG'] },
          { concept: 'applications include scheduling and dependency resolution', weight: 0.5, aliases: ['task scheduling', 'prerequisite resolution', 'build systems'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Kruskal\'s and Prim\'s algorithms for finding the Minimum Spanning Tree (MST) of a graph.',
        options: [],
        correctAnswer: 'Kruskal\'s algorithm is edge-centric; it sorts all edges in non-decreasing weight and adds them one by one to the forest using a Disjoint Set Union (DSU / Union-Find) to prevent cycles in O(E log E). Prim\'s algorithm is vertex-centric; it starts from an arbitrary root and grows a single tree by greedily adding the minimum-weight cut edge connecting an unvisited vertex using a priority queue in O(E log V).',
        gradingPoints: [
          { concept: 'kruskal sorts edges and uses union-find', weight: 0.5, aliases: ['edge based', 'disjoint set', 'sort edges'] },
          { concept: 'prim grows a single connected tree from a vertex', weight: 0.5, aliases: ['vertex based', 'priority queue cut edge'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain open addressing collision resolution techniques in hash tables (Linear Probing, Quadratic Probing, Double Hashing).',
        options: [],
        correctAnswer: 'In open addressing, all elements are stored directly within the hash table array. If a collision occurs at index h(k): Linear Probing inspects sequential slots (h(k) + i) % m, which suffers from primary clustering; Quadratic Probing inspects slots with quadratic intervals (h(k) + c1*i + c2*i^2) % m to eliminate primary clustering; Double Hashing uses a second hash function (h(k) + i * h2(k)) % m, offering the most uniform distribution.',
        gradingPoints: [
          { concept: 'linear probing checks consecutive slots causing primary clustering', weight: 0.4, aliases: ['sequential probe', 'primary clustering'] },
          { concept: 'quadratic probing checks quadratic offsets', weight: 0.3, aliases: ['quadratic intervals', 'avoids primary clustering'] },
          { concept: 'double hashing uses second hash function', weight: 0.3, aliases: ['secondary hash', 'uniform distribution'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a B-Tree and why is it preferred over standard binary search trees for disk-based database index storage?',
        options: [],
        correctAnswer: 'A B-Tree is a self-balancing multiway search tree where internal nodes can have a large number of keys and child pointers (high branching factor / fanout). It is preferred for disk storage because standard binary trees have large depth resulting in excessive slow disk I/O seeks; the high branching factor of B-trees drastically minimizes tree height, allowing retrieval in very few disk block reads.',
        gradingPoints: [
          { concept: 'multiway search tree with high branching factor', weight: 0.5, aliases: ['high fanout', 'multiple keys per node'] },
          { concept: 'minimizes disk I/O seeks by reducing tree height', weight: 0.5, aliases: ['reduces disk reads', 'disk block access optimization'] },
        ],
      },
    ],
  },

  // 2. CSC 303: Object-Oriented Programming
  {
    code: 'CSC 303',
    title: 'Object-Oriented Programming',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the four core principles of Object-Oriented Programming: Encapsulation, Abstraction, Inheritance, and Polymorphism.',
        options: [],
        correctAnswer: 'Encapsulation bundles data and methods while restricting direct access via access modifiers. Abstraction exposes essential interfaces while hiding implementation complexity. Inheritance allows a child class to acquire fields and methods of a parent class promoting code reuse. Polymorphism allows entities to take multiple forms through method overloading and overriding.',
        gradingPoints: [
          { concept: 'encapsulation hides internal data', weight: 0.25, aliases: ['data bundling', 'access modifiers'] },
          { concept: 'abstraction exposes essential features', weight: 0.25, aliases: ['hiding complexity', 'abstract interface'] },
          { concept: 'inheritance enables code reuse across hierarchy', weight: 0.25, aliases: ['subclassing', 'extends'] },
          { concept: 'polymorphism enables multiple behaviors via overriding/overloading', weight: 0.25, aliases: ['multiple forms', 'dynamic dispatch'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between an Abstract Class and an Interface in Java and C++.',
        options: [],
        correctAnswer: 'An abstract class can contain state (instance variables), constructors, and fully implemented methods alongside abstract methods, and a class can extend only one abstract class (single inheritance). An interface historically defines purely abstract method signatures (contracts) and constants, and a class can implement multiple interfaces (multiple inheritance of type).',
        gradingPoints: [
          { concept: 'abstract class supports instance state and partial implementation', weight: 0.5, aliases: ['constructors and fields', 'single inheritance'] },
          { concept: 'interface defines method contracts and supports multiple implementation', weight: 0.5, aliases: ['implements multiple', 'pure contract'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Compile-Time (Static) Polymorphism and Runtime (Dynamic) Polymorphism.',
        options: [],
        correctAnswer: 'Compile-time polymorphism is achieved via method overloading and operator overloading, where the compiler resolves the method call based on argument types and count. Runtime polymorphism is achieved via method overriding with virtual methods, where the specific method implementation executed is resolved dynamically at runtime based on the actual object instance using a virtual method table (vtable).',
        gradingPoints: [
          { concept: 'compile-time polymorphism uses method overloading', weight: 0.5, aliases: ['static binding', 'early binding', 'overloading'] },
          { concept: 'runtime polymorphism uses method overriding and dynamic dispatch', weight: 0.5, aliases: ['dynamic binding', 'late binding', 'vtable', 'overriding'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the SOLID design principles in object-oriented software engineering.',
        options: [],
        correctAnswer: 'SOLID stands for: Single Responsibility Principle (a class should have only one reason to change), Open/Closed Principle (open for extension, closed for modification), Liskov Substitution Principle (subtypes must be substitutable for base types), Interface Segregation Principle (clients shouldn\'t depend on unused interfaces), and Dependency Inversion Principle (depend upon abstractions, not concretions).',
        gradingPoints: [
          { concept: 'Single Responsibility and Open/Closed', weight: 0.4, aliases: ['SRP', 'OCP'] },
          { concept: 'Liskov Substitution and Interface Segregation', weight: 0.4, aliases: ['LSP', 'ISP'] },
          { concept: 'Dependency Inversion', weight: 0.2, aliases: ['DIP', 'depend on abstractions'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Singleton design pattern, its implementation, and potential pitfalls in multithreaded environments.',
        options: [],
        correctAnswer: 'The Singleton pattern ensures a class has only one instance and provides a global access point to it. It is implemented with a private constructor, a static private instance variable, and a public static getInstance() method. In multithreaded environments, race conditions can instantiate multiple copies unless thread synchronization or Double-Checked Locking with a volatile variable is applied.',
        gradingPoints: [
          { concept: 'private constructor with static access method', weight: 0.5, aliases: ['single instance guarantee', 'getInstance'] },
          { concept: 'requires synchronization or double-checked locking for thread safety', weight: 0.5, aliases: ['race condition', 'volatile double-checked locking'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Diamond Problem in multiple inheritance and how languages like C++ and Java resolve it.',
        options: [],
        correctAnswer: 'The Diamond Problem occurs when class D inherits from classes B and C, both of which inherit from class A; if B and C override a method from A, ambiguity arises as to which method D inherits. C++ resolves this using virtual base classes (`virtual public A`). Java prevents it by disallowing multiple class inheritance, allowing multiple interface implementation instead where conflicts must be explicitly resolved.',
        gradingPoints: [
          { concept: 'ambiguity arising from two parent classes inheriting from common base', weight: 0.5, aliases: ['ambiguous method resolution', 'diamond shape hierarchy'] },
          { concept: 'c++ uses virtual inheritance while java uses interfaces', weight: 0.5, aliases: ['virtual base class', 'disallows multiple class inheritance'] },
        ],
      },
      {
        type: 'theory',
        question: 'Why is Composition favored over Inheritance ("Favor Composition over Inheritance") in OOP design?',
        options: [],
        correctAnswer: 'Inheritance creates a tight coupling between parent and child classes (white-box reuse), where internal changes in the superclass can inadvertently break subclass functionality (fragile base class problem). Composition (has-a relationship) provides loose coupling (black-box reuse), allowing behaviors to be changed dynamically at runtime by swapping encapsulated component objects.',
        gradingPoints: [
          { concept: 'inheritance causes tight coupling and fragile base classes', weight: 0.5, aliases: ['white-box reuse', 'is-a rigidity'] },
          { concept: 'composition provides loose coupling and dynamic runtime flexibility', weight: 0.5, aliases: ['has-a relationship', 'black-box reuse', 'swappable components'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Automatic Garbage Collection in managed environments (such as the JVM) and mark-and-sweep mechanism.',
        options: [],
        correctAnswer: 'Garbage Collection automatically deallocates heap memory occupied by unreachable objects, eliminating memory leaks and dangling pointers. In Mark-and-Sweep, the collector traverses object reference graphs starting from root references (GC Roots) marking all reachable objects, and in the sweep phase, it reclaims the memory occupied by unmarked unreachable objects.',
        gradingPoints: [
          { concept: 'reclaims memory of unreachable objects automatically', weight: 0.5, aliases: ['heap memory management', 'prevents memory leaks'] },
          { concept: 'mark phase identifies reachable objects from roots then sweeps unreachable', weight: 0.5, aliases: ['gc roots', 'mark and sweep algorithm'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Exception Handling flow: try, catch, finally, and the propagation of checked vs unchecked exceptions.',
        options: [],
        correctAnswer: 'Code that might fail is enclosed in a try block; if an error occurs, an exception object is thrown and caught by a matching catch block. The finally block always executes for cleanup. Checked exceptions (compile-time checked) must be caught or declared in the method throws clause. Unchecked exceptions (runtime exceptions) occur during program execution and do not enforce mandatory handling.',
        gradingPoints: [
          { concept: 'try-catch handles errors and finally executes cleanup', weight: 0.5, aliases: ['exception handling flow', 'cleanup block'] },
          { concept: 'checked exceptions require throws or handling while unchecked do not', weight: 0.5, aliases: ['compile-time vs runtime exceptions', 'throws clause'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Factory Method design pattern and its advantages over direct object instantiation.',
        options: [],
        correctAnswer: 'The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which specific class to instantiate. Its advantages include decoupling client code from concrete product classes, adhering to the Open/Closed Principle, and centralizing complex object initialization logic.',
        gradingPoints: [
          { concept: 'delegates instantiation to subclasses via factory interface', weight: 0.5, aliases: ['object creation interface', 'factory method'] },
          { concept: 'decouples client from concrete classes and supports open/closed principle', weight: 0.5, aliases: ['loose coupling', 'extensibility'] },
        ],
      },
    ],
  },

  // 3. CSC 305: Database Management Systems
  {
    code: 'CSC 305',
    title: 'Database Management Systems',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the ACID properties of database transactions and why they are critical for database reliability.',
        options: [],
        correctAnswer: 'ACID ensures transaction reliability: Atomicity (all operations complete successfully or the entire transaction is rolled back); Consistency (the database transitions from one valid state to another satisfying all constraints); Isolation (concurrent transactions execute independently without interference); and Durability (committed changes persist permanently even through system crashes).',
        gradingPoints: [
          { concept: 'Atomicity and Consistency', weight: 0.5, aliases: ['all or nothing', 'valid state constraints'] },
          { concept: 'Isolation and Durability', weight: 0.5, aliases: ['concurrency independence', 'persistent committed data'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the progression of Database Normalization from 1NF to BCNF (Boyce-Codd Normal Form).',
        options: [],
        correctAnswer: '1NF eliminates repeating groups and ensures attribute atomicity. 2NF requires 1NF and removes partial dependencies (non-key attributes depend on the entire candidate key). 3NF requires 2NF and removes transitive dependencies. BCNF is a stricter version of 3NF where for every functional dependency X -> Y, X must be a superkey.',
        gradingPoints: [
          { concept: '1NF atomic attributes and 2NF removes partial dependency', weight: 0.5, aliases: ['atomic values', 'no partial dependencies'] },
          { concept: '3NF removes transitive dependency and BCNF requires superkey determinants', weight: 0.5, aliases: ['no transitive dependencies', 'determinant is superkey'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the difference between Clustered and Non-Clustered Indexes in relational databases.',
        options: [],
        correctAnswer: 'A Clustered Index physically reorders the actual data rows of the table on disk to match the index order; therefore, only one clustered index can exist per table (usually on the primary key). A Non-Clustered Index is a separate data structure containing sorted index keys with row locators (pointers) pointing to the physical data rows, allowing multiple non-clustered indexes on a table.',
        gradingPoints: [
          { concept: 'clustered index determines physical storage order on disk', weight: 0.5, aliases: ['only one per table', 'physical row sorting'] },
          { concept: 'non-clustered index uses separate pointer structure', weight: 0.5, aliases: ['multiple indexes', 'row locators', 'pointers to data'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Two-Phase Locking (2PL) protocol and how it guarantees serializability in concurrent transactions.',
        options: [],
        correctAnswer: 'Two-Phase Locking guarantees conflict serializability through two phases: the Growing Phase (a transaction acquires shared or exclusive locks but cannot release any) and the Shrinking Phase (locks are released but no new locks can be acquired). Once a lock is released, the transaction can never obtain another lock, preventing dirty reads and conflicting interleaving.',
        gradingPoints: [
          { concept: 'growing phase acquires locks without releasing', weight: 0.5, aliases: ['expanding phase', 'lock acquisition'] },
          { concept: 'shrinking phase releases locks without acquiring new ones', weight: 0.5, aliases: ['releasing phase', 'guarantees serializability'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Relational Databases (RDBMS) with NoSQL databases across schema, scaling, and query model.',
        options: [],
        correctAnswer: 'RDBMS (e.g., PostgreSQL) uses structured tabular schemas, enforces ACID properties, scales vertically, and queries data via declarative SQL. NoSQL databases (e.g., MongoDB, Cassandra) support flexible dynamic schemas (document, key-value, column, graph), prioritize BASE properties and horizontal scaling across distributed commodity servers, and use API-based query methods.',
        gradingPoints: [
          { concept: 'RDBMS uses structured schemas, SQL, and vertical scaling', weight: 0.5, aliases: ['tabular schema', 'acid compliant', 'sql'] },
          { concept: 'NoSQL uses flexible schemas, horizontal scaling, and distributed architecture', weight: 0.5, aliases: ['document/key-value', 'horizontal partitioning', 'base model'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Database View and what are the advantages and limitations of using views?',
        options: [],
        correctAnswer: 'A View is a virtual table defined by a stored SQL SELECT query that dynamically presents data from underlying tables without storing duplicate data physically. Advantages include simplified complex queries, access control / security (hiding sensitive columns), and data abstraction. Limitations include performance overhead on complex joins and restrictions on updating multi-table views.',
        gradingPoints: [
          { concept: 'virtual table based on SQL query', weight: 0.4, aliases: ['stored select query', 'virtual table'] },
          { concept: 'advantages include security and query simplification', weight: 0.3, aliases: ['access control', 'abstraction'] },
          { concept: 'limitations include performance overhead and update restrictions', weight: 0.3, aliases: ['read-only restrictions', 'query overhead'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Deadlock detection and resolution strategies in Database Management Systems.',
        options: [],
        correctAnswer: 'Deadlock occurs when two or more transactions hold locks on resources while waiting for locks held by each other. DBMSs detect deadlocks using a Wait-For Graph (WFG) where a cycle indicates a deadlock. Resolution involves selecting a victim transaction based on cost/progress, rolling it back to release its locks, and retrying it.',
        gradingPoints: [
          { concept: 'detection via cycle detection in wait-for graph', weight: 0.5, aliases: ['WFG cycle', 'wait-for graph'] },
          { concept: 'resolution by selecting victim transaction and rolling back', weight: 0.5, aliases: ['victim selection', 'transaction rollback'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is an Entity-Relationship (ER) model and how are 1:1, 1:N, and M:N relationships mapped to relational tables?',
        options: [],
        correctAnswer: 'The ER model conceptualizes data as entities, attributes, and relationships. In relational mapping: a 1:1 relationship places the primary key of one table as a unique foreign key in the other; a 1:N relationship places the primary key of the "1" side as a foreign key in the "N" table; and an M:N relationship requires a junction (bridge/associative) table containing composite foreign keys referencing both entities.',
        gradingPoints: [
          { concept: '1:1 and 1:N mapped via foreign keys in child table', weight: 0.5, aliases: ['foreign key placement', '1 to N mapping'] },
          { concept: 'M:N requires a junction table with composite foreign keys', weight: 0.5, aliases: ['associative table', 'bridge table', 'composite primary key'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Query Optimization and the difference between Cost-Based and Rule-Based optimizers.',
        options: [],
        correctAnswer: 'Query optimization selects the most efficient execution plan for an SQL query. A Rule-Based Optimizer (RBO) applies fixed heuristic rules (e.g., always prefer indexes over table scans) regardless of data distribution. A Cost-Based Optimizer (CBO) estimates the computational cost (disk I/O, CPU cycles, network transfer) of candidate execution plans using data distribution statistics and selects the lowest-cost plan.',
        gradingPoints: [
          { concept: 'rule-based uses fixed heuristic rules', weight: 0.5, aliases: ['heuristics', 'fixed priority rules'] },
          { concept: 'cost-based calculates estimated I/O and CPU cost using statistics', weight: 0.5, aliases: ['catalog statistics', 'lowest estimated cost'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Database Trigger and how does it differ from a Stored Procedure?',
        options: [],
        correctAnswer: 'A Trigger is a database program that automatically executes (fires) in response to specific data modification events (INSERT, UPDATE, DELETE) on a table. A Stored Procedure is an explicitly compiled block of code invoked directly by application code or user commands. Triggers cannot be called directly, accept no parameters, and cannot return values.',
        gradingPoints: [
          { concept: 'trigger executes automatically on data events', weight: 0.5, aliases: ['automatic execution', 'event driven', 'fires on insert/update'] },
          { concept: 'stored procedure is invoked explicitly and can accept parameters', weight: 0.5, aliases: ['explicit call', 'parameterized'] },
        ],
      },
    ],
  },

  // 4. CSC 307: Theory of Computation & Automata
  {
    code: 'CSC 307',
    title: 'Theory of Computation & Automata',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define a Deterministic Finite Automaton (DFA) using its formal 5-tuple specification.',
        options: [],
        correctAnswer: 'A DFA is formally defined as a 5-tuple M = (Q, Sigma, delta, q0, F) where: Q is a finite set of states; Sigma is a finite input alphabet; delta is the transition function delta: Q x Sigma -> Q; q0 in Q is the initial start state; and F subset of Q is the set of accepting/final states.',
        gradingPoints: [
          { concept: '5-tuple definition: Q, Sigma, delta, q0, F', weight: 0.6, aliases: ['formal 5-tuple', 'automata tuple'] },
          { concept: 'transition function maps state and input to exactly one state', weight: 0.4, aliases: ['deterministic transition', 'delta: Q x Sigma -> Q'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Deterministic Finite Automata (DFA) and Non-Deterministic Finite Automata (NFA) in power and structure.',
        options: [],
        correctAnswer: 'A DFA has exactly one transition for each state-symbol pair with no epsilon transitions. An NFA can have zero, one, or multiple transitions per symbol, and supports epsilon (empty string) transitions. Although NFAs are easier to design, DFAs and NFAs are computationally equivalent because any NFA can be converted into an equivalent DFA using the Subset Construction algorithm.',
        gradingPoints: [
          { concept: 'NFA supports multiple transitions and epsilon moves', weight: 0.5, aliases: ['non-deterministic choices', 'epsilon transitions'] },
          { concept: 'computationally equivalent via subset construction', weight: 0.5, aliases: ['powerset construction', 'equivalent expressive power'] },
        ],
      },
      {
        type: 'theory',
        question: 'State the Pumping Lemma for Regular Languages and describe how it is used in proofs of non-regularity.',
        options: [],
        correctAnswer: 'The Pumping Lemma states that for any regular language L, there exists a pumping length p such that any string s in L with |s| >= p can be split into s = xyz satisfying: |y| > 0, |xy| <= p, and for all i >= 0, x y^i z in L. To prove a language is non-regular, we use proof by contradiction: assume L is regular, choose a string s, and show that for all valid decompositions, pumping y produces a string outside L.',
        gradingPoints: [
          { concept: 'decomposition s = xyz with |y| > 0 and |xy| <= p', weight: 0.5, aliases: ['pumping lemma condition', 'string partition'] },
          { concept: 'proof by contradiction showing pumped string fails membership', weight: 0.5, aliases: ['contradiction proof', 'x y^i z not in L'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Chomsky Hierarchy of formal grammars and their corresponding recognizing automata.',
        options: [],
        correctAnswer: 'The Chomsky Hierarchy categorizes grammars into four levels: Type-0 (Unrestricted grammars, recognized by Turing Machines); Type-1 (Context-Sensitive grammars, recognized by Linear Bounded Automata); Type-2 (Context-Free grammars, recognized by Pushdown Automata); and Type-3 (Regular grammars, recognized by Finite Automata).',
        gradingPoints: [
          { concept: 'Type-0 Unrestricted / TM and Type-1 Context-Sensitive / LBA', weight: 0.5, aliases: ['unrestricted and linear bounded'] },
          { concept: 'Type-2 Context-Free / PDA and Type-3 Regular / FA', weight: 0.5, aliases: ['context free pushdown', 'regular finite automata'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Pushdown Automaton (PDA) and what distinguishes deterministic from non-deterministic PDAs?',
        options: [],
        correctAnswer: 'A PDA is a finite automaton augmented with an external LIFO stack storage mechanism, recognizing Context-Free Languages. Unlike finite automata, Non-Deterministic PDAs (NPDA) are strictly more expressive than Deterministic PDAs (DPDA); NPDAs recognize all context-free languages, whereas DPDAs only recognize deterministic context-free languages (DCFLs).',
        gradingPoints: [
          { concept: 'finite automaton augmented with a stack', weight: 0.5, aliases: ['stack storage', 'lifo memory'] },
          { concept: 'NPDA is strictly more powerful than DPDA', weight: 0.5, aliases: ['DPDA less expressive', 'non-determinism adds power'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the components and formal operation of a standard Turing Machine.',
        options: [],
        correctAnswer: 'A Turing Machine consists of an infinite memory tape divided into discrete cells, a read/write tape head, a finite set of states, and a transition function delta(q, a) = (q\', b, D) where it reads symbol a in state q, writes symbol b, transitions to state q\', and moves the head Left or Right. It serves as the mathematical foundation of general computability.',
        gradingPoints: [
          { concept: 'infinite tape with read/write head and state transitions', weight: 0.5, aliases: ['tape cells', 'read write head'] },
          { concept: 'transition defines next state, write symbol, and head movement', weight: 0.5, aliases: ['delta function', 'move left or right'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the Halting Problem and how does Alan Turing prove it is undecidable?',
        options: [],
        correctAnswer: 'The Halting Problem asks whether a general algorithm exists that can determine whether an arbitrary program P with input w will halt or run forever. Turing proved it undecidable using Cantor\'s diagonalization argument: assuming a halting decider H exists, construct an adversarial program D that calls H(D, D) and halts if H says it loops, and loops if H says it halts, creating an inescapable logical contradiction.',
        gradingPoints: [
          { concept: 'cannot determine if arbitrary program halts on given input', weight: 0.5, aliases: ['halting determination', 'undecidable problem'] },
          { concept: 'proof by contradiction using diagonalization and adversarial machine', weight: 0.5, aliases: ['diagonalization', 'inverted behavior contradiction'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Complexity Classes P, NP, NP-Complete, and NP-Hard.',
        options: [],
        correctAnswer: 'P is the class of decision problems solvable in polynomial time by a deterministic Turing machine. NP is the class of problems verifiable in polynomial time by a deterministic machine (or solvable in polynomial time by a non-deterministic machine). NP-Hard problems are at least as hard as any problem in NP via polynomial-time reduction. NP-Complete problems are both in NP and NP-Hard.',
        gradingPoints: [
          { concept: 'P is polynomial solvable and NP is polynomial verifiable', weight: 0.5, aliases: ['polynomial time solvable', 'verifiable in polynomial time'] },
          { concept: 'NP-Complete is in NP and NP-Hard', weight: 0.5, aliases: ['reduction from NP', 'hardest problems in NP'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain what ambiguity in a Context-Free Grammar (CFG) means and how it impacts compiler design.',
        options: [],
        correctAnswer: 'A CFG is ambiguous if there exists at least one string in its language that has two or more distinct leftmost derivations (or two distinct parse trees). In compiler design, ambiguity is hazardous because parse trees assign semantic meaning (such as operator precedence and associativity); an ambiguous grammar produces uncertain program execution semantics.',
        gradingPoints: [
          { concept: 'string yields multiple distinct parse trees', weight: 0.5, aliases: ['multiple leftmost derivations', 'ambiguous grammar'] },
          { concept: 'causes uncertain semantics and operator precedence issues in compilers', weight: 0.5, aliases: ['semantic confusion', 'precedence ambiguity'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the Church-Turing Thesis and what is its significance in theoretical computer science?',
        options: [],
        correctAnswer: 'The Church-Turing Thesis posits that any function that can be computed by an intuitive effective method or human calculation can be computed by a Turing Machine (or Lambda Calculus). It establishes that the Turing Machine represents the absolute upper limit of algorithmic computational capability in physical reality.',
        gradingPoints: [
          { concept: 'any effectively computable function is computable by a Turing Machine', weight: 0.6, aliases: ['effective computability', 'lambda calculus equivalence'] },
          { concept: 'defines theoretical limits of computational capability', weight: 0.4, aliases: ['boundary of computability', 'universal computation'] },
        ],
      },
    ],
  },

  // 5. CSC 309: Compiler Construction
  {
    code: 'CSC 309',
    title: 'Compiler Construction',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'List and describe the six major phases of a modern optimizing compiler.',
        options: [],
        correctAnswer: 'The six phases are: Lexical Analysis (converts character stream into tokens); Syntax Analysis (builds parse tree checking grammar); Semantic Analysis (type checking and context rules); Intermediate Code Generation (creates machine-independent IR); Code Optimization (improves execution speed and memory efficiency); and Target Code Generation (emits target machine/assembly instructions).',
        gradingPoints: [
          { concept: 'Lexical, Syntax, and Semantic analysis (Front-end)', weight: 0.5, aliases: ['tokenizing', 'parsing', 'type checking'] },
          { concept: 'IR generation, Optimization, and Code generation (Back-end)', weight: 0.5, aliases: ['intermediate code', 'optimization', 'target code'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Lexical Analysis and the distinction between Tokens, Patterns, and Lexemes.',
        options: [],
        correctAnswer: 'Lexical Analysis scans raw source code to produce tokens while stripping whitespace and comments. A Lexeme is the actual character sequence in the source code (e.g., "count"). A Pattern is the regular expression rule describing the lexeme structure. A Token is an abstract pair consisting of a token name and optional attribute value (e.g., <IDENTIFIER, pointer_to_symbol_table>).',
        gradingPoints: [
          { concept: 'Lexeme is concrete string, Pattern is regex rule, Token is abstract pair', weight: 0.7, aliases: ['token pattern lexeme distinction'] },
          { concept: 'scans characters, strips whitespace, feeds tokens to parser', weight: 0.3, aliases: ['lexical scanning'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Top-Down LL(1) Parsing with Bottom-Up LR(1) Parsing.',
        options: [],
        correctAnswer: 'LL(1) parsing builds the parse tree from top to bottom (root to leaves) using leftmost derivation with 1 lookahead token; it cannot handle left recursion and requires refactoring grammars. LR(1) parsing builds the parse tree from bottom to top (leaves to root) using rightmost derivation in reverse via Shift-Reduce operations; it handles a broader class of grammars including left recursion.',
        gradingPoints: [
          { concept: 'LL(1) is top-down using leftmost derivation and cannot handle left recursion', weight: 0.5, aliases: ['recursive descent', 'predictive parser'] },
          { concept: 'LR(1) is bottom-up using shift-reduce and handles broader grammars', weight: 0.5, aliases: ['shift reduce', 'bottom up parsing'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Left Recursion in a context-free grammar and how is immediate left recursion eliminated?',
        options: [],
        correctAnswer: 'Left recursion occurs when a non-terminal derives a sentential form beginning with itself (A -> A alpha | beta), which causes infinite recursion in top-down parsers. Immediate left recursion is eliminated by introducing a new non-terminal A\' and rewriting the productions as: A -> beta A\' and A\' -> alpha A\' | epsilon.',
        gradingPoints: [
          { concept: 'production A -> A alpha causes infinite loop in top-down parsers', weight: 0.5, aliases: ['left recursive grammar', 'top-down failure'] },
          { concept: 'eliminated using transformation A -> beta A\' and A\' -> alpha A\' | epsilon', weight: 0.5, aliases: ['grammar transformation', 'introducing new non-terminal'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the purpose and data structures used in Compiler Symbol Table Management.',
        options: [],
        correctAnswer: 'The Symbol Table records identifiers (variable names, functions, classes) along with their attributes (data type, scope, memory offset, parameter list) to support semantic analysis and code generation. It is implemented using hash tables organized in a scoped linked list or tree of hash tables to support nested lexical scoping.',
        gradingPoints: [
          { concept: 'stores identifier names and attributes like type and scope', weight: 0.5, aliases: ['identifier metadata', 'type and memory offset'] },
          { concept: 'supports nested scopes via chain of hash tables', weight: 0.5, aliases: ['scoped symbol table', 'hash table hierarchy'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Semantic Analysis tasks, focusing on Type Checking and Type Coercion.',
        options: [],
        correctAnswer: 'Semantic analysis verifies that source code adheres to language semantic rules that syntax analysis cannot check. Type Checking verifies that operators receive compatible operands. Type Coercion (implicit casting) automatically converts an operand from one type to a compatible wider type (e.g., int to float) according to language promotion rules, or reports a compile error if types are incompatible.',
        gradingPoints: [
          { concept: 'verifies semantic consistency and operand compatibility', weight: 0.5, aliases: ['type checking', 'semantic rules'] },
          { concept: 'type coercion performs implicit conversion between compatible types', weight: 0.5, aliases: ['implicit casting', 'widening conversion'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Three-Address Code (3AC) and what are its common representations (Quadruples, Triples, Indirect Triples)?',
        options: [],
        correctAnswer: 'Three-Address Code is an intermediate representation where each instruction has at most one operator and at most three operand addresses (e.g., x = y op z). Quadruples store instructions as four fields (op, arg1, arg2, result). Triples avoid explicit temporary names by referencing instruction array positions (op, arg1, arg2). Indirect Triples use pointers to a triples array to facilitate easy code reordering during optimization.',
        gradingPoints: [
          { concept: 'intermediate representation with at most one operator and three addresses', weight: 0.4, aliases: ['3AC', 'linear IR'] },
          { concept: 'Quadruples use explicit result, Triples reference instruction indices', weight: 0.6, aliases: ['quadruples vs triples', 'indirect triples'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Machine-Independent Code Optimizations: Constant Folding, Common Subexpression Elimination, and Loop Invariant Code Motion.',
        options: [],
        correctAnswer: 'Constant Folding evaluates constant expressions at compile-time (e.g., 2 + 3 replaced by 5). Common Subexpression Elimination identifies duplicate calculations and replaces subsequent occurrences with the previously computed value. Loop Invariant Code Motion (hoisting) identifies statements inside a loop whose operands do not change across iterations and moves them outside the loop.',
        gradingPoints: [
          { concept: 'constant folding evaluates constants at compile time', weight: 0.33, aliases: ['compile-time constant evaluation'] },
          { concept: 'common subexpression elimination reuses computed values', weight: 0.33, aliases: ['avoids duplicate computation'] },
          { concept: 'loop invariant motion hoists unchanging expressions out of loops', weight: 0.34, aliases: ['code hoisting', 'loop optimization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Register Allocation using Graph Coloring (Chaitin\'s Algorithm).',
        options: [],
        correctAnswer: 'Register allocation assigns an unbounded set of virtual variables to a finite number of physical CPU registers k. The compiler constructs an Interference Graph where nodes represent variable live ranges and edges represent variables that are live simultaneously. If the graph can be colored with k colors such that no adjacent nodes share the same color, each color maps to a physical register; otherwise, variables are spilled to memory.',
        gradingPoints: [
          { concept: 'interference graph where edges represent simultaneous liveness', weight: 0.5, aliases: ['variable live ranges', 'register interference'] },
          { concept: 'colors correspond to registers, uncolorable nodes are spilled to memory', weight: 0.5, aliases: ['k-coloring', 'register spilling'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between a Just-In-Time (JIT) compiler and an Ahead-Of-Time (AOT) compiler.',
        options: [],
        correctAnswer: 'An AOT compiler compiles high-level source code completely into native machine code before execution, resulting in fast startup and predictable runtime without runtime compilation overhead (e.g., C, Rust). A JIT compiler compiles intermediate bytecode into native machine code dynamically at runtime based on profiling hot spots, allowing adaptive optimization at the cost of initial startup latency and memory overhead (e.g., Java JVM, V8).',
        gradingPoints: [
          { concept: 'AOT compiles to native binary prior to execution', weight: 0.5, aliases: ['ahead of time', 'fast startup', 'no runtime compilation'] },
          { concept: 'JIT translates bytecode during execution using dynamic profiling', weight: 0.5, aliases: ['just in time', 'runtime hotspot optimization'] },
        ],
      },
    ],
  },

  // 6. CSC 311: Operating Systems
  {
    code: 'CSC 311',
    title: 'Operating Systems',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the difference between a Process and a Thread and describe the contents of a Process Control Block (PCB).',
        options: [],
        correctAnswer: 'A Process is an independent executing program with its own dedicated virtual memory space, file handles, and resources. A Thread is a lightweight execution unit within a process that shares the parent process\'s address space and heap but maintains its own program counter, registers, and stack. The PCB stores process state, process ID, program counter, CPU registers, scheduling priority, and I/O status.',
        gradingPoints: [
          { concept: 'process has isolated memory space while threads share address space', weight: 0.5, aliases: ['thread is lightweight process', 'shared heap and isolated stack'] },
          { concept: 'PCB stores state, PID, registers, program counter, and memory limits', weight: 0.5, aliases: ['process control block metadata'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Preemptive and Non-Preemptive CPU Scheduling algorithms (FCFS, SJF, Round Robin).',
        options: [],
        correctAnswer: 'Non-preemptive scheduling (e.g., FCFS) allows a process to retain the CPU until it terminates or enters a wait state, which can cause the convoy effect. Preemptive scheduling allows the OS to interrupt a running process when a higher-priority task arrives (Preemptive SJF / SRTF) or when its time quantum expires (Round Robin), ensuring fair responsiveness in interactive time-sharing systems.',
        gradingPoints: [
          { concept: 'non-preemptive cannot be interrupted while preemptive can', weight: 0.5, aliases: ['process interruption', 'time quantum slicing'] },
          { concept: 'FCFS vs SJF vs Round Robin trade-offs', weight: 0.5, aliases: ['convoy effect', 'time slicing fairness'] },
        ],
      },
      {
        type: 'theory',
        question: 'State the four Coffman conditions necessary for a Deadlock to occur.',
        options: [],
        correctAnswer: 'The four Coffman conditions are: 1. Mutual Exclusion (at least one resource is non-shareable); 2. Hold and Wait (a process holds resources while requesting additional ones); 3. No Preemption (resources cannot be forcibly taken from a process); and 4. Circular Wait (a closed chain of processes exists where each process waits for a resource held by the next).',
        gradingPoints: [
          { concept: 'Mutual Exclusion and Hold and Wait', weight: 0.5, aliases: ['non-shareable resources', 'holding while waiting'] },
          { concept: 'No Preemption and Circular Wait', weight: 0.5, aliases: ['no resource confiscation', 'circular chain of dependency'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Banker\'s Algorithm for Deadlock Avoidance and the concept of a Safe State.',
        options: [],
        correctAnswer: 'The Banker\'s Algorithm avoids deadlocks by simulating resource allocations before granting requests. A Safe State exists if there is at least one safe execution sequence of processes where every process can obtain its maximum needed resources, finish execution, and release resources without creating a deadlock. If granting a request leads to an unsafe state, the requesting process is forced to wait.',
        gradingPoints: [
          { concept: 'simulates allocation to verify safe sequence exists', weight: 0.5, aliases: ['safe execution sequence', 'maximum claim matrix'] },
          { concept: 'denies or delays requests that lead to unsafe states', weight: 0.5, aliases: ['unsafe state avoidance', 'avoids deadlock'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Paging in Virtual Memory, including Page Tables and the Translation Lookaside Buffer (TLB).',
        options: [],
        correctAnswer: 'Paging divides virtual memory into fixed-size Pages and physical RAM into Frames. A Page Table maps virtual page numbers to physical frame numbers. The TLB is a fast hardware associative cache located inside the CPU memory management unit (MMU) that stores recent virtual-to-physical address translations, drastically reducing memory access latency by avoiding two-step RAM lookups.',
        gradingPoints: [
          { concept: 'divides memory into fixed pages and frames via page table', weight: 0.5, aliases: ['virtual page to physical frame', 'page table mapping'] },
          { concept: 'TLB is hardware cache for fast address translation', weight: 0.5, aliases: ['translation lookaside buffer', 'reduces memory lookups'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Page Replacement Algorithms: FIFO, LRU (Least Recently Used), and Optimal.',
        options: [],
        correctAnswer: 'When a page fault occurs and RAM is full: FIFO replaces the oldest page loaded, but can suffer from Belady\'s Anomaly (more frames causing more page faults); Optimal replaces the page that will not be used for the longest period in the future, providing the lowest possible fault rate but impossible to implement in practice; LRU replaces the page that has not been accessed for the longest time, closely approximating Optimal.',
        gradingPoints: [
          { concept: 'FIFO replaces oldest page and can suffer from Belady anomaly', weight: 0.33, aliases: ['first in first out', 'beladys anomaly'] },
          { concept: 'Optimal replaces page unneeded for longest future time (theoretical benchmark)', weight: 0.33, aliases: ['future knowledge', 'lowest page fault rate'] },
          { concept: 'LRU replaces least recently referenced page', weight: 0.34, aliases: ['least recently used', 'practical approximation'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Thrashing in virtual memory systems, what causes it, and how does the Working Set Model resolve it?',
        options: [],
        correctAnswer: 'Thrashing occurs when a computer spends more time swapping pages between disk and RAM than executing instructions, causing CPU utilization to collapse. It occurs when total working set sizes exceed physical memory. The Working Set Model defines the set of pages actively referenced by a process during a time delta; the OS tracks this and suspends processes whose working sets cannot fit in RAM.',
        gradingPoints: [
          { concept: 'excessive paging operations collapsing CPU utilization', weight: 0.5, aliases: ['continuous page faulting', 'swapping overhead'] },
          { concept: 'working set model monitors active pages and suspends processes to free RAM', weight: 0.5, aliases: ['locality tracking', 'process suspension'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Inter-Process Communication (IPC) mechanisms: Semaphores, Mutexes, and Message Passing.',
        options: [],
        correctAnswer: 'A Mutex is a locking mechanism used to synchronize access to a critical section; only the thread that locks it can unlock it. A Semaphore is a signaling mechanism maintaining an integer counter (wait/signal operations); binary semaphores act like locks while counting semaphores control access to a pool of N resources. Message Passing allows processes to communicate and synchronize by sending and receiving messages without shared memory.',
        gradingPoints: [
          { concept: 'mutex provides mutual exclusion locking', weight: 0.33, aliases: ['critical section lock'] },
          { concept: 'semaphore uses wait/signal with integer counter', weight: 0.33, aliases: ['counting semaphore', 'signaling'] },
          { concept: 'message passing sends packets across processes without shared memory', weight: 0.34, aliases: ['send/receive primitives', 'distributed IPC'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare File System allocation methods: Contiguous, Linked, and Indexed allocation.',
        options: [],
        correctAnswer: 'Contiguous allocation stores files in adjacent disk blocks; it is fast for sequential and direct access but suffers from external fragmentation and fixed file size limits. Linked allocation stores each block as a pointer to the next block; it eliminates external fragmentation but is slow for direct access and vulnerable to lost pointers. Indexed allocation brings all block pointers into an index block (like an inode), supporting fast direct access without external fragmentation.',
        gradingPoints: [
          { concept: 'contiguous is fast but causes external fragmentation', weight: 0.33, aliases: ['sequential blocks', 'fragmentation'] },
          { concept: 'linked uses pointer chain eliminating fragmentation but slow direct access', weight: 0.33, aliases: ['block pointer list'] },
          { concept: 'indexed uses index block/inode for direct access', weight: 0.34, aliases: ['inode pointers', 'index block'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the difference between User Mode and Kernel Mode and how System Calls transition between them.',
        options: [],
        correctAnswer: 'User Mode is an unprivileged execution mode where applications cannot directly access hardware or raw memory, preventing malicious crashes. Kernel Mode is a privileged execution mode where the OS core has unrestricted access to hardware instructions and memory. When an application needs hardware services (e.g., file I/O), it triggers a software interrupt (trap/sysenter), transitioning the CPU to Kernel Mode, executing the system call handler, and switching back to User Mode.',
        gradingPoints: [
          { concept: 'user mode is unprivileged while kernel mode has direct hardware access', weight: 0.5, aliases: ['dual-mode operation', 'privileged execution'] },
          { concept: 'system call uses software interrupt/trap to switch modes', weight: 0.5, aliases: ['trap instruction', 'mode bit transition'] },
        ],
      },
    ],
  },

  // =========================================================================
  // 300 LEVEL RAIN SEMESTER
  // =========================================================================

  // 7. CSC 302: Systems Analysis & Design
  {
    code: 'CSC 302',
    title: 'Systems Analysis & Design',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Describe the core stages of the Systems Development Life Cycle (SDLC).',
        options: [],
        correctAnswer: 'The core stages of the SDLC are: 1. Planning and Preliminary Investigation (identifying system scope and feasibility); 2. Requirements Analysis (gathering and documenting user needs); 3. System Design (architecting logical and physical specifications); 4. Implementation and Coding (programming and unit testing); 5. Integration and Testing (system-wide verification); 6. Deployment (installation and data migration); and 7. Maintenance (fixing defects and supporting updates).',
        gradingPoints: [
          { concept: 'Planning, Analysis, and Design', weight: 0.5, aliases: ['feasibility', 'requirements gathering', 'system specifications'] },
          { concept: 'Implementation, Testing, Deployment, and Maintenance', weight: 0.5, aliases: ['coding', 'system testing', 'rollout and support'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Functional Requirements with Non-Functional Requirements in systems analysis.',
        options: [],
        correctAnswer: 'Functional requirements define the specific behaviors, services, functions, and data transformations the system must perform (e.g., "The system must calculate tax during checkout"). Non-functional requirements specify operational criteria, constraints, and quality attributes that govern how well the system performs (e.g., performance response time under 2 seconds, 99.9% availability, security encryption standards).',
        gradingPoints: [
          { concept: 'functional defines what the system does and specific behaviors', weight: 0.5, aliases: ['system features', 'business logic', 'inputs and outputs'] },
          { concept: 'non-functional defines quality attributes like performance, security, and scalability', weight: 0.5, aliases: ['performance', 'usability', 'reliability constraints'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Data Flow Diagrams (DFD) and describe the hierarchy between Context (Level 0), Level 1, and Level 2 diagrams.',
        options: [],
        correctAnswer: 'A DFD models how data flows through processes, data stores, and external entities. A Context Diagram (Level 0) represents the entire system as a single process interacting with external entities. A Level 1 DFD decomposes this single process into major subsystems/sub-processes and data stores. A Level 2 DFD further decomposes complex Level 1 processes into detailed sub-tasks.',
        gradingPoints: [
          { concept: 'models data flow through processes, stores, and external entities', weight: 0.4, aliases: ['data movement', 'process modeling'] },
          { concept: 'Context Level 0 represents whole system as one process', weight: 0.3, aliases: ['level 0 context diagram'] },
          { concept: 'Level 1 and 2 decompose processes into detailed subsystems', weight: 0.3, aliases: ['functional decomposition', 'sub-processes'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the TELOS framework used in evaluating project feasibility.',
        options: [],
        correctAnswer: 'TELOS evaluates feasibility across five dimensions: Technical (do technology and expertise exist to build it?); Economic (is the project financially viable with positive ROI?); Legal (does it comply with laws and regulations?); Operational (will end users and the organization adopt and support it?); and Schedule (can it be delivered within acceptable timeframes?).',
        gradingPoints: [
          { concept: 'Technical, Economic, and Legal feasibility', weight: 0.6, aliases: ['technology capability', 'cost-benefit ROI', 'regulatory compliance'] },
          { concept: 'Operational and Schedule feasibility', weight: 0.4, aliases: ['organizational adoption', 'timeline delivery'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe UML Use Case Diagrams and the difference between «include» and «extend» relationships.',
        options: [],
        correctAnswer: 'A Use Case Diagram depicts interactions between external actors and system use cases. An «include» relationship indicates mandatory behavior: the base use case unconditionally incorporates the included use case (e.g., "Checkout" includes "Validate Payment"). An «extend» relationship indicates optional or conditional behavior: the extending use case executes only under specific conditions at defined extension points (e.g., "Add Gift Wrap" extends "Checkout").',
        gradingPoints: [
          { concept: 'models actor interactions with system use cases', weight: 0.4, aliases: ['actor and use case boundary'] },
          { concept: '«include» is mandatory common functionality', weight: 0.3, aliases: ['mandatory inclusion', 'shared routine'] },
          { concept: '«extend» is optional or conditional functionality', weight: 0.3, aliases: ['conditional behavior', 'extension points'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Class Diagrams and the difference between Association, Aggregation, and Composition.',
        options: [],
        correctAnswer: 'A Class Diagram models the static structure of a system showing classes, attributes, methods, and relationships. Association represents a general structural relationship ("uses-a"). Aggregation represents a weak "has-a" relationship where child objects can exist independently of the parent (hollow diamond). Composition represents a strong "has-a" relationship with co-dependent lifecycles where child objects are destroyed if the parent is destroyed (filled diamond).',
        gradingPoints: [
          { concept: 'models static structural classes, attributes, and relationships', weight: 0.4, aliases: ['class structure', 'static model'] },
          { concept: 'aggregation is weak ownership with independent lifecycles', weight: 0.3, aliases: ['weak has-a', 'hollow diamond'] },
          { concept: 'composition is strong ownership with dependent lifecycles', weight: 0.3, aliases: ['strong has-a', 'filled diamond', 'co-dependent death'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe UML Sequence Diagrams and their essential notations (Lifelines, Messages, Activation Bars).',
        options: [],
        correctAnswer: 'A Sequence Diagram models dynamic chronological interactions between objects. Key elements include: Lifelines (vertical dashed lines representing the existence of an object over time); Activation Bars (tall rectangles on lifelines indicating when an object is actively executing); Synchronous Messages (solid line with filled arrowhead waiting for return); Asynchronous Messages (solid line with open arrowhead not waiting); and Return Messages (dashed arrows).',
        gradingPoints: [
          { concept: 'models chronological object interactions over time', weight: 0.5, aliases: ['dynamic interaction', 'message sequence'] },
          { concept: 'lifelines, activation bars, synchronous and asynchronous messages', weight: 0.5, aliases: ['lifeline notation', 'activation rectangles', 'message types'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare System Conversion strategies: Direct Cutover, Parallel Run, Pilot Study, and Phased Implementation.',
        options: [],
        correctAnswer: 'Direct Cutover abruptly shuts down the old system and activates the new system; it is cheap but has the highest risk of failure. Parallel Run runs both old and new systems concurrently until the new system is proven reliable; it has lowest risk but high operational cost. Pilot Study introduces the new system to one location/department first before company-wide rollout. Phased Implementation rolls out the system module by module in incremental stages.',
        gradingPoints: [
          { concept: 'Direct Cutover is immediate and high risk; Parallel Run is concurrent and safe', weight: 0.5, aliases: ['abrupt changeover', 'concurrent execution'] },
          { concept: 'Pilot introduces to select site; Phased introduces module by module', weight: 0.5, aliases: ['single department pilot', 'staged module rollout'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Requirements Elicitation and what are the strengths and weaknesses of Interviews vs Questionnaires?',
        options: [],
        correctAnswer: 'Requirements Elicitation is the practice of gathering system requirements from stakeholders. Interviews allow deep exploration of complex, nuanced user needs, qualitative follow-up questions, and relationship building, but are time-consuming and cover few participants. Questionnaires can gather responses from hundreds of geographically dispersed users quickly and produce quantifiable statistics, but cannot ask follow-up questions and suffer from ambiguous answers.',
        gradingPoints: [
          { concept: 'Interviews provide in-depth qualitative feedback but are time-consuming', weight: 0.5, aliases: ['deep probing', 'qualitative follow-up', 'low sample size'] },
          { concept: 'Questionnaires scale to large populations but lack flexibility for follow-up', weight: 0.5, aliases: ['wide reach', 'quantitative data', 'inflexible questions'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of User Interface (UI) prototyping in systems design and distinguish between Low-Fidelity and High-Fidelity prototypes.',
        options: [],
        correctAnswer: 'UI prototyping allows users and analysts to validate workflow concepts, layouts, and interaction patterns before costly coding begins. Low-fidelity prototypes (paper sketches, wireframes) are rapid and inexpensive to create, focusing on layout and navigation flow without visual styling. High-fidelity prototypes (interactive Figma mockups) closely mimic the final product in aesthetics, interactivity, and responsiveness, allowing realistic user testing.',
        gradingPoints: [
          { concept: 'prototyping validates user requirements and workflows before coding', weight: 0.4, aliases: ['early feedback', 'avoids rework'] },
          { concept: 'low-fidelity focuses on layout and flow cheaply', weight: 0.3, aliases: ['wireframes', 'paper sketches'] },
          { concept: 'high-fidelity mimics final visual appearance and interactions', weight: 0.3, aliases: ['interactive mockups', 'realistic styling'] },
        ],
      },
    ],
  },

  // 8. CSC 304: Software Engineering Principles
  {
    code: 'CSC 304',
    title: 'Software Engineering Principles',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Compare the Waterfall Software Development Model with Agile Scrum methodology.',
        options: [],
        correctAnswer: 'Waterfall is a sequential, plan-driven process where each phase (Requirements, Design, Coding, Testing, Deployment) must finish before the next starts; it suits projects with well-understood, stable requirements but handles changes poorly. Agile Scrum is an iterative, flexible framework that delivers working software in short sprints (1–4 weeks), actively embracing changing requirements through continuous feedback and daily stand-ups.',
        gradingPoints: [
          { concept: 'Waterfall is linear, sequential, and plan-driven', weight: 0.5, aliases: ['rigid phases', 'stable requirements', 'sequential model'] },
          { concept: 'Agile Scrum is iterative with short sprint cycles and continuous feedback', weight: 0.5, aliases: ['sprints', 'iterative delivery', 'flexible to change'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the structure and essential sections of an IEEE 830 Software Requirements Specification (SRS) document.',
        options: [],
        correctAnswer: 'An IEEE 830 SRS document includes: 1. Introduction (Purpose, Scope, Definitions, References, Overview); 2. Overall Description (Product perspective, User classes, Operating environment, Constraints, Assumptions); 3. Specific Requirements (Functional requirements, External interface requirements for hardware/software/user, and Non-functional attributes such as performance, reliability, and security).',
        gradingPoints: [
          { concept: 'Introduction and Overall Description', weight: 0.5, aliases: ['product perspective', 'scope and constraints'] },
          { concept: 'Specific Functional, Interface, and Non-functional Requirements', weight: 0.5, aliases: ['functional specifications', 'external interfaces', 'system qualities'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Black-Box Testing with White-Box Testing techniques.',
        options: [],
        correctAnswer: 'Black-box testing evaluates software functionality without knowledge of internal code structures, deriving test cases from requirements using equivalence partitioning, boundary value analysis, and decision tables. White-box testing examines internal code paths and logic structures, using techniques like statement coverage, branch coverage, and cyclomatic complexity to verify code execution paths.',
        gradingPoints: [
          { concept: 'black-box tests external behavior without internal code knowledge', weight: 0.5, aliases: ['boundary value analysis', 'equivalence partitioning', 'functional testing'] },
          { concept: 'white-box tests internal code logic and path coverage', weight: 0.5, aliases: ['code coverage', 'branch testing', 'structural testing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the V-Model of software testing and how verification levels map to validation levels.',
        options: [],
        correctAnswer: 'The V-Model maps each development verification phase on the left arm directly to a corresponding testing validation phase on the right arm: Requirements Analysis maps to Acceptance Testing; System Architecture Design maps to System Testing; High-Level Module Design maps to Integration Testing; and Detailed Component Design maps to Unit Testing.',
        gradingPoints: [
          { concept: 'V-shape pairing development phases with testing levels', weight: 0.5, aliases: ['verification and validation mapping', 'dual arm model'] },
          { concept: 'unit to detailed design, integration to architecture, acceptance to requirements', weight: 0.5, aliases: ['unit testing', 'integration testing', 'acceptance testing'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Cyclomatic Complexity in software metrics and how is it calculated from a control flow graph?',
        options: [],
        correctAnswer: 'Cyclomatic Complexity measures the number of linearly independent paths through program source code, indicating testing difficulty and maintenance risk. Using a control flow graph, it is calculated as V(G) = E - N + 2P where E is the number of edges, N is the number of nodes, and P is connected components (usually P=1). Alternatively, it equals P + 1 where P is the number of predicate/decision nodes.',
        gradingPoints: [
          { concept: 'measures number of linearly independent execution paths', weight: 0.5, aliases: ['code complexity metric', 'test path quantity'] },
          { concept: 'formula V(G) = E - N + 2P or predicate nodes + 1', weight: 0.5, aliases: ['edges minus nodes plus 2', 'decision nodes plus one'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Continuous Integration and Continuous Deployment (CI/CD) and their role in modern software delivery.',
        options: [],
        correctAnswer: 'Continuous Integration (CI) automates the regular merging of developer code changes into a shared repository, triggering automated builds and test suites to detect bugs early. Continuous Deployment (CD) automatically deploys passing builds into production environments without manual intervention, reducing release cycles from months to minutes.',
        gradingPoints: [
          { concept: 'CI automates building and testing upon code commit', weight: 0.5, aliases: ['automated tests', 'early bug detection', 'merge automation'] },
          { concept: 'CD automates deployment to production environments', weight: 0.5, aliases: ['automated release', 'pipeline delivery', 'continuous release'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Technical Debt and how does code refactoring manage it?',
        options: [],
        correctAnswer: 'Technical Debt is the implied cost of future rework caused by choosing an expedient, quick-and-dirty software solution now instead of a well-architected approach. Code Refactoring manages this debt by restructuring existing code to improve internal non-functional design, readability, and maintainability without altering its external runtime behavior.',
        gradingPoints: [
          { concept: 'technical debt is future rework cost of suboptimal shortcuts', weight: 0.5, aliases: ['architectural debt', 'cost of shortcuts'] },
          { concept: 'refactoring improves internal code structure without changing external behavior', weight: 0.5, aliases: ['code restructuring', 'improving maintainability'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Monolithic Architecture with Microservices Architecture.',
        options: [],
        correctAnswer: 'Monolithic architecture packages all application components (UI, business logic, database access) into a single unified deployment unit; it is simpler to develop initially and deploy, but difficult to scale independently. Microservices architecture decomposes an application into loosely coupled, independently deployable services communicating over network protocols (e.g., HTTP/gRPC); it supports independent scaling and polyglot tech stacks, but introduces distributed system complexity.',
        gradingPoints: [
          { concept: 'monolith is single deployable unit, simple initially but hard to scale', weight: 0.5, aliases: ['single codebase', 'tightly coupled'] },
          { concept: 'microservices are independent loosely coupled services communicating over network', weight: 0.5, aliases: ['independent deployment', 'distributed services'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Git branching strategies: Git Flow vs GitHub Flow.',
        options: [],
        correctAnswer: 'Git Flow uses multiple long-lived branches (master, develop) and supporting short-lived branches (feature, release, hotfix); it suits projects with scheduled, versioned release cycles. GitHub Flow is a lightweight, trunk-based workflow centered on a single long-lived main branch where developers create short-lived feature branches, submit Pull Requests with automated tests, and deploy directly to production upon merging.',
        gradingPoints: [
          { concept: 'Git Flow uses develop, release, and feature branches for scheduled releases', weight: 0.5, aliases: ['multi-branch workflow', 'develop and master branches'] },
          { concept: 'GitHub Flow is trunk-based with feature branches and pull requests deploying continuously', weight: 0.5, aliases: ['main branch', 'continuous deployment workflow'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Risk Management steps in software project management: Identification, Analysis, Planning, and Monitoring.',
        options: [],
        correctAnswer: 'Risk Management involves: 1. Risk Identification (discovering potential technical, project, and business threats); 2. Risk Analysis/Assessment (estimating probability and impact of each risk); 3. Risk Planning (developing avoidance, mitigation, and contingency plans); and 4. Risk Monitoring (tracking risks throughout the project lifecycle to respond proactively when triggers occur).',
        gradingPoints: [
          { concept: 'Identification and Analysis of probability and impact', weight: 0.5, aliases: ['risk discovery', 'impact assessment'] },
          { concept: 'Planning mitigation strategies and ongoing Monitoring', weight: 0.5, aliases: ['contingency planning', 'risk tracking'] },
        ],
      },
    ],
  },

  // 9. CSC 306: Computer Networks & Communications
  {
    code: 'CSC 306',
    title: 'Computer Networks & Communications',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Map the 7 layers of the OSI reference model to their functions and corresponding Protocol Data Units (PDUs).',
        options: [],
        correctAnswer: 'The layers and PDUs are: 1. Physical (bits, signal transmission); 2. Data Link (frames, MAC addressing and hop-to-hop delivery); 3. Network (packets, logical IP addressing and routing); 4. Transport (segments/datagrams, end-to-end reliability and port addressing); 5. Session (data, session management); 6. Presentation (data, encryption/compression/formatting); and 7. Application (data, network applications).',
        gradingPoints: [
          { concept: 'Physical (bits), Data Link (frames), Network (packets), Transport (segments)', weight: 0.6, aliases: ['lower four layers and PDUs'] },
          { concept: 'Session, Presentation, and Application layers handle high-level data', weight: 0.4, aliases: ['upper three layers'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the TCP Three-Way Handshake mechanism for establishing a reliable connection.',
        options: [],
        correctAnswer: 'The TCP Three-Way Handshake establishes a synchronization state before data transfer: 1. Client sends a SYN segment with an initial sequence number (ISN_c); 2. Server responds with a SYN-ACK segment acknowledging client sequence (ACK = ISN_c + 1) and providing its own sequence number (ISN_s); 3. Client replies with an ACK segment (ACK = ISN_s + 1), completing the full-duplex connection.',
        gradingPoints: [
          { concept: 'Step 1 SYN from client, Step 2 SYN-ACK from server', weight: 0.6, aliases: ['SYN and SYN-ACK sequence numbers'] },
          { concept: 'Step 3 ACK from client confirms connection establishment', weight: 0.4, aliases: ['client ACK acknowledgment'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare TCP and UDP protocols across reliability, overhead, and typical use cases.',
        options: [],
        correctAnswer: 'TCP is connection-oriented, reliable, and provides ordered delivery, error checking, flow control (sliding window), and congestion control, but incurs higher header overhead (20 bytes) and latency, suiting HTTP, email, and file transfers. UDP is connectionless, unreliable, has no flow/congestion control, but offers low overhead (8 bytes) and minimal latency, suiting real-time voice, video streaming, DNS, and gaming.',
        gradingPoints: [
          { concept: 'TCP is connection-oriented, reliable, with flow and congestion control', weight: 0.5, aliases: ['reliable delivery', 'sliding window'] },
          { concept: 'UDP is connectionless and low-latency for streaming and real-time apps', weight: 0.5, aliases: ['unreliable datagrams', 'low overhead'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain IPv4 Classless Inter-Domain Routing (CIDR) and Subnetting.',
        options: [],
        correctAnswer: 'CIDR replaces rigid classful addressing (Class A/B/C) with variable-length prefix notation (e.g., /24), allowing IP address allocation tailored to network sizes. Subnetting borrows host bits to create subnet bits, dividing a large network into smaller subnetworks to reduce broadcast domain size, improve security, and conserve IP address space.',
        gradingPoints: [
          { concept: 'CIDR uses prefix notation to allocate variable size blocks', weight: 0.5, aliases: ['prefix notation /24', 'replaces classful addressing'] },
          { concept: 'subnetting borrows host bits to partition network into smaller subnets', weight: 0.5, aliases: ['borrowing host bits', 'reducing broadcast domains'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Distance-Vector routing (RIP) with Link-State routing (OSPF).',
        options: [],
        correctAnswer: 'Distance-Vector protocols (e.g., RIP) advertise distance vectors (hop count) to immediate neighbors periodically; they are simple but suffer from slow convergence and the count-to-infinity problem. Link-State protocols (e.g., OSPF) broadcast link-state advertisements (LSAs) across the entire network, allowing each router to build a complete topological map and compute shortest paths using Dijkstra\'s algorithm, achieving rapid convergence without routing loops.',
        gradingPoints: [
          { concept: 'distance-vector sends routing tables to neighbors periodically (slow convergence)', weight: 0.5, aliases: ['hop count metric', 'bellman-ford', 'RIP'] },
          { concept: 'link-state builds complete topology map and runs Dijkstra (fast convergence)', weight: 0.5, aliases: ['OSPF', 'link state advertisements', 'dijkstra shortest path'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Domain Name System (DNS) hierarchical resolution process.',
        options: [],
        correctAnswer: 'When a client queries a domain name, the local recursive resolver checks its cache; if not found, it queries the Root DNS servers (which return TLD server IPs), then queries the Top-Level Domain (TLD) servers (e.g., .edu.ng, which return authoritative name server IPs), and finally queries the Authoritative DNS server, which returns the actual IP address mapping (A or AAAA record) back to the resolver.',
        gradingPoints: [
          { concept: 'recursive resolver queries Root, TLD, and Authoritative servers', weight: 0.6, aliases: ['root servers', 'tld servers', 'authoritative servers'] },
          { concept: 'caches intermediate and final IP address mappings', weight: 0.4, aliases: ['DNS caching', 'A record retrieval'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Address Resolution Protocol (ARP) and how it maps IP addresses to physical MAC addresses.',
        options: [],
        correctAnswer: 'ARP resolves a known logical Network layer IP address to an unknown physical Data Link MAC address on a local area network. A host broadcasts an ARP Request ("Who has IP X? Tell MAC Y"); the target device recognizes its IP and unicasts an ARP Reply with its MAC address. The querying host stores this mapping in its ARP Cache to speed up subsequent frame delivery.',
        gradingPoints: [
          { concept: 'resolves IP address to physical MAC address on LAN', weight: 0.5, aliases: ['IP to MAC mapping', 'hardware address lookup'] },
          { concept: 'broadcasts ARP Request and receives unicast ARP Reply', weight: 0.5, aliases: ['ARP broadcast and reply', 'ARP cache'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how CSMA/CA protocol operates in wireless networks (Wi-Fi) and how RTS/CTS resolves the Hidden Terminal Problem.',
        options: [],
        correctAnswer: 'In Wi-Fi, collision detection is impossible because radios cannot transmit and receive simultaneously; thus CSMA/CA avoids collisions by sensing channel idle time (DIFS) and waiting a random backoff time before sending. The Hidden Terminal Problem occurs when two stations cannot hear each other but transmit to the same access point; RTS/CTS (Request to Send / Clear to Send) reserves channel access explicitly, preventing collision.',
        gradingPoints: [
          { concept: 'senses channel idle and uses random backoff to avoid collisions', weight: 0.5, aliases: ['collision avoidance', 'random backoff'] },
          { concept: 'RTS/CTS reserves channel solving hidden node problem', weight: 0.5, aliases: ['hidden terminal problem', 'channel reservation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Transport Layer Security (TLS) handshake and how it provides confidentiality, integrity, and authentication.',
        options: [],
        correctAnswer: 'TLS encrypts web communications (HTTPS). In the TLS handshake: the client and server exchange random numbers and negotiate cipher suites; the server presents its digital X.509 certificate (authenticated by a CA); asymmetric encryption (e.g., RSA or Diffie-Hellman) securely exchanges a pre-master secret; both derive symmetric session keys for fast data encryption (confidentiality) and message authentication codes (integrity).',
        gradingPoints: [
          { concept: 'certificate verification authenticates server identity', weight: 0.4, aliases: ['X.509 certificate', 'CA authentication'] },
          { concept: 'asymmetric handshake negotiates symmetric session keys', weight: 0.6, aliases: ['diffie-hellman', 'symmetric session encryption', 'confidentiality and integrity'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Network Address Translation (NAT) and Port Address Translation (PAT).',
        options: [],
        correctAnswer: 'NAT translates private, non-routable IP addresses (e.g., 192.168.x.x) into public IP addresses as packets cross router boundaries. Port Address Translation (PAT / NAT Overload) maps multiple internal private IP addresses to a single public IP address by tracking distinct source TCP/UDP port numbers in a NAT translation table, effectively conserving IPv4 address space.',
        gradingPoints: [
          { concept: 'NAT translates private internal IPs to public routable IPs', weight: 0.5, aliases: ['private to public IP mapping'] },
          { concept: 'PAT maps multiple private IPs to one public IP using unique port numbers', weight: 0.5, aliases: ['NAT overload', 'port number tracking'] },
        ],
      },
    ],
  },

  // 10. CSC 399: Students Industrial Work Experience Scheme (SIWES)
  {
    code: 'CSC 399',
    title: 'Students Industrial Work Experience Scheme (SIWES)',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'State the primary objectives of the Students Industrial Work Experience Scheme (SIWES) in Nigerian university computer science education.',
        options: [],
        correctAnswer: 'The primary objectives of SIWES are: 1. To bridge the gap between theoretical classroom learning and practical industrial skills; 2. To expose students to real-world software engineering environments, tools, and industrial workflows; 3. To prepare students for future employment and industrial discipline; and 4. To foster industry-university partnerships for technological advancement.',
        gradingPoints: [
          { concept: 'bridges theory and industrial practice', weight: 0.5, aliases: ['classroom to workplace', 'hands-on practical experience'] },
          { concept: 'exposes students to real-world engineering environments and career readiness', weight: 0.5, aliases: ['career preparation', 'industrial workflows'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the purpose and required structure of a SIWES Logbook documentation.',
        options: [],
        correctAnswer: 'The SIWES Logbook serves as a contemporaneous legal and academic record of the student daily tasks and weekly achievements during attachment. It requires: daily recorded technical activities, equipment/technologies used, diagrams and sketches, weekly summary reviews, and signatures and appraisals from both the industry-based supervisor and institutional supervisor.',
        gradingPoints: [
          { concept: 'records daily activities, technical tasks, and tools used', weight: 0.5, aliases: ['daily recording of tasks', 'technical log'] },
          { concept: 'weekly summaries and verification signatures from supervisors', weight: 0.5, aliases: ['supervisory endorsement', 'weekly review'] },
        ],
      },
      {
        type: 'theory',
        question: 'Outline the standard chapter structure of a formal SIWES Technical Report.',
        options: [],
        correctAnswer: 'A standard SIWES report comprises: Chapter 1: Introduction and Background of SIWES and Company Profile (organogram, mission); Chapter 2: Departmental Operations and Workplace Responsibilities; Chapter 3: Detailed Technical Work, Projects Undertaken, and Tools Used; Chapter 4: Challenges Encountered and Solutions Implemented; Chapter 5: Conclusion and Recommendations.',
        gradingPoints: [
          { concept: 'Introduction, Company Profile, and Departmental placement', weight: 0.5, aliases: ['background and organogram', 'company overview'] },
          { concept: 'Technical Projects, Challenges/Solutions, and Recommendations', weight: 0.5, aliases: ['technical work experience', 'recommendations'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the roles of the Industrial Training Fund (ITF), NUC, and the University in administering SIWES.',
        options: [],
        correctAnswer: 'The ITF provides policy guidelines, approves placement employers, monitors student welfare, and pays student allowances. The National Universities Commission (NUC) sets minimum academic curriculum requirements and accredits programs. The University SIWES Directorate handles student orientation, placement facilitation, and institutional supervisory visits and grading.',
        gradingPoints: [
          { concept: 'ITF provides policy, funding, and industry supervision', weight: 0.5, aliases: ['Industrial Training Fund oversight', 'allowance disbursement'] },
          { concept: 'NUC and University manage academic guidelines, placement, and evaluation', weight: 0.5, aliases: ['institutional supervision', 'academic grading'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss workplace ethics, confidentiality, and professional code of conduct expected of an IT intern.',
        options: [],
        correctAnswer: 'An IT intern is expected to: maintain strict confidentiality of proprietary company source code, databases, and client information; adhere to intellectual property rights and non-disclosure agreements; exhibit punctuality, integrity, and respect for workplace safety; and avoid unauthorized system access or introduction of malicious scripts.',
        gradingPoints: [
          { concept: 'confidentiality of company data, code, and trade secrets', weight: 0.5, aliases: ['non-disclosure', 'data privacy', 'proprietary protection'] },
          { concept: 'professionalism, punctuality, and compliance with workplace safety', weight: 0.5, aliases: ['workplace conduct', 'integrity'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Version Control Systems (e.g., Git) and team collaboration tools observed in industry software teams.',
        options: [],
        correctAnswer: 'In industry, teams rely on Git to coordinate work among distributed developers, track granular code change histories, resolve merge conflicts, and manage branch releases (via Pull Requests and code reviews). Collaboration tools like Jira, Trello, and Slack facilitate Agile sprint tracking, task assignment, and transparent communication across engineering departments.',
        gradingPoints: [
          { concept: 'Git enables collaborative code tracking, branching, and pull requests', weight: 0.5, aliases: ['version control tracking', 'merge conflict resolution'] },
          { concept: 'tools like Jira/Slack support Agile project coordination and task visibility', weight: 0.5, aliases: ['sprint tracking', 'team communication'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe how Health, Safety, and Environment (HSE) protocols apply to IT and data center environments.',
        options: [],
        correctAnswer: 'In IT and data center facilities, HSE protocols include: proper cable management to prevent tripping hazards; ergonomic workstation setups to prevent repetitive strain injuries; electrical safety and surge grounding; clean-agent fire suppression systems (e.g., FM-200 / Novec) that protect electronics; and server room temperature/humidity climate control.',
        gradingPoints: [
          { concept: 'ergonomics, cable safety, and electrical grounding', weight: 0.5, aliases: ['workstation ergonomics', 'electrical precautions'] },
          { concept: 'fire suppression systems and server room climate control', weight: 0.5, aliases: ['gas fire suppression', 'HVAC environmental control'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the difference between on-the-job training and classroom academic learning.',
        options: [],
        correctAnswer: 'Classroom academic learning emphasizes theoretical principles, algorithmic proofs, foundational concepts, and controlled small-scale assignments. On-the-job training exposes students to incomplete specifications, production-scale legacy codebases, continuous deployment pipelines, real user bug reports, and commercial deadlines that require practical pragmatic trade-offs.',
        gradingPoints: [
          { concept: 'classroom focuses on theory, proofs, and controlled assignments', weight: 0.5, aliases: ['academic foundations', 'theoretical concepts'] },
          { concept: 'industry involves production legacy code, commercial deadlines, and practical trade-offs', weight: 0.5, aliases: ['real-world bugs', 'production scale'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are the key criteria used by university assessors during the SIWES oral defense and presentation?',
        options: [],
        correctAnswer: 'Key assessment criteria include: 1. Depth and relevance of technical work executed; 2. Student clarity and command of technical tools utilized; 3. Quality, accuracy, and adherence of the written technical report and logbook; 4. Ability to answer examiners technical questions authoritatively; and 5. Professionalism of delivery and presentation slides.',
        gradingPoints: [
          { concept: 'technical depth of work executed and tool proficiency', weight: 0.5, aliases: ['technical mastery', 'practical contribution'] },
          { concept: 'oral presentation quality, defense of questions, and report compliance', weight: 0.5, aliases: ['answering questions', 'report adherence'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss how practical SIWES experience influences the selection and implementation of a student Final Year Project.',
        options: [],
        correctAnswer: 'SIWES directly influences final year projects by exposing students to unresolved industry challenges, modern technology stacks (e.g., cloud platforms, frameworks, APIs), and real-world system architectures. This enables students to formulate project problem statements with genuine commercial relevance rather than purely abstract academic exercises.',
        gradingPoints: [
          { concept: 'identifies real industry problems and commercial use cases', weight: 0.5, aliases: ['practical problem formulation', 'industry relevance'] },
          { concept: 'provides mastery of modern frameworks and tools needed for implementation', weight: 0.5, aliases: ['technology stack proficiency', 'software architecture'] },
        ],
      },
    ],
  },
];
