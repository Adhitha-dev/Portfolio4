import React, { useState, useEffect } from 'react';
import { WorkCategory } from '../../types/work';

interface WorkCardsProps {
  activeCategory: WorkCategory;
}

export const WorkCards: React.FC<WorkCardsProps> = ({ activeCategory }) => {
  // Live jitter telemetry for Aegis-X
  const [aegisMpps, setAegisMpps] = useState(40.14);
  const [aegisPkts, setAegisPkts] = useState(40215308);
  const [aegisP99, setAegisP99] = useState(1.2);
  const [isHoveringAegis, setIsHoveringAegis] = useState(false);

  useEffect(() => {
    const intervalTime = isHoveringAegis ? 180 : 1600;
    const timer = setInterval(() => {
      const variation = isHoveringAegis
        ? Math.random() * 0.45 - 0.2
        : Math.random() * 0.08 - 0.04;
      setAegisMpps(Number((40.14 + variation).toFixed(2)));

      const pktVariance = isHoveringAegis
        ? Math.floor(Math.random() * 80000 - 40000)
        : Math.floor(Math.random() * 12000 - 6000);
      setAegisPkts(40210979 + pktVariance);

      const latency = isHoveringAegis
        ? Number((1.1 + Math.random() * 0.12).toFixed(2))
        : Number((1.16 + Math.random() * 0.04).toFixed(2));
      setAegisP99(latency);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHoveringAegis]);

  return (
    <>
      {/* ================= ITEM 01: AEGIS-X (SECURITY / CRYPTO) ================= */}
      {(activeCategory === 'all' || activeCategory === 'sec') && (
        <article
          className="filmstrip-item group shrink-0 w-[88vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px] snap-center flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl sm:rounded-4xl bg-[#090a0c] border border-white/[0.07] hover:bg-[#0f1115]/90 shadow-2xl relative overflow-hidden transition-all duration-300 my-1 lg:h-[clamp(470px,57vh,550px)]"
          data-category="sec"
          data-index="1"
          id="cardAegis"
          onMouseEnter={() => setIsHoveringAegis(true)}
          onMouseLeave={() => setIsHoveringAegis(false)}
        >
          {/* Capsule Header */}
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-2">
              <span
                className="aegis-beacon w-2 h-2 rounded-full bg-[#ff003c] transition-all duration-300 shrink-0"
                style={{ boxShadow: '0 0 6px rgba(255, 0, 60, 0.7)' }}
              />
              <span className="font-micro text-[11px] sm:text-xs uppercase tracking-widest text-[#f2f3f5] font-medium truncate">
                Aegis-X Kernel
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-micro text-[#7a7d88] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#15171d] border border-white/[0.04] shrink-0">
              eBPF // Ring-0
            </span>
          </div>

          {/* Solaris Pill Aperture Visual: Oscilloscope Waveform Motion */}
          <div className="relative w-full h-[175px] sm:h-[210px] md:h-[235px] lg:h-[clamp(180px,23vh,230px)] my-2 sm:my-2.5 lg:my-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#15171d] border border-white/[0.06] group-hover:border-white/20 transition-all duration-300 shadow-inner shrink-0">
            <div className="absolute inset-0 solaris-lens p-3.5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-[10.5px] sm:text-xs font-micro text-[#b4b8c5] relative z-10">
                <span className="flex items-center gap-1.5 sm:gap-2 truncate mr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c] shrink-0 group-hover:animate-ping" />
                  Socket Flow:{' '}
                  <span className="text-[#f2f3f5] font-semibold tabular-nums ml-1">
                    {aegisMpps.toFixed(2)}
                  </span>{' '}
                  Mpps
                </span>
                <span className="text-[#7a7d88] text-[9.5px] sm:text-[10px] tracking-wider font-micro shrink-0">
                  NUMA Node 0x02
                </span>
              </div>

              {/* Continuously Animated SVG Oscilloscope Telemetry Waveform */}
              <div className="my-auto py-1 sm:py-2 relative overflow-hidden">
                <div className="oscilloscope-beam absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                <svg
                  className="w-full h-16 sm:h-20 md:h-24 stroke-white/80 overflow-visible"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 600 100"
                >
                  <defs>
                    <linearGradient id="waveGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                      <stop offset="45%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="55%" stopColor="#ff3344" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  {/* Ghost guide line */}
                  <path
                    d="M0,50 C60,50 80,20 110,20 C140,20 160,80 190,80 C220,80 240,15 270,15 C300,15 320,85 350,85 C380,85 410,35 440,35 C470,35 500,50 600,50"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Active dynamic waveform path */}
                  <path
                    className="telemetry-wave-animated stroke-[2.25]"
                    d="M0,50 C60,50 80,20 110,20 C140,20 160,80 190,80 C220,80 240,15 270,15 C300,15 320,85 350,85 C380,85 410,35 440,35 C470,35 500,50 600,50"
                    id="oscilloscopePath"
                    stroke="url(#waveGrad)"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Oscilloscope peak beacon indicator */}
                  <g className="transition-transform duration-300">
                    <circle cx="270" cy="15" fill="#ffffff" r="4.5" />
                    <circle className="group-hover:animate-pulse" cx="270" cy="15" fill="#ff3344" r="2.2" />
                    <circle
                      className="animate-ping opacity-60"
                      cx="270"
                      cy="15"
                      r="9"
                      stroke="rgba(255, 51, 68, 0.4)"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
                <div className="flex justify-between text-[9.5px] sm:text-[10px] font-micro text-[#7a7d88] mt-1 relative z-10">
                  <span>Kernel Ingress Zero-Copy</span>
                  <span className="text-[#b4b8c5] tracking-tight">P99: {aegisP99.toFixed(2)}µs</span>
                </div>
              </div>

              {/* Analog Pill Data Strip */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#07080a]/85 border border-white/[0.05] text-[10px] sm:text-xs font-micro text-[#b4b8c5] relative z-10">
                <span className="truncate mr-2 flex items-center gap-1.5 min-w-0">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                  XDP Hook Status: Synchronized
                </span>
                <span className="text-[#f2f3f5] font-semibold shrink-0 tabular-nums transition-colors group-hover:text-white">
                  {aegisPkts.toLocaleString('en-US')} pkts/s
                </span>
              </div>
            </div>
          </div>

          {/* Metadata & CTA */}
          <div className="pt-1.5 sm:pt-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 overflow-hidden">
            <h2 className="capsule-title font-giant uppercase text-[#f2f3f5] font-normal group-hover:text-white transition-colors">
              Zero-Trust eBPF Kernel Telemetry
            </h2>
            <p className="font-sans text-[11px] sm:text-sm text-[#7a7d88] font-normal line-clamp-2 leading-relaxed">
              High-velocity Linux kernel observability engine inspecting raw socket pressure without userspace context switching.
            </p>
            <div className="flex items-center justify-between pt-2.5 sm:pt-3 font-micro text-[10.5px] sm:text-xs text-[#7a7d88] border-t border-white/[0.03]">
              <span className="truncate mr-2 tracking-wider">C · eBPF · RUST</span>
              <span className="text-[#f2f3f5] group-hover:text-white inline-flex items-center gap-1.5 font-medium shrink-0 cursor-pointer">
                <span>Inspect Architecture</span>
                <span className="action-glide-arrow inline-block transition-transform duration-200">→</span>
              </span>
            </div>
          </div>
        </article>
      )}

      {/* ================= ITEM 02: NEXUS-V (WEB SYSTEMS) ================= */}
      {(activeCategory === 'all' || activeCategory === 'web') && (
        <article
          className="filmstrip-item group shrink-0 w-[88vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px] snap-center flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl sm:rounded-4xl bg-[#090a0c] border border-white/[0.07] hover:bg-[#0f1115]/90 shadow-2xl relative overflow-hidden transition-all duration-300 my-1 lg:h-[clamp(470px,57vh,550px)]"
          data-category="web"
          data-index="2"
        >
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-2">
              <span className="w-2 h-2 rounded-full bg-white/70 shrink-0 group-hover:bg-white transition-colors" />
              <span className="font-micro text-[11px] sm:text-xs uppercase tracking-widest text-[#f2f3f5] font-medium truncate">
                Nexus-V Runtime
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-micro text-[#7a7d88] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#15171d] border border-white/[0.04] shrink-0">
              CRDT // Edge Mesh
            </span>
          </div>

          <div className="relative w-full h-[175px] sm:h-[210px] md:h-[235px] lg:h-[clamp(180px,23vh,230px)] my-2 sm:my-2.5 lg:my-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#15171d] border border-white/[0.06] group-hover:border-white/20 transition-all duration-300 shadow-inner shrink-0">
            <div className="absolute inset-0 solaris-lens p-3.5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-[10.5px] sm:text-xs font-micro text-[#b4b8c5] relative z-10">
                <span className="group-hover:text-[#f2f3f5] transition-colors">[ Distributed Mesh ]</span>
                <span className="text-[#7a7d88] text-[9.5px] sm:text-[10px] tracking-wider font-micro">120k Req/s</span>
              </div>

              {/* Animated Radar Sweep Reticle & Blip */}
              <div className="my-auto flex items-center justify-center relative py-1 sm:py-2">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full radar-ring border border-white/10 flex items-center justify-center relative">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full radar-ring border border-white/[0.08] flex items-center justify-center relative">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full radar-ring border border-dashed border-white/[0.14] flex items-center justify-center">
                      <div className="radar-center-hub w-2 h-2 rounded-full bg-[#ff003c] transition-all duration-300 shadow-[0_0_6px_#ff003c]" />
                    </div>
                  </div>
                  {/* Continuous 360-degree Rotating Radar Scanline Beam */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none radar-sweep-beam"
                    style={{
                      background:
                        'conic-gradient(from 0deg at 50% 50%, rgba(255, 51, 68, 0.35) 0deg, rgba(255, 255, 255, 0.08) 35deg, transparent 95deg)',
                    }}
                  />
                  {/* Radar Ping Target Dot with Synchronized Blip */}
                  <div className="radar-blip-target absolute top-3 sm:top-4 right-5 sm:right-7 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white z-20" />
                  <div className="absolute inset-x-0 h-[1px] bg-white/[0.04] pointer-events-none" />
                  <div className="absolute inset-y-0 w-[1px] bg-white/[0.04] pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#07080a]/85 border border-white/[0.05] text-[10px] sm:text-xs font-micro text-[#b4b8c5] relative z-10">
                <span className="truncate mr-2">WASM Partition Tolerant</span>
                <span className="text-[#f2f3f5] font-semibold shrink-0 group-hover:text-white transition-colors">
                  184 Global Nodes
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 overflow-hidden">
            <h2 className="capsule-title font-giant uppercase text-[#f2f3f5] font-normal group-hover:text-white transition-colors">
              Distributed Event Sourcing
            </h2>
            <p className="font-sans text-[11px] sm:text-sm text-[#7a7d88] font-normal line-clamp-2 leading-relaxed">
              Ultra-low latency transactional synchronization engine handling real-time state resolution across global nodes.
            </p>
            <div className="flex items-center justify-between pt-2.5 sm:pt-3 font-micro text-[10.5px] sm:text-xs text-[#7a7d88] border-t border-white/[0.03]">
              <span className="truncate mr-2 tracking-wider">TYPESCRIPT · NEXT.JS · RUST WASM</span>
              <span className="text-[#f2f3f5] group-hover:text-white inline-flex items-center gap-1.5 font-medium shrink-0 cursor-pointer">
                <span>View Repository</span>
                <span className="action-glide-arrow inline-block transition-transform duration-200">→</span>
              </span>
            </div>
          </div>
        </article>
      )}

      {/* ================= ITEM 03: SINGULARITY (3D & VFX) ================= */}
      {(activeCategory === 'all' || activeCategory === 'vfx') && (
        <article
          className="filmstrip-item group shrink-0 w-[88vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px] snap-center flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl sm:rounded-4xl bg-[#090a0c] border border-white/[0.07] hover:bg-[#0f1115]/90 shadow-2xl relative overflow-hidden transition-all duration-300 my-1 lg:h-[clamp(470px,57vh,550px)]"
          data-category="vfx"
          data-index="3"
        >
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-2">
              <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
              <span className="font-micro text-[11px] sm:text-xs uppercase tracking-widest text-[#f2f3f5] font-medium truncate">
                Singularity Shader
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-micro text-[#7a7d88] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#15171d] border border-white/[0.04] shrink-0">
              GLSL Raymarch
            </span>
          </div>

          <div className="relative w-full h-[175px] sm:h-[210px] md:h-[235px] lg:h-[clamp(180px,23vh,230px)] my-2 sm:my-2.5 lg:my-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#15171d] border border-white/[0.06] group-hover:border-white/20 transition-all duration-300 shadow-inner shrink-0">
            <div className="absolute inset-0 solaris-lens p-3.5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-[10.5px] sm:text-xs font-micro text-[#b4b8c5]">
                <span>Geodesic Deflection</span>
                <span className="text-[#7a7d88] text-[9.5px] sm:text-[10px]">64-Step Raymarch</span>
              </div>

              {/* Accretion Halo Visual */}
              <div className="my-auto flex items-center justify-center relative py-1 sm:py-2">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-[#08080a] border border-white/15 shadow-[0_0_60px_rgba(255,255,255,0.06)] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                  <div className="w-36 sm:w-44 md:w-48 h-1.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-12 blur-[1px]" />
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-dashed border-white/25 radar-orbit-slow" />
                </div>
              </div>

              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#07080a]/85 border border-white/[0.05] text-[10px] sm:text-xs font-micro text-[#b4b8c5]">
                <span className="truncate mr-2">Schwarzschild Metric Lensing</span>
                <span className="text-[#f2f3f5] font-semibold shrink-0 group-hover:text-white transition-colors">
                  60 FPS Locked
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 overflow-hidden">
            <h2 className="capsule-title font-giant uppercase text-[#f2f3f5] font-normal group-hover:text-white transition-colors">
              Black Hole Raymarching Engine
            </h2>
            <p className="font-sans text-[11px] sm:text-sm text-[#7a7d88] font-normal line-clamp-2 leading-relaxed">
              Relativistic gravitational deflection simulated in real-time GLSL fragment shaders with physical light bend models.
            </p>
            <div className="flex items-center justify-between pt-2.5 sm:pt-3 font-micro text-[10.5px] sm:text-xs text-[#7a7d88] border-t border-white/[0.03]">
              <span className="truncate mr-2 tracking-wider">GLSL · WEBGL 2.0 · THREE.JS</span>
              <span className="text-[#f2f3f5] group-hover:text-white inline-flex items-center gap-1.5 font-medium shrink-0 cursor-pointer">
                <span>Launch Simulator</span>
                <span className="action-glide-arrow inline-block transition-transform duration-200">→</span>
              </span>
            </div>
          </div>
        </article>
      )}

      {/* ================= ITEM 04: CIPHER-MESH (SECURITY / CRYPTO) ================= */}
      {(activeCategory === 'all' || activeCategory === 'sec') && (
        <article
          className="filmstrip-item group shrink-0 w-[88vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px] snap-center flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl sm:rounded-4xl bg-[#090a0c] border border-white/[0.07] hover:bg-[#0f1115]/90 shadow-2xl relative overflow-hidden transition-all duration-300 my-1 lg:h-[clamp(470px,57vh,550px)]"
          data-category="sec"
          data-index="4"
        >
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-2">
              <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
              <span className="font-micro text-[11px] sm:text-xs uppercase tracking-widest text-[#f2f3f5] font-medium truncate">
                Cipher-Mesh Bastion
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-micro text-[#7a7d88] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#15171d] border border-white/[0.04] shrink-0">
              Post-Quantum SGX
            </span>
          </div>

          <div className="relative w-full h-[175px] sm:h-[210px] md:h-[235px] lg:h-[clamp(180px,23vh,230px)] my-2 sm:my-2.5 lg:my-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#15171d] border border-white/[0.06] group-hover:border-white/20 transition-all duration-300 shadow-inner shrink-0">
            <div className="absolute inset-0 solaris-lens p-3.5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-[10.5px] sm:text-xs font-micro text-[#b4b8c5]">
                <span>Kyber-1024 Lattice</span>
                <span className="text-[#7a7d88] text-[9.5px] sm:text-[10px]">Zero-Knowledge</span>
              </div>
              <div className="my-auto px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-[#07080a]/75 border border-white/[0.06] space-y-1.5 sm:space-y-2 font-micro text-[10px] sm:text-xs">
                <div className="flex justify-between text-[#b4b8c5]">
                  <span>Proof Generation:</span>
                  <span className="text-[#f2f3f5] font-semibold">48ms / SGX-2</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white/70 rounded-full w-4/5 group-hover:w-[92%] transition-all duration-700" />
                </div>
                <div className="text-[9.5px] sm:text-[11px] text-[#7a7d88] flex justify-between">
                  <span className="truncate mr-2">NIST Round 4 Compliant Tunneling</span>
                  <span className="text-[#f2f3f5] shrink-0">256-Bit SHAKE</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#07080a]/85 border border-white/[0.05] text-[10px] sm:text-xs font-micro text-[#b4b8c5]">
                <span className="truncate mr-2">Hardware Attested Bastion</span>
                <span className="text-[#f2f3f5] font-semibold shrink-0 group-hover:text-white transition-colors">
                  Audit Passed
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 overflow-hidden">
            <h2 className="capsule-title font-giant uppercase text-[#f2f3f5] font-normal group-hover:text-white transition-colors">
              Zero-Knowledge Enclave Bastion
            </h2>
            <p className="font-sans text-[11px] sm:text-sm text-[#7a7d88] font-normal line-clamp-2 leading-relaxed">
              Hardware-attested cryptographic bastion providing quantum-resistant TLS and verifiable computation proofs.
            </p>
            <div className="flex items-center justify-between pt-2.5 sm:pt-3 font-micro text-[10.5px] sm:text-xs text-[#7a7d88] border-t border-white/[0.03]">
              <span className="truncate mr-2 tracking-wider">RUST · KYBER · PLONK · SGX</span>
              <span className="text-[#f2f3f5] group-hover:text-white inline-flex items-center gap-1.5 font-medium shrink-0 cursor-pointer">
                <span>View Security Audit</span>
                <span className="action-glide-arrow inline-block transition-transform duration-200">→</span>
              </span>
            </div>
          </div>
        </article>
      )}

      {/* ================= ITEM 05: CHRONOS (WEB SYSTEMS) ================= */}
      {(activeCategory === 'all' || activeCategory === 'web') && (
        <article
          className="filmstrip-item group shrink-0 w-[88vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px] snap-center flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl sm:rounded-4xl bg-[#090a0c] border border-white/[0.07] hover:bg-[#0f1115]/90 shadow-2xl relative overflow-hidden transition-all duration-300 my-1 lg:h-[clamp(470px,57vh,550px)]"
          data-category="web"
          data-index="5"
        >
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-2">
              <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
              <span className="font-micro text-[11px] sm:text-xs uppercase tracking-widest text-[#f2f3f5] font-medium truncate">
                Chronos Depth
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-micro text-[#7a7d88] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#15171d] border border-white/[0.04] shrink-0">
              L2 Order-Book
            </span>
          </div>

          <div className="relative w-full h-[175px] sm:h-[210px] md:h-[235px] lg:h-[clamp(180px,23vh,230px)] my-2 sm:my-2.5 lg:my-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#15171d] border border-white/[0.06] group-hover:border-white/20 transition-all duration-300 shadow-inner shrink-0">
            <div className="absolute inset-0 solaris-lens p-3.5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-[10.5px] sm:text-xs font-micro text-[#b4b8c5]">
                <span>Microsecond Depth Ladder</span>
                <span className="text-[#7a7d88] text-[9.5px] sm:text-[10px]">16.6ms Lock</span>
              </div>
              <div className="my-auto space-y-1.5 sm:space-y-2 font-micro text-[10px] sm:text-xs">
                <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-between text-[#b4b8c5] group-hover:border-white/10 transition-colors">
                  <span>Bid Flow: 68,410.50</span>
                  <span className="text-[#f2f3f5] font-semibold">14.82 BTC</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/[0.04] flex items-center justify-between text-[#b4b8c5] group-hover:border-white/10 transition-colors">
                  <span>Ask Depth: 68,412.00</span>
                  <span className="text-[#f2f3f5] font-semibold">12.44 BTC</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#07080a]/85 border border-white/[0.05] text-[10px] sm:text-xs font-micro text-[#b4b8c5]">
                <span className="truncate mr-2">SharedArrayBuffer Pipeline</span>
                <span className="text-[#f2f3f5] font-semibold shrink-0 group-hover:text-white transition-colors">
                  480k TPS
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 overflow-hidden">
            <h2 className="capsule-title font-giant uppercase text-[#f2f3f5] font-normal group-hover:text-white transition-colors">
              Financial Order-Book Canvas
            </h2>
            <p className="font-sans text-[11px] sm:text-sm text-[#7a7d88] font-normal line-clamp-2 leading-relaxed">
              Institutional market depth visualizer rendering 60fps microsecond level-2 books via offscreen canvas buffers.
            </p>
            <div className="flex items-center justify-between pt-2.5 sm:pt-3 font-micro text-[10.5px] sm:text-xs text-[#7a7d88] border-t border-white/[0.03]">
              <span className="truncate mr-2 tracking-wider">REACT · WEBGL 2.0 · WORKERS</span>
              <span className="text-[#f2f3f5] group-hover:text-white inline-flex items-center gap-1.5 font-medium shrink-0 cursor-pointer">
                <span>Explore Case Study</span>
                <span className="action-glide-arrow inline-block transition-transform duration-200">→</span>
              </span>
            </div>
          </div>
        </article>
      )}

      {/* ================= ITEM 06: NEBULA-CORE (3D & VFX) ================= */}
      {(activeCategory === 'all' || activeCategory === 'vfx') && (
        <article
          className="filmstrip-item group shrink-0 w-[88vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px] snap-center flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl sm:rounded-4xl bg-[#090a0c] border border-white/[0.07] hover:bg-[#0f1115]/90 shadow-2xl relative overflow-hidden transition-all duration-300 my-1 lg:h-[clamp(470px,57vh,550px)]"
          data-category="vfx"
          data-index="6"
        >
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-2">
              <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
              <span className="font-micro text-[11px] sm:text-xs uppercase tracking-widest text-[#f2f3f5] font-medium truncate">
                Nebula Radiance
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-micro text-[#7a7d88] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#15171d] border border-white/[0.04] shrink-0">
              Gaussian Splats
            </span>
          </div>

          <div className="relative w-full h-[175px] sm:h-[210px] md:h-[235px] lg:h-[clamp(180px,23vh,230px)] my-2 sm:my-2.5 lg:my-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#15171d] border border-white/[0.06] group-hover:border-white/20 transition-all duration-300 shadow-inner shrink-0">
            <div className="absolute inset-0 solaris-lens p-3.5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-[10.5px] sm:text-xs font-micro text-[#b4b8c5]">
                <span>2.5 Million Ellipsoids</span>
                <span className="text-[#7a7d88] text-[9.5px] sm:text-[10px]">8.4ms Frame</span>
              </div>
              <div className="my-auto flex items-center justify-center relative py-1 sm:py-2">
                <div className="w-36 sm:w-44 md:w-48 h-16 sm:h-20 md:h-24 rounded-full border border-white/10 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                  <div className="w-24 sm:w-28 md:w-32 h-10 sm:h-14 md:h-16 rounded-full bg-white/[0.04] blur-sm" />
                  <div className="font-micro text-[10.5px] sm:text-xs text-[#b4b8c5] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#07080a]/85 border border-white/10">
                    Radix Sort Engine
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#07080a]/85 border border-white/[0.05] text-[10px] sm:text-xs font-micro text-[#b4b8c5]">
                <span className="truncate mr-2">VRAM Occupancy: &lt; 350 MB</span>
                <span className="text-[#f2f3f5] font-semibold shrink-0 group-hover:text-white transition-colors">
                  WGSL Compute
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 overflow-hidden">
            <h2 className="capsule-title font-giant uppercase text-[#f2f3f5] font-normal group-hover:text-white transition-colors">
              3D Gaussian Splatting Engine
            </h2>
            <p className="font-sans text-[11px] sm:text-sm text-[#7a7d88] font-normal line-clamp-2 leading-relaxed">
              Neural radiance field renderer streaming 2.5 million ellipsoids with progressive multi-threaded level-of-detail.
            </p>
            <div className="flex items-center justify-between pt-2.5 sm:pt-3 font-micro text-[10.5px] sm:text-xs text-[#7a7d88] border-t border-white/[0.03]">
              <span className="truncate mr-2 tracking-wider">WEBGPU · WGSL · C++ WASM</span>
              <span className="text-[#f2f3f5] group-hover:text-white inline-flex items-center gap-1.5 font-medium shrink-0 cursor-pointer">
                <span>Run WebGPU Viewer</span>
                <span className="action-glide-arrow inline-block transition-transform duration-200">→</span>
              </span>
            </div>
          </div>
        </article>
      )}

      {/* ================= ITEM 07: KRAKEN (SECURITY / CRYPTO) ================= */}
      {(activeCategory === 'all' || activeCategory === 'sec') && (
        <article
          className="filmstrip-item group shrink-0 w-[88vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px] snap-center flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl sm:rounded-4xl bg-[#090a0c] border border-white/[0.07] hover:bg-[#0f1115]/90 shadow-2xl relative overflow-hidden transition-all duration-300 my-1 lg:h-[clamp(470px,57vh,550px)]"
          data-category="sec"
          data-index="7"
        >
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-2">
              <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
              <span className="font-micro text-[11px] sm:text-xs uppercase tracking-widest text-[#f2f3f5] font-medium truncate">
                Kraken Fuzzer
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-micro text-[#7a7d88] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#15171d] border border-white/[0.04] shrink-0">
              Concolic Tracer
            </span>
          </div>

          <div className="relative w-full h-[175px] sm:h-[210px] md:h-[235px] lg:h-[clamp(180px,23vh,230px)] my-2 sm:my-2.5 lg:my-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#15171d] border border-white/[0.06] group-hover:border-white/20 transition-all duration-300 shadow-inner shrink-0">
            <div className="absolute inset-0 solaris-lens p-3.5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-[10.5px] sm:text-xs font-micro text-[#b4b8c5]">
                <span>Branch Coverage Guided</span>
                <span className="text-[#7a7d88] text-[9.5px] sm:text-[10px]">14 CVEs Found</span>
              </div>
              <div className="my-auto px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-[#07080a]/75 border border-white/[0.06] space-y-1 sm:space-y-1.5 font-micro text-[10px] sm:text-xs">
                <div className="text-[#b4b8c5]">Dynamic Binary Instrumentation:</div>
                <div className="text-[#f2f3f5] font-semibold">85,000 executions / second</div>
                <div className="text-[9.5px] sm:text-[11px] text-[#7a7d88]">LLVM Sanitizers · QEMU Mode</div>
              </div>
              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#07080a]/85 border border-white/[0.05] text-[10px] sm:text-xs font-micro text-[#b4b8c5]">
                <span className="truncate mr-2">Protocol Mutation Engine</span>
                <span className="text-[#f2f3f5] font-semibold shrink-0 group-hover:text-white transition-colors">
                  C++20 & Python
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 overflow-hidden">
            <h2 className="capsule-title font-giant uppercase text-[#f2f3f5] font-normal group-hover:text-white transition-colors">
              Automated Taint Tracer & Fuzzer
            </h2>
            <p className="font-sans text-[11px] sm:text-sm text-[#7a7d88] font-normal line-clamp-2 leading-relaxed">
              Dynamic binary instrumentation harness executing branch-coverage guided fuzzing over network protocol stacks.
            </p>
            <div className="flex items-center justify-between pt-2.5 sm:pt-3 font-micro text-[10.5px] sm:text-xs text-[#7a7d88] border-t border-white/[0.03]">
              <span className="truncate mr-2 tracking-wider">C++20 · LLVM · QEMU · PYTHON</span>
              <span className="text-[#f2f3f5] group-hover:text-white inline-flex items-center gap-1.5 font-medium shrink-0 cursor-pointer">
                <span>Review Disclosures</span>
                <span className="action-glide-arrow inline-block transition-transform duration-200">→</span>
              </span>
            </div>
          </div>
        </article>
      )}

      {/* ================= ITEM 08: HYDRA (WEB SYSTEMS) ================= */}
      {(activeCategory === 'all' || activeCategory === 'web') && (
        <article
          className="filmstrip-item group shrink-0 w-[88vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px] snap-center flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl sm:rounded-4xl bg-[#090a0c] border border-white/[0.07] hover:bg-[#0f1115]/90 shadow-2xl relative overflow-hidden transition-all duration-300 my-1 lg:h-[clamp(470px,57vh,550px)]"
          data-category="web"
          data-index="8"
        >
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-2">
              <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
              <span className="font-micro text-[11px] sm:text-xs uppercase tracking-widest text-[#f2f3f5] font-medium truncate">
                Hydra Federation
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-micro text-[#7a7d88] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#15171d] border border-white/[0.04] shrink-0">
              Schema Gateway
            </span>
          </div>

          <div className="relative w-full h-[175px] sm:h-[210px] md:h-[235px] lg:h-[clamp(180px,23vh,230px)] my-2 sm:my-2.5 lg:my-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#15171d] border border-white/[0.06] group-hover:border-white/20 transition-all duration-300 shadow-inner shrink-0">
            <div className="absolute inset-0 solaris-lens p-3.5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-[10.5px] sm:text-xs font-micro text-[#b4b8c5]">
                <span>42 Federated Services</span>
                <span className="text-[#7a7d88] text-[9.5px] sm:text-[10px]">99.999% SLA</span>
              </div>
              <div className="my-auto text-center space-y-1">
                <div className="font-giant text-2xl sm:text-4xl md:text-5xl text-[#f2f3f5] tracking-wide group-hover:text-white transition-colors">
                  2.4B REQ / DAY
                </div>
                <div className="text-[10px] sm:text-xs font-micro text-[#7a7d88]">Sub-millisecond query planning proxy</div>
              </div>
              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#07080a]/85 border border-white/[0.05] text-[10px] sm:text-xs font-micro text-[#b4b8c5]">
                <span className="truncate mr-2">Automated Cache Coalescing</span>
                <span className="text-[#f2f3f5] font-semibold shrink-0 group-hover:text-white transition-colors">
                  Envoy & Go
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 overflow-hidden">
            <h2 className="capsule-title font-giant uppercase text-[#f2f3f5] font-normal group-hover:text-white transition-colors">
              GraphQL Gateway & Federation
            </h2>
            <p className="font-sans text-[11px] sm:text-sm text-[#7a7d88] font-normal line-clamp-2 leading-relaxed">
              Sub-millisecond query planning proxy uniting 42 services with automated cache coalescing and deduped resolution.
            </p>
            <div className="flex items-center justify-between pt-2.5 sm:pt-3 font-micro text-[10.5px] sm:text-xs text-[#7a7d88] border-t border-white/[0.03]">
              <span className="truncate mr-2 tracking-wider">GO · GRAPHQL · REDIS · ENVOY</span>
              <span className="text-[#f2f3f5] group-hover:text-white inline-flex items-center gap-1.5 font-medium shrink-0 cursor-pointer">
                <span>View Specifications</span>
                <span className="action-glide-arrow inline-block transition-transform duration-200">→</span>
              </span>
            </div>
          </div>
        </article>
      )}

      {/* ================= ITEM 09: KINETIC-GRID (3D & VFX) ================= */}
      {(activeCategory === 'all' || activeCategory === 'vfx') && (
        <article
          className="filmstrip-item group shrink-0 w-[88vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px] snap-center flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl sm:rounded-4xl bg-[#090a0c] border border-white/[0.07] hover:bg-[#0f1115]/90 shadow-2xl relative overflow-hidden transition-all duration-300 my-1 lg:h-[clamp(470px,57vh,550px)]"
          data-category="vfx"
          data-index="9"
        >
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-2">
              <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
              <span className="font-micro text-[11px] sm:text-xs uppercase tracking-widest text-[#f2f3f5] font-medium truncate">
                Kinetic Topology
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-micro text-[#7a7d88] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#15171d] border border-white/[0.04] shrink-0">
              120Hz Hypercube
            </span>
          </div>

          <div className="relative w-full h-[175px] sm:h-[210px] md:h-[235px] lg:h-[clamp(180px,23vh,230px)] my-2 sm:my-2.5 lg:my-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#15171d] border border-white/[0.06] group-hover:border-white/20 transition-all duration-300 shadow-inner shrink-0">
            <div className="absolute inset-0 solaris-lens p-3.5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-[10.5px] sm:text-xs font-micro text-[#b4b8c5]">
                <span>4D Tesseract Rotation</span>
                <span className="text-[#7a7d88] text-[9.5px] sm:text-[10px]">Web Audio FFT</span>
              </div>
              <div className="my-auto flex items-center justify-center py-1 sm:py-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl border border-white/20 rotate-45 flex items-center justify-center radar-orbit-slow group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl border border-white/40 -rotate-45" />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#07080a]/85 border border-white/[0.05] text-[10px] sm:text-xs font-micro text-[#b4b8c5]">
                <span className="truncate mr-2">5ms Latency Response</span>
                <span className="text-[#f2f3f5] font-semibold shrink-0 group-hover:text-white transition-colors">
                  120Hz Refresh
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 overflow-hidden">
            <h2 className="capsule-title font-giant uppercase text-[#f2f3f5] font-normal group-hover:text-white transition-colors">
              Kinetic Gyroscope & Topology
            </h2>
            <p className="font-sans text-[11px] sm:text-sm text-[#7a7d88] font-normal line-clamp-2 leading-relaxed">
              Higher-dimensional geometric manifold visualizing 4D rotations and Lorentz attractors reacting dynamically to audio bins.
            </p>
            <div className="flex items-center justify-between pt-2.5 sm:pt-3 font-micro text-[10.5px] sm:text-xs text-[#7a7d88] border-t border-white/[0.03]">
              <span className="truncate mr-2 tracking-wider">THREE.JS · SHADERS · AUDIO FFT</span>
              <span className="text-[#f2f3f5] group-hover:text-white inline-flex items-center gap-1.5 font-medium shrink-0 cursor-pointer">
                <span>Run Experiment</span>
                <span className="action-glide-arrow inline-block transition-transform duration-200">→</span>
              </span>
            </div>
          </div>
        </article>
      )}
    </>
  );
};
