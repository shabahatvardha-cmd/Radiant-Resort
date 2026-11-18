import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Phone, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingDrawer({ isOpen, onClose, preselectedSuite }) {
  const [suiteType, setSuiteType] = useState('Grandeur Room (₹8,999)');
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [butlerService, setButlerService] = useState(true);
  const [airportPickup, setAirportPickup] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (preselectedSuite) {
      setSuiteType(`${preselectedSuite.name} (${preselectedSuite.price})`);
    }
  }, [preselectedSuite]);

  // Lock background scrolling and make page completely immovable while form is open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocOverflow = document.documentElement.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      const preventBackgroundScroll = (e) => {
        const modal = document.getElementById('booking-modal-card');
        if (modal && modal.contains(e.target)) {
          return; // Allow scrolling inside the modal card if needed
        }
        e.preventDefault();
      };

      window.addEventListener('wheel', preventBackgroundScroll, { passive: false });
      window.addEventListener('touchmove', preventBackgroundScroll, { passive: false });

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocOverflow;
        document.body.style.touchAction = originalTouchAction;
        window.removeEventListener('wheel', preventBackgroundScroll);
        window.removeEventListener('touchmove', preventBackgroundScroll);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const baseRate = parseInt(suiteType.replace(/\D/g, '') || '8999', 10);
  const addOns = (butlerService ? 1500 : 0) + (airportPickup ? 2000 : 0);
  const total = baseRate * nights + addOns;

  const handleConfirm = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#B69A70', '#EAE5D9', '#172D29', '#D4AF37'],
    });
    setIsBooked(true);
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md select-none overflow-y-auto scrollbar-none animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        id="booking-modal-card"
        className="w-full max-w-lg max-h-[92vh] max-h-[92dvh] bg-[#FAF5EE] text-forest-950 rounded-3xl overflow-y-auto scrollbar-none border-2 border-gold/40 shadow-2xl p-4 sm:p-7 flex flex-col justify-between my-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-stone-200 pb-3.5 mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-dark" />
              <h3 className="font-serif font-black text-xl sm:text-2xl text-forest-950">
                VIP Room Reservation
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-gold hover:text-forest-950 text-forest-950 flex items-center justify-center transition-all border border-stone-300 shadow-sm"
              aria-label="Close booking modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!isBooked ? (
            <form onSubmit={handleConfirm} className="space-y-4">
              {/* Suite Selection */}
              <div>
                <label className="block text-[11px] font-sans tracking-widest uppercase text-gold-dark font-black mb-1.5">
                  Select Room or Suite
                </label>
                <select
                  value={suiteType}
                  onChange={(e) => setSuiteType(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-forest-950 font-medium focus:border-gold-dark focus:ring-1 focus:ring-gold outline-none shadow-sm transition-all"
                >
                  <option value="Deluxe Room (Pool View & Balcony) (₹4,999)">Deluxe Room (Pool View with Balcony) — ₹4,999 / night</option>
                  <option value="Executive Room (₹5,499)">Executive Room — ₹5,499 / night</option>
                  <option value="Executive Suite Room (₹7,499)">Executive Suite Room — ₹7,499 / night</option>
                  <option value="Deluxe Suite Room (₹6,499)">Deluxe Suite Room — ₹6,499 / night</option>
                  <option value="Grandeur Room (₹8,999)">Grandeur Room — ₹8,999 / night</option>
                  <option value="Standard Room (₹3,499)">Standard Room — ₹3,499 / night</option>
                  <option value="Malibu Sky Cabana & Nightlife (₹5,999)">Malibu Sky Cabana & Nightlife — ₹5,999 / booking</option>
                  <option value="The Seven Scentric Fine Dining (₹2,499)">The Seven Scentric Fine Dining — Table Reserve</option>
                  <option value="Vedic Spa & Salon Package (₹3,999)">Vedic Spa & Salon Wellness Package — ₹3,999</option>
                </select>
              </div>

              {/* Nights & Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-sans tracking-widest uppercase text-gold-dark font-black mb-1.5">
                    Duration (Nights)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={nights}
                    onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-forest-950 font-medium focus:border-gold-dark focus:ring-1 focus:ring-gold outline-none shadow-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans tracking-widest uppercase text-gold-dark font-black mb-1.5">
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-forest-950 font-medium focus:border-gold-dark focus:ring-1 focus:ring-gold outline-none shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* VIP Bespoke Add-ons */}
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2.5">
                <span className="text-[10px] tracking-widest uppercase text-gold-dark font-black font-sans block">
                  Bespoke Royal Inclusions
                </span>
                <label className="flex items-center justify-between text-xs cursor-pointer font-medium text-stone-700 hover:text-forest-950 transition-colors">
                  <span>Dedicated Royal Butler Service (+₹1,500)</span>
                  <input
                    type="checkbox"
                    checked={butlerService}
                    onChange={(e) => setButlerService(e.target.checked)}
                    className="accent-gold w-4 h-4 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between text-xs cursor-pointer font-medium text-stone-700 hover:text-forest-950 transition-colors">
                  <span>Gorakhpur Airport Luxury Transfer (+₹2,000)</span>
                  <input
                    type="checkbox"
                    checked={airportPickup}
                    onChange={(e) => setAirportPickup(e.target.checked)}
                    className="accent-gold w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-sans tracking-widest uppercase text-gold-dark font-black mb-1.5">
                    Primary Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharaja Vikramaditya / Dr. Roy"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-forest-950 placeholder-stone-400 font-medium focus:border-gold-dark focus:ring-1 focus:ring-gold outline-none shadow-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans tracking-widest uppercase text-gold-dark font-black mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-forest-950 placeholder-stone-400 font-medium focus:border-gold-dark focus:ring-1 focus:ring-gold outline-none shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-3.5 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-gold-dark font-sans font-black">
                    Estimated Sovereign Total
                  </p>
                  <p className="text-xl sm:text-2xl font-serif font-black text-forest-950">
                    ₹{total.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-stone-500 font-sans">Includes luxury luxury tax & concierge</p>
                </div>

                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-sans font-black text-[11px] sm:text-xs tracking-wider uppercase transition-all shadow-md hover:scale-105"
                >
                  Request Reservation
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/20 text-gold-dark border-2 border-gold flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">Room Reserved</h4>
              <p className="text-sm font-sans text-stone-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-gold-dark font-black">{guestName}</span>. Your reservation inquiry for <span className="text-gold-dark font-black">{suiteType.split('(')[0]}</span> ({nights} nights) has been dispatched directly to the Royal Concierge.
              </p>
              <div className="p-4 rounded-2xl bg-white border border-stone-200 inline-block text-left text-xs space-y-1 font-sans shadow-sm">
                <p className="text-gold-dark font-black">Reference: #RAD-2026-{Math.floor(1000 + Math.random() * 9000)}</p>
                <p className="text-stone-600 font-medium">Concierge Desk: +91 760 760 3377</p>
                <p className="text-stone-600 font-medium">Location: Medical College Road, Gorakhpur</p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsBooked(false);
                    onClose();
                  }}
                  className="px-8 py-3 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-sans font-black text-xs tracking-widest uppercase transition-all shadow-md"
                >
                  Return to Experience
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 mt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500 font-sans">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
            Verified Property Guarantee
          </span>
          <span className="font-medium">resv@theradiant.co.in</span>
        </div>
      </div>
    </div>
  );
}
