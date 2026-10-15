import React, { useState } from 'react';
import {
  BookOpen,
  PhoneCall,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Scale,
  ShieldCheck,
  FileText,
  Phone
} from 'lucide-react';
import { WELFARE_RESOURCES } from '../data/welfareData';
import { Language, WelfareResource } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';

interface WelfareSectionProps {
  currentLanguage: Language;
}

export const WelfareSection: React.FC<WelfareSectionProps> = ({ currentLanguage }) => {
  const t = TRANSLATIONS[currentLanguage];
  const [activeCategory, setActiveCategory] = useState<'all' | 'rights' | 'safety' | 'schemes' | 'helplines'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(WELFARE_RESOURCES[0].id);

  const filteredResources = WELFARE_RESOURCES.filter(
    (res) => activeCategory === 'all' || res.category === activeCategory
  );

  const getResourceSpeech = (res: WelfareResource): string => {
    const title = res.title[currentLanguage] || res.title.en;
    const summary = res.summary[currentLanguage] || res.summary.en;
    const points = (res.keyDetails[currentLanguage] || res.keyDetails.en).join('। ');
    return `${title}। ${summary}। मुख्य कदम: ${points}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rights':
        return <Scale className="w-4 h-4 text-terracotta-500" />;
      case 'safety':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'schemes':
        return <FileText className="w-4 h-4 text-deepgreen-800" />;
      default:
        return <Phone className="w-4 h-4 text-terracotta-500" />;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-deepgreen-900 font-hindi flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-terracotta-500" />
          <span>{t.welfareTitle}</span>
        </h2>
        <p className="text-xs sm:text-sm text-nearblack-muted">
          {t.welfareSubtitle}
        </p>
      </div>

      {/* Prominent Global Illustrative Guidance Alert Banner */}
      <div className="p-4 rounded-xl bg-sand-200/60 border border-sand-400 text-nearblack text-xs space-y-1 shadow-warm-sm">
        <div className="flex items-center gap-2 font-bold text-deepgreen-900">
          <AlertTriangle className="w-4 h-4 text-terracotta-600 shrink-0" />
          <span>{currentLanguage === 'hi' ? 'महत्वपूर्ण सूचना व सावधानी' : currentLanguage === 'mr' ? 'महत्त्वाची सूचना' : 'Official Notice & Educational Guidance'}</span>
        </div>
        <p className="text-[11px] text-nearblack-muted leading-relaxed">
          {t.illustrativeNotice}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { key: 'all', label: currentLanguage === 'hi' ? 'सभी' : currentLanguage === 'mr' ? 'सर्व' : 'All Topics' },
          { key: 'rights', label: t.categoryDisputes },
          { key: 'safety', label: t.categorySafety },
          { key: 'schemes', label: t.categoryRegistration },
          { key: 'helplines', label: t.categoryWelfare },
        ].map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key as any)}
            className={`touch-target px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              activeCategory === cat.key
                ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900 shadow-warm-sm'
                : 'bg-sand-100 text-nearblack-muted border-sand-300 hover:bg-sand-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion / Support Cards */}
      <div className="space-y-3.5">
        {filteredResources.map((res) => {
          const isExpanded = expandedId === res.id;
          const speechText = getResourceSpeech(res);

          return (
            <div
              key={res.id}
              className="bg-ivory-50 rounded-xl border border-sand-300 overflow-hidden shadow-warm-sm transition-all"
            >
              {/* Card Header (Accessible Accordion Trigger) */}
              <div className="flex items-center justify-between p-4 sm:p-5 bg-sand-50/60 hover:bg-sand-100/80 transition-colors">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : res.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`welfare-details-${res.id}`}
                  className="flex-1 text-left flex items-start justify-between gap-3 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded-lg"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      {getCategoryIcon(res.category)}
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sand-200 text-deepgreen-800">
                        {res.category.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-deepgreen-900 font-hindi">
                      {res.title[currentLanguage] || res.title.en}
                    </h3>
                    <p className="text-xs text-nearblack-muted line-clamp-1">
                      {res.summary[currentLanguage] || res.summary.en}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-1.5 shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                  <SunkeSamjhoButton
                    textToSpeak={speechText}
                    lang={currentLanguage}
                    compact
                  />
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : res.id)}
                    aria-label={isExpanded ? 'Collapse topic' : 'Expand topic'}
                    className="touch-target p-1 text-nearblack-subtle hover:text-nearblack rounded-lg"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div id={`welfare-details-${res.id}`} className="p-4 sm:p-5 border-t border-sand-200 space-y-4 animate-in fade-in">
                  <p className="text-xs sm:text-sm text-nearblack font-medium leading-relaxed bg-sand-100/60 p-3.5 rounded-lg border border-sand-200">
                    {res.summary[currentLanguage] || res.summary.en}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-deepgreen-900 block">
                      {currentLanguage === 'hi' ? 'ज़रूरी नियम व व्यावहारिक कदम' : currentLanguage === 'mr' ? 'महत्त्वाचे नियम व कृती' : 'Actionable Guidance Steps'}
                    </span>
                    <ul className="text-xs text-nearblack space-y-2 pl-4 list-disc">
                      {(res.keyDetails[currentLanguage] || res.keyDetails.en).map((detail, idx) => (
                        <li key={idx} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Cautious Note */}
                  <div className="p-3.5 rounded-lg bg-sand-200/50 border border-sand-300 text-[11px] text-nearblack-muted flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-terracotta-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{res.cautiousNote[currentLanguage] || res.cautiousNote.en}</span>
                  </div>

                  {/* Official Action / Call CTA */}
                  {res.contactOrLink && (
                    <div className="pt-2 flex items-center gap-2">
                      {res.isPhoneNumber ? (
                        <a
                          href={`tel:${res.contactOrLink}`}
                          className="touch-target-primary px-4 py-2.5 rounded-lg bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 text-xs font-bold flex items-center gap-2 shadow-warm-sm transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500"
                        >
                          <PhoneCall className="w-4 h-4 text-sand-300" />
                          <span>
                            {currentLanguage === 'hi' 
                              ? `हेल्पलाइन पर कॉल करें (${res.contactOrLink})` 
                              : currentLanguage === 'mr'
                              ? `हेल्पलाईनवर कॉल करा (${res.contactOrLink})`
                              : `Call Official Helpline (${res.contactOrLink})`}
                          </span>
                        </a>
                      ) : (
                        <a
                          href={res.contactOrLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target-primary px-4 py-2.5 rounded-lg bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 text-xs font-bold flex items-center gap-2 shadow-warm-sm transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500"
                        >
                          <ExternalLink className="w-4 h-4 text-sand-300" />
                          <span>
                            {currentLanguage === 'hi' 
                              ? 'आधिकारिक पोर्टल खोलें (eshram.gov.in)' 
                              : currentLanguage === 'mr'
                              ? 'अधिकृत पोर्टल उघडा (eshram.gov.in)'
                              : 'Open Official Portal (eshram.gov.in)'}
                          </span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
