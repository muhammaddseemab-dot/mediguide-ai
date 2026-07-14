export default function About() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">About MediGuide AI</h1>
            <p className="text-lg text-gray-600">
              Revolutionizing healthcare with AI-powered insights and personalized guidance
            </p>
          </div>

          {/* Mission */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Mission</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-gray-700">
                  MediGuide AI is dedicated to making healthcare more accessible, accurate, and 
                  user-friendly through advanced artificial intelligence. We believe everyone 
                  deserves quality healthcare guidance, regardless of location or economic status.
                </p>
                <p className="text-gray-700">
                  Our platform combines cutting-edge AI technology with medical expertise to 
                  provide instant, reliable health insights that empower users to make informed 
                  decisions about their wellbeing.
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-6">
                <div className="text-center">
                  <div className="mb-4 text-6xl">🎯</div>
                  <h3 className="font-semibold text-gray-900">Making Healthcare Accessible</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Breaking down barriers to quality healthcare guidance with AI technology
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">What We Offer</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-6">
                <div className="mb-4 text-3xl">🤖</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">AI Symptom Analysis</h3>
                <p className="text-gray-600">
                  Advanced machine learning algorithms analyze your symptoms and provide 
                  personalized health insights with medical accuracy.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <div className="mb-4 text-3xl">🚨</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Emergency Detection</h3>
                <p className="text-gray-600">
                  Immediate identification of potentially critical symptoms with emergency 
                  response guidance and nearby hospital recommendations.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <div className="mb-4 text-3xl">💊</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Medicine Marketplace</h3>
                <p className="text-gray-600">
                  Integrated pharmacy services with prescription management and 
                  medicine recommendations based on your health profile.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <div className="mb-4 text-3xl">🌐</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Multi-Language Support</h3>
                <p className="text-gray-600">
                  Available in English, Hindi, and Marathi to ensure healthcare 
                  accessibility across diverse communities.
                </p>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Technology</h2>
            <div className="rounded-lg bg-gray-50 p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="text-center">
                  <div className="mb-4 text-4xl">🧠</div>
                  <h3 className="mb-2 font-semibold text-gray-900">Google Gemini AI</h3>
                  <p className="text-sm text-gray-600">
                    Powered by Google's advanced Gemini AI for accurate medical analysis
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mb-4 text-4xl">🔒</div>
                  <h3 className="mb-2 font-semibold text-gray-900">Enterprise Security</h3>
                  <p className="text-sm text-gray-600">
                    Healthcare-grade security with encryption and privacy protection
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mb-4 text-4xl">⚡</div>
                  <h3 className="mb-2 font-semibold text-gray-900">Real-Time Processing</h3>
                  <p className="text-sm text-gray-600">
                    Instant analysis and response for time-critical health situations
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Medical Disclaimer */}
          <section className="rounded-lg bg-yellow-50 border border-yellow-200 p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="mb-2 font-semibold text-yellow-800">Important Medical Disclaimer</h3>
                <p className="text-sm text-yellow-700">
                  MediGuide AI provides AI-generated health insights for informational purposes only. 
                  Our platform is not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of qualified healthcare providers with any questions about your 
                  health condition. Never disregard professional medical advice or delay seeking it 
                  because of information provided by this platform.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}