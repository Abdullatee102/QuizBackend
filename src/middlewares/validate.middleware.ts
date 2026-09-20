import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

import { z } from 'zod';

// =====================================================
// VALIDATION MIDDLEWARE
// =====================================================

export const validate = (
  schema: z.ZodType
): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const inputData = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      const result =
        await schema.safeParseAsync(
          inputData
        );

      // =================================================
      // VALIDATION FAILED
      // =================================================

      if (!result.success) {
        const formattedErrors =
          result.error.issues.map(
            (issue) => ({
              field:
                issue.path.join('.'),
              message:
                issue.message,
            })
          );

        const message =
          formattedErrors
            .map(
              (err) =>
                `${err.field}: ${err.message}`
            )
            .join(', ');

        res.status(400).json({
          status: 'fail',
          message,
        });

        return;
      }

      // =================================================
      // VALIDATION SUCCESSFUL
      // =================================================

      const data =
        result.data as {
          body?: Record<
            string,
            unknown
          >;

          query?: Record<
            string,
            unknown
          >;

          params?: Record<
            string,
            unknown
          >;
        };

      // =================================================
      // BODY
      // =================================================

      if (data.body) {
        req.body = data.body;
      }

      // =================================================
      // QUERY
      //
      // Express 5 exposes req.query as a getter.
      // Do NOT assign to req.query.
      //
      // Store the validated/coerced query in
      // res.locals instead.
      // =================================================

      if (data.query) {
        res.locals.validatedQuery =
          data.query;
      }

      // =================================================
      // PARAMS
      // =================================================

      if (data.params) {
        req.params =
          data.params as any;
      }

      // =================================================
      // CONTINUE
      // =================================================

      next();
    } catch (error) {
      next(error);
    }
  };
};