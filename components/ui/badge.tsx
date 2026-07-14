import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
        secondary:
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        success:
          'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300',
        warning:
          'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300',
        destructive:
          'bg-emergency-100 text-emergency-700 dark:bg-emergency-900/30 dark:text-emergency-300',
        outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
        info: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
        emergency:
          'bg-emergency-100 text-emergency-700 dark:bg-emergency-900/30 dark:text-emergency-300 animate-pulse-emergency',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }