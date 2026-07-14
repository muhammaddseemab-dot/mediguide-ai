'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Stethoscope,
  ShoppingBag,
  FileText,
  Bell,
  Settings,
  User,
  Heart,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Award,
  Shield,
  HelpCircle,
} from 'lucide-react'

interface SidebarProps {
  isCollapsed?: boolean
  onCollapseToggle?: () => void
  className?: string
}

interface SidebarItem {
  href: string
  label: string
  icon: React.ElementType
  badge?: number
  isActive?: boolean
}

/**
 * Navigation items for authenticated users
 */
const AUTH_NAV_ITEMS: SidebarItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/symptom-checker',
    label: 'Symptom Checker',
    icon: Stethoscope,
  },
  {
    href: '/marketplace',
    label: 'Medicine Marketplace',
    icon: ShoppingBag,
  },
  {
    href: '/health-history',
    label: 'Health History',
    icon: FileText,
  },
  {
    href: '/appointments',
    label: 'Appointments',
    icon: Calendar,
    badge: 2,
  },
  {
    href: '/notifications',
    label: 'Notifications',
    icon: Bell,
    badge: 5,
  },
]

/**
 * Profile and settings items
 */
const PROFILE_ITEMS: SidebarItem[] = [
  {
    href: '/profile',
    label: 'Profile',
    icon: User,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
  },
  {
    href: '/help',
    label: 'Help & Support',
    icon: HelpCircle,
  },
]

/**
 * Health management items
 */
const HEALTH_ITEMS: SidebarItem[] = [
  {
    href: '/medications',
    label: 'My Medications',
    icon: Heart,
  },
  {
    href: '/emergency-contacts',
    label: 'Emergency Contacts',
    icon: Shield,
  },
  {
    href: '/health-tracking',
    label: 'Health Tracking',
    icon: BarChart,
  },
  {
    href: '/achievements',
    label: 'Achievements',
    icon: Award,
  },
]

/**
 * Sidebar Component
 * Responsive sidebar navigation with collapse functionality
 * Smooth animations and accessibility features
 */
export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  onCollapseToggle,
  className = '',
}) => {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)

  // Determine if a link is active
  const isLinkActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  // Animation variants
  const sidebarVariants = {
    collapsed: { width: 80 },
    expanded: { width: 280 },
    hovered: { width: 280 },
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  }

  // Render navigation items
  const renderNavItems = (items: SidebarItem[], title?: string) => (
    <>
      {title && !(isCollapsed && !isHovered) && (
        <motion.h3
          variants={contentVariants}
          className="mb-2 text-body-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
        >
          {title}
        </motion.h3>
      )}
      <ul className="space-y-1">
        {items.map((item, index) => {
          const isActive = isLinkActive(item.href)
          return (
            <motion.li
              key={item.href}
              custom={index}
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!(isCollapsed && !isHovered) && (
                  <>
                    <span className="text-body-sm font-medium flex-1">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="rounded-full bg-primary-100 px-2 py-0.5 text-body-xs font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </>
  )

  // Determine current sidebar width
  const currentWidth = isCollapsed && !isHovered ? 80 : 280

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="expanded"
      animate={isCollapsed && !isHovered ? 'collapsed' : 'expanded'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`fixed left-0 top-0 z-40 h-screen flex-col border-r border-gray-200 bg-white pt-16 shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 ${className}`}
      style={{ width: currentWidth }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex h-full flex-col overflow-y-auto px-3 py-6">
        {/* Collapse Toggle */}
        <div className="mb-8">
          <button
            onClick={onCollapseToggle}
            className="flex items-center justify-center rounded-lg p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
            {!(isCollapsed && !isHovered) && (
              <span className="ml-2 text-body-sm font-medium text-gray-700 dark:text-gray-300">
                {isCollapsed ? 'Expand' : 'Collapse'}
              </span>
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Primary Navigation */}
          <div>
            {!(isCollapsed && !isHovered) && (
              <motion.h2
                variants={contentVariants}
                className="mb-4 text-body-md font-semibold text-gray-900 dark:text-gray-100"
              >
                Navigation
              </motion.h2>
            )}
            {renderNavItems(AUTH_NAV_ITEMS)}
          </div>

          {/* Health Management */}
          <div>
            {renderNavItems(HEALTH_ITEMS, 'Health Management')}
          </div>

          {/* Profile & Settings */}
          <div>
            {renderNavItems(PROFILE_ITEMS, 'Account')}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="mt-auto pt-8">
          {/* Recent Activity */}
          {!(isCollapsed && !isHovered) && (
            <motion.div
              variants={contentVariants}
              className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <h4 className="text-body-sm font-semibold text-gray-900 dark:text-gray-100">
                  Recent Activity
                </h4>
              </div>
              <div className="space-y-2">
                <p className="text-body-xs text-gray-600 dark:text-gray-400">
                  Last symptom check: 2 hours ago
                </p>
                <p className="text-body-xs text-gray-600 dark:text-gray-400">
                  Medicine ordered: Yesterday
                </p>
              </div>
            </motion.div>
          )}

          {/* Emergency Contact */}
          <div className="relative">
            <Link
              href="/emergency"
              className="flex items-center gap-3 rounded-lg bg-gradient-emergency p-3 transition-all hover:opacity-90"
            >
              <Shield className="h-5 w-5 text-white" />
              {!(isCollapsed && !isHovered) && (
                <span className="text-body-sm font-semibold text-white">
                  Emergency Contact
                </span>
              )}
            </Link>
            {!(isCollapsed && !isHovered) && (
              <div className="mt-2">
                <p className="text-body-xs text-gray-600 dark:text-gray-400">
                  Available 24/7
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Collapse Overlay */}
      <AnimatePresence>
        {isCollapsed && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 left-full ml-2 rounded-lg bg-white shadow-xl dark:bg-gray-800"
            style={{ width: 200 }}
          >
            <div className="p-4">
              {/* Display expanded content when hovered */}
              <h2 className="mb-4 text-body-md font-semibold text-gray-900 dark:text-gray-100">
                Navigation
              </h2>
              {renderNavItems(AUTH_NAV_ITEMS)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}

export default Sidebar
