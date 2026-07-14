'use client'

import * as React from 'react'
import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

// Import types from react-hook-form
import type { UseFormRegisterReturn, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

// Context for form state
const FormFieldContext = React.createContext<{
  name: string
}>({
  name: '',
})

const FormItemContext = React.createContext<{
  id: string
}>({
  id: '',
})

interface FormFieldProps {
  name: string
  children: React.ReactNode
}

const FormField = ({ name, children }: FormFieldProps) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  )
}

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

// Custom hook to get form field state
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)

  if (!fieldContext.name) {
    throw new Error('useFormField should be used within a FormField')
  }

  const fieldId = itemContext.id
  const { name } = fieldContext

  const formItemId = `${fieldId}-input`
  const formDescriptionId = `${fieldId}-description`
  const formMessageId = `${fieldId}-message`

  return {
    id: formItemId,
    name,
    formItemId,
    formDescriptionId,
    formMessageId,
  }
}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(
        error && 'text-emergency-600 dark:text-emergency-400',
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    registerProps?: UseFormRegisterReturn
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  }
>(({ className, registerProps, error, ...props }, ref) => {
  const { formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <input
      ref={ref}
      id={formItemId}
      className={cn(
        'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base transition-colors duration-200',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-gray-400',
        'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:placeholder:text-gray-500',
        'dark:focus:border-primary-400 dark:focus:ring-primary-400/20',
        error && 'border-emergency-500 focus:border-emergency-500 focus:ring-emergency-500/20',
        className
      )}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...registerProps}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        'text-sm font-medium text-emergency-600 dark:text-emergency-400',
        className
      )}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

// Simple Form wrapper
const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => {
  return (
    <form
      ref={ref}
      className={cn('space-y-6', className)}
      {...props}
    />
  )
})
Form.displayName = 'Form'

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}