import React, { useState } from 'react';
import { Lock, Unlock, Sparkles, Crown, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClassifiedSanctuaryReveal({ onOpenBooking }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#F5D77F', '#FFFFFF', '#0B1614'],
      });
      setIsRevealed(true);
    } else {
      setIsRevealed(false);
    }
  };

  return (
    <section className="relative py-24 px-4 bg-white text-charcoal overflow-hidden select-none border-y border-stone-200">
      {/* Background Grungy Aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(#b69a70_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Provocative Henrietta-Style Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-sans font-bold tracking-[0.25em] uppercase mb-4 animate-pulse">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          Restricted Vault Access
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold uppercase tracking-tight text-forest-950">
          The Unlisted <span className="text-gold-dark italic font-normal">Presidential Penthouse</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-charcoal/70 font-sans max-w-lg mx-auto">
          Reserved exclusively for heads of state and private dignitaries. Are your credentials prepared for this level of luxury?
        </p>

        {/* The Classified Reveal Stage */}
        <div className="mt-12 relative max-w-3xl mx-auto rounded-3xl overflow-hidden border-2 border-gold/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] aspect-[16/9] sm:aspect-[21/9] group">
          {/* Real Suite Image Underneath */}
          <img
            src="/images/rooms/grandeur-room/grandeur-1.webp"
            alt="Presidential Penthouse"
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isRevealed ? 'filter blur-0 scale-100' : 'filter blur-md scale-105 brightness-50'
            }`}
          />

          {/* Golden Ambient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

          {/* THE HENRIETTA-STYLE "CENSORED" OVERLAY BADGE */}
          {!isRevealed && (
            <div
              onClick={handleReveal}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-forest-950/60 backdrop-blur-sm transition-all duration-300 hover:bg-forest-950/40"
              data-cursor="BREAK SEAL"
              data-cursor-variant="secret"
            >
              {/* Bold Diagonal Censored Banner */}
              <div className="transform -rotate-3 hover:rotate-0 transition-transform duration-300 bg-black text-ivory px-8 sm:px-12 py-4 rounded-xl border-2 border-gold shadow-[0_0_40px_rgba(182,154,112,0.8)] flex items-center gap-3 sm:gap-4">
                <Lock className="w-6 h-6 text-gold animate-bounce" />
                <div className="text-left">
                  <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-black">
                    CLASSIFIED LEVEL 0
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-wider uppercase text-white">
                    SUITE TOO LUXURIOUS!
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-sans tracking-widest uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Tap Seal to Declassify</span>
              </div>
            </div>
          )}

          {/* Revealed Info Bar (Active when seal broken) */}
          {isRevealed && (
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-gold text-forest-950 text-xs font-sans font-black tracking-widest uppercase shadow-lg flex items-center gap-1.5">
                  <Crown className="w-4 h-4" />
                  CONFIDENTIAL DECLASSIFIED
                </span>

                <button
                  onClick={handleReveal}
                  className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black text-ivory text-xs font-sans flex items-center gap-1.5 border border-white/20 transition-colors"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  Re-Seal Vault
                </button>
              </div>

              <div className="text-left max-w-lg bg-black/70 backdrop-blur-md p-5 rounded-2xl border border-gold/40">
                <span className="text-xs text-gold font-sans tracking-widest uppercase font-bold">
                  Penthouse Sovereign Residence
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  1,200 sq.ft Private Sky Haven
                </h3>
                <p className="text-xs sm:text-sm text-ivory/80 font-sans mt-2">
                  Helipad coordination, in-suite Sommelier, 24-karat gold fixtures, and private express lift.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => onOpenBooking && onOpenBooking({ name: 'Presidential Penthouse', price: '₹19,999' })}
                    className="px-6 py-2 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-bold text-xs tracking-wider uppercase shadow-lg transition-transform hover:scale-105"
                  >
                    Direct Inquire Vault
                  </button>
                  <span className="text-xs font-serif italic text-gold">By Invitation Only</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

