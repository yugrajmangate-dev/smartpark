/**
 * SmartPark Type Definitions
 * Strict TypeScript interfaces for all domain models
 */

// User Roles
export type UserRole = 'user' | 'lot_manager' | 'super_admin';

// Slot Statuses
export type SlotStatus = 'available' | 'reserved' | 'occupied' | 'blocked';

// Incident Statuses
export type IncidentStatus = 'open' | 'resolved';

/**
 * User Profile
 */
export interface User {
  uid: string;
  email: string;
  display_name: string;
  role: UserRole;
  vehicle_info?: VehicleInfo;
  phone?: string;
  created_at: number;
  updated_at: number;
}

/**
 * Vehicle Information
 */
export interface VehicleInfo {
  plate_number: string;
  vehicle_type: 'sedan' | 'suv' | 'hatchback' | 'bike' | 'other';
  color?: string;
  model?: string;
}

/**
 * Parking Lot
 */
export interface ParkingLot {
  lot_id: string;
  name: string;
  location_name: string; // e.g., "Hinjewadi Phase 1, I²IT Area"
  latitude: number;
  longitude: number;
  manager_id: string;
  total_slots: number;
  available_slots: number;
  rate_per_hour: number;
  rate_per_day?: number;
  address: string;
  amenities?: string[];
  operating_hours?: {
    open: string; // "06:00"
    close: string; // "23:00"
  };
  created_at: number;
  updated_at: number;
}

/**
 * Parking Slot
 */
export interface ParkingSlot {
  slot_id: string;
  lot_id: string;
  slot_number: string;
  status: SlotStatus;
  reserved_by?: string; // user_id
  occupied_by?: string; // user_id
  blocked_reason?: string;
  reserved_until?: number; // timestamp
  last_updated: number;
}

/**
 * Reservation
 */
export interface Reservation {
  reservation_id: string;
  user_id: string;
  lot_id: string;
  slot_id: string;
  vehicle_plate: string;
  check_in_time: number;
  check_out_time: number;
  status: 'active' | 'completed' | 'cancelled';
  total_cost: number;
  created_at: number;
}

/**
 * Incident Report (I'm Blocked / Emergency)
 */
export interface Incident {
  incident_id: string;
  reporter_id: string;
  lot_id: string;
  slot_id: string;
  incident_type: 'blocked_vehicle' | 'damaged_spot' | 'other';
  description: string;
  status: IncidentStatus;
  assigned_to?: string; // manager_id
  severity: 'low' | 'medium' | 'high';
  attachments?: string[]; // image URLs
  created_at: number;
  resolved_at?: number;
  resolution_notes?: string;
}

/**
 * Notification
 */
export interface Notification {
  notification_id: string;
  recipient_id: string;
  type: 'reservation_confirmed' | 'incident_alert' | 'slot_available' | 'admin_message';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  created_at: number;
}

/**
 * Analytics Data (for Super Admin Dashboard)
 */
export interface AnalyticsData {
  date: string;
  total_reservations: number;
  total_revenue: number;
  occupancy_rate: number;
  average_duration_minutes: number;
  incidents_reported: number;
  peak_hours: string[]; // e.g., ["09:00", "10:00", "18:00"]
}

/**
 * Map Marker (for TomTom Map)
 */
export interface MapMarker {
  lot_id: string;
  latitude: number;
  longitude: number;
  name: string;
  available_slots: number;
  total_slots: number;
  rate_per_hour: number;
}

/**
 * API Responses
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}
