import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { prisma } from '@/lib/db'
import { healthProfileSchema } from '@/lib/validations/profile'

/**
 * PUT /api/profile/health
 * Update user's health information including allergies, medications, and chronic conditions
 * 
 * Validates: Requirements 6.2, 6.5
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Validate request body
    const validatedData = healthProfileSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update or create health profile
    const healthProfile = await prisma.healthProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        allergies: validatedData.allergies || [],
        chronicConditions: validatedData.chronicConditions || [],
        currentMedications: validatedData.medications
          ? JSON.stringify(validatedData.medications)
          : null,
        bloodType: validatedData.bloodType,
        height: validatedData.height,
        weight: validatedData.weight,
      },
      update: {
        allergies: validatedData.allergies || [],
        chronicConditions: validatedData.chronicConditions || [],
        currentMedications: validatedData.medications
          ? JSON.stringify(validatedData.medications)
          : null,
        bloodType: validatedData.bloodType,
        height: validatedData.height,
        weight: validatedData.weight,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        allergies: healthProfile.allergies,
        medications: validatedData.medications || [],
        chronicConditions: healthProfile.chronicConditions,
        bloodType: healthProfile.bloodType,
        height: healthProfile.height,
        weight: healthProfile.weight,
      },
    })
  } catch (error) {
    console.error('Health profile update error:', error)

    if (error instanceof Error && 'errors' in error) {
      return NextResponse.json(
        { error: 'Validation error', details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
