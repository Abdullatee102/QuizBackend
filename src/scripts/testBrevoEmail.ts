import dotenv from 'dotenv';
dotenv.config();

import { emailService } from '../services/emailService.js';
import { authService } from '../services/authService.js';

async function runEmailAndOtpTests() {
  console.log('====================================================');
  console.log('  BREVO TRANSACTIONAL EMAIL & OTP SECURITY TEST');
  console.log('====================================================');

  // TEST 1: Check Brevo configuration
  console.log('\n[TEST 1] Verifying Brevo Configuration...');
  const isConfigured = emailService.isConfigured();
  const sender = emailService.getSender();
  console.log(`- Configured: ${isConfigured ? 'YES (PASS)' : 'NO (FAIL)'}`);
  console.log(`- Sender Name: ${sender.name}`);
  console.log(`- Sender Email: ${sender.email}`);

  if (!isConfigured) {
    console.error('ERROR: Brevo is not configured. Check BREVO_API_KEY and MAIL_FROM_EMAIL in .env');
    process.exit(1);
  }

  // TEST 2: OTP Security & Hash Verification
  console.log('\n[TEST 2] Testing Cryptographic OTP Hashing & Throttling...');
  const testEmail = 'test.scholar@lautech.edu.ng';

  const generatedOtp = authService.generateOtp(testEmail);
  console.log(`- Generated 6-digit OTP: ${generatedOtp.length === 6 && /^\d{6}$/.test(generatedOtp) ? 'PASS (6 digits)' : 'FAIL'}`);

  // Test invalid code rejection
  const invalidResult = authService.verifyOtpCode(testEmail, '000000');
  console.log(`- Rejection of invalid OTP ("000000"): ${!invalidResult ? 'PASS (Correctly rejected)' : 'FAIL'}`);

  // Test valid code acceptance
  const validResult = authService.verifyOtpCode(testEmail, generatedOtp);
  console.log(`- Acceptance of valid OTP: ${validResult ? 'PASS (Verified)' : 'FAIL'}`);

  // Test single-use prevention (cannot reuse same code)
  const reuseResult = authService.verifyOtpCode(testEmail, generatedOtp);
  console.log(`- Prevention of OTP re-use: ${!reuseResult ? 'PASS (Single-use enforced)' : 'FAIL'}`);

  // Test max attempts throttling (5 attempts)
  const throttleEmail = 'throttle.test@lautech.edu.ng';
  const throttleOtp = authService.generateOtp(throttleEmail);
  console.log(`- Testing brute-force throttling on ${throttleEmail}...`);
  for (let i = 1; i <= 5; i++) {
    authService.verifyOtpCode(throttleEmail, '111111');
  }
  // 6th attempt with the REAL code should now fail because max attempts was reached
  const throttledResult = authService.verifyOtpCode(throttleEmail, throttleOtp);
  console.log(`- Lockout after 5 failed attempts: ${!throttledResult ? 'PASS (Throttled & locked out)' : 'FAIL'}`);

  // TEST 3: Live Verification Email via Brevo API
  console.log('\n[TEST 3] Dispatching Live Account Verification Email via Brevo...');
  const targetEmail = process.env.MAIL_FROM_EMAIL || 'opeabdullateef12@gmail.com';
  const liveVerificationOtp = authService.generateOtp(targetEmail);

  console.log(`- Sending verification email to verified recipient: ${targetEmail}`);
  const verificationResult = await emailService.sendVerificationEmail(
    targetEmail,
    liveVerificationOtp,
    'Abdullateef (QuizApp Admin)'
  );

  console.log(`- Verification Email Result: ${verificationResult.success ? 'SUCCESS (PASS)' : 'FAILED'}`);
  if (verificationResult.success) {
    console.log(`- Brevo Message ID: ${verificationResult.messageId}`);
  } else {
    console.error(`- Error: ${verificationResult.error}`);
  }

  // TEST 4: Live Password Reset Email via Brevo API
  console.log('\n[TEST 4] Dispatching Live Password Reset Email via Brevo...');
  const liveResetOtp = authService.generateOtp(targetEmail);

  console.log(`- Sending password reset email to verified recipient: ${targetEmail}`);
  const resetResult = await emailService.sendPasswordResetEmail(
    targetEmail,
    liveResetOtp,
    'Abdullateef (QuizApp Admin)'
  );

  console.log(`- Password Reset Email Result: ${resetResult.success ? 'SUCCESS (PASS)' : 'FAILED'}`);
  if (resetResult.success) {
    console.log(`- Brevo Message ID: ${resetResult.messageId}`);
  } else {
    console.error(`- Error: ${resetResult.error}`);
  }

  console.log('\n====================================================');
  console.log('  TEST SUITE COMPLETED SUCCESSFULLY');
  console.log('====================================================');
}

runEmailAndOtpTests().catch((err) => {
  console.error('Unhandled error in test:', err);
  process.exit(1);
});
