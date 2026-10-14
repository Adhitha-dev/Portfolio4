import React, { useState, useRef, useEffect } from 'react';
import { WorkFooter } from './WorkFooter';
import { WorkFilterTabs } from './WorkFilterTabs';
import { WorkCards } from './WorkCards';
import { WorkCategory } from '../../types/work';
import Lenis from 'lenis';

interface WorkPageProps {
  onReturnHome: () => void;
  onOpenConnect: () => void;
  onNavigateWriting?: () => void;
  onNavigateAbout?: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  onReturnHome,
  onOpenConnect,
  onNavigateWriting,
  onNavigateAbout,
}) => {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('all');
  const trackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const counts = {
    all: 9,
    web: 3,
    sec: 3,
    vfx: 3,
  };

  // Subtle lens aura following pointer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 255, 255, 0.035), transparent 70%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Horizontal Lenis smooth scroll on the cards carousel
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

    // Capture wheel events across the full viewport to scroll the horizontal cards
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

  // Reset horizontal scroll when activeCategory changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    }
  }, [activeCategory]);

  const handleSelectCategory = (cat: WorkCategory) => {
    setActiveCategory(cat);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    } else if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  };

  const handleScrollStep = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const cardWidth = Math.min(window.innerWidth * 0.88, 680);
    const delta = direction === 'left' ? -cardWidth : cardWidth;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(lenisRef.current.scroll + delta);
    } else {
      trackRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#07080a] font-sans h-screen max-h-screen text-[#f2f3f5] antialiased film-grain relative selection:bg-[#ff003c]/25 selection:text-white overflow-hidden w-full flex flex-col justify-between">
      {/* Heavy Analog Film Grain Overlay via SVG Filter */}
      <svg aria-hidden="true" className="hidden">
        <filter id="noiseFilterWork">
          <feTurbulence
            baseFrequency="0.75"
            numOctaves={2}
            stitchTiles="stitch"
            type="fractalNoise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.06] mix-blend-screen select-none overflow-hidden"
      >
        <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect filter="url(#noiseFilterWork)" height="100%" width="100%" />
        </svg>
      </div>

      {/* Dynamic Cursor Light Spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(800px at 50% 50%, rgba(255, 255, 255, 0.035), transparent 70%)',
        }}
      />

      {/* Atmospheric Watermark: "APERTURE" */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 flex items-center justify-center overflow-hidden">
        <div className="font-giant text-[20vw] leading-none text-white/[0.012] tracking-wider uppercase whitespace-nowrap translate-y-8 blur-[1px]">
          APERTURE
        </div>
      </div>

      {/* Ambient soft glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_35%,#15171d_0%,#07080a_85%)]" />

      {/* SECTION 1: Sector Header & Category Filter Console */}
      <header className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-14 pt-20 sm:pt-24 lg:pt-16 pb-1 sm:pb-2 shrink-0 z-20 animate-stage-header">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.04] gap-2 sm:gap-3 pb-2 sm:pb-2.5">
          {/* Section Typographic Horizon */}
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#15171d]/80 border border-white/[0.06] text-[9px] sm:text-[10px] font-micro tracking-widest text-[#b4b8c5] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>CYLINDRICAL VIEWPORT // CONTINUOUS ROLL</span>
            </div>
            <h1
              className="font-giant tracking-normal uppercase text-[#f2f3f5] leading-none font-normal"
              style={{ fontSize: 'clamp(1.75rem, 4.5vw, 4rem)', lineHeight: 1.02 }}
            >
              PROJECTED{' '}
              <span className="text-[#7a7d88]/60 font-light">APERTURES</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#7a7d88] max-w-2xl mt-1 font-light leading-relaxed">
              Selected systems architecture, high-assurance cryptographic protocols, and real-time GPU pipelines engineered for mission-critical infrastructure.
            </p>
          </div>

          {/* Category Filter Tabs & Desktop Scroll Cue */}
          <div className="flex flex-col lg:items-end gap-2 w-full lg:w-auto">
            <div className="hidden lg:flex items-center gap-2 font-mono text-[9.5px] text-zinc-500 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c] animate-pulse" />
              <span>SCROLL TO ADVANCE ROLL →</span>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-hidden">
              <WorkFilterTabs
                activeCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
                counts={counts}
              />
            </div>
          </div>
        </div>

        {/* Mobile Roll Cue & Quick Jump Controls */}
        <div className="flex lg:hidden items-center justify-between pt-1.5 font-micro text-[9.5px] sm:text-[10px] text-[#7a7d88]">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#ff003c]" />
            SWIPE HORIZONTALLY TO EXPLORE
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleScrollStep('left')}
              className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/10 active:bg-white/20 text-[#f2f3f5] transition-colors cursor-pointer text-xs"
              aria-label="Previous card"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => handleScrollStep('right')}
              className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/10 active:bg-white/20 text-[#f2f3f5] transition-colors cursor-pointer text-xs"
              aria-label="Next card"
            >
              →
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 2: Cylindrical Horizon Filmstrip Carousel (Lenis Horizontal Scroll on Track) */}
      <div className="w-full flex-1 flex items-center my-auto py-2 sm:py-3 lg:py-4 z-20 overflow-hidden min-h-0 animate-stage-hero">
        <div
          ref={trackRef}
          className="horizontal-card-track w-full flex flex-row gap-4 sm:gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden items-stretch no-scrollbar px-4 sm:px-8 md:px-14 select-none py-1"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <WorkCards activeCategory={activeCategory} />
        </div>
      </div>

      {/* SECTION 3: Footer - Directly below the cards, cleanly positioned at bottom */}
      <div className="shrink-0 z-40 w-full mt-auto animate-stage-footer">
        <WorkFooter onOpenConnect={onOpenConnect} />
      </div>
    </div>
  );
};
