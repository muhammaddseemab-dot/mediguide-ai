'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: 'class' | 'data-theme'
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = false,
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get theme from localStorage or system preference
    const storedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    let resolvedTheme: Theme = defaultTheme

    if (storedTheme) {
      resolvedTheme = storedTheme
    } else if (enableSystem && defaultTheme === 'system') {
      resolvedTheme = prefersDark ? 'dark' : 'light'
    }

    setThemeState(resolvedTheme)
    applyTheme(resolvedTheme, attribute)
  }, [])

  const setTheme = (newTheme: Theme) => {
    if (disableTransitionOnChange) {
      document.documentElement.style.transition = 'none'
    }

    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme, attribute)

    if (disableTransitionOnChange) {
      // Force reflow to re-enable transitions
      void document.documentElement.offsetHeight
      document.documentElement.style.transition = ''
    }
  }

  const applyTheme = (currentTheme: Theme, attr: 'class' | 'data-theme') => {
    const root = document.documentElement
    const isDark =
      currentTheme === 'dark' ||
      (currentTheme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (attr === 'class') {
      if (isDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    } else {
      root.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
