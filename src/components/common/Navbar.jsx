import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, STAGE_AUDIO_SCRIPTS } from '../../context/LanguageContext';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Globe,
  Store,
  ShoppingBag,
  Compass,
  User,
  ChevronDown
} from 'lucide-react';

export default function Navbar({
  role,
  setRole,
  authUser,
  onStartTour,
  currentStage = 'scanner',
  currentPageInstructions
}) {
  const {
    currentLang,
    setCurrentLang,
    languages,
    t,
    speakText,
    stopSpeaking,
    isSpeaking,
    isAudioMuted,
    toggleAudioMute
  } = useLanguage();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle prominent Voice Guide toggle click
  const handleVoiceGuideToggle = () => {
    if (!isAudioMuted) {
      // Sound is currently ON -> Mute it and silence instantly
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopSpeaking();
      toggleAudioMute();
    } else {
      // Sound is currently OFF -> Unmute and play current stage instructions
      toggleAudioMute();
      const script = currentPageInstructions || STAGE_AUDIO_SCRIPTS[currentStage] || STAGE_AUDIO_SCRIPTS.scanner;
      speakText(script);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shadow-md shadow-terracotta-500/25 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-7 h-7 fill-current">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="6" />
                <path d="M30 65 C35 45, 65 45, 70 65 Z" fill="currentColor" />
                <circle cx="50" cy="35" r="14" fill="currentColor" />
                <path d="M42 48 L58 48 L50 60 Z" fill="#FAF7F2" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-charcoal tracking-tight">KariDoot</span>
                <span className="px-2 py-0.5 rounded-md bg-forest-100 text-forest-800 text-[11px] font-extrabold tracking-wider uppercase border border-forest-200">
                  ONDC
                </span>
              </div>
              <p className="text-xs text-charcoal-light font-medium hidden sm:block">
                {t('appSubtitle')}
              </p>
            </div>
          </div>

          {/* Center Navigation:
              - When role === 'seller': show tactile toggle so seller can test both views.
              - When role === 'buyer': strictly HIDE the "Artisan Studio" tab! Replace with clean origin tag.
          */}
          {role === 'seller' ? (
            <nav className="flex items-center bg-linen-200 p-1.5 rounded-2xl border border-stone-border" aria-label="Role Switcher">
              <button
                onClick={() => setRole('seller')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-terracotta-500 text-white shadow-md shadow-terracotta-500/20 select-none min-h-[44px]"
                id="role-seller-btn"
              >
                <Store className="w-4 h-4" />
                <span>{t('sellerRole')}</span>
              </button>

              <button
                onClick={() => setRole('buyer')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-charcoal-muted hover:text-charcoal hover:bg-white/60 select-none min-h-[44px] transition-all"
                id="role-buyer-btn"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('buyerRole')}</span>
              </button>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-linen-100 border border-stone-border">
              <span className="w-2.5 h-2.5 rounded-full bg-forest-500 animate-pulse" />
              <span className="text-xs font-black text-charcoal tracking-wide">
                Direct Artisan Origin Catalog
              </span>
              <span className="text-xs text-charcoal-light font-medium">
                • 100% GI-Certified Crafts
              </span>
            </div>
          )}

          {/* Right Actions: Voice Guide Toggle, Language Selector, Tour, Profile Dropdown */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Spotlight Tour Trigger (Seller Only) */}
            {role === 'seller' && (
              <button
                onClick={onStartTour}
                className="p-2.5 rounded-xl text-charcoal-muted hover:text-terracotta-600 hover:bg-terracotta-50 border border-transparent hover:border-terracotta-200 transition-colors hidden md:flex items-center gap-1.5 text-xs font-semibold"
                title="First-time guide"
                id="tour-trigger-btn"
              >
                <Compass className="w-4 h-4 text-terracotta-500" />
                <span>Tour</span>
              </button>
            )}

            {/* Prominent Voice Guide Mute / Unmute Toggle Button */}
            {!isAudioMuted ? (
              <button
                onClick={handleVoiceGuideToggle}
                className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold border transition-all duration-200 bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 ring-2 ring-emerald-500/25 shadow-xs"
                title="Voice Guide: ON (Click to mute instantly)"
                id="voice-guide-toggle-btn"
              >
                <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse flex-shrink-0" />
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span>Voice Guide: ON</span>
                  {/* Animated Sound Wave Bars */}
                  <span className="flex items-end gap-0.5 h-3.5 ml-0.5">
                    <span className="w-0.5 h-full bg-emerald-600 rounded-full animate-pulse" />
                    <span className="w-0.5 h-2/3 bg-emerald-600 rounded-full animate-pulse delay-75" />
                    <span className="w-0.5 h-4/5 bg-emerald-600 rounded-full animate-pulse delay-150" />
                  </span>
                </span>
              </button>
            ) : (
              <button
                onClick={handleVoiceGuideToggle}
                className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 bg-linen-50 text-charcoal-muted border-stone-border hover:bg-linen-200 hover:text-charcoal whitespace-nowrap"
                title="Voice Guide: Muted (Click to unmute and play guide)"
                id="voice-guide-toggle-btn"
              >
                <VolumeX className="w-4 h-4 text-charcoal-light flex-shrink-0" />
                <span>Voice Guide: OFF / Muted</span>
              </button>
            )}

            {/* Multilingual Selector Pill */}
            <div className="relative flex items-center">
              <div className="flex items-center bg-linen-100 hover:bg-linen-200 border border-stone-border rounded-xl px-2.5 py-2 sm:px-3 transition-colors">
                <Globe className="w-4 h-4 text-terracotta-600 mr-1.5 sm:mr-2 flex-shrink-0" />
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-charcoal focus:outline-none cursor-pointer pr-1"
                  aria-label="Select Language"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Profile / Account Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-linen-100 hover:bg-linen-200 border border-stone-border transition-colors text-charcoal"
                id="profile-menu-btn"
                aria-label="User Account Profile"
              >
                <div className="w-7 h-7 rounded-lg bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden lg:block text-left text-xs leading-tight">
                  <span className="font-bold text-charcoal block truncate max-w-[100px]">
                    {authUser?.phone ? `+91 ${authUser.phone}` : 'Artisan'}
                  </span>
                  <span className="text-[10px] text-charcoal-light capitalize font-medium">
                    {role === 'seller' ? 'Seller Account' : 'Buyer Mode'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-light hidden sm:block" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-stone-border shadow-earthy-lg p-2.5 z-50 animate-fade-in text-xs font-medium text-charcoal">
                  <div className="p-2 border-b border-stone-border/80 mb-1">
                    <p className="font-extrabold text-sm text-charcoal truncate">
                      {authUser?.phone ? `+91 ${authUser.phone}` : 'Artisan Account'}
                    </p>
                    <p className="text-[11px] text-forest-700 font-bold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest-600 inline-block" />
                      ONDC Verified Protocol Identity
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const targetRole = role === 'seller' ? 'buyer' : 'seller';
                      setRole(targetRole);
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-linen-100 transition-colors flex items-center gap-2 text-terracotta-700 font-bold"
                  >
                    {role === 'seller' ? (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Switch to Buyer Marketplace</span>
                      </>
                    ) : (
                      <>
                        <Store className="w-4 h-4" />
                        <span>Switch to Artisan Studio</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      if (onStartTour) onStartTour();
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-linen-100 transition-colors flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-charcoal-light" />
                    <span>Quick App Tour</span>
                  </button>

                  <div className="border-t border-stone-border/80 my-1" />

                  <div className="px-2 py-1 text-[10px] text-charcoal-light leading-relaxed">
                    KariDoot v1.0.0 • ONDC Beckn v1.2.0 • 0% Aggregator Fee
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
