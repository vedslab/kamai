import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, X, Check, Navigation as NavIcon } from 'lucide-react';
import { Area, Language } from '../types';
import { AREAS } from '../data/areas';
import { TRANSLATIONS } from '../data/translations';

interface LocationCardProps {
  selectedAreaId: string | null;
  onSelectArea: (areaId: string | null) => void;
  currentLanguage: Language;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  selectedAreaId,
  onSelectArea,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentArea = AREAS.find((a) => a.id === selectedAreaId);
  const displayLocation = currentArea
    ? `${currentArea.name[currentLanguage] || currentArea.name.en}, ${currentArea.city}`
    : currentLanguage === 'hi'
    ? 'दादर लेबर नाका, मुम्बई (डिफ़ॉल्ट)'
    : currentLanguage === 'mr'
    ? 'दादर लेबर नाका, मुंबई (डिफॉल्ट)'
    : 'Dadar Labour Naka, Mumbai';

  const landmark = currentArea?.landmark || 'Dadar Kabutar Khana Chowk';

  const filteredAreas = AREAS.filter((area) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameLang = (area.name[currentLanguage] || area.name.en).toLowerCase();
    const city = area.city.toLowerCase();
    const naka = area.nakaName.toLowerCase();
    const land = (area.landmark || '').toLowerCase();
    return nameLang.includes(q) || city.includes(q) || naka.includes(q) || land.includes(q);
  });

  return (
    <>
      {/* 1. TOP SELECT LOCATION CARD */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-sand-300 bg-ivory-50 shadow-warm-xs transition-all hover:border-sand-400">
        {/* Subtle Map Graphic Background (Grayscale map roads like reference app) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 400 120">
            <path d="M-20,40 Q80,20 180,60 T380,30 T440,70" fill="none" stroke="#253C34" strokeWidth="6" />
            <path d="M40,-10 L80,130 M220,-10 L190,130 M310,-10 L340,130" fill="none" stroke="#253C34" strokeWidth="4" />
            <path d="M-10,90 Q120,80 250,110 T420,95" fill="none" stroke="#253C34" strokeWidth="3" strokeDasharray="6 3" />
            <circle cx="180" cy="60" r="14" fill="#D65A31" fillOpacity="0.25" />
            <circle cx="180" cy="60" r="6" fill="#D65A31" />
          </svg>
        </div>

        {/* Card Content */}
        <div className="relative p-3.5 sm:p-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 text-left flex-1 min-w-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded-lg p-1 -m-1"
          >
            <div className="w-10 h-10 rounded-xl bg-terracotta-500/15 border border-terracotta-300 text-terracotta-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-terracotta-600 fill-terracotta-500/30" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-700">
                  {currentLanguage === 'hi' ? 'आपकी लोकेशन' : currentLanguage === 'mr' ? 'तुमची जागा' : 'Current Location'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" title="Live Naka GPS Active" />
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-deepgreen-900 truncate flex items-center gap-1">
                <span>{displayLocation}</span>
                <ChevronDown className="w-4 h-4 text-nearblack-subtle shrink-0" />
              </h3>
              <p className="text-[11px] text-nearblack-subtle truncate">
                {landmark}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="touch-target px-3 py-1.5 rounded-xl bg-sand-200 hover:bg-sand-300 text-deepgreen-900 border border-sand-300 text-xs font-bold shrink-0 transition-colors"
          >
            {currentLanguage === 'hi' ? 'बदलें' : currentLanguage === 'mr' ? 'बदला' : 'Change'}
          </button>
        </div>
      </div>

      {/* LOCATION SELECTION MODAL */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nearblack/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="w-full max-w-lg bg-ivory-100 rounded-2xl border-2 border-sand-400 shadow-warm-lg overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-sand-300 flex items-center justify-between bg-sand-200/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-terracotta-600" />
                <h3 id="location-modal-title" className="font-bold text-base text-deepgreen-900 font-hindi">
                  {currentLanguage === 'hi' ? 'लेबर नाका या इलाका चुनें' : currentLanguage === 'mr' ? 'लेबर नाका किंवा जागा निवडा' : 'Select Location or Labour Naka'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="touch-target p-1.5 rounded-lg text-nearblack-subtle hover:text-nearblack hover:bg-sand-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-sand-300 bg-ivory-50">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-nearblack-subtle pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={currentLanguage === 'hi' ? 'नाका, चौक या शहर खोजें...' : currentLanguage === 'mr' ? 'नाका किंवा शहर शोधा...' : 'Search naka, chowk, station...'}
                  className="w-full pl-9 pr-8 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-xl text-nearblack placeholder:text-nearblack-subtle focus:border-terracotta-500 focus:bg-ivory-50"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-nearblack-subtle hover:text-nearblack"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Action: All Mumbai */}
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectArea(null);
                    setIsModalOpen(false);
                  }}
                  className={`touch-target px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                    selectedAreaId === null
                      ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900'
                      : 'bg-sand-100 text-nearblack border-sand-300 hover:bg-sand-200'
                  }`}
                >
                  <NavIcon className="w-3.5 h-3.5" />
                  <span>{t.allAreas} (All Mumbai)</span>
                </button>
              </div>
            </div>

            {/* List of Nakas */}
            <div className="p-3 overflow-y-auto space-y-1.5 flex-1">
              {filteredAreas.map((area: Area) => {
                const isSelected = selectedAreaId === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => {
                      onSelectArea(area.id);
                      setIsModalOpen(false);
                    }}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'bg-sand-200/90 border-terracotta-500 shadow-xs'
                        : 'bg-ivory-50 hover:bg-sand-100 border-sand-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-terracotta-500 text-ivory-50' : 'bg-sand-200 text-deepgreen-800'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-sm text-deepgreen-900 block truncate">
                          {area.name[currentLanguage] || area.name.en}
                        </span>
                        <span className="text-xs text-nearblack-subtle block truncate">
                          {area.nakaName} • {area.landmark}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-terracotta-500 text-ivory-50 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}

              {filteredAreas.length === 0 && (
                <div className="p-6 text-center text-nearblack-subtle text-xs">
                  {currentLanguage === 'hi' ? 'कोई नाका नहीं मिला' : 'No labour naka found matching search'}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-sand-300 bg-sand-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="touch-target px-4 py-2 rounded-xl bg-ivory-50 hover:bg-sand-200 border border-sand-300 text-xs font-bold text-nearblack"
              >
                {currentLanguage === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
