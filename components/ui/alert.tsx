import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'border-primary-200 bg-primary-50 text-primary-800 dark:border-primary-800 dark:bg-primary-900/20 dark:text-primary-200',
        success:
          'border-success-200 bg-success-50 text-success-800 dark:border-success-800 dark:bg-success-900/20 dark:text-success-200',
        warning:
          'border-warning-200 bg-warning-50 text-warning-800 dark:border-warning-800 dark:bg-warning-900/20 dark:text-warning-200',
        destructive:
          'border-emergency-200 bg-emergency-50 text-emergency-800 dark:border-emergency-800 dark:bg-emergency-900/20 dark:text-emergency-200 shadow-emergency-glow',
        info: 'border-primary-200 bg-primary-50 text-primary-800 dark:border-primary-800 dark:bg-primary-900/20 dark:text-primary-200',
        emergency:
          'border-emergency-500 bg-emergency-50 text-emergency-900 dark:border-emergency-600 dark:bg-emergency-900/30 dark:text-emergency-200 shadow-emergency-glow',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  const IconMap = {
    default: Info,
    success: CheckCircle2,
    warning: AlertCircle,
    destructive: XCircle,
    info: Info,
    emergency: XCircle,
  }
  
  const Icon = IconMap[variant || 'default']

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="h-5 w-5 mt-0.5" />
      <div className="ml-3 text-sm">{props.children}</div>
    </div>
  )
})
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }