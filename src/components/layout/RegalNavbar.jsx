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
  const isBanquetActive = location.pathname === '/banquet';

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
                  navigate('/');
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

          {/* Mobile Right: Light Book Button */}
          <div className="lg:hidden flex items-center gap-2 z-10">
            <button
              onClick={() => {
                playClickSound();
                onOpenBooking && onOpenBooking();
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#FAF5EE] hover:bg-gold text-forest-950 font-cinzel font-bold text-[10.5px] tracking-[0.18em] uppercase border border-gold/60 shadow-sm transition-colors cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Imperial Roman Cinzel Theme) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col justify-center items-center gap-4 sm:gap-6 p-6 sm:p-8 text-center text-forest-950 font-cinzel text-lg sm:text-2xl font-bold uppercase tracking-[0.15em] shadow-2xl overflow-y-auto max-h-[100dvh]">
          <button
            onClick={() => handleNav('/')}
            className={`hover:text-gold-dark transition-colors cursor-pointer ${isOverviewActive ? 'text-gold-dark font-bold' : ''
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNav('/rooms')}
            className={`hover:text-gold-dark transition-colors flex items-center gap-2 cursor-pointer ${isRoomsActive ? 'text-gold-dark font-bold' : ''
              }`}
          >
            <Sparkles className="w-5 h-5 text-gold-dark" />
            Rooms & Suites
          </button>
          <button
            onClick={() => handleNav('/wellness')}
            className={`hover:text-gold-dark transition-colors cursor-pointer ${isSpaActive ? 'text-gold-dark font-bold' : ''
              }`}
          >
            Salon & Spa
          </button>
          <button
            onClick={() => handleNav('/malibu')}
            className={`hover:text-gold-dark transition-colors cursor-pointer ${isMalibuActive ? 'text-gold-dark font-bold' : ''
              }`}
          >
            Malibu Rooftop
          </button>
          <button
            onClick={() => handleNav('/dining')}
            className={`hover:text-gold-dark transition-colors cursor-pointer ${isDiningActive ? 'text-gold-dark font-bold' : ''
              }`}
          >
            The Seven Scentric Dining
          </button>
          <button
            onClick={() => handleNav('/banquet')}
            className={`hover:text-gold-dark transition-colors cursor-pointer ${isBanquetActive ? 'text-gold-dark font-bold' : ''
              }`}
          >
            Banquet & Celebrations
          </button>

          <div className="pt-4 border-t-2 border-stone-200 w-full max-w-xs flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                playClickSound();
                onOpenBooking && onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-forest-950 text-gold font-cinzel font-bold text-xs tracking-[0.22em] uppercase shadow-md cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
