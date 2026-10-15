import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  X,
  LogOut,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';
import { Language, PreWorkAgreement } from '../types';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';

interface ExitJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  agreement: PreWorkAgreement;
  currentLanguage: Language;
  onConfirmExit: (agreementId: string, reason: string) => void;
}

export const ExitJobModal: React.FC<ExitJobModalProps> = ({
  isOpen,
  onClose,
  agreement,
  currentLanguage,
  onConfirmExit,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('wage_mismatch');
  const [customNote, setCustomNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  // Calculate remaining minutes within the 1-hour window
  const confirmedTime = new Date(agreement.confirmedAt).getTime();
  const timeElapsedMs = Date.now() - confirmedTime;
  const oneHourMs = 60 * 60 * 1000;
  const isWithin1Hour = timeElapsedMs <= oneHourMs;
  const minutesRemaining = Math.max(0, Math.ceil((oneHourMs - timeElapsedMs) / (60 * 1000)));

  const reasons = [
    {
      id: 'wage_mismatch',
      label:
        currentLanguage === 'hi'
          ? 'मालिक ने तय मजदूरी या भुगतान समय बदल दिया'
          : currentLanguage === 'mr'
          ? 'मालकाने ठरलेली मजुरी किंवा पेमेंट वेळ बदलली'
          : 'Employer altered promised wage or payment terms',
      desc:
        currentLanguage === 'hi'
          ? `तय ₹${agreement.agreedWage} से कम देने की कोशिश की जा रही है`
          : currentLanguage === 'mr'
          ? `ठरलेल्या ₹${agreement.agreedWage} पेक्षा कमी देण्याचा प्रयत्न`
          : 'Attempting to pay less than agreed amount',
    },
    {
      id: 'unsafe_conditions',
      label:
        currentLanguage === 'hi'
          ? 'कार्यस्थल असुरक्षित है / सुरक्षा उपकरण नहीं मिले'
          : currentLanguage === 'mr'
          ? 'कामाचे ठिकाण असुरक्षित आहे / सुरक्षा साधने मिळाली नाहीत'
          : 'Site is hazardous or safety equipment not provided',
      desc:
        currentLanguage === 'hi'
          ? 'हेलमेट, बेल्ट या बुनियादी सुरक्षा का अभाव'
          : currentLanguage === 'mr'
          ? 'हेल्मेट, बेल्ट किंवा मूलभूत सुरक्षेचा अभाव'
          : 'Lacks helmet, safety harness, or basic protections',
    },
    {
      id: 'work_mismatch',
      label:
        currentLanguage === 'hi'
          ? 'काम तय किए गए काम से बहुत अलग या अत्यधिक भारी है'
          : currentLanguage === 'mr'
          ? 'काम ठरलेल्या कामापेक्षा खूप वेगळे किंवा जास्त जड आहे'
          : 'Work scope is drastically different or excessive',
      desc:
        currentLanguage === 'hi'
          ? 'जो काम बताया गया था वह नहीं कराया जा रहा'
          : currentLanguage === 'mr'
          ? 'जे काम सांगितले होते ते करवून घेतले जात नाही'
          : 'Job differs from initial agreement scope',
    },
    {
      id: 'emergency',
      label:
        currentLanguage === 'hi'
          ? 'व्यक्तिगत आपातकाल / अचानक तबीयत खराब'
          : currentLanguage === 'mr'
          ? 'वैयक्तिक आणीबाणी / अचानक तब्येत बिघडली'
          : 'Personal emergency or feeling unwell',
      desc:
        currentLanguage === 'hi'
          ? 'तुरंत घर या अस्पताल जाना आवश्यक है'
          : currentLanguage === 'mr'
          ? 'तातडीने घरी किंवा दवाखान्यात जाणे आवश्यक'
          : 'Need to leave immediately for emergency',
    },
    {
      id: 'other',
      label:
        currentLanguage === 'hi'
          ? 'अन्य कारण (विवरण नीचे लिखें)'
          : currentLanguage === 'mr'
          ? 'इतर कारण (खाली तपशील लिहा)'
          : 'Other reason (specify below)',
      desc:
        currentLanguage === 'hi'
          ? 'कोई अन्य विशेष परिस्थिति'
          : currentLanguage === 'mr'
          ? 'इतर कोणतीही परिस्थिती'
          : 'Any other situation',
    },
  ];

  const getAudioText = (): string => {
    return currentLanguage === 'hi'
      ? `1 घंटे के अंदर काम छोड़ने की सुविधा। पहले पक्का नियम के तहत, यदि मालिक ने तय मजदूरी ₹${agreement.agreedWage} से कम की, या साइट असुरक्षित है, तो आप 1 घंटे में बिना किसी जुर्माने के सुरक्षित काम छोड़ सकते हैं। कृपया कारण चुनें और पुष्टि करें।`
      : currentLanguage === 'mr'
      ? `१ तासाच्या आत काम सोडण्याची सुविधा. आधी पक्के करा नियमानुसार, मालकाने ठरलेली मजुरी ₹${agreement.agreedWage} पेक्षा कमी केली किंवा काम असुरक्षित असल्यास, आपण १ तासात कोणत्याही दंडाशिवाय सुरक्षित काम सोडू शकता. कारण निवडा आणि पुष्टी करा.`
      : `Exit job option within 1 hour. Under Pehle Pakka rules, if employer changes agreed wage of ₹${agreement.agreedWage} or site is unsafe, you can exit freely within 1 hour. Select a reason and confirm.`;
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    const chosenObj = reasons.find((r) => r.id === selectedReason);
    const finalReason =
      selectedReason === 'other' && customNote.trim()
        ? customNote.trim()
        : chosenObj?.label || 'Worker safe exit within 1 hour';

    setTimeout(() => {
      onConfirmExit(agreement.id, finalReason);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-3xl border border-sand-300 shadow-2xl p-5 sm:p-7 relative overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Top Emergency Red/Amber Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-terracotta-500 to-amber-500" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 touch-target p-2 rounded-full bg-sand-100 hover:bg-sand-200 text-deepgreen-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3 mb-4 pr-8">
          <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
            <LogOut className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200">
                {currentLanguage === 'hi' ? 'सेफ एग्जिट विंडो' : currentLanguage === 'mr' ? 'सेफ एक्झिट विंडो' : 'Safe Exit Window'}
              </span>
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {isWithin1Hour
                    ? currentLanguage === 'hi'
                      ? `${minutesRemaining} मिनट शेष`
                      : currentLanguage === 'mr'
                      ? `${minutesRemaining} मिनिटे शिल्लक`
                      : `${minutesRemaining}m remaining`
                    : currentLanguage === 'hi'
                    ? '1 घंटा पूरा हुआ'
                    : '1 Hour Exceeded'}
                </span>
              </span>
            </div>
            <h2 id="exit-modal-title" className="text-lg sm:text-xl font-black text-navy-800 font-hindi mt-1">
              {currentLanguage === 'hi'
                ? 'काम छोड़ें (Exit Job within 1 Hour)'
                : currentLanguage === 'mr'
                ? 'काम सोडा (Exit Job within 1 Hour)'
                : 'Exit Job (Within 1 Hour)'}
            </h2>
          </div>
        </div>

        {/* Audio Guidance Bar */}
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-sand-100 border border-sand-300 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-deepgreen-900">
            <ShieldAlert className="w-4 h-4 text-terracotta-600" />
            <span>
              {currentLanguage === 'hi'
                ? 'मजदूर अधिकार: बिना किसी जुर्माने के सुरक्षित निकास'
                : currentLanguage === 'mr'
                ? 'कामगार हक्क: दंडाशिवाय सुरक्षित एक्झिट'
                : 'Worker Right: Exit with zero penalty'}
            </span>
          </div>
          <SunkeSamjhoButton textToSpeak={getAudioText()} lang={currentLanguage} compact />
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-1">
          {/* Job Info Summary */}
          <div className="p-3 rounded-2xl bg-sand-100/60 border border-sand-300 text-xs space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-nearblack-subtle">
                {currentLanguage === 'hi' ? 'काम:' : currentLanguage === 'mr' ? 'काम:' : 'Work:'}
              </span>
              <span className="font-bold text-navy-800">{agreement.jobTitle}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-nearblack-subtle">
                {currentLanguage === 'hi' ? 'मालिक / ठेकेदार:' : currentLanguage === 'mr' ? 'मालक / ठेकेदार:' : 'Employer:'}
              </span>
              <span className="font-semibold text-deepgreen-900">{agreement.employerName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-nearblack-subtle">
                {currentLanguage === 'hi' ? 'तय मजदूरी:' : currentLanguage === 'mr' ? 'ठरलेली मजुरी:' : 'Agreed Wage:'}
              </span>
              <span className="font-bold text-terracotta-600">₹{agreement.agreedWage} ({agreement.wageBasis})</span>
            </div>
          </div>

          {/* Reason Selection */}
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-2 font-hindi">
              {currentLanguage === 'hi'
                ? 'काम छोड़ने का मुख्य कारण चुनें (Select Reason):'
                : currentLanguage === 'mr'
                ? 'काम सोडण्याचे मुख्य कारण निवडा (Select Reason):'
                : 'Select reason for exiting:'}
            </label>

            <div className="space-y-2">
              {reasons.map((r) => (
                <label
                  key={r.id}
                  onClick={() => setSelectedReason(r.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedReason === r.id
                      ? 'border-red-600 bg-red-50/70 shadow-xs'
                      : 'border-sand-300 bg-white hover:bg-sand-100/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="exit_reason"
                    checked={selectedReason === r.id}
                    onChange={() => setSelectedReason(r.id)}
                    className="mt-0.5 text-red-600 focus:ring-red-500 shrink-0"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-navy-800 block font-hindi leading-snug">
                      {r.label}
                    </span>
                    <span className="text-[11px] text-nearblack-subtle block">
                      {r.desc}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {selectedReason === 'other' && (
              <div className="mt-2">
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder={
                    currentLanguage === 'hi'
                      ? 'कृपया संक्षेप में कारण बताएं...'
                      : currentLanguage === 'mr'
                      ? 'कृपया थोडक्यात कारण सांगा...'
                      : 'Please briefly explain the reason...'
                  }
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-sand-300 bg-ivory-50 focus:border-red-500 focus:outline-hidden"
                />
              </div>
            )}
          </div>

          {/* Safety Notice Callout */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              {currentLanguage === 'hi'
                ? 'पुष्टि करने पर आपका काम तुरंत रद्द हो जाएगा और ऐप में "1-Hour Safe Exit" दर्ज होगा। ठेकेदार को सूचना भेजी जाएगी कि काम शर्तों के अनुसार नहीं था।'
                : currentLanguage === 'mr'
                ? 'पुष्टी केल्यावर आपले काम त्वरित रद्द होईल आणि ॲपमध्ये "1-Hour Safe Exit" नोंदवले जाईल. अटींचे पालन न झाल्याची नोंद केली जाईल.'
                : 'Confirming will cancel this lock with an official "1-Hour Safe Exit" record stating agreed terms were not honored.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-sand-300 mt-3 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="touch-target px-4 py-2.5 rounded-xl bg-sand-200 hover:bg-sand-300 text-deepgreen-900 font-bold text-xs transition-colors"
          >
            {currentLanguage === 'hi' ? 'रद्द करें (काम जारी रखें)' : currentLanguage === 'mr' ? 'रद्द करा (काम सुरू ठेवा)' : 'Cancel (Keep Job)'}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="touch-target px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-warm transition-transform active:scale-95 disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>
              {isSubmitting
                ? currentLanguage === 'hi' ? 'काम छोड़ा जा रहा है...' : 'Exiting...'
                : currentLanguage === 'hi'
                ? 'पुष्टि करें: काम छोड़ें'
                : currentLanguage === 'mr'
                ? 'पुष्टी करा: काम सोडा'
                : 'Confirm: Exit Job'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
