import React from 'react';
import { Languages, Contact2, PlusCircle, LogIn, LogOut, UserCheck, Mic } from 'lucide-react';
import { Language, WorkerProfile, AuthUser } from '../types';
import { TRANSLATIONS } from '../data/translations';
import kamaiLogo from '../assets/karmik-logo-white.png';

interface HeaderProps {
  currentLanguage: Language;
  onOpenLanguageModal: () => void;
  workerProfile: WorkerProfile | null;
  onNavigateToCard: () => void;
  onNavigateHome: () => void;
  authUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenVoiceAssist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onOpenLanguageModal,
  workerProfile,
  onNavigateToCard,
  onNavigateHome,
  authUser,
  onOpenAuthModal,
  onLogout,
  onOpenVoiceAssist,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const getLangBadge = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'हिन्दी';
      case 'mr':
        return 'मराठी';
      default:
        return 'English';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-sand-300">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand / Title */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-left group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded-lg p-1 shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border-2 border-sand-300 shadow-warm-xs group-hover:border-terracotta-500 transition-colors shrink-0 p-1 overflow-hidden">
            <img src={kamaiLogo} alt="KAMAI" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-deepgreen-900 font-hindi">
                {t.appTitle}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-sand-200 text-deepgreen-800">
                Direct Work
              </span>
            </div>
            <p className="hidden xs:block text-[11px] text-nearblack-subtle font-medium truncate max-w-[150px] sm:max-w-none">
              {currentLanguage === 'hi' 
                ? 'सीधा काम • तय दिहाड़ी' 
                : currentLanguage === 'mr' 
                ? 'थेट काम • ठरलेली मजुरी' 
                : 'Direct & Dignified Discovery'}
            </p>
          </div>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Pehchaan Card Button */}
          <button
            type="button"
            onClick={onNavigateToCard}
            aria-label={t.myKaamCard}
            title={t.myKaamCard}
            className="touch-target p-2 rounded-lg bg-sand-200/90 hover:bg-sand-300 text-deepgreen-900 border border-sand-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            {workerProfile ? (
              <>
                <Contact2 className="w-4 h-4 text-terracotta-600" />
                <span className="hidden md:inline">{t.myKaamCard}</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 text-terracotta-600" />
                <span className="hidden md:inline">{t.myKaamCard}</span>
              </>
            )}
          </button>

          {/* User Info Badge (when signed in) */}
          {authUser && (
            <div className="hidden xs:flex items-center gap-1.5 bg-sand-100 border border-sand-300 rounded-lg px-2 py-1.5 text-xs font-bold text-deepgreen-900">
              <UserCheck className="w-3.5 h-3.5 text-deepgreen-800" />
              <span className="max-w-[100px] truncate">
                {authUser.name || authUser.phone.slice(-4)}
              </span>
            </div>
          )}

          {/* Voice Assist (बोलकर खोजें) Button */}
          <button
            type="button"
            onClick={onOpenVoiceAssist}
            title={currentLanguage === 'hi' ? 'बोलकर खोजें (Voice Assist)' : currentLanguage === 'mr' ? 'बोलून शोधा (Voice Assist)' : 'Voice Assist'}
            aria-label="Voice Assist"
            className="touch-target px-2.5 py-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-deepgreen-900 border border-sand-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <Mic className="w-4 h-4 text-terracotta-600 animate-pulse" />
            <span className="hidden sm:inline font-hindi">
              {currentLanguage === 'hi' ? 'बोलकर खोजें' : currentLanguage === 'mr' ? 'बोलून शोधा' : 'Voice'}
            </span>
          </button>

          {/* Language Switcher Button */}
          <button
            type="button"
            onClick={onOpenLanguageModal}
            className="touch-target px-2.5 py-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-nearblack border border-sand-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
            aria-label="Change language"
          >
            <Languages className="w-4 h-4 text-deepgreen-800" />
            <span>{getLangBadge()}</span>
          </button>

          {/* Log Out Button (on the RIGHT of Language selection) */}
          {authUser ? (
            <button
              type="button"
              onClick={onLogout}
              title={t.signOut}
              aria-label={t.signOut}
              className="touch-target px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
              <span className="font-hindi">{currentLanguage === 'hi' ? 'लॉगआउट' : currentLanguage === 'mr' ? 'लॉगआउट' : 'Log Out'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="touch-target px-2.5 py-1.5 rounded-lg bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 transition-colors flex items-center gap-1.5 text-xs font-bold shadow-xs"
              aria-label={t.signIn}
            >
              <LogIn className="w-3.5 h-3.5 text-sand-300" />
              <span>{t.signIn}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
