'use client'

import React, { ReactNode } from 'react'
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string
  description?: string
  children: (props: {
    field: any
    fieldState: any
    formState: any
  }) => ReactNode
  required?: boolean
  helpText?: string
  error?: string
}

/**
 * FormField component that wraps React Hook Form's useController
 * Provides consistent field management with validation state
 * Accessible with proper ARIA labels and descriptions
 * 
 * Validates: Requirements 5.4, 9.2, 9.4
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      description,
      children,
      required = false,
      helpText,
      error,
      rules,
      name,
      control,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const { field, fieldState } = useController({
      control,
      name,
      defaultValue,
      rules,
      ...rest,
    })

    const errorMessage = fieldState.error?.message || error
    const fieldId = `field-${name}`
    const errorId = `${fieldId}-error`
    const descriptionId = `${fieldId}-description`
    const helpTextId = `${fieldId}-help`

    return (
      <div ref={ref} className="space-y-1.5">
        {label && (
          <label
            htmlFor={fieldId}
            className="block text-label-md font-medium text-gray-900 dark:text-gray-50"
          >
            {label}
            {required && (
              <span
                className="ml-1 text-error-500"
                aria-label="required field"
              >
                *
              </span>
            )}
          </label>
        )}

        {description && (
          <p
            id={descriptionId}
            className="text-body-sm text-gray-600 dark:text-gray-400"
          >
            {description}
          </p>
        )}

        {children({
          field: {
            ...field,
            'aria-label': label,
            'aria-describedby': [
              description ? descriptionId : null,
              helpText ? helpTextId : null,
              errorMessage ? errorId : null,
            ]
              .filter(Boolean)
              .join(' '),
            'aria-invalid': !!errorMessage,
            'aria-required': required,
            id: fieldId,
          },
          fieldState,
          formState: field,
        })}

        {helpText && !errorMessage && (
          <p
            id={helpTextId}
            className="text-body-sm text-gray-500 dark:text-gray-500"
          >
            {helpText}
          </p>
        )}

        {errorMessage && (
          <p
            id={errorId}
            className="text-body-sm font-medium text-error-500 dark:text-error-400"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
