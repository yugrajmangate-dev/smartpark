# SmartPark – Enterprise Parking Management Platform

## Project Overview

**SmartPark** is an enterprise-grade parking management platform for **Hinjewadi Phase 1, Pune** (Initial pilot: I²IT area). It combines real-time mapping, AI-assisted slot discovery, secure booking, and professional incident management into a premium, Netflix/Airbnb-level experience.

### Core Mission
Stop drivers from circling endlessly. Provide enterprise-quality parking discovery and management with a futuristic, premium interface.

---

## 🎨 Design System

### Color Palette (Black & Orange Theme)
- **Primary Background**: `#0D0D0D` (Rich Black)
- **Surface Background**: `#1A1A1A` (Charcoal)
- **Primary Accent**: `#FF6B2C` (Energetic Orange)
- **Secondary Accent**: `#FFB347` (Amber-Orange)

### Glassmorphism & Animations
- **Blur**: 12px backdrop blur on all glass effects
- **Glow**: `0 0 20px rgba(255, 107, 44, 0.3)` for orange outer glow
- **Animations**: Framer Motion with staggered card entrances (50ms delay)

### Typography
- **Heading 1**: 48-60px, bold
- **Heading 2**: 36-48px, bold
- **Heading 3**: 24-30px, bold
- **Body**: 16px, regular
- **Caption**: 12-14px, light

---

## ✨ Features & Status

### Front-End (✅ COMPLETE)
- [x] Enterprise design system (colors, glassmorphism, animations)
- [x] Responsive layout (mobile-first with desktop optimization)
- [x] User Dashboard with real-time map and quick reserve
- [x] Super Admin Dashboard with analytics & KPI charts
- [x] Reservation modal with INR cost calculator
- [x] Emergency incident reporting UI
- [x] Notification system (Zustand store + Toast notifications)
- [x] Component library (8+ reusable components)
- [x] Responsive utilities (BottomSheet, SidebarLayout, etc.)

### Back-End (🚧 PENDING)
- [ ] Firebase Authentication (login/signup)
- [ ] Real-time Firestore listeners
- [ ] Atomic slot locking Cloud Functions
- [ ] Webhook notifications
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Lot Manager Dashboard

---

## 🏗️ Project Structure

```
smartpark/
├── FRONTEND_ARCHITECTURE.md     # Complete architecture guide
├── TESTING_CHECKLIST.md         # Visual verification checklist
├── package.json                 # Dependencies & scripts
├── tailwind.config.ts           # Tailwind with design tokens
├── tsconfig.json                # TypeScript strict mode
├── next.config.js               # Next.js configuration
│
├── public/                      # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Landing page (public)
│   │   ├── globals.css         # Global styles & 200+ design tokens
│   │   │
│   │   ├── dashboard/          # User dashboard (protected)
│   │   │   └── page.tsx        # Map-first interface, reservations
│   │   │
│   │   └── admin/              # Admin dashboard (protected)
│   │       └── page.tsx        # Global analytics, KPI charts
│   │
│   ├── components/             # Reusable UI components (8+)
│   │   ├── AppHeader.tsx       # Sticky nav with notifications
│   │   ├── TomTomMap.tsx       # Map with custom markers
│   │   ├── DashboardCard.tsx   # Card + Grid + StatCard
│   │   ├── ReservationModal.tsx # Slot selector, cost calculator
│   │   ├── EmergencyPanel.tsx  # Incident reporting UI
│   │   ├── Button.tsx          # Button variants
│   │   ├── Card.tsx            # Base card component
│   │   ├── NotificationContainer.tsx
│   │   └── index.ts            # Exports
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useAuth.ts          # Auth hook (Firebase ready)
│   │
│   ├── lib/
│   │   ├── firebase.ts         # Firebase SDK init (ready)
│   │   ├── mockData.ts         # Mock Hinjewadi dataset (3 lots)
│   │   ├── notificationService.ts # Zustand store
│   │   ├── responsiveUtils.tsx # Helper components (BottomSheet, etc.)
│   │   ├── COMPONENT_GUIDE.md  # Component usage examples
│   │   └── types.ts            # Interfaces
│   │
│   ├── services/               # Business logic
│   │   └── notificationService.ts
│   │
│   └── types/
│       └── index.ts            # All TypeScript interfaces
│
├── .env.example                 # Environment template
└── .gitignore
```

---

## 🎯 Pages & Routes

### Public Routes
- **`/`** - Landing page with hero section

### Protected Routes (Require Auth)
- **`/dashboard`** - User dashboard
  - Map with real-time parking lots (TomTom)
  - Slot reservation workflow
  - Emergency incident reporting
  - Active booking status
  
- **`/admin`** - Super admin dashboard
  - Global KPI statistics
  - Occupancy trend charts (LineChart)
  - Revenue distribution (BarChart)
  - Parking lots overview with capacity bars
  - System health & active incidents

- **`/manager`** - Lot manager dashboard (pending)
  - Lot-specific real-time monitoring
  - Incident queue & resolution
  - Slot status management

---

## 🎨 Component Library

### Pre-Built Components (Ready to Use)

| Component | Purpose | Status |
|-----------|---------|--------|
| **AppHeader** | Sticky navigation, notifications | ✅ Complete |
| **TomTomMap** | Parking lot map with markers | ✅ Complete |
| **DashboardCard** | Reusable card with animations | ✅ Complete |
| **StatCard** | KPI display with trends | ✅ Complete |
| **ReservationModal** | Slot booking workflow | ✅ Complete |
| **EmergencyPanel** | Incident reporting UI | ✅ Complete |
| **Button** | All button variants | ✅ Complete |
| **Card** | Base card component | ✅ Complete |
| **NotificationContainer** | Toast notifications | ✅ Complete |

### Responsive Utilities (Layout Helpers)

| Utility | Purpose |
|---------|---------|
| `ResponsiveContainer` | Auto padding & max-width |
| `TwoColumnLayout` | 1+2 grid, stacks on mobile |
| `SidebarLayout` | Sidebar + main, responsive |
| `GridLayout` | Adaptive grid (2/3/4 cols) |
| `BottomSheet` | Mobile drawer from bottom |
| `BleedContainer` | Full-width edge-to-edge |

---

## 📊 Mock Data

Pre-configured dataset for Hinjewadi Phase 1:

```typescript
// 3 Parking Lots
mockLots = [
  { 
    lot_id: 'i2it-main-001',
    name: 'I²IT Main Parking',
    available_slots: 96,
    total_slots: 150,
    rate_per_hour: 20
  },
  // ... Blue Ridge, Techno Hub
]

// 6 Parking Slots (mixed statuses)
mockSlots = [
  { slot_id: 'A-012', status: 'available' },
  { slot_id: 'A-013', status: 'reserved' },
  // ... more
]

// Dashboard Analytics
mockDashboardStats = {
  total_slots: 470,
  available_slots: 254,
  active_reservations: 45,
  daily_revenue: 8500,
  occupancy_rate: 46
}

// Occupancy Trend (hourly)
mockOccupancyData = [
  { time: '9 AM', occupancy: 35 },
  { time: '10 AM', occupancy: 48 },
  // ... hourly through 9 PM
]

// Revenue per Lot
mockRevenueByLot = [
  { lot: 'I²IT Main', revenue: 3000 },
  { lot: 'Blue Ridge', revenue: 3500 },
  { lot: 'Techno Hub', revenue: 2000 }
]
```

Use these immediately for testing; swap with Firebase queries for production.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- (.env.local file with API keys)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-org/smartpark.git
cd smartpark

# 2. Install dependencies
npm install

# 3. Create .env.local (copy from .env.example)
cp .env.example .env.local

# 4. Add your API keys:
# - NEXT_PUBLIC_TOMTOM_API_KEY (from developer.tomtom.com)
# - NEXT_PUBLIC_FIREBASE_* (from Firebase console)

# 5. Run development server
npm run dev

# 6. Open browser
# http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 🎬 Animation System

All components use Framer Motion with consistent spring physics:

```typescript
// Item settle-in (used everywhere)
transition={{ 
  type: 'spring',
  damping: 15,     // Smooth settle
  stiffness: 100,  // Responsive feel
}}

// Card hover
whileHover={{ y: -5, borderColor: 'rgba(255,107,44,0.4)' }}

// Button tap
whileTap={{ scale: 0.98 }}

// Grid stagger
staggerChildren: 0.05 // 50ms between cards
```

Result: Premium, responsive feel across all interactions.

---

## 📱 Responsive Design

### Mobile-First Approach
```
Mobile (0-639px)    → Single column, full-width
Tablet (640-1023px) → Two columns
Desktop (1024px+)   → Three columns + sidebar
```

### Example Responsive Classes
```css
/* Mobile by default, then override */
grid-cols-1              /* Mobile: 1 column */
md:grid-cols-2           /* Tablet: 2 columns */
lg:grid-cols-3           /* Desktop: 3 columns */

/* Responsive padding */
px-4 sm:px-6 lg:px-8     /* 16px → 24px → 32px */

/* Hidden on mobile, visible on desktop+ */
hidden lg:flex
```

---

## 💾 State Management

### Notifications (Zustand)
```typescript
// Trigger anywhere:
NotificationService.reservationConfirmed(slot, lot, userId)
NotificationService.incidentAlert(lot, description, managerId)
NotificationService.slotAvailable(slot, lot, userId)

// Toast auto-appears with 5s timeout
```

### User State (Firebase Auth - ready to connect)
```typescript
// Hook available: useAuth()
const { user, role, isLoading } = useAuth()

// Protect routes with auth:
if (isLoading) return <LoadingSpinner />
if (!user) return <Redirect to="/login" />
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **FRONTEND_ARCHITECTURE.md** | Complete architecture guide + design principles |
| **COMPONENT_GUIDE.md** | Usage examples for all components |
| **TESTING_CHECKLIST.md** | Visual verification checklist (75+ items) |
| **[This README]** | Quick start & overview |

---

## 🔐 Security & TypeScript

### Type Safety ✅
- Strict TypeScript mode (`strict: true`)
- No `any` types allowed
- All models defined in `@/types/index.ts`
- Component props fully typed

### Accessibility ✅
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Escape)
- Color contrast WCAG AA compliant
- Focus states visible
- Semantic HTML

---

## 🎯 Next Steps (Backend Integration)

### Phase 1: Authentication (Week 1)
```typescript
// Connect Firebase Auth
firebaseAuth.signInWithEmail(email, password)
// Update useAuth() hook
// Protect routes with auth guard
// Create login/signup pages
```

### Phase 2: Real-Time Data (Week 2)
```typescript
// Setup Firestore listeners
db.collection('slots').onSnapshot(updateSlots)
// Wire TomTom map to live slot availability
// Update reservations in real-time
```

### Phase 3: Reservations & Cloud Functions (Week 3)
```typescript
// Implement slot locking (atomic transaction)
// Create Cloud Function: lockSlot()
// Enable dual-user conflict prevention
// Add refund logic
```

### Phase 4: Lot Manager & Payment (Week 4)
```typescript
// Build Lot Manager dashboard
// Integrate Razorpay INR payments
// Add transaction history
// Create incident management workflow
```

---

## 📊 Performance

### Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse**: Target 90+
- **Bundle Size**: OptimizeImages + code split

### Optimizations Applied ✅
- Recharts ResponsiveContainer for adaptive charts
- Memoized occupancy calculations
- Lazy TomTom SDK loading
- Optimized font loading
- CSS-in-JS for design tokens

---

## 🐛 Troubleshooting

### TomTom Map Not Loading
- Verify `NEXT_PUBLIC_TOMTOM_API_KEY` in `.env.local`
- Check browser console for API errors
- Fallback UI shows "Map unavailable" message

### Notifications Not Showing
- Ensure `NotificationContainer` rendered in layout.tsx
- Check Zustand store state in browser DevTools
- Verify notification duration (default 5s)

### Responsive Layout Issues
- Inspect Tailwind breakpoints with browser DevTools
- Use Chrome device emulation (mobile view)
- Check that ResponsiveContainer is wrapping content

### INR Formatting Shows Decimals
- Ensure `minimumFractionDigits: 0` in Intl.NumberFormat
- Use `en-IN` locale (not global browser setting)
- Test with values: 100, 2500, 50000

---

## 📞 Support & Contributing

- **Issues**: Create GitHub issue with reproduction steps
- **Questions**: Check FRONTEND_ARCHITECTURE.md first
- **Pull Requests**: Follow TypeScript / Tailwind conventions

---

## 📄 License

[Your License Here]

---

## 🎉 Status

✅ **Front-End: Production Ready**
- Design system implemented
- All major components built
- Responsive design tested
- Mock data ready for integration
- **Ready for Firebase auth + real-time features**

---

**SmartPark: Enterprise Parking, Premium Experience** ✨

│   │
│   ├── hooks/                  # React hooks
│   │   ├── useAuth.ts          # Firebase authentication
│   │   ├── useTomTomMap.ts     # TomTom Maps integration
│   │   └── [feature hooks]
│   │
│   ├── lib/                    # Utilities & configurations
│   │   └── firebase.ts         # Firebase SDK initialization
│   │
│   ├── services/               # Business logic & APIs
│   │   ├── notificationService.ts  # Real-time notifications
│   │   └── [domain services]
│   │
│   ├── store/                  # Zustand store slices
│   │   └── [state management]
│   │
│   └── types/                  # TypeScript interfaces
│       └── index.ts            # All domain models
│
├── .env.example                # Environment variables template
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS theme
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 📦 Tech Stack

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript** (Strict mode)
- **Tailwind CSS** (with custom theme)
- **Framer Motion** (animations)
- **Lucide Icons** (UI icons)

### State & APIs
- **Zustand** (state management)
- **Firebase** (auth, Firestore, storage)
- **Axios** (HTTP client)

### Analytics & Utilities
- **Recharts** (dashboards & analytics)
- **TomTom Maps** (mapping integration)

---

## 📋 Data Models (Firestore)

### Collections

#### `/users`
```typescript
{
  uid: string;
  email: string;
  display_name: string;
  role: 'user' | 'lot_manager' | 'super_admin';
  vehicle_info?: { plate_number, vehicle_type, color, model };
  phone?: string;
  created_at: number;
  updated_at: number;
}
```

#### `/lots`
```typescript
{
  lot_id: string;
  name: string;
  location_name: string; // "Hinjewadi Phase 1, I²IT Area"
  latitude: number;
  longitude: number;
  manager_id: string;
  total_slots: number;
  available_slots: number;
  rate_per_hour: number;
  address: string;
  amenities?: string[];
  operating_hours?: { open, close };
  created_at: number;
  updated_at: number;
}
```

#### `/slots`
```typescript
{
  slot_id: string;
  lot_id: string;
  slot_number: string;
  status: 'available' | 'reserved' | 'occupied' | 'blocked';
  reserved_by?: string;
  occupied_by?: string;
  blocked_reason?: string;
  reserved_until?: number;
  last_updated: number;
}
```

#### `/incidents`
```typescript
{
  incident_id: string;
  reporter_id: string;
  lot_id: string;
  slot_id: string;
  incident_type: 'blocked_vehicle' | 'damaged_spot' | 'other';
  description: string;
  status: 'open' | 'resolved';
  assigned_to?: string;
  severity: 'low' | 'medium' | 'high';
  attachments?: string[];
  created_at: number;
  resolved_at?: number;
}
```

---

## 🔐 Coding Rules

### TypeScript
- **No `any` type** – Use strict interfaces
- **All data models in `/src/types/index.ts`**
- **Interfaces for all Props**
- Example:
  ```typescript
  interface ButtonProps {
    variant: 'primary' | 'secondary';
    onClick: () => void;
    children: ReactNode;
  }
  ```

### Components
- **Location**: `src/components/`
- **Export format**: Named exports + centralized `index.ts`
- **Styling**: Tailwind classes + inline animations via Framer Motion
- **Destructure props** with explicit types
- Example:
  ```typescript
  export const Card = ({ title, children }: CardProps) => {
    return <div className="card">{children}</div>;
  };
  ```

### Motion & Animations
- **Always use Framer Motion** for component transitions
- **Wrap in `AnimatePresence`** for exit animations
- **Use `motion.*` divs** for interactive elements
- **Stagger children** with 50ms delay for card grids
- Example:
  ```typescript
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  ```

### Environment Variables
- Store ALL API keys in `.env.local` (never commit)
- Use `NEXT_PUBLIC_` prefix for browser-accessible variables
- Required variables:
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_TOMTOM_API_KEY`
  - `NEXT_PUBLIC_API_URL`

### File Naming
- **Components**: PascalCase (e.g., `Button.tsx`)
- **Utilities**: camelCase (e.g., `firebase.ts`)
- **Hooks**: `use*` prefix (e.g., `useTomTomMap.ts`)

### Code Quality
- **Modular functions** – Keep functions under 50 lines
- **Descriptive names** – `getUserReservations()` not `get()`
- **Inline comments** for complex logic
- **No console.log in production** – use proper logging

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone & install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase & TomTom API keys
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   ```
   http://localhost:3000
   ```

### Build for Production
```bash
npm run build
npm run start
```

---

## 🔧 Key Features

### Implemented ✅
- ✅ **Design System** (Black & Orange theme, glassmorphism)
- ✅ **Landing Page** with Framer Motion animations
- ✅ **Firebase Integration** (auth, Firestore ready)
- ✅ **TomTom Maps** hook ready for integration
- ✅ **Notification Service** (Zustand store)
- ✅ **Reusable Components** (Button, Card, Toast)
- ✅ **Type Safety** (All domain models defined)
- ✅ **Global Styles** (CSS animations, utilities)

### In Development 🚧
- [ ] User Dashboard with map
- [ ] Lot Manager Dashboard
- [ ] Super Admin Analytics Dashboard
- [ ] Reservation flow (atomic locking)
- [ ] Incident reporting system
- [ ] Authentication flows (login, signup)
- [ ] Real-time notifications (WebSockets/Firestore listeners)

---

## 📖 Usage Examples

### Using the Button Component
```typescript
import { Button } from '@/components';

<Button 
  variant="primary" 
  size="lg"
  onClick={() => navigate('/dashboard')}
  icon={<ArrowRight />}
  iconPosition="right"
>
  Get Started
</Button>
```

### Using Notifications
```typescript
import { NotificationService } from '@/services/notificationService';

NotificationService.reservationConfirmed('A-12', 'Hinjewadi I²IT', userId);
NotificationService.incidentAlert('Hinjewadi I²IT', 'Vehicle blocked.', managerId);
```

### Using TomTom Map
```typescript
import { useTomTomMap } from '@/hooks/useTomTomMap';

const { mapRef, addMarker, setCenter } = useTomTomMap({
  elementId: 'map-container',
  center: { lat: 18.5627, lng: 73.8173 },
  zoom: 12,
});

addMarker(18.5627, 73.8173, { popup: 'Hinjewadi I²IT' });
```

---

## 📝 Commit Convention

Follow conventional commits:
```
feat: Add user dashboard with map
fix: Resolve double-booking issue in reservations
refactor: Extract ReservationLogic to custom hook
docs: Update README with API endpoints
style: Align component spacing to design system
```

---

## 🤝 Contributing

When adding features:
1. Create a feature branch: `git checkout -b feat/feature-name`
2. Ensure strict TypeScript (no `any`)
3. Use Framer Motion for all transitions
4. Document complex logic with inline comments
5. Test animations and interactions
6. Submit PR with description

---

## 📞 Support

For questions or issues, reach out to the SmartPark development team.

---

**Version**: 1.0.0  
**Last Updated**: April 7, 2026  
**Status**: In Active Development  
**Target Tone**: Premium, Futuristic, Enterprise-Quality
- ⚙️ **Slot Management**: Create, update, and delete parking slots
- 👥 **Team Management**: Add and manage parking lot managers
- 📈 **Analytics**: Real-time metrics on occupancy, revenue, and usage

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Styling**: shadcn/ui, Lucide Icons
- **Backend**: Node.js/Firebase (Firebase Auth, Firestore, Functions)
- **AI/ML**: Google Genkit (LLM-powered recommendations)
- **Map**: TomTom Web SDK v6
- **Hosting**: Azure Static Web Apps (Frontend) + Azure Functions (Backend)

## Prerequisites

Before you begin, ensure you have:
- **Node.js** 18+ and npm
- **Git**
- A **Firebase project** (free tier available)
- (Optional) **TomTom API Key** for map integration

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yugrajmangate-dev/smartpark.git
cd smartpark
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

NEXT_PUBLIC_TOMTOM_API_KEY=your_tomtom_api_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
smarpark/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── dashboard/          # User dashboard
│   │   ├── admin/              # Admin panel
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Navigation.tsx       # Top nav bar
│   │   ├── Dashboard.tsx        # User dashboard
│   │   ├── AdminDashboard.tsx   # Admin dashboard
│   │   ├── MapComponent.tsx     # Map integration
│   │   ├── AIRecommender.tsx    # AI search panel
│   │   ├── FeatureCard.tsx      # Feature cards
│   │   ├── CTA.tsx             # Call-to-action
│   │   └── Button.tsx          # Reusable button
│   ├── lib/
│   │   ├── mockData.ts         # Mock parking data
│   │   └── aiSimulation.ts     # AI flow simulation
│   └── types/
│       └── index.ts            # TypeScript types
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## Development Workflow

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
npm start
```

### Code Quality

```bash
npm run lint
```

## Deployment

### Deploy to Azure Static Web Apps

1. **Create a GitHub Personal Access Token**:
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Create a token with `repo` and `workflow` scopes

2. **Create Azure Static Web App**:
   ```bash
   az staticwebapp create \
     --name smartpark \
     --resource-group myResourceGroup \
     --source https://github.com/yugrajmangate-dev/smartpark \
     --branch main \
     --login-with-github
   ```

3. **Configure GitHub Actions**:
   - Azure will automatically create a `.github/workflows/azure-static-web-apps-*.yml` file
   - Update `app_location` to `./` and `app_build_folder` to `.next`

4. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

5. **View Deployment**:
   - Go to your Azure Static Web App resource
   - Copy the default domain URL
   - Your app will be live!

## API Reference (Mock)

### User Endpoints
- `GET /api/parking/lots` – Get all parking lots
- `GET /api/parking/lots/:id` – Get lot details
- `POST /api/reservations` – Create a reservation
- `GET /api/reservations/:userId` – Get user's bookings

### Admin Endpoints
- `POST /api/admin/lots` – Create a lot
- `PUT /api/admin/lots/:id` – Update lot
- `DELETE /api/admin/lots/:id` – Delete lot
- `GET /api/admin/analytics` – Get analytics data

## Known Limitations (MVP)

- Currently focused on Hinjewadi Phase 1; expansion requires seeding new lots
- Payment integration is demo-level; production requires Stripe/UPI integration
- TomTom API has strict CORS requirements; ensure your domain is whitelisted
- Push notifications are not yet implemented
- AI recommendations use mock data; production requires real Genkit integration

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License – see the LICENSE file for details.

## Support

For questions or issues:
- Open an issue on GitHub
- Documentation: [Wiki](https://github.com/yugrajmangate-dev/smartpark/wiki)

## Acknowledgments

- Built for Imagine Cup 2026
- Uses Azure Static Web Apps, Firebase, and Genkit AI
- Icons by Lucide React
- UI powered by shadcn/ui and Tailwind CSS

---

**Made with ❤️ in Pimpri-Chinchwad**
