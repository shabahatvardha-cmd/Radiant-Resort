import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronRight, ChevronLeft, Feather } from 'lucide-react';
import { playCardFlipSound } from '../../utils/audioEffects';

// Curated authentic guest impressions
const GUEST_FEEDBACKS = [
  {
    id: 1,
    initials: 'AM',
    name: 'Aditya Mathur',
    city: 'New Delhi',
    suite: 'Grandeur Suite Stay',
    rating: 5.0,
    date: 'Stayed October 2026',
    quote:
      'The Grandeur Suite rivalled any presidential suite in Udaipur. Flawless dignity, Statuario marble bath, and private sunset verandah overlooking the Vedic gardens.',
    highlight: 'Presidential Tier Luxury',
  },
  {
    id: 2,
    initials: 'SK',
    name: 'Dr. Shalini Kapoor',
    city: 'Lucknow',
    suite: 'Vedic Spa & Suite',
    rating: 5.0,
    date: 'Stayed November 2026',
    quote:
      'The Vedic Spa therapists are truly trained in authentic Ayurvedic lineage. The warm herbal Dhanwantari oils and serene morning courtyard made our stay unforgettable.',
    highlight: 'Authentic Ayurvedic Lineage',
  },
  {
    id: 3,
    initials: 'VS',
    name: 'Vikramaditya Singhania',
    city: 'Mumbai',
    suite: 'Malibu Sky Cabana',
    rating: 5.0,
    date: 'Stayed September 2026',
    quote:
      'Gorakhpur has never witnessed rooftop dining at this calibre. The woodfired gastronomy, craft smoked bourbon flights, and sunset skyline beats at 84 meters are pure world-class theatre.',
    highlight: 'Rooftop Gastronomy Hotspot',
  },
  {
    id: 4,
    initials: 'RD',
    name: 'Ananya & Rohan Desai',
    city: 'Bengaluru',
    suite: 'Deluxe Suite Sanctuary',
    rating: 5.0,
    date: 'Stayed August 2026',
    quote:
      'A masterclass in quiet luxury. Soundproofing was absolute silence, the royal butler service was anticipating every detail, and the breakfast spread at The Seven Scentric was magnificent.',
    highlight: 'Quiet Acoustic Sanctuary',
  },
  {
    id: 5,
    initials: 'RB',
    name: 'Col. R.K. Bhargava (Retd.)',
    city: 'Dehradun',
    suite: 'Executive Suite Room',
    rating: 5.0,
    date: 'Stayed July 2026',
    quote:
      'Old-world hospitality paired with razor-sharp modern efficiency. Solid teak work sanctuary, high-speed connectivity, and Gorakhpur’s most dignified address.',
    highlight: 'Executive Refinement & Calm',
  },
];

export default function AnimatedGuestNotesCard() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const cardRef = useRef(null);
  const progressAnimRef = useRef(null);
  const startTimeRef = useRef(0);

  const ROLL_DURATION = 3200; // Duration in ms before next note rolls in while cursor is on card

  // Auto-roll text while cursor is kept on card
  useEffect(() => {
    if (!isHovered) {
      setProgress(0);
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
      return;
    }

    startTimeRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min(100, (elapsed / ROLL_DURATION) * 100);
      setProgress(pct);

      if (elapsed >= ROLL_DURATION) {
        triggerRollToNext();
        startTimeRef.current = performance.now();
      }

      progressAnimRef.current = requestAnimationFrame(tick);
    };

    progressAnimRef.current = requestAnimationFrame(tick);

    return () => {
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
    };
  }, [isHovered, currentIdx]);

  const triggerRollToNext = () => {
    setIsRolling(true);
    playCardFlipSound();

    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % GUEST_FEEDBACKS.length);
      setIsRolling(false);
    }, 280);
  };

  const handleManualJump = (idx) => {
    if (idx === currentIdx) return;
    setIsRolling(true);
    playCardFlipSound();
    setTimeout(() => {
      setCurrentIdx(idx);
      setIsRolling(false);
      startTimeRef.current = performance.now();
      setProgress(0);
    }, 200);
  };

  // 3D Card tilt based on cursor position over the card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -6; // Max 6 deg pitch
    const tiltY = ((x - centerX) / centerX) * 6; // Max 6 deg yaw

    setCardTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCardTilt({ x: 0, y: 0 });
    setProgress(0);
  };

  const review = GUEST_FEEDBACKS[currentIdx] || GUEST_FEEDBACKS[0];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto rounded-3xl preserve-3d will-change-transform transition-all duration-300 group cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
      }}
    >
      {/* Layered Under-Cards for Realistic Stacked Stationery Feel */}
      <div className="absolute inset-0 bg-[#EFEADF] rounded-3xl transform rotate-2 translate-x-2 translate-y-2 border border-stone-300 shadow-md pointer-events-none -z-20 transition-transform duration-300 group-hover:rotate-3 group-hover:translate-x-3" />
      <div className="absolute inset-0 bg-[#F7F4EC] rounded-3xl transform -rotate-1 -translate-x-1 translate-y-1 border border-stone-300 shadow-sm pointer-events-none -z-10 transition-transform duration-300 group-hover:-rotate-2 group-hover:-translate-x-2" />

      {/* Main Luxury Notes Card (Warm Ivory Parchment Finish) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FCFBF8] border-2 border-[#DFD7C4] p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col justify-between min-h-[420px]">
        {/* Subtle Luxury Ruled Stationery Watermark Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_31px,rgba(212,175,55,0.12)_32px)] bg-[size:100%_32px]" />
        </div>

        {/* Top Progress Ticker Bar (Fills smoothly while cursor stays on card) */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-stone-200/60 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold via-amber-400 to-gold transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stationery Header: Vintage Gold Clip & Hotel Guestbook Registry Tag */}
        <div className="flex items-center justify-between border-b-2 border-[#EAE3D2] pb-3.5 relative z-10">
          <div className="flex items-center gap-2.5">
            {/* Brass Stationery Pin/Seal */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark text-forest-950 flex items-center justify-center font-bold shadow-sm border border-gold-light/60">
              <Feather className="w-4 h-4 text-forest-950" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] font-sans font-black uppercase text-gold-dark">
                Official Sanctuary Registry
              </p>
              <p className="text-xs font-serif font-black text-forest-950">
                Verified Guest Impressions • Folio {review.id} of {GUEST_FEEDBACKS.length}
              </p>
            </div>
          </div>

          {/* Dynamic Rolling Indicator Pill */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-sans font-black uppercase tracking-wider transition-all duration-300 ${
              isHovered
                ? 'bg-forest-950 text-gold shadow-sm ring-1 ring-gold'
                : 'bg-stone-100 text-charcoal border border-stone-300'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isHovered ? 'bg-gold animate-ping' : 'bg-stone-400'
              }`}
            />
            <span>{isHovered ? 'Rolling Feedbacks' : 'Hold cursor to roll'}</span>
          </div>
        </div>

        {/* Rolling Quote Content Stage (Animated vertical roll transition) */}
        <div className="relative my-auto py-5 z-10 min-h-[160px] flex flex-col justify-center overflow-hidden">
          {/* Subtle Watermark Quote Glyphs */}
          <Quote className="w-16 h-16 text-gold/[0.12] absolute -top-4 -left-2 pointer-events-none" />

          <div
            className={`will-change-transform transition-all duration-300 ${
              isRolling
                ? '-translate-y-8 opacity-0 scale-[0.98] blur-[1px]'
                : 'translate-y-0 opacity-100 scale-100 blur-0'
            }`}
          >
            <span className="inline-block px-3 py-0.5 rounded-full bg-gold/15 text-gold-dark border border-gold/30 text-[10px] font-sans font-black uppercase tracking-widest mb-2">
              {review.highlight}
            </span>
            <p className="text-lg sm:text-2xl font-serif italic font-black text-forest-950 leading-relaxed drop-shadow-sm">
              "{review.quote}"
            </p>
          </div>
        </div>

        {/* Stationery Footer: Guest Signature & Verification Details */}
        <div className="relative z-10 pt-4 border-t-2 border-[#EAE3D2]">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isRolling ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Guest Profile Details */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-forest-950 text-gold border-2 border-gold flex items-center justify-center font-serif font-black text-sm shadow-md">
                {review.initials}
              </div>
              <div>
                <h4 className="font-serif font-black text-base text-forest-950 leading-tight">
                  {review.name}
                </h4>
                <p className="text-xs font-sans text-gold-dark font-bold uppercase tracking-wider">
                  {review.city} • <span className="text-charcoal font-semibold">{review.suite}</span>
                </p>
              </div>
            </div>

            {/* Five Star Golden Seal */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-0.5 bg-gold/20 px-2.5 py-1 rounded-full border border-gold/40">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-dark text-gold-dark" />
                ))}
                <span className="text-xs font-serif font-black text-forest-950 ml-1">5.0</span>
              </div>
              <span className="text-[9px] font-sans text-stone-500 font-bold uppercase tracking-widest">
                {review.date}
              </span>
            </div>
          </div>

          {/* Bottom Interactive Roll Scrub Navigation */}
          <div className="flex items-center justify-between pt-4 mt-3 border-t border-[#F0EBE0] text-xs font-sans">
            {/* Note Folio Dots */}
            <div className="flex items-center gap-1.5">
              {GUEST_FEEDBACKS.map((f, i) => (
                <button
                  key={f.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleManualJump(i);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentIdx === i
                      ? 'w-7 h-2 bg-forest-950 ring-2 ring-gold shadow-sm'
                      : 'w-2 h-2 bg-stone-300 hover:bg-gold'
                  }`}
                  aria-label={`Jump to review ${i + 1}`}
                />
              ))}
            </div>

            {/* Manual Skip Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualJump((currentIdx - 1 + GUEST_FEEDBACKS.length) % GUEST_FEEDBACKS.length);
                }}
                className="p-1.5 rounded-full hover:bg-stone-200/70 text-forest-950 transition-colors"
                title="Previous feedback"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualJump((currentIdx + 1) % GUEST_FEEDBACKS.length);
                }}
                className="p-1.5 rounded-full hover:bg-stone-200/70 text-forest-950 transition-colors"
                title="Next feedback"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

