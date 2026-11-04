import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'http';
import express from 'express';
import { db } from '../db/index.js';
import {
  usersTable,
  opportunitiesTable,
  opportunitySubscriptionsTable,
  opportunityBookmarksTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import opportunityRoutes from '../routes/opportunity.routes.js';
import adminRoutes from '../routes/admin/index.js';

describe('BB-06: Opportunity Hub & Campus Partnerships Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let studentId: string;
  let studentToken: string;

  let adminId: string;
  let adminToken: string;

  let createdOppId: string;

  before(async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/opportunities', opportunityRoutes);
    app.use('/api/admin', adminRoutes);

    server = http.createServer(app);
    await new Promise<void>((resolve) => server.listen(0, () => resolve()));
    const address = server.address() as any;
    baseUrl = `http://127.0.0.1:${address.port}`;

    // 1. Create test student
    const studentEmail = `student_opp_${Date.now()}@test.lautech.edu.ng`;
    const [student] = await db
      .insert(usersTable)
      .values({
        email: studentEmail,
        fullName: 'Test Opp Student',
        password: 'TestHashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    if (!student) {
      throw new Error('Failed to create test student');
    }
    studentId = student.id;
    const studentTokens = await authService.generateAuthTokens({
      id: student.id,
      email: student.email,
      role: student.role,
    });
    studentToken = studentTokens.accessToken;

    // 2. Create test Super Admin
    const adminEmail = `admin_opp_${Date.now()}@test.lautech.edu.ng`;
    const [admin] = await db
      .insert(usersTable)
      .values({
        email: adminEmail,
        fullName: 'Test Opp Admin',
        password: 'TestHashedPassword123!',
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    if (!admin) {
      throw new Error('Failed to create test admin');
    }
    adminId = admin.id;
    const adminTokens = await authService.generateAuthTokens({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });
    adminToken = adminTokens.accessToken;
  });

  after(async () => {
    // Cleanup created test records
    if (createdOppId) {
      await db.delete(opportunitiesTable).where(eq(opportunitiesTable.id, createdOppId));
    }
    await db.delete(opportunityBookmarksTable).where(eq(opportunityBookmarksTable.userId, studentId));
    await db.delete(opportunitySubscriptionsTable).where(eq(opportunitySubscriptionsTable.userId, studentId));
    await db.delete(usersTable).where(eq(usersTable.id, studentId));
    await db.delete(usersTable).where(eq(usersTable.id, adminId));

    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  // =========================================================================
  // SUITE 1: Student Opportunity Discovery & Seeds
  // =========================================================================
  describe('Suite 1: Student Opportunity Discovery & Seeds', () => {
    it('should list published opportunities for authenticated student', async () => {
      const res = await fetch(`${baseUrl}/api/opportunities`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.ok(Array.isArray(json.data.opportunities));
      assert.ok(json.data.opportunities.length >= 3, 'Should include seeded campus organizations');

      // Verify presence of initial seed records
      const titles = json.data.opportunities.map((o: any) => o.organization);
      assert.ok(titles.includes('JCIN LAUTECH'), 'Must include JCIN LAUTECH');
      assert.ok(titles.includes('MindsHive LAUTECH Chapter'), 'Must include MindsHive LAUTECH Chapter');
      assert.ok(titles.includes('University Scholars’ Forum (USF) LAUTECH'), 'Must include University Scholars’ Forum (USF) LAUTECH');
    });

    it('should filter opportunities by category ORGANISATIONS', async () => {
      const res = await fetch(`${baseUrl}/api/opportunities?category=ORGANISATIONS`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      for (const opp of json.data.opportunities) {
        assert.strictEqual(opp.category, 'ORGANISATIONS');
      }
    });

    it('should search opportunities by keyword', async () => {
      const res = await fetch(`${baseUrl}/api/opportunities?search=MindsHive`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.ok(json.data.opportunities.length >= 1);
      assert.strictEqual(json.data.opportunities[0].organization, 'MindsHive LAUTECH Chapter');
    });

    it('should fetch single opportunity detail view', async () => {
      // Fetch list to get an ID
      const listRes = await fetch(`${baseUrl}/api/opportunities`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      const listJson: any = await listRes.json();
      const firstOpp = listJson.data.opportunities[0];

      const res = await fetch(`${baseUrl}/api/opportunities/${firstOpp.id}`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.id, firstOpp.id);
      assert.ok(json.data.fullDescription);
      assert.strictEqual(typeof json.data.isBookmarked, 'boolean');
    });

    it('should reject unauthenticated request with 401 Unauthorized', async () => {
      const res = await fetch(`${baseUrl}/api/opportunities`);
      assert.strictEqual(res.status, 401);
    });
  });

  // =========================================================================
  // SUITE 2: Click Tracking & Bookmark Interactivity
  // =========================================================================
  describe('Suite 2: Click Tracking & Bookmark Interactivity', () => {
    let targetOppId: string;

    before(async () => {
      const listRes = await fetch(`${baseUrl}/api/opportunities`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      const listJson: any = await listRes.json();
      targetOppId = listJson.data.opportunities[0].id;
    });

    it('should track outbound link click atomically', async () => {
      const res = await fetch(`${baseUrl}/api/opportunities/${targetOppId}/track-click`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${studentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'outbound_click' }),
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.ok(json.data.clicksCount >= 1);
    });

    it('should toggle bookmark state on and off', async () => {
      // 1. Bookmark
      const addRes = await fetch(`${baseUrl}/api/opportunities/${targetOppId}/bookmark`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      assert.strictEqual(addRes.status, 200);
      const addJson: any = await addRes.json();
      assert.strictEqual(addJson.data.isBookmarked, true);

      // Verify in detail call
      const detailRes = await fetch(`${baseUrl}/api/opportunities/${targetOppId}`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      const detailJson: any = await detailRes.json();
      assert.strictEqual(detailJson.data.isBookmarked, true);

      // 2. Unbookmark
      const removeRes = await fetch(`${baseUrl}/api/opportunities/${targetOppId}/bookmark`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      assert.strictEqual(removeRes.status, 200);
      const removeJson: any = await removeRes.json();
      assert.strictEqual(removeJson.data.isBookmarked, false);
    });
  });

  // =========================================================================
  // SUITE 3: Server-Synced Notification Preferences
  // =========================================================================
  describe('Suite 3: Server-Synced Notification Preferences', () => {
    it('should return default notification preferences when unset', async () => {
      const res = await fetch(`${baseUrl}/api/opportunities/preferences`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.preferences.SCHOLARSHIPS, true);
      assert.strictEqual(json.data.preferences.ORGANISATIONS, true);
      assert.strictEqual(json.data.preferences.TUTORIALS, true);
    });

    it('should update preference and persist to database', async () => {
      const res = await fetch(`${baseUrl}/api/opportunities/preferences`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${studentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: 'TUTORIALS',
          isEnabled: false,
        }),
      });
      assert.strictEqual(res.status, 200);

      // Fetch again to verify
      const verifyRes = await fetch(`${baseUrl}/api/opportunities/preferences`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      const verifyJson: any = await verifyRes.json();
      assert.strictEqual(verifyJson.data.preferences.TUTORIALS, false);
      assert.strictEqual(verifyJson.data.preferences.ORGANISATIONS, true);
    });
  });

  // =========================================================================
  // SUITE 4: Admin Opportunity Lifecycle & Validation
  // =========================================================================
  describe('Suite 4: Admin Opportunity Lifecycle & Validation', () => {
    it('should reject opportunity with insecure non-HTTPS applicationUrl', async () => {
      const res = await fetch(`${baseUrl}/api/admin/opportunities`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Insecure Opportunity',
          category: 'SCHOLARSHIPS',
          organization: 'Insecure Corp',
          shortDescription: 'Short description text here',
          fullDescription: 'Full detailed description about this scholarship',
          applicationUrl: 'http://insecure-phishing.com/apply', // Insecure HTTP!
        }),
      });
      assert.strictEqual(res.status, 400);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'fail');
    });

    it('should create new opportunity in DRAFT status', async () => {
      const res = await fetch(`${baseUrl}/api/admin/opportunities`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Shell Undergraduate STEM Grant 2026',
          category: 'SCHOLARSHIPS',
          organization: 'Shell Petroleum Development Company',
          shortDescription: 'Scholarship grant for top 200L engineering and science undergraduates.',
          fullDescription: 'Comprehensive educational support grant covering tuition and laboratory materials.',
          applicationUrl: 'https://shell.com.ng/scholarships',
          contactEmail: 'grants@shell.com',
          status: 'DRAFT',
          verificationStatus: 'VERIFIED',
          isFeatured: true,
          targetAudience: { isAll: true },
        }),
      });
      assert.strictEqual(res.status, 201);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.status, 'DRAFT');
      assert.strictEqual(json.data.organization, 'Shell Petroleum Development Company');
      createdOppId = json.data.id;
    });

    it('should update organization name and application link as dynamic admin entry', async () => {
      const res = await fetch(`${baseUrl}/api/admin/opportunities/${createdOppId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organization: 'Shell Nigeria Exploration & Production Co. (SNEPCo)',
          applicationUrl: 'https://snepco.com.ng/apply',
        }),
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.organization, 'Shell Nigeria Exploration & Production Co. (SNEPCo)');
      assert.strictEqual(json.data.applicationUrl, 'https://snepco.com.ng/apply');
    });

    it('should publish opportunity and set publishedAt timestamp', async () => {
      const res = await fetch(`${baseUrl}/api/admin/opportunities/${createdOppId}/publish`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notifySubscribers: false }),
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.status, 'PUBLISHED');
      assert.ok(json.data.publishedAt);
    });

    it('should archive opportunity', async () => {
      const res = await fetch(`${baseUrl}/api/admin/opportunities/${createdOppId}/archive`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.status, 'ARCHIVED');
    });

    it('should delete opportunity', async () => {
      const res = await fetch(`${baseUrl}/api/admin/opportunities/${createdOppId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert.strictEqual(res.status, 200);
      createdOppId = ''; // Cleared so after() doesn't double-delete
    });
  });

  // =========================================================================
  // SUITE 5: Access Control & Audience Lookup
  // =========================================================================
  describe('Suite 5: Access Control & Audience Lookup', () => {
    it('should reject student from admin endpoints with 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/admin/opportunities`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      assert.strictEqual(res.status, 403);
    });

    it('should allow admin to lookup audience options for autocompletion', async () => {
      const res = await fetch(`${baseUrl}/api/admin/opportunities/audiences/lookup`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.ok(Array.isArray(json.data.faculties));
      assert.ok(Array.isArray(json.data.departments));
      assert.ok(Array.isArray(json.data.levels));
    });
  });
});

