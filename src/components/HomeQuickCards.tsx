import React from 'react';
import { Briefcase, Contact2, ArrowRight, Clock, Star, ShieldCheck, Sparkles, Zap } from 'lucide-react';
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
    /* DUAL QUICK ACTION CARDS (Schedule & Instant style from design reference) */
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {/* LEFT CARD: EXPLORE WORK (Schedule / Pick Your Time Style) */}
      <button
        type="button"
        onClick={onExploreClick}
        className="p-4 sm:p-5 rounded-3xl bg-white border border-sand-300 hover:border-navy-700 shadow-warm-xs hover:shadow-warm text-left flex flex-col justify-between gap-3 sm:gap-4 group transition-all touch-target"
      >
        <div className="flex items-start justify-between gap-2">
          {/* Pastel Rounded Icon Box (like pink clock box in reference) */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sand-200/90 text-navy-900 border border-sand-300 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-navy-800" />
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sand-100 text-navy-900 border border-sand-300">
            {jobCount} {currentLanguage === 'hi' ? 'कामे' : currentLanguage === 'mr' ? 'कामे' : 'Jobs'}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-extrabold text-base sm:text-lg text-navy-900 group-hover:text-navy-700 font-hindi leading-snug">
              {currentLanguage === 'hi' ? 'काम खोजें' : currentLanguage === 'mr' ? 'काम शोधा' : 'Explore Work'}
            </h3>
            <ArrowRight className="w-4 h-4 text-navy-800 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-nearblack-subtle mt-0.5">
            {currentLanguage === 'hi' ? 'समय चुनें • तय दिहाड़ी' : currentLanguage === 'mr' ? 'वेळ निवडा • ठरलेली मजुरी' : 'Pick your time & trade'}
          </p>
        </div>
      </button>

      {/* RIGHT CARD: PEHCHAAN CARD (Instant / Get Now Style with 2min badge) */}
      <button
        type="button"
        onClick={onNavigateToCard}
        className="p-4 sm:p-5 rounded-3xl bg-white border border-sand-300 hover:border-navy-700 shadow-warm-xs hover:shadow-warm text-left flex flex-col justify-between gap-3 sm:gap-4 group transition-all touch-target relative overflow-hidden"
      >
        <div className="flex items-start justify-between gap-2">
          {/* Pill Badge (like 2 min ⚡ badge in reference) */}
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-sand-200 text-navy-900 border border-sand-400 shadow-xs">
            <Zap className="w-3 h-3 text-sand-700 fill-sand-600" />
            <span>{currentLanguage === 'hi' ? 'तुरंत कार्ड' : currentLanguage === 'mr' ? 'त्वरित कार्ड' : 'Instant Card'}</span>
          </span>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
            <span>4.9</span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-extrabold text-base sm:text-lg text-navy-900 group-hover:text-navy-700 font-hindi leading-snug">
              {currentLanguage === 'hi' ? 'पहचान कार्ड' : currentLanguage === 'mr' ? 'ओळखपत्र' : 'Pehchaan Card'}
            </h3>
            <ArrowRight className="w-4 h-4 text-navy-800 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-nearblack-subtle mt-0.5">
            {currentLanguage === 'hi' ? 'डिजिटल पहचान • बिना कागजात' : currentLanguage === 'mr' ? 'कागदपत्रांशिवाय डिजिटल ओळख' : 'Digital skill card in 1 click'}
          </p>
        </div>
      </button>
    </div>
  );
};
