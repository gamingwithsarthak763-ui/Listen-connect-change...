import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Radio,
  Clock,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Send,
  HeartHandshake
} from 'lucide-react';

export const FAQAndContact: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      questionHindi: 'क्या Community Connect की सहायता सेवा 100% निःशुल्क है?',
      questionEnglish: 'Is Community Connect assistance completely free with zero fees?',
      answerHindi:
        'हाँ, बिल्कुल। हमारा उद्देश्य शून्य भुखमरी और प्रत्यक्ष नागरिक सहायता है। किसी भी लाभार्थी से भोजन, अध्ययन सामग्री या कपड़ों के लिए एक भी रुपया नहीं लिया जाता है। समस्त राहत सामग्री सत्यापित दाताओं और एनजीओ द्वारा निःस्वार्थ भाव से प्रदान की जाती है।',
      answerEnglish:
        'Yes, 100% free. Community Connect operates on a zero-commercial model. Beneficiaries are never charged for meals, educational kits, or clothing.',
    },
    {
      questionHindi: 'सहायता अनुरोध सबमिट करने के बाद कितनी देर में मदद पहुँचती है?',
      questionEnglish: 'How quickly is relief dispatched after submitting a request?',
      answerHindi:
        'अनुरोध जमा होते ही हमारे मानचित्र एल्गोरिदम निकटतम 5 किलोमीटर के दायरे में स्थित सक्रिय प्रदाताओं को अलर्ट भेजते हैं। अति-आवश्यक (Critical) भोजन अनुरोधों पर डिजिटल समन्वय के माध्यम से सीधा संपर्क और वितरण प्रारंभ हो जाता है।',
      answerEnglish:
        'Incoming requests trigger proximity alerts to verified providers within 5km. Critical requests receive direct volunteer handoff via digital telemetry.',
    },
    {
      questionHindi: 'जन्म प्रमाण पत्र (Birth Proof) सत्यापन क्यों अनिवार्य है?',
      questionEnglish: 'Why is Birth Proof verification mandatory for requesters and NGOs?',
      answerHindi:
        'सुरक्षा और 100% पारदर्शिता हमारे मंच की सर्वोच्च प्राथमिकता है। वास्तविक नागरिकों तक सहायता सुनिश्चित करने के लिए जन्म प्रमाण पत्र या सरकारी पहचान साक्ष्य अपलोड किया जाता है।',
      answerEnglish:
        'To ensure community trust and verify genuine beneficiaries, valid birth proof or official identification documentation is required before dispatch.',
    },
    {
      questionHindi: 'दूरी की गणना और निकटतम प्रदाता मिलान कैसे कार्य करता है?',
      questionEnglish: 'How does distance calculation and provider matching work?',
      answerHindi:
        'हम सटीक गोलाकार Haversine दूरी सूत्र का उपयोग करते हैं। यह अनुरोधकर्ता के जीपीएस निर्देशांकों और प्रदाता केंद्र के बीच सीधी सड़क दूरी (Kilometers) तथा प्रेषण समय की रीयल-टाइम गणना करता है।',
      answerEnglish:
        'Our system computes geodesic distance using the Haversine formula, calculating exact kilometer separation and dispatch ETAs between hubs and recipients.',
    },
    {
      questionHindi: 'नागरिक अतिरिक्त भोजन, पुस्तकें या गर्म वस्त्र कैसे दान कर सकते हैं?',
      questionEnglish: 'How can citizens donate surplus food, study materials, or wearables?',
      answerHindi:
        'आप इसी पोर्टल पर "प्रदाता पंजीकरण" फॉर्म भरकर व्यक्तिगत दाता (Individual Donor) या एनजीओ के रूप में पंजीकृत हो सकते हैं, जिससे आपका केंद्र सीधे लाइव मानचित्र पर प्रदर्शित होगा।',
      answerEnglish:
        'Register as a Donor or Community Kitchen using our Provider Registration form to have your distribution hub activated on the live network.',
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-12 sm:py-16 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>सहायता व अक्सर पूछे जाने वाले प्रश्न (FAQ & Direct Support)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            अक्सर पूछे जाने वाले सवाल व सहायता (Frequently Asked Questions)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            राहत प्रक्रिया, जन्म प्रमाण पत्र सत्यापन और वितरण के संबंध में अपने प्रश्नों के उत्तर जानें।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* FAQ Accordion (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-emerald-500 bg-emerald-50/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4 focus:outline-hidden cursor-pointer"
                  >
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {faq.questionHindi}
                      </h3>
                      <h4 className="text-xs text-slate-500 font-medium mt-1">
                        {faq.questionEnglish}
                      </h4>
                    </div>

                    <div
                      className={`p-1.5 rounded-lg shrink-0 transition-transform ${
                        isOpen ? 'bg-emerald-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-emerald-100/60 text-xs sm:text-sm text-slate-700 space-y-2 animate-in fade-in duration-200">
                      <p className="leading-relaxed font-normal">{faq.answerHindi}</p>
                      <p className="text-xs text-slate-500 italic leading-relaxed pt-1">
                        {faq.answerEnglish}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Digital Emergency Command Hub - No phone numbers or emails */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-700/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span>डिजिटल राहत नियंत्रण केंद्र (Digital Command Hub)</span>
              </div>

              <h3 className="text-xl font-bold tracking-tight mb-4">
                सीधा आपातकालीन डिजिटल प्रेषण (Instant Digital Dispatch)
              </h3>

              <div className="space-y-3">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-300 font-bold text-xs">
                    <Radio className="w-4 h-4" />
                    <span>रीयल-टाइम जीपीएस कनेक्ट</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    सहायता फॉर्म भरते ही आपका जीपीएस स्थान निकटतम स्वयंसेवकों को स्वचालित रूप से भेज दिया जाता है।
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-300 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>जन्म प्रमाण पत्र सत्यापन प्रक्रिया</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    प्रत्येक अनुरोध के साथ संलग्न जन्म प्रमाण पत्र सीधे अधिकृत समन्वयकों द्वारा जाँचा जाता है।
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-300 font-bold text-xs">
                    <Clock className="w-4 h-4" />
                    <span>24×7 स्वचालित डिजिटल ट्रैकिंग</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    ड्यूटी रूट मैप द्वारा राहत वितरण की हर गतिविधि ट्रैक की जाती है।
                  </p>
                </div>
              </div>

              {/* Physical Dispatch Base */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-start space-x-2 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  केंद्रीय राहत समन्वय केंद्र: कनाट प्लेस, नई दिल्ली (Central Dispatch Control Hub)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
