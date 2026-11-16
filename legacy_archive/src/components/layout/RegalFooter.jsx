import React from 'react';
import { MapPin, Phone, Mail, Compass, ArrowUp, Globe, Share2 } from 'lucide-react';

export default function RegalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-stone-100 text-charcoal pt-20 pb-10 px-4 sm:px-6 overflow-hidden select-none border-t border-stone-300">
      {/* Background Giant Watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[14vw] font-serif font-black uppercase text-stone-200/50 whitespace-nowrap pointer-events-none select-none">
        THE RADIANT
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-300">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo/logo.webp" alt="The Radiant Hotel" className="h-12 w-auto object-contain" />
              <div>
                <h4 className="font-serif font-bold text-xl text-forest-950 tracking-wider uppercase">
                  The Radiant Hotel & Resort
                </h4>
                <p className="text-[10px] tracking-[0.25em] text-gold-dark uppercase font-sans font-bold">
                  Gorakhpur, Uttar Pradesh
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/70 font-sans max-w-sm leading-relaxed">
              Unrivalled hospitality blending regal dignity with modern luxury. Featuring 6 distinct rooms & suites, Malibu rooftop sky dining, and Vedic wellness.
            </p>
            <div className="flex items-center gap-2 text-xs font-sans text-gold-dark font-medium">
              <Compass className="w-4 h-4 text-gold-dark" />
              <span>26.7606° N, 83.3732° E • Elevation 84m</span>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-bold">
              Address & Resort Map
            </p>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-charcoal/80 font-sans">
              <MapPin className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
              <p>
                Medical College Road, near Gularia Thana,<br />
                Kanchanpur Chauraha, Bangai,<br />
                Gorakhpur, Uttar Pradesh — 273013
              </p>
            </div>
            <div className="pt-2 space-y-1 text-xs text-charcoal/80 font-sans">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-dark" />
                <a href="tel:+917607603377" className="hover:text-gold-dark transition-colors">+91 760 760 3377</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-dark" />
                <a href="mailto:resv@theradiant.co.in" className="hover:text-gold-dark transition-colors">resv@theradiant.co.in</a>
              </p>
            </div>
          </div>

          {/* Operating Hours & Privileges */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-bold">
              Concierge Hours
            </p>
            <ul className="text-xs text-charcoal/70 space-y-1.5 font-sans">
              <li>Reception & Concierge: <span className="text-forest-950 font-medium">24 Hours Daily</span></li>
              <li>Malibu Sky Lounge: <span className="text-forest-950 font-medium">5:00 PM – Midnight</span></li>
              <li>The Seven Scentric: <span className="text-forest-950 font-medium">7:00 AM – 11:00 PM</span></li>
              <li>Vedic Wellness Centre: <span className="text-forest-950 font-medium">8:00 AM – 8:00 PM</span></li>
            </ul>

            <div className="pt-3 flex items-center gap-3">
              <a
                href="https://theradiant.co.in"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-gold flex items-center justify-center transition-colors shadow-sm"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="tel:+917607603377"
                className="w-8 h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-gold flex items-center justify-center transition-colors shadow-sm"
                aria-label="Call Concierge"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:resv@theradiant.co.in"
                className="w-8 h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-gold flex items-center justify-center transition-colors shadow-sm"
                aria-label="Email Reservations"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal/50 font-sans">
          <p>© {new Date().getFullYear()} The Radiant Hotel & Resort. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
