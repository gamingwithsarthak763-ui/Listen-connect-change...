import React from 'react';
import {
  MapPin,
  HeartHandshake,
  Building2,
  ListOrdered,
  Camera,
  HelpCircle,
  Lock,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { AppPage } from '../types';

interface FeaturesNavigationGridProps {
  onNavigate: (page: AppPage) => void;
  activeRequestsCount: number;
  approvedProvidersCount: number;
  completedMissionsCount: number;
}

export const FeaturesNavigationGrid: React.FC<FeaturesNavigationGridProps> = ({
  onNavigate,
  activeRequestsCount,
  approvedProvidersCount,
  completedMissionsCount,
}) => {
  const featurePages: {
    id: AppPage;
    titleHindi: string;
    titleEnglish: string;
    descHindi: string;
    descEnglish: string;
    icon: React.FC<{ className?: string }>;
    accentBg: string;
    iconColor: string;
    badgeText?: string;
  }[] = [
    {
      id: 'map',
      titleHindi: 'लाइव राहत मानचित्र व लोकेटर',
      titleEnglish: 'Interactive Map & GPS Aid Locator',
      descHindi:
        'मानचित्र पर 5 किमी के दायरे में निकटतम सत्यापित सेवा प्रदाताओं, कम्युनिटी किचनों और सक्रिय मिशनों को लाइव देखें।',
      descEnglish:
        'Explore real-time verified relief centers, community kitchens, and active dispatch points on an interactive humanitarian map.',
      icon: MapPin,
      accentBg: 'from-emerald-50 to-teal-50 border-emerald-200/80',
      iconColor: 'bg-emerald-600 text-white',
      badgeText: 'फुल-स्क्रीन लाइव मैप',
    },
    {
      id: 'request',
      titleHindi: 'नागरिक सहायता अनुरोध पोर्टल',
      titleEnglish: 'Citizen Relief Intake & Birth Proof',
      descHindi:
        'भोजन, पुस्तकें या वस्त्रों के लिए सीधा अनुरोध दर्ज करें। जन्म प्रमाण पत्र अपलोड के साथ त्वरित व पारदर्शी जांच।',
      descEnglish:
        'Submit emergency requirements with encrypted birth proof verification for swift, direct doorstep assistance.',
      icon: HeartHandshake,
      accentBg: 'from-rose-50 to-orange-50 border-rose-200/80',
      iconColor: 'bg-rose-600 text-white',
      badgeText: `${activeRequestsCount} सक्रिय अनुरोध`,
    },
    {
      id: 'provider',
      titleHindi: 'एनजीओ व किचन प्रदाता पंजीकरण',
      titleEnglish: 'NGO & Community Kitchen Onboarding',
      descHindi:
        'सेवा प्रदाता या संस्था के रूप में जुड़ें। प्रतिनिधि जन्म प्रमाण पत्र व संस्था पहचान सत्यापन के बाद सक्रियता।',
      descEnglish:
        'Register your humanitarian fleet or kitchen. Receive proximity dispatch requests after verification.',
      icon: Building2,
      accentBg: 'from-teal-50 to-cyan-50 border-teal-200/80',
      iconColor: 'bg-teal-700 text-white',
      badgeText: `${approvedProvidersCount} सत्यापित केंद्र`,
    },
    {
      id: 'directory',
      titleHindi: 'सक्रिय मिशन व प्रदाता निर्देशिका',
      titleEnglish: 'Live Missions Ledger & Center Directory',
      descHindi:
        'सभी सत्यापित प्रदाता केंद्रों और सक्रिय सहायता अनुरोधों की संपूर्ण खोज योग्य सार्वजनिक सूची व ट्रैकिंग।',
      descEnglish:
        'Search and filter all registered relief centers and public status updates with zero hidden fees.',
      icon: ListOrdered,
      accentBg: 'from-blue-50 to-indigo-50 border-blue-200/80',
      iconColor: 'bg-blue-600 text-white',
      badgeText: 'सत्यापित लेज़र',
    },
    {
      id: 'gallery',
      titleHindi: 'राहत वितरण फोटो गैलरी',
      titleEnglish: 'Verified Field Photo Gallery',
      descHindi:
        'जमीनी स्तर पर हुए राशन वितरण, पुस्तक वितरण और शीतकालीन राहत अभियानों के सत्यापित चित्र व फील्ड रिपोर्ट।',
      descEnglish:
        'Photographic audit evidence and heartwarming human stories of direct doorstep assistance.',
      icon: Camera,
      accentBg: 'from-purple-50 to-pink-50 border-purple-200/80',
      iconColor: 'bg-purple-600 text-white',
      badgeText: 'फील्ड प्रमाण',
    },
    {
      id: 'faq',
      titleHindi: 'सवाल-जवाब व नागरिक अधिकार',
      titleEnglish: 'Citizen Rights, FAQ & Help Center',
      descHindi:
        'जन्म प्रमाण पत्र क्यों चाहिए, खाद्य सुरक्षा कानून के अधिकार और गोपनीयता से जुड़े सभी प्रश्नों के उत्तर।',
      descEnglish:
        'Comprehensive knowledge base covering birth certificate submission, legal protections, and security.',
      icon: HelpCircle,
      accentBg: 'from-amber-50 to-yellow-50 border-amber-200/80',
      iconColor: 'bg-amber-600 text-white',
      badgeText: 'मार्गदर्शन केंद्र',
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-white via-slate-50/60 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>समर्पित सुविधाएं (Dedicated Platform Feature Pages)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            अलग-अलग पेजों पर उपलब्ध सुविधाएं एक्सप्लोर करें
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            प्रत्येक सुविधा को एक समर्पित, स्पष्ट और सुगम पृष्ठ पर व्यवस्थित किया गया है ताकि आप बिना किसी रुकावट के सहायता पा सकें या दे सकें।
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featurePages.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => onNavigate(feat.id)}
                className={`bg-gradient-to-br ${feat.accentBg} p-6 sm:p-7 rounded-3xl border shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${feat.iconColor} flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {feat.badgeText && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200/60 text-slate-800 shadow-2xs font-mono">
                        {feat.badgeText}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-800 transition-colors">
                    {feat.titleHindi}
                  </h3>
                  <h4 className="text-xs font-semibold text-slate-500 mb-3">
                    {feat.titleEnglish}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    {feat.descHindi}
                  </p>
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    {feat.descEnglish}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  <span>पेज खोलें (Open Dedicated Page)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
