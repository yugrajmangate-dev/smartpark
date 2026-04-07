/**
 * TomTom Maps Initialization Hook
 * Handles loading and configuring TomTom Maps SDK from CDN
 */

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    tt?: any;
  }
}

interface UseTomTomMapProps {
  elementId: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  apiKey?: string;
}

export const useTomTomMap = ({
  elementId,
  center = { lat: 18.5627, lng: 73.8173 }, // Hinjewadi, Pune
  zoom = 12,
  apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
}: UseTomTomMapProps) => {
  const mapRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const loadTomTomScript = async () => {
      if (scriptLoadedRef.current || window.tt) {
        return;
      }

      const script = document.createElement('script');
      script.src = `https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.0.0/maps/maps-web.min.js`;
      script.async = true;

      script.onload = () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.0.0/maps/maps.css`;
        document.head.appendChild(link);

        if (window.tt && apiKey) {
          scriptLoadedRef.current = true;

          // Initialize map
          window.tt.setProductType('maps');
          const mapElement = document.getElementById(elementId);

          if (mapElement) {
            mapRef.current = window.tt.map({
              key: apiKey,
              container: elementId,
              center: [center.lng, center.lat],
              zoom,
              style: 'https://api.tomtom.com/style/1/style/22.11.2b-0/dusk.json',
              dragPan: true,
              attributionControl: false,
            });
          }
        }
      };

      script.onerror = () => {
        console.error('Failed to load TomTom Maps SDK');
      };

      document.head.appendChild(script);
    };

    loadTomTomScript();

    return () => {
      // Cleanup if needed
    };
  }, [elementId, center, zoom, apiKey]);

  /**
   * Add marker to map
   */
  const addMarker = (
    lat: number,
    lng: number,
    options?: { id?: string; popup?: string; color?: string }
  ) => {
    if (!mapRef.current || !window.tt) return;

    const marker = new window.tt.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    if (options?.popup) {
      marker.setPopup(new window.tt.Popup().setText(options.popup));
    }

    return marker;
  };

  /**
   * set map center
   */
  const setCenter = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lng, lat], zoom: 15 });
    }
  };

  return {
    mapRef,
    addMarker,
    setCenter,
    isLoaded: scriptLoadedRef.current,
  };
};
