import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  KeyRound,
  Lock,
  Languages,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  HardHat,
  Users,
  Award
} from 'lucide-react';
import { Language, AuthUser } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TRADES } from '../data/trades';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';
import kamaiLogo from '../assets/karmik-logo-white.png';

interface LandingPageProps {
  currentLanguage: Language;
  onOpenLanguageModal: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLanguage,
  onOpenLanguageModal,
  onLoginSuccess,
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
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    }, 350);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError(null);

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
      }, 900);
    }, 400);
  };

  const getAudioGuidance = (): string => {
    if (step === 'phone') {
      return currentLanguage === 'hi'
        ? 'कमाई में आपका स्वागत है। वेबसाइट में प्रवेश करने के लिए अपना 10 अंकों का मोबाइल नंबर डालें और ओटीपी पाएं दबाएं। डेमो नंबर 9876543210 उपलब्ध है।'
        : currentLanguage === 'mr'
        ? 'कमाईमध्ये आपले स्वागत आहे. वेबसाईटमध्ये प्रवेश करण्यासाठी आपला १० अंकी मोबाईल नंबर टाका आणि ओटीपी मिळवा दाबा. डेमो नंबर 9876543210 उपलब्ध आहे.'
        : 'Welcome to KAMAI. To enter the website, enter your 10-digit mobile number and click Get OTP. Demo number 9876543210 is ready.';
    }
    return currentLanguage === 'hi'
      ? 'अपने फोन पर आया 4 अंकों का कोड दर्ज करें। डेमो कोड 1234 है। कोड भरकर सत्यापित करें और वेबसाइट में प्रवेश करें।'
      : currentLanguage === 'mr'
      ? 'आपल्या फोनवर आलेला ४ अंकी कोड टाका. डेमो कोड 1234 आहे. कोड टाकून वेबसाईटमध्ये प्रवेश करा.'
      : 'Enter the 4-digit code. Demo code is 1234. Click verify to enter the website.';
  };

  const getLangBadge = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'हिन्दी';
      case 'mr':
        return 'मराठी';
      default:
        return 'English';
    }
  };

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col text-nearblack font-sans">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-sand-300 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border-2 border-sand-300 shadow-warm-xs p-1">
              <img src={kamaiLogo} alt="KAMAI" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-deepgreen-900 font-hindi">
                  {t.appTitle}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sand-200 text-deepgreen-800">
                  {currentLanguage === 'hi' ? 'सीधा काम' : currentLanguage === 'mr' ? 'थेट काम' : 'Direct Work'}
                </span>
              </div>
              <p className="text-[11px] text-nearblack-subtle font-medium">
                {currentLanguage === 'hi'
                  ? 'सीधा काम • तय दिहाड़ी'
                  : currentLanguage === 'mr'
                  ? 'थेट काम • ठरलेली मजुरी'
                  : 'Direct & Dignified Discovery'}
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            <SunkeSamjhoButton textToSpeak={getAudioGuidance()} lang={currentLanguage} />
            <button
              type="button"
              onClick={onOpenLanguageModal}
              className="touch-target px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-nearblack border border-sand-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
              aria-label="Change language"
            >
              <Languages className="w-4 h-4 text-deepgreen-800" />
              <span>{getLangBadge()}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* LEFT COLUMN: Brand Presentation, Pillars & Trades */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-navy-800 text-ivory-50 shadow-warm-xs">
              <Sparkles className="w-3.5 h-3.5 text-sand-300" />
              <span>
                {currentLanguage === 'hi' ? 'मुंबई लेबर नाका डिजिटल मंच' : currentLanguage === 'mr' ? 'मुंबई मजूर नाका डिजिटल व्यासपीठ' : 'Mumbai Labour Naka Platform'}
              </span>
            </div>

            {/* Main Brand Hero: KAMAI & Logo */}
            <div className="space-y-3">
              <div className="flex items-center gap-3.5 sm:gap-4 pt-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-white border-2 border-sand-300 shadow-warm-md p-2 flex items-center justify-center shrink-0">
                  <img src={kamaiLogo} alt="KAMAI" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-900 tracking-tight font-hindi leading-none">
                    KAMAI <span className="text-sand-600 font-extrabold">| कमाई</span>
                  </h1>
                  <p className="text-xs sm:text-sm font-bold text-navy-800 tracking-wider uppercase mt-1.5 sm:mt-2">
                    {currentLanguage === 'hi'
                      ? 'सीधा काम • तय दिहाड़ी'
                      : currentLanguage === 'mr'
                      ? 'थेट काम • ठरलेली मजुरी'
                      : 'Direct Work • Fair Daily Wages'}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-nearblack-subtle leading-relaxed max-w-xl font-medium pt-1">
                {currentLanguage === 'hi'
                  ? 'मुंबई के लेबर नाकों से सीधे जुड़े ठेकेदारों और कामगारों का अपना भरोसेमंद मंच। सीधे मोबाइल नंबर से लॉगिन करें और सभी काम, पहचान कार्ड व तय दिहाड़ी देखें।'
                  : currentLanguage === 'mr'
                  ? 'मुंबईतील मजूर नाक्यांशी थेट जोडलेले कामगार आणि कंत्राटदारांचे हक्काचे व्यासपीठ. थेट मोबाईल नंबरने लॉगिन करा आणि सर्व कामे व ओळखपत्र पहा.'
                  : 'Mumbai’s transparent daily-wage discovery platform for skilled craftspeople and contractors. Sign in with your mobile to browse nakas, verify locked wages, and connect directly.'}
              </p>
            </div>

            {/* 4 Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-warm-xs flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy-100 text-navy-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-navy-800" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-navy-900 font-hindi">
                    {currentLanguage === 'hi' ? '100% तय दिहाड़ी' : currentLanguage === 'mr' ? '१००% ठरलेली मजुरी' : 'Locked Wages'}
                  </h4>
                  <p className="text-[11px] text-nearblack-subtle mt-0.5">
                    {currentLanguage === 'hi' ? 'पहले पक्का: शाम को कोई कटौति नहीं' : currentLanguage === 'mr' ? 'कामाआधी पक्की मजुरी' : 'Pre-agreed terms before start'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-warm-xs flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sand-200 text-navy-900 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-navy-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-navy-900 font-hindi">
                    {currentLanguage === 'hi' ? 'सीधा संपर्क' : currentLanguage === 'mr' ? 'थेट संपर्क' : 'Direct Calling'}
                  </h4>
                  <p className="text-[11px] text-nearblack-subtle mt-0.5">
                    {currentLanguage === 'hi' ? 'मालिक से सीधा फोन, शून्य कमीशन' : currentLanguage === 'mr' ? 'थेट मालकाशी बोला, ०% कमिशन' : 'Zero commission, direct phone'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-warm-xs flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sand-300 text-navy-900 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-navy-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-navy-900 font-hindi">
                    {currentLanguage === 'hi' ? 'पहचान कार्ड' : currentLanguage === 'mr' ? 'ओळखपत्र' : 'Pehchaan Card'}
                  </h4>
                  <p className="text-[11px] text-nearblack-subtle mt-0.5">
                    {currentLanguage === 'hi' ? 'हुनर व रेट्स का डिजिटल पहचान पत्र' : currentLanguage === 'mr' ? 'आपले डिजिटल ओळखपत्र' : 'Shareable digital skill card'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-warm-xs flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sand-200 text-navy-900 flex items-center justify-center shrink-0">
                  <HardHat className="w-5 h-5 text-navy-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-deepgreen-900 font-hindi">
                    {currentLanguage === 'hi' ? 'मुंबई के लेबर नाके' : currentLanguage === 'mr' ? 'मुंबईतील मजूर नाके' : 'Mumbai Nakas'}
                  </h4>
                  <p className="text-[11px] text-nearblack-subtle mt-0.5">
                    {currentLanguage === 'hi' ? 'दादर, अंधेरी, कुर्ला, ठाणे नाका' : currentLanguage === 'mr' ? 'दादर, अंधेरी, कुर्ला, ठाणे' : 'Dadar, Andheri, Kurla, Thane'}
                  </p>
                </div>
              </div>
            </div>

            {/* Popular Trades preview */}
            <div className="pt-2">
              <span className="text-xs font-bold text-deepgreen-900 uppercase tracking-wider block mb-2 font-hindi">
                {currentLanguage === 'hi' ? 'लोकप्रिय हुनर व कामे:' : currentLanguage === 'mr' ? 'लोकप्रिय कामे:' : 'Popular Trades:'}
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {TRADES.slice(0, 6).map((tr) => (
                  <span
                    key={tr.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sand-200/90 text-deepgreen-900 text-xs font-semibold border border-sand-300"
                  >
                    <span>{tr.name[currentLanguage] || tr.name.en}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Sign In / Register Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border-2 border-sand-300 shadow-warm-xl p-5 sm:p-7 space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-sand-200 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-deepgreen-900 text-ivory-50 flex items-center justify-center shadow-warm-xs">
                    <Phone className="w-5 h-5 text-sand-300" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-deepgreen-900 font-hindi">
                      {t.loginTitle}
                    </h2>
                    <p className="text-xs text-nearblack-subtle">
                      {currentLanguage === 'hi'
                        ? 'मोबाइल नंबर से प्रवेश करें'
                        : currentLanguage === 'mr'
                        ? 'मोबाईल नंबरने प्रवेश करा'
                        : 'Sign in with your mobile number'}
                    </p>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-sand-100 flex items-center justify-center text-deepgreen-900">
                  <Lock className="w-3.5 h-3.5 text-deepgreen-800" />
                </div>
              </div>

              {/* STEP 1: ENTER PHONE NUMBER */}
              {step === 'phone' && (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="landing-phone-input" className="block text-xs font-bold text-deepgreen-900 mb-1.5">
                      {t.phoneLabel}
                    </label>
                    <div className="flex items-center rounded-xl border-2 border-sand-300 bg-ivory-50 focus-within:border-terracotta-500 shadow-warm-xs overflow-hidden">
                      <div className="flex items-center gap-1.5 px-3 py-3 bg-sand-200 border-r border-sand-300 text-xs font-bold text-deepgreen-900 select-none">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        id="landing-phone-input"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setPhone(val);
                          setError(null);
                        }}
                        placeholder="98765 43210"
                        className="flex-1 px-3 py-3 text-sm font-semibold tracking-wider text-nearblack bg-transparent focus:outline-hidden"
                      />
                    </div>
                    <p className="text-[11px] text-nearblack-subtle mt-1.5">
                      {t.loginSubtitle}
                    </p>
                  </div>

                  {/* Demo Quick Button */}
                  <div className="p-3 rounded-xl bg-sand-100 border border-sand-300 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-nearblack-subtle flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
                      <span>{currentLanguage === 'hi' ? 'डेमो नंबर:' : currentLanguage === 'mr' ? 'डेमो नंबर:' : 'Demo number:'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPhone('9876543210');
                        setError(null);
                      }}
                      className="px-2.5 py-1 rounded-md bg-white border border-sand-300 text-deepgreen-900 font-bold hover:bg-sand-200 transition-colors shadow-xs"
                    >
                      9876543210
                    </button>
                  </div>

                  {/* Optional Name */}
                  <div>
                    <label htmlFor="landing-name-input" className="block text-xs font-semibold text-deepgreen-900 mb-1">
                      {t.nameOptionalLabel}
                    </label>
                    <input
                      id="landing-name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={currentLanguage === 'hi' ? 'उदा. रमेश कुमार' : currentLanguage === 'mr' ? 'उदा. रमेश कुमार' : 'e.g. Ramesh Kumar'}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-ivory-50 border border-sand-300 rounded-xl text-nearblack focus:border-terracotta-500 focus:outline-hidden"
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
                    className="touch-target w-full py-3.5 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 disabled:opacity-50 text-ivory-50 text-sm font-bold flex items-center justify-center gap-2 shadow-warm transition-all"
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
                          className="w-12 h-14 text-center text-xl font-extrabold rounded-xl border-2 border-sand-300 bg-ivory-50 text-deepgreen-900 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20 focus:outline-hidden shadow-warm-xs"
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
                    className="touch-target w-full py-3.5 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 disabled:opacity-50 text-ivory-50 text-sm font-bold flex items-center justify-center gap-2 shadow-warm transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-sand-300" />
                    <span>{isSubmitting ? '...' : t.verifyAndSignIn}</span>
                  </button>
                </div>
              )}

              {/* STEP 3: SUCCESS STATE */}
              {step === 'success' && (
                <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-2 border-emerald-300 shadow-warm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-extrabold text-deepgreen-900 font-hindi">
                    {t.loginSuccess}
                  </h3>
                  <p className="text-xs text-nearblack-subtle">
                    +91 {phone} • {currentLanguage === 'hi' ? 'वेबसाइट खुल रही है...' : currentLanguage === 'mr' ? 'वेबसाईट सुरू होत आहे...' : 'Entering website...'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-sand-300 bg-white py-4 px-4 text-center text-xs text-nearblack-subtle">
        <p className="font-hindi">
          <strong>KAMAI | कमाई</strong> • {currentLanguage === 'hi' ? 'हर हुनर की सही कमाई' : currentLanguage === 'mr' ? 'प्रत्येक कौशल्याची योग्य कमाई' : 'Fair wages for every skill'} • हेल्पलाइन: 14434
        </p>
      </footer>
    </div>
  );
};
