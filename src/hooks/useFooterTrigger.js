import { useEffect, useRef } from 'react';

/**
 * useFooterTrigger: Robust, responsive scroll-to-footer detection hook.
 *
 * Requirements:
 * 1. Does not trigger immediately on page load.
 * 2. Triggers when visitor scrolls downward and the real footer starts entering viewport.
 * 3. Does not re-trigger while visitor stays near the footer.
 * 4. Re-arms when visitor scrolls upward until footer leaves the trigger area.
 * 5. Re-opens when visitor scrolls down again into the footer.
 * 6. Resets trigger state on route change.
 * 7. Completely deactivates inside iframe preview mode.
 */
export default function useFooterTrigger({ onTrigger, isOpen, pathname }) {
  const isArmedRef = useRef(true);
  const hasScrolledDownRef = useRef(false);
  const lastScrollDirectionRef = useRef(null);
  const lastTouchYRef = useRef(null);
  const lastScrollTopRef = useRef(0);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Reset trigger state on route change
  useEffect(() => {
    isArmedRef.current = true;
    hasScrolledDownRef.current = false;
    lastScrollDirectionRef.current = null;
    lastTouchYRef.current = null;
    lastScrollTopRef.current = 0;
  }, [pathname]);

  useEffect(() => {
    // Suppress trigger completely if inside an iframe or preview mode
    if (typeof window === 'undefined') return;
    const isInsideIframe = window.self !== window.top;
    const isPreviewParam = window.location.search.includes('preview=true');
    if (isInsideIframe || isPreviewParam) {
      return;
    }

    let rafId = null;

    const checkFooter = () => {
      // Do not open if already open
      if (isOpenRef.current) return;

      const footer = document.querySelector('footer[data-resort-footer="true"], [data-resort-footer="true"]');
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (!footer) {
        // Footer not present in DOM (or scrolled past/unmounted)
        if (lastScrollDirectionRef.current === 'up') {
          isArmedRef.current = true;
        }
        return;
      }

      const rect = footer.getBoundingClientRect();
      const style = window.getComputedStyle(footer);
      const isDisplayed =
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        parseFloat(style.opacity || '1') > 0.05;

      // Entering trigger area: top of footer enters bottom of visible viewport
      const isInView = isDisplayed && rect.top < windowHeight - 15 && rect.bottom > 20 && rect.height > 10;

      // Leaving trigger area: footer moved back down below visible screen
      const hasLeft = !isDisplayed || rect.top >= windowHeight - 5;

      if (isInView) {
        // Must be scrolling downward, have performed a downward scroll, and trigger is armed
        if (
          isArmedRef.current &&
          lastScrollDirectionRef.current === 'down' &&
          hasScrolledDownRef.current
        ) {
          isArmedRef.current = false;
          onTrigger();
        }
      } else if (hasLeft) {
        // Re-arm only after scrolling upward enough that footer leaves trigger area
        if (lastScrollDirectionRef.current === 'up') {
          isArmedRef.current = true;
        }
      }
    };

    const scheduleCheck = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkFooter);
    };

    // Wheel listener (Desktop mouse / trackpad)
    const handleWheel = (e) => {
      if (e.deltaY > 1) {
        lastScrollDirectionRef.current = 'down';
        hasScrolledDownRef.current = true;
      } else if (e.deltaY < -1) {
        lastScrollDirectionRef.current = 'up';
      }
      scheduleCheck();
    };

    // Touch listener (Mobile devices)
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        lastTouchYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0 || lastTouchYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const diff = lastTouchYRef.current - currentY; // positive diff = swiping up = scrolling down

      if (diff > 3) {
        lastScrollDirectionRef.current = 'down';
        hasScrolledDownRef.current = true;
      } else if (diff < -3) {
        lastScrollDirectionRef.current = 'up';
      }
      lastTouchYRef.current = currentY;
      scheduleCheck();
    };

    // Scroll listener for standard & container scrolling
    const handleScroll = (e) => {
      const target =
        e.target === document || e.target === window
          ? document.scrollingElement || document.documentElement
          : e.target;
      const currentScrollTop = target?.scrollTop || window.scrollY || 0;

      if (currentScrollTop > lastScrollTopRef.current + 2) {
        lastScrollDirectionRef.current = 'down';
        hasScrolledDownRef.current = true;
      } else if (currentScrollTop < lastScrollTopRef.current - 2) {
        lastScrollDirectionRef.current = 'up';
      }
      lastScrollTopRef.current = currentScrollTop;
      scheduleCheck();
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        lastScrollDirectionRef.current = 'down';
        hasScrolledDownRef.current = true;
        scheduleCheck();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        lastScrollDirectionRef.current = 'up';
        scheduleCheck();
      }
    };

    // Periodic check interval to support requestAnimationFrame-driven smooth spatial transitions
    const intervalId = setInterval(checkFooter, 200);

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pathname, onTrigger]);
}
