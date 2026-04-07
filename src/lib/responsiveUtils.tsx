/**
 * Responsive Layout Utilities
 * Helper components for building responsive layouts
 */

'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ResponsiveLayoutProps {
  children: ReactNode
  className?: string
}

/**
 * Container with responsive padding and max-width
 */
export const ResponsiveContainer = ({ children, className = '' }: ResponsiveLayoutProps) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
)

/**
 * Two-column layout that stacks on mobile
 */
interface TwoColumnLayoutProps {
  left: ReactNode
  right: ReactNode
  leftColSpan?: number
  rightColSpan?: number
  gap?: number
}

export const TwoColumnLayout = ({
  left,
  right,
  leftColSpan = 1,
  rightColSpan = 2,
  gap = 6,
}: TwoColumnLayoutProps) => (
  <div className={`grid grid-cols-1 lg:grid-cols-3 gap-${gap}`}>
    <div className="lg:col-span-1">{left}</div>
    <div className="lg:col-span-2">{right}</div>
  </div>
)

/**
 * Sidebar layout with responsive drawer for mobile
 */
interface SidebarLayoutProps {
  sidebar: ReactNode
  main: ReactNode
  sidebarWidth?: 'narrow' | 'normal' | 'wide'
  isSidebarOpen?: boolean
  onSidebarToggle?: (open: boolean) => void
}

export const SidebarLayout = ({
  sidebar,
  main,
  sidebarWidth = 'normal',
  isSidebarOpen = true,
  onSidebarToggle,
}: SidebarLayoutProps) => {
  const widthClass = {
    narrow: 'lg:w-64',
    normal: 'lg:w-80',
    wide: 'lg:w-96',
  }[sidebarWidth]

  return (
    <div className="flex gap-6">
      {/* Sidebar - Responsive */}
      <motion.aside
        className={`hidden lg:block ${widthClass} flex-shrink-0`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {sidebar}
      </motion.aside>

      {/* Main Content */}
      <motion.main
        className="flex-1 min-w-0"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {main}
      </motion.main>
    </div>
  )
}

/**
 * Grid layout with responsive columns
 */
interface GridLayoutProps {
  children: ReactNode
  cols?: 2 | 3 | 4
  gap?: number
}

export const GridLayout = ({ children, cols = 3, gap = 6 }: GridLayoutProps) => {
  const colsClass = {
    2: 'md:grid-cols-2 grid-cols-1',
    3: 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[cols]

  return (
    <div className={`grid ${colsClass} gap-${gap} w-full`} style={{ gap: `${gap * 0.25}rem` }}>
      {children}
    </div>
  )
}

/**
 * Full-width section with padding
 */
interface SectionProps {
  children: ReactNode
  className?: string
  containerPadding?: boolean
}

export const Section = ({ children, className = '', containerPadding = true }: SectionProps) => (
  <section className={`w-full ${containerPadding ? 'px-4 sm:px-6 lg:px-8 py-6' : ''} ${className}`}>
    {children}
  </section>
)

/**
 * Bottom sheet for mobile (drawer from bottom)
 */
interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  height?: 'sm' | 'md' | 'lg' | 'full'
}

const heightClass = {
  sm: 'h-64',
  md: 'h-96',
  lg: 'h-screen/2',
  full: 'h-screen',
}

export const BottomSheet = ({ isOpen, onClose, children, title, height = 'md' }: BottomSheetProps) => {
  const motionVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      exit="exit"
      variants={motionVariants}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`fixed inset-0 z-40 lg:hidden flex flex-col-reverse pointer-events-none`}
    >
      {/* Backdrop */}
      <motion.div
        onClick={onClose}
        className="flex-1 bg-black/40 backdrop-blur-sm pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
      />

      {/* Sheet */}
      <motion.div
        className={`${heightClass[height]} glass-effect rounded-t-2xl border-t border-white/10 p-6 overflow-y-auto pointer-events-auto`}
      >
        {title && (
          <h3 className="text-lg font-bold text-text-primary mb-4">{title}</h3>
        )}
        {children}
      </motion.div>
    </motion.div>
  )
}

/**
 * Bleed container - extends to edges on mobile
 */
interface BleedContainerProps {
  children: ReactNode
  className?: string
}

export const BleedContainer = ({ children, className = '' }: BleedContainerProps) => (
  <div className={`-mx-4 sm:mx-0 ${className}`}>{children}</div>
)
