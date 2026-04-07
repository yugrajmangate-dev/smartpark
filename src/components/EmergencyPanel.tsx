/**
 * EmergencyPanel Component
 * High-priority card for emergency "I'm Blocked" incident reporting
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Phone, MapPin, FileText, X } from 'lucide-react'
import { useState } from 'react'
import { NotificationService } from '@/services/notificationService'

interface EmergencyPanelProps {
  userId: string
  lotName?: string
  slotNumber?: string
  onReportSubmit?: (description: string) => void
}

export const EmergencyPanel = ({
  userId,
  lotName = 'Current Lot',
  slotNumber = 'A-001',
  onReportSubmit,
}: EmergencyPanelProps) => {
  const [isReporting, setIsReporting] = useState(false)
  const [description, setDescription] = useState('')
  const [hasReported, setHasReported] = useState(false)

  const handleEmergencyClick = async () => {
    setIsReporting(true)
  }

  const handleSubmitReport = async () => {
    if (!description.trim()) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Trigger notification
      NotificationService.incidentAlert(
        lotName,
        `Vehicle blocked at ${slotNumber}. ${description}`,
        'manager-id' // Would be actual manager ID
      )

      onReportSubmit?.(description)
      setHasReported(true)
      setDescription('')

      // Reset after 3 seconds
      setTimeout(() => {
        setIsReporting(false)
        setHasReported(false)
      }, 3000)
    } catch (error) {
      console.error('Failed to submit report:', error)
    }
  }

  const emergencyPulseVariants = {
    pulse: {
      boxShadow: [
        '0 0 20px rgba(239, 68, 68, 0.3)',
        '0 0 40px rgba(239, 68, 68, 0.6)',
        '0 0 20px rgba(239, 68, 68, 0.3)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
    >
      <AnimatePresence>
        {!isReporting && !hasReported && (
          <motion.div
            exit={{ opacity: 0, y: -10 }}
            className="relative glass-effect border-2 border-red-500/40 rounded-lg p-6 overflow-hidden"
            variants={emergencyPulseVariants}
            animate="pulse"
          >
            {/* Background gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-start gap-4">
              {/* Alert Icon */}
              <motion.div
                className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-red-300 mb-1">Emergency Assistance</h3>
                <p className="text-sm text-text-muted mb-4">
                  Your vehicle is blocked? Report it immediately to get help from our lot managers.
                </p>

                {/* Quick Info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-brand-orange" />
                    <span>{lotName} • Slot {slotNumber}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-brand-orange" />
                    <span>Manager on call: +91 9876543210</span>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={handleEmergencyClick}
                  className="btn-danger w-full sm:w-auto"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 38, 38, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="inline-block animate-pulse mr-2">🚨</span>
                  I'm Blocked - Report Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reporting Form */}
        {isReporting && !hasReported && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-effect border-2 border-red-500/40 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-text-primary">Submit Emergency Report</h3>
              </div>
              <motion.button
                onClick={() => setIsReporting(false)}
                className="p-1 rounded hover:glass-effect transition-all text-text-muted hover:text-brand-orange"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="space-y-4">
              {/* Location Display */}
              <div className="p-3 glass-effect-sm rounded-lg border border-white/10">
                <p className="text-xs text-text-muted mb-2 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-brand-orange" />
                  Location
                </p>
                <p className="font-medium text-text-primary">
                  {lotName} • Slot {slotNumber}
                </p>
              </div>

              {/* Description Input */}
              <div>
                <label className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-orange" />
                  Describe the situation
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Silver Honda Civic (registration DL-01AB1234) is blocking my spot. Car is unattended..."
                  maxLength={300}
                  className="input-base w-full h-24 resize-none text-sm"
                />
                <p className="text-xs text-text-muted mt-1 text-right">
                  {description.length}/300 characters
                </p>
              </div>

              {/* Priority Note */}
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                ⚠️ Providing accurate details helps our managers respond faster to your emergency.
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => {
                    setIsReporting(false)
                    setDescription('')
                  }}
                  className="btn-secondary flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSubmitReport}
                  disabled={!description.trim()}
                  className="btn-danger flex-1 disabled:opacity-50"
                  whileHover={{ scale: description.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: description.trim() ? 0.98 : 1 }}
                >
                  Submit Report
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success State */}
        {hasReported && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-effect border-2 border-green-500/40 rounded-lg p-6 text-center"
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl">✓</span>
            </motion.div>

            <h3 className="font-semibold text-text-primary mb-2">Report Submitted</h3>
            <p className="text-sm text-text-muted mb-4">
              Our lot manager has been notified and is on their way. You'll receive updates shortly.
            </p>

            <div className="p-3 glass-effect-sm rounded-lg border border-green-500/30 text-sm text-green-300">
              📞 Manager response time: ~ 5-10 minutes
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
