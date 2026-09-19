import React, { useState } from 'react';
import { useLanguage, STAGE_AUDIO_SCRIPTS } from '../../context/LanguageContext';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AudioGuide({ currentStage = 'scanner', customScript }) {
  const {
    speakText,
    stopSpeaking,
    isSpeaking,
    isAudioMuted,
    toggleAudioMute
  } = useLanguage();

  const [showTooltip, setShowTooltip] = useState(false);

  const activeScript = customScript || STAGE_AUDIO_SCRIPTS[currentStage] || STAGE_AUDIO_SCRIPTS.scanner;

  const handleClick = () => {
    if (isSpeaking) {
      // If speaking: Click to instantly pause/mute
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopSpeaking();
      toggleAudioMute();
    } else if (isAudioMuted) {
      // If muted: Click to unmute and replay current stage instructions
      toggleAudioMute();
      speakText(activeScript);
    } else {
      // If unmuted & idle: Replay current stage instructions
      speakText(activeScript);
    }
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3 select-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Floating Speaker Action Button */}
      <button
        onClick={handleClick}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 ${
          isSpeaking
            ? 'bg-gradient-to-tr from-emerald-600 to-forest-500 text-white shadow-emerald-500/40 ring-4 ring-emerald-300 scale-105 animate-pulse'
            : isAudioMuted
            ? 'bg-white text-charcoal-muted border-2 border-stone-border hover:border-terracotta-400 hover:text-terracotta-600 shadow-earthy ring-stone-200'
            : 'bg-white text-terracotta-600 border-2 border-terracotta-400 hover:bg-terracotta-50 shadow-earthy ring-terracotta-200'
        }`}
        title={
          isSpeaking
            ? 'Speaking instructions... (Click to mute)'
            : isAudioMuted
            ? 'Voice guide is muted (Click to unmute & listen)'
            : 'Voice guide active (Click to listen again)'
        }
        aria-label="Voice Assistance Guide"
        id="floating-audio-guide-btn"
      >
        {/* Pulsing radar waves when actively speaking */}
        {isSpeaking && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
        )}

        {isAudioMuted ? (
          <VolumeX className="w-6 h-6 flex-shrink-0" />
        ) : (
          <Volume2 className={`w-6 h-6 flex-shrink-0 ${isSpeaking ? 'animate-bounce' : ''}`} />
        )}

        {/* Small live audio indicator dot */}
        {isSpeaking && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-xs" />
        )}
      </button>

      {/* Floating Micro Status Pill / Tooltip */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-border shadow-earthy transition-all duration-200 pointer-events-none ${
          showTooltip || isSpeaking ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}
      >
        {isSpeaking ? (
          <>
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-full bg-emerald-600 rounded-full animate-pulse" />
              <span className="w-0.5 h-2/3 bg-emerald-600 rounded-full animate-pulse delay-75" />
              <span className="w-0.5 h-4/5 bg-emerald-600 rounded-full animate-pulse delay-150" />
            </span>
            <span className="text-xs font-black text-emerald-800 tracking-tight">
              Playing Stage Audio Guide (Click to Mute)
            </span>
          </>
        ) : isAudioMuted ? (
          <>
            <span className="w-2 h-2 rounded-full bg-stone-400" />
            <span className="text-xs font-bold text-charcoal-muted tracking-tight">
              Voice Muted (Click speaker to listen)
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500 animate-spin" />
            <span className="text-xs font-bold text-charcoal tracking-tight">
              Voice Guide Ready (Click to hear instructions)
            </span>
          </>
        )}
      </div>
    </div>
  );
}
