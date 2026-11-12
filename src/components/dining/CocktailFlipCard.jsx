import React, { useState } from 'react';
import { RotateCw, Wine, Flame, Sparkles, Check } from 'lucide-react';
import { playCardFlipSound } from '../../utils/audioEffects';

const COCKTAILS = [
  {
    id: 'smoked-old-fashioned',
    name: 'The Sovereign Smoked Old Fashioned',
    tagline: 'Smoky, Bold & Royal',
    price: '₹850',
    glass: 'Crystal Rocks Glass',
    frontHighlight: 'Infused under a bell jar with charred hickory wood smoke',
    frontImage: '/images/malibu/malibu-2.webp',
    notes: ['Charred Oak Smoke', 'Sweet Orange Zest', 'Angostura Bitters', 'Aged Bourbon'],
    secret: 'Smoked table-side right before pouring over hand-carved ice sphere.',
  },
  {
    id: 'malibu-sunset-spritz',
    name: 'Malibu Sunset Spritz',
    tagline: 'Effervescent & Floral',
    price: '₹750',
    glass: 'Highstem Wine Goblet',
    frontHighlight: 'Blood orange reduction with French elderflower essence',
    frontImage: '/images/malibu/malibu-3.webp',
    notes: ['Italian Prosecco', 'Wild Elderflower', 'Blood Orange', 'Torched Rosemary'],
    secret: 'Garnished with caramelized blood orange wheel and fresh garden botanicals.',
  },
  {
    id: 'vedic-saffron-highball',
    name: 'Vedic Saffron Highball',
    tagline: 'Herbal, Crisp & Aromatic',
    price: '₹800',
    glass: 'Faceted Collins Glass',
    frontHighlight: 'Hand-picked Kashmiri saffron steeped in botanical gin',
    frontImage: '/images/malibu/malibu-1.webp',
    notes: ['Kashmiri Mongra Saffron', 'Green Cardamom Cordial', 'Artisan Indian Tonic'],
    secret: 'Finished with a light mist of wild Himalayan rosewater.',
  },
];

export default function CocktailFlipCard() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (id) => {
    playCardFlipSound();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mt-16 pt-12 border-t border-stone-200">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[10px] font-sans font-black tracking-[0.25em] uppercase text-gold-dark block mb-2">
          Interactive 3D Mixology Cards
        </span>
        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-forest-950 uppercase">
          Malibu Signature Cocktail Codex
        </h3>
        <p className="text-xs sm:text-sm text-charcoal/70 font-sans mt-2">
          Click any cocktail card to flip and inspect the mixologist's secret preparation ritual.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COCKTAILS.map((c) => {
          const isFlipped = !!flippedCards[c.id];
          return (
            <div
              key={c.id}
              className="h-[380px] perspective-1000 cursor-pointer select-none"
              onClick={() => toggleCard(c.id)}
              data-cursor="FLIP DRINK"
              data-cursor-variant="flip"
            >
              <div
                className="w-full h-full relative preserve-3d transition-transform duration-500 ease-out will-change-transform rounded-2xl shadow-lg"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white border border-stone-200 p-5 flex flex-col justify-between backface-hidden shadow-sm hover:shadow-xl transition-shadow">
                  <div>
                    <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-2 mb-3">
                      <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-gold-dark">
                        Malibu Bar
                      </span>
                      <span className="font-serif font-bold text-forest-950">{c.price}</span>
                    </div>

                    <div className="rounded-xl overflow-hidden h-36 mb-3 border border-stone-100">
                      <img src={c.frontImage} alt={c.name} className="w-full h-full object-cover" />
                    </div>

                    <p className="text-[10px] font-sans text-charcoal/60 uppercase tracking-widest">{c.tagline}</p>
                    <h4 className="text-base font-serif font-bold text-forest-950 uppercase leading-snug">{c.name}</h4>
                  </div>

                  <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-[11px] font-sans text-gold-dark font-bold">
                    <span className="flex items-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5" /> Tap to Flip Recipe
                    </span>
                    <span className="text-charcoal/50 text-[10px]">{c.glass}</span>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-forest-950 text-ivory border border-gold/40 p-5 flex flex-col justify-between backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs border-b border-gold/30 pb-2 mb-3">
                      <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-gold">
                        Mixologist Note
                      </span>
                      <Wine className="w-4 h-4 text-gold" />
                    </div>

                    <h4 className="text-lg font-serif font-bold text-white uppercase mb-2">{c.name}</h4>
                    <p className="text-xs text-ivory/70 font-sans mb-3">{c.frontHighlight}</p>

                    <div className="space-y-1 my-3 bg-forest-900/80 p-3 rounded-xl border border-gold/20">
                      <p className="text-[9px] font-sans font-bold tracking-widest uppercase text-gold">Tasting Notes</p>
                      <ul className="text-xs text-ivory/80 space-y-0.5 font-sans">
                        {c.notes.map((n, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-gold" /> {n}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gold/15 border border-gold/25 text-[11px] font-serif italic text-gold">
                      "{c.secret}"
                    </div>
                  </div>

                  <div className="border-t border-gold/20 pt-2 flex items-center justify-between text-[11px] font-sans text-gold">
                    <span>Tap to return front</span>
                    <span className="text-[10px] uppercase tracking-wider text-ivory/50">Malibu Bar</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

