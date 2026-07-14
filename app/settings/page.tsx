'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage, LanguageCode } from '@/lib/LanguageContext'
import { useDarkMode } from '@/lib/useDarkMode'

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const { isDark, toggleDarkMode, mounted } = useDarkMode()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center text-white">Loading settings...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Settings
            </h1>
            <p className="text-gray-300 text-lg">
              Manage your preferences and account settings
            </p>
          </div>

          {/* Language Settings */}
          <div className="card-glass mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">🌐 Language Preferences</h2>
            <p className="text-gray-300 mb-4">Choose your preferred language for the application</p>
            
            <div className="space-y-3">
              {(['en', 'hi', 'mr'] as LanguageCode[]).map((lang) => (
                <label key={lang} className="flex items-center p-4 rounded-lg bg-slate-700/50 cursor-pointer hover:bg-slate-700 transition-colors">
                  <input
                    type="radio"
                    name="language"
                    value={lang}
                    checked={language === lang}
                    onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-white">
                      {lang === 'en' && 'English'}
                      {lang === 'hi' && 'हिंदी (Hindi)'}
                      {lang === 'mr' && 'मराठी (Marathi)'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {lang === 'en' && 'English language for international users'}
                      {lang === 'hi' && 'हिंदी भाषा भारतीय उपयोगकर्ताओं के लिए'}
                      {lang === 'mr' && 'मराठी भाषा महाराष्ट्र के उपयोगकर्ताओं के लिए'}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-blue-300 text-sm">
                ℹ️ Language preference is saved automatically and will be applied across all pages
              </p>
            </div>
          </div>

          {/* Dark Mode Settings */}
          <div className="card-glass mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">🌙 Theme Settings</h2>
            <p className="text-gray-300 mb-4">Choose between light and dark theme</p>
            
            <div className="space-y-3">
              <label className="flex items-center p-4 rounded-lg bg-slate-700/50 cursor-pointer hover:bg-slate-700 transition-colors">
                <input
                  type="radio"
                  name="theme"
                  checked={!isDark}
                  onChange={() => toggleDarkMode(false)}
                  className="w-4 h-4 accent-blue-500"
                />
                <div className="ml-4">
                  <p className="font-semibold text-white">Light Theme ☀️</p>
                  <p className="text-sm text-gray-400">Bright and easy on the eyes during daytime</p>
                </div>
              </label>

              <label className="flex items-center p-4 rounded-lg bg-slate-700/50 cursor-pointer hover:bg-slate-700 transition-colors">
                <input
                  type="radio"
                  name="theme"
                  checked={isDark}
                  onChange={() => toggleDarkMode(true)}
                  className="w-4 h-4 accent-blue-500"
                />
                <div className="ml-4">
                  <p className="font-semibold text-white">Dark Theme 🌙</p>
                  <p className="text-sm text-gray-400">Easy on the eyes for night browsing</p>
                </div>
              </label>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-blue-300 text-sm">
                ℹ️ Theme preference is saved to your browser and will persist across sessions
              </p>
            </div>
          </div>

          {/* Notification Settings Shortcut */}
          <div className="card-glass mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">🔔 Notifications</h2>
            <p className="text-gray-300 mb-4">Manage how you receive notifications from MediGuide AI</p>
            
            <Link href="/notification-preferences" className="inline-block btn btn-primary">
              Manage Notification Preferences
            </Link>
          </div>

          {/* Account Information */}
          <div className="card-glass mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">👤 Account Information</h2>
            <p className="text-gray-300 mb-4">Your account details (mock data)</p>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-700/50">
                <p className="text-gray-400 text-sm mb-1">Email Address</p>
                <p className="text-white font-semibold">user@mediguide.com</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-700/50">
                <p className="text-gray-400 text-sm mb-1">Account Status</p>
                <p className="text-green-400 font-semibold">✓ Active</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-700/50">
                <p className="text-gray-400 text-sm mb-1">Member Since</p>
                <p className="text-white font-semibold">January 15, 2024</p>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="card-glass mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">🔐 Privacy & Security</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Your data is encrypted and securely stored</li>
              <li>We never share your personal information with third parties</li>
              <li>You can review our Privacy Policy for more details</li>
              <li>Two-factor authentication is recommended for account security</li>
            </ul>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="btn btn-lg btn-primary w-full mb-4"
          >
            Save Settings
          </button>

          {saved && (
            <div className="alert alert-success animate-pulse">
              ✅ Settings saved successfully!
            </div>
          )}

          {/* Danger Zone */}
          <div className="card-glass border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ Danger Zone</h2>
            <p className="text-gray-300 mb-4">These actions cannot be undone</p>
            <div className="space-y-2">
              <button className="w-full btn bg-red-600 text-white hover:bg-red-700 rounded-lg">
                Clear All Data
              </button>
              <button className="w-full btn bg-gray-600 text-white hover:bg-gray-700 rounded-lg">
                Logout
              </button>
              <button className="w-full btn bg-red-900 text-white hover:bg-red-950 rounded-lg">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
