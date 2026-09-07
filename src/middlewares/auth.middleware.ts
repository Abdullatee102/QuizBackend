import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// Define the exact shape of the user payload attached to the request
export interface UserPayload {
  id?: number | string;
  userId?: number | string;
  phoneNumber?: string | null;
  email?: string | null;
  [key: string]: any;
}

// Extend Express Request interface
export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
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
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Not authorized, token failed verification or expired',
    });
    return;
  }
};