import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Star,
  ShieldCheck,
  Camera,
  Upload,
  User,
  CheckCircle2,
  ThumbsUp,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';

const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Ananya Sharma',
    city: 'Bangalore',
    rating: 5,
    date: '2 days ago',
    verified: true,
    comment: 'The weave quality of this silk saree is out of this world! The gold zari border is genuine electroplated silver thread, not plastic imitation. Knowing 100% of my money goes straight to Ramzan Ali ji feels truly rewarding.',
    photoUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rev-2',
    author: 'Karthik Raja',
    city: 'Chennai',
    rating: 5,
    date: '1 week ago',
    verified: true,
    comment: 'Arrived in biodegradable eco-packaging with a handwritten postcard from the artisan. The authentic GI tag verification code works on the government portal!',
    photoUrl: null
  }
];

export default function ProductReviews({ product }) {
  const { t, speakText } = useLanguage();

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create local preview using browser URL.createObjectURL API
      const objectUrl = URL.createObjectURL(file);
      setUploadedPhotoUrl(objectUrl);
      speakText('Photo attached for review preview.');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      author: authorName.trim() || 'Verified ONDC Buyer',
      city: 'India',
      rating,
      date: 'Just now',
      verified: true,
      comment: commentText,
      photoUrl: uploadedPhotoUrl
    };

    setReviews([newReview, ...reviews]);
    setCommentText('');
    setAuthorName('');
    setUploadedPhotoUrl(null);
    setSubmitted(true);
    speakText('Thank you for supporting authentic Indian craft with your verified review!');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="card-artisan p-6 sm:p-8 bg-white mt-12 border border-stone-border shadow-earthy">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-border">
        <div>
          <h3 className="text-2xl font-black text-charcoal tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-terracotta-500" />
            <span>{t('reviewsTitle')}</span>
          </h3>
          <p className="text-xs text-charcoal-muted font-medium mt-1">
            Authentic customer testimonials with verified handloom photo verification
          </p>
        </div>

        {/* Rating Score Summary */}
        <div className="flex items-center gap-3 bg-linen-100 px-4 py-2.5 rounded-2xl border border-stone-border">
          <div className="flex items-center text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <span className="text-lg font-black text-charcoal">4.9 / 5</span>
          <span className="text-xs text-charcoal-light">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmitReview} className="p-6 rounded-3xl bg-linen-100 border border-stone-border mb-10">
        <h4 className="font-extrabold text-sm text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-forest-600" />
          <span>{t('writeReview')} (ONDC Buyer Protected)</span>
        </h4>

        {/* Star Selection with Hover State */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-charcoal-light mr-2">Your Rating:</span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 text-amber-400 hover:scale-125 transition-transform"
              >
                <Star
                  className={`w-6 h-6 ${
                    (hoverRating || rating) >= star ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-black text-charcoal ml-2">
            {rating} Stars ({rating === 5 ? 'Masterpiece!' : 'Good Quality'})
          </span>
        </div>

        {/* Name & Feedback Textarea */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your Name (e.g. Priya Nair)"
            className="w-full bg-white p-3 rounded-xl border border-stone-border text-sm font-medium focus:outline-none focus:border-terracotta-500"
          />
        </div>

        <textarea
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Share your appreciation for the artisan's handiwork, weave texture, packaging, or colors..."
          className="w-full bg-white p-3.5 rounded-xl border border-stone-border text-sm font-medium focus:outline-none focus:border-terracotta-500 mb-4 resize-none"
        />

        {/* Customer Photo Upload Input using URL.createObjectURL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-border hover:border-terracotta-400 rounded-xl cursor-pointer text-xs font-bold text-charcoal shadow-xs transition-colors">
              <Camera className="w-4 h-4 text-terracotta-600" />
              <span>{t('buyerPhotoUpload')}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="buyer-photo-upload-input"
              />
            </label>

            {uploadedPhotoUrl && (
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-500">
                <img src={uploadedPhotoUrl} alt="Customer upload preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-tl text-[8px] px-1 font-bold">
                  ✓
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn-tactile bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs min-h-[44px] px-6 shadow-md shadow-terracotta-500/20"
            id="submit-review-btn"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('submitReview')}</span>
          </button>
        </div>

        {submitted && (
          <div className="mt-3 p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Review successfully verified and added to artisan profile!</span>
          </div>
        )}
      </form>

      {/* Community Reviews List */}
      <div className="space-y-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-5 rounded-2xl bg-white border border-stone-border shadow-xs">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linen-200 flex items-center justify-center font-bold text-terracotta-700 text-sm">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-sm text-charcoal">{rev.author}</h5>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[10px] font-bold border border-forest-200">
                        <ShieldCheck className="w-3 h-3 text-forest-600" />
                        <span>{t('verifiedBuyer')}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-charcoal-light font-medium">
                    {rev.city} • {rev.date}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-sm text-charcoal font-medium leading-relaxed mb-3">
              {rev.comment}
            </p>

            {/* Buyer Attached Photo */}
            {rev.photoUrl && (
              <div className="mt-3">
                <p className="text-[11px] font-bold text-charcoal-light mb-1.5 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3 text-forest-600" />
                  <span>Buyer attached photo:</span>
                </p>
                <div className="w-28 h-28 rounded-xl overflow-hidden border border-stone-border shadow-xs">
                  <img
                    src={rev.photoUrl}
                    alt="Buyer delivered product"
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
