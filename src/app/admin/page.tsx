/**
 * Super Admin Dashboard
 * Global analytics and system health monitoring
 */

'use client'

import { motion } from 'framer-motion'
import { AppHeader, DashboardCard, DashboardCardGrid, StatCard } from '@/components'
import { mockLots, mockDashboardStats, mockOccupancyData, mockRevenueByLot } from '@/lib/mockData'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, Zap, AlertCircle } from 'lucide-react'

const COLORS = ['#FF6B2C', '#FFB347', '#22C55E']

export default function AdminDashboardPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AppHeader
        userName="Main Admin"
        userRole="super_admin"
        unreadNotifications={3}
      />

      {/* Main Content */}
      <motion.main
        className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-text-primary mb-2">System Dashboard</h1>
          <p className="text-text-muted">Real-time analytics for Hinjewadi Phase 1</p>
        </motion.div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Slots"
            value={mockDashboardStats.total_slots}
            unit="slots"
            icon={<Zap className="w-5 h-5" />}
            delay={0}
          />
          <StatCard
            label="Available Now"
            value={mockDashboardStats.available_slots}
            trend="positive"
            change={{ value: 12, direction: 'up' }}
            icon={<TrendingUp className="w-5 h-5" />}
            delay={1}
          />
          <StatCard
            label="Active Reservations"
            value={mockDashboardStats.active_reservations}
            trend="neutral"
            change={{ value: 5, direction: 'up' }}
            icon={<Users className="w-5 h-5" />}
            delay={2}
          />
          <StatCard
            label="Daily Revenue"
            value={`₹${mockDashboardStats.daily_revenue.toLocaleString('en-IN')}`}
            trend="positive"
            change={{ value: 18, direction: 'up' }}
            icon={<TrendingUp className="w-5 h-5" />}
            delay={3}
          />
        </div>

        {/* Charts Section */}
        <DashboardCardGrid columns={2}>
          {/* Occupancy Chart */}
          <DashboardCard
            title="Hourly Occupancy Trend"
            subtitle="Today's parking utilization"
            delay={4}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockOccupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(26,26,26,0.95)',
                    border: '1px solid rgba(255,107,44,0.3)',
                    borderRadius: '8px',
                    color: '#EAEAEA',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#FF6B2C"
                  dot={{ fill: '#FF6B2C', r: 3 }}
                  activeDot={{ r: 5 }}
                  strokeWidth={2}
                  isAnimationActive={true}
                  name="Occupancy (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </DashboardCard>

          {/* Revenue by Lot */}
          <DashboardCard
            title="Revenue Distribution"
            subtitle="Earnings by parking lot"
            delay={5}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockRevenueByLot}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="lot" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(26,26,26,0.95)',
                    border: '1px solid rgba(255,107,44,0.3)',
                    borderRadius: '8px',
                    color: '#EAEAEA',
                  }}
                />
                <Bar dataKey="revenue" fill="#FF6B2C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DashboardCard>
        </DashboardCardGrid>

        {/* Parking Lots Overview */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <DashboardCard
            title="Parking Lots Overview"
            subtitle="Current status of all managed lots"
            delay={6}
          >
            <div className="space-y-4">
              {mockLots.map((lot, idx) => {
                const occupancyRate = Math.round(
                  ((lot.total_slots - lot.available_slots) / lot.total_slots) * 100
                )
                return (
                  <motion.div
                    key={lot.lot_id}
                    className="p-4 glass-effect-sm rounded-lg border border-white/10 hover:border-brand-orange/40 transition-all"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary">{lot.name}</h4>
                        <p className="text-xs text-text-muted mt-1">{lot.address}</p>
                      </div>
                      <motion.span
                        className="text-lg font-bold text-brand-orange"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                      >
                        {lot.available_slots}/{lot.total_slots}
                      </motion.span>
                    </div>

                    {/* Status Bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand-orange to-brand-amber"
                          initial={{ width: 0 }}
                          animate={{ width: `${occupancyRate}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-text-primary min-w-[40px] text-right">
                        {occupancyRate}%
                      </span>
                    </div>

                    {/* Manager & Rate Info */}
                    <div className="flex gap-4 mt-3 text-xs">
                      <div>
                        <span className="text-text-muted">Manager:</span>
                        <span className="ml-1 text-text-primary">{lot.manager_id}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">Rate:</span>
                        <span className="ml-1 text-brand-orange font-semibold">₹{lot.rate_per_hour}/hr</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </DashboardCard>
        </motion.div>

        {/* System Health & Alerts */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <DashboardCard
            title="System Health"
            icon={<Zap className="w-5 h-5" />}
            badge={{ label: 'Operational', variant: 'success' }}
            delay={7}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">API Response Time</span>
                <span className="text-sm font-semibold text-green-400">142ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Database Status</span>
                <span className="text-sm font-semibold text-green-400">✓ Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Server Uptime</span>
                <span className="text-sm font-semibold text-text-primary">99.9%</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Active Incidents"
            subtitle="Pending reports"
            icon={<AlertCircle className="w-5 h-5" />}
            badge={{ label: '2 Open', variant: 'warning' }}
            delay={8}
          >
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-xs font-semibold text-red-300">🚨 High Priority</p>
                <p className="text-xs text-text-muted mt-1">Vehicle blocking at Blue Ridge - Slot B-010</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-xs font-semibold text-yellow-300">⚠️ Medium</p>
                <p className="text-xs text-text-muted mt-1">Pothole damaged at I²IT Main - Slot A-005</p>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      </motion.main>
    </div>
  )
}
