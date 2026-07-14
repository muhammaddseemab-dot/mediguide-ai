/**
 * Forgot Password API Endpoint
 * POST /api/auth/forgot-password
 * 
 * Generates password reset token and sends reset email
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { isValidEmail } from '@/lib/utils'
import type { ApiResponse } from '@/types'

interface ForgotPasswordRequest {
  email: string
}

interface ForgotPasswordResponse {
  message: string
}

/**
 * POST handler for password reset request
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ForgotPasswordResponse>>> {
  try {
    const body = (await request.json()) as ForgotPasswordRequest

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
    })

    if (!user) {
      // Don't reveal if user exists for security
      return NextResponse.json(
        {
          success: true,
          data: {
            message:
              'If an account exists with this email, a password reset link will be sent',
          },
        },
        { status: 200 }
      )
    }

    // Check if user has password (i.e., not OAuth only)
    if (!user.password) {
      // Don't reveal this for security, same response as above
      return NextResponse.json(
        {
          success: true,
          data: {
            message:
              'If an account exists with this email, a password reset link will be sent',
          },
        },
        { status: 200 }
      )
    }

    // Delete any existing reset tokens
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        used: false,
      },
    })

    // Generate reset token
    const token = generateRandomToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        email: user.email,
        token,
        expiresAt,
      },
    })

    // TODO: Send password reset email
    // await sendPasswordResetEmail(user.email, token)

    // Always return success message for security
    return NextResponse.json(
      {
        success: true,
        data: {
          message:
            'If an account exists with this email, a password reset link will be sent',
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'REQUEST_FAILED',
          message: 'An error occurred during password reset request',
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
