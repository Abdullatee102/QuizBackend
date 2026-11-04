import { before, after } from 'node:test';
import { pool, verifyDatabaseConnection } from '../db/index.js';

before(async () => {
  await verifyDatabaseConnection();
});

// Import all regression test suites
import './leaderboardPrivacy.test.js';
import './otpLifecycle.test.js';
import './reviewSecurity.test.js';
import './notificationPush.test.js';
import './feedback.test.js';
import './gamification.test.js';
import './lecturer.test.js';
import './eligibility.test.js';
import './questionWorkflow.test.js';
import './assessmentWorkflow.test.js';
import './assessmentParticipation.test.js';
import './assessmentGrading.test.js';
import './gradebookPublication.test.js';
import './attendance.test.js';
import './materials.test.js';
import './opportunities.test.js';

after(async () => {
  try {
    await pool.end();
  } catch (err) {
    // Ignore pool teardown errors
  }
});
