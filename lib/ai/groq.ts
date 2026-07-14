/**
 * Groq AI Service
 * 
 * Service for integrating with Groq API for fast LLM inference
 * Groq provides free tier without credit card (no-credit-card required)
 */

import type { SymptomAnalysisRequest } from './types'
import type { HealthInsight } from '@/types'
import { SEVERITY_LEVELS } from '@/lib/constants'

/**
 * Groq AI Service class
 */
export class GroqService {
  private apiKey: string
  private cache: Map<string, { data: unknown; expires: number }>

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.cache = new Map()
  }

  /**
   * Analyze symptoms using Groq API via REST
   */
  async analyzeSymptoms(
    request: SymptomAnalysisRequest
  ): Promise<HealthInsight> {
    try {
      // Check cache first
      const cacheKey = this.generateCacheKey('symptom', request)
      const cached = this.getFromCache<HealthInsight>(cacheKey)
      if (cached) return cached

      // Build the prompt for symptom analysis
      const prompt = this.buildSymptomPrompt(request)

      // Call Groq API via fetch (no SDK needed)
      const response = await fetch('https://api.groq.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: `You are a medical AI assistant trained to analyze symptoms and provide health insights. 
Your role is to:
1. Analyze reported symptoms carefully
2. Provide a severity assessment (low, moderate, high, emergency)
3. List possible conditions in order of likelihood
4. Suggest appropriate actions and recommendations
5. Include relevant medical disclaimers

IMPORTANT: You are NOT a replacement for professional medical advice. Always encourage consultation with healthcare professionals.
Respond ONLY with valid JSON, no additional text.`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error('Groq API error:', response.status, error)
        throw new Error(`Groq API error: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices?.[0]?.message?.content

      if (!content) {
        throw new Error('Empty response from Groq API')
      }

      // Parse and validate response
      const analysis = this.parseSymptomAnalysisResponse(
        content,
        request.symptoms
      )

      // Cache the result
      this.setInCache(cacheKey, analysis, 15 * 60 * 1000) // 15 minutes

      return analysis
    } catch (error) {
      console.error('Error analyzing symptoms with Groq:', error)
      throw new Error(
        `Failed to analyze symptoms: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Build prompt for symptom analysis
   */
  private buildSymptomPrompt(request: SymptomAnalysisRequest): string {
    const ageInfo = request.userAge ? `Patient age: ${request.userAge}` : ''
    const genderInfo = request.userGender ? `Gender: ${request.userGender}` : ''
    const historyInfo = request.medicalHistory
      ? `Medical history: ${request.medicalHistory.join(', ')}`
      : ''
    const medsInfo = request.currentMedications
      ? `Current medications: ${request.currentMedications.join(', ')}`
      : ''

    return `Please analyze these symptoms and provide a medical assessment: ${request.symptoms.join(', ')}.
${[ageInfo, genderInfo, historyInfo, medsInfo].filter(Boolean).join('. ')}.

Provide a detailed analysis with possible conditions, severity level, recommendations, and appropriate medical disclaimers.

Return ONLY a JSON object with this exact structure:
{
  "severity": "low|moderate|high|emergency",
  "confidence": 0-100,
  "symptoms": ["symptom1", "symptom2"],
  "possibleConditions": ["condition1", "condition2", "condition3"],
  "recommendations": [
    {
      "id": "unique_id",
      "title": "title",
      "description": "description",
      "actionType": "medicine|lifestyle|consultation|emergency",
      "priority": "low|medium|high|critical"
    }
  ],
  "suggestedActions": [
    {
      "id": "unique_id",
      "label": "action_label",
      "type": "button|link|emergency"
    }
  ],
  "disclaimer": "medical disclaimer text"
}`
  }

  /**
   * Parse symptom analysis response
   */
  private parseSymptomAnalysisResponse(
    response: string,
    originalSymptoms: string[]
  ): HealthInsight {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }

      const parsed = JSON.parse(jsonMatch[0])

      return {
        severity: (parsed.severity || SEVERITY_LEVELS.MODERATE) as
          | 'low'
          | 'moderate'
          | 'high'
          | 'emergency',
        confidence: Math.min(100, Math.max(0, parsed.confidence || 0)),
        symptoms: parsed.symptoms || originalSymptoms,
        possibleConditions: parsed.possibleConditions || [],
        recommendations: (parsed.recommendations || []).map(
          (rec: unknown, idx: number) => {
            const r = rec as Record<string, unknown>
            return {
              id: r.id || `rec-${idx}`,
              title: String(r.title || ''),
              description: String(r.description || ''),
              actionType: (r.actionType ||
                'consultation') as
                | 'medicine'
                | 'lifestyle'
                | 'consultation'
                | 'emergency',
              priority: (r.priority ||
                'medium') as
                | 'low'
                | 'medium'
                | 'high'
                | 'critical',
            }
          }
        ),
        suggestedActions: (parsed.suggestedActions || []).map(
          (action: unknown, idx: number) => {
            const a = action as Record<string, unknown>
            return {
              id: a.id || `action-${idx}`,
              label: String(a.label || ''),
              type: (a.type || 'button') as 'button' | 'link' | 'emergency',
              url: a.url ? String(a.url) : undefined,
            }
          }
        ),
        disclaimer:
          parsed.disclaimer ||
          'This AI-powered analysis is not a medical diagnosis. Please consult a healthcare professional for proper medical advice.',
        createdAt: new Date(),
      }
    } catch (error) {
      console.error('Error parsing Groq response:', error)
      // Return a safe default response
      return {
        severity: SEVERITY_LEVELS.MODERATE,
        confidence: 0,
        symptoms: originalSymptoms,
        possibleConditions: [],
        recommendations: [
          {
            id: 'consult-doctor',
            title: 'Consult a Healthcare Professional',
            description:
              'Please consult a qualified healthcare professional for proper medical advice.',
            actionType: 'consultation',
            priority: 'high',
          },
        ],
        suggestedActions: [
          {
            id: 'action-1',
            label: 'Find a Doctor',
            type: 'button',
          },
        ],
        disclaimer:
          'This is an AI-powered health assessment for informational purposes only. It is not a medical diagnosis and should not replace professional medical advice. Always consult qualified healthcare professionals for proper evaluation and treatment.',
        createdAt: new Date(),
      }
    }
  }

  /**
   * Generate cache key from request parameters
   */
  private generateCacheKey(
    type: string,
    data: Record<string, unknown>
  ): string {
    return `${type}:${JSON.stringify(data)}`
  }

  /**
   * Get value from cache if not expired
   */
  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() > entry.expires) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  /**
   * Set value in cache with expiration
   */
  private setInCache(key: string, value: unknown, durationMs: number): void {
    this.cache.set(key, {
      data: value,
      expires: Date.now() + durationMs,
    })
  }
}

/**
 * Create a Groq service instance
 */
export function getGroqService(): GroqService | null {
  const apiKey = process.env.GROQ_API_KEY
  
  if (!apiKey) {
    console.warn('GROQ_API_KEY not configured')
    return null
  }

  return new GroqService(apiKey)
}
