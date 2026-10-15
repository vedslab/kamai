import React from 'react';
import {
  Home,
  Briefcase,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavigationProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  currentLanguage: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onChangeTab,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // 4 Primary worker items: Home, Work, Pakka, Help
  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      tab: 'home',
      label: t.navHome,
      icon: <Home className="w-5 h-5" />
    },
    {
      tab: 'work',
      label: t.navWork,
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      tab: 'pehle_pakka',
      label: t.navPakka,
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      tab: 'rights',
      label: t.navRights,
      icon: <BookOpen className="w-5 h-5" />
    }
  ];

  return (
    /* Menu bar is at the bottom ONLY for all screen sizes */
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-sand-300 shadow-warm-lg"
      aria-label="Main navigation"
    >
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-1 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = item.tab === 'work' ? (activeTab === 'work' || activeTab === 'explore') : activeTab === item.tab;
          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => onChangeTab(item.tab)}
              aria-label={item.label}
              className={`touch-target-primary flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500 ${
                isActive
                  ? 'text-deepgreen-900 font-bold'
                  : 'text-deepgreen-800 hover:text-nearblack'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`p-1 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-sand-300/80 text-deepgreen-900' 
                  : ''
              }`}>
                {item.icon}
              </div>
              <span className={`text-[11px] leading-tight text-center tracking-tight font-hindi mt-0.5 ${
                isActive ? 'font-extrabold text-deepgreen-900' : 'font-semibold'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full mt-0.5 bg-deepgreen-800" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
