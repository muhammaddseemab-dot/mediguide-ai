'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockHospitals } from '@/lib/mockData'
import { useLanguage } from '@/lib/LanguageContext'

export default function HospitalFinderPage() {
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance')
  const { t } = useLanguage()

  const sortedHospitals = [...mockHospitals].sort((a, b) => {
    if (sortBy === 'distance') {
      return a.distance - b.distance
    } else {
      return b.rating - a.rating
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('hospitalFinder')}
          </h1>
          <p className="text-gray-300 text-lg">
            {t('findHospitals')}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-3">
            <button
              onClick={() => setSortBy('distance')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                sortBy === 'distance'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              📍 Sort by Distance
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                sortBy === 'rating'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              ⭐ Sort by Rating
            </button>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedHospitals.map((hospital) => (
            <div key={hospital.id} className="card-glass hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
              {/* Header */}
              <div className="mb-4 pb-4 border-b border-blue-400/20">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {hospital.name}
                  </h3>
                  <span className="text-3xl">🏥</span>
                </div>
                <p className="text-sm text-gray-400">{hospital.city}, {hospital.state}</p>
              </div>

              {/* Key Info */}
              <div className="space-y-3 mb-4">
                {/* Distance */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t('distance')}:</span>
                  <span className="text-blue-400 font-semibold">{hospital.distance} {t('km')}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t('rating')}:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 font-semibold">{hospital.rating}</span>
                    <span>⭐</span>
                  </div>
                </div>

                {/* Beds */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t('bedsAvailable')}:</span>
                  <span className="text-green-400 font-semibold">{hospital.bedsAvailable}</span>
                </div>

                {/* Emergency Services */}
                {hospital.emergencyServices && (
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-red-300 text-sm">{t('emergencyServices')}</span>
                  </div>
                )}
              </div>

              {/* Specializations */}
              <div className="mb-4 pb-4 border-t border-blue-400/20 pt-4">
                <p className="text-sm font-semibold text-gray-300 mb-2">{t('specializations')}:</p>
                <div className="flex flex-wrap gap-2">
                  {hospital.specializations.map((spec) => (
                    <span key={spec} className="badge badge-primary text-xs">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 pb-4 border-t border-blue-400/20 pt-4">
                <a
                  href={`tel:${hospital.phone}`}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>📞</span>
                  <span className="text-sm">{hospital.phone}</span>
                </a>
                <a
                  href={`mailto:${hospital.email}`}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>📧</span>
                  <span className="text-sm">{hospital.email}</span>
                </a>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a
                  href={`tel:${hospital.phone}`}
                  className="flex-1 btn btn-md btn-primary text-center"
                >
                  {t('call')}
                </a>
                <a
                  href={`https://maps.google.com/?q=${hospital.address}+${hospital.city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn btn-md bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  Directions
                </a>
              </div>

              {/* Full Address */}
              <div className="mt-4 pt-4 border-t border-blue-400/20">
                <p className="text-xs text-gray-400">
                  {hospital.address}, {hospital.postalCode}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 card-glass max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">💡 Hospital Selection Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Choose hospitals nearest to you for faster emergency response</li>
            <li>Check ratings and specializations based on your medical needs</li>
            <li>Emergency services are available 24/7 at all listed hospitals</li>
            <li>Call ahead to confirm bed availability and current services</li>
            <li>Save important hospital numbers in your phone contacts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
