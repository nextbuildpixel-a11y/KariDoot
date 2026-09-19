import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

export default function VoiceRecorder({ craftData, onVoiceComplete, onBack }) {
  const { t, speakText, currentLang } = useLanguage();

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(
    craftData?.voiceStory ||
    'I wove this silk saree using heritage gold zari threads. Each border motif took over 72 hours on a traditional handloom using natural indigo and madder root dyes.'
  );

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = currentLang === 'hi' ? 'hi-IN' :
                         currentLang === 'te' ? 'te-IN' :
                         currentLang === 'ta' ? 'ta-IN' :
                         currentLang === 'bn' ? 'bn-IN' :
                         currentLang === 'mr' ? 'mr-IN' : 'en-IN';

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        if (currentText) {
          setTranscript(currentText);
        }
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition warning:', e);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentLang]);

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsRecording(false);
      speakText('Voice story saved! You can edit or proceed to AI staging.');
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.warn('Speech recognition already active or unavailable:', e);
        }
      }
      setIsRecording(true);
    }
  };

  const handleProceed = () => {
    onVoiceComplete({
      ...craftData,
      voiceStory: transcript
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Mic className="w-3.5 h-3.5 text-forest-600" />
          <span>Stage 2 of 6: Voice Story Recorder</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
          Record Your Craft Story
        </h2>
        <p className="text-base text-charcoal-muted mt-2 max-w-xl mx-auto font-medium">
          Speak in your native language. KariDoot's Indic AI will extract authenticity, materials, and weaving heritage.
        </p>
      </div>

      {/* Main Recording Card */}
      <div className="card-artisan p-6 sm:p-10 bg-white border border-stone-border shadow-earthy mb-8">
        
        {/* Selected Craft Quick Glance Bar */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-linen-100 border border-stone-border mb-8">
          <img
            src={craftData?.image}
            alt="Selected craft"
            className="w-16 h-16 rounded-xl object-cover border border-stone-border flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-forest-700 bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
              Active Craft
            </span>
            <h4 className="font-black text-base text-charcoal truncate mt-0.5">
              {craftData?.presetData?.title || 'Heritage Handmade Craft'}
            </h4>
            <p className="text-xs text-charcoal-muted truncate">
              {craftData?.presetData?.artisan} • {craftData?.presetData?.region}
            </p>
          </div>
        </div>

        {/* Centered Audio Prompt */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <p className="text-base sm:text-lg font-bold text-charcoal leading-snug">
            "Press and describe your craft in your native language (materials used, weaving time, tradition)."
          </p>
          <p className="text-xs text-charcoal-light mt-2 font-medium">
            (उदाहरण: "मैंने यह रेशमी साड़ी शुद्ध सोने की ज़री से ३ दिनों में बुनी है...")
          </p>
        </div>

        {/* Centered Pulsing 80px Tactile Microphone Button */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative flex items-center justify-center">
            
            {/* Outer Pulsing Aura Ring */}
            <div
              className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                isRecording
                  ? 'bg-rose-500/25 animate-ping'
                  : 'bg-forest-500/15 animate-pulse'
              }`}
            />

            {/* Main 80px Button */}
            <button
              onClick={toggleRecording}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-white transition-transform active:scale-95 shadow-xl select-none ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/40'
                  : 'bg-forest-600 hover:bg-forest-700 shadow-forest-600/35'
              }`}
              id="center-voice-record-btn"
              aria-label={isRecording ? 'Stop Recording' : 'Start Recording Voice'}
            >
              {isRecording ? (
                <MicOff className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" />
              ) : (
                <Mic className="w-10 h-10 sm:w-12 sm:h-12" />
              )}
            </button>
          </div>

          <span className="mt-4 text-xs font-black uppercase tracking-wider text-charcoal">
            {isRecording ? 'Listening... Tap to Save' : 'Tap Microphone to Speak'}
          </span>
        </div>

        {/* Live Waveform Visualization */}
        {isRecording && (
          <div className="flex items-center justify-center gap-1.5 h-12 my-4 bg-linen-100 rounded-2xl px-6 max-w-sm mx-auto border border-stone-border">
            <div className="w-1.5 bg-rose-500 rounded-full animate-[bounce_0.6s_infinite] h-8" />
            <div className="w-1.5 bg-rose-500 rounded-full animate-[bounce_0.9s_infinite] h-10" />
            <div className="w-1.5 bg-rose-500 rounded-full animate-[bounce_0.4s_infinite] h-5" />
            <div className="w-1.5 bg-rose-500 rounded-full animate-[bounce_0.8s_infinite] h-11" />
            <div className="w-1.5 bg-rose-500 rounded-full animate-[bounce_0.5s_infinite] h-6" />
            <div className="w-1.5 bg-rose-500 rounded-full animate-[bounce_1.0s_infinite] h-9" />
            <span className="text-xs font-bold text-rose-600 ml-3">Recording Audio...</span>
          </div>
        )}

        {/* Captured Transcript Display */}
        <div className="mt-6 p-5 rounded-2xl bg-linen-100 border border-stone-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-charcoal-light flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-forest-600" />
              <span>Captured Craft Narrative Transcript:</span>
            </span>
            <button
              onClick={() => speakText(transcript)}
              className="text-xs font-bold text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full bg-white p-3.5 rounded-xl border border-stone-border text-sm leading-relaxed text-charcoal font-medium focus:outline-none focus:border-terracotta-500 resize-none shadow-2xs"
            placeholder="Your spoken words will appear here in real time..."
          />
        </div>

      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="btn-tactile bg-linen-200 hover:bg-linen-300 text-charcoal border border-stone-border flex-1"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Photo</span>
        </button>

        <button
          onClick={handleProceed}
          className="btn-tactile-lg bg-terracotta-500 hover:bg-terracotta-600 text-white flex-2 shadow-lg shadow-terracotta-500/25 group"
          id="proceed-to-studio-stage-btn"
        >
          <span>Next: AI Staging Studio →</span>
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

    </section>
  );
}
