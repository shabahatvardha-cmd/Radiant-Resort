import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Utensils,
  Wine,
  Coffee,
  Clock,
  Check,
  Calendar,
  Phone,
  ChefHat,
  Star,
} from 'lucide-react';
import { hotelInfo } from '../data/hotelInfo';
import { playClickSound } from '../utils/audioEffects';

const MENU_CATEGORIES = [
  'All Courses',
  'Royal Starters',
  'Awadhi & North Indian',
  'Pan-Asian & Dim Sum',
  'Artisanal Pasta & Grills',
  'Desserts & Patisserie',
];

const MENU_ITEMS = [
  {
    id: 'm1',
    category: 'Royal Starters',
    name: 'Galouti Kebab Awadhi',
    type: 'Non-Veg',
    chefSpecial: true,
    price: '₹599',
    desc: 'Melt-in-mouth smoked lamb patties infused with 32 rare Awadhi spices, served on saffron sheermal with mint chutney.',
  },
  {
    id: 'm2',
    category: 'Royal Starters',
    name: 'Bhatti Da Paneer Tikka',
    type: 'Veg',
    chefSpecial: false,
    price: '₹479',
    desc: 'Thick cubes of fresh malai paneer marinated in stone-ground yellow mustard, roasted gram flour, and clay-oven charred.',
  },
  {
    id: 'm3',
    category: 'Awadhi & North Indian',
    name: 'Dum Pukht Gosht Biryani',
    type: 'Non-Veg',
    chefSpecial: true,
    price: '₹699',
    desc: 'Fragrant aged long-grain basmati rice and tender spring lamb slow-cooked in a sealed dough handi with saffron and rose water.',
  },
  {
    id: 'm4',
    category: 'Awadhi & North Indian',
    name: 'Dal Radiant Maharani',
    type: 'Veg',
    chefSpecial: true,
    price: '₹449',
    desc: 'Slow-simmered whole black lentils cooked overnight on charcoal embers with fresh churned white butter and vine-ripened tomatoes.',
  },
  {
    id: 'm5',
    category: 'Awadhi & North Indian',
    name: 'Paneer Lababdar Shahjahani',
    type: 'Veg',
    chefSpecial: false,
    price: '₹489',
    desc: 'Soft cottage cheese simmered in a luscious onion-tomato gravy with crushed kasoori methi and ginger juliennes.',
  },
  {
    id: 'm6',
    category: 'Pan-Asian & Dim Sum',
    name: 'Crystal Truffle Edamame Dim Sum',
    type: 'Veg',
    chefSpecial: true,
    price: '₹529',
    desc: 'Translucent steamed parcels filled with crushed edamame, water chestnuts, and black summer truffle oil drizzle.',
  },
  {
    id: 'm7',
    category: 'Pan-Asian & Dim Sum',
    name: 'Crispy Silken Chilli Garlic Prawns',
    type: 'Non-Veg',
    chefSpecial: false,
    price: '₹749',
    desc: 'Wok-tossed jumbo prawns in scallion oil, fermented chilli paste, garlic flakes, and micro coriander.',
  },
  {
    id: 'm8',
    category: 'Artisanal Pasta & Grills',
    name: 'Handcrafted Wild Mushroom Fettuccine',
    type: 'Veg',
    chefSpecial: false,
    price: '₹549',
    desc: 'Fresh handmade pasta ribbons tossed with porcini mushrooms, Parmigiano-Reggiano, sage butter, and roasted garlic.',
  },
  {
    id: 'm9',
    category: 'Desserts & Patisserie',
    name: 'Shahi Tukda Brioche Flan',
    type: 'Veg',
    chefSpecial: true,
    price: '₹349',
    desc: 'Cardamom-infused brioche drenched in saffron rabri reduction, silver leaf, crushed pistachio, and rose caviar.',
  },
  {
    id: 'm10',
    category: 'Desserts & Patisserie',
    name: 'Belgium Dark Chocolate Fondant',
    type: 'Veg',
    chefSpecial: false,
    price: '₹399',
    desc: 'Warm molten 70% Callebaut chocolate lava cake served with artisanal Madagascar vanilla bean ice cream.',
  },
];

export default function DiningPage({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const DINING_IMAGES = [
    '/images/dining/dining-1.webp',
    '/images/dining/dining-2.webp',
    '/images/dining/dining-3.webp',
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeCategory === 'All Courses') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#1F0E23] text-white font-sans selection:bg-gold selection:text-forest-950 overflow-x-hidden pt-14 sm:pt-16">
      {/* =========================================================================
          HERO BANNER
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#140816] via-[#1F0E23] to-[#1F0E23] border-b border-gold/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(212,175,55,0.18),transparent_65%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold font-sans font-black text-[10px] sm:text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>FINE DINING • MULTI-CUISINE MASTERY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-white tracking-tight leading-tight max-w-4xl mx-auto">
            The Seven Scentric Fine Dining
          </h1>

          <p className="text-sm sm:text-base font-sans text-stone-300 max-w-2xl mx-auto font-medium leading-relaxed">
            The culinary jewel of The Radiant Hotel & Resort. An opulent symphony of Awadhi royal lineages, Pan-Asian master wok artistry, and refined Continental classics prepared with artisanal precision in Gorakhpur.
          </p>

          {/* Quick Dining Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-center">
            <div className="p-3 bg-black/60 rounded-2xl border border-gold/30 shadow-md">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold block">07</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-300">Global Flavour Senses</span>
            </div>
            <div className="p-3 bg-black/60 rounded-2xl border border-gold/30 shadow-md">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold block">Daily</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-300">Breakfast, Lunch, Dinner</span>
            </div>
            <div className="p-3 bg-black/60 rounded-2xl border border-gold/30 shadow-md">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold block">PDR</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-300">Private Dining Chambers</span>
            </div>
            <div className="p-3 bg-black/60 rounded-2xl border border-gold/30 shadow-md">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold block">11 PM</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-300">Last Order Dinner</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MEAL PERIODS & TIMINGS CARDS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-black/60 border border-gold/30 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-gold">
              <Coffee className="w-5 h-5 text-gold" />
              <span className="text-xs font-sans font-black uppercase tracking-wider text-gold">Morning Service</span>
            </div>
            <h3 className="text-xl font-serif font-black text-white">Daily Breakfast Buffet</h3>
            <p className="text-2xl font-serif font-black text-gold">7:00 AM – 10:30 AM</p>
            <p className="text-xs font-sans text-stone-300 leading-relaxed">
              Continental viennoiseries, freshly pressed fruit elixirs, live egg & waffle stations, South Indian tiffin spreads, and artisanal coffees.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-black/60 border border-gold/30 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-gold">
              <Utensils className="w-5 h-5 text-gold" />
              <span className="text-xs font-sans font-black uppercase tracking-wider text-gold">Afternoon Repast</span>
            </div>
            <h3 className="text-xl font-serif font-black text-white">Executive Luncheon</h3>
            <p className="text-2xl font-serif font-black text-gold">12:00 PM – 2:00 PM</p>
            <p className="text-xs font-sans text-stone-300 leading-relaxed">
              Curated business platters, wok-fired dim sums, aromatic Awadhi curries, handcrafted flatbreads, and refreshing cooling mocktails.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-black/60 border border-gold/30 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-gold">
              <Wine className="w-5 h-5 text-gold" />
              <span className="text-xs font-sans font-black uppercase tracking-wider text-gold">Evening Soiree</span>
            </div>
            <h3 className="text-xl font-serif font-black text-white">Grand Fine Dinner</h3>
            <p className="text-2xl font-serif font-black text-gold">From 6:30 PM</p>
            <p className="text-xs font-sans text-stone-300 leading-relaxed">
              Candlelit dining room, clay-oven tandoori kebabs, slow-simmered dum pukht biryanis, open terrace drinks, and table-side service. Last order 11:00 PM.
            </p>
          </div>
        </div>

        {/* Open Terrace Alert */}
        <div className="mt-6 p-4 rounded-2xl bg-black/70 border border-amber-500/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Wine className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs sm:text-sm font-sans font-medium text-stone-200">
              <strong className="text-gold uppercase font-black">Terrace Privilege:</strong> Open terrace at The Seven Scentric is open for drinks and artisanal cocktails only.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking && onOpenBooking({ name: 'Terrace Drinks at 7 Scentric', price: '₹1,999' })}
            className="px-4 py-1.5 rounded-full bg-amber-500 hover:bg-gold text-forest-950 font-sans font-black text-[10px] uppercase tracking-wider shrink-0"
          >
            Reserve Terrace
          </button>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE MENU EXPLORER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold block">
            Curated Culinary Repertoire
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white">
            The Seven Scentric Signature Menu
          </h2>
        </div>

        {/* Menu Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playClickSound();
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans font-black uppercase tracking-wider transition-all shadow-md ${
                activeCategory === cat
                  ? 'bg-gold text-forest-950 ring-2 ring-gold-light font-black scale-105'
                  : 'bg-black/60 text-stone-300 hover:bg-black/80 border border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-black/60 border border-white/15 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.type === 'Veg' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    <h4 className="text-lg font-serif font-black text-white">{item.name}</h4>
                    {item.chefSpecial && (
                      <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[9px] font-sans font-black uppercase tracking-wider border border-gold/40">
                        Chef's Special
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-sans text-stone-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <span className="text-lg font-serif font-black text-gold shrink-0">
                  {item.price}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-sans text-stone-400">
                <span>{item.category}</span>
                <button
                  onClick={() =>
                    onOpenBooking &&
                    onOpenBooking({ name: `Dish: ${item.name}`, price: item.price })
                  }
                  className="text-gold font-bold hover:underline"
                >
                  Order In Table Reservation →
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
        <div className="bg-black/70 rounded-3xl border border-gold/30 p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold block">
              Architectural Grandeur
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase text-white">
              Dining Ambiance & Private Chambers
            </h3>
          </div>

          <div className="relative aspect-[16/9] max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <img
              src={DINING_IMAGES[activePhotoIdx]}
              alt="Dining at The Seven Scentric"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            {DINING_IMAGES.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePhotoIdx(idx);
                  playClickSound();
                }}
                className={`w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  activePhotoIdx === idx
                    ? 'border-gold ring-2 ring-gold/40 scale-105'
                    : 'border-white/30 opacity-70 hover:opacity-100'
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
      <footer className="bg-black text-stone-400 py-12 border-t border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="text-lg font-serif font-black text-gold uppercase tracking-wider">
              The Seven Scentric Fine Dining
            </p>
            <p className="text-xs font-sans text-stone-400">
              The Radiant Hotel & Resort • Medical College Road, Gorakhpur
            </p>
          </div>

          <div className="text-center md:text-right text-xs font-sans text-stone-400">
            <p className="text-stone-300 font-medium">Fine Dining Table Reservations & Sommelier Concierge</p>
            <p className="text-[11px] text-stone-500 mt-1">© {new Date().getFullYear()} The Seven Scentric. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

