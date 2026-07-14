/**
 * Authentication Validation Schemas
 * 
 * Zod schemas for validating authentication form inputs
 */

import { z } from 'zod'

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>

/**
 * Registration form validation schema
 */
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be at most 100 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterInput = z.infer<typeof registerSchema>

/**
 * Password reset request validation schema
 */
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
})

export type PasswordResetRequestInput = z.infer<
  typeof passwordResetRequestSchema
>

/**
 * Password reset form validation schema
 */
export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type PasswordResetInput = z.infer<typeof passwordResetSchema>

/**
 * Email verification validation schema
 */
export const emailVerificationSchema = z.object({
  code: z
    .string()
    .length(6, 'Verification code must be 6 characters')
    .regex(/^\d+$/, 'Verification code must contain only numbers'),
})

export type EmailVerificationInput = z.infer<typeof emailVerificationSchema>
