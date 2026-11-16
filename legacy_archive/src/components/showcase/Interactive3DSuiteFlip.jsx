import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Check, Sparkles, ArrowRight, BedDouble, Maximize2, Shield, Compass, Key } from 'lucide-react';
import confetti from 'canvas-confetti';

const SUITES = [
  {
    id: 'grandeur',
    name: 'Grandeur Suite',
    tagline: 'The Pinnacle of Regal Hospitality',
    frontImage: '/images/rooms/grandeur-1.webp',
    price: '₹11,499',
    period: 'per night',
    size: '850 sq. ft',
    capacity: 'Up to 3 Guests',
    view: 'Panoramic Resort Facade & Pool',
    badge: 'PRESIDENTIAL TIER',
    frontHighlights: [
      'Private Master Bedroom & Powder Lounge',
      'Italian Statuario Marble Jacuzzi Bath',
      'Complimentary Malibu Sky High-Tea',
      '24/7 Dedicated Royal Butler Service',
    ],
    backSpecs: [
      { label: 'Bedding', val: 'Emperor Royal King (10-inch memory foam)' },
      { label: 'Bathroom', val: 'Double Vanity + Rain Shower + Jacuzzi' },
      { label: 'Balcony', val: 'Private 120 sq.ft Sunlit Verandah' },
      { label: 'Bar & Cellar', val: 'Complimentary Curated Artisan Mini-Bar' },
      { label: 'Technology', val: '65" OLED TV + Bowers & Wilkins Audio' },
      { label: 'Connectivity', val: 'High-Speed Wi-Fi 6 + EV Charging Valet' },
    ],
    secretNote: 'Handcrafted rosewood furnishings, bespoke silk drapery, and private express elevator access.',
  },
  {
    id: 'deluxe-suite',
    name: 'Deluxe Suite Room',
    tagline: 'Serene Sanctuary with Architectural Elegance',
    frontImage: '/images/rooms/deluxe-suite-1.webp',
    price: '₹8,999',
    period: 'per night',
    size: '620 sq. ft',
    capacity: '2 Guests',
    view: 'Courtyard & Vedic Gardens',
    badge: 'SIGNATURE SANCTUARY',
    frontHighlights: [
      'Dual-Zone Living & Sleeping Quarter',
      'Oversized Soaking Tub with Forest Scents',
      'Artisanal Coffee & Tea Bar Selection',
      'Priority Seating at The Seven Scentric',
    ],
    backSpecs: [
      { label: 'Bedding', val: 'Luxury King Bed with Goose Down Pillows' },
      { label: 'Bathroom', val: 'Glazed Walk-in Rain Shower & Heated Towels' },
      { label: 'Balcony', val: 'Courtyard-Facing Juliette Balcony' },
      { label: 'Refreshment', val: 'Daily Gourmet Snack Basket & Spring Water' },
      { label: 'Wellness', val: '20% Privilege on Vedic Spa Therapies' },
      { label: 'Check-In', val: 'In-Suite Express Check-In & Welcome Drink' },
    ],
    secretNote: 'Tailored for couples seeking undisturbed quietude and lush courtyard morning light.',
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite Room',
    tagline: 'Executive Refinement & Impeccable Comfort',
    frontImage: '/images/rooms/executive-suite-1.webp',
    price: '₹7,499',
    period: 'per night',
    size: '550 sq. ft',
    capacity: '2 Guests',
    view: 'City & Medical College Road Vista',
    badge: 'EXECUTIVE CLASS',
    frontHighlights: [
      'Dedicated Ergonomic Work Sanctuary',
      'Soundproof Triple-Glazed Acoustic Paneling',
      'Complimentary Pressing & Valet Care',
      'Late Check-out until 2:00 PM Subject to Avail.',
    ],
    backSpecs: [
      { label: 'Bedding', val: 'Orthopedic Hybrid King Mattress' },
      { label: 'Workspace', val: 'Solid Teak Desk with Universal Port Array' },
      { label: 'Lounge', val: 'Leather Recliner & Soft Reading Sconce' },
      { label: 'Breakfast', val: 'Inclusive Multi-Cuisine Buffet for Two' },
      { label: 'Transport', val: 'Complimentary Gorakhpur Station Transfer' },
      { label: 'Safe', val: 'Laptop-Sized Digital Biometric Safe' },
    ],
    secretNote: 'Designed for business dignitaries and travelers requiring seamless productivity and calm.',
  },
  {
    id: 'malibu-cabana',
    name: 'Malibu Sky Cabana',
    tagline: 'Vibrant Sunset Lounging Above the Clouds',
    frontImage: '/images/malibu/malibu-1.webp',
    price: '₹5,999',
    period: 'per booking',
    size: '420 sq. ft',
    capacity: 'Up to 6 Guests',
    view: 'Rooftop 360° Sunset Skyline',
    badge: 'ROOFTOP EXCLUSIVE',
    frontHighlights: [
      'Private Curtained Rooftop Cabana Booth',
      'Dedicated Mixologist & Tapas Service',
      'Sunset DJ Set & Neon Ambient Lighting',
      'Artisanal Cocktail Flight Included',
    ],
    backSpecs: [
      { label: 'Experience', val: 'Sunset Twilight (5:30 PM – 11:30 PM)' },
      { label: 'Gastronomy', val: 'Woodfired Gourmet Bites & Dim Sum' },
      { label: 'Mixology', val: 'Craft Smoked Bourbon & Floral Cocktails' },
      { label: 'Seating', val: 'Plush Velvet Modular Daybed Loungers' },
      { label: 'Entertainment', val: 'Acoustic Soul & Deep House Residencies' },
      { label: 'Photography', val: 'Golden Hour Private Skyline Backdrop' },
    ],
    secretNote: 'The most coveted sunset hotspot in Eastern UP. Advance reservation strictly recommended.',
  },
];

export default function Interactive3DSuiteFlip({ onOpenBooking }) {
  const [selectedSuiteIndex, setSelectedSuiteIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotateRef = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const suite = SUITES[selectedSuiteIndex];

  // Mouse move tilt effect when not dragged
  const handleMouseMove = (e) => {
    if (isDragging) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 14;
    const rotY = (x / (rect.width / 2)) * 14;
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    setRotate({ x: 0, y: 0 });
  };

  // Drag interaction to spin in 3D
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    rotateRef.current = { ...rotate };
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      rotateRef.current = { ...rotate };
    }
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX === undefined) return;

      const deltaX = clientX - dragStartRef.current.x;
      const deltaY = clientY - dragStartRef.current.y;

      setRotate({
        x: Math.max(-35, Math.min(35, rotateRef.current.x - deltaY * 0.2)),
        y: rotateRef.current.y + deltaX * 0.35,
      });
    };

    const handleUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleReserveClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B69A70', '#EAE5D9', '#172D29', '#FFFFFF'],
    });
    if (onOpenBooking) onOpenBooking(suite);
  };

  return (
    <section id="interactive-3d-showcase" className="relative py-28 px-4 bg-white text-charcoal overflow-hidden select-none">
      {/* Background Ambience & Distressed Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-serif font-black uppercase tracking-widest text-stone-200/50 pointer-events-none select-none z-0">
        3D SUITES
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold tracking-[0.25em] uppercase font-sans mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            Henrietta-Inspired 3D Pack Flip
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold uppercase tracking-tight text-forest-950">
            Inspect Sanctuary in <span className="text-gold-dark italic font-normal">Full 3D Depth</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal/70 font-sans max-w-xl mx-auto">
            Interact with our 3D room passport. Drag to inspect angle reflections, then flip 180° to review the confidential blueprint and royal butler amenities.
          </p>

          {/* Suite Category Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {SUITES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedSuiteIndex(idx);
                  setIsFlipped(false);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wider uppercase transition-all duration-300 font-medium ${
                  selectedSuiteIndex === idx
                    ? 'bg-forest-950 text-gold font-bold shadow-[0_4px_20px_rgba(23,45,41,0.25)] scale-105'
                    : 'bg-stone-100 text-charcoal/80 hover:text-forest-950 border border-stone-200 hover:border-gold'
                }`}
                data-cursor={item.name}
                data-cursor-variant="hover"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* The 3D Pack / Card Stage */}
        <div className="relative flex flex-col items-center justify-center min-h-[580px] perspective-2000">
          {/* Main Flipping 3D Element */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] h-[540px] sm:h-[580px] relative preserve-3d transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing will-change-transform"
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y + (isFlipped ? 180 : 0)}deg)`,
            }}
            data-cursor={isFlipped ? 'FLIP FRONT' : 'FLIP BACK'}
            data-cursor-variant="flip"
          >
            {/* FRONT SIDE (3D Pack Front Presentation) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-forest-950 border-2 border-gold/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backface-hidden flex flex-col justify-between p-6">
              {/* Dynamic Specular Sheen (mimics light glancing across 3D pouch) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-40 mix-blend-overlay"
                style={{
                  background: `linear-gradient(${115 + rotate.y * 1.5}deg, rgba(255,255,255,0.7) 0%, transparent 60%)`,
                }}
              />

              {/* Top Bar of Front */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-[10px] font-extrabold tracking-widest uppercase font-sans">
                  {suite.badge}
                </span>
                <div className="flex items-center gap-1.5 text-gold text-xs font-serif italic">
                  <Key className="w-3.5 h-3.5" />
                  <span>Passport No. {selectedSuiteIndex + 1}0{selectedSuiteIndex + 4}</span>
                </div>
              </div>

              {/* Main Suite Artwork / Photography */}
              <div className="relative z-10 my-auto rounded-2xl overflow-hidden border border-gold/30 shadow-2xl h-56 group">
                <img
                  src={suite.frontImage}
                  alt={suite.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-gold font-sans font-bold">Sanctuary</p>
                    <h3 className="text-xl font-serif font-bold text-ivory">{suite.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-serif font-bold text-gold">{suite.price}</p>
                    <p className="text-[10px] text-ivory/70 font-sans">{suite.period}</p>
                  </div>
                </div>
              </div>

              {/* Front Key Metrics */}
              <div className="relative z-10 grid grid-cols-3 gap-2 py-3 border-y border-gold/20 text-center my-2">
                <div>
                  <p className="text-[9px] tracking-widest text-gold/80 uppercase font-sans">Scale</p>
                  <p className="text-xs font-serif font-medium text-ivory">{suite.size}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-widest text-gold/80 uppercase font-sans">Guests</p>
                  <p className="text-xs font-serif font-medium text-ivory">{suite.capacity}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-widest text-gold/80 uppercase font-sans">Perspective</p>
                  <p className="text-xs font-serif font-medium text-ivory truncate">{suite.view.split(' ')[0]}</p>
                </div>
              </div>

              {/* Front Bullet Highlights */}
              <ul className="relative z-10 space-y-1 text-xs text-ivory/85 font-sans mb-3">
                {suite.frontHighlights.slice(0, 3).map((hl, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="truncate">{hl}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom Flip Action CTA */}
              <div className="relative z-10 pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={toggleFlip}
                  className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-wider uppercase text-gold hover:text-gold-light transition-colors py-2 px-3 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/30"
                >
                  <RotateCw className="w-3.5 h-3.5 animate-spin [animation-duration:10s]" />
                  Flip to Blueprint & Specs
                </button>
                <span className="text-[10px] tracking-widest text-ivory/50 uppercase font-sans">
                  Drag 360°
                </span>
              </div>
            </div>

            {/* BACK SIDE (Confidential Butler Blueprint & Specs) */}
            <div
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-forest-900 border-2 border-gold/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backface-hidden flex flex-col justify-between p-6"
              style={{
                transform: 'rotateY(180deg)',
              }}
            >
              {/* Top Blueprint Banner */}
              <div className="flex items-center justify-between border-b border-gold/30 pb-3">
                <div>
                  <span className="text-[9px] font-sans tracking-[0.25em] text-gold uppercase font-bold">
                    ARCHITECTURAL BLUEPRINT
                  </span>
                  <h4 className="text-lg font-serif font-bold text-ivory">
                    {suite.name} Specifications
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold border border-gold/30">
                  <Compass className="w-4 h-4" />
                </div>
              </div>

              {/* Blueprint Grid / Spec Table (Like Henrietta's Nutrition Table) */}
              <div className="my-auto space-y-2 py-3 bg-forest-950/70 rounded-2xl p-4 border border-gold/20">
                <div className="flex items-center justify-between text-[11px] font-sans border-b border-gold/20 pb-1.5 font-bold text-gold uppercase tracking-wider">
                  <span>Sanctuary Parameter</span>
                  <span>Specification</span>
                </div>
                {suite.backSpecs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px] font-sans py-1 border-b border-white/5">
                    <span className="text-ivory/70">{spec.label}</span>
                    <span className="text-ivory font-medium text-right ml-2">{spec.val}</span>
                  </div>
                ))}
              </div>

              {/* Secret Butler Lore / Sassy Brand Note */}
              <div className="p-3 rounded-xl bg-gold/10 border border-gold/25 my-1">
                <p className="text-[10px] text-gold uppercase tracking-widest font-bold font-sans flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-gold" /> Confidential Butler Note:
                </p>
                <p className="text-[11px] font-serif italic text-ivory/90 mt-0.5">
                  "{suite.secretNote}"
                </p>
              </div>

              {/* Bottom Actions of Back */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleFlip}
                  className="px-3 py-2 rounded-xl bg-forest-950 border border-gold/30 text-gold hover:text-ivory text-xs font-sans tracking-wider uppercase transition-colors"
                >
                  Front
                </button>
                <button
                  type="button"
                  onClick={handleReserveClick}
                  className="flex-1 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-forest-950 font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(182,154,112,0.4)] flex items-center justify-center gap-2"
                >
                  Reserve {suite.name.split(' ')[0]}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic 3D Ground Shadow */}
          <div
            className="w-72 sm:w-80 h-8 rounded-full bg-stone-900/25 blur-xl mt-6 transition-all duration-300"
            style={{
              transform: `scale(${1 - Math.abs(rotate.x) * 0.01}) scaleX(${1 + Math.abs(rotate.y) * 0.005})`,
              opacity: 0.8,
            }}
          />

          {/* Manual Flip Toggle Button Below */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={toggleFlip}
              className="px-6 py-2.5 rounded-full bg-forest-950 hover:bg-forest-900 text-gold border border-gold/40 hover:border-gold font-sans font-semibold text-xs tracking-[0.2em] uppercase transition-all flex items-center gap-2 shadow-xl"
              data-cursor="CLICK FLIP"
              data-cursor-variant="flip"
            >
              <RotateCw className="w-4 h-4 text-gold" />
              {isFlipped ? 'Flip to Front View' : 'Flip to Butler Blueprint'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

