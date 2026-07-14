'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { PasswordStrength } from '@/types'

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  showStrengthIndicator?: boolean
  strength?: PasswordStrength['strength']
  strengthFeedback?: string[]
  fullWidth?: boolean
  confirmField?: boolean
  match?: boolean
}

/**
 * Accessible Password Input component with visibility toggle and strength indicator
 * 
 * Validates: Requirements 5.4, 9.2, 9.4
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      error,
      helperText,
      showStrengthIndicator = false,
      strength,
      strengthFeedback = [],
      fullWidth = true,
      confirmField = false,
      match,
      className,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputId = id || `password-input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    const strengthColors = {
      weak: 'bg-red-500',
      fair: 'bg-orange-500',
      good: 'bg-yellow-500',
      strong: 'bg-green-500',
    }

    const strengthLabels = {
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
    }

    const strengthWidths = {
      weak: '25%',
      fair: '50%',
      good: '75%',
      strong: '100%',
    }

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-900 dark:text-gray-50"
          >
            {label}
            {required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              [
                error ? errorId : null,
                helperText ? helperId : null,
                showStrengthIndicator ? `${inputId}-strength` : null,
              ]
                .filter(Boolean)
                .join(' ') || undefined
            }
            aria-required={required}
            className={cn(
              'flex rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-900',
              'placeholder:text-gray-400',
              'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
              'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
              'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500',
              'dark:focus:border-blue-400 dark:focus:ring-blue-400',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              confirmField && match === false && 'border-red-500',
              fullWidth && 'w-full',
              className
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {showStrengthIndicator && strength && (
          <div id={`${inputId}-strength`} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Password Strength
              </span>
              <span
                className={cn(
                  'text-xs font-semibold',
                  strength === 'strong' && 'text-green-600',
                  strength === 'good' && 'text-yellow-600',
                  strength === 'fair' && 'text-orange-600',
                  strength === 'weak' && 'text-red-600'
                )}
              >
                {strengthLabels[strength]}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={cn(
                  'h-full transition-all duration-300',
                  strengthColors[strength]
                )}
                style={{ width: strengthWidths[strength] }}
              />
            </div>

            {/* Requirements feedback */}
            {strengthFeedback.length > 0 && (
              <div className="space-y-1">
                {strengthFeedback.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {strengthFeedback.length === 0 && strength !== 'weak' && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs text-green-600">
                  Password meets all requirements
                </span>
              </div>
            )}
          </div>
        )}

        {error && (
          <p
            id={errorId}
            className="text-sm font-medium text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'