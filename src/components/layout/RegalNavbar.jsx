import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowLeft, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';

export default function RegalNavbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleNav = (stageIdx, route) => {
    setMobileMenuOpen(false);
    playClickSound();
    if (isHomePage) {
      window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: stageIdx }));
    } else {
      navigate(route);
    }
  };

  const handleLogoClick = (e) => {
    setMobileMenuOpen(false);
    playClickSound();
    if (isHomePage) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: 0 }));
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md py-2 sm:py-2.5 border-b border-stone-200 shadow-sm text-forest-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between min-h-[52px]">
          {/* Mobile Left: Menu Toggle Button & Back Arrow if on sub-page */}
          <div className="lg:hidden flex items-center gap-1.5 z-10">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-white border border-stone-300 text-forest-950 flex items-center justify-center shadow-sm hover:border-gold hover:text-gold-dark transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            {!isHomePage && (
              <button
                onClick={() => {
                  playClickSound();
                  navigate('/');
                }}
                className="w-9 h-9 rounded-full bg-white border border-stone-300 text-forest-950 flex items-center justify-center shadow-sm hover:border-gold hover:text-gold-dark transition-all"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Left: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-sans text-xs tracking-[0.2em] uppercase font-black text-forest-950 z-10">
            {!isHomePage && (
              <button
                onClick={() => {
                  playClickSound();
                  navigate('/');
                }}
                className="text-gold-dark hover:text-forest-950 transition-colors py-1 flex items-center gap-1 group"
                title="Back to Home"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Home</span>
              </button>
            )}

            {isHomePage && (
              <button
                onClick={() => handleNav(0, '/')}
                className="hover:text-gold-dark transition-colors py-1 relative group"
              >
                Overview
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
              </button>
            )}

            <button
              onClick={() => handleNav(1, '/rooms')}
              className={`hover:text-gold-dark transition-colors py-1 relative group flex items-center gap-1.5 ${
                location.pathname === '/rooms' ? 'text-gold-dark font-black' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              Rooms & Suites
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                location.pathname === '/rooms' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>

            <button
              onClick={() => handleNav({ stage: 2, realmIdx: 3 }, '/wellness')}
              className={`hover:text-gold-dark transition-colors py-1 relative group ${
                location.pathname === '/wellness' ? 'text-gold-dark font-black' : ''
              }`}
            >
              Salon & Spa
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                location.pathname === '/wellness' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          </nav>

          {/* Centered Grand Official Logo (Enlarged & Strictly Centered Across All Screens) */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center select-none z-20 group"
          >
            <img
              src="/logo/logo.webp"
              alt="The Radiant Hotel & Resort"
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(182,154,112,0.35)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Right: Malibu, Dining & Light Booking CTA */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 z-10">
            <button
              onClick={() => handleNav(3, '/malibu')}
              className={`font-sans text-xs tracking-[0.2em] uppercase font-black hover:text-gold-dark transition-colors py-1 relative group ${
                location.pathname === '/malibu' ? 'text-gold-dark' : 'text-forest-950'
              }`}
            >
              Malibu
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                location.pathname === '/malibu' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>

            <button
              onClick={() => handleNav(4, '/dining')}
              className={`font-sans text-xs tracking-[0.2em] uppercase font-black hover:text-gold-dark transition-colors py-1 relative group ${
                location.pathname === '/dining' ? 'text-gold-dark' : 'text-forest-950'
              }`}
            >
              Dining
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                location.pathname === '/dining' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>

            <button
              onClick={() => {
                playClickSound();
                onOpenBooking && onOpenBooking();
              }}
              className="px-5 py-2 rounded-full bg-[#FAF5EE] hover:bg-gold text-forest-950 font-sans font-black text-[11px] sm:text-xs tracking-[0.18em] uppercase transition-all duration-300 border border-gold/60 hover:border-gold shadow-sm hover:shadow-md hover:scale-105 cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Right: Light Book Button */}
          <div className="lg:hidden flex items-center gap-2 z-10">
            <button
              onClick={() => {
                playClickSound();
                onOpenBooking && onOpenBooking();
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#FAF5EE] hover:bg-gold text-forest-950 font-sans font-black text-[11px] tracking-wider uppercase border border-gold/60 shadow-sm transition-colors cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Bright Luxury Theme) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col justify-center items-center gap-6 p-8 text-center text-forest-950 font-serif text-2xl font-black uppercase shadow-2xl">
          <button
            onClick={() => handleNav(0, '/')}
            className="hover:text-gold-dark transition-colors cursor-pointer"
          >
            Overview / Home
          </button>
          <button
            onClick={() => handleNav(1, '/rooms')}
            className={`hover:text-gold-dark transition-colors flex items-center gap-2 cursor-pointer ${
              location.pathname === '/rooms' ? 'text-gold-dark' : ''
            }`}
          >
            <Sparkles className="w-5 h-5 text-gold-dark" />
            Rooms & Suites
          </button>
          <button
            onClick={() => handleNav({ stage: 2, realmIdx: 3 }, '/wellness')}
            className={`hover:text-gold-dark transition-colors cursor-pointer ${
              location.pathname === '/wellness' ? 'text-gold-dark' : ''
            }`}
          >
            Salon & Spa
          </button>
          <button
            onClick={() => handleNav(3, '/malibu')}
            className={`hover:text-gold-dark transition-colors cursor-pointer ${
              location.pathname === '/malibu' ? 'text-gold-dark' : ''
            }`}
          >
            Malibu Rooftop
          </button>
          <button
            onClick={() => handleNav(4, '/dining')}
            className={`hover:text-gold-dark transition-colors cursor-pointer ${
              location.pathname === '/dining' ? 'text-gold-dark' : ''
            }`}
          >
            The Seven Scentric Dining
          </button>

          <div className="pt-4 border-t-2 border-stone-200 w-full max-w-xs flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                playClickSound();
                onOpenBooking && onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-forest-950 text-gold font-sans font-black text-xs tracking-widest uppercase shadow-md cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
