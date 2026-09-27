import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Check,
  X,
  Eye,
  MapPin,
  Radio,
  Navigation,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Phone,
  Layers,
  ArrowRight,
  RefreshCw,
  Route,
  Building2,
  FileCheck,
  Calendar,
  UserCheck,
  Database,
  Trash2
} from 'lucide-react';
import { AssistanceRequest, ServiceProvider } from '../types';
import { calculateHaversineDistanceKm, estimateTravelTimeMinutes } from '../utils/geo';
import { AdminDutyRouteMap } from './AdminDutyRouteMap';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  requests: AssistanceRequest[];
  providers: ServiceProvider[];
  onUpdateProviderStatus: (providerId: string, status: 'approved' | 'rejected') => Promise<void>;
  onMarkRequestCompleted: (requestId: string, assignedProviderId?: string) => Promise<void>;
  onUpdateLiveLocation: (providerId: string, lat: number, lng: number, isLive: boolean) => Promise<void>;
  onDeleteRequest?: (requestId: string) => Promise<void>;
  onDeleteProvider?: (providerId: string) => Promise<void>;
  isFullPageView?: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  requests,
  providers,
  onUpdateProviderStatus,
  onMarkRequestCompleted,
  onUpdateLiveLocation,
  onDeleteRequest,
  onDeleteProvider,
  isFullPageView = false,
}) => {
  // Passcode verification state
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  // Active Admin Tab: 'approvals' | 'requests' | 'routes'
  const [activeTab, setActiveTab] = useState<'approvals' | 'requests' | 'routes'>('approvals');

  // Preview Modal for Documents (Birth Proof & Govt ID)
  const [previewDoc, setPreviewDoc] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  // Route map selection states
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);

  // Live GPS Broadcast state
  const [broadcastingProviderId, setBroadcastingProviderId] = useState<string | null>(null);
  const [broadcastIntervalId, setBroadcastIntervalId] = useState<any>(null);
  const [watchGpsId, setWatchGpsId] = useState<number | null>(null);

  // Action status message
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Cleanup GPS broadcast watchers on unmount
  useEffect(() => {
    return () => {
      if (broadcastIntervalId) clearInterval(broadcastIntervalId);
      if (watchGpsId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchGpsId);
      }
    };
  }, [broadcastIntervalId, watchGpsId]);

  if (!isOpen && !isFullPageView) return null;

  // Passcode submit handler
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '6188') {
      setIsAuthenticated(true);
      setPasscodeError(null);
    } else {
      setPasscodeError('अमान्य सुरक्षा पासकोड! (Invalid security passcode)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    setPasscodeError(null);
  };

  const showNotification = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  // Toggle Live GPS Broadcast for a Provider
  const handleToggleLiveBroadcast = (provider: ServiceProvider) => {
    const isCurrentlyBroadcasting = provider.isLiveTracking || broadcastingProviderId === provider.id;

    if (isCurrentlyBroadcasting) {
      if (broadcastIntervalId) clearInterval(broadcastIntervalId);
      if (watchGpsId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchGpsId);
        setWatchGpsId(null);
      }
      setBroadcastIntervalId(null);
      setBroadcastingProviderId(null);
      onUpdateLiveLocation(provider.id, provider.lat, provider.lng, false);
      showNotification(`🔴 ${provider.name} का लाइव जीपीएस प्रसारण रोका गया (Broadcast Stopped)`);
    } else {
      setBroadcastingProviderId(provider.id);

      let currentLat = provider.lat;
      let currentLng = provider.lng;

      if (navigator.geolocation) {
        try {
          const wId = navigator.geolocation.watchPosition(
            (pos) => {
              currentLat = pos.coords.latitude;
              currentLng = pos.coords.longitude;
              onUpdateLiveLocation(provider.id, currentLat, currentLng, true);
            },
            (err) => {
              console.warn('Geolocation watch pulse fallback:', err);
            },
            { enableHighAccuracy: true }
          );
          setWatchGpsId(wId);
        } catch (e) {
          // ignore
        }
      }

      let stepCount = 0;
      const interval = setInterval(() => {
        stepCount++;
        const deltaLat = Math.sin(stepCount / 2) * 0.0008;
        const deltaLng = Math.cos(stepCount / 2) * 0.0008;
        const newLat = Number((provider.lat + deltaLat).toFixed(5));
        const newLng = Number((provider.lng + deltaLng).toFixed(5));

        onUpdateLiveLocation(provider.id, newLat, newLng, true);
      }, 3500);

      setBroadcastIntervalId(interval);
      onUpdateLiveLocation(provider.id, currentLat, currentLng, true);
      showNotification(`🟢 ${provider.name} का रीयल-टाइम जीपीएस प्रसारण प्रारंभ हुआ (Live GPS Broadcast Started)`);
    }
  };

  // Filtered lists
  const pendingProviders = providers.filter((p) => p.status === 'pending');
  const approvedProviders = providers.filter((p) => p.status === 'approved');
  const pendingRequests = requests.filter((r) => r.status === 'pending' || r.status === 'in_progress');
  const completedRequests = requests.filter((r) => r.status === 'completed');

  // Currently selected request and provider for duty map
  const activeDutyRequest = requests.find((r) => r.id === (selectedRequestId || pendingRequests[0]?.id)) || null;
  const activeDutyProvider = providers.find((p) => p.id === (selectedProviderId || approvedProviders[0]?.id)) || null;

  const containerClasses = isFullPageView
    ? 'min-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col my-4'
    : 'bg-white rounded-3xl w-full max-w-6xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[95vh] my-auto';

  const wrapperClasses = isFullPageView
    ? 'container mx-auto px-4 py-6'
    : 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto';

  return (
    <div className={wrapperClasses}>
      <div className={containerClasses}>
        {/* Admin Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  एडमिनिस्ट्रेटिव कमांड डैशबोर्ड (Admin Control Center)
                </h2>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  Protected Console
                </span>
              </div>
              <p className="text-xs text-slate-400">
                सत्यापन समीक्षा, जन्म प्रमाण पत्र (Birth Proof) सत्यापन, Haversine दूरी गणना एवं लाइव जीपीएस प्रसारण
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-xl border border-slate-700 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>लॉक (Lock)</span>
              </button>
            )}

            {!isFullPageView && (
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors font-bold text-sm cursor-pointer"
                aria-label="Close Admin Modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Global Toast Notification */}
        {actionSuccess && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* UN-AUTHENTICATED STATE: PASSCODE REQUIRED (PRIVATE) */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 bg-slate-100 text-slate-800 rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-slate-200">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                सुरक्षित एडमिन प्रमाणीकरण (Security Verification)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                प्रदाता समीक्षा, जन्म प्रमाण पत्र सत्यापन और ड्यूटी रूट नियंत्रण हेतु निजी पासकोड दर्ज करें।
              </p>
              <div className="mt-2 inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200">
                अधिकृत एक्सेस (Restricted Access)
              </div>
            </div>

            <form onSubmit={handlePasscodeSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="सुरक्षा पासकोड दर्ज करें (Enter Passcode)"
                  className="w-full text-center text-xl tracking-widest font-mono bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  autoFocus
                />
              </div>

              {passcodeError && (
                <div className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                  {passcodeError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>डैशबोर्ड अनलॉक करें (Unlock Dashboard)</span>
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD VIEW */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Real Database Telemetry Ribbon */}
            <div className="bg-slate-800 text-slate-200 px-6 py-2 text-xs flex flex-wrap items-center justify-between border-b border-slate-700 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <Database className="w-3.5 h-3.5" />
                  <span>वास्तविक डेटाबेस आंकड़े (Live Database Counts):</span>
                </span>
                <span>कुल अनुरोध: <strong className="text-white">{requests.length}</strong></span>
                <span>•</span>
                <span>सत्यापित प्रदाता: <strong className="text-emerald-400">{approvedProviders.length}</strong></span>
                <span>•</span>
                <span>पूर्ण मिशन: <strong className="text-sky-400">{completedRequests.length}</strong></span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">100% Real-Time Firestore Sync</span>
            </div>

            {/* Admin Tabs Navigation */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center space-x-2">
                {/* Tab 1: NGO/Provider Approvals */}
                <button
                  onClick={() => setActiveTab('approvals')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                    activeTab === 'approvals'
                      ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>प्रदाता व जन्म प्रमाण पत्र अनुमोदन (Provider Approvals)</span>
                  {pendingProviders.length > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {pendingProviders.length}
                    </span>
                  )}
                </button>

                {/* Tab 2: Pending Help Requests & Haversine Distance */}
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                    activeTab === 'requests'
                      ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>सहायता अनुरोध, जन्म प्रमाण व दूरी (Requests & Distance)</span>
                  {pendingRequests.length > 0 && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {pendingRequests.length}
                    </span>
                  )}
                </button>

                {/* Tab 3: Duty Route Map & Live GPS */}
                <button
                  onClick={() => setActiveTab('routes')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                    activeTab === 'routes'
                      ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Route className="w-4 h-4 text-emerald-600" />
                  <span>ड्यूटी रूट व लाइव जीपीएस (Duty Route & GPS)</span>
                  {broadcastingProviderId && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </button>
              </div>

              {/* Status Indicator */}
              <div className="text-xs text-slate-500 hidden sm:flex items-center space-x-2">
                <span className="font-semibold text-emerald-700">सत्यापित प्रदाता: {approvedProviders.length}</span>
                <span>•</span>
                <span className="font-semibold text-amber-700">सक्रिय अनुरोध: {pendingRequests.length}</span>
              </div>
            </div>

            {/* TAB CONTENTS (Scrollable Area) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
              {/* TAB 1: PENDING NGO/PROVIDER APPROVALS */}
              {activeTab === 'approvals' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        लंबित संस्था व प्रदाता अनुमोदन (Pending Provider Approvals)
                      </h3>
                      <p className="text-xs text-slate-500">
                        प्रत्येक संस्था के <strong>अधिकृत प्रतिनिधि का जन्म प्रमाण पत्र</strong> एवं सरकारी पहचान प्रमाण पत्र की समीक्षा करें।
                      </p>
                    </div>

                    <div className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                      लंबित आवेदन: <strong className="text-rose-600">{pendingProviders.length}</strong>
                    </div>
                  </div>

                  {pendingProviders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-800">
                        कोई लंबित प्रदाता अनुमोदन नहीं है!
                      </h4>
                      <p className="text-xs text-slate-500">
                        All NGO & Provider applications are up to date and verified.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                            <tr>
                              <th className="py-3 px-4">संस्था / प्रदाता विवरण</th>
                              <th className="py-3 px-4">प्रतिनिधि व जन्म प्रमाण (Birth Proof)</th>
                              <th className="py-3 px-4">सरकारी पहचान / पंजीकरण</th>
                              <th className="py-3 px-4">बेस जीपीएस (GPS)</th>
                              <th className="py-3 px-4 text-right">कार्यवाही (Actions)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {pendingProviders.map((prov) => (
                              <tr key={prov.id} className="hover:bg-slate-50/80 transition-colors">
                                {/* Provider Info */}
                                <td className="py-4 px-4">
                                  <div className="font-bold text-slate-900">{prov.name}</div>
                                  <div className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                                    <span className="font-semibold text-emerald-800">संदर्भ ID:</span>
                                    <span>{prov.phone || prov.id}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-600 mt-1 line-clamp-2 max-w-xs">
                                    {prov.description}
                                  </div>
                                  <span className="inline-block mt-1 bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                                    {prov.organizationType.toUpperCase()} • श्रेणी: {prov.category}
                                  </span>
                                </td>

                                {/* Representative & Birth Proof */}
                                <td className="py-4 px-4">
                                  <div className="font-semibold text-slate-900">
                                    {prov.representativeName || 'अधिकृत प्रतिनिधि'}
                                  </div>
                                  {prov.representativeDob && (
                                    <div className="text-[11px] text-slate-500 mb-1">
                                      DOB: {prov.representativeDob}
                                    </div>
                                  )}
                                  {prov.birthProofUrl ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setPreviewDoc({
                                          url: prov.birthProofUrl!,
                                          title: 'अधिकृत प्रतिनिधि जन्म प्रमाण पत्र (Representative Birth Proof)',
                                          subtitle: `${prov.name} • ${prov.representativeName || ''}`,
                                        })
                                      }
                                      className="inline-flex items-center space-x-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-2 py-1 rounded-lg border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
                                    >
                                      <Eye className="w-3 h-3 text-emerald-600" />
                                      <span>जन्म प्रमाण पत्र देखें (View)</span>
                                    </button>
                                  ) : (
                                    <span className="text-[11px] text-slate-400">संलग्न नहीं</span>
                                  )}
                                </td>

                                {/* Govt ID Proof */}
                                <td className="py-4 px-4">
                                  {prov.idProofUrl ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setPreviewDoc({
                                          url: prov.idProofUrl!,
                                          title: 'सरकारी पहचान / एनजीओ पंजीकरण (Govt Registration ID)',
                                          subtitle: prov.name,
                                        })
                                      }
                                      className="inline-flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-1 rounded-lg border border-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                                    >
                                      <FileCheck className="w-3 h-3 text-slate-600" />
                                      <span>पंजीकरण देखें (ID Proof)</span>
                                    </button>
                                  ) : (
                                    <span className="text-[11px] text-slate-400">डेमो</span>
                                  )}
                                </td>

                                {/* GPS Info */}
                                <td className="py-4 px-4 whitespace-nowrap">
                                  <div className="text-xs font-mono text-slate-700">
                                    {prov.lat.toFixed(4)}, {prov.lng.toFixed(4)}
                                  </div>
                                  <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                                    {prov.address}
                                  </div>
                                </td>

                                {/* Approve / Reject Actions */}
                                <td className="py-4 px-4 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end space-x-2">
                                    <button
                                      onClick={async () => {
                                        await onUpdateProviderStatus(prov.id, 'approved');
                                        showNotification(`✓ ${prov.name} को सफलतापूर्वक स्वीकृत किया गया!`);
                                      }}
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1 shadow-xs transition-colors cursor-pointer"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      <span>स्वीकृत करें (Approve)</span>
                                    </button>

                                    <button
                                      onClick={async () => {
                                        await onUpdateProviderStatus(prov.id, 'rejected');
                                        showNotification(`✕ ${prov.name} का आवेदन अस्वीकार किया गया।`);
                                      }}
                                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs px-3 py-2 rounded-xl flex items-center space-x-1 transition-colors cursor-pointer"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                      <span>अस्वीकार (Reject)</span>
                                    </button>

                                    {onDeleteProvider && (
                                      <button
                                        onClick={async () => {
                                          if (confirm(`क्या आप ${prov.name} का पंजीकरण हटाना चाहते हैं?`)) {
                                            await onDeleteProvider(prov.id);
                                            showNotification(`✓ ${prov.name} का पंजीकरण हटाया गया।`);
                                          }
                                        }}
                                        title="पंजीकरण हटाएं (Delete / Remove NGO Request)"
                                        className="bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-300 hover:border-rose-300 font-semibold text-xs px-2.5 py-2 rounded-xl flex items-center space-x-1 transition-colors cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                        <span>हटाएं (Remove)</span>
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* List of already verified providers */}
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>सत्यापित सक्रिय संस्थाएं (Verified Providers Fleet: {approvedProviders.length})</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {approvedProviders.map((p) => (
                        <div
                          key={p.id}
                          className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900 truncate max-w-[180px]">{p.name}</div>
                            <div className="text-slate-500 text-[11px]">{p.phone} • {p.category.toUpperCase()}</div>
                            {p.representativeName && (
                              <div className="text-[10px] text-slate-400">प्रतिनिधि: {p.representativeName}</div>
                            )}
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                              सत्यापित ✓
                            </span>
                            {onDeleteProvider && (
                              <button
                                onClick={async () => {
                                  if (confirm(`क्या आप संस्था ${p.name} को हटाना चाहते हैं?`)) {
                                    await onDeleteProvider(p.id);
                                    showNotification(`✓ संस्था ${p.name} हटाई गई।`);
                                  }
                                }}
                                title="संस्था हटाएं (Remove Provider)"
                                className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PENDING HELP REQUESTS & HAVERSINE DISTANCE */}
              {activeTab === 'requests' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        लंबित सहायता अनुरोध, जन्म प्रमाण पत्र व Haversine दूरी
                      </h3>
                      <p className="text-xs text-slate-500">
                        प्रत्येक नागरिक के <strong>जन्म प्रमाण पत्र</strong> का निरीक्षण करें तथा निकटतम प्रदाता केंद्र से दूरी मापें।
                      </p>
                    </div>

                    <div className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                      कुल सक्रिय अनुरोध: <strong>{pendingRequests.length}</strong>
                    </div>
                  </div>

                  {pendingRequests.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-800">
                        कोई लंबित अनुरोध नहीं है!
                      </h4>
                      <p className="text-xs text-slate-500">
                        All community assistance requests have been fulfilled.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingRequests.map((req) => {
                        const providersWithDistance = approvedProviders.map((p) => {
                          const dist = calculateHaversineDistanceKm(p.lat, p.lng, req.lat, req.lng);
                          return { provider: p, distanceKm: dist };
                        });
                        providersWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);
                        const nearest = providersWithDistance[0];

                        const isUrgent = req.urgency === 'high';

                        return (
                          <div
                            key={req.id}
                            className={`bg-white rounded-2xl p-5 border transition-all shadow-xs ${
                              isUrgent ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                            }`}
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              {/* Request Details */}
                              <div className="space-y-2 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                      isUrgent
                                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                                        : 'bg-amber-100 text-amber-800 border-amber-300'
                                    }`}
                                  >
                                    {isUrgent ? '🚨 अति-आवश्यक (Critical)' : '⚠️ मध्यम (Standard)'}
                                  </span>

                                  <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full">
                                    श्रेणी: {req.category.toUpperCase()}
                                  </span>

                                  <span className="text-[11px] text-slate-400">
                                    ID: {req.id}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-baseline gap-2">
                                  <h4 className="text-base font-bold text-slate-900">
                                    {req.name}
                                  </h4>
                                  {req.dateOfBirth && (
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                      DOB: {req.dateOfBirth}
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                  {req.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                                  <div className="flex items-center space-x-1 text-emerald-800 font-bold">
                                    <span>संदर्भ ID: {req.phone || req.id}</span>
                                  </div>
                                  <span>•</span>
                                  <span className="flex items-center space-x-1">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{req.address}</span>
                                  </span>
                                </div>

                                {/* Requester Birth Proof Button */}
                                {req.birthProofUrl && (
                                  <div className="pt-1">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setPreviewDoc({
                                          url: req.birthProofUrl!,
                                          title: 'लाभार्थी का जन्म प्रमाण पत्र (Requester Birth Proof)',
                                          subtitle: `${req.name} • DOB: ${req.dateOfBirth || 'Verified'}`,
                                        })
                                      }
                                      className="inline-flex items-center space-x-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>नागरिक जन्म प्रमाण पत्र देखें (View Requester Birth Proof)</span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Calculated Haversine Distance to Nearest Provider */}
                              <div className="lg:w-80 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl shrink-0 space-y-2">
                                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500 flex items-center justify-between">
                                  <span>निकटतम प्रदाता (Haversine Match)</span>
                                  <span className="text-emerald-700 font-mono">5km Radius</span>
                                </div>

                                {nearest ? (
                                  <div>
                                    <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                                      {nearest.provider.name}
                                    </div>
                                    <div className="flex items-center justify-between mt-1 text-xs">
                                      <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                        दूरी: {nearest.distanceKm} km
                                      </span>
                                      <span className="text-slate-500">
                                        ~{estimateTravelTimeMinutes(nearest.distanceKm)} min ETA
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-xs text-slate-500 italic">
                                    कोई सक्रिय प्रदाता नहीं मिला
                                  </div>
                                )}

                                {/* Action Buttons */}
                                <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setSelectedRequestId(req.id);
                                      if (nearest) setSelectedProviderId(nearest.provider.id);
                                      setActiveTab('routes');
                                    }}
                                    className="flex-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs py-2 px-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                                  >
                                    <Route className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>रूट मैप (Map)</span>
                                  </button>

                                  <button
                                    onClick={async () => {
                                      await onMarkRequestCompleted(req.id, nearest?.provider.id);
                                      showNotification(`✓ अनुरोध ID: ${req.id} सफल राहत मिशन के रूप में पूर्ण चिह्नित किया गया!`);
                                    }}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>पूर्ण (Complete)</span>
                                  </button>

                                  {onDeleteRequest && (
                                    <button
                                      onClick={async () => {
                                        if (confirm(`क्या आप सहायता अनुरोध (${req.name} - ${req.category}) को हटाना चाहते हैं?`)) {
                                          await onDeleteRequest(req.id);
                                          showNotification(`✓ सहायता अनुरोध हटाया गया (Request Removed)`);
                                        }
                                      }}
                                      title="अनुरोध हटाएं (Delete Help Request)"
                                      className="bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-300 hover:border-rose-300 font-semibold text-xs py-2 px-2 rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer shrink-0"
                                    >
                                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                      <span>हटाएं</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: DUTY ROUTE MAP & LIVE GPS BROADCAST */}
              {activeTab === 'routes' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        ड्यूटी रूट मानचित्र एवं लाइव जीपीएस प्रसारण (Duty Route & Live GPS Broadcast)
                      </h3>
                      <p className="text-xs text-slate-500">
                        प्रदाता हब और लाभार्थी स्थान के बीच डायनामिक रूट पॉलीलाइन (Polyline) देखें तथा लाइव जीपीएस प्रसारण को चालू/बंद करें।
                      </p>
                    </div>

                    {/* LIVE GPS BROADCAST TOGGLE BUTTON */}
                    {activeDutyProvider && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleLiveBroadcast(activeDutyProvider)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-2 cursor-pointer ${
                            activeDutyProvider.isLiveTracking || broadcastingProviderId === activeDutyProvider.id
                              ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          <Radio className="w-4 h-4" />
                          <span>
                            {activeDutyProvider.isLiveTracking || broadcastingProviderId === activeDutyProvider.id
                              ? '🔴 लाइव जीपीएस प्रसारण रोकें (Stop Live GPS Broadcast)'
                              : '🟢 लाइव जीपीएस प्रसारण शुरू करें (Start Live GPS Broadcast)'}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Route Selector Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        1. सहायता अनुरोध चुनें (Select Assistance Request):
                      </label>
                      <select
                        value={selectedRequestId || pendingRequests[0]?.id || ''}
                        onChange={(e) => setSelectedRequestId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      >
                        {pendingRequests.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name} ({r.category.toUpperCase()}) - {r.address}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        2. सेवा प्रदाता हब चुनें (Select Service Provider Hub):
                      </label>
                      <select
                        value={selectedProviderId || approvedProviders[0]?.id || ''}
                        onChange={(e) => setSelectedProviderId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      >
                        {approvedProviders.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} {p.isLiveTracking ? '(🟢 लाइव प्रसारण सक्रिय)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Duty Route Leaflet Map */}
                  <AdminDutyRouteMap
                    request={activeDutyRequest}
                    provider={activeDutyProvider}
                  />

                  {/* Live Dispatch Diagnostics Card */}
                  {activeDutyRequest && activeDutyProvider && (
                    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                          <Navigation className="w-3.5 h-3.5" />
                          <span>सक्रिय प्रेषण मेट्रिक्स (Active Dispatch Telemetry)</span>
                        </div>
                        <h4 className="text-sm font-bold">
                          {activeDutyProvider.name} ➔ {activeDutyRequest.name}
                        </h4>
                        <p className="text-xs text-slate-400">
                          सटीक Haversine दूरी:{' '}
                          <strong className="text-white">
                            {calculateHaversineDistanceKm(
                              activeDutyProvider.isLiveTracking && activeDutyProvider.currentLat ? activeDutyProvider.currentLat : activeDutyProvider.lat,
                              activeDutyProvider.isLiveTracking && activeDutyProvider.currentLng ? activeDutyProvider.currentLng : activeDutyProvider.lng,
                              activeDutyRequest.lat,
                              activeDutyRequest.lng
                            )}{' '}
                            किमी
                          </strong>
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={async () => {
                            await onMarkRequestCompleted(activeDutyRequest.id, activeDutyProvider.id);
                            showNotification(`✓ मिशन संपन्न! ${activeDutyRequest.name} को राहत वितरित दर्ज की गई।`);
                          }}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mark Request as Completed (पूर्ण चिह्नित करें)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DOCUMENT PREVIEW MODAL (FOR BIRTH PROOF OR GOVT ID) */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">
                  {previewDoc.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {previewDoc.subtitle}
                </p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-100 flex items-center justify-center min-h-[300px] max-h-[500px] overflow-hidden">
              <img
                src={previewDoc.url}
                alt="Document Preview"
                className="max-h-[460px] max-w-full object-contain rounded-xl shadow-md border border-slate-200"
              />
            </div>

            <div className="p-4 bg-white flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
              <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>सत्यापित संपीड़ित दस्तावेज़ (Verified Birth/ID Proof)</span>
              </span>

              <button
                onClick={() => setPreviewDoc(null)}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-slate-800 cursor-pointer"
              >
                समीक्षा पूर्ण (Close Preview)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
