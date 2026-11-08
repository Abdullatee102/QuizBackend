/**
 * BB-05C: Entitlement Authorization Middleware
 * Brain Buzz — Core Payment Infrastructure & Access Protection
 * 
 * Enforces server-side feature access control on gated premium capabilities.
 * Allows safe administrative bypass for content review.
 */

import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from './auth.middleware.js';
import { entitlementService } from '../services/payment/entitlementService.js';

export const requireEntitlement = (featureKey: string) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Authentication required to access this resource.',
      });
      return;
    }

    // Role-based administrative testing bypass
    const userRole = req.user?.role;
    if (userRole === 'SUPER_ADMIN' || userRole === 'CONTENT_ADMIN') {
      return next();
    }

    // Context from request query or body if available
    const academicSession = (req.query.academicSession || req.body?.academicSession) as string | undefined;
    const semester = (req.query.semester || req.body?.semester) as string | undefined;

    const context: { academicSession?: string | null; semester?: string | null } = {};
    if (academicSession) context.academicSession = academicSession;
    if (semester) context.semester = semester;

    const accessCheck = await entitlementService.checkUserFeatureAccess(String(userId), featureKey, context);

    if (!accessCheck.hasAccess) {
      res.status(403).json({
        status: 'fail',
        code: 'PREMIUM_ENTITLEMENT_REQUIRED',
        message: 'Access to this premium feature requires an active Brain Buzz subscription or pass.',
        data: {
          featureKey,
          reason: accessCheck.reason,
          upgradeUrl: '/api/payments/products',
        },
      });
      return;
    }

    // Attach entitlement info to request for downstream handlers
    (req as any).entitlement = accessCheck;
    next();
  };
};
