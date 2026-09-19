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
  CreditCard,
  Star,
  ExternalLink,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Radio
} from 'lucide-react';

const ONDC_BUYER_APPS = [
  {
    name: 'Paytm ONDC',
    url: 'https://paytm.com',
    brandColor: 'text-[#002E6E] border-[#00BAF2]/40 bg-[#00BAF2]/10 hover:bg-[#00BAF2]/20',
    dotColor: 'bg-[#00BAF2]'
  },
  {
    name: 'Pincode (PhonePe)',
    url: 'https://www.pincode.com',
    brandColor: 'text-[#5F259F] border-[#5F259F]/30 bg-[#5F259F]/10 hover:bg-[#5F259F]/20',
    dotColor: 'bg-[#5F259F]'
  },
  {
    name: 'Mystore',
    url: 'https://www.mystore.in',
    brandColor: 'text-[#E11900] border-[#E11900]/30 bg-[#E11900]/10 hover:bg-[#E11900]/20',
    dotColor: 'bg-[#E11900]'
  },
  {
    name: 'Magicpin',
    url: 'https://magicpin.in',
    brandColor: 'text-[#C72A39] border-[#E23744]/30 bg-[#E23744]/10 hover:bg-[#E23744]/20',
    dotColor: 'bg-[#E23744]'
  }
];

const INITIAL_CATALOG = [
  {
    id: 'pochampally-01',
    title: 'Pochampally Ikat Handloom Silk Saree',
    category: 'textiles',
    categoryLabel: 'Textiles & Handloom',
    origin: 'Pochampally, Telangana',
    giTag: '✓ Verified GI Artisan',
    artisan: 'Lakshmi Devi',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    artisanCredential: 'Master Weaver (28 yrs experience) • President, Bhoodan Weavers Guild',
    cluster: 'Pochampally Handloom Cluster, Telangana',
    price: 4650,
    mrp: 8900,
    impactPill: '100% direct maker revenue',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Double-ikat weave created with resist-dyed mulberry silk yarn on traditional frame looms. Features distinctive geometric diamond motifs and natural herbal madder root dyes.',
    materials: ['Pure Mulberry Silk', 'Natural Madder & Indigo', 'Traditional Resist-Dye Yarn'],
    rating: 4.9,
    reviewsCount: 124,
    reviews: [
      {
        id: 'rev-p1',
        author: 'Sunita Reddy',
        city: 'Hyderabad',
        rating: 5,
        date: '3 days ago',
        comment: 'Incredible geometric precision! The texture is buttery soft. Knowing that 100% of my ₹4,650 went directly to Lakshmi Devi without a 30% aggregator cut makes this purchase so special.',
        verified: true
      },
      {
        id: 'rev-p2',
        author: 'Meera Nambiar',
        city: 'Bengaluru',
        rating: 5,
        date: '1 week ago',
        comment: 'Shipped via Shiprocket ONDC network in eco-friendly banana fiber packaging. Arrived in Bangalore within 48 hours directly from Pochampally village!',
        verified: true
      }
    ]
  },
  {
    id: 'banarasi-01',
    title: 'Handwoven Pure Katan Silk Saree',
    category: 'textiles',
    categoryLabel: 'Textiles & Handloom',
    origin: 'Varanasi, Uttar Pradesh',
    giTag: '✓ Verified GI Artisan',
    artisan: 'Ramzan Ali',
    artisanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    artisanCredential: 'Master Weaver (4th Generation) • Sarai Mohana Silk Guild',
    cluster: 'Sarai Mohana Handloom Cluster, Varanasi',
    price: 5200,
    mrp: 9800,
    impactPill: '100% direct maker revenue',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    description: 'Woven on traditional pit looms using certified mulberry katan silk and real electroplated silver zari. Certified Varanasi Handloom Mark.',
    materials: ['Mulberry Katan Silk', 'Pure Silver Zari', 'Natural Indigo'],
    rating: 4.9,
    reviewsCount: 88,
    reviews: [
      {
        id: 'rev-b1',
        author: 'Ananya Sharma',
        city: 'Bangalore',
        rating: 5,
        date: '4 days ago',
        comment: 'The gold and silver zari border is genuine electroplated silver thread, not plastic imitation. The weave weight and sheen are extraordinary.',
        verified: true
      },
      {
        id: 'rev-b2',
        author: 'Pooja Tandon',
        city: 'Delhi',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Handwritten postcard from Ramzan Ali ji inside the box. Delhivery pickup from Varanasi arrived pristine in 3 days.',
        verified: true
      }
    ]
  },
  {
    id: 'pottery-01',
    title: 'Handmade Terracotta Bankura Horse',
    category: 'pottery',
    categoryLabel: 'Earthenware & Terracotta',
    origin: 'Bankura, West Bengal',
    giTag: '✓ Verified GI Artisan',
    artisan: 'Saraswati Kumbhakar',
    artisanAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    artisanCredential: 'Master Sculptor (3rd Gen) • Panchmura Earthen Guild',
    cluster: 'Panchmura Terracotta Cluster, Bankura',
    price: 1850,
    mrp: 3400,
    impactPill: '100% direct maker revenue',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    description: 'Sculpted from sacred Damodar riverbed alluvial clay and open-pit fired. Renowned for its distinctive erect neck and hollow acoustic chamber.',
    materials: ['Riverbed Alluvial Clay', 'Natural Ochre Dye', 'Open-Pit Kiln Fired'],
    rating: 4.8,
    reviewsCount: 42,
    reviews: [
      {
        id: 'rev-k1',
        author: 'Debashis Roy',
        city: 'Kolkata',
        rating: 5,
        date: '5 days ago',
        comment: 'Magnificent terracotta craftsmanship! Zero breakage thanks to air-cushioned recycled paper packaging via Shadowfax.',
        verified: true
      }
    ]
  },
  {
    id: 'bidri-01',
    title: 'Bidriware Hand-Chiselled Silver Inlay Box',
    category: 'metalware',
    categoryLabel: 'Metalware & Bidriware',
    origin: 'Bidar, Karnataka',
    giTag: '✓ Verified GI Artisan',
    artisan: 'Mohammed Rashid',
    artisanAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    artisanCredential: 'National Awardee (5th Gen) • Historic Bidar Guild',
    cluster: 'Historic Bidar Metalcraft Guild, Karnataka',
    price: 4600,
    mrp: 8200,
    impactPill: '100% direct maker revenue',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&w=800&q=80',
    description: 'Cast from zinc-copper alloy, inlaid with pure 99.9% fine silver floral motifs, blackened with historic Bidar fort soil paste.',
    materials: ['Zinc-Copper Alloy', '99.9% Fine Silver Inlay', 'Historic Fort Soil Patina'],
    rating: 5.0,
    reviewsCount: 56,
    reviews: [
      {
        id: 'rev-bd1',
        author: 'Vikramaditya Rao',
        city: 'Mumbai',
        rating: 5,
        date: '1 week ago',
        comment: 'Pure 99.9% silver inlay confirmed. The deep black fort soil patina is mesmerizing. 100% went straight to Rashid bhai.',
        verified: true
      }
    ]
  },
  {
    id: 'woodwork-01',
    title: 'Channapatna Lacquered Wooden Craft Set',
    category: 'woodwork',
    categoryLabel: 'Woodwork & Toys',
    origin: 'Channapatna, Karnataka',
    giTag: '✓ Verified GI Artisan',
    artisan: 'Chikka Muniswamy',
    artisanAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    artisanCredential: 'Toy Artisan (3rd Generation) • Lacquerware Crafts Park',
    cluster: 'Channapatna Lacquerware Craft Park, Karnataka',
    price: 1450,
    mrp: 2600,
    impactPill: '100% direct maker revenue',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from seasoned Hale ivory wood, turned on lathes and polished with non-toxic vegetable dyes and natural shellac.',
    materials: ['Hale Ivory Wood', 'Organic Shellac', 'Natural Turmeric & Indigo'],
    rating: 4.9,
    reviewsCount: 64,
    reviews: [
      {
        id: 'rev-w1',
        author: 'Kavita Menon',
        city: 'Kochi',
        rating: 5,
        date: '3 days ago',
        comment: 'Smooth and completely safe for kids. The natural vegetable dye shine is breathtaking.',
        verified: true
      }
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Crafts' },
  { id: 'textiles', label: 'Textiles & Handloom' },
  { id: 'pottery', label: 'Earthenware & Terracotta' },
  { id: 'metalware', label: 'Metalware & Bidriware' },
  { id: 'woodwork', label: 'Woodwork & Toys' }
];

export default function BuyerMarketplace({ newlyAddedCraft, onSelectProduct, onBuyProduct }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Expanded reviews drawer state keyed by product id
  const [expandedReviews, setExpandedReviews] = useState({});

  // Checkout modal
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [buyerName, setBuyerName] = useState('Ananya Sharma');
  const [buyerAddress, setBuyerAddress] = useState('42, Heritage Enclave, Koramangala');
  const [buyerCity, setBuyerCity] = useState('Bengaluru, Karnataka');
  const [buyerPincode, setBuyerPincode] = useState('560034');
  const [buyerPhone, setBuyerPhone] = useState('9876543210');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const toggleReviews = (productId, e) => {
    e.stopPropagation();
    setExpandedReviews((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Merge freshly cataloged craft dynamically
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
      origin: newlyAddedCraft.presetData?.region || 'Sarai Mohana, Varanasi',
      giTag: '✓ Verified GI Artisan',
      artisan: newlyAddedCraft.presetData?.artisan || 'Master Artisan',
      artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      artisanCredential: `Crafted by ${newlyAddedCraft.presetData?.artisan || 'Master Artisan'} (${newlyAddedCraft.presetData?.experience || 'Master Craftsman'})`,
      cluster: `Crafted in ${newlyAddedCraft.presetData?.region || 'Rural Craft Cluster, India'}`,
      price: newlyAddedCraft.pricing?.artisanPrice || newlyAddedCraft.pricing?.totalPrice || 3200,
      mrp: Math.round((newlyAddedCraft.pricing?.artisanPrice || newlyAddedCraft.pricing?.totalPrice || 3200) * 1.9),
      impactPill: '100% direct maker revenue',
      image: newlyAddedCraft.enhancedImage || newlyAddedCraft.stagedImage || newlyAddedCraft.rawImage || newlyAddedCraft.image,
      description: newlyAddedCraft.catalog?.bilingual_description || newlyAddedCraft.voiceStory || 'Freshly cataloged directly on KariDoot AI Studio.',
      materials: newlyAddedCraft.catalog?.detected_materials || ['Handloom Yarn', 'Natural Dyes'],
      rating: 5.0,
      reviewsCount: 1,
      isNewBadge: true,
      reviews: [
        {
          id: 'rev-new-1',
          author: 'Conscious Craft Buyer',
          city: 'New Delhi',
          rating: 5,
          date: 'Just now',
          comment: 'Freshly listed via KariDoot ONDC Engine. Direct maker authentic pricing with verified provenance certificate.',
          verified: true
        }
      ]
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

    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.artisan && item.artisan.toLowerCase().includes(q)) ||
      (item.origin && item.origin.toLowerCase().includes(q)) ||
      (item.cluster && item.cluster.toLowerCase().includes(q))
    );
  });

  const handleOpenCheckout = (product, e) => {
    if (e) e.stopPropagation();
    setCheckoutProduct(product);
  };

  const handleConfirmOrder = () => {
    if (!checkoutProduct) return;
    const orderData = {
      ...checkoutProduct,
      buyerAddress: `${buyerAddress}, ${buyerCity} - ${buyerPincode}`,
      buyerPhone,
      deliveryEstimate: '2-4 Business Days via Delhivery ONDC'
    };
    setCheckoutProduct(null);
    if (onBuyProduct) {
      onBuyProduct(orderData);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Marketplace Hero Banner */}
      <div className="rounded-3xl p-6 sm:p-10 mb-10 bg-gradient-to-br from-[#FAF7F2] via-white to-amber-50/40 border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ONDC Open Network • Live Beckn Protocol Directory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">
            Direct Artisan Marketplace
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-medium">
            Buy authentic GI-tagged masterpieces directly from certified rural weavers and craftspeople. 0% aggregator commission with 100% direct revenue retained by the makers.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl pt-2">
            <Search className="w-5 h-5 text-amber-600 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by craft, artisan, cluster, or GI tag..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-300 focus:border-amber-600 focus:outline-none text-sm font-medium shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8">
        <Filter className="w-4 h-4 text-stone-500 mr-1 flex-shrink-0" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all select-none ${
              activeCategory === cat.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((product) => {
          const isReviewsOpen = expandedReviews[product.id];
          return (
            <div
              key={product.id}
              className="flex flex-col justify-between overflow-hidden bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Product Visual & Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Origin Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="truncate max-w-[150px]">{product.origin}</span>
                </div>

                {/* GI Certified Tag Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-800/90 backdrop-blur-xs text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-sm border border-emerald-500/30">
                  <Award className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                  <span>{product.giTag || '✓ Verified GI Artisan'}</span>
                </div>

                {/* Live Beckn Broadcast Pill */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-stone-900/85 backdrop-blur-xs text-white rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Broadcasted Live on ONDC Beckn</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                {/* 1. Artisan Provenance Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    {product.artisanAvatar ? (
                      <img
                        src={product.artisanAvatar}
                        alt={product.artisan}
                        className="w-9 h-9 rounded-full object-cover border border-stone-200 shadow-xs flex-shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center flex-shrink-0 border border-amber-200">
                        {product.artisan?.charAt(0) || 'A'}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-stone-900 leading-none">
                          {product.artisan}
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                          <UserCheck className="w-2.5 h-2.5" />
                          <span>Verified Maker</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 font-medium truncate max-w-[180px]">
                        {product.cluster || product.origin}
                      </p>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 text-amber-900 text-xs font-bold flex-shrink-0">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-[10px] text-stone-500">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* 2. Craft Title & Details */}
                <div>
                  <h3 className="font-serif font-black text-base sm:text-lg text-stone-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                {/* Materials Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {product.materials?.slice(0, 3).map((mat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md border border-stone-200"
                    >
                      {mat}
                    </span>
                  ))}
                </div>

                {/* 3. Pricing & Direct Impact Transparency */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                      Direct Maker Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.mrp && (
                        <span className="text-xs text-stone-400 line-through font-mono">
                          ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    100% Retained by Maker
                  </span>
                </div>

                {/* 4. "Buy via ONDC Apps" Direct Platform Redirect Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">
                    <span>Order via ONDC Buyer Apps:</span>
                    <span className="text-emerald-600">Zero Commission</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {ONDC_BUYER_APPS.map((app) => (
                      <a
                        key={app.name}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-bold border transition-all flex items-center justify-center gap-1 shadow-2xs ${app.brandColor}`}
                        title={`Open and order on ${app.name}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${app.dotColor} flex-shrink-0`} />
                        <span className="truncate">{app.name.split(' ')[0]}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Direct KariDoot One-Click Checkout */}
                <button
                  type="button"
                  onClick={(e) => handleOpenCheckout(product, e)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-900/10 transition-all active:scale-[0.98] cursor-pointer"
                  id={`buy-direct-btn-${product.id}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Direct ONDC Checkout (0% Fee) →</span>
                </button>

                {/* 5. Customer Reviews Drawer / Expandable Tab */}
                <div className="pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={(e) => toggleReviews(product.id, e)}
                    className="w-full flex items-center justify-between text-xs font-bold text-stone-600 hover:text-amber-800 py-1 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                      <span>Read Verified Reviews ({product.reviews?.length || 0})</span>
                    </span>
                    {isReviewsOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400" />
                    )}
                  </button>

                  {/* Expandable Reviews Section */}
                  {isReviewsOpen && (
                    <div className="mt-3 space-y-2.5 pt-2 border-t border-stone-100 animate-fade-in text-left">
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((rev) => (
                          <div
                            key={rev.id}
                            className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-stone-900">{rev.author}</span>
                                <span className="text-[10px] text-stone-400 font-mono">({rev.city})</span>
                              </div>
                              <div className="flex items-center text-amber-500">
                                {[...Array(rev.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-500" />
                                ))}
                              </div>
                            </div>
                            <p className="text-stone-700 leading-relaxed font-medium">
                              "{rev.comment}"
                            </p>
                            <div className="flex items-center justify-between text-[10px] text-emerald-700 font-semibold pt-1">
                              <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Verified ONDC Delivery</span>
                              </span>
                              <span className="text-stone-400 font-mono">{rev.date}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-stone-400 text-center py-2">
                          Be the first to review this artisan creation!
                        </p>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ================= INTERACTIVE ONDC CHECKOUT MODAL ================= */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="px-6 py-5 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                  ONDC
                </div>
                <div>
                  <h3 className="text-base font-bold">Direct ONDC Checkout</h3>
                  <p className="text-[11px] text-stone-400 font-medium">Beckn Protocol v1.2.0 • 0% Aggregator Fee</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutProduct(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Product Summary */}
              <div className="flex gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <img
                  src={checkoutProduct.image}
                  alt={checkoutProduct.title}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-stone-900 truncate">
                    {checkoutProduct.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Maker: {checkoutProduct.artisan}
                  </p>
                  <p className="text-sm font-black text-amber-700 font-mono mt-1">
                    ₹{checkoutProduct.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-stone-600">
                  Delivery Address (ONDC Logistics Routing)
                </h5>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Recipient Name"
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none"
                />
                <input
                  type="text"
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  placeholder="Street Address / House No."
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={buyerCity}
                    onChange={(e) => setBuyerCity(e.target.value)}
                    placeholder="City, State"
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={buyerPincode}
                    onChange={(e) => setBuyerPincode(e.target.value)}
                    placeholder="Pincode"
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="Mobile Number"
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Logistics Partner Routing Info */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Doorstep Village Dispatch: Delhivery / Shiprocket ONDC</span>
                </div>
                <p className="text-emerald-800">
                  Direct pickup from {checkoutProduct.origin}. Estimated delivery: 2-4 business days.
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Craft Direct Price:</span>
                  <span className="font-mono">₹{checkoutProduct.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>KariDoot Platform Fee:</span>
                  <span className="font-mono text-emerald-700 font-bold">₹0 (0% Commission)</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>ONDC Open Network Fee:</span>
                  <span className="font-mono text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-black text-sm text-stone-900">
                  <span>Total Payable:</span>
                  <span className="font-mono text-amber-700">₹{checkoutProduct.price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Order & Dispatch via ONDC</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
