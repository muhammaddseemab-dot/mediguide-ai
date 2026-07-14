# MediGuide AI - Setup and Configuration Guide

## Quick Start

This guide will help you get MediGuide AI up and running locally.

## Prerequisites

- **Node.js**: 18.17 or later
- **npm**: 9.x or later
- **PostgreSQL**: 12 or later
- **Git**: for version control

## Installation Steps

### 1. Install Dependencies

All dependencies are already specified in `package.json`. The project includes:

```bash
npm install
```

**Installed Packages:**
- **Next.js 14**: Full-stack React framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Prisma**: Database ORM
- **NextAuth.js**: Authentication solution
- **React Query**: Server state management
- **Zustand**: Client state management
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Zod**: Schema validation
- **React Hook Form**: Form handling
- **Google Generative AI**: Gemini API client
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

#### Required Variables

- `DATABASE_URL`: PostgreSQL connection string
  ```
  postgresql://user:password@localhost:5432/mediguide_ai
  ```

- `NEXTAUTH_URL`: Your application URL
  ```
  http://localhost:3000 (development)
  ```

- `NEXTAUTH_SECRET`: Generate a random secret
  ```bash
  openssl rand -base64 32
  ```

- `NEXT_PUBLIC_GEMINI_API_KEY`: Get from [Google AI Studio](https://aistudio.google.com/)

#### Optional Variables (for Google OAuth)

- `GOOGLE_CLIENT_ID`: From [Google Cloud Console](https://console.cloud.google.com/)
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console

### 3. Database Setup

#### Option A: Using PostgreSQL Locally

Install PostgreSQL and create a database:

```sql
CREATE DATABASE mediguide_ai;
```

Then update `DATABASE_URL` in `.env.local`.

#### Option B: Using Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com/)
2. Create a new project
3. Get your PostgreSQL connection string
4. Update `DATABASE_URL` in `.env.local`

#### Option C: Using PlanetScale (MySQL Alternative)

1. Go to [planetscale.com](https://planetscale.com/)
2. Create a new database
3. Get your connection string
4. Update `DATABASE_URL` in `.env.local`

### 4. Run Database Migrations

Initialize the database schema:

```bash
npx prisma migrate dev --name init
```

This will:
- Create all database tables
- Generate Prisma client
- Seed initial data (if configured)

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mediguide-ai/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                  # Auth routes (future)
│   ├── (dashboard)/             # Protected routes (future)
│   ├── api/                     # API endpoints (future)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                  # Reusable React components
│   ├── ui/                     # shadcn/ui components (future)
│   ├── forms/                  # Form components (future)
│   ├── layout/                 # Layout components (future)
│   └── features/               # Feature-specific components (future)
├── lib/                        # Utility functions
│   ├── ai/                    # AI service integration
│   │   └── gemini.ts          # Gemini API wrapper
│   ├── auth/                  # Authentication utilities
│   │   └── config.ts          # NextAuth configuration
│   ├── db/                    # Database utilities
│   │   └── client.ts          # Prisma client singleton
│   └── utils.ts               # General utilities
├── types/                      # TypeScript type definitions
│   └── index.ts               # Core types
├── hooks/                      # Custom React hooks
│   └── useTheme.ts            # Theme management hook
├── stores/                     # Zustand stores
│   ├── useAuthStore.ts        # Auth state management
│   └── useUIStore.ts          # UI state management
├── prisma/                     # Database schema
│   └── schema.prisma          # Prisma ORM schema
├── public/                     # Static assets
├── .env.example               # Environment variables template
├── .env.local                 # Local environment variables (git ignored)
├── .eslintrc.json             # ESLint configuration
├── .prettierrc.json           # Prettier configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Jest setup
├── package.json               # Dependencies
├── README.md                  # Project documentation
└── SETUP.md                   # This file
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Building
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types

# Testing
npm test             # Run Jest tests
npm run test:watch   # Run tests in watch mode

# Database
npx prisma studio   # Open Prisma Studio (database UI)
npx prisma migrate dev --name add_feature  # Create migration
```

## Configuration Files

### TypeScript (`tsconfig.json`)

- **target**: ES2020
- **strict**: true (strict mode enabled)
- **module**: ESNext
- **jsx**: react-jsx
- **paths**: Configured with `@/*` alias

### Tailwind CSS (`tailwind.config.ts`)

- Custom colors matching healthcare branding
- Medical semantic colors (success, warning, error, emergency)
- Responsive breakpoints

### ESLint (`.eslintrc.json`)

- Next.js recommended config
- TypeScript plugin
- Rules for unused variables, explicit any, React hooks

### Prettier (`.prettierrc.json`)

- 100 character line width
- Single quotes
- Trailing commas
- Tailwind CSS class sorting

## Next Steps

### 1. Set Up Authentication

- [ ] Configure Google OAuth credentials
- [ ] Implement email/password authentication
- [ ] Create auth pages

### 2. Build Core Features

- [ ] Create symptom checker page
- [ ] Integrate Gemini API
- [ ] Build emergency detection system
- [ ] Implement medicine marketplace

### 3. Add Styling

- [ ] Install shadcn/ui components
- [ ] Create custom components
- [ ] Implement dark/light theme

### 4. Multi-Language Support

- [ ] Configure next-intl
- [ ] Add translations for EN, HI, MR
- [ ] Implement language switcher

### 5. Testing & Deployment

- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Deploy to Vercel
- [ ] Set up monitoring

## Troubleshooting

### Port 3000 Already in Use

```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Issues

```bash
# Test connection
npx prisma db push

# Reset database (caution: deletes all data)
npx prisma migrate reset
```

### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check types
npm run type-check

# Rebuild
rm -rf .next
npm run build
```

## API Documentation

API routes will be implemented in `/app/api` directory following Next.js conventions:

### Example: GET /api/symptoms/analyze

```typescript
// Request
POST /api/symptoms/analyze
Content-Type: application/json

{
  "symptoms": ["fever", "cough", "sore throat"]
}

// Response
200 OK
{
  "success": true,
  "data": {
    "severity": "moderate",
    "confidence": 85,
    "recommendations": [...]
  }
}
```

## Security Best Practices

1. **Environment Variables**: Keep `.env.local` out of git
2. **Database**: Use connection pooling for production
3. **API Keys**: Rotate regularly, use different keys per environment
4. **HTTPS**: Enable in production
5. **Rate Limiting**: Implement for API endpoints
6. **CORS**: Configure properly for your domain

## Performance Tips

1. Use Next.js Image component for images
2. Implement code splitting with dynamic imports
3. Use React Query for server state caching
4. Lazy load components with React.lazy
5. Monitor Core Web Vitals with Vercel Analytics

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Google Gemini API](https://ai.google.dev/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)

## Support

For issues or questions:
1. Check existing GitHub issues
2. Search project documentation
3. Create a new issue with details
4. Contact support team

---

**Happy coding! 🚀**

Start with the development server and explore the application structure as you build features.
