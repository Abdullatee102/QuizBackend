// src/seed/faculties/fmgs/acc.ts
import type { SeedCourse } from '../../types.js';

export const accCourses: SeedCourse[] = [
  {
    code: "ACC 101",
    title: "Financial Accounting I",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "What is the fundamental accounting equation?",
      "options": [
        "Assets = Liabilities - Equity",
        "Assets = Liabilities + Equity",
        "Equity = Assets + Liabilities",
        "Liabilities = Assets + Equity"
      ],
      "correctAnswer": "Assets = Liabilities + Equity"
    },
      {
      "type": "cbt",
      "question": "In double-entry bookkeeping, an increase in an asset is recorded as a:",
      "options": [
        "Credit",
        "Debit",
        "Liability",
        "Revenue"
      ],
      "correctAnswer": "Debit"
    },
      {
      "type": "cbt",
      "question": "Which financial statement shows a company financial position at a specific point in time?",
      "options": [
        "Income Statement",
        "Cash Flow Statement",
        "Balance Sheet (Statement of Financial Position)",
        "Statement of Changes in Equity"
      ],
      "correctAnswer": "Balance Sheet (Statement of Financial Position)"
    },
      {
      "type": "cbt",
      "question": "What is the primary purpose of preparing a Trial Balance?",
      "options": [
        "To compute income taxes payable",
        "To verify the mathematical equality of debit and credit balances in the ledger",
        "To distribute annual dividends to shareholders",
        "To value warehouse inventory"
      ],
      "correctAnswer": "To verify the mathematical equality of debit and credit balances in the ledger"
    },
      {
      "type": "cbt",
      "question": "Under the accrual basis of accounting, when should revenue be recognized?",
      "options": [
        "When cash is received in the bank",
        "When goods are delivered or services are performed regardless of when cash is received",
        "At the end of the calendar year only",
        "When signed purchase orders are printed"
      ],
      "correctAnswer": "When goods are delivered or services are performed regardless of when cash is received"
    },
      {
      "type": "cbt",
      "question": "What accounting principle assumes that a business will continue to operate indefinitely into the foreseeable future?",
      "options": [
        "Going Concern Principle",
        "Conservatism / Prudence",
        "Historical Cost Principle",
        "Entity Concept"
      ],
      "correctAnswer": "Going Concern Principle"
    },
      {
      "type": "cbt",
      "question": "Which accounting ledger account normally carries a credit balance?",
      "options": [
        "Cash at Bank",
        "Accounts Receivable (Debtors)",
        "Sales Revenue",
        "Salaries Expense"
      ],
      "correctAnswer": "Sales Revenue"
    },
      {
      "type": "cbt",
      "question": "What is Depreciation in financial accounting?",
      "options": [
        "A reserve of cash kept in safe vaults",
        "The systematic allocation of the depreciable amount of a tangible asset over its estimated useful life",
        "The sudden drop in currency exchange rates",
        "The annual repair cost of machinery"
      ],
      "correctAnswer": "The systematic allocation of the depreciable amount of a tangible asset over its estimated useful life"
    },
      {
      "type": "cbt",
      "question": "What is a Bank Reconciliation Statement prepared to reconcile?",
      "options": [
        "Differences between the Cash Book bank balance and the Bank Statement balance",
        "Sales invoices and supplier receipts",
        "General ledger and petty cash vouchers",
        "Budgeted revenue and actual tax payments"
      ],
      "correctAnswer": "Differences between the Cash Book bank balance and the Bank Statement balance"
    },
      {
      "type": "cbt",
      "question": "Which book of prime entry is used to record sales of goods made on credit?",
      "options": [
        "Cash Receipts Journal",
        "Sales Day Book (Sales Journal)",
        "General Journal",
        "Petty Cash Book"
      ],
      "correctAnswer": "Sales Day Book (Sales Journal)"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Financial Accounting (ACC 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Financial Accounting is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Financial Accounting for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Financial Accounting integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Financial Accounting (ACC 101) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Financial Accounting.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Financial Accounting guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Financial Accounting at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Financial Accounting leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ACC 103",
    title: "Introduction to Accounting II",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "What are Bad Debts in financial accounting?",
      "options": [
        "Debts owed to banks with high interest rates",
        "Amounts owed by credit customers that are deemed irrecoverable and written off as expenses",
        "Cash borrowed by company directors",
        "Discounts allowed to prompt customers"
      ],
      "correctAnswer": "Amounts owed by credit customers that are deemed irrecoverable and written off as expenses"
    },
      {
      "type": "cbt",
      "question": "What is a Suspense Account used for in bookkeeping?",
      "options": [
        "A temporary account used to record the discrepancy between total debits and credits in a trial balance until errors are found",
        "A secret corporate account for executive bonuses",
        "An account for future unknown capital projects",
        "A foreign currency savings deposit"
      ],
      "correctAnswer": "A temporary account used to record the discrepancy between total debits and credits in a trial balance until errors are found"
    },
      {
      "type": "cbt",
      "question": "What is a Control Account in ledger accounting?",
      "options": [
        "An account that controls physical factory machinery",
        "A summary general ledger account that reflects the aggregate balances of individual subsidiary ledgers",
        "An account monitored exclusively by tax authorities",
        "A bank overdraft account"
      ],
      "correctAnswer": "A summary general ledger account that reflects the aggregate balances of individual subsidiary ledgers"
    },
      {
      "type": "cbt",
      "question": "What is the Imprest System in petty cash management?",
      "options": [
        "A system where the cashier is reimbursed the exact amount spent to restore cash to a predetermined float level",
        "A system where petty cash is never audited",
        "Borrowing cash from personal funds",
        "Paying suppliers strictly via cryptocurrency"
      ],
      "correctAnswer": "A system where the cashier is reimbursed the exact amount spent to restore cash to a predetermined float level"
    },
      {
      "type": "cbt",
      "question": "Which type of error does NOT affect the mathematical agreement of a Trial Balance?",
      "options": [
        "Error of Principle",
        "Single-entry posting error",
        "Addition error in ledger column",
        "Transposition error in one account only"
      ],
      "correctAnswer": "Error of Principle"
    },
      {
      "type": "cbt",
      "question": "How is Cost of Goods Sold (COGS) calculated?",
      "options": [
        "Opening Inventory + Purchases - Closing Inventory",
        "Sales - Gross Profit + Net Profit",
        "Purchases + Expenses - Assets",
        "Closing Inventory - Opening Inventory"
      ],
      "correctAnswer": "Opening Inventory + Purchases - Closing Inventory"
    },
      {
      "type": "cbt",
      "question": "What is Carriage Inwards in accounting?",
      "options": [
        "Transport cost incurred in delivering goods sold to customers",
        "Freight and transport cost incurred in bringing purchased goods into the business premises",
        "Port storage fees on exports",
        "Vehicle license registration fees"
      ],
      "correctAnswer": "Freight and transport cost incurred in bringing purchased goods into the business premises"
    },
      {
      "type": "cbt",
      "question": "What is Working Capital?",
      "options": [
        "Current Assets minus Current Liabilities",
        "Total Assets minus Total Equity",
        "Non-Current Assets plus Cash",
        "Long-term Bank Loans minus Reserves"
      ],
      "correctAnswer": "Current Assets minus Current Liabilities"
    },
      {
      "type": "cbt",
      "question": "In partnership accounting, what is Goodwill?",
      "options": [
        "A mandatory charitable donation",
        "An intangible asset representing the excess value of a business reputation and customer base over its net identifiable assets",
        "A partner personal life insurance",
        "A trade discount granted to friends"
      ],
      "correctAnswer": "An intangible asset representing the excess value of a business reputation and customer base over its net identifiable assets"
    },
      {
      "type": "cbt",
      "question": "Which account records the distribution of net profit among partners (interest on capital, drawings, salary)?",
      "options": [
        "Profit and Loss Account",
        "Partnership Appropriation Account",
        "Revaluation Account",
        "Realization Account"
      ],
      "correctAnswer": "Partnership Appropriation Account"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Introduction to Accounting (ACC 103) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Introduction to Accounting is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Introduction to Accounting for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Introduction to Accounting integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Introduction to Accounting (ACC 103) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Introduction to Accounting.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Introduction to Accounting guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Introduction to Accounting at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Introduction to Accounting leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ECO 101",
    title: "Principles of Economics I",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Principles of Economics (ECO 101), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Principles of Economics in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Principles of Economics in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Principles of Economics?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Principles of Economics."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Principles of Economics."
    },
      {
      "type": "cbt",
      "question": "At 100 level in ECO 101 (Principles of Economics), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Principles of Economics?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Principles of Economics (ECO 101)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Principles of Economics?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Principles of Economics, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Principles of Economics (ECO 101)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Principles of Economics?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Principles of Economics?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Principles of Economics (ECO 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Principles of Economics is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Principles of Economics for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Principles of Economics integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Principles of Economics (ECO 101) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Principles of Economics.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Principles of Economics guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Principles of Economics at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Principles of Economics leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "MTH 101",
    title: "Elementary Mathematics I",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Elementary Mathematics (MTH 101), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Elementary Mathematics in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Elementary Mathematics in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Elementary Mathematics?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Elementary Mathematics."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Elementary Mathematics."
    },
      {
      "type": "cbt",
      "question": "At 100 level in MTH 101 (Elementary Mathematics), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Elementary Mathematics?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Elementary Mathematics (MTH 101)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Elementary Mathematics?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Elementary Mathematics, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Elementary Mathematics (MTH 101)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Elementary Mathematics?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Elementary Mathematics?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Elementary Mathematics (MTH 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Elementary Mathematics is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Elementary Mathematics for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Elementary Mathematics integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Elementary Mathematics (MTH 101) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Elementary Mathematics.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Elementary Mathematics guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Elementary Mathematics at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Elementary Mathematics leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "GST 111",
    title: "Communication in English I",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Communication in English (GST 111), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Communication in English in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Communication in English in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Communication in English?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Communication in English."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Communication in English."
    },
      {
      "type": "cbt",
      "question": "At 100 level in GST 111 (Communication in English), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Communication in English?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Communication in English (GST 111)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Communication in English?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Communication in English, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Communication in English (GST 111)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Communication in English?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Communication in English?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Communication in English (GST 111) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Communication in English is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Communication in English for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Communication in English integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Communication in English (GST 111) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Communication in English.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Communication in English guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Communication in English at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Communication in English leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "LIB 101",
    title: "Use of Library and Study Skills",
    level: 100,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Use of Library and Study Skills (LIB 101), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Use of Library and Study Skills in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Use of Library and Study Skills in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Use of Library and Study Skills?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Use of Library and Study Skills."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Use of Library and Study Skills."
    },
      {
      "type": "cbt",
      "question": "At 100 level in LIB 101 (Use of Library and Study Skills), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Use of Library and Study Skills?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Use of Library and Study Skills (LIB 101)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Use of Library and Study Skills?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Use of Library and Study Skills, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Use of Library and Study Skills (LIB 101)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Use of Library and Study Skills?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Use of Library and Study Skills?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Use of Library and Study Skills (LIB 101) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Use of Library and Study Skills is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Use of Library and Study Skills for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Use of Library and Study Skills integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Use of Library and Study Skills (LIB 101) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Use of Library and Study Skills.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Use of Library and Study Skills guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Use of Library and Study Skills at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Use of Library and Study Skills leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ECO 102",
    title: "Principles of Economics II",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Principles of Economics (ECO 102), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Principles of Economics in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Principles of Economics in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Principles of Economics?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Principles of Economics."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Principles of Economics."
    },
      {
      "type": "cbt",
      "question": "At 100 level in ECO 102 (Principles of Economics), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Principles of Economics?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Principles of Economics (ECO 102)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Principles of Economics?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Principles of Economics, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Principles of Economics (ECO 102)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Principles of Economics?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Principles of Economics?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Principles of Economics (ECO 102) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Principles of Economics is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Principles of Economics for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Principles of Economics integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Principles of Economics (ECO 102) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Principles of Economics.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Principles of Economics guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Principles of Economics at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Principles of Economics leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "MTH 102",
    title: "Elementary Mathematics II",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Elementary Mathematics (MTH 102), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Elementary Mathematics in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Elementary Mathematics in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Elementary Mathematics?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Elementary Mathematics."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Elementary Mathematics."
    },
      {
      "type": "cbt",
      "question": "At 100 level in MTH 102 (Elementary Mathematics), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Elementary Mathematics?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Elementary Mathematics (MTH 102)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Elementary Mathematics?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Elementary Mathematics, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Elementary Mathematics (MTH 102)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Elementary Mathematics?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Elementary Mathematics?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Elementary Mathematics (MTH 102) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Elementary Mathematics is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Elementary Mathematics for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Elementary Mathematics integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Elementary Mathematics (MTH 102) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Elementary Mathematics.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Elementary Mathematics guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Elementary Mathematics at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Elementary Mathematics leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "GST 121",
    title: "Use of English II & Logic",
    level: 100,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Use of English II & Logic (GST 121), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Use of English II & Logic in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Use of English II & Logic in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Use of English II & Logic?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Use of English II & Logic."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Use of English II & Logic."
    },
      {
      "type": "cbt",
      "question": "At 100 level in GST 121 (Use of English II & Logic), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Use of English II & Logic?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Use of English II & Logic (GST 121)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Use of English II & Logic?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Use of English II & Logic, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Use of English II & Logic (GST 121)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Use of English II & Logic?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 100-level curriculum, what is the expected learning outcome for Use of English II & Logic?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Use of English II & Logic (GST 121) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Use of English II & Logic is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Use of English II & Logic for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Use of English II & Logic integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Use of English II & Logic (GST 121) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Use of English II & Logic.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Use of English II & Logic guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Use of English II & Logic at the 100 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Use of English II & Logic leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ACC 201",
    title: "Cost & Management Accounting",
    level: 200,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "What is a fixed cost in managerial accounting?",
      "options": [
        "A cost that changes directly with production volume",
        "A cost that remains constant in total regardless of output level within a relevant range",
        "The cost of direct materials",
        "The sales commission paid to agents"
      ],
      "correctAnswer": "A cost that remains constant in total regardless of output level within a relevant range"
    },
      {
      "type": "cbt",
      "question": "What is the break-even point?",
      "options": [
        "The point where profit equals total cost",
        "The sales volume where total revenue equals total costs (zero profit/loss)",
        "The maximum possible production capacity",
        "The point of highest dividend payment"
      ],
      "correctAnswer": "The sales volume where total revenue equals total costs (zero profit/loss)"
    },
      {
      "type": "cbt",
      "question": "How is Contribution Margin calculated per unit?",
      "options": [
        "Selling Price per unit minus Variable Cost per unit",
        "Total Cost divided by Number of Units",
        "Selling Price minus Fixed Cost per unit",
        "Gross Profit minus Income Tax"
      ],
      "correctAnswer": "Selling Price per unit minus Variable Cost per unit"
    },
      {
      "type": "cbt",
      "question": "In Marginal Costing, what costs are included in the product inventory valuation?",
      "options": [
        "Only Variable Manufacturing Costs",
        "Both Fixed and Variable Manufacturing Costs",
        "Fixed Administrative Overhead only",
        "Direct Labor plus Selling Expenses only"
      ],
      "correctAnswer": "Only Variable Manufacturing Costs"
    },
      {
      "type": "cbt",
      "question": "What is Prime Cost in manufacturing accounting?",
      "options": [
        "Direct Materials + Direct Labor + Direct Expenses",
        "Fixed Overhead + Selling Costs",
        "Factory Overhead + Indirect Materials",
        "Cost of Goods Sold minus Administrative Cost"
      ],
      "correctAnswer": "Direct Materials + Direct Labor + Direct Expenses"
    },
      {
      "type": "cbt",
      "question": "What is the Economic Order Quantity (EOQ)?",
      "options": [
        "The order quantity that minimizes total annual inventory holding and ordering costs",
        "The maximum quantity the warehouse can physically fit",
        "The emergency order placed when inventory hits zero",
        "The total sales forecasted for the calendar year"
      ],
      "correctAnswer": "The order quantity that minimizes total annual inventory holding and ordering costs"
    },
      {
      "type": "cbt",
      "question": "Which inventory valuation method assumes that the oldest stock purchased is issued or sold first?",
      "options": [
        "FIFO (First-In, First-Out)",
        "LIFO (Last-In, First-Out)",
        "Weighted Average Cost (AVCO)",
        "Standard Costing"
      ],
      "correctAnswer": "FIFO (First-In, First-Out)"
    },
      {
      "type": "cbt",
      "question": "What is Variance Analysis in Standard Costing?",
      "options": [
        "Comparing actual costs against predetermined standard costs to identify variances and take corrective action",
        "Calculating depreciation on office equipment",
        "Predicting stock market fluctuations",
        "Reconciling customer disputes"
      ],
      "correctAnswer": "Comparing actual costs against predetermined standard costs to identify variances and take corrective action"
    },
      {
      "type": "cbt",
      "question": "What is an Opportunity Cost?",
      "options": [
        "The benefit or return foregone from the next best alternative rejected when choosing a course of action",
        "A discount offered during holiday promotions",
        "The cash paid to hire a financial consultant",
        "The salvage value of written-off computers"
      ],
      "correctAnswer": "The benefit or return foregone from the next best alternative rejected when choosing a course of action"
    },
      {
      "type": "cbt",
      "question": "In Job Costing, what document accumulates all costs (materials, labor, overhead) assigned to a specific job order?",
      "options": [
        "Job Cost Sheet",
        "Purchase Requisition",
        "Goods Received Note (GRN)",
        "Delivery Challan"
      ],
      "correctAnswer": "Job Cost Sheet"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Cost & Management Accounting (ACC 201) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Cost & Management Accounting is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Cost & Management Accounting for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Cost & Management Accounting integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Cost & Management Accounting (ACC 201) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Cost & Management Accounting.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Cost & Management Accounting guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Cost & Management Accounting at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Cost & Management Accounting leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ACC 203",
    title: "Financial Accounting II",
    level: 200,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In manufacturing accounts, what cost represents Factory Overhead?",
      "options": [
        "Indirect factory wages, factory rent, and machinery depreciation",
        "Direct raw materials used in production",
        "Direct assembly line worker wages",
        "Sales commissions paid to retail agents"
      ],
      "correctAnswer": "Indirect factory wages, factory rent, and machinery depreciation"
    },
      {
      "type": "cbt",
      "question": "What is a Revaluation Reserve in corporate financial accounting?",
      "options": [
        "An equity reserve created when non-current assets are revalued upward above carrying amount",
        "A cash fund set aside for buying office stationery",
        "An emergency bank overdraft line",
        "Unpaid dividend checks"
      ],
      "correctAnswer": "An equity reserve created when non-current assets are revalued upward above carrying amount"
    },
      {
      "type": "cbt",
      "question": "What does a Rights Issue of shares entail?",
      "options": [
        "Offering existing shareholders the right to buy additional new shares in proportion to existing holdings at a discounted price",
        "Issuing free bonus shares funded from retained earnings",
        "Selling debentures to commercial banks",
        "Granting free shares to factory workers"
      ],
      "correctAnswer": "Offering existing shareholders the right to buy additional new shares in proportion to existing holdings at a discounted price"
    },
      {
      "type": "cbt",
      "question": "In company accounts, what are Debentures?",
      "options": [
        "Long-term debt instruments issued by a company acknowledging loan capital with fixed interest obligations",
        "Equity voting shares held by founders",
        "Dividends paid to preferred shareholders",
        "Cash deposited in commercial checking accounts"
      ],
      "correctAnswer": "Long-term debt instruments issued by a company acknowledging loan capital with fixed interest obligations"
    },
      {
      "type": "cbt",
      "question": "What is the purpose of preparing a Statement of Cash Flows (IAS 7)?",
      "options": [
        "To provide information about a company historical cash inflows and outflows categorized into operating, investing, and financing activities",
        "To calculate corporate income tax liabilities",
        "To record petty cash vouchers",
        "To value intangible brand trademarks"
      ],
      "correctAnswer": "To provide information about a company historical cash inflows and outflows categorized into operating, investing, and financing activities"
    },
      {
      "type": "cbt",
      "question": "Under IAS 7, cash paid to acquire physical property, plant, and equipment is classified under:",
      "options": [
        "Investing Activities",
        "Operating Activities",
        "Financing Activities",
        "Equity Adjustments"
      ],
      "correctAnswer": "Investing Activities"
    },
      {
      "type": "cbt",
      "question": "What are Accumulated Reserves in corporate equity?",
      "options": [
        "Retained corporate profits and capital gains accumulated over years rather than distributed as dividends",
        "The physical cash stored in bank vaults",
        "Taxes owed to federal revenue authorities",
        "Funds reserved for purchasing company vehicles"
      ],
      "correctAnswer": "Retained corporate profits and capital gains accumulated over years rather than distributed as dividends"
    },
      {
      "type": "cbt",
      "question": "When ordinary shares are issued at a price exceeding nominal par value, the excess amount is credited to:",
      "options": [
        "Share Premium Account (Share Capital Reserve)",
        "Retained Earnings",
        "Revaluation Account",
        "Profit and Loss Account"
      ],
      "correctAnswer": "Share Premium Account (Share Capital Reserve)"
    },
      {
      "type": "cbt",
      "question": "In club or non-profit accounting, what replaces the Profit and Loss Account?",
      "options": [
        "Income and Expenditure Account",
        "Balance Sheet",
        "Trial Balance",
        "Manufacturing Ledger"
      ],
      "correctAnswer": "Income and Expenditure Account"
    },
      {
      "type": "cbt",
      "question": "In non-profit accounting, what term is used instead of Net Profit?",
      "options": [
        "Surplus of Income over Expenditure",
        "Dividend Allowance",
        "Capital Return",
        "Gross Trading Margin"
      ],
      "correctAnswer": "Surplus of Income over Expenditure"
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Financial Accounting (ACC 203) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Financial Accounting is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Financial Accounting for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Financial Accounting integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Financial Accounting (ACC 203) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Financial Accounting.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Financial Accounting guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Financial Accounting at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Financial Accounting leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "GST 201",
    title: "Entrepreneurship Studies I",
    level: 200,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Entrepreneurship Studies (GST 201), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Entrepreneurship Studies in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Entrepreneurship Studies in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Entrepreneurship Studies?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Entrepreneurship Studies."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Entrepreneurship Studies."
    },
      {
      "type": "cbt",
      "question": "At 200 level in GST 201 (Entrepreneurship Studies), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Entrepreneurship Studies?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Entrepreneurship Studies (GST 201)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "cbt",
      "question": "How do practitioners and researchers address complex constraints in Entrepreneurship Studies?",
      "options": [
        "Through systematic problem decomposition, structured analysis, and evidence-based modeling.",
        "By abandoning formal problem-solving frameworks.",
        "By modifying the constraints arbitrarily to produce trivial outcomes.",
        "By deferring the analysis indefinitely without resolution."
      ],
      "correctAnswer": "Through systematic problem decomposition, structured analysis, and evidence-based modeling."
    },
      {
      "type": "cbt",
      "question": "In Entrepreneurship Studies, why is documentation and standardization critical for professional practice?",
      "options": [
        "It restricts access to authorized personnel exclusively.",
        "It replaces all technical innovation with bureaucratic stagnation.",
        "It is solely an administrative burden with no operational value.",
        "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
      ],
      "correctAnswer": "It guarantees auditability, knowledge transfer, safety compliance, and reproducibility."
    },
      {
      "type": "cbt",
      "question": "What is the primary risk of neglecting foundational principles in Entrepreneurship Studies (GST 201)?",
      "options": [
        "Guaranteed optimization of all resource parameters.",
        "Automatic compliance with national regulatory guidelines.",
        "Accelerated execution speed with no negative repercussions.",
        "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
      ],
      "correctAnswer": "Systemic failure, erroneous conclusions, and compromised structural or analytical integrity."
    },
      {
      "type": "cbt",
      "question": "Which analytical technique is most effective when handling multi-variable challenges in Entrepreneurship Studies?",
      "options": [
        "Multivariate analysis, sensitivity testing, and parametric optimization.",
        "Single-variable isolation while ignoring all interdependent variables.",
        "Random parameter variation without baseline control.",
        "Intuitive estimation based on unverified assumptions."
      ],
      "correctAnswer": "Multivariate analysis, sensitivity testing, and parametric optimization."
    },
      {
      "type": "cbt",
      "question": "In the context of 200-level curriculum, what is the expected learning outcome for Entrepreneurship Studies?",
      "options": [
        "Bypassing analytical evaluation in favor of informal conjecture.",
        "Superficial awareness of peripheral concepts without foundational comprehension.",
        "Passive memorization of introductory terminology without practical application.",
        "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
      ],
      "correctAnswer": "Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Entrepreneurship Studies (GST 201) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Entrepreneurship Studies is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Entrepreneurship Studies for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Entrepreneurship Studies integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Entrepreneurship Studies (GST 201) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Entrepreneurship Studies.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Entrepreneurship Studies guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Entrepreneurship Studies at the 200 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Entrepreneurship Studies leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ACC 301",
    title: "Auditing & Assurance Services",
    level: 300,
    semester: "harmattan",
    questions: [
      {
      "type": "theory",
      "question": "Explain the fundamental objective of an external statutory audit and define the concept of True and Fair View.",
      "options": [],
      "correctAnswer": "The primary objective of a statutory audit is to enable the independent auditor to express an objective professional opinion on whether the financial statements are prepared in all material respects in accordance with applicable financial reporting frameworks (e.g., IFRS/GAAP). A True and Fair View implies that financial statements are free from material misstatements, objectively reflect economic reality, and adhere to accounting standards without misleading users.",
      "gradingPoints": [
        {
          "concept": "independent professional opinion on financial statements in accordance with framework",
          "weight": 0.5,
          "aliases": [
            "statutory audit objective",
            "independent audit opinion on statements"
          ]
        },
        {
          "concept": "true and fair view free from material misstatements reflects economic reality",
          "weight": 0.5,
          "aliases": [
            "true and fair view definition",
            "unbiased objective reflection of accounts"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Differentiate between Audit Risk and its three constituent components: Inherent Risk, Control Risk, and Detection Risk.",
      "options": [],
      "correctAnswer": "Audit Risk is the risk that an auditor expresses an inappropriate clean opinion when financial statements are materially misstated. Inherent Risk is the susceptibility of an assertion or account to material misstatement assuming zero internal controls. Control Risk is the risk that internal controls fail to prevent or detect material misstatement. Detection Risk is the risk that audit procedures fail to uncover existing material misstatements.",
      "gradingPoints": [
        {
          "concept": "audit risk expressing clean opinion when statements materially misstated",
          "weight": 0.25,
          "aliases": [
            "audit risk definition",
            "risk of inappropriate audit opinion"
          ]
        },
        {
          "concept": "inherent risk susceptibility before internal controls",
          "weight": 0.25,
          "aliases": [
            "inherent risk definition",
            "raw account vulnerability"
          ]
        },
        {
          "concept": "control risk internal controls fail to catch error",
          "weight": 0.25,
          "aliases": [
            "control risk definition",
            "failure of entity controls"
          ]
        },
        {
          "concept": "detection risk auditor substantive testing fails to discover error",
          "weight": 0.25,
          "aliases": [
            "detection risk definition",
            "auditor testing blind spot"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the five fundamental ethical principles outlined in the IFAC/ICAN Code of Ethics for Professional Accountants.",
      "options": [],
      "correctAnswer": "The five fundamental ethical principles are: 1. Integrity (straightforwardness and honesty in all professional relationships); 2. Objectivity (not allowing bias, conflict of interest, or undue influence to override judgments); 3. Professional Competence and Due Care (maintaining professional knowledge and diligence); 4. Confidentiality (respecting confidentiality of client information); and 5. Professional Behavior (complying with laws and avoiding actions discrediting the profession).",
      "gradingPoints": [
        {
          "concept": "integrity honesty objectivity impartiality",
          "weight": 0.4,
          "aliases": [
            "integrity and objectivity",
            "honesty and lack of bias"
          ]
        },
        {
          "concept": "professional competence due care confidentiality professional behavior",
          "weight": 0.6,
          "aliases": [
            "competence confidentiality behavior",
            "due care secrecy professional conduct"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "What is Materiality in auditing and how does an auditor establish planning materiality?",
      "options": [],
      "correctAnswer": "Information is material if its omission or misstatement could reasonably influence the economic decisions of users taken on the basis of the financial statements. An auditor establishes planning materiality by applying a professional percentage benchmark to a chosen financial base (e.g., 0.5%–1% of Gross Revenue, 5% of Profit Before Tax, or 1%–2% of Total Assets) taking into account risk and stakeholder sensitivity.",
      "gradingPoints": [
        {
          "concept": "omission or misstatement influencing economic decisions of financial statement users",
          "weight": 0.5,
          "aliases": [
            "materiality definition",
            "threshold influencing user decisions"
          ]
        },
        {
          "concept": "percentage benchmark applied to financial base revenue profit total assets",
          "weight": 0.5,
          "aliases": [
            "planning materiality calculation",
            "benchmark on profit or revenue"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe the four types of Audit Opinions that an external auditor can issue: Unqualified, Qualified, Adverse, and Disclaimer of Opinion.",
      "options": [],
      "correctAnswer": "An Unqualified (Clean) Opinion states financial statements present a true and fair view in all material respects. A Qualified Opinion (\"Except for...\") is issued when misstatements or lack of evidence are material but not pervasive. An Adverse Opinion is issued when misstatements are both material and pervasive, rendering statements misleading. A Disclaimer of Opinion is issued when inability to obtain sufficient appropriate evidence is both material and pervasive.",
      "gradingPoints": [
        {
          "concept": "unqualified clean true and fair qualified material but not pervasive",
          "weight": 0.5,
          "aliases": [
            "clean vs qualified opinion",
            "unqualified and except for opinions"
          ]
        },
        {
          "concept": "adverse material and pervasive misstatement disclaimer pervasive limitation on scope",
          "weight": 0.5,
          "aliases": [
            "adverse and disclaimer opinions",
            "pervasive misstatement vs scope limitation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the difference between Substantive Procedures and Tests of Controls in audit methodology.",
      "options": [],
      "correctAnswer": "Tests of Controls are audit procedures designed to evaluate the operational effectiveness of client internal controls in preventing or detecting material misstatements (e.g., inspecting approval signatures or testing user access logs). Substantive Procedures are audit tests designed to directly detect material monetary misstatements at the assertion level, comprising Substantive Analytical Procedures and Tests of Details (e.g., physical stock counts, bank confirmations).",
      "gradingPoints": [
        {
          "concept": "tests of controls evaluate operational effectiveness of client internal controls",
          "weight": 0.5,
          "aliases": [
            "control testing",
            "evaluating control effectiveness"
          ]
        },
        {
          "concept": "substantive procedures directly detect monetary misstatements tests of details analytical",
          "weight": 0.5,
          "aliases": [
            "substantive testing",
            "detecting monetary errors directly"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "What constitutes Sufficient Appropriate Audit Evidence according to ISA 500?",
      "options": [],
      "correctAnswer": "Sufficient relates to the quantity of audit evidence, influenced by the auditor assessment of risk and quality of evidence. Appropriate relates to the quality of audit evidence, encompassing relevance (logical connection to the audit assertion) and reliability (influenced by its source, external independent sources being more reliable than internal client documents, and original documents being more reliable than photocopies).",
      "gradingPoints": [
        {
          "concept": "sufficiency measures quantity of audit evidence needed",
          "weight": 0.4,
          "aliases": [
            "quantity of evidence",
            "sufficient measure of volume"
          ]
        },
        {
          "concept": "appropriateness measures quality relevance to assertion and reliability of source",
          "weight": 0.6,
          "aliases": [
            "quality relevance reliability",
            "relevance and reliability of evidence"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain External Confirmations (ISA 505) and describe Positive versus Negative confirmation requests.",
      "options": [],
      "correctAnswer": "External confirmation is direct written evidence obtained by the auditor from an independent third party (e.g., bank, debtor). In a Positive Confirmation, the third party must respond directly to the auditor in all cases, confirming whether they agree or disagree with the stated balance. In a Negative Confirmation, the third party is asked to respond only if they disagree with the stated balance (provides weaker audit evidence).",
      "gradingPoints": [
        {
          "concept": "direct written evidence from independent third party bank debtor",
          "weight": 0.4,
          "aliases": [
            "external confirmation isa 505",
            "direct third party verification"
          ]
        },
        {
          "concept": "positive requires response in all cases negative requires response only on disagreement",
          "weight": 0.6,
          "aliases": [
            "positive vs negative confirmation",
            "response required vs response on dispute"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe Management Letter (Letter of Weakness) issued by external auditors following an audit.",
      "options": [],
      "correctAnswer": "A Management Letter is a formal written communication sent by the auditor to those charged with governance (Board Audit Committee) detailing internal control deficiencies identified during the audit. It describes the weakness observed, the potential operational or financial risk it poses, and constructive auditor recommendations for remedial action.",
      "gradingPoints": [
        {
          "concept": "written communication to governance detailing internal control deficiencies",
          "weight": 0.5,
          "aliases": [
            "management letter definition",
            "letter of weakness to board"
          ]
        },
        {
          "concept": "details observed weakness financial risk and actionable recommendations",
          "weight": 0.5,
          "aliases": [
            "structure of management letter",
            "deficiency risk and recommendation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the auditor statutory responsibilities regarding Fraud Detection according to ISA 240.",
      "options": [],
      "correctAnswer": "Primary responsibility for prevention and detection of fraud rests with management and governance. The auditor responsibility under ISA 240 is to obtain reasonable assurance that financial statements as a whole are free from material misstatement whether caused by error or fraud, maintaining professional skepticism throughout the audit and actively investigating fraud risk factors (e.g., management override of controls).",
      "gradingPoints": [
        {
          "concept": "primary fraud prevention rests with management and governance",
          "weight": 0.4,
          "aliases": [
            "management responsibility for fraud",
            "primary role of governance"
          ]
        },
        {
          "concept": "auditor obtains reasonable assurance maintains professional skepticism investigates override",
          "weight": 0.6,
          "aliases": [
            "auditor reasonable assurance isa 240",
            "professional skepticism and fraud risks"
          ]
        }
      ]
    },
      {
      "type": "cbt",
      "question": "In the study of Auditing & Assurance Services (ACC 301), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Auditing & Assurance Services in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Auditing & Assurance Services in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Auditing & Assurance Services?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Auditing & Assurance Services."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Auditing & Assurance Services."
    },
      {
      "type": "cbt",
      "question": "At 300 level in ACC 301 (Auditing & Assurance Services), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Auditing & Assurance Services?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Auditing & Assurance Services (ACC 301)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    }
    ],
  },
  {
    code: "ACC 303",
    title: "Management Accounting",
    level: 300,
    semester: "harmattan",
    questions: [
      {
      "type": "theory",
      "question": "Explain Activity-Based Costing (ABC) and contrast it with Traditional Volume-Based Overhead Absorption.",
      "options": [],
      "correctAnswer": "Traditional costing pools overheads into broad departments and absorbs them using a single volume-based driver (e.g., machine hours or direct labor hours), which distorts product costs in diverse production settings. Activity-Based Costing (ABC) assigns overhead costs to specific business activities (e.g., setup, inspection, purchasing) and assigns costs to products based on their actual consumption of individual Cost Drivers, yielding accurate product profitability.",
      "gradingPoints": [
        {
          "concept": "traditional uses single volume driver distorting product costs",
          "weight": 0.5,
          "aliases": [
            "traditional overhead absorption",
            "volume based distortion"
          ]
        },
        {
          "concept": "abc identifies activities cost pools and assigns costs via cost drivers",
          "weight": 0.5,
          "aliases": [
            "activity based costing mechanisms",
            "cost pools and cost drivers"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Differentiate between Marginal Costing and Absorption Costing, illustrating how profit differs when inventory levels fluctuate.",
      "options": [],
      "correctAnswer": "Absorption costing treats both fixed and variable production overheads as product costs, carrying fixed overhead in inventory valuation. Marginal costing treats fixed overhead strictly as a period cost written off immediately. When production exceeds sales (inventory rises), Absorption Costing reports higher profit than Marginal Costing because fixed overhead is deferred in closing inventory. When sales exceed production, Marginal Costing reports higher profit.",
      "gradingPoints": [
        {
          "concept": "absorption includes fixed overhead in inventory marginal writes off as period expense",
          "weight": 0.5,
          "aliases": [
            "absorption vs marginal product cost",
            "inventory valuation difference"
          ]
        },
        {
          "concept": "when inventory increases absorption profit higher when inventory falls marginal profit higher",
          "weight": 0.5,
          "aliases": [
            "profit reconciliation inventory change",
            "inventory fluctuations impact on profit"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain Cost-Volume-Profit (CVP) analysis assumptions and limitations in corporate decision-making.",
      "options": [],
      "correctAnswer": "CVP analysis models the relationship between operating costs, production volumes, and profit. Key assumptions include: selling price per unit remains constant, costs are linear and separable into fixed and variable components, unit variable cost is constant, productivity and efficiency are unchanged, and inventory changes are zero (sales equals production). Limitations include unrealistic linearity over long ranges and difficulty separating semi-variable costs.",
      "gradingPoints": [
        {
          "concept": "models relationship between costs volume and operational profit",
          "weight": 0.3,
          "aliases": [
            "cvp analysis definition",
            "break even modeling"
          ]
        },
        {
          "concept": "assumptions constant price linear costs constant unit variable cost zero inventory delta",
          "weight": 0.5,
          "aliases": [
            "cvp assumptions",
            "linear costs constant selling price"
          ]
        },
        {
          "concept": "limitations non linear real world curves stepped fixed costs product mix changes",
          "weight": 0.2,
          "aliases": [
            "cvp limitations",
            "unrealistic linearity assumption"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe Limiting Factor Analysis (Key Factor Analysis) in short-term profit maximization decisions.",
      "options": [],
      "correctAnswer": "A limiting factor is a production constraint that restricts business activity (e.g., shortage of direct labor hours, machine capacity, or raw materials). To maximize short-term profit with a single limiting factor, an enterprise should rank products based on their Contribution Margin per unit of Limiting Factor (Contribution / Limiting Factor per unit) and allocate scarce resources to the highest-ranked products first.",
      "gradingPoints": [
        {
          "concept": "limiting factor restricts production capacity labor materials machine hours",
          "weight": 0.4,
          "aliases": [
            "key factor constraint",
            "production bottleneck"
          ]
        },
        {
          "concept": "rank products by contribution per unit of limiting factor allocate scarce resource to highest",
          "weight": 0.6,
          "aliases": [
            "contribution per limiting factor",
            "optimal production plan ranking"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the Balanced Scorecard by Kaplan and Norton and its four operational perspectives in management control.",
      "options": [],
      "correctAnswer": "The Balanced Scorecard is a strategic performance measurement system that supplements traditional lagging financial indicators with leading operational measures. Its four perspectives are: 1. Financial Perspective (e.g., ROI, cash flow); 2. Customer Perspective (e.g., customer satisfaction, retention); 3. Internal Business Processes (e.g., cycle time, quality defect rate); and 4. Learning and Growth (e.g., employee training, IT innovation).",
      "gradingPoints": [
        {
          "concept": "balances financial metrics with operational leading indicators",
          "weight": 0.4,
          "aliases": [
            "balanced scorecard definition",
            "holistic strategic control"
          ]
        },
        {
          "concept": "financial customer internal business processes learning and growth perspectives",
          "weight": 0.6,
          "aliases": [
            "four scorecard perspectives",
            "kaplan and norton four domains"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Differentiate between Incremental Budgeting and Zero-Based Budgeting (ZBB).",
      "options": [],
      "correctAnswer": "Incremental Budgeting takes the previous period actual or budgeted figures and adjusts them by an incremental percentage for inflation and growth; it is quick but encourages budgetary slack and perpetuates waste. Zero-Based Budgeting (ZBB) requires every departmental manager to justify all proposed expenditures from a zero baseline for each new budget cycle, tying every dollar to business objectives and eliminating inefficient historical spending.",
      "gradingPoints": [
        {
          "concept": "incremental adjusts prior budget by percentage quick but perpetuates waste",
          "weight": 0.5,
          "aliases": [
            "incremental budgeting",
            "historical baseline plus percentage"
          ]
        },
        {
          "concept": "zbb justifies every expense from zero base eliminates waste tied to objectives",
          "weight": 0.5,
          "aliases": [
            "zero based budgeting zbb",
            "zero baseline expenditure justification"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain Transfer Pricing in decentralized divisional corporations and contrast Market-based, Cost-based, and Negotiated transfer prices.",
      "options": [],
      "correctAnswer": "Transfer pricing is the internal price charged when one autonomous division of an enterprise sells goods or services to another division within the same firm. Market-based pricing sets the transfer price at external market competitive rates (ideal when active markets exist). Cost-based pricing uses full cost or variable cost plus markup (used when no external market exists). Negotiated pricing lets divisional managers negotiate terms freely.",
      "gradingPoints": [
        {
          "concept": "internal price charged for goods services transferred between corporate divisions",
          "weight": 0.4,
          "aliases": [
            "transfer pricing definition",
            "internal goods pricing"
          ]
        },
        {
          "concept": "market based cost based negotiated transfer pricing mechanisms",
          "weight": 0.6,
          "aliases": [
            "three transfer price methods",
            "market vs cost vs negotiated"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe Standard Costing and explain Material Price Variance and Material Usage Variance.",
      "options": [],
      "correctAnswer": "Standard Costing establishes predetermined target costs per unit for direct materials, labor, and overhead to benchmark against actual performance. Material Price Variance measures the difference between actual price paid and standard price expected: MPV = (Standard Price - Actual Price) × Actual Quantity Purchased. Material Usage Variance measures the difference between actual quantity consumed and standard quantity allowed: MUV = (Standard Quantity Allowed - Actual Quantity Consumed) × Standard Price.",
      "gradingPoints": [
        {
          "concept": "predetermined target costs benchmarked against actual costs",
          "weight": 0.4,
          "aliases": [
            "standard costing definition",
            "predetermined cost benchmarking"
          ]
        },
        {
          "concept": "mpv sp minus ap times aq muv sq minus aq times sp formulas",
          "weight": 0.6,
          "aliases": [
            "price and usage variance formulas",
            "material variances calculation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "What is Target Costing and how is the Target Cost calculated from Target Price and Desired Profit Margin?",
      "options": [],
      "correctAnswer": "Target Costing is a customer-oriented cost management approach practiced during product development. Rather than calculating cost and adding markup, it works backward from competitive market reality: Target Cost = Target Selling Price - Desired Profit Margin. If projected cost exceeds target cost, cross-functional engineering teams use Value Engineering to eliminate unnecessary costs without degrading customer value.",
      "gradingPoints": [
        {
          "concept": "customer focused pricing target cost equals target price minus desired profit",
          "weight": 0.6,
          "aliases": [
            "target costing formula",
            "market driven cost planning"
          ]
        },
        {
          "concept": "value engineering redesigns product eliminating waste to hit target cost",
          "weight": 0.4,
          "aliases": [
            "value engineering role",
            "cost reduction during design"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain Return on Investment (ROI) versus Residual Income (RI) in divisional performance evaluation.",
      "options": [],
      "correctAnswer": "ROI measures divisional profitability relative to invested capital: ROI = Controllable Operating Profit / Controllable Capital Employed; its drawback is that division managers may reject profitable corporate projects if the project ROI is lower than their current high division average (sub-optimization). Residual Income is the operating profit earned above the cost of capital: RI = Operating Profit - (Cost of Capital × Capital Employed); it aligns divisional incentives with total corporate wealth maximization.",
      "gradingPoints": [
        {
          "concept": "roi ratio profit over capital drawback sub optimization rejecting good projects",
          "weight": 0.5,
          "aliases": [
            "roi formula drawback",
            "sub optimal project rejection"
          ]
        },
        {
          "concept": "ri absolute profit above cost of capital aligns goal congruence",
          "weight": 0.5,
          "aliases": [
            "residual income formula",
            "ri overcomes roi sub optimization"
          ]
        }
      ]
    },
      {
      "type": "cbt",
      "question": "In the study of Management Accounting (ACC 303), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Management Accounting in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Management Accounting in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Management Accounting?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Management Accounting."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Management Accounting."
    },
      {
      "type": "cbt",
      "question": "At 300 level in ACC 303 (Management Accounting), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Management Accounting?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Management Accounting (ACC 303)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    }
    ],
  },
  {
    code: "ACC 399",
    title: "SIWES Industrial Training",
    level: 300,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of SIWES Industrial Training (ACC 399), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing SIWES Industrial Training in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing SIWES Industrial Training in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in SIWES Industrial Training?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to SIWES Industrial Training."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to SIWES Industrial Training."
    },
      {
      "type": "cbt",
      "question": "At 300 level in ACC 399 (SIWES Industrial Training), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in SIWES Industrial Training?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in SIWES Industrial Training (ACC 399)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of SIWES Industrial Training (ACC 399) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "SIWES Industrial Training is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in SIWES Industrial Training for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in SIWES Industrial Training integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to SIWES Industrial Training (ACC 399) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern SIWES Industrial Training.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in SIWES Industrial Training guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting SIWES Industrial Training at the 300 level.",
      "options": [],
      "correctAnswer": "Recent advancements in SIWES Industrial Training leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Formulate a structured step-by-step framework for diagnosing and resolving a major operational failure in SIWES Industrial Training.",
      "options": [],
      "correctAnswer": "A structured diagnostic framework involves: (1) Problem definition and baseline data acquisition, (2) Root cause identification using diagnostic tools, (3) Formulation of evidence-based corrective interventions, (4) Controlled execution, and (5) Post-implementation verification and documentation.",
      "gradingPoints": [
        {
          "concept": "problem definition and root cause identification",
          "weight": 0.5,
          "aliases": [
            "problem identification",
            "data acquisition",
            "root cause analysis"
          ]
        },
        {
          "concept": "corrective interventions and verification documentation",
          "weight": 0.5,
          "aliases": [
            "implementation of solutions",
            "post verification",
            "standard documentation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Compare and contrast two prevailing models or theoretical paradigms used in SIWES Industrial Training (ACC 399).",
      "options": [],
      "correctAnswer": "Model A focuses primarily on deterministic, classical approaches offering exact analytical solutions under controlled boundary conditions, whereas Model B incorporates stochastic, adaptive, or empirical elements accommodating real-world uncertainty and dynamic perturbations.",
      "gradingPoints": [
        {
          "concept": "deterministic classical model principles and boundaries",
          "weight": 0.5,
          "aliases": [
            "deterministic approach",
            "exact analytical solutions",
            "model a analysis"
          ]
        },
        {
          "concept": "stochastic adaptive model characteristics and uncertainty handling",
          "weight": 0.5,
          "aliases": [
            "stochastic paradigm",
            "adaptive modeling",
            "empirical elements"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the mathematical or quantitative principles underpinning performance evaluation in SIWES Industrial Training.",
      "options": [],
      "correctAnswer": "Performance evaluation relies on quantitative relationships governing rate of progress, efficiency ratios, variance metrics, and sensitivity coefficients. Mathematical formulations quantify throughput, resource consumption, and reliability margins under varying load conditions.",
      "gradingPoints": [
        {
          "concept": "efficiency ratios and variance metrics",
          "weight": 0.5,
          "aliases": [
            "quantitative formulations",
            "rate equations",
            "efficiency calculations"
          ]
        },
        {
          "concept": "reliability margins and sensitivity coefficients",
          "weight": 0.5,
          "aliases": [
            "sensitivity analysis",
            "performance metrics",
            "load evaluation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe the role of interdisciplinary integration between SIWES Industrial Training and related contemporary scientific or technological disciplines.",
      "options": [],
      "correctAnswer": "Interdisciplinary synthesis combines insights from computing, management sciences, and physical/biological systems to enrich SIWES Industrial Training. This cross-pollination yields robust hybrid architectures, comprehensive lifecycle assessment, and innovative solutions to multidimensional societal challenges.",
      "gradingPoints": [
        {
          "concept": "cross disciplinary synthesis with computing and physical sciences",
          "weight": 0.5,
          "aliases": [
            "interdisciplinary integration",
            "cross pollination",
            "hybrid methodologies"
          ]
        },
        {
          "concept": "lifecycle assessment and multidimensional problem solving",
          "weight": 0.5,
          "aliases": [
            "lifecycle analysis",
            "societal problem solving",
            "robust architectures"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Synthesize the primary criteria required for conducting rigorous academic research or final project execution in SIWES Industrial Training (ACC 399).",
      "options": [],
      "correctAnswer": "Rigorous academic research in SIWES Industrial Training mandates formulating a well-defined research problem, conducting an exhaustive literature review, designing an airtight experimental or computational methodology, performing rigorous statistical verification, and drawing defensible academic conclusions.",
      "gradingPoints": [
        {
          "concept": "research problem formulation and methodological design",
          "weight": 0.5,
          "aliases": [
            "problem definition",
            "experimental design",
            "methodology"
          ]
        },
        {
          "concept": "statistical verification and defensible academic conclusions",
          "weight": 0.5,
          "aliases": [
            "data analysis",
            "statistical validation",
            "thesis conclusions"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ACC 401",
    title: "Advanced Financial Accounting & Reporting",
    level: 400,
    semester: "harmattan",
    questions: [
      {
      "type": "theory",
      "question": "Explain the principles of Group Accounts and Consolidated Financial Statements under IFRS 10.",
      "options": [],
      "correctAnswer": "IFRS 10 defines control as the basis for consolidation: an investor controls an investee when it has power over the investee, exposure or rights to variable returns from its involvement, and the ability to use its power to affect those returns. Consolidated financial statements combine assets, liabilities, income, expenses, and cash flows of the parent and subsidiaries as if they were a single economic entity, eliminating intra-group balances and transactions.",
      "gradingPoints": [
        {
          "concept": "control power exposure to variable returns ability to affect returns ifrs 10",
          "weight": 0.5,
          "aliases": [
            "ifrs 10 control criteria",
            "power variable returns link"
          ]
        },
        {
          "concept": "consolidates parent and subsidiaries as single economic entity eliminates intra group",
          "weight": 0.5,
          "aliases": [
            "single economic entity concept",
            "eliminates intercompany balances"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "How is Goodwill on Acquisition calculated in business combinations according to IFRS 3?",
      "options": [],
      "correctAnswer": "Under IFRS 3, Goodwill is recognized at acquisition date as: Goodwill = Consideration Transferred + Non-Controlling Interest (NCI) + Fair Value of Previously Held Equity Interest - Net Identifiable Assets Acquired (at fair value). If the resulting amount is negative, it is recognized immediately in profit or loss as a Bargain Purchase Gain (negative goodwill).",
      "gradingPoints": [
        {
          "concept": "goodwill formula consideration plus nci minus fair value net identifiable assets",
          "weight": 0.6,
          "aliases": [
            "ifrs 3 goodwill formula",
            "acquisition goodwill calculation"
          ]
        },
        {
          "concept": "negative goodwill recognized immediately as bargain purchase gain in profit or loss",
          "weight": 0.4,
          "aliases": [
            "bargain purchase gain",
            "negative goodwill treatment"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain Non-Controlling Interest (NCI) and compare the Proportionate Share Method versus Fair Value (Full Goodwill) Method.",
      "options": [],
      "correctAnswer": "NCI represents the equity in a subsidiary not attributable, directly or indirectly, to a parent. Under the Proportionate Share method, NCI is measured at its proportionate share of the subsidiary net identifiable assets; goodwill calculated reflects only the parent share (partial goodwill). Under the Fair Value method, NCI is measured at fair value (including market share price); goodwill calculated reflects both parent and NCI shares (full goodwill).",
      "gradingPoints": [
        {
          "concept": "nci equity in subsidiary not attributable to parent",
          "weight": 0.3,
          "aliases": [
            "nci definition",
            "minority interest equity"
          ]
        },
        {
          "concept": "proportionate share measures nci at net asset share partial goodwill",
          "weight": 0.35,
          "aliases": [
            "proportionate method partial goodwill",
            "net assets proportion"
          ]
        },
        {
          "concept": "fair value method measures nci at market fair value full goodwill",
          "weight": 0.35,
          "aliases": [
            "fair value method full goodwill",
            "full goodwill recognition"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe how Intra-Group Unrealized Profit on Inventory is eliminated upon consolidation.",
      "options": [],
      "correctAnswer": "When a group company sells goods to another at a profit margin and some goods remain unsold in closing inventory at year end, the unrealized intra-group profit must be eliminated upon consolidation. The accounting entry debit the selling company profit (Retained Earnings or Cost of Sales) and credits consolidated Inventory on the Statement of Financial Position to reduce inventory back to original cost to the group.",
      "gradingPoints": [
        {
          "concept": "eliminates unrealized profit on unsold inventory held within group",
          "weight": 0.5,
          "aliases": [
            "provision for unrealized profit pup",
            "eliminating intercompany inventory profit"
          ]
        },
        {
          "concept": "debits retained earnings cost of sales credits consolidated inventory to cost",
          "weight": 0.5,
          "aliases": [
            "elimination journal entry",
            "reduces inventory to group cost"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the Equity Method of accounting for Investments in Associates under IAS 28.",
      "options": [],
      "correctAnswer": "An associate is an entity over which the investor has significant influence (typically holding 20% to 50% voting rights). Under the Equity Method, the investment is initially recognized at cost and subsequently adjusted for the investor post-acquisition share of the associate profit or loss (credited to profit or loss) and other comprehensive income, while dividends received reduce the carrying amount of the investment.",
      "gradingPoints": [
        {
          "concept": "significant influence holding 20 to 50 percent voting power",
          "weight": 0.4,
          "aliases": [
            "associate definition",
            "significant influence criteria"
          ]
        },
        {
          "concept": "initial cost adjusted for post acquisition share of profit dividends reduce carrying value",
          "weight": 0.6,
          "aliases": [
            "equity method mechanics",
            "share of profit increases investment dividends decrease"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe the accounting treatment of Leases under IFRS 16 from the lessee perspective.",
      "options": [],
      "correctAnswer": "IFRS 16 eliminates the operating vs finance lease distinction for lessees, introducing a single on-balance sheet model. At lease commencement, the lessee recognizes a Right-of-Use (ROU) Asset and a corresponding Lease Liability (measured at present value of future lease payments discounted at incremental borrowing rate). Subsequently, the ROU asset is depreciated over lease term, and interest expense is accrued on the lease liability.",
      "gradingPoints": [
        {
          "concept": "single on balance sheet model recognizing right of use asset and lease liability",
          "weight": 0.5,
          "aliases": [
            "rou asset and lease liability",
            "ifrs 16 on balance sheet model"
          ]
        },
        {
          "concept": "lease liability discounted present value rou asset depreciated interest on liability",
          "weight": 0.5,
          "aliases": [
            "subsequent measurement ifrs 16",
            "depreciation and interest expense split"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain Revenue from Contracts with Customers five-step model under IFRS 15.",
      "options": [],
      "correctAnswer": "The IFRS 15 five-step revenue model consists of: 1. Identify the contract with a customer; 2. Identify the performance obligations in the contract; 3. Determine the transaction price; 4. Allocate the transaction price to the performance obligations; and 5. Recognize revenue when (or as) the entity satisfies a performance obligation by transferring promised goods or services to the customer.",
      "gradingPoints": [
        {
          "concept": "five steps identify contract identify obligations determine price allocate price recognize revenue",
          "weight": 0.7,
          "aliases": [
            "ifrs 15 five steps",
            "revenue recognition five step model"
          ]
        },
        {
          "concept": "revenue recognized upon transfer of control satisfying performance obligation",
          "weight": 0.3,
          "aliases": [
            "satisfying performance obligation",
            "transfer of control to customer"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "What is Impairment of Assets according to IAS 36 and how is the Recoverable Amount determined?",
      "options": [],
      "correctAnswer": "An asset is impaired when its carrying amount exceeds its recoverable amount. Recoverable Amount is the higher of an asset Fair Value Less Costs of Disposal (net selling price) and its Value in Use (present value of estimated future cash flows expected from continuous use and ultimate disposal). If carrying amount exceeds recoverable amount, an impairment loss is recognized immediately in profit or loss.",
      "gradingPoints": [
        {
          "concept": "impairment occurs when carrying amount exceeds recoverable amount",
          "weight": 0.4,
          "aliases": [
            "ias 36 impairment definition",
            "carrying value exceeds recoverable"
          ]
        },
        {
          "concept": "recoverable amount is higher of fair value less costs to sell and value in use",
          "weight": 0.6,
          "aliases": [
            "recoverable amount definition",
            "higher of fv less costs and viu"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe Foreign Currency Translation under IAS 21: Functional Currency versus Presentation Currency.",
      "options": [],
      "correctAnswer": "Functional Currency is the currency of the primary economic environment in which the entity operates (influences sales prices and operating expenses). Presentation Currency is the currency in which financial statements are presented. When translating foreign operations: assets and liabilities are translated at closing spot rate at reporting date; income and expenses are translated at transaction (or average) exchange rates; resulting translation differences are recognized in Other Comprehensive Income (OCI).",
      "gradingPoints": [
        {
          "concept": "functional currency primary economic environment presentation currency reporting currency",
          "weight": 0.5,
          "aliases": [
            "functional vs presentation currency",
            "primary economic environment currency"
          ]
        },
        {
          "concept": "assets liabilities at closing rate income expenses at average differences in oci",
          "weight": 0.5,
          "aliases": [
            "translation rules ias 21",
            "closing rate assets average rate p&l oci reserve"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain Segment Reporting under IFRS 8 and the quantitative thresholds for reportable operating segments.",
      "options": [],
      "correctAnswer": "IFRS 8 requires entities to report financial and descriptive information about operating segments based on internal management reports reviewed by the Chief Operating Decision Maker (CODM). An operating segment is reportable if it meets any 10% quantitative threshold: reported revenue is 10%+ of combined internal/external revenue, reported profit/loss is 10%+ of absolute combined profit/loss, or assets are 10%+ of combined assets.",
      "gradingPoints": [
        {
          "concept": "management approach segments identified by codm internal reporting",
          "weight": 0.5,
          "aliases": [
            "codm management approach",
            "chief operating decision maker reports"
          ]
        },
        {
          "concept": "10 percent thresholds for revenue profit loss or assets",
          "weight": 0.5,
          "aliases": [
            "10% quantitative thresholds",
            "10 percent revenue profit asset rule"
          ]
        }
      ]
    },
      {
      "type": "cbt",
      "question": "In the study of Advanced Financial Accounting & Reporting (ACC 401), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Advanced Financial Accounting & Reporting in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Advanced Financial Accounting & Reporting in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Advanced Financial Accounting & Reporting?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Advanced Financial Accounting & Reporting."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Advanced Financial Accounting & Reporting."
    },
      {
      "type": "cbt",
      "question": "At 400 level in ACC 401 (Advanced Financial Accounting & Reporting), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Advanced Financial Accounting & Reporting?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Advanced Financial Accounting & Reporting (ACC 401)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    }
    ],
  },
  {
    code: "ACC 499",
    title: "B.Sc. Final Year Project II",
    level: 400,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of B.Sc. Final Year Project (ACC 499), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing B.Sc. Final Year Project in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing B.Sc. Final Year Project in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in B.Sc. Final Year Project?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to B.Sc. Final Year Project."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to B.Sc. Final Year Project."
    },
      {
      "type": "cbt",
      "question": "At 400 level in ACC 499 (B.Sc. Final Year Project), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in B.Sc. Final Year Project?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in B.Sc. Final Year Project (ACC 499)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of B.Sc. Final Year Project (ACC 499) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "B.Sc. Final Year Project is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in B.Sc. Final Year Project for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in B.Sc. Final Year Project integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to B.Sc. Final Year Project (ACC 499) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern B.Sc. Final Year Project.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in B.Sc. Final Year Project guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting B.Sc. Final Year Project at the 400 level.",
      "options": [],
      "correctAnswer": "Recent advancements in B.Sc. Final Year Project leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Formulate a structured step-by-step framework for diagnosing and resolving a major operational failure in B.Sc. Final Year Project.",
      "options": [],
      "correctAnswer": "A structured diagnostic framework involves: (1) Problem definition and baseline data acquisition, (2) Root cause identification using diagnostic tools, (3) Formulation of evidence-based corrective interventions, (4) Controlled execution, and (5) Post-implementation verification and documentation.",
      "gradingPoints": [
        {
          "concept": "problem definition and root cause identification",
          "weight": 0.5,
          "aliases": [
            "problem identification",
            "data acquisition",
            "root cause analysis"
          ]
        },
        {
          "concept": "corrective interventions and verification documentation",
          "weight": 0.5,
          "aliases": [
            "implementation of solutions",
            "post verification",
            "standard documentation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Compare and contrast two prevailing models or theoretical paradigms used in B.Sc. Final Year Project (ACC 499).",
      "options": [],
      "correctAnswer": "Model A focuses primarily on deterministic, classical approaches offering exact analytical solutions under controlled boundary conditions, whereas Model B incorporates stochastic, adaptive, or empirical elements accommodating real-world uncertainty and dynamic perturbations.",
      "gradingPoints": [
        {
          "concept": "deterministic classical model principles and boundaries",
          "weight": 0.5,
          "aliases": [
            "deterministic approach",
            "exact analytical solutions",
            "model a analysis"
          ]
        },
        {
          "concept": "stochastic adaptive model characteristics and uncertainty handling",
          "weight": 0.5,
          "aliases": [
            "stochastic paradigm",
            "adaptive modeling",
            "empirical elements"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the mathematical or quantitative principles underpinning performance evaluation in B.Sc. Final Year Project.",
      "options": [],
      "correctAnswer": "Performance evaluation relies on quantitative relationships governing rate of progress, efficiency ratios, variance metrics, and sensitivity coefficients. Mathematical formulations quantify throughput, resource consumption, and reliability margins under varying load conditions.",
      "gradingPoints": [
        {
          "concept": "efficiency ratios and variance metrics",
          "weight": 0.5,
          "aliases": [
            "quantitative formulations",
            "rate equations",
            "efficiency calculations"
          ]
        },
        {
          "concept": "reliability margins and sensitivity coefficients",
          "weight": 0.5,
          "aliases": [
            "sensitivity analysis",
            "performance metrics",
            "load evaluation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe the role of interdisciplinary integration between B.Sc. Final Year Project and related contemporary scientific or technological disciplines.",
      "options": [],
      "correctAnswer": "Interdisciplinary synthesis combines insights from computing, management sciences, and physical/biological systems to enrich B.Sc. Final Year Project. This cross-pollination yields robust hybrid architectures, comprehensive lifecycle assessment, and innovative solutions to multidimensional societal challenges.",
      "gradingPoints": [
        {
          "concept": "cross disciplinary synthesis with computing and physical sciences",
          "weight": 0.5,
          "aliases": [
            "interdisciplinary integration",
            "cross pollination",
            "hybrid methodologies"
          ]
        },
        {
          "concept": "lifecycle assessment and multidimensional problem solving",
          "weight": 0.5,
          "aliases": [
            "lifecycle analysis",
            "societal problem solving",
            "robust architectures"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Synthesize the primary criteria required for conducting rigorous academic research or final project execution in B.Sc. Final Year Project (ACC 499).",
      "options": [],
      "correctAnswer": "Rigorous academic research in B.Sc. Final Year Project mandates formulating a well-defined research problem, conducting an exhaustive literature review, designing an airtight experimental or computational methodology, performing rigorous statistical verification, and drawing defensible academic conclusions.",
      "gradingPoints": [
        {
          "concept": "research problem formulation and methodological design",
          "weight": 0.5,
          "aliases": [
            "problem definition",
            "experimental design",
            "methodology"
          ]
        },
        {
          "concept": "statistical verification and defensible academic conclusions",
          "weight": 0.5,
          "aliases": [
            "data analysis",
            "statistical validation",
            "thesis conclusions"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ACC 501",
    title: "Advanced Forensic Accounting and Fraud Examination",
    level: 500,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Advanced Forensic Accounting and Fraud Examination (ACC 501), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Advanced Forensic Accounting and Fraud Examination in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Advanced Forensic Accounting and Fraud Examination in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Advanced Forensic Accounting and Fraud Examination?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Advanced Forensic Accounting and Fraud Examination."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Advanced Forensic Accounting and Fraud Examination."
    },
      {
      "type": "cbt",
      "question": "At 500 level in ACC 501 (Advanced Forensic Accounting and Fraud Examination), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Advanced Forensic Accounting and Fraud Examination?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Advanced Forensic Accounting and Fraud Examination (ACC 501)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Advanced Forensic Accounting and Fraud Examination (ACC 501) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Advanced Forensic Accounting and Fraud Examination is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Advanced Forensic Accounting and Fraud Examination for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Advanced Forensic Accounting and Fraud Examination integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Advanced Forensic Accounting and Fraud Examination (ACC 501) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Advanced Forensic Accounting and Fraud Examination.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Advanced Forensic Accounting and Fraud Examination guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Advanced Forensic Accounting and Fraud Examination at the 500 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Advanced Forensic Accounting and Fraud Examination leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Formulate a structured step-by-step framework for diagnosing and resolving a major operational failure in Advanced Forensic Accounting and Fraud Examination.",
      "options": [],
      "correctAnswer": "A structured diagnostic framework involves: (1) Problem definition and baseline data acquisition, (2) Root cause identification using diagnostic tools, (3) Formulation of evidence-based corrective interventions, (4) Controlled execution, and (5) Post-implementation verification and documentation.",
      "gradingPoints": [
        {
          "concept": "problem definition and root cause identification",
          "weight": 0.5,
          "aliases": [
            "problem identification",
            "data acquisition",
            "root cause analysis"
          ]
        },
        {
          "concept": "corrective interventions and verification documentation",
          "weight": 0.5,
          "aliases": [
            "implementation of solutions",
            "post verification",
            "standard documentation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Compare and contrast two prevailing models or theoretical paradigms used in Advanced Forensic Accounting and Fraud Examination (ACC 501).",
      "options": [],
      "correctAnswer": "Model A focuses primarily on deterministic, classical approaches offering exact analytical solutions under controlled boundary conditions, whereas Model B incorporates stochastic, adaptive, or empirical elements accommodating real-world uncertainty and dynamic perturbations.",
      "gradingPoints": [
        {
          "concept": "deterministic classical model principles and boundaries",
          "weight": 0.5,
          "aliases": [
            "deterministic approach",
            "exact analytical solutions",
            "model a analysis"
          ]
        },
        {
          "concept": "stochastic adaptive model characteristics and uncertainty handling",
          "weight": 0.5,
          "aliases": [
            "stochastic paradigm",
            "adaptive modeling",
            "empirical elements"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the mathematical or quantitative principles underpinning performance evaluation in Advanced Forensic Accounting and Fraud Examination.",
      "options": [],
      "correctAnswer": "Performance evaluation relies on quantitative relationships governing rate of progress, efficiency ratios, variance metrics, and sensitivity coefficients. Mathematical formulations quantify throughput, resource consumption, and reliability margins under varying load conditions.",
      "gradingPoints": [
        {
          "concept": "efficiency ratios and variance metrics",
          "weight": 0.5,
          "aliases": [
            "quantitative formulations",
            "rate equations",
            "efficiency calculations"
          ]
        },
        {
          "concept": "reliability margins and sensitivity coefficients",
          "weight": 0.5,
          "aliases": [
            "sensitivity analysis",
            "performance metrics",
            "load evaluation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe the role of interdisciplinary integration between Advanced Forensic Accounting and Fraud Examination and related contemporary scientific or technological disciplines.",
      "options": [],
      "correctAnswer": "Interdisciplinary synthesis combines insights from computing, management sciences, and physical/biological systems to enrich Advanced Forensic Accounting and Fraud Examination. This cross-pollination yields robust hybrid architectures, comprehensive lifecycle assessment, and innovative solutions to multidimensional societal challenges.",
      "gradingPoints": [
        {
          "concept": "cross disciplinary synthesis with computing and physical sciences",
          "weight": 0.5,
          "aliases": [
            "interdisciplinary integration",
            "cross pollination",
            "hybrid methodologies"
          ]
        },
        {
          "concept": "lifecycle assessment and multidimensional problem solving",
          "weight": 0.5,
          "aliases": [
            "lifecycle analysis",
            "societal problem solving",
            "robust architectures"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Synthesize the primary criteria required for conducting rigorous academic research or final project execution in Advanced Forensic Accounting and Fraud Examination (ACC 501).",
      "options": [],
      "correctAnswer": "Rigorous academic research in Advanced Forensic Accounting and Fraud Examination mandates formulating a well-defined research problem, conducting an exhaustive literature review, designing an airtight experimental or computational methodology, performing rigorous statistical verification, and drawing defensible academic conclusions.",
      "gradingPoints": [
        {
          "concept": "research problem formulation and methodological design",
          "weight": 0.5,
          "aliases": [
            "problem definition",
            "experimental design",
            "methodology"
          ]
        },
        {
          "concept": "statistical verification and defensible academic conclusions",
          "weight": 0.5,
          "aliases": [
            "data analysis",
            "statistical validation",
            "thesis conclusions"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ACC 503",
    title: "International Accounting & Financial Reporting Standards (IFRS)",
    level: 500,
    semester: "harmattan",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of International Accounting & Financial Reporting Standards (IFRS) (ACC 503), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing International Accounting & Financial Reporting Standards (IFRS) in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing International Accounting & Financial Reporting Standards (IFRS) in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in International Accounting & Financial Reporting Standards (IFRS)?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to International Accounting & Financial Reporting Standards (IFRS)."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to International Accounting & Financial Reporting Standards (IFRS)."
    },
      {
      "type": "cbt",
      "question": "At 500 level in ACC 503 (International Accounting & Financial Reporting Standards (IFRS)), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in International Accounting & Financial Reporting Standards (IFRS)?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in International Accounting & Financial Reporting Standards (IFRS) (ACC 503)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of International Accounting & Financial Reporting Standards (IFRS) (ACC 503) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "International Accounting & Financial Reporting Standards (IFRS) is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in International Accounting & Financial Reporting Standards (IFRS) for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in International Accounting & Financial Reporting Standards (IFRS) integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to International Accounting & Financial Reporting Standards (IFRS) (ACC 503) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern International Accounting & Financial Reporting Standards (IFRS).",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in International Accounting & Financial Reporting Standards (IFRS) guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting International Accounting & Financial Reporting Standards (IFRS) at the 500 level.",
      "options": [],
      "correctAnswer": "Recent advancements in International Accounting & Financial Reporting Standards (IFRS) leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Formulate a structured step-by-step framework for diagnosing and resolving a major operational failure in International Accounting & Financial Reporting Standards (IFRS).",
      "options": [],
      "correctAnswer": "A structured diagnostic framework involves: (1) Problem definition and baseline data acquisition, (2) Root cause identification using diagnostic tools, (3) Formulation of evidence-based corrective interventions, (4) Controlled execution, and (5) Post-implementation verification and documentation.",
      "gradingPoints": [
        {
          "concept": "problem definition and root cause identification",
          "weight": 0.5,
          "aliases": [
            "problem identification",
            "data acquisition",
            "root cause analysis"
          ]
        },
        {
          "concept": "corrective interventions and verification documentation",
          "weight": 0.5,
          "aliases": [
            "implementation of solutions",
            "post verification",
            "standard documentation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Compare and contrast two prevailing models or theoretical paradigms used in International Accounting & Financial Reporting Standards (IFRS) (ACC 503).",
      "options": [],
      "correctAnswer": "Model A focuses primarily on deterministic, classical approaches offering exact analytical solutions under controlled boundary conditions, whereas Model B incorporates stochastic, adaptive, or empirical elements accommodating real-world uncertainty and dynamic perturbations.",
      "gradingPoints": [
        {
          "concept": "deterministic classical model principles and boundaries",
          "weight": 0.5,
          "aliases": [
            "deterministic approach",
            "exact analytical solutions",
            "model a analysis"
          ]
        },
        {
          "concept": "stochastic adaptive model characteristics and uncertainty handling",
          "weight": 0.5,
          "aliases": [
            "stochastic paradigm",
            "adaptive modeling",
            "empirical elements"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the mathematical or quantitative principles underpinning performance evaluation in International Accounting & Financial Reporting Standards (IFRS).",
      "options": [],
      "correctAnswer": "Performance evaluation relies on quantitative relationships governing rate of progress, efficiency ratios, variance metrics, and sensitivity coefficients. Mathematical formulations quantify throughput, resource consumption, and reliability margins under varying load conditions.",
      "gradingPoints": [
        {
          "concept": "efficiency ratios and variance metrics",
          "weight": 0.5,
          "aliases": [
            "quantitative formulations",
            "rate equations",
            "efficiency calculations"
          ]
        },
        {
          "concept": "reliability margins and sensitivity coefficients",
          "weight": 0.5,
          "aliases": [
            "sensitivity analysis",
            "performance metrics",
            "load evaluation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe the role of interdisciplinary integration between International Accounting & Financial Reporting Standards (IFRS) and related contemporary scientific or technological disciplines.",
      "options": [],
      "correctAnswer": "Interdisciplinary synthesis combines insights from computing, management sciences, and physical/biological systems to enrich International Accounting & Financial Reporting Standards (IFRS). This cross-pollination yields robust hybrid architectures, comprehensive lifecycle assessment, and innovative solutions to multidimensional societal challenges.",
      "gradingPoints": [
        {
          "concept": "cross disciplinary synthesis with computing and physical sciences",
          "weight": 0.5,
          "aliases": [
            "interdisciplinary integration",
            "cross pollination",
            "hybrid methodologies"
          ]
        },
        {
          "concept": "lifecycle assessment and multidimensional problem solving",
          "weight": 0.5,
          "aliases": [
            "lifecycle analysis",
            "societal problem solving",
            "robust architectures"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Synthesize the primary criteria required for conducting rigorous academic research or final project execution in International Accounting & Financial Reporting Standards (IFRS) (ACC 503).",
      "options": [],
      "correctAnswer": "Rigorous academic research in International Accounting & Financial Reporting Standards (IFRS) mandates formulating a well-defined research problem, conducting an exhaustive literature review, designing an airtight experimental or computational methodology, performing rigorous statistical verification, and drawing defensible academic conclusions.",
      "gradingPoints": [
        {
          "concept": "research problem formulation and methodological design",
          "weight": 0.5,
          "aliases": [
            "problem definition",
            "experimental design",
            "methodology"
          ]
        },
        {
          "concept": "statistical verification and defensible academic conclusions",
          "weight": 0.5,
          "aliases": [
            "data analysis",
            "statistical validation",
            "thesis conclusions"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ACC 502",
    title: "Strategic Financial Management & Corporate Governance",
    level: 500,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of Strategic Financial Management & Corporate Governance (ACC 502), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing Strategic Financial Management & Corporate Governance in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing Strategic Financial Management & Corporate Governance in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in Strategic Financial Management & Corporate Governance?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to Strategic Financial Management & Corporate Governance."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to Strategic Financial Management & Corporate Governance."
    },
      {
      "type": "cbt",
      "question": "At 500 level in ACC 502 (Strategic Financial Management & Corporate Governance), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in Strategic Financial Management & Corporate Governance?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in Strategic Financial Management & Corporate Governance (ACC 502)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of Strategic Financial Management & Corporate Governance (ACC 502) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "Strategic Financial Management & Corporate Governance is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in Strategic Financial Management & Corporate Governance for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in Strategic Financial Management & Corporate Governance integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to Strategic Financial Management & Corporate Governance (ACC 502) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern Strategic Financial Management & Corporate Governance.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in Strategic Financial Management & Corporate Governance guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting Strategic Financial Management & Corporate Governance at the 500 level.",
      "options": [],
      "correctAnswer": "Recent advancements in Strategic Financial Management & Corporate Governance leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Formulate a structured step-by-step framework for diagnosing and resolving a major operational failure in Strategic Financial Management & Corporate Governance.",
      "options": [],
      "correctAnswer": "A structured diagnostic framework involves: (1) Problem definition and baseline data acquisition, (2) Root cause identification using diagnostic tools, (3) Formulation of evidence-based corrective interventions, (4) Controlled execution, and (5) Post-implementation verification and documentation.",
      "gradingPoints": [
        {
          "concept": "problem definition and root cause identification",
          "weight": 0.5,
          "aliases": [
            "problem identification",
            "data acquisition",
            "root cause analysis"
          ]
        },
        {
          "concept": "corrective interventions and verification documentation",
          "weight": 0.5,
          "aliases": [
            "implementation of solutions",
            "post verification",
            "standard documentation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Compare and contrast two prevailing models or theoretical paradigms used in Strategic Financial Management & Corporate Governance (ACC 502).",
      "options": [],
      "correctAnswer": "Model A focuses primarily on deterministic, classical approaches offering exact analytical solutions under controlled boundary conditions, whereas Model B incorporates stochastic, adaptive, or empirical elements accommodating real-world uncertainty and dynamic perturbations.",
      "gradingPoints": [
        {
          "concept": "deterministic classical model principles and boundaries",
          "weight": 0.5,
          "aliases": [
            "deterministic approach",
            "exact analytical solutions",
            "model a analysis"
          ]
        },
        {
          "concept": "stochastic adaptive model characteristics and uncertainty handling",
          "weight": 0.5,
          "aliases": [
            "stochastic paradigm",
            "adaptive modeling",
            "empirical elements"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the mathematical or quantitative principles underpinning performance evaluation in Strategic Financial Management & Corporate Governance.",
      "options": [],
      "correctAnswer": "Performance evaluation relies on quantitative relationships governing rate of progress, efficiency ratios, variance metrics, and sensitivity coefficients. Mathematical formulations quantify throughput, resource consumption, and reliability margins under varying load conditions.",
      "gradingPoints": [
        {
          "concept": "efficiency ratios and variance metrics",
          "weight": 0.5,
          "aliases": [
            "quantitative formulations",
            "rate equations",
            "efficiency calculations"
          ]
        },
        {
          "concept": "reliability margins and sensitivity coefficients",
          "weight": 0.5,
          "aliases": [
            "sensitivity analysis",
            "performance metrics",
            "load evaluation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe the role of interdisciplinary integration between Strategic Financial Management & Corporate Governance and related contemporary scientific or technological disciplines.",
      "options": [],
      "correctAnswer": "Interdisciplinary synthesis combines insights from computing, management sciences, and physical/biological systems to enrich Strategic Financial Management & Corporate Governance. This cross-pollination yields robust hybrid architectures, comprehensive lifecycle assessment, and innovative solutions to multidimensional societal challenges.",
      "gradingPoints": [
        {
          "concept": "cross disciplinary synthesis with computing and physical sciences",
          "weight": 0.5,
          "aliases": [
            "interdisciplinary integration",
            "cross pollination",
            "hybrid methodologies"
          ]
        },
        {
          "concept": "lifecycle assessment and multidimensional problem solving",
          "weight": 0.5,
          "aliases": [
            "lifecycle analysis",
            "societal problem solving",
            "robust architectures"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Synthesize the primary criteria required for conducting rigorous academic research or final project execution in Strategic Financial Management & Corporate Governance (ACC 502).",
      "options": [],
      "correctAnswer": "Rigorous academic research in Strategic Financial Management & Corporate Governance mandates formulating a well-defined research problem, conducting an exhaustive literature review, designing an airtight experimental or computational methodology, performing rigorous statistical verification, and drawing defensible academic conclusions.",
      "gradingPoints": [
        {
          "concept": "research problem formulation and methodological design",
          "weight": 0.5,
          "aliases": [
            "problem definition",
            "experimental design",
            "methodology"
          ]
        },
        {
          "concept": "statistical verification and defensible academic conclusions",
          "weight": 0.5,
          "aliases": [
            "data analysis",
            "statistical validation",
            "thesis conclusions"
          ]
        }
      ]
    }
    ],
  },
  {
    code: "ACC 599",
    title: "B.Sc. Final Year Project II",
    level: 500,
    semester: "rain",
    questions: [
      {
      "type": "cbt",
      "question": "In the study of B.Sc. Final Year Project (ACC 599), what is the primary fundamental objective of this domain?",
      "options": [
        "To replace scientific and theoretical methodology with casual approximations.",
        "To eliminate all standard operational procedures and empirical guidelines.",
        "To exclusively record historical narrative without analytical or quantitative methods.",
        "To systematically analyze and apply principles governing B.Sc. Final Year Project in academic and practical contexts."
      ],
      "correctAnswer": "To systematically analyze and apply principles governing B.Sc. Final Year Project in academic and practical contexts."
    },
      {
      "type": "cbt",
      "question": "Which of the following represents a core theoretical concept examined in B.Sc. Final Year Project?",
      "options": [
        "Random classification without systematic categorization.",
        "Disregarding standard validation metrics and professional benchmarks.",
        "Unregulated trial-and-error without empirical evaluation.",
        "The foundational principles, standard models, and operational frameworks specific to B.Sc. Final Year Project."
      ],
      "correctAnswer": "The foundational principles, standard models, and operational frameworks specific to B.Sc. Final Year Project."
    },
      {
      "type": "cbt",
      "question": "At 500 level in ACC 599 (B.Sc. Final Year Project), how is rigorous methodological evaluation typically performed?",
      "options": [
        "By applying validated discipline-standard analytical tools, formulas, and structural guidelines.",
        "By guessing parameters without experimental or mathematical justification.",
        "By relying solely on subjective informal discussions.",
        "By bypassing all quality control and peer-reviewed protocols."
      ],
      "correctAnswer": "By applying validated discipline-standard analytical tools, formulas, and structural guidelines."
    },
      {
      "type": "cbt",
      "question": "What is the significance of error control and validation in B.Sc. Final Year Project?",
      "options": [
        "It prevents researchers from publishing innovative discoveries.",
        "It is completely unnecessary in modern professional practice.",
        "It artificially inflates computational complexity without measurable benefit.",
        "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
      ],
      "correctAnswer": "It ensures reliability, repeatability, and consistency across theoretical and experimental applications."
    },
      {
      "type": "cbt",
      "question": "Which standard metric or indicator is essential when evaluating outcomes in B.Sc. Final Year Project (ACC 599)?",
      "options": [
        "Outdated conventions with no relevance to current standards.",
        "Arbitrary threshold levels determined without reference data.",
        "Subjective intuition devoid of quantitative or qualitative evidence.",
        "Standardized benchmarks aligned with professional, ethical, and academic requirements."
      ],
      "correctAnswer": "Standardized benchmarks aligned with professional, ethical, and academic requirements."
    },
      {
      "type": "theory",
      "question": "Explain the fundamental theoretical foundation of B.Sc. Final Year Project (ACC 599) and describe its core operational principles.",
      "options": [],
      "correctAnswer": "B.Sc. Final Year Project is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.",
      "gradingPoints": [
        {
          "concept": "theoretical foundation and conceptual framework",
          "weight": 0.5,
          "aliases": [
            "theoretical basis",
            "core concepts",
            "foundational principles"
          ]
        },
        {
          "concept": "operational principles and standardized validation",
          "weight": 0.5,
          "aliases": [
            "operational methodology",
            "validation standards",
            "practical implementation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Analyze the critical methodologies and analytical tools utilized in B.Sc. Final Year Project for problem resolution and system optimization.",
      "options": [],
      "correctAnswer": "Methodologies in B.Sc. Final Year Project integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.",
      "gradingPoints": [
        {
          "concept": "quantitative modeling and empirical observation",
          "weight": 0.5,
          "aliases": [
            "analytical modeling",
            "structured methodology",
            "empirical tools"
          ]
        },
        {
          "concept": "optimization algorithms and performance benchmarking",
          "weight": 0.5,
          "aliases": [
            "performance evaluation",
            "system optimization",
            "solution reliability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Discuss the key challenges, safety constraints, or ethical considerations inherent to B.Sc. Final Year Project (ACC 599) and outline mitigation strategies.",
      "options": [],
      "correctAnswer": "Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.",
      "gradingPoints": [
        {
          "concept": "operational challenges and ethical responsibilities",
          "weight": 0.5,
          "aliases": [
            "system constraints",
            "professional ethics",
            "safety considerations"
          ]
        },
        {
          "concept": "mitigation strategies and risk management",
          "weight": 0.5,
          "aliases": [
            "risk control",
            "preventive measures",
            "auditing standards"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Evaluate the role of standardization, quality assurance, and regulatory compliance in modern B.Sc. Final Year Project.",
      "options": [],
      "correctAnswer": "Standardization and quality assurance in B.Sc. Final Year Project guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.",
      "gradingPoints": [
        {
          "concept": "standardization and quality assurance frameworks",
          "weight": 0.5,
          "aliases": [
            "qa standards",
            "interoperability",
            "structural integrity"
          ]
        },
        {
          "concept": "regulatory compliance and statutory codes",
          "weight": 0.5,
          "aliases": [
            "statutory compliance",
            "national guidelines",
            "risk reduction"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Examine the evolutionary trajectory and recent technological or research innovations impacting B.Sc. Final Year Project at the 500 level.",
      "options": [],
      "correctAnswer": "Recent advancements in B.Sc. Final Year Project leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.",
      "gradingPoints": [
        {
          "concept": "evolutionary advancements and digital integration",
          "weight": 0.5,
          "aliases": [
            "technological innovations",
            "computational modeling",
            "modern advancements"
          ]
        },
        {
          "concept": "data driven decision making and sustainable practices",
          "weight": 0.5,
          "aliases": [
            "precision enhancement",
            "scalability",
            "sustainability"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Formulate a structured step-by-step framework for diagnosing and resolving a major operational failure in B.Sc. Final Year Project.",
      "options": [],
      "correctAnswer": "A structured diagnostic framework involves: (1) Problem definition and baseline data acquisition, (2) Root cause identification using diagnostic tools, (3) Formulation of evidence-based corrective interventions, (4) Controlled execution, and (5) Post-implementation verification and documentation.",
      "gradingPoints": [
        {
          "concept": "problem definition and root cause identification",
          "weight": 0.5,
          "aliases": [
            "problem identification",
            "data acquisition",
            "root cause analysis"
          ]
        },
        {
          "concept": "corrective interventions and verification documentation",
          "weight": 0.5,
          "aliases": [
            "implementation of solutions",
            "post verification",
            "standard documentation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Compare and contrast two prevailing models or theoretical paradigms used in B.Sc. Final Year Project (ACC 599).",
      "options": [],
      "correctAnswer": "Model A focuses primarily on deterministic, classical approaches offering exact analytical solutions under controlled boundary conditions, whereas Model B incorporates stochastic, adaptive, or empirical elements accommodating real-world uncertainty and dynamic perturbations.",
      "gradingPoints": [
        {
          "concept": "deterministic classical model principles and boundaries",
          "weight": 0.5,
          "aliases": [
            "deterministic approach",
            "exact analytical solutions",
            "model a analysis"
          ]
        },
        {
          "concept": "stochastic adaptive model characteristics and uncertainty handling",
          "weight": 0.5,
          "aliases": [
            "stochastic paradigm",
            "adaptive modeling",
            "empirical elements"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Explain the mathematical or quantitative principles underpinning performance evaluation in B.Sc. Final Year Project.",
      "options": [],
      "correctAnswer": "Performance evaluation relies on quantitative relationships governing rate of progress, efficiency ratios, variance metrics, and sensitivity coefficients. Mathematical formulations quantify throughput, resource consumption, and reliability margins under varying load conditions.",
      "gradingPoints": [
        {
          "concept": "efficiency ratios and variance metrics",
          "weight": 0.5,
          "aliases": [
            "quantitative formulations",
            "rate equations",
            "efficiency calculations"
          ]
        },
        {
          "concept": "reliability margins and sensitivity coefficients",
          "weight": 0.5,
          "aliases": [
            "sensitivity analysis",
            "performance metrics",
            "load evaluation"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Describe the role of interdisciplinary integration between B.Sc. Final Year Project and related contemporary scientific or technological disciplines.",
      "options": [],
      "correctAnswer": "Interdisciplinary synthesis combines insights from computing, management sciences, and physical/biological systems to enrich B.Sc. Final Year Project. This cross-pollination yields robust hybrid architectures, comprehensive lifecycle assessment, and innovative solutions to multidimensional societal challenges.",
      "gradingPoints": [
        {
          "concept": "cross disciplinary synthesis with computing and physical sciences",
          "weight": 0.5,
          "aliases": [
            "interdisciplinary integration",
            "cross pollination",
            "hybrid methodologies"
          ]
        },
        {
          "concept": "lifecycle assessment and multidimensional problem solving",
          "weight": 0.5,
          "aliases": [
            "lifecycle analysis",
            "societal problem solving",
            "robust architectures"
          ]
        }
      ]
    },
      {
      "type": "theory",
      "question": "Synthesize the primary criteria required for conducting rigorous academic research or final project execution in B.Sc. Final Year Project (ACC 599).",
      "options": [],
      "correctAnswer": "Rigorous academic research in B.Sc. Final Year Project mandates formulating a well-defined research problem, conducting an exhaustive literature review, designing an airtight experimental or computational methodology, performing rigorous statistical verification, and drawing defensible academic conclusions.",
      "gradingPoints": [
        {
          "concept": "research problem formulation and methodological design",
          "weight": 0.5,
          "aliases": [
            "problem definition",
            "experimental design",
            "methodology"
          ]
        },
        {
          "concept": "statistical verification and defensible academic conclusions",
          "weight": 0.5,
          "aliases": [
            "data analysis",
            "statistical validation",
            "thesis conclusions"
          ]
        }
      ]
    }
    ],
  }
];
