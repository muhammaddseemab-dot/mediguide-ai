/**
 * Reset Password API Endpoint
 * POST /api/auth/reset-password
 * 
 * Completes password reset using the reset token
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { hashPassword, validatePassword } from '@/lib/auth/password'
import type { ApiResponse } from '@/types'

interface ResetPasswordRequest {
  token: string
  newPassword: string
  confirmPassword: string
}

interface ResetPasswordResponse {
  message: string
}

/**
 * POST handler for password reset completion
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ResetPasswordResponse>>> {
  try {
    const body = (await request.json()) as ResetPasswordRequest

    // Validate input
    if (!body.token || !body.newPassword || !body.confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Token, new password, and confirmation are required',
          },
        },
        { status: 400 }
      )
    }

    // Check passwords match
    if (body.newPassword !== body.confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PASSWORDS_MISMATCH',
            message: 'Passwords do not match',
          },
        },
        { status: 400 }
      )
    }

    // Validate password strength
    const passwordValidation = await validatePassword(body.newPassword)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'WEAK_PASSWORD',
            message: 'Password does not meet security requirements',
            details: {
              errors: passwordValidation.errors,
            },
          },
        },
        { status: 400 }
      )
    }

    // Find reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: body.token },
    })

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired password reset token',
          },
        },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (new Date() > resetToken.expiresAt) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EXPIRED_TOKEN',
            message: 'Password reset token has expired',
          },
        },
        { status: 400 }
      )
    }

    // Check if token was already used
    if (resetToken.used) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USED_TOKEN',
            message: 'This password reset token has already been used',
          },
        },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await hashPassword(body.newPassword)

    // Update user password and mark token as used
    await Promise.all([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ])

    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'Password has been reset successfully',
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RESET_FAILED',
          message: 'An error occurred during password reset',
        },
      },
      { status: 500 }
    )
  }
}
