import React from 'react';
import {
  UtensilsCrossed,
  BookOpen,
  ThermometerSnowflake,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { AppImages } from '../assets/images';

interface ReliefStandardsProps {
  onRequestCategory: (cat: 'food' | 'books' | 'clothes') => void;
}

export const ReliefStandards: React.FC<ReliefStandardsProps> = ({ onRequestCategory }) => {
  const categories = [
    {
      id: 'food' as const,
      titleHindi: 'आहार एवं पोषण राहत मानक',
      titleEnglish: 'Emergency Food & Nutritional Standards',
      imgSrc: AppImages.communityFoodKitchen,
      alt: 'Community food kitchen preparation and meal packaging',
      badge: 'पोषण सुरक्षा (Nutrition Safety)',
      headline: 'ताजा तैयार, पौष्टिक एवं गर्म भोजन',
      guidelines: [
        'पकाए जाने के अधिकतम 90 मिनट के भीतर स्वच्छ एयर-टाइट कंटेनरों में पैक करना अनिवार्य।',
        'प्रति वयस्क न्यूनतम 650 kcal और प्रति बालक 450 kcal ऊर्जा मानक (दाल-चावल/खिचड़ी, रोटी, सब्जी)।',
        'शिशुओं (0-2 वर्ष) के लिए अलग से उबला दूध, सेरेलक या दलिया का प्रावधान।',
        'फूड इंस्पेक्टर व शेफ द्वारा तापमान व ताजगी (>60°C) की पूर्व जांच।',
      ],
      accentBg: 'bg-amber-500/10 text-amber-700',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    {
      id: 'books' as const,
      titleHindi: 'शिक्षा एवं पाठ्यपुस्तक मानक',
      titleEnglish: 'Educational Textbook & Study Standards',
      imgSrc: AppImages.childrenEducationBooks,
      alt: 'Children receiving textbooks and notebooks',
      badge: 'शिक्षा अधिकार (RTE Compliance)',
      headline: 'कक्षा 1 से 12 तक संपूर्ण पाठ्यक्रम किट',
      guidelines: [
        'एनसीईआरटी (NCERT) और राज्य शिक्षा बोर्ड के नवीनतम पाठ्यक्रम से मेल खाती पुस्तकें।',
        'कवर और सभी पन्ने सुरक्षित हों; मुख्य विषय (गणित, विज्ञान, भाषा, सामाजिक विज्ञान) का पूरा सेट।',
        'प्रत्येक पुस्तक सेट के साथ 4 नई अभ्यास पुस्तिकाएं (Notebooks) व लेखन सामग्री किट।',
        'छात्र की कक्षा और माध्यम (हिंदी / अंग्रेजी) के अनुसार सटीक वर्गीकरण।',
      ],
      accentBg: 'bg-sky-500/10 text-sky-700',
      btnColor: 'bg-sky-600 hover:bg-sky-700 text-white',
    },
    {
      id: 'clothes' as const,
      titleHindi: 'वस्त्र एवं शीतकालीन सुरक्षा मानक',
      titleEnglish: 'Dignity Apparel & Thermal Weather Standards',
      imgSrc: AppImages.winterWarmthBlankets,
      alt: 'Folded warm winter blankets and thermal jackets',
      badge: 'शीत लहर सुरक्षा (Cold Wave Armor)',
      headline: 'धुले, सैनिटाइज्ड और उच्च गुणवत्ता वाले वस्त्र',
      guidelines: [
        'सभी दान किए गए वस्त्र 60°C पर धुले, सूखे और जीवाणुरहित (Sanitized) होने चाहिए।',
        'शीत ऋतु में न्यूनतम 500 GSM का भारी डबल-लेयर गर्म ऊनी कंबल प्रदान किया जाता है।',
        'आयु वर्ग (शिशु, बालक, वयस्क, वृद्ध) और लिंग के आधार पर स्पष्ट लेबलिंग।',
        'कोई भी फटा या उपयोग-अयोग्य वस्त्र वितरित नहीं किया जाता; केवल सम्मानजनक गुणवत्ता।',
      ],
      accentBg: 'bg-indigo-500/10 text-indigo-700',
      btnColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>गुणवत्ता मानक (Strict Humanitarian Quality Protocols)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            राहत सामग्री के कठोर मानक एवं प्रोटोकॉल
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            ज़रूरतमंद परिवारों को दी जाने वाली प्रत्येक वस्तु गरिमा, पोषण और स्वास्थ्य सुरक्षा के उच्चतम मापदंडों पर खरी उतरती है।
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-slate-50/80 rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-200">
                  <img
                    src={cat.imgSrc}
                    alt={cat.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      // Fallback: hide broken img and show colored container
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-bold tracking-wide bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      {cat.badge}
                    </span>
                    <span className="text-[11px] text-emerald-300 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>मानक सत्यापित</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="space-y-1 mb-4">
                    <h3 className="text-lg font-bold text-slate-900">
                      {cat.titleHindi}
                    </h3>
                    <h4 className="text-xs font-semibold text-slate-500">
                      {cat.titleEnglish}
                    </h4>
                  </div>

                  <p className="text-xs font-bold text-emerald-800 mb-3 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
                    {cat.headline}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-600">
                    {cat.guidelines.map((g, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onRequestCategory(cat.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer ${cat.btnColor}`}
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>इस श्रेणी में सहायता मांगें (Request Aid)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
