import React from 'react'
import { UserProfileManagement } from '@/components/features/UserProfileManagement'

/**
 * User Profile Management Page
 * Provides interface for users to manage their profile, health data, and emergency contacts
 * 
 * Validates: Requirements 5.4, 6.2, 6.5, 9.2, 9.4
 */
export const metadata = {
  title: 'Profile Management | MediGuide AI',
  description: 'Manage your personal information, health data, and emergency contacts',
}

export default function ProfilePage() {
  return (
    <div className="py-8">
      <UserProfileManagement />
    </div>
  )
}
