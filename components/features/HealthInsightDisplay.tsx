'use client'

/**
 * Health Insight Display Component
 * 
 * Component for displaying AI-generated health insights with severity levels,
 * confidence scores, recommendations, and medical disclaimers
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HealthInsight, Recommendation } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { SEVERITY_COLORS, MEDICAL_DISCLAIMERS } from '@/lib/constants'
import { AlertTriangle, Heart, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface HealthInsightDisplayProps {
  insight: HealthInsight
  isLoading?: boolean
}

/**
 * Map severity to icon component
 */
const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'emergency':
      return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
    case 'high':
      return <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
    case 'moderate':
      return <Heart className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
    case 'low':
      return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
    default:
      return <CheckCircle className="w-5 h-5" />
  }
}

/**
 * Get severity label
 */
const getSeverityLabel = (severity: string): string => {
  return severity.charAt(0).toUpperCase() + severity.slice(1)
}

/**
 * Get priority badge styling
 */
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border-red-300 dark:border-red-700'
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100 border-orange-300 dark:border-orange-700'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-300 dark:border-yellow-700'
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-300 dark:border-green-700'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
  }
}

/**
 * HealthInsightDisplay Component
 * Displays AI-generated health insights with rich formatting
 */
export const HealthInsightDisplay: React.FC<HealthInsightDisplayProps> = ({
  insight,
  isLoading = false,
}) => {
  const [expandedRecommendations, setExpandedRecommendations] = useState<Set<string>>(new Set())

  const toggleRecommendation = (id: string) => {
    const newExpanded = new Set(expandedRecommendations)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRecommendations(newExpanded)
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto space-y-4"
    >
      {/* Medical Disclaimer */}
      <Alert className="border-red-200 bg-red-50 dark:bg-red-950 border-l-4 border-l-red-500">
        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
        <AlertTitle className="text-red-900 dark:text-red-100">Medical Disclaimer</AlertTitle>
        <AlertDescription className="text-red-800 dark:text-red-200">
          {insight.disclaimer || MEDICAL_DISCLAIMERS.AI_NOT_DIAGNOSIS}
        </AlertDescription>
      </Alert>

      {/* Severity Assessment Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className={`border-2 ${SEVERITY_COLORS[insight.severity as keyof typeof SEVERITY_COLORS]}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getSeverityIcon(insight.severity)}
                <div>
                  <CardTitle>Severity Assessment</CardTitle>
                  <CardDescription>Based on reported symptoms</CardDescription>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getPriorityColor(insight.severity)}>
                  {getSeverityLabel(insight.severity)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Confidence Level:</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500 dark:bg-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${insight.confidence}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                <span className="text-sm font-bold">{insight.confidence}%</span>
              </div>
            </div>
            {insight.severity === 'emergency' && (
              <Alert className="border-red-300 bg-red-50 dark:bg-red-900">
                <AlertDescription className="text-red-900 dark:text-red-100">
                  <strong>⚠️ Emergency Warning:</strong> {MEDICAL_DISCLAIMERS.EMERGENCY}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Symptoms Summary */}
      {insight.symptoms && insight.symptoms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reported Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insight.symptoms.map((symptom, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  >
                    <Badge variant="secondary">{symptom}</Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Possible Conditions */}
      {insight.possibleConditions && insight.possibleConditions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Possible Conditions</CardTitle>
              <CardDescription>Listed by likelihood (not a diagnosis)</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {insight.possibleConditions.map((condition, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                  >
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 rounded-full text-sm font-semibold">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{condition}</span>
                  </motion.li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recommendations */}
      {insight.recommendations && insight.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold">Recommendations</h3>
          <AnimatePresence>
            {insight.recommendations.map((rec: Recommendation, idx: number) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
              >
                <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => toggleRecommendation(rec.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleRecommendation(rec.id)
                    }
                  }}
                  aria-expanded={expandedRecommendations.has(rec.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">
                          Type: {rec.actionType}
                        </CardDescription>
                      </div>
                      <button
                        className="text-gray-600 dark:text-gray-400 flex-shrink-0"
                        aria-label="Toggle recommendation details"
                      >
                        {expandedRecommendations.has(rec.id) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </CardHeader>
                  <AnimatePresence>
                    {expandedRecommendations.has(rec.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {rec.description}
                          </p>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Professional Consultation Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-900 dark:text-blue-100">
            Professional Consultation Recommended
          </AlertTitle>
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            {MEDICAL_DISCLAIMERS.CONSULT_DOCTOR} For any serious health concerns, please seek
            immediate medical attention from a qualified healthcare professional.
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Suggested Actions */}
      {insight.suggestedActions && insight.suggestedActions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {insight.suggestedActions.map((action, idx) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.05 }}
                >
                  <Button
                    variant={action.type === 'emergency' ? 'destructive' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => {
                      if (action.url) {
                        window.open(action.url, '_blank')
                      }
                    }}
                    aria-label={action.label}
                  >
                    {action.label}
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

export default HealthInsightDisplay
