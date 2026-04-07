/**
 * Mock Data for SmartPark Dashboard
 * Realistic data for Hinjewadi Phase 1, I²IT area
 */

import type { ParkingLot, ParkingSlot, Reservation, Incident } from '@/types'

// Mock Parking Lots
export const mockLots: ParkingLot[] = [
  {
    lot_id: 'i2it-main-001',
    name: 'I²IT Main Parking',
    location_name: 'I²IT Campus, Hinjewadi Phase 1',
    latitude: 18.5627,
    longitude: 73.8173,
    manager_id: 'i2itparking',
    total_slots: 150,
    available_slots: 54,
    rate_per_hour: 20,
    rate_per_day: 100,
    address: 'Survey No. 124-A, Hinjewadi, Pune 411057',
    amenities: ['24/7 Security', 'CCTV Monitoring', 'EV Charging'],
    operating_hours: {
      open: '06:00',
      close: '23:30',
    },
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    lot_id: 'blueridge-plaza-002',
    name: 'Blue Ridge Plaza',
    location_name: 'Hinjewadi IT Park',
    latitude: 18.5645,
    longitude: 73.8195,
    manager_id: 'blueridgeparking',
    total_slots: 200,
    available_slots: 28,
    rate_per_hour: 15,
    rate_per_day: 80,
    address: 'Plot No. 45, Hinjewadi, Pune 411057',
    amenities: ['24/7 Security', 'CCTV Monitoring'],
    operating_hours: {
      open: '06:30',
      close: '23:00',
    },
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    lot_id: 'techno-hub-003',
    name: 'Techno Hub Campus',
    location_name: 'Hinjewadi Phase 1',
    latitude: 18.5600,
    longitude: 73.8150,
    manager_id: 'technohubparking',
    total_slots: 120,
    available_slots: 15,
    rate_per_hour: 25,
    rate_per_day: 120,
    address: 'Incubation Building, Hinjewadi, Pune 411057',
    amenities: ['24/7 Security', 'CCTV Monitoring', 'EV Charging', 'Covered Parking'],
    operating_hours: {
      open: '06:00',
      close: '00:00',
    },
    created_at: Date.now(),
    updated_at: Date.now(),
  },
]

// Mock Parking Slots for I²IT Main
export const mockSlots: ParkingSlot[] = [
  {
    slot_id: 'i2it-A-001',
    lot_id: 'i2it-main-001',
    slot_number: 'A-001',
    status: 'available',
    last_updated: Date.now(),
  },
  {
    slot_id: 'i2it-A-002',
    lot_id: 'i2it-main-001',
    slot_number: 'A-002',
    status: 'reserved',
    reserved_by: 'user-yugraj',
    reserved_until: Date.now() + 3600000, // 1 hour from now
    last_updated: Date.now(),
  },
  {
    slot_id: 'i2it-A-003',
    lot_id: 'i2it-main-001',
    slot_number: 'A-003',
    status: 'occupied',
    occupied_by: 'user-xyz',
    last_updated: Date.now(),
  },
  {
    slot_id: 'i2it-A-004',
    lot_id: 'i2it-main-001',
    slot_number: 'A-004',
    status: 'available',
    last_updated: Date.now(),
  },
  {
    slot_id: 'i2it-A-005',
    lot_id: 'i2it-main-001',
    slot_number: 'A-005',
    status: 'blocked',
    blocked_reason: 'Maintenance in progress',
    last_updated: Date.now(),
  },
  {
    slot_id: 'i2it-B-001',
    lot_id: 'i2it-main-001',
    slot_number: 'B-001',
    status: 'available',
    last_updated: Date.now(),
  },
]

// Mock User Reservation
export const mockReservation: Reservation = {
  reservation_id: 'res-yugraj-001',
  user_id: 'user-yugraj',
  lot_id: 'i2it-main-001',
  slot_id: 'i2it-A-002',
  vehicle_plate: 'MH02AB1234',
  check_in_time: Date.now() - 1800000, // 30 min ago
  check_out_time: Date.now() + 5400000, // 1.5 hours from now
  status: 'active',
  total_cost: 30, // ₹30 for the current session
  created_at: Date.now() - 1800000,
}

// Mock Incidents
export const mockIncidents: Incident[] = [
  {
    incident_id: 'inc-001',
    reporter_id: 'user-abc',
    lot_id: 'i2it-main-001',
    slot_id: 'i2it-A-005',
    incident_type: 'damaged_spot',
    description: 'Pothole in the parking spot',
    status: 'open',
    severity: 'medium',
    created_at: Date.now() - 7200000,
  },
  {
    incident_id: 'inc-002',
    reporter_id: 'user-def',
    lot_id: 'blueridge-plaza-002',
    slot_id: 'blueridge-B-010',
    incident_type: 'blocked_vehicle',
    description: 'Vehicle is blocking my spot',
    status: 'open',
    assigned_to: 'blueridgeparking',
    severity: 'high',
    created_at: Date.now() - 1800000,
  },
]

// Dashboard Statistics (for Super Admin)
export const mockDashboardStats = {
  total_lots: mockLots.length,
  total_slots: mockLots.reduce((acc, lot) => acc + lot.total_slots, 0),
  available_slots: mockLots.reduce((acc, lot) => acc + lot.available_slots, 0),
  occupancy_rate: (
    ((mockLots.reduce((acc, lot) => acc + lot.total_slots, 0) -
      mockLots.reduce((acc, lot) => acc + lot.available_slots, 0)) /
      mockLots.reduce((acc, lot) => acc + lot.total_slots, 0)) *
    100
  ).toFixed(1),
  active_reservations: 45,
  open_incidents: 2,
  daily_revenue: 8500, // ₹8500
  peak_hours: ['09:00-10:00', '12:00-13:00', '17:00-18:30'],
}

// Hourly occupancy data for charts
export const mockOccupancyData = [
  { time: '06:00', occupancy: 10 },
  { time: '07:00', occupancy: 25 },
  { time: '08:00', occupancy: 45 },
  { time: '09:00', occupancy: 75 },
  { time: '10:00', occupancy: 82 },
  { time: '11:00', occupancy: 78 },
  { time: '12:00', occupancy: 88 },
  { time: '13:00', occupancy: 85 },
  { time: '14:00', occupancy: 72 },
  { time: '15:00', occupancy: 55 },
  { time: '16:00', occupancy: 68 },
  { time: '17:00', occupancy: 92 },
  { time: '18:00', occupancy: 95 },
  { time: '19:00', occupancy: 80 },
  { time: '20:00', occupancy: 60 },
]

// Revenue data by lot
export const mockRevenueByLot = [
  { lot: 'I²IT Main', revenue: 3200 },
  { lot: 'Blue Ridge', revenue: 2800 },
  { lot: 'Techno Hub', revenue: 2500 },
]
