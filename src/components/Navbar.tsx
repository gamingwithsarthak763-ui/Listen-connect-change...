import React, { useState } from 'react';
import {
  Home,
  MapPin,
  HeartHandshake,
  Building2,
  HelpCircle,
  Menu,
  X,
  Lock,
  Sparkles,
  Camera,
  Layers,
  ArrowRight,
  ShieldCheck,
  ListOrdered
} from 'lucide-react';
import { AppPage } from '../types';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  activeRequestsCount: number;
  activeProvidersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  activeRequestsCount,
  activeProvidersCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: AppPage; labelHindi: string; labelEnglish: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', labelHindi: 'होम', labelEnglish: 'Home', icon: Home },
    { id: 'map', labelHindi: 'लाइव मैप', labelEnglish: 'Live Map', icon: MapPin },
    { id: 'request', labelHindi: 'सहायता मांगें', labelEnglish: 'Get Relief', icon: HeartHandshake },
    { id: 'provider', labelHindi: 'प्रदाता पंजीकरण', labelEnglish: 'Register NGO', icon: Building2 },
    { id: 'directory', labelHindi: 'मिशन निर्देशिका', labelEnglish: 'Directory', icon: ListOrdered },
    { id: 'gallery', labelHindi: 'राहत गैलरी', labelEnglish: 'Gallery', icon: Camera },
    { id: 'faq', labelHindi: 'FAQ व अधिकार', labelEnglish: 'Help & Rights', icon: HelpCircle },
  ];

  const handleNavClick = (page: AppPage) => {
    setMobileMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      {/* Top Emergency Announcement Ribbon - No phone numbers or emails */}
      <div className="bg-emerald-950 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold tracking-wide">
              🔴 100% प्रत्यक्ष राहत नेटवर्क (Zero Hunger • Direct Citizen-to-NGO Dispatch)
            </span>
            <span className="hidden md:inline text-emerald-200">
              | जन्म प्रमाण पत्र सत्यापन अनिवार्य (Birth Proof Verified)
            </span>
          </div>

          <div className="flex items-center space-x-2 text-emerald-200 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>डिजिटल राहत प्रेषण नियंत्रण कक्ष (Digital Emergency Dispatch Active)</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="container mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
                Community Connect
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                कम्युनिटी कनेक्ट
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Zero Hunger. 100% Direct Relief (शून्य भुखमरी। सीधा वितरण)
            </p>
          </div>
        </div>

        {/* Desktop Navigation Pages */}
        <div className="hidden lg:flex items-center space-x-1 text-xs font-bold text-slate-700">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20 font-bold'
                    : 'hover:bg-slate-100 text-slate-700 hover:text-emerald-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>
                  {item.labelHindi} ({item.labelEnglish})
                </span>

                {item.id === 'request' && activeRequestsCount > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-white text-emerald-800' : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {activeRequestsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls & Admin Link (Passcode is confidential) */}
        <div className="hidden sm:flex items-center space-x-2.5">
          <button
            onClick={() => handleNavClick('request')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>मदद मांगें (Request Help)</span>
          </button>

          <button
            onClick={() => handleNavClick('admin')}
            title="Admin Dashboard"
            className={`border px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              currentPage === 'admin'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>एडमिन (Admin)</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => handleNavClick('admin')}
            className="bg-slate-900 text-white p-2 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>एडमिन</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4" />
                  <span>
                    {item.labelHindi} ({item.labelEnglish})
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>सुरक्षित एडमिन डैशबोर्ड (Admin Portal)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
