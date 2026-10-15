import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  X,
  Clock,
  IndianRupee,
  Utensils,
  AlertCircle,
  FileText,
  UserCheck,
  ArrowLeft,
  ArrowRight,
  Hammer,
  HelpCircle
} from 'lucide-react';
import { Job, Language, PreWorkAgreement, WorkerProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';

interface PehlePakkaModalProps {
  job: Job | null;
  workerProfile: WorkerProfile;
  isOpen: boolean;
  onClose: () => void;
  onBackToDetails?: () => void;
  onProceedToContact: (agreement: PreWorkAgreement) => void;
  currentLanguage: Language;
  onSaveAgreement: (agreement: PreWorkAgreement) => void;
}

export const PehlePakkaModal: React.FC<PehlePakkaModalProps> = ({
  job,
  workerProfile,
  isOpen,
  onClose,
  onBackToDetails,
  onProceedToContact,
  currentLanguage,
  onSaveAgreement,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // Initialize terms from job or sensible defaults
  const [wage, setWage] = useState<number>(job ? job.wageAmount : workerProfile.dailyRateExpected || 950);
  const [wageType, setWageType] = useState<Job['wageType']>(job ? job.wageType : 'per_day');
  const [workingHours, setWorkingHours] = useState<string>(job ? job.timing : '9:00 AM to 5:00 PM (8 hrs)');
  const [durationText, setDurationText] = useState<string>(
    job ? (job.durationText[currentLanguage] || job.durationText.en) : '1 Day (8 hrs)'
  );
  const [overtimeRate, setOvertimeRate] = useState<number>(job?.overtimeRatePerHour || 140);
  const [paymentTiming, setPaymentTiming] = useState<string>(
    job?.paymentTiming === 'cash_at_evening'
      ? (currentLanguage === 'hi' ? 'शाम को काम खत्म होते ही नकद' : currentLanguage === 'mr' ? 'संध्याकाळी काम संपताच रोख' : 'Same day cash in hand at evening')
      : job?.paymentTiming === 'immediate_task_end'
      ? (currentLanguage === 'hi' ? 'काम पूरा होते ही तुरंत नकद' : currentLanguage === 'mr' ? 'काम संपताच रोख' : 'Immediate cash on task completion')
      : job?.paymentTiming === 'upi_at_evening'
      ? (currentLanguage === 'hi' ? 'शाम को ऑनलाइन UPI भुगतान' : currentLanguage === 'mr' ? 'संध्याकाळी UPI पेमेंट' : 'Online UPI transfer at evening')
      : (currentLanguage === 'hi' ? 'तय समय पर भुगतान' : 'Payment on agreed schedule')
  );
  const [materialsBy, setMaterialsBy] = useState<'employer' | 'worker' | 'mutual'>(job?.toolsSuppliedBy || 'employer');
  const [lunchChai, setLunchChai] = useState<boolean>(job ? job.chaiLunchProvided : true);
  const [safetyAgreed, setSafetyAgreed] = useState<boolean>(true);
  const [employerName, setEmployerName] = useState<string>(job ? job.employerName : 'Employer / Contractor');
  const [employerPhone, setEmployerPhone] = useState<string>(job ? job.phone : '+91-98765-01001');
  const [copied, setCopied] = useState(false);

  // Mandatory understanding confirmation checkbox
  const [understoodTerms, setUnderstoodTerms] = useState(false);
  const [validationAlert, setValidationAlert] = useState(false);

  // Sync state whenever selected job changes
  useEffect(() => {
    if (job) {
      setWage(job.wageAmount);
      setWageType(job.wageType);
      setWorkingHours(job.timing);
      setDurationText(job.durationText[currentLanguage] || job.durationText.en);
      setEmployerName(job.employerName);
      setEmployerPhone(job.phone);
      setMaterialsBy(job.toolsSuppliedBy);
      setLunchChai(job.chaiLunchProvided);
      setOvertimeRate(job.overtimeRatePerHour || 140);
    }
  }, [job, currentLanguage]);

  useEffect(() => {
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

  const getWageTypeUnitLabel = () => {
    if (wageType === 'per_day') return t.perDay;
    if (wageType === 'fixed_task') return t.fixedTask;
    return t.perHour;
  };

  const getAgreementText = (): string => {
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    if (currentLanguage === 'hi') {
      return `--- कमाई (KAMAI): पहले पक्का (काम की तय शर्तें) ---
तारीख व समय: ${dateStr}, ${timeStr}
कारीगर: ${workerProfile.name} (${workerProfile.phone})
मालिक: ${employerName} (${employerPhone})
काम: ${job ? (job.title.hi || job.title.en) : 'दैनिक कार्य'}
स्थान: ${job ? job.nakaPoint : workerProfile.preferredNaka} (${job ? job.city : 'Mumbai'})

1. तय मजदूरी: ₹${wage} (${getWageTypeUnitLabel()})
2. काम की अवधि व समय: ${durationText} • ${workingHours}
3. ओवर-टाइम दर: ₹${overtimeRate} प्रति अतिरिक्त घंटा
4. भुगतान का समय: ${paymentTiming}
5. चाय-नाश्ता: ${lunchChai ? 'मालिक द्वारा' : 'स्वयं'}
6. औजार व सामग्री: ${materialsBy === 'employer' ? 'मालिक देगा' : materialsBy === 'worker' ? 'कारीगर लाएगा' : 'आपसी व्यवस्था'}
7. सुरक्षा सावधानियां: दोनों पक्ष सहमत हैं

(शर्तें औजार उठाने से पहले कमाई (KAMAI) के जरिए पक्की की गईं)`;
    } else if (currentLanguage === 'mr') {
      return `--- कमाई (KAMAI): आधी पक्के करा (ठरलेल्या अटी) ---
दिनांक: ${dateStr}, ${timeStr}
कारागीर: ${workerProfile.name} (${workerProfile.phone})
मालक: ${employerName} (${employerPhone})
काम: ${job ? (job.title.mr || job.title.en) : 'दैनिक काम'}
ठिकाण: ${job ? job.nakaPoint : workerProfile.preferredNaka} (${job ? job.city : 'Mumbai'})

१. ठरलेली मजुरी: ₹${wage} (${getWageTypeUnitLabel()})
२. कामाची वेळ व कालावधी: ${durationText} • ${workingHours}
३. ओव्हर-टाईम दर: ₹${overtimeRate} प्रति जादा तास
४. पेमेंट वेळ: ${paymentTiming}
५. चहा-जेवण: ${lunchChai ? 'मालकाकडून' : 'स्वतःचे'}
६. अवजारे व साहित्य: ${materialsBy === 'employer' ? 'मालक देईल' : materialsBy === 'worker' ? 'कारागीर आणेल' : 'परस्पर व्यवस्था'}
७. सुरक्षा हमी: दोन्ही बाजूंनी मान्य

(काम सुरू करण्यापूर्वी कमाई (KAMAI) द्वारे अटी पक्क्या केल्या आहेत)`;
    } else {
      return `--- KAMAI: Pehle Pakka (Pre-Work Agreement) ---
Date & Time: ${dateStr}, ${timeStr}
Worker: ${workerProfile.name} (${workerProfile.phone})
Employer: ${employerName} (${employerPhone})
Work: ${job ? job.title.en : 'Daily Task'}
Location: ${job ? job.nakaPoint : workerProfile.preferredNaka} (${job ? job.city : 'Mumbai'})

1. Agreed Wage: ₹${wage} (${getWageTypeUnitLabel()})
2. Duration & Working Hours: ${durationText} • ${workingHours}
3. Overtime Rate: ₹${overtimeRate} / extra hour
4. Payment Timing: ${paymentTiming}
5. Tea & Lunch: ${lunchChai ? 'Provided by employer' : 'Worker arranges'}
6. Tools & Materials: ${materialsBy === 'employer' ? 'Supplied by employer' : materialsBy === 'worker' ? 'Worker brings hand tools' : 'Shared'}
7. Safety conditions agreed by both parties.

Mutual terms confirmed by worker and employer on KAMAI.`;
    }
  };

  const handleCopy = async () => {
    const text = getAgreementText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const buildAgreementObject = (): PreWorkAgreement => {
    return {
      id: `agreed-${Date.now()}`,
      jobId: job?.id,
      jobTitle: job ? (job.title[currentLanguage] || job.title.en) : 'Direct Work Opportunity',
      workerName: workerProfile.name,
      employerName,
      employerPhone,
      tradeName: workerProfile.tradeId,
      location: job ? `${job.nakaPoint}, ${job.areaName}` : workerProfile.preferredNaka,
      agreedWage: wage,
      wageBasis: wageType,
      workingHours: `${durationText} • ${workingHours}`,
      overtimeRatePerHour: overtimeRate,
      paymentTiming,
      materialsProvidedBy: materialsBy,
      chaiLunchProvided: lunchChai,
      safetyEquipmentAgreed: safetyAgreed,
      confirmedAt: new Date().toISOString(),
      status: 'agreed',
      userAcknowledged: understoodTerms
    };
  };

  const handleProceed = () => {
    if (!understoodTerms) {
      setValidationAlert(true);
      return;
    }
    const agreementObj = buildAgreementObject();
    onSaveAgreement(agreementObj);
    onProceedToContact(agreementObj);
  };

  const getAudioSummary = (): string => {
    return currentLanguage === 'hi'
      ? `पहले पक्का शर्तें: तय मजदूरी ${wage} रुपये ${getWageTypeUnitLabel()}। काम का समय: ${workingHours}। भुगतान: ${paymentTiming}। चाय-नाश्ता: ${lunchChai ? 'मिलेगा' : 'नहीं'}। आगे बढ़ने के लिए शर्तें समझने का बॉक्स टिक करें।`
      : currentLanguage === 'mr'
      ? `आधी पक्के करा अटी: ठरलेली मजुरी ${wage} रुपये ${getWageTypeUnitLabel()}. कामाची वेळ: ${workingHours}. पेमेंट वेळ: ${paymentTiming}. पुढे जाण्यासाठी अटी समजल्याचा बॉक्स टिक करा.`
      : `Pehle Pakka pre-work terms: Agreed wage ₹${wage} ${getWageTypeUnitLabel()}. Timing: ${workingHours}. Payment: ${paymentTiming}. Confirm understanding to proceed.`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-nearblack/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-xl max-h-[92vh] bg-ivory-100 rounded-t-2xl sm:rounded-2xl border border-sand-300 shadow-warm-lg overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pehle-pakka-title"
      >
        {/* Top Header with Back Navigation and Audio Read-Aloud */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-sand-200 bg-sand-100">
          <div className="flex items-center gap-2">
            {onBackToDetails && (
              <button
                type="button"
                onClick={onBackToDetails}
                className="touch-target p-1.5 text-deepgreen-900 hover:text-terracotta-600 rounded-lg mr-1"
                aria-label="Back to job details"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-8 h-8 rounded-lg bg-deepgreen-800 text-sand-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-sand-300" />
            </div>
            <div>
              <h2 id="pehle-pakka-title" className="font-bold text-base text-deepgreen-900 font-hindi">
                {t.pehlePakkaTitle}
              </h2>
              <span className="text-[10px] text-nearblack-subtle block">
                Step 4 of 5: Pre-Work Terms Lock
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <SunkeSamjhoButton
              textToSpeak={getAudioSummary()}
              lang={currentLanguage}
            />
            <button
              type="button"
              onClick={onClose}
              className="touch-target p-1.5 text-nearblack-subtle hover:text-nearblack rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Terms Confirmation Card */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Subtitle guidance */}
          <div className="p-3 rounded-xl bg-sand-100 border border-sand-300 text-xs text-nearblack-muted">
            <p className="font-medium leading-relaxed">
              {t.pehlePakkaSubtitle}
            </p>
          </div>

          {/* Job & Location Header */}
          <div className="p-3.5 rounded-xl bg-ivory-50 border border-sand-300 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-nearblack-subtle block">
              {currentLanguage === 'hi' ? 'काम व नाका' : 'Job & Reporting Naka'}
            </span>
            <h3 className="font-bold text-base text-deepgreen-900 font-hindi">
              {job ? (job.title[currentLanguage] || job.title.en) : 'Direct Naka Work Opportunity'}
            </h3>
            <p className="text-xs text-deepgreen-800 font-semibold">
              📍 {job ? `${job.nakaPoint}, ${job.areaName} (${job.city})` : workerProfile.preferredNaka}
            </p>
          </div>

          {/* Worker & Employer Identity Row */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-sand-50 p-3 rounded-xl border border-sand-300">
            <div>
              <span className="text-[10px] uppercase font-bold text-nearblack-subtle block">
                {currentLanguage === 'hi' ? 'कारीगर (आप)' : currentLanguage === 'mr' ? 'कारागीर (तुम्ही)' : 'Worker'}
              </span>
              <span className="font-bold text-deepgreen-900 block">{workerProfile.name}</span>
              <span className="text-[11px] font-mono text-nearblack-subtle">{workerProfile.phone}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-nearblack-subtle block">
                {currentLanguage === 'hi' ? 'मालिक / ठेकेदार' : currentLanguage === 'mr' ? 'काम देणारे मालक' : 'Employer'}
              </span>
              <span className="font-bold text-deepgreen-900 block">{employerName}</span>
              <span className="text-[11px] font-mono text-nearblack-subtle">{employerPhone} (Demo)</span>
            </div>
          </div>

          {/* 1. Exact Wage with Unambiguous Payment Unit */}
          <div className="p-3.5 rounded-xl border-2 border-terracotta-500/30 bg-terracotta-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-deepgreen-900 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-terracotta-500" />
                <span>{t.termsWage}</span>
              </label>
              {/* CLEAR UNAMBIGUOUS UNIT BADGE */}
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-terracotta-500 text-ivory-50">
                {getWageTypeUnitLabel()}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-terracotta-600">
                ₹{wage}
              </span>
              <span className="text-xs font-semibold text-deepgreen-900">
                {wageType === 'per_day' ? t.perDay : wageType === 'fixed_task' ? t.fixedTask : t.perHour}
              </span>
            </div>
            <p className="text-[11px] text-nearblack-muted">
              {currentLanguage === 'hi' 
                ? 'यह राशि बिना किसी कटौती के तय की गई है' 
                : 'Net agreed payment without arbitrary middleman cuts.'}
            </p>
          </div>

          {/* 2. Duration & Working Hours + 3. Overtime Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-sand-300 bg-ivory-50 space-y-1.5">
              <label className="text-xs font-bold text-deepgreen-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-deepgreen-800" />
                <span>{t.termsHours}</span>
              </label>
              <div className="text-xs font-bold text-deepgreen-900">
                {durationText}
              </div>
              <div className="text-[11px] text-nearblack-muted">
                {workingHours}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-sand-300 bg-ivory-50 space-y-1.5">
              <label className="text-xs font-bold text-deepgreen-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-terracotta-500" />
                <span>{t.termsOvertime}</span>
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-extrabold text-deepgreen-900">₹{overtimeRate}</span>
                <span className="text-[11px] text-nearblack-muted">{currentLanguage === 'hi' ? 'प्रति अतिरिक्त घंटा' : '/ extra hour'}</span>
              </div>
              <div className="text-[11px] text-emerald-800 font-semibold">
                ✓ {currentLanguage === 'hi' ? '8 घंटे के बाद लागू' : 'Applies past 8 hrs'}
              </div>
            </div>
          </div>

          {/* 4. Payment Timing */}
          <div className="p-3.5 rounded-xl border border-sand-300 bg-ivory-50 space-y-1">
            <span className="text-xs font-bold text-deepgreen-900 block">
              {t.termsPayment}
            </span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-deepgreen-900">{paymentTiming}</span>
            </div>
          </div>

          {/* 5. Tools & Material Provision */}
          <div className="p-3.5 rounded-xl border border-sand-300 bg-ivory-50 space-y-1">
            <span className="text-xs font-bold text-deepgreen-900 flex items-center gap-1.5">
              <Hammer className="w-4 h-4 text-deepgreen-800" />
              <span>{t.termsSafety}</span>
            </span>
            <p className="text-xs text-nearblack font-medium">
              {materialsBy === 'employer' 
                ? t.toolsByEmployer 
                : materialsBy === 'worker' 
                ? t.toolsByWorker 
                : t.toolsMutual}
            </p>
            {job && (
              <p className="text-[11px] text-nearblack-muted bg-sand-100 p-2 rounded mt-1">
                {job.toolsDetails[currentLanguage] || job.toolsDetails.en}
              </p>
            )}
          </div>

          {/* 6. Tea & Lunch */}
          <div className="p-3 rounded-xl border border-sand-300 bg-ivory-50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-terracotta-500" />
              <span className="font-bold text-deepgreen-900">{t.termsLunch}</span>
            </div>
            <span className="font-semibold text-deepgreen-900 px-2 py-0.5 rounded bg-sand-200">
              {lunchChai ? t.lunchTeaIncluded : (currentLanguage === 'hi' ? 'कारीगर स्वयं लाएगा' : 'Worker brings own meal')}
            </span>
          </div>

          {/* CRITICAL SIGNATURE INTERACTION: MANDATORY UNDERSTANDING CONFIRMATION CHECKBOX */}
          <div className={`p-4 rounded-xl border-2 transition-all ${
            understoodTerms
              ? 'border-emerald-600 bg-emerald-50/80 shadow-warm'
              : validationAlert
              ? 'border-red-500 bg-red-50 animate-shake'
              : 'border-sand-400 bg-sand-100'
          }`}>
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={understoodTerms}
                onChange={(e) => {
                  setUnderstoodTerms(e.target.checked);
                  if (e.target.checked) setValidationAlert(false);
                }}
                className="w-5 h-5 text-emerald-600 rounded border-sand-400 mt-0.5 focus:ring-emerald-500 shrink-0"
              />
              <div className="space-y-0.5">
                <span className="font-extrabold text-xs sm:text-sm text-deepgreen-900 block font-hindi leading-snug">
                  {t.understandCheckbox}
                </span>
                <span className="text-[11px] text-nearblack-muted block">
                  {currentLanguage === 'hi'
                    ? 'दिहाड़ी, समय, औजार और भुगतान का समय — सब स्पष्ट है।'
                    : currentLanguage === 'mr'
                    ? 'मजुरी, वेळ, अवजारे आणि पेमेंट वेळ — सर्व स्पष्ट आहे.'
                    : 'Wages, hours, tools, and payment timing are clearly agreed.'}
                </span>
              </div>
            </label>

            {validationAlert && (
              <p className="mt-2 text-xs font-bold text-red-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{t.mustAcknowledgeAlert}</span>
              </p>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-sand-100 border-t border-sand-200 flex flex-col sm:flex-row items-center gap-2.5">
          {/* Copy Summary for SMS/WhatsApp */}
          <button
            type="button"
            onClick={handleCopy}
            className="touch-target w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sand-200 hover:bg-sand-300 text-deepgreen-900 border border-sand-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t.copiedNotice}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-terracotta-600" />
                <span>{t.copySummary}</span>
              </>
            )}
          </button>

          {/* Primary Action: Confirm & Proceed to Contact (Unlocked by Checkbox) */}
          <button
            type="button"
            onClick={handleProceed}
            className={`touch-target w-full sm:flex-1 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-warm transition-all ${
              understoodTerms
                ? 'bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 ring-2 ring-emerald-500/50'
                : 'bg-sand-300 text-nearblack-subtle cursor-pointer hover:bg-sand-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-sand-300" />
            <span>{t.proceedToContact}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
