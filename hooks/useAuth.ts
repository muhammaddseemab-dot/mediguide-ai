/**
 * useAuth Hook
 * 
 * Custom hook for managing authentication state and auth-related operations
 * Integrates with auth store and provides auth functionality
 */

'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import type { UserProfile } from '@/types'

interface UseAuthOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

/**
 * Custom hook for authentication management
 */
export function useAuth(options?: UseAuthOptions) {
  const { user, isLoading, error, setUser, setLoading, setError, logout } =
    useAuthStore()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    setIsAuthenticated(!!user)
  }, [user])

  /**
   * Fetch current user profile
   */
  const fetchUser = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/auth/me')
      if (!response.ok) throw new Error('Failed to fetch user')

      const userData = await response.json()
      setUser(userData)
      options?.onSuccess?.()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Authentication error'
      setError(errorMessage)
      options?.onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [setUser, setLoading, setError, options])

  /**
   * Login user
   */
  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const userData = await response.json()
        setUser(userData)
        options?.onSuccess?.()
        return userData
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Login failed'
        setError(errorMessage)
        options?.onError?.(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setUser, setLoading, setError, options]
  )

  /**
   * Register user
   */
  const register = useCallback(
    async (
      email: string,
      password: string,
      name: string
    ): Promise<UserProfile | null> => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        })

        if (!response.ok) {
          throw new Error('Registration failed')
        }

        const userData = await response.json()
        setUser(userData)
        options?.onSuccess?.()
        return userData
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Registration failed'
        setError(errorMessage)
        options?.onError?.(errorMessage)
        return null
      } finally {
        setLoading(false)
      }
    },
    [setUser, setLoading, setError, options]
  )

  /**
   * Update user profile
   */
  const updateProfile = useCallback(
    async (profileData: Partial<UserProfile>) => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
        })

        if (!response.ok) {
          throw new Error('Profile update failed')
        }

        const updatedUser = await response.json()
        setUser(updatedUser)
        options?.onSuccess?.()
        return updatedUser
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Profile update failed'
        setError(errorMessage)
        options?.onError?.(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setUser, setLoading, setError, options]
  )

  /**
   * Logout user
   */
  const handleLogout = useCallback(async () => {
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      logout()
      options?.onSuccess?.()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Logout failed'
      setError(errorMessage)
      options?.onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [logout, setLoading, setError, options])

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback(
    (role: string | string[]) => {
      if (!user) return false
      const roles = Array.isArray(role) ? role : [role]
      return roles.includes(user.role)
    },
    [user]
  )

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: handleLogout,
    updateProfile,
    fetchUser,
    hasRole,
  }
}
