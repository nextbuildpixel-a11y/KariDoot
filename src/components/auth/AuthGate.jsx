import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Store,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export default function AuthGate({ onAuthenticated }) {
  const { speakText } = useLanguage();

  const [step, setStep] = useState('role'); // 'role' | 'phone'
  const [selectedRole, setSelectedRole] = useState('seller'); // 'seller' | 'buyer'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Screen 1: Choose Role
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setStep('phone');
    speakText(
      role === 'seller'
        ? 'Welcome artisan! Please enter your phone number to continue.'
        : 'Welcome patron! Please enter your phone number to discover authentic crafts.'
    );
  };

  // Screen 2: Get OTP (Auto-fills 1234)
  const handleGetOtp = (e) => {
    e?.preventDefault();
    setError('');

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtp(['1', '2', '3', '4']);
      setOtpSent(true);
      speakText('OTP 1 2 3 4 auto-filled for instant verification.');
    }, 300);
  };

  // Verify & Enter KariDoot
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 4) {
      setError('Please enter or get the 4-digit OTP.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const userSession = {
        phone: phoneNumber,
        role: selectedRole,
        verified: true,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('karidoot_auth', JSON.stringify(userSession));
      speakText('Verification successful! Entering KariDoot.');
      onAuthenticated(selectedRole, phoneNumber);
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#FAF7F2] overflow-y-auto flex items-center justify-center p-4 sm:p-6 select-none"
      style={{ backgroundColor: '#FAF7F2' }}
    >
      {/* Background Decorative Motif */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden flex items-center justify-center">
        <div
          className="w-[750px] h-[750px] rounded-full border-[18px] border-terracotta-500 border-dashed animate-spin"
          style={{ animationDuration: '80s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-stone-border shadow-earthy-xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-terracotta-500/25">
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="6" />
              <path d="M30 65 C35 45, 65 45, 70 65 Z" fill="currentColor" />
              <circle cx="50" cy="35" r="14" fill="currentColor" />
              <path d="M42 48 L58 48 L50 60 Z" fill="#FAF7F2" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linen-200 text-charcoal text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-terracotta-500" />
            <span>ONDC National Digital Commerce Bridge</span>
          </div>

          <h2 className="text-3xl font-black text-charcoal tracking-tight">
            KariDoot <span className="text-terracotta-600">AI</span>
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1 font-medium">
            The Artisan's Messenger • कारीदूत डिजिटल सेतु
          </p>
        </div>

        {/* SCREEN 1: CHOOSE ROLE (TWO CARDS ON #FAF7F2) */}
        {step === 'role' && (
          <div className="animate-fade-in">
            <h3 className="text-center text-xs font-black text-charcoal-light uppercase tracking-wider mb-6">
              Choose How You Wish to Enter:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              
              {/* Card 1: Artisan / Maker (Seller) */}
              <button
                onClick={() => handleSelectRole('seller')}
                className="card-artisan-hover p-6 text-left border-2 border-stone-border hover:border-terracotta-500 flex flex-col justify-between transition-all group min-h-[200px]"
                id="select-role-seller-btn"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center mb-4 group-hover:bg-terracotta-500 group-hover:text-white transition-colors shadow-xs">
                    <Store className="w-7 h-7" />
                  </div>
                  <h4 className="font-black text-lg text-charcoal group-hover:text-terracotta-600 transition-colors mb-1.5">
                    Artisan / Maker (Seller)
                  </h4>
                  <p className="text-xs text-charcoal-muted font-medium leading-relaxed">
                    Digitize crafts, get AI pricing, and list to ONDC.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-border/60 flex items-center justify-between text-xs font-bold text-terracotta-600">
                  <span>Enter Studio</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>

              {/* Card 2: Patron / Customer (Buyer) */}
              <button
                onClick={() => handleSelectRole('buyer')}
                className="card-artisan-hover p-6 text-left border-2 border-stone-border hover:border-forest-500 flex flex-col justify-between transition-all group min-h-[200px]"
                id="select-role-buyer-btn"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-forest-100 text-forest-600 flex items-center justify-center mb-4 group-hover:bg-forest-500 group-hover:text-white transition-colors shadow-xs">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-black text-lg text-charcoal group-hover:text-forest-600 transition-colors mb-1.5">
                    Patron / Customer (Buyer)
                  </h4>
                  <p className="text-xs text-charcoal-muted font-medium leading-relaxed">
                    Discover authentic GI-tagged crafts directly from makers.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-border/60 flex items-center justify-between text-xs font-bold text-forest-600">
                  <span>Enter Marketplace</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>

            </div>

            <p className="text-center text-[11px] text-charcoal-light font-medium">
              You can toggle between Seller Studio and Buyer Marketplace at any time.
            </p>
          </div>
        )}

        {/* SCREEN 2: PHONE LOGIN WITH GET OTP (1234) */}
        {step === 'phone' && (
          <form onSubmit={handleVerifyOtp} className="animate-fade-in max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setStep('role')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-muted hover:text-charcoal"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Role</span>
              </button>
              <span className="text-xs font-black text-terracotta-600 bg-terracotta-50 px-2.5 py-0.5 rounded-full border border-terracotta-200">
                {selectedRole === 'seller' ? 'Artisan / Maker' : 'Patron / Customer'}
              </span>
            </div>

            <h3 className="font-black text-2xl text-charcoal mb-1">
              Phone Authentication
            </h3>
            <p className="text-xs text-charcoal-muted mb-6 font-medium">
              Enter your mobile number to receive your ONDC authentication code.
            </p>

            {/* Input with +91 prefix */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-light mb-2">
                Mobile Number
              </label>
              <div className="flex items-center rounded-2xl border-2 border-stone-border focus-within:border-terracotta-500 bg-linen-50 overflow-hidden transition-colors">
                <span className="px-4 py-3.5 bg-linen-200 text-charcoal font-black text-sm border-r border-stone-border select-none">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  autoFocus
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full px-4 py-3.5 bg-transparent text-base font-bold text-charcoal focus:outline-none tracking-wider"
                  id="phone-number-input"
                />
                
                {/* Get OTP Button inside field or right beside */}
                <button
                  type="button"
                  onClick={handleGetOtp}
                  disabled={loading}
                  className="px-3.5 py-2.5 mr-2 rounded-xl bg-terracotta-100 hover:bg-terracotta-200 text-terracotta-800 font-extrabold text-xs whitespace-nowrap border border-terracotta-300 transition-colors"
                  id="get-otp-btn"
                >
                  Get OTP
                </button>
              </div>
            </div>

            {/* 4-Digit OTP Box (Auto-filled with 1234) */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal-light">
                  4-Digit OTP Code
                </label>
                {otpSent && (
                  <span className="text-[11px] font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
                    Auto-filled: 1234
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`otp-box-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const newOtp = [...otp];
                      newOtp[index] = val;
                      setOtp(newOtp);
                      if (val && index < 3) {
                        document.getElementById(`otp-box-${index + 1}`)?.focus();
                      }
                    }}
                    className="w-14 h-16 text-center text-2xl font-black text-charcoal bg-linen-50 rounded-2xl border-2 border-stone-border focus:border-terracotta-500 focus:outline-none shadow-xs"
                  />
                ))}
              </div>
            </div>

            {error && (
              <p className="text-xs font-bold text-rose-600 text-center mb-4">{error}</p>
            )}

            {/* Terracotta Button: "Verify & Enter KariDoot →" */}
            <button
              type="submit"
              disabled={loading}
              className="btn-tactile-lg bg-terracotta-500 hover:bg-terracotta-600 text-white w-full shadow-lg shadow-terracotta-500/25 group text-lg font-black"
              id="verify-enter-btn"
            >
              <span>{loading ? 'Verifying...' : 'Verify & Enter KariDoot →'}</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-charcoal-light">
              <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
              <span>Zero spam. Direct ONDC Beckn authentication.</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
