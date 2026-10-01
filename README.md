# 🧠 Brain Buzz — QuizApp Backend API

High-performance RESTful API and real-time WebSocket backend for the Brain Buzz mobile academic assessment platform. Built with **Express 5, TypeScript, Drizzle ORM, PostgreSQL (Neon), Socket.IO, Brevo Email, and Google Gemini AI**.

---

## 📋 Table of Contents

- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Core Features & Architecture](#-core-features--architecture)

---

## 🛠️ Tech Stack

- **Runtime & Framework:** Node.js >= 20.0.0, Express 5, TypeScript
- **Database & ORM:** PostgreSQL (Neon Serverless), Drizzle ORM
- **Real-Time Communication:** Socket.IO v4.8
- **AI Integration:** Google GenAI SDK (Gemini Flash)
- **Security & Validation:** Helmet, Express Rate Limit, Zod
- **Email Service:** Brevo REST API

---

## 📁 Project Structure

```text
QuizBackend/
├── package.json              # Dependencies, scripts, and engine configuration
├── tsconfig.json             # TypeScript compiler configuration
├── drizzle.config.ts         # Drizzle ORM configuration
├── .env.example              # Environment variable template
└── src/
    ├── server.ts             # Application entry point and HTTP/WebSocket bootstrap
    ├── seed.ts               # Master database seeder
    ├── config/               # Environment, logger, and Gemini AI configuration
    ├── controllers/          # Route handlers for Auth, Quiz, AI, Messages, and Support
    ├── db/                   # Neon database connection and schema definitions
    ├── middlewares/          # JWT authentication, rate limiting, and Zod validation
    ├── routes/               # Express route definitions
    ├── schemas/              # Zod request validation schemas
    ├── services/             # Business logic for Auth, Quiz, Email, AI, Messages, and Support
    ├── socket/               # Socket.IO connection handling and room partitioning
    ├── seed/                 # Structured curriculum tree and faculty question banks
    └── scripts/               # Production verification and integration test scripts
```

---

## 🚦 Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Abdullatee102/QuizBackend.git

cd QuizBackend

npm install
```

### 2. Environment Setup

Create your local environment configuration from the provided template:

```bash
cp .env.example .env
```

Configure the required credentials and environment variables in your `.env` file before starting the application.

### 3. Database Seeding & Execution

Seed the curriculum data and question banks:

```bash
npm run seed
```

Run the application in development mode with hot reloading:

```bash
npm run dev
```

Build and start the application in production mode:

```bash
npm run build && npm start
```

---

## 🔑 Environment Variables

| Variable          | Required | Description                                                           |
| ----------------- | -------- | --------------------------------------------------------------------- |
| `NODE_ENV`        | No       | Environment mode (`development` / `production`)                       |
| `PORT`            | No       | HTTP port (default: `5000`)                                           |
| `DATABASE_URL`    | Yes      | PostgreSQL connection string                                          |
| `JWT_SECRET`      | Yes      | Secret key for access tokens                                          |
| `REFRESH_SECRET`  | Yes      | Secret key for refresh tokens                                         |
| `BREVO_API_KEY`   | Yes      | Brevo API key for transactional emails                                |
| `MAIL_FROM_EMAIL` | Yes      | Verified sender email address                                         |
| `GEMINI_API_KEY`  | No       | Google Gemini API key for AI theory grading and the support assistant |
| `CORS_ORIGIN`     | No       | Allowed CORS origins (`*` by default)                                 |

---

## 🚀 Core Features & Architecture

### 🔐 Dual-Token Authentication & Security

- Short-lived JWT access tokens with a 15-minute lifetime.
- Refresh token rotation for session renewal.
- Protected endpoints with authentication and authorization middleware.
- Endpoint rate limiting and security headers.

### 🎓 Academic Hierarchy

- Academic curriculum based on LAUTECH's faculty, department, programme, course, level, and semester structure.
- Seeded curriculum covering 13 faculties.
- Support for academic levels from 100L to 500L.
- Structured curriculum data designed to support course organization across academic programmes.

### 📝 Assessment Engine

- Computer-Based Test (CBT) and theory question support.
- Randomized answer-option shuffling.
- Mixed-faculty practice modes.
- Server-side answer evaluation and grading.
- Quiz-related data retrieval and processing.

### 🤖 Brain Buzz AI Suite

- Google Gemini integration for semantic, rubric-based theory grading.
- AI-powered student support assistant.
- Backend service organization for AI requests and response processing.

### 💬 Real-Time Discussions & Messaging

- Socket.IO-powered real-time communication.
- Secure discussion rooms partitioned by faculty, department, and academic level.
- Direct conversation support.
- Support helpdesk threads and real-time messaging.
- Authenticated socket connections and controlled room access.

### 📧 Transactional Email

- Brevo REST API integration.
- Email delivery for supported authentication and account-related workflows.
- Environment-based email service configuration.

---

Built to power the Brain Buzz mobile application with a focus on **security, maintainability, reliable assessment workflows, and scalable academic data management**.
