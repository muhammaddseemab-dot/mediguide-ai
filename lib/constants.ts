/**
 * Application Constants
 * 
 * Global constants used throughout the MediGuide AI application
 */

/**
 * Language constants
 */
export const LANGUAGES = {
  EN: 'en',
  HI: 'hi',
  MR: 'mr',
} as const

export const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
} as const

/**
 * Theme constants
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

/**
 * Severity levels
 */
export const SEVERITY_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high',
  EMERGENCY: 'emergency',
} as const

export const SEVERITY_COLORS = {
  low: 'bg-green-100 text-green-800 border-green-300',
  moderate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  emergency: 'bg-red-100 text-red-800 border-red-300',
} as const

/**
 * User roles
 */
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  HEALTHCARE_PROVIDER: 'healthcare_provider',
} as const

/**
 * Duration options for symptoms
 */
export const SYMPTOM_DURATIONS = [
  { value: '0-24h', label: 'Less than 24 hours' },
  { value: '1-3d', label: '1-3 days' },
  { value: '4-7d', label: '4-7 days' },
  { value: '1-2w', label: '1-2 weeks' },
  { value: '2-4w', label: '2-4 weeks' },
  { value: '4w+', label: 'More than 4 weeks' },
] as const

/**
 * Symptom severity levels
 */
export const SYMPTOM_SEVERITIES = [
  { value: 'mild', label: 'Mild' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe', label: 'Severe' },
] as const

/**
 * Common symptoms
 */
export const COMMON_SYMPTOMS = [
  'Fever',
  'Cough',
  'Sore Throat',
  'Headache',
  'Body Aches',
  'Fatigue',
  'Shortness of Breath',
  'Loss of Taste',
  'Loss of Smell',
  'Nausea',
  'Vomiting',
  'Diarrhea',
  'Chest Pain',
  'Abdominal Pain',
  'Skin Rash',
] as const

/**
 * Emergency keywords - symptoms that require immediate attention
 */
export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'difficulty breathing',
  'shortness of breath',
  'choking',
  'severe bleeding',
  'unconscious',
  'seizure',
  'severe allergic reaction',
  'poisoning',
  'overdose',
  'severe trauma',
  'broken bone',
  'severe burns',
  'stroke',
  'heart attack',
] as const

/**
 * Blood types
 */
export const BLOOD_TYPES = [
  'O+',
  'O-',
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
] as const

/**
 * Gender options
 */
export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
] as const

/**
 * Relationship options for emergency contacts
 */
export const EMERGENCY_CONTACT_RELATIONSHIPS = [
  'Parent',
  'Spouse',
  'Sibling',
  'Child',
  'Friend',
  'Colleague',
  'Doctor',
  'Neighbor',
  'Other',
] as const

/**
 * Medicine order statuses
 */
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'In Transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
} as const

/**
 * Route paths
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SYMPTOMS: '/dashboard/symptoms',
  HEALTH_HISTORY: '/dashboard/health-history',
  PROFILE: '/dashboard/profile',
  MARKETPLACE: '/dashboard/marketplace',
  CONSULTATIONS: '/dashboard/consultations',
  SETTINGS: '/dashboard/settings',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
} as const

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  PROFILE: '/api/profile',
  SYMPTOMS: '/api/symptoms',
  HEALTH_ANALYSIS: '/api/symptoms/analyze',
  EMERGENCY_CHECK: '/api/symptoms/emergency',
  CONSULTATION: '/api/consultations',
  MEDICINES: '/api/medicines',
  ORDERS: '/api/orders',
  VERIFY_EMAIL: '/api/auth/verify-email',
  SEND_PASSWORD_RESET: '/api/auth/send-password-reset',
  RESET_PASSWORD: '/api/auth/reset-password',
} as const

/**
 * Medical disclaimers
 */
export const MEDICAL_DISCLAIMERS = {
  AI_NOT_DIAGNOSIS: 'AI-powered health insights are not medical diagnoses and should not be used as a substitute for professional medical advice.',
  CONSULT_DOCTOR: 'For serious health concerns, always consult a qualified healthcare professional.',
  EMERGENCY: 'In case of medical emergency, contact emergency services immediately or visit the nearest emergency department.',
  EMERGENCY_HOTLINE: 'In India, call 112 for emergency services or 1075 for ambulance.',
} as const

/**
 * Validation constants
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_AGE: 1,
  MAX_AGE: 150,
  MAX_SYMPTOMS: 10,
  MIN_SYMPTOMS: 1,
  MAX_NOTES_LENGTH: 500,
  MIN_PHONE_LENGTH: 7,
} as const

/**
 * Timeout constants (in milliseconds)
 */
export const TIMEOUTS = {
  DEBOUNCE: 300,
  REQUEST: 30000, // 30 seconds
  SESSION: 24 * 60 * 60 * 1000, // 24 hours
  API_CALL: 5000, // 5 seconds for AI response
} as const

/**
 * Cache constants
 */
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  CONSULTATIONS: 'consultations',
  MEDICINES: 'medicines',
  HEALTH_INSIGHTS: 'health_insights',
  USER_PREFERENCES: 'user_preferences',
} as const

/**
 * Feature flags
 */
export const FEATURE_FLAGS = {
  ENABLE_EMERGENCY_ALERTS: true,
  ENABLE_MEDICINE_MARKETPLACE: true,
  ENABLE_MULTI_LANGUAGE: true,
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
} as const

/**
 * Pagination constants
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

/**
 * AI/Gemini API constants
 */
export const AI_CONFIG = {
  MODEL: 'gemini-pro',
  MAX_OUTPUT_TOKENS: 1024,
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
  TOP_K: 40,
} as const

/**
 * Health data retention periods (in days)
 */
export const DATA_RETENTION = {
  CONSULTATION_HISTORY: 365, // 1 year
  EMERGENCY_LOGS: 730, // 2 years
  ANALYTICS: 90, // 3 months
  SESSION_LOGS: 30, // 1 month
} as const

/**
 * Performance constants
 */
export const PERFORMANCE = {
  TARGET_LOAD_TIME: 3000, // 3 seconds
  TARGET_API_RESPONSE: 5000, // 5 seconds
  TARGET_EMERGENCY_RESPONSE: 2000, // 2 seconds
} as const
