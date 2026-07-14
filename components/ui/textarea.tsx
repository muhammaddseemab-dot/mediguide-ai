import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base transition-colors duration-200',
          'placeholder:text-gray-400',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:placeholder:text-gray-500',
          'dark:focus:border-primary-400 dark:focus:ring-primary-400/20',
          error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }