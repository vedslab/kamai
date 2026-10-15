import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { Language, AuthUser } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  currentLanguage: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('phone');
      setPhone('');
      setOtp(['', '', '', '']);
      setName('');
      setError(null);
      setResendTimer(30);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Resend OTP countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError(
        currentLanguage === 'hi'
          ? 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें'
          : currentLanguage === 'mr'
          ? 'कृपया १० अंकांचा योग्य मोबाईल नंबर टाका'
          : 'Please enter a valid 10-digit mobile number'
      );
      return;
    }

    setError(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setResendTimer(30);
      // Auto focus first OTP input
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    }, 400);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError(null);

    // Auto-advance to next input
    if (digit && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleAutofillDemoOtp = () => {
    setOtp(['1', '2', '3', '4']);
    setError(null);
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setError(
        currentLanguage === 'hi'
          ? 'कृपया 4 अंकों का पूरा कोड दर्ज करें'
          : currentLanguage === 'mr'
          ? 'कृपया ४ अंकांचा कोड टाका'
          : 'Please enter all 4 digits of the OTP'
      );
      return;
    }

    // Accept demo OTP "1234" or any 4 digits in demo mode
    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');

      const fullUser: AuthUser = {
        phone: `+91 ${phone.replace(/\D/g, '')}`,
        name: name.trim() || undefined,
        registeredAt: new Date().toISOString(),
      };

      setTimeout(() => {
        onLoginSuccess(fullUser);
        onClose();
      }, 1100);
    }, 500);
  };

  const getAudioGuidance = () => {
    if (step === 'phone') {
      return currentLanguage === 'hi'
        ? 'कमाई में लॉगिन करने के लिए अपना 10 अंकों का मोबाइल नंबर डालें और ओटीपी पाएं बटन दबाएं।'
        : currentLanguage === 'mr'
        ? 'कमाईमध्ये लॉगिन करण्यासाठी आपला १० अंकी मोबाईल नंबर टाका आणि ओटीपी मिळवा बटण दाबा.'
        : 'Enter your 10 digit mobile number to receive a verification code and sign in.';
    }
    return currentLanguage === 'hi'
      ? 'अपने फोन पर आया 4 अंकों का कोड दर्ज करें। डेमो कोड 1234 है।'
      : currentLanguage === 'mr'
      ? 'आपल्या फोनवर आलेला ४ अंकी कोड टाका. डेमो कोड 1234 आहे.'
      : 'Enter the 4-digit code sent to your phone. Demo code is 1234.';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nearblack/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md bg-ivory-50 rounded-2xl border-2 border-sand-300 shadow-warm-xl overflow-hidden animate-in zoom-in-95">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-sand-300 flex items-center justify-between bg-sand-100/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-deepgreen-900 text-ivory-50 flex items-center justify-center shadow-warm-xs">
              <Phone className="w-4 h-4 text-sand-300" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-base sm:text-lg font-bold text-deepgreen-900 font-hindi leading-tight">
                {t.loginTitle}
              </h2>
              <p className="text-[11px] text-nearblack-subtle">
                KAMAI • बिना किसी पासवर्ड के
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <SunkeSamjhoButton textToSpeak={getAudioGuidance()} lang={currentLanguage} compact />
            <button
              type="button"
              onClick={onClose}
              className="touch-target p-1.5 rounded-lg text-nearblack-subtle hover:text-nearblack hover:bg-sand-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* STEP 1: ENTER PHONE NUMBER */}
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label htmlFor="auth-phone-input" className="block text-xs font-bold text-deepgreen-900 mb-1.5">
                  {t.phoneLabel}
                </label>
                <div className="flex items-center rounded-xl border-2 border-sand-300 bg-white focus-within:border-terracotta-500 shadow-warm-xs overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-3 bg-sand-200/80 border-r border-sand-300 text-xs font-bold text-deepgreen-900 select-none">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    id="auth-phone-input"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    autoFocus
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(val);
                      setError(null);
                    }}
                    placeholder="98765 43210"
                    className="flex-1 px-3 py-3 text-sm font-semibold tracking-wider text-nearblack bg-transparent focus:outline-hidden"
                  />
                  {phone && (
                    <button
                      type="button"
                      onClick={() => setPhone('')}
                      className="p-2 text-nearblack-subtle hover:text-nearblack"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-nearblack-subtle mt-1.5">
                  {t.loginSubtitle}
                </p>
              </div>

              {/* Demo number quick suggestion chip */}
              <div className="p-2.5 rounded-xl bg-sand-100 border border-sand-300 flex items-center justify-between text-xs">
                <span className="text-[11px] text-nearblack-subtle flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
                  <span>Demo number:</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPhone('9876543210');
                    setError(null);
                  }}
                  className="px-2 py-0.5 rounded-md bg-white border border-sand-300 text-deepgreen-900 font-bold hover:bg-sand-200 transition-colors"
                >
                  9876543210
                </button>
              </div>

              {/* Optional Name */}
              <div>
                <label htmlFor="auth-name-input" className="block text-xs font-semibold text-deepgreen-900 mb-1">
                  {t.nameOptionalLabel}
                </label>
                <input
                  id="auth-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-sand-300 rounded-xl text-nearblack focus:border-terracotta-500 focus:outline-hidden"
                />
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || phone.replace(/\D/g, '').length !== 10}
                className="touch-target w-full py-3 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 disabled:opacity-50 text-ivory-50 text-sm font-bold flex items-center justify-center gap-2 shadow-warm transition-all"
              >
                <span>{isSubmitting ? '...' : t.getOtpCTA}</span>
                <ArrowRight className="w-4 h-4 text-sand-300" />
              </button>
            </form>
          )}

          {/* STEP 2: ENTER OTP */}
          {step === 'otp' && (
            <div className="space-y-4">
              {/* Phone info & Change number */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-sand-100 border border-sand-300">
                <div>
                  <span className="text-[11px] text-nearblack-subtle block">
                    {t.otpSentTo}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-deepgreen-900">
                    +91 {phone}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setOtp(['', '', '', '']);
                    setError(null);
                  }}
                  className="text-xs font-bold text-terracotta-600 hover:text-terracotta-700 underline"
                >
                  {t.changeNumber}
                </button>
              </div>

              {/* Demo Mode Notice with One-Tap Autofill */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <KeyRound className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-bold text-emerald-900 truncate">
                    {t.demoOtpNotice}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutofillDemoOtp}
                  className="touch-target px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-ivory-50 text-xs font-bold shrink-0 shadow-xs transition-colors"
                >
                  {t.autofillOtp}
                </button>
              </div>

              {/* 4 OTP Digit Inputs */}
              <div>
                <label className="block text-xs font-bold text-deepgreen-900 mb-2 text-center">
                  {t.enterOtpTitle}
                </label>
                <div className="flex items-center justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputRefs.current[idx] = el;
                      }}
                      type="tel"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-12 h-14 text-center text-xl font-extrabold rounded-xl border-2 border-sand-300 bg-white text-deepgreen-900 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20 focus:outline-hidden shadow-warm-xs"
                      aria-label={`Digit ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-medium text-center">
                  {error}
                </div>
              )}

              {/* Resend Timer & Action */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <span className="text-xs text-nearblack-subtle font-medium">
                    {t.resendIn} <strong className="text-deepgreen-900">{resendTimer}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setResendTimer(30);
                      setError(null);
                    }}
                    className="text-xs font-bold text-terracotta-600 hover:text-terracotta-700 inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.resendOtp}</span>
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                disabled={isSubmitting || otp.join('').length !== 4}
                className="touch-target w-full py-3 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 disabled:opacity-50 text-ivory-50 text-sm font-bold flex items-center justify-center gap-2 shadow-warm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-sand-300" />
                <span>{isSubmitting ? '...' : t.verifyAndSignIn}</span>
              </button>
            </div>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {step === 'success' && (
            <div className="py-6 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-2 border-emerald-300 shadow-warm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-deepgreen-900 font-hindi">
                {t.loginSuccess}
              </h3>
              <p className="text-xs text-nearblack-subtle">
                +91 {phone} • KAMAI ID सक्रिय है
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
