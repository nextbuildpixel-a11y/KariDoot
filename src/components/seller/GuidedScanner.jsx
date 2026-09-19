import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Camera,
  Upload,
  Scan,
  Focus,
  SunMedium,
  CheckCircle2,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

const CRAFT_PRESETS = [
  {
    id: 'pen',
    chipLabel: '🖊️ Handcrafted Pen',
    title: 'Handcrafted Wooden Pen',
    category: 'Woodcraft & Metal Inlay',
    region: 'Srinagar, Jammu & Kashmir',
    artisan: 'Bashir Ahmed',
    imageUrl: 'https://images.unsplash.com/photo-1585336261026-7f41df086127?auto=format&fit=crop&w=1200&q=80',
    voiceStory: 'Hand-turned Walnut wood pen with solid brass clip and nib casing. Polished with natural beeswax and organic walnut oil over 6 hours of precision woodturning.'
  },
  {
    id: 'blanket',
    chipLabel: '🧣 Woolen Blanket',
    title: 'Handwoven Woolen Blanket',
    category: 'Textiles & Handloom',
    region: 'Kutch, Gujarat',
    artisan: 'Devji Vankar',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80',
    voiceStory: 'Woven on a traditional throw-shuttle loom using indigenous Desi sheep wool. Hand-spun yarn dyed with natural turmeric, harda, and madder root with authentic Kutch border patterns.'
  },
  {
    id: 'pot',
    chipLabel: '🏺 Terracotta Pot',
    title: 'Handmade Terracotta Pot',
    category: 'Earthenware & Pottery',
    region: 'Panchmura, West Bengal',
    artisan: 'Saraswati Kumbhakar',
    imageUrl: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=1200&q=80',
    voiceStory: 'Wheel-thrown river alluvial clay with hand-carved geometric motifs, fired in an open pit kiln at 850 degrees. Naturally porous earthenware keeping water cool and mineral-rich.'
  }
];

export default function GuidedScanner({ activeProduct, onScanComplete }) {
  const { speakText } = useLanguage();

  const [rawImage, setRawImage] = useState(activeProduct?.rawImage || activeProduct?.image || null);
  const [selectedPreset, setSelectedPreset] = useState(activeProduct?.presetData || null);
  const [cameraActive, setCameraActive] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Live device camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      speakText('Camera active. Align craft inside viewfinder and snap frame.');
    } catch (err) {
      console.warn('Unable to access device camera:', err);
      setCameraActive(false);
      speakText('Camera not accessible. Please browse a craft file.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');

    setRawImage(dataUrl);
    setSelectedPreset({
      title: 'Workshop Raw Capture',
      region: 'Artisan Workshop, India',
      artisan: 'Independent Craftsperson',
      voiceStory: 'Handcrafted artisan craft photographed directly in workshop.'
    });
    stopCamera();
    speakText('Craft frame captured!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRawImage(url);
      setSelectedPreset({
        title: file.name.replace(/\.[^/.]+$/, ''),
        region: 'Local Craft Workshop',
        artisan: 'Master Artisan',
        voiceStory: 'Raw workshop photograph uploaded for AI cataloging.'
      });
      stopCamera();
      speakText('Photo uploaded successfully!');
    }
  };

  const selectPreset = (preset) => {
    setSelectedPreset(preset);
    setRawImage(preset.imageUrl);
    stopCamera();
    speakText(`Selected ${preset.title}. Ready for AI Studio.`);
  };

  const handleReset = () => {
    setRawImage(null);
    setSelectedPreset(null);
    stopCamera();
  };

  const handleProceed = () => {
    if (!rawImage) return;
    onScanComplete({
      ...activeProduct,
      rawImage: rawImage,
      image: rawImage,
      presetData: selectedPreset || CRAFT_PRESETS[0],
      voiceStory: selectedPreset?.voiceStory || CRAFT_PRESETS[0].voiceStory
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      
      {/* Viewfinder Focus Target Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-3xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center border border-terracotta-200 shadow-xs">
          <Scan className="w-8 h-8" />
        </div>
      </div>

      {/* Main Upload & Camera Card on #FAF7F2 Canvas */}
      <div className="card-artisan p-6 sm:p-10 bg-white border border-stone-border shadow-earthy">
        
        {/* Title & Subtitle */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight mb-2">
            Upload Any Artisan Craft Photo
          </h2>
          <p className="text-sm text-charcoal-muted max-w-lg mx-auto font-medium leading-relaxed">
            Take a raw mobile photo of your handicraft directly in your workshop. Clutter will be eliminated automatically with dual-mode studio processing.
          </p>
        </div>

        {/* Live Camera Viewfinder Overlay (When Active) */}
        {cameraActive && (
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-xl aspect-4/3 rounded-3xl overflow-hidden bg-linen-200 border-2 border-stone-border shadow-md flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Rule-of-Thirds Grid */}
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-stone-border/40">
                <div className="border-r border-b border-stone-border/30" />
                <div className="border-r border-b border-stone-border/30" />
                <div className="border-b border-stone-border/30" />
                <div className="border-r border-b border-stone-border/30" />
                <div className="border-r border-b border-stone-border/30">
                  <div className="w-full h-full border-2 border-terracotta-500 rounded-2xl relative shadow-xs" />
                </div>
                <div className="border-b border-stone-border/30" />
                <div className="border-r border-stone-border/30" />
                <div className="border-r border-stone-border/30" />
                <div />
              </div>

              {/* Lighting Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur text-charcoal border border-stone-border text-xs font-bold shadow-xs">
                <SunMedium className="w-3.5 h-3.5 text-amber-500" />
                <span>Lighting: Optimal (Natural Daylight)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={stopCamera}
                className="btn-tactile bg-linen-200 hover:bg-linen-300 text-charcoal text-xs border border-stone-border"
              >
                Cancel Camera
              </button>
              <button
                onClick={captureCameraFrame}
                className="btn-tactile bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm shadow-md shadow-terracotta-500/20 px-6 font-bold"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Frame</span>
              </button>
            </div>
          </div>
        )}

        {/* Selected Raw Photo Preview Card */}
        {!cameraActive && rawImage && (
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden bg-linen-100 border-2 border-stone-border shadow-md group">
              <img
                src={rawImage}
                alt="Raw craft preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-white/95 backdrop-blur rounded-full text-xs font-bold text-forest-800 border border-stone-border shadow-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
                <span>Raw Photo Ready</span>
              </div>
            </div>

            {/* Selected Info & Retake Action */}
            <div className="w-full max-w-lg mt-4 flex items-center justify-between p-3.5 rounded-2xl bg-linen-100 border border-stone-border">
              <div>
                <h4 className="font-extrabold text-sm text-charcoal">
                  {selectedPreset?.title || 'Selected Craft Photo'}
                </h4>
                <p className="text-[11px] text-charcoal-muted">
                  {selectedPreset?.region || 'Ready for Dual-Mode AI Staging'}
                </p>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-stone-border hover:border-terracotta-400 text-charcoal text-xs font-bold transition-colors shadow-2xs"
                id="retake-replace-btn"
              >
                <RotateCcw className="w-3.5 h-3.5 text-terracotta-600" />
                <span>Retake / Replace</span>
              </button>
            </div>
          </div>
        )}

        {/* Dual Action Buttons (Tactile 56px height) */}
        {!cameraActive && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-8">
            
            {/* Action 1: Live Camera */}
            <button
              onClick={startCamera}
              className="btn-tactile bg-terracotta-500 hover:bg-terracotta-600 text-white w-full sm:flex-1 shadow-md shadow-terracotta-500/20 text-base font-bold min-h-[56px]"
              id="live-camera-action-btn"
            >
              <Camera className="w-5 h-5" />
              <span>📷 Live Camera</span>
            </button>

            {/* Action 2: Browse File */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-tactile bg-white hover:bg-linen-100 text-charcoal border-2 border-stone-border hover:border-charcoal w-full sm:flex-1 text-base font-bold shadow-xs min-h-[56px]"
              id="browse-file-action-btn"
            >
              <Upload className="w-5 h-5 text-charcoal-muted" />
              <span>📁 Browse File</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />
          </div>
        )}

        {/* Divider */}
        <div className="w-full flex items-center gap-4 mb-6">
          <div className="h-px bg-stone-border flex-1" />
          <span className="text-[11px] font-black uppercase tracking-wider text-charcoal-light whitespace-nowrap">
            OR TRY INSTANTLY WITH SAMPLE ARTISAN PHOTOS:
          </span>
          <div className="h-px bg-stone-border flex-1" />
        </div>

        {/* 3 Quick Preset Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mx-auto mb-6">
          {CRAFT_PRESETS.map((preset) => {
            const isSelected = selectedPreset?.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => selectPreset(preset)}
                className={`p-3 rounded-2xl border flex items-center gap-3 transition-all text-left shadow-2xs ${
                  isSelected
                    ? 'bg-terracotta-50 border-terracotta-500 ring-2 ring-terracotta-500/20'
                    : 'bg-linen-50 border-stone-border hover:bg-white hover:border-terracotta-300'
                }`}
              >
                <img
                  src={preset.imageUrl}
                  alt={preset.title}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-stone-border"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-xs text-charcoal truncate">
                    {preset.chipLabel}
                  </p>
                  <p className="text-[10px] text-charcoal-light truncate mt-0.5">
                    {preset.region}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Primary Action Button: "Next: AI Photo Studio →" */}
        {rawImage && (
          <div className="pt-6 border-t border-stone-border">
            <button
              onClick={handleProceed}
              className="btn-tactile-lg bg-terracotta-500 hover:bg-terracotta-600 text-white w-full shadow-lg shadow-terracotta-500/25 group text-lg font-black min-h-[56px]"
              id="proceed-to-studio-btn"
            >
              <span>Next: AI Photo Studio →</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
