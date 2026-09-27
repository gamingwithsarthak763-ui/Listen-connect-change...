import React from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Activity,
  Heart
} from 'lucide-react';
import { LiveStats } from '../types';

interface LiveImpactCountersProps {
  stats: LiveStats;
}

export const LiveImpactCounters: React.FC<LiveImpactCountersProps> = ({ stats }) => {
  return (
    <section className="container mx-auto px-4 -mt-6 sm:-mt-8 relative z-20">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-emerald-100/80 p-6 sm:p-8">
        {/* Section Header with Live indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                📊 रीयल-टाइम प्रभाव डैशबोर्ड (Live Impact Counters)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              प्रत्यक्ष राहत नेटवर्क की सक्रिय प्रगति और सहायता आंकड़े (Verified Relief Network Real-Time Metrics)
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/80 w-fit">
            <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>फ़ायरस्टोर लाइव सिंक सक्रिय (Firestore Live Sync)</span>
          </div>
        </div>

        {/* 3 Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1: Total Assistance Requests */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white p-6 rounded-2xl border border-amber-200/80 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                  अनुरोध (Requests)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 font-mono">
                  {stats.totalRequests.toLocaleString('en-IN')}
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-1">
                  कुल सहायता अनुरोध
                </h3>
                <p className="text-xs text-slate-500">
                  Total Assistance Requests
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-900/80">
              <span className="flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                <span>नागरिक व परिवार आपात सहायता</span>
              </span>
              <span className="font-semibold">Direct Intake</span>
            </div>
          </div>

          {/* Stat 2: Verified Service Providers */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white p-6 rounded-2xl border border-emerald-200/80 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  प्रदाता (Providers)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 font-mono">
                  {stats.verifiedProviders.toLocaleString('en-IN')}
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-1">
                  सत्यापित सेवा प्रदाता
                </h3>
                <p className="text-xs text-slate-500">
                  Verified Service Providers
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-900/80">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>आईडी व पंजीकरण सत्यापित एनजीओ</span>
              </span>
              <span className="font-semibold">Govt ID Verified</span>
            </div>
          </div>

          {/* Stat 3: Fulfilled Relief Missions */}
          <div className="relative overflow-hidden bg-gradient-to-br from-sky-50/70 via-blue-50/40 to-white p-6 rounded-2xl border border-sky-200/80 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100/80 px-2.5 py-0.5 rounded-full">
                  सफल मिशन (Completed)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 font-mono">
                  {stats.fulfilledMissions.toLocaleString('en-IN')}
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-1">
                  सफल राहत मिशन
                </h3>
                <p className="text-xs text-slate-500">
                  Fulfilled Relief Missions
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-sky-200/60 flex items-center justify-between text-xs text-sky-900/80">
              <span className="flex items-center space-x-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>100% नि:शुल्क प्रत्यक्ष वितरण</span>
              </span>
              <span className="font-semibold">100% Impact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
