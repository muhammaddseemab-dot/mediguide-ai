'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

/**
 * Accessible Input component with label, error states, and icon support
 * 
 * Validates: Requirements 5.4, 9.2, 9.4
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      required,
      disabled,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

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
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              [error ? errorId : null, helperText ? helperId : null]
                .filter(Boolean)
                .join(' ') || undefined
            }
            aria-required={required}
            className={cn(
              'flex rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900',
              'placeholder:text-gray-400',
              'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
              'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
              'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500',
              'dark:focus:border-blue-400 dark:focus:ring-blue-400',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              fullWidth && 'w-full',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

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

Input.displayName = 'Input'