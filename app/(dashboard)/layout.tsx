/**
 * Dashboard Layout Component
 * 
 * Provides protected layout for authenticated dashboard pages
 * Includes navigation, sidebar, and main content area
 */

import { DashboardLayout as DashboardLayoutWrapper } from '@/components/layout/LayoutWrapper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayoutWrapper>
      {children}
    </DashboardLayoutWrapper>
  )
}
