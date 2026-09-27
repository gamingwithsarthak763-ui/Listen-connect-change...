import React from 'react';
import { HeartHandshake, MapPin, Heart, Shield, Lock, Radio, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onScrollTo }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      {/* Upper Footer */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  Community Connect
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  कम्युनिटी कनेक्ट राहत नेटवर्क
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Zero Hunger. 100% Direct Relief. पड़ोस-आधारित राहत नेटवर्क जो जरूरतमंद नागरिकों,
              सत्यापित एनजीओ और सामुदायिक रसोइयों को बिना किसी बिचौलिए के सीधे जोड़ता है।
            </p>

            <div className="text-xs text-emerald-400/90 font-medium">
              ✓ ओपन-सोर्स और गैर-वाणिज्यिक नागरिक पहल (Non-profit civic mission)
            </div>
          </div>

          {/* Col 2: Quick Jump Anchors */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              त्वरित लिंक (Quick Links)
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onScrollTo('interactive-map')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  📍 लाइव मैप और सेवा प्रदाता (Live Map)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('resource-categories')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  🍲 राहत श्रेणियां: भोजन, पुस्तकें, वस्त्र
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('request-form')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  🚨 सहायता अनुरोध फॉर्म (Request Help)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('provider-form')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  🏢 प्रदाता एवं एनजीओ पंजीकरण (Register NGO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('faq-section')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  ❓ अक्सर पूछे जाने वाले सवाल (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resource Verticals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              राहत श्रेणियां (Direct Verticals)
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center space-x-2">
                <span>🍲</span>
                <span>भोजन व पोषण राहत (Food & Ration Packs)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📚</span>
                <span>शिक्षा व पाठ्यपुस्तकें (Books & Study Material)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>👕</span>
                <span>वस्त्र व शीतकालीन कंबल (Clothes & Blankets)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🚗</span>
                <span>आपातकालीन जीपीएस प्रेषण (Direct Haversine Dispatch)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Digital Command & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              डिजिटल नियंत्रण केंद्र (Digital Dispatch Control)
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>डिजिटल लाइव प्रेषण: <strong>24×7 Active In-App Dispatch</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% प्रत्यक्ष सत्यापन एवं जन्म प्रमाण पत्र प्रणाली</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>सेंट्रल रिलीफ हब, कनाट प्लेस, नई दिल्ली</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-emerald-500/50 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>एडमिन कमांड पोर्टल (Admin Command Portal)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Community Connect. सर्वाधिकार नागरिक कल्याण हेतु समर्पित।
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for direct community impact and zero hunger.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
