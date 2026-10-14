import React, { useState, useEffect, useRef } from 'react';
import { WritingFilterTabs } from './WritingFilterTabs';
import { WritingDispatches } from './WritingDispatches';
import { TelemetryMemoryBus } from './TelemetryMemoryBus';
import { TransmissionCourier } from './TransmissionCourier';
import { WritingFooter } from './WritingFooter';
import { WritingCategory, DispatchItem } from '../../types/writing';

interface WritingPageProps {
  onReturnHome: () => void;
  onNavigateWork: () => void;
  onOpenConnect: () => void;
  onNavigateAbout?: () => void;
  onSelectDispatch?: (dispatch: DispatchItem) => void;
  onEngageSubmit?: (email: string) => void;
}

export const WritingPage: React.FC<WritingPageProps> = ({
  onReturnHome,
  onNavigateWork,
  onOpenConnect,
  onNavigateAbout,
  onSelectDispatch,
  onEngageSubmit,
}) => {
  const [activeCategory, setActiveCategory] = useState<WritingCategory>('all');
  const spotlightRef = useRef<HTMLDivElement>(null);

  const counts = {
    all: 6,
    systems: 2,
    consensus: 1,
    crypto: 2,
    graphics: 1,
  };

  // Subtle interactive ambient spotlight tracking pointer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 255, 255, 0.035), transparent 75%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-[#040406] font-sans text-white/70 antialiased min-h-screen flex flex-col selection:bg-white/10 selection:text-white relative overflow-x-hidden">
      {/* Vast Ambient Celestial Background Grain (Ma / Negative Space) */}
      <div className="fixed inset-0 pointer-events-none z-0 cosmic-grain opacity-60" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(255,255,255,0.035),transparent_75%)]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_85%_65%,rgba(20,20,28,0.4),transparent_60%)]" />

      {/* Faint Cosmic Orbit Rings in Deep Background (2001: Space Odyssey Minimal Lines) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] pointer-events-none z-[1] opacity-25">
        <svg className="w-full h-full orbit-slow" fill="none" viewBox="0 0 1000 1000">
          <circle cx="500" cy="500" r="480" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 12" strokeWidth="1" />
          <circle cx="500" cy="500" r="360" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
          <circle cx="500" cy="500" r="220" stroke="rgba(255,255,255,0.05)" strokeDasharray="6 24" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Interactive Ambient Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 opacity-60"
        style={{
          background:
            'radial-gradient(650px circle at 50% 50%, rgba(255, 255, 255, 0.03), transparent 75%)',
        }}
      />

      {/* Main Celestial Dispatches Stage */}
      <main className="w-full flex-1 pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 overflow-x-hidden">
        <div className="flex flex-col w-full relative">
          {/* Page Title & Context Header */}
          <section className="relative z-10 w-full mb-8 sm:mb-12 animate-stage-hero">
            <div className="flex flex-col gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/[0.08]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
                <div className="space-y-3 sm:space-y-4 max-w-2xl">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff003c]" />
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#c6c6cf] tracking-[0.22em] uppercase">
                      REGISTRY // VOL. 05
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#c6c6cf]/80 tracking-widest uppercase">
                      DISPATCH ARCHIVE
                    </span>
                  </div>
                  <h1
                    className="font-giant text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-[#e5e1e4] tracking-tight uppercase font-normal leading-tight"
                    style={{ fontSize: 'clamp(2.1rem, 8vw, 4.5rem)', lineHeight: 1.08 }}
                  >
                    DISPATCHES
                  </h1>
                </div>
                <p className="font-sans text-[11px] sm:text-sm md:text-base text-[#c6c6cf] max-w-md font-light leading-relaxed md:text-right md:self-end">
                  A synchronized ledger of system architecture breakthroughs, deterministic consensus proofs, kernel engineering dispatches, and real-time graphics shaders.
                </p>
              </div>

              {/* Filter Pills Console */}
              <WritingFilterTabs
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                counts={counts}
              />
            </div>
          </section>

          {/* Central Orbital Ledger (6 Dispatches) */}
          <div className="animate-stage-stats">
            <WritingDispatches
              activeCategory={activeCategory}
              onSelectDispatch={onSelectDispatch}
            />
          </div>

          {/* Telemetry Memory Trace Bus (HUD Diagnostics Matrix) */}
          <div className="animate-stage-chrono">
            <TelemetryMemoryBus />
          </div>

          {/* Transmission Courier Capsule (Terminal Subscriber Bus) */}
          <div className="animate-stage-arsenal">
            <TransmissionCourier onEngage={onEngageSubmit} />
          </div>
        </div>
      </main>

      {/* Retro-Minimal Synchronized Footer Bar */}
      <div className="animate-stage-footer">
        <WritingFooter onOpenConnect={onOpenConnect} />
      </div>
    </div>
  );
};
