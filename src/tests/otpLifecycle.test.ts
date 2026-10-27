import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { db, pool } from '../db/index.js';
import { otpsTable } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authService } from '../services/authService.js';

describe('BB-02: OTP PostgreSQL Lifecycle & Security', () => {
  const testEmail = `test.otp.${Date.now()}@lautech.edu.ng`;

  after(async () => {
    // Clean up test records
    await db.delete(otpsTable).where(eq(otpsTable.identifier, testEmail));
  });

  it('1. Generates 6-digit numeric OTP and stores hashed representation in PostgreSQL', async () => {
    const code = await authService.generateOtp(testEmail, 'verification');
    assert.strictEqual(typeof code, 'string');
    assert.strictEqual(code.length, 6);
    assert.match(code, /^\d{6}$/);

    // Verify database record
    const [record] = await db
      .select()
      .from(otpsTable)
      .where(
        and(
          eq(otpsTable.identifier, testEmail),
          eq(otpsTable.isUsed, false)
        )
      );

    assert.ok(record, 'Record should exist in PostgreSQL otpsTable');
    assert.notStrictEqual(record.otpHash, code, 'Plaintext code must NEVER be stored in database');
    assert.strictEqual(record.otpHash.length, 64, 'SHA-256 hash must be 64 hex characters');
    assert.strictEqual(record.attempts, 0, 'Initial attempts must be 0');
    assert.strictEqual(record.maxAttempts, 5, 'Max attempts must default to 5');
    assert.strictEqual(record.isUsed, false, 'isUsed must be false initially');
    assert.ok(new Date(record.expiresAt) > new Date(), 'Expiry must be in the future');
  });

  it('2. Enforces 60-second resend cooldown against rapid repeated requests', async () => {
    await assert.rejects(
      async () => {
        await authService.generateOtp(testEmail, 'verification');
      },
      (err: any) => {
        assert.strictEqual(err.statusCode, 429, 'Must throw HTTP 429 status');
        assert.ok(err.cooldownRemaining > 0, 'Must provide cooldownRemaining');
        assert.match(err.message, /cooldown|wait/i);
        return true;
      }
    );
  });

  it('3. Successfully verifies valid code and invalidates upon verification (single-use)', async () => {
    const separateEmail = `singleuse.${Date.now()}@lautech.edu.ng`;
    const code = await authService.generateOtp(separateEmail, 'verification');

    // First verification with correct code
    const isFirstValid = await authService.verifyOtpCode(separateEmail, code, 'verification');
    assert.strictEqual(isFirstValid, true, 'Verification with correct code must succeed');

    // Second verification with the exact same code must FAIL (single-use)
    const isSecondValid = await authService.verifyOtpCode(separateEmail, code, 'verification');
    assert.strictEqual(isSecondValid, false, 'Replaying previously verified code must fail');

    // Clean up
    await db.delete(otpsTable).where(eq(otpsTable.identifier, separateEmail));
  });

  it('4. Rejects invalid code and tracks attempt count', async () => {
    const attemptEmail = `attempts.${Date.now()}@lautech.edu.ng`;
    const realCode = await authService.generateOtp(attemptEmail, 'verification');

    // Enter wrong code
    const invalidResult = await authService.verifyOtpCode(attemptEmail, '000000', 'verification');
    assert.strictEqual(invalidResult, false, 'Wrong code must be rejected');

    const [record] = await db
      .select()
      .from(otpsTable)
      .where(eq(otpsTable.identifier, attemptEmail));

    assert.ok(record, 'Record should exist');
    assert.strictEqual(record?.attempts, 1, 'Attempt counter must be incremented to 1');

    // Clean up
    await db.delete(otpsTable).where(eq(otpsTable.identifier, attemptEmail));
  });

  it('5. Locks out and invalidates OTP after 5 failed attempts (brute-force defense)', async () => {
    const lockoutEmail = `lockout.${Date.now()}@lautech.edu.ng`;
    const realCode = await authService.generateOtp(lockoutEmail, 'verification');

    // Fail 5 times
    for (let i = 1; i <= 5; i++) {
      const res = await authService.verifyOtpCode(lockoutEmail, '999999', 'verification');
      assert.strictEqual(res, false);
    }

    // 6th attempt with the REAL code should now fail because max attempts was reached
    const resultWithRealCode = await authService.verifyOtpCode(lockoutEmail, realCode, 'verification');
    assert.strictEqual(resultWithRealCode, false, 'Real code must be rejected once locked out');

    // Clean up
    await db.delete(otpsTable).where(eq(otpsTable.identifier, lockoutEmail));
  });
});
