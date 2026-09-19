import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import SplashIntro from './components/SplashIntro';
import AuthGate from './components/auth/AuthGate';
import Navbar from './components/common/Navbar';
import AudioGuide from './components/common/AudioGuide';
import SpotlightTour from './components/SpotlightTour';

// Seller Components (5 Stages)
import GuidedScanner from './components/seller/GuidedScanner';
import PhotoStudio from './components/seller/PhotoStudio';
import AICataloger from './components/seller/AICataloger';
import FairPricing from './components/seller/FairPricing';
import ExportMatrix from './components/seller/ExportMatrix';
import OrderAlertSim from './components/seller/OrderAlertSim';

// Buyer Components
import BuyerMarketplace from './components/buyer/BuyerMarketplace';
import ProductReviews from './components/buyer/ProductReviews';
import OrderTracker from './components/buyer/OrderTracker';
import KariBot from './components/chat/KariBot';

import {
  Sparkles,
  Store,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Share2,
  Award,
  MapPin,
  Clock,
  Coins
} from 'lucide-react';

function KariDootApp() {
  const { t, isAudioMuted, speakText, stageAudioScripts } = useLanguage();

  // App Master States
  const [showSplash, setShowSplash] = useState(true);
  
  // Role & Phone Authentication Gate (Mandatory on load post-intro)
  const [authUser, setAuthUser] = useState(null);

  const [showTour, setShowTour] = useState(false);
  const [role, setRole] = useState('seller'); // 'seller' | 'buyer'
  
  // Seller 5-Stage Direct Pipeline: 'scanner' | 'studio' | 'cataloger' | 'pricing' | 'export'
  const [sellerStep, setSellerStep] = useState('scanner');
  const [activeProduct, setActiveProduct] = useState(null);

  // Buyer Flow: 'marketplace' | 'detail' | 'tracker'
  const [buyerStep, setBuyerStep] = useState('marketplace');
  const [selectedBuyerProduct, setSelectedBuyerProduct] = useState(null);
  const [newlyAddedCraft, setNewlyAddedCraft] = useState(null);

  // Auto-narrate stage instructions when moving between stages (unless muted)
  useEffect(() => {
    if (!authUser || showSplash) return;
    if (isAudioMuted) return; // Safety check: Never auto-play if isAudioMuted === true
    const stageKey = role === 'seller' ? sellerStep : 'marketplace';
    const script = stageAudioScripts[stageKey];
    if (script) {
      speakText(script);
    }
  }, [sellerStep, role, authUser, showSplash]);

  // Auth Completion Handler
  const handleAuthenticated = (chosenRole, phone) => {
    const session = { role: chosenRole, phone, verified: true };
    localStorage.setItem('karidoot_auth', JSON.stringify(session));
    setAuthUser(session);
    setRole(chosenRole);
    if (chosenRole === 'seller') {
      setSellerStep('scanner');
    } else {
      setBuyerStep('marketplace');
    }
  };

  // Handlers for Seller Wizard (Direct Pipeline)
  const handleScanComplete = (scanData) => {
    setActiveProduct(scanData);
    setSellerStep('studio');
  };

  const handleStudioComplete = (studioData) => {
    setActiveProduct(studioData);
    setSellerStep('cataloger');
  };

  const handleCatalogComplete = (catalogData) => {
    setActiveProduct(catalogData);
    setSellerStep('pricing');
  };

  const handlePricingComplete = (pricingData) => {
    setActiveProduct(pricingData);
    setSellerStep('export');
  };

  const handleExportDone = () => {
    // When seller finishes export, propagate item to Buyer Marketplace & switch view
    setNewlyAddedCraft(activeProduct);
    setRole('buyer');
    setBuyerStep('marketplace');
  };

  // Handlers for Buyer Experience
  const handleSelectProduct = (product) => {
    setSelectedBuyerProduct(product);
    setBuyerStep('detail');
  };

  const handleBuyProduct = (product) => {
    setSelectedBuyerProduct(product);
    setBuyerStep('tracker');
  };

  return (
    <div className="min-h-screen bg-linen-100 flex flex-col selection:bg-terracotta-200 selection:text-terracotta-900">
      
      {/* 1. Full-Screen Cinematic Splash Intro Screen */}
      {showSplash && (
        <SplashIntro
          onFinish={() => setShowSplash(false)}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* 2. Mandatory Role Selection & Phone Authentication Gate */}
      {!showSplash && !authUser && (
        <AuthGate onAuthenticated={handleAuthenticated} />
      )}

      {/* 3. Main Application Surface (Revealed strictly upon authentication) */}
      {!showSplash && authUser && (
        <>
          {/* Top Navigation Bar with Voice Guide Toggle */}
          <Navbar
            role={role}
            setRole={(newRole) => {
              setRole(newRole);
              if (newRole === 'buyer') setBuyerStep('marketplace');
            }}
            authUser={authUser}
            onStartTour={() => setShowTour(true)}
            currentStage={role === 'seller' ? sellerStep : buyerStep}
          />

          {/* Interactive First-Time Seller Spotlight Tour */}
          <SpotlightTour
            isOpen={showTour}
            onClose={() => setShowTour(false)}
          />

          {/* Sub-Header Bar with Active ONDC Status & Spoken Order Alert Test (Strictly Seller Only) */}
          {role === 'seller' && (
            <div className="bg-linen-200 border-b border-stone-border py-2.5 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-charcoal">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t('ondcLiveStatus')}</span>
                  <span className="text-charcoal-light hidden sm:inline">• {t('zeroCommMode')}</span>
                </div>

                {/* Spoken Order Alert Test Button */}
                <OrderAlertSim activeCraftTitle={activeProduct?.catalog?.title || 'Handcrafted Wooden Pen'} />
              </div>
            </div>
          )}

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* ================= SELLER ARTISAN STUDIO FLOW (5 STAGES) ================= */}
        {role === 'seller' && (
          <div>
            {/* Step Progress Stepper Chips */}
            <div className="max-w-5xl mx-auto px-4 pt-6">
              <div className="flex items-center justify-between overflow-x-auto pb-2 gap-2 text-xs font-extrabold text-charcoal-light">
                
                {/* 1. Photo Scanner */}
                <button
                  onClick={() => setSellerStep('scanner')}
                  className={`px-3.5 py-2 rounded-xl border whitespace-nowrap transition-colors ${
                    sellerStep === 'scanner' ? 'bg-terracotta-500 text-white border-terracotta-600 shadow-xs' : 'bg-white border-stone-border hover:bg-linen-100'
                  }`}
                >
                  {t('step1')}
                </button>
                <span className="text-stone-300">→</span>

                {/* 2. AI Photo Studio */}
                <button
                  onClick={() => activeProduct && setSellerStep('studio')}
                  className={`px-3.5 py-2 rounded-xl border whitespace-nowrap transition-colors ${
                    sellerStep === 'studio' ? 'bg-terracotta-500 text-white border-terracotta-600 shadow-xs' : 'bg-white border-stone-border hover:bg-linen-100'
                  }`}
                >
                  {t('step2')}
                </button>
                <span className="text-stone-300">→</span>

                {/* 3. Catalog AI */}
                <button
                  onClick={() => activeProduct && setSellerStep('cataloger')}
                  className={`px-3.5 py-2 rounded-xl border whitespace-nowrap transition-colors ${
                    sellerStep === 'cataloger' ? 'bg-terracotta-500 text-white border-terracotta-600 shadow-xs' : 'bg-white border-stone-border hover:bg-linen-100'
                  }`}
                >
                  {t('step3')}
                </button>
                <span className="text-stone-300">→</span>

                {/* 4. Fair Pricing */}
                <button
                  onClick={() => activeProduct && setSellerStep('pricing')}
                  className={`px-3.5 py-2 rounded-xl border whitespace-nowrap transition-colors ${
                    sellerStep === 'pricing' ? 'bg-terracotta-500 text-white border-terracotta-600 shadow-xs' : 'bg-white border-stone-border hover:bg-linen-100'
                  }`}
                >
                  {t('step4')}
                </button>
                <span className="text-stone-300">→</span>

                {/* 5. ONDC Export */}
                <button
                  onClick={() => activeProduct && setSellerStep('export')}
                  className={`px-3.5 py-2 rounded-xl border whitespace-nowrap transition-colors ${
                    sellerStep === 'export' ? 'bg-terracotta-500 text-white border-terracotta-600 shadow-xs' : 'bg-white border-stone-border hover:bg-linen-100'
                  }`}
                >
                  {t('step5')}
                </button>
              </div>
            </div>

            {/* Stage 1: Guided Photo Scanner */}
            {sellerStep === 'scanner' && (
              <GuidedScanner
                activeProduct={activeProduct}
                onScanComplete={handleScanComplete}
              />
            )}

            {/* Stage 2: Dual-Mode AI Photo Studio */}
            {sellerStep === 'studio' && (
              <PhotoStudio
                craftData={activeProduct}
                onStudioComplete={handleStudioComplete}
                onBack={() => setSellerStep('scanner')}
              />
            )}

            {/* Stage 3: Catalog AI Engine */}
            {sellerStep === 'cataloger' && (
              <AICataloger
                craftData={activeProduct}
                onCatalogComplete={handleCatalogComplete}
                onBack={() => setSellerStep('studio')}
              />
            )}

            {/* Stage 4: Fair-Wage Pricing Calibrator */}
            {sellerStep === 'pricing' && (
              <FairPricing
                craftData={activeProduct}
                onPricingComplete={handlePricingComplete}
                onBack={() => setSellerStep('cataloger')}
              />
            )}

            {/* Stage 5: Multi-Channel ONDC Export Matrix */}
            {sellerStep === 'export' && (
              <ExportMatrix
                craftData={activeProduct}
                onExportDone={handleExportDone}
                onBack={() => setSellerStep('pricing')}
              />
            )}
          </div>
        )}

        {/* ================= BUYER ONDC MARKETPLACE FLOW ================= */}
        {role === 'buyer' && (
          <div>
            {/* View A: Main Catalog Discovery Feed */}
            {buyerStep === 'marketplace' && (
              <BuyerMarketplace
                newlyAddedCraft={newlyAddedCraft}
                onSelectProduct={handleSelectProduct}
                onBuyProduct={handleBuyProduct}
              />
            )}

            {/* View B: Product Detail & Verified Customer Reviews */}
            {buyerStep === 'detail' && selectedBuyerProduct && (
              <section className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
                
                {/* Back to Catalog Button */}
                <button
                  onClick={() => setBuyerStep('marketplace')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-terracotta-600 mb-6 bg-white px-4 py-2 rounded-xl border border-stone-border shadow-2xs"
                >
                  ← Back to Catalog
                </button>

                {/* Product Detail Card */}
                <div className="card-artisan p-6 sm:p-10 bg-white border border-stone-border shadow-earthy grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Product Image */}
                  <div className="md:col-span-6 rounded-3xl overflow-hidden bg-linen-100 border border-stone-border aspect-square relative">
                    <img
                      src={selectedBuyerProduct.image}
                      alt={selectedBuyerProduct.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedBuyerProduct.giTag || 'GI Certified Craft'}</span>
                    </div>
                  </div>

                  {/* Right: Craft Story & Artisan Identity */}
                  <div className="md:col-span-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-forest-700 bg-forest-50 px-2.5 py-1 rounded-md border border-forest-200 mb-2 inline-block">
                        {selectedBuyerProduct.categoryLabel || 'Handloom Textiles'}
                      </span>

                      <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight mb-3">
                        {selectedBuyerProduct.title}
                      </h2>

                      {/* Artisan Identity & Provenance Card */}
                      <div className="p-4 rounded-2xl bg-linen-100 border border-stone-border mb-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-charcoal-muted font-medium">Artisan Credential:</span>
                          <span className="font-extrabold text-charcoal">{selectedBuyerProduct.artisanCredential || `Crafted by ${selectedBuyerProduct.artisan}`}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-charcoal-muted font-medium">Origin Location:</span>
                          <span className="font-bold text-charcoal">📍 {selectedBuyerProduct.origin || selectedBuyerProduct.region}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-charcoal-muted font-medium">Cluster Provenance:</span>
                          <span className="font-bold text-forest-700">{selectedBuyerProduct.cluster || `Heritage Craft Guild, ${selectedBuyerProduct.region}`}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-charcoal-muted leading-relaxed font-medium mb-4">
                        {selectedBuyerProduct.description}
                      </p>

                      {/* Direct Impact Transparency Pill */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-4">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span>{selectedBuyerProduct.impactPill || '88% goes directly to artisan family'}</span>
                      </div>

                      {/* Materials List */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedBuyerProduct.materials?.map((m, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-linen-200 text-charcoal text-xs font-bold rounded-lg"
                          >
                            ✓ {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Buy Button */}
                    <div className="pt-6 border-t border-stone-border">
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-3xl sm:text-4xl font-black text-charcoal tabular-nums">
                          ₹{selectedBuyerProduct.price.toLocaleString('en-IN')}
                        </span>
                        {selectedBuyerProduct.mrp && (
                          <span className="text-base text-charcoal-light line-through tabular-nums">
                            ₹{selectedBuyerProduct.mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                          Zero Aggregator Commission
                        </span>
                      </div>

                      <button
                        onClick={() => handleBuyProduct(selectedBuyerProduct)}
                        className="btn-tactile-lg bg-terracotta-500 hover:bg-terracotta-600 text-white w-full shadow-lg shadow-terracotta-500/25 group flex items-center justify-center gap-2"
                        id="buy-via-ondc-direct-btn"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Buy on ONDC Network →</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Customer Reviews & Photo Upload Section */}
                <ProductReviews product={selectedBuyerProduct} />
              </section>
            )}

            {/* View C: 4-Stage ONDC Delivery Tracker */}
            {buyerStep === 'tracker' && (
              <OrderTracker
                orderItem={selectedBuyerProduct}
                onBackToShop={() => setBuyerStep('marketplace')}
              />
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-border mt-16 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-charcoal text-sm">KariDoot AI (कारीदूत)</span>
            <span className="text-xs text-charcoal-light">•</span>
            <span className="text-xs text-charcoal-muted">ONDC Rural Artisan Inclusion Project</span>
          </div>
          <p className="text-xs text-charcoal-light max-w-md">
            Connecting handloom weavers, clay potters, and metal craftspeople directly to open digital networks without exploitative aggregator commissions.
          </p>
        </div>
      </footer>

      {/* 4. Floating Quick-Access Speaker Widget (Bottom-Left) */}
      <AudioGuide currentStage={role === 'seller' ? sellerStep : buyerStep} />

      {/* 5. Floating KariDoot AI Chatbot (Bottom-Right) */}
      <KariBot />
      </>
      )}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <KariDootApp />
    </LanguageProvider>
  );
}
