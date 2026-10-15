import { Language } from '../types';

export const isSpeechSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
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
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean text of markdown asterisks or special characters for pleasant speech flow
    const cleanText = text
      .replace(/[*_#`~[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Set appropriate locale prefix
    let targetPrefix = 'en';
    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
      targetPrefix = 'hi';
    } else if (lang === 'mr') {
      utterance.lang = 'mr-IN';
      targetPrefix = 'mr';
    } else {
      utterance.lang = 'en-IN';
      targetPrefix = 'en';
    }

    // Try finding installed system voice matching target language
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const match = voices.find(v => v.lang.toLowerCase().startsWith(targetPrefix));
      if (match) {
        utterance.voice = match;
      }
    }

    utterance.rate = 0.88; // Calm, respectful, deliberate pace
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      // Normal browser cancellation events
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        if (onError) {
          onError(
            lang === 'hi'
              ? 'आवाज़ चलने में रुकावट आई। कृपया दोबारा प्रयास करें।'
              : lang === 'mr'
              ? 'ऑडिओ प्लेबॅकमध्ये त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'
              : (e.error || 'Audio playback error.')
          );
        }
      }
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);

    // Return a cancellation callback
    return () => {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    };
  } catch (err: any) {
    if (onError) onError(err?.message || 'Speech synthesis unavailable.');
    if (onEnd) onEnd();
    return () => {};
  }
};

export const stopSpeech = (): void => {
  if (isSpeechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
};
