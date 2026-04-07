/**
 * TomTomMap Component
 * Interactive parking lot map with custom markers showing availability
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { ParkingLot } from '@/types'

declare global {
  interface Window {
    tt?: any
  }
}

interface TomTomMapProps {
  lots: ParkingLot[]
  selectedLotId?: string
  onLotSelect?: (lot: ParkingLot) => void
  height?: string
  zoom?: number
  center?: { lat: number; lng: number }
}

/**
 * Get marker color based on availability percentage
 */
const getMarkerColor = (availableSlots: number, totalSlots: number): string => {
  const percentage = (availableSlots / totalSlots) * 100
  if (percentage >= 50) return '#22C55E' // Green - Available
  if (percentage >= 20) return '#FBBF24' // Yellow - Busy
  return '#EF4444' // Red - Full
}

/**
 * Create custom HTML marker for TomTom
 */
const createCustomMarker = (
  lot: ParkingLot,
  isSelected: boolean,
  onClick: () => void
): HTMLElement => {
  const container = document.createElement('div')
  container.className = 'custom-marker-container'
  container.style.cursor = 'pointer'

  const availability = lot.available_slots
  const percentage = (availability / lot.total_slots) * 100
  const color = getMarkerColor(availability, lot.total_slots)

  const marker = document.createElement('div')
  marker.innerHTML = `
    <div style="
      position: relative;
      width: 56px;
      height: 56px;
      transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
      transition: transform 0.2s ease;
    ">
      ${/* Outer ping circle */ ''}
      <div style="
        position: absolute;
        inset: 0;
        background-color: ${color};
        border-radius: 50%;
        opacity: 0.2;
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      "></div>
      
      ${/* Main marker circle */ ''}
      <div style="
        position: absolute;
        inset: 2px;
        background-color: ${color};
        border: 2px solid rgba(234, 234, 234, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: ${isSelected ? `0 0 20px ${color}` : `0 0 10px ${color}`};
        font-weight: bold;
        font-size: 12px;
        color: white;
        font-family: Inter, system-ui, sans-serif;
      ">
        ${availability}
      </div>

      ${/* Info tooltip (shown on hover/selection) */ ''}
      ${
        isSelected
          ? `
        <div style="
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px 12px;
          margin-bottom: 8px;
          white-space: nowrap;
          color: rgba(234, 234, 234, 0.9);
          font-size: 11px;
          border-bottom: 2px solid ${color};
          font-family: Inter, system-ui, sans-serif;
        ">
          ${lot.name}<br/>₹${lot.rate_per_hour}/hr
        </div>
      `
          : ''
      }
    </div>

    <style>
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.2; }
        50% { transform: scale(1.3); opacity: 0; }
      }
    </style>
  `

  marker.addEventListener('click', onClick)
  container.appendChild(marker)

  return container
}

export const TomTomMap = ({
  lots,
  selectedLotId,
  onLotSelect,
  height = '500px',
  zoom = 13,
  center = { lat: 18.5627, lng: 73.8173 }, // Hinjewadi default
}: TomTomMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<Map<string, any>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Load TomTom SDK if not already loaded
    if (window.tt) {
      initializeMap()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.0.0/maps/maps-web.min.js'
    script.async = true
    script.onload = () => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.0.0/maps/maps.css'
      document.head.appendChild(link)

      setTimeout(initializeMap, 100)
    }
    script.onerror = () => {
      setHasError(true)
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
    }
  }, [])

  const initializeMap = () => {
    if (!mapContainer.current || !window.tt) return

    try {
      const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY || 'YOUR_TOMTOM_API_KEY'

      window.tt.setProductType('maps')
      mapRef.current = window.tt.map({
        key: apiKey,
        container: mapContainer.current,
        center: [center.lng, center.lat],
        zoom,
        style: 'https://api.tomtom.com/style/1/style/22.11.2b-0/dusk.json',
        dragPan: true,
        attributionControl: false,
      })

      // Add markers for all lots
      lots.forEach((lot) => {
        const isSelected = lot.lot_id === selectedLotId
        const marker = createCustomMarker(lot, isSelected, () => {
          onLotSelect?.(lot)
        })

        const tomTomMarker = new window.tt.Marker()
          .setLngLat([lot.longitude, lot.latitude])
          .setElement(marker)
          .addTo(mapRef.current)

        markersRef.current.set(lot.lot_id, tomTomMarker)
      })

      setIsLoading(false)
    } catch (error) {
      console.error('Map initialization error:', error)
      setHasError(true)
      setIsLoading(false)
    }
  }

  // Update marker when selection changes
  useEffect(() => {
    if (!mapRef.current || !window.tt) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    // Re-add markers with updated selection state
    lots.forEach((lot) => {
      const isSelected = lot.lot_id === selectedLotId
      const marker = createCustomMarker(lot, isSelected, () => {
        onLotSelect?.(lot)
      })

      const tomTomMarker = new window.tt.Marker()
        .setLngLat([lot.longitude, lot.latitude])
        .setElement(marker)
        .addTo(mapRef.current)

      markersRef.current.set(lot.lot_id, tomTomMarker)
    })

    // Fly to selected lot
    if (selectedLotId) {
      const selectedLot = lots.find((l) => l.lot_id === selectedLotId)
      if (selectedLot) {
        mapRef.current.flyTo({
          center: [selectedLot.longitude, selectedLot.latitude],
          zoom: 14,
          duration: 1000,
        })
      }
    }
  }, [selectedLotId, lots, onLotSelect])

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Map Container */}
      <motion.div
        ref={mapContainer}
        style={{ height }}
        className="w-full glass-effect border border-glass"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center glass-effect">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-10 h-10 border-2 border-brand-orange border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-text-muted text-sm font-medium">Loading map...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center glass-effect">
          <div className="text-center">
            <p className="text-text-primary font-semibold mb-2">Unable to load map</p>
            <p className="text-text-muted text-sm">Please check your API key and try again</p>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <motion.div
        className="absolute top-4 right-4 glass-effect p-4 rounded-lg max-w-xs z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs font-semibold text-text-primary mb-3">Availability</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-text-muted">50%+ Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-text-muted">20-50% Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-text-muted">Below 20%</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
