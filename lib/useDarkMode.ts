'use client'

import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load dark mode preference from localStorage on mount
    setMounted(true)
    const savedDarkMode = localStorage.getItem('darkMode')
    
    if (savedDarkMode !== null) {
      const isDarkMode = savedDarkMode === 'true'
      setIsDark(isDarkMode)
      applyDarkMode(isDarkMode)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
      applyDarkMode(prefersDark)
      localStorage.setItem('darkMode', prefersDark.toString())
    }
  }, [])

  const toggleDarkMode = (value?: boolean) => {
    const newValue = value !== undefined ? value : !isDark
    setIsDark(newValue)
    applyDarkMode(newValue)
    localStorage.setItem('darkMode', newValue.toString())
  }

  const applyDarkMode = (isDarkMode: boolean) => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  return {
    isDark,
    toggleDarkMode,
    mounted
  }
}
