import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Music,
  Wine,
  Flame,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Check,
  Star,
} from 'lucide-react';
import { hotelInfo } from '../data/hotelInfo';
import { playClickSound } from '../utils/audioEffects';

const MALIBU_EVENTS = [
  {
    id: 'filmy-sat',
    type: 'Malibu Night',
    title: 'Filmy Shanivar',
    timing: 'Saturday • 7:00 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Blockbuster weekend celebration with trending film mixes, signature mixology, and vibrant rooftop energy overlooking the illuminated Gorakhpur skyline.',
    image: '/images/malibu/malibu-2.webp',
    perks: ['Bollywood & Global Club Hits', 'Signature Smoked Mixology', 'VIP Cabana Bottle Service'],
  },
  {
    id: 'golden-fri',
    type: 'Malibu Night',
    title: 'Golden Era Friday',
    timing: 'Friday • 7:00 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Nostalgic retro melodies, timeless Bollywood classics, and craft smoked bourbon flights at 84 meters elevation.',
    image: '/images/malibu/malibu-3.webp',
    perks: ['Classic Vinyl Melodies', 'Single Malt & Bourbon Flights', 'Gourmet Tapas Platters'],
  },
  {
    id: 'chill-thu',
    type: 'Malibu Night',
    title: 'Chill Out Thursday',
    timing: 'Thursday • 6:30 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Acoustic golden hour sessions, deep ambient lounge beats, and woodfired gourmet bites in private draped cabanas.',
    image: '/images/malibu/malibu-1.webp',
    perks: ['Live Acoustic Guitarist', 'Sunset Happy Hour Cocktails', 'Woodfired Truffle Pizzas'],
  },
  {
    id: 'ladies-night',
    type: 'Malibu Night',
    title: 'Ladies Night',
    timing: 'Wednesday • 7:00 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Complimentary artisanal cocktails for the ladies, neon glam aesthetics, and commercial dance grooves.',
    image: '/images/malibu/malibu-2.webp',
    perks: ['Complimentary Craft Sangria', 'Glam Photo Booth Studio', 'Commercial Dance Anthems'],
  },
  {
    id: 'throwback-tue',
    type: 'Malibu Night',
    title: 'Throwback Tuesday',
    timing: 'Tuesday • 6:30 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Old-school jams, RnB beats, and relaxed evening conversations overlooking Gorakhpur’s twinkling skyline.',
    image: '/images/malibu/malibu-3.webp',
    perks: ['90s & 2000s Nostalgia Tracks', 'Craft Beer Buckets', 'Comfort Bar Food Specials'],
  },
  {
    id: 'garba-groove',
    type: 'Radiant Day',
    title: 'Garba Groove',
    timing: 'Radiant Day Special • Festive Event',
    badge: 'RADIANT DAY',
    desc: 'Vibrant cultural celebration, rhythmic folk dhol beats, festive attire, and signature culinary spreads on our expansive rooftop lawn.',
    image: '/images/hotel/hotel-1.webp',
    perks: ['Live Folk Percussionists', 'Traditional Festive Cuisine', 'VIP Lawn Seating'],
  },
  {
    id: 'prince-jordan',
    type: 'Radiant Day',
    title: 'Prince Jordan Showcase',
    timing: 'Radiant Day Special • Live Concert',
    badge: 'RADIANT DAY',
    desc: 'Exclusive celebrity live vocal showcase, soulful acoustic melodies, and VIP outdoor lawn experience under open skies.',
    image: '/images/malibu/malibu-1.webp',
    perks: ['Celebrity Live Vocals', 'VIP Front Row Tables', 'Curated Chef Degustation'],
  },
  {
    id: 'aerial-act',
    type: 'Radiant Day',
    title: 'Aerial Silk Spectacle',
    timing: 'Radiant Day Special • Spectacle',
    badge: 'RADIANT DAY',
    desc: 'Breathtaking aerial acrobatics, gravity-defying silk choreography, and awe-inspiring resort entertainment at night.',
    image: '/images/malibu/malibu-2.webp',
    perks: ['Acrobatic Silk Performers', 'Champagne Welcome Flutes', 'Gourmet Midnight Buffet'],
  },
];

export default function MalibuPage({ onOpenBooking }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredEvents = MALIBU_EVENTS.filter((e) => {
    if (activeFilter === 'MALIBU NIGHT') return e.type === 'Malibu Night';
    if (activeFilter === 'RADIANT DAY') return e.type === 'Radiant Day';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0E1513] text-white font-sans selection:bg-gold selection:text-forest-950 overflow-x-hidden">
      {/* =========================================================================
          STICKY TOP NAVIGATION BAR
         ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#0B1614]/95 backdrop-blur-md border-b border-gold/30 shadow-md py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            onClick={() => playClickSound()}
            aria-label="Back"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-gold hover:text-forest-950 text-gold flex items-center justify-center transition-all border border-gold/40 shadow-sm hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <Link to="/" className="flex flex-col items-center select-none">
            <img
              src="/logo/logo.webp"
              alt="The Radiant Hotel & Resort"
              className="h-8 object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
            />
          </Link>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${hotelInfo.contact.phone}`}
              className="hidden md:flex items-center gap-1.5 text-xs font-sans font-black text-gold hover:text-gold-light tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>{hotelInfo.contact.phone}</span>
            </a>
            <button
              onClick={() => onOpenBooking && onOpenBooking({ name: 'Malibu VIP Cabana', price: '₹5,999' })}
              className="px-5 py-2 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all shadow-md"
            >
              Reserve Cabana
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO BANNER
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-black via-[#0E1513] to-[#0E1513] border-b border-gold/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.15),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold font-sans font-black text-[10px] sm:text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>84 METERS ELEVATION • SKYLINE LOUNGE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Malibu Rooftop Bar & Restaurant
          </h1>

          <p className="text-sm sm:text-base font-sans text-stone-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Perched atop The Radiant Hotel, Malibu is Gorakhpur's premier open-air nightlife, woodfired gastronomy, and celebration hotspot with private draped cabanas, ambient warming lamps, and panoramic sunset skyline beats.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-center">
            <div className="p-3 bg-black/60 rounded-2xl border border-gold/30 shadow-md">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold block">84M</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-400">Skyline Elevation</span>
            </div>
            <div className="p-3 bg-black/60 rounded-2xl border border-gold/30 shadow-md">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold block">09</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-400">Weekly Celebrations</span>
            </div>
            <div className="p-3 bg-black/60 rounded-2xl border border-gold/30 shadow-md">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold block">VIP</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-400">Private Cabanas</span>
            </div>
            <div className="p-3 bg-black/60 rounded-2xl border border-gold/30 shadow-md">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold block">6 PM</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-400">Sunset Onwards</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE 9 WEEKLY CELEBRATIONS & EVENTS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold block">
              Curated Entertainment Calendar
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase text-white">
              Weekly Celebration Nights & Festivals
            </h2>
          </div>

          {/* Event Filter Pills */}
          <div className="flex items-center gap-2">
            {['ALL', 'MALIBU NIGHT', 'RADIANT DAY'].map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => {
                  setActiveFilter(filterKey);
                  playClickSound();
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-black uppercase tracking-wider transition-all shadow-md ${
                  activeFilter === filterKey
                    ? 'bg-gold text-forest-950 font-black shadow-gold/30 border border-gold-light'
                    : 'bg-black/60 text-stone-300 hover:bg-black/80 border border-white/20'
                }`}
              >
                {filterKey === 'ALL' ? 'All Events (09)' : filterKey === 'MALIBU NIGHT' ? 'Malibu Nights (06)' : 'Radiant Days (03)'}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-black/60 rounded-3xl border border-white/15 overflow-hidden flex flex-col justify-between shadow-xl hover:border-gold/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 bg-forest-950/90 backdrop-blur-md px-3 py-1 rounded-full text-gold font-sans font-black text-[10px] uppercase tracking-wider border border-gold/40">
                    {evt.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-sans font-bold text-gold uppercase tracking-wider block">
                      {evt.timing}
                    </span>
                    <h3 className="text-xl font-serif font-black text-white">{evt.title}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs font-sans text-stone-300 leading-relaxed font-medium">
                    {evt.desc}
                  </p>

                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <p className="text-[10px] font-sans font-black uppercase tracking-wider text-gold">
                      Event Privileges:
                    </p>
                    <ul className="space-y-1">
                      {evt.perks.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-sans text-stone-200">
                          <Check className="w-3 h-3 text-gold shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() =>
                    onOpenBooking &&
                    onOpenBooking({ name: `Malibu: ${evt.title}`, price: '₹5,999' })
                  }
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Table for {evt.title}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          GASTRONOMY & MIXOLOGY HIGHLIGHTS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-black/80 via-[#0E1513] to-black/80 rounded-3xl border border-gold/30 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold block">
                Artisanal Rooftop Bar & Grill
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white">
                Craft Smoked Mixology & Woodfired Bites
              </h2>
              <p className="text-xs sm:text-sm font-sans text-stone-300 font-medium leading-relaxed">
                Every cocktail at Malibu is conceived with aromatic smoke infusions, handcrafted bitters, and single-estate spirits. Paired with blistered artisanal pizzas, charcoal skewers, and decadent desserts, Malibu defines luxury nightlife in eastern Uttar Pradesh.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <p className="text-xs font-serif font-black text-gold">Smoked Old Fashioned</p>
                  <p className="text-[11px] font-sans text-stone-400">Oak smoke, angostura bitters & bourbon</p>
                </div>
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <p className="text-xs font-serif font-black text-gold">Radiant Sunset Spritz</p>
                  <p className="text-[11px] font-sans text-stone-400">Prosecco, elderflower, citrus & rosemary</p>
                </div>
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <p className="text-xs font-serif font-black text-gold">Truffle Wild Mushroom Pizza</p>
                  <p className="text-[11px] font-sans text-stone-400">San Marzano tomatoes, fior di latte & truffle glaze</p>
                </div>
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <p className="text-xs font-serif font-black text-gold">Charcoal Malai Broccoli</p>
                  <p className="text-[11px] font-sans text-stone-400">Cream cheese marinade & roasted cardamom</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-gold/40 shadow-2xl relative">
                <img
                  src="/images/malibu/malibu-1.webp"
                  alt="Malibu Sky Cabana"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-xs font-serif font-black text-gold">THE SKY CABANA EXPERIENCE</span>
                  <p className="text-[10px] font-sans text-stone-300">Exclusive VIP booking with private host</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          GRAND RESORT FOOTER
         ========================================================================= */}
      <footer className="bg-black text-stone-400 py-12 border-t border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="text-lg font-serif font-black text-gold uppercase tracking-wider">
              Malibu at The Radiant
            </p>
            <p className="text-xs font-sans text-stone-400">
              Medical College Road, Gorakhpur • Daily 6:00 PM – 12:00 Midnight
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans font-black uppercase tracking-wider">
            <Link to="/" className="text-stone-300 hover:text-gold transition-colors">
              Home
            </Link>
            <Link to="/rooms" className="text-stone-300 hover:text-gold transition-colors">
              Rooms & Suites
            </Link>
            <Link to="/dining" className="text-stone-300 hover:text-gold transition-colors">
              Dining & Menus
            </Link>
            <Link to="/wellness" className="text-stone-300 hover:text-gold transition-colors">
              Salon & Spa
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

