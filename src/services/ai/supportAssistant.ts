/**
 * AI Support Assistant Service Abstraction
 */

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

export interface SupportAIResponse {
  answer: string;
  needsHumanSupport: boolean;
  suggestedAction: string | null;
  status: 'success' | 'ai_unavailable';
}

export class SupportAssistantAI {
  async triageRequest(request: SupportTriageRequest): Promise<SupportTriageResult> {
    const isUrgent =
      request.subject.toLowerCase().includes('urgent') ||
      request.subject.toLowerCase().includes('error') ||
      request.subject.toLowerCase().includes('login');

    return {
      suggestedCategory: request.category || 'general',
      priority: isUrgent ? 'high' : 'medium',
      automatedReply:
        'Thank you for reaching out to QuizApp Support. An academic representative will review your request shortly.',
    };
  }

  async generateSupportResponse(
    input: string | { userMessage: string }
  ): Promise<SupportAIResponse> {
    const message = typeof input === 'string' ? input : input.userMessage || '';
    const lower = message.toLowerCase().trim();

    // 1. Definite escalation triggers (issues requiring human administration)
    const requiresEscalation =
      lower.includes('wrong result') ||
      lower.includes('incorrect result') ||
      lower.includes('wrong score') ||
      lower.includes('result is wrong') ||
      lower.includes('score is wrong') ||
      lower.includes('points disappeared') ||
      lower.includes('lost points') ||
      lower.includes('missing points') ||
      lower.includes('achievement did not unlock') ||
      lower.includes('achievement not unlocked') ||
      lower.includes('achievement bug') ||
      lower.includes('suspended') ||
      lower.includes('disabled') ||
      lower.includes('banned') ||
      lower.includes('incorrect answer') ||
      lower.includes('wrong answer in question') ||
      lower.includes('question is wrong') ||
      lower.includes('question error') ||
      lower.includes('database correction') ||
      lower.includes('account correction') ||
      lower.includes('moderation') ||
      lower.includes('report abuse') ||
      lower.includes('harassment') ||
      lower.includes('human') ||
      lower.includes('agent') ||
      lower.includes('admin') ||
      lower.includes('representative') ||
      lower.includes('billing') ||
      lower.includes('refund');

    if (requiresEscalation) {
      return {
        answer:
          'I have recorded and escalated your inquiry to an Academic Administrator for review (Ticket status: WAITING_FOR_ADMIN). An administrator will inspect the details and follow up with a resolution. AI assistants cannot perform manual database or score corrections.',
        needsHumanSupport: true,
        suggestedAction: 'escalate_to_admin',
        status: 'success',
      };
    }

    // 2. Confident answers for standard platform guidance
    if (lower.includes('start a quiz') || lower.includes('take a quiz') || lower.includes('practice by faculty') || lower.includes('cbt') || lower.includes('practice')) {
      return {
        answer:
          'To start a practice quiz, navigate to the Courses section, select your Faculty and Department, select your current Level and Semester, and tap "Start Practice Quiz". You can choose between CBT (multiple choice) or Theory assessment modes.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    if (lower.includes('history') || lower.includes('past quiz') || lower.includes('previous score')) {
      return {
        answer:
          'You can review your completed quiz attempts, scores, and performance breakdowns under the "Quiz History" section on your Profile screen.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    if (lower.includes('achievement') || lower.includes('badge') || lower.includes('trophy')) {
      return {
        answer:
          'Achievements are unlocked automatically as you complete quizzes, maintain practice streaks, and score top marks. You can view all unlocked and in-progress badges on your Profile under "Achievements".',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    if (lower.includes('leaderboard') || lower.includes('ranking') || lower.includes('rank')) {
      return {
        answer:
          'The Leaderboard ranks scholars based on total points accumulated from verified quiz answers across faculties. Scores update periodically after each quiz submission.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    if (lower.includes('notification') || lower.includes('inbox') || lower.includes('announcement')) {
      return {
        answer:
          'System announcements, timetable updates, achievement unlocks, and support ticket replies appear in your Notification Inbox (bell icon in top navigation).',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    if (lower.includes('contact support') || lower.includes('help desk') || lower.includes('open a ticket')) {
      return {
        answer:
          'You are currently in the Support Desk! You can submit inquiries about academic issues, courses, or technical difficulties right here, and our Academic Support team will assist you.',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    if (lower.includes('profile') || lower.includes('department') || lower.includes('faculty') || lower.includes('level')) {
      return {
        answer:
          'You can view and update your academic details (faculty, department, level, and bio) under the Profile tab by selecting "Edit Academic Profile".',
        needsHumanSupport: false,
        suggestedAction: 'continue_chat',
        status: 'success',
      };
    }

    // 3. Fallback for unclassified inquiries - escalate safely
    return {
      answer:
        'Thank you for reaching out. I have shared your inquiry with an Academic Administrator so they can review your question with specific context (Ticket status: WAITING_FOR_ADMIN).',
      needsHumanSupport: true,
      suggestedAction: 'escalate_to_admin',
      status: 'success',
    };
  }
}

export const aiSupportAssistant = new SupportAssistantAI();
