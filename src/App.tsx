import React, { useState, useEffect } from 'react';
import { AssistanceRequest, ServiceProvider, CategoryType, LiveStats, AppPage } from './types';
import {
  subscribeToRequests,
  subscribeToProviders,
  createAssistanceRequest,
  createServiceProvider,
  deleteAssistanceRequest,
  deleteServiceProvider,
  updateProviderStatus,
  markRequestCompleted,
  updateProviderLiveLocation,
  seedInitialDataIfEmpty,
} from './firebase';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Hero } from './components/Hero';
import { LiveImpactCounters } from './components/LiveImpactCounters';
import { FeaturesNavigationGrid } from './components/FeaturesNavigationGrid';
import { ReliefFactsAndStatistics } from './components/ReliefFactsAndStatistics';
import { BirthProofVerificationFacts } from './components/BirthProofVerificationFacts';
import { InteractiveImpactCalculator } from './components/InteractiveImpactCalculator';
import { ProcessFlow } from './components/ProcessFlow';
import { ReliefStandards } from './components/ReliefStandards';
import { ReliefComparisonMatrix } from './components/ReliefComparisonMatrix';
import { CitizenRightsAndCharter } from './components/CitizenRightsAndCharter';
import { InteractiveMap } from './components/InteractiveMap';
import { DirectoryView } from './components/DirectoryView';
import { CommunityGallery } from './components/CommunityGallery';
import { RequestAssistanceForm } from './components/RequestAssistanceForm';
import { ProviderRegistrationForm } from './components/ProviderRegistrationForm';
import { FAQAndContact } from './components/FAQAndContact';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import {
  MapPin,
  HeartHandshake,
  Building2,
  HelpCircle,
  Camera,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ListOrdered
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [requests, setRequests] = useState<AssistanceRequest[]>([]);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [requestPreselectCategory, setRequestPreselectCategory] = useState<'food' | 'books' | 'clothes'>('food');

  // Handle URL hash for friendly deep linking & browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppPage;
      if (['home', 'map', 'request', 'provider', 'directory', 'gallery', 'faq', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subscribe to real-time Firestore database
  useEffect(() => {
    seedInitialDataIfEmpty();

    const unsubReqs = subscribeToRequests((newRequests) => {
      setRequests(newRequests);
    });

    const unsubProvs = subscribeToProviders((newProviders) => {
      setProviders(newProviders);
    });

    return () => {
      unsubReqs();
      unsubProvs();
    };
  }, []);

  // Compute 100% REAL counts directly from database!
  const approvedProviders = providers.filter((p) => p.status === 'approved');
  const completedRequests = requests.filter((r) => r.status === 'completed');
  const activeRequests = requests.filter((r) => r.status !== 'completed');

  const stats: LiveStats = {
    // Total Assistance Requests (EXACT real count of requests in database starting from 0)
    totalRequests: requests.length,
    // Verified Service Providers (EXACT real count of approved providers)
    verifiedProviders: approvedProviders.length,
    // Fulfilled Relief Missions (EXACT real count of completed missions)
    fulfilledMissions: completedRequests.length,
  };

  const handleRequestWithCategory = (cat: 'food' | 'books' | 'clothes') => {
    setRequestPreselectCategory(cat);
    navigateTo('request');
  };

  const handleFilterCategoryFromCards = (cat: CategoryType) => {
    setSelectedCategory(cat);
    navigateTo('map');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-16 sm:pb-0">
      {/* 1. Bilingual Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        activeRequestsCount={activeRequests.length}
        activeProvidersCount={approvedProviders.length}
      />

      {/* 2. Main Page Content (Multi-page Router View) */}
      <main className="flex-1">
        {/* PAGE 1: HOME (होम पेज - Rich Information, Research Facts, Protocols & Impact) */}
        {currentPage === 'home' && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
            {/* 1. Hero Section */}
            <Hero
              onScrollTo={(id) => {
                if (id === 'request-form') navigateTo('request');
                else if (id === 'provider-form') navigateTo('provider');
                else if (id === 'interactive-map') navigateTo('map');
                else if (id === 'faq-section') navigateTo('faq');
              }}
              pendingRequestsCount={activeRequests.length}
              approvedProvidersCount={approvedProviders.length}
            />

            {/* 2. REAL-TIME Live Impact Counters (100% Real Live Counts starting at 0) */}
            <LiveImpactCounters stats={stats} />

            {/* 3. Dedicated Features Navigation Grid */}
            <FeaturesNavigationGrid
              onNavigate={navigateTo}
              activeRequestsCount={activeRequests.length}
              approvedProvidersCount={approvedProviders.length}
              completedMissionsCount={completedRequests.length}
            />

            {/* 4. Empirical Research & Statistics Hub */}
            <ReliefFactsAndStatistics />

            {/* 5. Why Birth Proof Verification is Required (Mandatory Protocol Facts) */}
            <BirthProofVerificationFacts />

            {/* 6. Interactive Citizen Aid & Impact Estimator */}
            <InteractiveImpactCalculator
              onNavigateToRequest={() => navigateTo('request')}
              onNavigateToProvider={() => navigateTo('provider')}
            />

            {/* 7. 4-Stage Zero-Leakage Architecture Protocol */}
            <ProcessFlow />

            {/* 8. Strict Humanitarian Quality Standards with Photos */}
            <ReliefStandards onRequestCategory={handleRequestWithCategory} />

            {/* 9. Comparative Matrix: Traditional Relief vs Community Connect */}
            <ReliefComparisonMatrix />

            {/* 10. Citizen Rights, Legal Acts (NFSA & RTE) and Charter */}
            <CitizenRightsAndCharter />

            {/* 11. Quick Action Navigation Strip */}
            <section className="container mx-auto px-4 py-8">
              <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-500/20">
                <div className="space-y-1.5 text-center md:text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    पारदर्शी नागरिक राहत नेटवर्क (Zero-Leakage Direct Network)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">
                    ज़रूरतमंद परिवारों को सीधी राहत पहुँचाएं
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
                    प्रत्येक नागरिक और प्रदाता का जन्म प्रमाण पत्र सत्यापित कर बिना बिचौलियों के सीधा प्रेषण किया जाता है। सभी सुविधाएं अलग-अलग पेजों पर सुगमता से उपलब्ध हैं।
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <button
                    onClick={() => navigateTo('request')}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>सहायता मांगें (Request Aid)</span>
                  </button>

                  <button
                    onClick={() => navigateTo('map')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>लाइव मैप (Live Map)</span>
                  </button>

                  <button
                    onClick={() => navigateTo('provider')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>प्रदाता बनें (Register NGO)</span>
                  </button>

                  <button
                    onClick={() => navigateTo('directory')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <ListOrdered className="w-4 h-4 text-sky-400" />
                    <span>मिशन निर्देशिका (Directory)</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PAGE 2: INTERACTIVE LIVE MAP & GEOLOCATION LOCATOR (लाइव मैप) */}
        {currentPage === 'map' && (
          <div className="animate-in fade-in duration-200">
            <InteractiveMap
              requests={requests}
              providers={providers}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onRequestHelpClick={() => navigateTo('request')}
            />

            {/* List of Verified Relief Centers Under Map */}
            <div className="container mx-auto px-4 py-8">
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      सत्यापित सेवा प्रदाता व कम्युनिटी रसोई सूची (Verified Provider Directory)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      सरकारी पहचान एवं जन्म प्रमाण पत्र सत्यापित स्थानीय सहायता केंद्र
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full w-fit">
                    {approvedProviders.length} केंद्र सक्रिय
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {approvedProviders.length === 0 ? (
                    <div className="col-span-full bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-2">
                      <Building2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-slate-800 text-sm">
                        वर्तमान में 0 सत्यापित प्रदाता केंद्र हैं (Zero Verified Providers Initialized)
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        एनजीओ या दाता के रूप में पंजीकरण करें। अधिकृत एडमिन द्वारा जन्म प्रमाण पत्र सत्यापन के बाद आपका केंद्र सक्रिय हो जाएगा।
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={() => navigateTo('provider')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                        >
                          + प्रदाता पंजीकरण करें (Register as Provider)
                        </button>
                      </div>
                    </div>
                  ) : (
                    approvedProviders.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-sm text-slate-900 leading-snug">
                              {p.name}
                            </h4>
                            {p.isLiveTracking && (
                              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shrink-0 ml-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                                <span>लाइव जीपीएस</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {p.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <button
                            onClick={() => handleRequestWithCategory(p.category === 'all' ? 'food' : (p.category as any))}
                            className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer transition-colors"
                          >
                            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                            <span>राहत मांगें (Request Aid)</span>
                          </button>

                          <span className="text-slate-400 text-[11px] uppercase">
                            {p.category}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: REQUEST ASSISTANCE FORM (सहायता अनुरोध) */}
        {currentPage === 'request' && (
          <div className="animate-in fade-in duration-200">
            <RequestAssistanceForm
              initialCategory={requestPreselectCategory}
              onSubmitSuccess={(newReq) => {
                navigateTo('directory');
              }}
              createRequestFn={createAssistanceRequest}
            />
          </div>
        )}

        {/* PAGE 4: SERVICE PROVIDER REGISTRATION FORM (प्रदाता पंजीकरण) */}
        {currentPage === 'provider' && (
          <div className="animate-in fade-in duration-200">
            <ProviderRegistrationForm
              onSubmitSuccess={(newProv) => {
                navigateTo('directory');
              }}
              createProviderFn={createServiceProvider}
            />
          </div>
        )}

        {/* PAGE 5: LIVE MISSIONS & RELIEF DIRECTORY (मिशन व प्रदाता निर्देशिका) */}
        {currentPage === 'directory' && (
          <div className="animate-in fade-in duration-200">
            <DirectoryView
              requests={requests}
              providers={providers}
              onNavigateToRequest={() => navigateTo('request')}
              onNavigateToProvider={() => navigateTo('provider')}
              onNavigateToMap={() => navigateTo('map')}
              onSelectCategoryAndRequest={handleRequestWithCategory}
            />
          </div>
        )}

        {/* PAGE 6: COMMUNITY GALLERY & STORIES (गैलरी) */}
        {currentPage === 'gallery' && (
          <div className="animate-in fade-in duration-200">
            <CommunityGallery />
          </div>
        )}

        {/* PAGE 7: FAQ & HELPLINE (सवाल व संपर्क) */}
        {currentPage === 'faq' && (
          <div className="animate-in fade-in duration-200">
            <FAQAndContact />
          </div>
        )}

        {/* PAGE 8: ADMIN CONTROL CENTER (एडमिन कंट्रोल सेंटर) */}
        {currentPage === 'admin' && (
          <div className="animate-in fade-in duration-200">
            <AdminDashboard
              isOpen={true}
              isFullPageView={true}
              onClose={() => navigateTo('home')}
              requests={requests}
              providers={providers}
              onUpdateProviderStatus={updateProviderStatus}
              onMarkRequestCompleted={markRequestCompleted}
              onUpdateLiveLocation={updateProviderLiveLocation}
              onDeleteRequest={deleteAssistanceRequest}
              onDeleteProvider={deleteServiceProvider}
            />
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        onOpenAdmin={() => navigateTo('admin')}
        onScrollTo={(id) => {
          if (id === 'request-form') navigateTo('request');
          else if (id === 'provider-form') navigateTo('provider');
          else if (id === 'interactive-map') navigateTo('map');
          else if (id === 'resource-categories') navigateTo('home');
          else if (id === 'faq-section') navigateTo('faq');
        }}
      />

      {/* 4. Mobile Bottom Navigation Bar */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={navigateTo}
        activeRequestsCount={activeRequests.length}
      />
    </div>
  );
}
