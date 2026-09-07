import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodType): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputData = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      const result = await schema.safeParseAsync(inputData);

      if (!result.success) {
        const formattedErrors = result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        const message = formattedErrors.map((err) => `${err.field}: ${err.message}`).join(', ');

        res.status(400).json({
          status: 'fail',
          message: message,
        });
        return;
      }

      const data = result.data as {
        body?: Record<string, unknown>;
        query?: Record<string, unknown>;
        params?: Record<string, unknown>;
      };

      if (data.body) req.body = data.body;
      if (data.query) req.query = data.query as any;
      if (data.params) req.params = data.params as any;

      next();
    } catch (error) {
      next(error);
    }
  };
};