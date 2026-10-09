/**
 * AI Support Assistant Service Abstraction
 * Brain Buzz Intelligent Support
 */

import { geminiClient } from './geminiClient.js';
import {
  SUPPORT_ASSISTANT_SYSTEM_INSTRUCTION,
  buildSupportAssistantPrompt,
} from './prompts.js';
import type { SupportAssistantInput, SupportAssistantOutput } from './types.js';
import logger from '../../config/logger.js';

export interface SupportTriageRequest {
  subject: string;
  category: string;
  initialMessage: string;
}

export interface SupportTriageResult {
  suggestedCategory: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  automatedReply?: string;
}

export class SupportAssistantAI {
  async triageRequest(request: SupportTriageRequest): Promise<SupportTriageResult> {
    const text = `${request.subject} ${request.initialMessage}`.toLowerCase();
    const isUrgent =
      text.includes('urgent') ||
      text.includes('exam in') ||
      text.includes('locked out') ||
      text.includes('banned');

    return {
      suggestedCategory: request.category || 'general',
      priority: isUrgent ? 'high' : 'medium',
      automatedReply:
        'Thank you for reaching out to Brain Buzz Support. Our AI assistant is reviewing your ticket and support staff are on standby.',
    };
  }

  async generateSupportResponse(
    input: string | SupportAssistantInput
  ): Promise<SupportAssistantOutput> {
    const normalizedInput: SupportAssistantInput =
      typeof input === 'string' ? { userMessage: input } : input;
    const message = (normalizedInput.userMessage || '').trim();
    const lower = message.toLowerCase();

    // =========================================================================
    // STEP 1: If Gemini AI is active and configured, query Gemini with full context
    // =========================================================================
    if (geminiClient.isAvailable()) {
      try {
        const geminiResult = await geminiClient.generateStructuredContent<{
          answer: string;
          needsHumanSupport: boolean;
          suggestedAction?: string | null;
        }>({
          systemInstruction: SUPPORT_ASSISTANT_SYSTEM_INSTRUCTION,
          prompt: buildSupportAssistantPrompt(normalizedInput),
          featureName: 'SupportAssistant',
          responseSchema: {
            type: 'object',
            properties: {
              answer: { type: 'string' },
              needsHumanSupport: { type: 'boolean' },
              suggestedAction: { type: 'string', nullable: true },
            },
            required: ['answer', 'needsHumanSupport'],
          },
        });

        if (geminiResult.success && geminiResult.data?.answer) {
          const needsHuman = Boolean(geminiResult.data.needsHumanSupport);
          return {
            answer: geminiResult.data.answer.trim(),
            needsHumanSupport: needsHuman,
            suggestedAction:
              geminiResult.data.suggestedAction ||
              (needsHuman ? 'escalate_to_admin' : 'continue_chat'),
            status: 'success',
          };
        }

        logger.warn(
          `[SUPPORT AI] Gemini response failed (${geminiResult.error}), falling back to deterministic knowledge base.`
        );
      } catch (err: any) {
        logger.error(`[SUPPORT AI] Gemini call exception: ${err?.message || err}`);
      }
    }

    // =========================================================================
    // STEP 2: Grounded Deterministic Knowledge Base (Fallback & Strict Safety)
    // =========================================================================

    // A. Friendly conversational greetings — DO NOT escalate to admin!
    const isGreeting =
      /^(hi|hey|hello|good\s*(morning|afternoon|evening|day)|greetings|yo|sup)(\s+.*)?$/i.test(
        lower
      ) ||
      lower === 'hi' ||
      lower === 'hey' ||
      lower === 'hello';

    if (isGreeting) {
      return {
        answer:
          'Hello! I am your Brain Buzz Support Assistant. How can I assist you today with your courses, practice quizzes, quiz reviews, achievements, or account settings?',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    // B. Explicit escalation triggers requiring human administration
    const requiresEscalation =
      lower.includes('wrong result') ||
      lower.includes('incorrect result') ||
      lower.includes('wrong score') ||
      lower.includes('result is wrong') ||
      lower.includes('score is wrong') ||
      lower.includes('points disappeared') ||
      lower.includes('lost points') ||
      lower.includes('missing points') ||
      lower.includes('suspended') ||
      lower.includes('disabled') ||
      lower.includes('banned') ||
      lower.includes('incorrect answer in question') ||
      lower.includes('question error') ||
      lower.includes('database correction') ||
      lower.includes('account correction') ||
      lower.includes('moderation') ||
      lower.includes('report abuse') ||
      lower.includes('harassment') ||
      lower.includes('talk to human') ||
      lower.includes('speak with human') ||
      lower.includes('speak to agent') ||
      lower.includes('human agent') ||
      lower.includes('admin please') ||
      lower.includes('representative') ||
      lower.includes('billing error') ||
      lower.includes('refund');

    if (requiresEscalation) {
      return {
        answer:
          'I have recorded and escalated your inquiry to our Support Administration team for review (Ticket status: WAITING_FOR_ADMIN). A staff member will inspect the account and assist you directly. AI assistants cannot perform manual database or score corrections.',
        needsHumanSupport: true,
        suggestedAction: 'escalate_to_admin',
        status: 'success',
      };
    }

    // C. Grounded answers for standard Brain Buzz capabilities

    // Quiz practice & modes
    if (
      lower.includes('start a quiz') ||
      lower.includes('take a quiz') ||
      lower.includes('practice by faculty') ||
      lower.includes('cbt') ||
      lower.includes('theory')
    ) {
      return {
        answer:
          'To start practice on Brain Buzz, go to the Courses section, choose your Faculty and Department, select your Level and Semester, and tap "Start Practice Quiz". You can select between CBT (multiple choice with instant review) and Theory assessment modes.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    // Quiz review & correct/missed answers
    if (
      lower.includes('quiz review') ||
      lower.includes('review') ||
      lower.includes('wrong answer') ||
      lower.includes('correct answer') ||
      lower.includes('green border') ||
      lower.includes('red border') ||
      lower.includes('deceiving')
    ) {
      return {
        answer:
          'In Brain Buzz Quiz Review, questions you missed are marked with a red border around your selected option, and the correct option is highlighted with a green border so you can easily learn the right answer. Completed quizzes can be reviewed anytime under Quiz History in Profile.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    // Quiz history
    if (
      lower.includes('history') ||
      lower.includes('past quiz') ||
      lower.includes('previous score') ||
      lower.includes('attempts')
    ) {
      return {
        answer:
          'You can review all your completed CBT and Theory quiz attempts, dates, and performance breakdowns under "Quiz History" on your Profile screen.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    // Profile & department/faculty/level
    if (
      lower.includes('profile') ||
      lower.includes('department') ||
      lower.includes('faculty') ||
      lower.includes('level') ||
      lower.includes('recommended')
    ) {
      return {
        answer:
          'You can configure your Faculty, Department, and Level under "Edit Profile" in the Profile tab. Setting these details is required so Brain Buzz can recommend your exact semester courses and display your faculty code on the Leaderboard.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    // Leaderboard
    if (
      lower.includes('leaderboard') ||
      lower.includes('ranking') ||
      lower.includes('faculty code') ||
      lower.includes('fci') ||
      lower.includes('rank')
    ) {
      return {
        answer:
          'The Leaderboard ranks scholars and faculties globally based on verified quiz points. Each scholar’s avatar displays their configured faculty code (e.g., FCI) or their first initial if the profile is not yet configured.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    // Achievements & streaks
    if (
      lower.includes('achievement') ||
      lower.includes('badge') ||
      lower.includes('streak')
    ) {
      return {
        answer:
          'Brain Buzz features 30 achievements (such as Early Bird, Quiz Legend, Century, and practice streaks) that unlock automatically as you complete quizzes. You can track your badges under "Achievements" on your Profile screen.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    // Opportunities & communities
    if (
      lower.includes('scholarship') ||
      lower.includes('organisation') ||
      lower.includes('tutorial') ||
      lower.includes('opportunity') ||
      lower.includes('community') ||
      lower.includes('whatsapp') ||
      lower.includes('telegram')
    ) {
      return {
        answer:
          'You can explore upcoming Scholarships, Student Organisations, and Tutorials in the Opportunities section from your Profile. You can also join the official Brain Buzz WhatsApp and Telegram student communities directly from the Profile screen.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    // D. Safe Fallback — When knowledge is not confidently matched, escalate safely
    return {
      answer:
        'Thank you for reaching out. I have shared your inquiry with our Support Administration team so they can review your question with specific context (Ticket status: WAITING_FOR_ADMIN). A representative will reply to you shortly.',
      needsHumanSupport: true,
      suggestedAction: 'escalate_to_admin',
      status: 'success',
    };
  }
}

export const aiSupportAssistant = new SupportAssistantAI();
