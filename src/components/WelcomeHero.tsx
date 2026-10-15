import React from 'react';
import {
  Briefcase,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language, WorkerProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';

interface WelcomeHeroProps {
  currentLanguage: Language;
  onFindWork: () => void;
  onHireSomeone: () => void;
  onOpenLanguageModal: () => void;
  workerProfile: WorkerProfile | null;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  currentLanguage,
  onFindWork,
  onHireSomeone,
  onOpenLanguageModal,
  workerProfile,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const getHeroAudioText = (): string => {
    if (currentLanguage === 'hi') {
      return 'कमाई (KAMAI) में आपका स्वागत है। यहां कुशल कारीगरों और मजदूरों को सीधा काम और तय दिहाड़ी मिलती है। न कोई बायोडाटा, न कोई दलाल। अगर काम चाहिए तो काम खोजें बटन दबाएं। अगर कारीगर बुलाना है तो कारीगर चाहिए बटन दबाएं।';
    } else if (currentLanguage === 'mr') {
      return 'कमाई (KAMAI) मध्ये आपले स्वागत आहे. येथे कुशल कारागीर आणि मजुरांना थेट काम आणि ठरलेली मजुरी मिळते. ना बायोडाटा, ना दलाल. काम शोधण्यासाठी काम शोधा बटण दाबा.';
    } else {
      return 'Welcome to KAMAI. Direct and dignified work discovery for skilled trades and daily wage workers. Zero commission, no resume required.';
    }
  };

  return (
    <section className="bg-gradient-to-b from-sand-100/90 to-ivory-100 border border-sand-300 rounded-2xl p-5 sm:p-7 shadow-warm space-y-5">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sand-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-terracotta-500 text-ivory-50 shadow-warm-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KAMAI • कमाई</span>
          </span>
          <span className="text-xs font-semibold text-deepgreen-900 bg-sand-200 px-2 py-0.5 rounded">
            Mumbai Urban Naka Work
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Audio helper for low literacy */}
          <SunkeSamjhoButton
            textToSpeak={getHeroAudioText()}
            lang={currentLanguage}
          />

          {/* Language selector button */}
          <button
            type="button"
            onClick={onOpenLanguageModal}
            className="touch-target text-xs font-bold px-3 py-1.5 rounded-lg bg-ivory-50 border border-sand-300 hover:bg-sand-100 text-nearblack flex items-center gap-1.5"
          >
            <span>{currentLanguage === 'hi' ? 'भाषा: हिन्दी' : currentLanguage === 'mr' ? 'भाषा: मराठी' : 'Language: EN'}</span>
            <span className="text-terracotta-600 underline">Change</span>
          </button>
        </div>
      </div>

      {/* Main Editorial Headline */}
      <div className="space-y-2 max-w-2xl">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-deepgreen-900 tracking-tight font-hindi leading-tight">
          {currentLanguage === 'hi'
            ? 'सीधा काम, तय दिहाड़ी — बिना किसी दलाल के'
            : currentLanguage === 'mr'
            ? 'थेट काम, ठरलेली मजुरी — दलालांशिवाय'
            : 'Direct Work, Fair Daily Wages'}
        </h1>
        <p className="text-sm sm:text-base text-nearblack leading-relaxed">
          {t.tagline}
        </p>
      </div>



      {/* TWO PROMINENT DIRECT PATHWAYS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Pathway 1: Find Work Today (Worker Entry) */}
        <button
          type="button"
          onClick={onFindWork}
          className="text-left p-5 rounded-xl border-2 border-deepgreen-800 bg-deepgreen-800 text-ivory-50 shadow-warm-md hover:bg-deepgreen-900 transition-all flex flex-col justify-between group touch-target"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-sand-300 text-deepgreen-900 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-ivory-50">
                {t.todayJobs}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-ivory-50 tracking-tight font-hindi">
              {t.findWork}
            </h3>
            <p className="text-xs text-sand-200 mt-1 leading-relaxed">
              {t.workerSubtitle}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-deepgreen-700/60 flex items-center justify-between text-xs font-bold text-sand-300 group-hover:text-ivory-50">
            <span>{currentLanguage === 'hi' ? 'हुनर चुनें व काम देखें' : currentLanguage === 'mr' ? 'कौशल्य निवडून काम पहा' : 'Choose Trade & Browse Jobs'}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Pathway 2: Hire a Worker (Employer Entry) */}
        <button
          type="button"
          onClick={onHireSomeone}
          className="text-left p-5 rounded-xl border-2 border-sand-400 bg-ivory-50 text-nearblack shadow-warm hover:border-terracotta-500 hover:bg-terracotta-50/40 transition-all flex flex-col justify-between group touch-target"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-sand-200 text-terracotta-600 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sand-200 text-deepgreen-900">
                {t.noMiddleman}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-deepgreen-900 tracking-tight font-hindi">
              {t.hireSomeone}
            </h3>
            <p className="text-xs text-nearblack-muted mt-1 leading-relaxed">
              {t.hireSubtitle}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-sand-300 flex items-center justify-between text-xs font-bold text-terracotta-600 group-hover:text-terracotta-700">
            <span>{t.postJobCTA}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Value Pillars */}
      <div className="pt-2 grid grid-cols-3 gap-2 border-t border-sand-200 text-center text-xs">
        <div className="p-2">
          <span className="font-extrabold text-terracotta-600 block text-base sm:text-lg">0%</span>
          <span className="text-[11px] text-nearblack-muted leading-tight block">
            {currentLanguage === 'hi' ? 'कोई कमीशन नहीं' : currentLanguage === 'mr' ? 'कमिशन नाही' : 'Zero Commission'}
          </span>
        </div>

        <div className="p-2 border-x border-sand-200">
          <span className="font-extrabold text-deepgreen-900 block text-base sm:text-lg">
            {currentLanguage === 'hi' ? 'नकद' : currentLanguage === 'mr' ? 'रोख' : 'Direct'}
          </span>
          <span className="text-[11px] text-nearblack-muted leading-tight block">
            {currentLanguage === 'hi' ? 'हाथों-हाथ शाम को' : currentLanguage === 'mr' ? 'संध्याकाळी पेमेंट' : 'Cash at evening'}
          </span>
        </div>

        <div className="p-2">
          <span className="font-extrabold text-deepgreen-900 block text-base sm:text-lg">
            {currentLanguage === 'hi' ? 'पहले पक्का' : currentLanguage === 'mr' ? 'आधी पक्के' : 'Protected'}
          </span>
          <span className="text-[11px] text-nearblack-muted leading-tight block">
            {currentLanguage === 'hi' ? 'शर्तें पहले तय' : currentLanguage === 'mr' ? 'अटी आधी ठरवा' : 'Locked Terms'}
          </span>
        </div>
      </div>
    </section>
  );
};
