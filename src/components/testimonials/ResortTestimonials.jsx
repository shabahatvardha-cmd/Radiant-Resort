import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    initials: 'AM',
    name: 'Aditya Mathur',
    location: 'New Delhi',
    stayed: 'Grandeur Suite',
    rating: 5,
    title: 'An Architectural Marvel in Eastern UP',
    comment:
      'The Grandeur Suite rivalled any presidential suite in Udaipur or Jaipur. From the private balcony sunset over the pool to the personalized butler handling our itinerary, it was flawless dignity.',
  },
  {
    id: 2,
    initials: 'SK',
    name: 'Dr. Shalini Kapoor',
    location: 'Lucknow',
    stayed: 'Deluxe Suite & Vedic Spa',
    rating: 5,
    title: 'Holistic Vedic Healing at its Finest',
    comment:
      'The Vedic Spa therapists are truly trained in authentic Ayurvedic lineage. The warm herbal oils and tranquil courtyard ambience made our anniversary retreat unforgettable.',
  },
  {
    id: 3,
    initials: 'RS',
    name: 'Rohan Singhania',
    location: 'Mumbai',
    stayed: 'Malibu Rooftop Cabana',
    rating: 5,
    title: 'The Malibu Rooftop Sets a New Benchmark',
    comment:
      'Did not expect a world-class sky lounge with craft smoked cocktails and sunset cabanas in Gorakhpur. The ambiance, acoustics, and woodfired gastronomy were 10/10.',
  },
];

export default function ResortTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => (i === 0 ? REVIEWS.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === REVIEWS.length - 1 ? 0 : i + 1));

  const current = REVIEWS[activeIdx];

  return (
    <section className="py-24 px-4 bg-stone-50 text-charcoal select-none relative overflow-hidden border-t border-stone-200">
      {/* Background Subtle Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-black uppercase text-stone-200/60 pointer-events-none select-none">
        VOICES
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Henrietta-Style Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-sans font-bold tracking-[0.25em] uppercase mb-4">
          <Award className="w-3.5 h-3.5 text-gold-dark" />
          Testimonial Proof
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold uppercase tracking-tight text-forest-950">
          Don't Just Take <span className="text-gold-dark italic font-normal">Our Word For It</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-charcoal/70 font-sans max-w-md mx-auto">
          Read verified accounts from dignitaries, travelers, and guests who experienced our sanctuaries.
        </p>

        {/* The Polaroid / Review Card */}
        <div className="mt-12 relative max-w-2xl mx-auto">
          <div
            className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-stone-200 shadow-[0_20px_50px_rgba(23,45,41,0.12)] text-left relative transition-all duration-500"
            data-cursor="TESTIMONIAL"
            data-cursor-variant="hover"
          >
            {/* Top Badge & Rating */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-forest-950 text-gold flex items-center justify-center font-sans font-black text-sm tracking-wider shadow-md">
                  {current.initials}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-forest-950">{current.name}</h4>
                  <p className="text-xs font-sans text-gold-dark tracking-wider uppercase font-semibold">
                    {current.location} • {current.stayed}
                  </p>
                </div>
              </div>

              {/* 5-Star Rating Pill */}
              <div className="flex items-center gap-1 bg-gold/20 px-3 py-1 rounded-full border border-gold/40">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-dark text-gold-dark" />
                ))}
                <span className="text-xs font-sans font-bold text-forest-950 ml-1">5.0</span>
              </div>
            </div>

            {/* Quote Body */}
            <div className="relative">
              <Quote className="w-8 h-8 text-gold/25 absolute -top-4 -left-2 pointer-events-none" />
              <h5 className="font-serif font-bold text-xl text-forest-950 mb-2 relative z-10">
                "{current.title}"
              </h5>
              <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed font-light relative z-10">
                {current.comment}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-stone-300 hover:border-forest-950 text-forest-950 hover:bg-forest-950 hover:text-gold flex items-center justify-center transition-colors shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIdx === i ? 'w-8 bg-forest-950' : 'w-2 bg-stone-300'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-stone-300 hover:border-forest-950 text-forest-950 hover:bg-forest-950 hover:text-gold flex items-center justify-center transition-colors shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

