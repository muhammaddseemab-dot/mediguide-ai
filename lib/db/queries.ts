/**
 * Database query functions for MediGuide AI
 * Provides type-safe queries for all models with proper error handling
 */

import { Prisma } from '@prisma/client'
import { prisma } from './client'

// ============================================================================
// User Queries
// ============================================================================

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      healthProfile: true,
      consultations: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      medicineOrders: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      healthProfile: true,
      accounts: true,
    },
  })
}

export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
    include: {
      healthProfile: true,
    },
  })
}

export async function updateUser(
  userId: string,
  data: Prisma.UserUpdateInput
) {
  return prisma.user.update({
    where: { id: userId },
    data,
    include: {
      healthProfile: true,
    },
  })
}

// ============================================================================
// Health Profile Queries
// ============================================================================

export async function getHealthProfile(userId: string) {
  return prisma.healthProfile.findUnique({
    where: { userId },
  })
}

export async function createHealthProfile(
  data: Prisma.HealthProfileCreateInput
) {
  return prisma.healthProfile.create({ data })
}

export async function updateHealthProfile(
  userId: string,
  data: Prisma.HealthProfileUpdateInput
) {
  return prisma.healthProfile.update({
    where: { userId },
    data,
  })
}

// ============================================================================
// Consultation Queries
// ============================================================================

export async function getConsultationById(consultationId: string) {
  return prisma.consultation.findUnique({
    where: { id: consultationId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      medicineOrders: true,
      emergencyLogs: true,
    },
  })
}

export async function getUserConsultations(
  userId: string,
  limit: number = 20,
  offset: number = 0
) {
  return prisma.consultation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
    include: {
      emergencyLogs: true,
      medicineOrders: {
        include: {
          medicineItems: true,
        },
      },
    },
  })
}

export async function createConsultation(
  data: Prisma.ConsultationCreateInput
) {
  return prisma.consultation.create({
    data,
  })
}

export async function updateConsultation(
  consultationId: string,
  data: Prisma.ConsultationUpdateInput
) {
  return prisma.consultation.update({
    where: { id: consultationId },
    data,
  })
}

export async function getEmergencyConsultations(
  userId: string,
  limit: number = 10
) {
  return prisma.consultation.findMany({
    where: {
      userId,
      emergencyDetected: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      emergencyLogs: true,
    },
  })
}

// ============================================================================
// Emergency Log Queries
// ============================================================================

export async function getEmergencyLogById(logId: string) {
  return prisma.emergencyLog.findUnique({
    where: { id: logId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      consultation: true,
    },
  })
}

export async function getUserEmergencyLogs(userId: string, limit: number = 20) {
  return prisma.emergencyLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

export async function createEmergencyLog(
  data: Prisma.EmergencyLogCreateInput
) {
  return prisma.emergencyLog.create({ data })
}

export async function getRecentEmergencies(
  hours: number = 24,
  limit: number = 50
) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000)
  return prisma.emergencyLog.findMany({
    where: {
      createdAt: {
        gte: since,
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      consultation: true,
    },
  })
}

// ============================================================================
// Medicine Queries
// ============================================================================

export async function getMedicineById(medicineId: string) {
  return prisma.medicine.findUnique({
    where: { id: medicineId },
  })
}

export async function searchMedicines(
  query: string,
  filters?: {
    prescriptionRequired?: boolean
    category?: string
    maxPrice?: number
  }
) {
  return prisma.medicine.findMany({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { genericName: { contains: query, mode: 'insensitive' } },
            { manufacturer: { contains: query, mode: 'insensitive' } },
          ],
        },
        filters?.prescriptionRequired !== undefined
          ? { prescriptionRequired: filters.prescriptionRequired }
          : {},
        filters?.category ? { category: filters.category } : {},
        filters?.maxPrice ? { price: { lte: filters.maxPrice } } : {},
      ],
    },
    take: 50,
  })
}

export async function getAvailableMedicines(limit: number = 100) {
  return prisma.medicine.findMany({
    where: { availability: true },
    take: limit,
  })
}

export async function createMedicine(data: Prisma.MedicineCreateInput) {
  return prisma.medicine.create({ data })
}

export async function updateMedicine(
  medicineId: string,
  data: Prisma.MedicineUpdateInput
) {
  return prisma.medicine.update({
    where: { id: medicineId },
    data,
  })
}

// ============================================================================
// Medicine Order Queries
// ============================================================================

export async function getMedicineOrderById(orderId: string) {
  return prisma.medicineOrder.findUnique({
    where: { id: orderId },
    include: {
      medicineItems: {
        include: {
          medicine: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      consultation: true,
    },
  })
}

export async function getUserMedicineOrders(
  userId: string,
  limit: number = 20,
  offset: number = 0
) {
  return prisma.medicineOrder.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
    include: {
      medicineItems: {
        include: {
          medicine: true,
        },
      },
    },
  })
}

export async function createMedicineOrder(
  data: Prisma.MedicineOrderCreateInput
) {
  return prisma.medicineOrder.create({
    data,
    include: {
      medicineItems: {
        include: {
          medicine: true,
        },
      },
    },
  })
}

export async function updateMedicineOrderStatus(
  orderId: string,
  status: string
) {
  return prisma.medicineOrder.update({
    where: { id: orderId },
    data: {
      orderStatus: status,
      ...(status === 'delivered' && { deliveredAt: new Date() }),
    },
    include: {
      medicineItems: {
        include: {
          medicine: true,
        },
      },
    },
  })
}

export async function getPendingOrders(limit: number = 50) {
  return prisma.medicineOrder.findMany({
    where: {
      orderStatus: {
        in: ['pending', 'confirmed', 'processing'],
      },
    },
    orderBy: { createdAt: 'asc' },
    take: limit,
    include: {
      medicineItems: {
        include: {
          medicine: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })
}

// ============================================================================
// Audit Log Queries
// ============================================================================

export async function createAuditLog(data: Prisma.AuditLogCreateInput) {
  return prisma.auditLog.create({ data })
}

export async function getUserAuditLogs(
  userId: string,
  limit: number = 100,
  offset: number = 0
) {
  return prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
  })
}

export async function getActionAuditLogs(
  action: string,
  limit: number = 100,
  offset: number = 0
) {
  return prisma.auditLog.findMany({
    where: { action },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
  })
}

// ============================================================================
// Analytics & Statistics Queries
// ============================================================================

export async function getConsultationStats(userId: string) {
  const consultations = await prisma.consultation.findMany({
    where: { userId },
  })

  const totalConsultations = consultations.length
  const emergencyConsultations = consultations.filter(
    (c) => c.emergencyDetected
  ).length
  const avgConfidence =
    consultations.length > 0
      ? consultations.reduce((sum, c) => sum + c.confidenceLevel, 0) /
        consultations.length
      : 0

  return {
    totalConsultations,
    emergencyConsultations,
    averageConfidence: Math.round(avgConfidence),
    lastConsultation: consultations[0]?.createdAt || null,
  }
}

export async function getSystemStats() {
  const [
    totalUsers,
    totalConsultations,
    totalEmergencies,
    totalOrders,
    totalMedicines,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.consultation.count(),
    prisma.emergencyLog.count(),
    prisma.medicineOrder.count(),
    prisma.medicine.count(),
  ])

  const emergencyTrendHours = await prisma.emergencyLog.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  })

  return {
    totalUsers,
    totalConsultations,
    totalEmergencies,
    totalOrders,
    totalMedicines,
    emergencies24h: emergencyTrendHours.length,
  }
}

// ============================================================================
// Data Deletion & Privacy Queries
// ============================================================================

export async function deleteUserData(userId: string) {
  // Delete all user-related data in cascade
  return prisma.user.delete({
    where: { id: userId },
  })
}

export async function exportUserData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      healthProfile: true,
      consultations: {
        include: {
          medicineOrders: {
            include: {
              medicineItems: true,
            },
          },
          emergencyLogs: true,
        },
      },
      medicineOrders: {
        include: {
          medicineItems: true,
        },
      },
      emergencyLogs: true,
    },
  })

  return user
}

// ============================================================================
// Batch Operations
// ============================================================================

export async function updateMedicineStockBatch(
  updates: Array<{ medicineId: string; quantity: number }>
) {
  return Promise.all(
    updates.map((update) =>
      prisma.medicine.update({
        where: { id: update.medicineId },
        data: {
          stock: {
            decrement: update.quantity,
          },
        },
      })
    )
  )
}

export async function notifyEmergencies(
  emergencyIds: string[],
  notified: boolean = true
) {
  return prisma.emergencyLog.updateMany({
    where: { id: { in: emergencyIds } },
    data: { adminNotified: notified },
  })
}
