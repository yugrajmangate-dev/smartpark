/**
 * AppHeader Component
 * Sticky glassmorphic header with user info, notifications, and navigation
 */

'use client'

import { motion } from 'framer-motion'
import { Bell, MapPin, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import type { UserRole } from '@/types'

interface AppHeaderProps {
  userName: string
  userRole: UserRole
  unreadNotifications?: number
  onNotificationClick?: () => void
  onMenuToggle?: (open: boolean) => void
}

const getRoleLabel = (role: UserRole): string => {
  switch (role) {
    case 'user':
      return 'User'
    case 'lot_manager':
      return 'Manager'
    case 'super_admin':
      return 'Admin'
    default:
      return 'User'
  }
}

const getRoleColor = (role: UserRole): string => {
  switch (role) {
    case 'user':
      return 'text-brand-orange'
    case 'lot_manager':
      return 'text-brand-amber'
    case 'super_admin':
      return 'text-red-400'
    default:
      return 'text-text-muted'
  }
}

export const AppHeader = ({
  userName,
  userRole,
  unreadNotifications = 0,
  onNotificationClick,
  onMenuToggle,
}: AppHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)
    onMenuToggle?.(newState)
  }

  return (
    <motion.header
      className="sticky top-0 z-40 glass-effect backdrop-blur-xl border-b border-glass"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Location */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-orange to-brand-amber flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-text-primary gradient-text">SmartPark</h1>
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <MapPin className="w-3 h-3" />
                <span>Hinjewadi Phase 1</span>
              </div>
            </div>
          </motion.div>

          {/* Center Navigation - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-8">
            <motion.nav className="flex gap-6">
              <NavLink href="#dashboard" label="Dashboard" />
              <NavLink href="#lots" label="Lots" />
              <NavLink href="#bookings" label="Bookings" />
              <NavLink href="#analytics" label="Analytics" />
            </motion.nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Notification Bell */}
            <motion.button
              onClick={onNotificationClick}
              className="relative p-2 rounded-lg glass-effect-sm hover:glass-effect transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-text-primary" />
              {unreadNotifications > 0 && (
                <motion.span
                  className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulseDot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </motion.span>
              )}
            </motion.button>

            {/* User Profile & Role - Hidden on Mobile, Shown as Icon */}
            <motion.div
              className="hidden sm:flex items-center gap-3 px-3 py-2 glass-effect-sm rounded-lg"
              whileHover={{ backgroundColor: 'rgba(26, 26, 26, 0.9)' }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-amber flex items-center justify-center text-white font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-text-primary">{userName}</span>
                <span className={`text-xs font-medium ${getRoleColor(userRole)}`}>
                  {getRoleLabel(userRole)}
                </span>
              </div>
            </motion.div>

            {/* Logout Button */}
            <motion.button
              className="p-2 rounded-lg glass-effect-sm hover:glass-effect transition-all text-text-muted hover:text-brand-orange"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden p-2 rounded-lg glass-effect-sm hover:glass-effect transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 flex flex-col gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <NavLink href="#dashboard" label="Dashboard" mobile />
            <NavLink href="#lots" label="Lots" mobile />
            <NavLink href="#bookings" label="Bookings" mobile />
            <NavLink href="#analytics" label="Analytics" mobile />
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

/**
 * NavLink sub-component
 */
interface NavLinkProps {
  href: string
  label: string
  mobile?: boolean
}

const NavLink = ({ href, label, mobile = false }: NavLinkProps) => (
  <motion.a
    href={href}
    className={`font-medium transition-colors ${
      mobile
        ? 'block px-4 py-2 text-text-primary hover:text-brand-orange glass-effect-sm rounded-lg'
        : 'text-text-muted hover:text-text-primary'
    }`}
    whileHover={{ x: mobile ? 4 : 0, color: '#FF6B2C' }}
    transition={{ duration: 0.2 }}
  >
    {label}
  </motion.a>
)
