'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile } from '@/types'

interface AuthState {
  user: UserProfile | null
  isLoading: boolean
  error: string | null
  setUser: (user: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      logout: () =>
        set({
          user: null,
          error: null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
