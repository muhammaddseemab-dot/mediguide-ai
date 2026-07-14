'use client'

import React, { useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { healthProfileSchema, type HealthProfile } from '@/lib/validations/profile'
import { FormField } from './FormField'
import { Input } from './Input'
import { Select } from './Select'
import { Button } from './Button'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'

interface ProfileHealthFormProps {
  defaultValues?: HealthProfile
  onSubmit: (data: HealthProfile) => Promise<void>
  isLoading?: boolean
}

/**
 * Profile Health Information Form
 * Allows users to update health data including allergies, medications, and chronic conditions
 * 
 * Validates: Requirements 5.4, 6.2, 6.5, 9.2, 9.4
 */
export const ProfileHealthForm: React.FC<ProfileHealthFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading = false,
}) => {
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<HealthProfile>({
    resolver: zodResolver(healthProfileSchema),
    defaultValues: defaultValues || {
      allergies: [],
      medications: [],
      chronicConditions: [],
    },
  })

  const { fields: medicationFields, append: appendMedication, remove: removeMedication } = useFieldArray({
    control,
    name: 'medications',
  })

  const { toast } = useToast()
  const [allergyInput, setAllergyInput] = useState('')
  const [conditionInput, setConditionInput] = useState('')

  const allergies = watch('allergies')
  const conditions = watch('chronicConditions')

  const handleAddAllergy = () => {
    if (allergyInput.trim()) {
      const currentAllergies = watch('allergies') || []
      control._formValues.allergies = [...currentAllergies, allergyInput.trim()]
      setAllergyInput('')
    }
  }

  const handleRemoveAllergy = (index: number) => {
    const currentAllergies = watch('allergies') || []
    control._formValues.allergies = currentAllergies.filter((_, i) => i !== index)
  }

  const handleAddCondition = () => {
    if (conditionInput.trim()) {
      const currentConditions = watch('chronicConditions') || []
      control._formValues.chronicConditions = [...currentConditions, conditionInput.trim()]
      setConditionInput('')
    }
  }

  const handleRemoveCondition = (index: number) => {
    const currentConditions = watch('chronicConditions') || []
    control._formValues.chronicConditions = currentConditions.filter((_, i) => i !== index)
  }

  const handleFormSubmit = async (data: HealthProfile) => {
    try {
      await onSubmit(data)
      toast({
        title: 'Success',
        description: 'Health information updated successfully',
        type: 'success',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update health information',
        type: 'error',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Health Information
        </h3>

        {/* Blood Type and Body Measurements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="bloodType"
            control={control}
            render={({ field }) => (
              <FormField
                label="Blood Type"
                error={errors.bloodType?.message}
                control={control}
                name="bloodType"
              >
                {({ field: fieldProps }) => (
                  <Select
                    {...fieldProps}
                    options={[
                      { value: 'O+', label: 'O+' },
                      { value: 'O-', label: 'O-' },
                      { value: 'A+', label: 'A+' },
                      { value: 'A-', label: 'A-' },
                      { value: 'B+', label: 'B+' },
                      { value: 'B-', label: 'B-' },
                      { value: 'AB+', label: 'AB+' },
                      { value: 'AB-', label: 'AB-' },
                    ]}
                  />
                )}
              </FormField>
            )}
          />

          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <FormField
                label="Height (cm)"
                error={errors.height?.message}
                control={control}
                name="height"
              >
                {({ field: fieldProps }) => (
                  <Input
                    {...fieldProps}
                    placeholder="170"
                    type="number"
                    min="0"
                    onChange={(e) => fieldProps.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                  />
                )}
              </FormField>
            )}
          />

          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <FormField
                label="Weight (kg)"
                error={errors.weight?.message}
                control={control}
                name="weight"
              >
                {({ field: fieldProps }) => (
                  <Input
                    {...fieldProps}
                    placeholder="70"
                    type="number"
                    min="0"
                    onChange={(e) => fieldProps.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                  />
                )}
              </FormField>
            )}
          />
        </div>

        {/* Allergies */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-50">
            Known Allergies
          </label>
          <div className="flex gap-2">
            <Input
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAllergy())}
              placeholder="Add an allergy (e.g., Penicillin)"
              type="text"
            />
            <Button
              type="button"
              onClick={handleAddAllergy}
              disabled={!allergyInput.trim()}
              variant="secondary"
            >
              Add
            </Button>
          </div>
          {allergies && allergies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {allergies.map((allergy, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">{allergy}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAllergy(index)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    aria-label={`Remove allergy: ${allergy}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chronic Conditions */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-50">
            Chronic Conditions
          </label>
          <div className="flex gap-2">
            <Input
              value={conditionInput}
              onChange={(e) => setConditionInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCondition())}
              placeholder="Add a condition (e.g., Diabetes)"
              type="text"
            />
            <Button
              type="button"
              onClick={handleAddCondition}
              disabled={!conditionInput.trim()}
              variant="secondary"
            >
              Add
            </Button>
          </div>
          {conditions && conditions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {conditions.map((condition, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">{condition}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(index)}
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                    aria-label={`Remove condition: ${condition}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current Medications */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-50">
              Current Medications
            </label>
            <Button
              type="button"
              onClick={() => appendMedication({ name: '', dosage: '', frequency: '' })}
              variant="secondary"
              size="sm"
            >
              Add Medication
            </Button>
          </div>

          {medicationFields.length > 0 && (
            <div className="space-y-3">
              {medicationFields.map((field, index) => (
                <div key={field.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Controller
                      name={`medications.${index}.name`}
                      control={control}
                      render={({ field: fieldProps }) => (
                        <FormField
                          label="Medicine Name"
                          error={(errors.medications?.[index]?.name?.message) as string}
                          control={control}
                          name={`medications.${index}.name`}
                        >
                          {({ field: innerField }) => (
                            <Input
                              {...innerField}
                              placeholder="e.g., Aspirin"
                              type="text"
                            />
                          )}
                        </FormField>
                      )}
                    />

                    <Controller
                      name={`medications.${index}.dosage`}
                      control={control}
                      render={({ field: fieldProps }) => (
                        <FormField
                          label="Dosage"
                          error={(errors.medications?.[index]?.dosage?.message) as string}
                          control={control}
                          name={`medications.${index}.dosage`}
                        >
                          {({ field: innerField }) => (
                            <Input
                              {...innerField}
                              placeholder="e.g., 500mg"
                              type="text"
                            />
                          )}
                        </FormField>
                      )}
                    />

                    <Controller
                      name={`medications.${index}.frequency`}
                      control={control}
                      render={({ field: fieldProps }) => (
                        <FormField
                          label="Frequency"
                          error={(errors.medications?.[index]?.frequency?.message) as string}
                          control={control}
                          name={`medications.${index}.frequency`}
                        >
                          {({ field: innerField }) => (
                            <Input
                              {...innerField}
                              placeholder="e.g., Twice daily"
                              type="text"
                            />
                          )}
                        </FormField>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => removeMedication(index)}
                    variant="secondary"
                    size="sm"
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    Remove Medication
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
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
