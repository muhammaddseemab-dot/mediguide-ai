'use client'

/**
 * User Registration Form Component
 * Handles user registration with email, password, and confirmation fields
 * Includes real-time password strength validation with visual feedback
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { getPasswordStrengthFeedback } from '@/lib/utils'
import type { PasswordStrength } from '@/types'

/**
 * Validation schema for registration form
 */
const registrationSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[@$!%*?&]/,
        'Password must contain at least one special character (@$!%*?&)'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegistrationFormData = z.infer<typeof registrationSchema>

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength['strength']
  feedback: string[]
}

/**
 * Password strength indicator component
 */
function PasswordStrengthIndicator({
  strength,
  feedback,
}: PasswordStrengthIndicatorProps) {
  const strengthColors = {
    weak: 'bg-red-500',
    fair: 'bg-orange-500',
    good: 'bg-yellow-500',
    strong: 'bg-green-500',
  }

  const strengthLabels = {
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Password Strength
        </span>
        <span
          className={`text-sm font-semibold ${
            strength === 'strong'
              ? 'text-green-600'
              : strength === 'good'
                ? 'text-yellow-600'
                : strength === 'fair'
                  ? 'text-orange-600'
                  : 'text-red-600'
          }`}
        >
          {strengthLabels[strength]}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full ${strengthColors[strength]} transition-all duration-300`}
          style={{
            width:
              strength === 'weak'
                ? '25%'
                : strength === 'fair'
                  ? '50%'
                  : strength === 'good'
                    ? '75%'
                    : '100%',
          }}
        />
      </div>

      {/* Requirements feedback */}
      {feedback.length > 0 && (
        <div className="space-y-1">
          {feedback.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-xs text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      )}

      {feedback.length === 0 && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="text-xs text-green-600">
            Password meets all requirements
          </span>
        </div>
      )}
    </div>
  )
}

/**
 * Registration Form Component
 */
export function RegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    strength: 'weak',
    feedback: [],
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
  })

  const passwordValue = watch('password')

  // Update password strength feedback in real-time
  const handlePasswordChange = (value: string) => {
    const feedback = getPasswordStrengthFeedback(value)
    setPasswordStrength({
      strength: feedback.strength,
      feedback: feedback.feedback,
    })
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await axios.post('/api/auth/register', {
        email: data.email,
        password: data.password,
        name: data.name,
      })

      if (response.data.success) {
        setSuccess(true)
        // Redirect to email verification page
        setTimeout(() => {
          router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`)
        }, 1500)
      } else {
        setError(response.data.error?.message || 'Registration failed')
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        'An error occurred during registration. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Registration successful! Check your email to verify your account.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          disabled={isLoading || success}
          {...register('name')}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
          aria-label="Full Name"
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          disabled={isLoading || success}
          {...register('email')}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
          aria-label="Email Address"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            disabled={isLoading || success}
            {...register('password', {
              onChange: (e) => handlePasswordChange(e.target.value),
            })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
            aria-label="Password"
            aria-describedby={errors.password ? 'password-error' : 'password-hint'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Password strength indicator */}
        {passwordValue && (
          <div className="mt-3">
            <PasswordStrengthIndicator
              strength={passwordStrength.strength}
              feedback={passwordStrength.feedback}
            />
          </div>
        )}

        {errors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            disabled={isLoading || success}
            {...register('confirmPassword')}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
            aria-label="Confirm Password"
            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p id="confirm-password-error" className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || success}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
        aria-label="Create Account"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a
          href="/auth/login"
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          Sign in
        </a>
      </p>
    </form>
  )
}
