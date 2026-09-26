import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';
import { messageService } from '../services/messageService.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export interface AuthenticatedSocket extends Socket {
  data: {
    user?: {
      id: string;
      email?: string;
      phoneNumber?: string;
      username?: string;
    };
  };
}

let io: SocketIOServer | null = null;

export const socketService = {
  // =====================================================
  // INITIALIZE SOCKET.IO WITH HTTP SERVER
  // =====================================================
  init: (httpServer: HttpServer): SocketIOServer => {
    io = new SocketIOServer(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      },
      pingTimeout: 30000,
      pingInterval: 25000,
    });

    // ===================================================
    // SOCKET JWT AUTHENTICATION MIDDLEWARE
    // ===================================================
    io.use((socket: Socket, next) => {
      try {
        const rawToken =
          socket.handshake.auth?.token ||
          socket.handshake.headers?.authorization;

        if (!rawToken) {
          logger.warn(`[SOCKET] Connection rejected: Missing token from ${socket.id}`);
          return next(new Error('Authentication error: Missing token'));
        }

        const token = rawToken.startsWith('Bearer ')
          ? rawToken.slice(7).trim()
          : rawToken.trim();

        const decoded = jwt.verify(token, JWT_SECRET) as any;
        if (!decoded || (!decoded.id && !decoded.userId)) {
          logger.warn(`[SOCKET] Connection rejected: Invalid token payload for ${socket.id}`);
          return next(new Error('Authentication error: Invalid token'));
        }

        socket.data.user = {
          id: decoded.id || decoded.userId,
          email: decoded.email,
          phoneNumber: decoded.phoneNumber,
          username: decoded.username,
        };

        logger.info(
          `[SOCKET] Authenticated user ${socket.data.user.id} on socket ${socket.id}`
        );
        next();
      } catch (err: any) {
        logger.error(`[SOCKET AUTH ERROR]: ${err.message}`);
        next(new Error(`Authentication error: ${err.message}`));
      }
    });

    // ===================================================
    // SOCKET CONNECTION & EVENT HANDLERS
    // ===================================================
    io.on('connection', (socket: AuthenticatedSocket) => {
      const userId = socket.data.user?.id;
      logger.info(`[SOCKET] Client connected: ${socket.id} (User: ${userId})`);

      // Personal user notification room
      if (userId) {
        socket.join(`user:${userId}`);
      }

      // 1. Join Faculty Room
      socket.on('join:faculty', (facultyId: string) => {
        if (!facultyId) return;
        const roomName = `faculty:${facultyId}`;
        socket.join(roomName);
        logger.info(`[SOCKET] User ${userId} joined room ${roomName}`);
        socket.emit('joined', { room: roomName });
      });

      // 2. Join Department Room
      socket.on('join:department', (departmentId: string) => {
        if (!departmentId) return;
        const roomName = `department:${departmentId}`;
        socket.join(roomName);
        logger.info(`[SOCKET] User ${userId} joined room ${roomName}`);
        socket.emit('joined', { room: roomName });
      });

      // 3. Join Level Room (Global level or Department-scoped level)
      socket.on(
        'join:level',
        (data: number | string | { level: number | string; departmentId?: string }) => {
          let levelVal: number | string;
          let deptId: string | undefined;

          if (typeof data === 'object' && data !== null) {
            levelVal = data.level;
            deptId = data.departmentId;
          } else {
            levelVal = data;
          }

          if (!levelVal) return;
          const roomName = deptId
            ? `department:${deptId}:level:${levelVal}`
            : `level:${levelVal}`;
          socket.join(roomName);
          logger.info(`[SOCKET] User ${userId} joined room ${roomName}`);
          socket.emit('joined', { room: roomName });
        }
      );

      // 4. Join Specific Conversation Room
      socket.on('join:conversation', (conversationId: string) => {
        if (!conversationId) return;
        const roomName = `conversation:${conversationId}`;
        socket.join(roomName);
        logger.info(`[SOCKET] User ${userId} joined room ${roomName}`);
        socket.emit('joined', { room: roomName });
      });

      // 5. Join Support Ticket Room
      socket.on('join:support', (requestId: string) => {
        if (!requestId) return;
        const roomName = `support:${requestId}`;
        socket.join(roomName);
        logger.info(`[SOCKET] User ${userId} joined support room ${roomName}`);
        socket.emit('joined', { room: roomName });
      });

      // 6. Leave Room
      socket.on('leave:room', (room: string) => {
        if (!room) return;
        socket.leave(room);
        logger.info(`[SOCKET] User ${userId} left room ${room}`);
      });

      // 7. Send Message Handler
      socket.on(
        'send_message',
        async (payload: { conversationId: string; text: string }) => {
          try {
            if (!userId) {
              socket.emit('error', { message: 'Unauthorized' });
              return;
            }
            if (!payload?.conversationId || !payload?.text?.trim()) {
              socket.emit('error', { message: 'Invalid message payload' });
              return;
            }

            const message = await messageService.sendMessage(
              payload.conversationId,
              userId,
              payload.text.trim()
            );

            // Broadcast to conversation room and sender
            io?.to(`conversation:${payload.conversationId}`).emit(
              'new_message',
              message
            );
          } catch (err: any) {
            logger.error(`[SOCKET SEND_MESSAGE ERROR]: ${err.message}`);
            socket.emit('error', { message: err.message || 'Failed to send message' });
          }
        }
      );

      socket.on('disconnect', () => {
        logger.info(`[SOCKET] Client disconnected: ${socket.id} (User: ${userId})`);
      });
    });

    return io;
  },

  // =====================================================
  // EMIT EVENT TO ROOM HELPER
  // =====================================================
  emitToRoom: (room: string, event: string, data: any): void => {
    if (!io) {
      return;
    }
    io.to(room).emit(event, data);
  },

  // =====================================================
  // GET INSTANCE
  // =====================================================
  getIO: (): SocketIOServer | null => {
    return io;
  },
};
