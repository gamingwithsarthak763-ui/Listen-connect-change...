import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AssistanceRequest, ServiceProvider } from '../types';
import { calculateHaversineDistanceKm, estimateTravelTimeMinutes } from '../utils/geo';

interface AdminDutyRouteMapProps {
  request: AssistanceRequest | null;
  provider: ServiceProvider | null;
}

export const AdminDutyRouteMap: React.FC<AdminDutyRouteMapProps> = ({ request, provider }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    if ((container as any)._leaflet_id) {
      try {
        delete (container as any)._leaflet_id;
      } catch (e) {
        (container as any)._leaflet_id = undefined;
      }
    }

    if (!mapInstanceRef.current) {
      const map = L.map(container, {
        center: [28.6139, 77.2090],
        zoom: 12,
        scrollWheelZoom: true,
        preferCanvas: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
        attribution: '&copy; OpenStreetMap contributors, HOT',
      }).addTo(map);

      const routeLayer = L.layerGroup().addTo(map);
      routeLayerRef.current = routeLayer;
      mapInstanceRef.current = map;

      const t1 = setTimeout(() => map.invalidateSize(), 50);
      const t2 = setTimeout(() => map.invalidateSize(), 200);
      const t3 = setTimeout(() => map.invalidateSize(), 500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.remove();
          } catch (e) {}
          mapInstanceRef.current = null;
        }
        if (container && (container as any)._leaflet_id) {
          delete (container as any)._leaflet_id;
        }
      };
    }
  }, []);

  // Render Dynamic Route Polyline and endpoints
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = routeLayerRef.current;
    if (!map || !layer) return;

    map.invalidateSize();
    layer.clearLayers();

    if (!request || !provider) {
      return;
    }

    const provLat = provider.isLiveTracking && provider.currentLat ? provider.currentLat : provider.lat;
    const provLng = provider.isLiveTracking && provider.currentLng ? provider.currentLng : provider.lng;
    const reqLat = request.lat;
    const reqLng = request.lng;

    const providerCoord: [number, number] = [provLat, provLng];
    const requesterCoord: [number, number] = [reqLat, reqLng];

    const distanceKm = calculateHaversineDistanceKm(provLat, provLng, reqLat, reqLng);
    const etaMinutes = estimateTravelTimeMinutes(distanceKm);

    // 1. Provider Marker (Origin)
    const provIcon = L.divIcon({
      className: 'route-prov-icon',
      html: `
        <div class="relative flex items-center justify-center">
          ${provider.isLiveTracking ? '<span class="animate-ping absolute h-8 w-8 rounded-full bg-emerald-400 opacity-70"></span>' : ''}
          <div class="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xl border-2 border-white font-bold text-xs">
            🏢 HUB
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    L.marker(providerCoord, { icon: provIcon })
      .addTo(layer)
      .bindPopup(`
        <div style="font-family: inherit; font-size: 12px;">
          <b style="color: #065f46;">🏢 प्रदाता प्रेषण केंद्र (Dispatch Hub)</b><br/>
          <strong>${provider.name}</strong><br/>
          ${provider.isLiveTracking ? '<span style="color:#059669; font-weight:700;">🟢 लाइव जीपीएस सक्रिय</span>' : ''}
        </div>
      `);

    // 2. Requester Marker (Destination)
    const reqIcon = L.divIcon({
      className: 'route-req-icon',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="animate-ping absolute h-8 w-8 rounded-full bg-rose-400 opacity-70"></span>
          <div class="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xl border-2 border-white font-bold text-xs">
            📍 SOS
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    L.marker(requesterCoord, { icon: reqIcon })
      .addTo(layer)
      .bindPopup(`
        <div style="font-family: inherit; font-size: 12px;">
          <b style="color: #be123c;">🚨 राहत गंतव्य (Beneficiary Location)</b><br/>
          <strong>${request.name}</strong><br/>
          आवश्यकता: ${request.category.toUpperCase()}<br/>
          पता: ${request.address}
        </div>
      `);

    // 3. Dynamic Route Polyline
    const midLat = (provLat + reqLat) / 2 + (Math.sin(provLng) * 0.003);
    const midLng = (provLng + reqLng) / 2 + (Math.cos(provLat) * 0.003);

    L.polyline([providerCoord, [midLat, midLng], requesterCoord], {
      color: '#059669',
      weight: 5,
      opacity: 0.85,
      dashArray: '10, 8',
      lineCap: 'round',
    }).addTo(layer);

    // Midpoint Distance Pill Marker
    const midIcon = L.divIcon({
      className: 'distance-pill-icon',
      html: `
        <div class="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-emerald-400 flex items-center space-x-1 whitespace-nowrap">
          <span>🚗 ${distanceKm} km</span>
          <span class="text-emerald-400">(${etaMinutes} min)</span>
        </div>
      `,
      iconSize: [110, 26],
      iconAnchor: [55, 13],
    });

    L.marker([midLat, midLng], { icon: midIcon }).addTo(layer);

    // Fit map bounds
    const bounds = L.latLngBounds([providerCoord, requesterCoord, [midLat, midLng]]);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [request, provider, provider?.currentLat, provider?.currentLng, provider?.isLiveTracking]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-80 sm:h-96 bg-slate-100 z-10" style={{ minHeight: '320px' }} />

      {request && provider && (
        <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-lg max-w-xs text-xs space-y-1">
          <div className="font-bold text-slate-800 flex items-center justify-between border-b border-slate-100 pb-1">
            <span>🗺️ ड्यूटी रूट (Active Duty Route)</span>
            <span className="text-[10px] text-emerald-600 font-mono">Haversine Calculated</span>
          </div>
          <div className="text-slate-600">
            <strong>हब (Hub):</strong> {provider.name}
          </div>
          <div className="text-slate-600">
            <strong>गंतव्य (Target):</strong> {request.name} ({request.category})
          </div>
          <div className="pt-1 flex items-center justify-between font-bold text-emerald-700">
            <span>दूरी: {calculateHaversineDistanceKm(
              provider.isLiveTracking && provider.currentLat ? provider.currentLat : provider.lat,
              provider.isLiveTracking && provider.currentLng ? provider.currentLng : provider.lng,
              request.lat,
              request.lng
            )} km</span>
            <span>अनुमानित समय: ~{estimateTravelTimeMinutes(
              calculateHaversineDistanceKm(
                provider.isLiveTracking && provider.currentLat ? provider.currentLat : provider.lat,
                provider.isLiveTracking && provider.currentLng ? provider.currentLng : provider.lng,
                request.lat,
                request.lng
              )
            )} मिनट</span>
          </div>
        </div>
      )}
    </div>
  );
};
