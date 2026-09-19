import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  BellRing,
  Truck,
  CheckCircle2,
  XCircle,
  QrCode,
  Volume2,
  Clock,
  MapPin,
  PackageCheck,
  Send,
  Sparkles
} from 'lucide-react';

export default function OrderAlertSim({ activeCraftTitle }) {
  const { t, speakText, currentLang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState('idle'); // 'idle' | 'accepted' | 'rejected'

  const craftName = activeCraftTitle || 'Pink Handloom Towel';

  const triggerOrderSimulation = () => {
    // 1. Spoken voice announcement
    const spokenMessage = currentLang === 'hi'
      ? `आपके पास बैंगलोर से ${craftName} के लिए एक नया ONDC ऑर्डर आया है।`
      : currentLang === 'te'
      ? `బెంగళూరు నుండి ${craftName} కోసం మీకు 1 కొత్త ఆర్డర్ వచ్చింది.`
      : currentLang === 'ta'
      ? `பெங்களூரிலிருந்து ${craftName} க்காக 1 புதிய ஆர்டர் வந்துள்ளது.`
      : currentLang === 'bn'
      ? `বেঙ্গালুরু থেকে ${craftName} এর জন্য ১টি নতুন অর্ডার এসেছে।`
      : currentLang === 'mr'
      ? `बंगळुरूहून ${craftName} साठी आपल्याकडे १ नवीन ऑर्डर आली आहे.`
      : `You have 1 new order for ${craftName} from Bangalore.`;

    speakText(spokenMessage);

    // 2. Open interactive WhatsApp dispatch alert modal
    setModalOpen(true);
    setOrderStatus('pending');
  };

  const handleAcceptPickup = () => {
    setOrderStatus('accepted');
    const confirmMsg = currentLang === 'hi'
      ? 'कूरियर पिकअप स्वीकार किया गया! डिलीवरी पार्टनर को सूचित कर दिया गया है।'
      : 'Courier pickup confirmed! Delhivery ONDC agent dispatched.';
    speakText(confirmMsg);
  };

  const handleRejectPickup = () => {
    setOrderStatus('rejected');
    const rejectMsg = currentLang === 'hi'
      ? 'ऑर्डर पुनर्निर्धारित किया गया।'
      : 'Order reschedule requested.';
    speakText(rejectMsg);
    setTimeout(() => setModalOpen(false), 1500);
  };

  return (
    <div className="relative">
      {/* Test Order Trigger Button */}
      <button
        onClick={triggerOrderSimulation}
        className="btn-tactile bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-700 hover:to-forest-600 text-white shadow-lg shadow-forest-600/25"
        id="test-ondc-order-btn"
      >
        <BellRing className="w-5 h-5 animate-bounce" />
        <span>{t('testOrderBtn')}</span>
      </button>

      {/* Simulated WhatsApp Courier Dispatch Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#EFEAE2] rounded-3xl overflow-hidden shadow-earthy-xl border border-stone-border">
            
            {/* WhatsApp Green Top Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black text-sm">
                  🚚
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm">ONDC Logistics Dispatch</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <p className="text-[10px] text-emerald-100">Delhivery / Shadowfax Network</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/80 hover:text-white text-xs font-bold px-2 py-1 bg-black/20 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Chat Bubble Area */}
            <div className="p-4 space-y-3 max-h-[75vh] overflow-y-auto">
              
              {/* Timestamp */}
              <div className="flex justify-center">
                <span className="text-[10px] bg-white/80 text-charcoal-muted px-2.5 py-0.5 rounded-full font-medium shadow-2xs">
                  Today • Just Now
                </span>
              </div>

              {/* Message Bubble */}
              <div className="bg-white rounded-2xl rounded-tl-xs p-4 shadow-sm border border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-forest-700 font-extrabold text-xs">
                  <PackageCheck className="w-4 h-4 text-forest-600" />
                  <span>NEW ONDC BUYER ORDER #OD-882910</span>
                </div>

                <p className="text-sm font-bold text-charcoal mb-1">
                  Item: {craftName}
                </p>
                <p className="text-xs text-charcoal-muted mb-3 font-medium">
                  Destination: Indiranagar, Bangalore, Karnataka (PIN: 560038)
                </p>

                {/* Logistics Details Grid */}
                <div className="bg-linen-100 p-3 rounded-xl border border-stone-border space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-muted flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-terracotta-600" />
                      Courier:
                    </span>
                    <strong className="text-charcoal">Delhivery Express ONDC</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-muted flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-forest-600" />
                      Pickup Slot:
                    </span>
                    <strong className="text-charcoal">Today, 3:30 PM – 5:00 PM</strong>
                  </div>
                </div>

                {/* Package QR Code Snippet */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-stone-border">
                  <div className="w-14 h-14 bg-linen-200 rounded-lg p-1.5 flex items-center justify-center border border-stone-border flex-shrink-0">
                    <QrCode className="w-10 h-10 text-charcoal" />
                  </div>
                  <div className="text-[11px] text-charcoal-muted leading-tight">
                    <p className="font-bold text-charcoal">Airway Bill (AWB): DLH-8829-X</p>
                    <p>Show this QR code to courier pickup agent upon verification.</p>
                  </div>
                </div>
              </div>

              {/* Status Outcome */}
              {orderStatus === 'accepted' && (
                <div className="bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl p-3 text-center text-xs font-bold animate-fade-in flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('pickupAccepted')}</span>
                </div>
              )}

              {orderStatus === 'rejected' && (
                <div className="bg-rose-100 text-rose-900 border border-rose-300 rounded-2xl p-3 text-center text-xs font-bold animate-fade-in flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Pickup rescheduled to tomorrow morning.</span>
                </div>
              )}

            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-white border-t border-stone-border flex items-center gap-3">
              {orderStatus === 'pending' ? (
                <>
                  <button
                    onClick={handleRejectPickup}
                    className="btn-tactile bg-linen-200 hover:bg-linen-300 text-charcoal flex-1 text-xs"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{t('rejectPickup')}</span>
                  </button>
                  <button
                    onClick={handleAcceptPickup}
                    className="btn-tactile bg-emerald-600 hover:bg-emerald-700 text-white flex-2 text-xs shadow-md shadow-emerald-600/20"
                    id="accept-courier-pickup-btn"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('acceptPickup')}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setModalOpen(false)}
                  className="btn-tactile bg-charcoal text-white w-full text-sm"
                >
                  Close Alert
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
