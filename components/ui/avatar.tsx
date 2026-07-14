import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

function Avatar({ className, size = 'md', ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      className={cn('aspect-square h-full w-full object-cover', className)}
      alt={alt}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }