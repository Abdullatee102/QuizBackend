// src/seed/faculties/fci/csc200.ts
import type { SeedCourse } from '../../types.js';

export const csc200Courses: SeedCourse[] = [
  // =========================================================================
  // 200 LEVEL HARMATTAN SEMESTER
  // =========================================================================

  // 1. CSC 201: Computer Programming I
  {
    code: 'CSC 201',
    title: 'Computer Programming I',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'Which of the following is a strongly-typed, object-oriented programming language?',
        options: ['C', 'HTML', 'Java', 'SQL'],
        correctAnswer: 'Java',
      },
      {
        type: 'cbt',
        question: 'What is encapsulation in Object-Oriented Programming (OOP)?',
        options: ['Binding data and methods operating on that data into a single class unit with controlled access', 'Inheriting attributes and methods from an existing class', 'Overriding base class methods in a subclass', 'Executing instructions concurrently across multiple threads'],
        correctAnswer: 'Binding data and methods operating on that data into a single class unit with controlled access',
      },
      {
        type: 'cbt',
        question: 'Which access modifier restricts the visibility of a class member strictly to within its own class?',
        options: ['public', 'protected', 'private', 'default/package-private'],
        correctAnswer: 'private',
      },
      {
        type: 'cbt',
        question: 'What is the return type of a class constructor in Java and C++?',
        options: ['void', 'int', 'The class type itself', 'Constructors do not have a return type'],
        correctAnswer: 'Constructors do not have a return type',
      },
      {
        type: 'cbt',
        question: 'Which primitive data type in Java is used to store a single 16-bit Unicode character?',
        options: ['byte', 'short', 'char', 'String'],
        correctAnswer: 'char',
      },
      {
        type: 'cbt',
        question: 'What happens during method overloading in a class?',
        options: ['Two methods share the same name but have different parameter lists', 'A subclass redefines a method with identical signature from its parent', 'A method calls itself recursively', 'A method is declared with the static keyword'],
        correctAnswer: 'Two methods share the same name but have different parameter lists',
      },
      {
        type: 'cbt',
        question: 'Which loop construct is guaranteed to execute its code block at least once regardless of condition?',
        options: ['for loop', 'while loop', 'do-while loop', 'nested loop'],
        correctAnswer: 'do-while loop',
      },
      {
        type: 'cbt',
        question: 'In Java, which keyword is used to allocate memory dynamically for a new object on the heap?',
        options: ['malloc', 'new', 'create', 'alloc'],
        correctAnswer: 'new',
      },
      {
        type: 'cbt',
        question: 'What is the default initial value of an uninitialized instance boolean variable in Java?',
        options: ['true', 'false', 'null', '0'],
        correctAnswer: 'false',
      },
      {
        type: 'cbt',
        question: 'Which keyword prevents a class variable from having its value modified once assigned (constant)?',
        options: ['static', 'final', 'const', 'immutable'],
        correctAnswer: 'final',
      },
    ],
  },

  // 2. CSC 203: Discrete Structures
  {
    code: 'CSC 203',
    title: 'Discrete Structures',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'If a set A has n elements, how many subsets are in its power set P(A)?',
        options: ['n^2', '2n', '2^n', 'n!'],
        correctAnswer: '2^n',
      },
      {
        type: 'cbt',
        question: 'What is a relation R on a set A called if it is reflexive, symmetric, and transitive?',
        options: ['Partial Order Relation', 'Equivalence Relation', 'Inverse Relation', 'Bijective Mapping'],
        correctAnswer: 'Equivalence Relation',
      },
      {
        type: 'cbt',
        question: 'A function f: A -> B is bijective if and only if it is:',
        options: ['Injective (one-to-one) only', 'Surjective (onto) only', 'Both injective and surjective', 'Neither injective nor surjective'],
        correctAnswer: 'Both injective and surjective',
      },
      {
        type: 'cbt',
        question: 'What is the truth value of the implication P -> Q when P is False and Q is False?',
        options: ['True', 'False', 'Undefined', 'Contradictory'],
        correctAnswer: 'True',
      },
      {
        type: 'cbt',
        question: 'According to De Morgan Laws in set theory, the complement of (A union B) is equal to:',
        options: ['A\' union B\'', 'A\' intersection B\'', '(A intersection B)\'', 'A - B'],
        correctAnswer: 'A\' intersection B\'',
      },
      {
        type: 'cbt',
        question: 'What is the Pigeonhole Principle assertion if k + 1 or more pigeons are placed into k holes?',
        options: ['Every hole contains exactly one pigeon', 'At least one hole must contain two or more pigeons', 'At least one hole is empty', 'The holes will overflow symmetrically'],
        correctAnswer: 'At least one hole must contain two or more pigeons',
      },
      {
        type: 'cbt',
        question: 'In graph theory, what is a simple connected graph that contains no cycles called?',
        options: ['Tree', 'Bipartite graph', 'Eulerian graph', 'Complete graph'],
        correctAnswer: 'Tree',
      },
      {
        type: 'cbt',
        question: 'How many edges are in a complete graph Kn with n vertices?',
        options: ['n * (n - 1)', 'n * (n - 1) / 2', '2^n - 1', 'n^2'],
        correctAnswer: 'n * (n - 1) / 2',
      },
      {
        type: 'cbt',
        question: 'What is a proposition that is always true under all possible truth value assignments called?',
        options: ['Tautology', 'Contradiction', 'Contingency', 'Fallacy'],
        correctAnswer: 'Tautology',
      },
      {
        type: 'cbt',
        question: 'In a tree with n vertices, exactly how many edges are present?',
        options: ['n', 'n - 1', 'n + 1', '2n - 1'],
        correctAnswer: 'n - 1',
      },
    ],
  },

  // 3. CSC 205: Digital Logic Design
  {
    code: 'CSC 205',
    title: 'Digital Logic Design',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'Which logic gate outputs 1 only when both of its inputs are 1?',
        options: ['OR gate', 'AND gate', 'XOR gate', 'NAND gate'],
        correctAnswer: 'AND gate',
      },
      {
        type: 'cbt',
        question: 'Which logic gates are referred to as universal gates because any boolean function can be implemented using them alone?',
        options: ['AND and OR', 'NAND and NOR', 'XOR and XNOR', 'NOT and AND'],
        correctAnswer: 'NAND and NOR',
      },
      {
        type: 'cbt',
        question: 'What is the two\'s complement representation of the decimal integer -5 in an 8-bit binary system?',
        options: ['11111011', '10000101', '11111010', '00000101'],
        correctAnswer: '11111011',
      },
      {
        type: 'cbt',
        question: 'What does a Karnaugh map (K-map) primarily facilitate in digital circuit design?',
        options: ['Multiplication of binary numbers', 'Systematic simplification and minimization of Boolean algebraic expressions', 'Converting analog signals to digital pulses', 'Simulating flip-flop propagation delays'],
        correctAnswer: 'Systematic simplification and minimization of Boolean algebraic expressions',
      },
      {
        type: 'cbt',
        question: 'How many data select lines (control inputs) are required for a 16-to-1 Multiplexer (MUX)?',
        options: ['2', '4', '8', '16'],
        correctAnswer: '4',
      },
      {
        type: 'cbt',
        question: 'What is the output of an exclusive-OR (XOR) gate when both inputs are identical (e.g., both 0 or both 1)?',
        options: ['0', '1', 'High impedance', 'Indeterminate'],
        correctAnswer: '0',
      },
      {
        type: 'cbt',
        question: 'Which digital circuit adds three single binary bits (two significant bits and an incoming carry bit)?',
        options: ['Half Adder', 'Full Adder', 'Binary Subtractor', 'Decoder'],
        correctAnswer: 'Full Adder',
      },
      {
        type: 'cbt',
        question: 'What is the characteristic feature of a sequential logic circuit that distinguishes it from a combinational circuit?',
        options: ['Sequential circuits contain memory elements and feedback loops', 'Sequential circuits do not use clock signals', 'Sequential circuits output depends solely on current inputs', 'Sequential circuits execute faster than combinational circuits'],
        correctAnswer: 'Sequential circuits contain memory elements and feedback loops',
      },
      {
        type: 'cbt',
        question: 'What problem occurs in an SR latch when both Set (S) and Reset (R) inputs are simultaneously driven High (1)?',
        options: ['Race condition / Invalid or undefined state', 'Normal toggling', 'Doubling of clock frequency', 'Zero power consumption'],
        correctAnswer: 'Race condition / Invalid or undefined state',
      },
      {
        type: 'cbt',
        question: 'Which flip-flop eliminates the invalid state of the SR latch by toggling its output when both inputs are 1?',
        options: ['D Flip-Flop', 'T Flip-Flop', 'JK Flip-Flop', 'Master-Slave SR Flip-Flop'],
        correctAnswer: 'JK Flip-Flop',
      },
    ],
  },

  // 4. CSC 207: Assembly Language Programming
  {
    code: 'CSC 207',
    title: 'Assembly Language Programming',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'In the x86 16-bit processor architecture (such as 8086), which register is the primary Accumulator?',
        options: ['AX', 'BX', 'CX', 'DX'],
        correctAnswer: 'AX',
      },
      {
        type: 'cbt',
        question: 'Which x86 register holds the offset address of the next instruction to be fetched and executed?',
        options: ['Stack Pointer (SP)', 'Base Pointer (BP)', 'Instruction Pointer (IP)', 'Source Index (SI)'],
        correctAnswer: 'Instruction Pointer (IP)',
      },
      {
        type: 'cbt',
        question: 'What does the assembly instruction "MOV AX, [BX]" perform in register indirect addressing mode?',
        options: ['Copies the value of BX directly into AX', 'Copies the contents of memory at the offset address pointed to by BX into AX', 'Stores the address of AX into BX', 'Adds BX to AX'],
        correctAnswer: 'Copies the contents of memory at the offset address pointed to by BX into AX',
      },
      {
        type: 'cbt',
        question: 'Which x86 assembly instruction decrements the Stack Pointer (SP) and places data onto the stack?',
        options: ['POP', 'PUSH', 'CALL', 'RET'],
        correctAnswer: 'PUSH',
      },
      {
        type: 'cbt',
        question: 'In 8086 segmented memory addressing, how is a 20-bit physical address computed from Segment and Offset registers?',
        options: ['(Segment * 16) + Offset', 'Segment + Offset', '(Segment * 2) + Offset', 'Segment + (Offset * 16)'],
        correctAnswer: '(Segment * 16) + Offset',
      },
      {
        type: 'cbt',
        question: 'Which flag register bit is set to 1 whenever an arithmetic or logical operation yields a result of zero?',
        options: ['Carry Flag (CF)', 'Sign Flag (SF)', 'Zero Flag (ZF)', 'Overflow Flag (OF)'],
        correctAnswer: 'Zero Flag (ZF)',
      },
      {
        type: 'cbt',
        question: 'What does the x86 LOOP instruction use as its automatic iteration counter?',
        options: ['AX register', 'CX register', 'DX register', 'BX register'],
        correctAnswer: 'CX register',
      },
      {
        type: 'cbt',
        question: 'Which directive in MASM/TASM defines an uninitialized byte or initializes an 8-bit memory variable?',
        options: ['DB (Define Byte)', 'DW (Define Word)', 'DD (Define Doubleword)', 'DQ (Define Quadword)'],
        correctAnswer: 'DB (Define Byte)',
      },
      {
        type: 'cbt',
        question: 'What does the assembly instruction "CMP AX, BX" do internally?',
        options: ['Performs AX - BX and discards the result, updating CPU status flags', 'Moves BX into AX if equal', 'Adds AX and BX together', 'Multiplies AX by BX'],
        correctAnswer: 'Performs AX - BX and discards the result, updating CPU status flags',
      },
      {
        type: 'cbt',
        question: 'In DOS/BIOS assembly programming, what does the software interrupt "INT 21h" invoke?',
        options: ['Reboot system', 'DOS Function Dispatcher / System Services', 'Division by zero handler', 'Video memory refresh'],
        correctAnswer: 'DOS Function Dispatcher / System Services',
      },
    ],
  },

  // 5. MTH 201: Mathematical Methods I
  {
    code: 'MTH 201',
    title: 'Mathematical Methods I',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What is the order of the differential equation (d^2y/dx^2)^3 + dy/dx + y = 0?',
        options: ['1', '2', '3', '6'],
        correctAnswer: '2',
      },
      {
        type: 'cbt',
        question: 'What is the degree of the differential equation (d^2y/dx^2)^3 + dy/dx + y = 0?',
        options: ['1', '2', '3', '6'],
        correctAnswer: '3',
      },
      {
        type: 'cbt',
        question: 'What is the integrating factor (I.F.) for the linear first-order differential equation dy/dx + P(x)y = Q(x)?',
        options: ['e^(integral of P(x) dx)', 'integral of P(x) dx', 'e^(-P(x))', 'ln(P(x))'],
        correctAnswer: 'e^(integral of P(x) dx)',
      },
      {
        type: 'cbt',
        question: 'What is the Laplace transform of the constant function f(t) = 1 for s > 0?',
        options: ['s', '1 / s', '1 / s^2', 's / (s + 1)'],
        correctAnswer: '1 / s',
      },
      {
        type: 'cbt',
        question: 'What is the Laplace transform of f(t) = e^(at)?',
        options: ['1 / (s - a)', '1 / (s + a)', 'a / s^2', 's / (s - a)'],
        correctAnswer: '1 / (s - a)',
      },
      {
        type: 'cbt',
        question: 'In vector calculus, if the divergence of a vector field F is zero (div F = 0), the vector field is called:',
        options: ['Irrotational', 'Solenoidal', 'Conservative', 'Harmonic'],
        correctAnswer: 'Solenoidal',
      },
      {
        type: 'cbt',
        question: 'If the curl of a vector field F is zero (curl F = 0), the vector field is termed:',
        options: ['Solenoidal', 'Irrotational (Conservative)', 'Divergent', 'Rotational'],
        correctAnswer: 'Irrotational (Conservative)',
      },
      {
        type: 'cbt',
        question: 'Which test determines the convergence of an alternating series sum((-1)^n * bn)?',
        options: ['Leibniz Test', 'Ratio Test', 'Root Test', 'Integral Test'],
        correctAnswer: 'Leibniz Test',
      },
      {
        type: 'cbt',
        question: 'What are the roots of the auxiliary equation m^2 - 4m + 4 = 0 for a second-order homogeneous ODE?',
        options: ['m = 2 and m = -2', 'Real and equal roots m = 2, 2', 'Complex conjugate roots', 'm = 0 and m = 4'],
        correctAnswer: 'Real and equal roots m = 2, 2',
      },
      {
        type: 'cbt',
        question: 'According to Green Theorem in a plane, a line integral around a closed curve C is converted into what type of integral over the enclosed region D?',
        options: ['Volume integral', 'Double (surface) integral', 'Triple integral', 'Contour integral in complex plane'],
        correctAnswer: 'Double (surface) integral',
      },
    ],
  },

  // 6. STA 201: Statistics for Physical Sciences
  {
    code: 'STA 201',
    title: 'Statistics for Physical Sciences',
    level: 200,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What is the relationship between the variance and standard deviation of a dataset?',
        options: ['Variance is the square root of standard deviation', 'Standard deviation is the square root of variance', 'Variance equals standard deviation times mean', 'They are independent measures'],
        correctAnswer: 'Standard deviation is the square root of variance',
      },
      {
        type: 'cbt',
        question: 'What is the sum of probabilities of all elementary events in a sample space S?',
        options: ['0', '0.5', '1', 'Infinity'],
        correctAnswer: '1',
      },
      {
        type: 'cbt',
        question: 'In a standard normal distribution (Z-distribution), what are the mean and variance respectively?',
        options: ['Mean = 0, Variance = 1', 'Mean = 1, Variance = 0', 'Mean = 0, Variance = 0', 'Mean = 1, Variance = 1'],
        correctAnswer: 'Mean = 0, Variance = 1',
      },
      {
        type: 'cbt',
        question: 'Which probability distribution models the number of rare independent events occurring within a fixed interval of time or space?',
        options: ['Binomial distribution', 'Poisson distribution', 'Normal distribution', 'Uniform distribution'],
        correctAnswer: 'Poisson distribution',
      },
      {
        type: 'cbt',
        question: 'For two independent events A and B, the joint probability P(A intersection B) equals:',
        options: ['P(A) + P(B)', 'P(A) * P(B)', 'P(A) / P(B)', 'P(A) + P(B) - P(A union B)'],
        correctAnswer: 'P(A) * P(B)',
      },
      {
        type: 'cbt',
        question: 'What is a Type I error in statistical hypothesis testing?',
        options: ['Rejecting the null hypothesis when it is actually true', 'Accepting the null hypothesis when it is false', 'Failing to collect a sufficient sample size', 'Computing a negative standard deviation'],
        correctAnswer: 'Rejecting the null hypothesis when it is actually true',
      },
      {
        type: 'cbt',
        question: 'What range of values can the Pearson correlation coefficient r take?',
        options: ['0 to 1', '-1 to +1', '-infinity to +infinity', '0 to 100'],
        correctAnswer: '-1 to +1',
      },
      {
        type: 'cbt',
        question: 'What is the expected value (mean) of a Binomial distribution with n trials and probability of success p?',
        options: ['n * p', 'n * p * (1 - p)', 'p / n', 'sqrt(n * p)'],
        correctAnswer: 'n * p',
      },
      {
        type: 'cbt',
        question: 'In a positively skewed (right-skewed) distribution, how are the mean, median, and mode typically ordered?',
        options: ['Mode < Median < Mean', 'Mean < Median < Mode', 'Median < Mode < Mean', 'Mean = Median = Mode'],
        correctAnswer: 'Mode < Median < Mean',
      },
      {
        type: 'cbt',
        question: 'What theorem states that the sampling distribution of the sample mean approaches a normal distribution as sample size n increases, regardless of population distribution shape?',
        options: ['Law of Large Numbers', 'Central Limit Theorem', 'Bayes Theorem', 'Chebyshev Inequality'],
        correctAnswer: 'Central Limit Theorem',
      },
    ],
  },

  // =========================================================================
  // 200 LEVEL RAIN SEMESTER
  // =========================================================================

  // 7. CSC 202: Computer Programming II
  {
    code: 'CSC 202',
    title: 'Computer Programming II',
    level: 200,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What is polymorphism in Object-Oriented Programming?',
        options: ['Having multiple classes in one file', 'The ability of different objects to respond to the same message in distinct ways', 'Converting source code to bytecode', 'Allocating memory dynamically'],
        correctAnswer: 'The ability of different objects to respond to the same message in distinct ways',
      },
      {
        type: 'cbt',
        question: 'Which keyword is used in C++ and Java to refer to the current instance of a class?',
        options: ['super', 'this', 'self', 'parent'],
        correctAnswer: 'this',
      },
      {
        type: 'cbt',
        question: 'Which keyword in Java is used to inherit from a superclass?',
        options: ['implements', 'extends', 'inherits', 'derives'],
        correctAnswer: 'extends',
      },
      {
        type: 'cbt',
        question: 'What is an abstract class in object-oriented programming?',
        options: ['A class that cannot be instantiated directly and serves as a blueprint for subclasses', 'A class with only static variables', 'A class stored in binary format', 'A class without any methods'],
        correctAnswer: 'A class that cannot be instantiated directly and serves as a blueprint for subclasses',
      },
      {
        type: 'cbt',
        question: 'Which block in Java exception handling is guaranteed to execute whether an exception is thrown or caught?',
        options: ['try', 'catch', 'finally', 'throw'],
        correctAnswer: 'finally',
      },
      {
        type: 'cbt',
        question: 'What is an Interface in Java?',
        options: ['A physical user screen', 'A reference type that defines a contract of abstract methods that implementing classes must satisfy', 'A package containing precompiled bytecode', 'A database schema definition'],
        correctAnswer: 'A reference type that defines a contract of abstract methods that implementing classes must satisfy',
      },
      {
        type: 'cbt',
        question: 'Which collection class in Java implements a resizable dynamic array?',
        options: ['LinkedList', 'ArrayList', 'HashSet', 'TreeMap'],
        correctAnswer: 'ArrayList',
      },
      {
        type: 'cbt',
        question: 'Which Java keyword calls the constructor of the parent superclass from a subclass constructor?',
        options: ['parent()', 'super()', 'base()', 'this()'],
        correctAnswer: 'super()',
      },
      {
        type: 'cbt',
        question: 'What feature in modern object-oriented languages allows type checking at compile time without manual type casting (e.g., List<String>)?',
        options: ['Reflection', 'Generics', 'Garbage Collection', 'Macros'],
        correctAnswer: 'Generics',
      },
      {
        type: 'cbt',
        question: 'Which design mechanism prevents a subclass from overriding a specific method in Java?',
        options: ['Marking the method as final', 'Marking the method as abstract', 'Marking the method as static only', 'Declaring the method protected'],
        correctAnswer: 'Marking the method as final',
      },
    ],
  },

  // 8. CSC 204: Data Structures and Algorithms I
  {
    code: 'CSC 204',
    title: 'Data Structures and Algorithms I',
    level: 200,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What is the average time complexity of accessing an element in an array by its index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctAnswer: 'O(1)',
      },
      {
        type: 'cbt',
        question: 'In a singly linked list, what does each node store besides its payload data?',
        options: ['A pointer/reference to the next node', 'A pointer to the previous node', 'The length of the list', 'A hash code of the list'],
        correctAnswer: 'A pointer/reference to the next node',
      },
      {
        type: 'cbt',
        question: 'Which operation on a Stack inserts a new element onto the top?',
        options: ['Pop', 'Push', 'Peek', 'Enqueue'],
        correctAnswer: 'Push',
      },
      {
        type: 'cbt',
        question: 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST) of n nodes?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 'O(log n)',
      },
      {
        type: 'cbt',
        question: 'Which sorting algorithm repeatedly swaps adjacent elements if they are in the wrong order?',
        options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Heap Sort'],
        correctAnswer: 'Bubble Sort',
      },
      {
        type: 'cbt',
        question: 'In a circular queue implemented with an array of capacity N, what condition indicates the queue is full?',
        options: ['(rear + 1) % N == front', 'rear == front', 'front == -1', 'rear == N'],
        correctAnswer: '(rear + 1) % N == front',
      },
      {
        type: 'cbt',
        question: 'What is the worst-case time complexity of Linear Search in an unsorted array of n elements?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctAnswer: 'O(n)',
      },
      {
        type: 'cbt',
        question: 'Which collision resolution technique in hash tables stores collided elements in linked lists outside the table array?',
        options: ['Linear Probing', 'Quadratic Probing', 'Separate Chaining', 'Double Hashing'],
        correctAnswer: 'Separate Chaining',
      },
      {
        type: 'cbt',
        question: 'In a doubly linked list, how many pointers are maintained in each internal node?',
        options: ['One pointer', 'Two pointers (next and previous)', 'Three pointers', 'Zero pointers'],
        correctAnswer: 'Two pointers (next and previous)',
      },
      {
        type: 'cbt',
        question: 'Which mathematical notation describes the tight asymptotic bound of an algorithm running time?',
        options: ['Big O notation', 'Big Theta (Theta) notation', 'Big Omega (Omega) notation', 'Little o notation'],
        correctAnswer: 'Big Theta (Theta) notation',
      },
    ],
  },

  // 9. CSC 206: Computer Architecture & Organization
  {
    code: 'CSC 206',
    title: 'Computer Architecture & Organization',
    level: 200,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What is the fundamental characteristic of the classical Von Neumann computer architecture?',
        options: ['Shared memory bus and storage for both program instructions and data', 'Separate physical memory for data and instructions', 'Multiple CPUs running independently without memory', 'Optical memory storage'],
        correctAnswer: 'Shared memory bus and storage for both program instructions and data',
      },
      {
        type: 'cbt',
        question: 'What are the three fundamental phases of the CPU instruction cycle?',
        options: ['Compile, Assemble, Link', 'Fetch, Decode, Execute', 'Read, Modify, Write', 'Load, Store, Branch'],
        correctAnswer: 'Fetch, Decode, Execute',
      },
      {
        type: 'cbt',
        question: 'Which CPU register stores the memory address from which data is to be fetched or to which data is to be written?',
        options: ['Memory Data Register (MDR)', 'Memory Address Register (MAR)', 'Instruction Register (IR)', 'Accumulator (AC)'],
        correctAnswer: 'Memory Address Register (MAR)',
      },
      {
        type: 'cbt',
        question: 'What is instruction pipelining designed to improve in modern microprocessor architectures?',
        options: ['Instruction throughput and CPU clock utilization', 'Memory capacity', 'Software compilation speed', 'Graphics rendering resolution'],
        correctAnswer: 'Instruction throughput and CPU clock utilization',
      },
      {
        type: 'cbt',
        question: 'Which level of CPU cache is closest to the processor cores and provides the fastest access latency?',
        options: ['L1 Cache', 'L2 Cache', 'L3 Cache', 'Main DRAM'],
        correctAnswer: 'L1 Cache',
      },
      {
        type: 'cbt',
        question: 'What principle justifies the effectiveness of cache memory by stating recently accessed data or nearby data is likely to be accessed again soon?',
        options: ['Amdahl Law', 'Principle of Locality (Temporal and Spatial)', 'Moore Law', 'Metcalfe Law'],
        correctAnswer: 'Principle of Locality (Temporal and Spatial)',
      },
      {
        type: 'cbt',
        question: 'What distinguishes RISC (Reduced Instruction Set Computer) from CISC architectures?',
        options: ['RISC uses a small set of simple, single-cycle instructions with load/store memory access', 'RISC instructions have variable lengths and complex multi-cycle operations', 'RISC does not support pipelining', 'RISC architectures have fewer registers'],
        correctAnswer: 'RISC uses a small set of simple, single-cycle instructions with load/store memory access',
      },
      {
        type: 'cbt',
        question: 'What type of hazard in a pipelined CPU occurs when an instruction depends on the result of a previous instruction still in the pipeline?',
        options: ['Structural Hazard', 'Data Hazard', 'Control Hazard', 'Branch Hazard'],
        correctAnswer: 'Data Hazard',
      },
      {
        type: 'cbt',
        question: 'What system bus carries control and synchronization signals between the CPU and other devices?',
        options: ['Data Bus', 'Address Bus', 'Control Bus', 'Expansion Bus'],
        correctAnswer: 'Control Bus',
      },
      {
        type: 'cbt',
        question: 'What is Direct Memory Access (DMA) used for in computer systems?',
        options: ['Allowing high-speed I/O devices to transfer data directly to/from memory without CPU intervention', 'Bypassing RAM to execute instructions directly from disk', 'Increasing the CPU clock frequency dynamically', 'Encrypting memory contents in real time'],
        correctAnswer: 'Allowing high-speed I/O devices to transfer data directly to/from memory without CPU intervention',
      },
    ],
  },

  // 10. CSC 208: Internet & Web Technologies
  {
    code: 'CSC 208',
    title: 'Internet & Web Technologies',
    level: 200,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What standard port does secure Hypertext Transfer Protocol (HTTPS) use by default?',
        options: ['21', '80', '443', '8080'],
        correctAnswer: '443',
      },
      {
        type: 'cbt',
        question: 'What does CSS stand for in web development?',
        options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Styling Software', 'Colorful Styling System'],
        correctAnswer: 'Cascading Style Sheets',
      },
      {
        type: 'cbt',
        question: 'Which HTTP request method is idempotent and used strictly to retrieve representation of a resource without side effects?',
        options: ['POST', 'GET', 'PATCH', 'CONNECT'],
        correctAnswer: 'GET',
      },
      {
        type: 'cbt',
        question: 'What is the Document Object Model (DOM) in web browsers?',
        options: ['A programming interface representing HTML and XML documents as a structured node tree', 'A database table format for web pages', 'A CSS layout grid engine', 'A browser security sandbox protocol'],
        correctAnswer: 'A programming interface representing HTML and XML documents as a structured node tree',
      },
      {
        type: 'cbt',
        question: 'Which HTTP response status code indicates "Not Found"?',
        options: ['200', '301', '404', '500'],
        correctAnswer: '404',
      },
      {
        type: 'cbt',
        question: 'What client-side technology enables asynchronous web data fetching without reloading the entire page?',
        options: ['AJAX / Fetch API', 'FTP', 'PHP script', 'CSS Grid'],
        correctAnswer: 'AJAX / Fetch API',
      },
      {
        type: 'cbt',
        question: 'What data interchange format uses human-readable key-value pairs and is universally used in RESTful APIs?',
        options: ['CSV', 'XML', 'JSON', 'YAML'],
        correctAnswer: 'JSON',
      },
      {
        type: 'cbt',
        question: 'Which HTML5 semantic element is used to represent self-contained content such as a blog post or news item?',
        options: ['<section>', '<article>', '<aside>', '<div>'],
        correctAnswer: '<article>',
      },
      {
        type: 'cbt',
        question: 'What security mechanism in modern web browsers restricts web scripts loaded from one origin from interacting with resources from another origin?',
        options: ['Cross-Site Scripting (XSS)', 'Same-Origin Policy (SOP)', 'Content Delivery Network (CDN)', 'Transport Layer Security (TLS)'],
        correctAnswer: 'Same-Origin Policy (SOP)',
      },
      {
        type: 'cbt',
        question: 'What is a small piece of data stored on the client browser by the web server to maintain stateful user sessions?',
        options: ['Cookie', 'Cache', 'DNS record', 'WebSocket packet'],
        correctAnswer: 'Cookie',
      },
    ],
  },

  // 11. GST 201: Entrepreneurship Studies I
  {
    code: 'GST 201',
    title: 'Entrepreneurship Studies I',
    level: 200,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'Who famously defined an entrepreneur as an innovator who introduces "creative destruction" into markets?',
        options: ['Adam Smith', 'Joseph Schumpeter', 'Max Weber', 'Peter Drucker'],
        correctAnswer: 'Joseph Schumpeter',
      },
      {
        type: 'cbt',
        question: 'What is a formal document setting out a business future objectives and strategies for achieving them called?',
        options: ['Financial Statement', 'Business Plan', 'Articles of Association', 'Patent Application'],
        correctAnswer: 'Business Plan',
      },
      {
        type: 'cbt',
        question: 'In a SWOT analysis, which two factors evaluate the internal environment of a business enterprise?',
        options: ['Strengths and Weaknesses', 'Opportunities and Threats', 'Strengths and Opportunities', 'Weaknesses and Threats'],
        correctAnswer: 'Strengths and Weaknesses',
      },
      {
        type: 'cbt',
        question: 'What is the point in a business operations where total revenue equals total costs (zero profit and zero loss)?',
        options: ['Margin of Safety', 'Break-even Point', 'Optimal Capacity', 'Liquidity Threshold'],
        correctAnswer: 'Break-even Point',
      },
      {
        type: 'cbt',
        question: 'What type of financing is provided by wealthy individuals or specialized firms to high-potential early-stage startups in exchange for equity?',
        options: ['Commercial Bank Loan', 'Venture Capital', 'Government Grant', 'Trade Credit'],
        correctAnswer: 'Venture Capital',
      },
      {
        type: 'cbt',
        question: 'What is a Feasibility Study in entrepreneurship?',
        options: ['An audit of past five years financial reports', 'An assessment of the practical viability and likelihood of success of a proposed business venture', 'A marketing campaign strategy', 'A company tax clearance evaluation'],
        correctAnswer: 'An assessment of the practical viability and likelihood of success of a proposed business venture',
      },
      {
        type: 'cbt',
        question: 'Which of the following is an essential characteristic of a successful entrepreneur?',
        options: ['Total risk aversion', 'Calculated risk-taking, resilience, and problem-solving initiative', 'Reliance solely on government subsidies', 'Resistance to technological innovation'],
        correctAnswer: 'Calculated risk-taking, resilience, and problem-solving initiative',
      },
      {
        type: 'cbt',
        question: 'What legal protection grants an inventor exclusive rights to commercially exploit an innovative technical invention for a limited period?',
        options: ['Trademark', 'Patent', 'Copyright', 'Trade Secret'],
        correctAnswer: 'Patent',
      },
      {
        type: 'cbt',
        question: 'Working capital in business financial management is defined as:',
        options: ['Current Assets minus Current Liabilities', 'Total Fixed Assets plus Cash', 'Net Profit minus Taxes', 'Owner Equity divided by Debt'],
        correctAnswer: 'Current Assets minus Current Liabilities',
      },
      {
        type: 'cbt',
        question: 'What agency in Nigeria is primarily responsible for the registration and incorporation of business names and limited liability companies?',
        options: ['Federal Inland Revenue Service (FIRS)', 'Corporate Affairs Commission (CAC)', 'Central Bank of Nigeria (CBN)', 'Standards Organisation of Nigeria (SON)'],
        correctAnswer: 'Corporate Affairs Commission (CAC)',
      },
    ],
  },
];
