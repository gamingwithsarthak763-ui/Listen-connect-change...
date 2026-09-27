import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Heart, Eye } from 'lucide-react';

export const CommunityGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | {
    titleHindi: string;
    titleEnglish: string;
    location: string;
    date: string;
    category: string;
    desc: string;
    imgUrl: string;
    impact: string;
  }>(null);

  const galleryItems = [
    {
      id: 1,
      titleHindi: 'कश्मीरी गेट बाढ़ राहत शिविर - गर्म भोजन वितरण',
      titleEnglish: 'Kashmere Gate Flood Relief - Warm Meals Distribution',
      category: 'भोजन (Food 🍲)',
      location: 'Yamuna Flood Relief Camps, North Delhi',
      date: 'कल (Yesterday)',
      impact: '1,200+ गरम भोजन थाली',
      imgUrl: '/src/assets/images/community_food_kitchen_1790357073713.jpg',
      desc: 'स्थानीय कम्युनिटी किचन द्वारा तैयार ताज़ा पौष्टिक दाल, चावल और सब्जी थाली बाढ़ प्रभावित परिवारों को सम्मानपूर्वक बांटी गई।',
    },
    {
      id: 2,
      titleHindi: 'कक्षा 5 से 10वीं के छात्रों को निशुल्क पाठ्यपुस्तकें व बस्ते',
      titleEnglish: 'Educational Book Drive for Municipal School Children',
      category: 'किताबें (Books 📚)',
      location: 'Karol Bagh Municipal Learning Center',
      date: '2 दिन पहले (2 days ago)',
      impact: '450+ विद्यार्थी लाभान्वित',
      imgUrl: '/src/assets/images/children_education_books_1790357087701.jpg',
      desc: 'विद्या ज्योति ट्रस्ट द्वारा दानदाताओं की सहायता से स्कूली बच्चों को एनसीईआरटी पाठ्यक्रम की पूरी पाठ्यपुस्तकें और ज्यामिति किट वितरित की गई।',
    },
    {
      id: 3,
      titleHindi: 'शीतकालीन राहत: रैन बसेरों में भारी कंबल व ऊनी कपड़े',
      titleEnglish: 'Winter Drive: Heavy Blankets & Woolen Jackets Distribution',
      category: 'कपड़े (Clothes 👕)',
      location: 'Nizamuddin Rain Basera & AIIMS Night Shelters',
      date: '4 दिन पहले (4 days ago)',
      impact: '800+ ऊनी कंबल व स्वेटर',
      imgUrl: '/src/assets/images/winter_warmth_blankets_1790357101034.jpg',
      desc: 'कड़ाके की ठंड में खुले आसमान के नीचे रहने वाले बेसहारा बुजुर्गों व बच्चों को उच्च गुणवत्ता वाले नए कंबल और मोज़े प्रदान किए गए।',
    },
    {
      id: 4,
      titleHindi: 'द्वार तक सीधा वितरण: सत्यापित परिवार राहत मिशन',
      titleEnglish: 'Direct Doorstep Family Handoff & Relief Care',
      category: 'सीधा प्रेषण (Direct Aid 🤝)',
      location: 'Okhla Phase 2 Labor Clusters',
      date: '5 दिन पहले (5 days ago)',
      impact: '320 परिवार पोषण किट',
      imgUrl: '/src/assets/images/doorstep_relief_handoff_1790357632385.jpg',
      desc: 'जन्म प्रमाण पत्र सत्यापित परिवारों को दरवाजे तक गर्म भोजन और स्वच्छता किट का सीधा और सम्मानजनक वितरण।',
    },
    {
      id: 5,
      titleHindi: 'स्वच्छ सामुदायिक रसोई - बड़े पैमाने पर पौष्टिक भोजन निर्माण',
      titleEnglish: 'Hygienic Community Kitchen Steaming Dal & Khichdi',
      category: 'रसोई (Kitchen 🍲)',
      location: 'Lajpat Nagar Community Kitchen Hub',
      date: '1 सप्ताह पहले (1 week ago)',
      impact: '2,500+ दैनिक थालियां',
      imgUrl: '/src/assets/images/community_kitchen_steaming_1790357659584.jpg',
      desc: 'एफएसएसएआई स्वच्छता मानकों के तहत बड़े बर्तनों में ताजा उबली दाल और खिचड़ी तैयार कर तुरंत हाइपर-लोकल वैन में प्रेषित की गई।',
    },
    {
      id: 6,
      titleHindi: 'नागरिक जन्म प्रमाण पत्र एवं दस्तावेजी सत्यापन कक्ष',
      titleEnglish: 'Civic Birth Proof & Identity Verification Hub',
      category: 'सत्यापन (Verification 📜)',
      location: 'Central Relief Command Center, Delhi',
      date: '2 सप्ताह पहले (2 weeks ago)',
      impact: '100% शून्य फर्जीवाड़ा',
      imgUrl: '/src/assets/images/birth_proof_verification_desk_1790357648018.jpg',
      desc: 'अधिकृत प्रशासनिक डेस्क पर जन्म प्रमाण पत्रों की जांच कर प्रत्येक वास्तविक नागरिक और संस्था को त्वरित स्वीकृति प्रदान की गई।',
    },
  ];

  return (
    <section className="py-16 bg-slate-50/80 border-t border-slate-200/60">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>सामुदायिक राहत गैलरी (Community Relief Gallery)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ज़मीनी राहत के सच्चे पल (Moments of Direct Relief)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            हमारे स्वयंसेवकों, सहयोगी संस्थाओं और नागरिकों द्वारा ज़मीन पर पहुँचाई गई प्रत्यक्ष मदद की कुछ झलकियाँ।
            पारदर्शिता और विश्वास ही हमारी सबसे बड़ी शक्ति है।
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              {/* Image Container with Overlay */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imgUrl}
                  alt={item.titleEnglish}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-white/40">
                  {item.category}
                </div>

                {/* Impact Highlight */}
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center space-x-1">
                  <Heart className="w-3 h-3 fill-white" />
                  <span>{item.impact}</span>
                </div>

                {/* Hover Eye Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="bg-emerald-600/90 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-lg">
                    <Eye className="w-4 h-4" />
                    <span>विवरण देखें (View Photo)</span>
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold flex items-center space-x-1 text-emerald-300">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
              </div>

              {/* Card Text Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-emerald-700 transition-colors">
                    {item.titleHindi}
                  </h3>
                  <h4 className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
                    {item.titleEnglish}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                  <span className="text-emerald-600 font-semibold">100% Direct Relief</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog for Enlarged View */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 sm:h-80 w-full bg-slate-900">
              <img
                src={selectedPhoto.imgUrl}
                alt={selectedPhoto.titleEnglish}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {selectedPhoto.impact}
              </div>
            </div>

            <div className="p-6">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                {selectedPhoto.category} • {selectedPhoto.location}
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedPhoto.titleHindi}
              </h3>
              <h4 className="text-sm font-semibold text-slate-600 mb-3">
                {selectedPhoto.titleEnglish}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedPhoto.desc}
              </p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2 rounded-xl text-sm font-semibold"
                >
                  बंद करें (Close)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
