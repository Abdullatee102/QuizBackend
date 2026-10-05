// src/seed/faculties/fci/csc400.ts
import type { SeedCourse } from '../../types.js';

export const csc400Courses: SeedCourse[] = [
  // =========================================================================
  // 400 LEVEL HARMATTAN SEMESTER (LAUTECH OFFICIAL CURRICULUM)
  // =========================================================================

  // 1. COS 409: Research Methodology and Technical Writing
  {
    code: 'COS 409',
    title: 'Research Methodology and Technical Writing',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Differentiate between quantitative and qualitative research paradigms in computer science research.',
        options: [],
        correctAnswer: 'Quantitative research relies on numerical measurements, computational benchmarking, algorithmic runtimes, and statistical hypothesis testing. Qualitative research focuses on non-numerical data such as usability interviews, developer feedback, exploratory case studies, and subjective user experiences.',
        gradingPoints: [
          { concept: 'quantitative uses numerical metrics and statistical analysis', weight: 0.5, aliases: ['numerical measurements', 'benchmarks', 'runtime metrics'] },
          { concept: 'qualitative focuses on subjective human experiences and case studies', weight: 0.5, aliases: ['interviews', 'user experience', 'case studies'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the purpose and essential components of a Literature Review in academic research.',
        options: [],
        correctAnswer: 'A literature review critically analyzes existing scholarly works, identifies gaps in current knowledge, prevents duplication, and establishes the theoretical justification for the proposed study.',
        gradingPoints: [
          { concept: 'critically analyzes prior research', weight: 0.5, aliases: ['synthesizes prior work', 'evaluates existing literature'] },
          { concept: 'identifies gaps in knowledge', weight: 0.5, aliases: ['research gap', 'justifies new study'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the SMART criteria used in formulating research aims and objectives.',
        options: [],
        correctAnswer: 'SMART stands for Specific (clearly stated deliverables), Measurable (quantifiable metrics), Achievable (realistic with available resources), Relevant (aligned with research problem), and Time-bound (defined schedule).',
        gradingPoints: [
          { concept: 'Specific, Measurable, Achievable, Relevant, Time-bound', weight: 1.0, aliases: ['SMART breakdown', 'five SMART criteria'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss the ethical considerations of Plagiarism and how proper citation standards (e.g., IEEE, APA) prevent academic misconduct.',
        options: [],
        correctAnswer: 'Plagiarism is presenting another author work, ideas, or data as one own without attribution. Proper citation standards like IEEE and APA give credit to original sources through in-text citations and bibliographic references, upholding academic honesty.',
        gradingPoints: [
          { concept: 'plagiarism is using others work without attribution', weight: 0.5, aliases: ['intellectual theft', 'uncredited usage'] },
          { concept: 'citation standards credit original sources', weight: 0.5, aliases: ['IEEE citation', 'APA format', 'attribution'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the structure of an IEEE-format technical paper or journal article.',
        options: [],
        correctAnswer: 'An IEEE technical paper typically consists of: Title, Abstract, Index Terms, Introduction, Related Work, Proposed Methodology/System Architecture, Experimental Results and Analysis, Conclusion, and References.',
        gradingPoints: [
          { concept: 'abstract, introduction, related work, methodology', weight: 0.5, aliases: ['IMRAD structure', 'system design'] },
          { concept: 'experiments, results, conclusion, references', weight: 0.5, aliases: ['evaluation', 'discussion', 'bibliography'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Primary and Secondary data collection techniques in computing research.',
        options: [],
        correctAnswer: 'Primary data is collected firsthand by the researcher for the specific study (e.g., benchmark logs, telemetry, direct user surveys). Secondary data is pre-existing data gathered by external parties (e.g., open-source datasets, Kaggle repositories, published statistics).',
        gradingPoints: [
          { concept: 'primary data is collected firsthand', weight: 0.5, aliases: ['direct measurements', 'original experimental logs'] },
          { concept: 'secondary data is pre-existing third-party data', weight: 0.5, aliases: ['existing repositories', 'published datasets'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Research Hypothesis and how does a Null Hypothesis (H0) differ from an Alternative Hypothesis (H1)?',
        options: [],
        correctAnswer: 'A research hypothesis is a testable proposition. The Null Hypothesis (H0) states that there is no significant effect, relationship, or difference between variables. The Alternative Hypothesis (H1) posits that a statistically significant effect or difference exists.',
        gradingPoints: [
          { concept: 'null hypothesis H0 states no significant effect', weight: 0.5, aliases: ['H0 assumes no difference', 'default assumption'] },
          { concept: 'alternative hypothesis H1 claims significant difference exists', weight: 0.5, aliases: ['H1 proposes an effect', 'research claim'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of peer review in academic publishing and research dissemination.',
        options: [],
        correctAnswer: 'Peer review involves independent domain experts critically evaluating a manuscript for originality, technical correctness, methodological rigor, and scholarly contribution prior to publication in a journal or conference.',
        gradingPoints: [
          { concept: 'independent expert evaluation', weight: 0.5, aliases: ['referee critique', 'blind review'] },
          { concept: 'validates correctness and scholarly contribution', weight: 0.5, aliases: ['ensures technical rigor', 'checks originality'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are the essential elements of an effective Abstract in computer science technical writing?',
        options: [],
        correctAnswer: 'An abstract should contain: background context, problem statement, proposed method/approach, key experimental findings with quantitative metrics, and final conclusion or significance—typically within 150 to 250 words.',
        gradingPoints: [
          { concept: 'problem statement and proposed methodology', weight: 0.5, aliases: ['problem and solution', 'approach'] },
          { concept: 'key results and research significance', weight: 0.5, aliases: ['quantitative findings', 'conclusion'] },
        ],
      },
      {
        type: 'theory',
        question: 'How does an experimental threat to internal validity differ from an external validity threat?',
        options: [],
        correctAnswer: 'Internal validity refers to whether the observed experimental outcomes are truly caused by the independent variable rather than confounding factors. External validity refers to whether the findings can be generalized across other datasets, platforms, and real-world environments.',
        gradingPoints: [
          { concept: 'internal validity concerns causal correctness and confounds', weight: 0.5, aliases: ['controlling confounding variables', 'internal rigor'] },
          { concept: 'external validity concerns generalizability to other environments', weight: 0.5, aliases: ['generalizability', 'real-world applicability'] },
        ],
      },
    ],
  },

  // 2. CSC 401: Algorithms and Complexity Analysis
  {
    code: 'CSC 401',
    title: 'Algorithms and Complexity Analysis',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the asymptotic notations Big-O, Big-Omega, and Big-Theta used in algorithmic complexity analysis.',
        options: [],
        correctAnswer: 'Big-O describes an asymptotic upper bound on growth rate (worst case). Big-Omega describes an asymptotic lower bound (best case). Big-Theta describes an asymptotically tight bound where upper and lower bounds coincide.',
        gradingPoints: [
          { concept: 'Big-O is asymptotic upper bound', weight: 0.34, aliases: ['worst case bound', 'growth rate ceiling'] },
          { concept: 'Big-Omega is asymptotic lower bound', weight: 0.33, aliases: ['best case bound', 'growth rate floor'] },
          { concept: 'Big-Theta is tight bound', weight: 0.33, aliases: ['upper and lower match', 'exact asymptotic rate'] },
        ],
      },
      {
        type: 'theory',
        question: 'State the Master Theorem for divide-and-conquer recurrences T(n) = aT(n/b) + f(n) and describe its three cases.',
        options: [],
        correctAnswer: 'The Master Theorem solves recurrences where a >= 1 and b > 1. Case 1: If f(n) = O(n^(log_b(a) - e)), then T(n) = Theta(n^(log_b(a))). Case 2: If f(n) = Theta(n^(log_b(a))), then T(n) = Theta(n^(log_b(a)) * log n). Case 3: If f(n) = Omega(n^(log_b(a) + e)) and regularity holds, then T(n) = Theta(f(n)).',
        gradingPoints: [
          { concept: 'Case 1: tree leaves dominate, T(n) = Theta(n^log_b(a))', weight: 0.34, aliases: ['f(n) polynomially smaller'] },
          { concept: 'Case 2: work evenly split, T(n) = Theta(n^log_b(a) log n)', weight: 0.33, aliases: ['f(n) matches n^log_b(a)'] },
          { concept: 'Case 3: root dominates, T(n) = Theta(f(n))', weight: 0.33, aliases: ['f(n) polynomially larger'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Dynamic Programming paradigm and the two key properties a problem must possess: Optimal Substructure and Overlapping Subproblems.',
        options: [],
        correctAnswer: 'Dynamic programming solves complex problems by breaking them down into simpler subproblems and storing results to avoid recomputation. Optimal substructure means the optimal solution of the problem contains optimal solutions to subproblems. Overlapping subproblems means the same subproblems are solved multiple times across recursion.',
        gradingPoints: [
          { concept: 'optimal substructure: optimal solution contains optimal sub-solutions', weight: 0.5, aliases: ['subproblem optimality'] },
          { concept: 'overlapping subproblems: subproblems recomputed multiple times', weight: 0.5, aliases: ['memoization', 'tabulation of subproblems'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between the Greedy Choice Property and Dynamic Programming.',
        options: [],
        correctAnswer: 'A greedy algorithm makes a locally optimal choice at each step without reconsidering prior decisions, hoping to achieve a global optimum. Dynamic programming explores all possible subproblem choices, solves them, and memoizes results, guaranteeing global optimality where greedy algorithms might fail.',
        gradingPoints: [
          { concept: 'greedy makes locally optimal irrevocable choice', weight: 0.5, aliases: ['local optimum', 'no backtracking'] },
          { concept: 'dynamic programming evaluates subproblem choices with memoization', weight: 0.5, aliases: ['solves all subproblems', 'global optimum guarantee'] },
        ],
      },
      {
        type: 'theory',
        question: 'Define the complexity classes P, NP, NP-Complete, and NP-Hard.',
        options: [],
        correctAnswer: 'P is the class of decision problems solvable in polynomial time. NP is the class of problems whose solutions are verifiable in polynomial time. NP-Hard contains problems at least as hard as the hardest problems in NP. NP-Complete contains problems that are both in NP and NP-Hard.',
        gradingPoints: [
          { concept: 'P: solvable in polynomial time; NP: verifiable in polynomial time', weight: 0.5, aliases: ['P is polynomial solvable', 'NP is polynomial verifiable'] },
          { concept: 'NP-Complete: both in NP and NP-Hard via polynomial reduction', weight: 0.5, aliases: ['hardest problems in NP'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how polynomial-time reduction works to prove that a problem is NP-Complete.',
        options: [],
        correctAnswer: 'To prove problem B is NP-Complete: 1) Show B is in NP. 2) Select a known NP-Complete problem A. 3) Demonstrate a polynomial-time reduction function f that transforms any instance of A into an instance of B such that A is true if and only if B is true.',
        gradingPoints: [
          { concept: 'show target problem is in NP', weight: 0.3, aliases: ['verifiable in polynomial time'] },
          { concept: 'reduce known NP-complete problem to target problem in polynomial time', weight: 0.7, aliases: ['reduction from 3-SAT', 'A <=p B'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Dijkstra algorithm with the Bellman-Ford algorithm for single-source shortest paths.',
        options: [],
        correctAnswer: 'Dijkstra algorithm uses a priority queue with greedy selection, running in O((V + E) log V) time, but fails with negative edge weights. Bellman-Ford runs in O(V * E) time, handles negative edge weights, and can detect negative-weight cycles.',
        gradingPoints: [
          { concept: 'Dijkstra is faster O((V+E)log V) but cannot handle negative weights', weight: 0.5, aliases: ['Dijkstra greedy priority queue', 'no negative edges'] },
          { concept: 'Bellman-Ford handles negative weights and detects negative cycles in O(VE)', weight: 0.5, aliases: ['detects negative cycles', 'relaxes all edges V-1 times'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Amortized Analysis and contrast the Aggregate, Accounting, and Potential methods.',
        options: [],
        correctAnswer: 'Amortized analysis guarantees average performance of each operation over a worst-case sequence of operations. The Aggregate method computes total cost divided by n. The Accounting method assigns credits (virtual costs) to operations. The Potential method models the state as a potential energy function.',
        gradingPoints: [
          { concept: 'amortized analysis guarantees average cost over sequence of operations', weight: 0.4, aliases: ['average over worst-case sequence'] },
          { concept: 'aggregate, accounting credit, potential function methods', weight: 0.6, aliases: ['three amortized techniques'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the 0/1 Knapsack Problem and why it cannot be solved using a greedy approach, whereas Fractional Knapsack can.',
        options: [],
        correctAnswer: 'In 0/1 Knapsack, items cannot be broken; a greedy choice by value-to-weight ratio can leave empty capacity leading to suboptimal results, requiring dynamic programming. In Fractional Knapsack, items can be split continuously, so greedy selection by ratio yields the optimal solution.',
        gradingPoints: [
          { concept: '0/1 knapsack items cannot be split, requiring DP', weight: 0.5, aliases: ['binary choice requires dynamic programming'] },
          { concept: 'fractional knapsack allows splitting items, enabling greedy choice', weight: 0.5, aliases: ['value-to-weight ratio works for fractional'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Ford-Fulkerson method for finding maximum flow in a network and state the Max-Flow Min-Cut Theorem.',
        options: [],
        correctAnswer: 'Ford-Fulkerson repeatedly finds augmenting paths in a residual network and pushes bottleneck flow until no path exists. The Max-Flow Min-Cut theorem states that the maximum amount of flow passing from source to sink equals the total capacity of the minimum capacity cut dividing source and sink.',
        gradingPoints: [
          { concept: 'Ford-Fulkerson augments flow along residual paths', weight: 0.5, aliases: ['residual graph', 'augmenting path'] },
          { concept: 'Max-Flow equals Min-Cut capacity', weight: 0.5, aliases: ['max flow min cut theorem'] },
        ],
      },
    ],
  },

  // 3. CSC 403: Modelling and Simulation
  {
    code: 'CSC 403',
    title: 'Modelling and Simulation',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define a System, a Model, and a Simulation, explaining how they relate to one another.',
        options: [],
        correctAnswer: 'A system is an organized collection of interacting entities acting towards a goal. A model is an abstract representation of the system capturing its essential behavior. A simulation is the execution of a model over time to observe dynamic performance under varying conditions.',
        gradingPoints: [
          { concept: 'system is collection of interacting components', weight: 0.33, aliases: ['interacting entities'] },
          { concept: 'model is mathematical or logical representation', weight: 0.33, aliases: ['abstract representation'] },
          { concept: 'simulation is running the model over time', weight: 0.34, aliases: ['temporal execution'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Continuous Simulation and Discrete-Event Simulation (DES).',
        options: [],
        correctAnswer: 'Continuous simulation models systems whose state variables change continuously over time, typically governed by differential equations (e.g., flight dynamics). Discrete-Event Simulation (DES) models systems where state changes occur instantaneously at distinct points in time due to specific events (e.g., bank queues, packet routers).',
        gradingPoints: [
          { concept: 'continuous simulation changes smoothly via differential equations', weight: 0.5, aliases: ['smooth state change', 'differential equations'] },
          { concept: 'discrete event simulation changes instantaneously at event points', weight: 0.5, aliases: ['event-driven', 'discrete points in time'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the components of a Discrete-Event Simulation engine: System State, Event List, Simulation Clock, and Statistical Counters.',
        options: [],
        correctAnswer: 'System State holds the collection of state variables describing the system at a moment. The Event List is a priority queue of scheduled future events ordered by occurrence time. The Simulation Clock tracks simulated time. Statistical Counters store running cumulative metrics like waiting times and queue lengths.',
        gradingPoints: [
          { concept: 'system state and simulation clock', weight: 0.5, aliases: ['state variables', 'clock advancement'] },
          { concept: 'event list priority queue and statistical counters', weight: 0.5, aliases: ['scheduled events', 'performance metrics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Monte Carlo simulation technique and provide an example of its application.',
        options: [],
        correctAnswer: 'Monte Carlo simulation uses repeated random sampling from probability distributions to obtain numerical approximations for deterministic or stochastic problems. For example, estimating the value of Pi by randomly dropping points in a square and counting the fraction falling inside a circle.',
        gradingPoints: [
          { concept: 'repeated random sampling from probability distributions', weight: 0.5, aliases: ['stochastic sampling', 'pseudorandom trials'] },
          { concept: 'approximates complex solutions (e.g. estimating Pi or financial risk)', weight: 0.5, aliases: ['estimating Pi', 'risk analysis example'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Linear Congruential Generator (LCG) formula for pseudo-random number generation and its required properties.',
        options: [],
        correctAnswer: 'The LCG recurrence is X_(n+1) = (a * X_n + c) mod m, where m is the modulus, a is the multiplier, c is the increment, and X_0 is the seed. For maximum period m, parameters must satisfy Hull-Dobell theorem conditions: c and m are coprime, a-1 is divisible by all prime factors of m, and if 4 divides m, 4 divides a-1.',
        gradingPoints: [
          { concept: 'formula X_(n+1) = (aX_n + c) mod m', weight: 0.5, aliases: ['LCG formula', 'modulus multiplier increment'] },
          { concept: 'Hull-Dobell theorem for full period length', weight: 0.5, aliases: ['full period m', 'coprime conditions'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Model Verification and Model Validation.',
        options: [],
        correctAnswer: 'Model Verification answers: Did we build the model right? (ensuring the conceptual model is accurately translated into computer code without programming errors). Model Validation answers: Did we build the right model? (ensuring the model accurately represents the real-world system behavior).',
        gradingPoints: [
          { concept: 'verification checks code correctly implements the model specification', weight: 0.5, aliases: ['building the model right', 'debugging'] },
          { concept: 'validation checks model accurately represents real-world system', weight: 0.5, aliases: ['building the right model', 'ground truth comparison'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Kendall notation A/B/c/K/N/D for queuing models and explain an M/M/1 queue.',
        options: [],
        correctAnswer: 'Kendall notation specifies: A (arrival distribution), B (service time distribution), c (number of parallel servers), K (system capacity), N (population size), and D (queue discipline). An M/M/1 queue has Poisson arrivals (exponential interarrival times M), exponential service times (M), a single server (1), infinite capacity, and FCFS discipline.',
        gradingPoints: [
          { concept: 'Kendall notation: arrival / service / servers / capacity', weight: 0.5, aliases: ['A/B/c/K/N/D parameters'] },
          { concept: 'M/M/1: Markovian arrivals, Markovian service, 1 server', weight: 0.5, aliases: ['Poisson arrivals single server'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the Inverse Transform Method for generating continuous random variates?',
        options: [],
        correctAnswer: 'The inverse transform method generates a random variate X with cumulative distribution function F(x) by: 1) Generating a uniform random number U ~ Uniform(0,1). 2) Solving X = F^(-1)(U) using the inverse CDF. For exponential distribution with rate lambda, X = -ln(1 - U) / lambda.',
        gradingPoints: [
          { concept: 'generate uniform random variable U in (0, 1)', weight: 0.4, aliases: ['uniform U(0,1)'] },
          { concept: 'apply inverse CDF X = F^-1(U)', weight: 0.6, aliases: ['solve X = F inverse U', 'exponential variate formula'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Warm-Up Period and the problem of Initial Transient in steady-state simulations.',
        options: [],
        correctAnswer: 'Initial transient occurs when a simulation starts from an unrepresentative initial state (like an empty queue), biasing long-term steady-state metrics. The warm-up period is an initial interval of simulated time during which output data is discarded until the system reaches steady-state behavior.',
        gradingPoints: [
          { concept: 'initial transient biases results due to empty/artificial start', weight: 0.5, aliases: ['start-up bias', 'non-steady initial state'] },
          { concept: 'warm-up period discards initial data before collecting statistics', weight: 0.5, aliases: ['truncation period', 'discarding warm-up data'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss statistical output analysis in simulation: why are Independent Replications necessary?',
        options: [],
        correctAnswer: 'Because simulation outputs are correlated and non-independent within a single run, standard statistical formulas fail. Independent replications execute multiple runs using distinct random number seeds, yielding independent sample averages that allow computation of valid confidence intervals.',
        gradingPoints: [
          { concept: 'outputs within single run are autocorrelated', weight: 0.5, aliases: ['non-independent observations', 'serial correlation'] },
          { concept: 'independent runs with different seeds enable valid confidence intervals', weight: 0.5, aliases: ['independent replications', 'confidence intervals'] },
        ],
      },
    ],
  },

  // 4. CSC 405: Human Computer Interface
  {
    code: 'CSC 405',
    title: 'Human Computer Interface',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'List and explain three of Jakob Nielsen 10 Usability Heuristics for UI design.',
        options: [],
        correctAnswer: 'Key heuristics include: 1) Visibility of system status (providing immediate feedback). 2) Match between system and the real world (using concepts familiar to users). 3) User control and freedom (providing clear exits like undo and redo). 4) Consistency and standards. 5) Error prevention.',
        gradingPoints: [
          { concept: 'Visibility of system status', weight: 0.34, aliases: ['feedback', 'system status'] },
          { concept: 'Match between system and real world', weight: 0.33, aliases: ['familiar language', 'real world metaphors'] },
          { concept: 'User control and freedom', weight: 0.33, aliases: ['undo and redo', 'emergency exits'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the User-Centered Design (UCD) process and its iterative stages.',
        options: [],
        correctAnswer: 'UCD is an iterative design methodology focusing on users needs at each stage. Stages include: 1) Research & Context of Use (user interviews/personas). 2) Requirements Specification. 3) Design & Prototyping (wireframes, interactive mockups). 4) Usability Evaluation with real users to feed refinements.',
        gradingPoints: [
          { concept: 'understanding context of use and user requirements', weight: 0.5, aliases: ['user research', 'personas', 'needs'] },
          { concept: 'iterative prototyping and usability evaluation', weight: 0.5, aliases: ['wireframes', 'usability testing', 'iteration'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Fitts Law and describe two concrete implications for graphical user interface design.',
        options: [],
        correctAnswer: 'Fitts Law states that target acquisition time is MT = a + b * log2(2D / W), where D is distance to target and W is target width. Implications: 1) Make frequently clicked buttons larger. 2) Place critical targets on screen edges or corners where effective width is infinite.',
        gradingPoints: [
          { concept: 'movement time depends on distance D and width W', weight: 0.5, aliases: ['target acquisition time', 'log2(2D/W)'] },
          { concept: 'implications: larger buttons and utilizing screen corners/edges', weight: 0.5, aliases: ['edge targets have infinite width', 'increase button size'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Formative Evaluation with Summative Evaluation in usability testing.',
        options: [],
        correctAnswer: 'Formative evaluation is conducted during early and intermediate design phases to discover usability bugs and guide improvements iteratively. Summative evaluation is conducted after product completion to evaluate overall effectiveness, efficiency, and satisfaction against benchmarks.',
        gradingPoints: [
          { concept: 'formative evaluation occurs during design to diagnose problems', weight: 0.5, aliases: ['early testing', 'iterative feedback'] },
          { concept: 'summative evaluation occurs at product completion against benchmarks', weight: 0.5, aliases: ['post-release benchmark', 'quantitative satisfaction'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the four POUR principles of the Web Content Accessibility Guidelines (WCAG).',
        options: [],
        correctAnswer: 'POUR principles: 1) Perceivable (information must be presentable to users in ways they can perceive, e.g., alt text). 2) Operable (interface components must be operable via keyboard or voice). 3) Understandable (content and navigation must be predictable). 4) Robust (compatible with screen readers and assistive tech).',
        gradingPoints: [
          { concept: 'Perceivable and Operable', weight: 0.5, aliases: ['accessible senses', 'keyboard navigation'] },
          { concept: 'Understandable and Robust', weight: 0.5, aliases: ['clear language', 'assistive technology compatibility'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Don Norman seven stages of action and explain the Gulf of Execution versus Gulf of Evaluation.',
        options: [],
        correctAnswer: 'The stages span forming goals, planning, specifying, and executing actions, then perceiving, interpreting, and evaluating system state. The Gulf of Execution is the difficulty users face determining how to perform an intended action. The Gulf of Evaluation is the difficulty interpreting whether the action achieved the goal.',
        gradingPoints: [
          { concept: 'Gulf of Execution: difficulty figuring out how to act', weight: 0.5, aliases: ['mapping intention to action', 'interface affordances'] },
          { concept: 'Gulf of Evaluation: difficulty perceiving and interpreting system state', weight: 0.5, aliases: ['evaluating outcome', 'system feedback'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Low-Fidelity and High-Fidelity prototypes in interface design.',
        options: [],
        correctAnswer: 'Low-fidelity prototypes (paper sketches, wireframes) are cheap, quick to create, and ideal for brainstorming conceptual layouts early. High-fidelity prototypes (Figma mockups, interactive HTML/CSS) mimic actual visual design, typography, and interactive behavior, ideal for realistic user testing.',
        gradingPoints: [
          { concept: 'low-fidelity: quick, cheap, abstract conceptual sketches', weight: 0.5, aliases: ['paper prototyping', 'wireframing'] },
          { concept: 'high-fidelity: interactive, realistic visual design and behavior', weight: 0.5, aliases: ['interactive mockup', 'pixel-perfect'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Shneiderman Eight Golden Rules of Interface Design, highlighting three examples.',
        options: [],
        correctAnswer: 'Key rules include: 1) Strive for consistency. 2) Cater to universal usability. 3) Offer informative feedback. 4) Design dialogs to yield closure. 5) Prevent errors. 6) Permit easy reversal of actions (undo). 7) Keep users in control. 8) Reduce short-term memory load.',
        gradingPoints: [
          { concept: 'strive for consistency and informative feedback', weight: 0.5, aliases: ['consistency', 'feedback'] },
          { concept: 'prevent errors, permit reversal of actions, reduce memory load', weight: 0.5, aliases: ['undo', 'error prevention', 'memory load'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the GOMS (Goals, Operators, Methods, Selection Rules) model in cognitive ergonomics?',
        options: [],
        correctAnswer: 'GOMS is a predictive cognitive framework. Goals are symbolic intentions of the user. Operators are perceptual, cognitive, or physical actions (e.g., clicking a mouse). Methods are learned sequences of operators that achieve goals. Selection rules decide which method to apply when multiple exist.',
        gradingPoints: [
          { concept: 'Goals (user intent) and Operators (elementary actions)', weight: 0.5, aliases: ['mental goals', 'physical operators'] },
          { concept: 'Methods (action procedures) and Selection rules (choice criteria)', weight: 0.5, aliases: ['subroutines', 'decision rules'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Hick-Hyman Law and its relevance to menu and navigation design in software interfaces.',
        options: [],
        correctAnswer: 'Hick-Hyman Law states that reaction decision time increases logarithmically with the number of choices: T = b * log2(n + 1). In navigation design, categorizing items hierarchically and reducing menu clutter shortens decision time for users.',
        gradingPoints: [
          { concept: 'decision time increases logarithmically with number of options', weight: 0.5, aliases: ['T = log2(n+1)', 'choice reaction time'] },
          { concept: 'design implication: minimize options or group hierarchically', weight: 0.5, aliases: ['clean menu hierarchy', 'reduce cognitive overload'] },
        ],
      },
    ],
  },

  // 5. CSC 407: Computer System Performance Evaluation
  {
    code: 'CSC 407',
    title: 'Computer System Performance Evaluation',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'State Little Law in queueing and performance analysis and describe its three core parameters.',
        options: [],
        correctAnswer: 'Little Law states that L = lambda * W, where L is the average number of customers in the system, lambda is the average arrival rate, and W is the average time a customer spends in the system. It holds for almost all stationary systems regardless of arrival distribution.',
        gradingPoints: [
          { concept: 'L = lambda * W equation', weight: 0.5, aliases: ['Little theorem formula'] },
          { concept: 'average jobs L, arrival rate lambda, residence time W', weight: 0.5, aliases: ['parameters definition'] },
        ],
      },
      {
        type: 'theory',
        question: 'State Amdahl Law and explain its implications on multi-core speedup limits.',
        options: [],
        correctAnswer: 'Amdahl Law states that Speedup = 1 / ((1 - P) + (P / N)), where P is the parallelizable fraction of the task and N is the number of processors. As N approaches infinity, maximum speedup is bounded by 1 / (1 - P), meaning the serial portion (1 - P) strictly limits overall performance gains.',
        gradingPoints: [
          { concept: 'Speedup formula Speedup = 1 / ((1-P) + P/N)', weight: 0.5, aliases: ['Amdahl equation'] },
          { concept: 'speedup is bounded by the sequential fraction 1 / (1-P)', weight: 0.5, aliases: ['serial bottleneck limits speedup'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Throughput, Response Time, and Utilization as performance metrics.',
        options: [],
        correctAnswer: 'Throughput is the number of tasks or requests completed per unit time (e.g., transactions per second). Response time (or latency) is the total elapsed time between request submission and complete response generation. Utilization is the fraction of time a resource is busy processing tasks.',
        gradingPoints: [
          { concept: 'throughput is requests completed per unit time', weight: 0.34, aliases: ['transactions per second', 'work rate'] },
          { concept: 'response time is latency from submission to completion', weight: 0.33, aliases: ['elapsed time', 'latency'] },
          { concept: 'utilization is percentage of time resource is active', weight: 0.33, aliases: ['busy time percentage', 'resource usage'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Operational Laws of computer systems, focusing on the Utilization Law and Forced Flow Law.',
        options: [],
        correctAnswer: 'The Utilization Law states that U_i = X * S_i (or U_i = X_i * S_i), meaning utilization of device i equals throughput multiplied by service demand. The Forced Flow Law states that X_i = V_i * X, meaning throughput at device i equals the visit count V_i times system throughput X.',
        gradingPoints: [
          { concept: 'Utilization Law: U_i = X * S_i', weight: 0.5, aliases: ['utilization equals throughput times service time'] },
          { concept: 'Forced Flow Law: X_i = V_i * X', weight: 0.5, aliases: ['device throughput equals visit ratio times system throughput'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Benchmarking in performance evaluation and compare synthetic benchmarks with real application workloads.',
        options: [],
        correctAnswer: 'Benchmarking measures system performance by running standardized workloads. Synthetic benchmarks (e.g., Dhrystone, Whetstone) stress specific hardware components using artificial loops. Real application workloads (e.g., TPC-C database benchmarks) execute real-world code representing actual business loads.',
        gradingPoints: [
          { concept: 'benchmarking measures performance under standardized workloads', weight: 0.4, aliases: ['comparative measurement'] },
          { concept: 'synthetic benchmarks test isolated components vs real workloads testing actual behavior', weight: 0.6, aliases: ['artificial vs real applications'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how Bottleneck Analysis identifies the primary performance-limiting resource in a queuing network.',
        options: [],
        correctAnswer: 'The bottleneck resource is the device with the highest service demand D_max = max(D_i). As system load increases, this device reaches 100% utilization first, placing an upper limit on maximum system throughput X_max = 1 / D_max and setting the asymptotic floor for response time.',
        gradingPoints: [
          { concept: 'bottleneck is device with maximum service demand D_max', weight: 0.5, aliases: ['highest service demand', 'reaches saturation first'] },
          { concept: 'maximum system throughput is bounded by 1 / D_max', weight: 0.5, aliases: ['X_max = 1/D_max', 'throughput ceiling'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Analytical Modeling, Simulation, and Measurement in performance evaluation.',
        options: [],
        correctAnswer: 'Analytical modeling uses mathematical equations (e.g., queueing theory) to provide fast, closed-form insights but requires simplifying assumptions. Simulation models detailed complex dynamics numerically but is computationally expensive. Measurement tests existing physical hardware directly, offering exact ground truth but requires an already-built system.',
        gradingPoints: [
          { concept: 'analytical modeling uses mathematical closed-form equations', weight: 0.34, aliases: ['queueing formulas', 'fast mathematical solutions'] },
          { concept: 'simulation executes software models numerically', weight: 0.33, aliases: ['discrete event simulation', 'computational modeling'] },
          { concept: 'measurement captures empirical data on physical hardware', weight: 0.33, aliases: ['telemetry', 'hardware counters', 'real benchmarking'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Workload Characterization and the technique of Principal Component Analysis (PCA) in workload data reduction.',
        options: [],
        correctAnswer: 'Workload characterization measures and clusters typical user requests into representative models. When workloads involve many correlated parameters, PCA transforms the original variables into a smaller set of uncorrelated principal components that retain most of the variance.',
        gradingPoints: [
          { concept: 'workload characterization quantifies representative user requests', weight: 0.5, aliases: ['measuring workload parameters', 'clustering workload'] },
          { concept: 'PCA reduces dimensionality while preserving variance', weight: 0.5, aliases: ['uncorrelated principal components', 'dimensionality reduction'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe 2^k Factorial Experimental Design used in computer system performance parameter tuning.',
        options: [],
        correctAnswer: 'A 2^k factorial design tests k factors each at two levels (low -1, high +1), requiring 2^k experimental runs. It allows evaluating not only the primary main effects of each parameter on performance, but also inter-factor interaction effects efficiently.',
        gradingPoints: [
          { concept: 'evaluates k factors at 2 levels across 2^k runs', weight: 0.5, aliases: ['k factors two levels', '2^k experiments'] },
          { concept: 'measures individual main effects and interaction effects', weight: 0.5, aliases: ['interaction terms', 'parameter interactions'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Confidence Interval estimation for performance metrics and why is Central Limit Theorem vital?',
        options: [],
        correctAnswer: 'A confidence interval [x_bar - delta, x_bar + delta] provides an estimated range likely to contain the true population mean at a specified level (e.g., 95%). The Central Limit Theorem guarantees that sample means are approximately normally distributed for large sample sizes, enabling valid interval calculations.',
        gradingPoints: [
          { concept: 'confidence interval provides probabilistic range around sample mean', weight: 0.5, aliases: ['margin of error', '95 percent confidence'] },
          { concept: 'Central Limit Theorem ensures sample mean normality for large n', weight: 0.5, aliases: ['CLT normality assumption'] },
        ],
      },
    ],
  },

  // 6. CSC 409: Introduction to Data Science
  {
    code: 'CSC 409',
    title: 'Introduction to Data Science',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the core stages of the Data Science Lifecycle from problem definition to model deployment.',
        options: [],
        correctAnswer: 'The lifecycle comprises: 1) Business/Problem Understanding. 2) Data Acquisition & Ingestion. 3) Data Cleaning & Preprocessing. 4) Exploratory Data Analysis (EDA). 5) Feature Engineering & Modeling. 6) Evaluation. 7) Deployment and continuous monitoring in production.',
        gradingPoints: [
          { concept: 'data acquisition, cleaning, and exploratory data analysis', weight: 0.5, aliases: ['data preparation', 'EDA'] },
          { concept: 'feature engineering, modeling, evaluation, and deployment', weight: 0.5, aliases: ['model training', 'deployment', 'monitoring'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the purpose of Exploratory Data Analysis (EDA) and mention three common statistical or visual tools used.',
        options: [],
        correctAnswer: 'EDA summarizes dataset main characteristics, detects outliers, reveals patterns, and validates assumptions before modeling. Common tools include histograms (distribution shape), scatter plots (correlation), box plots (quartiles and outlier detection), and correlation heatmaps.',
        gradingPoints: [
          { concept: 'discovers underlying patterns and detects outliers', weight: 0.5, aliases: ['summarize characteristics', 'detect anomalies'] },
          { concept: 'visual tools: box plots, histograms, scatter plots, heatmaps', weight: 0.5, aliases: ['visualizations', 'statistical plots'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain common techniques for handling Missing Data in a dataset: Listwise Deletion, Mean/Median Imputation, and KNN Imputation.',
        options: [],
        correctAnswer: 'Listwise deletion drops entire rows with missing values, risking bias if data is not missing completely at random. Mean/Median imputation replaces missing values with the column average/median, preserving row count but reducing variance. KNN imputation estimates missing values using weighted averages of nearest neighbor data points.',
        gradingPoints: [
          { concept: 'deletion drops rows vs simple imputation using mean/median', weight: 0.5, aliases: ['dropping rows', 'mean imputation'] },
          { concept: 'KNN imputation predicts missing values based on neighbor features', weight: 0.5, aliases: ['k-nearest neighbors imputation', 'advanced imputation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Normalization (Min-Max Scaling) and Standardization (Z-score Scaling).',
        options: [],
        correctAnswer: 'Normalization rescales features to a fixed range [0, 1] using (X - X_min) / (X_max - X_min), making it sensitive to outliers. Standardization transforms data to have zero mean and unit variance using (X - mu) / sigma, making it more robust to outliers and suitable for Gaussian algorithms.',
        gradingPoints: [
          { concept: 'normalization rescales features into fixed range [0, 1]', weight: 0.5, aliases: ['min-max scaling', 'bounded range'] },
          { concept: 'standardization centers data at mean 0 with variance 1', weight: 0.5, aliases: ['z-score scaling', 'unit variance'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Bias-Variance Tradeoff and describe Overfitting versus Underfitting.',
        options: [],
        correctAnswer: 'Bias is error from erroneous assumptions (underfitting, model is too simple). Variance is sensitivity to fluctuations in training data (overfitting, model captures noise). The tradeoff seeks optimal model complexity minimizing total error = Bias^2 + Variance + Irreducible Error.',
        gradingPoints: [
          { concept: 'high bias causes underfitting (too simple)', weight: 0.4, aliases: ['underfitting', 'oversimplified model'] },
          { concept: 'high variance causes overfitting (learns training noise)', weight: 0.4, aliases: ['overfitting', 'fails to generalize'] },
          { concept: 'total error balances bias squared and variance', weight: 0.2, aliases: ['optimal trade-off'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain k-Fold Cross-Validation and explain why it provides a more reliable performance estimate than a single train-test split.',
        options: [],
        correctAnswer: 'In k-fold cross-validation, the dataset is partitioned into k equal subsets. The model is trained on k-1 folds and tested on the remaining fold, repeating k times so every sample is used for validation once. This reduces sampling bias and variance compared to a single split.',
        gradingPoints: [
          { concept: 'partitions dataset into k folds, rotating validation set k times', weight: 0.5, aliases: ['k subsets', 'training k-1 testing on 1'] },
          { concept: 'averages performance to reduce variance and selection bias', weight: 0.5, aliases: ['reliable error estimate', 'avoids split bias'] },
        ],
      },
      {
        type: 'theory',
        question: 'Define the Confusion Matrix metrics: Accuracy, Precision, Recall, and F1-Score.',
        options: [],
        correctAnswer: 'Accuracy is (TP + TN) / Total. Precision is TP / (TP + FP), measuring accuracy of positive predictions. Recall (Sensitivity) is TP / (TP + FN), measuring ability to identify all actual positives. F1-Score is the harmonic mean: 2 * (Precision * Recall) / (Precision + Recall).',
        gradingPoints: [
          { concept: 'Precision: TP / (TP + FP); Recall: TP / (TP + FN)', weight: 0.5, aliases: ['positive predictive value', 'sensitivity'] },
          { concept: 'F1-Score is harmonic mean balancing Precision and Recall', weight: 0.5, aliases: ['F1 formula', 'balanced metric'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Supervised, Unsupervised, and Reinforcement Learning paradigms.',
        options: [],
        correctAnswer: 'Supervised learning trains on labeled data (inputs paired with ground truth targets) for regression or classification. Unsupervised learning discovers hidden patterns or clusters in unlabeled data. Reinforcement learning trains agents to maximize cumulative rewards through trial-and-error environment interaction.',
        gradingPoints: [
          { concept: 'supervised uses labeled target data', weight: 0.34, aliases: ['labeled pairs', 'classification/regression'] },
          { concept: 'unsupervised finds patterns in unlabeled data', weight: 0.33, aliases: ['clustering', 'dimensionality reduction'] },
          { concept: 'reinforcement learning optimizes actions via environment rewards', weight: 0.33, aliases: ['agent reward feedback', 'trial and error'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe One-Hot Encoding and explain the Dummy Variable Trap.',
        options: [],
        correctAnswer: 'One-hot encoding converts categorical variables into binary vectors where each category becomes a new column with 0 or 1. The Dummy Variable Trap occurs when all binary columns are included in linear models, causing perfect multicollinearity; it is solved by dropping one category column.',
        gradingPoints: [
          { concept: 'one-hot encoding converts categories into binary columns', weight: 0.5, aliases: ['binary indicator variables'] },
          { concept: 'dummy variable trap is multicollinearity resolved by dropping one column', weight: 0.5, aliases: ['multicollinearity', 'drop one dummy column'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss ethical concerns in Data Science, focusing on Algorithmic Bias and Data Privacy (e.g., GDPR).',
        options: [],
        correctAnswer: 'Algorithmic bias occurs when models perpetuate historical prejudices present in training data, producing unfair outcomes for marginalized groups. Data privacy regulations like GDPR mandate user consent, data minimization, right to explanation, and anonymization of personal identifiers.',
        gradingPoints: [
          { concept: 'algorithmic bias reflects historical bias in training datasets', weight: 0.5, aliases: ['unfair discrimination', 'model fairness'] },
          { concept: 'privacy frameworks like GDPR mandate consent and data anonymization', weight: 0.5, aliases: ['data privacy', 'GDPR compliance', 'anonymization'] },
        ],
      },
    ],
  },

  // 7. CSC 411: Data Mining Techniques
  {
    code: 'CSC 411',
    title: 'Data Mining Techniques',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the Apriori Algorithm for Association Rule Mining and state the Apriori Property.',
        options: [],
        correctAnswer: 'The Apriori algorithm mines frequent itemsets by level-wise candidate generation. The Apriori property (anti-monotonicity) states: all nonempty subsets of a frequent itemset must also be frequent. If an itemset is infrequent, all its supersets are pruned immediately.',
        gradingPoints: [
          { concept: 'level-wise candidate generation of frequent itemsets', weight: 0.5, aliases: ['frequent itemset mining', 'join and prune'] },
          { concept: 'Apriori property: all subsets of frequent itemset must be frequent', weight: 0.5, aliases: ['anti-monotonicity of support', 'prunes supersets'] },
        ],
      },
      {
        type: 'theory',
        question: 'Define Support, Confidence, and Lift in Association Rule evaluation: Rule A -> B.',
        options: [],
        correctAnswer: 'Support is P(A union B), the fraction of transactions containing both A and B. Confidence is P(B | A) = Support(A union B) / Support(A), measuring how often B appears when A is present. Lift is P(A union B) / (P(A) * P(B)), measuring independence (Lift > 1 indicates positive association).',
        gradingPoints: [
          { concept: 'Support: P(A and B); Confidence: P(B given A)', weight: 0.5, aliases: ['support and confidence formulas'] },
          { concept: 'Lift: ratio of observed joint occurrence to expected independent occurrence', weight: 0.5, aliases: ['Lift > 1 shows positive association', 'Lift formula'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Decision Tree construction using Information Gain (ID3) and Gini Impurity (CART).',
        options: [],
        correctAnswer: 'Decision trees partition data recursively by selecting the attribute maximizing purity. ID3 uses Information Gain = Entropy(parent) - sum(weighted Entropy(children)). CART uses Gini Impurity = 1 - sum(p_i^2), choosing splits that minimize Gini impurity.',
        gradingPoints: [
          { concept: 'ID3 selects splits maximizing Information Gain via entropy', weight: 0.5, aliases: ['entropy reduction', 'information gain formula'] },
          { concept: 'CART selects splits minimizing Gini Impurity', weight: 0.5, aliases: ['Gini index', '1 - sum(p_i^2)'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the K-Means clustering algorithm, including its objective function and limitations.',
        options: [],
        correctAnswer: 'K-Means partitions n points into k clusters by: 1) Initializing k centroids. 2) Assigning points to closest centroid. 3) Updating centroids to cluster means, iterating until convergence to minimize Sum of Squared Errors (SSE). Limitations: sensitive to initial seeds, assumes spherical clusters, sensitive to outliers.',
        gradingPoints: [
          { concept: 'iteratively assigns points to closest centroid and recomputes means', weight: 0.5, aliases: ['centroid assignment', 'minimizes SSE'] },
          { concept: 'limitations: sensitive to initialization, outliers, and non-globular shapes', weight: 0.5, aliases: ['assumes spherical clusters', 'outlier sensitive'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare K-Means clustering with Density-Based Clustering (DBSCAN).',
        options: [],
        correctAnswer: 'K-Means requires specifying k upfront, partitions all points into spherical clusters, and handles noise poorly. DBSCAN groups points based on density parameters (Eps and MinPts), discovers arbitrary shaped clusters, and automatically labels sparse points as noise/outliers.',
        gradingPoints: [
          { concept: 'K-Means requires k and assumes spherical clusters', weight: 0.5, aliases: ['partitioning clusterer', 'fixed k'] },
          { concept: 'DBSCAN finds arbitrary shapes and filters noise using density parameters', weight: 0.5, aliases: ['density based', 'Eps and MinPts', 'noise robust'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Hierarchical Clustering: differentiate Agglomerative (bottom-up) and Divisive (top-down) approaches.',
        options: [],
        correctAnswer: 'Agglomerative clustering starts with each object as a single cluster and iteratively merges the closest pairs based on linkage (single, complete, average) into a dendrogram. Divisive clustering starts with all objects in one cluster and recursively splits them into smaller clusters.',
        gradingPoints: [
          { concept: 'Agglomerative merges individual objects bottom-up', weight: 0.5, aliases: ['bottom-up merging', 'dendrogram tree'] },
          { concept: 'Divisive splits single cluster top-down', weight: 0.5, aliases: ['top-down partitioning'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Naive Bayes classification and the Naive Conditional Independence assumption.',
        options: [],
        correctAnswer: 'Naive Bayes applies Bayes theorem P(C | X) = P(X | C) * P(C) / P(X) to classify instances. The naive assumption states that all features X_1, X_2, ... X_n are mutually independent given class C, allowing P(X | C) = product(P(X_i | C)), which simplifies computation greatly.',
        gradingPoints: [
          { concept: 'Bayes Theorem P(C|X) = P(X|C)P(C) / P(X)', weight: 0.5, aliases: ['posterior probability formula'] },
          { concept: 'conditional independence assumption: features independent given class', weight: 0.5, aliases: ['naive assumption', 'product of probabilities'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the Curse of Dimensionality in data mining and how does it degrade distance-based algorithms?',
        options: [],
        correctAnswer: 'As feature dimensionality increases, the volume of space grows exponentially, making data sparse. Distance metrics (e.g., Euclidean distance) lose discriminative power because all points become nearly equidistant from one another, degrading algorithms like K-Means and k-NN.',
        gradingPoints: [
          { concept: 'exponential space growth causes data sparsity in high dimensions', weight: 0.5, aliases: ['high-dimensional sparsity'] },
          { concept: 'distance metrics become uniform/equidistant, degrading clustering', weight: 0.5, aliases: ['loss of distance contrast', 'affects k-NN and K-means'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Ensemble Learning methods: Bagging (Random Forest) vs. Boosting (AdaBoost/XGBoost).',
        options: [],
        correctAnswer: 'Bagging trains multiple independent models in parallel on bootstrap samples and averages predictions, primarily reducing variance (e.g., Random Forest). Boosting trains models sequentially, where each new model focuses on errors made by predecessors, primarily reducing bias.',
        gradingPoints: [
          { concept: 'Bagging trains models in parallel on bootstrap samples to reduce variance', weight: 0.5, aliases: ['Random Forest', 'bootstrap aggregating'] },
          { concept: 'Boosting trains models sequentially on residual errors to reduce bias', weight: 0.5, aliases: ['sequential learning', 'AdaBoost', 'XGBoost'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Outlier Detection techniques in data mining: Statistical, Distance-based, and Isolation Forest.',
        options: [],
        correctAnswer: 'Statistical methods flag points falling outside distribution tails (e.g., z-score > 3). Distance-based methods identify points whose distance to k-th nearest neighbors exceeds a threshold. Isolation Forest isolates anomalies by randomly partitioning feature space; outliers require fewer random splits to isolate.',
        gradingPoints: [
          { concept: 'statistical and distance-based outlier detection', weight: 0.5, aliases: ['z-score threshold', 'k-NN distance'] },
          { concept: 'Isolation Forest isolates anomalies with fewer tree partition splits', weight: 0.5, aliases: ['isolation tree depth', 'anomaly score'] },
        ],
      },
    ],
  },

  // 8. CSC 413: Distributed, Parallel and Cloud Computing
  {
    code: 'CSC 413',
    title: 'Distributed, Parallel and Cloud Computing',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the CAP Theorem and its implications for distributed database design.',
        options: [],
        correctAnswer: 'The CAP theorem states that a distributed data store can guarantee at most two of: Consistency (all nodes see latest data simultaneously), Availability (every non-failing node returns a response), and Partition Tolerance (system continues functioning despite dropped network messages). Since network partitions are inevitable in real networks, systems must choose between CP and AP.',
        gradingPoints: [
          { concept: 'Consistency, Availability, and Partition Tolerance definitions', weight: 0.5, aliases: ['CAP components'] },
          { concept: 'network partitions force trade-off between Consistency (CP) and Availability (AP)', weight: 0.5, aliases: ['CP vs AP tradeoff'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare IaaS, PaaS, and SaaS cloud service delivery models with industry examples.',
        options: [],
        correctAnswer: 'IaaS (Infrastructure as a Service) provides virtualized computing, storage, and networking (e.g., AWS EC2, GCP Compute Engine). PaaS (Platform as a Service) provides managed runtimes and tools for developers without server management (e.g., Heroku, AWS Elastic Beanstalk). SaaS (Software as a Service) delivers end-user applications over the web (e.g., Google Workspace, Office 365).',
        gradingPoints: [
          { concept: 'IaaS manages hardware/VMs; PaaS manages developer runtimes', weight: 0.5, aliases: ['infrastructure vs platform'] },
          { concept: 'SaaS provides complete user-facing applications over web', weight: 0.5, aliases: ['software as a service', 'end-user apps'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Remote Procedure Call (RPC) mechanism and the role of Client/Server Stubs.',
        options: [],
        correctAnswer: 'RPC allows a program to execute subroutines on a remote computer as if local. The Client Stub marshals (serializes) parameters into a message payload and transmits it over the network. The Server Stub unmarshals parameters, invokes the local procedure, and marshals return values back to the client.',
        gradingPoints: [
          { concept: 'transparent execution of remote procedure as local', weight: 0.4, aliases: ['local-feel remote execution'] },
          { concept: 'client and server stubs handle marshalling and unmarshalling', weight: 0.6, aliases: ['parameter serialization', 'stubs'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the MapReduce distributed programming model using Word Count as an example.',
        options: [],
        correctAnswer: 'MapReduce processes big data across clusters. The Map phase transforms input splits into key-value pairs (e.g., (word, 1)). The Shuffle/Sort phase groups pairs by key across cluster nodes. The Reduce phase aggregates values for each key (e.g., summing counts for each distinct word).',
        gradingPoints: [
          { concept: 'Map phase outputs intermediate key-value pairs', weight: 0.34, aliases: ['mapping function'] },
          { concept: 'Shuffle/Sort phase redistributes by key', weight: 0.33, aliases: ['grouping by key'] },
          { concept: 'Reduce phase aggregates values per key', weight: 0.33, aliases: ['reduction function', 'aggregation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Raft Consensus Algorithm: node roles (Leader, Follower, Candidate) and the election process.',
        options: [],
        correctAnswer: 'In Raft, nodes are in one of three states: Follower, Candidate, or Leader. If a Follower receives no heartbeat within an election timeout, it becomes a Candidate, increments the term, and requests votes. If it secures a majority vote, it becomes Leader, managing log replication and sending periodic heartbeats to maintain authority.',
        gradingPoints: [
          { concept: 'Follower, Candidate, and Leader states', weight: 0.5, aliases: ['three node roles'] },
          { concept: 'election timeout triggers vote request; majority vote wins leadership', weight: 0.5, aliases: ['leader election', 'heartbeats'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Shared Memory (OpenMP) and Distributed Memory (MPI) parallel computing models.',
        options: [],
        correctAnswer: 'Shared Memory models (e.g., OpenMP) run on multi-core systems sharing a single global address space, communicating via threads and shared variables with synchronization primitives like mutexes. Distributed Memory models (e.g., MPI) connect independent nodes across networks, communicating exclusively through explicit message-passing protocols.',
        gradingPoints: [
          { concept: 'shared memory (OpenMP) shares global address space via threads', weight: 0.5, aliases: ['multi-threaded', 'shared address space'] },
          { concept: 'distributed memory (MPI) uses explicit network message passing', weight: 0.5, aliases: ['message passing interface', 'separate address spaces'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Lamport Logical Clocks and the Happens-Before relation (->) in distributed systems.',
        options: [],
        correctAnswer: 'Lamport clocks order events without physical synchronized time. The Happens-Before relation states: 1) If a and b are in the same process and a occurs before b, then a -> b. 2) If a is message send and b is message receive, then a -> b. 3) Transitivity holds. Each process increments its clock on internal events and updates C = max(C_local, C_msg) + 1 on receiving messages.',
        gradingPoints: [
          { concept: 'Happens-Before relation rules for ordering events', weight: 0.5, aliases: ['a -> b relation', 'causal ordering'] },
          { concept: 'clock update rule: max(local, received) + 1', weight: 0.5, aliases: ['logical timestamp algorithm'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cloud Virtualization: compare Type 1 (Bare-Metal) vs. Type 2 (Hosted) Hypervisors, and containerization (Docker).',
        options: [],
        correctAnswer: 'Type 1 hypervisors (e.g., VMware ESXi, KVM) run directly on physical hardware for high performance. Type 2 hypervisors (e.g., VirtualBox) run on a host operating system. Containers (Docker) share the host OS kernel and isolate user spaces, providing lightweight, rapid startup compared to full VMs.',
        gradingPoints: [
          { concept: 'Type 1 runs directly on hardware vs Type 2 on host OS', weight: 0.5, aliases: ['bare-metal vs hosted hypervisor'] },
          { concept: 'containers share host kernel for lightweight isolation', weight: 0.5, aliases: ['Docker containerization', 'OS-level virtualization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Two-Phase Commit (2PC) protocol for distributed transactions and discuss its blocking limitation.',
        options: [],
        correctAnswer: '2PC ensures atomic commit across nodes. Phase 1 (Prepare): Coordinator asks all cohorts to prepare; cohorts vote YES or NO. Phase 2 (Commit/Abort): If all vote YES, Coordinator broadcasts COMMIT; otherwise ABORT. Limitation: If coordinator fails after cohorts vote YES, cohorts remain blocked waiting indefinitely.',
        gradingPoints: [
          { concept: 'Phase 1 prepare/vote and Phase 2 commit/abort', weight: 0.5, aliases: ['prepare phase', 'commit phase'] },
          { concept: 'blocking limitation if coordinator crashes during commit', weight: 0.5, aliases: ['coordinator single point of failure', 'blocking protocol'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Edge Computing vs. Cloud Computing: trade-offs in latency, bandwidth, and security.',
        options: [],
        correctAnswer: 'Cloud computing centralizes storage and computing in remote mega-datacenters, offering massive scalability but incurring network latency and high bandwidth transmission costs. Edge computing processes data locally near devices (e.g., IoT nodes), providing ultra-low latency, reducing network bandwidth, and enhancing data privacy.',
        gradingPoints: [
          { concept: 'cloud provides centralized massive computing but higher latency', weight: 0.5, aliases: ['centralized datacenters', 'scale'] },
          { concept: 'edge processes data locally for ultra-low latency and bandwidth savings', weight: 0.5, aliases: ['near-device processing', 'low latency IoT'] },
        ],
      },
    ],
  },

  // 9. CSC 497: Final Year Project 1
  {
    code: 'CSC 497',
    title: 'Final Year Project 1',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'What are the essential chapters and components of a B.Sc. Final Year Project Proposal in Computer Science?',
        options: [],
        correctAnswer: 'The project proposal must include: Title, Abstract/Summary, Background of Study, Problem Statement, Aims and Objectives, Scope and Limitations, Significance of Study, Literature Review, Methodology/System Design, and Project Timeline/Gantt Chart.',
        gradingPoints: [
          { concept: 'problem statement, aims, objectives, and scope', weight: 0.5, aliases: ['research questions', 'project objectives'] },
          { concept: 'literature review, methodology, and timeline/Gantt chart', weight: 0.5, aliases: ['system design', 'work schedule'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how to formulate a compelling Problem Statement for an applied computing project.',
        options: [],
        correctAnswer: 'A problem statement outlines the existing real-world deficit or inefficiency, explains why current manual or legacy computerized systems fall short, details the consequences of not addressing the issue, and highlights the proposed computational intervention.',
        gradingPoints: [
          { concept: 'articulates existing deficit and limitations of current solutions', weight: 0.5, aliases: ['current problem', 'legacy system gaps'] },
          { concept: 'demonstrates consequences and justifies software solution', weight: 0.5, aliases: ['impact of problem', 'technical solution rationale'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the IEEE 830 System Requirements Specification (SRS) document structure.',
        options: [],
        correctAnswer: 'An IEEE SRS contains: 1) Introduction (purpose, scope, definitions). 2) Overall Description (product perspective, user classes, operating environment, design constraints). 3) Specific Requirements (functional requirements, non-functional performance/security requirements, external interface requirements).',
        gradingPoints: [
          { concept: 'overall description and operating constraints', weight: 0.5, aliases: ['product perspective', 'user classes'] },
          { concept: 'detailed functional, non-functional, and interface requirements', weight: 0.5, aliases: ['functional requirements', 'system attributes'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the TELOS Feasibility Study model used in project requirement engineering.',
        options: [],
        correctAnswer: 'TELOS evaluates feasibility across: Technical (availability of technical expertise, hardware, software), Economic (cost-benefit analysis and budget), Legal (compliance with copyright and privacy laws), Operational (suitability for end users), and Schedule (ability to deliver within academic deadlines).',
        gradingPoints: [
          { concept: 'Technical, Economic, Legal, Operational, Schedule', weight: 1.0, aliases: ['TELOS criteria breakdown'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Functional Requirements with Non-Functional Requirements, providing two examples of each for a mobile app.',
        options: [],
        correctAnswer: 'Functional requirements specify what behaviors and features the system must perform (e.g., user authentication, submitting quiz answers). Non-functional requirements specify quality attributes and constraints (e.g., response time under 2 seconds, 256-bit AES encryption of stored passwords).',
        gradingPoints: [
          { concept: 'functional: specific features and operations the system executes', weight: 0.5, aliases: ['user actions', 'features'] },
          { concept: 'non-functional: operational qualities like performance, security, reliability', weight: 0.5, aliases: ['system qualities', 'constraints'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between System Architecture Diagrams and Unified Modeling Language (UML) Use Case Diagrams.',
        options: [],
        correctAnswer: 'System Architecture Diagrams depict structural topology and physical/logical components (e.g., client tier, API gateway, database cluster). UML Use Case diagrams depict functional interactions between external actors and system boundaries, highlighting functional capabilities.',
        gradingPoints: [
          { concept: 'architecture diagram shows physical/logical component topology', weight: 0.5, aliases: ['high-level system structure', 'component diagram'] },
          { concept: 'use case diagram captures interactions between actors and use cases', weight: 0.5, aliases: ['actor goals', 'functional boundary'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how to design an Entity-Relationship (ER) Diagram and normalize it to Third Normal Form (3NF).',
        options: [],
        correctAnswer: 'An ER diagram models entities, attributes, and relationships. Normalization to 3NF involves: 1NF (atomic attributes, no repeating groups), 2NF (1NF plus no partial dependencies on composite keys), and 3NF (2NF plus no transitive dependencies between non-key attributes).',
        gradingPoints: [
          { concept: 'ER diagram models entities, keys, and cardinalities', weight: 0.4, aliases: ['entity relationships', 'relational schema'] },
          { concept: '1NF atomic, 2NF no partial dependencies, 3NF no transitive dependencies', weight: 0.6, aliases: ['normalization steps', '1NF 2NF 3NF'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Version Control best practices (Git) in individual and collaborative student software projects.',
        options: [],
        correctAnswer: 'Best practices include: making atomic commits with descriptive commit messages, using feature branches rather than committing directly to main, maintaining a clear .gitignore for secrets and build artifacts, and tagging releases or defense-ready milestones.',
        gradingPoints: [
          { concept: 'meaningful atomic commits and feature branching', weight: 0.5, aliases: ['Git branching workflow', 'commit messages'] },
          { concept: 'ignoring build artifacts and tagging release milestones', weight: 0.5, aliases: ['.gitignore', 'milestone tags'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are the main criteria used by examiners during the Stage 1 Final Year Project Oral Defense?',
        options: [],
        correctAnswer: 'Examiners evaluate: clarity and justification of problem statement, mastery of relevant theoretical literature, appropriateness of chosen methodology/architecture, progress demonstrated in prototype implementation, and ability to defend technical decisions under questioning.',
        gradingPoints: [
          { concept: 'clarity of problem statement and literature mastery', weight: 0.5, aliases: ['understanding of problem', 'literature foundation'] },
          { concept: 'technical methodology, prototype progress, and defense performance', weight: 0.5, aliases: ['system design', 'answering questions', 'prototype demo'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Unit Testing and Integration Testing prior to the final project software demonstration.',
        options: [],
        correctAnswer: 'Unit testing verifies that individual functions, classes, or modules operate correctly in isolation. Integration testing verifies that combined modules and external interfaces (e.g., API backend with mobile frontend and database) interact without data corruption or communication errors.',
        gradingPoints: [
          { concept: 'unit testing verifies individual functions in isolation', weight: 0.5, aliases: ['component testing', 'isolated function tests'] },
          { concept: 'integration testing verifies inter-module and API communication', weight: 0.5, aliases: ['subsystem integration', 'end-to-end tests'] },
        ],
      },
    ],
  },

  // 10. INS 401: Project Management
  {
    code: 'INS 401',
    title: 'Project Management',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define the Project Management Triple Constraint (Iron Triangle) and explain how changes to one constraint impact the others.',
        options: [],
        correctAnswer: 'The Triple Constraint consists of Scope, Time, and Cost, bounding Project Quality. Expanding scope without adding time or budget compromises quality or causes delays. Shortening deadlines requires increasing cost (e.g., more staff) or reducing project scope.',
        gradingPoints: [
          { concept: 'Scope, Time, and Cost bounding Quality', weight: 0.5, aliases: ['Iron Triangle dimensions'] },
          { concept: 'altering one constraint inevitably forces trade-offs on others', weight: 0.5, aliases: ['trade-off dynamics', 'cost/time/scope balancing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the five Project Management Process Groups outlined in the PMBOK guide.',
        options: [],
        correctAnswer: 'The PMBOK process groups are: 1) Initiating (defining and authorizing the project). 2) Planning (establishing scope, schedule, and cost baselines). 3) Executing (completing work defined in plan). 4) Monitoring & Controlling (tracking progress and managing changes). 5) Closing (formal sign-off and retrospective).',
        gradingPoints: [
          { concept: 'Initiating, Planning, Executing', weight: 0.5, aliases: ['first three phases'] },
          { concept: 'Monitoring & Controlling, and Closing', weight: 0.5, aliases: ['tracking and project closing'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Work Breakdown Structure (WBS) and why is it foundational in project planning?',
        options: [],
        correctAnswer: 'A WBS is a hierarchical decomposition of the total project scope into manageable deliverables and work packages. It establishes clear accountability, provides the basis for cost and duration estimation, and prevents scope creep via the 100% rule.',
        gradingPoints: [
          { concept: 'hierarchical decomposition of total scope into work packages', weight: 0.5, aliases: ['deliverable breakdown', 'work packages'] },
          { concept: 'basis for scheduling, cost estimation, and preventing scope creep', weight: 0.5, aliases: ['100 percent rule', 'estimation baseline'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Critical Path Method (CPM) and how Earliest Start (ES), Latest Start (LS), and Float/Slack are calculated.',
        options: [],
        correctAnswer: 'CPM identifies the longest sequence of dependent activities determining the minimum project duration. A forward pass computes Earliest Start and Finish. A backward pass computes Latest Start and Finish. Float = LS - ES. Activities with zero float lie on the Critical Path; any delay on them delays the entire project.',
        gradingPoints: [
          { concept: 'critical path is longest path determining minimum project duration', weight: 0.5, aliases: ['longest dependent sequence'] },
          { concept: 'forward/backward pass calculates zero float activities', weight: 0.5, aliases: ['LS - ES = 0', 'zero slack'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between the Critical Path Method (CPM) and the Project Evaluation and Review Technique (PERT).',
        options: [],
        correctAnswer: 'CPM is deterministic, assuming known task durations. PERT is probabilistic, accounting for uncertainty using three time estimates: Optimistic (O), Most Likely (M), and Pessimistic (P), calculating expected duration as TE = (O + 4M + P) / 6 and variance as ((P - O) / 6)^2.',
        gradingPoints: [
          { concept: 'CPM uses deterministic fixed durations', weight: 0.4, aliases: ['deterministic approach'] },
          { concept: 'PERT uses three weighted probabilistic estimates: (O + 4M + P) / 6', weight: 0.6, aliases: ['probabilistic duration formula', 'PERT beta distribution'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Traditional (Waterfall) Project Management with Agile (Scrum) Project Management.',
        options: [],
        correctAnswer: 'Waterfall is linear and plan-driven, locking scope upfront with comprehensive documentation, suitable for fixed requirements. Agile/Scrum is empirical and iterative, delivering working increments in short sprints (1-4 weeks), welcoming changing requirements and continuous stakeholder feedback.',
        gradingPoints: [
          { concept: 'Waterfall is linear, sequential, and plan-driven', weight: 0.5, aliases: ['rigid phase gates', 'upfront planning'] },
          { concept: 'Agile/Scrum is iterative with sprint cycles and evolving requirements', weight: 0.5, aliases: ['sprint cycles', 'continuous feedback'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Risk Management lifecycle: Risk Identification, Qualitative/Quantitative Assessment, Response Planning, and Monitoring.',
        options: [],
        correctAnswer: 'Risk management involves: 1) Identification (logging potential events in a risk register). 2) Qualitative/Quantitative analysis (evaluating Probability x Impact). 3) Response planning (Avoidance, Mitigation, Transfer, Acceptance). 4) Continuous monitoring to reassess risk triggers throughout project execution.',
        gradingPoints: [
          { concept: 'identification and probability-impact assessment', weight: 0.5, aliases: ['risk register', 'probability and impact matrix'] },
          { concept: 'response strategies: Avoid, Mitigate, Transfer, Accept', weight: 0.5, aliases: ['risk mitigation plans'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Earned Value Management (EVM)? Define Planned Value (PV), Earned Value (EV), and Cost Variance (CV).',
        options: [],
        correctAnswer: 'EVM integrates scope, time, and cost to assess project performance. Planned Value (PV) is the budgeted cost for work scheduled. Earned Value (EV) is the budgeted cost for work actually accomplished. Cost Variance (CV) = EV - AC (Actual Cost); CV < 0 indicates cost overrun.',
        gradingPoints: [
          { concept: 'EVM integrates scope, schedule, and cost performance', weight: 0.4, aliases: ['project tracking methodology'] },
          { concept: 'PV planned budget, EV accomplished value, and CV = EV - AC', weight: 0.6, aliases: ['cost variance formula', 'EV metrics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the purpose and components of a Project Charter.',
        options: [],
        correctAnswer: 'A project charter is the formal document authorizing a project and giving the project manager authority to commit organizational resources. It outlines the project purpose, high-level objectives, key stakeholders, initial budget, timeline boundaries, and success criteria.',
        gradingPoints: [
          { concept: 'formally authorizes project and empowers project manager', weight: 0.5, aliases: ['authorization document', 'sponsor approval'] },
          { concept: 'defines objectives, high-level budget, timeline, and stakeholders', weight: 0.5, aliases: ['scope boundaries', 'stakeholder roles'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Stakeholder Management: how does a Power-Interest Grid assist in stakeholder communication planning?',
        options: [],
        correctAnswer: 'A Power-Interest Grid classifies stakeholders by power and interest: High Power / High Interest (Manage Closely), High Power / Low Interest (Keep Satisfied), Low Power / High Interest (Keep Informed), and Low Power / Low Interest (Monitor with minimal effort), optimizing communication resources.',
        gradingPoints: [
          { concept: 'classifies stakeholders by power and interest', weight: 0.5, aliases: ['matrix classification'] },
          { concept: 'manage closely, keep satisfied, keep informed, monitor strategies', weight: 0.5, aliases: ['four quadrants communication strategy'] },
        ],
      },
    ],
  },

  // =========================================================================
  // 400 LEVEL RAIN SEMESTER
  // =========================================================================

  // 11. CSC 402: Research Methodology & Project Proposal
  {
    code: 'CSC 402',
    title: 'Research Methodology & Project Proposal',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'What is the purpose of a Literature Review in academic research?',
        options: [],
        correctAnswer: 'A literature review synthesizes existing research, identifies gaps in current knowledge, prevents duplication, and establishes the theoretical framework and justification for the proposed study.',
        gradingPoints: [
          { concept: 'Synthesizes existing research', weight: 0.5, aliases: ['summarizes prior work', 'evaluates literature'] },
          { concept: 'Identifies gaps in knowledge', weight: 0.5, aliases: ['research gap', 'justification'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Quantitative and Qualitative research methodologies in computer science.',
        options: [],
        correctAnswer: 'Quantitative research uses numerical data, benchmarks, and statistical analysis to test hypotheses. Qualitative research explores non-numerical data like user interviews or case studies to understand experiences and behavioral patterns.',
        gradingPoints: [
          { concept: 'Quantitative uses numerical data and metrics', weight: 0.5, aliases: ['statistics', 'benchmarking'] },
          { concept: 'Qualitative explores non-numerical concepts', weight: 0.5, aliases: ['interviews', 'user experiences'] },
        ],
      },
      {
        type: 'theory',
        question: 'Why is Academic Integrity important and how is Plagiarism prevented?',
        options: [],
        correctAnswer: 'Academic integrity ensures honesty, reliability, and proper attribution. Plagiarism is prevented through standard citation conventions (e.g., IEEE, APA) and writing ideas in one original words with attribution.',
        gradingPoints: [
          { concept: 'Honesty and credit to original authors', weight: 0.5, aliases: ['academic integrity', 'ethical attribution'] },
          { concept: 'Proper citation standards prevent plagiarism', weight: 0.5, aliases: ['referencing', 'IEEE format'] },
        ],
      },
      {
        type: 'theory',
        question: 'How do you formulate a Research Problem Statement using SMART objectives?',
        options: [],
        correctAnswer: 'A problem statement articulates a specific inefficiency or knowledge deficit. SMART objectives ensure research goals are Specific, Measurable, Achievable, Relevant, and Time-bound.',
        gradingPoints: [
          { concept: 'Clearly defines the issue or inefficiency', weight: 0.3, aliases: ['problem statement'] },
          { concept: 'Specific, Measurable, Achievable, Relevant, Time-bound', weight: 0.7, aliases: ['SMART objectives'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Primary and Secondary data collection methods.',
        options: [],
        correctAnswer: 'Primary data is collected firsthand by the researcher for the specific study (e.g., benchmarks, user logs). Secondary data is pre-existing data published by third parties (e.g., open datasets, repositories).',
        gradingPoints: [
          { concept: 'Primary data is collected firsthand', weight: 0.5, aliases: ['original experiments', 'surveys'] },
          { concept: 'Secondary data is pre-existing', weight: 0.5, aliases: ['published datasets', 'literature data'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Experimental Design in validating computational algorithms.',
        options: [],
        correctAnswer: 'Experimental design defines independent variables (e.g., input size, hardware specs) and dependent variables (runtime, memory usage), ensuring repeatable, controlled tests that isolate algorithmic performance from external noise.',
        gradingPoints: [
          { concept: 'defines independent and dependent variables', weight: 0.5, aliases: ['variable control', 'metrics'] },
          { concept: 'ensures repeatability and isolates algorithmic factors', weight: 0.5, aliases: ['controlled environment', 'repeatable experiments'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Peer Review and why is it vital in scholarly dissemination?',
        options: [],
        correctAnswer: 'Peer review subjects research to independent expert scrutiny before publication, checking methodology, theoretical validity, originality, and significance to filter out flawed claims.',
        gradingPoints: [
          { concept: 'independent expert scrutiny', weight: 0.5, aliases: ['blind review', 'referee evaluation'] },
          { concept: 'validates methodology, originality, and significance', weight: 0.5, aliases: ['quality filter', 'scholarly rigor'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Gantt Chart and its purpose in project proposal scheduling.',
        options: [],
        correctAnswer: 'A Gantt chart is a horizontal bar chart illustrating project schedules over time, showing task start dates, durations, milestones, and dependencies to manage deadlines.',
        gradingPoints: [
          { concept: 'bar chart illustrating task schedules and durations', weight: 0.5, aliases: ['timeline visualization'] },
          { concept: 'tracks milestones and inter-task dependencies', weight: 0.5, aliases: ['dependencies', 'deadline tracking'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how Research Ethics applies to Human-Subject Usability Studies in software development.',
        options: [],
        correctAnswer: 'Ethics requires obtaining informed consent, ensuring participant privacy and data anonymity, avoiding coercion, and allowing subjects to withdraw at any time without penalty.',
        gradingPoints: [
          { concept: 'informed consent and voluntary participation', weight: 0.5, aliases: ['consent forms', 'voluntary'] },
          { concept: 'participant privacy, data anonymity, and right to withdraw', weight: 0.5, aliases: ['confidentiality', 'anonymized data'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Deductive and Inductive research approaches.',
        options: [],
        correctAnswer: 'Deductive research starts with an existing theory, derives testable hypotheses, and analyzes data to confirm or refute them (top-down). Inductive research begins with specific empirical observations and builds generalized theories (bottom-up).',
        gradingPoints: [
          { concept: 'Deductive: theory to hypothesis to confirmation (top-down)', weight: 0.5, aliases: ['hypothesis testing', 'top-down'] },
          { concept: 'Inductive: observation to pattern to tentative theory (bottom-up)', weight: 0.5, aliases: ['pattern discovery', 'bottom-up'] },
        ],
      },
    ],
  },

  // 12. CSC 404: Net-Centric Computing & Wireless Networks
  {
    code: 'CSC 404',
    title: 'Net-Centric Computing & Wireless Networks',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Map the OSI 7-Layer Model to the TCP/IP 4-Layer Architecture.',
        options: [],
        correctAnswer: 'OSI Application, Presentation, and Session map to TCP/IP Application. OSI Transport maps to TCP/IP Transport. OSI Network maps to TCP/IP Internet. OSI Data Link and Physical map to TCP/IP Network Access.',
        gradingPoints: [
          { concept: 'Application layers map to TCP/IP Application', weight: 0.34, aliases: ['Application Presentation Session'] },
          { concept: 'Transport to Transport, Network to Internet', weight: 0.33, aliases: ['Transport and Internet layers'] },
          { concept: 'Data Link and Physical to Network Access', weight: 0.33, aliases: ['Link layer', 'Physical layer'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare TCP vs. UDP transport protocols in terms of reliability, connection state, and overhead.',
        options: [],
        correctAnswer: 'TCP is connection-oriented, provides reliable ordered delivery with flow/congestion control, but has higher latency and overhead. UDP is connectionless, unreliable, and minimal-overhead, ideal for real-time streaming and gaming.',
        gradingPoints: [
          { concept: 'TCP is connection-oriented, reliable, and ordered', weight: 0.5, aliases: ['3-way handshake', 'flow control'] },
          { concept: 'UDP is connectionless, unordered, and low latency', weight: 0.5, aliases: ['fast streaming', 'minimal overhead'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Wi-Fi collision avoidance via CSMA/CA and the RTS/CTS mechanism for the hidden terminal problem.',
        options: [],
        correctAnswer: 'CSMA/CA avoids collisions by carrier sensing and random backoff before transmitting. RTS/CTS (Request to Send / Clear to Send) reserves channel space so hidden nodes out of hearing range of the sender respect the transmission window.',
        gradingPoints: [
          { concept: 'CSMA/CA listens before transmitting with random backoff', weight: 0.5, aliases: ['carrier sensing', 'collision avoidance'] },
          { concept: 'RTS/CTS solves hidden terminal problem by reserving channel', weight: 0.5, aliases: ['hidden node solution', 'handshake reservation'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is NAT (Network Address Translation) and why is IPv4 to IPv6 migration essential?',
        options: [],
        correctAnswer: 'NAT maps private local IP addresses to public IPs, conserving address space. IPv6 migration is essential because IPv4 32-bit address space is exhausted; IPv6 offers 128-bit addresses, built-in security (IPsec), and auto-configuration.',
        gradingPoints: [
          { concept: 'NAT translates private IP to public IP to conserve space', weight: 0.5, aliases: ['private to public translation'] },
          { concept: 'IPv6 128-bit address space resolves IPv4 exhaustion', weight: 0.5, aliases: ['128-bit addresses', 'IPv4 depletion'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe key 5G Cellular Architecture concepts: Network Slicing and Massive MIMO.',
        options: [],
        correctAnswer: 'Network Slicing creates virtualized, isolated end-to-end networks over shared physical infrastructure for specific QoS demands. Massive MIMO deploys large antenna arrays to focus directional radio beams, multiplying capacity and data throughput.',
        gradingPoints: [
          { concept: 'Network Slicing creates dedicated virtual networks', weight: 0.5, aliases: ['isolated virtual networks', 'QoS slicing'] },
          { concept: 'Massive MIMO uses antenna arrays for spatial beamforming', weight: 0.5, aliases: ['beamforming', 'multi-antenna capacity'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Mobile IP operation: Home Agent, Foreign Agent, and Care-of Address.',
        options: [],
        correctAnswer: 'Mobile IP allows mobile nodes to maintain continuous IP connectivity. When moving away from its Home Agent, a node registers a Care-of Address with a Foreign Agent. The Home Agent tunnels packets to the Care-of Address using encapsulation.',
        gradingPoints: [
          { concept: 'Home Agent and Foreign Agent maintain node connectivity', weight: 0.5, aliases: ['mobility agents'] },
          { concept: 'Care-of Address and packet tunneling encapsulation', weight: 0.5, aliases: ['packet tunneling', 'Care-of Address'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe routing protocols in Wireless Sensor Networks (WSNs): LEACH clustering protocol.',
        options: [],
        correctAnswer: 'LEACH (Low-Energy Adaptive Clustering Hierarchy) organizes sensor nodes into local clusters, rotating cluster heads periodically to distribute energy consumption evenly and aggregate sensor readings before transmitting to the base station.',
        gradingPoints: [
          { concept: 'rotates cluster head roles to distribute energy usage', weight: 0.5, aliases: ['energy distribution', 'cluster head rotation'] },
          { concept: 'aggregates data locally before base station transmission', weight: 0.5, aliases: ['data aggregation', 'sensor energy conservation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Software-Defined Networking (SDN) and the separation of Control Plane from Data Plane.',
        options: [],
        correctAnswer: 'SDN decouples the Control Plane (routing decisions, policy logic) from the Data Plane (packet forwarding hardware). A centralized software controller programs forwarding tables in network switches using protocols like OpenFlow.',
        gradingPoints: [
          { concept: 'separates Control Plane logic from Data Plane forwarding', weight: 0.5, aliases: ['decoupling control and forwarding'] },
          { concept: 'centralized software controller programs switches via OpenFlow', weight: 0.5, aliases: ['OpenFlow controller', 'programmable network'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Bluetooth (IEEE 802.15.1) architecture: Piconet and Scatternet topology.',
        options: [],
        correctAnswer: 'A Piconet consists of one master device and up to seven active slave devices. A Scatternet is formed by interconnecting multiple piconets, where a node acts as a slave in one piconet and a master in another.',
        gradingPoints: [
          { concept: 'Piconet has 1 master and up to 7 active slaves', weight: 0.5, aliases: ['master-slave piconet'] },
          { concept: 'Scatternet interconnects multiple overlapping piconets', weight: 0.5, aliases: ['interconnected piconets'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss security vulnerabilities in Wireless LANs: WEP vs. WPA2 vs. WPA3.',
        options: [],
        correctAnswer: 'WEP is critically flawed due to weak RC4 encryption and small IVs. WPA2 uses AES with CCMP but is vulnerable to KRACK four-way handshake attacks. WPA3 introduces SAE (Simultaneous Authentication of Equals) preventing offline dictionary attacks.',
        gradingPoints: [
          { concept: 'WEP is insecure; WPA2 uses AES-CCMP', weight: 0.5, aliases: ['WEP IV weakness', 'WPA2 AES encryption'] },
          { concept: 'WPA3 introduces SAE resisting offline dictionary attacks', weight: 0.5, aliases: ['WPA3 SAE handshake', 'forward secrecy'] },
        ],
      },
    ],
  },

  // 13. CSC 406: Formal Methods in Software Development
  {
    code: 'CSC 406',
    title: 'Formal Methods in Software Development',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain Formal Specifications and Hoare Logic triples {P} C {Q}.',
        options: [],
        correctAnswer: 'Formal specifications mathematically define software behavior. A Hoare triple {P} C {Q} asserts that if precondition P holds before command C executes, and C terminates, postcondition Q will hold upon termination.',
        gradingPoints: [
          { concept: 'mathematical specification of program behavior', weight: 0.5, aliases: ['formal verification'] },
          { concept: 'Hoare triple: precondition P, command C, postcondition Q', weight: 0.5, aliases: ['precondition postcondition semantics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Model Checking with Automated Theorem Proving.',
        options: [],
        correctAnswer: 'Model checking exhaustively explores finite state spaces to verify temporal logic properties automatically, producing counterexamples on failure. Theorem proving uses formal logic deductions, handling infinite state spaces but requiring human guidance.',
        gradingPoints: [
          { concept: 'Model checking: automatic exhaustive search on finite states', weight: 0.5, aliases: ['exhaustive state exploration', 'counterexample generation'] },
          { concept: 'Theorem proving: deductive mathematical proofs on infinite states', weight: 0.5, aliases: ['deductive proof', 'infinite state spaces'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Z Notation state schemas and explain the signature versus state invariant.',
        options: [],
        correctAnswer: 'In Z Notation, a schema models state and operations. The signature declares state variables and types above the divider line. The state invariant below the line specifies logical predicates that must always hold across all states.',
        gradingPoints: [
          { concept: 'signature declares variables and their types', weight: 0.5, aliases: ['variable declarations'] },
          { concept: 'state invariant defines constraints and logical predicates', weight: 0.5, aliases: ['predicates', 'system invariant'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are Loop Invariants and Loop Variants in proving program correctness?',
        options: [],
        correctAnswer: 'A Loop Invariant is an assertion that remains true before and after each loop iteration, establishing partial correctness. A Loop Variant is an integer expression that strictly decreases each iteration and is bounded below, proving loop termination.',
        gradingPoints: [
          { concept: 'Loop Invariant remains true across iterations proving partial correctness', weight: 0.5, aliases: ['inductive invariant', 'partial correctness proof'] },
          { concept: 'Loop Variant strictly decreases towards bound proving termination', weight: 0.5, aliases: ['termination proof', 'decreasing variant'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Partial Correctness and Total Correctness.',
        options: [],
        correctAnswer: 'Partial correctness asserts that IF a program terminates, its final state satisfies the specification. Total correctness asserts partial correctness PLUS the mathematical guarantee that the program will terminate.',
        gradingPoints: [
          { concept: 'Partial correctness assumes conditional termination', weight: 0.5, aliases: ['correct if terminates'] },
          { concept: 'Total correctness proves termination plus partial correctness', weight: 0.5, aliases: ['partial correctness plus termination'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Temporal Logic: differentiate Linear Temporal Logic (LTL) from Computation Tree Logic (CTL).',
        options: [],
        correctAnswer: 'LTL models time as a linear sequence of states with operators like Always (G), Eventually (F), and Next (X). CTL models time as a branching tree of alternative futures, adding path quantifiers All paths (A) and Exists a path (E).',
        gradingPoints: [
          { concept: 'LTL models linear sequence of states (G, F, X operators)', weight: 0.5, aliases: ['linear time', 'path formulas'] },
          { concept: 'CTL models branching time with path quantifiers A and E', weight: 0.5, aliases: ['branching time logic', 'state formulas'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the B-Method and the concept of Stepwise Refinement.',
        options: [],
        correctAnswer: 'The B-Method is a formal software development method where developers start with an abstract machine specification and systematically refine it through intermediate models into executable code while preserving proven invariants.',
        gradingPoints: [
          { concept: 'starts with abstract mathematical machine specification', weight: 0.5, aliases: ['abstract machine notation'] },
          { concept: 'stepwise refinement proves intermediate models preserve invariants', weight: 0.5, aliases: ['refinement to code', 'invariant preservation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe State Explosion in model checking and two mitigation techniques.',
        options: [],
        correctAnswer: 'State explosion occurs when state spaces grow exponentially with concurrent components. Mitigations include: 1) Symbolic Model Checking (using Binary Decision Diagrams BDDs). 2) Partial Order Reduction (skipping commutative transitions).',
        gradingPoints: [
          { concept: 'exponential growth of states in concurrent systems', weight: 0.5, aliases: ['exponential state space'] },
          { concept: 'mitigations: BDDs symbolic checking, partial order reduction', weight: 0.5, aliases: ['symbolic model checking', 'abstraction'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are Safety Properties versus Liveness Properties in formal verification?',
        options: [],
        correctAnswer: 'A Safety property asserts that bad things will never happen (e.g., deadlock freedom, mutual exclusion), refutable by a finite trace. A Liveness property asserts that good things will eventually happen (e.g., starvation freedom), refutable only by infinite traces.',
        gradingPoints: [
          { concept: 'Safety: bad things never happen (refutable by finite trace)', weight: 0.5, aliases: ['mutual exclusion', 'finite counterexample'] },
          { concept: 'Liveness: good things eventually happen (infinite trace)', weight: 0.5, aliases: ['eventually true', 'starvation freedom'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss the industrial relevance and challenges of adopting Formal Methods in safety-critical systems.',
        options: [],
        correctAnswer: 'Formal methods provide mathematical certainty required in safety-critical domains (avionics, railway, nuclear, medical). Challenges include high mathematical learning curve, high cost/effort, state explosion, and difficulty keeping formal models in sync with rapidly changing code.',
        gradingPoints: [
          { concept: 'essential in safety-critical systems for mathematical certainty', weight: 0.5, aliases: ['avionics', 'railway signaling', 'zero-defect software'] },
          { concept: 'challenges: high cost, learning curve, and scalability', weight: 0.5, aliases: ['costly development', 'specialized skills needed'] },
        ],
      },
    ],
  },

  // 14. CSC 499: B.Sc. Final Year Project I
  {
    code: 'CSC 499',
    title: 'B.Sc. Final Year Project I',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'What are the essential components of a Computer Science Final Year Project Proposal?',
        options: [],
        correctAnswer: 'Essential components include the Introduction, Problem Statement, Objectives, Methodology, Scope/Limitations, and Literature Review.',
        gradingPoints: [
          { concept: 'Problem Statement and Objectives', weight: 0.5, aliases: ['problem definition', 'specific goals'] },
          { concept: 'Methodology and Literature Review', weight: 0.5, aliases: ['system design', 'scholarly review'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the IEEE System Requirements Specification (SRS) document structure.',
        options: [],
        correctAnswer: 'An IEEE SRS document includes: 1) Introduction (purpose, scope). 2) Overall Description (user characteristics, constraints). 3) Specific Requirements (functional, performance, security, and interface specifications).',
        gradingPoints: [
          { concept: 'Introduction and Overall Description', weight: 0.5, aliases: ['scope and perspective'] },
          { concept: 'Specific Requirements (functional/non-functional)', weight: 0.5, aliases: ['functional specifications', 'interfaces'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Feasibility Study TELOS model.',
        options: [],
        correctAnswer: 'TELOS stands for Technical (can it be built?), Economic (is it cost-effective?), Legal (is it compliant?), Operational (will users adopt it?), and Schedule (can it meet deadlines?).',
        gradingPoints: [
          { concept: 'Technical, Economic, Legal, Operational, Schedule', weight: 1.0, aliases: ['TELOS framework'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare System Architecture Diagrams vs. Data Flow Diagrams (DFD).',
        options: [],
        correctAnswer: 'System Architecture Diagrams illustrate structural components and hardware tiers. DFDs illustrate how data flows through processes, data stores, and external entities.',
        gradingPoints: [
          { concept: 'Architecture shows structural components and tiers', weight: 0.5, aliases: ['system structure', 'tiers'] },
          { concept: 'DFD shows data movement through processes and stores', weight: 0.5, aliases: ['data flow', 'process models'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are the evaluation criteria for an Oral Defense in computer science projects?',
        options: [],
        correctAnswer: 'Evaluation criteria include clarity of the problem statement, technical rigor of the methodology, presentation competence, ability to handle defense questions, and a working software demo.',
        gradingPoints: [
          { concept: 'Clarity and technical rigor of methodology', weight: 0.5, aliases: ['methodology rigor', 'problem clarity'] },
          { concept: 'Presentation, question handling, and software demonstration', weight: 0.5, aliases: ['demo', 'defense answers'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the difference between Agile and Waterfall methodology in student project execution.',
        options: [],
        correctAnswer: 'Waterfall requires all specifications upfront before sequential coding and testing. Agile breaks implementation into iterative sprints, enabling students to adapt to unforeseen technical challenges.',
        gradingPoints: [
          { concept: 'Waterfall is linear and plan-heavy upfront', weight: 0.5, aliases: ['sequential development'] },
          { concept: 'Agile delivers working increments in iterative sprints', weight: 0.5, aliases: ['iterative cycles', 'sprint adaptation'] },
        ],
      },
      {
        type: 'theory',
        question: 'How do you design a database schema to prevent data anomalies?',
        options: [],
        correctAnswer: 'A robust database schema applies relational normalization (1NF, 2NF, 3NF), defines primary and foreign keys with cascading rules, and enforces unique and check constraints.',
        gradingPoints: [
          { concept: 'applies database normalization (1NF, 2NF, 3NF)', weight: 0.5, aliases: ['normal forms', 'eliminates redundancy'] },
          { concept: 'enforces primary, foreign keys, and constraints', weight: 0.5, aliases: ['referential integrity', 'constraints'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Black-Box Testing vs. White-Box Testing in project quality assurance.',
        options: [],
        correctAnswer: 'Black-box testing tests functionality against inputs and outputs without knowledge of internal code structure. White-box testing inspects internal code paths, branches, and statements directly.',
        gradingPoints: [
          { concept: 'Black-box tests functional behavior without internal code knowledge', weight: 0.5, aliases: ['functional testing', 'input-output'] },
          { concept: 'White-box tests internal code logic, paths, and branch coverage', weight: 0.5, aliases: ['structural testing', 'code coverage'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain why user documentation and developer documentation are both required in project submissions.',
        options: [],
        correctAnswer: 'User documentation (user manuals) guides end users on system operation and troubleshooting. Developer documentation (API docs, setup guides, code comments) enables future developers to maintain, extend, and deploy the codebase.',
        gradingPoints: [
          { concept: 'User documentation guides end-user operation and troubleshooting', weight: 0.5, aliases: ['user manual', 'instructions'] },
          { concept: 'Developer documentation enables maintenance, deployment, and codebase extension', weight: 0.5, aliases: ['API docs', 'technical README'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss the importance of a project retrospective and lessons learned section in final documentation.',
        options: [],
        correctAnswer: 'The retrospective analyzes what succeeded, what failed, technical limitations encountered, and how future iterations could improve, demonstrating academic maturity and self-reflection.',
        gradingPoints: [
          { concept: 'analyzes successes, failures, and technical limitations', weight: 0.5, aliases: ['project reflection', 'challenges faced'] },
          { concept: 'outlines recommendations for future work and research', weight: 0.5, aliases: ['future improvements', 'recommendations'] },
        ],
      },
    ],
  },
];
