import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  Maximize2,
  Users,
  BedDouble,
  ShieldCheck,
  Wifi,
  Coffee,
  Tv,
  Bath,
  Phone,
  Calendar,
  Compass,
} from 'lucide-react';
import { roomsData } from '../data/roomsData';
import { hotelInfo } from '../data/hotelInfo';
import { playClickSound } from '../utils/audioEffects';

export default function RoomsSuitesPage({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activePhotoIdx, setActivePhotoIdx] = useState({});

  const categories = ['ALL', 'Classic Luxury', 'Signature Suite', 'Presidential Tier'];

  const filteredRooms = roomsData.filter((room) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'Presidential Tier') return room.id === 'grandeur-room';
    return room.category === selectedCategory;
  });

  const getActiveImg = (roomId, images) => {
    const idx = activePhotoIdx[roomId] ?? 0;
    return images[idx] || images[0];
  };

  const handleSelectPhoto = (roomId, idx) => {
    setActivePhotoIdx((prev) => ({ ...prev, [roomId]: idx }));
    playClickSound();
  };

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
            aria-label="Back"
            className="inline-flex items-center text-forest-950 hover:text-gold-dark transition-all duration-200 hover:-translate-x-1 p-1"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
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
              onClick={() => onOpenBooking && onOpenBooking({ name: 'Deluxe Suite', price: '₹5,499' })}
              className="px-5 py-2 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all shadow-md"
            >
              Reserve Suite
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO BANNER
         ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#F4ECE0] to-[#FAF5EE] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gold/40 shadow-sm text-gold-dark font-sans font-black text-[10px] sm:text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>THE SANCTUARY COLLECTION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight max-w-4xl mx-auto">
            Rooms & Signature Suites
          </h1>

          <p className="text-sm sm:text-base font-sans text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
            An ensemble of six distinct sanctuaries crafted with Statuario marble, natural daylight architecture, bespoke teak craftsmanship, and absolute sound-insulated acoustic calm in Gorakhpur.
          </p>

          {/* Quick Key Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-center">
            <div className="p-3 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold-dark block">06</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Sanctuary Tiers</span>
            </div>
            <div className="p-3 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold-dark block">100%</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Acoustic Silence</span>
            </div>
            <div className="p-3 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold-dark block">24/7</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Butler & Dining</span>
            </div>
            <div className="p-3 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold-dark block">100%</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Natural Daylight</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CATEGORY FILTER TABS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                playClickSound();
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans font-black uppercase tracking-wider transition-all shadow-sm ${
                selectedCategory === cat
                  ? 'bg-forest-950 text-gold shadow-md ring-2 ring-gold'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
              }`}
            >
              {cat === 'ALL' ? 'All Suites (06)' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          DETAILED SUITE FOLIOS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 sm:space-y-16">
        {filteredRooms.map((room, roomIdx) => {
          const activeImage = getActiveImg(room.id, room.images);

          return (
            <div
              key={room.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10">
                {/* Image Column: Main Perspective + Thumbnail Gallery */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/10 border border-stone-200 shadow-inner group">
                    <img
                      src={activeImage.src}
                      alt={activeImage.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-forest-950/85 backdrop-blur-md px-3 py-1 rounded-full text-gold font-sans font-black text-[10px] uppercase tracking-wider border border-gold/40">
                      {room.category}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-sans text-xs">
                      {activeImage.caption}
                    </div>
                  </div>

                  {/* Thumbnail Selector */}
                  <div className="flex items-center gap-2">
                    {room.images.map((img, idx) => (
                      <button
                        key={img.id}
                        onClick={() => handleSelectPhoto(room.id, idx)}
                        className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                          (activePhotoIdx[room.id] ?? 0) === idx
                            ? 'border-gold ring-2 ring-gold/40 scale-105'
                            : 'border-stone-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold-dark block">
                      Folio 0{roomIdx + 1} • {room.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase text-forest-950 tracking-tight">
                      {room.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans font-semibold text-gold-dark italic">
                      "{room.tagline}"
                    </p>
                    <p className="text-xs sm:text-sm font-sans text-stone-600 font-medium leading-relaxed pt-1">
                      {room.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-stone-200/80 space-y-2">
                    <p className="text-[10px] font-sans font-black uppercase tracking-wider text-forest-950">
                      Verified Suite Privileges:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {room.verifiedHighlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-sans text-stone-700">
                          <Check className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Amenities Tags */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-500">
                      Suite Features & Technology:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {room.verifiedAmenities.map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-600 text-[10px] font-sans font-bold"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200">
                    <div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500 block">
                        Direct Reservation Privilege
                      </span>
                      <span className="text-xl sm:text-2xl font-serif font-black text-forest-950">
                        From ₹3,499{' '}
                        <span className="text-xs font-sans font-normal text-stone-500">/ Night</span>
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        onOpenBooking &&
                        onOpenBooking({ name: room.name, price: '₹3,499' })
                      }
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book {room.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* =========================================================================
          SUITE COMPARISON TABLE
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold-dark block">
              Architectural Specifications
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase text-forest-950">
              Complete Suite Comparison Matrix
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200 text-stone-500 uppercase tracking-wider">
                  <th className="py-3 px-4 font-black">Suite Sanctuary</th>
                  <th className="py-3 px-4 font-black">Category</th>
                  <th className="py-3 px-4 font-black">Bed Configuration</th>
                  <th className="py-3 px-4 font-black">Aspect & Daylight</th>
                  <th className="py-3 px-4 font-black">Sound Insulation</th>
                  <th className="py-3 px-4 font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {roomsData.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FAF5EE] transition-colors">
                    <td className="py-3.5 px-4 font-serif font-black text-forest-950 text-sm">
                      {r.name}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gold-dark">{r.category}</td>
                    <td className="py-3.5 px-4 text-stone-600">King or Twin Luxury</td>
                    <td className="py-3.5 px-4 text-stone-600">Floor-to-Ceiling Panoramic</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-bold">100% Acoustic Barrier</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => onOpenBooking && onOpenBooking({ name: r.name, price: '₹3,499' })}
                        className="px-3 py-1.5 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 text-[10px] font-black uppercase tracking-wider transition-all"
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              {hotelInfo.name}
            </p>
            <p className="text-xs font-sans text-stone-400">
              {hotelInfo.address.line2}, {hotelInfo.city}, Uttar Pradesh {hotelInfo.address.pincode}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans font-black uppercase tracking-wider">
            <Link to="/" className="text-stone-300 hover:text-gold transition-colors">
              Home
            </Link>
            <Link to="/malibu" className="text-stone-300 hover:text-gold transition-colors">
              Malibu Rooftop
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

