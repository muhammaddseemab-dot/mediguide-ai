'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockNotificationPreferences, NotificationPreference } from '@/lib/mockData'
import { useLanguage } from '@/lib/LanguageContext'

export default function NotificationPreferencesPage() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(mockNotificationPreferences)
  const [saved, setSaved] = useState(false)
  const { t } = useLanguage()

  const handleToggle = (id: string) => {
    setPreferences(prefs =>
      prefs.map(pref =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    )
    setSaved(false)
  }

  const handleFrequencyChange = (id: string, frequency: 'immediately' | 'daily' | 'weekly') => {
    setPreferences(prefs =>
      prefs.map(pref =>
        pref.id === id ? { ...pref, frequency } : pref
      )
    )
    setSaved(false)
  }

  const handleSave = () => {
    // Mock save - in real app would call API
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const groupedPreferences = {
    email: preferences.filter(p => p.type === 'email'),
    sms: preferences.filter(p => p.type === 'sms'),
    push: preferences.filter(p => p.type === 'push')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('notificationPreferences')}
          </h1>
          <p className="text-gray-300 text-lg">
            {t('manageNotifications')}
          </p>
        </div>

        {/* Email Notifications */}
        <div className="mb-8 card-glass">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-400/20">
            <span className="text-3xl">📧</span>
            <h2 className="text-2xl font-bold text-white">Email Notifications</h2>
          </div>

          <div className="space-y-4">
            {groupedPreferences.email.map((pref) => (
              <div key={pref.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-white mb-1">{pref.category}</p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref.enabled}
                        onChange={() => handleToggle(pref.id)}
                        className="w-4 h-4 rounded accent-blue-500"
                      />
                      <span className="text-sm text-gray-300">{t('enabled')}</span>
                    </label>

                    {pref.enabled && (
                      <select
                        value={pref.frequency}
                        onChange={(e) => handleFrequencyChange(pref.id, e.target.value as any)}
                        className="input-base text-sm py-1"
                      >
                        <option value="immediately">{t('immediately')}</option>
                        <option value="daily">{t('daily')}</option>
                        <option value="weekly">{t('weekly')}</option>
                      </select>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(pref.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    pref.enabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      pref.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="mb-8 card-glass">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-400/20">
            <span className="text-3xl">💬</span>
            <h2 className="text-2xl font-bold text-white">SMS Notifications</h2>
          </div>

          <div className="space-y-4">
            {groupedPreferences.sms.map((pref) => (
              <div key={pref.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-white mb-1">{pref.category}</p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref.enabled}
                        onChange={() => handleToggle(pref.id)}
                        className="w-4 h-4 rounded accent-blue-500"
                      />
                      <span className="text-sm text-gray-300">{t('enabled')}</span>
                    </label>

                    {pref.enabled && (
                      <select
                        value={pref.frequency}
                        onChange={(e) => handleFrequencyChange(pref.id, e.target.value as any)}
                        className="input-base text-sm py-1"
                      >
                        <option value="immediately">{t('immediately')}</option>
                        <option value="daily">{t('daily')}</option>
                        <option value="weekly">{t('weekly')}</option>
                      </select>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(pref.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    pref.enabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      pref.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="mb-8 card-glass">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-400/20">
            <span className="text-3xl">🔔</span>
            <h2 className="text-2xl font-bold text-white">Push Notifications</h2>
          </div>

          <div className="space-y-4">
            {groupedPreferences.push.map((pref) => (
              <div key={pref.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-white mb-1">{pref.category}</p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref.enabled}
                        onChange={() => handleToggle(pref.id)}
                        className="w-4 h-4 rounded accent-blue-500"
                      />
                      <span className="text-sm text-gray-300">{t('enabled')}</span>
                    </label>

                    {pref.enabled && (
                      <select
                        value={pref.frequency}
                        onChange={(e) => handleFrequencyChange(pref.id, e.target.value as any)}
                        className="input-base text-sm py-1"
                      >
                        <option value="immediately">{t('immediately')}</option>
                        <option value="daily">{t('daily')}</option>
                        <option value="weekly">{t('weekly')}</option>
                      </select>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(pref.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    pref.enabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      pref.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button and Success Message */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="btn btn-lg btn-primary flex-1"
          >
            {t('save')}
          </button>
        </div>

        {saved && (
          <div className="mt-4 alert alert-success animate-pulse">
            ✅ {t('saved')}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 card-glass">
          <h3 className="text-xl font-bold text-white mb-4">📌 About Notifications</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Toggle notifications on/off for each channel independently</li>
            <li>Choose frequency: Immediately for urgent alerts, Daily or Weekly for regular updates</li>
            <li>Email notifications keep you updated through your inbox</li>
            <li>SMS notifications are sent to your registered phone number</li>
            <li>Push notifications appear on your browser/device when you have the app installed</li>
            <li>Your preferences are saved automatically to your account</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
