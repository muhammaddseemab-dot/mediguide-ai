/**
 * Symptom Analysis API Route
 * 
 * POST /api/symptoms/analyze
 * Analyzes user symptoms and returns AI-generated health insights
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGeminiService } from '@/lib/ai/gemini'
import { getGroqService } from '@/lib/ai/groq'
import { symptomInputSchema } from '@/lib/validations/symptom'
import type { ApiResponse, HealthInsight } from '@/types'
import { MEDICAL_DISCLAIMERS } from '@/lib/constants'

/**
 * POST handler for symptom analysis
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input
    const validationResult = symptomInputSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid symptom input',
            details: validationResult.error.flatten(),
          },
        } as ApiResponse<never>,
        { status: 400 }
      )
    }

    const { symptoms, duration, severity, notes } = validationResult.data

    // Prepare analysis request
    const analysisRequest = {
      symptoms,
      userAge: undefined, // Can be enhanced with user profile data
      userGender: undefined, // Can be enhanced with user profile data
      medicalHistory: undefined, // Can be enhanced with user profile data
      currentMedications: undefined, // Can be enhanced with user profile data
    }

    // Try Groq API first (free tier)
    let analysis: HealthInsight | null = null
    let usedService = 'none'

    const groqService = getGroqService()
    if (groqService) {
      try {
        analysis = await groqService.analyzeSymptoms(analysisRequest)
        usedService = 'groq'
        console.log('Symptom analysis completed using Groq API')
      } catch (error) {
        console.warn('Groq API failed, falling back to Gemini:', error)
      }
    }

    // Fallback to Gemini if Groq fails
    if (!analysis) {
      const geminiService = getGeminiService()
      analysis = await geminiService.analyzeSymptoms(analysisRequest)
      usedService = 'gemini'
      console.log('Symptom analysis completed using Gemini service')
    }

    // Add additional context to the analysis
    const enhancedAnalysis: HealthInsight = {
      ...analysis,
      disclaimer: `${analysis.disclaimer}\n\n${MEDICAL_DISCLAIMERS.CONSULT_DOCTOR}`,
    }

    // Log the analysis for monitoring (in production, this would go to a logging service)
    console.log({
      timestamp: new Date(),
      action: 'symptom_analysis',
      symptoms,
      severity: enhancedAnalysis.severity,
      confidence: enhancedAnalysis.confidence,
    })

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        data: enhancedAnalysis,
        meta: {
          timestamp: new Date(),
          requestId: generateRequestId(),
        },
      } as ApiResponse<HealthInsight>,
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in symptom analysis:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to analyze symptoms',
          details: {
            error: errorMessage,
          },
        },
      } as ApiResponse<never>,
      { status: 500 }
    )
  }
}

/**
 * Generate a unique request ID for tracking
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
