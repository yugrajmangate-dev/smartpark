/**
 * ReservationModal Component
 * Center-fixed modal for slot selection and reservation cost calculation
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, IndianRupee } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { ParkingSlot, ParkingLot } from '@/types'

interface ReservationModalProps {
  isOpen: boolean
  lot: ParkingLot | null
  slots: ParkingSlot[]
  onClose: () => void
  onConfirm?: (slotId: string, hours: number) => void
  selectedSlotId?: string
}

/**
 * Format price in Indian Rupee with en-IN locale
 */
const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const ReservationModal = ({
  isOpen,
  lot,
  slots,
  onClose,
  onConfirm,
  selectedSlotId,
}: ReservationModalProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(selectedSlotId || null)
  const [hours, setHours] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setSelectedSlot(selectedSlotId || null)
  }, [selectedSlotId])

  const calculateCost = (): number => {
    return (lot?.rate_per_hour || 0) * hours
  }

  const handleConfirm = async () => {
    if (!selectedSlot || !lot) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      onConfirm?.(selectedSlot, hours)
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableSlots = slots.filter((s) => s.status === 'available')

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
          >
            <div className="glass-effect-lg max-w-2xl w-full rounded-2xl shadow-glow-orange-lg relative">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Reserve a Parking Slot</h2>
                  <p className="text-sm text-text-muted mt-1">{lot?.name}</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:glass-effect transition-all text-text-muted hover:text-brand-orange"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-6">
                {/* Slot Selection Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-4">
                    Available Slots ({availableSlots.length})
                  </h3>
                  <motion.div
                    className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-h-48 overflow-y-auto hide-scrollbar"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.03 },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {availableSlots.map((slot) => (
                      <motion.button
                        key={slot.slot_id}
                        onClick={() => setSelectedSlot(slot.slot_id)}
                        className={`
                          p-4 rounded-lg font-semibold text-sm transition-all
                          ${
                            selectedSlot === slot.slot_id
                              ? 'glass-effect bg-brand-orange/20 border-brand-orange text-text-primary shadow-glow-orange'
                              : 'glass-effect-sm border-white/10 text-text-muted hover:border-brand-orange/40 hover:text-text-primary'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1 },
                        }}
                      >
                        {slot.slot_number}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Duration Selector */}
                <div>
                  <label className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-orange" />
                    Duration
                  </label>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => setHours(Math.max(1, hours - 1))}
                      className="px-4 py-2 rounded-lg glass-effect-sm hover:glass-effect transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      −
                    </motion.button>

                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={hours}
                      onChange={(e) => setHours(Math.max(1, Math.min(24, parseInt(e.target.value) || 1)))}
                      className="w-20 text-center px-4 py-2 rounded-lg input-base font-semibold text-lg"
                    />

                    <motion.button
                      onClick={() => setHours(Math.min(24, hours + 1))}
                      className="px-4 py-2 rounded-lg glass-effect-sm hover:glass-effect transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      +
                    </motion.button>

                    <span className="text-text-muted ml-2">hour{hours !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <motion.div
                  className="glass-effect-sm border border-brand-orange/40 rounded-lg p-4 space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-sm">Rate per hour</span>
                    <span className="text-text-primary font-semibold flex items-center gap-1">
                      <IndianRupee className="w-4 h-4 text-brand-orange" />
                      {lot?.rate_per_hour}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-sm">Duration</span>
                    <span className="text-text-primary font-semibold">{hours} hour{hours !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="border-t border-white/10 pt-2 flex items-center justify-between">
                    <span className="font-semibold text-text-primary">Total Cost</span>
                    <motion.span
                      key={calculateCost()}
                      className="text-xl font-bold text-brand-orange flex items-center gap-1"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      {formatPrice(calculateCost())}
                    </motion.span>
                  </div>
                </motion.div>

                {/* Info Alert */}
                <div className="p-3 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-sm text-brand-orange">
                  <p className="font-medium">📌 Note:</p>
                  <p className="text-xs mt-1 opacity-80">
                    Cancellation must be done 2 hours before to get full refund. Same-day cancellation incurs 50% penalty.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 px-6 py-4 border-t border-white/10">
                <motion.button
                  onClick={onClose}
                  className="btn-secondary flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleConfirm}
                  disabled={!selectedSlot || isSubmitting}
                  className="btn-primary flex-1 disabled:opacity-50"
                  whileHover={{ scale: !isSubmitting && selectedSlot ? 1.02 : 1 }}
                  whileTap={{ scale: !isSubmitting && selectedSlot ? 0.98 : 1 }}
                >
                  {isSubmitting ? (
                    <motion.span
                      className="inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ⟳
                    </motion.span>
                  ) : (
                    `Confirm & Pay ${formatPrice(calculateCost())}`
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
