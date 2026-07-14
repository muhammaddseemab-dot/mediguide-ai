import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base transition-colors duration-200',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-gray-400',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:placeholder:text-gray-500',
          'dark:focus:border-primary-400 dark:focus:ring-primary-400/20',
          error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
          success && 'border-success-500 focus:border-success-500 focus:ring-success-500/20',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }