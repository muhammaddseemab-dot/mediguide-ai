'use client'

import { useCallback, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
}

interface UseToastOptions {
  defaultDuration?: number
}

/**
 * Custom hook for managing toast notifications
 * 
 * Validates: Requirements 5.7
 */
export function useToast(options?: UseToastOptions) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const defaultDuration = options?.defaultDuration ?? 5000

  const addToast = useCallback(
    (
      toast: Omit<Toast, 'id'> & { duration?: number }
    ) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newToast: Toast = {
        ...toast,
        id,
        duration: toast.duration ?? defaultDuration,
      }

      setToasts((prev) => [...prev, newToast])

      // Auto-remove toast after duration
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, newToast.duration)
      }

      return id
    },
    [defaultDuration]
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    (params: {
      title: string
      description?: string
      type?: ToastType
      duration?: number
    }) => {
      return addToast({
        title: params.title,
        description: params.description,
        type: params.type ?? 'info',
        duration: params.duration,
      })
    },
    [addToast]
  )

  const success = useCallback(
    (title: string, description?: string, duration?: number) => {
      return addToast({ title, description, type: 'success', duration })
    },
    [addToast]
  )

  const error = useCallback(
    (title: string, description?: string, duration?: number) => {
      return addToast({ title, description, type: 'error', duration })
    },
    [addToast]
  )

  const info = useCallback(
    (title: string, description?: string, duration?: number) => {
      return addToast({ title, description, type: 'info', duration })
    },
    [addToast]
  )

  const warning = useCallback(
    (title: string, description?: string, duration?: number) => {
      return addToast({ title, description, type: 'warning', duration })
    },
    [addToast]
  )

  return {
    toasts,
    toast,
    success,
    error,
    info,
    warning,
    removeToast,
  }
}
