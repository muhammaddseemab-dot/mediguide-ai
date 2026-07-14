'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'

interface CurrentUser {
  email: string
  name: string
  role: string
  signedInAt: string
}

export const Header: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    // Mark component as mounted
    setMounted(true)

    // Check for user session
    const user = localStorage.getItem('currentUser')
    if (user) {
      try {
        setCurrentUser(JSON.parse(user))
      } catch (error) {
        console.error('Error parsing user:', error)
      }
    }

    // Set up event listener for storage changes
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('currentUser')
      if (updatedUser) {
        try {
          setCurrentUser(JSON.parse(updatedUser))
        } catch (error) {
          console.error('Error parsing user:', error)
        }
      } else {
        setCurrentUser(null)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Close user menu when pathname changes
  useEffect(() => {
    setShowUserMenu(false)
    setShowLanguageMenu(false)
  }, [pathname])

  const handleLogout = () => {
    try {
      localStorage.removeItem('currentUser')
      localStorage.removeItem('rememberMe')
      setCurrentUser(null)
      setShowUserMenu(false)
      router.push('/')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
            MediGuide AI
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <span className="text-sm text-slate-700 font-medium">Home</span>
            <span className="text-sm text-slate-700 font-medium">Symptom Checker</span>
            <span className="text-sm text-slate-700 font-medium">Marketplace</span>
            <span className="text-sm text-slate-700 font-medium">About</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-blue-700 font-medium">Sign In</span>
            <span className="hidden sm:inline text-sm text-white font-medium">Sign Up</span>
            <button className="text-slate-900 md:hidden font-medium">Menu</button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 hover:text-blue-700 transition-colors">
          MediGuide AI
        </Link>
        
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-slate-700 hover:text-blue-700 transition-colors font-medium">Home</Link>
          <Link href="/symptom-checker" className="text-sm text-slate-700 hover:text-blue-700 transition-colors font-medium">Symptom Checker</Link>
          <Link href="/marketplace" className="text-sm text-slate-700 hover:text-blue-700 transition-colors font-medium">Marketplace</Link>
          <Link href="/about" className="text-sm text-slate-700 hover:text-blue-700 transition-colors font-medium">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
              title="Select Language"
            >
              <span>🌐</span>
              <span className="hidden sm:inline uppercase font-bold">{language}</span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50">
                <button
                  onClick={() => {
                    setLanguage('en')
                    setShowLanguageMenu(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    language === 'en'
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => {
                    setLanguage('hi')
                    setShowLanguageMenu(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    language === 'hi'
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🇮🇳 हिन्दी (Hindi)
                </button>
                <button
                  onClick={() => {
                    setLanguage('mr')
                    setShowLanguageMenu(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    language === 'mr'
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🇮🇳 मराठी (Marathi)
                </button>
              </div>
            )}
          </div>

          {/* User Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {currentUser.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">{currentUser.name?.split(' ')[0] || 'User'}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{currentUser.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{currentUser.email || ''}</p>
                    <p className="text-xs text-blue-600 font-semibold mt-1">Role: {currentUser.role || 'user'}</p>
                  </div>
                  <Link
                    href="/(dashboard)/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Settings
                  </Link>
                  {currentUser.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="hidden rounded-lg px-4 py-2 text-blue-700 hover:bg-blue-50 font-medium transition-all duration-300 sm:inline"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="hidden rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 font-medium transition-all duration-300 transform hover:scale-105 sm:inline"
              >
                Sign Up
              </Link>
            </>
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900 md:hidden font-medium">
            Menu
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-blue-200 bg-slate-50 p-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link href="/" className="text-sm text-slate-700 hover:text-blue-700 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/symptom-checker" className="text-sm text-slate-700 hover:text-blue-700 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Symptom Checker</Link>
            <Link href="/marketplace" className="text-sm text-slate-700 hover:text-blue-700 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</Link>
            <Link href="/about" className="text-sm text-slate-700 hover:text-blue-700 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            {currentUser && (
              <>
                <hr className="my-2" />
                <Link href="/(dashboard)/profile" className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                <Link href="/settings" className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
                {currentUser.role === 'admin' && (
                  <Link href="/admin" className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
                )}
                <button onClick={handleLogout} className="text-left text-sm text-red-600 hover:text-red-700 transition-colors font-medium">Logout</button>
              </>
            )}
            {!currentUser && (
              <>
                <hr className="my-2" />
                <Link href="/signin" className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
