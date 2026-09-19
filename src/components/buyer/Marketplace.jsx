import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Filter,
  ShieldCheck,
  Award,
  ShoppingBag,
  Sparkles,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Compass,
  X,
  Truck,
  Check,
  CreditCard
} from 'lucide-react';

const INITIAL_CATALOG = [
  {
    id: 'banarasi-01',
    title: 'Handwoven Pure Katan Silk Saree',
    category: 'textiles',
    categoryLabel: 'Textiles & Handloom',
    origin: 'Varanasi, Uttar Pradesh',
    giTag: '✓ GI Certified Heritage',
    artisan: 'Ramzan Ali',
    artisanCredential: 'Crafted by Ramzan Ali (Master Weaver, 4th Gen)',
    cluster: 'Weaved in Sarai Mohana Handloom Cluster',
    price: 4850,
    mrp: 8500,
    impactPill: '88% goes directly to artisan family',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Woven on traditional pit looms using certified mulberry katan silk and real electroplated silver zari. Certified Varanasi Handloom Mark.',
    materials: ['Mulberry Katan Silk', 'Pure Silver Zari', 'Natural Indigo'],
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'pottery-01',
    title: 'Handmade Terracotta Bankura Horse',
    category: 'pottery',
    categoryLabel: 'Earthenware & Terracotta',
    origin: 'Bankura, West Bengal',
    giTag: '✓ GI Certified Heritage',
    artisan: 'Saraswati Kumbhakar',
    artisanCredential: 'Crafted by Saraswati Kumbhakar (Master Sculptor, 3rd Gen)',
    cluster: 'Sculpted in Panchmura Terracotta Cluster',
    price: 1850,
    mrp: 3200,
    impactPill: '91% goes directly to artisan family',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    description: 'Sculpted from sacred Damodar riverbed alluvial clay and open-pit fired. Renowned for its distinctive erect neck and hollow acoustic chamber.',
    materials: ['Riverbed Alluvial Clay', 'Natural Ochre Dye', 'Open-Pit Kiln Fired'],
    rating: 4.8,
    reviewsCount: 24
  },
  {
    id: 'bidri-01',
    title: 'Bidriware Hand-Chiselled Silver Inlay Box',
    category: 'metalware',
    categoryLabel: 'Metalware & Bidriware',
    origin: 'Bidar, Karnataka',
    giTag: '✓ GI Certified Heritage',
    artisan: 'Mohammed Rashid',
    artisanCredential: 'Crafted by Mohammed Rashid (National Awardee, 5th Gen)',
    cluster: 'Cast in Historic Bidar Metalcraft Guild',
    price: 4600,
    mrp: 7500,
    impactPill: '87% goes directly to artisan family',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&w=800&q=80',
    description: 'Cast from zinc-copper alloy, inlaid with pure 99.9% fine silver floral motifs, blackened with historic Bidar fort soil paste.',
    materials: ['Zinc-Copper Alloy', '99.9% Fine Silver Inlay', 'Historic Fort Soil Patina'],
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: 'woodwork-01',
    title: 'Channapatna Lacquered Wooden Craft Toy',
    category: 'woodwork',
    categoryLabel: 'Woodwork & Toys',
    origin: 'Channapatna, Karnataka',
    giTag: '✓ GI Certified Heritage',
    artisan: 'Chikka Muniswamy',
    artisanCredential: 'Crafted by Chikka Muniswamy (Toy Artisan, 3rd Gen)',
    cluster: 'Turned in Channapatna Lacquerware Craft Park',
    price: 1450,
    mrp: 2400,
    impactPill: '89% goes directly to artisan family',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from seasoned Hale (Wrightia tinctoria) ivory wood, turned on lathes and polished with non-toxic vegetable dyes and natural shellac.',
    materials: ['Hale Ivory Wood', 'Organic Shellac', 'Natural Turmeric & Indigo'],
    rating: 4.9,
    reviewsCount: 42
  },
  {
    id: 'pashmina-01',
    title: 'Hand-Spun Changthangi Pashmina Shawl',
    category: 'textiles',
    categoryLabel: 'Textiles & Handloom',
    origin: 'Srinagar, Jammu & Kashmir',
    giTag: '✓ GI Certified Heritage',
    artisan: 'Ghulam Rasool Mir',
    artisanCredential: 'Crafted by Ghulam Rasool Mir (Master Weaver, 40 yrs exp)',
    cluster: 'Woven in Old Srinagar Pashmina Collective',
    price: 12500,
    mrp: 21000,
    impactPill: '86% goes directly to artisan family',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    description: '100% pure Changthangi goat down hand-spun on traditional charkha spinning wheels and handloom-woven over 60 days in old Srinagar.',
    materials: ['Changthangi Cashmere', 'Handspun Charkha Yarn', 'Walnut Bark Dye'],
    rating: 4.9,
    reviewsCount: 52
  },
  {
    id: 'metal-02',
    title: 'Dhokra Lost-Wax Cast Bell Metal Figurine',
    category: 'metalware',
    categoryLabel: 'Metalware & Bidriware',
    origin: 'Bastar, Chhattisgarh',
    giTag: '✓ GI Certified Heritage',
    artisan: 'Budhram Kashyap',
    artisanCredential: 'Crafted by Budhram Kashyap (Tribal Metalsmith, 4th Gen)',
    cluster: 'Cast in Bastar Tribal Metal Guild',
    price: 2950,
    mrp: 4800,
    impactPill: '90% goes directly to artisan family',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    description: 'Ancient 4000-year-old non-ferrous lost-wax metal casting technique created by tribal artisans using pure beeswax thread modeling and furnace firing.',
    materials: ['Recycled Bell Metal', 'Wild Honeybee Wax', 'Anthill Clay Mould'],
    rating: 4.9,
    reviewsCount: 31
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Crafts' },
  { id: 'textiles', label: 'Textiles & Handloom' },
  { id: 'pottery', label: 'Earthenware & Terracotta' },
  { id: 'metalware', label: 'Metalware & Bidriware' },
  { id: 'woodwork', label: 'Woodwork & Toys' }
];

export default function Marketplace({ newlyAddedCraft, onSelectProduct, onBuyProduct }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Interactive ONDC Checkout Modal state
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [buyerName, setBuyerName] = useState('Ananya Sharma');
  const [buyerAddress, setBuyerAddress] = useState('42, Heritage Enclave, Koramangala');
  const [buyerCity, setBuyerCity] = useState('Bengaluru, Karnataka');
  const [buyerPincode, setBuyerPincode] = useState('560034');
  const [buyerPhone, setBuyerPhone] = useState('9876543210');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Merge newly added seller studio craft dynamically
  const catalogList = React.useMemo(() => {
    if (!newlyAddedCraft) return INITIAL_CATALOG;
    
    const presetId = newlyAddedCraft.presetData?.id || '';
    const isPottery = presetId === 'pot' || presetId === 'pottery';
    const isWoodwork = presetId === 'pen' || presetId === 'woodwork';

    const newEntry = {
      id: `new-${Date.now()}`,
      title: newlyAddedCraft.catalog?.title || 'Handcrafted Heritage Masterpiece',
      category: isPottery ? 'pottery' : isWoodwork ? 'woodwork' : 'textiles',
      categoryLabel: isPottery ? 'Earthenware & Terracotta' : isWoodwork ? 'Woodwork & Toys' : 'Textiles & Handloom',
      origin: newlyAddedCraft.presetData?.region || 'Varanasi, Uttar Pradesh',
      giTag: '✓ GI Certified Heritage',
      artisan: newlyAddedCraft.presetData?.artisan || 'Master Artisan',
      artisanCredential: `Crafted by ${newlyAddedCraft.presetData?.artisan || 'Master Artisan'} (${newlyAddedCraft.presetData?.experience || 'Master Craftsman'})`,
      cluster: `Crafted in ${newlyAddedCraft.presetData?.region || 'Sarai Mohana Handloom Cluster'}`,
      price: newlyAddedCraft.pricing?.totalPrice || 3200,
      mrp: Math.round((newlyAddedCraft.pricing?.totalPrice || 3200) * 1.5),
      impactPill: '88% goes directly to artisan family',
      image: newlyAddedCraft.enhancedImage || newlyAddedCraft.stagedImage || newlyAddedCraft.rawImage || newlyAddedCraft.image,
      description: newlyAddedCraft.catalog?.bilingual_description || newlyAddedCraft.voiceStory || 'Freshly cataloged directly on KariDoot AI Studio.',
      materials: newlyAddedCraft.catalog?.detected_materials || ['Handloom Yarn', 'Natural Dyes'],
      rating: 5.0,
      reviewsCount: 1,
      isNewBadge: true
    };

    return [newEntry, ...INITIAL_CATALOG];
  }, [newlyAddedCraft]);

  const filteredItems = catalogList.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' ||
      item.category === activeCategory ||
      (activeCategory === 'metalware' && (item.category === 'metalcraft' || item.category === 'metalware')) ||
      (activeCategory === 'pottery' && (item.category === 'pottery' || item.category === 'earthenware'));

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.artisan && item.artisan.toLowerCase().includes(q)) ||
      (item.origin && item.origin.toLowerCase().includes(q)) ||
      (item.cluster && item.cluster.toLowerCase().includes(q)) ||
      (item.artisanCredential && item.artisanCredential.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleOpenCheckout = (product) => {
    setCheckoutProduct(product);
  };

  const handleConfirmOrder = () => {
    if (!checkoutProduct) return;
    const orderData = {
      ...checkoutProduct,
      buyerAddress: `${buyerAddress}, ${buyerCity} - ${buyerPincode}`,
      buyerPhone,
      deliveryEstimate: '3-5 Business Days'
    };
    setCheckoutProduct(null);
    if (onBuyProduct) {
      onBuyProduct(orderData);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Marketplace Hero Banner */}
      <div className="card-artisan p-6 sm:p-10 mb-10 bg-gradient-to-br from-[#FAF7F2] via-white to-terracotta-50/40 border border-stone-border shadow-earthy relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-3 border border-forest-200">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
            <span>ONDC Open Network • Authentic Artisan Origin Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight mb-3">
            {t('marketplaceHeadline')}
          </h2>
          <p className="text-base text-charcoal-muted font-medium mb-6">
            Direct from certified master weavers, potters, and metal craftspeople. 0% aggregator markup with 88%+ revenue going directly to artisan families.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-terracotta-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by craft, GI tag, artisan, cluster or origin..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-border focus:border-terracotta-500 focus:outline-none text-sm font-medium shadow-xs"
              id="marketplace-search-input"
            />
          </div>
        </div>

        {/* Decorative Watermark Bird */}
        <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none hidden md:block">
          <svg viewBox="0 0 100 100" className="w-64 h-64 fill-terracotta-500">
            <circle cx="50" cy="50" r="46" />
          </svg>
        </div>
      </div>

      {/* Category Pills Filter: Geographical & Material Craft Filters */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8">
        <Filter className="w-4 h-4 text-charcoal-light mr-1 flex-shrink-0" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all select-none min-h-[40px] ${
              activeCategory === cat.id
                ? 'bg-terracotta-500 text-white shadow-xs'
                : 'bg-white text-charcoal hover:bg-linen-200 border border-stone-border'
            }`}
            id={`filter-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((product) => (
          <div
            key={product.id}
            className="card-artisan-hover flex flex-col justify-between overflow-hidden bg-white group cursor-pointer border border-stone-border rounded-3xl shadow-xs transition-all duration-300 hover:shadow-lg"
            onClick={() => onSelectProduct(product)}
            id={`product-card-${product.id}`}
          >
            {/* Card Header / Image with Floating Origin & GI Tag Badges */}
            <div className="relative aspect-4/3 overflow-hidden bg-linen-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Origin Badge (Top Left) */}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-terracotta-400 flex-shrink-0" />
                <span className="truncate max-w-[160px]">{product.origin}</span>
              </div>

              {/* GI Tag Badge (Top Right) */}
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-forest-700/90 backdrop-blur-xs text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-sm border border-forest-500/30">
                <Award className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                <span>{product.giTag || '✓ GI Certified Heritage'}</span>
              </div>

              {/* Added By Artisan Studio Chip (if newly added) */}
              {product.isNewBadge && (
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-terracotta-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Fresh Artisan Listing</span>
                </div>
              )}
            </div>

            {/* Card Body: Craft Name, Artisan Credential, Cluster, Pricing & Direct Impact */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Craft Name: Bold Title */}
                <h3 className="font-extrabold text-base sm:text-lg text-charcoal line-clamp-2 mb-2 group-hover:text-terracotta-600 transition-colors">
                  {product.title}
                </h3>
                
                {/* Artisan / Weaver Credential: Avatar Icon + Text */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-linen-200 text-charcoal font-black text-xs flex items-center justify-center flex-shrink-0 border border-stone-border">
                    {product.artisan ? product.artisan.charAt(0) : 'A'}
                  </div>
                  <span className="text-xs font-bold text-charcoal truncate">
                    {product.artisanCredential || `Crafted by ${product.artisan} (Master Weaver)`}
                  </span>
                </div>

                {/* Cluster Provenance */}
                <div className="text-xs text-charcoal-muted flex items-center gap-1.5 mb-3 bg-linen-100 px-2.5 py-1.5 rounded-lg border border-stone-border">
                  <Compass className="w-3.5 h-3.5 text-terracotta-500 flex-shrink-0" />
                  <span className="truncate font-medium">{product.cluster}</span>
                </div>

                {/* Materials Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.materials?.slice(0, 2).map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-linen-200 text-charcoal-muted px-2 py-0.5 rounded-md"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & Direct Impact Transparency */}
              <div className="pt-3 border-t border-stone-border space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-charcoal tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.mrp && (
                        <span className="text-xs text-charcoal-light line-through tabular-nums">
                          ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Transparency Pill: Direct Impact */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{product.impactPill || '88% goes directly to artisan family'}</span>
                  </div>
                </div>

                {/* Primary CTA Button: Prominent Terracotta Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenCheckout(product);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-terracotta-500/20 transition-all active:scale-[0.98]"
                  id={`buy-ondc-btn-${product.id}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy on ONDC Network →</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ================= INTERACTIVE ONDC CHECKOUT MODAL ================= */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-border shadow-2xl overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="px-6 py-5 bg-linen-100 border-b border-stone-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-terracotta-500 text-white flex items-center justify-center font-bold text-xs">
                  ONDC
                </div>
                <div>
                  <h3 className="text-base font-black text-charcoal">ONDC Direct Checkout</h3>
                  <p className="text-[11px] text-charcoal-muted font-medium">Beckn Protocol v1.2.0 • 0% Commission Escrow</p>
                </div>
              </div>
              <button
                onClick={() => setCheckoutProduct(null)}
                className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-linen-200 transition-colors"
                id="close-checkout-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* Product Snapshot */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-linen-50 border border-stone-border">
                <img
                  src={checkoutProduct.image}
                  alt={checkoutProduct.title}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-border flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-black text-charcoal truncate">{checkoutProduct.title}</h4>
                  <p className="text-[11px] text-charcoal-muted truncate mt-0.5">{checkoutProduct.artisanCredential}</p>
                  <p className="text-[11px] text-forest-700 font-bold truncate mt-0.5">📍 {checkoutProduct.origin}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-black text-charcoal">₹{checkoutProduct.price.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-forest-700 font-bold bg-forest-50 px-1.5 py-0.5 rounded border border-forest-200">
                    Direct Payout
                  </div>
                </div>
              </div>

              {/* Direct Impact Escrow Breakdown */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-amber-900 mb-1">
                  <span>Transparent Price Breakdown</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Fair Trade Audited</span>
                </div>
                <div className="flex justify-between text-charcoal">
                  <span>Artisan Direct Payout (88% Escrow):</span>
                  <span className="font-bold">₹{Math.round(checkoutProduct.price * 0.88).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Handloom Packaging & GI Certificate:</span>
                  <span>₹{Math.round(checkoutProduct.price * 0.05).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>ONDC Logistics (India Post / Delhivery):</span>
                  <span>₹{(checkoutProduct.price - Math.round(checkoutProduct.price * 0.88) - Math.round(checkoutProduct.price * 0.05)).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-forest-700 font-bold pt-1 border-t border-amber-200/60">
                  <span>Aggregator Middleman Commission:</span>
                  <span>₹0 (0% Platform Markup)</span>
                </div>
              </div>

              {/* Buyer Address & Delivery Details */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-charcoal block">
                  Delivery Destination & Pincode
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-charcoal-muted uppercase block mb-1">Recipient Name</span>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-linen-50 border border-stone-border text-xs font-semibold focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-charcoal-muted uppercase block mb-1">Mobile (+91)</span>
                    <input
                      type="text"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-linen-50 border border-stone-border text-xs font-semibold focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-charcoal-muted uppercase block mb-1">Street Address</span>
                  <input
                    type="text"
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-linen-50 border border-stone-border text-xs font-semibold focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-charcoal-muted uppercase block mb-1">City & State</span>
                    <input
                      type="text"
                      value={buyerCity}
                      onChange={(e) => setBuyerCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-linen-50 border border-stone-border text-xs font-semibold focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-charcoal-muted uppercase block mb-1">Pincode</span>
                    <input
                      type="text"
                      value={buyerPincode}
                      onChange={(e) => setBuyerPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-linen-50 border border-stone-border text-xs font-semibold focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                </div>

                {/* Delivery Time Estimate Badge */}
                <div className="p-3 rounded-xl bg-forest-50 border border-forest-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-extrabold text-forest-900">
                    <Truck className="w-4 h-4 text-forest-600 flex-shrink-0" />
                    <span>⚡ Estimated Delivery: 3–5 Business Days</span>
                  </div>
                  <p className="text-[11px] text-forest-700 font-medium pl-5.5">
                    Direct dispatch from {checkoutProduct.cluster} with live Beckn network tracking.
                  </p>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-extrabold text-charcoal block mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-900 shadow-2xs'
                        : 'border-stone-border bg-white text-charcoal hover:bg-linen-100'
                    }`}
                  >
                    <span>UPI Direct (GPay, PhonePe)</span>
                    {paymentMethod === 'upi' && <Check className="w-4 h-4 text-terracotta-600" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-900 shadow-2xs'
                        : 'border-stone-border bg-white text-charcoal hover:bg-linen-100'
                    }`}
                  >
                    <span>Cash on Delivery</span>
                    {paymentMethod === 'cod' && <Check className="w-4 h-4 text-terracotta-600" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-linen-100 border-t border-stone-border flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Total Amount</span>
                <span className="text-2xl font-black text-charcoal tabular-nums">
                  ₹{checkoutProduct.price.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 py-3.5 px-5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-terracotta-500/25 transition-all active:scale-[0.98]"
                id="confirm-ondc-order-btn"
              >
                <span>Confirm & Dispatch on ONDC →</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
