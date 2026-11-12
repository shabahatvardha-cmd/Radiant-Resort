import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Heart,
  Flower2,
  Clock,
  Check,
  Calendar,
  Phone,
  ShieldCheck,
  Feather,
} from 'lucide-react';
import { hotelInfo } from '../data/hotelInfo';
import { wellnessData } from '../data/wellnessData';
import { playClickSound } from '../utils/audioEffects';

const SPA_CATEGORIES = [
  'All Treatments',
  'Ayurvedic Rituals',
  'Deep Tissue Massages',
  'Radiant Salon & Hair',
  'Bridal & Grooming',
];

const TREATMENTS = [
  {
    id: 't1',
    category: 'Ayurvedic Rituals',
    name: 'Royal Abhyanga Herbal Therapy',
    duration: '60 Min / 90 Min',
    price: '₹2,999',
    oils: 'Warm Medicated Dhanwantari Sesame Oil',
    desc: 'Traditional full-body synchronized massage with warm dosha-specific medicated herbal oils. Promotes lymphatic drainage, melts arterial tension, and balances vital energies.',
  },
  {
    id: 't2',
    category: 'Ayurvedic Rituals',
    name: 'Shirodhara Sensory Calm',
    duration: '60 Min',
    price: '₹3,499',
    oils: 'Warm Brahmi & Ksheerabala Botanical Infusion',
    desc: 'A continuous, soothing stream of warm herbal oil poured rhythmically over the forehead (ajna third-eye center). Dissolves mental stress, chronic fatigue, and induces deep meditative sleep.',
  },
  {
    id: 't3',
    category: 'Deep Tissue Massages',
    name: 'Vedic Deep Tissue Muscle Release',
    duration: '60 Min / 90 Min',
    price: '₹3,299',
    oils: 'Mahanarayan Camphorated Herbal Balm',
    desc: 'Targeted deep structural muscle therapy combining trigger-point releases with restorative Ayurvedic strokes. Ideal for recovering from long travel or intense physical training.',
  },
  {
    id: 't4',
    category: 'Deep Tissue Massages',
    name: 'Hot Basalt Stone Harmony',
    duration: '75 Min',
    price: '₹3,699',
    oils: 'Organic Sandalwood & Cedarwood Extract',
    desc: 'Smooth volcanic basalt stones heated to therapeutic temperature, placed along meridian spinal points and used to glide deeply into stiff muscular layers.',
  },
  {
    id: 't5',
    category: 'Radiant Salon & Hair',
    name: 'Moroccan Argan Hair Spa & Scalp Detox',
    duration: '60 Min',
    price: '₹2,199',
    oils: 'Cold-Pressed Organic Argan & Tea Tree',
    desc: 'Intensive nourishing hair therapy including clarifying scalp massage, steam infusion, custom micro-protein mask, and professional botanical blow-dry styling.',
  },
  {
    id: 't6',
    category: 'Bridal & Grooming',
    name: 'Royal Saffron Radiance Facial',
    duration: '75 Min',
    price: '₹2,799',
    oils: 'Pure Kashmiri Kumkumadi Tailam & Saffron Caviar',
    desc: 'Ancient bridal illumination facial utilizing pure saffron, turmeric extracts, and cooling sandalwood compress for luminous, glass-like facial radiance.',
  },
];

export default function WellnessSpaPage({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All Treatments');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const SPA_IMAGES = [
    '/images/wellness/wellness-1.png',
    '/images/wellness/wellness-2.png',
    '/images/wellness/wellness-3.png',
  ];

  const filteredTreatments = TREATMENTS.filter((t) => {
    if (activeCategory === 'All Treatments') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-forest-950 font-sans selection:bg-gold selection:text-forest-950 overflow-x-hidden">
      {/* =========================================================================
          STICKY TOP NAVIGATION BAR
         ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-gold hover:text-forest-950 text-forest-950 font-sans font-black text-xs uppercase tracking-wider transition-all border border-stone-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to 3D Overview</span>
          </Link>

          <Link to="/" className="flex flex-col items-center select-none">
            <img
              src="/logo/logo.webp"
              alt="The Radiant Hotel & Resort"
              className="h-8 object-contain filter drop-shadow-[0_2px_8px_rgba(182,154,112,0.3)]"
            />
          </Link>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${hotelInfo.contact.phone}`}
              className="hidden md:flex items-center gap-1.5 text-xs font-sans font-black text-forest-950 hover:text-gold-dark tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-dark" />
              <span>{hotelInfo.contact.phone}</span>
            </a>
            <button
              onClick={() => onOpenBooking && onOpenBooking({ name: 'Vedic Spa Treatment', price: '₹2,999' })}
              className="px-5 py-2 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all shadow-md"
            >
              Book Treatment
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO BANNER
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#EAEFE8] via-[#FAF5EE] to-[#FAF5EE] border-b border-stone-200 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-emerald-600/30 text-emerald-900 font-sans font-black text-[10px] sm:text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>AYURVEDIC SANCTUARY & SALON</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight max-w-4xl mx-auto">
            Vedic Wellness Spa & Salon
          </h1>

          <p className="text-sm sm:text-base font-sans text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Ancient Ayurvedic lineage meets contemporary restorative luxury. An oasis of sensory stillness, single-origin botanical oils, and bespoke personal grooming administered by certified wellness practitioners in Gorakhpur.
          </p>

          {/* Quick Pillars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-center">
            <div className="p-3 bg-white/90 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-emerald-800 block">100%</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Herbal Dhanwantari Oils</span>
            </div>
            <div className="p-3 bg-white/90 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-emerald-800 block">Kerala</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Authentic Lineage</span>
            </div>
            <div className="p-3 bg-white/90 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-emerald-800 block">Salon</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Bespoke Hair & Bridal</span>
            </div>
            <div className="p-3 bg-white/90 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-emerald-800 block">Daily</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">8 AM – 9 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE 3 CORE WELLNESS PILLARS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
              <Flower2 className="w-5 h-5 text-emerald-800" />
            </div>
            <h3 className="text-xl font-serif font-black text-forest-950">Ayurvedic Body Rituals</h3>
            <p className="text-xs font-sans text-stone-600 leading-relaxed">
              Authentic therapeutic massages, herbal steam baths, and synchronized dual-therapist treatments designed to restore somatic doshic equilibrium.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-gold/20 flex items-center justify-center text-gold-dark font-bold">
              <Sparkles className="w-5 h-5 text-gold-dark" />
            </div>
            <h3 className="text-xl font-serif font-black text-forest-950">Radiant Salon Studio</h3>
            <p className="text-xs font-sans text-stone-600 leading-relaxed">
              Tailored hair styling, Moroccan argan deep spas, precision grooming, and complete bridal wedding makeup in a private, dignified studio atmosphere.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-forest-950 font-bold">
              <Feather className="w-5 h-5 text-forest-950" />
            </div>
            <h3 className="text-xl font-serif font-black text-forest-950">Sensory Courtyard</h3>
            <p className="text-xs font-sans text-stone-600 leading-relaxed">
              Tranquil post-treatment relaxation lounges with custom organic herbal tea infusions, ambient soft raga acoustics, and calming natural greenery.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMPREHENSIVE TREATMENT MENU
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold-dark block">
            Curated Therapeutic Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-forest-950">
            Vedic Spa & Salon Treatment Folio
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SPA_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playClickSound();
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans font-black uppercase tracking-wider transition-all shadow-sm ${
                activeCategory === cat
                  ? 'bg-forest-950 text-gold shadow-md ring-2 ring-gold'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {filteredTreatments.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-gold/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-800 block">
                      {t.duration}
                    </span>
                    <h4 className="text-xl font-serif font-black text-forest-950">{t.name}</h4>
                  </div>
                  <span className="text-xl font-serif font-black text-gold-dark shrink-0">
                    {t.price}
                  </span>
                </div>

                <p className="text-xs font-sans text-stone-600 leading-relaxed font-medium">
                  {t.desc}
                </p>

                <div className="p-3 bg-[#FAF5EE] rounded-xl border border-stone-200/80">
                  <span className="text-[10px] font-sans font-black uppercase tracking-wider text-forest-950 block">
                    Botanical Liniment:
                  </span>
                  <span className="text-xs font-sans font-semibold text-stone-700">{t.oils}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[10px] font-sans text-stone-500 font-bold uppercase">
                  {t.category}
                </span>
                <button
                  onClick={() =>
                    onOpenBooking &&
                    onOpenBooking({ name: t.name, price: t.price })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 text-xs font-sans font-black uppercase tracking-wider transition-all shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          ATMOSPHERIC PHOTOGRAPHY GALLERY
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold-dark block">
              Serenity & Sanctuary
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase text-forest-950">
              Therapy Chambers & Salon Spaces
            </h3>
          </div>

          <div className="relative aspect-[16/9] max-w-4xl mx-auto rounded-3xl overflow-hidden border border-stone-200 shadow-xl">
            <img
              src={SPA_IMAGES[activePhotoIdx]}
              alt="Vedic Spa Sanctuary"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            {SPA_IMAGES.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePhotoIdx(idx);
                  playClickSound();
                }}
                className={`w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  activePhotoIdx === idx
                    ? 'border-gold ring-2 ring-gold/40 scale-105'
                    : 'border-stone-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          GRAND RESORT FOOTER
         ========================================================================= */}
      <footer className="bg-forest-950 text-stone-300 py-12 border-t border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="text-lg font-serif font-black text-gold uppercase tracking-wider">
              Vedic Wellness Spa & Salon
            </p>
            <p className="text-xs font-sans text-stone-400">
              The Radiant Hotel & Resort • Medical College Road, Gorakhpur • Daily 8:00 AM – 9:00 PM
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans font-black uppercase tracking-wider">
            <Link to="/" className="text-stone-300 hover:text-gold transition-colors">
              3D Overview
            </Link>
            <Link to="/rooms" className="text-stone-300 hover:text-gold transition-colors">
              Rooms & Suites
            </Link>
            <Link to="/malibu" className="text-stone-300 hover:text-gold transition-colors">
              Malibu Rooftop
            </Link>
            <Link to="/dining" className="text-stone-300 hover:text-gold transition-colors">
              Dining & Menus
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
