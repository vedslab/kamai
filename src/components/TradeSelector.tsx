import React from 'react';
import { TRADES } from '../data/trades';
import { Trade, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TradeIcon } from './TradeIcon';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';

interface TradeSelectorProps {
  selectedTradeId: string | null;
  onSelectTrade: (tradeId: string | null) => void;
  currentLanguage: Language;
  onViewJobsForTrade?: (tradeId: string) => void;
  onBackToHome?: () => void;
}

export const TradeSelector: React.FC<TradeSelectorProps> = ({
  selectedTradeId,
  onSelectTrade,
  currentLanguage,
  onViewJobsForTrade,
  onBackToHome,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const getTradeSpeechText = (trade: Trade): string => {
    const tradeName = trade.name[currentLanguage] || trade.name.en;
    const rateText = currentLanguage === 'hi'
      ? `औसत दिहाड़ी: ${trade.avgDailyRate.min} से ${trade.avgDailyRate.max} रुपये प्रतिदिन।`
      : currentLanguage === 'mr'
      ? `सरासरी रोजंदारी: ${trade.avgDailyRate.min} ते ${trade.avgDailyRate.max} रुपये प्रति दिवस.`
      : `Typical daily wage: ₹${trade.avgDailyRate.min} to ₹${trade.avgDailyRate.max} per day.`;

    const subText = trade.subtitle[currentLanguage] || trade.subtitle.en;
    return `${tradeName}। ${subText}। ${rateText}`;
  };

  const handleCardClick = (tradeId: string) => {
    onSelectTrade(tradeId);
    if (onViewJobsForTrade) {
      onViewJobsForTrade(tradeId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Step Indicator & Back Navigation */}
      <div className="flex items-center justify-between">
        {onBackToHome && (
          <button
            type="button"
            onClick={onBackToHome}
            className="touch-target text-xs font-bold text-deepgreen-900 hover:text-terracotta-600 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToHome}</span>
          </button>
        )}
        <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-sand-200 text-deepgreen-900 ml-auto">
          Step 1 of 5: {t.step1}
        </span>
      </div>

      {/* Header and Filter Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-deepgreen-900 tracking-tight font-hindi">
            {t.chooseTrade}
          </h2>
          <p className="text-xs sm:text-sm text-nearblack-muted">
            {currentLanguage === 'hi' 
              ? 'अपना काम चुनें — चुनते ही उस हुनर के सभी उपलब्ध काम खुल जाएंगे'
              : currentLanguage === 'mr'
              ? 'आपले काम निवडा — निवडताच त्या कामाच्या सर्व उपलब्ध नोंदी उघडतील'
              : 'Select your trade to instantly view matching Mumbai naka opportunities'}
          </p>
        </div>

        {selectedTradeId && (
          <button
            type="button"
            onClick={() => onSelectTrade(null)}
            className="touch-target self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-lg bg-sand-200 text-deepgreen-900 hover:bg-sand-300 transition-colors"
          >
            {t.allTrades} (✕)
          </button>
        )}
      </div>

      {/* Grid of Large Visual Trade Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {TRADES.map((trade) => {
          const isSelected = selectedTradeId === trade.id;
          const speechText = getTradeSpeechText(trade);

          return (
            <div
              key={trade.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`${trade.name[currentLanguage] || trade.name.en}, ₹${trade.avgDailyRate.min}–₹${trade.avgDailyRate.max} ${t.wagePerDay}`}
              onClick={() => handleCardClick(trade.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(trade.id);
                }
              }}
              className={`relative rounded-xl border p-4 transition-all cursor-pointer flex flex-col justify-between focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-terracotta-500 ${
                isSelected
                  ? 'border-terracotta-500 bg-terracotta-50/60 shadow-warm ring-2 ring-terracotta-500/80'
                  : 'border-sand-300 bg-ivory-50/90 hover:bg-sand-100 hover:border-sand-400 shadow-warm-sm'
              }`}
            >
              <div>
                {/* Top Row: Icon + Sunke Samjho + Selection Check */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    isSelected
                      ? 'bg-terracotta-500 text-ivory-50 border-terracotta-600'
                      : 'bg-sand-200 text-deepgreen-900 border-sand-300'
                  }`}>
                    <TradeIcon iconName={trade.iconName} className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <SunkeSamjhoButton
                      textToSpeak={speechText}
                      lang={currentLanguage}
                      compact
                    />
                    {isSelected && (
                      <div className="w-7 h-7 rounded-full bg-terracotta-500 text-ivory-50 flex items-center justify-center" aria-hidden="true">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Trade Name */}
                <h3 className="text-base sm:text-lg font-bold text-deepgreen-900 leading-snug">
                  {trade.name[currentLanguage] || trade.name.en}
                </h3>

                {/* Subtitle / Common tasks */}
                <p className="text-xs text-nearblack-muted mt-1 leading-relaxed line-clamp-2">
                  {trade.subtitle[currentLanguage] || trade.subtitle.en}
                </p>
              </div>

              {/* Bottom Row: Wage Range & View Jobs CTA */}
              <div className="mt-4 pt-3 border-t border-sand-300/70 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-nearblack-subtle block">
                    {t.dailyRate}
                  </span>
                  <span className="text-sm font-extrabold text-terracotta-700">
                    ₹{trade.avgDailyRate.min} – ₹{trade.avgDailyRate.max}
                    <span className="text-[11px] font-medium text-nearblack-muted ml-0.5">
                      {t.wagePerDay}
                    </span>
                  </span>
                </div>

                <span className="touch-target px-3 py-1.5 rounded-lg bg-deepgreen-800 text-ivory-50 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                  <span>{t.exploreJobs}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
