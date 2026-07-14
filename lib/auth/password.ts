/**
 * Password validation and hashing utilities
 * Implements secure password storage and strength validation
 */

import bcrypt from 'bcryptjs'

/**
 * Password requirements constants
 */
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SPECIAL: true,
  SPECIAL_CHARS: '@$!%*?&',
}

/**
 * Validate password strength
 * Returns true if password meets all requirements
 */
export function validatePasswordStrength(password: string): boolean {
  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) return false
  if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password))
    return false
  if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password))
    return false
  if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBERS && !/\d/.test(password))
    return false
  if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL) {
    const specialCharRegex = new RegExp(
      `[${PASSWORD_REQUIREMENTS.SPECIAL_CHARS.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`
    )
    if (!specialCharRegex.test(password)) return false
  }
  return true
}

/**
 * Get detailed password strength feedback
 */
export function getPasswordStrengthFeedback(password: string): {
  isValid: boolean
  strength: 'weak' | 'fair' | 'good' | 'strong'
  feedback: string[]
} {
  const feedback: string[] = []

  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    feedback.push(
      `At least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters required`
    )
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    feedback.push('At least 1 uppercase letter (A-Z)')
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    feedback.push('At least 1 lowercase letter (a-z)')
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBERS && !/\d/.test(password)) {
    feedback.push('At least 1 number (0-9)')
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL) {
    const specialCharRegex = new RegExp(
      `[${PASSWORD_REQUIREMENTS.SPECIAL_CHARS.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`
    )
    if (!specialCharRegex.test(password)) {
      feedback.push(
        `At least 1 special character (${PASSWORD_REQUIREMENTS.SPECIAL_CHARS})`
      )
    }
  }

  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
  if (feedback.length === 0) strength = 'strong'
  else if (feedback.length <= 1) strength = 'good'
  else if (feedback.length <= 2) strength = 'fair'

  return {
    isValid: feedback.length === 0,
    strength,
    feedback,
  }
}

/**
 * Hash a password using bcrypt
 * Returns the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

/**
 * Compare a plain text password with a hashed password
 * Returns true if passwords match
 */
export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

/**
 * Validate password and return comprehensive validation result
 */
export async function validatePassword(password: string): Promise<{
  isValid: boolean
  errors: string[]
}> {
  const errors: string[] = []

  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    errors.push(
      `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`
    )
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBERS && !/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL) {
    const specialCharRegex = new RegExp(
      `[${PASSWORD_REQUIREMENTS.SPECIAL_CHARS.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`
    )
    if (!specialCharRegex.test(password)) {
      errors.push(
        `Password must contain at least one special character: ${PASSWORD_REQUIREMENTS.SPECIAL_CHARS}`
      )
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
