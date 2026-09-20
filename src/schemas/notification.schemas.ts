import { z } from 'zod';

// =====================================================
// REGISTER DEVICE
// =====================================================

export const registerDeviceSchema =
  z.object({
    body: z.object({
      pushToken: z
        .string()
        .min(
          1,
          'Push token is required'
        ),

      platform: z
        .string()
        .min(
          1,
          'Platform is required'
        ),
    }),
  });

// =====================================================
// UNREGISTER DEVICE
// =====================================================

export const unregisterDeviceSchema =
  z.object({
    body: z.object({
      pushToken: z
        .string()
        .min(
          1,
          'Push token is required'
        ),
    }),
  });

// =====================================================
// NOTIFICATION ID
// =====================================================

export const notificationIdSchema =
  z.object({
    params: z.object({
      notificationId: z
        .string()
        .uuid(
          'Invalid notification ID'
        ),
    }),
  });

// =====================================================
// NOTIFICATION LIST
// =====================================================

export const notificationListSchema =
  z.object({
    query: z.object({
      limit: z
        .string()
        .optional()
        .refine(
          (value) => {

            if (
              value ===
              undefined
            ) {
              return true;
            }

            const number =
              Number(value);

            return (
              Number.isInteger(
                number
              ) &&
              number >= 1 &&
              number <= 100
            );
          },
          {
            message:
              'Limit must be an integer between 1 and 100',
          }
        ),
    }),
  });