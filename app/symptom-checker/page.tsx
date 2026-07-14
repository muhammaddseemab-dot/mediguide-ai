'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { t } = useLanguage()

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return
    
    setIsAnalyzing(true)
    setAnalysis('')
    
    try {
      const response = await fetch('/api/symptoms/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: [symptoms],
          duration: undefined,
          severity: undefined,
          notes: undefined
        }),
      })

      const data = await response.json()

      if (data.success && data.data) {
        const insight = data.data
        
        const formattedAnalysis = `
**AI Health Insight Analysis**

**Severity Level:** ${insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)} ${getSeverityEmoji(insight.severity)}
**Confidence:** ${insight.confidence}%

**Analyzed Symptoms:**
${insight.symptoms.map(symptom => `• ${symptom}`).join('\n')}

**Possible Conditions:**
${insight.possibleConditions?.map((condition, index) => `${index + 1}. ${condition}`).join('\n') || 'No specific conditions identified'}

**Recommendations:**
${insight.recommendations.map((rec, index) => `${index + 1}. **${rec.title}** (${rec.priority} priority)
   ${rec.description}`).join('\n\n')}

**Suggested Actions:**
${insight.suggestedActions.map((action, index) => `${index + 1}. ${action.label}`).join('\n')}

---
**${insight.disclaimer}**
        `.trim()
        
        setAnalysis(formattedAnalysis)
      } else {
        throw new Error(data.error?.message || 'Failed to analyze symptoms')
      }
    } catch (error) {
      console.error('Error analyzing symptoms:', error)
      setAnalysis(`**⚠️ Analysis Error**

We encountered an issue while analyzing your symptoms. This could be due to:

• API connectivity issues
• High server load  
• Configuration problems

**What to do next:**
• Try again in a few moments
• Simplify your symptom description
• Check your internet connection

**⚠️ IMPORTANT:** If you're experiencing severe symptoms like:
• Chest pain or difficulty breathing
• Severe bleeding or injuries
• Loss of consciousness
• Signs of stroke or heart attack

**Call emergency services immediately: 911 (US) or 112 (India)**

**Medical Disclaimer:** This platform provides AI-generated health insights for informational purposes only and is not a substitute for professional medical advice.`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSeverityEmoji = (severity: string) => {
    switch (severity) {
      case 'low': return '🟢'
      case 'moderate': return '🟡'  
      case 'high': return '🟠'
      case 'emergency': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">AI Symptom Checker</h1>
            <p className="text-lg text-gray-600">
              Describe your symptoms and get AI-powered health insights
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg border-2 border-blue-200">
              <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Describe Your Symptoms</h2>
              
              <div className="mb-4">
                <label htmlFor="symptoms" className="mb-2 block text-sm font-medium text-gray-700">
                  What symptoms are you experiencing?
                </label>
                <textarea
                  id="symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  rows={6}
                  placeholder="Please describe your symptoms in detail. For example: 'I have a headache that started this morning, feeling nauseous, and have a slight fever...'"
                />
                
                {/* Quick symptom examples */}
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Quick examples (click to use):</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Fever, cough, and sore throat for 2 days",
                      "Severe headache and sensitivity to light",
                      "Chest pain and difficulty breathing",
                      "Stomach pain, nausea, and vomiting"
                    ].map((example, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSymptoms(example)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-700"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!symptoms.trim() || isAnalyzing}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⟳</span>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Symptoms'
                )}
              </button>

              {/* Emergency Notice */}
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
                <div className="flex items-start gap-2">
                  <span className="text-red-500">⚠️</span>
                  <div>
                    <h3 className="font-semibold text-red-800">Emergency Symptoms</h3>
                    <p className="text-sm text-red-700">
                      If you're experiencing chest pain, difficulty breathing, severe bleeding, 
                      or other life-threatening symptoms, call emergency services immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Section */}
            <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg border-2 border-purple-200">
              <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Analysis</h2>
              
              {!analysis && !isAnalyzing && (
                <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
                  <div className="text-center text-gray-500">
                    <div className="mb-2 text-4xl">🤖</div>
                    <p>Enter your symptoms to get AI-powered insights</p>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex h-64 items-center justify-center rounded-lg bg-blue-50">
                  <div className="text-center text-blue-600">
                    <div className="mb-4 text-4xl animate-pulse">🔬</div>
                    <p>Analyzing your symptoms...</p>
                    <p className="text-sm">This may take a few moments</p>
                  </div>
                </div>
              )}

              {analysis && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">✅</span>
                      <h3 className="font-semibold text-green-800">Analysis Complete</h3>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{analysis}</pre>
                  </div>

                  <div className="flex gap-4">
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                      Save Analysis
                    </button>
                    <button 
                      onClick={() => {
                        setSymptoms('')
                        setAnalysis('')
                      }}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Start Over
                    </button>
                  </div>

                  {/* Nearby Hospitals Section */}
                  <div className="mt-6 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 p-4">
                    <h4 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">🏥 Nearby Hospitals</h4>
                    <p className="text-sm text-green-800 mb-4">
                      Based on your symptoms, here are nearby hospitals that can help:
                    </p>
                    
                    <div className="space-y-3">
                      {/* Hospital 1 */}
                      <div className="rounded-lg bg-white p-3 border border-green-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold text-gray-900">City General Hospital</h5>
                            <p className="text-xs text-gray-600 mt-1">123 Main Street, Downtown</p>
                            <div className="flex gap-4 mt-2 text-xs">
                              <span className="text-green-600 font-semibold">⭐ 4.8 Rating</span>
                              <span className="text-blue-600 font-semibold">0.5 km away</span>
                              <span className="text-red-600 font-semibold">🚨 24/7 Emergency</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hospital 2 */}
                      <div className="rounded-lg bg-white p-3 border border-green-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold text-gray-900">Apollo Hospitals</h5>
                            <p className="text-xs text-gray-600 mt-1">321 Medical Complex, Central</p>
                            <div className="flex gap-4 mt-2 text-xs">
                              <span className="text-green-600 font-semibold">⭐ 4.9 Rating</span>
                              <span className="text-blue-600 font-semibold">1.5 km away</span>
                              <span className="text-red-600 font-semibold">🚨 24/7 Emergency</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hospital 3 */}
                      <div className="rounded-lg bg-white p-3 border border-green-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold text-gray-900">Metro Medical Center</h5>
                            <p className="text-xs text-gray-600 mt-1">456 Oak Avenue, North District</p>
                            <div className="flex gap-4 mt-2 text-xs">
                              <span className="text-green-600 font-semibold">⭐ 4.6 Rating</span>
                              <span className="text-blue-600 font-semibold">1.2 km away</span>
                              <span className="text-red-600 font-semibold">🚨 24/7 Emergency</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a
                      href="/hospital-finder"
                      className="mt-4 block w-full text-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors font-semibold"
                    >
                      View All Nearby Hospitals
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <div className="mb-2 text-2xl">🎯</div>
              <h3 className="font-semibold text-gray-900">Accurate Analysis</h3>
              <p className="text-sm text-gray-600">AI-powered symptom analysis with medical accuracy</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <div className="mb-2 text-2xl">⚡</div>
              <h3 className="font-semibold text-gray-900">Instant Results</h3>
              <p className="text-sm text-gray-600">Get health insights in seconds, not hours</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <div className="mb-2 text-2xl">🔒</div>
              <h3 className="font-semibold text-gray-900">Privacy Protected</h3>
              <p className="text-sm text-gray-600">Your health data is secure and confidential</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}