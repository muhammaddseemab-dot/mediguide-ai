import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { prisma } from '@/lib/db'
import { emergencyContactsSchema } from '@/lib/validations/profile'

/**
 * PUT /api/profile/emergency-contacts
 * Update user's emergency contacts
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

    // Validate request body - should be an array of emergency contacts
    const validatedData = emergencyContactsSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check that at least one primary contact exists
    const hasPrimaryContact = validatedData.some((contact) => contact.priority === 'primary')
    if (validatedData.length > 0 && !hasPrimaryContact) {
      return NextResponse.json(
        { error: 'At least one primary emergency contact is required' },
        { status: 400 }
      )
    }

    // Update or create health profile with emergency contacts
    const healthProfile = await prisma.healthProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        emergencyContacts: JSON.stringify(validatedData),
      },
      update: {
        emergencyContacts: JSON.stringify(validatedData),
      },
    })

    return NextResponse.json({
      success: true,
      data: validatedData,
    })
  } catch (error) {
    console.error('Emergency contacts update error:', error)

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
