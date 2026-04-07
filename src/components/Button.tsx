/**
 * Base Button Component
 * Reusable button with variants and animations following SmartPark design
 */

'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  isLoading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  outline: 'glass-effect px-6 py-2.5 rounded-lg font-semibold border border-sp-orange hover:bg-sp-orange/10 transition-all',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'py-1.5 px-3 text-sm',
  md: 'py-2.5 px-6 text-base',
  lg: 'py-3 px-8 text-lg',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  icon,
  iconPosition = 'right',
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = `inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`
  const variantClass = variantStyles[variant]
  const sizeClass = sizeStyles[size]

  const content = (
    <>
      {icon && iconPosition === 'left' && !isLoading && <span>{icon}</span>}
      {isLoading && (
        <span className="inline-block animate-spin">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && !isLoading && <span>{icon}</span>}
    </>
  )

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...(props as any)}
    >
      {content}
    </motion.button>
  )
}
