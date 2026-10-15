import { Language, WorkerProfile, Job, PreWorkAgreement, InterestApplication, AuthUser } from '../types';
import { INITIAL_MOCK_JOBS } from '../data/mockJobs';

const STORAGE_KEYS = {
  LANGUAGE: 'kamai_language',
  WORKER_PROFILE: 'kamai_worker_profile',
  SAVED_JOBS: 'kamai_saved_jobs',
  CUSTOM_JOBS: 'kamai_custom_jobs',
  PRE_WORK_AGREEMENTS: 'kamai_agreements',
  INTEREST_APPLICATIONS: 'kamai_interest_apps',
  AVAILABLE_TODAY: 'kamai_available_today',
  RECENT_AREA: 'kamai_recent_area',
  AUTH_USER: 'kamai_auth_user',
};

export const getSavedLanguage = (): Language => {
  try {
    const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (lang === 'en' || lang === 'hi' || lang === 'mr') {
      return lang;
    }
  } catch {
    // Local storage fallback
  }
  return 'hi'; // Default to Hindi for high accessibility in Indian naka context
};

export const saveLanguage = (lang: Language): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  } catch {
    // Ignore storage errors
  }
};

export const getWorkerProfile = (): WorkerProfile | null => {
  try {
    if (localStorage.getItem('kamai_card_deleted') === 'true' || localStorage.getItem('karmik_card_deleted') === 'true' || localStorage.getItem('kaamsaathi_card_deleted') === 'true') {
      return null;
    }
  } catch {
    // Ignore
  }

  const defaultProfile: WorkerProfile = {
    name: 'Mohan Lal Mistri',
    phone: '+91-98765-43210',
    tradeId: 'plumber',
    experienceRange: '5_to_10',
    experienceYears: 7,
    city: 'Mumbai',
    preferredNaka: 'Dadar Kabutar Khana Naka',
    dailyRateExpected: 950,
    availableToday: true,
    hasOwnTools: true,
    hasSmartPhone: true,
    safetyTrained: true,
    hideContactOnPrint: true,
    lastUpdated: '15 Oct 2026'
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WORKER_PROFILE);
    if (saved) {
      return { ...defaultProfile, ...JSON.parse(saved) };
    }
  } catch {
    // Fallback
  }
  return defaultProfile;
};

export const saveWorkerProfile = (profile: WorkerProfile): void => {
  try {
    localStorage.removeItem('kamai_card_deleted');
    localStorage.removeItem('karmik_card_deleted');
    localStorage.removeItem('kaamsaathi_card_deleted');
    localStorage.setItem(STORAGE_KEYS.WORKER_PROFILE, JSON.stringify(profile));
  } catch {
    // Ignore
  }
};

export const deleteWorkerProfile = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.WORKER_PROFILE);
    localStorage.setItem('kamai_card_deleted', 'true');
  } catch {
    // Ignore
  }
};

export const getSavedJobIds = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore
  }
  return [];
};

export const toggleSaveJobId = (jobId: string): string[] => {
  const current = getSavedJobIds();
  const exists = current.includes(jobId);
  const updated = exists ? current.filter(id => id !== jobId) : [...current, jobId];
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(updated));
  } catch {
    // Ignore
  }
  return updated;
};

export const getAllJobs = (): Job[] => {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_JOBS);
    if (custom) {
      const parsed: Job[] = JSON.parse(custom);
      return [...parsed, ...INITIAL_MOCK_JOBS];
    }
  } catch {
    // Ignore
  }
  return INITIAL_MOCK_JOBS;
};

export const addCustomJob = (job: Job): Job[] => {
  try {
    const currentCustom = localStorage.getItem(STORAGE_KEYS.CUSTOM_JOBS);
    const parsed: Job[] = currentCustom ? JSON.parse(currentCustom) : [];
    const filtered = parsed.filter(j => j.id !== job.id);
    const updated = [job, ...filtered];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_JOBS, JSON.stringify(updated));
    return [...updated, ...INITIAL_MOCK_JOBS];
  } catch {
    return [job, ...INITIAL_MOCK_JOBS];
  }
};

export const getAgreements = (): PreWorkAgreement[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PRE_WORK_AGREEMENTS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore
  }
  return [];
};

export const saveAgreement = (agreement: PreWorkAgreement): PreWorkAgreement[] => {
  try {
    const current = getAgreements();
    const updated = [agreement, ...current.filter(a => a.id !== agreement.id)];
    localStorage.setItem(STORAGE_KEYS.PRE_WORK_AGREEMENTS, JSON.stringify(updated));
    return updated;
  } catch {
    return [agreement];
  }
};

export const getInterestApplications = (): InterestApplication[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.INTEREST_APPLICATIONS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore
  }
  return [];
};

export const saveInterestApplication = (app: InterestApplication): InterestApplication[] => {
  try {
    const current = getInterestApplications();
    const updated = [app, ...current.filter(a => a.id !== app.id)];
    localStorage.setItem(STORAGE_KEYS.INTEREST_APPLICATIONS, JSON.stringify(updated));
    return updated;
  } catch {
    return [app];
  }
};

export const getAuthUser = (): AuthUser | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore
  }
  return null;
};

export const saveAuthUser = (user: AuthUser): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
  } catch {
    // Ignore
  }
};

export const clearAuthUser = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  } catch {
    // Ignore
  }
};

