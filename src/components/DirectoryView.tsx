import React, { useState } from 'react';
import {
  ListOrdered,
  Search,
  Filter,
  Building2,
  HeartHandshake,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { AssistanceRequest, ServiceProvider, CategoryType } from '../types';
import { AppImages } from '../assets/images';

interface DirectoryViewProps {
  requests: AssistanceRequest[];
  providers: ServiceProvider[];
  onNavigateToRequest: () => void;
  onNavigateToProvider: () => void;
  onNavigateToMap: () => void;
  onSelectCategoryAndRequest: (cat: 'food' | 'books' | 'clothes') => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  requests,
  providers,
  onNavigateToRequest,
  onNavigateToProvider,
  onNavigateToMap,
  onSelectCategoryAndRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'providers' | 'requests'>('providers');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>('all');

  const approvedProviders = providers.filter((p) => p.status === 'approved');

  // Filter providers
  const filteredProviders = approvedProviders.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      categoryFilter === 'all' || p.category === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || r.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 mb-2">
            <ListOrdered className="w-3.5 h-3.5 text-emerald-600" />
            <span>सार्वजनिक निर्देशिका (Public Transparent Ledger)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            सत्यापित प्रदाता केंद्र एवं सक्रिय राहत मिशन
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            सभी पंजीकृत कम्युनिटी रसोई, एनजीओ तथा वास्तविक सहायता अनुरोधों का पारदर्शी ब्योरा। जन्म प्रमाण पत्र द्वारा सत्यापित, शून्य बिचौलिए।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToMap}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>मानचित्र पर देखें (Open Map)</span>
          </button>

          <button
            onClick={onNavigateToRequest}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>मदद मांगें (Request Aid)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Toggle Providers vs Requests */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab('providers')}
            className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === 'providers'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>सत्यापित प्रदाता ({approvedProviders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === 'requests'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-rose-600" />
            <span>सक्रिय सहायता अनुरोध ({requests.length})</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {(['all', 'food', 'books', 'clothes'] as CategoryType[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' && 'सभी (All)'}
              {cat === 'food' && 'भोजन (Food)'}
              {cat === 'books' && 'पुस्तकें (Books)'}
              {cat === 'clothes' && 'वस्त्र (Clothes)'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="नाम या स्थान खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* TAB 1: SERVICE PROVIDERS */}
      {activeTab === 'providers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              कुल {filteredProviders.length} सत्यापित केंद्र प्रदर्शित
            </span>
            <span className="text-emerald-700 font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>प्रतिनिधि जन्म प्रमाण पत्र सत्यापित ✓</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProviders.length === 0 ? (
              <div className="col-span-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 relative rounded-2xl overflow-hidden h-52 bg-slate-100">
                    <img
                      src={AppImages.communityKitchenSteaming}
                      alt="Community kitchen preparing fresh meals"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white text-xs font-bold bg-amber-600/90 px-2.5 py-1 rounded-lg">
                      सत्यापित कम्युनिटी रसोई
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-2 text-left">
                    <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>प्रदाता पंजीकरण खुला है</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      वर्तमान में 0 सत्यापित प्रदाता केंद्र हैं (Zero Providers Initialized)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      हमारा लेज़र वास्तविक डेटा के साथ 0 से शुरू होता है। एनजीओ या सामाजिक दाता के रूप में पंजीकरण करने पर अधिकृत एडमिन द्वारा जन्म प्रमाण पत्र सत्यापन के बाद आपका केंद्र यहां सक्रिय हो जाएगा।
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onNavigateToProvider}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
                      >
                        <Building2 className="w-4 h-4" />
                        <span>+ नया प्रदाता पंजीकृत करें (Register as Provider)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              filteredProviders.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base text-slate-900 leading-snug">
                        {p.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                        {p.organizationType === 'ngo' && 'एनजीओ'}
                        {p.organizationType === 'community_kitchen' && 'रसोई'}
                        {p.organizationType === 'individual_donor' && 'दाता'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3">
                      {p.description}
                    </p>

                    <div className="space-y-1 text-xs text-slate-500">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{p.address}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold text-[11px]">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>सत्यापित पहचान एवं जन्म प्रमाण पत्र ✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">
                      श्रेणी: {p.category.toUpperCase()}
                    </span>

                    <button
                      onClick={() =>
                        onSelectCategoryAndRequest(
                          p.category === 'all' ? 'food' : (p.category as any)
                        )
                      }
                      className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                      <span>राहत मांगें (Request Aid)</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ASSISTANCE REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              कुल {filteredRequests.length} सहायता अनुरोध प्रदर्शित
            </span>
            <span className="text-emerald-700 font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>जन्म प्रमाण पत्र सत्यापित नागरिक ✓</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRequests.length === 0 ? (
              <div className="col-span-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 relative rounded-2xl overflow-hidden h-52 bg-slate-100">
                    <img
                      src={AppImages.doorstepReliefHandoff}
                      alt="Doorstep relief handoff with warm blanket and meal container"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white text-xs font-bold bg-emerald-600/90 px-2.5 py-1 rounded-lg">
                      प्रत्यक्ष द्वार राहत
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-2 text-left">
                    <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg">
                      <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
                      <span>सहायता अनुरोध खुला है</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      वर्तमान में 0 सहायता अनुरोध दर्ज हैं (Zero Requests Active)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      लेज़र 0 से प्रारंभ होता है। किसी परिवार को आपातकालीन भोजन, पुस्तकों या वस्त्रों की आवश्यकता होने पर जन्म प्रमाण पत्र के साथ सहायता फॉर्म भरें।
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onNavigateToRequest}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
                      >
                        <HeartHandshake className="w-4 h-4" />
                        <span>+ नया सहायता अनुरोध दर्ज करें (Submit Request)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              filteredRequests.map((r) => (
                <div
                  key={r.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base text-slate-900 leading-snug">
                        {r.name}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          r.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {r.status === 'completed' ? 'वितरित ✓ (Fulfilled)' : 'सक्रिय (Pending)'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3">
                      {r.description}
                    </p>

                    <div className="space-y-1 text-xs text-slate-500">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{r.address}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold text-[11px]">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>जन्म प्रमाण पत्र सत्यापित नागरिक ✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase">
                      श्रेणी: {r.category}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      सुरक्षित संदर्भ आईडी (Protected ID)
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
