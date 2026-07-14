/**
 * User Registration API Endpoint
 * POST /api/auth/register
 * 
 * Handles user registration with email/password authentication
 * Validates input, creates user account, and sends verification email
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { hashPassword, validatePassword } from '@/lib/auth/password'
import { isValidEmail } from '@/lib/utils'
import type { ApiResponse } from '@/types'

interface RegisterRequest {
  email: string
  password: string
  name: string
}

interface RegisterResponse {
  id: string
  email: string
  name: string
  message: string
}

/**
 * POST handler for user registration
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<RegisterResponse>>> {
  try {
    const body = (await request.json()) as RegisterRequest

    // Validate input
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Email, password, and name are required',
          },
        },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
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

    // Validate password strength
    const passwordValidation = await validatePassword(password)
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

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USER_EXISTS',
            message: 'An account with this email already exists',
          },
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name.trim(),
        password: hashedPassword,
      },
    })

    // Generate verification token
    const verificationToken = await generateVerificationToken(user.id, email)

    // TODO: Send verification email
    // await sendVerificationEmail(email, verificationToken.token)

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          message: 'Registration successful. Please verify your email.',
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'REGISTRATION_FAILED',
          message: 'An error occurred during registration. Please try again.',
        },
      },
      { status: 500 }
    )
  }
}

/**
 * Helper function to generate email verification token
 */
async function generateVerificationToken(
  userId: string,
  email: string
): Promise<{ token: string; expiresAt: Date }> {
  const token = generateRandomToken()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  await prisma.emailVerification.create({
    data: {
      userId,
      email,
      token,
      expiresAt,
    },
  })

  return { token, expiresAt }
}

/**
 * Helper function to generate a random token
 */
function generateRandomToken(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}
