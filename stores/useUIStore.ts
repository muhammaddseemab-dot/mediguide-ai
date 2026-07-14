'use client'

import { create } from 'zustand'
import type { Language, Theme } from '@/types'

interface UIState {
  language: Language
  theme: Theme
  sidebarOpen: boolean
  setLanguage: (language: Language) => void
  setTheme: (theme: Theme) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  language: 'en',
  theme: 'light',
  sidebarOpen: false,
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
