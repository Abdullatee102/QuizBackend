import axios from 'axios';
import logger from '../config/logger.js';

/**
 * Brevo Transactional Email Service for QuizApp
 */

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface SendEmailOptions {
  to: EmailRecipient[];
  subject: string;
  htmlContent: string;
  textContent?: string;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailService {
  private readonly brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';

  /**
   * Check if Brevo is configured with an API key and verified sender
   */
  public isConfigured(): boolean {
    return Boolean(
      process.env.BREVO_API_KEY &&
      process.env.BREVO_API_KEY.trim().length > 0 &&
      process.env.MAIL_FROM_EMAIL &&
      process.env.MAIL_FROM_EMAIL.trim().length > 0
    );
  }

  /**
   * Get configured sender name and email
   */
  public getSender(): { name: string; email: string } {
    return {
      name: process.env.MAIL_FROM_NAME || 'QuizApp',
      email: process.env.MAIL_FROM_EMAIL || 'opeabdullateef12@gmail.com',
    };
  }

  /**
   * Generic sender method for transactional emails via Brevo API
   */
  public async sendEmail(options: SendEmailOptions): Promise<EmailSendResult> {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      logger.error('[EMAIL ERROR] BREVO_API_KEY is not configured in environment variables.');
      return {
        success: false,
        error: 'Email service is not configured on the server.',
      };
    }

    const sender = this.getSender();

    try {
      const payload = {
        sender,
        to: options.to.map((recipient) => ({
          email: recipient.email.trim().toLowerCase(),
          name: recipient.name || 'QuizApp Scholar',
        })),
        subject: options.subject,
        htmlContent: options.htmlContent,
        textContent: options.textContent || undefined,
      };

      const response = await axios.post(this.brevoApiUrl, payload, {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 10000,
      });

      const messageId = response.data?.messageId;
      logger.info(
        `[EMAIL SUCCESS] Transactional email delivered via Brevo (Subject: "${options.subject}", Recipients: ${options.to.length})`
      );

      return {
        success: true,
        messageId,
      };
    } catch (error: any) {
      const status = error.response?.status;
      const errorData = error.response?.data;
      const errorMessage = errorData?.message || error.message || 'Unknown email delivery error';

      logger.error(
        `[EMAIL ERROR] Brevo API failed (Status: ${status || 'Network'}): ${errorMessage}`
      );

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Sends an account verification OTP email
   */
  public async sendVerificationEmail(
    toEmail: string,
    otpCode: string,
    fullName?: string
  ): Promise<EmailSendResult> {
    const recipientName = fullName || 'Scholar';
    const subject = `${otpCode} is your QuizApp verification code`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your QuizApp Account</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0F172A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0F172A; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background-color: #1E293B; border-radius: 16px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 32px 30px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 26px; font-weight: 800; letter-spacing: 0.5px;">QuizApp</h1>
              <p style="margin: 6px 0 0; color: #D1FAE5; font-size: 13px; font-weight: 500;">LAUTECH Academic Learning & Assessment Platform</p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px 28px;">
              <h2 style="margin: 0 0 14px; color: #F8FAFC; font-size: 20px; font-weight: 700;">Account Verification</h2>
              <p style="margin: 0 0 20px; color: #94A3B8; font-size: 15px; line-height: 24px;">
                Hello <strong style="color: #F1F5F9;">${recipientName}</strong>,<br>
                Thank you for joining QuizApp. Use the verification code below to confirm your email and activate your student account.
              </p>

              <!-- OTP Code Display Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
                <tr>
                  <td align="center" style="background-color: #0F172A; border: 2px dashed #10B981; border-radius: 12px; padding: 22px;">
                    <span style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #10B981; font-family: 'Courier New', Courier, monospace;">
                      ${otpCode}
                    </span>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; color: #94A3B8; font-size: 13px; line-height: 20px;">
                ⏱️ This verification code expires in <strong>10 minutes</strong>.
              </p>
              <p style="margin: 0; color: #64748B; font-size: 12px; line-height: 18px;">
                If you did not attempt to register on QuizApp, please ignore this email. Your email address remains secure.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #0F172A; padding: 20px 32px; border-top: 1px solid #334155; text-align: center;">
              <p style="margin: 0; color: #64748B; font-size: 11px;">
                &copy; ${new Date().getFullYear()} QuizApp. All rights reserved.<br>
                Ladoke Akintola University of Technology (LAUTECH)
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const textContent = `
Verify your QuizApp account

Hello ${recipientName},

Your verification code is:
${otpCode}

This code expires in 10 minutes.

If you did not create this account, you can ignore this email.

QuizApp - LAUTECH
    `.trim();

    return this.sendEmail({
      to: [{ email: toEmail, name: recipientName }],
      subject,
      htmlContent,
      textContent,
    });
  }

  /**
   * Sends a password reset OTP email
   */
  public async sendPasswordResetEmail(
    toEmail: string,
    otpCode: string,
    fullName?: string
  ): Promise<EmailSendResult> {
    const recipientName = fullName || 'Scholar';
    const subject = `${otpCode} is your QuizApp password reset code`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your QuizApp Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0F172A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0F172A; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background-color: #1E293B; border-radius: 16px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); padding: 32px 30px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 26px; font-weight: 800; letter-spacing: 0.5px;">QuizApp</h1>
              <p style="margin: 6px 0 0; color: #DBEAFE; font-size: 13px; font-weight: 500;">Password Reset Request</p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px 28px;">
              <h2 style="margin: 0 0 14px; color: #F8FAFC; font-size: 20px; font-weight: 700;">Password Reset Code</h2>
              <p style="margin: 0 0 20px; color: #94A3B8; font-size: 15px; line-height: 24px;">
                Hello <strong style="color: #F1F5F9;">${recipientName}</strong>,<br>
                We received a request to reset your QuizApp account password. Use the verification code below to authorize your password change.
              </p>

              <!-- OTP Code Display Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
                <tr>
                  <td align="center" style="background-color: #0F172A; border: 2px dashed #3B82F6; border-radius: 12px; padding: 22px;">
                    <span style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #3B82F6; font-family: 'Courier New', Courier, monospace;">
                      ${otpCode}
                    </span>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; color: #94A3B8; font-size: 13px; line-height: 20px;">
                ⏱️ This code expires in <strong>10 minutes</strong>.
              </p>
              <p style="margin: 0; color: #EF4444; font-size: 12px; line-height: 18px;">
                ⚠️ If you did not request a password reset, do NOT share this code. Your password will remain unchanged unless this code is verified.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #0F172A; padding: 20px 32px; border-top: 1px solid #334155; text-align: center;">
              <p style="margin: 0; color: #64748B; font-size: 11px;">
                &copy; ${new Date().getFullYear()} QuizApp. All rights reserved.<br>
                Ladoke Akintola University of Technology (LAUTECH)
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const textContent = `
Reset your QuizApp Password

Hello ${recipientName},

Your password reset code is:
${otpCode}

This code expires in 10 minutes.

If you did not request this code, you can safely ignore this email.

QuizApp - LAUTECH
    `.trim();

    return this.sendEmail({
      to: [{ email: toEmail, name: recipientName }],
      subject,
      htmlContent,
      textContent,
    });
  }
}

export const emailService = new EmailService();
