import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Camera, Coins, Send, X, ArrowRight, ArrowLeft, Check, Sparkles, Volume2 } from 'lucide-react';

export default function SpotlightTour({ isOpen, onClose }) {
  const { t, speakText } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: t('tourStep1Title'),
      desc: t('tourStep1Desc'),
      icon: Camera,
      color: 'bg-terracotta-500',
      badge: 'Step 1: AI Vision & Voice',
      tip: 'Natural daylight ensures 99% accuracy in weave thread & natural dye detection.'
    },
    {
      title: t('tourStep2Title'),
      desc: t('tourStep2Desc'),
      icon: Coins,
      color: 'bg-forest-500',
      badge: 'Step 2: Fair Living Wage',
      tip: 'KariDoot calculates fair hourly earnings without the 25-35% commission extracted by big tech aggregators.'
    },
    {
      title: t('tourStep3Title'),
      desc: t('tourStep3Desc'),
      icon: Send,
      color: 'bg-amber-600',
      badge: 'Step 3: ONDC & Direct Sales',
      tip: 'Get instantly listed on Beckn Protocol-enabled buyer apps like Paytm, Pincode, and Magicpin!'
    }
  ];

  const step = steps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleListen = () => {
    speakText(`${step.title}. ${step.desc}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-stone-border shadow-earthy-xl overflow-hidden">
        
        {/* Decorative Top Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-terracotta-500 via-forest-500 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-linen-200 transition-colors"
          aria-label={t('close')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Badge */}
        <div className="flex items-center justify-between mb-6 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linen-200 text-charcoal text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            <span>{step.badge}</span>
          </div>

          <button
            onClick={handleListen}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-600 hover:text-terracotta-700 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Listen</span>
          </button>
        </div>

        {/* Big Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className={`w-20 h-20 rounded-3xl ${step.color} text-white flex items-center justify-center shadow-lg shadow-black/10 animate-bounce`} style={{ animationDuration: '2s' }}>
              <StepIcon className="w-10 h-10" />
            </div>
            <div className="absolute -inset-2 rounded-3xl border-2 border-dashed border-stone-border animate-spin" style={{ animationDuration: '20s' }} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-charcoal mb-3">
            {step.title}
          </h2>
          <p className="text-charcoal-muted text-base leading-relaxed font-medium mb-4">
            {step.desc}
          </p>
          <div className="p-3 bg-linen-100 rounded-2xl border border-stone-border text-left">
            <p className="text-xs text-charcoal-muted font-medium flex items-start gap-2">
              <span className="font-bold text-forest-600 uppercase tracking-wider text-[10px] bg-forest-100 px-1.5 py-0.5 rounded flex-shrink-0">
                Craft Tip
              </span>
              <span>{step.tip}</span>
            </p>
          </div>
        </div>

        {/* Step Progress Dots */}
        <div className="flex justify-center items-center gap-2 mb-8">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-8 bg-terracotta-500'
                  : 'w-2.5 bg-stone-border hover:bg-stone-muted'
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-4">
          {currentStep > 0 ? (
            <button
              onClick={handlePrev}
              className="btn-tactile bg-linen-200 hover:bg-linen-300 text-charcoal flex-1 border border-stone-border"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('previous')}</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-2xl font-bold text-sm text-charcoal-muted hover:text-charcoal transition-colors"
            >
              {t('close')}
            </button>
          )}

          <button
            onClick={handleNext}
            className="btn-tactile bg-terracotta-500 hover:bg-terracotta-600 text-white flex-1 shadow-lg shadow-terracotta-500/20"
            id="tour-next-btn"
          >
            <span>{currentStep === steps.length - 1 ? t('finish') : t('next')}</span>
            {currentStep === steps.length - 1 ? (
              <Check className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
