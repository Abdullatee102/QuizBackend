import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

import { z } from 'zod';

// =====================================================
// HUMAN-READABLE VALIDATION ERROR FORMATTER
// =====================================================

const COMMON_FIELD_LABELS: Record<string, string> = {
  id: 'Identifier',
  productId: 'Product Identifier',
  title: 'Title',
  description: 'Description',
  category: 'Category',
  purpose: 'Commercial Purpose',
  amount: 'Price / Amount',
  currency: 'Currency',
  featureKey: 'Feature Access Key',
  durationDays: 'Duration (Days)',
  academicSession: 'Academic Session',
  semester: 'Semester',
  benefits: 'Included Benefits',
  isActive: 'Active Status',
  isTestProduct: 'Test Product Flag',
  email: 'Email Address',
  fullName: 'Full Name',
  username: 'Username',
  password: 'Password',
  newPassword: 'New Password',
  currentPassword: 'Current Password',
  phoneNumber: 'Phone Number',
  matricNumber: 'Matriculation Number',
  level: 'Academic Level',
  facultyId: 'Faculty',
  departmentId: 'Department',
  courseId: 'Course',
  reason: 'Reason / Justification',
  action: 'Action',
  userId: 'User',
  status: 'Account Status',
  role: 'Role',
  token: 'Authentication Token',
  otp: 'OTP Code',
  code: 'Code',
  name: 'Name',
  limit: 'Limit',
  page: 'Page',
};

function humanizeFieldName(path: readonly (string | number | symbol)[]): string {
  const cleanPath = path.map(String).filter((p) => p !== 'body' && p !== 'query' && p !== 'params');
  const lastKey = cleanPath[cleanPath.length - 1];

  if (lastKey) {
    if (COMMON_FIELD_LABELS[lastKey]) return COMMON_FIELD_LABELS[lastKey];
    return lastKey
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]/g, ' ')
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  return cleanPath.length > 0 ? cleanPath.join(' ') : 'Form field';
}

export function humanizeZodIssue(rawIssue: z.ZodIssue): string {
  const issue = rawIssue as any;
  const field = humanizeFieldName(issue.path);

  // If a clear, custom message was provided on the schema (not raw Zod developer jargon)
  if (
    issue.message &&
    !String(issue.message).startsWith('Invalid input') &&
    !String(issue.message).startsWith('Invalid option') &&
    !String(issue.message).startsWith('Required') &&
    !String(issue.message).startsWith('Expected') &&
    !String(issue.message).includes('expected string') &&
    !String(issue.message).includes('expected number') &&
    !String(issue.message).includes('expected array')
  ) {
    if (String(issue.message).toLowerCase().includes(field.toLowerCase())) {
      return issue.message;
    }
    return `${field}: ${issue.message}`;
  }

  // Handle missing/undefined values
  if (issue.code === 'invalid_type') {
    if (issue.received === 'undefined' || issue.received === 'null' || !issue.received) {
      return `${field} is required. Please provide a valid value.`;
    }
    if (issue.expected === 'number') {
      return `${field} must be a valid number.`;
    }
    if (issue.expected === 'string') {
      return `${field} must be a valid text value.`;
    }
    if (issue.expected === 'array') {
      return `Please provide at least one ${field.toLowerCase()}.`;
    }
    return `${field} has an invalid type.`;
  }

  // Handle invalid enum selections / invalid options
  if (
    issue.code === 'invalid_enum_value' ||
    issue.code === 'invalid_value' ||
    String(issue.message || '').includes('Invalid option')
  ) {
    const rawOptions = issue.options;
    if (Array.isArray(rawOptions) && rawOptions.length > 0) {
      const friendlyOptions = rawOptions
        .slice(0, 5)
        .map((opt: string) =>
          typeof opt === 'string'
            ? opt
                .replace(/_/g, ' ')
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase())
            : opt
        )
        .join(', ');
      return `Please select a valid ${field.toLowerCase()} (e.g. ${friendlyOptions}).`;
    }
    return `Please select a valid option for ${field.toLowerCase()}.`;
  }

  // Handle length constraints
  if (issue.code === 'too_small') {
    if (issue.type === 'string') {
      return `${field} must be at least ${issue.minimum} character${issue.minimum > 1 ? 's' : ''} long.`;
    }
    if (issue.type === 'number') {
      return `${field} must be at least ${issue.minimum}.`;
    }
    if (issue.type === 'array') {
      return `Please add at least ${issue.minimum} item${issue.minimum > 1 ? 's' : ''} to ${field.toLowerCase()}.`;
    }
  }

  if (issue.code === 'too_big') {
    if (issue.type === 'string') {
      return `${field} cannot exceed ${issue.maximum} characters.`;
    }
  }

  return `${field}: ${issue.message}`;
}

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
        const humanizedMessages = result.error.issues.map((issue) => humanizeZodIssue(issue));
        const message = humanizedMessages.join(' ');

        res.status(400).json({
          status: 'fail',
          message,
          errors: result.error.issues.map((issue) => ({
            field: humanizeFieldName(issue.path),
            message: humanizeZodIssue(issue),
          })),
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