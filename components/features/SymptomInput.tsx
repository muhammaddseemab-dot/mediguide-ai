'use client'

/**
 * Symptom Input Component
 * 
 * Component for collecting structured symptom data from users
 */

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { symptomInputSchema, type SymptomInput } from '@/lib/validations/symptom'
import { COMMON_SYMPTOMS, SYMPTOM_DURATIONS, SYMPTOM_SEVERITIES, MEDICAL_DISCLAIMERS } from '@/lib/constants'

interface SymptomInputProps {
  onSubmit: (data: SymptomInput) => Promise<void>
  isLoading?: boolean
}

/**
 * SymptomInput Component
 * Provides a user-friendly interface for symptom data collection
 */
export const SymptomInput: React.FC<SymptomInputProps> = ({ onSubmit, isLoading = false }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [customSymptom, setCustomSymptom] = useState('')

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SymptomInput>({
    resolver: zodResolver(symptomInputSchema),
    defaultValues: {
      symptoms: [],
      duration: undefined,
      severity: undefined,
      notes: '',
    },
  })

  const duration = watch('duration')
  const severity = watch('severity')

  /**
   * Add a symptom to the selected list
   */
  const handleAddSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom) && selectedSymptoms.length < 10) {
      const newSymptoms = [...selectedSymptoms, symptom]
      setSelectedSymptoms(newSymptoms)
      // Update form value
      const formElement = document.querySelector('form')
      if (formElement) {
        const event = new Event('symptomChange', { bubbles: true })
        formElement.dispatchEvent(event)
      }
    }
  }

  /**
   * Remove a symptom from the selected list
   */
  const handleRemoveSymptom = (symptom: string) => {
    const newSymptoms = selectedSymptoms.filter((s) => s !== symptom)
    setSelectedSymptoms(newSymptoms)
  }

  /**
   * Add custom symptom
   */
  const handleAddCustomSymptom = () => {
    if (customSymptom.trim() && selectedSymptoms.length < 10) {
      const trimmedSymptom = customSymptom.trim()
      handleAddSymptom(trimmedSymptom)
      setCustomSymptom('')
    }
  }

  /**
   * Handle form submission
   */
  const handleFormSubmit = async (data: SymptomInput) => {
    // Ensure symptoms array is updated
    const submissionData = {
      ...data,
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : data.symptoms,
    }

    if (submissionData.symptoms.length === 0) {
      return
    }

    await onSubmit(submissionData)
    // Optionally reset form
    setSelectedSymptoms([])
    setCustomSymptom('')
    reset()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Medical Disclaimer Alert */}
      <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950">
        <AlertDescription className="text-blue-900 dark:text-blue-100">
          <strong>⚠️ Medical Disclaimer:</strong> {MEDICAL_DISCLAIMERS.AI_NOT_DIAGNOSIS}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Symptom Checker</CardTitle>
          <CardDescription>
            Describe your symptoms to receive personalized health insights. This is not a medical
            diagnosis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Common Symptoms Section */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Select Common Symptoms</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {COMMON_SYMPTOMS.map((symptom) => (
                  <Button
                    key={symptom}
                    type="button"
                    variant={selectedSymptoms.includes(symptom) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAddSymptom(symptom)}
                    disabled={
                      selectedSymptoms.length >= 10 && !selectedSymptoms.includes(symptom)
                    }
                    className="justify-start text-left"
                  >
                    {symptom}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Symptom Input */}
            <div className="space-y-3">
              <label htmlFor="customSymptom" className="text-sm font-medium">
                Add Custom Symptom
              </label>
              <div className="flex gap-2">
                <Input
                  id="customSymptom"
                  placeholder="Describe other symptoms..."
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddCustomSymptom()
                    }
                  }}
                  disabled={selectedSymptoms.length >= 10}
                  className="flex-1"
                  aria-label="Add custom symptom"
                />
                <Button
                  type="button"
                  onClick={handleAddCustomSymptom}
                  disabled={!customSymptom.trim() || selectedSymptoms.length >= 10}
                  aria-label="Add symptom button"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Selected Symptoms Display */}
            {selectedSymptoms.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Selected Symptoms ({selectedSymptoms.length}/10)
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveSymptom(symptom)}
                    >
                      {symptom}
                      <span className="ml-1">×</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Error for symptoms */}
            {errors.symptoms && (
              <div className="text-sm text-red-600 dark:text-red-400">{errors.symptoms.message}</div>
            )}

            {/* Duration Field */}
            <div className="space-y-3">
              <label htmlFor="duration" className="text-sm font-medium">
                How long have you had these symptoms?
              </label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Select value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger id="duration" aria-label="Symptom duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {SYMPTOM_DURATIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.duration && (
                <div className="text-sm text-red-600 dark:text-red-400">{errors.duration.message}</div>
              )}
            </div>

            {/* Severity Field */}
            <div className="space-y-3">
              <label htmlFor="severity" className="text-sm font-medium">
                Symptom Severity
              </label>
              <Controller
                name="severity"
                control={control}
                render={({ field }) => (
                  <Select value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger id="severity" aria-label="Symptom severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      {SYMPTOM_SEVERITIES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.severity && (
                <div className="text-sm text-red-600 dark:text-red-400">{errors.severity.message}</div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="space-y-3">
              <label htmlFor="notes" className="text-sm font-medium">
                Additional Notes (Optional)
              </label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="notes"
                    placeholder="Provide any additional context about your symptoms (up to 500 characters)..."
                    {...field}
                    className="min-h-24"
                    aria-label="Additional symptom notes"
                  />
                )}
              />
              {errors.notes && (
                <div className="text-sm text-red-600 dark:text-red-400">{errors.notes.message}</div>
              )}
            </div>

            {/* Important Information */}
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
              <AlertDescription className="text-yellow-900 dark:text-yellow-100">
                <strong>Important:</strong> {MEDICAL_DISCLAIMERS.CONSULT_DOCTOR}
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading || selectedSymptoms.length === 0}
              aria-label="Analyze symptoms button"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Analyzing...
                </div>
              ) : (
                'Analyze Symptoms'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SymptomInput
