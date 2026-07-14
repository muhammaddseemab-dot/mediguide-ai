/**
 * Resend Verification Email API Endpoint
 * POST /api/auth/resend-verification
 * 
 * Resends email verification token to user
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { isValidEmail } from '@/lib/utils'
import type { ApiResponse } from '@/types'

interface ResendVerificationRequest {
  email: string
}

interface ResendVerificationResponse {
  message: string
}

/**
 * POST handler for resending verification email
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ResendVerificationResponse>>> {
  try {
    const body = (await request.json()) as ResendVerificationRequest

    if (!body.email) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Email is required',
          },
        },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_EMAIL',
            message: 'Please provide a valid email address',
          },
        },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
      include: { emailVerification: true },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'No account found with this email address',
          },
        },
        { status: 404 }
      )
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ALREADY_VERIFIED',
            message: 'This email address is already verified',
          },
        },
        { status: 400 }
      )
    }

    // Delete existing verification token if any
    if (user.emailVerification) {
      await prisma.emailVerification.delete({
        where: { id: user.emailVerification.id },
      })
    }

    // Generate new verification token
    const token = generateRandomToken()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        email: user.email,
        token,
        expiresAt,
      },
    })

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, token)

    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'Verification email has been sent',
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RESEND_FAILED',
          message: 'An error occurred while sending verification email',
        },
      },
      { status: 500 }
    )
  }
}

/**
 * Helper function to generate a random token
 */
function generateRandomToken(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}
