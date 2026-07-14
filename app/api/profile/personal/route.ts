import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { prisma } from '@/lib/db'
import { personalInfoSchema } from '@/lib/validations/profile'

/**
 * PUT /api/profile/personal
 * Update user's personal information
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
    const validatedData = personalInfoSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user name
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: validatedData.name,
      },
    })

    // Update or create health profile
    const healthProfile = await prisma.healthProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        age: validatedData.age,
        gender: validatedData.gender,
      },
      update: {
        age: validatedData.age,
        gender: validatedData.gender,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        name: updatedUser.name,
        age: healthProfile.age,
        gender: healthProfile.gender,
        phone: validatedData.phone,
      },
    })
  } catch (error) {
    console.error('Personal info update error:', error)

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
