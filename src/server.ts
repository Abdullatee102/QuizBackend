import express from 'express';
import type { Application, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

import { validateEnvironment } from './config/env.js';
import logger from './config/logger.js';
import { pool, verifyDatabaseConnection } from './db/index.js';
import authRoutes from './routes/auth.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import messageRoutes from './routes/message.routes.js';
import supportRoutes from './routes/support.routes.js';
import aiRoutes from './routes/ai.routes.js';
import { socketService } from './socket/index.js';

// =====================================================
// STEP 1: VALIDATE REQUIRED PRODUCTION ENVIRONMENT VARIABLES
// =====================================================
const envConfig = validateEnvironment();
const PORT = envConfig.PORT;

const app: Application = express();
const httpServer = http.createServer(app);

// =====================================================
// STEP 2: SECURITY HEADERS & BODY PARSING
// =====================================================
// Helmet security headers configured to avoid interfering with mobile/cross-origin apps
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  })
);

app.use(express.json({ limit: '10mb' }));

// =====================================================
// STEP 3: CORS CONFIGURATION
// =====================================================
const allowedOrigins =
  envConfig.CORS_ORIGIN === '*'
    ? '*'
    : envConfig.CORS_ORIGIN.split(',').map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow native mobile apps, curl, server-to-server requests with no browser origin
      if (
        !origin ||
        allowedOrigins === '*' ||
        (Array.isArray(allowedOrigins) && allowedOrigins.includes(origin))
      ) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);

// =====================================================
// STEP 4: SOCKET.IO REAL-TIME INITIALIZATION
// =====================================================
socketService.init(httpServer);

// =====================================================
// STEP 5: APPLICATION ROUTE GROUPS
// =====================================================
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/ai', aiRoutes);

// =====================================================
// STEP 6: HEALTH CHECK ENDPOINTS (/health and /api/health)
// =====================================================
const healthCheckHandler = async (_req: Request, res: Response) => {
  let dbReachable = false;
  let client;

  try {
    client = await pool.connect();
    await client.query('SELECT 1');
    dbReachable = true;
  } catch (error: any) {
    logger.error(`[HEALTH CHECK] Database probe failed: ${error.message}`);
    dbReachable = false;
  } finally {
    if (client) {
      client.release();
    }
  }

  const payload = {
    status: dbReachable ? 'success' : 'degraded',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    services: {
      application: 'running',
      database: dbReachable ? 'connected' : 'unreachable',
      realtime: 'Socket.IO active',
    },
  };

  if (!dbReachable) {
    res.status(503).json(payload);
    return;
  }

  res.status(200).json(payload);
};

app.get('/health', healthCheckHandler);
app.get('/api/health', healthCheckHandler);

// =====================================================
// STEP 7: GRACEFUL SHUTDOWN & LIFECYCLE MANAGEMENT
// =====================================================
let isShuttingDown = false;

const initiateGracefulShutdown = (signal: string) => {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;
  logger.info(`[SHUTDOWN] Received ${signal}. Initiating graceful shutdown...`);

  const forceExitTimeout = setTimeout(() => {
    logger.error('[SHUTDOWN] Graceful shutdown timed out. Terminating process forcefully.');
    process.exit(1);
  }, 10000);
  forceExitTimeout.unref();

  httpServer.close(async (err) => {
    if (err) {
      logger.error('[SHUTDOWN] Error closing HTTP server:', err);
    } else {
      logger.info('[SHUTDOWN] HTTP server closed. No longer accepting new requests.');
    }

    try {
      const io = socketService.getIO();
      if (io) {
        io.close();
        logger.info('[SHUTDOWN] Socket.IO connections closed.');
      }
    } catch (e: any) {
      logger.error(`[SHUTDOWN] Error closing Socket.IO: ${e.message}`);
    }

    try {
      await pool.end();
      logger.info('[SHUTDOWN] PostgreSQL connection pool drained.');
    } catch (e: any) {
      logger.error(`[SHUTDOWN] Error draining DB pool: ${e.message}`);
    }

    logger.info('[SHUTDOWN] Graceful shutdown completed cleanly.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => initiateGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => initiateGracefulShutdown('SIGINT'));

process.on('uncaughtException', (err: Error) => {
  logger.error('[FATAL] Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason: any) => {
  logger.error('[FATAL] Unhandled Rejection:', reason);
});

// =====================================================
// STEP 8: START SERVER WITH DATABASE VERIFICATION
// =====================================================
async function startServer() {
  const dbConnected = await verifyDatabaseConnection();
  if (!dbConnected) {
    logger.error('[FATAL] Could not connect to PostgreSQL. Aborting server launch.');
    process.exit(1);
  }

  httpServer.listen(PORT, () => {
    logger.info(`[SERVER] QuizBackend is running on port ${PORT} (NODE_ENV: ${envConfig.NODE_ENV})`);
    logger.info(`[SERVER] Health check available at: http://localhost:${PORT}/health and /api/health`);
  });
}

startServer();