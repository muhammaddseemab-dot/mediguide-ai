/**
 * useLanguage Hook
 * 
 * Custom hook for managing language selection and translations
 * Integrates with UI store and provides language switching functionality
 */

'use client'

import { useEffect, useState } from 'react'
import { useUIStore } from '@/stores/useUIStore'
import type { Language } from '@/types'

/**
 * Custom hook for language management
 * Handles language switching, persistence, and detection
 */
export function useLanguage() {
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useUIStore()

  useEffect(() => {
    setMounted(true)

    // Detect browser language on first mount
    const savedLanguage = localStorage.getItem('language') as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      const browserLanguage = detectBrowserLanguage()
      setLanguage(browserLanguage)
      localStorage.setItem('language', browserLanguage)
    }
  }, [setLanguage])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
      // Update document lang attribute
      document.documentElement.lang = language
    }
  }, [language, mounted])

  /**
   * Detect browser's preferred language
   * Falls back to English if unsupported
   */
  const detectBrowserLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en'

    const browserLang = navigator.language?.split('-')[0].toLowerCase()
    const supportedLanguages: Record<string, Language> = {
      en: 'en',
      hi: 'hi',
      mr: 'mr',
    }

    return (supportedLanguages[browserLang] as Language) || 'en'
  }

  /**
   * Change the language
   */
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  return {
    language,
    changeLanguage,
    mounted,
    isSupported: (lang: string): lang is Language => {
      return ['en', 'hi', 'mr'].includes(lang)
    },
  }
}

/**
 * Hook for getting translated text (placeholder for i18n integration)
 */
export function useTranslation() {
  const { language } = useLanguage()

  /**
   * Get translated text
   * In production, this would integrate with next-intl or similar
   */
  const t = (key: string): string => {
    // This is a placeholder implementation
    // In real app, integrate with translation service
    return key
  }

  return {
    t,
    language,
  }
}
