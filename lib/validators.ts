/**
 * Validation Utility Functions
 * 
 * Common validation functions for form inputs and data validation
 */

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number format
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-()]{7,}$/
  return phoneRegex.test(phone)
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special char
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

/**
 * Get password strength feedback
 */
export function getPasswordStrengthFeedback(password: string): {
  strength: 'weak' | 'fair' | 'good' | 'strong'
  feedback: string[]
  score: number
} {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) {
    score += 20
  } else {
    feedback.push('At least 8 characters')
  }

  if (/[A-Z]/.test(password)) {
    score += 20
  } else {
    feedback.push('At least 1 uppercase letter')
  }

  if (/[a-z]/.test(password)) {
    score += 20
  } else {
    feedback.push('At least 1 lowercase letter')
  }

  if (/\d/.test(password)) {
    score += 20
  } else {
    feedback.push('At least 1 number')
  }

  if (/[@$!%*?&]/.test(password)) {
    score += 20
  } else {
    feedback.push('At least 1 special character (@$!%*?&)')
  }

  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
  if (score === 100) strength = 'strong'
  else if (score >= 80) strength = 'good'
  else if (score >= 60) strength = 'fair'

  return { strength, feedback, score }
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate age
 */
export function validateAge(age: number): boolean {
  return age >= 1 && age <= 150
}

/**
 * Validate postal code (generic)
 */
export function validatePostalCode(postalCode: string): boolean {
  const postalCodeRegex = /^\d{5,10}$/
  return postalCodeRegex.test(postalCode)
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function validateCreditCard(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Validate string length
 */
export function validateLength(
  str: string,
  minLength?: number,
  maxLength?: number
): boolean {
  if (minLength !== undefined && str.length < minLength) return false
  if (maxLength !== undefined && str.length > maxLength) return false
  return true
}

/**
 * Validate required field
 */
export function validateRequired(value: any): boolean {
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (value === null || value === undefined) return false
  return true
}

/**
 * Sanitize HTML input
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}

/**
 * Validate blood type
 */
export function validateBloodType(bloodType: string): boolean {
  const validBloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
  return validBloodTypes.includes(bloodType)
}

/**
 * Validate gender
 */
export function validateGender(
  gender: string
): gender is 'male' | 'female' | 'other' {
  return ['male', 'female', 'other'].includes(gender)
}

/**
 * Validate language code
 */
export function validateLanguageCode(
  lang: string
): lang is 'en' | 'hi' | 'mr' {
  return ['en', 'hi', 'mr'].includes(lang)
}

/**
 * Validate severity level
 */
export function validateSeverity(
  severity: string
): severity is 'low' | 'moderate' | 'high' | 'emergency' {
  return ['low', 'moderate', 'high', 'emergency'].includes(severity)
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export function validateDateFormat(dateString: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(dateString)) return false

  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Validate date is not in the past
 */
export function validateFutureDate(date: Date): boolean {
  return date > new Date()
}

/**
 * Validate date is not in the future
 */
export function validatePastDate(date: Date): boolean {
  return date < new Date()
}
