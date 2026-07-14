/**
 * Emergency Detection API Route
 * 
 * POST /api/symptoms/emergency
 * Detects emergency-level symptoms and provides critical recommendations
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGeminiService } from '@/lib/ai/gemini'
import { emergencyReportSchema } from '@/lib/validations/symptom'
import type { ApiResponse, EmergencyAssessment } from '@/types'
import { MEDICAL_DISCLAIMERS, EMERGENCY_KEYWORDS } from '@/lib/constants'

/**
 * POST handler for emergency detection
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = await request.json()

    // Quick keyword-based emergency check
    const symptoms = Array.isArray(body.symptoms) ? body.symptoms : []
    const isEmergencyKeywordDetected = detectEmergencyKeywords(symptoms)

    // Initialize Gemini service
    const geminiService = getGeminiService()

    // Perform AI-based emergency detection
    const emergencyDetection = await geminiService.detectEmergency({
      symptoms,
      userAge: body.userAge,
    })

    // Combine keyword detection with AI detection
    const assessment: EmergencyAssessment = {
      ...emergencyDetection,
      isEmergency: emergencyDetection.isEmergency || isEmergencyKeywordDetected,
      instructions: [
        ...(emergencyDetection.isEmergency || isEmergencyKeywordDetected
          ? [`🚨 EMERGENCY: ${MEDICAL_DISCLAIMERS.EMERGENCY}`]
          : []),
        ...emergencyDetection.immediateActions,
      ],
      emergencyContacts: getEmergencyContacts(body.location),
      nearbyHospitals: [], // Could be enhanced with geolocation API
    }

    // Log emergency detection for monitoring
    if (assessment.isEmergency) {
      console.log({
        timestamp: new Date(),
        action: 'emergency_detection',
        symptoms,
        confidence: assessment.confidence,
        urgencyLevel: assessment.urgencyLevel,
        location: body.location,
      })
    }

    // Return response
    return NextResponse.json(
      {
        success: true,
        data: assessment,
        meta: {
          timestamp: new Date(),
          requestId: generateRequestId(),
        },
      } as ApiResponse<EmergencyAssessment>,
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in emergency detection:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    // In case of error, err on the side of caution
    return NextResponse.json(
      {
        success: false,
        data: {
          isEmergency: true,
          confidence: 0,
          urgencyLevel: 'critical',
          symptoms: [],
          emergencyContacts: getEmergencyContacts(),
          nearbyHospitals: [],
          instructions: [
            'Unable to assess symptoms. Please call emergency services immediately.',
            MEDICAL_DISCLAIMERS.EMERGENCY_HOTLINE,
          ],
          estimatedResponse: 'Immediate',
        },
        error: {
          code: 'ASSESSMENT_ERROR',
          message: 'Failed to assess emergency status',
          details: { error: errorMessage },
        },
      } as ApiResponse<EmergencyAssessment>,
      { status: 200 } // Still return 200 with emergency data
    )
  }
}

/**
 * Detect emergency keywords in symptoms
 */
function detectEmergencyKeywords(symptoms: string[]): boolean {
  const symptomText = symptoms.join(' ').toLowerCase()
  return EMERGENCY_KEYWORDS.some((keyword) => symptomText.includes(keyword.toLowerCase()))
}

/**
 * Get emergency contacts based on location
 */
function getEmergencyContacts(location?: { latitude: number; longitude: number }) {
  // In production, this would query a database or external service
  return [
    {
      id: 'ambulance',
      name: 'Ambulance',
      phone: '102', // India emergency number
      type: 'ambulance' as const,
    },
    {
      id: 'emergency',
      name: 'Emergency Services',
      phone: '112', // India emergency hotline
      type: 'police' as const,
    },
    {
      id: 'fire',
      name: 'Fire Department',
      phone: '101',
      type: 'fire' as const,
    },
  ]
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
