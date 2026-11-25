import { useEffect, useRef } from 'react';

/**
 * useFooterTrigger: Robust, responsive scroll-to-footer detection hook.
 *
 * Requirements:
 * 1. Does not trigger immediately on page load (even on short pages where footer is visible).
 * 2. Triggers when visitor scrolls downward and the real footer starts entering viewport.
 * 3. Does not re-trigger while visitor stays near the footer or popup is already open.
 * 4. Re-arms when visitor scrolls upward until footer leaves the trigger area.
 * 5. Re-opens when visitor scrolls down again into the footer.
 * 6. Resets trigger state independently on route change.
 * 7. Completely deactivates inside iframe preview mode or when disabled via feature flag.
 */
export default function useFooterTrigger({ onTrigger, isOpen, pathname, enabled = true }) {
  const isArmedRef = useRef(true);
  const hasScrolledDownRef = useRef(false);
  const lastScrollDirectionRef = useRef(null);
  const lastTouchYRef = useRef(null);
  const lastScrollTopMapRef = useRef(new WeakMap());
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Reset trigger state independently on every route change
  useEffect(() => {
    isArmedRef.current = true;
    hasScrolledDownRef.current = false;
    lastScrollDirectionRef.current = null;
    lastTouchYRef.current = null;
    lastScrollTopMapRef.current = new WeakMap();
  }, [pathname]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Suppress trigger completely inside an iframe or preview mode
    const isInsideIframe = window.self !== window.top;
    const isPreviewParam = window.location.search.includes('preview=true');
    if (isInsideIframe || isPreviewParam) {
      return;
    }

    let rafId = null;

    const checkFooter = () => {
      if (isOpenRef.current) return;

      const footer = document.querySelector('footer[data-resort-footer="true"], [data-resort-footer="true"]');
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (!footer) {
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

      // Leaving trigger area: footer moved back down below visible screen or faded out
      const hasLeft = !isDisplayed || rect.top >= windowHeight - 5;

      if (isInView) {
        if (
          isArmedRef.current &&
          lastScrollDirectionRef.current === 'down' &&
          hasScrolledDownRef.current
        ) {
          isArmedRef.current = false;
          onTrigger();
        }
      } else if (hasLeft) {
        if (lastScrollDirectionRef.current === 'up') {
          isArmedRef.current = true;
        }
      }
    };

    const scheduleCheck = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkFooter);
    };

    const handleWheel = (e) => {
      if (isOpenRef.current) return;
      if (e.deltaY > 1) {
        lastScrollDirectionRef.current = 'down';
        hasScrolledDownRef.current = true;
      } else if (e.deltaY < -1) {
        lastScrollDirectionRef.current = 'up';
      }
      scheduleCheck();
    };

    const handleTouchStart = (e) => {
      if (isOpenRef.current) return;
      if (e.touches && e.touches.length > 0) {
        lastTouchYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (isOpenRef.current) return;
      if (!e.touches || e.touches.length === 0 || lastTouchYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const diff = lastTouchYRef.current - currentY;

      if (diff > 3) {
        lastScrollDirectionRef.current = 'down';
        hasScrolledDownRef.current = true;
      } else if (diff < -3) {
        lastScrollDirectionRef.current = 'up';
      }
      lastTouchYRef.current = currentY;
      scheduleCheck();
    };

    // Detect both window and nested scrolling containers accurately
    const handleScroll = (e) => {
      if (isOpenRef.current) return;
      const target =
        e.target === document || e.target === window
          ? document.scrollingElement || document.documentElement
          : e.target;
      if (!target || typeof target !== 'object') return;

      const currentScrollTop = target.scrollTop ?? window.scrollY ?? 0;
      const prevScrollTop = lastScrollTopMapRef.current.get(target) ?? 0;

      if (currentScrollTop > prevScrollTop + 2) {
        lastScrollDirectionRef.current = 'down';
        hasScrolledDownRef.current = true;
      } else if (currentScrollTop < prevScrollTop - 2) {
        lastScrollDirectionRef.current = 'up';
      }
      lastScrollTopMapRef.current.set(target, currentScrollTop);
      scheduleCheck();
    };

    const handleKeyDown = (e) => {
      if (isOpenRef.current) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        lastScrollDirectionRef.current = 'down';
        hasScrolledDownRef.current = true;
        scheduleCheck();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        lastScrollDirectionRef.current = 'up';
        scheduleCheck();
      }
    };

    // Periodic check supports rAF-driven virtual scroll transitions
    const intervalId = setInterval(checkFooter, 200);

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', scheduleCheck, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', scheduleCheck);
    };
  }, [pathname, onTrigger, enabled]);
}
