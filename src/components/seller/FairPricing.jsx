import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Package,
  Layers,
  Clock,
  Sparkles,
  TrendingUp,
  Percent
} from 'lucide-react';

const PRESET_MARGINS = [
  { value: 15, label: '15%' },
  { value: 25, label: '25%' },
  { value: 35, label: '35% (Recommended)' },
  { value: 50, label: '50%' }
];

export default function FairPricing({ craftData, onPricingComplete, onBack }) {
  const { t } = useLanguage();

  // 1. Manual numeric inputs for Artisan Cost Breakdown (Default realistic craft values)
  const [materials, setMaterials] = useState(
    craftData?.pricing?.materialCost ?? 180
  );
  const [labor, setLabor] = useState(
    craftData?.pricing?.laborCost ?? 200
  );
  const [packaging, setPackaging] = useState(
    craftData?.pricing?.packagingCost ?? 50
  );

  // 2. Profit Margin selection
  const [marginPercent, setMarginPercent] = useState(35);
  const [isCustomMargin, setIsCustomMargin] = useState(false);
  const [customMarginVal, setCustomMarginVal] = useState('40');

  // Dynamic calculations
  const calculation = useMemo(() => {
    const matNum = Math.max(0, Number(materials) || 0);
    const labNum = Math.max(0, Number(labor) || 0);
    const pkgNum = Math.max(0, Number(packaging) || 0);

    const baseCost = matNum + labNum + pkgNum;
    const activeMargin = isCustomMargin
      ? Math.max(0, Number(customMarginVal) || 0)
      : marginPercent;

    const artisanProfit = Math.round(baseCost * (activeMargin / 100));
    const artisanPrice = Math.round(baseCost + artisanProfit);

    // Realistic commercial market price (1.9x retail aggregator & boutique markup)
    const commercialMarketPrice = Math.round(artisanPrice * 1.9);
    const buyerSavings = Math.max(0, commercialMarketPrice - artisanPrice);
    const savingsPercent = commercialMarketPrice > 0
      ? Math.round((buyerSavings / commercialMarketPrice) * 100)
      : 47;

    // Net take-home for artisan (labor + profit with 0% aggregator cut)
    const ondcTakeHome = labNum + artisanProfit;

    return {
      matNum,
      labNum,
      pkgNum,
      baseCost,
      activeMargin,
      artisanProfit,
      artisanPrice,
      commercialMarketPrice,
      buyerSavings,
      savingsPercent,
      ondcTakeHome
    };
  }, [materials, labor, packaging, marginPercent, isCustomMargin, customMarginVal]);

  const handleSelectMargin = (val) => {
    setIsCustomMargin(false);
    setMarginPercent(val);
  };

  const handleCustomMarginClick = () => {
    setIsCustomMargin(true);
  };

  const handleProceed = () => {
    onPricingComplete({
      ...craftData,
      pricing: {
        materialCost: calculation.matNum,
        laborCost: calculation.labNum,
        laborHours: Math.round(calculation.labNum / 25) || 8,
        hourlyWage: 200,
        packagingCost: calculation.pkgNum,
        logisticsCost: calculation.pkgNum,
        baseCost: calculation.baseCost,
        marginPercent: calculation.activeMargin,
        artisanProfit: calculation.artisanProfit,
        artisanPrice: calculation.artisanPrice,
        totalPrice: calculation.artisanPrice,
        commercialMarketPrice: calculation.commercialMarketPrice,
        buyerSavings: calculation.buyerSavings,
        ondcTakeHome: calculation.ondcTakeHome
      }
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      {/* Stage Badge & Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/20">
          <Coins className="w-3.5 h-3.5 text-emerald-600" />
          <span>Stage 4 of 5 · Fair-Wage Pricing Calibrator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">
          {t('pricingTitle')}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl mx-auto font-medium">
          {t('pricingSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Manual Cost Inputs & Profit Margin Selector */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Card 1: Artisan Cost Breakdown (Manual Number Inputs) */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                <span>Artisan Cost Breakdown</span>
              </h3>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Direct Maker Costs
              </span>
            </div>

            {/* Input 1: Raw Materials */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <span>{t('materialsCost')}</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400 font-bold text-base">
                  ₹
                </div>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="e.g. 180"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-8 pr-4 py-3 text-base font-bold text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                {t('materialsHelp')}
              </p>
            </div>

            {/* Input 2: Crafting Labor & Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <span>{t('laborCost')}</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400 font-bold text-base">
                  ₹
                </div>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={labor}
                  onChange={(e) => setLabor(e.target.value)}
                  placeholder="e.g. 200"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-8 pr-4 py-3 text-base font-bold text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                {t('laborHelp')}
              </p>
            </div>

            {/* Input 3: Packaging & Logistics */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <span>{t('packagingCost')}</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400 font-bold text-base">
                  ₹
                </div>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-8 pr-4 py-3 text-base font-bold text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                {t('packagingHelp')}
              </p>
            </div>

            {/* Dynamic Base Cost Banner */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">
                {t('baseCostLabel')}
              </span>
              <span className="text-base font-extrabold text-amber-950 font-mono">
                ₹{calculation.baseCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Card 2: Artisan Profit Margin Selector */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
                <Percent className="w-5 h-5 text-emerald-600" />
                <span>{t('marginSelect')}</span>
              </h3>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                100% Retained
              </span>
            </div>
            
            <p className="text-xs text-stone-600 font-medium">
              {t('marginHelp')}
            </p>

            {/* Percentage Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {PRESET_MARGINS.map((margin) => {
                const isSelected = !isCustomMargin && marginPercent === margin.value;
                return (
                  <button
                    key={margin.value}
                    type="button"
                    onClick={() => handleSelectMargin(margin.value)}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-sm ring-2 ring-amber-500/20'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>{margin.label}</span>
                    <span className="text-[10px] font-mono opacity-80">
                      +₹{Math.round(calculation.baseCost * (margin.value / 100))}
                    </span>
                  </button>
                );
              })}

              {/* Custom % Pill */}
              <div
                onClick={handleCustomMarginClick}
                className={`p-2 rounded-xl border transition-all col-span-2 sm:col-span-1 flex items-center justify-center cursor-pointer ${
                  isCustomMargin
                    ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-1.5 w-full justify-center">
                  <span className="text-xs font-bold">Custom:</span>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={customMarginVal}
                    onChange={(e) => {
                      setCustomMarginVal(e.target.value);
                      setIsCustomMargin(true);
                    }}
                    className={`w-12 text-center text-xs font-bold p-1 rounded border ${
                      isCustomMargin
                        ? 'bg-white text-stone-950 border-stone-400'
                        : 'bg-stone-100 text-stone-700 border-stone-300'
                    } focus:outline-none`}
                  />
                  <span className="text-xs font-bold">%</span>
                </div>
              </div>
            </div>

            {/* Dynamic Profit Calculation Breakdown */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs text-stone-700">
              <div className="flex justify-between items-center">
                <span>Artisan Profit ({calculation.activeMargin}%):</span>
                <span className="font-bold text-emerald-700 font-mono text-sm">
                  +₹{calculation.artisanProfit.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-stone-200 font-bold text-stone-900 text-sm">
                <span>Fair ONDC Listing Price:</span>
                <span className="text-amber-700 font-mono text-base">
                  ₹{calculation.artisanPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right 5 Columns: Dynamic Earnings & Realistic Comparison Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Price Highlight Box */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white shadow-xl border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                {t('fairOndcPrice')}
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold">
                {t('zeroMiddlemanCut')}
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-black tracking-tight font-serif text-white tabular-nums">
              ₹{calculation.artisanPrice.toLocaleString('en-IN')}
            </div>

            <div className="pt-3 border-t border-stone-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">{t('directNetTakehome')}</span>
                <span className="font-bold text-amber-400 text-base font-mono">
                  ₹{calculation.ondcTakeHome.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                (Includes ₹{calculation.labNum} fair labor + ₹{calculation.artisanProfit} craft profit)
              </p>
            </div>
          </div>

          {/* Realistic Marketplace Price Comparison Card */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
                {t('marketCompareTitle')}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Commercial aggregators mark up crafts by ~1.9× for middleman commissions.
              </p>
            </div>

            <div className="space-y-3">
              {/* Row 1: Commercial Retail / Middlemen */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-800">{t('retailPrice')}</p>
                  <p className="text-[11px] text-rose-600 font-medium">
                    Typical ~1.9× aggregator & boutique markup
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm sm:text-base font-bold text-stone-500 line-through tabular-nums">
                    ₹{calculation.commercialMarketPrice.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-stone-400">Retail price</p>
                </div>
              </div>

              {/* Row 2: KariDoot Direct ONDC Price (Highlight) */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border-2 border-emerald-500/80 flex items-center justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <p className="text-xs font-black text-emerald-950">{t('karidootPrice')}</p>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    100% profit retained (0% platform commission)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base sm:text-lg font-black text-emerald-900 font-mono tabular-nums">
                    ₹{calculation.artisanPrice.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] font-bold text-emerald-700">Maker Direct</p>
                </div>
              </div>

              {/* Row 3: Buyer Savings Banner */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between text-xs">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{t('buyerSavings')}:</span>
                </span>
                <span className="font-black text-amber-900 font-mono">
                  Save ₹{calculation.buyerSavings.toLocaleString('en-IN')} ({calculation.savingsPercent}%)
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-sm font-medium transition-colors flex-1 justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToCatalog')}</span>
            </button>

            <button
              type="button"
              onClick={handleProceed}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md transition-all flex-2 justify-center"
              id="proceed-to-export-btn"
            >
              <span>{t('proceedToExport')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
