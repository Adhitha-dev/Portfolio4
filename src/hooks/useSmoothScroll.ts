import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseSmoothScrollOptions {
  enabled?: boolean;
  routeKey?: string;
}

/**
 * Universal smooth scrolling hook using Lenis and GSAP ScrollTrigger.
 * Works across all pages (Hero, Work, Writing, Dispatch, About, Connect) on desktop.
 */
export function useSmoothScroll({
  enabled = true,
  routeKey,
}: UseSmoothScrollOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis once on desktop
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

    if (!enabled || prefersReducedMotion || !isDesktop) {
      window.scrollTo(0, 0);
      return;
    }

    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as any).__lenis = lenis;
    }

    lenis.scrollTo(0, { immediate: true });

    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerUpdate);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined') {
        delete (window as any).__lenis;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [enabled]);

  // When routeKey changes (e.g. user navigates between pages):
  // Immediately reset scroll position to top and refresh ScrollTrigger for the new page
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    }
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 80);

    return () => clearTimeout(timer);
  }, [routeKey]);

  return lenisRef;
}
