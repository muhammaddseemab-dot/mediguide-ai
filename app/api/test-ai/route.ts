/**
 * Test AI API Route
 * 
 * Simple test endpoint to verify Gemini AI integration
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGeminiService } from '@/lib/ai/gemini'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { testMessage = "Hello, how are you?" } = body

    const geminiService = getGeminiService()
    
    // Simple test request
    const testRequest = {
      symptoms: [testMessage],
      userAge: 30,
      userGender: 'not specified',
      medicalHistory: [],
      currentMedications: []
    }

    const result = await geminiService.analyzeSymptoms(testRequest)
    
    return NextResponse.json({
      success: true,
      data: {
        message: "AI integration is working!",
        testInput: testMessage,
        aiResponse: result,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Test AI API error:', error)
    
    return NextResponse.json({
      success: false,
      error: {
        message: "AI test failed",
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
    }, { status: 500 })
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: "AI Test Endpoint",
    instructions: "Send a POST request with { testMessage: 'your message' } to test the AI integration",
    example: {
      method: "POST",
      body: { testMessage: "I have a headache" }
    }
  })
}