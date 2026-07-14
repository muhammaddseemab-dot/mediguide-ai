/**
 * Auth Layout Component
 * 
 * Provides layout for authentication pages (login, register, forgot-password)
 * Centers the form content on the page
 */

import { AuthLayout as AuthLayoutWrapper } from '@/components/layout/LayoutWrapper'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthLayoutWrapper>
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </AuthLayoutWrapper>
  )
}
