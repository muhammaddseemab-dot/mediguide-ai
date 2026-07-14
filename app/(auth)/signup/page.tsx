'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    agreeToTerms: false,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
    setError('')
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required')
      return false
    }
    if (!formData.dateOfBirth) {
      setError('Date of birth is required')
      return false
    }
    if (!formData.gender) {
      setError('Gender is required')
      return false
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms and Conditions')
      return false
    }
    return true
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Store user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (users.some((u: any) => u.email === formData.email)) {
      setError('Email already registered. Please sign in instead.')
      setIsLoading(false)
      return
    }

    const newUser = {
      id: `user_${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      password: formData.password,
      role: 'user',
      createdAt: new Date().toISOString(),
      verified: false,
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    setSuccess('Account created successfully! Redirecting to sign in...')
    
    setTimeout(() => {
      router.push('/signin')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join MediGuide AI for personalized health insights</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

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
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 98765 43210"
                required
              />
            </div>

            {/* Date of Birth & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
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
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-2 text-sm text-gray-500">or</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl mb-2">🩺</div>
            <h3 className="font-semibold text-gray-900">Health Insights</h3>
            <p className="text-sm text-gray-600">AI-powered symptom analysis</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl mb-2">💊</div>
            <h3 className="font-semibold text-gray-900">Medicine Store</h3>
            <p className="text-sm text-gray-600">Easy medicine ordering</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl mb-2">🔐</div>
            <h3 className="font-semibold text-gray-900">Secure & Private</h3>
            <p className="text-sm text-gray-600">Your data is protected</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
