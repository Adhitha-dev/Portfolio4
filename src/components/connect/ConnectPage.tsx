import React, { useState, useEffect, useRef } from 'react';
import { ConnectFooter } from './ConnectFooter';
import { Bay01CrtAperture } from './Bay01CrtAperture';
import { Bay02MandateMatrix } from './Bay02MandateMatrix';
import { Bay03DispatchTerminal } from './Bay03DispatchTerminal';
import Lenis from 'lenis';

interface ConnectPageProps {
  onReturnHome: () => void;
  onNavigateToWork?: () => void;
  onNavigateToWriting?: () => void;
  onNavigateToAbout?: () => void;
}

export const ConnectPage: React.FC<ConnectPageProps> = ({
  onReturnHome,
  onNavigateToWork,
  onNavigateToWriting,
  onNavigateToAbout,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [selectedMandateId, setSelectedMandateId] = useState('security'); // 02 // VERIFICATION active by default

  const handleScrollStep = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const cardWidth = Math.min(window.innerWidth * 0.88, 600);
    const delta = direction === 'left' ? -cardWidth : cardWidth;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(lenisRef.current.scroll + delta);
    } else {
      trackRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  // Horizontal Lenis smooth scroll on the 3 tactical bays
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      wrapper: track,
      content: track,
      orientation: 'horizontal',
      gestureOrientation: 'both',
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      lerp: 0.08,
      wheelMultiplier: 1.1,
    });
    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as any).__lenis = lenis;
    }

    // Capture wheel events across the entire viewport to scroll the horizontal bays smoothly
    const handleWindowWheel = (e: WheelEvent) => {
      if (!trackRef.current || !lenisRef.current) return;
      if (trackRef.current.contains(e.target as Node)) {
        // Direct event inside track is already handled by Lenis
        return;
      }
      e.preventDefault();
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      lenisRef.current.scrollTo(lenisRef.current.scroll + delta, {
        duration: 0.7,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    window.addEventListener('wheel', handleWindowWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWindowWheel);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined') {
        delete (window as any).__lenis;
      }
    };
  }, []);

  return (
    <div className="w-full h-screen max-h-screen bg-[#040405] text-[#e5e1e4] antialiased select-none font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Heavy Analog Film Grain Overlay via Lightweight SVG Filter */}
      <svg aria-hidden="true" className="hidden">
        <filter id="film-grain-noise">
          <feTurbulence baseFrequency="0.75" numOctaves={2} stitchTiles="stitch" type="fractalNoise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
      </svg>
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.06] mix-blend-screen overflow-hidden"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" filter="url(#film-grain-noise)" />
        </svg>
      </div>

      {/* Soft ambient CRT warmth and analog vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_40%,#15151c_0%,#040405_80%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* SECTION 1: Heading */}
      <header className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-24 lg:pt-16 pb-1 shrink-0 z-20">
        <div className="border-b border-white/[0.06] pb-2 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-ping" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                SOVEREIGN COMMUNICATIONS // CONSOLE DECK
              </span>
            </div>
            <h1 className="font-giant text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-none">
              SECURE <span className="text-zinc-500 font-light">ROUTING</span> MATRIX
            </h1>
            <p className="font-sans text-xs text-zinc-400 max-w-2xl font-light leading-relaxed mt-0.5">
              Direct telemetry uplink for principal systems architecture, security verification, and executive advisory mandates.
            </p>
          </div>

          {/* Mobile Quick Jump / Swipe Indicator */}
          <div className="flex lg:hidden items-center justify-between w-full pt-1">
            <span className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-[#ff003c]" />
              SWIPE HORIZONTALLY TO EXPLORE BAYS
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScrollStep('left')}
                className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/10 active:bg-white/20 text-[#f2f3f5] transition-colors cursor-pointer text-xs"
                aria-label="Previous bay"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => handleScrollStep('right')}
                className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/10 active:bg-white/20 text-[#f2f3f5] transition-colors cursor-pointer text-xs"
                aria-label="Next bay"
              >
                →
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest pb-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c] animate-pulse" />
            <span>SCROLL TO ADVANCE BAYS →</span>
          </div>
        </div>
      </header>

      {/* SECTION 2: The Three Bay Boxes - Sits directly below heading, horizontally scrolls with Lenis */}
      <div className="w-full flex-1 flex items-center my-auto py-2 sm:py-3 lg:py-2 z-20 overflow-hidden min-h-0">
        <div
          ref={trackRef}
          className="w-full flex flex-row gap-4 sm:gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden items-stretch no-scrollbar px-4 sm:px-6 lg:px-10 select-none py-1"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* BAY 1 */}
          <div className="flex-shrink-0 flex items-stretch snap-center">
            <Bay01CrtAperture />
          </div>

          {/* BAY 2 */}
          <div className="flex-shrink-0 flex items-stretch snap-center">
            <Bay02MandateMatrix
              selectedMandateId={selectedMandateId}
              onSelectMandate={setSelectedMandateId}
            />
          </div>

          {/* BAY 3 */}
          <div className="flex-shrink-0 flex items-stretch snap-center">
            <Bay03DispatchTerminal />
          </div>
        </div>
      </div>

      {/* SECTION 3: Footer - Sits directly below the three bay boxes at the bottom */}
      <div className="shrink-0 z-40 w-full mt-auto">
        <ConnectFooter
          onReturnHome={onReturnHome}
          onNavigateToWork={onNavigateToWork}
        />
      </div>
    </div>
  );
};
