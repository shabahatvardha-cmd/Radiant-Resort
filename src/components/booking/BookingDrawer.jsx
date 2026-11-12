import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Sparkles, Check, Phone, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingDrawer({ isOpen, onClose, preselectedSuite }) {
  const [suiteType, setSuiteType] = useState('Grandeur Suite (₹11,499)');
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
    <div className="fixed inset-0 z-[99999] flex justify-end bg-black/75 backdrop-blur-sm select-none">
      <div className="w-full max-w-lg bg-forest-950 text-ivory h-full overflow-y-auto border-l-2 border-gold/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-gold/30 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <h3 className="font-serif font-bold text-2xl text-ivory">VIP Room & Suite Reservation</h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-forest-900 border border-gold/30 text-gold hover:text-ivory flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isBooked ? (
            <form onSubmit={handleConfirm} className="space-y-4">
              {/* Suite Selection */}
              <div>
                <label className="block text-xs font-sans tracking-widest uppercase text-gold font-bold mb-1.5">
                  Select Room or Suite
                </label>
                <select
                  value={suiteType}
                  onChange={(e) => setSuiteType(e.target.value)}
                  className="w-full bg-forest-900 border border-gold/30 rounded-xl px-4 py-2.5 text-sm text-ivory focus:border-gold outline-none"
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
                  <label className="block text-xs font-sans tracking-widest uppercase text-gold font-bold mb-1.5">
                    Duration (Nights)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={nights}
                    onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-forest-900 border border-gold/30 rounded-xl px-4 py-2.5 text-sm text-ivory focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans tracking-widest uppercase text-gold font-bold mb-1.5">
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-forest-900 border border-gold/30 rounded-xl px-4 py-2.5 text-sm text-ivory focus:border-gold outline-none"
                  />
                </div>
              </div>

              {/* VIP Bespoke Add-ons */}
              <div className="p-3.5 rounded-2xl bg-forest-900/70 border border-gold/20 space-y-2.5">
                <span className="text-[10px] tracking-widest uppercase text-gold font-bold font-sans block">
                  Bespoke Royal Inclusions
                </span>
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="text-ivory/80">Dedicated Royal Butler Service</span>
                  <input
                    type="checkbox"
                    checked={butlerService}
                    onChange={(e) => setButlerService(e.target.checked)}
                    className="accent-gold w-4 h-4 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="text-ivory/80">Gorakhpur Airport Luxury Transfer</span>
                  <input
                    type="checkbox"
                    checked={airportPickup}
                    onChange={(e) => setAirportPickup(e.target.checked)}
                    className="accent-gold w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-sans tracking-widest uppercase text-gold font-bold mb-1.5">
                    Primary Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharaja Vikramaditya / Dr. Roy"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-forest-900 border border-gold/30 rounded-xl px-4 py-2.5 text-sm text-ivory focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans tracking-widest uppercase text-gold font-bold mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-forest-900 border border-gold/30 rounded-xl px-4 py-2.5 text-sm text-ivory focus:border-gold outline-none"
                  />
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-4 border-t border-gold/30 flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-gold font-sans font-bold">
                    Estimated Sovereign Total
                  </p>
                  <p className="text-2xl font-serif font-bold text-ivory">
                    ₹{total.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-ivory/50 font-sans">Includes luxury luxury tax & concierge</p>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-gold/30"
                >
                  Request Reservation
                </button>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/20 text-gold border-2 border-gold flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-3xl text-ivory">Room & Suite Reserved</h4>
              <p className="text-sm font-sans text-ivory/80 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-gold font-bold">{guestName}</span>. Your reservation inquiry for <span className="text-gold font-bold">{suiteType.split('(')[0]}</span> ({nights} nights) has been dispatched directly to the Royal Concierge.
              </p>
              <div className="p-4 rounded-2xl bg-forest-900 border border-gold/30 inline-block text-left text-xs space-y-1 font-sans">
                <p className="text-gold font-bold">Reference: #RAD-2026-{Math.floor(1000 + Math.random() * 9000)}</p>
                <p className="text-ivory/70">Concierge Desk: +91 760 760 3377</p>
                <p className="text-ivory/70">Location: Medical College Road, Gorakhpur</p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => {
                    setIsBooked(false);
                    onClose();
                  }}
                  className="px-8 py-3 rounded-full bg-gold text-forest-950 font-sans font-bold text-xs tracking-widest uppercase"
                >
                  Return to Experience
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-gold/20 flex items-center justify-between text-[11px] text-ivory/50 font-sans">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            Verified Property Guarantee
          </span>
          <span>resv@theradiant.co.in</span>
        </div>
      </div>
    </div>
  );
}

