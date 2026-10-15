import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  X,
  PhoneCall,
  PhoneOff,
  Copy,
  Check,
  AlertTriangle,
  ArrowLeft,
  User,
  Clock,
  LogOut
} from 'lucide-react';
import { Job, Language, WorkerProfile, PreWorkAgreement } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { saveInterestApplication } from '../utils/storage';

interface SimulatedContactModalProps {
  job: Job | null;
  workerProfile: WorkerProfile;
  agreement: PreWorkAgreement | null;
  isOpen: boolean;
  onClose: () => void;
  onBackToPakka: () => void;
  onReturnToBrowse: () => void;
  currentLanguage: Language;
  onOpenExitJob?: (agreement: PreWorkAgreement) => void;
}

export const SimulatedContactModal: React.FC<SimulatedContactModalProps> = ({
  job,
  workerProfile,
  agreement,
  isOpen,
  onClose,
  onBackToPakka,
  onReturnToBrowse,
  currentLanguage,
  onOpenExitJob,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [interestSent, setInterestSent] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Timer for active simulated call
  React.useEffect(() => {
    let timer: any = null;
    if (callActive) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  // Escape key and scroll lock
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

  if (!isOpen || !job) return null;

  const handleStartSimulatedCall = () => {
    setCallActive(true);
    // Record application in demo store
    saveInterestApplication({
      id: `interest-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title[currentLanguage] || job.title.en,
      workerName: workerProfile.name,
      workerPhone: workerProfile.phone,
      employerName: job.employerName,
      employerPhone: job.phone,
      submittedAt: new Date().toISOString(),
      method: 'simulated_call',
      status: 'sent_demo'
    });
  };

  const handleEndCall = () => {
    setCallActive(false);
    setInterestSent(true);
  };

  const simulatedSmsText = `[KAMAI Demo]
Namaste ${job.employerName},
I am ${workerProfile.name} (${workerProfile.phone}).
I am expressing interest in your job: "${job.title[currentLanguage] || job.title.en}".
Location: ${job.nakaPoint}, ${job.areaName}
Agreed Terms Reviewed: ₹${agreement ? agreement.agreedWage : job.wageAmount} / ${job.wageType === 'per_day' ? 'Day' : job.wageType === 'fixed_task' ? 'Task' : 'Hour'}
Reporting Time: ${job.timing}
Payment Timing: ${job.paymentTiming === 'cash_at_evening' ? 'Cash at evening' : 'On completion'}
Terms confirmed via Pehle Pakka on KAMAI.`;

  const handleCopySms = async () => {
    try {
      await navigator.clipboard.writeText(simulatedSmsText);
      setCopiedMessage(true);
      setInterestSent(true);
      saveInterestApplication({
        id: `interest-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title[currentLanguage] || job.title.en,
        workerName: workerProfile.name,
        workerPhone: workerProfile.phone,
        employerName: job.employerName,
        employerPhone: job.phone,
        submittedAt: new Date().toISOString(),
        method: 'simulated_message',
        status: 'sent_demo'
      });
      setTimeout(() => setCopiedMessage(false), 3000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-nearblack/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-xl max-h-[92vh] bg-ivory-100 rounded-t-2xl sm:rounded-2xl border border-sand-300 shadow-warm-lg overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Header with Back button and Close */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-sand-200 bg-sand-100">
          <button
            type="button"
            onClick={onBackToPakka}
            className="touch-target text-xs font-bold text-deepgreen-900 hover:text-terracotta-600 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {currentLanguage === 'hi' 
                ? 'पहले पक्का पर लौटें' 
                : currentLanguage === 'mr' 
                ? 'आधी पक्के वर जा' 
                : 'Back to Pehle Pakka'}
            </span>
          </button>

          <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-sand-200 text-deepgreen-900">
            Step 5 of 5
          </span>

          <button
            type="button"
            onClick={onClose}
            className="touch-target p-1.5 text-nearblack-subtle hover:text-nearblack rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Explicit Demo Safety Banner */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">
                {currentLanguage === 'hi'
                  ? 'सुरक्षित डेमो सिमुलेशन (Safe Demo Mode)'
                  : currentLanguage === 'mr'
                  ? 'सुरक्षित सराव डेमो (Safe Demo Mode)'
                  : 'Safe Demo Simulation'}
              </span>
              <p className="mt-0.5 text-amber-900 leading-relaxed">
                {t.simulatedContactNotice}
              </p>
            </div>
          </div>

          {/* Job Summary Pill */}
          <div className="p-4 rounded-xl bg-ivory-50 border border-sand-300 space-y-2">
            <span className="text-[10px] uppercase font-bold text-nearblack-subtle block">
              {currentLanguage === 'hi' ? 'चुना गया काम व तय शर्तें' : currentLanguage === 'mr' ? 'निवडलेले काम' : 'Target Work Opportunity'}
            </span>
            <h3 className="font-bold text-base text-deepgreen-900 font-hindi">
              {job.title[currentLanguage] || job.title.en}
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-nearblack-subtle block">{t.employer}:</span>
                <span className="font-semibold text-deepgreen-900">{job.employerName}</span>
                <span className="block text-[11px] font-mono text-nearblack-muted">{job.phone}</span>
              </div>
              <div>
                <span className="text-nearblack-subtle block">{currentLanguage === 'hi' ? 'तय दिहाड़ी' : 'Agreed Pay'}:</span>
                <span className="font-extrabold text-terracotta-600">
                  ₹{agreement ? agreement.agreedWage : job.wageAmount}
                  <span className="text-[11px] font-semibold text-deepgreen-900 ml-1">
                    {job.wageType === 'per_day' ? t.perDay : job.wageType === 'fixed_task' ? t.fixedTask : t.perHour}
                  </span>
                </span>
                <span className="block text-[11px] text-nearblack-muted">{job.nakaPoint}</span>
              </div>
            </div>

            {/* 1-Hour Safe Exit Window Action */}
            {agreement && (
              <div className="pt-2 border-t border-sand-200 flex items-center justify-between text-xs">
                <span className="text-[11px] text-amber-800 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {currentLanguage === 'hi'
                      ? '1 घंटे की सेफ एग्जिट विंडो खुली है'
                      : currentLanguage === 'mr'
                      ? '१ तासाची सेफ एक्झिट विंडो खुली आहे'
                      : '1-Hour Safe Exit Window Active'}
                  </span>
                </span>
                {onOpenExitJob && agreement.status === 'agreed' && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenExitJob(agreement);
                    }}
                    className="touch-target px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-600" />
                    <span>{currentLanguage === 'hi' ? 'काम छोड़ें (Exit Job)' : currentLanguage === 'mr' ? 'काम सोडा (Exit Job)' : 'Exit Job'}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* SIMULATED IN-APP CALL DIALOG */}
          {callActive ? (
            <div className="p-5 rounded-2xl bg-deepgreen-900 text-ivory-50 space-y-4 text-center animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-600/30 text-emerald-400 mx-auto flex items-center justify-center animate-pulse">
                <PhoneCall className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs text-sand-300 uppercase tracking-widest font-bold">
                  {t.callSimulatedActive}
                </span>
                <h4 className="text-lg font-bold mt-1 text-ivory-50">
                  {job.employerName} ({job.phone})
                </h4>
                <div className="flex items-center justify-center gap-1.5 text-xs text-sand-300 font-mono mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>00:{callDuration < 10 ? `0${callDuration}` : callDuration}</span>
                </div>
              </div>

              {/* In-Call Script Guidance */}
              <div className="p-3 rounded-xl bg-deepgreen-800/80 border border-deepgreen-700 text-left text-xs text-sand-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-sand-400 block">
                  {currentLanguage === 'hi' ? 'बातचीत का प्रारूप (Worker Call Briefing)' : 'Simulated Voice Channel'}
                </span>
                <p className="leading-relaxed italic">
                  "{t.callBriefingText}"
                </p>
              </div>

              <button
                type="button"
                onClick={handleEndCall}
                className="touch-target w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-ivory-50 font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneOff className="w-5 h-5" />
                <span>{t.hangUp}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Option 1: Simulate Call */}
              <button
                type="button"
                onClick={handleStartSimulatedCall}
                className="touch-target w-full p-4 rounded-xl border-2 border-deepgreen-800 bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-bold text-sm flex items-center justify-between shadow-warm transition-all"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-sand-300 text-deepgreen-900 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm">{t.simulatedCallCTA}</span>
                    <span className="text-[11px] text-sand-200 font-normal">
                      {currentLanguage === 'hi'
                        ? 'मालिक को कॉल करने का सुरक्षित अभ्यास स्क्रीन'
                        : 'Practice conversational briefing in safe demo sandbox'}
                    </span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-deepgreen-700 text-sand-200">
                  DEMO
                </span>
              </button>

              {/* Option 2: Copy SMS / WhatsApp Interest Message */}
              <div className="p-4 rounded-xl border border-sand-300 bg-sand-50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-deepgreen-900 font-bold text-xs">
                    <MessageSquare className="w-4 h-4 text-terracotta-500" />
                    <span>{t.simulatedMessageCTA}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sand-200 text-deepgreen-800 font-semibold">
                    Pre-filled Terms
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-ivory-50 border border-sand-300 text-xs font-mono text-nearblack leading-relaxed whitespace-pre-line max-h-36 overflow-y-auto">
                  {simulatedSmsText}
                </div>

                <button
                  type="button"
                  onClick={handleCopySms}
                  className="touch-target w-full py-2.5 rounded-lg bg-sand-200 hover:bg-sand-300 text-deepgreen-900 border border-sand-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{t.copiedNotice}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-terracotta-600" />
                      <span>{currentLanguage === 'hi' ? 'मैसेज कॉपी करें (डेमो)' : 'Copy Terms Message (Demo)'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Feedback & Confirmation */}
          {interestSent && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">
                  {currentLanguage === 'hi' ? 'संपर्क की रुचि दर्ज हो गई!' : 'Interest Successfully Recorded!'}
                </span>
                <span className="text-[11px] text-emerald-800">
                  {t.interestRecordedNotice}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Completion Actions */}
        <div className="p-4 bg-sand-100 border-t border-sand-200 flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToPakka}
            className="touch-target flex-1 px-4 py-2.5 rounded-xl border border-sand-300 bg-ivory-50 hover:bg-sand-100 text-nearblack font-semibold text-xs transition-colors"
          >
            {t.backToDetails}
          </button>

          <button
            type="button"
            onClick={onReturnToBrowse}
            className="touch-target flex-1 px-4 py-2.5 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-bold text-xs shadow-warm transition-colors"
          >
            {t.backToBrowse}
          </button>
        </div>
      </div>
    </div>
  );
};
