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

after(async () => {
  try {
    await pool.end();
  } catch (err) {
    // Ignore pool teardown errors
  }
});

