import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Package,
  Hammer,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  MapPin,
  QrCode,
  RotateCcw,
  Sparkles,
  PhoneCall
} from 'lucide-react';

const STAGES = [
  {
    id: 1,
    titleKey: 'stage1',
    title: 'Order Placed & ONDC Confirmed',
    desc: 'Beckn BAP gateway acknowledged order #OD-882910. Fair artisan escrow locked.',
    icon: Package,
    timestamp: 'Today, 10:14 AM'
  },
  {
    id: 2,
    titleKey: 'stage2',
    title: 'Handcrafted in Artisan Workshop',
    desc: 'Master weaver completed warp & weft inspection. Eco-friendly packaging sealed.',
    icon: Hammer,
    timestamp: 'Today, 01:30 PM'
  },
  {
    id: 3,
    titleKey: 'stage3',
    title: 'In Transit (Logistics Partner Assigned)',
    desc: 'Delhivery ONDC Express courier picked up parcel from weaver cluster.',
    icon: Truck,
    timestamp: 'Today, 04:45 PM'
  },
  {
    id: 4,
    titleKey: 'stage4',
    title: 'Out for Delivery',
    desc: 'Delivery executive out with verified OTP. Estimated delivery in 45 mins.',
    icon: CheckCircle2,
    timestamp: 'Today, Expected 06:15 PM'
  }
];

export default function OrderTracker({ orderItem, onBackToShop }) {
  const { t, speakText } = useLanguage();
  const [currentStageIndex, setCurrentStageIndex] = useState(2); // Start at stage 3 (In Transit) for realistic demo

  const itemTitle = orderItem?.title || 'Varanasi Pure Katan Silk Zari Brocade Saree';
  const itemPrice = orderItem?.price || 8450;
  const itemImage = orderItem?.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

  const handleSimulateNextStage = () => {
    if (currentStageIndex < STAGES.length - 1) {
      const nextIndex = currentStageIndex + 1;
      setCurrentStageIndex(nextIndex);
      const stageObj = STAGES[nextIndex];
      speakText(`Delivery update: ${t(stageObj.titleKey)}`);
    } else {
      // Reset to stage 1 to allow continuous pitching
      setCurrentStageIndex(0);
      speakText(`Order cycle reset: ${t(STAGES[0].titleKey)}`);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Truck className="w-3.5 h-3.5 text-forest-600" />
          <span>ONDC Real-Time Logistics Stepper</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
          {t('trackerTitle')}
        </h2>
        <p className="text-sm text-charcoal-muted mt-1 font-medium">
          Live Beckn protocol fulfillment updates with zero intermediary delays
        </p>
      </div>

      {/* Main Order Card */}
      <div className="card-artisan p-6 sm:p-8 bg-white border border-stone-border shadow-earthy mb-8">
        
        {/* Order Details Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-border">
          <div className="flex items-center gap-4">
            <img
              src={itemImage}
              alt={itemTitle}
              className="w-16 h-16 rounded-2xl object-cover border border-stone-border shadow-xs flex-shrink-0"
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded">
                OD-882910-ONDC
              </span>
              <h3 className="font-extrabold text-base text-charcoal line-clamp-1 mt-1">
                {itemTitle}
              </h3>
              <p className="text-xs text-charcoal-muted">
                Amount Paid: <strong className="text-charcoal">₹{itemPrice.toLocaleString('en-IN')}</strong> (100% direct artisan transfer)
              </p>
            </div>
          </div>

          {/* Pitch Demo Trigger Button */}
          <button
            onClick={handleSimulateNextStage}
            className="btn-tactile bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs px-5 py-2.5 shadow-md shadow-terracotta-500/20 whitespace-nowrap"
            id="simulate-delivery-stage-btn"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('simulateNextStage')}</span>
          </button>
        </div>

        {/* 4-Stage Stepper Component */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-9 sm:before:left-11 before:top-4 before:bottom-4 before:w-0.5 before:bg-stone-200">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="relative flex items-start gap-4 sm:gap-6 group">
                
                {/* Step Node Icon */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300 ${
                    isCompleted
                      ? isCurrent
                        ? 'bg-terracotta-500 text-white ring-4 ring-terracotta-200 scale-110'
                        : 'bg-forest-500 text-white'
                      : 'bg-stone-200 text-stone-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Step Details */}
                <div className="flex-1 bg-linen-100 p-4 rounded-2xl border border-stone-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className={`font-black text-sm ${isCurrent ? 'text-terracotta-700' : 'text-charcoal'}`}>
                      {t(stage.titleKey)}
                    </h4>
                    <span className="text-[10px] font-bold text-charcoal-light flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-muted" />
                      <span>{stage.timestamp}</span>
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted font-medium">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Details Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-stone-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-linen-100 border border-stone-border">
            <span className="text-charcoal-light font-bold block mb-0.5">Assigned Logistics:</span>
            <p className="font-extrabold text-charcoal">Delhivery ONDC Express</p>
          </div>
          <div className="p-3 rounded-xl bg-linen-100 border border-stone-border">
            <span className="text-charcoal-light font-bold block mb-0.5">Delivery OTP:</span>
            <p className="font-black text-emerald-700 tracking-widest text-sm">7 4 9 2</p>
          </div>
          <div className="p-3 rounded-xl bg-linen-100 border border-stone-border flex items-center justify-between">
            <div>
              <span className="text-charcoal-light font-bold block mb-0.5">Courier Agent:</span>
              <p className="font-extrabold text-charcoal">Sunil Kumar (+91 9876...)</p>
            </div>
            <PhoneCall className="w-4 h-4 text-forest-600" />
          </div>
        </div>

      </div>

      {/* Back to Marketplace */}
      <div className="flex justify-center">
        <button
          onClick={onBackToShop}
          className="btn-tactile bg-linen-200 hover:bg-linen-300 text-charcoal border border-stone-border"
        >
          <span>← Back to ONDC Marketplace</span>
        </button>
      </div>

    </section>
  );
}
