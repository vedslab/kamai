import React, { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, X, Sparkles, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { speakText, stopSpeech } from '../utils/speech';

interface VoiceAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onApplyVoiceCommand: (command: {
    tradeId?: string;
    areaId?: string;
    dateFilter?: 'today' | 'all';
    searchQuery?: string;
    tab?: 'home' | 'explore' | 'mycard' | 'pehle_pakka' | 'rights';
    feedbackMessage: string;
  }) => void;
}

export const VoiceAssistModal: React.FC<VoiceAssistModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onApplyVoiceCommand,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [micSupported, setMicSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Set initial status text based on language
  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      const initialGreeting =
        currentLanguage === 'hi'
          ? 'माइक दबाकर बोलें — जैसे "राजमिस्त्री काम", "दादर नाका", या "आज का काम"'
          : currentLanguage === 'mr'
          ? 'माईक दाबून बोला — जसे "गवंडी काम", "दादर नाका", किंवा "आजचे काम"'
          : 'Tap mic and speak — e.g. "Mason jobs", "Dadar naka", or "Today\'s jobs"';
      setStatusMessage(initialGreeting);
      startListening();
    } else {
      stopListening();
      stopSpeech();
    }

    return () => {
      stopListening();
      stopSpeech();
    };
  }, [isOpen, currentLanguage]);

  // Initialize Web Speech Recognition
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicSupported(false);
      setStatusMessage(
        currentLanguage === 'hi'
          ? 'इस ब्राउज़र में माइक पहचान उपलब्ध नहीं है। कृपया नीचे दिए गए त्वरित विकल्पों पर टैप करें।'
          : currentLanguage === 'mr'
          ? 'या ब्राउझरमध्ये माईक ओळख उपलब्ध नाही. कृपया खालील त्वरित पर्यायांवर टॅप करा.'
          : 'Speech recognition is not supported in this browser. Please use quick prompts below.'
      );
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;

      // Set target language
      if (currentLanguage === 'mr') {
        recognition.lang = 'mr-IN';
      } else if (currentLanguage === 'hi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onstart = () => {
        setIsListening(true);
        setStatusMessage(
          currentLanguage === 'hi'
            ? 'सुन रहे हैं... बोलिए...'
            : currentLanguage === 'mr'
            ? 'ऐकत आहोत... बोला...'
            : 'Listening... please speak...'
        );
      };

      recognition.onresult = (event: any) => {
        const text = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join(' ');
        setTranscript(text);

        if (event.results[0].isFinal) {
          processVoiceInput(text);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setStatusMessage(
            currentLanguage === 'hi'
              ? 'कृपया ब्राउज़र में माइक्रोफ़ोन की अनुमति (Permission) दें।'
              : currentLanguage === 'mr'
              ? 'कृपया ब्राउझरमध्ये मायक्रोफोनची परवानगी द्या.'
              : 'Please allow microphone access in your browser.'
          );
        } else if (event.error === 'no-speech') {
          setStatusMessage(
            currentLanguage === 'hi'
              ? 'कोई आवाज़ सुनाई नहीं दी। कृपया दोबारा माइक दबाकर बोलें।'
              : currentLanguage === 'mr'
              ? 'कोणताही आवाज ऐकू आला नाही. कृपया पुन्हा माईक दाबून बोला.'
              : 'No speech detected. Please tap mic and try again.'
          );
        } else {
          setStatusMessage(
            currentLanguage === 'hi'
              ? 'पहचानने में रुकावट आई। आप नीचे दिए गए सुझावों पर भी टैप कर सकते हैं।'
              : currentLanguage === 'mr'
              ? 'ओळखण्यात अडचण आली. आपण खालील पर्यायांवर देखील टॅप करू शकता.'
              : 'Recognition stopped. You can also tap the quick options below.'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  // Process and map user's spoken words into filters & actions
  const processVoiceInput = (rawQuery: string) => {
    const q = rawQuery.toLowerCase().trim();

    // 1. Check for Trades
    let matchedTrade: string | undefined = undefined;
    if (q.includes('राजमिस्त्री') || q.includes('मिस्त्री') || q.includes('गवंडी') || q.includes('ईंट') || q.includes('mason')) {
      matchedTrade = 'mason';
    } else if (q.includes('पेंटर') || q.includes('रंग') || q.includes('पुट्टी') || q.includes('रंगारी') || q.includes('रंगकाम') || q.includes('paint')) {
      matchedTrade = 'painter';
    } else if (q.includes('बढ़ई') || q.includes('खाती') || q.includes('सुतार') || q.includes('लकड़ी') || q.includes('carpenter')) {
      matchedTrade = 'carpenter';
    } else if (q.includes('इलेक्ट्रीशियन') || q.includes('बिजली') || q.includes('लाइट') || q.includes('वायर') || q.includes('वीजतंत्री') || q.includes('electrician')) {
      matchedTrade = 'electrician';
    } else if (q.includes('प्लंबर') || q.includes('नल') || q.includes('पाइप') || q.includes('plumber')) {
      matchedTrade = 'plumber';
    } else if (q.includes('हेल्पर') || q.includes('मजूर') || q.includes('बेलदार') || q.includes('हम्माल') || q.includes('helper')) {
      matchedTrade = 'helper';
    } else if (q.includes('वेल्डर') || q.includes('वेल्डिंग') || q.includes('लोहार') || q.includes('welder')) {
      matchedTrade = 'welder';
    } else if (q.includes('सफाई') || q.includes('कचरा') || q.includes('स्वच्छता') || q.includes('cleaner') || q.includes('cleaning')) {
      matchedTrade = 'cleaning';
    }

    // 2. Check for Nakas / Locations
    let matchedArea: string | undefined = undefined;
    if (q.includes('दादर') || q.includes('dadar')) {
      matchedArea = 'dadar';
    } else if (q.includes('अंधेरी') || q.includes('andheri')) {
      matchedArea = 'andheri';
    } else if (q.includes('कुर्ला') || q.includes('kurla')) {
      matchedArea = 'kurla';
    } else if (q.includes('बोरिवली') || q.includes('बोरीवली') || q.includes('borivali')) {
      matchedArea = 'borivali';
    } else if (q.includes('ठाणे') || q.includes('ठाणा') || q.includes('thane')) {
      matchedArea = 'thane';
    } else if (q.includes('कल्याण') || q.includes('kalyan')) {
      matchedArea = 'kalyan';
    } else if (q.includes('नवी मुंबई') || q.includes('वाशी') || q.includes('vashi') || q.includes('navi mumbai')) {
      matchedArea = 'navi_mumbai';
    }

    // 3. Check for Date / Quick Actions
    const isToday = q.includes('आज') || q.includes('today') || q.includes('आत्ता');
    const isMyCard = q.includes('पहचान') || q.includes('कार्ड') || q.includes('माझे कार्ड') || q.includes('कार्ड दाखवा') || q.includes('profile');
    const isPehlePakka = q.includes('पक्का') || q.includes('पेहले पक्का') || q.includes('करार') || q.includes('lock') || q.includes('agreement');
    const isRights = q.includes('अधिकार') || q.includes('हक्क') || q.includes('कल्याणकारी') || q.includes('rights') || q.includes('welfare');

    // Build Spoken Feedback Message
    let feedback = '';
    let targetTab: 'home' | 'explore' | 'mycard' | 'pehle_pakka' | 'rights' = 'explore';

    if (isMyCard) {
      targetTab = 'mycard';
      feedback =
        currentLanguage === 'hi'
          ? 'आपका पहचान कार्ड खोला जा रहा है।'
          : currentLanguage === 'mr'
          ? 'आपले ओळखपत्र उघडले जात आहे.'
          : 'Opening your Pehchaan Card.';
    } else if (isPehlePakka) {
      targetTab = 'pehle_pakka';
      feedback =
        currentLanguage === 'hi'
          ? 'पहले पक्का डिजिटल एग्रीमेंट खोला जा रहा है।'
          : currentLanguage === 'mr'
          ? 'पहिले पक्का डिजिटल करार उघडला जात आहे.'
          : 'Opening Pehle Pakka Agreement.';
    } else if (isRights) {
      targetTab = 'rights';
      feedback =
        currentLanguage === 'hi'
          ? 'मजदूर अधिकार एवं योजनाएं खोली जा रही हैं।'
          : currentLanguage === 'mr'
          ? 'कामगार हक्क व शासकीय योजना उघडल्या जात आहेत.'
          : 'Opening worker rights and welfare schemes.';
    } else {
      // Job Filter Feedback
      const tradeName =
        matchedTrade === 'mason' ? (currentLanguage === 'mr' ? 'गवंडी' : 'राजमिस्त्री') :
        matchedTrade === 'painter' ? (currentLanguage === 'mr' ? 'रंगारी' : 'पेंटर') :
        matchedTrade === 'carpenter' ? (currentLanguage === 'mr' ? 'सुतार' : 'बढ़ई') :
        matchedTrade === 'electrician' ? (currentLanguage === 'mr' ? 'वीजतंत्री' : 'इलेक्ट्रीशियन') :
        matchedTrade === 'plumber' ? 'प्लंबर' :
        matchedTrade === 'helper' ? (currentLanguage === 'mr' ? 'मजूर' : 'हेल्पर') : '';

      const areaName =
        matchedArea === 'dadar' ? 'दादर नाका' :
        matchedArea === 'andheri' ? 'अंधेरी नाका' :
        matchedArea === 'kurla' ? 'कुर्ला नाका' :
        matchedArea === 'borivali' ? 'बोरिवली नाका' :
        matchedArea === 'thane' ? 'ठाणे नाका' :
        matchedArea === 'kalyan' ? 'कल्याण नाका' :
        matchedArea === 'navi_mumbai' ? 'नवी मुंबई नाका' : '';

      if (tradeName && areaName) {
        feedback =
          currentLanguage === 'hi'
            ? `${areaName} पर ${tradeName} के काम दिखाए जा रहे हैं।`
            : currentLanguage === 'mr'
            ? `${areaName} वरील ${tradeName} कामे दाखवली जात आहेत.`
            : `Showing ${tradeName} jobs at ${areaName}.`;
      } else if (tradeName) {
        feedback =
          currentLanguage === 'hi'
            ? `${tradeName} के उपलब्ध काम दिखाए जा रहे हैं।`
            : currentLanguage === 'mr'
            ? `${tradeName} ची उपलब्ध कामे दाखवली जात आहेत.`
            : `Showing ${tradeName} jobs.`;
      } else if (areaName) {
        feedback =
          currentLanguage === 'hi'
            ? `${areaName} पर उपलब्ध काम दिखाए जा रहे हैं।`
            : currentLanguage === 'mr'
            ? `${areaName} वरील उपलब्ध कामे दाखवली जात आहेत.`
            : `Showing jobs at ${areaName}.`;
      } else if (isToday) {
        feedback =
          currentLanguage === 'hi'
            ? 'आज के सभी उपलब्ध काम दिखाए जा रहे हैं।'
            : currentLanguage === 'mr'
            ? 'आजची सर्व उपलब्ध कामे दाखवली जात आहेत.'
            : "Showing today's available jobs.";
      } else {
        feedback =
          currentLanguage === 'hi'
            ? `"${rawQuery}" के आधार पर काम खोजे गए हैं।`
            : currentLanguage === 'mr'
            ? `"${rawQuery}" च्या आधारावर कामे शोधली गेली आहेत.`
            : `Showing jobs matching "${rawQuery}".`;
      }
    }

    // Speak audio confirmation aloud in Hindi/Marathi
    speakText(feedback, currentLanguage);

    // Apply the parsed command and close modal after slight pause
    setTimeout(() => {
      onApplyVoiceCommand({
        tradeId: matchedTrade,
        areaId: matchedArea,
        dateFilter: isToday ? 'today' : undefined,
        searchQuery: matchedTrade || matchedArea || isToday ? '' : rawQuery,
        tab: targetTab,
        feedbackMessage: feedback,
      });
      onClose();
    }, 1200);
  };

  const handleQuickPromptClick = (promptText: string) => {
    setTranscript(promptText);
    stopListening();
    processVoiceInput(promptText);
  };

  if (!isOpen) return null;

  const quickPrompts =
    currentLanguage === 'hi'
      ? [
          { text: 'राजमिस्त्री काम खोजें', query: 'राजमिस्त्री' },
          { text: 'दादर नाका काम', query: 'दादर' },
          { text: 'पेंटर काम', query: 'पेंटर' },
          { text: 'आज के नए काम', query: 'आज का काम' },
          { text: 'पहचान कार्ड खोलें', query: 'पहचान कार्ड' },
          { text: 'प्लंबर काम', query: 'प्लंबर' },
        ]
      : currentLanguage === 'mr'
      ? [
          { text: 'गवंडी काम शोधा', query: 'गवंडी' },
          { text: 'दादर नाका कामे', query: 'दादर' },
          { text: 'रंगारी काम', query: 'रंगारी' },
          { text: 'आजची नवीन कामे', query: 'आजचे काम' },
          { text: 'माझे ओळखपत्र', query: 'माझे कार्ड' },
          { text: 'प्लंबर काम', query: 'प्लंबर' },
        ]
      : [
          { text: 'Find Mason Jobs', query: 'Mason' },
          { text: 'Dadar Naka Jobs', query: 'Dadar' },
          { text: 'Painter Jobs', query: 'Painter' },
          { text: "Today's Work", query: 'Today' },
          { text: 'View Pehchaan Card', query: 'Pehchaan Card' },
          { text: 'Plumber Jobs', query: 'Plumber' },
        ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Voice Assist"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-3xl border border-sand-300 shadow-2xl p-6 sm:p-7 relative overflow-hidden"
      >
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy-800 via-terracotta-500 to-sand-300" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 touch-target p-2 rounded-full bg-sand-100 hover:bg-sand-200 text-deepgreen-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200 text-deepgreen-900 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>{currentLanguage === 'hi' ? 'आवाज़ सहायक' : currentLanguage === 'mr' ? 'आवाज सहाय्यक' : 'Voice Assist'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-navy-800 font-hindi">
            {currentLanguage === 'hi'
              ? 'बोलकर काम खोजें'
              : currentLanguage === 'mr'
              ? 'बोलून काम शोधा'
              : 'Search & Navigate by Voice'}
          </h2>
          <p className="text-xs text-nearblack-subtle mt-1 font-medium">
            {currentLanguage === 'hi'
              ? 'हिन्दी या मराठी में अपनी आवाज़ में बोलें'
              : currentLanguage === 'mr'
              ? 'मराठी किंवा हिंदीत आपल्या आवाजात बोला'
              : 'Speak naturally in Hindi or Marathi'}
          </p>
        </div>

        {/* Central Pulse Mic Button */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative flex items-center justify-center">
            {/* Animated Audio Wave Rings */}
            {isListening && (
              <>
                <span className="absolute w-28 h-28 rounded-full bg-terracotta-500/20 animate-ping" />
                <span className="absolute w-36 h-36 rounded-full bg-navy-800/10 animate-pulse" />
              </>
            )}

            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
              className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isListening
                  ? 'bg-terracotta-500 text-white ring-4 ring-terracotta-300 scale-105'
                  : 'bg-navy-800 text-sand-200 hover:bg-navy-900 ring-4 ring-sand-300'
              }`}
            >
              {isListening ? (
                <Mic className="w-9 h-9 sm:w-10 sm:h-10 animate-bounce" />
              ) : (
                <Mic className="w-9 h-9 sm:w-10 sm:h-10" />
              )}
            </button>
          </div>

          <div className="mt-4 text-center">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isListening
                  ? 'bg-terracotta-100 text-terracotta-700 animate-pulse'
                  : 'bg-sand-100 text-deepgreen-900'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>
                {isListening
                  ? currentLanguage === 'hi'
                    ? 'आवाज़ रिकॉर्ड हो रही है...'
                    : currentLanguage === 'mr'
                    ? 'आवाज रेकॉर्ड होत आहे...'
                    : 'Recording voice...'
                  : currentLanguage === 'hi'
                  ? 'माइक दबाकर शुरू करें'
                  : currentLanguage === 'mr'
                  ? 'सुरू करण्यासाठी माईक दाबा'
                  : 'Tap mic to speak'}
              </span>
            </span>
          </div>
        </div>

        {/* Live Transcript / Status Card */}
        <div className="bg-sand-100/70 rounded-2xl p-4 border border-sand-300 mb-5 min-h-[72px] flex items-center justify-center text-center">
          {transcript ? (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-nearblack-subtle block">
                {currentLanguage === 'hi' ? 'आपने बोला:' : currentLanguage === 'mr' ? 'तुम्ही बोललात:' : 'You said:'}
              </span>
              <p className="text-base sm:text-lg font-black text-navy-800 font-hindi">
                "{transcript}"
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-nearblack-muted font-medium">
              {statusMessage}
            </p>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div>
          <span className="text-[11px] font-bold text-deepgreen-900 uppercase tracking-wider block mb-2">
            {currentLanguage === 'hi'
              ? 'या 1-टैप में चुनें (Quick Prompts):'
              : currentLanguage === 'mr'
              ? 'किंवा १-टॅपमध्ये निवडा (Quick Prompts):'
              : 'Or tap to speak directly:'}
          </span>
          <div className="grid grid-cols-2 gap-2">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickPromptClick(p.query)}
                className="touch-target p-2.5 rounded-xl bg-white hover:bg-sand-200/60 border border-sand-300 text-left transition-colors flex items-center justify-between text-xs font-bold text-deepgreen-900 group"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Mic className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                  <span className="truncate">{p.text}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-sand-400 group-hover:text-deepgreen-900 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
