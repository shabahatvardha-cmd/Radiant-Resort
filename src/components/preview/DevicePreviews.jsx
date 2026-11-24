import React, { useState, useEffect, useRef } from 'react';

/**
 * DevicePreviews: Renders a landscape Laptop and a portrait generic notch-free Phone.
 * Both devices run the project's real website with uniform scaling, aspect ratio preservation,
 * and preview isolation so nested popups cannot be triggered.
 */
export default function DevicePreviews({ currentPath = '/', isMobileCompact = false }) {
  const [origin, setOrigin] = useState('');
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const laptopScreenRef = useRef(null);
  const phoneScreenRef = useRef(null);
  const [laptopScale, setLaptopScale] = useState(0.25);
  const [phoneScale, setPhoneScale] = useState(0.18);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  // Measure containers to calculate precise uniform scaling factors
  useEffect(() => {
    const updateScales = () => {
      if (laptopScreenRef.current) {
        const width = laptopScreenRef.current.clientWidth;
        if (width > 0) {
          // Logical desktop viewport: 1280 x 800
          setLaptopScale(width / 1280);
        }
      }
      if (phoneScreenRef.current) {
        const width = phoneScreenRef.current.clientWidth;
        if (width > 0) {
          // Logical mobile viewport: 390 x 844
          setPhoneScale(width / 390);
        }
      }
    };

    updateScales();
    const ro = new ResizeObserver(updateScales);
    if (laptopScreenRef.current) ro.observe(laptopScreenRef.current);
    if (phoneScreenRef.current) ro.observe(phoneScreenRef.current);

    window.addEventListener('resize', updateScales);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScales);
    };
  }, [isMobileCompact]);

  // Construct isolated preview URL with current SPA route
  const previewPath = hasError ? '/' : (currentPath || '/');
  const previewUrl = origin ? `${origin}${previewPath}${previewPath.includes('?') ? '&' : '?'}preview=true` : '';

  return (
    <div
      className={`relative w-full flex items-center justify-center select-none ${
        isMobileCompact
          ? 'flex-row gap-2.5 sm:gap-4 my-1.5'
          : 'flex-row gap-4 lg:gap-6 py-2'
      }`}
    >
      {/* =========================================================================
          1. LANDSCAPE LAPTOP MOCKUP (DESKTOP PREVIEW)
         ========================================================================= */}
      <div
        className={`relative flex flex-col items-center shrink-0 ${
          isMobileCompact
            ? 'w-[56%] max-w-[210px]'
            : 'w-[62%] max-w-[440px]'
        }`}
      >
        {/* Laptop Lid / Screen Outer Frame */}
        <div className="relative w-full bg-[#181d1c] border border-[#3b4742] rounded-t-xl sm:rounded-t-2xl p-1 sm:p-2 shadow-[0_15px_35px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
          {/* Subtle Top Bezel Webcam Dot (centered in bezel, NEVER cutting into screen) */}
          <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0a0d0c] border border-[#2b3330] flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-[#354f48]" />
          </div>

          {/* Inner Screen Display Area (16:10 Aspect Ratio) */}
          <div
            ref={laptopScreenRef}
            className="relative w-full aspect-[16/10] bg-[#0B1614] rounded-sm sm:rounded overflow-hidden shadow-inner"
          >
            {/* Shimmering Gold Loading State */}
            {!desktopLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1614] via-[#172D29] to-[#0B1614] text-center p-2">
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-[#D6B878]/30 border-t-[#D6B878] animate-spin mb-1 sm:mb-2" />
                <span className="text-[8px] sm:text-[10px] font-sans font-bold uppercase tracking-widest text-[#D6B878]/90">
                  Loading Desktop View
                </span>
              </div>
            )}

            {/* Scaled Desktop Iframe */}
            {previewUrl && (
              <iframe
                src={previewUrl}
                title="The Radiant Desktop Website Preview"
                onLoad={() => setDesktopLoaded(true)}
                onError={() => {
                  setHasError(true);
                  setDesktopLoaded(true);
                }}
                className="absolute top-0 left-0 border-0 pointer-events-none origin-top-left"
                style={{
                  width: '1280px',
                  height: '800px',
                  transform: `scale(${laptopScale})`,
                  opacity: desktopLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
            )}
          </div>
        </div>

        {/* Laptop Bottom Chassis / Base */}
        <div className="relative w-[108%] h-2 sm:h-3 bg-gradient-to-b from-[#2e3633] via-[#202724] to-[#151a18] rounded-b-md sm:rounded-b-lg border-t border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.7)] flex items-start justify-center">
          {/* Trackpad Thumb Notch */}
          <div className="w-8 sm:w-14 h-0.5 sm:h-1 bg-[#0c100f] rounded-b" />
        </div>
      </div>

      {/* =========================================================================
          2. PORTRAIT PHONE MOCKUP (RESPONSIVE MOBILE PREVIEW) - NOTCH-FREE
         ========================================================================= */}
      <div
        className={`relative flex flex-col items-center shrink-0 ${
          isMobileCompact
            ? 'w-[24%] max-w-[88px]'
            : 'w-[28%] max-w-[150px]'
        }`}
      >
        {/* Sleek Generic Notch-Free Phone Chassis */}
        <div className="relative w-full bg-[#181d1c] border border-[#3b4742] rounded-[14px] sm:rounded-[24px] p-1 sm:p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
          {/* Inner Screen Display Area (390 x 844 Logical Ratio) - Completely Notch-Free */}
          <div
            ref={phoneScreenRef}
            className="relative w-full aspect-[390/844] bg-[#0B1614] rounded-[10px] sm:rounded-[18px] overflow-hidden shadow-inner"
          >
            {/* Shimmering Gold Loading State */}
            {!mobileLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1614] via-[#172D29] to-[#0B1614] text-center p-1">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-[#D6B878]/30 border-t-[#D6B878] animate-spin mb-1" />
                <span className="text-[7px] sm:text-[9px] font-sans font-bold uppercase tracking-wider text-[#D6B878]/90">
                  Mobile View
                </span>
              </div>
            )}

            {/* Scaled Mobile Responsive Iframe */}
            {previewUrl && (
              <iframe
                src={previewUrl}
                title="The Radiant Mobile Website Preview"
                onLoad={() => setMobileLoaded(true)}
                onError={() => {
                  setHasError(true);
                  setMobileLoaded(true);
                }}
                className="absolute top-0 left-0 border-0 pointer-events-none origin-top-left"
                style={{
                  width: '390px',
                  height: '844px',
                  transform: `scale(${phoneScale})`,
                  opacity: mobileLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
