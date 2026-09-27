import React from 'react';
import {
  Scale,
  Check,
  X,
  Clock,
  ShieldCheck,
  Users,
  Eye,
  Lock,
  Zap
} from 'lucide-react';

export const ReliefComparisonMatrix: React.FC = () => {
  const comparisons = [
    {
      parameter: 'राहत प्रेषण समय (Delivery Turnaround)',
      traditional: '24 से 72 घंटे (केंद्रीकृत गोदामों व कागजी अनुमोदन के कारण देरी)',
      communityConnect: '< 45 मिनट (हाइपर-लोकल Haversine GPS निकटतम किचन मैपिंग)',
      highlight: true,
    },
    {
      parameter: 'लाभार्थी सत्यापन (Beneficiary Verification)',
      traditional: 'साधारण हस्तलिखित फॉर्म, जिससे भारी संख्या में फर्जी/काल्पनिक नाम दर्ज होते हैं',
      communityConnect: 'अनिवार्य जन्म प्रमाण पत्र (Birth Proof) डिजिटल ऑडिट - 100% शून्य फर्जीवाड़ा',
      highlight: true,
    },
    {
      parameter: 'बिचौलिए व लीकेज (Intermediaries & Ration Leakage)',
      traditional: 'कई स्तरों पर बिचौलिए और ठेकेदार; 30% तक सामग्री रास्ते में गायब',
      communityConnect: 'शून्य बिचौलिए (0%); सीधे सत्यापित एनजीओ/स्वयंसेवक से नागरिक तक हाथोहाथ वितरण',
      highlight: true,
    },
    {
      parameter: 'डेटा पारदर्शिता (Ledger Transparency)',
      traditional: 'कागजी बहीखाते जो महीनों बाद प्रकाशित होते हैं या कभी सार्वजनिक नहीं होते',
      communityConnect: 'रीयल-टाइम शून्य-आधारित लाइव लेज़र (0 से शुरू होने वाला वास्तविक प्रमाणित डेटा)',
      highlight: false,
    },
    {
      parameter: 'नागरिक गोपनीयता (Privacy Safeguards)',
      traditional: 'सार्वजनिक सूचियों में फोन नंबर और पते उजागर होने से शोषण का खतरा',
      communityConnect: 'सुरक्षित संदर्भ टोकन; कोई भी फोन नंबर या ईमेल सार्वजनिक नहीं दिखाया जाता',
      highlight: true,
    },
    {
      parameter: 'प्रदाता उत्तरदायित्व (Provider Accountability)',
      traditional: 'दाता को पता नहीं चलता कि उसका दिया राशन वास्तव में किसे मिला',
      communityConnect: 'जीपीएस जिओ-टैग और सत्यापित फील्ड डिलीवरी पुष्टि के साथ संपूर्ण ऑडिट ट्रेल',
      highlight: false,
    },
  ];

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>तुलनात्मक विश्लेषण (Systemic Comparative Analysis)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            पारंपरिक राहत प्रणाली बनाम कम्युनिटी कनेक्ट
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            तथ्यों पर आधारित तुलना: जानिए क्यों हमारा हाइपर-लोकल तकनीक-सक्षम मॉडल अधिक पारदर्शी, तीव्र और मानवीय है।
          </p>
        </div>

        {/* Table Container */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-xs font-bold text-slate-700">
                  <th className="py-4 px-5 sm:px-6 w-1/4">मानदंड / पैरामीटर</th>
                  <th className="py-4 px-5 sm:px-6 w-3/8 text-slate-500">
                    पारंपरिक सहायता व्यवस्था (Traditional Relief)
                  </th>
                  <th className="py-4 px-5 sm:px-6 w-3/8 text-emerald-900 bg-emerald-100/60 font-black">
                    कम्युनिटी कनेक्ट (Community Connect Protocol)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {comparisons.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      row.highlight ? 'bg-white' : 'bg-slate-50/40'
                    }`}
                  >
                    <td className="py-4 px-5 sm:px-6 font-bold text-slate-900 align-top">
                      {row.parameter}
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-slate-600 align-top leading-relaxed">
                      <div className="flex items-start space-x-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-emerald-950 bg-emerald-50/50 font-medium align-top leading-relaxed">
                      <div className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.communityConnect}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
