'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

/**
 * Accessible Select component with label, error states, and custom styling
 * 
 * Validates: Requirements 5.4, 9.2, 9.4
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder = 'Select an option',
      fullWidth = true,
      className,
      id,
      required,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const errorId = `${selectId}-error`
    const helperId = `${selectId}-helper`

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
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
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            value={value}
            aria-invalid={!!error}
            aria-describedby={
              [error ? errorId : null, helperText ? helperId : null]
                .filter(Boolean)
                .join(' ') || undefined
            }
            aria-required={required}
            className={cn(
              'flex appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-900',
              'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
              'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
              'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100',
              'dark:focus:border-blue-400 dark:focus:ring-blue-400',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              fullWidth && 'w-full',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
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

Select.displayName = 'Select'