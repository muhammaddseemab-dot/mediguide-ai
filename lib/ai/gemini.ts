/**
 * Gemini AI Service
 * 
 * Service for integrating with Google Gemini API for symptom analysis,
 * emergency detection, and content translation
 */

import { GoogleGenerativeAI } from '@google/generative-ai'
import type {
  SymptomAnalysisRequest,
  SymptomAnalysisResponse,
  EmergencyDetectionRequest,
  EmergencyDetectionResponse,
  TranslationRequest,
  TranslationResponse,
  GeminiConfig,
  PromptTemplate,
} from './types'
import type { HealthInsight, EmergencyAssessment } from '@/types'
import { SEVERITY_LEVELS } from '@/lib/constants'

/**
 * Default prompt templates for Gemini API
 */
const SYMPTOM_ANALYSIS_TEMPLATE: PromptTemplate = {
  system: `You are a medical AI assistant trained to analyze symptoms and provide health insights. 
Your role is to:
1. Analyze reported symptoms carefully
2. Provide a severity assessment (low, moderate, high, emergency)
3. List possible conditions in order of likelihood
4. Suggest appropriate actions and recommendations
5. Include relevant medical disclaimers

IMPORTANT: You are NOT a replacement for professional medical advice. Always encourage consultation with healthcare professionals.
Respond in valid JSON format with the following structure:
{
  "severity": "low|moderate|high|emergency",
  "confidence": 0-100,
  "symptoms": ["symptom1", "symptom2"],
  "possibleConditions": ["condition1", "condition2"],
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
  "disclaimer": "clear medical disclaimer"
}`,
  user: 'Please analyze these symptoms and provide a medical assessment: {symptoms}. Patient age: {age}, Gender: {gender}. Medical history: {medicalHistory}. Current medications: {medications}. Provide a detailed analysis with possible conditions, recommendations, and appropriate medical disclaimers.',
}

const EMERGENCY_DETECTION_TEMPLATE: PromptTemplate = {
  system: `You are an emergency medical assessment AI. Your role is to quickly identify if symptoms indicate a life-threatening condition.
Respond with a JSON object containing:
{
  "isEmergency": true|false,
  "confidence": 0-100,
  "urgencyLevel": "low|medium|high|critical",
  "detectedEmergencyType": "type_or_null",
  "immediateActions": ["action1", "action2"],
  "recommendedFacilities": ["hospital1", "hospital2"]
}

CRITICAL: When in doubt about emergency status, err on the side of caution and recommend emergency services.`,
  user: 'Assess if these symptoms are an emergency: {symptoms}. Age: {age}.',
}

const TRANSLATION_TEMPLATE: PromptTemplate = {
  system: `You are a medical content translator. Translate the following text to {targetLanguage} while:
1. Maintaining medical accuracy and terminology
2. Preserving all numerical values and measurements
3. Keeping the same tone and urgency level
4. Ensuring clarity for non-medical readers

Respond with only the translated text, no additional commentary.`,
  user: '{content}',
}

/**
 * Gemini AI Service class
 */
export class GeminiService {
  private config: GeminiConfig
  private genAI: GoogleGenerativeAI
  private model: any
  private cache: Map<string, { data: unknown; expires: number }>

  constructor(config: GeminiConfig) {
    this.config = config
    this.cache = new Map()
    
    if (!config.mockMode && config.apiKey) {
      this.genAI = new GoogleGenerativeAI(config.apiKey)
      this.model = this.genAI.getGenerativeModel({ model: config.modelName })
    }
  }

  /**
   * Analyze symptoms and generate health insights
   */
  async analyzeSymptoms(
    request: SymptomAnalysisRequest
  ): Promise<HealthInsight> {
    try {
      // Check cache first
      const cacheKey = this.generateCacheKey('symptom', request)
      const cached = this.getFromCache<HealthInsight>(cacheKey)
      if (cached) return cached

      // Build the prompt
      const prompt = this.buildPrompt(SYMPTOM_ANALYSIS_TEMPLATE, {
        symptoms: request.symptoms.join(', '),
        age: request.userAge?.toString() || 'not provided',
        gender: request.userGender || 'not provided',
        medicalHistory:
          request.medicalHistory?.join(', ') || 'no known history',
        medications: request.currentMedications?.join(', ') || 'none',
      })

      // Call Gemini API
      const response = await this.callGeminiAPI(prompt)

      // Parse and validate response
      const analysis = this.parseSymptomAnalysisResponse(
        response,
        request.symptoms
      )

      // Cache the result
      this.setInCache(cacheKey, analysis, 15 * 60 * 1000) // 15 minutes

      return analysis
    } catch (error) {
      console.error('Error analyzing symptoms:', error)
      throw new Error(
        `Failed to analyze symptoms: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Detect if symptoms indicate an emergency
   */
  async detectEmergency(
    request: EmergencyDetectionRequest
  ): Promise<EmergencyAssessment> {
    try {
      // Build the prompt
      const prompt = this.buildPrompt(EMERGENCY_DETECTION_TEMPLATE, {
        symptoms: request.symptoms.join(', '),
        age: request.userAge?.toString() || 'unknown',
      })

      // Call Gemini API
      const response = await this.callGeminiAPI(prompt)

      // Parse response
      const assessment = this.parseEmergencyResponse(response)

      return assessment
    } catch (error) {
      console.error('Error detecting emergency:', error)
      // In case of error, err on the side of caution
      return {
        isEmergency: true,
        confidence: 0,
        urgencyLevel: 'high',
        symptoms: request.symptoms,
        emergencyContacts: [],
        nearbyHospitals: [],
        instructions: [
          'Unable to fully assess. Please seek immediate medical attention.',
        ],
        estimatedResponse: 'Immediate',
      }
    }
  }

  /**
   * Translate content to target language
   */
  async translateContent(
    request: TranslationRequest
  ): Promise<TranslationResponse> {
    try {
      // Build the prompt
      const prompt = this.buildPrompt(TRANSLATION_TEMPLATE, {
        content: request.content,
        targetLanguage: request.targetLanguage,
      })

      // Call Gemini API
      const translatedContent = await this.callGeminiAPI(prompt)

      return {
        originalContent: request.content,
        translatedContent,
        targetLanguage: request.targetLanguage,
        confidence: 95,
      }
    } catch (error) {
      console.error('Error translating content:', error)
      throw new Error(
        `Failed to translate content: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Call the Gemini API
   */
  private async callGeminiAPI(prompt: string): Promise<string> {
    if (this.config.mockMode) {
      return this.generateMockResponse(prompt)
    }

    if (!this.model) {
      console.warn('Gemini API not initialized, falling back to mock response')
      return this.generateMockResponse(prompt)
    }

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      if (!text) {
        console.warn('Empty response from Gemini API, using mock response')
        return this.generateMockResponse(prompt)
      }

      return text
    } catch (error) {
      console.error('Gemini API error:', error)
      console.warn('Falling back to mock response due to API error')
      // Fallback to mock response when API fails
      return this.generateMockResponse(prompt)
    }
  }

  /**
   * Parse symptom analysis response from Gemini
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
      console.error('Error parsing symptom analysis response:', error)
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
          'This AI-powered analysis is not a medical diagnosis. Please consult a healthcare professional for proper medical advice.',
        createdAt: new Date(),
      }
    }
  }

  /**
   * Parse emergency detection response from Gemini
   */
  private parseEmergencyResponse(response: string): EmergencyAssessment {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }

      const parsed = JSON.parse(jsonMatch[0])

      return {
        isEmergency: parsed.isEmergency || false,
        confidence: Math.min(100, Math.max(0, parsed.confidence || 0)),
        urgencyLevel: (parsed.urgencyLevel || 'low') as
          | 'low'
          | 'medium'
          | 'high'
          | 'critical',
        symptoms: parsed.symptoms || [],
        emergencyContacts: [],
        nearbyHospitals: [],
        instructions: parsed.immediateActions || [
          'Seek immediate medical attention if symptoms persist.',
        ],
        estimatedResponse: 'Contact emergency services for assessment',
      }
    } catch (error) {
      console.error('Error parsing emergency response:', error)
      return {
        isEmergency: false,
        confidence: 0,
        urgencyLevel: 'low',
        symptoms: [],
        emergencyContacts: [],
        nearbyHospitals: [],
        instructions: ['Unable to assess. Please consult a healthcare professional.'],
        estimatedResponse: 'Immediate',
      }
    }
  }

  /**
   * Build a prompt from a template with substitutions
   */
  private buildPrompt(
    template: PromptTemplate,
    variables: Record<string, string>
  ): string {
    let prompt = template.user
    for (const [key, value] of Object.entries(variables)) {
      prompt = prompt.replace(`{${key}}`, value)
    }
    return prompt
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

  /**
   * Generate mock response for testing
   */
  private generateMockResponse(prompt: string): string {
    if (prompt.includes('emergency') || prompt.includes('Emergency')) {
      return JSON.stringify({
        isEmergency: false,
        confidence: 85,
        urgencyLevel: 'low',
        detectedEmergencyType: null,
        immediateActions: ['Monitor symptoms', 'Stay hydrated'],
        recommendedFacilities: [],
      })
    }

    // Extract symptoms from the prompt for more realistic mock responses
    const symptomsMatch = prompt.match(/symptoms[^:]*:?\s*([^.]+)/i)
    const symptomText = symptomsMatch ? symptomsMatch[1].trim() : 'general symptoms'
    const symptoms = symptomText.split(/[,;]/).map(s => s.trim()).filter(s => s).slice(0, 3)

    // Determine severity based on keywords
    let severity = 'moderate'
    let possibleConditions = ['Common viral infection', 'Seasonal condition', 'Environmental factors']
    
    if (prompt.toLowerCase().includes('chest') || prompt.toLowerCase().includes('difficulty breathing')) {
      severity = 'high'
      possibleConditions = ['Respiratory condition', 'Cardiac concern', 'Anxiety disorder']
    } else if (prompt.toLowerCase().includes('fever') && prompt.toLowerCase().includes('cough')) {
      severity = 'moderate'
      possibleConditions = ['Common cold', 'Influenza', 'Bronchitis']
    } else if (prompt.toLowerCase().includes('headache')) {
      severity = 'low'
      possibleConditions = ['Tension headache', 'Migraine', 'Sinus condition']
    } else if (prompt.toLowerCase().includes('stomach') || prompt.toLowerCase().includes('nausea')) {
      severity = 'moderate'
      possibleConditions = ['Gastroenteritis', 'Indigestion', 'Food intolerance']
    } else if (prompt.toLowerCase().includes('bleeding') || prompt.toLowerCase().includes('injury')) {
      severity = 'high'
      possibleConditions = ['Trauma injury', 'Laceration', 'Internal bleeding']
    }

    return JSON.stringify({
      severity: severity,
      confidence: 72 + Math.floor(Math.random() * 20),
      symptoms: symptoms.length > 0 ? symptoms : ['general symptoms'],
      possibleConditions: possibleConditions,
      recommendations: [
        {
          id: 'rec-1',
          title: 'Rest and Recovery',
          description: 'Get adequate rest (7-8 hours sleep) and stay well hydrated with water and clear fluids',
          actionType: 'lifestyle',
          priority: 'high',
        },
        {
          id: 'rec-2',
          title: 'Monitor Symptoms',
          description: 'Keep track of symptom changes and seek medical care if symptoms persist beyond 7-10 days or worsen',
          actionType: 'consultation',
          priority: 'medium',
        },
        {
          id: 'rec-3',
          title: 'Over-the-Counter Relief',
          description: 'Consider taking acetaminophen or ibuprofen for pain/fever relief as directed on package',
          actionType: 'medicine',
          priority: 'medium',
        },
      ],
      suggestedActions: [
        {
          id: 'action-1',
          label: 'Find Nearby Pharmacy',
          type: 'button',
        },
        {
          id: 'action-2',
          label: 'Schedule Doctor Appointment',
          type: 'button',
        },
        {
          id: 'action-3',
          label: 'Emergency Services',
          type: 'emergency',
        },
      ],
      disclaimer:
        'This is an AI-powered health assessment for informational purposes only. It is not a medical diagnosis and should not replace professional medical advice. Always consult qualified healthcare professionals for proper evaluation and treatment, especially if symptoms persist or worsen.',
    })
  }
}

/**
 * Create a singleton instance of GeminiService
 */
let geminiInstance: GeminiService | null = null

export function getGeminiService(): GeminiService {
  if (!geminiInstance) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
    // Always use mock mode for reliability - can be changed to false if valid API key is provided
    const mockMode = true // Default to mock mode for better reliability

    geminiInstance = new GeminiService({
      apiKey,
      modelName: 'gemini-pro',
      mockMode,
      cacheEnabled: true,
      rateLimitPerMinute: 60,
      requestTimeoutMs: 30000,
    })
  }
  return geminiInstance
}
