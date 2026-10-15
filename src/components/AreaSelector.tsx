import React, { useState } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { AREAS } from '../data/areas';
import { Area, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AreaSelectorProps {
  selectedAreaId: string | null;
  onSelectArea: (areaId: string | null) => void;
  currentLanguage: Language;
}

export const AreaSelector: React.FC<AreaSelectorProps> = ({
  selectedAreaId,
  onSelectArea,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAreas = AREAS.filter((area) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameLang = (area.name[currentLanguage] || area.name.en).toLowerCase();
    const city = area.city.toLowerCase();
    const naka = area.nakaName.toLowerCase();
    return nameLang.includes(q) || city.includes(q) || naka.includes(q);
  });

  return (
    <div className="space-y-3 bg-ivory-50/80 p-3.5 sm:p-4 rounded-xl border border-sand-300">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-terracotta-500" />
          <span className="text-sm font-bold text-deepgreen-900">
            {t.chooseArea}
          </span>
        </div>

        {selectedAreaId && (
          <button
            type="button"
            onClick={() => onSelectArea(null)}
            className="touch-target text-xs text-terracotta-600 hover:text-terracotta-700 font-semibold flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t.clearFilters}</span>
          </button>
        )}
      </div>

      {/* Manual Search Input (NO automatic GPS) */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-nearblack-subtle pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={currentLanguage === 'hi' ? 'नाका या शहर खोजें...' : currentLanguage === 'mr' ? 'नाका किंवा शहर शोधा...' : 'Search naka, chowk, or city...'}
          className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-sand-50 border border-sand-300 rounded-lg text-nearblack placeholder:text-nearblack-subtle focus:border-terracotta-500 focus:bg-ivory-50"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear naka search"
            className="touch-target absolute right-1 top-1/2 -translate-y-1/2 text-nearblack-subtle hover:text-nearblack rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Chips of Prominent Nakas */}
      <div 
        role="region" 
        aria-label="Labour naka quick filters"
        className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin"
      >
        <button
          type="button"
          onClick={() => onSelectArea(null)}
          className={`touch-target whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 border ${
            selectedAreaId === null
              ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900 shadow-warm-sm'
              : 'bg-sand-100 text-nearblack-muted border-sand-300 hover:bg-sand-200'
          }`}
        >
          {t.allAreas}
        </button>

        {filteredAreas.map((area: Area) => {
          const isSelected = selectedAreaId === area.id;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => onSelectArea(isSelected ? null : area.id)}
              className={`touch-target whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-terracotta-500 text-ivory-50 border-terracotta-600 shadow-warm-sm'
                  : 'bg-sand-100 text-deepgreen-900 border-sand-300 hover:bg-sand-200'
              }`}
            >
              <span>{area.name[currentLanguage] || area.name.en}</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-normal ${
                isSelected ? 'bg-terracotta-600 text-ivory-50' : 'bg-sand-200 text-nearblack-muted'
              }`}>
                {area.city}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
