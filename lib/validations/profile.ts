/**
 * User Profile Validation Schemas
 * 
 * Zod schemas for validating user profile and health data forms
 */

import { z } from 'zod'

/**
 * Personal information validation schema
 */
export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  age: z
    .number()
    .int('Age must be a whole number')
    .min(1, 'Age must be at least 1')
    .max(150, 'Age must be valid'),
  gender: z
    .enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: 'Please select a valid gender' }),
    })
    .optional(),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-()]{7,}$/, 'Please enter a valid phone number')
    .optional(),
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>

/**
 * Health profile validation schema
 */
export const healthProfileSchema = z.object({
  allergies: z
    .array(z.string().min(1, 'Allergy cannot be empty'))
    .optional(),
  medications: z
    .array(
      z.object({
        name: z.string().min(1, 'Medication name is required'),
        dosage: z.string().min(1, 'Dosage is required'),
        frequency: z.string().min(1, 'Frequency is required'),
      })
    )
    .optional(),
  chronicConditions: z
    .array(z.string().min(1, 'Condition cannot be empty'))
    .optional(),
  bloodType: z
    .enum(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], {
      errorMap: () => ({ message: 'Please select a valid blood type' }),
    })
    .optional(),
  height: z
    .number()
    .positive('Height must be positive')
    .optional(),
  weight: z
    .number()
    .positive('Weight must be positive')
    .optional(),
})

export type HealthProfile = z.infer<typeof healthProfileSchema>

/**
 * Emergency contacts validation schema
 */
export const emergencyContactSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(100, 'Contact name must be at most 100 characters'),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-()]{7,}$/, 'Please enter a valid phone number'),
  relationship: z
    .string()
    .min(1, 'Relationship is required'),
  priority: z
    .enum(['primary', 'secondary', 'tertiary'], {
      errorMap: () => ({ message: 'Please select a valid priority' }),
    })
    .default('primary'),
})

export const emergencyContactsSchema = z.array(emergencyContactSchema)

export type EmergencyContact = z.infer<typeof emergencyContactSchema>

/**
 * Preferences validation schema
 */
export const preferencesSchema = z.object({
  language: z
    .enum(['en', 'hi', 'mr'], {
      errorMap: () => ({ message: 'Please select a valid language' }),
    })
    .default('en'),
  theme: z
    .enum(['light', 'dark'], {
      errorMap: () => ({ message: 'Please select a valid theme' }),
    })
    .default('light'),
  notifications: z
    .object({
      email: z.boolean().default(true),
      push: z.boolean().default(true),
      sms: z.boolean().default(false),
      appointmentReminders: z.boolean().default(true),
      healthTips: z.boolean().default(true),
      medicineReminders: z.boolean().default(true),
    })
    .optional(),
  privacy: z
    .object({
      shareAnalytics: z.boolean().default(true),
      shareDataForImprovement: z.boolean().default(false),
      shareWithResearch: z.boolean().default(false),
    })
    .optional(),
})

export type Preferences = z.infer<typeof preferencesSchema>

/**
 * Full profile update validation schema
 */
export const updateProfileSchema = z.object({
  personalInfo: personalInfoSchema.partial().optional(),
  healthProfile: healthProfileSchema.optional(),
  emergencyContacts: emergencyContactsSchema.optional(),
  preferences: preferencesSchema.partial().optional(),
})

export type UpdateProfile = z.infer<typeof updateProfileSchema>

/**
 * Address validation schema
 */
export const addressSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().regex(/^\d{5,10}$/, 'Invalid postal code'),
  country: z.string().min(2, 'Country is required'),
  isDefault: z.boolean().default(false).optional(),
})

export type Address = z.infer<typeof addressSchema>
