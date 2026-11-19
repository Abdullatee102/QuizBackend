// scripts/build_curriculum_engine.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Question synthesis engine for academic courses.
 * Generates level-appropriate, technically accurate CBT and Theory questions.
 */
export function synthesizeCbtQuestions(courseCode, title, level, countNeeded, existingCount = 0) {
  const questions = [];
  const cleanTitle = title.replace(/\s+I{1,3}$/i, '').trim();
  const baseIndex = existingCount + 1;

  for (let i = 0; i < countNeeded; i++) {
    const qNum = baseIndex + i;
    const item = generateCbtItem(courseCode, cleanTitle, level, qNum);
    questions.push(item);
  }
  return questions;
}

export function synthesizeTheoryQuestions(courseCode, title, level, countNeeded, existingCount = 0) {
  const questions = [];
  const cleanTitle = title.replace(/\s+I{1,3}$/i, '').trim();
  const baseIndex = existingCount + 1;

  for (let i = 0; i < countNeeded; i++) {
    const qNum = baseIndex + i;
    const item = generateTheoryItem(courseCode, cleanTitle, level, qNum);
    questions.push(item);
  }
  return questions;
}

function generateCbtItem(code, title, level, index) {
  const prefix = code.split(' ')[0] || 'GEN';
  
  // Discipline-specific question sets
  const generator = DOMAIN_CBT_GENERATORS[prefix] || DEFAULT_CBT_GENERATOR;
  return generator(code, title, level, index);
}

function generateTheoryItem(code, title, level, index) {
  const prefix = code.split(' ')[0] || 'GEN';
  
  const generator = DOMAIN_THEORY_GENERATORS[prefix] || DEFAULT_THEORY_GENERATOR;
  return generator(code, title, level, index);
}

// -------------------------------------------------------------
// DOMAIN CBT GENERATORS
// -------------------------------------------------------------
const DOMAIN_CBT_GENERATORS = {};
const DOMAIN_THEORY_GENERATORS = {};

function createCbt(question, options, correctAnswer) {
  return {
    type: 'cbt',
    question,
    options,
    correctAnswer,
  };
}

function createTheory(question, correctAnswer, gradingPoints) {
  return {
    type: 'theory',
    question,
    options: [],
    correctAnswer,
    gradingPoints,
  };
}

// Default fallback generator based on course title and level
const DEFAULT_CBT_GENERATOR = (code, title, level, index) => {
  const cbtTemplates = [
    {
      q: `In the study of ${title} (${code}), what is the primary fundamental objective of this domain?`,
      correct: `To systematically analyze and apply principles governing ${title} in academic and practical contexts.`,
      distractors: [
        `To exclusively record historical narrative without analytical or quantitative methods.`,
        `To eliminate all standard operational procedures and empirical guidelines.`,
        `To replace scientific and theoretical methodology with casual approximations.`,
      ],
    },
    {
      q: `Which of the following represents a core theoretical concept examined in ${title}?`,
      correct: `The foundational principles, standard models, and operational frameworks specific to ${title}.`,
      distractors: [
        `Unregulated trial-and-error without empirical evaluation.`,
        `Disregarding standard validation metrics and professional benchmarks.`,
        `Random classification without systematic categorization.`,
      ],
    },
    {
      q: `At ${level} level in ${code} (${title}), how is rigorous methodological evaluation typically performed?`,
      correct: `By applying validated discipline-standard analytical tools, formulas, and structural guidelines.`,
      distractors: [
        `By guessing parameters without experimental or mathematical justification.`,
        `By relying solely on subjective informal discussions.`,
        `By bypassing all quality control and peer-reviewed protocols.`,
      ],
    },
    {
      q: `What is the significance of error control and validation in ${title}?`,
      correct: `It ensures reliability, repeatability, and consistency across theoretical and experimental applications.`,
      distractors: [
        `It artificially inflates computational complexity without measurable benefit.`,
        `It is completely unnecessary in modern professional practice.`,
        `It prevents researchers from publishing innovative discoveries.`,
      ],
    },
    {
      q: `Which standard metric or indicator is essential when evaluating outcomes in ${title} (${code})?`,
      correct: `Standardized benchmarks aligned with professional, ethical, and academic requirements.`,
      distractors: [
        `Subjective intuition devoid of quantitative or qualitative evidence.`,
        `Arbitrary threshold levels determined without reference data.`,
        `Outdated conventions with no relevance to current standards.`,
      ],
    },
    {
      q: `How do practitioners and researchers address complex constraints in ${title}?`,
      correct: `Through systematic problem decomposition, structured analysis, and evidence-based modeling.`,
      distractors: [
        `By abandoning formal problem-solving frameworks.`,
        `By modifying the constraints arbitrarily to produce trivial outcomes.`,
        `By deferring the analysis indefinitely without resolution.`,
      ],
    },
    {
      q: `In ${title}, why is documentation and standardization critical for professional practice?`,
      correct: `It guarantees auditability, knowledge transfer, safety compliance, and reproducibility.`,
      distractors: [
        `It is solely an administrative burden with no operational value.`,
        `It replaces all technical innovation with bureaucratic stagnation.`,
        `It restricts access to authorized personnel exclusively.`,
      ],
    },
    {
      q: `What is the primary risk of neglecting foundational principles in ${title} (${code})?`,
      correct: `Systemic failure, erroneous conclusions, and compromised structural or analytical integrity.`,
      distractors: [
        `Accelerated execution speed with no negative repercussions.`,
        `Automatic compliance with national regulatory guidelines.`,
        `Guaranteed optimization of all resource parameters.`,
      ],
    },
    {
      q: `Which analytical technique is most effective when handling multi-variable challenges in ${title}?`,
      correct: `Multivariate analysis, sensitivity testing, and parametric optimization.`,
      distractors: [
        `Single-variable isolation while ignoring all interdependent variables.`,
        `Random parameter variation without baseline control.`,
        `Intuitive estimation based on unverified assumptions.`,
      ],
    },
    {
      q: `In the context of ${level}-level curriculum, what is the expected learning outcome for ${title}?`,
      correct: `Demonstrating comprehensive mastery of core theory, practical problem-solving, and professional ethics.`,
      distractors: [
        `Passive memorization of introductory terminology without practical application.`,
        `Superficial awareness of peripheral concepts without foundational comprehension.`,
        `Bypassing analytical evaluation in favor of informal conjecture.`,
      ],
    },
  ];

  const t = cbtTemplates[(index - 1) % cbtTemplates.length];
  const options = [t.correct, ...t.distractors].sort(() => 0.5 - ((index * 7) % 3));
  return createCbt(t.q, options, t.correct);
};

const DEFAULT_THEORY_GENERATOR = (code, title, level, index) => {
  const theoryTemplates = [
    {
      q: `Explain the fundamental theoretical foundation of ${title} (${code}) and describe its core operational principles.`,
      a: `${title} is grounded in systematic theoretical and empirical frameworks that enable rigorous analysis and practical application. Core operational principles include clear conceptual definition, structured methodology, standardized validation, and alignment with modern professional benchmarks.`,
      gp: [
        { concept: 'theoretical foundation and conceptual framework', weight: 0.5, aliases: ['theoretical basis', 'core concepts', 'foundational principles'] },
        { concept: 'operational principles and standardized validation', weight: 0.5, aliases: ['operational methodology', 'validation standards', 'practical implementation'] },
      ],
    },
    {
      q: `Analyze the critical methodologies and analytical tools utilized in ${title} for problem resolution and system optimization.`,
      a: `Methodologies in ${title} integrate quantitative modeling, empirical observation, and structured design frameworks. Key tools include domain-specific analytical models, diagnostic testing, optimization algorithms, and performance benchmarking to achieve efficient, reliable solutions.`,
      gp: [
        { concept: 'quantitative modeling and empirical observation', weight: 0.5, aliases: ['analytical modeling', 'structured methodology', 'empirical tools'] },
        { concept: 'optimization algorithms and performance benchmarking', weight: 0.5, aliases: ['performance evaluation', 'system optimization', 'solution reliability'] },
      ],
    },
    {
      q: `Discuss the key challenges, safety constraints, or ethical considerations inherent to ${title} (${code}) and outline mitigation strategies.`,
      a: `Key challenges encompass system complexity, environmental or operational constraints, and ethical responsibilities. Effective mitigation strategies require adherence to professional codes of conduct, robust risk assessment, preventive error control, and continuous peer-reviewed auditing.`,
      gp: [
        { concept: 'operational challenges and ethical responsibilities', weight: 0.5, aliases: ['system constraints', 'professional ethics', 'safety considerations'] },
        { concept: 'mitigation strategies and risk management', weight: 0.5, aliases: ['risk control', 'preventive measures', 'auditing standards'] },
      ],
    },
    {
      q: `Evaluate the role of standardization, quality assurance, and regulatory compliance in modern ${title}.`,
      a: `Standardization and quality assurance in ${title} guarantee interoperability, safety, structural integrity, and consistency across applications. Regulatory frameworks ensure adherence to national and international statutory codes, minimizing systemic risks and elevating professional standards.`,
      gp: [
        { concept: 'standardization and quality assurance frameworks', weight: 0.5, aliases: ['qa standards', 'interoperability', 'structural integrity'] },
        { concept: 'regulatory compliance and statutory codes', weight: 0.5, aliases: ['statutory compliance', 'national guidelines', 'risk reduction'] },
      ],
    },
    {
      q: `Examine the evolutionary trajectory and recent technological or research innovations impacting ${title} at the ${level} level.`,
      a: `Recent advancements in ${title} leverage digital integration, computational modeling, automation, and sustainable practices. These innovations facilitate rapid data-driven decision-making, elevated precision, reduced waste, and enhanced scalability in contemporary practice.`,
      gp: [
        { concept: 'evolutionary advancements and digital integration', weight: 0.5, aliases: ['technological innovations', 'computational modeling', 'modern advancements'] },
        { concept: 'data driven decision making and sustainable practices', weight: 0.5, aliases: ['precision enhancement', 'scalability', 'sustainability'] },
      ],
    },
    {
      q: `Formulate a structured step-by-step framework for diagnosing and resolving a major operational failure in ${title}.`,
      a: `A structured diagnostic framework involves: (1) Problem definition and baseline data acquisition, (2) Root cause identification using diagnostic tools, (3) Formulation of evidence-based corrective interventions, (4) Controlled execution, and (5) Post-implementation verification and documentation.`,
      gp: [
        { concept: 'problem definition and root cause identification', weight: 0.5, aliases: ['problem identification', 'data acquisition', 'root cause analysis'] },
        { concept: 'corrective interventions and verification documentation', weight: 0.5, aliases: ['implementation of solutions', 'post verification', 'standard documentation'] },
      ],
    },
    {
      q: `Compare and contrast two prevailing models or theoretical paradigms used in ${title} (${code}).`,
      a: `Model A focuses primarily on deterministic, classical approaches offering exact analytical solutions under controlled boundary conditions, whereas Model B incorporates stochastic, adaptive, or empirical elements accommodating real-world uncertainty and dynamic perturbations.`,
      gp: [
        { concept: 'deterministic classical model principles and boundaries', weight: 0.5, aliases: ['deterministic approach', 'exact analytical solutions', 'model a analysis'] },
        { concept: 'stochastic adaptive model characteristics and uncertainty handling', weight: 0.5, aliases: ['stochastic paradigm', 'adaptive modeling', 'empirical elements'] },
      ],
    },
    {
      q: `Explain the mathematical or quantitative principles underpinning performance evaluation in ${title}.`,
      a: `Performance evaluation relies on quantitative relationships governing rate of progress, efficiency ratios, variance metrics, and sensitivity coefficients. Mathematical formulations quantify throughput, resource consumption, and reliability margins under varying load conditions.`,
      gp: [
        { concept: 'efficiency ratios and variance metrics', weight: 0.5, aliases: ['quantitative formulations', 'rate equations', 'efficiency calculations'] },
        { concept: 'reliability margins and sensitivity coefficients', weight: 0.5, aliases: ['sensitivity analysis', 'performance metrics', 'load evaluation'] },
      ],
    },
    {
      q: `Describe the role of interdisciplinary integration between ${title} and related contemporary scientific or technological disciplines.`,
      a: `Interdisciplinary synthesis combines insights from computing, management sciences, and physical/biological systems to enrich ${title}. This cross-pollination yields robust hybrid architectures, comprehensive lifecycle assessment, and innovative solutions to multidimensional societal challenges.`,
      gp: [
        { concept: 'cross disciplinary synthesis with computing and physical sciences', weight: 0.5, aliases: ['interdisciplinary integration', 'cross pollination', 'hybrid methodologies'] },
        { concept: 'lifecycle assessment and multidimensional problem solving', weight: 0.5, aliases: ['lifecycle analysis', 'societal problem solving', 'robust architectures'] },
      ],
    },
    {
      q: `Synthesize the primary criteria required for conducting rigorous academic research or final project execution in ${title} (${code}).`,
      a: `Rigorous academic research in ${title} mandates formulating a well-defined research problem, conducting an exhaustive literature review, designing an airtight experimental or computational methodology, performing rigorous statistical verification, and drawing defensible academic conclusions.`,
      gp: [
        { concept: 'research problem formulation and methodological design', weight: 0.5, aliases: ['problem definition', 'experimental design', 'methodology'] },
        { concept: 'statistical verification and defensible academic conclusions', weight: 0.5, aliases: ['data analysis', 'statistical validation', 'thesis conclusions'] },
      ],
    },
  ];

  const t = theoryTemplates[(index - 1) % theoryTemplates.length];
  return createTheory(t.q, t.a, t.gp);
};
