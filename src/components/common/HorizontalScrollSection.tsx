import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HorizontalScrollSectionHandle {
  scrollToCardIndex: (index: number) => void;
  refresh: () => void;
}

export interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  pinClassName?: string;
  trackClassName?: string;
  topIndicator?: React.ReactNode;
  bottomIndicator?: React.ReactNode;
  activeDependency?: unknown;
  scrollDistanceMultiplier?: number;
  minScrollDistance?: number;
  enableSnap?: boolean;
  onProgress?: (progress: number) => void;
  onActiveCardIndexChange?: (index: number) => void;
}

export const HorizontalScrollSection = forwardRef<
  HorizontalScrollSectionHandle,
  HorizontalScrollSectionProps
>(
  (
    {
      children,
      id,
      className = '',
      pinClassName = '',
      trackClassName = '',
      topIndicator,
      bottomIndicator,
      activeDependency,
      scrollDistanceMultiplier,
      minScrollDistance,
      enableSnap = false,
      onProgress,
      onActiveCardIndexChange,
    },
    ref
  ) => {
    const sectionWrapperRef = useRef<HTMLDivElement>(null);
    const pinViewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

    // Provide imperative controls to jump to specific cards (e.g. bay tabs)
    useImperativeHandle(ref, () => ({
      scrollToCardIndex: (index: number) => {
        const track = trackRef.current;
        if (!track) return;
        const cards = Array.from(track.children) as HTMLElement[];
        const targetCard = cards[index];
        if (!targetCard) return;

        if (window.innerWidth >= 1024 && scrollTriggerInstanceRef.current) {
          const st = scrollTriggerInstanceRef.current;
          const paddingRight = 64;
          const totalDistance = Math.max(1, track.scrollWidth - window.innerWidth + paddingRight);
          const cardOffset = Math.max(0, targetCard.offsetLeft - track.offsetLeft);
          const progress = Math.min(1, Math.max(0, cardOffset / totalDistance));
          const targetY = st.start + progress * (st.end - st.start);

          const lenis = (window as any).__lenis;
          if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(targetY, { duration: 1.0 });
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        } else {
          targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      },
      refresh: () => {
        ScrollTrigger.refresh();
      },
    }));

    // Trigger ScrollTrigger recalculation when active category or child count changes
    useEffect(() => {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
      return () => clearTimeout(timer);
    }, [activeDependency]);

    // Setup mobile / touch scroll listener for indicators
    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      const handleTouchTrackScroll = () => {
        if (window.innerWidth >= 1024) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 0) return;
        const progress = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));
        onProgress?.(progress);

        if (onActiveCardIndexChange) {
          const cards = Array.from(track.children) as HTMLElement[];
          const currentCenter = track.scrollLeft + track.clientWidth / 2;
          let activeIdx = 0;
          let minDiff = Infinity;
          cards.forEach((card, idx) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const diff = Math.abs(cardCenter - currentCenter);
            if (diff < minDiff) {
              minDiff = diff;
              activeIdx = idx;
            }
          });
          onActiveCardIndexChange(activeIdx);
        }
      };

      track.addEventListener('scroll', handleTouchTrackScroll, { passive: true });
      return () => track.removeEventListener('scroll', handleTouchTrackScroll);
    }, [onProgress, onActiveCardIndexChange]);

    // Setup pinned horizontal scrolling on desktop using GSAP ScrollTrigger
    useEffect(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      const track = trackRef.current;
      const pinViewport = pinViewportRef.current;
      const sectionWrapper = sectionWrapperRef.current;
      if (!track || !pinViewport || !sectionWrapper) return;

      const mm = gsap.matchMedia();

      // Only create pinned horizontal scroll on desktop (min-width: 1024px)
      mm.add('(min-width: 1024px)', () => {
        const getHorizontalTravel = () => {
          const paddingRight = 64;
          return Math.max(0, track.scrollWidth - window.innerWidth + paddingRight);
        };

        const getVerticalDuration = () => {
          const hTravel = getHorizontalTravel();
          if (minScrollDistance) {
            return Math.max(hTravel, minScrollDistance);
          }
          if (scrollDistanceMultiplier) {
            return Math.max(hTravel * scrollDistanceMultiplier, 1600);
          }
          return Math.max(hTravel, 1200);
        };

        const tween = gsap.to(track, {
          x: () => -getHorizontalTravel(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionWrapper,
            start: 'top top',
            end: () => `+=${getVerticalDuration()}`,
            pin: pinViewport,
            anticipatePin: 1,
            scrub: 0.5,
            invalidateOnRefresh: true,
            ...(enableSnap ? {
              snap: {
                snapTo: (progress: number) => {
                  const distance = getHorizontalTravel();
                  if (distance <= 0) return progress;
                  const cards = Array.from(track.children) as HTMLElement[];
                  if (cards.length <= 1) return progress;

                  const snapPoints = [0];
                  cards.forEach((card, idx) => {
                    if (idx === 0) return;
                    const offset = card.offsetLeft - track.offsetLeft;
                    snapPoints.push(Math.min(1, Math.max(0, offset / distance)));
                  });
                  snapPoints.push(1);

                  let closest = snapPoints[0];
                  let minDiff = Math.abs(progress - closest);
                  for (let i = 1; i < snapPoints.length; i++) {
                    const diff = Math.abs(progress - snapPoints[i]);
                    if (diff < minDiff) {
                      minDiff = diff;
                      closest = snapPoints[i];
                    }
                  }
                  return closest;
                },
                duration: { min: 0.2, max: 0.4 },
                delay: 0.1,
                ease: 'power1.out',
              }
            } : {}),
            onUpdate: (self) => {
              onProgress?.(self.progress);

              // Update active card index for indicators
              if (onActiveCardIndexChange) {
                const distance = getHorizontalTravel();
                const currentTranslate = self.progress * distance;
                const cards = Array.from(track.children) as HTMLElement[];
                let activeIdx = 0;
                let minDistance = Infinity;

                cards.forEach((card, idx) => {
                  const cardOffset = card.offsetLeft - track.offsetLeft;
                  const diff = Math.abs(cardOffset - currentTranslate);
                  if (diff < minDistance) {
                    minDistance = diff;
                    activeIdx = idx;
                  }
                });
                onActiveCardIndexChange(activeIdx);
              }
            },
          },
        });

        scrollTriggerInstanceRef.current = tween.scrollTrigger ?? null;

        return () => {
          tween.kill();
          scrollTriggerInstanceRef.current = null;
        };
      });

      // Cleanup and revert when resizing below 1024px or unmounting
      return () => {
        mm.revert();
      };
    }, [onProgress, onActiveCardIndexChange, minScrollDistance, scrollDistanceMultiplier, enableSnap]);

    return (
      <div
        ref={sectionWrapperRef}
        id={id}
        className={`horizontal-section-wrapper relative w-full ${className}`}
      >
        {/* Pinned full-viewport deck on desktop */}
        <div
          ref={pinViewportRef}
          className={`horizontal-section-pin w-full flex flex-col overflow-hidden relative ${
            pinClassName.includes('h-') ? '' : 'lg:h-screen'
          } ${
            topIndicator ? 'pt-1 sm:pt-2' : 'pt-0'
          } ${bottomIndicator ? 'pb-2 sm:pb-4' : 'pb-0'} ${
            pinClassName || 'justify-center'
          }`}
        >
          {/* Top indicator / controls if provided */}
          {topIndicator && (
            <div className="shrink-0 w-full z-20 mb-2 sm:mb-3">
              {topIndicator}
            </div>
          )}

          {/* Horizontal Card Row: GPU accelerated translate3d on desktop; native horizontal scroll on mobile */}
          <div
            ref={trackRef}
            className={`horizontal-card-track flex flex-row gap-4 sm:gap-6 md:gap-10 overflow-x-auto lg:overflow-x-visible items-stretch no-scrollbar px-4 sm:px-8 md:px-14 select-none snap-x snap-proximity lg:snap-none ${trackClassName}`}
            style={{
              willChange: 'transform',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {children}
          </div>

          {/* Bottom indicator / progress bar if provided */}
          {bottomIndicator && (
            <div className="shrink-0 w-full z-20 mt-3 sm:mt-4">
              {bottomIndicator}
            </div>
          )}
        </div>
      </div>
    );
  }
);

HorizontalScrollSection.displayName = 'HorizontalScrollSection';
