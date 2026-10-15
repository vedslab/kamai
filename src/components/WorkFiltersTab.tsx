import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Wrench, X, Filter, RotateCcw } from 'lucide-react';
import { Language, Trade, Area } from '../types';
import { TRADES } from '../data/trades';
import { AREAS } from '../data/areas';

export type TimeFilter = 'all' | 'morning' | 'midday' | 'short_task';
export type DateFilter = 'all' | 'today' | 'tomorrow';

interface WorkFiltersTabProps {
  dateFilter: DateFilter;
  onDateChange: (val: DateFilter) => void;
  timeFilter: TimeFilter;
  onTimeChange: (val: TimeFilter) => void;
  selectedAreaId: string | null;
  onAreaChange: (val: string | null) => void;
  selectedTradeId: string | null;
  onTradeChange: (val: string | null) => void;
  currentLanguage: Language;
  totalFilteredCount: number;
}

export const WorkFiltersTab: React.FC<WorkFiltersTabProps> = ({
  dateFilter,
  onDateChange,
  timeFilter,
  onTimeChange,
  selectedAreaId,
  onAreaChange,
  selectedTradeId,
  onTradeChange,
  currentLanguage,
  totalFilteredCount,
}) => {
  const [activeTab, setActiveTab] = useState<'date' | 'time' | 'location' | 'profile'>('date');

  const selectedTrade = TRADES.find((t) => t.id === selectedTradeId);
  const selectedArea = AREAS.find((a) => a.id === selectedAreaId);

  const activeFiltersCount =
    (dateFilter !== 'all' ? 1 : 0) +
    (timeFilter !== 'all' ? 1 : 0) +
    (selectedAreaId !== null ? 1 : 0) +
    (selectedTradeId !== null ? 1 : 0);

  const handleResetAll = () => {
    onDateChange('all');
    onTimeChange('all');
    onAreaChange(null);
    onTradeChange(null);
  };

  const getTimeLabel = (t: TimeFilter) => {
    switch (t) {
      case 'morning':
        return currentLanguage === 'hi' ? 'सुबह (8-10 AM)' : currentLanguage === 'mr' ? 'सकाळ (8-10 AM)' : 'Morning (8–10 AM)';
      case 'midday':
        return currentLanguage === 'hi' ? 'दोपहर (10 AM+)' : currentLanguage === 'mr' ? 'दुपार (10 AM+)' : 'Midday (10 AM+)';
      case 'short_task':
        return currentLanguage === 'hi' ? 'छोटा काम (<6 घंटे)' : currentLanguage === 'mr' ? 'छोटे काम (<6 तास)' : 'Short Task (<6 hrs)';
      default:
        return currentLanguage === 'hi' ? 'सभी समय' : currentLanguage === 'mr' ? 'सर्व वेळ' : 'All Times';
    }
  };

  const getDateLabel = (d: DateFilter) => {
    switch (d) {
      case 'today':
        return currentLanguage === 'hi' ? 'आज (Today)' : currentLanguage === 'mr' ? 'आज (Today)' : 'Today';
      case 'tomorrow':
        return currentLanguage === 'hi' ? 'कल (Tomorrow)' : currentLanguage === 'mr' ? 'उद्या (Tomorrow)' : 'Tomorrow';
      default:
        return currentLanguage === 'hi' ? 'सभी तारीखें' : currentLanguage === 'mr' ? 'सर्व दिवस' : 'All Dates';
    }
  };

  return (
    <div id="filter-tabs-section" className="rounded-2xl border-2 border-sand-300 bg-ivory-50 p-3 sm:p-4 shadow-warm-xs space-y-3">
      {/* Filters Header with count and reset */}
      <div className="flex items-center justify-between gap-2 border-b border-sand-300/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sand-200 text-deepgreen-900 flex items-center justify-center">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-deepgreen-900 flex items-center gap-1.5">
              <span>{currentLanguage === 'hi' ? 'काम के फिल्टर' : currentLanguage === 'mr' ? 'कामाचे फिल्टर्स' : 'Filter Work'}</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-terracotta-500 text-ivory-50 text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={handleResetAll}
              className="touch-target text-xs text-terracotta-600 hover:text-terracotta-700 font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'hi' ? 'रीसेट' : currentLanguage === 'mr' ? 'रीसेट' : 'Clear all'}</span>
            </button>
          )}
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sand-200 text-deepgreen-800">
            {totalFilteredCount} {currentLanguage === 'hi' ? 'काम' : currentLanguage === 'mr' ? 'कामे' : 'jobs'}
          </span>
        </div>
      </div>

      {/* 4 MAIN FILTER TABS (Date, Time, Location, Job Profile) */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-sand-200/70 border border-sand-300">
        {/* Tab 1: Date */}
        <button
          type="button"
          onClick={() => setActiveTab('date')}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
            activeTab === 'date'
              ? 'bg-ivory-50 text-deepgreen-900 shadow-xs border border-sand-300'
              : 'text-nearblack-subtle hover:text-deepgreen-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-terracotta-500" />
          <span className="truncate">{currentLanguage === 'hi' ? 'तारीख' : currentLanguage === 'mr' ? 'तारीख' : 'Date'}</span>
          {dateFilter !== 'all' && <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />}
        </button>

        {/* Tab 2: Time */}
        <button
          type="button"
          onClick={() => setActiveTab('time')}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
            activeTab === 'time'
              ? 'bg-ivory-50 text-deepgreen-900 shadow-xs border border-sand-300'
              : 'text-nearblack-subtle hover:text-deepgreen-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-terracotta-500" />
          <span className="truncate">{currentLanguage === 'hi' ? 'समय' : currentLanguage === 'mr' ? 'वेळ' : 'Time'}</span>
          {timeFilter !== 'all' && <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />}
        </button>

        {/* Tab 3: Location */}
        <button
          type="button"
          onClick={() => setActiveTab('location')}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
            activeTab === 'location'
              ? 'bg-ivory-50 text-deepgreen-900 shadow-xs border border-sand-300'
              : 'text-nearblack-subtle hover:text-deepgreen-900'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
          <span className="truncate">{currentLanguage === 'hi' ? 'लोकेशन' : currentLanguage === 'mr' ? 'जागा' : 'Location'}</span>
          {selectedAreaId !== null && <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />}
        </button>

        {/* Tab 4: Job Profile */}
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
            activeTab === 'profile'
              ? 'bg-ivory-50 text-deepgreen-900 shadow-xs border border-sand-300'
              : 'text-nearblack-subtle hover:text-deepgreen-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5 text-terracotta-500" />
          <span className="truncate">{currentLanguage === 'hi' ? 'हुनर' : currentLanguage === 'mr' ? 'कौशल्य' : 'Profile'}</span>
          {selectedTradeId !== null && <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />}
        </button>
      </div>

      {/* FILTER CONTENT BASED ON SELECTED TAB */}
      <div className="pt-1">
        {/* TAB 1 CONTENT: DATE */}
        {activeTab === 'date' && (
          <div className="flex items-center gap-2 flex-wrap">
            {(['all', 'today', 'tomorrow'] as DateFilter[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onDateChange(d)}
                className={`touch-target px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  dateFilter === d
                    ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900 shadow-warm-xs'
                    : 'bg-sand-100 text-nearblack border-sand-300 hover:bg-sand-200'
                }`}
              >
                {getDateLabel(d)}
              </button>
            ))}
          </div>
        )}

        {/* TAB 2 CONTENT: TIME */}
        {activeTab === 'time' && (
          <div className="flex items-center gap-2 flex-wrap">
            {(['all', 'morning', 'midday', 'short_task'] as TimeFilter[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTimeChange(t)}
                className={`touch-target px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  timeFilter === t
                    ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900 shadow-warm-xs'
                    : 'bg-sand-100 text-nearblack border-sand-300 hover:bg-sand-200'
                }`}
              >
                {getTimeLabel(t)}
              </button>
            ))}
          </div>
        )}

        {/* TAB 3 CONTENT: LOCATION */}
        {activeTab === 'location' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <button
              type="button"
              onClick={() => onAreaChange(null)}
              className={`touch-target whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
                selectedAreaId === null
                  ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900 shadow-warm-xs'
                  : 'bg-sand-100 text-nearblack border-sand-300 hover:bg-sand-200'
              }`}
            >
              {currentLanguage === 'hi' ? 'सभी लोकेशन' : currentLanguage === 'mr' ? 'सर्व जागा' : 'All Locations'}
            </button>
            {AREAS.map((area: Area) => {
              const isSelected = selectedAreaId === area.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => onAreaChange(isSelected ? null : area.id)}
                  className={`touch-target whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
                    isSelected
                      ? 'bg-terracotta-500 text-ivory-50 border-terracotta-600 shadow-warm-xs'
                      : 'bg-sand-100 text-nearblack border-sand-300 hover:bg-sand-200'
                  }`}
                >
                  {area.name[currentLanguage] || area.name.en}
                </button>
              );
            })}
          </div>
        )}

        {/* TAB 4 CONTENT: JOB PROFILE */}
        {activeTab === 'profile' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <button
              type="button"
              onClick={() => onTradeChange(null)}
              className={`touch-target whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
                selectedTradeId === null
                  ? 'bg-deepgreen-800 text-ivory-50 border-deepgreen-900 shadow-warm-xs'
                  : 'bg-sand-100 text-nearblack border-sand-300 hover:bg-sand-200'
              }`}
            >
              {currentLanguage === 'hi' ? 'सभी हुनर' : currentLanguage === 'mr' ? 'सर्व कौशल्ये' : 'All Profiles'}
            </button>
            {TRADES.map((trade: Trade) => {
              const isSelected = selectedTradeId === trade.id;
              return (
                <button
                  key={trade.id}
                  type="button"
                  onClick={() => onTradeChange(isSelected ? null : trade.id)}
                  className={`touch-target whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
                    isSelected
                      ? 'bg-terracotta-500 text-ivory-50 border-terracotta-600 shadow-warm-xs'
                      : 'bg-sand-100 text-nearblack border-sand-300 hover:bg-sand-200'
                  }`}
                >
                  {trade.name[currentLanguage] || trade.name.en}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ACTIVE FILTER CHIPS (If any filter applied) */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-sand-300/60">
          <span className="text-[11px] font-semibold text-nearblack-subtle">
            {currentLanguage === 'hi' ? 'लागू फिल्टर:' : 'Active:'}
          </span>

          {dateFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-sand-200 text-deepgreen-900 border border-sand-300">
              <span>{getDateLabel(dateFilter)}</span>
              <button type="button" onClick={() => onDateChange('all')} className="hover:text-terracotta-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {timeFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-sand-200 text-deepgreen-900 border border-sand-300">
              <span>{getTimeLabel(timeFilter)}</span>
              <button type="button" onClick={() => onTimeChange('all')} className="hover:text-terracotta-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedArea && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-sand-200 text-deepgreen-900 border border-sand-300">
              <span>{selectedArea.name[currentLanguage] || selectedArea.name.en}</span>
              <button type="button" onClick={() => onAreaChange(null)} className="hover:text-terracotta-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedTrade && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-sand-200 text-deepgreen-900 border border-sand-300">
              <span>{selectedTrade.name[currentLanguage] || selectedTrade.name.en}</span>
              <button type="button" onClick={() => onTradeChange(null)} className="hover:text-terracotta-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
