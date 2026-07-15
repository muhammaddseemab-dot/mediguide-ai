# MediGuide AI - System Architecture

## Overview

MediGuide AI is a full-stack healthcare platform built with Next.js 14, leveraging Google's Gemini AI for intelligent symptom analysis. The architecture follows a modern serverless pattern with API routes handling backend logic and React components managing the frontend experience.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Browser (Next.js App Router)                      │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │    │
│  │  │  Home    │ │ Symptom  │ │ Hospital │ │ Medicine │ │  Admin   │  │    │
│  │  │  Page    │ │ Checker  │ │  Finder  │ │ Market   │ │Dashboard │  │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION LAYER                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Next.js 14 App Router                             │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │                    Context Providers                          │    │    │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │    │    │
│  │  │  │   Theme      │  │   Language   │  │     Public        │   │    │    │
│  │  │  │   Provider   │  │   Provider   │  │     Layout        │   │    │    │
│  │  │  └──────────────┘  └──────────────┘  └──────────────────┘   │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      API Routes (Route Handlers)                     │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────────┐    │    │
│  │  │ /api/symptoms/ │  │  /api/auth/    │  │   /api/profile/    │    │    │
│  │  │   analyze      │  │  register      │  │   personal         │    │    │
│  │  │   emergency    │  │  verify-email  │  │   health           │    │    │
│  │  └────────────────┘  └────────────────┘  └────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL SERVICES                                  │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │   Google Gemini AI   │  │    Browser APIs      │  │   LocalStorage   │  │
│  │   (Symptom Analysis) │  │   (Geolocation)      │  │   (Session Data) │  │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
MediGuide AI/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── layout.tsx           # Auth layout wrapper
│   │   ├── signin/page.tsx      # Sign in page
│   │   └── signup/page.tsx      # Sign up page
│   │
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── layout.tsx           # Dashboard layout
│   │   └── profile/page.tsx     # User profile page
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/                # Authentication endpoints
│   │   │   ├── [...nextauth]/   # NextAuth.js handler
│   │   │   ├── register/        # User registration
│   │   │   ├── verify-email/    # Email verification
│   │   │   ├── forgot-password/ # Password reset
│   │   │   └── resend-verification/
│   │   │
│   │   ├── symptoms/            # Symptom analysis
│   │   │   ├── analyze/         # Gemini AI analysis
│   │   │   └── emergency/       # Emergency detection
│   │   │
│   │   └── profile/             # User profile management
│   │       ├── personal/        # Personal info
│   │       ├── health/          # Health data
│   │       └── emergency-contacts/
│   │
│   ├── admin/                    # Admin dashboard
│   │   ├── page.tsx             # Admin home
│   │   ├── analytics/           # Analytics dashboard
│   │   ├── medicines/           # Medicine management
│   │   └── users/               # User management
│   │
│   ├── symptom-checker/          # Main feature page
│   ├── hospital-finder/          # Hospital locator
│   ├── marketplace/              # Medicine marketplace
│   ├── emergency-hotlines/       # Emergency contacts
│   ├── checkout/                 # Checkout flow
│   ├── order-tracking/           # Order status
│   ├── settings/                 # User settings
│   ├── notification-preferences/ # Notification config
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── faq/                      # FAQ page
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   │
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Navigation header
│   │   └── LayoutWrapper.tsx    # Layout wrapper
│   │
│   ├── providers/               # Context providers
│   │   └── index.tsx            # Theme provider
│   │
│   └── ui/                      # UI components
│       └── [shared components]
│
├── lib/                         # Utilities and helpers
│   ├── LanguageContext.tsx      # i18n context provider
│   └── [utility files]
│
├── public/                      # Static assets
├── styles/                      # Additional styles
├── .env.local                   # Environment variables
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.js               # Next.js configuration
```

---

## Core Components

### 1. Frontend Layer

#### Pages (App Router)
| Route | Description | Key Features |
|-------|-------------|--------------|
| `/` | Home page | Hero section, feature highlights, CTA |
| `/symptom-checker` | Main feature | AI-powered symptom input and analysis |
| `/hospital-finder` | Location services | Nearby hospitals with geolocation |
| `/marketplace` | Medicine catalog | Browse, search, add to cart |
| `/checkout` | Purchase flow | Cart review, payment form |
| `/admin/*` | Admin dashboard | Analytics, user management, medicine catalog |
| `/profile` | User profile | Personal info, health data, emergency contacts |

#### Context Providers
```typescript
// Provider hierarchy
<ThemeProvider>
  <LanguageProvider>
    <PublicLayout>
      {children}
    </PublicLayout>
  </LanguageProvider>
</ThemeProvider>
```

| Provider | Purpose | State |
|----------|---------|-------|
| ThemeProvider | Dark/light mode | theme, setTheme |
| LanguageProvider | i18n support | language, setLanguage, t() |
| PublicLayout | Layout wrapper | Navigation, footer |

---

### 2. API Layer

#### Symptom Analysis API
```
POST /api/symptoms/analyze

Request:
{
  "symptoms": "string",
  "userId": "string (optional)"
}

Response:
{
  "analysis": {
    "conditions": [
      { "name": "string", "confidence": "number", "description": "string" }
    ],
    "recommendations": ["string"],
    "urgencyLevel": "low" | "medium" | "high" | "emergency",
    "disclaimer": "string"
  }
}
```

#### Emergency Detection API
```
POST /api/symptoms/emergency

Request:
{
  "symptoms": "string"
}

Response:
{
  "isEmergency": boolean,
  "severity": "critical" | "moderate" | "low",
  "matchedKeywords": ["string"],
  "emergencyContacts": {
    "ambulance": "string",
    "emergency": "string"
  },
  "recommendedAction": "string"
}
```

#### Authentication APIs
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | Create new user account |
| `/api/auth/verify-email` | POST | Verify email address |
| `/api/auth/forgot-password` | POST | Request password reset |
| `/api/auth/reset-password` | POST | Reset password |
| `/api/auth/resend-verification` | POST | Resend verification email |
| `/api/auth/[...nextauth]` | * | NextAuth.js handlers |

#### Profile APIs
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/profile` | GET/PUT | Get/update user profile |
| `/api/profile/personal` | PUT | Update personal information |
| `/api/profile/health` | PUT | Update health data |
| `/api/profile/emergency-contacts` | PUT | Update emergency contacts |

---

### 3. External Integrations

#### Google Gemini AI
```typescript
// Integration flow
const analyzeSymptoms = async (symptoms: string) => {
  const prompt = `
    You are a medical assistant. Analyze the following symptoms
    and provide a structured assessment.
    
    Symptoms: ${symptoms}
    
    Respond in JSON format with:
    - conditions (array of possible conditions with confidence)
    - recommendations (array of actionable advice)
    - urgencyLevel (low/medium/high/emergency)
  `;
  
  const response = await geminiModel.generateContent(prompt);
  return JSON.parse(response.text());
};
```

#### Geolocation API
```typescript
// Hospital finder implementation
const getNearbyHospitals = async () => {
  const position = await navigator.geolocation.getCurrentPosition();
  const { latitude, longitude } = position.coords;
  
  // Fetch hospitals within radius
  return fetchHospitals(latitude, longitude);
};
```

#### LocalStorage
```typescript
// Session management
const storageKeys = {
  currentUser: 'currentUser',      // User session data
  language: 'language',            // Language preference
  rememberMe: 'rememberMe',        // Persist session
  cart: 'mediguide_cart'          // Shopping cart
};
```

---

## Data Flow

### Symptom Analysis Flow
```
User Input → Client Validation → API Request → Gemini AI → Response Processing → UI Render
     │              │                  │              │              │               │
     │              │                  │              │              │               │
     ▼              ▼                  ▼              ▼              ▼               ▼
  Text Area    Format Check    Rate Limiting   AI Analysis   Structuring    Results Display
                                 & Auth                        & Caching
```

### Authentication Flow
```
Registration:
Form Submit → /api/auth/register → Validation → Create User → Send Verification Email → Success

Login:
Credentials → NextAuth.js → Validate → Create Session → Store in LocalStorage → Redirect

Password Reset:
Email Input → /api/auth/forgot-password → Generate Token → Send Email → User Clicks Link
→ /api/auth/reset-password → Validate Token → Update Password → Redirect to Login
```

### Emergency Detection Flow
```
Symptom Input → Keyword Scan → Severity Assessment → Alert Generation
      │              │                  │                     │
      ▼              ▼                  ▼                     ▼
   Text          Pattern          Score Calc            Display Alert
   Analysis      Matching         (0-100)               + Emergency #
```

---

## Security Architecture

### Authentication
- Credential-based authentication with NextAuth.js patterns
- Password hashing with bcrypt
- Email verification required for account activation
- Session management via localStorage (client) and API tokens (server)

### API Security
```typescript
// Rate limiting middleware (conceptual)
const rateLimiter = {
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100                     // requests per window
};

// Input validation
const schemas = {
  symptomAnalysis: z.object({
    symptoms: z.string().min(10).max(2000),
    userId: z.string().optional()
  })
};
```

### Data Protection
- All API routes validate input with Zod schemas
- Sensitive data (passwords, health info) encrypted at rest
- HTTPS enforced in production
- No medical data stored permanently (stateless analysis)

---

## Performance Optimization

### Frontend
- **Code Splitting**: Automatic with App Router
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Next.js Image component
- **Caching**: Static assets with Cache-Control headers

### Backend
- **Server Components**: Reduce client bundle size
- **API Response Caching**: Cache Gemini AI responses for common symptoms
- **Edge Runtime**: API routes can run on edge for lower latency

### Database Strategy (Future)
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Users     │     │   Health    │     │   Orders    │
│   Table     │     │   Records   │     │   Table     │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       └───────────────────┴───────────────────┘
                           │
                    PostgreSQL / Supabase
```

---

## Deployment Architecture

### Production Deployment (Vercel)
```
┌─────────────────────────────────────────────────────────┐
│                     Vercel Edge Network                  │
│  ┌─────────────────┐    ┌─────────────────────────────┐│
│  │  Static Assets  │    │   Serverless Functions      ││
│  │  (CDN Cached)   │    │   (API Routes)              ││
│  └─────────────────┘    └─────────────────────────────┘│
│                          │                              │
│                          ▼                              │
│               ┌─────────────────────┐                   │
│               │  Environment Vars   │                   │
│               │  - GEMINI_API_KEY   │                   │
│               │  - NEXTAUTH_SECRET  │                   │
│               └─────────────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

### Environment Variables
```bash
# Required
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Optional
DATABASE_URL=your_database_url (future)
SMTP_HOST=your_smtp_host (future)
```

---

## Future Architecture Enhancements

### Phase 1: Database Integration
- Add PostgreSQL via Supabase or PlanetScale
- Implement persistent user data storage
- Add health records with encryption

### Phase 2: Real-time Features
- WebSocket integration for live chat
- Real-time order tracking
- Push notifications

### Phase 3: AI Enhancement
- Fine-tuned medical model
- Historical health data analysis
- Predictive health insights

### Phase 4: Mobile & Offline
- React Native mobile app
- Service Worker for offline support
- Local-first architecture

---

## Technical Specifications

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 14.2.3 |
| Runtime | React | 18.3.1 |
| Language | TypeScript | 5.4.5 |
| Styling | Tailwind CSS | 3.4.1 |
| AI | Google Gemini AI | 0.24.1 |
| Forms | React Hook Form | 7.81.0 |
| Validation | Zod | 4.4.3 |
| Animation | Framer Motion | 10.16.16 |
| Icons | Lucide React | 0.378.0 |

---

*Architecture documentation last updated: July 2024*
