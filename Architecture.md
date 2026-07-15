# MediGuide AI - System Architecture

## Overview

MediGuide AI is a full-stack healthcare platform built with Next.js 14, leveraging Google's Gemini AI for intelligent symptom analysis.

---

## Architecture Diagram

```mermaid
graph TB
    subgraph CLIENT["Client Layer"]
        BROWSER[Browser]
        HOME[Home Page]
        SYMPTOM[Symptom Checker]
        HOSPITAL[Hospital Finder]
        MARKET[Marketplace]
        ADMIN[Admin Dashboard]
    end

    subgraph APP["Application Layer - Next.js 14"]
        ROUTER[App Router]
        THEME[ThemeProvider]
        LANG[LanguageProvider]
        LAYOUT[PublicLayout]
    end

    subgraph API["API Layer"]
        ANALYZE[/api/symptoms/analyze]
        EMERGENCY[/api/symptoms/emergency]
        AUTH[/api/auth/*]
        PROFILE[/api/profile/*]
    end

    subgraph EXTERNAL["External Services"]
        GEMINI[Google Gemini AI]
        GEO[Geolocation API]
        LOCAL[LocalStorage]
    end

    CLIENT --> APP
    APP --> API
    API --> EXTERNAL
    
    BROWSER --> HOME
    BROWSER --> SYMPTOM
    BROWSER --> HOSPITAL
    BROWSER --> MARKET
    BROWSER --> ADMIN
    
    ROUTER --> THEME
    THEME --> LANG
    LANG --> LAYOUT
    
    SYMPTOM --> ANALYZE
    SYMPTOM --> EMERGENCY
    HOSPITAL --> GEO
    ADMIN --> AUTH
    ADMIN --> PROFILE
    
    ANALYZE --> GEMINI
    LOCAL -.-> LANG
```

---

## Data Flow Diagram

```mermaid
flowchart LR
    subgraph INPUT[User Input]
        A[Symptom Description]
    end
    
    subgraph CLIENT_PROCESS[Client Processing]
        B[Validation]
        C[Keyword Scan]
    end
    
    subgraph API_PROCESS[API Processing]
        D[Rate Limiting]
        E[Prompt Engineering]
    end
    
    subgraph AI[AI Analysis]
        F[Gemini API]
    end
    
    subgraph OUTPUT[Response]
        G[Structure Data]
        H[UI Render]
    end
    
    A --> B --> C --> D --> E --> F --> G --> H
    
    C -->|Emergency Keywords| I[Alert Generation]
    I --> H
```

---

## Component Architecture

```mermaid
graph TD
    subgraph ROOT[Root Layout]
        HTML[HTML Document]
        BODY[Body]
    end
    
    subgraph PROVIDERS[Context Providers]
        TP[ThemeProvider]
        LP[LanguageProvider]
    end
    
    subgraph PAGES[Pages]
        PG1[Home Page]
        PG2[Symptom Checker]
        PG3[Hospital Finder]
        PG4[Marketplace]
        PG5[Admin Dashboard]
        PG6[Profile]
    end
    
    subgraph COMPONENTS[Components]
        HDR[Header]
        FTR[Footer]
        FM[Forms]
        CRD[Cards]
    end
    
    HTML --> BODY
    BODY --> TP
    TP --> LP
    LP --> HDR
    LP --> PG1
    LP --> PG2
    LP --> PG3
    LP --> PG4
    LP --> PG5
    LP --> PG6
    LP --> FTR
    
    PG2 --> FM
    PG3 --> CRD
    PG4 --> CRD
```

---

## Directory Structure

```
MediGuide AI/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── profile/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── verify-email/route.ts
│   │   │   └── reset-password/route.ts
│   │   ├── symptoms/
│   │   │   ├── analyze/route.ts
│   │   │   └── emergency/route.ts
│   │   └── profile/
│   │       ├── personal/route.ts
│   │       ├── health/route.ts
│   │       └── emergency-contacts/route.ts
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── medicines/page.tsx
│   │   └── users/page.tsx
│   ├── symptom-checker/page.tsx
│   ├── hospital-finder/page.tsx
│   ├── marketplace/page.tsx
│   ├── emergency-hotlines/page.tsx
│   ├── checkout/page.tsx
│   ├── order-tracking/page.tsx
│   ├── settings/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── LayoutWrapper.tsx
│   └── providers/
│       └── index.tsx
├── lib/
│   └── LanguageContext.tsx
├── public/
├── .env.local
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## API Endpoints

### Symptom Analysis

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as API
    participant G as Gemini AI
    
    U->>C: Enter symptoms
    C->>C: Validate input
    C->>A: POST /api/symptoms/analyze
    A->>A: Rate limit check
    A->>G: Send prompt with symptoms
    G->>A: Return analysis
    A->>A: Parse JSON response
    A->>C: Return structured data
    C->>U: Display results
```

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/symptoms/analyze` | POST | AI-powered symptom analysis |
| `/api/symptoms/emergency` | POST | Emergency keyword detection |
| `/api/auth/register` | POST | User registration |
| `/api/auth/verify-email` | POST | Email verification |
| `/api/auth/reset-password` | POST | Password reset |
| `/api/profile` | GET/PUT | User profile management |

---

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as API
    participant S as Storage
    
    Note over U,S: Registration Flow
    U->>C: Submit registration form
    C->>A: POST /api/auth/register
    A->>A: Hash password
    A->>A: Create user
    A->>U: Send verification email
    U->>A: Click verification link
    A->>C: Redirect to login
    
    Note over U,S: Login Flow
    U->>C: Enter credentials
    C->>A: POST /api/auth/[...nextauth]
    A->>A: Validate credentials
    A->>C: Return session
    C->>S: Store in localStorage
    C->>U: Redirect to dashboard
```

---

## Emergency Detection System

```mermaid
flowchart TD
    A[Symptom Input] --> B{Keyword Scan}
    
    B -->|Critical| C[Chest Pain / Cannot Breathe / Severe Bleeding]
    B -->|Moderate| D[High Fever / Persistent Pain]
    B -->|Low| E[Mild Headache / Slight Discomfort]
    
    C --> F[Severity Score: 90-100]
    D --> G[Severity Score: 50-89]
    E --> H[Severity Score: 0-49]
    
    F --> I[Emergency Alert]
    G --> J[Urgent Care Recommended]
    H --> K[Monitor Symptoms]
    
    I --> L[Show Emergency Contacts]
    I --> M[Call Ambulance Prompt]
```

---

## State Management

```mermaid
graph LR
    subgraph CONTEXT[React Context]
        LANG_CTX[LanguageContext]
        THEME_CTX[ThemeProvider]
    end
    
    subgraph LOCAL[LocalStorage]
        LANG_DATA[language: en|hi|mr]
        USER_DATA[currentUser: {...}]
        CART_DATA[mediguide_cart: [...]]
    end
    
    LANG_CTX -->|persist| LANG_DATA
    LANG_DATA -->|hydrate| LANG_CTX
    
    USER_DATA -->|read| AUTH_STATE[Auth State]
    CART_DATA -->|read| CART_STATE[Cart State]
```

---

## Deployment Architecture

```mermaid
graph TB
    subgraph VERCEL[Vercel Edge Network]
        CDN[CDN - Static Assets]
        EDGE[Edge Functions]
        ENV[Environment Variables]
    end
    
    subgraph EXTERNAL[External Services]
        GEMINI_API[Google Gemini API]
    end
    
    subgraph CLIENT[Client]
        BROWSER[Browser]
    end
    
    CLIENT -->|HTTPS| VERCEL
    CDN -->|Cache Hit| CLIENT
    EDGE -->|API Request| GEMINI_API
    ENV --> EDGE
    
    style VERCEL fill:#0070f3,color:#fff
    style EXTERNAL fill:#4285f4,color:#fff
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 14.2.3 |
| UI Library | React | 18.3.1 |
| Language | TypeScript | 5.4.5 |
| Styling | Tailwind CSS | 3.4.1 |
| AI | Google Gemini AI | 0.24.1 |
| Forms | React Hook Form | 7.81.0 |
| Validation | Zod | 4.4.3 |
| Animation | Framer Motion | 10.16.16 |
| Icons | Lucide React | 0.378.0 |

---

## Security

```mermaid
graph TD
    A[Request] --> B{Input Validation}
    B -->|Valid| C[Rate Limiting]
    B -->|Invalid| D[Reject 400]
    
    C --> E{Auth Check}
    E -->|Protected Route| F{Session Valid}
    E -->|Public Route| G[Process Request]
    
    F -->|Yes| G
    F -->|No| H[Reject 401]
    
    G --> I[Sanitize Output]
    I --> J[Response]
```

- All inputs validated with Zod schemas
- Rate limiting on API routes
- Password hashing with bcrypt
- HTTPS enforced in production
- No permanent medical data storage

---

## Future Roadmap

```mermaid
timeline
    title MediGuide AI Roadmap
    Phase 1 : Database Integration
             : PostgreSQL via Supabase
             : Persistent user data
    Phase 2 : Real-time Features
             : WebSocket chat
             : Push notifications
    Phase 3 : AI Enhancement
             : Fine-tuned medical model
             : Predictive analytics
    Phase 4 : Mobile & Offline
             : React Native app
             : Offline support
```

---

*Architecture documentation last updated: July 2024*
