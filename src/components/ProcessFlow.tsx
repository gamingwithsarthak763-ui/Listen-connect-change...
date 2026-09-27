import React from 'react';
import { Send, MapPin, Truck, Check, ArrowRight } from 'lucide-react';

export const ProcessFlow: React.FC = () => {
  const steps = [
    {
      step: '01',
      titleHindi: 'अनुरोध / पंजीकरण जमा करें',
      titleEnglish: 'Submit Request / Registration',
      descHindi:
        'ज़रूरतमंद नागरिक अपनी आवश्यकता (भोजन, किताबें या कपड़े) और जीपीएस स्थान दर्ज करें। एनजीओ आईडी प्रमाण अपलोड करके रजिस्टर करें।',
      descEnglish:
        'Citizens log required items with automatic GPS coordinates. Relief organizations register with verified ID proofs.',
      icon: Send,
      color: 'bg-emerald-500 text-white',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      step: '02',
      titleHindi: 'रीयल-टाइम मानचित्र मिलान',
      titleEnglish: 'Real-Time Map Matching',
      descHindi:
        'हमारा प्लेटफ़ॉर्म Haversine दूरी एल्गोरिदम का उपयोग करके निकटतम सक्रिय सेवा प्रदाता या कम्युनिटी किचन से तुरंत जोड़ता है।',
      descEnglish:
        'Haversine distance algorithms instantly pair nearby distress requests with capable verified aid networks within 5km radius.',
      icon: MapPin,
      color: 'bg-teal-600 text-white',
      badgeColor: 'bg-teal-100 text-teal-800',
    },
    {
      step: '03',
      titleHindi: 'सीधा प्रेषण और राहत वितरण',
      titleEnglish: 'Direct Dispatch & Relief',
      descHindi:
        'सत्यापित स्वयंसेवक लाइव जीपीएस ट्रैकिंग के साथ सामग्री सीधे द्वार तक पहुंचाते हैं। शून्य बिचौलिए, 100% प्रत्यक्ष सम्मानजनक राहत।',
      descEnglish:
        'Verified volunteer fleets mobilize with live route tracking, providing doorstep handoff with absolute zero intermediaries.',
      icon: Truck,
      color: 'bg-slate-900 text-white',
      badgeColor: 'bg-slate-100 text-slate-800',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <span>पारदर्शी कार्यप्रणाली (Transparent 3-Step Architecture)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            3-चरणीय सरल प्रक्रिया (How Community Connect Works)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            संकट के समय हर सेकंड कीमती होता है। जानें कि हमारा तकनीक-सक्षम राहत नेटवर्क किस प्रकार बिना किसी देरी के कार्य करता है।
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-6">
                  {/* Step Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-md shadow-emerald-900/10`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-sm font-black text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                    #{item.step}
                  </span>
                </div>

                <div>
                  {/* Step Title in Hindi & English */}
                  <div className="space-y-1 mb-4">
                    <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md ${item.badgeColor}`}>
                      स्टेप {item.step} (Step {item.step})
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {item.titleHindi}
                    </h3>
                    <h4 className="text-sm font-semibold text-emerald-700">
                      {item.titleEnglish}
                    </h4>
                  </div>

                  {/* Description in Hindi & English */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {item.descHindi}
                  </p>
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    {item.descEnglish}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-600">
                  <Check className="w-4 h-4 mr-1 text-emerald-500" />
                  <span>स्वचालित और सुरक्षित (Automated & Secure)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
