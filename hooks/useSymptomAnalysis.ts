/**
 * useSymptomAnalysis Hook
 * 
 * Custom hook for symptom analysis with loading, error, and data states
 */

import { useState, useCallback } from 'react'
import type { HealthInsight, EmergencyAssessment, ApiResponse } from '@/types'
import type { SymptomInput } from '@/lib/validations/symptom'

interface UseSymptomAnalysisState {
  loading: boolean
  error: string | null
  insight: HealthInsight | null
  emergencyAssessment: EmergencyAssessment | null
}

interface UseSymptomAnalysisReturn extends UseSymptomAnalysisState {
  analyzeSymptoms: (input: SymptomInput) => Promise<void>
  checkEmergency: (symptoms: string[], age?: number) => Promise<void>
  reset: () => void
}

/**
 * Hook for symptom analysis
 */
export function useSymptomAnalysis(): UseSymptomAnalysisReturn {
  const [state, setState] = useState<UseSymptomAnalysisState>({
    loading: false,
    error: null,
    insight: null,
    emergencyAssessment: null,
  })

  /**
   * Analyze symptoms using the API
   */
  const analyzeSymptoms = useCallback(async (input: SymptomInput) => {
    setState({ loading: true, error: null, insight: null, emergencyAssessment: null })

    try {
      const response = await fetch('/api/symptoms/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data: ApiResponse<HealthInsight> = await response.json()

      if (!data.success || !data.data) {
        throw new Error(data.error?.message || 'Failed to analyze symptoms')
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        insight: data.data,
      }))

      // Check for emergency conditions
      if (data.data.severity === 'emergency') {
        await checkEmergency(input.symptoms)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
    }
  }, [])

  /**
   * Check for emergency conditions
   */
  const checkEmergency = useCallback(async (symptoms: string[], age?: number) => {
    try {
      const response = await fetch('/api/symptoms/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms, userAge: age }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data: ApiResponse<EmergencyAssessment> = await response.json()

      if (data.data) {
        setState((prev) => ({
          ...prev,
          emergencyAssessment: data.data,
        }))
      }
    } catch (err) {
      console.error('Error checking emergency:', err)
      // Don't set error state for emergency check, as we already have a default
    }
  }, [])

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      insight: null,
      emergencyAssessment: null,
    })
  }, [])

  return {
    ...state,
    analyzeSymptoms,
    checkEmergency,
    reset,
  }
}

export default useSymptomAnalysis
