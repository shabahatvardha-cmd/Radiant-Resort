import React, { useEffect, useState, useRef } from 'react';

export default function FloatingCursorSticker() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('EXPLORE');
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'hover', 'drag', 'flip', 'secret'
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const animationFrameRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check for elements with data-cursor
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const val = target.getAttribute('data-cursor');
        const variant = target.getAttribute('data-cursor-variant') || 'hover';
        setCursorText(val || 'EXPLORE');
        setCursorVariant(variant);
      } else {
        const isInteractive = e.target.closest('button, a, input, select, textarea');
        if (isInteractive) {
          setCursorText('SELECT');
          setCursorVariant('hover');
        } else {
          setCursorText('EXPLORE');
          setCursorVariant('default');
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth spring physics for trail
    const loop = () => {
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.16;
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.16;
      setTrailingPos({ x: trailRef.current.x, y: trailRef.current.y });
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Visual variants
  const isFlip = cursorVariant === 'flip';
  const isDrag = cursorVariant === 'drag';
  const isSecret = cursorVariant === 'secret';

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0px) translate(-50%, -50%)`,
      }}
    >
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ease-out select-none shadow-2xl ${
          isClicking
            ? 'scale-75'
            : isSecret
            ? 'scale-125 bg-amber-500 text-black border-2 border-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.6)]'
            : isFlip
            ? 'scale-110 bg-gold text-forest-950 border-2 border-ivory font-bold shadow-[0_0_30px_rgba(182,154,112,0.5)]'
            : isDrag
            ? 'scale-110 bg-emerald-900/90 text-gold border border-gold/40'
            : 'scale-90 bg-forest-950/90 backdrop-blur-md text-gold border border-gold/40'
        } w-24 h-24`}
      >
        {/* Animated Rotating Ring */}
        <div
          className={`absolute inset-0 rounded-full border border-dashed ${
            isSecret ? 'border-amber-900' : 'border-gold/40'
          } animate-[spin_10s_linear_infinite]`}
        />

        {/* Inner Content */}
        <div className="flex flex-col items-center justify-center text-center px-1">
          <span className="text-[10px] tracking-[0.2em] font-extrabold uppercase leading-tight font-sans">
            {cursorText}
          </span>
          <span className="text-[8px] opacity-70 tracking-widest uppercase mt-0.5 font-sans">
            {isFlip ? '3D PACK' : isDrag ? '360°' : isSecret ? 'CLASSIFIED' : 'RADIANT'}
          </span>
        </div>
      </div>
    </div>
  );
}

