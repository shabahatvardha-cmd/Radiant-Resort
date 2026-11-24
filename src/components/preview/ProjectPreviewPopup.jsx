import React, { useEffect, useRef } from 'react';
import { X, Sparkles, MessageSquare, Edit3, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { projectBookingConfig } from '../../config/projectBookingConfig';
import DevicePreviews from './DevicePreviews';

/**
 * ProjectPreviewPopup: High-conversion client review and kickoff deposit modal.
 * Built to adapt flawlessly to desktop and mobile viewports (specifically 375x667 and 403x704),
 * ensuring both previews and all essential elements remain visible without internal scrolling.
 */
export default function ProjectPreviewPopup({ isOpen, onClose, currentPath = '/' }) {
  const dialogRef = useRef(null);

  // Keyboard accessibility (Escape key to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background body scroll when popup is active
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const { copy, primaryAction, secondaryAction } = projectBookingConfig;
  const primaryUrl = projectBookingConfig.getWhatsAppUrl('primary');
  const secondaryUrl = projectBookingConfig.getWhatsAppUrl('secondary');

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md select-none transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-popup-title"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] md:max-w-4xl lg:max-w-5xl max-h-[96dvh] bg-gradient-to-b from-[#0F1E1B] via-[#0B1614] to-[#08100E] border border-[#D6B878]/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] ring-1 ring-white/10 text-stone-100 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Subtle Ambient Gold Gradient Orbs */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#D6B878]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#172D29]/50 rounded-full blur-3xl pointer-events-none" />

        {/* =========================================================================
            DESKTOP & MOBILE INTEGRATED LAYOUT
            - Mobile (<768px): Tailored compact layout displaying all 8 elements above fold.
            - Desktop (>=768px): Balanced 2-column composition with device stage & info.
           ========================================================================= */}

        {/* ----------------- MOBILE LAYOUT (<md) ----------------- */}
        <div className="flex flex-col justify-between w-full p-3 sm:p-4 md:hidden">
          {/* Element 1 & 2: Header with Eyebrow and Close Button */}
          <div className="flex items-center justify-between pb-1 border-b border-[#D6B878]/25 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D6B878]/15 border border-[#D6B878]/40 text-[#D6B878] text-[9.5px] font-bold font-sans uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3 text-[#D6B878]" />
              <span>{copy.eyebrow}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close preview dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Element 3: Both Laptop & Phone Previews Side by Side Near Top */}
          <div className="shrink-0 my-0.5">
            <DevicePreviews currentPath={currentPath} isMobileCompact={true} />
          </div>

          {/* Element 4 & 5: Headline & One Short Supporting Sentence */}
          <div className="text-center px-1 my-1 shrink-0 space-y-0.5">
            <h2
              id="preview-popup-title"
              className="text-sm sm:text-base font-serif font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4EFE5] to-[#D6B878] tracking-tight leading-tight"
            >
              {copy.headline}
            </h2>
            <p className="text-[11px] font-sans text-stone-300 leading-snug">
              {copy.supporting}
            </p>
          </div>

          {/* Element 6: 50% Kickoff Payment Information Card */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-[#142622]/90 border border-[#D6B878]/35 my-1 text-center shrink-0 shadow-inner">
            <div className="flex items-center justify-center gap-1.5 text-[9px] font-sans font-bold uppercase tracking-widest text-[#D6B878]">
              <ShieldCheck className="w-3 h-3 text-[#D6B878]" />
              <span>{copy.bookingHeading} • {copy.bookingLabel}</span>
            </div>
            <div className="text-sm sm:text-base font-serif font-black text-white my-0.5 tracking-tight">
              {copy.amount}
            </div>
            <p className="text-[9.5px] font-sans text-stone-300/90 leading-tight">
              {copy.paymentNote}
            </p>
          </div>

          {/* Element 7 & 8: The Two Distinct WhatsApp Action Buttons */}
          <div className="flex flex-col gap-1.5 pt-1 shrink-0">
            {/* Primary Action: Discuss Proceeding */}
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-full bg-gradient-to-r from-[#D6B878] via-[#CBB490] to-[#B38738] hover:brightness-110 text-forest-950 font-sans font-black text-[11.5px] uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>{primaryAction.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Secondary Action: Request Changes */}
            <a
              href={secondaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-[#D6B878]/40 text-stone-200 hover:text-white font-sans font-semibold text-[10.5px] tracking-wide text-center flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#D6B878]" />
              <span>{secondaryAction.label}</span>
            </a>
          </div>
        </div>

        {/* ----------------- DESKTOP LAYOUT (>=md) ----------------- */}
        <div className="hidden md:flex w-full items-stretch p-6 lg:p-8 gap-6 lg:gap-10">
          {/* Close Button Top-Right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
            aria-label="Close preview dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Device Previews Stage */}
          <div className="w-[52%] lg:w-[54%] flex flex-col justify-center items-center relative border-r border-[#D6B878]/20 pr-4 lg:pr-8">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#D6B878] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B878]" />
                Live Frontend Responsive Render
              </span>
              <span className="text-[10px] font-sans font-semibold text-stone-400">
                Desktop & Mobile
              </span>
            </div>

            {/* Laptop & Phone Previews */}
            <DevicePreviews currentPath={currentPath} isMobileCompact={false} />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="w-[48%] lg:w-[46%] flex flex-col justify-between pl-2 lg:pl-4 space-y-4">
            <div className="space-y-3">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6B878]/15 border border-[#D6B878]/40 text-[#D6B878] text-xs font-bold font-sans uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 text-[#D6B878]" />
                <span>{copy.eyebrow}</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl lg:text-3xl font-serif font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4EFE5] to-[#D6B878] tracking-tight leading-tight">
                {copy.headline}
              </h2>

              {/* Supporting Text */}
              <p className="text-xs lg:text-sm font-sans text-stone-300 leading-relaxed font-medium">
                {copy.supporting}
              </p>
            </div>

            {/* 50% Kickoff Payment Information Card */}
            <div className="p-4 rounded-2xl bg-[#142622]/90 border border-[#D6B878]/40 shadow-inner space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-[#D6B878]">
                <ShieldCheck className="w-4 h-4 text-[#D6B878]" />
                <span>{copy.bookingHeading}</span>
              </div>
              <div className="text-[11px] font-sans font-semibold uppercase tracking-wider text-stone-300">
                {copy.bookingLabel}
              </div>
              <div className="text-xl lg:text-2xl font-serif font-black text-white tracking-tight">
                {copy.amount}
              </div>
              <p className="text-xs font-sans text-stone-300/90 leading-relaxed pt-1">
                {copy.paymentNote}
              </p>
            </div>

            {/* Two WhatsApp Actions */}
            <div className="space-y-2.5 pt-1">
              {/* Primary Action */}
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#D6B878] via-[#CBB490] to-[#B38738] hover:brightness-110 text-forest-950 font-sans font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary Action */}
              <a
                href={secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-5 rounded-full bg-white/5 hover:bg-white/10 border border-[#D6B878]/40 text-stone-200 hover:text-white font-sans font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-[#D6B878]" />
                <span>{secondaryAction.label}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
