/**
 * Database module - Central export for all database utilities and queries
 * Provides type-safe access to Prisma client and query functions
 */

// Export Prisma client
export { prisma, default } from './client'

// Export all query functions
export * from './queries'

// Export Prisma types
export type {
  User,
  HealthProfile,
  Consultation,
  EmergencyLog,
  Medicine,
  MedicineOrder,
  MedicineOrderItem,
  AuditLog,
  Account,
  Session,
  VerificationToken,
} from '@prisma/client'
