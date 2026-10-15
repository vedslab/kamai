import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Edit3,
  Share2,
  Printer,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  Wrench,
  Check,
  ShieldCheck,
  CheckCircle2,
  X,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertTriangle,
  PlusCircle,
  IndianRupee,
  HelpCircle,
  Star
} from 'lucide-react';
import { WorkerProfile, Language, Trade, ExperienceRange } from '../types';
import { TRADES } from '../data/trades';
import { AREAS } from '../data/areas';
import { TRANSLATIONS } from '../data/translations';
import { TradeIcon } from './TradeIcon';
import { SunkeSamjhoButton } from './SunkeSamjhoButton';
import kamaiLogo from '../assets/karmik-logo-white.png';

interface MeraKaamCardProps {
  profile: WorkerProfile | null;
  onUpdateProfile: (updated: WorkerProfile) => void;
  onDeleteProfile: () => void;
  currentLanguage: Language;
}

export const MeraKaamCard: React.FC<MeraKaamCardProps> = ({
  profile,
  onUpdateProfile,
  onDeleteProfile,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // Wizard state (when creating or editing in 3-5 simple steps)
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isWizardOpen && !isDeleteModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isWizardOpen) setIsWizardOpen(false);
        if (isDeleteModalOpen) setIsDeleteModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isWizardOpen, isDeleteModalOpen]);

  // Privacy-safe print switch: excludes private contact details by default
  const [hideContactOnPrint, setHideContactOnPrint] = useState<boolean>(
    profile ? profile.hideContactOnPrint ?? true : true
  );

  // Wizard draft state
  const [draftTradeId, setDraftTradeId] = useState<string>(profile ? profile.tradeId : TRADES[0].id);
  const [draftExpRange, setDraftExpRange] = useState<ExperienceRange>(profile ? profile.experienceRange || '5_to_10' : '2_to_5');
  const [draftNaka, setDraftNaka] = useState<string>(profile ? profile.preferredNaka : AREAS[0].nakaName);
  const [draftHasTools, setDraftHasTools] = useState<boolean>(profile ? profile.hasOwnTools : true);
  const [draftDailyRate, setDraftDailyRate] = useState<number>(profile ? profile.dailyRateExpected : 950);
  const [draftName, setDraftName] = useState<string>(profile ? profile.name : '');
  const [draftPhone, setDraftPhone] = useState<string>(profile ? profile.phone : '+91-98765-43210');

  // Synchronize draft state when profile changes (e.g. on user login)
  useEffect(() => {
    if (profile) {
      setDraftTradeId(profile.tradeId);
      setDraftExpRange(profile.experienceRange || '2_to_5');
      setDraftNaka(profile.preferredNaka);
      setDraftHasTools(profile.hasOwnTools);
      setDraftDailyRate(profile.dailyRateExpected);
      setDraftName(profile.name);
      setDraftPhone(profile.phone);
    }
  }, [profile]);

  const currentTrade = TRADES.find(tr => tr.id === (profile ? profile.tradeId : draftTradeId)) || TRADES[0];

  const openCreateWizard = () => {
    setWizardStep(1);
    setDraftTradeId(profile ? profile.tradeId : TRADES[0].id);
    setDraftExpRange(profile ? profile.experienceRange || '2_to_5' : '2_to_5');
    setDraftNaka(profile ? profile.preferredNaka : AREAS[0].nakaName);
    setDraftHasTools(profile ? profile.hasOwnTools : true);
    setDraftDailyRate(profile ? profile.dailyRateExpected : TRADES[0].avgDailyRate.min);
    setDraftName(profile ? profile.name : '');
    setDraftPhone(profile ? profile.phone : '+91-98765-43210');
    setIsWizardOpen(true);
  };

  const handleSaveWizard = () => {
    let years = 3;
    if (draftExpRange === 'less_than_2') years = 1;
    else if (draftExpRange === '2_to_5') years = 4;
    else if (draftExpRange === '5_to_10') years = 7;
    else if (draftExpRange === 'more_than_10') years = 12;

    const updatedProfile: WorkerProfile = {
      name: draftName.trim() || profile?.name || (currentLanguage === 'hi' ? 'कुशल कारीगर' : currentLanguage === 'mr' ? 'कुशल कारागीर' : 'Skilled Craftsman'),
      phone: draftPhone.trim() || profile?.phone || '+91-98765-43210',
      tradeId: draftTradeId,
      experienceRange: draftExpRange,
      experienceYears: years,
      city: 'Mumbai',
      preferredNaka: draftNaka.trim() || AREAS[0].nakaName,
      dailyRateExpected: draftDailyRate,
      availableToday: true,
      hasOwnTools: draftHasTools,
      hasSmartPhone: true,
      safetyTrained: true,
      hideContactOnPrint,
      rating: profile?.rating || 4.9,
      ratingCount: profile?.ratingCount || 28,
      lastUpdated: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    onUpdateProfile(updatedProfile);
    setIsWizardOpen(false);
  };

  const handleShare = async () => {
    if (!profile) return;
    const tradeName = currentTrade.name[currentLanguage] || currentTrade.name.en;
    const shareText = `*KAMAI Pehchaan Card*\n👤 ${profile.name}\n⭐ ${profile.rating || 4.9} (${profile.ratingCount || 28} reviews)\n🛠️ ${tradeName}\n⏳ ${profile.experienceYears} ${t.yearsExp}\n📍 ${profile.preferredNaka}, Mumbai\n💰 ₹${profile.dailyRateExpected}/day`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Kaam Card - ${profile.name}`,
          text: shareText,
        });
        return;
      } catch {
        // Fallback
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getCardSpeechText = (): string => {
    if (!profile) return t.emptyCardDesc;
    const tradeName = currentTrade.name[currentLanguage] || currentTrade.name.en;
    return `${profile.name}। हुनर: ${tradeName}। अनुभव: ${profile.experienceYears} वर्ष। नियमित नाका: ${profile.preferredNaka}। अपेक्षित दिहाड़ी: ${profile.dailyRateExpected} रुपये प्रतिदिन।`;
  };

  const getExpRangeLabel = (range: ExperienceRange) => {
    switch (range) {
      case 'less_than_2':
        return t.expLess2;
      case '2_to_5':
        return t.exp2to5;
      case '5_to_10':
        return t.exp5to10;
      case 'more_than_10':
        return t.expMore10;
      default:
        return t.exp2to5;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-deepgreen-900 font-hindi flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-terracotta-500" />
            <span>{t.myKaamCard}</span>
          </h2>
          <p className="text-xs sm:text-sm text-nearblack-muted">
            {t.cardHelpText}
          </p>
        </div>

        {profile && (
          <div className="flex items-center gap-2">
            <SunkeSamjhoButton
              textToSpeak={getCardSpeechText()}
              lang={currentLanguage}
            />

            <button
              type="button"
              onClick={openCreateWizard}
              className="touch-target px-3 py-2 rounded-lg bg-sand-200 hover:bg-sand-300 text-deepgreen-900 border border-sand-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-4 h-4 text-terracotta-600" />
              <span>{currentLanguage === 'hi' ? 'बदलें' : currentLanguage === 'mr' ? 'बदला' : 'Edit'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="touch-target p-2 rounded-lg bg-sand-100 hover:bg-red-50 text-red-600 border border-sand-300 transition-colors"
              title={t.deleteCardCTA}
              aria-label={t.deleteCardCTA}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* STATE A: NO CARD CREATED YET (EMPTY STATE) */}
      {!profile && (
        <div className="p-8 text-center bg-ivory-50 rounded-2xl border-2 border-dashed border-sand-400 space-y-4 shadow-warm-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-sand-200 text-deepgreen-900 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-terracotta-500" />
          </div>

          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="font-extrabold text-lg sm:text-xl text-deepgreen-900 font-hindi">
              {t.emptyCardTitle}
            </h3>
            <p className="text-xs sm:text-sm text-nearblack-muted leading-relaxed">
              {t.emptyCardDesc}
            </p>
            <div className="p-2.5 rounded-lg bg-sand-100 text-[11px] font-semibold text-deepgreen-900 border border-sand-200 mt-2">
              ✓ {t.noDocsNotice}
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateWizard}
            className="touch-target px-6 py-3 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-bold text-sm shadow-warm flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <PlusCircle className="w-5 h-5 text-sand-300" />
            <span>{t.startWizardCTA}</span>
          </button>
        </div>
      )}

      {/* STATE B: BEAUTIFUL, DIGNIFIED WORK CARD SUMMARY */}
      {profile && (
        <div className="space-y-4">
          {/* THE ACTUAL DIGNIFIED CARD VIEW (Screen & Print optimized) */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-sand-400 bg-gradient-to-br from-ivory-50 via-sand-100 to-ivory-50 shadow-warm-md p-5 sm:p-7 text-nearblack">
            {/* Card Header: Brand Seal + Pehchaan Badge */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-sand-300/80">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-sand-300 flex items-center justify-center p-1 shadow-warm overflow-hidden">
                  <img src={kamaiLogo} alt="KAMAI" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-extrabold text-xs uppercase tracking-wider text-deepgreen-900 block font-hindi">
                    {t.printTitle}
                  </span>
                  <span className="text-[10px] text-nearblack-subtle block">
                    Zero Certificates or Resume Required • KAMAI Pehchaan Card
                  </span>
                </div>
              </div>

              {/* Pehchaan & Rating Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{profile.rating || 4.9} ★</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-sand-200 text-deepgreen-900 border border-sand-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-deepgreen-800" />
                  <span>{currentLanguage === 'hi' ? 'सत्यापित हुनर' : currentLanguage === 'mr' ? 'कौशल्य ओळख' : 'Skill Identity'}</span>
                </div>
              </div>
            </div>

            {/* Card Body: Worker Name, Rating, Skill, Experience Level */}
            <div className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="sm:col-span-2 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-nearblack-subtle">
                  {t.workerName}
                </span>

                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-deepgreen-900 tracking-tight font-hindi">
                    {profile.name}
                  </h3>

                  {/* USER RATING BADGE */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 shadow-warm-xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span className="font-extrabold text-sm sm:text-base">{profile.rating || 4.9}</span>
                    <span className="text-xs text-amber-800 font-semibold">
                      ({profile.ratingCount || 28} {currentLanguage === 'hi' ? 'समीक्षाएं' : currentLanguage === 'mr' ? 'अभिप्राय' : 'reviews'})
                    </span>
                  </div>
                </div>

                {/* Skill & Experience Level Badges */}
                <div className="pt-1 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sand-200 text-deepgreen-900 border border-sand-300 text-sm font-bold">
                    <TradeIcon iconName={currentTrade.iconName} className="w-4 h-4" />
                    <span>{currentTrade.name[currentLanguage] || currentTrade.name.en}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-sand-200 text-deepgreen-900 border border-sand-300">
                    <Clock className="w-3.5 h-3.5 text-deepgreen-800" />
                    <span>{getExpRangeLabel(profile.experienceRange || '2_to_5')}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% {currentLanguage === 'hi' ? 'समय पर तय काम' : currentLanguage === 'mr' ? 'वेळेवर काम' : 'On-Time Verified'}</span>
                  </span>
                </div>
              </div>

              {/* Expected Daily Rate Box */}
              <div className="bg-sand-200/80 border border-sand-300 p-3.5 rounded-xl text-center sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-nearblack-subtle block">
                  {t.dailyRate}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-deepgreen-900 block">
                  ₹{profile.dailyRateExpected}
                </span>
                <span className="text-[10px] font-medium text-deepgreen-800 block">
                  {currentLanguage === 'hi' ? 'मानक तय दर' : currentLanguage === 'mr' ? 'मानक ठरलेला दर' : 'Standard Expected Rate'}
                </span>
              </div>
            </div>

            {/* Card Footer: Regular Naka + Tools Status + Privacy Phone Handling */}
            <div className="pt-4 border-t border-sand-300/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-deepgreen-900 font-semibold">
                  <MapPin className="w-4 h-4 text-terracotta-500 shrink-0" />
                  <span>{profile.preferredNaka}</span>
                  <span className="text-nearblack-subtle">({profile.city})</span>
                </div>

                {/* Phone number display respecting privacy print state */}
                <div className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-4 h-4 text-deepgreen-800 shrink-0" />
                  {hideContactOnPrint ? (
                    <span className="text-nearblack-subtle italic text-[11px]">
                      {profile.phone.slice(0, 7)}XXXXX ({currentLanguage === 'hi' ? 'गोपनीयता के लिए छिपाया गया' : currentLanguage === 'mr' ? 'गोपनीयतेसाठी लपवले' : 'Hidden for privacy'})
                    </span>
                  ) : (
                    <span className="font-bold text-deepgreen-900">{profile.phone}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:justify-end text-[11px]">
                {profile.hasOwnTools && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-ivory-50 border border-sand-300 text-deepgreen-900 font-medium">
                    <Wrench className="w-3.5 h-3.5 text-deepgreen-800" />
                    <span>{t.toolsStatus}</span>
                  </span>
                )}

                {profile.safetyTrained && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-ivory-50 border border-sand-300 text-deepgreen-900 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-deepgreen-800" />
                    <span>{currentLanguage === 'hi' ? 'सुरक्षा नियम ज्ञात' : currentLanguage === 'mr' ? 'सुरक्षा नियम माहिती' : 'Safety Aware'}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Privacy Switch for Downloadable / Printable Work Card */}
          <div className="p-3.5 rounded-xl border border-sand-300 bg-sand-100/70 flex items-center justify-between text-xs no-print">
            <div className="flex items-center gap-2">
              {hideContactOnPrint ? (
                <EyeOff className="w-4 h-4 text-terracotta-600" />
              ) : (
                <Eye className="w-4 h-4 text-deepgreen-800" />
              )}
              <div>
                <span className="font-bold text-deepgreen-900 block">{t.privacyMaskLabel}</span>
                <span className="text-[11px] text-nearblack-subtle">
                  {hideContactOnPrint ? t.privacyMaskActive : t.privacyMaskInactive}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextVal = !hideContactOnPrint;
                setHideContactOnPrint(nextVal);
                onUpdateProfile({ ...profile, hideContactOnPrint: nextVal });
              }}
              className={`touch-target px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                hideContactOnPrint
                  ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900'
                  : 'bg-sand-200 text-nearblack-muted border-sand-300'
              }`}
            >
              {hideContactOnPrint ? (currentLanguage === 'hi' ? 'छिपा हुआ' : currentLanguage === 'mr' ? 'लपवलेले' : 'Hidden') : (currentLanguage === 'hi' ? 'दिखाएं' : currentLanguage === 'mr' ? 'दाखवा' : 'Visible')}
            </button>
          </div>

          {/* Action Controls: Share & Print/Download */}
          <div className="flex items-center gap-3 no-print">
            <button
              type="button"
              onClick={handleShare}
              className="touch-target flex-1 px-4 py-3 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-warm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{t.copiedNotice}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-sand-300" />
                  <span>{t.shareCard}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="touch-target flex-1 px-4 py-3 rounded-xl bg-sand-200 hover:bg-sand-300 text-deepgreen-900 border border-sand-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-terracotta-600" />
              <span>{t.printCard}</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. MERA KAAM CARD 3-5 STEP WIZARD MODAL */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-nearblack/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full sm:max-w-lg max-h-[92vh] bg-ivory-100 rounded-t-2xl sm:rounded-2xl border border-sand-300 shadow-warm-lg overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wizard-step-title"
          >
            {/* Wizard Header with Progress */}
            <div className="px-5 py-3.5 border-b border-sand-200 bg-sand-100 flex items-center justify-between">
              <div>
                <h3 id="wizard-step-title" className="font-bold text-base text-deepgreen-900 font-hindi">
                  {t.createCardHeading}
                </h3>
                <span className="text-[11px] text-nearblack-subtle block font-semibold">
                  Step {wizardStep} of 5
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsWizardOpen(false)}
                className="touch-target p-1.5 text-nearblack-subtle hover:text-nearblack rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Progress Indicators */}
            <div className="px-5 pt-3 pb-1 flex items-center justify-between gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    s <= wizardStep ? 'bg-terracotta-500' : 'bg-sand-300'
                  }`}
                />
              ))}
            </div>

            {/* Wizard Step Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* STEP 1: CHOOSE PRIMARY SKILL */}
              {wizardStep === 1 && (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-deepgreen-900 font-hindi">
                      {t.wizardStep1}
                    </h4>
                    <p className="text-xs text-nearblack-muted">
                      {currentLanguage === 'hi' ? 'आप जिस काम में माहिर हैं उसे चुनें' : currentLanguage === 'mr' ? 'तुम्ही ज्या कामात कुशल आहात ते निवडा' : 'Choose the trade you practice at the naka'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                    {TRADES.map((trade) => {
                      const isSelected = draftTradeId === trade.id;
                      return (
                        <button
                          key={trade.id}
                          type="button"
                          onClick={() => {
                            setDraftTradeId(trade.id);
                            setDraftDailyRate(trade.avgDailyRate.min);
                          }}
                          className={`touch-target p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-terracotta-50 border-terracotta-500 ring-2 ring-terracotta-500/50'
                              : 'bg-ivory-50 border-sand-300 hover:bg-sand-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-sand-200 flex items-center justify-center text-deepgreen-900">
                              <TradeIcon iconName={trade.iconName} className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-xs text-deepgreen-900 block leading-tight">
                                {trade.name[currentLanguage] || trade.name.en}
                              </span>
                              <span className="text-[10px] text-terracotta-700 font-semibold">
                                ₹{trade.avgDailyRate.min}–₹{trade.avgDailyRate.max}/day
                              </span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-terracotta-600 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT EXPERIENCE RANGE */}
              {wizardStep === 2 && (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-deepgreen-900 font-hindi">
                      {t.wizardStep2}
                    </h4>
                    <p className="text-xs text-nearblack-muted">
                      {currentLanguage === 'hi' ? 'काम के अनुभव का सही दायरा चुनें' : currentLanguage === 'mr' ? 'कामाच्या अनुभवाचा कालावधी निवडा' : 'Select your practical hands-on experience level'}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { key: 'less_than_2', label: t.expLess2, desc: currentLanguage === 'hi' ? 'बुनियादी काम जानते हैं, सीखने के इच्छुक' : currentLanguage === 'mr' ? 'प्राथमिक काम माहित आहे, शिकण्याची इच्छा' : 'Basic tasks, learning trade' },
                      { key: '2_to_5', label: t.exp2to5, desc: currentLanguage === 'hi' ? 'रोजमर्रा के काम बिना सहारे कर सकते हैं' : currentLanguage === 'mr' ? 'दैनंदिन कामे स्वतंत्रपणे करू शकतात' : 'Can handle standard daily tasks independently' },
                      { key: '5_to_10', label: t.exp5to10, desc: currentLanguage === 'hi' ? 'जटिल काम और समस्याओं का समाधान' : currentLanguage === 'mr' ? 'गुंतागुंतीच्या कामांचा अनुभव व कौशल्य' : 'Senior experience, problem-solving on complex sites' },
                      { key: 'more_than_10', label: t.expMore10, desc: currentLanguage === 'hi' ? 'दशकों का तजुर्बा, टीम का नेतृत्व' : currentLanguage === 'mr' ? 'दीर्घ अनुभव, टीमचे नेतृत्व करण्याची क्षमता' : 'Master craftsman, lead mistri capability' },
                    ].map((item) => {
                      const isSelected = draftExpRange === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setDraftExpRange(item.key as ExperienceRange)}
                          className={`touch-target w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900 shadow-warm-sm'
                              : 'bg-ivory-50 text-nearblack border-sand-300 hover:bg-sand-100'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-xs sm:text-sm block">
                              {item.label}
                            </span>
                            <span className={`text-[11px] block ${isSelected ? 'text-sand-200' : 'text-nearblack-muted'}`}>
                              {item.desc}
                            </span>
                          </div>
                          {isSelected && <Check className="w-5 h-5 text-sand-300 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: SELECT PREFERRED NAKA / AREA */}
              {wizardStep === 3 && (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-deepgreen-900 font-hindi">
                      {t.wizardStep3}
                    </h4>
                    <p className="text-xs text-nearblack-muted">
                      {currentLanguage === 'hi' ? 'आप आमतौर पर किस लेबर नाके पर खड़े होते हैं?' : currentLanguage === 'mr' ? 'तुम्ही सहसा कोणत्या मजूर नाक्यावर उभे राहता?' : 'Which Mumbai hiring chowk or naka do you stand at?'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {AREAS.map((area) => {
                      const isSelected = draftNaka === area.nakaName;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setDraftNaka(area.nakaName)}
                          className={`touch-target p-2.5 rounded-lg border text-left text-xs transition-all ${
                            isSelected
                              ? 'bg-terracotta-500 text-ivory-50 border-terracotta-600 font-bold'
                              : 'bg-ivory-50 text-deepgreen-900 border-sand-300 hover:bg-sand-100'
                          }`}
                        >
                          <span className="block truncate">{area.nakaName}</span>
                          <span className={`text-[10px] block ${isSelected ? 'text-ivory-100' : 'text-nearblack-subtle'}`}>
                            {area.name[currentLanguage] || area.name.en}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deepgreen-900 mb-1">
                      {currentLanguage === 'hi' ? 'या दूसरा नाका / चौक लिखें' : currentLanguage === 'mr' ? 'किंवा इतर नाका / चौक लिहा' : 'Or type custom naka name'}
                    </label>
                    <input
                      type="text"
                      value={draftNaka}
                      onChange={(e) => setDraftNaka(e.target.value)}
                      placeholder="e.g. Dadar West / Andheri Station"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-sand-50 border border-sand-300 rounded-lg text-nearblack focus:border-terracotta-500"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: TOOLS & WAGE */}
              {wizardStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-deepgreen-900 font-hindi">
                      {t.wizardStep4}
                    </h4>
                    <p className="text-xs text-nearblack-muted">
                      {currentLanguage === 'hi' ? 'औजार और प्रतिदिन दिहाड़ी की जानकारी' : currentLanguage === 'mr' ? 'हत्यारे आणि अपेक्षित रोजंदारीची माहिती' : 'Specify your tools and expected daily wage'}
                    </p>
                  </div>

                  {/* Has Hand Tools Checkbox */}
                  <label className="p-3.5 rounded-xl border border-sand-300 bg-sand-50 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-terracotta-500" />
                      <span className="font-bold text-xs text-deepgreen-900">{t.hasToolsQuestion}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={draftHasTools}
                      onChange={(e) => setDraftHasTools(e.target.checked)}
                      className="w-5 h-5 text-terracotta-500 rounded border-sand-400"
                    />
                  </label>

                  {/* Expected Daily Rate Stepper */}
                  <div className="p-3.5 rounded-xl border border-sand-300 bg-sand-50 space-y-2">
                    <label className="block text-xs font-bold text-deepgreen-900 flex items-center justify-between">
                      <span>{t.rateExpectationLabel}</span>
                      <span className="text-[11px] text-terracotta-600 font-semibold">
                        Avg: ₹{currentTrade.avgDailyRate.min}–₹{currentTrade.avgDailyRate.max}
                      </span>
                    </label>
                    <div className="flex items-center gap-3">
                      <IndianRupee className="w-5 h-5 text-terracotta-500" />
                      <input
                        type="number"
                        step="50"
                        min="500"
                        max="4000"
                        value={draftDailyRate}
                        onChange={(e) => setDraftDailyRate(parseInt(e.target.value) || 500)}
                        className="w-32 px-3 py-2 text-base font-extrabold text-terracotta-600 bg-ivory-50 border border-sand-300 rounded-lg text-center"
                      />
                      <span className="text-xs text-deepgreen-900 font-medium">{t.wagePerDay}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: OPTIONAL FIRST NAME */}
              {wizardStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-deepgreen-900 font-hindi">
                      {t.wizardStep5}
                    </h4>
                    <p className="text-xs text-nearblack-muted">
                      {currentLanguage === 'hi' ? 'केवल आपका पहला नाम या उपनाम' : currentLanguage === 'mr' ? 'फक्त तुमचे पहिले नाव किंवा टोपणनाव' : 'Your first name or nickname — no certificates or ID proof needed'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deepgreen-900 mb-1">
                      {t.workerName}
                    </label>
                    <input
                      type="text"
                      placeholder={currentLanguage === 'hi' ? 'उदा: मोहन लाल या रमेश' : currentLanguage === 'mr' ? 'उदा: मोहन लाल किंवा रमेश' : 'e.g. Mohan Lal or Sunil'}
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-lg text-nearblack focus:border-terracotta-500"
                    />
                  </div>

                  {/* Reassurance Seal */}
                  <div className="p-3 rounded-xl bg-deepgreen-50 border border-deepgreen-700/20 text-deepgreen-900 text-xs flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">
                        {currentLanguage === 'hi' ? 'कोई कागजी झंझट नहीं' : currentLanguage === 'mr' ? 'कोणतीही कागदपत्रांची अडचण नाही' : 'Dignity First • Zero Formal Documents'}
                      </span>
                      <p className="text-[11px] text-deepgreen-800 leading-relaxed mt-0.5">
                        {t.noDocsNotice}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Navigation Footer */}
            <div className="p-4 bg-sand-100 border-t border-sand-200 flex items-center justify-between gap-3">
              {wizardStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep(wizardStep - 1)}
                  className="touch-target-primary px-4 py-2.5 rounded-xl border border-sand-300 bg-ivory-50 text-nearblack font-semibold text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.prevStep}</span>
                </button>
              ) : (
                <div />
              )}

              {wizardStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep(wizardStep + 1)}
                  className="touch-target-primary px-5 py-2.5 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-bold text-xs flex items-center gap-1.5 shadow-warm ml-auto"
                >
                  <span>{t.nextStep}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveWizard}
                  className="touch-target-primary px-6 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-ivory-50 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-warm ml-auto"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.saveCardAction}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nearblack/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-ivory-100 rounded-2xl border border-sand-300 p-5 space-y-4 shadow-warm-lg">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-deepgreen-900 font-hindi">
                {t.confirmDeleteTitle}
              </h3>
              <p className="text-xs text-nearblack-muted">
                {t.confirmDeleteDesc}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="touch-target-primary flex-1 py-2.5 rounded-xl border border-sand-300 bg-ivory-50 text-nearblack font-semibold text-xs"
              >
                {t.cancelAction}
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteProfile();
                  setIsDeleteModalOpen(false);
                }}
                className="touch-target-primary flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-ivory-50 font-bold text-xs shadow-warm"
              >
                {t.deleteConfirmAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
