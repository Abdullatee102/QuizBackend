import { before, after } from 'node:test';
import { pool, verifyDatabaseConnection } from '../db/index.js';

before(async () => {
  await verifyDatabaseConnection();
});

// Import all regression test suites
import './leaderboardPrivacy.test.js';
import './otpLifecycle.test.js';
import './reviewSecurity.test.js';

after(async () => {
  try {
    await pool.end();
  } catch (err) {
    // Ignore pool teardown errors
  }
});
