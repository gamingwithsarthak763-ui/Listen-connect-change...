import React from 'react';
import {
  FileCheck2,
  Users,
  ShieldCheck,
  Baby,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  EyeOff
} from 'lucide-react';
import { AppImages } from '../assets/images';

export const BirthProofVerificationFacts: React.FC = () => {
  const reasons = [
    {
      titleHindi: '1. काल्पनिक और फर्जी लाभार्थियों का पूर्ण उन्मूलन',
      titleEnglish: 'Elimination of Phantom & Duplicate Beneficiaries',
      descHindi:
        'अक्सर आपदा या खुले दान कार्यक्रमों में बिचौलिए फर्जी नामों से भारी मात्रा में राशन और सामग्री जमा कर लेते हैं। जन्म प्रमाण पत्र (Birth Proof) अनिवार्य करने से यह सुनिश्चित होता है कि हर पैकेट किसी जीवित, वास्तविक और ज़रूरतमंद नागरिक को ही दिया जा रहा है।',
      descEnglish:
        'Prevents hoarding syndicates from generating synthetic identities to divert emergency supplies.',
      icon: Users,
    },
    {
      titleHindi: '2. आयु-विशिष्ट पोषण व बच्चों की शिक्षा सुरक्षा',
      titleEnglish: 'Age-Appropriate Pediatric Nutrition & School Books',
      descHindi:
        'जन्म तिथि सत्यापन से राहत टीमों को सटीक जानकारी मिलती है कि परिवार में 0-2 वर्ष के शिशु, 3-6 वर्ष के बच्चे या स्कूल जाने वाले छात्र हैं या नहीं। इससे शिशुओं के लिए दूध/फॉर्मूला और विद्यार्थियों के लिए सही कक्षा की पाठ्यपुस्तकें भेजी जाती हैं।',
      descEnglish:
        'Guarantees infant nutritional formulas and exact grade textbooks are correctly routed based on genuine age.',
      icon: Baby,
    },
    {
      titleHindi: '3. पूर्ण नागरिक गोपनीयता (कोई फोन या ईमेल सार्वजनिक नहीं)',
      titleEnglish: 'Airtight Privacy Protection (No Public Contact Leaks)',
      descHindi:
        'अपलोड किया गया जन्म प्रमाण पत्र केवल अधिकृत एडमिन द्वारा सुरक्षित एन्क्रिप्टेड सैंडबॉक्स में जांचा जाता है। सार्वजनिक वेबसाइट या नक्शे पर नागरिक का मोबाइल नंबर या ईमेल कभी प्रकाशित नहीं किया जाता, केवल सुरक्षित टोकन आईडी दिखाई देती है।',
      descEnglish:
        'Documents are audited within a sandboxed portal. Zero phone numbers or emails are ever exposed on public views.',
      icon: EyeOff,
    },
    {
      titleHindi: '4. सेवा प्रदाताओं व एनजीओ की नैतिक जवाबदेही',
      titleEnglish: 'Ethical Verification of Relief NGOs & Providers',
      descHindi:
        'केवल सहायता मांगने वाले ही नहीं, बल्कि राहत देने वाले एनजीओ और किचन संचालकों के अधिकृत प्रतिनिधि को भी अपना जन्म प्रमाण पत्र व संस्था पहचान पत्र जमा करना होता है। इससे फर्जी संस्थाओं या असामाजिक तत्वों की रोकथाम होती है।',
      descEnglish:
        'Both relief recipients and field providers submit verified identity credentials ensuring 100% reciprocal accountability.',
      icon: ShieldCheck,
    },
  ];

  const acceptedDocs = [
    'नगर निगम या ग्राम पंचायत द्वारा जारी जन्म प्रमाण पत्र (Municipal Birth Certificate)',
    'सरकारी या मान्यता प्राप्त अस्पताल का जन्म प्रमाण पर्ची (Hospital Birth Slip)',
    'स्कूल छोड़ने का प्रमाण पत्र / स्थानांतरण प्रमाण पत्र जिसमें जन्म तिथि दर्ज हो (TC / School Leaving Certificate)',
    'आंगनवाड़ी कार्ड या मातृ एवं शिशु सुरक्षा कार्ड (Maternal & Child Health Card with DOB)',
    'आधार कार्ड / 10वीं बोर्ड प्रमाण पत्र जिसमें जन्मतिथि अंकित हो (Secondary Board Certificate with DOB)',
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>पारदर्शिता नीति (Core Transparency Protocol)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            जन्म प्रमाण पत्र सत्यापन क्यों अनिवार्य है?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            प्रत्येक सहायता अनुरोधकर्ता और एनजीओ प्रदाता के लिए जन्म प्रमाण पत्र जमा करने के पीछे के तथ्य, नियम और सुरक्षा मानक।
          </p>
        </div>

        {/* 4 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                    {item.titleHindi}
                  </h3>
                  <h4 className="text-xs font-semibold text-emerald-700 mb-3">
                    {item.titleEnglish}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {item.descHindi}
                  </p>
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    {item.descEnglish}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-medium text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600 shrink-0" />
                  <span>100% शून्य धोखाधड़ी सुरक्षा नियम</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accepted Documents Card with Visual Spotlight */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Image (5 cols) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
              <img
                src={AppImages.birthProofVerificationDesk}
                alt="Official birth proof verification and civil audit document"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-72 object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                <span className="font-bold bg-emerald-600/90 backdrop-blur-xs px-2.5 py-1 rounded-lg inline-block mb-1">
                  डिजिटल ऑडिट प्रोटोकॉल
                </span>
                <p className="text-[11px] text-slate-200">
                  प्रत्येक नागरिक और संस्था का 100% सटीक दस्तावेजी सत्यापन
                </p>
              </div>
            </div>

            {/* Document Checklist (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <FileCheck2 className="w-5 h-5 text-emerald-600" />
                    <span>सत्यापन हेतु मान्य जन्म दस्तावेज (Accepted Birth Proof Documents)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    फॉर्म भरते समय मोबाइल कैमरे से खींची गई साफ फोटो या पीडीएफ अपलोड करें
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl w-fit">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>एन्क्रिप्टेड फाइल</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {acceptedDocs.map((doc, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs text-slate-700 flex items-start space-x-2"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                      ✓
                    </div>
                    <span className="leading-snug text-[11px]">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>अस्पष्ट या अपठनीय फोटो होने पर एडमिन अनुरोध को पुनः सत्यापन के लिए चिह्नित करेगा।</span>
            </span>
            <span className="text-emerald-700 font-semibold">
              सत्यापन समय: औसतन 15-30 मिनट
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
