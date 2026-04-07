/**
 * User Dashboard Page
 * Map-first interface for parking discovery and reservation
 */

'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AppHeader,
  TomTomMap,
  DashboardCard,
  DashboardCardGrid,
  StatCard,
  ReservationModal,
  EmergencyPanel,
} from '@/components'
import { mockLots, mockSlots, mockReservation, mockDashboardStats } from '@/lib/mockData'
import type { ParkingLot } from '@/types'
import { MapPin, Clock, DollarSign, AlertCircle, ChevronRight } from 'lucide-react'

export default function DashboardPage() {
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(mockLots[0])
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [hasActiveReservation] = useState(true)
  const [unreadNotifications] = useState(2)

  // Filter slots for selected lot
  const lotsSlots = useMemo(
    () => mockSlots.filter((s) => s.lot_id === selectedLot?.lot_id),
    [selectedLot?.lot_id]
  )

  const occupancyRate = useMemo(() => {
    if (!selectedLot) return 0
    return Math.round(
      ((selectedLot.total_slots - selectedLot.available_slots) / selectedLot.total_slots) * 100
    )
  }, [selectedLot])

  const handleReservationConfirm = (slotId: string, hours: number) => {
    console.log(`Reservation confirmed: Slot ${slotId} for ${hours} hours`)
    // Handle reservation logic
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AppHeader
        userName="Yugraj"
        userRole="user"
        unreadNotifications={unreadNotifications}
        onNotificationClick={() => console.log('Open notifications')}
      />

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-4 md:px-8 py-6">
        {/* Left Sidebar - Stats & Controls */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Active Reservation Card */}
          {hasActiveReservation && (
            <DashboardCard
              title="Your Current Booking"
              icon={<Clock className="w-5 h-5" />}
              badge={{ label: 'Active', variant: 'success' }}
              delay={0}
            >
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-text-muted">Location</p>
                  <p className="font-semibold text-text-primary">{mockReservation.lot_id}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Slot</p>
                  <p className="font-bold text-brand-orange text-lg">{mockReservation.slot_id}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Time Remaining</p>
                  <motion.p
                    className="font-semibold text-text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    1 hour 23 mins
                  </motion.p>
                </div>
              </div>
            </DashboardCard>
          )}

          {/* Selected Lot Stats */}
          {selectedLot && (
            <>
              <DashboardCard
                title={selectedLot.name}
                subtitle="Parking Lot Details"
                icon={<MapPin className="w-5 h-5" />}
                delay={1}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Available Slots</span>
                    <motion.span
                      className="text-lg font-bold text-green-400"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      key={selectedLot.available_slots}
                    >
                      {selectedLot.available_slots}/{selectedLot.total_slots}
                    </motion.span>
                  </div>

                  {/* Occupancy Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">Occupancy</span>
                      <span className="text-xs font-semibold text-text-primary">{occupancyRate}%</span>
                    </div>
                    <motion.div
                      className="h-2 rounded-full bg-white/10 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-brand-orange"
                        initial={{ width: 0 }}
                        animate={{ width: `${occupancyRate}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Rate</span>
                    <span className="font-semibold text-brand-orange">₹{selectedLot.rate_per_hour}/hr</span>
                  </div>
                </div>
              </DashboardCard>

              {/* Quick Reserve Button */}
              <motion.button
                onClick={() => setIsReservationModalOpen(true)}
                className="btn-primary w-full py-3 font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 107, 44, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Reserve a Spot
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </>
          )}

          {/* Emergency Panel */}
          <EmergencyPanel userId="user-yugraj" lotName={selectedLot?.name} slotNumber="A-002" />
        </motion.div>

        {/* Right Content - Map */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Map Container */}
          <div className="rounded-lg overflow-hidden shadow-glow-orange">
            <TomTomMap
              lots={mockLots}
              selectedLotId={selectedLot?.lot_id}
              onLotSelect={(lot) => setSelectedLot(lot)}
              height="500px"
            />
          </div>

          {/* Nearby Lots Quick View */}
          <DashboardCard
            title="Nearby Parking Lots"
            subtitle="Top 3 closest available"
            delay={2}
          >
            <div className="space-y-3">
              {mockLots.slice(0, 3).map((lot, idx) => (
                <motion.button
                  key={lot.lot_id}
                  onClick={() => setSelectedLot(lot)}
                  className={`w-full p-3 rounded-lg transition-all text-left ${
                    selectedLot?.lot_id === lot.lot_id
                      ? 'glass-effect bg-brand-orange/10 border-brand-orange'
                      : 'glass-effect-sm border-white/10 hover:border-brand-orange/40'
                  }`}
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{lot.name}</p>
                      <p className="text-xs text-text-muted mt-1">
                        {lot.available_slots} slots • ₹{lot.rate_per_hour}/hr
                      </p>
                    </div>
                    <motion.div
                      className="text-lg font-bold text-green-400"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      {lot.available_slots}
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        lot={selectedLot}
        slots={lotsSlots}
        onClose={() => setIsReservationModalOpen(false)}
        onConfirm={handleReservationConfirm}
      />
    </div>
  )
}
