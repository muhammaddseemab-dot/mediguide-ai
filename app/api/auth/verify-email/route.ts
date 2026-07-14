/**
 * Email Verification API Endpoint
 * POST /api/auth/verify-email
 * 
 * Verifies user email address using verification token
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import type { ApiResponse } from '@/types'

interface VerifyEmailRequest {
  token: string
}

interface VerifyEmailResponse {
  message: string
  email: string
}

/**
 * POST handler for email verification
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<VerifyEmailResponse>>> {
  try {
    const body = (await request.json()) as VerifyEmailRequest

    if (!body.token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Verification token is required',
          },
        },
        { status: 400 }
      )
    }

    // Find verification record
    const verification = await prisma.emailVerification.findUnique({
      where: { token: body.token },
      include: { user: true },
    })

    if (!verification) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired verification token',
          },
        },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (new Date() > verification.expiresAt) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EXPIRED_TOKEN',
            message: 'Verification token has expired',
          },
        },
        { status: 400 }
      )
    }

    // Check if already verified
    if (verification.verified) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ALREADY_VERIFIED',
            message: 'Email has already been verified',
          },
        },
        { status: 400 }
      )
    }

    // Mark email as verified
    await prisma.emailVerification.update({
      where: { id: verification.id },
      data: { verified: true },
    })

    // Update user's emailVerified field
    await prisma.user.update({
      where: { id: verification.userId },
      data: { emailVerified: new Date() },
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'Email verified successfully',
          email: verification.email,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VERIFICATION_FAILED',
          message: 'An error occurred during email verification',
        },
      },
      { status: 500 }
    )
  }
}
