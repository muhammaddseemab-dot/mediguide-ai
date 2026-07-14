'use client'

import React from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emergencyContactsSchema, emergencyContactSchema, type EmergencyContact } from '@/lib/validations/profile'
import { FormField } from './FormField'
import { Input } from './Input'
import { Select } from './Select'
import { Button } from './Button'
import { useToast } from '@/hooks/useToast'

interface EmergencyContactFormProps {
  defaultValues?: EmergencyContact[]
  onSubmit: (data: EmergencyContact[]) => Promise<void>
  isLoading?: boolean
}

/**
 * Emergency Contacts Management Form
 * Allows users to add, edit, and delete emergency contacts with priority levels
 * 
 * Validates: Requirements 5.4, 6.2, 6.5, 9.2, 9.4
 */
export const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({
  defaultValues = [],
  onSubmit,
  isLoading = false,
}) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<EmergencyContact[]>({
    resolver: zodResolver(emergencyContactsSchema),
    defaultValues: defaultValues.length > 0 ? defaultValues : [],
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: undefined as any,
  })

  const { toast } = useToast()

  const handleFormSubmit = async (data: EmergencyContact[]) => {
    try {
      await onSubmit(data)
      toast({
        title: 'Success',
        description: 'Emergency contacts updated successfully',
        type: 'success',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update emergency contacts',
        type: 'error',
      })
    }
  }

  const addEmergencyContact = () => {
    append({
      id: undefined,
      name: '',
      phone: '',
      relationship: '',
      priority: 'primary',
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Emergency Contacts
          </h3>
          <Button
            type="button"
            onClick={addEmergencyContact}
            variant="secondary"
            size="sm"
          >
            Add Contact
          </Button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add your emergency contacts so we can reach out to them if needed. Please ensure at least one primary contact is added.
        </p>

        {fields.length > 0 ? (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <Controller
                    name={`${index as any}.priority`}
                    control={control}
                    render={({ field: fieldProps }) => (
                      <Select
                        {...fieldProps}
                        options={[
                          { value: 'primary', label: 'Primary' },
                          { value: 'secondary', label: 'Secondary' },
                          { value: 'tertiary', label: 'Tertiary' },
                        ]}
                        className="w-32"
                      />
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="secondary"
                    size="sm"
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name={`${index as any}.name`}
                    control={control}
                    render={({ field: fieldProps }) => (
                      <FormField
                        label="Contact Name"
                        required
                        error={(errors as any)?.[index]?.name?.message}
                        control={control}
                        name={`${index as any}.name`}
                      >
                        {({ field: innerField }) => (
                          <Input
                            {...innerField}
                            placeholder="John Doe"
                            type="text"
                          />
                        )}
                      </FormField>
                    )}
                  />

                  <Controller
                    name={`${index as any}.relationship`}
                    control={control}
                    render={({ field: fieldProps }) => (
                      <FormField
                        label="Relationship"
                        required
                        error={(errors as any)?.[index]?.relationship?.message}
                        control={control}
                        name={`${index as any}.relationship`}
                      >
                        {({ field: innerField }) => (
                          <Select
                            {...innerField}
                            options={[
                              { value: 'spouse', label: 'Spouse' },
                              { value: 'parent', label: 'Parent' },
                              { value: 'sibling', label: 'Sibling' },
                              { value: 'child', label: 'Child' },
                              { value: 'friend', label: 'Friend' },
                              { value: 'colleague', label: 'Colleague' },
                              { value: 'doctor', label: 'Doctor' },
                              { value: 'other', label: 'Other' },
                            ]}
                          />
                        )}
                      </FormField>
                    )}
                  />

                  <Controller
                    name={`${index as any}.phone`}
                    control={control}
                    render={({ field: fieldProps }) => (
                      <FormField
                        label="Phone Number"
                        required
                        error={(errors as any)?.[index]?.phone?.message}
                        control={control}
                        name={`${index as any}.phone`}
                      >
                        {({ field: innerField }) => (
                          <Input
                            {...innerField}
                            placeholder="+1 (555) 123-4567"
                            type="tel"
                          />
                        )}
                      </FormField>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No emergency contacts added yet. Click "Add Contact" to get started.
            </p>
          </div>
        )}
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
          Save Contacts
        </Button>
      </div>
    </form>
  )
}
