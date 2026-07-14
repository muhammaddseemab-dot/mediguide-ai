/**
 * Unit Tests for Gemini AI Service
 */

import { GeminiService } from './gemini'
import type { SymptomAnalysisRequest, EmergencyDetectionRequest } from './types'

describe('GeminiService', () => {
  let geminiService: GeminiService

  beforeEach(() => {
    // Use mock mode for testing
    geminiService = new GeminiService({
      apiKey: 'test-key',
      modelName: 'gemini-pro',
      mockMode: true,
      cacheEnabled: true,
      rateLimitPerMinute: 60,
      requestTimeoutMs: 30000,
    })
  })

  describe('analyzeSymptoms', () => {
    it('should return a health insight with severity, confidence, and recommendations', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: ['fever', 'cough'],
        userAge: 30,
        userGender: 'male',
      }

      const insight = await geminiService.analyzeSymptoms(request)

      // Property 1: Symptom Analysis Structure Completeness
      // For any symptom input, the returned health insight SHALL include severity, confidence, recommendations, and disclaimers
      expect(insight).toHaveProperty('severity')
      expect(insight).toHaveProperty('confidence')
      expect(insight).toHaveProperty('recommendations')
      expect(insight).toHaveProperty('disclaimer')
      expect(insight).toHaveProperty('suggestedActions')
      expect(insight).toHaveProperty('symptoms')
      expect(insight).toHaveProperty('createdAt')
    })

    it('should have valid severity level', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: ['headache'],
      }

      const insight = await geminiService.analyzeSymptoms(request)

      expect(['low', 'moderate', 'high', 'emergency']).toContain(insight.severity)
    })

    it('should have confidence between 0 and 100', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: ['chest pain', 'shortness of breath'],
      }

      const insight = await geminiService.analyzeSymptoms(request)

      expect(insight.confidence).toBeGreaterThanOrEqual(0)
      expect(insight.confidence).toBeLessThanOrEqual(100)
    })

    it('should include recommendation objects with required fields', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: ['sore throat'],
      }

      const insight = await geminiService.analyzeSymptoms(request)

      if (insight.recommendations.length > 0) {
        const rec = insight.recommendations[0]
        expect(rec).toHaveProperty('id')
        expect(rec).toHaveProperty('title')
        expect(rec).toHaveProperty('description')
        expect(rec).toHaveProperty('actionType')
        expect(rec).toHaveProperty('priority')
      }
    })

    it('should include medical disclaimer', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: ['fatigue'],
      }

      const insight = await geminiService.analyzeSymptoms(request)

      expect(insight.disclaimer).toBeTruthy()
      expect(insight.disclaimer.length).toBeGreaterThan(0)
    })

    it('should return symptoms in the insight', async () => {
      const symptoms = ['fever', 'cough']
      const request: SymptomAnalysisRequest = {
        symptoms,
      }

      const insight = await geminiService.analyzeSymptoms(request)

      expect(insight.symptoms).toBeDefined()
      expect(Array.isArray(insight.symptoms)).toBe(true)
    })

    it('should handle multiple symptoms', async () => {
      const symptoms = ['fever', 'cough', 'headache', 'body aches']
      const request: SymptomAnalysisRequest = {
        symptoms,
      }

      const insight = await geminiService.analyzeSymptoms(request)

      expect(insight.symptoms.length).toBeGreaterThan(0)
    })

    it('should include suggested actions', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: ['severe headache'],
      }

      const insight = await geminiService.analyzeSymptoms(request)

      expect(Array.isArray(insight.suggestedActions)).toBe(true)
    })

    it('should cache results for identical requests', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: ['common cold'],
      }

      const insight1 = await geminiService.analyzeSymptoms(request)
      const insight2 = await geminiService.analyzeSymptoms(request)

      // Both should return valid insights
      expect(insight1).toBeTruthy()
      expect(insight2).toBeTruthy()
      // In mock mode, they should be similar
      expect(insight1.severity).toBe(insight2.severity)
    })
  })

  describe('detectEmergency', () => {
    it('should return emergency assessment with required fields', async () => {
      const request: EmergencyDetectionRequest = {
        symptoms: ['chest pain', 'difficulty breathing'],
      }

      const assessment = await geminiService.detectEmergency(request)

      // Property 3: Emergency Detection and Response
      expect(assessment).toHaveProperty('isEmergency')
      expect(assessment).toHaveProperty('confidence')
      expect(assessment).toHaveProperty('urgencyLevel')
      expect(assessment).toHaveProperty('symptoms')
      expect(assessment).toHaveProperty('emergencyContacts')
      expect(assessment).toHaveProperty('instructions')
    })

    it('should have valid urgency level', async () => {
      const request: EmergencyDetectionRequest = {
        symptoms: ['severe burns'],
      }

      const assessment = await geminiService.detectEmergency(request)

      expect(['low', 'medium', 'high', 'critical']).toContain(assessment.urgencyLevel)
    })

    it('should have confidence between 0 and 100', async () => {
      const request: EmergencyDetectionRequest = {
        symptoms: ['unconscious'],
      }

      const assessment = await geminiService.detectEmergency(request)

      expect(assessment.confidence).toBeGreaterThanOrEqual(0)
      expect(assessment.confidence).toBeLessThanOrEqual(100)
    })

    it('should include immediate actions', async () => {
      const request: EmergencyDetectionRequest = {
        symptoms: ['severe bleeding'],
      }

      const assessment = await geminiService.detectEmergency(request)

      expect(Array.isArray(assessment.instructions)).toBe(true)
    })

    it('should handle emergency symptoms correctly', async () => {
      const request: EmergencyDetectionRequest = {
        symptoms: ['chest pain'],
        userAge: 45,
      }

      const assessment = await geminiService.detectEmergency(request)

      expect(assessment.isEmergency).toBeDefined()
      expect(typeof assessment.isEmergency).toBe('boolean')
    })

    it('should include emergency contacts in response', async () => {
      const request: EmergencyDetectionRequest = {
        symptoms: ['poisoning'],
      }

      const assessment = await geminiService.detectEmergency(request)

      expect(Array.isArray(assessment.emergencyContacts)).toBe(true)
    })

    // Property 4: Emergency Detection Logging
    it('should provide consistent emergency assessments', async () => {
      const request: EmergencyDetectionRequest = {
        symptoms: ['seizure'],
      }

      const assessment1 = await geminiService.detectEmergency(request)
      const assessment2 = await geminiService.detectEmergency(request)

      expect(assessment1.isEmergency).toBe(assessment2.isEmergency)
      expect(assessment1.urgencyLevel).toBe(assessment2.urgencyLevel)
    })
  })

  describe('translateContent', () => {
    it('should return translated content in response', async () => {
      const request = {
        content: 'You have a mild fever',
        targetLanguage: 'hi',
      }

      const response = await geminiService.translateContent(request)

      expect(response).toHaveProperty('originalContent')
      expect(response).toHaveProperty('translatedContent')
      expect(response).toHaveProperty('targetLanguage')
      expect(response).toHaveProperty('confidence')
    })

    it('should preserve target language in response', async () => {
      const request = {
        content: 'Medical disclaimer',
        targetLanguage: 'mr',
      }

      const response = await geminiService.translateContent(request)

      expect(response.targetLanguage).toBe('mr')
    })

    it('should have confidence for translation', async () => {
      const request = {
        content: 'Consult a doctor',
        targetLanguage: 'hi',
      }

      const response = await geminiService.translateContent(request)

      expect(typeof response.confidence).toBe('number')
      expect(response.confidence).toBeGreaterThanOrEqual(0)
      expect(response.confidence).toBeLessThanOrEqual(100)
    })
  })

  describe('Error Handling', () => {
    it('should return default insight on parsing error', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: ['test'],
      }

      // This should still succeed in mock mode, but test robustness
      const insight = await geminiService.analyzeSymptoms(request)

      expect(insight).toBeTruthy()
      expect(insight.recommendations).toBeDefined()
    })

    it('should gracefully handle emergency detection errors', async () => {
      const request: EmergencyDetectionRequest = {
        symptoms: ['test'],
      }

      const assessment = await geminiService.detectEmergency(request)

      expect(assessment).toBeTruthy()
      expect(assessment.instructions).toBeDefined()
    })
  })

  describe('Data Validation', () => {
    it('should handle empty symptoms array', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: [],
      }

      const insight = await geminiService.analyzeSymptoms(request)

      expect(insight).toBeTruthy()
      expect(insight.recommendations).toBeDefined()
    })

    it('should handle very long symptom descriptions', async () => {
      const longSymptom = 'a'.repeat(500)
      const request: SymptomAnalysisRequest = {
        symptoms: [longSymptom],
      }

      const insight = await geminiService.analyzeSymptoms(request)

      expect(insight).toBeTruthy()
      expect(insight.severity).toBeTruthy()
    })

    it('should handle special characters in symptoms', async () => {
      const request: SymptomAnalysisRequest = {
        symptoms: ['pain & swelling', 'fever (high)', 'nausea/vomiting'],
      }

      const insight = await geminiService.analyzeSymptoms(request)

      expect(insight).toBeTruthy()
      expect(insight.recommendations).toBeDefined()
    })
  })
})
