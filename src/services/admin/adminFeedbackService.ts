import { eq, and, desc, sql, ilike } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { feedbackTable, facultiesTable, departmentsTable } from '../../db/schema.js';
import logger from '../../config/logger.js';

export interface FeedbackFilterOptions {
  page?: number | undefined;
  limit?: number | undefined;
  version?: string | undefined;
  satisfaction?: number | undefined;
  friction?: string | undefined;
  facultyId?: string | undefined;
  search?: string | undefined;
}

export const adminFeedbackService = {
  // =====================================================
  // GET AGGREGATED FEEDBACK SUMMARY & ANALYTICS
  // =====================================================
  getFeedbackSummary: async (surveyVersion: string = '1.0', facultyId?: string) => {
    try {
      // 1. Total submissions and unique respondents
      const [totalCountRow] = await db
        .select({
          totalSubmissions: sql<number>`cast(count(*) as integer)`,
          uniqueUsers: sql<number>`cast(count(distinct ${feedbackTable.userId}) as integer)`,
          averageSatisfaction: sql<number>`round(coalesce(avg(${feedbackTable.overallSatisfaction}), 0)::numeric, 2)`,
          contentAccuracyAverage: sql<number>`round(coalesce(avg(${feedbackTable.contentAccuracyRating}), 0)::numeric, 2)`,
          fairnessAverage: sql<number>`round(coalesce(avg(${feedbackTable.fairnessRating}), 0)::numeric, 2)`,
        })
        .from(feedbackTable)
        .where(
          and(
            eq(feedbackTable.surveyVersion, surveyVersion),
            facultyId
              ? sql`${feedbackTable.academicContext}->>'facultyId' = ${facultyId}`
              : undefined
          )
        );

      const totalSubmissions = Number(totalCountRow?.totalSubmissions || 0);

      // 2. Satisfaction distribution (1 to 5)
      const satisfactionRows = await db
        .select({
          rating: feedbackTable.overallSatisfaction,
          count: sql<number>`cast(count(*) as integer)`,
        })
        .from(feedbackTable)
        .where(
          and(
            eq(feedbackTable.surveyVersion, surveyVersion),
            facultyId
              ? sql`${feedbackTable.academicContext}->>'facultyId' = ${facultyId}`
              : undefined
          )
        )
        .groupBy(feedbackTable.overallSatisfaction);

      const satisfactionDistribution: Record<number, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };
      satisfactionRows.forEach((r) => {
        satisfactionDistribution[r.rating] = Number(r.count);
      });

      // 3. Usage frequency breakdown
      const frequencyRows = await db
        .select({
          frequency: feedbackTable.usageFrequency,
          count: sql<number>`cast(count(*) as integer)`,
        })
        .from(feedbackTable)
        .where(
          and(
            eq(feedbackTable.surveyVersion, surveyVersion),
            facultyId
              ? sql`${feedbackTable.academicContext}->>'facultyId' = ${facultyId}`
              : undefined
          )
        )
        .groupBy(feedbackTable.usageFrequency);

      const usageFrequencyBreakdown: Record<string, number> = {};
      frequencyRows.forEach((r) => {
        usageFrequencyBreakdown[r.frequency] = Number(r.count);
      });

      // 4. Submissions timeline (grouped by day)
      const timelineRows = await db
        .select({
          date: sql<string>`to_char(${feedbackTable.createdAt}, 'YYYY-MM-DD')`,
          count: sql<number>`cast(count(*) as integer)`,
        })
        .from(feedbackTable)
        .where(
          and(
            eq(feedbackTable.surveyVersion, surveyVersion),
            facultyId
              ? sql`${feedbackTable.academicContext}->>'facultyId' = ${facultyId}`
              : undefined
          )
        )
        .groupBy(sql`to_char(${feedbackTable.createdAt}, 'YYYY-MM-DD')`)
        .orderBy(sql`to_char(${feedbackTable.createdAt}, 'YYYY-MM-DD') ASC`);

      // 5. Technical frictions extraction and aggregation
      const frictionRows = await db
        .select({
          frictions: feedbackTable.technicalFrictions,
        })
        .from(feedbackTable)
        .where(
          and(
            eq(feedbackTable.surveyVersion, surveyVersion),
            facultyId
              ? sql`${feedbackTable.academicContext}->>'facultyId' = ${facultyId}`
              : undefined
          )
        );

      const frictionCounts: Record<string, number> = {};
      frictionRows.forEach((row) => {
        if (Array.isArray(row.frictions)) {
          row.frictions.forEach((friction) => {
            frictionCounts[friction] = (frictionCounts[friction] || 0) + 1;
          });
        }
      });

      const topTechnicalFrictions = Object.entries(frictionCounts)
        .map(([issue, count]) => ({
          issue,
          count,
          percentage:
            totalSubmissions > 0
              ? Number(((count / totalSubmissions) * 100).toFixed(1))
              : 0,
        }))
        .sort((a, b) => b.count - a.count);

      // 6. Feature ratings average (excluding 0 = Not Used)
      const featureRatingRows = await db
        .select({
          featureRatings: feedbackTable.featureRatings,
        })
        .from(feedbackTable)
        .where(
          and(
            eq(feedbackTable.surveyVersion, surveyVersion),
            facultyId
              ? sql`${feedbackTable.academicContext}->>'facultyId' = ${facultyId}`
              : undefined
          )
        );

      const featureSum: Record<string, { sum: number; count: number }> = {};
      featureRatingRows.forEach((r) => {
        const ratings = (r.featureRatings || {}) as Record<string, number>;
        Object.entries(ratings).forEach(([feat, val]) => {
          if (val > 0) {
            if (!featureSum[feat]) {
              featureSum[feat] = { sum: 0, count: 0 };
            }
            featureSum[feat].sum += val;
            featureSum[feat].count += 1;
          }
        });
      });

      const featureUsefulnessAverages: Record<string, number> = {};
      Object.entries(featureSum).forEach(([feat, data]) => {
        featureUsefulnessAverages[feat] =
          data.count > 0 ? Number((data.sum / data.count).toFixed(2)) : 0;
      });

      return {
        totalSubmissions,
        uniqueUsers: Number(totalCountRow?.uniqueUsers || 0),
        averageSatisfaction: Number(totalCountRow?.averageSatisfaction || 0),
        contentAccuracyAverage: Number(totalCountRow?.contentAccuracyAverage || 0),
        fairnessAverage: Number(totalCountRow?.fairnessAverage || 0),
        satisfactionDistribution,
        usageFrequencyBreakdown,
        topTechnicalFrictions,
        featureUsefulnessAverages,
        submissionsTimeline: timelineRows.map((r) => ({
          date: r.date,
          count: Number(r.count),
        })),
      };
    } catch (error: any) {
      logger.error(`[ADMIN FEEDBACK SUMMARY ERROR] ${error.message}`);
      throw error;
    }
  },

  // =====================================================
  // LIST PAGINATED FEEDBACK SUBMISSIONS
  // =====================================================
  listFeedbackSubmissions: async (options: FeedbackFilterOptions = {}) => {
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(options.limit) || 20));
    const offset = (page - 1) * limit;
    const version = options.version || '1.0';

    try {
      // Build dynamic where conditions
      const conditions = [eq(feedbackTable.surveyVersion, version)];

      if (options.satisfaction) {
        conditions.push(
          eq(feedbackTable.overallSatisfaction, Number(options.satisfaction))
        );
      }

      if (options.facultyId) {
        conditions.push(
          sql`${feedbackTable.academicContext}->>'facultyId' = ${options.facultyId}`
        );
      }

      if (options.friction) {
        conditions.push(
          sql`${feedbackTable.technicalFrictions}::jsonb ? ${options.friction}`
        );
      }

      if (options.search && options.search.trim().length > 0) {
        conditions.push(
          ilike(feedbackTable.suggestions, `%${options.search.trim()}%`)
        );
      }

      const whereClause = and(...conditions);

      // Count total matching records
      const [countResult] = await db
        .select({ total: sql<number>`cast(count(*) as integer)` })
        .from(feedbackTable)
        .where(whereClause);

      const totalRecords = Number(countResult?.total || 0);
      const totalPages = Math.ceil(totalRecords / limit) || 1;

      // Fetch paginated records with minimal academic metadata
      const rows = await db
        .select({
          id: feedbackTable.id,
          createdAt: feedbackTable.createdAt,
          surveyVersion: feedbackTable.surveyVersion,
          overallSatisfaction: feedbackTable.overallSatisfaction,
          usageFrequency: feedbackTable.usageFrequency,
          contentAccuracyRating: feedbackTable.contentAccuracyRating,
          fairnessRating: feedbackTable.fairnessRating,
          technicalFrictions: feedbackTable.technicalFrictions,
          frictionDetails: feedbackTable.frictionDetails,
          suggestions: feedbackTable.suggestions,
          academicContext: feedbackTable.academicContext,
          clientMetadata: feedbackTable.clientMetadata,
        })
        .from(feedbackTable)
        .where(whereClause)
        .orderBy(desc(feedbackTable.createdAt))
        .limit(limit)
        .offset(offset);

      // Lookup faculty names if facultyIds exist in results
      const facultyIds = [
        ...new Set(
          rows
            .map((r) => (r.academicContext as any)?.facultyId)
            .filter((id): id is string => typeof id === 'string')
        ),
      ];

      const facultyMap: Record<string, string> = {};
      if (facultyIds.length > 0) {
        const faculties = await db
          .select({ id: facultiesTable.id, name: facultiesTable.name })
          .from(facultiesTable)
          .where(sql`${facultiesTable.id} IN (${sql.join(facultyIds.map(id => sql`${id}`), sql`, `)})`);
        faculties.forEach((f) => {
          facultyMap[f.id] = f.name;
        });
      }

      // Map to pseudonymous student representation
      const formattedData = rows.map((row) => {
        const academic = (row.academicContext || {}) as {
          facultyId?: string | null;
          departmentId?: string | null;
          level?: number | null;
        };

        const shortCode = row.id.split('-')[0]?.toUpperCase() || 'SCHOLAR';
        const suggestionsText = row.suggestions ? row.suggestions.trim() : null;

        return {
          id: row.id,
          respondentCode: `Scholar #${shortCode}`,
          submittedAt: row.createdAt,
          surveyVersion: row.surveyVersion,
          overallSatisfaction: row.overallSatisfaction,
          usageFrequency: row.usageFrequency,
          contentAccuracyRating: row.contentAccuracyRating,
          fairnessRating: row.fairnessRating,
          facultyName: academic.facultyId ? facultyMap[academic.facultyId] || 'Unassigned' : 'General',
          level: academic.level || null,
          technicalFrictions: row.technicalFrictions || [],
          frictionDetails: row.frictionDetails,
          hasSuggestions: !!suggestionsText,
          suggestionsSnippet: suggestionsText
            ? suggestionsText.length > 80
              ? `${suggestionsText.substring(0, 80)}...`
              : suggestionsText
            : null,
        };
      });

      return {
        pagination: {
          page,
          limit,
          totalRecords,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        data: formattedData,
      };
    } catch (error: any) {
      logger.error(`[ADMIN FEEDBACK LIST ERROR] ${error.message}`);
      throw error;
    }
  },

  // =====================================================
  // GET INDIVIDUAL FEEDBACK DETAILS (INSPECTOR)
  // =====================================================
  getFeedbackDetail: async (feedbackId: string) => {
    try {
      const [feedback] = await db
        .select()
        .from(feedbackTable)
        .where(eq(feedbackTable.id, feedbackId as any))
        .limit(1);

      if (!feedback) {
        return null;
      }

      const academic = (feedback.academicContext || {}) as {
        facultyId?: string | null;
        departmentId?: string | null;
        level?: number | null;
      };

      let facultyName = 'General';
      let departmentName = 'General';

      if (academic.facultyId) {
        const [fac] = await db
          .select({ name: facultiesTable.name })
          .from(facultiesTable)
          .where(eq(facultiesTable.id, academic.facultyId as any));
        if (fac) facultyName = fac.name;
      }

      if (academic.departmentId) {
        const [dept] = await db
          .select({ name: departmentsTable.name })
          .from(departmentsTable)
          .where(eq(departmentsTable.id, academic.departmentId as any));
        if (dept) departmentName = dept.name;
      }

      const shortCode = feedback.id.split('-')[0]?.toUpperCase() || 'SCHOLAR';

      return {
        id: feedback.id,
        respondentCode: `Scholar #${shortCode}`,
        surveyVersion: feedback.surveyVersion,
        submittedAt: feedback.createdAt,
        overallSatisfaction: feedback.overallSatisfaction,
        usageFrequency: feedback.usageFrequency,
        contentAccuracyRating: feedback.contentAccuracyRating,
        fairnessRating: feedback.fairnessRating,
        technicalFrictions: feedback.technicalFrictions,
        frictionDetails: feedback.frictionDetails,
        featureRatings: feedback.featureRatings,
        structuredAnswers: feedback.structuredAnswers,
        suggestions: feedback.suggestions,
        academicContext: {
          facultyName,
          departmentName,
          level: academic.level || null,
        },
        clientMetadata: feedback.clientMetadata,
      };
    } catch (error: any) {
      logger.error(`[ADMIN FEEDBACK DETAIL ERROR] ${error.message}`);
      throw error;
    }
  },
};
