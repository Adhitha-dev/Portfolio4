import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConnectPage } from './components/connect/ConnectPage';
import { WorkPage } from './components/work/WorkPage';
import { WritingPage } from './components/writing/WritingPage';
import { AboutPage } from './components/about/AboutPage';
import { DispatchDetailPage } from './components/writing/DispatchDetailPage';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App() {
  const getInitialPage = (): 'hero' | 'work' | 'writing' | 'dispatch' | 'about' | 'connect' => {
    if (typeof window === 'undefined') return 'hero';
    const hash = window.location.hash.toLowerCase();
    if (hash === '#work') return 'work';
    if (hash === '#writing') return 'writing';
    if (hash === '#about') return 'about';
    if (hash === '#contact' || hash === '#connect') return 'connect';
    if (hash.startsWith('#dispatch')) return 'dispatch';
    return 'hero';
  };

  const [currentPage, setCurrentPage] = useState<'hero' | 'work' | 'writing' | 'dispatch' | 'about' | 'connect'>(getInitialPage);
  const [selectedDispatchId, setSelectedDispatchId] = useState<string>('dispatch-01');
  const [innerCircleStatus, setInnerCircleStatus] = useState<'hidden' | 'enter' | 'dissolve'>('hidden');
  const isTransitioningRef = useRef(false);

  // Auto-dissolve inner circle notification tablet after 2 seconds
  useEffect(() => {
    if (innerCircleStatus === 'enter') {
      const dissolveTimer = setTimeout(() => {
        setInnerCircleStatus('dissolve');
      }, 2000);
      return () => clearTimeout(dissolveTimer);
    }
    if (innerCircleStatus === 'dissolve') {
      const hideTimer = setTimeout(() => {
        setInnerCircleStatus('hidden');
      }, 650);
      return () => clearTimeout(hideTimer);
    }
  }, [innerCircleStatus]);

  // Global smooth scrolling across vertical pages (Hero, Writing, Dispatch, About)
  // Work and Connect have their own dedicated horizontal Lenis instances
  useSmoothScroll({
    enabled: currentPage !== 'work' && currentPage !== 'connect',
    routeKey: currentPage,
  });

  // INTRO TRANSITION: STROBOSCOPIC SHUTTER PULSE & OPTICAL IRIS CLAMP
  // Triggered exclusively when CONNECT button is pressed
  const handleOpenConnect = useCallback(() => {
    if (isTransitioningRef.current || currentPage === 'connect') return;
    isTransitioningRef.current = true;

    const root = document.documentElement;
    const pageStage = document.getElementById('page-stage');
    const flashBangFx = document.getElementById('flash-bang-fx');
    const shutterCurtain = document.getElementById('strobe-shutter-curtain');
    const opticalIrisShockwave = document.getElementById('optical-iris-shockwave');
    const apertureClampHud = document.getElementById('aperture-clamp-hud');

    if (!pageStage || !flashBangFx || !shutterCurtain || !opticalIrisShockwave || !apertureClampHud) {
      setCurrentPage('connect');
      window.location.hash = '#contact';
      isTransitioningRef.current = false;
      return;
    }

    // STAGE 1: Fast rhythmic 3-step stroboscopic shutter sequence
    // Sub-step 1A: Shutter dark cut (0ms - 45ms)
    shutterCurtain.classList.add('curtain-active');
    pageStage.classList.add('strobe-dark-cut');

    setTimeout(() => {
      // Sub-step 1B: Flash burst (45ms - 95ms)
      pageStage.classList.remove('strobe-dark-cut');
      pageStage.classList.add('strobe-flash-white');
      flashBangFx.classList.add('flash-burst');

      setTimeout(() => {
        // Sub-step 1C: Negative snap (95ms - 150ms)
        flashBangFx.classList.remove('flash-burst');
        pageStage.classList.remove('strobe-flash-white');
        pageStage.classList.add('strobe-negative-snap');

        setTimeout(() => {
          // Sub-step 1D: Second forensic high-speed strobe pulse (150ms - 210ms)
          pageStage.classList.remove('strobe-negative-snap');
          flashBangFx.classList.add('flash-burst');

          setTimeout(() => {
            flashBangFx.classList.remove('flash-burst');
            shutterCurtain.classList.remove('curtain-active');

            // STAGE 2: Radial optical iris negative aperture burst
            opticalIrisShockwave.classList.add('iris-active');
            let radius = 0;
            const irisStartTime = performance.now();
            const irisDuration = 380; // ms
            let pageSwapped = false;

            function animateIris(currentTime: number) {
              const elapsed = currentTime - irisStartTime;
              const progress = Math.min(elapsed / irisDuration, 1);
              // Cubic ease-out explosion curve
              const easeOut = 1 - Math.pow(1 - progress, 3);
              radius = easeOut * 110; // bloom past 100% of viewport
              root.style.setProperty('--iris-radius', `${radius.toFixed(1)}%`);

              // Midway through iris bloom: swap viewports behind the shockwave ring
              if (progress >= 0.52 && !pageSwapped) {
                pageSwapped = true;
                setCurrentPage('connect');
                window.location.hash = '#contact';
              }

              if (progress < 1) {
                requestAnimationFrame(animateIris);
              } else {
                // STAGE 3: Mechanical aperture settling into tack-sharp clarity
                opticalIrisShockwave?.classList.remove('iris-active');
                root.style.setProperty('--iris-radius', '0%');

                // Clamp HUD reticle momentary lock
                apertureClampHud?.classList.add('hud-active');

                setTimeout(() => {
                  apertureClampHud?.classList.remove('hud-active');
                  isTransitioningRef.current = false;
                  ScrollTrigger.refresh();
                }, 240);
              }
            }

            requestAnimationFrame(animateIris);
          }, 60);
        }, 55);
      }, 50);
    }, 45);
  }, [currentPage]);

  // CINEMATIC TRANSITION TO DISPATCH DETAIL (FROM HTML FILE)
  const handleOpenDispatch = useCallback((dispatchId: string = 'dispatch-01') => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setSelectedDispatchId(dispatchId);

    const pageStage = document.getElementById('page-stage');
    const flashBangFx = document.getElementById('flash-bang-fx');
    const scanlineFlareFx = document.getElementById('scanline-flare-fx');

    if (!pageStage || !flashBangFx || !scanlineFlareFx) {
      setCurrentPage('dispatch');
      window.location.hash = `#dispatch/${dispatchId}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
      isTransitioningRef.current = false;
      return;
    }

    // Phase 1: High-intensity white camera flash burst with optical bloom
    flashBangFx.classList.add('flash-burst');
    scanlineFlareFx.classList.add('flare-active');

    setTimeout(() => {
      // Phase 2: Violent film negative inversion & lens impact scale punch
      pageStage.classList.add('film-negative-inverted');

      setTimeout(() => {
        pageStage.classList.remove('film-negative-inverted');
        pageStage.classList.add('film-negative-punch');

        // Phase 3: Swap view to Dispatch detail page and fade out flash
        setCurrentPage('dispatch');
        window.location.hash = `#dispatch/${dispatchId}`;
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }

        flashBangFx.classList.remove('flash-burst');

        setTimeout(() => {
          pageStage.classList.remove('film-negative-punch');
          scanlineFlareFx.classList.remove('flare-active');
          isTransitioningRef.current = false;
          ScrollTrigger.refresh();
        }, 180);
      }, 160);
    }, 110);
  }, []);

  // RETRO REWIND TRANSITION BACK TO WRITING REGISTRY (FROM HTML FILE)
  const handleReturnWritingFromDispatch = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const pageStage = document.getElementById('page-stage');
    const flashBangFx = document.getElementById('flash-bang-fx');
    const scanlineFlareFx = document.getElementById('scanline-flare-fx');

    if (!pageStage || !flashBangFx || !scanlineFlareFx) {
      setCurrentPage('writing');
      window.location.hash = '#writing';
      window.scrollTo({ top: 0, behavior: 'instant' });
      isTransitioningRef.current = false;
      return;
    }

    // Reverse Flash & CRT Invert Punch
    flashBangFx.classList.add('flash-burst');
    scanlineFlareFx.classList.add('flare-active');

    setTimeout(() => {
      pageStage.classList.add('film-negative-inverted');

      setTimeout(() => {
        setCurrentPage('writing');
        window.location.hash = '#writing';
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }

        pageStage.classList.remove('film-negative-inverted');
        flashBangFx.classList.remove('flash-burst');

        setTimeout(() => {
          scanlineFlareFx.classList.remove('flare-active');
          isTransitioningRef.current = false;
          ScrollTrigger.refresh();
        }, 150);
      }, 140);
    }, 90);
  }, []);

  // OUTRO TRANSITION: STROBOSCOPIC REVERSE PULSE & OPTICAL IRIS IMPLOSION
  // Applied when leaving the Connect page to Work, Writing, About, or Hero (CONNECT OUTRO ALWAYS WINS IN PRIORITY)
  const handleReturnFromConnect = useCallback((target: 'hero' | 'work' | 'writing' | 'about' = 'hero') => {
    if (isTransitioningRef.current || currentPage !== 'connect') return;
    isTransitioningRef.current = true;

    const root = document.documentElement;
    const pageStage = document.getElementById('page-stage');
    const flashBangFx = document.getElementById('flash-bang-fx');
    const shutterCurtain = document.getElementById('strobe-shutter-curtain');
    const opticalIrisShockwave = document.getElementById('optical-iris-shockwave');

    if (!pageStage || !flashBangFx || !shutterCurtain || !opticalIrisShockwave) {
      setCurrentPage(target);
      window.location.hash = target === 'work' ? '#work' : target === 'writing' ? '#writing' : target === 'about' ? '#about' : '';
      isTransitioningRef.current = false;
      return;
    }

    // Step 1: Flash burst and mechanical shutter clamp
    shutterCurtain.classList.add('curtain-active');
    pageStage.classList.add('strobe-flash-white');
    flashBangFx.classList.add('flash-burst');

    setTimeout(() => {
      flashBangFx.classList.remove('flash-burst');
      pageStage.classList.remove('strobe-flash-white');
      pageStage.classList.add('strobe-negative-snap');

      // Step 2: Optical iris implosion (from full viewport 110% collapsing down to 0%)
      opticalIrisShockwave.classList.add('iris-active');
      root.style.setProperty('--iris-radius', '110%');

      const outroStartTime = performance.now();
      const outroDuration = 320; // ms
      let pageSwapped = false;

      function animateOutroIris(currentTime: number) {
        const elapsed = currentTime - outroStartTime;
        const progress = Math.min(elapsed / outroDuration, 1);
        // Cubic ease-in contraction curve
        const easeIn = Math.pow(progress, 2.2);
        const radius = (1 - easeIn) * 110;
        root.style.setProperty('--iris-radius', `${radius.toFixed(1)}%`);

        // Swap viewports midway through the shockwave collapse
        if (progress >= 0.5 && !pageSwapped) {
          pageSwapped = true;
          setCurrentPage(target);
          window.location.hash = target === 'work' ? '#work' : target === 'writing' ? '#writing' : target === 'about' ? '#about' : '';
          pageStage?.classList.remove('strobe-negative-snap');
        }

        if (progress < 1) {
          requestAnimationFrame(animateOutroIris);
        } else {
          opticalIrisShockwave?.classList.remove('iris-active');
          shutterCurtain?.classList.remove('curtain-active');
          pageStage?.classList.remove('strobe-negative-snap', 'strobe-flash-white', 'strobe-dark-cut');
          flashBangFx?.classList.remove('flash-burst');
          root.style.setProperty('--iris-radius', '0%');
          isTransitioningRef.current = false;
          ScrollTrigger.refresh();
        }
      }

      requestAnimationFrame(animateOutroIris);
    }, 50);
  }, [currentPage]);

  // DIRECT PAGE NAVIGATION (WITHOUT INTRO ANIMATION) FOR WORK, WRITING, ABOUT
  const handleOpenPage = useCallback((target: 'work' | 'writing' | 'about') => {
    if (isTransitioningRef.current) return;
    if (currentPage === target) return;

    // Connect intro / outro always wins in priority
    if (currentPage === 'connect') {
      handleReturnFromConnect(target);
      return;
    }

    setCurrentPage(target);
    window.location.hash = `#${target}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
  }, [currentPage, handleReturnFromConnect]);

  // RETRO REWIND TRANSITION BACK TO HERO VIEW (FROM HTML FILE)
  const handleReturnHomeWithOutro = useCallback(() => {
    if (isTransitioningRef.current) return;
    if (currentPage === 'hero') return;

    // Connect outro always wins in priority
    if (currentPage === 'connect') {
      handleReturnFromConnect('hero');
      return;
    }

    isTransitioningRef.current = true;

    const pageStage = document.getElementById('page-stage');
    const flashBangFx = document.getElementById('flash-bang-fx');
    const scanlineFlareFx = document.getElementById('scanline-flare-fx');

    if (!pageStage || !flashBangFx || !scanlineFlareFx) {
      setCurrentPage('hero');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
      isTransitioningRef.current = false;
      return;
    }

    // Reverse Flash & CRT Invert Punch
    flashBangFx.classList.add('flash-burst');
    scanlineFlareFx.classList.add('flare-active');

    setTimeout(() => {
      pageStage.classList.add('film-negative-inverted');

      setTimeout(() => {
        setCurrentPage('hero');
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }

        pageStage.classList.remove('film-negative-inverted');
        flashBangFx.classList.remove('flash-burst');

        setTimeout(() => {
          scanlineFlareFx.classList.remove('flare-active');
          isTransitioningRef.current = false;
          ScrollTrigger.refresh();
        }, 150);
      }, 140);
    }, 90);
  }, [currentPage, handleReturnFromConnect]);

  // Direct navigation handlers
  const handleOpenWork = useCallback(() => {
    handleOpenPage('work');
  }, [handleOpenPage]);

  const handleOpenWriting = useCallback(() => {
    handleOpenPage('writing');
  }, [handleOpenPage]);

  const handleOpenAbout = useCallback(() => {
    handleOpenPage('about');
  }, [handleOpenPage]);

  const handleReturnHomeDirect = useCallback(() => {
    handleReturnHomeWithOutro();
  }, [handleReturnHomeWithOutro]);

  // SOLARIS THERMAL OVEREXPOSURE & SABATTIER NEGATIVE FILM OUTRO TRANSITION
  // Ported specifically for Transmission Courier "ENGAGE" action on Writing Page
  const handleSolarisSubscribeOutro = useCallback((email: string) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const pageStage = document.getElementById('page-stage');
    const flashStage1 = document.getElementById('solaris-flash-stage1');
    const burnStage2 = document.getElementById('solaris-burn-stage2');
    const cooldownStage3 = document.getElementById('solaris-cooldown-stage3');

    if (!pageStage || !flashStage1 || !burnStage2 || !cooldownStage3) {
      setCurrentPage('hero');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
      isTransitioningRef.current = false;
      setTimeout(() => {
        setInnerCircleStatus('enter');
      }, 2000);
      return;
    }

    // STAGE 1 & 2: 35mm Optical Flare Flash & Sabattier Inversion (Negative Film Effect)
    flashStage1.classList.add('active');
    burnStage2.classList.add('active');
    pageStage.classList.add('solaris-sabattier-solarized');

    // Peak exposure (280ms): activate thermal cooldown blanket, then swap view to 'hero' while covered
    setTimeout(() => {
      cooldownStage3.classList.add('active');

      // Swap view to Homepage and reset scroll behind the radiant solar blanket
      setCurrentPage('hero');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }

      // Next tick (360ms): once Hero has mounted, dissolve flash and negative burst into the gentle thermal cooldown
      setTimeout(() => {
        flashStage1.classList.remove('active');
        burnStage2.classList.remove('active');
        pageStage.classList.remove('solaris-sabattier-solarized');

        // Allow thermal cooldown to smoothly dissipate over Hero
        setTimeout(() => {
          cooldownStage3.classList.remove('active');
          isTransitioningRef.current = false;
          ScrollTrigger.refresh();
        }, 450);
      }, 80);
    }, 280);

    // After 2 seconds, trigger the small tablet notification from the top
    setTimeout(() => {
      setInnerCircleStatus('enter');
    }, 2000);
  }, []);

  // Sync hash routing (#contact, #connect, #work, #writing, #about, #home)
  useEffect(() => {
    const handleHashChange = () => {
      if (isTransitioningRef.current) return;
      const hash = window.location.hash.toLowerCase();
      if ((hash === '#contact' || hash === '#connect') && currentPage !== 'connect') {
        handleOpenConnect();
      } else if (hash === '#work' && currentPage !== 'work') {
        if (currentPage === 'connect') {
          handleReturnFromConnect('work');
        } else {
          handleOpenPage('work');
        }
      } else if (hash === '#writing' && currentPage !== 'writing') {
        if (currentPage === 'connect') {
          handleReturnFromConnect('writing');
        } else if (currentPage === 'dispatch') {
          handleReturnWritingFromDispatch();
        } else {
          handleOpenPage('writing');
        }
      } else if (hash.startsWith('#dispatch')) {
        const id = hash.split('/')[1] || 'dispatch-01';
        if (currentPage !== 'dispatch') {
          handleOpenDispatch(id);
        } else {
          setSelectedDispatchId(id);
        }
      } else if (hash === '#about' && currentPage !== 'about') {
        if (currentPage === 'connect') {
          handleReturnFromConnect('about');
        } else {
          handleOpenPage('about');
        }
      } else if ((hash === '#home' || hash === '') && currentPage !== 'hero') {
        if (currentPage === 'connect') {
          handleReturnFromConnect('hero');
        } else {
          handleReturnHomeWithOutro();
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage, handleOpenConnect, handleReturnFromConnect, handleOpenPage, handleReturnHomeWithOutro, handleOpenDispatch, handleReturnWritingFromDispatch]);

  // Reset scroll position to top on page/route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="relative min-h-screen w-full bg-black text-neutral-200 overflow-x-hidden font-sans">
      {/* UNIFIED STICKY NAVBAR FIXED AT TOP ACROSS ALL PAGES */}
      <Header
        activePage={currentPage === 'hero' ? 'home' : (currentPage === 'dispatch' || currentPage === 'writing') ? 'writing' : currentPage}
        onNavigateHome={
          currentPage === 'connect'
            ? () => handleReturnFromConnect('hero')
            : handleReturnHomeWithOutro
        }
        onNavigateWork={
          currentPage === 'connect'
            ? () => handleReturnFromConnect('work')
            : () => handleOpenPage('work')
        }
        onNavigateWriting={
          currentPage === 'connect'
            ? () => handleReturnFromConnect('writing')
            : () => handleOpenPage('writing')
        }
        onNavigateAbout={
          currentPage === 'connect'
            ? () => handleReturnFromConnect('about')
            : () => handleOpenPage('about')
        }
      />

      {/* Fullscreen Camera Flash & Film Negative Flare Overlays (FROM HTML FILE) */}
      <div aria-hidden="true" id="flash-bang-fx" />
      <div aria-hidden="true" id="scanline-flare-fx" />

      {/* TRANSITION FX OVERLAYS (EXCLUSIVELY FOR CONNECT INTRO/OUTRO) */}
      <div aria-hidden="true" id="strobe-shutter-curtain" />
      <div aria-hidden="true" id="optical-iris-shockwave" />
      <div aria-hidden="true" id="aperture-clamp-hud">
        <div className="iris-blade-reticle flex items-center justify-center">
          <div className="absolute -top-3 px-3 bg-black border border-white/40 font-micro text-[8px] tracking-[0.3em] text-[#ff003c] uppercase">
            IRIS APERTURE // LOCK F/1.2
          </div>
          <div className="absolute -bottom-3 px-3 bg-black border border-white/40 font-micro text-[8px] tracking-[0.3em] text-white uppercase">
            OPTICAL RECON // CALIBRATED
          </div>
          <div className="w-16 h-16 rounded-full border border-red-500/60 shadow-[0_0_24px_rgba(255,0,60,0.8)]" />
        </div>
      </div>

      {/* SOLARIS ANALOG OVEREXPOSURE & SABATTIER SOLARIZED NEGATIVE FILM OUTRO OVERLAYS */}
      <div aria-hidden="true" id="solaris-flash-stage1" />
      <div aria-hidden="true" id="solaris-burn-stage2" />
      <div aria-hidden="true" id="solaris-cooldown-stage3" />

      {/* WRAPPER STAGE FOR FILM NEGATIVE BANG INVERSION EFFECT */}
      <div
        className="relative w-full min-h-screen"
        id="page-stage"
      >
        {currentPage === 'hero' && (
          <Hero
            onOpenConnect={handleOpenConnect}
            onOpenWork={() => handleOpenPage('work')}
            onOpenWriting={() => handleOpenPage('writing')}
            onOpenAbout={() => handleOpenPage('about')}
          />
        )}
        {currentPage === 'work' && (
          <WorkPage
            onReturnHome={handleReturnHomeWithOutro}
            onOpenConnect={handleOpenConnect}
            onNavigateWriting={handleOpenWriting}
            onNavigateAbout={handleOpenAbout}
          />
        )}
        {currentPage === 'writing' && (
          <WritingPage
            onReturnHome={handleReturnHomeWithOutro}
            onNavigateWork={handleOpenWork}
            onOpenConnect={handleOpenConnect}
            onNavigateAbout={handleOpenAbout}
            onSelectDispatch={(item) => handleOpenDispatch(item.id)}
            onEngageSubmit={handleSolarisSubscribeOutro}
          />
        )}
        {currentPage === 'dispatch' && (
          <DispatchDetailPage
            dispatchId={selectedDispatchId}
            onReturnWriting={handleReturnWritingFromDispatch}
            onSelectDispatch={(id) => handleOpenDispatch(id)}
            onOpenConnect={handleOpenConnect}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onReturnHome={handleReturnHomeWithOutro}
            onNavigateWork={handleOpenWork}
            onNavigateWriting={handleOpenWriting}
            onOpenConnect={handleOpenConnect}
          />
        )}
        {currentPage === 'connect' && (
          <ConnectPage
            onReturnHome={() => handleReturnFromConnect('hero')}
            onNavigateToWork={() => handleReturnFromConnect('work')}
            onNavigateToWriting={() => handleReturnFromConnect('writing')}
            onNavigateToAbout={() => handleReturnFromConnect('about')}
          />
        )}
      </div>

      {/* INNER CIRCLE NOTIFICATION TABLET (SMALL TABLET FROM TOP, AUTO-DISSOLVES) */}
      {innerCircleStatus !== 'hidden' && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed top-5 sm:top-7 left-1/2 -translate-x-1/2 z-[300] pointer-events-none select-none max-w-[92vw]"
        >
          <div
            className={`flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-[#0a0a0c]/92 text-white border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_24px_rgba(255,255,255,0.08)] backdrop-blur-xl ${
              innerCircleStatus === 'enter' ? 'animate-tablet-enter' : 'animate-tablet-dissolve'
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-sans text-xs sm:text-[13.5px] font-medium tracking-wide text-neutral-100 whitespace-nowrap">
              You're in the inner circle!
            </span>
          </div>
        </aside>
      )}
    </div>
  );
}
