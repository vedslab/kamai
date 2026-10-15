import { Language } from '../types';

let cachedVoices: SpeechSynthesisVoice[] = [];
let activeUtterance: SpeechSynthesisUtterance | null = null;
let keepAliveTimer: any = null;

// Populate voices as early as possible
const loadVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    const list = window.speechSynthesis.getVoices();
    if (list && list.length > 0) {
      cachedVoices = list;
    }
  } catch {
    cachedVoices = [];
  }
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

export const isSpeechSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
};

/**
 * Clean & normalize text for natural Indian pronunciation in Hindi and Marathi
 */
export const normalizeSpeechText = (rawText: string, lang: Language): string => {
  let cleaned = rawText
    // Remove markdown symbols and brackets
    .replace(/[*_#`~[\]()]/g, ' ')
    // Expand currency symbol into spoken words for Hindi/Marathi
    .replace(/₹\s*(\d+)/g, '$1 रुपये ')
    .replace(/₹/g, ' रुपये ')
    // Replace slash wages with clear spoken equivalents
    .replace(/\/\s*दिन/g, lang === 'mr' ? ' दररोज ' : ' प्रति दिन ')
    .replace(/\/\s*घंटा/g, lang === 'mr' ? ' दर तासाला ' : ' प्रति घंटा ')
    .replace(/\/\s*तास/g, ' दर तासाला ')
    .replace(/\/\s*काम/g, lang === 'mr' ? ' पूर्ण कामाचे ' : ' पूरे काम का ')
    // Normalize bullets and separators into natural breathing pauses
    .replace(/[•|]/g, ' , ')
    .replace(/[:]/g, ' : ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
};

/**
 * Intelligent voice selector:
 * 1. For Marathi: Tries Marathi (mr-IN, mr).
 *    If NOT found (common on Windows/Chrome), smoothly falls back to Hindi (hi-IN)
 *    because Hindi and Marathi share the Devanagari script, ensuring 100% fluent
 *    pronunciation without browser "language-unavailable" errors.
 * 2. For Hindi: Tries Hindi (hi-IN, hi).
 * 3. Fallback: Indian English (en-IN) or any Indian voice (*-IN).
 */
export const getBestVoiceForLanguage = (lang: Language): { voice: SpeechSynthesisVoice | null; actualLang: string } => {
  loadVoices();
  const voices = cachedVoices.length > 0 ? cachedVoices : (typeof window !== 'undefined' && window.speechSynthesis ? window.speechSynthesis.getVoices() : []);

  if (!voices || voices.length === 0) {
    return {
      voice: null,
      actualLang: lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'hi-IN' : 'en-IN'
    };
  }

  const isMatch = (v: SpeechSynthesisVoice, code: string, nameSub?: string) => {
    const l = (v.lang || '').toLowerCase().replace('_', '-');
    const n = (v.name || '').toLowerCase();
    if (l.startsWith(code.toLowerCase())) return true;
    if (nameSub && n.includes(nameSub.toLowerCase())) return true;
    return false;
  };

  if (lang === 'mr') {
    // 1. Try native Marathi voice
    const marathiVoice = voices.find(v => isMatch(v, 'mr', 'marathi') || v.name.includes('मराठी') || v.name.includes('Aarohi'));
    if (marathiVoice) {
      return { voice: marathiVoice, actualLang: marathiVoice.lang || 'mr-IN' };
    }

    // 2. Fallback to Hindi voice: Devanagari script is identical, reads Marathi fluently!
    const hindiVoice = voices.find(v => 
      isMatch(v, 'hi', 'hindi') || 
      v.name.includes('हिन्दी') || 
      v.name.includes('Swara') || 
      v.name.includes('Madhur') || 
      v.name.includes('Kalpana') || 
      v.name.includes('Hemant')
    );
    if (hindiVoice) {
      // Set actualLang to hi-IN so browser doesn't throw language-unavailable error
      return { voice: hindiVoice, actualLang: hindiVoice.lang || 'hi-IN' };
    }

    // 3. Indian English fallback
    const indianVoice = voices.find(v => (v.lang || '').toLowerCase().endsWith('-in') || (v.name || '').toLowerCase().includes('india'));
    if (indianVoice) {
      return { voice: indianVoice, actualLang: indianVoice.lang || 'hi-IN' };
    }

    return { voice: null, actualLang: 'hi-IN' };
  }

  if (lang === 'hi') {
    // 1. Try Hindi voice (Natural/Google/Microsoft)
    const hindiVoice = voices.find(v => 
      isMatch(v, 'hi', 'hindi') || 
      v.name.includes('हिन्दी') || 
      v.name.includes('Swara') || 
      v.name.includes('Madhur') || 
      v.name.includes('Kalpana') || 
      v.name.includes('Hemant')
    );
    if (hindiVoice) {
      return { voice: hindiVoice, actualLang: hindiVoice.lang || 'hi-IN' };
    }

    // 2. Indian English voice fallback
    const indianVoice = voices.find(v => (v.lang || '').toLowerCase().endsWith('-in') || (v.name || '').toLowerCase().includes('india'));
    if (indianVoice) {
      return { voice: indianVoice, actualLang: indianVoice.lang || 'hi-IN' };
    }

    return { voice: null, actualLang: 'hi-IN' };
  }

  // English (prefer Indian English accent)
  const indianEnVoice = voices.find(v => 
    isMatch(v, 'en-in', 'india') || 
    v.name.includes('Neerja') || 
    v.name.includes('Prabhat') || 
    v.name.includes('Rishi') || 
    v.name.includes('Heera')
  );
  if (indianEnVoice) {
    return { voice: indianEnVoice, actualLang: indianEnVoice.lang || 'en-IN' };
  }

  const anyEnVoice = voices.find(v => isMatch(v, 'en'));
  if (anyEnVoice) {
    return { voice: anyEnVoice, actualLang: anyEnVoice.lang || 'en-IN' };
  }

  return { voice: voices[0] || null, actualLang: 'en-IN' };
};

export const speakText = (
  text: string,
  lang: Language,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: string) => void
): (() => void) => {
  if (!isSpeechSupported()) {
    if (onError) onError('SpeechSynthesis is not supported on this device/browser.');
    return () => {};
  }

  try {
    // Stop any ongoing speech cleanly
    stopSpeech();

    const cleanText = normalizeSpeechText(text, lang);
    if (!cleanText) {
      if (onEnd) onEnd();
      return () => {};
    }

    const { voice, actualLang } = getBestVoiceForLanguage(lang);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    activeUtterance = utterance; // Prevent V8 garbage collection bug

    utterance.lang = actualLang;
    if (voice) {
      utterance.voice = voice;
    }

    // Calm, respectful, deliberate pace for clarity
    utterance.rate = 0.90;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      // Keepalive timer prevents Chrome from stalling on sentences > 10 seconds
      if (keepAliveTimer) clearInterval(keepAliveTimer);
      keepAliveTimer = setInterval(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 5000);

      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (keepAliveTimer) {
        clearInterval(keepAliveTimer);
        keepAliveTimer = null;
      }
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      if (keepAliveTimer) {
        clearInterval(keepAliveTimer);
        keepAliveTimer = null;
      }
      activeUtterance = null;

      // Normal browser cancellation/interruption events should not trigger visible error
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        if (onError) {
          onError(
            lang === 'hi'
              ? 'आवाज़ चलने में समस्या आई। कृपया दोबारा प्रयास करें।'
              : lang === 'mr'
              ? 'ऑडिओ प्लेबॅकमध्ये अडचण आली. कृपया पुन्हा प्रयत्न करा.'
              : (e.error || 'Audio playback error.')
          );
        }
      }
      if (onEnd) onEnd();
    };

    // Chrome resume workaround before speak
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);

    return () => {
      stopSpeech();
    };
  } catch (err: any) {
    stopSpeech();
    if (onError) onError(err?.message || 'Speech synthesis unavailable.');
    if (onEnd) onEnd();
    return () => {};
  }
};

export const stopSpeech = (): void => {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
  activeUtterance = null;
  if (isSpeechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
};
