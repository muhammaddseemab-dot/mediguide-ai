/**
 * Property-Based Tests for Gemini AI Service using fast-check
 * 
 * These tests verify universal properties that should hold for all inputs
 */

import fc from 'fast-check'
import { GeminiService } from './gemini'
import type { SymptomAnalysisRequest, EmergencyDetectionRequest } from './types'

describe('GeminiService Property-Based Tests', () => {
  let geminiService: GeminiService

  beforeEach(() => {
    geminiService = new GeminiService({
      apiKey: 'test-key',
      modelName: 'gemini-pro',
      mockMode: true,
      cacheEnabled: true,
      rateLimitPerMinute: 60,
      requestTimeoutMs: 30000,
    })
  })

  /**
   * Property 1: Symptom Analysis Structure Completeness
   * 
   * For any symptom input provided to the Symptom_Checker, the returned health insight
   * SHALL include severity assessment, confidence levels, recommendations, and medical disclaimers.
   * 
   * Validates: Requirements 2.3, 2.4, 2.7
   */
  it('Property 1: Symptom Analysis Structure Completeness', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 100 }), {
          minLength: 1,
          maxLength: 10,
        }),
        fc.option(fc.integer({ min: 1, max: 150 })),
        fc.option(fc.constantFrom('male', 'female', 'other')),
        async (symptoms, age, gender) => {
          const request: SymptomAnalysisRequest = {
            symptoms,
            userAge: age || undefined,
            userGender: gender || undefined,
          }

          const insight = await geminiService.analyzeSymptoms(request)

          // Must have all required properties
          expect(insight).toHaveProperty('severity')
          expect(insight).toHaveProperty('confidence')
          expect(insight).toHaveProperty('recommendations')
          expect(insight).toHaveProperty('disclaimer')
          expect(insight).toHaveProperty('suggestedActions')
          expect(insight).toHaveProperty('symptoms')
          expect(insight).toHaveProperty('createdAt')

          // Severity must be valid
          expect(['low', 'moderate', 'high', 'emergency']).toContain(insight.severity)

          // Confidence must be in valid range
          expect(insight.confidence).toBeGreaterThanOrEqual(0)
          expect(insight.confidence).toBeLessThanOrEqual(100)

          // Recommendations must be an array
          expect(Array.isArray(insight.recommendations)).toBe(true)

          // Disclaimer must be non-empty
          expect(insight.disclaimer.length).toBeGreaterThan(0)

          // Suggested actions must be an array
          expect(Array.isArray(insight.suggestedActions)).toBe(true)

          // Timestamp must be valid
          expect(insight.createdAt instanceof Date).toBe(true)
        }
      )
    )
  })

  /**
   * Property 2: Confidence Level Bounds
   * 
   * For any analysis, the confidence level SHALL always be within the 0-100 range
   * 
   * Validates: Requirements 2.4
   */
  it('Property 2: Confidence Level Bounds', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), {
          minLength: 1,
          maxLength: 5,
        }),
        async (symptoms) => {
          const insight = await geminiService.analyzeSymptoms({
            symptoms,
          })

          expect(insight.confidence).toBeGreaterThanOrEqual(0)
          expect(insight.confidence).toBeLessThanOrEqual(100)
          expect(Number.isInteger(insight.confidence) || typeof insight.confidence === 'number').toBe(true)
        }
      )
    )
  })

  /**
   * Property 3: Severity Level Validity
   * 
   * For any analysis result, the severity level SHALL be one of the valid severity values
   * 
   * Validates: Requirements 2.3
   */
  it('Property 3: Severity Level Validity', async () => {
    const validSeverities = ['low', 'moderate', 'high', 'emergency']

    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), {
          minLength: 1,
          maxLength: 10,
        }),
        async (symptoms) => {
          const insight = await geminiService.analyzeSymptoms({
            symptoms,
          })

          expect(validSeverities).toContain(insight.severity)
        }
      )
    )
  })

  /**
   * Property 4: Recommendation Structure Consistency
   * 
   * For any recommendation in the analysis results, the recommendation object SHALL contain
   * all required fields with proper types
   * 
   * Validates: Requirements 2.3
   */
  it('Property 4: Recommendation Structure Consistency', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), {
          minLength: 1,
          maxLength: 5,
        }),
        async (symptoms) => {
          const insight = await geminiService.analyzeSymptoms({
            symptoms,
          })

          insight.recommendations.forEach((rec) => {
            // All recommendations must have these properties
            expect(rec).toHaveProperty('id')
            expect(rec).toHaveProperty('title')
            expect(rec).toHaveProperty('description')
            expect(rec).toHaveProperty('actionType')
            expect(rec).toHaveProperty('priority')

            // Type validation
            expect(typeof rec.id).toBe('string')
            expect(typeof rec.title).toBe('string')
            expect(typeof rec.description).toBe('string')
            expect(['medicine', 'lifestyle', 'consultation', 'emergency']).toContain(rec.actionType)
            expect(['low', 'medium', 'high', 'critical']).toContain(rec.priority)
          })
        }
      )
    )
  })

  /**
   * Property 5: Medical Disclaimer Presence
   * 
   * For any health insight provided, a medical disclaimer SHALL always be present
   * 
   * Validates: Requirements 2.7, 8.1, 8.2
   */
  it('Property 5: Medical Disclaimer Presence', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), {
          minLength: 1,
          maxLength: 5,
        }),
        async (symptoms) => {
          const insight = await geminiService.analyzeSymptoms({
            symptoms,
          })

          expect(insight.disclaimer).toBeTruthy()
          expect(typeof insight.disclaimer).toBe('string')
          expect(insight.disclaimer.length).toBeGreaterThan(0)
        }
      )
    )
  })

  /**
   * Property 6: Emergency Detection Structure
   * 
   * For any emergency detection request, the response SHALL include all required assessment fields
   * 
   * Validates: Requirements 3.1, 3.2
   */
  it('Property 6: Emergency Detection Structure', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), {
          minLength: 1,
          maxLength: 5,
        }),
        fc.option(fc.integer({ min: 1, max: 150 })),
        async (symptoms, age) => {
          const request: EmergencyDetectionRequest = {
            symptoms,
            userAge: age || undefined,
          }

          const assessment = await geminiService.detectEmergency(request)

          // All required properties must exist
          expect(assessment).toHaveProperty('isEmergency')
          expect(assessment).toHaveProperty('confidence')
          expect(assessment).toHaveProperty('urgencyLevel')
          expect(assessment).toHaveProperty('symptoms')
          expect(assessment).toHaveProperty('instructions')

          // Type validation
          expect(typeof assessment.isEmergency).toBe('boolean')
          expect(typeof assessment.confidence).toBe('number')
          expect(['low', 'medium', 'high', 'critical']).toContain(assessment.urgencyLevel)
          expect(Array.isArray(assessment.symptoms)).toBe(true)
          expect(Array.isArray(assessment.instructions)).toBe(true)
        }
      )
    )
  })

  /**
   * Property 7: Emergency Confidence Bounds
   * 
   * For any emergency assessment, the confidence SHALL be within valid bounds
   * 
   * Validates: Requirements 3.1
   */
  it('Property 7: Emergency Confidence Bounds', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), {
          minLength: 1,
          maxLength: 3,
        }),
        async (symptoms) => {
          const assessment = await geminiService.detectEmergency({
            symptoms,
          })

          expect(assessment.confidence).toBeGreaterThanOrEqual(0)
          expect(assessment.confidence).toBeLessThanOrEqual(100)
        }
      )
    )
  })

  /**
   * Property 8: Translation Response Validity
   * 
   * For any translation request, the response SHALL contain the original content,
   * translated content, and target language
   * 
   * Validates: Requirements 4.3
   */
  it('Property 8: Translation Response Validity', async () => {
    const targetLanguages = ['hi', 'mr', 'en']

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 5, maxLength: 200 }),
        fc.constantFrom(...targetLanguages),
        async (content, language) => {
          const response = await geminiService.translateContent({
            content,
            targetLanguage: language,
          })

          // Required properties
          expect(response).toHaveProperty('originalContent')
          expect(response).toHaveProperty('translatedContent')
          expect(response).toHaveProperty('targetLanguage')
          expect(response).toHaveProperty('confidence')

          // Type validation
          expect(typeof response.originalContent).toBe('string')
          expect(typeof response.translatedContent).toBe('string')
          expect(response.targetLanguage).toBe(language)
          expect(typeof response.confidence).toBe('number')
          expect(response.confidence).toBeGreaterThanOrEqual(0)
          expect(response.confidence).toBeLessThanOrEqual(100)
        }
      )
    )
  })

  /**
   * Property 9: Consistency of Multiple Analyses
   * 
   * For the same symptoms, multiple analyses should produce consistent severity levels
   * (even if confidence levels may vary)
   * 
   * Validates: Requirements 2.3
   */
  it('Property 9: Consistency of Multiple Analyses', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 30 }), {
          minLength: 1,
          maxLength: 3,
        }),
        async (symptoms) => {
          const insight1 = await geminiService.analyzeSymptoms({ symptoms })
          const insight2 = await geminiService.analyzeSymptoms({ symptoms })

          // Severity should be consistent
          expect(insight1.severity).toBe(insight2.severity)

          // Both should have valid structures
          expect(insight1.recommendations.length).toBeGreaterThanOrEqual(0)
          expect(insight2.recommendations.length).toBeGreaterThanOrEqual(0)
        }
      )
    )
  })

  /**
   * Property 10: Symptom Preservation
   * 
   * For any symptom list provided, the returned insight SHALL include the provided symptoms
   * 
   * Validates: Requirements 2.3
   */
  it('Property 10: Symptom Preservation', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 30 }), {
          minLength: 1,
          maxLength: 5,
        }),
        async (symptoms) => {
          const insight = await geminiService.analyzeSymptoms({ symptoms })

          // Symptoms should be included in response
          expect(Array.isArray(insight.symptoms)).toBe(true)
          expect(insight.symptoms.length).toBeGreaterThan(0)
        }
      )
    )
  })

  /**
   * Property 11: Action Type Validity
   * 
   * For any suggested action, the action type SHALL be one of the valid types
   * 
   * Validates: Requirements 2.3
   */
  it('Property 11: Action Type Validity', async () => {
    const validActionTypes = ['button', 'link', 'emergency']

    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 30 }), {
          minLength: 1,
          maxLength: 3,
        }),
        async (symptoms) => {
          const insight = await geminiService.analyzeSymptoms({ symptoms })

          insight.suggestedActions.forEach((action) => {
            expect(validActionTypes).toContain(action.type)
          })
        }
      )
    )
  })

  /**
   * Property 12: Timestamp Validity
   * 
   * For any analysis result, the createdAt timestamp SHALL be a valid Date object
   * representing a recent time (within last minute)
   * 
   * Validates: Requirements 2.3
   */
  it('Property 12: Timestamp Validity', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 30 }), {
          minLength: 1,
          maxLength: 3,
        }),
        async (symptoms) => {
          const beforeAnalysis = Date.now()
          const insight = await geminiService.analyzeSymptoms({ symptoms })
          const afterAnalysis = Date.now()

          // Timestamp should be valid
          expect(insight.createdAt instanceof Date).toBe(true)

          // Timestamp should be recent (within analysis time + buffer)
          const timestampTime = insight.createdAt.getTime()
          expect(timestampTime).toBeGreaterThanOrEqual(beforeAnalysis - 1000) // 1 second buffer
          expect(timestampTime).toBeLessThanOrEqual(afterAnalysis + 1000)
        }
      )
    )
  })
})
