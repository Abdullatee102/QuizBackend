// src/seed/faculties/fci/csc500.ts
import type { SeedCourse } from '../../types.js';

export const csc500Courses: SeedCourse[] = [
  // =========================================================================
  // 500 LEVEL HARMATTAN SEMESTER
  // =========================================================================

  // 1. CSC 501: Artificial Intelligence & Expert Systems
  {
    code: 'CSC 501',
    title: 'Artificial Intelligence & Expert Systems',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the A* Search algorithm, defining the evaluation function f(n) = g(n) + h(n), and conditions for admissibility and consistency.',
        options: [],
        correctAnswer: 'A* is an informed best-first search algorithm evaluating nodes via f(n) = g(n) + h(n), where g(n) is the exact cost from the start node to n, and h(n) is the estimated heuristic cost from n to the goal. A heuristic is admissible if it never overestimates the true cost to reach the goal (h(n) <= h*(n)). A heuristic is consistent (monotonic) if h(n) <= c(n, a, n\') + h(n\'). Admissibility guarantees optimal solutions in tree search, while consistency guarantees optimality in graph search without reopening closed nodes.',
        gradingPoints: [
          { concept: 'f(n) = g(n) + h(n) with g(n) actual cost and h(n) heuristic estimate', weight: 0.4, aliases: ['evaluation function', 'g cost plus h heuristic'] },
          { concept: 'admissible never overestimates true cost guaranteeing tree search optimality', weight: 0.3, aliases: ['admissibility condition', 'never overestimates'] },
          { concept: 'consistent satisfies triangle inequality guaranteeing graph search optimality', weight: 0.3, aliases: ['monotonicity', 'h(n) <= c + h(n\')'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Minimax algorithm in adversarial game playing and how Alpha-Beta Pruning optimizes search efficiency.',
        options: [],
        correctAnswer: 'The Minimax algorithm determines the optimal move for a player assuming an optimal adversary by recursively computing maximum values at MAX nodes and minimum values at MIN nodes down to a leaf evaluation depth. Alpha-Beta Pruning eliminates branches that cannot influence the final decision by maintaining alpha (best value MAX can guarantee) and beta (best value MIN can guarantee). Pruning occurs whenever alpha >= beta, reducing branch factor from b^d to b^(d/2) in optimal move ordering.',
        gradingPoints: [
          { concept: 'recursively alternates maximizing and minimizing player utilities', weight: 0.5, aliases: ['MAX and MIN nodes', 'game tree search'] },
          { concept: 'alpha-beta prunes branches when alpha >= beta without altering optimal outcome', weight: 0.5, aliases: ['pruning condition', 'cuts search space in half'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the architecture and working components of an Expert System.',
        options: [],
        correctAnswer: 'An Expert System emulates the decision-making ability of a human expert. Its core architecture comprises: 1. Knowledge Base (storing domain facts and IF-THEN production rules); 2. Inference Engine (the reasoning brain that applies rules to facts using forward or backward chaining); 3. Working Memory / Global Database (storing current case-specific data); 4. Explanation Facility (explaining why questions are asked and how conclusions were reached); and 5. User Interface (for end-user interaction).',
        gradingPoints: [
          { concept: 'Knowledge Base and Inference Engine', weight: 0.5, aliases: ['production rules', 'reasoning engine'] },
          { concept: 'Working Memory, Explanation Facility, and User Interface', weight: 0.5, aliases: ['fact database', 'explanation subsystem'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Forward Chaining with Backward Chaining inference mechanisms in rule-based systems.',
        options: [],
        correctAnswer: 'Forward Chaining is data-driven: it starts with known initial facts in working memory and applies inference rules to derive new facts and iteratively progress toward a goal (bottom-up); it is suitable for synthesis, diagnosis, and planning. Backward Chaining is goal-driven: it begins with a hypothetical goal/hypothesis and searches backward through rules to find supporting known facts, requesting additional facts if needed (top-down); it is suitable for verification and diagnostic troubleshooting.',
        gradingPoints: [
          { concept: 'Forward chaining is data-driven starting from facts to derive goals', weight: 0.5, aliases: ['data driven reasoning', 'bottom up chaining'] },
          { concept: 'Backward chaining is goal-driven working backward to verify hypotheses', weight: 0.5, aliases: ['goal driven reasoning', 'top down hypothesis'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Bayesian Network and how does it model uncertain knowledge using conditional probability tables (CPTs)?',
        options: [],
        correctAnswer: 'A Bayesian Network is a Directed Acyclic Graph (DAG) that represents probabilistic relationships among a set of random variables. Nodes represent random variables, and directed edges represent direct conditional probabilistic dependencies. Each node is associated with a Conditional Probability Table (CPT) specifying P(Node | Parents), allowing the full joint probability distribution to be factored compactly using the chain rule under conditional independence assumptions.',
        gradingPoints: [
          { concept: 'DAG representing conditional dependencies between variables', weight: 0.5, aliases: ['directed acyclic probabilistic graph', 'causal network'] },
          { concept: 'CPTs quantify conditional probabilities given parent nodes', weight: 0.5, aliases: ['conditional probability table', 'joint distribution factorization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Constraint Satisfaction Problems (CSP) and the role of Backtracking search combined with the AC-3 arc-consistency algorithm.',
        options: [],
        correctAnswer: 'A CSP consists of variables, domains of possible values, and constraints specifying allowable combinations of values. Backtracking search performs a depth-first search assigning one variable at a time and backtracking on constraint violations. The AC-3 (Arc Consistency 3) algorithm pre-processes or prunes variable domains during search by ensuring that for every value in variable Xi\'s domain, there exists a satisfying value in neighbor Xj\'s domain, eliminating dead ends early.',
        gradingPoints: [
          { concept: 'formulates problems as variables, domains, and constraints', weight: 0.4, aliases: ['CSP formulation', 'variables domains constraints'] },
          { concept: 'backtracking search with AC-3 prunes incompatible domain values via arc consistency', weight: 0.6, aliases: ['AC-3 arc consistency', 'domain pruning', 'early pruning'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Knowledge Representation techniques: First-Order Predicate Logic (FOPL), Semantic Networks, and Frames.',
        options: [],
        correctAnswer: 'FOPL represents facts using objects, predicates, functions, and quantifiers (Universal and Existential) with precise mathematical semantics and formal deduction. Semantic Networks represent knowledge as a graph of nodes (concepts/objects) connected by labeled directed edges (relations like "is-a" and "has-a"). Frames organize knowledge into object-oriented data structures containing named slots and values (or default fillers) supporting property inheritance.',
        gradingPoints: [
          { concept: 'FOPL uses predicates, objects, and quantifiers with formal deduction', weight: 0.4, aliases: ['predicate calculus', 'quantified logic'] },
          { concept: 'Semantic Networks use concept graphs with relational edges', weight: 0.3, aliases: ['is-a hierarchy', 'concept graph'] },
          { concept: 'Frames use slotted structures with default fillers and inheritance', weight: 0.3, aliases: ['slot-and-filler', 'frame representation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Transformer architecture in Natural Language Processing, focusing on the Self-Attention mechanism.',
        options: [],
        correctAnswer: 'Transformers discard sequential recurrent layers in favor of pure Attention mechanisms. The Self-Attention mechanism allows every token in an input sequence to attend to and compute relational weights with every other token simultaneously. Each token is projected into Query (Q), Key (K), and Value (V) vectors; attention weights are computed as Softmax((Q * K^T) / sqrt(d_k)) * V, enabling parallel processing and capturing long-range contextual dependencies.',
        gradingPoints: [
          { concept: 'Self-Attention relates all tokens in sequence simultaneously', weight: 0.5, aliases: ['scaled dot-product attention', 'contextual embedding'] },
          { concept: 'Query, Key, Value projections with scaled dot-product Softmax formula', weight: 0.5, aliases: ['Q K V vectors', 'parallel attention processing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Classical Planning in AI using STRIPS / PDDL representations with reactive agent behavior.',
        options: [],
        correctAnswer: 'STRIPS/PDDL classical planning represents states as sets of first-order literals and actions with preconditions (conditions that must hold to execute) and effects (add and delete lists). It plans deliberative sequence of actions offline to reach a goal. In contrast, reactive agents do not construct deliberative plans; they map sensory inputs directly to motor actions through condition-action rules (e.g., Subsumption architecture), responding rapidly to dynamic environments.',
        gradingPoints: [
          { concept: 'STRIPS/PDDL uses state literals, action preconditions, and add/delete effects', weight: 0.5, aliases: ['deliberative planning', 'action preconditions and effects'] },
          { concept: 'reactive agents map sensory input directly to actions without offline planning', weight: 0.5, aliases: ['subsumption architecture', 'reflexive behavior'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss ethical concerns in Artificial Intelligence: Algorithmic Bias, Model Explainability (XAI), and Autonomous Weapon Systems.',
        options: [],
        correctAnswer: 'Algorithmic Bias arises when models trained on historically skewed or unrepresentative datasets amplify systemic discrimination in hiring, policing, and lending. Explainable AI (XAI) addresses the "black box" nature of deep neural networks, providing interpretable explanations (e.g., LIME, SHAP) necessary for high-stakes healthcare and judicial decisions. Autonomous Weapon Systems raise profound moral concerns regarding accountability, lack of human judgment in lethal force, and compliance with international humanitarian law.',
        gradingPoints: [
          { concept: 'bias from unrepresentative datasets causing unfair discrimination', weight: 0.4, aliases: ['algorithmic fairness', 'training data bias'] },
          { concept: 'XAI provides model interpretability and transparency in critical domains', weight: 0.3, aliases: ['explainability', 'black-box models', 'SHAP/LIME'] },
          { concept: 'autonomous weapons lack human accountability and ethical judgment', weight: 0.3, aliases: ['lethal autonomous weapons', 'moral accountability'] },
        ],
      },
    ],
  },

  // 2. CSC 503: Machine Learning & Data Mining
  {
    code: 'CSC 503',
    title: 'Machine Learning & Data Mining',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the Bias-Variance Tradeoff in machine learning and how regularization techniques (L1 Lasso and L2 Ridge) mitigate overfitting.',
        options: [],
        correctAnswer: 'Bias is error introduced by approximating a complex real-world problem with an overly simplistic model (underfitting). Variance is error from a model\'s excessive sensitivity to fluctuations in the training set (overfitting). As model complexity grows, bias decreases while variance increases. Regularization penalizes model complexity: L1 Lasso adds absolute weight penalties (lambda * sum(|w|)), driving irrelevant weights to zero for feature selection; L2 Ridge adds squared weight penalties (lambda * sum(w^2)), shrinking weights smoothly to prevent extreme coefficients.',
        gradingPoints: [
          { concept: 'bias is underfitting simplicity error and variance is overfitting sensitivity error', weight: 0.5, aliases: ['bias-variance dilemma', 'underfitting vs overfitting'] },
          { concept: 'L1 Lasso causes sparsity while L2 Ridge shrinks weights smoothly', weight: 0.5, aliases: ['regularization penalty', 'L1 feature selection', 'L2 weight decay'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Decision Tree construction using Information Gain (Entropy) and Gini Impurity.',
        options: [],
        correctAnswer: 'Decision trees partition data recursively by selecting the attribute that maximizes split purity. Entropy measures dataset randomness/impurity: H(S) = -sum(p_i * log2(p_i)); Information Gain is the reduction in entropy achieved by partitioning on attribute A: IG(S, A) = H(S) - sum((|Sv|/|S|) * H(Sv)). Gini Impurity measures the probability of misclassifying a randomly chosen element: Gini = 1 - sum(p_i^2). The attribute with highest Information Gain or lowest Gini is selected as the split node.',
        gradingPoints: [
          { concept: 'Entropy formula and Information Gain as reduction in entropy', weight: 0.5, aliases: ['entropy calculation', 'information gain split'] },
          { concept: 'Gini impurity formula and attribute split selection', weight: 0.5, aliases: ['gini index', 'split purity'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Bagging (e.g., Random Forest) with Boosting (e.g., AdaBoost, Gradient Boosting).',
        options: [],
        correctAnswer: 'Bagging (Bootstrap Aggregating) trains multiple base models (like deep decision trees) independently and in parallel on different bootstrap samples of the training data and averages their predictions to reduce variance without increasing bias. Boosting trains weak learners sequentially, where each new learner focuses on correcting the errors and re-weighted misclassified instances of the previous models, primarily reducing bias alongside variance.',
        gradingPoints: [
          { concept: 'Bagging trains parallel independent models on bootstrap samples to reduce variance', weight: 0.5, aliases: ['bootstrap aggregation', 'random forest variance reduction'] },
          { concept: 'Boosting trains sequential models focusing on previous errors to reduce bias', weight: 0.5, aliases: ['sequential learning', 'gradient boosting', 'adaboost'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Support Vector Machines (SVM), the concept of Maximum Margin Hyperplane, and the Kernel Trick.',
        options: [],
        correctAnswer: 'SVM finds the optimal decision hyperplane that separates classes with the maximum geometric margin (distance between hyperplane and closest data points, known as support vectors). For linearly non-separable data, the Kernel Trick implicitly maps input vectors into a higher-dimensional feature space where they become linearly separable, computing inner products directly using kernel functions (such as RBF, polynomial) without explicitly computing coordinates in that high-dimensional space.',
        gradingPoints: [
          { concept: 'maximum margin hyperplane separated by support vectors', weight: 0.5, aliases: ['margin maximization', 'support vectors'] },
          { concept: 'kernel trick maps non-linear data to high-dimensional separable space', weight: 0.5, aliases: ['RBF kernel', 'implicit feature mapping'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the K-Means clustering algorithm, its objective function, and the challenge of selecting k via the Elbow Method.',
        options: [],
        correctAnswer: 'K-Means partitions n unlabeled observations into k clusters by minimizing Within-Cluster Sum of Squares (WCSS): J = sum(||x_i - mu_j||^2). It iteratively assigns each point to its nearest centroid, recomputes cluster centroids as the mean of assigned points, and repeats until convergence. The Elbow Method runs K-Means across a range of k values, plots WCSS against k, and selects the value where the rate of decrease abruptly bends (the "elbow").',
        gradingPoints: [
          { concept: 'iteratively assigns points to closest centroids and updates centroid means', weight: 0.5, aliases: ['k-means iteration', 'minimizing WCSS'] },
          { concept: 'elbow method chooses k where WCSS curve reduction sharply levels off', weight: 0.5, aliases: ['within-cluster variance', 'elbow curve bend'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Apriori algorithm for Association Rule Mining, defining Support, Confidence, and Lift.',
        options: [],
        correctAnswer: 'The Apriori algorithm finds frequent itemsets in transactional databases using the downward closure property (all non-empty subsets of a frequent itemset must also be frequent). Key metrics: Support(A -> B) = P(A union B) is the proportion of transactions containing both; Confidence(A -> B) = P(B | A) = Support(A union B) / Support(A) is rule reliability; Lift(A -> B) = Confidence(A -> B) / Support(B) measures the strength of the rule over random co-occurrence (Lift > 1 indicates positive association).',
        gradingPoints: [
          { concept: 'apriori property where all subsets of frequent itemset must be frequent', weight: 0.4, aliases: ['downward closure property', 'frequent itemset pruning'] },
          { concept: 'Support, Confidence, and Lift mathematical definitions', weight: 0.6, aliases: ['support confidence lift formulas', 'association metrics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Backpropagation algorithm in Artificial Neural Networks and the role of the Chain Rule of Calculus.',
        options: [],
        correctAnswer: 'Backpropagation computes the gradient of the loss function with respect to every weight in a multi-layer neural network. In the forward pass, input data propagates through layers to compute predictions and loss. In the backward pass, the Chain Rule of calculus propagates the error gradient backward from the output layer through hidden layers, calculating partial derivatives dL/dw. These gradients are used by Gradient Descent to update weights (w = w - eta * dL/dw).',
        gradingPoints: [
          { concept: 'forward pass computes loss, backward pass computes error gradients', weight: 0.5, aliases: ['forward and backward propagation', 'loss gradients'] },
          { concept: 'chain rule propagates gradients to update weights via gradient descent', weight: 0.5, aliases: ['calculus chain rule', 'weight update equation'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Principal Component Analysis (PCA) and how does it achieve Dimensionality Reduction?',
        options: [],
        correctAnswer: 'PCA is an unsupervised linear dimensionality reduction technique that transforms correlated high-dimensional features into a smaller set of orthogonal, uncorrelated variables called Principal Components. It computes the covariance matrix of mean-centered data, finds its eigenvalues and eigenvectors, sorts eigenvectors in descending order of explained variance, and projects original data onto top k eigenvectors, preserving maximum variance while reducing dimensions.',
        gradingPoints: [
          { concept: 'transforms correlated features into orthogonal uncorrelated components', weight: 0.5, aliases: ['variance maximization', 'orthogonal projection'] },
          { concept: 'eigenvalue decomposition of covariance matrix selects top k eigenvectors', weight: 0.5, aliases: ['covariance matrix eigenvectors', 'explained variance'] },
        ],
      },
      {
        type: 'theory',
        question: 'Evaluate classification metrics: Precision, Recall, F1-Score, and ROC-AUC for imbalanced datasets.',
        options: [],
        correctAnswer: 'Accuracy is misleading on imbalanced datasets. Precision = TP / (TP + FP) measures the accuracy of positive predictions (minimizing false alarms). Recall (Sensitivity) = TP / (TP + FN) measures the proportion of actual positives identified (minimizing missed cases). F1-Score is the harmonic mean of Precision and Recall: 2 * (P * R) / (P + R). The ROC curve plots True Positive Rate vs False Positive Rate across thresholds; ROC-AUC measures the probability that the classifier ranks a random positive higher than a random negative.',
        gradingPoints: [
          { concept: 'Precision TP/(TP+FP), Recall TP/(TP+FN), and F1 harmonic mean', weight: 0.6, aliases: ['precision recall formulas', 'harmonic mean F1'] },
          { concept: 'ROC-AUC plots TPR vs FPR evaluating threshold-invariant performance', weight: 0.4, aliases: ['area under ROC curve', 'imbalanced evaluation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Convolutional Neural Networks (CNN) architecture: Convolutional Layers, Pooling Layers, and Receptive Fields.',
        options: [],
        correctAnswer: 'CNNs are specialized for grid-like spatial data (images). Convolutional Layers apply learnable filter kernels that slide across the input to compute feature maps using parameter sharing and local connectivity. Activation functions (ReLU) introduce non-linearity. Pooling Layers (e.g., Max Pooling) downsample spatial dimensions to reduce parameters and provide translation invariance. Fully Connected layers at the end flatten feature maps to perform final classification.',
        gradingPoints: [
          { concept: 'convolution layers use sliding filters with weight sharing for local features', weight: 0.5, aliases: ['convolution kernel', 'feature maps', 'parameter sharing'] },
          { concept: 'pooling downsamples spatial dimensions providing translation invariance', weight: 0.5, aliases: ['max pooling', 'spatial downsampling'] },
        ],
      },
    ],
  },

  // 3. CSC 505: Cryptography & Network Security
  {
    code: 'CSC 505',
    title: 'Cryptography & Network Security',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Compare Symmetric-Key Cryptography (AES) with Asymmetric-Key Cryptography (RSA) in speed, key distribution, and security.',
        options: [],
        correctAnswer: 'Symmetric cryptography (AES) uses a single shared secret key for encryption and decryption; it is fast and computationally lightweight for bulk data, but suffers from key distribution challenges across untrusted networks. Asymmetric cryptography (RSA) uses a mathematically linked public-private key pair; it solves the key distribution problem and provides digital signatures, but is orders of magnitude slower and computationally expensive due to large prime factorizations.',
        gradingPoints: [
          { concept: 'Symmetric uses single shared key and is fast for bulk encryption', weight: 0.5, aliases: ['shared secret key', 'AES performance'] },
          { concept: 'Asymmetric uses public-private key pair solving key distribution', weight: 0.5, aliases: ['public key cryptography', 'RSA prime factorization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the RSA algorithm mathematical principles: key generation, encryption, and decryption based on Euler\'s Totient Function.',
        options: [],
        correctAnswer: 'RSA is based on the difficulty of factoring large integers. Key generation: select large primes p and q; compute modulus n = p * q and Euler\'s totient phi(n) = (p - 1)(q - 1); select public exponent e coprime to phi(n); compute private exponent d such that (d * e) mod phi(n) = 1. Public key is (e, n) and private key is (d, n). Encryption computes ciphertext c = m^e mod n. Decryption recovers plaintext m = c^d mod n via Euler\'s theorem.',
        gradingPoints: [
          { concept: 'computes n = p*q, phi(n) = (p-1)(q-1), and modular inverse d', weight: 0.6, aliases: ['RSA key generation', 'euler totient function'] },
          { concept: 'c = m^e mod n and m = c^d mod n', weight: 0.4, aliases: ['RSA encryption and decryption formulas'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Cryptographic Hash Function and what are the three essential security properties it must satisfy?',
        options: [],
        correctAnswer: 'A cryptographic hash function (e.g., SHA-256) deterministically maps arbitrary-length input data into a fixed-size digest. It must satisfy: 1. Pre-image Resistance (One-way property: computationally infeasible to find input m given hash h); 2. Second Pre-image Resistance (Weak collision resistance: given m1, infeasible to find distinct m2 such that hash(m1) = hash(m2)); and 3. Collision Resistance (Strong collision resistance: infeasible to find any two arbitrary distinct inputs m1 and m2 such that hash(m1) = hash(m2)).',
        gradingPoints: [
          { concept: 'Pre-image resistance (one-way property)', weight: 0.33, aliases: ['cannot reverse hash to input'] },
          { concept: 'Second pre-image resistance (weak collision)', weight: 0.33, aliases: ['infeasible to find second input with same hash'] },
          { concept: 'Collision resistance (strong collision)', weight: 0.34, aliases: ['infeasible to find any two colliding inputs'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Diffie-Hellman Key Exchange protocol and how it allows two parties to establish a shared secret over an insecure channel.',
        options: [],
        correctAnswer: 'Diffie-Hellman allows two parties to securely establish a shared symmetric key over a public network based on the Discrete Logarithm Problem. Alice and Bob agree on public parameters: large prime p and generator g. Alice chooses private a and sends public A = g^a mod p; Bob chooses private b and sends public B = g^b mod p. Alice computes secret K = B^a mod p = g^(ab) mod p, and Bob computes K = A^b mod p = g^(ab) mod p. Both now share K without transmitting it.',
        gradingPoints: [
          { concept: 'public prime p and generator g with private keys a and b', weight: 0.4, aliases: ['public parameters', 'private exponents'] },
          { concept: 'exchanges g^a and g^b and computes shared secret g^(ab) mod p', weight: 0.6, aliases: ['discrete logarithm problem', 'shared secret derivation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Public Key Infrastructure (PKI) components and how X.509 Digital Certificates establish trust.',
        options: [],
        correctAnswer: 'PKI manages digital certificates and public-key encryption to establish trust across open networks. An X.509 Certificate binds a public key to an entity\'s identity, containing subject name, public key, validity period, and issuer digital signature. A trusted Certificate Authority (CA) verifies the applicant\'s identity and signs the certificate with its private key; clients verify the certificate using the CA\'s known public key within a trust chain.',
        gradingPoints: [
          { concept: 'binds public key to entity identity signed by Certificate Authority', weight: 0.5, aliases: ['X.509 binding', 'trusted CA signature'] },
          { concept: 'hierarchical chain of trust from root CA to intermediate and entity', weight: 0.5, aliases: ['root CA trust chain', 'certificate verification'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain IPsec protocol suite architecture, contrasting Authentication Header (AH) with Encapsulating Security Payload (ESP).',
        options: [],
        correctAnswer: 'IPsec secures IP communications at the Network layer. AH provides data origin authentication and connectionless integrity for the entire IP packet (including IP header), but provides zero encryption/confidentiality. ESP provides data confidentiality (encryption), origin authentication, and anti-replay protection. In Transport Mode, only the payload is protected; in Tunnel Mode, the entire original IP packet is encapsulated and encrypted inside a new IP header.',
        gradingPoints: [
          { concept: 'AH provides integrity and authentication without encryption', weight: 0.4, aliases: ['authentication header', 'no confidentiality in AH'] },
          { concept: 'ESP provides encryption, integrity, and anti-replay in Transport and Tunnel modes', weight: 0.6, aliases: ['encapsulating security payload', 'transport vs tunnel mode'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how SQL Injection (SQLi) attacks occur and how Parameterized Queries (Prepared Statements) prevent them.',
        options: [],
        correctAnswer: 'SQL Injection occurs when untrusted user input is directly concatenated into dynamic SQL query strings, allowing an attacker to manipulate SQL syntax and execute arbitrary commands (e.g., bypassing auth via "\' OR \'1\'=\'1"). Parameterized queries (prepared statements) prevent SQLi by pre-compiling the SQL command structure on the database engine and treating user inputs strictly as typed literal values (placeholders) rather than executable SQL code.',
        gradingPoints: [
          { concept: 'input concatenation alters query logic executing unauthorized commands', weight: 0.5, aliases: ['dynamic string concatenation', 'syntax manipulation'] },
          { concept: 'parameterized queries pre-compile query structure treating inputs strictly as literal parameters', weight: 0.5, aliases: ['prepared statements', 'placeholders', 'precompiled query'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Signature-Based Intrusion Detection Systems (IDS) with Anomaly-Based IDS.',
        options: [],
        correctAnswer: 'Signature-based IDS inspects network packets and compares patterns against a database of known threat signatures; it has very low false positive rates for known attacks but cannot detect zero-day vulnerabilities. Anomaly-based IDS establishes a statistical baseline of normal network behavior and flags deviations exceeding thresholds; it can detect unknown zero-day attacks but suffers from high false positive rates due to legitimate unusual traffic spikes.',
        gradingPoints: [
          { concept: 'Signature-based matches known attack patterns, low false positives but fails on zero-day', weight: 0.5, aliases: ['pattern matching', 'known signatures'] },
          { concept: 'Anomaly-based flags deviations from baseline, detects zero-days but higher false positives', weight: 0.5, aliases: ['baseline deviation', 'behavioral anomaly detection'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Distributed Denial of Service (DDoS) attack mechanisms (SYN Flood, Amplification attacks) and defenses.',
        options: [],
        correctAnswer: 'A DDoS attack overwhelms targeted systems with malicious traffic from botnets. In a TCP SYN Flood, attackers flood servers with spoofed SYN requests without returning ACKs, exhausting TCP connection backlog queues. In DNS Amplification, attackers send small spoofed requests to open resolvers that respond with massive answers directed at the victim. Defenses include SYN Cookies, rate limiting, traffic scrubbing centers, and CDN caching.',
        gradingPoints: [
          { concept: 'SYN flood exhausts connection state tables; Amplification uses open UDP resolvers', weight: 0.5, aliases: ['TCP SYN backlog', 'DNS reflection amplification'] },
          { concept: 'defenses include SYN cookies, rate limiting, scrubbing centers, and CDNs', weight: 0.5, aliases: ['syn cookies', 'traffic scrubbing', 'DDoS mitigation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Cross-Site Scripting (XSS) attacks (Stored, Reflected, DOM-based) and effective remediation techniques.',
        options: [],
        correctAnswer: 'XSS injects malicious client-side JavaScript into trusted websites. Stored XSS permanently saves malicious scripts in the database, affecting all viewing users. Reflected XSS reflects scripts off web requests (e.g., search queries). DOM-based XSS executes entirely client-side by modifying the DOM environment. Remediation involves contextual output encoding, strict input validation, implementing Content Security Policy (CSP) headers, and using the HttpOnly flag on session cookies.',
        gradingPoints: [
          { concept: 'Stored, Reflected, and DOM-based XSS attack mechanisms', weight: 0.5, aliases: ['stored vs reflected XSS', 'malicious javascript execution'] },
          { concept: 'mitigation via contextual output encoding, CSP headers, and HttpOnly cookies', weight: 0.5, aliases: ['output sanitization', 'content security policy', 'httponly'] },
        ],
      },
    ],
  },

  // 4. CSC 507: Parallel & High-Performance Computing
  {
    code: 'CSC 507',
    title: 'Parallel & High-Performance Computing',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain Flynn\'s Taxonomy of Computer Architectures (SISD, SIMD, MISD, MIMD).',
        options: [],
        correctAnswer: 'Flynn\'s Taxonomy classifies computer architectures along instruction and data streams: 1. SISD (Single Instruction, Single Data): sequential uniprocessors; 2. SIMD (Single Instruction, Multiple Data): a single instruction executes concurrently on multiple data elements (vector processors, GPUs); 3. MISD (Multiple Instruction, Single Data): multiple instructions operate on the same data stream (rare, fault-tolerant redundant systems); 4. MIMD (Multiple Instruction, Multiple Data): multiple autonomous processors execute distinct instructions on distinct data (multi-core CPUs, HPC clusters).',
        gradingPoints: [
          { concept: 'SISD and SIMD definitions with vector/GPU example', weight: 0.5, aliases: ['uniprocessor', 'vector processing', 'data parallelism'] },
          { concept: 'MISD and MIMD definitions with multi-core/cluster example', weight: 0.5, aliases: ['fault tolerance', 'multiprocessors', 'task parallelism'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Amdahl\'s Law with Gustafson\'s Law regarding speedup in parallel computing.',
        options: [],
        correctAnswer: 'Amdahl\'s Law assumes a fixed problem size and states that parallel speedup is fundamentally limited by the sequential fraction s of the program: Speedup <= 1 / (s + (1 - s)/p), showing diminishing returns as processor count p increases. Gustafson\'s Law argues that in practice problem size scales with available computing power (scaled speedup): Speedup = s + p(1 - s), demonstrating that large workloads can achieve near-linear speedup on massively parallel systems.',
        gradingPoints: [
          { concept: 'Amdahl assumes fixed workload where sequential fraction bottlenecks speedup', weight: 0.5, aliases: ['fixed problem size', 'diminishing returns', '1/(s + (1-s)/p)'] },
          { concept: 'Gustafson assumes scaled problem size achieving near-linear speedup', weight: 0.5, aliases: ['scaled speedup', 'problem size grows with processors'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Shared-Memory programming (OpenMP) with Distributed-Memory programming (MPI).',
        options: [],
        correctAnswer: 'OpenMP uses a shared-memory model where threads within a single physical machine communicate implicitly by reading and writing to a shared address space; it uses compiler directives (#pragma omp), is easy to implement incrementally, but is limited by single-node RAM and hardware scalability. MPI (Message Passing Interface) uses a distributed-memory model where autonomous processes with isolated address spaces communicate explicitly via network message passing (MPI_Send, MPI_Recv); it scales to thousands of cluster nodes, but has higher programming complexity.',
        gradingPoints: [
          { concept: 'OpenMP uses shared address space, threads, and compiler pragmas', weight: 0.5, aliases: ['thread based', 'shared memory model', 'pragmas'] },
          { concept: 'MPI uses explicit message passing across distributed nodes with private memory', weight: 0.5, aliases: ['message passing interface', 'distributed memory cluster'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe GPU architecture for general-purpose computing (GPGPU) and CUDA execution hierarchy (Threads, Warps, Blocks, Grids).',
        options: [],
        correctAnswer: 'GPUs contain thousands of small arithmetic logic units designed for high-throughput data parallelism. In NVIDIA CUDA: Threads execute kernel code; groups of 32 threads form a Warp executed in lockstep (SIMT - Single Instruction, Multiple Threads); Warps are grouped into Thread Blocks that share on-chip Shared Memory and barrier synchronization; Blocks are organized into a Grid executed across Streaming Multiprocessors (SMs).',
        gradingPoints: [
          { concept: 'thousands of cores optimized for data-parallel SIMT execution', weight: 0.4, aliases: ['GPU high throughput', 'streaming multiprocessors'] },
          { concept: 'hierarchy of Threads, Warps (32 threads), Blocks, and Grids', weight: 0.6, aliases: ['CUDA thread hierarchy', 'warps and blocks', 'shared memory synchronization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Cache Coherence and how the MESI protocol maintains memory consistency in multi-core processors.',
        options: [],
        correctAnswer: 'Cache Coherence ensures that all CPU cores share a consistent view of main memory when multiple private L1/L2 caches replicate shared data blocks. The MESI snooping protocol tracks line states: Modified (line is dirty, present only in this cache); Exclusive (line is clean, present only in this cache); Shared (line is clean, present in multiple caches); and Invalid (line data is stale). When a core writes to a shared line, it broadcasts an invalidate signal, forcing other caches to mark their copies Invalid.',
        gradingPoints: [
          { concept: 'ensures multiple private caches reflect identical data values', weight: 0.4, aliases: ['consistency across caches', 'snooping protocol'] },
          { concept: 'MESI states: Modified, Exclusive, Shared, Invalid, and invalidate broadcasts', weight: 0.6, aliases: ['four MESI states', 'cache invalidation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Static Load Balancing with Dynamic Load Balancing in parallel computing.',
        options: [],
        correctAnswer: 'Static load balancing distributes tasks among processors prior to execution (at compile time or launch); it has zero runtime communication overhead and works well for uniform, predictable workloads, but causes processor idling if subtask runtimes vary. Dynamic load balancing reallocates tasks among processors during runtime based on live worker loads (e.g., work stealing, master-worker task queues); it handles unpredictable, non-uniform workloads effectively, but incurs runtime communication and synchronization overhead.',
        gradingPoints: [
          { concept: 'Static distributes work beforehand with no overhead, failing on variable workloads', weight: 0.5, aliases: ['compile-time allocation', 'predictable workloads'] },
          { concept: 'Dynamic redistributes work at runtime using task queues or work stealing', weight: 0.5, aliases: ['runtime allocation', 'work stealing', 'master-worker queue'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain common interconnection network topologies in supercomputers: 2D/3D Torus, Hypercube, and Fat-Tree.',
        options: [],
        correctAnswer: 'A 2D/3D Torus connects nodes in a grid with wraparound links at edges, providing uniform bisection bandwidth and low node degree. A Hypercube connects 2^k nodes in k dimensions with logarithmic diameter k and high fault tolerance, but node degree scales with dimension, increasing wiring complexity. A Fat-Tree connects nodes using a tree topology where link bandwidth increases ("gets fatter") as one moves closer to root switches, preventing network congestion at the top of the tree.',
        gradingPoints: [
          { concept: 'Torus uses grid with wraparound links; Hypercube provides logarithmic diameter', weight: 0.5, aliases: ['torus network', 'hypercube topology'] },
          { concept: 'Fat-Tree increases link capacity towards root preventing bisection bottlenecks', weight: 0.5, aliases: ['fat tree switches', 'bisection bandwidth'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Race Condition in concurrent programming and how do Critical Sections and Atomic Operations prevent it?',
        options: [],
        correctAnswer: 'A race condition occurs when two or more concurrent threads access shared data simultaneously and the final outcome depends on the unpredictable order of thread scheduling. A Critical Section is a segment of code accessing shared resources that must be executed by at most one thread at a time using mutual exclusion locks. Atomic Operations execute as indivisible hardware instructions (e.g., Compare-And-Swap), updating variables without locks.',
        gradingPoints: [
          { concept: 'unpredictable outcome due to unsynchronized concurrent access to shared data', weight: 0.5, aliases: ['data race', 'interleaved thread execution'] },
          { concept: 'mutual exclusion locks and hardware atomic instructions guarantee atomicity', weight: 0.5, aliases: ['critical sections', 'compare-and-swap', 'mutex'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Embarrassingly Parallel workloads and describe how the MapReduce distributed framework processes them.',
        options: [],
        correctAnswer: 'An embarrassingly parallel workload is one where computational subtasks require zero or minimal communication or dependency between each other (e.g., rendering video frames, monte carlo simulations). The MapReduce framework processes these workloads across distributed clusters: the Map function processes input partitions in parallel emitting key-value pairs; the Shuffle phase groups identical keys; and the Reduce function aggregates values for each key in parallel.',
        gradingPoints: [
          { concept: 'tasks require zero communication or synchronization between workers', weight: 0.4, aliases: ['independent subtasks', 'pleasingly parallel'] },
          { concept: 'Map transforms data, Shuffle groups by key, and Reduce aggregates partitions', weight: 0.6, aliases: ['map and reduce phases', 'key-value processing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe High-Performance Computing (HPC) cluster architecture and the role of Job Schedulers (e.g., Slurm).',
        options: [],
        correctAnswer: 'An HPC cluster consists of head/login nodes, hundreds of homogeneous compute nodes, high-speed interconnects (InfiniBand with RDMA), and shared parallel distributed file systems (Lustre/GPFS). A Job Scheduler (such as Slurm) manages shared cluster resources, queues user job scripts, prioritizes jobs based on fair-share policies, allocates dedicated compute nodes/cores, and monitors task completion.',
        gradingPoints: [
          { concept: 'compute nodes connected by InfiniBand and parallel storage (Lustre)', weight: 0.5, aliases: ['cluster nodes', 'infiniband interconnect', 'parallel file system'] },
          { concept: 'Slurm scheduler queues jobs, allocates CPU/GPU resources, and enforces policies', weight: 0.5, aliases: ['workload manager', 'resource allocation', 'job queue'] },
        ],
      },
    ],
  },

  // =========================================================================
  // 500 LEVEL RAIN SEMESTER
  // =========================================================================

  // 5. CSC 502: Bioinformatics & Computational Biology
  {
    code: 'CSC 502',
    title: 'Bioinformatics & Computational Biology',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain the Central Dogma of Molecular Biology and the role of computational sequence analysis.',
        options: [],
        correctAnswer: 'The Central Dogma describes the directional flow of genetic information: DNA is replicated and transcribed into messenger RNA (mRNA), which is then translated into functional proteins by ribosomes according to the genetic code. Computational sequence analysis algorithms identify genes, detect mutations, predict protein structures, and compare biological sequences across species.',
        gradingPoints: [
          { concept: 'DNA transcription into mRNA and translation into proteins', weight: 0.5, aliases: ['replication transcription translation', 'genetic flow'] },
          { concept: 'computational algorithms analyze sequences to identify genes and protein functions', weight: 0.5, aliases: ['sequence analysis', 'functional genomics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Global Alignment (Needleman-Wunsch) with Local Alignment (Smith-Waterman) algorithms.',
        options: [],
        correctAnswer: 'Both use dynamic programming: Needleman-Wunsch performs Global Alignment, aligning two biological sequences across their entire lengths from end to end using an initialization matrix with end-gap penalties, optimal for comparing homologous genes of similar length. Smith-Waterman performs Local Alignment, identifying highly conserved regional motifs or domains within divergent sequences by resetting negative matrix values to zero, optimal for detecting conserved functional sub-sequences.',
        gradingPoints: [
          { concept: 'Needleman-Wunsch aligns entire sequence lengths (global alignment)', weight: 0.5, aliases: ['global alignment', 'end-to-end alignment'] },
          { concept: 'Smith-Waterman finds localized high-scoring regions resetting negatives to zero', weight: 0.5, aliases: ['local alignment', 'conserved motifs', 'zero floor'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe PAM and BLOSUM amino acid substitution matrices and when each is appropriate.',
        options: [],
        correctAnswer: 'PAM (Point Accepted Mutation) matrices (e.g., PAM250) are derived from observed mutations in closely related proteins and extrapolated mathematically for evolutionary distances, with higher numbers representing greater divergence. BLOSUM (Blocks Substitution Matrix) matrices (e.g., BLOSUM62) are based on direct observations of conserved blocks of aligned protein families; lower numbers (BLOSUM45) represent distant relationships while higher numbers (BLOSUM80) represent close homologs.',
        gradingPoints: [
          { concept: 'PAM extrapolates mutations with higher numbers for distant evolution', weight: 0.5, aliases: ['point accepted mutation', 'evolutionary distance'] },
          { concept: 'BLOSUM uses observed conserved blocks with lower numbers for distant homologs', weight: 0.5, aliases: ['blocks matrix', 'BLOSUM62'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the working of BLAST (Basic Local Alignment Search Tool) heuristic search algorithm.',
        options: [],
        correctAnswer: 'BLAST rapidly searches biological databases for sequence matches using heuristics instead of exhaustive dynamic programming. It operates in three phases: 1. Compiles a list of high-scoring words of length w from the query sequence; 2. Scans database for exact word matches (seeds); and 3. Extends seeds bidirectionally without gaps (HSP - High-Scoring Segment Pairs) until score drops below a threshold, evaluating statistical significance via Expectation Value (E-value).',
        gradingPoints: [
          { concept: 'word generation and seed matching in database', weight: 0.5, aliases: ['k-mers', 'seed search', 'word hit'] },
          { concept: 'bidirectional extension into High-Scoring Segment Pairs with E-value', weight: 0.5, aliases: ['seed extension', 'E-value statistical significance'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Distance-Based (UPGMA, Neighbor-Joining) vs Character-Based (Maximum Parsimony) phylogenetic tree construction methods.',
        options: [],
        correctAnswer: 'Distance-based methods compute pairwise evolutionary distance matrices between taxa: UPGMA clusters closest pairs assuming a constant molecular clock (ultrametric tree), while Neighbor-Joining does not assume a molecular clock and produces unrooted additive trees with unequal branch lengths. Character-based methods (Maximum Parsimony) evaluate all discrete character states (nucleotides/amino acids) directly, selecting the tree that requires the minimal number of evolutionary mutations to explain the observed data.',
        gradingPoints: [
          { concept: 'Distance methods (UPGMA/NJ) cluster pairwise distance matrices', weight: 0.5, aliases: ['neighbor joining', 'molecular clock distance'] },
          { concept: 'Character methods (Parsimony) find tree minimizing total mutation events', weight: 0.5, aliases: ['maximum parsimony', 'minimal mutations'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the application of Hidden Markov Models (HMM) in Computational Gene Prediction.',
        options: [],
        correctAnswer: 'An HMM models a sequence of observed biological symbols (nucleotides A, C, G, T) emitted by underlying unobservable hidden states (e.g., exon, intron, splice site, intergenic region). Gene prediction uses the Viterbi algorithm to determine the most probable sequence of hidden functional states that produced the genomic sequence, utilizing transition probabilities between genomic states and emission probabilities of nucleotide motifs.',
        gradingPoints: [
          { concept: 'models observed nucleotides emitted by hidden biological states (exons/introns)', weight: 0.5, aliases: ['hidden states and emitted symbols', 'splice sites'] },
          { concept: 'uses Viterbi algorithm to decode most probable state path', weight: 0.5, aliases: ['viterbi decoding', 'transition and emission probabilities'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Protein Structure hierarchy (Primary to Quaternary) and computational tools for structure prediction (e.g., AlphaFold).',
        options: [],
        correctAnswer: 'Protein hierarchy: Primary (linear amino acid chain); Secondary (local alpha-helices and beta-sheets via hydrogen bonds); Tertiary (3D folding driven by hydrophobic interactions and disulfide bonds); and Quaternary (assembly of multiple protein subunits). AlphaFold revolutionized prediction by combining transformer-based deep learning, evolutionary multiple sequence alignments (MSAs), and structural geometric attention to predict 3D atom coordinates with atomic accuracy.',
        gradingPoints: [
          { concept: 'Primary, Secondary, Tertiary, and Quaternary structure hierarchy', weight: 0.5, aliases: ['protein structural levels', 'alpha helices and beta sheets'] },
          { concept: 'AlphaFold uses deep learning with evolutionary MSAs for 3D atomic prediction', weight: 0.5, aliases: ['alphafold deep learning', '3D structure prediction'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain De Novo Genome Assembly using De Bruijn Graphs.',
        options: [],
        correctAnswer: 'Next-generation sequencers produce millions of short fragmented reads. De novo assembly reconstructs the whole genome without a reference genome. The De Bruijn Graph approach breaks reads into overlapping k-mers (substrings of length k); nodes represent (k-1)-mers and directed edges represent k-mers linking them. Assembly resolves to finding an Eulerian path (visiting every edge once), reconstructing the genomic sequence efficiently even with high read redundancy.',
        gradingPoints: [
          { concept: 'breaks short reads into overlapping k-mers', weight: 0.5, aliases: ['k-mer decomposition', 'short read assembly'] },
          { concept: 'constructs graph where assembly corresponds to finding an Eulerian path', weight: 0.5, aliases: ['eulerian path', 'de bruijn graph'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe major biological databases: NCBI GenBank, UniProt, and Protein Data Bank (PDB).',
        options: [],
        correctAnswer: 'NCBI GenBank is a comprehensive public repository of annotated nucleotide sequences and bibliographic citations. UniProt (Universal Protein Resource) is the central resource for protein sequence, functional annotation, and enzymatic properties. The Protein Data Bank (PDB) is the worldwide archive of experimentally determined 3D structural data of biological macromolecules (proteins and nucleic acids) resolved via X-ray crystallography, NMR, and Cryo-EM.',
        gradingPoints: [
          { concept: 'GenBank stores nucleotide sequences and genomic annotations', weight: 0.33, aliases: ['NCBI nucleotide repository'] },
          { concept: 'UniProt stores protein sequences and functional annotations', weight: 0.33, aliases: ['protein resource'] },
          { concept: 'PDB stores 3D macromolecular structures from X-ray/Cryo-EM', weight: 0.34, aliases: ['protein data bank', '3D macromolecular coordinates'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Multiple Sequence Alignment (MSA) and how does Progressive Alignment (ClustalW) operate?',
        options: [],
        correctAnswer: 'MSA aligns three or more biological sequences simultaneously to identify conserved functional domains and evolutionary relationships. Exact dynamic programming is NP-complete for many sequences. ClustalW uses a progressive heuristic: 1. Calculates pairwise alignment distances for all sequence pairs; 2. Constructs a guide tree using Neighbor-Joining; and 3. Progressively aligns sequences following the branching order of the guide tree, adding larger sequences/profiles sequentially.',
        gradingPoints: [
          { concept: 'aligns 3 or more sequences to reveal conserved regions and phylogeny', weight: 0.4, aliases: ['multiple alignment', 'conserved motifs'] },
          { concept: 'ClustalW uses pairwise distances, guide tree, and progressive alignment of profiles', weight: 0.6, aliases: ['guide tree', 'progressive profile alignment'] },
        ],
      },
    ],
  },

  // 6. CSC 504: Quantum Computing & Emerging Tech
  {
    code: 'CSC 504',
    title: 'Quantum Computing & Emerging Tech',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain the principles of Quantum Bits (Qubits), Superposition, and the Bloch Sphere representation.',
        options: [],
        correctAnswer: 'A classical bit is strictly 0 or 1. A Qubit is a two-state quantum system represented as |psi> = alpha|0> + beta|1>, where alpha and beta are complex probability amplitudes satisfying |alpha|^2 + |beta|^2 = 1. In Superposition, the qubit exists in a linear combination of basis states simultaneously until measurement collapses it. The Bloch Sphere is a geometric unit sphere where any single-qubit pure state corresponds to a point on the spherical surface defined by polar angle theta and azimuthal angle phi.',
        gradingPoints: [
          { concept: 'qubit represented as |psi> = alpha|0> + beta|1> with normalized amplitudes', weight: 0.5, aliases: ['state vector', 'linear combination of basis states'] },
          { concept: 'superposition collapses on measurement; Bloch sphere geometric representation', weight: 0.5, aliases: ['bloch sphere surface', 'measurement collapse'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Quantum Entanglement, Bell States, and the EPR Paradox.',
        options: [],
        correctAnswer: 'Quantum Entanglement is a phenomenon where two or more qubits become correlated such that the quantum state of any qubit cannot be described independently of the others, regardless of spatial distance. The four maximally entangled two-qubit Bell States (e.g., |Phi+> = (|00> + |11>)/sqrt(2)) exhibit perfect correlation. The EPR paradox questioned quantum completeness over "spooky action at a distance"; Bell\'s Theorem and experimental tests proved that quantum mechanics violates local realism.',
        gradingPoints: [
          { concept: 'states cannot be factored independently; measurement of one instantly determines the other', weight: 0.5, aliases: ['correlated quantum states', 'non-separable state'] },
          { concept: 'Bell states and violation of local realism (Bell theorem)', weight: 0.5, aliases: ['maximally entangled bell states', 'EPR paradox'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe fundamental Quantum Logic Gates: Pauli-X, Hadamard (H), Phase (S, T), and Controlled-NOT (CNOT).',
        options: [],
        correctAnswer: 'Quantum gates are reversible unitary matrix transformations: Pauli-X acts as a bit-flip (quantum NOT) swapping |0> and |1>; Hadamard (H) creates an equal superposition from basis states (H|0> = (|0>+|1>)/sqrt(2)); Phase gates (S, T) rotate the relative phase of |1> without altering probabilities; and CNOT is an entangling 2-qubit gate that flips the target qubit if and only if the control qubit is |1>.',
        gradingPoints: [
          { concept: 'Pauli-X is bit-flip and Hadamard creates equal superposition', weight: 0.5, aliases: ['quantum NOT', 'Hadamard superposition gate'] },
          { concept: 'CNOT is entangling two-qubit gate and Phase rotates relative phase', weight: 0.5, aliases: ['controlled-not gate', 'phase rotation'] },
        ],
      },
      {
        type: 'theory',
        question: 'State the Quantum No-Cloning Theorem and explain its implications for quantum computing and quantum cryptography.',
        options: [],
        correctAnswer: 'The No-Cloning Theorem proves that it is mathematically impossible to create an identical copy of an arbitrary unknown quantum state using unitary operations: if a unitary operator U satisfied U(|psi>|0>) = |psi>|psi>, linearity of quantum mechanics would be violated for non-orthogonal states. In computing, it prevents simple variable copying and classical error replication; in cryptography (BB84), it guarantees that any eavesdropping eavesdropper disturbs the state, enabling intrusion detection.',
        gradingPoints: [
          { concept: 'proves impossible to clone arbitrary unknown quantum state due to linearity', weight: 0.5, aliases: ['cannot duplicate unknown qubit', 'unitary linearity violation'] },
          { concept: 'implies quantum data cannot be copied and enables secure quantum key distribution', weight: 0.5, aliases: ['BB84 eavesdropping detection', 'quantum cryptography security'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Shor\'s Algorithm for integer factorization and why it poses an existential threat to modern public-key cryptography.',
        options: [],
        correctAnswer: 'Shor\'s algorithm finds the prime factors of an integer N in polynomial time O((log N)^3) by reducing factorization to order-finding (finding the period r of a function f(x) = a^x mod N) using the Quantum Fourier Transform (QFT). Classical supercomputers require exponential time (via General Number Field Sieve). Because RSA and Elliptic Curve Cryptography rely on the intractability of integer factorization and discrete logarithms, large-scale fault-tolerant quantum computers running Shor\'s algorithm will break RSA and ECC.',
        gradingPoints: [
          { concept: 'factors integers in polynomial time using Quantum Fourier Transform for period finding', weight: 0.6, aliases: ['order finding', 'quantum fourier transform', 'polynomial factoring'] },
          { concept: 'breaks RSA and ECC by solving prime factorization and discrete logarithms', weight: 0.4, aliases: ['compromises public key cryptography', 'breaks RSA'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Grover\'s Algorithm for unstructured database search and its quadratic speedup.',
        options: [],
        correctAnswer: 'Grover\'s algorithm searches an unsorted database of N items in O(sqrt(N)) quantum queries, providing a quadratic speedup over classical O(N) linear search. It initializes qubits in equal superposition and repeatedly applies the Grover Iteration: 1. Oracle operator (inverts the phase of the target marked state); 2. Diffusion operator (inversion about the average amplitude, boosting the target amplitude while suppressing non-target amplitudes). After ~pi/4 * sqrt(N) iterations, measurement yields the target state with high probability.',
        gradingPoints: [
          { concept: 'achieves quadratic speedup O(sqrt(N)) for unstructured search', weight: 0.5, aliases: ['quadratic speedup', 'O(sqrt(N)) queries'] },
          { concept: 'alternates Oracle phase inversion and Diffusion inversion about the average', weight: 0.5, aliases: ['grover iteration', 'amplitude amplification'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Quantum Decoherence, the NISQ era, and the principles of Quantum Error Correction.',
        options: [],
        correctAnswer: 'Decoherence is the loss of quantum information and phase coherence caused by environmental thermal noise and electromagnetic interference, turning quantum superpositions into classical probabilistic states. The current era is NISQ (Noisy Intermediate-Scale Quantum): systems have 50–1,000 noisy qubits without fault tolerance. Quantum Error Correction protects information by entangling a single logical qubit across multiple physical qubits (e.g., Surface Codes) to detect bit-flip and phase-flip errors via syndrome measurements without collapsing the superposition.',
        gradingPoints: [
          { concept: 'decoherence is environmental noise collapsing quantum states', weight: 0.4, aliases: ['quantum noise', 'loss of coherence'] },
          { concept: 'NISQ represents current noisy devices; error correction encodes logical qubits across physical qubits', weight: 0.6, aliases: ['noisy intermediate-scale quantum', 'surface codes', 'syndrome measurement'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Edge Computing architecture and how it complements Cloud Computing in IoT ecosystems.',
        options: [],
        correctAnswer: 'Cloud Computing centralizes storage and compute in remote mega-datacenters, causing latency and bandwidth bottlenecks for real-time applications. Edge Computing distributes compute, storage, and analytics to the periphery of the network close to data generation sources (IoT sensors, gateways, 5G base stations). It reduces network latency to milliseconds, conserves core network bandwidth, operates during intermittent connectivity, and enhances privacy by processing sensitive data locally.',
        gradingPoints: [
          { concept: 'processes data close to generation sources at network perimeter', weight: 0.5, aliases: ['edge gateways', 'proximity processing'] },
          { concept: 'reduces latency, conserves bandwidth, and operates offline complementing centralized cloud', weight: 0.5, aliases: ['low latency', 'bandwidth conservation', 'local privacy'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Neuromorphic Computing and how Spiking Neural Networks (SNN) mimic biological brain computation.',
        options: [],
        correctAnswer: 'Neuromorphic computing designs hardware (e.g., Intel Loihi, IBM TrueNorth) mimicking biological neuro-biological architectures, avoiding the Von Neumann bottleneck by co-locating processing and memory. Spiking Neural Networks (SNNs) process information using discrete, event-driven temporal spikes rather than continuous continuous activations: neurons accumulate charge and emit an action potential only when a threshold is reached, achieving ultra-low energy consumption.',
        gradingPoints: [
          { concept: 'brain-inspired hardware co-locating memory and processing', weight: 0.5, aliases: ['non-von neumann architecture', 'biological computing'] },
          { concept: 'event-driven temporal spikes with ultra-low energy consumption', weight: 0.5, aliases: ['spiking neural networks', 'event driven action potentials'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Blockchain technology and consensus mechanisms: Proof of Work (PoW) vs Proof of Stake (PoS).',
        options: [],
        correctAnswer: 'A blockchain is a decentralized, cryptographically linked distributed ledger. Proof of Work (PoW) achieves consensus by requiring miners to solve computationally intensive cryptographic puzzles (finding a nonce yielding a hash with leading zeros); it offers robust security but suffers from massive energy waste and low transaction throughput. Proof of Stake (PoS) selects block validators proportionally to their economic stake (tokens locked); it reduces energy consumption by >99% and offers higher throughput, relying on slashing mechanisms to penalize malicious validators.',
        gradingPoints: [
          { concept: 'PoW uses computational hashing puzzles; secure but energy intensive', weight: 0.5, aliases: ['proof of work mining', 'computational puzzle'] },
          { concept: 'PoS selects validators based on economic stake with slashing, saving energy', weight: 0.5, aliases: ['proof of stake validation', 'energy efficient consensus'] },
        ],
      },
    ],
  },

  // 7. CSC 599: B.Sc. Final Year Project II
  {
    code: 'CSC 599',
    title: 'B.Sc. Final Year Project II',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Outline the execution and full implementation phase of a B.Sc. Computer Science final year project.',
        options: [],
        correctAnswer: 'The final year project execution phase encompasses: 1. System architectural implementation (front-end UI, back-end APIs, database schema); 2. Integrating third-party services and machine learning models; 3. Verification and unit/integration testing; 4. System deployment and benchmarking on target platforms; 5. Conducting user evaluation and gathering empirical metrics; and 6. Writing the comprehensive final dissertation.',
        gradingPoints: [
          { concept: 'software coding, database implementation, and API integration', weight: 0.5, aliases: ['full stack development', 'system construction'] },
          { concept: 'system testing, deployment, empirical evaluation, and thesis writing', weight: 0.5, aliases: ['testing and benchmarking', 'dissertation documentation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the complete standard chapter layout of a university B.Sc. Computer Science dissertation.',
        options: [],
        correctAnswer: 'The standard layout includes: Title Page, Certification, Dedication, Acknowledgments, Abstract, Table of Contents; Chapter 1: Introduction (Background, Problem Statement, Aims and Objectives, Scope, Significance); Chapter 2: Literature Review and Theoretical Framework; Chapter 3: System Methodology, Architecture, and Design; Chapter 4: System Implementation, Testing, Results, and Discussion; Chapter 5: Summary, Conclusion, Recommendations; References; and Appendices (Code listings, User manual).',
        gradingPoints: [
          { concept: 'preliminary pages and Chapters 1 & 2 (Introduction and Literature Review)', weight: 0.4, aliases: ['preliminary pages', 'problem statement and literature'] },
          { concept: 'Chapters 3, 4, and 5 (Methodology, Implementation/Results, Conclusion/References)', weight: 0.6, aliases: ['system design', 'results and testing', 'conclusion and references'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how empirical benchmarking and performance evaluation should be presented in Chapter 4 of the dissertation.',
        options: [],
        correctAnswer: 'Empirical benchmarking must compare the developed system or algorithm against established baselines using quantitative metrics (e.g., accuracy, latency, throughput, memory consumption, CPU utilization). Results must be presented through clear scientific charts (box plots, ROC curves, bar graphs) and summary statistical tables, accompanied by objective analytical discussions explaining anomalies and verifying whether the project objectives were fulfilled.',
        gradingPoints: [
          { concept: 'quantitative performance metrics compared against baseline models', weight: 0.5, aliases: ['benchmarking against baselines', 'accuracy and latency metrics'] },
          { concept: 'scientific visualization via charts and tables with analytical discussion', weight: 0.5, aliases: ['graphs and tables', 'objective performance analysis'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the purpose and enforcement of Anti-Plagiarism policies (e.g., Turnitin) in undergraduate dissertations.',
        options: [],
        correctAnswer: 'Anti-plagiarism policies ensure academic honesty and protect intellectual property by verifying that students submit original scholarship. Turnitin compares submitted dissertations against billions of web pages, journals, and institutional student papers, producing a Similarity Index report. Universities typically enforce a maximum similarity threshold (e.g., <= 15-20%), requiring proper quotation, paraphrasing, and referencing standards.',
        gradingPoints: [
          { concept: 'verifies academic originality and integrity against global repositories', weight: 0.5, aliases: ['academic honesty', 'preventing intellectual theft'] },
          { concept: 'Turnitin similarity index report with institutional threshold compliance', weight: 0.5, aliases: ['similarity threshold', 'proper citation and paraphrasing'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are the essential components and best practices for delivering an effective final year project Oral Defense presentation?',
        options: [],
        correctAnswer: 'An effective oral defense requires: a concise slide deck (15–20 slides) highlighting the problem statement, objectives, methodology/architecture, key results, and conclusion; maintaining strict adherence to allotted time (10–15 minutes); presenting a reliable, pre-tested live software demonstration; and answering examiners questions calmly and authoritatively with grounding in software engineering principles.',
        gradingPoints: [
          { concept: 'concise slide deck covering problem, architecture, results, and conclusion', weight: 0.4, aliases: ['slide presentation', 'structured slides'] },
          { concept: 'working live software demonstration and authoritative defense of examiner questions', weight: 0.6, aliases: ['live demo', 'answering panel questions'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Unit Testing, Integration Testing, and User Acceptance Testing (UAT) conducted prior to project completion.',
        options: [],
        correctAnswer: 'Unit Testing validates individual functions and methods in isolation using automated frameworks (e.g., Jest, JUnit). Integration Testing verifies that separate modules (e.g., front-end communicating with back-end APIs and database) interact correctly without interface mismatches. User Acceptance Testing (UAT) places the system in front of target end users to validate whether the software satisfies their business workflows and user requirements in real-world scenarios.',
        gradingPoints: [
          { concept: 'unit tests verify individual functions while integration tests verify combined modules', weight: 0.5, aliases: ['isolated testing', 'module interaction'] },
          { concept: 'UAT validates software with actual end-users against requirements', weight: 0.5, aliases: ['user acceptance testing', 'real-world validation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how software deployment and hosting choices (e.g., cloud platforms, Docker containers) demonstrate technical maturity.',
        options: [],
        correctAnswer: 'Deploying a final year project to live production environments (e.g., Render, AWS, Vercel) with Docker containerization proves that the software is not merely a prototype running on localhost. Containerization bundles application code with dependencies into an immutable image, ensuring consistent execution across environments and demonstrating proficiency with industry DevOps workflows.',
        gradingPoints: [
          { concept: 'demonstrates production readiness beyond localhost environment', weight: 0.5, aliases: ['live deployment', 'cloud hosting'] },
          { concept: 'Docker containerization guarantees dependency reproducibility and portability', weight: 0.5, aliases: ['docker containers', 'devops maturity'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss handling unexpected roadblocks, scope negotiation, and contingency planning during software project implementation.',
        options: [],
        correctAnswer: 'When confronted with unexpected technical barriers (e.g., deprecated third-party APIs, insufficient compute resources for deep learning), an engineer must: document the limitation transparently; evaluate contingency alternatives; proactively consult the project supervisor to negotiate scope adjustments; and focus on fulfilling core requirements rather than abandoning the project.',
        gradingPoints: [
          { concept: 'transparent documentation of technical constraints and evaluating alternatives', weight: 0.5, aliases: ['identifying roadblocks', 'contingency plan'] },
          { concept: 'proactive consultation with supervisor and scope renegotiation', weight: 0.5, aliases: ['scope adjustment', 'supervisor communication'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe post-defense procedures: implementing panel corrections, supervisor sign-off, and final hardbound archival.',
        options: [],
        correctAnswer: 'Following the oral defense: the student compiles the official list of corrections raised by internal and external examiners; systematically modifies the dissertation chapters; presents the revised draft to the supervisor and head of department for formal verification and sign-off; and produces hardbound copies according to university color and binding standards for library and departmental archives.',
        gradingPoints: [
          { concept: 'compiling examiner corrections and updating dissertation text', weight: 0.5, aliases: ['implementing panel recommendations', 'revising draft'] },
          { concept: 'supervisor verification and submitting final hardbound archive copies', weight: 0.5, aliases: ['supervisor sign-off', 'hardbound submission', 'library archival'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss transitioning a successful undergraduate final year project into a peer-reviewed research paper or commercial startup.',
        options: [],
        correctAnswer: 'A high-impact project can be condensed into an IEEE or Springer conference/journal paper by focusing on novel algorithmic contributions, rigorous benchmarking, and formal literature citations under faculty co-authorship. Alternatively, projects with commercial viability can be transitioned into a startup through university incubators, intellectual property protection, and customer discovery.',
        gradingPoints: [
          { concept: 'condensing project into scientific conference/journal paper with novel contributions', weight: 0.5, aliases: ['research publication', 'academic paper'] },
          { concept: 'commercialization via incubators, customer validation, and intellectual property', weight: 0.5, aliases: ['startup commercialization', 'technology transfer'] },
        ],
      },
    ],
  },
];
