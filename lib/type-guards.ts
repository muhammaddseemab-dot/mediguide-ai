/**
 * Type Guards and Type Predicates
 * 
 * Runtime type checking functions
 */

import type {
  Language,
  Theme,
  Severity,
  UserRole,
  UserProfile,
  HealthInsight,
  Medicine,
  EmergencyAssessment,
  ApiError,
  ValidationError,
  AuthenticationError,
} from '@/types'

/**
 * Type guard for Language
 */
export function isLanguage(value: any): value is Language {
  return ['en', 'hi', 'mr'].includes(value)
}

/**
 * Type guard for Theme
 */
export function isTheme(value: any): value is Theme {
  return ['light', 'dark'].includes(value)
}

/**
 * Type guard for Severity
 */
export function isSeverity(value: any): value is Severity {
  return ['low', 'moderate', 'high', 'emergency'].includes(value)
}

/**
 * Type guard for UserRole
 */
export function isUserRole(value: any): value is UserRole {
  return ['user', 'admin', 'healthcare_provider'].includes(value)
}

/**
 * Type guard for UserProfile
 */
export function isUserProfile(value: any): value is UserProfile {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value &&
    'name' in value &&
    isLanguage(value.language) &&
    isTheme(value.theme) &&
    isUserRole(value.role)
  )
}

/**
 * Type guard for HealthInsight
 */
export function isHealthInsight(value: any): value is HealthInsight {
  return (
    typeof value === 'object' &&
    value !== null &&
    isSeverity(value.severity) &&
    typeof value.confidence === 'number' &&
    Array.isArray(value.recommendations) &&
    typeof value.disclaimer === 'string'
  )
}

/**
 * Type guard for Medicine
 */
export function isMedicine(value: any): value is Medicine {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'dosage' in value &&
    'price' in value &&
    typeof value.prescriptionRequired === 'boolean'
  )
}

/**
 * Type guard for EmergencyAssessment
 */
export function isEmergencyAssessment(value: any): value is EmergencyAssessment {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.isEmergency === 'boolean' &&
    typeof value.confidence === 'number' &&
    Array.isArray(value.emergencyContacts)
  )
}

/**
 * Type guard for ApiError
 */
export function isApiError(value: any): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    'message' in value &&
    typeof value.status === 'number' &&
    value.timestamp instanceof Date
  )
}

/**
 * Type guard for ValidationError
 */
export function isValidationError(value: any): value is ValidationError {
  return (
    isApiError(value) &&
    'validationErrors' in value &&
    typeof value.validationErrors === 'object'
  )
}

/**
 * Type guard for AuthenticationError
 */
export function isAuthenticationError(value: any): value is AuthenticationError {
  return (
    isApiError(value) &&
    ['UNAUTHORIZED', 'INVALID_CREDENTIALS', 'SESSION_EXPIRED'].includes(
      value.code
    )
  )
}

/**
 * Type guard for Array
 */
export function isArray<T>(value: any, itemGuard?: (item: any) => item is T): value is T[] {
  if (!Array.isArray(value)) return false
  if (itemGuard) {
    return value.every(itemGuard)
  }
  return true
}

/**
 * Type guard for object with specific keys
 */
export function hasProperties<K extends PropertyKey>(
  value: any,
  properties: K[]
): value is Record<K, any> {
  return (
    typeof value === 'object' &&
    value !== null &&
    properties.every((prop) => prop in value)
  )
}

/**
 * Type guard for string
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}

/**
 * Type guard for number
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Type guard for boolean
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

/**
 * Type guard for Date
 */
export function isDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime())
}

/**
 * Type guard for non-null
 */
export function isNonNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * Type guard for non-empty string
 */
export function isNonEmptyString(value: any): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Type guard for non-empty array
 */
export function isNonEmptyArray<T>(value: any): value is T[] {
  return Array.isArray(value) && value.length > 0
}

/**
 * Type guard for positive number
 */
export function isPositiveNumber(value: any): value is number {
  return isNumber(value) && value > 0
}

/**
 * Type guard for email-like string
 */
export function isEmailString(value: any): value is string {
  if (!isString(value)) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}
