import { describe, it } from 'node:test';
import assert from 'node:assert';
import { authService } from '../services/authService.js';

describe('BB-02: Leaderboard Privacy & PII Defense', () => {
  it('1. Does not expose student email in 24h leaderboard query', async () => {
    const leaders = await authService.getTopLeaderboard('24h', 10);
    assert.ok(Array.isArray(leaders), 'Leaderboard must return an array');

    for (const entry of leaders) {
      assert.strictEqual(
        (entry as any).email,
        undefined,
        `Student email must NEVER be exposed in public rankings! Found: ${(entry as any).email}`
      );
      assert.ok(entry.id, 'Entry must have student id');
      assert.ok('totalScore' in entry, 'Entry must have totalScore');
    }
  });

  it('2. Does not expose student email in 30d leaderboard query', async () => {
    const leaders = await authService.getTopLeaderboard('30d', 10);
    assert.ok(Array.isArray(leaders), 'Leaderboard must return an array');

    for (const entry of leaders) {
      assert.strictEqual(
        (entry as any).email,
        undefined,
        `Student email must NEVER be exposed in public rankings! Found: ${(entry as any).email}`
      );
    }
  });

  it('3. Confirms leaderboard response shape matches public display requirements', async () => {
    const leaders = await authService.getTopLeaderboard('24h', 5);
    if (leaders.length > 0) {
      const sample = leaders[0];
      const allowedKeys = new Set([
        'id',
        'fullName',
        'username',
        'photoURL',
        'facultyId',
        'departmentId',
        'facultyCode',
        'facultyName',
        'departmentCode',
        'departmentName',
        'totalScore',
      ]);

      for (const key of Object.keys(sample)) {
        assert.ok(
          allowedKeys.has(key),
          `Unexpected field in leaderboard projection: ${key}`
        );
      }
    }
  });
});
