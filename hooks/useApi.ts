/**
 * useApi Hook
 * 
 * Custom hook for making API calls with error handling and loading states
 * Provides consistent error handling and response management
 */

'use client'

import { useCallback, useState } from 'react'
import type { ApiResponse } from '@/types'

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
  timeout?: number
}

/**
 * Custom hook for API operations
 */
export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Make API request
   */
  const request = useCallback(
    async (
      url: string,
      options?: RequestInit & { timeout?: number }
    ): Promise<T | null> => {
      setLoading(true)
      setError(null)

      try {
        const controller = new AbortController()
        const timeoutMs = options?.timeout || 30000

        const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`)
        }

        const responseData: ApiResponse<T> = await response.json()

        if (!responseData.success) {
          throw new Error(
            responseData.error?.message || 'API request failed'
          )
        }

        setData(responseData.data ?? null)
        return responseData.data ?? null
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred'
        setError(errorMessage)
        setData(null)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * GET request
   */
  const get = useCallback(
    async (url: string, options?: UseApiOptions<T>) => {
      try {
        const result = await request(url)
        options?.onSuccess?.(result as T)
        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'GET request failed'
        options?.onError?.(errorMessage)
      }
    },
    [request]
  )

  /**
   * POST request
   */
  const post = useCallback(
    async (
      url: string,
      body?: any,
      options?: UseApiOptions<T>
    ) => {
      try {
        const result = await request(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body ? JSON.stringify(body) : undefined,
          timeout: options?.timeout,
        })
        options?.onSuccess?.(result as T)
        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'POST request failed'
        options?.onError?.(errorMessage)
      }
    },
    [request]
  )

  /**
   * PUT request
   */
  const put = useCallback(
    async (
      url: string,
      body?: any,
      options?: UseApiOptions<T>
    ) => {
      try {
        const result = await request(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: body ? JSON.stringify(body) : undefined,
          timeout: options?.timeout,
        })
        options?.onSuccess?.(result as T)
        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'PUT request failed'
        options?.onError?.(errorMessage)
      }
    },
    [request]
  )

  /**
   * DELETE request
   */
  const delete_ = useCallback(
    async (url: string, options?: UseApiOptions<T>) => {
      try {
        const result = await request(url, {
          method: 'DELETE',
          timeout: options?.timeout,
        })
        options?.onSuccess?.(result as T)
        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'DELETE request failed'
        options?.onError?.(errorMessage)
      }
    },
    [request]
  )

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    delete: delete_,
    clearError,
    reset,
  }
}

/**
 * Hook for making health-related API calls
 */
export function useHealthApi() {
  const api = useApi()

  /**
   * Analyze symptoms
   */
  const analyzeSymptoms = useCallback(
    async (symptoms: string[], options?: UseApiOptions<any>) => {
      return api.post('/api/symptoms/analyze', { symptoms }, options)
    },
    [api]
  )

  /**
   * Check for emergency symptoms
   */
  const checkEmergency = useCallback(
    async (symptoms: string[], options?: UseApiOptions<any>) => {
      return api.post('/api/symptoms/emergency', { symptoms }, {
        ...options,
        timeout: 2000,
      })
    },
    [api]
  )

  /**
   * Get consultation history
   */
  const getConsultations = useCallback(
    async (page = 1, limit = 10, options?: UseApiOptions<any>) => {
      return api.get(
        `/api/consultations?page=${page}&limit=${limit}`,
        options
      )
    },
    [api]
  )

  return {
    ...api,
    analyzeSymptoms,
    checkEmergency,
    getConsultations,
  }
}
