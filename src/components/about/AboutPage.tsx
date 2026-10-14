import React, { useState, useEffect, useRef } from 'react';
import { Key, Check, ArrowRight, ExternalLink } from 'lucide-react';

interface AboutPageProps {
  onReturnHome: () => void;
  onNavigateWork: () => void;
  onNavigateWriting: () => void;
  onOpenConnect: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onReturnHome,
  onNavigateWork,
  onNavigateWriting,
  onOpenConnect,
}) => {
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);

  // Dynamic cursor proximity spotlight
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 0, 60, 0.035), rgba(255, 255, 255, 0.02) 40%, transparent 80%)`;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Air-gapped PGP Fingerprint Copy Action
  const handleCopyFingerprint = async () => {
    const fingerprint = '9C04 E28A 4F71 BD88 7B00 D3F2 19EC 899B A0E4';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fingerprint);
      }
      setCopiedFingerprint(true);
      setTimeout(() => {
        setCopiedFingerprint(false);
      }, 2400);
    } catch {
      setCopiedFingerprint(true);
      setTimeout(() => {
        setCopiedFingerprint(false);
      }, 2400);
    }
  };

  // Magnetic hover on Establish Link CTA
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ctaBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleCtaMouseLeave = () => {
    const btn = ctaBtnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div className="bg-[#040405] font-body text-[#f5f5f7] antialiased min-h-screen flex flex-col aperture-grain relative overflow-x-hidden selection:bg-[#f5f5f7] selection:text-[#040405]">
      {/* Ambient Concentric Orbital Aperture Background Rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden z-0 max-w-full"
      >
        <div className="w-[320px] h-[320px] sm:w-[640px] sm:h-[640px] orbit-ring-dashed opacity-30 sm:opacity-40" />
        <div className="w-[520px] h-[520px] sm:w-[960px] sm:h-[960px] orbit-ring opacity-20 sm:opacity-30 absolute" />
        <div className="w-[760px] h-[760px] sm:w-[1400px] sm:h-[1400px] orbit-ring opacity-10 sm:opacity-20 absolute hidden sm:block" />
        <div className="w-[1000px] h-[1000px] sm:w-[1900px] sm:h-[1900px] orbit-ring-dashed opacity-10 absolute hidden md:block" />
      </div>

      {/* Interactive Cursor Spotlight Layer */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 mouse-spotlight"
      />

      {/* Main Planetary Dossier Content */}
      <main className="relative z-10 w-full flex-1 pt-20 sm:pt-28 md:pt-36 overflow-x-hidden">
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-20 flex flex-col gap-16 sm:gap-24 lg:gap-36">
          
          {/* SECTION 0: HERITAGE & CORPUS SUMMARY */}
          <section className="flex flex-col gap-8 sm:gap-14 animate-stage-hero">
            <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-aperture text-[#4a4b57]">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[#898a96]">APERTURE RECORD 00</span>
                <span className="text-[#1e1e26]">/</span>
                <span className="text-[#898a96]">INDEXED CORPUS</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[#4a4b57] font-mono tracking-widest">
                <span className="hover:text-[#898a96] transition-colors cursor-crosshair">LAT 28.6139°</span>
                <span className="hover:text-[#898a96] transition-colors cursor-crosshair">LON 77.2090°</span>
                <span className="hover:text-[#898a96] transition-colors cursor-crosshair">AZIMUTH 142.4°</span>
              </div>
            </div>

            <div className="max-w-5xl">
              <h1 className="font-headline text-2xl sm:text-6xl lg:text-8xl tracking-tight uppercase text-[#f5f5f7] leading-[1.02] sm:leading-[0.98] font-normal transition-colors duration-500 hover:text-white">
                LOW-LEVEL SYSTEMS &{' '}
                <span className="text-[#898a96] hover:text-[#d2d2db] transition-colors duration-300">
                  VOLUMETRIC COMPUTING.
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-2 sm:pt-4 items-start animate-stage-stats">
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <p className="font-body text-[13px] sm:text-base lg:text-lg text-[#d2d2db] font-light leading-relaxed max-w-2xl">
                  Systems architect navigating the boundary layer of physical compute, zero-copy kernel pipelines, and hardware-accelerated spatial volumetrics. Eight years formulating deterministic runtimes, formal cryptographic verifications, and real-time GPU compute kernels.
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-stellar text-[#4a4b57] pt-1 sm:pt-2">
                  <span className="inline-flex items-center gap-2 text-[#a1a1aa]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                    Uptime: 99.998%
                  </span>
                  <span className="text-[#1e1e26] hidden sm:inline">•</span>
                  <span className="text-[#898a96]">Architecture: 4.80 GHz Native</span>
                </div>
              </div>

              {/* Four Interactive Metric Cards */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-y-10 sm:gap-x-8">
                {/* Metric 1 */}
                <div className="metric-card p-3 sm:p-4 rounded-2xl relative border border-white/5 sm:border-transparent hover:border-white/10 hover:bg-white/[0.02] bg-white/[0.01] cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-stellar text-[#4a4b57] group-hover:text-[#898a96] transition-colors">
                      Latency
                    </span>
                    <span className="metric-pip w-1.5 h-1.5 rounded-full bg-[#ff003c] shadow-[0_0_8px_#ff003c] opacity-0 scale-50 transition-all duration-300" />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1">
                    <span className="metric-val font-headline text-3xl sm:text-4xl lg:text-5xl text-[#f5f5f7] leading-none transition-all duration-200">
                      0.38
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-[#898a96] group-hover:text-white transition-colors">
                      ms
                    </span>
                  </div>
                  <span className="font-body text-[11px] sm:text-xs text-[#898a96] mt-1 block group-hover:text-[#d2d2db] transition-colors">
                    Sub-ms RPC
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="metric-card p-3 sm:p-4 rounded-2xl relative border border-white/5 sm:border-transparent hover:border-white/10 hover:bg-white/[0.02] bg-white/[0.01] cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-stellar text-[#4a4b57] group-hover:text-[#898a96] transition-colors">
                      Proof Horizon
                    </span>
                    <span className="metric-pip w-1.5 h-1.5 rounded-full bg-[#ff003c] shadow-[0_0_8px_#ff003c] opacity-0 scale-50 transition-all duration-300" />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1">
                    <span className="metric-val font-headline text-3xl sm:text-4xl lg:text-5xl text-[#f5f5f7] leading-none transition-all duration-200">
                      142
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-[#898a96] group-hover:text-white transition-colors">
                      / verified
                    </span>
                  </div>
                  <span className="font-body text-[11px] sm:text-xs text-[#898a96] mt-1 block group-hover:text-[#d2d2db] transition-colors">
                    Formal proofs
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="metric-card p-3 sm:p-4 rounded-2xl relative border border-white/5 sm:border-transparent hover:border-white/10 hover:bg-white/[0.02] bg-white/[0.01] cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-stellar text-[#4a4b57] group-hover:text-[#898a96] transition-colors">
                      Spatial
                    </span>
                    <span className="metric-pip w-1.5 h-1.5 rounded-full bg-[#ff003c] shadow-[0_0_8px_#ff003c] opacity-0 scale-50 transition-all duration-300" />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1">
                    <span className="metric-val font-headline text-3xl sm:text-4xl lg:text-5xl text-[#f5f5f7] leading-none transition-all duration-200">
                      60
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-[#898a96] group-hover:text-white transition-colors">
                      fps
                    </span>
                  </div>
                  <span className="font-body text-[11px] sm:text-xs text-[#898a96] mt-1 block group-hover:text-[#d2d2db] transition-colors">
                    Volumetric
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="metric-card p-3 sm:p-4 rounded-2xl relative border border-white/5 sm:border-transparent hover:border-white/10 hover:bg-white/[0.02] bg-white/[0.01] cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-stellar text-[#4a4b57] group-hover:text-[#898a96] transition-colors">
                      Allocation
                    </span>
                    <span className="metric-pip w-1.5 h-1.5 rounded-full bg-[#ff003c] shadow-[0_0_8px_#ff003c] opacity-0 scale-50 transition-all duration-300" />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1">
                    <span className="metric-val font-headline text-3xl sm:text-4xl lg:text-5xl text-[#f5f5f7] leading-none transition-all duration-200">
                      0-Alloc
                    </span>
                  </div>
                  <span className="font-body text-[11px] sm:text-xs text-[#898a96] mt-1 block group-hover:text-[#d2d2db] transition-colors">
                    Kernel bypass
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 1: TRI-AXIS CARTOGRAPHY */}
          <section className="flex flex-col gap-8 sm:gap-12 animate-stage-axes">
            <div className="flex items-center justify-between pb-3 sm:pb-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-aperture text-[#4a4b57] border-b border-white/[0.04]">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[#898a96]">APERTURE RECORD 01</span>
                <span className="text-[#1e1e26]">/</span>
                <span className="text-[#d2d2db]">TRI-AXIS CARTOGRAPHY</span>
              </div>
              <span className="text-[#898a96] tracking-widest hidden sm:inline">SPHERICAL POLAR FOCUS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {/* Axis 01 */}
              <div className="axis-card group flex flex-col justify-between gap-6 sm:gap-8 relative p-5 sm:p-7 rounded-2xl border border-white/[0.06] sm:border-transparent hover:border-white/10 hover:bg-white/[0.03] overflow-hidden bg-white/[0.01]">
                <div className="sweep-line" />
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#898a96] group-hover:bg-[#ff003c] group-hover:shadow-[0_0_8px_#ff003c] group-hover:scale-125 transition-all" />
                    <span className="font-mono text-[10px] uppercase tracking-aperture text-[#898a96] group-hover:text-white transition-colors">
                      Axis 01 • Systems
                    </span>
                  </div>
                  <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide text-[#f5f5f7] leading-tight group-hover:text-white transition-colors">
                    High-Throughput Web Runtimes
                  </h2>
                  <p className="font-body text-[11px] sm:text-sm text-[#898a96] font-light leading-relaxed group-hover:text-[#d2d2db] transition-colors">
                    Distributed event-sourcing engines and eBPF telemetry hooks. Rust WebAssembly compilation pipelines tuned for deterministic execution and low-overhead cluster orchestration.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    eBPF Telemetry
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    Rust Wasm
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    Sub-ms RPC
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    Lock-free
                  </span>
                </div>
              </div>

              {/* Axis 02 */}
              <div className="axis-card group flex flex-col justify-between gap-6 sm:gap-8 relative p-5 sm:p-7 rounded-2xl border border-white/[0.06] sm:border-transparent hover:border-white/10 hover:bg-white/[0.03] overflow-hidden bg-white/[0.01]">
                <div className="sweep-line" />
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#898a96] group-hover:bg-[#ff003c] group-hover:shadow-[0_0_8px_#ff003c] group-hover:scale-125 transition-all" />
                    <span className="font-mono text-[10px] uppercase tracking-aperture text-[#898a96] group-hover:text-white transition-colors">
                      Axis 02 • Security
                    </span>
                  </div>
                  <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide text-[#f5f5f7] leading-tight group-hover:text-white transition-colors">
                    Offensive Security & Binary Reversing
                  </h2>
                  <p className="font-body text-[11px] sm:text-sm text-[#898a96] font-light leading-relaxed group-hover:text-[#d2d2db] transition-colors">
                    Linux kernel vulnerability research, LLVM/QEMU snapshot fuzzing, and physical SDR signal parsing. Mathematical verification of Kyber-1024 post-quantum key encapsulation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    Kernel Fuzzing
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    Kyber-1024
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    LLVM AFL++
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    SDR RF Analysis
                  </span>
                </div>
              </div>

              {/* Axis 03 */}
              <div className="axis-card group flex flex-col justify-between gap-6 sm:gap-8 relative p-5 sm:p-7 rounded-2xl border border-white/[0.06] sm:border-transparent hover:border-white/10 hover:bg-white/[0.03] overflow-hidden bg-white/[0.01]">
                <div className="sweep-line" />
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#898a96] group-hover:bg-[#ff003c] group-hover:shadow-[0_0_8px_#ff003c] group-hover:scale-125 transition-all" />
                    <span className="font-mono text-[10px] uppercase tracking-aperture text-[#898a96] group-hover:text-white transition-colors">
                      Axis 03 • Spatial
                    </span>
                  </div>
                  <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide text-[#f5f5f7] leading-tight group-hover:text-white transition-colors">
                    Real-Time Graphics & Volumetrics
                  </h2>
                  <p className="font-body text-[11px] sm:text-sm text-[#898a96] font-light leading-relaxed group-hover:text-[#d2d2db] transition-colors">
                    Spatial engines driven by WebGPU and WGSL compute kernels. 3D Gaussian Splatting, signed distance fields (SDF), and photometrically grounded volumetric raymarching.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    WebGPU WGSL
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    3D Gaussian Splats
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    Raymarching SDF
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.03] text-[#898a96] group-hover:text-[#f5f5f7] group-hover:border-white/20 border border-transparent transition-all">
                    Voxel Compute
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: CHRONO AXIS & INSTRUMENTS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left: Chrono Axis (Timeline) */}
            <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-10 animate-stage-chrono">
              <div className="flex items-center justify-between pb-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-aperture text-[#4a4b57] border-b border-white/[0.04]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[#898a96]">APERTURE RECORD 02</span>
                  <span className="text-[#1e1e26]">/</span>
                  <span className="text-[#d2d2db]">CHRONO AXIS</span>
                </div>
                <span className="text-[#898a96]">3 ORBITAL PHASES</span>
              </div>

              <div className="relative pl-6 sm:pl-10 space-y-10 sm:space-y-14 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-3 before:w-[1px] before:bg-gradient-to-b before:from-white/20 before:via-white/10 before:to-transparent">
                {/* Timeline Item 1 */}
                <article className="relative flex flex-col gap-2.5 sm:gap-3 group transition-transform duration-300 hover:translate-x-1">
                  <span className="absolute -left-6 sm:-left-10 top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center bg-[#040405] border border-white/20 group-hover:border-[#ff003c] group-hover:shadow-[0_0_12px_rgba(255,0,60,0.4)] transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f5f5f7] group-hover:bg-[#ff003c] group-hover:scale-125 transition-transform" />
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-1 sm:gap-2">
                    <h3 className="font-headline text-xl sm:text-2xl uppercase tracking-wide text-[#f5f5f7] group-hover:text-white transition-colors">
                      Lead Systems Researcher
                    </h3>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#898a96] tracking-stellar uppercase group-hover:text-white transition-colors">
                      2023 — Present
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-stellar text-[#4a4b57] group-hover:text-[#898a96] transition-colors">
                    Zero-Copy Network Bypass & High-Density Event Brokers
                  </span>
                  <p className="font-body text-[11px] sm:text-sm text-[#898a96] font-light leading-relaxed group-hover:text-[#d2d2db] transition-colors">
                    Architected kernel bypass pipeline leveraging AF_XDP sockets and shared-ring buffers, yielding zero-alloc latency under 400ns per frame. Led formal TLA+ specifications for consensus engine state transitions across distributed topologies.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {['Rust', 'C++20', 'AF_XDP', 'eBPF', 'TLA+'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono text-[#898a96] bg-white/[0.02] border border-transparent hover:border-white/20 hover:text-white transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>

                {/* Timeline Item 2 */}
                <article className="relative flex flex-col gap-2.5 sm:gap-3 group transition-transform duration-300 hover:translate-x-1">
                  <span className="absolute -left-6 sm:-left-10 top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center bg-[#040405] border border-white/10 group-hover:border-[#ff003c] group-hover:shadow-[0_0_12px_rgba(255,0,60,0.4)] transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a4b57] group-hover:bg-[#ff003c] group-hover:scale-125 transition-transform" />
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-1 sm:gap-2">
                    <h3 className="font-headline text-xl sm:text-2xl uppercase tracking-wide text-[#d2d2db] group-hover:text-white transition-colors">
                      Offensive Security Engineer
                    </h3>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#4a4b57] tracking-stellar uppercase group-hover:text-white transition-colors">
                      2021 — 2023
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-stellar text-[#4a4b57] group-hover:text-[#898a96] transition-colors">
                    Binary Instrumentation, Vulnerability Research & Post-Quantum Crypto
                  </span>
                  <p className="font-body text-[11px] sm:text-sm text-[#898a96] font-light leading-relaxed group-hover:text-[#d2d2db] transition-colors">
                    Constructed custom LLVM pass fuzzers and QEMU snapshot engines targeting hypervisor driver endpoints. Verified post-quantum lattice cryptography key encapsulations and automated zero-day triage across VM boundaries.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {['C', 'Ghidra', 'LLVM AFL++', 'QEMU', 'Kyber-1024'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono text-[#898a96] bg-white/[0.02] border border-transparent hover:border-white/20 hover:text-white transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>

                {/* Timeline Item 3 */}
                <article className="relative flex flex-col gap-2.5 sm:gap-3 group transition-transform duration-300 hover:translate-x-1">
                  <span className="absolute -left-6 sm:-left-10 top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center bg-[#040405] border border-white/10 group-hover:border-[#ff003c] group-hover:shadow-[0_0_12px_rgba(255,0,60,0.4)] transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a4b57] group-hover:bg-[#ff003c] group-hover:scale-125 transition-transform" />
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-1 sm:gap-2">
                    <h3 className="font-headline text-xl sm:text-2xl uppercase tracking-wide text-[#d2d2db] group-hover:text-white transition-colors">
                      Graphics & Engine Architect
                    </h3>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#4a4b57] tracking-stellar uppercase group-hover:text-white transition-colors">
                      2019 — 2021
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-stellar text-[#4a4b57] group-hover:text-[#898a96] transition-colors">
                    Hardware Rasterization & Procedural Compute Matrices
                  </span>
                  <p className="font-body text-[11px] sm:text-sm text-[#898a96] font-light leading-relaxed group-hover:text-[#d2d2db] transition-colors">
                    Authored hardware-accelerated WebGPU visualizer streaming millions of coordinate points at locked 60Hz. Implemented tiled deferred compute shaders and real-time volumetric smoke simulation using raymarched voxel arrays.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {['WGSL', 'GLSL', 'WebGPU', 'TypeScript', 'C++'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono text-[#898a96] bg-white/[0.02] border border-transparent hover:border-white/20 hover:text-white transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </div>

            {/* Right: Instruments & PGP Capsule */}
            <div className="lg:col-span-5 flex flex-col gap-10 sm:gap-14 animate-stage-arsenal">
              {/* Instruments Matrix */}
              <div className="flex flex-col gap-5 sm:gap-6">
                <div className="flex items-center justify-between pb-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-aperture text-[#4a4b57] border-b border-white/[0.04]">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[#898a96]">APERTURE RECORD 03</span>
                    <span className="text-[#1e1e26]">/</span>
                    <span className="text-[#d2d2db]">INSTRUMENTS</span>
                  </div>
                  <span className="text-[#898a96]">CATALOG MATRIX</span>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  {/* Languages */}
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-stellar text-[#4a4b57] block mb-2 sm:mb-3">
                      Languages
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {['Rust', 'C++20', 'Go', 'TypeScript', 'GLSL / WGSL', 'Python', 'x86_64 ASM'].map((lang) => (
                        <span
                          key={lang}
                          className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono bg-[#1e1e26]/50 text-[#d2d2db] border border-transparent hover:border-white/30 hover:bg-white/[0.06] hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Runtimes & Infrastructure */}
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-stellar text-[#4a4b57] block mb-2 sm:mb-3">
                      Runtimes & Infrastructure
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {['Linux eBPF', 'WebGPU API', 'LLVM Toolchain', 'Docker / K8s', 'GNU Radio / SDR', 'Ghidra'].map((infra) => (
                        <span
                          key={infra}
                          className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono bg-[#1e1e26]/50 text-[#d2d2db] border border-transparent hover:border-white/30 hover:bg-white/[0.06] hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
                        >
                          {infra}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architectural Methodologies */}
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-stellar text-[#4a4b57] block mb-2 sm:mb-3">
                      Architectural Methodologies
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {['Zero-Alloc Logic', 'Formal Verification', 'Mechanical Sympathy', 'Cache Locality'].map((method) => (
                        <span
                          key={method}
                          className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono border border-white/10 text-[#d2d2db] hover:border-[#ff003c] hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* PGP Capsule */}
              <div className="flex flex-col gap-4 sm:gap-5 pt-2 sm:pt-4">
                <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-aperture text-[#4a4b57] border-b border-white/[0.04] pb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[#898a96]">APERTURE RECORD 04</span>
                    <span className="text-[#1e1e26]">/</span>
                    <span className="text-[#d2d2db]">PGP CAPSULE</span>
                  </div>
                  <span className="text-[#898a96]">KEY 0xA0E4</span>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#1e1e26]/20 border border-white/[0.06] backdrop-blur-sm flex flex-col gap-3.5 sm:gap-4 transition-all duration-300 hover:border-white/15 hover:shadow-[0_0_24px_rgba(255,0,60,0.06)]">
                  <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-stellar text-[#898a96]">
                    <span>Curve Verification</span>
                    <span className="text-[#d2d2db] flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      ED25519 AIR-GAP
                    </span>
                  </div>

                  <div
                    className={`font-mono text-[10px] sm:text-xs text-[#f5f5f7] tracking-wider break-all select-all text-center py-2.5 sm:py-3 bg-black/40 rounded-xl px-2.5 sm:px-4 border transition-all overflow-x-auto ${
                      copiedFingerprint ? 'border-[#ff003c]/60 bg-[#ff003c]/10 text-white' : 'border-white/5'
                    }`}
                    id="pgp-fingerprint-display"
                  >
                    9C04 E28A 4F71 BD88 7B00 D3F2 19EC 899B A0E4
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyFingerprint}
                      className={`flex-1 py-2.5 px-4 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-stellar transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                        copiedFingerprint
                          ? 'bg-[#ff003c] text-white shadow-[0_0_15px_#ff003c]'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                      id="copy-pgp-btn"
                    >
                      {copiedFingerprint ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>✓ FINGERPRINT COPIED TO BUFFER</span>
                        </>
                      ) : (
                        <>
                          <Key className="w-3.5 h-3.5" />
                          <span>Copy Fingerprint</span>
                        </>
                      )}
                    </button>
                    <a
                      href="https://github.com/Adhitha-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-full border border-white/10 hover:border-white/30 text-[#898a96] hover:text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-stellar transition-all text-center active:scale-[0.98] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Commit Log</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: COLLABORATIVE TRAJECTORY / CTA */}
          <section className="pt-6 sm:pt-8 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 border-t border-white/[0.04] animate-stage-footer">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-aperture text-[#898a96]">
                Collaborative Trajectory
              </span>
              <h3 className="font-headline text-2xl sm:text-4xl text-[#f5f5f7] uppercase tracking-tight">
                Initiate Encrypted Collaboration
              </h3>
              <p className="font-body text-[11px] sm:text-sm text-[#898a96] font-light leading-relaxed">
                Open for principal systems architecture, security triage, and advanced spatial compute advisory.
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <button
                ref={ctaBtnRef}
                type="button"
                onClick={onOpenConnect}
                onMouseMove={handleCtaMouseMove}
                onMouseLeave={handleCtaMouseLeave}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#f5f5f7] hover:bg-white text-[#040405] font-mono text-[10px] sm:text-[11px] uppercase tracking-stellar font-medium transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer"
                id="establish-link-btn"
              >
                <span>Establish Link</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};
