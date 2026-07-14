/**
 * Type definitions for Gemini AI service
 */

import type { Severity } from '@/types'

/**
 * Configuration for the Gemini service
 */
export interface GeminiConfig {
  apiKey: string
  modelName: string
  mockMode: boolean
  cacheEnabled: boolean
  rateLimitPerMinute: number
  requestTimeoutMs: number
}

/**
 * Gemini API request types
 */
export interface SymptomAnalysisRequest {
  symptoms: string[]
  userAge?: number
  userGender?: string
  medicalHistory?: string[]
  currentMedications?: string[]
}

export interface EmergencyDetectionRequest {
  symptoms: string[]
  severity?: string
  userAge?: number
}

export interface TranslationRequest {
  content: string
  targetLanguage: string
  preserveFormatting?: boolean
}

/**
 * Gemini API response types
 */
export interface SymptomAnalysisResponse {
  severity: Severity
  confidence: number
  symptoms: string[]
  possibleConditions: string[]
  recommendations: RecommendationData[]
  suggestedActions: ActionData[]
  disclaimer: string
  analysisTimestamp: Date
  modelVersion: string
}

export interface RecommendationData {
  id: string
  title: string
  description: string
  actionType: 'medicine' | 'lifestyle' | 'consultation' | 'emergency'
  priority: 'low' | 'medium' | 'high' | 'critical'
  estimatedRecoveryTime?: string
  relatedSpecialties?: string[]
}

export interface ActionData {
  id: string
  label: string
  type: 'button' | 'link' | 'emergency'
  url?: string
  actionCode?: string
}

export interface EmergencyDetectionResponse {
  isEmergency: boolean
  confidence: number
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  detectedEmergencyType?: string
  immediateActions: string[]
  recommendedFacilities?: string[]
}

export interface TranslationResponse {
  originalContent: string
  translatedContent: string
  targetLanguage: string
  confidence: number
}

/**
 * Cache entry structure
 */
export interface CacheEntry<T> {
  data: T
  timestamp: Date
  expiresAt: Date
  key: string
}

/**
 * Rate limiting state
 */
export interface RateLimitState {
  requestCount: number
  windowStartTime: Date
  isLimited: boolean
  retryAfterSeconds: number
}

/**
 * API call metrics for monitoring
 */
export interface APICallMetrics {
  totalCalls: number
  successfulCalls: number
  failedCalls: number
  averageResponseTime: number
  cacheHitRate: number
  lastError?: string
  lastErrorTime?: Date
}

/**
 * Prompt template structure
 */
export interface PromptTemplate {
  system: string
  user: string
  examples?: PromptExample[]
}

export interface PromptExample {
  input: string
  output: string
  description?: string
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  fields: Record<string, ValidationFieldResult>
}

export interface ValidationFieldResult {
  isValid: boolean
  error?: string
  suggestion?: string
}

/**
 * Safety filter result
 */
export interface SafetyFilterResult {
  passed: boolean
  issues: SafetyIssue[]
  sanitizedContent?: string
}

export interface SafetyIssue {
  type: 'high_risk' | 'medium_risk' | 'low_risk'
  description: string
  affectedContent: string
  suggestion: string
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxAttempts: number
  baseDelayMs: number
  maxDelayMs: number
  backoffMultiplier: number
  retryableErrors: string[]
}

/**
 * Mock response data for testing
 */
export interface MockResponseData {
  symptomAnalysis: SymptomAnalysisResponse
  emergencyDetection: EmergencyDetectionResponse
  translation: TranslationResponse
}
