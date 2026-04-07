# SmartPark Front-End Architecture & Development Guide

## 📋 Project Overview

SmartPark is an enterprise-grade parking management platform with a **"Netflix/Airbnb-level" premium UI**. This document covers the complete front-end implementation using Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

---

## 🎨 Design System

### Color Palette (Dark Mode)

| Role | Value | Tailwind Class |
|------|-------|----------------|
| Background | #0D0D0D | `bg-background` |
| Surface | #1A1A1A | `bg-surface` |
| Text Primary | #EAEAEA | `text-text-primary` |
| Text Muted | #9CA3AF | `text-text-muted` |
| Brand Orange | #FF6B2C | `text-brand-orange` |
| Brand Amber | #FFB347 | `text-brand-amber` |

### Visual Style

**Glassmorphism:**
- Base: `glass-effect` (backdrop-blur-xl, opacity-80%)
- Small: `glass-effect-sm` (subtle variant)
- Large: `glass-effect-lg` (prominent variant)

**Glows:**
- Standard: `glow-orange` (20px radius)
- Large: `glow-orange-lg` (40px radius)
- Utility: `shadow-[0_0_20px_rgba(255,107,44,0.3)]`

**Typography:**
- Font: Inter
- Weights: 400, 500, 600, 700, 800
- Sizes: Use semantic classes (heading-1 through heading-5)

---

## 🏗️ Component Architecture

### Component Tree

```
AppHeader
├── Logo & Location
├── Navigation (responsive)
├── Notification Bell (with pulsing dot)
├── User Profile Badge
└── Mobile Menu Toggle

TomTomMap
├── Map Container
├── Custom Markers (color-coded)
├── Legend
└── Loading/Error States

Dashboard (User)
├── Sidebar
│   ├── Active Reservation Card
│   ├── Selected Lot Stats
│   └── Emergency Panel
└── Main
    ├── TomTomMap
    └── Nearby Lots Quick View

Dashboard (Admin)
├── KPI Stats Grid (4 columns)
├── Charts Section
│   ├── Occupancy Trend (LineChart)
│   └── Revenue Distribution (BarChart)
└── Parking Lots Overview
```

### Key Components

#### **AppHeader**
```typescript
<AppHeader
  userName="Yugraj"
  userRole="user"
  unreadNotifications={3}
  onNotificationClick={handleNotifications}
/>
```
- Sticky, glassmorphic, responsive menu
- Dynamic user profile display
- Notification badge with animation

#### **TomTomMap**
```typescript
<TomTomMap
  lots={mockLots}
  selectedLotId={selectedLot?.lot_id}
  onLotSelect={(lot) => setSelectedLot(lot)}
  height="500px"
  zoom={13}
/>
```
- CDN-loaded TomTom SDK
- Custom HTML markers (Green/Yellow/Red based on availability)
- Availability legend
- Auto-fly-to selected lot

#### **DashboardCard**
```typescript
<DashboardCard
  title="I²IT Main Parking"
  subtitle="Parking Lot Details"
  icon={<MapPin />}
  badge={{ label: 'Available', variant: 'success' }}
  delay={0}
>
  {/* Content */}
</DashboardCard>
```
- Settle-in animation: `y: 20→0, scale: 0.95→1, opacity: 0→1`
- Spring transition with damping: 15
- Staggered grid: 50ms delay between children
- Hover effect: `-5px offset + orange glow`

#### **ReservationModal**
```typescript
<ReservationModal
  isOpen={isOpen}
  lot={selectedLot}
  slots={availableSlots}
  onClose={() => setIsOpen(false)}
  onConfirm={(slotId, hours) => handleReservation()}
/>
```
- Glassmorphic modal with backdrop blur
- Slot grid selector (responsive columns)
- Duration picker (±1 hour controls)
- Real-time cost calculator (₹ en-IN locale)
- Payment confirmation

#### **EmergencyPanel**
```typescript
<EmergencyPanel
  userId="user-yugraj"
  lotName="I²IT Main"
  slotNumber="A-002"
  onReportSubmit={handleReport}
/>
```
- Red-bordered urgent design
- 3-state UI: Default → Reporting → Success
- Pulsing icon animation
- Multi-step form with location display
- Trigger NotificationService alerts

#### **StatCard** (for Admin)
```typescript
<StatCard
  label="Daily Revenue"
  value="₹8,500"
  trend="positive"
  change={{ value: 18, direction: 'up' }}
  icon={<TrendingUp />}
  delay={0}
/>
```
- KPI display with trend arrows
- Color-coded trends (green/red)
- Icon animation on hover

---

## 🎬 Animation System

### Motion Guidelines

**Container with Staggered Children:**
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 50ms between each
      delayChildren: 0.1,
    },
  },
}
```

**Item Settle-In Animation:**
```typescript
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
}
```

**Micro-Interactions:**
- Button: `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}`
- Card: `whileHover={{ y: -5, boxShadow: '0 0 30px rgba(255,107,44,0.2)' }}`
- Icon: `whileHover={{ rotate: 10, scale: 1.1 }}`

**Page Transitions:**
- Fade + slide: Exit left, enter right

---

## 📱 Responsive Design

### Breakpoints (Tailwind Default)
- Mobile: 0-639px (`sm:` for tablet)
- Tablet: 640-1023px (`md:` for tablet+)
- Desktop: 1024px+ (`lg:` for desktop+)

### Layout Patterns

**Desktop (>1024px):**
- Sidebar (left, fixed width)
- Main content (right, flex-grow)
- Grid gap: 24px

**Mobile (<640px):**
- Single column stack
- Map full-width or background
- Bottom sheet for actions
- Horizontal scroll for slot grids

### Responsive Utilities
```typescript
<ResponsiveContainer>
  {/* Auto padding & max-width */}
</ResponsiveContainer>

<TwoColumnLayout left={sidebar} right={main} />

<SidebarLayout sidebar={sidebar} main={main} />

<GridLayout cols={3} gap={6}>
  {/* Responsive grid */}
</GridLayout>

<BottomSheet isOpen height="md">
  {/* Mobile drawer */}
</BottomSheet>
```

---

## 💾 Data & State Management

### Zustand Store (Notifications)
```typescript
const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.notification_id !== id),
  })),
}))
```

### Notification Service
```typescript
// Trigger alerts
NotificationService.reservationConfirmed(slot, lot, userId)
NotificationService.incidentAlert(lot, description, managerId)
NotificationService.slotAvailable(slot, lot, userId)
NotificationService.triggerAlert(type, title, message, userId, duration)
```

### Mock Data
- `mockLots`: 3+ parking lots with real coordinates
- `mockSlots`: Available, reserved, occupied, blocked states
- `mockReservation`: Active user reservation example
- `mockIncidents`: Open incident reports
- `mockDashboardStats`: KPI & analytics data
- `mockOccupancyData`: Hourly occupancy trend
- `mockRevenueByLot`: Revenue by parking lot

---

## 🔐 TypeScript Interfaces

### User Role-Based
```typescript
type UserRole = 'user' | 'lot_manager' | 'super_admin'
```

### Data Models
```typescript
// All defined in @/types/index.ts
User, VehicleInfo
ParkingLot, ParkingSlot
Reservation, Incident
Notification, AnalyticsData
```

---

## 📊 Charts & Analytics

### Using Recharts
```typescript
import {
  ResponsiveContainer,
  LineChart, BarChart, PieChart,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend
} from 'recharts'

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={mockOccupancyData}>
    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
    <XAxis dataKey="time" stroke="#9CA3AF" />
    <YAxis stroke="#9CA3AF" />
    <Tooltip contentStyle={{...}} />
    <Legend />
    <Line 
      type="monotone" 
      dataKey="occupancy" 
      stroke="#FF6B2C"
      isAnimationActive={true}
    />
  </LineChart>
</ResponsiveContainer>
```

---

## 💰 Pricing & Localization

### Indian Rupee Formatting (en-IN)
```typescript
const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

// Output: ₹100, ₹2,500, ₹50,000
```

---

## 📦 Pages Structure

### Router Map
```
/                           Landing page (public)
/dashboard                  User dashboard (protected)
  - Map-first interface
  - Reservation modal
  - Emergency panel
  - Active booking status

/admin                      Super Admin dashboard (protected)
  - Global analytics
  - KPI stats
  - Charts (occupancy, revenue)
  - Parking lots overview
  - System health & alerts

/manager                    Lot Manager dashboard (future)
  - Lot-specific stats
  - Incident management
  - Real-time monitoring
```

---

## 🚀 Getting Started

### Required Environment Variables
```bash
NEXT_PUBLIC_TOMTOM_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Development Server
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run start
```

---

## 🎯 Design Principles

1. **"Expensive" Polish** - Every interaction feels premium (Netflix/Airbnb level)
2. **Glassmorphism Everywhere** - 12px blur on all surfaces
3. **Orange Accents** - Glow effects on CTA & primary elements
4. **Kinetic UI** - No static UI; everything has motion
5. **Mobile-First** - Responsive by default, optimized for cards
6. **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
7. **Performance** - Memoization, lazy loading, optimized images

---

## ✅ Accessibility Checklist

- [ ] All buttons have `aria-label` attributes
- [ ] Interactive elements are keyboard accessible
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Focus states visible on all controls
- [ ] Form labels associated with inputs
- [ ] Loading & error states announced
- [ ] Modals trap focus, allow escape key

---

## 📝 Coding Standards

### File Naming
- Components: `PascalCase.tsx` (e.g., `AppHeader.tsx`)
- Utilities: `camelCase.ts` (e.g., `mockData.ts`)
- Hooks: `use*` prefix (e.g., `useTomTomMap.ts`)

### Component Structure
```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import type { ComponentProps } from '@/types'

interface MyComponentProps {
  title: string
  children: ReactNode
  onClick?: () => void
}

export const MyComponent = ({
  title,
  children,
  onClick,
}: MyComponentProps) => {
  // Component logic
  return (
    <motion.div /* animation vars */>
      {/* JSX */}
    </motion.div>
  )
}
```

### Import Order
1. React & libraries
2. Framer Motion
3. Lucide Icons
4. Custom types
5. Custom hooks
6. Utilities
7. CSS classes

---

## 🔗 Next Steps (Backend Integration)

1. **Firebase Authentication**
   - Implement login/signup flows
   - Protect routes with auth guards
   - Store user profile in `/users` collection

2. **Real-Time Updates**
   - Firestore listeners for slot availability
   - WebSocket for incident alerts
   - Push notifications for reservations

3. **Cloud Functions**
   - Atomic slot locking (prevent double-booking)
   - Reservation timeout cleanup
   - Incident auto-escalation

4. **Payment Integration**
   - Razorpay or Stripe for INR payments
   - Transaction history in Firestore
   - Refund logic for cancellations

5. **Additional Dashboards**
   - Lot Manager dashboard
   - User booking history & analytics
   - Revenue reports

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [TomTom Maps](https://developer.tomtom.com)
- [Next.js 14](https://nextjs.org)

---

**SmartPark Front-End: Enterprise-Grade, Premium, Scalable** ✨
