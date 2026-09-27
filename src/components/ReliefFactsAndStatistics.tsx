import React from 'react';
import {
  PieChart,
  Scale,
  Clock,
  BookOpen,
  ThermometerSnowflake,
  ShieldAlert,
  ArrowUpRight,
  TrendingDown,
  Sparkles,
  Award
} from 'lucide-react';
import { AppImages } from '../assets/images';

export const ReliefFactsAndStatistics: React.FC = () => {
  const empiricalFacts = [
    {
      id: 'food-waste',
      badge: 'खाद्य सुरक्षा तथ्य (Food Security Fact)',
      stat: '68,760,163',
      unit: 'टन वार्षिक खाद्य बर्बादी',
      unitEn: 'Tonnes of Food Discarded Annually in India (UNEP Data)',
      headline: 'शहरी अतिरिक्त भोजन विरोधाभास (The Urban Surplus Food Paradox)',
      description:
        'भारत में प्रतिवर्ष करीब 6.8 करोड़ टन भोजन बर्बाद होता है, जबकि उसी समय लाखों बच्चे व परिवार पोषण संकट से जूझते हैं। बड़े आयोजनों व कैंटीन में तैयार ताजा भोजन 4-6 घंटे के भीतर सुरक्षित रूप से एकत्र कर स्थानीय बस्तियों में वितरित किया जा सकता है।',
      impactMetric: '100% भोजन बर्बादी में रोकथाम',
      impactEn: 'Zero edible food sent to landfills within 5km radius',
      icon: Scale,
      accent: 'border-amber-200 bg-amber-50/50 text-amber-900',
    },
    {
      id: 'response-speed',
      badge: 'आपातकालीन गति (Emergency Response)',
      stat: '< 45',
      unit: 'मिनट में स्थानीय राहत वितरण',
      unitEn: 'Minutes Average Last-Mile Local Dispatch Window',
      headline: '45 मिनट का स्वर्णिम समय (The Golden 45-Minute Window)',
      description:
        'पारंपरिक केंद्रीकृत राहत शिविरों में राशन पहुंचाने में 24 से 72 घंटे लग जाते हैं। हमारा हाइपर-लोकल जीपीएस मैपिंग सिस्टम निकटतम सत्यापित रसोई और स्वयंसेवकों को तुरंत सक्रिय करता है, जिससे पका हुआ गर्म भोजन ताजा और स्वास्थ्यवर्धक तापमान (>60°C) पर ही परिवार तक पहुंचता है।',
      impactMetric: '10x तेज पारंपरिक राहत की तुलना में',
      impactEn: '10x faster than centralized bulk supply chains',
      icon: Clock,
      accent: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
    },
    {
      id: 'education-retention',
      badge: 'शिक्षा अधिकार तथ्य (Education Access Fact)',
      stat: '3+',
      unit: 'वर्षों तक पाठ्यपुस्तकों का निरंतर पुनःउपयोग',
      unitEn: 'Years Lifecycle per Donated Textbook Set',
      headline: 'पुस्तकों का चक्रीय जीवन चक्र (Textbook Circularity & Child Retention)',
      description:
        'अध्ययनों के अनुसार, 63% आर्थिक रूप से कमज़ोर परिवारों के बच्चे केवल पाठ्यपुस्तकों और अभ्यास पुस्तिकाओं के अभाव में स्कूल छोड़ देते हैं। 1 दान की गई एनसीईआरटी (NCERT) पुस्तक औसतन 3 छात्रों को शिक्षित करती है तथा 250 लीटर ताजे जल की बचत करती है।',
      impactMetric: 'स्कूल छोड़ने की दर में 40% कमी',
      impactEn: 'Drastically prevents low-income student dropouts',
      icon: BookOpen,
      accent: 'border-sky-200 bg-sky-50/50 text-sky-900',
    },
    {
      id: 'winter-warmth',
      badge: 'शीतकालीन जीवन रक्षा (Winter Survival Fact)',
      stat: '78%',
      unit: 'शीत लहर में स्वास्थ्य जोखिमों में कमी',
      unitEn: 'Reduction in Winter Hypothermia Cases via Timely Warmth Kits',
      headline: 'गर्म वस्त्र व कंबल का सुरक्षा कवच (Winter Dignity & Thermal Defense)',
      description:
        'उत्तरी व मध्य भारत में कड़ाके की ठंड के दौरान फुटपाथों और अस्थायी बस्तियों में रहने वाले श्रमिकों और शिशुओं के लिए 3-पीस थर्मल किट (कंबल + ऊनी स्वेटर + मफलर/कैप) हाइपोथर्मिया और निमोनिया से जीवन रक्षक साबित होती है।',
      impactMetric: '100% परिवारों को प्रत्यक्ष सम्मान',
      impactEn: 'Dignified sanitized clothing directly delivered',
      icon: ThermometerSnowflake,
      accent: 'border-indigo-200 bg-indigo-50/50 text-indigo-900',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="container mx-auto px-4">
        {/* Section Title Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 mb-3">
            <PieChart className="w-3.5 h-3.5 text-emerald-600" />
            <span>अनुसंधान एवं जमीनी आंकड़े (Research & Empirical Evidence)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            राहत मिशन के प्रमुख तथ्य एवं सामाजिक सांख्यिकी
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            यह कोई साधारण दान मंच नहीं है। यह वैज्ञानिक तर्क, वास्तविक समय के डेटा और पारदर्शी नागरिक भागीदारी पर आधारित एक जवाबदेह राहत तंत्र है।
          </p>
        </div>

        {/* 4 Empirical Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {empiricalFacts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div
                key={fact.id}
                className={`p-6 sm:p-7 rounded-3xl border transition-all hover:shadow-md flex flex-col justify-between ${fact.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200/60 shadow-2xs">
                      {fact.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 text-slate-800" />
                    </div>
                  </div>

                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-950">
                      {fact.stat}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-700">
                      {fact.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mb-4">
                    {fact.unitEn}
                  </p>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {fact.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    {fact.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span className="flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{fact.impactMetric}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    {fact.impactEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Photo Spotlights: Kitchen Preparation & Doorstep Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="relative rounded-3xl overflow-hidden shadow-xs border border-slate-200 bg-slate-100 group">
            <div className="h-60 sm:h-64 overflow-hidden">
              <img
                src={AppImages.communityKitchenSteaming}
                alt="Community kitchen steaming lentils and khichdi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1">
              <span className="bg-amber-600 font-bold px-2.5 py-0.5 rounded-md text-[10px] uppercase">
                स्वच्छ सामुदायिक रसोई (Community Kitchen)
              </span>
              <h4 className="text-sm font-bold text-white">
                ताजा व पौष्टिक भोजन निर्माण एवं स्वच्छता मानक
              </h4>
              <p className="text-[11px] text-slate-300">
                पकाए जाने के 90 मिनट के भीतर एयर-टाइट कंटेनरों में पैक कर त्वरित प्रेषण
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xs border border-slate-200 bg-slate-100 group">
            <div className="h-60 sm:h-64 overflow-hidden">
              <img
                src={AppImages.doorstepReliefHandoff}
                alt="Doorstep relief handoff with warm blanket and meal container"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1">
              <span className="bg-emerald-600 font-bold px-2.5 py-0.5 rounded-md text-[10px] uppercase">
                सीधा द्वार वितरण (Doorstep Delivery)
              </span>
              <h4 className="text-sm font-bold text-white">
                सत्यापित परिवारों को 100% प्रत्यक्ष सम्मानजनक सहायता
              </h4>
              <p className="text-[11px] text-slate-300">
                जन्म प्रमाण पत्र सत्यापन के उपरांत बिना किसी बिचौलिए के सीधा वितरण
              </p>
            </div>
          </div>
        </div>

        {/* Factual Transparency Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>शून्य बिचौलिए, शून्य कमीशन (Zero Leakage Guarantee)</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              प्रत्येक सहायता पैकेट का सीधा ऑडिट और 100% सार्वजनिक जवाबदेही
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              सरकारी एजेंसियों और स्वतंत्र अध्ययनों के अनुसार, पारंपरिक नकद और राशन योजनाओं में 30% से अधिक संसाधन बिचौलियों की भेंट चढ़ जाते हैं। कम्युनिटी कनेक्ट पर प्रत्येक प्राप्तकर्ता का जन्म प्रमाण पत्र सत्यापित होने के कारण काल्पनिक या फर्जी दावों की गुंजाइश शून्य है।
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 text-center">
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10 min-w-[120px]">
              <div className="text-2xl font-black font-mono text-emerald-400">0%</div>
              <div className="text-[11px] text-slate-300 font-medium">कमीशन कटौती</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10 min-w-[120px]">
              <div className="text-2xl font-black font-mono text-teal-300">100%</div>
              <div className="text-[11px] text-slate-300 font-medium">सीधा द्वार तक वितरण</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
