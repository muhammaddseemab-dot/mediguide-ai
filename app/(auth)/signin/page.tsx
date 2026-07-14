'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Test credentials
  const TEST_CREDENTIALS = [
    { email: 'user@mediguide.com', password: 'password123', name: 'John Doe', role: 'user' },
    { email: 'admin@mediguide.com', password: 'admin123', name: 'Admin User', role: 'admin' },
    { email: 'doctor@mediguide.com', password: 'doctor123', name: 'Dr. Smith', role: 'doctor' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Validate credentials
    const user = TEST_CREDENTIALS.find(
      cred => cred.email === formData.email && cred.password === formData.password
    )

    if (!user) {
      setError('Invalid email or password. Use test credentials below.')
      setIsLoading(false)
      return
    }

    // Store user session in localStorage
    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      name: user.name,
      role: user.role,
      signedInAt: new Date().toISOString(),
    }))

    // Store remember me preference
    if (formData.rememberMe) {
      localStorage.setItem('rememberMe', JSON.stringify({
        email: formData.email,
      }))
    }

    // Redirect based on role
    if (user.role === 'admin') {
      router.push('/admin')
    } else if (user.role === 'doctor') {
      router.push('/(dashboard)/profile')
    } else {
      router.push('/(dashboard)/profile')
    }
  }

  const fillTestCredentials = (email: string, password: string) => {
    setFormData(prev => ({
      ...prev,
      email,
      password,
    }))
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MediGuide AI</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="user@mediguide.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-2 text-sm text-gray-500">or</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up
              </Link>
            </p>
          </form>
        </div>

        {/* Test Credentials Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Credentials</h3>
          <p className="text-sm text-gray-600 mb-4">Click any credential to auto-fill the form:</p>

          <div className="space-y-3">
            {TEST_CREDENTIALS.map((cred, index) => (
              <div
                key={index}
                onClick={() => fillTestCredentials(cred.email, cred.password)}
                className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{cred.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Email: <span className="font-mono text-blue-600">{cred.email}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Pass: <span className="font-mono text-blue-600">{cred.password}</span>
                    </div>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {cred.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 <strong>Tip:</strong> Click on any test account above to auto-fill the form, then click "Sign In"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Back to Home
          </Link>
          <span className="mx-2">•</span>
          <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
