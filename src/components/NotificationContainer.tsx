/**
 * Notification Toast Component
 * Real-time toast notification with dismissal
 */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, CheckCircle, InfoIcon } from 'lucide-react'
import { useNotificationStore } from '@/services/notificationService'
import type { Notification } from '@/types'

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'incident_alert':
      return <AlertCircle className="w-5 h-5" />
    case 'reservation_confirmed':
      return <CheckCircle className="w-5 h-5" />
    case 'slot_available':
      return <InfoIcon className="w-5 h-5" />
    default:
      return <InfoIcon className="w-5 h-5" />
  }
}

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'incident_alert':
      return 'bg-red-900/30 border-red-500/30'
    case 'reservation_confirmed':
      return 'bg-green-900/30 border-green-500/30'
    case 'slot_available':
      return 'bg-sp-orange/20 border-sp-orange/40'
    default:
      return 'bg-sp-charcoal border-sp-orange/20'
  }
}

interface NotificationToastProps {
  notification: Notification
}

const NotificationToast = ({ notification }: NotificationToastProps) => {
  const { removeNotification } = useNotificationStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(notification.notification_id)
    }, 6000)

    return () => clearTimeout(timer)
  }, [notification.notification_id, removeNotification])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`glass-effect border rounded-lg p-4 mb-3 max-w-sm ${getNotificationColor(
        notification.type
      )}`}
    >
      <div className="flex items-start gap-3">
        <div className="text-sp-orange mt-0.5">{getNotificationIcon(notification.type)}</div>
        <div className="flex-1">
          <p className="font-semibold text-text-primary">{notification.title}</p>
          <p className="text-text-secondary text-sm mt-1">{notification.message}</p>
        </div>
        <button
          onClick={() => removeNotification(notification.notification_id)}
          className="text-text-muted hover:text-text-primary transition-colors ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export const NotificationContainer = () => {
  const notifications = useNotificationStore((state) => state.notifications)

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <NotificationToast key={notification.notification_id} notification={notification} />
        ))}
      </AnimatePresence>
    </div>
  )
}
