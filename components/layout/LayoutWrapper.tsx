'use client'

import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutWrapperProps {
  children: React.ReactNode
  variant?: 'public' | 'dashboard' | 'auth'
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  variant = 'public',
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <LayoutWrapper variant="dashboard">{children}</LayoutWrapper>
}

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <LayoutWrapper variant="auth">{children}</LayoutWrapper>
}

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <LayoutWrapper variant="public">{children}</LayoutWrapper>
}

export default LayoutWrapper
