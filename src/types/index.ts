export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'worker' | 'employer';

export type ActiveTab = 'home' | 'work' | 'explore' | 'trades' | 'mycard' | 'pehle_pakka' | 'rights' | 'post_job';

export interface Trade {
  id: string;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  subtitle: {
    en: string;
    hi: string;
    mr: string;
  };
  iconName: string;
  category: 'construction' | 'maintenance' | 'finishing' | 'cleaning' | 'general';
  avgDailyRate: {
    min: number;
    max: number;
  };
}

export interface Area {
  id: string;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  city: string;
  nakaName: string;
  landmark: string;
  zone?: string;
}

export type PaymentTiming = 
  | 'cash_at_evening' 
  | 'upi_at_evening' 
  | 'half_advance_half_end' 
  | 'immediate_task_end'
  | 'weekly_saturday';

export type WageType = 'per_day' | 'fixed_task' | 'per_hour';

export type CompletenessState = 'complete' | 'mostly_complete';

export type SortOption = 'recommended' | 'wage_desc' | 'wage_asc' | 'duration_short' | 'earliest';

export interface Job {
  id: string;
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  tradeId: string;
  employerName: string;
  employerType: 'homeowner' | 'contractor' | 'small_business';
  phone: string; // Safe fictional demo number
  wageAmount: number;
  wageType: WageType;
  paymentTiming: PaymentTiming;
  city: string;
  areaId: string;
  areaName: string;
  nakaPoint: string;
  dateCategory: 'today' | 'tomorrow' | 'upcoming';
  jobDate: string;
  timing: string;
  durationHours: number;
  durationText: {
    en: string;
    hi: string;
    mr: string;
  };
  toolsSuppliedBy: 'employer' | 'worker' | 'mutual';
  toolsDetails: {
    en: string;
    hi: string;
    mr: string;
  };
  description: {
    en: string;
    hi: string;
    mr: string;
  };
  toolsProvided: boolean;
  chaiLunchProvided: boolean;
  overtimePaid: boolean;
  overtimeRatePerHour?: number;
  safetyNotes: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  completenessState: CompletenessState;
  isFictionalDemo: boolean;
  isCustomEmployerJob?: boolean;
  vacancies: number;
  postedAt: string;
}

export type ExperienceRange = 'less_than_2' | '2_to_5' | '5_to_10' | 'more_than_10';

export interface WorkerProfile {
  name: string; // Optional first name or nickname
  phone: string;
  tradeId: string;
  experienceRange: ExperienceRange;
  experienceYears: number;
  city: string;
  preferredNaka: string;
  dailyRateExpected: number;
  availableToday: boolean;
  hasOwnTools: boolean;
  hasSmartPhone: boolean;
  safetyTrained: boolean;
  hideContactOnPrint: boolean;
  lastUpdated: string;
}

export interface PreWorkAgreement {
  id: string;
  jobId?: string;
  jobTitle: string;
  workerName: string;
  employerName: string;
  employerPhone: string;
  tradeName: string;
  location: string;
  agreedWage: number;
  wageBasis: string;
  workingHours: string;
  overtimeRatePerHour: number;
  paymentTiming: string;
  materialsProvidedBy: 'employer' | 'worker' | 'mutual';
  chaiLunchProvided: boolean;
  safetyEquipmentAgreed: boolean;
  confirmedAt: string;
  status: 'draft' | 'agreed';
  userAcknowledged: boolean;
}

export interface InterestApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  workerName: string;
  workerPhone: string;
  employerName: string;
  employerPhone: string;
  submittedAt: string;
  method: 'simulated_call' | 'simulated_message';
  status: 'sent_demo';
}

export interface WelfareResource {
  id: string;
  category: 'schemes' | 'safety' | 'rights' | 'helplines';
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  summary: {
    en: string;
    hi: string;
    mr: string;
  };
  keyDetails: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  contactOrLink?: string;
  isPhoneNumber?: boolean;
  cautiousNote: {
    en: string;
    hi: string;
    mr: string;
  };
}

export interface AuthUser {
  phone: string;
  name?: string;
  registeredAt: string;
}
