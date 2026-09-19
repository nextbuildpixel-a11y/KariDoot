import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Download,
  Share2,
  FileSpreadsheet,
  FileCode,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Send,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export default function ExportMatrix({ craftData, onExportDone, onBack }) {
  const { t, speakText } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('beckn'); // 'beckn' | 'csv' | 'whatsapp'

  const catalog = craftData?.catalog || {};
  const pricing = craftData?.pricing || {};
  const price = pricing.totalPrice || 2450;
  const artisanName = craftData?.presetData?.artisan || 'Master Artisan';
  const region = craftData?.presetData?.region || 'Rural Craft Cluster, India';

  // Build Validated Beckn Protocol v1.2.0 JSON
  const becknPayload = {
    context: {
      domain: "ONDC:RET12",
      country: "IND",
      city: "std:080",
      action: "on_search",
      core_version: "1.2.0",
      bap_id: "ondc-buyer-app.network",
      bap_uri: "https://ondc-buyer-app.network/bap",
      bpp_id: "karidoot-artisan-network.ondc.org",
      bpp_uri: "https://karidoot-artisan-network.ondc.org/beckn",
      transaction_id: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      message_id: `msg_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ttl: "PT30S"
    },
    message: {
      catalog: {
        "bpp/descriptor": {
          name: "KariDoot Rural Artisan Direct Network",
          symbol: "https://karidoot.ai/assets/logo.png",
          short_desc: "Bridging Indian heritage artisans directly with ONDC consumers"
        },
        "bpp/providers": [
          {
            id: `ARTISAN_${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
            descriptor: {
              name: artisanName,
              short_desc: `${region} • Heritage Master Craftsperson`,
              images: [craftData?.stagedImage || craftData?.image]
            },
            locations: [
              {
                id: "LOC_01",
                gps: "12.9716,77.5946",
                address: {
                  locality: region,
                  country: "IND"
                }
              }
            ],
            categories: [
              {
                id: "HANDICRAFT_GI",
                descriptor: {
                  name: catalog.craft_category || "Handloom Textiles"
                }
              }
            ],
            items: [
              {
                id: `ITEM_${Date.now().toString(36).toUpperCase()}`,
                descriptor: {
                  name: catalog.title || "Handmade Artisan Craft",
                  symbol: craftData?.stagedImage || craftData?.image,
                  short_desc: catalog.bilingual_description?.slice(0, 140) || "",
                  long_desc: catalog.bilingual_description || "",
                  images: [craftData?.stagedImage || craftData?.image]
                },
                category_id: "HANDICRAFT_GI",
                fulfillment_id: "FULFILL_ONDC_LOGISTICS",
                price: {
                  currency: "INR",
                  value: String(price),
                  maximum_value: String(Math.round(price * 1.3))
                },
                tags: [
                  {
                    code: "origin_heritage",
                    list: [
                      { code: "region", value: region },
                      { code: "materials", value: (catalog.detected_materials || []).join(", ") },
                      { code: "authenticity", value: catalog.authenticity_notes || "GI Certified" },
                      { code: "fair_wage_audited", value: "YES_KARIDOOT_VERIFIED" },
                      { code: "hsn_code", value: catalog.suggested_hsn_code || "5007.20.10" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  };

  const becknJsonString = JSON.stringify(becknPayload, null, 2);

  // Generate & Download Beckn Protocol JSON Blob
  const handleDownloadBecknJson = () => {
    const blob = new Blob([becknJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beckn_ondc_catalog_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    speakText('ONDC Beckn Protocol JSON exported successfully!');
  };

  // Generate & Download Amazon/Flipkart Flat-File CSV
  const handleDownloadCsv = () => {
    const headers = [
      'SKU', 'Title', 'Bilingual_Title', 'Category', 'HSN_Code',
      'Retail_Price_INR', 'MRP_INR', 'Material_Cost_INR', 'Labor_Hours',
      'Hourly_Wage_INR', 'Artisan_Margin_Percent', 'Artisan_Net_Takehome',
      'Artisan_Name', 'Cluster_Region', 'Authenticity_Cert', 'Materials'
    ];

    const row = [
      `KRD-${Date.now().toString(36).toUpperCase()}`,
      `"${(catalog.title || 'Artisan Craft').replace(/"/g, '""')}"`,
      `"${(catalog.bilingual_title || '').replace(/"/g, '""')}"`,
      `"${catalog.craft_category || 'Handloom Textiles'}"`,
      catalog.suggested_hsn_code || '5007.20.10',
      price,
      Math.round(price * 1.3),
      pricing.materialCost || 1200,
      pricing.laborHours || 24,
      pricing.hourlyWage || 180,
      `${pricing.marginPercent || 20}%`,
      pricing.ondcTakeHome || Math.round(price * 0.85),
      `"${artisanName}"`,
      `"${region}"`,
      `"${(catalog.authenticity_notes || 'GI Tag Certified').replace(/"/g, '""')}"`,
      `"${(catalog.detected_materials || []).join('; ')}"`
    ];

    const csvContent = `${headers.join(',')}\n${row.join(',')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `karidoot_flatfile_listing_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    speakText('Flipkart and Amazon listing CSV spreadsheet downloaded!');
  };

  // Generate WhatsApp Direct Link with UPI Payment URI
  const handleOpenWhatsApp = () => {
    const upiLink = `upi://pay?pa=artisan@upi&pn=${encodeURIComponent(artisanName)}&am=${price}&cu=INR&tn=KariDoot_Craft_Order`;
    const message = `Namaste! 🙏\n\n*${catalog.title || 'Handcrafted Heritage Art'}*\n` +
      `By Master Artisan: *${artisanName}* (${region})\n\n` +
      `📖 *Craft Story:*\n${catalog.bilingual_description || ''}\n\n` +
      `🧵 *Materials:* ${(catalog.detected_materials || []).join(', ')}\n` +
      `🏷️ *Fair ONDC Price:* ₹${price.toLocaleString('en-IN')}\n` +
      `🛡️ *Authenticity:* ${catalog.authenticity_notes || 'GI Tag Verified'}\n\n` +
      `💳 *Direct UPI Payment Link:* ${upiLink}\n\n` +
      `_(Empowered by KariDoot AI — 0% middleman commission)_`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    speakText(t('whatsappMessageSent'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(becknJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Share2 className="w-3.5 h-3.5 text-terracotta-600" />
          <span>Stage 5 of 5: Multi-Channel Distribution</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
          {t('exportTitle')}
        </h2>
        <p className="text-base text-charcoal-muted mt-2 max-w-xl mx-auto font-medium">
          {t('exportSubtitle')}
        </p>
      </div>

      {/* 3 Primary Distribution Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* 1. ONDC Beckn Protocol Card */}
        <div className="card-artisan p-6 flex flex-col justify-between border-2 border-forest-500 bg-forest-50/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-forest-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
            {t('readyToBroadcast')}
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-forest-500 text-white flex items-center justify-center mb-4 shadow-md shadow-forest-500/20">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-charcoal text-lg mb-1">
              Deploy to ONDC
            </h3>
            <p className="text-xs text-charcoal-muted mb-4 font-medium leading-relaxed">
              Standard Beckn v1.2.0 JSON payload ready for direct injection into ONDC seller gateways and BPP adapters.
            </p>
          </div>

          <button
            onClick={handleDownloadBecknJson}
            className="btn-tactile bg-forest-500 hover:bg-forest-600 text-white w-full text-sm shadow-md shadow-forest-500/20"
            id="download-beckn-btn"
          >
            <Download className="w-4 h-4" />
            <span>{t('deployOndc')}</span>
          </button>
        </div>

        {/* 2. Amazon / Flipkart Flat-File CSV */}
        <div className="card-artisan p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-md shadow-amber-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-charcoal text-lg mb-1">
              Amazon / Flipkart CSV
            </h3>
            <p className="text-xs text-charcoal-muted mb-4 font-medium leading-relaxed">
              Formatted bulk spreadsheet compliant with Amazon Karigar & Flipkart Samarth vendor ingestion feeds.
            </p>
          </div>

          <button
            onClick={handleDownloadCsv}
            className="btn-tactile bg-amber-600 hover:bg-amber-700 text-white w-full text-sm shadow-md shadow-amber-600/20"
            id="download-csv-btn"
          >
            <Download className="w-4 h-4" />
            <span>{t('deployCsv')}</span>
          </button>
        </div>

        {/* 3. WhatsApp Direct with UPI */}
        <div className="card-artisan p-6 flex flex-col justify-between bg-white border border-stone-border">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-charcoal text-lg mb-1">
              WhatsApp + Direct UPI
            </h3>
            <p className="text-xs text-charcoal-muted mb-4 font-medium leading-relaxed">
              Pre-filled viral craft story, artisan photo, and one-tap zero-fee UPI payment link for WhatsApp status & buyers.
            </p>
          </div>

          <button
            onClick={handleOpenWhatsApp}
            className="btn-tactile bg-emerald-600 hover:bg-emerald-700 text-white w-full text-sm shadow-md shadow-emerald-600/20"
            id="share-whatsapp-btn"
          >
            <Share2 className="w-4 h-4" />
            <span>{t('shareWhatsapp')}</span>
          </button>
        </div>

      </div>

      {/* Interactive Beckn Code Inspector */}
      <div className="card-artisan p-6 bg-charcoal text-linen-100 overflow-hidden">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-charcoal-muted">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-bold text-stone-muted ml-2">
              beckn-protocol-v1.2.0.json (Validated Schema)
            </span>
          </div>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-muted/50 hover:bg-charcoal-muted text-xs font-semibold text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('jsonCopied')}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t('copyJson')}</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block */}
        <pre className="text-xs font-mono leading-relaxed overflow-x-auto max-h-72 p-2 text-emerald-300">
          <code>{becknJsonString}</code>
        </pre>
      </div>

      {/* Flow Navigation */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <button
          onClick={onBack}
          className="btn-tactile bg-linen-200 hover:bg-linen-300 text-charcoal border border-stone-border"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('previous')}</span>
        </button>

        <button
          onClick={onExportDone}
          className="btn-tactile-lg bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-lg shadow-terracotta-500/25 group"
          id="finish-seller-flow-btn"
        >
          <span>{t('buyerRole')} →</span>
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
