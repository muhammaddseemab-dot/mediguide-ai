'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalInfoSchema, type PersonalInfo } from '@/lib/validations/profile'
import { FormField } from './FormField'
import { Input } from './Input'
import { Select } from './Select'
import { Button } from './Button'
import { useToast } from '@/hooks/useToast'

interface ProfilePersonalInfoFormProps {
  defaultValues?: PersonalInfo
  onSubmit: (data: PersonalInfo) => Promise<void>
  isLoading?: boolean
}

/**
 * Profile Personal Information Form
 * Allows users to edit personal details like name, age, gender, and phone
 * 
 * Validates: Requirements 5.4, 6.2, 6.5, 9.2, 9.4
 */
export const ProfilePersonalInfoForm: React.FC<ProfilePersonalInfoFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading = false,
}) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: defaultValues || {
      gender: 'other',
    },
  })

  const { toast } = useToast()

  const handleFormSubmit = async (data: PersonalInfo) => {
    try {
      await onSubmit(data)
      toast({
        title: 'Success',
        description: 'Personal information updated successfully',
        type: 'success',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update personal information',
        type: 'error',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Personal Information
        </h3>

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormField
              label="Full Name"
              required
              error={errors.name?.message}
              control={control}
              name="name"
            >
              {({ field: fieldProps }) => (
                <Input
                  {...fieldProps}
                  placeholder="Enter your full name"
                  type="text"
                />
              )}
            </FormField>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <FormField
                label="Age"
                required
                error={errors.age?.message}
                control={control}
                name="age"
              >
                {({ field: fieldProps }) => (
                  <Input
                    {...fieldProps}
                    placeholder="Your age"
                    type="number"
                    min="1"
                    max="150"
                    onChange={(e) => fieldProps.onChange(e.target.value ? parseInt(e.target.value) : '')}
                  />
                )}
              </FormField>
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormField
                label="Gender"
                error={errors.gender?.message}
                control={control}
                name="gender"
              >
                {({ field: fieldProps }) => (
                  <Select
                    {...fieldProps}
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                )}
              </FormField>
            )}
          />
        </div>

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <FormField
              label="Phone Number"
              error={errors.phone?.message}
              control={control}
              name="phone"
            >
              {({ field: fieldProps }) => (
                <Input
                  {...fieldProps}
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                />
              )}
            </FormField>
          )}
        />
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          onClick={() => reset()}
          disabled={isLoading}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          Save Changes
        </Button>
      </div>
    </form>
  )
}
