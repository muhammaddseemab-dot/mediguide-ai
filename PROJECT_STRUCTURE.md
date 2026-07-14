# MediGuide AI - Project Structure Documentation

## Overview

This document describes the complete project structure for MediGuide AI, set up in Task 1.3.

## Directory Structure

```
mediguide-ai/
├── app/
│   ├── (auth)/                 # Authentication routes
│   │   └── layout.tsx          # Auth layout for login, register pages
│   ├── (dashboard)/            # Protected dashboard routes
│   │   └── layout.tsx          # Dashboard layout with sidebar
│   ├── api/                    # API routes directory
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── forms/                  # Form components (React Hook Form)
│   ├── layout/                 # Layout components (Header, Footer, Sidebar)
│   └── features/               # Feature-specific components
├── lib/
│   ├── ai/
│   │   └── gemini.ts          # Gemini API integration
│   ├── auth/
│   │   └── config.ts          # Authentication configuration
│   ├── db/
│   │   ├── client.ts          # Database client
│   │   └── queries.ts         # Database query utilities
│   ├── validations/
│   │   ├── auth.ts            # Auth form schemas (Zod)
│   │   ├── symptom.ts         # Symptom form schemas
│   │   └── profile.ts         # Profile form schemas
│   ├── constants.ts           # Global application constants
│   ├── errors.ts              # Error handling utilities
│   ├── type-guards.ts         # Runtime type checking
│   ├── utils.ts               # General utilities
│   └── validators.ts          # Validation functions
├── types/
│   └── index.ts               # TypeScript type definitions
├── hooks/
│   ├── useTheme.ts            # Theme management hook
│   ├── useLanguage.ts         # Language management hook
│   ├── useAuth.ts             # Authentication hook
│   └── useApi.ts              # API call hook with error handling
├── stores/
│   ├── useAuthStore.ts        # Zustand auth store
│   ├── useUIStore.ts          # Zustand UI store
│   └── useHealthStore.ts      # Zustand health data store
├── prisma/
│   └── schema.prisma          # Database schema
├── .kiro/
│   └── specs/
│       └── mediguide-ai/      # Specification documents
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── package.json
└── README.md
```

## Key Features Implemented

### 1. TypeScript Interfaces (types/index.ts)

- **Core Types**: Language, Theme, Severity, UserRole
- **Domain Models**: 
  - HealthInsight (AI analysis results)
  - UserProfile (user data)
  - Medicine (marketplace items)
  - Consultation (health consultation records)
  - EmergencyAssessment (emergency detection results)
- **API Response Types**: ApiResponse, PaginatedResponse
- **Service Response Types**: SymptomAnalysisResponse, EmergencyDetectionResponse, MedicineSearchResponse
- **Error Types**: ValidationError, AuthenticationError, AuthorizationError, NotFoundError, RateLimitError
- **Additional Types**: Analytics, Notifications, Appointments, Prescriptions, Lab Reports, Insurance Info

### 2. Validation Schemas (lib/validations/)

#### auth.ts
- `loginSchema` - Login form validation
- `registerSchema` - Registration with password strength
- `passwordResetRequestSchema` - Password reset request
- `passwordResetSchema` - Password reset form
- `emailVerificationSchema` - Email verification code

#### symptom.ts
- `symptomInputSchema` - Symptom input validation
- `followUpQuestionSchema` - Follow-up questions
- `medicalHistorySchema` - Medical history data
- `healthInsightFeedbackSchema` - Feedback on insights
- `emergencyReportSchema` - Emergency reporting

#### profile.ts
- `personalInfoSchema` - Personal information
- `healthProfileSchema` - Health profile data
- `emergencyContactSchema` - Emergency contact details
- `preferencesSchema` - User preferences
- `updateProfileSchema` - Profile updates
- `addressSchema` - Address information

### 3. Custom Hooks (hooks/)

#### useTheme.ts
- Manages light/dark theme switching
- Persists theme preference to localStorage
- Detects system theme preference

#### useLanguage.ts
- Manages language selection (EN, HI, MR)
- Browser language detection
- Language persistence
- Language validation

#### useAuth.ts
- User authentication state management
- Login, register, logout functions
- Profile update functionality
- Role-based access checking
- Error handling with callbacks

#### useApi.ts
- Generic API request hook
- Supports GET, POST, PUT, DELETE
- Request timeout handling
- Error state management
- Health-specific API hook (analyzeSymptoms, checkEmergency)

### 4. State Management Stores (stores/)

#### useAuthStore.ts (Zustand)
- User profile state
- Loading and error states
- Auth actions (setUser, logout)
- Persistent storage

#### useUIStore.ts (Zustand)
- Language preference
- Theme preference
- Sidebar state
- Non-persistent store

#### useHealthStore.ts (Zustand)
- Current symptoms
- Current health insight
- Consultation history
- Conversation history
- Emergency detection state
- Persistent consultation data

### 5. Utility Functions (lib/)

#### utils.ts
- `cn()` - Tailwind class merging
- `formatDate()` - Date formatting
- `formatDateTime()` - Date and time formatting
- `formatCurrency()` - Currency formatting
- `truncateString()` - String truncation
- `capitalize()` - String capitalization
- `generateId()` - Unique ID generation
- `debounce()` - Function debouncing
- `isValidEmail()` - Email validation
- `isStrongPassword()` - Password strength check
- `getPasswordStrengthFeedback()` - Password feedback

#### constants.ts
- Language constants and names
- Theme constants
- Severity levels with colors
- User roles
- Symptom durations and severities
- Emergency keywords
- Blood types, genders, relationships
- Medicine order statuses
- Route paths and API endpoints
- Medical disclaimers
- Validation constants
- Timeout and cache settings
- Feature flags
- Pagination defaults
- AI/Gemini configuration
- Performance targets

#### validators.ts
- `validateEmail()` - Email validation
- `validatePhone()` - Phone number validation
- `validatePasswordStrength()` - Password strength validation
- `getPasswordStrengthFeedback()` - Detailed password feedback
- `validateUrl()` - URL validation
- `validateAge()` - Age validation
- `validatePostalCode()` - Postal code validation
- `validateCreditCard()` - Credit card validation (Luhn)
- `validateLength()` - String length validation
- `validateRequired()` - Required field validation
- `sanitizeHtml()` - HTML sanitization
- `validateBloodType()` - Blood type validation
- `validateGender()` - Gender validation
- `validateLanguageCode()` - Language code validation
- `validateSeverity()` - Severity level validation
- Date validation functions

#### errors.ts
- `AppError` - Base error class
- `ValidationErrorClass` - Validation errors
- `AuthenticationErrorClass` - Auth errors
- `AuthorizationErrorClass` - Permission errors
- `NotFoundErrorClass` - 404 errors
- `RateLimitErrorClass` - Rate limit errors
- `handleApiError()` - Error conversion
- `formatErrorMessage()` - User-friendly error messages
- `logError()` - Error logging
- `createErrorResponse()` - API error responses
- `assert()` - Assertion utility

#### type-guards.ts
- Type guards for all core types
- `isLanguage()`, `isTheme()`, `isSeverity()`, etc.
- `isUserProfile()`, `isHealthInsight()`, `isMedicine()`
- `isApiError()`, `isValidationError()`, `isAuthenticationError()`
- Generic type guards: `isArray()`, `isString()`, `isNumber()`, `isDate()`
- Utility guards: `isNonNull()`, `isNonEmptyString()`, `isPositiveNumber()`

### 6. Application Routes (app/)

#### (auth) Layout
- Parent layout for authentication pages
- Centered form layout with gradient background

#### (dashboard) Layout
- Protected dashboard layout
- Prepared for sidebar and main content

#### api/
- Directory for API routes (to be implemented)

## Type Safety & Code Quality

### Features
- ✅ Full TypeScript strict mode enabled
- ✅ Zod runtime validation schemas
- ✅ Runtime type guards for all types
- ✅ Comprehensive error types and handling
- ✅ JSDoc comments on all functions
- ✅ Organized validation schemas by domain
- ✅ Type-safe API responses

### Dependencies
- `zod` - Schema validation
- `zustand` - State management
- `react-hook-form` - Form handling
- `axios` - HTTP client (configured)
- `next-intl` - Internationalization
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `lucide-react` - Icons

## Testing Infrastructure

TypeScript compilation verified successfully. Project structure ready for:
- Unit tests (Jest configured)
- Property-based tests (fast-check included)
- Integration tests
- Component tests

## Next Steps (Task 1.4+)

1. **UI Components** - shadcn/ui installation and customization
2. **Form Components** - React Hook Form + Zod integration
3. **Authentication Flow** - NextAuth.js setup and pages
4. **API Routes** - REST endpoints implementation
5. **Database** - Prisma migrations and queries
6. **Internationalization** - next-intl integration
7. **Testing** - Test suites for all components

## Design Patterns Used

1. **Custom Hooks** - Encapsulation of stateful logic
2. **Zustand Stores** - Global state management
3. **Type Guards** - Runtime type safety
4. **Error Handling** - Structured error classes
5. **Validation Schemas** - Zod schemas for data validation
6. **Constants** - Centralized configuration
7. **Utility Functions** - Reusable helper functions

## Notes

- All files include comprehensive JSDoc comments
- TypeScript strict mode enabled
- No runtime errors - fully type-safe
- Ready for implementation of remaining tasks
- Constants organized by feature domain
- Error handling provides detailed context
