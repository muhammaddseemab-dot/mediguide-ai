'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  showCount?: boolean
  fullWidth?: boolean
}

/**
 * Accessible Textarea component with label, error states, and character count
 * 
 * Validates: Requirements 5.4, 9.2, 9.4
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCount = false,
      fullWidth = true,
      className,
      id,
      required,
      disabled,
      maxLength,
      value,
      placeholder,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const errorId = `${textareaId}-error`
    const helperId = `${textareaId}-helper`

    const currentLength = typeof value === 'string' ? value.length : 0

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
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
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={value}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={
              [
                error ? errorId : null,
                helperText ? helperId : null,
                showCount && maxLength ? `${textareaId}-count` : null,
              ]
                .filter(Boolean)
                .join(' ') || undefined
            }
            aria-required={required}
            className={cn(
              'flex min-h-[100px] resize-y rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900',
              'placeholder:text-gray-400',
              'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
              'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
              'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500',
              'dark:focus:border-blue-400 dark:focus:ring-blue-400',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              fullWidth && 'w-full',
              className
            )}
            {...props}
          />
        </div>

        <div className="flex justify-between">
          <div>
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

          {showCount && maxLength && (
            <span
              id={`${textareaId}-count`}
              className={cn(
                'text-xs',
                currentLength > maxLength * 0.9
                  ? 'text-red-500'
                  : 'text-gray-400'
              )}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'