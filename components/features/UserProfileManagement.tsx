'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { ProfilePersonalInfoForm } from '@/components/forms/ProfilePersonalInfoForm'
import { ProfileHealthForm } from '@/components/forms/ProfileHealthForm'
import { EmergencyContactForm } from '@/components/forms/EmergencyContactForm'
import { useToast } from '@/hooks/useToast'
import { useApi } from '@/hooks/useApi'
import type { PersonalInfo, HealthProfile, EmergencyContact } from '@/lib/validations/profile'

interface UserProfileData {
  personalInfo: PersonalInfo
  healthProfile: HealthProfile
  emergencyContacts: EmergencyContact[]
}

/**
 * User Profile Management Interface
 * Comprehensive profile editing interface with tabs for personal info, health data, and emergency contacts
 * 
 * Validates: Requirements 5.4, 6.2, 6.5, 9.2, 9.4
 */
export const UserProfileManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const { api } = useApi()

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true)
        const response = await api('/api/profile', {
          method: 'GET',
        })
        if (response.ok) {
          const data = await response.json()
          setProfileData(data)
        } else {
          throw new Error('Failed to fetch profile')
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load profile',
          type: 'error',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [api, toast])

  const handlePersonalInfoSubmit = async (data: PersonalInfo) => {
    try {
      setIsSaving(true)
      const response = await api('/api/profile/personal', {
        method: 'PUT',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update personal information')
      }

      setProfileData((prev) =>
        prev ? { ...prev, personalInfo: data } : null
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleHealthProfileSubmit = async (data: HealthProfile) => {
    try {
      setIsSaving(true)
      const response = await api('/api/profile/health', {
        method: 'PUT',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update health profile')
      }

      setProfileData((prev) =>
        prev ? { ...prev, healthProfile: data } : null
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleEmergencyContactsSubmit = async (data: EmergencyContact[]) => {
    try {
      setIsSaving(true)
      const response = await api('/api/profile/emergency-contacts', {
        method: 'PUT',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update emergency contacts')
      }

      setProfileData((prev) =>
        prev ? { ...prev, emergencyContacts: data } : null
      )
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin">
          <div className="h-8 w-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Profile Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your personal information, health data, and emergency contacts
        </p>
      </div>

      <Card className="border border-gray-200 dark:border-gray-700">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 border-b border-gray-200 dark:border-gray-700">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="health">Health Data</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="personal" className="space-y-4">
              {profileData && (
                <ProfilePersonalInfoForm
                  defaultValues={profileData.personalInfo}
                  onSubmit={handlePersonalInfoSubmit}
                  isLoading={isSaving}
                />
              )}
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              {profileData && (
                <ProfileHealthForm
                  defaultValues={profileData.healthProfile}
                  onSubmit={handleHealthProfileSubmit}
                  isLoading={isSaving}
                />
              )}
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4">
              {profileData && (
                <EmergencyContactForm
                  defaultValues={profileData.emergencyContacts}
                  onSubmit={handleEmergencyContactsSubmit}
                  isLoading={isSaving}
                />
              )}
            </TabsContent>
          </div>
        </Tabs>
      </Card>

      {/* Help Section */}
      <Card className="border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-blue-900 dark:text-blue-50">
            Why We Need This Information
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Personal information helps us provide personalized health insights</li>
            <li>• Health data improves accuracy of symptom analysis</li>
            <li>• Emergency contacts ensure you get help when you need it most</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
