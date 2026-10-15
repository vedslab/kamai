import React, { useState, useEffect } from 'react';
import { Volume2, Square, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { speakText, stopSpeech, isSpeechSupported } from '../utils/speech';

interface SunkeSamjhoButtonProps {
  textToSpeak: string;
  lang: Language;
  label?: string;
  className?: string;
  compact?: boolean;
}

export const SunkeSamjhoButton: React.FC<SunkeSamjhoButtonProps> = ({
  textToSpeak,
  lang,
  label,
  className = '',
  compact = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const supported = isSpeechSupported();

  useEffect(() => {
    // Stop speaking when unmounting or text changes
    return () => {
      stopSpeech();
    };
  }, [textToSpeak]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!supported) {
      setErrorMsg(
        lang === 'hi' 
          ? 'इस डिवाइस पर आवाज़ उपलब्ध नहीं है' 
          : lang === 'mr' 
          ? 'या डिव्हाइसवर ऑडिओ उपलब्ध नाही' 
          : 'Audio speech not supported on this browser'
      );
      setTimeout(() => setErrorMsg(null), 3500);
      return;
    }

    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      setErrorMsg(null);
      speakText(
        textToSpeak,
        lang,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        (err) => {
          setIsPlaying(false);
          setErrorMsg(err);
          setTimeout(() => setErrorMsg(null), 3500);
        }
      );
    }
  };

  const defaultLabel = lang === 'hi' ? 'सुनके समझो' : lang === 'mr' ? 'ऐकून समजा' : 'Listen';
  const stopLabel = lang === 'hi' ? 'रोकें' : lang === 'mr' ? 'थांबवा' : 'Stop';

  return (
    <div className="relative inline-flex items-center">
      {/* Screen-reader announcement region */}
      <span className="sr-only" role="status" aria-live="polite">
        {isPlaying
          ? (lang === 'hi' ? 'ऑडियो शुरू हुआ' : lang === 'mr' ? 'ऑडिओ सुरू झाले' : 'Audio read-aloud playing')
          : ''}
      </span>

      {compact ? (
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? stopLabel : defaultLabel}
          title={isPlaying ? stopLabel : defaultLabel}
          className={`touch-target rounded-full p-2.5 transition-all focus-visible:ring-2 focus-visible:ring-terracotta-500 ${
            isPlaying
              ? 'bg-terracotta-500 text-ivory-50 ring-2 ring-terracotta-300 shadow-warm'
              : 'bg-sand-200/80 hover:bg-sand-300 text-deepgreen-900 border border-sand-400/50'
          } ${className}`}
        >
          {isPlaying ? (
            <Square className="w-4 h-4 fill-current" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={isPlaying}
          className={`touch-target inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-xs md:text-sm transition-all border ${
            isPlaying
              ? 'bg-terracotta-500 text-ivory-50 border-terracotta-600 shadow-warm'
              : 'bg-sand-100 hover:bg-sand-200 text-nearblack border-sand-300'
          } ${className}`}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current text-ivory-100" />
              <span>{stopLabel}</span>
              <span className="inline-block w-2 h-2 rounded-full bg-ivory-50 ml-1" />
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-terracotta-500" />
              <span>{label || defaultLabel}</span>
            </>
          )}
        </button>
      )}

      {errorMsg && (
        <span 
          role="alert"
          className={`absolute ${compact ? 'bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap' : 'top-full left-0 mt-1'} px-2 py-1 text-xs bg-nearblack text-ivory-50 rounded shadow-md z-50 flex items-center gap-1`}
        >
          <AlertCircle className="w-3 h-3 text-terracotta-500" />
          {errorMsg}
        </span>
      )}
    </div>
  );
};
