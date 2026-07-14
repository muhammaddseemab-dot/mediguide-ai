/**
 * Server-side authentication utilities
 * Handles session management and server-side auth operations
 */

import { getServerSession as getNextAuthSession } from 'next-auth'
import { authOptions } from './config'
import type { Session } from 'next-auth'

/**
 * Get current user session on the server
 * Returns session or null if not authenticated
 */
export async function getServerSession(): Promise<Session | null> {
  try {
    return await getNextAuthSession(authOptions)
  } catch (error) {
    console.error('Failed to get server session:', error)
    return null
  }
}

/**
 * Get current user from session
 * Returns user object or null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return null
  }

  return {
    id: session.user.id,
    email: session.user.email || '',
    name: session.user.name || '',
    image: session.user.image || '',
  }
}

/**
 * Require authentication - throws error if not authenticated
 * Use this in server components that require auth
 */
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Authentication required')
  }

  return user
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession()
  return !!session?.user
}
