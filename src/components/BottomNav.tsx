import React from 'react';
import { Home, MapPin, HeartHandshake, ListOrdered, Lock } from 'lucide-react';
import { AppPage } from '../types';

interface BottomNavProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  activeRequestsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
  activeRequestsCount,
}) => {
  const items: { id: AppPage; labelHindi: string; labelEnglish: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', labelHindi: 'होम', labelEnglish: 'Home', icon: Home },
    { id: 'map', labelHindi: 'लाइव मैप', labelEnglish: 'Map', icon: MapPin },
    { id: 'request', labelHindi: 'सहायता', labelEnglish: 'Request', icon: HeartHandshake },
    { id: 'directory', labelHindi: 'निर्देशिका', labelEnglish: 'Directory', icon: ListOrdered },
    { id: 'admin', labelHindi: 'एडमिन', labelEnglish: 'Admin', icon: Lock },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
              isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-tight mt-0.5">
              {item.labelHindi}
            </span>

            {item.id === 'request' && activeRequestsCount > 0 && (
              <span className="absolute top-1 right-3 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {activeRequestsCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
