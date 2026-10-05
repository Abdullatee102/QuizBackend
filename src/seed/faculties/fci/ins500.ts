// src/seed/faculties/fci/ins500.ts
import type { SeedCourse } from '../../types.js';

export const ins500Courses: SeedCourse[] = [
  // 1. INS 502: Digital Transformation & Innovation
  {
    code: 'INS 502',
    title: 'Digital Transformation & Innovation',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Define Digital Transformation and explain how it fundamentally reshapes customer value propositions and operating models.',
        options: [],
        correctAnswer: 'Digital Transformation is the profound, strategic restructuring of an organization business model, operational processes, and organizational culture through digital technologies. It fundamentally reshapes customer value propositions by shifting from static physical products to personalized, outcome-based digital experiences (e.g., subscription models), and alters operating models by replacing manual legacy workflows with automated, real-time data-driven platforms.',
        gradingPoints: [
          { concept: 'strategic restructuring of business model processes culture via digital technology', weight: 0.5, aliases: ['digital transformation definition', 'business model reinvention'] },
          { concept: 'shifts customer value to outcome based digital experiences automates operating models', weight: 0.5, aliases: ['reshaping value propositions', 'data driven operating models'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept of Digital Agility and discuss how organizations cultivate organizational adaptability in volatile markets.',
        options: [],
        correctAnswer: 'Digital Agility is an enterprise capability to rapidly sense emerging market disruptions, customer behavioral shifts, and technological opportunities, and pivot operating processes and digital systems accordingly. Organizations cultivate this through cross-functional autonomous teams, continuous deployment pipelines (CI/CD), modular cloud microservices architectures, and data-driven experimentation cultures.',
        gradingPoints: [
          { concept: 'capability to rapidly sense and respond to disruptions and opportunities', weight: 0.5, aliases: ['digital agility definition', 'rapid adaptability in markets'] },
          { concept: 'cross functional teams ci cd pipelines cloud microservices experimentation culture', weight: 0.5, aliases: ['enablers of agility', 'autonomous teams and cloud architecture'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Digital Ecosystem and how do Platform Business Models generate shared value for participants?',
        options: [],
        correctAnswer: 'A digital ecosystem is an interconnected network of independent enterprises, developers, and customers that collaborate and compete using shared digital platforms. Platform business models generate shared value by orchestrating multi-sided interactions, lowering transaction costs, enabling external developers to build complementary innovations on open APIs, and creating positive feedback loops via network effects.',
        gradingPoints: [
          { concept: 'interconnected network of independent enterprises customers collaborating on platforms', weight: 0.5, aliases: ['digital ecosystem definition', 'multi sided participant network'] },
          { concept: 'lowers transaction costs enables open api innovation creates network effects', weight: 0.5, aliases: ['platform value generation', 'api innovation and network externalities'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the role of Artificial Intelligence and Machine Learning as catalysts for business model innovation.',
        options: [],
        correctAnswer: 'AI and ML act as catalysts by enabling predictive personalization at massive scale, automating complex cognitive tasks (e.g., fraud detection, algorithmic underwriting), optimizing dynamic pricing, and unlocking entirely new service paradigms such as conversational commerce, autonomous supply chain routing, and proactive predictive equipment maintenance.',
        gradingPoints: [
          { concept: 'enables massive scale predictive personalization and dynamic cognitive automation', weight: 0.5, aliases: ['ai cognitive automation', 'predictive personalization'] },
          { concept: 'unlocks new paradigms conversational commerce predictive maintenance algorithmic pricing', weight: 0.5, aliases: ['innovative ai business models', 'autonomous systems and dynamic pricing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the stages of the Digital Maturity Model (e.g., Unaware, Exploring, Doing, Becoming, Being Digital).',
        options: [],
        correctAnswer: 'The Digital Maturity Model outlines an organization progression: 1. Unaware/Nascent (traditional operations with no digital strategy); 2. Exploring (experimental, localized digital pilot projects in silos); 3. Doing (established digital initiatives with dedicated leadership, though legacy drag persists); 4. Becoming (integrated enterprise digital strategy with synchronized data flows); and 5. Being Digital (fully transformed, adaptive digital-native culture driven by continuous innovation).',
        gradingPoints: [
          { concept: 'framework evaluating organizational progression toward digital sophistication', weight: 0.4, aliases: ['maturity model definition', 'digital progression stages'] },
          { concept: 'unaware exploring doing becoming being digital maturity stages', weight: 0.6, aliases: ['five maturity stages', 'nascent pilot integrated digital native'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is "Legacy Debt" (Technical and Cultural Debt) and how does it hinder digital transformation in traditional firms?',
        options: [],
        correctAnswer: 'Legacy Debt comprises technical debt (outdated, undocumented monolithic software, obsolete hardware, brittle point-to-point integrations) and cultural debt (risk-averse mindsets, departmental turf wars, entrenched bureaucratic habits). It hinders transformation by consuming the vast majority of IT budgets on keeping lights on, resisting modern agile practices, and slowing down rapid feature iteration.',
        gradingPoints: [
          { concept: 'technical debt obsolete monolithic systems brittle integrations cultural debt risk aversion', weight: 0.5, aliases: ['technical and cultural debt', 'outdated architecture and rigid culture'] },
          { concept: 'consumes it budgets on maintenance blocks agile practices slows feature iteration', weight: 0.5, aliases: ['hinders transformation', 'budget consumption and organizational inertia'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Design Sprint methodology (developed by Google Ventures) for rapid innovation validation.',
        options: [],
        correctAnswer: 'The Design Sprint is a fast, 5-day structured framework for solving critical business problems through design, prototyping, and testing ideas with customers: Monday (Map the problem and choose a target); Tuesday (Sketch competing solutions); Wednesday (Decide on the best approach); Thursday (Build a realistic prototype); and Friday (Test the prototype with five real target users).',
        gradingPoints: [
          { concept: '5 day structured framework answering critical business questions via prototyping', weight: 0.4, aliases: ['design sprint definition', 'google ventures sprint'] },
          { concept: 'monday map tuesday sketch wednesday decide thursday prototype friday test', weight: 0.6, aliases: ['five sprint days', 'map sketch decide prototype test'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept of Omnichannel Customer Experience and the necessity of unified customer data platforms (CDPs).',
        options: [],
        correctAnswer: 'An Omnichannel experience provides seamless, context-aware interactions across mobile apps, physical branches, websites, and call centers without breaking continuity. Customer Data Platforms (CDPs) are essential because they aggregate and unify first-party customer touchpoint data from all channels into a single, real-time 360-degree customer profile accessible by all front-line systems.',
        gradingPoints: [
          { concept: 'seamless context aware customer interactions across all physical and digital touchpoints', weight: 0.5, aliases: ['omnichannel experience', 'unified cross channel customer journey'] },
          { concept: 'cdp aggregates touchpoint data into single real time 360 degree customer profile', weight: 0.5, aliases: ['cdp role', 'unified 360 profile customer data platform'] },
        ],
      },
      {
        type: 'theory',
        question: 'How do Chief Digital Officers (CDOs) drive change management compared to traditional CIOs?',
        options: [],
        correctAnswer: 'While the traditional CIO focuses primarily on IT operational stability, infrastructure reliability, cost efficiency, and risk governance, the Chief Digital Officer (CDO) focuses on growth, customer experience, digital product innovation, and breaking down cultural barriers to accelerate organizational agility and digital revenue generation.',
        gradingPoints: [
          { concept: 'cio focuses on infrastructure stability efficiency governance it operations', weight: 0.5, aliases: ['cio operational stability focus', 'infrastructure and cost management'] },
          { concept: 'cdo focuses on revenue growth customer experience digital products cultural change', weight: 0.5, aliases: ['cdo digital growth focus', 'product innovation and transformation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Data Monetization strategies: Direct Monetization versus Indirect Monetization.',
        options: [],
        correctAnswer: 'Direct Data Monetization sells raw, aggregated, or analytical data products to third parties for direct cash revenue (e.g., selling anonymized credit transaction trends to hedge funds). Indirect Data Monetization uses internal data insights to enhance internal operations, optimize supply chain routing, reduce customer churn, or personalize products to boost corporate profitability without selling data.',
        gradingPoints: [
          { concept: 'direct monetization sells data or analytics products directly to third parties', weight: 0.5, aliases: ['direct data sales', 'monetizing data assets externally'] },
          { concept: 'indirect monetization uses internal insights to optimize operations reduce costs boost profits', weight: 0.5, aliases: ['indirect operational efficiency', 'internal optimization via data'] },
        ],
      },
    ],
  },

  // 2. INS 503: Big Data Architecture & Analytics
  {
    code: 'INS 503',
    title: 'Big Data Architecture & Analytics',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the 5 V of Big Data: Volume, Velocity, Variety, Veracity, and Value.',
        options: [],
        correctAnswer: 'Volume represents the massive scale of data generated (terabytes to petabytes). Velocity denotes the unprecedented speed at which data streams arrive and must be processed (real-time streaming). Variety refers to the diversity of data formats (structured tables, semi-structured JSON, unstructured video and audio). Veracity pertains to the trustworthiness, noise, and quality of data. Value represents the business benefit extracted through analytics.',
        gradingPoints: [
          { concept: 'volume massive scale petabytes velocity rapid streaming arrival speed', weight: 0.4, aliases: ['volume and velocity', 'scale and speed of data'] },
          { concept: 'variety diverse structured unstructured formats veracity trustworthiness quality', weight: 0.4, aliases: ['variety and veracity', 'data formats and truthfulness'] },
          { concept: 'value actionable business insight extracted through analytics', weight: 0.2, aliases: ['value extraction', 'business insight realization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Hadoop Distributed File System (HDFS) architecture: NameNode, DataNodes, and Block Replication.',
        options: [],
        correctAnswer: 'HDFS is a distributed, fault-tolerant file system designed to run on commodity hardware clusters. The NameNode acts as the master, maintaining directory tree metadata and block locations in RAM. DataNodes store actual data blocks on local disks. Large files are split into contiguous blocks (typically 128MB) and replicated across multiple DataNodes (default replication factor: 3) to guarantee high availability during hardware failure.',
        gradingPoints: [
          { concept: 'namenode master managing metadata and block mappings in memory', weight: 0.4, aliases: ['namenode role', 'metadata master'] },
          { concept: 'datanodes store actual data blocks on local disks', weight: 0.3, aliases: ['datanode role', 'worker node block storage'] },
          { concept: 'block splitting 128mb and block replication factor 3 for fault tolerance', weight: 0.3, aliases: ['block replication factor', 'commodity hardware fault tolerance'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the MapReduce programming paradigm, illustrating the Map, Shuffle & Sort, and Reduce phases.',
        options: [],
        correctAnswer: 'MapReduce is a distributed processing framework. The Map phase processes input data chunks in parallel, applying user-defined transformation logic to emit intermediate key-value pairs (k2, v2). The Shuffle & Sort phase automatically collects, partitions across the network, and sorts all values sharing the same key. The Reduce phase aggregates the values associated with each unique key to produce the final output dataset.',
        gradingPoints: [
          { concept: 'map phase parallel processing emitting intermediate key value pairs', weight: 0.35, aliases: ['map function', 'emitting key value pairs'] },
          { concept: 'shuffle and sort groups and sorts all values for identical keys across network', weight: 0.35, aliases: ['shuffle sort phase', 'network partition sorting'] },
          { concept: 'reduce phase aggregates values per key generating final summarized output', weight: 0.3, aliases: ['reduce function', 'aggregating grouped values'] },
        ],
      },
      {
        type: 'theory',
        question: 'Why has Apache Spark largely replaced MapReduce for large-scale iterative data processing, and what are RDDs?',
        options: [],
        correctAnswer: 'Apache Spark is up to 100 times faster than MapReduce for iterative processing because it performs in-memory computations rather than constantly writing intermediate results to physical disks between stages. Resilient Distributed Datasets (RDDs) are Spark core abstraction: immutable, lazily evaluated, fault-tolerant distributed collections of objects partitioned across cluster nodes that can be rebuilt using lineage graphs upon node failure.',
        gradingPoints: [
          { concept: 'spark operates in memory avoiding mapreduce slow intermediate disk io', weight: 0.5, aliases: ['in memory computing speed', 'avoids disk write overhead'] },
          { concept: 'rdds immutable fault tolerant distributed collections rebuilt via lineage', weight: 0.5, aliases: ['rdd abstraction', 'resilient distributed datasets lineage'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Lambda Architecture and Kappa Architecture for real-time and batch data processing.',
        options: [],
        correctAnswer: 'Lambda Architecture maintains dual processing pipelines: a Batch Layer (e.g., Hadoop) for comprehensive, fault-tolerant historical processing, and a Speed Layer (e.g., Storm, Spark Streaming) for low-latency real-time streaming, merging query results in a Serving Layer (complex to maintain dual codebases). Kappa Architecture replaces dual pipelines with a single stream-processing engine (e.g., Apache Flink, Kafka) that treats all data as an unbounded stream, running both real-time and historical replay through the same codebase.',
        gradingPoints: [
          { concept: 'lambda dual pipelines batch layer and speed layer merged in serving layer', weight: 0.5, aliases: ['lambda architecture batch speed', 'dual processing paths'] },
          { concept: 'kappa single stream processing engine treating all data as unbounded stream', weight: 0.5, aliases: ['kappa stream only architecture', 'unified streaming pipeline'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain NoSQL databases and classify the four primary NoSQL data models: Key-Value, Document, Column-Family, and Graph.',
        options: [],
        correctAnswer: 'NoSQL databases provide horizontal scalability, flexible schema-less data models, and high throughput for big data. Key-Value stores pair unique keys with opaque values (e.g., Redis, DynamoDB). Document stores persist semi-structured JSON/BSON documents with deep nesting (e.g., MongoDB). Column-Family stores organize data into sparse multi-dimensional maps indexed by row and column (e.g., Apache Cassandra, HBase). Graph stores persist nodes and edges with properties to traverse complex relationship networks (e.g., Neo4j).',
        gradingPoints: [
          { concept: 'key value redis document mongodb column family cassandra graph neo4j', weight: 0.7, aliases: ['four nosql models', 'document key value columnar graph'] },
          { concept: 'horizontal scalability schema flexibility high throughput for big data', weight: 0.3, aliases: ['nosql characteristics', 'distributed schema less design'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the CAP Theorem in distributed data systems, and why can a distributed system satisfy only two of the three properties?',
        options: [],
        correctAnswer: 'The CAP Theorem states that a distributed data system can simultaneously provide at most two of three guarantees: Consistency (all nodes see the exact same data simultaneously), Availability (every non-failing request receives a non-error response), and Partition Tolerance (the system continues operating despite network packet loss or communication splits). Because network partitions are inevitable in real-world distributed networks, systems must choose between CP (consistent during partitions) or AP (available during partitions).',
        gradingPoints: [
          { concept: 'consistency availability partition tolerance cap guarantees', weight: 0.5, aliases: ['three cap properties', 'consistency availability partition'] },
          { concept: 'network partitions inevitable forcing trade off between consistency cp and availability ap', weight: 0.5, aliases: ['trade off during partition', 'cp vs ap design choice'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Apache Kafka in enterprise event streaming architectures.',
        options: [],
        correctAnswer: 'Apache Kafka is a distributed event streaming platform built as a fault-tolerant, horizontally scalable publish-subscribe commit log. It decouples data producers from consumers, buffering massive velocity event streams in durable, partitioned topics replicated across broker clusters, allowing high-throughput parallel consumption with millisecond latency.',
        gradingPoints: [
          { concept: 'distributed publish subscribe commit log decoupling producers and consumers', weight: 0.5, aliases: ['kafka pub sub log', 'event streaming backbone'] },
          { concept: 'partitioned topics replication horizontal scalability durable high throughput buffering', weight: 0.5, aliases: ['partitions topics brokers', 'high throughput stream buffering'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Data Mesh architecture and how does it shift data governance from centralized to domain-oriented ownership?',
        options: [],
        correctAnswer: 'Data Mesh is a decentralized socio-technical architectural paradigm that shifts analytical data governance away from a monolithic central data team to cross-functional domain teams (e.g., Marketing, Logistics). Its four pillars are: Domain-Oriented Data Ownership, Data as a Product, Self-Serve Data Infrastructure Platform, and Federated Computational Governance.',
        gradingPoints: [
          { concept: 'decentralized paradigm shifting ownership from monolithic team to domain teams', weight: 0.5, aliases: ['data mesh decentralization', 'domain oriented ownership'] },
          { concept: 'domain ownership data as product self serve platform federated computational governance', weight: 0.5, aliases: ['four data mesh pillars', 'product thinking self serve platform'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Feature Stores in production Machine Learning and Big Data pipelines.',
        options: [],
        correctAnswer: 'A Feature Store is a centralized data management layer for machine learning that standardizes the computation, storage, sharing, and serving of ML features. It solves the "training-serving skew" by ensuring consistent feature values are used both during offline model training on historical data warehouses and during real-time online inference via low-latency key-value stores.',
        gradingPoints: [
          { concept: 'centralized layer computing storing sharing serving ml features', weight: 0.5, aliases: ['feature store definition', 'ml data management platform'] },
          { concept: 'eliminates training serving skew providing consistent offline training and online inference', weight: 0.5, aliases: ['training serving skew prevention', 'dual offline online feature consistency'] },
        ],
      },
    ],
  },

  // 3. INS 505: Information Systems Auditing & Ethics
  {
    code: 'INS 505',
    title: 'IS Auditing & Ethics',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the ISACA Code of Professional Ethics for Certified Information Systems Auditors (CISA).',
        options: [],
        correctAnswer: 'The ISACA Code of Professional Ethics requires auditors to: support the implementation of governance best practices, perform duties with professional objectivity and due diligence, serve in the interest of stakeholders with integrity, maintain the strict confidentiality of information obtained during audits, maintain professional competence through continuous education, and disclose audit findings truthfully without bias.',
        gradingPoints: [
          { concept: 'professional objectivity due diligence and stakeholder integrity', weight: 0.5, aliases: ['objectivity and integrity', 'due professional care'] },
          { concept: 'strict confidentiality competence continuous learning truthful transparent reporting', weight: 0.5, aliases: ['confidentiality and truthful disclosure', 'isaca professional standards'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Compliance Audits, Financial Audits, Operational Audits, and Forensic Audits in IT.',
        options: [],
        correctAnswer: 'Compliance Audits determine whether systems adhere to laws, industry regulations, and contracts (e.g., NDPR, PCI-DSS). Financial Audits evaluate internal controls that impact financial reporting data integrity. Operational Audits assess the efficiency, effectiveness, and resource utilization of IT operations against management objectives. Forensic Audits collect legally admissible digital evidence to investigate white-collar crime, embezzlement, or corporate sabotage.',
        gradingPoints: [
          { concept: 'compliance regulatory legal contractual adherence', weight: 0.25, aliases: ['compliance audits', 'legal and regulatory checks'] },
          { concept: 'financial integrity of financial transaction records and ledgers', weight: 0.25, aliases: ['financial it audits', 'financial reporting controls'] },
          { concept: 'operational efficiency effectiveness resource utilization of it', weight: 0.25, aliases: ['operational audits', 'process efficiency evaluation'] },
          { concept: 'forensic gathering legally admissible digital evidence of fraud or crime', weight: 0.25, aliases: ['forensic it audits', 'evidence gathering for prosecution'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Algorithmic Bias and Ethical AI principles in automated decision-making information systems.',
        options: [],
        correctAnswer: 'Algorithmic bias occurs when an automated system reflects and amplifies systematic unfairness or discrimination against protected demographic groups, often due to biased historical training datasets or flawed model features. Ethical AI principles require: Fairness (mitigating demographic disparate impact), Transparency/Explainability (enabling humans to understand decision logic), Accountability (clear human responsibility for AI outcomes), and Privacy.',
        gradingPoints: [
          { concept: 'amplification of systematic discrimination due to biased historical data or features', weight: 0.5, aliases: ['algorithmic bias definition', 'discriminatory automated outcomes'] },
          { concept: 'fairness transparency explainability accountability privacy ethical ai principles', weight: 0.5, aliases: ['ethical ai tenets', 'fairness and explainable ai'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Continuous Auditing and Continuous Monitoring (CA/CM) in automated ERP systems?',
        options: [],
        correctAnswer: 'Continuous Auditing (CA) is an automated approach that allows auditors to perform audit-related evaluations and testing on a near real-time, ongoing basis rather than through periodic annual checks. Continuous Monitoring (CM) is the management-operated process that continuously tracks transactions against compliance rules (e.g., scanning all automated payments for duplicate vendors or unauthorized limit overrides).',
        gradingPoints: [
          { concept: 'continuous auditing automated ongoing real time auditor evaluations', weight: 0.5, aliases: ['ca continuous audit', 'real time audit evaluations'] },
          { concept: 'continuous monitoring management process tracking compliance overrides anomalies', weight: 0.5, aliases: ['cm continuous monitoring', 'ongoing management rule monitoring'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Intellectual Property ethics: Digital Millennium Copyright Act (DMCA), Fair Use, and Open Source Software (OSS) licenses.',
        options: [],
        correctAnswer: 'The DMCA criminalizes unauthorized circumvention of digital rights management (DRM) technologies. Fair Use allows limited, transformative use of copyrighted material without permission for criticism, education, news reporting, or scholarship. Open Source Software (OSS) licenses legally dictate code reuse terms, ranging from permissive licenses (MIT, Apache: allowing proprietary commercial bundling) to copyleft licenses (GPL: requiring derivative works to remain open source).',
        gradingPoints: [
          { concept: 'dmca criminalizes drm circumvention fair use allows educational transformative use', weight: 0.5, aliases: ['dmca and fair use', 'copyright circumvention and fair use'] },
          { concept: 'oss permissive mit apache vs copyleft gpl terms for derivative code', weight: 0.5, aliases: ['open source licensing ethics', 'permissive vs copyleft licenses'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of IT Whistleblowing policies and the legal protections afforded to corporate informants.',
        options: [],
        correctAnswer: 'IT whistleblowing policies establish confidential, retaliation-free channels for employees to report illegal corporate activities, privacy violations, or intentional security negligence. Legal protections (e.g., Sarbanes-Oxley Act, Whistleblower Protection Act) shield informants from wrongful termination, demotion, or harassment, providing legal remedies and confidentiality guarantees.',
        gradingPoints: [
          { concept: 'confidential channels reporting illegal activity privacy breaches or negligence', weight: 0.5, aliases: ['whistleblowing channels', 'reporting corporate malfeasance'] },
          { concept: 'legal shields against retaliation wrongful termination harassment guaranteed anonymity', weight: 0.5, aliases: ['informant legal protections', 'anti retaliation safeguards'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Conflict of Interest in IT consulting and audit engagements and how is it managed?',
        options: [],
        correctAnswer: 'A conflict of interest occurs when an auditor or IT consultant personal, financial, or business relationships could compromise their professional objectivity (e.g., auditing an ERP system implemented by their own consulting firm). It is managed through formal disclosure declarations, recusal from engagements, rotation of audit partners, and strict structural firewalls between consulting and audit divisions.',
        gradingPoints: [
          { concept: 'personal or financial relationships compromising professional objectivity', weight: 0.5, aliases: ['conflict of interest definition', 'compromised auditor independence'] },
          { concept: 'disclosure recusal partner rotation structural firewalls between services', weight: 0.5, aliases: ['managing conflicts of interest', 'recusal and independence separation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Surveillance Capitalism (coined by Shoshana Zuboff) and the ethical commodification of behavioral data.',
        options: [],
        correctAnswer: 'Surveillance Capitalism is an economic paradigm centered on the commodification of personal data into behavioral surplus. Big tech platforms claim human private experience as free raw material, translating it into behavioral data to train predictive machine learning models that anticipate and modify future consumer actions, raising profound ethical concerns regarding autonomy, privacy, and democratic manipulation.',
        gradingPoints: [
          { concept: 'unauthorized commodification of private experience into behavioral surplus', weight: 0.5, aliases: ['surveillance capitalism concept', 'behavioral data commodification'] },
          { concept: 'predictive models anticipating and modifying human behavior threatening autonomy', weight: 0.5, aliases: ['behavior modification market', 'threats to privacy and human autonomy'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the purpose and structure of a formal IS Audit Report.',
        options: [],
        correctAnswer: 'An IS Audit Report communicates audit findings, conclusions, and recommendations to the Board Audit Committee and management. Key sections include: Executive Summary (high-level risk posture), Audit Scope and Objectives, Methodology Employed, Detailed Findings (classified by risk severity: High, Medium, Low), Root Cause Analysis, Management Responses (with remediation deadlines), and Final Auditor Opinion.',
        gradingPoints: [
          { concept: 'communicates audit findings risk posture and recommendations to board management', weight: 0.4, aliases: ['audit report purpose', 'formal presentation of findings'] },
          { concept: 'executive summary scope methodology findings severity remediation deadlines opinion', weight: 0.6, aliases: ['audit report sections', 'findings root cause management response'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss professional due diligence and liability when reporting critical zero-day vulnerabilities in audited systems.',
        options: [],
        correctAnswer: 'When discovering zero-day vulnerabilities, professional due diligence requires Responsible Disclosure: notifying system owners immediately through private, encrypted channels, documenting proof-of-concept steps without causing destructive outages, agreeing on a reasonable patch grace period (e.g., 90 days), and refraining from public release until a remediation patch is deployed to protect innocent users.',
        gradingPoints: [
          { concept: 'responsible disclosure private encrypted notification to owners without public leak', weight: 0.5, aliases: ['responsible disclosure practice', 'coordinated vulnerability disclosure'] },
          { concept: 'reasonable patch grace period 90 days non destructive testing user protection', weight: 0.5, aliases: ['patch grace period', 'non destructive verification due care'] },
        ],
      },
    ],
  },

  // 4. INS 511: Advanced Enterprise Architecture
  {
    code: 'INS 511',
    title: 'Advanced Enterprise Architecture',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain the TOGAF Architecture Development Method (ADM) cycle from Preliminary Phase through Phase H.',
        options: [],
        correctAnswer: 'The TOGAF ADM is an iterative method for developing enterprise architectures: Preliminary (scoping and governance); Phase A: Architecture Vision; Phase B: Business Architecture; Phase C: Information Systems Architectures (Data and Application); Phase D: Technology Architecture; Phase E: Opportunities and Solutions; Phase F: Migration Planning; Phase G: Implementation Governance; and Phase H: Architecture Change Management.',
        gradingPoints: [
          { concept: 'iterative lifecycle method guiding enterprise architecture development', weight: 0.3, aliases: ['togaf adm definition', 'architecture development method'] },
          { concept: 'preliminary vision business data application technology solutions migration governance change', weight: 0.7, aliases: ['phases a to h', 'togaf adm phases'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Zachman Framework for Enterprise Architecture and its two-dimensional taxonomy grid.',
        options: [],
        correctAnswer: 'The Zachman Framework is a two-dimensional classification ontology for describing enterprise architectures. Its rows represent Stakeholder Perspectives: Planner (Scope), Owner (Business Model), Designer (System Model), Builder (Technology Model), Subcontractor (Detailed Specs), and Functioning Enterprise. Its columns represent the Fundamental Interrogatives: What (Data), How (Function), Where (Network), Who (People), When (Time), and Why (Motivation).',
        gradingPoints: [
          { concept: 'two dimensional taxonomy matrix describing enterprise artifacts', weight: 0.4, aliases: ['zachman framework definition', 'ontological ea grid'] },
          { concept: 'rows stakeholder perspectives columns fundamental interrogatives what how where who when why', weight: 0.6, aliases: ['perspectives and interrogatives', 'six rows and six columns'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Service-Oriented Architecture (SOA) and Event-Driven Architecture (EDA).',
        options: [],
        correctAnswer: 'Service-Oriented Architecture (SOA) structures systems as reusable services communicating via synchronous, request-response RPC/REST protocols mediated by an Enterprise Service Bus (ESB), resulting in tighter temporal coupling. Event-Driven Architecture (EDA) decouples systems completely: producers emit events asynchronously upon state changes, and consumers independently listen to message brokers without knowing who produced them, maximizing elasticity and fault isolation.',
        gradingPoints: [
          { concept: 'soa synchronous request response reusable services temporal coupling esb', weight: 0.5, aliases: ['soa request response', 'service oriented esb synchronous'] },
          { concept: 'eda asynchronous event brokers total decoupling elastic fault isolation', weight: 0.5, aliases: ['event driven asynchronous', 'eda decoupled brokers events'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Domain-Driven Design (DDD) and how do Bounded Contexts define architectural boundaries?',
        options: [],
        correctAnswer: 'Domain-Driven Design (DDD) is a software design approach that centers architecture on complex business domain logic and a Ubiquitous Language shared by developers and domain experts. A Bounded Context is an explicit boundary within which a specific domain model applies; terms and concepts within the context have a strictly uniform meaning, preventing semantic contamination between different microservices.',
        gradingPoints: [
          { concept: 'software design centered on business domain and shared ubiquitous language', weight: 0.5, aliases: ['ddd definition', 'domain model centering'] },
          { concept: 'bounded context defines boundary where domain model and language apply uniformly', weight: 0.5, aliases: ['bounded context definition', 'isolates microservice domain models'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept of Micro-Frontends and how it applies microservices principles to frontend web architectures.',
        options: [],
        correctAnswer: 'Micro-Frontends decompose a monolithic frontend web application into smaller, semi-independent web apps owned by autonomous end-to-end cross-functional teams. Each team writes, tests, and deploys their feature slice (e.g., checkout, search, profile) using independent frameworks, combining them dynamically into a unified customer browser interface using Module Federation or Web Components.',
        gradingPoints: [
          { concept: 'decomposes frontend monolith into semi independent modular web applications', weight: 0.5, aliases: ['micro frontends definition', 'frontend microservice decomposition'] },
          { concept: 'autonomous cross functional teams deploy feature slices assembled via module federation', weight: 0.5, aliases: ['module federation web components', 'independent frontend deployments'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cloud-Native Architecture and the Twelve-Factor App methodology for modern scalable applications.',
        options: [],
        correctAnswer: 'Cloud-Native architecture designs applications specifically to run elastically in public cloud containerized environments (Kubernetes). The Twelve-Factor App methodology provides architectural tenets including: single codebase tracking, explicit dependency declaration, storing configuration in the environment, treating backing services as attached resources, stateless shared-nothing processes, fast startup and graceful shutdown, and parity between development and production.',
        gradingPoints: [
          { concept: 'applications architected specifically for resilient scalable containerized cloud environments', weight: 0.4, aliases: ['cloud native definition', 'kubernetes container architecture'] },
          { concept: 'twelve factor tenets single codebase env config statelessness attached backing services', weight: 0.6, aliases: ['12 factor principles', 'twelve factor app tenets'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of API Gateways and Service Meshes (e.g., Istio) in enterprise microservices architectures.',
        options: [],
        correctAnswer: 'An API Gateway sits at the system perimeter (North-South traffic), handling external client requests, SSL termination, rate limiting, and coarse authentication. A Service Mesh (e.g., Istio) manages internal inter-service communication (East-West traffic) using lightweight sidecar proxies, delivering mutual TLS (mTLS) encryption, fine-grained traffic routing, circuit breaking, and distributed tracing without altering application code.',
        gradingPoints: [
          { concept: 'api gateway manages north south perimeter client traffic rate limiting auth ssl', weight: 0.5, aliases: ['api gateway perimeter role', 'north south client traffic'] },
          { concept: 'service mesh manages east west internal inter service traffic mtls tracing circuit breaking', weight: 0.5, aliases: ['service mesh east west role', 'istio sidecar mtls tracing'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is CQRS (Command Query Responsibility Segregation) and when is it paired with Event Sourcing?',
        options: [],
        correctAnswer: 'CQRS separates read and write operations into distinct data models: Commands mutate state without returning complex data, while Queries retrieve state from optimized read models without modifying data. When paired with Event Sourcing, every state change is stored as an immutable sequence of historical domain events in an event store, allowing read models to be projected asynchronously and replayed at any time.',
        gradingPoints: [
          { concept: 'cqrs separates write command models from read query models', weight: 0.5, aliases: ['cqrs segregation', 'command query model separation'] },
          { concept: 'event sourcing stores state as append only event sequence projected to read models', weight: 0.5, aliases: ['event sourcing pairing', 'immutable event replay projection'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Technical Debt in enterprise architecture and how the Strangler Fig Pattern mitigates migration risk.',
        options: [],
        correctAnswer: 'Technical debt reflects the implied cost of future rework caused by choosing quick, shortcut architectural solutions instead of well-designed approaches. The Strangler Fig Pattern mitigates legacy migration risk by incrementally replacing monolithic system functionalities with modern microservices around the edges until the old monolith is completely deprecated and safely decommissioned, avoiding risky big-bang rewrites.',
        gradingPoints: [
          { concept: 'technical debt implied cost of future rework from sub optimal architectural shortcuts', weight: 0.4, aliases: ['technical debt definition', 'cost of architectural shortcuts'] },
          { concept: 'strangler fig pattern incrementally replaces monolith slice by slice avoiding big bang', weight: 0.6, aliases: ['strangler fig pattern', 'incremental monolith deprecation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Architecture Governance and the role of Architecture Review Boards (ARB) in enforcing enterprise compliance.',
        options: [],
        correctAnswer: 'Architecture Governance is the practice and management framework that ensures enterprise architectures adhere to agreed standards, policies, and strategic direction. The Architecture Review Board (ARB) is an executive technical governance body that reviews proposed system designs against corporate architecture standards, resolves technical variance requests, and prevents rogue architectural fragmentation across departments.',
        gradingPoints: [
          { concept: 'governance framework ensuring systems align with enterprise strategy and technical standards', weight: 0.5, aliases: ['architecture governance definition', 'aligning systems with architecture standards'] },
          { concept: 'arb reviews proposed system designs grants variances prevents rogue fragmentation', weight: 0.5, aliases: ['architecture review board role', 'arb design compliance and variances'] },
        ],
      },
    ],
  },

  // 5. INS 513: Strategic Information Systems
  {
    code: 'INS 513',
    title: 'Strategic Information Systems',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Define Strategic Information Systems (SIS) and explain how they differ from operational Transaction Processing Systems.',
        options: [],
        correctAnswer: 'Strategic Information Systems (SIS) are systems that shape or directly support a firm competitive strategy, alter business relationships, and create sustainable competitive advantage over industry rivals. Unlike operational TPS, which focuses purely on internal clerical automation and transactional processing efficiency, SIS is outward-looking and directly drives market differentiation, cost leadership, and customer lock-in.',
        gradingPoints: [
          { concept: 'systems directly supporting competitive strategy and creating sustainable advantage', weight: 0.5, aliases: ['sis definition', 'competitive advantage information systems'] },
          { concept: 'differs from tps outward looking market focus vs internal clerical processing efficiency', weight: 0.5, aliases: ['sis vs operational tps', 'strategic market impact vs internal automation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Apply Michael Porter Five Forces Model to explain how digital technologies alter industry competitive dynamics.',
        options: [],
        correctAnswer: 'Porter Five Forces are altered by digital technology: 1. Threat of New Entrants (lowered capital barriers via cloud infrastructure, yet raised by proprietary AI/data scale); 2. Bargaining Power of Buyers (heightened by instant price transparency online); 3. Bargaining Power of Suppliers (lowered by global electronic procurement); 4. Threat of Substitutes (accelerated by digital platforms replacing physical services); and 5. Rivalry among Competitors (intensified by price transparency and rapid digital benchmarking).',
        gradingPoints: [
          { concept: 'new entrants buyers suppliers substitutes industry rivalry five forces', weight: 0.5, aliases: ['five competitive forces', 'porter forces framework'] },
          { concept: 'articulates concrete digital technology impacts on each of the five forces', weight: 0.5, aliases: ['digital alteration of forces', 'cloud transparency platform dynamics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Porter Value Chain Model and differentiate between Primary Activities and Support Activities.',
        options: [],
        correctAnswer: 'Porter Value Chain identifies operational activities through which a firm creates customer value. Primary Activities directly relate to physical creation, sale, and support of products: Inbound Logistics, Operations, Outbound Logistics, Marketing & Sales, and Service. Support Activities reinforce primary activities with specialized capabilities: Firm Infrastructure, Human Resource Management, Technology Development, and Procurement.',
        gradingPoints: [
          { concept: 'framework mapping sequential activities that generate customer value and margin', weight: 0.3, aliases: ['value chain concept', 'creating customer value'] },
          { concept: 'primary inbound operations outbound marketing service', weight: 0.35, aliases: ['primary activities list', 'core line operations'] },
          { concept: 'support infrastructure hr technology development procurement', weight: 0.35, aliases: ['support activities list', 'enabling overhead activities'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Generic Competitive Strategies (Cost Leadership, Differentiation, and Focus) and how IT enables each.',
        options: [],
        correctAnswer: 'Cost Leadership aims to be the lowest-cost producer in the industry; IT enables this through automated supply chain execution, robotic warehousing, and paperless self-service. Differentiation creates uniquely valued product attributes; IT enables this through personalized mobile apps, AI recommendations, and premium customer service. Focus targets a narrow niche market; IT enables this through fine-grained analytics and targeted localized digital marketing.',
        gradingPoints: [
          { concept: 'cost leadership lowest cost producer automated operations and supply chain', weight: 0.35, aliases: ['cost leadership it enablers', 'operational automation cost reduction'] },
          { concept: 'differentiation uniquely valued features ai personalization premium experience', weight: 0.35, aliases: ['differentiation it enablers', 'customization premium service'] },
          { concept: 'focus narrow market niche targeted analytics specialized software', weight: 0.3, aliases: ['focus niche strategy', 'tailored niche analytics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept of "Switching Costs" and "Customer Lock-In" enabled by strategic information systems.',
        options: [],
        correctAnswer: 'Switching costs are the economic, psychological, and operational penalties a customer or firm incurs when moving from one supplier system to a rival. Strategic systems create customer lock-in by integrating proprietary data formats, building deeply customized user routines, embedding workflows, and accumulating historical data, making migrating to a competitor prohibitively expensive and disruptive.',
        gradingPoints: [
          { concept: 'penalties incurred when transitioning from one vendor system to a competitor', weight: 0.5, aliases: ['switching costs definition', 'friction of changing providers'] },
          { concept: 'customer lock in via proprietary data embedded workflows and accumulated history', weight: 0.5, aliases: ['customer lock in mechanisms', 'data and workflow dependency'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the Productivity Paradox of Information Technology (Solow Paradox) and how was it resolved?',
        options: [],
        correctAnswer: 'The Solow Productivity Paradox (1987) noted that "computers are everywhere except in the productivity statistics," describing massive enterprise IT investments with negligible measured macroeconomic productivity growth. It was resolved by recognizing measurement errors in intangible service quality, substantial time lags required for organizational restructuring, and the realization that IT delivers benefits only when coupled with business process reengineering.',
        gradingPoints: [
          { concept: 'massive corporate it investments with negligible measured productivity gains', weight: 0.5, aliases: ['solow paradox definition', 'computers everywhere except statistics'] },
          { concept: 'resolved by time lags measurement of quality and necessity of process reengineering', weight: 0.5, aliases: ['paradox resolution', 'complementary organizational investments lag'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Dynamic Capabilities theory in strategic management and how IT assets contribute to it.',
        options: [],
        correctAnswer: 'Dynamic Capabilities (Teece) refers to a firm ability to sense, seize, and transform its resource base to address rapidly changing technological environments. IT assets contribute by providing big data sensing capabilities (market intelligence analytics), rapid seizing mechanisms (agile cloud deployment of new digital services), and transformation enablers (flexible microservices APIs allowing rapid organizational reconfiguration).',
        gradingPoints: [
          { concept: 'firm ability to sense seize and transform resources in changing environments', weight: 0.5, aliases: ['dynamic capabilities teece', 'sensing seizing transforming'] },
          { concept: 'it big data sensing agile cloud seizing flexible api transformations', weight: 0.5, aliases: ['it role in dynamic capabilities', 'analytics and agile cloud enablement'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Strategic Alliances and Virtual Networks facilitated by collaborative information systems.',
        options: [],
        correctAnswer: 'Strategic Alliances are formal cooperative partnerships between independent firms to share capabilities and markets. Collaborative information systems facilitate these by creating secure inter-organizational networks, sharing cloud data repositories, integrating supply chain APIs, and forming virtual enterprises that respond to large market tenders together without physical mergers.',
        gradingPoints: [
          { concept: 'formal cooperative partnerships between independent firms sharing capabilities', weight: 0.5, aliases: ['strategic alliances definition', 'inter firm partnerships'] },
          { concept: 'collaborative systems inter organizational apis cloud sharing virtual enterprises', weight: 0.5, aliases: ['collaborative it infrastructure', 'api and data integration across firms'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is First-Mover Advantage in digital strategy and what are First-Mover Disadvantages (Second-Mover advantages)?',
        options: [],
        correctAnswer: 'First-mover advantage allows an enterprise to establish initial brand recognition, secure prime intellectual property, and build network effects before rivals enter. First-mover disadvantages include bearing massive upfront R&D costs, risk of investing in unproven market demand, and vulnerability to fast-follower second movers who learn from the pioneer mistakes and enter with superior, cheaper technologies.',
        gradingPoints: [
          { concept: 'first mover establishes initial brand network effects and early market share', weight: 0.5, aliases: ['first mover advantage', 'early market capture brand power'] },
          { concept: 'disadvantages high r&d costs pioneer errors second movers enter cheaper and better', weight: 0.5, aliases: ['first mover risks second mover advantages', 'free rider fast follower benefits'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Sustainability of IT-based Competitive Advantage and cite factors that prevent rivals from copying IT systems.',
        options: [],
        correctAnswer: 'Raw software and hardware can be bought and duplicated by rivals quickly; true sustainable advantage requires building unique complementary organizational assets that are difficult to copy. Factors preventing rivals from duplicating IT advantages include: unique proprietary data assets, organizational culture and deeply embedded business routines, strong patent protections, high brand trust, and powerful network effects.',
        gradingPoints: [
          { concept: 'raw it is commoditized sustainability requires unique complementary organizational assets', weight: 0.5, aliases: ['it commoditization', 'complementary assets provide sustainability'] },
          { concept: 'barriers to duplication proprietary data culture embedded processes network effects', weight: 0.5, aliases: ['barriers to imitation', 'proprietary data and cultural inertia'] },
        ],
      },
    ],
  },

  // 6. INS 515: Information Systems Strategy & Governance
  {
    code: 'INS 515',
    title: 'IS Strategy & Governance',
    level: 500,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define IT Governance according to ITGI (IT Governance Institute) and explain its five focus areas.',
        options: [],
        correctAnswer: 'IT Governance is the responsibility of executives and the board of directors, consisting of leadership, organizational structures, and processes that ensure enterprise IT sustains and extends organizational strategies and objectives. Its five focus areas are: 1. Strategic Alignment; 2. Value Delivery; 3. Risk Management; 4. Resource Management; and 5. Performance Measurement.',
        gradingPoints: [
          { concept: 'board and executive responsibility ensuring it sustains and extends business strategy', weight: 0.4, aliases: ['it governance definition', 'board level it responsibility'] },
          { concept: 'strategic alignment value delivery risk management resource management performance measurement', weight: 0.6, aliases: ['five focus areas', 'five itgi pillars'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the COBIT 2019 framework: Design Factors, Governance versus Management, and Core Objectives.',
        options: [],
        correctAnswer: 'COBIT 2019 makes a clear distinction between Governance (ensuring stakeholder needs, conditions, and options are evaluated to set direction, oversee performance; Board responsibility) and Management (planning, building, running, and monitoring activities to achieve direction set by governance; Executive responsibility). Design Factors (enterprise strategy, risk profile, IT footprint) allow organizations to customize governance systems.',
        gradingPoints: [
          { concept: 'governance evaluates sets direction and monitors board responsibility', weight: 0.4, aliases: ['governance definition in cobit', 'evaluate direct monitor edm'] },
          { concept: 'management plans builds runs and monitors executive responsibility', weight: 0.4, aliases: ['management definition in cobit', 'plan build run monitor pbrm'] },
          { concept: 'design factors customize governance system to enterprise context', weight: 0.2, aliases: ['cobit 2019 design factors', 'customizing governance'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the IT Balanced Scorecard (IT BSC) and what four perspectives evaluate IT performance?',
        options: [],
        correctAnswer: 'The IT Balanced Scorecard adapts the balanced scorecard framework to measure IT contribution to the enterprise beyond pure accounting costs. Its four perspectives are: 1. Corporate Contribution (business value of IT investments); 2. Customer Orientation (internal business user satisfaction); 3. Operational Excellence (process agility, SLA performance, uptime); and 4. Future Orientation (human IT talent development, cloud readiness, innovation).',
        gradingPoints: [
          { concept: 'adapts balanced scorecard measuring it contribution beyond pure cost accounting', weight: 0.4, aliases: ['it bsc definition', 'measuring it performance'] },
          { concept: 'corporate contribution customer orientation operational excellence future orientation', weight: 0.6, aliases: ['four it bsc perspectives', 'business value user satisfaction excellence future'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of an IT Audit and Compliance Committee on a corporate Board of Directors.',
        options: [],
        correctAnswer: 'The IT Audit and Compliance Committee provides independent board oversight of enterprise IT risks, cybersecurity posture, regulatory compliance, and internal IT controls. It meets with internal and external IT auditors, reviews vulnerability remediation timelines, oversees major IT capital investments, and ensures executive leadership maintains adequate cyber resilience.',
        gradingPoints: [
          { concept: 'independent board oversight of it risks cyber posture and regulatory compliance', weight: 0.5, aliases: ['board audit committee role', 'independent cybersecurity oversight'] },
          { concept: 'meets auditors reviews remediation oversees capital investments ensures cyber resilience', weight: 0.5, aliases: ['auditor review oversight', 'approves remediation and investments'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Risk Governance frameworks (e.g., ISO 31000, NIST CSF) and explain the Three Lines of Defense model.',
        options: [],
        correctAnswer: 'The Three Lines of Defense model establishes organizational accountability for risk management: First Line (operational management and process owners who own and manage risks daily); Second Line (compliance, risk management, and cybersecurity functions that oversee and set risk policies); and Third Line (Internal Audit, providing independent, objective assurance to the board).',
        gradingPoints: [
          { concept: 'first line operational management owns and manages daily operational risks', weight: 0.35, aliases: ['first line of defense', 'operational risk owners'] },
          { concept: 'second line compliance risk cybersecurity oversight and policy enforcement', weight: 0.35, aliases: ['second line of defense', 'risk and compliance oversight'] },
          { concept: 'third line internal audit independent assurance directly to board', weight: 0.3, aliases: ['third line of defense', 'internal audit independent assurance'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is an Information Security Policy Framework and why must policies receive formal executive sign-off?',
        options: [],
        correctAnswer: 'An Information Security Policy Framework is a hierarchical suite of documented directives that govern how an enterprise protects its data and IT infrastructure. Formal executive sign-off is mandatory because it grants the policies legal and organizational authority, demonstrates management commitment during regulatory audits, and holds employees legally accountable for willful non-compliance.',
        gradingPoints: [
          { concept: 'hierarchical suite of directives governing protection of data and it assets', weight: 0.5, aliases: ['policy framework definition', 'enterprise security directives'] },
          { concept: 'executive sign off establishes legal authority management commitment accountability', weight: 0.5, aliases: ['executive sign off rationale', 'management authority and compliance audit proof'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Service Level Agreements (SLAs), Operational Level Agreements (OLAs), and Underpinning Contracts (UCs).',
        options: [],
        correctAnswer: 'A Service Level Agreement (SLA) is a formal contract between the IT service provider and the customer defining measurable service expectations (e.g., uptime, ticket resolution times). An Operational Level Agreement (OLA) is an internal agreement between internal IT teams (e.g., network team and database team) supporting the delivery of the SLA. An Underpinning Contract (UC) is a legally binding contract with an external third-party vendor (e.g., ISP or cloud provider) to support the service.',
        gradingPoints: [
          { concept: 'sla contract between it provider and business customer defining service standards', weight: 0.35, aliases: ['sla definition', 'customer facing agreement'] },
          { concept: 'ola internal agreement between collaborating internal it units', weight: 0.35, aliases: ['ola definition', 'internal team agreement'] },
          { concept: 'uc legally binding contract with third party external supplier', weight: 0.3, aliases: ['underpinning contract definition', 'external vendor contract'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Data Stewardship and what is the difference between a Data Owner and a Data Custodian?',
        options: [],
        correctAnswer: 'Data Stewardship is the operational responsibility for managing data assets to ensure accessibility, accuracy, and security. A Data Owner is a senior business executive who has ultimate accountability and authority for defining data access rules, classification, and business policies for a domain. A Data Custodian is an IT technical role responsible for the physical administration, backups, database maintenance, and technical implementation of controls specified by the Data Owner.',
        gradingPoints: [
          { concept: 'data owner business executive ultimate accountability defining access classification', weight: 0.5, aliases: ['data owner role', 'business accountability for data rules'] },
          { concept: 'data custodian it technician implements physical controls backups and database maintenance', weight: 0.5, aliases: ['data custodian role', 'technical administration of data'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cloud Exit Strategies and Vendor Lock-in Mitigation in IT governance.',
        options: [],
        correctAnswer: 'A Cloud Exit Strategy documents the technical, legal, and operational procedures to safely migrate data and workloads away from a cloud provider in case of price hikes, bankruptcy, or regulatory shifts. Mitigation tactics include containerizing workloads using Docker and Kubernetes, avoiding proprietary vendor-specific database APIs in favor of standard SQL/PostgreSQL, maintaining offsite immutable data backups, and designing multi-cloud architectures.',
        gradingPoints: [
          { concept: 'documented procedures to safely migrate data and workloads away from cloud vendor', weight: 0.5, aliases: ['cloud exit strategy definition', 'disaster portability plan'] },
          { concept: 'mitigations containers kubernetes open standard apis offsite backups multi cloud', weight: 0.5, aliases: ['mitigating cloud lock in', 'containerization and open apis'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Enterprise IT Strategic Planning horizons: Long-Term Vision versus Agile Rolling-Wave Roadmaps.',
        options: [],
        correctAnswer: 'Traditional Long-Term Vision sets rigid 3-5 year technology master plans that often fail in volatile markets due to rapid technological disruption. Modern IT governance pairs a broad, stable long-term strategic north star (business goals, core architecture principles) with Agile Rolling-Wave Roadmaps that plan near-term initiatives (6-12 months) in high detail while adjusting future horizons dynamically based on continuous market feedback.',
        gradingPoints: [
          { concept: 'long term sets overarching strategic north star vision and core principles', weight: 0.5, aliases: ['strategic north star', 'long term vision'] },
          { concept: 'rolling wave roadmaps plans near term in high detail dynamically adjusting future', weight: 0.5, aliases: ['rolling wave planning', 'agile roadmapping adaptive horizons'] },
        ],
      },
    ],
  },

  // 7. INS 599: B.Sc. Final Year Project II
  {
    code: 'INS 599',
    title: 'B.Sc. Final Year Project II',
    level: 500,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain the core chapters and structure of a complete final-year B.Sc. Information Systems dissertation/thesis.',
        options: [],
        correctAnswer: 'A standard IS dissertation comprises: Chapter 1: Introduction (Background, Problem Statement, Aim, Objectives, Scope, Significance); Chapter 2: Literature Review (Theoretical frameworks, Empirical reviews, Methodological gap); Chapter 3: System Analysis and Methodology (Requirements, UML diagrams, Architectural design); Chapter 4: System Implementation and Testing (Tech stack, Module walkthrough, Test suites, Usability evaluation); Chapter 5: Summary, Conclusion, and Recommendations for Future Work; followed by References (IEEE/APA) and Appendices (source code listings, questionnaires).',
        gradingPoints: [
          { concept: 'chapter 1 introduction problem objectives chapter 2 literature review', weight: 0.35, aliases: ['chapters 1 and 2', 'intro and literature review'] },
          { concept: 'chapter 3 methodology uml chapter 4 implementation testing evaluation', weight: 0.35, aliases: ['chapters 3 and 4', 'design implementation evaluation'] },
          { concept: 'chapter 5 conclusion recommendations references appendices', weight: 0.3, aliases: ['chapter 5 references appendices', 'conclusions and appendices'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the software testing strategy executed in an undergraduate IS development project: Unit, Integration, System, and User Acceptance Testing (UAT).',
        options: [],
        correctAnswer: 'Unit Testing verifies individual functions and classes in isolation (e.g., using Jest or PyTest). Integration Testing verifies data exchange across combined software modules and database connectors. System Testing validates the entire integrated application against functional and non-functional requirements. User Acceptance Testing (UAT) puts the software into the hands of real target users to verify whether it meets operational business requirements in real-world scenarios.',
        gradingPoints: [
          { concept: 'unit testing isolated functions and components', weight: 0.25, aliases: ['unit tests', 'testing functions in isolation'] },
          { concept: 'integration testing verifies inter modular data communication and apis', weight: 0.25, aliases: ['integration tests', 'module and db connectors'] },
          { concept: 'system testing validates end to end functional and performance criteria', weight: 0.25, aliases: ['system testing', 'full application test'] },
          { concept: 'uat testing real target user validation against business goals', weight: 0.25, aliases: ['user acceptance testing', 'uat validation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Usability Testing methodology and statistical analysis of System Usability Scale (SUS) survey data.',
        options: [],
        correctAnswer: 'Usability testing observes representative users performing key task scenarios with the software to identify points of friction and measure completion rates. For SUS analysis, responses to 10 questions on a 1-5 scale are recorded; for odd questions, subtract 1 from score; for even questions, subtract score from 5; sum all scaled values and multiply by 2.5 to yield a composite score from 0-100. Calculate sample mean, standard deviation, and compare against the industry benchmark of 68.',
        gradingPoints: [
          { concept: 'observing users completing task scenarios measuring completion and friction', weight: 0.4, aliases: ['usability testing protocol', 'task scenario observations'] },
          { concept: 'sus score calculation formula odd minus 1 5 minus even sum times 2.5 benchmark 68', weight: 0.6, aliases: ['sus statistical calculation', 'sus conversion formula benchmark'] },
        ],
      },
      {
        type: 'theory',
        question: 'How should student software developers document database design, schemas, and queries in their final project documentation?',
        options: [],
        correctAnswer: 'Students should document database design by presenting: 1. Conceptual ERD diagrams; 2. Logical Data Dictionaries detailing every table name, column names, data types, primary/foreign key constraints, and nullability; 3. Normalization steps demonstrating progression to Third Normal Form (3NF); and 4. Annotated SQL DDL schema scripts and critical stored queries used in the application.',
        gradingPoints: [
          { concept: 'conceptual erd diagrams and logical data dictionaries with constraints', weight: 0.5, aliases: ['erd diagrams and data dictionary', 'schema definitions and table structures'] },
          { concept: 'normalization proof to 3nf and annotated sql ddl queries', weight: 0.5, aliases: ['normalization to 3nf', 'sql ddl and critical queries'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe CI/CD and deployment practices for deploying an undergraduate web/mobile backend to cloud platforms (e.g., Render, Railway, AWS).',
        options: [],
        correctAnswer: 'Best deployment practices include: storing source code in version control (GitHub), setting up continuous deployment via webhooks to build on every push to main, injecting sensitive database credentials and API keys via secure environment variables rather than hardcoding in source files, configuring HTTPS/TLS encryption certificates, provisioning managed PostgreSQL databases with connection pools, and setting up health probe endpoints (/health) for monitoring.',
        gradingPoints: [
          { concept: 'version control webhooks automated build on push to main branch', weight: 0.4, aliases: ['continuous deployment ci cd', 'github webhook build triggers'] },
          { concept: 'secure environment variables managed postgresql connection pools https health probes', weight: 0.6, aliases: ['env variables security', 'managed database and health checks'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss handling edge cases, input validation, and security sanitization in project implementation.',
        options: [],
        correctAnswer: 'Robust project implementation requires validating all incoming data against strict schemas (e.g., Zod, Joi) on both client and server sides, sanitizing user inputs to prevent XSS and SQL injection, enforcing strong password hashing (e.g., bcrypt/argon2), and gracefully handling edge cases (such as network timeouts, concurrent double submissions, and database connection pool exhaustion) with helpful, non-leaking user error messages.',
        gradingPoints: [
          { concept: 'server and client side validation with schema libraries zod sanitization against injection', weight: 0.5, aliases: ['schema validation sanitization', 'zod validation preventing injection'] },
          { concept: 'password hashing bcrypt and graceful edge case error handling without leaking stack traces', weight: 0.5, aliases: ['secure hashing and error handling', 'bcrypt and graceful edge cases'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how to write an impactful Abstract for a university software engineering thesis.',
        options: [],
        correctAnswer: 'An impactful Abstract is a single self-contained paragraph (typically 200-300 words) summarizing: 1. The operational problem and research motivation; 2. The specific aim and methodology/architecture developed; 3. The tech stack and tools employed; 4. Key functional and usability testing results (including quantitative metrics, e.g., SUS score); and 5. The primary real-world significance and conclusion of the project.',
        gradingPoints: [
          { concept: 'self contained concise summary covering problem aim methodology results significance', weight: 0.5, aliases: ['abstract structure', 'problem methodology results summary'] },
          { concept: 'includes concrete tech stack quantitative evaluation metrics and practical conclusions', weight: 0.5, aliases: ['quantitative results in abstract', 'tools and metrics reported'] },
        ],
      },
      {
        type: 'theory',
        question: 'How should students structure a live project software demonstration during an oral defense before external examiners?',
        options: [],
        correctAnswer: 'Students should structure a live demo by: preparing clean test data in advance on a stable staging/local server, narrating a realistic end-to-end user story rather than clicking random buttons, demonstrating core differentiating features (such as real-time notifications or AI grading), showcasing mobile responsiveness, and demonstrating error-handling when invalid input is submitted to prove system robustness.',
        gradingPoints: [
          { concept: 'pre prepared clean data narrating coherent end to end user story scenario', weight: 0.5, aliases: ['live demo user story', 'coherent workflow demonstration'] },
          { concept: 'highlights core features responsive design and robust error handling on bad inputs', weight: 0.5, aliases: ['core features and robustness', 'error handling and mobile responsiveness'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the difference between Limitations of the Study and Recommendations for Future Work.',
        options: [],
        correctAnswer: 'Limitations of the Study are unavoidable constraints, boundary conditions, or shortcomings encountered during the project (e.g., limited sample size due to university timeline, hardware budget limits, restricted access to proprietary banking APIs). Recommendations for Future Work are actionable technical enhancements, feature additions, and scaling architectures proposed for subsequent researchers or commercial developers.',
        gradingPoints: [
          { concept: 'limitations unavoidable constraints boundaries and data shortcomings of current work', weight: 0.5, aliases: ['limitations definition', 'unavoidable project constraints'] },
          { concept: 'recommendations actionable technical enhancements proposed for future researchers', weight: 0.5, aliases: ['future work recommendations', 'actionable roadmap for extensions'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Version Control hygiene and Git repository management for academic software submissions.',
        options: [],
        correctAnswer: 'Clean Git hygiene requires: maintaining a comprehensive .gitignore file to exclude node_modules, build artifacts (.next, dist), and .env secret files; writing clear, imperative commit messages; creating dedicated feature branches for major milestones; tagging production release versions (e.g., v1.0.0); and providing a clear README.md with system architecture diagrams, installation instructions, and environment variable documentation.',
        gradingPoints: [
          { concept: 'gitignore excludes secrets env dependencies node modules dist', weight: 0.5, aliases: ['gitignore hygiene', 'excluding secrets and build artifacts'] },
          { concept: 'clear commit history branching releases and comprehensive readme with setup steps', weight: 0.5, aliases: ['readme setup guide', 'git branching and commit clarity'] },
        ],
      },
    ],
  },
];
