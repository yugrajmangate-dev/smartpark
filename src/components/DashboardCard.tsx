/**
 * DashboardCard Component
 * Reusable card with settle-in animations and interactive states
 */

'use client'

import { motion } from 'framer-motion'
import { ReactNode, useMemo } from 'react'

interface DashboardCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  onClick?: () => void
  isClickable?: boolean
  delay?: number
  icon?: ReactNode
  badge?: {
    label: string
    variant: 'success' | 'warning' | 'danger' | 'info'
  }
  className?: string
}

const getBadgeColor = (variant: string) => {
  switch (variant) {
    case 'success':
      return 'badge-success'
    case 'warning':
      return 'badge-warning'
    case 'danger':
      return 'badge-danger'
    case 'info':
      return 'badge-info'
    default:
      return 'badge-info'
  }
}

export const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  onClick,
  isClickable = false,
  delay = 0,
  icon,
  badge,
  className = '',
}: DashboardCardProps) => {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: delay * 0.05,
        },
      },
    }),
    [delay]
  )

  const hoverVariants = useMemo(
    () => ({
      rest: { y: 0, borderColor: 'rgba(255, 255, 255, 0.1)' },
      hover: {
        y: -5,
        borderColor: 'rgba(255, 107, 44, 0.4)',
        boxShadow: '0 0 30px rgba(255, 107, 44, 0.2)',
        transition: {
          type: 'spring',
          damping: 15,
          stiffness: 100,
        },
      },
    }),
    []
  )

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={isClickable ? 'hover' : 'rest'}
      variants={isClickable ? hoverVariants : undefined}
      onClick={onClick}
      className={`
        card group
        ${isClickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 flex items-start gap-3">
          {icon && (
            <motion.div
              className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {icon}
            </motion.div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-orange transition-colors">
                {title}
              </h3>
              {badge && (
                <motion.span
                  className={getBadgeColor(badge.variant)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {badge.label}
                </motion.span>
              )}
            </div>
            {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
          </div>
        </div>

        {action && <div className="flex-shrink-0 ml-4">{action}</div>}
      </div>

      {/* Content Section */}
      <div className="text-text-muted">{children}</div>
    </motion.div>
  )
}

interface DashboardCardGridProps {
  children: ReactNode
  columns?: number
}

/**
 * Grid wrapper for dashboard cards with staggered animation
 */
export const DashboardCardGrid = ({ children, columns = 3 }: DashboardCardGridProps) => {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2 grid-cols-1',
    3: 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-3'

  return (
    <motion.div
      className={`grid ${gridColsClass} gap-6 w-full`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stat Card variant - for KPI display
 */
interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  change?: { value: number; direction: 'up' | 'down' }
  icon?: ReactNode
  delay?: number
  trend?: 'positive' | 'negative' | 'neutral'
}

export const StatCard = ({
  label,
  value,
  unit,
  change,
  icon,
  delay = 0,
  trend = 'neutral',
}: StatCardProps) => {
  const trendColor = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-text-muted',
  }[trend]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 100,
        delay: delay * 0.05,
      }}
      className="card"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-text-muted font-medium">{label}</p>
        </div>
        {icon && (
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold text-text-primary">{value}</span>
        {unit && <span className="text-sm text-text-muted">{unit}</span>}
      </div>

      {change && (
        <motion.div className={`text-sm font-semibold ${trendColor}`}>
          <span>{change.direction === 'up' ? '↑' : '↓'}</span>
          <span className="ml-1">{Math.abs(change.value)}%</span>
          <span className="text-text-muted font-normal ml-1">vs last week</span>
        </motion.div>
      )}
    </motion.div>
  )
}
