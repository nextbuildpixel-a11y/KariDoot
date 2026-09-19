import React, { useState, useEffect, useRef } from 'react';

export default function SplashIntro({ onFinish, onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  const finishCallback = onFinish || onComplete;

  const triggerFadeOut = () => {
    if (fadeOut) return;
    setFadeOut(true);
    setTimeout(() => {
      finishCallback?.();
    }, 600); // 600ms smooth fade-out transition
  };

  useEffect(() => {
    // 6.2-second safety timeout fallback
    const safetyTimer = setTimeout(() => {
      triggerFadeOut();
    }, 6200);

    return () => clearTimeout(safetyTimer);
  }, []);

  return (
    <div
      onClick={triggerFadeOut}
      className={`fixed inset-0 z-50 bg-[#FAF7F2] overflow-hidden flex items-center justify-center transition-opacity duration-600 select-none cursor-pointer ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#FAF7F2' }}
    >
      <video
        ref={videoRef}
        src="/assets/karidoot-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={triggerFadeOut}
        onError={triggerFadeOut}
        className="w-full h-full object-contain mix-blend-multiply border-0 outline-none pointer-events-none"
      />
    </div>
  );
}
