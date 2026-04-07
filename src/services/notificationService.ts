/**
 * Notification Service Store
 * Cross-app real-time notification system using Zustand
 */

import { create } from 'zustand';
import type { Notification } from '@/types';

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

/**
 * Global notification store
 * All components subscribe to this for cross-app alerts
 */
export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  addNotification: (notification: Notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.notification_id !== id),
    })),

  markAsRead: (id: string) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.notification_id === id ? { ...n, read: true } : n
      ),
    })),

  clearAll: () => set({ notifications: [] }),
}));

/**
 * Notification Service
 * Handles triggering and managing notifications across the app
 */
export class NotificationService {
  static triggerAlert = (
    type: Notification['type'],
    title: string,
    message: string,
    recipient_id?: string,
    duration = 5000
  ): void => {
    const notification: Notification = {
      notification_id: `${Date.now()}-${Math.random()}`,
      recipient_id: recipient_id || 'system',
      type,
      title,
      message,
      read: false,
      created_at: Date.now(),
    };

    useNotificationStore.getState().addNotification(notification);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        useNotificationStore.getState().removeNotification(notification.notification_id);
      }, duration);
    }
  };

  /**
   * Trigger incident alert for admins
   */
  static incidentAlert = (
    lotName: string,
    description: string,
    manager_id: string
  ): void => {
    this.triggerAlert(
      'incident_alert',
      `🚨 Incident: ${lotName}`,
      description,
      manager_id,
      0 // Don't auto-remove incident alerts
    );
  };

  /**
   * Trigger reservation confirmation
   */
  static reservationConfirmed = (
    slotNumber: string,
    lotName: string,
    user_id: string
  ): void => {
    this.triggerAlert(
      'reservation_confirmed',
      '✅ Reservation Confirmed',
      `Slot ${slotNumber} at ${lotName}`,
      user_id,
      5000
    );
  };

  /**
   * Trigger slot availability alert
   */
  static slotAvailable = (
    slotNumber: string,
    lotName: string,
    user_id: string
  ): void => {
    this.triggerAlert(
      'slot_available',
      '📍 Slot Available',
      `${slotNumber} at ${lotName}`,
      user_id,
      5000
    );
  };
}
