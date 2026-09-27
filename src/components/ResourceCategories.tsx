import React from 'react';
import { Utensils, BookOpen, Shirt, ArrowRight, HeartHandshake, CheckCircle } from 'lucide-react';
import { CategoryType } from '../types';

interface ResourceCategoriesProps {
  onSelectCategory: (cat: CategoryType) => void;
  onRequestWithCategory: (cat: 'food' | 'books' | 'clothes') => void;
}

export const ResourceCategories: React.FC<ResourceCategoriesProps> = ({
  onSelectCategory,
  onRequestWithCategory,
}) => {
  const categories = [
    {
      id: 'food' as const,
      emoji: '🍲',
      titleHindi: 'भोजन राहत (Food Relief)',
      titleEnglish: 'Nutritious Meals & Dry Ration Kits',
      badgeHindi: 'उच्च प्राथमिकता (High Priority)',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      descriptionHindi:
        'ताज़ा पकाया हुआ पौष्टिक भोजन, आटा, दाल, चावल, खाद्य तेल, शिशु आहार और आपातकालीन पेयजल किट।',
      descriptionEnglish:
        'Fresh warm meals, essential grain hampers, baby formula, clean drinking water pouches.',
      acceptedItems: [
        'सब्जी व रोटी थाली (Cooked Thali)',
        'दाल, चावल व आटा (Dry Grains & Pulses)',
        'शिशु आहार व दूध (Baby Food & Milk)',
        'आपातकालीन जल (Clean Water Packs)',
      ],
      icon: Utensils,
      color: 'emerald',
      bgGrad: 'from-emerald-500/10 via-emerald-50/50 to-white',
      accentBorder: 'border-emerald-200',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      id: 'books' as const,
      emoji: '📚',
      titleHindi: 'शिक्षा व किताबें (Books & Study Material)',
      titleEnglish: 'Textbooks, Stationery & Educational Kits',
      badgeHindi: 'सक्रिय अभियान (Active Drive)',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      descriptionHindi:
        'एनसीईआरटी पाठ्यपुस्तकें, अभ्यास कापियां, पेन-पेंसिल सेट, ज्यामिति बॉक्स और स्कूली बस्ते।',
      descriptionEnglish:
        'Curriculum textbooks (Classes 1-12), notebooks, writing sets, calculators & school bags.',
      acceptedItems: [
        'स्कूली किताबें (School Textbooks)',
        'कापियां व रजिस्टर (Notebooks)',
        'स्टेशनरी किट (Pens & Geometry)',
        'प्रतिस्पर्धी पुस्तकें (Exam Prep)',
      ],
      icon: BookOpen,
      color: 'sky',
      bgGrad: 'from-sky-500/10 via-sky-50/50 to-white',
      accentBorder: 'border-sky-200',
      btnBg: 'bg-sky-600 hover:bg-sky-700 text-white',
    },
    {
      id: 'clothes' as const,
      emoji: '👕',
      titleHindi: 'वस्त्र व परिधान (Clothing & Warm Wear)',
      titleEnglish: 'Clean Apparels, Warm Blankets & Footwear',
      badgeHindi: 'मौसम राहत (Seasonal Relief)',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      descriptionHindi:
        'स्वच्छ व कीटाणुरहित कपड़े, ऊनी स्वेटर, जैकेट, गर्म कंबल, मोजे और बच्चों के परिधान।',
      descriptionEnglish:
        'Sanitized family wearables, thermal sweaters, windcheaters, winter blankets, baby onesies.',
      acceptedItems: [
        'गर्म स्वेटर व जैकेट (Winter Sweaters)',
        'कंबल व रजाई (Thermal Blankets)',
        'बच्चों के वस्त्र (Children Clothing)',
        'जूते व चप्पल (Sanitized Footwear)',
      ],
      icon: Shirt,
      color: 'indigo',
      bgGrad: 'from-indigo-500/10 via-indigo-50/50 to-white',
      accentBorder: 'border-indigo-200',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
  ];

  return (
    <section id="resource-categories" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <span>राहत संसाधन श्रेणियां (Resource Category Matrix)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            संसाधन वितरण श्रेणियां (Direct Relief Distribution Verticals)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            प्रत्येक श्रेणी के लिए विशेष स्थानीय वितरण दल और समर्पित स्वयंसेवक तैनात हैं।
            अपनी आवश्यकता अनुसार सीधे अनुरोध करें।
          </p>
        </div>

        {/* 3 Main Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                className={`rounded-3xl p-6 sm:p-7 border ${cat.accentBorder} bg-gradient-to-b ${cat.bgGrad} shadow-xs hover:shadow-lg transition-all flex flex-col justify-between`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl select-none" role="img" aria-label={cat.id}>
                        {cat.emoji}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {cat.titleHindi}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500">
                          {cat.titleEnglish}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cat.badgeColor}`}>
                      {cat.badgeHindi}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2 font-medium">
                    {cat.descriptionHindi}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 italic">
                    {cat.descriptionEnglish}
                  </p>

                  {/* Accepted/Distributed items checklist */}
                  <div className="bg-white/80 rounded-2xl p-4 border border-slate-200/80 mb-6">
                    <div className="text-xs font-bold text-slate-700 mb-2.5 flex items-center space-x-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                      <span>स्वीकृत व वितरित सामग्री (Accepted Items)</span>
                    </div>
                    <ul className="space-y-1.5">
                      {cat.acceptedItems.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-center space-x-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onRequestWithCategory(cat.id)}
                    className={`w-full ${cat.btnBg} py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center space-x-2 transition-all`}
                  >
                    <span>मदद के लिए अनुरोध करें (Request {cat.emoji})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>📍 लाइव मैप पर देखें (Filter on Live Map)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
