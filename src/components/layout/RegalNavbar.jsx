import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Compass, Sparkles, Volume2, VolumeX, ArrowRight, ExternalLink } from 'lucide-react';
import { setSoundEnabled, getSoundEnabled, playChimeSound } from '../../utils/audioEffects';

export default function RegalNavbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    setSoundOn(getSoundEnabled());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playChimeSound();
  };

  const jumpToStage = (idx) => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: idx }));
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md py-2 sm:py-2.5 border-b border-stone-200 shadow-sm text-forest-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between min-h-[52px]">
          {/* Mobile Left: Menu Toggle Button */}
          <div className="lg:hidden flex items-center z-10">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-white border border-stone-300 text-forest-950 flex items-center justify-center shadow-sm hover:border-gold hover:text-gold-dark transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Desktop Left: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-sans text-xs tracking-[0.2em] uppercase font-black text-forest-950 z-10">
            <button
              onClick={() => jumpToStage(0)}
              className="hover:text-gold-dark transition-colors py-1 relative group"
            >
              Overview
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => jumpToStage(1)}
              className="hover:text-gold-dark transition-colors py-1 relative group flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              Rooms & Suites
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => jumpToStage({ stage: 2, realmIdx: 3 })}
              className="hover:text-gold-dark transition-colors py-1 relative group"
            >
              Salon & Spa
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* Centered Grand Official Logo (Enlarged & Strictly Centered Across All Screens) */}
          <Link
            to="/"
            onClick={() => jumpToStage(0)}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center select-none z-20 group"
          >
            <img
              src="/logo/logo.webp"
              alt="The Radiant Hotel & Resort"
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(182,154,112,0.35)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Right: Malibu, Dining, Audio & Booking CTA */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 z-10">
            <button
              onClick={() => jumpToStage(3)}
              className="font-sans text-xs tracking-[0.2em] uppercase font-black text-forest-950 hover:text-gold-dark transition-colors py-1 relative group"
            >
              Malibu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => jumpToStage(4)}
              className="font-sans text-xs tracking-[0.2em] uppercase font-black text-forest-950 hover:text-gold-dark transition-colors py-1 relative group"
            >
              Dining
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-full border transition-all ${
                soundOn
                  ? 'bg-gold text-forest-950 border-gold shadow-md'
                  : 'bg-stone-100 text-charcoal border-stone-300 hover:border-gold hover:text-gold-dark'
              }`}
              title={soundOn ? 'Mute Spatial Audio' : 'Enable Spatial Audio Chimes'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <a
              href="tel:+917607603377"
              className="hidden xl:flex items-center gap-1.5 text-xs font-sans font-bold text-forest-950 hover:text-gold-dark tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-dark" />
              <span>+91 760 760 3377</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2 rounded-full bg-forest-950 hover:bg-forest-900 text-gold font-sans font-black text-[11px] sm:text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-md hover:scale-105"
            >
              Book Room & Suite
            </button>
          </div>

          {/* Mobile Right: Audio & Book Button */}
          <div className="lg:hidden flex items-center gap-2 z-10">
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-full border transition-all ${
                soundOn
                  ? 'bg-gold text-forest-950 border-gold'
                  : 'bg-stone-100 text-charcoal border-stone-300'
              }`}
              title={soundOn ? 'Mute Spatial Audio' : 'Enable Spatial Audio Chimes'}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 rounded-full bg-forest-950 text-gold font-sans font-bold text-[11px] tracking-wider uppercase shadow-sm hover:bg-gold hover:text-forest-950 transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Bright Theme) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col justify-center items-center gap-6 p-8 text-center text-forest-950 font-serif text-2xl font-black uppercase shadow-2xl">
          <button
            onClick={() => jumpToStage(0)}
            className="hover:text-gold-dark transition-colors"
          >
            Overview
          </button>
          <button
            onClick={() => jumpToStage(1)}
            className="hover:text-gold-dark transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-gold-dark" />
            Rooms & Suites
          </button>
          <button
            onClick={() => jumpToStage({ stage: 2, realmIdx: 3 })}
            className="hover:text-gold-dark transition-colors"
          >
            Salon & Spa
          </button>
          <button
            onClick={() => jumpToStage(3)}
            className="hover:text-gold-dark transition-colors"
          >
            Malibu Rooftop
          </button>
          <button
            onClick={() => jumpToStage(4)}
            className="hover:text-gold-dark transition-colors"
          >
            The Seven Scentric Dining
          </button>

          <div className="pt-2 border-t border-stone-200 w-full max-w-xs space-y-1.5">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-gold-dark block">
              Dedicated In-Depth Pages
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans font-black">
              <Link
                to="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-[#FAF5EE] border border-stone-300 text-forest-950 hover:bg-gold transition-colors flex items-center justify-center gap-1"
              >
                <span>Rooms Folio</span>
                <ArrowRight className="w-3 h-3 text-gold-dark" />
              </Link>
              <Link
                to="/malibu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-[#FAF5EE] border border-stone-300 text-forest-950 hover:bg-gold transition-colors flex items-center justify-center gap-1"
              >
                <span>Malibu Page</span>
                <ArrowRight className="w-3 h-3 text-gold-dark" />
              </Link>
              <Link
                to="/dining"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-[#FAF5EE] border border-stone-300 text-forest-950 hover:bg-gold transition-colors flex items-center justify-center gap-1"
              >
                <span>Dining Menus</span>
                <ArrowRight className="w-3 h-3 text-gold-dark" />
              </Link>
              <Link
                to="/wellness"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-[#FAF5EE] border border-stone-300 text-forest-950 hover:bg-gold transition-colors flex items-center justify-center gap-1"
              >
                <span>Spa & Salon</span>
                <ArrowRight className="w-3 h-3 text-gold-dark" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-stone-200 w-full max-w-xs flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-forest-950 text-gold font-sans font-black text-xs tracking-widest uppercase shadow-md"
            >
              Book Room & Suite
            </button>
            <a
              href="tel:+917607603377"
              className="text-xs font-sans font-bold text-forest-950 flex items-center justify-center gap-2 pt-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold-dark" />
              +91 760 760 3377
            </a>
          </div>
        </div>
      )}
    </>
  );
}
