'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockEmergencyHotlines } from '@/lib/mockData'
import { useLanguage } from '@/lib/LanguageContext'

export default function EmergencyHotlinesPage() {
  const [selectedCountryId, setSelectedCountryId] = useState(mockEmergencyHotlines[0]?.id)
  const { t } = useLanguage()

  const selectedHotline = mockEmergencyHotlines.find(h => h.id === selectedCountryId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('emergencyHotlines')}
          </h1>
          <p className="text-gray-300 text-lg">
            {t('selectCountry')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Country Selection */}
          <div className="lg:col-span-1">
            <div className="card-glass sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Countries</h2>
              <div className="space-y-2">
                {mockEmergencyHotlines.map((hotline) => (
                  <button
                    key={hotline.id}
                    onClick={() => setSelectedCountryId(hotline.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedCountryId === hotline.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{hotline.countryCode}</span>
                      <div>
                        <p className="font-semibold">{hotline.country}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hotline Details */}
          <div className="lg:col-span-2">
            {selectedHotline && (
              <div className="space-y-6">
                {/* Main Emergency Number Card */}
                <div className="card-emergency">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {selectedHotline.country}
                      </h2>
                      <p className="text-gray-300">{selectedHotline.description}</p>
                    </div>
                    <div className="text-5xl">🚨</div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-red-400/30">
                    <p className="text-sm text-red-200 mb-3 font-semibold">{t('emergencyNumber')}</p>
                    <div className="flex items-center justify-between bg-red-900/50 rounded-lg p-4">
                      <span className="text-3xl font-bold text-red-300">
                        {selectedHotline.emergencyNumber}
                      </span>
                      <a
                        href={`tel:${selectedHotline.emergencyNumber}`}
                        className="btn btn-lg btn-primary hover:scale-105 transform transition-transform"
                      >
                        {t('call')} Now
                      </a>
                    </div>
                  </div>
                </div>

                {/* Other Numbers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ambulance */}
                  {selectedHotline.ambulanceNumber && (
                    <div className="card">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-white text-lg">{t('ambulance')}</h3>
                        <span className="text-3xl">🚑</span>
                      </div>
                      <p className="text-2xl font-bold text-primary-500 mb-4">
                        {selectedHotline.ambulanceNumber}
                      </p>
                      <a
                        href={`tel:${selectedHotline.ambulanceNumber}`}
                        className="btn btn-md btn-primary w-full"
                      >
                        {t('call')}
                      </a>
                    </div>
                  )}

                  {/* Poison Control */}
                  {selectedHotline.poisonControlNumber && (
                    <div className="card">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-white text-lg">{t('poisonControl')}</h3>
                        <span className="text-3xl">☠️</span>
                      </div>
                      <p className="text-2xl font-bold text-yellow-500 mb-4">
                        {selectedHotline.poisonControlNumber}
                      </p>
                      <a
                        href={`tel:${selectedHotline.poisonControlNumber}`}
                        className="btn btn-md btn-warning w-full"
                      >
                        {t('call')}
                      </a>
                    </div>
                  )}

                  {/* Mental Health Crisis */}
                  {selectedHotline.mentalHealthCrisis && (
                    <div className="card">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-white text-lg">{t('mentalHealthCrisis')}</h3>
                        <span className="text-3xl">🧠</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-400 mb-4">
                        {selectedHotline.mentalHealthCrisis}
                      </p>
                      <a
                        href={`tel:${selectedHotline.mentalHealthCrisis}`}
                        className="btn btn-md bg-purple-600 text-white hover:bg-purple-700 w-full"
                      >
                        {t('call')}
                      </a>
                    </div>
                  )}

                  {/* Operating Hours */}
                  <div className="card">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-white text-lg">{t('operatingHours')}</h3>
                      <span className="text-3xl">⏰</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400 mb-4">
                      {selectedHotline.operatingHours}
                    </p>
                    <div className="alert alert-success">
                      Always available for emergencies
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="alert alert-info rounded-xl border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-200 mb-2">Important Information</p>
                  <ul className="list-disc list-inside text-blue-100 space-y-1">
                    <li>Call immediately if experiencing life-threatening symptoms</li>
                    <li>Keep numbers saved for quick access</li>
                    <li>Provide clear information about your location and condition</li>
                    <li>Stay calm and follow dispatcher instructions</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
