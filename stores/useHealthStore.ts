/**
 * Health Store
 * 
 * Zustand store for managing health-related state
 * Manages consultations, health insights, and symptoms
 */

'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { HealthInsight, Consultation, ConversationMessage } from '@/types'

interface HealthState {
  // Current consultation data
  currentSymptoms: string[]
  currentInsight: HealthInsight | null
  currentConsultation: Consultation | null
  
  // Conversation history
  conversationHistory: ConversationMessage[]
  
  // Consultation history
  consultations: Consultation[]
  
  // Loading and error states
  isAnalyzing: boolean
  error: string | null
  
  // Actions
  setCurrentSymptoms: (symptoms: string[]) => void
  setCurrentInsight: (insight: HealthInsight | null) => void
  setCurrentConsultation: (consultation: Consultation | null) => void
  addConversationMessage: (message: ConversationMessage) => void
  clearConversationHistory: () => void
  addConsultation: (consultation: Consultation) => void
  setConsultations: (consultations: Consultation[]) => void
  setIsAnalyzing: (isAnalyzing: boolean) => void
  setError: (error: string | null) => void
  clearCurrentConsultation: () => void
  resetHealthState: () => void
}

export const useHealthStore = create<HealthState>()(
  persist(
    (set) => ({
      // Initial state
      currentSymptoms: [],
      currentInsight: null,
      currentConsultation: null,
      conversationHistory: [],
      consultations: [],
      isAnalyzing: false,
      error: null,

      // Actions
      setCurrentSymptoms: (symptoms) => set({ currentSymptoms: symptoms }),
      
      setCurrentInsight: (insight) => set({ currentInsight: insight }),
      
      setCurrentConsultation: (consultation) =>
        set({
          currentConsultation: consultation,
          conversationHistory: consultation?.conversationHistory || [],
        }),
      
      addConversationMessage: (message) =>
        set((state) => ({
          conversationHistory: [...state.conversationHistory, message],
        })),
      
      clearConversationHistory: () =>
        set({ conversationHistory: [] }),
      
      addConsultation: (consultation) =>
        set((state) => ({
          consultations: [consultation, ...state.consultations],
        })),
      
      setConsultations: (consultations) =>
        set({ consultations }),
      
      setIsAnalyzing: (isAnalyzing) =>
        set({ isAnalyzing }),
      
      setError: (error) =>
        set({ error }),
      
      clearCurrentConsultation: () =>
        set({
          currentConsultation: null,
          currentSymptoms: [],
          currentInsight: null,
          conversationHistory: [],
        }),
      
      resetHealthState: () =>
        set({
          currentSymptoms: [],
          currentInsight: null,
          currentConsultation: null,
          conversationHistory: [],
          isAnalyzing: false,
          error: null,
        }),
    }),
    {
      name: 'health-storage',
      partialize: (state) => ({
        consultations: state.consultations,
        currentConsultation: state.currentConsultation,
      }),
    }
  )
)
