import React, { useEffect, useRef, useState, useCallback } from 'react';

interface HeroProps {
  onOpenConnect?: () => void;
  onOpenWork?: () => void;
  onOpenWriting?: () => void;
  onOpenAbout?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConnect, onOpenWork, onOpenWriting, onOpenAbout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const connectBtnRef = useRef<HTMLAnchorElement>(null);
  const letterDBaseRef = useRef<HTMLSpanElement>(null);
  const letterDRimRef = useRef<HTMLSpanElement>(null);

  const [isDHovered, setIsDHovered] = useState(false);

  // Telemetry items state for glitch/scramble effect
  const [fragTexts, setFragTexts] = useState<string[]>([
    'vec3 normal = normalize(cross(dx, dy));',
    '0x7FFF_8000 // MEM_ALIGN',
    'POST /api/stream :: HTTP/2 [TLS 1.3]',
    'mat4 viewProj = u_proj * u_view;',
    'CIPHER::AES-GCM-256 [NONCE_AUTH]',
    'SECCOMP::BPF_FILTER [0-DAY SHIELD]',
  ]);

  const [cardinalTexts, setCardinalTexts] = useState<string[]>([
    'V·000°[Y+]',
    'V·180°[Y-]',
    '0x7F_SHACHK',
    'SEC_ENCLAVE·OK',
  ]);

  const defaultFragTexts = useRef<string[]>([
    'vec3 normal = normalize(cross(dx, dy));',
    '0x7FFF_8000 // MEM_ALIGN',
    'POST /api/stream :: HTTP/2 [TLS 1.3]',
    'mat4 viewProj = u_proj * u_view;',
    'CIPHER::AES-GCM-256 [NONCE_AUTH]',
    'SECCOMP::BPF_FILTER [0-DAY SHIELD]',
  ]);

  const defaultCardinalTexts = useRef<string[]>([
    'V·000°[Y+]',
    'V·180°[Y-]',
    '0x7F_SHACHK',
    'SEC_ENCLAVE·OK',
  ]);

  const baseGammaRef = useRef<number | null>(null);
  const baseBetaRef = useRef<number | null>(null);

  // Parallax and Movement tracking loop:
  // On Mobile: Follows the device's physical movements (gyroscope/accelerometer)
  // On Desktop: Follows cursor
  useEffect(() => {
    const root = document.documentElement;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animFrame: number;

    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 1024);

    let hasReceivedGyro = false;

    // Device Orientation handler for mobile devices (gyroscope / accelerometer)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      hasReceivedGyro = true;

      // Auto-calibrate baseline holding angle on first valid reading
      if (baseGammaRef.current === null || baseBetaRef.current === null) {
        baseGammaRef.current = e.gamma;
        baseBetaRef.current = Math.max(15, Math.min(75, e.beta));
      }

      // Calculate tilt deltas from resting handheld posture
      const deltaGamma = e.gamma - (baseGammaRef.current ?? 0);
      const deltaBeta = e.beta - (baseBetaRef.current ?? 45);

      // Map tilt angles (roughly ±30 degrees full comfortable range) to -0.5..0.5 normalized coordinates
      const normX = Math.max(-0.5, Math.min(0.5, deltaGamma / 32));
      const normY = Math.max(-0.5, Math.min(0.5, deltaBeta / 32));

      const width = window.innerWidth || 390;
      const height = window.innerHeight || 844;

      // Update target coordinate driven by physical device tilt
      targetX = width * (0.5 + normX);
      targetY = height * (0.5 + normY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // If on mobile device with orientation active, ignore mouse to prioritize device movements
      if (hasReceivedGyro && isTouchDevice) return;
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Fallback: if gyroscope is unavailable or flat on desk, touch drag also directs coordinates
      if (!hasReceivedGyro && e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
      }
    };

    // Attach device orientation listener
    if (typeof window !== 'undefined' && 'ondeviceorientation' in window) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // Auto-request permission on iOS if required on first touch
    const handleFirstTouch = async () => {
      const anyDOE = window.DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (typeof anyDOE !== 'undefined' && typeof anyDOE.requestPermission === 'function') {
        try {
          const res = await anyDOE.requestPermission();
          if (res === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, { passive: true });
          }
        } catch {
          // Ignore
        }
      }
    };
    window.addEventListener('touchstart', handleFirstTouch, { once: true, passive: true });

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const updateFrame = () => {
      // Smooth dampening towards target coordinates (device orientation or cursor)
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;

      const width = window.innerWidth || 1920;
      const height = window.innerHeight || 1080;

      const normX = currentX / width - 0.5;
      const normY = currentY / height - 0.5;

      const xPercent = ((currentX / width) * 100).toFixed(2);
      const yPercent = ((currentY / height) * 100).toFixed(2);

      root.style.setProperty('--mouse-x', `${xPercent}%`);
      root.style.setProperty('--mouse-y', `${yPercent}%`);
      root.style.setProperty('--mouse-px-x', `${currentX.toFixed(1)}px`);
      root.style.setProperty('--mouse-px-y', `${currentY.toFixed(1)}px`);

      // Parallax depths (amplified slightly for handheld device tilt responsiveness)
      const ringsMultiplier = isTouchDevice ? -28 : -22;
      const metaMultiplier = isTouchDevice ? 32 : 26;
      const spotMultiplier = isTouchDevice ? -44 : -35;
      const tiltMultiplier = isTouchDevice ? 10.5 : 7.5;

      const ringsParallaxX = (normX * ringsMultiplier).toFixed(2);
      const ringsParallaxY = (normY * ringsMultiplier).toFixed(2);
      root.style.setProperty('--parallax-rings-x', `${ringsParallaxX}px`);
      root.style.setProperty('--parallax-rings-y', `${ringsParallaxY}px`);

      const metaParallaxX = (normX * metaMultiplier).toFixed(2);
      const metaParallaxY = (normY * metaMultiplier).toFixed(2);
      root.style.setProperty('--parallax-meta-x', `${metaParallaxX}px`);
      root.style.setProperty('--parallax-meta-y', `${metaParallaxY}px`);

      const spotParallaxX = (normX * spotMultiplier).toFixed(2);
      const spotParallaxY = (normY * spotMultiplier).toFixed(2);
      root.style.setProperty('--parallax-spot-x', `${spotParallaxX}px`);
      root.style.setProperty('--parallax-spot-y', `${spotParallaxY}px`);

      // 3D perspective tilt
      const tiltX = (normY * -tiltMultiplier).toFixed(2);
      const tiltY = (normX * tiltMultiplier).toFixed(2);
      root.style.setProperty('--tilt-x', `${tiltX}deg`);
      root.style.setProperty('--tilt-y', `${tiltY}deg`);

      // Proximity check for letter 'D'
      if (letterDBaseRef.current) {
        const dRect = letterDBaseRef.current.getBoundingClientRect();
        const dCenterX = dRect.left + dRect.width / 2;
        const dCenterY = dRect.top + dRect.height / 2;
        const dist = Math.hypot(currentX - dCenterX, currentY - dCenterY);
        const inBounds =
          (currentX >= dRect.left &&
            currentX <= dRect.right &&
            currentY >= dRect.top &&
            currentY <= dRect.bottom) ||
          dist < dRect.width * 0.75;

        setIsDHovered(inBounds);
      }

      // Proximity check for telemetry fragments
      const fragmentElements = document.querySelectorAll<HTMLElement>('.proximity-fragment');
      fragmentElements.forEach((frag) => {
        const fragRect = frag.getBoundingClientRect();
        const fragCenterX = fragRect.left + fragRect.width / 2;
        const fragCenterY = fragRect.top + fragRect.height / 2;
        const dist = Math.hypot(currentX - fragCenterX, currentY - fragCenterY);
        const threshold = isTouchDevice ? 210 : 175;

        if (dist < threshold) {
          const intensity = 1 - dist / threshold;
          frag.style.opacity = (0.28 + intensity * 0.72).toFixed(2);
          frag.style.filter = `blur(${((1 - intensity) * 0.2).toFixed(1)}px)`;
          frag.style.transform = `scale(${(1 + intensity * 0.06).toFixed(3)})`;
          frag.style.color = intensity > 0.35 ? '#ffffff' : '#c4c4c4';
          frag.style.textShadow = `0 0 ${(intensity * 16).toFixed(1)}px rgba(255,255,255,${(intensity * 0.95).toFixed(2)})`;
          frag.style.borderColor = `rgba(255,255,255,${(intensity * 0.45).toFixed(2)})`;
          frag.style.boxShadow = `0 0 ${(intensity * 16).toFixed(1)}px rgba(255,255,255,${(intensity * 0.25).toFixed(2)})`;
        } else if (!frag.matches(':hover')) {
          frag.style.opacity = '';
          frag.style.filter = '';
          frag.style.transform = '';
          frag.style.color = '';
          frag.style.textShadow = '';
          frag.style.borderColor = '';
          frag.style.boxShadow = '';
        }
      });

      animFrame = requestAnimationFrame(updateFrame);
    };

    animFrame = requestAnimationFrame(updateFrame);

    return () => {
      cancelAnimationFrame(animFrame);
      if (typeof window !== 'undefined' && 'ondeviceorientation' in window) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  // Glitch effect on telemetry fragments
  const glitchTimerRef = useRef<{ [key: number]: number | null }>({});
  const handleFragMouseEnter = useCallback((index: number) => {
    const originalText = defaultFragTexts.current[index];
    const hexChars = '0123456789ABCDEF!_#<>';
    let iterations = 0;

    if (glitchTimerRef.current[index]) {
      clearInterval(glitchTimerRef.current[index]!);
    }

    glitchTimerRef.current[index] = window.setInterval(() => {
      setFragTexts((prev) => {
        const next = [...prev];
        next[index] = originalText
          .split('')
          .map((char, charIdx) => {
            if (char === ' ' || char === '/' || char === ':' || char === '[' || char === ']' || char === '(' || char === ')') {
              return char;
            }
            if (charIdx < iterations) return originalText[charIdx];
            return hexChars[Math.floor(Math.random() * hexChars.length)];
          })
          .join('');
        return next;
      });

      if (iterations >= originalText.length) {
        if (glitchTimerRef.current[index]) clearInterval(glitchTimerRef.current[index]!);
        setFragTexts((prev) => {
          const next = [...prev];
          next[index] = originalText;
          return next;
        });
      }
      iterations += 2;
    }, 20);
  }, []);

  const handleFragMouseLeave = useCallback((index: number) => {
    if (glitchTimerRef.current[index]) {
      clearInterval(glitchTimerRef.current[index]!);
    }
    setFragTexts((prev) => {
      const next = [...prev];
      next[index] = defaultFragTexts.current[index];
      return next;
    });
  }, []);

  // Cardinal points number glitch on hover
  const cardinalTimerRef = useRef<{ [key: number]: number | null }>({});
  const handleCardinalMouseEnter = useCallback((index: number) => {
    const base = defaultCardinalTexts.current[index];
    let count = 0;
    if (cardinalTimerRef.current[index]) clearInterval(cardinalTimerRef.current[index]!);

    cardinalTimerRef.current[index] = window.setInterval(() => {
      if (count > 4) {
        setCardinalTexts((prev) => {
          const next = [...prev];
          next[index] = base;
          return next;
        });
        if (cardinalTimerRef.current[index]) clearInterval(cardinalTimerRef.current[index]!);
      } else {
        setCardinalTexts((prev) => {
          const next = [...prev];
          next[index] = base.replace(/\d/g, () => Math.floor(Math.random() * 9).toString());
          return next;
        });
        count++;
      }
    }, 35);
  }, []);

  const handleCardinalMouseLeave = useCallback((index: number) => {
    if (cardinalTimerRef.current[index]) clearInterval(cardinalTimerRef.current[index]!);
    setCardinalTexts((prev) => {
      const next = [...prev];
      next[index] = defaultCardinalTexts.current[index];
      return next;
    });
  }, []);

  // Magnetic connect button
  const handleConnectMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = connectBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${offsetX * 0.26}px, ${offsetY * 0.26}px) scale(1.05)`;
    const angle = Math.atan2(offsetY, offsetX) * (180 / Math.PI) + 90;
    btn.style.setProperty('--btn-angle', `${angle}deg`);
  };

  const handleConnectMouseLeave = () => {
    const btn = connectBtnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0px, 0px) scale(1)';
  };

  return (
    <main
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-black select-none"
      id="hero-viewport"
      data-purpose="hero-viewport"
    >
      {/* Heavy Analog Film Grain Overlay via SVG Filter */}
      <svg aria-hidden="true" className="hidden">
        <filter id="noiseFilterHeavy">
          <feTurbulence baseFrequency="0.92" numOctaves={4} stitchTiles="stitch" type="fractalNoise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 1 0 0" />
        </filter>
      </svg>
      <div
        aria-hidden="true"
        className="grain-overlay opacity-[0.24] mix-blend-screen pointer-events-none fixed inset-0 z-50"
        style={{ filter: 'url(#noiseFilterHeavy)' }}
      />

      {/* Ambient Cold White Spotlight & Vignette Background */}
      <div aria-hidden="true" className="spotlight-layer absolute inset-0 z-[5]" id="spotlight" />
      <div aria-hidden="true" className="vignette-layer absolute inset-0 z-10" />

      {/* ========================================================================= */}
      {/* MASSIVE ARCHITECTURAL BACKDROP: "ADITHYA" WITH CURSOR RIM LIGHTING       */}
      {/* ========================================================================= */}
      <div aria-hidden="true" className="adithya-backdrop select-none">
        {/* Solid deep abyssal void fill with interactive running red lines on 'D' */}
        <span className="adithya-text-base">
          <span>A</span>
          <span
            ref={letterDBaseRef}
            className={`target-letter-d ${isDHovered ? 'is-hovered' : ''}`}
            id="letter-d-base"
          >
            D
          </span>
          <span>ITHYA</span>
        </span>
        {/* Cursor-tracked dynamic rim & edge-light contour */}
        <span className="adithya-text-rim" id="adithya-rim">
          <span>A</span>
          <span
            ref={letterDRimRef}
            className={`target-letter-d ${isDHovered ? 'is-hovered' : ''}`}
            id="letter-d-rim"
          >
            D
          </span>
          <span>ITHYA</span>
        </span>
      </div>

      {/* ========================================================================= */}
      {/* DYNAMIC COUNTER-ROTATING ORBITALS WITH 3D PERSPECTIVE TILT                */}
      {/* ========================================================================= */}
      <div aria-hidden="true" className="orbital-perspective-stage absolute inset-0 z-15 flex items-center justify-center pointer-events-none">
        <div className="orbit-container-parallax flex items-center justify-center">
          {/* OUTER ORBIT: 3D VERTEX MATRIX & FULL-STACK RUNTIME (Clockwise ~55s) */}
          <div className="outer-orbit-ring relative w-[min(90vw,780px)] h-[min(90vw,780px)] md:w-[min(76vw,860px)] md:h-[min(76vw,860px)] lg:w-[min(64vw,940px)] lg:h-[min(64vw,940px)] transition-all duration-700">
            {/* Clockwise rotating node */}
            <div className="orbit-outer-rotator">
              <div className="outer-beacon" />
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 font-micro text-[7.5px] tracking-[0.28em] text-neutral-400 whitespace-nowrap uppercase pointer-events-none">
                OUTER ORBIT // 3D VERTEX MATRIX &amp; FULL-STACK RUNTIME
              </div>
            </div>
            {/* Orbit Architectural Cardinals / Vector Grid Points */}
            <div
              onMouseEnter={() => handleCardinalMouseEnter(0)}
              onMouseLeave={() => handleCardinalMouseLeave(0)}
              className="orbit-cardinal absolute -top-3 left-1/2 -translate-x-1/2 font-micro text-[8px] tracking-[0.3em] text-neutral-500 select-none cursor-crosshair"
            >
              {cardinalTexts[0]}
            </div>
            <div
              onMouseEnter={() => handleCardinalMouseEnter(1)}
              onMouseLeave={() => handleCardinalMouseLeave(1)}
              className="orbit-cardinal absolute -bottom-3 left-1/2 -translate-x-1/2 font-micro text-[8px] tracking-[0.3em] text-neutral-500 select-none cursor-crosshair"
            >
              {cardinalTexts[1]}
            </div>
          </div>

          {/* INNER ORBIT: BINARY CIPHER & ZERO-DAY DEFENSE (Counter-Clockwise ~36s) */}
          <div className="inner-orbit-ring absolute w-[min(72vw,580px)] h-[min(72vw,580px)] md:w-[min(58vw,660px)] md:h-[min(58vw,660px)] lg:w-[min(46vw,700px)] lg:h-[min(46vw,700px)] transition-all duration-700">
            {/* Counter-clockwise rotating cipher beacon with soft halation rings */}
            <div className="orbit-inner-rotator">
              <div className="inner-beacon" />
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-micro text-[7.5px] tracking-[0.28em] text-neutral-400 whitespace-nowrap uppercase pointer-events-none">
                INNER ORBIT // BINARY CIPHER &amp; ZERO-DAY DEFENSE
              </div>
            </div>
            {/* Subtle Cipher Perimeter Markings */}
            <div
              onMouseEnter={() => handleCardinalMouseEnter(2)}
              onMouseLeave={() => handleCardinalMouseLeave(2)}
              className="orbit-cardinal absolute top-2 right-[24%] font-micro text-[7px] tracking-[0.2em] text-neutral-500 select-none cursor-crosshair"
            >
              {cardinalTexts[2]}
            </div>
            <div
              onMouseEnter={() => handleCardinalMouseEnter(3)}
              onMouseLeave={() => handleCardinalMouseLeave(3)}
              className="orbit-cardinal absolute bottom-2 left-[22%] font-micro text-[7px] tracking-[0.2em] text-neutral-500 select-none cursor-crosshair"
            >
              {cardinalTexts[3]}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AMBIENT FLOATING TELEMETRY & CODE FRAGMENTS (BREATHING & PHOSPHOR GLOW)    */}
      {/* ========================================================================= */}
      <div className="telemetry-parallax-container absolute inset-0 z-25 pointer-events-none overflow-hidden" id="proximity-container">
        {/* Fragment 1: Vector Normal */}
        <span
          onMouseEnter={() => handleFragMouseEnter(0)}
          onMouseLeave={() => handleFragMouseLeave(0)}
          className="proximity-fragment telemetry-node-breathe font-micro text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-400 top-[22%] left-[4%] sm:left-[16%] hidden xs:inline-block sm:block"
        >
          {fragTexts[0]}
        </span>

        {/* Fragment 2: Hex Cipher Hash */}
        <span
          onMouseEnter={() => handleFragMouseEnter(1)}
          onMouseLeave={() => handleFragMouseLeave(1)}
          className="proximity-fragment telemetry-node-breathe font-micro text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-400 top-[18%] right-[4%] sm:right-[18%]"
          style={{ animationDelay: '-2s' }}
        >
          {fragTexts[1]}
        </span>

        {/* Fragment 3: Stream API Route */}
        <span
          onMouseEnter={() => handleFragMouseEnter(2)}
          onMouseLeave={() => handleFragMouseLeave(2)}
          className="proximity-fragment telemetry-node-breathe font-micro text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-400 top-[52%] left-[4%] sm:left-[10%] hidden md:block"
          style={{ animationDelay: '-3.5s' }}
        >
          {fragTexts[2]}
        </span>

        {/* Fragment 4: Vertex Transformation Matrix */}
        <span
          onMouseEnter={() => handleFragMouseEnter(3)}
          onMouseLeave={() => handleFragMouseLeave(3)}
          className="proximity-fragment telemetry-node-breathe font-micro text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-400 top-[56%] right-[4%] sm:right-[9%] hidden md:block"
          style={{ animationDelay: '-1s' }}
        >
          {fragTexts[3]}
        </span>

        {/* Fragment 5: Cryptographic Enclave Attestation */}
        <span
          onMouseEnter={() => handleFragMouseEnter(4)}
          onMouseLeave={() => handleFragMouseLeave(4)}
          className="proximity-fragment telemetry-node-breathe font-micro text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-400 bottom-[22%] left-[4%] sm:left-[18%]"
          style={{ animationDelay: '-4.5s' }}
        >
          {fragTexts[4]}
        </span>

        {/* Fragment 6: Zero-Day Sandbox Defense */}
        <span
          onMouseEnter={() => handleFragMouseEnter(5)}
          onMouseLeave={() => handleFragMouseLeave(5)}
          className="proximity-fragment telemetry-node-breathe font-micro text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-400 bottom-[18%] right-[4%] sm:right-[19%] hidden sm:block"
          style={{ animationDelay: '-2.8s' }}
        >
          {fragTexts[5]}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* TOP NAVIGATION HEADER SPACER (STICKY HEADER MOUNTED GLOBALLY)             */}
      {/* ========================================================================= */}
      <div
        className="w-full pt-7 sm:pt-8 md:pt-10 pb-4 sm:pb-5 md:pb-6 opacity-0 pointer-events-none select-none shrink-0"
        aria-hidden="true"
        style={{ minHeight: '84px' }}
      />

      {/* ========================================================================= */}
      {/* CENTRAL VISUAL CANVAS (MONUMENTAL HEADLINE - 100% SOLID OPACITY)         */}
      {/* ========================================================================= */}
      <section
        className="relative flex-1 w-full flex items-center justify-center overflow-hidden z-20 px-6 cursor-default"
        data-purpose="editorial-composition"
        onMouseEnter={() => {
          document.documentElement.style.setProperty('--spot-intensity', '0.28');
        }}
        onMouseLeave={() => {
          document.documentElement.style.setProperty('--spot-intensity', '0.18');
        }}
      >
        <div className="hero-interactive-title text-center select-none max-w-5xl mx-auto flex flex-col items-center justify-center group" id="hero-title-container">
          <div className="py-2">
            <h1
              className="hero-solid-monolith font-giant leading-[0.92] uppercase m-0 p-0 text-center tracking-[-0.01em]"
              style={{ fontSize: 'clamp(1.45rem, 4.8vw, 4.2rem)' }}
            >
              <span className="block">FULL-STACK</span>
              <span
                className="tracking-[-0.01em] font-giant block mt-0.5 md:mt-1"
                style={{ fontSize: 'clamp(1.25rem, 4.2vw, 3.8rem)' }}
              >
                &amp; SECURITY
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BOTTOM STATUS BAR & CONNECT BUTTON                                       */}
      {/* ========================================================================= */}
      <footer
        className="relative z-50 w-full px-5 sm:px-6 md:px-12 pb-6 sm:pb-8 md:pb-10 flex items-center sm:items-end justify-between gap-4 opacity-75 sm:opacity-60 hover:opacity-100 transition-opacity duration-500"
        data-purpose="editorial-footer"
      >
        {/* Bottom-Left: Status Indicator with Active Multi-Ring Radar Ping (NO extra tab) */}
        <div className="flex items-center gap-2 sm:gap-2.5 group cursor-default" id="status-badge">
          <span aria-hidden="true" className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"
              style={{ backgroundColor: 'rgb(255, 0, 60)' }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{
                backgroundColor: 'rgb(255, 0, 60)',
                boxShadow:
                  'rgba(255, 0, 60, 0.85) 0px 0px 10px 2px, rgba(255, 0, 60, 0.5) 0px 0px 20px 4px',
                animation: '2s cubic-bezier(0.4, 0, 0.6, 1) 0s infinite normal none running pulse',
              }}
            />
          </span>
          <p className="font-micro text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.24em] uppercase text-neutral-400 group-hover:text-white transition-colors duration-300">
            AVAILABLE FOR WORK
          </p>
        </div>

        {/* Bottom-Right: Single Elegant Pill Button with Magnetic Lift & Glowing Sweep */}
        <div className="flex items-center">
          <a
            ref={connectBtnRef}
            href="#contact"
            onClick={(e) => {
              if (onOpenConnect) {
                e.preventDefault();
                onOpenConnect();
              }
            }}
            onMouseMove={handleConnectMouseMove}
            onMouseLeave={handleConnectMouseLeave}
            className="btn-connect-glow relative inline-flex items-center justify-center font-micro text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.24em] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-neutral-800 backdrop-blur-md hover:bg-white hover:text-black hover:border-white focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
            data-purpose="cta-button"
            id="connect-button"
          >
            CONNECT
          </a>
        </div>
      </footer>
    </main>
  );
};
