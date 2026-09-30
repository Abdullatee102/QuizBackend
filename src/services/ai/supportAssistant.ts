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
    const lower = message.toLowerCase();
    const needsHuman =
      lower.includes('urgent') ||
      lower.includes('refund') ||
      lower.includes('delete account') ||
      lower.includes('human') ||
      lower.includes('representative') ||
      lower.includes('billing');

    let answer =
      'I am your QuizApp Academic AI Assistant. You can ask me questions about LAUTECH courses, CBT practice, theory preparation, or general platform navigation.';

    if (lower.includes('cbt') || lower.includes('quiz') || lower.includes('test')) {
      answer =
        'To take a CBT or theory practice quiz, navigate to Courses, select your level & semester, choose a course, and tap "Start Practice Quiz".';
    } else if (lower.includes('grade') || lower.includes('theory') || lower.includes('ai')) {
      answer =
        'Theory answers are evaluated using AI and verified against academic course rubrics. Scores, feedback, and concept matches are provided immediately after submission.';
    } else if (lower.includes('profile') || lower.includes('department') || lower.includes('faculty')) {
      answer =
        'You can update your academic profile, faculty, department, and level in the Profile tab under Academic Information.';
    } else if (needsHuman) {
      answer =
        'I have flagged your inquiry. For complex account or administrative issues, filing a support ticket for a human academic representative is recommended.';
    }

    return {
      answer,
      needsHumanSupport: needsHuman,
      suggestedAction: needsHuman ? 'create_ticket' : 'continue_chat',
      status: 'success',
    };
  }
}

export const aiSupportAssistant = new SupportAssistantAI();
