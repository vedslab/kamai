import React from 'react';
import { Briefcase, Contact2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface HomeQuickCardsProps {
  jobCount: number;
  onExploreClick: () => void;
  onNavigateToCard: () => void;
  currentLanguage: Language;
}

export const HomeQuickCards: React.FC<HomeQuickCardsProps> = ({
  jobCount,
  onExploreClick,
  onNavigateToCard,
  currentLanguage,
}) => {
  return (
    /* TWO HALF-SIDE CARDS: EXPLORE WORK (LEFT) & PEHCHAAN CARD (RIGHT) */
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {/* LEFT HALF SIDE CARD: EXPLORE WORK */}
      <button
        type="button"
        onClick={onExploreClick}
        className="p-4 sm:p-5 rounded-2xl bg-ivory-50 border-2 border-sand-300 hover:border-terracotta-500 shadow-warm-xs hover:shadow-warm text-left flex flex-col justify-between gap-3 group transition-all touch-target"
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-terracotta-500/15 border border-terracotta-300 text-terracotta-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5 text-terracotta-600" />
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sand-200 text-deepgreen-900 border border-sand-300">
            {jobCount} {currentLanguage === 'hi' ? 'कामे' : currentLanguage === 'mr' ? 'कामे' : 'Jobs'}
          </span>
        </div>

        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-deepgreen-900 group-hover:text-terracotta-700 flex items-center gap-1 transition-colors font-hindi">
            <span>{currentLanguage === 'hi' ? 'काम खोजें' : currentLanguage === 'mr' ? 'काम शोधा' : 'Explore Work'}</span>
            <ArrowRight className="w-4 h-4 text-terracotta-500 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-[11px] text-nearblack-subtle mt-0.5">
            {currentLanguage === 'hi' ? 'तय दिहाड़ी व सीधा संपर्क' : currentLanguage === 'mr' ? 'ठरलेली मजुरी आणि थेट संपर्क' : 'Fair daily wages & instant hiring'}
          </p>
        </div>
      </button>

      {/* RIGHT HALF SIDE CARD: PEHCHAAN CARD (Replaced hiring card) */}
      <button
        type="button"
        onClick={onNavigateToCard}
        className="p-4 sm:p-5 rounded-2xl bg-ivory-50 border-2 border-sand-300 hover:border-deepgreen-700 shadow-warm-xs hover:shadow-warm text-left flex flex-col justify-between gap-3 group transition-all touch-target"
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-deepgreen-800/10 border border-deepgreen-300 text-deepgreen-800 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Contact2 className="w-5 h-5 text-deepgreen-800" />
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-deepgreen-800 text-ivory-50 shadow-xs flex items-center gap-1">
            <span>{currentLanguage === 'hi' ? 'मुफ्त कार्ड' : currentLanguage === 'mr' ? 'मोफत कार्ड' : 'Free Card'}</span>
          </span>
        </div>

        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-deepgreen-900 group-hover:text-deepgreen-800 flex items-center gap-1 transition-colors font-hindi">
            <span>{currentLanguage === 'hi' ? 'पहचान कार्ड' : currentLanguage === 'mr' ? 'ओळख पत्र' : 'Pehchaan Card'}</span>
            <ArrowRight className="w-4 h-4 text-deepgreen-700 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-[11px] text-nearblack-subtle mt-0.5">
            {currentLanguage === 'hi' ? 'बिना कागजात डिजिटल पहचान' : currentLanguage === 'mr' ? 'कागदपत्रांशिवाय डिजिटल ओळख' : 'Digital skill identity without documents'}
          </p>
        </div>
      </button>
    </div>
  );
};
