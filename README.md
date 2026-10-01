# 🧠 Brain Buzz — QuizApp Backend API

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-v5.2.1-blue.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-v7.0.2-blue.svg)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/drizzle--orm-v0.45.2-green.svg)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL%20%2F%20Neon-336791.svg)](https://neon.tech/)
[![Socket.IO](https://img.shields.io/badge/realtime-Socket.IO%20v4.8.3-black.svg)](https://socket.io/)
[![Google Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%20Flash-orange.svg)](https://ai.google.dev/)
[![Brevo Email](https://img.shields.io/badge/email-Brevo%20API-0B996F.svg)](https://www.brevo.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> High-performance, production-hardened RESTful API and real-time WebSocket backend powering the **Brain Buzz / QuizApp** mobile academic assessment platform. Built with **Express 5**, **TypeScript**, **Drizzle ORM**, **PostgreSQL (Neon)**, **Socket.IO**, **Brevo Email Service**, and **Google Gemini AI**.

---

## 📋 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Database Migration & Seeding](#database-migration--seeding)
  - [Running the Server](#running-the-server)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
  - [Health & Diagnostics](#1-health--diagnostics)
  - [Authentication & Account](#2-authentication--account)
  - [Academic Curriculum & Quizzes](#3-academic-curriculum--quizzes)
  - [Brain Buzz AI Services](#4-brain-buzz-ai-services)
  - [Real-Time Discussions & Messages](#5-real-time-discussions--messages)
  - [Notifications & Device Tokens](#6-notifications--device-tokens)
  - [Support Helpdesk](#7-support-helpdesk)
- [Real-Time WebSockets (Socket.IO)](#-real-time-websockets-socketio)
- [Production Deployment (Render)](#-production-deployment-render)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Contributing & License](#-contributing--license)

---

## 🚀 Overview & Architecture

Brain Buzz is an academic assessment and collaborative learning platform tailored for university students (seeded with LAUTECH's curriculum). The backend handles authentication, dynamic examination delivery (CBT and Theory), randomized question distribution, real-time cohort discussions, transactional OTP verification, and AI-powered essay grading.

```
                      +-----------------------------------+
                      |   Mobile App (Expo / React Native)|
                      +-----------------+-----------------+
                                        |
                 HTTP (REST + JWT)      |      WebSocket (Socket.IO)
                                        v
                      +-----------------+-----------------+
                      |     Express 5 / TypeScript Core   |
                      |   (Helmet, CORS, Rate Limiters)   |
                      +---+-----------+-------------+-----+
                          |           |             |
           +--------------+     +-----+-----+       +----------------+
           |                    |           |                        |
           v                    v           v                        v
+--------------------+ +-------------+ +-----------+ +--------------------+
| PostgreSQL (Neon)  | | Brevo API   | | Gemini AI | | Socket.IO Engine   |
| (Drizzle ORM)      | | (OTP Email) | | (Grading) | | (Rooms & Channels) |
+--------------------+ +-------------+ +-----------+ +--------------------+
```

---

## ✨ Key Features

### 🔐 1. Authentication & Security
- **Dual-Token Architecture**: Short-lived JWT Access Tokens (15 min) and persistent Refresh Token rotation (7 days) stored securely in PostgreSQL.
- **Fail-Fast Startup**: Strict pre-flight boot validator rejecting hardcoded or insecure fallback keys in production.
- **Transactional OTP via Brevo**: Email verification and password reset flows powered by Brevo's transactional HTTP API with template formatting.
- **Google OAuth 2.0**: Native mobile token verification via `google-auth-library`.
- **DDoS & Brute-Force Rate Limiting**: Dedicated rate limiters on sensitive auth endpoints (`10 req/15min` for OTP, `20 req/15min` for login/signup).
- **Helmet & Mobile-Friendly CORS**: Cross-origin policy optimized for mobile applications (accepts curl, server-to-server, and mobile clients without browser `Origin` headers).
- **Zod Validation**: Deep schema validation for all incoming request bodies, queries, and parameters.

### 🏛️ 2. Academic Curriculum Hierarchy
- Complete structural hierarchy: **13 Faculties &rarr; Departments &rarr; Courses &rarr; Levels (100L–500L) &rarr; Semesters (Harmattan & Rain)**.
- Pre-aggregated question banks and seamless database seeder with legacy faculty migration (`src/seed.ts`).
- Support for LAUTECH faculties: `FAG`, `FASS`, `FBCS`, `FBMS`, `FCI`, `FCS`, `FES`, `FET`, `FFCS`, `FMGS`, `FNS`, `FPAS`, and `FRNR`.

### ⏱️ 3. Assessment & Examination Engine
- **Dynamic Assessment Randomization**: Questions and CBT options are shuffled per attempt so no two test sessions are identical.
- **Mixed Faculty Practice Quiz (`/questions/mixed`)**: Cross-faculty challenge aggregating randomized questions from all 13 faculties (up to 30 questions) filtered by academic level.
- **Accurate Server-Side Grading**: Flexible `gradeQuiz` engine performing exact question ID lookups, handling both single-course and mixed-faculty assessments.
- **Anti-Cheat Lifecycle Support**: Designed to work with mobile Fair Play rules (anti-minimize detection, single continuous countdown timer, review mode).
- **Performance & Gamification**: Tracks quiz history, percentage scores, global leaderboards, course recommendations, and unlocks achievements.

### 🤖 4. Brain Buzz AI Suite (Google Gemini)
- **AI Theory Exam Grader**: Uses `@google/genai` (Gemini 2.5/Flash) to semantically score theory answers against concept rubrics, returning granular marks, concept mastery feedback, and confidence ratings.
- **Deterministic Fallback**: Automatic keyword/concept matching fallback ensures exams are graded even if the AI service experiences latency or network interruptions.
- **AI Student Support Assistant**: Contextual chatbot providing immediate answers to student inquiries regarding curriculum, courses, and app features.

### 💬 5. Real-Time Cohort Discussions (Socket.IO)
- Secure JWT-authenticated WebSocket connection handshake.
- Scoped room partitioning:
  - Personal user inbox: `user:<userId>`
  - Faculty general: `faculty:<facultyId>`
  - Department general: `department:<departmentId>`
  - Level-specific channel: `department:<deptId>:level:<level>`
  - Direct / Group conversations: `conversation:<conversationId>`
  - Support ticket room: `support:<requestId>`
- Real-time events: `send_message`, `new_message`, room joining/leaving, and unread counters.

### 🎫 6. Helpdesk & Support System
- Student support ticket creation and threaded message exchanges.
- Ticket lifecycle management (`open`, `in_progress`, `resolved`, `closed`).

### 📱 7. Device Token Management
- Registration and unregistration of Expo push notification tokens for mobile delivery.
- In-app notification inbox with read/unread status management.

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Description |
|---|---|---|---|
| **Runtime** | [Node.js](https://nodejs.org/) | `>=20.0.0` | Server JavaScript runtime |
| **Framework** | [Express](https://expressjs.com/) | `^5.2.1` | Next-generation web framework |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^7.0.2` | Strongly typed JavaScript |
| **Execution** | [tsx](https://github.com/privatenumber/tsx) | `^4.23.13` | Fast TypeScript execution & watcher |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) | `^0.45.2` | Type-safe SQL query builder & schema |
| **Database** | [PostgreSQL](https://neon.tech/) | `^8.23.0` | Hosted serverless Postgres on Neon |
| **Real-Time** | [Socket.IO](https://socket.io/) | `^4.8.3` | Bidirectional event-based WebSockets |
| **AI Engine** | [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) | `^2.24.0` | Gemini 2.5 Flash theory grader & assistant |
| **Email Service** | [Brevo REST API](https://www.brevo.com/) | `Axios ^1.19.0` | Transactional OTP and verification emails |
| **Security** | [Helmet](https://helmetjs.github.io/) | `^8.3.0` | HTTP security headers |
| **Rate Limiter** | [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | `^8.7.0` | IP-based request throttling |
| **Validation** | [Zod](https://zod.dev/) | `^4.4.3` | TypeScript-first schema validation |
| **Logging** | [Winston](https://github.com/winstonjs/winston) | `^3.19.0` | Multi-transport structured logging |

---

## 📁 Project Structure

```
QuizBackend/
├── package.json                   # Dependencies, scripts, and Node engine specifications
├── tsconfig.json                  # TypeScript compiler options
├── drizzle.config.ts              # Drizzle ORM configuration
├── .env.example                   # Environment variable template
├── src/
│   ├── server.ts                  # Application entry point, Express & HTTP server bootstrap
│   ├── seed.ts                    # Master database seeding script
│   ├── config/
│   │   ├── env.ts                 # Pre-flight environment variable validation
│   │   ├── logger.ts              # Winston structured logger configuration
│   │   └── ai.ts                  # Gemini AI client configuration
│   ├── controllers/
│   │   ├── auth.controller.ts     # User authentication, OTP, profile, leaderboard
│   │   ├── quiz.controller.ts     # Faculties, departments, courses, questions, mixed quiz
│   │   ├── ai.controller.ts       # Theory grading and student assistant endpoints
│   │   ├── message.controller.ts  # Academic channels and conversations
│   │   ├── notification.controller.ts # Push tokens and notification inbox
│   │   └── support.controller.ts  # Helpdesk tickets and messages
│   ├── db/
│   │   ├── index.ts               # PostgreSQL connection pool & Drizzle ORM instance
│   │   └── schema.ts              # Complete relational PostgreSQL database schema
│   ├── middlewares/
│   │   ├── auth.middleware.ts     # JWT Bearer token protection guard
│   │   ├── rateLimit.middleware.ts# Auth and OTP rate limiters
│   │   └── validate.middleware.ts # Zod request validation middleware
│   ├── routes/
│   │   ├── auth.routes.ts         # /api/auth routes
│   │   ├── ai.routes.ts           # /api/ai routes
│   │   ├── message.routes.ts      # /api/messages routes
│   │   ├── notification.routes.ts # /api/notifications routes
│   │   └── support.routes.ts      # /api/support routes
│   ├── schemas/                   # Zod validation schemas for all routes
│   │   ├── auth.schemas.ts
│   │   ├── ai.schemas.ts
│   │   ├── message.schemas.ts
│   │   ├── notification.schemas.ts
│   │   └── support.schemas.ts
│   ├── services/
│   │   ├── authService.ts         # User management, tokens, profile, quiz history
│   │   ├── quizService.ts         # Academic curriculum queries, grading, randomization
│   │   ├── emailService.ts        # Brevo transactional email sender
│   │   ├── messageService.ts      # Real-time discussion message storage
│   │   ├── notificationService.ts # Device tokens and in-app alerts
│   │   ├── supportService.ts      # Helpdesk ticket handling
│   │   └── ai/                    # Brain Buzz AI Suite
│   │       ├── geminiClient.ts    # Google GenAI client abstraction
│   │       ├── theoryGrader.ts    # Semantic rubric-based theory answer grader
│   │       ├── supportAssistant.ts# Student AI chat assistant
│   │       ├── prompts.ts         # Structured system prompts for Gemini
│   │       └── types.ts           # AI service interfaces
│   ├── socket/
│   │   └── index.ts               # Socket.IO initialization, JWT auth, room routing
│   ├── seed/
│   │   ├── types.ts               # Curriculum tree type definitions
│   │   └── faculties/             # Comprehensive question banks per faculty
│   │       ├── index.ts           # CURRICULUM_TREE master export
│   │       ├── fag.ts, fass.ts, fbcs.ts, fbms.ts, fci.ts, fcs.ts,
│   │       ├── fes.ts, fet.ts, ffcs.ts, fmgs.ts, fns.ts, fpas.ts, frnr.ts
│   └── scripts/
│       ├── migrateSchema.ts       # Database schema column synchronization
│       ├── verifyProductionReadiness.ts # 15-point end-to-end audit verification test
│       ├── testBrevoEmail.ts      # Brevo transactional email integration test
│       ├── testDynamicQuiz.ts     # Dynamic assessment test
│       └── testRandomization.ts   # Assessment shuffle integrity test
```

---

## 🚦 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **PostgreSQL**: A running instance (or a free serverless database on [Neon.tech](https://neon.tech))
- **Brevo Account**: For API key and sender verification ([Brevo](https://www.brevo.com/))
- **Google AI Studio Key** *(Optional)*: For Gemini AI features ([Google AI Studio](https://aistudio.google.com/))

### Installation

Clone the repository and install all dependencies:

```bash
git clone https://github.com/Abdullatee102/QuizBackend.git
cd QuizBackend
npm install
```

### Environment Configuration

Create a `.env` file in the root directory by copying the provided template:

```bash
cp .env.example .env
```

Open `.env` and fill in your credentials:

```ini
NODE_ENV=development
PORT=5000

# PostgreSQL Connection String (Neon)
DATABASE_URL=postgresql://user:password@ep-sample-host.region.neon.tech/quizapp?sslmode=require

# Authentication Secrets (Must be secure, random strings)
JWT_SECRET=your_super_secret_jwt_access_key
REFRESH_SECRET=your_super_secret_jwt_refresh_key

# Brevo Transactional Email Service
BREVO_API_KEY=xkeysib-your_brevo_api_key_here
MAIL_FROM_EMAIL=your_verified_sender@domain.com
MAIL_FROM_NAME=QuizApp

# Google Gemini AI Integration (Optional)
GEMINI_API_KEY=AIzaSyYourGeminiApiKeyHere
GEMINI_MODEL=gemini-3.8-flash
GEMINI_TIMEOUT_MS=15000

# CORS (Optional - default allows all mobile origins)
CORS_ORIGIN=*
```

### Database Migration & Seeding

Populate the database with all 13 faculties, departments, courses, and comprehensive question banks:

```bash
# Seed curriculum and question banks
npm run seed
```

*(Optional)* Synchronize any missing schema columns manually:

```bash
npm run migrate
```

### Running the Server

#### Development Mode (with hot-reload):
```bash
npm run dev
```

#### Production Build & Execution:
```bash
# Compile TypeScript to dist/
npm run build

# Start the compiled production server
npm start
```

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NODE_ENV` | No | `development` | Environment mode (`development` / `production`) |
| `PORT` | No | `5000` | HTTP port the server listens on |
| `DATABASE_URL` | **Yes** | — | PostgreSQL connection string (`postgresql://...`) |
| `JWT_SECRET` | **Yes** | — | Secret key for signing 15-minute access tokens |
| `REFRESH_SECRET` | **Yes** | — | Secret key for signing 7-day refresh tokens |
| `BREVO_API_KEY` | **Yes** | — | Brevo API key for transactional emails (`xkeysib-...`) |
| `MAIL_FROM_EMAIL` | **Yes** | — | Verified sender email configured in Brevo |
| `MAIL_FROM_NAME` | No | `QuizApp` | Sender display name in transactional emails |
| `CORS_ORIGIN` | No | `*` | Allowed CORS origins (comma-separated or `*`) |
| `GEMINI_API_KEY` | No | — | Google Gemini API key for AI theory grading & assistant |
| `GEMINI_MODEL` | No | `gemini-3.8-flash` | Gemini model name |
| `GEMINI_TIMEOUT_MS`| No | `15000` | Maximum timeout (ms) for Gemini AI calls |
| `GOOGLE_WEB_CLIENT_ID`| No | — | Google OAuth client ID for mobile Google Sign-In |
| `EXPO_ACCESS_TOKEN` | No | — | Expo access token for push notifications |

---

## 📡 API Reference

All protected endpoints require the HTTP Authorization header:
```http
Authorization: Bearer <access_token>
```

### 1. Health & Diagnostics

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | Public | Live health probe checking server uptime and database `SELECT 1` ping |
| `GET` | `/api/health` | Public | Alias health check endpoint for cloud load balancers and orchestrators |

**Sample Response (`GET /health`):**
```json
{
  "status": "success",
  "uptime": 1420,
  "timestamp": "2026-10-01T22:00:00.000Z",
  "services": {
    "application": "running",
    "database": "connected",
    "realtime": "Socket.IO active"
  }
}
```

---

### 2. Authentication & Account

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Public | Register new student account (`fullName`, `email`, `password`, etc.) |
| `POST` | `/api/auth/login` | Public | Authenticate with email/username/phone & password |
| `POST` | `/api/auth/google` | Public | Sign in or sign up with a Google OAuth ID token |
| `POST` | `/api/auth/send-otp` | Public | Dispatch 6-digit email verification code via Brevo |
| `POST` | `/api/auth/verify-otp` | Public | Validate OTP; auto-logs in or validates reset token |
| `POST` | `/api/auth/forgot-password` | Public | Send password reset OTP email |
| `POST` | `/api/auth/reset-password` | Public | Reset password using verified email, OTP, and new password |
| `POST` | `/api/auth/refresh-token` | Public | Rotate refresh token and acquire new 15-minute access token |
| `POST` | `/api/auth/change-password`| Bearer | Change password while authenticated |
| `POST` | `/api/auth/logout` | Bearer | Invalidate active refresh token in database |
| `DELETE`| `/api/auth/account` | Bearer | Permanently delete user profile and associated data |
| `GET` | `/api/auth/me` | Bearer | Verify token validity and return current user token claims |
| `GET` | `/api/auth/profile` | Bearer | Get full student profile, academic stats, badges, and history |
| `PATCH`| `/api/auth/profile` | Bearer | Update profile info (`fullName`, `bio`, `photoURL`, `facultyId`, `departmentId`, `level`) |

---

### 3. Academic Curriculum & Quizzes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/auth/faculties` | Bearer | Retrieve all 13 faculties (Computer Science / Computing listed first) |
| `GET` | `/api/auth/faculties/:facultyId/departments` | Bearer | Retrieve departments under a specific faculty |
| `GET` | `/api/auth/departments/:departmentId/courses` | Bearer | Retrieve courses filtered by `level` and `semester` |
| `GET` | `/api/auth/courses/:courseId/questions` | Bearer | Fetch randomized questions (`?type=cbt\|theory&limit=30`) |
| `GET` | `/api/auth/questions/mixed` | Bearer | **All-Faculties Practice Quiz**: Fetches up to 30 randomized questions across all 13 faculties (`?level=100&type=cbt`) |
| `POST` | `/api/auth/quiz-history` | Bearer | Submit completed assessment answers for server grading and history storage |
| `GET` | `/api/auth/quiz-history` | Bearer | Get user's completed quiz history with reviewable answers and scores |
| `GET` | `/api/auth/leaderboard` | Bearer | Global student leaderboard ranked by correct answers and quiz scores |
| `GET` | `/api/auth/recommended-courses` | Bearer | Recommended courses based on student faculty, department, and level |
| `GET` | `/api/auth/achievements` | Bearer | List student unlocked achievements and badge progress |
| `POST` | `/api/auth/achievements/unlock`| Bearer | Manually unlock a specific badge (e.g. `hatrick`, `cbt_master`) |

---

### 4. Brain Buzz AI Services

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/ai/status` | Bearer | Check availability and active model name of the Gemini AI integration |
| `POST` | `/api/ai/theory/grade` | Bearer | AI semantic grading of a theory question against a rubric |
| `POST` | `/api/ai/support` | Bearer | AI Student Assistant answering academic queries and FAQs |

**Sample Request (`POST /api/ai/theory/grade`):**
```json
{
  "question": "Explain the role of the CPU in a computer system.",
  "studentAnswer": "The CPU is the central processing unit that executes instructions and processes data using the ALU and control unit.",
  "expectedAnswer": "The Central Processing Unit (CPU) is the primary component that performs calculations, executes instructions, and coordinates hardware via the ALU, CU, and registers.",
  "maxMarks": 10,
  "gradingPoints": [
    { "concept": "Execution of instructions", "weight": 4 },
    { "concept": "ALU and Control Unit components", "weight": 3 },
    { "concept": "Data processing and hardware coordination", "weight": 3 }
  ]
}
```

**Sample Response:**
```json
{
  "status": "success",
  "score": 9.5,
  "maxMarks": 10,
  "percentage": 95,
  "feedback": "Excellent explanation. Accurately captured instruction execution and core CPU components.",
  "conceptBreakdown": [
    { "concept": "Execution of instructions", "score": 4, "maxScore": 4, "mastered": true },
    { "concept": "ALU and Control Unit components", "score": 3, "maxScore": 3, "mastered": true },
    { "concept": "Data processing and hardware coordination", "score": 2.5, "maxScore": 3, "mastered": true }
  ],
  "confidence": 0.96
}
```

---

### 5. Real-Time Discussions & Messages

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/messages/academic-channels` | Bearer | List available academic discussion channels matching student enrollment |
| `POST` | `/api/messages/academic-channels/join` | Bearer | Join a channel by faculty, department, or level |
| `GET` | `/api/messages/conversations` | Bearer | List user's active conversations with latest message preview and unread counts |
| `GET` | `/api/messages/conversations/:conversationId` | Bearer | Get details of a single conversation |
| `GET` | `/api/messages/conversations/:conversationId/messages` | Bearer | Get paginated message history of a discussion channel |
| `POST` | `/api/messages/conversations/:conversationId/messages` | Bearer | Send a message to a discussion channel |
| `GET` | `/api/messages/conversations/unread-count` | Bearer | Get total unread conversations count |

---

### 6. Notifications & Device Tokens

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/notifications/devices` | Bearer | Register an Expo push token (`expoPushToken`, `platform`) |
| `DELETE`| `/api/notifications/devices` | Bearer | Unregister a device push token |
| `GET` | `/api/notifications` | Bearer | Retrieve user notification inbox |
| `PATCH`| `/api/notifications/:id/read` | Bearer | Mark a specific notification as read |
| `PATCH`| `/api/notifications/read-all` | Bearer | Mark all notifications as read |

---

### 7. Support Helpdesk

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/support/requests` | Bearer | List user's open and resolved support tickets |
| `POST` | `/api/support/requests` | Bearer | Create a new support ticket (`subject`, `description`, `category`, `priority`) |
| `GET` | `/api/support/requests/:requestId` | Bearer | Get ticket details and conversation thread |
| `POST` | `/api/support/requests/:requestId/messages` | Bearer | Reply to an existing support ticket |
| `PATCH`| `/api/support/requests/:requestId/status` | Bearer | Update ticket status (`open`, `in_progress`, `resolved`, `closed`) |

---

## ⚡ Real-Time WebSockets (Socket.IO)

The backend exposes a Socket.IO server on the same HTTP port with mandatory JWT handshake authentication.

### Handshake Authentication
Clients must authenticate by providing the JWT access token in `auth.token`:

```javascript
import { io } from 'socket.io-client';

const socket = io('https://your-backend.onrender.com', {
  auth: {
    token: accessToken, // or 'Bearer <token>'
  },
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to Brain Buzz Realtime:', socket.id);
});
```

### Client-to-Server Events

| Event | Payload | Description |
|---|---|---|
| `join:faculty` | `facultyId: string` | Join faculty-wide discussion room (`faculty:<id>`) |
| `join:department` | `departmentId: string` | Join department channel (`department:<id>`) |
| `join:level` | `{ level: number, departmentId?: string }` | Join department level room (`department:<deptId>:level:<level>`) |
| `join:conversation` | `conversationId: string` | Join a conversation room (`conversation:<id>`) |
| `join:support` | `requestId: string` | Join a support ticket room (`support:<id>`) |
| `leave:room` | `room: string` | Leave any joined room |
| `send_message` | `{ conversationId: string, text: string }` | Send a message in real-time |

### Server-to-Client Events

| Event | Payload | Description |
|---|---|---|
| `joined` | `{ room: string }` | Acknowledgment confirming room join |
| `new_message` | `MessageObject` | Emitted when a new message is posted in a conversation room |
| `error` | `{ message: string }` | Error notification during socket operations |

---

## 🚀 Production Deployment (Render)

This repository is pre-configured for seamless zero-downtime deployment on [Render](https://render.com) or similar container and PaaS environments.

### Render Configuration Steps

1. **Create a New Web Service** on Render and connect your GitHub repository `Abdullatee102/QuizBackend`.
2. **Environment & Runtime**: Select **Node**.
3. **Build Command**:
   ```bash
   npm run build
   ```
4. **Start Command**:
   ```bash
   npm start
   ```
5. **Node Engine Requirement**: Ensure Node.js version is set to **`20.0.0` or higher**. Render will automatically detect the `"engines": { "node": ">=20.0.0" }` in `package.json`.
6. **Health Check Path**: Set Health Check Path to:
   ```text
   /health
   ```
7. **Environment Variables**: Add all mandatory environment variables (`DATABASE_URL`, `JWT_SECRET`, `REFRESH_SECRET`, `BREVO_API_KEY`, `MAIL_FROM_EMAIL`, `MAIL_FROM_NAME`, `GEMINI_API_KEY`, etc.) in the Render dashboard.

---

## 🧪 Testing & Quality Assurance

The codebase includes specialized scripts to test production readiness, email delivery, assessment integrity, and random shuffling:

```bash
# 1. Full 15-Point Production Readiness Audit
# Verifies DB ping, fail-fast secrets, health endpoints, Helmet, rate-limiter,
# Socket.IO auth, curriculum data, and graceful shutdown sequence
npx tsx src/scripts/verifyProductionReadiness.ts

# 2. Test Brevo Transactional Email Integration
npx tsx src/scripts/testBrevoEmail.ts

# 3. Test Dynamic Assessment Generation
npx tsx src/scripts/testDynamicQuiz.ts

# 4. Test Assessment Randomization & Choice Shuffling
npx tsx src/scripts/testRandomization.ts
```

---

## 📄 Contributing & License

Developed with ❤️ by **Popoola Abdullateef** for the Brain Buzz Academic Platform.

This project is licensed under the **ISC License**. See the `package.json` file for details.
