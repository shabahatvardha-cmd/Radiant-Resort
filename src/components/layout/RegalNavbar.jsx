import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowLeft, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';

export default function RegalNavbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Listen for real-time stage updates dispatched by SpatialScrollStage as visitor scrolls
  useEffect(() => {
    const handleStageActive = (e) => {
      if (typeof e.detail === 'number') {
        setActiveStageIdx(e.detail);
      }
    };
    window.addEventListener('spatial-stage-active', handleStageActive);
    return () => window.removeEventListener('spatial-stage-active', handleStageActive);
  }, []);

  // When ANY navbar button is clicked:
  // Directs immediately to that dedicated depth page section starting at Part 1,
  // or to the home page overview for the hotel crest / Overview.
  const handleNav = (routePath) => {
    setMobileMenuOpen(false);
    playClickSound();

    if (routePath === '/') {
      try {
        sessionStorage.removeItem('radiant_last_stage');
      } catch (_) { }
      if (isHomePage) {
        window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: 0 }));
      } else {
        navigate('/');
      }
      return;
    }

    if (location.pathname === routePath) {
      // Already on this depth page -> jump/reset to the first part
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('depth-page-reset'));
    } else {
      navigate(routePath);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    playClickSound();
    try {
      sessionStorage.removeItem('radiant_last_stage');
    } catch (_) { }
    if (isHomePage) {
      window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: 0 }));
    } else {
      navigate('/');
    }
  };

  // Active status matching dedicated depth pages and home stage progress
  const isOverviewActive = isHomePage && (activeStageIdx === 0 || activeStageIdx <= 0.5);
  const isRoomsActive = location.pathname === '/rooms' || (isHomePage && activeStageIdx === 1);
  const isSpaActive = location.pathname === '/wellness' || location.pathname === '/spa' || (isHomePage && activeStageIdx === 2);
  const isMalibuActive = location.pathname === '/malibu' || (isHomePage && activeStageIdx === 3);
  const isDiningActive = location.pathname === '/dining' || (isHomePage && activeStageIdx === 4);
  const isBanquetActive = location.pathname === '/banquet' || (isHomePage && activeStageIdx === 5);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md py-2 sm:py-2.5 border-b border-stone-200 shadow-sm text-forest-950"
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative flex items-center justify-between min-h-[52px]">
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
                  if (location.pathname === '/banquet') {
                    try {
                      sessionStorage.setItem('radiant_last_stage', '5');
                      window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: 5 }));
                    } catch (_) { }
                    navigate('/?stage=5&progress=8');
                  } else if (location.pathname === '/dining') {
                    try {
                      sessionStorage.setItem('radiant_last_stage', '4');
                      window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: 4 }));
                    } catch (_) { }
                    navigate('/?stage=4&progress=7');
                  } else if (location.pathname === '/malibu') {
                    try {
                      sessionStorage.setItem('radiant_last_stage', '3');
                      window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: 3 }));
                    } catch (_) { }
                    navigate('/?stage=3&progress=6');
                  } else if (location.pathname === '/rooms') {
                    try {
                      sessionStorage.setItem('radiant_last_stage', '1');
                      window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: 1 }));
                    } catch (_) { }
                    navigate('/?stage=1&progress=1');
                  } else if (location.pathname === '/wellness' || location.pathname === '/spa') {
                    try {
                      sessionStorage.setItem('radiant_last_stage', '2');
                      window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: 2 }));
                    } catch (_) { }
                    navigate('/?stage=2&progress=5');
                  } else {
                    navigate('/');
                  }
                }}
                className="w-9 h-9 rounded-full bg-white border border-stone-300 text-forest-950 flex items-center justify-center shadow-sm hover:border-gold hover:text-gold-dark transition-all cursor-pointer"
                aria-label="Back to home page overview"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Left: Imperial Roman Typography (Style 2: Cinzel Luxury Suite) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-cinzel text-[11.5px] tracking-[0.22em] uppercase font-semibold text-forest-950 z-10">
            <button
              onClick={() => handleNav('/')}
              className={`hover:text-gold-dark transition-colors py-1 relative group cursor-pointer ${isOverviewActive ? 'text-gold-dark font-bold' : ''
                }`}
            >
              Overview
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${isOverviewActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
            </button>

            <button
              onClick={() => handleNav('/rooms')}
              className={`hover:text-gold-dark transition-colors py-1 relative group flex items-center gap-1.5 cursor-pointer ${isRoomsActive ? 'text-gold-dark font-bold' : ''
                }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              Rooms & Suites
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${isRoomsActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
            </button>

            <button
              onClick={() => handleNav('/wellness')}
              className={`hover:text-gold-dark transition-colors py-1 relative group cursor-pointer ${isSpaActive ? 'text-gold-dark font-bold' : ''
                }`}
            >
              Salon & Spa
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${isSpaActive ? 'w-full' : 'w-0 group-hover:w-full'
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
              width="240"
              height="197"
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(182,154,112,0.35)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Right: Imperial Roman Typography (Style 2: Cinzel Luxury Suite) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 z-10">
            <button
              onClick={() => handleNav('/malibu')}
              className={`font-cinzel text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:text-gold-dark transition-colors py-1 relative group cursor-pointer ${isMalibuActive ? 'text-gold-dark font-bold' : 'text-forest-950'
                }`}
            >
              Malibu
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${isMalibuActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
            </button>

            <button
              onClick={() => handleNav('/dining')}
              className={`font-cinzel text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:text-gold-dark transition-colors py-1 relative group cursor-pointer ${isDiningActive ? 'text-gold-dark font-bold' : 'text-forest-950'
                }`}
            >
              Dining
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${isDiningActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
            </button>

            <button
              onClick={() => handleNav('/banquet')}
              className={`font-cinzel text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:text-gold-dark transition-colors py-1 relative group cursor-pointer ${isBanquetActive ? 'text-gold-dark font-bold' : 'text-forest-950'
                }`}
            >
              Banquet
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${isBanquetActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
            </button>

            <button
              onClick={() => {
                playClickSound();
                onOpenBooking && onOpenBooking();
              }}
              className="px-5 py-2 rounded-full bg-[#FAF5EE] hover:bg-gold text-forest-950 font-cinzel font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-300 border border-gold/60 hover:border-gold shadow-sm hover:shadow-md hover:scale-105 cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Right: Compact Luxury Book Button */}
          <div className="lg:hidden flex items-center gap-1.5 z-10">
            <button
              onClick={() => {
                playClickSound();
                onOpenBooking && onOpenBooking();
              }}
              className="px-2.5 py-1 rounded-full bg-[#FAF5EE] hover:bg-gold text-forest-950 font-cinzel font-bold text-[9px] tracking-[0.14em] uppercase border border-gold/50 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Side Drawer Menu (Modern Side Panel, does not cover whole screen) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Subtle Dark Backdrop - Tap to Dismiss */}
          <div
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(false);
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Side Drawer Panel (Anchored to Left, Width ~285px max 80vw) */}
          <aside
            className="fixed top-0 left-0 bottom-0 w-[285px] max-w-[82vw] bg-white text-forest-950 shadow-2xl border-r border-stone-200 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-250 ease-out"
          >
            {/* Drawer Top Header with Hotel Brand & Close Button */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-stone-200/90 bg-[#FAF7F2]">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo/logo.webp"
                  alt="The Radiant Hotel & Resort"
                  className="h-8 w-auto object-contain filter drop-shadow-xs"
                />
                <div>
                  <span className="block text-[8px] font-sans font-black uppercase tracking-[0.22em] text-[#8C6D37]">
                    Gorakhpur Luxury
                  </span>
                  <span className="font-cinzel text-xs font-bold text-forest-950 uppercase tracking-wide">
                    The Radiant
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="w-8 h-8 rounded-full bg-white border border-stone-300 text-forest-950 flex items-center justify-center shadow-xs hover:border-gold hover:text-gold-dark transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links (Side list with active markers) */}
            <nav className="flex-1 px-3 py-3.5 space-y-1 font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-forest-950">
              <button
                onClick={() => handleNav('/')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isOverviewActive ? 'bg-[#FAF5EE] text-gold-dark font-black border border-gold/40' : 'hover:bg-stone-100 text-forest-950'
                }`}
              >
                <span>Overview</span>
                {isOverviewActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
              </button>

              <button
                onClick={() => handleNav('/rooms')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isRoomsActive ? 'bg-[#FAF5EE] text-gold-dark font-black border border-gold/40' : 'hover:bg-stone-100 text-forest-950'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                  <span>Rooms & Suites</span>
                </div>
                {isRoomsActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
              </button>

              <button
                onClick={() => handleNav('/wellness')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isSpaActive ? 'bg-[#FAF5EE] text-gold-dark font-black border border-gold/40' : 'hover:bg-stone-100 text-forest-950'
                }`}
              >
                <span>Salon & Spa</span>
                {isSpaActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
              </button>

              <button
                onClick={() => handleNav('/malibu')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isMalibuActive ? 'bg-[#FAF5EE] text-gold-dark font-black border border-gold/40' : 'hover:bg-stone-100 text-forest-950'
                }`}
              >
                <span>Malibu Rooftop</span>
                {isMalibuActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
              </button>

              <button
                onClick={() => handleNav('/dining')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isDiningActive ? 'bg-[#FAF5EE] text-gold-dark font-black border border-gold/40' : 'hover:bg-stone-100 text-forest-950'
                }`}
              >
                <span>7 Scentric Dining</span>
                {isDiningActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
              </button>

              <button
                onClick={() => handleNav('/banquet')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isBanquetActive ? 'bg-[#FAF5EE] text-gold-dark font-black border border-gold/40' : 'hover:bg-stone-100 text-forest-950'
                }`}
              >
                <span>Banquets & Lawns</span>
                {isBanquetActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
              </button>
            </nav>

            {/* Bottom Section: Action & Hospitality Desk */}
            <div className="p-3.5 border-t border-stone-200/90 bg-[#FAF7F2] space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  playClickSound();
                  onOpenBooking && onOpenBooking();
                }}
                className="w-full py-2.5 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-cinzel font-bold text-[10px] tracking-[0.2em] uppercase transition-all shadow-sm cursor-pointer text-center"
              >
                Reserve A Stay
              </button>

              <p className="text-[9px] font-sans text-center text-stone-500 font-medium">
                Hospitality Desk: <a href="tel:+917607603377" className="text-forest-950 font-bold hover:text-gold-dark">+91 760 760 3377</a>
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
