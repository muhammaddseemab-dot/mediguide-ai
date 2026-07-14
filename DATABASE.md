# MediGuide AI - Database Configuration Guide

## Overview

MediGuide AI uses **PostgreSQL** as its primary database with **Prisma ORM** for data access and schema management. The database is designed to support healthcare data with proper indexing, relationships, cascading deletes, and audit logging for compliance.

## Architecture

### Core Components

1. **Database Server**: PostgreSQL (version 12+)
2. **ORM**: Prisma (v5.11.0+)
3. **Migration Tool**: Prisma Migrate
4. **Query Builder**: Prisma Client (TypeScript)

### Data Models

The database includes the following main entities:

#### 1. User Management
- **users**: Core user accounts with authentication support
- **accounts**: OAuth provider integrations (Google, etc.)
- **sessions**: Session management for NextAuth.js
- **verification_tokens**: Email verification tokens

#### 2. Health & Medical Data
- **health_profiles**: User health information, allergies, conditions, emergency contacts
- **consultations**: AI-powered health consultations with conversation history
- **emergency_logs**: Emergency incident detection and logging
- **audit_logs**: Data access tracking for compliance

#### 3. Medicine & Pharmacy
- **medicines**: Medicine catalog with availability, pricing, and prescription requirements
- **medicine_orders**: User medicine orders
- **medicine_order_items**: Individual items in medicine orders

## Setup Instructions

### Prerequisites

- PostgreSQL 12+ installed and running
- Node.js 18+ installed
- Git for version control

### 1. Environment Configuration

Create a `.env.local` file with your database connection string:

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and set your database URL
DATABASE_URL=postgresql://username:password@localhost:5432/mediguide_ai
```

**Database Connection String Format:**
```
postgresql://[user[:password]@][host][:port][/database][?param1=value1&...]
```

**Example:**
```
# Local PostgreSQL
DATABASE_URL=postgresql://postgres:password@localhost:5432/mediguide_ai

# Supabase (Production)
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST].supabase.co:5432/postgres
```

### 2. Install Dependencies

```bash
npm install
```

This installs Prisma Client and all database dependencies.

### 3. Generate Prisma Client

```bash
npm run db:generate
```

Generates the TypeScript Prisma Client based on your schema.

### 4. Apply Database Migrations

Option A - Using Prisma Migrate (Development):
```bash
npm run db:migrate
```

Option B - Push schema directly (Development only):
```bash
npx prisma db push
```

### 5. Seed Sample Data

To populate the database with sample data:

```bash
npm run db:seed
```

This creates:
- 20 sample medicines (pain relievers, antibiotics, vitamins, etc.)
- 2 test users with health profiles
- Sample consultations with conversation history
- Emergency logs for demonstration
- Audit logs

### 6. Verify Installation

Use Prisma Studio to browse your database:

```bash
npm run db:studio
```

Opens a web interface at `http://localhost:5555` for data management.

## Database Schema Overview

### Users & Authentication

```sql
-- Core user account
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  image TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP
);

-- OAuth accounts linked to users
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  userId TEXT REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  providerAccountId TEXT NOT NULL,
  -- OAuth tokens and metadata
);

-- Session management
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  sessionToken TEXT UNIQUE NOT NULL,
  userId TEXT REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);
```

### Health Profiles

```sql
CREATE TABLE health_profiles (
  id TEXT PRIMARY KEY,
  userId TEXT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  age INTEGER,
  gender TEXT,
  bloodType TEXT,
  allergies TEXT[] -- Array of allergy strings
  chronicConditions TEXT[] -- Diabetes, hypertension, etc.
  currentMedications JSONB, -- { medicineId, dosage, frequency }
  emergencyContacts JSONB, -- { name, relationship, phone, email }
  medicalHistory JSONB, -- Medical history records
  language TEXT DEFAULT 'en', -- en, hi, mr
  theme TEXT DEFAULT 'light', -- light, dark
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### Consultations

```sql
CREATE TABLE consultations (
  id TEXT PRIMARY KEY,
  userId TEXT REFERENCES users(id) ON DELETE CASCADE,
  symptoms TEXT[] NOT NULL, -- User input symptoms
  aiAnalysis JSONB NOT NULL, -- { severity, confidence, recommendations }
  severity TEXT, -- low, moderate, high, critical
  confidenceLevel SMALLINT (0-100),
  emergencyDetected BOOLEAN,
  conversationHistory JSONB, -- Chat history with timestamps
  recommendations JSONB, -- AI recommendations
  language TEXT DEFAULT 'en', -- Consultation language
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### Emergency Logs

```sql
CREATE TABLE emergency_logs (
  id TEXT PRIMARY KEY,
  userId TEXT REFERENCES users(id) ON DELETE SET NULL,
  consultationId TEXT REFERENCES consultations(id) ON DELETE SET NULL,
  symptoms TEXT[] NOT NULL,
  detectionConfidence SMALLINT,
  emergencyLevel TEXT, -- critical, urgent, moderate
  emergencyContactsProvided JSONB, -- Pre-populated contacts
  hospitalInfo JSONB, -- Nearby hospitals
  userActionTaken TEXT, -- called_ambulance, went_hospital, etc.
  adminNotified BOOLEAN,
  responseTimeMs INTEGER, -- Detection to response time
  createdAt TIMESTAMP
);
```

### Medicines & Orders

```sql
CREATE TABLE medicines (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  genericName TEXT NOT NULL,
  dosage TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  availability BOOLEAN,
  prescriptionRequired BOOLEAN,
  manufacturer TEXT,
  category TEXT, -- painkiller, antibiotic, vitamin, etc.
  sideEffects TEXT[],
  contraindications TEXT[],
  stock INTEGER,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

CREATE TABLE medicine_orders (
  id TEXT PRIMARY KEY,
  userId TEXT REFERENCES users(id) ON DELETE CASCADE,
  consultationId TEXT REFERENCES consultations(id) ON DELETE SET NULL,
  totalAmount DECIMAL(10,2),
  orderStatus TEXT, -- pending, confirmed, processing, shipped, delivered
  pharmacyPartnerId TEXT,
  trackingNumber TEXT,
  prescriptionVerified BOOLEAN,
  shippingAddress TEXT,
  createdAt TIMESTAMP,
  deliveredAt TIMESTAMP,
  updatedAt TIMESTAMP
);

CREATE TABLE medicine_order_items (
  id TEXT PRIMARY KEY,
  orderId TEXT REFERENCES medicine_orders(id) ON DELETE CASCADE,
  medicineId TEXT REFERENCES medicines(id) ON DELETE RESTRICT,
  quantity INTEGER,
  unitPrice DECIMAL(10,2)
);
```

### Audit Logging

```sql
CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  userId TEXT,
  action TEXT, -- viewed_health_data, exported_data, etc.
  resource TEXT, -- consultation, health_profile, etc.
  resourceId TEXT,
  changes JSONB, -- Before/after values
  ipAddress TEXT,
  userAgent TEXT,
  createdAt TIMESTAMP
);
```

## Indexing Strategy

The schema includes strategic indexes for performance:

| Table | Field | Type | Purpose |
|-------|-------|------|---------|
| users | email | UNIQUE | Fast user lookup |
| consultations | userId | INDEX | User consultation history |
| consultations | emergencyDetected | INDEX | Emergency queries |
| consultations | createdAt | INDEX | Time-based queries |
| emergency_logs | emergencyLevel | INDEX | Critical incident detection |
| emergency_logs | createdAt | INDEX | Recent emergencies |
| medicines | availability | INDEX | Available medicine queries |
| medicines | prescriptionRequired | INDEX | Prescription filtering |
| medicine_orders | orderStatus | INDEX | Order status queries |
| audit_logs | userId | INDEX | User activity tracking |

## Cascading Deletes

The database implements cascading deletes for data integrity:

- **User deletion**: Cascades to accounts, sessions, health profiles, consultations, orders, audit logs
- **Consultation deletion**: Cascades to emergency logs, order items (via orders)
- **Medicine order deletion**: Cascades to order items
- **Emergency log**: Can safely delete (uses SET NULL for references)

## Multi-Language Support

The schema supports multi-language content:

- **health_profiles.language**: User's preferred language (en, hi, mr)
- **consultations.language**: Language of specific consultation
- **Translation at application layer**: Content translated via Gemini API

Supported languages:
- English (en)
- Hindi (hi)
- Marathi (mr)

## Data Types & Constraints

### JSONB Fields

JSONB fields store complex data structures:

```typescript
// Health profile emergency contacts
{
  name: string
  relationship: string
  phone: string
  email?: string
}

// AI Analysis structure
{
  severity: 'low' | 'moderate' | 'high' | 'critical'
  confidence: number (0-100)
  recommendations: Array<{
    title: string
    description: string
    priority: string
  }>
  warnings: string[]
}

// Conversation history
Array<{
  role: 'user' | 'assistant'
  content: string
  timestamp: ISO8601 date
}>
```

### Enums

Currently supported enums (can be extended):

- **Gender**: male, female, other
- **Severity Levels**: low, moderate, high, critical
- **Order Status**: pending, confirmed, processing, shipped, delivered, cancelled

## Query Examples

### Get User with Full Health History

```typescript
import { getUserById } from '@/lib/db'

const user = await getUserById(userId)
// Includes health profile and recent consultations
```

### Search Medicines

```typescript
import { searchMedicines } from '@/lib/db'

const results = await searchMedicines('ibuprofen', {
  prescriptionRequired: false,
  maxPrice: 10,
  category: 'painkiller'
})
```

### Get Emergency Logs (Last 24 Hours)

```typescript
import { getRecentEmergencies } from '@/lib/db'

const emergencies = await getRecentEmergencies(24, 100)
```

### Export User Data (Privacy)

```typescript
import { exportUserData } from '@/lib/db'

const allUserData = await exportUserData(userId)
// Includes all consultations, orders, health data
```

## Common Databases for Deployment

### Development
- **Local PostgreSQL**: `postgresql://postgres:password@localhost:5432/mediguide_ai`

### Production (Cloud)
- **Supabase**: PostgreSQL with built-in auth, includes free tier
- **AWS RDS**: Managed PostgreSQL database
- **PlanetScale**: MySQL-compatible (requires schema changes)
- **DigitalOcean**: Managed databases

## Migrations

### View Migration History

```bash
npx prisma migrate status
```

### Create a New Migration

```bash
npx prisma migrate dev --name add_new_field
```

### Reset Database (Development Only)

```bash
npm run db:reset
# This will:
# 1. Delete all data
# 2. Re-apply all migrations
# 3. Re-run seed script
```

### Migrate Production

```bash
npx prisma migrate deploy
```

## Performance Optimization

### Query Optimization Tips

1. **Always use indexes**: Fields like `userId`, `createdAt`, `email` are indexed
2. **Limit results**: Use `take` parameter in queries
3. **Pagination**: Implement offset/limit pagination for large result sets
4. **Select specific fields**: Don't fetch unnecessary data

### Connection Pooling

For production, configure connection pooling in PostgreSQL:

```bash
# In your DATABASE_URL, add pooling parameter:
DATABASE_URL="postgresql://user:password@host/db?schema=public&pgbouncer=true"
```

## Backup & Recovery

### Backup Your Database

```bash
# PostgreSQL backup (local)
pg_dump mediguide_ai > backup.sql

# Restore from backup
psql mediguide_ai < backup.sql
```

### Backup in Production (Supabase)

Supabase includes automated daily backups. Access via:
1. Supabase Dashboard → Backups
2. Point-in-time recovery available

## Troubleshooting

### Connection Errors

```bash
# Test connection
psql DATABASE_URL

# Check Prisma can connect
npx prisma db execute --stdin "SELECT 1"
```

### Migration Conflicts

```bash
# Reset and start fresh (DANGEROUS - loses all data)
npm run db:reset

# Or resolve conflicts manually
npx prisma migrate resolve --rolled-back migration_name
```

### Type Errors After Schema Changes

```bash
# Regenerate Prisma Client
npm run db:generate
```

## Security Best Practices

1. **Never commit `.env.local`**: Use `.gitignore`
2. **Rotate `NEXTAUTH_SECRET`** regularly in production
3. **Enable row-level security** in Supabase for multi-tenant deployments
4. **Use SSL connections**: Ensure `sslmode=require` in production
5. **Audit logging**: All data access is logged in `audit_logs` table
6. **Encryption at rest**: Enable database encryption where available
7. **Regular backups**: Implement automated backup strategy

## References

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth.js Database Guide](https://next-auth.js.org/adapters/prisma)

## Support

For database-related issues:
1. Check error messages in the console
2. Review the Prisma logs: `prisma:*` debug flag
3. Test queries in Prisma Studio: `npm run db:studio`
4. Check PostgreSQL logs for server-side errors
