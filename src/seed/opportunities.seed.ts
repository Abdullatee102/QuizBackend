import { db, pool } from '../db/index.js';
import {
  opportunitiesTable,
  OPPORTUNITY_CATEGORIES,
  OPPORTUNITY_STATUS,
  OPPORTUNITY_VERIFICATION_STATUS,
} from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const INITIAL_OPPORTUNITY_SEEDS = [
  // -----------------------------------------------------------------
  // 1. JCIN LAUTECH
  // -----------------------------------------------------------------
  {
    slug: 'jcin-lautech',
    category: OPPORTUNITY_CATEGORIES.ORGANISATIONS,
    title: 'JCIN LAUTECH Collegiate Chapter Membership & Leadership Development',
    organization: 'JCIN LAUTECH',
    shortDescription: 'Join the premier worldwide leadership and civic engagement organisation on campus.',
    fullDescription: 'Junior Chamber International Nigeria (JCIN) LAUTECH provides young leaders with the skills, knowledge, and understanding needed to make informed decisions and take purposeful action within the university and surrounding community. Members participate in youth summits, debate championships, community outreach, and executive leadership workshops.',
    requirements: '• Must be a registered undergraduate student of LAUTECH (100L to 500L)\n• Passion for personal development, leadership, and public speaking\n• Willingness to attend chapter meetings and engage in community development projects',
    benefits: '• Globally recognised certificates of leadership and project management\n• Direct access to national and international JCI conferences and youth conventions\n• Practical training in speech presentation, parliamentary procedures, and corporate etiquette',
    applicationUrl: 'https://jci.ng',
    contactEmail: 'jcin@lautech.edu.ng',
    contactPhone: null,
    logoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    bannerUrl: null,
    deadline: null, // Ongoing membership & recruitment drives
    status: OPPORTUNITY_STATUS.PUBLISHED,
    verificationStatus: OPPORTUNITY_VERIFICATION_STATUS.VERIFIED,
    isFeatured: true,
    targetAudience: { isAll: true },
    publishedAt: new Date(),
  },

  // -----------------------------------------------------------------
  // 2. MindsHive LAUTECH Chapter
  // -----------------------------------------------------------------
  {
    slug: 'mindshive-lautech-chapter',
    category: OPPORTUNITY_CATEGORIES.ORGANISATIONS,
    title: 'MindsHive LAUTECH Chapter Student Innovation & Tech Talent Community',
    organization: 'MindsHive LAUTECH Chapter',
    shortDescription: 'Connect with student software developers, product designers, and digital innovators across LAUTECH.',
    fullDescription: 'MindsHive LAUTECH Chapter is an active campus community fostering peer-to-peer technical growth, hackathon collaboration, and product building. Whether you are beginning your journey in web development, mobile apps, UI/UX design, or data analysis, MindsHive connects you with project collaborators and senior student mentors.',
    requirements: '• Open to all students of LAUTECH with an interest in technology and software\n• Basic curiosity or proficiency in frontend, backend, UI/UX, or data analysis\n• Active commitment to peer code reviews and campus buildathons',
    benefits: '• Collaborative sprint sessions, hackathon prep, and portfolio reviews\n• Mentorship from senior engineering students and industry alumni\n• Opportunity to build and contribute to open-source student utility software',
    applicationUrl: 'https://mindshive.org',
    contactEmail: 'contact@mindshive.org',
    contactPhone: null,
    logoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    bannerUrl: null,
    deadline: null,
    status: OPPORTUNITY_STATUS.PUBLISHED,
    verificationStatus: OPPORTUNITY_VERIFICATION_STATUS.VERIFIED,
    isFeatured: true,
    targetAudience: { isAll: true },
    publishedAt: new Date(),
  },

  // -----------------------------------------------------------------
  // 3. University Scholars’ Forum (USF) LAUTECH
  // -----------------------------------------------------------------
  {
    slug: 'usf-lautech',
    category: OPPORTUNITY_CATEGORIES.ORGANISATIONS,
    title: 'University Scholars’ Forum (USF) LAUTECH Academic Research & Colloquium',
    organization: 'University Scholars’ Forum (USF) LAUTECH',
    shortDescription: 'An intellectual platform promoting academic excellence, undergraduate research presentation, and inter-faculty intellectual discourse.',
    fullDescription: 'The University Scholars’ Forum (USF) LAUTECH is a platform dedicated to scholarly inquiry and intellectual debate. It hosts regular symposia where undergraduate scholars present academic papers, discuss emerging scientific breakthroughs, and receive peer critique in an environment modeled after international academic conferences.',
    requirements: '• Current matriculated undergraduate student with demonstrated academic commitment\n• Interest in scholarly research, symposium debate, or academic writing\n• Submission of paper abstract or participation as an academic conference delegate',
    benefits: '• Hands-on experience presenting papers and defending scientific findings\n• Commendation citations and symposium awards for exceptional student research\n• Direct mentorship from academic advisers and postgraduate scholars',
    applicationUrl: 'https://usfcolloquium.org',
    contactEmail: 'usf@lautech.edu.ng',
    contactPhone: null,
    logoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80',
    bannerUrl: null,
    deadline: null,
    status: OPPORTUNITY_STATUS.PUBLISHED,
    verificationStatus: OPPORTUNITY_VERIFICATION_STATUS.VERIFIED,
    isFeatured: true,
    targetAudience: { isAll: true },
    publishedAt: new Date(),
  },

  // -----------------------------------------------------------------
  // 4. Sample Scholarship Seed
  // -----------------------------------------------------------------
  {
    slug: 'mtn-science-technology-scholarship-2026',
    category: OPPORTUNITY_CATEGORIES.SCHOLARSHIPS,
    title: 'MTN Science & Technology Scholarship Scheme (STSS)',
    organization: 'MTN Foundation',
    shortDescription: 'Annual scholarship award of ₦300,000 for high-achieving STEM undergraduates in public universities.',
    fullDescription: 'The MTN Foundation Science and Technology Scholarship provides financial assistance to high-achieving students pursuing degrees in STEM fields at public tertiary institutions across Nigeria. The award covers tuition, book allowances, and stipends renewable until graduation upon maintaining the required CGPA.',
    requirements: '• 200L or 300L student studying an approved Science, Engineering, or Tech course\n• Minimum cumulative grade point average (CGPA) of 3.50 or Second Class Upper\n• Valid institutional student identity card and admission letter',
    benefits: '• ₦300,000 per academic session awarded until graduation\n• Invitation to the annual MTN Foundation Employability Workshop\n• Recognition on the national STEM scholars honor roll',
    applicationUrl: 'https://www.mtn.ng/scholarships',
    contactEmail: 'scholarships@mtn.ng',
    contactPhone: null,
    logoUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&auto=format&fit=crop&q=80',
    bannerUrl: null,
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    status: OPPORTUNITY_STATUS.PUBLISHED,
    verificationStatus: OPPORTUNITY_VERIFICATION_STATUS.VERIFIED,
    isFeatured: true,
    targetAudience: { isAll: true },
    publishedAt: new Date(),
  },

  // -----------------------------------------------------------------
  // 5. Sample Tutorial Seed
  // -----------------------------------------------------------------
  {
    slug: 'mth101-intensive-midsemester-review',
    category: OPPORTUNITY_CATEGORIES.TUTORIALS,
    title: 'MTH101: General Mathematics Intensive Mid-Semester Masterclass',
    organization: 'LAUTECH Faculty of Pure & Applied Sciences Tutors',
    shortDescription: 'Free peer-led weekend review sessions covering calculus, sets, and algebraic foundations for 100L students.',
    fullDescription: 'A structured, faculty-endorsed series of weekend tutorials designed to help first-year students master challenging topics in MTH101 (Elementary Mathematics I). Includes past exam question breakdowns, problem-solving workshops, and formula review cheat sheets.',
    requirements: '• Registered 100L student enrolled in MTH101\n• Come with writing materials, scientific calculator, and lecture note printouts',
    benefits: '• Step-by-step solutions to past university examination questions\n• Interactive Q&A with senior department scholars\n• Downloadable digital formula sheets and practice problem sets',
    applicationUrl: 'https://brainbuzz.app/tutorials/mth101',
    contactEmail: 'tutorials@lautech.edu.ng',
    contactPhone: null,
    logoUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop&q=80',
    bannerUrl: null,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    status: OPPORTUNITY_STATUS.PUBLISHED,
    verificationStatus: OPPORTUNITY_VERIFICATION_STATUS.VERIFIED,
    isFeatured: false,
    targetAudience: { isAll: true },
    publishedAt: new Date(),
  },
];

export async function seedOpportunities(): Promise<void> {
  console.log('[SEED:OPPORTUNITIES] Seeding initial campus opportunities...');
  let seededCount = 0;

  for (const item of INITIAL_OPPORTUNITY_SEEDS) {
    const existing = await db
      .select({ id: opportunitiesTable.id })
      .from(opportunitiesTable)
      .where(eq(opportunitiesTable.slug, item.slug))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(opportunitiesTable).values(item);
      seededCount++;
      console.log(`  ✓ Inserted seed: [${item.category}] ${item.title}`);
    } else {
      console.log(`  - Seed already exists (preserved): ${item.slug}`);
    }
  }

  console.log(`[SEED:OPPORTUNITIES] Completed. Added ${seededCount} new opportunities.`);
}

// Self-invoking execution when called directly
if (process.argv[1]?.endsWith('opportunities.seed.ts')) {
  seedOpportunities()
    .then(() => pool.end())
    .catch((err) => {
      console.error('[SEED:OPPORTUNITIES ERROR]', err);
      pool.end().then(() => process.exit(1));
    });
}

