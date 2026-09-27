import React, { useState } from 'react';
import {
  Calculator,
  UtensilsCrossed,
  BookOpen,
  ThermometerSnowflake,
  ArrowRight,
  Sparkles,
  Leaf,
  Users,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface InteractiveImpactCalculatorProps {
  onNavigateToRequest: () => void;
  onNavigateToProvider: () => void;
}

export const InteractiveImpactCalculator: React.FC<InteractiveImpactCalculatorProps> = ({
  onNavigateToRequest,
  onNavigateToProvider,
}) => {
  const [foodKg, setFoodKg] = useState<number>(10);
  const [booksCount, setBooksCount] = useState<number>(12);
  const [clothesCount, setClothesCount] = useState<number>(6);

  // Calculated Metrics
  // 1 kg of prepared surplus food = ~2.5 warm nutritious meal portions
  const mealsServed = Math.round(foodKg * 2.5);
  // 1 meal diverted from landfill saves approx 1.9 kg of CO2 equivalent emissions
  const co2PreventedKg = (foodKg * 2.2).toFixed(1);

  // 4 books = 1 complete academic syllabus set for a child
  const studentsEquipped = Math.max(1, Math.floor(booksCount / 4));
  // 1 reused book saves approx 250 liters of fresh water in industrial paper mills
  const waterSavedLiters = booksCount * 250;

  // 3 warm clothing items = full thermal kit for 1 vulnerable person
  const personsProtected = Math.max(1, Math.floor(clothesCount / 3));

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>इंटरएक्टिव प्रभाव कैलकुलेटर (Interactive Aid Estimator)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            देखें आपके अधिशेष (Surplus) से कितने परिवारों को राहत मिलेगी
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            स्लाइडर को आगे-पीछे करके वास्तविक सामाजिक प्रभाव और बचाए गए पर्यावरणीय संसाधनों का तुरंत अनुमान लगाएं।
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <span>सामग्री मात्रा समायोजित करें (Adjust Quantities)</span>
              </h3>

              {/* Slider 1: Food */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                    <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                    <span>अतिरिक्त पका हुआ भोजन (Surplus Prepared Food)</span>
                  </span>
                  <span className="font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg text-sm">
                    {foodKg} किग्रा (kg)
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="2"
                  value={foodKg}
                  onChange={(e) => setFoodKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>2 किग्रा (5 प्लेट)</span>
                  <span>50 किग्रा</span>
                  <span>100 किग्रा (250 प्लेट)</span>
                </div>
              </div>

              {/* Slider 2: Books */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    <span>पाठ्यपुस्तकें एवं अभ्यास पुस्तिकाएं (Textbooks & Notes)</span>
                  </span>
                  <span className="font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-lg text-sm">
                    {booksCount} पुस्तकें (Books)
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="80"
                  step="4"
                  value={booksCount}
                  onChange={(e) => setBooksCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>4 पुस्तकें (1 छात्र)</span>
                  <span>40 पुस्तकें</span>
                  <span>80 पुस्तकें (20 छात्र)</span>
                </div>
              </div>

              {/* Slider 3: Clothes */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                    <ThermometerSnowflake className="w-4 h-4 text-indigo-600" />
                    <span>गर्म वस्त्र एवं कंबल (Warm Sweaters & Blankets)</span>
                  </span>
                  <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-lg text-sm">
                    {clothesCount} वस्त्र/कंबल (Items)
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="60"
                  step="3"
                  value={clothesCount}
                  onChange={(e) => setClothesCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>3 वस्त्र (1 व्यक्ति)</span>
                  <span>30 वस्त्र</span>
                  <span>60 वस्त्र (20 व्यक्ति)</span>
                </div>
              </div>
            </div>

            {/* Right Summary Results (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>गणना किया गया प्रभाव (Calculated Impact)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 px-2 py-0.5 rounded-full font-mono">
                    100% प्रत्यक्ष
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Food Impact */}
                  <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black font-mono text-amber-300">
                        {mealsServed} थालियां
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        गरम पौष्टिक भोजन (Warm Meals Served)
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-emerald-300 font-mono">
                      <span>{co2PreventedKg} kg CO₂</span>
                      <div className="text-[9px] text-slate-400">उत्सर्जन बचत</div>
                    </div>
                  </div>

                  {/* Books Impact */}
                  <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black font-mono text-sky-300">
                        {studentsEquipped} छात्र
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        पूरे सत्र की शिक्षा सामग्री (Full School Terms)
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-sky-300 font-mono">
                      <span>{waterSavedLiters.toLocaleString('en-IN')} L</span>
                      <div className="text-[9px] text-slate-400">जल संरक्षण</div>
                    </div>
                  </div>

                  {/* Clothes Impact */}
                  <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black font-mono text-indigo-300">
                        {personsProtected} नागरिक
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        कड़ाके की ठंड से सुरक्षित (Protected from Cold Waves)
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-indigo-300 font-mono">
                      <span>100% थर्मल</span>
                      <div className="text-[9px] text-slate-400">हाइपोथर्मिया बचाव</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-2.5">
                <button
                  onClick={onNavigateToProvider}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <span>अधिशेष दान करने हेतु पंजीकरण करें (Register as Provider)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onNavigateToRequest}
                  className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>सहायता की आवश्यकता है? अनुरोध करें (Request Aid)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
