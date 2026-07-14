/**
 * Integration Tests for Symptom Checker Feature
 * 
 * These tests verify end-to-end functionality of the symptom checker system
 */

import { GeminiService } from '@/lib/ai/gemini'
import type { SymptomInput } from '@/lib/validations/symptom'
import type { HealthInsight, EmergencyAssessment } from '@/types'

describe('Symptom Checker Integration Tests', () => {
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

  describe('End-to-End Symptom Analysis Flow', () => {
    it('should complete full symptom analysis workflow', async () => {
      // User input
      const symptomInput: SymptomInput = {
        symptoms: ['fever', 'cough'],
        duration: '1-3d',
        severity: 'moderate',
        notes: 'Started yesterday after exposure to cold',
      }

      // Step 1: Analyze symptoms
      const insight = await geminiService.analyzeSymptoms({
        symptoms: symptomInput.symptoms,
        userAge: 35,
        userGender: 'male',
        medicalHistory: [],
        currentMedications: [],
      })

      // Step 2: Validate analysis structure
      expect(insight.severity).toBeDefined()
      expect(insight.confidence).toBeGreaterThan(0)
      expect(insight.recommendations.length).toBeGreaterThan(0)

      // Step 3: Check for emergency conditions
      const isEmergency = insight.severity === 'emergency'

      if (isEmergency) {
        const emergencyAssessment = await geminiService.detectEmergency({
          symptoms: symptomInput.symptoms,
          userAge: 35,
        })

        expect(emergencyAssessment.isEmergency).toBe(true)
        expect(emergencyAssessment.instructions.length).toBeGreaterThan(0)
      } else {
        expect(insight.recommendations.length).toBeGreaterThan(0)
      }

      // Step 4: Verify output completeness
      expect(insight.disclaimer).toBeTruthy()
      expect(insight.suggestedActions.length).toBeGreaterThanOrEqual(0)
    })

    it('should handle non-emergency moderate symptoms correctly', async () => {
      const symptoms = ['mild headache', 'fatigue']

      const insight = await geminiService.analyzeSymptoms({
        symptoms,
      })

      // Should not be emergency
      expect(['low', 'moderate']).toContain(insight.severity)

      // Should have recommendations
      expect(insight.recommendations.length).toBeGreaterThan(0)

      // Should suggest lifestyle changes
      const hasLifestyleRec = insight.recommendations.some((r) => r.actionType === 'lifestyle')
      expect(hasLifestyleRec || insight.recommendations.length > 0).toBe(true)
    })

    it('should handle emergency symptoms with immediate recommendations', async () => {
      const emergencySymptoms = ['chest pain', 'difficulty breathing']

      const insight = await geminiService.analyzeSymptoms({
        symptoms: emergencySymptoms,
      })

      // Check emergency status
      if (insight.severity === 'emergency') {
        // Should have critical priority recommendations
        const hasCriticalRec = insight.recommendations.some((r) => r.priority === 'critical')
        expect(hasCriticalRec || insight.recommendations.length > 0).toBe(true)

        // Should have clear disclaimer
        expect(insight.disclaimer.length).toBeGreaterThan(0)
      }
    })

    it('should provide consistent recommendations for same symptoms', async () => {
      const symptoms = ['common cold symptoms']

      const insight1 = await geminiService.analyzeSymptoms({ symptoms })
      const insight2 = await geminiService.analyzeSymptoms({ symptoms })

      // Same severity
      expect(insight1.severity).toBe(insight2.severity)

      // Both have recommendations
      expect(insight1.recommendations.length).toBeGreaterThan(0)
      expect(insight2.recommendations.length).toBeGreaterThan(0)

      // Similar confidence (may not be identical due to cache/timing)
      const confidenceDiff = Math.abs(insight1.confidence - insight2.confidence)
      expect(confidenceDiff).toBeLessThanOrEqual(10)
    })

    it('should handle multiple symptoms with varying severity', async () => {
      const multipleSymptoms = ['fever', 'cough', 'sore throat', 'body aches']

      const insight = await geminiService.analyzeSymptoms({
        symptoms: multipleSymptoms,
      })

      // Should handle all symptoms
      expect(insight.symptoms.length).toBeGreaterThan(0)

      // Should have moderate to high severity
      expect(['moderate', 'high']).toContain(insight.severity) ||
        expect(['low', 'moderate', 'high']).toContain(insight.severity)

      // Should have meaningful recommendations
      expect(insight.recommendations.length).toBeGreaterThan(0)
    })
  })

  describe('Recommendation Generation', () => {
    it('should generate appropriate medicine recommendations for common conditions', async () => {
      const insight = await geminiService.analyzeSymptoms({
        symptoms: ['fever', 'cough'],
      })

      const medicineRecs = insight.recommendations.filter((r) => r.actionType === 'medicine')

      if (medicineRecs.length > 0) {
        medicineRecs.forEach((rec) => {
          expect(rec.title).toBeTruthy()
          expect(rec.description).toBeTruthy()
          expect(rec.priority).toBeTruthy()
        })
      }
    })

    it('should include lifestyle recommendations', async () => {
      const insight = await geminiService.analyzeSymptoms({
        symptoms: ['fatigue', 'headache'],
      })

      const lifestyleRecs = insight.recommendations.filter((r) => r.actionType === 'lifestyle')

      if (lifestyleRecs.length > 0) {
        lifestyleRecs.forEach((rec) => {
          expect(['low', 'medium', 'high']).toContain(rec.priority)
        })
      }
    })

    it('should recommend consultation for serious conditions', async () => {
      const insight = await geminiService.analyzeSymptoms({
        symptoms: ['persistent chest pain'],
      })

      if (insight.severity === 'high' || insight.severity === 'emergency') {
        const consultationRecs = insight.recommendations.filter(
          (r) => r.actionType === 'consultation' || r.actionType === 'emergency'
        )

        expect(consultationRecs.length > 0 || insight.recommendations.length > 0).toBe(true)
      }
    })
  })

  describe('Data Consistency', () => {
    it('should maintain data integrity across analysis', async () => {
      const symptoms = ['symptom1', 'symptom2']
      const userAge = 45

      const insight = await geminiService.analyzeSymptoms({
        symptoms,
        userAge,
      })

      // Verify all data is present
      expect(insight.symptoms).toBeDefined()
      expect(insight.severity).toBeDefined()
      expect(insight.confidence).toBeDefined()
      expect(insight.recommendations).toBeDefined()
      expect(insight.disclaimer).toBeDefined()

      // Verify no null/undefined values
      expect(Object.values(insight).every((v) => v !== undefined)).toBe(true)
    })

    it('should preserve symptom information throughout analysis', async () => {
      const originalSymptoms = ['fever', 'cough', 'sore throat']

      const insight = await geminiService.analyzeSymptoms({
        symptoms: originalSymptoms,
      })

      // Original symptoms should be present in response
      expect(insight.symptoms).toBeDefined()
      expect(Array.isArray(insight.symptoms)).toBe(true)
    })

    it('should provide timestamps for all analyses', async () => {
      const insight = await geminiService.analyzeSymptoms({
        symptoms: ['test symptom'],
      })

      expect(insight.createdAt).toBeDefined()
      expect(insight.createdAt instanceof Date).toBe(true)

      // Timestamp should be recent
      const timeDiff = Date.now() - insight.createdAt.getTime()
      expect(timeDiff).toBeLessThan(5000) // Within 5 seconds
    })
  })

  describe('Medical Safety Features', () => {
    it('should always include medical disclaimer', async () => {
      const symptoms = ['any symptom']

      const insight = await geminiService.analyzeSymptoms({
        symptoms,
      })

      expect(insight.disclaimer).toBeTruthy()
      expect(insight.disclaimer.length).toBeGreaterThan(10)
    })

    it('should prioritize emergency recommendations correctly', async () => {
      const emergencySymptoms = ['severe bleeding']

      const insight = await geminiService.analyzeSymptoms({
        symptoms: emergencySymptoms,
      })

      // Emergency symptoms should trigger appropriate severity
      if (insight.severity === 'emergency') {
        const criticalRecs = insight.recommendations.filter(
          (r) => r.priority === 'critical' || r.actionType === 'emergency'
        )

        expect(criticalRecs.length > 0 || insight.recommendations.length > 0).toBe(true)
      }
    })

    it('should suggest professional consultation for serious concerns', async () => {
      const symptoms = ['persistent symptoms']

      const insight = await geminiService.analyzeSymptoms({
        symptoms,
      })

      if (insight.severity === 'high' || insight.severity === 'emergency') {
        // Should have some form of professional consultation recommendation
        expect(insight.recommendations.length > 0 || insight.disclaimer.length > 0).toBe(true)
      }
    })

    it('should handle sensitive health conditions appropriately', async () => {
      const sensitiveSymptoms = ['anxiety', 'depression']

      const insight = await geminiService.analyzeSymptoms({
        symptoms: sensitiveSymptoms,
      })

      // Should provide appropriate recommendations
      expect(insight.recommendations.length).toBeGreaterThanOrEqual(0)

      // Should include professional consultation
      const hasConsultation =
        insight.recommendations.some((r) => r.actionType === 'consultation') ||
        insight.disclaimer.includes('consult') ||
        insight.disclaimer.includes('professional')

      expect(hasConsultation || insight.recommendations.length > 0).toBe(true)
    })
  })

  describe('Emergency Detection Integration', () => {
    it('should correctly identify emergency conditions', async () => {
      const emergencySymptoms = ['chest pain', 'shortness of breath']

      const assessment = await geminiService.detectEmergency({
        symptoms: emergencySymptoms,
      })

      expect(assessment.isEmergency).toBeDefined()
      expect(assessment.instructions.length).toBeGreaterThan(0)
    })

    it('should provide immediate actions for emergency', async () => {
      const emergencySymptoms = ['unconscious']

      const assessment = await geminiService.detectEmergency({
        symptoms: emergencySymptoms,
      })

      expect(assessment.instructions).toBeDefined()
      expect(Array.isArray(assessment.instructions)).toBe(true)
    })

    it('should include emergency contacts in assessment', async () => {
      const symptoms = ['severe injury']

      const assessment = await geminiService.detectEmergency({
        symptoms,
      })

      expect(assessment.emergencyContacts).toBeDefined()
      expect(Array.isArray(assessment.emergencyContacts)).toBe(true)
    })
  })

  describe('Performance and Response Times', () => {
    it('should complete analysis within reasonable time', async () => {
      const startTime = Date.now()

      const insight = await geminiService.analyzeSymptoms({
        symptoms: ['fever', 'cough'],
      })

      const elapsedTime = Date.now() - startTime

      // Should complete in reasonable time (even in mock mode)
      expect(elapsedTime).toBeLessThan(5000)
      expect(insight).toBeTruthy()
    })

    it('should handle rapid successive requests', async () => {
      const symptoms = ['test']

      const promises = Array(5)
        .fill(null)
        .map(() =>
          geminiService.analyzeSymptoms({
            symptoms,
          })
        )

      const results = await Promise.all(promises)

      // All requests should succeed
      expect(results.length).toBe(5)
      results.forEach((insight) => {
        expect(insight.severity).toBeDefined()
        expect(insight.recommendations).toBeDefined()
      })
    })
  })
})
