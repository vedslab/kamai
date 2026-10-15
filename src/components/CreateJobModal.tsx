import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  IndianRupee,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  Eye,
  Calendar,
  Hammer,
  Utensils,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';
import { Job, Language, WageType, PaymentTiming } from '../types';
import { TRADES } from '../data/trades';
import { AREAS } from '../data/areas';
import { TRANSLATIONS } from '../data/translations';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onAddJob: (job: Job, navigateToTrade?: boolean) => void;
}

export const CreateJobModal: React.FC<CreateJobModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onAddJob,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // Helper date calculations
  const todayISO = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowISO = tomorrowDate.toISOString().split('T')[0];

  React.useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  // Journey view mode: 'form' | 'preview' | 'success'
  const [viewMode, setViewMode] = useState<'form' | 'preview' | 'success'>('form');

  // Form Fields
  const [tradeId, setTradeId] = useState<string>(TRADES[0].id);
  const [title, setTitle] = useState('');
  const [areaId, setAreaId] = useState<string>(AREAS[0].id);
  const [jobDate, setJobDate] = useState<string>(todayISO);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:30');
  const [wageAmount, setWageAmount] = useState<number>(TRADES[0].avgDailyRate.min || 850);
  const [wageType, setWageType] = useState<WageType>('per_day');
  const [paymentTiming, setPaymentTiming] = useState<PaymentTiming>('cash_at_evening');
  const [vacancies, setVacancies] = useState<number>(1);
  const [toolsSuppliedBy, setToolsSuppliedBy] = useState<'employer' | 'worker' | 'mutual'>('employer');
  const [chaiLunchProvided, setChaiLunchProvided] = useState<boolean>(true);
  const [description, setDescription] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [phone, setPhone] = useState('+91-98200-XXXXX');

  // Errors state with recovery actions
  const [errors, setErrors] = useState<Record<string, { message: string; recovery: string }>>({});
  const [createdJob, setCreatedJob] = useState<Job | null>(null);

  const selectedTrade = TRADES.find(tr => tr.id === tradeId) || TRADES[0];
  const selectedArea = AREAS.find(ar => ar.id === areaId) || AREAS[0];

  // Calculate duration in hours
  const calculateDurationHours = (start: string, end: string): number => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    const diffM = (endH * 60 + endM) - (startH * 60 + startM);
    if (diffM <= 0) return 8;
    return Math.round((diffM / 60) * 10) / 10;
  };

  // 12-hour format helper
  const formatTime12h = (timeStr: string): string => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    const minStr = m < 10 ? `0${m}` : m;
    return `${hour12}:${minStr} ${period}`;
  };

  // Helper text for wage unit
  const getWageUnitLabel = (type: WageType): string => {
    switch (type) {
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

  // Helper text for payment timing
  const getPaymentTimingLabel = (timing: PaymentTiming): string => {
    switch (timing) {
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

  // Validation function with clear error messages & recovery hints
  const validateForm = (): boolean => {
    const newErrors: Record<string, { message: string; recovery: string }> = {};

    // 1. Title
    if (!title.trim()) {
      newErrors.title = {
        message: t.errTitleRequired,
        recovery: t.errTitleRecovery
      };
    }

    // 2. Wage must be greater than zero
    if (!wageAmount || wageAmount <= 0) {
      newErrors.wageAmount = {
        message: t.errWagePositive,
        recovery: t.errWageRecovery
      };
    }

    // 3. Date cannot be in the past
    if (!jobDate || jobDate < todayISO) {
      newErrors.jobDate = {
        message: t.errDatePast,
        recovery: t.errDateRecovery
      };
    }

    // 4. End time must follow start time for same-day job
    if (startTime && endTime) {
      const [startH, startM] = startTime.split(':').map(Number);
      const [endH, endM] = endTime.split(':').map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      if (endMinutes <= startMinutes) {
        newErrors.timings = {
          message: t.errEndTimeOrder,
          recovery: t.errEndTimeRecovery
        };
      }
    }

    // 5. Wage basis is mandatory
    if (!wageType) {
      newErrors.wageType = {
        message: t.errWageTypeRequired,
        recovery: t.errWageTypeRecovery
      };
    }

    // 6. Payment timing is mandatory
    if (!paymentTiming) {
      newErrors.paymentTiming = {
        message: t.errPaymentTimingRequired,
        recovery: t.errPaymentTimingRecovery
      };
    }

    // 7. Employer Name
    if (!employerName.trim()) {
      newErrors.employerName = {
        message: t.errEmployerNameRequired,
        recovery: t.errEmployerNameRecovery
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Build the unified Job record
  const constructJobRecord = (): Job => {
    const durationHours = calculateDurationHours(startTime, endTime);
    const durationText = {
      en: `${durationHours} ${t.hoursShort} (${formatTime12h(startTime)} - ${formatTime12h(endTime)})`,
      hi: `${durationHours} ${t.hoursShort} (${formatTime12h(startTime)} से ${formatTime12h(endTime)})`,
      mr: `${durationHours} ${t.hoursShort} (${formatTime12h(startTime)} ते ${formatTime12h(endTime)})`
    };

    let dateCategory: 'today' | 'tomorrow' | 'upcoming' = 'upcoming';
    if (jobDate === todayISO) dateCategory = 'today';
    else if (jobDate === tomorrowISO) dateCategory = 'tomorrow';

    const formattedDate = jobDate === todayISO 
      ? (currentLanguage === 'hi' ? 'आज' : currentLanguage === 'mr' ? 'आज' : 'Today')
      : jobDate === tomorrowISO 
      ? (currentLanguage === 'hi' ? 'कल' : currentLanguage === 'mr' ? 'उद्या' : 'Tomorrow')
      : new Date(jobDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    const toolsDetailsText = toolsSuppliedBy === 'employer' 
      ? t.toolsByEmployerOption 
      : toolsSuppliedBy === 'worker' 
      ? t.toolsByWorkerOption 
      : t.toolsMutualOption;

    return {
      id: `custom-job-${Date.now()}`,
      title: {
        en: title.trim(),
        hi: title.trim(),
        mr: title.trim()
      },
      tradeId,
      employerName: employerName.trim(),
      employerType: 'homeowner',
      phone: phone.trim() || '+91-98200-XXXXX',
      wageAmount,
      wageType,
      paymentTiming,
      city: selectedArea.city,
      areaId: selectedArea.id,
      areaName: selectedArea.name[currentLanguage] || selectedArea.name.en,
      nakaPoint: selectedArea.nakaName,
      dateCategory,
      jobDate: formattedDate,
      timing: `${formatTime12h(startTime)} to ${formatTime12h(endTime)}`,
      durationHours,
      durationText,
      toolsSuppliedBy,
      toolsDetails: {
        en: toolsDetailsText,
        hi: toolsDetailsText,
        mr: toolsDetailsText
      },
      description: {
        en: description.trim() || title.trim(),
        hi: description.trim() || title.trim(),
        mr: description.trim() || title.trim()
      },
      toolsProvided: toolsSuppliedBy === 'employer',
      chaiLunchProvided,
      overtimePaid: true,
      overtimeRatePerHour: Math.round((wageAmount / 8) * 1.25),
      safetyNotes: {
        en: ['Basic site safety instructions agreed', 'Safe drinking water available on site'],
        hi: ['साइट पर बुनियादी सुरक्षा सावधानियां तय हैं', 'साइट पर पीने का साफ पानी उपलब्ध रहेगा'],
        mr: ['कामाच्या ठिकाणी सुरक्षेच्या नियमांचे पालन', 'पिण्याच्या स्वच्छ पाण्याची सोय']
      },
      completenessState: 'complete',
      isFictionalDemo: true,
      isCustomEmployerJob: true,
      vacancies,
      postedAt: currentLanguage === 'hi' ? 'अभी पोस्ट किया गया' : currentLanguage === 'mr' ? 'आत्ताच पोस्ट केले' : 'Just now'
    };
  };

  // STEP 1 → 2: Validate and open Worker Preview
  const handleProceedToPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const job = constructJobRecord();
      setCreatedJob(job);
      setViewMode('preview');
    }
  };

  // STEP 2 → 3: Confirm and save to local demo feed
  const handleConfirmAndPublish = () => {
    if (!createdJob) return;
    onAddJob(createdJob, false);
    setViewMode('success');
  };

  // STEP 3: Return to worker side and view job in matching listings
  const handleViewInListings = () => {
    if (!createdJob) {
      onClose();
      return;
    }
    onAddJob(createdJob, true);
    onClose();
  };

  // Reset form to post another job
  const handleResetForAnother = () => {
    setTitle('');
    setDescription('');
    setWageAmount(selectedTrade.avgDailyRate.min || 850);
    setErrors({});
    setCreatedJob(null);
    setViewMode('form');
  };

  // Speech summary generator for audio preview button
  const getSpeechPreviewText = (): string => {
    if (!createdJob) return '';
    const jobTitle = createdJob.title[currentLanguage] || createdJob.title.en;
    const wageStr = currentLanguage === 'hi' 
      ? `मजदूरी: ${createdJob.wageAmount} रुपये ${getWageUnitLabel(createdJob.wageType)}।`
      : currentLanguage === 'mr'
      ? `मजुरी: ${createdJob.wageAmount} रुपये ${getWageUnitLabel(createdJob.wageType)}.`
      : `Wage: ₹${createdJob.wageAmount} ${getWageUnitLabel(createdJob.wageType)}.`;
    const locStr = currentLanguage === 'hi'
      ? `स्थान: ${createdJob.nakaPoint}, ${createdJob.areaName}।`
      : currentLanguage === 'mr'
      ? `ठिकाण: ${createdJob.nakaPoint}, ${createdJob.areaName}.`
      : `Location: ${createdJob.nakaPoint}, ${createdJob.areaName}.`;
    const payStr = currentLanguage === 'hi'
      ? `भुगतान: ${getPaymentTimingLabel(createdJob.paymentTiming)}।`
      : currentLanguage === 'mr'
      ? `पेमेंट: ${getPaymentTimingLabel(createdJob.paymentTiming)}.`
      : `Payment: ${getPaymentTimingLabel(createdJob.paymentTiming)}.`;

    return `${jobTitle}। ${wageStr} ${locStr} ${payStr}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-nearblack/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-2xl max-h-[94vh] bg-ivory-100 rounded-t-2xl sm:rounded-2xl border border-sand-300 shadow-warm-lg overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="employer-journey-title"
      >
        {/* Header with Step Indicator */}
        <div className="px-5 py-3.5 border-b border-sand-200 bg-sand-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-terracotta-500" />
              <h2 id="employer-journey-title" className="font-bold text-base text-deepgreen-900 font-hindi">
                {t.employerFlowTitle}
              </h2>
            </div>
            <p className="text-[11px] text-nearblack-subtle mt-0.5">
              {t.employerFlowSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="touch-target p-1.5 text-nearblack-subtle hover:text-nearblack rounded-lg"
            aria-label={t.closeEmployerModal}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Journey Step Breadcrumb Indicator */}
        <div className="px-5 py-2 bg-sand-50 border-b border-sand-200 flex items-center justify-between text-xs font-semibold text-nearblack-subtle">
          <div className={`flex items-center gap-1.5 ${viewMode === 'form' ? 'text-terracotta-600 font-bold' : 'text-deepgreen-900'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
              viewMode === 'form' ? 'bg-terracotta-500 text-ivory-50' : 'bg-sand-300 text-deepgreen-900'
            }`}>
              1
            </span>
            <span>{t.employerStepForm}</span>
          </div>

          <span className="text-sand-400">→</span>

          <div className={`flex items-center gap-1.5 ${viewMode === 'preview' ? 'text-terracotta-600 font-bold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
              viewMode === 'preview' ? 'bg-terracotta-500 text-ivory-50' : 'bg-sand-300 text-deepgreen-900'
            }`}>
              2
            </span>
            <span>{t.employerStepPreview}</span>
          </div>

          <span className="text-sand-400">→</span>

          <div className={`flex items-center gap-1.5 ${viewMode === 'success' ? 'text-emerald-700 font-bold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
              viewMode === 'success' ? 'bg-emerald-600 text-ivory-50' : 'bg-sand-300 text-deepgreen-900'
            }`}>
              3
            </span>
            <span>{t.employerStepSuccess}</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VIEW 1: JOB DETAILS INPUT FORM WITH THOUGHTFUL VALIDATION */}
        {/* ============================================================ */}
        {viewMode === 'form' && (
          <form onSubmit={handleProceedToPreview} className="p-5 overflow-y-auto space-y-4 flex-1">
            {/* Global Errors Banner if any error exists */}
            {Object.keys(errors).length > 0 && (
              <div 
                className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">{t.formErrorsBanner}</p>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-red-700">
                    {Object.values(errors).map((err, idx) => (
                      <li key={idx}>{err.message}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 1. Required Trade Selection */}
            <div>
              <label htmlFor="job-trade" className="block text-xs font-bold text-deepgreen-900 mb-1">
                {t.jobTradeInput} <span className="text-red-600">*</span>
              </label>
              <select
                id="job-trade"
                value={tradeId}
                onChange={(e) => {
                  const tr = TRADES.find(t => t.id === e.target.value);
                  setTradeId(e.target.value);
                  if (tr) {
                    setWageAmount(tr.avgDailyRate.min);
                  }
                }}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sand-50 border border-sand-300 rounded-lg text-nearblack focus:border-terracotta-500 focus:outline-hidden"
              >
                {TRADES.map((trade) => (
                  <option key={trade.id} value={trade.id}>
                    {trade.name[currentLanguage] || trade.name.en} (Mumbai naka avg: ₹{trade.avgDailyRate.min} - ₹{trade.avgDailyRate.max})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-nearblack-subtle mt-1">
                {selectedTrade.subtitle[currentLanguage] || selectedTrade.subtitle.en}
              </p>
            </div>

            {/* 2. Job Title / Short Summary */}
            <div>
              <label htmlFor="job-title" className="block text-xs font-bold text-deepgreen-900 mb-1">
                {t.jobTitleInput} <span className="text-red-600">*</span>
              </label>
              <input
                id="job-title"
                type="text"
                placeholder={
                  currentLanguage === 'hi' 
                    ? 'उदा: 2BHK में पेंटिंग या बाथरूम पाइप फिटिंग' 
                    : currentLanguage === 'mr'
                    ? 'उदा: २ बीएचके भिंतीचे रंगकाम किंवा नळ दुरुस्ती'
                    : 'e.g., 2BHK wall painting or bathroom pipe fitting'
                }
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    const next = { ...errors };
                    delete next.title;
                    setErrors(next);
                  }
                }}
                className={`w-full px-3 py-2 text-xs sm:text-sm bg-sand-50 border rounded-lg text-nearblack focus:outline-hidden ${
                  errors.title ? 'border-red-500 bg-red-50/40' : 'border-sand-300 focus:border-terracotta-500'
                }`}
              />
              {errors.title && (
                <div className="mt-1 text-[11px] text-red-600 flex items-start gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    <strong>{errors.title.message}</strong> — {errors.title.recovery}
                  </span>
                </div>
              )}
            </div>

            {/* 3. Site Location & Nearest Naka */}
            <div>
              <label htmlFor="job-area" className="block text-xs font-bold text-deepgreen-900 mb-1">
                {t.jobLocationInput} <span className="text-red-600">*</span>
              </label>
              <select
                id="job-area"
                value={areaId}
                onChange={(e) => setAreaId(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sand-50 border border-sand-300 rounded-lg text-nearblack focus:border-terracotta-500 focus:outline-hidden"
              >
                {AREAS.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.nakaName} — {area.name[currentLanguage] || area.name.en} ({area.city})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-nearblack-subtle mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-terracotta-500" />
                <span>{selectedArea.landmark} ({selectedArea.zone})</span>
              </p>
            </div>

            {/* 4. Date Picker with quick 'Today' & 'Tomorrow' pills */}
            <div className="bg-sand-50 p-3.5 rounded-xl border border-sand-300 space-y-2">
              <label htmlFor="job-date" className="block text-xs font-bold text-deepgreen-900">
                {t.jobDateLabel} <span className="text-red-600">*</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setJobDate(todayISO);
                    if (errors.jobDate) {
                      const next = { ...errors };
                      delete next.jobDate;
                      setErrors(next);
                    }
                  }}
                  className={`touch-target px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    jobDate === todayISO 
                      ? 'bg-terracotta-500 text-ivory-50 border-terracotta-600 shadow-warm-xs' 
                      : 'bg-ivory-50 text-nearblack border-sand-300 hover:bg-sand-100'
                  }`}
                >
                  {t.todayButton}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setJobDate(tomorrowISO);
                    if (errors.jobDate) {
                      const next = { ...errors };
                      delete next.jobDate;
                      setErrors(next);
                    }
                  }}
                  className={`touch-target px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    jobDate === tomorrowISO 
                      ? 'bg-terracotta-500 text-ivory-50 border-terracotta-600 shadow-warm-xs' 
                      : 'bg-ivory-50 text-nearblack border-sand-300 hover:bg-sand-100'
                  }`}
                >
                  {t.tomorrowButton}
                </button>

                <input
                  id="job-date"
                  type="date"
                  min={todayISO}
                  value={jobDate}
                  onChange={(e) => {
                    setJobDate(e.target.value);
                    if (errors.jobDate) {
                      const next = { ...errors };
                      delete next.jobDate;
                      setErrors(next);
                    }
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs bg-ivory-50 border rounded-lg text-nearblack focus:outline-hidden ${
                    errors.jobDate ? 'border-red-500 bg-red-50/40' : 'border-sand-300'
                  }`}
                />
              </div>

              {errors.jobDate && (
                <div className="text-[11px] text-red-600 flex items-start gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    <strong>{errors.jobDate.message}</strong> — {errors.jobDate.recovery}
                  </span>
                </div>
              )}
            </div>

            {/* 5. Start Time & End Time */}
            <div className="bg-sand-50 p-3.5 rounded-xl border border-sand-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-deepgreen-900">
                  {t.startTimeInput} <span className="text-red-600">*</span>
                </span>
                <span className="text-[11px] font-semibold text-terracotta-600">
                  {t.estimatedDuration}: {calculateDurationHours(startTime, endTime)} {t.hoursShort}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="start-time" className="block text-[11px] text-nearblack-subtle mb-0.5">
                    {t.startTimeLabel}
                  </label>
                  <input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                      if (errors.timings) {
                        const next = { ...errors };
                        delete next.timings;
                        setErrors(next);
                      }
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-ivory-50 border border-sand-300 rounded-lg text-nearblack focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="end-time" className="block text-[11px] text-nearblack-subtle mb-0.5">
                    {t.endTimeLabel}
                  </label>
                  <input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                      if (errors.timings) {
                        const next = { ...errors };
                        delete next.timings;
                        setErrors(next);
                      }
                    }}
                    className={`w-full px-2.5 py-1.5 text-xs bg-ivory-50 border rounded-lg text-nearblack focus:outline-hidden ${
                      errors.timings ? 'border-red-500 bg-red-50/40' : 'border-sand-300'
                    }`}
                  />
                </div>
              </div>

              {errors.timings && (
                <div className="text-[11px] text-red-600 flex items-start gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    <strong>{errors.timings.message}</strong> — {errors.timings.recovery}
                  </span>
                </div>
              )}
            </div>

            {/* 6. Wage Amount & Wage Basis (Mandatory) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Wage Amount with > 0 validation */}
              <div>
                <label htmlFor="wage-amount" className="block text-xs font-bold text-deepgreen-900 mb-1 flex items-center justify-between">
                  <span>{t.wageOfferedInput} <span className="text-red-600">*</span></span>
                  <span className="text-[10px] text-terracotta-600 font-semibold">
                    Avg: ₹{selectedTrade.avgDailyRate.min}-{selectedTrade.avgDailyRate.max}
                  </span>
                </label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-nearblack-subtle" />
                  <input
                    id="wage-amount"
                    type="number"
                    step="50"
                    min="1"
                    value={wageAmount || ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setWageAmount(isNaN(val) ? 0 : val);
                      if (errors.wageAmount) {
                        const next = { ...errors };
                        delete next.wageAmount;
                        setErrors(next);
                      }
                    }}
                    className={`w-full pl-8 pr-3 py-2 text-sm font-bold bg-sand-50 border rounded-lg text-terracotta-600 focus:outline-hidden ${
                      errors.wageAmount ? 'border-red-500 bg-red-50/40' : 'border-sand-300 focus:border-terracotta-500'
                    }`}
                  />
                </div>
                {errors.wageAmount && (
                  <div className="mt-1 text-[11px] text-red-600 flex items-start gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>
                      <strong>{errors.wageAmount.message}</strong> — {errors.wageAmount.recovery}
                    </span>
                  </div>
                )}
              </div>

              {/* Wage Basis (Mandatory) */}
              <div>
                <label className="block text-xs font-bold text-deepgreen-900 mb-1">
                  {t.wageBasisLabel} <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['per_day', 'fixed_task', 'per_hour'] as WageType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setWageType(type);
                        if (errors.wageType) {
                          const next = { ...errors };
                          delete next.wageType;
                          setErrors(next);
                        }
                      }}
                      className={`touch-target py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition-all ${
                        wageType === type
                          ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900 shadow-warm-xs'
                          : 'bg-sand-50 text-nearblack border-sand-300 hover:bg-sand-100'
                      }`}
                    >
                      {getWageUnitLabel(type)}
                    </button>
                  ))}
                </div>
                {errors.wageType && (
                  <div className="mt-1 text-[11px] text-red-600 flex items-start gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{errors.wageType.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 7. Expected Payment Timing Commitment (Mandatory) */}
            <div>
              <label htmlFor="payment-timing" className="block text-xs font-bold text-deepgreen-900 mb-1">
                {t.paymentTimingCommitmentLabel} <span className="text-red-600">*</span>
              </label>
              <select
                id="payment-timing"
                value={paymentTiming}
                onChange={(e) => {
                  setPaymentTiming(e.target.value as PaymentTiming);
                  if (errors.paymentTiming) {
                    const next = { ...errors };
                    delete next.paymentTiming;
                    setErrors(next);
                  }
                }}
                className={`w-full px-3 py-2 text-xs sm:text-sm bg-sand-50 border rounded-lg text-nearblack focus:outline-hidden ${
                  errors.paymentTiming ? 'border-red-500 bg-red-50/40' : 'border-sand-300 focus:border-terracotta-500'
                }`}
              >
                <option value="cash_at_evening">{t.cashEvening}</option>
                <option value="upi_at_evening">{t.upiEvening}</option>
                <option value="half_advance_half_end">{t.halfAdvance}</option>
                <option value="immediate_task_end">{t.immediateEnd}</option>
                <option value="weekly_saturday">{t.weeklySaturday}</option>
              </select>
            </div>

            {/* 8. Worker Count & Tools Arrangement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="workers-count" className="block text-xs font-bold text-deepgreen-900 mb-1">
                  {t.workersCountLabel}
                </label>
                <input
                  id="workers-count"
                  type="number"
                  min="1"
                  max="20"
                  value={vacancies}
                  onChange={(e) => setVacancies(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-sand-50 border border-sand-300 rounded-lg text-nearblack focus:outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="tools-supplied" className="block text-xs font-bold text-deepgreen-900 mb-1">
                  {t.toolsArrangementLabel}
                </label>
                <select
                  id="tools-supplied"
                  value={toolsSuppliedBy}
                  onChange={(e) => setToolsSuppliedBy(e.target.value as 'employer' | 'worker' | 'mutual')}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-sand-50 border border-sand-300 rounded-lg text-nearblack focus:outline-hidden"
                >
                  <option value="employer">{t.toolsByEmployerOption}</option>
                  <option value="worker">{t.toolsByWorkerOption}</option>
                  <option value="mutual">{t.toolsMutualOption}</option>
                </select>
              </div>
            </div>

            {/* 9. Tea & Lunch Provided Checkbox */}
            <div className="p-3 bg-sand-50 rounded-xl border border-sand-300">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-deepgreen-900">
                <input
                  type="checkbox"
                  checked={chaiLunchProvided}
                  onChange={(e) => setChaiLunchProvided(e.target.checked)}
                  className="w-4 h-4 text-terracotta-500 rounded border-sand-400 focus:ring-terracotta-400"
                />
                <span>{t.lunchTeaCheckboxLabel}</span>
              </label>
            </div>

            {/* 10. Work Summary & Simple Language Instructions */}
            <div>
              <label htmlFor="work-desc" className="block text-xs font-bold text-deepgreen-900 mb-1">
                {t.workSummaryLabel}
              </label>
              <textarea
                id="work-desc"
                rows={2}
                placeholder={t.workSummaryPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sand-50 border border-sand-300 rounded-lg text-nearblack focus:border-terracotta-500 focus:outline-hidden resize-none"
              />
            </div>

            {/* 11. Employer Contact Information (Fictional Demo) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-ivory-50 p-3.5 rounded-xl border border-sand-300">
              <div>
                <label htmlFor="employer-name" className="block text-xs font-bold text-deepgreen-900 mb-1">
                  {t.employerNameLabel} <span className="text-red-600">*</span>
                </label>
                <input
                  id="employer-name"
                  type="text"
                  placeholder="e.g. Ramesh Verma"
                  value={employerName}
                  onChange={(e) => {
                    setEmployerName(e.target.value);
                    if (errors.employerName) {
                      const next = { ...errors };
                      delete next.employerName;
                      setErrors(next);
                    }
                  }}
                  className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-sand-50 border rounded-lg text-nearblack focus:outline-hidden ${
                    errors.employerName ? 'border-red-500 bg-red-50/40' : 'border-sand-300'
                  }`}
                />
                {errors.employerName && (
                  <div className="mt-1 text-[11px] text-red-600 flex items-start gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{errors.employerName.message}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="employer-phone" className="block text-xs font-bold text-deepgreen-900 mb-1">
                  {t.employerPhoneLabel}
                </label>
                <input
                  id="employer-phone"
                  type="tel"
                  placeholder="+91-98200-XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm bg-sand-50 border border-sand-300 rounded-lg text-nearblack font-mono focus:outline-hidden"
                />
                <span className="text-[10px] text-nearblack-subtle block mt-0.5">
                  {t.demoPhoneNotice}
                </span>
              </div>
            </div>

            {/* CTA: Proceed to Worker Preview */}
            <div className="pt-2">
              <button
                type="submit"
                className="touch-target w-full py-3 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-bold text-sm shadow-warm transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5 text-sand-300" />
                <span>{t.reviewAsWorker}</span>
                <ArrowRight className="w-4 h-4 text-sand-300 ml-1" />
              </button>
            </div>
          </form>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: WORKER PREVIEW (EXACTLY AS WORKERS SEE IT) */}
        {/* ============================================================ */}
        {viewMode === 'preview' && createdJob && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            {/* Context Notice */}
            <div className="p-3.5 rounded-xl bg-sand-200/90 border border-sand-400 text-deepgreen-900 space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-terracotta-600 shrink-0" />
                <h3 className="font-extrabold text-xs sm:text-sm font-hindi">
                  {t.workerPreviewHeading}
                </h3>
              </div>
              <p className="text-xs text-nearblack-subtle leading-relaxed">
                {t.workerPreviewDesc}
              </p>
            </div>

            {/* Worker Preview Job Card (High-fidelity replica) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-ivory-50 border-2 border-sand-400 shadow-warm space-y-4">
              {/* Top Row: Demo Tag + Date Tag + Audio Read-Aloud */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-terracotta-500 text-ivory-50 border border-terracotta-600 flex items-center gap-1 shadow-warm-xs">
                    <Sparkles className="w-3 h-3 text-sand-300" />
                    <span>{t.newJobBadge}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-terracotta-50 text-terracotta-700 border border-terracotta-500/30">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{createdJob.jobDate}</span>
                  </span>
                </div>

                {/* Sunke Samjho Audio Button */}
                <SunkeSamjhoButton
                  textToSpeak={getSpeechPreviewText()}
                  lang={currentLanguage}
                  compact
                />
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-deepgreen-900 leading-snug font-hindi">
                  {createdJob.title[currentLanguage] || createdJob.title.en}
                </h3>

                {/* Locality & Naka */}
                <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-nearblack-muted">
                  <div className="flex items-center gap-1 text-deepgreen-800 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                    <span>{createdJob.nakaPoint}</span>
                    <span className="text-nearblack-subtle">({createdJob.areaName})</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-nearblack-subtle shrink-0" />
                    <span>{createdJob.timing} ({createdJob.durationHours} {t.hoursShort})</span>
                  </div>
                </div>
              </div>

              {/* Plain Language Description */}
              <div className="p-3 rounded-lg bg-sand-100 text-xs sm:text-sm text-nearblack leading-relaxed">
                {createdJob.description[currentLanguage] || createdJob.description.en}
              </div>

              {/* Work Terms Chips */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                {/* Payment Timing */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-deepgreen-50 text-deepgreen-900 border border-deepgreen-700/20 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-deepgreen-800 shrink-0" />
                  <span>{getPaymentTimingLabel(createdJob.paymentTiming)}</span>
                </span>

                {/* Tools */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sand-100 text-nearblack border border-sand-300">
                  <Hammer className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                  <span>
                    {createdJob.toolsSuppliedBy === 'employer' 
                      ? t.toolsByEmployerOption 
                      : createdJob.toolsSuppliedBy === 'worker' 
                      ? t.toolsByWorkerOption 
                      : t.toolsMutualOption}
                  </span>
                </span>

                {/* Chai / Lunch */}
                {createdJob.chaiLunchProvided && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sand-100 text-deepgreen-900 border border-sand-300">
                    <Utensils className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>{t.lunchTeaIncluded}</span>
                  </span>
                )}
              </div>

              {/* Bottom Wage Presentation */}
              <div className="pt-3 border-t border-sand-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-nearblack-subtle block">
                    {currentLanguage === 'hi' ? 'तय भुगतान' : currentLanguage === 'mr' ? 'ठरलेली मजुरी' : 'Offered Wage'}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-terracotta-600 tracking-tight">
                      ₹{createdJob.wageAmount}
                    </span>
                    <span className="text-xs font-bold text-deepgreen-900 px-2 py-0.5 rounded bg-sand-200">
                      {getWageUnitLabel(createdJob.wageType)}
                    </span>
                  </div>
                  <span className="text-xs text-nearblack-subtle block mt-0.5">
                    {createdJob.employerName} (Demo) • {createdJob.vacancies} {createdJob.vacancies > 1 ? 'workers' : 'worker'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold inline-block">
                    {t.termsCompleteBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Prototype Disclaimer */}
            <p className="text-[11px] text-nearblack-muted text-center italic">
              {t.workerPreviewNotice}
            </p>

            {/* Action Buttons: Back to Edit or Confirm and Post */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setViewMode('form')}
                className="touch-target w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-sand-200 hover:bg-sand-300 text-deepgreen-900 font-bold text-xs sm:text-sm border border-sand-400 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.backToEdit}</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmAndPublish}
                className="touch-target w-full sm:w-auto flex-2 py-3 px-4 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-bold text-xs sm:text-sm shadow-warm transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-sand-300" />
                <span>{t.confirmAndPublish}</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: SUCCESS CONFIRMATION & RETURN TO WORKER LISTINGS */}
        {/* ============================================================ */}
        {viewMode === 'success' && createdJob && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-center animate-in fade-in">
            {/* Celebratory Check Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto shadow-warm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-xl sm:text-2xl font-extrabold text-deepgreen-900 font-hindi">
                {t.jobPostedSuccessTitle}
              </h3>
              <p className="text-xs sm:text-sm text-nearblack-muted leading-relaxed">
                {t.jobPostedSuccessSubtitle}
              </p>
            </div>

            {/* Job Summary Receipt Card */}
            <div className="p-4 rounded-xl bg-sand-50 border border-sand-300 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-sand-200 pb-2">
                <span className="text-nearblack-subtle font-semibold">
                  {selectedTrade.name[currentLanguage] || selectedTrade.name.en}
                </span>
                <span className="font-extrabold text-terracotta-600 text-sm">
                  ₹{createdJob.wageAmount} {getWageUnitLabel(createdJob.wageType)}
                </span>
              </div>

              <div className="space-y-1 text-nearblack">
                <p className="font-bold text-deepgreen-900 text-sm">
                  {createdJob.title[currentLanguage] || createdJob.title.en}
                </p>
                <p className="text-nearblack-subtle flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                  <span>{createdJob.nakaPoint}, {createdJob.areaName}</span>
                </p>
                <p className="text-nearblack-subtle flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-nearblack-subtle shrink-0" />
                  <span>{createdJob.jobDate} • {createdJob.timing}</span>
                </p>
                <p className="text-deepgreen-800 font-medium">
                  {t.paymentTimingInput}: {getPaymentTimingLabel(createdJob.paymentTiming)}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="max-w-md mx-auto space-y-3 pt-2">
              {/* PRIMARY CTA: View in Worker Listings */}
              <button
                type="button"
                onClick={handleViewInListings}
                className="touch-target w-full py-3.5 px-5 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-extrabold text-sm shadow-warm-md transition-colors flex items-center justify-center gap-2 group"
              >
                <span>{t.viewInWorkerListings}</span>
                <ArrowRight className="w-4 h-4 text-sand-300 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* SECONDARY CTA: Post Another Job */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetForAnother}
                  className="touch-target text-xs font-bold text-terracotta-600 hover:underline py-1 px-3"
                >
                  {t.postAnotherJob}
                </button>
                <span className="text-sand-400">•</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="touch-target text-xs font-bold text-nearblack-subtle hover:text-nearblack py-1 px-3"
                >
                  {t.closeEmployerModal}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
