import React, { useEffect, useRef } from 'react';
import {
  X,
  MessageSquare,
  Edit3,
  ArrowRight,
  Check,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { projectBookingConfig } from '../../config/projectBookingConfig';
import DevicePreviews from './DevicePreviews';

/**
 * Compact 3-stage project status timeline (frontend ready, remaining dev not started, launch pending).
 */
function ProjectProgressTracker({ stages, compact = false }) {
  return (
    <div
      className={
        compact
          ? 'rounded-xl bg-[#10201D]/90 border border-[#D6B878]/25 px-2.5 py-2'
          : 'rounded-2xl bg-[#10201D]/90 border border-[#D6B878]/30 px-4 py-3'
      }
      aria-label="Project progress tracker"
    >
      <div className="flex flex-col">
        {stages.map((stage, idx) => {
          const isLast = idx === stages.length - 1;
          const isCompleted = stage.completed;

          return (
            <div key={stage.id} className="relative flex items-start gap-2.5">
              {/* Node + Vertical Connecting Line */}
              <div className="flex flex-col items-center shrink-0">
                <span
                  className={`flex items-center justify-center rounded-full border ${
                    compact ? 'w-4 h-4 mt-0.5' : 'w-5 h-5 mt-0.5'
                  } ${
                    isCompleted
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                      : 'bg-red-500/20 border-red-400 text-red-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className={compact ? 'w-2.5 h-2.5 stroke-[3]' : 'w-3 h-3 stroke-[3]'} />
                  ) : (
                    <span className={compact ? 'w-1.5 h-1.5 rounded-full bg-red-400' : 'w-2 h-2 rounded-full bg-red-400'} />
                  )}
                </span>

                {!isLast && (
                  <span
                    className={`w-[2px] ${compact ? 'h-3' : 'h-4'} ${
                      isCompleted ? 'bg-emerald-400/70' : 'bg-red-400/35'
                    }`}
                  />
                )}
              </div>

              {/* Stage Label + Status Badge */}
              <div
                className={`flex-1 flex items-center justify-between gap-2 ${
                  !isLast ? (compact ? 'pb-1.5' : 'pb-2') : ''
                }`}
              >
                <span
                  className={`font-sans font-semibold leading-tight ${
                    compact ? 'text-[10.5px]' : 'text-xs'
                  } ${isCompleted ? 'text-stone-100' : 'text-stone-300'}`}
                >
                  {stage.label}
                </span>
                <span
                  className={`font-sans font-bold uppercase tracking-wider shrink-0 ${
                    compact ? 'text-[9px]' : 'text-[10px]'
                  } ${isCompleted ? 'text-emerald-400' : 'text-red-400'}`}
                >
                  {stage.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Red preview-deadline notice displayed outside the progress tracker.
 */
function PreviewDeadlineNotice({ deadlineDate, policyText, compact = false }) {
  return (
    <div
      className={
        compact
          ? 'rounded-xl bg-red-950/60 border border-red-500/50 px-2.5 py-1.5 text-left'
          : 'rounded-2xl bg-red-950/55 border border-red-500/50 px-3.5 py-2.5 text-left'
      }
    >
      <div
        className={`flex items-center gap-1.5 font-sans font-extrabold uppercase tracking-wider text-red-300 ${
          compact ? 'text-[9.5px]' : 'text-[11px]'
        }`}
      >
        <AlertTriangle className={compact ? 'w-3 h-3 text-red-400 shrink-0' : 'w-3.5 h-3.5 text-red-400 shrink-0'} />
        <span>PREVIEW DEADLINE: {deadlineDate}</span>
      </div>
      <p
        className={`font-sans text-red-100/90 leading-snug mt-0.5 ${
          compact ? 'text-[9px]' : 'text-[11px]'
        }`}
      >
        {policyText}
      </p>
    </div>
  );
}

/**
 * ProjectPreviewPopup: Client website preview & activation modal.
 * Adapts to desktop (>=768px) with a balanced 2-column layout and mobile (<768px)
 * with all essential elements visible above the fold at 375x667 and 403x704 without scrolling.
 */
export default function ProjectPreviewPopup({ isOpen, onClose, currentPath = '/' }) {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Manage focus restoration on open/close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 20);
      return () => clearTimeout(timer);
    } else if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

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

  const {
    projectName,
    copy,
    progressStages,
    previewDeadlineDate,
    primaryAction,
    secondaryAction,
  } = projectBookingConfig;

  const primaryUrl = projectBookingConfig.getWhatsAppUrl('primary');
  const secondaryUrl = projectBookingConfig.getWhatsAppUrl('secondary');

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md select-none transition-opacity duration-200 motion-reduce:transition-none"
      style={{
        paddingTop: 'max(0.5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-popup-title"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] md:max-w-4xl lg:max-w-5xl max-h-[97dvh] bg-gradient-to-b from-[#0F1E1B] via-[#0B1614] to-[#08100E] border border-[#D6B878]/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] ring-1 ring-white/10 text-stone-100 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Subtle Ambient Gold Gradient Orbs */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#D6B878]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#172D29]/50 rounded-full blur-3xl pointer-events-none" />

        {/* ----------------- MOBILE LAYOUT (<md): ALL KEY CONTENT WITHOUT SCROLLING ----------------- */}
        <div className="flex flex-col justify-between w-full px-3 py-2.5 gap-1.5 md:hidden">
          {/* 1. Compact Header with Brand Logo & Close Button */}
          <div className="flex items-center justify-between pb-1 border-b border-[#D6B878]/25 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src="/logo/logo.webp"
                alt={projectName}
                className="h-5 w-auto object-contain shrink-0"
              />
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D6B878]/15 border border-[#D6B878]/40 text-[#D6B878] text-[9px] font-bold font-sans uppercase tracking-[0.16em] truncate">
                {copy.eyebrow}
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B878]"
              aria-label="Close preview dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Both Laptop & Phone Previews Side by Side Near Top */}
          <div className="shrink-0">
            <DevicePreviews currentPath={currentPath} isMobileCompact={true} />
          </div>

          {/* 3. Headline & Concise Supporting Text */}
          <div className="text-center px-1 shrink-0">
            <h2
              id="preview-popup-title"
              className="text-sm sm:text-base font-serif font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4EFE5] to-[#D6B878] tracking-tight leading-tight"
            >
              {copy.headline}
            </h2>
            <p className="text-[10.5px] font-sans text-stone-300 leading-snug mt-0.5">
              {copy.supporting}
            </p>
          </div>

          {/* 4. 3-Stage Project Progress Tracker */}
          <div className="shrink-0">
            <ProjectProgressTracker stages={progressStages} compact={true} />
          </div>

          {/* 5. Red Preview Deadline Notice */}
          <div className="shrink-0">
            <PreviewDeadlineNotice
              deadlineDate={previewDeadlineDate}
              policyText={copy.deadlinePolicy}
              compact={true}
            />
          </div>

          {/* 6. Primary & Secondary WhatsApp Actions */}
          <div className="flex flex-col gap-1.5 pt-0.5 shrink-0">
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-full bg-gradient-to-r from-[#D6B878] via-[#CBB490] to-[#B38738] hover:brightness-110 text-forest-950 font-sans font-extrabold text-[11px] uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] motion-reduce:transition-none"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>{primaryAction.label}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </a>

            <a
              href={secondaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-[#D6B878]/40 text-stone-200 hover:text-white font-sans font-semibold text-[10.5px] tracking-wide text-center flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] motion-reduce:transition-none"
            >
              <Edit3 className="w-3 h-3 text-[#D6B878] shrink-0" />
              <span>{secondaryAction.label}</span>
            </a>
          </div>
        </div>

        {/* ----------------- DESKTOP LAYOUT (>=md): BALANCED TWO-COLUMN ----------------- */}
        <div className="hidden md:flex w-full items-stretch p-6 lg:p-7 gap-6 lg:gap-8">
          {/* Close Button Top-Right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B878]"
            aria-label="Close preview dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Device Previews Stage */}
          <div className="w-[50%] lg:w-[52%] flex flex-col justify-center items-center relative border-r border-[#D6B878]/20 pr-5 lg:pr-7 shrink-0">
            <div className="w-full flex items-center justify-between mb-3">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#D6B878] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B878]" />
                {projectName}
              </span>
              <span className="text-[10px] font-sans font-semibold text-stone-400">
                Desktop & Mobile
              </span>
            </div>

            <DevicePreviews currentPath={currentPath} isMobileCompact={false} />
          </div>

          {/* Right Column: Status Tracker, Headline, Deadline & Actions */}
          <div className="w-[50%] lg:w-[48%] flex flex-col justify-between space-y-3.5 pr-2">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6B878]/15 border border-[#D6B878]/40 text-[#D6B878] text-[11px] font-bold font-sans uppercase tracking-[0.18em]">
                <img
                  src="/logo/logo.webp"
                  alt=""
                  className="h-3.5 w-auto object-contain"
                />
                <span>{copy.eyebrow}</span>
              </div>

              <h2 className="text-2xl lg:text-[26px] font-serif font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4EFE5] to-[#D6B878] tracking-tight leading-tight">
                {copy.headline}
              </h2>

              <p className="text-xs lg:text-[13px] font-sans text-stone-300 leading-relaxed">
                {copy.supporting}
              </p>
            </div>

            {/* 3-Stage Project Progress Tracker */}
            <ProjectProgressTracker stages={progressStages} compact={false} />

            {/* Red Preview Deadline Notice */}
            <PreviewDeadlineNotice
              deadlineDate={previewDeadlineDate}
              policyText={copy.deadlinePolicy}
              compact={false}
            />

            {/* Primary & Secondary WhatsApp Actions */}
            <div className="space-y-2 pt-0.5">
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#D6B878] via-[#CBB490] to-[#B38738] hover:brightness-110 text-forest-950 font-sans font-extrabold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer motion-reduce:transition-none"
              >
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href={secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-5 rounded-full bg-white/5 hover:bg-white/10 border border-[#D6B878]/40 text-stone-200 hover:text-white font-sans font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer motion-reduce:transition-none"
              >
                <Edit3 className="w-4 h-4 text-[#D6B878] shrink-0" />
                <span>{secondaryAction.label}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
