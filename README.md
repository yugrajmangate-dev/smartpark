# SmartPark – AI-Powered Parking Reservation

> Discover, reserve, and manage parking with smart AI recommendations in Hinjewadi Phase 1

## Overview

SmartPark is a modern web application that solves the parking crisis in dense tech hubs like Hinjewadi. Users can discover available parking spots in real-time, receive AI-powered recommendations, and manage reservations seamlessly. Administrators have tools to manage lots, slots, incidents, and analytics.

## Features

### User Features
- 🗺️ **Live Map Dashboard**: Interactive map showing parking lots and real-time availability
- 🤖 **AI Parking Assistant**: Natural language parking search with smart recommendations
- 🎫 **Instant Reservations**: Book a spot in seconds with secure confirmation
- 📋 **Booking History**: Track all past and upcoming reservations
- 🚨 **Incident Reporting**: Report "I'm Blocked" situations for immediate resolution

### Admin Features
- 📊 **Lot Manager Dashboard**: Manage specific parking lots and slots
- 🏆 **Super Admin Dashboard**: Global overview of all lots, occupancy, and incidents
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
- Contact: yugrajmangate@example.com
- Documentation: [Wiki](https://github.com/yugrajmangate-dev/smartpark/wiki)

## Acknowledgments

- Built for Imagine Cup 2026
- Uses Azure Static Web Apps, Firebase, and Genkit AI
- Icons by Lucide React
- UI powered by shadcn/ui and Tailwind CSS

---

**Made with ❤️ in Pimpri-Chinchwad**
