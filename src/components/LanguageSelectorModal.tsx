import React from 'react';
import { X, Check } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const languages: { code: Language; label: string; scriptName: string; note: string }[] = [
    {
      code: 'hi',
      label: 'हिन्दी',
      scriptName: 'Hindi',
      note: 'काम खोजें, सीधी दिहाड़ी, पहले पक्का'
    },
    {
      code: 'mr',
      label: 'मराठी',
      scriptName: 'Marathi',
      note: 'काम शोधा, हक्काची मजुरी, आधी पक्के करा'
    },
    {
      code: 'en',
      label: 'English',
      scriptName: 'English',
      note: 'Find jobs, daily rates, pre-work terms'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-nearblack/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-md bg-ivory-100 rounded-t-2xl sm:rounded-2xl border border-sand-300 shadow-warm-lg overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-sand-200 bg-sand-100">
          <div>
            <h2 id="language-modal-title" className="text-lg font-bold text-deepgreen-900">
              भाषा चुनें / Select Language
            </h2>
            <p className="text-xs text-nearblack-muted">
              Choose your preferred language for KAMAI
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="touch-target rounded-full p-2 text-nearblack-muted hover:text-nearblack hover:bg-sand-200 transition-colors"
            aria-label="Close language selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Options */}
        <div className="p-4 space-y-3">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between touch-target ${
                  isSelected
                    ? 'border-terracotta-500 bg-terracotta-50 shadow-warm ring-1 ring-terracotta-500'
                    : 'border-sand-300 bg-ivory-50 hover:bg-sand-100 hover:border-sand-400'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-nearblack">
                      {lang.label}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-sand-200 text-deepgreen-800 font-medium">
                      {lang.scriptName}
                    </span>
                  </div>
                  <p className="text-xs text-nearblack-muted font-normal">
                    {lang.note}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-7 h-7 rounded-full bg-terracotta-500 text-ivory-50 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="px-5 py-3 bg-sand-50 border-t border-sand-200 text-center">
          <p className="text-xs text-nearblack-subtle">
            All jobs, rates, and voice guidance adapt instantly
          </p>
        </div>
      </div>
    </div>
  );
};
