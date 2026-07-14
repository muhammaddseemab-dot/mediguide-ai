'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
  fullWidth?: boolean
}

/**
 * Accessible Checkbox component with label and error states
 * 
 * Validates: Requirements 5.4, 9.2, 9.4
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      fullWidth = false,
      className,
      id,
      required,
      disabled,
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    const errorId = `${checkboxId}-error`
    const descriptionId = description ? `${checkboxId}-description` : undefined

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        <div className="flex items-start gap-3">
          <div className="relative flex items-center justify-center">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              disabled={disabled}
              required={required}
              checked={checked}
              onChange={onChange}
              aria-invalid={!!error}
              aria-describedby={
                [error ? errorId, description ? descriptionId : null]
                  .filter(Boolean)
                  .join(' ') || undefined
              }
              aria-required={required}
              className={cn(
                'peer h-5 w-5 shrink-0 rounded border border-gray-300 bg-white',
                'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                'checked:border-blue-500 checked:bg-blue-500',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'dark:border-gray-600 dark:bg-gray-800',
                'dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900',
                error && 'border-red-500',
                className
              )}
              {...props}
            />
            <Check
              className={cn(
                'absolute h-3.5 w-3.5 text-white opacity-0',
                'peer-checked:opacity-100',
                'pointer-events-none'
              )}
            />
          </div>

          <div className="flex-1">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  'text-sm font-medium text-gray-900 dark:text-gray-50',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
                {required && (
                  <span className="ml-1 text-red-500" aria-hidden="true">
                    *
                  </span>
                )}
              </label>
            )}

            {description && (
              <p
                id={descriptionId}
                className="mt-0.5 text-sm text-gray-500 dark:text-gray-400"
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {error && (
          <p
            id={errorId}
            className="ml-8 text-sm font-medium text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'