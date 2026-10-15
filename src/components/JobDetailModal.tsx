import React from 'react';
import {
  X,
  MapPin,
  Clock,
  Phone,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Utensils,
  Hammer,
  HelpCircle,
  FileCheck,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Job, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  currentLanguage: Language;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onOpenPehlePakka: (job: Job) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  currentLanguage,
  isSaved,
  onToggleSave,
  onOpenPehlePakka,
}) => {
  React.useEffect(() => {
    if (!job) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [job, onClose]);

  if (!job) return null;
  const t = TRANSLATIONS[currentLanguage];

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

  const getFullAudioScript = (): string => {
    const title = job.title[currentLanguage] || job.title.en;
    const desc = job.description[currentLanguage] || job.description.en;
    const wage = currentLanguage === 'hi' 
      ? `मजदूरी: ${job.wageAmount} रुपये ${getWageUnitText()}। भुगतान: ${getPaymentTimingText()}।`
      : currentLanguage === 'mr'
      ? `मजुरी: ${job.wageAmount} रुपये ${getWageUnitText()}. पेमेंट: ${getPaymentTimingText()}.`
      : `Wage: ₹${job.wageAmount} ${getWageUnitText()}. Payment: ${getPaymentTimingText()}.`;
    const loc = currentLanguage === 'hi'
      ? `स्थान: ${job.nakaPoint}, ${job.areaName}। काम की अवधि: ${job.durationText.hi || job.durationText.en}। मालिक: ${job.employerName}।`
      : currentLanguage === 'mr'
      ? `ठिकाण: ${job.nakaPoint}, ${job.areaName}. कालावधी: ${job.durationText.mr || job.durationText.en}. मालक: ${job.employerName}.`
      : `Location: ${job.nakaPoint}, ${job.areaName}. Duration: ${job.durationText.en}. Employer: ${job.employerName}.`;
    
    return `${title}। ${desc}। ${wage} ${loc}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-nearblack/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-xl max-h-[92vh] sm:max-h-[88vh] bg-ivory-100 rounded-t-2xl sm:rounded-2xl border border-sand-300 shadow-warm-lg overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-detail-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-sand-200 bg-sand-100">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded font-extrabold bg-sand-200 text-deepgreen-900 border border-sand-300">
              {t.demoListingTag}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded font-bold bg-terracotta-100 text-terracotta-700">
              {job.dateCategory === 'today' ? t.todayJobs : job.jobDate}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <SunkeSamjhoButton
              textToSpeak={getFullAudioScript()}
              lang={currentLanguage}
            />

            <button
              type="button"
              onClick={() => onToggleSave(job.id)}
              className={`touch-target p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-sand-300 text-terracotta-700 border-sand-400'
                  : 'bg-ivory-50 text-nearblack-subtle border-sand-300 hover:bg-sand-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="touch-target p-2 rounded-lg text-nearblack-subtle hover:text-nearblack hover:bg-sand-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Step indicator */}
          <div className="text-[11px] font-bold text-deepgreen-800 uppercase tracking-wider flex items-center gap-1.5">
            <span>Step 3 of 5: {t.step3}</span>
          </div>

          {/* Title & Wage Highlight */}
          <div>
            <h2 id="job-detail-title" className="text-xl sm:text-2xl font-bold text-deepgreen-900 font-hindi leading-snug">
              {job.title[currentLanguage] || job.title.en}
            </h2>

            {/* Big Unambiguous Wage Banner */}
            <div className="mt-3 p-4 rounded-xl bg-terracotta-50/70 border-2 border-terracotta-500/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-700 block">
                  {currentLanguage === 'hi' ? 'तय दिहाड़ी व भुगतान दर' : currentLanguage === 'mr' ? 'ठरलेली मजुरी व पेमेंट पद्धत' : 'Agreed Wage & Payment Basis'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-terracotta-600">
                    ₹{job.wageAmount}
                  </span>
                  <span className="text-sm font-bold text-deepgreen-900 px-2 py-0.5 rounded bg-sand-200">
                    {getWageUnitText()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-deepgreen-900 bg-sand-200 px-2.5 py-1.5 rounded-lg border border-sand-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{getPaymentTimingText()}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Location & Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-sand-50 p-3.5 rounded-xl border border-sand-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-terracotta-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-deepgreen-900 block">{job.nakaPoint}</span>
                <span className="text-nearblack-subtle">{job.areaName}, {job.city}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-deepgreen-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-deepgreen-900 block">
                  {job.durationText[currentLanguage] || job.durationText.en}
                </span>
                <span className="text-nearblack-subtle">{job.timing} ({job.durationHours} hrs)</span>
              </div>
            </div>
          </div>

          {/* Completeness State Badge */}
          <div className="p-3 rounded-lg bg-deepgreen-50 border border-deepgreen-700/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-deepgreen-900 font-bold">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.termsCompleteBadge}</span>
            </div>
            <span className="text-[11px] text-deepgreen-800">
              {job.overtimePaid ? `Overtime: ₹${job.overtimeRatePerHour}/hr` : 'Standard task basis'}
            </span>
          </div>

          {/* Plain Language Work Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-nearblack-subtle">
              {currentLanguage === 'hi' ? 'काम का पूरा ब्यौरा (सरल भाषा में)' : 'Plain-Language Work Description'}
            </h4>
            <p className="text-sm text-nearblack leading-relaxed bg-ivory-50 p-3.5 rounded-lg border border-sand-300">
              {job.description[currentLanguage] || job.description.en}
            </p>
          </div>

          {/* Required Tools Specification */}
          <div className="p-3.5 rounded-xl border border-sand-300 bg-sand-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-deepgreen-900 flex items-center gap-1.5">
                <Hammer className="w-4 h-4 text-terracotta-500" />
                <span>{currentLanguage === 'hi' ? 'औजारों की व्यवस्था' : 'Required Tools Specification'}</span>
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-sand-200 text-deepgreen-900">
                {job.toolsSuppliedBy === 'employer' ? t.toolsByEmployer : job.toolsSuppliedBy === 'worker' ? t.toolsByWorker : t.toolsMutual}
              </span>
            </div>
            <p className="text-xs text-nearblack-muted bg-ivory-50 p-2.5 rounded border border-sand-200 leading-relaxed">
              {job.toolsDetails[currentLanguage] || job.toolsDetails.en}
            </p>
          </div>

          {/* Tea / Lunch arrangement */}
          <div className="p-3 rounded-lg bg-ivory-50 border border-sand-300 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-terracotta-500" />
              <span className="font-bold text-deepgreen-900">{t.termsLunch}</span>
            </div>
            <span className="font-semibold text-deepgreen-900">
              {job.chaiLunchProvided ? t.lunchTeaIncluded : (currentLanguage === 'hi' ? 'स्वयं का खाना साथ लाएं' : 'Worker brings own meal')}
            </span>
          </div>

          {/* Safety Checklist */}
          {job.safetyNotes && (
            <div className="p-3.5 rounded-xl bg-deepgreen-50/70 border border-deepgreen-700/20 space-y-2">
              <div className="flex items-center gap-1.5 text-deepgreen-900 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-terracotta-500" />
                <span>{t.safetyCheck}</span>
              </div>
              <ul className="text-xs text-deepgreen-900 space-y-1 pl-4 list-disc">
                {(job.safetyNotes[currentLanguage] || job.safetyNotes.en).map((note, idx) => (
                  <li key={idx} className="leading-relaxed">{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Employer Contact Card */}
          <div className="p-3.5 rounded-xl bg-sand-100 border border-sand-300 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-nearblack-subtle block">{t.employer}</span>
              <span className="font-bold text-sm text-deepgreen-900">{job.employerName}</span>
              <span className="text-xs text-nearblack-muted block font-mono mt-0.5">{job.phone} (Demo)</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] px-2 py-0.5 rounded bg-sand-200 text-deepgreen-800 font-semibold block">
                {t.demoListingTag}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer: Direct Step to Pehle Pakka Terms Confirmation */}
        <div className="p-4 bg-sand-100 border-t border-sand-200 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="touch-target px-4 py-2.5 rounded-xl border border-sand-300 bg-ivory-50 hover:bg-sand-100 text-nearblack font-semibold text-xs transition-colors"
          >
            {t.backToBrowse}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPehlePakka(job);
            }}
            className="touch-target-primary flex-1 px-4 py-3 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-warm transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500"
          >
            <ShieldCheck className="w-4 h-4 text-sand-300" />
            <span>
              {currentLanguage === 'hi' 
                ? 'शर्तें समझें व पक्की करें (Pehle Pakka)' 
                : currentLanguage === 'mr'
                ? 'अटी समजून घ्या व पक्क्या करा (आधी पक्के)'
                : 'Review & Confirm Terms (Pehle Pakka)'}
            </span>
            <ArrowRight className="w-4 h-4 text-sand-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
