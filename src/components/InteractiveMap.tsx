import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Filter,
  Navigation,
  Layers,
  Heart,
  ShieldCheck,
  RefreshCw,
  Info,
  Radio,
  Send,
  Sparkles
} from 'lucide-react';
import { AssistanceRequest, ServiceProvider, CategoryType } from '../types';

interface InteractiveMapProps {
  requests: AssistanceRequest[];
  providers: ServiceProvider[];
  selectedCategory: CategoryType;
  onCategoryChange: (cat: CategoryType) => void;
  onRequestHelpClick: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  requests,
  providers,
  selectedCategory,
  onCategoryChange,
  onRequestHelpClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // Clean up any stale leaflet ID to prevent "Map container is already initialized" error
    if ((container as any)._leaflet_id) {
      try {
        delete (container as any)._leaflet_id;
      } catch (e) {
        (container as any)._leaflet_id = undefined;
      }
    }

    if (!mapInstanceRef.current) {
      // Default center around Central coordinates
      const map = L.map(container, {
        center: [28.6139, 77.2090],
        zoom: 12,
        scrollWheelZoom: true,
        preferCanvas: true,
      });

      // Standard Humanitarian OpenStreetMap tiles (works out of the box with zero API keys)
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by HOT',
      }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;

      // Crucial: Invalidate size after DOM mount to guarantee tiles render fully
      const t1 = setTimeout(() => map.invalidateSize(), 50);
      const t2 = setTimeout(() => map.invalidateSize(), 150);
      const t3 = setTimeout(() => map.invalidateSize(), 400);
      const t4 = setTimeout(() => map.invalidateSize(), 800);

      // Window resize listener
      const handleResize = () => {
        map.invalidateSize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        window.removeEventListener('resize', handleResize);
        try {
          map.remove();
        } catch (e) {
          // ignore
        }
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
        if (container && (container as any)._leaflet_id) {
          delete (container as any)._leaflet_id;
        }
      };
    }
  }, []);

  // Ensure map size is recalculated when markers change
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
    }
  }, [requests.length, providers.length, selectedCategory]);

  // Update Markers whenever data or category filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const bounds: L.LatLngExpression[] = [];

    // Filtered providers
    const filteredProviders = providers.filter((p) => {
      if (p.status !== 'approved') return false;
      if (selectedCategory === 'all') return true;
      return p.category === selectedCategory || p.category === 'all';
    });

    // Filtered requests (only pending or in_progress)
    const filteredRequests = requests.filter((r) => {
      if (r.status === 'completed') return false;
      if (selectedCategory === 'all') return true;
      return r.category === selectedCategory;
    });

    // 1. Add Providers Markers
    filteredProviders.forEach((p) => {
      const lat = p.isLiveTracking && p.currentLat ? p.currentLat : p.lat;
      const lng = p.isLiveTracking && p.currentLng ? p.currentLng : p.lng;
      if (!lat || !lng) return;

      bounds.push([lat, lng]);

      const categoryEmoji =
        p.category === 'food'
          ? '🍲'
          : p.category === 'books'
          ? '📚'
          : p.category === 'clothes'
          ? '👕'
          : '📦';

      const providerIconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          ${
            p.isLiveTracking
              ? `<span class="animate-ping absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-80"></span>`
              : ''
          }
          <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white transform transition-transform hover:scale-110">
            <span class="text-base">${categoryEmoji}</span>
          </div>
          <div class="absolute -bottom-1 w-2 h-2 bg-emerald-600 rotate-45 border-r border-b border-white"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: providerIconHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -38],
      });

      const popupHtml = `
        <div style="font-family: inherit; min-width: 220px;" class="p-1">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="background-color: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; border: 1px solid #a7f3d0;">
              ✓ सत्यापित प्रदाता (Verified NGO)
            </span>
            ${
              p.isLiveTracking
                ? `<span style="background-color: #059669; color: white; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
                    लाइव जीपीएस
                   </span>`
                : ''
            }
          </div>
          <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 2px 0;">${p.name}</h4>
          <p style="font-size: 11px; color: #059669; font-weight: 600; margin: 0 0 6px 0;">
            श्रेणी: ${p.category === 'all' ? 'समग्र सहायता (All)' : p.category} ${categoryEmoji}
          </p>
          <p style="font-size: 12px; color: #475569; margin: 0 0 8px 0; line-height: 1.4;">${p.description}</p>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
            📍 ${p.address}
          </div>
          <div style="font-size: 11px; color: #059669; font-weight: 600;">
            ✓ जन्म प्रमाण पत्र व पहचान सत्यापित
          </div>
        </div>
      `;

      L.marker([lat, lng], { icon: customIcon })
        .addTo(markersLayer)
        .bindPopup(popupHtml);
    });

    // 2. Add Assistance Requests Markers
    filteredRequests.forEach((r) => {
      if (!r.lat || !r.lng) return;
      bounds.push([r.lat, r.lng]);

      const reqEmoji =
        r.category === 'food'
          ? '🍲'
          : r.category === 'books'
          ? '📚'
          : '👕';

      const isHighUrgency = r.urgency === 'high';
      const markerColor = isHighUrgency ? 'bg-rose-600' : 'bg-amber-500';
      const arrowColor = isHighUrgency ? 'bg-rose-600' : 'bg-amber-500';

      const requestIconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <span class="animate-ping absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full ${
            isHighUrgency ? 'bg-rose-400' : 'bg-amber-400'
          } opacity-80"></span>
          <div class="w-9 h-9 rounded-2xl ${markerColor} text-white flex items-center justify-center shadow-lg border-2 border-white transform transition-transform hover:scale-110">
            <span class="text-xs font-bold leading-none">${reqEmoji}</span>
          </div>
          <div class="absolute -bottom-1 w-2 h-2 ${arrowColor} rotate-45 border-r border-b border-white"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: requestIconHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -34],
      });

      const popupHtml = `
        <div style="font-family: inherit; min-width: 220px;" class="p-1">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="background-color: ${isHighUrgency ? '#ffe4e6' : '#fef3c7'}; color: ${
              isHighUrgency ? '#be123c' : '#92400e'
            }; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 9999px;">
              ${isHighUrgency ? '🚨 अति-आवश्यक (Urgent)' : '⚠️ सहायता अनुरोध (Request)'}
            </span>
            <span style="font-size: 10px; color: #64748b;">
              ${r.category.toUpperCase()} ${reqEmoji}
            </span>
          </div>
          <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 2px 0;">${r.name}</h4>
          <p style="font-size: 12px; color: #334155; margin: 0 0 8px 0; line-height: 1.4;">${r.description}</p>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">
            📍 ${r.address}
          </div>
          <div style="font-size: 11px; color: #059669; font-weight: 600;">
            ✓ जन्म प्रमाण पत्र संलग्न
          </div>
        </div>
      `;

      L.marker([r.lat, r.lng], { icon: customIcon })
        .addTo(markersLayer)
        .bindPopup(popupHtml);
    });

    // 3. User Location Marker
    if (userLocation) {
      bounds.push([userLocation.lat, userLocation.lng]);
      const userIconHtml = `
        <div class="relative flex items-center justify-center">
          <span class="animate-ping absolute h-6 w-6 rounded-full bg-blue-400 opacity-60"></span>
          <div class="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[9px] font-bold">
            YOU
          </div>
        </div>
      `;

      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: userIconHtml,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(markersLayer)
        .bindPopup('<div style="font-weight: 600; font-size: 12px;">📍 आपका वर्तमान स्थान (Your Location)</div>');
    }

    // Auto-fit bounds if we have points, otherwise center default view
    if (bounds.length > 0) {
      try {
        map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [40, 40], maxZoom: 14 });
      } catch (err) {
        // Fallback
      }
    } else {
      map.setView([28.6139, 77.2090], 12);
    }
  }, [requests, providers, selectedCategory, userLocation]);

  // Geolocation Handler
  const handleDetectLocation = () => {
    setLocating(true);
    setLocateError(null);
    if (!navigator.geolocation) {
      setLocateError('Geolocation not supported by browser / आपका ब्राउज़र स्थान सेवा समर्थित नहीं करता है');
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        setLocating(false);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([coords.lat, coords.lng], 14, { animate: true });
          mapInstanceRef.current.invalidateSize();
        }
      },
      (err) => {
        setLocateError(
          err.code === 1
            ? 'Location permission denied. Please allow access. (स्थान अनुमति अस्वीकृत)'
            : 'Unable to detect location. (स्थान प्राप्त करने में असमर्थ)'
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([28.6139, 77.2090], 12, { animate: true });
      mapInstanceRef.current.invalidateSize();
    }
  };

  const approvedProvidersCount = providers.filter((p) => p.status === 'approved').length;
  const activeReqsCount = requests.filter((r) => r.status !== 'completed').length;

  return (
    <section id="interactive-map" className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>ओपनस्ट्रीटमैप लाइव ग्रिड (OpenStreetMap Live Grid)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <span>📍 लाइव मैप और सेवा प्रदाता (Live Product & Provider Map)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              अपने पड़ोस में उपलब्ध भोजन, पुस्तकें, कपड़े व एनजीओ सहायता केंद्र देखें।
              (Explore real-time relief hubs, open requests, and verified dispatch teams in your vicinity)
            </p>
          </div>

          {/* Quick Stats in Header - 100% Real from 0 */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-emerald-50 text-emerald-800 font-semibold px-3 py-1.5 rounded-xl border border-emerald-200">
              🟢 {approvedProvidersCount} प्रदाता केंद्र (Active Hubs)
            </span>
            <span className="bg-amber-50 text-amber-800 font-semibold px-3 py-1.5 rounded-xl border border-amber-200">
              🚨 {activeReqsCount} सहायता अनुरोध (Requests)
            </span>
          </div>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          {/* Category Dropdown Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              श्रेणी फ़िल्टर (Category Filter):
            </span>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value as CategoryType)}
                className="bg-white border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl px-3 py-2 pr-8 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer shadow-xs"
              >
                <option value="all">🌐 सभी संसाधन (All Categories)</option>
                <option value="food">🍲 भोजन व राशन (Food Relief)</option>
                <option value="books">📚 किताबें व शिक्षा (Books & Education)</option>
                <option value="clothes">👕 कपड़े व गर्म वस्त्र (Clothing & Blankets)</option>
              </select>
            </div>
          </div>

          {/* Map Interaction Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDetectLocation}
              disabled={locating}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
              <span>{locating ? 'खोज रहे हैं... (Locating)' : '������ मेरा स्थान खोजें (Locate Me)'}</span>
            </button>

            <button
              onClick={handleResetView}
              title="Reset View to City Center"
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>रीसेट व्यू (Reset)</span>
            </button>
          </div>
        </div>

        {locateError && (
          <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-2 rounded-xl flex items-center space-x-2">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{locateError}</span>
          </div>
        )}

        {/* Informative banner when ledger starts from 0 */}
        {activeReqsCount === 0 && approvedProvidersCount === 0 && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs px-4 py-3 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>मानचित्र लाइव और सक्रिय है (Map is Ready):</strong> वर्तमान में 0 सहायता अनुरोध दर्ज हैं। जैसे ही आप या कोई नागरिक अनुरोध या प्रदाता फॉर्म जमा करेंगे, वे सीधे इस मानचित्र पर रीयल-टाइम दिखाई देंगे।
              </span>
            </div>
            <button
              onClick={onRequestHelpClick}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs shrink-0 cursor-pointer"
            >
              + पहला अनुरोध दर्ज करें
            </button>
          </div>
        )}

        {/* Map Container - Explicit Dimensions */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-300 shadow-md w-full bg-slate-100">
          {/* Leaflet Map Canvas */}
          <div
            ref={mapContainerRef}
            className="w-full h-[520px] sm:h-[580px] bg-slate-200"
            style={{ minHeight: '520px', width: '100%', position: 'relative', zIndex: 1 }}
          />

          {/* Floating Map Legend */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-lg max-w-xs text-xs space-y-2 pointer-events-auto">
            <div className="font-bold text-slate-800 border-b border-slate-100 pb-1 flex items-center justify-between">
              <span>मानचित्र संकेत (Map Legend)</span>
              <span className="text-[10px] text-emerald-600">OpenStreetMap Live</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-md bg-emerald-600 flex items-center justify-center text-[10px] text-white">
                  ✓
                </div>
                <span className="text-slate-700 font-medium">सत्यापित एनजीओ / प्रदाता (Verified NGO)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-md bg-amber-500 flex items-center justify-center text-[10px] text-white">
                  !
                </div>
                <span className="text-slate-700 font-medium">नागरिक सहायता अनुरोध (Assistance Request)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-slate-700 font-medium">लाइव जीपीएस प्रेषण (Live GPS Fleet)</span>
              </div>
            </div>
          </div>

          {/* Floating Quick Action CTA */}
          <div className="absolute top-4 right-4 z-20 pointer-events-auto">
            <button
              onClick={onRequestHelpClick}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 transition-transform hover:scale-105 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>मदद चाहिए? अनुरोध दर्ज करें (Need Help?)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
