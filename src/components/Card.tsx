/**
 * Card Component
 * Glass-effect card with motion animations
 */

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  isInteractive?: boolean
  onClick?: () => void
  delay?: number
}

export const Card = ({
  children,
  className = '',
  isInteractive = false,
  onClick,
  delay = 0,
}: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={isInteractive ? { y: -5, boxShadow: '0 0 30px rgba(255, 107, 44, 0.2)' } : {}}
      onClick={onClick}
      className={`${isInteractive ? 'card-interactive' : 'card'} ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export const CardHeader = ({ title, subtitle, action }: CardHeaderProps) => (
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
)

interface CardContentProps {
  children: ReactNode
  className?: string
}

export const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={`text-text-secondary ${className}`}>{children}</div>
)

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export const CardFooter = ({ children, className = '' }: CardFooterProps) => (
  <div className={`flex items-center gap-3 mt-6 pt-4 border-t border-sp-orange/10 ${className}`}>
    {children}
  </div>
)
