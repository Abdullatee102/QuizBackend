import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { systemSettingsService } from '../services/systemSettingsService.js';
import { entitlementService } from '../services/payment/entitlementService.js';
import { eq } from 'drizzle-orm';

test('System Settings & Campus Access Control Test Suite', async (t) => {
  const testRunId = Date.now();
  let freshStudentId = '';
  let olderStudentId = '';

  await t.test('Setup: Create test students (fresh and older than 7 days)', async () => {
    // 1. Fresh student created right now (should have active 7-day onboarding trial)
    const [freshStudent] = await db
      .insert(usersTable)
      .values({
        fullName: `Fresh Student ${testRunId}`,
        username: `fresh_${testRunId}`,
        email: `fresh_student_${testRunId}@lautech.edu.ng`,
        password: 'HashedPassword123!',
        role: 'STUDENT',
        status: 'ACTIVE',
        createdAt: new Date(),
      })
      .returning();

    assert.ok(freshStudent);
    freshStudentId = freshStudent.id;

    // 2. Older student created 10 days ago (onboarding trial expired)
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    const [olderStudent] = await db
      .insert(usersTable)
      .values({
        fullName: `Older Student ${testRunId}`,
        username: `older_${testRunId}`,
        email: `older_student_${testRunId}@lautech.edu.ng`,
        password: 'HashedPassword123!',
        role: 'STUDENT',
        status: 'ACTIVE',
        createdAt: tenDaysAgo,
      })
      .returning();

    assert.ok(olderStudent);
    olderStudentId = olderStudent.id;
  });

  await t.test('Step 1: Fresh student is automatically granted 7-day onboarding trial', async () => {
    // Ensure default settings (user trial enabled, 7 days, global trial inactive, enforce subscription true)
    await systemSettingsService.updateAccessControlConfig({
      isGlobalTrialActive: false,
      globalTrialEndsAt: null,
      isUserTrialEnabled: true,
      userTrialDays: 7,
      enforceSubscription: true,
    });

    const status = await systemSettingsService.evaluateStudentAccessStatus(freshStudentId);
    assert.equal(status.hasTrialAccess, true);
    assert.equal(status.trialType, 'USER_ONBOARDING_TRIAL');
    assert.ok(status.remainingDays >= 6);

    // Entitlement service check should return active access via trial
    const access = await entitlementService.checkUserFeatureAccess(freshStudentId, 'COURSE_ENROLLMENT');
    assert.equal(access.hasAccess, true);
    assert.equal(access.isTrial, true);
    assert.equal(access.trialType, 'USER_ONBOARDING_TRIAL');
  });

  await t.test('Step 2: Older student outside 7-day trial is strictly blocked without active pass', async () => {
    const status = await systemSettingsService.evaluateStudentAccessStatus(olderStudentId);
    assert.equal(status.hasTrialAccess, false);

    // Entitlement service check should return no access
    const access = await entitlementService.checkUserFeatureAccess(olderStudentId, 'COURSE_ENROLLMENT');
    assert.equal(access.hasAccess, false);
    assert.equal(access.reason, 'NO_ACTIVE_ENTITLEMENT');
  });

  await t.test('Step 3: Activating Campus-Wide Open Access window grants immediate access to all students', async () => {
    const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await systemSettingsService.updateAccessControlConfig({
      isGlobalTrialActive: true,
      globalTrialEndsAt: sevenDaysFromNow,
      globalTrialDescription: 'LAUTECH Mid-Semester Open Campus Week',
      enforceSubscription: true,
    });

    // Older student now has access via GLOBAL_OPEN_ACCESS!
    const olderStatus = await systemSettingsService.evaluateStudentAccessStatus(olderStudentId);
    assert.equal(olderStatus.hasTrialAccess, true);
    assert.equal(olderStatus.trialType, 'GLOBAL_OPEN_ACCESS');
    assert.equal(olderStatus.remainingDays, 7);

    const access = await entitlementService.checkUserFeatureAccess(olderStudentId, 'COURSE_ENROLLMENT');
    assert.equal(access.hasAccess, true);
    assert.equal(access.isTrial, true);
    assert.equal(access.trialType, 'GLOBAL_OPEN_ACCESS');
  });

  await t.test('Step 4: Expired or toggled-off Campus Open Access immediately restores strict subscription enforcement', async () => {
    await systemSettingsService.updateAccessControlConfig({
      isGlobalTrialActive: false,
      enforceSubscription: true,
    });

    // Older student is strictly blocked again
    const access = await entitlementService.checkUserFeatureAccess(olderStudentId, 'COURSE_ENROLLMENT');
    assert.equal(access.hasAccess, false);
    assert.equal(access.reason, 'NO_ACTIVE_ENTITLEMENT');

    // Fresh student still has their onboarding trial
    const freshAccess = await entitlementService.checkUserFeatureAccess(freshStudentId, 'COURSE_ENROLLMENT');
    assert.equal(freshAccess.hasAccess, true);
    assert.equal(freshAccess.isTrial, true);
  });

  await t.test('Cleanup: Remove test students', async () => {
    if (freshStudentId) {
      await db.delete(usersTable).where(eq(usersTable.id, freshStudentId as any));
    }
    if (olderStudentId) {
      await db.delete(usersTable).where(eq(usersTable.id, olderStudentId as any));
    }
  });
});
