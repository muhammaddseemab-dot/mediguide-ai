/**
 * Error Handling Utilities
 * 
 * Custom error classes and error handling utilities
 */

import type {
  ApiError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
} from '@/types'

/**
 * Base API Error class
 */
export class AppError extends Error {
  public code: string
  public status: number
  public details?: Record<string, any>
  public timestamp: Date
  public requestId: string

  constructor(
    message: string,
    code: string = 'INTERNAL_ERROR',
    status: number = 500,
    details?: Record<string, any>
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.status = status
    this.details = details
    this.timestamp = new Date()
    this.requestId = generateRequestId()

    Object.setPrototypeOf(this, AppError.prototype)
  }

  toJSON(): ApiError {
    return {
      code: this.code,
      message: this.message,
      status: this.status,
      details: this.details,
      timestamp: this.timestamp,
      requestId: this.requestId,
    }
  }
}

/**
 * Validation Error class
 */
export class ValidationErrorClass extends AppError {
  public validationErrors: Record<string, string[]>

  constructor(
    message: string,
    validationErrors: Record<string, string[]>,
    details?: Record<string, any>
  ) {
    super(message, 'VALIDATION_ERROR', 422, details)
    this.name = 'ValidationError'
    this.validationErrors = validationErrors

    Object.setPrototypeOf(this, ValidationErrorClass.prototype)
  }

  toJSON(): ValidationError {
    return {
      ...super.toJSON(),
      validationErrors: this.validationErrors,
    } as ValidationError
  }
}

/**
 * Authentication Error class
 */
export class AuthenticationErrorClass extends AppError {
  constructor(
    message: string = 'Authentication failed',
    code: 'UNAUTHORIZED' | 'INVALID_CREDENTIALS' | 'SESSION_EXPIRED' = 'UNAUTHORIZED'
  ) {
    super(message, code, 401)
    this.name = 'AuthenticationError'

    Object.setPrototypeOf(this, AuthenticationErrorClass.prototype)
  }

  toJSON(): AuthenticationError {
    return super.toJSON() as AuthenticationError
  }
}

/**
 * Authorization Error class
 */
export class AuthorizationErrorClass extends AppError {
  public requiredRole?: string[]

  constructor(
    message: string = 'Access denied',
    requiredRole?: string[]
  ) {
    super(message, 'FORBIDDEN', 403, { requiredRole })
    this.name = 'AuthorizationError'
    this.requiredRole = requiredRole

    Object.setPrototypeOf(this, AuthorizationErrorClass.prototype)
  }

  toJSON(): AuthorizationError {
    return super.toJSON() as AuthorizationError
  }
}

/**
 * Not Found Error class
 */
export class NotFoundErrorClass extends AppError {
  public resourceType: string
  public resourceId: string

  constructor(resourceType: string, resourceId: string) {
    super(
      `${resourceType} with ID ${resourceId} not found`,
      'NOT_FOUND',
      404
    )
    this.name = 'NotFoundError'
    this.resourceType = resourceType
    this.resourceId = resourceId

    Object.setPrototypeOf(this, NotFoundErrorClass.prototype)
  }

  toJSON(): NotFoundError {
    return {
      ...super.toJSON(),
      resourceType: this.resourceType,
      resourceId: this.resourceId,
    } as NotFoundError
  }
}

/**
 * Rate Limit Error class
 */
export class RateLimitErrorClass extends AppError {
  public retryAfter: number

  constructor(message: string, retryAfter: number) {
    super(message, 'RATE_LIMIT_EXCEEDED', 429, { retryAfter })
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter

    Object.setPrototypeOf(this, RateLimitErrorClass.prototype)
  }

  toJSON(): RateLimitError {
    return {
      ...super.toJSON(),
      retryAfter: this.retryAfter,
    } as RateLimitError
  }
}

/**
 * API Error Handler
 */
export function handleApiError(error: any): AppError {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof TypeError) {
    return new AppError('Invalid request', 'INVALID_REQUEST', 400)
  }

  if (error instanceof SyntaxError) {
    return new AppError('Invalid JSON', 'INVALID_JSON', 400)
  }

  if (error instanceof Error) {
    return new AppError(error.message, 'INTERNAL_ERROR', 500)
  }

  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR', 500)
}

/**
 * Generate unique request ID
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Format error message for user display
 */
export function formatErrorMessage(error: AppError): string {
  const messages: Record<string, string> = {
    VALIDATION_ERROR: 'Please check your input and try again.',
    UNAUTHORIZED: 'Please log in to continue.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
    INTERNAL_ERROR: 'Something went wrong. Please try again.',
  }

  return messages[error.code] || error.message || 'An error occurred'
}

/**
 * Log error (can be extended for external logging service)
 */
export function logError(error: AppError): void {
  // In production, this should send to a logging service like Sentry
  console.error('[AppError]', {
    code: error.code,
    message: error.message,
    status: error.status,
    timestamp: error.timestamp,
    requestId: error.requestId,
    details: error.details,
  })
}

/**
 * Create error response for API
 */
export function createErrorResponse(error: AppError) {
  return {
    success: false,
    error: error.toJSON(),
  }
}

/**
 * Assert condition and throw error if false
 */
export function assert(
  condition: boolean,
  message: string,
  code: string = 'ASSERTION_FAILED'
): asserts condition {
  if (!condition) {
    throw new AppError(message, code, 400)
  }
}
