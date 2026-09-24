import express from 'express';

import type {
  Application,
  Request,
  Response,
} from 'express';

import cors from 'cors';

import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';

import notificationRoutes from './routes/notification.routes.js';

import messageRoutes from './routes/message.routes.js';

import logger from './config/logger.js';

dotenv.config();

const app: Application = express();

const PORT =
  process.env.PORT || 5000;

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());

app.use(cors());

// =====================================================
// AUTH ROUTES
// =====================================================

app.use(
  '/api/auth',
  authRoutes
);

// =====================================================
// NOTIFICATION ROUTES
// =====================================================

app.use(
  '/api/notifications',
  notificationRoutes
);

// =====================================================
// MESSAGE ROUTES
// =====================================================

app.use(
  '/api/messages',
  messageRoutes
);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get(
  '/api/health',
  (
    req: Request,
    res: Response
  ) => {

    res.status(200).json({
      status: 'success',
      message:
        'Backend server is running smoothly!',
    });
  }
);

// =====================================================
// START SERVER
// =====================================================

app.listen(
  PORT,
  () => {

    logger.info(
      `Server is running on http://localhost:${PORT}`
    );
  }
);