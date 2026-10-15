import React, { useState, useMemo } from 'react';
import {
  Language,
  ActiveTab,
  Job,
  WorkerProfile,
  PreWorkAgreement,
  SortOption,
  AuthUser
} from './types';
import { TRANSLATIONS } from './data/translations';
import { TRADES } from './data/trades';
import { AREAS } from './data/areas';
import {
  getSavedLanguage,
  saveLanguage,
  getWorkerProfile,
  saveWorkerProfile,
  deleteWorkerProfile,
  getSavedJobIds,
  toggleSaveJobId,
  getAllJobs,
  addCustomJob,
  getAgreements,
  saveAgreement,
  getAuthUser,
  saveAuthUser,
  clearAuthUser
} from './utils/storage';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { TradeSelector } from './components/TradeSelector';
import { AreaSelector } from './components/AreaSelector';
import { JobCard } from './components/JobCard';
import { JobDetailModal } from './components/JobDetailModal';
import { MeraKaamCard } from './components/MeraKaamCard';
import { PehlePakkaModal } from './components/PehlePakkaModal';
import { SimulatedContactModal } from './components/SimulatedContactModal';
import { WelfareSection } from './components/WelfareSection';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './components/LandingPage';
import { SunkeSamjhoButton } from './components/SunkeSamjhoButton';
import { LocationCard } from './components/LocationCard';
import { HomeQuickCards } from './components/HomeQuickCards';
import { HomePromoBanners } from './components/HomePromoBanners';
import { HomeTrustAndReferral } from './components/HomeTrustAndReferral';
import { WorkFiltersTab, TimeFilter, DateFilter } from './components/WorkFiltersTab';
import { TradeIcon } from './components/TradeIcon';
import {
  Calendar,
  Sparkles,
  Search,
  X,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  ArrowUpDown,
  ArrowLeft,
  Wrench,
  PlusCircle
} from 'lucide-react';

export const App: React.FC = () => {
  // Core application state with LocalStorage persistence
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getSavedLanguage);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [workerProfile, setWorkerProfile] = useState<WorkerProfile | null>(getWorkerProfile);
  const [jobs, setJobs] = useState<Job[]>(getAllJobs);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(getSavedJobIds);
  const [agreements, setAgreements] = useState<PreWorkAgreement[]>(getAgreements);

  // Filters, Search & Sorting
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Modals state for Worker Journey
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [selectedJobForPakka, setSelectedJobForPakka] = useState<Job | null>(null);
  const [activeAgreement, setActiveAgreement] = useState<PreWorkAgreement | null>(null);
  const [isPehlePakkaModalOpen, setIsPehlePakkaModalOpen] = useState(false);
  const [isSimulatedContactOpen, setIsSimulatedContactOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(getAuthUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');

  const t = TRANSLATIONS[currentLanguage];

  // Effective profile fallback with user login name and rating
  const effectiveProfile: WorkerProfile = useMemo(() => {
    const currentName = authUser?.name || workerProfile?.name || (currentLanguage === 'hi' ? 'कुशल कारीगर' : currentLanguage === 'mr' ? 'कुशल कारागीर' : 'Skilled Craftsman');
    const currentPhone = authUser?.phone || workerProfile?.phone || '+91-98765-43210';
    const rating = workerProfile?.rating ?? 4.9;
    const ratingCount = workerProfile?.ratingCount ?? 28;

    if (workerProfile) {
      return {
        ...workerProfile,
        name: authUser?.name || workerProfile.name,
        phone: authUser?.phone || workerProfile.phone,
        rating,
        ratingCount,
      };
    }
    return {
      name: currentName,
      phone: currentPhone,
      tradeId: 'plumber',
      experienceRange: '2_to_5',
      experienceYears: 4,
      city: 'Mumbai',
      preferredNaka: 'Dadar Kabutar Khana Naka',
      dailyRateExpected: 950,
      availableToday: false,
      hasOwnTools: true,
      hasSmartPhone: true,
      safetyTrained: true,
      hideContactOnPrint: true,
      rating,
      ratingCount,
      lastUpdated: new Date().toLocaleDateString('en-IN')
    };
  }, [workerProfile, authUser, currentLanguage]);

  // Helper for current selected trade
  const activeTrade = useMemo(() => {
    return TRADES.find(tr => tr.id === selectedTradeId) || null;
  }, [selectedTradeId]);

  // Update language handler
  const handleSelectLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    saveLanguage(lang);
    setLiveAnnouncement(
      lang === 'hi'
        ? 'भाषा बदलकर हिंदी की गई'
        : lang === 'mr'
        ? 'भाषा बदलून मराठी केली'
        : 'Language changed to English'
    );
  };

  // Update worker profile handler
  const handleUpdateProfile = (updated: WorkerProfile) => {
    setWorkerProfile(updated);
    saveWorkerProfile(updated);
  };

  // Delete worker profile handler
  const handleDeleteProfile = () => {
    deleteWorkerProfile();
    setWorkerProfile(null);
    setLiveAnnouncement(
      currentLanguage === 'hi'
        ? 'काम कार्ड हटा दिया गया'
        : currentLanguage === 'mr'
        ? 'काम कार्ड हटवले'
        : 'Kaam Card deleted'
    );
  };

  // Auth handlers (Phone + Demo OTP)
  const handleLoginSuccess = (user: AuthUser) => {
    saveAuthUser(user);
    setAuthUser(user);
    // User should ALWAYS land on Home page when logging in
    setActiveTab('home');
    setSelectedTradeId(null);
    setSelectedAreaId(null);
    setDateFilter('all');
    setTimeFilter('all');
    setSearchQuery('');
    setOnlySaved(false);
    window.scrollTo({ top: 0, behavior: 'instant' });

    // The name user logs in with MUST reflect in pehchaan card!
    if (user.name) {
      const base = workerProfile || {
        name: user.name,
        phone: user.phone,
        tradeId: 'plumber',
        experienceRange: '2_to_5' as const,
        experienceYears: 4,
        city: 'Mumbai',
        preferredNaka: 'Dadar Kabutar Khana Naka',
        dailyRateExpected: 950,
        availableToday: false,
        hasOwnTools: true,
        hasSmartPhone: true,
        safetyTrained: true,
        hideContactOnPrint: true,
        rating: 4.9,
        ratingCount: 28,
        lastUpdated: new Date().toLocaleDateString('en-IN')
      };
      handleUpdateProfile({
        ...base,
        name: user.name,
        phone: user.phone,
        rating: base.rating ?? 4.9,
        ratingCount: base.ratingCount ?? 28,
      });
    }

    setLiveAnnouncement(
      currentLanguage === 'hi'
        ? 'सफलतापूर्वक लॉगिन हो गए। होम पेज पर आपका स्वागत है।'
        : currentLanguage === 'mr'
        ? 'यशस्वीरित्या लॉगिन झाले. मुख्य पानावर आपले स्वागत आहे.'
        : 'Signed in successfully. Welcome to Home.'
    );
  };

  const handleLogout = () => {
    clearAuthUser();
    setAuthUser(null);
    setActiveTab('home');
    setSelectedTradeId(null);
    setSelectedAreaId(null);
    setDateFilter('all');
    setTimeFilter('all');
    setSearchQuery('');
    setOnlySaved(false);
    setLiveAnnouncement(
      currentLanguage === 'hi'
        ? 'लॉगआउट कर दिया गया'
        : currentLanguage === 'mr'
        ? 'लॉगआउट केले'
        : 'Logged out successfully'
    );
  };

  // Toggle save job
  const handleToggleSaveJob = (jobId: string) => {
    const updated = toggleSaveJobId(jobId);
    const isNowSaved = updated.includes(jobId);
    setSavedJobIds(updated);
    setLiveAnnouncement(
      isNowSaved
        ? (currentLanguage === 'hi' ? 'काम सहेजा गया' : currentLanguage === 'mr' ? 'काम सेव्ह केले' : 'Job saved to list')
        : (currentLanguage === 'hi' ? 'काम सूची से हटाया गया' : currentLanguage === 'mr' ? 'काम यादीतून काढले' : 'Job removed from saved list')
    );
  };

  // Add custom employer job
  const handleAddJob = (newJob: Job, navigateToTrade: boolean = false) => {
    const updated = addCustomJob(newJob);
    setJobs(updated);
    setLiveAnnouncement(
      currentLanguage === 'hi'
        ? 'नया काम सफलतापूर्वक पोस्ट किया गया'
        : currentLanguage === 'mr'
        ? 'नवीन काम यशस्वीरित्या पोस्ट केले'
        : 'New job posted successfully'
    );
    if (navigateToTrade) {
      setSelectedTradeId(newJob.tradeId);
      setDateFilter('all');
      setSelectedAreaId(null);
      setOnlySaved(false);
      setActiveTab('explore');
      setTimeout(() => {
        const feed = document.getElementById('jobs-feed');
        if (feed) {
          feed.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    }
  };

  // Save Pre-Work Agreement
  const handleSaveAgreement = (agreement: PreWorkAgreement) => {
    const updated = saveAgreement(agreement);
    setAgreements(updated);
    setActiveAgreement(agreement);
  };

  // STEP 3 → 4: Open Pehle Pakka with a specific job
  const handleOpenPehlePakka = (job?: Job) => {
    setSelectedJobForPakka(job || null);
    setIsPehlePakkaModalOpen(true);
  };

  // STEP 4 → 5: Proceed from Pehle Pakka to Simulated Contact
  const handleProceedToContact = (agreement: PreWorkAgreement) => {
    setActiveAgreement(agreement);
    setIsPehlePakkaModalOpen(false);
    setIsSimulatedContactOpen(true);
  };

  // Filtered and Sorted jobs calculation
  const filteredJobs = useMemo(() => {
    const result = jobs.filter((job) => {
      // Saved filter
      if (onlySaved && !savedJobIds.includes(job.id)) {
        return false;
      }
      // Date filter
      if (dateFilter === 'today' && job.dateCategory !== 'today') {
        return false;
      }
      if (dateFilter === 'tomorrow' && job.dateCategory !== 'tomorrow') {
        return false;
      }
      // Time filter
      if (timeFilter !== 'all') {
        const timingLower = job.timing.toLowerCase();
        if (timeFilter === 'morning') {
          const isMorning = timingLower.startsWith('8:') || timingLower.startsWith('8.') || timingLower.startsWith('08:') ||
                            timingLower.startsWith('9:') || timingLower.startsWith('9.') || timingLower.startsWith('09:');
          if (!isMorning) return false;
        } else if (timeFilter === 'midday') {
          const isMidday = timingLower.startsWith('10:') || timingLower.startsWith('11:') || timingLower.startsWith('12:');
          if (!isMidday) return false;
        } else if (timeFilter === 'short_task') {
          if (job.durationHours > 6 && job.wageType !== 'fixed_task') return false;
        }
      }
      // Trade filter
      if (selectedTradeId && job.tradeId !== selectedTradeId) {
        return false;
      }
      // Area filter
      if (selectedAreaId && job.areaId !== selectedAreaId) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleEn = job.title.en.toLowerCase();
        const titleHi = (job.title.hi || '').toLowerCase();
        const titleMr = (job.title.mr || '').toLowerCase();
        const naka = job.nakaPoint.toLowerCase();
        const area = job.areaName.toLowerCase();
        const desc = (job.description[currentLanguage] || job.description.en).toLowerCase();

        return (
          titleEn.includes(q) ||
          titleHi.includes(q) ||
          titleMr.includes(q) ||
          naka.includes(q) ||
          area.includes(q) ||
          desc.includes(q)
        );
      }
      return true;
    });

    // Sort without obscuring wage basis
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'wage_desc':
          return b.wageAmount - a.wageAmount;
        case 'wage_asc':
          return a.wageAmount - b.wageAmount;
        case 'duration_short':
          return a.durationHours - b.durationHours;
        case 'earliest':
          return a.timing.localeCompare(b.timing);
        case 'recommended':
        default:
          return 0; // Default curated order
      }
    });
  }, [jobs, onlySaved, savedJobIds, dateFilter, selectedTradeId, selectedAreaId, searchQuery, sortBy, currentLanguage]);

  const getFeedSpeechText = (): string => {
    if (currentLanguage === 'hi') {
      return `मुंबई के लेबर नाकों पर ${filteredJobs.length} काम उपलब्ध हैं। अपनी पसंद का काम चुनें, तय दिहाड़ी देखें और सीधे संपर्क करें।`;
    } else if (currentLanguage === 'mr') {
      return `मुंबईतील मजूर नाक्यांवर ${filteredJobs.length} कामे उपलब्ध आहेत. काम निवडा, ठरलेली मजुरी पहा आणि थेट संपर्क करा.`;
    } else {
      return `${filteredJobs.length} work opportunities available across Mumbai nakas. Direct contact and transparent daily wages.`;
    }
  };

  // UN-AUTHENTICATED STATE: Separate Landing & Login Gateway Page
  // The user only enters the main website and sees all pages after logging in.
  if (!authUser) {
    return (
      <div className="min-h-screen bg-ivory-100 flex flex-col text-nearblack font-sans">
        {/* Screen-Reader Live Region for dynamic announcements */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {liveAnnouncement}
        </div>

        {/* Dedicated Landing / Welcome Gateway with Phone & Dummy OTP Sign In */}
        <LandingPage
          currentLanguage={currentLanguage}
          onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Language Selector Modal */}
        {isLanguageModalOpen && (
          <LanguageSelectorModal
            isOpen={isLanguageModalOpen}
            onClose={() => setIsLanguageModalOpen(false)}
            currentLanguage={currentLanguage}
            onSelectLanguage={handleSelectLanguage}
          />
        )}
      </div>
    );
  }

  // AUTHENTICATED STATE: Full Website Inside (all pages, bottom navigation, top logout button)
  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col text-nearblack font-sans pb-28">
      {/* Screen-Reader Live Region for dynamic announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Top Header */}
      <Header
        currentLanguage={currentLanguage}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        workerProfile={workerProfile}
        onNavigateToCard={() => setActiveTab('mycard')}
        onNavigateHome={() => {
          setSelectedTradeId(null);
          setActiveTab('home');
        }}
        authUser={authUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Navigation (Fixed Bottom Bar Only for all screens) */}
      <Navigation
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
        }}
        currentLanguage={currentLanguage}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 sm:py-6 space-y-6">
        {/* VIEW 0: HOME PAGE (Location Card -> Explore & Pehchaan Cards -> Filters Card -> Job Profiles Grid) */}
        {activeTab === 'home' && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in">
            {/* 1. SELECT LOCATION CARD (Showing current location / live naka point) */}
            <LocationCard
              selectedAreaId={selectedAreaId}
              onSelectArea={(areaId) => {
                setSelectedAreaId(areaId);
                setActiveTab('work');
              }}
              currentLanguage={currentLanguage}
            />

            {/* 2. DUAL ACTION CARDS (Schedule/Explore Work & Instant/Pehchaan Card from Reference) */}
            <HomeQuickCards
              jobCount={filteredJobs.length}
              onExploreClick={() => setActiveTab('work')}
              onNavigateToCard={() => setActiveTab('mycard')}
              currentLanguage={currentLanguage}
            />

            {/* 3. PROMO STRIP & WAGE VOUCHER CARD (Introducing favorite & pass style from Reference) */}
            <HomePromoBanners
              onOpenPehlePakka={() => setActiveTab('pehle_pakka')}
              onExploreWork={() => setActiveTab('work')}
              currentLanguage={currentLanguage}
            />

            {/* 4. "ONE EXPERT WHO CAN DO IT ALL" - TRADES & PROFILES GRID */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-navy-900 font-hindi flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-navy-800" />
                    <span>
                      {currentLanguage === 'hi'
                        ? 'सभी कामगार व हुनर (Profiles)'
                        : currentLanguage === 'mr'
                        ? 'सर्व कामगार व कौशल्ये'
                        : 'One Expert who can do it all'}
                    </span>
                  </h3>
                  <p className="text-xs text-nearblack-subtle">
                    {currentLanguage === 'hi'
                      ? 'अपना हुनर चुनें और तुरंत नाके के काम देखें'
                      : currentLanguage === 'mr'
                      ? 'आपले कौशल्य निवडा आणि थेट काम शोधा'
                      : 'Choose your trade to see instant work listings'}
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sand-200 text-navy-900 border border-sand-300">
                  {TRADES.length} {currentLanguage === 'hi' ? 'हुनर' : currentLanguage === 'mr' ? 'कौशल्ये' : 'Profiles'}
                </span>
              </div>

              {/* Modern 3-4 column square-rounded cards (matching the reference photo grid) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                {TRADES.map((trade) => {
                  const jobCountForTrade = jobs.filter((j) => j.tradeId === trade.id).length;
                  return (
                    <button
                      key={trade.id}
                      type="button"
                      onClick={() => {
                        setSelectedTradeId(trade.id);
                        setActiveTab('work');
                      }}
                      className="p-3.5 sm:p-4 rounded-3xl bg-white border border-sand-300 hover:border-navy-700 hover:shadow-warm text-left transition-all group flex flex-col justify-between gap-3 touch-target"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="w-11 h-11 rounded-2xl bg-sand-200 text-navy-900 group-hover:bg-sand-300 flex items-center justify-center transition-colors shadow-xs">
                          <TradeIcon iconName={trade.iconName} className="w-5 h-5 text-navy-800" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sand-100 text-navy-900 border border-sand-200">
                          {jobCountForTrade} {currentLanguage === 'hi' ? 'कामे' : currentLanguage === 'mr' ? 'कामे' : 'jobs'}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-navy-900 group-hover:text-navy-700 font-hindi truncate">
                          {trade.name[currentLanguage] || trade.name.en}
                        </h4>
                        <p className="text-[11px] text-navy-800 font-bold mt-1">
                          ₹{trade.avgDailyRate.min}–₹{trade.avgDailyRate.max}/दिन
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. EXPERTS VETTED FOR QUALITY / TRUST SEAL & REFERRAL (from Reference Image 2) */}
            <HomeTrustAndReferral currentLanguage={currentLanguage} />
          </div>
        )}

        {/* VIEW 1: WORK PAGE (ONLY filter bar & resulting job cards) */}
        {(activeTab === 'work' || activeTab === 'explore') && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in">
            {/* Top Navigation & Header Row */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="touch-target px-3 py-1.5 rounded-xl bg-ivory-50 border border-sand-300 text-xs font-bold text-deepgreen-900 hover:bg-sand-100 flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-terracotta-600" />
                <span>{currentLanguage === 'hi' ? '← होम' : currentLanguage === 'mr' ? '← होम' : '← Home'}</span>
              </button>

              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-deepgreen-900 font-hindi flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-terracotta-500" />
                  <span>{t.exploreJobs}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sand-200 text-deepgreen-800">
                    {filteredJobs.length} {currentLanguage === 'hi' ? 'काम' : currentLanguage === 'mr' ? 'कामे' : 'jobs'}
                  </span>
                </h2>
                <SunkeSamjhoButton
                  textToSpeak={getFeedSpeechText()}
                  lang={currentLanguage}
                />
              </div>
            </div>

            {/* ONLY THE FILTER BAR (Date, Time, Location, Job Profile) */}
            <WorkFiltersTab
              dateFilter={dateFilter}
              onDateChange={setDateFilter}
              timeFilter={timeFilter}
              onTimeChange={setTimeFilter}
              selectedAreaId={selectedAreaId}
              onAreaChange={setSelectedAreaId}
              selectedTradeId={selectedTradeId}
              onTradeChange={setSelectedTradeId}
              currentLanguage={currentLanguage}
              totalFilteredCount={filteredJobs.length}
            />

            {/* Search & Sort Row */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-nearblack-subtle pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-8 pr-7 py-2 text-xs bg-ivory-50 border border-sand-300 rounded-xl text-nearblack placeholder:text-nearblack-subtle focus:border-terracotta-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-nearblack-subtle hover:text-nearblack"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0 bg-ivory-50 border border-sand-300 rounded-xl px-2.5 py-2 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-nearblack-subtle" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-xs font-semibold text-deepgreen-900 focus:outline-hidden"
                >
                  <option value="recommended">{t.sortRecommended}</option>
                  <option value="wage_desc">{t.sortWageDesc}</option>
                  <option value="wage_asc">{t.sortWageAsc}</option>
                  <option value="duration_short">{t.sortDurationShort}</option>
                  <option value="earliest">{t.sortEarliest}</option>
                </select>
              </div>
            </div>

            {/* WORK DISCOVERY JOBS FEED */}
            <div id="jobs-feed" className="space-y-3 pt-1">
              {/* Jobs List */}
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      currentLanguage={currentLanguage}
                      isSaved={savedJobIds.includes(job.id)}
                      onToggleSave={handleToggleSaveJob}
                      onSelectJob={(j) => setSelectedJobForDetail(j)}
                      onOpenPehlePakka={(j) => handleOpenPehlePakka(j)}
                    />
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="p-8 text-center bg-ivory-50 rounded-2xl border border-sand-300 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-sand-200 text-deepgreen-900 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-nearblack-subtle" />
                  </div>
                  <h3 className="font-bold text-base text-deepgreen-900 font-hindi">
                    {t.emptyJobs}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTradeId(null);
                      setSelectedAreaId(null);
                      setDateFilter('all');
                      setTimeFilter('all');
                      setSearchQuery('');
                      setOnlySaved(false);
                      setSortBy('recommended');
                    }}
                    className="touch-target px-4 py-2 rounded-xl bg-deepgreen-800 text-ivory-50 font-bold text-xs shadow-warm"
                  >
                    {t.clearFilters}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: TRADES CATALOG (STEP 1) */}
        {activeTab === 'trades' && (
          <TradeSelector
            selectedTradeId={selectedTradeId}
            onSelectTrade={(id) => {
              setSelectedTradeId(id);
            }}
            currentLanguage={currentLanguage}
            onViewJobsForTrade={(id) => {
              setSelectedTradeId(id);
              setActiveTab('explore');
            }}
            onBackToHome={() => setActiveTab('explore')}
          />
        )}

        {/* VIEW 3: MERA KAAM CARD (Digital Skill Identity) */}
        {activeTab === 'mycard' && (
          <MeraKaamCard
            profile={effectiveProfile}
            onUpdateProfile={handleUpdateProfile}
            onDeleteProfile={handleDeleteProfile}
            currentLanguage={currentLanguage}
          />
        )}

        {/* VIEW 4: PEHLE PAKKA (Pre-work Terms & Past Agreements) */}
        {activeTab === 'pehle_pakka' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-deepgreen-900 font-hindi flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-terracotta-500" />
                  <span>{t.pehlePakkaTitle}</span>
                </h2>
                <p className="text-xs sm:text-sm text-nearblack-muted">
                  {t.pehlePakkaSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPehlePakka()}
                className="touch-target px-4 py-2.5 rounded-xl bg-deepgreen-800 hover:bg-deepgreen-900 text-ivory-50 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-warm"
              >
                <ShieldCheck className="w-4 h-4 text-sand-300" />
                <span>{currentLanguage === 'hi' ? '+ नया समझौता बनाएं' : currentLanguage === 'mr' ? '+ नवीन करार करा' : '+ Create Pre-Work Lock'}</span>
              </button>
            </div>

            {/* List of Previous Locked Agreements */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-deepgreen-900">
                {currentLanguage === 'hi' ? 'सहेजे गए समझौते (Saved Agreements)' : currentLanguage === 'mr' ? 'जतन केलेले करार' : 'Saved Agreements'}
              </h3>

              {agreements.length > 0 ? (
                <div className="space-y-3">
                  {agreements.map((agr) => (
                    <div
                      key={agr.id}
                      className="p-4 rounded-xl border border-sand-300 bg-ivory-50 shadow-warm-sm space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-sand-200 pb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-sm text-deepgreen-900">{agr.jobTitle}</span>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {currentLanguage === 'hi' ? 'तय शर्तें' : 'Locked'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <span className="text-nearblack-subtle block">तय मजदूरी:</span>
                          <span className="font-bold text-terracotta-600 text-sm">
                            ₹{agr.agreedWage} ({agr.wageBasis === 'per_day' ? 'Day' : agr.wageBasis === 'fixed_task' ? 'Task' : 'Hour'})
                          </span>
                        </div>
                        <div>
                          <span className="text-nearblack-subtle block">काम का समय:</span>
                          <span className="font-semibold text-deepgreen-900">{agr.workingHours}</span>
                        </div>
                        <div>
                          <span className="text-nearblack-subtle block">मालिक:</span>
                          <span className="font-semibold text-deepgreen-900">{agr.employerName}</span>
                        </div>
                        <div>
                          <span className="text-nearblack-subtle block">भुगतान:</span>
                          <span className="font-semibold text-deepgreen-900">{agr.paymentTiming}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-nearblack-subtle pt-1 border-t border-sand-200 flex items-center justify-between">
                        <span>दर्ज तारीख: {new Date(agr.confirmedAt).toLocaleDateString('en-IN')}</span>
                        <span className="text-deepgreen-800 font-medium">स्थान: {agr.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center bg-ivory-50 rounded-xl border border-sand-300 space-y-2">
                  <ShieldCheck className="w-8 h-8 text-sand-400 mx-auto" />
                  <p className="text-xs text-nearblack-muted">
                    {currentLanguage === 'hi'
                      ? 'अभी कोई समझौता नहीं बनाया गया है। नया काम शुरू करने से पहले "नया समझौता बनाएं" दबाएं।'
                      : 'No pre-work agreement created yet. Tap "+ Create Pre-Work Lock" before starting.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 5: WELFARE & RIGHTS */}
        {activeTab === 'rights' && (
          <WelfareSection currentLanguage={currentLanguage} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-sand-300 bg-sand-100/70 text-nearblack-muted py-6 px-4 mt-auto no-print">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-deepgreen-900 font-hindi">कमाई (KAMAI)</span>
            <span>•</span>
            <span>{currentLanguage === 'hi' ? 'सीधा काम • तय दिहाड़ी' : currentLanguage === 'mr' ? 'थेट काम • ठरलेली मजुरी' : 'Direct Work, Fair Daily Wages'}</span>
          </div>
          <p className="text-[11px] text-nearblack-subtle text-center sm:text-right">
            Dignified urban informal work discovery in Mumbai MMR • Built with React & Tailwind
          </p>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Language Selector Modal */}
      {isLanguageModalOpen && (
        <LanguageSelectorModal
          isOpen={isLanguageModalOpen}
          onClose={() => setIsLanguageModalOpen(false)}
          currentLanguage={currentLanguage}
          onSelectLanguage={handleSelectLanguage}
        />
      )}

      {/* 2. Job Detail Modal (STEP 3) */}
      {selectedJobForDetail && (
        <JobDetailModal
          job={selectedJobForDetail}
          onClose={() => setSelectedJobForDetail(null)}
          currentLanguage={currentLanguage}
          isSaved={savedJobIds.includes(selectedJobForDetail.id)}
          onToggleSave={handleToggleSaveJob}
          onOpenPehlePakka={(job) => {
            setSelectedJobForDetail(null);
            handleOpenPehlePakka(job);
          }}
        />
      )}

      {/* 3. Pehle Pakka Modal (STEP 4) */}
      {isPehlePakkaModalOpen && (
        <PehlePakkaModal
          job={selectedJobForPakka}
          workerProfile={effectiveProfile}
          isOpen={isPehlePakkaModalOpen}
          onClose={() => setIsPehlePakkaModalOpen(false)}
          onBackToDetails={() => {
            setIsPehlePakkaModalOpen(false);
            if (selectedJobForPakka) setSelectedJobForDetail(selectedJobForPakka);
          }}
          onProceedToContact={handleProceedToContact}
          currentLanguage={currentLanguage}
          onSaveAgreement={handleSaveAgreement}
        />
      )}

      {/* 4. Simulated Contact Modal (STEP 5) */}
      {isSimulatedContactOpen && selectedJobForPakka && (
        <SimulatedContactModal
          job={selectedJobForPakka}
          workerProfile={effectiveProfile}
          agreement={activeAgreement}
          isOpen={isSimulatedContactOpen}
          onClose={() => setIsSimulatedContactOpen(false)}
          onBackToPakka={() => {
            setIsSimulatedContactOpen(false);
            setIsPehlePakkaModalOpen(true);
          }}
          onReturnToBrowse={() => {
            setIsSimulatedContactOpen(false);
            setSelectedJobForPakka(null);
            setActiveTab('explore');
          }}
          currentLanguage={currentLanguage}
        />
      )}

      {/* 5. Phone & Demo OTP Login/Register Modal */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
};

export default App;
