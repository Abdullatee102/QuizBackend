// src/db/seed.ts
import { db } from './index.js';
import { questionsTable } from './schema.js';

const QUESTION_BANKS: Record<string, any[]> = {
  chemistry: [
    { id: 'c1', question: "What is the chemical symbol for Gold?", options: ["Gd", "Au", "Ag", "Fe"], correctAnswer: "Au" },
    { id: 'c2', question: "Which element is a diamond made of?", options: ["Carbon", "Nitrogen", "Oxygen", "Silicon"], correctAnswer: "Carbon" },
    { id: 'c3', question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"], correctAnswer: "Nitrogen" },
    { id: 'c4', question: "What is the formula for Sulfuric Acid?", options: ["H2SO4", "HCl", "HNO3", "H2O"], correctAnswer: "H2SO4" },
    { id: 'c5', question: "What is the atomic number of Helium?", options: ["1", "2", "3", "4"], correctAnswer: "2" },
  ],
  maths: [
    { id: 'm1', question: "What is the square root of 144?", options: ["10", "11", "12", "14"], correctAnswer: "12" },
    { id: 'm2', question: "Calculate: 15 * 8", options: ["110", "120", "130", "140"], correctAnswer: "120" },
    { id: 'm3', question: "What is the value of 5!", options: ["100", "110", "120", "130"], correctAnswer: "120" },
    { id: 'm4', question: "Solve for x: 2x + 10 = 26", options: ["6", "8", "10", "12"], correctAnswer: "8" },
    { id: 'm5', question: "How many sides does a Nonagon have?", options: ["7", "8", "9", "10"], correctAnswer: "9" },
  ],
  physics: [
    { id: 'p1', question: "What is the unit of Force?", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: "Newton" },
    { id: 'p2', question: "Which lens is used to correct short-sightedness?", options: ["Convex", "Concave", "Bifocal", "Cylindrical"], correctAnswer: "Concave" },
    { id: 'p3', question: "What is the acceleration due to gravity on Earth?", options: ["9.8 m/s²", "10.8 m/s²", "8.8 m/s²", "11.8 m/s²"], correctAnswer: "9.8 m/s²" },
    { id: 'p4', question: "What is the unit of power?", options: ["Ampere", "Volt", "Watt", "Ohm"], correctAnswer: "Watt" },
    { id: 'p5', question: "Which is a scalar quantity?", options: ["Force", "Velocity", "Mass", "Acceleration"], correctAnswer: "Mass" },
  ],
  english: [
    { id: 'e1', question: "Identify the noun: 'The cat sat on the mat.'", options: ["Sat", "On", "Cat", "The"], correctAnswer: "Cat" },
    { id: 'e2', question: "Antonym of 'Gigantic'?", options: ["Large", "Huge", "Tiny", "Strong"], correctAnswer: "Tiny" },
    { id: 'e3', question: "Select the correctly spelled word.", options: ["Occurence", "Occurrence", "Occurens", "Ocurrence"], correctAnswer: "Occurrence" },
    { id: 'e4', question: "Identify the verb: 'He runs fast.'", options: ["He", "Runs", "Fast", "The"], correctAnswer: "Runs" },
    { id: 'e5', question: "A person who writes books is an?", options: ["Artist", "Author", "Actor", "Architect"], correctAnswer: "Author" },
  ]
};

export const seedQuestions = async () => {
  try {
    console.log('[SEED] Starting question insertion...');

    for (const [category, questions] of Object.entries(QUESTION_BANKS)) {
      for (const q of questions) {
        await db.insert(questionsTable).values({
          category: category.toLowerCase(),
          question: q.question,      
          options: q.options,            
          correctAnswer: q.correctAnswer, 
          difficulty: 'medium',          
        }).onConflictDoNothing();
      }
    }

    console.log('[SEED] Questions successfully seeded into database!');
    process.exit(0);
  } catch (error) {
    console.error('[SEED] Error seeding questions:', error);
    process.exit(1);
  }
};

seedQuestions();