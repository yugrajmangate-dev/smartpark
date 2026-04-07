/**
 * SmartPark Component Library Documentation
 * Complete guide to using all components with design system
 */

import React from 'react'

/**
 * ============================================
 * 1. COLOR PALETTE
 * ============================================
 *
 * Primary Background: #0D0D0D (Rich Black)
 * Surface Background: #1A1A1A (Charcoal)
 * Text Primary: #EAEAEA (Off-white)
 * Text Muted: #9CA3AF (Gray)
 * Brand Orange: #FF6B2C (Vibrant Orange)
 * Brand Amber: #FFB347 (Amber)
 *
 * Usage in CSS:
 * ✓ Use Tailwind: bg-background, bg-surface, text-text-primary, text-text-muted
 * ✓ Use Tailwind: text-brand-orange, text-brand-amber
 * ✓ Glow effects: shadow-glow-orange, shadow-glow-orange-lg
 */

/**
 * ============================================
 * 2. COMPONENTS & EXAMPLES
 * ============================================
 */

// --------- BUTTON
// Basic usage:
export example_Button = () => (
  <Button onClick={() => console.log('Clicked')}>
    Primary Button
  </Button>
)

// With variants:
export example_ButtonVariants = () => (
  <>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="outline">Outline</Button>
  </>
)

// With size and icon:
export example_ButtonWithIcon = () => (
  <Button size="lg" icon={<ChevronRight />} iconPosition="right">
    Reserve Now
  </Button>
)

// --------- CARD
// Basic card:
export example_Card = () => (
  <Card
    title="Your Current Booking"
    icon={<Clock />}
    badge={{ label: 'Active', variant: 'success' }}
  >
    <CardContent>Active reservation details here</CardContent>
    <CardFooter>
      <Button size="sm">Extend Time</Button>
    </CardFooter>
  </Card>
)

// --------- DASHBOARD CARD (with animations)
// Single card with settle-in animation:
export example_DashboardCard = () => (
  <DashboardCard
    title="I²IT Main Parking"
    subtitle="Parking Lot Details"
    icon={<MapPin />}
    badge={{ label: 'Available', variant: 'success' }}
    delay={0}
  >
    <p>Available Slots: 54/150</p>
    <p>Rate: ₹20/hour</p>
  </DashboardCard>
)

// Grid of cards with staggered animation:
export example_DashboardCardGrid = () => (
  <DashboardCardGrid columns={3}>
    {mockLots.map((lot, idx) => (
      <DashboardCard key={lot.lot_id} title={lot.name} delay={idx}>
        {/* content */}
      </DashboardCard>
    ))}
  </DashboardCardGrid>
)

// Stat card for KPIs:
export example_StatCard = () => (
  <StatCard
    label="Available Slots"
    value={254}
    unit="slots"
    icon={<Zap />}
    trend="positive"
    change={{ value: 12, direction: 'up' }}
    delay={0}
  />
)

// --------- HEADER
// App header with notifications:
export example_AppHeader = () => (
  <AppHeader
    userName="Yugraj"
    userRole="user"
    unreadNotifications={3}
    onNotificationClick={() => openNotifications()}
  />
)

// --------- MAP
// TomTom map with markers:
export example_TomTomMap = () => (
  <TomTomMap
    lots={mockLots}
    selectedLotId="i2it-main-001"
    onLotSelect={(lot) => console.log('Selected:', lot)}
    height="500px"
    zoom={13}
  />
)

// --------- MODAL
// Reservation modal with cost calculator:
export example_ReservationModal = () => (
  <ReservationModal
    isOpen={isOpen}
    lot={selectedLot}
    slots={availableSlots}
    onClose={() => setIsOpen(false)}
    onConfirm={(slotId, hours) => {
      // Handle reservation
    }}
  />
)

// --------- EMERGENCY PANEL
// Emergency reporting:
export example_EmergencyPanel = () => (
  <EmergencyPanel
    userId="user-yugraj"
    lotName="I²IT Main Parking"
    slotNumber="A-002"
    onReportSubmit={(description) => {
      // Handle incident report
      NotificationService.incidentAlert(
        'I²IT Main Parking',
        description,
        'manager-id'
      )
    }}
  />
)

// --------- NOTIFICATIONS
// Trigger notifications:
export example_Notifications = () => {
  // Success notification:
  NotificationService.reservationConfirmed('A-12', 'I²IT Main Parking', 'user-id')

  // Incident alert:
  NotificationService.incidentAlert(
    'I²IT Main Parking',
    'Vehicle blocked at slot B-010',
    'manager-id'
  )

  // Slot availability:
  NotificationService.slotAvailable('A-005', 'Blue Ridge Plaza', 'user-id')

  // Custom alert (5 second duration):
  NotificationService.triggerAlert(
    'admin_message',
    '🔔 Maintenance Notice',
    'Parking lot will be unavailable 2-4 AM for maintenance',
    'user-id',
    5000
  )
}

/**
 * ============================================
 * 3. ANIMATION SYSTEM
 * ============================================
 */

// Framer Motion - All components use these conventions:
const animationPatterns = {
  // Container with staggered children
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // 50ms between each child
        delayChildren: 0.1,
      },
    },
  },

  // Individual item settle-in animation
  itemVariants: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 100 },
    },
  },

  // Card hover state
  cardHoverVariants: {
    rest: { y: 0, borderColor: 'rgba(255, 255, 255, 0.1)' },
    hover: {
      y: -5,
      borderColor: 'rgba(255, 107, 44, 0.4)',
      boxShadow: '0 0 30px rgba(255, 107, 44, 0.2)',
    },
  },

  // Button interactions
  buttonVariants: {
    hover: { scale: 1.02, backgroundColor: '#FFB347' },
    tap: { scale: 0.98 },
  },
}

// Usage example:
export example_AnimationUsage = () => (
  <motion.div variants={animationPatterns.containerVariants}>
    {items.map((item, idx) => (
      <motion.div
        key={idx}
        variants={animationPatterns.itemVariants}
        whileHover={animationPatterns.cardHoverVariants.hover}
      >
        {/* content */}
      </motion.div>
    ))}
  </motion.div>
)

/**
 * ============================================
 * 4. RESPONSIVE PATTERNS
 * ============================================
 */

// Responsive container:
export example_ResponsiveContainer = () => (
  <ResponsiveContainer className="py-8">
    {/* Content automatically has responsive padding */}
  </ResponsiveContainer>
)

// Two column layout (stacks on mobile):
export example_TwoColumnLayout = () => (
  <TwoColumnLayout
    left={<SidebarContent />}
    right={<MainContent />}
    gap={6}
  />
)

// Sidebar layout:
export example_SidebarLayout = () => (
  <SidebarLayout
    sidebar={<SidebarContent />}
    main={<MainContent />}
  />
)

// Grid layout:
export example_GridLayout = () => (
  <GridLayout cols={3} gap={6}>
    {items.map(item => <Card key={item.id}>{item.name}</Card>)}
  </GridLayout>
)

// Bottom sheet (mobile drawer):
export example_BottomSheet = () => (
  <BottomSheet
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Nearby Lots"
    height="md"
  >
    {/* Drawer content */}
  </BottomSheet>
)

/**
 * ============================================
 * 5. PRICING & FORMATTING
 * ============================================
 */

// Always use locale-aware formatting for prices:
export example_PriceFormatting = () => {
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div>
      <p>₹{formatPrice(100)}</p> {/* Outputs: ₹100 */}
      <p>₹{formatPrice(2500)}</p> {/* Outputs: ₹2,500 */}
      <p>₹{formatPrice(50000)}</p> {/* Outputs: ₹50,000 */}
    </div>
  )
}

/**
 * ============================================
 * 6. DESIGN SYSTEM HELPERS
 * ============================================
 */

// CSS Classes for common patterns:
const designSystemHelpers = {
  glassEffect: 'glass-effect', // Full glassmorphism
  glassEffectSmall: 'glass-effect-sm', // Subtle glass effect
  glassEffectLarge: 'glass-effect-lg', // Large glass effect
  
  glowOrange: 'glow-orange', // Standard orange glow
  glowOrangeLarge: 'glow-orange-lg', // Intense glow
  
  buttonPrimary: 'btn-primary', // Orange button
  buttonSecondary: 'btn-secondary', // Glass button
  buttonGhost: 'btn-ghost', // Text button
  buttonDanger: 'btn-danger', // Red emergency button
  
  badge: {
    success: 'badge-success', // Green
    warning: 'badge-warning', // Yellow
    danger: 'badge-danger', // Red
    info: 'badge-info', // Orange
  },

  heading: {
    h1: 'heading-1', // 5xl-6xl font
    h2: 'heading-2', // 4xl-5xl font
    h3: 'heading-3', // 2xl-3xl font
    h4: 'heading-4', // xl-2xl font
    h5: 'heading-5', // lg font
  },

  animation: {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    slideLeft: 'animate-slideLeft',
    slideRight: 'animate-slideRight',
    pulseGlow: 'animate-pulseGlow',
    pulseDot: 'animate-pulseDot',
  },
}

/**
 * ============================================
 * 7. TYPESCRIPT INTERFACES
 * ============================================
 */

// Always define proper interfaces:
interface ExampleComponentProps {
  title: string
  items: Item[]
  onSelect?: (item: Item) => void
  isLoading?: boolean
}

// Data models from @/types:
interface User {
  uid: string
  email: string
  role: 'user' | 'lot_manager' | 'super_admin'
  vehicle_info?: VehicleInfo
}

interface ParkingLot {
  lot_id: string
  name: string
  latitude: number
  longitude: number
  available_slots: number
  total_slots: number
  rate_per_hour: number
}

interface ParkingSlot {
  slot_id: string
  lot_id: string
  slot_number: string
  status: 'available' | 'reserved' | 'occupied' | 'blocked'
}

/**
 * ============================================
 * 8. PERFORMANCE TIPS
 * ============================================
 */

/*
 * ✓ Use 'use client' at component level for interactivity
 * ✓ Memoize expensive computations with useMemo
 * ✓ Use motion divs sparingly - animate only necessary elements
 * ✓ Use Recharts ResponsiveContainer for charts (responsive by default)
 * ✓ Lazy load TomTom map only when component is visible
 * ✓ Use locale-aware formatting (en-IN) for prices
 * ✓ Leverage Tailwind's responsive classes: sm:, md:, lg:
 * ✓ Use motion.div instead of creating new components for small animations
 */

/**
 * ============================================
 * 9. ACCESSIBILITY
 * ============================================
 */

// Always include ARIA labels:
export example_Accessibility = () => (
  <>
    <button
      onClick={() => openMenu()}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
    >
      <Menu />
    </button>

    <div role="alert" className="flex gap-2">
      <AlertCircle />
      <p>This is an important alert</p>
    </div>
  </>
)
