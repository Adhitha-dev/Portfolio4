import React, { useState, useEffect } from 'react';

export type ActiveNavPage = 'home' | 'work' | 'writing' | 'about' | 'connect';

export interface HeaderProps {
  activePage?: ActiveNavPage;
  onNavigateHome: () => void;
  onNavigateWork: () => void;
  onNavigateWriting: () => void;
  onNavigateAbout: () => void;
}

const BRAND_TICKER_ITEMS = [
  {
    role: 'ADITHYA',
    tag: 'SYSTEMS ARCHITECT',
  },
  {
    role: 'ROLE',
    tag: 'OFFENSIVE SECURITY & BINARY REVERSING',
  },
  {
    role: 'STACK',
    tag: (
      <>
        RUST · <span className="accent-3d">WEBGPU</span> · C++20 · eBPF ·{' '}
        <span className="accent-3d">WGSL</span>
      </>
    ),
  },
  {
    role: 'STATUS',
    tag: (
      <>
        PROLLY <span className="accent-3d">RENDERING</span> A HUGE{' '}
        <span className="accent-3d">SCENE</span> CURRENTLY
      </>
    ),
  },
  {
    role: '3D & SPATIAL',
    tag: (
      <>
        <span className="accent-3d">GAUSSIAN SPLATS</span> ·{' '}
        <span className="accent-3d">RAYMARCHING</span> SDFs
      </>
    ),
  },
  {
    role: 'TEL',
    tag: '0.38MS LATENCY · ZERO-COPY KERNEL RUNTIMES',
  },
  {
    role: 'STATUS',
    tag: (
      <>
        COMPILING <span className="accent-3d">SHADERS</span> AT 3:00 AM
      </>
    ),
  },
];

export const Header: React.FC<HeaderProps> = ({
  activePage = 'home',
  onNavigateHome,
  onNavigateWork,
  onNavigateWriting,
  onNavigateAbout,
}) => {
  const [tickerIdx, setTickerIdx] = useState(0);
  const [flipState, setFlipState] = useState<'entered' | 'flipping' | 'entering'>('entered');
  const [isTickerHovered, setIsTickerHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection to toggle blur background without changing header dimensions
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(scrollY > 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  // Handle ticker 3D flipping rotation identical to homepage
  useEffect(() => {
    if (isTickerHovered) return;
    const interval = setInterval(() => {
      setFlipState('flipping');
      setTimeout(() => {
        setTickerIdx((prev) => (prev + 1) % BRAND_TICKER_ITEMS.length);
        setFlipState('entering');
        setTimeout(() => {
          setFlipState('entered');
        }, 50);
      }, 300);
    }, 3800);
    return () => clearInterval(interval);
  }, [isTickerHovered]);

  // Magnetic nav link hover physics identical to homepage
  const handleNavLinkMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const link = e.currentTarget;
    const rect = link.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    link.style.transform = `translate(${offsetX * 0.2}px, ${offsetY * 0.2}px)`;
  };

  const handleNavLinkMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] w-full px-5 sm:px-8 md:px-12 pt-7 sm:pt-8 md:pt-10 pb-4 sm:pb-5 md:pb-6 flex items-center justify-between transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 pointer-events-auto ${
        isScrolled
          ? 'bg-black/65 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent backdrop-blur-none border-b border-transparent shadow-none'
      }`}
      data-purpose="primary-navigation"
    >
      {/* Brand Monogram / Identity: Dynamic Flipping Ticker Element */}
      <button
        type="button"
        aria-label="Adithya - Systems Architect Portfolio"
        onClick={onNavigateHome}
        onMouseEnter={() => setIsTickerHovered(true)}
        onMouseLeave={() => setIsTickerHovered(false)}
        className="group flex items-center tracking-[0.2em] font-micro text-[9.5px] sm:text-[10px] text-neutral-300 uppercase select-none transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-1 text-left cursor-pointer min-w-0"
        id="brand-ticker-anchor"
      >
        <div
          className="ticker-perspective h-5 sm:h-6 overflow-hidden flex items-center min-w-0"
          id="brand-ticker-container"
          style={{ minWidth: 0, maxWidth: 'min(42vw, 360px)' }}
        >
          <div
            className={`ticker-flip-card flex items-center whitespace-nowrap will-change-transform min-w-0 ${flipState}`}
            data-index={tickerIdx}
          >
            <span className="text-neutral-500 text-[8px] sm:text-[9px] mr-1 sm:mr-2 inline-block transition-transform duration-500 group-hover:rotate-180 shrink-0">
              ◆
            </span>
            <span className="font-medium text-white tracking-widest text-[9px] sm:text-[10px] shrink-0">
              {BRAND_TICKER_ITEMS[tickerIdx].role}
            </span>
            <span className="text-neutral-600 mx-1 sm:mx-1.5 shrink-0">//</span>
            <span className="text-neutral-300 text-[8.5px] sm:text-[9.5px] tracking-wider truncate">
              {BRAND_TICKER_ITEMS[tickerIdx].tag}
            </span>
          </div>
        </div>
      </button>

      {/* Minimal Navigation Links: WORK, WRITING, ABOUT */}
      <nav aria-label="Main menu" className="flex items-center gap-2.5 sm:gap-6 md:gap-10 shrink-0">
        <button
          type="button"
          onClick={onNavigateWork}
          onMouseMove={handleNavLinkMouseMove}
          onMouseLeave={handleNavLinkMouseLeave}
          className={`nav-link font-micro text-[9px] sm:text-[9.5px] tracking-[0.24em] sm:tracking-[0.26em] uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded cursor-pointer transition-colors duration-200 ${
            activePage === 'work'
              ? 'text-white font-medium'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          WORK
        </button>
        <button
          type="button"
          onClick={onNavigateWriting}
          onMouseMove={handleNavLinkMouseMove}
          onMouseLeave={handleNavLinkMouseLeave}
          className={`nav-link font-micro text-[9px] sm:text-[9.5px] tracking-[0.24em] sm:tracking-[0.26em] uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded cursor-pointer transition-colors duration-200 ${
            activePage === 'writing'
              ? 'text-white font-medium'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          WRITING
        </button>
        <button
          type="button"
          onClick={onNavigateAbout}
          onMouseMove={handleNavLinkMouseMove}
          onMouseLeave={handleNavLinkMouseLeave}
          className={`nav-link font-micro text-[9px] sm:text-[9.5px] tracking-[0.24em] sm:tracking-[0.26em] uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded cursor-pointer transition-colors duration-200 ${
            activePage === 'about'
              ? 'text-white font-medium'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          ABOUT
        </button>
      </nav>
    </header>
  );
};
