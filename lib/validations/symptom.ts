/**
 * Symptom Checking Validation Schemas
 * 
 * Zod schemas for validating symptom input and health-related forms
 */

import { z } from 'zod'

/**
 * Symptom input validation schema
 */
export const symptomInputSchema = z.object({
  symptoms: z
    .array(z.string().min(1, 'Symptom cannot be empty'))
    .min(1, 'Please enter at least one symptom')
    .max(10, 'Maximum 10 symptoms allowed'),
  duration: z
    .enum(['0-24h', '1-3d', '4-7d', '1-2w', '2-4w', '4w+'], {
      errorMap: () => ({ message: 'Please select a valid duration' }),
    })
    .optional(),
  severity: z
    .enum(['mild', 'moderate', 'severe'], {
      errorMap: () => ({ message: 'Please select a valid severity level' }),
    })
    .optional(),
  notes: z
    .string()
    .max(500, 'Notes must be at most 500 characters')
    .optional(),
})

export type SymptomInput = z.infer<typeof symptomInputSchema>

/**
 * Follow-up question validation schema
 */
export const followUpQuestionSchema = z.object({
  question: z
    .string()
    .min(5, 'Question must be at least 5 characters')
    .max(500, 'Question must be at most 500 characters'),
})

export type FollowUpQuestion = z.infer<typeof followUpQuestionSchema>

/**
 * Medical history validation schema
 */
export const medicalHistorySchema = z.object({
  allergies: z
    .array(z.string())
    .optional(),
  medications: z
    .array(
      z.object({
        name: z.string().min(1),
        dosage: z.string().optional(),
        frequency: z.string().optional(),
      })
    )
    .optional(),
  chronicConditions: z
    .array(z.string())
    .optional(),
  surgeries: z
    .array(
      z.object({
        name: z.string().min(1),
        date: z.string().or(z.date()).optional(),
      })
    )
    .optional(),
})

export type MedicalHistory = z.infer<typeof medicalHistorySchema>

/**
 * Health insight feedback validation schema
 */
export const healthInsightFeedbackSchema = z.object({
  insightId: z.string().min(1, 'Insight ID is required'),
  helpfulRating: z
    .enum(['helpful', 'neutral', 'not_helpful'], {
      errorMap: () => ({ message: 'Please select a rating' }),
    })
    .optional(),
  feedback: z
    .string()
    .max(500, 'Feedback must be at most 500 characters')
    .optional(),
  followUp: z.boolean().default(false),
})

export type HealthInsightFeedback = z.infer<typeof healthInsightFeedbackSchema>

/**
 * Emergency symptom report validation schema
 */
export const emergencyReportSchema = z.object({
  symptoms: z
    .array(z.string().min(1))
    .min(1, 'Please specify symptoms')
    .max(10),
  severity: z.enum(['life_threatening', 'urgent', 'serious']),
  location: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .optional(),
  additionalInfo: z.string().max(500).optional(),
  consentToShare: z.boolean().default(false),
})

export type EmergencyReport = z.infer<typeof emergencyReportSchema>
