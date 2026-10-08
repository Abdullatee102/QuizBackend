import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET === 'fallback-secret-key') {
  throw new Error('[FATAL] JWT_SECRET environment variable is missing or insecure.');
}

// Define the exact shape of the user payload attached to the request
export interface UserPayload {
  id?: number | string;
  userId?: number | string;
  phoneNumber?: string | null;
  email?: string | null;
  role?: string;
  status?: string;
  [key: string]: any;
}

// Extend Express Request interface
export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      status: 'fail',
      message: 'Not authorized, token missing or malformed',
    });
    return;
  }

  const parts = authHeader.split(' ');
  const token = parts[1];

  if (!token) {
    res.status(401).json({
      status: 'fail',
      message: 'Not authorized, token missing',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    const userId = decoded.id || decoded.userId;

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Not authorized, invalid token payload',
      });
      return;
    }

    // Live account status verification from DB
    const [user] = await db
      .select({
        id: usersTable.id,
        role: usersTable.role,
        status: usersTable.status,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (!user) {
      res.status(401).json({
        status: 'fail',
        message: 'Not authorized, user account does not exist',
      });
      return;
    }

    if (user.status !== 'ACTIVE') {
      res.status(403).json({
        status: 'fail',
        message: `Account is ${user.status.toLowerCase()}. Access denied.`,
      });
      return;
    }

    req.user = {
      ...decoded,
      id: user.id,
      role: user.role,
      status: user.status,
    };
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Not authorized, token failed verification or expired',
    });
    return;
  }
};