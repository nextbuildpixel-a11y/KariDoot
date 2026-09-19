import React, { useState, useRef, useEffect } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { Sparkles, Scissors, ArrowRight, ArrowLeft, Loader2, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Canvas Composite Generator for high-resolution 4:5 catalog export (100% Pure Built-in Code)
async function exportCompositeImage(
  rawSrc,
  cutoutSrc,
  mode = 'travertine',
  cutoutBg = 'white'
) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1500; // Strict 4:5 catalog portrait ratio
    const ctx = canvas.getContext('2d');

    const craftImg = new Image();
    craftImg.crossOrigin = 'anonymous';

    const drawCraftAndResolve = () => {
      const padding = 50;
      const targetW = canvas.width - padding * 2;
      const targetH = canvas.height - padding * 2;
      const imgW = craftImg.naturalWidth || 1;
      const imgH = craftImg.naturalHeight || 1;
      const scale = Math.min(targetW / imgW, targetH / imgH);
      const w = imgW * scale;
      const h = imgH * scale;
      const x = padding + (targetW - w) / 2;
      const y = padding + (targetH - h) / 2;

      ctx.drawImage(craftImg, x, y, w, h);
      try {
        const mime = mode === 'cutout' && cutoutBg === 'transparent' ? 'image/png' : 'image/jpeg';
        resolve(canvas.toDataURL(mime, 0.95));
      } catch (err) {
        resolve(cutoutSrc || rawSrc);
      }
    };

    const drawGroundingShadow = () => {
      const shadowY = canvas.height * 0.83;
      const shadowGrad = ctx.createRadialGradient(
        canvas.width / 2, shadowY, 15,
        canvas.width / 2, shadowY, canvas.width * 0.34
      );
      shadowGrad.addColorStop(0, 'rgba(30, 27, 24, 0.28)');
      shadowGrad.addColorStop(0.5, 'rgba(30, 27, 24, 0.10)');
      shadowGrad.addColorStop(1, 'rgba(30, 27, 24, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, shadowY, canvas.width * 0.34, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    if (mode === 'travertine') {
      // 1. Base Travertine linear gradient: #F3EFEA to #E5DDD0 to #D8CEBD
      const baseGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      baseGrad.addColorStop(0, '#F3EFEA');
      baseGrad.addColorStop(0.5, '#E5DDD0');
      baseGrad.addColorStop(1, '#D8CEBD');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Radial daylight highlight (top-left)
      const hlGrad = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.15, 0,
        canvas.width * 0.2, canvas.height * 0.15, canvas.width * 0.65
      );
      hlGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      hlGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = hlGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Warm stone ambient depth (bottom-right)
      const shGrad = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.85, 0,
        canvas.width * 0.8, canvas.height * 0.85, canvas.width * 0.6
      );
      shGrad.addColorStop(0, 'rgba(210, 198, 180, 0.5)');
      shGrad.addColorStop(1, 'rgba(210, 198, 180, 0)');
      ctx.fillStyle = shGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 4. Grounding contact shadow beneath product
      drawGroundingShadow();

      craftImg.onload = drawCraftAndResolve;
      craftImg.onerror = () => resolve(cutoutSrc || rawSrc);
      craftImg.src = cutoutSrc || rawSrc;
    } else if (mode === 'cyclorama') {
      // Studio Cyclorama: #F5F3EE with soft radial lighting
      ctx.fillStyle = '#F5F3EE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cycGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.45, 120,
        canvas.width / 2, canvas.height * 0.5, canvas.width * 0.72
      );
      cycGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      cycGrad.addColorStop(0.6, 'rgba(245, 243, 238, 0.35)');
      cycGrad.addColorStop(1, 'rgba(224, 219, 210, 0.6)');
      ctx.fillStyle = cycGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGroundingShadow();

      craftImg.onload = drawCraftAndResolve;
      craftImg.onerror = () => resolve(cutoutSrc || rawSrc);
      craftImg.src = cutoutSrc || rawSrc;
    } else {
      // Pure Cutout Mode
      if (cutoutBg === 'white') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      craftImg.onload = drawCraftAndResolve;
      craftImg.onerror = () => resolve(cutoutSrc || rawSrc);
      craftImg.src = cutoutSrc || rawSrc;
    }
  });
}

export default function PhotoStudio({ craftData, onStudioComplete, onBack }) {
  const { t } = useLanguage();

  // Use authentic artisan photo, avoiding any tool bench references
  const rawWorkshopImage =
    craftData?.rawImage ||
    craftData?.image ||
    'https://images.unsplash.com/photo-1585336261026-7f41df086127?auto=format&fit=crop&w=1200&q=80';

  // Modes: 'travertine' (Pure Studio Travertine) | 'cyclorama' (Studio Cyclorama) | 'cutout' (Pure Cutout)
  const [activeMode, setActiveMode] = useState('travertine');
  const [cutoutBg, setCutoutBg] = useState('white');

  const [cutoutBlobUrl, setCutoutBlobUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('Segmenting craft contours with AI...');

  // Comparison slider (0 to 100%)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Background removal on mount
  useEffect(() => {
    let isMounted = true;
    setIsProcessing(true);
    setProcessingStatus('Isolating craft with AI background removal...');

    removeBackground(rawWorkshopImage, {
      model: 'small',
      output: { format: 'image/png', quality: 0.9, type: 'foreground' }
    })
      .then((blob) => {
        if (!isMounted) return;
        setCutoutBlobUrl(URL.createObjectURL(blob));
        setIsProcessing(false);
      })
      .catch((err) => {
        console.warn('Fallback to raw workshop image:', err);
        if (!isMounted) return;
        setCutoutBlobUrl(rawWorkshopImage);
        setIsProcessing(false);
      });

    return () => { isMounted = false; };
  }, [rawWorkshopImage]);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(percentage);
  };

  useEffect(() => {
    const onPointerMove = (e) => { if (isDragging) handleMove(e.clientX); };
    const onPointerUp = () => setIsDragging(false);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isDragging]);

  const handleProceed = async () => {
    setIsProcessing(true);
    setProcessingStatus('Exporting high-resolution 4:5 staging for Catalog AI...');

    try {
      const activeEnhanced = await exportCompositeImage(
        rawWorkshopImage,
        cutoutBlobUrl || rawWorkshopImage,
        activeMode,
        cutoutBg
      );

      onStudioComplete({
        ...craftData,
        rawImage: rawWorkshopImage,
        image: rawWorkshopImage,
        enhancedImage: activeEnhanced,
        stagedImage: activeEnhanced,
        studioMode: activeMode,
        cutoutBg: activeMode === 'cutout' ? cutoutBg : 'travertine',
        isCutout: activeMode === 'cutout'
      });
    } catch (err) {
      console.error('Export failed:', err);
      onStudioComplete({
        ...craftData,
        rawImage: rawWorkshopImage,
        enhancedImage: cutoutBlobUrl || rawWorkshopImage
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cutoutUrl = cutoutBlobUrl || rawWorkshopImage;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Stage 2 of 5 · Visual Studio
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-2">
            AI Craft Studio & Staging
          </h1>
          <p className="text-sm text-stone-600">
            Eliminate workshop clutter and restage your craft on clean, editorial studio surfaces.
          </p>
        </div>

        {/* 3 Clean Surface Modes */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveMode('travertine')}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'travertine' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600"/>
              <span>{t('studioTravertine')}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('cyclorama')}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'cyclorama' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-stone-600"/>
              <span>{t('studioCyclorama')}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('cutout')}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'cutout' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-stone-700"/>
              <span>{t('studioCutout')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pure Cutout Canvas Sub-Toggle */}
      {activeMode === 'cutout' && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">{t('canvasLabel')}</span>
          <button
            type="button"
            onClick={() => setCutoutBg('white')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              cutoutBg === 'white' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:text-stone-900'
            }`}
          >
            Pure White (#FFFFFF)
          </button>
          <button
            type="button"
            onClick={() => setCutoutBg('transparent')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              cutoutBg === 'transparent' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:text-stone-900'
            }`}
          >
            Transparent Grid
          </button>
        </div>
      )}

      {/* Main Studio Canvas Container - Strict 4:5 Aspect Ratio Viewport */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200">
        
        {/* Strict 4:5 catalog aspect ratio viewport to eliminate white void and synchronize slider */}
        <div
          ref={containerRef}
          onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
          onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          onTouchMove={(e) => { if (isDragging) handleMove(e.touches[0].clientX); }}
          onTouchEnd={() => setIsDragging(false)}
          className="relative w-full max-w-[440px] mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 select-none cursor-ew-resize bg-stone-100"
        >
          {/* LAYER 1: BEFORE (Raw Workshop) */}
          <div className="absolute inset-0 w-full h-full bg-stone-100">
            <img
              src={rawWorkshopImage}
              alt="Raw Workshop"
              className="absolute inset-0 w-full h-full object-contain p-4 pointer-events-none"
            />
            <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full border border-white/20 shadow-md z-10">
              {t('beforeLabel')}
            </div>
          </div>

          {/* LAYER 2: AFTER (Uncluttered Studio Staging) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            {activeMode === 'travertine' ? (
              <div className="relative w-full h-full">
                {/* Pure Travertine Studio Backdrop (100% Reliable Built-in CSS, No External URLs) */}
                <div 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    backgroundColor: '#EAE4D9',
                    backgroundImage: `
                      radial-gradient(at 20% 15%, rgba(255, 255, 255, 0.7) 0px, transparent 55%),
                      radial-gradient(at 80% 85%, rgba(210, 198, 180, 0.5) 0px, transparent 50%),
                      linear-gradient(135deg, #F3EFEA 0%, #E5DDD0 50%, #D8CEBD 100%)
                    `
                  }}
                >
                  {/* Subtle natural stone grain texture */}
                  <div className="absolute inset-0 opacity-15 mix-blend-multiply bg-[radial-gradient(#8C7D6B_1px,transparent_1px)] [background-size:12px_12px]" />
                </div>

                {/* Realistic Grounding Contact Shadow Beneath Product */}
                <div className="absolute bottom-[17%] left-1/2 -translate-x-1/2 w-3/5 h-6 bg-stone-900/30 blur-md rounded-full pointer-events-none" />

                {/* Staged Craft (Exact 1:1 Pixel Registration with Before Layer) */}
                <img
                  src={cutoutUrl}
                  alt="Staged Craft"
                  className="absolute inset-0 w-full h-full object-contain p-4 pointer-events-none"
                  style={{ filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.18)) contrast(1.02)' }}
                />
              </div>
            ) : activeMode === 'cyclorama' ? (
              <div className="relative w-full h-full bg-[#F5F3EE]">
                {/* Studio Cyclorama: Shadow-graded neutral studio backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.9)_0%,rgba(245,243,238,0.5)_60%,rgba(224,219,210,0.7)_100%)] pointer-events-none" />

                {/* Realistic Grounding Contact Shadow */}
                <div className="absolute bottom-[17%] left-1/2 -translate-x-1/2 w-3/5 h-6 bg-stone-900/25 blur-md rounded-full pointer-events-none" />

                {/* Staged Craft (Exact 1:1 Pixel Registration) */}
                <img
                  src={cutoutUrl}
                  alt="Staged Craft"
                  className="absolute inset-0 w-full h-full object-contain p-4 pointer-events-none"
                  style={{ filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.15)) contrast(1.02)' }}
                />
              </div>
            ) : (
              <div className={`relative w-full h-full ${cutoutBg === 'white' ? 'bg-white' : 'bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] bg-stone-50'}`}>
                <div className="absolute bottom-[17%] left-1/2 -translate-x-1/2 w-1/2 h-5 bg-stone-900/15 blur-md rounded-full pointer-events-none" />
                <img
                  src={cutoutUrl}
                  alt="Isolated Craft"
                  className="absolute inset-0 w-full h-full object-contain p-4 pointer-events-none"
                />
              </div>
            )}

            <div className="absolute top-4 right-4 bg-emerald-800/90 backdrop-blur-xs text-white text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full border border-white/20 shadow-md z-10">
              {t('afterLabel')}
            </div>
          </div>

          {/* Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)] cursor-ew-resize z-30 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-stone-800 shadow-xl border border-stone-300 flex items-center justify-center text-xs font-bold select-none cursor-ew-resize hover:scale-105 active:scale-95 transition-transform">
              ⇄
            </div>
          </div>
        </div>

        {/* Comparison Slider Guide */}
        <div className="flex justify-between items-center text-xs font-mono text-stone-500 mt-3 max-w-[440px] mx-auto px-1">
          <span>{t('slideLeftHint')}</span>
          <span className="font-bold text-stone-700">{t('slideHint')}</span>
          <span>{t('slideRightHint')}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4"/>
          <span>{t('backToScanner')}</span>
        </button>

        <button
          type="button"
          onClick={handleProceed}
          disabled={isProcessing}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin"/>
              <span>{processingStatus}</span>
            </>
          ) : (
            <>
              <span>{t('nextCatalog')}</span>
              <ArrowRight className="w-4 h-4"/>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
