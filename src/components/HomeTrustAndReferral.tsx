import React, { useState } from 'react';
import { Star, Award, ShieldCheck, Share2, CheckCircle2, Users, HeartHandshake } from 'lucide-react';
import { Language } from '../types';

interface HomeTrustAndReferralProps {
  currentLanguage: Language;
}

export const HomeTrustAndReferral: React.FC<HomeTrustAndReferralProps> = ({ currentLanguage }) => {
  const [copied, setCopied] = useState(false);

  const handleShareReferral = async () => {
    const text =
      currentLanguage === 'hi'
        ? 'KAMAI (कमाई) पर जुड़ें — बिना किसी दलाल के सीधा काम, तय दिहाड़ी और डिजिटल पहचान पत्र। अभी देखें: https://github.com/vedslab/kamai'
        : currentLanguage === 'mr'
        ? 'KAMAI (कमाई) वर या — थेट काम, ठरलेली मजुरी आणि डिजिटल ओळखपत्र. https://github.com/vedslab/kamai'
        : 'Join KAMAI — Direct daily work, locked wages & digital skill card. No middlemen: https://github.com/vedslab/kamai';

    if (navigator.share) {
      try {
        await navigator.share({ title: 'KAMAI - Direct Work', text });
        return;
      } catch {
        // Fallback
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* 1. REFER & EARN / COMMUNITY CARD (Refer & Earn style from reference) */}
      <div className="rounded-3xl bg-gradient-to-r from-sand-200/90 via-sand-100 to-ivory-50 border border-sand-300 p-5 sm:p-6 shadow-warm-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sand-300 text-navy-900 text-[10px] font-bold">
            <Users className="w-3 h-3 text-navy-800" />
            <span>{currentLanguage === 'hi' ? 'कारीगर नेटवर्क' : currentLanguage === 'mr' ? 'कामगार नेटवर्क' : 'Worker Community'}</span>
          </div>

          <h3 className="text-base sm:text-xl font-black text-navy-900 font-hindi">
            {currentLanguage === 'hi'
              ? 'साथी कारीगर को जोड़ें'
              : currentLanguage === 'mr'
              ? 'सहकारी कामगाराला जोडा'
              : 'Invite a Fellow Craftsman'}
          </h3>

          <p className="text-xs text-nearblack-subtle leading-relaxed">
            {currentLanguage === 'hi'
              ? 'अपने साथी कारीगर को KAMAI पर जोड़ें और बिना किसी दलाल के सीधा काम और तय दिहाड़ी पाने में मदद करें।'
              : currentLanguage === 'mr'
              ? 'आपल्या मित्राला थेट काम आणि ठरलेली मजुरी मिळवून देण्यासाठी KAMAI शेअर करा.'
              : 'Share KAMAI with fellow skilled craftspeople to access transparent daily wages and zero commission.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleShareReferral}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-navy-800 hover:bg-navy-900 text-ivory-50 text-xs font-bold shadow-warm flex items-center justify-center gap-2 transition-all shrink-0 touch-target"
        >
          <Share2 className="w-4 h-4 text-sand-300" />
          <span>
            {copied
              ? currentLanguage === 'hi'
                ? 'लिंक कॉपी हो गई!'
                : currentLanguage === 'mr'
                ? 'लिंक कॉपी झाली!'
                : 'Link Copied!'
              : currentLanguage === 'hi'
              ? 'शेयर करें (Share now)'
              : currentLanguage === 'mr'
              ? 'शेअर करा (Share now)'
              : 'Share now'}
          </span>
        </button>
      </div>

      {/* 2. EXPERTS VETTED FOR QUALITY / TRUST SEAL (Golden Wax Medallion from reference) */}
      <div className="rounded-3xl bg-white border border-sand-300 p-6 sm:p-8 text-center space-y-5 shadow-warm-xs">
        {/* Golden Wax Seal Medallion Graphic */}
        <div className="w-20 h-20 mx-auto relative flex items-center justify-center">
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Scalloped Gold Medallion Wax Outer Edge */}
            <circle cx="50" cy="50" r="46" fill="#D9C0A2" stroke="#B8966C" strokeWidth="2" />
            <circle cx="50" cy="50" r="38" fill="#EADBC8" stroke="#D9C0A2" strokeWidth="2" />
            <circle cx="50" cy="50" r="32" fill="#FAF6F0" />
            {/* Central Stamp */}
            <text x="50" y="47" textAnchor="middle" fill="#1A2D57" fontSize="11" fontWeight="900" fontFamily="sans-serif">
              KAMAI
            </text>
            <text x="50" y="60" textAnchor="middle" fill="#B8966C" fontSize="8" fontWeight="800" fontFamily="sans-serif">
              SEAL
            </text>
          </svg>
        </div>

        {/* Section Heading */}
        <div className="space-y-1 max-w-md mx-auto">
          <h3 className="text-lg sm:text-2xl font-black text-navy-900 font-hindi tracking-tight">
            {currentLanguage === 'hi'
              ? 'भरोसेमंद कारीगर व तय दिहाड़ी'
              : currentLanguage === 'mr'
              ? 'विश्वसनीय कारागीर व ठरलेली मजुरी'
              : 'Experts Vetted for Quality'}
          </h3>
          <p className="text-xs sm:text-sm text-nearblack-subtle">
            {currentLanguage === 'hi'
              ? 'मुंबई के लेबर नाकों पर सीधे तय शर्तों और भरोसेमंद कारीगरों का 100% पारदर्शी मंच'
              : currentLanguage === 'mr'
              ? 'मुंबईतील नाक्यांवर थेट आणि सुरक्षित काम मिळण्याचे हक्काचे व्यासपीठ'
              : 'Transparent daily discovery platform with pre-agreed terms and verified profiles'}
          </p>
        </div>

        {/* 3 Quality Pillars (matching the 3 icons in reference) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-sand-200">
          {/* Pillar 1: Top Rated Experts */}
          <div className="p-3.5 rounded-2xl bg-ivory-50 border border-sand-300/80 flex flex-col items-center text-center space-y-1.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center justify-center shadow-xs">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-navy-900 font-hindi">
              {currentLanguage === 'hi' ? 'शीर्ष रेटेड कारीगर' : currentLanguage === 'mr' ? 'शीर्ष रेटेड कारागीर' : 'Top Rated Experts'}
            </h4>
            <p className="text-[11px] text-nearblack-subtle leading-tight">
              {currentLanguage === 'hi' ? '4.9★ औसत रेटिंग व समीक्षा' : currentLanguage === 'mr' ? '४.९★ सरासरी रेटिंग' : '4.9★ Average Worker Rating'}
            </p>
          </div>

          {/* Pillar 2: Professionally Trained */}
          <div className="p-3.5 rounded-2xl bg-ivory-50 border border-sand-300/80 flex flex-col items-center text-center space-y-1.5">
            <div className="w-10 h-10 rounded-2xl bg-sand-200 text-navy-900 border border-sand-300 flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5 text-navy-800" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-navy-900 font-hindi">
              {currentLanguage === 'hi' ? 'हुनरमंद व अनुभवी' : currentLanguage === 'mr' ? 'अनुभवी कारागीर' : 'Professionally Skilled'}
            </h4>
            <p className="text-[11px] text-nearblack-subtle leading-tight">
              {currentLanguage === 'hi' ? 'वर्षों का प्रत्यक्ष फील्ड अनुभव' : currentLanguage === 'mr' ? 'वर्षानुवर्षांचा कामाचा अनुभव' : 'Field-tested craftspeople'}
            </p>
          </div>

          {/* Pillar 3: Background Verified */}
          <div className="p-3.5 rounded-2xl bg-ivory-50 border border-sand-300/80 flex flex-col items-center text-center space-y-1.5">
            <div className="w-10 h-10 rounded-2xl bg-navy-100 text-navy-800 border border-navy-200 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-navy-800" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-navy-900 font-hindi">
              {currentLanguage === 'hi' ? 'पहचान सत्यापित' : currentLanguage === 'mr' ? 'ओळख सत्यापित' : 'Background Verified'}
            </h4>
            <p className="text-[11px] text-nearblack-subtle leading-tight">
              {currentLanguage === 'hi' ? 'मोबाइल व नाका स्थान सत्यापित' : currentLanguage === 'mr' ? 'मोबाईल व नाका पडताळणी' : 'Verified phone and naka location'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
