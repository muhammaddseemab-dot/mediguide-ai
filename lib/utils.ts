import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines classnames with tailwind merge to prevent conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Formats a date to include time
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Truncates a string to a specified length
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Check if a string is a valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Check if a string is a strong password
 */
export function isStrongPassword(password: string): boolean {
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
} {
  const feedback: string[] = []

  if (password.length < 8) {
    feedback.push('At least 8 characters')
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push('At least 1 uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    feedback.push('At least 1 lowercase letter')
  }
  if (!/\d/.test(password)) {
    feedback.push('At least 1 number')
  }
  if (!/[@$!%*?&]/.test(password)) {
    feedback.push('At least 1 special character (@$!%*?&)')
  }

  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
  if (feedback.length <= 2) strength = 'strong'
  else if (feedback.length <= 3) strength = 'good'
  else if (feedback.length <= 4) strength = 'fair'

  return { strength, feedback }
}
