import React from 'react';
import {
  FileText,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Scale,
  Sparkles,
  BookOpen,
  Heart
} from 'lucide-react';

export const CitizenRightsAndCharter: React.FC = () => {
  const legalRights = [
    {
      act: 'राष्ट्रीय खाद्य सुरक्षा अधिनियम, 2013 (NFSA 2013)',
      section: 'धारा 3 व 4',
      title: 'पर्याप्त व पौष्टिक आहार का वैधानिक अधिकार',
      description:
        'अधिनियम के तहत प्रत्येक नागरिक को गरिमापूर्ण जीवन हेतु न्यूनतम आवश्यक कैलोरी प्राप्त करने का कानूनी हक है। कम्युनिटी कनेक्ट इस संवैधानिक उद्देश्य को पूरा करने में सामुदायिक सहभागिता को सक्षम बनाता है।',
      icon: Scale,
    },
    {
      act: 'निःशुल्क और अनिवार्य बाल शिक्षा का अधिकार अधिनियम (RTE 2009)',
      section: 'धारा 8 व 9',
      title: 'निःशुल्क पाठ्यपुस्तकों व शिक्षण सामग्री का अधिकार',
      description:
        '6 से 14 वर्ष की आयु के प्रत्येक बच्चे को अध्ययन सामग्री, पाठ्यपुस्तकों और अभ्यास पुस्तिकाओं की उपलब्धता सुनिश्चित करना समाज और राज्य का दायित्व है।',
      icon: BookOpen,
    },
    {
      act: 'भारत का संविधान (Constitution of India)',
      section: 'अनुच्छेद 21 (Article 21)',
      title: 'गरिमापूर्ण जीवन एवं न्यूनतम मानवीय सुरक्षा का मौलिक अधिकार',
      description:
        'सर्वोच्च न्यायालय के ऐतिहासिक निर्णयों के अनुसार, भोजन, आश्रय और मौसमी ठंड से बचाव का अधिकार जीवन के मौलिक अधिकार का अभिन्न अंग है।',
      icon: Heart,
    },
  ];

  const dos = [
    'अनुरोध दर्ज करते समय जन्म प्रमाण पत्र की स्पष्ट व पठनीय फोटो अपलोड करें।',
    'सटीक जीपीएस स्थान या निकटतम पहचान योग्य लैंडमार्क दर्ज करें ताकि राहत दल शीघ्र पहुंचे।',
    'केवल अपनी और अपने परिवार की वास्तविक आवश्यकता के अनुसार ही श्रेणी का चयन करें।',
    'राहत सामग्री प्राप्त करने पर विनम्रता से पुष्टि करें ताकि लेज़र में सफल मिशन दर्ज हो सके।',
  ];

  const donts = [
    'किसी भी प्रकार का फर्जी, जाली या दूसरों का जन्म प्रमाण पत्र कदापि प्रस्तुत न करें।',
    'प्राप्त राहत सामग्री को किसी भी परिस्थिति में बाजार में पुनः बेचना या वाणिज्यिक उपयोग सख्त वर्जित है।',
    'राहत कर्मियों या स्वयंसेवकों को कोई नकद रिश्वत या कमीशन न दें—यह सेवा 100% निःशुल्क है।',
    'अनावश्यक या अत्यधिक राशन की मांग न करें जिससे अन्य वंचित परिवार राहत से वंचित रह जाएं।',
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            <span>विधिक अधिकार व नागरिक चार्टर (Legal Framework & Citizen Charter)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            संवैधानिक अधिकार, नियम एवं नैतिक आचार संहिता
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            जानिए खाद्य सुरक्षा, बाल शिक्षा और नागरिक गरिमा से जुड़े कानूनी अधिकार तथा राहत नेटवर्क में भागीदारी के दिशानिर्देश।
          </p>
        </div>

        {/* 3 Legal Rights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {legalRights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-emerald-700 flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {item.act} ({item.section})
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Do's & Don'ts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-3xl p-6 sm:p-7">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold text-base mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>क्या करें (Citizen & Donor Do's)</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              {dos.map((item, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-rose-50/60 border border-rose-200/80 rounded-3xl p-6 sm:p-7">
            <div className="flex items-center space-x-2 text-rose-900 font-bold text-base mb-4">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>क्या न करें (Citizen & Donor Don'ts)</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              {donts.map((item, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
