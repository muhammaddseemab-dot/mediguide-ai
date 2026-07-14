import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { prisma } from '@/lib/db'

/**
 * GET /api/profile
 * Fetch authenticated user's profile data
 * 
 * Validates: Requirements 6.2, 6.5
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        healthProfile: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Parse emergency contacts from health profile if it exists
    let emergencyContacts = []
    if (user.healthProfile?.emergencyContacts) {
      try {
        emergencyContacts = JSON.parse(user.healthProfile.emergencyContacts as string)
      } catch (e) {
        emergencyContacts = []
      }
    }

    return NextResponse.json({
      personalInfo: {
        name: user.name,
        age: user.healthProfile?.age,
        gender: user.healthProfile?.gender,
        phone: user.healthProfile?.emergencyContacts ? '' : '',
      },
      healthProfile: {
        allergies: user.healthProfile?.allergies || [],
        medications: user.healthProfile?.currentMedications
          ? JSON.parse(user.healthProfile.currentMedications as string)
          : [],
        chronicConditions: user.healthProfile?.chronicConditions || [],
        bloodType: user.healthProfile?.bloodType,
        height: user.healthProfile?.height,
        weight: user.healthProfile?.weight,
      },
      emergencyContacts,
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
