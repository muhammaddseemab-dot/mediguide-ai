/**
 * Integration Tests for Symptom Analysis API Route
 */

import { POST } from './route'
import { NextRequest } from 'next/server'

describe('POST /api/symptoms/analyze', () => {
  /**
   * Helper to create a mock NextRequest
   */
  function createMockRequest(body: unknown): NextRequest {
    return {
      json: async () => body,
    } as unknown as NextRequest
  }

  describe('Valid Requests', () => {
    it('should analyze symptoms and return health insight', async () => {
      const body = {
        symptoms: ['fever', 'cough'],
        duration: '1-3d',
        severity: 'moderate',
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      expect(response.status).toBe(200)

      const data = await response.json()

      // Property 1: Symptom Analysis Structure Completeness
      expect(data.success).toBe(true)
      expect(data.data).toBeDefined()
      expect(data.data.severity).toBeDefined()
      expect(data.data.confidence).toBeDefined()
      expect(data.data.recommendations).toBeDefined()
      expect(data.data.disclaimer).toBeDefined()
    })

    it('should include confidence levels in response', async () => {
      const body = {
        symptoms: ['headache'],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      expect(data.data.confidence).toBeGreaterThanOrEqual(0)
      expect(data.data.confidence).toBeLessThanOrEqual(100)
    })

    it('should include severity assessment', async () => {
      const body = {
        symptoms: ['chest pain', 'difficulty breathing'],
        severity: 'high',
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      const validSeverities = ['low', 'moderate', 'high', 'emergency']
      expect(validSeverities).toContain(data.data.severity)
    })

    it('should include medical disclaimers', async () => {
      const body = {
        symptoms: ['fever'],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      expect(data.data.disclaimer).toBeTruthy()
      expect(data.data.disclaimer.length).toBeGreaterThan(0)
    })

    it('should include professional consultation recommendations', async () => {
      const body = {
        symptoms: ['severe symptoms'],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      expect(data.data.recommendations).toBeDefined()
      expect(Array.isArray(data.data.recommendations)).toBe(true)
    })

    it('should handle optional fields', async () => {
      const body = {
        symptoms: ['sore throat'],
        // Only symptoms provided
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
    })

    it('should accept all valid duration options', async () => {
      const durations = ['0-24h', '1-3d', '4-7d', '1-2w', '2-4w', '4w+']

      for (const duration of durations) {
        const body = {
          symptoms: ['headache'],
          duration,
        }

        const request = createMockRequest(body)
        const response = await POST(request)

        expect(response.status).toBe(200)
      }
    })

    it('should accept all valid severity options', async () => {
      const severities = ['mild', 'moderate', 'severe']

      for (const severity of severities) {
        const body = {
          symptoms: ['pain'],
          severity,
        }

        const request = createMockRequest(body)
        const response = await POST(request)

        expect(response.status).toBe(200)
      }
    })
  })

  describe('Invalid Requests', () => {
    it('should reject request with no symptoms', async () => {
      const body = {
        symptoms: [],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data.error).toBeDefined()
    })

    it('should reject request with empty symptom strings', async () => {
      const body = {
        symptoms: [''],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should reject request exceeding max symptoms', async () => {
      const body = {
        symptoms: Array(15).fill('symptom'),
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should reject invalid duration', async () => {
      const body = {
        symptoms: ['fever'],
        duration: 'invalid_duration',
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should reject invalid severity', async () => {
      const body = {
        symptoms: ['headache'],
        severity: 'super_severe',
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should reject notes exceeding max length', async () => {
      const body = {
        symptoms: ['pain'],
        notes: 'a'.repeat(501),
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should reject malformed JSON', async () => {
      const request = {
        json: async () => {
          throw new Error('Invalid JSON')
        },
      } as unknown as NextRequest

      const response = await POST(request)

      expect(response.status).toBe(500)
    })
  })

  describe('Response Structure', () => {
    it('should include meta data with timestamp and request ID', async () => {
      const body = {
        symptoms: ['fever'],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      expect(data.meta).toBeDefined()
      expect(data.meta.timestamp).toBeDefined()
      expect(data.meta.requestId).toBeDefined()
    })

    it('should have success flag set to true for valid request', async () => {
      const body = {
        symptoms: ['cough'],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      expect(data.success).toBe(true)
    })

    it('should include suggested actions', async () => {
      const body = {
        symptoms: ['fever'],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      expect(data.data.suggestedActions).toBeDefined()
      expect(Array.isArray(data.data.suggestedActions)).toBe(true)
    })

    it('should include symptoms in response', async () => {
      const symptoms = ['fever', 'cough']
      const body = {
        symptoms,
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      expect(data.data.symptoms).toBeDefined()
      expect(Array.isArray(data.data.symptoms)).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('should return 500 for server errors', async () => {
      const request = {
        json: async () => {
          throw new Error('Unexpected error')
        },
      } as unknown as NextRequest

      const response = await POST(request)

      expect(response.status).toBe(500)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data.error).toBeDefined()
    })

    it('should include error details in error response', async () => {
      const body = {
        symptoms: ['invalid'],
        duration: 'not_a_duration',
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      expect(data.error).toBeDefined()
      expect(data.error.code).toBeDefined()
      expect(data.error.message).toBeDefined()
    })
  })

  describe('Content Type Handling', () => {
    it('should process JSON content type', async () => {
      const body = {
        symptoms: ['headache'],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Multiple Symptoms', () => {
    it('should handle multiple symptoms in analysis', async () => {
      const body = {
        symptoms: ['fever', 'cough', 'sore throat', 'fatigue'],
      }

      const request = createMockRequest(body)
      const response = await POST(request)

      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.symptoms.length).toBeGreaterThan(0)
    })

    it('should analyze common symptom combinations', async () => {
      const combinations = [
        ['fever', 'cough', 'shortness of breath'],
        ['headache', 'nausea', 'vomiting'],
        ['chest pain', 'difficulty breathing'],
      ]

      for (const symptoms of combinations) {
        const body = { symptoms }
        const request = createMockRequest(body)
        const response = await POST(request)

        expect(response.status).toBe(200)
      }
    })
  })
})
