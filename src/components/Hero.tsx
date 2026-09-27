import React from 'react';
import {
  Heart,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  UtensilsCrossed
} from 'lucide-react';
import { AppImages } from '../assets/images';

interface HeroProps {
  onScrollTo: (id: string) => void;
  pendingRequestsCount: number;
  approvedProvidersCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollTo,
  pendingRequestsCount,
  approvedProvidersCount,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white">
      {/* Background Decorative Grid Pattern & Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-400/30 px-4 py-1.5 rounded-full backdrop-blur-md shadow-xs">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-200">
              📍 पड़ोस आधारित सीधा राहत तंत्र (Neighborhood-Driven Relief Network)
            </span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            <span>Zero Hunger. </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
              100% Direct Relief.
            </span>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-200 mt-2 font-sans font-medium">
              शून्य भुखमरी। 100% सीधी राहत।
            </div>
          </h1>

          {/* Subtitle with empirical facts */}
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            आपातकालीन समय में भोजन, अध्ययन पुस्तकें और गर्म वस्त्रों की सीधी आपूर्ति।
            प्रत्येक नागरिक और प्रदाता का जन्म प्रमाण पत्र (Birth Proof) सत्यापित कर 100% पारदर्शी, बिना बिचौलियों की सीधी सहायता।
            <span className="block mt-1 text-sm text-emerald-300/80">
              Zero middlemen. Direct hyperlocal geolocation pairing with mandatory birth certificate verification.
            </span>
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
            <button
              onClick={() => onScrollTo('request-form')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center space-x-2 text-sm group cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600 group-hover:scale-110 transition-transform" />
              <span>मदद मांगें (Request Aid)</span>
            </button>

            <button
              onClick={() => onScrollTo('interactive-map')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 py-3 rounded-2xl backdrop-blur-xs transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>लाइव मैप (Live Map)</span>
            </button>

            <button
              onClick={() => onScrollTo('provider-form')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-5 py-3 rounded-2xl transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>प्रदाता पंजीकरण (NGO Onboarding)</span>
            </button>
          </div>

          {/* Hero Visual Spotlight Image */}
          <div className="pt-4 max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-emerald-950/60 bg-emerald-950/40">
              <img
                src={AppImages.heroReliefVolunteers}
                alt="Community relief volunteers distributing warm meal packets"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

              {/* Floating Image Badges */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl">
                  <div className="text-xs font-bold text-emerald-300 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>सत्यापित सामुदायिक सहायता (Verified Community Care)</span>
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    प्रत्यक्ष नागरिक-से-नागरिक सहायता • शून्य बिचौलिए
                  </div>
                </div>

                <div className="hidden sm:flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 px-3.5 py-2 rounded-2xl text-xs font-mono text-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% BIRTH PROOF VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Key Highlights */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs sm:text-sm">
                <Zap className="w-4 h-4" />
                <span>तत्काल जीपीएस मिलान (Instant GPS Match)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Haversine दूरी सूत्र द्वारा 5 किमी दायरे में ऑटोमैटिक कनेक्ट
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>जन्म प्रमाण पत्र अनिवार्य (Birth Proofs)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                फर्जीवाड़े का शून्य प्रतिशत; 100% जीवित लाभार्थियों का सत्यापन
              </p>
            </div>

            <div className="col-span-2 md:col-span-1 bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs sm:text-sm">
                <UtensilsCrossed className="w-4 h-4" />
                <span>शून्य बिचौलिए (Zero Middlemen)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                सीधे एनजीओ/किचन से परिवार तक 100% प्रत्यक्ष द्वार वितरण
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave Separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-8 sm:h-12 text-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.31,191.8,114.8,235.6,110.12,279.3,87.89,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
};
