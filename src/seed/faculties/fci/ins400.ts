// src/seed/faculties/fci/ins400.ts
import type { SeedCourse } from '../../types.js';

export const ins400Courses: SeedCourse[] = [
  // 1. INS 401: Project Management
  {
    code: 'INS 401',
    title: 'Project Management',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define a Project and explain the Project Management Triple Constraint (Iron Triangle).',
        options: [],
        correctAnswer: 'A project is a temporary endeavor undertaken to create a unique product, service, or result, characterized by a defined beginning and end. The Triple Constraint (Iron Triangle) dictates that project quality is bound by three interrelated variables: Scope (what will be delivered), Time (schedule and deadlines), and Cost (allocated budget and resources); altering any one constraint inevitably impacts the others.',
        gradingPoints: [
          { concept: 'temporary endeavor creating unique product service or result with defined timeframe', weight: 0.4, aliases: ['project definition', 'temporary unique endeavor'] },
          { concept: 'triple constraint scope time cost tradeoffs affecting quality', weight: 0.6, aliases: ['iron triangle scope time cost', 'scope schedule budget trade-offs'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Critical Path Method (CPM) and describe how to calculate Float/Slack time.',
        options: [],
        correctAnswer: 'The Critical Path Method (CPM) is a project network scheduling technique that determines the longest sequence of dependent activities from project start to finish, defining the shortest possible total project duration. Float or Slack time is the amount of time an activity can be delayed without delaying the project completion date, calculated as: Float = Late Start - Early Start (or Late Finish - Early Finish). Critical path activities have zero float.',
        gradingPoints: [
          { concept: 'longest path of dependent activities determining shortest total project duration', weight: 0.5, aliases: ['cpm longest sequence', 'critical path duration'] },
          { concept: 'float slack is late start minus early start critical path has zero float', weight: 0.5, aliases: ['float calculation formula', 'slack ls minus es zero on critical path'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Work Breakdown Structure (WBS) and what is the 100% Rule in WBS creation?',
        options: [],
        correctAnswer: 'A Work Breakdown Structure (WBS) is a hierarchical decomposition of the total scope of work to be carried out by the project team to accomplish project deliverables. The 100% Rule states that the WBS must capture 100% of the work defined by project scope, including internal project management, and that children elements under any parent node must account for 100% of the parent scope with zero omissions or surplus.',
        gradingPoints: [
          { concept: 'hierarchical decomposition of total project scope into manageable work packages', weight: 0.5, aliases: ['wbs definition', 'hierarchical scope breakdown'] },
          { concept: '100 percent rule encompasses all scope completely with no omissions or extra work', weight: 0.5, aliases: ['100% rule', 'captures all work exactly'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Earned Value Management (EVM) and define Planned Value (PV), Earned Value (EV), and Actual Cost (AC).',
        options: [],
        correctAnswer: 'Earned Value Management (EVM) is a project performance measurement methodology that integrates project scope, schedule, and cost. Planned Value (PV) is the approved budget authorized for scheduled work. Earned Value (EV) is the measure of work actually completed expressed in terms of the authorized budget. Actual Cost (AC) is the total realized expenditure incurred in performing the work.',
        gradingPoints: [
          { concept: 'integrates scope schedule and cost to measure project performance', weight: 0.4, aliases: ['evm methodology', 'cost schedule integration'] },
          { concept: 'pv planned budget ev budgeted cost of work performed ac actual expenditure', weight: 0.6, aliases: ['pv ev ac definitions', 'planned value earned value actual cost'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how Schedule Variance (SV), Cost Variance (CV), SPI, and CPI are calculated in EVM.',
        options: [],
        correctAnswer: 'Variances are calculated as: Schedule Variance (SV) = EV - PV (positive is ahead of schedule; negative is behind). Cost Variance (CV) = EV - AC (positive is under budget; negative is over budget). Performance indices are: Schedule Performance Index (SPI) = EV / PV (SPI > 1 indicates ahead of schedule). Cost Performance Index (CPI) = EV / AC (CPI > 1 indicates cost efficiency under budget).',
        gradingPoints: [
          { concept: 'sv equals ev minus pv cv equals ev minus ac', weight: 0.5, aliases: ['sv and cv formulas', 'schedule variance cost variance formulas'] },
          { concept: 'spi equals ev over pv cpi equals ev over ac interpretation greater than 1 good', weight: 0.5, aliases: ['spi cpi index formulas', 'performance indices interpretation'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the five Project Management Process Groups outlined in the PMBOK Guide.',
        options: [],
        correctAnswer: 'The five PMBOK process groups are: 1. Initiating (defining a new project or phase and authorizing the project charter); 2. Planning (establishing total scope, refining objectives, and mapping out the management plan); 3. Executing (completing the work defined in the project plan); 4. Monitoring & Controlling (tracking, reviewing, and regulating progress against plan baseline); and 5. Closing (finalizing all activities, handing over deliverables, and formally closing the contract).',
        gradingPoints: [
          { concept: 'initiating planning executing monitoring and controlling closing', weight: 0.6, aliases: ['five process groups', 'pmbok process groups'] },
          { concept: 'concise operational description of each process group', weight: 0.4, aliases: ['process group descriptions', 'charter planning execution control closure'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Project Risk Management Plan and what steps comprise the Risk Management Lifecycle?',
        options: [],
        correctAnswer: 'A Risk Management Plan documents how risk identification, analysis, mitigation, and monitoring will be executed on a project. The lifecycle steps are: 1. Risk Identification (discovering potential threats); 2. Qualitative Risk Analysis (prioritizing risks by probability and impact); 3. Quantitative Risk Analysis (numerically evaluating financial impact); 4. Risk Response Planning (formulating avoid, transfer, mitigate, or accept strategies); and 5. Risk Monitoring & Control.',
        gradingPoints: [
          { concept: 'documents how risks will be identified analyzed and controlled', weight: 0.4, aliases: ['risk plan definition', 'managing project uncertainties'] },
          { concept: 'identification qualitative analysis quantitative analysis response planning monitoring', weight: 0.6, aliases: ['risk management steps', 'identify analyze mitigate track'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between the four standard Risk Response Strategies for negative risks: Avoid, Mitigate, Transfer, and Accept.',
        options: [],
        correctAnswer: 'Avoid eliminates the threat entirely by altering project scope or plan. Mitigate reduces the probability or impact of the adverse risk event (e.g., conducting extra automated testing). Transfer shifts the financial impact and ownership of the risk to a third party (e.g., purchasing insurance or hiring specialized subcontractors). Accept acknowledges the risk without action, establishing a contingency reserve.',
        gradingPoints: [
          { concept: 'avoid eliminates threat entirely via plan alteration', weight: 0.25, aliases: ['risk avoidance', 'eliminating risk'] },
          { concept: 'mitigate reduces probability or severity of impact', weight: 0.25, aliases: ['risk mitigation', 'reducing likelihood or impact'] },
          { concept: 'transfer shifts liability ownership to third party insurance subcontractor', weight: 0.25, aliases: ['risk transference', 'outsourcing insurance'] },
          { concept: 'accept acknowledges risk with contingency reserve', weight: 0.25, aliases: ['risk acceptance', 'passive or active acceptance'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Stakeholder Management and the Power/Interest Grid used in stakeholder analysis.',
        options: [],
        correctAnswer: 'Stakeholder management systematically identifies individuals, groups, or organizations affected by the project and manages their expectations and engagement. The Power/Interest Grid maps stakeholders across four quadrants: High Power, High Interest (Manage Closely); High Power, Low Interest (Keep Satisfied); Low Power, High Interest (Keep Informed); and Low Power, Low Interest (Monitor with minimal effort).',
        gradingPoints: [
          { concept: 'identifies and manages engagement and expectations of affected parties', weight: 0.4, aliases: ['stakeholder management', 'managing stakeholder expectations'] },
          { concept: 'power interest grid manage closely keep satisfied keep informed monitor', weight: 0.6, aliases: ['four quadrants', 'high low power interest grid'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Scope Creep and how does a formal Change Control Board (CCB) prevent it?',
        options: [],
        correctAnswer: 'Scope creep is the uncontrolled, undocumented expansion of project scope without corresponding adjustments to time, cost, or resources. A Change Control Board (CCB) prevents it by reviewing, assessing the schedule and budget impact of, and formally approving or rejecting all proposed change requests before any work is authorized.',
        gradingPoints: [
          { concept: 'uncontrolled undocumented expansion of scope without budget schedule adjustment', weight: 0.5, aliases: ['scope creep definition', 'unauthorized feature additions'] },
          { concept: 'ccb evaluates impact and formally approves or rejects change requests', weight: 0.5, aliases: ['change control board role', 'formal change evaluation process'] },
        ],
      },
    ],
  },

  // 2. INS 402: Knowledge Management Systems
  {
    code: 'INS 402',
    title: 'Knowledge Management Systems',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Differentiate between Tacit Knowledge and Explicit Knowledge using concrete examples.',
        options: [],
        correctAnswer: 'Explicit knowledge is formalized, codified, and easily articulated knowledge that can be recorded, stored, and shared in documents, manuals, databases, and code (e.g., an IT user manual or standard operating procedure). Tacit knowledge is personal, experiential, context-specific know-how residing in human minds, intuition, and muscle memory that is difficult to formalize and communicate verbally (e.g., a master negotiator intuition or an expert troubleshooter diagnostic instinct).',
        gradingPoints: [
          { concept: 'explicit codified documentable easily communicated manuals databases', weight: 0.5, aliases: ['explicit formalized knowledge', 'codified documentation'] },
          { concept: 'tacit experiential intuitive residing in minds hard to articulate', weight: 0.5, aliases: ['tacit personal know how', 'intuitive human expertise'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Nonaka and Takeuchi SECI model of Knowledge Creation: Socialization, Externalization, Combination, and Internalization.',
        options: [],
        correctAnswer: 'The SECI model describes how knowledge is created and transformed: Socialization converts tacit knowledge to tacit through shared direct experiences, observation, and mentoring. Externalization translates tacit knowledge into explicit concepts and formal models. Combination integrates discrete pieces of explicit knowledge into systemic knowledge repositories. Internalization embodies explicit knowledge back into individual tacit understanding through learning by doing.',
        gradingPoints: [
          { concept: 'socialization tacit to tacit direct shared experience', weight: 0.25, aliases: ['socialization phase', 'mentoring observation'] },
          { concept: 'externalization tacit to explicit codification modeling', weight: 0.25, aliases: ['externalization phase', 'documenting tacit know how'] },
          { concept: 'combination explicit to explicit synthesizing repositories', weight: 0.25, aliases: ['combination phase', 'organizing explicit knowledge'] },
          { concept: 'internalization explicit to tacit learning by doing practice', weight: 0.25, aliases: ['internalization phase', 'absorbing concepts into intuition'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Knowledge Repository and what architectural components constitute an enterprise KMS?',
        options: [],
        correctAnswer: 'A knowledge repository is an organized online digital library where enterprise intellectual capital is categorized and retrieved. Key architectural components include: Document Management and Indexing engines, Semantic Search and Tagging mechanisms, Knowledge Categorization/Taxonomy schemas, Collaborative Authoring tools (wikis, forums), and Role-Based Access controls.',
        gradingPoints: [
          { concept: 'digital library organizing and retrieving corporate intellectual capital', weight: 0.4, aliases: ['knowledge repository definition', 'intellectual asset store'] },
          { concept: 'document management semantic search taxonomy collaborative authoring rbac', weight: 0.6, aliases: ['kms components', 'search taxonomy indexing authoring'] },
        ],
      },
      {
        type: 'theory',
        question: 'Define Communities of Practice (CoP) and discuss their role in organizational learning.',
        options: [],
        correctAnswer: 'A Community of Practice (CoP) is an informal, self-organized network of professionals who share a common passion, domain, or expertise and collaborate regularly to exchange insights, solve complex problems, and advance collective professional knowledge within or across organizations.',
        gradingPoints: [
          { concept: 'informal network sharing common domain passion and expertise', weight: 0.5, aliases: ['cop definition', 'peer collaboration group'] },
          { concept: 'promotes collective problem solving insight exchange organizational learning', weight: 0.5, aliases: ['fosters organizational learning', 'advances collective practice'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the distinction between Codification and Personalization knowledge management strategies.',
        options: [],
        correctAnswer: 'A Codification strategy focuses on extracting, formalizing, and storing explicit knowledge in centralized digital databases so that anyone can search and reuse it repeatedly (people-to-documents approach). A Personalization strategy focuses on fostering dialogue and sharing tacit knowledge directly between individuals through networks, conferences, and mentorship (person-to-person approach).',
        gradingPoints: [
          { concept: 'codification people to documents electronic database storage reuse', weight: 0.5, aliases: ['codification explicit database focus', 'centralized documentation'] },
          { concept: 'personalization person to person dialogue mentorship network sharing', weight: 0.5, aliases: ['personalization tacit sharing', 'interpersonal networks'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Intellectual Capital and how is it divided into Human, Structural, and Relational Capital?',
        options: [],
        correctAnswer: 'Intellectual capital represents the total intangible intellectual assets and knowledge value of an enterprise. It divides into: Human Capital (skills, competencies, education, and creativity of employees), Structural/Organizational Capital (patents, software, databases, processes, and corporate culture that remain when employees go home), and Relational/Customer Capital (reputation, customer relationships, supplier alliances, and brand loyalty).',
        gradingPoints: [
          { concept: 'intangible knowledge value and intellectual assets of enterprise', weight: 0.4, aliases: ['intellectual capital definition', 'intangible corporate assets'] },
          { concept: 'human individual skills structural processes patents relational external relationships', weight: 0.6, aliases: ['human structural relational capital', 'three capital components'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Expert Systems in Knowledge Engineering and explain the Knowledge Base and Inference Engine.',
        options: [],
        correctAnswer: 'An Expert System is an AI software program that emulates the decision-making ability of human domain experts. The Knowledge Base contains formalized domain facts and heuristic IF-THEN rules acquired from experts. The Inference Engine applies logical deduction (such as Forward Chaining or Backward Chaining) to the knowledge base to derive conclusions or recommendations for user queries.',
        gradingPoints: [
          { concept: 'ai software emulating human expert decision making and problem solving', weight: 0.4, aliases: ['expert system definition', 'rule based expert software'] },
          { concept: 'knowledge base stores domain facts rules inference engine executes logical reasoning', weight: 0.6, aliases: ['knowledge base and inference engine', 'rules facts inference mechanism'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Forward Chaining versus Backward Chaining in rule-based inference engines.',
        options: [],
        correctAnswer: 'Forward Chaining is data-driven reasoning that starts with known facts and applies inference rules iteratively to deduce new facts until a goal condition is reached. Backward Chaining is goal-driven reasoning that starts with a hypothesized goal and works backward to verify whether supporting facts in the knowledge base exist to validate the hypothesis.',
        gradingPoints: [
          { concept: 'forward chaining data driven starts with facts deduces toward goal', weight: 0.5, aliases: ['data driven forward reasoning', 'bottom up fact chaining'] },
          { concept: 'backward chaining goal driven starts with hypothesis works back to facts', weight: 0.5, aliases: ['goal driven backward reasoning', 'top down hypothesis verification'] },
        ],
      },
      {
        type: 'theory',
        question: 'What are the main cultural barriers to Knowledge Sharing in corporate environments and how can management overcome them?',
        options: [],
        correctAnswer: 'Cultural barriers include the "knowledge is power" hoarding mentality, fear of negative evaluation, lack of recognition or time incentives, and a siloed organizational hierarchy. Management can overcome these by cultivating a psychological safety culture, aligning career promotions with collaborative knowledge contributions, establishing formal peer recognition awards, and implementing accessible, user-friendly KMS tools.',
        gradingPoints: [
          { concept: 'knowledge hoarding power mentality fear lack of incentives', weight: 0.5, aliases: ['cultural barriers to sharing', 'hoarding and lack of rewards'] },
          { concept: 'psychological safety reward incentives collaborative culture recognition', weight: 0.5, aliases: ['overcoming sharing barriers', 'recognition and incentives'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Knowledge Graphs and Ontologies in modern semantic knowledge management.',
        options: [],
        correctAnswer: 'Ontologies define formal, machine-readable specifications of conceptual entities, attributes, and relationships within a domain. Knowledge Graphs represent this conceptual network as nodes (entities) and directed edges (semantic relationships, e.g., subject-predicate-object triples), allowing AI systems and semantic search engines to deduce non-obvious relationships and deliver intelligent contextual answers.',
        gradingPoints: [
          { concept: 'ontology formal machine readable specification of domain entities and relationships', weight: 0.5, aliases: ['ontology semantic definition', 'formal domain taxonomy'] },
          { concept: 'knowledge graph network of entity nodes semantic relationship edges triple reasoning', weight: 0.5, aliases: ['knowledge graph triples', 'nodes edges semantic deductions'] },
        ],
      },
    ],
  },

  // 3. INS 403: Data Warehousing & Business Analytics
  {
    code: 'INS 403',
    title: 'Data Warehousing & Business Analytics',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define a Data Warehouse according to W.H. Inmon four defining characteristics: Subject-Oriented, Integrated, Non-Volatile, and Time-Variant.',
        options: [],
        correctAnswer: 'A Data Warehouse is a subject-oriented, integrated, non-volatile, and time-variant collection of data in support of management decision-making. Subject-Oriented organizes data around key enterprise subjects (e.g., sales, customers). Integrated reconciles disparate naming conventions, encoding, and units from heterogeneous sources. Non-Volatile means historical data is never modified or erased; only appended and read. Time-Variant retains historical timelines over years for trend analytics.',
        gradingPoints: [
          { concept: 'subject oriented focused around core enterprise subjects not applications', weight: 0.25, aliases: ['subject oriented', 'organized by business subjects'] },
          { concept: 'integrated standardized consistent formatting across heterogeneous sources', weight: 0.25, aliases: ['integrated standardization', 'unifies disparate data'] },
          { concept: 'non volatile historical records persisted without updates or deletions', weight: 0.25, aliases: ['non volatile append only', 'read only historical store'] },
          { concept: 'time variant captures chronological historical series over extended periods', weight: 0.25, aliases: ['time variant historical', 'trend tracking across time'] },
        ],
      },
      {
        type: 'theory',
        question: 'Compare Bill Inmon Top-Down Data Warehouse Architecture with Ralph Kimball Bottom-Up Architecture.',
        options: [],
        correctAnswer: 'Inmon top-down approach builds a centralized, normalized Enterprise Data Warehouse (EDW) in 3NF first, from which dependent departmental data marts are subsequently created (high initial cost, long timeline, single source of truth). Kimball bottom-up approach builds dimensional, denormalized data marts using conformed dimensions first, which collectively assemble into an enterprise data warehouse bus (fast initial ROI, iterative, highly query-optimized).',
        gradingPoints: [
          { concept: 'inmon top down centralized normalized 3nf edw first then dependent marts', weight: 0.5, aliases: ['inmon enterprise warehouse', 'normalized top down 3nf'] },
          { concept: 'kimball bottom up dimensional denormalized data marts with conformed dimensions', weight: 0.5, aliases: ['kimball bottom up dimensional', 'conformed dimensions bus architecture'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the three phases of the ETL (Extract, Transform, Load) pipeline in detail.',
        options: [],
        correctAnswer: 'Extract retrieves data from multiple heterogeneous source systems (relational databases, ERP, flat files, APIs) using change data capture. Transform cleans, deduplicates, validates, maps schemas, harmonizes formats, and aggregates records into standard business definitions. Load inserts the cleaned dimensional records into target data warehouse fact and dimension tables efficiently.',
        gradingPoints: [
          { concept: 'extract retrieves data from heterogeneous sources via cdc', weight: 0.35, aliases: ['extraction phase', 'data capture from sources'] },
          { concept: 'transform cleans deduplicates harmonizes aggregates data to business rules', weight: 0.35, aliases: ['transformation phase', 'cleansing formatting mapping'] },
          { concept: 'load inserts dimensional records into target warehouse tables efficiently', weight: 0.3, aliases: ['loading phase', 'bulk insertion into warehouse'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between ETL and ELT architectures in modern cloud data warehousing.',
        options: [],
        correctAnswer: 'In ETL, data transformations occur in a dedicated staging server engine before loading the transformed data into the data warehouse (ideal for legacy on-premise systems with limited compute). In ELT, raw data is loaded immediately into high-performance cloud data warehouses (e.g., Snowflake, BigQuery) where transformation occurs natively using the warehouse massively parallel processing (MPP) compute clusters.',
        gradingPoints: [
          { concept: 'etl transforms on separate staging engine before loading into target warehouse', weight: 0.5, aliases: ['etl pre transformation', 'staging server transformation'] },
          { concept: 'elt loads raw data directly transforming natively inside cloud mpp warehouse', weight: 0.5, aliases: ['elt cloud warehouse native', 'loads first transforms with mpp'] },
        ],
      },
      {
        type: 'theory',
        question: 'Define Fact Tables and Dimension Tables, explaining their roles in Dimensional Modeling.',
        options: [],
        correctAnswer: 'Fact tables contain numerical measurements, metrics, and quantitative facts resulting from a business event (e.g., sales revenue, quantity sold), along with foreign keys referencing dimensions. Dimension tables contain contextual, descriptive attributes (who, what, where, when, why, e.g., customer name, product category, store location) that provide context for filtering and grouping facts.',
        gradingPoints: [
          { concept: 'fact tables store numerical quantitative measurements metrics and foreign keys', weight: 0.5, aliases: ['fact table numerical measures', 'metrics and foreign keys'] },
          { concept: 'dimension tables store descriptive context attributes for filtering grouping', weight: 0.5, aliases: ['dimension table contextual attributes', 'descriptive qualifiers'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Slowly Changing Dimensions (SCD) and contrast Type 1, Type 2, and Type 3 SCD techniques.',
        options: [],
        correctAnswer: 'Slowly Changing Dimensions (SCD) manage historical changes to dimension attributes over time. Type 1 overwrites old data with new values (no historical tracking). Type 2 creates a new record for every attribute change with surrogate keys and active date flags (maintains complete historical audit trail). Type 3 adds a "previous attribute" column to the existing record to track only the immediate prior value.',
        gradingPoints: [
          { concept: 'scd manages changes in dimension attributes over historical time', weight: 0.4, aliases: ['scd definition', 'handling changing dimension records'] },
          { concept: 'type 1 overwrites type 2 adds new row with date flags type 3 adds previous column', weight: 0.6, aliases: ['type 1 2 3 differences', 'overwrite vs new row vs prior column'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Surrogate Key and why is it preferred over a Natural Business Key in dimension tables?',
        options: [],
        correctAnswer: 'A Surrogate Key is an artificial, system-generated sequential integer key created solely for the data warehouse. It is preferred over natural business keys because it isolates the data warehouse from operational source schema key changes, provides superior query join performance via simple integers, and enables tracking historical attribute changes in SCD Type 2 tables.',
        gradingPoints: [
          { concept: 'artificial system generated integer key unique to warehouse', weight: 0.4, aliases: ['surrogate key definition', 'synthetic artificial key'] },
          { concept: 'insulates from operational key changes speeds joins enables scd type 2 tracking', weight: 0.6, aliases: ['reasons for surrogate keys', 'join efficiency and historical tracking'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the distinction between MOLAP (Multidimensional OLAP) and ROLAP (Relational OLAP).',
        options: [],
        correctAnswer: 'MOLAP stores data in pre-aggregated, proprietary multidimensional array cubes (e.g., Microsoft SSAS), delivering lightning-fast query response at the expense of storage size and prolonged initial cube build times. ROLAP stores data directly in relational tables and dynamically generates complex SQL queries against star schemas, supporting massive scalability and real-time updates at slightly slower query speeds.',
        gradingPoints: [
          { concept: 'molap pre aggregated multidimensional array cubes fast queries build latency', weight: 0.5, aliases: ['molap pre computed cubes', 'multidimensional array storage'] },
          { concept: 'rolap relational tables dynamic sql generation scalable larger datasets', weight: 0.5, aliases: ['rolap relational star schemas', 'dynamic sql queries against tables'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Data Marts and differentiate between Independent and Dependent Data Marts.',
        options: [],
        correctAnswer: 'A Data Mart is a subset of an enterprise data warehouse tailored to meet the specific analytical needs of a single business department (e.g., Marketing, Finance). A Dependent Data Mart is fed directly from a central Enterprise Data Warehouse, ensuring high data consistency. An Independent Data Mart extracts data directly from operational source systems without an EDW, frequently leading to isolated data silos.',
        gradingPoints: [
          { concept: 'department specific subset of warehouse analytics', weight: 0.4, aliases: ['data mart definition', 'departmental analytics store'] },
          { concept: 'dependent fed from centralized edw consistent independent extracts directly creates silos', weight: 0.6, aliases: ['dependent vs independent data marts', 'edw fed vs source fed silos'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Data Quality profiling metrics used during data warehouse ingestion.',
        options: [],
        correctAnswer: 'Data profiling assesses data quality across six standard dimensions: Completeness (percentage of non-null and non-missing values), Uniqueness (absence of duplicated records), Accuracy (conformity of values to verified real-world facts), Consistency (identical values across multiple data sources), Validity (adherence to required formats and ranges), and Timeliness (data freshness and latency).',
        gradingPoints: [
          { concept: 'systematic assessment of data against quality dimensions during ingestion', weight: 0.4, aliases: ['data quality profiling', 'data validation checks'] },
          { concept: 'completeness uniqueness accuracy consistency validity timeliness', weight: 0.6, aliases: ['six quality dimensions', 'quality metrics completeness accuracy consistency'] },
        ],
      },
    ],
  },

  // 4. INS 404: Global Information Technology Management
  {
    code: 'INS 404',
    title: 'Global Information Technology Management',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain the unique challenges organizations encounter when managing IT infrastructure across international borders.',
        options: [],
        correctAnswer: 'Global IT management faces diverse challenges: cross-border data sovereignty and regulatory compliance variations (e.g., GDPR, CCPA), telecommunications infrastructure disparities between developing and developed nations, cultural and linguistic diversity impacting user interface adoption, currency exchange fluctuations affecting IT procurement, and coordinating around-the-clock 24/7 technical operations across disparate time zones.',
        gradingPoints: [
          { concept: 'data sovereignty and divergent international regulatory frameworks', weight: 0.35, aliases: ['cross border data compliance', 'sovereignty regulations'] },
          { concept: 'infrastructure disparities bandwidth reliability differences', weight: 0.35, aliases: ['telecom disparities', 'developing vs developed infrastructure'] },
          { concept: 'cultural linguistic time zone and currency operational complexities', weight: 0.3, aliases: ['cultural and timezone barriers', 'multilingual multi currency operations'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Multinational, Global, International, and Transnational enterprise strategies in global IT governance.',
        options: [],
        correctAnswer: 'Multinational firms decentralize operations and give foreign subsidiaries total autonomy to build local IT systems. Global firms centralize all operations and IT systems at domestic headquarters with standardized global rollouts. International firms transfer core domestic innovations to foreign subsidiaries while maintaining central financial control. Transnational firms integrate global coordination with local responsiveness, optimizing resources and sharing innovations across an interdependent networked global architecture.',
        gradingPoints: [
          { concept: 'multinational decentralized independent subsidiary it systems', weight: 0.25, aliases: ['multinational decentralized', 'autonomous foreign units'] },
          { concept: 'global centralized headquarters control standardized rollout', weight: 0.25, aliases: ['global centralized', 'headquarters dominated systems'] },
          { concept: 'international core domestic innovations transferred with central oversight', weight: 0.25, aliases: ['international strategy', 'transfer of parent competencies'] },
          { concept: 'transnational networked interdependent coordination with local responsiveness', weight: 0.25, aliases: ['transnational networked', 'global efficiency local adaptability'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Data Sovereignty and how does it restrict trans-border data flows in multinational corporations?',
        options: [],
        correctAnswer: 'Data Sovereignty is the legal principle that digital data is subject to the laws and governance of the geographic nation where it is collected or processed. It restricts trans-border data flows by legally forbidding the transfer of citizen personal, health, or financial records outside national borders without strict localized data center residency or adequate reciprocal legal safeguards.',
        gradingPoints: [
          { concept: 'data subject to laws and jurisdiction of collection country', weight: 0.5, aliases: ['data sovereignty definition', 'jurisdictional data laws'] },
          { concept: 'mandates localized residency restricts cross border transfer of citizen records', weight: 0.5, aliases: ['local data residency mandates', 'limits transborder flows'] },
        ],
      },
      {
        type: 'theory',
        question: 'Discuss Offshore IT Outsourcing versus Nearshore IT Outsourcing, highlighting cost and cultural differences.',
        options: [],
        correctAnswer: 'Offshore outsourcing contracts IT development to distant countries (e.g., Nigeria hiring engineers in India) to maximize labor cost arbitrage, but contends with wide time zone gaps, communication latency, and cultural misalignment. Nearshore outsourcing delegates work to geographically adjacent nations sharing similar time zones and cultural affinities (e.g., US hiring in Canada or Mexico), providing superior real-time collaboration at moderately higher labor costs.',
        gradingPoints: [
          { concept: 'offshore distant countries maximum labor cost savings timezone latency', weight: 0.5, aliases: ['offshore labor arbitrage', 'distant outsourcing cost benefits'] },
          { concept: 'nearshore adjacent countries aligned timezones easier collaboration moderate cost', weight: 0.5, aliases: ['nearshore adjacent proximity', 'similar timezones cultural alignment'] },
        ],
      },
      {
        type: 'theory',
        question: 'How do cultural dimensions, such as Hofstede Cultural Dimensions, impact the global design of information systems?',
        options: [],
        correctAnswer: 'Hofstede dimensions (Power Distance, Individualism vs Collectivism, Uncertainty Avoidance, Masculinity, Long-Term Orientation) affect user expectations. High Power Distance cultures require strict hierarchical authorization workflows in software. High Uncertainty Avoidance requires detailed error explanations and formal help documentation. Collectivist cultures favor collaborative team workspaces, while individualist cultures prioritize personal dashboards and recognition.',
        gradingPoints: [
          { concept: 'hofstede dimensions influence user expectations and interface paradigms', weight: 0.4, aliases: ['hofstede framework application', 'cultural dimensions in ui'] },
          { concept: 'power distance hierarchy uncertainty avoidance documentation collectivism collaboration', weight: 0.6, aliases: ['concrete cultural adaptations', 'hierarchical vs collaborative systems'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a "Follow-the-Sun" global software development and support model?',
        options: [],
        correctAnswer: 'A Follow-the-Sun model is a 24-hour continuous operational framework where software engineering work or customer support handoffs follow the sun across three global time zones (e.g., Americas, EMEA, Asia-Pacific). Work completed at the end of the business day in one continent is handed over to the next continent where the day is beginning, accelerating development speed and delivering continuous 24/7 service without night shifts.',
        gradingPoints: [
          { concept: '24 hour continuous operations across rotating global time zones', weight: 0.5, aliases: ['follow the sun model', 'round the clock global handoffs'] },
          { concept: 'handoffs between americas emea apac accelerates cycle times eliminates night shifts', weight: 0.5, aliases: ['continuous development cycle', 'regional shift handoffs'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe standard cybersecurity considerations when architecting Global Wide Area Networks (SD-WAN).',
        options: [],
        correctAnswer: 'SD-WAN allows global enterprises to route traffic dynamically across diverse connections (MPLS, broadband internet, 5G). Key security considerations include enforcing end-to-end IPsec tunnel encryption across public backbones, deploying centralized Zero Trust network access (ZTNA) policies, inspecting encrypted traffic using Cloud-delivered Secure Access Service Edge (SASE) firewalls, and establishing localized DDoS mitigation scrubbing centers.',
        gradingPoints: [
          { concept: 'dynamic multi transport routing across mpls internet 5g', weight: 0.4, aliases: ['sd wan architecture', 'global wan routing'] },
          { concept: 'ipsec encryption sase cloud firewalls zero trust ztna ddos scrubbing', weight: 0.6, aliases: ['sd wan security controls', 'sase zero trust and encryption'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Intellectual Property (IP) protection and software piracy risks in developing global software markets.',
        options: [],
        correctAnswer: 'Software companies operating globally face varying national enforcement of copyright, patent, and trademark protections. Weak legal enforcement and rampant software piracy result in revenue losses and reverse-engineering of proprietary algorithms. Companies mitigate these risks using Cloud SaaS licensing models, code obfuscation, cryptographic hardware security modules, and international arbitration treaties (e.g., WIPO).',
        gradingPoints: [
          { concept: 'uneven legal enforcement of copyrights patents leading to revenue theft', weight: 0.5, aliases: ['ip theft risks', 'global software piracy'] },
          { concept: 'mitigations cloud saas delivery code obfuscation wipo treaties', weight: 0.5, aliases: ['ip protection countermeasures', 'saas model anti piracy obfuscation'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Green IT and why has environmental sustainability become a key priority in global data center management?',
        options: [],
        correctAnswer: 'Green IT refers to the environmentally sustainable manufacture, operation, and disposal of computing hardware and data centers. It has become a global priority due to massive data center electrical consumption and carbon emissions, water consumption in server cooling, electronic waste accumulation, and government environmental regulations mandating low Power Usage Effectiveness (PUE) metrics.',
        gradingPoints: [
          { concept: 'sustainable design operation and disposal of it assets and data centers', weight: 0.5, aliases: ['green it definition', 'sustainable computing practices'] },
          { concept: 'carbon emissions electrical power consumption e waste pue regulations', weight: 0.5, aliases: ['power usage effectiveness pue', 'reducing carbon footprint and e waste'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Internationalization (i18n) versus Localization (l10n) in global software engineering.',
        options: [],
        correctAnswer: 'Internationalization (i18n) is the foundational engineering practice of designing software architecture so it can adapt to various languages, character encodings (UTF-8), date formats, and currencies without source code modifications. Localization (l10n) is the subsequent process of adapting the internationalized software for a specific locale by translating text, tailoring graphics, and honoring local legal and cultural conventions.',
        gradingPoints: [
          { concept: 'i18n designing architecture to support multiple languages locales without code changes', weight: 0.5, aliases: ['internationalization definition', 'utf 8 architectural enablement'] },
          { concept: 'l10n adapting software for specific target region translating text date currency', weight: 0.5, aliases: ['localization definition', 'regional translation and adaptation'] },
        ],
      },
    ],
  },

  // 5. INS 405: Information Systems Management
  {
    code: 'INS 405',
    title: 'Information Systems Management',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the Strategic Alignment Model (SAM) by Henderson and Venkatraman and its four strategic domains.',
        options: [],
        correctAnswer: 'The Strategic Alignment Model (SAM) articulates how business performance depends on harmonious alignment between business strategy and IT strategy. Its four domains are: 1. Business Strategy (scope, competencies, governance); 2. IT Strategy (technology scope, systemic competencies, IT governance); 3. Organizational Infrastructure & Processes (administrative structure, processes, skills); and 4. IT Infrastructure & Processes (architecture, applications, IT skills).',
        gradingPoints: [
          { concept: 'harmonious alignment between business strategy and it strategy drives performance', weight: 0.4, aliases: ['sam model definition', 'strategic alignment framework'] },
          { concept: 'business strategy it strategy organizational infrastructure it infrastructure', weight: 0.6, aliases: ['four domains', 'business and it strategy and infrastructure'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the ITIL (Information Technology Infrastructure Library) framework and its Service Value System (SVS).',
        options: [],
        correctAnswer: 'ITIL is a globally accepted framework of best practices for delivering and managing IT services (ITSM). Its Service Value System (SVS) illustrates how all components and activities of an organization work together to facilitate value creation through IT services, driven by Opportunity/Demand and guided by Principles, Governance, Service Value Chain, Practices, and Continual Improvement.',
        gradingPoints: [
          { concept: 'best practice framework for it service management itsm', weight: 0.4, aliases: ['itil definition', 'service management framework'] },
          { concept: 'svs value creation guided by principles governance service value chain continual improvement', weight: 0.6, aliases: ['itil svs components', 'service value system elements'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Incident Management and Problem Management in IT service operations.',
        options: [],
        correctAnswer: 'Incident Management focuses on rapidly restoring normal service operation and minimizing business disruption following an unexpected interruption (tactical, immediate fix or workaround). Problem Management focuses on identifying and analyzing the underlying root causes of recurring incidents to permanently eliminate them or prevent future occurrence (strategic, proactive root-cause analysis).',
        gradingPoints: [
          { concept: 'incident management rapid restoration of service minimize disruption tactical', weight: 0.5, aliases: ['incident management restoration', 'rapid workaround service restoration'] },
          { concept: 'problem management identifies root causes permanently prevents recurring faults', weight: 0.5, aliases: ['problem management root cause', 'rca and permanent defect elimination'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Total Cost of Ownership (TCO) and break down Direct versus Indirect costs in enterprise IT.',
        options: [],
        correctAnswer: 'Total Cost of Ownership (TCO) is a comprehensive financial assessment of all costs associated with purchasing, deploying, operating, and decommissioning an IT asset over its lifespan. Direct costs are easily budgeted expenses (hardware purchases, software licenses, network bandwidth, technician salaries). Indirect costs are hidden, unbudgeted productivity losses (end-user downtime, self-support peer training, informal troubleshooting delays).',
        gradingPoints: [
          { concept: 'comprehensive financial metric assessing lifetime cost of it assets', weight: 0.4, aliases: ['tco definition', 'full asset lifecycle costing'] },
          { concept: 'direct budgeted hardware software salaries indirect unbudgeted downtime self support', weight: 0.6, aliases: ['direct vs indirect costs', 'visible vs hidden productivity costs'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is IT Governance and what is the role of an IT Steering Committee?',
        options: [],
        correctAnswer: 'IT Governance is the framework of structures, policies, and processes that ensures enterprise IT investments effectively support and sustain business strategy while managing risk. An IT Steering Committee consists of executive business leaders and IT management who collectively prioritize major IT project proposals, allocate capital budgets, resolve resource conflicts, and monitor ongoing program alignment.',
        gradingPoints: [
          { concept: 'framework ensuring it investments sustain strategy and manage risk', weight: 0.5, aliases: ['it governance definition', 'aligning it with corporate goals'] },
          { concept: 'steering committee executive leaders prioritizing projects budgets and strategic oversight', weight: 0.5, aliases: ['steering committee role', 'executive project prioritization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Business Continuity Planning (BCP) and how a Business Impact Analysis (BIA) informs it.',
        options: [],
        correctAnswer: 'A Business Continuity Plan (BCP) creates protocols to ensure critical business functions continue operating during and immediately after a catastrophic event. A Business Impact Analysis (BIA) informs BCP by identifying critical operational functions, quantifying the financial and operational losses incurred if they fail over time, and establishing required RTO and RPO benchmarks.',
        gradingPoints: [
          { concept: 'bcp ensures ongoing operation of critical business functions during disasters', weight: 0.5, aliases: ['continuity planning definition', 'resilience and emergency continuity'] },
          { concept: 'bia identifies critical processes quantifies downtime losses establishes rto rpo', weight: 0.5, aliases: ['bia role in bcp', 'business impact analysis benchmarks'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role and ethical responsibilities of the Chief Information Officer (CIO) in modern enterprises.',
        options: [],
        correctAnswer: 'The CIO is the executive leader responsible for aligning technology strategy with corporate objectives, directing IT investments, and driving digital transformation. Ethical responsibilities include safeguarding customer and employee data privacy, upholding cybersecurity defenses against negligence, preventing algorithmic discrimination in automated systems, and ensuring transparent financial reporting on IT spending.',
        gradingPoints: [
          { concept: 'executive aligning technology strategy with corporate objectives driving transformation', weight: 0.5, aliases: ['cio role definition', 'executive technology leadership'] },
          { concept: 'ethical duties privacy protection cybersecurity vigilance transparent stewardship', weight: 0.5, aliases: ['cio ethical responsibilities', 'data privacy and security ethics'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Enterprise Architecture (EA) and what four architectural views define the TOGAF framework?',
        options: [],
        correctAnswer: 'Enterprise Architecture (EA) is a strategic conceptual blueprint that aligns business structure, information flows, and technology infrastructure. The Open Group Architecture Framework (TOGAF) defines four core views: Business Architecture (business strategy, processes, roles), Data/Information Architecture (data structures, models, assets), Application Architecture (software systems and their interactions), and Technology Architecture (hardware, networks, platforms).',
        gradingPoints: [
          { concept: 'strategic blueprint aligning business structure processes and technology assets', weight: 0.4, aliases: ['ea definition', 'enterprise architecture blueprint'] },
          { concept: 'business data application technology architecture views togaf', weight: 0.6, aliases: ['four togaf views', 'bdat architecture domains'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Change Management and the Change Advisory Board (CAB) in ITIL service management.',
        options: [],
        correctAnswer: 'Change Management ensures standardized methods and procedures are used for efficient handling of all IT infrastructure changes to minimize disruptions. A Change Advisory Board (CAB) is a cross-functional body of technical and business stakeholders that meets regularly to evaluate proposed changes for technical risk, business impact, rollback readiness, and scheduling approval.',
        gradingPoints: [
          { concept: 'standardized protocol to implement it changes safely minimizing downtime', weight: 0.5, aliases: ['change management process', 'minimizing change disruptions'] },
          { concept: 'cab cross functional board evaluating technical risk impact and scheduling approval', weight: 0.5, aliases: ['change advisory board role', 'approving changes rollback plans'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cloud Governance and Cloud Cost Management (FinOps) in modern IT operations.',
        options: [],
        correctAnswer: 'Cloud Governance establishes policies, security guardrails, and compliance standards for consuming public cloud resources across an enterprise. FinOps (Cloud Financial Operations) is a collaborative cultural practice that brings financial accountability to variable cloud spend, using monitoring, rightsizing unused virtual machines, reserved instances, and automated budget alerts to optimize cloud ROI.',
        gradingPoints: [
          { concept: 'policies security guardrails and compliance rules for cloud adoption', weight: 0.5, aliases: ['cloud governance definition', 'cloud compliance policies'] },
          { concept: 'finops brings financial accountability rightsizing cost optimization alerts', weight: 0.5, aliases: ['finops cost management', 'cloud expenditure optimization'] },
        ],
      },
    ],
  },

  // 6. INS 407: IT Project Management
  {
    code: 'INS 407',
    title: 'IT Project Management',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Differentiate between traditional Predictive (Waterfall) and Adaptive (Scrum/Agile) project management in software development.',
        options: [],
        correctAnswer: 'Predictive (Waterfall) project management establishes exhaustive scope, schedule, and cost baselines upfront before execution; changes are discouraged and managed through formal change boards. Adaptive (Scrum/Agile) project management embraces changing requirements, working in short timeboxed iterations (sprints) to deliver functional increments with continuous stakeholder collaboration.',
        gradingPoints: [
          { concept: 'predictive upfront planning rigid baselines formal change control', weight: 0.5, aliases: ['waterfall predictive model', 'exhaustive upfront planning'] },
          { concept: 'adaptive iterative sprints flexible scope continuous customer feedback', weight: 0.5, aliases: ['agile scrum adaptive', 'sprint based iterative delivery'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Scrum Framework: Product Owner, Scrum Master, and Developers, along with Scrum Artifacts.',
        options: [],
        correctAnswer: 'In Scrum, the Product Owner maximizes value and manages the Product Backlog. The Scrum Master coaches the team, facilitates ceremonies, and eliminates impediments. The Developers cross-functionally build the product increment. Core artifacts are: Product Backlog (prioritized list of features), Sprint Backlog (selected backlog items for current sprint), and Increment (usable, tested product increment meeting the Definition of Done).',
        gradingPoints: [
          { concept: 'product owner scrum master developers roles', weight: 0.5, aliases: ['three scrum roles', 'roles in scrum'] },
          { concept: 'product backlog sprint backlog increment artifacts definition of done', weight: 0.5, aliases: ['three scrum artifacts', 'backlogs and increment'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the four Scrum Ceremonies: Sprint Planning, Daily Standup, Sprint Review, and Sprint Retrospective.',
        options: [],
        correctAnswer: 'Sprint Planning establishes what can be delivered in the sprint and how work will be achieved. Daily Standup is a 15-minute sync where developers report yesterday work, today goals, and roadblocks. Sprint Review inspects the completed increment with stakeholders for feedback. Sprint Retrospective allows the internal team to inspect their process and identify continuous improvements for subsequent sprints.',
        gradingPoints: [
          { concept: 'sprint planning sets sprint goal and task plan', weight: 0.25, aliases: ['sprint planning ceremony', 'goal and backlog selection'] },
          { concept: 'daily standup 15 minute daily status and impediment sync', weight: 0.25, aliases: ['daily scrum standup', 'daily sync meeting'] },
          { concept: 'sprint review demonstrates completed increment to stakeholders', weight: 0.25, aliases: ['sprint review ceremony', 'product demo review'] },
          { concept: 'sprint retrospective team process reflection and continuous improvement', weight: 0.25, aliases: ['retrospective ceremony', 'internal process improvements'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain how User Stories are authored in Agile using the standard template and INVEST criteria.',
        options: [],
        correctAnswer: 'User Stories follow the template: "As a <role>, I want <capability>, so that <benefit>". The INVEST criteria mandates that good user stories must be: Independent (can be worked in any sequence), Negotiable (details open to discussion), Valuable (delivers clear business value), Estimable (team can estimate effort), Small (fits within a single sprint), and Testable (contains clear acceptance criteria).',
        gradingPoints: [
          { concept: 'as a role i want capability so that benefit template', weight: 0.4, aliases: ['user story template', 'role capability benefit format'] },
          { concept: 'independent negotiable valuable estimable small testable invest criteria', weight: 0.6, aliases: ['invest criteria', 'invest principles'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Gantt Chart and how does it illustrate project timelines and task dependencies?',
        options: [],
        correctAnswer: 'A Gantt Chart is a horizontal bar chart used in project management that graphically displays a project schedule against a calendar timeline. Each bar represents a work task, with its position and length depicting start date, duration, and completion date. Directed lines connecting bars depict task dependencies (Finish-to-Start, Start-to-Start), and diamonds represent key project milestones.',
        gradingPoints: [
          { concept: 'horizontal bar chart displaying schedule tasks against calendar timeline', weight: 0.5, aliases: ['gantt chart definition', 'visual project schedule chart'] },
          { concept: 'bar length shows duration dependency arrows show task links milestone diamonds', weight: 0.5, aliases: ['dependencies milestones durations', 'visual task sequencing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Function Point Analysis (FPA) and COCOMO in software project estimation.',
        options: [],
        correctAnswer: 'Function Point Analysis (FPA) measures the functional size of software from a user perspective based on logical components (external inputs, outputs, inquiries, internal files, external interfaces). COCOMO (Constructive Cost Model) is an algorithmic estimation model that uses lines of code (KLOC) or function points and project complexity parameters to estimate required person-months and project duration.',
        gradingPoints: [
          { concept: 'fpa functional sizing based on inputs outputs inquiries logical files', weight: 0.5, aliases: ['function point analysis', 'functional sizing metrics'] },
          { concept: 'cocomo algorithmic model calculating person months and duration from size', weight: 0.5, aliases: ['constructive cost model', 'cocomo estimation equations'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Project Charter and what essential authority does it confer upon the Project Manager?',
        options: [],
        correctAnswer: 'A Project Charter is a formal document issued by project sponsors that officially authorizes the existence of a project. It outlines project purpose, high-level objectives, key milestones, approved budget, and initial assumptions, while granting the project manager formal authority to apply enterprise resources to project activities.',
        gradingPoints: [
          { concept: 'formal sponsor document officially authorizing project existence', weight: 0.5, aliases: ['project charter definition', 'official authorization document'] },
          { concept: 'confers authority on project manager to expend organizational resources', weight: 0.5, aliases: ['empowers project manager', 'authority over enterprise resources'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Risk Probability and Impact Matrix (P×I Matrix) and how it prioritizes project risks.',
        options: [],
        correctAnswer: 'The Probability and Impact Matrix evaluates each identified risk by multiplying its estimated likelihood of occurrence (e.g., scale 1-5) by its potential severity of consequence (scale 1-5) to produce a composite Risk Score (Risk Score = Probability × Impact). Risks with scores above designated thresholds are classified as High Priority (Red), requiring active mitigation and contingency planning.',
        gradingPoints: [
          { concept: 'composite score calculated as probability multiplied by impact severity', weight: 0.5, aliases: ['p times i calculation', 'risk scoring matrix'] },
          { concept: 'prioritizes high score risks for active mitigation and contingency allocation', weight: 0.5, aliases: ['risk prioritization ranking', 'categorizes into high medium low tiers'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the concept of Velocity and Burndown Charts in Agile project tracking.',
        options: [],
        correctAnswer: 'Velocity is a measure of the amount of work (in story points) an Agile development team successfully completes during a standard sprint, used for future capacity forecasting. A Burndown Chart is a visual graph showing remaining work against time across a sprint or release; a line sloping steadily downward toward zero indicates on-track progress.',
        gradingPoints: [
          { concept: 'velocity completed story points per sprint measuring team throughput', weight: 0.5, aliases: ['agile velocity metric', 'story points completed per sprint'] },
          { concept: 'burndown chart tracks remaining work against timeline sloping down to zero', weight: 0.5, aliases: ['sprint burndown chart', 'visual remaining effort graph'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Project Post-Mortem / Lessons Learned review and why is it vital for organizational project maturity?',
        options: [],
        correctAnswer: 'A post-mortem review is a reflective meeting held at project closure where the team evaluates what went well, what failed, and what unexpected challenges arose. Documenting these findings in a centralized Lessons Learned repository enhances organizational project maturity by preventing future teams from repeating costly mistakes and institutionalizing best practices.',
        gradingPoints: [
          { concept: 'closure meeting analyzing successes failures and unexpected project hurdles', weight: 0.5, aliases: ['post mortem review', 'lessons learned closure meeting'] },
          { concept: 'institutionalizes best practices and prevents repeating past mistakes', weight: 0.5, aliases: ['organizational project maturity', 'repository of past project insights'] },
        ],
      },
    ],
  },

  // 7. INS 409: Information Systems Innovation & Strategy
  {
    code: 'INS 409',
    title: 'IS Innovation & Strategic Value',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain Clayton Christensen Theory of Disruptive Innovation and how digital technologies drive market disruption.',
        options: [],
        correctAnswer: 'Disruptive Innovation describes a process whereby a smaller company with fewer resources successfully challenges established incumbent businesses. Disruptors enter at the bottom of the market with simpler, cheaper, or more accessible innovations (often powered by digital platforms) that incumbents overlook, gradually improving performance until they capture mainstream customers and displace incumbent leaders.',
        gradingPoints: [
          { concept: 'simpler cheaper accessible innovations entering bottom of market', weight: 0.5, aliases: ['disruptive innovation concept', 'low end foothold innovation'] },
          { concept: 'gradually improves to capture mainstream displacing complacent incumbents', weight: 0.5, aliases: ['displaces market incumbents', 'moves upmarket to mainstream'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the Resource-Based View (RBV) of the firm and the VRIO framework in establishing sustainable competitive advantage.',
        options: [],
        correctAnswer: 'The Resource-Based View (RBV) posits that a firm competitive advantage stems from its unique internal resources and capabilities. The VRIO framework evaluates whether a resource provides sustainable competitive advantage: Valuable (exploits opportunities/neutralizes threats), Rare (controlled by few competitors), Inimitable (costly or difficult to duplicate), and Organized (company structured to capture value).',
        gradingPoints: [
          { concept: 'competitive advantage derived from unique internal resources and capabilities', weight: 0.4, aliases: ['rbv framework definition', 'internal firm resources'] },
          { concept: 'valuable rare inimitable organized vrio criteria', weight: 0.6, aliases: ['vrio components', 'valuable rare costly to imitate organized'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Blue Ocean Strategy versus Red Ocean Strategy in digital product innovation.',
        options: [],
        correctAnswer: 'Red Ocean Strategy competes in existing, crowded industry space by fighting rivals for market share, often through price wars and incremental feature benchmarking. Blue Ocean Strategy creates uncontested market space, making competition irrelevant by inventing new value propositions and unlocking new customer demand through value innovation (e.g., Uber reinventing urban transit, Netflix streaming).',
        gradingPoints: [
          { concept: 'red ocean crowded existing market fighting rivals incremental competition', weight: 0.5, aliases: ['red ocean market space', 'competing in existing industry'] },
          { concept: 'blue ocean creates uncontested market space making competition irrelevant', weight: 0.5, aliases: ['blue ocean uncontested space', 'value innovation new demand'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Platform Economics and how do Two-Sided Market platforms leverage indirect network effects?',
        options: [],
        correctAnswer: 'Platform Economics describes business models where value is created by facilitating interactions and exchanges between external producers and consumers rather than owning physical production assets. Two-sided platforms (e.g., App Store, Airbnb) leverage indirect network effects where growth in one participant group (e.g., app developers or hosts) directly enhances the attractiveness and value of the platform for the complementary group (consumers).',
        gradingPoints: [
          { concept: 'facilitates exchanges between external producers and consumers without owning assets', weight: 0.5, aliases: ['platform business model', 'intermediation between ecosystem actors'] },
          { concept: 'indirect network effects growth on one side attracts participants to other side', weight: 0.5, aliases: ['two sided market network effects', 'cross side network externalities'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Technology Acceptance Model (TAM) and its two primary cognitive determinants: PEOU and PU.',
        options: [],
        correctAnswer: 'The Technology Acceptance Model (TAM) models how users come to accept and use a technology. Its two core cognitive determinants are Perceived Usefulness (PU: the degree to which a user believes that using the system will enhance their job performance) and Perceived Ease of Use (PEOU: the degree to which a user believes using the system will be free of effort). PEOU directly influences PU, and both shape user attitude and behavioral intention.',
        gradingPoints: [
          { concept: 'perceived usefulness pu enhances job performance', weight: 0.4, aliases: ['pu definition', 'believed performance enhancement'] },
          { concept: 'perceived ease of use peou effort free interaction', weight: 0.4, aliases: ['peou definition', 'believed freedom from effort'] },
          { concept: 'peou and pu shape user attitude and behavioral intention to adopt', weight: 0.2, aliases: ['determines technology adoption', 'drives behavioral intention'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Open Innovation versus Closed Innovation in corporate research and development.',
        options: [],
        correctAnswer: 'Closed Innovation assumes that successful innovation requires strict internal control, relying exclusively on an enterprise internal R&D staff, proprietary patents, and confidential labs. Open Innovation assumes that firms can and should use both internal and external ideas, technologies, and pathways to market, collaborating with startups, university researchers, open source communities, and customer co-creators.',
        gradingPoints: [
          { concept: 'closed innovation relies strictly on internal r&d and proprietary secrecy', weight: 0.5, aliases: ['closed internal r&d', 'in house proprietary innovation'] },
          { concept: 'open innovation leverages internal and external ideas partnerships and ecosystems', weight: 0.5, aliases: ['open innovation collaboration', 'external partnerships and co creation'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Design Thinking and what five stages define its human-centered innovation process?',
        options: [],
        correctAnswer: 'Design Thinking is a human-centered, iterative methodology for creative problem solving. Its five stages are: 1. Empathize (researching and understanding user needs and emotions); 2. Define (clearly articulating user core problems); 3. Ideate (brainstorming a wide range of wild creative solutions); 4. Prototype (building quick, tangible mockups); and 5. Test (evaluating prototypes with real users for feedback).',
        gradingPoints: [
          { concept: 'human centered iterative creative problem solving methodology', weight: 0.4, aliases: ['design thinking definition', 'user centric innovation'] },
          { concept: 'empathize define ideate prototype test five stages', weight: 0.6, aliases: ['five design thinking stages', 'empathy definition ideation prototyping testing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of Application Programming Interfaces (APIs) in driving the API Economy.',
        options: [],
        correctAnswer: 'In the API Economy, software APIs are treated as commercial products and strategic channels rather than mere technical glue. Organizations expose core business capabilities and data as standardized APIs, enabling third-party developers, fintechs, and partner ecosystems to build complementary applications, creating new digital distribution streams and monetization opportunities (e.g., Stripe, Twilio).',
        gradingPoints: [
          { concept: 'apis treated as commercial products and distribution channels', weight: 0.5, aliases: ['api economy concept', 'apis as strategic assets'] },
          { concept: 'enables partner ecosystem co creation and new monetization streams', weight: 0.5, aliases: ['ecosystem integrations', 'third party developer monetization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Digital Transformation and explain how it differs from mere Digitization and Digitalization.',
        options: [],
        correctAnswer: 'Digitization is the technical conversion of analog information into digital formats (e.g., scanning paper files into PDF). Digitalization is the optimization of existing business processes using digital technology (e.g., automated email invoicing). Digital Transformation is a profound, strategic reinvention of an entire organization business model, operating culture, and customer value proposition through digital capabilities.',
        gradingPoints: [
          { concept: 'digitization converting analog into digital format scanning', weight: 0.3, aliases: ['digitization analog to digital', 'data conversion'] },
          { concept: 'digitalization optimizing existing processes with software', weight: 0.3, aliases: ['digitalization process improvement', 'software process automation'] },
          { concept: 'digital transformation profound strategic reinvention of business model and culture', weight: 0.4, aliases: ['business model reinvention', 'holistic organizational transformation'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Strategic Inflection Point in business technology and how should executives respond?',
        options: [],
        correctAnswer: 'A Strategic Inflection Point (coined by Andy Grove) is a critical juncture where fundamental shifts in technology, competitive forces, or market dynamics permanently alter an industry operating rules (a 10X force shift). Executives must respond by recognizing the shift early, confronting internal denial, retraining organizational capabilities, and radically realigning capital investments with the emerging reality.',
        gradingPoints: [
          { concept: 'critical juncture where 10x technological or market shift alters industry rules', weight: 0.5, aliases: ['andy grove inflection point', 'transformative paradigm shift'] },
          { concept: 'executives must overcome denial retrain capabilities realign capital investments', weight: 0.5, aliases: ['executive adaptation', 'proactive strategic pivot and realignment'] },
        ],
      },
    ],
  },

  // 8. INS 411: Supply Chain Information Systems
  {
    code: 'INS 411',
    title: 'Supply Chain Information Systems',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the three primary flows coordinated by Supply Chain Information Systems: Material, Information, and Financial flows.',
        options: [],
        correctAnswer: 'Material Flow encompasses the physical transformation, movement, and storage of raw goods, components, and finished products downstream from suppliers to consumers, as well as reverse logistics returns. Information Flow involves bidirectional data exchange including order placements, shipment status updates, demand forecasts, and inventory levels. Financial Flow encompasses payments, credit terms, billing schedules, and title ownership moving upstream.',
        gradingPoints: [
          { concept: 'material flow physical transformation movement downstream and returns', weight: 0.35, aliases: ['material flow downstream', 'physical goods movement'] },
          { concept: 'information flow bidirectional orders status updates demand forecasts', weight: 0.35, aliases: ['information flow bidirectional', 'data status and orders'] },
          { concept: 'financial flow payments credit terms invoices moving upstream', weight: 0.3, aliases: ['financial flow upstream', 'payment and billing flows'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the Bullwhip Effect in supply chains, what factors amplify it, and how does information visibility mitigate it?',
        options: [],
        correctAnswer: 'The Bullwhip Effect occurs when small variations in consumer retail demand trigger magnified fluctuations and erratic inventory swings upstream toward wholesalers, distributors, and raw manufacturers. Amplifying factors include demand forecast gaming, order batching, price promotions, and lack of transparency. Information visibility mitigates it by sharing real-time Point of Sale (POS) scanner data directly across all supply chain tiers, enabling vendor-managed inventory.',
        gradingPoints: [
          { concept: 'small retail demand changes magnified upstream toward manufacturers', weight: 0.4, aliases: ['bullwhip effect definition', 'demand variability magnification'] },
          { concept: 'causes order batching promotions forecast errors', weight: 0.3, aliases: ['amplifying factors', 'batch ordering and price swings'] },
          { concept: 'mitigated by sharing real time pos data and collaborative forecasting vmi', weight: 0.3, aliases: ['pos data visibility mitigation', 'vendor managed inventory transparency'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Supply Chain Planning (SCP) systems and Supply Chain Execution (SCE) systems.',
        options: [],
        correctAnswer: 'Supply Chain Planning (SCP) systems use advanced mathematical algorithms to generate demand forecasts, optimal production schedules, inventory replenishment targets, and sourcing strategies across strategic time horizons. Supply Chain Execution (SCE) systems manage real-time physical workflows and track order fulfillment, warehouse operations (WMS), and transportation dispatching (TMS) on a day-to-day tactical level.',
        gradingPoints: [
          { concept: 'scp generates demand forecasts replenishment targets production plans', weight: 0.5, aliases: ['supply chain planning algorithmic', 'strategic demand and supply planning'] },
          { concept: 'sce manages real time day to day physical execution wms and tms', weight: 0.5, aliases: ['supply chain execution real time', 'warehouse and transport execution'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Warehouse Management Systems (WMS) and the role of RFID and barcodes in automated stock tracking.',
        options: [],
        correctAnswer: 'A Warehouse Management System (WMS) manages day-to-day warehouse operations, including inventory put-away, slotting optimization, order picking, packing, and dispatch. Barcodes provide inexpensive optical scanning of SKUs line-by-line, while RFID (Radio Frequency Identification) tags use wireless electromagnetic interrogation to scan entire pallets simultaneously without line-of-sight, accelerating inventory audits and virtually eliminating stockouts.',
        gradingPoints: [
          { concept: 'wms manages inventory storage put away picking packing dispatching', weight: 0.5, aliases: ['wms operations', 'warehouse software management'] },
          { concept: 'barcodes optical scan rfid simultaneous bulk contactless scanning', weight: 0.5, aliases: ['barcodes vs rfid', 'rfid non line of sight advantages'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Vendor-Managed Inventory (VMI) and what benefits does it yield for both retailer and supplier?',
        options: [],
        correctAnswer: 'Vendor-Managed Inventory (VMI) is a collaborative partnership where the supplier (vendor) takes full responsibility for monitoring the retailer inventory levels (via automated EDI/cloud feeds) and generating replenishment purchase orders autonomously. The retailer benefits from reduced inventory holding costs and eliminated stockouts, while the supplier gains steady visibility into actual consumer consumption, allowing smoother production planning.',
        gradingPoints: [
          { concept: 'supplier monitors retailer inventory and manages replenishment autonomously', weight: 0.5, aliases: ['vmi model definition', 'supplier managed stock replenishment'] },
          { concept: 'retailer reduces holding costs stockouts supplier optimizes production smoothing', weight: 0.5, aliases: ['vmi mutual benefits', 'lower stockouts smoother manufacturing'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Transportation Management Systems (TMS) and describe Route Optimization algorithms.',
        options: [],
        correctAnswer: 'A Transportation Management System (TMS) manages logistics procurement, freight rating, shipment dispatching, and carrier tracking. Route optimization algorithms solve variations of the Vehicle Routing Problem (VRP) by factoring vehicle capacities, driver hours, delivery windows, and real-time traffic to calculate the most fuel-efficient delivery routes with minimal deadhead miles.',
        gradingPoints: [
          { concept: 'tms manages logistics carrier rating dispatching and tracking', weight: 0.5, aliases: ['tms definition', 'transportation logistics software'] },
          { concept: 'route optimization solves vrp factoring capacity traffic delivery windows', weight: 0.5, aliases: ['vehicle routing problem vrp', 'fuel and distance minimization'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe the SCOR (Supply Chain Operations Reference) framework and its six primary management processes.',
        options: [],
        correctAnswer: 'The SCOR framework is an industry-standard diagnostic tool developed by the Association for Supply Chain Management (ASCM) to benchmark supply chain performance. Its six core processes are: Plan (assessing resources and demand), Source (procuring goods), Make (manufacturing transformation), Deliver (logistics and order fulfillment), Return (managing customer returns and recycling), and Enable (managing governance and data).',
        gradingPoints: [
          { concept: 'industry diagnostic framework benchmarking supply chain performance', weight: 0.4, aliases: ['scor framework definition', 'supply chain reference model'] },
          { concept: 'plan source make deliver return enable six processes', weight: 0.6, aliases: ['six scor processes', 'plan source make deliver return enable'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Cold Chain tracking using Internet of Things (IoT) sensors in pharmaceutical and food supply chains.',
        options: [],
        correctAnswer: 'Cold Chain tracking ensures temperature-sensitive goods (vaccines, dairy, meat) remain within strict thermal thresholds throughout transit. IoT telematics sensors attached to refrigerated containers continuously log temperature, humidity, and location, transmitting real-time alerts via cellular/satellite to central monitoring dashboards whenever temperature excursions occur, preventing spoiled shipments from reaching consumers.',
        gradingPoints: [
          { concept: 'monitors temperature sensitive goods within strict thermal thresholds', weight: 0.5, aliases: ['cold chain monitoring', 'temperature sensitive logistics'] },
          { concept: 'iot sensors log temperature humidity location transmitting alerts on excursion', weight: 0.5, aliases: ['iot telematics tracking', 'real time excursion alerts'] },
        ],
      },
      {
        type: 'theory',
        question: 'How does Blockchain technology enhance traceability and provenance in global supply chains?',
        options: [],
        correctAnswer: 'Blockchain provides a decentralized, tamper-proof, append-only distributed ledger where every custodian in a supply chain cryptographically signs transactions when receiving or transferring custody of goods. This creates an unalterable audit trail that guarantees provenance, authenticates ethical sourcing, and enables rapid pinpoint tracing of contaminated items during product recalls.',
        gradingPoints: [
          { concept: 'immutable append only distributed ledger of custody transactions', weight: 0.5, aliases: ['blockchain supply chain', 'tamper evident distributed ledger'] },
          { concept: 'guarantees provenance authenticates ethical sourcing pinpoints rapid recalls', weight: 0.5, aliases: ['traceability provenance verify', 'rapid recall auditability'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Reverse Logistics and what software capabilities support circular economy workflows?',
        options: [],
        correctAnswer: 'Reverse Logistics encompasses the upstream operations that handle customer returns, warranty servicing, remanufacturing, recycling, and safe disposal. Supporting software capabilities include Return Merchandise Authorization (RMA) portals, automated return grading and routing rules, reverse inventory tracking, and circular material recovery metrics.',
        gradingPoints: [
          { concept: 'upstream logistics managing returns warranty repair recycling disposal', weight: 0.5, aliases: ['reverse logistics definition', 'product return operations'] },
          { concept: 'rma portals return grading routing circular economy recovery tracking', weight: 0.5, aliases: ['rma software capabilities', 'return merchandise tracking'] },
        ],
      },
    ],
  },

  // 9. INS 413: Information Architecture
  {
    code: 'INS 413',
    title: 'Information Architecture',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Define Information Architecture (IA) according to Rosenfeld and Morville and explain its three core lenses: Users, Content, and Context.',
        options: [],
        correctAnswer: 'Information Architecture (IA) is the structural design of shared information environments, art and science of organizing and labeling websites and intranets to support usability and findability. The three lenses are: Users (their tasks, information-seeking behaviors, and mental models), Content (data formats, document volume, ownership, and structure), and Context (business goals, politics, culture, technological constraints, and resources).',
        gradingPoints: [
          { concept: 'structural design of shared information environments organizing labeling for findability', weight: 0.4, aliases: ['ia definition', 'organizing labeling findability'] },
          { concept: 'users content context three information ecology lenses', weight: 0.6, aliases: ['three lenses', 'user content context ecology'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the four fundamental systems of Information Architecture: Organization Systems, Labeling Systems, Navigation Systems, and Search Systems.',
        options: [],
        correctAnswer: 'Organization Systems categorize and group content (hierarchical, chronological, alphabetical, topic-based). Labeling Systems represent information categories and links using clear, consistent terminology. Navigation Systems provide users with pathways and orientation cues (global, local, contextual, breadcrumb navigation). Search Systems allow users to query content directly using search algorithms, filters, and facets.',
        gradingPoints: [
          { concept: 'organization systems categorize and structure content schemes', weight: 0.25, aliases: ['organization systems', 'structuring content categories'] },
          { concept: 'labeling systems represent concepts consistently without jargon', weight: 0.25, aliases: ['labeling systems', 'clear category labels'] },
          { concept: 'navigation systems provide wayfinding and orientation pathways', weight: 0.25, aliases: ['navigation systems', 'global local breadcrumbs'] },
          { concept: 'search systems enable query entry filtering and faceted discovery', weight: 0.25, aliases: ['search systems', 'query algorithms and facets'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Card Sorting: Open Card Sorting and Closed Card Sorting in IA research.',
        options: [],
        correctAnswer: 'Open Card Sorting asks participants to organize content cards into groupings that make sense to them and create their own category labels (used generatively to discover user mental models and discover new taxonomy categories). Closed Card Sorting provides participants with predefined category buckets and asks them to sort cards into those established buckets (used evaluatively to validate an existing proposed hierarchy).',
        gradingPoints: [
          { concept: 'open card sorting participants create both groupings and custom labels generative', weight: 0.5, aliases: ['open card sorting', 'user created category names'] },
          { concept: 'closed card sorting participants place cards into predefined category buckets evaluative', weight: 0.5, aliases: ['closed card sorting', 'predefined buckets validation'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Sitemap and how does it translate conceptual hierarchy into tangible page templates?',
        options: [],
        correctAnswer: 'A sitemap is a visual or hierarchical blueprint that documents the relationship between pages and content sections within an information system. It translates conceptual hierarchy into tangible design by outlining parent-child page relationships, defining navigational taxonomy, mapping user conversion journeys, and serving as the architectural foundation for wireframing page templates.',
        gradingPoints: [
          { concept: 'hierarchical visual blueprint documenting parent child page relationships', weight: 0.5, aliases: ['sitemap definition', 'hierarchical site diagram'] },
          { concept: 'defines navigational taxonomy maps user journeys anchors wireframing templates', weight: 0.5, aliases: ['translates hierarchy to wireframes', 'blueprint for page templates'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Faceted Navigation and how it empowers users during complex information retrieval on e-commerce websites.',
        options: [],
        correctAnswer: 'Faceted navigation allows users to explore a collection of information by applying multiple orthogonal filters simultaneously across independent dimensions (e.g., brand, price range, color, size, rating). It empowers users by letting them narrow down thousands of catalog items dynamically without having to anticipate a rigid pre-determined hierarchical path.',
        gradingPoints: [
          { concept: 'filtering content across multiple independent orthogonal attributes simultaneously', weight: 0.5, aliases: ['faceted search filters', 'multi dimensional attribute filtering'] },
          { concept: 'dynamically narrows catalog without rigid single hierarchy browsing', weight: 0.5, aliases: ['dynamic catalog narrowing', 'flexible product discovery'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Controlled Vocabulary and what role do Thesauri and Taxonomies play in IA?',
        options: [],
        correctAnswer: 'A Controlled Vocabulary is a curated, standardized list of terms authorized for indexing and tagging content to eliminate ambiguity. A Taxonomy organizes these controlled terms into strict hierarchical parent-child relationships (e.g., animal -> mammal -> canine). A Thesaurus expands a taxonomy by mapping equivalent synonyms (lead-in terms), hierarchical relationships, and associative cross-references ("see also").',
        gradingPoints: [
          { concept: 'curated standardized term list for consistent indexing and tagging', weight: 0.4, aliases: ['controlled vocabulary definition', 'standardized terminology list'] },
          { concept: 'taxonomy hierarchical parent child structure thesaurus synonym mapping associative links', weight: 0.6, aliases: ['taxonomy and thesaurus roles', 'hierarchical vs synonym associative networks'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Breadcrumb Navigation and differentiate between Location-based, Attribute-based, and Path-based breadcrumbs.',
        options: [],
        correctAnswer: 'Breadcrumbs are secondary navigation trails showing a user location within a site hierarchy. Location-based breadcrumbs reflect the static site structure (Home > Products > Electronics > Laptops). Attribute-based breadcrumbs display the metadata filters selected by the user (Home > Shoes > Size 10 > Black). Path-based breadcrumbs show the actual dynamic chronological browsing history of pages the user visited.',
        gradingPoints: [
          { concept: 'secondary navigational trail showing current location and orientation', weight: 0.4, aliases: ['breadcrumb navigation definition', 'wayfinding breadcrumb trail'] },
          { concept: 'location site hierarchy attribute selected metadata filters path chronological history', weight: 0.6, aliases: ['three breadcrumb types', 'location attribute path breadcrumbs'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Tree Testing and how does it evaluate information architecture independently of visual design?',
        options: [],
        correctAnswer: 'Tree testing is a usability technique where users are asked to find specific information within a text-only, interactive tree representation of a site hierarchy, completely stripped of visual UI, styling, and search engines. It isolates the pure architectural hierarchy to identify exactly which labeling categories or taxonomic branches confuse users before visual design begins.',
        gradingPoints: [
          { concept: 'findability testing on text only hierarchy stripped of visual ui styling', weight: 0.5, aliases: ['tree testing definition', 'reverse card sorting text hierarchy'] },
          { concept: 'evaluates pure taxonomic structure and labeling clarity without visual distraction', weight: 0.5, aliases: ['isolates architectural findability', 'validates category branch clarity'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Cognitive Load Theory and how clean Information Architecture minimizes extraneous cognitive load.',
        options: [],
        correctAnswer: 'Cognitive Load Theory posits that human working memory has strictly limited capacity when processing new information. Extraneous cognitive load is mental effort wasted deciphering confusing layout, ambiguous jargon, and cluttered navigation. Clean IA minimizes this by employing clear categorization, consistent labeling, progressive disclosure, and logical visual wayfinding cues.',
        gradingPoints: [
          { concept: 'human working memory has limited processing capacity', weight: 0.4, aliases: ['cognitive load theory', 'working memory limitations'] },
          { concept: 'extraneous load wasted on bad layout clean ia minimizes via clear categorization labels', weight: 0.6, aliases: ['minimizing extraneous load', 'progressive disclosure clear wayfinding'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Progressive Disclosure in user interface architecture and what usability problem does it prevent?',
        options: [],
        correctAnswer: 'Progressive Disclosure is an interaction design technique that initially presents only essential options and primary content to the user, while deferring advanced, specialized settings or complex data to secondary screens (or expanding accordions) upon user request. It prevents information overload and user intimidation while keeping advanced functionality accessible.',
        gradingPoints: [
          { concept: 'initially displays only essential options deferring advanced features on demand', weight: 0.5, aliases: ['progressive disclosure definition', 'staged disclosure of complexity'] },
          { concept: 'prevents information overload and cognitive intimidation of users', weight: 0.5, aliases: ['prevents user overload', 'reduces interface clutter and intimidation'] },
        ],
      },
    ],
  },

  // 10. INS 415: Information Systems Security Management
  {
    code: 'INS 415',
    title: 'IS Security Management',
    level: 400,
    semester: 'harmattan',
    questions: [
      {
        type: 'theory',
        question: 'Explain the ISO/IEC 27001 standard and the role of an Information Security Management System (ISMS).',
        options: [],
        correctAnswer: 'ISO/IEC 27001 is the international gold-standard specification for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS). An ISMS provides a systematic governance framework of policies, procedures, risk assessment methodologies, and administrative controls to protect corporate digital and physical information assets.',
        gradingPoints: [
          { concept: 'international specification for information security governance isms', weight: 0.5, aliases: ['iso 27001 standard', 'international security standard'] },
          { concept: 'systematic framework of policies risk management and controls protecting assets', weight: 0.5, aliases: ['isms role and purpose', 'governance framework of controls'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between Security Policies, Standards, Guidelines, and Procedures in an enterprise security documentation hierarchy.',
        options: [],
        correctAnswer: 'Security Policies are executive-level, mandatory statements outlining senior management security vision, objectives, and responsibilities. Standards are mandatory, specific rules, metrics, or technologies required to enforce policies (e.g., all passwords must be 12+ characters). Procedures are mandatory, step-by-step instructional recipes detailing how to execute tasks (e.g., employee onboarding access provisioning checklist). Guidelines are recommended, non-mandatory advice and best practices.',
        gradingPoints: [
          { concept: 'policies executive high level mandatory statements of vision', weight: 0.25, aliases: ['security policies', 'executive mandatory statements'] },
          { concept: 'standards mandatory specific rules metrics baseline configurations', weight: 0.25, aliases: ['security standards', 'mandatory configuration rules'] },
          { concept: 'procedures mandatory step by step instructional task recipes', weight: 0.25, aliases: ['security procedures', 'step by step execution steps'] },
          { concept: 'guidelines non mandatory recommendations and best practice tips', weight: 0.25, aliases: ['security guidelines', 'advisory recommendations'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the Risk Assessment process according to NIST SP 800-30: Asset Identification, Threat Modeling, Vulnerability Analysis, and Risk Calculation.',
        options: [],
        correctAnswer: 'NIST SP 800-30 structures risk assessment as: 1. Asset Identification (cataloging and valuing hardware, software, and intellectual data); 2. Threat Modeling (identifying potential human adversaries, natural hazards, or environmental failures); 3. Vulnerability Analysis (discovering weaknesses in controls or code); and 4. Risk Calculation (calculating Risk = Threat × Vulnerability × Impact) to prioritize remediation investments.',
        gradingPoints: [
          { concept: 'cataloging valuing assets and modeling threat sources', weight: 0.4, aliases: ['asset identification and threats', 'inventory and threat modeling'] },
          { concept: 'vulnerability analysis discovering flaws in controls and architecture', weight: 0.3, aliases: ['vulnerability identification', 'discovering system weaknesses'] },
          { concept: 'risk calculation formula multiplying threat vulnerability impact to prioritize', weight: 0.3, aliases: ['risk formula calculation', 'prioritizing remediation by impact'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is a Security Operations Center (SOC) and what functions does a SIEM platform perform within it?',
        options: [],
        correctAnswer: 'A Security Operations Center (SOC) is a centralized facility where cybersecurity professionals continuously monitor, detect, analyze, and respond to security events. A Security Information and Event Management (SIEM) platform aggregates, normalizes, and correlates event log data generated across endpoints, servers, and firewalls in real time, triggering automated alerts when suspicious attack patterns match correlation rules.',
        gradingPoints: [
          { concept: 'centralized facility continuously monitoring detecting responding to cyber incidents', weight: 0.5, aliases: ['soc facility definition', 'security operations center purpose'] },
          { concept: 'siem aggregates normalizes correlates event logs triggering real time alerts', weight: 0.5, aliases: ['siem log correlation', 'aggregates and analyzes logs in real time'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the principle of Defense-in-Depth and illustrate how it is applied in an enterprise cloud architecture.',
        options: [],
        correctAnswer: 'Defense-in-Depth deploys multiple coordinated layers of security controls so that if one defensive layer is breached, subsequent layers prevent unauthorized access. In cloud environments, it includes perimeter DDoS shielding (Cloudflare/AWS Shield), Web Application Firewalls (WAF), Virtual Private Clouds (VPC) with security groups and microsegmentation, Identity and Access Management (IAM) with MFA and least privilege, encrypted storage at rest (AES-256), and endpoint detection agents (EDR).',
        gradingPoints: [
          { concept: 'multiple coordinated defensive layers preventing single point of failure', weight: 0.4, aliases: ['defense in depth concept', 'layered security approach'] },
          { concept: 'cloud controls ddos waf vpc microsegmentation iam mfa encryption edr', weight: 0.6, aliases: ['cloud security layers', 'waf iam vpc encryption edr'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Business Continuity Planning (BCP) versus Disaster Recovery Planning (DRP).',
        options: [],
        correctAnswer: 'Business Continuity Planning (BCP) takes a broad organizational view, outlining strategic procedures to maintain continuous critical business operations, customer service, and staff safety during and immediately after a crisis. Disaster Recovery Planning (DRP) is a technical subset of BCP focused specifically on restoring damaged IT infrastructure, servers, network connectivity, and transactional data back to operational state.',
        gradingPoints: [
          { concept: 'bcp broad enterprise organizational continuity during crisis', weight: 0.5, aliases: ['bcp organizational scope', 'keeping business operational'] },
          { concept: 'drp technical subset restoring it infrastructure data and systems', weight: 0.5, aliases: ['drp technical recovery', 'restoring servers network database'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Third-Party / Supply Chain Cyber Risk Management and how vendor security questionnaires assess risk.',
        options: [],
        correctAnswer: 'Third-party cyber risk management evaluates and monitors the cybersecurity posture of external vendors, SaaS suppliers, and contractors who connect to enterprise systems or process corporate data. Vendor security questionnaires (e.g., SIG, CAIQ) assess vendor compliance with encryption, access controls, vulnerability patching, incident response timelines, and verify independent certifications (SOC 2, ISO 27001).',
        gradingPoints: [
          { concept: 'evaluating and monitoring cyber posture of external vendors and suppliers', weight: 0.5, aliases: ['third party risk management', 'vendor cyber risk oversight'] },
          { concept: 'questionnaires assess controls encryption soc 2 iso 27001 certifications', weight: 0.5, aliases: ['vendor assessment questionnaires', 'soc 2 compliance verification'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is Security Awareness Training and why are humans often considered the weakest link in information security?',
        options: [],
        correctAnswer: 'Security Awareness Training is an ongoing educational program that trains employees to recognize cyber threats, practice secure password hygiene, and adhere to corporate protocols. Humans are often the weakest link because sophisticated technical firewalls and encryption cannot prevent an employee from falling victim to social engineering, phishing deception, or credential harvesting.',
        gradingPoints: [
          { concept: 'educational program training employees on cyber threats and safe habits', weight: 0.5, aliases: ['security awareness definition', 'employee security training'] },
          { concept: 'humans susceptible to social engineering phishing bypassing technical firewalls', weight: 0.5, aliases: ['human factor weakest link', 'phishing and manipulation vulnerabilities'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain Identity and Access Management (IAM) and the Principle of Least Privilege (PoLP).',
        options: [],
        correctAnswer: 'IAM is the security framework of business processes, policies, and technologies that manages digital identities and controls user access to enterprise resources. The Principle of Least Privilege (PoLP) mandates that users, software programs, and system processes should be granted only the absolute minimum access rights and permissions necessary to perform their assigned job duties, reducing the blast radius of any compromise.',
        gradingPoints: [
          { concept: 'framework managing digital identities and resource access controls', weight: 0.4, aliases: ['iam definition', 'identity and access governance'] },
          { concept: 'principle of least privilege grants minimum necessary rights reducing blast radius', weight: 0.6, aliases: ['least privilege polp', 'minimum permissions necessary'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Cryptographic Key Management Lifecycle according to NIST SP 800-57.',
        options: [],
        correctAnswer: 'The cryptographic key management lifecycle encompasses all phases of a cryptographic key lifespan: 1. Key Generation (using cryptographically secure random number generators); 2. Key Distribution and Storage (secure transmission and storage in Hardware Security Modules HSMs); 3. Key Usage (active encryption/decryption); 4. Key Rotation (replacing keys after cryptoperiods); 5. Key Revocation/De-registration; and 6. Key Destruction (cryptographic wiping or physical destruction of silicon).',
        gradingPoints: [
          { concept: 'lifecycle governance of cryptographic keys from creation to destruction', weight: 0.4, aliases: ['key management lifecycle', 'cryptographic key governance'] },
          { concept: 'generation secure storage hsm usage rotation revocation destruction', weight: 0.6, aliases: ['key lifecycle stages', 'generate store use rotate revoke destroy'] },
        ],
      },
    ],
  },

  // 11. INS 499: B.Sc. Final Year Project I
  {
    code: 'INS 499',
    title: 'B.Sc. Final Year Project I',
    level: 400,
    semester: 'rain',
    questions: [
      {
        type: 'theory',
        question: 'Explain the core components and structure of an undergraduate Information Systems research proposal.',
        options: [],
        correctAnswer: 'An IS research proposal includes: 1. Title Page and Background of the Study; 2. Statement of the Problem (clarifying the specific inefficiency, knowledge gap, or operational challenge); 3. Aim and Specific Objectives; 4. Research Questions and Hypotheses; 5. Significance of the Study; 6. Scope and Delimitations; 7. Preliminary Literature Review; 8. Proposed Methodology and System Design Approach; and 9. Project Timeline and Expected Deliverables.',
        gradingPoints: [
          { concept: 'problem statement aim specific objectives research questions', weight: 0.4, aliases: ['proposal core elements', 'problem and objectives'] },
          { concept: 'literature review methodology system design scope timeline', weight: 0.6, aliases: ['methodology literature review', 'system design and timeline'] },
        ],
      },
      {
        type: 'theory',
        question: 'What constitutes an effective Problem Statement in applied Information Systems research?',
        options: [],
        correctAnswer: 'An effective Problem Statement clearly identifies a tangible operational pain point or theoretical deficiency, documents its real-world negative consequences (e.g., manual data entry errors, revenue leakage, or security vulnerabilities), cites empirical or contextual evidence proving the problem exists, and articulates why an automated information system solution is required.',
        gradingPoints: [
          { concept: 'clearly defines tangible operational pain point or research deficiency', weight: 0.5, aliases: ['problem definition clarity', 'articulates concrete inefficiency'] },
          { concept: 'documents consequences proves existence justifies information system solution', weight: 0.5, aliases: ['negative impacts proven', 'justifies technology intervention'] },
        ],
      },
      {
        type: 'theory',
        question: 'Differentiate between the Aim of a research project and its Specific Objectives.',
        options: [],
        correctAnswer: 'The Aim is the overarching, broad statement of what the research project intends to achieve (e.g., "To develop an intelligent cloud-based supply chain management system for agricultural produce in Oyo State"). The Specific Objectives are concrete, measurable, sequential steps that break down how the overall aim will be accomplished (e.g., review literature, model system architecture using UML, implement prototype using Node.js, and evaluate usability using SUS).',
        gradingPoints: [
          { concept: 'aim is broad overarching statement of project purpose', weight: 0.4, aliases: ['research aim definition', 'general project goal'] },
          { concept: 'specific objectives are concrete measurable sequential operational steps', weight: 0.6, aliases: ['specific objectives breakdown', 'measurable milestones to achieve aim'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the role of a Literature Review and distinguish between Empirical and Theoretical literature.',
        options: [],
        correctAnswer: 'A literature review synthesizes prior academic and industry research to establish context, identify unresolved research gaps, and justify the chosen methodology. Theoretical literature reviews existing frameworks, models, and theories (e.g., TAM, RBV, Porter Five Forces). Empirical literature analyzes previous real-world experimental studies, data findings, and system implementations to contrast results with the proposed project.',
        gradingPoints: [
          { concept: 'synthesizes prior research identifies gaps justifies project methodology', weight: 0.4, aliases: ['literature review purpose', 'identifying academic research gaps'] },
          { concept: 'theoretical conceptual models frameworks empirical real world findings data implementations', weight: 0.6, aliases: ['theoretical vs empirical literature', 'conceptual theories vs experimental data'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe Design Science Research (DSR) methodology as applied in Information Systems undergraduate projects.',
        options: [],
        correctAnswer: 'Design Science Research (DSR) is a research paradigm that creates and evaluates innovative IT artifacts (constructs, models, methods, or software instantiations) to solve identified organizational problems. It progresses through six iterative stages: Problem Identification, Definition of Objectives, Artifact Design & Development, Demonstration, Evaluation, and Communication.',
        gradingPoints: [
          { concept: 'creates and evaluates innovative it artifacts solving organizational problems', weight: 0.5, aliases: ['dsr paradigm definition', 'building and evaluating it artifacts'] },
          { concept: 'stages problem identification objectives design demonstration evaluation communication', weight: 0.5, aliases: ['dsr six stages', 'peffers dsr process model'] },
        ],
      },
      {
        type: 'theory',
        question: 'What is the System Usability Scale (SUS) and how is it administered to evaluate software prototypes?',
        options: [],
        correctAnswer: 'The System Usability Scale (SUS) is a standardized, reliable 10-item questionnaire scored on a 5-point Likert scale (from Strongly Disagree to Strongly Agree) that measures the perceived usability of a software system. Odd-numbered questions are positive and even-numbered are negative. Scores are mathematically normalized to produce a composite score from 0 to 100, where a score above 68 is considered above average usability.',
        gradingPoints: [
          { concept: 'standardized 10 item questionnaire on 5 point likert scale measuring usability', weight: 0.5, aliases: ['sus questionnaire definition', '10 question usability scale'] },
          { concept: 'normalized composite score 0 to 100 above 68 benchmark', weight: 0.5, aliases: ['sus scoring benchmark', 'score above 68 acceptable'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain academic research ethics, plagiarism, and the importance of citation referencing formats (e.g., IEEE, APA).',
        options: [],
        correctAnswer: 'Academic research ethics requires honesty, objectivity, and respect for intellectual property. Plagiarism is the unauthorized or unattributed appropriation of another author words, ideas, diagrams, or code. Standard citation formats (such as IEEE or APA 7th edition) provide structured conventions for in-text citations and bibliographic references, giving appropriate credit to original authors and allowing readers to verify sources.',
        gradingPoints: [
          { concept: 'ethics honesty objectivity respecting intellectual property avoiding plagiarism', weight: 0.5, aliases: ['academic integrity ethics', 'plagiarism definition avoidance'] },
          { concept: 'standard citation styles ieee apa attribute original authors enable source verification', weight: 0.5, aliases: ['ieee apa referencing styles', 'source attribution conventions'] },
        ],
      },
      {
        type: 'theory',
        question: 'What data collection instruments are utilized in empirical Information Systems research, comparing Questionnaires and Interviews.',
        options: [],
        correctAnswer: 'Questionnaires use structured closed-ended items distributed to a large sample to gather quantifiable, statistically generalizable data quickly and inexpensively. Interviews involve interactive, semi-structured dialogue with key stakeholders to extract deep, qualitative, contextual insights and uncover underlying nuances that rigid surveys miss.',
        gradingPoints: [
          { concept: 'questionnaires structured closed items large sample quantitative generalizable', weight: 0.5, aliases: ['questionnaire quantitative surveys', 'structured survey large sample'] },
          { concept: 'interviews semi structured dialogue qualitative deep contextual insights', weight: 0.5, aliases: ['qualitative interviews', 'in depth stakeholder interviews'] },
        ],
      },
      {
        type: 'theory',
        question: 'Describe how students should prepare for an undergraduate project proposal defense before an academic panel.',
        options: [],
        correctAnswer: 'Students should prepare by designing concise, visually clear presentation slides (focusing on problem statement, objectives, architecture, and methodology), practicing timing within allocated limits (e.g., 10 minutes), mastering theoretical foundations, ensuring clean system architectural diagrams, anticipating critical questions, and maintaining professional, respectful composure.',
        gradingPoints: [
          { concept: 'concise slides focusing on problem objectives architecture methodology', weight: 0.5, aliases: ['slide presentation preparation', 'clear problem and methodology slides'] },
          { concept: 'practicing time limits mastering theory anticipating critical questions composure', weight: 0.5, aliases: ['oral defense readiness', 'anticipating questions professional delivery'] },
        ],
      },
      {
        type: 'theory',
        question: 'Explain the transition from Project I (Proposal and Design) to Project II (Implementation and Deployment).',
        options: [],
        correctAnswer: 'Project I concludes with approved problem formulation, comprehensive literature review, requirements specification, and complete architectural/database designs. Project II transitions these designs into active software development, backend and frontend coding, database implementation, automated testing, real-world user evaluation, and compiling the final bound thesis.',
        gradingPoints: [
          { concept: 'project 1 finishes requirements literature review and architectural designs', weight: 0.5, aliases: ['project 1 proposal design phase', 'architectural design completion'] },
          { concept: 'project 2 executes full coding testing user evaluation and bound thesis', weight: 0.5, aliases: ['project 2 implementation phase', 'software coding and final thesis'] },
        ],
      },
    ],
  },
];
