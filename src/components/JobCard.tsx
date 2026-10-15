import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Utensils,
  Hammer,
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';
import { Job, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';

interface JobCardProps {
  job: Job;
  currentLanguage: Language;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onOpenPehlePakka: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  currentLanguage,
  isSaved,
  onToggleSave,
  onSelectJob,
  onOpenPehlePakka,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const getPaymentTimingText = () => {
    switch (job.paymentTiming) {
      case 'cash_at_evening':
        return t.cashEvening;
      case 'upi_at_evening':
        return t.upiEvening;
      case 'half_advance_half_end':
        return t.halfAdvance;
      case 'immediate_task_end':
        return t.immediateEnd;
      case 'weekly_saturday':
        return t.weeklySaturday;
      default:
        return t.cashEvening;
    }
  };

  const getWageUnitText = () => {
    switch (job.wageType) {
      case 'per_day':
        return t.perDay;
      case 'fixed_task':
        return t.fixedTask;
      case 'per_hour':
        return t.perHour;
      default:
        return t.perDay;
    }
  };

  const getToolsLabel = () => {
    switch (job.toolsSuppliedBy) {
      case 'employer':
        return t.toolsByEmployer;
      case 'worker':
        return t.toolsByWorker;
      case 'mutual':
        return t.toolsMutual;
      default:
        return t.toolsByEmployer;
    }
  };

  const getSpeechSummary = (): string => {
    const title = job.title[currentLanguage] || job.title.en;
    const wageStr = currentLanguage === 'hi' 
      ? `मजदूरी: ${job.wageAmount} रुपये ${getWageUnitText()}।`
      : currentLanguage === 'mr'
      ? `मजुरी: ${job.wageAmount} रुपये ${getWageUnitText()}.`
      : `Wage: ₹${job.wageAmount} ${getWageUnitText()}.`;
    const locStr = currentLanguage === 'hi'
      ? `स्थान: ${job.nakaPoint}, ${job.areaName}।`
      : currentLanguage === 'mr'
      ? `ठिकाण: ${job.nakaPoint}, ${job.areaName}.`
      : `Location: ${job.nakaPoint}, ${job.areaName}.`;
    const payStr = currentLanguage === 'hi'
      ? `भुगतान: ${getPaymentTimingText()}।`
      : currentLanguage === 'mr'
      ? `पेमेंट: ${getPaymentTimingText()}.`
      : `Payment: ${getPaymentTimingText()}.`;

    return `${title}। ${wageStr} ${locStr} ${payStr}`;
  };

  return (
    <article
      tabIndex={0}
      role="article"
      aria-label={`${job.title[currentLanguage] || job.title.en}, ₹${job.wageAmount} ${getWageUnitText()}`}
      onClick={() => onSelectJob(job)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelectJob(job);
      }}
      className="bg-ivory-50 rounded-xl border border-sand-300 p-4 sm:p-5 shadow-warm-sm hover:shadow-warm hover:border-sand-400 transition-all cursor-pointer relative flex flex-col justify-between focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-terracotta-500"
    >
      <div>
        {/* Top Tag Row: Demo listing flag + Date badge + Sunke Samjho + Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Demo Listing Badge or Newly Posted Badge - Explicitly Marked */}
            {job.isCustomEmployerJob ? (
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-terracotta-500 text-ivory-50 border border-terracotta-600 flex items-center gap-1 shadow-warm-xs">
                <Sparkles className="w-3 h-3 text-sand-300" />
                <span>{t.newJobBadge}</span>
              </span>
            ) : (
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-sand-200 text-deepgreen-900 border border-sand-300">
                {t.demoListingTag}
              </span>
            )}

            {/* Date Tag */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold ${
              job.dateCategory === 'today'
                ? 'bg-terracotta-50 text-terracotta-700 border border-terracotta-500/30'
                : 'bg-sand-100 text-deepgreen-900 border border-sand-300'
            }`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{job.dateCategory === 'today' ? t.todayJobs : job.jobDate}</span>
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            <SunkeSamjhoButton
              textToSpeak={getSpeechSummary()}
              lang={currentLanguage}
              compact
            />

            <button
              type="button"
              onClick={() => onToggleSave(job.id)}
              aria-label={isSaved ? 'Remove saved job' : 'Save job'}
              className={`touch-target p-2 rounded-lg border transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500 ${
                isSaved
                  ? 'bg-sand-300 text-terracotta-700 border-sand-400'
                  : 'bg-sand-100 hover:bg-sand-200 text-nearblack-subtle border-sand-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-deepgreen-900 leading-snug tracking-tight font-hindi">
          {job.title[currentLanguage] || job.title.en}
        </h3>

        {/* Locality & Naka */}
        <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-nearblack-muted">
          <div className="flex items-center gap-1 text-deepgreen-800 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
            <span>{job.nakaPoint}</span>
            <span className="text-nearblack-subtle">({job.areaName})</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-nearblack-subtle shrink-0" />
            <span>{job.durationText[currentLanguage] || job.durationText.en}</span>
          </div>
        </div>

        {/* Plain Language Work Description */}
        <p className="mt-2 text-xs sm:text-sm text-nearblack leading-relaxed line-clamp-2">
          {job.description[currentLanguage] || job.description.en}
        </p>

        {/* Work Terms Chips: Payment Timing + Tools + Completeness (Unclipped) */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap text-[11px]">
          {/* Payment Timing Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-deepgreen-50 text-deepgreen-900 border border-deepgreen-700/20 font-medium">
            <CheckCircle2 className="w-3 h-3 text-deepgreen-800 shrink-0" />
            <span>{getPaymentTimingText()}</span>
          </span>

          {/* Tools Provided or Required */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sand-100 text-nearblack border border-sand-200 font-medium">
            <Hammer className="w-3 h-3 text-terracotta-500 shrink-0" />
            <span>{getToolsLabel()}</span>
          </span>

          {job.chaiLunchProvided && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sand-100 text-deepgreen-900 border border-sand-200 font-medium">
              <Utensils className="w-3 h-3 text-terracotta-500" />
              <span>{t.lunchTeaIncluded}</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Large Dignified Wage with Clear Unit + Direct CTAs */}
      <div className="mt-4 pt-3 border-t border-sand-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Prominent Wage Box */}
        <div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-nearblack-subtle block">
            {currentLanguage === 'hi' ? 'तय भुगतान' : currentLanguage === 'mr' ? 'ठरलेली मजुरी' : 'Pay Amount & Unit'}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-terracotta-600 tracking-tight">
              ₹{job.wageAmount}
            </span>
            {/* UNAMBIGUOUS UNIT LABEL */}
            <span className="text-xs font-bold text-deepgreen-900 px-1.5 py-0.5 rounded bg-sand-200">
              {getWageUnitText()}
            </span>
          </div>
          <span className="text-[11px] text-nearblack-subtle block">
            {job.employerName}
          </span>
        </div>

        {/* Action Buttons with 48px touch-target-primary */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {/* Pehle Pakka CTA */}
          <button
            type="button"
            onClick={() => onOpenPehlePakka(job)}
            className="touch-target-primary flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-sand-200 hover:bg-sand-300 text-deepgreen-900 border border-sand-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500"
          >
            <ShieldCheck className="w-4 h-4 text-deepgreen-800" />
            <span>{currentLanguage === 'hi' ? 'पहले पक्का' : currentLanguage === 'mr' ? 'आधी पक्के' : 'Pehle Pakka'}</span>
          </button>

          {/* Details CTA */}
          <button
            type="button"
            onClick={() => onSelectJob(job)}
            className="touch-target-primary flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 text-xs font-bold flex items-center justify-center gap-1.5 shadow-warm-sm transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500"
          >
            <span>{currentLanguage === 'hi' ? 'पूरी जानकारी' : currentLanguage === 'mr' ? 'पूर्ण माहिती' : 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-sand-300" />
          </button>
        </div>
      </div>
    </article>
  );
};
