import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2, Ticket, Users, Clock } from 'lucide-react';
import { Language } from '../types';

interface HomePromoBannersProps {
  onOpenPehlePakka: () => void;
  onExploreWork: () => void;
  currentLanguage: Language;
}

export const HomePromoBanners: React.FC<HomePromoBannersProps> = ({
  onOpenPehlePakka,
  onExploreWork,
  currentLanguage,
}) => {
  return (
    <div className="space-y-3.5 sm:space-y-4">
      {/* 1. SLIM STRIP (Introducing favorite style from reference) */}
      <button
        type="button"
        onClick={onOpenPehlePakka}
        className="w-full p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-sand-200 via-sand-100 to-ivory-50 border border-sand-300 hover:border-sand-400 shadow-warm-xs hover:shadow-warm transition-all flex items-center justify-between gap-3 text-left touch-target group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-sand-300 text-navy-900 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-navy-800" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-xs sm:text-sm text-navy-900 font-hindi">
                {currentLanguage === 'hi' ? 'पहले पक्का गारंटी' : currentLanguage === 'mr' ? 'आधी पक्के हमी' : 'Pehle Pakka Guarantee'}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sand-300 text-navy-900">
                {currentLanguage === 'hi' ? 'शर्तें तय' : currentLanguage === 'mr' ? 'अटी ठरवा' : 'Locked Terms'}
              </span>
            </div>
            <p className="text-[11px] text-nearblack-subtle truncate mt-0.5">
              {currentLanguage === 'hi'
                ? 'काम शुरू करने से पहले पक्की मजदूरी और समय लॉक करें'
                : currentLanguage === 'mr'
                ? 'कामाआधी पक्की मजुरी आणि वेळ ठरवा'
                : 'Lock agreed wage & hours before starting work'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex -space-x-1.5 overflow-hidden hidden sm:flex">
            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-sand-300 flex items-center justify-center text-[10px] font-bold text-navy-900">
              👤
            </div>
            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-sand-400 flex items-center justify-center text-[10px] font-bold text-navy-900">
              🛠️
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-navy-800 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      {/* 2. PROMO / DAILY WAGE VOUCHER CARD (Get 2 visits at ₹125 style from reference) */}
      <div className="rounded-3xl bg-gradient-to-r from-ivory-50 via-sand-100 to-sand-200/90 border border-sand-300 p-4 sm:p-5 shadow-warm-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-sm">
          {/* Pill Badge with Clock */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sand-200 text-navy-900 border border-sand-300 text-[10px] font-bold">
            <Clock className="w-3 h-3 text-navy-800" />
            <span>{currentLanguage === 'hi' ? 'दैनिक दिहाड़ी सुरक्षा' : currentLanguage === 'mr' ? 'दैनिक मजुरी सुरक्षा' : 'Daily Wage Security'}</span>
          </div>

          <h3 className="text-base sm:text-xl font-black text-navy-900 font-hindi leading-snug">
            {currentLanguage === 'hi' ? '100% तय दिहाड़ी • 0% कमीशन' : currentLanguage === 'mr' ? '१००% ठरलेली मजुरी • ०% कमिशन' : '100% Fair Wage • 0% Commission'}
          </h3>

          <p className="text-xs text-nearblack-subtle leading-relaxed">
            {currentLanguage === 'hi'
              ? 'शाम को नकद भुगतान, सीधा मालिक से संपर्क, बिना किसी दलाल के।'
              : currentLanguage === 'mr'
              ? 'संध्याकाळी रोख पेमेंट, थेट मालकाशी संपर्क, दलालांशिवाय.'
              : 'Direct calling with contractors. Cash payment at evening without cuts.'}
          </p>
        </div>

        {/* Voucher Pass Graphics (like the habit pack ticket in reference) */}
        <button
          type="button"
          onClick={onExploreWork}
          className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-navy-800 hover:bg-navy-900 text-ivory-50 text-xs font-bold shadow-warm flex items-center justify-center gap-2 group transition-all shrink-0 touch-target"
        >
          <Ticket className="w-4 h-4 text-sand-300" />
          <span>{currentLanguage === 'hi' ? 'आज का काम देखें' : currentLanguage === 'mr' ? 'आजचे काम पहा' : 'View Today’s Work'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-sand-300 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
