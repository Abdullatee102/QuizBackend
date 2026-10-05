// src/seed/faculties/fci/ins300.ts
import type { SeedCourse } from '../../types.js';

export const ins300Courses: SeedCourse[] = [
  // 1. INS 301: Systems Analysis & Design
  {
    code: 'INS 301',
    title: 'Systems Analysis & Design',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Differentiate between functional requirements and non-functional requirements in software systems analysis, providing an example for each.',
        options: [],
        correctAnswer: 'Functional requirements define what the system must do and its specific behaviors (e.g., student course registration or online payment calculation). Non-functional requirements specify operational qualities, constraints, and performance benchmarks of the system (e.g., response time under 200ms, 99.9% uptime, or data encryption at rest).',
        gradingPoints: [
          { concept: 'functional defines specific behaviors actions outputs', weight: 0.4, aliases: ['what system does', 'functions behaviors capabilities'] },
          { concept: 'non functional defines constraints qualities performance benchmarks', weight: 0.4, aliases: ['system qualities', 'security reliability scalability constraints'] },
          { concept: 'concrete example of functional and non functional requirements', weight: 0.2, aliases: ['functional example', 'non functional example'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the four core stages of the traditional Systems Development Life Cycle (SDLC) and their key deliverables.',
        options: [],
        correctAnswer: 'The core SDLC stages are Planning (deliverable: feasibility study and project charter), Analysis (deliverable: system requirements specification SRS), Design (deliverable: technical architecture, UI wireframes, and database ERD schemas), and Implementation & Testing (deliverable: deployed software code and test audit reports).',
        gradingPoints: [
          { concept: 'planning feasibility charter', weight: 0.25, aliases: ['planning stage', 'feasibility analysis'] },
          { concept: 'analysis requirements specification srs', weight: 0.25, aliases: ['requirements gathering', 'system analysis'] },
          { concept: 'design technical architecture database erd wireframes', weight: 0.25, aliases: ['system design', 'architectural design'] },
          { concept: 'implementation coding testing deployment', weight: 0.25, aliases: ['programming testing', 'installation maintenance'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Data Flow Diagram (DFD) and what are its four fundamental graphical symbols?',
        options: [],
        correctAnswer: 'A Data Flow Diagram (DFD) is a visual modeling tool that illustrates how data moves through an information system. Its four core symbols are External Entities (sources/sinks of data), Processes (transformations applied to data), Data Stores (repositories of persisted data), and Data Flows (directed arrows showing data pathways).',
        gradingPoints: [
          { concept: 'models data movement through system', weight: 0.3, aliases: ['graphical data pathways', 'visual data flows'] },
          { concept: 'external entities processes data stores data flows', weight: 0.7, aliases: ['four symbols', 'entity process datastore flow'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the difference between Agile methodology and the traditional Waterfall model in systems engineering.',
        options: [],
        correctAnswer: 'The Waterfall model is a sequential, rigid process where each phase must finish before the next begins, with heavy documentation and low accommodation for shifting client requirements. In contrast, Agile is iterative, collaborative, and adaptable, delivering functional software increments in short sprints while incorporating continuous user feedback.',
        gradingPoints: [
          { concept: 'waterfall is sequential linear rigid with distinct phases', weight: 0.5, aliases: ['waterfall linear', 'traditional sequential model'] },
          { concept: 'agile is iterative flexible rapid sprints continuous feedback', weight: 0.5, aliases: ['agile sprints', 'iterative delivery adaptiveness'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Use Case diagram in UML modeling and what key elements compose it?',
        options: [],
        correctAnswer: 'A UML Use Case diagram depicts user interactions with a system to capture functional requirements. Its key elements include Actors (external roles interacting with the system), Use Cases (ovals representing system capabilities), System Boundary (enclosing scope), and Relationships (such as association, <<include>>, and <<extend>>).',
        gradingPoints: [
          { concept: 'models user interactions and functional boundaries', weight: 0.4, aliases: ['captures functional requirements', 'actor system interaction'] },
          { concept: 'actors use cases system boundary include extend relationships', weight: 0.6, aliases: ['actors and use cases', 'include extend relations'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept and significance of economic, technical, and operational feasibility analysis.',
        options: [],
        correctAnswer: 'Economic feasibility assesses financial viability, costs vs ROI benefits. Technical feasibility evaluates whether available technology, hardware, and engineering skills can realistically construct the system. Operational feasibility examines whether the proposed solution aligns with company culture and whether stakeholders will readily adopt it.',
        gradingPoints: [
          { concept: 'economic feasibility cost benefit roi', weight: 0.35, aliases: ['financial viability', 'costs vs returns'] },
          { concept: 'technical feasibility hardware software expertise availability', weight: 0.35, aliases: ['technical practicality', 'engineering capabilities'] },
          { concept: 'operational feasibility user adoption organizational fit', weight: 0.3, aliases: ['organizational readiness', 'stakeholder acceptance'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the purpose and components of a System Requirements Specification (SRS) document.',
        options: [],
        correctAnswer: 'An SRS is a formal legal and technical document that establishes a complete agreement between clients and software engineering teams regarding system capabilities. It details product scope, functional requirements, user personas, interface constraints, external integrations, performance standards, and security mandates.',
        gradingPoints: [
          { concept: 'formal contract agreement between stakeholders and developers', weight: 0.4, aliases: ['requirements baseline', 'specifies full product behavior'] },
          { concept: 'details scope functional non functional performance security constraints', weight: 0.6, aliases: ['functional requirements', 'constraints performance scope'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain four common system conversion strategies: Direct cutover, Parallel running, Phased adoption, and Pilot deployment.',
        options: [],
        correctAnswer: 'Direct cutover terminates the old system and activates the new one overnight (high risk, fast). Parallel running operates old and new systems concurrently until stability is verified (safest, expensive). Phased adoption introduces system modules gradually over time. Pilot deployment launches the entire system in one operational site or department before organization-wide rollout.',
        gradingPoints: [
          { concept: 'direct cutover overnight immediate transition high risk', weight: 0.25, aliases: ['direct conversion', 'big bang switch'] },
          { concept: 'parallel running simultaneous execution safe costly', weight: 0.25, aliases: ['parallel operation', 'dual running'] },
          { concept: 'phased adoption incremental modular activation', weight: 0.25, aliases: ['phased rollout', 'gradual introduction'] },
          { concept: 'pilot deployment single branch or unit testing first', weight: 0.25, aliases: ['pilot site', 'localized launch'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Prototyping in systems analysis and what are the trade-offs between throwaway and evolutionary prototypes?',
        options: [],
        correctAnswer: 'Prototyping involves building an early, interactive model of a software system to clarify ambiguous user requirements. Throwaway prototyping creates quick disposable mockups solely to validate concepts before discarding them. Evolutionary prototyping builds a robust functional core that is iteratively refined into the final production system.',
        gradingPoints: [
          { concept: 'interactive mockup to elicit and clarify user requirements', weight: 0.4, aliases: ['early system model', 'validates user expectations'] },
          { concept: 'throwaway is discarded after requirements validation', weight: 0.3, aliases: ['disposable prototype', 'throwaway mockups'] },
          { concept: 'evolutionary evolves iteratively into production software', weight: 0.3, aliases: ['refined into final product', 'evolutionary system core'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Entity Relationship Modeling (ERD) in database design and define cardinality.',
        options: [],
        correctAnswer: 'Entity Relationship Modeling (ERD) graphically maps the conceptual data schema of an organization, identifying real-world Entities, their Attributes, and relational Associations. Cardinality defines the numerical ratio of relationships between entities (e.g., one-to-one 1:1, one-to-many 1:N, or many-to-many M:N).',
        gradingPoints: [
          { concept: 'graphical conceptual mapping of entities attributes associations', weight: 0.5, aliases: ['erd schema modeling', 'conceptual database blueprint'] },
          { concept: 'cardinality defines numerical constraints 1 to 1 1 to many many to many', weight: 0.5, aliases: ['relational cardinality', '1:1 1:N M:N constraints'] },
        ],
      },
    ],
  },

  // 2. INS 302: Enterprise Resource Planning (ERP) Systems
  {
    code: 'INS 302',
    title: 'Enterprise Resource Planning (ERP) Systems',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain the core architectural philosophy of an ERP system and how it eliminates departmental data silos.',
        options: [],
        correctAnswer: 'An ERP system unifies all functional business departments into a single integrated software solution powered by a central relational database. By storing shared master data once, transactions executed in one department (e.g., warehouse inventory shipment) automatically update relevant records across sales, accounting, and supply chain in real time, eliminating redundant data silos and discrepancies.',
        gradingPoints: [
          { concept: 'single integrated system unified relational database', weight: 0.5, aliases: ['centralized database', 'unified corporate platform'] },
          { concept: 'real time automatic cross functional synchronization eliminates silos', weight: 0.5, aliases: ['eliminates data silos', 'cross modular transaction updates'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between ERP configuration and ERP customization, discussing their impacts on future software upgrades.',
        options: [],
        correctAnswer: 'ERP configuration involves selecting pre-built options, parameters, and tables within the software to fit business processes without modifying core vendor source code (easy to upgrade). ERP customization requires writing custom code to alter application logic or database schemas, which significantly increases implementation cost and introduces high risk and complexity during future software version upgrades.',
        gradingPoints: [
          { concept: 'configuration sets parameters without altering source code upgrade friendly', weight: 0.5, aliases: ['parameter tuning', 'customizing without code modification'] },
          { concept: 'customization rewrites source code adds cost and impairs version upgrades', weight: 0.5, aliases: ['source code modification', 'upgrade friction custom scripts'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the critical success factors (CSFs) necessary for a successful enterprise ERP implementation.',
        options: [],
        correctAnswer: 'Critical success factors for ERP implementations include sustained top management commitment, comprehensive change management and staff training, rigorous business process reengineering, effective data cleansing and migration, experienced cross-functional project leadership, and continuous user engagement throughout the rollout.',
        gradingPoints: [
          { concept: 'top management executive support and leadership', weight: 0.35, aliases: ['executive sponsorship', 'board commitment'] },
          { concept: 'change management and employee training', weight: 0.35, aliases: ['user adoption training', 'cultural change'] },
          { concept: 'data migration quality and business process reengineering', weight: 0.3, aliases: ['data cleansing', 'process reengineering'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Two-Tier ERP architecture and in what business scenarios is it deployed?',
        options: [],
        correctAnswer: 'A Two-Tier ERP architecture deploys a large, centralized enterprise ERP (Tier 1) at corporate headquarters to handle global financials and consolidated governance, while subsidiaries or branch locations run a lighter, more agile ERP (Tier 2) tailored to local operations and compliance needs, interfacing back with Tier 1.',
        gradingPoints: [
          { concept: 'tier 1 headquarters centralized global governance and financials', weight: 0.5, aliases: ['corporate tier 1', 'headquarters master erp'] },
          { concept: 'tier 2 agile localized subsidiary operations integrated with corporate', weight: 0.5, aliases: ['subsidiary erp', 'local branch tier 2'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cloud ERP versus On-Premise ERP in terms of capital expenditure (CapEx), maintenance, and scalability.',
        options: [],
        correctAnswer: 'Cloud ERP operates as a SaaS subscription converting initial CapEx into ongoing operational expense (OpEx), where the cloud vendor handles security patches, backups, and instant elastic scaling. On-Premise ERP requires substantial upfront CapEx for server hardware, software licenses, and dedicated IT maintenance staff, but grants total on-site data custody and customization control.',
        gradingPoints: [
          { concept: 'cloud erp subscription opex vendor managed elastic scaling', weight: 0.5, aliases: ['saas cloud erp', 'subscription lower capex'] },
          { concept: 'on premise high upfront capex dedicated hardware internal maintenance', weight: 0.5, aliases: ['on site infrastructure', 'on premise hardware overhead'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Master Data Management (MDM) within an ERP context and why is it vital?',
        options: [],
        correctAnswer: 'Master Data Management (MDM) comprises the processes, governance, and tools that ensure corporate master entities (such as customers, vendors, products, chart of accounts) remain uniform, accurate, deduplicated, and authoritative across all enterprise transactions and analytics.',
        gradingPoints: [
          { concept: 'governance and standardization of core business entities', weight: 0.5, aliases: ['single source of truth for entities', 'master entity management'] },
          { concept: 'prevents duplicates discrepancies and faulty reporting', weight: 0.5, aliases: ['data consistency', 'eliminates duplicates in analytics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Supply Chain Management (SCM) modules within an ERP ecosystem.',
        options: [],
        correctAnswer: 'The SCM module in an ERP manages the flow of materials, information, and finances from raw suppliers to end customers. It coordinates demand forecasting, procurement purchase orders, manufacturing schedules, inventory warehouse tracking, and logistics delivery to minimize inventory holding costs and eliminate delivery delays.',
        gradingPoints: [
          { concept: 'manages material informational and financial flow end to end', weight: 0.5, aliases: ['procurement to delivery', 'supply chain integration'] },
          { concept: 'coordinates demand forecasting inventory logistics manufacturing', weight: 0.5, aliases: ['demand planning', 'warehouse and inventory control'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Change Management in ERP adoption and how does Kotter 8-step model facilitate it?',
        options: [],
        correctAnswer: 'Change management guides organizational transition when migrating staff to unfamiliar ERP workflows. Kotter 8-step model facilitates this by establishing urgency, forming a guiding coalition, creating a clear vision, communicating broadly, removing obstacles, securing quick wins, consolidating improvements, and embedding new routines into culture.',
        gradingPoints: [
          { concept: 'structured approach to overcoming employee resistance to new workflows', weight: 0.4, aliases: ['managing cultural transition', 'user resistance mitigation'] },
          { concept: 'kotter framework urgency coalition vision communication quick wins', weight: 0.6, aliases: ['kotter 8 steps', 'urgency vision coalition reinforcement'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the key risks associated with legacy data migration during ERP system cutover.',
        options: [],
        correctAnswer: 'Key data migration risks include transferring dirty, duplicate, or corrupt historical records, schema incompatibilities between legacy tables and ERP fields, data truncation, incomplete mapping leading to missing transactional history, and prolonged downtime during data extraction and loading.',
        gradingPoints: [
          { concept: 'dirty duplicate corrupted data causing garbage in garbage out', weight: 0.5, aliases: ['corrupted data', 'duplicate records transfer'] },
          { concept: 'schema mismatch mapping errors data loss downtime', weight: 0.5, aliases: ['field truncation', 'mapping incompatibilities downtime'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are ERP Post-Implementation Audits and why are they conducted?',
        options: [],
        correctAnswer: 'A post-implementation audit is an objective review conducted several months after go-live to evaluate whether the ERP project met its initial business objectives, compare projected ROI against actual operational savings, assess ongoing user adoption, and identify technical bottlenecks or additional training requirements.',
        gradingPoints: [
          { concept: 'objective post go live review evaluating project goals vs achievements', weight: 0.5, aliases: ['evaluates actual outcomes', 'post launch audit'] },
          { concept: 'measures roi operational savings user adoption further training needs', weight: 0.5, aliases: ['roi verification', 'identifies residual bottlenecks'] },
        ],
      },
    ],
  },

  // 3. INS 303: Decision Support Systems & Business Intelligence
  {
    code: 'INS 303',
    title: 'Decision Support Systems & Business Intelligence',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define Decision Support Systems (DSS) and explain its three core subsystems.',
        options: [],
        correctAnswer: 'A Decision Support System (DSS) is an interactive computer-based information system that assists business decision-makers in solving semi-structured and unstructured problems. Its three core subsystems are: the Data Management Subsystem (database and ETL), the Model Management Subsystem (mathematical and statistical models), and the User Interface / Dialog Subsystem (dashboards and visualization tools).',
        gradingPoints: [
          { concept: 'interactive system aiding semi structured and unstructured decisions', weight: 0.4, aliases: ['decision support definition', 'unstructured problem solving'] },
          { concept: 'data management model management user interface dialog subsystems', weight: 0.6, aliases: ['three subsystems', 'data model dialog components'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between structured, semi-structured, and unstructured decisions according to Herbert Simon decision-making theory.',
        options: [],
        correctAnswer: 'Structured decisions are repetitive, routine decisions with established standard operating procedures that can often be automated (e.g., inventory restocking reorder points). Semi-structured decisions have some predefined rules but require human judgment and analytical insights (e.g., credit card fraud scoring, marketing budget allocation). Unstructured decisions are novel, complex decisions with no pre-existing routine or algorithm, requiring executive intuition and strategic evaluation (e.g., merging with a competitor or entering a foreign market).',
        gradingPoints: [
          { concept: 'structured routine algorithmic standardized procedures', weight: 0.35, aliases: ['structured decision rules', 'deterministic automated'] },
          { concept: 'semi structured blend of mathematical models and human judgment', weight: 0.35, aliases: ['semi structured analytical', 'partial rules human insight'] },
          { concept: 'unstructured novel strategic intuition executive judgment', weight: 0.3, aliases: ['unstructured novel', 'strategic executive decisions'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Herbert Simon four stages of the decision-making process: Intelligence, Design, Choice, and Implementation.',
        options: [],
        correctAnswer: 'The stages are: Intelligence (identifying and defining the problem or opportunity and gathering relevant data); Design (conceiving, formulating, and developing alternative potential solutions); Choice (evaluating alternative solutions using criteria and selecting the best course of action); and Implementation (executing the chosen solution and monitoring performance feedback).',
        gradingPoints: [
          { concept: 'intelligence problem identification and data gathering', weight: 0.25, aliases: ['intelligence phase', 'recognizing problem'] },
          { concept: 'design formulating alternative solution models', weight: 0.25, aliases: ['design phase', 'generating alternatives'] },
          { concept: 'choice evaluating alternatives and selecting best option', weight: 0.25, aliases: ['choice phase', 'decision selection'] },
          { concept: 'implementation executing solution and monitoring feedback', weight: 0.25, aliases: ['implementation phase', 'acting and tracking'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between OLTP (Online Transaction Processing) and OLAP (Online Analytical Processing).',
        options: [],
        correctAnswer: 'OLTP systems manage day-to-day transaction processing with high volumes of fast, atomic read/write queries on normalized relational databases (e.g., banking deposits, ATM withdrawals). OLAP systems support complex multidimensional analytical queries across historical data warehouses for trend reporting and executive strategic planning, typically using denormalized star or snowflake schemas.',
        gradingPoints: [
          { concept: 'oltp operational day to day rapid read write normalized schemas', weight: 0.5, aliases: ['oltp transactions', 'normalized relational oltp'] },
          { concept: 'olap analytical complex multidimensional historical queries denormalized', weight: 0.5, aliases: ['olap data warehouse', 'multidimensional reporting'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the core analytical operations in Multidimensional Data Cubes: Slice, Dice, Roll-up, and Drill-down.',
        options: [],
        correctAnswer: 'Slice selects a single dimension dimension value, reducing a 3D cube to a 2D sub-table. Dice extracts a smaller sub-cube by selecting specific values across two or more dimensions. Roll-up aggregates data by climbing up a concept hierarchy (e.g., day -> month -> quarter). Drill-down navigates from summarized data into finer, granular detail (e.g., yearly revenue -> daily transaction lines).',
        gradingPoints: [
          { concept: 'slice reduces one dimension to 2d cut', weight: 0.25, aliases: ['slice operation', 'single dimension filter'] },
          { concept: 'dice creates smaller sub cube across multiple dimensions', weight: 0.25, aliases: ['dice operation', 'sub cube selection'] },
          { concept: 'roll up summarizes aggregates data up hierarchy', weight: 0.25, aliases: ['roll up aggregation', 'climbing hierarchy'] },
          { concept: 'drill down reveals detailed granular records down hierarchy', weight: 0.25, aliases: ['drill down granular', 'stepping into details'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is What-If Analysis and Goal-Seeking Analysis in decision modeling?',
        options: [],
        correctAnswer: 'What-If analysis assesses how changes in input variables or assumptions affect the output result (e.g., "If interest rates increase by 2%, how does profit change?"). Goal-Seeking analysis operates in reverse, calculating what input values are required to achieve a desired target output (e.g., "What minimum sales volume is needed to achieve a ₦50M profit?").',
        gradingPoints: [
          { concept: 'what if alters inputs to observe output effects', weight: 0.5, aliases: ['sensitivity analysis', 'input modification to outputs'] },
          { concept: 'goal seeking reverses calculation finding input needed for target output', weight: 0.5, aliases: ['target seeking', 'backward calculation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the difference between Descriptive, Predictive, and Prescriptive Analytics.',
        options: [],
        correctAnswer: 'Descriptive analytics examines historical data to understand "what happened" (e.g., historical sales dashboards). Predictive analytics uses statistical models and machine learning to forecast "what is likely to happen" (e.g., customer churn likelihood). Prescriptive analytics recommends specific optimal actions and strategies to answer "what should we do" (e.g., algorithmic pricing optimization).',
        gradingPoints: [
          { concept: 'descriptive what happened historical retrospective reporting', weight: 0.35, aliases: ['descriptive analytics', 'past summary'] },
          { concept: 'predictive what will happen forecasting machine learning', weight: 0.35, aliases: ['predictive modeling', 'future likelihood'] },
          { concept: 'prescriptive what should be done optimization decision suggestions', weight: 0.3, aliases: ['prescriptive optimization', 'actionable advice'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Star Schema and how does it differ from a Snowflake Schema in data mart design?',
        options: [],
        correctAnswer: 'A Star Schema features a central Fact table directly joined to completely denormalized Dimension tables, resembling a star shape with fast query execution. A Snowflake Schema normalizes the dimension tables into sub-dimension lookup tables to reduce redundancy, resulting in more joins and slightly slower analytical query performance.',
        gradingPoints: [
          { concept: 'star schema central fact table denormalized dimension tables fast queries', weight: 0.5, aliases: ['star schema denormalized', 'central fact dimension links'] },
          { concept: 'snowflake schema normalized dimension tables more joins lower redundancy', weight: 0.5, aliases: ['snowflake normalized', 'dimension lookup sub tables'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Data Mining in Business Intelligence and name three prominent data mining tasks.',
        options: [],
        correctAnswer: 'Data mining is the computational process of discovering non-trivial patterns, correlations, and anomalies within vast datasets. Three prominent tasks are: Classification (categorizing items into predefined labels), Association Rule Mining (identifying items frequently purchased together, e.g., market basket analysis), and Clustering (grouping items based on inherent similarities without prior labels).',
        gradingPoints: [
          { concept: 'discovering non trivial hidden patterns correlations in large datasets', weight: 0.4, aliases: ['pattern discovery', 'uncovering actionable insights'] },
          { concept: 'classification association clustering', weight: 0.6, aliases: ['three tasks', 'classification clustering association rules'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the key components and purpose of an Executive Dashboard.',
        options: [],
        correctAnswer: 'An executive dashboard provides a consolidated, graphical, single-screen display of an enterprise most critical Key Performance Indicators (KPIs), operational metrics, and trend alerts. Its components include gauges, trend charts, drill-down filters, threshold color indicators (traffic lights), and real-time alert notifications.',
        gradingPoints: [
          { concept: 'consolidated graphical display of critical kpis and metrics', weight: 0.5, aliases: ['single screen visual metrics', 'kpi overview'] },
          { concept: 'gauges trend charts drill downs color alerts real time updates', weight: 0.5, aliases: ['visual components', 'gauges charts drilldowns'] },
        ],
      },
    ],
  },

  // 4. INS 304: IS Audit and Controls
  {
    code: 'INS 304',
    title: 'IS Audit and Controls',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Define Information Systems (IS) Auditing and explain its core objectives.',
        options: [],
        correctAnswer: 'An IS audit is a formal, independent examination of an organization information technology infrastructure, policies, and operations. Its core objectives are to determine whether IT systems safeguard enterprise assets, maintain data integrity, achieve organizational goals effectively, and consume resources efficiently while adhering to regulatory compliance standards.',
        gradingPoints: [
          { concept: 'independent systematic evaluation of it infrastructure and policies', weight: 0.4, aliases: ['formal examination of it controls', 'it audit definition'] },
          { concept: 'safeguards assets data integrity operational efficiency compliance', weight: 0.6, aliases: ['audit objectives', 'asset protection and data integrity'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between General Controls and Application Controls in information security governance.',
        options: [],
        correctAnswer: 'General Controls apply broadly across all system components, data centers, and IT processes (e.g., data center physical security, change management procedures, disaster recovery plans, and network firewalls). Application Controls are programmed constraints embedded specifically within individual software applications to ensure transaction validity, completeness, and accuracy (e.g., input field validation, sequence checks, and authorization limits).',
        gradingPoints: [
          { concept: 'general controls broad it environment physical security change management', weight: 0.5, aliases: ['entity wide controls', 'general it controls gitc'] },
          { concept: 'application controls programmed transaction specific validation accuracy', weight: 0.5, aliases: ['software validation controls', 'input processing output checks'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the COBIT framework and how it assists IT governance and audit compliance.',
        options: [],
        correctAnswer: 'COBIT (Control Objectives for Information and Related Technologies) is an internationally recognized governance framework developed by ISACA. It bridges the gap between technical IT processes, operational risks, and executive business strategy by providing standard control objectives, maturity models, and measurable audit metrics.',
        gradingPoints: [
          { concept: 'isaca governance framework aligning it with business goals', weight: 0.5, aliases: ['cobit it governance', 'bridges technical and business risks'] },
          { concept: 'provides standard control objectives maturity models audit metrics', weight: 0.5, aliases: ['standard control objectives', 'maturity models and metrics'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Segregation of Duties (SoD) in IT operations and why is it essential for fraud prevention?',
        options: [],
        correctAnswer: 'Segregation of Duties (SoD) requires that no single individual has complete end-to-end control over a critical business or IT transaction. In IT operations, it prevents developers from having write access to production databases and prohibits system administrators from authorizing financial disbursements, mitigating the risk of undetected fraud and unauthorized system tampering.',
        gradingPoints: [
          { concept: 'divides critical responsibilities among multiple personnel', weight: 0.5, aliases: ['no single person full control', 'separation of roles'] },
          { concept: 'mitigates fraud unauthorized changes and operational errors', weight: 0.5, aliases: ['prevents fraud and sabotage', 'reduces tampering risk'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the three categories of internal controls: Preventive, Detective, and Corrective controls, with examples.',
        options: [],
        correctAnswer: 'Preventive controls deter errors or security breaches before they occur (e.g., biometric door locks, dual authorization, input masks). Detective controls identify and alert on security incidents or discrepancies that have occurred (e.g., audit log reviews, hash integrity monitoring, intrusion detection systems). Corrective controls remediate issues after discovery and restore normal operations (e.g., applying software patches, rolling back corrupt databases, restoring from backups).',
        gradingPoints: [
          { concept: 'preventive deters incidents before occurrence passwords biometrics', weight: 0.35, aliases: ['preventive controls', 'stops errors before entry'] },
          { concept: 'detective discovers and flags violations audit logs ids', weight: 0.35, aliases: ['detective controls', 'uncovers discrepancies'] },
          { concept: 'corrective remedies damage restores operations backups patches', weight: 0.3, aliases: ['corrective controls', 'remediates errors and restores'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is an Audit Trail in information systems and what key metadata elements must it record?',
        options: [],
        correctAnswer: 'An audit trail is a chronological, tamper-resistant record of system activities that reconstructs the sequence of events and transactions. Key metadata elements include timestamp (exact date and time), user ID (identity of actor), event type (action performed e.g., create, modify, delete), affected record/resource, source IP address, and transaction outcome.',
        gradingPoints: [
          { concept: 'chronological tamper evident record reconstructing events and transactions', weight: 0.5, aliases: ['activity log trail', 'event reconstruction record'] },
          { concept: 'timestamp user id action affected entity ip address outcome', weight: 0.5, aliases: ['who when what where outcome', 'audit trail metadata fields'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Computer-Assisted Audit Techniques (CAATs) and give two practical examples.',
        options: [],
        correctAnswer: 'CAATs are automated software tools and scripts used by auditors to extract, analyze, and test vast electronic transactional datasets directly from production databases. Examples include Generalized Audit Software (e.g., ACL, IDEA) for running duplicate detection and statistical sampling, and embedded audit modules that monitor real-time banking transactions for anomalies.',
        gradingPoints: [
          { concept: 'software tools enabling automated data extraction analysis sampling', weight: 0.5, aliases: ['automated audit tools', 'audit software scripts'] },
          { concept: 'examples acl idea generalized audit software embedded modules', weight: 0.5, aliases: ['acl idea examples', 'data querying duplicate sampling tools'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the importance of a Disaster Recovery Plan (DRP) and define RTO and RPO.',
        options: [],
        correctAnswer: 'A DRP provides documented, step-by-step procedures to restore critical IT infrastructure and data following catastrophic outages. Recovery Time Objective (RTO) is the maximum acceptable duration of system downtime before business operations must be restored. Recovery Point Objective (RPO) is the maximum acceptable age of data loss measured in time (e.g., up to 1 hour of lost transactions).',
        gradingPoints: [
          { concept: 'documented procedures to restore it infrastructure after catastrophe', weight: 0.4, aliases: ['drp plan definition', 'catastrophic recovery steps'] },
          { concept: 'rto maximum acceptable downtime duration', weight: 0.3, aliases: ['recovery time objective', 'acceptable downtime target'] },
          { concept: 'rpo maximum acceptable data loss measured in time', weight: 0.3, aliases: ['recovery point objective', 'acceptable data loss window'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Penetration Testing in an IS security audit and how does it differ from a Vulnerability Scan?',
        options: [],
        correctAnswer: 'A vulnerability scan is an automated, passive inspection that scans network ports and software versions to identify known security weaknesses against a database of CVEs. Penetration testing is an active, authorized simulation of a cyberattack where human ethical hackers actively exploit discovered vulnerabilities to determine how deep an adversary could penetrate.',
        gradingPoints: [
          { concept: 'vulnerability scan automated passive identification of known flaws', weight: 0.5, aliases: ['automated flaw scanning', 'vulnerability assessment passive'] },
          { concept: 'penetration test active authorized exploitation simulating cyberattack', weight: 0.5, aliases: ['ethical hacking active exploit', 'pen test exploitation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept of Audit Risk and its three components: Inherent Risk, Control Risk, and Detection Risk.',
        options: [],
        correctAnswer: 'Audit Risk is the risk that an auditor will issue an unqualified (clean) opinion on financial or IT systems that contain material misstatements or vulnerabilities. It consists of: Inherent Risk (susceptibility of an asset to errors before considering controls), Control Risk (risk that existing internal controls fail to prevent or detect errors), and Detection Risk (risk that auditor procedures fail to uncover existing errors).',
        gradingPoints: [
          { concept: 'audit risk probability of issuing erroneous clean audit finding', weight: 0.4, aliases: ['audit risk definition', 'risk of flawed audit opinion'] },
          { concept: 'inherent risk control risk detection risk definitions', weight: 0.6, aliases: ['inherent control detection', 'three risk components'] },
        ],
      },
    ],
  },

  // 5. INS 305: Information Storage & Retrieval
  {
    code: 'INS 305',
    title: 'Information Storage & Retrieval',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the classic Information Retrieval (IR) architecture and the role of an Inverted Index.',
        options: [],
        correctAnswer: 'An IR system indexes unstructured documents to enable rapid content search based on user queries. An Inverted Index is the core data structure that maps every unique term (word) in the document collection to a posting list of document IDs (and positions) containing that term, allowing instant lookup without scanning raw document texts.',
        gradingPoints: [
          { concept: 'indexes unstructured documents to fulfill search queries', weight: 0.4, aliases: ['ir architecture', 'text search system'] },
          { concept: 'inverted index maps terms words to document posting lists', weight: 0.6, aliases: ['term to posting list mapping', 'inverted index structure'] },
        ],
      },
      {
        type: 'theory',
        question: 'Define Precision and Recall in information retrieval evaluation, providing their mathematical definitions.',
        options: [],
        correctAnswer: 'Precision measures the fraction of retrieved documents that are truly relevant: Precision = Relevant Retrieved / Total Retrieved. Recall measures the fraction of all existing relevant documents that were successfully retrieved: Recall = Relevant Retrieved / Total Relevant in Collection. There is typically an inverse trade-off between the two.',
        gradingPoints: [
          { concept: 'precision relevant retrieved over total retrieved', weight: 0.5, aliases: ['precision definition formula', 'retrieval accuracy'] },
          { concept: 'recall relevant retrieved over total existing relevant', weight: 0.5, aliases: ['recall definition formula', 'retrieval completeness'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the TF-IDF (Term Frequency-Inverse Document Frequency) weighting scheme and its formula rationale.',
        options: [],
        correctAnswer: 'TF-IDF calculates the relative importance of a term within a document relative to an entire corpus. Term Frequency (TF) measures how often a word appears in a specific document. Inverse Document Frequency (IDF) discounts common words that appear across many documents (IDF = log(N / DF)). Multiplying TF × IDF gives high weight to words that appear frequently in a specific document but rarely across the corpus.',
        gradingPoints: [
          { concept: 'tf measures local term frequency in document', weight: 0.4, aliases: ['term frequency', 'local frequency'] },
          { concept: 'idf penalizes common corpus words log n over df', weight: 0.4, aliases: ['inverse document frequency', 'corpus rarity penalty'] },
          { concept: 'combined score highlights terms distinctively characterizing document', weight: 0.2, aliases: ['tf times idf product', 'distinctive term weighting'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Vector Space Model (VSM) and how Cosine Similarity is used to rank query results.',
        options: [],
        correctAnswer: 'In the Vector Space Model (VSM), both documents and user queries are represented as high-dimensional vectors of term weights (e.g., TF-IDF). The relevance of a document to a query is calculated using Cosine Similarity, which measures the cosine of the angle between the query vector and document vector (dot product divided by the product of their magnitudes), ranking highest values first.',
        gradingPoints: [
          { concept: 'documents and queries represented as high dimensional term weight vectors', weight: 0.5, aliases: ['vsm representation', 'vector space modeling'] },
          { concept: 'cosine similarity measures angle dot product between vectors for ranking', weight: 0.5, aliases: ['cosine of angle', 'dot product magnitude division'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain standard text preprocessing steps in IR: Tokenization, Stopword Removal, and Stemming/Lemmatization.',
        options: [],
        correctAnswer: 'Tokenization breaks raw text streams into discrete lexical tokens or words. Stopword removal filters out ubiquitous grammatical words (e.g., "the", "is", "at") that carry minimal semantic differentiation. Stemming (e.g., Porter stemmer) strips suffixes to base stems algorithmically, while Lemmatization uses vocabulary and morphological analysis to return true grammatical root words (lemmas).',
        gradingPoints: [
          { concept: 'tokenization splits raw text into discrete tokens words', weight: 0.3, aliases: ['lexical segmentation', 'splitting words'] },
          { concept: 'stopword removal filters uninformative common words', weight: 0.3, aliases: ['stop words filtering', 'removes noise terms'] },
          { concept: 'stemming and lemmatization reduce words to root base forms', weight: 0.4, aliases: ['morphological reduction', 'porter stemmer lemmatizer'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Boolean Retrieval and Ranked Retrieval models.',
        options: [],
        correctAnswer: 'Boolean retrieval evaluates queries using exact Boolean logic (AND, OR, NOT) where documents either match completely or not, offering no inherent ranking. Ranked retrieval returns documents ordered by relevance scores (e.g., BM25 or Cosine Similarity), allowing users to review the most probable matches first without writing complex logical syntax.',
        gradingPoints: [
          { concept: 'boolean retrieval exact binary match using and or not unranked', weight: 0.5, aliases: ['binary matching', 'boolean logic exact match'] },
          { concept: 'ranked retrieval scores documents by relevance returning ordered results', weight: 0.5, aliases: ['relevance scoring', 'ranked search bm25'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the BM25 probabilistic ranking function and what advantages does it hold over raw TF-IDF?',
        options: [],
        correctAnswer: 'BM25 (Best Matching 25) is an advanced probabilistic ranking algorithm that improves on raw TF-IDF by incorporating Term Frequency saturation (preventing repetitively spammed terms from dominating scores) and document length normalization (penalizing excessively long documents that match keywords purely by chance).',
        gradingPoints: [
          { concept: 'probabilistic ranking algorithm optimizing term weighting', weight: 0.4, aliases: ['bm25 probabilistic model', 'okapi bm25'] },
          { concept: 'tf saturation and document length normalization advantages', weight: 0.6, aliases: ['length normalization', 'term frequency saturation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Relevance Feedback and the Rocchio algorithm in interactive search engines.',
        options: [],
        correctAnswer: 'Relevance feedback allows users to mark returned search results as relevant or non-relevant, enabling the search engine to refine the query. The Rocchio algorithm mathematically updates the query vector by moving it closer to the centroid of relevant documents and further away from the centroid of non-relevant documents.',
        gradingPoints: [
          { concept: 'interactive refinement based on user labeled relevant documents', weight: 0.5, aliases: ['user relevance input', 'query reformulation'] },
          { concept: 'rocchio adjusts query vector toward relevant and away from non relevant centroids', weight: 0.5, aliases: ['rocchio formula', 'centroid vector adjustment'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Latent Semantic Analysis (LSA) and how does it address synonymy and polysemy?',
        options: [],
        correctAnswer: 'Latent Semantic Analysis (LSA) uses Singular Value Decomposition (SVD) on a term-document matrix to project words and documents into a low-dimensional semantic space. It addresses synonymy (different words with identical meanings) by grouping conceptually related terms, and mitigates polysemy (words with multiple meanings) through contextual semantic co-occurrence.',
        gradingPoints: [
          { concept: 'svd dimensionality reduction on term document matrix to discover latent topics', weight: 0.5, aliases: ['singular value decomposition', 'semantic vector projection'] },
          { concept: 'resolves synonymy multiple words same meaning and mitigates polysemy', weight: 0.5, aliases: ['synonymy and polysemy', 'semantic grouping of terms'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe how Web Search Engines handle hyperlinked web structure using the PageRank algorithm.',
        options: [],
        correctAnswer: 'PageRank models the web as a directed graph where pages are nodes and hyperlinks are directed edges. It computes the authority and prestige of a webpage based on the number and quality of inbound links from other authoritative pages, simulating a random web surfer navigating through hyperlinks.',
        gradingPoints: [
          { concept: 'models web as directed graph of pages and hyperlinks', weight: 0.5, aliases: ['link analysis graph', 'nodes and edge web graph'] },
          { concept: 'computes authority based on quantity and quality of inbound backlinks', weight: 0.5, aliases: ['inbound backlink prestige', 'random surfer simulation'] },
        ],
      },
    ],
  },

  // 6. INS 311: E-Business Technology & Management
  {
    code: 'INS 311',
    title: 'E-Business Technology & Management',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Differentiate between E-Commerce and E-Business, discussing their scope.',
        options: [],
        correctAnswer: 'E-Commerce focuses specifically on the electronic buying and selling of goods, services, and funds over digital networks. E-Business has a much broader scope, encompassing all digital front-office and back-office operations, including supply chain management, electronic procurement, manufacturing automation, internal knowledge sharing, and customer relationship management.',
        gradingPoints: [
          { concept: 'ecommerce focuses on commercial transactions buying selling', weight: 0.5, aliases: ['electronic sales transactions', 'commercial trade online'] },
          { concept: 'ebusiness includes total internal and external digital enterprise processes', weight: 0.5, aliases: ['broader enterprise scope', 'holistic digital business processes'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the four major e-business revenue models: Subscription, Advertising, Transaction Fee, and Affiliate models.',
        options: [],
        correctAnswer: 'Subscription model charges users recurring fees for ongoing access to content or services (e.g., Netflix, SaaS). Advertising model provides free services and earns revenue by displaying ads to audiences (e.g., Google, YouTube). Transaction Fee model collects a commission or processing percentage on each purchase mediated (e.g., Paystack, eBay). Affiliate model earns referral commissions when visitors click outbound links and purchase from partner sites.',
        gradingPoints: [
          { concept: 'subscription recurring periodic access fee', weight: 0.25, aliases: ['subscription model', 'recurring membership'] },
          { concept: 'advertising displays promotional media to audience', weight: 0.25, aliases: ['advertising monetization', 'ad revenue model'] },
          { concept: 'transaction fee takes commission percentage per purchase', weight: 0.25, aliases: ['transaction percentage', 'brokerage commission'] },
          { concept: 'affiliate referral fee on partner purchases', weight: 0.25, aliases: ['affiliate commissions', 'referral link revenue'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Omnichannel Retailing and how does it differ from Multi-channel retailing?',
        options: [],
        correctAnswer: 'Multi-channel retailing operates multiple distinct channels (e.g., physical store, website, mobile app) that operate largely in silos with separate inventories and cart states. Omnichannel retailing provides a seamless, unified customer experience across all physical and digital touchpoints with synchronized customer profiles, inventory visibility, and cross-channel fulfillment (e.g., click-and-collect).',
        gradingPoints: [
          { concept: 'multichannel maintains separate isolated operational channels', weight: 0.5, aliases: ['distinct silos', 'isolated retail channels'] },
          { concept: 'omnichannel delivers unified seamless synchronized experience across all touchpoints', weight: 0.5, aliases: ['unified customer experience', 'integrated cross channel fulfillment'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Electronic Data Interchange (EDI) standards and their role in B2B supply chains.',
        options: [],
        correctAnswer: 'EDI is the computer-to-computer exchange of standardized electronic business documents (such as ANSI X12 or EDIFACT formats) between trading partners. It automates purchase orders, bills of lading, and invoices, eliminating manual human re-keying, drastically reducing error rates, and accelerating supply chain lead times.',
        gradingPoints: [
          { concept: 'computer to computer exchange of standardized electronic business documents', weight: 0.5, aliases: ['standardized document exchange', 'b2b electronic interchange'] },
          { concept: 'eliminates manual data entry accelerates order fulfillment and reduces errors', weight: 0.5, aliases: ['automates purchase orders', 'eliminates paper invoice errors'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Digital Wallets and Tokenization in securing online transactions.',
        options: [],
        correctAnswer: 'Digital wallets securely store tokenized payment credentials, allowing quick checkouts. Tokenization replaces sensitive primary account numbers (PAN) with non-sensitive alphanumeric surrogate strings (tokens); if intercepted by hackers, tokens are useless outside the authorized payment processor gateway.',
        gradingPoints: [
          { concept: 'digital wallets store encrypted credentials for friction free checkout', weight: 0.4, aliases: ['stored credential wallets', 'mobile wallet checkouts'] },
          { concept: 'tokenization replaces real card pan numbers with surrogate tokens', weight: 0.6, aliases: ['replaces pan with token', 'tokens useless to hackers'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Customer Lifetime Value (CLV) and why is it crucial for digital marketing decisions?',
        options: [],
        correctAnswer: 'Customer Lifetime Value (CLV) is a metric that estimates the total net profit an enterprise expects to earn from a customer relationship over its entire duration. It is crucial because it dictates the maximum justifiable Customer Acquisition Cost (CAC) for digital advertising campaigns and guides customer retention investments.',
        gradingPoints: [
          { concept: 'total net profit expected from customer relationship over full duration', weight: 0.5, aliases: ['projected lifetime net revenue', 'cumulative customer value'] },
          { concept: 'dictates allowable acquisition cost cac and retention strategy', weight: 0.5, aliases: ['caps cac spend', 'guides customer acquisition budget'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Network Effect in e-business platforms and distinguish between direct and indirect network effects.',
        options: [],
        correctAnswer: 'The Network Effect occurs when a platform becomes more valuable to existing and prospective users as more people use it. Direct network effects occur when value increases within the same user group as user count grows (e.g., WhatsApp). Indirect network effects occur on two-sided platforms where growth in one user group attracts more participants to another group (e.g., more Uber riders attract more drivers).',
        gradingPoints: [
          { concept: 'platform value increases as total user base grows', weight: 0.4, aliases: ['network externality', 'value grows with adoption'] },
          { concept: 'direct effect value rises within same user class', weight: 0.3, aliases: ['same side network effect', 'direct adoption value'] },
          { concept: 'indirect effect growth in one group attracts complementary second side', weight: 0.3, aliases: ['cross side network effect', 'two sided market dynamics'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Search Engine Marketing (SEM) versus Search Engine Optimization (SEO).',
        options: [],
        correctAnswer: 'SEO involves optimizing website content, technical architecture, and backlinks to earn high organic (unpaid) rankings on search engine results pages. SEM involves purchasing paid search advertisements (e.g., Google Ads pay-per-click) to secure immediate sponsored placement at the top of search queries.',
        gradingPoints: [
          { concept: 'seo optimizes content structure backlinks for unpaid organic rankings', weight: 0.5, aliases: ['organic search optimization', 'unpaid search visibility'] },
          { concept: 'sem purchases sponsored pay per click ads for instant placement', weight: 0.5, aliases: ['paid search advertising', 'google ads ppc'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the legal and privacy compliance requirements imposed by regulations like NDPR and GDPR on e-business sites.',
        options: [],
        correctAnswer: 'Regulations like NDPR and GDPR mandate that e-businesses obtain explicit, informed consent before collecting personal data, clearly state data processing purposes, grant users the right to access and erase their data (right to be forgotten), implement robust data encryption, and report security breaches within mandated timelines (e.g., 72 hours).',
        gradingPoints: [
          { concept: 'explicit user consent lawful processing right of erasure', weight: 0.5, aliases: ['consent and data subject rights', 'right to be forgotten'] },
          { concept: 'encryption data protection mandatory breach notification within deadline', weight: 0.5, aliases: ['breach notification reporting', 'data security mandates'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Dynamic Pricing in e-commerce and what algorithmic inputs determine price changes?',
        options: [],
        correctAnswer: 'Dynamic pricing is an automated pricing strategy where product prices continuously fluctuate in response to real-time market conditions. Algorithmic inputs determine price changes based on consumer demand surges, competitor price tracking, remaining inventory levels, customer purchasing history, and time of day (e.g., ride-share surge pricing or airline ticket fares).',
        gradingPoints: [
          { concept: 'automated real time price fluctuation based on market conditions', weight: 0.5, aliases: ['flexible algorithmic pricing', 'real time price adjustments'] },
          { concept: 'inputs demand surges competitor pricing inventory levels time factors', weight: 0.5, aliases: ['demand and supply inputs', 'competitor monitoring inventory levels'] },
        ],
      },
    ],
  },

  // 7. INS 313: Information Systems Security
  {
    code: 'INS 313',
    title: 'Information Systems Security',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the three pillars of the CIA Triad in information systems security and give an example threat against each.',
        options: [],
        correctAnswer: 'The CIA triad comprises: Confidentiality (ensuring data is accessible only to authorized entities; threatened by unauthorized snooping or data exfiltration), Integrity (safeguarding the accuracy and completeness of data; threatened by unauthorized modification, tampering, or SQL injection), and Availability (ensuring timely, reliable access to systems when needed; threatened by Distributed Denial of Service DDoS attacks or ransomware lockouts).',
        gradingPoints: [
          { concept: 'confidentiality protection against unauthorized disclosure snooping', weight: 0.35, aliases: ['confidentiality definition and threats', 'secrecy and privacy'] },
          { concept: 'integrity protection against unauthorized modification and tampering', weight: 0.35, aliases: ['integrity definition and threats', 'data alteration tampering'] },
          { concept: 'availability protection against outages ddos downtime', weight: 0.3, aliases: ['availability definition and threats', 'uptime and service access'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Symmetric and Asymmetric Cryptography, stating their respective performance and key-distribution characteristics.',
        options: [],
        correctAnswer: 'Symmetric cryptography uses a single shared secret key for both encryption and decryption (e.g., AES); it is computationally fast and ideal for bulk data encryption, but suffers from the complex challenge of securely distributing the shared key. Asymmetric cryptography uses a mathematically linked public-private key pair (e.g., RSA, ECC); it solves the key distribution problem, but is computationally slower and typically reserved for digital signatures and symmetric key exchanges.',
        gradingPoints: [
          { concept: 'symmetric single shared key fast bulk encryption key distribution problem', weight: 0.5, aliases: ['symmetric single secret key', 'aes single key speed'] },
          { concept: 'asymmetric public private key pair slower solves key distribution', weight: 0.5, aliases: ['public private key cryptography', 'rsa asymmetric key exchange'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Defense-in-Depth security strategy and how is it implemented across multiple organizational layers?',
        options: [],
        correctAnswer: 'Defense-in-depth is a layered cybersecurity defense strategy where multiple redundant security controls are deployed so that if one layer is compromised, subsequent layers prevent a full breach. It spans physical security (guards, biometrics), network security (firewalls, IDS/IPS), host security (EDR, OS patching), application security (WAF, input sanitization), data security (encryption, DLP), and human policies (security awareness training).',
        gradingPoints: [
          { concept: 'layered defense strategy where failure of one control is caught by next', weight: 0.4, aliases: ['layered security model', 'redundant defensive controls'] },
          { concept: 'layers physical network host application data and human policy', weight: 0.6, aliases: ['multiple security layers', 'physical perimeter endpoint data human'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain SQL Injection (SQLi) attacks, illustrating how malicious input alters database queries, and explain the primary mitigation.',
        options: [],
        correctAnswer: 'SQL Injection occurs when untrusted user input is directly concatenated into a dynamic SQL query string, allowing an attacker to manipulate SQL syntax (e.g., inserting " OR 1=1 --") to bypass authentication, dump sensitive records, or drop tables. The primary mitigation is using Parameterized Queries (Prepared Statements) or ORMs, which treat user input strictly as literal data rather than executable SQL commands.',
        gradingPoints: [
          { concept: 'untrusted input concatenated into query manipulating sql syntax', weight: 0.5, aliases: ['sql syntax manipulation', 'input concatenated into sql command'] },
          { concept: 'parameterized queries prepared statements treat input as literal data', weight: 0.5, aliases: ['prepared statements parameterized queries', 'input parameterization'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Cross-Site Scripting (XSS) and what is the difference between Stored and Reflected XSS?',
        options: [],
        correctAnswer: 'XSS is a vulnerability where malicious scripts (JavaScript) are injected into trusted web applications and executed in victims browsers. Stored XSS permanently persists the malicious script on the web server database (e.g., in a forum post) where it executes whenever any user views the page. Reflected XSS immediately reflects malicious script payload off the web server via URL query parameters in a single request-response cycle.',
        gradingPoints: [
          { concept: 'injected malicious javascript executes within victim browser context', weight: 0.4, aliases: ['client script injection', 'browser execution of malicious script'] },
          { concept: 'stored persists in database permanently infecting visitors', weight: 0.3, aliases: ['stored xss in database', 'persistent xss'] },
          { concept: 'reflected bounces off server via url query parameters immediately', weight: 0.3, aliases: ['reflected non persistent xss', 'immediate url reflection'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Role-Based Access Control (RBAC) versus Attribute-Based Access Control (ABAC).',
        options: [],
        correctAnswer: 'RBAC assigns access permissions to predefined organizational roles (e.g., student, lecturer, registrar) and users receive access based on assigned roles. ABAC is a fine-grained, dynamic access control model that grants permissions based on attributes of the user, resource, action, and contextual environment (e.g., user role, device security posture, IP location, and time of day).',
        gradingPoints: [
          { concept: 'rbac permissions tied strictly to assigned organizational roles', weight: 0.5, aliases: ['role based permissions', 'static role assignments'] },
          { concept: 'abac dynamic fine grained permissions based on user resource environmental attributes', weight: 0.5, aliases: ['attribute based rules', 'contextual dynamic access control'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the anatomy of a Phishing attack and describe technical and human countermeasures against it.',
        options: [],
        correctAnswer: 'Phishing is a social engineering attack where attackers impersonate reputable institutions via deceptive emails or websites to lure victims into revealing credentials or installing malware. Technical countermeasures include SPF, DKIM, and DMARC email authentication records, automated spam filtering, and hardware security keys (FIDO2/WebAuthn). Human countermeasures include mandatory employee security awareness training and simulated phishing drills.',
        gradingPoints: [
          { concept: 'social engineering deceptive communication stealing credentials or deploying malware', weight: 0.4, aliases: ['credential theft via deception', 'fraudulent email impersonation'] },
          { concept: 'technical email authentication spf dkim dmarc mfa', weight: 0.3, aliases: ['email authentication records', 'hardware mfa filtering'] },
          { concept: 'human awareness training and simulated phishing drills', weight: 0.3, aliases: ['security awareness education', 'phishing simulations'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Zero Trust security architecture and what core tenets define its implementation?',
        options: [],
        correctAnswer: 'Zero Trust is a security paradigm founded on the principle of "never trust, always verify." Unlike traditional perimeter defenses that trust internal traffic, Zero Trust assumes breach and requires strict continuous identity verification, least privilege access, device health validation, and micro-segmentation for every access request, regardless of whether it originates inside or outside the network.',
        gradingPoints: [
          { concept: 'never trust always verify assumes breach regardless of network location', weight: 0.5, aliases: ['zero trust philosophy', 'perimeterless security model'] },
          { concept: 'continuous identity verification least privilege micro segmentation device health', weight: 0.5, aliases: ['zero trust tenets', 'microsegmentation continuous validation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe an Incident Response Plan (IRP) and its six standard lifecycle phases according to NIST.',
        options: [],
        correctAnswer: 'An IRP is an organized protocol to identify, respond to, and recover from cybersecurity breaches. NIST defines six phases: 1. Preparation (establishing tools, policies, and response team); 2. Detection & Analysis (identifying anomalies and scope of intrusion); 3. Containment (isolating affected systems to prevent spread); 4. Eradication (removing malware and compromised artifacts); 5. Recovery (restoring operations safely from clean backups); and 6. Post-Incident Activity (conducting lessons-learned analysis).',
        gradingPoints: [
          { concept: 'structured organizational roadmap to mitigate and recover from security breaches', weight: 0.4, aliases: ['irp definition', 'breach response roadmap'] },
          { concept: 'preparation detection containment eradication recovery lessons learned', weight: 0.6, aliases: ['nist six phases', 'incident response lifecycle'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Ransomware and what technical safeguards protect organizational data against complete extortion?',
        options: [],
        correctAnswer: 'Ransomware is malicious software that encrypts an enterprise critical files and databases, demanding cryptocurrency ransom payments for decryption keys. Key technical safeguards include immutable offline/air-gapped backups (following the 3-2-1 backup rule), robust endpoint detection and response (EDR), application whitelisting, prompt operating system patch management, and strict network segmentation.',
        gradingPoints: [
          { concept: 'malware encrypting enterprise files demanding ransom for decryption key', weight: 0.4, aliases: ['file encrypting extortion malware', 'ransomware definition'] },
          { concept: 'immutable air gapped 3 2 1 backups edr patching network segmentation', weight: 0.6, aliases: ['immutable backups safeguard', 'edr offline backups patching'] },
        ],
      },
    ],
  },

  // 8. INS 315: Business Intelligence
  {
    code: 'INS 315',
    title: 'Business Intelligence',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Define Business Intelligence (BI) and explain how it converts raw operational data into actionable business insight.',
        options: [],
        correctAnswer: 'Business Intelligence (BI) encompasses the architectures, tools, technologies, and practices used to collect, integrate, analyze, and present business data. It converts raw operational data into actionable insight through automated ETL data extraction, centralized data warehousing, multidimensional modeling, and interactive visual reporting that enables executives to make data-driven strategic decisions.',
        gradingPoints: [
          { concept: 'framework of tools technologies architectures analyzing business data', weight: 0.5, aliases: ['bi definition', 'technologies for data analytics'] },
          { concept: 'etl integration warehousing multidimensional modeling visual decision support', weight: 0.5, aliases: ['data to insight pipeline', 'etl warehouse visualization steps'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the three tiers of a Business Intelligence architecture: Data Tier, Logic/Analytics Tier, and Presentation Tier.',
        options: [],
        correctAnswer: 'The Data Tier extracts, cleans, and stores consolidated enterprise records in relational operational stores, data warehouses, and data marts. The Logic/Analytics Tier handles calculations, OLAP multidimensional cubes, semantic data modeling, and machine learning scoring algorithms. The Presentation Tier renders intuitive user-facing reports, KPI dashboards, mobile visualizations, and self-service analytics interfaces.',
        gradingPoints: [
          { concept: 'data tier handles etl warehousing and data marts', weight: 0.35, aliases: ['storage and integration tier', 'data extraction storage'] },
          { concept: 'logic tier executes olap modeling semantic layers analytics', weight: 0.35, aliases: ['semantic analytics tier', 'business logic modeling'] },
          { concept: 'presentation tier delivers kpi dashboards reports visual interfaces', weight: 0.3, aliases: ['visualization tier', 'dashboards and reporting layer'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Key Performance Indicator (KPI) and what characteristics make a KPI effective under the SMART criteria?',
        options: [],
        correctAnswer: 'A Key Performance Indicator (KPI) is a quantifiable metric that evaluates an organization success in achieving critical business objectives. Under SMART criteria, an effective KPI must be Specific (clear and unambiguous), Measurable (quantifiable with reliable data), Achievable (realistic and attainable), Relevant (aligned directly with corporate strategy), and Time-bound (measured within a defined time horizon).',
        gradingPoints: [
          { concept: 'quantifiable measure evaluating organizational success against strategic goals', weight: 0.4, aliases: ['kpi definition', 'quantifiable business metric'] },
          { concept: 'specific measurable achievable relevant time bound smart criteria', weight: 0.6, aliases: ['smart criteria', 'specific measurable attainable relevant timed'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Self-Service BI and Traditional Enterprise BI.',
        options: [],
        correctAnswer: 'Traditional Enterprise BI relies on specialized IT data teams to build static, scheduled reports and maintain rigid semantic schemas, often resulting in prolonged report turnaround delays. Self-Service BI equips non-technical business analysts with intuitive visual tools (e.g., Power BI, Tableau) to query datasets, create ad-hoc visualizations, and derive insights autonomously without waiting for IT intervention.',
        gradingPoints: [
          { concept: 'traditional bi relies on it specialists static scheduled reports slow agility', weight: 0.5, aliases: ['it driven reporting', 'centralized it report bottleneck'] },
          { concept: 'self service bi empowers business users with visual ad hoc discovery tools', weight: 0.5, aliases: ['user autonomous analytics', 'power bi tableau self service'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Data Governance in Business Intelligence and why poor data governance leads to "Garbage In, Garbage Out" (GIGO).',
        options: [],
        correctAnswer: 'Data governance establishes organizational policies, standards, stewardship, and compliance frameworks to manage data availability, usability, integrity, and security. Without rigorous data governance, source data suffers from duplicate records, inconsistent schemas, missing entries, and corrupted formats, producing misleading analytics that mislead executive decisions (GIGO).',
        gradingPoints: [
          { concept: 'framework of policies standards stewardship ensuring data quality and compliance', weight: 0.5, aliases: ['data governance definition', 'rules and policies for data quality'] },
          { concept: 'prevents dirty inconsistent data from distorting executive decision making', weight: 0.5, aliases: ['gigo explanation', 'garbage in garbage out prevention'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the differences between an Enterprise Data Warehouse, an Operational Data Store (ODS), and a Data Lake.',
        options: [],
        correctAnswer: 'An ODS stores near real-time, volatile operational data to support day-to-day tactical reporting. An Enterprise Data Warehouse stores highly structured, historical, curated, and cleaned data optimized for OLAP analytics. A Data Lake stores massive volumes of raw, semi-structured, and unstructured data in native formats (e.g., JSON, logs, audio) for exploration and machine learning training.',
        gradingPoints: [
          { concept: 'ods near real time volatile tactical operational data store', weight: 0.35, aliases: ['ods operational reporting', 'real time tactical data'] },
          { concept: 'data warehouse structured curated historical data optimized for olap', weight: 0.35, aliases: ['edw structured historical', 'curated analytics store'] },
          { concept: 'data lake raw unstructured native format repository for ml big data', weight: 0.3, aliases: ['data lake raw store', 'unstructured big data repository'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Data Storytelling in business intelligence and what are its three fundamental pillars?',
        options: [],
        correctAnswer: 'Data storytelling is the practice of communicating actionable analytical insights to non-technical stakeholders through a compelling narrative. Its three fundamental pillars are: Data (the verified quantitative metrics), Visuals (charts and graphics that illuminate patterns), and Narrative (the contextual story and call-to-action that inspires decision-makers).',
        gradingPoints: [
          { concept: 'communicating analytical insights through compelling narrative context', weight: 0.4, aliases: ['data storytelling definition', 'narrative data presentation'] },
          { concept: 'data visuals narrative three pillars', weight: 0.6, aliases: ['three elements', 'data visual narrative components'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept of Data Lineage in BI environments and its importance for regulatory compliance.',
        options: [],
        correctAnswer: 'Data lineage maps the complete life cycle of data, tracking its origin, transformations, pipeline dependencies, and ultimate destination across the BI ecosystem. It is vital for regulatory audits (e.g., Basel III, GDPR) because it allows auditors to trace every calculated KPI metric back to its original raw source records to verify mathematical accuracy and compliance.',
        gradingPoints: [
          { concept: 'maps data lifecycle origin transformations flow and destination', weight: 0.5, aliases: ['data provenance', 'tracks data journey from source to target'] },
          { concept: 'crucial for audit verification debugging and regulatory compliance trace', weight: 0.5, aliases: ['audit traceability', 'validating kpi calculations for compliance'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Balanced Scorecard and what four strategic perspectives does it evaluate?',
        options: [],
        correctAnswer: 'A Balanced Scorecard is a strategic management performance metric that balances financial measures with operational operational drivers. It evaluates an organization across four core perspectives: 1. Financial Perspective (profitability, shareholder value); 2. Customer Perspective (satisfaction, retention); 3. Internal Business Processes (efficiency, quality); and 4. Learning and Growth (employee skills, innovation, corporate culture).',
        gradingPoints: [
          { concept: 'strategic management tool balancing financial and operational performance', weight: 0.4, aliases: ['balanced scorecard definition', 'holistic performance framework'] },
          { concept: 'financial customer internal business process learning and growth perspectives', weight: 0.6, aliases: ['four perspectives', 'financial customer internal learning'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Real-Time Business Intelligence (RTBI) and mention architectural technologies enabling it.',
        options: [],
        correctAnswer: 'Real-Time Business Intelligence analyzes data and delivers insights instantaneously as business events transpire, with zero or minimal latency. Enabling architectural technologies include event stream processing engines (e.g., Apache Kafka, Apache Flink), In-Memory Databases (e.g., SAP HANA, Redis), and change data capture (CDC) connectors.',
        gradingPoints: [
          { concept: 'delivers analytics immediately as transactions occur with zero latency', weight: 0.5, aliases: ['real time analytics', 'event driven streaming insights'] },
          { concept: 'technologies event streaming kafka in memory databases cdc', weight: 0.5, aliases: ['kafka flink in memory databases', 'streaming architectures'] },
        ],
      },
    ],
  },

  // 9. INS 317: Mobile Computing Systems
  {
    code: 'INS 317',
    title: 'Mobile Computing Systems',
    level: 300,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define Mobile Computing and explain its three core elements: Mobile Communication, Mobile Hardware, and Mobile Software.',
        options: [],
        correctAnswer: 'Mobile computing is a technology paradigm that enables the transmission of data, voice, and video via wireless computing devices without physical network connections. Its three core elements are: Mobile Communication (wireless protocols and cellular infrastructure), Mobile Hardware (portable devices, sensors, and battery power sources), and Mobile Software (mobile operating systems and specialized responsive client applications).',
        gradingPoints: [
          { concept: 'computing and data communication across portable wireless devices without wires', weight: 0.4, aliases: ['mobile computing definition', 'wireless portable computing'] },
          { concept: 'mobile communication mobile hardware mobile software elements', weight: 0.6, aliases: ['three elements', 'communication hardware software components'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Native mobile apps, Web apps, and Hybrid mobile apps in terms of performance and code reusability.',
        options: [],
        correctAnswer: 'Native apps are built specifically for a single mobile operating system (e.g., Swift for iOS, Kotlin for Android); they deliver maximum performance and direct access to device hardware, but require separate codebases. Web apps run in mobile browsers using web technologies (HTML5, JS); they offer 100% code reusability across platforms, but have lower performance and restricted hardware access. Hybrid apps (e.g., React Native, Flutter) combine a single shared codebase with native wrapper bindings, offering a balanced compromise between performance and cross-platform reusability.',
        gradingPoints: [
          { concept: 'native maximum performance platform specific separated codebases', weight: 0.35, aliases: ['native apps swift kotlin', 'high performance device access'] },
          { concept: 'web browser based cross platform low performance restricted hardware', weight: 0.35, aliases: ['mobile web apps', 'browser html5 cross platform'] },
          { concept: 'hybrid single shared codebase compiled into native views react native flutter', weight: 0.3, aliases: ['cross platform hybrid', 'flutter react native trade-offs'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the unique challenges and constraints inherent to mobile computing environments.',
        options: [],
        correctAnswer: 'Mobile computing environments face strict constraints including: limited battery energy consumption, fluctuating wireless bandwidth and variable latency, intermittent network disconnections, constrained memory and CPU thermal limits, small display screens requiring concise UX design, and heightened physical security risks of device loss or theft.',
        gradingPoints: [
          { concept: 'battery energy constraints and power management', weight: 0.35, aliases: ['limited battery capacity', 'power consumption limits'] },
          { concept: 'unreliable wireless bandwidth latency disconnections', weight: 0.35, aliases: ['intermittent connectivity', 'bandwidth fluctuations'] },
          { concept: 'screen size constraints memory limits physical loss theft risks', weight: 0.3, aliases: ['ui size limits', 'physical device theft vulnerability'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Mobile IP and how does it maintain continuous network connectivity when a mobile node roams between subnets?',
        options: [],
        correctAnswer: 'Mobile IP allows a mobile node to retain its permanent Home IP address while moving across different network subnets. When roaming, the mobile node acquires a temporary Care-of Address (CoA) from a Foreign Agent, which registers with the Home Agent. The Home Agent then intercepts packets addressed to the mobile node permanent IP and tunnels them (using IP encapsulation) to the Care-of Address.',
        gradingPoints: [
          { concept: 'maintains permanent home address while roaming across networks', weight: 0.4, aliases: ['retains home ip during roaming', 'seamless subnet transition'] },
          { concept: 'home agent foreign agent care of address coa and tunneling encapsulation', weight: 0.6, aliases: ['home agent foreign agent', 'coa and packet tunneling'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Location-Based Services (LBS) and describe three positioning technologies used to determine mobile coordinates.',
        options: [],
        correctAnswer: 'Location-Based Services (LBS) are mobile applications that leverage the geographic position of a device to deliver personalized services (e.g., navigation, location-based advertising). Positioning technologies include: Global Positioning System (GPS, satellite trilateration), Cellular Cell-ID / Triangulation (measuring signal strength from cellular towers), and Wi-Fi Fingerprinting / BLE Beacons (indoor positioning via local wireless access points).',
        gradingPoints: [
          { concept: 'applications leveraging device geographic coordinates for customized services', weight: 0.4, aliases: ['lbs definition', 'location context services'] },
          { concept: 'gps cell tower triangulation wifi beacon positioning technologies', weight: 0.6, aliases: ['gps cellular wifi positioning', 'three positioning methods'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the disconnected operation mode in mobile database synchronization (Store-and-Forward).',
        options: [],
        correctAnswer: 'Disconnected operation enables mobile users to continue querying and inserting transactions into a local lightweight database (e.g., SQLite, WatermelonDB) while offline. Once network connectivity is restored, a two-way synchronization engine reconciles local changes with the central enterprise database, using conflict resolution rules (e.g., timestamps or vector clocks) to settle competing edits.',
        gradingPoints: [
          { concept: 'local database operates autonomously during offline disconnections', weight: 0.5, aliases: ['offline capability', 'local database transactions offline'] },
          { concept: 'two way sync and conflict resolution upon reconnecting', weight: 0.5, aliases: ['data reconciliation', 'conflict resolution timestamp sync'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Mobile Device Management (MDM) and what capabilities does it provide enterprise IT administrators?',
        options: [],
        correctAnswer: 'Mobile Device Management (MDM) is enterprise software that allows IT administrators to remotely manage, monitor, and secure corporate-issued or BYOD mobile devices. Capabilities include enforcing device passcodes, pushing corporate VPN profiles, isolating business apps in encrypted containers, monitoring OS patch compliance, and executing remote wipe commands if a device is stolen.',
        gradingPoints: [
          { concept: 'software suite managing monitoring securing mobile endpoints remotely', weight: 0.4, aliases: ['mdm definition', 'enterprise device governance'] },
          { concept: 'remote wipe encryption containerization passcode enforcement app deployment', weight: 0.6, aliases: ['remote wipe passcode policies', 'corporate container profiles'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Context-Aware Computing in mobile environments and cite three contextual dimensions.',
        options: [],
        correctAnswer: 'Context-aware computing refers to applications that automatically sense and adapt their behavior according to the user current situational context without explicit user intervention. Contextual dimensions include: Physical context (location, ambient light, noise level), User context (activity, schedule, calendar availability), and Technical context (battery level, network connection speed, device orientation).',
        gradingPoints: [
          { concept: 'applications sensing and adapting to situational context automatically', weight: 0.4, aliases: ['context awareness definition', 'adaptive situational behavior'] },
          { concept: 'physical user and technical device context dimensions', weight: 0.6, aliases: ['three dimensions', 'location activity device state'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the security vulnerabilities unique to mobile applications and public Wi-Fi networks.',
        options: [],
        correctAnswer: 'Mobile devices face risks including unencrypted communication over rogue public Wi-Fi hotspots enabling Man-in-the-Middle (MitM) packet sniffing, malicious mobile apps requesting excessive permissions, insecure local storage of unencrypted tokens in shared preferences, and physical tampering on jailbroken or rooted devices that bypass OS sandboxing.',
        gradingPoints: [
          { concept: 'mitm eavesdropping on public unencrypted wifi access points', weight: 0.5, aliases: ['man in the middle on public wifi', 'rogue hotspot sniffing'] },
          { concept: 'excessive permissions insecure local storage jailbreak sandbox bypass', weight: 0.5, aliases: ['insecure storage permissions', 'rooting jailbreaking vulnerabilities'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Edge Computing in mobile architecture and how does it reduce latency for mobile applications?',
        options: [],
        correctAnswer: 'Edge computing relocates compute processing, storage, and analytics closer to the end user and mobile devices at the network edge (e.g., local base stations or edge gateways) rather than relying exclusively on distant centralized cloud data centers. This dramatically reduces round-trip network latency, conserves mobile cellular bandwidth, and enables real-time responsiveness for augmented reality and IoT applications.',
        gradingPoints: [
          { concept: 'processes data at network edge near devices instead of distant cloud', weight: 0.5, aliases: ['edge computing location', 'proximity processing'] },
          { concept: 'minimizes round trip latency conserves cellular bandwidth real time speed', weight: 0.5, aliases: ['latency reduction bandwidth savings', 'fast response times for mobile'] },
        ],
      },
    ],
  },

  // 10. INS 323: Business Process Modelling
  {
    code: 'INS 323',
    title: 'Business Process Modelling',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Define Business Process Modelling (BPM) and explain why organizations model their processes.',
        options: [],
        correctAnswer: 'Business Process Modelling (BPM) is the graphical representation of an organization business activities, workflows, and resource interactions. Organizations model their processes to achieve operational transparency, identify redundant bottlenecks, standardize workflows for quality consistency, facilitate employee onboarding, and prepare systems for digital automation and ERP integration.',
        gradingPoints: [
          { concept: 'graphical visual representation of business activities and workflows', weight: 0.4, aliases: ['process modeling definition', 'visual workflow mapping'] },
          { concept: 'transparency bottleneck identification standardization automation readiness', weight: 0.6, aliases: ['reasons for modeling', 'clarity standardization optimization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the four fundamental element categories in BPMN (Business Process Model and Notation): Flow Objects, Connecting Objects, Swimlanes, and Artifacts.',
        options: [],
        correctAnswer: 'In BPMN, Flow Objects are core structural elements: Events (circles), Activities/Tasks (rounded rectangles), and Gateways (diamonds). Connecting Objects link flow objects: Sequence Flows (solid arrows), Message Flows (dashed arrows), and Associations (dotted lines). Swimlanes organize responsibilities: Pools (separate organizations) and Lanes (internal departments). Artifacts provide supplementary details: Data Objects, Data Stores, and Text Annotations.',
        gradingPoints: [
          { concept: 'flow objects events activities gateways', weight: 0.25, aliases: ['flow objects', 'events tasks gateways'] },
          { concept: 'connecting objects sequence message association flows', weight: 0.25, aliases: ['connecting objects', 'flow lines arrows'] },
          { concept: 'swimlanes pools and lanes organizing organizational roles', weight: 0.25, aliases: ['swimlanes pools lanes', 'role partitions'] },
          { concept: 'artifacts data objects datastores annotations', weight: 0.25, aliases: ['artifacts data stores', 'annotations and data'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Exclusive (XOR) Gateways, Parallel (AND) Gateways, and Inclusive (OR) Gateways in BPMN.',
        options: [],
        correctAnswer: 'An Exclusive Gateway (XOR, marked with an X or blank diamond) evaluates conditions and diverts flow along exactly one mutually exclusive branch. A Parallel Gateway (AND, marked with a plus + sign) splits the workflow into multiple concurrent branches that all execute simultaneously. An Inclusive Gateway (OR, marked with a circle O) routes flow along one, several, or all outgoing branches whose conditions evaluate to true.',
        gradingPoints: [
          { concept: 'exclusive xor chooses exactly one mutually exclusive branch', weight: 0.35, aliases: ['xor gateway', 'single path selection'] },
          { concept: 'parallel and forks flow into all concurrent paths simultaneously', weight: 0.35, aliases: ['parallel and gateway', 'concurrent simultaneous branches'] },
          { concept: 'inclusive or routes flow along any branches meeting condition', weight: 0.3, aliases: ['inclusive or gateway', 'one or more valid paths'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the distinction between an As-Is process model and a To-Be process model, and explain how Gap Analysis connects them.',
        options: [],
        correctAnswer: 'The As-Is process model documents the current operational workflow including existing inefficiencies, delays, and workarounds. The To-Be process model depicts the redesigned, future optimal workflow streamlined by automation and reengineering. Gap Analysis examines the delta between As-Is and To-Be states to identify what technologies, organizational changes, and skills are required to transition successfully.',
        gradingPoints: [
          { concept: 'as is current operational workflow baseline with flaws', weight: 0.35, aliases: ['as is current state', 'baseline workflow'] },
          { concept: 'to be future optimized streamlined target workflow', weight: 0.35, aliases: ['to be target state', 'redesigned workflow'] },
          { concept: 'gap analysis identifies delta technologies and changes required to bridge states', weight: 0.3, aliases: ['gap analysis bridge', 'transition delta identification'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Process Simulation in BPM and how it assists capacity planning before live implementation.',
        options: [],
        correctAnswer: 'Process simulation runs mathematical models of a business process under simulated transaction volumes and varying resource constraints. It assists capacity planning by revealing where task queues back up, calculating expected cycle times, stress-testing staff workloads under peak demand, and evaluating cost impacts before spending capital on live deployment.',
        gradingPoints: [
          { concept: 'mathematical model running simulated volumes under resource constraints', weight: 0.5, aliases: ['simulation modeling', 'simulating transaction volumes'] },
          { concept: 'uncovers bottlenecks queues cycle times stress testing capacity', weight: 0.5, aliases: ['capacity planning insight', 'identifies queue buildup and bottlenecks'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Process Mining and how does it leverage system event logs to discover actual business workflows?',
        options: [],
        correctAnswer: 'Process mining is an analytical technology that extracts event logs from enterprise information systems (e.g., ERP, CRM) to automatically reconstruct, visualize, and analyze actual executed business processes. It compares actual event executions against idealized models to discover deviations, non-compliant workarounds, and hidden processing bottlenecks.',
        gradingPoints: [
          { concept: 'extracts enterprise system event logs to reconstruct actual executed processes', weight: 0.5, aliases: ['log based process reconstruction', 'event log process discovery'] },
          { concept: 'identifies deviations non compliance workarounds and real bottlenecks', weight: 0.5, aliases: ['conformance checking', 'discovers real workflow deviations'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept of Swimlanes in BPMN and distinguish between Pools and Lanes.',
        options: [],
        correctAnswer: 'Swimlanes provide visual boundaries that partition responsibilities across process participants. A Pool represents an autonomous organizational entity or external trading partner (e.g., Company vs Customer) that communicates across pools via Message Flows. A Lane is a sub-partition inside a single Pool that designates internal roles or departments (e.g., Finance, Shipping, Legal) sharing a Sequence Flow.',
        gradingPoints: [
          { concept: 'swimlanes partition operational responsibilities', weight: 0.3, aliases: ['visual role partitioning', 'responsibility boundaries'] },
          { concept: 'pool autonomous external participant communicating via message flows', weight: 0.35, aliases: ['pool external entity', 'separate organization pool'] },
          { concept: 'lane internal department or role inside pool connected by sequence flows', weight: 0.35, aliases: ['lane internal role', 'sub partition inside pool'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cycle Time, Throughput, and Little Law in business process performance measurement.',
        options: [],
        correctAnswer: 'Cycle Time is the total elapsed time required for a single work item to travel from start to completion of a process. Throughput is the number of completed units produced by the process per unit of time (e.g., orders per hour). Little Law establishes the fundamental mathematical relationship: Work-in-Progress (WIP) = Throughput × Cycle Time, showing that reducing cycle time directly decreases work-in-progress inventory.',
        gradingPoints: [
          { concept: 'cycle time total elapsed time from start to finish per item', weight: 0.35, aliases: ['cycle time duration', 'elapsed processing duration'] },
          { concept: 'throughput completed units produced per unit time', weight: 0.35, aliases: ['processing rate', 'production rate throughput'] },
          { concept: 'little law wip equals throughput times cycle time', weight: 0.3, aliases: ['wip throughput cycle time relation', 'littles law formula'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Robotic Process Automation (RPA) and how does it integrate with business process management?',
        options: [],
        correctAnswer: 'Robotic Process Automation (RPA) deploys software bots that mimic human user interactions on digital interfaces to automate repetitive, rule-based clerical tasks (e.g., copy-pasting data between legacy windows, generating invoices). While BPM redesigns and orchestrates end-to-end multi-system workflows, RPA provides tactical point-automation of discrete manual tasks without re-architecting legacy backend code.',
        gradingPoints: [
          { concept: 'software bots automating repetitive rule based clerical ui interactions', weight: 0.5, aliases: ['rpa bot automation', 'ui task automation'] },
          { concept: 'complements bpm by handling discrete tasks without re architecting backend', weight: 0.5, aliases: ['bpm vs rpa integration', 'tactical task automation inside bpm'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the principles of Lean and Six Sigma when applied to business process optimization.',
        options: [],
        correctAnswer: 'Lean focuses on maximizing customer value by systematically identifying and eliminating eight forms of process waste (muda, e.g., unnecessary waiting, overproduction, defects). Six Sigma employs data-driven statistical methodologies (such as the DMAIC framework: Define, Measure, Analyze, Improve, Control) to minimize process variance and reduce error defect rates to fewer than 3.4 defects per million opportunities.',
        gradingPoints: [
          { concept: 'lean eliminates waste muda maximizing flow and customer value', weight: 0.5, aliases: ['lean waste reduction', 'eliminates non value adding activities'] },
          { concept: 'six sigma dmaic statistical variance reduction targeting zero defects', weight: 0.5, aliases: ['six sigma variance reduction', 'dmaic statistical quality control'] },
        ],
      },
    ],
  },

  // 11. INS 399: SIWES Industrial Training
  {
    code: 'INS 399',
    title: 'SIWES Industrial Training',
    level: 300,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain the core objectives of the Students Industrial Work Experience Scheme (SIWES) for Information Systems undergraduates.',
        options: [],
        correctAnswer: 'The core objectives of SIWES are to expose students to real-world industrial environments, bridge the gap between classroom theoretical concepts and enterprise IT practices, develop professional problem-solving and communication skills, familiarize students with industry-standard technologies and work ethics, and ease the eventual transition of graduates into full-time employment.',
        gradingPoints: [
          { concept: 'bridges gap between classroom theory and real enterprise practice', weight: 0.5, aliases: ['theory into practice', 'practical industrial exposure'] },
          { concept: 'professional development work ethics and post graduation employment readiness', weight: 0.5, aliases: ['workplace skills', 'industry readiness'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the documentation structure of an official SIWES technical training report.',
        options: [],
        correctAnswer: 'An official SIWES report includes: Title Page and Certifications, Acknowledgements, Table of Contents, Company Profile (organizational structure and activities), Departmental Posting and Primary Responsibilities, Technical Projects and Tools Mastered, Industrial Challenges Encountered and Solutions Implemented, Conclusions and Practical Recommendations, and Appendices containing Logbook extracts and architectural diagrams.',
        gradingPoints: [
          { concept: 'company profile organizational structure and departmental placement', weight: 0.35, aliases: ['organizational background', 'placement details'] },
          { concept: 'technical projects tools acquired and tasks executed', weight: 0.35, aliases: ['technical work done', 'projects and tools mastered'] },
          { concept: 'challenges solutions recommendations logbook appendices', weight: 0.3, aliases: ['challenges encountered', 'recommendations and appendices'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the function and daily maintenance of the SIWES Logbook.',
        options: [],
        correctAnswer: 'The SIWES Logbook serves as an official, auditable chronological diary of all daily tasks, equipment utilized, and technical milestones accomplished by the student. It must be completed on a daily basis, reviewed and signed weekly by the industry-based supervisor with formal performance comments, and stamped periodically by institutional visiting supervisors.',
        gradingPoints: [
          { concept: 'chronological official record of daily industrial tasks and tools', weight: 0.5, aliases: ['daily work diary', 'auditable task record'] },
          { concept: 'weekly verification comments and signing by industry and academic supervisors', weight: 0.5, aliases: ['supervisor sign off', 'weekly review and stamping'] },
        ],
      },
      {
        type: 'theory',
        question: 'How do Information Systems students apply database and network troubleshooting skills in enterprise workplace settings?',
        options: [],
        correctAnswer: 'Students apply these skills by executing routine database backup verification, writing SQL data extraction scripts for departmental reports, optimizing query indexing, configuring local IP subnets, terminating Ethernet cabling, diagnosing network connectivity bottlenecks using ping and traceroute, and securing employee workstations with endpoint antivirus agents.',
        gradingPoints: [
          { concept: 'database backups sql querying report extraction index tuning', weight: 0.5, aliases: ['sql reporting backups', 'database administration tasks'] },
          { concept: 'network cabling ip configuration ping traceroute diagnostics endpoint security', weight: 0.5, aliases: ['network diagnostics cabling', 'ip configuration troubleshooting'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss workplace ethics, confidentiality, and Non-Disclosure Agreements (NDAs) during industrial attachment.',
        options: [],
        correctAnswer: 'Workplace ethics require punctuality, professional integrity, respectful teamwork, and strict adherence to organizational security protocols. NDAs are legally binding contracts that prohibit students from sharing, leaking, or misusing proprietary enterprise source code, customer records, financial ledgers, or trade secrets encountered during their internship.',
        gradingPoints: [
          { concept: 'professional integrity punctuality adherence to corporate policies', weight: 0.5, aliases: ['workplace ethics standards', 'professionalism and punctuality'] },
          { concept: 'nda legally binds protection of proprietary code customer data and trade secrets', weight: 0.5, aliases: ['confidentiality agreement', 'protecting sensitive enterprise assets'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of an Industry-Based Supervisor and an Institutional Academic Supervisor in assessing SIWES performance.',
        options: [],
        correctAnswer: 'The Industry-Based Supervisor directly mentors the intern daily, assigns project tasks, monitors work attendance, resolves technical roadblocks, and scores operational aptitude and diligence on the final employer assessment form. The Institutional Academic Supervisor visits the workplace to inspect student facilities, reviews logbook authenticity, and participates in the institutional defense and grading.',
        gradingPoints: [
          { concept: 'industry supervisor mentors daily assigns tasks grades operational diligence', weight: 0.5, aliases: ['on site supervisor evaluation', 'daily workplace mentorship'] },
          { concept: 'academic supervisor conducts inspection visits validates logbook assesses defense', weight: 0.5, aliases: ['university supervisor inspection', 'academic grading and defense'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe standard health, safety, and environmental (HSE) protocols relevant to IT enterprise data centers and server rooms.',
        options: [],
        correctAnswer: 'Data center HSE protocols include maintaining clean, climate-controlled environments, deploying gaseous fire suppression systems (e.g., FM-200 or Novec 1230 instead of water sprinklers) that protect electronics, wearing antistatic ESD wrist straps when handling silicon hardware, ensuring unobstructed emergency exits, and properly routing power cables to avoid tripping hazards.',
        gradingPoints: [
          { concept: 'gaseous clean agent fire suppression protecting electronics', weight: 0.5, aliases: ['fm 200 clean agent fire safety', 'non water fire suppression'] },
          { concept: 'esd anti static protection climate control cable safety emergency exits', weight: 0.5, aliases: ['antistatic precautions', 'temperature control cable routing safety'] },
        ],
      },
      {
        type: 'theory',
        question: 'How does an intern effectively communicate and resolve technical software bugs during collaborative team projects?',
        options: [],
        correctAnswer: 'An intern effectively resolves bugs by reproducing the defect reliably, documenting exact steps to reproduce, environment versions, and log outputs in issue tracking platforms (e.g., Jira, GitHub Issues), communicating respectfully with senior developers, isolating the problem in version-controlled branches, and submitting peer-reviewed pull requests with unit tests.',
        gradingPoints: [
          { concept: 'documents reproducible steps logs environment details in issue tracker', weight: 0.5, aliases: ['detailed bug report', 'steps to reproduce in jira'] },
          { concept: 'isolated branching peer review pull requests unit testing validation', weight: 0.5, aliases: ['git branch pull request', 'peer code review testing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss the importance of user requirement elicitation interviews conducted by IT interns with non-technical department staff.',
        options: [],
        correctAnswer: 'Requirement elicitation interviews enable interns to understand the actual operational pain points and workflow frustrations experienced by non-technical staff. By actively listening, translating business jargon into structured specifications, and clarifying edge cases, interns prevent building misaligned software features that users ultimately reject.',
        gradingPoints: [
          { concept: 'identifies operational pain points and genuine workflow requirements', weight: 0.5, aliases: ['understands user frustrations', 'uncovers operational needs'] },
          { concept: 'translates business terminology into specs preventing misaligned software', weight: 0.5, aliases: ['bridges communication gap', 'prevents building unwanted features'] },
        ],
      },
      {
        type: 'theory',
        question: 'What strategies should an intern employ to reflect on personal skill gaps and translate SIWES learning into a final-year research project?',
        options: [],
        correctAnswer: 'An intern should systematically document recurring technical bottlenecks and emerging industry trends encountered during work, solicit constructive feedback from senior mentors, identify real-world organizational inefficiencies that lacked adequate software solutions, and synthesize those practical operational problems into a targeted, impactful final-year research topic.',
        gradingPoints: [
          { concept: 'reflects on technical skill gaps and gathers feedback from mentors', weight: 0.5, aliases: ['skills gap analysis', 'constructive mentor feedback'] },
          { concept: 'identifies real enterprise inefficiencies to formulate applied research topic', weight: 0.5, aliases: ['translates industry problem into project', 'formulates final year thesis'] },
        ],
      },
    ],
  },

  // Shared 300 Level courses
  { code: 'CSC 305', title: 'Database Management Systems', level: 300, semester: 'harmattan', questions: [] },
  { code: 'CSC 304', title: 'Software Engineering Principles', level: 300, semester: 'rain', questions: [] },
];
