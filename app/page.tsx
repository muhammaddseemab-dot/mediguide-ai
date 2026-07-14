'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-indigo-100/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)`
        }}></div>
        
        <div className="container relative mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                  Advanced Healthcare Platform
                </span>
              </div>
              
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                Welcome to
                <span className="block text-blue-700">
                  MediGuide AI
                </span>
              </h1>
              
              <p className="mb-8 text-lg md:text-xl text-slate-600 leading-relaxed">
                {t('findHospitals') || 'Intelligent healthcare solutions powered by advanced artificial intelligence. Providing instant health insights, emergency detection, and personalized medicine recommendations for optimal patient care.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/symptom-checker" 
                  className="group relative px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="relative z-10">Get Health Assessment</span>
                  <div className="absolute inset-0 rounded-lg bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
                <Link 
                  href="/about" 
                  className="px-8 py-4 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Content - Professional Healthcare Information */}
            <div className="relative hidden lg:block">
              <div className="relative z-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl border border-blue-100">
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-700">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Intelligent Diagnosis</h3>
                    <p className="text-slate-600">AI-powered symptom analysis with medical accuracy</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-indigo-600">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">24/7 Emergency Support</h3>
                    <p className="text-slate-600">Immediate identification of critical conditions</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Prescription Management</h3>
                    <p className="text-slate-600">Integrated pharmacy with prescription tracking</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 -right-8 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-40"></div>
              <div className="absolute bottom-0 -left-8 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-slate-900">
              Why Choose MediGuide AI?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed for modern medical practice
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6 w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Advanced Analysis
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Cutting-edge AI algorithms deliver accurate symptom analysis with clinical precision and reliability.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-xl bg-gradient-to-br from-slate-50 to-red-50 border border-red-200 hover:border-red-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6 w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                Emergency Response
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Real-time identification of critical symptoms with immediate emergency protocols and guidance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50 border border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6 w-12 h-12 bg-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Medicine Management
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive prescription management and pharmacy integration for seamless medication access.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-xl bg-gradient-to-br from-slate-50 to-purple-50 border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6 w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Global Access
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Multi-language support ensuring accessible healthcare guidance across diverse patient populations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
              How It Works
            </h2>
            <p className="text-slate-300 text-lg">
              Simple and efficient process for intelligent health assessment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="mx-auto w-20 h-20 bg-white text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  1
                </div>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">Assessment</h3>
              <p className="text-slate-300">
                Provide detailed information about your symptoms through our secure platform
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="mx-auto w-20 h-20 bg-white text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  2
                </div>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">Analysis</h3>
              <p className="text-slate-300">
                Our AI system processes your information and generates comprehensive health insights
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="mx-auto w-20 h-20 bg-white text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  3
                </div>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">Recommendations</h3>
              <p className="text-slate-300">
                Receive personalized clinical recommendations and next steps for optimal care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 to-purple-100/10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl"></div>
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-3xl md:text-4xl font-bold text-slate-900">
              Ready to Transform Patient Care?
            </h2>
            <p className="mb-8 text-lg md:text-xl text-slate-600">
              Join healthcare providers and institutions using MediGuide AI for superior patient outcomes
            </p>
            <Link 
              href="/symptom-checker" 
              className="inline-block group relative px-10 py-4 bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
              <span className="relative z-10">Start Assessment</span>
              <div className="absolute inset-0 rounded-lg bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}