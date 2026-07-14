/**
 * Core type definitions for MediGuide AI platform
 */

export type Language = 'en' | 'hi' | 'mr'
export type Theme = 'light' | 'dark'
export type Severity = 'low' | 'moderate' | 'high' | 'emergency'
export type UserRole = 'user' | 'admin' | 'healthcare_provider'

/**
 * Health Insight interface representing AI analysis results
 */
export interface HealthInsight {
  severity: Severity
  confidence: number // 0-100
  recommendations: Recommendation[]
  disclaimer: string
  suggestedActions: Action[]
  symptoms: string[]
  possibleConditions?: string[]
  createdAt: Date
}

export interface Recommendation {
  id: string
  title: string
  description: string
  actionType: 'medicine' | 'lifestyle' | 'consultation' | 'emergency'
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export interface Action {
  id: string
  label: string
  url?: string
  type: 'button' | 'link' | 'emergency'
}

/**
 * Emergency detection and response
 */
export interface EmergencyAssessment {
  isEmergency: boolean
  confidence: number
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  symptoms: string[]
  emergencyContacts: EmergencyContact[]
  nearbyHospitals: Hospital[]
  instructions: string[]
  estimatedResponse: string
}

export interface EmergencyContact {
  id: string
  name: string
  phone: string
  type: 'ambulance' | 'police' | 'fire' | 'custom'
}

export interface Hospital {
  id: string
  name: string
  address: string
  phone: string
  distance: number
  emergencyDepartment: boolean
}

/**
 * User and Profile interfaces
 */
export interface UserProfile {
  id: string
  email: string
  name: string
  age?: number
  gender?: 'male' | 'female' | 'other'
  language: Language
  theme: Theme
  role: UserRole
  allergies: string[]
  medications: Medication[]
  chronicConditions: string[]
  emergencyContacts: EmergencyContact[]
  createdAt: Date
  updatedAt: Date
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: Date
  endDate?: Date
  prescriber?: string
}

/**
 * Medicine Marketplace interfaces
 */
export interface Medicine {
  id: string
  name: string
  genericName: string
  dosage: string
  price: Price
  availability: boolean
  prescriptionRequired: boolean
  manufacturer: string
  sideEffects: string[]
  contraindications: string[]
  rating?: number
  reviewCount?: number
}

export interface Price {
  amount: number
  currency: string
  originalPrice?: number
  discount?: number
}

export interface MedicineOrder {
  id: string
  userId: string
  medicines: MedicineOrderItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  trackingNumber?: string
  createdAt: Date
  deliveredAt?: Date
}

export interface MedicineOrderItem {
  medicineId: string
  medicine?: Medicine
  quantity: number
  unitPrice: number
}

/**
 * Consultation and conversation history
 */
export interface Consultation {
  id: string
  userId: string
  symptoms: string[]
  aiAnalysis: HealthInsight
  conversationHistory: ConversationMessage[]
  emergencyDetected: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, any>
  }
  meta?: {
    timestamp: Date
    requestId: string
  }
}

/**
 * Pagination
 */
export interface PaginationParams {
  page: number
  pageSize: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * Service Response Types
 */
export interface SymptomAnalysisResponse {
  insight: HealthInsight
  relatedMedicines: Medicine[]
  consultationId: string
}

export interface EmergencyDetectionResponse {
  isEmergency: boolean
  assessment: EmergencyAssessment
  immediateActions: string[]
}

export interface MedicineSearchResponse {
  medicines: Medicine[]
  total: number
  filters: MedicineFilter
}

export interface MedicineFilter {
  prescriptionRequired?: boolean
  availability?: boolean
  priceRange?: {
    min: number
    max: number
  }
  manufacturer?: string
}

/**
 * Error Types
 */
export interface ApiError {
  code: string
  message: string
  status: number
  details?: Record<string, any>
  timestamp: Date
  requestId: string
}

export interface ValidationError extends ApiError {
  validationErrors: Record<string, string[]>
}

export interface AuthenticationError extends ApiError {
  code: 'UNAUTHORIZED' | 'INVALID_CREDENTIALS' | 'SESSION_EXPIRED'
}

export interface AuthorizationError extends ApiError {
  code: 'FORBIDDEN' | 'INSUFFICIENT_PERMISSIONS'
  requiredRole?: UserRole[]
}

export interface NotFoundError extends ApiError {
  code: 'NOT_FOUND'
  resourceType: string
  resourceId: string
}

export interface ConflictError extends ApiError {
  code: 'CONFLICT'
  reason: string
}

export interface RateLimitError extends ApiError {
  code: 'RATE_LIMIT_EXCEEDED'
  retryAfter: number
}

/**
 * Form Validation Types
 */
export interface FormValidationState {
  [key: string]: {
    touched: boolean
    error?: string
    value: any
  }
}

export interface FormSubmitResult {
  success: boolean
  errors?: Record<string, string>
  data?: any
}

/**
 * Cache Types
 */
export interface CacheEntry<T> {
  data: T
  timestamp: Date
  expiresAt: Date
}

export interface CacheConfig {
  duration: number // milliseconds
  key: string
}

/**
 * Analytics Types
 */
export interface AnalyticsEvent {
  id: string
  userId?: string
  eventType: string
  eventName: string
  properties: Record<string, any>
  timestamp: Date
  sessionId: string
}

export interface UserAnalytics {
  totalConsultations: number
  emergencyDetectionCount: number
  medicineOrderCount: number
  lastConsultationDate?: Date
  averageSessionDuration: number
  returnRate: number
}

/**
 * Notification Types
 */
export interface Notification {
  id: string
  userId: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  actionUrl?: string
  read: boolean
  createdAt: Date
  expiresAt?: Date
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
  inApp: boolean
  appointmentReminders: boolean
  healthTips: boolean
  medicineReminders: boolean
  emergencyAlerts: boolean
}

/**
 * Location Types
 */
export interface GeolocationData {
  latitude: number
  longitude: number
  accuracy?: number
  timestamp: Date
}

export interface LocationInfo {
  city: string
  state: string
  country: string
  postalCode: string
}

/**
 * Insurance Types
 */
export interface InsuranceInfo {
  id: string
  userId: string
  provider: string
  policyNumber: string
  groupNumber?: string
  planName: string
  coverageStartDate: Date
  coverageEndDate: Date
  isCurrent: boolean
}

/**
 * Lab Report Types
 */
export interface LabReport {
  id: string
  userId: string
  testName: string
  testDate: Date
  results: Record<string, any>
  referenceRange?: Record<string, string>
  status: 'normal' | 'abnormal' | 'critical'
  downloadUrl?: string
  createdAt: Date
}

/**
 * Appointment Types
 */
export interface Appointment {
  id: string
  userId: string
  doctorId?: string
  doctorName?: string
  appointmentDate: Date
  duration: number // minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  notes?: string
  location?: string
  meetingUrl?: string
  createdAt: Date
}

/**
 * Prescription Types
 */
export interface Prescription {
  id: string
  userId: string
  doctorId?: string
  medicines: PrescriptionMedicine[]
  issueDate: Date
  expiryDate: Date
  isActive: boolean
  notes?: string
}

export interface PrescriptionMedicine {
  medicineId: string
  medicineName: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
}
