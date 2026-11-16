import React from 'react';
import { Star, Quote, Feather } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';

// Curated authentic guest chronicles with paired suite photography
const CHRONICLES = [
  {
    id: 1,
    initials: 'AM',
    name: 'Aditya Mathur',
    city: 'New Delhi',
    suite: 'Grandeur Suite Stay',
    photoSrc: '/images/rooms/grandeur-room/grandeur-1.webp',
    photoCaption: 'Grandeur Suite • Private Pool Verandah',
    photoTilt: -3.5,
    rating: 5.0,
    date: 'Stayed October 2026',
    folio: 'FOLIO 01 / 05',
    highlight: 'Presidential Tier Luxury',
    quote:
      'The Grandeur Suite rivalled any presidential suite in Udaipur. Flawless dignity, Statuario marble bath, and private sunset verandah overlooking the Vedic gardens.',
    bg: [244, 236, 228], // Soft Warm Peach Bisque
  },
  {
    id: 2,
    initials: 'SK',
    name: 'Dr. Shalini Kapoor',
    city: 'Lucknow',
    suite: 'Vedic Spa & Wellness',
    photoSrc: '/images/wellness/wellness-card.webp',
    photoCaption: 'Vedic Spa • Authentic Ayurvedic Lineage',
    photoTilt: 3.0,
    rating: 5.0,
    date: 'Stayed November 2026',
    folio: 'FOLIO 02 / 05',
    highlight: 'Authentic Ayurvedic Lineage',
    quote:
      'The Vedic Spa therapists are truly trained in authentic Ayurvedic lineage. The warm herbal Dhanwantari oils and serene morning courtyard made our stay unforgettable.',
    bg: [233, 238, 230], // Soft Morning Dew Sage
  },
  {
    id: 3,
    initials: 'VS',
    name: 'Vikramaditya Singhania',
    city: 'Mumbai',
    suite: 'Malibu Sky Cabana',
    photoSrc: '/images/malibu/malibu-1.webp',
    photoCaption: 'Malibu Sky • 84M Sunset Gastronomy Beats',
    photoTilt: -2.8,
    rating: 5.0,
    date: 'Stayed September 2026',
    folio: 'FOLIO 03 / 05',
    highlight: 'Rooftop Gastronomy Hotspot',
    quote:
      'Gorakhpur has never witnessed rooftop dining at this calibre. The woodfired gastronomy, craft smoked bourbon flights, and sunset skyline beats at 84 meters are pure world-class theatre.',
    bg: [242, 233, 230], // Soft Twilight Blush Rose
  },
  {
    id: 4,
    initials: 'RD',
    name: 'Ananya & Rohan Desai',
    city: 'Bengaluru',
    suite: 'Deluxe Suite Sanctuary',
    photoSrc: '/images/rooms/deluxe-suite/deluxe-suite-1.webp',
    photoCaption: 'Deluxe Suite • Quiet Acoustic Haven',
    photoTilt: 3.2,
    rating: 5.0,
    date: 'Stayed August 2026',
    folio: 'FOLIO 04 / 05',
    highlight: 'Quiet Acoustic Sanctuary',
    quote:
      'A masterclass in quiet luxury. Soundproofing was absolute silence, the royal butler service was anticipating every detail, and the breakfast spread at The Seven Scentric was magnificent.',
    bg: [245, 239, 230], // Soft Cashmere Linen
  },
  {
    id: 5,
    initials: 'RB',
    name: 'Col. R.K. Bhargava (Retd.)',
    city: 'Dehradun',
    suite: 'Executive Suite Room',
    photoSrc: '/images/rooms/executive-suite/executive-suite-1.webp',
    photoCaption: 'Executive Suite • Teak Study Sanctuary',
    photoTilt: -3.0,
    rating: 5.0,
    date: 'Stayed July 2026',
    folio: 'FOLIO 05 / 05',
    highlight: 'Executive Refinement & Calm',
    quote:
      'Old-world hospitality paired with razor-sharp modern efficiency. Solid teak work sanctuary, high-speed connectivity, and Gorakhpur’s most dignified address.',
    bg: [244, 239, 226], // Soft Golden Alabaster
  },
];

export default function ScrollChroniclesSection({
  globalProgress,
  onScrubProgress,
  onOpenBooking,
  baseProgress = 10.0,
}) {
  // voicesProgress maps from 0.0 (at globalProgress baseProgress) to 4.0 (at globalProgress baseProgress + 4.0)
  const rawProgress = Math.max(0, Math.min(4, globalProgress - baseProgress));
  const currentFloor = Math.min(4, Math.floor(rawProgress));
  const nextFloor = Math.min(4, currentFloor + 1);
  const fraction = rawProgress - currentFloor;

  // Soft Background Color Interpolation (Subtle, relaxing, warm pastel hues like the reference video)
  const c1 = CHRONICLES[currentFloor].bg;
  const c2 = CHRONICLES[nextFloor].bg;
  const bgR = Math.round(c1[0] + (c2[0] - c1[0]) * fraction);
  const bgG = Math.round(c1[1] + (c2[1] - c1[1]) * fraction);
  const bgB = Math.round(c1[2] + (c2[2] - c1[2]) * fraction);
  const softBg = `rgb(${bgR}, ${bgG}, ${bgB})`;

  const handleStep = (direction) => {
    const nextVal = Math.max(0, Math.min(4, Math.round(rawProgress) + direction));
    onScrubProgress(baseProgress + nextVal);
    playClickSound();
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12 transition-colors duration-500 ease-out text-forest-950 overflow-hidden"
      style={{ backgroundColor: softBg }}
    >
      {/* 
        =============================================================================
        AMBIENT RESORT & TRAVEL VIDEO OVERLAY BACKGROUND
        Transparent WebM animation looping in the background behind chronicles & cards
        =============================================================================
      */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <video
          src="/videos/hotel-travel-transparent-overlay.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain sm:object-cover max-w-[1720px] opacity-40 select-none pointer-events-none transition-opacity duration-500"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1720px] px-3 sm:px-6 lg:px-10 mx-auto h-full flex flex-col justify-between pt-16 sm:pt-16 pb-2 sm:pb-3">
        {/* 
          =============================================================================
          MAIN CHRONICLES CONTENT GRID (2 COLUMNS: FIXED STORY HEADLINE & DYNAMIC CARDS)
          =============================================================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center my-auto">
          {/* 
            -------------------------------------------------------------------------
            LEFT COLUMN: Pinned Story Title & Digest
            -------------------------------------------------------------------------
          */}
          <div className="lg:col-span-5 space-y-3">
            <div className="space-y-2 sm:space-y-2.5 bg-white/60 backdrop-blur-md p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <span className="text-[10px] sm:text-[11px] font-sans font-black uppercase tracking-[0.25em] text-gold-dark block">
                Official Guest Chronicles • Stage 06
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight">
                Don't Just Take <br />
                <span className="text-gold-dark italic font-normal">Our Word For It</span>
              </h3>
              <p className="text-xs sm:text-sm font-sans text-stone-600 font-medium leading-relaxed pt-0.5 max-w-md">
                Unfiltered reflections from those who walked the marble halls and tasted serenity.
              </p>
            </div>
          </div>

          {/* 
            -------------------------------------------------------------------------
            RIGHT COLUMN: Dual Floating Polaroid Photo + Overlapping Stationery Note
            Both change smoothly in unison with the scroll!
            -------------------------------------------------------------------------
          */}
          <div className="lg:col-span-7 relative min-h-[310px] sm:min-h-[350px] lg:min-h-[380px] flex items-center justify-center">
            {CHRONICLES.map((item, idx) => {
              // Continuous scroll delta: 0 means this story is active
              const delta = rawProgress - idx;
              const absDelta = Math.abs(delta);

              // Don't render far off cards
              if (absDelta > 1.3) return null;

              // Dwell zone where photo and note stay firmly together on screen
              const DWELL = 0.26;
              const isCentered = absDelta <= DWELL;

              let photoX = 0;
              let photoY = 0;
              let photoRotate = item.photoTilt;
              let photoScale = 1.0;

              let noteX = 0;
              let noteY = 0;
              let noteRotate = 2.0;
              let noteScale = 1.0;

              let opacity = 1.0;

              if (absDelta <= DWELL) {
                // RESTING TOGETHER: perfectly locked together in the center for reading
                opacity = 1.0;
                photoX = 0;
                photoY = 0;
                photoRotate = item.photoTilt;
                photoScale = 1.0;

                noteX = 0;
                noteY = 0;
                noteRotate = 2.0;
                noteScale = 1.0;
              } else if (delta < -DWELL) {
                // ENTERING: Photo sweeps in from bottom-left; Note sweeps in from bottom-right
                const t = Math.min(1.0, (-delta - DWELL) / (1.0 - DWELL));
                const easeT = t * t * (3 - 2 * t); // smooth cubic ease

                // Photo from bottom-left (-340px, +170px)
                photoX = -340 * easeT;
                photoY = 170 * easeT;
                photoRotate = item.photoTilt - 15 * easeT;
                photoScale = 1.0 - 0.16 * easeT;

                // Note from bottom-right (+360px, +190px)
                noteX = 360 * easeT;
                noteY = 190 * easeT;
                noteRotate = 2.0 + 17 * easeT;
                noteScale = 1.0 - 0.16 * easeT;

                opacity = Math.max(0, 1.0 - easeT * 1.25);
              } else {
                // EXITING: Photo flies off to top-left; Note flies off to top-right
                const t = Math.min(1.0, (delta - DWELL) / (1.0 - DWELL));
                const easeT = t * t * (3 - 2 * t);

                // Photo off to top-left (-360px, -220px)
                photoX = -360 * easeT;
                photoY = -220 * easeT;
                photoRotate = item.photoTilt - 22 * easeT;
                photoScale = 1.0 - 0.18 * easeT;

                // Note off to top-right (+380px, -200px)
                noteX = 380 * easeT;
                noteY = -200 * easeT;
                noteRotate = 2.0 + 20 * easeT;
                noteScale = 1.0 - 0.18 * easeT;

                opacity = Math.max(0, 1.0 - easeT * 1.25);
              }

              return (
                <div
                  key={item.id}
                  onClick={() => handleStep(1)}
                  className={`absolute inset-0 flex items-center justify-center cursor-pointer select-none transition-opacity ${
                    isCentered ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
                  }`}
                  style={{
                    opacity,
                    perspective: '1200px',
                  }}
                >
                  <div className="relative w-full max-w-xl lg:max-w-2xl flex flex-col sm:flex-row items-center justify-center">
                    {/* 
                      ---------------------------------------------------------------
                      1. POLAROID PHOTO CARD (Framed resort photo matching feedback)
                      ---------------------------------------------------------------
                    */}
                    <div
                      className="relative w-[72%] sm:w-[46%] bg-white p-2 sm:p-2.5 pb-3 sm:pb-4 rounded-2xl shadow-[0_22px_45px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] border border-stone-200/90 will-change-transform z-10"
                      style={{
                        transform: `translate3d(${photoX}px, ${photoY}px, 0px) rotate(${photoRotate}deg) scale(${photoScale})`,
                        transition: 'box-shadow 300ms ease',
                      }}
                    >
                      {/* Photo Container */}
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 shadow-inner">
                        <img
                          src={item.photoSrc}
                          alt={item.photoCaption}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-forest-950/85 text-gold text-[8px] sm:text-[9px] font-sans font-bold tracking-wider uppercase backdrop-blur-sm">
                          Resort Frame
                        </div>
                      </div>

                      {/* Handwritten Polaroid Caption */}
                      <p className="mt-1.5 sm:mt-2 font-serif italic text-stone-700 text-xs sm:text-sm text-center tracking-wide px-2 truncate">
                        "{item.photoCaption}"
                      </p>
                    </div>

                    {/* 
                      ---------------------------------------------------------------
                      2. OVERLAPPING LUXURY NOTES CARD (Soft parchment with quote)
                      ---------------------------------------------------------------
                    */}
                    <div
                      className="relative w-[84%] sm:w-[54%] -mt-8 sm:-mt-0 sm:-ml-8 rounded-2xl sm:rounded-3xl bg-[#FAF7F0] border-2 border-[#E2D7C3] shadow-[0_25px_50px_rgba(0,0,0,0.14)] p-3 sm:p-4 lg:p-4.5 space-y-1.5 sm:space-y-2 will-change-transform z-20"
                      style={{
                        transform: `translate3d(${noteX}px, ${noteY}px, 25px) rotate(${noteRotate}deg) scale(${noteScale})`,
                      }}
                    >
                      {/* Card Inset Border */}
                      <div className="absolute inset-2 sm:inset-2.5 rounded-2xl border border-[#DFD4C0] pointer-events-none" />

                      {/* Header: Folio & Feather Stamp */}
                      <div className="relative z-10 flex items-center justify-between border-b border-[#E8DEC8] pb-1.5 sm:pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#18241E] text-gold flex items-center justify-center shadow-sm">
                            <Feather className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="text-[9px] sm:text-[10px] font-sans font-black tracking-wider text-forest-950 uppercase whitespace-nowrap block">
                              {item.folio}
                            </span>
                            <span className="text-[8px] font-sans text-stone-500 uppercase tracking-widest block font-bold whitespace-nowrap">
                              Verified Guest
                            </span>
                          </div>
                        </div>

                        {/* Category Highlight Tag */}
                        <div className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#EFE8D8] border border-[#D5C7B0] text-forest-950 text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-wider whitespace-nowrap">
                          {item.highlight}
                        </div>
                      </div>

                      {/* Quote Body with Subtle Watermark */}
                      <div className="relative z-10 my-auto py-0.5">
                        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-gold/25 absolute -top-2 -left-1 pointer-events-none" />
                        <p className="relative z-10 text-xs sm:text-sm font-serif text-forest-950 italic font-medium leading-relaxed line-clamp-3 sm:line-clamp-4">
                          "{item.quote}"
                        </p>
                      </div>

                      {/* Footer: Guest Profile & 5 Gold Stars */}
                      <div className="relative z-10 pt-1.5 sm:pt-2 border-t border-[#E8DEC8] flex items-center justify-between">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-forest-950 text-gold flex items-center justify-center font-black font-sans text-[10px] sm:text-xs shadow-md">
                            {item.initials}
                          </div>
                          <div>
                            <p className="font-serif font-black text-xs sm:text-sm text-forest-950 leading-tight">
                              {item.name}
                            </p>
                            <p className="text-[8px] sm:text-[9px] font-sans text-gold-dark font-black uppercase tracking-wider">
                              {item.city} • <span className="text-stone-600 font-semibold">{item.suite}</span>
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-0.5 bg-gold/20 px-2 py-0.5 rounded-full border border-gold/40">
                            {[...Array(5)].map((_, starI) => (
                              <Star key={starI} className="w-3 h-3 fill-gold-dark text-gold-dark" />
                            ))}
                            <span className="text-[11px] font-sans font-black text-forest-950 ml-1">5.0</span>
                          </div>
                          <span className="text-[9px] font-sans text-stone-500 font-bold block mt-0.5">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
