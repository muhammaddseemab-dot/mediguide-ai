'use client'

/**
 * User Login Form Component
 * Handles user authentication with email and password
 * Includes real-time validation feedback and accessible design
 * 
 * Validates: Requirements 5.4, 9.2, 9.4
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { AlertCircle, CheckCircle2, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Input } from './Input'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'

/**
 * Login Form Component
 */
export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await axios.post('/api/auth/login', {
        email: data.email,
        password: data.password,
        rememberMe,
      })

      if (response.data.success) {
        setSuccess(true)
        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        setError(response.data.error?.message || 'Login failed')
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        'An error occurred during login. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Success Message */}
      {success && (
        <div
          className="rounded-lg border border-green-200 bg-green-50 p-4"
          role="status"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Login successful! Redirecting...
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4"
          role="alert"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <Input
        id="email"
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        leftIcon={<Mail className="h-5 w-5" />}
        error={errors.email?.message}
        disabled={isLoading || success}
        required
        autoComplete="email"
        {...register('email')}
      />

      {/* Password Field */}
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        label="Password"
        placeholder="Enter your password"
        leftIcon={<Lock className="h-5 w-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        }
        error={errors.password?.message}
        disabled={isLoading || success}
        required
        autoComplete="current-password"
        {...register('password')}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <Checkbox
          id="remember-me"
          label="Remember me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          disabled={isLoading || success}
        />
        <a
          href="/auth/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={success}
      >
        Sign In
      </Button>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <a
          href="/auth/register"
          className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Create account
        </a>
      </p>
    </form>
  )
}